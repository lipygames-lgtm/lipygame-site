/* ==========================================================================
   LIPY GAMES — núcleo de interação e movimento (todas as páginas)
   Depende de: gsap, ScrollTrigger, SplitText, CustomEase, Lenis (assets/vendor).
   Script clássico (sem módulos) de propósito: o site abre até com dois cliques no index.html (file://).
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     LOJAS — quando um jogo chegar a uma loja, troque o null pelo link dele.
     O botão "Em breve" daquela loja vira link de verdade sozinho, em todas as páginas.
       play       Google Play       ex.: 'https://play.google.com/store/apps/details?id=com.lipy.quiver'
       amazon     Amazon Appstore   ex.: 'https://www.amazon.com/dp/XXXXXXXXXX'
       samsung    Galaxy Store      ex.: 'https://galaxystore.samsung.com/detail/com.lipy.quiver'
       poki       Poki (navegador)  ex.: 'https://poki.com/br/g/quiver'
       crazygames CrazyGames (nav.) ex.: 'https://www.crazygames.com/game/quiver'
     ------------------------------------------------------------------ */
  var LOJA = {
    quiver: { play: null, amazon: null, samsung: null, poki: null, crazygames: null },
    tlhy: { play: null, amazon: null, samsung: null, poki: null, crazygames: null },
    nitro: { play: null, amazon: null, samsung: null, poki: null, crazygames: null }
  };

  /* ------------------------------------------------------------------
     LISTA LIPY — inscrições (betas, lançamentos, atualizações) no Supabase da Lipy Games.
     A chave abaixo é a PÚBLICA (a mesma dos jogos): ela só consegue chamar public.site_inscrever
     e public.site_sair. A lista em si fica num schema fechado (servidor/site.sql).
     ------------------------------------------------------------------ */
  var LISTA = {
    url: 'https://ldpccejvvzqaocyhioju.supabase.co',
    chave: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcGNjZWp2dnpxYW9jeWhpb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjc2ODIsImV4cCI6MjEwNTg0MzY4Mn0.Usf-hgs3rAxIiFCQx7MKW41NZUufOqIsxtFcpbussDo'
  };

  var d = document, html = d.documentElement, W = window;
  var mm = function (q) { return W.matchMedia(q).matches; };
  var RM = mm('(prefers-reduced-motion: reduce)');
  var TOUCH = mm('(hover: none), (pointer: coarse)');
  var UAD = navigator.userAgentData;
  var CHROMIUM = !!(UAD && UAD.brands && UAD.brands.some(function (b) { return /Chromium|Google Chrome|Microsoft Edge/i.test(b.brand); }));
  var FILE = location.protocol === 'file:';
  var NATIVE_VT = !FILE && !RM && 'CSSViewTransitionRule' in W;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* modo privado */ } },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) { /* idem */ } }
  };

  // cor de cada universo (transição, menu) — mesmas das páginas
  var JOGOS = {
    quiver: { c1: '#150a00', c2: '#b85a00', icon: 'assets/media/quiver/icone.webp' },
    tlhy: { c1: '#04103a', c2: '#2a6bff', icon: 'assets/media/tlhy/icone.webp' },
    nitro: { c1: '#120300', c2: '#c42a00', icon: 'assets/media/nitro/icone.webp' },
    lipy: { c1: '#03050b', c2: '#12245a', icon: '' }
  };

  /* idiomas: o <html lang> decide. As frases do JS vêm de assets/js/textos.js (gerado por tools/i18n.mjs);
     em português a frase original é a própria chave. {nome} é trocado pelos valores. */
  var LANG = (html.getAttribute('lang') || 'pt-BR').split('-')[0];
  var DIC = (W.LIPY_TEXTOS || {})[LANG] || {};
  var tr = function (s, v) { var r = DIC[s] || s; if (v) r = r.replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); return r; };
  var LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-419', hi: 'hi-IN', ja: 'ja-JP', ar: 'ar-u-nu-latn' }[LANG] || 'pt-BR';
  var numero = function (n) { try { return Math.round(n).toLocaleString(LOCALE); } catch (e) { return String(Math.round(n)); } };
  // caminho até a raiz do site: '' no inglês (raiz), '../' nas pastas de idioma. Todo caminho de arquivo montado no JS começa por ele.
  var BASE = html.getAttribute('data-base') || '';
  // japonês não separa palavras com espaço: o SplitText recebe as palavras marcadas pelo Intl.Segmenter
  var SEG = LANG === 'ja' && W.Intl && Intl.Segmenter ? new Intl.Segmenter('ja', { granularity: 'word' }) : null;
  // árabe: cada palavra vira um bloco e os blocos seguem da direita para a esquerda — um nome latino de várias
  // palavras ("This Level Hates You") sairia invertido. Ligando o trecho latino com espaço inseparável, ele vira um bloco só.
  var RTL = html.getAttribute('dir') === 'rtl';
  var opSplit = function (o) {
    if (SEG) {
      o.wordDelimiter = '​';
      // pontuação gruda na palavra vizinha: 、。」 nunca começam linha e 「 nunca termina (regra japonesa de quebra)
      o.prepareText = function (t) {
        var out = [];
        Array.from(SEG.segment(t), function (s) { return s.segment; }).forEach(function (p) {
          var ant = out.length ? out[out.length - 1] : null;
          // partícula (は、が、を…) fica com a palavra de antes: "あなたは / プレイ", não "あなた / はプレイ"
          if (ant !== null && (/^[、。，．！？!?）)」』】〕…‥ー・：:；;々ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ\s]+$/.test(p) || /^(は|が|を|に|で|と|の|も|へ|や|から|まで|より|ね|よ|か|な)$/.test(p) || /[「『（(【〔]$/.test(ant))) out[out.length - 1] = ant + p;
          else out.push(p);
        });
        return out.join('​');
      };
    } else if (RTL) {
      // até 5 palavras (nomes de jogo/marca); frase latina longa continua quebrando linha normalmente
      o.prepareText = function (t) { return t.replace(/[A-Za-z0-9][\w:'’.&-]*(?:[ \t]+[A-Za-z0-9][\w:'’.&-]*){1,4}/g, function (m) { return m.replace(/[ \t]+/g, ' '); }); };
    }
    return o;
  };

  var Lipy = W.Lipy = {
    RM: RM, TOUCH: TOUCH, CHROMIUM: CHROMIUM, FILE: FILE, $: $, $$: $$, store: store, JOGOS: JOGOS, LOJA: LOJA,
    t: tr, lang: LANG, locale: LOCALE, numero: numero, base: BASE, opSplit: opSplit,
    isReady: false, _fns: [],
    onReady: function (fn) { if (Lipy.isReady) fn(); else Lipy._fns.push(fn); }
  };
  function ready() {
    if (Lipy.isReady) return;
    Lipy.isReady = true;
    html.classList.add('is-ready');
    Lipy._fns.splice(0).forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } });
  }

  // sem as bibliotecas de animação (bloqueador, arquivo faltando): nada pode ficar cobrindo a página
  if (!W.gsap || !W.ScrollTrigger || !W.SplitText || !W.CustomEase) { html.classList.remove('is-loading', 'is-entering'); return; }
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create('lipy', 'M0,0 C0.16,1 0.3,1 1,1');
  CustomEase.create('lipyIO', 'M0,0 C0.7,0 0.15,1 1,1');
  CustomEase.create('lipySoft', 'M0,0 C0.4,0 0.1,1 1,1');
  gsap.defaults({ ease: 'lipy', duration: 1.1 });
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------------- rolagem suave ---------------- */
  var lenis = null;
  if (!RM && !TOUCH && W.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  Lipy.lenis = lenis;
  Lipy.scrollTo = function (alvo, op) {
    op = op || {};
    var el = typeof alvo === 'string' ? $(alvo) : alvo;
    if (lenis) { lenis.scrollTo(el || alvo, { offset: op.offset || 0, duration: op.duration || 1.6, easing: function (t) { return 1 - Math.pow(1 - t, 4); } }); return; }
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    else if (typeof alvo === 'number') W.scrollTo({ top: alvo, behavior: RM ? 'auto' : 'smooth' });
  };
  // "/" e "/index.html" são a mesma página
  var caminho = function (p) { return (p || '').replace(/index\.html$/, ''); };
  Lipy.caminho = caminho;
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a || a.target === '_blank' || e.defaultPrevented) return;
    var url, bruto = a.getAttribute('href') || '';
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    // "#algo" é sempre esta página (mesmo com <base>, como no 404); "index.html#algo" só se for a página atual
    if (bruto.charAt(0) !== '#' && caminho(url.pathname) !== caminho(location.pathname)) return;
    var h = bruto.charAt(0) === '#' ? bruto : url.hash;
    if (!h || h.length < 2) return;
    var el = d.getElementById(decodeURIComponent(h.slice(1)));
    if (!el) return;
    e.preventDefault();
    fechaMenus();
    Lipy.scrollTo(el, { offset: a.hasAttribute('data-offset') ? +a.dataset.offset : 0 });
    // leva o foco junto (o "Pular para o conteúdo" precisa disso para o próximo Tab começar no conteúdo)
    if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });

  /* ---------------- vidro líquido: refração real (Chromium) ----------------
     Cada painel ganha um filtro SVG próprio: mapa de deslocamento gerado para o tamanho e o raio dele,
     forte na borda (o "aro" da lente) e neutro no miolo, com leve aberração cromática. */
  var Glass = (function () {
    var NS = 'http://www.w3.org/2000/svg', defs = null, n = 0;
    var on = CHROMIUM && !TOUCH && !RM && !!(W.CSS && CSS.supports('backdrop-filter', 'url(#a)'));
    function base() {
      if (defs) return defs;
      var svg = d.createElementNS(NS, 'svg');
      svg.setAttribute('aria-hidden', 'true');
      svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
      defs = d.createElementNS(NS, 'defs');
      svg.appendChild(defs);
      d.body.appendChild(svg);
      return defs;
    }
    function mapa(w, h, r, aro) {
      var k = Math.min(1, 240 / Math.max(w, h));
      var cw = Math.max(8, Math.round(w * k)), ch = Math.max(8, Math.round(h * k));
      var cv = d.createElement('canvas'); cv.width = cw; cv.height = ch;
      var ctx = cv.getContext('2d'), img = ctx.createImageData(cw, ch), p = img.data;
      var hw = w / 2, hh = h / 2, rr = Math.min(r, hw, hh);
      for (var y = 0; y < ch; y++) {
        for (var x = 0; x < cw; x++) {
          var px = (x + 0.5) / k - hw, py = (y + 0.5) / k - hh;
          var qx = Math.abs(px) - (hw - rr), qy = Math.abs(py) - (hh - rr);
          var dist, nx, ny;
          if (qx > 0 && qy > 0) { var l = Math.hypot(qx, qy) || 1; dist = rr - l; nx = qx / l * Math.sign(px); ny = qy / l * Math.sign(py); }
          else if (qx > qy) { dist = rr - qx; nx = Math.sign(px); ny = 0; }
          else { dist = rr - qy; nx = 0; ny = Math.sign(py); }
          var m = 0;
          if (dist < aro) { var t = 1 - Math.max(0, dist) / aro; m = t * t * (3 - 2 * t); m = Math.pow(m, 1.35); }
          var i = (y * cw + x) * 4;
          p[i] = 128 - nx * m * 127; p[i + 1] = 128 - ny * m * 127; p[i + 2] = 128; p[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return cv.toDataURL();
    }
    function raio(el, w, h) {
      var v = getComputedStyle(el).borderTopLeftRadius || '0';
      var r = parseFloat(v) || 0;
      if (/%/.test(v)) r = Math.min(w, h) * r / 100;
      return Math.min(r, w / 2, h / 2);
    }
    function apply(el, o) {
      if (!on || !el || el.__lente) return;
      o = o || {};
      var id = 'lente' + (++n), aro = o.aro || 24, esc = o.escala || 52, blur = o.blur == null ? 3 : o.blur, sat = o.sat || 1.65;
      var f = d.createElementNS(NS, 'filter');
      f.setAttribute('id', id);
      f.setAttribute('color-interpolation-filters', 'sRGB');
      f.setAttribute('filterUnits', 'userSpaceOnUse');
      f.setAttribute('x', '0'); f.setAttribute('y', '0');
      f.innerHTML =
        '<feGaussianBlur in="SourceGraphic" stdDeviation="' + blur + '" result="b"/>' +
        '<feImage result="m" preserveAspectRatio="none" x="0" y="0"/>' +
        '<feDisplacementMap in="b" in2="m" scale="' + esc + '" xChannelSelector="R" yChannelSelector="G" result="dr"/>' +
        '<feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>' +
        '<feDisplacementMap in="b" in2="m" scale="' + (esc * 0.9) + '" xChannelSelector="R" yChannelSelector="G" result="dg"/>' +
        '<feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>' +
        '<feDisplacementMap in="b" in2="m" scale="' + (esc * 0.8) + '" xChannelSelector="R" yChannelSelector="G" result="db"/>' +
        '<feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bb"/>' +
        '<feBlend in="r" in2="g" mode="screen" result="rg"/>' +
        '<feBlend in="rg" in2="bb" mode="screen" result="rgb"/>' +
        '<feColorMatrix in="rgb" type="saturate" values="' + sat + '"/>';
      base().appendChild(f);
      var fe = f.querySelector('feImage'), ultW = 0, ultH = 0;
      function atualiza() {
        var w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
        if (!w || !h || (w === ultW && h === ultH)) return;
        ultW = w; ultH = h;
        fe.setAttribute('href', mapa(w, h, raio(el, w, h), Math.min(aro, w / 2, h / 2)));
        fe.setAttribute('width', w); fe.setAttribute('height', h);
        f.setAttribute('width', w); f.setAttribute('height', h);
      }
      atualiza();
      if (W.ResizeObserver) new ResizeObserver(function () { atualiza(); }).observe(el);
      el.style.backdropFilter = 'url(#' + id + ')';
      el.classList.add('is-lens');
      el.__lente = id;
    }
    return { on: on, apply: apply };
  })();
  Lipy.Glass = Glass;
  if (Glass.on) html.classList.add('has-lens');

  // brilho especular do vidro segue o ponteiro
  if (!TOUCH) {
    d.addEventListener('pointermove', function (e) {
      var g = e.target.closest && e.target.closest('.glass');
      if (!g) return;
      var r = g.getBoundingClientRect();
      g.style.setProperty('--gx', (e.clientX - r.left).toFixed(0) + 'px');
      g.style.setProperty('--gy', (e.clientY - r.top).toFixed(0) + 'px');
    }, { passive: true });
  }

  /* ---------------- cursor: lente de vidro ---------------- */
  function cursor() {
    if (TOUCH || RM) return;
    var c = d.createElement('div');
    c.className = 'cursor is-hidden';
    c.setAttribute('aria-hidden', 'true');
    c.innerHTML = '<div class="cursor__lens glass glass--pill"><span></span></div><div class="cursor__dot"></div>';
    d.body.appendChild(c);
    html.classList.add('has-cursor');
    var lens = $('.cursor__lens', c), dot = $('.cursor__dot', c), label = $('span', lens);
    var qx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' }), qy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    var lx = gsap.quickTo(lens, 'x', { duration: 0.55, ease: 'power3' }), ly = gsap.quickTo(lens, 'y', { duration: 0.55, ease: 'power3' });
    W.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      qx(e.clientX); qy(e.clientY); lx(e.clientX); ly(e.clientY);
      c.classList.remove('is-hidden');
    }, { passive: true });
    d.addEventListener('pointerover', function (e) {
      var t = e.target.closest && e.target.closest('a, button, [data-cursor], input, textarea, label, summary');
      var txt = t && t.getAttribute('data-cursor');
      c.classList.toggle('is-link', !!t && !txt);
      c.classList.toggle('is-label', !!txt);
      if (txt) label.textContent = txt;
    });
    W.addEventListener('pointerdown', function () { c.classList.add('is-down'); });
    W.addEventListener('pointerup', function () { c.classList.remove('is-down'); });
    html.addEventListener('mouseleave', function () { c.classList.add('is-hidden'); });
    Glass.apply(lens, { aro: 16, escala: 34, blur: 0.4, sat: 1.4 });
  }

  /* ---------------- navegação ---------------- */
  var menuAberto = false, megaAberto = false;
  function fechaMenus() { if (menuAberto) Lipy.menu(false); if (megaAberto) Lipy.mega(false); }
  function nav() {
    var n = $('.nav');
    if (!n) return;
    var bar = $('.nav__bar', n);
    Glass.apply(bar, { aro: 20, escala: 40, blur: 5, sat: 1.8 });

    // some ao descer, volta ao subir
    var prog = $('.nav__progress i', n);
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (s) {
        var y = s.scroll();
        n.classList.toggle('is-hidden', y > 240 && s.direction === 1 && !menuAberto && !megaAberto);
        n.classList.toggle('is-scrolled', y > 40);
        if (prog) prog.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')';
      }
    });

    // a gota de vidro que escorre entre os links
    var links = $('.nav__links', n), blob = $('.nav__blob', n);
    if (links && blob) {
      var itens = $$('a, button', links);
      var ativo = $('.is-active', links);
      var vai = function (el, instant) {
        if (!el) { gsap.to(blob, { opacity: 0, duration: 0.4 }); return; }
        var x = el.offsetLeft, w = el.offsetWidth;
        if (instant || +gsap.getProperty(blob, 'opacity') < 0.05) { gsap.set(blob, { x: x, width: w }); gsap.to(blob, { opacity: 1, duration: 0.3 }); return; }
        var dx = x - gsap.getProperty(blob, 'x');
        gsap.to(blob, { x: x, width: w, opacity: 1, duration: 0.75, ease: 'elastic.out(1, 0.72)' });
        gsap.fromTo(blob, { scaleY: 1 }, { scaleY: Math.abs(dx) > 10 ? 0.78 : 0.94, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });
      };
      itens.forEach(function (el) {
        el.addEventListener('pointerenter', function () { vai(el); });
        el.addEventListener('focus', function () { vai(el); });
      });
      links.addEventListener('pointerleave', function () { vai(megaAberto ? $('[data-mega]', links) : ativo); });
      if (ativo) d.fonts && d.fonts.ready.then(function () { vai(ativo, true); });
    }

    // painel "Jogos"
    var bt = $('[data-mega]', n), mega = $('.mega', n), tFecha;
    if (bt && mega) {
      Glass.apply(mega, { aro: 22, escala: 44, blur: 6, sat: 1.8 });
      Lipy.mega = function (abre) {
        if (abre === megaAberto) return;
        megaAberto = abre;
        bt.setAttribute('aria-expanded', abre);
        gsap.killTweensOf(mega);
        if (abre) {
          mega.classList.add('is-open');
          gsap.fromTo(mega, { opacity: 0, y: -14, scale: 0.96, transformOrigin: '50% 0' }, { opacity: 1, y: 0, scale: 1, duration: 0.7, clearProps: 'opacity,transform' });
          // só as propriedades do GSAP: 'all' apagaria o --c de cada item e a lente do painel
          gsap.fromTo($$('.mega__item', mega), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.05, clearProps: 'opacity,transform' });
        } else {
          gsap.to(mega, { opacity: 0, y: -10, scale: 0.97, duration: 0.35, ease: 'power2.in', onComplete: function () { mega.classList.remove('is-open'); gsap.set(mega, { clearProps: 'opacity,transform' }); } });
        }
      };
      // o mouse abre ao passar; o clique logo depois NÃO pode fechar (senão "passa e clica" fecha o painel)
      var abertoPeloMouse = 0;
      bt.addEventListener('click', function () {
        if (megaAberto && Date.now() - abertoPeloMouse < 600) return;
        Lipy.mega(!megaAberto);
      });
      [bt, mega].forEach(function (el) {
        el.addEventListener('pointerenter', function (e) {
          if (e.pointerType !== 'mouse') return;
          clearTimeout(tFecha);
          if (!megaAberto) abertoPeloMouse = Date.now();
          Lipy.mega(true);
        });
        el.addEventListener('pointerleave', function (e) {
          if (e.pointerType !== 'mouse') return;
          tFecha = setTimeout(function () { Lipy.mega(false); }, 260);
        });
      });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechaMenus(); });
      d.addEventListener('click', function (e) { if (megaAberto && !e.target.closest('.nav')) Lipy.mega(false); });
    } else Lipy.mega = function () {};

    // menu do celular
    var burger = $('.nav__burger', n), menu = $('.menu');
    if (burger && menu) {
      Lipy.menu = function (abre) {
        menuAberto = abre;
        burger.setAttribute('aria-expanded', abre);
        burger.setAttribute('aria-label', abre ? tr('Fechar menu') : tr('Abrir menu'));
        menu.setAttribute('aria-hidden', !abre);
        gsap.killTweensOf(menu);
        if (abre) {
          menu.classList.add('is-open');
          if (lenis) lenis.stop();
          d.body.style.overflow = 'hidden';
          gsap.fromTo(menu, { clipPath: 'circle(0% at calc(100% - 44px) 44px)' }, { clipPath: 'circle(150% at calc(100% - 44px) 44px)', duration: 1, ease: 'lipyIO' });
          gsap.fromTo($$('.menu__links a, .menu__games a, .menu__legal', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, delay: 0.25 });
        } else {
          if (lenis) lenis.start();
          d.body.style.overflow = '';
          gsap.to(menu, { clipPath: 'circle(0% at calc(100% - 44px) 44px)', duration: 0.7, ease: 'lipyIO', onComplete: function () { menu.classList.remove('is-open'); } });
        }
      };
      burger.addEventListener('click', function () { Lipy.menu(!menuAberto); });
      // toque no fundo do menu fecha; virar o tablet para uma tela larga (sem o botão) também
      menu.addEventListener('click', function (e) { if (e.target === menu) Lipy.menu(false); });
      W.addEventListener('resize', function () { if (menuAberto && W.innerWidth > 960) Lipy.menu(false); });
    } else Lipy.menu = function () {};
  }

  /* ---------------- ímã nos botões ---------------- */
  function imas() {
    if (TOUCH || RM) return;
    $$('[data-magnetic]').forEach(function (el) {
      var forca = +el.getAttribute('data-magnetic') || 0.28;
      var qx = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' }), qy = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' });
      var ic = $('.btn__ic', el), ix = ic && gsap.quickTo(ic, 'x', { duration: 0.7, ease: 'power3' }), iy = ic && gsap.quickTo(ic, 'y', { duration: 0.7, ease: 'power3' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        qx(x * forca); qy(y * forca);
        if (ic) { ix(x * forca * 0.5); iy(y * forca * 0.5); }
      });
      el.addEventListener('pointerleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)' });
        if (ic) gsap.to(ic, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ---------------- inclinação 3D ---------------- */
  function tilts() {
    if (TOUCH || RM) return;
    $$('[data-tilt]').forEach(function (el) {
      var max = +el.getAttribute('data-tilt') || 8;
      gsap.set(el, { transformPerspective: 1100 });
      var rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      });
      el.addEventListener('pointerleave', function () { rx(0); ry(0); });
    });
  }

  /* ---------------- texto em linhas (SplitText) ---------------- */
  Lipy.split = function (el, op) {
    op = op || {};
    return SplitText.create(el, opSplit({
      type: op.type || 'lines,words', mask: 'lines', linesClass: 'split-line', aria: 'none', autoSplit: !!op.onSplit, onSplit: op.onSplit
    }));
  };
  function textos() {
    if (RM) return;
    $$('[data-split]').forEach(function (el) {
      if (el.getAttribute('data-split') === 'manual') return;
      SplitText.create(el, opSplit({
        type: 'lines', mask: 'lines', linesClass: 'split-line', aria: 'none', autoSplit: true,
        onSplit: function (s) {
          return gsap.from(s.lines, {
            yPercent: 115, rotate: 2.5, transformOrigin: '0 100%', duration: 1.25, stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          });
        }
      }));
    });
  }

  /* ---------------- aparições ---------------- */
  function aparicoes() {
    if (RM) return;
    var tipos = {
      up: { from: { y: 50, opacity: 0 } },
      fade: { from: { opacity: 0 } },
      scale: { from: { scale: 0.9, opacity: 0, y: 30 } },
      left: { from: { x: -50, opacity: 0 } },
      right: { from: { x: 50, opacity: 0 } },
      clip: { from: { clipPath: 'inset(100% 0% 0% 0%)' }, to: { clipPath: 'inset(0% 0% 0% 0%)' } }
    };
    var els = $$('[data-reveal]');
    els.forEach(function (el) { var t = tipos[el.getAttribute('data-reveal')] || tipos.up; gsap.set(el, t.from); });
    ScrollTrigger.batch(els, {
      start: 'top 90%', once: true, interval: 0.08, batchMax: 8,
      onEnter: function (lote) {
        lote.forEach(function (el, i) {
          var t = tipos[el.getAttribute('data-reveal')] || tipos.up;
          var alvo = Object.assign({ y: 0, x: 0, scale: 1, opacity: 1, duration: 1.2, delay: i * 0.08 + (+el.getAttribute('data-delay') || 0), clearProps: 'transform,opacity,clipPath' }, t.to || {});
          if (t.to) { delete alvo.y; delete alvo.x; delete alvo.scale; delete alvo.opacity; }
          gsap.to(el, alvo);
        });
      }
    });
  }

  /* ---------------- parallax ---------------- */
  function parallax() {
    if (RM) return;
    $$('[data-parallax]').forEach(function (el) {
      var v = +el.getAttribute('data-parallax') || 10;
      var gat = el.closest('[data-parallax-wrap]') || el;
      gsap.fromTo(el, { yPercent: -v }, { yPercent: v, ease: 'none', scrollTrigger: { trigger: gat, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------------- contadores ---------------- */
  function contadores() {
    $$('[data-count]').forEach(function (el) {
      var fim = +el.getAttribute('data-count'), pad = +el.getAttribute('data-pad') || 0;
      var fmt = function (v) { var s = numero(v); while (s.length < pad) s = '0' + s; return s; };
      if (RM) { el.textContent = fmt(fim); return; }
      var o = { v: 0 };
      el.textContent = fmt(0);
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: function () { gsap.to(o, { v: fim, duration: 2.2, ease: 'power3.out', onUpdate: function () { el.textContent = fmt(o.v); } }); }
      });
    });
  }

  /* ---------------- ícones que se desenham ---------------- */
  function tracos() {
    $$('.draw').forEach(function (svg) {
      if (RM) { svg.classList.add('is-drawn'); return; }
      ScrollTrigger.create({ trigger: svg, start: 'top 90%', once: true, onEnter: function () { svg.classList.add('is-drawn'); } });
    });
  }

  /* ---------------- faixas que correm ---------------- */
  var faixas = [];
  function marquees() {
    $$('[data-marquee]').forEach(function (m) {
      var trilho = $('.marquee__track', m);
      if (!trilho) return;
      var dir = +m.getAttribute('data-marquee') || -1, vel = +m.getAttribute('data-speed') || 40;
      var orig = trilho.innerHTML;
      // repete até cobrir 2x a largura da tela
      var voltas = 0;
      while (trilho.scrollWidth < W.innerWidth * 2.2 && voltas++ < 8) trilho.insertAdjacentHTML('beforeend', orig);
      trilho.insertAdjacentHTML('beforeend', trilho.innerHTML);
      $$('img', trilho).forEach(function (im, i) { if (i >= $$('img', trilho).length / 2) im.alt = ''; });
      if (RM) return;
      var dist = trilho.scrollWidth / 2;
      var tw = gsap.fromTo(trilho, { x: dir < 0 ? 0 : -dist }, { x: dir < 0 ? -dist : 0, duration: dist / vel, ease: 'none', repeat: -1 });
      faixas.push(tw);
      ScrollTrigger.create({ trigger: m, start: 'top bottom', end: 'bottom top', onToggle: function (s) { tw.paused(!s.isActive); } });
    });
    if (faixas.length && !RM) {
      var alvo = 1;
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: function (s) { alvo = 1 + Math.min(4, Math.abs(s.getVelocity()) / 600); }
      });
      gsap.ticker.add(function () {
        faixas.forEach(function (tw) { var ts = tw.timeScale(); tw.timeScale(ts + (alvo - ts) * 0.08); });
        alvo += (1 - alvo) * 0.05;
      });
    }
  }

  /* ---------------- selos da loja ---------------- */
  function lojas() {
    var NOMES = { play: 'Google Play', amazon: 'Amazon Appstore', samsung: 'Galaxy Store', poki: 'Poki', crazygames: 'CrazyGames' };
    $$('[data-store]').forEach(function (a) {
      var k = a.getAttribute('data-store').split(':'), plat = k[1] || 'play';
      var url = (LOJA[k[0]] || {})[plat];
      if (!url) return;
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('aria-disabled');
      a.classList.add('is-live');
      var s = $('small', a); if (s) s.textContent = tr('Disponível no');
      var st = $('[data-status]', a);
      if (st) {
        var web = plat === 'poki' || plat === 'crazygames';
        st.textContent = web ? tr('Jogar no navegador') : tr('Baixar');
        a.setAttribute('aria-label', web ? tr('Jogar na {loja} (abre em nova aba)', { loja: NOMES[plat] }) : tr('Baixar na {loja} (abre em nova aba)', { loja: NOMES[plat] }));
      }
    });
  }

  /* ---------------- player de trilha ---------------- */
  var tocando = null;
  function players() {
    $$('[data-player]').forEach(function (p) {
      var audio = new Audio();
      audio.preload = 'none';
      var faixasBt = $$('[data-src]', p), btn = $('.player__btn', p), titulo = $('.player__title', p), barra = $('.player__prog i', p);
      var tempo = $('.player__time', p), prog = $('.player__prog', p), barras = $$('.player__bars i', p);
      var atual = 0, ctx = null, an = null, dados = null;
      var mmss = function (s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };
      function carrega(i) {
        atual = i;
        faixasBt.forEach(function (b, j) { b.classList.toggle('is-on', j === i); b.setAttribute('aria-pressed', j === i); });
        audio.src = faixasBt[i].getAttribute('data-src');
        titulo.textContent = faixasBt[i].getAttribute('data-title') || $('.t', faixasBt[i]).textContent;
      }
      function analisador() {
        if (ctx || FILE) return; // em file:// o áudio "cruzado" sai mudo no analisador: usa o balanço simulado
        try {
          var AC = W.AudioContext || W.webkitAudioContext;
          ctx = new AC();
          var src = ctx.createMediaElementSource(audio);
          an = ctx.createAnalyser(); an.fftSize = 64; an.smoothingTimeConstant = 0.78;
          src.connect(an); an.connect(ctx.destination);
          dados = new Uint8Array(an.frequencyBinCount);
        } catch (e) { ctx = null; an = null; }
      }
      function toca() {
        if (tocando && tocando !== audio) tocando.pause();
        analisador();
        if (ctx && ctx.state === 'suspended') ctx.resume();
        audio.play().catch(function () { /* bloqueio do navegador: nada a fazer */ });
      }
      btn.addEventListener('click', function () { if (audio.paused) toca(); else audio.pause(); });
      faixasBt.forEach(function (b, i) {
        b.addEventListener('click', function () { if (i === atual && !audio.paused) { audio.pause(); return; } carrega(i); toca(); });
      });
      // as barras só animam enquanto toca (parado, o ticker sai e a bateria agradece)
      var pintaBarras = function () {
        var tocandoAgora = !audio.paused;
        if (an && tocandoAgora) an.getByteFrequencyData(dados);
        var t = audio.currentTime;
        barras.forEach(function (b, i) {
          var v;
          if (!tocandoAgora) v = 0.1;
          else if (an) v = Math.max(0.08, dados[(i * 2 + 1) % dados.length] / 255);
          else v = 0.2 + 0.8 * Math.abs(Math.sin(t * (2.1 + i * 0.37) + i * 1.7) * Math.cos(t * 1.3 + i * 0.5));
          b.style.transform = 'scaleY(' + (v * 8.3).toFixed(3) + ')';
        });
      };
      audio.addEventListener('play', function () { tocando = audio; p.classList.add('is-playing'); btn.setAttribute('aria-label', tr('Pausar')); if (barras.length) gsap.ticker.add(pintaBarras); });
      audio.addEventListener('pause', function () { p.classList.remove('is-playing'); btn.setAttribute('aria-label', tr('Tocar')); gsap.ticker.remove(pintaBarras); pintaBarras(); });
      audio.addEventListener('ended', function () { carrega((atual + 1) % faixasBt.length); toca(); });
      audio.addEventListener('timeupdate', function () {
        var f = audio.duration ? audio.currentTime / audio.duration : 0;
        barra.style.transform = 'scaleX(' + f + ')';
        tempo.textContent = mmss(audio.currentTime) + ' / ' + mmss(audio.duration || 60);
        prog.setAttribute('aria-valuenow', Math.round(f * 100));
        prog.setAttribute('aria-valuetext', tr('{a} de {b}', { a: mmss(audio.currentTime), b: mmss(audio.duration || 60) }));
      });
      prog.addEventListener('click', function (e) {
        var r = prog.getBoundingClientRect();
        if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
      });
      // a barra de progresso também anda pelo teclado (setas: 5 s)
      prog.setAttribute('role', 'slider');
      prog.setAttribute('tabindex', '0');
      prog.setAttribute('aria-label', tr('Posição da música'));
      prog.setAttribute('aria-valuemin', '0');
      prog.setAttribute('aria-valuemax', '100');
      prog.setAttribute('aria-valuenow', '0');
      prog.addEventListener('keydown', function (e) {
        if (!audio.duration) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - 5); }
      });
      pintaBarras();
      carrega(0);
    });
  }

  /* ---------------- galeria (lightbox) ---------------- */
  function galerias() {
    var grupos = $$('[data-gallery]');
    if (!grupos.length) return;
    var seta = function (dir) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + (dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg>'; };
    var lb = d.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', tr('Galeria de telas'));
    lb.innerHTML = '<span class="lightbox__count"></span>' +
      '<button class="lightbox__nav glass" data-dir="-1" aria-label="' + tr('Tela anterior') + '">' + seta(-1) + '</button>' +
      '<div class="lightbox__stage"><img alt=""></div>' +
      '<button class="lightbox__nav glass" data-dir="1" aria-label="' + tr('Próxima tela') + '">' + seta(1) + '</button>' +
      '<button class="lightbox__close glass" aria-label="' + tr('Fechar galeria') + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
    d.body.appendChild(lb);
    var img = $('img', lb), cont = $('.lightbox__count', lb), lista = [], i = 0, volta = null;
    function mostra(k, dir) {
      i = (k + lista.length) % lista.length;
      var it = lista[i];
      gsap.to(img, {
        opacity: 0, x: -40 * (dir || 0), duration: 0.18, ease: 'power2.in', onComplete: function () {
          img.src = it.getAttribute('data-full') || it.getAttribute('href');
          img.alt = ($('img', it) || it).getAttribute('alt') || '';
          gsap.fromTo(img, { opacity: 0, x: 40 * (dir || 0), scale: dir ? 1 : 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 0.6 });
        }
      });
      cont.textContent = ('0' + (i + 1)).slice(-2) + ' / ' + ('0' + lista.length).slice(-2);
    }
    function abre(g, k) {
      lista = $$('[data-full], a[href]', g).filter(function (a) { return a.closest('[data-gallery]') === g && !a.closest('[hidden]'); });
      volta = d.activeElement;
      lb.classList.add('is-open');
      if (lenis) lenis.stop();
      gsap.to(lb, { opacity: 1, duration: 0.4 });
      mostra(k, 0);
      $('.lightbox__close', lb).focus();
    }
    function fecha() {
      if (lenis) lenis.start();
      gsap.to(lb, { opacity: 0, duration: 0.35, onComplete: function () { lb.classList.remove('is-open'); } });
      if (volta) volta.focus();
    }
    grupos.forEach(function (g) {
      g.addEventListener('click', function (e) {
        var it = e.target.closest('[data-full], a[href]');
        if (!it || it.closest('[data-gallery]') !== g) return;
        e.preventDefault();
        var itens = $$('[data-full], a[href]', g).filter(function (a) { return a.closest('[data-gallery]') === g && !a.closest('[hidden]'); });
        abre(g, itens.indexOf(it));
      });
    });
    $$('.lightbox__nav', lb).forEach(function (b) { b.addEventListener('click', function () { var dr = +b.getAttribute('data-dir'); mostra(i + dr, dr); }); });
    $('.lightbox__close', lb).addEventListener('click', fecha);
    var arrastou = false;
    lb.addEventListener('click', function (e) {
      if (arrastou) { arrastou = false; return; }
      if (e.target === lb || e.target.classList.contains('lightbox__stage')) fecha();
    });
    d.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') fecha();
      if (e.key === 'ArrowRight') mostra(i + 1, 1);
      if (e.key === 'ArrowLeft') mostra(i - 1, -1);
      // o foco fica preso dentro da galeria enquanto ela está aberta
      if (e.key === 'Tab') {
        var focaveis = $$('button', lb).filter(function (b) { return b.offsetParent !== null; });
        if (!focaveis.length) return;
        var pos = focaveis.indexOf(d.activeElement);
        e.preventDefault();
        focaveis[(pos + (e.shiftKey ? -1 : 1) + focaveis.length) % focaveis.length].focus();
      }
    });
    // deslizar para os lados troca a tela (touch-action no CSS deixa o toque horizontal chegar aqui)
    var x0 = null;
    lb.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    lb.addEventListener('pointercancel', function () { x0 = null; });
    lb.addEventListener('pointerup', function (e) {
      if (x0 == null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { arrastou = true; mostra(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); setTimeout(function () { arrastou = false; }, 350); }
    });
  }

  /* ---------------- LISTA LIPY: inscrição (betas, lançamentos, atualizações) ---------------- */
  var local = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento: tudo bem */ } }
  };
  var MSG = {
    email: tr('Esse e-mail não parece completo. Confere pra gente?'),
    vazio: tr('Escolha pelo menos um tipo de novidade.'),
    limite: tr('Muitas inscrições deste endereço agora. Tente de novo mais tarde.'),
    ocupado: tr('A lista está recebendo muita gente neste minuto. Tente de novo em instantes.'),
    rede: tr('Não conseguimos falar com o servidor. Verifique a conexão e tente de novo.')
  };
  function rpc(fn, args) {
    var ctl = W.AbortController ? new AbortController() : null, t = ctl && setTimeout(function () { ctl.abort(); }, 12000);
    return fetch(LISTA.url + '/rest/v1/rpc/' + fn, {
      method: 'POST', signal: ctl ? ctl.signal : undefined,
      headers: { apikey: LISTA.chave, Authorization: 'Bearer ' + LISTA.chave, 'Content-Type': 'application/json' },
      body: JSON.stringify(args)
    }).then(function (r) { return r.json(); }).finally(function () { if (t) clearTimeout(t); });
  }
  Lipy.rpc = rpc;
  function mascara(email) {
    var p = email.split('@');
    return p[0].slice(0, 3) + '•••@' + p[1];
  }
  // confete com peças dos jogos saindo do botão
  function confete(origem) {
    if (RM) return;
    var r = origem.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var cores = ['#2ad8ff', '#2170ff', '#ffb627', '#ff7a1a', '#3ef08a', '#ff5a7a', '#ffffff'];
    var pecas = ['seta-cima-azul', 'seta-dir-verde', 'seta-esq-amarela', 'estrela-ouro', 'gema'].map(function (p) { return BASE + 'assets/media/quiver/ui/' + p + '.webp'; });
    var box = d.createElement('div');
    box.className = 'confete';
    box.setAttribute('aria-hidden', 'true');
    d.body.appendChild(box);
    for (var i = 0; i < 42; i++) {
      var el;
      if (i % 5 === 0) { el = d.createElement('img'); el.src = pecas[i / 5 % pecas.length | 0]; el.className = 'confete__img'; }
      else { el = d.createElement('i'); el.style.background = cores[i % cores.length]; if (i % 3 === 0) el.style.borderRadius = '50%'; }
      box.appendChild(el);
      var ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.25, vel = 180 + Math.random() * 360;
      gsap.set(el, { x: cx, y: cy, rotation: Math.random() * 360, scale: 0.6 + Math.random() * 0.8 });
      gsap.to(el, { x: cx + Math.cos(ang) * vel, y: cy + Math.sin(ang) * vel, rotation: '+=' + (Math.random() * 540 - 270), duration: 0.9, ease: 'power3.out' });
      gsap.to(el, { y: '+=' + (260 + Math.random() * 300), opacity: 0, duration: 1.3, delay: 0.75, ease: 'power2.in' });
    }
    gsap.delayedCall(2.4, function () { box.remove(); });
  }
  Lipy.confete = confete;
  // aviso de "conquista desbloqueada", como nos jogos
  function conquista(titulo, texto) {
    var t = d.createElement('div');
    t.className = 'trofeu glass';
    t.setAttribute('role', 'status');
    t.innerHTML = '<span class="trofeu__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a4 4 0 0 1-4 4M7 5H4v2a4 4 0 0 0 4 4"/></svg></span>' +
      '<span class="trofeu__txt"><small>' + tr('Conquista desbloqueada') + '</small><b></b><span></span></span><span class="trofeu__xp" aria-hidden="true"><i></i></span>';
    d.body.appendChild(t);
    requestAnimationFrame(function () { $('b', t).textContent = titulo; $('.trofeu__txt > span', t).textContent = texto; });
    var tl = gsap.timeline({ onComplete: function () { t.remove(); } });
    tl.fromTo(t, { y: -120, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' })
      .fromTo($('.trofeu__ic', t), { rotate: -30, scale: 0.4 }, { rotate: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, .5)' }, 0.25)
      .fromTo($('.trofeu__xp i', t), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.4)
      .to(t, { y: -120, opacity: 0, duration: 0.6, ease: 'power2.in' }, 5.2);
  }
  Lipy.conquista = conquista;
  function passeAtivo(email, anima) {
    $$('.pass').forEach(function (p) {
      var nome = $('[data-pass-nome]', p);
      if (nome && email) nome.textContent = mascara(email);
      p.classList.add('is-active');
      var carimbo = $('.pass__stamp', p);
      if (anima && carimbo && !RM) gsap.fromTo(carimbo, { scale: 2.6, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: -12, duration: 0.55, ease: 'back.out(2.4)', delay: 0.15 });
      if (anima && !RM) gsap.fromTo(p, { x: 0 }, { x: 6, duration: 0.06, repeat: 5, yoyo: true, delay: 0.25, onComplete: function () { gsap.set(p, { x: 0 }); } });
    });
  }
  function inscricoes() {
    var ja = local.get('lipy:lista');
    if (ja) passeAtivo(ja, false);
    $$('[data-signup]').forEach(function (f) {
      var t0 = Date.now();
      var input = $('input[type="email"]', f), btn = $('button[type="submit"]', f), msg = $('.signup__msg', f), hp = $('.signup__hp', f);
      var ok = $('.signup__ok', f), okEmail = $('[data-ok-email]', f);
      // doEmail: só erro de e-mail marca o campo como inválido (limite/rede não são culpa do que foi digitado)
      var erro = function (txt, doEmail) {
        msg.textContent = txt;
        msg.classList.add('is-erro');
        f.classList.add('is-erro');
        if (!RM) gsap.fromTo($('.signup__field', f), { x: 0 }, { x: 10, duration: 0.06, repeat: 5, yoyo: true, clearProps: 'x' });
        if (doEmail) input.setAttribute('aria-invalid', 'true');
      };
      var limpa = function () { msg.textContent = ''; msg.classList.remove('is-erro'); f.classList.remove('is-erro'); input.removeAttribute('aria-invalid'); };
      var sucesso = function (email) {
        local.set('lipy:lista', email);
        f.classList.add('is-done');
        if (okEmail) okEmail.textContent = email;
        ok.hidden = false;
        if (!RM) {
          gsap.fromTo($$('.signup__ok > *', f), { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 });
          var ck = $('.signup__check', f);
          if (ck) ck.classList.remove('is-drawn'), ck.getBoundingClientRect(), ck.classList.add('is-drawn');
        }
        confete(btn);
        passeAtivo(email, true);
        conquista(tr('Jogador da Lista Lipy'), tr('Você vai saber de tudo antes de todo mundo.'));
        ok.focus && ok.focus();
      };
      input.addEventListener('input', limpa);
      f.addEventListener('change', function (e) { if (e.target.name === 'i') limpa(); });
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (f.classList.contains('is-sending')) return;
        limpa();
        var email = input.value.trim();
        // robô: preencheu o campo escondido ou enviou rápido demais — finge que deu certo
        if ((hp && hp.value) || Date.now() - t0 < 1200) { f.classList.add('is-done'); ok.hidden = false; return; }
        if (!/^[^\s@]{1,64}@[^\s@]+\.[^\s@.]{2,}$/.test(email)) { erro(MSG.email, true); input.focus(); return; }
        var ints = $$('input[name="i"]:checked', f).map(function (x) { return x.value; });
        var jogos = $$('input[name="j"]:checked', f).map(function (x) { return x.value; });
        if (!ints.length) { erro(MSG.vazio); return; }
        f.classList.add('is-sending');
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
        rpc('site_inscrever', { p_email: email, p_interesses: ints, p_jogos: jogos, p_origem: f.getAttribute('data-origem') || '', p_idioma: LANG })
          .then(function (j) { if (j && j.ok) sucesso(email.toLowerCase()); else erro(MSG[j && j.erro] || MSG.rede, j && j.erro === 'email'); })
          .catch(function () { erro(MSG.rede); })
          .finally(function () { f.classList.remove('is-sending'); btn.disabled = false; btn.removeAttribute('aria-busy'); });
      });
      var outro = $('[data-signup-outro]', f);
      if (outro) outro.addEventListener('click', function () { f.classList.remove('is-done'); ok.hidden = true; input.value = ''; input.focus(); t0 = 0; });
    });
    // sair da lista (página de privacidade)
    $$('[data-sair]').forEach(function (f) {
      var input = $('input[type="email"]', f), msg = $('.signup__msg', f), btn = $('button', f);
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/.test(email)) { msg.textContent = MSG.email; return; }
        btn.disabled = true;
        rpc('site_sair', { p_email: email })
          .then(function (j) {
            msg.textContent = j && j.ok ? tr('Pronto: se esse e-mail estava na lista, ele não recebe mais nada da Lipy.') : (MSG[j && j.erro] || MSG.rede);
            // o passe "ativado" guardado neste aparelho também sai
            if (j && j.ok && (local.get('lipy:lista') || '') === email.toLowerCase()) { try { localStorage.removeItem('lipy:lista'); } catch (e2) { /* sem armazenamento */ } }
          })
          .catch(function () { msg.textContent = MSG.rede; })
          .finally(function () { btn.disabled = false; });
      });
    });
    // o brilho holográfico do passe acompanha o ponteiro
    if (!TOUCH && !RM) $$('.pass').forEach(function (p) {
      p.addEventListener('pointermove', function (e) {
        var r = p.getBoundingClientRect();
        p.style.setProperty('--fx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        p.style.setProperty('--fy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
    // o código de barras do passe
    $$('.pass__bar').forEach(function (b) {
      var x = 0, s = '', seed = 7;
      while (x < 200) { seed = (seed * 9301 + 49297) % 233280; var w = 1 + (seed % 4); if ((seed >> 3) % 3) s += '<rect x="' + x + '" y="0" width="' + w + '" height="40"/>'; x += w + 1 + (seed % 3); }
      b.innerHTML = s;
    });
  }

  /* ---------------- idiomas: seletor com bandeiras + aviso de idioma ----------------
     O inglês mora na raiz; os outros em /pt/ /es/ /hi/ /ja/ /ar/. O assets/js/idioma.js (no <head>) já leva
     quem chega pela raiz para o idioma do país. Aqui: o seletor, e um aviso para quem abriu um link
     compartilhado num idioma que não é o seu. */
  var BANDEIRA = { en: 'us', pt: 'br', es: 'mx', hi: 'in', ja: 'jp', ar: 'eg' };
  // escrita no idioma SUGERIDO (quem ainda não entende o idioma da página precisa ler o convite)
  var SUGESTAO = {
    pt: ['Este site também está em português.', 'Ver em português', 'Fechar'],
    en: ['This site is also available in English.', 'Switch to English', 'Close'],
    es: ['Este sitio también está en español.', 'Ver en español', 'Cerrar'],
    hi: ['यह साइट हिन्दी में भी उपलब्ध है।', 'हिन्दी में देखें', 'बंद करें'],
    ja: ['このサイトは日本語でもご覧いただけます。', '日本語で見る', '閉じる'],
    ar: ['هذا الموقع متاح أيضًا باللغة العربية.', 'عرض بالعربية', 'إغلاق']
  };
  function idiomas() {
    // "/quiver" e "/quiver.html" são a mesma página no GitHub Pages
    var arquivo = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
    arquivo = /^(index|quiver|this-level-hates-you|nitrovenant|privacidade)$/.test(arquivo) ? arquivo + '.html' : 'index.html';
    // caminhos a partir da raiz do site (BASE sobe das pastas de idioma até ela)
    var destino = function (l) { return BASE + (l === 'en' ? '' : l + '/') + arquivo; };
    var escolhe = function (l) { local.set('lipy:idioma', l); };
    $$('a[data-lang]').forEach(function (a) {
      var l = a.getAttribute('data-lang');
      a.setAttribute('href', destino(l));
      if (l === LANG) a.setAttribute('aria-current', 'true');
      a.addEventListener('click', function () { escolhe(l); });
    });
    var atual = $('[data-idioma-atual]');
    if (atual) atual.textContent = LANG.toUpperCase();
    var flag = $('[data-idioma-flag]');
    if (flag && BANDEIRA[LANG]) flag.setAttribute('src', BASE + 'assets/media/bandeiras/' + BANDEIRA[LANG] + '.webp');
    // abre/fecha a lista
    var box = $('[data-idioma]'), bt = box && $('.idioma__bt', box), lista = box && $('.idioma__lista', box);
    if (box && bt && lista) {
      var aberto = false;
      var alterna = function (abre) {
        aberto = abre;
        bt.setAttribute('aria-expanded', abre);
        lista.classList.toggle('is-open', abre);
        if (abre && !RM) gsap.fromTo(lista, { opacity: 0, y: -10, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, clearProps: 'opacity,transform' });
      };
      bt.addEventListener('click', function (e) { e.stopPropagation(); alterna(!aberto); });
      d.addEventListener('click', function (e) { if (aberto && !box.contains(e.target)) alterna(false); });
      d.addEventListener('keydown', function (e) { if (aberto && e.key === 'Escape') { alterna(false); bt.focus(); } });
      box.addEventListener('focusout', function (e) { if (aberto && !box.contains(e.relatedTarget)) alterna(false); });
    }
    // aviso: esta página está num idioma, a pessoa prefere outro (escolha dela > país do IP > aparelho).
    // Uma vez por visita; fechar não muda a escolha guardada.
    if (store.get('lipy:sugeriu')) return;
    Lipy.onReady(function () {
      setTimeout(function () {
        var LI = W.LipyIdioma;
        var pref = LI ? (LI.preferido() || LI.doAparelho()) : null;
        if (!pref || pref === LANG || !SUGESTAO[pref]) return;
        store.set('lipy:sugeriu', '1');
        var s = SUGESTAO[pref], el = d.createElement('div');
        el.className = 'sugere glass';
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', s[0]);
        el.setAttribute('lang', pref);
        el.setAttribute('dir', pref === 'ar' ? 'rtl' : 'ltr');
        el.innerHTML = '<img alt="" width="64" height="64"><p></p><a class="btn btn--warm btn--sm"></a><button class="sugere__x" type="button">×</button>';
        $('img', el).setAttribute('src', BASE + 'assets/media/bandeiras/' + BANDEIRA[pref] + '.webp');
        $('p', el).textContent = s[0];
        var ir = $('a', el);
        ir.textContent = s[1];
        ir.setAttribute('href', destino(pref));
        ir.setAttribute('hreflang', pref);
        ir.addEventListener('click', function () { escolhe(pref); });
        var x = $('.sugere__x', el);
        x.setAttribute('aria-label', s[2]);
        x.addEventListener('click', function () {
          if (RM) { el.remove(); return; }
          gsap.to(el, { y: 30, opacity: 0, duration: 0.4, onComplete: function () { el.remove(); } });
        });
        d.body.appendChild(el);
        if (!RM) gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.6)' });
      }, 2200);
    });
  }

  /* ---------------- rodapé ---------------- */
  function rodape() {
    var p = $('.foot__word');
    if (p && !TOUCH) {
      var alvo = $('span + span', p);
      p.addEventListener('pointermove', function (e) {
        var r = p.getBoundingClientRect();
        alvo.style.setProperty('--fx', (e.clientX - r.left) + 'px');
        alvo.style.setProperty('--fy', (e.clientY - r.top) + 'px');
      });
      p.addEventListener('pointerleave', function () { alvo.style.setProperty('--fx', '-30%'); });
    }
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$('[data-top]').forEach(function (b) { b.addEventListener('click', function () { Lipy.scrollTo(0); }); });
  }

  /* ---------------- transições entre páginas ---------------- */
  var veil = $('.veil'), fill = veil && $('.veil__fill', veil), vIcon = veil && $('.veil__icon', veil), vImg = vIcon && $('img', vIcon);
  var iconePendente = null;
  function internoHtml(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.getAttribute('aria-disabled') === 'true') return false;
    var h = a.getAttribute('href') || '';
    if (!h || h[0] === '#' || /^(mailto|tel|javascript):/i.test(h)) return false;
    if (a.origin !== location.origin && !(FILE && a.protocol === 'file:')) return false;
    if (caminho(a.pathname) === caminho(location.pathname)) return false;
    return /\.html$|\/$/.test(a.pathname);
  }
  function sai(a, e) {
    var g = a.getAttribute('data-game') || 'lipy', cfg = JOGOS[g] || JOGOS.lipy;
    if (NATIVE_VT) {
      // o navegador faz a transição; só marca o ícone que vai voar
      iconePendente = g !== 'lipy' ? ($('[data-vt]', a) || (a.closest('[data-vt-scope]') && $('[data-vt]', a.closest('[data-vt-scope]')))) : null;
      if (iconePendente) store.set('lipy:vt', g);
      return;
    }
    if (RM || !veil) return;
    e.preventDefault();
    var href = a.href;
    var icon = cfg.icon ? new URL(BASE + cfg.icon, d.baseURI).href : ''; // baseURI: o 404 usa <base href="/">
    store.set('lipy:veil', JSON.stringify({ c1: cfg.c1, c2: cfg.c2, icon: icon }));
    veil.style.setProperty('--vc1', cfg.c1);
    veil.style.setProperty('--vc2', cfg.c2);
    var vx = Math.round(e.clientX || innerWidth / 2), vy = Math.round(e.clientY || innerHeight / 2);
    if (icon) vImg.src = icon;
    veil.classList.add('is-on');
    if (lenis) lenis.stop();
    var tl = gsap.timeline({ onComplete: function () { location.href = href; } });
    tl.fromTo(fill, { clipPath: 'circle(0% at ' + vx + 'px ' + vy + 'px)' }, { clipPath: 'circle(150% at ' + vx + 'px ' + vy + 'px)', duration: 0.95, ease: 'lipyIO' });
    if (icon) tl.fromTo(vIcon, { opacity: 0, scale: 0.4, rotate: -8 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.35);
  }
  d.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!internoHtml(a)) return;
    sai(a, e);
  });
  if (NATIVE_VT) {
    W.addEventListener('pageswap', function (e) {
      if (!e.viewTransition || !iconePendente) return;
      var el = iconePendente;
      el.style.viewTransitionName = 'game-icon';
      e.viewTransition.finished.finally(function () { el.style.viewTransitionName = ''; });
    });
  }
  function entra() {
    if (!html.classList.contains('is-entering') || !veil) return null;
    var v = null;
    try { v = JSON.parse(store.get('lipy:veil') || 'null'); } catch (e) { v = null; }
    store.del('lipy:veil');
    if (v) { veil.style.setProperty('--vc1', v.c1); veil.style.setProperty('--vc2', v.c2); if (v.icon) vImg.src = v.icon; else vIcon.style.display = 'none'; }
    var tl = gsap.timeline({
      paused: true,
      onComplete: function () { html.classList.remove('is-entering'); veil.classList.remove('is-on'); gsap.set([fill, vIcon], { clearProps: 'all' }); vIcon.style.display = ''; }
    });
    tl.to(vIcon, { scale: 0.7, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .fromTo(fill, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 1.05, ease: 'lipyIO' }, 0.1);
    return tl;
  }
  W.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    // voltou pelo histórico com a página congelada: tira o véu que tinha coberto a tela e fecha menus
    fechaMenus();
    html.classList.remove('is-entering');
    if (veil) { veil.classList.remove('is-on'); gsap.set([fill, vIcon], { clearProps: 'all' }); }
    if (lenis) lenis.start();
  });

  /* ---------------- pré-carregador (só na 1ª visita da sessão, na home) ---------------- */
  function preCarrega() {
    var l = $('.loader');
    if (!l || !html.classList.contains('is-loading')) return null;
    // a raiz ainda está decidindo o idioma: a abertura espera (se a página for trocada, ela roda na do idioma)
    if (html.classList.contains('is-detectando')) {
      return new Promise(function (r) { d.addEventListener('lipy:idioma', function () { r(preCarrega()); }, { once: true }); });
    }
    var cont = $('.loader__count b', l), barra = $('.loader__bar i', l), marca = $('.loader__mark', l);
    var tarefas = [];
    var espera = function (p, max) { return Promise.race([p, new Promise(function (r) { setTimeout(r, max); })]); };
    // no celular a abertura espera menos pelas fontes (elas trocam sozinhas quando chegam)
    if (d.fonts && d.fonts.ready) tarefas.push(espera(d.fonts.ready, TOUCH ? 1800 : 3000));
    $$('[data-preload]').forEach(function (m) {
      tarefas.push(espera(new Promise(function (r) {
        if (m.tagName === 'VIDEO') { if (m.readyState >= 3) r(); else { m.addEventListener('canplaythrough', r, { once: true }); m.addEventListener('error', r, { once: true }); } }
        else if (m.complete) r();
        else { m.addEventListener('load', r, { once: true }); m.addEventListener('error', r, { once: true }); }
      }), 5000));
    });
    var feito = 0, o = { v: 0 };
    var mostra = function () { cont.textContent = ('00' + Math.round(o.v)).slice(-3); barra.style.transform = 'scaleX(' + (o.v / 100) + ')'; };
    gsap.to(marca, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'lipyIO', delay: 0.15 });
    var avanca = function (alvo, dur) { return gsap.to(o, { v: alvo, duration: dur, ease: 'power2.out', onUpdate: mostra, overwrite: true }); };
    avanca(18, 0.8);
    tarefas.forEach(function (t) { t.then(function () { feito++; avanca(18 + 72 * feito / tarefas.length, 0.9); }); });
    return new Promise(function (resolve) {
      Promise.all(tarefas).then(function () {
        var tl = gsap.timeline({ delay: TOUCH ? 0.1 : 0.25 });
        if (TOUCH) tl.timeScale(1.35); // celular: a mesma abertura, mais ágil (quem está no 4G tem menos paciência)
        tl.to(o, { v: 100, duration: 0.7, ease: 'power2.inOut', onUpdate: mostra })
          .to(marca, { scale: 0.86, duration: 0.5, ease: 'power2.in' })
          .to($$('.loader__count, .loader__label, .loader__ring, .loader__glass', l), { opacity: 0, duration: 0.4 }, '<')
          .to(marca, { scale: 14, opacity: 0, duration: 1.1, ease: 'expo.in' }, '-=0.1')
          .add(function () { resolve(); }, '-=0.35')
          .to(l, { yPercent: -100, duration: 1.1, ease: 'lipyIO' }, '-=0.45')
          .fromTo($('.loader__curtain path', l), { attr: { d: 'M0 0 Q50 0 100 0 L100 0 L0 0Z' } }, { attr: { d: 'M0 0 Q50 100 100 0 L100 0 L0 0Z' }, duration: 0.55, ease: 'power2.in' }, '<')
          .to($('.loader__curtain path', l), { attr: { d: 'M0 0 Q50 0 100 0 L100 0 L0 0Z' }, duration: 0.55, ease: 'power2.out' })
          // "já vi a abertura" só depois de ela acontecer de verdade (antes, um redirecionamento no meio a perdia)
          .add(function () { store.set('lipy:visto', '1'); html.classList.remove('is-loading'); l.remove(); ScrollTrigger.refresh(); });
      });
    });
  }

  /* ---------------- partida ---------------- */
  function inicia() {
    nav();
    cursor();
    imas();
    tilts();
    textos();
    aparicoes();
    parallax();
    contadores();
    tracos();
    marquees();
    lojas();
    players();
    galerias();
    inscricoes();
    rodape();
    $$('.glass[data-lens]').forEach(function (el) {
      var o = {}; (el.getAttribute('data-lens') || '').split(',').forEach(function (kv) { var p = kv.split(':'); if (p[1]) o[p[0].trim()] = +p[1]; });
      Glass.apply(el, o);
    });

    var carga = preCarrega();
    var veu = entra();
    if (carga) carga.then(ready);
    else if (veu) {
      var ok = d.fonts && d.fonts.ready ? Promise.race([d.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]) : Promise.resolve();
      ok.then(function () { veu.play(); gsap.delayedCall(0.45, ready); });
    } else ready();

    // o "Acesso antecipado" aponta para a lista da home (funciona sem JS); se a página tem a própria lista, vai para ela
    if (d.getElementById('lista')) $$('a[href$="index.html#lista"]').forEach(function (a) { a.setAttribute('href', location.pathname + '#lista'); });
    idiomas();

    var refresh = function () { ScrollTrigger.refresh(); };
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(refresh);
    W.addEventListener('load', function () {
      refresh();
      // chegou com #âncora de outra página: os espaços dos trechos fixos só existem depois do refresh
      var alvo = location.hash && d.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (alvo) requestAnimationFrame(function () {
        var y = alvo.getBoundingClientRect().top + W.scrollY;
        if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else W.scrollTo(0, y);
      });
    });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', inicia);
  else inicia();
})();
