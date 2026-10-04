// Música de fundo (regras do dono):
//  - cada arena do Classic tem a sua faixa; o menu tem a dele; a tela de carregamento é silêncio;
//  - só toca com o app aberto e na frente: fechar, trocar de janela ou pausar o jogo PARA a música;
//  - volume próprio (0 = sem música, só os efeitos), separado do volume dos efeitos.
// A tela diz o que QUER tocar (Musica.quer) e o que está BLOQUEANDO (Musica.bloqueia); um laço de
// 50 ms faz as transições suaves. Lição do Nitrovenant: volume de mídia fora de [0,1] derruba a
// página inteira — aqui todo valor passa por `prende`.
(function (raiz) {
  'use strict';
  const FAIXAS = {
    menu: 'musica/menu.mp3', selva: 'musica/selva.mp3', magumbi: 'musica/magumbi.mp3',
    nevambi: 'musica/nevambi.mp3', egimbi: 'musica/egimbi.mp3', angembi: 'musica/angembi.mp3',
    // fases especiais das datas comemorativas (o Natal tem a sua)
    natal: 'musica/natal.mp3', especial: 'musica/especial.mp3',
  };
  const BASE = 0.5;       // volume máximo da música (com o nível no máximo): "não muito alta"
  const FADE = 0.06;      // quanto o volume anda a cada 50 ms (transição de ~0,8 s)
  const prende = v => (v > 1 ? 1 : v > 0 ? v : 0);
  const el = typeof Audio === 'function' ? new Audio() : null;
  if (el) { el.loop = true; el.preload = 'auto'; }
  let carregada = null;   // faixa no elemento
  let querida = null;     // faixa que o contexto pede
  let nivel = 0.5;        // 0..1, escolha do jogador
  const bloqueios = new Set(); // 'fundo' (app atrás), 'pausa' (jogo pausado)...
  let tocando = false, esperaGesto = false;

  function alvo() { return querida && nivel > 0 && !bloqueios.size ? BASE * nivel : 0; }
  function toca() {
    if (!el || tocando) return;
    const p = el.play();
    tocando = true;
    if (p && p.catch) p.catch(() => { tocando = false; esperaGesto = true; });
  }
  function para() { if (el && tocando) { el.pause(); tocando = false; } }

  function passo() {
    if (!el) return;
    const quer = alvo();
    // trocar de faixa: primeiro some a atual, depois entra a nova
    if (querida !== carregada) {
      if (el.volume > 0.001 && tocando) { el.volume = prende(el.volume - FADE); return; }
      para();
      carregada = querida;
      if (carregada) { el.src = FAIXAS[carregada]; el.volume = 0; }
      return;
    }
    if (!carregada) return;
    if (quer > 0) {
      if (!tocando) toca();
      if (Math.abs(el.volume - quer) > 0.001) el.volume = prende(el.volume + Math.max(-FADE, Math.min(FADE, quer - el.volume)));
    } else if (tocando) {
      if (el.volume > 0.001) el.volume = prende(el.volume - FADE * 1.5);
      else para();
    }
  }
  setInterval(passo, 50);
  // navegador de teste: sem o WebView do app, tocar exige um toque do jogador antes
  if (typeof document !== 'undefined') document.addEventListener('pointerdown', () => { if (esperaGesto) { esperaGesto = false; if (alvo() > 0) toca(); } }, true);

  const Musica = {
    quer(nome) { querida = nome && FAIXAS[nome] ? nome : null; },
    nivel(v) { nivel = prende(v); },
    bloqueia(motivo, sim) { if (sim) bloqueios.add(motivo); else bloqueios.delete(motivo); if (sim && bloqueios.size && el && tocando) { el.volume = 0; para(); } },
    // para os testes
    estado() { return { querida, carregada, tocando, volume: el ? el.volume : 0, bloqueios: [...bloqueios], nivel }; },
  };
  raiz.Musica = Musica;
})(this);
