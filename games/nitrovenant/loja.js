'use strict';
// LOJA (compras dentro do app). Este arquivo é só o lado JavaScript: quem fala com a Google Play é o
// MainActivity, pela ponte `NitroBilling`, do mesmo jeito que os anúncios usam `NitroAds`.
//
// TRÊS REGRAS QUE NÃO PODEM SER QUEBRADAS:
//
// 1. Quem manda é a LOJA, nunca o aparelho. O jogo pergunta o que está comprado e obedece, inclusive
//    quando a resposta é "não tem mais" (reembolso). Guardar "comprado" no celular e confiar nisso
//    transforma qualquer reembolso em veículo de graça — e o celular é do jogador, não nosso.
//
// 2. O PREÇO vem da loja, escrito por ela. A Google define o valor em cada país e o jogador pode estar
//    em qualquer um. Escrever "R$ 51,44" no código faria a tela mentir para quem abrisse fora do
//    Brasil — e anunciar um preço diferente do cobrado reprova na revisão da Play.
//
// 3. Sem loja, o jogo continua. No navegador, num aparelho sem Play Services ou com a loja fora do ar,
//    os veículos pagos aparecem trancados e o resto do jogo funciona igual.
(function (root) {
  const Loja = {
    pronta: false,          // a ponte existe E respondeu pelo menos uma vez
    precos: {},             // id do produto -> preço já escrito pela loja ("R$ 51,44")
    ativos: null,           // null = ainda não sabemos; [] = a loja respondeu "nada comprado"
    pendentes: [],          // pago mas ainda em análise (boleto, Pix, aprovação do responsável)
    erro: '', erroSeq: 0,   // erroSeq sobe a cada aviso novo, para a tela saber que houve um
    aoMudar: null,          // a garagem se redesenha por aqui

    // Existe ponte nativa? No navegador, não.
    nativa() { return typeof root.NitroBilling !== 'undefined'; },

    iniciar(ids) {
      if (!this.nativa()) { this.erro = 'sem-loja'; return false; }
      try { root.NitroBilling.start(JSON.stringify(ids)); return true; } catch (e) { this.erro = 'sem-loja'; return false; }
    },

    // Abre o checkout da Play. O resultado NÃO volta daqui: volta pelo aviso da loja, porque o
    // jogador pode fechar o app no meio, pagar por boleto, ou a compra ser aprovada minutos depois.
    // A ponte nativa é assíncrona: ela não sabe dizer aqui se o checkout abriu. Por isso a tela
    // NÃO se fecha depois desta chamada — ela espera a loja avisar (compra, análise ou erro).
    comprar(id) {
      if (!this.nativa()) return false;
      try { root.NitroBilling.buy(id); return true; } catch (e) { return false; }
    },

    // Reabre a pergunta "o que está comprado?" — usado ao voltar para o app e no botão de restaurar.
    reconsultar() { if (this.nativa()) { try { root.NitroBilling.refresh(); } catch (e) {} } },

    preco(id) { return this.precos[id] || ''; },
    // Ainda não sabemos = não trancar por engano nem liberar por engano: a tela mostra "carregando".
    sabe() { return this.ativos !== null; },
    tem(id) { return !!(this.ativos && this.ativos.indexOf(id) >= 0); },
    emAnalise(id) { return this.pendentes.indexOf(id) >= 0; },
  };

  // A ponte nativa chama isto. `estado` é um JSON: {precos:{id:"R$ 51,44"}, ativos:[ids], erro:""}
  root.nitroBillingState = function (json) {
    let d;
    try { d = typeof json === 'string' ? JSON.parse(json) : json; } catch (e) { return; }
    if (!d || typeof d !== 'object') return;
    if (d.precos && typeof d.precos === 'object') Loja.precos = d.precos;
    // `ativos` só é aceito se vier como lista. Um erro de comunicação NÃO pode virar "nada comprado":
    // isso tiraria do jogador o veículo que ele pagou.
    if (Array.isArray(d.ativos)) { Loja.ativos = d.ativos.slice(); Loja.pronta = true; }
    if (Array.isArray(d.pendentes)) Loja.pendentes = d.pendentes.slice();
    const erro = typeof d.erro === 'string' ? d.erro : '';
    if (erro && erro !== Loja.erro) Loja.erroSeq++;
    Loja.erro = erro;
    if (typeof Loja.aoMudar === 'function') { try { Loja.aoMudar(); } catch (e) {} }
  };

  root.Loja = Loja;
})(typeof window !== 'undefined' ? window : globalThis);
