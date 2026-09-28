/* ==========================================================================
   LIPY HUB — comportamento (sem bibliotecas: a página abre rápido no 4G)
   busca (paleta), copiar código, abas de região, votos, "há X min", índice, aparecer ao rolar
   ========================================================================== */
(function () {
  'use strict';
  var d = document, W = window, html = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var RM = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LANG = html.getAttribute('data-lang') || 'pt';
  var T = W.HUB_TEXTOS || {};
  var t = function (k, v) { var s = T[k] || k; if (v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }); return s; };
  var guarda = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  /* medição (Umami, sem cookie; só existe se o script dele estiver na página). Mesmos nomes do GA4 depois. */
  var JOGO = html.getAttribute('data-jogo') || '';
  var mede = function (nome, dados) { try { if (W.umami && typeof W.umami.track === 'function') W.umami.track(nome, dados); } catch (e) {} };
  // termo de busca sem dado pessoal: confere o termo INTEIRO e só depois corta em 40 caracteres.
  // Com @, cara de link (barra, www, http, .com/.br…) ou 7+ algarismos no total (telefone, CPF) não vai.
  var termoLimpo = function (s) {
    s = (s || '').toLowerCase().trim();
    if (/@|https?:|www\.|\/|\.(com|net|org|br|io|gg|me|app|info|xyz)\b/.test(s) || (s.match(/\d/g) || []).length >= 7) return '[omitido]';
    return s.slice(0, 40);
  };

  /* ---------------- menu do celular ---------------- */
  var hh = $('.hh'), menu = $('.hh__menu');
  if (hh && menu) {
    menu.addEventListener('click', function () {
      var aberto = hh.classList.toggle('is-aberto');
      menu.setAttribute('aria-expanded', aberto);
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && hh.classList.contains('is-aberto')) { hh.classList.remove('is-aberto'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); } });
  }

  /* ---------------- troca de idioma (details): fecha ao clicar fora ou com Esc ---------------- */
  var idm = $('[data-idioma]');
  if (idm) {
    $$('.hh__idiomas a', idm).forEach(function (a) {
      a.addEventListener('click', function () { var para = (a.getAttribute('hreflang') || '').slice(0, 2); if (para && para !== LANG) mede('language_switch', { from_lang: LANG, to_lang: para, method: 'menu' }); });
    });
    d.addEventListener('click', function (e) { if (idm.open && !idm.contains(e.target)) idm.open = false; });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && idm.open) { idm.open = false; $('summary', idm).focus(); } });
  }

  /* ---------------- "há X min": a data exata vem no HTML; aqui vira tempo relativo ---------------- */
  // árabe com algarismos latinos, como o resto da página (códigos, horas, contagens)
  var rel = W.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat((html.lang || LANG) + (LANG === 'ar' ? '-u-nu-latn' : ''), { numeric: 'auto' }) : null;
  var relativo = function () {
    $$('[data-quando]').forEach(function (el) {
      var ms = Date.parse(el.getAttribute('data-quando'));
      if (!ms || !rel) return;
      var s = Math.round((ms - Date.now()) / 1000), a = Math.abs(s);
      el.textContent = a < 60 ? rel.format(0, 'second') : a < 3600 ? rel.format(Math.round(s / 60), 'minute') : a < 86400 ? rel.format(Math.round(s / 3600), 'hour') : rel.format(Math.round(s / 86400), 'day');
    });
  };
  relativo();
  setInterval(relativo, 60000);

  /* ---------------- copiar código ---------------- */
  var copia = function (txt) {
    if (navigator.clipboard && W.isSecureContext) return navigator.clipboard.writeText(txt);
    return new Promise(function (ok, erro) {
      var ta = d.createElement('textarea');
      ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      d.body.appendChild(ta); ta.select();
      try { d.execCommand('copy') ? ok() : erro(); } catch (e) { erro(e); }
      ta.remove();
    });
  };
  var aviso = $('[data-aviso]');
  $$('[data-copiar]').forEach(function (bt) {
    bt.addEventListener('click', function () {
      var cod = bt.getAttribute('data-copiar'), card = bt.closest('.cod');
      copia(cod).then(function () {
        if (card) { card.classList.remove('is-copiado'); void card.offsetWidth; card.classList.add('is-copiado'); }
        if (aviso) aviso.textContent = t('Código {c} copiado', { c: cod });
        mede('code_copy', { game: JOGO, code_status: 'active', page_lang: LANG, position: $$('[data-copiar]').indexOf(bt) + 1 });
        setTimeout(function () { if (card) card.classList.remove('is-copiado'); }, 2200);
      }, function () { if (aviso) aviso.textContent = t('Não deu para copiar. Selecione o código e copie à mão.'); });
    });
  });

  /* ---------------- abas de região ---------------- */
  $$('[data-regioes]').forEach(function (box) {
    var bts = $$('[role="tab"]', box);
    var mostra = function (i, foco) {
      bts.forEach(function (b, j) {
        var on = i === j;
        b.setAttribute('aria-selected', on);
        b.tabIndex = on ? 0 : -1;
        var p = d.getElementById(b.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (foco) bts[i].focus();
      guarda.set('hub:regiao', bts[i].getAttribute('data-regiao'));
    };
    bts.forEach(function (b, i) {
      b.addEventListener('click', function () { mostra(i); });
      b.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (html.dir === 'rtl') dir = -dir;
        if (dir) { e.preventDefault(); mostra((i + dir + bts.length) % bts.length, true); }
      });
    });
    // lembra a região escolhida na última visita
    var salva = guarda.get('hub:regiao'), k = bts.findIndex(function (b) { return b.getAttribute('data-regiao') === salva; });
    if (k >= 0) mostra(k);
  });

  /* ---------------- votos "funcionou?" ----------------
     O voto vai para o servidor (public.hub_votar: um por aparelho, dá para trocar ou tirar tocando de novo) e o
     aparelho lembra qual botão ficou aceso. O placar (últimos 14 dias) vem numa chamada só, depois do load.
     Sem data-api (protótipo no computador), fica só no aparelho. */
  var API = html.getAttribute('data-api'), CHAVE = html.getAttribute('data-api-chave');
  var rpc = function (fn, args) {
    if (!API || !W.fetch) return Promise.resolve(null);
    return fetch(API + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE, 'Content-Type': 'application/json' }, body: JSON.stringify(args) })
      .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  };
  var caixas = $$('[data-votos]');
  var placar = function (box, p) {
    $('.sim b', box).textContent = p && p.sim > 0 ? p.sim : '';
    $('.nao b', box).textContent = p && p.nao > 0 ? p.nao : '';
    // muitos "não" nas últimas 48 h (conta do servidor): o código ganha um aviso, sem sumir da lista
    var card = box.closest('.cod'), suspeito = !!(p && p.estado === 'provavel_expirado') && !box.hasAttribute('data-permanente');
    if (!card) return;
    card.classList.toggle('cod--suspeito', suspeito);
    var av = $('.cod__alerta', card);
    if (suspeito && !av) { av = d.createElement('p'); av.className = 'cod__alerta'; av.setAttribute('role', 'status'); av.textContent = t('Vários jogadores disseram que este código parou de funcionar (últimas 48 h).'); card.appendChild(av); }
    else if (!suspeito && av) av.remove();
  };
  // depois de um "não funcionou": por quê? (expirou / já tinha usado / deu inválido) — ajuda a conferência a agir certo
  var pedeMotivo = function (box, id) {
    if ($('.votos__motivos', box) || box.hasAttribute('data-permanente')) return;
    var m = d.createElement('span');
    m.className = 'votos__motivos';
    m.innerHTML = '<span></span>';
    $('span', m).textContent = t('Por quê?');
    [['expirado', t('Expirou')], ['ja_usei', t('Já tinha usado')], ['invalido', t('Deu inválido')]].forEach(function (op) {
      var b = d.createElement('button');
      b.type = 'button';
      b.textContent = op[1];
      b.addEventListener('click', function () {
        m.remove();
        // só completa um "não" que já está valendo (outro voto a caminho ou trocado = ignora)
        if (box.getAttribute('aria-busy') === 'true' || guarda.get('hub:voto:' + id) !== 'nao') return;
        if (aviso) aviso.textContent = t('Obrigado! Isso ajuda a conferir mais rápido.');
        box.setAttribute('aria-busy', 'true');
        rpc('hub_votar', { p_chave: id, p_voto: 'nao', p_dispositivo: aparelho(), p_motivo: op[0] }).then(function (r) {
          box.removeAttribute('aria-busy');
          if (r && r.ok) placar(box, r);
        });
      });
      m.appendChild(b);
    });
    box.appendChild(m);
  };
  // código aleatório deste aparelho: é ele que identifica o voto (trocar de Wi-Fi para 4G não duplica nem
  // impede tirar o voto). Sem localStorage, vale enquanto a página estiver aberta.
  var meuAparelho = null;
  var aparelho = function () {
    if (meuAparelho) return meuAparelho;
    var a = guarda.get('hub:aparelho');
    if (!/^[a-z0-9]{16,40}$/.test(a || '')) {
      a = '';
      var cr = W.crypto && W.crypto.getRandomValues ? W.crypto.getRandomValues(new Uint8Array(12)) : null;
      for (var i = 0; i < 12; i++) a += ('0' + ((cr ? cr[i] : Math.floor(Math.random() * 256))).toString(16)).slice(-2);
      guarda.set('hub:aparelho', a);
    }
    return (meuAparelho = a);
  };
  caixas.forEach(function (box) {
    var id = box.getAttribute('data-votos'), sim = $('.sim', box), nao = $('.nao', box);
    var pinta = function (v) {
      sim.setAttribute('aria-pressed', v === 'sim');
      nao.setAttribute('aria-pressed', v === 'nao');
    };
    var soma = function (qual, d) { var n = $('b', qual === 'sim' ? sim : nao); var x = Math.max(0, (+n.textContent || 0) + d); n.textContent = x || ''; };
    pinta(guarda.get('hub:voto:' + id));
    [sim, nao].forEach(function (b) {
      b.addEventListener('click', function () {
        if (box.getAttribute('aria-busy') === 'true') return; // um voto de cada vez (a ordem não embaralha)
        var mm0 = $('.votos__motivos', box); if (mm0) mm0.remove(); // o "por quê?" era do voto anterior
        var v = b === sim ? 'sim' : 'nao', antes = guarda.get('hub:voto:' + id) || '';
        var novo = antes === v ? '' : v; // tocar de novo no mesmo botão tira o voto
        // na hora (otimista); a resposta do servidor corrige os números — ou desfaz tudo, se o voto não entrou
        if (antes) soma(antes, -1);
        if (novo) soma(novo, 1);
        guarda.set('hub:voto:' + id, novo);
        pinta(novo);
        if (!API) { if (aviso) aviso.textContent = novo ? t('Obrigado! Seu voto ajuda outros jogadores.') : t('Voto retirado.'); return; }
        box.setAttribute('aria-busy', 'true');
        rpc('hub_votar', { p_chave: id, p_voto: novo, p_dispositivo: aparelho() }).then(function (r) {
          box.removeAttribute('aria-busy');
          if (r && r.ok) {
            placar(box, r);
            mede('vote', { game: id.split(':')[0], vote_value: novo === 'sim' ? 'worked' : novo === 'nao' ? 'not_worked' : 'removed', page_lang: LANG });
            if (novo === 'nao') pedeMotivo(box, id);
            if (aviso) aviso.textContent = novo ? t('Obrigado! Seu voto ajuda outros jogadores.') : t('Voto retirado.');
            return;
          }
          if (novo) soma(novo, -1);
          if (antes) soma(antes, 1);
          guarda.set('hub:voto:' + id, antes);
          pinta(antes);
          if (aviso) aviso.textContent = r && r.erro === 'limite' ? t('Muitos votos seguidos. Tente de novo mais tarde.') : t('Não deu para registrar o voto agora. Tente de novo em instantes.');
        });
      });
    });
  });
  if (caixas.length && API) {
    // em lotes de 150 (o teto do servidor): o GTA San Andreas tem 340 caixas numa página só
    var buscaPlacar = function () {
      for (var ini = 0; ini < caixas.length; ini += 150) (function (lote) {
        rpc('hub_placares', { p_chaves: lote.map(function (b) { return b.getAttribute('data-votos'); }) }).then(function (m) {
          // caixa com voto a caminho fica com o número do próprio voto (a resposta dele traz o placar certo)
          if (m) lote.forEach(function (box) { if (box.getAttribute('aria-busy') !== 'true') placar(box, m[box.getAttribute('data-votos')]); });
        });
      })(caixas.slice(ini, ini + 150));
    };
    if (d.readyState === 'complete') buscaPlacar(); else W.addEventListener('load', buscaPlacar);
  }

  /* ---------------- busca: paleta de comando ---------------- */
  var paleta = $('[data-paleta]');
  if (paleta) {
    var campo = $('input', paleta), lista = $('.paleta__lista', paleta), itens = null, sel = 0, voltaFoco = null;
    var base = html.getAttribute('data-hub') || '';
    // busca sem acento e, no árabe, sem hamza/tashkeel (quase todo mundo digita أكواد como اكواد)
    var normal = function (s) {
      return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u064b-\u065f\u0670\u0640]/g, '').replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
        .replace(/\u0629/g, '\u0647').replace(/\u0649/g, '\u064a');
    };
    var desenha = function () {
      var q = normal(campo.value.trim());
      var achados = (itens || []).filter(function (it) { return !q || normal(it.t + ' ' + (it.k || '') + ' ' + (it.s || '')).indexOf(q) >= 0; }).slice(0, 8);
      sel = Math.min(sel, Math.max(0, achados.length - 1));
      lista.textContent = '';
      if (!achados.length) { vazio(t('Nada encontrado. Tente o nome do jogo.')); return; }
      achados.forEach(function (it, i) {
        var a = d.createElement('a');
        a.href = base + it.u;
        a.setAttribute('role', 'option');
        a.setAttribute('aria-selected', i === sel);
        // montado por elementos (nada de texto virando HTML)
        var ic;
        if (it.i) { ic = d.createElement('img'); ic.src = it.i.charAt(0) === '/' ? it.i : base + it.i; ic.width = 36; ic.height = 36; ic.alt = ''; }
        else { ic = d.createElement('span'); ic.className = 'mono-ic'; ic.style.setProperty('--c1', it.c || '#2ad8ff'); ic.style.setProperty('--c2', it.c2 || '#2170ff'); ic.textContent = it.m || '·'; }
        var tx = d.createElement('span'), b = d.createElement('b'), sm = d.createElement('small');
        b.textContent = it.t; sm.textContent = it.s || '';
        tx.appendChild(b); tx.appendChild(sm);
        a.appendChild(ic); a.appendChild(tx);
        lista.appendChild(a);
      });
    };
    var vazio = function (msg) { var p = d.createElement('p'); p.className = 'paleta__vazio'; p.textContent = msg; lista.textContent = ''; lista.appendChild(p); };
    var abre = function () {
      voltaFoco = d.activeElement;
      paleta.hidden = false;
      d.body.style.overflow = 'hidden';
      campo.value = '';
      campo.focus();
      if (itens) return desenha();
      vazio(t('Carregando…'));
      fetch(base + 'busca.json').then(function (r) { return r.json(); }).then(function (j) { itens = j; desenha(); }, function () { itens = []; desenha(); });
    };
    var fecha = function () { paleta.hidden = true; d.body.style.overflow = ''; if (voltaFoco) voltaFoco.focus(); };
    $$('[data-busca]').forEach(function (b) { b.addEventListener('click', abre); });
    paleta.addEventListener('click', function (e) { if (e.target === paleta) fecha(); });
    // busca medida 1,5 s depois da última tecla (3+ caracteres, 1 vez por termo): termo sem resultado vira pauta
    var buscaMedida = {}, esperaBusca = null;
    campo.addEventListener('input', function () {
      sel = 0; desenha();
      clearTimeout(esperaBusca);
      esperaBusca = setTimeout(function () {
        var termo = termoLimpo(campo.value);
        if (termo.length < 3 || buscaMedida[termo]) return;
        buscaMedida[termo] = 1;
        mede('search', { search_term: termo, results_count: $$('[role="option"]', lista).length, page_lang: LANG });
      }, 1500);
    });
    paleta.addEventListener('keydown', function (e) {
      var opcoes = $$('[role="option"]', lista);
      if (e.key === 'Escape') { e.preventDefault(); fecha(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + opcoes.length) % Math.max(1, opcoes.length);
        opcoes.forEach(function (o, i) { o.setAttribute('aria-selected', i === sel); });
        if (opcoes[sel]) opcoes[sel].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && opcoes[sel]) { e.preventDefault(); location.href = opcoes[sel].href; }
    });
    // "/" abre a busca de qualquer lugar (menos quando já se está digitando)
    d.addEventListener('keydown', function (e) {
      if (e.key !== '/' || !paleta.hidden) return;
      var tag = (d.activeElement && d.activeElement.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
      e.preventDefault();
      abre();
    });
  }

  /* ---------------- campo de busca grande da home: digita nomes de jogos sozinho ---------------- */
  var digita = $('[data-digita]');
  if (digita && !RM) {
    var nomes = (digita.getAttribute('data-digita') || '').split('|'), n = 0, c = 0, apagando = false;
    var passo = function () {
      var alvo = nomes[n] || '';
      c += apagando ? -1 : 1;
      digita.textContent = alvo.slice(0, c);
      var espera = apagando ? 40 : 90;
      if (!apagando && c >= alvo.length) { apagando = true; espera = 1600; }
      else if (apagando && c <= 0) { apagando = false; n = (n + 1) % nomes.length; espera = 300; }
      setTimeout(passo, espera);
    };
    setTimeout(passo, 800);
  }

  /* ---------------- índice da matéria: marca a seção que está na tela ---------------- */
  var links = $$('.indice a[href^="#"]');
  if (links.length && 'IntersectionObserver' in W) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-aqui', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    links.forEach(function (a) { var s = d.getElementById(a.getAttribute('href').slice(1)); if (s) io.observe(s); });
  }

  /* ---------------- aparecer ao rolar ---------------- */
  var rv = $$('.rv');
  if (rv.length && 'IntersectionObserver' in W && !RM) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visto'); io2.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io2.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('is-visto'); });

  /* ---------------- anúncios: só existem com o AdSense ligado (hub/ANUNCIOS + hub/anuncios.json) ---------------- */
  // só o bloco visível (o lateral some abaixo de 1100 px; bloco escondido com largura 0 dá erro no Google)
  $$('ins.adsbygoogle').forEach(function (ins) { if (ins.offsetWidth > 0) try { (W.adsbygoogle = W.adsbygoogle || []).push({}); } catch (e) {} });

  /* ---------------- clique na fonte oficial (X, Discord, Roblox, Instagram…) ---------------- */
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[target="_blank"][href^="http"]');
    if (!a) return;
    var dominio = ''; try { dominio = new URL(a.href).hostname.replace(/^www\./, ''); } catch (err) { return; }
    mede('source_click', { game: JOGO, source_domain: dominio, link_type: /play\.google|apps\.apple|store/.test(dominio) ? 'store' : 'official_source' });
  });
})();
