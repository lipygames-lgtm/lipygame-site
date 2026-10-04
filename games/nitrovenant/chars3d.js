'use strict';
// Camada de personagens 3D (Three.js) desenhada por cima da cena do Renderer, no MESMO
// contexto WebGL2 e no mesmo depth buffer: carros, pista e itens continuam no desenhista
// atual; só os personagens passam por aqui. Modelos chegam de models/<nome>.js (GLB em
// base64, ver tools/pack-models.mjs). Sem WebGL2, sem THREE ou sem modelo para o tipo,
// o Renderer desenha o zumbi procedural de sempre.
//
// LOCOMOÇÃO (revisão de mecânica, 0.8): o engine move tudo em relação ao CARRO, que anda a ~17 u/s;
// um chefe "parado" à frente do carro está, na pista, recuando a 60 km/h. Tocar "andar para a frente"
// nele faz os pés deslizarem como numa esteira. Aqui as PERNAS são dirigidas pela velocidade real do
// personagem SOBRE A PISTA (vel. no espaço do carro − vel. da pista, convertida para m/s do corpo):
// anda, corre ou recua de costas, com a cadência = velocidade ÷ velocidade natural do clipe
// (extras.speed, medida em tools/lib-motion.mjs). O TRONCO é independente (pancada, arremesso, dano,
// grito), então ninguém precisa parar para agir. Clipes já chegam "no lugar" e calibrados no chão.
class CharacterLayer{
 constructor(renderer){
  const T=window.THREE,g=renderer.g;this.ok=false;this.renderer=renderer;this.T=T;
  if(!T||typeof WebGL2RenderingContext==='undefined'||!(g instanceof WebGL2RenderingContext))return;
  this.gl=new T.WebGLRenderer({canvas:renderer.canvas,context:g,antialias:true});
  this.gl.autoClear=false;this.gl.setPixelRatio(1);this.gl.outputColorSpace=T.SRGBColorSpace;
  this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(.78*180/Math.PI,1,.1,180);
  // Sol + preenchimento frontal + contraluz fria, com pouca luz ambiente: é o contraste entre eles que
  // faz o mapa de relevo desenhar rosto e dobras. Igual à ficha de aprovação (tools/preview-glb.cjs).
  this.hemi=new T.HemisphereLight(0xeef4f9,0x5d6f83,1.9);this.scene.add(this.hemi);
  const sun=new T.DirectionalLight(0xfff1dc,3.3);sun.position.set(-.55,1,.65);this.scene.add(sun);this.sun=sun;
  const fill=new T.DirectionalLight(0xffffff,1.0);fill.position.set(.6,.5,1);this.scene.add(fill);this.fill=fill;
  const rim=new T.DirectionalLight(0x9fefff,2.6);rim.position.set(.7,.9,-1);this.scene.add(rim);this.rim=rim;
  this.scene.fog=new T.Fog(0xa3bfc9,54,183);this.decor={};this.decorN=0;this.cars={};
  this.glow=.2;        // brilho próprio de base (fração da textura); o flash de dano sobe para 1.5
  this.deathTime=.65;  // segundos entre morrer e sumir
  this.UPPER=/^(Spine|LeftShoulder|LeftArm|LeftForeArm|LeftHand|RightShoulder|RightArm|RightForeArm|RightHand|neck|Head)/;
  this.manifest=window.NV_MODELS||{kinds:{},models:{}};
  this.models={};this.loading={};this.failed={};this.avatars=new WeakMap();this.pools={};this.live=[];this.queue=[];this.dying=[];this.lastScroll=null;this.roadV=17;this.flip=1;this.shots=[];this.shotN=0;this.frameNo=0;this.spare=[];this.ids=0;
  this.ok=true;this.resize();
  this.need([this.manifest.kinds.walker]); // o resto entra por fase, em prepare(): celular fraco não precisa dos 8 modelos na memória
 }
 // Carrega um conjunto de modelos e os objetos de mão que eles usam.
 need(names){for(const n of names){if(!n)continue;this.ensure(n);for(const p of (this.manifest.models[n]||{}).props||[])this.ensure(p.model);}}
 // Só o que a fase usa: tipos liberados no nível (mesma regra do engine.spawnHorde) e os chefes da vez.
 prepare(level){const k=this.manifest.kinds,r=this.manifest.bosses||[],names=[k.walker,k.bruiser];if(level>=2)names.push(k.runner);
  // O lancador de ferramenta aparece em QUALQUER fase a partir da 5a leva da pista (spawnHorde), nao da fase 3.
  // Carregar so a partir da fase 3 deixava ele entrar em cena como boneco de blocos nas primeiras fases.
  names.push(k.thrower,(this.manifest.projectile||{}).model);if(level>=5)names.push(k.bomber);
  if(r.length){names.push(r[(level-1)%r.length]);if(level>=10)names.push(r[(level+1)%r.length]);}else names.push(k.final,level>=10?k.boss:null);this.need(names);this.wanted=[...new Set(names.filter(Boolean))];return this.wanted;}
 // Antes da largada: espera os modelos da fase, enche as piscinas de avatares (clonar esqueleto é caro: uma
 // fileira de 9-18 zumbis nascendo junta dava travada) e força compilação de shader e subida de textura,
 // que senão acontecem no primeiro quadro em que cada tipo aparece. Trabalho fatiado para não congelar a tela.
 async ready(level,onProgress,extra=[]){if(!this.ok)return;this.level=level;for(const n of extra)this.ensure(n);const names=[...this.prepare(level),...extra.filter(n=>this.manifest.models[n])],t0=performance.now(),tick=()=>new Promise(r=>setTimeout(r,0)),M=this.manifest;
  while(names.some(n=>M.models[n]&&!this.models[n]&&!this.failed[n])&&performance.now()-t0<9000){onProgress&&onProgress(.6*names.filter(n=>this.models[n]||this.failed[n]||!M.models[n]).length/names.length);await new Promise(r=>setTimeout(r,60));}
  const quota=n=>M.models[n]&&(M.models[n].prop||M.models[n].scenery||M.models[n].car)?0:(M.bosses||[]).includes(n)?1:n===M.kinds.walker?16:7,total=names.reduce((s,n)=>s+(this.models[n]?quota(n):0),0)||1;let slice=performance.now(),done=0;
  for(const n of names){if(!this.models[n])continue;const pool=this.pools[n]||(this.pools[n]=[]);while(pool.length<quota(n)){const av=this.spawn(n,true);av.root.visible=false;pool.push(av);done++;if(performance.now()-slice>10){onProgress&&onProgress(.6+.35*done/total);await tick();slice=performance.now();}}}
  const shown=[];for(const n of names){const p=this.pools[n];if(p&&p[0]){p[0].root.visible=true;p[0].root.position.set(0,0,-30);shown.push(p[0]);}}
  try{this.camera.position.set(0,8.8,16);this.camera.lookAt(0,0,-10);this.gl.resetState();this.gl.compile(this.scene,this.camera);for(const av of shown)for(const m of av.mats){if(m.map)this.gl.initTexture(m.map);if(m.normalMap)this.gl.initTexture(m.normalMap);}for(const n of extra){const d=this.decor[n];if(d)for(const p of d.parts)if(p.material.map)this.gl.initTexture(p.material.map);}}catch(err){console.warn('aquecimento',err);}
  for(const av of shown)av.root.visible=false;this.renderer.restoreState();onProgress&&onProgress(1);}
 // Luz do cenário (scenery.js → SCENERY.<tema>.light). O brilho próprio (glow) sobe nos cenários escuros.
 light(L){if(!this.ok||!L)return;this.hemi.color.set(L.sky);this.hemi.groundColor.set(L.ground);this.hemi.intensity=L.hemi;this.sun.color.set(L.sun);this.sun.intensity=L.sunI;this.fill.intensity=L.fill;this.rim.color.set(L.rim);this.rim.intensity=L.rimI;this.scene.fog.color.set(L.fog);
  if(L.glow!==this.glow){this.glow=L.glow;const all=[...this.live];for(const p of Object.values(this.pools))all.push(...p);for(const av of all)for(const m of av.mats)m.emissive.setScalar(this.glow);for(const av of all)av.flash=null;}}
 resize(){if(!this.ok)return;const c=this.renderer.canvas;this.gl.setViewport(0,0,c.width,c.height);this.camera.aspect=c.width/c.height;this.camera.updateProjectionMatrix();}
 // Chefes se revezam por fase (manifest.bosses): o final da fase N é o N-ésimo do rodízio; o chefe do
 // meio (fase 10+) é outro, dois à frente. Sem rodízio no manifesto, vale kinds.final / kinds.boss.
 modelName(e){const m=this.manifest;if(!e.boss)return m.kinds[e.kind];const r=m.bosses||[];if(!r.length)return m.kinds[e.final?'final':'boss'];return r[((this.level||1)-1+(e.final?0:2))%r.length];}
 // Nome do chefe da vez (models.<nome>.title), para o aviso de entrada; null = usa o texto genérico do jogo.
 bossTitle(e,lang){if(!this.ok)return null;const m=this.manifest.models[this.modelName(e)],t=m&&m.title;return t?(t[lang]||t.en):null;}
 wants(e){if(!this.ok)return false;const m=this.models[this.modelName(e)];return !!m&&(m.cfg.props||[]).every(p=>this.models[p.model]||this.failed[p.model]);}
 push(e){this.queue.push(e);}
 // Ferramenta arremessada: a mesma chave que o Mecânico leva na mão, girando no ar (antes eram duas
 // caixas em cruz, que liam como uma letra T). Devolve false se o modelo não estiver pronto: o Renderer
 // desenha o projétil antigo.
 shot(p,y,time,flat){const cfg=this.manifest.projectile,pm=this.ok&&cfg&&this.models[cfg.model];if(!pm)return false;let o=this.shots[this.shotN];if(!o){o=pm.proto.clone(true);o.rotation.order='YXZ';this.scene.add(o);this.shots.push(o);}this.shotN++;
  o.visible=true;o.position.set(p.x,y,p.z);o.scale.setScalar(cfg.len||1.5);
  if(flat===undefined)o.rotation.set(time*11,0,.5);else{if(!pm.thin){const d=new this.T.Box3().setFromObject(pm.proto).getSize(new this.T.Vector3());pm.thin=d.x<=d.y&&d.x<=d.z?'x':d.z<=d.y?'z':'y';}o.rotation.set(pm.thin==='z'?Math.PI/2:0,flat,pm.thin==='x'?Math.PI/2:0);}return true;}
 // Deslocamento lateral só visual (entrada pela calçada): o Renderer usa para pôr a sombra no lugar certo.
 dx(e){const av=this.avatars.get(e);return av?av.ox:0;}
 // OBJETOS DE CENÁRIO (scenery.js): has(nome) = modelo pronto; place() = uma cópia neste quadro (altura em unidades do jogo).
 has(name){if(!this.ok)return false;if(!this.decor[name]){this.ensure(name);return false;}return true;}
 // CARRO DO JOGADOR (um só na tela). hasCar dispara o carregamento e devolve false até estar pronto;
 // placeCar põe o carro neste quadro: comprimento em unidades do jogo, altura y (pulo) e giro.
 hasCar(name){if(!this.ok||!name)return false;if(!this.cars[name]){this.ensure(name);return false;}return this.buildCar(name);}
 // altura do teto do modelo, em fração do comprimento (o lançador usa isso para não flutuar)
 // Monta as peças do carro (manifesto: wheel/launcher). Tudo em FRAÇÃO do comprimento do carro, com o
 // carro normalizado em comprimento 1: assim o mesmo ajuste serve para qualquer tamanho de carroceria.
 buildCar(name){const T=this.T,c=this.cars[name];if(!c||c.built)return !!c&&c.built;const cfg=c.cfg;let faltou=false;
  for(const p of [cfg.wheel,cfg.launcher]){if(!p||!p.model)continue;if(!this.models[p.model]){this.ensure(p.model);faltou=true;}}
  if(faltou)return false;
  const W=cfg.wheel;
  if(W&&this.models[W.model]){const proto=this.models[W.model].proto;
   for(const side of [-1,1])for(const [zz,tag] of [[W.zf??.30,'f'],[-(W.zr??.30),'r']]){
    const hub=new T.Group();hub.position.set(side*(W.x??.38),W.y??.16,zz);
    const m=proto.clone(true);m.scale.setScalar(W.d??.30);m.rotation.fromArray(W.rot||[0,0,0]);if(side<0)m.rotation.y+=Math.PI;
    hub.add(m);c.body.add(hub);c.wheels.push(hub);}}
  const L=cfg.launcher;
  if(L&&this.models[L.model]){const proto=this.models[L.model].proto;
   for(let i=0;i<3;i++){const g=new T.Group();g.position.set(0,L.y??.95,L.z??0);const m=proto.clone(true);m.scale.setScalar(L.len??.55);m.rotation.fromArray(L.rot||[0,0,0]);g.add(m);g.visible=i===0;c.body.add(g);c.pods.push(g);}}
  c.node.traverse(o=>{if(o.isMesh&&o.material&&!c.mats.includes(o.material)){o.material=o.material.clone();c.mats.push(o.material);}});
  c.built=true;return true;}
 carRoof(name){const c=this.cars[name];return c?c.roof:0;}
 placeCar(name,x,y,z,yaw,len,flash,spin,pods,roll){const c=this.cars[name];if(!c)return false;c.node.visible=true;c.node.position.set(x,y,z);c.node.rotation.set(0,yaw,roll||0);c.node.scale.setScalar(len);c.placed=true;
  if(spin!==undefined)for(const h of c.wheels)h.rotation.x=spin;
  // A arte do dono empilha as fileiras de míssil PARA CIMA conforme a arma evolui (1, 2 e 3 fileiras).
  for(let i=0;i<c.pods.length;i++){const on=i<(pods||1);if(c.pods[i].visible!==on)c.pods[i].visible=on;if(on)c.pods[i].position.y=(c.cfg.launcher.y??.95)+i*((c.cfg.launcher||{}).gap??.16);}
  if(flash!==c.flash){c.flash=flash;for(const m of c.mats)m.emissive.setScalar(flash?.9:this.glow);}return true;}
 place(name,x,z,height,yaw=0,wide=1){const d=this.decor[name];if(!d||d.n>=(d.parts[0]?d.parts[0].instanceMatrix.count:0))return;const o=d.dummy;o.position.set(x,0,z);o.rotation.set(0,yaw,0);o.scale.set(height*wide,height,height*wide);o.updateMatrix();for(const p of d.parts)p.setMatrixAt(d.n,o.matrix);d.n++;this.decorN++;}
 // Carrega models/<nome>.js sob demanda; o GLB é decodificado quando o script chega.
 ensure(name){if(!name||this.loading[name]||!this.manifest.models[name])return;this.loading[name]=true;const s=document.createElement('script');s.src='models/'+name+'.js';s.onload=()=>this.decode(name).catch(err=>{this.failed[name]=true;console.warn('modelo',name,err)});s.onerror=()=>{this.failed[name]=true;console.warn('modelo ausente',name)};document.head.appendChild(s);}
 async decode(name){const T=this.T,cfg=this.manifest.models[name],data=(window.NV_MODEL_DATA||{})[name];if(!data)return;
  const loader=new T.GLTFLoader();const parse=b64=>new Promise((res,rej)=>{const bin=atob(b64),buf=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)buf[i]=bin.charCodeAt(i);loader.parse(buf.buffer,'',res,rej)});
  const gltf=await parse(data.model),root=gltf.scene,byName={};for(const c of gltf.animations)byName[c.name]=c;
  // Cada clipe vira metade de baixo (quadril + pernas) e metade de cima (tronco, braços, cabeça).
  const clips={};for(const [role,clipName] of Object.entries(cfg.clips||{})){const c=byName[clipName];if(!c)continue;const lo=[],up=[];for(const t of c.tracks)(this.UPPER.test(t.name.split('.')[0])?up:lo).push(t);
   clips[role]={full:c,lo:new T.AnimationClip(role+'.lo',c.duration,lo),up:new T.AnimationClip(role+'.up',c.duration,up),speed:(c.userData&&c.userData.speed)||(role==='run'?5:1)};}
  // RECUO: correr de costas com o clipe de corrida invertido lia como boneco quebrado, porque essa corrida é uma
  // investida (quadril inclinado, cabeça baixa, braços para trás). O recuo usa só as PERNAS dela, com o giro do
  // quadril travado na postura do andar; o tronco vem do andar (ver animate()).
  if(clips.run&&clips.walk){const hipQ=clips.walk.lo.tracks.find(t=>t.name==='Hips.quaternion'),q=hipQ?Array.from(hipQ.values.slice(0,4)):null,tracks=clips.run.lo.tracks.map(t=>t.name==='Hips.quaternion'&&q?new T.QuaternionKeyframeTrack(t.name,[0,clips.run.lo.duration],[...q,...q]):t);clips.back={lo:new T.AnimationClip('back.lo',clips.run.lo.duration,tracks)};}
  // Objeto de mão (cfg.prop): maior lado = 1, centrado na origem; quem usa define tamanho/posição/giro no osso.
  const box=new T.Box3().setFromObject(root),dim=box.getSize(new T.Vector3());let upm=1;
  if(cfg.car){const dim2=dim,s=1/Math.max(dim2.x,dim2.z,1e-6);root.scale.setScalar(s);root.position.set(-(box.min.x+box.max.x)/2*s,-box.min.y*s,-(box.min.z+box.max.z)/2*s);
   root.traverse(o=>{if(!o.isMesh)return;o.frustumCulled=false;const src=[].concat(o.material)[0],map=src&&src.map||null,nm=src&&src.normalMap||null;o.material=new T.MeshLambertMaterial({map,normalMap:nm,color:src&&src.color?src.color.clone():0xffffff,emissiveMap:map,emissive:new T.Color(this.glow,this.glow,this.glow)});});
   const spin=new T.Group();spin.rotation.y=cfg.yaw||0;spin.add(root);const node=new T.Group();node.add(spin);node.visible=false;this.scene.add(node);
   this.cars[name]={node,cfg,mats:[],roof:dim2.y*s,body:spin,wheels:[],pods:[],built:false};node.traverse(o=>{if(o.isMesh)this.cars[name].mats.push(o.material)});
   this.models[name]={proto:null,clips:{},cfg,upm:1};delete window.NV_MODEL_DATA[name];return;}
  if(cfg.scenery){const s=1/(dim.y||1);root.scale.setScalar(s);root.position.set(-(box.min.x+box.max.x)/2*s,-box.min.y*s,-(box.min.z+box.max.z)/2*s);root.updateMatrixWorld(true);const parts=[];
   root.traverse(o=>{if(!o.isMesh)return;const g=o.geometry.clone();g.applyMatrix4(o.matrixWorld);const src=[].concat(o.material)[0],map=src&&src.map||null,mat=new T.MeshLambertMaterial({map,color:0xffffff,emissiveMap:map,emissive:new T.Color(cfg.glow||.12,cfg.glow||.12,cfg.glow||.12)}),im=new T.InstancedMesh(g,mat,cfg.max||40);im.frustumCulled=false;im.count=0;this.scene.add(im);parts.push(im);});
   this.decor[name]={parts,n:0,dummy:new T.Object3D()};this.models[name]={proto:null,clips:{},cfg,upm:1};delete window.NV_MODEL_DATA[name];return;}
  if(cfg.prop){const s=1/Math.max(dim.x,dim.y,dim.z,1e-6),c=box.getCenter(new T.Vector3());root.scale.setScalar(s);root.position.copy(c).multiplyScalar(-s);}
  else{upm=(cfg.height||2)/(dim.y||1);root.scale.setScalar(upm);root.position.set(-(box.min.x+box.max.x)/2*upm,-box.min.y*upm,-(box.min.z+box.max.z)/2*upm);} // upm = unidades do jogo por metro do modelo
  const proto=new T.Group();const spin=new T.Group();spin.rotation.y=cfg.yaw||0;spin.add(root);proto.add(spin);
  // Material fosco só com a textura de cor: barato no celular e sem depender de mapa de ambiente
  // (o PBR "metálico" dos geradores de IA fica preto sem ele). O mapa de relevo desenha rosto e
  // dobras sobre a malha leve. Emissivo com a própria textura levanta as sombras e acende os olhos.
  root.traverse(o=>{if(o.isMesh){o.frustumCulled=false;const src=[].concat(o.material)[0],map=src&&src.map||null,normalMap=src&&src.normalMap||null;o.material=new T.MeshLambertMaterial({map,normalMap,color:src&&src.color?src.color.clone():0xffffff,emissiveMap:map,emissive:new T.Color(this.glow,this.glow,this.glow)});if(normalMap&&src.normalScale)o.material.normalScale.copy(src.normalScale);}});
  this.models[name]={proto,clips,cfg,upm};delete window.NV_MODEL_DATA[name];
 }
 spawn(name,forceNew){const T=this.T,pool=this.pools[name]||(this.pools[name]=[]);if(pool.length&&!forceNew){const av=pool.pop();av.root.visible=true;return av;}
  const m=this.models[name],root=T.SkeletonUtils.clone(m.proto),mats=[],props=[];
  // Objetos de mão: tamanho (len) e posição (pos) em FRAÇÃO da altura do personagem, compensando a escala do
  // osso (o rig da Meshy é em centímetros). A mesma regra está em tools/preview-glb.cjs (--prop).
  if((m.cfg.props||[]).length)root.updateMatrixWorld(true);
  for(const p of m.cfg.props||[]){const pm=this.models[p.model],bone=root.getObjectByName(p.bone);if(!pm||!bone)continue;const H=m.cfg.height||2,ws=bone.getWorldScale(new T.Vector3()).x||1,node=pm.proto.clone(true);node.scale.setScalar((p.len||.28)*H/ws);node.position.fromArray((p.pos||[0,0,0]).map(v=>v*H/ws));node.rotation.fromArray(p.rot||[0,0,0]);bone.add(node);props.push({node,thrown:p.thrown!==false});}
  root.traverse(o=>{if(o.isMesh&&o.material){o.material=o.material.clone();mats.push(o.material);}});
  const mixer=new T.AnimationMixer(root),c=m.clips,act=(clip,once)=>{if(!clip)return null;const a=mixer.clipAction(clip);if(once){a.setLoop(T.LoopOnce,1);a.clampWhenFinished=true;}a.setEffectiveWeight(0);return a;};
  const loco={};for(const g of ['walk','run'])if(c[g])loco[g]={lo:act(c[g].lo),up:act(c[g].up),speed:c[g].speed};
  if(!loco.walk)loco.walk=loco.run;if(!loco.run)loco.run=loco.walk;const back=c.back?act(c.back.lo):null;if(back)back.play();
  const upper={};for(const r of ['hit','throw','swing','windup'])if(c[r])upper[r]=act(c[r].up,true);const stand=c.windup?act(c.windup.lo):null;if(stand)stand.play();
  for(const g of new Set([loco.walk,loco.run]))if(g){g.lo.play();g.up.play();}
  this.scene.add(root);return this.reset({id:this.ids++,name,m,root,mixer,loco,back,stand,upper,death:act(c.death&&c.death.full,true),mats,props});
 }
 reset(av){Object.assign(av,{b:0,face:0,st:0,past:1,stamp:-1,flash:null,acc:0,k:0,gait:'walk',ts:.6,busy:0,one:null,oneT:0,lastHit:0,hitCooldown:0,lastMode:null,lastAttack:null,propHide:0,px:null,pz:null,vx:0,vz:null,yaw:0,ox:0,oy:0,enter:null,fresh:true,squash:0});return av;}
 release(av){av.root.visible=false;if(av.one)av.one.stop();if(av.death)av.death.stop();for(const m of av.mats){m.opacity=1;m.transparent=false;}av.root.scale.set(1,1,1);av.root.rotation.set(0,0,0);this.reset(av);this.pools[av.name].push(av);}
 // Toca uma ação só do TRONCO de modo que o instante do golpe (fração `impact` do clipe) caia em `lead` segundos.
 strike(av,role,lead,impact){const a=av.upper[role];if(!a)return;const dur=a.getClip().duration;a.timeScale=Math.max(.7,Math.min(3.5,lead>0?impact*dur/lead:1));if(av.one&&av.one!==a)av.one.stop();a.reset().play();av.one=a;av.oneT=0;}
 animate(e,av,dt,vis){const m=av.m,s=e.scale||1,fast=e.mode==='charge'||e.mode==='rush';av.hitCooldown=Math.max(0,av.hitCooldown-dt);
  const past=!e.boss&&e.z>1.2?Math.max(0,1-(e.z-1.2)/2.7):1;if(past!==av.past&&!av.enter){av.past=past;for(const mt of av.mats){mt.transparent=past<1;mt.opacity=past;}}
  const flash=e.hit>0;if(flash!==av.flash){av.flash=flash;for(const mt of av.mats)mt.emissive.setScalar(flash?1.5:this.glow);}
  // --- velocidade sobre a pista, em m/s do corpo (+ = indo em direção ao carro) ---
  if(dt>0){if(av.pz!==null){const vz=(e.z-av.pz)/dt,vx=(vis-av.px)/dt;av.vz=av.vz===null?vz:av.vz+(vz-av.vz)*Math.min(1,dt*10);av.vx+=(vx-av.vx)*Math.min(1,dt*10);}av.pz=e.z;av.px=vis;}
  const away=e.boss&&(e.mode==='approach'||e.mode==='retreat');av.face+=((away?Math.PI:0)-av.face)*Math.min(1,dt*5.5);const fwd=Math.cos(av.face)<0?-1:1;
  const v=fwd*(av.vz===null?1:(av.vz-this.roadV)/(m.upm*s)),walkV=av.loco.walk.speed,runV=av.loco.run.speed;
  const planted=e.boss&&e.mode==='land'&&av.stand?1:0;av.st+=(planted-av.st)*Math.min(1,dt*8);
  // --- marcha: para a frente (anda/corre), quase parado na pista (passo lento) ou recuando de costas ---
  const vxb=av.vx/(m.upm*s);let dir=1,gait=av.gait,mag=v>=-1.5?Math.hypot(v,vxb):Math.abs(v); // andando para a frente, o deslocamento lateral (entrada, troca de faixa) também pede passada
  if(fast){gait='run';mag=Math.max(mag,runV*.9);}
  else if(v>=.3){const th=Math.max(2,walkV*2.1);gait=av.gait==='run'?(mag<th*.8?'walk':'run'):(mag>th?'run':'walk');}
  else if(v>-1.5&&Math.abs(vxb)<1){gait='walk';mag=walkV*.55;}
  else if(v>-1.5){const th=Math.max(2,walkV*2.1);gait=mag>th?'run':'walk';} // até 1,5 m/s "para trás" ainda se lê como avanço lento: recuar de costas ficaria pior
  else{dir=-1;const th=e.boss?6:3.2;gait=av.gait==='run'?(mag<th*.8?'walk':'run'):(mag>th?'run':'walk');}
  av.gait=gait;av.k+=((gait==='run'?1:0)-av.k)*Math.min(1,dt*6);
  // Chefe pisa pesado e sempre com um pé no chão: no andar a cadência fica entre 0,8x e 1,5x mesmo que a pista
  // peça mais (pista de cor lisa: deslize quase não se vê; gigante com os dois pés no ar lê como "flutuando").
  const heavy=e.boss&&gait==='walk',ts=dir*Math.max(heavy?.8:.45,Math.min(heavy?1.5:2.2,mag/(gait==='run'?runV:walkV)));av.ts+=(ts-av.ts)*Math.min(1,dt*7);
  // --- ações do tronco: telegrafias entram na troca de modo do engine ---
  if(e.mode!==av.lastMode){
   if(e.boss&&e.mode==='windup'){if(e.attack==='slam')this.strike(av,av.upper.swing?'swing':'windup',e.timer,.6);else if(e.attack==='rush')this.strike(av,'windup',e.timer,1);else this.strike(av,av.upper.throw?'throw':'windup',e.timer,.55);}
   else if(!e.boss&&e.kind==='thrower'&&e.mode==='aim')this.strike(av,'throw',e.timer,.55);
   const threw=(av.lastMode==='aim'&&e.kind==='thrower')||(av.lastMode==='windup'&&e.boss&&av.lastAttack&&av.lastAttack!=='slam'&&av.lastAttack!=='rush');if(threw)av.propHide=1.4;
   av.lastMode=e.mode;av.lastAttack=e.attack||null;}
  if(av.propHide>0)av.propHide-=dt;for(const p of av.props)p.node.visible=!(p.thrown&&av.propHide>0);
  // Dano: brilho sempre; tranco no tronco só de vez em quando (os mísseis acertam sem parar).
  if(e.hit>av.lastHit&&av.upper.hit&&!av.one&&!av.hitCooldown&&!e.boss){av.upper.hit.timeScale=1.7;av.upper.hit.reset().play();av.one=av.upper.hit;av.oneT=0;av.hitCooldown=2.6;}
  av.lastHit=e.hit;
  let want=0;if(av.one){const dur=av.one.getClip().duration/Math.abs(av.one.timeScale||1);av.oneT+=dt;if(av.oneT>=dur){av.one.stop();av.one=null;}else want=Math.min(1,av.oneT/.12,(dur-av.oneT)/.18);}
  av.busy+=(want-av.busy)*Math.min(1,dt*14);if(av.one)av.one.setEffectiveWeight(av.busy);
  // pesos: pernas sempre na marcha; tronco na marcha só enquanto não há ação
  const W=av.loco.walk,R=av.loco.run,free=1-(av.one?av.busy:0);
  const legs=1-av.st;if(av.stand)av.stand.setEffectiveWeight(av.st);
  if(W===R){W.lo.setEffectiveWeight(legs);W.up.setEffectiveWeight(free);W.lo.timeScale=W.up.timeScale=av.ts;}
  else{av.b+=((dir<0&&av.back?1:0)-av.b)*Math.min(1,dt*6);const kb=av.k*av.b,kf=av.k-kb;W.lo.setEffectiveWeight((1-av.k)*legs);R.lo.setEffectiveWeight(kf*legs);if(av.back){av.back.setEffectiveWeight(kb*legs);av.back.timeScale=gait==='run'?av.ts:dir*Math.max(.45,Math.min(2.2,mag/runV));}W.up.setEffectiveWeight((1-av.k+kb)*free);R.up.setEffectiveWeight(kf*free);
   const tw=dir*Math.max(.45,Math.min(2.2,mag/walkV)),tr=dir*Math.max(.45,Math.min(2.2,mag/runV));W.lo.timeScale=W.up.timeScale=gait==='walk'?av.ts:tw;R.lo.timeScale=R.up.timeScale=gait==='run'?av.ts:tr;}
  // leve giro do corpo na direção do deslocamento lateral (troca de faixa, entrada pela calçada)
  const yaw=Math.max(-1,Math.min(1,Math.atan2(av.vx,Math.abs((av.vz===null?this.roadV+1:av.vz)-this.roadV)+2.5)));av.yaw+=(yaw-av.yaw)*Math.min(1,dt*8);av.root.rotation.y=av.face+av.yaw*Math.cos(av.face);
  // Animação com nível de detalhe: lá no fundo o zumbi tem poucos pixels, atualizar o esqueleto a cada 2-3
  // quadros (com o tempo acumulado) é invisível e corta boa parte do custo de CPU da horda.
  const every=e.z<-80?3:e.z<-52?2:1;av.acc+=dt;if(every===1||(this.frameNo+av.id)%every===0){av.mixer.update(av.acc);av.acc=0;}
 }
 // Entrada: ninguém brota na pista. Comum vem da calçada para a sua faixa, lá no fundo, com fade;
 // chefe cai do alto, levanta poeira e ruge. É só visual: a posição do engine (e.x,e.z) não muda.
 enter(e,av,dt){if(av.fresh){av.fresh=false;if(e.boss)av.enter={boss:true,t:0,dur:.85};else if(e.z<-72){const side=e.x>.3?1:e.x<-.3?-1:(this.flip=-this.flip);av.enter={t:0,dur:2,side};for(const m of av.mats){m.transparent=true;m.opacity=0;}}}
  const en=av.enter;if(!en){av.ox=0;av.oy=0;}else{en.t+=dt;const k=Math.min(1,en.t/en.dur);
   if(en.boss){av.oy=15*(1-k)*(1-k);if(k>=1){av.enter=null;av.oy=0;av.squash=.28;this.renderer.landing(e);if(!av.one)this.strike(av,'windup',1.1,1);}}
   else{const o=1-k;av.ox=en.side*6.2*o*o;const op=Math.min(1,en.t/.3);for(const m of av.mats)m.opacity=op;if(k>=1){av.enter=null;av.ox=0;for(const m of av.mats){m.opacity=1;m.transparent=false;}}}}
  if(av.squash>0)av.squash=Math.max(0,av.squash-dt);}
 // Chamado pelo Renderer.burst quando o engine mata um inimigo (ele some do jogo na hora):
 // queda acelerada e desaparecimento em `deathTime`, rolando junto com a pista.
 die(e,side){const av=this.avatars.get(e);if(!av||!this.live.includes(av))return;this.avatars.delete(e);this.live.splice(this.live.indexOf(av),1);
  if(!av.death||(side&&e.kind==='bomber'&&!e.rammed)){this.release(av);return;}
  for(const g of new Set([av.loco.walk,av.loco.run])){g.lo.setEffectiveWeight(0);g.up.setEffectiveWeight(0);}if(av.back)av.back.setEffectiveWeight(0);if(av.stand)av.stand.setEffectiveWeight(0);if(av.one){av.one.stop();av.one=null;}
  av.death.timeScale=Math.max(1,av.death.getClip().duration*.75/this.deathTime);av.death.reset().setEffectiveWeight(1).play();for(const m of av.mats){m.transparent=true;m.emissive.setScalar(this.glow);}
  this.dying.push({av,z:e.z,x:e.x+av.ox,y:0,t:0,toss:side?{vx:side*(4+Math.random()*3),vy:5.5+Math.random()*2,spin:-side*(5+Math.random()*4)}:null});
 }
 render(game,dt){if(!this.ok)return;const r=this.renderer;if(game.level&&game.level!==this.level){this.level=game.level;this.prepare(game.level);}
  this.camera.position.set(...r.eye);this.camera.lookAt(...r.target);const fovDeg=(r.fov||.78)*180/Math.PI;if(Math.abs(this.camera.fov-fovDeg)>.01){this.camera.fov=fovDeg;this.camera.updateProjectionMatrix();}
  const scroll=game.roadScroll||game.distance||0,dz=this.lastScroll===null?0:Math.max(0,scroll-this.lastScroll);this.lastScroll=scroll;if(dt>0&&dz>0)this.roadV+=(dz/dt-this.roadV)*Math.min(1,dt*6);
  const stamp=++this.frameNo,next=this.spare;next.length=0;let created=0;
  for(const e of this.queue){const name=this.modelName(e);let av=this.avatars.get(e);
   if(!av||av.name!==name){if(av)this.release(av);const pool=this.pools[name];if(!(pool&&pool.length)){if(created>=2)continue;created++;}av=this.spawn(name);this.avatars.set(e,av);} // piscina vazia: no máximo 2 clones por quadro, o resto entra nos próximos (estão no fundo, em fade)
   av.stamp=stamp;next.push(av);this.enter(e,av,dt);this.animate(e,av,dt,e.x+av.ox);
   const s=e.scale||1,q=av.squash>0?Math.sin(Math.PI*(1-av.squash/.28))*.16:0;av.root.position.set(e.x+av.ox,av.oy,e.z);av.root.scale.set(s*(1+q*.5),s*(1-q),s*(1+q*.5));
  }
  for(const av of this.live)if(av.stamp!==stamp)this.release(av);
  this.spare=this.live;this.live=next;this.queue.length=0;
  // Mortos rolam junto com a pista até a animação acabar.
  for(const d of this.dying){d.t+=dt;d.z+=dz;if(d.toss){d.x+=d.toss.vx*dt;d.toss.vy-=20*dt;d.y=Math.max(0,d.y+d.toss.vy*dt);if(d.y>0)d.av.root.rotation.z+=d.toss.spin*dt;d.z-=dz*.45;}d.av.root.position.set(d.x,d.y,d.z);d.av.mixer.update(dt);const fade=Math.min(1,Math.max(0,(this.deathTime-d.t)/(this.deathTime*.45)));for(const m of d.av.mats)m.opacity=fade;}
  this.dying=this.dying.filter(d=>{const done=d.t>=this.deathTime||d.z>6;if(done)this.release(d.av);return !done;});
  for(let i=this.shotN;i<this.shots.length;i++)this.shots[i].visible=false;const flying=this.shotN;this.shotN=0;
  let decorN=this.decorN;this.decorN=0;for(const c of Object.values(this.cars)){c.node.visible=!!c.placed;if(c.placed)decorN++;c.placed=false;}for(const d of Object.values(this.decor)){for(const p of d.parts){p.count=d.n;p.instanceMatrix.needsUpdate=true;}d.n=0;}
  if(!this.live.length&&!this.dying.length&&!flying&&!decorN)return;
  this.gl.resetState();this.gl.render(this.scene,this.camera);r.restoreState();
 }
}
