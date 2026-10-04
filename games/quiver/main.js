// Quiver — telas, navegação e a tela de jogo. As regras moram em engine.js/sessao.js; aqui é só
// mostrar, animar e passar os toques adiante.
(function () {
  'use strict';
  const VERSAO = '1.0.1';
  const $ = id => document.getElementById(id);
  const cfg = window.CONFIG, Motor = window.Motor, FASES = window.FASES;
  const DESAFIOS = window.DESAFIOS, Desafio = window.Desafio, Avisos = window.Avisos, ESPECIAIS = window.ESPECIAIS, Rede = window.Rede;
  const { ARENAS, BASE, daFase } = window.ARENAS_INFO;
  const P = window.Perfil; P.carrega(cfg);
  // o app foi fechado no meio de uma fase (sem vencer nem perder): conta como derrota
  if (P.d.emJogo) { P.d.emJogo = null; P.gastaEnergia(cfg); }
  // registros de desafio com mais de 2 meses (e o desafio de teste que já acabou) saem do save
  (function () {
    const lim = Date.now() - 62 * 864e5;
    for (const id of Object.keys(P.d.desafios)) { const r = P.d.desafios[id]; if (!r || !(r.t > lim)) delete P.d.desafios[id]; }
    if (P.d.desafioTeste && !(Date.now() < P.d.desafioTeste.fim)) P.d.desafioTeste = null;
    P.salva();
  })();
  const raiz = document.documentElement;

  // ================= idioma =================
  // (um idioma que esta versão não tem, vindo da cópia do Play Games de uma versão mais nova, não vale)
  let lang = (I18N.T[P.d.idioma] && P.d.idioma) || I18N.detecta(navigator.language);
  function t(k, vars) {
    let s = (I18N.T[lang] && I18N.T[lang][k] != null) ? I18N.T[lang][k] : (I18N.T.pt[k] != null ? I18N.T.pt[k] : k);
    if (vars) for (const [a, b] of Object.entries(vars)) s = String(s).split('{' + a + '}').join(b);
    // árabe: a marca invisível RLM no começo de cada linha faz a linha correr da direita para a
    // esquerda mesmo quando começa com nome latino ("Quiver…") ou número (o CSS decide pelo conteúdo)
    // Número com sinal (+5, ×3) vai isolado da esquerda para a direita, senão o árabe mostra "5+"
    // (que o jogador lê como "5 ou mais")
    if (lang === 'ar' && typeof s === 'string') s = '\u200F' + s.replace(/\n/g, '\n\u200F').replace(/[+×]\d+(?:[.,]\d+)*/g, sinal);
    return s;
  }
  // número com sinal ("+1", "x2"): no árabe, isolado da esquerda para a direita (vale também para os
  // montados no código, fora do t())
  function sinal(s) { return lang === 'ar' ? '\u2066' + s + '\u2069' : s; }
  // falas e nome dos chefes (grupo `chefes` do i18n)
  function chefeTxt(id) { const g = (I18N.T[lang] && I18N.T[lang].chefes) || I18N.T.pt.chefes; return g[id] || I18N.T.pt.chefes[id]; }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rico = s => esc(s).replace(/\*([^*]+)\*/g, '<span class="dest">$1</span>').replace(/\n/g, '<br>');
  function poe(el, s) { el.textContent = s; el.dataset.t = s; }
  // título em duas camadas: contorno escuro (atrás) + letra em degradê (na frente)
  function poeTitulo(el, s) { el.dataset.t = s; el.innerHTML = '<span class="gtx">' + esc(s) + '</span>'; }
  // hi-IN: algarismos comuns com o agrupamento indiano (12,34,567)
  // (o `lang` da página também escolhe a forma japonesa dos ideogramas na fonte do sistema)
  // ar: dia da semana em árabe com os algarismos comuns (2,350 e 07:00), os mesmos da arte do jogo
  const LOCAL = { pt: 'pt-BR', en: 'en-US', es: 'es-AR', hi: 'hi-IN', ja: 'ja-JP', ar: 'ar-EG-u-nu-latn' };
  const num = n => new Intl.NumberFormat(LOCAL[lang] || 'en-US').format(n);
  // Encolhe a letra de quem tem `data-fit` até caber na caixa (o espaço é o da arte do dono, e o
  // mesmo texto em espanhol ou hindi pode ser bem mais comprido). Só mede o que está visível.
  function encaixa(raizEl) {
    if (!raizEl) return;
    raizEl.querySelectorAll('[data-fit]').forEach(el => {
      el.style.fontSize = '';
      if (!el.offsetParent) return;
      let tam = parseFloat(getComputedStyle(el).fontSize);
      const min = tam * 0.45;
      // Folga vertical de ~meia letra: com linha apertada, a Baloo (letra alta) "vaza" alguns pixels
      // da linha e o navegador conta isso como estouro, mesmo com o texto cabendo. Uma linha a mais
      // de verdade passa de 1 letra inteira e continua sendo pega.
      // Texto da direita para a esquerda (árabe) que passa da borda ESQUERDA não entra no scrollWidth:
      // no árabe, confere também o retângulo do texto contra o da caixa, sem a rotação do próprio
      // elemento (títulos das arenas), que inflaria os dois retângulos e acusaria estouro falso.
      const rg = lang === 'ar' ? document.createRange() : null;
      const foraDaCaixa = () => {
        if (!rg) return false;
        const giro = el.style.transform; el.style.transform = 'none';
        rg.selectNodeContents(el); const txt = rg.getBoundingClientRect(), cx = el.getBoundingClientRect();
        el.style.transform = giro;
        return txt.width > 0 && (txt.left < cx.left - 1 || txt.right > cx.right + 1);
      };
      const estoura = () => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + tam * 0.45 || foraDaCaixa();
      for (let g = 0; g < 80 && tam > min && estoura(); g++) { tam -= 1; el.style.fontSize = tam + 'px'; }
    });
  }
  function aplicaIdioma() {
    document.querySelectorAll('[data-i]').forEach(el => {
      const s = t(el.dataset.i);
      // texto com destaque vai num bloco só: dentro de um contêiner flex, cada pedaço (texto solto,
      // <span> do destaque, <br>) viraria um item separado e a frase se partia em colunas
      if (el.hasAttribute('data-rich')) el.innerHTML = '<div>' + rico(s) + '</div>';
      else if (el.hasAttribute('data-titulo')) poeTitulo(el, s);
      else poe(el, s);
    });
    raiz.lang = lang === 'hi' || lang === 'ar' ? lang : (LOCAL[lang] || 'en'); // leitor de tela fala na voz do idioma
    document.body.dataset.lang = lang;
    atualizaSaldo();
    atualizaEnergia();
    if (tela === 'classic') desenhaClassic();
    encaixa($('tela-' + tela));
  }

  // ================= palco (escala para qualquer tela) =================
  function layout() {
    const vw = window.innerWidth || 360, vh = window.innerHeight || 640;
    let s = vw / 941, ph = vh / s;
    if (ph < 1672) { s = vh / 1672; ph = 1672; } // tela larga (tablet): cabe pela altura
    raiz.style.setProperty('--s', s);
    raiz.style.setProperty('--ph', ph);
    raiz.style.setProperty('--oc', (ph - 1672) / 2);
    FX.tamanho(941, ph);
    Ambiente.tamanho(941, ph, (ph - 1672) / 2);
    Jogo.oc = (ph - 1672) / 2;
  }

  // ================= utilidades =================
  function vibra(ms, amp) {
    if (!P.d.vibra) return;
    try { if (window.LipyHaptics) window.LipyHaptics.pulse(ms, amp || 90); else if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { }
  }
  let toastT = 0;
  function toast(msg) {
    // frase comprida quebra em linhas (numa linha só ela passava da tela) e fica mais tempo.
    // Mede também a largura de verdade: no japonês cada letra ocupa o dobro, e 26 já passam do palco.
    const el = $('toast');
    el.textContent = msg; el.classList.remove('longo');
    const longo = String(msg).length > 30 || el.offsetWidth > 900;
    el.classList.toggle('longo', longo); el.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), longo ? 3200 : 1700);
  }
  function toque(el, fn) { el.addEventListener('click', e => { Som.destrava(); Som.toca('botao'); fn(e); }); }
  // APK de teste? (no navegador, sem a ponte Android, conta como teste)
  function ehTeste() { try { return !window.LipyApp || !!window.LipyApp.teste(); } catch (e) { return false; } }
  function atualizaSaldo() {
    const m = num(P.d.moedas), g = num(P.d.gemas);
    const mm = document.querySelector('#m-moedas .num'); if (mm) mm.textContent = m;
    document.querySelectorAll('.moedas').forEach(e => e.textContent = m);
    document.querySelectorAll('.gemas').forEach(e => e.textContent = g);
  }
  const mmss = s => { s = Math.max(0, Math.ceil(s - 1e-6)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  // tempo que JÁ passou (conta para cima): arredonda para baixo, ao contrário do relógio do Rush
  const relogio = s => { s = Math.max(0, Math.floor(s + 1e-6)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const sorteia = lista => lista[Math.floor(Math.random() * lista.length)];
  const ICONE_PARTILHA = '<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><circle cx="18" cy="5" r="3" fill="#fff"/><circle cx="6" cy="12" r="3" fill="#fff"/><circle cx="18" cy="19" r="3" fill="#fff"/><path d="M8.6 10.7l6.8-4M8.6 13.3l6.8 4" stroke="#fff" stroke-width="2.4"/></svg>';
  // SALVAR PROGRESSO (Configurações, 0.9): a nuvem
  const ICONE_NUVEM = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M20 50h26a12 12 0 0 0 2-23.8A16 16 0 0 0 17.3 24 13 13 0 0 0 20 50z" fill="#8fd4ff" stroke="#0c2a4a" stroke-width="3.5" stroke-linejoin="round"/><path d="M32 30v14M26 38l6 6 6-6" fill="none" stroke="#0c2a4a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // botões de anúncio premiado (0.9): o vídeo com o ▶ — o jogador sabe antes de tocar que vai ver um anúncio
  const ICONE_VIDEO = '<svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3.5" fill="#fff" stroke="#0a1f4a" stroke-width="1.6"/><path d="M10 9.2l5.2 2.8-5.2 2.8z" fill="#1b58c4"/></svg>';
  // sino dourado dos AVISOS (antes era o raio, que é o ícone da energia e confundia)
  const ICONE_SINO = '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="sino-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3a0"/><stop offset=".45" stop-color="#ffc62a"/><stop offset="1" stop-color="#e07a10"/></linearGradient></defs>' +
    '<path d="M32 5c-2.4 0-4.3 1.9-4.3 4.3v1.5C19.4 12.7 14 20 14 28.5V39l-5.5 6.8V49h47v-3.2L50 39V28.5c0-8.5-5.4-15.8-13.7-17.7V9.3C36.3 6.9 34.4 5 32 5z" fill="url(#sino-g)" stroke="#4a1c04" stroke-width="3.5" stroke-linejoin="round"/>' +
    '<path d="M24.5 51.5a7.5 7.5 0 0 0 15 0z" fill="#ffd23a" stroke="#4a1c04" stroke-width="3.5" stroke-linejoin="round"/>' +
    '<path d="M21.5 27c0-5 3.3-9.2 8-10.6" fill="none" stroke="#fffbe0" stroke-width="3.2" stroke-linecap="round" opacity=".85"/></svg>';

  // ================= som e música (volumes em Configurações) =================
  function aplicaVolumes() {
    Som.volume((P.d.volEfeitos ?? 4) / 4);
    Musica.nivel((P.d.volMusica ?? 2) / 4);
  }
  // o que deve tocar agora: carregamento em silêncio; menu e fases do Rush com a do menu; cada
  // arena do Classic com a sua (mapa e fases); as fases do Rush com a das fases iniciais
  function contextoMusica() {
    if (tela === 'carrega') return null;
    if (tela === 'menu' || tela === 'rush' || tela === 'fim') return 'menu';
    if (tela === 'classic') return ARENAS[arenaVista].id;
    if (tela === 'jogo') return especialAtual() ? especialAtual().musica : modo === 'rush' ? 'selva' : ARENAS[arenaJogo].id;
    return null;
  }
  function musicaDoContexto() { Musica.quer(contextoMusica()); }

  // ================= energia (decisão do dono: gasta só ao perder) =================
  function temEnergia() { return P.energiaAgora(cfg).n > 0; }
  function faltaEnergia() { const e = P.energiaAgora(cfg); return e.prox ? Math.max(0, (e.prox - Date.now()) / 1000) : 0; }
  function atualizaEnergia() {
    const e = P.energiaAgora(cfg), txt = e.n + '/' + cfg.energia_max, cheia = e.n >= cfg.energia_max;
    document.querySelectorAll('.en-num').forEach(el => { if (el.textContent !== txt) el.textContent = txt; });
    const falta = cheia ? '' : mmss(faltaEnergia());
    document.querySelectorAll('.en-t').forEach(el => { if (el.textContent !== falta) el.textContent = falta; el.classList.toggle('some', cheia); });
    const vivo = $('en-modal-t'); if (vivo) vivo.textContent = cheia ? t('energia_cheia') : t('proxima_energia', { t: falta });
    const vivoN = $('en-modal-n'); if (vivoN) vivoN.textContent = txt;
    // encheu sozinha com a janela aberta: o botão de pagar some (antes cobrava diamante à toa)
    const enc = $('en-encher'); if (enc && cheia) enc.style.display = 'none';
  }
  // fase que o jogador tentou abrir sem energia: depois de encher, ela abre direto
  let faseEsperando = null;
  function abreEnergia() {
    const e = P.energiaAgora(cfg), cheia = e.n >= cfg.energia_max;
    const volta = tela === 'jogo' && S && S.ativo() && !pausado;
    if (volta) pausado = true;
    // (0.9) +1 energia por anúncio assistido, com teto por dia
    const btAd = !cheia && ofereceVideo('energia', regras().energia_dia) ? `<button class="bt azul peq ol" id="en-anuncio"><span class="bt-ico">${ICONE_VIDEO}${esc(t('energia_anuncio'))}</span></button>` : '';
    abreModal('energia', `<div class="janela" style="--y:420"><h2 class="ol5">${esc(t(e.n > 0 ? 'energia' : 'sem_energia'))}</h2>
      <div class="en-grande"><img src="ui/raio-energia.webp" alt=""><span id="en-modal-n" class="ol">${e.n}/${cfg.energia_max}</span></div>
      <p id="en-modal-t" class="ol">${esc(cheia ? t('energia_cheia') : t('proxima_energia', { t: mmss(faltaEnergia()) }))}</p>
      <p style="font-size:26px;opacity:.85">${esc(t('energia_explica', { m: cfg.energia_min }))}</p>
      <div class="botoes">${cheia ? '' : `<button class="bt verde ol" id="en-encher"><span class="bt-ico">${esc(t('encher'))} ${cfg.encher_gemas}<img src="ui/gema.webp" alt=""></span></button>`}${btAd}
      <button class="bt cinza peq ol" id="en-fechar">${esc(t('fechar'))}</button></div>
      <p class="ol" style="font-size:26px"><span class="bt-ico">${esc(num(P.d.gemas))}<img src="ui/gema.webp" alt="" style="width:34px"></span></p></div>`);
    const sai = () => { faseEsperando = null; fechaModal(); if (volta) retomaJogo(); else saiDeFaseEncerrada(); };
    if (!cheia) toque($('en-encher'), () => {
      if (P.energiaAgora(cfg).n >= cfg.energia_max) return sai(); // encheu sozinha enquanto a janela estava aberta
      if (P.d.gemas < cfg.encher_gemas) return toast(t('sem_gemas'));
      gasta('gemas', cfg.encher_gemas); P.encheEnergia(cfg);
      Som.toca('energia'); vibra(30, 120); atualizaSaldo(); atualizaEnergia();
      // quem chegou aqui tentando jogar uma fase volta direto para ela
      const f = faseEsperando; faseEsperando = null;
      if (f) { fechaModal(); iniciaFase(f.m, f.k); } else sai();
    });
    if ($('en-anuncio')) toque($('en-anuncio'), () => premiado('energia', () => {
      P.ganhaEnergia(cfg); Som.toca('energia'); vibra(30, 120); atualizaEnergia(); toast(t('ganhou_energia', { n: 1 }));
      // quem chegou aqui tentando jogar uma fase volta direto para ela
      const f = faseEsperando; faseEsperando = null;
      if (f && modalTipo === 'energia') { fechaModal(); iniciaFase(f.m, f.k); }
      else if (modalTipo === 'energia') abreEnergia();
    }));
    toque($('en-fechar'), sai);
  }

  // Fechou uma janela e a fase por baixo já acabou (ex.: "tentar de novo" sem energia): não deixa o
  // jogador preso num tabuleiro parado — volta para as fases do modo.
  function saiDeFaseEncerrada() { if (tela === 'jogo' && (!S || !S.ativo()) && !modalTipo) voltaDaFase(); }

  // ================= navegação =================
  let tela = 'carrega';
  function vai(nome) {
    document.querySelectorAll('.tela').forEach(s => s.classList.toggle('ativa', s.id === 'tela-' + nome));
    tela = nome;
    // trocar de tela sempre tira a pausa da música (inclusive "reiniciar" pela janela de pausa)
    Musica.bloqueia('pausa', false);
    if (nome !== 'jogo') { FX.limpa(); Som.silencia(); paraFalas(); acabaTutorial(); }
    if (nome === 'menu') entraMenu();
    if (nome === 'rush') desenhaRush();
    if (nome === 'classic') desenhaClassic();
    // ambiente vivo: o do mapa liga em desenhaClassic e o do jogo em iniciaFase (sabem a arena)
    if (nome === 'fim') Ambiente.liga($('amb-fim'), 'final', []);
    else if (nome !== 'classic' && nome !== 'jogo') Ambiente.para();
    if (nome !== 'fim') { fimTimers.forEach(clearTimeout); fimTimers = []; }
    const fundo = document.querySelector('#tela-' + nome + ' .fundo');
    if (fundo) $('borrado').style.backgroundImage = fundo.style.backgroundImage;
    if (nome !== 'classic') paraBalaoMapa();
    atualizaEnergia();
    musicaDoContexto();
    encaixa($('tela-' + nome));
  }
  // pontos da arte de onde o ambiente solta partículas (ambiente-fontes.js); no jogo, sem os que
  // ficam debaixo do tabuleiro (ninguém vê)
  function fontesDe(arq, grade) {
    const f = (window.AMBIENTE_FONTES || {})[arq] || [];
    if (!grade) return f;
    const [a, b, c, d] = grade, poli = [a, b, d, c]; // cantos: cima-esq, cima-dir, baixo-esq, baixo-dir
    const dentro = p => poli.every((q, k) => { const r = poli[(k + 1) % 4]; return (r[0] - q[0]) * (p[1] - q[1]) - (r[1] - q[1]) * (p[0] - q[0]) >= 0; });
    return f.filter(p => !dentro(p));
  }

  // ================= carregamento =================
  const IMAGENS = ['bg/menu.webp', 'bg/rush.webp', 'bg/classic.webp', 'bg/jogo.webp',
    'logo', 'pill-moedas', 'pill-energia', 'botao-config', 'botao-diario-sem', 'badge', 'botao-missoes', 'botao-loja', 'botao-jogar', 'botao-classic',
    'icone-ranking', 'icone-skins', 'icone-conquistas', 'icone-gravar', 'botao-voltar', 'pill-energia-r', 'pill-moedas-r', 'pill-gemas',
    'titulo-rush-limpo', 'subtitulo-rush', 'caixa-novas-fases', 'placa-mais-fases', 'pedra-livre', 'pedra-atual', 'pedra-trancada',
    'titulo-classic-limpo', 'placa-conquiste', 'painel-boss', 'selo-livre', 'selo-atual', 'selo-trancado', 'selo-boss-limpo', 'escudo', 'estrela', 'estrela-ouro', 'estrela-cinza',
    'hud-fase', 'hud-tempo', 'botao-pausa', 'seta-cima-azul', 'seta-cima-ciano', 'seta-dir-verde', 'seta-dir-roxa', 'seta-baixo-vermelha', 'seta-baixo-rosa',
    'seta-esq-amarela', 'seta-esq-laranja', 'bloco-x', 'bloco-vidro', 'faixa-concluida', 'faixa-timeup-limpa', 'explosao', 'estilhaco-gelo', 'botao-desfazer', 'botao-bomba',
    'botao-gelo', 'botao-raio', 'rastro-azul', 'rastro-vermelho', 'rastro-amarelo', 'rastro-roxo', 'coracao', 'coracao-vazio', 'moeda', 'gema', 'raio-energia',
    'botao-som', 'botao-musica', 'botao-idioma', 'coroa']
    .map(n => n.includes('/') ? n : 'ui/' + n + '.webp');
  function carrega() {
    let feitos = 0;
    const total = IMAGENS.length + 1;
    const passo = () => { feitos++; $('carga-fill').style.width = Math.round(100 * feitos / total) + '%'; };
    const dicas = t('dicas');
    let d = Math.floor(Math.random() * dicas.length);
    const mostraDica = () => { $('carga-dica-txt').innerHTML = rico(t('dicas')[d % dicas.length]); d++; encaixa($('tela-carrega')); };
    mostraDica();
    const troca = setInterval(mostraDica, 2600);
    const inicio = performance.now();
    const promessas = IMAGENS.map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = () => { passo(); res(); }; i.src = src; }));
    // (no árabe, carrega também a face árabe: com unicode-range, o load sem texto só traz a latina)
    promessas.push((document.fonts && document.fonts.load ? Promise.all([document.fonts.load('800 40px Baloo'), lang === 'ar' ? document.fonts.load('800 40px Baloo', 'ع') : null]) : Promise.resolve()).catch(() => { }).then(passo));
    Promise.all(promessas).then(() => {
      // a tela de carregamento é arte do dono: fica pelo menos 1,6 s para ser vista
      const falta = Math.max(0, 1600 - (performance.now() - inicio));
      // (aberto por um toque num aviso: o que ele prometeu abre já no menu)
      setTimeout(() => { clearInterval(troca); vai('menu'); confereAviso(); iniciaRanking(); }, falta);
      // as artes das arenas carregam depois, sem segurar a abertura
      // (a arena 1 não tem chefe: sem tela de luta nem sprite)
      for (const a of ARENAS) for (const src of [a.mapa, a.jogo, a.luta, a.sprite && a.sprite.src]) if (src) { const i = new Image(); i.src = src; }
    });
  }

  // ================= menu =================
  let entradaT = 0;
  let pedeAvisosT = 0;
  function entraMenu() {
    atualizaSaldo();
    $('m-diario-badge').classList.toggle('some', !P.diarioDisponivel());
    atualizaDesafioMenu();
    atualizaBadges();
    // o aviso tocado durante uma fase abre agora; senão, talvez a pergunta dos avisos (depois do
    // menu terminar de se montar)
    trataAvisoPendente();
    clearTimeout(pedeAvisosT); pedeAvisosT = setTimeout(talvezPecaAvisos, 1800);
    // o menu "se monta": logo cai, blocos sobem do altar, botões entram (uma vez por visita)
    const tm = $('tela-menu');
    tm.classList.remove('entrando'); void tm.offsetWidth; tm.classList.add('entrando');
    clearTimeout(entradaT); entradaT = setTimeout(() => tm.classList.remove('entrando'), 1600);
  }
  function ligaMenu() {
    toque($('bt-jogar'), abreRush);
    toque($('bt-classic'), abreClassic);
    toque($('m-config'), abreConfig);
    toque($('m-diario'), abreDiario);
    toque($('m-desafio'), () => abreDesafio(desafioAberto()));
    document.querySelectorAll('.bt-energia').forEach(b => toque(b, abreEnergia));
    // (0.7: todos os botões do menu funcionando; 0.8: o RANKING online)
    toque($('m-moedas'), abreLoja);
    toque($('m-loja'), abreLoja);
    toque($('m-missoes'), abreMissoes);
    toque($('m-conquistas'), abreConquistas);
    toque($('m-ranking'), () => abreRanking());
    toque($('m-skins'), abreSkins);
    toque($('m-gravar'), () => abreRoleta());
    document.querySelectorAll('.voltar').forEach(b => toque(b, () => vai('menu')));
    toque($('aba-rush'), abreRush);
    toque($('c-seta-esq'), () => mudaArena(-1));
    toque($('c-seta-dir'), () => mudaArena(1));
  }

  // ================= fases do Rush =================
  let paginaRush = 0;
  const PAGINAS_RUSH = Math.ceil(FASES.rush.length / 20);
  // vindo do menu, abre na página da fase em que o jogador está (não sempre na 1ª)
  function abreRush() { paginaRush = Math.min(PAGINAS_RUSH - 1, Math.floor(P.atual('rush', FASES.rush.length) / 20)); vai('rush'); }
  const R_Y = [492, 669, 855, 1032, 1226];
  const R_TOPO = [202, 379, 561, 739], R_BASE = [153, 366, 577, 787];
  // centro de cada estrela desenhada na arte e a largura dela, em % da peça (medido com tools/regua.mjs)
  const ESTR = {
    'pedra-livre': [[30, 82], [53.4, 82], [75.7, 82], 23],
    'pedra-atual': [[27.3, 80], [50, 80], [72.7, 80], 23],
    'selo-livre': [[21, 79.6], [49, 79.6], [77, 79.6], 29],
    'selo-boss': [[30, 71], [49, 71], [69, 71], 20],
  };
  const LARG = { 'pedra-livre': 189, 'pedra-atual': 194, 'pedra-trancada': 168, 'selo-livre': 147, 'selo-atual': 147, 'selo-trancado': 146, 'selo-boss': 183 };
  function estrelasPor(el, img, ganhas, sempreCinza) {
    const e = ESTR[img]; if (!e) return;
    for (let k = 0; k < 3; k++) {
      if (k < ganhas && !sempreCinza) continue; // a dourada já está desenhada na arte
      const s = document.createElement('img');
      s.className = 'es'; s.src = 'ui/estrela-cinza.webp';
      s.style.left = e[k][0] + '%'; s.style.top = e[k][1] + '%'; s.style.width = e[3] + '%';
      el.appendChild(s);
    }
  }
  function estrelasOuro(el, img, ganhas) {
    const e = ESTR[img]; if (!e) return;
    for (let k = 0; k < ganhas; k++) {
      const s = document.createElement('img');
      s.className = 'es'; s.src = 'ui/estrela-ouro.webp';
      s.style.left = e[k][0] + '%'; s.style.top = e[k][1] + '%'; s.style.width = (e[3] + 2) + '%';
      el.appendChild(s);
    }
  }
  // linha de pontinhos entre duas fases (acesa = caminho já aberto); `ini` = raio livre em volta
  function elo(caixa, pa, pb, aceso, ini, cor) {
    const dx = pb.x - pa.x, dy = pb.y - pa.y, L = Math.hypot(dx, dy);
    const comp = L - 2 * ini;
    if (comp < 14) return;
    const e = document.createElement('div'); e.className = 'elo' + (aceso ? '' : ' off');
    if (cor) e.style.setProperty('--cor', cor);
    e.style.left = (pa.x + dx / L * ini) + 'px'; e.style.top = (pa.y + dy / L * ini - 5) + 'px'; e.style.width = comp + 'px';
    e.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    const n = Math.max(2, Math.round(comp / 24));
    for (let i = 0; i < n; i++) e.appendChild(document.createElement('i'));
    caixa.appendChild(e);
  }
  function desenhaRush() {
    atualizaSaldo();
    const g = $('r-grade'); g.innerHTML = '';
    const total = FASES.rush.length, atual = P.atual('rush', total);
    const pos = [];
    // perspectiva da arte: a linha de baixo é a mais perto (pedras maiores e mais abertas)
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
      const f = r / 4;
      pos.push({ x: R_TOPO[c] + (R_BASE[c] - R_TOPO[c]) * f, y: R_Y[r], esc: 0.72 + 0.05 * r });
    }
    // elos (pontinhos) entre vizinhas, desenhados antes das pedras
    const livre = k => k < total && P.liberada('rush', k);
    const base = paginaRush * 20;
    for (let i = 0; i < 20; i++) {
      const r = Math.floor(i / 4), c = i % 4;
      if (c < 3) elo(g, pos[i], pos[i + 1], livre(base + i + 1), 62);
      if (r < 4) elo(g, pos[i], pos[i + 4], livre(base + i + 4), 62);
    }
    for (let i = 0; i < 20; i++) {
      const k = base + i, p = pos[i];
      const existe = k < total, lib = existe && P.liberada('rush', k), est = existe ? P.estrelas('rush', k) : 0;
      const img = !lib ? 'pedra-trancada' : (k === atual && !est ? 'pedra-atual' : 'pedra-livre');
      const b = document.createElement('button');
      b.className = 'pedra aperta' + (img === 'pedra-atual' ? ' atual' : '');
      b.style.setProperty('--atraso', (i * 0.025).toFixed(3) + 's');
      const larg = LARG[img] * p.esc;
      b.style.left = p.x + 'px'; b.style.top = p.y + 'px'; b.style.width = larg + 'px';
      b.innerHTML = `<img src="ui/${img}.webp" alt="">`;
      const n = document.createElement('div'); n.className = 'n ct';
      // número do tamanho da arte: grande na pedra aberta, menor em cima do cadeado
      n.style.top = img === 'pedra-trancada' ? '31%' : '38%';
      n.style.fontSize = Math.round(larg * (img === 'pedra-trancada' ? 0.29 : k + 1 >= 100 ? 0.32 : 0.4)) + 'px';
      if (img === 'pedra-trancada') n.style.left = '-4%';
      poe(n, String(k + 1)); b.appendChild(n);
      if (img !== 'pedra-trancada') estrelasPor(b, img, est, img === 'pedra-atual');
      toque(b, () => {
        if (!existe) return toast(t('pagina_breve'));
        if (!lib) return toast(t('bloqueada'));
        iniciaFase('rush', k);
      });
      g.appendChild(b);
    }
    // "novas fases em breve" só na última página
    const ultima = paginaRush === PAGINAS_RUSH - 1;
    $('r-novas').style.display = ultima ? '' : 'none';
    $('r-mais').style.display = ultima ? '' : 'none';
    // indicador de páginas
    const pg = $('paginas'); pg.innerHTML = '';
    const seta = (dir) => {
      const s = document.createElement('button'); s.className = 'seta' + (dir < 0 ? ' esq' : '');
      s.innerHTML = '<svg viewBox="0 0 24 24" width="34" height="34"><path d="M8 3l10 9-10 9" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      toque(s, () => mudaPagina(dir));
      return s;
    };
    pg.appendChild(seta(-1));
    for (let q = 0; q < PAGINAS_RUSH; q++) {
      const d = document.createElement('button'); d.className = 'pt' + (q === paginaRush ? ' on' : '');
      toque(d, () => { paginaRush = q; desenhaRush(); });
      pg.appendChild(d);
    }
    pg.appendChild(seta(1));
  }
  function mudaPagina(dir) {
    const nova = Math.max(0, Math.min(PAGINAS_RUSH - 1, paginaRush + dir));
    if (nova === paginaRush) return;
    paginaRush = nova; desenhaRush();
  }
  // arrastar para o lado troca de página (Rush) ou de arena (Classic)
  function ligaArrasto(telaEl, fn) {
    let x0 = null, y0 = 0;
    telaEl.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
    telaEl.addEventListener('pointerup', e => {
      if (x0 == null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) fn(dx < 0 ? 1 : -1);
    });
  }

  // ================= mapa do Classic: uma arena por vez =================
  let arenaVista = 0;
  const totalClassic = FASES.classic.length;
  // arena aberta = a primeira fase dela está liberada (a última da anterior foi vencida)
  const arenaAberta = a => P.liberada('classic', BASE[a]);
  // o que falta para abrir a arena `a`: derrotar o chefe da anterior ou, se ela não tem chefe
  // (a arena 1), completá-la
  function msgArenaFechada(a) {
    const ant = ARENAS[a - 1];
    return ant && ant.chefe ? t('arena_bloqueada', { nome: chefeTxt(ant.chefe).nome }) : t('arena_completa', { n: a });
  }
  function abreClassic() {
    arenaVista = daFase(Math.min(totalClassic - 1, P.atual('classic', totalClassic))).a; vai('classic');
    // os amigos do mapa chegam da rede depois (guardados por 2 min)
    if (Rede.conta()) atualizaAmigos().then(() => { if (tela === 'classic') desenhaAmigosMapa(); });
  }
  function mudaArena(dir) {
    const nova = Math.max(0, Math.min(ARENAS.length - 1, arenaVista + dir));
    if (nova === arenaVista) return;
    arenaVista = nova; desenhaClassic(); musicaDoContexto();
    const fundo = document.querySelector('#tela-classic .fundo');
    $('borrado').style.backgroundImage = fundo.style.backgroundImage;
    encaixa($('tela-classic'));
  }
  function caixaEm(el, b, rot) {
    el.style.left = b[0] + 'px'; el.style.setProperty('--y', b[1]); el.style.width = b[2] + 'px'; el.style.height = b[3] + 'px';
    el.style.setProperty('--h', b[3]); // os títulos tiram o tamanho da letra da altura da caixa
    el.style.transform = rot ? `rotate(${rot}deg)` : '';
  }
  function desenhaClassic() {
    atualizaSaldo();
    const A = ARENAS[arenaVista], a = arenaVista, tc = $('tela-classic');
    const aberta = arenaAberta(a);
    tc.querySelector('.fundo').style.backgroundImage = `url(${A.mapa})`;
    tc.classList.toggle('arena-selva', A.id === 'selva');
    tc.classList.toggle('travada', !aberta);
    tc.dataset.arena = A.id;
    // textos por cima da arte das arenas 2-5 (a arena 1 usa as peças da arte original)
    if (A.titulo) {
      caixaEm($('c-t-modo'), A.titulo.modo, A.titulo.rot);
      caixaEm($('c-t-grande'), A.titulo.classic, A.titulo.rot);
      $('c-t-grande').dataset.tema = A.titulo.tema;
      caixaEm($('c-placa'), [A.placa.x, A.placa.y, A.placa.w, A.placa.h], A.placa.rot);
      $('c-painel').style.display = A.painel ? '' : 'none';
      if (A.painel) caixaEm($('c-painel'), [A.painel.x, A.painel.y, A.painel.w, A.painel.h], A.painel.rot);
    }
    // aba de baixo: nome da arena no lugar de "fases progressivas"
    poe($('aba-classic-sub'), t('arena_n', { n: a + 1 }) + (A.chefe ? ' · ' + chefeTxt(A.chefe).nome : ''));
    $('c-seta-esq').style.visibility = a > 0 ? '' : 'hidden';
    $('c-seta-dir').style.visibility = a < ARENAS.length - 1 ? '' : 'hidden';
    // arena fechada: o aviso de quem derrotar
    const trava = $('c-trava');
    trava.style.display = aberta ? 'none' : '';
    if (!aberta) poe(trava.querySelector('.tv-txt'), msgArenaFechada(a));
    // selos e pontinhos
    const m = $('c-mapa'); m.innerHTML = '';
    const atual = P.atual('classic', totalClassic), b0 = BASE[a];
    const pts = A.selos.map(([x, y]) => ({ x, y: y + 8 }));
    for (let j = (A.eloDe || 0); j + 1 < A.n; j++) {
      if ((A.semElo || []).includes(j)) continue;
      elo(m, pts[j], pts[j + 1], P.liberada('classic', b0 + j + 1), 46, A.cor);
    }
    pts.forEach((p, j) => {
      const k = b0 + j, chefe = !!FASES.classic[k].chefe;
      const lib = P.liberada('classic', k), est = P.estrelas('classic', k);
      const eAtual = lib && k === atual && !est;
      const img = chefe ? 'selo-boss' : (eAtual ? 'selo-atual' : (lib ? 'selo-livre' : 'selo-trancado'));
      const b = document.createElement('button');
      b.className = 'selo aperta' + (eAtual && !chefe ? ' atual' : '') + (chefe ? ' chefe' : '');
      b.style.setProperty('--atraso', (j * 0.02).toFixed(3) + 's');
      // tamanho medido na arte (mesma régua): selo comum ~88 px, o atual e o do chefe um pouco maiores
      const larg = LARG[img] * (chefe ? 0.66 : eAtual ? 0.68 : 0.6);
      b.style.left = p.x + 'px'; b.style.top = p.y + 'px'; b.style.width = larg + 'px';
      if (chefe && !lib) b.style.filter = 'grayscale(.6) brightness(.8)';
      b.innerHTML = `<img src="ui/${chefe ? 'selo-boss-limpo' : img}.webp" alt="">`;
      const n = document.createElement('div'); n.className = 'n ct';
      n.style.top = chefe ? '27%' : (lib ? '41%' : '32%');
      n.style.fontSize = Math.round(larg * (chefe ? 0.3 : lib ? 0.5 : 0.4)) + 'px';
      poe(n, String(j + 1)); b.appendChild(n);
      if (chefe) { const bs = document.createElement('div'); bs.className = 'selo-boss-txt ol'; bs.setAttribute('data-fit', ''); poe(bs, t('selo_boss')); b.appendChild(bs); }
      if (img === 'selo-livre' || img === 'selo-atual') estrelasPor(b, 'selo-livre', est, eAtual);
      if (chefe && est) estrelasOuro(b, 'selo-boss', est);
      toque(b, () => { if (!lib) return toast(aberta ? t('bloqueada') : msgArenaFechada(a)); iniciaFase('classic', k); });
      m.appendChild(b);
    });
    desenhaAmigosMapa(); // (ranking online: a foto dos amigos na fase em que cada um está)
    comecaBalaoMapa();
    if (tela === 'classic') Ambiente.liga($('amb-classic'), A.id, fontesDe(A.mapa));
  }

  // ---------- balão do chefe no mapa: provocações que se revezam ----------
  let balaoT = 0, balaoI = 0;
  function mostraBalao(el, b, txt) {
    caixaEm(el, [b.x, b.y, b.w, b.h], 0);
    el.className = 'balao a centro cauda-' + b.cauda;
    const tx = el.querySelector('.balao-txt'); tx.textContent = txt;
    void el.offsetWidth; el.classList.add('on');
    encaixa(el);
  }
  function comecaBalaoMapa() {
    paraBalaoMapa();
    const A = ARENAS[arenaVista];
    if (!A.chefe || !A.balao) return; // arena sem chefe: ninguém provoca
    const falas = chefeTxt(A.chefe).mapa;
    balaoI = Math.floor(Math.random() * falas.length);
    const um = () => {
      if (tela !== 'classic') return;
      mostraBalao($('c-balao'), A.balao, falas[balaoI++ % falas.length]);
      balaoT = setTimeout(() => { $('c-balao').classList.remove('on'); balaoT = setTimeout(um, 700); }, 4200);
    };
    balaoT = setTimeout(um, 900);
  }
  function paraBalaoMapa() { clearTimeout(balaoT); const b = $('c-balao'); if (b) b.classList.remove('on'); }

  // ================= jogo =================
  // cantos do chão do tabuleiro na arte do Rush e da arena 1 (as outras arenas têm os seus)
  const GRADE_PADRAO = [[139, 530], [795, 530], [79, 1314], [835, 1314]];
  const Jogo = { oc: 0 };
  let H = null; // homografia tabuleiro plano (w*100 x h*100) -> palco
  function resolve8(A, b) {
    const n = b.length;
    for (let i = 0; i < n; i++) {
      let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
      [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
      for (let r = i + 1; r < n; r++) { const f = A[r][i] / A[i][i]; for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
    }
    const x = new Array(n);
    for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let c = i + 1; c < n; c++) s -= A[i][c] * x[c]; x[i] = s / A[i][i]; }
    return x;
  }
  // Tabuleiro de w x h casas de 100 px no plano, levado para os 4 cantos do chão da arte: quanto
  // maior o tabuleiro, menores as casas — a moldura é sempre a mesma.
  function montaHomografia(w, h, grade) {
    const G = grade || GRADE_PADRAO;
    const W = w * 100, Hh = h * 100;
    const src = [[0, 0], [W, 0], [0, Hh], [W, Hh]], A = [], b = [];
    for (let k = 0; k < 4; k++) {
      const [u, v] = src[k], [x, y] = G[k];
      A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]); b.push(x);
      A.push([0, 0, 0, u, v, 1, -u * y, -v * y]); b.push(y);
    }
    const hh = resolve8(A, b);
    H = [[hh[0], hh[1], hh[2]], [hh[3], hh[4], hh[5]], [hh[6], hh[7], 1]];
    const tb = $('tabuleiro');
    tb.style.width = W + 'px'; tb.style.height = Hh + 'px';
    tb.style.transform = `matrix3d(${H[0][0]},${H[1][0]},0,${H[2][0]},${H[0][1]},${H[1][1]},0,${H[2][1]},0,0,1,0,${H[0][2]},${H[1][2]},0,${H[2][2]})`;
  }
  // ponto do tabuleiro plano -> palco
  function projeta(u, v) { const w = H[2][0] * u + H[2][1] * v + H[2][2]; return [(H[0][0] * u + H[0][1] * v + H[0][2]) / w, Jogo.oc + (H[1][0] * u + H[1][1] * v + H[1][2]) / w]; }
  const centroCasa = i => projeta((i % S.c.w) * 100 + 50, Math.floor(i / S.c.w) * 100 + 50);

  const SPRITE = [['seta-cima-azul', 'seta-cima-ciano'], ['seta-dir-verde', 'seta-dir-roxa'], ['seta-baixo-vermelha', 'seta-baixo-rosa'], ['seta-esq-amarela', 'seta-esq-laranja']];
  const RASTRO = [['rastro-azul', 'rastro-azul'], ['rastro-azul', 'rastro-roxo'], ['rastro-vermelho', 'rastro-roxo'], ['rastro-amarelo', 'rastro-amarelo']];
  const RASTRO_FILTRO = [['', 'hue-rotate(-25deg)'], ['hue-rotate(-95deg) saturate(1.4)', ''], ['', 'hue-rotate(40deg)'], ['', 'hue-rotate(-18deg)']];
  const COR = [['#3aa0ff', '#3ee6ff'], ['#3ee05a', '#b25cff'], ['#ff4a4a', '#ff5ad2'], ['#ffd23a', '#ff9a2a']];

  let S = null, modo = 'rush', faseK = 0, pausado = false, mira = false, ultimoQuadro = 0, pecas = [], rodando = false;
  let ultimoSegundo = 99, fimTratado = false, ultimoFim = null, arenaJogo = 0, trocandoOnda = false;
  // a fase em jogo (do pacote ou do DESAFIO RELÂMPAGO) e o desafio dela (null = fase normal)
  let faseObj = null, desafio = null;
  // A CENA da fase: a arena do Classic ou, no desafio da semana de uma data comemorativa, a da data
  // (especiais.js). Na cena especial o chefe fica sempre na tela: luta no "chefe fugitivo"; nos
  // outros dois tipos assiste e provoca.
  const especialAtual = () => (desafio && desafio.especial && ESPECIAIS[desafio.especial]) || null;
  const cena = () => especialAtual() || ARENAS[arenaJogo];
  const chefeNaTela = () => !!(S && (S.chefe || especialAtual()));

  // Ritmo pessoal (DEV_NOTES #2): o tempo base da fase vezes o ritmo do jogador, com teto e piso.
  function limitePessoal(fase, k) {
    if (!cfg.ritmo || k < 5) return fase.t;
    const m = Math.max(cfg.ritmo_min, Math.min(cfg.ritmo_max, (P.d.ritmo || 1) * 1.05));
    return Math.max(8, Math.round(fase.t * m));
  }
  function atualizaRitmo(venceu) {
    // (o desafio usa o ritmo, mas não mexe nele: é uma fase fora da curva; a vitória depois de
    // REVIVER também não: a sobra inclui o tempo devolvido e o jogador pareceria mais rápido)
    if (desafio || S.revives || modo !== 'rush' || faseK < 5 || !cfg.ritmo) return;
    const f = FASES.rush[faseK];
    let r = P.d.ritmo || 1;
    // venceu: compara o relógio que gastou com o do jogador médio naquela fase. Vitória com poder
    // que mexe no relógio (congelar, desfazer, explosão) não serve de medida: o relógio "gasto"
    // parece menor do que o esforço — sem isto, quem sofria e usava o CONGELAR ganhava MENOS tempo.
    if (venceu) {
      if (S.usos.gelo || S.usos.bomba || S.usos.desfazer || !(f.e > 0)) return;
      const q = Math.max(0.25, Math.min(2, (S.limite - S.resta) / f.e));
      r = 0.7 * r + 0.3 * q;
    }
    // perdeu no tempo: afrouxa (pouco se foi por um triz, mais se ficou longe)
    else if (S.estado === 'tempo') r *= S.restantes <= 2 ? 1.04 : 1.12;
    // mesmo limite do multiplicador (limitePessoal usa r x 1,05): fora dele o ritmo mudaria sem efeito
    // e depois levaria várias derrotas para voltar a fazer diferença
    P.d.ritmo = Math.max(cfg.ritmo_min / 1.05, Math.min(cfg.ritmo_max / 1.05, r)); P.salva();
  }

  // `ev` = DESAFIO RELÂMPAGO: não gasta energia (nem para entrar, nem ao perder) e não mexe no
  // progresso das fases
  function iniciaFase(m, k, ev) {
    if (!ev && !temEnergia()) { fechaModal(); abreEnergia(); faseEsperando = { m, k }; return; }
    // quem sai de uma derrota direto para a mesma fase "tentou de novo"
    if (!ev && ultimoFim && ultimoFim.modo === m && ultimoFim.k === k && Date.now() - ultimoFim.t < 60000) { ultimoFim.rec.repetiu = true; P.salva(); }
    ultimoFim = null;
    desafio = ev || null;
    modo = m; faseK = k;
    // (na cena especial, só os tabuleiros de até 9 linhas: o chão dela é mais baixo que o das lutas)
    const banco = ev ? (ev.especial ? DESAFIOS[ev.tipo].filter(f => f.h <= 9) : DESAFIOS[ev.tipo]) : null;
    const fase = faseObj = ev ? banco[ev.n % banco.length] : FASES[m][k];
    const E = especialAtual();
    const A = E || (m === 'classic' ? ARENAS[arenaJogo = ev ? arenaDoDesafio(ev) : daFase(k).a] : null);
    // Rush: tempo com o ritmo pessoal (no desafio também: o relógio fica apertado para cada um).
    // O chefe do desafio luta uma onda só (até o ANGEMBI, que na campanha tem duas).
    const extra = m === 'rush' ? { t: limitePessoal(fase, ev ? 99 : k) } : { ataque: A.ataque, vidaChefe: ev ? 1 : (A.vida || 1) };
    // corações comprados na loja valem no Classic (menos no desafio "um coração só")
    if (m === 'classic' && !(ev && ev.tipo === 'coracao')) extra.coracoes = cfg.classic_coracoes + (P.d.coracoesExtra || 0);
    S = new window.Sessao(Object.assign({}, fase, extra), m, cfg);
    // o erro que acabaria a fase pode ser salvo com o DESFAZER, se houver no estoque
    S.temDesfazer = () => (P.d.estoque.desfazer || 0) > 0;
    pausado = false; mira = false; fimTratado = false; ultimoSegundo = 99; bombaAtiva = false; explodiu = false; premio = null;
    fechaModal();
    // projétil ou faísca de uma luta abandonada ainda voando não passa por cima do tabuleiro novo
    // (cancelar a animação: só remover o elemento ainda deixava o "ao chegar" rodar)
    document.querySelectorAll('#tela-jogo .projetil, #tela-jogo .golpe').forEach(el => { el.getAnimations().forEach(a => a.cancel()); el.remove(); });
    trocandoOnda = false;
    $('tela-jogo').classList.remove('pausado');
    // cenário: Rush e arena 1 na selva; cada arena com o tabuleiro dela; o chefe com a tela dele; a
    // data comemorativa com a cena dela (nos três tipos de desafio)
    const tj = $('tela-jogo'), chefe = !!S.chefe;
    const fundo = E ? E.luta : m === 'rush' ? 'bg/jogo.webp' : chefe ? A.luta : A.jogo;
    tj.querySelector('.fundo').style.backgroundImage = `url(${fundo})`;
    tj.dataset.arena = E ? E.id : m === 'rush' ? 'selva' : A.id;
    tj.classList.toggle('luta', chefe || !!E);
    vai('jogo');
    const grade = E ? E.gradeLuta : m === 'rush' ? GRADE_PADRAO : chefe ? A.gradeLuta : A.grade;
    montaHomografia(S.c.w, S.c.h, grade);
    montaTabuleiro();
    montaHud();
    montaChefe();
    // ambiente vivo da arena (selva no Rush): brasas da lava, neve, areia, luz... (e o da data)
    Ambiente.liga($('amb-jogo'), E ? E.id : m === 'rush' ? 'selva' : A.id, fontesDe(fundo, grade));
    // chefe de mais de uma onda: a próxima é montada antes, com o celular folgado (montar na hora
    // do toque travava a tela por um instante)
    if (S.chefe && S.chefe.ondas > 1) preparaOnda();
    calor = 0; apagaCalor();
    // animações de uma vez só (aviso, clarão, tremor) recomeçam quando a tela do jogo volta a
    // aparecer: sem limpar, o aviso da fase anterior ("DESFAZER PARA SALVAR!") tocava de novo aqui
    const av = $('aviso'); av.classList.remove('mostra'); av.textContent = '';
    $('flash').classList.remove('on');
    $('treme').classList.remove('tremer', 'tremer-forte');
    tj.classList.remove('fever', 'gelado', 'urgente');
    $('hud-tempo').classList.remove('bomba');
    // o que o Rush acendeu nos últimos segundos não passa para a fase seguinte (nem para o Classic)
    $('laser-luz').classList.remove('urgente');
    $('barra').classList.remove('urgente');
    Som.pavio(false);
    $('combo').classList.remove('on');
    // tutorial em balões (5 primeiras fases de cada modo) e avisos de 1ª vez (blocos X, peças falsas;
    // no desafio, só estes)
    comecaTutorial(m, ev ? 99 : k);
    if (fase.chefe) aviso(t('chefe'));
    Som.toca('entra');
    garanteLaco();
  }

  function pecaEl(i, p) {
    const w = S.c.w, el = document.createElement('div');
    // (a pedra do chefe é "t-pedra": a classe .pedra já é a das pedras de fase do Rush)
    // (o estado da peça também: remontar o tabuleiro — reviver — não pode descongelar nem "esconder
    // de novo" a falsa já descoberta)
    el.className = 'peca' + (p.k === 'f' ? ' falsa' : '') + (p.k === 'x' ? ' x' : '') + (p.k === 't' ? ' temp t-' + p.estilo : '') +
      (p.gelo > 0 ? ' congelada' : '') + (p.revelada ? ' revelada' : '');
    el.dataset.i = i;
    el.style.left = (i % w) * 100 + 'px'; el.style.top = Math.floor(i / w) * 100 + 'px';
    // bloco de gelo na neve (NEVAMBI e Natal); nas outras datas, o bloco X tingido pelo CSS da cena
    const bloco = tjArena() === 'nevambi' || tjArena() === 'natal' ? 'bloco-vidro' : 'bloco-x';
    el.innerHTML = `<img src="ui/${p.k === 'x' || p.k === 't' ? bloco : SPRITE[p.d][p.c]}.webp" alt="">`;
    if (p.k === 'f') el.style.setProperty('--gd', (-Math.random() * 3.2).toFixed(2) + 's');
    el.style.setProperty('--h', ((i * 47) % 360) + 'deg'); // (skin arco-íris: cada peça num tom)
    return el;
  }
  const tjArena = () => $('tela-jogo').dataset.arena;
  function montaTabuleiro() {
    const tb = $('tabuleiro'); tb.innerHTML = ''; tb.classList.remove('mira');
    const w = S.c.w, h = S.c.h, N = w * h;
    // brilho do fogo: dentro do plano, acompanha a perspectiva
    const br = document.createElement('div'); br.id = 'brasa'; tb.appendChild(br);
    pecas = new Array(N).fill(null);
    for (let i = 0; i < N; i++) {
      const c = document.createElement('div'); c.className = 'casa'; c.dataset.i = i;
      c.style.left = (i % w) * 100 + 'px'; c.style.top = Math.floor(i / w) * 100 + 'px';
      tb.appendChild(c);
    }
    for (let i = 0; i < N; i++) {
      const p = S.c[i]; if (!p) continue;
      const el = pecaEl(i, p);
      const col = i % w, lin = Math.floor(i / w);
      tb.appendChild(el);
      pecas[i] = el;
      // as peças caem no tabuleiro em cascata: as de baixo chegam primeiro
      el.animate([{ transform: 'translateY(-1100px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, offset: .82 }, { transform: 'translateY(-14px)', offset: .91 }, { transform: 'translateY(0)' }],
        { duration: 460, delay: (h - 1 - lin) * 45 + col * 14, easing: 'cubic-bezier(.35,.1,.55,1)', fill: 'backwards' });
    }
  }

  // ================= tutorial em balões =================
  // Nas 5 primeiras fases de cada modo um balão ensina o jogo, um passo por vez, apontando para a
  // peça ou o botão de que fala. Passo 'toque' espera o jogador tirar uma seta (o jogo corre); os
  // outros param o jogo (relógio incluído) até o ENTENDI. "PULAR TUTORIAL" desliga tudo de vez.
  // Fora dessas fases: avisos de 1ª vez (blocos X e peças falsas), no mesmo balão.
  let tut = null, tutT = 0, tutParado = false;
  function passosTutorial(m, k) {
    const rush = m === 'rush', ps = [];
    if (k < 5 && !P.d.visto[m + k]) {
      if (k === 0) ps.push({ txt: 'tut_toque', alvo: 'livre', espera: 'toque' }, { txt: rush ? 'tut_meta_rush' : 'tut_meta_classic', alvo: rush ? '#hud-tempo' : '#hud-vidas' });
      if (k === 1) ps.push({ txt: rush ? 'tut_bate_rush' : 'tut_bate_classic', alvo: 'bloqueada' }, { txt: 'tut_ordem', alvo: 'livre' });
      if (k === 2) ps.push(rush ? { txt: 'tut_combo', alvo: '#fever-barra' } : { txt: 'tut_estrelas_classic', alvo: '#hud-vidas' });
      if (k === 3) ps.push({ txt: rush ? 'tut_poderes_rush' : 'tut_poderes_classic', alvo: '#pw-b' });
      if (k === 4) ps.push(rush ? { txt: 'tut_bomba', alvo: '#hud-tempo' } : { txt: 'tut_chefes', alvo: null });
      ps.forEach(p => { p.marca = m + k; });
    }
    if (S.c.some(p => p && p.k === 'x') && !P.d.visto.blocos) ps.push({ txt: 'tut_blocos', alvo: 'x', marca: 'blocos' });
    if (Motor.contaFalsas(S.c) > 0 && !P.d.visto.falsa) ps.push({ txt: 'falsa_tut', alvo: 'falsa', marca: 'falsa' });
    return ps;
  }
  function comecaTutorial(m, k) {
    acabaTutorial();
    if (P.d.tutorialPulado) return;
    const passos = passosTutorial(m, k);
    if (!passos.length) return;
    tut = { passos, i: 0 };
    tutT = setTimeout(mostraPasso, 750); // depois das peças caírem no tabuleiro
  }
  // onde o passo aponta, em pixels do palco: {x,y,w,h} e `casa` quando é uma casa do tabuleiro
  function alvoTutorial(a) {
    if (!a) return null;
    if (a[0] === '#') {
      const el = document.querySelector(a); if (!el || !el.offsetParent) return null;
      const pr = $('palco').getBoundingClientRect(), r = el.getBoundingClientRect(), s = pr.width / 941;
      return { x: (r.left + r.width / 2 - pr.left) / s, y: (r.top + r.height / 2 - pr.top) / s, w: r.width / s, h: r.height / s };
    }
    let i = -1;
    for (let j = 0; j < S.c.length && i < 0; j++) {
      const p = S.c[j]; if (!p) continue;
      if (a === 'livre' && Motor.livre(S.c, j)) i = j;
      else if (a === 'bloqueada' && p.k === 'a' && !Motor.livre(S.c, j) && !(p.gelo > 0)) i = j;
      else if (a === 'x' && p.k === 'x') i = j;
      else if (a === 'falsa' && p.k === 'f') i = j;
    }
    if (i < 0) return null;
    const [x, y] = centroCasa(i);
    return { x, y, w: 110, h: 110, casa: i };
  }
  function mostraPasso() {
    if (!tut || !S || tela !== 'jogo') return;
    const p = tut.passos[tut.i], ok = p.espera !== 'toque';
    tutParado = ok;
    const b = $('tut'), alvo = alvoTutorial(p.alvo);
    // ({n}: os corações da fase — com os comprados na loja, podem ser mais de 3)
    b.querySelector('.balao-txt').innerHTML = '<div>' + rico(t(p.txt, { n: S.coracoesMax })) + '</div>';
    $('tut-ok').style.display = ok ? '' : 'none';
    // mede o balão antes de posicionar (a altura depende do texto e do idioma)
    b.className = 'balao tut'; b.style.visibility = 'hidden'; b.style.left = '0px'; b.style.top = '0px';
    const bw = b.offsetWidth, bh = b.offsetHeight, ph = +getComputedStyle(raiz).getPropertyValue('--ph') || 1672;
    let left, top, cauda = '';
    if (!alvo) { left = (941 - bw) / 2; top = ph * 0.42 - bh / 2; }
    else {
      left = Math.max(18, Math.min(941 - 18 - bw, alvo.x - bw / 2));
      // alvo na metade de baixo: balão em cima dele, com a ponta para baixo; senão, embaixo
      if (alvo.y > ph * 0.45) { top = alvo.y - alvo.h / 2 - 34 - bh; cauda = 'cauda-baixo-x'; } else { top = alvo.y + alvo.h / 2 + 34; cauda = 'cauda-cima-x'; }
      b.style.setProperty('--cx', Math.max(46, Math.min(bw - 46, alvo.x - left)) + 'px');
    }
    b.style.left = left + 'px'; b.style.top = Math.max(10, top) + 'px';
    b.classList.add(...(cauda ? [cauda] : []));
    b.style.visibility = ''; void b.offsetWidth; b.classList.add('on');
    anelTutorial(alvo, p.alvo === 'falsa');
    Som.toca('entra');
  }
  // anel que pulsa em volta do alvo: dentro do tabuleiro para casas (segue a perspectiva)
  function anelTutorial(alvo, alerta) {
    const m = $('mao'); if (m) m.remove();
    const anel = $('tut-anel'); anel.classList.remove('on', 'alerta');
    if (!alvo) return;
    if (alvo.casa != null) {
      const el = document.createElement('div'); el.id = 'mao'; el.classList.toggle('alerta', alerta);
      el.style.left = ((alvo.casa % S.c.w) * 100 - 5) + 'px'; el.style.top = (Math.floor(alvo.casa / S.c.w) * 100 - 5) + 'px';
      $('tabuleiro').appendChild(el);
    } else {
      anel.style.left = (alvo.x - alvo.w / 2 - 10) + 'px'; anel.style.top = (alvo.y - alvo.h / 2 - 10) + 'px';
      anel.style.width = (alvo.w + 20) + 'px'; anel.style.height = (alvo.h + 20) + 'px';
      anel.classList.add('on');
    }
  }
  function avancaTutorial() {
    // só com o balão à vista: dois toques rápidos no ENTENDI pulavam o passo seguinte sem mostrar
    if (!tut || !$('tut').classList.contains('on')) return;
    const p = tut.passos[tut.i], prox = tut.passos[tut.i + 1];
    // a fase (ou o aviso) conta como vista quando o último passo dela passa
    if (p.marca && (!prox || prox.marca !== p.marca)) { P.d.visto[p.marca] = true; P.salva(); }
    tut.i++;
    $('tut').classList.remove('on'); anelTutorial(null);
    tutParado = false;
    if (tut.i >= tut.passos.length) acabaTutorial();
    else tutT = setTimeout(mostraPasso, 280);
    garanteLaco();
  }
  function acabaTutorial() {
    clearTimeout(tutT); tut = null; tutParado = false;
    const b = $('tut'); if (b) b.classList.remove('on');
    if ($('tut-anel')) anelTutorial(null);
    garanteLaco();
  }
  function pulaTutorial() { P.d.tutorialPulado = true; P.salva(); acabaTutorial(); }

  // ---------- HUD ----------
  const PW = { rush: ['desfazer', 'bomba', 'gelo'], classic: ['desfazer', 'bomba', 'raio'] };
  const PW_IMG = { desfazer: 'botao-desfazer', bomba: 'botao-bomba', gelo: 'botao-gelo', raio: 'botao-raio' };
  const PW_ROT = { desfazer: 'desfazer', bomba: 'explosao', gelo: 'congelar', raio: 'raio' };
  function numeroNaArena() { return modo === 'rush' ? faseK + 1 : faseK - BASE[arenaJogo] + 1; }
  function montaHud() {
    const f = faseObj;
    const l1 = document.querySelector('#hud-fase .l1');
    l1.innerHTML = desafio ? `<b>${esc(t('desafio_hud'))}</b>` : `${esc(t('fase'))} <b>${numeroNaArena()}</b>`;
    const l2 = document.querySelector('#hud-fase .l2');
    const E = especialAtual();
    l2.textContent = E ? t('data_' + E.id) : desafio ? t('desafio_' + desafio.tipo) : f.chefe ? t('boss') : modo === 'rush' ? t('rush') : arenaJogo === 0 ? t('classic') : chefeTxt(ARENAS[arenaJogo].chefe).nome;
    l2.style.color = E ? E.cor : desafio ? '#ffd23a' : f.chefe ? '#ff5a4a' : '';
    const rush = modo === 'rush';
    $('hud-tempo').style.display = rush ? '' : 'none';
    $('barra').style.display = rush ? '' : 'none';
    $('fever-barra').style.display = rush ? '' : 'none';
    $('vel').style.display = rush ? '' : 'none';
    $('hud-vidas').style.display = !rush && S.coracoesMax > 0 ? '' : 'none';
    // Classic: relógio que conta o tempo da fase (o Rush já tem o dele, que conta para baixo)
    $('hud-relogio').style.display = rush ? 'none' : '';
    ['a', 'b', 'c'].forEach((q, n) => {
      const nome = PW[modo][n];
      const b = $('pw-' + q);
      b.dataset.pw = nome;
      b.querySelector('img').src = 'ui/' + PW_IMG[nome] + '.webp';
      poe($('pw-' + q + '-rot'), t(PW_ROT[nome]));
    });
    desenhaCoracoes(false);
    atualizaHud();
    encaixa($('tela-jogo'));
  }
  function desenhaCoracoes(perdeuUm) {
    const box = $('coracoes'); box.innerHTML = '';
    box.classList.toggle('muitos', S.coracoesMax > 3); // (corações da loja: menores para caber)
    for (let k = 0; k < S.coracoesMax; k++) {
      const im = document.createElement('img');
      im.src = 'ui/' + (k < S.coracoes ? 'coracao' : 'coracao-vazio') + '.webp';
      if (perdeuUm && k === S.coracoes) im.className = 'perdeu';
      box.appendChild(im);
    }
  }
  // o HUD roda a cada quadro: só escreve no DOM o que mudou (escrever igual também custa layout)
  const cacheHud = {};
  function escreve(chave, el, prop, valor) { if (cacheHud[chave] === valor) return; cacheHud[chave] = valor; if (prop === 'txt') el.textContent = valor; else if (prop === 'cls') el.className = valor; else el.style[prop] = valor; }
  let bombaAtiva = false;
  function atualizaHud() {
    if (modo === 'rush') {
      escreve('dig', document.querySelector('#hud-tempo .dig'), 'txt', mmss(S.resta));
      const f = Math.max(0, Math.min(1, S.resta / S.limite));
      const fill = $('barra-fill');
      escreve('bw', fill, 'width', (Math.round(f * 1000) / 10) + '%');
      const parado = S.relogioParado();
      escreve('bc', fill, 'cls', parado ? 'gelo' : f > .5 ? '' : f > .2 ? 'amarela' : 'vermelha');
      $('hud-tempo').classList.toggle('gelado', parado);
      const vivo = S.iniciou && !parado && S.ativo();
      const urg = vivo && S.resta <= 10;
      // últimos segundos: o relógio vira BOMBA (números vermelhos, pavio aceso, bipe por segundo)
      const bomba = vivo && S.resta <= cfg.bomba_seg && S.resta > 0;
      if (bomba !== bombaAtiva) { bombaAtiva = bomba; $('hud-tempo').classList.toggle('bomba', bomba); Som.pavio(bomba); }
      $('barra').classList.toggle('urgente', bomba);
      $('laser-luz').classList.toggle('urgente', urg);
      $('tela-jogo').classList.toggle('urgente', urg);
      if (urg) {
        const seg = Math.ceil(S.resta);
        if (seg !== ultimoSegundo) {
          ultimoSegundo = seg;
          if (bomba) { Som.toca('bip', seg); vibra(18, 110); } else Som.toca('tique', 0);
        }
      }
      if (bomba && Math.random() < .5) FX.jato(352, 58, 1, { tipo: 'brilho', cores: ['#fff3a0', '#ff9a2a'], vel: 260, g: 500, vida: .35, tam: 9 });
      // velocidade do relógio: cada erro acelera, o FEVER volta ao normal
      const acel = S.vel > 1.001;
      escreve('vel', $('vel'), 'txt', acel ? '⏱ x' + (Math.round(S.vel * 100) / 100) : '');
      $('vel').classList.toggle('on', acel);
    } else escreve('rel', $('hud-relogio'), 'txt', relogio(S.tempoFase()));
    ['a', 'b', 'c'].forEach(q => {
      const b = $('pw-' + q), nome = b.dataset.pw, n = P.d.estoque[nome] || 0;
      const c = b.querySelector('.cont');
      escreve('pw' + q, c, 'txt', String(n > 0 ? n : '+')); c.classList.toggle('mais', n <= 0);
      const salvando = S.estado === 'salvavel' && nome === 'desfazer';
      let pode = S.ativo() || salvando;
      if (nome === 'desfazer') pode = pode && S.podeDesfazer();
      if (nome === 'gelo') pode = pode && S.gelo <= 0;
      if (nome === 'raio') pode = pode && S.raio <= 0;
      b.classList.toggle('apagado', !pode && n > 0);
      b.classList.toggle('ativo', (nome === 'bomba' && mira) || salvando);
    });
    // barra do FEVER (só no Rush): mostra quanto falta para o relógio congelar
    if (modo === 'rush') {
      const f = S.fever > 0 ? S.fever / cfg.fever_seg : S.poder / cfg.poder_max;
      escreve('fv', $('fever-fill'), 'width', (Math.round(Math.max(0, Math.min(1, f)) * 1000) / 10) + '%');
      escreve('fvc', $('fever-barra'), 'cls', 'a topo' + (S.fever > 0 ? ' cheia' : ''));
    }
  }

  // ---------- fogo da sequência de acertos (pedido do dono) ----------
  // Nível 1 (combo 4+): o tabuleiro esquenta. 2 (combo 7+): chamas na moldura. 3 (combo 10+ ou
  // FEVER): tabuleiro pegando fogo, brasas subindo. Errou: apaga na hora, com fumaça e chiado.
  // O fogo fica na MOLDURA e acima do tabuleiro: nunca por cima das peças (GDD: não esconder o jogo).
  let calor = 0, apagar = false, acumFogo = 0;
  function nivelCalor() {
    if (!S || !S.ativo()) return 0;
    if (S.fever > 0) return 3;
    const c = S.combo;
    return c >= 10 ? 3 : c >= 7 ? 2 : c >= 4 ? 1 : 0;
  }
  function apagaCalor() {
    const tj = $('tela-jogo'); tj.classList.remove('calor1', 'calor2', 'calor3');
    Som.fogo(0);
  }
  function mudaCalor(n) {
    const antes = calor;
    calor = n;
    const tj = $('tela-jogo');
    tj.classList.remove('calor1', 'calor2', 'calor3');
    if (n) tj.classList.add('calor' + n);
    Som.fogo(n);
    if (n === 0 && antes >= 1 && apagar) {
      // extinção: fumaça na moldura + chiado
      Som.toca('apaga');
      for (let k = 0; k < 26; k++) { const [x, y] = pontoBorda(); FX.fumaca(x, y); }
    }
    if (n > antes && n >= 2) { Som.toca('estalo'); vibra(12, 70); }
    apagar = false;
  }
  function pontoBorda(soCimaELados) {
    const w = S.c.w * 100, h = S.c.h * 100, fora = 26;
    const per = soCimaELados ? w + 2 * h : 2 * w + 2 * h;
    let r = Math.random() * per;
    if (r < w) return projeta(r, -fora);
    r -= w;
    if (r < h) return projeta(-fora, r);
    r -= h;
    if (r < h) return projeta(w + fora, r);
    r -= h;
    return projeta(r, h + fora);
  }
  function emiteFogo(dt) {
    if (calor < 1 || !S) return;
    acumFogo += [0, 14, 70, 130][calor] * dt;
    while (acumFogo >= 1) {
      acumFogo--;
      const [x, y] = pontoBorda(true);
      if (calor === 1) FX.jato(x, y, 1, { tipo: 'brilho', cores: ['#ffd23a', '#ff8a1a'], vel: 160, g: -300, vida: .8, tam: 9, abre: 1, ang: -Math.PI / 2 });
      else FX.chama(x, y, calor === 3 ? 1.35 : .8);
    }
    // brasas subindo pela tela no nível máximo
    if (calor === 3 && Math.random() < dt * 14) {
      const [x, y] = projeta(Math.random() * S.c.w * 100, S.c.h * 100 * Math.random());
      FX.jato(x, y, 1, { tipo: 'brilho', cores: ['#ffb13a', '#ff5a1a', '#fff0a0'], vel: 90, g: -320, vida: 1.1, tam: 6, abre: .6, ang: -Math.PI / 2 });
    }
    if (calor >= 2 && Math.random() < dt * 3) Som.toca('estalo');
  }

  // ================= chefe =================
  // O chefe fica atrás do tabuleiro (a arte dele recortada da tela do dono), respira, brilha quando
  // vai atacar, se contorce quando leva dano e fala: provoca no começo, no ataque, quando o jogador
  // erra, quando perde metade da vida, quando está quase caindo, e quando vence ou perde.
  let falaT = 0, falaDesde = 0, provocaT = 0;
  function montaChefe() {
    const ch = $('chefe'), hud = $('chefe-hud');
    paraFalas();
    if (!chefeNaTela()) { ch.style.display = 'none'; hud.style.display = 'none'; return; }
    // (na cena especial sem luta, o chefe da data aparece e fala, mas não tem barra de vida)
    const A = cena(), sp = A.sprite, nomeChefe = chefeTxt(A.chefe).nome;
    ch.style.display = ''; hud.style.display = S.chefe ? '' : 'none'; hud.classList.remove('bateu', 'furia');
    ch.className = 'a centro' + (sp.grande ? ' grande' : '') + (sp.cartaz ? ' cartaz' : '');
    ch.dataset.arena = A.id;
    ch.style.left = sp.x + 'px'; ch.style.setProperty('--y', sp.y); ch.style.width = sp.w + 'px';
    ch.querySelector('img').src = sp.src;
    const nc = $('chefe-cartaz-nome');
    nc.style.display = sp.cartaz ? '' : 'none';
    if (sp.cartaz) nc.innerHTML = `<div><span class="dest">${esc(t('boss'))}</span><br>${esc(nomeChefe)}</div>`;
    poe(hud.querySelector('.nome'), nomeChefe);
    atualizaVidaChefe();
    falaDesde = performance.now();
    falaT = setTimeout(() => fala('inicio'), 900);
    provocaT = setInterval(() => { if (S && S.ativo() && !pausado && performance.now() - falaDesde > 9000) fala('provoca'); }, 2500);
  }
  function atualizaVidaChefe() {
    if (!S || !S.chefe) return;
    const f = S.chefe.hp / S.chefe.hpMax;
    $('chefe-vida').style.width = (Math.round(f * 1000) / 10) + '%';
    $('chefe-hud').classList.toggle('furia', S.enfurecido());
  }
  function fala(tipo) {
    if (!chefeNaTela()) return;
    const falas = chefeTxt(cena().chefe)[tipo];
    if (!falas || !falas.length) return;
    falaDesde = performance.now();
    const el = $('fala');
    mostraBalao(el, cena().balaoLuta, sorteia(falas));
    clearTimeout(falaT);
    falaT = setTimeout(() => el.classList.remove('on'), 2600);
  }
  function paraFalas() { clearTimeout(falaT); clearInterval(provocaT); const el = $('fala'); if (el) el.classList.remove('on'); }
  function animaChefe(cls, ms) {
    const ch = $('chefe'); ch.classList.remove(cls); void ch.offsetWidth; ch.classList.add(cls);
    if (ms) setTimeout(() => ch.classList.remove(cls), ms);
  }
  // ponto de onde saem os ataques (mão, boca, cajado) no palco
  function origemChefe() { const o = cena().origem; return [o[0], Jogo.oc + o[1]]; }
  // efeito que termina depois (projétil, faísca): só vale se o jogador ainda está na MESMA partida
  function mesmaPartida() { const s = S; return () => S === s && tela === 'jogo'; }
  // um projétil (imagem) voa do chefe até a casa i, em arco
  function projetil(img, i, filtro, dur, atraso, aoChegar) {
    const [x0, y0] = origemChefe(), [x1, y1] = centroCasa(i);
    const el = document.createElement('img'); el.src = 'ui/' + img + '.webp'; el.className = 'projetil';
    if (filtro) el.style.filter = filtro;
    $('tela-jogo').appendChild(el);
    const alto = Math.min(y0, y1) - 160, vale = mesmaPartida();
    el.animate([
      { transform: `translate(${x0 - 40}px,${y0 - 40}px) scale(.4) rotate(0deg)`, opacity: .2 },
      { transform: `translate(${(x0 + x1) / 2 - 40}px,${alto}px) scale(1) rotate(200deg)`, opacity: 1, offset: .5 },
      { transform: `translate(${x1 - 40}px,${y1 - 40}px) scale(.9) rotate(400deg)`, opacity: 1 },
    ], { duration: dur, delay: atraso, easing: 'cubic-bezier(.3,.1,.6,1)', fill: 'backwards' }).onfinish = () => { el.remove(); if (aoChegar && vale()) aoChegar(x1, y1); };
  }
  // O ataque vale NA HORA (a regra já mudou o tabuleiro): a pedra aparece como sombra na casa e
  // firma quando o projétil chega; o gelo e as peças falsas aparecem na hora. Assim nada fica
  // bloqueando "de invisível" enquanto o efeito voa.
  function ataqueChefe(e) {
    animaChefe('ataca', 500);
    $('chefe').classList.remove('carrega');
    const g = e.golpe, tb = $('tabuleiro');
    Som.toca(g === 'gelo' ? 'gelo' : g === 'ilusao' ? 'raio' : 'explode');
    vibra(50, 160);
    e.casas.forEach((i, n) => {
      const p = S.c[i];
      if (g === 'gelo') {
        const el = pecas[i]; if (el && p && p.gelo > 0) el.classList.add('congelada');
        projetil('estilhaco-gelo', i, '', 380, n * 120, (x, y) => FX.jato(x, y, 12, { tipo: 'gelo', cores: ['#e8f8ff', '#9fdcff', '#fff'], vel: 380, g: 700, vida: .6, tam: 7 }));
        return;
      }
      if (!p || (p.k !== 't' && p.k !== 'f')) return;
      if (pecas[i]) pecas[i].remove();
      const el = pecaEl(i, p); tb.appendChild(el); pecas[i] = el;
      if (p.k === 'f') { // ilusão: peça falsa surge num brilho
        el.animate([{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'scale(1.15)', offset: .7 }, { transform: 'scale(1)' }], { duration: 420 });
        const [x, y] = centroCasa(i);
        FX.jato(x, y, 16, { tipo: 'brilho', cores: ['#fff6c0', '#ffd23a', '#fff'], vel: 360, g: 0, vida: .7, tam: 12 });
        return;
      }
      const lava = p.estilo !== 'areia';
      el.classList.add('chegando');
      projetil('bloco-x', i, lava ? 'sepia(.6) saturate(2.4) hue-rotate(-25deg) brightness(1.2)' : 'sepia(1) saturate(1.3) brightness(1.25)', 520, n * 140, (x, y) => {
        el.classList.remove('chegando');
        el.animate([{ transform: 'scale(1.5)', opacity: .4 }, { transform: 'scale(.9)', opacity: 1, offset: .6 }, { transform: 'scale(1)' }], { duration: 260 });
        FX.jato(x, y, 14, lava ? { tipo: 'pedra', cores: ['#3a2a28', '#6a3a28', '#ff6a1a'], vel: 520, g: 1300, vida: .7, tam: 10 } : { cores: ['#e8c47a', '#c89a4a', '#fff0c0'], vel: 420, g: 900, vida: .8, tam: 7 });
        treme();
      });
    });
  }
  // RAIO aceso: seta que deixou de estar livre (pedra ou gelo do chefe no caminho) para de brilhar.
  // Brilhando, o jogador tocava nela confiando no RAIO (que ele pagou) e perdia um coração.
  // Roda a cada quadro só enquanto o RAIO dura: vale para qualquer mudança no tabuleiro.
  function apagaRaioBloqueado() {
    for (let i = 0; i < pecas.length; i++) { const el = pecas[i]; if (el && el.classList.contains('acesa') && !Motor.livre(S.c, i)) el.classList.remove('acesa'); }
  }
  function preparaOnda() {
    const s = S, faz = () => { if (S === s && s.ativo()) s.preparaOnda(); };
    if (window.requestIdleCallback) requestIdleCallback(faz, { timeout: 4000 }); else setTimeout(faz, 1500);
  }
  // pedra que vai sumir e gelo que vai derreter piscam no último segundo e meio
  function marcaAcabando() {
    for (let i = 0; i < S.c.length; i++) {
      const p = S.c[i], el = pecas[i]; if (!p || !el) continue;
      const resta = p.k === 't' ? p.ate : p.gelo > 0 ? p.gelo : -1;
      if (resta >= 0) el.classList.toggle('acabando', resta < 1.5);
    }
  }

  // ---------- laço ----------
  // Só roda com a fase EM ANDAMENTO: pausada, atrás de uma janela ou já encerrada, ele para (não
  // gasta bateria desenhando a mesma tela). garanteLaco() religa quando a fase volta.
  // (balão do tutorial esperando o ENTENDI também para o jogo: ninguém perde tempo lendo)
  function lacoPodeRodar() { return tela === 'jogo' && S && !pausado && !tutParado && !fimTratado && (S.ativo() || S.estado === 'salvavel'); }
  function quadro(agora) {
    if (!lacoPodeRodar()) { rodando = false; return; }
    const dt = Math.min(0.1, (agora - ultimoQuadro) / 1000); ultimoQuadro = agora;
    S.tick(dt); trataEventos(); atualizaHud();
    if (S.chefe) marcaAcabando();
    if (S.raio > 0) apagaRaioBloqueado();
    const n = nivelCalor(); if (n !== calor) mudaCalor(n);
    emiteFogo(dt);
    requestAnimationFrame(quadro);
  }
  function garanteLaco() { if (!rodando && lacoPodeRodar()) { rodando = true; ultimoQuadro = performance.now(); requestAnimationFrame(quadro); } }
  function retomaJogo() { pausado = false; Musica.bloqueia('pausa', false); garanteLaco(); }

  function aviso(txt) {
    const a = $('aviso'); a.textContent = txt; a.classList.remove('mostra'); void a.offsetWidth; a.classList.add('mostra');
    encaixa(a.parentNode);
  }
  function flutua(txt, cor, x, y, ancora) {
    const f = document.createElement('div');
    f.className = 'flutua a ' + (ancora || 'topo') + ' ol'; f.textContent = txt; f.style.color = cor;
    f.style.left = x + 'px'; f.style.setProperty('--y', y);
    $('tela-jogo').appendChild(f); setTimeout(() => f.remove(), 950);
  }
  function treme(forte) { const tb = $('tabuleiro').parentNode; tb.classList.remove('tremer', 'tremer-forte'); void tb.offsetWidth; tb.classList.add(forte ? 'tremer-forte' : 'tremer'); }
  function clarao(cor) { const f = $('flash'); f.style.background = cor || '#fff'; f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }

  function trataEventos() {
    // fase começada de verdade (1ª jogada; mesmo critério do "sair gasta energia"): marca no save. Se
    // o app for FECHADO no meio, a energia é cobrada na próxima abertura — senão fechar escaparia da derrota
    // (o desafio não gasta energia: não marca)
    if (!desafio && !S.marcada && S.t0 != null && S.ativo()) { S.marcada = true; P.d.emJogo = { modo, k: faseK }; P.salva(); }
    for (const e of S.consome()) {
      switch (e.tipo) {
        case 'inicio': break;
        case 'salvavel':
          // última chance: o DESFAZER pisca e o relógio espera
          Som.toca('bate'); vibra(40, 140);
          aviso(t('salvar'));
          break;
        case 'sai': animaSaida(e); if (tut && tut.passos[tut.i].espera === 'toque' && $('tut').classList.contains('on')) avancaTutorial(); break;
        case 'combo': mostraCombo(e.n); break;
        case 'combo-fim': $('combo').classList.remove('on'); if (e.erro) apagar = true; break;
        case 'bonus': Som.toca('bonus'); flutua('+' + e.s + 's', '#7dff6a', 560, 150); break;
        case 'fever': {
          Som.toca('fever'); vibra(60, 160); aviso(t('fever'));
          $('tela-jogo').classList.add('fever');
          if (e.acalmou) flutua('⏱ x1', '#7dff6a', 690, 80);
          const [x, y] = projeta(S.c.w * 50, S.c.h * 50); FX.jato(x, y, 70, { cores: ['#ffe14a', '#ff9a2a', '#fff'], vel: 900, g: 400, vida: 1.1, tam: 14, tipo: 'brilho' });
          break;
        }
        case 'fever-fim': $('tela-jogo').classList.remove('fever'); break;
        case 'bate': animaBatida(e); if (chefeNaTela() && !e.gratis && Math.random() < .6) fala('erro'); break;
        case 'falsa': animaFalsa(e); if (chefeNaTela() && !e.gratis && Math.random() < .6) fala('erro'); break;
        case 'pedra': { const el = pecas[e.i]; if (el) el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 180 }); Som.toca('pedra'); break; }
        case 'congelada': {
          const el = pecas[e.i]; if (el) el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 160 });
          Som.toca('pedra'); flutua(t('congelada'), '#bfeaff', 380, 330, 'centro');
          break;
        }
        case 'desfeito':
          Som.toca('desfaz');
          if (e.era === 'tempo') flutua('+' + (Math.round(e.valor * 10) / 10) + 's', '#7dff6a', 560, 150);
          if (e.era === 'coracao') desenhaCoracoes(false);
          break;
        case 'explode': animaExplosao(e); break;
        case 'gelo': {
          Som.toca('gelo'); vibra(30, 90); aviso(t('gelo_ativo'));
          $('tela-jogo').classList.add('gelado');
          const g = document.createElement('img'); g.src = 'ui/estilhaco-gelo.webp'; g.className = 'boom a topo';
          g.style.left = '330px'; g.style.setProperty('--y', 0); g.style.width = '200px';
          $('tela-jogo').appendChild(g);
          g.animate([{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(1.1)', opacity: 1, offset: .4 }, { transform: 'scale(1.3)', opacity: 0 }], { duration: 800, easing: 'ease-out' }).onfinish = () => g.remove();
          FX.jato(470, 90, 26, { tipo: 'gelo', cores: ['#dff8ff', '#8fe1ff', '#4ab8ff'], vel: 500, g: 700, vida: .9, tam: 9 });
          break;
        }
        case 'gelo-fim': $('tela-jogo').classList.remove('gelado'); break;
        case 'raio': {
          Som.toca('raio'); vibra(25, 80);
          for (const i of e.livres) if (pecas[i]) pecas[i].classList.add('acesa');
          break;
        }
        case 'raio-fim': pecas.forEach(p => p && p.classList.remove('acesa')); break;
        // ---- chefe ----
        case 'dano': {
          atualizaVidaChefe();
          animaChefe('dor', 320);
          // o tremor da barra sai sozinho: se a classe ficasse, tremia de novo na próxima luta
          const hud = $('chefe-hud'); hud.classList.remove('bateu'); void hud.offsetWidth; hud.classList.add('bateu');
          setTimeout(() => hud.classList.remove('bateu'), 320);
          flutua('-' + e.v, '#ff5a4a', 600 + Math.random() * 60, 120);
          break;
        }
        case 'carrega': $('chefe').classList.add('carrega'); fala('ataque'); Som.toca('carrega'); break;
        case 'ataque': ataqueChefe(e); break;
        case 'some': { // a pedra do chefe se desfaz (a casa já está livre)
          const el = pecas[e.i]; pecas[e.i] = null;
          const [x, y] = centroCasa(e.i);
          FX.jato(x, y, 12, e.estilo === 'areia' ? { cores: ['#e8c47a', '#c89a4a'], vel: 300, g: 800, vida: .7, tam: 7 } : { tipo: 'pedra', cores: ['#6a4a40', '#3a2a28', '#ff8a3a'], vel: 300, g: 800, vida: .6, tam: 8 });
          if (el) { el.classList.remove('acabando'); el.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.3)', opacity: 0 }], { duration: 320 }).onfinish = () => el.remove(); }
          break;
        }
        case 'degelo': {
          const el = pecas[e.i]; if (el) el.classList.remove('congelada', 'acabando');
          const [x, y] = centroCasa(e.i);
          FX.jato(x, y, 10, { tipo: 'gelo', cores: ['#e8f8ff', '#9fdcff'], vel: 300, g: 700, vida: .5, tam: 6 });
          Som.toca('vidro');
          break;
        }
        case 'chefe-metade': fala('metade'); break;
        case 'chefe-quase': fala('quase'); animaChefe('furia', 900); break;
        // o tabuleiro acabou e o chefe final continua de pé: cai uma onda nova de setas
        case 'onda': {
          $('chefe').classList.remove('carrega');
          // o que ainda voava da onda anterior não cai no tabuleiro novo
          document.querySelectorAll('#tela-jogo .projetil').forEach(el => { el.getAnimations().forEach(a => a.cancel()); el.remove(); });
          aviso(t('onda')); fala('onda'); Som.toca('fever'); vibra(60, 160); clarao('#fff6d0');
          // a última seta termina de sair antes de o tabuleiro trocar (e ninguém toca nesse meio)
          trocandoOnda = true;
          const s = S;
          setTimeout(() => {
            trocandoOnda = false;
            if (S !== s || tela !== 'jogo') return;
            montaTabuleiro();
            // RAIO ainda aceso: acende as setas livres da onda nova (senão a carga paga se perdia)
            if (S.raio > 0) for (const i of Motor.livres(S.c)) if (pecas[i]) pecas[i].classList.add('acesa');
            if (S.chefe && S.chefe.onda < S.chefe.ondas) preparaOnda();
          }, 380);
          break;
        }
        case 'fim':
          // perdeu: a energia sai NA HORA (fechar o app durante a explosão não pode escapar);
          // venceu: a vitória é gravada NA HORA (a janela vem depois da animação)
          if (e.motivo !== 'vitoria') cobraDerrota(); else premio = guardaVitoria();
          if (S.chefe) {
            if (e.motivo === 'vitoria') { chefeCai(); setTimeout(fimDeFase, 1900); }
            else { fala('vence'); setTimeout(fimDeFase, 1100); }
          }
          else {
            // o chefe da data que só assistia também reage (lamenta a vitória, comemora a derrota),
            // e a janela espera a fala ser lida (como na luta)
            const assiste = !!especialAtual();
            if (assiste) fala(e.motivo === 'vitoria' ? 'derrota' : 'vence');
            if (e.motivo === 'tempo') { explodeTudo(); setTimeout(fimDeFase, 1150); }
            else setTimeout(fimDeFase, assiste ? 1100 : e.motivo === 'vitoria' ? 650 : 450);
          }
          break;
      }
    }
  }
  // o chefe caiu: ele treme, brilha, some; as setas que sobraram voam para fora
  function chefeCai() {
    paraFalas();
    fala('derrota');
    clearInterval(provocaT);
    $('chefe').classList.remove('carrega');
    animaChefe('derrota');
    Som.toca('boom'); vibra(160, 255); clarao('#fff6d0'); treme(true);
    const [ox, oy] = origemChefe();
    FX.jato(ox, oy, 90, { cores: ['#fff6c0', '#ffd23a', '#ff8a1a', '#fff'], vel: 1200, g: 600, vida: 1.4, tam: 14, tipo: 'brilho' });
    const w = S.c.w, h = S.c.h;
    pecas.forEach((el, i) => {
      if (!el) return;
      const u = (i % w) * 100 + 50 - w * 50, v = Math.floor(i / w) * 100 + 50 - h * 50, d = Math.hypot(u, v) || 1;
      el.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${u / d * 900}px,${v / d * 900}px) scale(1.2) rotate(${(Math.random() - .5) * 360}deg)`, opacity: 0 }],
        { duration: 900, delay: 300 + Math.random() * 300, easing: 'ease-in', fill: 'forwards' });
    });
  }

  function mostraCombo(n) {
    const c = $('combo');
    poe(c.querySelector('.c2'), 'x' + n);
    c.classList.add('on'); c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    if (n % cfg.combo_passo === 0) Som.toca('combo', n);
  }

  function animaSaida(e) {
    const el = pecas[e.i]; pecas[e.i] = null;
    Som.toca('sai', e.combo); vibra(8, 50);
    if (!el) return;
    el.removeAttribute('data-i'); el.style.pointerEvents = 'none';
    const w = S.c.w, h = S.c.h, col = e.i % w, lin = Math.floor(e.i / w);
    const passos = [lin, w - 1 - col, h - 1 - lin, col][e.d] + 3.2;
    const dx = Motor.DX[e.d] * passos * 100, dy = Motor.DY[e.d] * passos * 100;
    el.style.zIndex = 5;
    const dur = 300 + passos * 32;
    el.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx * .25}px,${dy * .25}px) scale(1.08)`, opacity: 1, offset: .25 }, { transform: `translate(${dx}px,${dy}px) scale(.9)`, opacity: 0 }],
      { duration: dur, easing: 'cubic-bezier(.45,0,.85,.5)' }).onfinish = () => el.remove();
    // peças falsas no caminho tremem quando a seta passa através delas (ensina que são falsas)
    Motor.caminho(S.c, e.i, e.d).forEach((j, n) => {
      if (S.c[j] && S.c[j].k === 'f' && pecas[j]) pecas[j].animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: .25, transform: 'scale(1.12)', offset: .4 }, { opacity: 1, transform: 'scale(1)' }], { duration: 300, delay: 40 + n * 40 });
    });
    // rastro de luz pelo caminho (mais quente com o tabuleiro pegando fogo)
    const r = document.createElement('img');
    r.src = 'ui/' + (calor >= 2 ? 'rastro-vermelho' : RASTRO[e.d][e.cor]) + '.webp'; r.className = 'rastro';
    const comp = (passos - 2.2) * 100 + 60;
    r.style.width = '64px'; r.style.height = comp + 'px';
    r.style.left = (col * 100 + 18) + 'px'; r.style.top = (lin * 100 + 50 - comp) + 'px';
    r.style.transformOrigin = '50% ' + comp + 'px';
    r.style.transform = `rotate(${e.d * 90}deg)`;
    if (calor < 2 && RASTRO_FILTRO[e.d][e.cor]) r.style.filter = RASTRO_FILTRO[e.d][e.cor];
    $('tabuleiro').appendChild(r);
    r.animate([{ opacity: 0 }, { opacity: 1, offset: .2 }, { opacity: 0 }], { duration: 520 }).onfinish = () => r.remove();
    const [x, y] = centroCasa(e.i);
    FX.jato(x, y, 12, { cores: calor >= 2 ? ['#ffd23a', '#ff6a1a', '#fff'] : [COR[e.d][e.cor], '#fff'], vel: 420, g: 600, vida: .55, tam: 11 });
    if (calor >= 2) for (let k = 0; k < 4; k++) FX.chama(x, y, .5);
    // no chefe, cada seta que sai vira um golpe: uma faísca voa da casa até ele
    if (S.chefe) {
      const [ox, oy] = origemChefe(), vale = mesmaPartida();
      const f = document.createElement('div'); f.className = 'golpe';
      $('tela-jogo').appendChild(f);
      f.animate([{ transform: `translate(${x}px,${y}px) scale(.6)`, opacity: 1 }, { transform: `translate(${ox}px,${oy}px) scale(1.3)`, opacity: .9 }], { duration: 380, easing: 'ease-in' }).onfinish = () => {
        f.remove(); if (vale()) FX.jato(ox, oy, 8, { cores: [COR[e.d][e.cor], '#fff'], vel: 380, g: 300, vida: .45, tam: 9, tipo: 'brilho' });
      };
    }
  }

  function feedbackErro(e) {
    Som.toca('bate'); vibra(e.gratis ? 15 : 45, e.gratis ? 60 : 150);
    if (!e.gratis) {
      treme();
      if (e.pen) flutua('-' + e.pen + 's', '#ff5a4a', 560, 150);
      if (e.coracao) desenhaCoracoes(true);
      if (e.vel > 1) { const v = $('vel'); v.classList.remove('pula'); void v.offsetWidth; v.classList.add('pula'); }
    }
  }
  function animaBatida(e) {
    feedbackErro(e);
    const el = pecas[e.i];
    if (!el) return;
    const w = S.c.w, ci = e.i % w, li = Math.floor(e.i / w), cb = e.b % w, lb = Math.floor(e.b / w);
    const dist = Math.abs(ci - cb) + Math.abs(li - lb);
    const avanco = (dist - 1) * 100 + 24;
    const d = S.c[e.i] ? S.c[e.i].d : 0;
    const dx = Motor.DX[d] * avanco, dy = Motor.DY[d] * avanco;
    el.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${dx}px,${dy}px)`, offset: .45 }, { transform: 'translate(0,0)' }],
      { duration: 170 + dist * 45, easing: 'ease-in-out' });
    const bl = pecas[e.b];
    if (bl) { bl.classList.remove('bateu'); void bl.offsetWidth; bl.classList.add('bateu'); }
  }
  // peça falsa tocada: quebra como vidro e vira um fantasma (não aceita mais toque)
  function animaFalsa(e) {
    feedbackErro(e);
    Som.toca('vidro');
    const el = pecas[e.i];
    if (el) {
      el.classList.add('revelada');
      el.animate([{ transform: 'scale(1)', filter: 'brightness(2)' }, { transform: 'scale(1.18) rotate(-4deg)', filter: 'brightness(1.4)', offset: .3 }, { transform: 'scale(1)', filter: 'none' }], { duration: 380 });
    }
    const [x, y] = centroCasa(e.i);
    FX.jato(x, y, 18, { tipo: 'gelo', cores: ['#e8f6ff', '#9fd8ff', '#ffffff'], vel: 520, g: 900, vida: .7, tam: 8, giro: 16 });
    flutua(t('falsa'), '#bfe6ff', 360, 330, 'centro');
  }

  function animaExplosao(e) {
    Som.toca('explode'); vibra(90, 220); treme();
    const [x, y] = centroCasa(e.i);
    const b = document.createElement('img'); b.src = 'ui/explosao.webp'; b.className = 'boom';
    b.style.left = (x - 190) + 'px'; b.style.top = (y - 130) + 'px'; b.style.width = '380px';
    $('tela-jogo').appendChild(b);
    b.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(1.05)', opacity: 1, offset: .35 }, { transform: 'scale(1.25)', opacity: 0 }], { duration: 650, easing: 'ease-out' }).onfinish = () => b.remove();
    FX.jato(x, y, 22, { tipo: 'pedra', cores: ['#3a3440', '#5a5260', '#2a2530'], vel: 950, g: 1500, vida: 1, tam: 16, giro: 14 });
    FX.jato(x, y, 30, { cores: ['#ffe14a', '#ff8a1a', '#fff'], vel: 700, g: 500, vida: .6, tam: 10 });
    for (const f of e.foram) {
      const el = pecas[f.i]; pecas[f.i] = null;
      if (!el) continue;
      el.style.pointerEvents = 'none'; el.removeAttribute('data-i');
      el.animate([{ transform: 'scale(1) rotate(0)', opacity: 1 }, { transform: `scale(.2) rotate(${Math.random() > .5 ? 90 : -90}deg)`, opacity: 0 }], { duration: 380, easing: 'ease-in' }).onfinish = () => el.remove();
    }
  }

  // Tempo esgotado: a bomba estoura e o tabuleiro voa pelos ares antes do TEMPO ESGOTADO.
  let explodiu = false;
  function explodeTudo() {
    if (explodiu) return; explodiu = true;
    Som.pavio(false); Som.fogo(0); Som.toca('boom'); vibra(140, 255);
    treme(true); clarao('#ffb040');
    const w = S.c.w, h = S.c.h, [cx, cy] = projeta(w * 50, h * 50);
    const b = document.createElement('img'); b.src = 'ui/explosao.webp'; b.className = 'boom';
    b.style.left = (cx - 380) + 'px'; b.style.top = (cy - 260) + 'px'; b.style.width = '760px';
    $('tela-jogo').appendChild(b);
    b.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(1.1)', opacity: 1, offset: .3 }, { transform: 'scale(1.4)', opacity: 0 }], { duration: 900, easing: 'ease-out' }).onfinish = () => b.remove();
    FX.jato(cx, cy, 70, { cores: ['#ffe14a', '#ff6a1a', '#fff', '#ff3a1a'], vel: 1300, g: 700, vida: 1.2, tam: 14 });
    FX.jato(cx, cy, 30, { tipo: 'pedra', cores: ['#3a3440', '#5a5260', '#2a2530'], vel: 1200, g: 1500, vida: 1.3, tam: 18, giro: 14 });
    for (let k = 0; k < 40; k++) { const [x, y] = pontoBorda(); FX.chama(x, y, 1); }
    pecas.forEach((el, i) => {
      if (!el) return;
      const u = (i % w) * 100 + 50 - w * 50, v = Math.floor(i / w) * 100 + 50 - h * 50, d = Math.hypot(u, v) || 1;
      const alc = 700 + Math.random() * 500, rot = (Math.random() - .5) * 540;
      el.style.pointerEvents = 'none';
      el.animate([{ transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 }, { transform: `translate(${u / d * alc}px,${v / d * alc}px) rotate(${rot}deg) scale(1.3)`, opacity: 0 }],
        { duration: 750 + Math.random() * 300, delay: Math.random() * 80, easing: 'cubic-bezier(.2,.7,.4,1)', fill: 'forwards' });
    });
  }

  // ---------- toques no tabuleiro ----------
  function tocaTabuleiro(ev) {
    if (!S || pausado || tutParado || trocandoOnda || !S.ativo()) return;
    const alvo = ev.target.closest('[data-i]'); if (!alvo) return;
    const i = +alvo.dataset.i;
    Som.destrava();
    if (mira) {
      mira = false; $('tabuleiro').classList.remove('mira');
      usaItem('bomba'); P.salva();
      S.bomba(i); trataEventos(); atualizaHud();
      return;
    }
    S.toca(i); trataEventos(); atualizaHud();
  }

  // ---------- power-ups ----------
  function usaPw(nome) {
    if (!S || pausado || tutParado) return;
    // na "última chance" (erro fatal esperando o DESFAZER) só o DESFAZER funciona
    if (!S.ativo() && !(nome === 'desfazer' && S.estado === 'salvavel')) return;
    const n = P.d.estoque[nome] || 0;
    if (n <= 0) return abreCompra(nome);
    if (nome === 'desfazer') {
      if (!S.podeDesfazer()) return toast(t('so_apos_erro'));
      S.desfazer(); usaItem('desfazer');
    } else if (nome === 'bomba') {
      mira = !mira; $('tabuleiro').classList.toggle('mira', mira);
      if (mira) toast(t('toque_bomba'));
    } else if (nome === 'gelo') {
      if (S.gelo > 0) return;
      S.congela(); usaItem('gelo');
    } else if (nome === 'raio') {
      if (S.raio > 0) return; // toque duplo não gasta a segunda carga
      S.acendeRaio(); usaItem('raio');
    }
    P.salva(); trataEventos(); atualizaHud();
  }

  // ---------- fim de fase ----------
  function registra(res) {
    // tempo de JOGO do 1º toque ao fim, medido igual nos dois modos (sem pausas nem animação final)
    const dur = S.duracao();
    // (o desafio fica fora das contas de Rush x Classic dos "dados do teste": modo 'desafio')
    const rec = {
      modo: desafio ? 'desafio' : modo, k: faseK, fase: faseK + 1, res, dur: +dur.toFixed(1), limite: S.limite, base: faseObj.t || 0, resta: +S.resta.toFixed(1),
      restantes: S.restantes, total: S.total, erros: S.erros, combo: S.maxCombo, fevers: S.fevers, bonus: S.bonus,
      vel: +S.vel.toFixed(2), ritmo: +(P.d.ritmo || 1).toFixed(2), usos: Object.assign({}, S.usos), t: Date.now(),
    };
    if (desafio) { rec.tipo = desafio.tipo; rec.id = desafio.id; }
    else if (modo === 'classic') { rec.arena = arenaJogo + 1; if (S.chefe) rec.chefeVida = S.chefe.hp; }
    P.registra(rec);
    return rec;
  }
  // energia de uma derrota: uma vez só por partida, não importa por onde ela chegue
  function cobraDerrota() {
    if (!S || S.energiaCobrada || desafio) return; // o desafio não gasta energia
    S.energiaCobrada = true; P.d.emJogo = null; P.gastaEnergia(cfg); atualizaEnergia();
  }
  // Vitória gravada NA HORA em que acontece (estrelas, moedas, diamantes do chefe): a janela só
  // aparece depois da animação (1,9 s no chefe), e fechar o app nesse meio perdia a vitória.
  let premio = null;
  function guardaVitoria() {
    registra('vitoria');
    atualizaRitmo(true);
    const est = S.estrelas();
    contaPartida(true, est); // missões e conquistas
    contaVitoriaAnuncio();   // (0.9: o intersticial só vem a cada N vitórias)
    if (desafio) return guardaDesafio(est);
    const primeira = !P.estrelas(modo, faseK);
    const ganho = P.vence(modo, faseK, est, cfg);
    // chefe vencido pela primeira vez: diamantes
    const gemas = S.chefe && primeira ? (cfg.chefe_gemas[arenaJogo] || 0) : 0;
    // Classic: o tempo da fase (jogo de verdade, sem pausas) e o recorde de cada fase — é o dado
    // que o ranking vai usar (menor tempo médio por fase)
    const dur = +(modo === 'classic' ? S.tempoFase() : S.duracao()).toFixed(1);
    let antes = 0, recorde = false;
    if (modo === 'classic') {
      antes = P.d.tempos.classic[faseK] || 0;
      recorde = !antes || dur < antes;
      if (recorde) P.d.tempos.classic[faseK] = dur;
    }
    P.d.gemas += gemas; P.d.emJogo = null; P.salva();
    // ranking online: a vitória no Classic vai para o servidor (a marca fica guardada até ir)
    if (modo === 'classic') { Rede.marca(); enviaDepois(); }
    return { est, ganho, gemas, dur, antes, recorde };
  }
  // jogar a mesma fase de novo (o desafio só se ainda estiver aberto: iniciaDesafio avisa)
  function repete() { if (desafio) iniciaDesafio(desafio); else iniciaFase(modo, faseK); }
  // MENU/SAIR: as fases do modo (no Classic, na arena da fase); do desafio, o menu. Com um aviso
  // tocado durante a fase esperando, também o menu: é lá que ele abre.
  function voltaDaFase() {
    fechaModal();
    if (desafio || avisoPendente) return vai('menu');
    if (modo === 'classic') arenaVista = arenaJogo;
    vai(modo);
  }
  // sair de uma fase já começada conta como perder (senão sair antes de perder pouparia energia)
  function saiDaFase() {
    registra('saiu');
    if (S && S.t0 != null) cobraDerrota();
    // a fase abandonada deixa de existir: nada mais pode rodar nela (nem o fim de fase)
    if (S) { S.estado = 'saiu'; fimTratado = true; }
    pausado = false; Som.silencia(); paraFalas(); acabaTutorial();
    $('tela-jogo').classList.remove('pausado');
  }
  function fimDeFase() {
    if (fimTratado || !S) return;
    fimTratado = true;
    paraFalas(); acabaTutorial();
    $('tela-jogo').classList.remove('urgente', 'fever', 'gelado');
    $('laser-luz').classList.remove('urgente');
    $('barra').classList.remove('urgente');
    $('hud-tempo').classList.remove('bomba');
    bombaAtiva = false; Som.pavio(false);
    calor = 0; apagaCalor();
    mira = false; $('tabuleiro').classList.remove('mira');
    $('combo').classList.remove('on');
    if (S.estado === 'vitoria') {
      const r = premio || guardaVitoria(); premio = null;
      Som.toca('vitoria'); vibra(40, 120);
      const [x, y] = projeta(S.c.w * 50, S.c.h * 50);
      FX.jato(x, y, 80, { cores: ['#ffe14a', '#ff5ad2', '#3ee6ff', '#3ee05a', '#fff'], vel: 1100, g: 900, vida: 1.4, tam: 13 });
      janelaVitoria(r);
    } else {
      const rec = registra(S.estado);
      // (guardados para o REVIVER desfazer: o ritmo de antes e o registro desta derrota)
      S.recDerrota = rec; S.ritmoAntes = P.d.ritmo;
      atualizaRitmo(false);
      cobraDerrota(); // normalmente já cobrada no evento 'fim'; aqui é a garantia
      ultimoFim = desafio ? null : { modo, k: faseK, rec, t: Date.now() };
      Som.toca('derrota'); vibra(70, 160);
      janelaDerrota();
    }
  }

  function janelaVitoria(r) {
    if (r.desafio) return janelaDesafioVencido(r);
    const { est, ganho, gemas } = r;
    const chefe = !!S.chefe, A = ARENAS[arenaJogo];
    const temProxima = faseK + 1 < FASES[modo].length;
    // última fase da arena (com chefe ou não — a arena 1 não tem): abre a próxima arena; a do
    // chefe final abre a tela de agradecimento
    const fimArena = modo === 'classic' && faseK === BASE[arenaJogo] + A.n - 1;
    const proximaArena = fimArena && arenaJogo + 1 < ARENAS.length;
    const fimJogo = fimArena && !proximaArena;
    const tempo = modo === 'classic'
      ? `<div class="linha"><span>${esc(t('tempo'))}</span><b>${r.recorde ? `<i class="recorde-novo">${esc(t('novo_recorde'))}</i> ` : ''}${relogio(r.dur)}</b></div>` +
        (!r.recorde && r.antes ? `<div class="linha"><span>${esc(t('recorde'))}</span><b>${relogio(r.antes)}</b></div>` : '')
      : `<div class="linha"><span>${esc(t('tempo_restante'))}</span><b>${mmss(S.resta)}</b></div>`;
    const linhas = tempo +
      `<div class="linha"><span>${esc(t('erros'))}</span><b>${S.erros}</b></div>` +
      `<div class="linha"><span>${esc(t('combo_max'))}</span><b>x${S.maxCombo}</b></div>`;
    const titulo = chefe ? t('chefe_derrotado') : t('concluida');
    const extra = fimArena ? `<p class="ol" style="font-size:34px;color:#ffd23a">${esc(proximaArena ? t('nova_arena') : t('fim_campanha'))}</p>` : '';
    const botaoProx = proximaArena ? `<button class="bt verde ol" id="r-arena">${esc(t('proxima_arena'))}</button>`
      : fimJogo ? `<button class="bt verde ol brilha" id="r-final">${esc(t('ver_final'))}</button>`
      : temProxima ? `<button class="bt verde ol" id="r-prox">${esc(t('proxima'))}</button>` : '';
    abreModal('resultado', `<div class="janela" style="--y:400">
      <div class="faixa" style="width:620px"><img src="ui/faixa-concluida.webp" width="556" height="115" alt=""><div class="ft ol" data-fit>${esc(titulo)}</div></div>
      <div class="estrelas"><img src="ui/estrela.webp"><img src="ui/estrela.webp"><img src="ui/estrela.webp"></div>
      ${linhas}${extra}${modo === 'classic' && temAmigos() ? '<div id="vs-amigos" class="vs-amigos"></div>' : ''}
      <div class="ganho ol"><img src="ui/moeda.webp" alt="">+${num(ganho)}${gemas ? `<img src="ui/gema.webp" alt="" style="margin-left:22px">+${num(gemas)}` : ''}</div>
      <div class="botoes">
        ${botaoProx}
        <div class="botoes lado" style="margin-top:0"><button class="bt azul peq ol" id="r-rep">${esc(t('reiniciar'))}</button><button class="bt cinza peq ol" id="r-menu">${esc(t('menu'))}</button></div>
        <button class="bt peq ol" id="r-partilha"><span class="bt-ico">${ICONE_PARTILHA}${esc(t('compartilhar'))}</span></button>
      </div></div>`);
    const imgs = document.querySelectorAll('#modal .estrelas img');
    // os tempos ficam guardados: quem toca PRÓXIMA antes das estrelas caírem não ouve elas na fase nova
    imgs.forEach((im, k) => {
      if (k >= est) im.classList.add('cinza');
      timersModal.push(setTimeout(() => { im.classList.add('vem'); if (k < est) { Som.toca('estrela', k); vibra(15, 80); } }, 350 + k * 330));
    });
    timersModal.push(setTimeout(() => Som.toca('moeda'), 350 + 3 * 330));
    // (0.9) sair da vitória é a pausa natural do INTERSTICIAL: talvez um anúncio, e depois segue
    if ($('r-prox')) toque($('r-prox'), () => talvezIntersticial(() => iniciaFase(modo, faseK + 1)));
    if ($('r-arena')) toque($('r-arena'), () => talvezIntersticial(() => { fechaModal(); arenaVista = arenaJogo + 1; vai('classic'); }));
    // (nunca antes da tela final de agradecimento: é o momento do jogador, não do anúncio)
    if ($('r-final')) toque($('r-final'), () => { if (!Anuncios.ocupado()) { fechaModal(); abreFinal(); } });
    toque($('r-partilha'), () => abrePartilha(r));
    toque($('r-rep'), () => talvezIntersticial(repete));
    toque($('r-menu'), () => talvezIntersticial(voltaDaFase));
    atualizaSaldo();
    // os tempos dos amigos nesta fase (chegam da rede; sem internet o espaço fica vazio)
    if ($('vs-amigos')) comparaAmigos(faseK);
  }

  function janelaDerrota() {
    const n = S.restantes;
    const msg = chefeNaTela() ? chefeTxt(cena().chefe).nome + ': ' + sorteia(chefeTxt(cena().chefe).vence)
      : n === 1 ? t('quase1') : n <= 3 ? t('quaseN', { n }) : t('faltaram', { n });
    const faixa = S.estado === 'tempo'
      ? `<div class="faixa" style="width:580px;margin-top:-116px"><img src="ui/faixa-timeup-limpa.webp" width="376" height="102" alt=""><div class="ft ft-tempo ol5" data-fit>${esc(t('tempo_esgotado'))}</div></div>`
      : `<div class="faixa-vermelha ol">${esc(t('sem_coracoes'))}</div>`;
    const e = P.energiaAgora(cfg);
    // desafio: não gastou energia; mostra quanto tempo ele ainda fica aberto
    const rodape = desafio ? `<p class="ol dsf-gratis">${esc(t('gratis'))}</p><div class="dsf-tempo ol">${esc(t('acaba_em', { t: hms((desafio.fim - Date.now()) / 1000) }))}</div>`
      : `<p class="ol en-linha"><img src="ui/raio-energia.webp" alt=""> ${e.n}/${cfg.energia_max}</p>`;
    // REVIVER (pedido do dono): continua de onde parou; TENTAR DE NOVO recomeça a fase. E, com a fase
    // adiantada, uma vez por tentativa, o reviver por anúncio (0.9)
    const rev = botaoReviver(), revAd = rev ? botaoReviverAnuncio() : '';
    abreModal('resultado', `<div class="janela" style="--y:${revAd ? 420 : rev ? 470 : 520}">${faixa}
      <p style="font-size:40px;margin-top:26px" class="ol">${rico(msg)}</p>
      ${rodape}
      <div class="botoes">${rev}${revAd}<button class="bt ${rev ? 'azul' : 'verde'} ol" id="r-rep">${esc(t('tentar'))}</button><button class="bt cinza peq ol" id="r-menu">${esc(t('menu'))}</button></div></div>`);
    // (com o vídeo do reviver pedido, os outros botões esperam: o prêmio não pode cair numa fase que o
    // jogador já largou, nem o vídeo ser assistido à toa)
    const livre = () => !Anuncios.ocupado();
    if ($('r-reviver')) toque($('r-reviver'), () => { if (livre()) reviver(); });
    if ($('r-reviver-ad')) toque($('r-reviver-ad'), () => {
      const aqui = S;
      premiado('reviver', () => { if (S === aqui && tela === 'jogo' && modalTipo === 'resultado') reviver(true); });
    });
    // (a derrota conta nas missões quando o jogador sai dela: quem revive não perdeu)
    toque($('r-rep'), () => { if (!livre()) return; contaPartida(false); repete(); });
    toque($('r-menu'), () => { if (!livre()) return; contaPartida(false); if (ultimoFim) { ultimoFim.rec.desistiu = true; P.salva(); ultimoFim = null; } voltaDaFase(); });
  }

  // ---------- pausa ----------
  // pausar o jogo PARA a música (regra do dono); continuar a traz de volta
  function pausa() {
    if (tela !== 'jogo' || !S || !S.ativo() || modalTipo) return;
    pausado = true; Som.pausa(); Musica.bloqueia('pausa', true);
    // o tabuleiro some na pausa: pausar não pode virar tempo extra para pensar (vale para o recorde)
    $('tela-jogo').classList.add('pausado');
    abreModal('pausa', `<div class="janela" style="--y:520"><h2 class="ol5">${esc(t('pausa'))}</h2>
      <div class="botoes"><button class="bt verde ol" id="p-cont">${esc(t('continuar'))}</button>
      <button class="bt azul ol" id="p-rei">${esc(t('reiniciar'))}</button>
      <button class="bt cinza ol" id="p-sair">${esc(t('sair'))}</button></div>
      ${S.t0 != null && !desafio ? `<p class="ol" style="font-size:24px;opacity:.8">${esc(t('sair_gasta'))}</p>` : ''}</div>`);
    toque($('p-cont'), retoma);
    toque($('p-rei'), () => { saiDaFase(); repete(); });
    toque($('p-sair'), () => { saiDaFase(); voltaDaFase(); });
  }
  function retoma() { fechaModal(); $('tela-jogo').classList.remove('pausado'); Som.volta(); retomaJogo(); }

  // ================= janelas =================
  let modalTipo = null, timersModal = [];
  function abreModal(tipo, html) {
    modalTipo = tipo;
    document.body.dataset.modal = tipo; // (o CSS usa: nas janelas do ranking o aviso rápido vai para baixo)
    Ambiente.congela(true); // atrás da janela ninguém vê: não gasta bateria animando
    const m = $('modal'); m.innerHTML = html; m.classList.add('on');
    encaixa(m);
    // imagem que ainda não carregou tem altura zero: o texto por cima dela (faixa de VITÓRIA/TEMPO
    // ESGOTADO) encolhia até o mínimo. Quando ela chega, mede de novo.
    m.querySelectorAll('img').forEach(i => { if (!i.complete) i.addEventListener('load', () => { if (m.contains(i)) encaixa(m); }, { once: true }); });
  }
  function fechaModal() {
    // a janela de energia fechou sem encher (voltar, aviso por cima...): a fase que esperava por
    // ela deixa de esperar — senão um ENCHER bem depois, pela pílula do menu, abria aquela fase
    if (modalTipo === 'energia') faseEsperando = null;
    // roleta fechada no meio do giro (um aviso por cima): o prêmio já foi pago; sem isto a roleta
    // ficava "girando" para sempre e não fechava mais
    girando = false;
    modalTipo = null; delete document.body.dataset.modal; const m = $('modal'); m.classList.remove('on'); m.innerHTML = '';
    Ambiente.congela(false);
    timersModal.forEach(clearTimeout); timersModal = [];
  }

  // ================= compartilhar resultado =================
  // Um cartão com a arte (fase, estrelas, tempo e "você consegue me superar?") aparece por cima do
  // resultado. ENVIAR pede ao Android para fotografar só o cartão e abrir o menu de compartilhar.
  const LINK_LOJA = 'https://play.google.com/store/apps/details?id=com.lipy.quiver';
  let partilhaTexto = '';
  function abrePartilha(r) {
    const A = ARENAS[arenaJogo], classic = modo === 'classic';
    const sub = classic ? t('classic') + ' · ' + t('arena_n', { n: arenaJogo + 1 }) : t('rush');
    const tempo = relogio(r.dur);
    const est = [0, 1, 2].map(k => `<img src="ui/estrela.webp" alt=""${k < r.est ? '' : ' class="cinza"'}>`).join('');
    partilhaTexto = t('partilha_texto', { f: numeroNaArena(), e: r.est, t: tempo }) + '\n' + LINK_LOJA;
    const el = $('partilha');
    el.innerHTML = `<div id="cartao" style="--bg:url(${classic ? A.mapa : 'bg/rush.webp'})">
      <div class="c-escuro"></div>
      <img class="c-logo" src="ui/logo.webp" alt="">
      <div class="c-fase tt tt-grande" style="--h:120" data-t="${esc(t('fase') + ' ' + numeroNaArena())}"><span class="gtx">${esc(t('fase') + ' ' + numeroNaArena())}</span></div>
      <div class="c-sub ol">${esc(sub)}</div>
      <div class="c-est">${est}</div>
      <div class="c-dados ol"><div><small>${esc(t('tempo'))}</small>${tempo}</div><div><small>${esc(t('erros'))}</small>${S.erros}</div><div><small>${esc(t('combo_max'))}</small>x${S.maxCombo}</div></div>
      <div class="c-desafio ol" data-fit><div>${rico(t('desafio'))}</div></div>
      <div class="c-rodape">Quiver: Arrow Puzzle · Google Play</div>
    </div>
    <div class="botoes lado" id="p-botoes"><button class="bt verde ol" id="p-enviar"><span class="bt-ico">${ICONE_PARTILHA}${esc(t('enviar'))}</span></button><button class="bt cinza peq ol" id="p-fechar">${esc(t('fechar'))}</button></div>`;
    el.classList.add('on');
    encaixa(el);
    el.querySelectorAll('img').forEach(i => { if (!i.complete) i.addEventListener('load', () => { if (el.contains(i)) encaixa(el); }, { once: true }); });
    toque($('p-enviar'), enviaPartilha);
    toque($('p-fechar'), fechaPartilha);
  }
  function fechaPartilha() { const el = $('partilha'); el.classList.remove('on'); el.innerHTML = ''; }
  function enviaPartilha() {
    const r = $('cartao').getBoundingClientRect();
    try { if (window.LipyApp && typeof window.LipyApp.compartilhar === 'function') { window.LipyApp.compartilhar(r.left, r.top, r.width, r.height, partilhaTexto); return; } } catch (e) { }
    // navegador (só no teste): vai o texto com o link
    if (navigator.share) navigator.share({ text: partilhaTexto }).catch(() => { });
  }

  // ================= final: obrigado por jogar =================
  // Depois do chefe final: os cinco reinos (medalhões com a arte de cada arena) chegam voando, se
  // unem em volta do logo num clarão, e vem o agradecimento. Fogos de artifício de vez em quando.
  let fimTimers = [];
  function abreFinal() {
    vai('fim');
    const tf = $('tela-fim');
    tf.classList.remove('anima', 'pronto'); void tf.offsetWidth; tf.classList.add('anima');
    fimTimers.forEach(clearTimeout); fimTimers = [];
    fimTimers.push(setTimeout(() => tf.classList.add('pronto'), 4600));
    fimTimers.push(setTimeout(() => {
      if (tela !== 'fim') return;
      clarao('#fff6d0'); Som.toca('vitoria'); vibra(60, 160);
      FX.jato(470, Jogo.oc + 560, 90, { tipo: 'brilho', cores: ['#fff6c0', '#ffd23a', '#ff9a2a', '#fff', '#8fe1ff'], vel: 1100, g: 300, vida: 1.6, tam: 13 });
    }, 2000));
    const fogos = () => {
      if (tela !== 'fim') return;
      const x = 140 + Math.random() * 660, y = Jogo.oc + 150 + Math.random() * 480;
      FX.jato(x, y, 46, { tipo: 'brilho', cores: [sorteia(['#ffd23a', '#ff5ad2', '#3ee6ff', '#3ee05a', '#fff']), '#fff'], vel: 620, g: 380, vida: 1.2, tam: 10 });
      Som.toca('estalo');
      fimTimers.push(setTimeout(fogos, 700 + Math.random() * 900));
    };
    fimTimers.push(setTimeout(fogos, 2800));
  }
  function montaReinos() {
    // medalhões da tela final: um recorte da arte do mapa de cada arena
    const R = $('fim-reinos'), raio = 300, z = 0.62, r = 100;
    ARENAS.forEach((A, i) => {
      const d = document.createElement('div'); d.className = 'reino';
      const ang = -Math.PI / 2 + i * 2 * Math.PI / ARENAS.length;
      d.style.setProperty('--i', i);
      d.style.setProperty('--dx', Math.round(Math.cos(ang) * raio) + 'px');
      d.style.setProperty('--dy', Math.round(Math.sin(ang) * raio) + 'px');
      const [cx, cy] = A.medalha;
      d.style.backgroundImage = `url(${A.mapa})`;
      d.style.backgroundSize = `${Math.round(941 * z)}px ${Math.round(2332 * z)}px`;
      d.style.backgroundPosition = `${Math.round(r - cx * z)}px ${Math.round(r - cy * z)}px`;
      R.appendChild(d);
    });
  }

  // Configurações: volume da MÚSICA e dos EFEITOS separados (0 = desligado; música no zero deixa só
  // os efeitos, pedido do dono), vibração, avisos e idioma
  let configAvisos = null; // avisos ligados quando a janela foi desenhada
  const testeEsp = {}; let testeAvisoEsp = -1; // (atalhos de teste das fases especiais)
  function abreConfig() {
    const volume = (k, rot, img) => {
      const v = P.d[k] ?? 0;
      let barras = ''; for (let i = 1; i <= 4; i++) barras += `<i class="${i <= v ? 'on' : ''}"></i>`;
      // no zero, no lugar das barras aparece DESLIGADO (fica claro que a música some de vez)
      const meio = v > 0 ? `<span class="vol-barras">${barras}</span>` : `<span class="vol-off ol" data-fit>${esc(t('desligado'))}</span>`;
      return `<div class="opcao"><div class="esq"><img src="ui/${img}.webp" alt=""><span class="ol">${esc(t(rot))}</span></div>
        <div class="vol"><button class="bt peq cinza ol" data-vol="${k}" data-d="-1"${v <= 0 ? ' disabled' : ''}>−</button>${meio}<button class="bt peq verde ol" data-vol="${k}" data-d="1"${v >= 4 ? ' disabled' : ''}>+</button></div></div>`;
    };
    // atalhos de TESTE (só no APK de teste): um botão por chefe abre a luta direto; um por tipo de
    // DESAFIO RELÂMPAGO abre um desafio agora (2 h); e um agenda o aviso de um desafio daqui a 2 min
    const teste = !ehTeste() ? '' : `<div class="teste"><p class="ol">${esc(t('teste_chefes'))}</p><div class="teste-chefes">${ARENAS.map((A, a) =>
      A.chefe ? `<button class="bt peq azul ol" data-chefe="${a}">${esc(chefeTxt(A.chefe).nome)}</button>` : '').join('')}</div></div>
      <div class="teste"><p class="ol">${esc(t('teste_desafio'))}</p><div class="teste-chefes">${Desafio.TIPOS.map(tp =>
      `<button class="bt peq azul ol" data-dsf="${tp}">${esc(t('desafio_' + tp))}</button>`).join('')}</div>
      ${ponteAvisos() ? `<div class="botoes lado" style="margin-top:12px"><button class="bt peq verde ol" id="c-dsf-aviso">${esc(t('teste_aviso'))}</button><button class="bt peq verde ol" id="c-esp-aviso">${esc(t('teste_aviso_esp'))}</button></div>` : ''}</div>
      <div class="teste"><p class="ol">${esc(t('teste_especial'))}</p><div class="teste-chefes">${Desafio.DATAS.map(d =>
      `<button class="bt peq azul ol" data-esp="${d}">${esc(t('data_' + d))}</button>`).join('')}</div></div>`;
    // AVISOS: só no celular (é o Android que mostra)
    configAvisos = avisosLigados();
    const avisos = !ponteAvisos() ? '' : `<div class="opcao"><div class="esq"><span class="ico-sino">${ICONE_SINO}</span><span class="ol">${esc(t('avisos'))}</span></div>
      <button class="bt peq ${avisosLigados() ? 'verde' : 'cinza'} ol" id="c-avisos">${esc(t(avisosLigados() ? 'ligado' : 'desligado'))}</button></div>`;
    // (0.9) salvar o progresso na conta Google (Play Games): só no celular
    const nuvemOpcao = !Nuvem.nativa() || !Nuvem.disponivel ? '' : `<div class="opcao"><div class="esq"><span class="ico-sino">${ICONE_NUVEM}</span><span class="ol">${esc(t('salvar_progresso'))}</span></div>
      <button class="bt peq ${Nuvem.ligado ? 'verde' : 'cinza'} ol" id="c-nuvem">${esc(t(Nuvem.ligado ? 'ligado' : 'conectar'))}</button></div>`;
    abreModal('config', `<div class="janela rola" style="--y:160"><h2 class="ol5">${esc(t('config'))}</h2>
      ${volume('volMusica', 'musica', 'botao-musica')}${volume('volEfeitos', 'efeitos', 'botao-som')}
      <div class="opcao"><div class="esq"><img src="ui/botao-config.webp" alt=""><span class="ol">${esc(t('vibracao'))}</span></div>
      <button class="bt peq ${P.d.vibra ? 'verde' : 'cinza'} ol" id="c-vibra">${esc(t(P.d.vibra ? 'ligado' : 'desligado'))}</button></div>
      ${avisos}${nuvemOpcao}
      <div class="opcao"><div class="esq"><img src="ui/botao-idioma.webp" alt=""><span class="ol">${esc(t('idioma'))}</span></div></div>
      <div class="idiomas">${I18N.lista.map(l => `<button class="bt peq ${l === lang ? 'verde' : 'azul'} ol" data-lang="${l}">${esc(I18N.T[l].nome)}</button>`).join('')}</div>
      ${teste}
      <div class="botoes">${ehTeste() ? `<button class="bt azul peq ol" id="c-dados">${esc(t('dados'))}</button>` : ''}
      <button class="bt azul peq ol" id="c-privacidade">${esc(t('privacidade'))}</button>
      <button class="bt cinza peq ol" id="c-apagar">${esc(t('apagar'))}</button>
      <button class="bt verde ol" id="c-fechar">${esc(t('fechar'))}</button></div>
      <p id="c-versao" style="font-size:22px;opacity:.6;margin-top:18px">Quiver · ${esc(t('versao'))} ${VERSAO}${Anuncios.teste() ? ' · ' + esc(t('anuncios_teste')) : ''}</p>
      <div class="credito">Developed by Lipy Games</div></div>`);
    // atalho de TESTE: 5 toques na versão enchem a energia (para o dono testar o Rush difícil).
    // Só no APK de teste; na versão da loja (release) o Android responde false e o atalho não existe.
    if (ehTeste()) {
      let toquesVersao = 0;
      $('c-versao').addEventListener('click', () => { if (++toquesVersao >= 5) { toquesVersao = 0; P.encheEnergia(cfg); atualizaEnergia(); toast('⚡ ' + cfg.energia_max + '/' + cfg.energia_max); } });
    }
    document.querySelectorAll('#modal [data-vol]').forEach(b => toque(b, () => {
      const k = b.dataset.vol;
      P.d[k] = Math.max(0, Math.min(4, (P.d[k] ?? 0) + (+b.dataset.d))); P.salva();
      aplicaVolumes();
      if (k === 'volEfeitos') Som.toca('moeda');
      abreConfig();
    }));
    toque($('c-vibra'), () => { P.d.vibra = !P.d.vibra; P.salva(); abreConfig(); });
    document.querySelectorAll('#modal [data-lang]').forEach(b => toque(b, () => { lang = b.dataset.lang; P.d.idioma = lang; P.salva(); aplicaIdioma(); abreConfig(); }));
    document.querySelectorAll('#modal [data-chefe]').forEach(b => toque(b, () => vaiProChefe(+b.dataset.chefe)));
    document.querySelectorAll('#modal [data-dsf]').forEach(b => toque(b, () => {
      P.d.desafioTeste = Desafio.deTeste(Date.now(), b.dataset.dsf, 0); P.salva();
      fechaModal(); atualizaDesafioMenu(); abreDesafio(P.d.desafioTeste);
    }));
    if ($('c-dsf-aviso')) toque($('c-dsf-aviso'), () => {
      P.d.desafioTeste = Desafio.deTeste(Date.now(), 'chefe', 120000); P.salva();
      ligaAvisos(); agendaAvisos(); toast(t('teste_aviso_ok'));
    });
    // o mesmo, com o aviso ESPECIAL de uma data comemorativa (gira entre as quatro)
    if ($('c-esp-aviso')) toque($('c-esp-aviso'), () => {
      testeAvisoEsp = (testeAvisoEsp + 1) % Desafio.DATAS.length;
      P.d.desafioTeste = Desafio.deTeste(Date.now(), 'chefe', 120000, Desafio.DATAS[testeAvisoEsp]); P.salva();
      ligaAvisos(); agendaAvisos(); toast(t('teste_aviso_ok'));
    });
    // fase especial agora: cada toque na mesma data troca o tipo (chefe, relógio, coração)
    document.querySelectorAll('#modal [data-esp]').forEach(b => toque(b, () => {
      const d = b.dataset.esp, n = testeEsp[d] = ((testeEsp[d] ?? -1) + 1) % 3;
      P.d.desafioTeste = Desafio.deTeste(Date.now(), ['chefe', 'relogio', 'coracao'][n], 0, d); P.salva();
      fechaModal(); atualizaDesafioMenu(); abreDesafio(P.d.desafioTeste);
    }));
    // desligar: some a agenda inteira; ligar: pede a permissão se precisar (ou abre as configurações
    // do Android, se o jogador tinha negado de vez)
    if ($('c-avisos')) toque($('c-avisos'), () => {
      if (avisosLigados()) { P.d.avisos = false; P.salva(); try { ponteAvisos().clear(); } catch (e) { } abreConfig(); }
      else { ligaAvisos(); abreConfig(); }
    });
    // (os dados do teste Classic x Rush são só do APK de teste: a versão da loja não mostra)
    if ($('c-dados')) toque($('c-dados'), abreDados);
    toque($('c-privacidade'), abrePrivacidade);
    // conectar ao Play Games abre a tela do Google (o estado novo chega por appNuvem e redesenha aqui)
    if ($('c-nuvem')) toque($('c-nuvem'), botaoNuvem);
    toque($('c-apagar'), confirmaApagar);
    toque($('c-fechar'), fechaModal);
  }
  // atalho de TESTE: abre a luta do chefe da arena `a` direto — libera o caminho até ele (as fases
  // antes contam como vencidas com 1 estrela) e enche a energia. Na versão da loja o botão não existe.
  function vaiProChefe(a) {
    const k = BASE[a] + ARENAS[a].n - 1, e = P.d.estrelas.classic;
    for (let j = 0; j < k; j++) if (!e[j]) e[j] = 1;
    P.encheEnergia(cfg); P.salva(); atualizaEnergia();
    fechaModal(); iniciaFase('classic', k);
  }
  function confirmaApagar() {
    abreModal('confirma', `<div class="janela" style="--y:520"><p class="ol" style="font-size:40px">${esc(t('confirma_apagar'))}</p>
      <p class="ol" style="font-size:26px;opacity:.85">${esc(t('confirma_apagar_txt'))}</p>
      <div class="botoes lado"><button class="bt cinza peq ol" id="a-sim">${esc(t('sim'))}</button><button class="bt verde peq ol" id="a-nao">${esc(t('nao'))}</button></div></div>`);
    // O que foi PAGO não se apaga: as compras permanentes seguem valendo (a loja confirma), e as
    // entregas de pacotes ficam anotadas SEM o valor — senão o registro do Android devolveria o pacote
    // que o jogador apagou. A cópia no Play Games também recomeça: o contador de apagamentos viaja com
    // ela, e a cópia de um apagamento mais novo vence a de antes em qualquer aparelho (nuvem.js).
    toque($('a-sim'), () => {
      const antes = P.d;
      P.apaga(cfg);
      P.d.semAnuncios = !!antes.semAnuncios; P.d.passeReviver = !!antes.passeReviver;
      P.d.compras = { entregues: Loja.semValor(antes) };
      P.d.apagado = (antes.apagado || 0) + 1;
      P.salva(); lojaMudou(); nuvemGuarda(0);
      aplicaVolumes(); fechaModal(); vai('menu');
    });
    toque($('a-nao'), abreConfig);
  }

  function abreDados() {
    const r = P.resumo();
    const bloco = (m, nome) => `<h3>${nome}</h3>` + (r[m].tentativas ? [
      [t('tentativas'), r[m].tentativas], [t('vitorias'), r[m].vitorias], [t('derrotas'), r[m].derrotas],
      [t('repetiu'), r[m].repetiu], [t('desistiu'), r[m].desistiu], [t('tempo_mediano'), r[m].mediana + ' s']].map(([a, b]) => `<div class="linha"><span>${esc(a)}</span><b>${esc(b)}</b></div>`).join('')
      : `<p>${esc(t('sem_dados'))}</p>`);
    abreModal('dados', `<div class="janela" style="--y:200"><h2 class="ol5">${esc(t('dados'))}</h2>
      <div class="dados">${bloco('rush', esc(t('rush')))}${bloco('classic', esc(t('classic')))}</div>
      <div class="botoes lado"><button class="bt azul peq ol" id="d-copiar">${esc(t('copiar'))}</button><button class="bt verde peq ol" id="d-fechar">${esc(t('fechar'))}</button></div></div>`);
    toque($('d-copiar'), () => {
      const txt = JSON.stringify({ app: 'quiver', versao: VERSAO, ritmo: P.d.ritmo, resumo: r, tentativas: P.d.tele });
      const ok = () => toast(t('copiado'));
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, () => copiaVelho(txt) && ok());
      else if (copiaVelho(txt)) ok();
    });
    toque($('d-fechar'), abreConfig);
  }
  function copiaVelho(txt) {
    const a = document.createElement('textarea'); a.value = txt; a.style.position = 'fixed'; a.style.opacity = '0';
    document.body.appendChild(a); a.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (e) { }
    a.remove(); return ok;
  }

  function abreDiario() {
    const dia = P.diarioDia(), pode = P.diarioDisponivel();
    const celulas = cfg.diario.map((pr, k) => {
      const feito = !pode ? k <= dia : k < dia;
      const hoje = pode && k === dia;
      const chave = typeof pr === 'number' ? 'moedas' : Object.keys(pr)[0];
      const icone = { moedas: 'moeda', bomba: 'botao-bomba', gelo: 'botao-gelo', gemas: 'gema' }[chave] || 'moeda';
      const qtd = typeof pr === 'number' ? num(pr) : (chave === 'gemas' ? num(pr.gemas) : 'x' + pr[chave]);
      return `<div class="dia${hoje ? ' hoje' : ''}${feito ? ' feito' : ''}"><span class="ol">${esc(t('dia', { n: k + 1 }))}</span><img src="ui/${icone}.webp" alt=""><span class="ol" style="color:#ffd23a">${qtd}</span></div>`;
    }).join('');
    abreModal('diario', `<div class="janela" style="--y:300"><h2 class="ol5">${esc(t('diario_titulo'))}</h2><div class="dias">${celulas}</div>
      <div class="botoes">${pode ? `<button class="bt verde ol" id="dd-pegar">${esc(t('pegar'))}</button>` : `<p class="ol">${esc(t('volte_amanha'))}</p>`}
      <button class="bt cinza peq ol" id="dd-fechar">${esc(t('fechar'))}</button></div></div>`);
    if (pode) toque($('dd-pegar'), () => {
      const r = P.pegaDiario(cfg); if (!r) return;
      P.d.stats.diarios = (P.d.stats.diarios || 0) + 1; P.salva(); // (conquista "Fiel")
      Som.toca('moeda'); vibra(25, 90);
      FX.jato(470, 800 + Jogo.oc, 40, { cores: ['#ffd23a', '#fff'], vel: 800, g: 900, vida: 1, tam: 12 });
      atualizaSaldo(); $('m-diario-badge').classList.toggle('some', !P.diarioDisponivel()); abreDiario();
    });
    toque($('dd-fechar'), fechaModal);
  }

  function abreCompra(nome) {
    const [q, preco] = cfg.precos[nome];
    const volta = tela === 'jogo';
    if (volta) pausado = true;
    // (0.9, GDD: "premiado de Explosão/Dica quando o jogador trava") +1 do poder por anúncio, com teto por dia
    const btAd = ofereceVideo('poder', regras().poder_dia) ? `<button class="bt azul peq ol" id="k-anuncio"><span class="bt-ico">${ICONE_VIDEO}${esc(t('poder_anuncio'))}</span></button>` : '';
    abreModal('compra', `<div class="janela" style="--y:${btAd ? 450 : 500}"><h2 class="ol5">${esc(t(PW_ROT[nome]))}</h2>
      <img src="ui/${PW_IMG[nome]}.webp" alt="" style="width:170px;margin:0 auto 10px">
      <div class="botoes"><button class="bt verde ol" id="k-comprar"><span class="bt-ico">${esc(t('comprar', { q, p: num(preco) }))}<img src="ui/moeda.webp" alt=""></span></button>${btAd}
      <button class="bt cinza peq ol" id="k-fechar">${esc(t('fechar'))}</button></div>
      <p class="ol" style="font-size:28px">${esc(num(P.d.moedas))} ${esc(t('moedas'))}</p></div>`);
    const sai = () => { fechaModal(); if (volta) retomaJogo(); };
    toque($('k-comprar'), () => {
      if (P.d.moedas < preco) return toast(t('sem_moedas'));
      gasta('moedas', preco); P.d.estoque[nome] = (P.d.estoque[nome] || 0) + q; P.salva();
      Som.toca('moeda'); atualizaSaldo(); sai(); if (volta) atualizaHud();
    });
    if ($('k-anuncio')) toque($('k-anuncio'), () => premiado('poder', () => {
      P.d.estoque[nome] = (P.d.estoque[nome] || 0) + 1; P.salva();
      Som.toca('moeda'); toast(sinal('+1') + ' ' + t(PW_ROT[nome]));
      if (modalTipo === 'compra') { sai(); if (volta) atualizaHud(); }
    }));
    toque($('k-fechar'), sai);
  }

  // ================= DESAFIO RELÂMPAGO =================
  // 3 por semana, 2 horas cada (calendário em desafio.js, fases em desafios.js). Aparece no menu
  // (botão do lado direito) e chega como aviso no celular: entrando PELO AVISO, o prêmio vem em
  // dobro. Não gasta energia, dá para tentar de novo à vontade enquanto está aberto, e o prêmio sai
  // uma vez por desafio. Os registros (P.d.desafios) ficam 2 meses: base do prêmio do mês.
  function desafioAberto(agora) {
    agora = agora || Date.now();
    const tt = P.d.desafioTeste;
    if (tt && agora >= tt.ini && agora < tt.fim) return tt;
    return Desafio.ativo(agora);
  }
  // pelo id (aviso tocado): o de teste ou um das últimas semanas
  function achaDesafio(id) {
    const tt = P.d.desafioTeste;
    if (tt && tt.id === id) return tt;
    return Desafio.lista(Date.now() - 14 * 864e5, 2).find(e => e.id === id) || null;
  }
  function registroDesafio(ev) { return P.d.desafios[ev.id] || (P.d.desafios[ev.id] = { t: ev.ini }); }
  const desafioVencido = ev => !!(ev && P.d.desafios[ev.id] && P.d.desafios[ev.id].feito);
  // o chefe do desafio "escapou" da arena dele; o de um coração só é na arena em que o jogador está
  function arenaDoDesafio(ev) { return ev.tipo === 'chefe' ? ev.chefe : daFase(Math.min(totalClassic - 1, P.atual('classic', totalClassic))).a; }
  // prêmio do desafio (na semana de data comemorativa, com moedas também); x2 = veio pelo aviso
  function premioDesafio(x2, especial) {
    const p = especial ? cfg.desafio_premio_especial : cfg.desafio_premio, k = x2 ? 2 : 1;
    return { gemas: p.gemas * k, moedas: (p.moedas || 0) * k, bomba: p.bomba * k, desfazer: p.desfazer * k };
  }
  // arte do desafio: gira (pela semana) no banco do tipo dele; no chefe, as do chefe somam com as
  // genéricas; na semana de data comemorativa, as da data
  function artePromo(ev) {
    const B = window.PROMOS || {};
    const l = ev.especial ? (B['especial-' + ev.especial] || [])
      : ev.tipo === 'chefe' ? (B['chefe-' + ARENAS[ev.chefe].id] || []).concat(B.chefe || []) : (B[ev.tipo] || []);
    return l.length ? l[(ev.k || 0) % l.length] : '';
  }
  // nome do chefe do desafio: o da data comemorativa ou o que "escapou" da arena
  const chefeDoDesafio = ev => chefeTxt(ev.especial ? ESPECIAIS[ev.especial].chefe : ARENAS[ev.chefe].chefe).nome;
  // 1:23:45 · 12:05
  function hms(s) {
    s = Math.max(0, Math.ceil(s - 1e-6));
    const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = String(s % 60).padStart(2, '0');
    return h ? h + ':' + String(m).padStart(2, '0') + ':' + ss : m + ':' + ss;
  }
  // "qui., 19:00" no idioma do jogador
  function quandoTxt(ms) {
    try { return new Intl.DateTimeFormat(LOCAL[lang] || 'en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(ms)); }
    catch (e) { return new Date(ms).toLocaleString(); }
  }
  function atualizaDesafioMenu() {
    const bt = $('m-desafio'), ev = desafioAberto();
    const mostra = !!ev && !desafioVencido(ev);
    if (bt.classList.contains('some') === mostra) { bt.classList.toggle('some', !mostra); if (mostra) encaixa(bt); }
    if (!mostra) return;
    const txt = hms((ev.fim - Date.now()) / 1000), c = $('m-desafio-t');
    if (c.textContent !== txt) c.textContent = txt;
    bt.classList.toggle('x2', !!P.d.desafios[ev.id] && !!P.d.desafios[ev.id].x2);
    // semana de data comemorativa: o botão ganha as cores da data
    if (bt.dataset.esp !== (ev.especial || '')) bt.dataset.esp = ev.especial || '';
  }
  function itensPremio(p) {
    const it = (img, qtd) => `<div class="it"><img src="ui/${img}.webp" alt=""><span class="ol">${qtd}</span></div>`;
    return it('gema', '+' + num(p.gemas)) + (p.moedas ? it('moeda', '+' + num(p.moedas)) : '') +
      it('raio-energia', cfg.energia_max + '/' + cfg.energia_max) + it('botao-bomba', 'x' + p.bomba) + it('botao-desfazer', 'x' + p.desfazer);
  }
  // título da janela: DESAFIO RELÂMPAGO, ou DESAFIO DE NATAL (HALLOWEEN, PÁSCOA...) na semana da data
  const tituloDesafio = ev => {
    const s = ev && ev.especial ? t('desafio_de', { data: t('data_' + ev.especial) }) : t('desafio_relampago');
    return `<div class="dsf-titulo"><div class="tt tt-grande" style="--h:92" data-t="${esc(s)}" data-fit><span class="gtx">${esc(s)}</span></div></div>`;
  };

  // a "tela promocional": arte, o que tem de diferente, quanto tempo falta e o prêmio
  let promoEv = null;
  function abreDesafio(ev) {
    const agora = Date.now(), aberto = !!ev && agora >= ev.ini && agora < ev.fim;
    promoEv = null;
    if (!aberto || desafioVencido(ev)) { // acabou (ou já venceu): diz quando é o próximo
      const prox = Desafio.proximo(agora);
      abreModal('desafio', `<div class="janela dsf" style="--y:520">${tituloDesafio(ev)}
        <p class="ol">${esc(t(aberto ? 'desafio_feito' : 'desafio_acabou'))}</p>
        ${prox ? `<p class="ol" style="color:#ffd23a">${esc(t('proximo_desafio', { d: quandoTxt(prox.ini) }))}</p>` : ''}
        <div class="botoes"><button class="bt verde ol" id="d-fechar">${esc(t('fechar'))}</button></div></div>`);
      toque($('d-fechar'), fechaModal);
      atualizaDesafioMenu();
      return;
    }
    promoEv = ev;
    const r = P.d.desafios[ev.id], x2 = !!(r && r.x2), arte = artePromo(ev), chefe = chefeDoDesafio(ev);
    const E = ev.especial ? ESPECIAIS[ev.especial] : null;
    // a cena da data vem carregando enquanto o jogador lê (fundo e chefe são grandes)
    if (E) for (const src of [E.luta, E.sprite.src]) { const i = new Image(); i.src = src; }
    // sem aviso ligado: convida a ligar (é assim que vem o prêmio em dobro)
    const dica = x2 || !ponteAvisos() || avisosLigados() ? ''
      : `<div class="dsf-dica"><div class="ol">${rico(t('dica_dobro'))}</div><button class="bt azul peq ol" id="d-avisos">${esc(t('ativar'))}</button></div>`;
    // na semana da data: o chefe dela chegou + a regra do tipo (no chefe fugitivo, derrotar ele)
    const texto = E ? rico(t('especial_vem', { chefe, data: t('data_' + E.id) })) + '<br>' + rico(ev.tipo === 'chefe' ? t('especial_chefe_txt', { chefe }) : t('desafio_' + ev.tipo + '_txt', { chefe }))
      : rico(t('desafio_' + ev.tipo + '_txt', { chefe }));
    abreModal('desafio', `<div class="janela dsf${E ? ' esp' : ''}" style="--y:${E ? 100 : 120}"${E ? ` data-esp="${E.id}"` : ''}>${tituloDesafio(ev)}
      ${arte ? `<div class="dsf-arte"><img src="${arte}" alt=""></div>` : ''}
      <div class="dsf-nome ol" data-fit>${esc(t('desafio_' + ev.tipo))}</div>
      <p class="dsf-txt ol">${texto}</p>
      <div id="dsf-t" class="dsf-tempo ol">${esc(t('acaba_em', { t: hms((ev.fim - agora) / 1000) }))}</div>
      <div class="dsf-premios${x2 ? ' dobro' : ''}">${itensPremio(premioDesafio(x2, ev.especial))}</div>
      ${x2 ? `<div class="dsf-dobro ol">${sinal('x2')} ${esc(t('premio_dobro'))} <small>${esc(t('veio_aviso'))}</small></div>` : dica}
      <p class="dsf-gratis ol">${esc(t('gratis'))}</p>
      <div class="botoes"><button class="bt verde ol brilha" id="d-jogar">${esc(t('jogar'))}</button><button class="bt cinza peq ol" id="d-fechar">${esc(t('fechar'))}</button></div></div>`);
    toque($('d-jogar'), () => iniciaDesafio(ev));
    toque($('d-fechar'), () => { promoEv = null; fechaModal(); });
    if ($('d-avisos')) toque($('d-avisos'), () => { ligaAvisos(); const d = $('d-avisos'); if (d) d.closest('.dsf-dica').remove(); });
  }
  // contagem da janela aberta (acabou com ela aberta: vira o "já acabou")
  function atualizaPromo() {
    const el = $('dsf-t'); if (!el || !promoEv) return;
    const falta = (promoEv.fim - Date.now()) / 1000;
    if (falta <= 0) return abreDesafio(promoEv);
    const txt = t('acaba_em', { t: hms(falta) }); if (el.textContent !== txt) el.textContent = txt;
  }
  function iniciaDesafio(ev) {
    // fechou (tentar de novo depois do fim): de volta ao menu, com o aviso de quando é o próximo
    if (!ev || !(Date.now() < ev.fim)) { if (tela === 'jogo') vai('menu'); fechaModal(); abreDesafio(ev); return; }
    promoEv = null;
    iniciaFase(ev.tipo === 'relogio' ? 'rush' : 'classic', -1, ev);
  }
  // vitória no desafio: o prêmio sai NA HORA (uma vez por desafio) e a energia enche
  function guardaDesafio(est) {
    const r = registroDesafio(desafio), dur = +(modo === 'classic' ? S.tempoFase() : S.duracao()).toFixed(1);
    let ganhou = null;
    if (!r.feito) {
      ganhou = premioDesafio(r.x2, desafio.especial);
      P.d.gemas += ganhou.gemas; P.d.moedas += ganhou.moedas;
      P.d.estoque.bomba = (P.d.estoque.bomba || 0) + ganhou.bomba;
      P.d.estoque.desfazer = (P.d.estoque.desfazer || 0) + ganhou.desfazer;
      P.d.energia = { n: cfg.energia_max, prox: null };
      r.feito = true;
    }
    P.d.emJogo = null; P.salva();
    return { est, ganho: 0, gemas: 0, dur, desafio: true, premio: ganhou, x2: !!r.x2 };
  }
  function janelaDesafioVencido(r) {
    const linhas = (modo === 'classic' ? `<div class="linha"><span>${esc(t('tempo'))}</span><b>${relogio(r.dur)}</b></div>`
      : `<div class="linha"><span>${esc(t('tempo_restante'))}</span><b>${mmss(S.resta)}</b></div>`) +
      `<div class="linha"><span>${esc(t('erros'))}</span><b>${S.erros}</b></div>`;
    const premio = r.premio ? `<div class="dsf-premios chega${r.x2 ? ' dobro' : ''}">${itensPremio(r.premio)}</div>${r.x2 ? `<div class="dsf-dobro ol">${sinal('x2')} ${esc(t('premio_dobro'))}</div>` : ''}`
      : `<p class="ol">${esc(t('desafio_feito'))}</p>`;
    abreModal('resultado', `<div class="janela dsf" style="--y:430">
      <div class="faixa" style="width:620px"><img src="ui/faixa-concluida.webp" width="556" height="115" alt=""><div class="ft ol" data-fit>${esc(t('desafio_vencido'))}</div></div>
      ${linhas}${premio}
      <div class="botoes"><button class="bt verde ol" id="r-menu">${esc(t('menu'))}</button></div></div>`);
    if (r.premio) timersModal.push(setTimeout(() => {
      Som.toca('moeda'); vibra(25, 90);
      FX.jato(470, Jogo.oc + 820, 60, { tipo: 'brilho', cores: ['#ffd23a', '#8fe1ff', '#7dff6a', '#fff'], vel: 950, g: 800, vida: 1.2, tam: 12 });
    }, 420));
    toque($('r-menu'), voltaDaFase);
    atualizaSaldo(); atualizaEnergia();
  }

  // ================= avisos do celular (ponte LipyNotify: Avisos.java) =================
  // O que avisar e quando é regra do avisos.js; aqui junta o que ele precisa e fala com o Android.
  // A agenda é refeita sempre que o jogo vai para segundo plano (a nova substitui a anterior).
  const ponteAvisos = () => window.LipyNotify || null;
  function avisosPermitidos() { try { const b = ponteAvisos(); return !!b && !!b.allowed(); } catch (e) { return false; } }
  // null (nunca escolheu) conta como sim: no Android 12 ou menos os avisos já vêm permitidos
  function avisosLigados() { return P.d.avisos !== false && avisosPermitidos(); }
  function contextoAvisos(agora) {
    const e = P.energiaAgora(cfg);
    const cheia = e.n < cfg.energia_max && e.prox ? e.prox + (cfg.energia_max - e.n - 1) * cfg.energia_min * 60000 : null;
    const eventos = Desafio.proximos(agora, 7);
    const tt = P.d.desafioTeste; if (tt && tt.ini > agora) eventos.push(tt);
    const pegou = !P.diarioDisponivel();
    // quem sumiu há 5 dias leva uma provocação do chefe da arena em que parou (na 1ª, do MAGUMBI)
    const aC = Math.max(1, daFase(Math.min(totalClassic - 1, P.atual('classic', totalClassic))).a), ch = chefeTxt(ARENAS[aC].chefe);
    // os avisos que já apareceram (o Android anota): contam no "2 por dia"
    let entregues = [];
    try { const b = ponteAvisos(); entregues = b && b.entregues ? JSON.parse(b.entregues() || '[]') : []; } catch (e) { entregues = []; }
    return {
      agora, t, ignorados: P.d.avisosIgnorados || 0, entregues,
      eventos: eventos.filter(ev => !desafioVencido(ev)).map(ev => Object.assign({}, ev, { chefeNome: chefeDoDesafio(ev), imagem: artePromo(ev) })),
      // véspera de semana especial: o "vem aí" com a arte e o chefe da data
      vemData: (() => { const v = Desafio.proximaData(agora, 8); return v && { id: v.id, ini: v.ini, chefeNome: chefeTxt(ESPECIAIS[v.id].chefe).nome, imagem: artePromo({ especial: v.id, k: 0 }) }; })(),
      iconeJogo: 'promo/icone-app.webp',
      energiaCheia: cheia, diarioHoje: pegou, diarioDia: pegou ? P.d.diario.seq % 7 + 1 : P.diarioDia() + 1,
      chefeVolta: ch.nome, falaVolta: sorteia(ch.mapa),
    };
  }
  function agendaAvisos() {
    const b = ponteAvisos(); if (!b) return;
    try {
      if (!avisosLigados()) { b.clear(); return; }
      const lista = Avisos.monta(contextoAvisos(Date.now()));
      b.schedule(JSON.stringify({
        canais: { lembretes: t('canal_lembretes'), desafios: t('canal_desafios') },
        lista: lista.map(a => ({ quando: a.quando, ate: a.ate || 0, limite: a.limite || 0, canal: a.canal, abre: a.abre, titulo: a.titulo, texto: a.texto,
          imagem: a.imagem || '', icone: a.icone || '', cor: a.cor || '', grande: a.grande || '' })),
      }));
    } catch (e) { }
  }
  // ATIVAR: no Android 13+ vem o pedido do sistema (a resposta chega em appAvisos)
  function ligaAvisos() {
    P.d.avisos = true; P.salva();
    const b = ponteAvisos(); if (!b) return;
    try { if (b.allowed()) { toast(t('avisos_ligados')); agendaAvisos(); } else b.ask(); } catch (e) { }
  }
  // Android 13+: a explicação vem ANTES do pedido do sistema (pedir de cara é o jeito mais rápido
  // de levar um "não" para sempre). Aparece no menu depois da 3ª vitória; "agora não" pergunta de
  // novo uma vez, uma semana depois; o botão AVISOS das configurações vale sempre.
  function talvezPecaAvisos() {
    if (tela !== 'menu' || modalTipo || P.d.avisos !== null || !ponteAvisos() || avisosPermitidos()) return;
    const vitorias = P.d.estrelas.rush.filter(x => x > 0).length + P.d.estrelas.classic.filter(x => x > 0).length;
    if (vitorias < 3 || Date.now() - (P.d.avisosPedido || 0) < 7 * 864e5) return;
    pedeAvisos();
  }
  function pedeAvisos() {
    P.d.avisosPedido = Date.now(); P.salva();
    abreModal('avisos', `<div class="janela" style="--y:430"><div class="av-sino">${ICONE_SINO}</div>
      <h2 class="ol5">${esc(t('avisos_titulo'))}</h2>
      <p class="av-txt ol">${rico(t('avisos_explica'))}</p>
      <div class="botoes"><button class="bt verde ol" id="av-sim">${esc(t('ativar'))}</button><button class="bt cinza peq ol" id="av-nao">${esc(t('agora_nao'))}</button></div></div>`);
    toque($('av-sim'), () => { fechaModal(); ligaAvisos(); });
    toque($('av-nao'), () => { P.d.avisosNao = (P.d.avisosNao || 0) + 1; if (P.d.avisosNao >= 2) P.d.avisos = false; P.salva(); fechaModal(); });
  }
  // resposta do Android ao pedido de permissão
  window.appAvisos = ok => {
    toast(t(ok ? 'avisos_ligados' : 'avisos_bloqueados'));
    if (ok) agendaAvisos();
    if (modalTipo === 'config') abreConfig();
  };
  // o jogo foi aberto (ou trazido para a frente) por um toque num aviso: o que ele prometeu abre no
  // menu; tocar num aviso de desafio aberto vale o prêmio em dobro. Também conta os avisos que o
  // jogador deixou passar (quem ignora recebe menos).
  // { via, aberto }: o toque esperando o menu, e se o desafio dele estava aberto quando o toque chegou
  let avisoPendente = null;
  function confereAviso() {
    const b = ponteAvisos(); if (!b) return;
    let via = '', ign = 0;
    try { via = String(b.abriuPor() || ''); ign = +b.ignorados() || 0; } catch (e) { return; }
    if (!via && !ign) return; // (o foco vai e volta toda hora: sem novidade, nem grava)
    if (via) P.d.avisosIgnorados = 0;
    else P.d.avisosIgnorados = Math.min(99, (P.d.avisosIgnorados || 0) + ign);
    let aberto = false;
    if (via.startsWith('desafio:')) {
      const ev = achaDesafio(via.slice(8)), agora = Date.now();
      if (ev && agora >= ev.ini && agora < ev.fim) { registroDesafio(ev).x2 = true; aberto = true; }
    }
    P.salva();
    if (via) { avisoPendente = { via, aberto }; trataAvisoPendente(); }
  }
  function trataAvisoPendente() {
    if (!avisoPendente || tela === 'carrega' || tela === 'fim') return;
    // no meio de uma fase (ou no resultado dela): espera o jogador voltar ao menu
    if (tela === 'jogo') return;
    // (tira da fila ANTES de ir ao menu: a entrada no menu também chama esta função)
    const { via, aberto } = avisoPendente; avisoPendente = null;
    const ev = via.startsWith('desafio:') ? achaDesafio(via.slice(8)) : null;
    // o desafio fechou enquanto o jogador terminava a fase: nada de "já acabou" fora de hora (o
    // "já acabou" só aparece para quem tocou num aviso de desafio que já tinha fechado)
    if (ev && aberto && !(Date.now() < ev.fim)) { atualizaDesafioMenu(); return; }
    if (tela !== 'menu') vai('menu');
    if (modalTipo) fechaModal();
    if (via.startsWith('desafio:')) abreDesafio(ev);
    else if (via === 'diario' && P.diarioDisponivel()) abreDiario();
    atualizaDesafioMenu();
  }
  window.appAbriu = () => confereAviso();

  // ================= MENU: missões, conquistas, perfil, loja, skins, roleta (0.7) =================
  // Pedidos do dono (24/09): todos os botões do menu funcionando; a conquista escolhida vira a
  // insígnia da foto do jogador (no ranking, os amigos veem); loja com corações extras e REVIVER
  // (as compras com dinheiro entram com a monetização); "gravar jogada" vira a ROLETA.
  const Metas = window.Metas;
  // medalhas das conquistas: um desenho por tipo, no anel da cor do nível (bronze, prata, ouro)
  const MEDALHA = {
    trofeu: 'M7 3h10v3.5a5 5 0 0 1-4 4.9V14h3v2.5H8V14h3v-2.6a5 5 0 0 1-4-4.9zM3.5 4.5H7v2.8A3.2 3.2 0 0 1 3.5 4.5zm13.5 0h3.5A3.2 3.2 0 0 1 17 7.3zM8 18h8v3H8z',
    estrela: 'M12 2l2.9 6.9 7.1.5-5.4 4.6 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.4l7.1-.5z',
    fogo: 'M12.5 2c.6 3.2 5.5 5.3 5.5 10.6A6 6 0 0 1 6 12.6c0-2.3 1.2-3.9 2.3-4.9.1 1.8 1 3 2.2 3.4C10.6 7.7 11 4.6 12.5 2z',
    escudo: 'M12 2l8 3v6.2c0 5-3.4 9.2-8 10.8-4.6-1.6-8-5.8-8-10.8V5z',
    coracao: 'M12 21s-7.6-4.7-9.6-9.4C.9 8.2 3.2 4.8 6.6 4.8c2 0 3.6 1.1 5.4 3.2 1.8-2.1 3.4-3.2 5.4-3.2 3.4 0 5.7 3.4 4.2 6.8C19.6 16.3 12 21 12 21z',
    raio: 'M13.5 2L4 14h6.5l-1.5 8L19 10h-6.5z',
    relogio: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-1.3 3.8v6.1l4.9 2.9 1-1.7-3.8-2.3v-5z',
    presente: 'M3 8.5h18v4H3zM4.2 12.5h15.6V21H4.2zM10.8 8.5h2.4V21h-2.4zM12 8.3C10 5 5.9 4.4 6.4 7.1c.3 1.6 3.7 1.3 5.6 1.2zm0 0c2-3.3 6.1-3.9 5.6-1.2-.3 1.6-3.7 1.3-5.6 1.2z',
    calendario: 'M3.5 5.5h17v15h-17zM3.5 5.5h17v4.2h-17zM7.5 3v4.6M16.5 3v4.6M7 13h3v3H7z',
    coroa: 'M2.5 8l5 4.2L12 4.5l4.5 7.7 5-4.2-2.2 11.5H4.7z',
  };
  function medalhaSvg(icone, tier) {
    return `<svg class="medalha ${tier || 'sem'}" viewBox="0 0 24 24" aria-hidden="true"><path d="${MEDALHA[icone] || MEDALHA.estrela}" fill="#fff" stroke="#3a1a04" stroke-width="1.1" stroke-linejoin="round"/></svg>`;
  }
  const conquista = id => Metas.CONQUISTAS.find(c => c.id === id);
  // valor atual de cada conquista (estrelas e chefes saem do progresso das fases)
  function valorConquista(id) {
    const st = P.d.stats || {};
    const somaEst = l => l.reduce((s, x) => s + (x || 0), 0);
    const chefesArena = ARENAS.map((A, a) => A.chefe && P.estrelas('classic', BASE[a] + A.n - 1) > 0).filter(Boolean).length;
    switch (id) {
      // (quem já jogava antes da 0.7 ganha as vitórias que o progresso mostra)
      case 'vitorias': return Math.max(st.vitorias || 0, P.d.estrelas.rush.filter(x => x > 0).length + P.d.estrelas.classic.filter(x => x > 0).length);
      case 'estrelas': return somaEst(P.d.estrelas.rush) + somaEst(P.d.estrelas.classic);
      case 'combo': return st.comboMax || 0;
      case 'chefes': return chefesArena;
      case 'lenda': return P.estrelas('classic', totalClassic - 1) > 0 ? 1 : 0;
      default: return st[id] || 0;
    }
  }
  // níveis alcançados e ainda não pagos (o "!" do botão)
  const conquistasProntas = () => Metas.CONQUISTAS.filter(c => Metas.nivel(c, valorConquista(c.id)) > (P.d.conquistas[c.id] || 0)).length;
  // insígnia (a conquista escolhida para a foto) e a foto (avatar)
  // (o desenho é o mesmo das fotos do ranking: avatarDe, na seção do RANKING ONLINE)
  function avatarHtml(classe) { return avatarDe(P.d.perfil.avatar || 'seta-azul', insigniaMinha(), classe); }
  // avatar liberado? (setas livres; chefe de arena: venceu a luta; chefe de data: venceu um desafio dela)
  function avatarLivre(a) {
    if (a.chefe) return P.estrelas('classic', BASE[a.chefe] + ARENAS[a.chefe].n - 1) > 0;
    if (a.data) return !!((P.d.stats.datas || {})[a.data]);
    return true;
  }
  const semanaTxt = ms => { const w = Desafio.semanaIso(ms || Date.now()); return w.ano + 'w' + w.n; };
  // contadores das missões (do dia e da semana; recomeçam sozinhos)
  function missoesAgora() {
    const M = P.d.missoes, hoje = P.hoje(), sem = semanaTxt();
    if (M.dia !== hoje) { M.dia = hoje; M.cont = Metas.vazio(); M.pegas = []; }
    if (M.semana !== sem) { M.semana = sem; M.contSem = Metas.vazio(); M.pegaSem = false; }
    return M;
  }
  const missoesProntas = () => {
    const M = missoesAgora();
    return Metas.doDia(M.dia).filter(m => Metas.pronta(m, M.cont) && !M.pegas.includes(m.id)).length +
      (Metas.pronta(Metas.daSemana(M.semana), M.contSem) && !M.pegaSem ? 1 : 0);
  };
  // fim de uma partida: conta nas missões e na vida inteira (conquistas). Vitória conta na hora; a
  // derrota conta quando o jogador sai da janela dela (quem REVIVE não perdeu)
  function contaPartida(venceu, est) {
    if (!S || S.contada) return;
    S.contada = true;
    const u = S.usos, ev = { partidas: 1, combo: S.maxCombo, fever: S.fevers, poderes: u.desfazer + u.bomba + u.gelo + u.raio };
    if (venceu) {
      ev.vitorias = 1; ev[S.modo] = 1;
      if (!desafio) ev.estrelas = est || 0;
      if (S.erros === 0) ev.semErro = 1;
      if (S.chefe) ev.chefes = 1;
      if (desafio) ev.desafios = 1;
    }
    const M = missoesAgora(); Metas.soma(M.cont, ev); Metas.soma(M.contSem, ev);
    const st = P.d.stats;
    st.vitorias = (st.vitorias || 0) + (ev.vitorias || 0);
    st.semErro = (st.semErro || 0) + (ev.semErro || 0);
    st.fever = (st.fever || 0) + ev.fever;
    st.comboMax = Math.max(st.comboMax || 0, ev.combo);
    st.desafios = (st.desafios || 0) + (ev.desafios || 0);
    if (venceu && desafio && desafio.especial) {
      st.especiais = (st.especiais || 0) + 1;
      st.datas = st.datas || {}; st.datas[desafio.especial] = (st.datas[desafio.especial] || 0) + 1;
    }
    P.salva();
  }
  // o "!" dos botões do menu: missão pronta, conquista pronta, giro grátis, convite de amizade
  function atualizaBadges() {
    const liga = (id, sim) => { const b = $(id); if (b) b.classList.toggle('some', !sim); };
    liga('m-missoes-badge', missoesProntas() > 0);
    liga('m-conquistas-badge', conquistasProntas() > 0);
    liga('m-gravar-badge', girosDisponiveis() > 0);
    const c = Rede.conta();
    liga('m-ranking-badge', !!c && (c.convites || 0) > 0);
    confereFoto(); // (a medalha pode ter subido de nível)
  }
  const premioTxt = p => p.gemas ? `+${num(p.gemas)}<img src="ui/gema.webp" alt="">` : `+${num(p.moedas)}<img src="ui/moeda.webp" alt="">`;
  function paga(p) { P.d.gemas += p.gemas || 0; P.d.moedas += p.moedas || 0; P.salva(); Som.toca('moeda'); vibra(25, 90); atualizaSaldo(); }
  // gasta diamantes ('gemas') ou moedas ('moedas'): o saldo cai E o gasto total (que só cresce) sobe —
  // é ele que impede a cópia desatualizada da nuvem de "devolver" o que foi gasto (nuvem.js)
  function gasta(tipo, qtd) {
    const g = P.d.gasto || (P.d.gasto = { gemas: 0, moedas: 0 });
    P.d[tipo] -= qtd; g[tipo] = (g[tipo] || 0) + qtd;
  }
  // usa 1 item do estoque (poder, ficha de reviver): o estoque cai E o total usado (que só cresce) sobe,
  // pelo mesmo motivo — a cópia desatualizada da nuvem não devolve o que foi usado
  function usaItem(nome) {
    const u = P.d.usados || (P.d.usados = {});
    P.d.estoque[nome] = Math.max(0, (P.d.estoque[nome] || 0) - 1); u[nome] = (u[nome] || 0) + 1;
  }

  // ---------- MISSÕES ----------
  function abreMissoes() {
    const M = missoesAgora(), dia = Metas.doDia(M.dia), sem = Metas.daSemana(M.semana);
    const linha = (m, c, pega, idb) => {
      const prog = Metas.progresso(m, c), pronta = prog >= m.meta;
      const bt = pega ? `<span class="ms-feita ol">✓</span>` : pronta ? `<button class="bt verde peq ol" data-pega="${idb}"><span class="bt-ico">${premioTxt(m.premio)}</span></button>`
        : `<span class="ms-premio ol">${premioTxt(m.premio)}</span>`;
      return `<div class="missao${pega ? ' feita' : ''}"><div class="ms-txt"><div class="ol">${esc(t('mis_' + m.conta, { n: m.meta }))}</div>
        <div class="ms-barra"><i style="width:${Math.round(100 * prog / m.meta)}%"></i><span class="ol">${prog}/${m.meta}</span></div></div>${bt}</div>`;
    };
    const fimDia = new Date(); fimDia.setHours(24, 0, 0, 0);
    abreModal('missoes', `<div class="janela rola" style="--y:150"><h2 class="ol5">${esc(t('missoes'))}</h2>
      <h3 class="ms-titulo ol">${esc(t('missoes_hoje'))}</h3>
      ${dia.map(m => linha(m, M.cont, M.pegas.includes(m.id), m.id)).join('')}
      <p class="ms-renova ol">${esc(t('renovam_em', { t: hms((fimDia - Date.now()) / 1000) }))}</p>
      <h3 class="ms-titulo ol">${esc(t('missoes_semana'))}</h3>
      ${linha(sem, M.contSem, M.pegaSem, 'semana')}
      <div class="botoes"><button class="bt cinza peq ol" id="ms-fechar">${esc(t('fechar'))}</button></div></div>`);
    document.querySelectorAll('#modal [data-pega]').forEach(b => toque(b, () => {
      const id = b.dataset.pega, M2 = missoesAgora();
      if (id === 'semana') { if (M2.pegaSem || !Metas.pronta(sem, M2.contSem)) return; M2.pegaSem = true; paga(sem.premio); }
      else { const m = dia.find(x => x.id === id); if (!m || M2.pegas.includes(id) || !Metas.pronta(m, M2.cont)) return; M2.pegas.push(id); paga(m.premio); }
      FX.jato(470, Jogo.oc + 700, 30, { cores: ['#ffd23a', '#fff'], vel: 700, g: 900, vida: 1, tam: 11 });
      atualizaBadges(); abreMissoes();
    }));
    toque($('ms-fechar'), () => { fechaModal(); atualizaBadges(); });
  }

  // ---------- CONQUISTAS ----------
  function abreConquistas() {
    const cards = Metas.CONQUISTAS.map(c => {
      const v = valorConquista(c.id), n = Metas.nivel(c, v), pago = P.d.conquistas[c.id] || 0;
      const prox = c.niveis[Math.min(n, c.niveis.length - 1)], completo = n >= c.niveis.length;
      const bt = n > pago ? `<button class="bt verde peq ol" data-cq="${c.id}"><span class="bt-ico">+${num(c.premio[pago])}<img src="ui/gema.webp" alt=""></span></button>`
        : n ? (P.d.perfil.insignia === c.id ? `<span class="cq-nafoto ol">${esc(t('na_foto'))}</span>` : `<button class="bt azul peq ol" data-foto="${c.id}">${esc(t('usar_foto'))}</button>`) : '';
      return `<div class="conquista${n ? '' : ' apagada'}">${medalhaSvg(c.icone, Metas.tier(c, pago || n) || '')}
        <div class="cq-txt"><div class="cq-nome ol">${esc(t('cq_' + c.id))}</div>
        <div class="cq-desc">${esc(t('cqd_' + c.id, { n: prox }))}</div>
        <div class="ms-barra"><i style="width:${completo ? 100 : Math.round(100 * Math.min(v, prox) / prox)}%"></i><span class="ol">${completo ? esc(t('completo')) : Math.min(v, prox) + '/' + prox}</span></div></div>${bt}</div>`;
    }).join('');
    abreModal('conquistas', `<div class="janela rola" style="--y:120"><h2 class="ol5">${esc(t('conquistas').replace('\n', ' '))}</h2>
      <p class="cq-dica ol">${esc(t('cq_dica'))}</p>${cards}
      <div class="botoes"><button class="bt cinza peq ol" id="cq-fechar">${esc(t('fechar'))}</button></div></div>`);
    document.querySelectorAll('#modal [data-cq]').forEach(b => toque(b, () => {
      const c = conquista(b.dataset.cq), pago = P.d.conquistas[c.id] || 0;
      if (Metas.nivel(c, valorConquista(c.id)) <= pago) return;
      P.d.conquistas[c.id] = pago + 1;
      // a 1ª medalha já vai para a foto (o jogador pode trocar depois)
      if (!P.d.perfil.insignia) P.d.perfil.insignia = c.id;
      paga({ gemas: c.premio[pago] });
      atualizaBadges(); abreConquistas();
    }));
    document.querySelectorAll('#modal [data-foto]').forEach(b => toque(b, () => { P.d.perfil.insignia = b.dataset.foto; P.salva(); abreConquistas(); }));
    toque($('cq-fechar'), () => { fechaModal(); atualizaBadges(); });
  }

  // ---------- PERFIL (pelo RANKING: foto, medalha, o nome no ranking e a conta) ----------
  function abrePerfil(doRanking) {
    if (doRanking !== undefined) perfilDoRanking = !!doRanking;
    confereFoto(); // (voltou de trocar a foto: o servidor fica sabendo)
    const c = Rede.conta();
    const somaEst = l => l.reduce((s, x) => s + (x || 0), 0);
    const tempos = P.d.tempos.classic.filter(x => x > 0), medio = tempos.length ? tempos.reduce((a, b) => a + b, 0) / tempos.length : 0;
    const linha = (a, b) => `<div class="linha"><span>${esc(a)}</span><b>${b}</b></div>`;
    const feitas = Metas.CONQUISTAS.filter(x => (P.d.conquistas[x.id] || 0) > 0).length;
    abreModal('perfil', `<div class="janela" style="--y:170"><h2 class="ol5">${esc(t('perfil'))}</h2>
      <div class="pf-topo">${avatarHtml('grande')}<div><div class="pf-nome ol">${esc(c ? c.nome : t('jogador'))}${c && bandeira(c.pais) ? ` <span class="pf-band">${bandeira(c.pais)}</span>` : ''}</div>
      <button class="bt azul peq ol" id="pf-foto">${esc(t('trocar_foto'))}</button>
      ${c ? `<button class="bt azul peq ol" id="pf-conta">${esc(t('conta'))}</button>` : `<button class="bt verde peq ol" id="pf-criar">${esc(t('rk_entrar'))}</button>`}</div></div>
      ${linha(t('est_estrelas'), num(somaEst(P.d.estrelas.rush) + somaEst(P.d.estrelas.classic)))}
      ${linha(t('est_fases'), (lang === 'ar' ? '\u200F' : '') + `${P.d.estrelas.rush.filter(x => x > 0).length} + ${P.d.estrelas.classic.filter(x => x > 0).length}`)}
      ${linha(t('est_tempo'), medio ? relogio(medio) : '—')}
      ${linha(t('est_conquistas'), `${feitas}/${Metas.CONQUISTAS.length}`)}
      ${linha(t('est_desafios'), num(P.d.stats.desafios || 0))}
      ${c ? '' : `<p class="pf-breve ol">${esc(t('pf_sem_conta'))}</p>`}
      <div class="botoes lado"><button class="bt azul peq ol" id="pf-cq">${esc(t('conquistas').replace('\n', ' '))}</button><button class="bt cinza peq ol" id="pf-fechar">${esc(t(perfilDoRanking ? 'voltar' : 'fechar'))}</button></div></div>`);
    toque($('pf-foto'), abreFotos);
    if ($('pf-conta')) toque($('pf-conta'), abreConta);
    if ($('pf-criar')) toque($('pf-criar'), abreCriarConta);
    toque($('pf-cq'), abreConquistas);
    toque($('pf-fechar'), () => perfilDoRanking ? abreRanking() : fechaModal());
  }
  function abreFotos() {
    const itens = Metas.AVATARES.map(a => {
      const livre = avatarLivre(a), usa = P.d.perfil.avatar === a.id;
      const req = a.chefe ? t('bloq_chefe', { chefe: chefeTxt(ARENAS[a.chefe].chefe).nome }) : a.data ? t('bloq_data', { data: t('data_' + a.data) }) : '';
      return `<button class="foto${usa ? ' usa' : ''}${livre ? '' : ' presa'}" data-av="${a.id}"${livre ? '' : ` data-req="${esc(req)}"`}><img src="ui/avatar-${a.id}.webp" alt=""></button>`;
    }).join('');
    abreModal('fotos', `<div class="janela" style="--y:240"><h2 class="ol5">${esc(t('escolha_foto'))}</h2><div class="fotos">${itens}</div>
      <div class="botoes"><button class="bt cinza peq ol" id="fo-voltar">${esc(t('voltar'))}</button></div></div>`);
    document.querySelectorAll('#modal [data-av]').forEach(b => toque(b, () => {
      if (b.dataset.req) return toast(b.dataset.req);
      P.d.perfil.avatar = b.dataset.av; P.salva(); abrePerfil();
    }));
    toque($('fo-voltar'), () => abrePerfil());
  }

  // ---------- LOJA ----------
  function abreLoja(manterRolagem) {
    const rolagem = manterRolagem ? (document.querySelector('#modal .janela.rola') || {}).scrollTop || 0 : 0;
    const it = (img, nome, desc, bt) => `<div class="item"><img src="ui/${img}.webp" alt=""><div class="it-txt"><div class="ol">${esc(nome)}</div><small>${esc(desc)}</small></div>${bt}</div>`;
    const btPreco = (id, qtd, moeda) => `<button class="bt verde peq ol" data-compra="${id}"><span class="bt-ico">${num(qtd)}<img src="ui/${moeda}.webp" alt=""></span></button>`;
    const extras = P.d.coracoesExtra || 0;
    const poderes = ['desfazer', 'bomba', 'gelo', 'raio'].map(n => it(PW_IMG[n], t(PW_ROT[n]), t('voce_tem', { n: P.d.estoque[n] || 0 }) + ' · ' + sinal('+' + cfg.precos[n][0]), btPreco('pw-' + n, cfg.precos[n][1], 'moeda'))).join('');
    // compras com dinheiro (0.9): o preço vem da Play, no dinheiro do país do jogador
    const premium = CATALOGO.map(c => {
      const img = c.id === 'sem_anuncios' ? 'botao-pausa' : c.id === 'passe_reviver' ? 'coracao' : c.moedas ? 'moeda' : 'gema';
      const nome = c.gemas ? t('pacote_gemas', { n: num(c.gemas) }) : c.moedas ? t('pacote_moedas', { n: num(c.moedas) }) : t(c.id);
      return it(img, nome, c.permanente ? t(c.id + '_txt') : t('pacote_txt'), botaoPago(c));
    }).join('');
    abreModal('loja', `<div class="janela rola" style="--y:110"><h2 class="ol5">${esc(t('loja'))}</h2>
      <p class="ol lj-saldo"><span class="bt-ico">${num(P.d.moedas)}<img src="ui/moeda.webp" alt=""></span><span class="bt-ico">${num(P.d.gemas)}<img src="ui/gema.webp" alt=""></span></p>
      <h3 class="ms-titulo ol">${esc(t('loja_vidas'))}</h3>
      ${it('coracao', t('coracao_extra'), t('coracao_extra_txt', { n: cfg.classic_coracoes + extras, max: cfg.classic_coracoes + cfg.coracao_extra.length }),
        extras < cfg.coracao_extra.length ? btPreco('coracao', cfg.coracao_extra[extras], 'gema') : `<span class="ms-feita ol">${esc(t('maximo'))}</span>`)}
      ${it('coracao', t('reviver'), t('reviver_pacote_txt', { q: cfg.reviver_pacote[0], n: P.d.estoque.reviver || 0 }), btPreco('reviver', cfg.reviver_pacote[1], 'gema'))}
      ${it('raio-energia', t('energia'), t('energia_cheia').replace(/[¡!！]/g, ''), btPreco('energia', cfg.encher_gemas, 'gema'))}
      <h3 class="ms-titulo ol">${esc(t('loja_poderes'))}</h3>${poderes}
      <h3 class="ms-titulo ol">${esc(t('loja_premium'))}</h3>${premium}
      ${Loja.nativa() ? `<button class="lj-restaura ol" id="lj-restaura">${esc(t('restaurar_compras'))}</button>` : ''}
      <div class="botoes"><button class="bt cinza peq ol" id="lj-fechar">${esc(t('fechar'))}</button></div></div>`);
    if (rolagem) { const j = document.querySelector('#modal .janela.rola'); if (j) j.scrollTop = rolagem; }
    document.querySelectorAll('#modal [data-compra]').forEach(b => toque(b, () => compra(b.dataset.compra)));
    // (o resultado da compra NÃO volta daqui: volta pelo aviso da loja — o jogador pode pagar por boleto)
    document.querySelectorAll('#modal [data-pago]').forEach(b => toque(b, () => {
      if (!Loja.comprar(b.dataset.pago)) return toast(t('loja_indisponivel'));
      compraEsperando = b.dataset.pago;
    }));
    if ($('lj-restaura')) toque($('lj-restaura'), () => { Loja.reconsultar(); toast(t('restaurando')); });
    toque($('lj-fechar'), fechaModal);
  }
  function compra(id) {
    const cobra = (qtd, moeda) => {
      const tem = moeda === 'gema' ? P.d.gemas : P.d.moedas;
      if (tem < qtd) { toast(t(moeda === 'gema' ? 'sem_gemas' : 'sem_moedas')); return false; }
      gasta(moeda === 'gema' ? 'gemas' : 'moedas', qtd);
      return true;
    };
    if (id.startsWith('pw-')) { const n = id.slice(3), [q, p] = cfg.precos[n]; if (!cobra(p, 'moeda')) return; P.d.estoque[n] = (P.d.estoque[n] || 0) + q; }
    else if (id === 'coracao') {
      const e = P.d.coracoesExtra || 0; if (e >= cfg.coracao_extra.length) return;
      if (!cobra(cfg.coracao_extra[e], 'gema')) return; P.d.coracoesExtra = e + 1;
    } else if (id === 'reviver') { if (!cobra(cfg.reviver_pacote[1], 'gema')) return; P.d.estoque.reviver = (P.d.estoque.reviver || 0) + cfg.reviver_pacote[0]; }
    else if (id === 'energia') {
      if (P.energiaAgora(cfg).n >= cfg.energia_max) return toast(t('energia_cheia'));
      if (!cobra(cfg.encher_gemas, 'gema')) return; P.encheEnergia(cfg); atualizaEnergia();
    }
    P.salva(); Som.toca('moeda'); vibra(25, 90); atualizaSaldo(); toast(t('comprado'));
    abreLoja(true);
  }

  // ---------- SKINS das setas ----------
  function aplicaSkin() { document.body.dataset.skin = P.d.skins.usa || 'classica'; }
  function abreSkins() {
    const S0 = P.d.skins;
    const cards = Metas.SKINS.map(s => {
      const tem = S0.tem.includes(s.id), usa = S0.usa === s.id;
      const preco = s.preco && (s.preco.gemas ? [s.preco.gemas, 'gema'] : [s.preco.moedas, 'moeda']);
      const bt = usa ? `<span class="cq-nafoto ol">${esc(t('usando'))}</span>` : tem ? `<button class="bt azul peq ol" data-usa="${s.id}">${esc(t('usar'))}</button>`
        : `<button class="bt verde peq ol" data-skin="${s.id}"><span class="bt-ico">${num(preco[0])}<img src="ui/${preco[1]}.webp" alt=""></span></button>`;
      const amostra = ['seta-cima-azul', 'seta-dir-verde', 'seta-baixo-vermelha', 'seta-esq-amarela'].map((a, i) => `<img src="ui/${a}.webp" alt="" style="--h:${i * 90}deg">`).join('');
      return `<div class="skin${usa ? ' usa' : ''}"><div class="sk-amostra" data-skin="${s.id}">${amostra}</div><div class="sk-nome ol">${esc(t('skin_' + s.id))}</div>${bt}</div>`;
    }).join('');
    abreModal('skins', `<div class="janela rola" style="--y:150"><h2 class="ol5">${esc(t('skins'))}</h2>
      <p class="ol lj-saldo"><span class="bt-ico">${num(P.d.moedas)}<img src="ui/moeda.webp" alt=""></span><span class="bt-ico">${num(P.d.gemas)}<img src="ui/gema.webp" alt=""></span></p>
      <div class="skins">${cards}</div>
      <div class="botoes"><button class="bt cinza peq ol" id="sk-fechar">${esc(t('fechar'))}</button></div></div>`);
    // (os toques leem P.d.skins de AGORA: a nuvem pode ter trocado o perfil com a janela aberta)
    document.querySelectorAll('#modal [data-usa]').forEach(b => toque(b, () => { P.d.skins.usa = b.dataset.usa; P.salva(); aplicaSkin(); abreSkins(); }));
    document.querySelectorAll('#modal .bt[data-skin]').forEach(b => toque(b, () => {
      const sk = P.d.skins, s = Metas.SKINS.find(x => x.id === b.dataset.skin); if (!s || sk.tem.includes(s.id)) return;
      const [qtd, moeda] = s.preco.gemas ? [s.preco.gemas, 'gema'] : [s.preco.moedas, 'moeda'];
      if ((moeda === 'gema' ? P.d.gemas : P.d.moedas) < qtd) return toast(t(moeda === 'gema' ? 'sem_gemas' : 'sem_moedas'));
      gasta(moeda === 'gema' ? 'gemas' : 'moedas', qtd);
      sk.tem.push(s.id); sk.usa = s.id; P.salva();
      Som.toca('vitoria'); vibra(40, 120); atualizaSaldo(); aplicaSkin(); abreSkins();
    }));
    toque($('sk-fechar'), fechaModal);
  }

  // ---------- ROLETA (o botão que era "gravar jogada") ----------
  // 1 giro grátis por dia; "gire de novo" dá outro na hora; e cada anúncio assistido vale um giro (dono),
  // até o teto do dia. No APK de teste, gira à vontade.
  function roletaHoje() { const R = P.d.roleta, hoje = P.hoje(); if (R.dia !== hoje) { R.dia = hoje; R.usados = 0; } return R; }
  const girosDisponiveis = () => { const R = roletaHoje(); return Math.max(0, cfg.roleta_gratis_dia - R.usados) + (R.extras || 0); };
  const COR_FATIA = { moedas: ['#ffd23a', '#ffb020'], denovo: ['#9a6bff', '#7a4ae8'], energia: ['#3aa0ff', '#2b7cf0'], gemas: ['#3ee6ff', '#1fb8d8'], reviver: ['#5aff6a', '#2bc23e'] };
  const ICONE_FATIA = { moedas: 'moeda', gemas: 'gema', energia: 'raio-energia', reviver: 'coracao' };
  let girando = false;
  function rodaSvg() {
    const A = Metas.angulos(), R = 250, C = 260;
    const ponto = (ang, r) => { const a = (ang - 90) * Math.PI / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };
    const fatias = Metas.ROLETA.map((f, i) => {
      const { ini, fim, meio } = A[i], [x1, y1] = ponto(ini, R), [x2, y2] = ponto(fim, R), grande = fim - ini > 180 ? 1 : 0;
      const [ix, iy] = ponto(meio, R * .66), cor = COR_FATIA[f.tipo];
      const icone = f.tipo === 'denovo'
        ? `<g transform="translate(${ix} ${iy}) rotate(${meio})"><path d="M-14 -4a15 15 0 1 1 4 14" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M-24 -6l10 2 2-11z" fill="#fff"/></g>`
        : `<image href="ui/${ICONE_FATIA[f.tipo]}.webp" x="${ix - 26}" y="${iy - 26}" width="52" height="52" transform="rotate(${meio} ${ix} ${iy})"/>`;
      const qtd = f.qtd && f.tipo !== 'energia' && f.tipo !== 'reviver' ? `<text x="${ponto(meio, R * .38)[0]}" y="${ponto(meio, R * .38)[1]}" transform="rotate(${meio} ${ponto(meio, R * .38)[0]} ${ponto(meio, R * .38)[1]})" class="rl-qtd">${f.qtd}</text>` : '';
      return `<path d="M${C} ${C}L${x1} ${y1}A${R} ${R} 0 ${grande} 1 ${x2} ${y2}Z" fill="${i % 2 ? cor[1] : cor[0]}" stroke="#3a1a04" stroke-width="4"/>${icone}${qtd}`;
    }).join('');
    return `<svg viewBox="0 0 520 520" class="rl-svg"><g id="rl-roda">${fatias}<circle cx="${C}" cy="${C}" r="${R}" fill="none" stroke="#ffd978" stroke-width="10"/></g>
      <circle cx="${C}" cy="${C}" r="40" fill="#3a1a04"/><circle cx="${C}" cy="${C}" r="30" fill="#ffd23a"/></svg>`;
  }
  let rodaAng = 0;
  function abreRoleta(msg) {
    const giros = girosDisponiveis(), teste = ehTeste(), ch = Metas.chances();
    const chances = Object.entries(ch).map(([tipo, p]) => `${t('r_' + tipo)} ${p}%`).join(' · ');
    const bt = giros > 0 ? `<button class="bt verde ol brilha" id="rl-girar">${esc(t('girar'))} (${giros})</button>`
      : teste ? `<button class="bt verde ol" id="rl-girar">${esc(t('girar'))} (TESTE)</button>` : `<p class="ol">${esc(t('volte_amanha'))}</p>`;
    const restaAd = restaAnuncio('roleta', regras().roleta_dia);
    const btAd = ofereceVideo('roleta', regras().roleta_dia) ? `<button class="bt azul peq ol" id="rl-anuncio"><span class="bt-ico">${ICONE_VIDEO}${esc(t('roleta_anuncio', { n: restaAd }))}</span></button>` : '';
    abreModal('roleta', `<div class="janela rl" style="--y:120"><h2 class="ol5">${esc(t('roleta_titulo'))}</h2>
      <div class="rl-caixa">${rodaSvg()}<div class="rl-seta"></div></div>
      <div id="rl-msg" class="rl-msg ol5">${msg ? esc(msg) : ''}</div>
      <div class="botoes">${bt}${btAd}
      <button class="bt cinza peq ol" id="rl-fechar">${esc(t('fechar'))}</button></div>
      <p class="rl-chances">${esc(t('chances', { c: chances }))}</p></div>`);
    const roda = $('rl-roda'); roda.style.transform = `rotate(${rodaAng}deg)`;
    if ($('rl-girar')) toque($('rl-girar'), gira);
    // anúncio assistido até o fim = +1 giro (o prêmio só vem se a Unity disser que ele assistiu)
    if ($('rl-anuncio')) toque($('rl-anuncio'), () => {
      if (girando) return;
      premiado('roleta', () => { const R = roletaHoje(); R.extras = (R.extras || 0) + 1; P.salva(); atualizaBadges(); if (modalTipo === 'roleta') abreRoleta(t('ganhou_giro')); });
    });
    toque($('rl-fechar'), () => { if (!girando) { fechaModal(); atualizaBadges(); } });
  }
  function gira() {
    if (girando) return;
    const R = roletaHoje();
    if (girosDisponiveis() <= 0 && !ehTeste()) return;
    // gasta o giro ANTES de mostrar (fechar o app no meio não devolve o giro nem dá o prêmio duas vezes)
    if (R.extras > 0) R.extras--; else if (R.usados < cfg.roleta_gratis_dia) R.usados++;
    const i = Metas.sorteia(Math.random), f = Metas.ROLETA[i], A = Metas.angulos()[i];
    // o prêmio vale NA HORA (a roda só mostra). Energia com a energia cheia vira moedas (senão o
    // "+1 ENERGIA!" não dava nada)
    let cheia = false;
    if (f.tipo === 'moedas') P.d.moedas += f.qtd;
    if (f.tipo === 'gemas') P.d.gemas += f.qtd;
    if (f.tipo === 'energia') { cheia = P.energiaAgora(cfg).n >= cfg.energia_max; if (cheia) P.d.moedas += cfg.roleta_energia_moedas; else P.ganhaEnergia(cfg); }
    if (f.tipo === 'reviver') P.d.estoque.reviver = (P.d.estoque.reviver || 0) + 1;
    if (f.tipo === 'denovo') R.extras = (R.extras || 0) + 1;
    P.d.stats.roleta = (P.d.stats.roleta || 0) + 1;
    P.salva();
    // gira 5 voltas e para com o ponteiro (em cima) dentro da fatia sorteada
    const folga = (A.fim - A.ini) * .35, alvo = 360 - (A.meio + (Math.random() * 2 - 1) * folga);
    rodaAng = rodaAng - (rodaAng % 360) + 360 * 5 + alvo;
    girando = true;
    const roda = $('rl-roda'), bt = $('rl-girar'); if (bt) bt.disabled = true;
    roda.style.transition = 'transform 4.2s cubic-bezier(.12,.64,.12,1)';
    roda.style.transform = `rotate(${rodaAng}deg)`;
    Som.toca('entra');
    timersModal.push(setTimeout(() => {
      girando = false;
      const txt = f.tipo === 'denovo' ? t('gire_denovo') : cheia ? t('ganhou_moedas', { n: cfg.roleta_energia_moedas }) : t('ganhou_' + f.tipo, { n: f.qtd || 1 });
      Som.toca(f.tipo === 'denovo' ? 'bonus' : 'vitoria'); vibra(40, 140);
      FX.jato(470, Jogo.oc + 560, 50, { tipo: 'brilho', cores: ['#ffd23a', '#fff', '#8fe1ff'], vel: 900, g: 700, vida: 1.1, tam: 12 });
      atualizaSaldo(); atualizaEnergia(); atualizaBadges();
      abreRoleta(txt);
    }, 4300));
  }

  // ---------- REVIVER (na janela da derrota) ----------
  function podeReviver() { return !!S && (S.estado === 'tempo' || S.estado === 'coracoes') && (S.revives || 0) < cfg.reviver_max; }
  function botaoReviver() {
    if (!podeReviver()) return '';
    const fichas = P.d.estoque.reviver || 0;
    const rot = P.d.passeReviver ? esc(t('reviver_passe')) : fichas > 0 ? esc(t('reviver_ficha', { n: fichas }))
      : `${esc(t('reviver'))} ${cfg.reviver_gemas}<img src="ui/gema.webp" alt="">`;
    return `<button class="bt verde ol brilha" id="r-reviver"><span class="bt-ico">${rot}</span></button>`;
  }
  // REVIVER POR ANÚNCIO (0.9, GDD: "uma oferta clara, sem repetir sem fim"): 1 vez por tentativa e só
  // com a fase adiantada. Quem tem o passe não precisa (o dele já é de graça).
  function botaoReviverAnuncio() {
    const r = regras();
    if (!podeReviver() || P.d.passeReviver || !r.reviver_anuncio || S.reviveuAnuncio || !Anuncios.nativo() || !Anuncios.temPremiado()) return '';
    const feito = S.total ? 1 - S.restantes / S.total : 0;
    if (feito < r.reviver_progresso) return '';
    return `<button class="bt verde peq ol" id="r-reviver-ad"><span class="bt-ico">${ICONE_VIDEO}${esc(t('reviver_anuncio'))}</span></button>`;
  }
  function reviver(porAnuncio) {
    if (!podeReviver()) return;
    // paga: o anúncio assistido, o passe (de graça), uma ficha ou os diamantes
    if (porAnuncio === true) S.reviveuAnuncio = true;
    else if (!P.d.passeReviver) {
      if ((P.d.estoque.reviver || 0) > 0) usaItem('reviver');
      else if (P.d.gemas >= cfg.reviver_gemas) gasta('gemas', cfg.reviver_gemas);
      else { toast(t('sem_gemas')); return; }
    }
    // a partida continua: a energia que a derrota gastou volta (e a fase volta a contar como "em jogo")
    if (S.energiaCobrada && !desafio) { P.ganhaEnergia(cfg); S.energiaCobrada = false; }
    S.marcada = false; ultimoFim = null;
    // a derrota revivida não foi derrota: o ritmo pessoal volta ao de antes e os dados do teste a
    // marcam (não conta como tentativa perdida)
    if (S.ritmoAntes != null) P.d.ritmo = S.ritmoAntes;
    if (S.recDerrota) S.recDerrota.reviveu = true;
    S.revive(cfg.reviver_segundos);
    P.salva();
    fechaModal(); fimTratado = false; premio = null; explodiu = false;
    $('tela-jogo').classList.remove('urgente', 'fever', 'gelado');
    montaTabuleiro(); montaHud(); montaChefe();
    // RAIO ainda aceso: as setas livres voltam a brilhar
    if (S.raio > 0) for (const i of Motor.livres(S.c)) if (pecas[i]) pecas[i].classList.add('acesa');
    aviso(t('reviveu')); Som.toca('fever'); vibra(50, 160); clarao('#c8ffb8');
    atualizaSaldo(); atualizaEnergia();
    trataEventos(); garanteLaco();
  }

  // ================= RANKING ONLINE (0.8) =================
  // Pedido do dono: ranking do MUNDO, do PAÍS e dos AMIGOS, só com o Classic. Mais estrelas na frente e o
  // menor tempo médio por fase desempata; só aparece quem jogou nos últimos 30 dias. Amigos pelo NOME DE
  // USUÁRIO, com convite. A medalha escolhida aparece na foto (os amigos veem). No mapa, a foto de cada
  // amigo fica na fase em que ele está, e na vitória aparecem os tempos deles naquela fase.
  // Servidor em servidor/quiver.sql; a conversa com ele em rede.js. Sem internet o jogo segue igual e o
  // ranking mostra "sem conexão".
  // país do celular (o do chip; sem chip, o da rede; senão o do idioma do sistema)
  function paisDoAparelho() {
    try { const p = window.LipyApp && window.LipyApp.pais ? String(window.LipyApp.pais()) : ''; if (/^[A-Z]{2}$/.test(p)) return p; } catch (e) { }
    const m = /[-_]([A-Za-z]{2})\b/.exec(navigator.language || '');
    return m ? m[1].toUpperCase() : '';
  }
  // bandeira: as duas letras do país viram o emoji (quem desenha é o Android). ZZ = contas de teste
  // (no árabe, a marca RLM antes: a bandeira conta como letra latina e viraria a linha da esquerda para a direita)
  const bandeira = cc => /^[A-Z]{2}$/.test(cc || '') && cc !== 'ZZ' ? (lang === 'ar' ? '\u200F' : '') + String.fromCodePoint(...[...cc].map(c => 0x1F1A5 + c.charCodeAt(0))) : '';
  // a medalha da foto no formato do servidor ("combo:3"; o id vai em minúsculas)
  function insigniaMinha() {
    const pf = P.d.perfil, c = pf.insignia && conquista(pf.insignia), n = c ? (P.d.conquistas[c.id] || 0) : 0;
    return c && n ? c.id.toLowerCase() + ':' + n : '';
  }
  // foto + medalha de QUALQUER jogador (o que vem do servidor é conferido: foto ou medalha
  // desconhecida vira a padrão / nenhuma)
  function avatarDe(av, ins, classe) {
    const a = Metas.AVATARES.some(x => x.id === av) ? av : 'seta-azul';
    const [cid, cn] = String(ins || '').split(':'), n = +cn || 0;
    const c = cid ? Metas.CONQUISTAS.find(x => x.id.toLowerCase() === cid) : null;
    const med = c && n >= 1 && n <= c.niveis.length ? `<span class="insignia">${medalhaSvg(c.icone, Metas.tier(c, n))}</span>` : '';
    return `<div class="avatar ${classe || ''}"><img src="ui/avatar-${a}.webp" alt="">${med}</div>`;
  }
  // o que vai para o servidor: o melhor de cada fase do Classic (estrelas e tempo), a fase em que o
  // jogador está (o mapa dos amigos), a foto, a medalha e o país
  function dadosRanking() {
    const recordes = [];
    for (let k = 0; k < totalClassic; k++) {
      const e = P.d.estrelas.classic[k] || 0, s = P.d.tempos.classic[k] || 0;
      if (e > 0 && s > 0) recordes.push([k + 1, e, Math.round(s * 1000)]);
    }
    return { recordes, nivel: Math.min(totalClassic, P.atual('classic', totalClassic) + 1), avatar: P.d.perfil.avatar || 'seta-azul', insignia: insigniaMinha(), pais: paisDoAparelho() };
  }
  // envio para o servidor: um de cada vez; pedido no meio de um envio vira mais um no fim
  const dorme = ms => new Promise(r => setTimeout(r, ms));
  let envioT = 0, enviando = null, envioDeNovo = false;
  async function enviaAgora() {
    if (!Rede.conta()) return null;
    if (enviando) { envioDeNovo = true; return enviando; }
    enviando = (async () => {
      let r = await Rede.sincroniza(dadosRanking());
      // (o servidor aceita um envio a cada 2 s)
      if (r && r.erro === 'devagar') { await dorme(2600); r = await Rede.sincroniza(dadosRanking()); }
      return r;
    })();
    const r = await enviando;
    enviando = null;
    if (r && r.ok) atualizaBadges();
    // (pedido no meio do envio: só manda de novo se ainda sobrou algo — senão eram envios repetidos)
    if (envioDeNovo) { envioDeNovo = false; if (Rede.pendente()) enviaDepois(0); }
    return r;
  }
  function enviaDepois(ms) { if (!Rede.conta()) return; clearTimeout(envioT); envioT = setTimeout(enviaAgora, ms == null ? 1500 : ms); }
  // abriu o jogo: manda o que ficou pendente e conta como "ativo" (o ranking mostra só 30 dias)
  function iniciaRanking() {
    if (Rede.conta() && (Rede.pendente() || Date.now() - Rede.enviadoEm() > 6 * 3600e3)) enviaDepois(2500);
  }
  // trocou a foto ou a medalha: os amigos precisam ver (uma vez por troca: se o servidor recusar, o
  // jogo não fica reenviando sem parar)
  let fotoPedida = '';
  function confereFoto() {
    const c = Rede.conta(); if (!c) return;
    const quero = (P.d.perfil.avatar || 'seta-azul') + '|' + insigniaMinha();
    if ((c.avatar || '') + '|' + (c.insignia || '') !== quero && fotoPedida !== quero) { fotoPedida = quero; Rede.marca(); enviaDepois(); }
  }
  // amigos (fotos no mapa, comparação na vitória, aba Amigos): guardados por 2 minutos
  let amigosCache = null, erroAmigos = null;
  async function atualizaAmigos(forca) {
    if (!Rede.conta()) { amigosCache = null; return null; }
    if (!forca && amigosCache && Date.now() - amigosCache.t < 120e3) return amigosCache;
    const r = await Rede.amigos();
    if (r && r.ok) {
      amigosCache = { t: Date.now(), amigos: r.amigos || [], recebidos: r.recebidos || [], enviados: r.enviados || [] };
      Rede.anota({ convites: amigosCache.recebidos.length });
      atualizaBadges();
      return amigosCache;
    }
    erroAmigos = r;
    // o servidor não achou a conta: quem decide é o envio (se ela sumiu mesmo, vai para a reserva)
    if (r && r.erro === 'sem_conta') { amigosCache = null; enviaDepois(0); }
    return null;
  }
  const temAmigos = () => !!(Rede.conta() && amigosCache && amigosCache.amigos.length);
  // códigos de erro do servidor/rede -> texto do jogo
  function textoErro(r) {
    const e = r && r.erro;
    const mapa = { nome_invalido: 'nome_regra', nome_proibido: 'nome_proibido', nome_reservado: 'nome_proibido', nome_usado: 'nome_usado',
      ocupado: 'servidor_ocupado', limite_ip: 'limite_contas', rede: 'sem_conexao', nao_achou: 'amigo_nao_achou', voce_mesmo: 'amigo_voce',
      ja_amigos: 'amigo_ja', ja_enviado: 'amigo_ja_enviado', recusou: 'amigo_recusou', limite_amigos: 'amigo_limite', limite_convites: 'amigo_limite',
      cheio: 'amigo_cheio', devagar: 'devagar', codigo: 'codigo_errado', espere: 'renomear_espere', sem_conta: 'conta_sumiu' };
    const n = (r && r.dias) || 7;
    return t(e === 'espere' && n === 1 ? 'renomear_espere_1' : mapa[e] || 'erro_servidor', { n });
  }
  // campo de texto: limpa o que não pode (e tira o vermelho do erro); ENTER envia. Enquanto o teclado
  // está COMPONDO a palavra (Gboard/Samsung com sugestão), mexer no texto duplicava letras: limpa quando
  // a composição termina (e o envio limpa de novo).
  function ligaCampo(inp, limpa, envia, msg) {
    const arruma = () => { const v = limpa(inp.value); if (v !== inp.value) inp.value = v; };
    inp.addEventListener('input', e => { if (msg) msg.classList.remove('erro'); if (!e.isComposing) arruma(); });
    inp.addEventListener('compositionend', arruma);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); arruma(); inp.blur(); envia(); } });
    inp.addEventListener('blur', arruma);
  }
  function erroCampo(el, txt) { el.textContent = txt; el.classList.add('erro'); vibra(40, 120); }
  const maiuscula = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  function copia(txt) {
    const ok = () => toast(t('copiado'));
    try { if (window.LipyApp && window.LipyApp.copiar) { window.LipyApp.copiar(txt); return ok(); } } catch (e) { }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, () => copiaVelho(txt) && ok());
    else if (copiaVelho(txt)) ok();
  }

  // ---------- a janela do RANKING (abas mundo / país / amigos) ----------
  let rkAba = 'mundo', rkPedido = 0, perfilDoRanking = false;
  function abreRanking(aba) {
    if (aba) rkAba = aba;
    const c = Rede.conta(), meuPais = (c && c.pais) || paisDoAparelho();
    const conv = c ? (amigosCache ? amigosCache.recebidos.length : c.convites || 0) : 0;
    const abas = [['mundo', t('rk_mundo')], ['pais', t('rk_pais')], ['amigos', t('rk_amigos')]];
    abreModal('ranking', `<div class="janela rk" style="--y:60"><h2 class="ol5">${esc(t('ranking'))}</h2>
      <div class="rk-abas">${abas.map(([id, nome]) => `<button class="rk-aba ol${id === rkAba ? ' on' : ''}" data-aba="${id}">${id === 'pais' && bandeira(meuPais) ? bandeira(meuPais) + ' ' : ''}${esc(nome)}${id === 'amigos' && conv > 0 ? `<span class="rk-bola">${conv}</span>` : ''}</button>`).join('')}</div>
      <div id="rk-corpo" class="rk-corpo"><p class="rk-msg ol">${esc(t('carregando'))}</p></div>
      <div id="rk-rodape" class="rk-rodape"></div>
      <div class="botoes lado"><button class="bt azul peq ol" id="rk-perfil">${esc(t('perfil'))}</button><button class="bt cinza peq ol" id="rk-fechar">${esc(t('fechar'))}</button></div></div>`);
    document.querySelectorAll('#modal [data-aba]').forEach(b => toque(b, () => { if (b.dataset.aba !== rkAba) abreRanking(b.dataset.aba); }));
    toque($('rk-perfil'), () => abrePerfil(true));
    toque($('rk-fechar'), () => { fechaModal(); atualizaBadges(); });
    carregaRanking();
  }
  function linhaRk(x, idAmigo) {
    const p = x.pos, med = p === 1 ? ' p1' : p === 2 ? ' p2' : p === 3 ? ' p3' : '';
    return `<div class="rk-linha${x.eu ? ' eu' : ''}${idAmigo ? ' toca' : ''}"${idAmigo ? ` data-amigo="${esc(idAmigo)}" data-nome="${esc(x.nome)}"` : ''}>
      <span class="rk-pos${med}${p > 999 ? ' longa' : ''} ol">${num(p)}</span>${avatarDe(x.avatar, x.insignia, 'mini')}
      <div class="rk-nome"><div class="ol">${esc(x.nome)}${x.eu ? ` <i class="rk-voce">${esc(t('voce'))}</i>` : ''}</div><small>${bandeira(x.pais)} ${esc(t(x.fases === 1 ? 'rk_fases_1' : 'rk_fases', { n: num(x.fases || 0) }))}</small></div>
      <div class="rk-num"><b class="ol">${num(x.estrelas || 0)}<img src="ui/estrela.webp" alt=""></b><small class="ol">${x.tempo ? relogio(x.tempo / 1000) : '—'}</small></div></div>`;
  }
  function falhaHtml(r) {
    const e = r && r.erro;
    const k = e === 'sem_pais' ? 'rk_sem_pais' : e === 'rede' ? 'sem_conexao' : e === 'sem_conta' ? 'conta_sumiu' : 'erro_servidor';
    return `<div class="rk-cta"><p class="ol">${esc(t(k))}</p>${k === 'rk_sem_pais' ? '' : `<button class="bt azul peq ol" id="rk-denovo">${esc(t('tentar'))}</button>`}</div>`;
  }
  async function carregaRanking() {
    const pedido = ++rkPedido, aba = rkAba;
    const vivo = () => pedido === rkPedido && modalTipo === 'ranking';
    const corpo = $('rk-corpo'), rodape = $('rk-rodape');
    const ligaEntrar = () => { if ($('rk-entrar')) toque($('rk-entrar'), abreCriarConta); if ($('rk-denovo')) toque($('rk-denovo'), carregaRanking); };
    // (também no TENTAR DE NOVO: sem isto a janela ficava parada no "sem conexão" enquanto carregava)
    corpo.innerHTML = `<p class="rk-msg ol">${esc(t('carregando'))}</p>`; rodape.innerHTML = '';
    if (aba === 'amigos' && !Rede.conta()) {
      corpo.innerHTML = `<div class="rk-cta grande"><p class="ol">${esc(t('rk_amigos_cta'))}</p><button class="bt verde ol" id="rk-entrar">${esc(t('rk_entrar'))}</button></div>`;
      rodape.innerHTML = ''; ligaEntrar(); return;
    }
    // o recorde que ainda não foi entra antes (senão o jogador se vê fora do lugar)
    if (Rede.conta() && Rede.pendente()) await enviaAgora();
    if (!vivo()) return;
    if (aba === 'amigos') {
      const A = await atualizaAmigos(true);
      if (!vivo()) return;
      const c = Rede.conta();
      if (!c) return carregaRanking(); // (a conta sumiu do servidor no caminho)
      if (!A) { corpo.innerHTML = falhaHtml(erroAmigos); rodape.innerHTML = ''; ligaEntrar(); return; }
      const eu = { eu: true, id: c.id, nome: c.nome, pais: c.pais, avatar: P.d.perfil.avatar, insignia: insigniaMinha(), estrelas: c.estrelas || 0, fases: c.fases || 0, tempo: c.tempo };
      // mesma ordem do servidor: estrelas, tempo médio, id
      const L = A.amigos.concat([eu]).sort((a, b) => (b.estrelas - a.estrelas) || ((a.tempo || 1e12) - (b.tempo || 1e12)) || String(a.id).localeCompare(String(b.id)));
      corpo.innerHTML = `<button class="bt verde peq ol rk-add" id="rk-add">+ ${esc(t('add_amigo'))}</button>` +
        (A.recebidos.length ? `<p class="rk-sec ol">${esc(t('convites'))}</p>` + A.recebidos.map(x => `<div class="rk-linha conv">${avatarDe(x.avatar, x.insignia, 'mini')}
          <div class="rk-nome"><div class="ol">${esc(x.nome)}</div><small>${bandeira(x.pais)} ${esc(t('rk_quer'))}</small></div>
          <button class="bt verde mini ol" data-aceita="${esc(x.id)}">${esc(t('aceitar'))}</button><button class="bt cinza mini ol" data-recusa="${esc(x.id)}">✕</button></div>`).join('') : '') +
        (A.amigos.length ? `<p class="rk-sec ol">${esc(t('rk_amigos'))}</p>` : '') +
        `<div class="rk-lista">${L.map((x, i) => linhaRk(Object.assign({ pos: i + 1 }, x), x.eu ? null : x.id)).join('')}</div>` +
        (A.amigos.length ? '' : `<p class="rk-msg peq ol">${esc(t('rk_sem_amigos'))}</p>`) +
        (A.enviados.length ? `<p class="rk-sec ol">${esc(t('aguardando'))}</p>` + A.enviados.map(x => `<div class="rk-linha env">${avatarDe(x.avatar, '', 'mini')}
          <div class="rk-nome"><div class="ol">${esc(x.nome)}</div></div><button class="bt cinza mini ol" data-cancela="${esc(x.id)}">${esc(t('cancelar'))}</button></div>`).join('') : '');
      rodape.innerHTML = `<p class="rk-dica ol">${rico(t('seu_nome_e', { nome: c.nome }))}</p>`;
      toque($('rk-add'), abreAddAmigo);
      const acao = (b, fn, msg) => toque(b, async () => {
        if (b.disabled) return; b.disabled = true;
        const r = await fn(b);
        if (!vivo()) return;
        if (r && r.ok) { if (msg) toast(t(msg)); carregaRanking(); } else { b.disabled = false; toast(textoErro(r)); }
      });
      corpo.querySelectorAll('[data-aceita]').forEach(b => acao(b, x => Rede.responde(x.dataset.aceita, true), 'amigo_aceito'));
      corpo.querySelectorAll('[data-recusa]').forEach(b => acao(b, x => Rede.responde(x.dataset.recusa, false)));
      corpo.querySelectorAll('[data-cancela]').forEach(b => acao(b, x => Rede.remove(x.dataset.cancela)));
      corpo.querySelectorAll('[data-amigo]').forEach(l => toque(l, () => confirmaRemoverAmigo(l.dataset.amigo, l.dataset.nome)));
      return;
    }
    const r = await Rede.ranking(aba, paisDoAparelho());
    if (!vivo()) return;
    const c = Rede.conta();
    if (!r || !r.ok) { corpo.innerHTML = falhaHtml(r); rodape.innerHTML = ''; ligaEntrar(); return; }
    corpo.innerHTML = r.lista.length ? `<div class="rk-lista">${r.lista.map(x => linhaRk(x)).join('')}</div>` : `<p class="rk-msg ol">${esc(t('rk_vazio'))}</p>`;
    // rodapé: quem ainda não tem nome é convidado a entrar; quem está abaixo do 5º lugar vê a própria
    // linha fixa (sem precisar rolar para se achar); quem está no topo vê de quantos jogadores
    rodape.innerHTML = !c ? `<div class="rk-cta"><p class="ol">${esc(t('rk_fora'))}</p><button class="bt verde peq ol" id="rk-entrar">${esc(t('rk_entrar'))}</button></div>`
      : r.eu ? (r.eu.pos <= 5 ? `<p class="rk-dica ol">${esc(t('rk_de', { n: num(r.total) }))}</p>` : linhaRk(r.eu))
      : `<p class="rk-dica ol">${esc(t('rk_como_entrar'))}</p>`;
    ligaEntrar();
  }
  function confirmaRemoverAmigo(id, nome) {
    abreModal('amigo-remover', `<div class="janela" style="--y:560"><p class="ol" style="font-size:38px">${esc(t('remover_amigo', { nome }))}</p>
      <div class="botoes lado"><button class="bt cinza peq ol" id="ar-sim">${esc(t('sim'))}</button><button class="bt verde peq ol" id="ar-nao">${esc(t('nao'))}</button></div></div>`);
    toque($('ar-sim'), async () => {
      const b = $('ar-sim'); if (b.disabled) return; b.disabled = true;
      const r = await Rede.remove(id);
      if (modalTipo !== 'amigo-remover') return;
      if (!r.ok) { b.disabled = false; return toast(textoErro(r)); }
      abreRanking('amigos');
    });
    toque($('ar-nao'), () => abreRanking('amigos'));
  }
  function abreAddAmigo() {
    const c = Rede.conta(); if (!c) return abreCriarConta();
    abreModal('amigo-novo', `<div class="janela cn" style="--y:150"><h2 class="ol5">${esc(t('add_amigo'))}</h2>
      <p class="ol">${esc(t('add_amigo_txt'))}</p>
      <input id="am-nome" class="campo" type="text" maxlength="16" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="${esc(t('nome_usuario'))}">
      <p id="am-msg" class="campo-msg"></p>
      <div class="botoes lado"><button class="bt verde peq ol" id="am-ok">${esc(t('enviar_convite'))}</button><button class="bt cinza peq ol" id="am-voltar">${esc(t('voltar'))}</button></div>
      <p class="rk-dica ol">${rico(t('seu_nome_e', { nome: c.nome }))}</p></div>`);
    const inp = $('am-nome'), msg = $('am-msg');
    const envia = async () => {
      const nome = Rede.nomeFinal(inp.value), bt = $('am-ok'); inp.value = nome;
      if (!Rede.nomeValido(nome)) return erroCampo(msg, t('amigo_nao_achou'));
      if (bt.disabled) return; bt.disabled = true;
      msg.classList.remove('erro'); msg.textContent = t('carregando');
      const r = await Rede.convida(nome);
      if (modalTipo !== 'amigo-novo') return;
      bt.disabled = false;
      if (r.ok) { Som.toca('moeda'); toast(t(r.estado === 'amigos' ? 'amigo_aceito' : 'convite_enviado', { nome: r.nome })); return abreRanking('amigos'); }
      erroCampo(msg, textoErro(r));
    };
    ligaCampo(inp, Rede.limpaNome, envia, msg);
    toque($('am-ok'), envia);
    toque($('am-voltar'), () => abreRanking('amigos'));
  }

  // ---------- conta: criar (nome), entrar com código, ver o código, trocar nome, apagar ----------
  function abreCriarConta() {
    if (Rede.conta()) return abreRanking();
    const pais = paisDoAparelho();
    abreModal('conta-nova', `<div class="janela cn" style="--y:100"><h2 class="ol5">${esc(t('conta_titulo'))}</h2>
      <div class="cn-topo">${avatarHtml('grande')}<p class="ol">${esc(t('conta_txt'))}</p></div>
      <input id="cn-nome" class="campo" type="text" maxlength="16" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${esc(t('nome_usuario'))}">
      <p id="cn-msg" class="campo-msg">${esc(t('nome_regra'))}</p>
      <div class="botoes"><button class="bt verde ol" id="cn-ok">${esc(t('criar'))}</button>
      <div class="botoes lado" style="margin-top:0"><button class="bt azul peq ol" id="cn-codigo">${esc(t('tenho_codigo'))}</button><button class="bt cinza peq ol" id="cn-voltar">${esc(t('voltar'))}</button></div></div>
      <p class="cn-priv">${esc(t('conta_priv'))}${bandeira(pais) ? ' ' + bandeira(pais) : ''}</p></div>`);
    const inp = $('cn-nome'), msg = $('cn-msg');
    const envia = async () => {
      const nome = Rede.nomeFinal(inp.value), bt = $('cn-ok'); inp.value = nome;
      if (!Rede.nomeValido(nome)) return erroCampo(msg, t('nome_regra'));
      if (bt.disabled) return; bt.disabled = true;
      msg.classList.remove('erro'); msg.textContent = t('carregando');
      const r = await Rede.cria(nome, { pais, avatar: P.d.perfil.avatar || 'seta-azul', insignia: insigniaMinha() });
      if (r.ok) {
        // (mesmo que a janela tenha fechado no caminho: os recordes que ele já tem vão já, e a conta
        // entra na cópia da nuvem — a que a nuvem trazia e ainda não tinha voltado vai para a reserva)
        if (contaNuvem) { Rede.guardaReserva(contaNuvem); contaNuvem = null; }
        enviaDepois(0); nuvemGuarda(0);
        if (modalTipo !== 'conta-nova') return;
        Som.toca('vitoria'); vibra(30, 120); toast(t('conta_criada', { nome: r.nome }));
        return depoisDeCriarConta();
      }
      if (modalTipo !== 'conta-nova') return;
      // (outra conta entrou no celular enquanto esta era criada — a que voltou da nuvem: ela fica)
      if (r.erro === 'ja_tem') return abreRanking('mundo');
      bt.disabled = false; erroCampo(msg, textoErro(r));
    };
    ligaCampo(inp, Rede.limpaNome, envia, msg);
    toque($('cn-ok'), envia);
    toque($('cn-codigo'), abreCodigo);
    toque($('cn-voltar'), () => abreRanking());
  }
  function abreCodigo() {
    const tem = !!Rede.conta(), ant = Rede.antiga();
    abreModal('conta-codigo', `<div class="janela cn" style="--y:150"><h2 class="ol5">${esc(t('entrar_codigo'))}</h2>
      <p class="ol">${esc(t(tem ? 'codigo_troca_txt' : 'codigo_txt'))}</p>
      <input id="cc-cod" class="campo codigo" type="text" maxlength="19" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="XXXX-XXXX-XXXX-XXXX">
      <p id="cc-msg" class="campo-msg"></p>
      <div class="botoes lado"><button class="bt verde peq ol" id="cc-ok">${esc(t('entrar'))}</button><button class="bt cinza peq ol" id="cc-voltar">${esc(t('voltar'))}</button></div>
      ${ant ? `<p class="ct-aviso ol">${esc(t('conta_antiga', { nome: ant.nome || '?' }))}</p><button class="bt azul peq ol" id="cc-antiga">${esc(t('usar_esta'))}</button>` : ''}</div>`);
    const inp = $('cc-cod'), msg = $('cc-msg');
    const envia = async () => {
      const bt = $('cc-ok');
      if (!Rede.normaliza(inp.value)) return erroCampo(msg, t('codigo_errado'));
      if (bt.disabled) return; bt.disabled = true;
      msg.classList.remove('erro'); msg.textContent = t('carregando');
      const r = await Rede.entra(inp.value);
      if (r.ok) {
        // (a conta que a nuvem trazia e ainda não tinha voltado vai para a reserva: não se perde)
        if (contaNuvem && contaNuvem.chave !== Rede.conta().chave) Rede.guardaReserva(contaNuvem);
        contaNuvem = null;
        amigosCache = null; fotoPedida = ''; enviaDepois(0); nuvemGuarda(0); // (os recordes deste celular vão para a conta; a nuvem guarda a conta nova)
        if (modalTipo !== 'conta-codigo') return;
        toast(t('conta_voltou', { nome: r.nome }));
        return abreRanking('mundo');
      }
      if (modalTipo !== 'conta-codigo') return;
      bt.disabled = false; erroCampo(msg, textoErro(r));
    };
    ligaCampo(inp, s => s.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1-'), envia, msg);
    toque($('cc-ok'), envia);
    if ($('cc-antiga')) toque($('cc-antiga'), () => { inp.value = Rede.formata(ant.chave); envia(); });
    toque($('cc-voltar'), () => tem ? abreConta() : abreCriarConta());
  }
  function abreConta() {
    const c = Rede.conta(); if (!c) return abrePerfil();
    abreModal('conta', `<div class="janela" style="--y:150"><h2 class="ol5">${esc(t('conta'))}</h2>
      <div class="linha"><span>${esc(maiuscula(t('nome_usuario')))}</span><b>${esc(c.nome)}</b></div>
      <div class="linha"><span>${esc(t('pais'))}</span><b>${bandeira(c.pais)} ${esc(c.pais || '—')}</b></div>
      <p class="ol ct-tit">${esc(t('codigo_conta'))}</p>
      <div class="ct-cod ol" id="ct-cod">${esc(Rede.formata(c.chave))}</div>
      <p class="ct-aviso ol">${esc(t('codigo_aviso'))}</p>
      <div class="botoes lado"><button class="bt azul peq ol" id="ct-copiar">${esc(t('copiar'))}</button><button class="bt azul peq ol" id="ct-nome">${esc(t('trocar_nome'))}</button></div>
      <div class="botoes lado" style="margin-top:16px"><button class="bt cinza peq ol" id="ct-outra">${esc(t('entrar_outro'))}</button><button class="bt cinza peq ol" id="ct-apagar">${esc(t('apagar_conta'))}</button></div>
      <div class="botoes" style="margin-top:20px"><button class="bt verde peq ol" id="ct-voltar">${esc(t('voltar'))}</button></div></div>`);
    toque($('ct-copiar'), () => copia(Rede.formata(c.chave)));
    toque($('ct-nome'), abreRenomear);
    toque($('ct-outra'), abreCodigo);
    toque($('ct-apagar'), confirmaApagarConta);
    toque($('ct-voltar'), () => abrePerfil());
  }
  function abreRenomear() {
    const c = Rede.conta(); if (!c) return abrePerfil();
    abreModal('conta-nome', `<div class="janela cn" style="--y:150"><h2 class="ol5">${esc(t('trocar_nome'))}</h2>
      <p class="ol">${esc(t('renomear_txt'))}</p>
      <input id="rn-nome" class="campo" type="text" maxlength="16" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done">
      <p id="rn-msg" class="campo-msg">${esc(t('nome_regra'))}</p>
      <div class="botoes lado"><button class="bt verde peq ol" id="rn-ok">${esc(t('salvar_nome'))}</button><button class="bt cinza peq ol" id="rn-voltar">${esc(t('voltar'))}</button></div></div>`);
    const inp = $('rn-nome'), msg = $('rn-msg');
    inp.value = c.nome;
    const envia = async () => {
      const nome = Rede.nomeFinal(inp.value), bt = $('rn-ok'); inp.value = nome;
      if (nome === c.nome) return abreConta();
      if (!Rede.nomeValido(nome)) return erroCampo(msg, t('nome_regra'));
      if (bt.disabled) return; bt.disabled = true;
      msg.classList.remove('erro'); msg.textContent = t('carregando');
      const r = await Rede.renomeia(nome);
      if (modalTipo !== 'conta-nome') return;
      bt.disabled = false;
      if (r.ok) { toast(t('nome_trocado', { nome: r.nome })); return abreConta(); }
      erroCampo(msg, textoErro(r));
    };
    ligaCampo(inp, Rede.limpaNome, envia, msg);
    toque($('rn-ok'), envia);
    toque($('rn-voltar'), abreConta);
  }
  function confirmaApagarConta() {
    abreModal('conta-apagar', `<div class="janela" style="--y:470"><p class="ol" style="font-size:36px">${esc(t('apagar_conta_txt'))}</p>
      <div class="botoes lado"><button class="bt cinza peq ol" id="ca-sim">${esc(t('apagar_conta'))}</button><button class="bt verde peq ol" id="ca-nao">${esc(t('nao'))}</button></div></div>`);
    toque($('ca-sim'), async () => {
      const b = $('ca-sim'); if (b.disabled) return; b.disabled = true;
      const r = await Rede.apaga();
      if (r.ok) { amigosCache = null; toast(t('conta_apagada')); atualizaBadges(); nuvemGuarda(0); }
      if (modalTipo !== 'conta-apagar') return;
      if (!r.ok) { b.disabled = false; return toast(textoErro(r)); }
      abrePerfil();
    });
    toque($('ca-nao'), abreConta);
  }

  // ---------- amigos no mapa do Classic e na vitória ----------
  // a foto de cada amigo em cima da fase em que ele está (até 3 por fase, "+N" se tiver mais)
  function desenhaAmigosMapa() {
    const m = $('c-mapa'); if (!m) return;
    m.querySelectorAll('.amigos-selo').forEach(e => e.remove());
    if (!temAmigos()) return;
    const A = ARENAS[arenaVista], b0 = BASE[arenaVista], por = new Map();
    for (const f of amigosCache.amigos) {
      const k = Math.max(1, Math.min(totalClassic, f.nivel || 1)) - 1;
      if (k >= b0 && k < b0 + A.n) { if (!por.has(k)) por.set(k, []); por.get(k).push(f); }
    }
    for (const [k, fs] of por) {
      const [x, y] = A.selos[k - b0], el = document.createElement('button');
      el.className = 'amigos-selo aperta';
      el.style.left = (x + 40) + 'px'; el.style.top = (y - 50) + 'px';
      el.innerHTML = fs.slice(0, 3).map(f => avatarDe(f.avatar, f.insignia, 'micro')).join('') + (fs.length > 3 ? `<span class="am-mais ol">+${fs.length - 3}</span>` : '');
      toque(el, () => abreFaseAmigos(k));
      m.appendChild(el);
    }
  }
  function linhaTempo(x, pos) {
    return `<div class="rk-linha${x.eu ? ' eu' : ''}"><span class="rk-pos${pos <= 3 ? ' p' + pos : ''} ol">${pos}</span>${avatarDe(x.avatar, x.insignia, 'mini')}
      <div class="rk-nome"><div class="ol">${esc(x.nome)}${x.eu ? ` <i class="rk-voce">${esc(t('voce'))}</i>` : ''}</div></div>
      <div class="rk-num"><b class="ol">${relogio(x.tempo / 1000)}</b><small class="ol">${'★'.repeat(x.estrelas || 0)}</small></div></div>`;
  }
  let faPedido = 0;
  async function abreFaseAmigos(k) {
    const pedido = ++faPedido;
    const aqui = ((amigosCache && amigosCache.amigos) || []).filter(f => (f.nivel || 1) - 1 === k);
    const a = daFase(k).a;
    abreModal('fase-amigos', `<div class="janela" style="--y:230"><h2 class="ol5">${esc(t('fase_n', { n: k - BASE[a] + 1 }))}</h2>
      <p class="ol fa-sub">${esc(t('arena_n', { n: a + 1 }))}</p>
      ${aqui.length ? `<p class="rk-sec ol">${esc(t('estao_aqui'))}</p><div class="fa-aqui">${aqui.map(f => `<div class="fa-amigo">${avatarDe(f.avatar, f.insignia, 'mini')}<span class="ol">${esc(f.nome)}</span></div>`).join('')}</div>` : ''}
      <p class="rk-sec ol">${esc(t('recordes_amigos'))}</p>
      <div id="fa-lista" class="rk-lista curta"><p class="rk-msg peq ol">${esc(t('carregando'))}</p></div>
      <div class="botoes lado">${P.liberada('classic', k) ? `<button class="bt verde peq ol" id="fa-jogar">${esc(t('jogar'))}</button>` : ''}<button class="bt cinza peq ol" id="fa-fechar">${esc(t('fechar'))}</button></div></div>`);
    if ($('fa-jogar')) toque($('fa-jogar'), () => { fechaModal(); iniciaFase('classic', k); });
    toque($('fa-fechar'), fechaModal);
    const r = await Rede.fase(k + 1);
    const el = pedido === faPedido && modalTipo === 'fase-amigos' ? $('fa-lista') : null;
    if (!el) return;
    if (!r || !r.ok) { el.innerHTML = `<p class="rk-msg peq ol">${esc(textoErro(r))}</p>`; return; }
    el.innerHTML = r.lista.length ? r.lista.map((x, i) => linhaTempo(x, i + 1)).join('') : `<p class="rk-msg peq ol">${esc(t('ninguem_fez'))}</p>`;
  }
  // vitória no Classic: o meu MELHOR tempo nesta fase contra o dos amigos (até 4: os 3 primeiros e eu)
  let vsPedido = 0;
  async function comparaAmigos(k) {
    const pedido = ++vsPedido;
    const r = await Rede.fase(k + 1);
    const el = $('vs-amigos');
    if (pedido !== vsPedido || modalTipo !== 'resultado' || !el || !r || !r.ok) return;
    const meu = Math.round((P.d.tempos.classic[k] || 0) * 1000), c = Rede.conta();
    const L = r.lista.filter(x => !x.eu);
    if (!L.length || !meu || !c) return; // nenhum amigo fez esta fase: nada a comparar
    L.push({ eu: true, nome: c.nome, avatar: P.d.perfil.avatar, insignia: insigniaMinha(), tempo: meu });
    L.sort((a, b) => a.tempo - b.tempo);
    const eu = L.findIndex(x => x.eu), mostra = L.slice(0, 3);
    if (eu >= 3) mostra.push(L[eu]);
    el.innerHTML = `<div class="vs-t ol">${esc(t('vs_amigos'))}</div><div class="vs-lista">${mostra.map(x => `<div class="vs-item${x.eu ? ' eu' : ''}">
      <span class="vs-pos ol">${L.indexOf(x) + 1}</span>${avatarDe(x.avatar, x.insignia, 'micro')}<span class="vs-nome ol">${esc(x.eu ? t('voce') : x.nome)}</span><b class="ol">${relogio(x.tempo / 1000)}</b></div>`).join('')}</div>`;
    el.classList.add('on');
  }

  // ================= MONETIZAÇÃO (0.9) =================
  // Pedidos do dono e GDD (seção 6): anúncio PREMIADO só por escolha do jogador (roleta, reviver,
  // energia, poder), INTERSTICIAL só saindo de uma vitória e com freio, compras na Play (sem anúncios,
  // passe reviver, diamantes, moedas) e o progresso salvo no Play Games — com a conta do ranking junto
  // (dono, 25/09: "ninguém guarda código"). As pontes Android são as do Nitrovenant (verificadas no
  // celular); as regras de cada parte estão em anuncios.js, loja.js e nuvem.js.
  const Anuncios = window.Anuncios, Loja = window.Loja, Nuvem = window.Nuvem;
  const CATALOGO = cfg.loja_catalogo;
  // regras dos anúncios: as do jogo, com o que o servidor mandou por cima (em cache no aparelho)
  let configRemota = (function () { try { return JSON.parse(localStorage.getItem('quiver-config') || 'null'); } catch (e) { return null; } })();
  const regras = () => Anuncios.regras(cfg.anuncios, configRemota && configRemota.d && configRemota.d.anuncios);
  async function buscaConfig() {
    if (configRemota && Date.now() - configRemota.t < 6 * 3600e3) return;
    const r = await Rede.config();
    if (!r) return;
    configRemota = { t: Date.now(), d: r };
    try { localStorage.setItem('quiver-config', JSON.stringify(configRemota)); } catch (e) { }
  }
  const estAnuncios = () => P.d.anuncios || (P.d.anuncios = { dia: null, usados: {}, desde: 0, ultimo: 0 });
  // quantos premiados deste tipo ainda cabem hoje
  const restaAnuncio = (tipo, lim) => Anuncios.restam(estAnuncios(), tipo, lim, P.hoje());
  // oferece o vídeo? Só com o Android tendo um premiado JÁ carregado (tocar e ouvir "indisponível" é
  // pior do que não oferecer) e ainda cabendo hoje
  const ofereceVideo = (tipo, lim) => Anuncios.nativo() && Anuncios.temPremiado() && restaAnuncio(tipo, lim) > 0;
  // Mostra um premiado. `ganhou()` só roda se a Unity disser que ele assistiu até o fim.
  function premiado(tipo, ganhou) {
    if (Anuncios.ocupado()) return;
    Anuncios.pede(true, (ok, apareceu) => {
      if (ok) { Anuncios.usa(estAnuncios(), tipo, P.hoje()); P.salva(); ganhou(); }
      else toast(t(apareceu ? 'anuncio_incompleto' : 'anuncio_indisponivel'));
    });
  }
  // cada vitória conta para o intersticial (que só aparece quando o jogador SAI da janela dela)
  function contaVitoriaAnuncio() { const e = estAnuncios(); e.desde = (e.desde || 0) + 1; }
  // saindo de uma vitória: talvez um intersticial; `segue` roda depois (tenha aparecido ou não). Com um
  // anúncio já no ar, o toque é ignorado (senão o jogo seguia por baixo do anúncio).
  function talvezIntersticial(segue) {
    if (Anuncios.ocupado()) return;
    const quer = Anuncios.querIntersticial(estAnuncios(), regras().intersticial, { semAnuncios: !!P.d.semAnuncios, vitorias: P.d.stats.vitorias || 0, agora: Date.now() });
    if (!quer) return segue();
    Anuncios.pede(false, (ok, apareceu) => {
      // (lido agora, não antes: a nuvem pode ter trocado o perfil enquanto o anúncio passava)
      if (apareceu) { const e = estAnuncios(); e.desde = 0; e.ultimo = Date.now(); P.salva(); }
      segue();
    });
  }

  // ---------- LOJA com dinheiro ----------
  let compraEsperando = null, erroLojaVisto = 0;
  // o botão de um item pago: comprado, em análise (boleto/Pix), preço escrito pela Play, esperando a
  // Play ("…") ou indisponível (sem loja, erro, ou a Play respondeu sem este item)
  function botaoPago(c) {
    if (c.permanente && Loja.tem(c.id)) return `<span class="ms-feita ol">${esc(t('comprado_ok'))}</span>`;
    if (Loja.emAnalise(c.id)) return `<span class="lj-analise ol">${esc(t('em_analise'))}</span>`;
    const preco = Loja.preco(c.id);
    if (!preco) return `<button class="bt cinza peq ol" disabled>${esc(Loja.indisponivel(c.id) ? t('loja_indisponivel') : '…')}</button>`;
    return `<button class="bt verde peq ol" data-pago="${esc(c.id)}">${esc(preco)}</button>`;
  }
  // a loja respondeu (preços, compras, erro): as PERMANENTES obedecem a ela — e só quando ela sabe
  function lojaMudou() {
    if (Loja.sabe()) {
      const sa = Loja.tem('sem_anuncios'), pr = Loja.tem('passe_reviver');
      if (sa !== !!P.d.semAnuncios || pr !== !!P.d.passeReviver) { P.d.semAnuncios = sa; P.d.passeReviver = pr; P.salva(); }
    }
    if (Loja.erroSeq !== erroLojaVisto) {
      erroLojaVisto = Loja.erroSeq;
      if (compraEsperando && Loja.erro && Loja.erro !== 'cancelado') toast(t('compra_falhou'));
      if (Loja.erro) compraEsperando = null;
    }
    if (compraEsperando && Loja.tem(compraEsperando)) { compraEsperando = null; toast(t('compra_ok')); Som.toca('vitoria'); vibra(40, 140); }
    if (modalTipo === 'loja') abreLoja(true);
  }
  // um pacote pago chegou: dá (uma vez por compra) e GRAVA; depois avisa o Android, que registra no
  // disco e só então consome (loja.js, regra 3). Já entregue antes: só registra (o Android consome).
  function entregaCompra(e) {
    const dado = Loja.entrega(P.d, CATALOGO, e);
    if (dado) {
      compraEsperando = null;
      P.salva(); nuvemGuarda(0);
      Som.toca('vitoria'); vibra(40, 140); atualizaSaldo();
      FX.jato(470, Jogo.oc + 700, 50, { tipo: 'brilho', cores: ['#3ee6ff', '#fff', '#ffd23a'], vel: 900, g: 700, vida: 1.1, tam: 12 });
      toast(dado.gemas ? t('ganhou_gemas', { n: num(dado.gemas) }) : t('ganhou_moedas', { n: num(dado.moedas) }));
      if (modalTipo === 'loja') abreLoja(true);
    }
    Loja.registra(e.token, dado ? dado.gemas : 0, dado ? dado.moedas : 0);
  }
  // O registro do Android: compras entregues que ainda não se provaram gravadas no disco. A que o perfil
  // não tem VOLTA (o app morreu antes de o perfil chegar ao disco). A que o perfil LIDO DO DISCO nesta
  // abertura já tinha sai do registro (o que foi entregue nesta sessão só se confirma na próxima).
  let entreguesNoDisco = new Set();
  function registroDaLoja(lista) {
    const confirmar = [];
    let g = 0, m = 0;
    for (const r of lista) {
      const d = Loja.devolve(P.d, r);
      if (d) { g += d.gemas; m += d.moedas; } else if (entreguesNoDisco.has(r.t)) confirmar.push(r.t);
    }
    if (g || m) {
      P.salva(); nuvemGuarda(0); atualizaSaldo();
      toast(g ? t('ganhou_gemas', { n: num(g) }) : t('ganhou_moedas', { n: num(m) }));
      if (modalTipo === 'loja') abreLoja(true);
    }
    Loja.confirma(confirmar);
  }

  // ---------- SALVAR PROGRESSO (Play Games) ----------
  // (esperaSalvo: o número da gravação que o botão SALVAR pediu — o Android confirma pelo número)
  let nuvemT = 0, lendoNuvem = false, leituras = 0, nuvemNova = false, ultimaGravacao = '', esperaSalvo = 0;
  // A conta do ranking que veio na nuvem e ainda espera o servidor confirmar. Até lá, ela CONTINUA indo
  // nas gravações: sem isto, uma falha de rede na restauração gravaria a nuvem sem a conta, e ela nunca
  // mais voltaria em celular nenhum.
  let contaNuvem = null, restaurando = false;
  const contasAvisadas = new Set();
  const contaParaNuvem = () => Rede.conta() || contaNuvem;
  // grava a cópia na nuvem AGORA. Cópia igual à última enviada não sai de novo (ir para o fundo chama
  // isto várias vezes: onPause, perda de foco, aba escondida).
  // Devolve o número da gravação (0 = não foi; -1 = igual à última, nada a gravar).
  function nuvemGrava(forca) {
    clearTimeout(nuvemT);
    if (nuvemNova) return 0;
    const pk = Nuvem.pacote(P.d, contaParaNuvem()), s = JSON.stringify(pk);
    if (!forca && s === ultimaGravacao) return -1;
    const n = Nuvem.salvar(pk);
    if (n) ultimaGravacao = s;
    return n;
  }
  // grava com espera: várias mudanças seguidas viram uma gravação só
  function nuvemGuarda(ms) {
    clearTimeout(nuvemT);
    nuvemT = setTimeout(() => nuvemGrava(false), ms == null ? 4000 : ms);
  }
  // LÊ a nuvem (conectado e ainda sem ler); antes de ler, ninguém grava
  function nuvemLe() { if (Nuvem.ligado && !Nuvem.lido && !lendoNuvem) { lendoNuvem = true; Nuvem.carregar(); } }
  function nuvemMudou() {
    if (Nuvem.erro === 'salvar-falhou' || Nuvem.erro === 'conflito-falhou') ultimaGravacao = ''; // (a próxima gravação sai de novo)
    // o aviso do botão SALVAR: pela gravação DELE (uma confirmação ou falha de outra não vale)
    if (esperaSalvo) {
      if (Nuvem.salvoSeq >= esperaSalvo) { esperaSalvo = 0; toast(t('progresso_salvo')); }
      else if (Nuvem.falhouSeq >= esperaSalvo || !Nuvem.ligado) { esperaSalvo = 0; toast(t('sem_conexao')); }
    }
    if (lendoNuvem && !Nuvem.lido && Nuvem.erro) {
      // a leitura falhou: tenta de novo MAIS TARDE — em 30, 60 e 90 s, na volta ao app e no botão das
      // Configurações. Nunca na hora (virava um laço de leituras sem fim).
      lendoNuvem = false;
      if (++leituras <= 3) setTimeout(nuvemLe, 30000 * leituras);
    } else nuvemLe();
    if (modalTipo === 'config') abreConfig();
  }
  // a cópia da nuvem chegou (ou um conflito entre dois aparelhos): funde com a deste aparelho
  function nuvemChegou(pacote, conflito) {
    // (no conflito, a leitura só termina quando a fusão voltar do Android: nada de ler de novo antes)
    if (!conflito) lendoNuvem = false;
    // cópia de uma versão MAIS NOVA do jogo (o jogador atualizou noutro celular): este app não a entende,
    // então não junta e não grava por cima dela
    if (pacote && (pacote.v > 1 || (pacote.perfil && pacote.perfil.v > 1))) { nuvemNova = true; return; }
    // (APAGAR PROGRESSO já vem resolvido na fusão: a cópia de um apagamento mais novo vence — nuvem.js)
    if (pacote && pacote.perfil) {
      const eraNovo = Nuvem.fresco(P.d) && !Nuvem.fresco(pacote.perfil);
      P.d = P.normaliza(Nuvem.fundir(P.d, pacote.perfil), cfg); P.salva();
      lojaMudou(); // (as compras permanentes: quem manda é a loja, nunca a nuvem)
      // celular novo herda também volume e idioma: valem já, não só na próxima abertura
      aplicaVolumes();
      if (P.d.idioma && P.d.idioma !== lang && I18N.T[P.d.idioma]) { lang = P.d.idioma; aplicaIdioma(); }
      atualizaSaldo(); atualizaEnergia(); aplicaSkin(); atualizaBadges();
      if (tela === 'classic') desenhaClassic();
      redesenhaJanela();
      if (eraNovo) toast(t('progresso_recuperado'));
    }
    if (pacote && pacote.conta && typeof pacote.conta.chave === 'string') contaDaNuvem(pacote.conta);
    if (conflito) Nuvem.resolver(Nuvem.pacote(P.d, contaParaNuvem()));
    else nuvemGuarda(1500); // (a nuvem passa a ter também o que só este aparelho tinha)
  }
  // a nuvem trocou o perfil: a janela aberta se redesenha com os dados novos (os botões dela leem o
  // perfil de agora)
  function redesenhaJanela() {
    if (modalTipo === 'loja') abreLoja(true);
    else if (modalTipo === 'skins') abreSkins();
    else if (modalTipo === 'roleta' && !girando) abreRoleta();
    else if (modalTipo === 'missoes') abreMissoes();
    else if (modalTipo === 'conquistas') abreConquistas();
  }
  // a conta do ranking que veio na nuvem
  function contaDaNuvem(c) {
    const minha = Rede.conta();
    if (!minha) { contaNuvem = { chave: c.chave, id: c.id, nome: c.nome || '' }; restauraConta(); return; }
    if (minha.chave !== c.chave && !contasAvisadas.has(c.chave)) {
      // este celular já tem OUTRA conta: a da nuvem não se perde — vai para a reserva, e a tela do
      // código oferece VOLTAR PARA ELA
      contasAvisadas.add(c.chave);
      Rede.guardaReserva(c);
      toast(t('conta_na_nuvem', { nome: c.nome || '' }));
    }
  }
  // a conta da nuvem volta para este celular — só depois de o servidor confirmar que ela existe
  function restauraConta() {
    const c = contaNuvem;
    if (!c || restaurando) return;
    // (outra conta entrou neste celular enquanto esta esperava — por código, ou criada: a da nuvem vai
    // para a reserva, e a tela do código oferece VOLTAR PARA ELA)
    const minha = Rede.conta();
    if (minha) { if (minha.chave !== c.chave) Rede.guardaReserva(c); contaNuvem = null; return; }
    restaurando = true;
    Rede.entra(c.chave, { soSeVazio: true }).then(r => {
      restaurando = false;
      if (r && r.ok) { contaNuvem = null; amigosCache = null; toast(t('conta_voltou', { nome: r.nome })); enviaDepois(0); nuvemGuarda(0); }
      else if (r && r.erro === 'codigo') contaNuvem = null; // o servidor não conhece mais esta conta (apagada)
      else if (r && r.erro === 'ja_tem') { Rede.guardaReserva(c); contaNuvem = null; } // (outra entrou enquanto esta esperava: reserva)
      // (sem internet ou servidor fora: ela segue na nuvem e tenta de novo na volta ao app)
    });
  }
  // conta nova no ranking: ela fica salva SOZINHA na conta Google (Play Games) e no backup do celular.
  // Quem ainda não está no Play Games ganha o convite de um toque (ninguém guarda código — dono, 25/09).
  function depoisDeCriarConta() {
    if (!Nuvem.nativa() || !Nuvem.disponivel || Nuvem.ligado) return abreRanking('mundo');
    abreModal('conta-nuvem', `<div class="janela" style="--y:380"><h2 class="ol5">${esc(t('conta_segura'))}</h2>
      <p class="ol">${esc(t('conta_segura_txt'))}</p>
      <div class="botoes"><button class="bt verde ol" id="cs-conectar">${esc(t('conectar_play'))}</button>
      <button class="bt cinza peq ol" id="cs-depois">${esc(t('agora_nao'))}</button></div></div>`);
    toque($('cs-conectar'), () => { Nuvem.conectar(true); abreRanking('mundo'); });
    toque($('cs-depois'), () => abreRanking('mundo'));
  }
  // o botão SALVAR PROGRESSO das Configurações: conecta; conectado, grava agora (o aviso de "salvo" só
  // sai quando o Android confirma a gravação); sem a leitura ainda, tenta ler de novo
  function botaoNuvem() {
    if (!Nuvem.ligado) return Nuvem.conectar(true);
    if (!Nuvem.lido) { nuvemLe(); return toast(t('carregando')); }
    const n = nuvemGrava(true);
    if (n > 0) esperaSalvo = n; else toast(t('sem_conexao'));
  }
  // PRIVACIDADE (Configurações): o que sai do aparelho, e o botão do Google para rever a escolha de
  // anúncios onde a lei pede (Europa/Reino Unido)
  function abrePrivacidade() {
    const opc = Anuncios.opcoesObrigatorias();
    abreModal('privacidade', `<div class="janela rola" style="--y:140"><h2 class="ol5">${esc(t('privacidade'))}</h2>
      <p class="priv-txt">${rico(t('privacidade_txt'))}</p>
      <div class="botoes">${opc ? `<button class="bt azul peq ol" id="pv-opcoes">${esc(t('opcoes_anuncios'))}</button>` : ''}
      <button class="bt cinza peq ol" id="pv-voltar">${esc(t('voltar'))}</button></div></div>`);
    if ($('pv-opcoes')) toque($('pv-opcoes'), () => Anuncios.opcoes());
    toque($('pv-voltar'), abreConfig);
  }
  function iniciaMonetizacao() {
    // as compras que o perfil tem AGORA vieram do disco (nada da nuvem nem da loja chegou ainda)
    entreguesNoDisco = new Set(Loja.tokens(P.d));
    Loja.aoMudar = lojaMudou; Loja.aoEntregar = entregaCompra; Loja.aoRegistro = registroDaLoja;
    Loja.iniciar(CATALOGO);
    Nuvem.aoMudar = nuvemMudou; Nuvem.aoChegar = nuvemChegou;
    Nuvem.iniciar();
    P.aoSalvar = () => nuvemGuarda();
    buscaConfig();
  }
  // volta ao app: o que ficou pela metade tenta de novo (ler a nuvem, devolver a conta do ranking)
  function monetizacaoVolta() { nuvemLe(); restauraConta(); }

  // ================= ligações gerais =================
  function liga() {
    ligaMenu();
    ligaArrasto($('tela-rush'), mudaPagina);
    ligaArrasto($('tela-classic'), mudaArena);
    $('tabuleiro').addEventListener('pointerdown', tocaTabuleiro);
    ['a', 'b', 'c'].forEach(q => toque($('pw-' + q), () => usaPw($('pw-' + q).dataset.pw)));
    toque($('bt-pausa'), pausa);
    toque($('tut-ok'), avancaTutorial);
    toque($('tut-pular'), pulaTutorial);
    toque($('fim-ok'), () => vai('menu'));
    montaReinos();
    // o tremor vai num invólucro: o tabuleiro já usa `transform` para a perspectiva
    const inv = document.createElement('div'); inv.id = 'treme'; inv.style.cssText = 'position:absolute;inset:0;pointer-events:none';
    const tb = $('tabuleiro'); tb.parentNode.insertBefore(inv, tb); inv.appendChild(tb); tb.style.pointerEvents = 'auto';
    FX.liga($('fx'));
    // faíscas subindo do altar do menu (CSS puro: não custa nada parado)
    const fa = $('m-faiscas');
    for (let k = 0; k < 16; k++) {
      const i = document.createElement('i');
      i.style.left = (10 + Math.random() * 80) + '%';
      i.style.setProperty('--x', ((Math.random() - .5) * 160).toFixed(0) + 'px');
      i.style.setProperty('--t', (2.4 + Math.random() * 2.6).toFixed(2) + 's');
      i.style.setProperty('--d', (-Math.random() * 5).toFixed(2) + 's');
      i.style.transform = `scale(${(.5 + Math.random() * .9).toFixed(2)})`;
      fa.appendChild(i);
    }
    window.addEventListener('resize', layout);
    // trocou de aba/janela ou minimizou: pausa o jogo e cala a música; voltou: a música volta
    document.addEventListener('visibilitychange', () => { if (document.hidden) window.appPause(); else window.appResume(); });
    // (nos campos de texto do ranking o toque longo precisa do menu de colar)
    document.addEventListener('contextmenu', e => { if (!(e.target && e.target.closest && e.target.closest('input'))) e.preventDefault(); });
    // relógio da energia nas telas de fora do jogo e na janela de energia (inclusive por cima de
    // uma fase que acabou: antes a contagem ficava congelada ali)
    setInterval(() => {
      if (tela !== 'jogo' || modalTipo === 'energia') atualizaEnergia();
      // contagem do DESAFIO RELÂMPAGO (botão do menu e janela aberta)
      if (tela === 'menu') atualizaDesafioMenu();
      if (modalTipo === 'desafio') atualizaPromo();
    }, 1000);
  }
  // Android: o app avisa quando vai para segundo plano (ou perde o foco) e quando volta
  // (indo para segundo plano, a agenda de avisos é refeita com o estado de agora)
  // (0.9: saindo do app, a cópia da nuvem é gravada na hora — fechar pelos Recentes não perde nada)
  window.appPause = () => { pausa(); Som.fundo(true); Musica.bloqueia('fundo', true); agendaAvisos(); nuvemGuarda(0); };
  window.appResume = () => {
    Musica.bloqueia('fundo', false); Som.fundo(false); if (!pausado) Som.volta();
    confereAviso();
    // recorde que não foi por falta de internet: tenta de novo na volta
    if (Rede.pendente()) enviaDepois(2500);
    // (e a leitura da nuvem ou a volta da conta do ranking que falharam)
    monetizacaoVolta();
    // voltou das configurações do Android e os avisos mudaram: a janela mostra o estado novo (só
    // nesse caso: redesenhar a cada volta de foco jogava a janela para o topo)
    if (modalTipo === 'config' && avisosLigados() !== configAvisos) abreConfig();
  };
  window.appBack = () => {
    if ($('partilha').classList.contains('on')) { fechaPartilha(); return false; }
    if (tela === 'fim') { vai('menu'); return false; }
    if (modalTipo === 'pausa') { retoma(); return false; }
    if (modalTipo === 'resultado') return false;
    if (modalTipo === 'roleta' && girando) return false; // (a roda terminando de girar)
    if (modalTipo === 'fotos') { abrePerfil(); return false; }
    // ranking online: cada janela volta para a de onde veio
    if (modalTipo === 'perfil' && perfilDoRanking) { abreRanking(); return false; }
    if (['conta-nova', 'amigo-novo', 'amigo-remover'].includes(modalTipo)) { abreRanking(modalTipo === 'conta-nova' ? null : 'amigos'); return false; }
    if (modalTipo === 'conta-codigo') { if (Rede.conta()) abreConta(); else abreCriarConta(); return false; }
    if (modalTipo === 'conta-nuvem') { abreRanking('mundo'); return false; }
    if (modalTipo === 'privacidade') { abreConfig(); return false; }
    if (modalTipo === 'conta') { abrePerfil(); return false; }
    if (modalTipo === 'conta-nome' || modalTipo === 'conta-apagar') { abreConta(); return false; }
    if (['compra', 'diario', 'config', 'confirma', 'energia', 'desafio', 'avisos', 'missoes', 'conquistas', 'perfil', 'loja', 'skins', 'roleta', 'ranking', 'fase-amigos'].includes(modalTipo)) {
      if (tela === 'menu') atualizaBadges();
      fechaModal();
      if (tela === 'jogo') { if (S && S.ativo()) retomaJogo(); else saiDeFaseEncerrada(); }
      return false;
    }
    if (modalTipo === 'dados') { abreConfig(); return false; }
    if (tela === 'jogo') { pausa(); return false; }
    if (tela === 'rush' || tela === 'classic') { vai('menu'); return false; }
    if (tela === 'menu') return true;
    return false;
  };

  // para os testes automáticos
  window.Quiver = {
    vai, iniciaFase, mudaArena, get S() { return S; }, get tela() { return tela; }, projeta: (u, v) => projeta(u, v), P, t, lang: () => lang,
    calor: () => calor, arenaVista: () => arenaVista, abreClassic, abreFinal,
    tut: () => tut && { passo: tut.passos[tut.i].txt, i: tut.i, parado: tutParado },
    abreDesafio, desafioAberto, iniciaDesafio, confereAviso, agendaAvisos, desafio: () => desafio, modal: () => modalTipo,
    abreRanking, amigos: () => amigosCache, enviaAgora,
  };

  aplicaVolumes();
  aplicaSkin();
  liga();
  iniciaMonetizacao();
  // o app pode ter ido para segundo plano ANTES deste script existir (Home durante a abertura): o
  // aviso do Android se perdeu, então confere agora (o MainActivity repete o estado ao fim da carga)
  if (document.hidden) window.appPause();
  layout();
  montaHomografia(6, 7);
  aplicaIdioma();
  carrega();
})();
