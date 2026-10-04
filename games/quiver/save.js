// Perfil do jogador no aparelho (localStorage). Tudo que precisa sobreviver a fechar o app.
// `tele` = telemetria local do teste Classic x Rush (GDD seção 7): nada sai do aparelho.
(function (raiz) {
  'use strict';
  const CHAVE = 'quiver-v1';
  const MAX_TELE = 400;

  function padrao(cfg) {
    return {
      v: 1,
      moedas: cfg.moedas_iniciais, gemas: cfg.gemas_iniciais,
      estoque: Object.assign({}, cfg.estoque_inicial),
      estrelas: { rush: [], classic: [] }, // melhor resultado por fase (0 = não venceu)
      tempos: { classic: [] },            // recorde (s) de cada fase do Classic — base do ranking
      // volumes em 5 degraus (0 = desligado ... 4 = máximo). Música começa na metade ("não muito alta")
      volMusica: 2, volEfeitos: 4, vibra: true, idioma: null,
      diario: { ultimo: null, seq: 0 },   // último dia pego (AAAA-MM-DD) e dias seguidos
      visto: {},                          // tutoriais já mostrados
      energia: { n: cfg.energia_max, prox: null }, // prox = quando entra a próxima (ms)
      ritmo: 1,                           // ritmo do jogador no Rush (1 = jogador médio do robô)
      emJogo: null,                       // fase começada e ainda sem resultado (fechar o app = derrota)
      // avisos do celular: null = o jogador ainda não escolheu · quando perguntamos pela última vez ·
      // quantos "agora não" (no 2º paramos de perguntar) · avisos seguidos que ele deixou passar
      // (quem ignora recebe menos)
      avisos: null, avisosPedido: 0, avisosNao: 0, avisosIgnorados: 0,
      desafios: {},                       // DESAFIO RELÂMPAGO por id: { t: início, x2: veio pelo aviso, feito: venceu }
      desafioTeste: null,                 // desafio do atalho de teste (só no APK de teste)
      // menu (0.7): corações comprados (0-2), contadores de toda a vida (conquistas), missões (do
      // dia e da semana: contadores + as já pegas), níveis de conquista já pagos, perfil (foto e
      // insígnia), skins das setas, giros grátis da roleta, e compras com dinheiro (0.9)
      coracoesExtra: 0,
      stats: {},
      missoes: { dia: null, cont: {}, pegas: [], semana: null, contSem: {}, pegaSem: false },
      conquistas: {},
      perfil: { avatar: 'seta-azul', insignia: null },
      skins: { tem: ['classica'], usa: 'classica' },
      roleta: { dia: null, usados: 0, extras: 0 },
      semAnuncios: false, passeReviver: false,
      // monetização (0.9): tokens das compras de diamantes/moedas já ENTREGUES (nunca dá duas vezes) e
      // os anúncios (premiados vistos hoje; vitórias desde o último intersticial e quando foi)
      compras: { entregues: [] },
      anuncios: { dia: null, usados: {}, desde: 0, ultimo: 0 },
      // tudo o que já foi GASTO de diamantes e moedas, e USADO de cada item do estoque (só crescem): é o
      // que impede a cópia desatualizada da nuvem de "devolver" o que foi gasto enquanto ela não via
      gasto: { gemas: 0, moedas: 0 }, usados: {},
      // quantas vezes o progresso foi APAGADO (viaja na nuvem): a cópia de um apagamento mais novo
      // vence a de antes, em qualquer aparelho (nuvem.js)
      apagado: 0,
      tele: [],
    };
  }

  const Perfil = {
    d: null,
    carrega(cfg) {
      let d = null;
      try { d = JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch (e) { d = null; }
      this.d = this.normaliza(d, cfg);
      return this.d;
    },
    // completa um perfil (do disco ou da nuvem) com o que faltar — sem recriar o que ele já tem
    normaliza(d, cfg) {
      const p = padrao(cfg);
      if (!d || typeof d !== 'object' || d.v !== 1) d = p;
      // perfil da v0.1 (sem energia): ganha os diamantes iniciais junto com a energia
      if (!('energia' in d)) d.gemas = Math.max(d.gemas || 0, cfg.gemas_iniciais);
      // perfil até a v0.2: som/música eram liga-desliga
      if (typeof d.som === 'boolean' && !('volEfeitos' in d)) d.volEfeitos = d.som ? 4 : 0;
      if (typeof d.musica === 'boolean' && !('volMusica' in d)) d.volMusica = d.musica ? 2 : 0;
      delete d.som; delete d.musica;
      // campos novos de versões futuras (ou que vieram vazios da nuvem) entram com o padrão
      for (const k of Object.keys(p)) if (!(k in d) || d[k] === undefined || d[k] === null && p[k] !== null) d[k] = p[k];
      for (const k of Object.keys(p.estoque)) if (!(k in d.estoque)) d.estoque[k] = p.estoque[k];
      if (!d.estrelas.rush) d.estrelas.rush = []; if (!d.estrelas.classic) d.estrelas.classic = [];
      if (!d.tempos || !Array.isArray(d.tempos.classic)) d.tempos = { classic: [] };
      return d;
    },
    aoSalvar: null, // (a cópia na nuvem acompanha: main.js)
    salva() {
      try { localStorage.setItem(CHAVE, JSON.stringify(this.d)); } catch (e) { /* cheio: segue sem salvar */ }
      if (typeof this.aoSalvar === 'function') { try { this.aoSalvar(); } catch (e) { } }
    },
    apaga(cfg) { try { localStorage.removeItem(CHAVE); } catch (e) { } this.d = padrao(cfg); this.salva(); },

    estrelas(modo, k) { return this.d.estrelas[modo][k] || 0; },
    liberada(modo, k) { return k === 0 || this.estrelas(modo, k - 1) > 0; },
    // próxima fase a jogar no modo (a primeira ainda não vencida)
    atual(modo, total) { for (let k = 0; k < total; k++) if (!this.estrelas(modo, k)) return k; return total - 1; },

    // registra vitória e devolve as moedas ganhas (primeira vez, estrela nova, ou repetição)
    vence(modo, k, estrelas, cfg) {
      const antes = this.estrelas(modo, k);
      let ganho;
      if (!antes) ganho = cfg.moedas.primeira + cfg.moedas.estrela * estrelas;
      else if (estrelas > antes) ganho = cfg.moedas.estrela * (estrelas - antes);
      else ganho = cfg.moedas.repeticao;
      if (estrelas > antes) this.d.estrelas[modo][k] = estrelas;
      this.d.moedas += ganho;
      this.salva();
      return ganho;
    },

    // recompensa diária: 7 dias seguidos; pular um dia recomeça do 1
    hoje(agora) { const d = agora || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); },
    diarioDisponivel(agora) { return this.d.diario.ultimo !== this.hoje(agora); },
    diarioDia(agora) {
      // qual dia da sequência seria pego agora (0..6)
      const u = this.d.diario.ultimo;
      if (!u) return 0;
      const ontem = new Date(agora || new Date()); ontem.setDate(ontem.getDate() - 1);
      if (u === this.hoje(ontem)) return this.d.diario.seq % 7;
      if (u === this.hoje(agora)) return (this.d.diario.seq - 1) % 7;
      return 0;
    },
    // ---------- energia: gasta só ao PERDER; volta 1 a cada `energia_min` minutos ----------
    energiaAgora(cfg, agora) {
      const e = this.d.energia, int = cfg.energia_min * 60000, t = agora || Date.now();
      while (e.n < cfg.energia_max && e.prox && t >= e.prox) { e.n++; e.prox = e.n < cfg.energia_max ? e.prox + int : null; }
      if (e.n >= cfg.energia_max) { e.n = cfg.energia_max; e.prox = null; }
      return e;
    },
    gastaEnergia(cfg, agora) {
      const t = agora || Date.now(), e = this.energiaAgora(cfg, t);
      if (e.n > 0) e.n--;
      if (e.n < cfg.energia_max && !e.prox) e.prox = t + cfg.energia_min * 60000;
      this.salva();
    },
    // devolve 1 energia (REVIVER: a derrota que gastou virou uma partida que continua; roleta)
    ganhaEnergia(cfg, agora) {
      const e = this.energiaAgora(cfg, agora);
      e.n = Math.min(cfg.energia_max, e.n + 1);
      if (e.n >= cfg.energia_max) e.prox = null;
      this.salva();
    },
    encheEnergia(cfg) { this.d.energia = { n: cfg.energia_max, prox: null }; this.salva(); },

    pegaDiario(cfg, agora) {
      if (!this.diarioDisponivel(agora)) return null;
      const dia = this.diarioDia(agora);
      const premio = cfg.diario[dia];
      if (typeof premio === 'number') this.d.moedas += premio;
      else for (const [k, q] of Object.entries(premio)) {
        if (k === 'gemas') this.d.gemas += q; else this.d.estoque[k] = (this.d.estoque[k] || 0) + q;
      }
      this.d.diario = { ultimo: this.hoje(agora), seq: dia + 1 };
      this.salva();
      return { dia, premio };
    },

    registra(ev) {
      this.d.tele.push(ev);
      if (this.d.tele.length > MAX_TELE) this.d.tele.splice(0, this.d.tele.length - MAX_TELE);
      this.salva();
    },
    // resumo por modo para a tela "Dados do teste"
    resumo() {
      const r = {};
      for (const modo of ['rush', 'classic']) {
        // (a derrota que o jogador REVIVEU não foi uma tentativa perdida: a vitória dela conta)
        const L = this.d.tele.filter(e => e.modo === modo && !e.reviveu);
        const vit = L.filter(e => e.res === 'vitoria');
        const der = L.filter(e => e.res === 'tempo' || e.res === 'coracoes');
        const tempos = vit.map(e => e.dur).sort((a, b) => a - b);
        r[modo] = {
          tentativas: L.length, vitorias: vit.length, derrotas: der.length,
          repetiu: der.filter(e => e.repetiu).length, desistiu: der.filter(e => e.desistiu).length,
          mediana: tempos.length ? tempos[tempos.length >> 1] : 0,
        };
      }
      return r;
    },
  };
  raiz.Perfil = Perfil;
})(this);
