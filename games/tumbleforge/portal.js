'use strict';
// ADAPTADOR "LIPY" DO TUMBLEFORGE — a versão que roda no próprio site (lipygame.com/hub/jogar/tumbleforge/).
// Jogo web da Lipy (lipy-web-games/tumbleforge/dist), só pt/en; sem SDK de portal.
// Este adaptador só garante o idioma do navegador igual ao da página.
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  // avisa a página do Hub (contagem de "carregou" / primeiro toque); mesma origem
  function avisa(o) { try { if (parent !== window) parent.postMessage(o, location.origin); } catch (e) {} }
  addEventListener('load', function () { avisa({ lipy: 'carregou' }); });
  var tocou = false;
  addEventListener('pointerdown', function () { if (!tocou) { tocou = true; avisa({ lipy: 'fase', n: 1 }); } }, true);
})();
