// Arenas do modo Classic (a regra do dono: arena 1 = 25 fases, arena 2 = 30, da 3ª em diante = 35,
// com um chefe no fim de cada uma a partir da 2ª). Tudo em pixels do espaço 941x1672 da arte do dono, medido nas
// telas originais (tools/acha-selos.mjs, tools/zoom-cantos.mjs, tools/confere-grade.mjs).
// Só dados: nenhum texto aqui (os textos, inclusive as falas dos chefes, estão em i18n.js).
(function (raiz) {
  const ARENAS = [
    {
      // arena 1: SEM chefe (decisão do dono: os chefes começam na arena 2)
      id: 'selva', n: 25, chefe: null,
      medalha: [560, 800], // recorte da arte do mapa (fundo 941x2332) no medalhão da tela final
      cor: '#ffb52b', // luzinhas do caminho entre as fases
      mapa: 'bg/classic.webp', jogo: 'bg/jogo.webp',
      // posições dos selos 1..25 (a arena 1 usa as peças da arte original: título, placa e painel)
      selos: [[110, 495], [245, 478], [390, 467], [520, 515], [650, 510], [790, 535],
        [90, 693], [215, 680], [345, 710], [470, 770], [600, 800], [750, 787],
        [120, 970], [260, 982], [400, 1000], [540, 1030], [680, 1045], [815, 1052],
        [110, 1190], [225, 1195], [340, 1203], [455, 1212], [570, 1225], [690, 1238], [815, 1258]],
      // na cidade (fileiras 3-4) a arte não tem luzinhas: o jogo desenha
      eloDe: 12, semElo: [17],
      grade: [[139, 530], [795, 530], [79, 1314], [835, 1314]],
    },
    {
      id: 'magumbi', n: 30, chefe: 'magumbi', ataque: 'pedra', cor: '#ff8a1a',
      medalha: [450, 900], // recorte da arte do mapa (fundo 941x2332) no medalhão da tela final
      mapa: 'bg/arena-magumbi-mapa.webp', jogo: 'bg/arena-magumbi-jogo.webp', luta: 'bg/arena-magumbi-chefe.webp',
      selos: [[144, 442], [295, 425], [441, 467], [594, 480], [746, 503], [139, 578], [321, 582], [458, 624], [612, 638], [770, 644],
        [167, 742], [330, 729], [477, 753], [625, 772], [781, 790], [157, 871], [326, 892], [480, 922], [635, 926], [785, 909],
        [127, 1026], [295, 1040], [439, 1089], [595, 1092], [100, 1256], [204, 1207], [325, 1257], [461, 1290], [575, 1388],
        [758, 1390]],
      // o caminho de luzinhas já está pintado na arte desta arena: o jogo não desenha outro
      eloDe: 30,
      titulo: { modo: [95, 130, 130, 50], classic: [140, 152, 435, 118], rot: -5, tema: 'fogo' },
      placa: { x: 150, y: 272, w: 405, h: 70, rot: -4.5 },
      painel: { x: 655, y: 195, w: 145, h: 118, rot: -8 },
      balao: { x: 640, y: 1010, w: 285, h: 96, cauda: 'baixo-dir' },
      grade: [[152, 522], [795, 522], [100, 1305], [815, 1305]],
      gradeLuta: [[147, 562], [805, 562], [112, 1365], [850, 1365]],
      sprite: { src: 'ui/chefe-magumbi.webp', x: 0, y: 0, w: 941, h: 550, grande: true },
      balaoLuta: { x: 600, y: 212, w: 320, h: 96, cauda: 'esq' },
      origem: [470, 250],
    },
    {
      id: 'nevambi', n: 35, chefe: 'nevambi', ataque: 'gelo', cor: '#7fd6ff',
      medalha: [640, 690], // recorte da arte do mapa (fundo 941x2332) no medalhão da tela final
      mapa: 'bg/arena-nevambi-mapa.webp', jogo: 'bg/arena-nevambi-jogo.webp', luta: 'bg/arena-nevambi-chefe.webp',
      // numeração de baixo para cima (como na arte)
      selos: [[210, 1389], [338, 1397], [474, 1414], [609, 1407], [754, 1399], [180, 1261], [317, 1285], [454, 1301], [602, 1290], [745, 1265],
        [212, 1143], [328, 1161], [466, 1178], [614, 1170], [772, 1144], [229, 988], [358, 1011], [477, 1042], [612, 1046], [752, 1041],
        [214, 887], [327, 862], [420, 887], [607, 864], [733, 848], [224, 695], [350, 718], [480, 742], [630, 739], [762, 763],
        [248, 591], [383, 607], [475, 570], [682, 540], [657, 392]],
      // luzinhas só dentro de cada fileira (como na arte): a volta de uma fileira para a outra não
      semElo: [4, 9, 14, 19, 24, 29],
      titulo: { modo: [85, 120, 160, 58], classic: [60, 155, 385, 128], rot: -6, tema: 'gelo' },
      placa: { x: 72, y: 296, w: 368, h: 66, rot: -8 },
      painel: null,
      balao: { x: 700, y: 130, w: 225, h: 104, cauda: 'baixo-esq' },
      grade: [[140, 512], [812, 512], [128, 1322], [832, 1325]],
      gradeLuta: [[148, 705], [798, 703], [92, 1395], [843, 1395]],
      sprite: { src: 'ui/chefe-nevambi.webp', x: 0, y: 48, w: 941, h: 640 },
      balaoLuta: { x: 690, y: 214, w: 235, h: 104, cauda: 'baixo-esq' },
      origem: [720, 300],
    },
    {
      id: 'egimbi', n: 35, chefe: 'egimbi', ataque: 'areia', cor: '#ffc83a',
      medalha: [770, 380], // recorte da arte do mapa (fundo 941x2332) no medalhão da tela final
      mapa: 'bg/arena-egimbi-mapa.webp', jogo: 'bg/arena-egimbi-jogo.webp', luta: 'bg/arena-egimbi-chefe.webp',
      selos: [[172, 429], [338, 398], [476, 438], [603, 452], [719, 461], [151, 548], [311, 551], [481, 582], [639, 586], [777, 557],
        [136, 658], [269, 683], [405, 716], [583, 743], [755, 729], [153, 854], [298, 836], [475, 852], [617, 860], [790, 837],
        [137, 960], [298, 969], [436, 999], [608, 1031], [773, 1041], [134, 1148], [290, 1163], [432, 1154], [560, 1153], [722, 1137],
        [156, 1273], [318, 1309], [464, 1342], [619, 1362], [784, 1362]],
      semElo: [4, 9, 14, 19, 24, 29],
      titulo: { modo: [95, 125, 155, 55], classic: [140, 150, 435, 125], rot: -5, tema: 'fogo' },
      placa: { x: 150, y: 268, w: 405, h: 70, rot: -4.5 },
      painel: { x: 660, y: 195, w: 142, h: 115, rot: -8 },
      balao: { x: 540, y: 1200, w: 230, h: 90, cauda: 'dir' },
      grade: [[148, 520], [806, 520], [118, 1318], [835, 1320]],
      gradeLuta: [[184, 598], [798, 598], [124, 1316], [790, 1322]],
      sprite: { src: 'ui/chefe-egimbi.webp', x: 68, y: 67, w: 873, h: 597 },
      balaoLuta: { x: 24, y: 214, w: 290, h: 96, cauda: 'dir' },
      origem: [560, 200],
    },
    {
      // chefe final: vida em DOBRO (pedido do dono). Se o tabuleiro acabar com ele vivo, vem outra
      // onda de setas (sessao.js) — a luta só termina com a vida no zero.
      id: 'angembi', n: 35, chefe: 'angembi', ataque: 'tudo', vida: 2, cor: '#ffe27a',
      medalha: [560, 930], // recorte da arte do mapa (fundo 941x2332) no medalhão da tela final
      mapa: 'bg/arena-angembi-mapa.webp', jogo: 'bg/arena-angembi-jogo.webp', luta: 'bg/arena-angembi-chefe.webp',
      selos: [[115, 419], [246, 408], [375, 431], [503, 439], [628, 458], [79, 539], [209, 541], [345, 555], [480, 575], [614, 566],
        [224, 679], [355, 685], [483, 702], [619, 730], [758, 734], [138, 818], [273, 820], [392, 838], [518, 869], [658, 862],
        [91, 949], [231, 956], [365, 978], [497, 1001], [646, 1010], [91, 1096], [228, 1107], [362, 1134], [487, 1156], [615, 1150],
        [87, 1315], [220, 1324], [346, 1349], [486, 1363], [648, 1389]],
      semElo: [4, 9, 14, 19, 24, 29],
      titulo: { modo: [95, 125, 155, 55], classic: [140, 150, 435, 120], rot: -5, tema: 'fogo' },
      placa: { x: 140, y: 262, w: 400, h: 68, rot: -4 },
      painel: { x: 655, y: 200, w: 140, h: 120, rot: -8 },
      balao: { x: 700, y: 990, w: 225, h: 96, cauda: 'baixo-dir' },
      grade: [[170, 524], [776, 524], [118, 1296], [838, 1296]],
      gradeLuta: [[186, 736], [770, 734], [116, 1446], [826, 1446]],
      sprite: { src: 'ui/chefe-angembi.webp', x: 0, y: 0, w: 941, h: 670 },
      balaoLuta: { x: 24, y: 214, w: 290, h: 96, cauda: 'dir' },
      origem: [330, 330],
    },
  ];
  // índice global da fase do Classic -> arena e posição dentro dela
  const BASE = []; let s = 0; for (const a of ARENAS) { BASE.push(s); s += a.n; }
  const TOTAL = s;
  function daFase(k) { let a = 0; while (a + 1 < ARENAS.length && k >= BASE[a + 1]) a++; return { a, j: k - BASE[a], arena: ARENAS[a] }; }
  const ARENAS_INFO = { ARENAS, BASE, TOTAL, daFase };
  if (typeof module === 'object' && module.exports) module.exports = ARENAS_INFO; else raiz.ARENAS_INFO = ARENAS_INFO;
})(this);
