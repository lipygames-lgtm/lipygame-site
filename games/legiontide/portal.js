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
  // avisos para a página do Hub (mesma origem): carregou, fase (começou), venceu (n = fase vencida)
  function avisa(o) { try { o.lipy = o.lipy || 'evento'; parent.postMessage(o, location.origin); } catch (e) {} }
  var faseSalva = null;
  function ponte() { var a = window.LIPY_ANUNCIO; return a && typeof a.pedir === 'function' ? a : null; }

  window.LT_PORTAL = {
    nome: 'lipy',
    init: function () { return Promise.resolve(false); },
    ativo: function () { return false; },
    idioma: function () { return q.lang || ''; },
    mutadoNoPortal: function () { return false; },
    aoMudo: function (f) { onMute = f; },
    load: function (key) { var v = ls(key); try { faseSalva = JSON.parse(v).level; } catch (e) {} return v; },
    save: function (key, v) {
      ls(key, v);
      // o jogo grava o save a cada vitória com a fase seguinte: é assim que a página sabe que a fase foi vencida
      try { var n = JSON.parse(v).level; if (typeof n === 'number') { if (faseSalva != null && n > faseSalva) avisa({ lipy: 'venceu', n: n - 1 }); faseSalva = n; } } catch (e) {}
    },
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
    jogando: function (sim) { if (sim) avisa({ lipy: 'fase', n: faseSalva }); },
    fimDaCarga: function () { avisa({ lipy: 'carregou' }); },
    alegria: function () { avisa({ lipy: 'alegria' }); },
  };
})();
