'use strict';
// CENÁRIOS (0.12). Cada fase tem um tema (engine: game.theme) e este arquivo desenha tudo que é "lugar":
// céu, névoa, chão, pista, meio-fio, o que fica nas calçadas, o clima caindo e a luz dos personagens.
// Regra de ouro herdada da 0.10: a pista anda. Tudo que está no chão é posicionado por ÍNDICE DE MUNDO
// (k = quantos metros de pista já passaram), nunca por "vaga na tela": assim um cacto é sempre o mesmo cacto
// enquanto vem até o carro, e o que aparece lá no fundo é sorteado pelo índice, não pisca nem troca de lugar.
// Usa só o desenhista do Renderer (caixas/esferas instanciadas + passes sem luz fxBox/fxSeg): nenhum arquivo novo.
const SCENERY={
 sunny:{name:{pt:'SOL',en:'SUNNY'},sky:[.50,.76,.97],fog:[.74,.88,.97],ground:0x5fae45,road:{asphalt:0x66727c,dirt:0xb79f72,mud:0x80624a},gloss:.04,dash:0xf2f5ec,curb:[0xeef0dc,0x7d9096],edge:0xc5d0cc,
  light:{sky:0xeef4f9,ground:0x6d8f5a,hemi:1.9,sun:0xfff1dc,sunI:3.3,fill:1.0,rim:0x9fefff,rimI:2.6,fog:0xbddff7,glow:.2}},
 rainy:{name:{pt:'CHUVA',en:'RAIN'},sky:[.30,.35,.42],fog:[.38,.44,.50],ground:0x3f5a43,road:{asphalt:0x3d4852,dirt:0x6b5a45,mud:0x4f3d30},gloss:.6,dash:0xb9c4cc,curb:[0xaeb8bd,0x4c5a62],edge:0x76838a,
  light:{sky:0xc9d6e6,ground:0x3d4a52,hemi:1.7,sun:0xcfdcf0,sunI:1.9,fill:1.1,rim:0x9fc8ff,rimI:2.4,fog:0x62707f,glow:.27}},
 desert:{name:{pt:'DESERTO',en:'DESERT'},sky:[.96,.80,.56],fog:[.93,.78,.58],ground:0xe3b673,road:{asphalt:0xa68d68,dirt:0xcfa86a,mud:0xb58a55},gloss:.04,dash:0xf3e2bd,curb:[0xd9b987,0xa8814f],edge:0xc79f66,
  light:{sky:0xfff0d0,ground:0xc99a5a,hemi:2.0,sun:0xffe2b0,sunI:3.6,fill:1.0,rim:0xffd9a0,rimI:1.9,fog:0xedc794,glow:.2}},
 snowy:{name:{pt:'NEVE',en:'SNOW'},sky:[.80,.86,.92],fog:[.86,.90,.95],ground:0xf1f5f9,road:{asphalt:0x4d5863,dirt:0xd9e2ea,mud:0xa9c4d6},gloss:.2,dash:0xe8eef2,curb:[0xffffff,0xc4d2dd],edge:0xe6edf2,
  light:{sky:0xf4f8ff,ground:0xc8d6e6,hemi:2.1,sun:0xeaf2ff,sunI:2.6,fill:1.1,rim:0xcfe6ff,rimI:2.4,fog:0xdbe5ef,glow:.2}},
 city:{name:{pt:'CIDADE ABANDONADA',en:'ABANDONED CITY'},sky:[.62,.66,.64],fog:[.60,.64,.62],ground:0x7b7d63,road:{asphalt:0x5d6462,dirt:0x8a7a5e,mud:0x5e5140},gloss:.04,dash:0xb9bdb2,curb:[0xa9ada3,0x6b7068],edge:0x8a8f86,
  light:{sky:0xdfe5e0,ground:0x6e7468,hemi:1.9,sun:0xf2ead8,sunI:2.6,fill:1.0,rim:0xc8d4d0,rimI:2.1,fog:0x9aa39f,glow:.2}},
 hell:{name:{pt:'INFERNO',en:'HELL'},sky:[.20,.04,.03],fog:[.36,.09,.04],ground:0xff6a14,road:{asphalt:0x2b2426,dirt:0x4a3b37,mud:0x3a2622},gloss:.1,dash:0x6b4a3c,curb:[0x1d1719,0x2a2022],edge:0x1d1719,
  light:{sky:0xffa066,ground:0x4a1508,hemi:1.5,sun:0xff8a4a,sunI:2.4,fill:.9,rim:0xff5a1e,rimI:3.2,fog:0x5c1a0c,glow:.3}},
};
// Modelo 3D de cada coisa por cenário (nomes em models/manifest.json). Faltou modelo = desenho de caixas.
const DECOR={sunny:{tree:'arvore',building:'casa'},rainy:{tree:'pinheiro_verde',building:'casa'},desert:{tree:'cacto',rock:'rocha'},snowy:{tree:'pinheiro_neve',building:'casa_neve'},city:{tree:'arvore_seca',building:'predio_ruina'},hell:{tree:'pinheiro_queimado',building:'predio_queimado'}};
class Scenery{
 constructor(r){this.r=r;this.name=null;this.flakes=[];this.clouds=[];this.thunder=6;this.flash=0;this.boltX=0;this.set('sunny');}
 // sorteio estável por índice de mundo (0..1)
 rnd(k,salt=0){const v=Math.sin(k*127.1+salt*311.7+this.salt)*43758.5453;return v-Math.floor(v);}
 set(name){if(!SCENERY[name])name='sunny';if(name===this.name)return;this.name=name;this.t=SCENERY[name];this.salt={sunny:1,rainy:2,desert:3,snowy:4,city:5,hell:6}[name];this.flakes=[];this.clouds=[];this.thunder=4+Math.random()*5;this.flash=0;
  const n={snowy:80,rainy:90,hell:60,desert:12,sunny:0,city:14}[name]||0;for(let j=0;j<n;j++)this.flakes.push({x:(Math.random()-.5)*26,y:Math.random()*13,z:-62+Math.random()*74,s:Math.random()});
  if(name==='sunny')for(let j=0;j<7;j++)this.clouds.push({x:(Math.random()-.5)*150,y:11+Math.random()*7,z:-160-Math.random()*12,s:5+Math.random()*5});
  if(this.r.chars&&this.r.chars.light)this.r.chars.light(this.t.light);}
 sky(){const s=this.t.sky,f=Math.min(1,this.flash*5);return [s[0]+(.9-s[0])*f,s[1]+(.93-s[1])*f,s[2]+(1-s[2])*f];}
 // Chão, pista, meio-fio, faixas e tudo que fica ao lado da pista. Devolve a cor da pista (rachaduras e buracos usam).
 draw(game,dt){const r=this.r,T=this.t,name=this.name,scroll=game.roadScroll||0,time=r.visualTime,road=T.road[game.terrain]||T.road.asphalt;
  const gloss=game.terrain==='mud'&&name==='snowy'?.75:T.gloss;
  // chão dos lados (no Inferno é lava, pulsando)
  const ground=name==='hell'?r.mix(0xff5410,0xff8a22,.5+.5*Math.sin(time*1.7)):T.ground;
  r.box(0,-.2,-48,8,.3,120,road,0,false,gloss);for(const x of [-16,16])r.box(x,-.27,-48,24,.2,130,ground);
  for(const x of [-4.15,4.15])r.box(x,.06,-48,.18,.2,120,T.edge);
  const off=scroll%9;for(let z=-100+off;z<8;z+=9){for(const x of [-1.15,1.15])r.box(x,.01,z,.08,.035,3.5,T.dash);for(const side of [-1,1]){r.box(side*4.08,.16,z,.22,.25,4,T.curb[0]);r.box(side*4.08,.16,z+4,.22,.25,4,T.curb[1]);}}
  if(name==='hell')for(const side of [-1,1])r.box(side*4.45,.05,-48,.28,.06,120,0xffa030,0,false,3);
  // detalhe NA pista (a cada 6 m): rachaduras, poças, neve acumulada, mato
  for(let k=Math.floor((scroll-8)/6);k<=(scroll+100)/6;k++){const z=scroll-k*6,a=this.rnd(k,1),b=this.rnd(k,2),c=this.rnd(k,3);
   if(name==='desert'||name==='city'){if(a<.55){const x=(b-.5)*6.6,ry=(c-.5)*2.4;r.box(x,.012,z,.09,.025,1.6+b*2,r.mix(road,0,.55),ry);r.box(x+Math.sin(ry)*1.1+.3,.012,z+Math.cos(ry)*1.1,.07,.025,1.1+c,r.mix(road,0,.55),ry+1.1);}
    if(name==='city'&&c<.5){const side=b<.5?-1:1;for(let j=0;j<3;j++)r.box(side*(3.55-this.rnd(k,4+j)*.5),.14,z+j*.5-.5,.12,.3+this.rnd(k,7+j)*.25,.12,j%2?0x5f8a3e:0x76a04a,j);}
    if(name==='desert'&&c<.45){const side=b<.5?-1:1;r.box(side*(3.2+a*.6),.0,z,1.6+a*1.4,.07,2.2+b*2,0xe3b673,0,'sphere',.04);}}
   else if(name==='rainy'){if(a<.6)r.box((b-.5)*6.4,-.004,z,1.2+c*1.6,.05,1.6+a*2.2,0x232c35,0,'sphere',1);}
   else if(name==='snowy'){const side=a<.5?-1:1;r.box(side*(3.5+b*.35),.0,z,1+c*.9,.12,3.2+b*2.5,0xf4f8fb,0,'sphere',.1);if(c<.3)r.box((b-.5)*5,.0,z+1.5,.9+a,.05,1.3+c*2,0xe3ebf1,0,'sphere',.1);}
   else if(name==='hell'){const x=(b-.5)*7,ry=(c-.5)*2.6,L=1.4+a*2.6,g=.75+.25*Math.sin(time*3+k);r.box(x,.014,z,.13,.03,L,r.mix(0x7a1c05,0xffa63a,g),ry,false,3);if(a<.6)r.box(x+Math.sin(ry)*L*.5+.2,.014,z+Math.cos(ry)*L*.5,.1,.03,L*.7,r.mix(0x7a1c05,0xff8a20,g),ry-1.2,false,3);}
   else if(a<.25){const side=b<.5?-1:1;for(let j=0;j<4;j++)r.box(side*(4.7+this.rnd(k,4+j)*2.4),.12,z+j*.9-1.5,.16,.16,.16,[0xffe14d,0xff7aa8,0xffffff,0xff9a3c][j],j);}}
  // o que fica nas calçadas (a cada 10 m, lados alternados)
  for(let k=Math.floor((scroll-8)/10);k<=(scroll+112)/10;k++){const z=scroll-k*10,side=k%2?1:-1,a=this.rnd(k,11),b=this.rnd(k,12),c=this.rnd(k,13);this.side(name,k,z,side,a,b,c,time);}
  // céu
  if(name==='sunny')for(const c of this.clouds){c.x+=dt*.6;if(c.x>80)c.x=-80;r.fxBox(c.x,c.y,c.z,c.s*2.2,c.s*.55,c.s,0xffffff,.8,false);r.fxBox(c.x+c.s*.7,c.y+c.s*.18,c.z,c.s*1.2,c.s*.5,c.s*.8,0xffffff,.75,false);}
  if(name==='desert'){r.fxBox(-30,15,-168,6,6,2,0xfff3c4,.8,true);for(let j=0;j<6;j++){const x=-88+j*34+((j*53)%17),h=6+((j*5)%7),w=16+((j*11)%12);r.box(x,h/2,-168,w,h,10,0xc98250);r.box(x+w*.12,h+1.2,-168,w*.55,2.4,10,0xc98250);r.box(x,h+.2,-168,w+1.5,.8,11,0xdb9a62);}}
  if(name==='hell')for(let j=0;j<6;j++){const x=-80+j*32;r.box(x,9+(j%3)*4,-166,14,18+(j%3)*8,8,0x1a0d0c);r.fxBox(x,14+(j%3)*3,-160,9,9,4,0xff6a1c,.16+.06*Math.sin(time*5+j),true);}
  if(name==='city')for(let j=0;j<7;j++){const x=-84+j*28+((j*37)%11);r.box(x,10+(j%4)*3,-167,13,20+(j%4)*6,9,0x6d716b);r.box(x+3,21+(j%4)*6,-167,5,4,9,0x6d716b);}
  return road;}
 // MODELOS DE CENÁRIO por tema (models/manifest.json, "scenery":true). Árvores em grupos de 1 a 3 de tamanhos
 // diferentes, como nas pranchas de referência do dono. has() dispara o carregamento e devolve false até ficar pronto.
 modelsFor(theme){const M=(window.NV_MODELS||{models:{}}).models,D=DECOR[theme]||{};return Object.values(D).filter(n=>M[n]);}
 side(name,k,z,side,a,b,c,time){const r=this.r,C=r.chars,D=DECOR[name]||{},x=side*(5.6+a*1.6),has=n=>!!(n&&C&&C.has&&C.has(n));
  // --- árvores / cactos ---
  if(has(D.tree)){if(z>-96){const desert=name==='desert',n=desert?(a<.62?1+(b<.3?1:0):0):1+Math.floor(c*2.7),H=desert?3:name==='city'?5:name==='sunny'?4.6:5.4;
   for(let j=0;j<n;j++){const q=this.rnd(k,30+j),h=H*(j?.42+q*.33:.85+b*.45),tx=x+(j?(j===1?1.7:-1.4)*(.8+q*.5):0)+(side>0?.4:-.4),tz=z+(j?(q-.5)*3.6:0);C.place(D.tree,tx,tz,h,q*6.283,name==='city'?1.2:1);
    if(name==='hell'&&!j)for(let i=0;i<3;i++){const fl=.7+.3*Math.sin(time*10+k+i*2.1),fy=h*(.35+i*.25);r.fxBox(tx+Math.sin(i*2.3)*.7,fy,tz+Math.cos(i*1.9)*.5,.9*fl,2*fl,.9*fl,i<2?0xff5a12:0xffc23a,.4,true);}}
   if(desert&&a>=.62){if(has(D.rock))C.place(D.rock,x+.6,z,1.6+b*1.6,c*6.283,1.3);else{r.box(x,.5,z,1.8+b*1.6,1.1+c,1.5+a,0xc27a45,b*3,'sphere',.06);r.box(x+.9,.3,z+.6,1,.7,.9,0xa9643a,c*3,'sphere',.06);}}}}
  else this.treeBoxes(name,x,z,a,b,c);
  // --- construções (do outro lado da pista) ---
  if(name!=='desert'&&(k%3===0||name==='city'||name==='hell')){const tall=name==='city'||name==='hell',bx=-side*(tall?9.6+a*1.6:8.4),h=tall?9+b*7:5.2+b*.8;
   if(has(D.building)){if(z>-104)C.place(D.building,bx,z,h,side>0?1.5708:-1.5708,1);
    if(name==='hell'){const blue=this.rnd(k,21)<.1,f1=blue?0x2f7dff:0xff5a12,f2=blue?0x9fd0ff:0xffc23a;for(let j=0;j<2;j++){const fl=.75+.25*Math.sin(time*9+k+j*1.7),fy=h+.5+j*.7+Math.sin(time*6+j)*.2,q=(1.1-j*.3)*fl;r.fxBox(bx+(j-.5)*.8,fy,z+Math.sin(j*2.1)*.8,q,q*2.8,q,j?f2:f1,.38,true);}const sm=(time*.35+a)%1;r.fxBox(bx,h+3+sm*9,z,3+sm*5,3+sm*5,3+sm*5,0x1a1211,.4*(1-sm),false);}}
   else this.buildingBoxes(name,k,z,side,a,b,c,time);}
  // --- o resto continua no desenhista de caixas: postes, dunas, barreiras, entulho, pedras na lava ---
  if((name==='sunny'||name==='rainy'||name==='snowy')&&k%2===0){r.box(side*4.8,1.85,z,.13,3.7,.13,0x5a7380);r.box(side*4.4,3.68,z,.9,.13,.3,name==='rainy'?0xfff1b8:name==='snowy'?0xf0f6fa:0xcbd5c8,0,false,name==='rainy'?3:undefined);}
  if(name==='desert'){r.box(-side*(15+a*5),.2,z,8+b*4,1.6+c*1.4,12,0xe9bf80,0,'sphere',.04);if(c<.25)r.box(side*(4.9+a),.18,z+3,.5,.35,.5,0x8f7a55,a*6,'sphere');}
  if(name==='city'){if(c<.4){for(let j=0;j<3;j++)r.box(side*3.75,.42,z+j*1.35-1.4,.5,.85,1.2,j%2?0xd8dad2:0xc8452f,0,'hull');}else if(c<.65){r.box(side*5,.35,z,1.6,.7,1.3,0x70746c,a*3,'sphere');r.box(side*5.6,.25,z+.8,.9,.5,.8,0x84887f,b*3,'sphere');}}
  if(name==='hell'){r.box(x+1.6,.35,z+2,1.3+b,.7+c*.5,1.2+a,0x1d1517,a*3,'sphere');r.box(side*(12+c*6),-.12,z+2,5+a*4,.1,6+b*5,0x2a1a18,0,'sphere');}}
 // versões de caixas (contingência: sem WebGL2/Three ou enquanto o modelo não carregou)
 treeBoxes(name,x,z,a,b,c){const r=this.r;
  if(name==='sunny'||name==='rainy'){const dark=name==='rainy',g1=dark?0x2f5b40:0x4fae3e,g2=dark?0x3c6d4c:0x72cd55;r.box(x,.9,z,.32,1.8,.32,dark?0x4a3f35:0x7a5a3a);r.box(x,2.4,z,2+b,2.3,2+b,g1,0,'sphere');r.box(x+.5,3.3,z+.2,1.4+b*.6,1.4,1.4,g2,0,'sphere');r.box(x-.5,2.9,z-.3,1.3,1.3,1.3,g2,0,'sphere');}
  else if(name==='snowy'){r.box(x,.6,z,.3,1.2,.3,0x5b4636);for(let j=0;j<3;j++){const w=2.5-j*.65,y=1.5+j*1.05;r.box(x,y,z,w,1.15,w,0x2f6b4f,0,'sphere');r.box(x,y+.42,z,w*.8,.45,w*.8,0xf7fbfd,0,'sphere',.1);}}
  else if(name==='desert'){if(a<.62){const h=1.6+b*1.8;r.box(x,h/2,z,.55,h,.55,0x4f9a4a,0,'smooth',.2);r.box(x+.55,h*.55,z,.6,.3,.35,0x4f9a4a,0,'smooth',.2);r.box(x+.85,h*.7,z,.32,h*.4,.32,0x4f9a4a,0,'smooth',.2);if(c<.6){r.box(x-.55,h*.4,z,.6,.3,.35,0x458c42,0,'smooth',.2);r.box(x-.82,h*.52,z,.3,h*.3,.3,0x458c42,0,'smooth',.2);}}else{r.box(x,.5,z,1.8+b*1.6,1.1+c,1.5+a,0xc27a45,b*3,'sphere',.06);r.box(x+.9,.3,z+.6,1,.7,.9,0xa9643a,c*3,'sphere',.06);}}
  else if(name==='city'||name==='hell'){const col=name==='hell'?0x1d1517:0x4b3d33;r.box(x,1.3,z,.28,2.6,.28,col);r.box(x+.5,2.5,z,1.2,.12,.12,col,.5);r.box(x-.4,2.9,z,.9,.1,.1,col,-.9);r.box(x+.1,3.3,z+.2,.7,.09,.09,col,1.7);}}
 buildingBoxes(name,k,z,side,a,b,c,time){const r=this.r;
  if(name==='sunny'||name==='rainy'){const dark=name==='rainy';this.house(-side*8.2,z,k,dark?[0x8d9497,0x7f8a90]:[0xf0e6d2,0xcfe2ea],dark?0x4d5a63:[0xc8553d,0x3f7fb5,0x5a8f4a][Math.floor(c*3)],0);}
  else if(name==='snowy')this.house(-side*8.2,z,k,[0xd9d3c8,0xb9c6cf],0xf7fbfd,1);
  else if(name==='city'){const bx=-side*(9+a*2),h=7+b*9,w=5+c*2;r.box(bx,h/2,z,w,h,6.5,b<.5?0x8d8f86:0x77796f);if(a<.5){r.box(bx-w*.2,h+.9,z+1,w*.5,1.8,3,0x77796f);r.box(bx+w*.25,h+.4,z-1.5,w*.3,.8,2,0x8d8f86);}const fx=bx+side*(w/2+.02);for(let yy=1.6;yy<h-.8;yy+=2.1)for(let zz=-2;zz<=2;zz+=2)r.box(fx,yy,z+zz,.06,1.1,.9,this.rnd(k,yy+zz)<.2?0x3d423f:0x1f2523);}
  else if(name==='hell'){const bx=-side*(9+a*2),h=6+b*8,w=4.5+c*2,blue=this.rnd(k,21)<.1,f1=blue?0x2f7dff:0xff5a12,f2=blue?0x9fd0ff:0xffc23a;r.box(bx,h/2,z,w,h,6,0x241716);const fxx=bx+side*(w/2+.02);for(let yy=1.5;yy<h-.6;yy+=2)for(let zz=-1.8;zz<=1.8;zz+=1.8)if(this.rnd(k,yy*3+zz)<.7)r.box(fxx,yy,z+zz,.06,1,.8,blue?0x5aa2ff:0xff8a2a,0,false,3);
   for(let j=0;j<4;j++){const fl=.75+.25*Math.sin(time*9+k+j*1.7),fy=h+.9+j*.5+Math.sin(time*6+j)*.2,q=(1.5-j*.2)*fl;r.fxBox(bx+(j-1.5)*w*.22,fy,z+Math.sin(j*2.1)*1.5,q,q*2.6,q,j<2?f1:f2,.42,true);}const sm=(time*.35+a)%1;r.fxBox(bx,h+3+sm*9,z,3+sm*5,3+sm*5,3+sm*5,0x1a1211,.4*(1-sm),false);}}
 house(x,z,k,walls,roof,snow){const r=this.r,w=walls[k%2],rc=Array.isArray(roof)?roof[k%roof.length]:roof;r.box(x,2.3,z,3.8,4.6,4.4,w);r.box(x,4.75,z,4.2,.22,4.8,rc);if(snow)r.box(x,4.95,z,3.9,.3,4.5,0xffffff,0,'sphere',.1);const s=x<0?1:-1;for(const y of [1.2,3.1])for(const q of [-1,1])r.box(x+q*.8,y,z+2.23,.65,.95,.035,0x497280);r.box(x,.7,z+2.25,.85,1.4,.08,0x37525b);}
 // Clima e o que vai por cima de tudo (passe sem luz): neve, chuva + respingos + raio, poeira, brasas, fogo nos zumbis do Inferno.
 weather(game,dt){const r=this.r,name=this.name,time=r.visualTime,dz=r.roadDz||0;
  for(const p of this.flakes){
   if(name==='snowy'){p.y-=dt*(1.8+p.s*1.4);p.x+=Math.sin(time*1.3+p.s*9)*dt*.8;p.z+=dz;if(p.y<0||p.z>13){p.y=p.y<0?13:p.y;if(p.z>13)p.z-=74;}const q=.07+p.s*.07;r.fxBox(p.x,p.y,p.z,q,q,q,0xffffff,.9,false);}
   else if(name==='rainy'){p.y-=dt*26;p.x+=dt*2.2;p.z+=dz+dt*3;if(p.y<0){p.y=12+p.s*2;p.x=(Math.random()-.5)*26;}if(p.z>13)p.z-=74;r.fxSeg(p.x,p.y,p.z,p.x-.12,p.y+1.25,p.z-.2,.028,0xd4e4ff,.38,false);}
   else if(name==='hell'){p.y+=dt*(1.6+p.s*3);p.x+=Math.sin(time*2+p.s*12)*dt*1.2;p.z+=dz*.8;if(p.y>11||p.z>13){p.y=p.y>11?0:p.y;p.x=(Math.random()-.5)*26;if(p.z>13)p.z-=74;}const q=.06+p.s*.09;r.fxBox(p.x,p.y,p.z,q,q,q,p.s<.5?0xff8a2a:0xffd46a,.9,true);}
   else{p.x+=dt*(2+p.s*2);p.z+=dz*.6;if(p.x>14)p.x=-14;if(p.z>13)p.z-=74;const q=4+p.s*5;r.fxBox(p.x,1+p.s*2.5,p.z,q,q*.45,q,name==='desert'?0xe8c58a:0xb9bdb2,name==='desert'?.13:.09,false);}}
  if(name==='rainy'){for(let j=0;j<12;j++){const ph=(time*1.7+j*.37)%1,x=((j*7919)%66)/10-3.3,z=-((j*104729)%420)/10+((time*0+j)%3);r.fxBox(x,.03,z,.25+ph*.9,.02,.25+ph*.9,0xcfe3ff,.35*(1-ph),false);}
   this.thunder-=dt;if(this.thunder<=0){this.thunder=5+Math.random()*7;this.flash=.22;this.boltX=(Math.random()-.5)*90;if(r.onThunder)r.onThunder();}
   if(this.flash>0){this.flash=Math.max(0,this.flash-dt);if(this.flash>.06)r.bolt(this.boltX,58,-150,this.boltX+6,6,-150,this.boltX,7);}}
  if(name==='hell'){let n=0;for(const e of game.enemies){if(e.dead||e.boss||e.z<-52||e.z>1||++n>12)continue;const s=e.scale||1,x=e.x+(r.chars?r.chars.dx(e):0),fl=.7+.3*Math.sin(time*11+e.phase);r.fxBox(x,1.5*s,e.z,.9*s*fl,1.5*s*fl,.9*s*fl,0xff5a12,.4,true);r.fxBox(x,2.1*s,e.z,.5*s*fl,.9*s*fl,.5*s*fl,0xffc23a,.45,true);}}}
}
if(typeof window!=='undefined'){window.Scenery=Scenery;window.SCENERY=SCENERY;}
