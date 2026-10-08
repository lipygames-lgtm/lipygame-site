'use strict';
// ADAPTADOR "LIPY" DO NITROVENANT — a versão que roda no próprio site (lipygame.com/hub/jogar/nitrovenant/).
// Troca o portal.js do build web (tools/arcade/montar.mjs). Tomadas de window.NV_PORTAL (lista no topo do
// web/web.js do Nitrovenant). Sem SDK de terceiro: o save fica no aparelho (localStorage, padrão do web.js),
// o idioma vem da página do Hub (?lang=) e o anúncio passa pela ponte window.LIPY_ANUNCIO quando o site
// ligar uma rede de anúncios. Sem a ponte: jogo sem anúncio e botões de vídeo premiado escondidos.
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  function fase() { try { return window.game && window.game.level; } catch (e) { return null; } }
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
    // Fila de modelos 3D (carga rápida no celular): até a garagem aparecer, só o carro baixa; inimigos, cenário e
    // armas esperam e entram aos poucos DEPOIS (ou na hora, se uma corrida pedir). Rede livre = garagem antes.
    antesDoJogo: function () {
      try {
        if (typeof CharacterLayer === 'undefined') return;
        var P = CharacterLayer.prototype, ensure = P.ensure, ready = P.ready, fila = [], segura = true;
        function solta(espaco) {
          segura = false; var n = 0, nomes = fila.splice(0), self = window.__nvChars;
          nomes.forEach(function (x) { setTimeout(function () { ensure.call(x[0], x[1]); }, espaco ? 250 * n++ : 0); });
        }
        window.__nvSolta = solta;
        P.ensure = function (name) {
          if (!segura) return ensure.call(this, name);
          var M = window.NV_MODELS, carros = (M && M.cars) ? Object.keys(M.cars).map(function (k) { return M.cars[k]; }) : [];
          if (carros.indexOf(name) >= 0) return ensure.call(this, name);
          if (!this.loading[name] && this.manifest.models[name]) fila.push([this, name]);
        };
        P.ready = function () { if (segura) solta(false); return ready.apply(this, arguments); };
        setTimeout(function () { if (segura) solta(true); }, 6000); // rede de segurança
        // Efeitos sonoros (sfx-data.js, 300 KB) saem da carga: baixam depois da garagem e entram no 1º toque.
        if (window.SFX && !window.SFX_DATA) {
          var pedido = null, init = window.SFX.init;
          window.__nvSfx = function () {
            if (pedido) return pedido;
            pedido = new Promise(function (ok) { var s = document.createElement('script'); s.src = 'sfx-data.js'; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); });
            return pedido;
          };
          window.SFX.init = function (ctx, saida) {
            var self = this;
            if (window.SFX_DATA) return init.call(self, ctx, saida);
            window.__nvSfx().then(function () { init.call(self, ctx, saida); });
          };
        }
      } catch (e) {}
    },
    fimDaCarga: function () { avisa({ lipy: 'carregou' }); try { if (window.__nvSolta) setTimeout(function () { window.__nvSolta(true); }, 400); if (window.__nvSfx) setTimeout(window.__nvSfx, 1500); } catch (e) {} },
    // eventos do motor: start = fase começou; finish = fase acabou (game.win diz se venceu)
    evento: function (nome) {
      if (nome === 'start') avisa({ lipy: 'fase', n: fase() });
      else if (nome === 'finish') avisa({ lipy: window.game && window.game.win ? 'venceu' : 'perdeu', n: fase() });
    },
    mudoSemFoco: false,
  };
})();
