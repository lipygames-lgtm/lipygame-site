/* ==========================================================================
   LIPY HUB — REDE SOCIAL: páginas entrar (cadastro), perfil, amigos e configurações (carrega só nelas, depois do
   hub-conta.js). Tudo que é de pessoa vem do banco na hora (public.hub_*, servidor/hub-social-API.md): nada de
   dado de exemplo. O banco decide a privacidade (menor de 18, bloqueio, quem vê o quê); aqui só se mostra o que ele
   devolve. Textos fixos no HTML (hub.mjs); as frases montadas aqui passam por t('…') (hub.mjs → tradução).
   ========================================================================== */
(function () {
  'use strict';
  var C = window.LipyConta, d = document, W = window;
  var raiz = d.querySelector('[data-social]');
  if (!C || !raiz) return;
  var T = W.HUB_TEXTOS || {};
  var t = function (k, v) { var s = T[k] || k; if (v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }); return s; };
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var PAG = raiz.getAttribute('data-social'), R = C.rotas;
  var nf = W.Intl ? new Intl.NumberFormat(C.loc) : null, nf1 = W.Intl ? new Intl.NumberFormat(C.loc, { maximumFractionDigits: 1 }) : null;
  var num = function (n) { return nf ? nf.format(n) : String(n); };
  var TITULO = d.title;

  /* ---------- montar elementos (sempre textContent: apelido é texto da pessoa) ---------- */
  function el(tag, cls, txt) { var e = d.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function ico(id) {
    var s = d.createElementNS('http://www.w3.org/2000/svg', 'svg'), u = d.createElementNS('http://www.w3.org/2000/svg', 'use');
    s.setAttribute('class', 'ic'); s.setAttribute('aria-hidden', 'true'); u.setAttribute('href', '#' + id); s.appendChild(u);
    return s;
  }
  function bt(txt, cls, fn, icone) {
    var b = el('button', 'bt ' + (cls || 'bt--vidro'));
    b.type = 'button';
    if (icone) b.appendChild(ico(icone));
    b.appendChild(d.createTextNode(txt));
    if (fn) b.addEventListener('click', fn);
    return b;
  }
  function link(txt, href, cls, icone) {
    var a = el('a', cls || 'bt bt--vidro');
    a.href = href;
    if (icone) a.appendChild(ico(icone));
    a.appendChild(d.createTextNode(txt));
    return a;
  }
  function avatar(D, chave, tam, cls) {
    var i = el('img', cls || 'sc-av-img');
    var u = C.avatarDe(D, chave);
    if (u) i.src = u;
    i.width = i.height = tam || 64; i.alt = ''; i.loading = 'lazy'; i.decoding = 'async';
    return i;
  }
  var linkPerfil = function (ap) { return R.perfil + '?u=' + encodeURIComponent(ap); };
  var linkJogo = function (D, slug) { return (D.jogar || R.hub) + slug + '/'; };
  var chave = function (s) { return String(s || '').toLowerCase().replace(/[._]/g, ''); };

  /* ---------- números e datas ---------- */
  function tempo(seg) {
    seg = +seg || 0;
    if (seg < 3600) return t('{n} min', { n: num(Math.round(seg / 60)) });
    return t('{n} h', { n: nf1 ? nf1.format(seg / 3600) : (seg / 3600).toFixed(1) });
  }
  function mesAno(ym) {
    try { return new Intl.DateTimeFormat(C.loc, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(ym + '-15T12:00:00Z')); } catch (e) { return ym; }
  }
  function dataCurta(iso) {
    try { return new Intl.DateTimeFormat(C.loc, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso)); } catch (e) { return ''; }
  }

  /* ---------- estados da página (um [data-estado] à vista por vez) ---------- */
  function estado(nome) {
    $$('[data-estado]', raiz).forEach(function (x) { x.hidden = x.getAttribute('data-estado') !== nome; });
    if (raiz.getBoundingClientRect().top < 0) W.scrollTo(0, 0);   // a troca de tela começa do topo
  }
  /* cartão de aviso no lugar da página: botoes = [[texto, href ou função, 'luz'?], …] */
  function mensagem(titulo, texto, botoes) {
    var c = $('[data-estado="msg"]', raiz);
    if (!c) return;
    $('[data-msg-t]', c).textContent = titulo;
    $('[data-msg-p]', c).textContent = texto || '';
    var bs = $('[data-msg-bts]', c);
    bs.textContent = '';
    (botoes || []).forEach(function (b) {
      bs.appendChild(typeof b[1] === 'function' ? bt(b[0], b[2] ? 'bt--luz' : 'bt--vidro', b[1]) : link(b[0], b[1], 'bt ' + (b[2] ? 'bt--luz' : 'bt--vidro')));
    });
    estado('msg');
    d.title = TITULO;
  }
  function pedeLogin(texto) {
    mensagem(t('Entre na sua conta'), texto, [[t('Entrar'), function () { C.abreEntrar(); }, 1], [t('Voltar ao Lipy Hub'), R.hub]]);
  }
  function semPerfil(eu) {
    if (eu && eu.banido) return mensagem(t('Conta suspensa'), t('Esta conta foi suspensa pela moderação do Lipy Hub. Se acha que foi engano, fale com a gente pelo contato do Hub.'), [[t('Sair da conta'), function () { C.sair(); }]]);
    mensagem(t('Falta criar o seu perfil'), t('Escolha um apelido e um avatar para usar a parte de amigos do Lipy Hub.'), [[t('Criar perfil'), R.entrar, 1]]);
  }
  // página que só funciona com login + perfil: chama fn(eu) quando estiver tudo certo
  function comConta(textoLogin, fn) {
    C.pronto.then(function () {
      if (!C.logado()) return pedeLogin(textoLogin);
      return C.carregaEu(true).then(function (eu) {
        if (!C.logado()) return pedeLogin(textoLogin);
        if (!eu) return mensagem(t('Sem conexão'), msgErro('rede'), [[t('Tentar de novo'), function () { location.reload(); }, 1]]);
        if (!eu.perfil || eu.banido) return semPerfil(eu);
        fn(eu);
      });
    });
    // saiu (aqui ou em outra aba): a página volta para o "entre na sua conta"
    C.ouve(function (eu, logado) { if (!logado) pedeLogin(textoLogin); });
  }

  /* ---------- erros do banco → frase ---------- */
  function msgErro(e, x) {
    switch (e) {
      case 'sem_login': return t('Entre na sua conta para continuar.');
      case 'sem_perfil': return t('Crie o seu perfil para continuar.');
      case 'banido': return t('Esta conta foi suspensa pela moderação do Lipy Hub.');
      case 'rede': return t('Sem conexão com o servidor. Tente de novo em instantes.');
      case 'limite': return t('Muitas tentativas seguidas. Espere um pouco e tente de novo.');
      case 'devagar': return t('Muitas ações em pouco tempo. Espere um minuto.');
      case 'ocupado': return t('Muita gente criando perfil agora. Tente de novo em alguns minutos.');
      case 'apelido_invalido': return t('Use de 3 a 20 letras sem acento, números, ponto ou _, com pelo menos uma letra (sem ponto ou _ no começo, no fim ou dois seguidos).');
      case 'apelido_reservado': return t('Esse apelido é reservado. Escolha outro.');
      case 'apelido_proibido': return t('Esse apelido não é permitido. Escolha outro.');
      case 'apelido_usado': return t('Já tem alguém com esse apelido.');
      case 'avatar': return t('Escolha um avatar.');
      case 'faixa': return t('Escolha a sua faixa de idade.');
      case 'espere': return x && x.dias > 1 ? t('Você trocou de apelido há pouco. Dá para trocar de novo em {n} dias.', { n: x.dias }) : t('Você trocou de apelido há pouco. Dá para trocar de novo amanhã.');
      case 'voce_mesmo': return t('Esse é você.');
      case 'ja_amigos': return t('Vocês já são amigos.');
      case 'limite_amigos': return t('Limite de 250 amigos atingido.');
      case 'cheio': return t('Essa pessoa tem pedidos demais esperando resposta. Tente mais tarde.');
      case 'curto': return t('Digite pelo menos 3 letras ou números.');
      case 'confirmar': return t('O apelido digitado não confere.');
      case 'menor': return t('Quem tem menos de 18 anos fica visível só para amigos e fora da busca.');
      default: return t('Algo deu errado. Tente de novo.');
    }
  }
  function diz(alvo, txt, tipo) {
    if (!alvo) return;
    alvo.textContent = txt || '';
    alvo.classList.toggle('sc-msg--erro', tipo === 'erro');
    alvo.classList.toggle('sc-msg--ok', tipo === 'ok');
  }

  /* ---------- janela de confirmar (sem ela, o confirm do navegador) ---------- */
  function confirma(titulo, texto, botao, perigo) {
    var dl = $('[data-confirma-dlg]');
    if (!dl || !dl.showModal) return Promise.resolve(W.confirm(titulo + '\n\n' + texto));
    $('[data-t]', dl).textContent = titulo;
    $('[data-p]', dl).textContent = texto;
    var sim = $('[data-sim]', dl);
    sim.textContent = botao;
    sim.className = 'bt ' + (perigo ? 'sc-bt-perigo' : 'bt--luz');
    dl.returnValue = '';
    dl.showModal();
    return new Promise(function (ok) {
      dl.addEventListener('close', function f() { dl.removeEventListener('close', f); ok(dl.returnValue === 'sim'); });
    });
  }
  /* denunciar: motivo + detalhe; o banco responde ok mesmo para apelido que não existe */
  function denuncia(apelido) {
    var dl = $('[data-denunciar-dlg]');
    if (!dl) return;
    var f = $('[data-denunciar-form]', dl), msg = $('[data-msg]', f), h = $('#den-t', dl);
    h.textContent = h.getAttribute('data-modelo').replace('{apelido}', apelido);
    f.reset(); diz(msg, '');
    $$('button', f).forEach(function (b) { b.disabled = false; });
    f.onsubmit = function (e) {
      e.preventDefault();
      var m = f.querySelector('input[name="motivo"]:checked');
      if (!m) { diz(msg, t('Escolha o motivo da denúncia.'), 'erro'); return; }
      $$('button', f).forEach(function (b) { b.disabled = true; });
      C.rpc('hub_denunciar', { p_apelido: apelido, p_motivo: m.value, p_detalhe: f.detalhe.value.trim() || null }).then(function (j) {
        $$('button', f).forEach(function (b) { b.disabled = false; });
        if (!j.ok) { diz(msg, msgErro(j.erro), 'erro'); return; }
        dl.close();
        C.aviso(t('Denúncia enviada. A equipe da Lipy Games analisa cada caso.'));
      });
    };
    $('[data-fechar]', f).onclick = function () { dl.close(); };
    if (dl.showModal) dl.showModal(); else dl.setAttribute('open', '');
  }
  function bloqueia(apelido) {
    return confirma(t('Bloquear {apelido}?', { apelido: apelido }), t('Vocês deixam de se ver em tudo: perfil, amigos, busca e pedidos. A amizade e os pedidos entre vocês são desfeitos. Dá para desbloquear na página Amigos.'), t('Bloquear'), true)
      .then(function (ok) {
        if (!ok) return false;
        return C.rpc('hub_bloquear', { p_apelido: apelido }).then(function (j) {
          if (!j.ok) { C.aviso(msgErro(j.erro), 'erro'); return false; }
          C.aviso(t('{apelido} foi bloqueado.', { apelido: apelido }));
          return true;
        });
      });
  }

  /* ---------- catálogo do banco (avatares e conquistas), uma vez por página ---------- */
  var CAT = null;
  var catalogo = function () { return CAT || (CAT = C.rpc('hub_catalogo').then(function (j) { if (!j.ok) CAT = null; return j; })); };

  /* ---------- galeria de avatares (rádios de verdade: setas do teclado funcionam) ---------- */
  function galeria(cont, D, lista, atual) {
    cont.textContent = '';
    lista.forEach(function (k) {
      var g = D.jogos[k];
      if (!g) return;
      var lab = el('label', 'sc-av');
      lab.title = g[1];
      var inp = el('input');
      inp.type = 'radio'; inp.name = 'avatar'; inp.value = k;
      if (k === atual) inp.checked = true;
      lab.appendChild(inp);
      lab.appendChild(avatar(D, k, 80));
      lab.appendChild(el('span', 'sr-only', g[1]));
      cont.appendChild(lab);
    });
  }

  /* ---------- apelido: a regra do banco conferida aqui antes (economiza consulta) + "está livre?" ao vivo ---------- */
  function apelidoLocal(s) {
    if (!s || s.length < 3 || s.length > 20 || !/^[A-Za-z0-9_.]+$/.test(s) || /^[._]|[._]$|[._][._]/.test(s) || !/[A-Za-z]/.test(s)) return 'apelido_invalido';
    return null;
  }
  function vigiaApelido(inp, atual) {
    var campo = inp.closest('.sc-campo'), st = $('[data-apelido-st]', campo), msg = $('[data-apelido-msg]', campo);
    var tm = 0, seq = 0;
    var mostra = function (cls, txt) {
      st.className = 'sc-input__st' + (cls ? ' is-' + cls : '');
      diz(msg, txt, cls === 'erro' ? 'erro' : cls === 'ok' ? 'ok' : '');
    };
    inp.addEventListener('input', function () {
      clearTimeout(tm); seq++;
      var v = inp.value.trim();
      if (!v) return mostra('', '');
      if (atual && chave(v) === chave(atual())) return mostra('', v === atual() ? t('Este é o seu apelido atual.') : '');
      var e = apelidoLocal(v);
      if (e) return mostra(v.length >= 3 || !/^[A-Za-z0-9_.]*$/.test(v) ? 'erro' : '', v.length >= 3 || !/^[A-Za-z0-9_.]*$/.test(v) ? msgErro(e) : '');
      mostra('busca', t('Conferindo…'));
      var meu = seq;
      tm = setTimeout(function () {
        C.rpc('hub_apelido_livre', { p_apelido: v }).then(function (j) {
          if (meu !== seq) return;
          if (!j.ok) return mostra('', msgErro(j.erro));
          mostra(j.livre ? 'ok' : 'erro', j.livre ? t('Disponível!') : msgErro(j.erro || 'apelido_usado'));
        });
      }, 700);
    });
  }

  /* ---------- pessoa numa lista (amigos, pedidos, busca, bloqueados) ---------- */
  function statusTexto(D, a) {
    if (a.status === 'jogando') return t('Jogando {jogo}', { jogo: C.nomeJogo(D, a.jogo) });
    if (a.status === 'online') return t('Online no Lipy Hub');
    return a.visto ? t('Visto {quando}', { quando: C.ha(a.visto) }) : t('Offline');
  }
  function linhaPessoa(D, p, sub, opcoes) {
    opcoes = opcoes || {};
    var li = el('li', 'sc-pessoa' + (p.status ? ' sc-pessoa--' + p.status : ''));
    var a = el(opcoes.semLink ? 'span' : 'a', 'sc-pessoa__id');
    if (!opcoes.semLink) a.href = linkPerfil(p.apelido);
    a.appendChild(avatar(D, p.avatar, 44));
    var tx = el('span', 'sc-pessoa__txt');
    var b = el('b', '', p.apelido); b.setAttribute('translate', 'no'); b.dir = 'ltr';
    tx.appendChild(b);
    if (sub) tx.appendChild(el('small', '', sub));
    a.appendChild(tx);
    li.appendChild(a);
    if (p.nivel) li.appendChild(el('span', 'sc-pessoa__nv', t('Nv. {n}', { n: p.nivel })));
    var acoes = el('span', 'sc-pessoa__acoes');
    (opcoes.acoes || []).forEach(function (x) { acoes.appendChild(x); });
    if (opcoes.mais && opcoes.mais.length) acoes.appendChild(menuMais(opcoes.mais));
    if (acoes.childNodes.length) li.appendChild(acoes);
    return li;
  }
  // menu "…" com ações de menos uso (desfazer amizade, bloquear, denunciar)
  function menuMais(itens) {
    var det = el('details', 'sc-mais');
    var s = el('summary', 'sc-mais__bt');
    s.appendChild(el('span', 'sr-only', t('Mais ações')));
    s.appendChild(el('span', '', '⋯')).setAttribute('aria-hidden', 'true');
    det.appendChild(s);
    var m = el('div', 'sc-mais__menu');
    itens.forEach(function (x) {
      var b = el('button', x[2] ? 'is-perigo' : '', x[0]);
      b.type = 'button';
      b.addEventListener('click', function () { det.open = false; x[1](); });
      m.appendChild(b);
    });
    det.appendChild(m);
    d.addEventListener('click', function (e) { if (det.open && !det.contains(e.target)) det.open = false; });
    det.addEventListener('keydown', function (e) { if (e.key === 'Escape' && det.open) { det.open = false; s.focus(); } });
    return det;
  }
  var miniBt = function (txt, fn, luz) { var b = bt(txt, (luz ? 'bt--luz' : 'bt--vidro') + ' sc-bt-mini', fn); return b; };

  /* ================= ENTRAR: volta do Google/Discord, cadastro na 1ª vez ================= */
  function pgEntrar() {
    var erroEntrar = function (e) {
      var M = {
        cancelou: t('Você cancelou a entrada. Quando quiser, é só tentar de novo.'),
        provedor: t('O login não foi confirmado pela conta escolhida. Tente de novo.'),
        pkce: t('A entrada começou em outro navegador ou demorou demais. Tente de novo por aqui.'),
        troca: t('O link de entrada venceu ou já foi usado. Tente de novo.'),
        banido: t('Esta conta foi suspensa pela moderação do Lipy Hub.')
      };
      $('[data-erro-msg]', raiz).textContent = M[e] || msgErro('rede');
      estado('erro');
    };
    var mostraEntrar = function () { C.provedores().then(C.mostraProvedores); estado('entrar'); };
    $('[data-de-novo]', raiz).addEventListener('click', mostraEntrar);
    Promise.resolve(C.retorno).then(function (x) {
      if (x && x.erro) return erroEntrar(x.erro);
      return C.pronto.then(function () {
        if (!C.logado()) return mostraEntrar();
        return C.carregaEu(true).then(function (eu) {
          if (!C.logado()) return mostraEntrar();
          if (!eu) return erroEntrar('rede');
          if (eu.banido) return erroEntrar('banido');
          if (!eu.perfil) return cadastro();
          if (x && x.ok) { var v = C.volta(); C.limpaVolta(); location.replace(v); return; }   // voltou do Google e já tinha perfil
          pronto(eu, false);
        });
      });
    });
    // saiu pelo menu do cabeçalho: volta para os botões de entrar (o aviso de "cadastro cancelado" fica)
    C.ouve(function (eu, logado) { if (!logado && $('[data-estado="msg"]', raiz).hidden) mostraEntrar(); });
  }
  function cadastro() {
    estado('cadastro');
    var f = $('[data-cadastro]', raiz), inp = $('#cad-apelido', f), msg = $('[data-msg]', f), cont = $('[data-avatares]', f), criar = $('[data-criar]', f);
    Promise.all([C.dados(), catalogo()]).then(function (x) {
      var D = x[0], cat = x[1];
      galeria(cont, D, cat && cat.ok ? cat.avatares : Object.keys(D.jogos), null);
    });
    vigiaApelido(inp, null);
    setTimeout(function () { try { inp.focus(); } catch (e) {} }, 50);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var av = f.querySelector('input[name="avatar"]:checked'), fx = f.querySelector('input[name="faixa"]:checked'), a = inp.value.trim();
      var erro = apelidoLocal(a) || (!av && 'avatar') || (!fx && 'faixa');
      if (erro) {
        diz(msg, msgErro(erro), 'erro');
        var foco = erro === 'avatar' ? f.querySelector('input[name="avatar"]') : erro === 'faixa' ? f.querySelector('input[name="faixa"]') : inp;
        if (foco) foco.focus();
        return;
      }
      criar.disabled = true;
      diz(msg, t('Criando o seu perfil…'));
      C.rpc('hub_criar_perfil', { p_apelido: a, p_avatar: av.value, p_faixa: fx.value }).then(function (j) {
        criar.disabled = false;
        if (!j.ok) { diz(msg, msgErro(j.erro), 'erro'); if (/^apelido/.test(j.erro || '')) inp.focus(); return; }
        C.guardaEu(j);
        pronto(j, true);
      });
    });
    $('[data-cancelar]', f).addEventListener('click', function () {
      confirma(t('Cancelar o cadastro?'), t('O login que você acabou de fazer será apagado. Nada fica guardado.'), t('Cancelar e apagar'), true).then(function (ok) {
        if (!ok) return;
        C.rpc('hub_excluir_conta', { p_confirmar: 'EXCLUIR' }).then(function (j) {
          var volta = C.volta();
          C.esquece(); C.limpaVolta();
          if (!j.ok && j.erro !== 'sem_login') { mensagem(t('Não deu para apagar agora'), msgErro(j.erro), [[t('Voltar'), volta]]); return; }
          mensagem(t('Cadastro cancelado'), t('Apagamos o login que você tinha acabado de fazer. Nada ficou guardado.'), [[t('Voltar'), volta, 1]]);
        });
      });
    });
  }
  function pronto(eu, novo) {
    estado('pronto');
    var c = $('[data-estado="pronto"]', raiz), h = $('[data-pronto-t]', c), img = $('[data-av]', c);
    h.textContent = h.getAttribute('data-modelo').replace('{apelido}', eu.apelido);
    C.dados().then(function (D) { var u = C.avatarDe(D, eu.avatar); if (u) { img.src = u; img.hidden = false; } });
    var v = C.volta(), cont = $('[data-continuar]', c);
    cont.href = v;
    cont.addEventListener('click', function () { C.limpaVolta(); });
    $('[data-meu-perfil]', c).href = linkPerfil(eu.apelido);
    if (novo) C.aviso(t('Perfil criado! Bem-vindo ao Lipy Hub.'));
    try { cont.focus({ preventScroll: true }); } catch (e) { cont.focus(); }
  }

  /* ================= PERFIL ================= */
  var MEDALHA = [
    [/^partida/, 'i-controle', '#2ad8ff', '#2170ff'], [/^vitori/, 'i-trofeu', '#ffe07a', '#ff7a1a'], [/^hora/, 'i-relogio', '#3ef08a', '#13866f'],
    [/^jogos/, 'i-estrela', '#c79bff', '#8a5cff'], [/^amigo/, 'i-amigos', '#ff9ab0', '#ff4d5e']
  ];
  function pgPerfil() {
    var alvo = (new URLSearchParams(location.search).get('u') || '').trim().slice(0, 40);
    comConta(t('Perfis de jogadores só aparecem para quem tem conta no Lipy Hub.'), function (eu) { carregaPerfil(alvo || eu.apelido); });
  }
  function carregaPerfil(ap) {
    Promise.all([C.rpc('hub_perfil', { p_apelido: ap }), C.dados(), catalogo()]).then(function (x) {
      var p = x[0], D = x[1], cat = x[2];
      if (!p.ok) return erroPerfil(p.erro);
      var sou = p.relacao === 'eu';
      return Promise.all([
        p.privado ? null : C.rpc('hub_biblioteca', { p_apelido: sou ? null : p.apelido }),
        sou ? C.rpc('hub_amigos') : null,
        sou ? C.carregaEu(true) : null
      ]).then(function (y) { mostraPerfil(D, cat, p, y[0], y[1], y[2]); });
    });
  }
  function erroPerfil(e) {
    if (e === 'nao_achou') return mensagem(t('Perfil não encontrado'), t('Não achamos esse perfil. O apelido pode estar errado, ou o perfil é visível só para amigos.'), [[t('Meu perfil'), R.perfil, 1], [t('Amigos'), R.amigos]]);
    if (e === 'devagar') return mensagem(t('Calma aí'), t('Muitos perfis abertos em pouco tempo. Espere um minuto e recarregue a página.'), [[t('Recarregar'), function () { location.reload(); }, 1]]);
    if (e === 'sem_login') return pedeLogin(t('Perfis de jogadores só aparecem para quem tem conta no Lipy Hub.'));
    if (e === 'sem_perfil' || e === 'banido') return semPerfil({ banido: e === 'banido' });
    mensagem(t('Sem conexão'), msgErro(e), [[t('Tentar de novo'), function () { location.reload(); }, 1]]);
  }
  function mostraPerfil(D, cat, p, bib, am, euFull) {
    var sou = p.relacao === 'eu', cartao = !!p.privado;
    estado('perfil');
    d.title = p.apelido + ' · ' + TITULO;
    // fundo: arte do jogo que a pessoa joga agora (ou do último jogado)
    var jf = p.status === 'jogando' && p.jogo ? p.jogo : bib && bib.ok && bib.jogos[0] ? bib.jogos[0].jogo : null, gf = jf && D.jogos[jf];
    var fundo = $('[data-pf-fundo]');
    if (fundo) fundo.style.backgroundImage = gf ? 'url("' + gf[2] + '")' : '';
    // cabeçalho
    var av = $('[data-pf-av]'), u = C.avatarDe(D, p.avatar);
    if (u) av.src = u;
    av.alt = t('Avatar de {apelido}', { apelido: p.apelido });
    $('[data-pf-nome]').textContent = p.apelido;
    var desde = $('[data-pf-desde]');
    desde.textContent = p.membro_desde ? t('No Lipy Hub desde {data}', { data: mesAno(p.membro_desde) }) : '';
    desde.hidden = !p.membro_desde;
    var priv = $('[data-pf-priv]'), privTxt = '';
    if (sou && euFull && euFull.ok) {
      privTxt = euFull.faixa === 'menor' || euFull.visibilidade !== 'todos' ? t('Seu perfil: visível só para amigos') : t('Seu perfil: visível para todos com conta');
      if (euFull.invisivel) privTxt += ' · ' + t('modo invisível ligado');
    } else if (cartao) privTxt = t('Perfil visível só para amigos');
    priv.hidden = !privTxt;
    $('span', priv).textContent = privTxt;
    // nível e XP (mesma conta do banco: o nível n começa em 50·(n−1)² XP)
    var nivel = $('[data-pf-nivel]'), xpb = $('[data-pf-xpbox]');
    nivel.hidden = xpb.hidden = cartao;
    if (!cartao) {
      var n = p.nivel || 1, base = 50 * (n - 1) * (n - 1), prox = n < 100 ? 50 * n * n : null;
      $('[data-pf-nv]').textContent = num(n);
      $('[data-pf-nv-t]').textContent = t('Nível {n}', { n: num(n) });
      $('[data-pf-xp-barra]').style.width = (prox ? Math.max(2, Math.min(100, 100 * (p.xp - base) / (prox - base))) : 100) + '%';
      // "20 / 50" isolado da direção do texto (no árabe, a barra entre espaços inverteria os números)
      var iso = function (s) { return String.fromCharCode(0x2066) + s + String.fromCharCode(0x2069); };
      $('[data-pf-xp]').textContent = prox ? t('{xp} XP · faltam {f} para o nível {n}', { xp: iso(num(p.xp) + ' / ' + num(prox)), f: num(prox - p.xp), n: num(n + 1) }) : t('{xp} XP · nível máximo', { xp: num(p.xp) });
    }
    botoesPerfil(p);
    // corpo: o cartão (perfil privado) mostra só o cabeçalho e a caixa de segurança
    var st = $('[data-pf-status]');
    st.textContent = ''; st.hidden = true; st.className = 'pf-status';
    if (cartao) {
      st.hidden = false; st.classList.add('pf-status--priv');
      st.appendChild(ico('i-cadeado'));
      st.appendChild(el('p', '', p.relacao === 'enviado' ? t('Quando {apelido} aceitar o seu pedido, o perfil completo aparece aqui.', { apelido: p.apelido })
        : t('{apelido} deixa o perfil visível só para amigos. Mande um pedido de amizade para ver os jogos e o "jogando agora".', { apelido: p.apelido })));
    } else if (!sou) {
      st.hidden = false; st.classList.add('pf-status--' + p.status);
      var lbl = el('small', '', p.status === 'jogando' ? t('Jogando agora') : p.status === 'online' ? t('Online no Lipy Hub') : t('Offline'));
      var lin = el('div', 'pf-status__linha');
      if (p.status === 'jogando' && p.jogo) {
        var g = D.jogos[p.jogo];
        if (g) { var im = el('img'); im.src = '/assets/media/' + g[0] + '/icone-sm.webp'; im.alt = ''; im.width = im.height = 48; lin.appendChild(im); }
        var tx = el('div'); tx.appendChild(el('b', '', C.nomeJogo(D, p.jogo))); if (p.desde) tx.appendChild(el('span', '', t('Começou {quando}', { quando: C.ha(p.desde) })));
        lin.appendChild(tx);
        if (g && g[4]) lin.appendChild(link(t('Jogar também'), linkJogo(D, p.jogo) + '#jogar', 'bt lj-bt-jogar pf-jogar', 'i-jogar'));
      } else lin.appendChild(el('span', '', p.status === 'offline' && p.visto ? t('Visto {quando}', { quando: C.ha(p.visto) }) : p.status === 'online' ? t('Está no Lipy Hub agora, sem jogo aberto.') : t('Sem sinal recente.')));
      st.appendChild(lbl); st.appendChild(lin);
    }
    $('[data-pf-corpo]').classList.toggle('pf-corpo--cartao', cartao);
    $$('.pf-esq > section, .pf-dir > section:not(.pf-seg)').forEach(function (s) { s.hidden = true; });
    if (cartao) return;
    // conquistas (as 50 mais novas)
    var cq = $('[data-pf-conq]'), ul = $('[data-lista]', cq), leg = $('[data-legenda]', cq);
    ul.textContent = '';
    var lista = p.conquistas || [];
    $('[data-n]', cq).textContent = sou && euFull && euFull.conquistas > lista.length ? num(euFull.conquistas) : num(lista.length);
    var legenda = function (c) { return [C.nomeConquista(c.codigo), c.jogo ? C.nomeJogo(D, c.jogo) : '', c.quando ? dataCurta(c.quando) : ''].filter(Boolean).join(' · '); };
    lista.forEach(function (c) {
      var m = MEDALHA.filter(function (x) { return x[0].test(c.codigo); })[0] || MEDALHA[0];
      var li = el('li'), b = el('button', 'pf-med');
      b.type = 'button';
      b.style.setProperty('--m1', m[2]); b.style.setProperty('--m2', m[3]);
      b.setAttribute('aria-label', legenda(c));
      b.appendChild(ico(m[1]));
      var g = c.jogo && D.jogos[c.jogo];
      if (g) { var im = el('img'); im.src = '/assets/media/' + g[0] + '/icone-sm.webp'; im.alt = ''; im.width = im.height = 32; im.loading = 'lazy'; b.appendChild(im); }
      ['mouseenter', 'focus', 'click'].forEach(function (ev) { b.addEventListener(ev, function () { leg.textContent = legenda(c); }); });
      li.appendChild(b); ul.appendChild(li);
    });
    leg.textContent = lista[0] ? (lista[0].quando ? t('Mais nova: {c}', { c: legenda(lista[0]) }) : legenda(lista[0])) : (sou ? t('Jogue os jogos grátis do Hub para ganhar as primeiras conquistas.') : t('Nenhuma conquista ainda.'));
    cq.hidden = false;
    // jogos e tempo (biblioteca)
    var at = $('[data-pf-ativ]'), box = $('[data-lista]', at);
    box.textContent = '';
    var jogos = bib && bib.ok ? bib.jogos : [];
    var porJogo = cat && cat.ok ? cat.conquistas.filter(function (x) { return x.escopo === 'jogo'; }).length : 0;
    $('[data-n]', at).textContent = jogos.length ? t('{t} no total', { t: tempo(p.segundos) }) : '';
    jogos.slice(0, 12).forEach(function (j) {
      var g = D.jogos[j.jogo], agora = p.status === 'jogando' && p.jogo === j.jogo;
      var lin = el('div', 'pf-rec');
      var arte = el('a', 'pf-rec__arte' + (g && g[3] ? ' is-retrato' : ''));
      arte.href = linkJogo(D, j.jogo); arte.tabIndex = -1; arte.setAttribute('aria-hidden', 'true');
      if (g) { var im = el('img'); im.src = g[2]; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; arte.appendChild(im); }
      lin.appendChild(arte);
      var info = el('div', 'pf-rec__info'), topo = el('div', 'pf-rec__topo');
      var nome = el('a', 'pf-rec__nome', C.nomeJogo(D, j.jogo)); nome.href = linkJogo(D, j.jogo);
      if (j.favorito) nome.appendChild(el('span', 'pf-rec__fav', '★')).setAttribute('aria-hidden', 'true');
      topo.appendChild(nome);
      topo.appendChild(el('span', 'pf-rec__horas' + (agora ? ' is-agora' : ''), t('{t} jogados', { t: tempo(j.segundos) }) + (agora ? ' · ' + t('jogando agora') : j.ultima ? ' · ' + t('jogou {quando}', { quando: C.ha(j.ultima) }) : '')));
      info.appendChild(topo);
      info.appendChild(el('p', 'pf-rec__num', t('Partidas: {p} · Vitórias: {v}', { p: num(j.partidas), v: num(j.vitorias) })));
      if (porJogo) {
        var cq2 = el('div', 'pf-rec__conq');
        cq2.appendChild(el('span', '', t('Conquistas {a} de {b}', { a: num(j.conquistas), b: num(porJogo) })));
        var bar = el('div', 'pf-xp__barra'), i = el('i'); i.style.width = Math.round(100 * Math.min(1, j.conquistas / porJogo)) + '%';
        bar.appendChild(i); cq2.appendChild(bar); info.appendChild(cq2);
      }
      lin.appendChild(info);
      box.appendChild(lin);
    });
    if (!jogos.length) {
      var v = el('p', 'sc-vazio', sou ? t('Ainda sem jogos. As partidas nos jogos grátis do Hub aparecem aqui.') : t('Ainda sem jogos registrados.'));
      if (sou) { v.appendChild(d.createTextNode(' ')); var a = el('a', 'sc-link', t('Ver os jogos grátis')); a.href = D.jogar || R.hub; v.appendChild(a); }
      box.appendChild(v);
    }
    at.hidden = false;
    // números
    var nb = $('[data-pf-num]'), dl = $('[data-lista]', nb);
    dl.textContent = '';
    [[t('Jogos'), num(p.jogos)], [t('Conquistas'), num(sou && euFull && euFull.ok ? euFull.conquistas : lista.length)], [t('Amigos'), num(p.amigos)], [t('Tempo'), tempo(p.segundos)]].forEach(function (x) {
      var dv = el('div'); dv.appendChild(el('dd', '', x[1])); dv.appendChild(el('dt', '', x[0])); dl.appendChild(dv);
    });
    nb.hidden = false;
    // amigos (só no meu perfil: o banco não mostra a lista de amigos dos outros)
    var ab = $('[data-pf-amigos]');
    if (sou && am && am.ok) {
      var al = $('[data-lista]', ab);
      al.textContent = '';
      $('[data-n]', ab).textContent = num(am.amigos.length);
      gruposAmigos(D, am.amigos.slice(0, 9), al, false);
      if (!am.amigos.length) al.appendChild(el('p', 'sc-vazio', t('Nenhum amigo ainda. Mande o seu link de convite.')));
      ab.hidden = false;
    }
  }
  function botoesPerfil(p) {
    var bs = $('[data-pf-bts]'), msg = $('[data-pf-msg]');
    bs.textContent = ''; diz(msg, '');
    var de_novo = function () { carregaPerfil(p.apelido); C.carregaEu(true); };
    var faz = function (fn, args, okTxt) {
      $$('button', bs).forEach(function (b) { b.disabled = true; });
      return C.rpc(fn, args).then(function (j) {
        $$('button', bs).forEach(function (b) { b.disabled = false; });
        if (!j.ok) { diz(msg, j.erro === 'nao_achou' && fn === 'hub_pedir_amizade' ? t('Essa pessoa só recebe pedidos pelo link de convite dela.') : msgErro(j.erro), 'erro'); return; }
        C.aviso(typeof okTxt === 'function' ? okTxt(j) : okTxt);
        de_novo();
      });
    };
    if (p.relacao === 'eu') {
      bs.appendChild(link(t('Editar perfil'), R.config, 'bt bt--vidro', 'i-engrenagem'));
      bs.appendChild(link(t('Convidar amigos'), R.amigos + '#convite', 'bt bt--luz', 'i-add'));
      return;
    }
    if (p.relacao === 'amigo') {
      var ja = bt(t('Amigos'), 'bt--vidro pf-ja', null, 'i-check'); ja.disabled = true; bs.appendChild(ja);
    } else if (p.relacao === 'enviado') {
      var env = bt(t('Pedido enviado'), 'bt--vidro pf-ja', null, 'i-check'); env.disabled = true; bs.appendChild(env);
      bs.appendChild(bt(t('Cancelar pedido'), 'bt--vidro', function () { faz('hub_desfazer_amizade', { p_apelido: p.apelido }, t('Pedido cancelado.')); }));
    } else if (p.relacao === 'recebido') {
      bs.appendChild(bt(t('Aceitar pedido'), 'bt--luz', function () { faz('hub_responder_amizade', { p_apelido: p.apelido, p_aceitar: true }, t('Agora vocês são amigos!')); }, 'i-check'));
      bs.appendChild(bt(t('Recusar'), 'bt--vidro', function () { faz('hub_responder_amizade', { p_apelido: p.apelido, p_aceitar: false }, t('Pedido recusado.')); }));
    } else {
      bs.appendChild(bt(t('Adicionar amigo'), 'bt--luz', function () {
        faz('hub_pedir_amizade', { p_apelido: p.apelido }, function (j) { return j.estado === 'amigos' ? t('Agora vocês são amigos!') : t('Pedido enviado para {apelido}.', { apelido: j.apelido || p.apelido }); });
      }, 'i-add'));
    }
    bs.appendChild(bt(t('Denunciar'), 'bt-denunciar', function () { denuncia(p.apelido); }, 'i-bandeira'));
    bs.appendChild(bt(t('Bloquear'), 'bt-denunciar', function () {
      bloqueia(p.apelido).then(function (ok) {
        if (ok) mensagem(t('{apelido} foi bloqueado.', { apelido: p.apelido }), t('Vocês não se veem mais no Lipy Hub. Para desfazer, vá em Amigos e depois em Bloqueados.'), [[t('Ir para Amigos'), R.amigos, 1]]);
      });
    }, 'i-bloquear'));
    if (p.relacao === 'amigo') bs.appendChild(menuMais([[t('Desfazer amizade'), function () {
      confirma(t('Desfazer a amizade com {apelido}?', { apelido: p.apelido }), t('Vocês deixam de ver o perfil e o "jogando agora" um do outro.'), t('Desfazer amizade'), true).then(function (ok) { if (ok) faz('hub_desfazer_amizade', { p_apelido: p.apelido }, t('Amizade desfeita.')); });
    }, 1]]));
  }
  // amigos em grupos: jogando agora / online / offline (o banco já manda nessa ordem)
  function gruposAmigos(D, lista, alvo, completo, recarrega) {
    [['jogando', t('Jogando agora')], ['online', t('Online')], ['offline', t('Offline')]].forEach(function (gp) {
      var L = lista.filter(function (a) { return a.status === gp[0]; });
      if (!L.length) return;
      alvo.appendChild(el('h3', 'sc-grupo', gp[1] + ' (' + num(L.length) + ')'));
      var ul = el('ul', 'sc-lista');
      L.forEach(function (a) {
        var acoes = [], mais = [];
        if (completo) {
          if (a.status === 'jogando' && a.jogo && D.jogos[a.jogo] && D.jogos[a.jogo][4]) acoes.push(link(t('Jogar também'), linkJogo(D, a.jogo) + '#jogar', 'bt lj-bt-jogar sc-bt-mini', 'i-jogar'));
          mais.push([t('Ver perfil'), function () { location.href = linkPerfil(a.apelido); }]);
          mais.push([t('Desfazer amizade'), function () {
            confirma(t('Desfazer a amizade com {apelido}?', { apelido: a.apelido }), t('Vocês deixam de ver o perfil e o "jogando agora" um do outro.'), t('Desfazer amizade'), true).then(function (ok) {
              if (ok) C.rpc('hub_desfazer_amizade', { p_apelido: a.apelido }).then(function (j) { C.aviso(j.ok ? t('Amizade desfeita.') : msgErro(j.erro), j.ok ? '' : 'erro'); recarrega(); });
            });
          }, 1]);
          mais.push([t('Denunciar'), function () { denuncia(a.apelido); }, 1]);
          mais.push([t('Bloquear'), function () { bloqueia(a.apelido).then(function (ok) { if (ok) recarrega(); }); }, 1]);
        }
        ul.appendChild(linhaPessoa(D, a, statusTexto(D, a), { acoes: acoes, mais: mais }));
      });
      alvo.appendChild(ul);
    });
  }

  /* ================= AMIGOS ================= */
  function pgAmigos() {
    var conv = (new URLSearchParams(location.search).get('convite') || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 12);
    comConta(conv ? t('Entre na sua conta para aceitar o convite de amizade.') : t('Entre na sua conta para ver e adicionar amigos.'), function () {
      if (conv) convite(conv);
      ligaAmigos();
      carregaAmigos();
    });
  }
  var limpaConvite = function () { try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {} };
  function convite(cod) {
    var c = $('[data-am-convite]'), msg = $('[data-msg]', c), ok = $('[data-am-convite-ok]', c);
    c.hidden = false;
    ok.addEventListener('click', function () {
      ok.disabled = true;
      C.rpc('hub_pedir_amizade', { p_codigo: cod }).then(function (j) {
        ok.disabled = false;
        if (!j.ok) {
          var M = { nao_achou: t('Esse convite não vale mais. Peça um link novo para quem convidou você.'), voce_mesmo: t('Esse é o seu próprio link de convite. Mande para outra pessoa.') };
          diz(msg, M[j.erro] || msgErro(j.erro), 'erro');
          if (j.erro === 'nao_achou' || j.erro === 'voce_mesmo' || j.erro === 'ja_amigos') { ok.hidden = true; limpaConvite(); }
          return;
        }
        limpaConvite();
        ok.hidden = true;
        $('[data-am-convite-nao]', c).hidden = true;
        diz(msg, j.estado === 'amigos' ? t('Agora você e {apelido} são amigos!', { apelido: j.apelido }) : t('Pedido enviado para {apelido}. Quando a pessoa aceitar, ela aparece na sua lista.', { apelido: j.apelido }), 'ok');
        carregaAmigos(); C.carregaEu(true);
      });
    });
    $('[data-am-convite-nao]', c).addEventListener('click', function () { c.hidden = true; limpaConvite(); });
  }
  var EU_AM = null;
  function carregaAmigos() {
    return Promise.all([C.rpc('hub_amigos'), C.carregaEu(true), C.rpc('hub_bloqueados'), C.rpc('hub_feed', { p_antes: null, p_limite: 20 }), C.dados()]).then(function (x) {
      var am = x[0], eu = x[1], bl = x[2], fd = x[3], D = x[4];
      if (!am.ok) { if (am.erro === 'sem_login') return; return mensagem(t('Sem conexão'), msgErro(am.erro), [[t('Tentar de novo'), function () { location.reload(); }, 1]]); }
      EU_AM = eu;
      estado('amigos');
      var recarrega = function () { carregaAmigos(); C.carregaEu(true); };
      // pedidos recebidos
      var rec = $('[data-am-recebidos]'), rl = $('[data-lista]', rec);
      rl.textContent = '';
      am.recebidos.forEach(function (p) {
        var resp = function (sim) { return function () { C.rpc('hub_responder_amizade', { p_apelido: p.apelido, p_aceitar: sim }).then(function (j) { C.aviso(j.ok ? (sim ? t('Agora vocês são amigos!') : t('Pedido recusado.')) : msgErro(j.erro), j.ok ? '' : 'erro'); recarrega(); }); }; };
        rl.appendChild(linhaPessoa(D, p, t('Pediu {quando}', { quando: C.ha(p.quando) }), {
          acoes: [miniBt(t('Aceitar'), resp(true), 1), miniBt(t('Recusar'), resp(false))],
          mais: [[t('Denunciar'), function () { denuncia(p.apelido); }, 1], [t('Bloquear'), function () { bloqueia(p.apelido).then(function (ok) { if (ok) recarrega(); }); }, 1]]
        }));
      });
      $('[data-n]', rec).textContent = num(am.recebidos.length);
      rec.hidden = !am.recebidos.length;
      // amigos
      var lista = $('[data-am-lista]');
      lista.textContent = '';
      $('[data-am-n]').textContent = num(am.amigos.length);
      gruposAmigos(D, am.amigos, lista, true, recarrega);
      $('[data-am-vazio]').hidden = am.amigos.length > 0;
      // pedidos enviados
      var env = $('[data-am-enviados]'), el2 = $('[data-lista]', env);
      el2.textContent = '';
      am.enviados.forEach(function (p) {
        el2.appendChild(linhaPessoa(D, p, t('Enviado {quando}', { quando: C.ha(p.quando) }), {
          acoes: [miniBt(t('Cancelar'), function () { C.rpc('hub_desfazer_amizade', { p_apelido: p.apelido }).then(function (j) { C.aviso(j.ok ? t('Pedido cancelado.') : msgErro(j.erro), j.ok ? '' : 'erro'); recarrega(); }); })]
        }));
      });
      $('[data-n]', env).textContent = num(am.enviados.length);
      env.hidden = !am.enviados.length;
      // bloqueados
      var bq = $('[data-am-bloq]'), bll = $('[data-lista]', bq), bls = bl && bl.ok ? bl.lista : [];
      bll.textContent = '';
      bls.forEach(function (p) {
        bll.appendChild(linhaPessoa(D, p, t('Bloqueado {quando}', { quando: C.ha(p.quando) }), {
          semLink: true,
          acoes: [miniBt(t('Desbloquear'), function () { C.rpc('hub_desbloquear', { p_apelido: p.apelido }).then(function (j) { C.aviso(j.ok ? t('{apelido} foi desbloqueado.', { apelido: p.apelido }) : msgErro(j.erro), j.ok ? '' : 'erro'); recarrega(); }); })]
        }));
      });
      $('[data-n]', bq).textContent = num(bls.length);
      $('[data-vazio]', bq).hidden = bls.length > 0;
      // atividade dos amigos (7 dias)
      var fb = $('[data-am-feed]'), fl = $('[data-lista]', fb), itens = fd && fd.ok ? fd.itens : [];
      fl.textContent = '';
      itens.forEach(function (it) {
        var txt = it.tipo === 'comecou' ? t('{apelido} começou a jogar {jogo}', { apelido: it.apelido, jogo: C.nomeJogo(D, it.jogo) })
          : it.tipo === 'nivel' ? t('{apelido} chegou ao nível {n}', { apelido: it.apelido, n: it.valor })
          : t('{apelido} ganhou a conquista "{nome}"', { apelido: it.apelido, nome: C.nomeConquista(it.valor) }) + (it.jogo ? ' · ' + C.nomeJogo(D, it.jogo) : '');
        var li = el('li', 'sc-feed__item');
        var a = el('a'); a.href = linkPerfil(it.apelido); a.appendChild(avatar(D, it.avatar, 32));
        li.appendChild(a);
        var s = el('span'); s.appendChild(el('span', '', txt)); s.appendChild(el('small', '', C.ha(it.quando)));
        li.appendChild(s);
        fl.appendChild(li);
      });
      fb.hidden = !itens.length;
      // meu link de convite
      pintaCodigo(eu && eu.codigo_convite);
    });
  }
  function pintaCodigo(cod) {
    var c = $('[data-am-cod]');
    c.textContent = cod ? location.origin + R.amigos + '?convite=' + cod : '';
    c.setAttribute('data-cod', cod || '');
  }
  function ligaAmigos() {
    var meu = $('.am-meu'), msgMeu = $('[data-msg]', meu);
    $('[data-am-copiar]').addEventListener('click', function () {
      var txt = $('[data-am-cod]').textContent;
      if (!txt) return;
      var ok = function () { diz(msgMeu, t('Link copiado! Mande para quem você conhece.'), 'ok'); };
      var falha = function () {
        try { var r = d.createRange(); r.selectNodeContents($('[data-am-cod]')); var s = W.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {}
        diz(msgMeu, t('Não deu para copiar sozinho. O link está selecionado: copie à mão.'), 'erro');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, falha); else falha();
    });
    $('[data-am-novo]').addEventListener('click', function () {
      confirma(t('Gerar outro código?'), t('O link atual para de valer. Quem já é seu amigo continua amigo.'), t('Gerar outro')).then(function (ok) {
        if (!ok) return;
        C.rpc('hub_novo_convite').then(function (j) {
          if (!j.ok) { diz(msgMeu, msgErro(j.erro), 'erro'); return; }
          pintaCodigo(j.codigo_convite);
          diz(msgMeu, t('Novo link pronto. O antigo não vale mais.'), 'ok');
        });
      });
    });
    // busca por apelido (só maiores que aceitam ser achados; o banco filtra)
    var fb = $('[data-am-busca]'), inp = $('#am-busca'), res = $('[data-am-resultados]'), msgB = $('[data-msg]', fb), tm = 0, seq = 0;
    var busca = function () {
      var v = inp.value.trim(), meu = ++seq;
      res.textContent = '';
      if (chave(v).replace(/[^a-z0-9]/g, '').length < 3) { diz(msgB, v ? msgErro('curto') : ''); return; }
      diz(msgB, t('Procurando…'));
      Promise.all([C.rpc('hub_buscar_apelido', { p_prefixo: v }), C.dados()]).then(function (x) {
        if (meu !== seq) return;
        var j = x[0], D = x[1];
        if (!j.ok) { diz(msgB, msgErro(j.erro), 'erro'); return; }
        diz(msgB, j.lista.length ? '' : t('Ninguém encontrado com esse começo de apelido.'));
        j.lista.forEach(function (p) {
          var acoes = [];
          if (p.relacao === 'nenhuma') acoes.push(miniBt(t('Adicionar'), function () {
            this.disabled = true;
            var b = this;
            C.rpc('hub_pedir_amizade', { p_apelido: p.apelido }).then(function (r) {
              if (!r.ok) { b.disabled = false; diz(msgB, msgErro(r.erro), 'erro'); return; }
              b.textContent = r.estado === 'amigos' ? t('Amigos') : t('Pedido enviado');
              C.aviso(r.estado === 'amigos' ? t('Agora vocês são amigos!') : t('Pedido enviado para {apelido}.', { apelido: r.apelido }));
              carregaAmigos();
            });
          }, 1));
          else acoes.push(el('span', 'sc-etq', p.relacao === 'amigo' ? t('Amigos') : p.relacao === 'enviado' ? t('Pedido enviado') : p.relacao === 'recebido' ? t('Pediu amizade') : ''));
          res.appendChild(linhaPessoa(D, p, '', { acoes: acoes }));
        });
      });
    };
    inp.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(busca, 600); });
    fb.addEventListener('submit', function (e) { e.preventDefault(); clearTimeout(tm); busca(); });
    // pedido por código de convite
    var fc = $('[data-am-codigo]'), ic = $('#am-codigo'), msgC = $('[data-msg]', fc);
    fc.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = ic.value.replace(/[^A-Za-z0-9]/g, '');
      if (v.length !== 8) { diz(msgC, t('O código tem 8 letras e números.'), 'erro'); ic.focus(); return; }
      var b = $('button', fc); b.disabled = true;
      C.rpc('hub_pedir_amizade', { p_codigo: v }).then(function (j) {
        b.disabled = false;
        if (!j.ok) { diz(msgC, j.erro === 'nao_achou' ? t('Código não encontrado. Confira as letras ou peça um link novo.') : msgErro(j.erro), 'erro'); return; }
        ic.value = '';
        diz(msgC, j.estado === 'amigos' ? t('Agora você e {apelido} são amigos!', { apelido: j.apelido }) : t('Pedido enviado para {apelido}.', { apelido: j.apelido }), 'ok');
        carregaAmigos();
      });
    });
    // volta a cada 2 min com a aba visível (quem está jogando muda)
    setInterval(function () { if (d.visibilityState === 'visible' && C.temPerfil() && !$('[data-estado="amigos"]').hidden) carregaAmigos(); }, 120000);
  }

  /* ================= CONFIGURAÇÕES ================= */
  function pgConfig() {
    comConta(t('Entre na sua conta para ver as configurações.'), function (eu) {
      Promise.all([C.dados(), catalogo()]).then(function (x) { config(eu, x[0], x[1]); });
    });
  }
  function config(eu, D, cat) {
    estado('config');
    var EU = eu;
    var aplica = function (j) {
      EU = j; C.guardaEu(j);
      var menor = j.faixa === 'menor';
      $$('[data-cf-menor]').forEach(function (x) { x.hidden = !menor; });
      $$('[data-cf-maior]').forEach(function (x) { x.hidden = menor; });
      var vis = $('input[name="vis"][value="' + (j.visibilidade === 'todos' ? 'todos' : 'amigos') + '"]');
      if (vis) vis.checked = true;
      $('[data-cf-achavel]').checked = !!j.achavel;
      $('[data-cf-invisivel]').checked = !!j.invisivel;
      $('[data-cf-faixa]').textContent = menor ? t('menos de 18 anos') : t('18 anos ou mais');
      $('[data-cf-exc-ap]').textContent = j.apelido;
      $('[data-cf-espera]').textContent = j.renomear_em_dias > 0 ? (j.renomear_em_dias > 1 ? t('Próxima troca liberada em {n} dias.', { n: j.renomear_em_dias }) : t('Próxima troca liberada amanhã.')) : '';
    };
    aplica(eu);
    // avatar
    var fa = $('[data-cf-avatar]'), ma = $('[data-msg]', fa);
    galeria($('[data-avatares]', fa), D, cat && cat.ok ? cat.avatares : Object.keys(D.jogos), eu.avatar);
    fa.addEventListener('submit', function (e) {
      e.preventDefault();
      var av = fa.querySelector('input[name="avatar"]:checked');
      if (!av) { diz(ma, msgErro('avatar'), 'erro'); return; }
      if (av.value === EU.avatar) { diz(ma, t('Esse já é o seu avatar.')); return; }
      C.rpc('hub_editar_perfil', { p_avatar: av.value }).then(function (j) { if (!j.ok) { diz(ma, msgErro(j.erro), 'erro'); return; } aplica(j); diz(ma, t('Avatar salvo.'), 'ok'); });
    });
    // apelido
    var fp = $('[data-cf-apelido]'), ip = $('#cf-apelido'), mp = $('[data-apelido-msg]', fp);
    ip.value = eu.apelido;
    vigiaApelido(ip, function () { return EU.apelido; });
    fp.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = ip.value.trim();
      if (v === EU.apelido) { diz(mp, t('Este é o seu apelido atual.')); return; }
      var er = apelidoLocal(v);
      if (er) { diz(mp, msgErro(er), 'erro'); ip.focus(); return; }
      C.rpc('hub_renomear', { p_apelido: v }).then(function (j) {
        if (!j.ok) { diz(mp, msgErro(j.erro, j), 'erro'); return; }
        aplica(j); ip.value = j.apelido; diz(mp, t('Apelido trocado. Agora você é {apelido}.', { apelido: j.apelido }), 'ok');
      });
    });
    // privacidade (salva na hora)
    var mpv = $('[data-cf-pv-msg]');
    var salva = function (args, desfaz) {
      diz(mpv, t('Salvando…'));
      C.rpc('hub_editar_perfil', args).then(function (j) {
        if (!j.ok) { diz(mpv, msgErro(j.erro), 'erro'); desfaz(); return; }
        aplica(j); diz(mpv, t('Salvo.'), 'ok');
      });
    };
    $$('input[name="vis"]').forEach(function (r) { r.addEventListener('change', function () { salva({ p_visibilidade: r.value }, function () { aplica(EU); }); }); });
    $('[data-cf-achavel]').addEventListener('change', function (e) { var v = e.target.checked; salva({ p_achavel: v }, function () { e.target.checked = !v; }); });
    $('[data-cf-invisivel]').addEventListener('change', function (e) { var v = e.target.checked; salva({ p_invisivel: v }, function () { e.target.checked = !v; }); });
    $('[data-cf-virar-menor]').addEventListener('click', function () {
      confirma(t('Mudar para menos de 18?'), t('O seu perfil passa a ficar visível só para amigos e sai da busca. Para voltar a "18 ou mais", só pedindo à equipe.'), t('Mudar')).then(function (ok) { if (ok) salva({ p_faixa: 'menor' }, function () {}); });
    });
    // excluir a conta: digitar o apelido + confirmar de novo
    var fx = $('[data-cf-excluir]'), ix = $('#cf-exc'), bx = $('button[type="submit"]', fx), mx = $('[data-msg]', fx);
    ix.addEventListener('input', function () { bx.disabled = chave(ix.value.trim()) !== chave(EU.apelido); });
    fx.addEventListener('submit', function (e) {
      e.preventDefault();
      if (bx.disabled) return;
      confirma(t('Excluir a conta para sempre?'), t('Tudo some agora: perfil, amigos, conquistas, tempo de jogo e o login. Não dá para desfazer.'), t('Excluir para sempre'), true).then(function (ok) {
        if (!ok) return;
        bx.disabled = true;
        diz(mx, t('Excluindo…'));
        C.rpc('hub_excluir_conta', { p_confirmar: ix.value.trim() }).then(function (j) {
          if (!j.ok) { bx.disabled = false; diz(mx, msgErro(j.erro), 'erro'); return; }
          C.esquece();
          mensagem(t('Conta excluída'), j.login_apagado === false ? t('Apagamos o seu perfil e tudo dele. O login será apagado pela equipe em até 2 dias úteis.') : t('Apagamos o seu perfil, tudo dele e o seu login. Obrigado por ter jogado com a gente.'), [[t('Voltar ao Lipy Hub'), R.hub, 1]]);
        });
      });
    });
  }

  ({ entrar: pgEntrar, perfil: pgPerfil, amigos: pgAmigos, config: pgConfig }[PAG] || function () {})();
})();
