'use strict';
// ADAPTADOR "LIPY" DO VILLADASH — a versão que roda no próprio site (Jogos grátis do Lipy Hub).
// Fora da CrazyGames o jogo usa o adaptador local dele (src/platform/local.js): sem anúncio (o premiado responde
// "indisponível" e o jogo segue sem reviver por vídeo), save em localStorage. Este arquivo só faz duas coisas:
//   - idioma: o jogo lê navigator.language; aqui vale o da página do Hub (?lang=);
//   - avisos para a página (mesma origem): carregou (saiu a tela de carga) e fase (começou um round: o HUD apareceu).
// O jogo é um módulo ES (não expõe estado): os avisos saem do DOM, lido a cada 250 ms.
// Carregado ANTES do módulo do jogo (tools/arcade/montar.mjs injeta).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  var carregou = false, noRound = false, rounds = 0, t0 = Date.now();
  function olha() {
    var ui = document.getElementById('ui');
    if (ui) {
      // 1ª visita vai direto para a fase 1 (sem menu): "carregou" = sumiu a tela de carga e apareceu menu ou HUD
      var tela = ui.querySelector('.screen'), hud = !!ui.querySelector('.hud');
      if (!carregou && !ui.querySelector('.vdl') && (hud || tela)) { carregou = true; avisa({ lipy: 'carregou' }); }
      if (carregou) {
        if (hud && !noRound) { rounds++; avisa({ lipy: 'fase', n: rounds }); }
        noRound = hud;
      }
    }
    if (carregou || Date.now() - t0 < 180000) setTimeout(olha, 250);
  }
  setTimeout(olha, 250);
})();
