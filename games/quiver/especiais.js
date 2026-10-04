// FASES ESPECIAIS das datas comemorativas: na semana que termina no dia da data, os desafios do
// DESAFIO RELÂMPAGO (desafio.js) acontecem nesta cena — o chefe da data em cima do tabuleiro, o
// cenário vivo, a música e o aviso próprios. No "chefe fugitivo" ele luta; nos outros dois tipos ele
// assiste e provoca. Arte do dono (arte/especiais/), limpa por IA e recortada por tools/especiais.mjs.
// Tudo em pixels do espaço 941x1672 da arte (medido com tools/zoom-cantos.mjs e tools/confere-grade.mjs).
// Só dados: os textos (nome e falas dos chefes, avisos) estão em i18n.js.
(function (raiz) {
  const ESPECIAIS = {
    natal: {
      id: 'natal', chefe: 'nombi', ataque: 'gelo', musica: 'natal', cor: '#ff5a4a',
      luta: 'bg/especial-natal.webp',
      gradeLuta: [[172, 700], [784, 698], [150, 1350], [792, 1350]],
      sprite: { src: 'ui/chefe-natal.webp', x: 115, y: 54, w: 826, h: 570 },
      balaoLuta: { x: 24, y: 214, w: 290, h: 96, cauda: 'dir' },
      origem: [540, 300],
    },
    halloween: {
      id: 'halloween', chefe: 'cavembi', ataque: 'ilusao', musica: 'especial', cor: '#ff9a2a',
      luta: 'bg/especial-halloween.webp',
      gradeLuta: [[160, 695], [786, 695], [146, 1322], [818, 1320]],
      sprite: { src: 'ui/chefe-halloween.webp', x: 52, y: 79, w: 772, h: 524 },
      balaoLuta: { x: 640, y: 150, w: 280, h: 96, cauda: 'baixo-esq' },
      origem: [400, 270],
    },
    pascoa: {
      id: 'pascoa', chefe: 'bunnumbie', ataque: 'pedra', musica: 'especial', cor: '#ff7ad5',
      luta: 'bg/especial-pascoa.webp',
      gradeLuta: [[198, 690], [786, 690], [128, 1372], [824, 1372]],
      sprite: { src: 'ui/chefe-pascoa.webp', x: 30, y: 0, w: 879, h: 624 },
      balaoLuta: { x: 24, y: 120, w: 280, h: 96, cauda: 'dir' },
      origem: [470, 300],
    },
    patrick: {
      id: 'patrick', chefe: 'saintombie', ataque: 'pedra', musica: 'especial', cor: '#5aff6a',
      luta: 'bg/especial-patrick.webp',
      gradeLuta: [[176, 678], [798, 678], [120, 1390], [846, 1390]],
      sprite: { src: 'ui/chefe-patrick.webp', x: 33, y: 0, w: 815, h: 591 },
      balaoLuta: { x: 24, y: 214, w: 290, h: 96, cauda: 'dir' },
      origem: [610, 250],
    },
  };
  if (typeof module === 'object' && module.exports) module.exports = ESPECIAIS; else raiz.ESPECIAIS = ESPECIAIS;
})(this);
