(function(root){
'use strict';
const CARS=[
 // Nome, classe e cor vêm das pranchas do dono (a cor só aparece se o modelo 3D não carregar).
 ['Rook',0,'Compact',0xe8eaec],['Milo',2500,'Hatch',0x3fbf3f],['Vela',6500,'Hatch',0xf07018],['Stride',15000,'SUV',0xcbb68c],['Nomad',30000,'Off-road',0x6d7a4a],['Titan',55000,'Pickup',0x1f5fc0],['Fury',95000,'Muscle',0xd32c2c],['Velocity',155000,'Electric',0x1a1d21],['Vortex',240000,'Super',0xf2c313],['Sentinel',360000,'SUV Premium',0x4a4f55],['Overlord',540000,'Truck',0x232629],['Golden',800000,'Ultimate',0xe0a92a,{iap:'car_golden'}],
 ['Blade',0,'Moto',0xf07018,{iap:'bike_blade',hp:200,damage:62}]
].map((v,i)=>Object.assign({name:v[0],price:v[1],type:v[2],color:v[3],tier:i,hp:100+i*14,damage:12+i*3,charge:Math.max(2,6-i*.36)},v[4]||{}));
// Veiculos pagos com dinheiro de verdade, na ordem em que aparecem na garagem.
const IAP=CARS.filter(c=>c.iap).map(c=>c.iap);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function defaults(){return {version:1,money:0,owned:[0],selected:0,unlocked:1,weapon:0,armor:0,tires:0,lang:'en',sound:true,fx:true,arrows:false,vibra:true,intro:true,music:70,sfx:70,avisos:true,tutorial:false,campaign:null,active:null,clears:{}};}
function sanitize(p){const d=defaults();if(!p||p.version!==1)return d;Object.keys(d).forEach(k=>{if(typeof p[k]===typeof d[k])d[k]=p[k]});d.money=clamp(Number(d.money)||0,0,1e8);d.owned=Array.isArray(p.owned)?[...new Set([0,...p.owned.filter(n=>Number.isInteger(n)&&n>=0&&n<CARS.length)])]:[0];d.selected=d.owned.includes(p.selected)?p.selected:0;d.unlocked=clamp(Math.floor(d.unlocked)||1,1,120);['weapon','armor','tires'].forEach(k=>d[k]=clamp(Math.floor(d[k])||0,0,8));d.music=clamp(Math.round(Number(d.music)),0,100);if(!Number.isFinite(d.music))d.music=70;
 // Volume dos efeitos. Quem salvou antes deste campo só tinha o liga/desliga: desligado vira 0.
 if(typeof p.sfx!=='number')d.sfx=d.sound?70:0;d.sfx=clamp(Math.round(Number(d.sfx)),0,100);if(!Number.isFinite(d.sfx))d.sfx=70;d.sound=d.sfx>0;d.campaign=p.campaign&&Number.isFinite(p.campaign.bonus)?{bonus:clamp(p.campaign.bonus,-100,1000),multi:clamp(Math.floor(p.campaign.multi)||1,1,10),multiProgress:clamp(Math.floor(p.campaign.multiProgress)||0,0,10),nitroFuel:clamp(Number(p.campaign.nitroFuel??(p.campaign.charge===0?100:p.campaign.charge>0?25:0))||0,0,100),charge:clamp(Number(p.campaign.charge)||0,-1,12)}:null;d.active=p.active&&[2,3].includes(p.active.snapshot)?p.active:null;d.clears={};if(p.clears&&typeof p.clears==='object')for(const [k,v] of Object.entries(p.clears))if(+k>=1&&+k<=120&&Number.isFinite(v))d.clears[k]=clamp(Math.floor(v),0,10000);return d;}
class Game{
 constructor(profile,emit=()=>{}){this.p=sanitize(profile);this.emit=emit;this.state='garage';this.enemies=[];this.items=[];this.bullets=[];this.projectiles=[];this.effects=[];this.time=0;this.lane=1;this.x=0;this.seed=1;}
 rand(){this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;return this.seed/4294967296;}
 cost(k){return (k==='weapon'?250:k==='armor'?220:180)*(this.p[k]+1)}
 buy(i){if(!CARS[i]||CARS[i].iap||this.p.owned.includes(i)||this.p.money<CARS[i].price)return false;this.p.money-=CARS[i].price;this.p.owned.push(i);this.p.selected=i;this.emit('save');return true;}
 select(i){if(!this.p.owned.includes(i))return false;this.p.selected=i;this.emit('save');return true;}
 // A loja e a fonte da verdade: `ativos` e a lista de produtos que ela confirma AGORA. O que sumiu
 // dela (reembolso, compra cancelada) sai da garagem tambem, senao um reembolso viraria carro de graca.
 // Devolve true se alguma coisa mudou. Se a loja nao respondeu, NAO chame: lista vazia tira tudo.
 syncCompras(ativos){
  // Fail-SAFE, nao fail-open: o que nao e lista nao e resposta da loja. Tratar isso como "nada
  // comprado" removeria do jogador o veiculo que ele pagou, e ainda gravaria no aparelho.
  if(!Array.isArray(ativos))return false;
  const tem=new Set(ativos);let mudou=false;
  for(const c of CARS){if(!c.iap)continue;const temAgora=tem.has(c.iap),tinha=this.p.owned.includes(c.tier);
   if(temAgora&&!tinha){this.p.owned.push(c.tier);mudou=true;}
   else if(!temAgora&&tinha){this.p.owned=this.p.owned.filter(t=>t!==c.tier);mudou=true;}}
  // perdeu o carro que estava equipado: volta para o melhor que ainda e dele
  if(!this.p.owned.includes(this.p.selected)){this.p.selected=Math.max(0,...this.p.owned);mudou=true;}
  if(mudou)this.emit('save');return mudou;}
 upgrade(k){if(!['weapon','armor','tires'].includes(k)||this.p[k]>=8||this.p.money<this.cost(k))return false;this.p.money-=this.cost(k);this.p[k]++;this.emit('save');return true;}
 start(level,hell=null){this.level=clamp(level,1,this.p.unlocked);if(!hell){this.inHell=false;this.hellReturn=null;this.hellVisits=0;this.realLevel=this.level;}this.theme=hell?'hell':Game.themeFor(this.level);this.car=CARS[this.p.selected];this.state='race';this.seed=123+this.level*928+(hell?7777+hell.visits*131:0);this.time=0;this.distance=0;this.roadScroll=0;this.lane=1;this.x=0;this.hp=this.maxHp=this.car.hp+this.p.armor*18;this.damage=this.car.damage+this.p.weapon*4;this.baseDamage=this.damage;const carry=this.p.campaign;this.entryCampaign=carry?JSON.parse(JSON.stringify(carry)):null;this.multiProgress=carry?.multiProgress||0;this.nitroFuel=carry?.nitroFuel??(carry?.charge===0?100:0);this.damage=Math.max(5,this.damage+(carry?carry.bonus:0));this.multi=carry?carry.multi:1;this.earned=0;this.collected=0;this.kills=0;this.shot=0;this.invuln=0;this.slow=0;this.jam=0;this.hurtFlash=0;this.charge=carry?carry.charge:-1;this.nos=0;this.nosDuration=0;this.bossSpawned=false;this.finalDefeated=false;this.midSpawned=false;this.midDefeated=false;this.bossesSpawned=0;this.revived=false;this.enemies=[];this.items=[];this.bullets=[];this.projectiles=[];this.effects=[];this.row=0;this.nextHorde=38;this.end=840;this.next=20;this.reinforce=3.5;this.warn=-1;this.warnTime=0;this.hazards=[];this.specialGate=0;this.terrain='asphalt';this.air=0;this.y=0;this.jumpCool=0;this.jumpQueued=0;this.holes=[];this.planHoles();this.boost=false;this.fire=false;this.boosting=false;this.firing=false;this.shocks=[];this.paid=0;this.ride=0;this.tilt=0;this.hellFury=false;this.ally=null;this.allyDrop=0;this.coinCap=Math.round(this.roadCash()*1.5);this.planBombers();this.emit('start');this.checkpoint();}
 move(dir){if(this.state!=='race'||this.nos>0)return;const antes=this.lane;this.lane=clamp(this.lane+dir,0,2);if(this.lane!==antes)this.emit('lane');}
 // ECONOMIA (0.10): o dinheiro não fica mais na pista, cada zumbi abatido paga. roadCash() é o que a pista
 // oferecia na fase (20 maços); a unidade por zumbi foi calibrada para uma corrida comum (~65% da horda abatida)
 // render ~80% disso, o que um jogador razoável coletava. Mais forte paga mais; chefe = 3,5x o topo do grandalhão.
 // Teto por fase (1,2x a pista antiga): sem ele dava para enrolar o chefe e farmar a escolta para sempre.
 roadCash(){return 20*(55+Math.min(500,Math.floor((this.level-1)*5)));}
 coinUnit(){return 3.8+Math.max(0,Math.min(100,this.level)-20)*.12;}
 coinRange(kind,small=false){if(kind==='boss'){const top=Math.round(this.coinRange('bruiser')[1]*3.5);return [top,top];}const w=kind==='bruiser'?3:kind==='bomber'?2.5:kind==='thrower'?1.8:kind==='runner'?1.2:small?.5:1,u=this.coinUnit();return [Math.max(1,Math.round(u*w*.8)),Math.max(1,Math.round(u*w*1.2))];}
 coin(e){const [a,b]=this.coinRange(e.kind,e.small);let c=a+Math.floor(this.rand()*(b-a+1));if(!e.boss){c=Math.max(0,Math.min(c,(this.coinCap??1e9)-(this.paid||0)));this.paid=(this.paid||0)+c;}return c;}
 // KAMIKAZES: poucos e espalhados (3 a 7 por fase; 12 a 20 da fase 40 em diante). Cada um tem uma distância
 // marcada; ao passar por ela, o próximo bando traz UM na fileira da frente, fora da faixa livre.
 planBombers(){let n=this.level<5?0:this.level>=40?12+Math.floor(this.rand()*9):3+Math.floor(this.rand()*5);if(this.level>=50)n*=2;this.bomberPlan=[];this.bomberDue=0;for(let i=0;i<n;i++)this.bomberPlan.push(Math.round(70+(i+.15+this.rand()*.7)*(630/n)));}
 // Moeda cai na faixa do zumbi (centro da faixa, senão ficaria inalcançável entre duas) e vem com a pista.
 // Abates vizinhos na mesma faixa juntam num monte só. Na vitória, o que ainda está na pista entra na conta.
 dropCoins(e){const x=Math.round(e.x/2.3)*2.3,z=Math.min(-1.5,e.z),pile=this.items.find(i=>i.kind==='coin'&&!i.dead&&i.x===x&&Math.abs(i.z-z)<1.7);if(pile){pile.value+=e.coins;pile.n=(pile.n||1)+1;}else this.items.push({kind:'coin',x,z,value:e.coins,n:1,bad:false});}
 kill(e){if(e.dead)return;e.dead=true;this.kills++;e.coins=this.coin(e);if(e.boss)this.earned+=e.coins;else if(e.coins>0)this.dropCoins(e);if(e.boss){if(e.final)this.finalDefeated=true;else this.midDefeated=true;}if((e.boss||e.kind==='bruiser')&&this.rand()<.28)this.items.push({kind:'repair',x:e.x,z:Math.min(-2,e.z),bad:false,dropped:true});this.emit('burst',e);}
 restart(){if(!['race','paused'].includes(this.state))return false;this.p.campaign=this.entryCampaign?JSON.parse(JSON.stringify(this.entryCampaign)):null;this.start(this.inHell?this.realLevel:this.level);return true;}
 multiTarget(){return this.multi>=10?0:this.multi+1;}
 missileRange(){return 64+(this.multi-1)*6;}
 nitroDamage(){return 2000+1000*this.car.tier;}
 checkpoint(){if(this.state!=='race'&&this.state!=='paused')return;const snap={snapshot:3};for(const k of Object.keys(this))if(!['p','emit','state'].includes(k))snap[k]=this[k];this.p.active=JSON.parse(JSON.stringify(snap));this.emit('save');}
 resumeSaved(){let snap=this.p.active;if(!snap||![2,3].includes(snap.snapshot))return false;try{if(!Number.isFinite(snap.level)||!Number.isFinite(snap.hp)||!Array.isArray(snap.enemies)||!Array.isArray(snap.items))throw Error();let copy=JSON.parse(JSON.stringify(snap));for(const k of Object.keys(copy))if(!['p','emit','state','snapshot','__proto__','constructor','prototype'].includes(k))this[k]=copy[k];this.multiProgress=this.multiProgress||0;this.nitroFuel=this.nitroFuel??(this.charge===0?100:this.charge>0?25:0);this.nos=0;this.theme=this.theme||Game.themeFor(this.level);this.inHell=!!this.inHell;if(this.inHell){const r=this.hellReturn;if(!r||!Number.isFinite(r.level)||!Number.isFinite(r.hp)||!Number.isFinite(r.earned)||!Array.isArray(r.enemies)||!Array.isArray(r.items))throw Error('hellReturn');}this.hellVisits=this.hellVisits||0;this.realLevel=this.realLevel||this.level;this.hellFury=!!this.hellFury;this.air=this.air||0;this.y=this.y||0;this.jumpCool=this.jumpCool||0;this.jumpQueued=0;this.holes=(Array.isArray(this.holes)?this.holes:[]).filter(h=>h&&Array.isArray(h.lanes)&&h.lanes.length&&Number.isFinite(h.z)&&Number.isFinite(h.len));this.holePlan=Array.isArray(this.holePlan)?this.holePlan:[];this.boost=this.fire=this.boosting=this.firing=false;this.shocks=this.shocks||[];this.bomberPlan=this.bomberPlan||[];this.bomberDue=this.bomberDue||0;this.paid=this.paid||0;
  // O relógio das hordas veio do arquivo salvo, então é tratado como entrada hostil: `next` e `nextHorde`
  // só avançam 36 e 18 por vez, e um `ride` muito à frente deles dispararia UMA leva POR QUADRO — milhares
  // de zumbis e o aparelho travado. Antes isso não acontecia porque o spawn parava depois dos 740 metros.
  this.next=Number.isFinite(this.next)?clamp(this.next,0,1e7):20;this.nextHorde=Number.isFinite(this.nextHorde)?clamp(this.nextHorde,0,1e7):38;
  this.ride=Number.isFinite(this.ride)?clamp(this.ride,0,1e7):this.distance;
  if(this.ride>Math.min(this.next,this.nextHorde)+720)this.ride=Math.max(0,Math.min(this.next,this.nextHorde)-1);this.tilt=Number.isFinite(this.tilt)?this.tilt:0;this.allyDrop=Number.isFinite(this.allyDrop)&&this.level>=35&&this.enemies.some(e=>e&&e.boss&&e.final&&!e.dead)?clamp(this.allyDrop,0,13):0;const al=this.ally;this.ally=al&&Number.isFinite(al.x)&&Number.isFinite(al.z)&&Number.isFinite(al.tier)?{tier:clamp(Math.floor(al.tier),0,CARS.length-1),x:al.x,z:al.z,lane:clamp(Math.floor(al.lane)||0,0,2),shot:Number(al.shot)||0,leaving:Number(al.leaving)||0,age:Number(al.age)||0,tilt:Number(al.tilt)||0}:null;this.coinCap=this.coinCap??Math.round(this.roadCash()*1.5);if(this.entryCampaign===undefined)this.entryCampaign=this.p.campaign?{...this.p.campaign}:null;this.state='race';this.emit('start');return true;}catch(e){this.p.active=null;this.emit('save');return false;}}
 // NITRO (segurar o botão) e METRALHADORA (segurar a tela) gastam o MESMO tanque, aos poucos, só enquanto o dedo
 // está lá; soltar para na hora e coletar tanque azul reabastece mesmo durante o uso.
 //  Nitro: tanque cheio dura NITRO_SECONDS. Carro 60% mais rápido, imune, atropela zumbi comum, puxa os itens bons de
 //         todas as faixas e ignora os ruins; raios dão o dano do nitro (nitroDamage) espalhado pelo tempo de um tanque
 //         em TODOS os inimigos na tela, então um chefe que fica a queima inteira leva o mesmo total de antes.
 //  Metralhadora: tanque cheio dura MG_SECONDS. Disparo ~3x mais rápido e projétil bem mais veloz.
 // Para LIGAR precisa de um mínimo no tanque (evita liga-desliga com o tanque pingando); ligado, vai até zerar.
 // SALTO (deslizar para cima): um pulo por vez. No ar o carro passa por cima de buraco, zumbi comum, item de chão
 // (bom ou ruim) e da onda da pancada do chefe; ferramenta, bomba e a investida do chefe continuam acertando.
 jump(){if(this.state!=='race')return false;if(this.air>0||this.jumpCool>0){this.jumpQueued=.45;return false;}this.jumpQueued=0;this.air=Game.JUMP_SECONDS;this.emit('jump');return true;}
 airborne(){return this.y>.55;}
 // BURACOS: só da fase 20 em diante, poucos, +2 a cada 20 fases (3, 5, 7... até 13). 40% uma faixa, 35% duas, 25% a pista toda.
 planHoles(){const n=this.level<20?0:Math.min(13,3+2*Math.floor((this.level-20)/20));this.holePlan=[];for(let i=0;i<n;i++)this.holePlan.push(Math.round(95+(i+.2+this.rand()*.6)*(630/n)));}
 spawnHole(){const r=this.rand(),a=Math.floor(this.rand()*3),lanes=r<.4?[a]:r<.75?(a===1?(this.rand()<.5?[0,1]:[1,2]):a===0?[0,1]:[1,2]):[0,1,2];this.holes.push({z:-92,len:3.4,lanes,hit:false});}
 setBoost(on){this.boost=!!on;if(!on&&this.boosting){this.boosting=false;this.emit('nosEnd');}}
 setFire(on){this.fire=!!on;if(!on&&this.firing){this.firing=false;this.emit('mgEnd');}}
 specials(dt){const MIN=4,was=this.boosting,wasFire=this.firing,race=this.state==='race';
  this.boosting=race&&this.boost&&this.nitroFuel>0&&(was||this.nitroFuel>=MIN);this.firing=race&&this.fire&&this.nitroFuel>0&&(wasFire||this.nitroFuel>=MIN);
  if(this.boosting)this.nitroFuel=Math.max(0,this.nitroFuel-dt*100/Game.NITRO_SECONDS);if(this.firing)this.nitroFuel=Math.max(0,this.nitroFuel-dt*100/Game.MG_SECONDS);
  if(this.boosting!==was)this.emit(this.boosting?'nos':'nosEnd');if(this.firing!==wasFire)this.emit(this.firing?'mg':'mgEnd');
  if(this.boosting){this.invuln=Math.max(this.invuln,.25);const dmg=this.nitroDamage()/Game.NITRO_SECONDS*dt;for(const e of this.enemies)if(!e.dead&&e.z>(e.boss?-75:-44)&&e.z<3&&!(e.boss&&e.mode==='land'&&e.timer>1.25)){e.hp-=dmg;e.hit=Math.max(e.hit,.08);if(e.hp<=0)this.kill(e);}}}
 collect(i){switch(i.kind){case 'cash':case 'coin':this.earned+=i.value;this.collected++;break;case 'damage':i.gain=6/(1+Math.max(0,this.damage-this.baseDamage)/65);this.damage+=i.gain;break;case 'multi':if(this.multi<10){this.multiProgress++;if(this.multiProgress>=this.multiTarget()){this.multi++;this.multiProgress=0;i.upgraded=true;}}break;case 'repair':this.hp=Math.min(this.maxHp,this.hp+28);break;case 'nos':this.nitroFuel=Math.min(100,this.nitroFuel+25);break;case 'weak':this.damage=Math.max(5,this.damage*.65);this.jam=Math.max(this.jam,2);break;case 'minus':this.jam=Math.max(this.jam,4);this.sabotage(26);break;case 'ally':this.callAlly();break;case 'leak':this.nitroFuel=Math.max(0,this.nitroFuel-25);this.slow=4;this.jam=Math.max(this.jam,3);break;case 'loss':i.lost=Math.min(this.earned,Math.max(80,Math.floor(this.earned*.25)));this.earned-=i.lost;break;case 'spike':this.hit(24,'spike');this.slow=2;break;}
 this.emit(i.bad?'penalty':'pickup',i);}
 enemy(kind,lane,z,small=false){let base=12+Math.min(550,(this.level-1)*4);let scale=kind==='bruiser'?1.5+Math.min(.3,this.level*.012):kind==='runner'?.85:kind==='bomber'?1.05:kind==='thrower'?1.15:(small?.74:.92)+this.rand()*(small?.1:.2);let hp=Math.round(base*(kind==='bruiser'?2.5:kind==='thrower'?1.65:kind==='bomber'?2.6:small?.84:2))+(kind==='bruiser'||kind==='thrower'?100:0);hp=Math.round(hp*this.hpScale());return {kind,type:kind==='runner'||kind==='bomber'?1:kind==='thrower'||kind==='bruiser'?2:0,x:(lane-1)*2.3,z,hp,max:hp,scale,boss:false,hit:0,mode:'walk',timer:0,clock:1+this.rand(),targetLane:lane,phase:this.rand()*6,attacked:false,small};}
 spawnHorde(z=-86,escort=false,parte=1){const n=this.row;let soft=n%3;let rows=escort?3:3+Math.min(3,Math.floor(this.level/5));
 if(parte<1)rows=Math.max(1,Math.round(rows*parte));
 if(this.hellFury)rows*=2; // Inferno de fúria: o dobro de zumbis por leva
 let available=['walker','walker','bruiser'];if(this.level>=2)available.push('runner');if(this.level>=3)available.push('thrower');if(escort)available=available.filter(k=>k!=='bruiser'&&k!=='thrower');let bomberLane=-1;if(!escort&&this.bomberDue>0){this.bomberDue--;bomberLane=(soft+1+Math.floor(this.rand()*2))%3;}
 for(let r=0;r<rows;r++)for(let lane=0;lane<3;lane++){
 if(escort&&r===1&&lane===soft)continue;
 let kind=lane===soft?'walker':available[Math.floor(this.rand()*available.length)];if(this.level===1&&n<3)kind='walker';if(!escort&&n>=5&&n%3===0&&r===1&&lane===(soft+1)%3)kind='thrower';if(r===0&&lane===bomberLane)kind='bomber';let e=this.enemy(kind,lane,z-r*3.2,lane===soft);e.x+=(r%2?.16:-.16);this.enemies.push(e);
 }return soft;}
 spawnRow(parte=1){let n=this.row++;let soft=this.spawnHorde(-86,false,parte);this.spawnGoods(n,soft);}
 // Itens separados da horda: com a pista cheia numa luta longa de chefe, os zumbis param de entrar mas
 // os itens CONTINUAM vindo no mesmo ritmo (pedido do dono).
 spawnGoods(n,path){
 // Rewards sit between the front and back rows of the horde, not in an empty lane.
 if(n%2===0){let kind=['multi','damage','nos','multi','damage','nos'][Math.floor(n/2)%6];this.items.push({x:(path-1)*2.3,z:-89,kind,value:0,bad:false});}
 if(n%8===3)this.items.push({x:(path-1)*2.3,z:-89,kind:'nos',bad:false});
 if(n>0){let lane=(path+(n%2?1:2))%3;let kind=['weak','minus','spike','leak','loss'][n%5];this.items.push({x:(lane-1)*2.3,z:-81,kind,bad:true});}
 }
 spawnBoss(final){let hp=Math.round((2200+this.level*180+this.level*this.level*7)*(final?1:.62))*3*this.bossHpScale();let scale=(final?2.9:2.2)+Math.min(.85,this.level*.022);let e={kind:'boss',type:2,x:0,z:-64,hp,max:hp,scale,boss:true,final,hit:0,mode:'land',timer:2.1,hold:1.2,clock:0,cycle:0,targetLane:1,phase:0};this.enemies.push(e);this.bossesSpawned++;this.spawnHorde(-37,true);this.reinforce=3.5;this.allyDrop=final&&this.level>=35?3.2:0;this.emit('boss',e);}
 // INFERNO (pedido do dono): da fase 45 em diante, TODA derrota derruba o carro no Inferno em vez de acabar a corrida.
 // Lá a dificuldade é a da METADE da fase (this.level vira a metade; realLevel guarda a fase de verdade) e o carro vai
 // como estava: dano, mísseis, nitro e blindagem, com a vida cheia. Venceu o chefe do Inferno: a fase volta EXATAMENTE
 // de onde parou (inimigos, distância, chefe), com 60% de vida, como no reviver, ficando com o que ganhou lá. Perdeu
 // no Inferno: vale a derrota normal da fase. As moedas do Inferno entram na conta e no MESMO teto da fase (paid/coinCap),
 // senão daria para morrer de propósito e farmar o Inferno em loop.
 fallToHell(){this.state='hellfall';this.hellTimer=1.4;this.emit('hellfall',{level:this.level});}
 enterHell(){const keep={damage:this.damage,baseDamage:this.baseDamage,multi:this.multi,multiProgress:this.multiProgress,nitroFuel:this.nitroFuel,maxHp:this.maxHp,paid:this.paid,coinCap:this.coinCap,entryCampaign:this.entryCampaign,revived:this.revived},visits=(this.hellVisits||0)+1,real=this.level,back={};
  for(const k of Object.keys(this))if(!['p','emit','hellReturn'].includes(k))back[k]=this[k];back.state='race';const snap=JSON.parse(JSON.stringify(back));
  const furia=visits>=2&&real>=50;   // so a SEGUNDA ida, e so da fase 50 em diante
  this.start(Math.max(1,furia?real:Math.round(real/2)),{visits});
  Object.assign(this,keep,{hp:keep.maxHp,inHell:true,hellReturn:snap,realLevel:real,hellVisits:visits,hellFury:furia,invuln:2});this.emit('hell',{from:real,level:this.level});this.checkpoint();}
 leaveHell(win){if(win)for(const i of this.items)if(i.kind==='coin'&&!i.dead){this.earned+=i.value;i.dead=true;}
  const got={damage:this.damage,multi:this.multi,multiProgress:this.multiProgress,nitroFuel:this.nitroFuel,earned:this.earned,paid:this.paid,kills:this.kills,visits:this.hellVisits},snap=this.hellReturn;
  for(const k of Object.keys(this))if(!['p','emit'].includes(k))delete this[k];Object.assign(this,JSON.parse(JSON.stringify(snap)));
  this.inHell=false;this.hellReturn=null;this.hellVisits=got.visits;this.earned+=got.earned;this.paid=got.paid;this.kills+=got.kills;this.boost=this.fire=this.boosting=this.firing=false;
  // A volta do Inferno repõe o jogo inteiro a partir de uma cópia. Se a cópia foi gravada por uma versão
  // ANTERIOR a estes campos, `ride` voltaria indefinido, viraria NaN na primeira soma e a fase seguiria
  // sem NENHUM zumbi e sem NENHUM item até o chefe. Por isso os campos novos são repostos aqui.
  if(!Number.isFinite(this.ride))this.ride=Number.isFinite(this.distance)?this.distance:0;
  if(!Number.isFinite(this.tilt))this.tilt=0;
  if(!Number.isFinite(this.allyDrop))this.allyDrop=0;
  this.hellFury=false;   // a furia fica no Inferno; a fase de verdade volta normal
  this.ally=null;
  if(!win){this.state='race';this.hp=0;this.emit('hellLose');this.noHell=true;this.finish(false);this.noHell=false;return;}
  this.hp=this.maxHp*.6;this.invuln=3;this.hurtFlash=0;this.air=0;this.y=0;this.projectiles=[];this.shocks=[];this.hazards=[];this.holes=(this.holes||[]).filter(h=>h.z<-20);this.enemies=this.enemies.filter(e=>e.boss||e.z<-20);for(const e of this.enemies)if(e.boss){e.z=-39;e.mode='approach';e.timer=0;e.hold=0;}
  this.state='race';this.emit('start');this.emit('hellWin',{level:this.level});this.checkpoint();}
 finish(win){if(this.state!=='race')return;if(this.finalDefeated)win=true;this.setBoost(false);this.setFire(false);if(this.inHell)return this.leaveHell(win);if(!win&&this.level>=45&&!this.noHell&&(this.hellVisits||0)<Game.hellTrips(this.realLevel||this.level))return this.fallToHell();this.state='result';this.win=win;if(win)for(const i of this.items)if(i.kind==='coin'&&!i.dead){this.earned+=i.value;i.dead=true;}
  // PISTA LIBERADA ao pe da letra: o que sobrou na pista sai de cena antes da animacao de vitoria.
  // Sem isto a horda fica parada no meio da tela enquanto o carro foge, e o item do chao continua la.
  // Vem DEPOIS da varredura das moedas: elas ainda precisam ser contadas.
  if(win){this.ally=null;this.enemies=[];this.items=[];this.projectiles=[];this.bullets=[];this.effects=[];this.hazards=[];this.shocks=[];this.holes=[];}this.preDefeatCampaign=this.p.campaign?{...this.p.campaign}:null;let repeats=this.p.clears[this.level]||0;this.rewardFactor=win?Math.max(.25,1/(1+repeats*.5)):.35;this.reward=Math.floor((this.earned+(win?150+Math.min(450,this.level*20):0))*this.rewardFactor);this.p.money+=this.reward;this.p.active=null;if(win){this.p.clears[this.level]=repeats+1;this.p.campaign={bonus:this.damage-this.baseDamage,multi:this.multi,multiProgress:this.multiProgress,nitroFuel:this.nitroFuel,charge:this.charge};if(this.level===this.p.unlocked)this.p.unlocked=Math.min(120,this.p.unlocked+1);}else this.p.campaign=null;this.emit('save');this.emit('finish');}
 revive(){if(this.state!=='result'||this.win||this.revived)return false;this.p.money-=this.reward;this.reward=0;this.revived=true;this.p.campaign=this.preDefeatCampaign;this.hp=this.maxHp*.6;this.invuln=3;this.projectiles=[];this.shocks=[];this.enemies=this.enemies.filter(e=>e.boss||e.z<-20);for(let e of this.enemies)if(e.boss){e.z=-39;e.mode='approach';e.timer=0;e.hold=0;}this.state='race';this.checkpoint();return true;}
 // DANO DOS ZUMBIS: da fase 50 em diante cada fase pesa mais, 2% por fase. Até ali os tetos (os min(...)
 // espalhados pelos golpes) já tinham achatado o crescimento, e da 50 em diante a corrida virava passeio.
 mobPunch(){return (1+Math.max(0,Math.min(120,this.level)-50)*.02)*(this.hellFury?2.5:1);}
 // ESCALA POR FASE (pedido do dono): 40+ dobra a vida de TODOS os zumbis, chefes inclusive; 50+ dobra a
 // quantidade de kamikazes; 80+ o chefe bate TRES vezes mais; 100+ a vida do chefe dobra de novo (4x).
 hpScale(){return (this.level>=40?2:1)*(this.hellFury?6:1);}
 bossHpScale(){return (this.level>=40?2:1)*(this.level>=100?2:1);} // sem o x6 da fúria: era morte certa
 // RETA FINAL DO CHEFE: com 1000 de vida ou menos ele fica sozinho na pista e bate 7% mais forte.
 // Forca do golpe do chefe: TRIPLICA da fase 80, e ainda 7% a mais na reta final (vida <= 1000).
 bossRage(e){return (this.level>=80?3:1)*(e&&e.final&&e.hp<=Game.BOSS_LAST_STAND?1.07:1);} // a fúria pesa nos zumbis, não no chefe
 // Quanto da horda ainda entra: encolhe junto com a vida do chefe FINAL, e some de vez na reta final.
 hordeShare(){const b=this.enemies.find(e=>e.boss&&e.final&&!e.dead);if(!b)return 1;
  if(b.hp<=Game.BOSS_LAST_STAND)return 0;return Math.max(.15,Math.min(1,b.hp/Math.max(1,b.max)));}
 hit(amount,src='mob'){if(this.invuln>0||this.state!=='race')return;this.hp=Math.max(0,this.hp-amount);this.invuln=.65;this.hurtFlash=.35;this.emit('hurt',{amount,src});if(this.hp<=0)this.finish(false);}
 // Sabotagem: perde vida MESMO recém-batido. É o que o item de downgrade faz agora, já que ele não
 // mexe mais nos mísseis; o castigo aparece no carro regredindo (carTier).
 sabotage(amount,src='minus'){if(this.state!=='race')return;this.hp=Math.max(0,this.hp-amount);this.hurtFlash=.35;this.emit('hurt',{amount,src});if(this.hp<=0)this.finish(false);}
 // CARRO QUE APARECE (pedido do dono): com a vida cheia é o carro escolhido; conforme o HP cai, ele
 // REGRIDE pelos carros que o jogador já comprou, até o mais simples. É só a casca — dano, mísseis e
 // blindagem não mudam, senão seria o mesmo castigo de antes com outro nome.
 carLadder(){const own=(this.p.owned||[0]).filter(t=>Number.isInteger(t)&&t>=0&&t<=this.p.selected);return [...new Set([0,...own,this.p.selected])].sort((a,b)=>a-b);}
 carTier(){const L=this.carLadder();if(L.length<2)return this.p.selected;const f=this.maxHp>0?clamp(this.hp/this.maxHp,0,1):0;return L[Math.min(L.length-1,Math.floor(f*L.length))];}
 // CARRO AMIGO: durante o chefe desce um item de paraquedas. Só dá para pegar PULANDO, e só enquanto ele
 // passa. Pegou, chega um carro controlado pelo jogo que atira nos zumbis ao lado do jogador e vai embora
 // assim que o chefe cai. Vem UMA vez por corrida, só no chefe FINAL e só da fase 35 em diante: se deixar
 // passar, perdeu. Corrida salva por uma versão antiga pode trazer o relógio antigo, e resumeSaved zera.
 dropAlly(){const lane=Math.floor(this.rand()*3);this.items.push({kind:'ally',x:(lane-1)*2.3,z:-92,y:Game.ALLY_HIGH,bad:false,chute:true});this.emit('allyDrop');}
 // O amigo tem que usar um carro FORA da escada do jogador. Senão, quando a vida sobe ou desce o
 // jogador passa a mostrar o mesmo modelo, e como só existe um carro de cada na tela o amigo sumiria.
 callAlly(){const L=this.carLadder();let t=-1;
  for(let k=this.p.selected+1;k<CARS.length&&t<0;k++)if(!L.includes(k))t=k;
  if(t<0)for(let k=CARS.length-1;k>=0&&t<0;k--)if(!L.includes(k))t=k;
  if(t<0)t=(this.p.selected+1)%CARS.length;
  this.ally={tier:t,x:this.x,z:-5.5,lane:this.lane,shot:0,leaving:0,age:0,tilt:0};this.emit('allyIn',this.ally);}
 updateAlly(dt,speed){const a=this.ally;if(!a)return;a.age+=dt;
  if(!this.enemies.some(e=>e.boss&&!e.dead)&&!a.leaving)a.leaving=.001;
  if(a.leaving){a.leaving+=dt;a.tilt=(a.tilt||0)*.9;a.z-=dt*(speed+16);if(a.z<-74){this.ally=null;this.emit('allyOut');}return;}
  const alvo=this.enemies.filter(e=>!e.dead&&!e.boss&&e.z>-46&&e.z<1);
  let want=a.lane;if(alvo.length){const perto=alvo.reduce((m,e)=>e.z>m.z?e:m,alvo[0]);want=clamp(Math.round(perto.x/2.3)+1,0,2);}
  if(want===this.lane)want=this.lane===0?1:this.lane-1; // nunca ocupa a faixa do jogador
  // Ele troca de faixa em CURVA, igual ao carro do jogador: a.tilt guarda o quanto vai para o lado.
  a.lane=want;const antes=a.x;a.x+=((a.lane-1)*2.3-a.x)*Math.min(1,dt*6);
  const quer=dt>0?clamp((a.x-antes)/dt/7.5,-1,1):0;a.tilt=(a.tilt||0)+(quer-(a.tilt||0))*Math.min(1,dt*7);
  a.z+=(-5.5-a.z)*Math.min(1,dt*3);
  a.shot-=dt;if(a.shot<=0){a.shot=.22;this.bullets.push({x:a.x,z:a.z,range:54,dead:false,mg:false,ally:true});}}
 projectile(e,lane,bomb=false){if(this.projectiles.length>=12)return;let z=e.z+1;this.projectiles.push({x:e.x,z,fromX:e.x,fromZ:z,targetX:(lane-1)*2.3,age:0,duration:Math.max(1.35,Math.abs(z)/24),bomb,boss:!!e.boss,damage:(bomb?30:18+Math.min(12,this.level*.4))*(e.boss?this.bossRage(e):this.mobPunch())});this.emit('throw',e);}
 reserveAttack(){if(this.specialGate>0||this.projectiles.length>=2)return false;this.specialGate=this.level<10?1.25:.9;return true;}
 // CHEFE NA PISTA EM MOVIMENTO. z é a distância ao carro, e o carro anda a `speed`: quem está plantado na pista
 // chega no carro a `speed`; quem mantém distância está CORRENDO à frente do carro (de costas para ele).
 //  land     cai num ponto da pista e ruge plantado (o carro vem chegando)
 //  retreat  vira e dispara para longe      approach  corre à frente do carro, que encosta aos poucos, e segura em -39
 //  windup   vira, finca o pé e prepara o golpe enquanto o carro chega (-39 -> ~-13)
 //  rush     corre PARA o carro até bater no para-choque
 updateBoss(e,dt,speed=17){e.phase+=dt*7;const advanced=e.final&&this.level>=12;const canThrow=this.level>=4;
 // ZIGUEZAGUE: correndo à frente do carro ele troca de faixa o tempo todo; 60% das vezes escolhe uma faixa FORA da mira.
 const weave=()=>{e.clock+=dt;if(e.clock>Math.max(.7,1.15-this.level*.006)){e.clock=0;const cur=Math.round(e.x/2.3)+1;let opts=[0,1,2].filter(l=>l!==cur);if(this.rand()<Math.min(.6,.225+this.level*.027)){const away=opts.filter(l=>l!==this.lane);if(away.length)opts=away;}e.targetLane=opts[Math.floor(this.rand()*opts.length)];}e.x+=((e.targetLane-1)*2.3-e.x)*Math.min(1,dt*2.6);};
 if(e.mode==='land'){e.timer-=dt;e.z+=dt*speed;if(e.timer<=0||e.z>-24)e.mode='retreat';}
 else if(e.mode==='approach'){
 if(e.z>-38.5)e.z-=dt*12;else e.z=Math.min(-39,e.z+dt*(4.6+Math.min(2,this.level*.06)));e.hold=(e.hold||0)+dt;
 weave();
 if(e.z>=-39.5&&e.z<=-38.4&&e.hold>=3.2-Math.min(1,this.level*.03)&&this.specialGate<=0&&!this.projectiles.some(p=>p.boss&&!p.dead)){let moves=['slam','rush'];if(canThrow)moves.push('throw');if(advanced&&this.level>=18)moves.push('bomb');const pool=moves.filter(m=>m!==e.attack);let attack=pool[Math.floor(this.rand()*pool.length)];e.cycle++;e.mode='windup';e.attack=attack;e.timer=attack==='rush'?.9:1.4;e.targetLane=this.lane;e.safeLane=(this.lane+1+Math.floor(this.rand()*2))%3;this.specialGate=e.timer+1.5;this.emit('tell',e);}
 }else if(e.mode==='windup'){
 e.timer-=dt;e.z=Math.max(e.z,Math.min(-12.5,e.z+dt*(speed+1.2)));if(e.attack==='rush'){if(e.timer>.4)e.targetLane=this.lane;e.x+=((e.targetLane-1)*2.3-e.x)*Math.min(1,dt*5);}let lanes=e.attack==='slam'?[0,1,2].filter(l=>l!==e.safeLane):[e.targetLane];this.hazards.push({lanes,time:e.timer,kind:e.attack,boss:true});
 if(e.timer<=0){if(e.attack==='slam'){this.shocks.push({lanes,z:e.z+1.5,from:e.z+1.5,x:e.x,damage:(38+Math.min(15,this.level))*this.bossRage(e)});this.emit('slam',e);e.mode='retreat';}
 else if(e.attack==='rush'){e.mode='rush';e.timer=1.4;}
 else{this.projectile(e,e.targetLane,e.attack==='bomb');e.mode='retreat';}}
 }else if(e.mode==='rush'){
 e.z=Math.min(-2.4,e.z+dt*(speed+17));e.x+=((e.targetLane-1)*2.3-e.x)*Math.min(1,dt*5);this.hazards.push({lanes:[e.targetLane],time:.25,kind:'rush',boss:true});if(e.z>=-2.4){if(Math.abs(this.x-e.x)<1.3){this.emit('ram',e);this.hit(42*this.bossRage(e),'rush');}e.mode='retreat';}
 }else if(e.mode==='retreat'){weave();e.z-=dt*12;if(e.z<-40){e.mode='approach';e.clock=0;e.hold=0;}}
 }
 updateMob(e,dt,speed){e.phase+=dt*(e.kind==='runner'||e.kind==='bomber'?11:7);
  // debandada da reta final do chefe: correm para longe até sumir na névoa
  if(e.flee){e.z-=dt*30;if(e.z<-95)e.dead=true;return;}
  let forward=speed+(e.kind==='runner'?5:e.kind==='bruiser'?.4:1);
 if(e.kind==='runner'&&e.z<-12&&e.z>-62){e.clock+=dt;if(e.mode==='walk'&&e.clock>1.6){e.targetLane=(Math.round(e.x/2.3)+1+(this.rand()<.5?1:2))%3;e.mode='switch';e.timer=.7;e.clock=0;}if(e.mode==='switch'){e.timer-=dt;if(e.timer<=0)e.mode='cross';}else if(e.mode==='cross'){e.x+=((e.targetLane-1)*2.3-e.x)*Math.min(1,dt*5);if(Math.abs(e.x-(e.targetLane-1)*2.3)<.08)e.mode='walk';}}
 if((e.kind==='thrower'||e.kind==='bomber')&&!e.attacked&&e.z>-60&&e.z<-37&&this.reserveAttack()){e.mode='aim';e.timer=1.2;e.targetLane=this.lane;e.attacked=true;}
 if(e.mode==='aim'){forward=speed+.4;e.timer-=dt;this.hazards.push({lanes:[e.targetLane],time:e.timer,kind:e.kind==='bomber'?'rush':'throw',boss:false});if(e.timer<=0){if(e.kind==='thrower'){this.projectile(e,e.targetLane);e.mode='walk';}else{e.mode='charge';}}}
 if(e.mode==='charge'){forward=29;e.x+=((e.targetLane-1)*2.3-e.x)*Math.min(1,dt*4);}
 e.z+=dt*forward;
 if(e.z>=-1.9&&e.z<-.4&&!this.airborne()&&Math.abs(e.x-this.x)<(e.kind==='bruiser'?1.12:.9)){if(this.boosting){e.rammed=true;this.emit('ram',e);this.kill(e);return;}e.dead=true;if(e.kind==='bomber')this.emit('explode',e);this.emit('ram',e);this.hit((e.kind==='bomber'?34:e.kind==='bruiser'?25:15+Math.min(8,this.level*.3))*this.mobPunch(),e.kind==='bomber'?'bomber':'mob');}
 else if(e.z>=4.2)e.dead=true;
 }
 update(dt){if(this.state==='hellfall'){this.hellTimer-=clamp(dt,0,.04);if(this.hellTimer<=0)this.enterHell();return;}if(this.state!=='race')return;dt=clamp(dt,0,.04);this.time+=dt;this.hazards=[];this.invuln=Math.max(0,this.invuln-dt);this.hurtFlash=Math.max(0,this.hurtFlash-dt);this.slow=Math.max(0,this.slow-dt);this.jam=Math.max(0,this.jam-dt);this.specialGate=Math.max(0,this.specialGate-dt);
 this.specials(dt);if(this.state!=='race')return;
 this.jumpCool=Math.max(0,this.jumpCool-dt);if(this.jumpQueued>0){this.jumpQueued-=dt;if(this.air===0&&this.jumpCool===0)this.jump();}if(this.air>0){this.air=Math.max(0,this.air-dt);const u=1-this.air/Game.JUMP_SECONDS;this.y=4*Game.JUMP_HEIGHT*u*(1-u);if(this.air===0){this.y=0;this.jumpCool=.15;this.emit('land');}}
 const d=this.distance;this.terrain=d>220&&d<370?'dirt':d>480&&d<650?'mud':'asphalt';const penalty=1-this.p.tires*.065;let speed=17*(this.terrain==='mud'?1-.2*penalty:this.terrain==='dirt'?1-.1*penalty:1)*(this.boosting?1.6:1);let handling=(this.terrain==='mud'?6.5:8.5)*(this.slow>0?.65:1);
 // TROCA DE FAIXA EM CURVA: antes o carro era teleportado de lado, seco. Agora ele leva um instante a
 // mais para chegar e `tilt` guarda o quanto está indo para o lado, de -1 a 1, para o desenho inclinar
 // e esterçar o carro. O tilt suaviza sozinho, então a saída e a volta da curva são macias.
 {const alvo=(this.lane-1)*2.3,antes=this.x;this.x+=(alvo-this.x)*Math.min(1,dt*handling);
  const quer=dt>0?clamp((this.x-antes)/dt/7.5,-1,1):0;this.tilt+=(quer-this.tilt)*Math.min(1,dt*7);}
 this.roadScroll+=speed*dt;
 let activeBoss=this.enemies.some(e=>e.boss&&!e.dead);
 // O CHEFE ENTRA NO MEIO DA HORDA (pedido do dono): a pista segue produzindo zumbis e itens no mesmo
 // ritmo durante a luta. Por isso existem DOIS contadores: `ride` é o quanto a pista já correu e manda
 // nas hordas e nos itens, e continua correndo com o chefe na tela; `distance` é o progresso da FASE e
 // congela na luta, porque é ele que solta o chefe do meio e o chefe final — se andasse, o chefe final
 // nasceria por cima do intermediário e a fase pularia sozinha.
 this.ride+=speed*dt;
 // O teto só vale COM o chefe na tela, e é ALTO de propósito: a pista normal já chega perto de 120
 // zumbis vivos nas fases altas, então um teto baixo faria a luta ter MENOS horda que a corrida comum,
 // que é o contrário do pedido. Isto aqui é só uma trava contra bola de neve numa luta muito longa.
 const lotado=(activeBoss||this.hellFury)&&this.enemies.filter(e=>!e.boss).length>=190;
 if(this.ride>=this.next){this.next+=36;const parte=this.hordeShare();if(lotado||parte<=0)this.spawnGoods(this.row++,Math.floor(this.rand()*3));else this.spawnRow(parte);}
 if(this.ride>=(this.nextHorde??38)){this.nextHorde=(this.nextHorde??38)+Math.max(18,36-this.level);const parte=this.hordeShare();if(!lotado&&parte>0)this.spawnHorde(-86,false,parte);}
 if(!this.bossSpawned&&!activeBoss){this.distance+=speed*dt;while(this.holePlan&&this.holePlan.length&&this.distance>=this.holePlan[0]){this.holePlan.shift();this.spawnHole();}while(this.bomberPlan&&this.bomberPlan.length&&this.distance>=this.bomberPlan[0]){this.bomberPlan.shift();this.bomberDue=(this.bomberDue||0)+1;}if(this.level>=10&&!this.midSpawned&&this.distance>=this.end*.5){this.midSpawned=true;this.spawnBoss(false);}if(this.distance>=this.end){this.bossSpawned=true;this.spawnBoss(true);}}
 if(activeBoss&&!this.ally&&this.allyDrop>0){this.allyDrop-=dt;if(this.allyDrop<=0){this.allyDrop=0;this.dropAlly();}}
 // RETA FINAL DO CHEFE: com 1000 de vida ou menos a horda RECUA e sobra só ele na pista. Eles correm
 // para longe em vez de sumir no ar, senão 190 zumbis evaporariam de um quadro para o outro.
 if(this.hordeShare()===0)for(const e of this.enemies)if(!e.boss&&!e.dead&&e.z<-12)e.flee=true;
 this.updateAlly(dt,speed);if(this.state!=='race')return;
 this.shot-=dt;if(this.shot<=0){this.shot=(this.firing?.065:this.terrain==='mud'?.24:.19)*(this.jam>0?1.85:1);const gap=Math.min(.29,2.3/Math.max(1,this.multi-1));for(let n=0;n<this.multi;n++)this.bullets.push({x:this.x+(n-(this.multi-1)/2)*gap,z:0,range:this.missileRange(),dead:false,mg:this.firing});}
 for(const b of this.bullets){b.prevZ=b.z;b.z-=dt*(b.mg?88:this.terrain==='mud'?37:48);if(-b.z>(b.range||this.missileRange()))b.dead=true;}
 for(const e of this.enemies){e.hit=Math.max(0,e.hit-dt);if(e.boss)this.updateBoss(e,dt,speed);else this.updateMob(e,dt,speed);if(this.state!=='race')return;}
 // Nearest target absorbs a shot: a zombie cannot be hit through a horde.
 const near=[...this.enemies].filter(e=>!e.dead).sort((a,b)=>b.z-a.z);
 for(const b of this.bullets)for(const e of near){if(!e.dead&&!b.dead&&b.z<=e.z+1&&b.prevZ>=e.z-1&&Math.abs(b.x-e.x)<(e.boss?e.scale*.43:e.scale*.55+.15)){e.hp-=this.damage*(b.mg?3:b.ally?.7:1);e.hit=.12;b.dead=true;if(e.hp<=0)this.kill(e);break;}}
 for(const h of this.holes){h.z+=speed*dt;const lane=Math.round(this.x/2.3)+1;if(!h.hit&&h.z<-1&&h.z>-34)this.hazards.push({lanes:h.lanes,time:-h.z/speed,kind:h.z>-11.7*speed/17?'hole':'holeAhead',boss:false});
  if(!h.hit&&Math.abs(h.z)<=h.len/2+.6&&h.lanes.includes(lane)&&!this.airborne()&&!this.boosting){h.hit=true;this.slow=Math.max(this.slow,1.5);this.emit('hole',h);this.hit(20+Math.min(12,this.level*.1),'hole');if(this.state!=='race')return;}}
 this.holes=this.holes.filter(h=>h.z<9);
 for(const s of this.shocks||[]){s.z+=dt*38;this.hazards.push({lanes:s.lanes,time:Math.max(0,-s.z/38),kind:'slam',boss:true});if(s.z>=-1.4){s.dead=true;s.struck=s.lanes.includes(this.lane)&&!this.airborne();this.emit('shock',s);if(s.struck)this.hit(s.damage,'slam');}if(this.state!=='race')return;}
 this.shocks=(this.shocks||[]).filter(s=>!s.dead);
 for(const p of this.projectiles){p.age+=dt;let u=Math.min(1,p.age/p.duration);p.x=p.fromX+(p.targetX-p.fromX)*u;p.z=p.fromZ+(1-p.fromZ)*u;p.y=1.3+Math.sin(u*Math.PI)*(p.bomb?3:1.5);if(p.z>-14)this.hazards.push({lanes:[Math.round(p.targetX/2.3)+1],time:p.duration-p.age,kind:p.bomb?'bomb':'throw',boss:false});if(u>=1){p.dead=true;p.struck=Math.abs(this.x-p.targetX)<(p.bomb?1.2:.9);if(p.bomb)this.emit('explode',p);else this.emit(p.struck?'clang':'miss',p);if(p.struck)this.hit(p.damage,p.bomb?'bomb':'tool');}if(this.state!=='race')return;}
 for(const i of this.items){i.z+=speed*dt;
  // O paraquedas do carro amigo desce enquanto vem e só é pego NO AR, com o salto na hora certa.
  // Fica de fora do nitro, que recolhe tudo sozinho: aqui o pulo é a graça.
  if(i.chute){i.y=Game.ALLY_LOW+clamp(-i.z/92,0,1)*(Game.ALLY_HIGH-Game.ALLY_LOW);
   if(i.z>=-1.3&&i.z<2.3&&this.airborne()&&Math.abs(i.x-this.x)<1.25){this.collect(i);i.dead=true;}}
  else if(i.z>=0&&i.z<2&&(this.boosting?!i.bad:!this.airborne()&&Math.abs(i.x-this.x)<.95)){this.collect(i);i.dead=true;}
  if(this.state!=='race')return;}
 this.items=this.items.filter(i=>!i.dead&&i.z<4);this.enemies=this.enemies.filter(e=>!e.dead);this.bullets=this.bullets.filter(b=>!b.dead&&b.z>-(b.range||this.missileRange()));this.projectiles=this.projectiles.filter(p=>!p.dead);
 if(this.finalDefeated)this.finish(true);
 }
}
Game.THEMES=['sunny','rainy','desert','snowy','city'];Game.themeFor=level=>Game.THEMES[Math.floor((Math.max(1,level)-1)/5)%Game.THEMES.length];Game.NITRO_SECONDS=3;Game.MG_SECONDS=6;Game.JUMP_SECONDS=.9;Game.JUMP_HEIGHT=2.3;Game.ALLY_HIGH=6.4;Game.ALLY_LOW=2.05;Game.BOSS_LAST_STAND=1000;
// Quantas vezes a corrida pode cair no Inferno: uma so, e duas da fase 50 em diante.
Game.hellTrips=level=>level>=50?2:1;
const api={CARS,IAP,Game,defaults,sanitize};if(typeof module!=='undefined')module.exports=api;root.NV=api;
})(typeof window!=='undefined'?window:globalThis);
