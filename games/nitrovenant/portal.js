'use strict';
// ADAPTADOR "LIPY" DO NITROVENANT 2 — a versão que roda no próprio site (Jogos grátis do Lipy Hub, slug "nitrovenant").
// Build: no repo nitrovenant2, `node tools/build-web.mjs --out=<Downloads>/JOGOS/NITROVENANT-2/HUB/build` (sem --alvo:
// nenhum SDK de portal no index.html; fora da CrazyGames o jogo usa o adaptador local dele = sem anúncio, sem oferta de
// vídeo premiado, save em localStorage). Este arquivo só faz duas coisas:
//   - idioma: o jogo lê navigator.language; aqui vale o da página do Hub (?lang=);
//   - avisos para a página (mesma origem), lidos do DOM a cada 250 ms (o jogo é módulo ES, sem estado exposto):
//       carregou = saiu a capa de carga (.loading) e apareceu o título, a garagem ou o HUD;
//       fase     = começou uma corrida (o HUD .hud apareceu);
//       venceu / perdeu = apareceu o painel de resultado (.overlay.result.won / .lost).
// Carregado ANTES do módulo do jogo (tools/arcade/montar.mjs injeta).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  var carregou = false, naCorrida = false, noResultado = false, corridas = 0, t0 = Date.now();
  function olha() {
    var ui = document.getElementById('ui');
    if (ui) {
      var hud = !!ui.querySelector('.hud'), res = ui.querySelector('.overlay.result');
      if (!carregou && !document.querySelector('body > .loading') && (hud || ui.firstElementChild)) { carregou = true; avisa({ lipy: 'carregou' }); }
      if (carregou) {
        if (hud && !naCorrida) { corridas++; avisa({ lipy: 'fase', n: corridas }); }
        naCorrida = hud;
        if (res && !noResultado) avisa({ lipy: res.classList.contains('won') ? 'venceu' : 'perdeu', n: corridas });
        noResultado = !!res;
      }
    }
    if (carregou || Date.now() - t0 < 180000) setTimeout(olha, 250);
  }
  setTimeout(olha, 250);
})();
