// Sons sintetizados na hora (WebAudio): nenhum arquivo de áudio no APK por enquanto.
// Som.toca(nome, n) — n é um número opcional (ex.: o combo, para a nota subir).
(function (raiz) {
  'use strict';
  let ctx = null, mestre = null, volEfeitos = 1;
  // app em segundo plano: nenhum efeito toca (um timer de fim de fase tocava a vitória com o app
  // fechado, porque tocar um som religa o áudio suspenso)
  let noFundo = false;
  const Som = { ligado: true };
  // volume dos efeitos (0..1), escolhido em Configurações; 0 = sem efeitos
  Som.volume = function (v) {
    volEfeitos = v > 1 ? 1 : v > 0 ? v : 0;
    Som.ligado = volEfeitos > 0;
    if (mestre) mestre.gain.value = 0.55 * volEfeitos;
    if (!Som.ligado) Som.silencia();
  };

  function abre() {
    if (ctx) { if (ctx.state === 'suspended' && !noFundo) ctx.resume().catch(() => {}); return ctx; }
    const AC = raiz.AudioContext || raiz.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    mestre = ctx.createGain(); mestre.gain.value = 0.55 * volEfeitos;
    const comp = ctx.createDynamicsCompressor();
    mestre.connect(comp); comp.connect(ctx.destination);
    return ctx;
  }
  Som.destrava = function () { abre(); };
  Som.pausa = function () { if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {}); };
  Som.volta = function () { if (ctx && ctx.state === 'suspended' && !noFundo) ctx.resume().catch(() => {}); };
  Som.fundo = function (sim) { noFundo = !!sim; if (noFundo) Som.pausa(); };

  // tom com envelope curto
  function tom(tipo, f0, f1, dur, vol, atraso) {
    const t = ctx.currentTime + (atraso || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = tipo; o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(mestre);
    o.start(t); o.stop(t + dur + 0.02);
  }
  // ruído filtrado (sopro, explosão)
  let ruidoBuf = null;
  function ruido(dur, fa, fb, q, vol, tipo, atraso) {
    const t = ctx.currentTime + (atraso || 0);
    if (!ruidoBuf) { ruidoBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = ruidoBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const s = ctx.createBufferSource(); s.buffer = ruidoBuf;
    const f = ctx.createBiquadFilter(); f.type = tipo || 'bandpass'; f.Q.value = q;
    f.frequency.setValueAtTime(fa, t); f.frequency.exponentialRampToValueAtTime(fb, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(mestre);
    s.start(t); s.stop(t + dur + 0.02);
  }
  // escala pentatônica: combos sobem de nota sem nunca desafinar
  const PENTA = [0, 2, 4, 7, 9];
  const nota = k => 523.25 * Math.pow(2, (PENTA[k % 5] + 12 * Math.floor(k / 5)) / 12);

  const SONS = {
    sai(n) { ruido(0.2, 900, 3200, 1.2, 0.35); tom('triangle', nota(Math.min(n || 0, 14)), 0, 0.16, 0.22); },
    bate() { tom('sine', 140, 70, 0.14, 0.5); tom('square', 90, 80, 0.07, 0.12); },
    pedra() { tom('sine', 220, 180, 0.06, 0.2); },
    combo(n) { tom('triangle', nota(n + 4), 0, 0.12, 0.2); tom('sine', nota(n + 6), 0, 0.14, 0.12, 0.05); },
    bonus() { tom('sine', 1175, 1568, 0.18, 0.22); tom('sine', 1568, 0, 0.12, 0.12, 0.09); },
    fever() { tom('sawtooth', 220, 1320, 0.55, 0.14); [0, 4, 7, 12].forEach((k, i) => tom('triangle', 523.25 * Math.pow(2, k / 12), 0, 0.5, 0.12, 0.12 + i * 0.06)); },
    gelo() { for (let i = 0; i < 6; i++) tom('sine', 1800 + i * 330, 1500 + i * 300, 0.4, 0.05, i * 0.04); ruido(0.45, 5000, 9000, 2, 0.08, 'highpass'); },
    explode() { ruido(0.6, 2200, 120, 0.7, 0.9, 'lowpass'); tom('sine', 110, 40, 0.5, 0.8); },
    raio() { ruido(0.25, 4000, 900, 3, 0.35); tom('square', 880, 440, 0.2, 0.06); },
    desfaz() { tom('triangle', 660, 990, 0.14, 0.2); },
    tique(n) { tom('square', n ? 1400 : 1000, 0, 0.025, 0.09); },
    vitoria() { [0, 4, 7, 12, 16].forEach((k, i) => tom('triangle', 523.25 * Math.pow(2, k / 12), 0, 0.28, 0.2, i * 0.08)); },
    estrela(n) { tom('sine', 880 * Math.pow(2, (n || 0) * 4 / 12), 0, 0.3, 0.22); },
    derrota() { [7, 4, 0].forEach((k, i) => tom('triangle', 392 * Math.pow(2, k / 12), 0, 0.3, 0.2, i * 0.16)); },
    botao() { tom('sine', 660, 520, 0.05, 0.16); },
    moeda() { tom('square', 1319, 0, 0.06, 0.07); tom('square', 1760, 0, 0.12, 0.07, 0.06); },
    // v0.2
    bip(seg) { const f = 1500 + (6 - Math.min(5, seg || 5)) * 220; tom('square', f, 0, 0.07, 0.14); tom('sine', f * 2, 0, 0.05, 0.06, 0.02); },
    boom() { ruido(1.3, 1800, 60, 0.6, 1.0, 'lowpass'); tom('sine', 90, 30, 1.1, 1.0); tom('sawtooth', 60, 25, 0.8, 0.25); ruido(0.4, 5000, 1500, 1.5, 0.35, 'bandpass', 0.05); },
    vidro() { for (let i = 0; i < 5; i++) tom('sine', 2600 + Math.random() * 2400, 0, 0.12 + Math.random() * 0.1, 0.07, i * 0.025); ruido(0.18, 7000, 3000, 2, 0.25, 'highpass'); },
    apaga() { ruido(0.7, 6000, 1500, 0.8, 0.35, 'highpass'); },
    estalo() { ruido(0.05, 2500 + Math.random() * 2000, 1200, 3, 0.18 + Math.random() * 0.12); },
    entra() { tom('triangle', 392, 784, 0.12, 0.12); },
    energia() { tom('triangle', 660, 1320, 0.22, 0.18); tom('sine', 990, 1980, 0.25, 0.1, 0.08); },
    // v0.3: o chefe junta força para o próximo ataque (um rosnado que sobe)
    carrega() { tom('sawtooth', 70, 150, 0.55, 0.12); ruido(0.55, 250, 1100, 1.2, 0.2, 'bandpass'); tom('sine', 55, 90, 0.5, 0.25); },
  };

  // ---------- sons contínuos (fogo do combo, pavio da bomba) ----------
  // Um ruído em laço, passando por um filtro, com o volume controlado por nível.
  const lacos = {};
  function laco(nome, filtroTipo, freq, q) {
    if (lacos[nome] || !abre()) return lacos[nome];
    if (!ruidoBuf) { ruidoBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = ruidoBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const s = ctx.createBufferSource(); s.buffer = ruidoBuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = filtroTipo; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.value = 0;
    s.connect(f); f.connect(g); g.connect(mestre); s.start();
    lacos[nome] = { s, f, g };
    return lacos[nome];
  }
  function volumeLaco(nome, v, tipo, freq, q) {
    if (!Som.ligado && v > 0) v = 0;
    if (!lacos[nome] && v <= 0) return;
    const l = laco(nome, tipo, freq, q); if (!l) return;
    l.g.gain.setTargetAtTime(v, ctx.currentTime, 0.08);
  }
  // fogo: 0 apagado, 1-3 cada vez mais forte
  Som.fogo = function (nivel) { volumeLaco('fogo', [0, 0.05, 0.1, 0.17][nivel] || 0, 'bandpass', 900, 0.6); };
  Som.pavio = function (on) { volumeLaco('pavio', on ? 0.16 : 0, 'bandpass', 4200, 1.4); };
  Som.silencia = function () { Som.fogo(0); Som.pavio(false); };
  Som.toca = function (nome, n) {
    if (!Som.ligado || noFundo || !SONS[nome]) return;
    if (!abre()) return;
    try { SONS[nome](n); } catch (e) { /* aparelho sem áudio: segue */ }
  };
  raiz.Som = Som;
})(this);
