// Ambiente vivo: partículas de cenário por arena (pedido do dono: "tá muito na cara que a fase é
// uma imagem estática"). Brasas, jatos de fogo e fumaça na lava; neve e cintilado no gelo; areia
// ventando no deserto; luz subindo e penas caindo no céu; vaga-lumes na selva. Nas fases
// especiais das datas: neve e luzinhas (Natal), névoa, fogo-fátuo e morcegos (Halloween), confete
// de ovinhos (Páscoa), trevos e moedas (St. Patrick).
// Fica num canvas ATRÁS do tabuleiro e dos selos: dá vida ao fundo pintado sem cobrir o jogo.
// As "fontes" (de onde saem brasas e jatos, onde o gelo e o ouro brilham) vêm de
// ambiente-fontes.js, medido na própria arte por tools/fontes-ambiente.mjs.
(function (raiz) {
  'use strict';
  let cv = null, cx = null, tema = null, fontes = [], vivas = [], rodando = false, ultimo = 0, congelado = false;
  let W = 941, H = 1672, oc = 0, acum = {}, proxJato = 0;
  const MAX = 150; // teto de partículas (celular fraco)
  // o canvas tem METADE da resolução do palco (a tela estica): partícula é borrada por natureza, e
  // cada canvas cheio ocupava ~8 MB e muito trabalho de desenho por quadro
  const ESC = 0.5;

  // sprites prontos: desenhar gradiente a cada partícula e quadro custaria caro
  const SPR = {};
  function sprite(nome, fn, tam) {
    if (SPR[nome]) return SPR[nome];
    const c = document.createElement('canvas'); c.width = c.height = tam;
    fn(c.getContext('2d'), tam); SPR[nome] = c; return c;
  }
  const bola = (cor, meio) => (g, t) => {
    const r = g.createRadialGradient(t / 2, t / 2, 0, t / 2, t / 2, t / 2);
    r.addColorStop(0, meio || '#fff'); r.addColorStop(.25, cor); r.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = r; g.fillRect(0, 0, t, t);
  };
  // (o miolo das brasas e da luz é quase branco: sobre lava laranja ou céu claro, cor igual à do
  // fundo some — o contraste é o miolo)
  const SPRITES = {
    brasa: () => sprite('brasa', bola('rgba(255,160,40,.95)', '#ffffe8'), 32),
    chama: () => sprite('chama', bola('rgba(255,100,15,.9)', '#fff2a0'), 64),
    fumaca: () => sprite('fumaca', bola('rgba(60,45,45,.42)', 'rgba(80,60,60,.5)'), 64),
    neve: () => sprite('neve', bola('rgba(240,250,255,.95)', '#fff'), 24),
    areia: () => sprite('areia', bola('rgba(255,214,140,.9)', '#fff6dc'), 16),
    poeira: () => sprite('poeira', bola('rgba(214,170,100,.34)', 'rgba(230,190,120,.42)'), 64),
    luz: () => sprite('luz', bola('rgba(255,176,40,.9)', '#fffbe8'), 32),
    vagalume: () => sprite('vagalume', bola('rgba(200,255,90,.9)', '#fbffd0'), 24),
    // datas comemorativas
    nevoa: () => sprite('nevoa', bola('rgba(120,70,170,.30)', 'rgba(150,100,200,.36)'), 64),
    fatuo: () => sprite('fatuo', bola('rgba(190,110,255,.9)', '#f6e8ff'), 28),
  };

  // temas: taxa = partículas por segundo; max = teto daquele tipo na tela
  const TEMAS = {
    selva: { emite: [['vagalume', 3, 20]] },
    magumbi: { emite: [['brasa', 28, 85], ['fumaca', 1.3, 9]], jatos: [0.8, 2] },
    nevambi: { emite: [['neve', 32, 140], ['cintila', 4, 12]] },
    egimbi: { emite: [['areia', 34, 100], ['poeira', 1.5, 8], ['cintila', 2.2, 8]] },
    angembi: { emite: [['luz', 12, 50], ['pena', 1.6, 10], ['cintila', 4, 12]] },
    final: { emite: [['luz', 16, 60], ['cintila', 5, 14], ['pena', 1.4, 8]] },
    // fases especiais: neve e luzinhas no Natal; névoa roxa, fogo-fátuo e morcegos no Halloween;
    // confete de ovinhos na Páscoa; trevos caindo e moedas pulando no St. Patrick
    natal: { emite: [['neve', 30, 130], ['cintila', 3.5, 12]] },
    halloween: { emite: [['nevoa', 1.3, 9], ['fatuo', 2.6, 14], ['morcego', 0.4, 3]] },
    pascoa: { emite: [['confete', 5, 28], ['cintila', 3, 10]] },
    patrick: { emite: [['trevo', 2.4, 16], ['moeda', 1.4, 8], ['cintila', 3, 10]] },
  };
  // estrelinhas (cintila) na cor de cada cena: [miolo, borda]
  const CINTILA = {
    nevambi: ['#f4fdff', 'rgba(40,110,190,.55)'], natal: ['#fff3b0', 'rgba(170,20,20,.6)'],
    pascoa: ['#ffd6f5', 'rgba(150,40,120,.6)'], patrick: ['#e4ff8a', 'rgba(20,100,20,.6)'],
  };
  const PASTEL = ['#ff9ad5', '#9fe3ff', '#fff09a', '#b8ff9a', '#d6a8ff', '#ffc38a'];

  const SOMA = { brasa: 1, chama: 1, vagalume: 1, fatuo: 1 };
  const acaso = (a, b) => a + Math.random() * (b - a);
  // ponto de uma fonte (com espalhado), ou qualquer lugar da faixa pedida
  function daFonte(espalha) {
    if (!fontes.length) return null;
    const f = fontes[Math.floor(Math.random() * fontes.length)];
    return [f[0] + acaso(-espalha, espalha), f[1] + oc + acaso(-espalha, espalha)];
  }
  function nasce(tipo) {
    const p = { tipo, idade: 0, gira: 0, rot: 0 };
    const Hs = H; // altura do palco
    switch (tipo) {
      case 'brasa': {
        const f = daFonte(18) || [acaso(0, W), acaso(Hs * .55, Hs)];
        Object.assign(p, { x: f[0], y: f[1], vx: acaso(-18, 18), vy: acaso(-160, -70), vida: acaso(1.4, 3.2), tam: acaso(11, 22), osc: acaso(0, 6) });
        break;
      }
      case 'fumaca': {
        const f = daFonte(30) || [acaso(0, W), acaso(Hs * .6, Hs)];
        Object.assign(p, { x: f[0], y: f[1], vx: acaso(-12, 12), vy: acaso(-34, -18), vida: acaso(3.5, 6), tam: acaso(70, 130) });
        break;
      }
      case 'neve': {
        const perto = Math.random() < .25; // uns flocos maiores e mais rápidos na frente (profundidade)
        Object.assign(p, { x: acaso(-20, W + 20), y: -20, vx: acaso(-14, 14), vy: perto ? acaso(100, 150) : acaso(40, 85), vida: 40, tam: perto ? acaso(14, 22) : acaso(6, 12), osc: acaso(0, 6) });
        break;
      }
      case 'cintila': {
        const f = daFonte(10) || [acaso(0, W), acaso(0, Hs)];
        Object.assign(p, { x: f[0], y: f[1], vx: 0, vy: 0, vida: acaso(.7, 1.3), tam: acaso(24, 44) });
        break;
      }
      case 'areia': {
        Object.assign(p, { x: W + 20, y: acaso(0, Hs), vx: acaso(-360, -180), vy: acaso(-12, 12), vida: 8, tam: acaso(6, 10), osc: acaso(0, 6) });
        break;
      }
      case 'poeira': {
        Object.assign(p, { x: W + 60, y: acaso(Hs * .45, Hs), vx: acaso(-70, -40), vy: acaso(-6, 6), vida: 16, tam: acaso(120, 220) });
        break;
      }
      case 'luz': {
        const f = daFonte(20) || [acaso(0, W), acaso(Hs * .3, Hs)];
        Object.assign(p, { x: f[0], y: f[1], vx: acaso(-10, 10), vy: acaso(-55, -22), vida: acaso(3, 6), tam: acaso(14, 26), osc: acaso(0, 6) });
        break;
      }
      case 'pena': {
        Object.assign(p, { x: acaso(0, W), y: -30, vx: acaso(-10, 10), vy: acaso(30, 55), vida: 60, tam: acaso(24, 38), osc: acaso(0, 6), rot: acaso(0, 6), gira: acaso(-1.2, 1.2) });
        break;
      }
      case 'vagalume': case 'fatuo': {
        const f = p.tipo === 'fatuo' ? daFonte(24) : null; // fogo-fátuo nasce nas velas e abóboras
        Object.assign(p, { x: f ? f[0] : acaso(0, W), y: f ? f[1] : acaso(Hs * .3, Hs * .95), vx: acaso(-20, 20), vy: acaso(-26, 10), vida: acaso(3, 6), tam: acaso(13, 24), osc: acaso(0, 6) });
        break;
      }
      case 'nevoa': { // névoa rasteira passando devagar por baixo
        Object.assign(p, { x: acaso(-100, W + 100), y: acaso(Hs * .72, Hs), vx: acaso(-22, 22), vy: acaso(-5, 5), vida: acaso(6, 10), tam: acaso(170, 280) });
        break;
      }
      case 'morcego': { // atravessa o céu batendo as asas
        const daEsq = Math.random() < .5;
        Object.assign(p, { x: daEsq ? -40 : W + 40, y: acaso(Hs * .04, Hs * .3), vx: (daEsq ? 1 : -1) * acaso(110, 180), vy: acaso(-12, 12), vida: 14, tam: acaso(26, 44), osc: acaso(0, 6) });
        break;
      }
      case 'confete': { // ovinhos coloridos caindo e girando
        Object.assign(p, { x: acaso(0, W), y: -30, vx: acaso(-12, 12), vy: acaso(50, 90), vida: 60, tam: acaso(14, 22), osc: acaso(0, 6), rot: acaso(0, 6), gira: acaso(-2.5, 2.5), cor: PASTEL[Math.floor(Math.random() * PASTEL.length)] });
        break;
      }
      case 'trevo': {
        Object.assign(p, { x: acaso(0, W), y: -30, vx: acaso(-10, 10), vy: acaso(40, 70), vida: 60, tam: acaso(20, 34), osc: acaso(0, 6), rot: acaso(0, 6), gira: acaso(-1.6, 1.6) });
        break;
      }
      case 'moeda': { // pula do ouro da arte e cai girando
        const f = daFonte(14) || [acaso(0, W), acaso(Hs * .7, Hs)];
        Object.assign(p, { x: f[0], y: f[1], vx: acaso(-60, 60), vy: acaso(-420, -260), g: 700, vida: acaso(1.1, 1.7), tam: acaso(18, 26), osc: acaso(0, 6) });
        break;
      }
    }
    return p;
  }
  // jato de fogo ("feixe de fogo" do dono) saindo da lava: um punhado de chamas e brasas rápidas
  function jato() {
    const f = daFonte(6); if (!f) return;
    const n = 18 + Math.floor(Math.random() * 10), forca = acaso(420, 680);
    for (let k = 0; k < n && vivas.length < MAX + 30; k++) {
      vivas.push({ tipo: 'chama', x: f[0] + acaso(-12, 12), y: f[1], vx: acaso(-45, 45), vy: -forca * acaso(.55, 1), g: 520, vida: acaso(.55, 1), idade: 0, tam: acaso(34, 66) });
    }
    for (let k = 0; k < 8; k++) vivas.push(Object.assign(nasce('brasa'), { x: f[0], y: f[1], vy: -forca * acaso(.5, .9), vida: acaso(.8, 1.6) }));
  }

  function desenha(p, a) {
    const t = p.tipo;
    if (t === 'morcego') {
      // silhueta escura com as asas batendo
      const bate = Math.abs(Math.sin(p.idade * 14 + p.osc)), s = p.tam;
      cx.save(); cx.translate(p.x, p.y); cx.globalAlpha = .85 * a; cx.fillStyle = '#1b0f26';
      cx.beginPath(); cx.ellipse(0, 0, s * .12, s * .2, 0, 0, Math.PI * 2); cx.fill();
      for (const lado of [-1, 1]) {
        cx.beginPath(); cx.moveTo(0, -s * .05);
        cx.quadraticCurveTo(lado * s * .35, -s * .45 * bate - s * .05, lado * s * .7, -s * .2 * bate);
        cx.quadraticCurveTo(lado * s * .45, s * .02, lado * s * .12, s * .1);
        cx.closePath(); cx.fill();
      }
      cx.restore();
      return;
    }
    if (t === 'confete') {
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = .9 * a;
      cx.fillStyle = p.cor; cx.strokeStyle = 'rgba(90,40,90,.55)'; cx.lineWidth = 2;
      cx.beginPath(); cx.ellipse(0, 0, p.tam * .36, p.tam * .5, 0, 0, Math.PI * 2); cx.fill(); cx.stroke();
      cx.strokeStyle = 'rgba(255,255,255,.85)'; cx.beginPath(); cx.moveTo(-p.tam * .3, 0); cx.lineTo(p.tam * .3, 0); cx.stroke();
      cx.restore();
      return;
    }
    if (t === 'trevo') {
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = .9 * a;
      cx.fillStyle = '#39c64a'; cx.strokeStyle = 'rgba(10,60,15,.7)'; cx.lineWidth = 2;
      const r = p.tam * .22;
      for (let k = 0; k < 3; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 3; cx.beginPath(); cx.arc(Math.cos(an) * r, Math.sin(an) * r, r, 0, Math.PI * 2); cx.fill(); cx.stroke(); }
      cx.beginPath(); cx.moveTo(0, r * .6); cx.quadraticCurveTo(r * .3, r * 2, r * 1.1, r * 2.8); cx.stroke();
      cx.restore();
      return;
    }
    if (t === 'moeda') {
      // moeda de ouro girando (a largura vai e volta)
      const lg = Math.max(.15, Math.abs(Math.cos(p.idade * 9 + p.osc)));
      cx.save(); cx.translate(p.x, p.y); cx.globalAlpha = a;
      cx.fillStyle = '#ffd23a'; cx.strokeStyle = '#9a6a08'; cx.lineWidth = 2.5;
      cx.beginPath(); cx.ellipse(0, 0, p.tam * .5 * lg, p.tam * .5, 0, 0, Math.PI * 2); cx.fill(); cx.stroke();
      cx.fillStyle = 'rgba(255,255,255,.7)'; cx.beginPath(); cx.ellipse(-p.tam * .12 * lg, -p.tam * .14, p.tam * .12 * lg, p.tam * .08, 0, 0, Math.PI * 2); cx.fill();
      cx.restore();
      return;
    }
    if (t === 'cintila') {
      // estrelinha de 4 pontas que acende e apaga
      const s = p.tam * Math.sin(Math.PI * (p.idade / p.vida));
      cx.save(); cx.translate(p.x, p.y); cx.globalAlpha = .9;
      // (céu e deserto são claros: a estrela é dourada com borda escura; no gelo, branca-azulada;
      // nas datas comemorativas, na cor da data)
      const cor = CINTILA[tema] || ['#ffe27a', 'rgba(150,90,10,.6)'];
      cx.fillStyle = cor[0];
      cx.strokeStyle = cor[1]; cx.lineWidth = 2;
      cx.beginPath();
      for (let k = 0; k < 8; k++) { const r = k % 2 ? s * .18 : s * .5, an = k * Math.PI / 4; cx.lineTo(Math.cos(an) * r, Math.sin(an) * r); }
      cx.closePath(); cx.fill(); cx.stroke(); cx.restore();
      return;
    }
    if (t === 'pena') {
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = .85 * a;
      cx.fillStyle = '#fffaf0'; cx.strokeStyle = 'rgba(150,120,70,.6)'; cx.lineWidth = 2;
      cx.beginPath(); cx.ellipse(0, 0, p.tam * .28, p.tam * .62, 0, 0, Math.PI * 2); cx.fill(); cx.stroke();
      cx.beginPath(); cx.moveTo(0, -p.tam * .62); cx.lineTo(0, p.tam * .7); cx.stroke();
      cx.restore();
      return;
    }
    if (t === 'areia') {
      // grão com rastro (vento)
      cx.globalAlpha = .55 * a;
      cx.strokeStyle = 'rgba(240,205,140,.8)'; cx.lineWidth = p.tam * .4;
      cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(p.x - p.vx * .05, p.y - p.vy * .05); cx.stroke();
      cx.globalAlpha = a; cx.drawImage(SPRITES.areia(), p.x - p.tam / 2, p.y - p.tam / 2, p.tam, p.tam);
      return;
    }
    const img = SPRITES[t] && SPRITES[t]();
    if (!img) return;
    cx.globalAlpha = a;
    // a chama do jato é esticada no sentido em que sobe (labareda, não bola)
    if (t === 'chama') { const alto = p.tam * (1.4 + Math.min(1.6, Math.abs(p.vy) / 400)); cx.drawImage(img, p.x - p.tam * .35, p.y - alto / 2, p.tam * .7, alto); return; }
    cx.drawImage(img, p.x - p.tam / 2, p.y - p.tam / 2, p.tam, p.tam);
  }

  function passo(dt) {
    const T = TEMAS[tema]; if (!T) return;
    // nascimentos
    for (const [tipo, taxa, max] of T.emite) {
      acum[tipo] = (acum[tipo] || 0) + taxa * dt;
      let n = 0; for (const p of vivas) if (p.tipo === tipo) n++;
      while (acum[tipo] >= 1) { acum[tipo]--; if (n < max && vivas.length < MAX) { vivas.push(nasce(tipo)); n++; } }
    }
    if (T.jatos && fontes.length) {
      proxJato -= dt;
      if (proxJato <= 0) { jato(); proxJato = acaso(T.jatos[0], T.jatos[1]); }
    }
    // movimento
    const fica = [];
    for (const p of vivas) {
      p.idade += dt;
      if (p.idade >= p.vida) continue;
      if (p.g) p.vy += p.g * dt;
      let vx = p.vx;
      if (p.osc != null) {
        // balanço: neve, pena, trevo e confete de lado; brasa e luz tremulando; vaga-lume e
        // fogo-fátuo passeando; morcego sobe e desce (no vy, abaixo)
        const cai = p.tipo === 'neve' || p.tipo === 'pena' || p.tipo === 'trevo' || p.tipo === 'confete';
        const passeia = p.tipo === 'vagalume' || p.tipo === 'fatuo';
        const f = passeia ? 1.3 : cai ? 1.1 : 2.4;
        if (p.tipo !== 'morcego' && p.tipo !== 'moeda') vx += Math.sin(p.idade * f + p.osc) * (passeia ? 26 : p.tipo === 'pena' || p.tipo === 'trevo' ? 34 : 16);
        if (p.tipo === 'morcego') p.y += Math.sin(p.idade * 3 + p.osc) * 30 * dt;
      }
      p.x += vx * dt; p.y += p.vy * dt; p.rot += p.gira * dt;
      if (p.y > H + 60 || p.y < -80 || p.x < -260 || p.x > W + 260) continue;
      fica.push(p);
    }
    vivas = fica;
  }
  function alfa(p) {
    const f = p.idade / p.vida;
    switch (p.tipo) {
      case 'brasa': return (f < .15 ? f / .15 : 1 - (f - .15) / .85) * (.7 + .3 * Math.sin(p.idade * 18 + p.osc));
      case 'chama': return 1 - f;
      case 'fumaca': case 'poeira': case 'nevoa': return Math.sin(Math.PI * f) * .9;
      case 'vagalume': case 'fatuo': return Math.max(0, Math.sin(Math.PI * f)) * (.45 + .55 * Math.abs(Math.sin(p.idade * 2.6 + p.osc)));
      case 'moeda': return f > .8 ? (1 - f) / .2 : 1;
      case 'luz': return Math.sin(Math.PI * f) * (.75 + .25 * Math.sin(p.idade * 5 + p.osc));
      case 'neve': case 'pena': case 'areia': return 1;
      default: return 1;
    }
  }
  function quadro(agora) {
    if (!rodando || congelado) { rodando = false; return; }
    const dt = Math.min(0.05, (agora - ultimo) / 1000); ultimo = agora;
    passo(dt);
    cx.setTransform(ESC, 0, 0, ESC, 0, 0);
    cx.clearRect(0, 0, W, H);
    // Só fogo e vaga-lume SOMAM luz; o resto é pintado por cima: somar luz em fundo claro (céu,
    // neve) dá branco e a partícula some
    cx.globalCompositeOperation = 'source-over';
    for (const p of vivas) if (!SOMA[p.tipo]) desenha(p, alfa(p));
    cx.globalCompositeOperation = 'lighter';
    for (const p of vivas) if (SOMA[p.tipo]) desenha(p, alfa(p));
    cx.globalCompositeOperation = 'source-over'; cx.globalAlpha = 1;
    requestAnimationFrame(quadro);
  }

  const tamCanvas = el => { const w = Math.round(W * ESC), h = Math.round(H * ESC); if (el.width !== w || el.height !== h) { el.width = w; el.height = h; } };
  // canvas fora de cena devolve a memória (1x1)
  const solta = el => { if (el) { el.width = 1; el.height = 1; } };
  function anda() { if (!rodando && !congelado && tema) { rodando = true; ultimo = performance.now(); requestAnimationFrame(quadro); } }

  const Ambiente = {
    // tamanho do palco (o mesmo do #fx): largura 941 e a altura da tela; `o` = sobra acima da arte
    tamanho(w, h, o) { W = w; H = h; oc = o; if (cv && tema) tamCanvas(cv); },
    // liga o canvas `el` com o tema (id da arena ou 'final'); `fts` = pontos da arte [[x,y],...]
    liga(el, nome, fts) {
      if (!el || !TEMAS[nome]) return Ambiente.para();
      const troca = el !== cv || nome !== tema;
      if (cv && cv !== el) solta(cv);
      cv = el; cx = el.getContext('2d'); tema = nome; fontes = fts || [];
      tamCanvas(el);
      if (troca) {
        vivas = []; acum = {}; proxJato = 0.6;
        // começa com o cenário já "vivo" (neve caindo, luzes no ar), não vazio
        for (let k = 0; k < 90; k++) passo(1 / 30);
      }
      anda();
    },
    para() {
      rodando = false; vivas = []; tema = null;
      solta(cv);
    },
    // janela aberta por cima (pausa, resultado, energia...): o ambiente fica parado no último quadro
    congela(sim) { congelado = !!sim; if (!congelado) anda(); },
    // para os testes
    estado() { return { tema, vivas: vivas.length, rodando, fontes: fontes.length, congelado }; },
  };
  raiz.Ambiente = Ambiente;
})(this);
