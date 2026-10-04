'use strict';
// CAMADA COMUM DA WEB. Este arquivo SÓ é carregado pelo index.html da web, que o tools/build-web.mjs gera a
// partir do index do Android. O APK nunca o vê: no Android nada muda.
//
// O que é de cada portal (SDK, anúncios, save, eventos de jogo, idioma do portal) mora num ADAPTADOR,
// web/portais/<portal>.js, que o build copia como portal.js e carrega ANTES deste arquivo. O adaptador deixa
// as suas "tomadas" em window.NV_PORTAL (lista abaixo). Portal novo = adaptador novo + uma linha no build;
// este arquivo e o jogo não mudam.
//
// O que este arquivo faz, na ordem:
//  1. trava o que o navegador faria de errado num jogo (rolar a página com setas/roda, menu do botão direito);
//  2. baixa os scripts do jogo EM PARALELO com a partida do SDK do portal (tomada `iniciar`), mas só solta o
//     main.js depois dela, porque o main.js lê o save na carga e o save pode morar no SDK;
//  3. antes do main.js: põe o save no lugar (window.NVStore: o do portal ou o localStorage), cria a ponte de
//     anúncios (window.NitroAds) que conversa com o portal, transforma os 2 veículos pagos da Play em carros
//     de créditos e prende o volume do jogo ao "mudo" do portal e dos anúncios;
//  4. depois do main.js: avisa o portal quando o jogador está jogando só nas TRANSIÇÕES, cuida dos botões de
//     vídeo premiado, do anúncio nos botões (se o portal pedir), teclado de desktop, dica de controles e tela
//     de carga;
//  5. MODO DEITADO (tela mais larga que alta): câmera da corrida e da garagem, cenário largo e escala da
//     interface, embrulhando o Renderer e o Scenery por fora. Em pé, nada disso age.
//
// Regra de ouro: sem SDK (outro domínio, bloqueador, rede fora) o jogo roda igual, só sem anúncios.
//
// TOMADAS do adaptador (window.NV_PORTAL; todas opcionais — sem adaptador o jogo roda sem portal):
//  nome                    nome do portal
//  iniciar(api)            liga o SDK; devolve (ou promete) o objeto do SDK, ou null. `api` traz o que o
//                          adaptador usa daqui (NV_WEB, anota, localStorage protegido, mudo, painel...)
//  idioma() / aparelho()   idioma ('pt-BR'...) e aparelho ('desktop'|'mobile'|'tablet') segundo o portal;
//                          '' = o do navegador
//  loja(api)               o save (objeto com get/set, como o localStorage); sem ela, o localStorage
//  aoApagar()              o jogador apagou o progresso (a página recarrega em seguida)
//  semAnuncio(premiado)    '' se dá para pedir anúncio agora; senão o motivo ('noSdk', 'adblock'...)
//  anuncio(tipo, cb)       pede um anúncio ('midgame' ou 'rewarded') e responde UMA vez por cb.terminou(ganhou)
//                          (o anúncio passou; ganhou = assistido até o fim) ou cb.erro(codigo, motivo, naHora);
//                          cb.comecou() quando ele aparece na tela
//  anuncioRodando()        um anúncio está na tela agora?
//  erroDeAnuncio(codigo)   um anúncio falhou com este código
//  premiado()              botões de vídeo premiado: 'ok', 'off' (somem) ou 'adblock' (somem e uma linha explica)
//  antesDoPainel()         um painel com botão premiado vai aparecer
//  jogando(sim)            o jogador começou/parou de jogar (só nas transições, >= 1 s entre avisos)
//  fimDaCarga()            a tela de carga saiu
//  evento(nome, dados)     evento do motor do jogo ('start', 'finish', 'hellWin'...)
//  quadro()                a cada quadro
//  reviverOcasional        { andado, intervalo }: o reviver por vídeo só aparece com a fase `andado` andada e
//                          no máximo uma vez a cada `intervalo` ms; sem isto, sempre (como no Android)
//  intersticialNosBotoes   seletores dos botões que pedem anúncio ANTES de agir (ex. ['#play']); com isto o
//                          anúncio automático do fim da corrida (do main.js) não sai
//  podeIntersticial()      dá para pedir o anúncio dos botões agora? (true = pede)
//  antesDoJogo(api)        os scripts do jogo já rodaram e o main.js ainda não: última chance de trocar uma peça
//                          do jogo (ex.: como a música toca) ANTES dos ganchos de volume desta camada
//  mudoSemFoco             true = TODO o som fica mudo enquanto a página não tem o foco (clicou fora do jogo,
//                          outra janela) ou está escondida. A corrida NÃO pausa por isso (regra do dono: clicar
//                          fora não pausa); esconder a aba continua pausando, como sempre
//  intervaloJogando        ms mínimos entre dois avisos de `jogando` (padrão 1050)
(function () {
  var P = window.NV_PORTAL || {};
  var W = window.NV_WEB = {
    sdk: null, env: 'none', lang: 'en', device: 'desktop', started: false, firstStartAt: 0,
    adsOff: false, adblock: false, adActive: false, sdkMuted: false, portalPausa: false, travado: false,
    semFoco: false, saveVia: 'local', portal: P.nome || '', log: [],
  };
  var INTERVALO_JOGANDO = typeof P.intervaloJogando === 'number' && P.intervaloJogando >= 0 ? P.intervaloJogando : 1050;
  // Preço na web dos veículos que no Android são vendidos pela Google Play (decisão do dono: na web viram
  // carros de créditos). Escada da garagem: cada carro custa ~1,5x o anterior (Overlord = 540.000).
  // Golden = degrau seguinte da escada (o próprio motor já guardava 800.000 para ele).
  // Blade = mais um degrau (1,5x o Golden): tem o maior dano do jogo (62 contra 45 do Golden) e o
  // nitro mais forte (14.000), compensados pela blindagem mais baixa do topo (200).
  var PRECO_WEB = { car_golden: 800000, bike_blade: 1200000 };
  var SAVE = 'nitrovenant-v1';
  var doc = document, root = doc.documentElement;
  root.classList.add('nv-web');

  function $(id) { return doc.getElementById(id); }
  function agora() { return performance.now(); }
  function anota(o) { o.t = Math.round(agora()); W.log.push(o); if (W.log.length > 400) W.log.shift(); }
  // Chamada a uma tomada do adaptador, protegida: uma falha do portal nunca derruba o jogo.
  function tomada(nome) {
    var f = P[nome];
    if (typeof f !== 'function') return undefined;
    try { return f.apply(P, Array.prototype.slice.call(arguments, 1)); } catch (e) { console.warn('[web] portal.' + nome, e); return undefined; }
  }
  function lsLe(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsGrava(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsTira(k) { try { localStorage.removeItem(k); } catch (e) {} }

  // ---------------------------------------------------------------- 1. navegador
  // Roda do mouse, setas e espaço não podem rolar a página (nem a página do portal em volta).
  // Exceção: o painel (Configurações em janela baixa) rola por dentro — sem isso o FECHAR ficava fora de alcance.
  window.addEventListener('wheel', function (e) {
    var p = e.target && e.target.closest && e.target.closest('#modal .panel');
    if (p && p.scrollHeight > p.clientHeight + 1) return;
    e.preventDefault();
  }, { passive: false });
  doc.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  // Na fase de CAPTURA e registrado antes do teclado do jogo: o teclado corta a propagação do Espaço, e
  // isto aqui precisa rodar mesmo assim.
  window.addEventListener('keydown', function (e) {
    var k = e.code;
    if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight' || k === 'PageUp' || k === 'PageDown') e.preventDefault();
    // Espaço com um botão focado FORA da corrida (garagem, pausa, resultado, configurações) continua
    // apertando esse botão (acessibilidade). Em qualquer outro caso o Espaço não rola a página.
    if (k === 'Space' && !(doc.activeElement && doc.activeElement.tagName === 'BUTTON' && !corrida())) e.preventDefault();
  }, { passive: false, capture: true });

  // ---------------------------------------------------------------- 2. carga
  var eu = doc.currentScript;
  W.versao = (eu && eu.getAttribute('data-versao')) || '';
  // Arte de fundo LARGA da garagem (opcional, ver tools/build-web.mjs): no deitado ela substitui a faixa
  // cortada da arte em pé.
  W.fundoLargo = (eu && eu.getAttribute('data-fundo-largo')) || '';
  if (W.fundoLargo && /^ui\/[\w.-]+$/.test(W.fundoLargo)) {
    var estilo = doc.createElement('style');
    estilo.textContent = '@media (min-aspect-ratio:1101/1000){#gbg{background-image:url(' + W.fundoLargo + ');background-position:50% 50%}}';
    doc.head.appendChild(estilo);
  }
  var lista = ((eu && eu.getAttribute('data-scripts')) || '').split(/\s+/).filter(Boolean);
  var principal = (eu && eu.getAttribute('data-main')) || 'main.js';
  var barra = $('nvLoadBar'), feitos = 0, total = lista.length + 2;
  function progresso(extra) { if (barra) barra.style.width = Math.round(100 * Math.min(1, (feitos + (extra || 0)) / total)) + '%'; }
  var carregou = new Promise(function (fim) {
    if (!lista.length) { fim(); return; }
    var falta = lista.length;
    lista.forEach(function (src) {
      var s = doc.createElement('script');
      s.src = src; s.async = false; // baixa em paralelo, executa na ordem
      s.onload = s.onerror = function () { feitos++; progresso(); if (--falta === 0) fim(); };
      doc.body.appendChild(s);
    });
  });

  // O que o adaptador pode usar daqui (ele é carregado antes e só recebe isto no `iniciar`).
  var api = {
    W: W, anota: anota, agora: agora, $: $, SAVE: SAVE, lsLe: lsLe, lsGrava: lsGrava, lsTira: lsTira,
    perfilNovo: perfilNovo, aplicaMudo: aplicaMudo, confereJogo: confereJogo, arrumaModal: arrumaModal,
    corrida: corrida, modalFechado: modalFechado,
  };
  var portalPronto = Promise.resolve().then(function () { return tomada('iniciar', api); }).then(function (s) {
    W.sdk = s || W.sdk || null;
    feitos++; progresso();
    W.lang = idioma(); W.device = aparelho();
    root.classList.add(W.device === 'desktop' ? 'nv-desktop' : 'nv-touch');
    anota({ ev: 'sdk', env: W.env, ok: !!W.sdk });
  });

  // Nada do portal pode impedir o jogo de abrir: uma falha ali vira "sem SDK" e o main.js entra do mesmo jeito.
  Promise.all([portalPronto.catch(function (e) { console.warn('[web] SDK', e); W.sdk = null; }), carregou]).then(function () {
    try { antesDoMain(); } catch (e) { console.error('[web] antes do main', e); }
    var s = doc.createElement('script');
    s.src = principal; s.async = false;
    s.onload = function () { feitos++; progresso(); try { depoisDoMain(); } catch (e) { console.error('[web] depois do main', e); } };
    s.onerror = function () { fimDaCarga(); };
    doc.body.appendChild(s);
  });

  function idioma() {
    var loc = tomada('idioma') || '';
    if (!loc) loc = navigator.language || '';
    loc = String(loc).toLowerCase();
    return /^pt/.test(loc) ? 'pt' : /^es/.test(loc) ? 'es' : 'en';
  }
  function aparelho() {
    var t = tomada('aparelho'); if (t) return t;
    var fino = false; try { fino = matchMedia('(pointer:fine)').matches; } catch (e) {}
    return fino && !('ontouchstart' in window) ? 'desktop' : 'mobile';
  }

  // ---------------------------------------------------------------- 3. antes do main.js
  function perfilNovo() {
    // Jogador novo na web: idioma do aparelho, sem vídeos de abertura (entrada direta, 1 clique) e sem a
    // tela de tutorial no meio do caminho — os controles aparecem na própria corrida.
    var p = NV.defaults(); p.lang = W.lang; p.intro = false; p.tutorial = true;
    return JSON.stringify(p);
  }
  // Save sem portal (ou portal sem save próprio): o localStorage, como no Android. Jogador novo começa com o
  // perfil da web; "apagar progresso" (que grava os padrões do motor) volta ao começo da web.
  function lojaLocal() {
    W.saveVia = 'local';
    return {
      get: function (k) {
        var v = lsLe(k);
        if (k === SAVE && v == null) v = perfilNovo();
        return v;
      },
      set: function (k, v) {
        if (W.travado) return; // o progresso foi apagado: a página vai recarregar e nada pode ser gravado por cima
        if (k === SAVE && v === JSON.stringify(NV.defaults())) v = perfilNovo();
        localStorage.setItem(k, v); // sem espaço/bloqueado: o erro sobe e o main.js avisa o jogador
      },
    };
  }
  function antesDoMain() {
    // Peças que o portal troca no jogo (antes dos ganchos de volume abaixo, que embrulham o que ele deixar).
    tomada('antesDoJogo', api);
    // Modo deitado: ganchos na câmera e no cenário, e teto maior de instâncias de cenário (lido pela camada
    // 3D quando ela decodifica cada modelo, depois daqui).
    try { instalaDeitado(); sobeTetos(); } catch (e) { console.warn('[web] modo deitado', e); }
    // SAVE: o do portal (tomada `loja`) ou o localStorage.
    window.NVStore = tomada('loja', api) || lojaLocal();

    // VEÍCULOS PAGOS viram carros de créditos. Some todo caminho de loja: sem `iap` o main.js nunca abre
    // a tela de compra, nunca escreve "LOJA INDISPONÍVEL" e o motor deixa comprar com créditos.
    var maior = 0;
    NV.CARS.forEach(function (c) { if (!c.iap) maior = Math.max(maior, c.price); });
    NV.CARS.forEach(function (c) {
      if (!c.iap) return;
      c.price = PRECO_WEB[c.iap] || Math.round(maior * 1.5 / 1000) * 1000;
      delete c.iap;
    });
    NV.IAP = [];

    // PONTE DE ANÚNCIOS. O main.js já sabe falar com o Android por NitroAds.request(id, premiado) e
    // receber window.nativeAdResult(id, ganhou, apareceu). Aqui a mesma conversa vai para o portal (tomada
    // `anuncio`). Sem banner na corrida (proibido na web): race() não faz nada; quem avisa o portal é o
    // observador. Cuidados que valem para qualquer SDK (um deles troca os callbacks de um pedido em curso):
    //  - só um pedido ao portal por vez (`pedindo`, limpo só quando o portal responde); com um em curso, o
    //    novo é recusado na hora, sem tocar no SDK;
    //  - "anúncio na tela" (W.adActive) é estado GLOBAL: qualquer começo liga, qualquer fim desliga, mesmo
    //    que o pedido daquele aviso já tenha sido respondido ao jogo;
    //  - com o anúncio nos botões (tomada `intersticialNosBotoes`), o anúncio comum só sai quando o pedido
    //    vem de um botão (W.pedidoDoBotao): o automático do fim da corrida é recusado na hora.
    var pedindo = 0;
    window.NitroAds = {
      testAds: function () { return false; },
      race: function () {},
      privacy: function () {},
      request: function (id, premiado) {
        var fim = false;
        function resposta(ganhou, apareceu, motivo, naHora) {
          if (fim) return; fim = true;
          anota({ ev: 'adEnd', id: id, reward: !!premiado, earned: !!ganhou, why: motivo || '' });
          var avisa = function () { if (window.nativeAdResult) window.nativeAdResult(id, !!ganhou, !!apareceu); };
          // Recusa sem anúncio: responde ANTES de o navegador pintar a tela (microtarefa), senão o
          // "ABRINDO ANÚNCIO…" piscava a cada fim de fase. Depois de um anúncio de verdade, assíncrono como a
          // ponte do Android: o main.js termina o que estava fazendo antes de ouvir.
          if (naHora) { if (typeof queueMicrotask === 'function') queueMicrotask(avisa); else Promise.resolve().then(avisa); }
          else setTimeout(avisa, 0);
        }
        function acabou() { pedindo = 0; W.adActive = false; aplicaMudo(); confereJogo(); }
        var nao;
        if (!premiado && P.intersticialNosBotoes && !W.pedidoDoBotao) nao = 'soNoBotao';
        else { nao = tomada('semAnuncio', !!premiado); if (nao === undefined) nao = W.sdk ? '' : 'noSdk'; }
        if (nao) { resposta(false, false, nao, true); return; }
        // Pedido anterior ainda sem resposta do portal (o main.js desistiu dele por tempo). Teto de 3 min para
        // a trava não durar para sempre se o SDK perder um pedido.
        if (pedindo && agora() - pedindo < 180000) { resposta(false, false, 'busy', true); return; }
        pedindo = agora();
        anota({ ev: 'adRequest', id: id, reward: !!premiado });
        var cb = {
          comecou: function () {
            // Pausa e silêncio TOTAL enquanto o anúncio roda (música, efeitos, motor, vídeo).
            W.adActive = true; aplicaMudo(); confereJogo(); anota({ ev: 'adStarted', id: id });
            if (!fim && window.nativeAdShown) window.nativeAdShown(id);
            // Anúncio que só começou DEPOIS de o main.js desistir dele (relógio de 90 s): o jogo pode já estar
            // na corrida seguinte. A corrida pausa, senão o carro seguiria batendo por baixo do anúncio.
            var esperando = true;
            try { if (typeof pendingAd !== 'undefined') esperando = !!(pendingAd && pendingAd.id === id); } catch (e) {}
            if (fim || !esperando) { try { if (window.game && game.state === 'race' && typeof pause === 'function') pause(); } catch (e) {} }
          },
          // Prêmio SÓ aqui, no fim do anúncio, e só se o portal disse que ele foi assistido. Erro nunca dá prêmio.
          terminou: function (ganhou) { acabou(); resposta(!!premiado && !!ganhou, true, 'finished'); },
          erro: function (codigo, motivo, naHora) { acabou(); var c = codigo || 'other'; erroDeAnuncio(c); resposta(false, false, motivo || c, naHora); },
        };
        if (typeof P.anuncio !== 'function') { cb.erro('noPortal', '', true); return; }
        try { P.anuncio(premiado ? 'rewarded' : 'midgame', cb); } catch (e) { cb.erro((e && e.code) || 'other', 'throw'); }
      },
    };

    // VOLUME: o mudo do SDK (e o de anúncio) fica POR CIMA das opções do jogo. O main.js reaplica o
    // volume a cada quadro; com estes ganchos, enquanto houver mudo, o volume que chega é zero.
    if (typeof MotorAudio !== 'undefined' && MotorAudio.prototype.setVolume) {
      var sv = MotorAudio.prototype.setVolume;
      MotorAudio.prototype.setVolume = function (p) { return sv.call(this, mudo() ? 0 : p); };
    }
    if (window.Music) {
      var mv = window.Music.setVolume, mt = window.Music.tocar;
      window.Music.setVolume = function (v) { return mv.call(this, mudo() ? 0 : v); };
      // Nenhuma música é baixada antes da 1ª corrida: ela não tocaria mesmo (o navegador só libera som
      // depois de um clique) e pesaria no download inicial que o portal mede.
      window.Music.tocar = function (n) { if (!W.started) return; return mt.call(this, n); };
    }
  }
  // ================================================================ MODO DEITADO (paisagem)
  // Tela mais larga que alta (computador, tablet deitado, celular deitado) = modo deitado; o resto = o
  // modo em pé de sempre (coluna 9:16), sem mudança nenhuma. A MESMA consulta de mídia decide o CSS
  // (web.css) e este código, então os dois nunca discordam. Muda com a janela (tela cheia, girar o
  // tablet) sem recarregar e sem interromper a corrida: a câmera é recalculada a cada quadro.
  // Tudo aqui embrulha o Renderer e o Scenery do jogo por fora (protótipos), só na web: render.js e
  // scenery.js não mudam e o Android não vê nada disso.
  var DEITADO = '(min-aspect-ratio: 1101/1000)';
  var mqDeitado = window.matchMedia ? matchMedia(DEITADO) : null;
  W.paisagem = !!(mqDeitado && mqDeitado.matches);
  // Ajustes da câmera (exportados em NV_WEB.deitado para afinar no navegador).
  //  corrida: câmera do retrato -> câmera mais baixa e mais perto quanto mais larga a tela, para a pista de
  //    3 faixas ficar com ~40% da largura em vez de virar uma tira; o chão e o cenário preenchem os lados.
  //  garagem: o carro chega mais perto e vai para o centro da área livre à esquerda do painel.
  var D = W.deitado = {
    retrato: { olho: [0, 8.8, 16], alvo: [0, 0, -10] },
    perto: { olho: [0, 7.0, 12.0], alvo: [0, .2, -14] },
    aspA: 1.15, aspB: 1.78, extra: 1.25,
    garagem: { perto: .76, y: .52, plat: 4.7, platY: .26 },
  };
  // O 'resize' da janela chega ANTES do aviso da consulta de mídia, e o main.js redimensiona o canvas no
  // 'resize'. Por isso este ouvinte (registrado antes do main.js) relê a consulta na hora; e se o modo só
  // mudar no aviso da consulta, o canvas é redimensionado de novo ali.
  function modoDeitado() {
    var antes = W.paisagem, p = !!(mqDeitado && mqDeitado.matches);
    W.paisagem = p;
    root.classList.toggle('nv-paisagem', p);
    escalaDaTela();
    if (p !== antes) {
      medidaDe = ''; platDe = ''; anota({ ev: 'modo', deitado: p });
      // a resolução adaptativa segue a regra do modo novo (piso de pixels só no deitado)
      try { if (renderer) { if (renderer.__nvPedida != null) renderer.setScale(renderer.__nvPedida); renderer.resize(); } } catch (e) {}
    }
  }
  // --ui: escala da interface no deitado (CSS zoom). Os painéis foram desenhados para ~400 px de altura útil
  // de celular; no deitado quem limita é a ALTURA. Nunca abaixo de 0,88 (celular deitado, 390 px de altura).
  function escalaDaTela() {
    var h = innerHeight || 1, w = innerWidth || 1;
    var k = W.paisagem ? Math.max(.88, Math.min(1.75, h / 450, w / 820)) : 1;
    W.ui = k;
    root.style.setProperty('--ui', k.toFixed(3));
  }
  if (mqDeitado) { if (mqDeitado.addEventListener) mqDeitado.addEventListener('change', modoDeitado); else if (mqDeitado.addListener) mqDeitado.addListener(modoDeitado); }
  window.addEventListener('resize', modoDeitado);
  W.paisagem = !W.paisagem; modoDeitado();

  function mistura(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function cameraCorrida(r, olho, alvo) {
    var asp = (r.w || 1) / (r.h || 1);
    var t = Math.max(0, Math.min(D.extra, (asp - D.aspA) / (D.aspB - D.aspA)));
    var o = mistura(D.retrato.olho, D.perto.olho, t), a = mistura(D.retrato.alvo, D.perto.alvo, t);
    // o tremor da câmera vem somado ao olho/alvo do retrato: passa adiante igual
    var sx = olho[0], sy = olho[1] - 8.8;
    return [[o[0] + sx, o[1] + sy, o[2]], [a[0] + sx * .5, a[1] + sy * .5, a[2]]];
  }
  // Garagem: aproxima o olho do alvo e desloca a câmera de lado (sem girar) para o carro aparecer no
  // ponto (fx, fy) da tela, em fração da largura/altura.
  function cameraGaragem(r, olho, alvo) {
    // Quanto perto: o de D.garagem.perto, mas recuando se a plataforma não couber na área livre da esquerda
    // (tablet 4:3, janela estreita). Tamanho na tela é inversamente proporcional à distância.
    var k0 = D.garagem.perto, d0 = Math.hypot(olho[0] - alvo[0], olho[1] - alvo[1], olho[2] - alvo[2]);
    var f0 = 1 / Math.tan((r.fov || .72) / 2), w0 = D.garagem.plat * (r.h || 1) / 2 * f0 / (d0 * k0) * .95;
    var cabe = .58 * (W.areaGaragem || (r.w || 1) * .62);
    var k = Math.max(k0, k0 * w0 / cabe), o = [alvo[0] + (olho[0] - alvo[0]) * k, alvo[1] + (olho[1] - alvo[1]) * k, alvo[2] + (olho[2] - alvo[2]) * k];
    var z = [o[0] - alvo[0], o[1] - alvo[1], o[2] - alvo[2]], d = Math.hypot(z[0], z[1], z[2]);
    z = [z[0] / d, z[1] / d, z[2] / d];
    var x = [z[2], 0, -z[0]], lx = Math.hypot(x[0], x[2]) || 1; x = [x[0] / lx, 0, x[2] / lx];
    var y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
    var f = 1 / Math.tan((r.fov || .72) / 2), asp = (r.w || 1) / (r.h || 1);
    var nx = 2 * (W.carroX || .5) - 1, ny = 1 - 2 * D.garagem.y;
    var sx = -nx * d * asp / f, sy = -ny * d / f;
    var S = [x[0] * sx + y[0] * sy, x[1] * sx + y[1] * sy, x[2] * sx + y[2] * sy];
    return [[o[0] + S[0], o[1] + S[1], o[2] + S[2]], [alvo[0] + S[0], alvo[1] + S[1], alvo[2] + S[2]]];
  }
  // Onde o carro da garagem deve ficar: no meio da área livre entre a borda esquerda e o painel da direita.
  // A borda do painel sai da conta do próprio CSS (web.css, bloco DEITADO: .garageBottom com right:16px e
  // largura --col, dentro da garagem com zoom --ui), não de getBoundingClientRect: dentro de `zoom` a medida
  // muda conforme o navegador (Safari, Chrome < 128) e o carro ficaria fora do lugar. Só quando a tela muda.
  var medidaDe = '', MARGEM_COL = 16;
  function medeGaragem() {
    var chave = innerWidth + 'x' + innerHeight + ':' + (W.ui || 1);
    if (chave === medidaDe) return;
    var g = $('garage');
    if (!g || g.classList.contains('hidden')) return;
    var col = parseFloat(getComputedStyle(root).getPropertyValue('--col')) || 318;
    medidaDe = chave;
    var esq = innerWidth - (MARGEM_COL + col) * (W.ui || 1);
    W.areaGaragem = esq;
    W.carroX = Math.max(.25, Math.min(.5, esq / 2 / innerWidth + .01));
  }
  // A plataforma (arte HTML atrás do canvas) acompanha o carro: centro no chão debaixo dele, largura
  // proporcional ao tamanho do carro na tela. As setas e a faixa "na sua garagem" vêm junto.
  // --plat-*: em px da tela (a plataforma fica fora do zoom). --g-*: em px "da garagem", que tem zoom --ui
  // (px da tela ÷ ui), para setas e faixa caírem no mesmo lugar em qualquer escala.
  var platDe = '';
  function plataforma(r) {
    var m = r.project(0, 0, 0), t = r.project(0, 1, 0), a = r.project(0, .6, 0), ui = W.ui || 1;
    var ppu = Math.abs(m.y - t.y), w = D.garagem.plat * ppu, h = w * 444 / 900;
    var cx = m.x, cy = m.y - D.garagem.platY * ppu;
    var s = Math.round(cx) + ',' + Math.round(cy) + ',' + Math.round(w) + ',' + ui;
    if (s === platDe) return;
    platDe = s;
    var st = root.style, px = function (v) { return Math.round(v) + 'px'; };
    st.setProperty('--plat-x', px(cx)); st.setProperty('--plat-y', px(cy)); st.setProperty('--plat-w', px(w));
    // setas na altura do meio do carro; faixa logo abaixo da borda de baixo da plataforma
    var navTopo = a.y - 27 * ui;
    st.setProperty('--g-cx', px(cx / ui)); st.setProperty('--g-cy', px(a.y / ui)); st.setProperty('--g-pw', px(w / ui));
    st.setProperty('--g-faixa', px((cy + h * .5 - navTopo) / ui + 4));
  }
  function instalaDeitado() {
    // `class Renderer` no render.js é global mas NÃO vira window.Renderer: o nome é lido direto.
    var R = null; try { R = Renderer; } catch (e) { R = null; }
    if (!R || !R.prototype || R.prototype.__nvDeitado) return;
    R.prototype.__nvDeitado = true;
    var desenha = R.prototype.frame, camera = R.prototype.camera, redimensiona = R.prototype.resize, escala = R.prototype.setScale;
    // RESOLUÇÃO NO DEITADO. Teto de ~2,1 milhões de pixels (tela de alta densidade ou 4K em tela cheia não
    // desenha 8 milhões de pixels por quadro) e piso de ~0,5 milhão para a resolução adaptativa do jogo:
    // numa janela de 907x510 baixar a resolução quase não alivia (medido: o peso é a horda, na CPU) e só
    // borra a imagem. Em pé nada muda.
    var TETO_PX = 2.1e6, PISO_PX = 5e5;
    R.prototype.resize = function () {
      var s0 = this.scale;
      if (W.paisagem) {
        var d = Math.min(devicePixelRatio || 1, 2), px = (this.canvas.clientWidth || 1) * (this.canvas.clientHeight || 1) * d * d * (s0 || 1) * (s0 || 1);
        if (px > TETO_PX) this.scale = (s0 || 1) * Math.sqrt(TETO_PX / px);
      }
      try { return redimensiona.apply(this, arguments); } finally { this.scale = s0; }
    };
    R.prototype.setScale = function (s) {
      // a escala que o main.js PEDIU (antes do piso): reaplicada quando o modo muda
      this.__nvPedida = s;
      if (W.paisagem) {
        var d = Math.min(devicePixelRatio || 1, 2), base = (this.canvas.clientWidth || 1) * (this.canvas.clientHeight || 1) * d * d;
        s = Math.max(s, Math.min(1, Math.sqrt(PISO_PX / base)));
      }
      return escala.call(this, s);
    };
    R.prototype.frame = function (game, dt, garage) {
      this.__nvGaragem = !!garage;
      if (garage && W.paisagem) medeGaragem();
      return desenha.apply(this, arguments);
    };
    R.prototype.camera = function (olho, alvo) {
      if (!W.paisagem) return camera.call(this, olho, alvo);
      var v = this.__nvGaragem ? cameraGaragem(this, olho, alvo) : cameraCorrida(this, olho, alvo);
      var res = camera.call(this, v[0], v[1]);
      if (this.__nvGaragem) plataforma(this);
      return res;
    };
    instalaCenarioLargo();
  }

  // CENÁRIO LARGO. No retrato a câmera só vê a pista e uma faixa de calçada; deitado ela vê dezenas de metros
  // para cada lado, onde o chão acabava (x = ±28) e não havia nada. Aqui o chão vai até o horizonte e mais
  // fileiras de objetos do MESMO tema enchem os lados — sempre com os modelos de cenário que o jogo já tem,
  // desenhados como instâncias (uma chamada de desenho por modelo, nunca clones), e sorteados pelo índice de
  // mundo como no scenery.js: o mesmo objeto vem rolando até o carro, sem piscar.
  var LARGO = {
    sunny: { arvores: ['arvore'], longe: 'arvore', casa: 'casa', pedra: null },
    rainy: { arvores: ['pinheiro_verde'], longe: 'pinheiro_verde', casa: 'casa', pedra: null },
    desert: { arvores: ['cacto'], longe: 'cacto', casa: null, pedra: 'rocha' },
    snowy: { arvores: ['pinheiro_neve'], longe: 'pinheiro_neve', casa: 'casa_neve', pedra: null },
    city: { arvores: ['arvore_seca'], longe: 'predio_ruina', casa: 'predio_ruina', pedra: null },
    hell: { arvores: ['pinheiro_queimado'], longe: 'predio_queimado', casa: 'predio_queimado', pedra: null },
  };
  // Teto de instâncias por modelo de cenário (o manifesto do Android tem 16 a 40, pensado para o retrato).
  var TETO_LARGO = { arvore: 150, pinheiro_verde: 150, pinheiro_neve: 150, pinheiro_queimado: 150, arvore_seca: 150, cacto: 150, rocha: 110, casa: 48, casa_neve: 48, predio_ruina: 70, predio_queimado: 70 };
  function sobeTetos() {
    var M = window.NV_MODELS && window.NV_MODELS.models; if (!M) return;
    for (var n in TETO_LARGO) if (M[n] && M[n].scenery) M[n].max = Math.max(M[n].max || 40, TETO_LARGO[n]);
  }
  // CORREDOR PERTO DA CÂMERA (deitado). A câmera deitada é larga e baixa: o que fica ao lado da pista (poste,
  // árvore na beira) continuava na tela depois de passar do carro, até chegar rente à câmera, e aparecia
  // enorme e cortado no canto de baixo — a cabeça do poste virava uma placa cinza solta, "colada" na lente.
  // Daqui (3 m à frente do carro) até a câmera, cada peça ao lado da pista é empurrada para fora, tanto mais
  // quanto mais perto, e sai pela LATERAL da tela como no modo em pé. Antes disso nada muda (as laterais
  // continuam cheias) e a pista, o meio-fio e o chão nunca se mexem. Todas as peças da mesma distância
  // andam juntas (poste e cabeça, árvore e fogo do Inferno não se separam).
  var CORREDOR = W.corredor = { z0: -3, k: .8 };
  function corredor(x, z) {
    var d = z - CORREDOR.z0; if (d <= 0) return x;
    var s = CORREDOR.k * (d < 1 ? d * d / 2 : d - .5);
    return x < 0 ? x - s : x + s;
  }
  // peça ao lado da pista: não é chão nem faixa comprida, e fica fora da pista ou é alta (cabeça do poste)
  function aoLado(x, y, w, h, d) { return d < 30 && w < 30 && (Math.abs(x) >= 4.3 || y + h / 2 > 1); }
  // troca um método por um embrulho e devolve quem desfaz (volta o próprio do objeto ou o do protótipo)
  function troca(o, nome, embrulho) {
    var proprio = Object.prototype.hasOwnProperty.call(o, nome), antes = o[nome];
    o[nome] = embrulho(antes);
    return function () { if (proprio) o[nome] = antes; else delete o[nome]; };
  }
  function instalaCenarioLargo() {
    var S = window.Scenery;
    if (!S || !S.prototype || S.prototype.__nvLargo) return;
    S.prototype.__nvLargo = true;
    var desenha = S.prototype.draw, modelos = S.prototype.modelsFor;
    S.prototype.draw = function (game, dt) {
      if (!W.paisagem) return desenha.call(this, game, dt);
      var r = this.r, C = r.chars, volta = [], road;
      // Durante o desenho do cenário (o do jogo e o largo), toda peça ao lado da pista passa pelo corredor.
      volta.push(troca(r, 'box', function (f) { return function (x, y, z, w, h, d) { if (aoLado(x, y, w, h, d)) arguments[0] = corredor(x, z); return f.apply(this, arguments); }; }));
      volta.push(troca(r, 'fxBox', function (f) { return function (x, y, z, w, h, d) { if (aoLado(x, y, w, h, d)) arguments[0] = corredor(x, z); return f.apply(this, arguments); }; }));
      if (C && C.place) volta.push(troca(C, 'place', function (f) { return function (n, x, z) { arguments[1] = corredor(x, z); return f.apply(this, arguments); }; }));
      try {
        road = desenha.call(this, game, dt);
        try { cenarioLargo(this, game); } catch (e) { if (!W.erroLargo) { W.erroLargo = true; console.warn('[web] cenário largo', e); } }
      } finally { for (var i = volta.length - 1; i >= 0; i--) volta[i](); }
      return road;
    };
    // os modelos a mais entram no portão de carga da fase (sem objeto "pipocando" no meio da corrida)
    S.prototype.modelsFor = function (theme) {
      var base = modelos.call(this, theme), L = LARGO[theme], M = (window.NV_MODELS || { models: {} }).models;
      if (!L) return base;
      var extra = [].concat(L.arvores, [L.longe, L.casa, L.pedra]).filter(function (n) { return n && M[n] && base.indexOf(n) < 0; });
      return base.concat(extra.filter(function (n, i) { return extra.indexOf(n) === i; }));
    };
  }
  function cenarioLargo(sc, game) {
    var r = sc.r, C = r.chars, name = sc.name, T = sc.t, L = LARGO[name];
    if (!T || !L) return;
    var scroll = game.roadScroll || 0, time = r.visualTime || 0;
    var has = function (n) { return !!(n && C && C.has && C.has(n)); };
    // chão até o horizonte: laterais e o fundo atrás do fim do chão original
    var ground = name === 'hell' ? r.mix(0xff5410, 0xff8a22, .5 + .5 * Math.sin(time * 1.7)) : T.ground;
    r.box(-98, -.28, -70, 140, .2, 210, ground); r.box(98, -.28, -70, 140, .2, 210, ground);
    r.box(0, -.285, -142, 58, .2, 64, ground);
    // fileira 1: perto da calçada, do lado oposto ao que o jogo já enfeitou naquele trecho (|x| 11 a 18)
    var k, z, j;
    for (k = Math.floor((scroll - 14) / 9); k <= (scroll + 104) / 9; k++) {
      z = scroll - k * 9;
      for (j = 0; j < 2; j++) {
        var lado = j ? 1 : -1, a = sc.rnd(k, 41 + j), b = sc.rnd(k, 43 + j), c = sc.rnd(k, 45 + j);
        if (a < .25) continue;
        var arv = L.arvores[Math.floor(c * L.arvores.length) % L.arvores.length];
        var x = lado * (11 + b * 7), zz = z + (c - .5) * 6;
        if (has(arv)) C.place(arv, x, zz, (name === 'desert' ? 2.6 : 4.4) * (.8 + a * .55), c * 6.283, 1);
        if (name === 'desert' && L.pedra && a > .8 && has(L.pedra)) C.place(L.pedra, x + lado * 2, zz + 1, 1.4 + b, a * 6.283, 1.3);
      }
    }
    // fileira 2: meio (|x| 20 a 36): árvores e, de vez em quando, uma construção do tema
    for (k = Math.floor((scroll - 14) / 12); k <= (scroll + 108) / 12; k++) {
      z = scroll - k * 12;
      for (j = 0; j < 2; j++) {
        var ld = j ? 1 : -1, p = sc.rnd(k, 51 + j), q = sc.rnd(k, 53 + j), s = sc.rnd(k, 55 + j);
        var xx = ld * (20 + q * 16), z2 = z + (s - .5) * 8;
        if (L.casa && p < .22 && has(L.casa)) { var alto = name === 'city' || name === 'hell'; C.place(L.casa, xx, z2, alto ? 10 + q * 8 : 5.4 + q, ld > 0 ? 1.5708 : -1.5708, 1); continue; }
        var nArv = name === 'desert' ? 1 : 1 + Math.floor(s * 2.2);
        for (var i = 0; i < nArv; i++) {
          var a2 = L.arvores[(i + Math.floor(p * 7)) % L.arvores.length], u = sc.rnd(k, 60 + j * 5 + i);
          if (has(a2)) C.place(a2, xx + (i ? (u - .5) * 6 : 0), z2 + (i ? (u - .3) * 5 : 0), (name === 'desert' ? 2.8 : 5) * (.75 + u * .6), u * 6.283, 1);
        }
        if (L.pedra && q > .7 && has(L.pedra)) C.place(L.pedra, xx - ld * 3, z2 - 2, 1.6 + p * 2, q * 6.283, 1.2);
      }
    }
    // fileira 3: longe (|x| 38 a 62), mais espaçados — só onde a câmera enxerga (z < 0) e antes da névoa
    // apagar tudo: objeto alto demais lá no horizonte vira um "fantasma" claro contra o céu.
    for (k = Math.floor((scroll + 5) / 16); k <= (scroll + 96) / 16; k++) {
      z = scroll - k * 16;
      if (z > -5) continue;
      for (j = 0; j < 2; j++) {
        var l3 = j ? 1 : -1, e = sc.rnd(k, 71 + j), f = sc.rnd(k, 73 + j);
        var x3 = l3 * (38 + e * 24), m3 = L.longe;
        if (!has(m3)) continue;
        var alto3 = m3 === 'predio_ruina' || m3 === 'predio_queimado';
        C.place(m3, x3, z + (f - .5) * 10, alto3 ? 11 + f * 8 : m3 === 'rocha' ? 3.5 + f * 4 : 5.5 + f * 2.5, f * 6.283, alto3 ? 1 : 1.15);
        if (!alto3 && m3 !== 'rocha' && f > .4) C.place(m3, x3 + l3 * 5, z + (e - .5) * 8 + 4, 5 + e * 2, e * 6.283, 1.1);
      }
    }
  }

  function erroDeAnuncio(codigo) {
    anota({ ev: 'adError', code: codigo });
    if (codigo === 'adblock') W.adblock = true;
    tomada('erroDeAnuncio', codigo);
  }
  // Mudo por cima das opções do jogo: anúncio na tela, mudo do portal, pausa pedida pelo portal ou (se o portal
  // pedir `mudoSemFoco`) a página sem o foco.
  function mudo() { return W.adActive || W.sdkMuted || W.portalPausa || W.semFoco; }
  // FOCO (só com `mudoSemFoco`). Sem foco = página escondida ou outra coisa com o foco (o jogador clicou fora do
  // jogo, trocou de janela). Só o SOM muda: a corrida segue rodando.
  //  - SAÍDA (muta): evento blur, aba escondida, ou o document.hasFocus() que era true virar false (conferido a
  //    cada quadro: pega a saída que não avisou). Só a MUDANÇA conta: num celular dentro de um quadro o
  //    hasFocus() pode ficar false para sempre, e olhar o valor em si deixaria o jogo mudo para sempre.
  //  - VOLTA (som de volta): evento focus com a página visível, ou o jogador tocando/clicando/teclando NO jogo
  //    com a página visível (depois de um anúncio da plataforma o foco pode ficar na página dela até o 1º toque).
  var focoAntes = null;
  function lerFoco() { try { return doc.hasFocus(); } catch (e) { return null; } }
  function semFocoAgora(sem) {
    if (!P.mudoSemFoco || sem === W.semFoco) return;
    W.semFoco = sem;
    anota({ ev: sem ? 'semFoco' : 'comFoco' });
    aplicaMudo();
  }
  function olhaFoco() {
    if (!P.mudoSemFoco) return;
    if (doc.hidden) { semFocoAgora(true); return; }
    var f = lerFoco();
    if (focoAntes === true && f === false) semFocoAgora(true);
    else if (focoAntes === false && f === true) semFocoAgora(false);
    focoAntes = f;
  }
  if (P.mudoSemFoco) {
    // a borda do quadro compara sempre o PRÓPRIO hasFocus() (num celular ele pode dizer false mesmo com o evento
    // focus): os eventos só gravam o valor dele, nunca supõem
    window.addEventListener('blur', function () { focoAntes = lerFoco(); semFocoAgora(true); });
    window.addEventListener('focus', function () { focoAntes = lerFoco(); if (!doc.hidden) semFocoAgora(false); });
    doc.addEventListener('visibilitychange', function () { if (doc.hidden) semFocoAgora(true); else { var f = lerFoco(); focoAntes = f; if (f) semFocoAgora(false); } });
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { doc.addEventListener(ev, function () { if (!doc.hidden) semFocoAgora(false); }, { passive: true, capture: true }); });
    semFocoAgora(!!doc.hidden);
  }
  function aplicaMudo() {
    try {
      if (typeof motorAudio !== 'undefined' && window.game) { motorAudio.setVolume(game.p.sfx); if (mudo() && window.SFX) SFX.calaTudo(); }
      if (window.Music && window.game) { window.Music.setVolume(game.p.music); if (mudo()) window.Music.parar(); }
      var v = $('cineVid'); if (v && window.game) v.muted = mudo() || !game.p.sound;
    } catch (e) {}
  }

  // ---------------------------------------------------------------- 4. depois do main.js
  function corrida() { return !!(window.game && game.state === 'race' && modalFechado()); }
  function modalFechado() { var m = $('modal'); return !m || m.classList.contains('hidden'); }
  function jogando() {
    if (W.adActive || W.portalPausa || doc.hidden || !window.game) return false;
    if (game.state !== 'race' && game.state !== 'hellfall') return false;
    return modalFechado();
  }
  var estava = false, avisado = false, ultimoAviso = -1e9, adiado = 0;
  // O portal ouve "começou/parou de jogar" só nas TRANSIÇÕES: o estado é olhado a cada quadro, o aviso sai
  // quando muda. Há SDK que segura (e reclama no console) avisos com menos de 1 s entre si — pausar e voltar
  // rápido. Então o aviso espera completar 1 s desde o anterior e só sai se o estado AINDA for diferente.
  function confereJogo() {
    var j = jogando();
    if (j !== estava) {
      estava = j;
      if (j) {
        // Um botão que ficou focado (pausa, continuar) seria apertado pelo Enter no meio da corrida.
        try { if (doc.activeElement && doc.activeElement.blur && doc.activeElement !== doc.body) doc.activeElement.blur(); } catch (e) {}
        // Voltando a jogar (continuar, reviver, fim da carga do Inferno): nitro e metralhadora só seguem
        // ligados se a tecla deles estiver apertada AGORA. Nada ligado fora da corrida passa para dentro dela.
        try { if (!seguraNitro()) game.setBoost(false); if (!seguraTiro()) game.setFire(false); } catch (e) {}
      }
    }
    if (j === avisado) return;
    var falta = ultimoAviso + INTERVALO_JOGANDO - agora();
    if (falta > 0) { if (!adiado) adiado = setTimeout(function () { adiado = 0; confereJogo(); }, falta); return; }
    avisado = j; ultimoAviso = agora();
    if (j && !W.started) { W.started = true; W.firstStartAt = agora(); }
    tomada('jogando', j);
    anota({ ev: j ? 'gameplayStart' : 'gameplayStop', state: window.game ? game.state : '' });
  }

  var reviverPode = false, ultimoReviver = -1e9;
  function depoisDoMain() {
    if (!window.game) { fimDaCarga(); return; }
    semWebGL();
    // Eventos do motor, sem tocar no main.js: embrulha o aviso que ele já recebe.
    var original = game.emit;
    game.emit = function (e, d) {
      original(e, d);
      try { eventoDoJogo(e, d); } catch (x) {}
    };
    var quadro = typeof P.quadro === 'function' ? P.quadro : null;
    function laco() {
      olhaFoco();
      confereJogo();
      if (quadro) { try { quadro.call(P); } catch (e) {} }
      requestAnimationFrame(laco);
    }
    requestAnimationFrame(laco);
    doc.addEventListener('visibilitychange', confereJogo);

    // O relógio de segurança do main.js (90 s sem resposta, 20 min com o anúncio na tela) chama o
    // nativeAdResult direto, sem passar pela ponte. Se nenhum anúncio está de fato rodando no portal, o
    // "anúncio na tela" tem que desligar junto, senão som e teclado ficariam presos.
    var resultadoNativo = window.nativeAdResult;
    if (typeof resultadoNativo === 'function') {
      window.nativeAdResult = function () {
        if (W.adActive && !tomada('anuncioRodando')) { W.adActive = false; aplicaMudo(); confereJogo(); }
        return resultadoNativo.apply(this, arguments);
      };
    }

    // Vídeo de abertura: o main.js decide o mudo pelo som do jogo; o mudo do portal manda por cima.
    var cv = $('cineVid');
    if (cv) ['play', 'playing', 'volumechange'].forEach(function (ev) { cv.addEventListener(ev, function () { if (mudo() && !cv.muted) cv.muted = true; }); });

    // APAGAR PROGRESSO: o main.js grava e recarrega no mesmo instante. Na web o save pode ir para o portal
    // por mensagem e não ter assentado; a página recarregada traria o progresso antigo. Aqui grava e espera
    // 1,5 s antes de recarregar. Captura no documento, depois do som de clique do main.js: o onclick do
    // botão nunca roda.
    doc.addEventListener('click', function (e) {
      var b = e.target && e.target.closest && e.target.closest('#confirmReset');
      if (!b) return;
      e.stopPropagation(); e.preventDefault();
      if (b.disabled) return;
      b.disabled = true;
      apagaProgresso();
    }, true);

    var mc = $('modalContent');
    if (mc && window.MutationObserver) new MutationObserver(arrumaModal).observe(mc, { childList: true });

    teclado();
    portaoDeAnuncio();
    // iOS/Safari: o som só destrava dentro de um gesto (toque, clique ou tecla).
    var destrava = function () {
      try { if (typeof motorAudio !== 'undefined') motorAudio.unlock(); } catch (e) {}
      try { if (window.Music && window.Music.destrava) window.Music.destrava(); } catch (e) {}
    };
    ['touchend', 'click', 'keydown', 'pointerup'].forEach(function (ev) { doc.addEventListener(ev, destrava, { passive: true, capture: true }); });
    aplicaMudo();
    esperaGaragem();
  }

  function eventoDoJogo(e, d) {
    tomada('evento', e, d);
    // Dica de teclado no começo da fase (não na volta da pausa: aí o tempo de corrida já andou).
    if (e === 'start' && W.device === 'desktop' && (game.time || 0) < .5) mostraTeclas();
    if (e === 'finish') {
      escondeTeclas();
      if (game.win) reviverPode = false;
      else {
        // Reviver por vídeo: com `reviverOcasional` (regra de portal) só com a fase ao menos `andado` andada e
        // no máximo uma oferta a cada `intervalo`. Fora disso o jogador tem o TENTAR NOVAMENTE de sempre.
        var R = P.reviverOcasional;
        if (!R) reviverPode = true;
        else {
          var andou = game.end ? game.distance / game.end : 0;
          reviverPode = andou >= R.andado && agora() - ultimoReviver >= R.intervalo;
          if (reviverPode) ultimoReviver = agora();
        }
      }
    }
  }

  function apagaProgresso() {
    var novo = perfilNovo();
    try { NVStore.set(SAVE, novo); } catch (e) {}
    // Até a recarga nada mais é gravado: nos 1,5 s de espera o painel ainda responde (CANCELAR, opções) e
    // um save ali regravaria o progresso antigo por cima do apagado.
    W.travado = true;
    tomada('aoApagar');
    anota({ ev: 'apagou' });
    setTimeout(function () { location.reload(); }, 1500);
  }
  // Sem WebGL o main.js escreve um aviso para o Android ("atualize o Android System WebView"). Na web o
  // conserto é no navegador.
  var SEM_3D = {
    en: ['3D unavailable', 'Your browser could not start 3D graphics (WebGL). Update your browser or turn on hardware acceleration in its settings, then reload the page.'],
    pt: ['3D indisponível', 'Seu navegador não conseguiu iniciar os gráficos 3D (WebGL). Atualize o navegador ou ligue a aceleração de hardware nas configurações dele e recarregue a página.'],
    es: ['3D no disponible', 'Tu navegador no pudo iniciar los gráficos 3D (WebGL). Actualiza el navegador o activa la aceleración por hardware en su configuración y recarga la página.'],
  };
  function semWebGL() {
    var r = null; try { r = renderer; } catch (e) { r = null; }
    if (r) return;
    var p = doc.querySelector('#garage .panel'); if (!p) return;
    var t = SEM_3D[W.lang] || SEM_3D.en;
    p.innerHTML = '<h2></h2><p></p>'; p.firstChild.textContent = t[0]; p.lastChild.textContent = t[1];
  }

  // Botões de vídeo premiado no painel de resultado. Sem anúncio possível (portal sem anúncio agora, fora do
  // portal) eles SOMEM — botão sem efeito reprova. Com bloqueador, somem e uma linha explica.
  // Também corrige a versão escrita nas Configurações (o main.js traz o número fixo do Android).
  // PAINEL INTEIRO NA TELA (deitado). O painel tem a escala da interface (--ui); se ainda assim não couber na
  // altura (Configurações e resultado em 907x510, celular deitado), a escala dele desce o necessário para o
  // botão de baixo (FECHAR, PRÓXIMA FASE) aparecer sem rolar. Em pé nada muda.
  function encaixaPainel() {
    var p = doc.querySelector('#modal .panel'), m = $('modal');
    if (!p) return;
    p.style.zoom = '';
    if (!W.paisagem || !m || m.classList.contains('hidden')) return;
    // Pela rolagem do PRÓPRIO painel: scrollHeight/clientHeight estão nas unidades dele, então a razão vale
    // em qualquer navegador (medir a caixa na tela dentro de `zoom` muda de um navegador para outro), e o
    // limite é o de verdade (max-height do painel dentro do fundo com margem), não uma conta da janela.
    // Enquanto sobrar conteúdo escondido, a escala desce na proporção que falta; o texto pode quebrar
    // diferente na escala nova, por isso mais de uma volta.
    var z = W.ui || 1;
    for (var i = 0; i < 6 && z > .72 && p.clientHeight > 0 && p.scrollHeight > p.clientHeight + 1; i++) {
      z = Math.max(.72, z * p.clientHeight / p.scrollHeight * .995);
      p.style.zoom = z.toFixed(3);
    }
  }
  window.addEventListener('resize', function () { requestAnimationFrame(encaixaPainel); });
  function arrumaModal() {
    var mc = $('modalContent'); if (!mc) return;
    // depois de tudo o que este painel ainda vai mudar (botões premiados saem), antes de pintar
    requestAnimationFrame(encaixaPainel);
    var ver = mc.querySelector('.cfgVer');
    if (ver && W.versao && ver.textContent.indexOf('v' + W.versao) < 0) ver.innerHTML = 'NITROVENANT<br>v' + W.versao;
    var bonus = $('bonus'), rev = $('revive');
    if (!bonus && !rev) return;
    tomada('antesDoPainel');
    var estado = tomada('premiado');
    if (estado === undefined) estado = W.sdk ? 'ok' : 'off';
    if (estado !== 'ok') {
      if (bonus) bonus.remove();
      if (rev) rev.remove();
      if (estado === 'adblock' && !mc.querySelector('.nvAdblock')) {
        var p = doc.createElement('p');
        p.className = 'notice nvAdblock';
        p.textContent = texto('adblock');
        var antes = $('resultGarage');
        if (antes && antes.parentNode === mc) mc.insertBefore(p, antes); else mc.appendChild(p);
      }
      return;
    }
    if (rev && !reviverPode) rev.remove();
  }

  // ---------------------------------------------------------------- anúncio nos botões (se o portal pedir)
  // Há portal que quer o anúncio comum SÓ depois de um clique do jogador num botão fora da corrida: começar
  // (o anúncio "antes de jogar") e os botões do fim da fase (o "entre sessões"). O clique é segurado aqui, o
  // anúncio roda pelo mesmo showAd do main.js (painel "ABRINDO ANÚNCIO…", interface travada, relógio de
  // segurança) e, quando ele acaba — visto, recusado ou com erro —, o botão faz o que faria. Quem decide se o
  // anúncio sai mesmo (intervalo mínimo entre anúncios) é o SDK do portal. Sem anúncio possível, o botão age
  // na hora: nunca há clique morto.
  function portaoDeAnuncio() {
    var sel = P.intersticialNosBotoes;
    if (!sel || !sel.length || typeof showAd !== 'function') return;
    sel = sel.join(',');
    doc.addEventListener('click', function (e) {
      var b = e.target && e.target.closest && e.target.closest(sel);
      if (!b || b.disabled) return;
      var acao = b.onclick;
      if (typeof acao !== 'function') return;
      // Anúncio na tela ou já pedido: o clique não vale (a interface está travada).
      if (W.adActive || W.portalPausa || (typeof adBusy !== 'undefined' && adBusy)) { e.stopPropagation(); e.preventDefault(); return; }
      if (tomada('podeIntersticial') !== true) return;
      e.stopPropagation(); e.preventDefault();
      anota({ ev: 'portao', botao: b.id });
      // a fase carrega por trás do anúncio (o START faria isso mesmo, logo depois)
      if (b.id === 'play') { try { carregarFase(); } catch (x) {} }
      W.pedidoDoBotao = true;
      try {
        showAd(function () { try { acao.call(b); } catch (x) { console.error('[web] botão depois do anúncio', x); } }, false);
      } finally { W.pedidoDoBotao = false; }
    }, true);
  }

  // ---------------------------------------------------------------- teclado (desktop)
  // Setas/A-D = faixa · ↑/W/Espaço = pulo · segurar Shift = nitro · segurar F/S/↓ (ou o botão do mouse
  // parado na pista) = metralhadora · P ou Esc = pausa. Lê `code` (posição da tecla): com Shift
  // apertado `key` vira 'A' maiúsculo e o carro não trocaria de faixa durante o nitro.
  var NITRO = { ShiftLeft: 1, ShiftRight: 1, KeyN: 1 }, TIRO = { KeyF: 1, KeyS: 1, ArrowDown: 1 }, apertada = {};
  function seguraNitro() { for (var k in NITRO) if (apertada[k]) return true; return false; }
  function seguraTiro() { for (var k in TIRO) if (apertada[k]) return true; return false; }
  function teclado() {
    window.addEventListener('keydown', function (e) {
      if (!window.game) return;
      var k = e.code;
      if (NITRO[k] || TIRO[k]) apertada[k] = true;
      // ESPAÇO: o main.js liga o NITRO com ele no keydown e quem solta (no keyup) é este arquivo. Se ele
      // visse um Espaço fora da corrida (pausa, resultado, com Ctrl), o nitro ficava preso ligado. Aqui o
      // Espaço é PULO e o main.js nunca o recebe.
      if (k === 'Space') e.stopPropagation();
      // Anúncio pedido ou rodando: a interface fica travada até ele acabar. Sem isto o Esc do main.js
      // (voltar do resultado) levaria à garagem com o anúncio ainda na tela.
      if (W.adActive || W.portalPausa || (typeof adBusy !== 'undefined' && adBusy)) { e.preventDefault(); e.stopPropagation(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      // P e Esc alternam pausa e corrida: a REPETIÇÃO da tecla segurada não pode ficar alternando.
      if (k === 'KeyP') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) pausaOuVolta(); return; }
      if (k === 'Escape' && e.repeat) { e.preventDefault(); e.stopPropagation(); return; }
      if (!corrida()) return; // fora da corrida o main.js cuida (Esc fecha painel, etc.)
      var meu = true;
      if (k === 'ArrowLeft' || k === 'KeyA') { if (!e.repeat) game.move(-1); }
      else if (k === 'ArrowRight' || k === 'KeyD') { if (!e.repeat) game.move(1); }
      else if (k === 'ArrowUp' || k === 'KeyW' || k === 'Space') { if (!e.repeat) game.jump(); }
      else if (NITRO[k]) game.setBoost(true);
      else if (TIRO[k]) game.setFire(true);
      else meu = false;
      if (meu) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    window.addEventListener('keyup', function (e) {
      if (!window.game) return;
      var k = e.code;
      apertada[k] = false;
      if (NITRO[k]) { if (!seguraNitro()) game.setBoost(false); e.stopPropagation(); }
      else if (TIRO[k]) { if (!seguraTiro()) game.setFire(false); e.stopPropagation(); }
      else if (k === 'Space') { e.stopPropagation(); if (!seguraNitro()) game.setBoost(false); }
    }, true);
    // Janela perdeu o foco com a tecla apertada: solta tudo, senão o nitro ficaria preso.
    // Clicar fora do jogo NÃO pausa (decisão do dono, 01/10): a corrida segue, para o jogador não sair e
    // prestar atenção. Pausa só a manual (P, Esc ou o botão). Trocar de aba continua pausando (main.js).
    window.addEventListener('blur', function () { apertada = {}; try { game.setBoost(false); game.setFire(false); } catch (e) {} });
  }
  // Sem "trava do 1º clique" no painel de pausa: no portal o jogo fica num quadro, e o clique que devolve o
  // foco ao jogo (depois de clicar fora dele) É o jogador apertando CONTINUAR. A pausa que voltava sozinha
  // era a repetição da tecla P segurada, tratada acima (e.repeat).
  function pausaOuVolta() {
    if ((typeof adBusy !== 'undefined' && adBusy) || W.portalPausa) return;
    if (game.state === 'race' && modalFechado()) { if (window.appBack) window.appBack(); return; }
    if (game.state === 'paused' && !modalFechado()) { var r = $('resume'); if (r) r.click(); }
  }

  // ---------------------------------------------------------------- textos novos (en/pt/es)
  var TXT = {
    en: { lane: 'LANE', jump: 'JUMP', nitro: 'NITRO', mg: 'MACHINE GUN', pause: 'PAUSE', hold: 'hold', or: 'or', mouse: 'mouse',
      adblock: 'Video rewards are off while an ad blocker is active. The game works normally.' },
    pt: { lane: 'FAIXA', jump: 'PULO', nitro: 'NITRO', mg: 'METRALHADORA', pause: 'PAUSA', hold: 'segure', or: 'ou', mouse: 'mouse',
      adblock: 'Os prêmios em vídeo ficam desligados com bloqueador de anúncios. O jogo funciona normalmente.' },
    es: { lane: 'CARRIL', jump: 'SALTO', nitro: 'NITRO', mg: 'AMETRALLADORA', pause: 'PAUSA', hold: 'mantén', or: 'o', mouse: 'mouse',
      adblock: 'Las recompensas en video están desactivadas con un bloqueador de anuncios. El juego funciona normalmente.' },
  };
  function texto(k) { var l = (window.game && game.p.lang) || W.lang; return (TXT[l] && TXT[l][k]) || TXT.en[k]; }

  var teclasTimer = 0, primeiraVez = true;
  function mostraTeclas() {
    var race = $('race'); if (!race) return;
    var el = $('nvKeys');
    if (!el) { el = doc.createElement('div'); el.id = 'nvKeys'; el.setAttribute('aria-hidden', 'true'); race.appendChild(el); }
    var K = function (s) { return '<kbd>' + s + '</kbd>'; };
    el.innerHTML =
      '<div><span>' + texto('lane') + '</span><b>' + K('←') + K('→') + ' ' + texto('or') + ' ' + K('A') + K('D') + '</b></div>' +
      '<div><span>' + texto('jump') + '</span><b>' + K('↑') + K('W') + K('SPACE') + '</b></div>' +
      '<div><span>' + texto('nitro') + '</span><b>' + texto('hold') + ' ' + K('SHIFT') + '</b></div>' +
      '<div><span>' + texto('mg') + '</span><b>' + texto('hold') + ' ' + K('F') + ' ' + texto('or') + ' ' + texto('mouse') + '</b></div>' +
      '<div><span>' + texto('pause') + '</span><b>' + K('P') + K('ESC') + '</b></div>';
    el.classList.add('on');
    clearTimeout(teclasTimer);
    teclasTimer = setTimeout(escondeTeclas, primeiraVez ? 14000 : 8000);
    primeiraVez = false;
  }
  function escondeTeclas() { var el = $('nvKeys'); if (el) el.classList.remove('on'); }

  // ---------------------------------------------------------------- fim da tela de carga
  // A tela de carga sai quando a garagem está montada E o carro 3D já chegou (ou 4 s, o que vier antes):
  // sem isso o jogador via a garagem vazia e o carro "pipocando" um segundo depois.
  function esperaGaragem() {
    var t0 = agora();
    (function olha() {
      var pronto = false;
      try {
        var c = renderer && renderer.chars, M = window.NV_MODELS, nome = M && M.cars && M.cars[game.p.selected];
        pronto = !c || !c.ok || !nome || !!(c.models[nome] || c.failed[nome]);
      } catch (e) { pronto = true; }
      progresso(.5 * Math.min(1, (agora() - t0) / 4000));
      if (pronto || agora() - t0 > 4000) { fimDaCarga(); return; }
      setTimeout(olha, 80);
    })();
  }
  var cargaAcabou = false;
  function fimDaCarga() {
    if (cargaAcabou) return; cargaAcabou = true;
    feitos = total; progresso();
    var el = $('nvLoad');
    requestAnimationFrame(function () {
      if (el) { el.classList.add('saindo'); setTimeout(function () { el.remove(); }, 450); }
      tomada('fimDaCarga');
      anota({ ev: 'loadingStop' });
    });
  }
})();
