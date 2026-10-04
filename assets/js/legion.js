/* ==========================================================================
   LEGIONTIDE — página do jogo
   O vídeo de partida do herói só baixa DEPOIS do load (a abertura não espera por ele) e só toca
   enquanto aparece. "Economia de dados", rede 2G/3G e movimento reduzido ficam só com a capa.
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  var vids = Array.prototype.slice.call(document.querySelectorAll('video[data-lt-video]'));
  if (!vids.length) return;
  var c = navigator.connection || {};
  var RM = L ? L.RM : matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (RM || c.saveData || /(^|-)(2g|3g)$/.test(c.effectiveType || '')) return;

  function liga() {
    vids.forEach(function (v) {
      var visivel = false;
      var toca = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
      v.src = v.getAttribute('data-lt-video');
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) { visivel = e.isIntersecting; if (visivel) toca(); else v.pause(); });
        }, { threshold: 0.15 }).observe(v);
      } else toca();
      document.addEventListener('visibilitychange', function () { if (document.hidden) v.pause(); else if (visivel) toca(); });
    });
  }
  if (document.readyState === 'complete') liga();
  else addEventListener('load', liga, { once: true });
})();
