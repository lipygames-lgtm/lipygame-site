// Quiver — motor das regras. Não sabe de tela, relógio nem som: só tabuleiro, setas, blocos e
// peças falsas. Roda no navegador (window.Motor) e no Node (require) para testes e o gerador.
// O tabuleiro é um array de células com as dimensões penduradas nele (c.w, c.h): cada fase
// tem o seu tamanho (6x7 no começo, até 8x10 nas fases avançadas).
(function (raiz, fabrica) {
  const M = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = M; else raiz.Motor = M;
})(this, function () {
  'use strict';
  // direções: 0 cima, 1 direita, 2 baixo, 3 esquerda
  const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
  const LETRA = ['U', 'R', 'D', 'L'];

  function novo(w, h) { const c = new Array(w * h).fill(null); c.w = w; c.h = h; return c; }
  // cópia que mantém as dimensões (slice() sozinho perde c.w/c.h)
  function copia(c) { const k = c.slice(); k.w = c.w; k.h = c.h; return k; }

  // ---------- codificação: w*h caracteres, linha por linha ----------
  // '.' vazio · 'X' bloco · U R D L = seta na 1ª cor · u r d l = seta na 2ª cor
  // '1'-'8' = peça FALSA (1-4: cima/dir/baixo/esq na 1ª cor; 5-8: na 2ª cor)
  function le(txt, w = 6, h = 7) {
    if (typeof txt !== 'string' || txt.length !== w * h) throw new Error(`fase inválida (${w}x${h}): ${txt}`);
    const c = novo(w, h);
    for (let i = 0; i < w * h; i++) {
      const ch = txt[i];
      if (ch === '.') continue;
      if (ch === 'X') { c[i] = { k: 'x' }; continue; }
      if (ch >= '1' && ch <= '8') { const n = ch.charCodeAt(0) - 49; c[i] = { k: 'f', d: n % 4, c: n >> 2 }; continue; }
      const d = LETRA.indexOf(ch.toUpperCase());
      if (d < 0) throw new Error('caractere inválido na fase: ' + ch);
      c[i] = { k: 'a', d, c: ch === ch.toUpperCase() ? 0 : 1 };
    }
    return c;
  }
  function escreve(c) {
    let s = '';
    for (let i = 0; i < c.length; i++) {
      const p = c[i];
      // 't' (bloco temporário do chefe) só existe durante a luta; se for gravado, vira X
      s += !p ? '.' : (p.k === 'x' || p.k === 't') ? 'X' : p.k === 'f' ? String.fromCharCode(49 + p.d + 4 * p.c) : (p.c ? LETRA[p.d].toLowerCase() : LETRA[p.d]);
    }
    return s;
  }

  // ---------- regras ----------
  // casas do caminho de i até a borda, na direção d (sem incluir i)
  function caminho(c, i, d) {
    const w = c.w, h = c.h, out = [];
    let x = i % w + DX[d], y = (i / w | 0) + DY[d];
    while (x >= 0 && x < w && y >= 0 && y < h) { out.push(y * w + x); x += DX[d]; y += DY[d]; }
    return out;
  }
  // a peça falsa não segura ninguém: quem passa atravessa ela
  const segura = p => !!p && p.k !== 'f';
  // primeira peça no caminho que bloqueia (ou -1 se o caminho está livre)
  function bloqueador(c, i) {
    const p = c[i];
    if (!p || p.k !== 'a') return -1;
    for (const j of caminho(c, i, p.d)) if (segura(c[j])) return j;
    return -1;
  }
  const ehSeta = p => !!p && p.k === 'a';
  // seta CONGELADA pelo chefe (p.gelo > 0) não sai, mesmo com o caminho livre
  function livre(c, i) { return ehSeta(c[i]) && !(c[i].gelo > 0) && bloqueador(c, i) < 0; }
  function livres(c) { const L = []; for (let i = 0; i < c.length; i++) if (livre(c, i)) L.push(i); return L; }
  function contaSetas(c) { let n = 0; for (let i = 0; i < c.length; i++) if (ehSeta(c[i])) n++; return n; }
  function contaFalsas(c) { let n = 0; for (let i = 0; i < c.length; i++) if (c[i] && c[i].k === 'f') n++; return n; }

  // ---------- solver ----------
  // Tirar uma seta livre nunca bloqueia outra (só esvazia casa; as falsas são transparentes), então
  // a fase tem solução se e somente se tirar as livres em "camadas" esvazia as setas.
  function resolve(c0) {
    const c = copia(c0), camadas = [];
    for (;;) {
      const L = livres(c);
      if (!L.length) break;
      camadas.push(L);
      for (const i of L) c[i] = null;
    }
    const sobram = contaSetas(c);
    return { ok: sobram === 0, sobram, camadas, profundidade: camadas.length };
  }

  // Tempo esperado de um jogador que confere peças até achar uma livre (referência rápida).
  function tempoEsperado(c0, tOlhar, tToque) {
    const c = copia(c0);
    let t = 0;
    for (;;) {
      const L = livres(c);
      if (!L.length) break;
      const R = contaSetas(c);
      t += tToque + tOlhar * (R + 1) / (L.length + 1);
      c[L[0]] = null;
    }
    return t;
  }

  function metricas(c) {
    const r = resolve(c);
    const seq = [];
    const k = copia(c);
    for (;;) { const L = livres(k); if (!L.length) break; seq.push(L.length); k[L[0]] = null; }
    let blocos = 0; for (let i = 0; i < c.length; i++) if (c[i] && c[i].k === 'x') blocos++;
    // "armadilha": seta bloqueada por peça a 3+ casas (parece livre de relance)
    let armadilhas = 0;
    for (let i = 0; i < c.length; i++) if (ehSeta(c[i])) {
      const b = bloqueador(c, i);
      if (b >= 0) { const dist = Math.abs(b % c.w - i % c.w) + Math.abs((b / c.w | 0) - (i / c.w | 0)); if (dist >= 3) armadilhas++; }
    }
    return {
      w: c.w, h: c.h, setas: contaSetas(c), blocos, falsas: contaFalsas(c), ok: r.ok, profundidade: r.profundidade,
      livresInicio: r.camadas[0] ? r.camadas[0].length : 0,
      livresMedia: seq.length ? seq.reduce((a, b) => a + b, 0) / seq.length : 0,
      livresMin: seq.length ? Math.min(...seq) : 0,
      armadilhas,
    };
  }

  // ---------- gerador (de trás para frente) ----------
  // Monta a fase colocando setas uma a uma; cada seta nova precisa ter o caminho LIVRE no momento
  // em que entra. Então tirar na ordem inversa da montagem sempre funciona: a fase nasce com
  // solução. A graça vem de pôr a seta nova no CAMINHO das que já estão lá (vira dependência).
  function rng(seed) {
    let a = seed >>> 0;
    return function () { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  function montaUma(p, rnd) {
    const w = p.w, h = p.h, N = w * h;
    const c = novo(w, h);
    // blocos X: longe das bordas quando dá (bloco na borda só "fecha" uma saída e fica feio)
    let x = 0, guarda = 0;
    while (x < p.blocos && guarda++ < 800) {
      const i = Math.floor(rnd() * N), cx = i % w, cy = i / w | 0;
      if (c[i]) continue;
      if ((cx === 0 || cx === w - 1 || cy === 0 || cy === h - 1) && rnd() < .75) continue;
      c[i] = { k: 'x' }; x++;
    }
    // quem passa por cada casa: lista de setas cujo caminho cruza a casa
    const passa = Array.from({ length: N }, () => []);
    // cadeia[s] = tamanho da maior fila de setas que esperam por s (s incluída)
    const cadeia = new Array(N).fill(0);
    for (let k = 0; k < p.setas; k++) {
      const cands = [];
      for (let i = 0; i < N; i++) {
        if (c[i]) continue;
        for (let d = 0; d < 4; d++) {
          const cam = caminho(c, i, d);
          let ok = true;
          for (const j of cam) if (c[j]) { ok = false; break; }
          if (!ok) continue;
          let bloqueia = 0, fundo = 0, armadilha = 0;
          for (const s of passa[i]) if (c[s] && c[s].k === 'a') {
            bloqueia++; fundo = Math.max(fundo, cadeia[s]);
            if (Math.abs(s % w - i % w) + Math.abs((s / w | 0) - (i / w | 0)) >= 3) armadilha++;
          }
          const score = p.pesoBloqueio * bloqueia + p.pesoFundo * fundo + p.pesoLonge * cam.length + p.pesoArmadilha * armadilha + p.acaso * rnd();
          cands.push({ i, d, score, fundo, cam });
        }
      }
      if (!cands.length) break;
      cands.sort((a, b) => b.score - a.score);
      const topo = cands.slice(0, Math.max(1, Math.round(cands.length * p.topo)));
      const e = topo[Math.floor(rnd() * topo.length)];
      c[e.i] = { k: 'a', d: e.d, c: rnd() < .5 ? 0 : 1 };
      cadeia[e.i] = e.fundo + 1;
      for (const j of e.cam) passa[j].push(e.i);
    }
    return c;
  }

  // Peças FALSAS nas casas vazias. Metade das vezes num lugar onde parecem BLOQUEAR uma seta de
  // verdade (a seta está livre, mas parece presa); na outra, apontando para um caminho limpo
  // (parecem uma seta livre, pedindo toque). As duas enganam — e nenhuma muda a solução.
  function poeFalsas(c, n, rnd) {
    for (let k = 0; k < n; k++) {
      const vazias = [];
      for (let i = 0; i < c.length; i++) if (!c[i]) vazias.push(i);
      if (!vazias.length) return;
      let i;
      if (rnd() < .5) {
        // casas no caminho de setas livres (o engano "parece presa")
        const alvo = [];
        for (const s of livres(c)) for (const j of caminho(c, s, c[s].d)) if (!c[j]) alvo.push(j);
        i = alvo.length ? alvo[Math.floor(rnd() * alvo.length)] : vazias[Math.floor(rnd() * vazias.length)];
      } else i = vazias[Math.floor(rnd() * vazias.length)];
      // direção: de preferência uma que pareça livre (convida o toque)
      const dirs = [0, 1, 2, 3].sort(() => rnd() - .5);
      let d = dirs[0];
      for (const dd of dirs) { if (caminho(c, i, dd).every(j => !segura(c[j]))) { d = dd; break; } }
      c[i] = { k: 'f', d, c: rnd() < .5 ? 0 : 1 };
    }
  }

  // Procura uma fase dentro das metas; devolve a melhor encontrada (e o quanto errou).
  function gera(meta, seed) {
    const rnd = rng(seed);
    const p = Object.assign({ w: 6, h: 7, setas: 12, blocos: 0, falsas: 0, prof: [2, 4], maxLivresInicio: 6, pesoBloqueio: 3, pesoFundo: 2, pesoLonge: .35, pesoArmadilha: 1.2, acaso: 2.2, topo: .12, tentativas: 600 }, meta);
    let melhor = null, erroMelhor = Infinity;
    for (let t = 0; t < p.tentativas; t++) {
      const c = montaUma(p, rnd);
      const m = metricas(c);
      if (!m.ok) continue; // nunca acontece por construção; defesa
      let erro = 0;
      if (m.setas < p.setas) erro += (p.setas - m.setas) * 10;
      if (m.profundidade < p.prof[0]) erro += (p.prof[0] - m.profundidade) * 4;
      if (m.profundidade > p.prof[1]) erro += (m.profundidade - p.prof[1]) * 4;
      if (m.livresInicio > p.maxLivresInicio) erro += (m.livresInicio - p.maxLivresInicio) * 2;
      if (erro < erroMelhor) { erroMelhor = erro; melhor = c; if (erro === 0) break; }
    }
    if (melhor && p.falsas) poeFalsas(melhor, p.falsas, rnd);
    return { celulas: melhor, erro: erroMelhor, metricas: melhor && metricas(melhor) };
  }

  return { DX, DY, novo, copia, le, escreve, caminho, bloqueador, livre, livres, contaSetas, contaFalsas, resolve, tempoEsperado, metricas, rng, gera, poeFalsas };
});
