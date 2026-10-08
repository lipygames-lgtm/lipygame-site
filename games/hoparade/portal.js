'use strict';
// ADAPTADOR "LIPY" DO HOPARADE — a versão que roda no próprio site (lipygame.com/hub/free-games/hoparade/).
// O build web do jogo (CRAZYGAMES/build) escolhe o provedor de anúncios por window.HOPARADE_PORTAL; o montar.mjs
// troca 'crazygames' por 'unity', cujo contrato é a ponte window.UnityAdsBridge. Aqui essa ponte vira a ponte
// window.LIPY_ANUNCIO do site: sem rede de anúncios ligada, a ponte nem existe e o jogo esconde os botões de vídeo
// (premiado indisponível), igual aos outros jogos do Hub. Save: localStorage (padrão do jogo). Idioma: ?lang= da página.
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  function ponte() { var a = window.LIPY_ANUNCIO; return a && typeof a.pedir === 'function' ? a : null; }

  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }

  var jogo = {
    show: function (tipo, lugar) {
      return new Promise(function (ok) {
        var a = ponte();
        if (!a) { ok(false); return; }
        try { a.pedir(tipo, { comecou: function () {}, terminou: function (bom) { ok(!!bom); } }); } catch (e) { ok(false); }
      });
    },
    banner: function () {},
  };
  // só existe quando há rede de anúncios: o jogo usa "existe a ponte?" como "há anúncio?"
  try { Object.defineProperty(window, 'UnityAdsBridge', { configurable: true, get: function () { return ponte() ? jogo : undefined; } }); } catch (e) {}

  // o jogo marca window.__ready quando a cena está montada (fim da carga)
  var t0 = Date.now(), avisou = false;
  (function olha() {
    if (window.__ready) { avisou = true; avisa({ lipy: 'carregou' }); comecou(); return; }
    if (Date.now() - t0 < 90000) setTimeout(olha, 100);
  })();
  // "fase" = a pessoa tocou/apertou algo depois que o jogo carregou (corrida infinita: não há fase para contar)
  function comecou() {
    var f = false;
    function vai() { if (f) return; f = true; avisa({ lipy: 'fase', n: 1 }); removeEventListener('pointerdown', vai, true); removeEventListener('keydown', vai, true); }
    addEventListener('pointerdown', vai, true); addEventListener('keydown', vai, true);
  }
})();
