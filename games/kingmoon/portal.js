'use strict';
// ADAPTADOR "LIPY" DO KINGMOON: a versão que roda no próprio site (Jogos grátis do Lipy Hub).
// O jogo (build sem --alvo) já usa o adaptador local dele: sem anúncio (o premiado responde "indisponível"), save em
// localStorage, Guerra Galáctica em modo solo (src/game/warConfig.js live:false: nada de rede). Este arquivo faz só:
//   - idioma: o jogo lê navigator.language; aqui vale o da página do Hub (?lang=);
//   - avisos para a página (mesma origem): carregou (saiu a tela de carga, apareceu o título/menu), fase (começou uma
//     missão: o HUD de jogo apareceu), venceu / perdeu (tela de resultado). Lidos do DOM real, a cada 250 ms.
// Carregado ANTES do módulo do jogo (tools/arcade/montar.mjs injeta).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  // carregou = saiu a tela de carga e apareceu o título (ou, na recarga rápida entre missões, o HUD);
  // fase = o HUD de voo ficou visível (começou uma missão); venceu / perdeu = a tela de resultado apareceu.
  var carregou = false, noHud = false, rodadas = 0, noResultado = false, t0 = Date.now();
  function olha() {
    var ui = document.getElementById('ui');
    if (ui) {
      var hud = ui.querySelector('.hud.on'), res = ui.querySelector('.screen.km-result');
      if (!carregou && !ui.querySelector('.screen.loading') && (ui.querySelector('.km-title') || hud || res)) { carregou = true; avisa({ lipy: 'carregou' }); }
      if (carregou) {
        if (hud && !noHud) { rodadas++; avisa({ lipy: 'fase', n: rodadas }); }
        noHud = !!hud;
        if (res && !noResultado) avisa({ lipy: res.classList.contains('win') ? 'venceu' : 'perdeu', n: rodadas });
        noResultado = !!res;
      }
    }
    if (carregou || Date.now() - t0 < 180000) setTimeout(olha, 250);
  }
  setTimeout(olha, 250);
})();
