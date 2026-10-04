'use strict';
// ADAPTADOR "LIPY" DO QUIVER — a versão que roda no próprio site (Jogos grátis do Lipy Hub).
// O Quiver é o app Android (WebView) e fala com o Android por pontes window.Lipy* (LipyApp, LipyAds,
// LipyBilling, LipyCloud...). Fora do app elas não existem e o jogo segue sozinho: compras "indisponíveis",
// sem anúncio, save no aparelho. Só uma coisa precisa vir daqui:
//   - LipyApp.teste() = false: sem a ponte o jogo se considera "APK de teste" e mostraria os atalhos de teste
//     do dono (chefes, energia, roleta). No site ninguém pode ver isso.
//   - idioma: o Quiver usa o idioma do aparelho; aqui vale o da página do Hub (?lang=).
// Carregado ANTES de todos os scripts do jogo (tools/arcade/montar.mjs injeta).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  window.LipyApp = { teste: function () { return false; } };
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  // avisos para a página do Hub (mesma origem): o jogo carregou
  addEventListener('load', function () { try { parent.postMessage({ lipy: 'carregou' }, location.origin); } catch (e) {} });
})();
