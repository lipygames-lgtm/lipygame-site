/* ==========================================================================
   THIS LEVEL HATES YOU — a pegadinha interativa, o baralho e o elenco
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  if (!L || !window.gsap) return;
  var $ = L.$, $$ = L.$$, RM = L.RM, TOUCH = L.TOUCH;
  var M = L.base + 'assets/media/tlhy/';

  /* ---------------- passarinho: bordões (falas reais do jogo) ---------------- */
  var BORDOES = [L.t('“Ponte em manutenção! HAHAHA!”'), L.t('“Fica paradinho aí enquanto eu fico rico! kkkkk”'), L.t('“Obrigado por jogar! E morrer. Principalmente morrer.”'), L.t('“Cobre tudo. Menos armadilhas.”')];
  var bordao = $('[data-bordao]');
  if (bordao) {
    var bi = 0;
    setInterval(function () {
      bi = (bi + 1) % BORDOES.length;
      if (RM) { bordao.textContent = BORDOES[bi]; return; }
      gsap.to(bordao, { opacity: 0, y: -8, duration: 0.3, onComplete: function () { bordao.textContent = BORDOES[bi]; gsap.fromTo(bordao, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }); } });
    }, 3600);
  }
  // o passarinho bate as asas
  if (!RM) $$('[data-passaro], .t-passaro, [data-gag="passaro"] img').forEach(function (img) {
    var a = true;
    setInterval(function () { a = !a; img.src = M + (a ? 'passaro-a' : 'passaro-b') + '.webp'; }, 190);
  });
  // no toque, o "amigo" mostra a cara verdadeira
  $$('.ator--amigo').forEach(function (c) { c.addEventListener('click', function () { c.classList.toggle('is-mau'); }); });

  /* ---------------- baralho: as cartas se abrem em leque com a rolagem ---------------- */
  var mesa = $('[data-deck]');
  if (mesa) {
    var cartas = $$('.deck__carta', mesa), n = cartas.length, meio = (n - 1) / 2;
    cartas.forEach(function (c, i) { c.style.zIndex = 10 - Math.abs(i - meio); });
    var leque = function (p) {
      var larg = Math.min(window.innerWidth, 1400), passo = larg / (n + 1.2);
      cartas.forEach(function (c, i) {
        var k = i - meio;
        gsap.set(c, { x: k * passo * p, y: Math.abs(k) * 18 * p, rotation: k * 5 * p + (1 - p) * (i % 2 ? 4 : -4) });
      });
    };
    if (RM) leque(1);
    else {
      leque(0);
      ScrollTrigger.create({ trigger: mesa, start: 'top 85%', end: 'center 45%', scrub: 0.8, onUpdate: function (s) { leque(gsap.parseEase('power2.out')(s.progress)); }, onRefresh: function (s) { leque(gsap.parseEase('power2.out')(s.progress)); } });
    }
  }

  /* ---------------- a pegadinha ---------------- */
  var cena = $('[data-gag]');
  if (!cena) return;
  var q = function (k) { return $('[data-gag="' + k + '"]', cena.parentNode.parentNode); };
  var heroi = q('heroi'), porta = q('porta'), ponte = q('ponte'), bigorna = q('bigorna'), bicho = q('bicho'), bola = q('bola');
  var boom = q('boom'), fala = q('fala'), vitoria = q('vitoria'), cont = q('mortes'), bt = q('andar'), status = q('status');
  var btTxt = bt.firstChild;
  var mortes = 0, tentativa = 0, rodando = false;
  var pose = function (p) { heroi.src = M + 'heroi/' + p + '.webp'; };
  var H = function () { return cena.clientHeight; };
  var W = function () { return cena.clientWidth; };
  var STATUS = [L.t('Tentativa 1. Confia.'), L.t('Tentativa 2. Agora vai.'), L.t('Tentativa 3. Com certeza agora.'), L.t('Tentativa 4. Confia no processo.'), L.t('Tentativa 5. Quase lá (mentira).'), L.t('Tentativa 6. Essa é a boa. Será?')];
  var FALAS = [
    L.t('Ponte em manutenção! HAHAHA!'),
    L.t('Olha pra cima da próxima vez. kkkkk'),
    L.t('Nem o chão é seu amigo.'),
    L.t('A porta tava com fome. HAHAHA!'),
    L.t('Achou que a bola era enfeite?')
  ];

  function diz(txt) {
    fala.textContent = txt;
    if (!RM) gsap.fromTo(fala, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' });
  }
  function reseta() {
    gsap.killTweensOf([heroi, porta, ponte, bigorna, bicho, bola, boom]);
    gsap.set(heroi, { left: '5%', x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, opacity: 1 });
    gsap.set(ponte, { y: 0, rotation: 0 });
    gsap.set(bigorna, { yPercent: -160, y: 0 });
    gsap.set(bicho, { yPercent: 110, y: 0 });
    gsap.set(bola, { rotation: -120 });
    gsap.set(porta, { scale: 1 });
    gsap.set(boom, { opacity: 0 });
    porta.src = M + 'porta.webp';
    pose('parado');
  }
  function explode(tl, quando) {
    tl.add(function () {
      var r = heroi.getBoundingClientRect(), rc = cena.getBoundingClientRect(), bw = boom.getBoundingClientRect().width || W() * 0.14;
      gsap.set(boom, { left: (r.left - rc.left + r.width / 2 - bw / 2) + 'px', top: (r.top - rc.top + r.height / 2 - bw / 2) + 'px' });
      gsap.fromTo(boom, { opacity: 1, scale: 0.3, rotation: -20 }, { scale: 1.3, rotation: 10, duration: 0.5, ease: 'back.out(2)' });
      gsap.to(boom, { opacity: 0, duration: 0.3, delay: 0.45 });
      gsap.fromTo(cena, { x: 0 }, { x: 9, duration: 0.05, repeat: 7, yoyo: true, clearProps: 'x' });
      if (navigator.vibrate) try { navigator.vibrate([30, 30, 60]); } catch (e) { /* sem vibração */ }
    }, quando);
  }
  function anda(tl, ate, dur) { tl.add(function () { pose('correndo'); }).to(heroi, { left: ate + '%', duration: dur, ease: 'none' }); }
  function pula(tl, ate, dur) {
    tl.add(function () { pose('surpreso'); })
      .to(heroi, { left: ate + '%', duration: dur, ease: 'none' })
      .to(heroi, { keyframes: { y: [0, -H() * 0.26, 0], easeEach: 'sine.inOut' }, duration: dur }, '<')
      .add(function () { pose('correndo'); });
  }
  function morreu(tl) {
    tl.add(function () {
      mortes++;
      cont.textContent = mortes;
      gsap.fromTo(cont, { scale: 2.2 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
      diz(FALAS[Math.min(tentativa, FALAS.length - 1)]);
    });
    tl.to({}, { duration: 1.1 });
    tl.to(heroi, { opacity: 0, duration: 0.25 });
    tl.add(function () {
      tentativa++;
      reseta();
      gsap.fromTo(heroi, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' });
      status.textContent = STATUS[Math.min(tentativa, STATUS.length - 1)];
    });
  }

  function roteiro() {
    var tl = gsap.timeline({ onComplete: function () { rodando = false; bt.disabled = false; } });
    switch (tentativa) {
      case 0: // a ponte cai
        anda(tl, 43, 1.1);
        tl.to(ponte, { y: H() * 0.5, rotation: 9, duration: 0.55, ease: 'power2.in' })
          .add(function () { pose('caindo'); }, '<')
          .to(heroi, { y: H() * 0.7, rotation: 30, duration: 0.6, ease: 'power2.in' }, '<0.05');
        morreu(tl);
        break;
      case 1: // aprendeu a pular... e a bigorna
        anda(tl, 34, 0.8); pula(tl, 55, 0.6); anda(tl, 60, 0.3);
        tl.add(function () { pose('parado'); diz(L.t('Ufa, né?')); })
          .to({}, { duration: 0.5 })
          .add(function () { gsap.set(bigorna, { left: heroi.style.left }); })
          .fromTo(bigorna, { yPercent: -160, y: 0 }, { yPercent: 0, y: H() * 0.78 - bigorna.offsetHeight * 1.02, duration: 0.32, ease: 'power3.in' })
          .to(heroi, { scaleY: 0.25, scaleX: 1.4, duration: 0.08 }, '>-0.02');
        explode(tl, '<');
        morreu(tl);
        break;
      case 2: // desvia da bigorna olhando pra cima... e o chão morde
        anda(tl, 34, 0.8); pula(tl, 55, 0.6);
        tl.add(function () { pose('medo'); });
        tl.to(heroi, { left: '69%', duration: 0.9, ease: 'none' })
          .to(bicho, { yPercent: 0, duration: 0.18, ease: 'back.out(3)' })
          .add(function () { pose('susto'); }, '<')
          .to(heroi, { y: -H() * 0.4, rotation: -200, left: '60%', duration: 0.6, ease: 'power2.out' });
        explode(tl, '<0.05');
        morreu(tl);
        break;
      case 3: // pula o bicho e chega na porta... que come
        anda(tl, 34, 0.8); pula(tl, 55, 0.6); anda(tl, 62, 0.35); pula(tl, 80, 0.55); anda(tl, 84, 0.25);
        tl.add(function () { porta.src = M + 'porta-monstro.webp'; pose('susto'); })
          .fromTo(porta, { scale: 1 }, { scale: 1.25, duration: 0.2, ease: 'back.out(3)' })
          .to(heroi, { left: '88%', scale: 0, rotation: 90, duration: 0.3, ease: 'power2.in' })
          .to(porta, { scale: 1, duration: 0.3, ease: 'elastic.out(1, .4)' });
        explode(tl, '<');
        morreu(tl);
        break;
      case 4: // a bola de espinhos
        anda(tl, 34, 0.8); pula(tl, 55, 0.6); anda(tl, 62, 0.35);
        tl.add(function () { pose('correndo'); })
          .to(heroi, { left: '68%', duration: 0.3, ease: 'none' })
          .to(bola, { rotation: 0, duration: 0.45, ease: 'power2.in' }, '<-0.1')
          .add(function () { pose('tonto'); })
          .to(heroi, { left: '20%', y: -H() * 0.45, rotation: -540, duration: 0.8, ease: 'power2.out' })
          .to(bola, { rotation: 60, duration: 0.8, ease: 'power1.out' }, '<');
        explode(tl, '<');
        morreu(tl);
        break;
      default: // finalmente
        anda(tl, 34, 0.8); pula(tl, 55, 0.6); anda(tl, 62, 0.35); pula(tl, 80, 0.55); anda(tl, 86, 0.3);
        tl.add(function () { pose('vitoria'); diz(L.t('Parabéns! Pela fase 1. kkkk')); })
          .to(heroi, { scale: 0.6, opacity: 0, duration: 0.5, delay: 0.3 })
          .add(function () {
            vitoria.hidden = false;
            if (!RM) gsap.from($$('b, span', vitoria), { scale: 0.4, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2.2)' });
            if (L.confete) L.confete(bt);
            if (L.conquista) L.conquista(L.t('Sobrevivente'), L.t('Passou da fase 1 em {n} tentativas. Faltam 65.', { n: tentativa + 1 }));
            status.textContent = L.t('{n} mortes, 1 porta. O jogo tem 66 fases assim — e nenhuma armadilha se repete.', { n: mortes });
            btTxt.nodeValue = L.t('Jogar de novo') + ' ';
            tentativa = -1;
          });
    }
    return tl;
  }

  function reduzido() {
    // sem animação: só conta a história
    if (tentativa < 5) { mortes++; cont.textContent = mortes; diz(FALAS[tentativa]); tentativa++; status.textContent = STATUS[tentativa]; }
    else { vitoria.hidden = false; status.textContent = L.t('Passou! O jogo tem 66 fases assim.'); btTxt.nodeValue = L.t('Jogar de novo') + ' '; tentativa = -1; }
    bt.disabled = false; rodando = false;
  }

  bt.addEventListener('click', function () {
    if (rodando) return;
    if (tentativa === -1) { tentativa = 0; mortes = 0; cont.textContent = '0'; vitoria.hidden = true; btTxt.nodeValue = L.t('Andar até a porta') + ' '; status.textContent = STATUS[0]; diz(L.t('De novo? Adoro.')); reseta(); return; }
    rodando = true; bt.disabled = true;
    if (RM) { reduzido(); return; }
    roteiro();
  });
  reseta();
})();
