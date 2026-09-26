/* ==========================================================================
   LIPY GAMES — comportamento comum das páginas de jogo
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  if (!L || !window.gsap) return;
  var $ = L.$, $$ = L.$$, RM = L.RM, TOUCH = L.TOUCH;

  /* ---------------- entrada do herói ---------------- */
  var intro = null;
  if (!RM && $('.gh')) {
    var palavras = [];
    $$('.gh__title .l').forEach(function (l) { palavras = palavras.concat(SplitText.create(l, L.opSplit({ type: 'words', aria: 'none' })).words); });
    palavras.forEach(function (w) { var em = w.closest('em'); if (em && em.className) { w.className += ' ' + em.className; em.className = ''; } });
    intro = gsap.timeline({ paused: true });
    intro
      .from('.gh__bg img, .gh__bg video', { scale: 1.3, duration: 2.6, ease: 'lipySoft' }, 0)
      .from('.gh__crumb', { y: 20, opacity: 0, duration: 0.9 }, 0.2)
      .from('.gh__icon', { scale: 0.3, rotate: -20, opacity: 0, duration: 1.2, ease: 'back.out(1.8)' }, 0.25)
      .from('.gh__logo', { y: 30, scale: 0.85, opacity: 0, duration: 1.2, ease: 'back.out(1.5)' }, 0.35)
      .from(palavras, { yPercent: 120, rotate: 5, transformOrigin: '0 100%', duration: 1.3, stagger: 0.05 }, 0.4)
      .from('.gh__lead, .gh__meta, .gh__ctas', { y: 30, opacity: 0, duration: 1.1, stagger: 0.1, clearProps: 'opacity,transform' }, 0.75)
      .from('.gh__phone', { yPercent: 40, rotate: 16, opacity: 0, duration: 1.6, clearProps: 'opacity' }, 0.3)
      .from('.gh__visual .fl', { scale: 0.2, opacity: 0, duration: 1.2, stagger: 0.07, ease: 'back.out(1.8)', clearProps: 'opacity' }, 0.7)
      .from('.gh__foot', { opacity: 0, duration: 1 }, 1.1);
  }
  L.onReady(function () { if (intro) intro.play(); });

  // objetos do herói seguem o mouse em profundidades diferentes
  if (!TOUCH && !RM) {
    $$('[data-float]').forEach(function (box) {
      var alvo = box.closest('section') || box;
      var fls = $$('[data-depth]', box).map(function (el) {
        return { x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3' }), d: +el.getAttribute('data-depth') };
      });
      alvo.addEventListener('pointermove', function (e) {
        var r = alvo.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        fls.forEach(function (f) { f.x(nx * 50 * f.d); f.y(ny * 40 * f.d); });
      });
      alvo.addEventListener('pointerleave', function () { fls.forEach(function (f) { f.x(0); f.y(0); }); });
    });
  }
  // vídeos só tocam quando aparecem
  $$('video[data-autoplay]').forEach(function (v) {
    ScrollTrigger.create({
      trigger: v, start: 'top bottom', end: 'bottom top',
      onToggle: function (s) { if (s.isActive) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }
    });
  });

  /* ---------------- frase que acende palavra por palavra ---------------- */
  if (!RM) {
    $$('[data-scrub-words]').forEach(function (el) {
      var s = SplitText.create(el, L.opSplit({ type: 'words', aria: 'none' }));
      s.words.forEach(function (w) { var em = w.closest('em'); if (em) w.classList.add('txt-game'); });
      gsap.fromTo(s.words, { opacity: 0.13 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 } });
    });
  }

  /* ---------------- como se joga: o celular acompanha a etapa ---------------- */
  $$('[data-gp]').forEach(function (sec) {
    var steps = $$('.gp__step', sec), telas = $$('.gp__phone [data-step]', sec), dots = $$('.gp__dots i', sec);
    var atual = -1;
    var ativa = function (i) {
      if (i === atual) return;
      atual = i;
      telas.forEach(function (t) {
        var on = +t.getAttribute('data-step') === i;
        t.classList.toggle('is-on', on);
        if (t.tagName === 'VIDEO') { if (on) { var p = t.play(); if (p && p.catch) p.catch(function () {}); } else t.pause(); }
      });
      dots.forEach(function (d, j) { d.classList.toggle('is-on', j === i); });
    };
    ativa(0);
    steps.forEach(function (st, i) {
      ScrollTrigger.create({ trigger: st, start: 'top 55%', end: 'bottom 55%', onToggle: function (s) { if (s.isActive) ativa(i); } });
      if (!RM) gsap.from($$('.gp__n, h3, p, .gp__gesture', st), { y: 40, opacity: 0, duration: 1.1, stagger: 0.08, scrollTrigger: { trigger: st, start: 'top 75%', once: true } });
    });
  });

  /* ---------------- abas (com a gota de vidro que escorre) ---------------- */
  L.abas = function (box, aoTrocar) {
    var bts = $$('[role="tab"]', box), blob = $('.tabs__blob', box), atual = 0;
    // abas de FILTRO apontam todas para a mesma lista: aí nenhuma esconde o painel
    var paineisProprios = new Set(bts.map(function (b) { return b.getAttribute('aria-controls'); })).size === bts.length;
    var move = function (bt, instant) {
      if (!blob || !bt) return;
      var alvo = { x: bt.offsetLeft, y: bt.offsetTop - 5, width: bt.offsetWidth };
      if (instant || RM) gsap.set(blob, alvo);
      else {
        gsap.to(blob, Object.assign({ duration: 0.75, ease: 'elastic.out(1, 0.75)' }, alvo));
        gsap.fromTo(blob, { scaleY: 1 }, { scaleY: 0.8, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' });
      }
    };
    var escolhe = function (i, foco, inicio) {
      i = (i + bts.length) % bts.length;
      atual = i;
      bts.forEach(function (b, j) {
        b.setAttribute('aria-selected', j === i);
        b.tabIndex = j === i ? 0 : -1;
        var p = paineisProprios && document.getElementById(b.getAttribute('aria-controls'));
        if (p) p.hidden = j !== i;
      });
      move(bts[i]);
      if (foco) bts[i].focus();
      if (aoTrocar) aoTrocar(i, bts[i], !!inicio);
    };
    bts.forEach(function (b, i) {
      b.addEventListener('click', function () { escolhe(i); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); escolhe(atual + 1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); escolhe(atual - 1, true); }
      });
    });
    var inicial = Math.max(0, bts.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; }));
    escolhe(inicial, false, true);
    var reposiciona = function () { move(bts[atual], true); };
    if (document.fonts) document.fonts.ready.then(reposiciona);
    window.addEventListener('resize', reposiciona);
    return { escolhe: escolhe, atual: function () { return atual; } };
  };

  /* ---------------- galeria de telas ---------------- */
  $$('[data-gg]').forEach(function (sec) {
    var track = $('.gg__track', sec), itens = $$('.gg__item', sec), barra = $('.gg__progress i', sec);
    var filtros = $('[data-filtros]', sec);
    var progresso = function () {
      var max = track.scrollWidth - track.clientWidth;
      if (barra) barra.style.transform = 'scaleX(' + (max > 0 ? track.scrollLeft / max : 1).toFixed(3) + ')';
    };
    track.addEventListener('scroll', progresso, { passive: true });
    progresso();
    if (filtros) {
      L.abas(filtros, function (i, bt, inicio) {
        var cat = bt.getAttribute('data-cat');
        var vis = itens.filter(function (it) { var ok = cat === 'todas' || it.getAttribute('data-cat') === cat; it.hidden = !ok; return ok; });
        if (inicio) return;
        track.scrollTo({ left: 0 });
        if (!RM) gsap.fromTo(vis, { y: 50, opacity: 0, rotate: 3 }, { y: 0, opacity: 1, rotate: 0, duration: 0.8, stagger: 0.05, clearProps: 'transform,opacity' });
        progresso();
      });
    }
    $$('[data-gg-dir]', sec).forEach(function (b) {
      b.addEventListener('click', function () {
        var it = itens.find(function (x) { return !x.hidden; });
        var passo = it ? it.offsetWidth + 20 : 300;
        track.scrollBy({ left: passo * +b.getAttribute('data-gg-dir') * 2, behavior: RM ? 'auto' : 'smooth' });
      });
    });
    // arrastar com o mouse (no toque a rolagem já é nativa)
    if (!TOUCH) {
      var x0 = 0, s0 = 0, arrastando = false, moveu = false;
      track.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.button !== 0) return; arrastando = true; moveu = false; x0 = e.clientX; s0 = track.scrollLeft; });
      window.addEventListener('pointermove', function (e) {
        if (!arrastando) return;
        var dx = e.clientX - x0;
        if (!moveu && Math.abs(dx) > 6) { moveu = true; track.classList.add('is-drag'); }
        if (moveu) track.scrollLeft = s0 - dx;
      });
      window.addEventListener('pointerup', function () {
        if (!arrastando) return;
        arrastando = false;
        setTimeout(function () { track.classList.remove('is-drag'); }, 0);
      });
      track.addEventListener('click', function (e) { if (moveu) { e.preventDefault(); e.stopPropagation(); moveu = false; } }, true);
      // a roda do mouse na vertical também anda na galeria quando o mouse está sobre ela? não: deixa a página rolar.
    }
    if (!RM) {
      gsap.from(itens.slice(0, 6), { x: 120, opacity: 0, rotate: 4, duration: 1.2, stagger: 0.07, clearProps: 'transform,opacity', scrollTrigger: { trigger: track, start: 'top 80%', once: true } });
    }
  });

  /* ---------------- próximo universo ---------------- */
  if (!RM) {
    $$('.gn').forEach(function (gn) {
      gsap.from($$('.gn__k, .gn__name, .gn__go', gn), { y: 60, opacity: 0, stagger: 0.1, duration: 1.2, scrollTrigger: { trigger: gn, start: 'top 70%', once: true } });
    });
  }
})();
