/* ==========================================================================
   SWARMORIA — minijogo do enxame (guie o Core, devore os cubos, multiplique)
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  if (!L) return;
  var $ = L.$, RM = L.RM, TOUCH = L.TOUCH;

  var arena = $('[data-swarm]');
  if (!arena) return;
  var cv = $('canvas', arena), ctx = cv.getContext('2d');
  if (!ctx) return;
  var elN = $('[data-sw="n"]', arena), elM = $('[data-sw="m"]', arena), dica = $('[data-sw="dica"]', arena);
  var fim = $('[data-sw="fim"]', arena), resumo = $('[data-sw="resumo"]', arena), deNovo = $('[data-sw="de-novo"]', arena);

  var img = function (n) { var i = new Image(); i.decoding = 'async'; i.src = L.base + 'assets/media/swarm/' + n + '.webp'; return i; };
  var IMG = { robo: img('robo-mini'), core: img('core-sm'), cubo: img('ic-matter'), cristal: img('ic-shard') };
  var pronta = function (i) { return i.complete && i.naturalWidth > 0; };

  var INICIO = 12, GRANDE = 60, MAX = TOUCH ? 140 : 200;
  var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, S = 1;
  var core, alvo, robos, objs, parts, N, M, t0, tempo, venceu, interagiu, avisou60, msgAte;

  var mede = function () {
    var r = arena.getBoundingClientRect();
    var w = Math.round(r.width), h = Math.round(r.height);
    if (!w || !h) return;
    var ex = W ? w / W : 1, ey = H ? h / H : 1;
    W = w; H = h; S = Math.max(0.62, Math.min(1.25, Math.min(W, H) / 520));
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // ao mudar o tamanho, tudo acompanha na mesma proporção
    if (core && (ex !== 1 || ey !== 1)) {
      [core, alvo].forEach(function (p) { p.x *= ex; p.y *= ey; });
      objs.forEach(function (o) { o.x *= ex; o.y *= ey; });
      robos.forEach(function (b) { b.x *= ex; b.y *= ey; });
    }
    if (core) objs.forEach(function (o) { o.r = o.r0 * S; });
  };

  // posição em coordenadas de paisagem (u = ao longo, v = através); no celular em pé, o "ao longo" vira a altura
  var em = function (u, v) { return H > W * 1.05 ? { x: v * W, y: u * H } : { x: u * W, y: v * H }; };
  // onde o Core nasce: em pé, abaixo do painel de contadores
  var inicio = function () { var p = em(0.1, 0.5); if (H > W * 1.05) p.y = Math.max(p.y, 64 + 46 * S); return p; };

  var monta = function () {
    objs = []; parts = []; robos = [];
    N = INICIO; M = 0; tempo = 0; t0 = 0; venceu = false; interagiu = false; avisou60 = false; msgAte = 0;
    var ini = inicio();
    core = { x: ini.x, y: ini.y, a: 0 };
    alvo = { x: ini.x, y: ini.y };
    var junta = function (o) { objs.push(o); return o; };
    junta(Object.assign(em(H > W * 1.05 ? 0.74 : 0.86, 0.5), { r0: 70, need: GRANDE, ganho: 120, mat: 500, tipo: 'cubo', grande: true }));
    // médios: os que realmente seguram o enxame (18 → 26 → 34 → 44 e só então o gigante)
    var medios = [[18, 8, 'cristal'], [26, 9, 'cubo'], [34, 10, 'cristal'], [44, 12, 'cubo']];
    var pequenos = [];
    // arena pequena (celular) leva menos cubos pequenos; a conta continua fechando: 12 + 6×2,5 ≥ 18 → 26 → 34 → 44 → 60
    for (var i = 0, np = W * H < 250000 ? 6 : 8; i < np; i++) pequenos.push([3 + Math.round(Math.random() * 7), 2 + (Math.random() < 0.5 ? 1 : 0)]);
    // cada objeto ocupa dois círculos: o corpo e o selo com o número, logo acima dele
    var circulos = function (x, y, r) { return [[x, y, r], [x, y - r - 18 * S, 24 * S]]; };
    var cabe = function (p, r) {
      if (Math.hypot(p.x - ini.x, p.y - ini.y) < r + 120 * S) return false;
      var meus = circulos(p.x, p.y, r);
      for (var j = 0; j < objs.length; j++) {
        var deles = circulos(objs[j].x, objs[j].y, objs[j].r0 * S);
        for (var a = 0; a < 2; a++) for (var b = 0; b < 2; b++) if (Math.hypot(meus[a][0] - deles[b][0], meus[a][1] - deles[b][1]) < meus[a][2] + deles[b][2] + 12 * S) return false;
      }
      return p.x > r + 8 && p.x < W - r - 8 && p.y > r + 48 * S && p.y < H - r - 8;
    };
    var sorteia = function (umin, umax, r0) {
      for (var k = 0; k < 80; k++) { var p = em(umin + Math.random() * (umax - umin), 0.12 + Math.random() * 0.76); if (cabe(p, r0 * S)) return p; }
      return em(umin + Math.random() * (umax - umin), 0.2 + Math.random() * 0.6);
    };
    medios.forEach(function (m, i) { junta(Object.assign(sorteia(0.34 + i * 0.08, 0.5 + i * 0.07, 34), { r0: 34, need: m[0], ganho: m[1], mat: 40 + m[0] * 3, tipo: m[2] })); });
    pequenos.forEach(function (p) { junta(Object.assign(sorteia(0.18, 0.72, 19), { r0: 19, need: p[0], ganho: p[1], mat: 8 + p[0] * 2, tipo: 'cubo' })); });
    objs.forEach(function (o) { o.r = o.r0 * S; o.prog = 0; o.bloq = 0; o.vivo = true; o.giro = Math.random() * 0.5 - 0.25; o.fase = Math.random() * 6; });
    for (var n = 0; n < Math.min(N, MAX); n++) nasce(core.x, core.y);
    hud(true);
    fim.hidden = true;
    fala(TOUCH ? L.t('Toque ou arraste para guiar o enxame') : L.t('Arraste para guiar o enxame'), 0);
  };

  var nasce = function (x, y) {
    robos.push({ x: x + (Math.random() - 0.5) * 20, y: y + (Math.random() - 0.5) * 20, vx: 0, vy: 0, a: Math.random() * Math.PI * 2, d: Math.sqrt(Math.random()), w: (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.5), f: Math.random() * 6 });
  };

  var nAnt = -1, mAnt = -1;
  var hud = function (forca) {
    if (N !== nAnt || forca) { elN.textContent = '×' + L.numero(N); if (!forca && !RM && window.gsap) gsap.fromTo(elN, { scale: 1.3 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' }); nAnt = N; }
    if (M !== mAnt || forca) { elM.textContent = L.numero(M); mAnt = M; }
  };
  var fala = function (txt, dur) {
    if (txt) { dica.textContent = txt; dica.classList.remove('is-off'); msgAte = dur ? tempoReal() + dur : 0; }
    else dica.classList.add('is-off');
  };
  var tempoReal = function () { return performance.now() / 1000; };

  /* ---------------- controle: o Core vai aonde o dedo/mouse aponta ---------------- */
  var aponta = function (e) {
    if (!core || venceu || (e.target && e.target.closest && e.target.closest('[data-sw="fim"]'))) return;
    var r = arena.getBoundingClientRect();
    alvo.x = Math.max(0, Math.min(W, e.clientX - r.left));
    alvo.y = Math.max(0, Math.min(H, e.clientY - r.top));
    if (!interagiu) { interagiu = true; t0 = tempo; fala(null); }
    liga();
  };
  // mouse: o Core segue o ponteiro. Toque: só um toque de verdade (sem rolar) ou um arrasto para o lado guiam;
  // um arrasto vertical é rolagem da página (touch-action: pan-y) e não mexe no jogo
  var dedo = null;
  arena.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse') { aponta(e); return; }
    dedo = { id: e.pointerId, x: e.clientX, y: e.clientY, guiando: false };
  });
  arena.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'mouse') { aponta(e); return; }
    if (!dedo || dedo.id !== e.pointerId) return;
    var dx = Math.abs(e.clientX - dedo.x), dy = Math.abs(e.clientY - dedo.y);
    if (!dedo.guiando && dx > 8 && dx > dy) dedo.guiando = true;
    if (dedo.guiando) aponta(e);
  });
  arena.addEventListener('pointerup', function (e) {
    if (e.pointerType === 'mouse' || !dedo || dedo.id !== e.pointerId) return;
    if (dedo.guiando || Math.hypot(e.clientX - dedo.x, e.clientY - dedo.y) < 12) aponta(e);
    dedo = null;
  });
  arena.addEventListener('pointercancel', function () { dedo = null; });
  deNovo.addEventListener('click', function () {
    monta();
    // movimento reduzido: parado até a próxima jogada
    if (RM) { desliga(); desenha(); } else liga();
  });

  /* ---------------- simulação ---------------- */
  var passo = function (dt) {
    tempo += dt;
    var agora = tempoReal();
    if (msgAte && agora > msgAte) { msgAte = 0; fala(null); }
    // antes do primeiro toque, o Core "respira" perto do início, sem comer nada
    if (!interagiu) { var ini = inicio(); alvo.x = ini.x + Math.cos(tempo * 0.9) * 26 * S; alvo.y = ini.y + Math.sin(tempo * 1.3) * 22 * S; }
    var dx = alvo.x - core.x, dy = alvo.y - core.y, dist = Math.hypot(dx, dy), vmax = 330 * S * dt;
    if (dist > 0.5) { var k = Math.min(1, vmax / dist, 0.18 + dt * 6); core.x += dx * k; core.y += dy * k; }
    core.a += dt * 0.8;
    var nd = robos.length, R = (16 + 5.4 * Math.sqrt(nd)) * S;

    // o objeto que o enxame está atacando
    var come = null;
    if (interagiu && !venceu) {
      var melhor = 1e9;
      objs.forEach(function (o) {
        if (!o.vivo) return;
        var d = Math.hypot(o.x - core.x, o.y - core.y);
        if (d < o.r + R * 0.9 + 26 * S && d < melhor) { melhor = d; come = o; }
      });
      if (come && N < come.need) {
        if (come.bloq <= 0) fala(L.t('Precisa de {n} robôs. Devore os menores primeiro.', { n: L.numero(come.need) }), 2.2);
        come.bloq = 0.6;
        come = null;
      }
    }
    if (come) {
      var vel = Math.min(3, N / come.need) / (0.7 + come.need * 0.022);
      come.prog += dt * vel;
      if (Math.random() < dt * 30) faisca(come);
      if (come.prog >= 1) devora(come);
    }
    objs.forEach(function (o) { if (o.bloq > 0) o.bloq -= dt; });

    // robôs: seguem o Core em volta dele, ou cercam o objeto que estão devorando
    for (var i = 0; i < nd; i++) {
      var b = robos[i], gx, gy;
      b.a += b.w * dt;
      if (come) { var rr = come.r * (0.55 + b.d * 0.6); gx = come.x + Math.cos(b.a * 3) * rr; gy = come.y + Math.sin(b.a * 3) * rr; }
      else { gx = core.x + Math.cos(b.a) * b.d * R; gy = core.y + Math.sin(b.a) * b.d * R; }
      b.vx += (gx - b.x) * 9 * dt; b.vy += (gy - b.y) * 9 * dt;
      // separação dos vizinhos próximos (sem empilhar)
      for (var j = i + 1; j < nd; j++) {
        var c = robos[j], sx = b.x - c.x, sy = b.y - c.y, s2 = sx * sx + sy * sy, lim = 13 * S;
        if (s2 < lim * lim && s2 > 0.01) { var f = (lim - Math.sqrt(s2)) * 5 * dt; b.vx += sx * f; b.vy += sy * f; c.vx -= sx * f; c.vy -= sy * f; }
      }
      var damp = Math.exp(-8 * dt);
      b.vx *= damp; b.vy *= damp;
      b.x += b.vx * dt * 8; b.y += b.vy * dt * 8;
      b.f += dt * (6 + Math.hypot(b.vx, b.vy) * 0.4);
    }

    // partículas: faíscas e a matéria que volta para o Core
    for (var p = parts.length - 1; p >= 0; p--) {
      var q = parts[p];
      q.vida -= dt;
      if (q.orbe) {
        var ox = core.x - q.x, oy = core.y - q.y, od = Math.hypot(ox, oy);
        q.vx += ox / (od || 1) * 1500 * S * dt; q.vy += oy / (od || 1) * 1500 * S * dt;
        q.vx *= Math.pow(0.12, dt); q.vy *= Math.pow(0.12, dt);
        if (od < 16 * S || q.vida <= 0) {
          N += q.n; M += q.m;
          for (var z = 0; z < q.n && robos.length < MAX; z++) nasce(core.x, core.y);
          parts.splice(p, 1);
          if (!avisou60 && N >= GRANDE && !venceu) { avisou60 = true; fala(L.t('Agora! O cubo gigante já cai.'), 3); }
          continue;
        }
      } else { q.vx *= Math.pow(0.1, dt); q.vy *= Math.pow(0.1, dt); }
      q.x += q.vx * dt; q.y += q.vy * dt;
      if (q.vida <= 0) parts.splice(p, 1);
    }
    hud();
  };

  var faisca = function (o) {
    var a = Math.random() * Math.PI * 2, v = (60 + Math.random() * 140) * S;
    parts.push({ x: o.x + Math.cos(a) * o.r * 0.7, y: o.y + Math.sin(a) * o.r * 0.7, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 0.35 + Math.random() * 0.3, cor: Math.random() < 0.5 ? '#ffd27a' : '#9ff6ff' });
  };
  var devora = function (o) {
    o.vivo = false;
    for (var i = 0; i < 26; i++) {
      var a = Math.random() * Math.PI * 2, v = (120 + Math.random() * 260) * S;
      parts.push({ x: o.x, y: o.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 0.5 + Math.random() * 0.4, cor: o.tipo === 'cristal' ? '#c89bff' : '#6fd8ff' });
    }
    // a matéria vira orbes que voam de volta para o Core; cada orbe traz robôs novos
    var orbes = Math.min(o.ganho, o.grande ? 40 : 12), resto = o.ganho, mresto = o.mat;
    for (var k = 0; k < orbes; k++) {
      var n = Math.round(resto / (orbes - k)), m = Math.round(mresto / (orbes - k)); resto -= n; mresto -= m;
      var ang = Math.random() * Math.PI * 2, vv = (180 + Math.random() * 220) * S;
      parts.push({ orbe: true, n: n, m: m, x: o.x, y: o.y, vx: Math.cos(ang) * vv, vy: Math.sin(ang) * vv, vida: 2.4, cor: o.tipo === 'cristal' ? '#b27dff' : '#5ff0ff' });
    }
    if (o.grande) vence();
  };
  var vence = function () {
    venceu = true;
    fala(null);
    setTimeout(function () {
      var s = Math.max(1, Math.round(tempo - t0));
      resumo.textContent = L.t('{n} robôs · {m} de matéria · {s} s', { n: L.numero(N), m: L.numero(M), s: s });
      fim.hidden = false;
      if (!RM && window.gsap) gsap.fromTo(fim, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', clearProps: 'transform,opacity' });
      if (L.conquista) L.conquista(L.t('Assimilação completa'), L.t('O cubo gigante caiu diante de {n} robôs.', { n: L.numero(N) }));
    }, 1600);
  };

  /* ---------------- desenho ---------------- */
  var desenha = function () {
    ctx.clearRect(0, 0, W, H);
    var tt = tempo;
    // sombras + objetos
    objs.forEach(function (o) {
      if (!o.vivo) return;
      var enc = 1 - o.prog * 0.45, tr = o.prog > 0 ? (Math.random() - 0.5) * 4 * S * o.prog : 0;
      var r = o.r * enc, bob = Math.sin(tt * 1.6 + o.fase) * 3 * S;
      ctx.fillStyle = 'rgba(0,0,0,.35)';
      ctx.beginPath(); ctx.ellipse(o.x, o.y + r * 0.95, r * 0.8, r * 0.22, 0, 0, Math.PI * 2); ctx.fill();
      var im = o.tipo === 'cristal' ? IMG.cristal : IMG.cubo;
      ctx.save();
      ctx.translate(o.x + tr, o.y + bob + tr);
      ctx.rotate(o.giro + Math.sin(tt * 0.7 + o.fase) * 0.06);
      if (o.grande) { ctx.shadowColor = 'rgba(80,170,255,.8)'; ctx.shadowBlur = 40 * S; }
      if (pronta(im)) {
        var ar = im.naturalWidth / im.naturalHeight, h = r * 2.1, w = h * ar;
        if (o.tipo === 'cubo') { w = r * 2.1; h = w / ar; }
        ctx.drawImage(im, -w / 2, -h / 2, w, h);
      } else { ctx.fillStyle = '#2a7bff'; ctx.fillRect(-r, -r, r * 2, r * 2); }
      ctx.restore();
      // anel de progresso enquanto é devorado
      if (o.prog > 0) {
        ctx.strokeStyle = 'rgba(95,240,255,.9)'; ctx.lineWidth = 3 * S; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r + 8 * S, -Math.PI / 2, -Math.PI / 2 + o.prog * Math.PI * 2); ctx.stroke();
      }
      // selo com quantos robôs são necessários
      var ok = N >= o.need, pulsa = o.bloq > 0 ? 1 + Math.sin(tt * 30) * 0.08 : 1;
      var fs = (o.grande ? 17 : 12) * S, txt = String(o.need);
      ctx.font = '700 ' + fs.toFixed(1) + 'px Unbounded, Geist, system-ui, sans-serif';
      var tw = ctx.measureText(txt).width;
      var ic = fs * 1.15, pw = tw + ic + fs * 1.3, ph = fs * 1.75, px = o.x - pw / 2, py = o.y - o.r * enc - ph - 10 * S;
      ctx.save();
      ctx.translate(o.x, py + ph / 2); ctx.scale(pulsa, pulsa); ctx.translate(-o.x, -(py + ph / 2));
      ctx.fillStyle = ok ? 'rgba(4,22,44,.85)' : 'rgba(60,6,14,.88)';
      ctx.strokeStyle = ok ? 'rgba(95,240,255,.8)' : 'rgba(255,80,90,.95)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(px, py, pw, ph, ph / 2); else ctx.rect(px, py, pw, ph);
      ctx.fill(); ctx.stroke();
      if (pronta(IMG.robo)) ctx.drawImage(IMG.robo, px + fs * 0.5, py + (ph - ic * 0.78) / 2, ic, ic * 0.78);
      ctx.fillStyle = ok ? '#dffcff' : '#ffb3b8';
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.direction = 'ltr';
      ctx.fillText(txt, px + fs * 0.5 + ic + fs * 0.3, py + ph / 2 + 1);
      ctx.restore();
    });

    // robôs
    var rw = 21 * S, rh = rw * 75 / 96;
    if (pronta(IMG.robo)) {
      for (var i = 0; i < robos.length; i++) {
        var b = robos[i];
        ctx.drawImage(IMG.robo, b.x - rw / 2, b.y - rh / 2 + Math.sin(b.f) * 1.4 * S, rw, rh);
      }
    } else {
      ctx.fillStyle = '#dfe9f5';
      robos.forEach(function (b) { ctx.beginPath(); ctx.arc(b.x, b.y, 6 * S, 0, Math.PI * 2); ctx.fill(); });
    }

    // Core: brilho pulsante e a esfera girando
    var cr = 25 * S, pul = 1 + Math.sin(tt * 3) * 0.08;
    var g = ctx.createRadialGradient(core.x, core.y, cr * 0.3, core.x, core.y, cr * 2.6 * pul);
    g.addColorStop(0, 'rgba(95,240,255,.55)'); g.addColorStop(1, 'rgba(95,240,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(core.x, core.y, cr * 2.6 * pul, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(core.x, core.y); ctx.rotate(core.a);
    if (pronta(IMG.core)) ctx.drawImage(IMG.core, -cr, -cr * 212 / 220, cr * 2, cr * 2 * 212 / 220);
    else { ctx.fillStyle = '#5ff0ff'; ctx.beginPath(); ctx.arc(0, 0, cr * 0.7, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();

    // partículas
    ctx.globalCompositeOperation = 'lighter';
    parts.forEach(function (q) {
      var a = q.orbe ? 1 : Math.max(0, q.vida * 2);
      ctx.globalAlpha = Math.min(1, a);
      ctx.fillStyle = q.cor;
      ctx.beginPath(); ctx.arc(q.x, q.y, (q.orbe ? 4.2 : 2.4) * S, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  /* ---------------- laço: só roda enquanto a arena aparece ---------------- */
  var visivel = false, rodando = false, ult = 0, raf = 0;
  var quadro = function (t) {
    raf = 0;
    if (!rodando) return;
    var dt = Math.min(0.05, ult ? (t - ult) / 1000 : 0.016);
    ult = t;
    passo(dt);
    desenha();
    raf = requestAnimationFrame(quadro);
  };
  var liga = function () {
    if (!core || rodando || !visivel || document.hidden) return;
    if (RM && !interagiu) { desenha(); return; }
    rodando = true; ult = 0;
    raf = requestAnimationFrame(quadro);
  };
  var desliga = function () { rodando = false; if (raf) cancelAnimationFrame(raf); raf = 0; };

  var comecou = false;
  var inicia = function () {
    if (comecou) return;
    comecou = true;
    mede();
    // arena ainda sem tamanho (0×0): a fase só é montada quando ela ganhar tamanho (no ajusta)
    if (W && H) monta();
    var redesenha = function () { if (core && !rodando) desenha(); };
    Object.keys(IMG).forEach(function (k) { if (!pronta(IMG[k])) IMG[k].addEventListener('load', redesenha); });
    // se a arena virar de deitada para em pé (ou o contrário) antes do primeiro toque, remonta a fase
    var emPe = H > W * 1.05;
    var ajusta = function () {
      mede();
      if (!W || !H) return;
      if (!core) { emPe = H > W * 1.05; monta(); liga(); }
      else if ((H > W * 1.05) !== emPe) { emPe = H > W * 1.05; if (!interagiu) monta(); }
      redesenha();
    };
    if ('ResizeObserver' in window) new ResizeObserver(ajusta).observe(arena);
    else window.addEventListener('resize', ajusta);
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        visivel = e.isIntersecting;
        if (visivel) { inicia(); liga(); } else desliga();
      });
    }, { rootMargin: '100px 0px' }).observe(arena);
  } else { visivel = true; inicia(); liga(); }
  document.addEventListener('visibilitychange', function () { if (document.hidden) desliga(); else liga(); });
  // fotografia do estado, só para o teste automático (tools/teste-swarm.cjs)
  window.__swarm = function () {
    if (!core) return null;
    return { N: N, venceu: venceu, jogou: interagiu, orbes: parts.filter(function (q) { return q.orbe; }).length, core: { x: core.x, y: core.y }, objs: objs.map(function (o) { return { x: o.x, y: o.y, need: o.need, vivo: o.vivo, grande: !!o.grande }; }) };
  };
})();
