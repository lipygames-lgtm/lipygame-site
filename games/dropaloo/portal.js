'use strict';
// ADAPTADOR "LIPY" DO DROPALOO — a versão que roda no próprio site (Jogos grátis do Lipy Hub).
// O Dropaloo é HTML/canvas puro e, fora do app Android, roda sem as pontes DropalooAds/DropalooNative
// (sem anúncio). Este arquivo só faz duas coisas, sem mexer no código do jogo:
//   - idioma: o jogo usa navigator.language; aqui vale o da página do Hub (?lang=);
//   - avisos para a página (mesma origem): carregou, fase (começou uma partida), perdeu.
// O game.js roda dentro de uma função fechada (o `state` dele não é visível daqui): o estado sai das
// camadas da tela, lidas a cada 200 ms — #load (carregando), #start (menu), #over (fim); nenhuma = jogando.
// Carregado ANTES dos scripts do jogo (tools/arcade/montar.mjs injeta).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  var antes = null, carregou = false, partidas = 0, t0 = Date.now();
  function visivel(id) { var el = document.getElementById(id); return !!el && !el.classList.contains('hidden'); }
  function estado() {
    if (!document.getElementById('load')) return null;
    if (visivel('load')) return 'load';
    if (visivel('over')) return 'dead';
    if (visivel('start')) return 'start';
    return 'play';
  }
  function olha() {
    var s = null;
    try { s = estado(); } catch (e) { s = null; }
    if (s && s !== antes) {
      if (!carregou && s !== 'load') { carregou = true; avisa({ lipy: 'carregou' }); }
      if (s === 'play' && antes !== 'play') { partidas++; avisa({ lipy: 'fase', n: partidas }); }
      if (s === 'dead' && antes === 'play') avisa({ lipy: 'perdeu', n: partidas });
      antes = s;
    }
    if (carregou || Date.now() - t0 < 120000) setTimeout(olha, 200);
  }
  setTimeout(olha, 200);
})();
