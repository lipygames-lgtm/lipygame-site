'use strict';
// ADAPTADOR "LIPY" DO LEGIONTIDE — a versão que roda no próprio site (lipygame.com/hub/jogar/legiontide/).
// Troca o portal.js do build web do jogo (tools/arcade/montar.mjs). Mesmas tomadas de window.LT_PORTAL,
// sem SDK de terceiro: save no aparelho, idioma vindo da página do Hub (?lang=), e anúncio pela ponte
// window.LIPY_ANUNCIO quando o site ligar uma rede de anúncios. Sem a ponte, o jogo roda sem anúncio
// e os botões de vídeo premiado somem sozinhos (premiadoDisponivel = false).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  var onMute = null;
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function ponte() { var a = window.LIPY_ANUNCIO; return a && typeof a.pedir === 'function' ? a : null; }

  window.LT_PORTAL = {
    nome: 'lipy',
    init: function () { return Promise.resolve(false); },
    ativo: function () { return false; },
    idioma: function () { return q.lang || ''; },
    mutadoNoPortal: function () { return false; },
    aoMudo: function (f) { onMute = f; },
    load: function (key) { return ls(key); },
    save: function (key, v) { ls(key, v); },
    premiadoDisponivel: function () { var a = ponte(); return !!(a && a.premiado && a.premiado()); },
    anuncio: function (tipo) {
      // resolve true só se o anúncio terminou (prêmio só no fim); sem ponte, nunca há anúncio
      var a = ponte();
      if (!a) return Promise.resolve(false);
      return new Promise(function (res) {
        var fim = false, done = function (x) { if (!fim) { fim = true; if (window.LT_onAd) window.LT_onAd(false); res(x); } };
        setTimeout(function () { done(false); }, 100000);
        try { a.pedir(tipo, { comecou: function () { if (window.LT_onAd) window.LT_onAd(true); }, terminou: function (ok) { done(!!ok); } }); } catch (e) { done(false); }
      });
    },
    jogando: function () {},
    fimDaCarga: function () { try { parent.postMessage({ lipy: 'carregou' }, location.origin); } catch (e) {} },
    alegria: function () {},
  };
})();
