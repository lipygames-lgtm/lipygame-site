'use strict';
// ADAPTADOR "LIPY" DO OVERCOUNTER: a versão que roda no próprio site (Jogos grátis do Lipy Hub).
// O build do Hub sai do repo overcounter-fps-int com window.__OC_PORTAL = "lipy": nenhum adaptador de portal
// casa com esse nome, então o jogo usa o adaptador vazio dele (sem SDK, sem anúncio, os botões de anúncio
// premiado ficam escondidos; o save é o localStorage). Este arquivo só faz duas coisas:
//   - idioma: o jogo lê navigator.languages; aqui vale o da página do Hub (?lang=, que chega como pt-BR, en, es...);
//   - avisos para a página (mesma origem), lidos do estado REAL do jogo (window.OVERCOUNTER.estado()):
//       carregou = o jogo saiu do carregamento (abertura, menu ou escolha de classe na tela);
//       fase     = começou uma partida (contagem/jogando, vindo de fora de uma partida; morrer e voltar não conta);
//       venceu   = a partida acabou com novo recorde ou missão cumprida; perdeu = a missão das Operações falhou.
//                  Batalha livre / Ondas / Resgate sem recorde não têm veredito: não manda nada (nada de número inventado).
// Carregado ANTES do módulo do jogo (tools/arcade/montar.mjs injeta).
(function () {
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.lang) {
    try { Object.defineProperty(navigator, 'language', { get: function () { return q.lang; }, configurable: true }); } catch (e) {}
    try { Object.defineProperty(navigator, 'languages', { get: function () { return [q.lang]; }, configurable: true }); } catch (e) {}
  }
  function avisa(o) { try { parent.postMessage(o, location.origin); } catch (e) {} }
  var NA_PARTIDA = { contagem: 1, jogando: 1, morto: 1, final: 1 };   // dentro de uma partida
  var NEUTRO = { pausado: 1, painel: 1, transicao: 1 };               // não mudam se estou ou não numa partida
  var carregou = false, dentro = false, ultimo = '', partidas = 0, t0 = Date.now();
  function veredito() {
    try {
      var O = window.OVERCOUNTER, log = O.eventos ? O.eventos() : [];
      var i = log.length - 1;
      while (i >= 0 && log[i].nome !== 'partida_fim') i--;
      // missão das Operações: o jogo emite operacao_fim logo antes de partida_fim
      if (i > 0 && log[i - 1].nome === 'operacao_fim' && O.operacoes) {
        var u = O.operacoes().ultimo && O.operacoes().ultimo();
        if (u) return u.vitoria ? 'venceu' : 'perdeu';
      }
      var novo = document.getElementById('fimNovo');
      if (novo && !novo.classList.contains('oculto')) return 'venceu';
    } catch (e) {}
    return null;
  }
  function olha() {
    var O = window.OVERCOUNTER, est = O && O.estado ? O.estado() : null;
    if (est) {
      if (!carregou && est !== 'carregando') { carregou = true; avisa({ lipy: 'carregou' }); }
      if (carregou && est !== ultimo) {
        if (NA_PARTIDA[est] && !dentro) { dentro = true; partidas++; avisa({ lipy: 'fase', n: partidas }); }
        else if (!NA_PARTIDA[est] && !NEUTRO[est]) dentro = false;
        if (est === 'fim') { var v = veredito(); if (v) avisa({ lipy: v, n: partidas }); }
        ultimo = est;
      }
    }
    if (carregou || Date.now() - t0 < 180000) setTimeout(olha, 250);
  }
  setTimeout(olha, 250);
})();
