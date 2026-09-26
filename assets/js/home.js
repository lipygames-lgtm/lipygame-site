/* ==========================================================================
   LIPY GAMES — coreografia da página inicial
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  if (!L || !window.gsap) return;
  var $ = L.$, $$ = L.$$, RM = L.RM, TOUCH = L.TOUCH;
  var mm = gsap.matchMedia();

  var stage = $('.stage'), sticky = $('.stage__sticky'), screen = $('.stage__screen'), video = $('.stage__video');
  var phone = $('.stage__phone'), apps = $$('.stage__app'), ambs = $$('.amb'), words = $$('[data-word]'), caps = $$('.cap');
  var dots = $$('.stage__dots li'), dotsBox = $('.stage__dots');
  var heroInner = $('.hero__inner'), heroFoot = $('.hero__foot'), hud = $$('.hud > li'), shade = $('.stage__shade');

  // vidro com refração nos elementos do herói
  $$('.hud__chip > span, .hero__ctas .glass').forEach(function (el) { L.Glass.apply(el, { aro: 16, escala: 36, blur: 4 }); });
  $$('.stat.glass, .fl--gauge, .contact__copy').forEach(function (el) { L.Glass.apply(el, { aro: 22, escala: 44, blur: 6 }); });

  /* ---------------- geometria do celular do palco ---------------- */
  function geo() {
    var vw = window.innerWidth, vh = sticky.clientHeight || window.innerHeight, mob = vw < 900;
    var ph = Math.min(vh * (mob ? 0.5 : 0.78), 760), pw = ph / 2.1;
    var pad = Math.max(6, pw * 0.034);
    var x = (vw - pw) / 2, y = (vh - ph) / 2 + (mob ? vh * 0.015 : 0);
    return { vw: vw, vh: vh, pw: pw, ph: ph, pad: pad, x: x, y: y, r: pw * 0.16 };
  }
  function aplicaGeo() {
    if (!sticky) return;
    var g = geo(), s = sticky.style, px = function (v) { return v.toFixed(1) + 'px'; };
    s.setProperty('--px', px(g.x)); s.setProperty('--py', px(g.y));
    s.setProperty('--pw', px(g.pw)); s.setProperty('--ph', px(g.ph));
    s.setProperty('--pr', px(g.r)); s.setProperty('--pad', px(g.pad));
    s.setProperty('--sx', px(g.x + g.pad)); s.setProperty('--sy', px(g.y + g.pad));
    s.setProperty('--sw', px(g.pw - 2 * g.pad)); s.setProperty('--sh', px(g.ph - 2 * g.pad));
    s.setProperty('--sr', px(g.r - g.pad));
  }
  function insetFinal() {
    var g = geo();
    return 'inset(' + (g.y + g.pad).toFixed(1) + 'px ' + (g.x + g.pad).toFixed(1) + 'px ' + (g.vh - g.y - g.ph + g.pad).toFixed(1) + 'px ' + (g.x + g.pad).toFixed(1) + 'px round ' + (g.r - g.pad).toFixed(1) + 'px)';
  }

  /* ---------------- entrada do herói ---------------- */
  var intro = null;
  if (!RM && heroInner) {
    var tituloPalavras = SplitText.create($('.hero__title'), L.opSplit({ type: 'words', aria: 'none' })).words;
    // o gradiente de texto não atravessa palavras animadas: cada palavra do destaque leva o próprio
    tituloPalavras.forEach(function (w) { var em = w.closest('em'); if (em) { w.classList.add('txt-warm'); em.classList.remove('txt-warm'); } });
    intro = gsap.timeline({ paused: true, defaults: { ease: 'lipy' } });
    intro
      .fromTo(video, { scale: 1.22 }, { scale: 1, duration: 2.6, ease: 'lipySoft' }, 0)
      .from($('.hero__eyebrow'), { y: 24, opacity: 0, duration: 1 }, 0.25)
      .from(tituloPalavras, { yPercent: 125, rotate: 6, transformOrigin: '0 100%', duration: 1.45, stagger: 0.075 }, 0.3)
      .from($('.hero__lead'), { y: 34, opacity: 0, duration: 1.2 }, 0.8)
      .from($$('.hero__ctas > *'), { y: 34, opacity: 0, duration: 1.1, stagger: 0.1, clearProps: 'opacity,transform' }, 0.95)
      .from($$('.hud > li > span'), { scale: 0, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'back.out(2.2)', clearProps: 'opacity,transform' }, 1.15)
      .from(heroFoot, { y: 20, opacity: 0, duration: 1 }, 1.35);
  }
  // o vídeo pode ser pausado por quem visita (e nem começa sozinho com movimento reduzido)
  var pausadoPeloUsuario = RM, btPausa = $('[data-pausa]');
  var tocaHero = function () { if (!video || pausadoPeloUsuario) return; var p = video.play(); if (p && p.catch) p.catch(function () {}); };
  var marcaPausa = function () {
    if (!btPausa) return;
    btPausa.setAttribute('aria-pressed', pausadoPeloUsuario);
    btPausa.classList.toggle('is-pausado', pausadoPeloUsuario);
    $('span', btPausa).textContent = pausadoPeloUsuario ? L.t('Tocar vídeo') : L.t('Pausar vídeo');
  };
  if (btPausa) btPausa.addEventListener('click', function () { pausadoPeloUsuario = !pausadoPeloUsuario; if (pausadoPeloUsuario) video.pause(); else tocaHero(); marcaPausa(); });
  if (RM && video) video.pause();
  marcaPausa();
  L.onReady(function () { if (intro) intro.play(); tocaHero(); });

  /* ---------------- palco: vídeo encolhe até virar a tela do celular ---------------- */
  function palco() {
    if (!stage || RM) return;
    aplicaGeo();
    window.addEventListener('resize', aplicaGeo);
    var nitroV = apps[2] && apps[2].tagName === 'VIDEO' ? apps[2] : null;
    var heroTocando = true, nitroTocando = false;

    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage, start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true,
        onRefresh: aplicaGeo,
        onUpdate: function (s) {
          var p = s.progress;
          // economiza: vídeo do herói só roda enquanto aparece; o do Nitrovenant, só na vez dele
          var querHero = p < 0.4;
          if (querHero !== heroTocando) { heroTocando = querHero; if (querHero) tocaHero(); else video.pause(); }
          var querNitro = p > 0.72;
          if (nitroV && querNitro !== nitroTocando) { nitroTocando = querNitro; if (querNitro) nitroV.play().catch(function () {}); else nitroV.pause(); }
        },
        onLeave: function () { video.pause(); if (nitroV) nitroV.pause(); heroTocando = nitroTocando = false; },
        onEnterBack: function () { heroTocando = false; }
      }
    });

    // 1) o herói sai e a tela vira um celular
    tl.to(heroInner, { yPercent: -16, opacity: 0, duration: 0.1, ease: 'power1.in' }, 0)
      .to(hud, { opacity: 0, scale: 0.5, y: -40, stagger: 0.006, duration: 0.07, ease: 'power1.in' }, 0)
      .to(heroFoot, { opacity: 0, duration: 0.04 }, 0)
      .fromTo(screen, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: insetFinal, duration: 0.19, ease: 'power2.inOut' }, 0.02)
      .to(shade, { opacity: 0.35, duration: 0.19 }, 0.02)
      .fromTo(phone, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }, 0.07)
      .fromTo(dotsBox, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.22);

    // 2) frase de abertura
    var c0 = caps[0];
    tl.set(c0, { visibility: 'visible' }, 0.19)
      .fromTo($$('.cap__big, .cap__side', c0), { y: 70, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.025, duration: 0.06, ease: 'power2.out' }, 0.19)
      .to($$('.cap__big, .cap__side', c0), { y: -60, opacity: 0, filter: 'blur(8px)', duration: 0.05, ease: 'power2.in' }, 0.3)
      .set(c0, { visibility: 'hidden' }, 0.36);

    // 3) um universo por vez dentro do celular
    [0, 1, 2].forEach(function (i) {
      var t = 0.35 + i * 0.21, cap = caps[i + 1], itens = $$('.cap__l > *, .cap__r > *', cap);
      tl.fromTo(apps[i], { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.25 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.08, ease: 'power3.inOut' }, t)
        .to(ambs[i], { opacity: 1, duration: 0.07 }, t)
        .set(words[i], { visibility: 'visible' }, t)
        .fromTo(words[i], { opacity: 0, xPercent: 22 }, { opacity: 1, xPercent: 4, duration: 0.1, ease: 'power2.out' }, t)
        .to(words[i], { xPercent: -16, duration: 0.11 }, t + 0.1)
        .fromTo(dots[i], { scaleY: 0.18, opacity: 0.35 }, { scaleY: 1, opacity: 1, duration: 0.03 }, t)
        .set(cap, { visibility: 'visible' }, t + 0.03)
        .fromTo(itens, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.012, duration: 0.06, ease: 'power2.out' }, t + 0.03);
      if (i > 0) tl.to(ambs[i - 1], { opacity: 0, duration: 0.07 }, t);
      if (i < 2) {
        tl.to(itens, { y: -50, opacity: 0, stagger: 0.006, duration: 0.04, ease: 'power2.in' }, t + 0.165)
          .set(cap, { visibility: 'hidden' }, t + 0.21)
          .to(words[i], { opacity: 0, duration: 0.04 }, t + 0.17)
          .to(dots[i], { scaleY: 0.18, opacity: 0.35, duration: 0.03 }, t + 0.2);
      }
    });
    tl.to({}, { duration: 0.06 });
  }

  /* ---------------- manifesto: acende palavra por palavra ---------------- */
  function manifesto() {
    var el = $('[data-manifesto]');
    if (!el || RM) return;
    var s = SplitText.create(el, L.opSplit({ type: 'words', aria: 'none' }));
    s.words.forEach(function (w) { if (w.closest('em')) w.classList.add('txt-warm'); });
    gsap.fromTo(s.words, { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.6 }
    });
  }

  /* ---------------- universos: cartões empilhados ---------------- */
  function universos() {
    var cards = $$('.uni');
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', function () {
      cards.forEach(function (c, i) {
        var prox = cards[i + 1];
        if (!prox) return;
        var st = { trigger: prox, start: 'top bottom', end: 'top 25%', scrub: true };
        gsap.to(c, { scale: 0.9, ease: 'none', scrollTrigger: st });
        gsap.to($('.uni__dim', c), { opacity: 0.65, ease: 'none', scrollTrigger: { trigger: prox, start: 'top bottom', end: 'top 25%', scrub: true } });
      });
    });
    if (!RM) {
      cards.forEach(function (c) {
        var tl = gsap.timeline({ scrollTrigger: { trigger: c, start: 'top 72%', once: true } });
        tl.from($$('.uni__top, .uni__id, .uni__name, .uni__tag, .uni__facts, .uni__ctas', c), { y: 50, opacity: 0, duration: 1.2, stagger: 0.08, clearProps: 'transform,opacity' })
          .from($('.uni__phone', c), { yPercent: 30, rotate: 12, opacity: 0, duration: 1.6, clearProps: 'opacity' }, 0.1)
          .from($$('.fl', c), { scale: 0.3, opacity: 0, duration: 1.3, stagger: 0.08, ease: 'back.out(1.7)', clearProps: 'opacity' }, 0.3)
          .from($('.uni__bg img', c), { scale: 1.3, duration: 2.2, ease: 'lipySoft' }, 0);
      });
    }
    // os objetos flutuantes seguem o mouse, cada um numa profundidade
    if (!TOUCH && !RM) {
      cards.forEach(function (c) {
        var fls = $$('[data-depth]', c).map(function (el) {
          return { x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3' }), d: +el.getAttribute('data-depth') };
        });
        c.addEventListener('pointermove', function (e) {
          var r = c.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
          fls.forEach(function (f) { f.x(nx * 46 * f.d); f.y(ny * 36 * f.d); });
        });
        c.addEventListener('pointerleave', function () { fls.forEach(function (f) { f.x(0); f.y(0); }); });
      });
    }
    $$('video[data-autoplay]').forEach(function (v) {
      ScrollTrigger.create({
        trigger: v, start: 'top bottom', end: 'bottom top',
        onToggle: function (s) { if (s.isActive) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }
      });
    });
  }

  /* ---------------- parede de telas ---------------- */
  function parede() {
    var rows = $$('.wall__row');
    rows.forEach(function (r) { r.insertAdjacentHTML('beforeend', r.innerHTML); });
    if (RM) return;
    rows.forEach(function (r, i) {
      var dir = i % 2 ? 1 : -1;
      gsap.fromTo(r, { xPercent: -24 - dir * 7 }, { xPercent: -24 + dir * 7, ease: 'none', scrollTrigger: { trigger: '.wall', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
    });
    gsap.from('.wall__card', { y: 80, scale: 0.86, opacity: 0, duration: 1.4, clearProps: 'transform,opacity', scrollTrigger: { trigger: '.wall', start: 'top 55%', once: true } });
  }

  /* ---------------- como criamos: rolagem horizontal ---------------- */
  function processo() {
    var sec = $('.process'), pin = $('.process__pin'), track = $('.process__track'), bar = $('.process__bar i');
    if (!sec) return;
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', function () {
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      var tw = gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: {
          trigger: sec, start: 'top top', end: function () { return '+=' + dist(); }, pin: pin, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: function (s) { bar.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')'; }
        }
      });
      $$('.step', track).forEach(function (st) {
        gsap.fromTo(st, { y: 90, rotate: 5, opacity: 0.25 }, { y: 0, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: st, containerAnimation: tw, start: 'left 105%', end: 'left 62%', scrub: true } });
      });
      gsap.from($$('.process__head > *'), { y: 50, opacity: 0, stagger: 0.1, duration: 1.2, scrollTrigger: { trigger: sec, start: 'top 70%', once: true } });
    });
    mm.add('(max-width: 900px)', function () {
      if (RM) return;
      $$('.step', track).forEach(function (st) {
        gsap.from(st, { y: 60, opacity: 0, duration: 1.1, clearProps: 'transform,opacity', scrollTrigger: { trigger: st, start: 'top 88%', once: true } });
      });
    });
  }

  /* ---------------- contato ---------------- */
  function contato() {
    $$('[data-copy]').forEach(function (b) {
      var sp = $('span', b), orig = sp.textContent;
      b.addEventListener('click', function () {
        var ok = function () {
          sp.textContent = L.t('E-mail copiado!');
          b.classList.add('is-copied');
          setTimeout(function () { sp.textContent = orig; b.classList.remove('is-copied'); }, 1900);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(ok, function () { location.href = 'mailto:' + b.getAttribute('data-copy'); });
        else location.href = 'mailto:' + b.getAttribute('data-copy');
      });
    });
  }

  palco();
  manifesto();
  universos();
  parede();
  processo();
  contato();
})();
