// SALVAR PROGRESSO na conta do Google Play Games (0.9). Quem conversa com o Android é Nuvem.java.
// Porte do Nitrovenant (verificado no celular), com a fusão do perfil do Quiver.
//
// O progresso DE VERDADE continua no aparelho; isto é uma cópia que segue a conta do jogador: trocou de
// celular, reinstalou — ela volta, e com ela a conta do RANKING (combinado com o dono). Importa mais
// ainda com as compras: diamante comprado não pode sumir numa troca de celular.
//
// REGRA DE OURO: a nuvem nunca manda sozinha. Se o Play Games faltar, falhar ou o jogador recusar, o
// jogo funciona exatamente igual.
// NUNCA GRAVAR ANTES DE LER: quem reinstalou abre com o perfil zerado; gravar antes transformaria o
// progresso bom num perfil novo, sem volta.
// COMO JUNTAMOS DUAS CÓPIAS: campo a campo, ficando com o MELHOR de cada um (mais estrelas, menor
// tempo, a união das skins e dos desafios vencidos...). Nunca pela data (um relógio errado apagaria
// meses) e nunca escolhendo uma cópia vencedora (a outra tinha coisas melhores).
// DIAMANTES E MOEDAS: cada cópia olha tudo o que já TEVE (saldo + gasto) mais os PACOTES PAGOS que só
// a outra tem (cada compra guarda quanto deu); fica a visão maior, menos o maior GASTO total (que só
// cresce). Assim: o pacote comprado num celular que ainda não tinha lido a nuvem não some; a compra que
// as duas têm não conta duas vezes; e o que foi gasto sem a nuvem ver não volta quando ela é lida.
(function (raiz) {
  'use strict';
  let ponteTeste;
  const ponte = () => (ponteTeste !== undefined ? ponteTeste : (typeof raiz.LipyCloud !== 'undefined' ? raiz.LipyCloud : null));

  const Nuvem = {
    ligado: false,     // conectado ao Play Games
    lido: false,       // a cópia da nuvem já chegou — antes disso é PROIBIDO gravar
    disponivel: true,  // false = este app não tem Play Games (APK de teste, sem o ID): a tela esconde a opção
    seq: 0,            // o número da última gravação pedida
    salvoSeq: 0,       // o número da última gravação que o Android CONFIRMOU
    falhouSeq: 0,      // o número da última gravação que FALHOU
    erro: '',
    aoMudar: null,
    aoChegar: null,    // (pacote da nuvem | null, conflito?) — o jogo funde com o do aparelho

    nativa() { return !!ponte(); },
    iniciar() { const p = ponte(); if (!p) return false; try { p.start(); return true; } catch (e) { return false; } },
    // `pedir` abre a tela de login do Google: só com o jogador tocando no botão
    conectar(pedir) { const p = ponte(); if (!p) return false; try { p.signIn(!!pedir); return true; } catch (e) { return false; } },
    carregar() { const p = ponte(); if (!p || !this.ligado) return false; try { p.load(); return true; } catch (e) { return false; } },
    // grava; devolve o número da gravação (0 = não foi). O Android confirma pelo mesmo número.
    salvar(pacote) {
      const p = ponte();
      if (!p || !this.ligado || !this.lido) return 0;
      const n = ++this.seq;
      try { p.save(JSON.stringify(pacote), n); return n; } catch (e) { return 0; }
    },
    resolver(pacote) { const p = ponte(); if (!p) return false; try { p.resolve(JSON.stringify(pacote)); return true; } catch (e) { return false; } },
    // (testes)
    _troca(o) { if ('ponte' in o) ponteTeste = o.ponte; },
  };

  // ---------- o pacote que vai para a nuvem ----------
  // perfil sem o que é só deste aparelho e pesado (dados do teste, fase em andamento), e a conta do
  // ranking (a chave), para a conta voltar junto num celular novo
  Nuvem.pacote = function (perfil, conta) {
    const p = Object.assign({}, perfil);
    p.tele = []; p.emJogo = null; p.desafioTeste = null;
    return { v: 1, perfil: p, conta: conta && conta.id && conta.chave ? { chave: conta.chave, id: conta.id, nome: conta.nome || '' } : null };
  };
  Nuvem.abre = function (texto) {
    if (!texto) return null;
    let d; try { d = typeof texto === 'string' ? JSON.parse(texto) : texto; } catch (e) { return null; }
    if (!d || typeof d !== 'object' || !d.perfil || typeof d.perfil !== 'object') return null;
    // (v: o formato da cópia — uma versão mais nova do jogo pode gravar outro, que esta não entende)
    return { v: typeof d.v === 'number' ? d.v : 1, perfil: d.perfil, conta: d.conta && typeof d.conta.chave === 'string' ? d.conta : null };
  };

  // ---------- a fusão ----------
  const num = x => (typeof x === 'number' && isFinite(x) ? x : 0);
  const lista = x => (Array.isArray(x) ? x : []);
  const obj = x => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
  const soma = l => lista(l).reduce((s, x) => s + num(x), 0);
  // perfil de instalação nova (nenhuma estrela, nenhuma compra, nenhuma vitória)
  Nuvem.fresco = function (p) {
    if (!p || typeof p !== 'object') return true;
    const e = obj(p.estrelas);
    return !soma(e.rush) && !soma(e.classic) && !lista(obj(p.compras).entregues).length && !num(obj(p.stats).vitorias);
  };
  const melhorEstrela = (x, y) => { const a = lista(x), b = lista(y), r = []; for (let i = 0; i < Math.max(a.length, b.length); i++) r[i] = Math.max(num(a[i]), num(b[i])); return r; };
  const melhorTempo = (x, y) => {
    const a = lista(x), b = lista(y), r = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) { const u = num(a[i]), v = num(b[i]); r[i] = u > 0 && v > 0 ? Math.min(u, v) : Math.max(u, v); }
    return r;
  };
  // o maior de cada número, descendo nos objetos (estoque, estatísticas, conquistas pagas)
  function maior(x, y) {
    const a = obj(x), b = obj(y), r = Object.assign({}, b);
    for (const [k, v] of Object.entries(a)) {
      if (typeof v === 'number') r[k] = Math.max(num(v), num(r[k]));
      else if (v && typeof v === 'object' && !Array.isArray(v)) r[k] = maior(v, r[k]);
      else if (!(k in r)) r[k] = v;
    }
    return r;
  }
  // as compras entregues de uma cópia: token -> {t, g, m, em} (a lista antiga, só de tokens, vale 0)
  function compras(p) {
    const m = new Map();
    for (const x of lista(obj(obj(p).compras).entregues)) {
      const e = typeof x === 'string' ? { t: x, g: 0, m: 0, em: 0 } : (x && typeof x.t === 'string' ? x : null);
      if (e && e.t) m.set(e.t, e);
    }
    return m;
  }
  // o que as compras que SÓ `x` tem deram. Quando `y` está cheia (300), a compra mais velha que a
  // mais velha de `y` já saiu da lista de `y` por idade — e está contada no saldo dela
  function soEm(x, y) {
    let velha = -Infinity; // (lista que não encheu nunca perdeu compra nenhuma)
    if (y.size >= 300) { velha = Infinity; for (const e of y.values()) velha = Math.min(velha, num(e.em)); }
    let g = 0, m = 0;
    for (const [t, e] of x) if (!y.has(t) && !(num(e.em) < velha)) { g += num(e.g); m += num(e.m); }
    return { g, m };
  }
  function desafios(x, y) {
    const a = obj(x), b = obj(y), r = Object.assign({}, b);
    for (const [id, v] of Object.entries(a)) {
      const w = obj(r[id]);
      r[id] = Object.assign({}, w, v, { feito: !!(obj(v).feito || w.feito), x2: !!(obj(v).x2 || w.x2) });
    }
    return r;
  }
  // os campos de PROGRESSO (o resto é do aparelho: volumes, idioma, avisos, energia...)
  const PROGRESSO = ['moedas', 'gemas', 'gasto', 'estoque', 'usados', 'estrelas', 'tempos', 'coracoesExtra', 'stats', 'conquistas',
    'skins', 'desafios', 'diario', 'visto', 'tutorialPulado', 'compras', 'apagado', 'missoes', 'roleta', 'perfil'];
  const skinValida = r => { const sk = obj(r.skins), tem = lista(sk.tem).length ? sk.tem : ['classica']; return { tem, usa: tem.indexOf(sk.usa) >= 0 ? sk.usa : 'classica' }; };
  // ESTOQUE (poderes, fichas de reviver): igual ao saldo — o total que cada cópia já TEVE de cada item
  // (estoque + usado), menos o maior total usado. O usado sem a nuvem ver não volta.
  function estoqueJunto(a, b) {
    const ea = obj(a.estoque), eb = obj(b.estoque), ua = obj(a.usados), ub = obj(b.usados), estoque = {}, usados = {};
    for (const k of new Set([...Object.keys(ea), ...Object.keys(eb), ...Object.keys(ua), ...Object.keys(ub)])) {
      usados[k] = Math.max(num(ua[k]), num(ub[k]));
      estoque[k] = Math.max(0, Math.max(num(ea[k]) + num(ua[k]), num(eb[k]) + num(ub[k])) - usados[k]);
    }
    return { estoque, usados };
  }
  Nuvem.fundir = function (a, b) {
    if (!b || typeof b !== 'object') return a;
    if (!a || typeof a !== 'object') return b;
    // o que é do APARELHO (volumes, idioma, energia, roleta de hoje, missões de hoje...) fica o deste
    // celular — menos numa instalação nova, que herda tudo da nuvem
    const base = Nuvem.fresco(a) && !Nuvem.fresco(b) ? b : a;
    // APAGAR PROGRESSO: a cópia de um apagamento MAIS NOVO vence a de antes, em qualquer aparelho (o
    // progresso apagado não volta) — menos os pacotes PAGOS que só a velha tem, que entram com o valor
    const pa = num(a.apagado), pb = num(b.apagado);
    if (pa !== pb) {
      const novo = pa > pb ? a : b, velho = pa > pb ? b : a;
      const cn = compras(novo), cv = compras(velho), extra = soEm(cv, cn);
      const r = Object.assign({}, base);
      for (const k of PROGRESSO) r[k] = novo[k];
      r.gemas = num(novo.gemas) + extra.g; r.moedas = num(novo.moedas) + extra.m;
      r.compras = { entregues: [...new Map([...cv, ...cn]).values()].sort((x, y) => num(x.em) - num(y.em)).slice(-300) };
      r.skins = skinValida(r);
      r.semAnuncios = !!a.semAnuncios; r.passeReviver = !!a.passeReviver;
      r.tele = lista(a.tele); r.emJogo = a.emJogo || null; r.desafioTeste = a.desafioTeste || null;
      return r;
    }
    const ea = obj(a.estrelas), eb = obj(b.estrelas);
    const tem = [...new Set([...lista(obj(a.skins).tem), ...lista(obj(b.skins).tem)])];
    const usa = obj(base.skins).usa;
    const da = obj(a.diario), db = obj(b.diario);
    const ca = compras(a), cb = compras(b), soA = soEm(ca, cb), soB = soEm(cb, ca);
    const todas = [...new Map([...cb, ...ca]).values()].sort((x, y) => num(x.em) - num(y.em)).slice(-300);
    const xa = obj(a.gasto), xb = obj(b.gasto);
    const gasto = { gemas: Math.max(num(xa.gemas), num(xb.gemas)), moedas: Math.max(num(xa.moedas), num(xb.moedas)) };
    const saldo = (k, g) => Math.max(0, Math.max(num(a[k]) + num(xa[k]) + soB[g], num(b[k]) + num(xb[k]) + soA[g]) - gasto[k]);
    const ej = estoqueJunto(a, b);
    const r = Object.assign({}, base, {
      moedas: saldo('moedas', 'm'),
      gemas: saldo('gemas', 'g'),
      gasto,
      estoque: ej.estoque, usados: ej.usados,
      apagado: num(a.apagado),
      estrelas: { rush: melhorEstrela(ea.rush, eb.rush), classic: melhorEstrela(ea.classic, eb.classic) },
      tempos: { classic: melhorTempo(obj(a.tempos).classic, obj(b.tempos).classic) },
      coracoesExtra: Math.max(num(a.coracoesExtra), num(b.coracoesExtra)),
      stats: maior(a.stats, b.stats),
      conquistas: maior(a.conquistas, b.conquistas),
      skins: { tem, usa: tem.indexOf(usa) >= 0 ? usa : 'classica' },
      desafios: desafios(a.desafios, b.desafios),
      // o prêmio diário: vale a sequência de quem pegou por último
      diario: (db.ultimo || '') > (da.ultimo || '') ? Object.assign({}, db) : Object.assign({}, da),
      visto: Object.assign({}, obj(b.visto), obj(a.visto)),
      tutorialPulado: !!(a.tutorialPulado || b.tutorialPulado),
      compras: { entregues: todas },
      // (o que só este aparelho sabe — e as compras PERMANENTES, que quem decide é a loja, nunca a nuvem)
      tele: lista(a.tele), emJogo: a.emJogo || null, desafioTeste: a.desafioTeste || null,
      semAnuncios: !!a.semAnuncios, passeReviver: !!a.passeReviver,
    });
    return r;
  };
  // dois pacotes (os dois aparelhos, num conflito): perfis fundidos; a conta de quem tiver
  Nuvem.fundePacotes = function (pa, pb) {
    if (!pb) return pa;
    if (!pa) return pb;
    return { v: Math.max(pa.v || 1, pb.v || 1), perfil: Nuvem.fundir(pa.perfil, pb.perfil), conta: pa.conta || pb.conta || null };
  };

  // O Android chama isto: {ligado, disponivel, salvo?/falhou? (nº da gravação confirmada / que falhou),
  // save?, conflito?, meu?, outro?, erro}
  raiz.appNuvem = function (json) {
    let d;
    try { d = typeof json === 'string' ? JSON.parse(json) : json; } catch (e) { return; }
    if (!d || typeof d !== 'object') return;
    Nuvem.ligado = !!d.ligado;
    Nuvem.disponivel = d.disponivel !== false;
    if (typeof d.salvo === 'number' && d.salvo > Nuvem.salvoSeq) Nuvem.salvoSeq = d.salvo;
    if (typeof d.falhou === 'number' && d.falhou > Nuvem.falhouSeq) Nuvem.falhouSeq = d.falhou;
    Nuvem.erro = typeof d.erro === 'string' ? d.erro : '';
    if (d.conflito) {
      // dois aparelhos gravaram sem se falar: funde os dois e devolve — nunca descarta um
      const juntos = Nuvem.fundePacotes(Nuvem.abre(d.meu), Nuvem.abre(d.outro));
      if (typeof Nuvem.aoChegar === 'function') { try { Nuvem.aoChegar(juntos, true); } catch (e) { } }
    } else if (typeof d.save === 'string') {
      Nuvem.lido = true;
      if (typeof Nuvem.aoChegar === 'function') { try { Nuvem.aoChegar(Nuvem.abre(d.save), false); } catch (e) { } }
    }
    if (typeof Nuvem.aoMudar === 'function') { try { Nuvem.aoMudar(); } catch (e) { } }
  };
  Nuvem.recebe = raiz.appNuvem; // (os testes chamam por aqui)

  if (typeof module === 'object' && module.exports) module.exports = Nuvem; else raiz.Nuvem = Nuvem;
})(this);
