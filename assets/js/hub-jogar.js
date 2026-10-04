/* LIPY HUB — seção JOGAR: abre o jogo só no clique (página leve), tela cheia e, no celular, o jogo ocupa a
   tela toda com um botão "Sair". O jogo roda num iframe do próprio site (/games/<jogo>/). */
(function () {
  var tela = document.querySelector('.jg__tela[data-jogo]');
  if (!tela) return;
  var t = function (s) { return (window.HUB_TEXTOS && window.HUB_TEXTOS[s]) || s; };
  var celular = matchMedia('(pointer: coarse)').matches || innerWidth < 760;
  var frame = null;

  function cheia(liga) {
    if (liga) {
      var el = tela, f = el.requestFullscreen || el.webkitRequestFullscreen;
      if (f) { try { var p = f.call(el); if (p && p.catch) p.catch(function () { tela.classList.add('is-cheia'); }); return; } catch (e) {} }
      tela.classList.add('is-cheia');
    } else {
      tela.classList.remove('is-cheia');
      var sai = document.exitFullscreen || document.webkitExitFullscreen;
      if ((document.fullscreenElement || document.webkitFullscreenElement) && sai) try { sai.call(document); } catch (e) {}
    }
  }

  function abrir() {
    if (!frame) {
      frame = document.createElement('iframe');
      frame.src = tela.getAttribute('data-jogo');
      frame.title = tela.getAttribute('data-nome') || 'Jogo';
      frame.allow = 'fullscreen; autoplay; gamepad';
      frame.setAttribute('allowfullscreen', '');
      var sair = document.createElement('button');
      sair.type = 'button'; sair.className = 'jg__sair'; sair.textContent = '✕ ' + t('Sair');
      sair.addEventListener('click', function () { cheia(false); });
      tela.appendChild(frame); tela.appendChild(sair);
      tela.classList.add('is-jogando');
      try { if (window.umami) umami.track('jogar', { jogo: frame.title }); } catch (e) {}
    }
    if (celular) cheia(true);
    setTimeout(function () { try { frame.focus(); } catch (e) {} }, 50);
  }

  tela.querySelector('[data-abrir]').addEventListener('click', abrir);
  var bt = document.querySelector('[data-tela-cheia]');
  if (bt) bt.addEventListener('click', function () { if (!frame) abrir(); cheia(true); });
  // saiu da tela cheia do navegador (Esc, gesto de voltar): no celular, volta para a página
  document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement) tela.classList.remove('is-cheia'); });
})();
