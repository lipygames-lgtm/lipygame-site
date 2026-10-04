// LOJA — compras dentro do app (0.9). Quem fala com a Google Play é Loja.java (ponte LipyBilling).
// Porte do Nitrovenant, onde a compra foi verificada no celular, mais os CONSUMÍVEIS.
//
// REGRAS QUE NÃO PODEM SER QUEBRADAS:
// 1. Quem manda nas compras PERMANENTES (sem anúncios, passe reviver) é a LOJA: o jogo pergunta e
//    obedece, inclusive quando a resposta é "não tem mais" (reembolso). `ativos` null = "ainda não sei"
//    — e aí o jogo não mexe em nada (uma falha de rede não pode tirar do jogador o que ele pagou).
// 2. O PREÇO vem da loja, escrito por ela no dinheiro do país do jogador. Nunca no código (preço
//    anunciado diferente do cobrado reprova na revisão da Play).
// 3. CONSUMÍVEL (diamantes, moedas): a loja entrega {id, token, qtd}; o jogo dá o pacote, GRAVA o token
//    (com o quanto deu) e avisa o Android (registra), que grava o registro NO DISCO e só então consome.
//    Token já entregue = só registra de novo (o Android consome). Assim ninguém recebe duas vezes, e o
//    app morrendo no meio não leva a compra: o registro do Android devolve na próxima abertura o que o
//    perfil não tiver (o localStorage chega ao disco com atraso).
// 4. Sem loja o jogo segue: no navegador ou sem Play Services, os itens pagos aparecem indisponíveis.
(function (raiz) {
  'use strict';
  let ponteTeste;
  const ponte = () => (ponteTeste !== undefined ? ponteTeste : (typeof raiz.LipyBilling !== 'undefined' ? raiz.LipyBilling : null));
  const MAX_TOKENS = 300;
  const texto = x => (typeof x === 'string' ? x : '');
  const inteiro = x => (typeof x === 'number' && isFinite(x) ? Math.max(0, Math.floor(x)) : 0);

  const Loja = {
    pronta: false,       // a ponte respondeu com a lista pelo menos uma vez
    precos: {},          // id -> preço já escrito pela loja ("R$ 9,90")
    semPreco: [],        // a Play respondeu e estes vieram sem preço (produto não criado/ativado)
    ativos: null,        // null = ainda não sabemos; [] = a loja respondeu "nada comprado"
    pendentes: [],       // pago, mas em análise (boleto, Pix, aprovação do responsável)
    erro: '', erroSeq: 0,
    aoMudar: null,       // a tela da loja se redesenha por aqui
    aoEntregar: null,    // o jogo entrega o consumível por aqui
    aoRegistro: null,    // o registro do Android (compras entregues ainda não confirmadas no disco)

    nativa() { return !!ponte(); },
    // catálogo = CONFIG.loja_catalogo ([{id, permanente?, gemas?, moedas?}])
    iniciar(catalogo) {
      const p = ponte();
      if (!p) { this.erro = 'sem-loja'; return false; }
      const ids = catalogo.map(c => c.id), consumiveis = catalogo.filter(c => !c.permanente).map(c => c.id);
      try { p.start(JSON.stringify({ ids, consumiveis })); return true; } catch (e) { this.erro = 'sem-loja'; return false; }
    },
    // Abre o checkout da Play. O resultado NÃO volta daqui (o jogador pode pagar por boleto, fechar o
    // app no meio...): volta pelo aviso da loja. A tela espera esse aviso.
    comprar(id) { const p = ponte(); if (!p) return false; try { p.buy(id); return true; } catch (e) { return false; } },
    // pergunta de novo "o que está comprado?" (voltar ao app, botão RESTAURAR COMPRAS)
    reconsultar() { const p = ponte(); if (p) try { p.refresh(); } catch (e) { } },
    // consumível entregue (e gravado no perfil): o Android registra no disco e consome (regra 3)
    registra(token, gemas, moedas) { const p = ponte(); if (p && token) try { p.entregue(token, inteiro(gemas), inteiro(moedas)); } catch (e) { } },
    // o perfil LIDO DO DISCO já tem estas compras: o registro delas pode sair
    confirma(tokens) { const p = ponte(); if (p && tokens && tokens.length) try { p.confirma(JSON.stringify(tokens)); } catch (e) { } },

    preco(id) { return this.precos[id] || ''; },
    // sem preço E sem esperança de ter: sem loja, erro, ou a Play respondeu sem este item
    indisponivel(id) { return !this.preco(id) && (!this.nativa() || !!this.erro || this.semPreco.indexOf(id) >= 0); },
    sabe() { return this.ativos !== null; },
    tem(id) { return !!(this.ativos && this.ativos.indexOf(id) >= 0); },
    emAnalise(id) { return this.pendentes.indexOf(id) >= 0; },

    // ---------- o registro das compras no perfil (puro: os testes chamam direto) ----------
    // cada compra entregue: {t: token, g: diamantes dados, m: moedas dadas, em: quando}. É o quanto que
    // deixa a nuvem juntar duas cópias sem perder nem duplicar pacote pago (nuvem.js)
    tokens(perfil) {
      const l = perfil && perfil.compras && Array.isArray(perfil.compras.entregues) ? perfil.compras.entregues : [];
      return l.map(x => (typeof x === 'string' ? x : x && texto(x.t))).filter(Boolean);
    },
    jaTem(perfil, token) { return Loja.tokens(perfil).indexOf(token) >= 0; },
    // as entregas de um perfil SEM o valor (APAGAR PROGRESSO: a compra foi entregue e o jogador apagou
    // o que ela deu — o registro do Android não pode devolver, e a nuvem não soma de novo)
    semValor(perfil) {
      const l = perfil && perfil.compras && Array.isArray(perfil.compras.entregues) ? perfil.compras.entregues : [];
      return l.map(x => (typeof x === 'string' ? { t: x, g: 0, m: 0, em: 0 } : x && texto(x.t) ? { t: x.t, g: 0, m: 0, em: inteiro(x.em) } : null)).filter(Boolean);
    },
    anota(perfil, token, g, m) {
      const reg = perfil.compras || (perfil.compras = { entregues: [] });
      if (!Array.isArray(reg.entregues)) reg.entregues = [];
      reg.entregues.push({ t: token, g: inteiro(g), m: inteiro(m), em: Date.now() });
      if (reg.entregues.length > MAX_TOKENS) reg.entregues.splice(0, reg.entregues.length - MAX_TOKENS);
    },
    // Entrega um consumível no perfil. Devolve o que foi dado, ou null se aquele token já tinha sido
    // entregue (aí só falta registrar/consumir).
    entrega(perfil, catalogo, e) {
      const c = catalogo.find(x => x.id === e.id && !x.permanente);
      if (!c || typeof e.token !== 'string' || !e.token || Loja.jaTem(perfil, e.token)) return null;
      const q = Math.max(1, Math.min(99, e.qtd | 0));
      const dado = { gemas: (c.gemas || 0) * q, moedas: (c.moedas || 0) * q };
      perfil.gemas = (perfil.gemas || 0) + dado.gemas;
      perfil.moedas = (perfil.moedas || 0) + dado.moedas;
      Loja.anota(perfil, e.token, dado.gemas, dado.moedas);
      return dado;
    },
    // Uma compra do registro do Android que o perfil NÃO tem (o app morreu antes de o perfil chegar ao
    // disco): devolve o que tinha sido dado. Já tem = null (nada a fazer).
    devolve(perfil, r) {
      if (!r || typeof r.t !== 'string' || !r.t || Loja.jaTem(perfil, r.t)) return null;
      const dado = { gemas: Math.min(inteiro(r.g), 100000), moedas: Math.min(inteiro(r.m), 10000000) };
      perfil.gemas = (perfil.gemas || 0) + dado.gemas;
      perfil.moedas = (perfil.moedas || 0) + dado.moedas;
      Loja.anota(perfil, r.t, dado.gemas, dado.moedas);
      return dado;
    },
    // (testes)
    _troca(o) { if ('ponte' in o) ponteTeste = o.ponte; },
  };

  // A ponte nativa chama isto: {precos:{id:"R$ 9,90"}, semPreco:[ids], ativos:[ids], pendentes:[ids],
  // entregar:[{id,token,qtd}], registro:[{t,g,m}], consumido:"token", erro:""}
  raiz.appLoja = function (json) {
    let d;
    try { d = typeof json === 'string' ? JSON.parse(json) : json; } catch (e) { return; }
    if (!d || typeof d !== 'object') return;
    if (d.precos && typeof d.precos === 'object') Loja.precos = d.precos;
    if (Array.isArray(d.semPreco)) Loja.semPreco = d.semPreco.filter(x => typeof x === 'string');
    // `ativos` só vale se vier como lista: um erro de comunicação NÃO pode virar "nada comprado"
    if (Array.isArray(d.ativos)) { Loja.ativos = d.ativos.filter(x => typeof x === 'string'); Loja.pronta = true; }
    if (Array.isArray(d.pendentes)) Loja.pendentes = d.pendentes.filter(x => typeof x === 'string');
    if (Array.isArray(d.registro) && typeof Loja.aoRegistro === 'function') {
      const l = d.registro.filter(r => r && typeof r.t === 'string' && r.t).map(r => ({ t: r.t, g: inteiro(r.g), m: inteiro(r.m) }));
      if (l.length) { try { Loja.aoRegistro(l); } catch (err) { } }
    }
    if (Array.isArray(d.entregar) && typeof Loja.aoEntregar === 'function') {
      for (const e of d.entregar) {
        if (e && typeof e.id === 'string' && typeof e.token === 'string') {
          try { Loja.aoEntregar({ id: e.id, token: e.token, qtd: Math.max(1, e.qtd | 0) }); } catch (err) { }
        }
      }
    }
    const erro = typeof d.erro === 'string' ? d.erro : '';
    if (erro && erro !== Loja.erro) Loja.erroSeq++;
    Loja.erro = erro;
    if (typeof Loja.aoMudar === 'function') { try { Loja.aoMudar(); } catch (e) { } }
  };
  Loja.recebe = raiz.appLoja; // (os testes chamam por aqui)

  if (typeof module === 'object' && module.exports) module.exports = Loja; else raiz.Loja = Loja;
})(this);
