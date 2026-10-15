// DROPALOO — jogo de um toque (Lipy Games). Canvas puro, sem biblioteca.
// Regra: a gotinha pula; só atravessa o bloco da MESMA COR DO FUNDO; a chuva de tinta repinta o mundo.
// No app Android, as pontes DropalooAds / DropalooNative / DropalooHaptics existem; no navegador, não (sem anúncio).
(() => {
'use strict';

// ================= Configuração =================
const VERSION = '1.0.0';
const H = 1600, FLOOR = 1500, SEG = 300, SEGS = 5, TILE = 150, WALL_W = 150;
const GRAV = 2900, JUMP = -900, MAXFALL = 1400, R_DRAW = 64, R_HIT = 46;   // pulo sobe ~140 numa porta com ~200 de folga
const PAT = ['02','07','16','34','71','75'];
// Cores por emoção; cada cor tem estampa própria (daltônicos)
const PHASES = [
  { until:10,  mix:.45, dark:0,   colors:[['#5DB7EA',0],['#4FD69C',1],['#F78FB8',2],['#F5C842',3]] },  // calma
  { until:25,  mix:.30, dark:.04, colors:[['#19B5A5',2],['#9B7BF5',3],['#7BC93C',4],['#FF7E6B',5]] },  // foco
  { until:1e9, mix:.12, dark:.14, colors:[['#FF8A1F',4],['#E8358C',5],['#8A4DFF',0],['#3D7BFF',1]] },  // tensão
];
const GOLD = '#FFC93C', INK = '#2b2d42';
const RAINBOW = ['#FF5A3C','#FF8A1F','#F5C842','#4FD69C','#5DB7EA','#9B7BF5','#E8358C'];
const FONT = "'Baloo 2','Baloo Bhaijaan 2','M PLUS Rounded 1c',sans-serif";
const phaseOf = n => PHASES.findIndex(p => n < p.until);
// Medalhas: [pontos, cor, bônus de moedas]
const MEDALS = [[5,'#CD7F32',2],[10,'#B8C2CF',4],[20,'#FFC93C',6],[30,'#7FDCEB',8],[45,'#2ECC71',10],[60,'#E8355A',15],[80,'rainbow',25]];
const medalOf = s => { let m = -1; MEDALS.forEach((md,i) => { if (s >= md[0]) m = i; }); return m; };
// Mundos surpresa: trocam a cada 25 pontos
const WORLD_EVERY = 25;
const WORLDS = [
  { band:'clouds1', far:'pointy_mountains', props:null },
  { band:null, far:'pointy_mountains', props:['tree01','tree02','tree03','tree05','tree08','tree10'], gap:190, h:360 },
  { band:'castle_wall', far:null, props:['tower','castle','tower'], gap:620, h:420 },
  { band:null, far:'pointy_mountains', props:['piramid','temple','mountain3'], gap:560, h:330 },
  { band:'fence', far:null, props:['house_front_tall','house_front_short','house_side_tall'], gap:330, h:330 },
];
const worldOf = s => Math.floor(s / WORLD_EVERY) % WORLDS.length;
// Gotinhas (skins): forma do corpo + rosto de sempre
const SKINS = [
  ['circle','a',0], ['circle','h',30], ['circle','e',60], ['circle','l',90],
  ['square','a',130], ['square','g',170], ['squircle','d',220], ['squircle','f',270],
  ['rhombus','a',330], ['rhombus','b',400], ['squircle','k',480], ['rhombus','g',560],
];
const GIFT_EVERY = 4 * 3600e3;
const BOT = /[?&]bot\b/.test(location.search);

// ================= Armazenamento (pode falhar) =================
const store = {
  get(k, d){ try{ const v = localStorage.getItem('dropaloo_'+k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('dropaloo_'+k, JSON.stringify(v)); }catch(e){} }
};

// ================= Pontes nativas =================
const NAT = () => window.DropalooNative, ADS = () => window.DropalooAds;
const isApp = !!window.DropalooNative;
function haptic(ms, amp){ try { const h = window.DropalooHaptics; if (h && store.get('fx', true)) h.pulse(ms, amp); } catch(e){} }

// ================= Idiomas =================
const I = window.DROPALOO_I18N, LANGS = ['pt','en','es','ar','hi','ja'].filter(l => I[l]);
function detectLang(){
  const saved = store.get('lang', ''); if (LANGS.includes(saved)) return saved;
  let tag = ''; try { tag = (isApp && NAT().locale()) || navigator.language || ''; } catch(e){ tag = navigator.language || ''; }
  const base = tag.toLowerCase().slice(0,2);
  return LANGS.includes(base) ? base : 'en';
}
let lang = detectLang();
function T(k, vars){
  const has = o => o && o[k] != null;
  let s = has(I[lang]) ? I[lang][k] : has(I.en) ? I.en[k] : has(I.pt) ? I.pt[k] : k;
  if (vars) for (const v in vars) s = s.split('{'+v+'}').join(vars[v]);
  return s;
}
const esc = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const rich = s => esc(s).replace(/\*([^*]+)\*/g, '<b>$1</b>');
function applyLang(){
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(el => { el.innerHTML = rich(T(el.dataset.t)); });
  const tl = document.getElementById('tLang'); if (tl) tl.textContent = T('langName');
}

// ================= Canvas =================
const cv = document.getElementById('game'), cx = cv.getContext('2d');
let DPR = 1, scale = 1, viewW = 900;
function resize(){
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = Math.round(innerWidth * DPR); cv.height = Math.round(innerHeight * DPR);
  scale = cv.height / H; viewW = cv.width / scale;
}
addEventListener('resize', resize); resize();

// ================= Imagens =================
const IMG = {};
const imgList = ['block','face_a','face_b','face_c','face_d','face_e','face_f','face_g','face_h','face_i','face_j','face_k','face_l',
  'body_circle','body_squircle','body_rhombus','body_square','shadow','star_06','circle_05','spark_05','star','coin',
  'hills1','hills2','clouds1','pointy_mountains','cloud1','cloud2','cloud3','cloud5',
  'tree01','tree02','tree03','tree05','tree08','tree10','castle_wall','tower','castle','piramid','temple','mountain3',
  'house_front_tall','house_front_short','house_side_tall','fence']
  .concat(PAT.map(p => 'pat_'+p)).concat([0,1,2,3,4,5].map(i => 'splat'+i));
const loadImg = n => new Promise(res => { const i = new Image(); i.onload = () => { IMG[n] = i; res(); }; i.onerror = () => res(); i.src = 'assets/img/'+n+'.png'; });

function hexRGB(h){ const n = parseInt(h.slice(1),16); return [n>>16&255, n>>8&255, n&255]; }
function mixHex(a, b, t){ const A = hexRGB(a), B = hexRGB(b); return '#'+A.map((v,i) => Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join(''); }
function lum(h){ const [r,g,b] = hexRGB(h); return (0.299*r+0.587*g+0.114*b)/255; }
// Pinta um sprite numa cor mantendo o sombreado (minL=1 => cor chapada)
const tintCache = new Map();
function tint(name, hex, minL = 0.6){
  const key = name+hex+minL; if (tintCache.has(key)) return tintCache.get(key);
  const img = IMG[name]; const c = document.createElement('canvas');
  if (!img) { c.width = c.height = 1; return c; }
  // faixas largas de fundo são tingidas em meia resolução (4x menos pixels; o desenho estica)
  const k = img.width > 400 ? 0.5 : 1;
  c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, c.width, c.height);
  try {
    const d = x.getImageData(0,0,c.width,c.height), p = d.data, [R,G,B] = hexRGB(hex);
    let maxL = 1;
    for (let i=0;i<p.length;i+=4) if (p[i+3]) maxL = Math.max(maxL, 0.299*p[i]+0.587*p[i+1]+0.114*p[i+2]);
    for (let i=0;i<p.length;i+=4){ if (!p[i+3]) continue;
      const f = minL + (1-minL) * ((0.299*p[i]+0.587*p[i+1]+0.114*p[i+2]) / maxL);
      p[i] = Math.min(255,R*f*1.08); p[i+1] = Math.min(255,G*f*1.08); p[i+2] = Math.min(255,B*f*1.08); }
    x.putImageData(d,0,0);
  } catch(e){ x.globalCompositeOperation = 'source-atop'; x.fillStyle = hex; x.fillRect(0,0,c.width,c.height); }
  if (tintCache.size > 600) tintCache.clear();
  tintCache.set(key, c); return c;
}
const blockCache = new Map();
function blockSprite(color, patIdx){
  const key = color+patIdx; if (blockCache.has(key)) return blockCache.get(key);
  const base = tint('block', color, 0.7); const c = document.createElement('canvas'); c.width = base.width; c.height = base.height;
  const x = c.getContext('2d'); x.drawImage(base,0,0);
  const pimg = tint('pat_'+PAT[patIdx], lum(color) > .62 ? INK : '#ffffff', 1);
  const pc = document.createElement('canvas'); pc.width = pc.height = 64; pc.getContext('2d').drawImage(pimg,0,0,64,64);
  x.globalCompositeOperation = 'source-atop'; x.globalAlpha = lum(color) > .62 ? .16 : .26;
  x.fillStyle = x.createPattern(pc,'repeat'); x.fillRect(0,0,c.width,c.height);
  blockCache.set(key, c); return c;
}
function medalSprite(color){
  if (color !== 'rainbow') return tint('star', color, 0.75);
  const base = tint('star', '#ffffff', 0.85), c = document.createElement('canvas'); c.width = base.width; c.height = base.height;
  const x = c.getContext('2d'); x.drawImage(base, 0, 0); x.globalCompositeOperation = 'multiply';
  const g = x.createLinearGradient(0, 0, c.width, c.height); RAINBOW.forEach((col,i) => g.addColorStop(i/(RAINBOW.length-1), col));
  x.fillStyle = g; x.fillRect(0, 0, c.width, c.height); x.globalCompositeOperation = 'destination-in'; x.drawImage(base, 0, 0); return c;
}

// ================= Áudio (sem música de fundo) =================
let AC = null, master = null, muted = store.get('muted', false);
const SND = {}, sndNames = ['jump1','jump2','jump3','portal','ghost','point','click','splat','gameover','record','gold'];
async function initAudio(){
  if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    master = AC.createGain(); master.gain.value = muted ? 0 : 1; master.connect(AC.destination);
    const dec = async n => { try { const b = await fetch('assets/snd/'+n+'.mp3').then(r => r.arrayBuffer()); return await AC.decodeAudioData(b); } catch(e){ return null; } };
    await Promise.all(sndNames.map(async n => SND[n] = await dec(n)));
  } catch(e){ AC = null; }
}
function play(n, vol = 1, rate = 1){
  if (!AC || !SND[n] || muted) return null;
  try {
    const s = AC.createBufferSource(); s.buffer = SND[n]; s.playbackRate.value = rate;
    const g = AC.createGain(); g.gain.value = vol; s.connect(g); g.connect(master); s.start(); return s;
  } catch(e){ return null; }
}
let overSnd = null;
function stopOver(){ if (overSnd) { try { overSnd.stop(); } catch(e){} overSnd = null; } }
function setMuted(m){ muted = m; store.set('muted', m); if (master && AC) master.gain.setTargetAtTime(m ? 0 : 1, AC.currentTime, .05); }

// ================= Anúncios (só no app) =================
const Ads = {
  seq: 0, pend: {}, busy: false, lastInter: 0, lastAdAt: 0, deaths: 0,
  ok(){ try { return !!ADS() && ADS().available(); } catch(e){ return false; } },
  // Uma resposta por pedido. Relógio de segurança: sem aparecer em 15 s (ou sem fechar em 20 min) = falhou.
  show(reward, cb){
    if (!this.ok() || this.busy) { cb(false, false); return; }
    const id = ++this.seq; this.pend[id] = cb; this.busy = true; syncAdBtns();
    this.timer = setTimeout(() => window.nativeAdResult(id, false, false), 15e3);
    try { ADS().request(id, reward); } catch(e){ window.nativeAdResult(id, false, false); }
  }
};
window.nativeAdResult = (id, won, shown) => {
  const cb = Ads.pend[id]; if (!cb) return;
  delete Ads.pend[id]; Ads.busy = false; clearTimeout(Ads.timer); syncAdBtns();
  if (shown) Ads.lastAdAt = Date.now();
  cb(!!won, !!shown);
};
window.nativeAdShown = id => {
  Ads.lastAdAt = Date.now(); clearTimeout(Ads.timer);
  Ads.timer = setTimeout(() => window.nativeAdResult(id, false, true), 20 * 60e3);
};
// Enquanto um vídeo carrega, os botões de vídeo e o Menu ficam travados (sem toque duplo, sem trocar de tela)
function syncAdBtns(){ ['bRevive','bDouble','bGiftDouble','bMenu'].forEach(id => { const b = document.getElementById(id); if (b) b.disabled = Ads.busy; }); }
const sessionStart = Date.now();
// Intersticial só na troca de partida: a cada 3 mortes, 3 min entre eles, nunca no 1º minuto,
// nunca depois de recorde ou "quase", nunca colado num vídeo premiado.
function maybeInterstitial(then){
  const now = Date.now();
  const ok = Ads.ok() && Ads.deaths >= 3 && Ads.deaths % 3 === 0 && now - Ads.lastInter > 180e3 &&
             now - sessionStart > 60e3 && now - Ads.lastAdAt > 60e3 && !run.special;
  if (!ok) return then(false);
  const token = runToken;
  Ads.show(false, (won, shown) => { if (shown) Ads.lastInter = Date.now(); if (token === runToken && state === 'dead') then(shown); });
}

// ================= Estado do jogo =================
let state = 'load';      // load | start | play | dead
let paused = false, invuln = 0;
let best = store.get('best', 0);
{ const m = location.search.match(/[?&]best=(\d+)/); if (m) best = +m[1]; }
let coins = store.get('coins', 0);
let owned = store.get('skins', [0]); if (!owned.includes(0)) owned.push(0);
let skin = store.get('skin', 0); if (!owned.includes(skin)) skin = 0;
let fx = store.get('fx', true);
let score, speed, player, walls, curtains, particles, bgColor, wave, wallCount, spawnColor, prevSpawn, lastDoor,
    shake, scorePop, deadAt, goldOn, recordShown, faceT, face, tutorial, combo, t = 0, layerX, toast = null,
    world, rng, run = {}, runToken = 0;
// Desafio do dia: mesma pista para todo mundo no mesmo dia (semente pela data)
function todayKey(){ const d = new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function mulberry32(a){ return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function seedOf(s){ let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

function colorInfo(hex){ for (const p of PHASES) for (const [c,pi] of p.colors) if (c === hex) return pi; return 0; }
function bgOf(hex, ph){ const p = PHASES[ph]; let c = mixHex(hex, '#ffffff', p.mix); if (p.dark) c = mixHex(c, '#1d1b3a', p.dark); return c; }
const skinFace = () => 'face_' + SKINS[skin][1];
const skinBody = () => 'body_' + SKINS[skin][0];

function reset(daily){
  runToken++;
  run = { daily: !!daily, dailyBonus: !!daily && !store.get('dailyPaid_'+todayKey(), false), revived: false, doubled: false,
          coins: 0, paid: 0, special: false, prevBest: best };
  rng = daily ? mulberry32(seedOf('dropaloo' + todayKey())) : Math.random;
  score = 0; speed = 380; walls = []; curtains = []; particles = []; wallCount = 0; shake = 0; scorePop = 0;
  goldOn = false; recordShown = false; toast = null; face = skinFace(); faceT = 0; combo = 0; layerX = [0,0,0,0]; world = 0;
  const c0 = PHASES[0].colors[0][0];
  bgColor = c0; wave = null; spawnColor = c0; prevSpawn = null; lastDoor = 2; invuln = 0; paused = false;
  player = { x: Math.min(viewW * 0.3, 420), y: 700, vy: 0, sx: 1, sy: 1, rot: 0 };
  tutorial = best < 3 && !daily;
  let x = player.x + 1000; while (x < viewW + 520) { spawnWall(x); x += spacingOf(wallCount); }
}
const spacingOf = n => n >= 75 ? 470 : 520;
function spawnWall(x){
  const n = wallCount++;
  const ph = Math.max(0, phaseOf(n));
  const pal = PHASES[ph].colors.map(c => c[0]);
  // Chuva de tinta: a cada 3 paredes (a cada 2 depois de 50) ou na troca de emoção
  const every = n >= 50 ? 2 : 3;
  const phaseChange = n > 0 && phaseOf(n) !== phaseOf(n-1);
  if (n >= 2 && (n % every === every - 1 || phaseChange)) {
    const opts = pal.filter(c => c !== spawnColor);
    const nc = opts[Math.floor(rng() * opts.length)];
    curtains.push({ x: x - spacingOf(n) * 0.5, color: nc, used: false, seed: rng() * 10 });
    prevSpawn = spawnColor; spawnColor = nc;
  }
  // Porta = bloco da cor do fundo naquele momento: desce até 2 andares, mas SOBE no máximo 1 (subir custa toques)
  let door = lastDoor + Math.max(-1, Math.round((rng()*2-1) * 2));
  door = Math.max(0, Math.min(SEGS-1, door)); lastDoor = door;
  const wide = n < 4;
  const solids = pal.filter(c => c !== spawnColor && c !== prevSpawn);
  const segs = [];
  for (let i=0;i<SEGS;i++){
    const isDoor = i === door || (wide && i === Math.min(SEGS-1, door+1) && door < SEGS-1) || (wide && door === SEGS-1 && i === door-1);
    segs.push(isDoor ? spawnColor : solids[(i + n) % solids.length]);
  }
  const target = run.daily ? store.get('daily_'+todayKey(), 0) : best;
  walls.push({ x, segs, scored: false, minClear: 1e9, n, ghost: false, recordLine: target > 0 && n === target });
}

// ================= Partículas =================
function burst(x, y, color, count, opts = {}){
  if (!fx) count = Math.ceil(count / 2);
  for (let i=0;i<count;i++){
    const a = opts.dir != null ? opts.dir + (Math.random()-.5)*opts.spread : Math.random()*Math.PI*2;
    const sp = (opts.speed || 400) * (0.4 + Math.random()*0.8);
    const c = Array.isArray(color) ? color[Math.floor(Math.random()*color.length)] : color;
    particles.push({ img: opts.img || 'circle_05', color: c, x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp,
      life: 0, max: (opts.life || .6) * (0.7 + Math.random()*0.6), size: (opts.size || 40) * (0.6 + Math.random()*0.8),
      rot: Math.random()*6, vr: (Math.random()-.5)*8, g: opts.g != null ? opts.g : 900 });
  }
  if (particles.length > 260) particles.splice(0, particles.length - 260);
}

// ================= Entrada =================
const $ = id => document.getElementById(id);
const show = id => $(id).classList.remove('hidden');
const hide = id => $(id).classList.add('hidden');
const isOpen = id => !$(id).classList.contains('hidden');
const OVERLAYS = ['shop','settingsBox','giftBox','invite','exitBox'];
const overlayOpen = () => OVERLAYS.some(isOpen);

function tap(){
  initAudio();
  if (overlayOpen()) return;
  if (state === 'start') { startRun(false); return; }
  if (state === 'play') { if (paused) { resumePlay(); return; } flap(); return; }
  if (state === 'dead' && performance.now() - deadAt > 450 && isOpen('over') && !Ads.busy) retry();
}
function keepAwake(on){ try { const n = NAT(); if (n && n.keepAwake) n.keepAwake(!!on); } catch(e){} }
function startRun(daily){
  hide('start'); hide('over'); stopOver(); cv.classList.remove('grey');
  reset(daily); state = 'play'; syncHud(); flap(); keepAwake(true);
  store.set('runs', store.get('runs', 0) + 1);
}
// Depois de um intersticial, a partida espera o toque (o anúncio nunca "mata" a gotinha)
function retry(){ hide('over'); maybeInterstitial(shown => { startRun(run.daily); if (shown) pausePlay(); }); }
function flap(){
  player.vy = JUMP; player.sx = 0.86; player.sy = 1.18;
  play('jump'+(1+Math.floor(Math.random()*3)), .55, 0.95 + Math.random()*0.1);
  burst(player.x - 10, player.y + 40, bgColorTarget(), 3, { dir: Math.PI*0.6, spread: 0.8, speed: 260, size: 22, life: .4 });
}
function bgColorTarget(){ return wave ? wave.to : bgColor; }
cv.addEventListener('pointerdown', e => { e.preventDefault(); tap(); });
['start','over','pauseBox'].forEach(id => $(id).addEventListener('pointerdown', e => { if (e.target.closest('button')) return; e.preventDefault(); tap(); }));
addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') { if (document.activeElement && document.activeElement.tagName === 'BUTTON' && overlayOpen()) return; e.preventDefault(); tap(); }
  if (e.code === 'Escape') back();
});
// botões: um clique nunca vira pulo
function onBtn(id, fn){ const b = $(id); b.addEventListener('pointerdown', e => e.stopPropagation()); b.addEventListener('click', e => { e.stopPropagation(); initAudio(); play('click', .5); fn(e); }); }

function pausePlay(){ if (state !== 'play' || paused) return; paused = true; show('pauseBox'); syncHud(); keepAwake(false); }
function resumePlay(){ paused = false; hide('pauseBox'); syncHud(); flap(); keepAwake(true); }
onBtn('pauseBtn', () => { if (state === 'play') { paused ? resumePlay() : pausePlay(); } });

// ================= Medalhas e fim de partida =================
const urlCache = new Map();
const medalURL = col => { if (!urlCache.has(col)) urlCache.set(col, medalSprite(col).toDataURL()); return urlCache.get(col); };
function fillMedals(){
  const mi = medalOf(score), have = Math.max(store.get('medal', -1), mi);
  store.set('medal', have);
  $('mImg').src = medalURL(mi >= 0 ? MEDALS[mi][1] : '#D3D6DF');
  $('mName').textContent = mi >= 0 ? T('medalRun', { m: T('m'+mi) }) : T('noMedal');
  const bar = $('mBar'), next = $('mNext');
  if (mi < MEDALS.length - 1){
    const from = mi >= 0 ? MEDALS[mi][0] : 0, to = MEDALS[mi+1][0];
    bar.style.setProperty('--fill', MEDALS[mi+1][1] === 'rainbow' ? GOLD : MEDALS[mi+1][1]);
    bar.style.width = '0%'; requestAnimationFrame(() => { bar.style.width = Math.round((score - from) / (to - from) * 100) + '%'; });
    next.textContent = T('nextMedal', { n: to - score, m: T('m'+(mi+1)) });
  } else { bar.style.width = '100%'; next.textContent = T('allMedals'); }
  const shelf = $('shelf'); shelf.innerHTML = '';
  MEDALS.forEach((m,i) => { const im = document.createElement('img'); im.alt = T('m'+i);
    im.src = medalURL(i <= have ? m[1] : '#D3D6DF'); if (i > have) im.style.opacity = '.5'; shelf.appendChild(im); });
}
function die(){
  if (state !== 'play' || invuln > 0 || (BOT && window.__dzGod)) return;
  state = 'dead'; deadAt = performance.now(); face = 'face_j'; shake = fx ? 0.22 : 0;
  if (BOT) window.__dzLast = { y: Math.round(player.y), vy: Math.round(player.vy), bg: bgColor, score,
    walls: walls.filter(w => Math.abs(w.x - player.x) < 400).map(w => ({ dx: Math.round(w.x - player.x), n: w.n, segs: w.segs.join(' '), scored: w.scored })) };
  play('splat', 1); haptic(40, 180);
  burst(player.x, player.y, bgColorTarget(), 18, { speed: 650, size: 46, life: .7 });
  cv.classList.add('grey');
  Ads.deaths++;
  store.set('lastDeath', Date.now());
  const prev = run.daily ? store.get('daily_'+todayKey(), 0) : best;
  const isRecord = score > prev;
  if (run.daily) { if (isRecord) store.set('daily_'+todayKey(), score); }
  else if (isRecord) { best = score; store.set('best', best); if (run.prevBest >= 5) reviewPending('record'); }
  const shownBest = run.daily ? store.get('daily_'+todayKey(), 0) : best;
  run.special = isRecord || (prev - score <= 3 && score > 0);
  payRun(); keepAwake(false);
  if (medalOf(score) >= 1 && !store.get('rvMedal', false)) { store.set('rvMedal', true); reviewPending('medal'); }
  setTimeout(() => {
    if (state !== 'dead') return;
    $('oScore').textContent = score; $('oBest').textContent = shownBest;
    const msg = $('msg'), title = $('overTitle');
    if (isRecord && score > 0) { title.textContent = T('overNew'); msg.textContent = T('overNewMsg'); }
    else if (score === prev && score > 0) { title.textContent = T('overTie'); msg.textContent = T('overTieMsg'); }
    else if (prev - score <= 3 && score > 0) { title.textContent = T('overClose'); msg.textContent = T('overCloseMsg', { n: prev - score }); }
    else { title.textContent = T('overSplash'); msg.textContent = prev > 0 ? T('overMiss', { n: prev - score }) : ''; }
    fillMedals();
    $('earn').textContent = T('coinsRun', { n: run.coins });
    const adOk = Ads.ok();
    $('bRevive').classList.toggle('hidden', !(adOk && !run.revived && score >= 5));
    $('bDouble').classList.toggle('hidden', !(adOk && !run.doubled && run.coins > 0));
    show('over'); syncHud();
    stopOver(); overSnd = play('gameover', 1);
  }, 380);
}
function addCoins(n){ coins += n; store.set('coins', coins); syncHud(); }
// Moedas da partida: 1 por ponto + bônus das medalhas; o 1º desafio do dia vale em dobro.
// Paga só a diferença (continuar a partida não paga duas vezes).
function payRun(){
  if (run.dailyBonus && !run.paid) store.set('dailyPaid_'+todayKey(), true);
  const total = (score + MEDALS.filter(m => score >= m[0]).reduce((a,m) => a + m[2], 0)) * (run.dailyBonus ? 2 : 1);
  addCoins(total - (run.paid || 0)); run.paid = total; run.coins = total;
}
onBtn('bMenu', () => { if (!Ads.busy) toMenu(); });
onBtn('bRevive', () => {
  stopOver(); const tk = runToken;
  Ads.show(true, won => { if (tk !== runToken || state !== 'dead') return; if (won) revive(); else domToast(T('adFail')); });
});
onBtn('bDouble', () => {
  const tk = runToken;
  Ads.show(true, won => {
    if (tk !== runToken || state !== 'dead') return;
    if (!won) { domToast(T('adFail')); return; }
    run.doubled = true; addCoins(run.coins); run.coins *= 2;
    $('earn').textContent = T('coinsRun', { n: run.coins }); hide('bDouble');
  });
});
function revive(){
  run.revived = true; hide('over'); cv.classList.remove('grey');
  // abre caminho: a parede onde bateu vira fantasma; a gotinha volta no meio da próxima porta
  for (const w of walls) if (Math.abs(w.x - player.x) < WALL_W + R_DRAW) { w.ghost = true; w.scored = true; }
  const nx = walls.find(w => !w.scored && w.x > player.x);
  const col = bgColorTarget();
  if (nx) { const i = nx.segs.indexOf(col), j = nx.segs.lastIndexOf(col); if (i >= 0) player.y = ((i + j + 1) / 2) * SEG; else player.y = FLOOR/2; }
  else player.y = FLOOR/2;
  player.vy = 0; player.rot = 0; face = skinFace(); invuln = 1.5; state = 'play'; paused = true; show('pauseBox'); syncHud(); keepAwake(true);
}

// ================= Atualização =================
function circleRect(px, py, r, rx, ry, rw, rh){
  const nx = Math.max(rx, Math.min(px, rx+rw)), ny = Math.max(ry, Math.min(py, ry+rh));
  return Math.hypot(px-nx, py-ny) - r;
}
function startWave(toColor, toWorld){
  const from = bgColorTarget(), fromW = wave ? wave.toW : world;
  wave = { from, to: toColor, fromW, toW: toWorld, t: 0, dur: fx ? .55 : .35, x: player.x, y: player.y };
}
function update(dt){
  t += dt;
  for (const p of particles){ p.life += dt; p.vy += p.g*dt; p.x += p.vx*dt; p.y += p.vy*dt; p.rot += p.vr*dt; }
  particles = particles.filter(p => p.life < p.max);
  if (wave){ wave.t += dt; if (wave.t >= wave.dur) wave = null; }
  if (toast && (toast.t += dt) > 1.8) toast = null;
  shake = Math.max(0, shake - dt); scorePop = Math.max(0, scorePop - dt*3); faceT = Math.max(0, faceT - dt);
  if (faceT === 0 && state === 'play') face = skinFace();
  player.sx += (1 - player.sx) * Math.min(1, dt*10); player.sy += (1 - player.sy) * Math.min(1, dt*10);

  if (state === 'start' || state === 'load') { player.y = 920 + Math.sin(t*3)*30; player.rot = Math.sin(t*3)*0.08; scrollBg(dt, 120); return; }
  if (state === 'dead') { if (player.y < FLOOR - R_HIT) { player.vy = Math.min(MAXFALL, player.vy + GRAV*dt); player.y = Math.min(FLOOR - R_HIT, player.y + player.vy*dt); player.rot += dt*4; } return; }
  if (paused) return;

  if (BOT) bot();
  playTime(dt);
  invuln = Math.max(0, invuln - dt);
  speed = 380 + Math.min(score, 45) * 5;
  scrollBg(dt, speed);
  player.vy = Math.min(MAXFALL, player.vy + GRAV*dt); player.y += player.vy*dt;
  player.rot = Math.max(-0.35, Math.min(0.6, player.vy / 1800));
  if (player.y < R_HIT) { player.y = R_HIT; player.vy = Math.max(0, player.vy); }
  if (player.y > FLOOR - R_HIT) { player.y = FLOOR - R_HIT; if (invuln > 0 || (BOT && window.__dzGod)) { player.vy = JUMP * 0.8; } else { die(); return; } }

  for (const w of walls) w.x -= speed*dt;
  for (const c of curtains) c.x -= speed*dt;
  walls = walls.filter(w => w.x > -WALL_W*2); curtains = curtains.filter(c => c.x > -300);
  const last = walls[walls.length-1]; if (last && last.x < viewW + 200) spawnWall(last.x + spacingOf(wallCount));

  for (const c of curtains){
    if (!c.used && c.x < player.x){
      c.used = true; startWave(c.color, wave ? wave.toW : world); bgColor = c.color; // a regra muda na hora; o visual vem na onda
      play('portal', .7); haptic(12, 90);
      burst(player.x, player.y, c.color, 14, { speed: 520, size: 60, life: .6 });
      face = 'face_c'; faceT = .5;
    }
  }
  for (const w of walls){
    const rx = w.x - WALL_W/2;
    if (!w.ghost && player.x + R_HIT > rx && player.x - R_HIT < rx + WALL_W){
      for (let i=0;i<SEGS;i++){
        if (w.segs[i] === bgColor) continue;
        const d = circleRect(player.x, player.y, R_HIT, rx+6, i*SEG+4, WALL_W-12, SEG-8);
        if (d < 0) { if (invuln > 0 || (BOT && window.__dzGod)) continue; die(); return; }
        w.minClear = Math.min(w.minClear, d);
      }
    }
    if (!w.scored && w.x + WALL_W/2 < player.x - R_HIT){
      w.scored = true; score++; scorePop = 1; combo++;
      play('ghost', .45); play('point', .35, 1 + Math.min(combo, 12) * 0.04);
      if (w.minClear < 20) { face = 'face_i'; faceT = .45; burst(player.x, player.y - 40, '#ffffff', 5, { img: 'spark_05', speed: 300, size: 36, g: 0, life: .4 }); }
      else if (faceT === 0) { face = 'face_c'; faceT = .3; }
      if (tutorial && score >= 3) tutorial = false;
      onScore();
    }
  }
}
// Piloto automático só para teste (?bot na URL)
function bot(){
  const ahead = walls.filter(w => w.x + WALL_W/2 > player.x - R_HIT && !w.ghost); if (!ahead.length) return;
  const door = w => { const cur = curtains.find(c => !c.used && c.x < w.x && c.x > player.x - 10), col = cur ? cur.color : bgColor;
    const i = w.segs.indexOf(col), j = w.segs.lastIndexOf(col); return [i * SEG, (j + 1) * SEG]; };
  const w = ahead[0], [top, bot] = door(w), inside = player.x + R_HIT + 170 > w.x - WALL_W/2;
  let target = (top + bot) / 2 + 40;
  if (inside && ahead[1]) { const [t2, b2] = door(ahead[1]); target = Math.max(top + R_HIT + 40, Math.min(bot - R_HIT - 30, (t2 + b2) / 2 + 40)); }
  const apex = player.y - (JUMP * JUMP) / (2 * GRAV);
  if (player.y > target && player.vy > -150 && (!inside || apex > top + R_HIT + 14)) flap();
}
function onScore(){
  const mi = MEDALS.findIndex(m => m[0] === score);
  if (mi >= 0){
    const col = MEDALS[mi][1];
    play('gold', .55, 1.1); haptic(20, 120);
    burst(viewW/2, 420, col === 'rainbow' ? RAINBOW : col, 22, { img: 'star_06', speed: 600, size: 46, life: 1, g: 700 });
    toast = { text: T('medalToast', { m: T('m'+mi) }), color: col === 'rainbow' ? GOLD : col, t: 0 };
  }
  // mundo surpresa
  const nw = worldOf(score);
  if (nw !== world){
    world = nw; startWave(bgColorTarget(), nw); play('record', .6); haptic(25, 140);
    burst(viewW/2, 600, RAINBOW, 30, { img: 'star_06', speed: 800, size: 50, life: 1.2, g: 900 });
    toast = { text: T('worldToast', { w: T('w'+nw) }), color: '#ffffff', t: 0 };
    const seen = store.get('worldMax', 0); if (score > seen) { store.set('worldMax', score); if (score >= WORLD_EVERY && seen < WORLD_EVERY) reviewPending('world'); }
  }
  const target = run.daily ? store.get('daily_'+todayKey(), 0) : best;
  const nearGold = target >= 5 && score >= target - 3 && score <= target;
  if (nearGold && !goldOn){ goldOn = true; play('gold', .6); }
  if (!nearGold) goldOn = false;
  if (score > target && target > 0 && !recordShown){
    recordShown = true; play('record', .8); haptic(30, 160);
    burst(viewW/2, 260, PHASES.flatMap(p => p.colors.map(c => c[0])), 46, { img: 'star_06', speed: 900, size: 54, life: 1.3, g: 1100 });
  }
}
function scrollBg(dt, sp){ layerX[0] -= sp*dt*0.08; layerX[1] -= sp*dt*0.2; layerX[2] -= sp*dt*0.4; layerX[3] -= sp*dt*1; }

// ================= Desenho =================
function drawLayer(name, color, y, h, offset, alpha = 1){
  const img = IMG[name]; if (!img) return;
  const spr = tint(name, color, 1); const w = img.width * (h / img.height);
  let x = offset % w; if (x > 0) x -= w;
  cx.globalAlpha = alpha;
  for (; x < viewW; x += w - 4) cx.drawImage(spr, x, y, w, h);
  cx.globalAlpha = 1;
}
function drawProps(list, color, base, h, gap, offset, alpha){
  const span = gap * list.length * 2; let x0 = offset % span; if (x0 > 0) x0 -= span;
  cx.globalAlpha = alpha;
  for (let x = x0, i = 0; x < viewW + gap; x += gap, i++){
    const name = list[i % list.length], img = IMG[name]; if (!img) continue;
    const hh = h * (0.8 + ((i * 37) % 5) * 0.06), w = img.width * (hh / img.height);
    cx.drawImage(tint(name, color, 1), x, base - hh, w, hh);
  }
  cx.globalAlpha = 1;
}
function drawWorld(paint, wi){
  const ph = Math.max(0, phaseOf(score || 0)), W = WORLDS[wi || 0];
  const sky = bgOf(paint, ph);
  cx.fillStyle = sky; cx.fillRect(0, 0, viewW, H);
  if (W.band === 'clouds1') drawLayer('clouds1', mixHex(sky, '#ffffff', .55), FLOOR - 560, 300, layerX[0], .7);
  if (W.far) drawLayer(W.far, mixHex(sky, paint, .55), FLOOR - 470, 330, layerX[0], .55);
  for (let i=0;i<4;i++){
    const nm = 'cloud'+[1,2,3,5][i], img = IMG[nm]; if (!img) continue;
    const span = viewW + 500, x = ((i*span/4 + layerX[1]) % span + span) % span - 250;
    cx.globalAlpha = .8; cx.drawImage(tint(nm, mixHex(sky,'#ffffff',.7), 1), x, 140 + (i%2)*230, img.width*1.6, img.height*1.6); cx.globalAlpha = 1;
  }
  if (W.band && W.band !== 'clouds1') drawLayer(W.band, mixHex(sky, paint, .6), FLOOR - 330, 150, layerX[1], .75);
  if (W.props) drawProps(W.props, mixHex(sky, paint, .62), FLOOR - 150, W.h, W.gap, layerX[1], .8);
  drawLayer('hills2', mixHex(sky, paint, .8), FLOOR - 230, 230, layerX[2], .8);
  drawLayer('hills1', mixHex(paint, '#1d1b3a', .18), FLOOR - 130, 230, layerX[3], 1);
}
function text(str, x, y, size, fill, stroke = 14){
  cx.font = '800 '+size+'px '+FONT; cx.textAlign = 'center'; cx.textBaseline = 'middle';
  cx.direction = lang === 'ar' ? 'rtl' : 'ltr';
  cx.lineJoin = 'round'; cx.lineWidth = stroke; cx.strokeStyle = INK; cx.strokeText(str, x, y);
  cx.fillStyle = fill; cx.fillText(str, x, y);
}
function drawDrop(x, y, color, faceName, sx = 1, sy = 1, rot = 0, alpha = 1){
  const body = tint(skinBody(), color, 0.62);
  cx.save(); cx.globalAlpha = alpha; cx.translate(x, y); cx.rotate(rot); cx.scale(sx, sy);
  if (IMG.shadow) { cx.globalAlpha = .25 * alpha; cx.drawImage(IMG.shadow, -R_DRAW*0.8, R_DRAW*0.75, R_DRAW*1.6, 22); cx.globalAlpha = alpha; }
  cx.drawImage(body, -R_DRAW, -R_DRAW, R_DRAW*2, R_DRAW*2);
  const f = IMG[faceName]; if (f) { const fw = R_DRAW*1.2, fh = fw * f.height / f.width; cx.drawImage(f, -fw/2, -fh/2 + 6, fw, fh); }
  cx.restore();
}
function render(){
  cx.setTransform(1,0,0,1,0,0); cx.clearRect(0,0,cv.width,cv.height);
  const sh = shake > 0 ? (Math.random()-.5) * 14 * (shake/.22) : 0;
  cx.setTransform(scale, 0, 0, scale, sh*scale, 0);

  if (wave){
    drawWorld(wave.from, wave.fromW);
    const k = 1 - Math.pow(1 - wave.t / wave.dur, 3), r = k * Math.hypot(viewW, H) * 1.1;
    cx.save(); cx.beginPath(); cx.arc(wave.x, wave.y, r, 0, Math.PI*2); cx.clip(); drawWorld(wave.to, wave.toW); cx.restore();
    const splat = tint('splat'+(Math.floor(wave.t*20)%6), wave.to, 1);
    for (let i=0;i<8;i++){ const a = i/8*Math.PI*2 + wave.t*2; cx.globalAlpha = 1 - k; cx.drawImage(splat, wave.x + Math.cos(a)*r - 60, wave.y + Math.sin(a)*r - 60, 120, 120); }
    cx.globalAlpha = 1;
  } else drawWorld(bgColor, world);

  // chuva de tinta (não pode parecer parede)
  const inMenu = state === 'start' || state === 'load';
  for (const c of curtains){
    if (c.used || inMenu) continue;
    for (let i=0;i<9;i++){
      const yy = ((i*FLOOR/9 + t*260 + c.seed*100) % FLOOR), s = 0.55 + Math.sin(t*4 + i + c.seed)*0.08, sz = 160*s;
      cx.globalAlpha = 0.75; cx.save(); cx.translate(c.x + Math.sin(i*2.1 + c.seed)*30, yy); cx.rotate(i*1.3 + c.seed + t*0.6);
      cx.drawImage(tint('splat'+((i + Math.floor(c.seed))%6), c.color, 1), -sz/2, -sz/2, sz, sz); cx.restore();
    }
    const st = tint('star_06', '#ffffff', 1);
    for (let i=0;i<5;i++){ const yy = ((i*FLOOR/5 + t*140 + 60) % FLOOR); cx.globalAlpha = 0.55 + 0.25*Math.sin(t*3+i); cx.drawImage(st, c.x - 24 + Math.cos(t*2+i)*40, yy, 48, 48); }
    cx.globalAlpha = 1;
  }
  // faixa do recorde
  for (const w of walls){
    if (!w.recordLine || w.scored) continue;
    const lx = w.x + WALL_W/2 + 70, st = tint('star_06', GOLD, 1);
    cx.globalAlpha = .85;
    for (let y = 30; y < FLOOR; y += 70) { const s = 34 + Math.sin(t*4 + y)*6; cx.drawImage(st, lx - s/2, y - s/2, s, s); }
    cx.globalAlpha = 1;
    text(T('record'), lx, FLOOR - 40, 44, GOLD, 10);
  }
  // paredes
  for (const w of walls){
    if (inMenu) break;
    const rx = w.x - WALL_W/2;
    for (let i=0;i<SEGS;i++){
      const col = w.segs[i], open = w.ghost || col === bgColor, spr = blockSprite(col, colorInfo(col));
      cx.globalAlpha = open ? 0.2 : 1;
      for (let j=0;j<SEG/TILE;j++) cx.drawImage(spr, rx, i*SEG + j*TILE, WALL_W, TILE);
    }
    cx.globalAlpha = 1;
  }
  // tela larga (portal web): névoa esconde paredes muito à frente
  if (viewW > 2300){
    const sky = bgOf(bgColorTarget(), Math.max(0, phaseOf(score || 0))), [r,g,b] = hexRGB(sky);
    const fg = cx.createLinearGradient(1800, 0, 2300, 0);
    fg.addColorStop(0, `rgba(${r},${g},${b},0)`); fg.addColorStop(1, `rgba(${r},${g},${b},.85)`);
    cx.fillStyle = fg; cx.fillRect(1800, 0, 500, FLOOR); cx.fillStyle = `rgba(${r},${g},${b},.85)`; cx.fillRect(2299, 0, viewW, FLOOR);
  }
  // dourado perto do recorde (brilho lento, nunca pisca)
  if (goldOn && state === 'play'){
    const a = fx ? 0.22 + Math.sin(t*2.6)*0.06 : 0.18;
    const g = cx.createRadialGradient(viewW/2, H/2, H*0.35, viewW/2, H/2, H*0.85);
    g.addColorStop(0, 'rgba(255,201,60,0)'); g.addColorStop(1, `rgba(255,201,60,${a})`);
    cx.fillStyle = g; cx.fillRect(0,0,viewW,H);
    if (!paused && Math.random() < 0.15) burst(Math.random()*viewW, H, GOLD, 1, { img: 'star_06', dir: -Math.PI/2, spread: .4, speed: 300, size: 30, g: 0, life: 1.2 });
  }
  // gotinha (pisca de leve enquanto está protegida depois de continuar)
  const p = player;
  drawDrop(p.x, p.y, bgColorTarget(), face, p.sx, p.sy, p.rot, invuln > 0 && state === 'play' && !paused ? 0.55 + 0.35*Math.sin(t*14) : 1);
  for (const q of particles){
    cx.globalAlpha = Math.max(0, 1 - q.life / q.max); cx.save(); cx.translate(q.x, q.y); cx.rotate(q.rot);
    cx.drawImage(tint(q.img, q.color, 1), -q.size/2, -q.size/2, q.size, q.size); cx.restore();
  }
  cx.globalAlpha = 1;
  if (state === 'play' || state === 'dead'){
    const s = 1 + scorePop * 0.25;
    cx.save(); cx.translate(viewW/2, 230); cx.scale(s, s); text(String(score), 0, 0, 190, goldOn ? GOLD : '#ffffff', 18); cx.restore();
    if (run.daily) text(T('daily'), viewW/2, 360, 40, '#ffffff', 9);
    if (toast){
      const a = Math.min(1, toast.t * 6, (1.8 - toast.t) * 3), s2 = 1 + Math.max(0, 0.3 - toast.t);
      cx.save(); cx.globalAlpha = Math.max(0, a); cx.translate(viewW/2, 440); cx.scale(s2, s2); text(toast.text, 0, 0, 66, toast.color, 13); cx.restore();
    }
    if (tutorial && state === 'play') text(T('tutorial'), viewW/2, 360, 46, '#ffffff', 10);
  }
}

// Gancho de teste (só com ?bot): mede o custo de cada quadro e expõe o estado
if (BOT) window.__dz = {
  perf(n = 120){ const a = performance.now(); for (let i=0;i<n;i++){ update(1/60); render(); } return +((performance.now() - a) / n).toFixed(2); },
  info(){ return { state, score, best, coins, world, paused, skin, lang, daily: run.daily, walls: walls.length, particles: particles.length, y: Math.round(player.y) }; },
  // Montagem de cenas reais para as telas da loja (tests/_shots): joga com o piloto até a condição e congela
  start(daily){ startRun(!!daily); }, shop(){ openShop(); }, setCoins(n){ coins = n; store.set('coins', n); syncHud(); },
  setBest(n){ best = n; }, protect(){ window.__dzGod = true; }, freeze(on){ window.__dzFrozen = !!on; },
  until(fn, maxSec = 120){ for (let i=0;i<maxSec*120;i++){ update(1/120); if (fn(this.peek())) break; } render(); return this.info(); },
  peek(){ return { score, world, gold: goldOn, wave: wave ? wave.t / wave.dur : -1, state, curtainNear: curtains.some(c => !c.used && c.x - player.x < 260 && c.x > player.x) }; },
  kill(){ window.__dzGod = false; die(); },
  // N partidas do piloto automático: mostra até onde chega (justiça das paredes)
  bench(n = 20, cap = 200){ const out = []; for (let k=0;k<n;k++){ hide('start'); hide('over'); reset(false); state = 'play'; flap(); let s = 0; while (state === 'play' && s < cap*120*1.5) { update(1/120); s++; if (score >= cap) break; } out.push(score); } return out; },
  run(sec){ for (let i=0;i<sec*120;i++) update(1/120); render(); return this.info(); }
};
// ================= Loop =================
let lastT = performance.now(), acc = 0;
function frame(now){
  acc += Math.min(0.1, (now - lastT) / 1000); lastT = now;
  while (acc >= 1/120) { if (!window.__dzFrozen) update(1/120); acc -= 1/120; }
  if (state !== 'load') render();
  requestAnimationFrame(frame);
}

// ================= Interface =================
function syncHud(){
  $('coins').textContent = coins;
  $('coinPill').classList.toggle('hidden', state === 'play');
  $('pauseBtn').classList.toggle('hidden', state !== 'play' || paused);
}
let toastTimer = 0;
function domToast(msg){
  let el = document.querySelector('.toastDom'); if (!el) { el = document.createElement('div'); el.className = 'toastDom'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.remove('hidden'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
}
function fmtTime(ms){ const m = Math.ceil(ms / 60000), h = Math.floor(m / 60); return h > 0 ? h+'h '+String(m % 60).padStart(2,'0')+'m' : m+'m'; }
function refreshMenu(){
  const db = store.get('daily_'+todayKey(), 0);
  $('dailyInfo').textContent = db > 0 ? T('dailyBest', { n: db }) : T('dailyNew');
  const left = store.get('giftAt', 0) - Date.now();
  $('bGift').classList.toggle('glow', left <= 0);
  $('giftInfo').textContent = left <= 0 ? T('giftReady') : T('giftIn', { t: fmtTime(left) });
}
setInterval(() => { if (state === 'start') { refreshMenu(); menuCalm(); } }, 20e3);
function toMenu(){
  // saiu no meio da partida (pausa → menu): o recorde e as moedas feitas até ali não se perdem
  if (state === 'play' && score > 0) {
    if (run.daily) { if (score > store.get('daily_'+todayKey(), 0)) store.set('daily_'+todayKey(), score); }
    else if (score > best) { best = score; store.set('best', best); }
    payRun();
  }
  keepAwake(false);
  stopOver(); hide('over'); hide('pauseBox'); cv.classList.remove('grey');
  reset(false); state = 'start'; show('start'); refreshMenu(); syncHud();
  setTimeout(menuCalm, 600);
}
// Momento calmo no menu: convite de avisos ou pedido de avaliação (nunca os dois)
function menuCalm(){
  if (state !== 'start' || overlayOpen()) return;
  if (maybeInvite()) return;
  tryReview();
}

// Gotinhas
function skinCanvas(i, color){
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const [shape, fc] = SKINS[i]; x.drawImage(tint('body_'+shape, color, 0.62), 0, 0, 128, 128);
  const f = IMG['face_'+fc]; if (f) { const fw = 77, fh = fw * f.height / f.width; x.drawImage(f, 64 - fw/2, 64 - fh/2 + 6, fw, fh); }
  return c;
}
function openShop(){
  const g = $('grid'); g.innerHTML = '';
  const cols = PHASES.flatMap(p => p.colors.map(c => c[0]));
  SKINS.forEach((s, i) => {
    const b = document.createElement('button'); b.className = 'skin' + (i === skin ? ' sel' : '') + (owned.includes(i) ? '' : ' locked');
    b.appendChild(skinCanvas(i, cols[i % cols.length]));
    const nm = document.createElement('span'); nm.textContent = T('s'+i); b.appendChild(nm);
    const sm = document.createElement('small');
    if (i === skin) sm.textContent = T('using');
    else if (owned.includes(i)) sm.textContent = T('use');
    else sm.innerHTML = '<img src="assets/img/coin.png" alt="">' + s[2];
    b.appendChild(sm);
    b.addEventListener('pointerdown', e => e.stopPropagation());
    b.addEventListener('click', e => { e.stopPropagation(); initAudio(); pickSkin(i); });
    g.appendChild(b);
  });
  show('shop');
}
function pickSkin(i){
  if (!owned.includes(i)){
    const price = SKINS[i][2];
    if (coins < price) { play('click', .4, .7); domToast(T('needCoins', { n: price - coins })); return; }
    coins -= price; store.set('coins', coins); owned.push(i); store.set('skins', owned);
    play('record', .7); haptic(25, 140);
    reviewPending('skin'); setTimeout(tryReview, 900);
  } else play('click', .5);
  skin = i; store.set('skin', i); face = skinFace(); syncHud(); openShop();
}
onBtn('bSkins', () => { if (!overlayOpen()) openShop(); });
onBtn('bShopClose', () => hide('shop'));

// Presente a cada 4 horas
function openGift(){
  const left = store.get('giftAt', 0) - Date.now();
  if (left > 0) { domToast(T('giftIn', { t: fmtTime(left) })); return; }
  const amt = 25 + Math.floor(Math.random() * 16);
  addCoins(amt); store.set('giftAt', Date.now() + GIFT_EVERY);
  $('giftAmt').textContent = T('giftGot', { n: amt });
  const bd = $('bGiftDouble'); bd.classList.toggle('hidden', !Ads.ok()); bd.dataset.amt = amt;
  play('record', .7); haptic(25, 140); show('giftBox'); refreshMenu();
}
onBtn('bGift', () => { if (!overlayOpen()) openGift(); });
onBtn('bGiftDouble', () => {
  const amt = +$('bGiftDouble').dataset.amt || 0;
  Ads.show(true, won => { if (!won) { domToast(T('adFail')); return; } if (!isOpen('giftBox')) return; addCoins(amt); $('giftAmt').textContent = T('giftGot', { n: amt * 2 }); hide('bGiftDouble'); });
});
onBtn('bGiftClose', () => hide('giftBox'));
onBtn('bDaily', () => { if (!overlayOpen()) startRun(true); });

// Ajustes
function syncSettings(){
  const set = (id, on) => { const b = $(id); b.textContent = on ? T('on') : T('off'); b.classList.toggle('on', on); };
  set('tSound', !muted); set('tFx', !fx); set('tNotif', notifEnabled());
  $('tLang').textContent = T('langName');
  document.querySelectorAll('.app-only').forEach(el => el.classList.toggle('hidden', !isApp));
}
onBtn('bSettings', () => { if (overlayOpen()) return; syncSettings(); show('settingsBox'); });
onBtn('bSetClose', () => hide('settingsBox'));
onBtn('tSound', () => { setMuted(!muted); syncSettings(); });
onBtn('tFx', () => { fx = !fx; store.set('fx', fx); syncSettings(); });
onBtn('tLang', () => { lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]; store.set('lang', lang); applyLang(); refreshMenu(); syncSettings(); });
onBtn('tNotif', () => { if (notifEnabled()) { store.set('notif', 'off'); clearNotifs(); syncSettings(); } else askNotif(); });
onBtn('tPrivacy', () => { try { ADS() && ADS().privacy(); } catch(e){} });
onBtn('bRate', () => { try { NAT().openStore(); } catch(e){} });
onBtn('bExitNo', () => hide('exitBox'));
onBtn('bExitYes', () => { try { NAT().exit(); } catch(e){} });

// ================= Avisos (notificações locais, só no app) =================
function notifEnabled(){ try { return isApp && store.get('notif', '') === 'on' && NAT().notifAllowed(); } catch(e){ return false; } }
function askNotif(){ try { NAT().notifAsk(); } catch(e){} }
window.appNotifPermission = ok => {
  if (ok) { store.set('notif', 'on'); domToast(T('on')); }
  else store.set('notif', 'off');
  hide('invite'); syncSettings();
};
// Convite do próprio jogo, num momento calmo do menu, depois de 3 partidas; no máximo 3 vezes, 3 dias entre elas
function maybeInvite(){
  if (!isApp || BOT) return false;
  const st = store.get('notif', ''); if (st === 'on') return false;
  const asks = store.get('notifAsks', 0), lastAsk = store.get('notifAskAt', 0);
  if (store.get('opens', 0) < 2 || store.get('runs', 0) < 3 || asks >= 3 || Date.now() - lastAsk < 3 * 86400e3) return false;
  store.set('notifAsks', asks + 1); store.set('notifAskAt', Date.now());
  show('invite'); return true;
}
onBtn('bInvYes', () => { hide('invite'); askNotif(); });
onBtn('bInvNo', () => hide('invite'));
function clearNotifs(){ try { NAT().clear(); } catch(e){} }
// hora típica do jogador = mediana das últimas aberturas
function usualHour(){ const hs = store.get('hours', []); if (!hs.length) return 18; const s = [...hs].sort((a,b) => a-b); return s[Math.floor(s.length/2)]; }
function atLocal(base, days, h, m){ const d = new Date(base); d.setDate(d.getDate() + days); d.setHours(h, m, 0, 0); return d.getTime(); }
function quiet(at){ const d = new Date(at), h = d.getHours(); if (h >= 22 || (h === 21 && d.getMinutes() >= 45)) { d.setDate(d.getDate()+1); d.setHours(9, 10, 0, 0); } else if (h < 8) d.setHours(9, 10, 0, 0); return d.getTime(); }
// Plano: presente pronto + volta em 1/3/7/14/30 dias com texto ligado ao estado real; para depois disso
function buildPlan(now){
  const plan = [], hr = Math.min(21, Math.max(9, usualHour()));
  const gAt = store.get('giftAt', 0);
  if (gAt > now + 30*60e3) plan.push({ at: quiet(gAt + 5*60e3), kind: 'gift', title: T('nGiftT'), body: T('nGiftB'), go: 'gift' });
  const mi = medalOf(best), next = MEDALS[mi + 1];
  const msgs = [
    best >= 3 ? [T('nRecordT', { n: best }), T('nRecordB'), 'play'] : [T('nBackT'), T('nBackB'), 'play'],
    [T('nDailyT'), T('nDailyB'), 'daily'],
    next ? [T('nMedalT', { n: next[0] - best, m: T('m'+(mi+1)) }), T('nMedalB'), 'play'] : [T('nBackT'), T('nBackB'), 'play'],
    [T('nDailyT'), T('nDailyB'), 'daily'],
    [T('nBackT'), T('nBackB'), 'play'],
  ];
  [1,3,7,14,30].forEach((d, i) => { const [title, body, go] = msgs[i]; plan.push({ at: quiet(atLocal(now, d, hr, 5 + i*7)), kind: 'back'+d, title, body, go }); });
  // teto: 2 por dia, 3 h entre eles
  plan.sort((a,b) => a.at - b.at);
  const out = [];
  for (const p of plan){
    const day = new Date(p.at).toDateString(), same = out.filter(o => new Date(o.at).toDateString() === day);
    if (same.length >= 2 || same.some(o => Math.abs(o.at - p.at) < 3*3600e3)) continue;
    out.push(p);
  }
  return out.filter(p => p.at > now + 120e3).map((p, i) => ({ id: i + 1, at: p.at, kind: p.kind, title: p.title, body: p.body, go: p.go }));
}
function scheduleNotifs(){ if (!notifEnabled()) return; try { NAT().schedule(JSON.stringify(buildPlan(Date.now()))); } catch(e){} }

// ================= Pedido de avaliação (só no app) =================
// Momento positivo deixa PENDENTE; o pedido sai num momento calmo (menu, compra de gotinha).
// Nunca na 1ª sessão, nunca colado em anúncio (60 s) ou derrota (30 s), 1 a cada 7 dias, no máximo 4. Sem perguntar antes.
function reviewPending(why){ if (isApp) store.set('rvPend', why); }
function playTime(dt){ playTime.acc = (playTime.acc || 0) + dt; if (playTime.acc > 10) { store.set('playSec', store.get('playSec', 0) + playTime.acc); playTime.acc = 0; } }
function reviewOk(now){
  const rv = store.get('rv', { n: 0, at: 0 });
  return isApp && !!store.get('rvPend', '') && store.get('opens', 0) >= 2 && store.get('playSec', 0) >= 600 &&
    rv.n < 4 && now - rv.at >= 7*86400e3 && now - Ads.lastAdAt >= 60e3 && now - store.get('lastDeath', 0) >= 30e3 && !Ads.busy;
}
function tryReview(){
  const now = Date.now(); if (!reviewOk(now)) return;
  const rv = store.get('rv', { n: 0, at: 0 });
  store.set('rv', { n: rv.n + 1, at: now }); store.set('rvPend', '');
  try { NAT().review(); } catch(e){}
}

// ================= Ciclo de vida do app =================
window.appPause = () => { if (state === 'play') pausePlay(); scheduleNotifs(); if (AC) try { AC.suspend(); } catch(e){} };
window.appResume = () => { clearNotifs(); if (AC) try { AC.resume(); } catch(e){} };
function back(){
  for (const id of ['exitBox','invite','giftBox','shop','settingsBox']) if (isOpen(id)) { hide(id); return; }
  if (state === 'play') { paused ? toMenu() : pausePlay(); return; }
  if (state === 'dead') { if (!Ads.busy) toMenu(); return; }
  if (state === 'start') { if (isApp) show('exitBox'); }
}
window.appBack = back;
function deepLink(go){
  if (state === 'play') return;
  if (state !== 'start') toMenu();
  if (go === 'gift') setTimeout(openGift, 300);
  if (go === 'daily') { $('bDaily').classList.add('glow'); setTimeout(() => $('bDaily').classList.remove('glow'), 6000); }
}
window.appDeepLink = deepLink;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { if (state === 'play') pausePlay(); if (AC) try { AC.suspend(); } catch(e){} }
  else if (AC) try { AC.resume(); } catch(e){}
});

// ================= Início =================
(async () => {
  applyLang();
  store.set('opens', store.get('opens', 0) + 1);
  const hs = store.get('hours', []); hs.push(new Date().getHours()); store.set('hours', hs.slice(-20));
  if (!store.get('giftAt', 0)) store.set('giftAt', Date.now());   // 1º presente já pronto
  await Promise.all(imgList.map(loadImg));
  try { await Promise.race([document.fonts.load('800 40px ' + FONT), new Promise(r => setTimeout(r, 1500))]); } catch(e){}
  const title = $('title'), pal = ['#5DB7EA','#F78FB8','#4FD69C','#F5C842','#9B7BF5','#FF8A1F','#E8358C','#19B5A5'];
  title.setAttribute('dir', 'ltr');
  'Dropaloo'.split('').forEach((ch,i) => { const s = document.createElement('span'); s.textContent = ch; s.style.color = pal[i%pal.length]; s.style.animationDelay = (i*0.09)+'s'; title.appendChild(s); });
  reset(false); hide('load'); show('start'); state = 'start'; refreshMenu(); syncHud(); clearNotifs();
  requestAnimationFrame(frame);
  let go = ''; try { go = isApp ? NAT().takeDeepLink() : ''; } catch(e){}
  if (go) deepLink(go); else setTimeout(menuCalm, 1200);
})();
})();
