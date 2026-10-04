// Partículas num canvas próprio, em coordenadas do palco (941 de largura). O laço só roda enquanto
// há partícula viva: parado, não gasta nada.
(function (raiz) {
  'use strict';
  let cv = null, cx = null, vivas = [], rodando = false, ultimo = 0;
  const FX = {};
  // sprites prontos (gradiente radial desenhado uma vez só): desenhar imagem é bem mais barato que
  // montar gradiente por partícula a cada quadro
  const SPR = {};
  function sprite(cores) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    cores.forEach(([p, cor]) => gr.addColorStop(p, cor));
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return c;
  }
  function preparaSprites() {
    if (SPR.amarela) return;
    SPR.amarela = sprite([[0, 'rgba(255,255,230,1)'], [.25, 'rgba(255,230,120,.95)'], [.6, 'rgba(255,160,40,.45)'], [1, 'rgba(255,90,0,0)']]);
    SPR.laranja = sprite([[0, 'rgba(255,220,120,.95)'], [.3, 'rgba(255,140,30,.8)'], [.7, 'rgba(230,60,10,.3)'], [1, 'rgba(180,20,0,0)']]);
    SPR.vermelha = sprite([[0, 'rgba(255,120,40,.7)'], [.4, 'rgba(200,40,10,.45)'], [1, 'rgba(120,10,0,0)']]);
    SPR.fumaca = sprite([[0, 'rgba(90,90,100,.55)'], [.5, 'rgba(70,70,80,.3)'], [1, 'rgba(60,60,70,0)']]);
  }
  FX.liga = function (canvas) { cv = canvas; cx = cv.getContext('2d'); };
  FX.tamanho = function (w, h) { if (!cv) return; cv.width = Math.round(w); cv.height = Math.round(h); };

  function laco(t) {
    const dt = Math.min(0.05, (t - ultimo) / 1000 || 0.016); ultimo = t;
    cx.clearRect(0, 0, cv.width, cv.height);
    const fica = [];
    for (const p of vivas) {
      p.vida -= dt;
      if (p.vida <= 0) continue;
      p.vx *= Math.pow(p.atrito, dt * 60); p.vy = p.vy * Math.pow(p.atrito, dt * 60) + p.g * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      const a = Math.min(1, p.vida / p.fade);
      cx.globalAlpha = a;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
      if (p.tipo === 'brilho') { cx.globalCompositeOperation = 'lighter'; }
      cx.fillStyle = p.cor;
      const s = p.tam * (p.cresce ? 1 + (1 - a) * p.cresce : 1);
      if (p.tipo === 'chama' || p.tipo === 'fumaca') {
        // chama: sprite brilhante que vai de amarelo a vermelho enquanto some; fumaça: nuvem cinza
        cx.rotate(-p.rot);
        const f = p.vida / p.vida0;
        const sp = p.tipo === 'fumaca' ? SPR.fumaca : f > .62 ? SPR.amarela : f > .3 ? SPR.laranja : SPR.vermelha;
        if (p.tipo === 'chama') cx.globalCompositeOperation = 'lighter';
        const tam = p.tipo === 'fumaca' ? s * (1 + (1 - f) * 1.8) : s * (0.45 + f * 0.75);
        // a chama é esticada para cima (labareda); a fumaça é redonda
        if (p.tipo === 'chama') cx.drawImage(sp, -tam * .7, -tam * 1.55, tam * 1.4, tam * 2.7);
        else cx.drawImage(sp, -tam, -tam, tam * 2, tam * 2);
      }
      else if (p.tipo === 'pedra') { cx.beginPath(); cx.moveTo(-s, -s * .6); cx.lineTo(s * .7, -s); cx.lineTo(s, s * .5); cx.lineTo(-s * .4, s); cx.closePath(); cx.fill(); cx.strokeStyle = 'rgba(0,0,0,.5)'; cx.lineWidth = 2; cx.stroke(); }
      else if (p.tipo === 'gelo') { cx.beginPath(); cx.moveTo(0, -s * 1.6); cx.lineTo(s * .6, 0); cx.lineTo(0, s * 1.6); cx.lineTo(-s * .6, 0); cx.closePath(); cx.fill(); }
      else if (p.tipo === 'brilho') { cx.beginPath(); for (let k = 0; k < 8; k++) { const r = k % 2 ? s * .35 : s; const an = k * Math.PI / 4; cx.lineTo(Math.cos(an) * r, Math.sin(an) * r); } cx.closePath(); cx.fill(); }
      else if (p.tipo === 'anel') { cx.beginPath(); cx.arc(0, 0, s, 0, Math.PI * 2); cx.strokeStyle = p.cor; cx.lineWidth = 6 * a; cx.stroke(); }
      else cx.fillRect(-s / 2, -s / 2, s, s);
      cx.restore();
      cx.globalCompositeOperation = 'source-over';
      fica.push(p);
    }
    cx.globalAlpha = 1;
    vivas = fica;
    let nc = 0; for (const p of fica) if (p.tipo === 'chama') nc++;
    FX.nChamas = nc;
    if (vivas.length) requestAnimationFrame(laco); else { rodando = false; cx.clearRect(0, 0, cv.width, cv.height); }
  }
  function acorda() { if (!rodando && cx) { rodando = true; ultimo = performance.now(); requestAnimationFrame(laco); } }

  // n partículas saindo de (x,y). o: { tipo, cores, vel, g, vida, tam, ang, abre }
  FX.jato = function (x, y, n, o) {
    if (!cx) return;
    o = o || {};
    const cores = o.cores || ['#fff'];
    for (let i = 0; i < n; i++) {
      const ang = (o.ang != null ? o.ang : Math.random() * Math.PI * 2) + (o.abre != null ? (Math.random() - .5) * o.abre : 0);
      const v = (o.vel || 500) * (0.35 + Math.random() * 0.75);
      vivas.push({
        x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, g: o.g != null ? o.g : 900,
        vida: (o.vida || 0.7) * (0.6 + Math.random() * 0.6), fade: o.fade || 0.35,
        tam: (o.tam || 12) * (0.6 + Math.random() * 0.8), cor: cores[i % cores.length],
        tipo: o.tipo || 'quadrado', rot: Math.random() * 6.28, vr: (Math.random() - .5) * (o.giro || 10),
        atrito: o.atrito || 0.985, cresce: o.cresce || 0,
      });
    }
    if (vivas.length > 600) vivas.splice(0, vivas.length - 600);
    acorda();
  };
  // chama que sobe (forca 0..1 muda tamanho e velocidade)
  // teto de chamas vivas: em celular mais fraco, centenas de sprites somados pesam
  FX.nChamas = 0;
  FX.chama = function (x, y, forca) {
    if (!cx || FX.nChamas > 110) return;
    FX.nChamas++;
    preparaSprites();
    const f = forca || .6, vida = .45 + Math.random() * .4;
    vivas.push({ x: x + (Math.random() - .5) * 10, y, vx: (Math.random() - .5) * 60, vy: -(110 + Math.random() * 170) * (.7 + f * .6), g: -80, vida, vida0: vida, fade: vida,
      tam: (12 + Math.random() * 18) * (.7 + f * .7), cor: '#fff', tipo: 'chama', rot: 0, vr: 0, atrito: .99, cresce: 0 });
    if (vivas.length > 700) vivas.splice(0, vivas.length - 700);
    acorda();
  };
  FX.fumaca = function (x, y) {
    if (!cx) return;
    preparaSprites();
    const vida = 1 + Math.random() * .5;
    vivas.push({ x, y, vx: (Math.random() - .5) * 40, vy: -(40 + Math.random() * 60), g: -20, vida, vida0: vida, fade: vida,
      tam: 14 + Math.random() * 14, cor: '#888', tipo: 'fumaca', rot: 0, vr: 0, atrito: .985, cresce: 0 });
    acorda();
  };
  FX.anel = function (x, y, cor, tam) {
    if (!cx) return;
    vivas.push({ x, y, vx: 0, vy: 0, g: 0, vida: .45, fade: .45, tam: tam || 40, cor, tipo: 'anel', rot: 0, vr: 0, atrito: 1, cresce: 2.2 });
    acorda();
  };
  FX.limpa = function () { vivas = []; };
  raiz.FX = FX;
})(this);
