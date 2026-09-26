/* ==========================================================================
   NITROVENANT — botão de nitro, garagem 3D e curva de dificuldade
   ========================================================================== */
(function () {
  'use strict';
  var L = window.Lipy;
  if (!L || !window.gsap) return;
  var $ = L.$, $$ = L.$$, RM = L.RM;

  /* ---------------- NITRO: segure o botão ---------------- */
  var hero = $('.n-hero'), btn = $('[data-nitro]'), cv = $('[data-vel]');
  if (hero && btn && cv) {
    var fill = $('.n-nitro__fill', btn), pct = $('[data-nitro-p]', btn), boost = $('[data-boost]'), video = $('.n-phone video');
    var ctx = cv.getContext('2d'), linhas = [], forca = 0, carga = 0, segurando = false, estourou = false, ativo = false;
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mede = function () { var r = hero.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    mede();
    window.addEventListener('resize', mede);
    for (var i = 0; i < 140; i++) linhas.push({ a: Math.random() * Math.PI * 2, d: Math.random(), v: 0.4 + Math.random() * 1.2, w: 0.5 + Math.random() * 2, c: Math.random() < 0.25 ? '255,177,59' : '120,225,255' });
    function desenha() {
      ctx.clearRect(0, 0, W, H);
      if (forca < 0.01) return;
      var pr = $('.n-phone').getBoundingClientRect(), hr = hero.getBoundingClientRect();
      var cx = pr.left - hr.left + pr.width / 2, cy = pr.top - hr.top + pr.height / 2, max = Math.hypot(W, H);
      linhas.forEach(function (l) {
        l.d += l.v * 0.018 * (0.4 + forca * 2.2);
        if (l.d > 1) { l.d = Math.random() * 0.2; l.a = Math.random() * Math.PI * 2; }
        var r0 = 60 + l.d * max * 0.7, r1 = r0 + (30 + forca * 220) * l.v;
        var x0 = cx + Math.cos(l.a) * r0, y0 = cy + Math.sin(l.a) * r0, x1 = cx + Math.cos(l.a) * r1, y1 = cy + Math.sin(l.a) * r1;
        ctx.strokeStyle = 'rgba(' + l.c + ',' + (forca * 0.55 * l.d).toFixed(3) + ')';
        ctx.lineWidth = l.w;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      });
    }
    function tique(t, dt) {
      var s = (dt || 16) / 1000;
      carga = segurando ? Math.min(1, carga + s / 1.1) : Math.max(0, carga - s / 0.7);
      var alvo = segurando ? 0.35 + carga * 0.65 : 0;
      forca += (alvo - forca) * 0.08;
      fill.style.strokeDashoffset = (100 - carga * 100).toFixed(1);
      pct.textContent = segurando || carga > 0.02 ? Math.round(carga * 100) + '%' : L.t('SEGURE');
      if (video) video.playbackRate = 1 + forca * 1.5;
      if (!RM) {
        var sh = forca * (estourou ? 5 : 2);
        gsap.set($('.gh__grid', hero), { x: (Math.random() - 0.5) * sh, y: (Math.random() - 0.5) * sh });
        gsap.set($('.gh__bg img', hero), { scale: 1.06 + forca * 0.12, filter: 'blur(' + (2 + forca * 6).toFixed(1) + 'px) saturate(' + (1.35 + forca * 0.6).toFixed(2) + ') brightness(' + (0.5 + forca * 0.18).toFixed(2) + ')' });
      }
      if (carga >= 1 && !estourou) {
        estourou = true;
        hero.classList.add('is-boost');
        if (navigator.vibrate) try { navigator.vibrate([40, 30, 90]); } catch (e) { /* sem vibração */ }
        if (!RM) gsap.fromTo(boost, { opacity: 0, scale: 0.4, rotate: -12 }, { opacity: 1, scale: 1, rotate: -6, duration: 0.45, ease: 'back.out(2.6)' });
      }
      if (!segurando && estourou && carga < 0.9) { estourou = false; hero.classList.remove('is-boost'); gsap.to(boost, { opacity: 0, scale: 1.3, duration: 0.4 }); }
      desenha();
      if (!segurando && forca < 0.005 && carga <= 0) {
        ativo = false;
        gsap.ticker.remove(tique);
        gsap.set($('.gh__grid', hero), { x: 0, y: 0 });
        ctx.clearRect(0, 0, W, H);
      }
    }
    var liga = function (e) {
      if (e) e.preventDefault();
      segurando = true;
      btn.classList.add('is-on');
      if (!ativo) { ativo = true; gsap.ticker.add(tique); }
    };
    var solta = function () { segurando = false; btn.classList.remove('is-on'); };
    // soltar também quando o foco sai do botão ou a aba some (o keyup iria para outro lugar)
    btn.addEventListener('blur', solta);
    document.addEventListener('visibilitychange', function () { if (document.hidden) solta(); });
    btn.addEventListener('pointerdown', function (e) { btn.setPointerCapture && btn.setPointerCapture(e.pointerId); liga(e); });
    btn.addEventListener('pointerup', solta);
    btn.addEventListener('pointercancel', solta);
    btn.addEventListener('lostpointercapture', solta);
    btn.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) liga(e); });
    btn.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') solta(); });
    btn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }

  /* ---------------- garagem 3D (mesma montagem do jogo) ---------------- */
  var CARROS = {
    rook: { nome: 'Rook', classe: L.t('Compacto'), n: 1, preco: L.t('O primeiro da garagem'), desc: L.t('Pequeno, valente e o ponto de partida de toda corrida.'), lanc: { y: 0.415, z: -0.083 } },
    fury: { nome: 'Fury', classe: L.t('Muscle'), n: 7, preco: L.t('{n} créditos', { n: L.numero(95000) }), desc: L.t('Motor grande, paciência pequena. Feito para abrir caminho.'), lanc: { y: 0.341, z: -0.083 } },
    velocity: { nome: 'Velocity', classe: L.t('Elétrico'), n: 8, preco: L.t('{n} créditos', { n: L.numero(155000) }), desc: L.t('Silencioso, rápido e com o lançador sempre carregado.'), lanc: { y: 0.334, z: -0.083 } },
    vortex: { nome: 'Vortex', classe: L.t('Super'), n: 9, preco: L.t('{n} créditos', { n: L.numero(240000) }), desc: L.t('Baixo, largo e feito para cortar a horda ao meio.'), lanc: { y: 0.305, z: -0.021 } },
    overlord: { nome: 'Overlord', classe: L.t('Caminhão'), n: 11, preco: L.t('{n} créditos', { n: L.numero(540000) }), desc: L.t('Quando a horda vê o Overlord, é ela que troca de faixa.'), lanc: { y: 0.422, z: 0 } },
    golden: { nome: 'Golden', classe: L.t('Ultimate'), n: 12, preco: L.t('Compra única'), desc: L.t('Dourado, raro e o topo da garagem.'), lanc: { y: 0.315, z: -0.083 } },
    moto: { nome: 'Blade', classe: L.t('Moto'), n: 13, preco: L.t('Compra única'), desc: L.t('Troca couraça por força bruta. O lançador já vem no corpo.'), lanc: null }
  };
  var gar = $('#garagem'), view = $('[data-garagem]');
  if (gar && view) {
    var info = { n: $('[data-car-n]'), nome: $('[data-car-nome]'), classe: $('[data-car-classe]'), preco: $('[data-car-preco]'), desc: $('[data-car-desc]') };
    var load = $('[data-car-load]'), bts = $$('[data-carro]');
    var T = null, renderer, scene, camera, palco, cache = {}, lancador = null, atual = null, pronto = null, visivel = false, rot = 0.6, vel = 0, arrastando = false, x0 = 0, tentativa = 0;
    var carrega = function (src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); };
    var semTres = function () { gar.classList.add('is-sem3d'); load.hidden = true; };

    function mostraInfo(k) {
      var c = CARROS[k];
      info.n.textContent = L.t('Nº {n} / 13', { n: ('0' + c.n).slice(-2) });
      info.nome.textContent = c.nome;
      info.classe.textContent = c.classe;
      info.preco.textContent = c.preco;
      info.desc.textContent = c.desc;
      if (!RM) gsap.fromTo([info.nome, info.classe, info.preco, info.desc], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 });
      bts.forEach(function (b) { var on = b.getAttribute('data-carro') === k; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; });
    }

    function ambiente() {
      // reflexo barato: um céu em degradê + três "softboxes" (azul do nitro, laranja do fogo e branco)
      var pm = new T.PMREMGenerator(renderer), env = new T.Scene();
      var c = document.createElement('canvas'); c.width = 8; c.height = 256;
      var g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, '#dcecff'); gr.addColorStop(0.45, '#2a4270'); gr.addColorStop(0.55, '#140c08'); gr.addColorStop(1, '#040302');
      g.fillStyle = gr; g.fillRect(0, 0, 8, 256);
      var tx = new T.CanvasTexture(c); tx.colorSpace = T.SRGBColorSpace;
      env.add(new T.Mesh(new T.SphereGeometry(10, 32, 16), new T.MeshBasicMaterial({ map: tx, side: T.BackSide })));
      [[0, 7, 0, 0xffffff, 8, 4], [-7, 2, 3, 0x2ad8ff, 3, 6], [7, 1.5, -2, 0xff7a1a, 3, 5]].forEach(function (b) {
        var m = new T.Mesh(new T.PlaneGeometry(b[4], b[5]), new T.MeshBasicMaterial({ color: b[3], side: T.DoubleSide }));
        m.position.set(b[0], b[1], b[2]); m.lookAt(0, 0, 0); env.add(m);
      });
      scene.environment = pm.fromScene(env, 0.035).texture;
    }

    function inicia() {
      if (pronto) return pronto;
      load.hidden = false;
      pronto = carrega(L.base + 'assets/vendor/three.min.js').then(function () {
        T = window.THREE;
        if (!T || !T.GLTFLoader) throw new Error('three');
        renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        view.appendChild(renderer.domElement);
        renderer.domElement.setAttribute('aria-label', L.t('Veículo em 3D. Arraste para girar.'));
        renderer.domElement.setAttribute('role', 'img');
        scene = new T.Scene();
        camera = new T.PerspectiveCamera(26, 1, 0.05, 50);
        scene.add(new T.HemisphereLight(0xcfe3ff, 0x2a1408, 1.1));
        var key = new T.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 2.5); scene.add(key);
        var rim = new T.DirectionalLight(0x2ad8ff, 2.6); rim.position.set(-3, 1.4, -3); scene.add(rim);
        var fogo = new T.PointLight(0xff7a1a, 4, 6); fogo.position.set(1.6, 0.4, -1.4); scene.add(fogo);
        ambiente();
        palco = new T.Group();
        scene.add(palco);
        var sombra = new T.Mesh(new T.CircleGeometry(0.62, 48), new T.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 }));
        sombra.rotation.x = -Math.PI / 2; sombra.position.y = 0.002; sombra.scale.set(1, 0.62, 1); scene.add(sombra);
        mede3d();
        if (window.ResizeObserver) new ResizeObserver(mede3d).observe(view);
        gsap.ticker.add(render);
        return decodifica('lancador');
      }).catch(function (e) { console.warn('garagem 3D indisponível', e); semTres(); throw e; });
      return pronto;
    }
    function mede3d() {
      var w = view.clientWidth, h = view.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      var dist = 2.35 / Math.min(1, camera.aspect / 1.45);
      camera.position.set(dist * 0.72, dist * 0.34, dist * 0.8);
      camera.lookAt(0, 0.14, 0);
      camera.updateProjectionMatrix();
    }
    function decodifica(nome) {
      if (cache[nome]) return Promise.resolve(cache[nome]);
      return carrega(L.base + 'assets/media/nitro/modelos/' + nome + '.js').then(function () {
        var data = (window.NV_MODEL_DATA || {})[nome];
        if (!data) throw new Error('modelo ' + nome);
        delete window.NV_MODEL_DATA[nome];
        var bin = atob(data.model), buf = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
        return new Promise(function (res, rej) { new T.GLTFLoader().parse(buf.buffer, '', res, rej); });
      }).then(function (gltf) {
        var root = gltf.scene, box = new T.Box3().setFromObject(root), dim = box.getSize(new T.Vector3()), s;
        var peca = nome === 'lancador';
        if (peca) { s = 1 / Math.max(dim.x, dim.y, dim.z, 1e-6); var c = box.getCenter(new T.Vector3()); root.scale.setScalar(s); root.position.copy(c).multiplyScalar(-s); }
        else { s = 1 / Math.max(dim.x, dim.z, 1e-6); root.scale.setScalar(s); root.position.set(-(box.min.x + box.max.x) / 2 * s, -box.min.y * s, -(box.min.z + box.max.z) / 2 * s); }
        root.traverse(function (o) {
          if (!o.isMesh) return;
          var src = [].concat(o.material)[0], map = src && src.map || null;
          o.material = new T.MeshStandardMaterial({ map: map, normalMap: src && src.normalMap || null, color: src && src.color ? src.color.clone() : 0xffffff, roughness: 0.38, metalness: 0.32, envMapIntensity: 1.1, emissiveMap: map, emissive: new T.Color(0.08, 0.08, 0.08) });
        });
        var g = new T.Group();
        if (!peca) g.rotation.y = Math.PI; // os carros olham para -Z no arquivo (yaw do manifesto do jogo)
        g.add(root);
        if (peca) { lancador = g; cache[nome] = g; return g; }
        var cfg = CARROS[nome];
        if (cfg.lanc && lancador) { var l = lancador.clone(true); l.position.set(0, cfg.lanc.y, cfg.lanc.z); l.scale.setScalar(0.4); g.add(l); }
        cache[nome] = g;
        return g;
      });
    }
    function escolhe(k) {
      if (k === atual) return;
      atual = k;
      mostraInfo(k);
      if (gar.classList.contains('is-sem3d')) return;
      var minha = ++tentativa;
      load.hidden = !!cache[k];
      inicia().then(function () { return decodifica(k); }).then(function (g) {
        if (minha !== tentativa) return;
        load.hidden = true;
        // todo carro que não é o escolhido sai (trocas rápidas deixavam dois no palco)
        var velhos = palco.children.filter(function (c) { return c !== g; });
        gsap.killTweensOf(g.scale);
        velhos.forEach(function (v) {
          gsap.killTweensOf(v.scale);
          if (RM) { palco.remove(v); v.scale.set(1, 1, 1); return; }
          gsap.to(v.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.3, ease: 'power2.in', onComplete: function () { palco.remove(v); v.scale.set(1, 1, 1); } });
        });
        var velho = velhos.length > 0;
        if (g.parent !== palco) palco.add(g);
        if (!RM) { g.scale.set(0.001, 0.001, 0.001); gsap.to(g.scale, { x: 1, y: 1, z: 1, duration: 0.9, delay: velho ? 0.25 : 0, ease: 'back.out(1.6)' }); vel = 0.09; }
      }).catch(function () { semTres(); });
    }
    function render(t, dt) {
      if (!visivel || !renderer || document.hidden) return;
      if (!arrastando) { vel += ((RM ? 0 : 0.0045) - vel) * 0.04; rot += vel * ((dt || 16) / 16); }
      palco.rotation.y = rot;
      renderer.render(scene, camera);
    }
    // arrastar para girar
    view.addEventListener('pointerdown', function (e) { arrastando = true; x0 = e.clientX; vel = 0; view.setPointerCapture && view.setPointerCapture(e.pointerId); });
    view.addEventListener('pointermove', function (e) { if (!arrastando) return; var dx = e.clientX - x0; x0 = e.clientX; rot += dx * 0.011; vel = dx * 0.011; });
    var larga = function () { arrastando = false; };
    view.addEventListener('pointerup', larga);
    view.addEventListener('pointercancel', larga);
    bts.forEach(function (b) {
      b.addEventListener('click', function () { escolhe(b.getAttribute('data-carro')); });
      b.addEventListener('keydown', function (e) {
        var i = bts.indexOf(b);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); bts[(i + 1) % bts.length].focus(); bts[(i + 1) % bts.length].click(); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); bts[(i - 1 + bts.length) % bts.length].focus(); bts[(i - 1 + bts.length) % bts.length].click(); }
      });
    });
    // só carrega o 3D (≈3 MB) quando a garagem está chegando na tela
    ScrollTrigger.create({
      trigger: gar, start: 'top 140%', end: 'bottom -40%',
      onToggle: function (s) {
        visivel = s.isActive;
        if (visivel && !atual) escolhe('velocity');
      }
    });
    if (!RM) gsap.from($$('.gar__lista button'), { x: 40, opacity: 0, stagger: 0.06, duration: 0.9, clearProps: 'transform,opacity', scrollTrigger: { trigger: gar, start: 'top 60%', once: true } });
  }

  /* ---------------- curva de dificuldade ---------------- */
  var curva = $('[data-curva]');
  if (curva) {
    var linha = $('.curva__linha', curva), area = $('.curva__area', curva), marcos = $$('.curva__marcos li', curva);
    var xs = marcos.map(function (m) { return parseFloat(m.style.getPropertyValue('--x')) / 100; });
    var mostra = function (p) {
      linha.style.strokeDashoffset = (1 - p).toFixed(4);
      area.style.opacity = (p * 0.9).toFixed(3);
      marcos.forEach(function (m, i) {
        var on = p >= xs[i];
        if (on !== m.classList.contains('is-on')) {
          m.classList.toggle('is-on', on);
          if (RM) { m.style.opacity = on ? 1 : 0; return; }
          gsap.to(m, { opacity: on ? 1 : 0, duration: 0.4 });
          if (on) gsap.fromTo($('.m', m), { y: 16, scale: 0.8 }, { y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)' });
        }
      });
    };
    if (RM) mostra(1);
    else {
      mostra(0);
      ScrollTrigger.create({ trigger: curva, start: 'top 75%', end: 'bottom 55%', scrub: 0.6, onUpdate: function (s) { mostra(s.progress); } });
    }
  }
})();
