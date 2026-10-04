// TRILHA SONORA (músicas do dono, em app/src/main/assets/music/).
// Uma faixa por vez, em laço. A abertura toca no menu e na garagem; a corrida reveza as cinco faixas,
// trocando de fase em fase; o Inferno tem as três dele. O volume é SEPARADO do resto do som porque o
// dono pediu para poder abaixar só a música ou desligá-la sem perder os efeitos.
//
// Regra de ouro, igual à dos vídeos: música nenhuma pode atrapalhar o jogo. Se o arquivo faltar, o
// formato não tocar ou o navegador recusar o autoplay, ela simplesmente não toca e ninguém trava.
(function (root) {
  'use strict';
  const LISTAS = {
    menu: ['menu'],
    race: ['race1', 'race2', 'race3', 'race4', 'race5'],
    hell: ['hell1', 'hell2', 'hell3'],
  };
  const Music = {
    el: null, faixa: '', vol: .7, alvo: .7, fade: 0, morto: false,
    // Volume de 0 a 100, como fica gravado no perfil.
    setVolume(v) {
      this.alvo = Math.max(0, Math.min(100, Number(v) || 0)) / 100;
      if (this.el && !this.fade) this.el.volume = this.alvo;
      // NÃO reata sozinho: quem manda tocar é o contexto (musicTick). Reatar aqui fazia esta linha
      // brigar com parar() e o <audio> levava uns 60 play/pause por segundo durante vídeo e pausa.
      if (this.alvo === 0 && this.el) { try { this.el.pause(); } catch (e) {} }
    },
    // Escolhe a faixa pelo contexto. `n` é a fase (ou a visita ao Inferno): é ele que faz o rodízio.
    set(tipo, n) {
      const lista = LISTAS[tipo] || LISTAS.menu;
      const nome = lista[(Math.max(1, Math.floor(n) || 1) - 1) % lista.length];
      // Mesma faixa: pode estar só pausada (vídeo, pausa, derrota) ou nunca ter começado, porque o volume
      // estava em OFF quando ela foi escolhida. Os dois casos voltam a tocar daqui.
      if (nome === this.faixa) {
        if (this.alvo > 0 && (!this.el || !this.el.src)) this.tocar(nome);
        else if (this.el && this.el.paused && this.alvo > 0) this.tenta();
        return;
      }
      this.faixa = nome;
      if (this.morto || this.alvo === 0) return;
      this.tocar(nome);
    },
    tocar(nome) {
      if (!this.el) {
        if (typeof Audio === 'undefined') { this.morto = true; return; }
        const a = new Audio();
        if (!a.canPlayType || !a.canPlayType('audio/mpeg')) { this.morto = true; return; }
        a.loop = true; a.preload = 'auto';
        a.onerror = () => { this.morto = true; }; // faixa faltando: segue o jogo sem música
        this.el = a;
      }
      this.el.src = 'music/' + nome + '.mp3';
      this.el.volume = 0; this.fade = 1; // entra subindo, para não estourar na troca
      this.tenta();
    },
    tenta() {
      if (!this.el) return;
      const r = this.el.play();
      if (r && r.catch) r.catch(() => {}); // autoplay recusado: o próximo toque na tela resolve
    },
    // Chamado a cada quadro: sobe o volume da faixa nova sem corte seco.
    // O primeiro quadro pode chegar com tempo NEGATIVO (o relógio do navegador é anterior ao do arranque),
    // e volume negativo derruba a página inteira. Por isso o passo e o volume são presos nos limites.
    tick(dt) {
      if (!this.el || !this.fade) return;
      const passo = Math.max(0, Math.min(.1, Number(dt) || 0));
      const v = Math.max(0, Math.min(1, this.el.volume + passo * this.alvo * 1.4));
      this.el.volume = Math.min(this.alvo, v);
      if (this.el.volume >= this.alvo - 1e-3) { this.el.volume = this.alvo; this.fade = 0; }
    },
    // Silêncio sem esquecer a faixa: usado na animação de abertura, na pausa e na derrota, para depois
    // voltar de onde estava em vez de recomeçar.
    parar() { if (this.el && !this.el.paused) { try { this.el.pause(); } catch (e) {} } },
    // O navegador só libera o áudio depois de um toque; isso reata o que ficou parado.
    destrava() { if (this.el && this.el.paused && this.alvo > 0 && this.faixa) this.tenta(); },
  };
  root.Music = Music;
})(typeof window !== 'undefined' ? window : globalThis);
