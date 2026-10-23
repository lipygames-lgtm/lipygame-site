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
    var av = e.target.closest && e.target.closest('[data-avise]');
    if (av) { mede('avise_click'); return; }
    if (e.target.closest && e.target.closest('[data-fecha-qr]')) { if (qr.close) qr.close(); else qr.removeAttribute('open'); }
  });
  if (qr) qr.addEventListener('click', function (e) { if (e.target === qr && qr.close) qr.close(); });

  /* ---------- página "Jogos grátis": filtros (Em alta, Novos, categorias, Google Play) e "Continue jogando" ---------- */
  var mos = document.querySelector('[data-mosaico]');
  if (mos) {
    var nada = document.querySelector('[data-nada]');
    var filtra = function (b) {
      var f = b.getAttribute('data-filtro'), vistos = 0;
      document.querySelectorAll('[data-filtro]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      mos.querySelectorAll('[data-slug]').forEach(function (t) {
        var ok = f === 'todos' || (f === 'alta' && t.hasAttribute('data-alta')) || (f === 'novos' && t.hasAttribute('data-novo')) || (f === 'play' && t.hasAttribute('data-play')) || (' ' + t.getAttribute('data-cats') + ' ').indexOf(' ' + f + ' ') >= 0;
        t.hidden = !ok; if (ok) vistos++;
      });
      mos.classList.toggle('mos--filtrado', f !== 'todos');
      if (nada) nada.hidden = vistos > 0;
      mede('filtro', { filtro: f });
    };
    document.querySelectorAll('[data-filtro]').forEach(function (b) { b.addEventListener('click', function () { filtra(b); }); });
    // atalhos da vitrine ("Google Play", "Todos os jogos" em Explore por categoria): filtram a grade lá embaixo
    document.querySelectorAll('[data-filtro-ir]').forEach(function (a) {
      a.addEventListener('click', function () { var b = document.querySelector('[data-filtro="' + a.getAttribute('data-filtro-ir') + '"]'); if (b) filtra(b); });
    });
    var jogados = [];
    try { jogados = JSON.parse(localStorage.getItem('lipy-jogados') || '[]'); } catch (e) {}
    var cont = document.querySelector('[data-continue]');
    if (cont && jogados.length) {
      var lista = cont.querySelector('[data-continue-lista]');
      jogados.slice(0, 6).forEach(function (s) {
        var t = mos.querySelector('[data-slug="' + s + '"]');
        if (!t) return;
        var c = t.cloneNode(true); c.hidden = false; c.removeAttribute('data-alta');
        var al = c.querySelector('.lj-cap__etq'); if (al) al.remove();
        lista.appendChild(c);
      });
      cont.hidden = !lista.children.length;
    }
  }

  /* ---------- carrosséis (CSS scroll-snap): setas e pontinhos; o deslize com o dedo é do próprio navegador ---------- */
  document.querySelectorAll('[data-trilho]').forEach(function (raiz) {
    var tr = raiz.querySelector('.lj-trilho');
    if (!tr) return;
    var lado = getComputedStyle(tr).direction === 'rtl' ? -1 : 1;   // árabe: o "próximo" fica à esquerda
    var gap = function () { return parseFloat(getComputedStyle(tr).columnGap) || 0; };
    var item = function () { var f = tr.firstElementChild; return f ? f.offsetWidth + gap() : tr.clientWidth; };
    var pos = function () { return Math.abs(tr.scrollLeft); }, max = function () { return tr.scrollWidth - tr.clientWidth; };
    var passo = function () { return Math.max(1, Math.floor((tr.clientWidth + gap() + 2) / item())) * item(); };
    var ir = function (d) {
      if (d > 0 && pos() >= max() - 6) tr.scrollTo({ left: 0 });
      else if (d < 0 && pos() <= 6) tr.scrollTo({ left: lado * max() });
      else tr.scrollBy({ left: lado * d * passo() });
    };
    var ant = raiz.querySelector('[data-ant]'), prox = raiz.querySelector('[data-prox]');
    if (ant) ant.addEventListener('click', function () { ir(-1); });
    if (prox) prox.addEventListener('click', function () { ir(1); });
    var cabe = function () { raiz.classList.toggle('is-cabe', max() < 6); };
    cabe(); addEventListener('resize', cabe); addEventListener('load', cabe);
    var pts = raiz.querySelector('[data-pontos]');
    if (pts) {
      var bs = pts.querySelectorAll('button');
      tr.addEventListener('scroll', function () { var i = Math.round(pos() / item()); bs.forEach(function (b, k) { b.setAttribute('aria-current', String(k === i)); }); }, { passive: true });
      bs.forEach(function (b, k) { b.addEventListener('click', function () { tr.scrollTo({ left: lado * k * item() }); }); });
    }
  });

  /* ---------- abas da vitrine (Novos / Em destaque / Google Play) e a prévia ao lado (telas do jogo apontado) ---------- */
  var abas = document.querySelector('[data-abas]'), previa = document.querySelector('[data-previa]');
  var escH = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mostraPrevia = function (li) {
    if (!li || !previa) return;
    document.querySelectorAll('.lj-linha.is-ativa').forEach(function (x) { if (x !== li) x.classList.remove('is-ativa'); });
    li.classList.add('is-ativa');
    var telas = []; try { telas = JSON.parse(li.getAttribute('data-telas') || '[]'); } catch (e) {}
    var nome = li.querySelector('.lj-linha__nome'), gen = li.querySelector('.lj-linha__gen');
    previa.innerHTML = '<b class="lj-previa__nome">' + escH(nome ? nome.textContent : '') + '</b><span class="lj-previa__gen">' + escH(gen ? gen.textContent : '') + '</span><span class="lj-previa__telas">' +
      telas.map(function (t) { var s = escH(t[0]); return '<span class="lj-quadro">' + (t[1] ? '<span class="lj-arte lj-arte--retrato"><img class="lj-arte__fundo" src="' + s + '" alt=""><img src="' + s + '" alt=""></span>' : '<img class="lj-arte" src="' + s + '" alt="">') + '</span>'; }).join('') + '</span>';
  };
  if (abas) {
    var botoes = abas.querySelectorAll('[role="tab"]');
    var ativa = function (b, foco) {
      botoes.forEach(function (x) { var on = x === b, pn = document.getElementById(x.getAttribute('aria-controls')); x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; if (pn) pn.hidden = !on; });
      if (foco) b.focus();
      var pn = document.getElementById(b.getAttribute('aria-controls'));
      mostraPrevia(pn && pn.querySelector('.lj-linha'));
    };
    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () { ativa(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        if (document.documentElement.dir === 'rtl') d = -d;
        e.preventDefault(); ativa(botoes[(i + d + botoes.length) % botoes.length], true);
      });
    });
    document.querySelectorAll('.lj-lista').forEach(function (ls) {
      ['mouseover', 'focusin'].forEach(function (ev) { ls.addEventListener(ev, function (e) { var li = e.target.closest && e.target.closest('.lj-linha'); if (li && !li.classList.contains('is-ativa')) mostraPrevia(li); }); });
    });
  }

  /* ---------- telas da galeria em tamanho grande (sem JS, o link abre a imagem) ---------- */
  var zoom = document.querySelector('[data-zoom]');
  if (zoom && zoom.showModal) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-ampliar]');
      if (!a) return;
      e.preventDefault();
      var im = zoom.querySelector('img'), mini = a.querySelector('img');
      im.src = a.getAttribute('href'); im.alt = mini ? mini.alt : '';
      zoom.showModal();
    });
    zoom.addEventListener('click', function (e) { if (e.target === zoom || (e.target.closest && e.target.closest('[data-fecha-zoom]'))) zoom.close(); });
  }
  function anotaJogado() {
    try {
      var j = JSON.parse(localStorage.getItem('lipy-jogados') || '[]').filter(function (x) { return x !== slug; });
      j.unshift(slug); localStorage.setItem('lipy-jogados', JSON.stringify(j.slice(0, 12)));
    } catch (e) {}
  }

  /* ---------- conta do Hub (hub-conta.js / servidor/hub-social.sql): SÓ com login e perfil; sem conta, nada disso roda ----------
     - "jogando agora" + tempo de jogo: hub_presenca(slug) ao abrir o jogo e a cada 60 s, só com a aba visível
       (quem mede o tempo é o servidor: no máximo 60 s por batida, 1 que conta a cada 45 s);
     - partidas: os avisos do jogo (fase / venceu / perdeu) viram hub_evento, com folga no limite do banco
       (fase 1 a cada 10 s, venceu 1 a cada 5 s, perdeu 1 a cada 10 s, até 30 por minuto; "devagar" = pausa de 1 min);
     - "Seus amigos estão jogando" (vitrine) e "Amigos que jogam isto" (página do jogo): só amigos jogando DE VERDADE agora. */
  var C = window.LipyConta;
  var troca = function (s, v) { return s.replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); };
  var batT = 0, batUlt = 0, evUlt = {}, evJanela = [], evPausa = 0;
  var MIN_EV = { fase: 10000, venceu: 5000, perdeu: 10000 };
  function batida(saindo) {
    if (!C || !C.temPerfil() || !frame || !slug) return;
    if (!saindo && document.visibilityState !== 'visible') return;
    batUlt = Date.now();
    C.jogando(slug);   // marca no aparelho: as outras abas do Hub não mandam "online" por cima
    C.rpc('hub_presenca', { p_jogo: slug }, { keepalive: !!saindo }).then(C.premios);
  }
  function comecaPresenca() {
    if (!C || batT) return;
    C.jogando(slug);
    C.pronto.then(function () { batida(false); });
    batT = setInterval(function () { batida(false); }, 60000);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && Date.now() - batUlt > 50000) batida(false); });
    addEventListener('pagehide', function () { if (Date.now() - batUlt > 45000) batida(true); });
  }
  function eventoPartida(tipo) {
    if (!C || !C.temPerfil() || !MIN_EV[tipo] || !slug) return;
    var agora = Date.now();
    if (agora < evPausa || agora - (evUlt[tipo] || 0) < MIN_EV[tipo]) return;
    evJanela = evJanela.filter(function (x) { return agora - x < 60000; });
    if (evJanela.length >= 30) return;
    evUlt[tipo] = agora; evJanela.push(agora);
    C.rpc('hub_evento', { p_jogo: slug, p_tipo: tipo }).then(function (r) {
      if (r && r.erro === 'devagar') evPausa = Date.now() + 60000;
      C.premios(r);
    });
  }
  var blocoVit = document.querySelector('[data-amigos-jogando]'), blocoJogo = document.querySelector('[data-amigos-jogo]');
  function amigosJogando() {
    if (!C || !C.temPerfil() || (!blocoVit && !blocoJogo) || document.visibilityState !== 'visible') return;
    Promise.all([C.rpc('hub_amigos'), C.dados()]).then(function (x) {
      var r = x[0], D = x[1];
      if (!r || !r.ok) return;
      var jog = (r.amigos || []).filter(function (a) { return a.status === 'jogando' && a.jogo; });
      if (blocoVit) pintaAmigosVitrine(jog, D);
      if (blocoJogo) pintaAmigosJogo(jog.filter(function (a) { return a.jogo === slug; }), D);
    });
  }
  var cria = function (tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  function avatarAmigo(D, a) { var i = cria('img', 'lj-amg__av'); i.src = C.avatarDe(D, a.avatar); i.alt = ''; i.width = i.height = 64; i.loading = 'lazy'; return i; }
  function pintaAmigosVitrine(jog, D) {
    blocoVit.textContent = '';
    blocoVit.hidden = !jog.length;
    if (!jog.length) return;
    var cab = cria('div', 'lj-amg__cab'), h = cria('h2', 'lj-sec__t', t('Seus amigos estão jogando'));
    h.id = 'lj-amg-t'; blocoVit.setAttribute('aria-labelledby', 'lj-amg-t');
    var ver = cria('a', 'chip-col', t('Ver amigos')); ver.href = C.rotas.amigos;
    cab.appendChild(h); cab.appendChild(ver); blocoVit.appendChild(cab);
    var fila = cria('div', 'lj-amg__fila');
    jog.slice(0, 8).forEach(function (a) {
      var g = D.jogos[a.jogo], c = cria('a', 'lj-amg__card');
      c.href = (D.jogar || '') + a.jogo + '/';
      var arte = cria('span', 'lj-amg__arte' + (g && g[3] ? ' is-retrato' : ''));
      if (g) { var im = cria('img'); im.src = g[2]; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; arte.appendChild(im); }
      c.appendChild(arte);
      var corpo = cria('span', 'lj-amg__corpo');
      corpo.appendChild(avatarAmigo(D, a));
      var tx = cria('span', 'lj-amg__txt'), b = cria('b', '', a.apelido);
      b.setAttribute('translate', 'no'); b.dir = 'ltr';
      tx.appendChild(b);
      tx.appendChild(cria('span', 'lj-amg__st', troca(t('Jogando {jogo}'), { jogo: C.nomeJogo(D, a.jogo) })));
      if (a.desde) tx.appendChild(cria('small', '', troca(t('Começou {quando}'), { quando: C.ha(a.desde) })));
      corpo.appendChild(tx); c.appendChild(corpo);
      fila.appendChild(c);
    });
    blocoVit.appendChild(fila);
  }
  function pintaAmigosJogo(jog, D) {
    blocoJogo.textContent = '';
    blocoJogo.hidden = !jog.length;
    if (!jog.length) return;
    var h = cria('h2', '', t('Amigos que jogam isto'));
    h.id = 'lj-amg-jogo-t'; blocoJogo.setAttribute('aria-labelledby', 'lj-amg-jogo-t');
    blocoJogo.appendChild(h);
    var ul = cria('ul', 'lj-amg__lista');
    jog.slice(0, 8).forEach(function (a) {
      var li = cria('li'), ln = cria('a', 'lj-amg__pessoa');
      ln.href = C.rotas.perfil + '?u=' + encodeURIComponent(a.apelido);
      ln.appendChild(avatarAmigo(D, a));
      var tx = cria('span', 'lj-amg__txt'), b = cria('b', '', a.apelido);
      b.setAttribute('translate', 'no'); b.dir = 'ltr';
      tx.appendChild(b);
      tx.appendChild(cria('span', 'lj-amg__st', a.desde ? troca(t('Jogando agora · começou {quando}'), { quando: C.ha(a.desde) }) : t('Jogando agora')));
      ln.appendChild(tx); li.appendChild(ln); ul.appendChild(li);
    });
    blocoJogo.appendChild(ul);
  }
  if (C && (blocoVit || blocoJogo)) {
    C.pronto.then(amigosJogando);
    setInterval(amigosJogando, 120000);
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
  // navegador de quem joga (o do Instagram/Facebook/TikTok é bem diferente do Chrome/Safari normal)
  var NAVEGADOR = /Instagram/i.test(ua) ? 'instagram' : /FBAN|FBAV|FB_IAB/i.test(ua) ? 'facebook' : /musical_ly|TikTok|BytedanceWebview/i.test(ua) ? 'tiktok'
    : /SamsungBrowser/i.test(ua) ? 'samsung' : /CriOS|Chrome/i.test(ua) ? 'chrome' : /Safari/i.test(ua) ? 'safari' : /Firefox|FxiOS/i.test(ua) ? 'firefox' : 'outro';
  function iniciaSessao() {
    var qs = new URLSearchParams(location.search), ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '').split('.')[0] : ''; } catch (e) {}
    S = { id: uuid(), jogador: jogadorId(), t0: Date.now(), carregou: null, seg: 0, fase: 0, vit: 0, conv: 0, cliq: 0,
      origem: qs.get('utm_source') || (ref && ref !== 'lipygame' ? ref : 'organico'), campanha: qs.get('utm_campaign'), criativo: qs.get('utm_content'), erro: null };
    envia(false);
    [3000, 8000, 15000].forEach(function (ms) { setTimeout(function () { envia(true); }, ms); });
  }
  function envia(saindo) {
    if (!S || !API || !CHAVE) return;
    var corpo = JSON.stringify({ p_id: S.id, p_jogador: S.jogador, p_jogo: slug, p_idioma: html.getAttribute('data-lang'), p_aparelho: celular ? 'celular' : 'computador',
      p_origem: S.origem, p_campanha: S.campanha, p_criativo: S.criativo, p_carregou_ms: S.carregou, p_segundos: S.seg, p_fase_max: S.fase, p_vitorias: S.vit, p_convites: S.conv, p_cliques: S.cliq,
      p_vida_ms: Date.now() - S.t0, p_erro: S.erro, p_navegador: NAVEGADOR });
    if (corpo === enviado && !saindo) return;
    enviado = corpo;
    try { fetch(API + '/rest/v1/rpc/jogo_sessao', { method: 'POST', keepalive: !!saindo, headers: { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE, 'Content-Type': 'application/json' }, body: corpo }).catch(function () {}); } catch (e) {}
  }
  setInterval(function () { if (S && S.carregou != null && document.visibilityState === 'visible') S.seg++; }, 1000);
  setInterval(function () { envia(false); }, 30000);
  addEventListener('pagehide', function () { envia(true); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') envia(true); });

  /* ---------- nota do jogo (gostei / não gostei): um voto por aparelho, dá para trocar ou tirar tocando de novo ---------- */
  var lg = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };
  var nota = document.querySelector('[data-nota]');
  if (nota && API && CHAVE) {
    var rpcNota = function (fn, args) {
      return fetch(API + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE, 'Content-Type': 'application/json' }, body: JSON.stringify(args) })
        .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    };
    var aparelhoNota = function () {
      var a = lg('lipy-aparelho');
      if (!/^[a-z0-9]{16,40}$/.test(a || '')) {
        a = '';
        var cr = window.crypto && window.crypto.getRandomValues ? window.crypto.getRandomValues(new Uint8Array(12)) : null;
        for (var i = 0; i < 12; i++) a += ('0' + ((cr ? cr[i] : Math.floor(Math.random() * 256))).toString(16)).slice(-2);
        lg('lipy-aparelho', a);
      }
      return a;
    };
    var pinta = function (sim, nao) {
      var bs = nota.querySelectorAll('button'), meu = lg('lipy-nota-' + slug) || '';
      bs[0].querySelector('b').textContent = sim > 0 ? sim : ''; bs[1].querySelector('b').textContent = nao > 0 ? nao : '';
      bs[0].setAttribute('aria-pressed', String(meu === 'sim')); bs[1].setAttribute('aria-pressed', String(meu === 'nao'));
    };
    pinta(0, 0);
    addEventListener('load', function () {
      rpcNota('jogo_notas', {}).then(function (lista) {
        var x = (lista || []).filter(function (n) { return n.slug === slug; })[0];
        if (x) pinta(x.sim, x.nao);
      });
    });
    nota.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-voto]');
      if (!b) return;
      var v = b.getAttribute('data-voto'), novo = (lg('lipy-nota-' + slug) === v) ? '' : v;
      rpcNota('jogo_votar', { p_slug: slug, p_voto: novo, p_dispositivo: aparelhoNota() }).then(function (r) {
        if (!r || !r.ok) return;
        lg('lipy-nota-' + slug, novo);
        pinta(r.sim, r.nao);
        mede('game_vote', { voto: novo || 'tirou' });
      });
    });
  }

  /* ---------- convite "Continue no celular" ---------- */
  var cta = tela.querySelector('[data-cta]'), ctaTimer = 0, vitorias = 0;
  function mostraCta(momento) {
    if (!cta) return;
    var vezes = +(guarda('lipy-cta-' + slug) || 0);
    if (vezes >= 3) return;                      // no máximo 3 convites por visita
    guarda('lipy-cta-' + slug, String(vezes + 1));
    var bx = cta.querySelector('[data-baixar]'); if (bx) bx.setAttribute('data-baixar', momento);
    cta.hidden = false; cta.classList.remove('is-saindo');
    mede('play_cta_view', { momento: momento });
    if (S) S.conv++;
    clearTimeout(ctaTimer);
    ctaTimer = setTimeout(escondeCta, 14000);    // some sozinho: é convite, não obrigação
  }
  function escondeCta() { if (!cta || cta.hidden) return; cta.classList.add('is-saindo'); setTimeout(function () { cta.hidden = true; }, 350); }
  if (cta) cta.querySelector('[data-fecha-cta]').addEventListener('click', escondeCta);

  // convite por tempo: depois de ~100 s de jogo (jogos sem fases, como o Hoparade, nunca disparam o convite de vitória)
  var ctaTempo = +(tela.getAttribute('data-cta-tempo') || 0), ctaTempoT = 0;
  function agendaCtaTempo() {
    if (!ctaTempo || !cta || ctaTempoT) return;
    ctaTempoT = setTimeout(function () { if (document.visibilityState === 'visible' && !guarda('lipy-cta3-' + slug)) { guarda('lipy-cta3-' + slug, '1'); mostraCta('tempo'); } }, ctaTempo * 1000);
  }
  var comecou = false, jaPronto = false;  // jaPronto: o jogo apareceu na tela (evento 'lipy:jogo-pronto' para o Pixel)
  addEventListener('message', function (e) {
    if (e.origin !== location.origin || !frame || e.source !== frame.contentWindow) return;
    var d = e.data || {};
    if (d.lipy === 'fase' || d.lipy === 'venceu' || d.lipy === 'perdeu') eventoPartida(d.lipy);   // conta do Hub (só com login)
    if (d.lipy === 'carregou') { tiraEspera(); agendaCtaTempo(); if (!jaPronto) { jaPronto = true; window.lipyJogou = 1; try { document.dispatchEvent(new Event('lipy:jogou')); } catch (e) {} try { document.dispatchEvent(new CustomEvent('lipy:jogo-pronto', { detail: { jogo: slug } })); } catch (e) {} } }
    if (d.lipy === 'carregou' && S && S.carregou == null) { S.carregou = Date.now() - S.t0; envia(false); }
    if (d.lipy === 'erro' && S && !S.erro) { S.erro = String(d.msg || '').slice(0, 160); envia(true); }
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
  var espera = null;
  function tiraEspera() { if (!espera) return; var e = espera; espera = null; e.classList.add('is-saindo'); setTimeout(function () { e.remove(); }, 400); }
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
      // enquanto o jogo carrega: a imagem do jogo (poucos KB, já em cache) + 'Carregando o jogo…'.
      // NÃO usar vídeo aqui: 2 MB de vídeo disputavam a banda do celular com o próprio jogo (medido em 08/10).
      var vsrc = tela.getAttribute('data-video');
      if (vsrc) {
        espera = document.createElement('div'); espera.className = 'jg__espera';
        espera.innerHTML = '<img alt="" decoding="async"><p><i></i>' + (tela.getAttribute('data-carregando') || '') + '</p>';
        espera.querySelector('img').src = vsrc.replace(/gameplay\.mp4$/, 'gameplay-poster.webp');
        tela.appendChild(espera);
        setTimeout(tiraEspera, 25000);
      }
      tela.classList.add('is-jogando');
      mede('game_open');
      // avisa o Pixel da Meta (hub.mjs): o jogo também abre sozinho no link de campanha, sem clique
      iniciaSessao();
      anotaJogado();
      comecaPresenca();   // "jogando agora" e tempo de jogo na conta do Hub (só com login)
    }
    if (celular) cheia(true);
    setTimeout(function () { try { frame.focus(); } catch (e) {} }, 50);
  }
  tela.querySelector('[data-abrir]').addEventListener('click', abrir);
  // "Jogar grátis no navegador" da ficha (coluna da direita): leva até o palco e abre o jogo nele
  document.querySelectorAll('[data-abrir-jogo]').forEach(function (b) {
    b.addEventListener('click', function () { try { tela.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {} abrir(); });
  });
  var bt = document.querySelector('[data-tela-cheia]');
  if (bt) bt.addEventListener('click', function () { if (!frame) abrir(); cheia(true); });
  document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement) tela.classList.remove('is-cheia'); });
  // link de campanha (?jogar=1): quem clicou no anúncio do jogo já cai jogando (no celular, ocupando a tela)
  // o Umami do site ignora o "?…" do endereço (privacidade): a origem da campanha vai num evento próprio
  try {
    var qs = new URLSearchParams(location.search);
    if (qs.get('utm_source')) mede('campanha', { origem: qs.get('utm_source'), meio: qs.get('utm_medium') || '', campanha: qs.get('utm_campaign') || '', criativo: qs.get('utm_content') || '' });
    // anúncio pago (utm_medium=paid/pago/cpc) também cai jogando, mesmo sem o ?jogar=1 no link
    // robôs (Google, Bing, prévia de link) NÃO abrem o jogo sozinho: seriam 30–90 MB baixados para nada
    var robo = /bot|crawl|spider|slurp|facebookexternalhit|bingpreview|lighthouse|headless|pagespeed|preview/i.test(navigator.userAgent || '');
    if (!robo && (qs.get('jogar') === '1' || /^(paid|pago|cpc)$/i.test(qs.get('utm_medium') || ''))) { mede('campanha_entrada', { criativo: qs.get('utm_content') || '' }); abrir(); }
    // botão "Jogar" do banner da vitrine (…/<jogo>/#jogar): a pessoa já pediu para jogar, o jogo abre no palco
    else if (!robo && location.hash === '#jogar') { mede('vitrine_jogar'); abrir(); }
  } catch (e) {}
})();
