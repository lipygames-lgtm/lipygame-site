'use strict';
// ADAPTADOR "LIPY" DO TRICKWINK — a versão que roda no próprio site (lipygame.com/hub/jogar/trickwink/).
// O build do jogo já sai com window.LIPY_PORTAL='lipy' (tools/build-web.mjs no repo trickwink):
// ele mesmo avisa a página (carregou, fase, venceu, alegria), lê o idioma do ?lang= e só mostra anúncio/vídeo
// premiado se existir a ponte window.LIPY_ANUNCIO. Este adaptador só garante o idioma do navegador igual ao da página.
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
})();
