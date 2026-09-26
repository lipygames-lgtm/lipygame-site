/* ==========================================================================
   QUIVER — mini-puzzle jogável + arenas
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  if (!L || !window.gsap) return;
  var $ = L.$, $$ = L.$$, RM = L.RM;
  var UI = L.base + 'assets/media/quiver/ui/';

  /* ---------------- arenas: abas com fundo que troca ---------------- */
  var abasArena = $('[data-arenas]');
  if (abasArena) {
    var bgs = $$('.arenas__bgs img');
    L.abas(abasArena, function (i, bt, inicio) {
      bgs.forEach(function (b, j) { b.classList.toggle('is-on', j === i); });
      var painel = $$('.arena')[i];
      if (!painel || RM) return;
      if (inicio) return;
      gsap.fromTo($('.arena__boss', painel), { scale: 0.82, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.4)' });
      gsap.fromTo($$('.arena__txt > *', painel), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 });
      var ph = $('.arena__phone', painel);
      if (ph) gsap.fromTo(ph, { y: 80, rotate: 9, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 1.1, clearProps: 'transform,opacity' });
    });
    if (!RM) gsap.from('.arena:not([hidden]) .arena__boss', { scale: 0.8, opacity: 0, duration: 1.4, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.arenas', start: 'top 60%', once: true } });
  }

  /* ---------------- o mini-puzzle ---------------- */
  var board = $('[data-q="board"]');
  if (!board) return;
  var DIRS = [
    { dx: 0, dy: -1, nome: L.t('para cima'), img: 'seta-cima-azul', rastro: 'rastro-azul', rot: 0 },
    { dx: 1, dy: 0, nome: L.t('para a direita'), img: 'seta-dir-verde', rastro: 'rastro-azul', rot: 90, hue: -95 },
    { dx: 0, dy: 1, nome: L.t('para baixo'), img: 'seta-baixo-vermelha', rastro: 'rastro-vermelho', rot: 180 },
    { dx: -1, dy: 0, nome: L.t('para a esquerda'), img: 'seta-esq-amarela', rastro: 'rastro-amarelo', rot: 270 }
  ];
  var el = function (k) { return $('[data-q="' + k + '"]'); };
  var hudMov = el('mov'), hudErr = el('erros'), hudTempo = el('tempo'), combo = el('combo'), win = el('win'), dica = el('dica');
  var N, grade, tiles, mov, erros, t0, relogio, ultimoAcerto, seq, restantes, tVitoria;

  // som curtinho sintetizado (só depois do 1º toque, que é quando o navegador deixa)
  var ac = null;
  function bip(tipo) {
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
      o.connect(g); g.connect(ac.destination);
      if (tipo === 'ok') { o.type = 'triangle'; o.frequency.setValueAtTime(520 + seq * 60, t); o.frequency.exponentialRampToValueAtTime(1180 + seq * 90, t + 0.09); }
      else { o.type = 'sawtooth'; o.frequency.setValueAtTime(150, t); o.frequency.linearRampToValueAtTime(95, t + 0.16); }
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(tipo === 'ok' ? 0.06 : 0.035, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (tipo === 'ok' ? 0.14 : 0.2));
      o.start(t); o.stop(t + 0.22);
    } catch (e) { /* sem áudio: segue o jogo */ }
  }
  var vibra = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) { /* ignora */ } };

  function caminhoLivre(g, x, y, d) {
    var cx = x + d.dx, cy = y + d.dy;
    while (cx >= 0 && cy >= 0 && cx < N && cy < N) {
      if (g[cy][cx] != null) return { x: cx, y: cy };
      cx += d.dx; cy += d.dy;
    }
    return null;
  }
  // monta ao contrário: cada seta nova só entra com o caminho livre naquele instante, então tirar na ordem
  // inversa sempre funciona — a fase SEMPRE tem solução
  function gera() {
    var melhor = null;
    for (var tent = 0; tent < 40; tent++) {
      var g = [], alvo = Math.round(N * N * (N > 5 ? 0.78 : 0.8)), vazias = [];
      for (var y = 0; y < N; y++) { g.push([]); for (var x = 0; x < N; x++) { g[y].push(null); vazias.push([x, y]); } }
      var postas = 0, falhas = 0;
      while (postas < alvo && falhas < 400) {
        var k = Math.floor(Math.random() * vazias.length), c = vazias[k];
        var ops = [0, 1, 2, 3].filter(function (di) { return !caminhoLivre(g, c[0], c[1], DIRS[di]); });
        if (!ops.length) { falhas++; continue; }
        g[c[1]][c[0]] = ops[Math.floor(Math.random() * ops.length)];
        vazias.splice(k, 1);
        postas++;
      }
      var livres = 0;
      for (y = 0; y < N; y++) for (x = 0; x < N; x++) if (g[y][x] != null && !caminhoLivre(g, x, y, DIRS[g[y][x]])) livres++;
      var nota = Math.abs(livres - Math.max(2, N - 3)) + (postas < alvo ? 3 : 0);
      if (!melhor || nota < melhor.nota) melhor = { g: g, nota: nota };
      if (nota === 0) break;
    }
    return melhor.g;
  }

  function fmt(s) { return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function tique() { hudTempo.textContent = fmt(Math.floor((Date.now() - t0) / 1000)); }

  function monta() {
    N = window.innerWidth < 600 ? 5 : 6;
    board.style.setProperty('--n', N);
    grade = gera();
    board.innerHTML = '';
    tiles = [];
    mov = 0; erros = 0; t0 = 0; seq = 0; ultimoAcerto = 0; restantes = 0;
    clearInterval(relogio);
    clearTimeout(tVitoria);
    hudMov.textContent = '0'; hudErr.textContent = '0'; hudTempo.textContent = '0:00';
    win.hidden = true;
    for (var y = 0; y < N; y++) {
      tiles.push([]);
      for (var x = 0; x < N; x++) {
        var cel = document.createElement('div');
        cel.className = 'qp__cell';
        board.appendChild(cel);
        var di = grade[y][x];
        if (di == null) { tiles[y].push(null); continue; }
        restantes++;
        var bt = document.createElement('button');
        bt.type = 'button';
        bt.className = 'qp__tile';
        bt.setAttribute('aria-label', L.t('Seta {dir}, linha {l}, coluna {c}', { dir: DIRS[di].nome, l: y + 1, c: x + 1 }));
        bt.innerHTML = '<img src="' + UI + DIRS[di].img + '.webp" alt="">';
        bt.addEventListener('click', toque.bind(null, x, y));
        cel.appendChild(bt);
        tiles[y].push(bt);
      }
    }
    if (!RM) gsap.from($$('.qp__tile', board), { scale: 0, rotate: -30, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: { amount: 0.6, from: 'random' } });
    dica.textContent = L.t('Dica: comece pelas setas que apontam para a borda mais próxima.');
  }

  function toque(x, y) {
    var di = grade[y][x], bt = tiles[y][x];
    if (di == null || !bt) return;
    if (!t0) { t0 = Date.now(); relogio = setInterval(tique, 1000); }
    var d = DIRS[di], bloqueio = caminhoLivre(grade, x, y, d);
    if (bloqueio) {
      erros++; hudErr.textContent = erros; seq = 0;
      bip('erro'); vibra([24, 40, 24]);
      dica.textContent = L.t('Bloqueada! Tem uma seta no caminho — tire ela primeiro.');
      var culpa = tiles[bloqueio.y][bloqueio.x];
      if (!RM) {
        gsap.fromTo(bt, { x: 0 }, { x: d.dx ? 8 * d.dx : 5, y: d.dy ? 8 * d.dy : 0, duration: 0.07, repeat: 3, yoyo: true, clearProps: 'x,y' });
        bt.classList.add('is-blocked'); setTimeout(function () { bt.classList.remove('is-blocked'); }, 380);
        if (culpa) { culpa.classList.remove('is-culpa'); void culpa.offsetWidth; culpa.classList.add('is-culpa'); }
      }
      return;
    }
    // saiu voando
    grade[y][x] = null; tiles[y][x] = null; restantes--;
    mov++; hudMov.textContent = mov;
    var agora = Date.now();
    seq = agora - ultimoAcerto < 1400 ? seq + 1 : 1;
    ultimoAcerto = agora;
    bip('ok'); vibra(12);
    // o foco não pode cair no vazio: passa para a próxima seta
    if (document.activeElement === bt) { var prox = $$('.qp__tile:not([disabled])', board).filter(function (x) { return x !== bt; })[0]; if (prox) prox.focus({ preventScroll: true }); }
    bt.disabled = true;
    var cel = bt.parentNode, r = board.getBoundingClientRect(), rc = cel.getBoundingClientRect();
    var fora = d.dx > 0 ? r.right - rc.left + 160 : d.dx < 0 ? rc.right - r.left + 160 : d.dy > 0 ? r.bottom - rc.top + 160 : rc.bottom - r.top + 160;
    if (RM) { bt.remove(); }
    else {
      // rastro de laser na direção da seta
      var ras = document.createElement('img');
      ras.src = UI + d.rastro + '.webp';
      ras.alt = '';
      ras.className = 'qp__rastro';
      if (d.hue) ras.style.filter = 'hue-rotate(' + d.hue + 'deg) saturate(1.6)';
      var cs = rc.width;
      ras.style.left = (rc.left - r.left + cs / 2 - 22) + 'px';
      ras.style.top = (rc.top - r.top + cs / 2 - 140) + 'px';
      ras.style.height = '140px';
      board.appendChild(ras);
      gsap.set(ras, { rotation: d.rot, transformOrigin: '50% 100%' });
      gsap.fromTo(ras, { scaleY: 0.2, opacity: 1 }, { scaleY: 1.6, opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: function () { ras.remove(); } });
      gsap.to(bt, {
        x: d.dx * fora, y: d.dy * fora, duration: 0.42, ease: 'power2.in',
        onComplete: function () { bt.remove(); }
      });
      gsap.to(bt, { opacity: 0, duration: 0.15, delay: 0.3 });
    }
    if (seq >= 2) {
      combo.textContent = 'COMBO ×' + seq;
      if (!RM) gsap.fromTo(combo, { opacity: 0, scale: 0.4, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(3)', onComplete: function () { gsap.to(combo, { opacity: 0, y: -10, duration: 0.4, delay: 0.45 }); } });
    }
    dica.textContent = restantes ? (seq >= 3 ? L.t('Isso! Mantenha o ritmo.') : '') : '';
    if (!restantes) venceu();
  }

  function venceu() {
    clearInterval(relogio);
    tique();
    var estrelas = erros === 0 ? 3 : erros <= 2 ? 2 : 1;
    $$('img', el('stars')).forEach(function (s, i) { s.classList.toggle('is-off', i >= estrelas); });
    var vars = { n: mov, t: hudTempo.textContent, e: erros };
    el('resumo').textContent = erros === 0 ? L.t('{n} setas em {t} sem nenhum erro. Agora imagine 360 fases assim.', vars) : erros === 1 ? L.t('{n} setas em {t} com 1 erro. Agora imagine 360 fases assim.', vars) : L.t('{n} setas em {t} com {e} erros. Agora imagine 360 fases assim.', vars);
    tVitoria = setTimeout(function () {
      win.hidden = false;
      if (!RM) {
        gsap.from(win, { opacity: 0, duration: 0.5 });
        gsap.from($$('.qp__stars img', win), { scale: 0, rotate: -90, duration: 0.7, stagger: 0.14, ease: 'back.out(2.5)', delay: 0.15 });
        gsap.from($$('b, p, button', win), { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.3 });
      }
      if (L.confete) L.confete(el('denovo'));
      if (L.conquista && estrelas === 3) L.conquista(L.t('Mestre das setas'), L.t('Tabuleiro limpo sem nenhum erro.'));
      el('denovo').focus({ preventScroll: true });
    }, RM ? 0 : 380);
  }

  el('nova').addEventListener('click', monta);
  el('denovo').addEventListener('click', monta);
  var larg = window.innerWidth;
  window.addEventListener('resize', function () {
    // só remonta se trocar de celular para computador (5x5 ↔ 6x6) e ninguém começou a jogar
    var n2 = window.innerWidth < 600 ? 5 : 6;
    if (n2 !== N && !t0 && Math.abs(window.innerWidth - larg) > 40) { larg = window.innerWidth; monta(); }
  });
  monta();
})();
