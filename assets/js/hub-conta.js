/* ==========================================================================
   LIPY HUB — CONTA (carrega em TODAS as páginas do Hub, depois do hub.js)
   Login com Google/Discord pelo Supabase Auth (GoTrue) com PKCE, chamado direto, SEM biblioteca (a página fica leve).
   - Sessão no localStorage "lipy-hub-sessao": só os dois tokens e a validade (nada de e-mail, nome ou foto).
   - Botão "Entrar" e o botão de cada provedor só aparecem com o provedor LIGADO no Auth (/auth/v1/settings, guardado
     por algumas horas). Sem provedor ligado, o Hub fica igual ao de antes.
   - A volta do Google/Discord cai SEMPRE na página "entrar" do idioma (data-rota-entrar): lá o código vira sessão e,
     na 1ª vez, o hub-social.js mostra o cadastro. Depois a pessoa volta para a página de onde saiu.
   - API para os outros scripts: window.LipyConta (rpc com o token, aviso na tela, nomes das conquistas…).
   - Presença "online" (hub_presenca sem jogo) a cada 60 s, só logado, com perfil e com a aba visível. O "jogando
     agora" é do hub-jogar.js (ele avisa por LipyConta.jogando(slug) e esta batida para).
   Banco e funções: servidor/hub-social.sql e servidor/hub-social-API.md.
   ========================================================================== */
(function () {
  'use strict';
  var d = document, W = window, html = d.documentElement;
  var API = html.getAttribute('data-api'), CHAVE = html.getAttribute('data-api-chave');
  var LANG = html.getAttribute('data-lang') || 'pt';
  var T = W.HUB_TEXTOS || {};
  var t = function (k, v) { var s = T[k] || k; if (v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }); return s; };
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var raiz = $('[data-conta]');
  var ROTAS = {
    entrar: raiz ? raiz.getAttribute('data-rota-entrar') : '', perfil: raiz ? raiz.getAttribute('data-rota-perfil') : '',
    amigos: raiz ? raiz.getAttribute('data-rota-amigos') : '', config: raiz ? raiz.getAttribute('data-rota-config') : '',
    dados: raiz ? raiz.getAttribute('data-dados') : '', hub: html.getAttribute('data-hub') || '/hub/'
  };

  /* ---------- guardar no aparelho: localStorage; sem ele, sessionStorage; sem nenhum, só na memória desta página ---------- */
  var memo = {};
  var guarda = {
    get: function (k) {
      var v = null;
      try { v = localStorage.getItem(k); } catch (e) {}
      if (v == null) try { v = sessionStorage.getItem(k); } catch (e) {}
      if (v == null && memo[k] != null) v = memo[k];
      try { return v == null ? null : JSON.parse(v); } catch (e) { return null; }
    },
    set: function (k, o) {
      var v = JSON.stringify(o);
      memo[k] = v;
      try { localStorage.setItem(k, v); return; } catch (e) {}
      try { sessionStorage.setItem(k, v); } catch (e) {}
    },
    del: function (k) {
      delete memo[k];
      try { localStorage.removeItem(k); } catch (e) {}
      try { sessionStorage.removeItem(k); } catch (e) {}
    }
  };
  var K_SESSAO = 'lipy-hub-sessao', K_EU = 'lipy-hub-eu', K_PKCE = 'lipy-hub-pkce', K_PROV = 'lipy-hub-provedores', K_VOLTA = 'lipy-hub-volta', K_BATIDA = 'lipy-hub-batida';
  var agora = function () { return Math.floor(Date.now() / 1000); };

  /* ---------- sessão ---------- */
  var sessao = function () { var s = guarda.get(K_SESSAO); return s && s.a && s.r ? s : null; };
  var cab = function (tk) { var h = { apikey: CHAVE, 'Content-Type': 'application/json' }; if (tk) h.Authorization = 'Bearer ' + tk; return h; };
  function salva(j) {
    var s = { a: j.access_token, r: j.refresh_token, e: +j.expires_at || (agora() + (+j.expires_in || 3600)) };
    guarda.set(K_SESSAO, s);
    return s;
  }
  function esquece() {
    var tinha = !!sessao();
    guarda.del(K_SESSAO); guarda.del(K_EU); EU = null; ultimoEu = null;
    if (tinha) { pinta(); emite(); }
  }
  // renova o token (1 por vez, também entre abas: navigator.locks quando existe)
  var renovando = null;
  function renova(velha) {
    if (renovando) return renovando;
    var faz = function () {
      var s = sessao();
      if (!s) return Promise.resolve(null);
      if (velha && s.r !== velha.r && s.e - 60 > agora()) return Promise.resolve(s);   // outra aba já renovou
      return fetch(API + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: cab(), body: JSON.stringify({ refresh_token: s.r }) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { st: r.status, j: j }; }); })
        .then(function (x) {
          if (x.st === 200 && x.j && x.j.access_token) return salva(x.j);
          if (x.st >= 400 && x.st < 500) {
            var s2 = sessao();
            if (s2 && s2.r !== s.r) return s2;      // outra aba renovou no meio do caminho
            esquece(); return null;                 // sessão vencida ou revogada: entrar de novo
          }
          return s;                                  // servidor fora: fica com a que tinha e tenta depois
        }, function () { return s; });
    };
    var p = navigator.locks && navigator.locks.request ? navigator.locks.request('lipy-hub-sessao', faz) : faz();
    renovando = Promise.resolve(p).then(function (x) { renovando = null; return x; }, function () { renovando = null; return sessao(); });
    return renovando;
  }
  function token(forca) {
    var s = sessao();
    if (!s || !API) return Promise.resolve(null);
    if (!forca && s.e - 60 > agora()) return Promise.resolve(s.a);
    return renova(s).then(function (n) { return n ? n.a : null; });
  }

  /* ---------- chamada ao banco (public.hub_*) com o token da pessoa ----------
     Sempre devolve um objeto: {ok:true,...} ou {ok:false, erro:'<código>'}; 'rede' = sem resposta do servidor. */
  function rpc(fn, args, op) {
    op = op || {};
    if (!API) return Promise.resolve({ ok: false, erro: 'rede' });
    var vai = function (tk) {
      return fetch(API + '/rest/v1/rpc/' + fn, { method: 'POST', keepalive: !!op.keepalive, headers: cab(tk), body: JSON.stringify(args || {}) });
    };
    return token().then(function (tk) {
      if (!tk) return { ok: false, erro: 'sem_login' };
      return vai(tk).then(function (r) {
        if (r.status !== 401 || op.keepalive) return r;
        return token(true).then(function (tk2) { return tk2 ? vai(tk2) : r; });   // token vencido: renova e tenta 1 vez
      }).then(function (r) {
        return r.json().catch(function () { return null; }).then(function (j) {
          if (j && typeof j === 'object' && !Array.isArray(j) && 'ok' in j) {
            if (j.erro === 'banido') marcaBanido();
            return j;
          }
          return { ok: false, erro: r.status === 401 ? 'sem_login' : 'rede', status: r.status };
        });
      });
    }).catch(function () { return { ok: false, erro: 'rede' }; });
  }

  /* ---------- quem sou eu (hub_eu), guardado para o cabeçalho aparecer na hora ---------- */
  var EU = guarda.get(K_EU);
  var CAMPOS_EU = ['perfil', 'apelido', 'avatar', 'nivel', 'xp', 'xp_nivel', 'xp_proximo', 'pedidos', 'faixa'];
  function guardaEu(j) {
    var o = {};
    CAMPOS_EU.forEach(function (k) { if (j[k] !== undefined) o[k] = j[k]; });
    EU = { t: Date.now(), d: o };
    guarda.set(K_EU, EU);
  }
  var ultimoEu = null;
  function carregaEu(forca) {
    if (!sessao()) return Promise.resolve(null);
    if (!forca && ultimoEu) return Promise.resolve(ultimoEu);                       // já veio nesta página
    if (!forca && EU && EU.d && Date.now() - EU.t < 60000) return Promise.resolve(EU.d);   // guardado há menos de 1 min
    return rpc('hub_eu').then(function (j) {
      if (j.ok) { ultimoEu = j; guardaEu(j); pinta(); emite(); return j; }
      if (j.erro === 'sem_login') { esquece(); return null; }
      return EU ? EU.d : null;   // sem rede: fica com o que tinha
    });
  }
  function marcaBanido() {
    EU = { t: Date.now(), d: { perfil: true, banido: true } };
    guarda.set(K_EU, EU);
    pinta();
  }
  var temPerfil = function () { return !!(sessao() && EU && EU.d && EU.d.perfil && !EU.d.banido); };

  /* ---------- dados do Hub: jogos (avatar = ícone do jogo) e endereços (social.json do idioma) ---------- */
  var DADOS = null;
  function dados() {
    if (DADOS) return DADOS;
    DADOS = ROTAS.dados ? fetch(ROTAS.dados).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
      .then(function (j) { if (!j) DADOS = null; return j || { jogos: {}, jogar: ROTAS.hub }; }) : Promise.resolve({ jogos: {}, jogar: ROTAS.hub });
    return DADOS;
  }
  var avatarDe = function (D, chave) { var g = D && D.jogos[chave]; return g ? '/assets/media/' + g[0] + '/icone-sm.webp' : ''; };
  var nomeJogo = function (D, slug) { var g = D && D.jogos[slug]; return g ? g[1] : slug; };

  /* ---------- nomes das conquistas (os códigos vêm do banco: hub_catalogo) ---------- */
  var CONQ = {
    partida_1: t('Primeira partida'), partidas_10: t('10 partidas'), partidas_100: t('100 partidas'),
    vitoria_1: t('Primeira vitória'), vitorias_25: t('25 vitórias'), hora_1: t('1 hora de jogo'), horas_10: t('10 horas de jogo'),
    jogos_5: t('5 jogos diferentes'), jogos_10: t('10 jogos diferentes'), jogos_20: t('20 jogos diferentes'),
    amigo_1: t('Primeiro amigo'), amigos_10: t('10 amigos')
  };
  var nomeConquista = function (c) { return CONQ[c] || c; };

  /* ---------- aviso na tela (toast); com o jogo em tela cheia, aparece dentro dele ---------- */
  var caixaAviso = null, filaAviso = [], avisoT = 0;
  function aviso(txt, tipo) {
    if (!txt) return;
    filaAviso.push([txt, tipo || '']);
    if (!avisoT) proximoAviso();
  }
  function proximoAviso() {
    var x = filaAviso.shift();
    if (!x) { avisoT = 0; if (caixaAviso) caixaAviso.classList.remove('is-on'); return; }
    if (!caixaAviso) {
      caixaAviso = d.createElement('div');
      caixaAviso.className = 'conta-aviso';
      caixaAviso.setAttribute('role', 'status');
      caixaAviso.setAttribute('aria-live', 'polite');
    }
    var dono = d.fullscreenElement || d.webkitFullscreenElement || d.body;
    if (caixaAviso.parentNode !== dono) dono.appendChild(caixaAviso);
    caixaAviso.className = 'conta-aviso' + (x[1] ? ' conta-aviso--' + x[1] : '');
    caixaAviso.textContent = x[0];
    void caixaAviso.offsetWidth;
    caixaAviso.classList.add('is-on');
    avisoT = setTimeout(function () { caixaAviso.classList.remove('is-on'); avisoT = setTimeout(proximoAviso, 350); }, 4600);
  }
  /* resposta de hub_presenca/hub_evento com conquistas novas ou subida de nível → aviso + cabeçalho em dia */
  function premios(r) {
    if (!r || !r.ok) return r;
    var tem = (r.novas && r.novas.length) || r.subiu;
    if (EU && EU.d && r.nivel) { EU.d.nivel = r.nivel; if (r.xp != null) EU.d.xp = r.xp; guarda.set(K_EU, EU); if (tem) { pinta(); emite(); } }
    if (!tem) return r;
    dados().then(function (D) {
      (r.novas || []).forEach(function (c) {
        aviso(t('Conquista: {nome}', { nome: nomeConquista(c.codigo) }) + (c.jogo ? ' · ' + nomeJogo(D, c.jogo) : '') + ' · +' + c.xp + ' XP', 'conquista');
      });
      if (r.subiu) aviso(t('Você chegou ao nível {n}!', { n: r.nivel }), 'nivel');
    });
    return r;
  }

  /* ---------- quem mais quer saber (hub-social.js, hub-jogar.js) ---------- */
  var ouvintes = [];
  var ouve = function (fn) { ouvintes.push(fn); };
  var emite = function () { ouvintes.forEach(function (fn) { try { fn(EU && EU.d, !!sessao()); } catch (e) {} }); };

  /* ---------- provedores ligados no Auth (Google, Discord), guardados: 6 h se há algum, 1 h se nenhum ---------- */
  var PROV = null;
  function provedores() {
    if (PROV) return PROV;
    var c = guarda.get(K_PROV);
    if (c && c.ate > Date.now() && Array.isArray(c.lista)) return (PROV = Promise.resolve(c.lista));
    if (!API) return (PROV = Promise.resolve([]));
    PROV = fetch(API + '/auth/v1/settings', { headers: { apikey: CHAVE } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (s) {
        var lista = ['google', 'discord'].filter(function (p) { return s && s.external && s.external[p]; });
        guarda.set(K_PROV, { lista: lista, ate: Date.now() + (lista.length ? 6 : 1) * 3600e3 });
        return lista;
      }, function () { return []; });
    return PROV;
  }

  /* ---------- entrar: PKCE (o "segredo" fica neste aparelho; o Google/Discord devolve só um código de uso único) ---------- */
  var b64url = function (bytes) { var s = ''; for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  // de onde a pessoa saiu (só caminho do próprio site; a página "entrar" não conta)
  function aqui() {
    var p = location.pathname + location.search + location.hash;
    if (ROTAS.entrar && location.pathname === ROTAS.entrar) return guarda.get(K_VOLTA) || ROTAS.hub;
    return p;
  }
  var voltaSegura = function (v) { return typeof v === 'string' && /^\/(?![\/\\])/.test(v) && v.indexOf(ROTAS.entrar || '§') !== 0 ? v : ROTAS.hub; };
  function entrar(prov) {
    if (!API || !ROTAS.entrar || !/^(google|discord)$/.test(prov)) return;
    var cr = W.crypto && W.crypto.getRandomValues ? W.crypto.getRandomValues(new Uint8Array(48)) : null;
    if (!cr) { aviso(t('Este navegador não consegue entrar com segurança. Atualize o navegador e tente de novo.'), 'erro'); return; }
    var v = b64url(cr);
    var vai = function (ch, metodo) {
      guarda.set(K_PKCE, { v: v, t: Date.now() });
      guarda.set(K_VOLTA, aqui());
      location.assign(API + '/auth/v1/authorize?provider=' + prov + '&redirect_to=' + encodeURIComponent(location.origin + ROTAS.entrar) +
        '&code_challenge=' + encodeURIComponent(ch) + '&code_challenge_method=' + metodo);
    };
    if (W.crypto.subtle && W.TextEncoder) W.crypto.subtle.digest('SHA-256', new TextEncoder().encode(v)).then(function (h) { vai(b64url(new Uint8Array(h)), 's256'); }, function () { vai(v, 'plain'); });
    else vai(v, 'plain');
  }
  /* na página "entrar": troca o código pela sessão. → {ok, volta} | {erro: 'cancelou'|'provedor'|'pkce'|'troca'|'rede', volta} */
  function trocaCodigo() {
    var q = new URLSearchParams(location.search), h = new URLSearchParams(location.hash.replace(/^#/, ''));
    var erro = q.get('error') || h.get('error'), code = q.get('code');
    if (!code && !erro) return null;
    try { history.replaceState(null, '', location.pathname); } catch (e) {}   // o código some do endereço
    var p = guarda.get(K_PKCE), volta = voltaSegura(guarda.get(K_VOLTA));
    guarda.del(K_PKCE);
    if (erro) return Promise.resolve({ erro: /access_denied/.test(erro) ? 'cancelou' : 'provedor', volta: volta });
    if (!p || !p.v) return Promise.resolve({ erro: 'pkce', volta: volta });
    return fetch(API + '/auth/v1/token?grant_type=pkce', { method: 'POST', headers: cab(), body: JSON.stringify({ auth_code: code, code_verifier: p.v }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { st: r.status, j: j }; }); })
      .then(function (x) {
        if (x.st === 200 && x.j && x.j.access_token) { salva(x.j); return { ok: true, volta: volta }; }
        return { erro: 'troca', volta: volta };
      }, function () { return { erro: 'rede', volta: volta }; });
  }
  function sair() {
    var s = sessao();
    if (s && API) try { fetch(API + '/auth/v1/logout?scope=local', { method: 'POST', keepalive: true, headers: cab(s.a) }).catch(function () {}); } catch (e) {}
    guarda.del(K_VOLTA);
    esquece();
    fechaMenu();
    aviso(t('Você saiu da sua conta.'));
  }

  /* ---------- janela "Entrar" ---------- */
  var dlg = $('[data-entrar-dlg]');
  // navegador de dentro do Instagram/Facebook/TikTok: o Google recusa o login (disallowed_useragent) → avisa
  var EMBUTIDO = /Instagram|FBAN|FBAV|FB_IAB|musical_ly|TikTok|BytedanceWebview/i.test(navigator.userAgent || '');
  function mostraProvedores(lista) {
    $$('[data-provedor]').forEach(function (b) { b.hidden = lista.indexOf(b.getAttribute('data-provedor')) < 0; });
    $$('[data-sem-provedor]').forEach(function (p) { p.hidden = lista.length > 0; });
    $$('[data-inapp]').forEach(function (p) { p.hidden = !(EMBUTIDO && lista.indexOf('google') >= 0); });
  }
  function abreEntrar() {
    if (!dlg) { if (ROTAS.entrar) location.href = ROTAS.entrar; return; }
    provedores().then(mostraProvedores);
    if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
    var b = $('[data-provedor]:not([hidden])', dlg); if (b) b.focus();
  }
  if (dlg) dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  /* ---------- cabeçalho: "Entrar" ou o avatar + apelido + nível, com o menu da conta ---------- */
  var bEntrar = raiz && $('[data-entrar]', raiz), bloco = raiz && $('[data-eu]', raiz), bMenu = raiz && $('[data-eu-bt]', raiz), menu = raiz && $('[data-eu-menu]', raiz);
  function fechaMenu() { if (menu && !menu.hidden) { menu.hidden = true; bMenu.setAttribute('aria-expanded', 'false'); } }
  if (bMenu && menu) {
    bMenu.addEventListener('click', function () { var abre = menu.hidden; menu.hidden = !abre; bMenu.setAttribute('aria-expanded', String(abre)); });
    d.addEventListener('click', function (e) { if (!bloco.contains(e.target)) fechaMenu(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { fechaMenu(); bMenu.focus(); } });
  }
  function pinta() {
    if (!raiz) return;
    html.classList.toggle('com-conta', !!sessao());
    if (!API) { raiz.hidden = true; return; }
    raiz.hidden = false;
    var s = sessao(), eu = EU && EU.d;
    if (!s) {
      bloco.hidden = true;
      provedores().then(function (lista) { if (!sessao()) bEntrar.hidden = !lista.length; });
      return;
    }
    bEntrar.hidden = true; bloco.hidden = false;
    var nome = $('[data-eu-nome]', raiz), nv = $('[data-eu-nv]', raiz), av = $('[data-eu-av]', raiz), ped = $('[data-eu-pedidos]', raiz), pedN = $('[data-eu-pedidos-n]', raiz);
    var lPerfil = $('[data-eu-perfil]', raiz), soPerfil = $$('[data-so-perfil]', raiz), lCriar = $('[data-eu-criar]', raiz);
    var ok = eu && eu.perfil && !eu.banido;
    nome.textContent = eu ? (eu.banido ? t('Conta suspensa') : eu.perfil ? eu.apelido : t('Criar perfil')) : '';
    nv.textContent = ok ? t('Nv. {n}', { n: eu.nivel || 1 }) : '';
    nv.hidden = !ok;
    soPerfil.forEach(function (x) { x.hidden = !ok; });
    if (lCriar) lCriar.hidden = !(eu && !eu.perfil);
    if (lPerfil && ok) lPerfil.href = ROTAS.perfil + '?u=' + encodeURIComponent(eu.apelido);
    var n = ok ? +eu.pedidos || 0 : 0;
    ped.hidden = !n; pedN.hidden = !n; pedN.textContent = n ? String(n) : '';
    if (n) ped.setAttribute('title', t('{n} pedido(s) de amizade', { n: n }));
    if (ok) dados().then(function (D) { var u = avatarDe(D, eu.avatar); if (u) { av.src = u; av.hidden = false; } });
    else av.hidden = true;
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-entrar]');
    if (a) { e.preventDefault(); abreEntrar(); return; }
    var p = e.target.closest && e.target.closest('[data-provedor]');
    if (p) { e.preventDefault(); entrar(p.getAttribute('data-provedor')); return; }
    if (e.target.closest && e.target.closest('[data-sair]')) { e.preventDefault(); sair(); }
  });
  // outra aba entrou ou saiu
  W.addEventListener('storage', function (e) {
    if (e.key !== K_SESSAO && e.key !== K_EU) return;
    EU = guarda.get(K_EU);
    pinta(); emite();
  });

  /* ---------- presença "online" no Hub (sem jogo): 1 batida a cada 60 s, com a aba visível ---------- */
  // com o jogo aberto em OUTRA aba (marca "lipy-hub-jogo" nos últimos 150 s), esta aba não manda "online": senão o
  // "jogando agora" dos amigos piscaria para "online" a cada batida desta aba
  var jogoAtual = null, K_JOGO = 'lipy-hub-jogo';
  function batidaOnline() {
    if (jogoAtual || !temPerfil() || d.visibilityState !== 'visible') return;
    var jg = guarda.get(K_JOGO);
    if (jg && Date.now() - jg < 150000) return;
    var ult = 0; try { ult = +sessionStorage.getItem(K_BATIDA) || 0; } catch (e) {}
    if (Date.now() - ult < 55000) return;
    try { sessionStorage.setItem(K_BATIDA, String(Date.now())); } catch (e) {}
    rpc('hub_presenca', { p_jogo: null });
  }
  setInterval(batidaOnline, 20000);
  d.addEventListener('visibilitychange', batidaOnline);

  /* ---------- tempo relativo ("há 5 min") e números no idioma da página ---------- */
  var loc = (html.lang || LANG) + (LANG === 'ar' ? '-u-nu-latn' : '');
  var rel = W.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat(loc, { numeric: 'auto' }) : null;
  function ha(iso) {
    var ms = Date.parse(iso);
    if (!ms || !rel) return '';
    var s = Math.round((ms - Date.now()) / 1000), a = Math.abs(s);
    return a < 60 ? rel.format(0, 'second') : a < 3600 ? rel.format(Math.round(s / 60), 'minute') : a < 86400 ? rel.format(Math.round(s / 3600), 'hour') : a < 2592000 ? rel.format(Math.round(s / 86400), 'day') : rel.format(Math.round(s / 2592000), 'month');
  }

  /* ---------- começo ---------- */
  var retorno = ROTAS.entrar && location.pathname === ROTAS.entrar ? trocaCodigo() : null;
  var pronto = Promise.resolve(retorno).then(function () { pinta(); return carregaEu(); }).then(function (eu) { batidaOnline(); return eu; });

  W.LipyConta = {
    api: !!API, rotas: ROTAS, lang: LANG, loc: loc,
    rpc: rpc, token: token, pronto: pronto, retorno: retorno,
    logado: function () { return !!sessao(); }, temPerfil: temPerfil,
    eu: function () { return EU && EU.d; }, carregaEu: carregaEu, guardaEu: function (j) { if (j && j.ok) { ultimoEu = j; guardaEu(j); pinta(); emite(); } },
    entrar: entrar, abreEntrar: abreEntrar, provedores: provedores, mostraProvedores: mostraProvedores, sair: sair, esquece: esquece,
    volta: function () { return voltaSegura(guarda.get(K_VOLTA)); }, limpaVolta: function () { guarda.del(K_VOLTA); },
    dados: dados, avatarDe: avatarDe, nomeJogo: nomeJogo, nomeConquista: nomeConquista,
    aviso: aviso, premios: premios, ha: ha, ouve: ouve,
    // o hub-jogar.js chama a cada batida do jogo (slug) e ao fechar (null)
    jogando: function (slug) { jogoAtual = slug || null; if (jogoAtual) guarda.set(K_JOGO, Date.now()); else { guarda.del(K_JOGO); batidaOnline(); } }
  };
  pinta();
})();
