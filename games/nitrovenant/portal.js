'use strict';
// ADAPTADOR "LIPY" DO NITROVENANT — a versão que roda no próprio site (lipygame.com/hub/jogar/nitrovenant/).
// Troca o portal.js do build web (tools/arcade/montar.mjs). Tomadas de window.NV_PORTAL (lista no topo do
// web/web.js do Nitrovenant). Sem SDK de terceiro: o save fica no aparelho (localStorage, padrão do web.js),
// o idioma vem da página do Hub (?lang=) e o anúncio passa pela ponte window.LIPY_ANUNCIO quando o site
// ligar uma rede de anúncios. Sem a ponte: jogo sem anúncio e botões de vídeo premiado escondidos.
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  function ponte() { var a = window.LIPY_ANUNCIO; return a && typeof a.pedir === 'function' ? a : null; }

  window.NV_PORTAL = {
    nome: 'lipy',
    iniciar: function () { return null; },
    idioma: function () { return q.lang || ''; },
    aparelho: function () { return ''; },
    semAnuncio: function () { return ponte() ? '' : 'noSdk'; },
    premiado: function () { var a = ponte(); return a && a.premiado && a.premiado() ? 'ok' : 'off'; },
    anuncio: function (tipo, cb) {
      var a = ponte();
      if (!a) { cb.erro('noSdk', 'sem rede de anúncios', true); return; }
      try { a.pedir(tipo, { comecou: cb.comecou, terminou: function (ok) { cb.terminou(!!ok); } }); } catch (e) { cb.erro('ponte', String(e), true); }
    },
    anuncioRodando: function () { return false; },
    fimDaCarga: function () { try { parent.postMessage({ lipy: 'carregou' }, location.origin); } catch (e) {} },
    mudoSemFoco: false,
  };
})();
