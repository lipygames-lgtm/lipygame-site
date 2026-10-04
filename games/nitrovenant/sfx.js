'use strict';
// EFEITOS SONOROS DO DONO (os MP3 vivem em sfx-data.js, em base64).
//
// Tocam pelo WebAudio, no MESMO contexto e no mesmo volume mestre do som sintetizado do jogo: assim o
// controle de volume dos efeitos, o silêncio com o app em segundo plano e o limite de vozes valem para
// os dois. Um som gravado pode tocar várias vezes sobrepostas (o tiro sai quase em rajada), por isso
// cada disparo cria sua própria fonte — o buffer decodificado é reaproveitado.
//
// Regra de ouro: efeito nenhum pode derrubar o jogo. Se o MP3 faltar, se o aparelho não souber
// decodificar ou se o WebAudio recusar, o jogo cai sozinho no som sintetizado de antes.
(function (root) {
  const TETO = 16;          // vozes simultâneas de gravação; acima disso ninguém ouve diferença
  const SFX = {
    ctx: null, saida: null, bufs: Object.create(null), loops: Object.create(null),
    vivos: new Set(), pronto: false,

    // Chamado depois que o AudioContext existe (o navegador só o libera no primeiro toque).
    init(ctx, saida) {
      if (this.ctx || !ctx || !root.SFX_DATA) return;
      this.ctx = ctx; this.saida = saida || ctx.destination;
      for (const nome of Object.keys(root.SFX_DATA)) this.decodifica(nome, root.SFX_DATA[nome]);
      // O base64 já virou som: 322 KB de texto que não servem mais para nada e ficariam presos na
      // memória do aparelho junto com os modelos 3D.
      root.SFX_DATA = null;
    },
    decodifica(nome, b64) {
      let bytes;
      try {
        const bin = atob(b64); bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      } catch (e) { return; }
      try {
        // Safari/WebView antigos só têm a versão com callback; a versão com promessa cobre o resto.
        const ok = (buf) => { this.bufs[nome] = buf; this.pronto = true; };
        const p = this.ctx.decodeAudioData(bytes.buffer, ok, () => {});
        if (p && p.then) p.then(ok).catch(() => {});
      } catch (e) {}
    },
    tem(nome) { return !!this.bufs[nome]; },

    // Um disparo. `vol` é o peso do som na mistura; `tom` desafina de propósito (o mesmo tiro
    // repetido no mesmo tom vira metralhadora de brinquedo).
    toca(nome, vol, tom) {
      const b = this.bufs[nome]; if (!b || !this.ctx || this.vivos.size >= TETO) return null;
      try {
        const f = this.ctx.createBufferSource(), g = this.ctx.createGain();
        f.buffer = b; f.playbackRate.value = tom || 1;
        g.gain.value = vol == null ? 1 : vol;
        f.connect(g); g.connect(this.saida);
        this.vivos.add(f);
        f.onended = () => { this.vivos.delete(f); try { f.disconnect(); g.disconnect(); } catch (e) {} };
        f.start();
        return f;
      } catch (e) { return null; }
    },

    // Som contínuo (nitro segurado, murmúrio da horda). `vol` 0 PARA de verdade — ver paraLaco.
    laco(nome, vol) {
      const b = this.bufs[nome]; if (!b || !this.ctx) return;
      if (!(vol > 0)) { this.paraLaco(nome); return; }
      let L = this.loops[nome];
      if (!L) {
        try {
          const f = this.ctx.createBufferSource(), g = this.ctx.createGain();
          f.buffer = b; f.loop = true; g.gain.value = 0;
          f.connect(g); g.connect(this.saida); f.start();
          L = this.loops[nome] = {fonte: f, ganho: g};
        } catch (e) { return; }
      }
      // Sobe rápido e desce devagar: o nitro tem ataque seco, e uma subida lenta o deixa abafado.
      try { L.ganho.gain.setTargetAtTime(vol, this.ctx.currentTime, .03); } catch (e) {}
    },
    // Para de verdade: abaixa e, passada a descida, encerra a fonte. Deixar o laço rodando com ganho
    // zero mantinha o áudio do Android aberto para sempre — com o jogo fechado, comendo bateria. E o
    // nitro, que nunca reiniciava, passava a tocar do MEIO da gravação a cada novo acionamento.
    paraLaco(nome) {
      const L = this.loops[nome]; if (!L) return;
      delete this.loops[nome];
      try { L.ganho.gain.setTargetAtTime(0, this.ctx.currentTime, .06); } catch (e) {}
      setTimeout(() => { try { L.fonte.stop(); L.fonte.disconnect(); L.ganho.disconnect(); } catch (e) {} }, 320);
    },
    calaLacos() { for (const n of Object.keys(this.loops)) this.paraLaco(n); },
    // Silêncio imediato, inclusive o que já estava no ar: usado ao sair do app e antes de um anúncio,
    // senão a pancada do chefe (1,2 s) continua tocando por cima.
    calaTudo() {
      for (const f of this.vivos) { try { f.stop(); } catch (e) {} }
      this.vivos.clear();
      this.calaLacos();
    },
  };
  root.SFX = SFX;
})(typeof window !== 'undefined' ? window : globalThis);
