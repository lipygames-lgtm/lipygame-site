// Quiver — o que o jogador persegue fora das fases (menu, pedidos do dono de 24/09):
//  - MISSÕES: 3 por dia + 1 da semana, sorteadas pelo dia (as mesmas para todo mundo), com prêmio;
//  - CONQUISTAS: bronze, prata e ouro; a escolhida vira a INSÍGNIA na foto do jogador (no ranking
//    os amigos veem);
//  - ROLETA: o giro sorteia com PESO — moedas e "gire de novo" caem muito, diamantes e reviver
//    pouco, mas nenhum tem chance zero; as fatias têm o tamanho da chance (e a tela mostra as %);
//  - SKINS das setas e AVATARES (as fotos do perfil).
// Só regras e dados: a tela é o main.js; preços e quantidades de ajuste ficam no config.js.
(function (raiz, fabrica) {
  const M = fabrica(typeof module === 'object' && module.exports ? require('./engine.js') : raiz.Motor);
  if (typeof module === 'object' && module.exports) module.exports = M; else raiz.Metas = M;
})(this, function (Motor) {
  'use strict';

  // ---------- MISSÕES ----------
  // `conta`: qual contador do dia (ou da semana) mede a missão; `meta`: quanto precisa
  const MISSOES = [
    { id: 'vence3', conta: 'vitorias', meta: 3, premio: { moedas: 80 } },
    { id: 'vence5', conta: 'vitorias', meta: 5, premio: { moedas: 120 } },
    { id: 'rush2', conta: 'rush', meta: 2, premio: { moedas: 80 } },
    { id: 'classic2', conta: 'classic', meta: 2, premio: { moedas: 80 } },
    { id: 'estrelas6', conta: 'estrelas', meta: 6, premio: { moedas: 100 } },
    { id: 'combo8', conta: 'combo', meta: 8, premio: { gemas: 5 } },
    { id: 'combo12', conta: 'combo', meta: 12, premio: { gemas: 8 } },
    { id: 'fever2', conta: 'fever', meta: 2, premio: { moedas: 100 } },
    { id: 'semerro', conta: 'semErro', meta: 1, premio: { gemas: 5 } },
    { id: 'poderes2', conta: 'poderes', meta: 2, premio: { moedas: 60 } },
    { id: 'partidas5', conta: 'partidas', meta: 5, premio: { moedas: 60 } },
  ];
  const SEMANAIS = [
    { id: 's_vence20', conta: 'vitorias', meta: 20, premio: { gemas: 30 } },
    { id: 's_estrelas40', conta: 'estrelas', meta: 40, premio: { gemas: 30 } },
    { id: 's_chefe', conta: 'chefes', meta: 1, premio: { gemas: 30 } },
    { id: 's_desafio2', conta: 'desafios', meta: 2, premio: { gemas: 30 } },
  ];
  const CONTADORES = ['partidas', 'vitorias', 'rush', 'classic', 'estrelas', 'combo', 'fever', 'semErro', 'poderes', 'chefes', 'desafios'];
  const vazio = () => { const c = {}; for (const k of CONTADORES) c[k] = 0; return c; };
  // semente de um texto (o dia "2026-09-24" ou a semana "2026w39")
  function semente(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  // as 3 missões do dia: sorteio pelo dia, sem duas do mesmo contador
  function doDia(dia) {
    const rnd = Motor.rng(semente('dia' + dia)), l = MISSOES.slice(), out = [];
    while (out.length < 3 && l.length) {
      const m = l.splice(Math.floor(rnd() * l.length), 1)[0];
      if (!out.some(o => o.conta === m.conta)) out.push(m);
    }
    return out;
  }
  const daSemana = semana => SEMANAIS[semente('sem' + semana) % SEMANAIS.length];
  // o "combo" é o maior do período; os outros somam
  function soma(c, ev) {
    for (const k of CONTADORES) {
      if (!ev[k]) continue;
      c[k] = k === 'combo' ? Math.max(c[k] || 0, ev[k]) : (c[k] || 0) + ev[k];
    }
    return c;
  }
  const progresso = (m, c) => Math.min(m.meta, (c && c[m.conta]) || 0);
  const pronta = (m, c) => progresso(m, c) >= m.meta;

  // ---------- CONQUISTAS ----------
  // `valor`: de onde vem o número (stats do jogador ou algo contado no save); três níveis
  // (bronze, prata, ouro) e o prêmio em diamantes de cada um. A lenda tem um nível só (ouro).
  const CONQUISTAS = [
    { id: 'vitorias', icone: 'trofeu', niveis: [10, 50, 200], premio: [10, 25, 60] },
    { id: 'estrelas', icone: 'estrela', niveis: [30, 150, 450], premio: [10, 25, 60] },
    { id: 'combo', icone: 'fogo', niveis: [10, 20, 30], premio: [10, 25, 60] },
    { id: 'chefes', icone: 'escudo', niveis: [1, 2, 4], premio: [15, 30, 80] },
    { id: 'semErro', icone: 'coracao', niveis: [5, 25, 100], premio: [10, 25, 60] },
    { id: 'fever', icone: 'raio', niveis: [10, 50, 200], premio: [10, 25, 60] },
    { id: 'desafios', icone: 'relogio', niveis: [1, 10, 30], premio: [10, 25, 60] },
    { id: 'especiais', icone: 'presente', niveis: [1, 7, 28], premio: [15, 30, 80] },
    { id: 'diarios', icone: 'calendario', niveis: [7, 30, 100], premio: [10, 25, 60] },
    { id: 'lenda', icone: 'coroa', niveis: [1], premio: [100] },
  ];
  // quantos níveis o valor já alcançou (0 = nenhum)
  const nivel = (c, valor) => c.niveis.filter(n => valor >= n).length;
  // cor do anel da insígnia pelo nível (na lenda, ouro direto)
  const TIER = ['', 'bronze', 'prata', 'ouro'];
  const tier = (c, n) => c.niveis.length === 1 ? (n ? 'ouro' : '') : TIER[n];

  // ---------- ROLETA ----------
  // `peso` = chance em %. As fatias se desenham com o tamanho do peso, nesta ordem, em volta da roda.
  const ROLETA = [
    { id: 'moedas100', tipo: 'moedas', qtd: 100, peso: 22 },
    { id: 'denovo1', tipo: 'denovo', peso: 15 },
    { id: 'energia', tipo: 'energia', qtd: 1, peso: 16 },
    { id: 'moedas50', tipo: 'moedas', qtd: 50, peso: 18 },
    { id: 'gemas', tipo: 'gemas', qtd: 5, peso: 8 },
    { id: 'denovo2', tipo: 'denovo', peso: 15 },
    { id: 'reviver', tipo: 'reviver', qtd: 1, peso: 6 },
  ];
  function sorteia(rnd) {
    const total = ROLETA.reduce((s, f) => s + f.peso, 0);
    let x = rnd() * total;
    for (let i = 0; i < ROLETA.length; i++) { x -= ROLETA[i].peso; if (x < 0) return i; }
    return ROLETA.length - 1;
  }
  // ângulo (graus, 0 = em cima, sentido horário) do começo e do meio de cada fatia
  function angulos() {
    const total = ROLETA.reduce((s, f) => s + f.peso, 0);
    let a = 0;
    return ROLETA.map(f => { const ini = a, fim = a + 360 * f.peso / total; a = fim; return { ini, fim, meio: (ini + fim) / 2 }; });
  }
  // chance por tipo (a tela mostra): { moedas: 40, denovo: 30, ... }
  function chances() { const c = {}; for (const f of ROLETA) c[f.tipo] = (c[f.tipo] || 0) + f.peso; return c; }

  // ---------- SKINS das setas ----------
  // o visual é do CSS (body[data-skin]): `preco` em moedas ou diamantes; a clássica é de graça
  const SKINS = [
    { id: 'classica', preco: null },
    { id: 'ouro', preco: { moedas: 2000 } },
    { id: 'gelo', preco: { moedas: 1500 } },
    { id: 'lava', preco: { gemas: 120 } },
    { id: 'neon', preco: { gemas: 150 } },
    { id: 'arcoiris', preco: { gemas: 250 } },
  ];

  // ---------- AVATARES (a "fotinha" do perfil e do ranking) ----------
  // as setas são livres; cada chefe libera quando o jogador vence ele (arena) ou vence um desafio
  // da data dele (datas comemorativas)
  const AVATARES = [
    { id: 'seta-azul' }, { id: 'seta-verde' }, { id: 'seta-vermelha' }, { id: 'seta-amarela' },
    { id: 'magumbi', chefe: 1 }, { id: 'nevambi', chefe: 2 }, { id: 'egimbi', chefe: 3 }, { id: 'angembi', chefe: 4 },
    { id: 'nombi', data: 'natal' }, { id: 'cavembi', data: 'halloween' }, { id: 'bunnumbie', data: 'pascoa' }, { id: 'saintombie', data: 'patrick' },
  ];

  return { MISSOES, SEMANAIS, CONTADORES, vazio, doDia, daSemana, soma, progresso, pronta, CONQUISTAS, nivel, tier, ROLETA, sorteia, angulos, chances, SKINS, AVATARES };
});
