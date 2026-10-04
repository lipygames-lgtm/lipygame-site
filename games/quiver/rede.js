// RANKING ONLINE (0.8): a conversa com o servidor da Lipy Games (Supabase, projeto `lipy-games`).
// A conta do jogador é uma CHAVE secreta sorteada aqui no celular (16 letras/números, ~80 bits), sem
// senha nem e-mail (decisão do dono). O servidor guarda só o hash dela, e toda ação passa pelas funções
// public.quiver_* (servidor/quiver.sql), que conferem a chave. A chave fica numa gaveta PRÓPRIA do
// localStorage, separada do progresso: "apagar progresso" não apaga a conta do ranking.
// O jogo inteiro funciona sem internet: aqui nada lança erro; cada chamada devolve {erro:'rede'} e o
// jogo tenta de novo depois.
(function (raiz) {
  'use strict';
  const URL_SERVIDOR = 'https://ldpccejvvzqaocyhioju.supabase.co';
  // chave PÚBLICA do projeto (papel anon): vai dentro do app de propósito. Quem protege os dados são
  // as funções do servidor, não o segredo desta chave.
  const CHAVE_PUBLICA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcGNjZWp2dnpxYW9jeWhpb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjc2ODIsImV4cCI6MjEwNTg0MzY4Mn0.Usf-hgs3rAxIiFCQx7MKW41NZUufOqIsxtFcpbussDo';
  const GAVETA = 'quiver-conta';
  // a conta de ANTES (sumiu do servidor, ou o jogador entrou com outro código): a chave dela não se perde,
  // e a tela de entrar com código oferece voltar para ela
  const ANTIGA = 'quiver-conta-antiga';
  // a conta que o jogador APAGOU: se a cópia do Android não chegou a ser limpa (o app fechou na hora),
  // ela não volta
  const APAGADA = 'quiver-conta-apagada';
  const ALFABETO = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // base32 de Crockford: sem I, L, O e U (não confundem)
  const ESPERA = 9000; // ms até desistir de uma chamada
  const CHAVE_OK = /^[0-9A-HJKMNP-TV-Z]{16}$/;

  let armazem = null, ponteTeste; // (os testes trocam o localStorage e a ponte do Android)
  const guarda = () => armazem || raiz.localStorage || (typeof localStorage !== 'undefined' ? localStorage : null);
  // cópia da conta no Android (LipyApp.guardaConta): é o ÚNICO arquivo que o backup do Google leva
  // (res/xml/backup_*.xml). Reinstalou ou trocou de celular com o backup ligado: a conta volta sozinha.
  const ponte = () => (ponteTeste !== undefined ? ponteTeste : (raiz.LipyApp && raiz.LipyApp.guardaConta ? raiz.LipyApp : null));
  let espelhada = null, semCopia = false;
  function espelha(c) {
    const s = c && c.id ? JSON.stringify({ chave: c.chave, id: c.id, nome: c.nome || '' }) : '';
    if (s === espelhada) return;
    try { const p = ponte(); if (p) { p.guardaConta(s); espelhada = s; semCopia = false; } } catch (e) { }
  }
  function leGaveta(g) {
    try { const c = JSON.parse(guarda().getItem(g) || 'null'); return c && typeof c.chave === 'string' ? c : null; } catch (e) { return null; }
  }
  function le() {
    let c = leGaveta(GAVETA);
    if (!c && !semCopia) {
      // o localStorage veio vazio (app reinstalado): a cópia do Android traz a conta de volta
      try {
        const p = ponte(), s = p && p.contaGuardada ? String(p.contaGuardada() || '') : '';
        const d = s ? JSON.parse(s) : null;
        let apagada = null; try { apagada = guarda().getItem(APAGADA); } catch (e) { }
        if (d && d.chave === apagada) { p.guardaConta(''); semCopia = true; return null; } // (a cópia velha de uma conta apagada)
        if (d && typeof d.chave === 'string' && CHAVE_OK.test(d.chave) && d.id) {
          c = { chave: d.chave, id: d.id, nome: d.nome || '', versao: 1, enviada: 0 }; // (versão 1: os recordes daqui vão logo)
          guarda().setItem(GAVETA, JSON.stringify(c)); espelhada = s;
        } else semCopia = true;
      } catch (e) { semCopia = true; }
    }
    return c;
  }
  function grava(c) {
    try { if (c) guarda().setItem(GAVETA, JSON.stringify(c)); else guarda().removeItem(GAVETA); } catch (e) { }
    espelha(c);
  }
  function guardaAntiga(c) { if (c && c.id) try { guarda().setItem(ANTIGA, JSON.stringify({ chave: c.chave, nome: c.nome || '', em: Date.now() })); } catch (e) { } }

  function sorteiaChave() {
    const b = new Uint8Array(16);
    globalThis.crypto.getRandomValues(b);
    return Array.from(b, x => ALFABETO[x & 31]).join(''); // (256 é múltiplo de 32: cada letra sai com a mesma chance)
  }
  // o código que o jogador vê: 4 grupos de 4 (K7QF-3M9X-TR2W-8ZPD). Na volta aceita minúsculas, espaços,
  // traços e as letras que se confundem (I e L = 1, O = 0)
  const formata = k => String(k).replace(/(.{4})(?=.)/g, '$1-');
  function normaliza(s) {
    const k = String(s || '').toUpperCase().replace(/[\s\-_.]/g, '').replace(/[IL]/g, '1').replace(/O/g, '0');
    return /^[0-9A-HJKMNP-TV-Z]{16}$/.test(k) ? k : null;
  }
  // o nome do jeito que o servidor aceita (letras sem acento, números, _ e .; espaço vira _)
  const limpaNome = s => String(s || '').normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/g, '_').replace(/[^A-Za-z0-9_.]/g, '').slice(0, 16);
  // na hora de enviar: sem _ e . nas pontas (o espaço que a sugestão do teclado põe no fim virava "_")
  const nomeFinal = s => limpaNome(s).replace(/^[._]+|[._]+$/g, '');
  function nomeValido(s) {
    return typeof s === 'string' && s.length >= 3 && s.length <= 16 && /^[A-Za-z0-9_.]+$/.test(s) && !/^[._]|[._]$|[._]{2}/.test(s) && /[A-Za-z]/.test(s);
  }

  let busca = (...a) => raiz.fetch(...a); // (os testes trocam a rede)
  async function chama(fn, args) {
    const ctl = typeof AbortController === 'function' ? new AbortController() : null;
    const t = setTimeout(() => { if (ctl) ctl.abort(); }, ESPERA);
    try {
      const r = await busca(URL_SERVIDOR + '/rest/v1/rpc/' + fn, {
        method: 'POST',
        headers: { apikey: CHAVE_PUBLICA, Authorization: 'Bearer ' + CHAVE_PUBLICA, 'Content-Type': 'application/json' },
        body: JSON.stringify(args || {}), signal: ctl ? ctl.signal : undefined,
      });
      if (!r.ok) return { erro: 'servidor', status: r.status };
      const j = await r.json();
      return j && typeof j === 'object' ? j : { erro: 'servidor' };
    } catch (e) {
      return { erro: 'rede' }; // sem internet, servidor fora do ar ou demorou demais
    } finally { clearTimeout(t); }
  }

  // o que a conta guarda da resposta do servidor
  const CAMPOS = ['id', 'nome', 'pais', 'avatar', 'insignia', 'estrelas', 'fases', 'tempo', 'nivel', 'convites', 'renomear_em'];
  function junta(c, r) {
    const n = Object.assign({}, c);
    for (const k of CAMPOS) if (k in r) n[k] = r[k];
    return n;
  }
  // O servidor disse que a conta não existe (apagada; ou conta vazia que a faxina levou). Só vale no ENVIO
  // e só se ela ainda for a conta deste celular (resposta atrasada de outra conta não apaga nada). E ela
  // não some: vai para a gaveta de reserva — se foi engano do servidor, o código continua na tela de
  // entrar e o jogador volta para ela.
  function perdeu(r, chave) {
    if (r && r.erro === 'sem_conta') { const c = le(); if (c && c.chave === chave) { guardaAntiga(c); grava(null); } }
    return r;
  }

  const Rede = {
    formata, normaliza, limpaNome, nomeFinal, nomeValido, URL_SERVIDOR,
    // conta pronta (com nome no servidor); a que ainda espera a confirmação da criação não conta
    conta() { const c = le(); return c && c.id ? c : null; },
    // recorde novo que o servidor ainda não tem (a marca sobrevive a fechar o app)
    marca() { const c = le(); if (c && c.id) { c.versao = (c.versao || 0) + 1; grava(c); } },
    pendente() { const c = le(); return !!(c && c.id && (c.versao || 0) > (c.enviada || 0)); },
    // último envio que deu certo (ms)
    enviadoEm() { const c = le(); return (c && c.enviadoEm) || 0; },
    // guarda na conta um campo que veio de outra resposta (ex.: quantos convites esperam)
    anota(campos) { const c = le(); if (c && c.id) grava(junta(c, campos || {})); },

    // Criar a conta. A chave é sorteada e GUARDADA antes de chamar: se a resposta se perder na rede, a
    // próxima tentativa usa a mesma chave e o servidor devolve a conta que já criou.
    async cria(nome, extra) {
      let c = le();
      if (c && c.id) return { erro: 'ja_tem' };
      if (!c) { c = { chave: sorteiaChave() }; grava(c); }
      const e = extra || {};
      const r = await chama('quiver_criar', { p_chave: c.chave, p_nome: nome, p_pais: e.pais || '', p_avatar: e.avatar || 'seta-azul', p_insignia: e.insignia || '' });
      if (r.ok && r.id) {
        // enquanto a criação estava no ar, OUTRA conta entrou neste celular (a que voltou da nuvem, ou
        // por código): ela fica — a recém-criada, vazia, a faxina do servidor leva
        const agora = le();
        if (agora && agora.id && agora.chave !== c.chave) return { erro: 'ja_tem' };
        grava(Object.assign(junta({ chave: c.chave }, r), { versao: 1, enviada: 0 }));
      }
      return r;
    },
    // Entrar com o código (trocou de celular, reinstalou). Só troca a conta deste celular se o código
    // existir no servidor — e a conta de antes vai para a gaveta de reserva (o código dela não se perde).
    // `op.soSeVazio`: só entra se este celular CONTINUA sem conta quando o servidor responde (a conta que
    // volta da nuvem não passa por cima de uma que o jogador criou ou digitou enquanto ela esperava)
    async entra(codigo, op) {
      const k = normaliza(codigo);
      if (!k) return { erro: 'codigo' };
      const r = await chama('quiver_sync', { p_chave: k, p_recordes: [] });
      if (r.ok && r.id) {
        const antes = le();
        if (op && op.soSeVazio && antes && antes.id && antes.chave !== k) return { erro: 'ja_tem' };
        if (antes && antes.id && antes.chave !== k) guardaAntiga(antes);
        grava(Object.assign(junta({ chave: k }, r), { versao: 1, enviada: 0, enviadoEm: Date.now() }));
        return r;
      }
      if (r.erro === 'sem_conta') {
        // (era a conta da reserva e ela não existe mais: deixa de ser oferecida)
        const a = leGaveta(ANTIGA); if (a && a.chave === k) try { guarda().removeItem(ANTIGA); } catch (e) { }
        return { erro: 'codigo' };
      }
      return r;
    },
    // uma conta que não é a deste celular mas não pode se perder (veio na cópia da nuvem): vai para a
    // gaveta de reserva, e a tela de entrar com código oferece VOLTAR PARA ELA
    guardaReserva(c) { if (c && typeof c.chave === 'string' && CHAVE_OK.test(c.chave) && c.id) guardaAntiga(c); },
    // a conta de antes, se não é a de agora (a tela de entrar com código oferece voltar para ela)
    antiga() { const a = leGaveta(ANTIGA), c = le(); return a && CHAVE_OK.test(a.chave) && (!c || c.chave !== a.chave) ? a : null; },
    // Enviar recordes e perfil. `dados` = { recordes: [[fase, estrelas, ms]...], nivel, avatar, insignia, pais }
    async sincroniza(dados) {
      const c = Rede.conta();
      if (!c) return { erro: 'sem_conta' };
      const versao = c.versao || 0, d = dados || {};
      const r = perdeu(await chama('quiver_sync', { p_chave: c.chave, p_recordes: d.recordes || [], p_nivel: d.nivel || null,
        p_avatar: d.avatar || null, p_insignia: d.insignia == null ? null : d.insignia, p_pais: d.pais || null }), c.chave);
      if (r.ok) {
        const agora = le();
        // (a conta pode ter mudado enquanto a resposta vinha: só atualiza se ainda é a mesma)
        if (agora && agora.chave === c.chave) grava(Object.assign(junta(agora, r), { enviada: Math.max(agora.enviada || 0, versao), enviadoEm: Date.now() }));
      }
      return r;
    },
    // configuração que o servidor pode trocar sem atualizar o app (0.9: frequência dos anúncios). Não
    // precisa de conta. null = não veio (o jogo usa a que já tinha).
    async config() { const r = await chama('quiver_config', {}); return r && !r.erro ? r : null; },
    // (leituras e ações: um "sem_conta" aqui não esquece a conta — quem decide é o envio, acima)
    ranking(escopo, pais) {
      const c = Rede.conta();
      return chama('quiver_ranking', { p_chave: c ? c.chave : null, p_escopo: escopo, p_pais: pais || null, p_limite: 50 });
    },
    async amigos() { const c = Rede.conta(); return c ? chama('quiver_amigos', { p_chave: c.chave }) : { erro: 'sem_conta' }; },
    async convida(nome) { const c = Rede.conta(); return c ? chama('quiver_convidar', { p_chave: c.chave, p_nome: nome }) : { erro: 'sem_conta' }; },
    async responde(id, aceita) { const c = Rede.conta(); return c ? chama('quiver_responder', { p_chave: c.chave, p_id: id, p_aceita: !!aceita }) : { erro: 'sem_conta' }; },
    async remove(id) { const c = Rede.conta(); return c ? chama('quiver_remover', { p_chave: c.chave, p_id: id }) : { erro: 'sem_conta' }; },
    async fase(n) { const c = Rede.conta(); return c ? chama('quiver_fase', { p_chave: c.chave, p_fase: n }) : { erro: 'sem_conta' }; },
    async renomeia(nome) {
      const c = Rede.conta();
      if (!c) return { erro: 'sem_conta' };
      const r = await chama('quiver_renomear', { p_chave: c.chave, p_nome: nome });
      if (r.ok) { const agora = le(); if (agora && agora.chave === c.chave) grava(junta(agora, r)); }
      return r;
    },
    // apagar a conta do ranking (no servidor e aqui)
    async apaga() {
      const c = Rede.conta();
      if (!c) return { erro: 'sem_conta' };
      const r = await chama('quiver_apagar', { p_chave: c.chave });
      if (r.ok || r.erro === 'sem_conta') {
        try { guarda().setItem(APAGADA, c.chave); } catch (e) { }
        const agora = le(); if (agora && agora.chave === c.chave) grava(null);
        return { ok: true };
      }
      return r;
    },
    // (testes)
    _troca(o) {
      if ('armazem' in o) armazem = o.armazem;
      if ('busca' in o) busca = o.busca;
      if ('ponte' in o) { ponteTeste = o.ponte; espelhada = null; semCopia = false; }
    },
  };
  if (typeof module === 'object' && module.exports) module.exports = Rede; else raiz.Rede = Rede;
})(this);
