/* LIPY HUB — seção JOGOS GRÁTIS
   - abre o jogo só no clique (página leve); tela cheia; no celular o jogo ocupa a tela toda com um botão "Sair";
   - ouve os avisos do jogo (postMessage do adaptador Lipy, mesma origem): carregou, fase, venceu, perdeu;
   - "Continue no celular": convite para baixar ESTE jogo na Play depois da 3ª fase vencida (nunca bloqueia o jogo);
     Android abre a ficha da Play; computador e iPhone veem o QR code;
   - mede no Umami (sem cookie): game_start, level_win, play_cta_view, play_cta_click, qr_open. */
(function () {
  var t = function (s) { return (window.HUB_TEXTOS && window.HUB_TEXTOS[s]) || s; };
  var tela = document.querySelector('.jg__tela[data-jogo]');
  var slugEl = document.querySelector('.jg__tela[data-slug]'), slug = slugEl ? slugEl.getAttribute('data-slug') : '';
  var ua = navigator.userAgent || '';
  var android = /Android/i.test(ua), ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var celular = matchMedia('(pointer: coarse)').matches || innerWidth < 760;
  var frame = null;

  function mede(nome, dados) { try { if (window.umami) umami.track(nome, Object.assign({ jogo: slug }, dados || {})); } catch (e) {} }
  function guarda(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- link da Play com a etiqueta de origem (o Play Console mostra as instalações vindas do Hub) ---------- */
  function comOrigem(href, momento) {
    if (!/play\.google\.com/.test(href)) return href;
    var base = href.split('&referrer=')[0];
    return base + '&referrer=' + encodeURIComponent('utm_source=lipyhub&utm_medium=web&utm_campaign=' + slug + '&utm_content=' + momento);
  }
  var qr = document.querySelector('[data-qr]');
  function abreQr() {
    if (!qr) return false;
    var ios1 = qr.querySelector('[data-ios]'); if (ios1) ios1.hidden = !ios;
    if (document.fullscreenElement && document.exitFullscreen) try { document.exitFullscreen(); } catch (e) {}
    if (tela) tela.classList.remove('is-cheia');
    if (qr.showModal) qr.showModal(); else qr.setAttribute('open', '');
    mede('qr_open');
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-baixar]');
    if (a) {
      var momento = a.getAttribute('data-baixar');
      a.href = comOrigem(a.href, momento);
      mede('play_cta_click', { momento: momento });
      // computador e iPhone: QR code (a Play no navegador do computador não instala no celular sozinha)
      if (!android && momento !== 'qr' && abreQr()) e.preventDefault();
      return;
    }
    if (e.target.closest && e.target.closest('[data-fecha-qr]')) { if (qr.close) qr.close(); else qr.removeAttribute('open'); }
  });
  if (qr) qr.addEventListener('click', function (e) { if (e.target === qr && qr.close) qr.close(); });

  if (!tela) return;

  /* ---------- convite "Continue no celular" ---------- */
  var cta = tela.querySelector('[data-cta]'), ctaTimer = 0, vitorias = 0;
  function mostraCta(momento) {
    if (!cta) return;
    var vezes = +(guarda('lipy-cta-' + slug) || 0);
    if (vezes >= 3) return;                      // no máximo 3 convites por visita
    guarda('lipy-cta-' + slug, String(vezes + 1));
    cta.querySelector('[data-baixar]').setAttribute('data-baixar', momento);
    cta.hidden = false; cta.classList.remove('is-saindo');
    mede('play_cta_view', { momento: momento });
    clearTimeout(ctaTimer);
    ctaTimer = setTimeout(escondeCta, 14000);    // some sozinho: é convite, não obrigação
  }
  function escondeCta() { if (!cta || cta.hidden) return; cta.classList.add('is-saindo'); setTimeout(function () { cta.hidden = true; }, 350); }
  if (cta) cta.querySelector('[data-fecha-cta]').addEventListener('click', escondeCta);

  var comecou = false;
  addEventListener('message', function (e) {
    if (e.origin !== location.origin || !frame || e.source !== frame.contentWindow) return;
    var d = e.data || {};
    if (d.lipy === 'fase' && !comecou) { comecou = true; mede('game_start'); }
    else if (d.lipy === 'venceu') {
      var n = +d.n || 0; vitorias++;
      mede('level_win', { fase: n });
      // 1º convite ao vencer a fase 3 (ou na 3ª vitória da visita, para quem já tinha progresso); depois, a cada 4 vitórias
      if (!guarda('lipy-cta3-' + slug) && (n >= 3 || vitorias >= 3)) { guarda('lipy-cta3-' + slug, '1'); setTimeout(function () { mostraCta('fase3'); }, 1800); }
      else if (guarda('lipy-cta3-' + slug) && vitorias % 4 === 0) setTimeout(function () { mostraCta('vitoria'); }, 1800);
    }
  });

  /* ---------- abrir o jogo, tela cheia ---------- */
  function cheia(liga) {
    if (liga) {
      var f = tela.requestFullscreen || tela.webkitRequestFullscreen;
      if (f) { try { var p = f.call(tela); if (p && p.catch) p.catch(function () { tela.classList.add('is-cheia'); }); return; } catch (e) {} }
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
      tela.insertBefore(frame, tela.firstChild); tela.appendChild(sair);
      tela.classList.add('is-jogando');
      mede('game_open');
    }
    if (celular) cheia(true);
    setTimeout(function () { try { frame.focus(); } catch (e) {} }, 50);
  }
  tela.querySelector('[data-abrir]').addEventListener('click', abrir);
  var bt = document.querySelector('[data-tela-cheia]');
  if (bt) bt.addEventListener('click', function () { if (!frame) abrir(); cheia(true); });
  document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement) tela.classList.remove('is-cheia'); });
  // link de campanha (?jogar=1): quem clicou no anúncio do jogo já cai jogando (no celular, ocupando a tela)
  // o Umami do site ignora o "?…" do endereço (privacidade): a origem da campanha vai num evento próprio
  try {
    var qs = new URLSearchParams(location.search);
    if (qs.get('utm_source')) mede('campanha', { origem: qs.get('utm_source'), meio: qs.get('utm_medium') || '', campanha: qs.get('utm_campaign') || '', criativo: qs.get('utm_content') || '' });
    // anúncio pago (utm_medium=paid/pago/cpc) também cai jogando, mesmo sem o ?jogar=1 no link
    if (qs.get('jogar') === '1' || /^(paid|pago|cpc)$/i.test(qs.get('utm_medium') || '')) { mede('campanha_entrada', { criativo: qs.get('utm_content') || '' }); abrir(); }
  } catch (e) {}
})();
