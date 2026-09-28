/* ==========================================================================
   LIPY HUB — gerador de nick do Free Fire (hub/pesquisa/nick-ff-spec.md)
   Regra de ouro: só sai daqui o que entra no jogo.
   - 12 caracteres, contados por ponto de código (Array.from), não por bytes
   - só caracteres do Plano Básico (até U+FFFF): letras "matemáticas" 𝐁𝐨𝐥𝐝 e emoji modernos ficam de fora
   - espaço comum não entra: vira o espaço invisível \u3164 (U+3164)
   - lista branca tirada de nicks reais do servidor Brasil (28/09/2026)
   ========================================================================== */
(function () {
  'use strict';
  var d = document, W = window;
  var raiz = d.querySelector('[data-nick]');
  if (!raiz) return;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var T = W.HUB_TEXTOS || {};
  var t = function (k, v) { var s = T[k] || k; if (v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }); return s; };
  var guarda = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  var LIM = 12, INV = '\u3164';
  var conta = function (s) { return Array.from(s).length; };

  /* ---------------- alfabetos (todos no Plano Básico) ---------------- */
  var ABC = 'abcdefghijklmnopqrstuvwxyz';
  var tabela = function (alvo) { var o = {}; Array.from(alvo).forEach(function (ch, i) { o[ABC[i]] = ch; o[ABC[i].toUpperCase()] = ch; }); return o; };
  var troca = function (tab) { return function (s) { return Array.from(s).map(function (c) { return tab[c] || c; }).join(''); }; };
  var desloca = function (s, fn) { return Array.from(s).map(function (c) { var n = c.charCodeAt(0); var r = fn(n); return r ? String.fromCharCode(r) : c; }).join(''); };
  var ESTILOS = [
    { id: 'normal', nome: 'Normal', f: function (s) { return s; } },
    { id: 'versalete', nome: 'Letras pequenas', f: troca(tabela('ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ')) },
    { id: 'sobre', nome: 'Sobrescrito', f: troca(tabela('ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ')) },
    { id: 'largura', nome: 'Largura total', f: function (s) { return desloca(s, function (n) { return (n >= 0x41 && n <= 0x5a) || (n >= 0x61 && n <= 0x7a) || (n >= 0x30 && n <= 0x39) ? n + 0xfee0 : 0; }); } },
    { id: 'circulo', nome: 'Em círculo', f: function (s) { return desloca(s, function (n) { return n >= 0x41 && n <= 0x5a ? 0x24b6 + n - 0x41 : n >= 0x61 && n <= 0x7a ? 0x24d0 + n - 0x61 : n >= 0x31 && n <= 0x39 ? 0x2460 + n - 0x31 : n === 0x30 ? 0x24ea : 0; }); } },
    { id: 'kanji', nome: 'Japonês', f: troca(tabela('卂乃匚刀乇下ム卄工丁长乚从几口尸Q尺丂丅凵リ山乂丫乙')) },
    { id: 'gamer', nome: 'Gamer', f: troca({ a: 'Λ', A: 'Λ', b: 'Ɓ', B: 'Ɓ', d: 'Ƌ', D: 'Ƌ', e: 'Σ', E: 'Σ', g: '₲', G: '₲', i: 'Ɨ', I: 'Ɨ', l: 'Ł', L: 'Ł', n: 'Ɲ', N: 'Ɲ', o: 'Ø', O: 'Ø', p: 'Ƥ', P: 'Ƥ', r: 'Ʀ', R: 'Ʀ', t: 'Ŧ', T: 'Ŧ', y: '¥', Y: '¥' }) }
  ];

  /* ---------------- modelos por estilo de nick ---------------- */
  var MOD = {
    insta: [function (n) { return '★彡' + n + '彡★'; }, function (n) { return '彡' + n + '彡'; }, function (n) { return '꧁' + n + '꧂'; }, function (n) { return '꧁༒' + n + '༒꧂'; }, function (n) { return '༺' + n + '༻'; }, function (n) { return '亗' + n + '亗'; }, function (n) { return '『' + n + '』'; }, function (n) { return '【' + n + '】'; }, function (n) { return '╰' + n + '╯'; }, function (n) { return '×͜×' + n; }],
    cla: [function (n, g) { return g + INV + n; }, function (n, g) { return g + '丶' + n; }, function (n, g) { return g + '・' + n; }, function (n, g) { return g + '┊' + n; }, function (n, g) { return g + '×' + n; }, function (n) { return 'ᴾᴿᴼ' + INV + n; }],
    fofo: [function (n) { return '♡' + n + '♡'; }, function (n) { return '꒰' + n + '꒱♡'; }, function (n) { return '✿' + n + '✿'; }, function (n) { return 'ᥫ᭡' + n; }, function (n) { return '⋆' + n + '⋆'; }, function (n) { return '❀' + n; }, function (n) { return n + '♡'; }, function (n) { return '☾' + n + '☽'; }],
    sombrio: [function (n) { return '✞' + n + '✞'; }, function (n) { return '☠' + n + '☠'; }, function (n) { return '†' + n + '†'; }, function (n) { return '⸸' + n; }, function (n) { return '♱' + n; }, function (n) { return '☬' + n + '☬'; }, function (n) { return n + '⚔'; }, function (n) { return '︻デ═' + n; }],
    japones: [function (n) { return n + '亗'; }, function (n) { return n + '么'; }, function (n) { return '乂' + n + '乂'; }, function (n) { return n + 'ツ'; }, function (n) { return '么' + n; }, function (n) { return n + '丶'; }, function (n) { return 'メ' + n + 'メ'; }, function (n) { return '炎' + n; }],
    realeza: [function (n) { return '♛' + n + '♛'; }, function (n) { return '♔' + n; }, function (n) { return n + '♚'; }, function (n) { return '★' + n + '★'; }, function (n) { return '☆' + n + '☆'; }, function (n) { return '⚡' + n + '⚡'; }, function (n) { return n + '™'; }],
    verificado: [function (n) { return n + '✓'; }, function (n) { return n + 'Ⓥ'; }, function (n) { return 'ᴮᴿ' + n + '✓'; }, function (n) { return n + '✔'; }, function (n) { return '♛' + n + '✓'; }]
  };
  var CATS = [['todos', 'Todos'], ['insta', 'Instaplayer'], ['cla', 'Clã / Pro'], ['fofo', 'Feminino / Fofo'], ['sombrio', 'Sombrio'], ['japones', 'Japonês'], ['realeza', 'Coroas e estrelas'], ['verificado', 'Verificado'], ['letras', 'Só letras']];

  /* ---------------- símbolos para inserir (gaveta) ---------------- */
  var SIMBOLOS = [
    ['Bordas', '꧁꧂༒༺༻《》『』【】「」〖〗╰╯┊┋║࿐᭄༄⳻⳺•・°~'],
    ['Estrelas', '★☆✧⭐✰✯⋆✦✩✵✮✶⚝'],
    ['Coroas', '♛♕♔♚'],
    ['Corações', '♡❤♥❦❥❧ღ'],
    ['Fofo', '✿❀☘❁⚘꒰꒱'],
    ['Cruzes', '†✞✝♱☩✛'],
    ['Sombrio', '☠☣☢⸸⚔☬'],
    ['Clima', '⚡☂☁☃❄☀☾☽☔'],
    ['Verificado', '™Ⓥ✓®ⓥ©✔'],
    ['Japonês', '亗么乂彡丶文乡ツッシヅメ々〆愛炎神忠鬼龍王影死狼侍夢天零闇'],
    ['Jogo', '♤♧♣♠♦♞♪♬♫☯♨✌∞∆⚜'],
    ['Números', '⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃①②③④⑤'],
    ['Espaços', INV + '\uffa0']
  ];
  var VARIA = '⚡❤⭐☔✅⛅⌛☀'; // emoji do Plano Básico: entram, mas a aparência muda de celular para celular
  var PROIBIDOS = /[卍卐]/g, TEM_PROIBIDO = /[卍卐]/; // 卍 卐: fora, sempre
  var INVISIVEIS = /[\u3164\uffa0\u2800]/;

  /* ---------------- limpeza do que a pessoa digita ---------------- */
  var aviso = $('[data-nick-aviso]');
  var limpa = function (s) {
    var avisos = [];
    s = s.trim();
    if (/ /.test(s)) { s = s.replace(/ /g, INV); avisos.push(t('Espaço trocado pelo espaço invisível (o Free Fire não aceita espaço comum).')); }
    s = s.replace(/[\ufe0e\ufe0f\u0000-\u001f\u007f]/g, '');
    if (TEM_PROIBIDO.test(s)) { s = s.replace(PROIBIDOS, ''); avisos.push(t('Removemos um símbolo proibido.')); }
    var astral = Array.from(s).filter(function (c) { return c.codePointAt(0) > 0xffff; });
    if (astral.length) { s = Array.from(s).filter(function (c) { return c.codePointAt(0) <= 0xffff; }).join(''); avisos.push(t('Removemos {n} símbolo(s) que o Free Fire não aceita (emoji novo ou letra de "fonte" especial).', { n: astral.length })); }
    s = s.replace(/^\u3164+|\u3164+$/g, '');
    if (/[֐-ࣿ]/.test(s) && /[A-Za-z]/.test(s)) avisos.push(t('Letras de hebraico ou árabe misturadas com latinas podem inverter a ordem do nick no jogo.'));
    if (s.indexOf('\uf8ff') >= 0) avisos.push(t('O símbolo da maçã só aparece para quem usa iPhone; no Android vira quadradinho.'));
    return { s: s, avisos: avisos };
  };

  /* ---------------- detector de "quadradinho": o celular desenha este símbolo? ---------------- */
  var cv = d.createElement('canvas'); cv.width = cv.height = 28;
  var cx = cv.getContext && cv.getContext('2d', { willReadFrequently: true });
  var desenho = function (ch) {
    if (!cx) return '';
    cx.clearRect(0, 0, 28, 28);
    cx.font = '22px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    cx.fillStyle = '#000';
    cx.fillText(ch, 2, 22);
    var px = cx.getImageData(0, 0, 28, 28).data, h = 0;
    for (var i = 3; i < px.length; i += 4) h = (h * 31 + px[i]) | 0;
    return h;
  };
  var TOFU = [desenho('\uffff'), desenho('\ue000'), desenho('\u0378')];
  var cacheGlifo = {};
  var semGlifo = function (ch) {
    if (!cx || ch.charCodeAt(0) < 0x2000 || INVISIVEIS.test(ch) || /[̀-ͯ]/.test(ch)) return false;
    if (cacheGlifo[ch] == null) cacheGlifo[ch] = TOFU.indexOf(desenho(ch)) >= 0;
    return cacheGlifo[ch];
  };

  /* ---------------- geração ---------------- */
  var campoNome = $('#nick-nome'), campoTag = $('#nick-tag'), contador = $('[data-nick-cont]'), lista = $('[data-nick-lista]'), mais = $('[data-nick-mais]');
  var cat = guarda.get('hub:nick:cat') || 'todos', semente = 1;
  var aleatorio = function () { semente = (semente * 16807) % 2147483647; return (semente - 1) / 2147483646; };
  var gera = function (nome, tag) {
    var base = nome || 'Lipy', g = tag || 'LIPY', saida = [], vistos = {};
    var bases = [base];
    if (conta(base) > 8) { var palavra = base.split(INV)[0]; bases.push(conta(palavra) >= 3 && conta(palavra) <= 8 ? palavra : Array.from(base).slice(0, 8).join('')); }
    var add = function (txt, rotulo, grupo) {
      if (!txt || vistos[txt] || conta(txt) > LIM) return;
      vistos[txt] = 1;
      saida.push({ t: txt, r: rotulo, g: grupo });
    };
    var cats = cat === 'todos' ? ['insta', 'cla', 'fofo', 'sombrio', 'japones', 'realeza', 'verificado'] : cat === 'letras' ? [] : [cat];
    bases.forEach(function (base) {
    if (cat === 'letras' || cat === 'todos') ESTILOS.forEach(function (e) { add(e.f(base), e.nome, 'letras'); });
    cats.forEach(function (c) {
      var rot = (CATS.filter(function (x) { return x[0] === c; })[0] || [0, c])[1];
      MOD[c].forEach(function (m) { ESTILOS.forEach(function (e) { add(m(e.f(base), c === 'cla' ? e.f(g) : g), rot + (e.id === 'normal' ? '' : ' · ' + e.nome), c); }); });
    });
    });
    // "Todos": intercala os grupos para a lista ter de tudo um pouco; "Gerar outras" embaralha dentro de cada grupo
    var grupos = {};
    saida.forEach(function (x) { (grupos[x.g] = grupos[x.g] || []).push(x); });
    Object.keys(grupos).forEach(function (k) { var a = grupos[k]; if (semente > 1) for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(aleatorio() * (i + 1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp; } });
    var chaves = Object.keys(grupos), final = [];
    for (var n = 0; final.length < 48 && chaves.some(function (k) { return grupos[k].length; }); n++) chaves.forEach(function (k) { if (grupos[k].length && final.length < 48) final.push(grupos[k].shift()); });
    return final;
  };

  var desenhaLista = function () {
    var r = limpa(campoNome.value), rt = limpa(campoTag ? campoTag.value : '');
    var nome = r.s, n = conta(nome);
    contador.textContent = n + '/' + LIM;
    contador.className = 'nick__cont ' + (n > LIM ? 'is-alem' : n > 10 ? 'is-quase' : 'is-ok');
    aviso.textContent = r.avisos.concat(rt.avisos).join(' ');
    if (n > LIM) aviso.textContent = t('Seu nome tem {n} caracteres e o limite do jogo é 12: mostramos versões encurtadas que cabem.', { n: n }) + ' ' + aviso.textContent;
    var itens = gera(nome, rt.s.toUpperCase());
    lista.innerHTML = '';
    if (!itens.length) { lista.innerHTML = '<li class="vazio">' + t('Nenhuma combinação coube em 12 caracteres. Tente um nome mais curto.') + '</li>'; return; }
    itens.forEach(function (it) {
      var li = d.createElement('li');
      li.className = 'nk card';
      var faltam = Array.from(it.t).filter(semGlifo).length;
      var selos = [];
      if (Array.from(it.t).some(function (c) { return VARIA.indexOf(c) >= 0; })) selos.push('<span class="nk__selo nk__selo--varia">' + t('aparência varia') + '</span>');
      if (faltam) selos.push('<span class="nk__selo nk__selo--tofu" title="' + t('Outros jogadores podem ver normalmente.') + '">' + t('seu celular não mostra {n} símbolo(s)', { n: faltam }) + '</span>');
      li.innerHTML = '<p class="nk__txt" translate="no"></p>' +
        '<p class="nk__meta"><span class="nk__rot"></span><span class="nk__n"></span>' + selos.join('') + '</p>' +
        '<div class="nk__acoes"><button type="button" class="copiar nk__copiar"><svg class="ic cp" aria-hidden="true"><use href="#i-copiar"/></svg><svg class="ic ok" aria-hidden="true"><use href="#i-check"/></svg><span>' + t('Copiar') + '</span></button>' +
        '<button type="button" class="nk__ver bt--vidro">' + t('Ver na placa') + '</button></div>';
      $('.nk__txt', li).textContent = it.t;
      $('.nk__rot', li).textContent = t(it.r);
      $('.nk__n', li).textContent = conta(it.t) + '/12';
      var bt = $('.nk__copiar', li);
      bt.setAttribute('aria-label', t('Copiar nick {r}: {n} de 12 caracteres', { r: t(it.r), n: conta(it.t) }));
      bt.addEventListener('click', function () { copiar(it.t, li); placa(it.t); });
      $('.nk__ver', li).addEventListener('click', function () { placa(it.t); var p = $('.placa'); if (p && p.scrollIntoView && W.innerWidth < 900) p.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
      lista.appendChild(li);
    });
    placa(nome || 'Lipy');
  };

  /* ---------------- copiar ---------------- */
  var avisoGlobal = $('[data-aviso]');
  var copiar = function (txt, li) {
    var ok = function () {
      li.classList.remove('is-copiado'); void li.offsetWidth; li.classList.add('is-copiado');
      if (avisoGlobal) avisoGlobal.textContent = t('Nick copiado! No jogo: Perfil, lápis ao lado do nick, colar.');
      setTimeout(function () { li.classList.remove('is-copiado'); }, 2200);
    };
    if (navigator.clipboard && W.isSecureContext) navigator.clipboard.writeText(txt).then(ok, function () {});
    else { var ta = d.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; d.body.appendChild(ta); ta.select(); try { d.execCommand('copy'); ok(); } catch (e) {} ta.remove(); }
  };

  /* ---------------- placa de perfil (prévia aproximada, sem arte da Garena) ---------------- */
  var placa = function (txt) {
    var el = $('[data-placa-nome]'), gl = $('[data-placa-guilda]'), n = $('[data-placa-n]');
    if (el) el.textContent = txt;
    if (n) n.textContent = conta(txt) + '/12';
    if (gl) gl.textContent = (limpa(campoTag ? campoTag.value : '').s.toUpperCase() || 'LIPY');
  };

  /* ---------------- categorias ---------------- */
  var chips = $('[data-nick-cats]');
  CATS.forEach(function (c) {
    var b = d.createElement('button');
    b.type = 'button'; b.textContent = t(c[1]); b.setAttribute('aria-pressed', c[0] === cat);
    b.addEventListener('click', function () {
      cat = c[0]; semente = 1; guarda.set('hub:nick:cat', cat);
      $$('button', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      desenhaLista();
    });
    chips.appendChild(b);
  });

  /* ---------------- gaveta de símbolos: insere onde está o cursor ---------------- */
  var gaveta = $('[data-nick-simbolos]');
  if (gaveta) {
    var abas = d.createElement('div'); abas.className = 'simb__abas'; abas.setAttribute('role', 'tablist');
    var grade = d.createElement('div'); grade.className = 'simb__grade';
    var mostra = function (i) {
      $$('button', abas).forEach(function (b, j) { b.setAttribute('aria-selected', i === j); });
      grade.innerHTML = '';
      Array.from(SIMBOLOS[i][1]).forEach(function (ch) {
        var b = d.createElement('button');
        b.type = 'button'; b.className = 'simb';
        b.textContent = ch === INV ? '\u3164' : ch === '\uffa0' ? '\uffa0' : ch;
        if (INVISIVEIS.test(ch)) { b.classList.add('simb--inv'); b.setAttribute('aria-label', t('espaço invisível')); b.title = t('espaço invisível'); }
        else b.setAttribute('aria-label', t('inserir {s}', { s: ch }));
        b.addEventListener('click', function () {
          var ini = campoNome.selectionStart == null ? campoNome.value.length : campoNome.selectionStart, fim = campoNome.selectionEnd == null ? ini : campoNome.selectionEnd;
          campoNome.value = campoNome.value.slice(0, ini) + ch + campoNome.value.slice(fim);
          campoNome.focus();
          campoNome.setSelectionRange(ini + ch.length, ini + ch.length);
          desenhaLista();
        });
        grade.appendChild(b);
      });
    };
    SIMBOLOS.forEach(function (g, i) {
      var b = d.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = t(g[0]);
      b.addEventListener('click', function () { mostra(i); });
      abas.appendChild(b);
    });
    gaveta.appendChild(abas); gaveta.appendChild(grade);
    mostra(0);
  }

  /* ---------------- espaço invisível: botões diretos ---------------- */
  $$('[data-invisivel]').forEach(function (b) {
    b.addEventListener('click', function () { copiar(b.getAttribute('data-invisivel'), b); });
  });

  var espera;
  [campoNome, campoTag].forEach(function (c) { if (c) c.addEventListener('input', function () { clearTimeout(espera); espera = setTimeout(desenhaLista, 90); }); });
  if (mais) mais.addEventListener('click', function () { semente = (semente * 48271 + Date.now()) % 2147483647 || 7; desenhaLista(); lista.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  desenhaLista();
})();
