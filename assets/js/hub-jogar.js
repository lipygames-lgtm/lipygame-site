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
      if (S) S.cliq++;
      // computador e iPhone: QR code (a Play no navegador do computador não instala no celular sozinha)
      if (!android && momento !== 'qr' && abreQr()) e.preventDefault();
      return;
    }
    if (e.target.closest && e.target.closest('[data-fecha-qr]')) { if (qr.close) qr.close(); else qr.removeAttribute('open'); }
  });
  if (qr) qr.addEventListener('click', function (e) { if (e.target === qr && qr.close) qr.close(); });

  /* ---------- página "Jogos grátis": filtros (Em alta, Novos, categorias) e "Continue jogando" ---------- */
  var mos = document.querySelector('[data-mosaico]');
  if (mos) {
    var nada = document.querySelector('[data-nada]');
    document.querySelectorAll('[data-filtro]').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filtro'), vistos = 0;
        document.querySelectorAll('[data-filtro]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        mos.querySelectorAll('.tl').forEach(function (t) {
          var ok = f === 'todos' || (f === 'alta' && t.hasAttribute('data-alta')) || (f === 'novos' && t.hasAttribute('data-novo')) || (' ' + t.getAttribute('data-cats') + ' ').indexOf(' ' + f + ' ') >= 0;
          t.hidden = !ok; if (ok) vistos++;
        });
        mos.classList.toggle('mos--filtrado', f !== 'todos');
        if (nada) nada.hidden = vistos > 0;
        mede('filtro', { filtro: f });
      });
    });
    var jogados = [];
    try { jogados = JSON.parse(localStorage.getItem('lipy-jogados') || '[]'); } catch (e) {}
    var cont = document.querySelector('[data-continue]');
    if (cont && jogados.length) {
      var lista = cont.querySelector('.arc__continue-lista');
      jogados.slice(0, 6).forEach(function (s) {
        var t = mos.querySelector('.tl[data-slug="' + s + '"]');
        if (!t) return;
        var c = t.cloneNode(true); c.classList.remove('tl--g'); c.removeAttribute('data-alta');
        var al = c.querySelector('.tl__alta'); if (al) al.remove();
        lista.appendChild(c);
      });
      cont.hidden = !lista.children.length;
    }
  }
  function anotaJogado() {
    try {
      var j = JSON.parse(localStorage.getItem('lipy-jogados') || '[]').filter(function (x) { return x !== slug; });
      j.unshift(slug); localStorage.setItem('lipy-jogados', JSON.stringify(j.slice(0, 12)));
    } catch (e) {}
  }

  if (!tela) return;

  /* ---------- métricas privadas da sessão (servidor/metricas-jogos.sql) ----------
     Um código aleatório por navegador (sem dado pessoal) + uma sessão por vez que o jogo é aberto. Conta o tempo
     JOGANDO de verdade: jogo carregado e página visível. Manda o estado a cada 30 s e ao sair da página. */
  var html = document.documentElement, API = html.getAttribute('data-api'), CHAVE = html.getAttribute('data-api-chave');
  var S = null, enviado = '';
  function jogadorId() {
    var j = null;
    try { j = localStorage.getItem('lipy-jogador'); } catch (e) {}
    if (!/^[0-9a-f]{16}$/.test(j || '')) {
      j = Array.prototype.map.call(crypto.getRandomValues(new Uint8Array(8)), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
      try { localStorage.setItem('lipy-jogador', j); } catch (e) {}
    }
    return j;
  }
  function uuid() { try { return crypto.randomUUID(); } catch (e) { var h = Array.prototype.map.call(crypto.getRandomValues(new Uint8Array(16)), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); return h.slice(0, 8) + '-' + h.slice(8, 12) + '-4' + h.slice(13, 16) + '-a' + h.slice(17, 20) + '-' + h.slice(20, 32); } }
  function iniciaSessao() {
    var qs = new URLSearchParams(location.search), ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '').split('.')[0] : ''; } catch (e) {}
    S = { id: uuid(), jogador: jogadorId(), t0: Date.now(), carregou: null, seg: 0, fase: 0, vit: 0, conv: 0, cliq: 0,
      origem: qs.get('utm_source') || (ref && ref !== 'lipygame' ? ref : 'organico'), campanha: qs.get('utm_campaign'), criativo: qs.get('utm_content') };
  }
  function envia(saindo) {
    if (!S || !API || !CHAVE) return;
    var corpo = JSON.stringify({ p_id: S.id, p_jogador: S.jogador, p_jogo: slug, p_idioma: html.getAttribute('data-lang'), p_aparelho: celular ? 'celular' : 'computador',
      p_origem: S.origem, p_campanha: S.campanha, p_criativo: S.criativo, p_carregou_ms: S.carregou, p_segundos: S.seg, p_fase_max: S.fase, p_vitorias: S.vit, p_convites: S.conv, p_cliques: S.cliq });
    if (corpo === enviado) return;
    enviado = corpo;
    try { fetch(API + '/rest/v1/rpc/jogo_sessao', { method: 'POST', keepalive: !!saindo, headers: { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE, 'Content-Type': 'application/json' }, body: corpo }).catch(function () {}); } catch (e) {}
  }
  setInterval(function () { if (S && S.carregou != null && document.visibilityState === 'visible') S.seg++; }, 1000);
  setInterval(function () { envia(false); }, 30000);
  addEventListener('pagehide', function () { envia(true); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') envia(true); });

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
    if (S) S.conv++;
    clearTimeout(ctaTimer);
    ctaTimer = setTimeout(escondeCta, 14000);    // some sozinho: é convite, não obrigação
  }
  function escondeCta() { if (!cta || cta.hidden) return; cta.classList.add('is-saindo'); setTimeout(function () { cta.hidden = true; }, 350); }
  if (cta) cta.querySelector('[data-fecha-cta]').addEventListener('click', escondeCta);

  var comecou = false;
  addEventListener('message', function (e) {
    if (e.origin !== location.origin || !frame || e.source !== frame.contentWindow) return;
    var d = e.data || {};
    if (d.lipy === 'carregou' && S && S.carregou == null) { S.carregou = Date.now() - S.t0; envia(false); }
    if (d.lipy === 'fase' && !comecou) { comecou = true; mede('game_start'); }
    else if (d.lipy === 'venceu') {
      var n = +d.n || 0; vitorias++;
      if (S) { S.vit++; S.fase = Math.max(S.fase, n); }
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
      iniciaSessao();
      anotaJogado();
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
