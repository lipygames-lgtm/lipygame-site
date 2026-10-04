'use strict';
class Renderer{
 // WebGL2 quando existe (a camada de personagens Three.js exige); WebGL1 continua funcionando sem ela.
 constructor(canvas){this.canvas=canvas;const opts={alpha:true,antialias:true,powerPreference:'high-performance'};const g=this.g=canvas.getContext('webgl2',opts)||canvas.getContext('webgl',opts);if(!g)throw Error('WebGL unavailable');this.ext=g.getExtension('ANGLE_instanced_arrays')||(g.drawArraysInstanced?{vertexAttribDivisorANGLE:(l,d)=>g.vertexAttribDivisor(l,d),drawArraysInstancedANGLE:(m,f,c,n)=>g.drawArraysInstanced(m,f,c,n)}:null);this.batches={};this.drawCalls=0;this.instances=0;this.visualTime=0;const vs=`attribute vec3 a;attribute vec3 n;${this.ext?'attribute vec4 i0;attribute vec4 i1;attribute vec4 i2;attribute vec4 i3;attribute vec3 tint;attribute float finish;':'uniform mat4 m;uniform vec3 color;uniform float finish;'}uniform mat4 vp;varying vec3 normal;varying vec3 world;varying vec3 base;varying vec3 local;varying float surface;void main(){${this.ext?'mat4 m=mat4(i0,i1,i2,i3);vec3 color=tint;':''}vec4 p=m*vec4(a,1.);gl_Position=vp*p;world=p.xyz;local=a;normal=normalize(mat3(m[0].xyz/dot(m[0].xyz,m[0].xyz),m[1].xyz/dot(m[1].xyz,m[1].xyz),m[2].xyz/dot(m[2].xyz,m[2].xyz))*n);base=color;surface=finish;}`;
 const fs=`precision highp float;uniform vec3 eye;uniform vec3 fogColor;varying vec3 normal;varying vec3 world;varying vec3 base;varying vec3 local;varying float surface;
 void main(){if(surface<-.5){float d=length(local.xz)*2.;float alpha=(1.-smoothstep(.1,1.,d))*.38;gl_FragColor=vec4(.06,.09,.13,alpha);return;}
 if(surface>1.5){gl_FragColor=vec4(base,clamp(surface-2.,0.,1.));return;}
 vec3 N=normalize(normal),V=normalize(eye-world),L=normalize(vec3(-.55,1.,.65)),H=normalize(L+V);float ndl=max(0.,dot(N,L));float gloss=surface;float fres=pow(1.-max(dot(N,V),0.),4.);vec3 R=reflect(-V,N);
 vec3 env=mix(vec3(.12,.20,.30),vec3(.80,.91,1.),smoothstep(-.35,.85,R.y));
 float strip=pow(max(0.,1.-abs(R.y-.55)*5.),12.)*.75+pow(max(0.,dot(R,normalize(vec3(-.6,.6,-.4)))),42.);
 float spec=pow(max(dot(N,H),0.),mix(18.,100.,gloss));
 float hemi=.5+.5*N.y;vec3 diffuse=base*(vec3(.24,.30,.40)+vec3(.40,.43,.45)*hemi+vec3(.65,.59,.48)*ndl);
 vec3 c=diffuse+mix(vec3(.025),base*.5+vec3(.3),gloss)*spec*1.35;
 c=mix(c,env*mix(vec3(.6),base*.7+vec3(.3),gloss),gloss*(.12+.36*fres));c+=vec3(strip)*gloss*.55;
 c+=vec3(.15,.34,.40)*pow(max(dot(N,normalize(vec3(1.,.4,-1.))),0.),3.)*.22;
 float fog=clamp((-world.z-38.)/110.,0.,.85);c=mix(c,fogColor,fog);gl_FragColor=vec4(clamp(c,0.,1.),1.);}`;let sh=(t,s)=>{let x=g.createShader(t);g.shaderSource(x,s);g.compileShader(x);if(!g.getShaderParameter(x,g.COMPILE_STATUS))throw Error(g.getShaderInfoLog(x));return x};this.p=g.createProgram();g.attachShader(this.p,sh(g.VERTEX_SHADER,vs));g.attachShader(this.p,sh(g.FRAGMENT_SHADER,fs));g.linkProgram(this.p);g.useProgram(this.p);this.u={};['m','vp','color','eye','finish','fogColor'].forEach(k=>this.u[k]=g.getUniformLocation(this.p,k));let verts=[];const face=(n,p)=>{[0,1,2,0,2,3].forEach(i=>verts.push(...p[i],...n))};face([0,0,1],[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]);face([0,0,-1],[[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5]]);face([1,0,0],[[.5,-.5,.5],[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5]]);face([-1,0,0],[[-.5,-.5,-.5],[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5]]);face([0,1,0],[[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5]]);face([0,-1,0],[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5],[-.5,-.5,.5]]);this.cube=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,this.cube);g.bufferData(g.ARRAY_BUFFER,new Float32Array(verts),g.STATIC_DRAW);this.currentMesh=this.cube;this.cylinder=g.createBuffer();let cv=[];for(let j=0;j<24;j++){let a=j*Math.PI/12,b=(j+1)*Math.PI/12;let y=Math.cos(a)*.5,z=Math.sin(a)*.5,Y=Math.cos(b)*.5,Z=Math.sin(b)*.5;for(let side of [-1,1]){cv.push(side*.5,0,0,side,0,0,side*.5,y,z,side,0,0,side*.5,Y,Z,side,0,0);}for(let q of [[-.5,y,z],[.5,y,z],[.5,Y,Z],[-.5,y,z],[.5,Y,Z],[-.5,Y,Z]])cv.push(...q,0,q[1]*2,q[2]*2);}g.bindBuffer(g.ARRAY_BUFFER,this.cylinder);g.bufferData(g.ARRAY_BUFFER,new Float32Array(cv),g.STATIC_DRAW);this.cylCount=cv.length/6;g.bindBuffer(g.ARRAY_BUFFER,this.cube);['a','n'].forEach((k,i)=>{let l=g.getAttribLocation(this.p,k);g.enableVertexAttribArray(l);g.vertexAttribPointer(l,3,g.FLOAT,false,24,i*12)});g.enable(g.DEPTH_TEST);this.meshes={cube:{buffer:this.cube,count:36},round:{buffer:this.cylinder,count:this.cylCount}};this.makeHull();this.makeSmoothMeshes();this.instanceBuffer=g.createBuffer();this.attrs={};['a','n','i0','i1','i2','i3','tint','finish'].forEach(k=>this.attrs[k]=g.getAttribLocation(this.p,k));this.particles=[];this.labels=[];this.explosions=[];this.fxBatches={alpha:[],add:[]};this.scenery=typeof Scenery!=='undefined'?new Scenery(this):null;this.shake=0;this.boostK=0;this.streaks=[];this.zaps=[];this.coinSeen=new WeakMap();this.lift=0;this.fov=.78;this.decals=[];this.coins=[];this.impacts=[];this.puffs=[];this.tools=[];this.jolt=0;this.coinHits=0;this.lastScroll=null;this.roadDz=0;this.shockTrail=new WeakMap();this.resize();}
 // Modelo 3D do carro do tier (models/manifest.json → cars[tier]); vazio = carro desenhado por código.
 carModel(tier){const M=window.NV_MODELS;return M&&M.cars?M.cars[tier]||null:null;}
 mul(a,b){let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o;}
 setScale(s){if(Math.abs(s-(this.scale||1))<.01)return;this.scale=s;this.resize();}
 resize(){let d=Math.min(devicePixelRatio||1,2)*(this.scale||1);this.w=this.canvas.clientWidth;this.h=this.canvas.clientHeight;this.canvas.width=this.w*d;this.canvas.height=this.h*d;this.g.viewport(0,0,this.canvas.width,this.canvas.height);if(this.chars)this.chars.resize();}
 // Devolve o estado GL que o Three.js altera (VAO, programa, cull, depth) antes de desenhar por aqui.
 restoreState(){const g=this.g;if(g.bindVertexArray)g.bindVertexArray(null);g.useProgram(this.p);g.disable(g.CULL_FACE);g.disable(g.BLEND);g.disable(g.SCISSOR_TEST);g.depthMask(true);g.depthFunc(g.LESS);g.enable(g.DEPTH_TEST);g.colorMask(true,true,true,true);g.viewport(0,0,this.canvas.width,this.canvas.height);g.bindBuffer(g.ARRAY_BUFFER,null);g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,null);}
 camera(eye,target){this.eye=eye;this.target=target;let sub=(a,b)=>a.map((v,i)=>v-b[i]),norm=a=>{let l=Math.hypot(...a);return a.map(v=>v/l)},cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);let z=norm(sub(eye,target)),x=norm(cross([0,1,0],z)),y=cross(z,x),v=[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1];let f=1/Math.tan((this.fov||.78)/2),asp=this.w/this.h,near=.1,far=180;let p=[f/asp,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0];this.vp=this.mul(p,v);this.g.uniformMatrix4fv(this.u.vp,false,this.vp);this.g.uniform3fv(this.u.eye,eye);}
 makeHull(){const g=this.g,v=[];const rings=[{y:-.5,w:.88,l:.92},{y:-.32,w:1,l:1},{y:.27,w:1,l:.96},{y:.5,w:.82,l:.8}];const ring=r=>[[-.5*r.w,r.y,-.5*r.l],[.5*r.w,r.y,-.5*r.l],[.5*r.w,r.y,.5*r.l],[-.5*r.w,r.y,.5*r.l]];const face=(a,b,c,d)=>{let u=b.map((x,i)=>x-a[i]),w=c.map((x,i)=>x-a[i]),n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]],l=Math.hypot(...n);n=n.map(x=>x/l);[a,b,c,a,c,d].forEach(p=>v.push(...p,...n))};for(let j=0;j<3;j++){let a=ring(rings[j]),b=ring(rings[j+1]);for(let k=0;k<4;k++)face(a[k],b[k],b[(k+1)%4],a[(k+1)%4]);}let t=ring(rings[3]),b=ring(rings[0]);face(t[3],t[2],t[1],t[0]);face(b[0],b[1],b[2],b[3]);let buffer=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,buffer);g.bufferData(g.ARRAY_BUFFER,new Float32Array(v),g.STATIC_DRAW);this.meshes.hull={buffer,count:v.length/6};}
 // Smooth meshes are original geometry; no external model or texture dependencies.
 makeSmoothMeshes(){const g=this.g;const add=(name,v)=>{let buffer=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,buffer);g.bufferData(g.ARRAY_BUFFER,new Float32Array(v),g.STATIC_DRAW);this.meshes[name]={buffer,count:v.length/6};};
 const sphere=[];const point=(u,v)=>[Math.sin(v)*Math.cos(u),Math.cos(v),Math.sin(v)*Math.sin(u)];for(let j=0;j<8;j++)for(let i=0;i<12;i++){let u=i*Math.PI/6,U=(i+1)*Math.PI/6,v=j*Math.PI/8,V=(j+1)*Math.PI/8;for(let n of [point(u,v),point(u,V),point(U,V),point(u,v),point(U,V),point(U,v)])sphere.push(...n.map(x=>x*.5),...n);}add('sphere',sphere);
 const rounded=[];let r=.18;for(let axis=0;axis<3;axis++)for(let sign of [-1,1])for(let i=0;i<4;i++)for(let j=0;j<4;j++){const point=(u,v)=>{let p=[0,0,0];p[axis]=sign*.5;p[(axis+1)%3]=u;p[(axis+2)%3]=v;let q=p.map(x=>Math.max(-.5+r,Math.min(.5-r,x))),n=p.map((x,k)=>x-q[k]),l=Math.hypot(...n);n=n.map(x=>x/l);return [...q.map((x,k)=>x+n[k]*r),...n]};let u=-.5+i/4,v=-.5+j/4,U=u+1/4,V=v+1/4;for(let a of [point(u,v),point(U,v),point(U,V),point(u,v),point(U,V),point(u,V)])rounded.push(...a);}add('smooth',rounded);
 // Longitudinal lofts give the body and windshield continuous curved silhouettes.
 const loft=(name,rings)=>{const sample=(t,a)=>{let q=t*(rings.length-1),i=Math.min(rings.length-2,Math.floor(q)),f=q-i;let r=[0,1,2,3].map(k=>{let p0=rings[Math.max(0,i-1)][k],p1=rings[i][k],p2=rings[i+1][k],p3=rings[Math.min(rings.length-1,i+2)][k];return .5*((2*p1)+(-p0+p2)*f+(2*p0-5*p1+4*p2-p3)*f*f+(-p0+3*p1-3*p2+p3)*f*f*f)});let c=Math.cos(a),v=Math.sin(a);return [r[1]*Math.sign(c)*Math.pow(Math.abs(c),.65),r[2]+r[3]*Math.sign(v)*Math.pow(Math.abs(v),.65),r[0]];};let v=[];const vertex=(t,a)=>{let p=sample(t,a),u=sample(Math.min(1,t+.001),a),d=sample(Math.max(0,t-.001),a),r=sample(t,a+.001),l=sample(t,a-.001),T=u.map((x,k)=>x-d[k]),A=r.map((x,k)=>x-l[k]),n=[A[1]*T[2]-A[2]*T[1],A[2]*T[0]-A[0]*T[2],A[0]*T[1]-A[1]*T[0]],len=Math.hypot(...n)||1;return [...p,...n.map(x=>x/len)]};for(let j=0;j<24;j++)for(let i=0;i<24;i++){let t=j/24,T=(j+1)/24,a=i*Math.PI/12,A=(i+1)*Math.PI/12;for(let p of [vertex(t,a),vertex(T,a),vertex(T,A),vertex(t,a),vertex(T,A),vertex(t,A)])v.push(...p);}add(name,v);};
 loft('body',[[-.5,.02,-.1,.02],[-.47,.39,-.02,.30],[-.32,.49,0,.43],[0,.50,0,.48],[.32,.49,0,.42],[.47,.41,-.02,.31],[.5,.02,-.1,.02]]);
 loft('canopy',[[-.5,.02,-.45,.02],[-.4,.32,-.25,.16],[-.18,.45,.02,.43],[.1,.46,.05,.45],[.34,.39,-.05,.34],[.48,.24,-.30,.12],[.5,.01,-.43,.01]]);
 add('shadow',[-.5,0,-.5,0,1,0,.5,0,-.5,0,1,0,.5,0,.5,0,1,0,-.5,0,-.5,0,1,0,.5,0,.5,0,1,0,-.5,0,.5,0,1,0]);
 }
 box(x,y,z,sx,sy,sz,color,ry=0,shape=false,finish){let key=shape===true?'round':shape||'cube',c=Math.cos(ry),s=Math.sin(ry);if(finish===undefined)finish=key==='shadow'?-1:key==='smooth'?.72:key==='sphere'?.3:.04;let data=[c*sx,0,-s*sx,0,0,sy,0,0,s*sz,0,c*sz,0,x,y,z,1,((color>>16)&255)/255,((color>>8)&255)/255,(color&255)/255,finish];(this.batches[key]||(this.batches[key]=[])).push(...data);this.instances++;}
 flush(){const g=this.g;let batches=Object.entries(this.batches).sort((a,b)=>(a[0]==='shadow'?1:0)-(b[0]==='shadow'?1:0));for(let [key,data] of batches){let shadow=key==='shadow';if(shadow){g.enable(g.BLEND);g.blendFunc(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA);g.depthMask(false);}else{g.disable(g.BLEND);g.depthMask(true);}let mesh=this.meshes[key];g.bindBuffer(g.ARRAY_BUFFER,mesh.buffer);for(let [name,offset] of [['a',0],['n',12]]){g.enableVertexAttribArray(this.attrs[name]);g.vertexAttribPointer(this.attrs[name],3,g.FLOAT,false,24,offset);}if(this.ext){g.bindBuffer(g.ARRAY_BUFFER,this.instanceBuffer);g.bufferData(g.ARRAY_BUFFER,new Float32Array(data),g.DYNAMIC_DRAW);['i0','i1','i2','i3','tint','finish'].forEach((name,j)=>{let l=this.attrs[name];g.enableVertexAttribArray(l);g.vertexAttribPointer(l,j===4?3:j===5?1:4,g.FLOAT,false,80,j===5?76:j*16);this.ext.vertexAttribDivisorANGLE(l,1)});this.ext.drawArraysInstancedANGLE(g.TRIANGLES,0,mesh.count,data.length/20);this.drawCalls++;}else{for(let i=0;i<data.length;i+=20){g.uniformMatrix4fv(this.u.m,false,new Float32Array(data.slice(i,i+16)));g.uniform3fv(this.u.color,data.slice(i+16,i+19));g.uniform1f(this.u.finish,data[i+19]);g.drawArrays(g.TRIANGLES,0,mesh.count);this.drawCalls++;}}}g.disable(g.BLEND);g.depthMask(true);this.batches={};}
 car(x,z,tier,time,rot=0,scale=1,shots=1){
 const paint=NV.CARS[tier].color,dark=0x101d2a,glass=0x143f57,metal=tier===11?0xffe2a0:0xc1d5e5,suv=tier===4||tier===5,sport=tier>=6&&tier!==10&&tier!==12;
 const w=suv?1.85:sport?1.86:1.62,l=tier===10?3.9:suv?3.45:sport?3.65:2.95,ride=suv?.16:0;
 const part=(dx,y,dz,a,b,c,col,shape='smooth',gloss=.8)=>this.box(x+(dx*Math.cos(rot)+dz*Math.sin(rot))*scale,(y+ride)*scale+lift,z+(-dx*Math.sin(rot)+dz*Math.cos(rot))*scale,a*scale,b*scale,c*scale,col,rot,shape,gloss);
 const lift=this.lift||0,sh=1-Math.min(.5,lift*.17);this.box(x+.18,.023,z+.2,w*scale*1.65*sh,1,l*scale*1.25*sh,0,rot,'shadow');
 const m3=this.chars&&this.chars.hasCar&&this.carModel&&this.chars.hasCar(this.carModel(tier))?this.carModel(tier):null;
 // Rodas giram pela distância já rodada dividida pelo raio da roda; o número de lançadores acompanha os mísseis.
 if(m3){const cf=window.NV_MODELS.models[m3]||{},wd=(cf.wheel||{}).d||.3,raio=Math.max(.05,wd*l*scale/2),giro=-(this.lastScroll||0)/raio,pods=Math.min(3,Math.ceil(Math.min(10,shots)/4));this.chars.placeCar(m3,x,lift,z,rot,l*scale,this.carFlash,giro,pods,this.roll||0);}
 // RODA DESENHADA (manifesto: wheel sem "model"): disco perfeito, sempre no eixo e na proporção certa. Encaixar
 // uma roda GERADA saía torta e oval, e a posição vinha de medir uma caixa de roda vazia — um chute por carro.
 // Aqui a posição é a mesma medida, mas a peça é geometria limpa: pneu, aro, cubo e raios que giram com a pista.
 if(m3){const W=(window.NV_MODELS.models[m3]||{}).wheel;
  if(W&&!W.model){const D=W.d*l,LA=(W.w||.14)*l,R=Math.max(.05,D*scale/2),ang=-(this.lastScroll||0)/R;
   const pneu=W.tire??0x15181c,aro=W.rim??0x8d969e,cubo=W.hub??0x2a3036,raio=W.spoke??(W.rim??0x8d969e);
   // O corpo vem com as caixas de roda VAZIAS (tiramos as rodas da arte), então elas ficam vazadas: sem isto
   // dá para ver através do carro. Um chassi escuro entre os eixos e uma caixa atrás de cada roda fecham o buraco.
   part(0,W.y*l*.92,0,W.x*2*l*.92,W.y*l*1.25,(W.zf+W.zr)*l*.99,0x14171b,'smooth',.08);
   for(const side of [-1,1])for(const zz of [W.zf*l,-W.zr*l]){const px=side*W.x*l,py=W.y*l,fora=side*LA;
    part(px-fora*.42,py,zz,LA*.5,D*.94,D*.94,0x14171b,'round',.08);
    part(px,py,zz,LA,D,D,pneu,'round',.1);
    part(px+fora*.52,py,zz,LA*.12,D*.70,D*.70,aro,'round',.85);
    part(px+fora*.55,py,zz,LA*.10,D*.54,D*.54,cubo,'round',.35);
    part(px+fora*.60,py,zz,LA*.10,D*.20,D*.20,aro,'round',.9);
    for(let s=0;s<5;s++){const a=ang+s*1.2566;part(px+fora*.58,py+Math.sin(a)*D*.20,zz+Math.cos(a)*D*.20,LA*.10,D*.16,D*.16,raio,'round',.8);}}}}
 if(!m3){part(0,.24,0,w,.24,l,dark);part(0,.47,0,w,.63,l,paint,'body');part(0,.67,-l*.26,w*.83,.18,l*.39,paint,'body');
 // Curved fenders and a rounded glass canopy, framed by roof and pillars.
 part(0,.99,.16,w*.83,sport?.62:.83,l*.58,glass,'canopy',1);
 part(0,sport?1.23:1.32,.3,w*.69,.12,l*.24,paint,'sphere');
 for(let side of [-1,1]){part(side*w*.37,1.02,.38,.075,.49,.11,paint);part(side*w*.40,.86,.18,.07,.09,l*.53,metal);part(side*w*.50,.48,0,.09,.25,l*.6,paint);part(side*w*.52,.93,-.45,.26,.14,.26,paint);
 for(let zz of [-l*.30,l*.30]){part(side*w*.43,.52,zz,.5,.55,.98,paint,'smooth');part(side*w*.51,.36,zz,.31,.74,.74,0x101822,'round',.09);part(side*w*.60,.36,zz,.035,.54,.54,metal,'round',.92);part(side*w*.617,.36,zz,.043,.39,.39,dark,'round',.35);part(side*w*.631,.36,zz,.05,.16,.16,metal,'round',1);
 for(let spoke=0;spoke<5;spoke++){let a=spoke*Math.PI*.4+(time||0)*2;part(side*w*.633,.36+Math.sin(a)*.13,zz+Math.cos(a)*.13,.04,.08,.08,metal,'sphere',1);}}
 part(side*w*.33,.66,-l*.48,.47,.12,.19,0xc5faff,'smooth',1);part(side*w*.34,.59,l*.49,.46,.105,.13,0xff493c,'smooth',.9);
 part(side*w*.45,.24,0,.12,.12,l*.6,dark);part(side*.39,.25,l*.52,.21,.16,.22,metal,'round');}
 part(0,.41,-l*.49,w*.53,.23,.12,dark);for(let i=-3;i<=3;i++)part(i*.12,.41,-l*.511,.033,.15,.03,metal);
 part(0,.21,-l*.49,w*.96,.09,.23,dark);part(0,.56,l*.504,.36,.13,.055,0xe4edf1);
 if(sport){for(let side of [-1,1]){part(side*.53,.79,-.72,.17,.032,.5,dark);part(side*.62,.91,l*.35,.075,.35,.13,dark);}part(0,1.11,l*.36,w*1.10,.11,.40,paint);}
 if(suv)for(let side of [-1,1])part(side*.54,1.53,.2,.075,.08,1.65,dark);
 if(tier===10){part(0,.59,-l*.501,.63,.40,.1,metal);part(0,.82,-1.65,.09,.18,.08,metal);}
 // Compact launcher with rounded housing and visible individual missile tubes.
 }
 // Carro com lançador PRÓPRIO (peça da arte): o lançador desenhado por código sai de cena.
 // armaPropria: o veiculo ja traz o lancador dentro do corpo (a moto), entao o desenhado aqui sai.
 const cfm=m3?(window.NV_MODELS.models[m3]||{}):{},temPeca=m3&&(cfm.launcher||cfm.armaPropria);
 const dy=m3?this.chars.carRoof(m3)*l-1.32:0; // teto do modelo medido; 1.32 é o teto do carro desenhado
 // LANÇADOR, copiado da arte do dono: berço escuro, caixa de munição atrás, foguetes cinza com faixa laranja
 // e PONTA VERMELHA, em fileiras de até 3. A ponta vermelha é o que se enxerga com o carro pequeno na tela;
 // por isso ela é desenhada aqui e não sai de um modelo (um modelo escuro vira borrão a essa distância).
 if(!temPeca){const tubes=Math.min(10,shots),cols=Math.min(3,tubes),gap=.32,ly=1.31+dy;
  const frame=0x1b2026,tubo=0x9aa5ae,band=0xe8902a,tip=0xd8322a;
  part(0,ly,.16,cols*gap+.26,.17,.72,frame);
  for(let side of [-1,1])part(side*(cols*gap+.26)*.5,ly+.05,.16,.05,.1,.74,paint,'smooth',.6);
  part(0,ly+.19,.60,cols*gap*.58,.36,.30,frame);
  part(0,ly+.19,.755,cols*gap*.34,.18,.04,band,'smooth',.7);
  for(let j=0;j<tubes;j++){const c=j%cols,r=Math.floor(j/cols),inRow=Math.min(cols,tubes-r*cols);
   const xx=(c-(inRow-1)/2)*gap,yy=ly+.20+r*.27;
   part(xx,yy,.30,.20,.20,.12,frame,'smooth',.45);
   part(xx,yy,-.10,.225,.225,.78,tubo,'smooth',.55);
   part(xx,yy,-.52,.245,.245,.09,band,'smooth',.7);
   part(xx,yy,-.74,.205,.205,.42,tip,'sphere',.5);}}
 }
 zombie(e){let s=e.scale||1,phase=e.phase||0,bob=Math.sin(phase*2)*.035,body=e.boss?(e.final?0xd67e25:0x6956a0):e.kind==='bomber'?0xef8232:e.kind==='runner'?0xf5c529:e.kind==='thrower'?0x2694c0:e.kind==='bruiser'?0x697a99:0x3078af,skin=e.hit>0?0xffffff:0x8dcc55,dark=0x183047;
 const part=(x,y,z,w,h,d,col,shape='sphere',gloss=.27)=>this.box(e.x+x*s,(y+bob)*s,e.z+z*s,w*s,h*s,d*s,col,0,shape,gloss);
 if(e.boss||e.z<2.4)this.box(e.x+(this.chars?this.chars.dx(e):0)+.16*s,.024,e.z+.17*s,1.65*s,1,1.35*s,0,0,'shadow'); // dx: entrada visual pela calçada
 if(this.chars&&this.chars.wants(e)){this.chars.push(e);return;} // modelo 3D disponível: só a sombra fica aqui
 part(0,.86,0,.78,.87,.53,body,'smooth',.25);part(0,1.20,0,.31,.21,.32,skin);
 part(0,1.53,.015,.68,.65,.61,skin);part(0,1.37,.18,.53,.28,.40,skin);
 // Oversized eyes, eyelids, nose and teeth remain readable from the game camera.
 for(let side of [-1,1]){part(side*.155,1.59,.278,.25,.24,.13,0xeaffaf);part(side*.155,1.58,.337,.085,.115,.035,0x132333);part(side*.17,1.716,.255,.26,.055,.1,body,'smooth');}
 part(0,1.46,.336,.13,.16,.13,skin);part(0,1.32,.337,.29,.125,.045,0x263536,'smooth');for(let j=0;j<3;j++)part(-.075+j*.075,1.36,.365,.054,.065,.025,0xf8edd0,'smooth');
 const aiming=e.mode==='windup'||e.mode==='aim';for(let side of [-1,1]){let stride=Math.sin(phase+side*1.57)*.18;part(side*.205,.34,stride,.27,.56,.30,dark,'smooth');part(side*.205,.12,stride+.07,.33,.22,.47,0x14232f,'smooth');part(side*.45,1.10,0,.3,.42,.34,body);part(side*.49,aiming?1.43:.88,aiming?.2:.12+stride*.4,.22,.51,.25,skin);part(side*.49,aiming?1.68:.66,aiming?.22:.20+stride*.4,.28,.29,.29,skin);}
 part(0,1.83,-.005,.72,.19,.65,body,'smooth');part(0,1.77,.3,.70,.07,.32,dark,'smooth');
 if(e.kind==='runner'||e.kind==='bomber'){part(0,1.83,0,.76,.30,.7,0xffcf36);for(let side of [-1,1])part(side*.23,.94,.278,.09,.5,.034,0xfcf6c2,'smooth');}
 if(e.kind==='walker'){part(-.18,1.08,.275,.13,.14,.045,0xffd76c,'smooth');part(0,.57,.25,.69,.09,.05,dark,'smooth');}
 if(e.kind==='thrower'||e.boss){for(let side of [-1,1])part(side*.2,1.1,.25,.1,.35,.055,0x254b77,'smooth');part(0,.85,.27,.43,.28,.08,0x234b73,'smooth');let y=aiming?1.8:.9;part(.63,y,.2,.12,.7,.12,0xb5cee1,'smooth',.8);part(.63,y+.36,.2,.38,.21,.14,0xd7e7f3,'smooth',.8);part(.63,y+.40,.285,.13,.13,.03,dark,'smooth');}
 if(e.kind==='bruiser'||e.boss){for(let side of [-1,1])part(side*.45,1.21,0,.43,.34,.5,body,'smooth');part(0,.92,.26,.59,.45,.12,0x45647d,'smooth');}
 if(e.kind==='bomber'){part(0,.8,.38,.52,.48,.36,0x232d40);part(0,1.08,.39,.10,.13,.10,0xff6145);}
 }
 project(x,y,z){let m=this.vp,w=m[3]*x+m[7]*y+m[11]*z+m[15];return {x:(1+(m[0]*x+m[4]*y+m[8]*z+m[12])/w)*this.w/2,y:(1-(m[1]*x+m[5]*y+m[9]*z+m[13])/w)*this.h/2,w};}
 // Efeitos sem iluminação (finish = 2 + alfa): esferas translúcidas, aditivas (fogo, clarão) ou não (fumaça).
 // São desenhados DEPOIS dos personagens 3D, senão um zumbi ao fundo passaria por cima da bola de fogo.
 fxBox(x,y,z,sx,sy,sz,color,alpha,additive){this.fxBatches[additive?'add':'alpha'].push(sx,0,0,0,0,sy,0,0,0,0,sz,0,x,y,z,1,((color>>16)&255)/255,((color>>8)&255)/255,(color&255)/255,2+Math.max(0,Math.min(1,alpha)));}
 fxSeg(x1,y1,z1,x2,y2,z2,w,color,alpha,additive=true){const dx=x2-x1,dy=y2-y1,dz=z2-z1,len=Math.hypot(dx,dy,dz)||1e-6,ux=dx/len,uy=dy/len,uz=dz/len,ax=Math.abs(uy)>.9?1:0,ay=ax?0:1;
  let px=ay*uz,py=-ax*uz,pz=ax*uy-ay*ux;const pl=Math.hypot(px,py,pz)||1;px/=pl;py/=pl;pz/=pl;const qx=uy*pz-uz*py,qy=uz*px-ux*pz,qz=ux*py-uy*px;
  this.fxBatches[additive?'add':'alpha'].push(px*w,py*w,pz*w,0,qx*w,qy*w,qz*w,0,ux*len,uy*len,uz*len,0,(x1+x2)/2,(y1+y2)/2,(z1+z2)/2,1,((color>>16)&255)/255,((color>>8)&255)/255,(color&255)/255,2+Math.max(0,Math.min(1,alpha)));}
 // RAIO: linha quebrada que muda de forma ~22x por segundo; brilho azul largo + miolo branco fino.
 bolt(x1,y1,z1,x2,y2,z2,seed,power=1){const n=6,tick=Math.floor(this.visualTime*22),len=Math.hypot(x2-x1,y2-y1,z2-z1),amp=Math.min(1.3,len*.09),rnd=k=>{const v=Math.sin((seed*12.9898+k*78.233+tick*37.719))*43758.5453;return v-Math.floor(v)-.5};
  let ax=x1,ay=y1,az=z1;for(let j=1;j<=n;j++){const u=j/n,e=j===n?0:1,bx=x1+(x2-x1)*u+rnd(j)*amp*2*e,by=y1+(y2-y1)*u+rnd(j+9)*amp*1.4*e+Math.sin(u*Math.PI)*.5,bz=z1+(z2-z1)*u+rnd(j+17)*amp*e;
   this.fxSeg(ax,ay,az,bx,by,bz,.26*power,0x0f6bff,.45,false);this.fxSeg(ax,ay,az,bx,by,bz,.09*power,0xe6fbff,.95);if(j===3&&rnd(j+31)>0)this.fxSeg(bx,by,bz,bx+rnd(40)*2.4,by+.4+rnd(41),bz+rnd(42)*2,.05*power,0xbfeeff,.8);ax=bx;ay=by;az=bz;}
  const r=(.6+.4*rnd(3))*power;this.fxBox(x2,y2,z2,r*1.5,r*1.5,r*1.5,0x1a7bff,.4,false);this.fxBox(x2,y2,z2,r,r,r,0xd6f4ff,.7,true);}
 // NITRO LIGADO: riscos de velocidade passando, raios do carro para os inimigos, arcos na lataria, chamas azuis no escape.
 drawBoost(dt,game){const on=game.boosting?1:0;this.boostK+=(on-this.boostK)*Math.min(1,dt*(on?9:4));const k=this.boostK;this.fov=.78+.17*k;if(k<.02){this.streaks.length=0;return;}
  if(on)this.shake=Math.max(this.shake,.2);
  while(this.streaks.length<46)this.streaks.push({x:(Math.random()<.5?-1:1)*(2.2+Math.random()*8),y:.25+Math.random()*6,z:-100+Math.random()*110,len:5+Math.random()*9,v:95+Math.random()*60});
  for(const s of this.streaks){s.z+=s.v*dt;if(s.z>16){s.z=-100-Math.random()*20;s.x=(Math.random()<.5?-1:1)*(2.2+Math.random()*8);s.y=.25+Math.random()*6;}this.fxSeg(s.x,s.y,s.z,s.x,s.y,s.z+s.len,.06,0xcff6ff,.5*k);}
  for(const lane of [-1.15,1.15,-3.6,3.6])this.fxSeg(lane,.07,2,lane,.07,-60,.1,0x35e7ff,.16*k);
  const cx=game.x,up=game.y||0,l=game.car&&game.car.tier===10?3.9:3.2;
  for(const side of [-1,1]){const fl=(2.2+Math.sin(this.visualTime*60+side)*.5)*k;this.fxSeg(cx+side*.42,.42+up,l*.5,cx+side*.42,.42+up,l*.5+fl,.34,0x1466ff,.7*k,false);this.fxSeg(cx+side*.42,.42+up,l*.5,cx+side*.42,.42+up,l*.5+fl*.55,.16,0xf0fdff,.9*k);}
  this.fxSeg(cx,.06,l*.4,cx,.06,l*.4+8*k,.5,0x2a8dff,.3*k,false);
  if(!on)return;
  // arcos curtos em volta da lataria
  for(let j=0;j<3;j++){const a=this.visualTime*7+j*2.1,b=a+1.3;this.bolt(cx+Math.cos(a)*.95,.75+up+.5*Math.sin(a*1.7),Math.sin(a)*1.5,cx+Math.cos(b)*.95,.9+up+.5*Math.cos(b),Math.sin(b)*1.5,50+j,.45);}
  // raios: o chefe sempre, e os zumbis mais próximos (os demais também levam dano, só não ganham desenho)
  const tg=game.enemies.filter(e=>!e.dead&&e.z>-62&&e.z<1&&!(e.boss&&e.mode==='land'&&e.timer>1.25)).sort((p,q)=>(q.boss?1e3:0)+q.z-((p.boss?1e3:0)+p.z)).slice(0,4);
  for(const zp of this.zaps){zp.t-=dt;zp.z+=this.roadDz;this.bolt(cx,1.85+up,-.5,zp.x,zp.y,zp.z,zp.seed,1);}this.zaps=this.zaps.filter(zp=>zp.t>0);
  tg.forEach((e,j)=>{const s=e.scale||1;this.bolt(cx,1.85+up,-.5,e.x+(this.chars?this.chars.dx(e):0),(e.boss?1.25:1.1)*s,e.z,j+e.z*.01,e.boss?1.5:1);});}
 flushFx(){const g=this.g,mesh=this.meshes.sphere;if(!this.fxBatches.alpha.length&&!this.fxBatches.add.length)return;g.useProgram(this.p);g.enable(g.BLEND);g.depthMask(false);
  for(const mode of ['alpha','add']){const data=this.fxBatches[mode];if(!data.length)continue;g.blendFunc(g.SRC_ALPHA,mode==='add'?g.ONE:g.ONE_MINUS_SRC_ALPHA);g.bindBuffer(g.ARRAY_BUFFER,mesh.buffer);for(let [name,offset] of [['a',0],['n',12]]){g.enableVertexAttribArray(this.attrs[name]);g.vertexAttribPointer(this.attrs[name],3,g.FLOAT,false,24,offset);if(this.ext)this.ext.vertexAttribDivisorANGLE(this.attrs[name],0);}
   if(this.ext){g.bindBuffer(g.ARRAY_BUFFER,this.instanceBuffer);g.bufferData(g.ARRAY_BUFFER,new Float32Array(data),g.DYNAMIC_DRAW);['i0','i1','i2','i3','tint','finish'].forEach((name,j)=>{let l=this.attrs[name];g.enableVertexAttribArray(l);g.vertexAttribPointer(l,j===4?3:j===5?1:4,g.FLOAT,false,80,j===5?76:j*16);this.ext.vertexAttribDivisorANGLE(l,1)});this.ext.drawArraysInstancedANGLE(g.TRIANGLES,0,mesh.count,data.length/20);this.drawCalls++;}
   else for(let i=0;i<data.length;i+=20){g.uniformMatrix4fv(this.u.m,false,new Float32Array(data.slice(i,i+16)));g.uniform3fv(this.u.color,data.slice(i+16,i+19));g.uniform1f(this.u.finish,data[i+19]);g.drawArrays(g.TRIANGLES,0,mesh.count);this.drawCalls++;}}
  g.disable(g.BLEND);g.depthMask(true);this.fxBatches={alpha:[],add:[]};}
 // Explosão (Kamikaze, bomba): clarão, bola de fogo com lóbulos, onda de choque no chão, fumaça e estilhaços.
 // power escala tudo; shake liga o tremor de câmera, que decai sozinho e enfraquece com a distância.
 explode(x,z,power,shake){this.decals.push({kind:'scorch',x,z,r:2.6*power,t:0});const lobes=[];for(let j=0;j<4;j++)lobes.push([Math.random()*2-1,Math.random()*.8,Math.random()*2-1]);this.explosions.push({x,z,t:0,power,lobes});if(shake)this.shake=Math.max(this.shake,Math.min(1,power*(1-Math.min(1,Math.abs(z)/60))));
  for(let j=0;j<26;j++)this.particles.push({x,y:1.2,z,vx:(Math.random()-.5)*13*power,vy:3+Math.random()*9*power,vz:(Math.random()-.5)*13*power,life:.9,color:j%3?0xff9a3c:j%2?0xffe08a:0x3a302a});}
 drawExplosions(dt){for(const ex of this.explosions){ex.t+=dt;ex.z+=this.roadDz*.3;const t=ex.t,P=ex.power,k=Math.min(1,t/.72),ease=1-(1-k)*(1-k),a=Math.pow(1-k,1.25),r=(1.2+5.2*ease)*P,ks=Math.min(1,t/1.3);
   if(t<.16){const c=(1+9*t)*P;this.fxBox(ex.x,1.3,ex.z,c,c,c,0xfff0c8,(1-t/.16)*.6,true);}
   if(a>0){this.fxBox(ex.x,1.2+1.2*ease,ex.z,r,r*.85,r,0xff5a12,a*.8,true);this.fxBox(ex.x,1.3+1.2*ease,ex.z,r*.6,r*.52,r*.6,0xffe08a,a*.55,true);for(const o of ex.lobes)this.fxBox(ex.x+o[0]*r*.45,1.1+o[1]*r*.4+ease,ex.z+o[2]*r*.45,r*.6,r*.55,r*.6,0xff8a1c,a*.6,true);const w=(1.5+6*ease)*P;this.fxBox(ex.x,.08,ex.z,w,.05,w,0xff8030,a*.13,true);}
   for(const o of ex.lobes){const rs=(1+1.8*ks)*P;this.fxBox(ex.x+o[0]*1.4*P,1.2+2.8*ks+o[1],ex.z+o[2]*1.4*P,rs,rs,rs,0x2b2724,.5*(1-ks),false);}}
  this.explosions=this.explosions.filter(ex=>ex.t<1.3);}
 jumpFx(x){for(const side of [-1,1])this.puff(x+side*.7,.25,.9,side*2,3,.4,1.3,.45,.4);}
 landFx(x){this.jolt=Math.max(this.jolt,.3);this.shake=Math.max(this.shake,.26);for(const side of [-1,1])for(const zz of [-1,1])this.puff(x+side*.8,.25,zz*1.1,side*3,zz*2+2,.45,1.6,.5,.42);}
 resetFx(){this.decals=[];this.coins=[];this.impacts=[];this.puffs=[];this.tools=[];this.zaps=[];this.streaks=[];this.explosions=[];this.particles=[];this.jolt=0;this.shake=0;this.boostK=0;this.fov=.78;this.coinHits=0;this.lastScroll=null;this.fuga=0;}
 mix(a,b,t){const c=k=>Math.round(((a>>k)&255)+(((b>>k)&255)-((a>>k)&255))*t);return (c(16)<<16)|(c(8)<<8)|c(0);}
 // CHÃO RACHANDO (queda do chefe, pancada): cratera escura, fendas radiais em dois lances e placas de asfalto
 // levantadas. É decalque NA PISTA: rola com ela em direção ao carro e some por baixo dele, como tudo que está no chão.
 crack(x,z,r){const arms=[],slabs=[],n=9+Math.floor(Math.random()*3);for(let j=0;j<n;j++)arms.push({a:j/n*Math.PI*2+Math.random()*.5,len:r*(.7+Math.random()*.6),w:.1+Math.random()*.13,kink:(Math.random()-.5)*1.2,len2:r*(.3+Math.random()*.45)});
  for(let j=0;j<9;j++)slabs.push({a:Math.random()*Math.PI*2,rad:r*(.3+Math.random()*.45),w:.6+Math.random()*.8,h:.08+Math.random()*.16,d:.5+Math.random()*.7,ry:Math.random()*3,dark:j%2});
  this.decals.push({kind:'crack',x,z,r,arms,slabs,t:0});}
 rubble(x,z){const bits=[];for(let j=0;j<3;j++)bits.push({dx:(Math.random()-.5)*1.5,dz:(Math.random()-.5)*1,w:.25+Math.random()*.35,h:.07+Math.random()*.16,ry:Math.random()*3,dark:j%2});this.decals.push({kind:'rubble',x,z,bits,skew:(Math.random()-.5)*.5,t:0});}
 drawDecals(dt,road){const dark=0x1b2126,lim=3.85;
  for(const d of this.decals){d.t+=dt;d.z+=this.roadDz;
   if(d.kind==='crack'){const k=Math.min(1,d.t/.16);this.box(d.x,0,d.z,Math.min(7,d.r*.95)*k,.09,d.r*.75*k,this.mix(road,0,.5),0,'sphere',.04);this.box(d.x,.01,d.z,Math.min(7,d.r*.5)*k,.09,d.r*.4*k,this.mix(road,0,.68),0,'sphere',.04);
    for(const m of d.arms){const cx=Math.cos(m.a),cz=Math.sin(m.a),room=cx>0?(lim-d.x)/cx:cx<0?(-lim-d.x)/cx:99,L=Math.max(.2,Math.min(m.len,room))*k;this.box(d.x+cx*L*.5,.045,d.z+cz*L*.5,m.w,.03,L,dark,Math.PI/2-m.a);
     if(k>=1&&L>=m.len-.01){const a2=m.a+m.kink,ex=d.x+cx*L,ez=d.z+cz*L,c2=Math.cos(a2),r2=c2>0?(lim-ex)/c2:c2<0?(-lim-ex)/c2:99,L2=Math.min(m.len2,r2);if(L2>.2)this.box(ex+c2*L2*.5,.045,ez+Math.sin(a2)*L2*.5,m.w*.7,.03,L2,dark,Math.PI/2-a2);}}
    for(const b of d.slabs){const bx=d.x+Math.cos(b.a)*b.rad;if(Math.abs(bx)>lim-.3)continue;this.box(bx,b.h*.5*k-.04,d.z+Math.sin(b.a)*b.rad,b.w,b.h*k,b.d,b.dark?this.mix(road,0,.4):this.mix(road,0xffffff,.1),b.ry);}}
   else if(d.kind==='rubble'){const k=Math.min(1,d.t/.1);this.box(d.x,.045,d.z,.16,.03,1.5,dark,d.skew);this.box(d.x+.5,.045,d.z+.3,.1,.03,1.1,dark,-d.skew*1.6);for(const b of d.bits)this.box(d.x+b.dx,b.h*.5*k-.03,d.z+b.dz,b.w,b.h*k,b.w*1.2,b.dark?this.mix(road,0,.42):this.mix(road,0xffffff,.08),b.ry);}
   else{this.box(d.x,0,d.z,Math.min(7,d.r),.085,d.r*.8,this.mix(road,0x1a1512,.45),0,'sphere',.04);this.box(d.x,.01,d.z,Math.min(7,d.r*.55),.085,d.r*.45,this.mix(road,0x1a1512,.7),0,'sphere',.04);}}
  this.decals=this.decals.filter(d=>d.z<10&&d.t<9);if(this.decals.length>80)this.decals.splice(0,this.decals.length-80);}
 // Poeira: bolas foscas que crescem, somem e FICAM PARA TRÁS com a pista.
 puff(x,y,z,vx,vz,r0,r1,life,alpha){if(this.puffs.length<70)this.puffs.push({x,y,z,vx,vz,r0,r1,life,alpha,t:0});}
 drawPuffs(dt){for(const p of this.puffs){p.t+=dt;const k=Math.min(1,p.t/p.life),e=1-(1-k)*(1-k);p.x+=p.vx*dt*(1-k);p.z+=p.vz*dt*(1-k)+this.roadDz*.7;const r=p.r0+(p.r1-p.r0)*e;this.fxBox(p.x,p.y+e*.9,p.z,r,r*.75,r,0xcfc7b8,p.alpha*(1-k),false);}this.puffs=this.puffs.filter(p=>p.t<p.life&&p.z<12);}
 // QUEDA DO CHEFE: racha o chão, levanta anel de poeira e pedras, treme a tela; onImpact avisa o jogo (som + vibração).
 landing(e){const x=e.x,z=e.z,s=e.scale||1;this.crack(x,z,1.5*s);this.shake=Math.max(this.shake,.9);
  for(let j=0;j<10;j++){const a=j*.628+Math.random()*.3;this.puff(x+Math.cos(a)*s*.4,.5,z+Math.sin(a)*s*.4,Math.cos(a)*7,Math.sin(a)*5,.9*s*.5,2.1*s*.6,1.15,.45);}
  for(let j=0;j<24;j++){const a=Math.random()*6.283,v=3+Math.random()*7;this.particles.push({x:x+Math.cos(a)*s*.5,y:.3,z:z+Math.sin(a)*s*.5,vx:Math.cos(a)*v,vy:3+Math.random()*4.5,vz:Math.sin(a)*v,life:.9+Math.random()*.4,size:.16+Math.random()*.3,color:j%3?0x6b7880:0x4a555c});}
  if(this.onImpact)this.onImpact('landing');}
 // PANCADA NO CHÃO (golpe do chefe): rachadura menor à frente dele; a onda que corre até o carro é desenhada no frame().
 groundStrike(e){const s=e.scale||1,z=e.z+1.3;this.crack(e.x,z,.85*s);this.shake=Math.max(this.shake,.55);for(let j=0;j<6;j++){const a=j*1.047;this.puff(e.x+Math.cos(a)*.6,.4,z+Math.sin(a)*.6,Math.cos(a)*5,Math.sin(a)*4,.7,2.2,.8,.4);}if(this.onImpact)this.onImpact('slam');}
 // BATIDA NO CARRO: clarão curto, faíscas, tranco na carroceria e tremor. power 0..1 conforme o que acertou.
 carHit(x,power,y=.9,z=-1.5){this.jolt=Math.max(this.jolt,power);this.shake=Math.max(this.shake,.22+.5*power);this.impacts.push({x,y,z,t:0,power});const n=Math.round(8+16*power);
  for(let j=0;j<n;j++)this.particles.push({x:x+(Math.random()-.5)*1.3,y:y+(Math.random()-.3)*.5,z,vx:(Math.random()-.5)*10,vy:2+Math.random()*6,vz:1+Math.random()*8,life:.4+Math.random()*.3,size:.08+Math.random()*.09,color:j%3===0?0xffffff:j%3===1?0xffd866:0xff8a3c});}
 drawImpacts(dt){for(const m of this.impacts){m.t+=dt;const k=m.t/.2;if(k<1){const r=(.5+1.7*k)*(.55+m.power*.6);this.fxBox(m.x,m.y,m.z,r,r,r,0xffb054,(1-k)*.5,true);this.fxBox(m.x,m.y,m.z,r*.5,r*.5,r*.5,0xfff0c0,(1-k)*.6,true);this.fxBox(m.x,.08,m.z,r*1.6,.06,r*1.6,0xff9a40,(1-k)*.28,true);}}this.impacts=this.impacts.filter(m=>m.t<.2);}
 // Zumbi comum atropelado: a camada 3D joga o corpo para o lado; aqui só o tranco leve e umas faíscas.
 ram(e,carX){if(e.boss){this.carHit(carX,.85);return;}if(this.chars)this.chars.die(e,e.x>=carX?1:-1);const big=e.kind==='bruiser';this.jolt=Math.max(this.jolt,big?.5:.2);this.shake=Math.max(this.shake,big?.3:.12);for(let j=0;j<(big?9:5);j++)this.particles.push({x:e.x+(Math.random()-.5),y:.7,z:-1.5,vx:(Math.random()-.5)*7,vy:2+Math.random()*4,vz:2+Math.random()*5,life:.35,size:.09,color:j%2?0xffd866:0xd8e2e6});}
 // MOEDAS: saltam do zumbi abatido e voam para o carro (ímã). Quem paga mais solta mais moedas.
 coinsFrom(e){if(!e.coins||this.coins.length>80)return;const n=e.boss?16:e.kind==='bruiser'?3:e.kind==='thrower'||e.kind==='bomber'?2:1,s=e.scale||1;for(let j=0;j<n;j++)this.coins.push({x:e.x,y:1.1*s,z:e.z,vx:(Math.random()-.5)*(e.boss?9:3.5),vy:5+Math.random()*4,vz:(Math.random()-.3)*3,t:-j*.035,spin:Math.random()*6});}
 drawCoins(dt,game){const tx=game.x,ty=1.15,tz=-.2;for(const c of this.coins){c.t+=dt;if(c.t<0)continue;
   if(c.t<.3){c.x+=c.vx*dt;c.y+=c.vy*dt;c.z+=c.vz*dt+this.roadDz*.5;c.vy-=16*dt;c.sx=c.x;c.sy=c.y;c.sz=c.z;}
   else{const k=Math.min(1,(c.t-.3)/.5),q=k*k;c.x=c.sx+(tx-c.sx)*q;c.y=c.sy+(ty-c.sy)*q+Math.sin(k*Math.PI)*1.1;c.z=c.sz+(tz-c.sz)*q;if(k>=1){c.dead=true;this.coinHits++;}}
   const far=1+Math.min(.7,Math.max(0,-c.z)/60);this.box(c.x,Math.max(.25,c.y),c.z,.07*far,.3*far,.3*far,0xf5c451,c.spin+c.t*10,'round',.95);}
  this.coins=this.coins.filter(c=>!c.dead);}
 // Ferramenta do arremessador depois do voo: bateu no carro = ricocheteia para cima e cai para trás; errou = fica na pista.
 tossTool(p,hit){if(this.tools.length>6)return;this.tools.push(hit?{x:p.x,y:1.5,z:.3,vx:(Math.random()<.5?-1:1)*(2+Math.random()*2.5),vy:7,vz:4,t:0,air:true}:{x:p.targetX,y:.2,z:1,vx:0,vy:0,vz:0,t:0,air:false,yaw:Math.random()*3});}
 drawTools(dt,time){for(const o of this.tools){o.t+=dt;if(o.air){o.x+=o.vx*dt;o.y+=o.vy*dt;o.vy-=22*dt;o.z+=o.vz*dt+this.roadDz*.5;if(o.y<.2){o.y=.2;o.air=false;o.yaw=o.t*7;}}else o.z+=this.roadDz;
   if(!(this.chars&&this.chars.shot(o,o.y,time+o.t*2,o.air?undefined:o.yaw||0)))this.box(o.x,o.y,o.z,.16,.16,.65,0xd2dee4,o.t*9);}
  this.tools=this.tools.filter(o=>o.z<9&&o.t<3);}
 burst(e){if(this.boostK>.5&&!e.rammed&&this.zaps.length<4)this.zaps.push({x:e.x,y:1.1*(e.scale||1),z:e.z,t:.22,seed:Math.random()*99});if(this.chars)this.chars.die(e);for(let j=0;j<(e.landing?34:e.boss?20:e.explosion?16:4);j++)this.particles.push({x:e.x,y:1,z:e.z,vx:(Math.random()-.5)*5,vy:2+Math.random()*5,vz:(Math.random()-.5)*5,life:.8,color:e.landing?(j%2?0xb9c4c9:0x8a979e):e.explosion?0xf48d4f:j%2?0xf5c451:0x75bd93});}
 frame(game,dt,garage,tier){let g=this.g;this.restoreState();this.batches={};this.drawCalls=0;this.instances=0;this.visualTime+=dt;const sc=this.scenery;if(!garage&&sc)sc.set(game.theme||'sunny');const sky=garage||!sc?[.64,.75,.79]:sc.sky(),fogc=garage||!sc?[.64,.75,.79]:sc.t.fog;if(garage)g.clearColor(0,0,0,0);else g.clearColor(sky[0],sky[1],sky[2],1);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);g.uniform3fv(this.u.fogColor,garage?[.07,.12,.16]:fogc);this.labels=[];if(garage){this.fov=.72;this.boostK=0;this.camera([6.6,4.4,8.6],[0,.6,0]);
  // Fundo, plataforma e painéis são ARTE (assets/ui) desenhada em HTML. Aqui fica só o carro, girando
  // devagar sobre a plataforma, com o resto do quadro transparente.
  this.car(0,0,tier,this.visualTime,2.65+this.visualTime*.42,1.03,game.p.active?.multi||game.p.campaign?.multi||1);this.flush();if(this.chars&&this.chars.ok){this.chars.render(game,dt);this.restoreState();}this.flushFx();return;}
 const scroll=game.roadScroll||0;this.roadDz=this.lastScroll===null||scroll<this.lastScroll?0:Math.min(2,scroll-this.lastScroll);this.lastScroll=scroll;
 let shx=0,shy=0;if(this.shake>0){this.shake=Math.max(0,this.shake-dt*2.2);const amp=this.shake*this.shake*.55;shx=Math.sin(this.visualTime*67)*amp;shy=Math.cos(this.visualTime*53)*amp*.7;}
 this.camera([shx,8.8+shy,16],[shx*.5,shy*.5,-10]);let road=sc?sc.draw(game,dt):0x80939f;if(!sc)this.box(0,-.2,-48,8,.3,120,road);
 this.drawDecals(dt,road);
 for(const h of game.holes||[]){const lo=Math.min(...h.lanes),hi=Math.max(...h.lanes),full=h.lanes.length===3,cx=full?0:((lo+hi)/2-1)*2.3,w=full?7.7:(hi-lo+1)*2.3-.25,L=h.len;
  this.box(cx,.012,h.z,w+.55,.03,L+.6,this.mix(road,0xffffff,.14));this.box(cx,.03,h.z,w,.03,L,0x0d1116);this.box(cx,.042,h.z-.15,w*.86,.03,L*.72,0x05070a);
  const n=Math.max(3,Math.round(w/.55));for(let j=0;j<n;j++){const sx=cx-w/2+(j+.5)*w/n,col=j%2?0x15181c:0xf5c531;this.box(sx,.05,h.z+L/2+.5,w/n,.035,.34,col);this.box(sx,.05,h.z-L/2-.5,w/n,.035,.34,col);}
  for(let j=0;j<7;j++){const a=j*.9+h.len,bx=cx+Math.sin(a*2.3)*w*.5,bz=h.z+Math.cos(a*1.7)*(L/2+.25);this.box(bx,.07,bz,.45+.2*Math.sin(a),.12,.4,this.mix(road,0,j%2?.35:.1),a);}
  if(h.z>-60&&h.z<-3&&!h.hit){const now=h.z>(game.terrain==='mud'?-9.3:game.terrain==='dirt'?-10.5:-11.7),p=this.project(cx,1.4,h.z);if(p.w>0&&p.y>24)this.labels.push({...p,text:now?(t('jumpItem')):(t('potholeLabel')),special:now,bad:!now});}}
 if(game.terrain==='mud')for(let j=0;j<9;j++)this.box(Math.sin(j*6)*2,.015,-j*11+((game.roadScroll||game.distance)%11),1.4,.02,4,this.mix(road,0,.22));
 for(let h of game.hazards||[]){if(h.kind==='hole'||h.kind==='holeAhead')continue;for(let l of h.lanes){this.box((l-1)*2.3,.035,-7,2.05,.025,17,h.kind==='throw'?0xa9783c:0xa9443d);for(let zz of [-3,-6,-9])this.box((l-1)*2.3,.06,zz,.16,.02,.85,0xffd4a1);}if(h.boss&&h.kind==='slam'){let safe=[0,1,2].find(l=>!h.lanes.includes(l));this.box((safe-1)*2.3,.04,-7,1.8,.02,17,0x367861);}}
 // ONDA DE CHOQUE da pancada: frente de asfalto estourando que corre do chefe até o carro pelas faixas perigosas,
 // deixando entulho (decalque) para trás. O dano só sai quando ela chega (engine.shocks).
 for(const w of game.shocks||[]){let last=this.shockTrail.get(w);if(last===undefined)last=w.z-1.3;while(last+1.3<=w.z){last+=1.3;for(const l of w.lanes)this.rubble((l-1)*2.3,last);}this.shockTrail.set(w,last);
  for(const l of w.lanes){const x=(l-1)*2.3;for(let j=0;j<5;j++){const h=(.55+.95*Math.abs(Math.sin(j*2.1+w.z)))*(1-j*.16);this.box(x+Math.sin(j*1.7+w.z*.6)*.78,h*.5,w.z+j*.55,.44,h,.44,j%2?this.mix(road,0,.35):this.mix(road,0,.12),j+w.z);}
   this.fxBox(x,.6,w.z+.8,2.3,1.3,2.8,0xd9d2c2,.3,false);this.fxBox(x,.1,w.z,2.1,.12,1.5,0xffb45e,.7,true);}}
 const colors={cash:0xf5c451,damage:0x5deb9b,multi:0xb98aff,repair:0x7fe2a6,nos:0x20d9ed,weak:0xf06958,minus:0xf06958,leak:0xf69b53,loss:0xf06958,spike:0xdc5a4e,ally:0x31d8e4};const labels={cash:'$',damage:'+DMG',multi:'PART',repair:'+',nos:'NITRO',weak:'−DMG',minus:'−26 HP',leak:'LEAK',loss:'−25% $',spike:'−24 HP',ally:t('jumpItem')};
 for(let i of game.items){if(i.kind==='coin'){let born=this.coinSeen.get(i);if(born===undefined){born=this.visualTime;this.coinSeen.set(i,born);}const age=this.visualTime-born,hop=age<.32?Math.sin(age/.32*Math.PI)*.9:0,m=Math.min(4,i.n||1);for(let j=0;j<m;j++)this.box(i.x+(j-(m-1)/2)*.4,.36+hop+(j%2)*.05,i.z+(j%2?.28:0),.07,.5,.5,0xf5c451,this.visualTime*5+j*1.3,'round',.95);this.box(i.x,.02,i.z,.9,1,.7,0,0,'shadow');continue;}// PARAQUEDAS DO CARRO AMIGO: vem alto e descendo, com a sombra no chão mostrando onde vai passar.
 // Só é pego no ar, então o que importa é enxergar a altura dele de longe.
 if(i.chute){const y=i.y||2,sw=Math.sin(game.time*1.6+i.z*.3)*.22;
  this.box(i.x+sw*.4,.03,i.z,1.5,.04,1.2,0,0,'shadow');
  this.box(i.x+sw,y+1.5,i.z,2.3,1.15,2.3,0x31d8e4,0,'canopy',.5);
  this.box(i.x+sw,y+1.5,i.z,2.35,.18,2.35,0xf4fbff,0,'round',.6);
  for(const s of [-1,1])for(const zz of [-1,1])this.fxSeg(i.x+sw+s*.72,y+1.25,i.z+zz*.72,i.x+sw*.35,y+.42,i.z,.045,0xdfefff,.85,false);
  this.box(i.x+sw*.35,y,i.z,.9,.72,1.35,0x2b3640,0,'smooth',.35);
  this.box(i.x+sw*.35,y+.06,i.z,.94,.2,.5,0xf5c451,0,'smooth',.7);
  this.box(i.x+sw*.35,y,i.z+.7,.5,.34,.06,0x31d8e4,0,'smooth',.9);
  let pc=this.project(i.x,y+2.5,i.z);if(pc.w>0&&pc.y>24)this.labels.push({...pc,text:labels.ally,bad:false});continue;}
 let color=colors[i.kind],bob=.07*Math.sin(game.time*3+i.z),yy=.7+bob;this.box(i.x,.05,i.z,1.05,.04,.8,i.bad?0x77453e:0x477f7b,0,'hull');if(i.kind==='nos'){this.box(i.x,yy,i.z,.5,.9,.5,color,0,'smooth');this.box(i.x,yy+.48,i.z,.23,.16,.23,0xd1edef);this.box(i.x,yy,i.z+.26,.3,.22,.035,0xf2ffff);}else if(i.kind==='repair'){this.box(i.x,yy,i.z,.85,.58,.5,0xe5f2de,0,'smooth');this.box(i.x,yy,i.z+.27,.13,.37,.04,0x39b87e);this.box(i.x,yy,i.z+.28,.4,.13,.04,0x39b87e);}else if(i.kind==='cash'){for(let j=0;j<3;j++)this.box(i.x+(j-1)*.17,yy+j*.09,i.z,.55,.12,.38,color,game.time*.4,'hull');}else{this.box(i.x,yy,i.z,.8,.65,.6,color,game.time*.5,'smooth');this.box(i.x,yy,i.z+.35,.42,.12,.04,0xffffff);if(!i.bad)this.box(i.x,yy,i.z+.36,.12,.4,.04,0xffffff);}let p=this.project(i.x,1.5,i.z);if(p.w>0&&p.y>24)this.labels.push({...p,text:labels[i.kind],bad:i.bad});}
 for(let e of game.enemies){let s=e.scale||1,fast=e.mode==='charge'||e.mode==='rush';this.zombie(e);
 if(e.mode==='switch'||e.mode==='cross'){let tx=(e.targetLane-1)*2.3;this.box(tx,.05,e.z,1.2,.04,1.2,0xdfab50);this.box((e.x+tx)/2,.08,e.z,Math.abs(e.x-tx),.06,.12,0xffd985);}
 if(fast){this.box(e.x,.08,e.z-2,.2,.06,3,0xf97f4e);this.box(e.x-.35,.08,e.z-2,.08,.05,2.3,0xfac65e);}
 // Barra de HP só nos chefes (pedido do dono): a horda fica limpa.
 let p=this.project(e.x,2.05*s,e.z);if(e.boss){p.y=Math.max(40,p.y);p.x=Math.max(45,Math.min(this.w-45,p.x));}if(p.w>0&&e.boss)this.labels.push({...p,ratio:Math.max(0,e.hp/e.max),text:(e.mode==='aim'?'! ':e.kind==='runner'?'↔ ':e.kind==='bomber'?'! ':'')+Math.max(0,Math.ceil(e.hp)),hp:true,boss:e.boss,special:e.kind==='bomber'||e.kind==='thrower'});
 }
 // Ferramenta arremessada: a camada 3D desenha a chave inglesa; sem ela (ou se for bomba), o projétil antigo.
 for(let p of game.projectiles||[]){let y=p.y||1.4;if(p.bomb||!(this.chars&&this.chars.shot(p,y,game.time))){this.box(p.x,y,p.z,p.bomb?.65:.16,p.bomb?.65:.65,p.bomb?.65:.16,p.bomb?0xdd7147:0xd2dee4,game.time*12);if(!p.bomb)this.box(p.x,y+.28,p.z,.45,.17,.16,0xe4e8d9,game.time*12);}this.box(p.x,.06,p.z,.7,.02,.7,0x784c38);}
 for(let b of game.bullets){const by=1.5+(game.y||0)*Math.max(0,1+b.z/9);if(b.mg){this.fxSeg(b.x,by,b.z,b.x,by,b.z+3.6,.3,0x0a5cff,.75,false);this.fxSeg(b.x,by,b.z,b.x,by,b.z+2.4,.1,0xbfeaff,1);continue;}this.box(b.x,by,b.z,.18,.18,.64,0xe8f0df,0,'sphere');this.box(b.x,by,b.z+.4,.1,.1,.45,0xffb351);this.box(b.x,by,b.z+.8,.045,.045,.4,0xffe9a1);}
 let px=game.x+(game.firing?Math.sin(this.visualTime*95)*.018:0),pz=game.firing?.05+Math.sin(this.visualTime*70)*.03:0;
  // FUGA DA VITÓRIA: com a fase vencida, o carro acelera e some pista afora enquanto a faixa entra.
  // Quadrático de propósito — sair em velocidade constante parece que o carro está sendo puxado.
  if(this.fuga>0){const f=this.fuga;pz-=f*f*150;px+=Math.sin(f*9)*.12*(1-f);}
  this.drawBoost(dt,game);
 if(game.firing){const n=Math.min(10,game.multi),fk=.6+.4*Math.sin(this.visualTime*120),up=game.y||0;for(let j=0;j<n;j++){const row=Math.floor(j/5),inRow=Math.min(5,n-row*5),xx=(j%5-(inRow-1)/2)*.29+(row&&inRow===5?.145:0),yy=1.57+row*.29+up,zz=0;this.fxBox(px+xx,yy,-1.05+zz,.55*fk,.55*fk,1*fk,0x1466ff,.7,false);this.fxBox(px+xx,yy,-1+zz,.2,.2,.4,0xf2fdff,.9,true);}}
 const jl=this.jolt;this.jolt=Math.max(0,jl-dt*3.2);this.lift=game.state==='hellfall'?-Math.pow(1-Math.max(0,game.hellTimer||0)/1.4,2)*7:(game.y||0);
 // TROCA DE FAIXA: o motor entrega game.tilt (-1 a 1, o quanto o carro vai para o lado). Aqui ele vira
 // esterço (o bico aponta para onde vai) e inclinação da carroceria, que é o que faz a manobra virar CURVA.
 const tl=game.tilt||0;this.roll=-tl*.20;
 // O carro que aparece REGRIDE com a vida (game.carTier), então a carroceria conta o estrago sozinha.
 const meu=game.carTier?game.carTier():game.car.tier;
 if(game.boosting||!(game.invuln>0&&Math.floor(game.time*12)%2))this.car(px+Math.sin(this.visualTime*41)*.09*jl,pz+.7*jl*jl,meu,game.time,Math.sin(this.visualTime*33)*.085*jl-tl*.17,1,game.multi);
 // CARRO AMIGO: só existe durante o chefe e usa OUTRO modelo, senão brigaria pelo mesmo carro na tela.
 this.roll=0;this.lift=0;
 // Se por acaso o amigo cair no MESMO modelo do jogador (dono de todos os veiculos), ele troca de carro em vez
 // de sumir: só existe um carro de cada na tela, e ficar invisível seria pior do que trocar.
 if(game.ally){const a=game.ally,at=a.tilt||0;this.roll=-at*.20;
  this.car(a.x,a.z,a.tier===meu?(a.tier+1)%NV.CARS.length:a.tier,game.time,-at*.17,1,3);this.roll=0;}
 this.lift=0;if(sc)sc.weather(game,dt);this.drawTools(dt,game.time);this.drawPuffs(dt);this.drawImpacts(dt);this.drawExplosions(dt);
 for(let p of this.particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;p.vy-=10*dt;if(p.y<.1){p.y=.1;p.vy=0;p.vx*=.85;p.vz*=.85;p.z+=this.roadDz;}const ps=p.size||.2;this.box(p.x,p.y,p.z,ps,ps,ps,p.color);}this.particles=this.particles.filter(p=>p.life>0).slice(-170);this.flush();if(this.chars)this.chars.render(game,dt);this.flushFx();
 // O canvas ganhou canal alfa por causa da garagem. Na corrida ele precisa voltar OPACO: sombras e
 // efeitos translúcidos baixam o alfa e deixariam a cor da página vazar por baixo, clareando a cena.
 g.colorMask(false,false,false,true);g.clearColor(0,0,0,1);g.clear(g.COLOR_BUFFER_BIT);g.colorMask(true,true,true,true);
 }
}
