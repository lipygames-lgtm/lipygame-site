// Rede de segurança da tela de abertura: se o jogo estourar antes de assumir a tela preta, ela sai
// sozinha. Sem isto, um erro no arranque deixaria o aparelho num preto permanente.
//
// Isto MORA NUM ARQUIVO de propósito: a CSP do index.html é `script-src 'self'`, que bloqueia script
// inline. Escrito dentro do HTML, como estava até a 0.14.0, ele nunca chegava a rodar.
(function () {
  var inicio = Date.now();
  function confere() {
    var c = document.getElementById('cine');
    if (!c || c.dataset.on) return;              // a abertura assumiu a tela: nada a fazer
    // O jogo chegou a carregar, só está devagar? Então a abertura ainda vem — esperar evita que a
    // garagem pisque meio montada e o vídeo a cubra logo em seguida num aparelho lento.
    if (window.game && Date.now() - inicio < 15000) { setTimeout(confere, 1000); return; }
    c.classList.add('hidden');                   // add, não className=: não apaga as outras classes
  }
  setTimeout(confere, 5000);
})();
