'use strict';
// Áudio do jogo: os efeitos gravados pelo dono (sfx.js) e, para o que ainda não tem gravação, o som
// sintetizado aqui dentro. Os dois passam pelo mesmo volume mestre.
//
// Cada entrada é [arquivo, volume, variação de tom, tom base]. A variação existe porque o MESMO tiro
// repetido no mesmo tom vira metralhadora de brinquedo; desafinar um pouco dá vida à rajada.
const AMOSTRA={
 shot:['tiro',.5,.06],
 mg:['tiro',.26,.1,1.55],   // metralhadora do nitro: o mesmo tiro, mais agudo e mais baixo
 jump:['pulo',.55,.05],
 lane:['faixa',.4,.05],
 holeHit:['buraco',.8,.04],
 mobHit:['zumbi',.5,.09],
 bossHit:['chefe',.95,.04],
 explode:['explosao',.85,.07],
 coin:['dinheiro',.3,.09],     // toca muitas vezes seguidas: baixo e bem variado
 cash:['dinheiro',.45,.05],
 clique:['clique',.5,.03],
 vitoria:['vitoria',.9,0],
 derrota:['derrota',.9,0],
};
// De onde veio a pancada -> qual gravação. O que não está aqui (o item 'minus') segue no som sintetizado.
const DOR={hole:'holeHit',slam:'bossHit',tool:'bossHit',bomb:'bossHit',bomber:'bossHit',mob:'mobHit',rush:'mobHit',spike:'mobHit'};
class MotorAudio {
 constructor(){this.context=null;this.last={};this.voices=0;this.lastShot=0;this.vol=.45;}
 // Volume dos efeitos, de 0 a 100, como o dono regula nas configurações.
 // Sai cedo quando nada mudou: isto é chamado a cada quadro, e reescrever o ganho 60x por segundo
 // apaga qualquer rampa que alguém tente fazer no mestre.
 setVolume(pct){const v=.45*Math.max(0,Math.min(100,Number(pct)||0))/100;if(v===this.vol&&this.master)return;this.vol=v;if(this.master)this.master.gain.value=v;}
 unlock(){try{if(!this.context){const c=this.context=new(window.AudioContext||window.webkitAudioContext)();this.master=c.createGain();this.master.gain.value=this.vol;this.master.connect(c.destination);this.motor=c.createOscillator();this.motor.type='sawtooth';this.filter=c.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=190;this.motorGain=c.createGain();this.motorGain.gain.value=0;this.motor.connect(this.filter);this.filter.connect(this.motorGain);this.motorGain.connect(this.master);this.motor.start();this.noise=c.createBuffer(1,c.sampleRate*.5,c.sampleRate);let d=this.noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
  // FORA do if: se algo acima estourou na primeira vez, o contexto já ficou anotado e nunca mais se
  // tentaria carregar as gravações. Aqui o próximo toque na tela tem nova chance.
  if(window.SFX&&this.master)SFX.init(this.context,this.master);
  if(this.context.state==='suspended')this.context.resume();}catch(e){}}
 // Toca a gravação do dono, se houver. Devolve false para o sintetizado assumir.
 gravado(kind){const a=AMOSTRA[kind];if(!a||!window.SFX||!SFX.tem(a[0]))return false;const v=a[2]||0;SFX.toca(a[0],a[1],(a[3]||1)*(1+(Math.random()-.5)*2*v));return true;}
 tone(freq,end,duration,volume=.13,type='triangle'){const c=this.context;if(!c||this.voices>=12)return;this.voices++;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(25,end),c.currentTime+duration);g.gain.setValueAtTime(volume,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);o.connect(g);g.connect(this.master);o.onended=()=>{this.voices--;o.disconnect();g.disconnect()};o.start();o.stop(c.currentTime+duration);}
 impact(volume=.12,duration=.18){const c=this.context;if(!c||this.voices>=12)return;this.voices++;const n=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();n.buffer=this.noise;f.type='lowpass';f.frequency.value=900;g.gain.setValueAtTime(volume,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);n.connect(f);f.connect(g);g.connect(this.master);n.onended=()=>{this.voices--;n.disconnect();f.disconnect();g.disconnect()};n.start();n.stop(c.currentTime+duration);}
 cue(kind,enabled=true,src){if(!enabled||document.hidden||!this.context)return;let now=this.context.currentTime;if(now-(this.last[kind]??-1)<.09)return;this.last[kind]=now;if(kind==='hurt'&&DOR[src]&&this.gravado(DOR[src]))return;if(this.gravado(kind))return;switch(kind){case 'lane':this.tone(700,520,.05,.05,'triangle');break;case 'clique':this.tone(900,1300,.04,.04);break;case 'vitoria':this.tone(390,780,.5);break;case 'derrota':this.tone(300,90,.9,.18,'sawtooth');this.impact(.3,.7);break;case 'shot':this.tone(155,65,.055,.045,'square');break;case 'burst':this.impact(.09,.13);break;case 'explode':this.impact(.55,.6);this.tone(95,26,.55,.32,'sawtooth');this.tone(180,40,.25,.18,'square');break;case 'thunder':this.impact(.5,1.1);this.tone(60,24,1.1,.28,'sine');break;case 'hellfall':this.tone(420,38,1.2,.22,'sawtooth');this.impact(.4,.9);break;case 'jump':this.tone(240,620,.16,.07,'triangle');break;case 'land':this.impact(.22,.16);this.tone(90,45,.14,.1,'sine');break;case 'mg':this.tone(560,170,.045,.05,'square');break;case 'zap':this.tone(2600,240,.06,.035,'sawtooth');this.impact(.05,.05);break;case 'thud':this.impact(.5,.5);this.tone(70,28,.5,.3,'sine');break;case 'clang':this.tone(1500,700,.12,.12,'square');this.tone(2300,1100,.18,.07,'triangle');this.impact(.12,.08);break;case 'coin':this.tone(1250,1750,.06,.035);break;case 'hurt':case 'penalty':this.impact(.23,.28);this.tone(105,36,.3,.12);break;case 'nos':this.tone(110,1200,.8,.17,'sawtooth');this.impact(.14,.45);break;case 'cash':this.tone(900,1250,.085,.09);break;case 'ally':this.tone(300,760,.30,.16);this.tone(460,980,.34,.12,'sawtooth');this.impact(.10,.35);break;case 'allyDrop':this.tone(880,520,.45,.09,'triangle');break;case 'repair':this.tone(420,850,.22);break;case 'multi':this.tone(610,1220,.14);break;case 'finish':this.tone(390,780,.5);break;default:this.tone(470,700,.12,.09);}}
 update(game){if(!this.context||!this.motorGain)return;let active=game.state==='race'&&game.p.sound&&!document.hidden;let c=this.context;this.motorGain.gain.setTargetAtTime(active?(game.boosting?.06:.018):0,c.currentTime,.08);const temNitro=!!(window.SFX&&SFX.tem('nitro'));if(active&&game.boosting&&!temNitro&&Math.random()<.3)this.cue('zap');if(active&&game.firing&&game.time-this.lastShot>.06){this.lastShot=game.time;this.cue('mg');}this.motor.frequency.setTargetAtTime(game.boosting?150:game.terrain==='mud'?42:62+(game.car?.tier||0)*3,c.currentTime,.15);if(active&&game.shot>.15&&game.time-this.lastShot>.14&&game.nos<=0){this.lastShot=game.time;this.cue('shot');}if(game.time<this.lastShot)this.lastShot=0;
  // Sons contínuos: o nitro enquanto o botão está segurado e o murmúrio da horda, que cresce com a
  // quantidade de zumbis realmente visíveis à frente do carro (com a pista limpa, ele some).
  if(window.SFX){SFX.laco('nitro',active&&game.boosting?.5:0);
   let perto=0;if(active)for(const e of game.enemies)if(!e.dead&&e.z>-70&&e.z<14)perto++;
   SFX.laco('horda',active?Math.min(.34,perto*.02):0);}}
 mute(){if(this.context)this.motorGain.gain.setTargetAtTime(0,this.context.currentTime,.03);if(window.SFX)SFX.calaTudo();}
}
