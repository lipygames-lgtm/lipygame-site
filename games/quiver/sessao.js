// Quiver — regras de UMA partida: pressão (tempo ou corações), combo, FEVER, power-ups, estrelas.
// Não desenha nada: a tela chama toca()/tick() e lê a fila `eventos` para animar.
// O relógio é o `tick(dt)` que a tela chama; nos testes, quem chama é o teste (tempo exato).
(function (raiz, fabrica) {
  const M = fabrica(typeof module === 'object' && module.exports ? require('./engine.js') : raiz.Motor);
  if (typeof module === 'object' && module.exports) module.exports = M; else raiz.Sessao = M;
})(this, function (Motor) {
  'use strict';

  function Sessao(fase, modo, cfg) {
    this.modo = modo;               // 'rush' | 'classic'
    this.cfg = cfg;
    this.fase = fase;               // o chefe final usa o molde dela para a próxima onda
    this.c = Motor.le(fase.g, fase.w || 6, fase.h || 7);
    this.total = Motor.contaSetas(this.c);
    this.restantes = this.total;
    this.limite = modo === 'rush' ? fase.t : 0;
    this.resta = this.limite;       // segundos no relógio
    // Rush: quanto cada erro tira do relógio (cresce nas fases avançadas) e a velocidade do relógio,
    // que acelera a cada erro e volta ao normal no FEVER ("recuperei o controle")
    this.pen = modo === 'rush' ? (fase.pen || cfg.penalidade) : 0;
    this.vel = 1;
    this.iniciou = modo !== 'rush'; // só o Rush espera o 1º toque
    this.leitura = 0;
    // (a fase pode trazer os dela: o DESAFIO RELÂMPAGO "um coração só")
    this.coracoes = modo === 'classic' ? (fase.coracoes || cfg.classic_coracoes) : 0;
    this.coracoesMax = this.coracoes;
    this.agora = 0;                 // tempo de JOGO (só anda no tick, que para na pausa)
    this.t0 = null; this.tFim = null; // começo e fim da partida em tempo de jogo (dados do teste)
    this.combo = 0; this.maxCombo = 0; this.ultimoAcerto = -1e9;
    this.poder = 0; this.fever = 0; this.gelo = 0; this.raio = 0;
    this.erros = 0; this.bonus = 0; this.fevers = 0;
    this.ultimoErro = null;         // o que o DESFAZER devolve (só logo depois do erro)
    // 'jogando' | 'salvavel' (erro fatal, esperando o DESFAZER) | 'vitoria' | 'tempo' | 'coracoes'
    this.estado = 'jogando';
    this.salvaT = 0; this.salvaMotivo = null;
    this.temDesfazer = null;        // a tela informa se o jogador tem DESFAZER no estoque
    this.usos = { desfazer: 0, bomba: 0, gelo: 0, raio: 0 };
    this.eventos = [];
    // CHEFE (última fase das arenas 2 a 5 do Classic): a vida dele É o progresso da fase — cada
    // seta que sai tira a parte dela e ele cai junto com a ÚLTIMA (pedido do dono: "a fase é o que
    // derrota o chefe"; antes ele morria com setas sobrando). O combo não tira vida extra.
    // `vidaChefe` = quantas ondas de setas a luta tem: o chefe final tem 2 (a 1ª onda leva metade
    // da vida e cai outra). A cada poucas jogadas ele ataca o tabuleiro; tudo que o ataque põe é
    // TEMPORÁRIO (ou peça falsa, que não bloqueia): a fase continua sempre com solução.
    this.chefe = null;
    if (fase.chefe && modo === 'classic') {
      const ondas = Math.max(1, fase.vidaChefe || 1), hp = this.total * cfg.chefe_dano * ondas;
      this.chefe = { hp, hpMax: hp, ondas, onda: 1, setasOnda: this.total, ataque: fase.ataque || 'pedra', conta: 0, n: 0, marcos: {} };
    }
    // sorteio dos ataques: com semente (testes) ou do relógio (jogo)
    this.rnd = Motor.rng(cfg.semente != null ? cfg.semente : (Date.now() ^ (this.total * 7919)));
  }
  const P = Sessao.prototype;

  P.emite = function (tipo, dados) { this.eventos.push(Object.assign({ tipo, t: this.agora }, dados)); };
  P.ativo = function () { return this.estado === 'jogando'; };
  P.relogioParado = function () { return this.fever > 0 || this.gelo > 0; };
  P.marcaInicio = function () { if (this.t0 == null) this.t0 = this.agora; };
  // tempo de jogo do primeiro toque (ou do relógio começar) até o fim: sem pausas, sem as animações
  P.duracao = function () { return this.t0 == null ? 0 : (this.tFim != null ? this.tFim : this.agora) - this.t0; };
  // Classic: tempo da fase para o recorde (e o ranking) — conta desde que a fase abriu, não do 1º
  // toque (pensar antes de tocar também é jogar; senão dava para resolver tudo de cabeça e só então
  // tocar). É tempo de JOGO: pausa e balão do tutorial não contam.
  P.tempoFase = function () { return this.tFim != null ? this.tFim : this.agora; };

  P.inicia = function () { if (!this.iniciou) { this.iniciou = true; this.marcaInicio(); this.emite('inicio'); } };

  P.termina = function (motivo) {
    this.estado = motivo; this.tFim = this.agora; this.salvaMotivo = null;
    this.emite('fim', { motivo });
  };
  // Erro que acabaria a fase: se o jogador tem DESFAZER, ganha `graca` segundos para usar
  // (o relógio fica parado); senão, acaba na hora.
  P.fatal = function (motivo) {
    if (this.cfg.graca > 0 && typeof this.temDesfazer === 'function' && this.temDesfazer()) {
      this.estado = 'salvavel'; this.salvaMotivo = motivo; this.salvaT = this.cfg.graca;
      this.emite('salvavel', { s: this.cfg.graca, motivo });
    } else this.termina(motivo);
  };

  P.tick = function (dt) {
    if (!(dt > 0)) return;
    dt = Math.min(dt, 0.25); // aparelho engasgou: não comer segundos de uma vez
    this.agora += dt;
    if (this.estado === 'salvavel') {
      this.salvaT -= dt;
      if (this.salvaT <= 0) this.termina(this.salvaMotivo);
      return;
    }
    if (!this.ativo()) return;
    // tempo que conta no relógio neste tick: se a leitura acabou agora, só o que passou dela
    let dtRelogio = dt;
    if (!this.iniciou) {
      this.leitura += dt;
      if (this.leitura >= this.cfg.leitura_max) { dtRelogio = this.leitura - this.cfg.leitura_max; this.inicia(); }
      else dtRelogio = 0;
    }
    // FEVER e gelo congelam o relógio; os dois contam seu próprio tempo
    const antesFever = this.fever;
    if (this.fever > 0) { this.fever = Math.max(0, this.fever - dt); if (antesFever > 0 && this.fever === 0) this.emite('fever-fim'); }
    else if (this.gelo > 0) { this.gelo = Math.max(0, this.gelo - dt); if (this.gelo === 0) this.emite('gelo-fim'); }
    else if (this.modo === 'rush' && this.iniciou && dtRelogio > 0) {
      this.resta = Math.max(0, this.resta - dtRelogio * this.vel);
      // acabar por relógio não é erro: não há o que desfazer
      if (this.resta === 0) { this.termina('tempo'); return; }
    }
    if (this.raio > 0) { this.raio = Math.max(0, this.raio - dt); if (this.raio === 0) this.emite('raio-fim'); }
    // o que o chefe pôs no tabuleiro tem prazo: bloco temporário some, seta congelada descongela
    if (this.chefe) for (let i = 0; i < this.c.length; i++) {
      const p = this.c[i]; if (!p) continue;
      if (p.k === 't') { p.ate -= dt; if (p.ate <= 0) { this.c[i] = null; this.emite('some', { i, estilo: p.estilo }); } }
      else if (p.k === 'a' && p.gelo > 0) { p.gelo -= dt; if (p.gelo <= 0) { delete p.gelo; this.emite('degelo', { i }); } }
    }
    // combo e barra do FEVER esfriam quando o jogador para
    if (this.agora - this.ultimoAcerto > this.cfg.combo_janela) {
      if (this.combo > 0) { this.combo = 0; this.emite('combo-fim'); }
      if (this.fever === 0 && this.poder > 0) this.poder = Math.max(0, this.poder - this.cfg.poder_decai * dt);
    }
  };

  // toque do jogador na casa i
  P.toca = function (i) {
    if (!this.ativo()) return { r: 'nada' };
    const p = this.c[i];
    if (!p) return { r: 'nada' };
    if (p.k === 'x' || p.k === 't') { this.emite('pedra', { i }); return { r: 'pedra' }; }
    if (p.k === 'f' && p.revelada) return { r: 'nada' }; // falsa já descoberta: só um fantasma
    // seta congelada pelo chefe: não sai e não é erro (o jogador só precisa esperar descongelar)
    if (p.k === 'a' && p.gelo > 0) { this.emite('congelada', { i }); return { r: 'congelada' }; }
    this.marcaInicio();
    this.inicia();
    if (p.k === 'f') { p.revelada = true; return this.erro(i, { falsa: true }); }
    const b = Motor.bloqueador(this.c, i);
    if (b < 0) return this.sai(i);
    return this.erro(i, { b });
  };

  P.sai = function (i) {
    const p = this.c[i];
    this.c[i] = null;
    this.restantes--;
    const seguido = this.agora - this.ultimoAcerto <= this.cfg.combo_janela;
    this.combo = seguido ? this.combo + 1 : 1;
    this.ultimoAcerto = this.agora;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    this.ultimoErro = null;
    this.emite('sai', { i, d: p.d, cor: p.c, combo: this.combo });
    if (this.combo >= 2) this.emite('combo', { n: this.combo });
    if (this.modo === 'rush') {
      // bônus de tempo do combo, com teto
      if (this.combo % this.cfg.combo_passo === 0) {
        const teto = this.cfg.bonus_teto * this.limite - this.bonus;
        const ganho = Math.max(0, Math.min(this.cfg.combo_bonus, teto));
        if (ganho > 0) { this.bonus += ganho; this.resta += ganho; this.emite('bonus', { s: ganho }); }
      }
      // barra do FEVER enche com acertos em sequência. Só no Rush: o FEVER congela o relógio, e o
      // Classic (o controle do teste, sem pressão) não tem relógio para congelar.
      if (this.fever === 0 && this.combo >= 2) {
        this.poder = Math.min(this.cfg.poder_max, this.poder + 1);
        if (this.poder >= this.cfg.poder_max) {
          this.fever = this.cfg.fever_seg; this.poder = 0; this.fevers++;
          const acelerado = this.vel > 1;
          this.vel = 1; // o FEVER devolve o relógio à velocidade normal
          this.emite('fever', { acalmou: acelerado });
        }
      }
    }
    if (this.chefe) {
      this.vidaDoProgresso(i);
      // com setas no tabuleiro ele segue contando para atacar (a última seta encerra a onda)
      if (this.restantes > 0) this.contaAtaque();
    }
    if (this.restantes === 0 && this.ativo()) this.acabouTabuleiro();
    return { r: 'sai', d: p.d };
  };

  // Tabuleiro vazio: vitória — ou, se a luta tem mais uma onda (chefe final), cai o tabuleiro
  // seguinte. A vida do chefe zera junto com a última seta da última onda.
  P.acabouTabuleiro = function () {
    const ch = this.chefe;
    if (ch && ch.onda < ch.ondas) this.novaOnda();
    else { if (ch) ch.hp = 0; this.termina('vitoria'); }
  };
  // monta o tabuleiro da próxima onda no molde da fase (a tela chama antes, com o celular folgado;
  // se não deu tempo, novaOnda monta na hora)
  P.preparaOnda = function () {
    if (this.ondaPronta) return;
    const f = this.fase, molde = Motor.le(f.g, f.w || 6, f.h || 7);
    const setas = Motor.contaSetas(molde);
    let blocos = 0; for (const p of molde) if (p && p.k === 'x') blocos++;
    const prof = f.p || Math.max(2, Math.round(setas * 0.3));
    const r = Motor.gera({
      w: molde.w, h: molde.h, setas, blocos, falsas: Motor.contaFalsas(molde),
      prof: [Math.max(2, prof - 2), prof + 2], maxLivresInicio: Math.max(3, Math.round(setas * 0.22) + 1),
      tentativas: this.cfg.chefe_onda_tentativas,
    }, Math.floor(this.rnd() * 1e9));
    // (sem tabuleiro gerado, repete o da fase: nunca deixa a luta sem setas)
    this.ondaPronta = r.celulas || molde;
  };
  P.novaOnda = function () {
    const ch = this.chefe;
    this.preparaOnda();
    this.c = this.ondaPronta; this.ondaPronta = null;
    const novas = Motor.contaSetas(this.c);
    this.total += novas; this.restantes = novas;
    ch.onda++; ch.setasOnda = novas; ch.conta = 0; ch.avisou = false;
    this.ultimoErro = null; // o tabuleiro é outro: nada do anterior pode ser desfeito
    this.emite('onda', { n: ch.onda });
  };

  // ---------- chefe ----------
  // vida = o que falta da luta: as ondas que ainda vêm + a fração de setas que resta nesta onda
  P.vidaDoProgresso = function (i) {
    const ch = this.chefe; if (!ch) return;
    const falta = (ch.ondas - ch.onda) + this.restantes / ch.setasOnda;
    const hp = Math.max(0, Math.round(ch.hpMax * falta / ch.ondas));
    const dano = ch.hp - hp; if (dano <= 0) return;
    ch.hp = hp;
    this.emite('dano', { v: dano, hp, hpMax: ch.hpMax, i });
    // marcos para as falas ("isso doeu!" na metade, desespero perto do fim)
    const f = hp / ch.hpMax;
    if (f <= 0.5 && !ch.marcos.metade) { ch.marcos.metade = true; this.emite('chefe-metade'); }
    if (f <= 0.2 && !ch.marcos.quase) { ch.marcos.quase = true; this.emite('chefe-quase'); }
  };
  P.enfurecido = function () { return !!this.chefe && this.chefe.hp < this.chefe.hpMax * this.cfg.chefe_raiva; };
  // o chefe ataca a cada `chefe_cada` acertos (menos quando enfurecido) e avisa uma jogada antes
  // Todo ataque vem depois de um aviso ('carrega'). Quando o chefe se enfurece no meio da conta, o
  // ciclo encurta (5 -> 4): sem a trava, a conta pulava o aviso e o ataque vinha de surpresa.
  P.contaAtaque = function () {
    const ch = this.chefe, cada = this.cfg.chefe_cada[this.enfurecido() ? 1 : 0];
    ch.conta++;
    if (!ch.avisou && ch.conta >= cada - 1) { ch.avisou = true; ch.conta = cada - 1; this.emite('carrega'); return; }
    if (ch.conta >= cada) { ch.conta = 0; ch.avisou = false; this.ataca(); }
  };
  P.embaralha = function (a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // casas vazias no CAMINHO de setas livres (é onde um obstáculo atrapalha de verdade)
  P.casasNoCaminho = function () {
    const set = new Set();
    for (const s of Motor.livres(this.c)) for (const j of Motor.caminho(this.c, s, this.c[s].d)) if (!this.c[j]) set.add(j);
    return this.embaralha([...set]);
  };
  P.ataca = function () {
    const ch = this.chefe; ch.n++;
    let tipo = ch.ataque;
    if (tipo === 'tudo') tipo = ['ilusao', 'pedra', 'gelo', 'areia'][(ch.n - 1) % 4];
    const k = this.cfg.chefe_forca[this.enfurecido() ? 1 : 0];
    if (tipo === 'gelo') {
      const alvo = this.embaralha(Motor.livres(this.c)).slice(0, k);
      if (!alvo.length) tipo = 'ilusao';
      else {
        for (const i of alvo) this.c[i].gelo = this.cfg.chefe_gelo_seg;
        // (a chave é `golpe`, não `tipo`: `tipo` é o nome do evento e seria sobrescrito)
        this.emite('ataque', { golpe: tipo, casas: alvo });
        return;
      }
    }
    if (tipo === 'pedra' || tipo === 'areia') {
      let casas = this.casasNoCaminho().slice(0, k);
      if (casas.length < k) {
        const vazias = []; for (let i = 0; i < this.c.length; i++) if (!this.c[i] && !casas.includes(i)) vazias.push(i);
        casas = casas.concat(this.embaralha(vazias).slice(0, k - casas.length));
      }
      for (const i of casas) this.c[i] = { k: 't', ate: this.cfg.chefe_bloco_seg, estilo: tipo };
      this.emite('ataque', { golpe: tipo, casas });
      return;
    }
    // ilusão: peças falsas onde parecem bloquear uma seta livre (falsa nunca bloqueia de verdade)
    let casas = this.casasNoCaminho().slice(0, k);
    if (casas.length < k) {
      const vazias = []; for (let i = 0; i < this.c.length; i++) if (!this.c[i] && !casas.includes(i)) vazias.push(i);
      casas = casas.concat(this.embaralha(vazias).slice(0, k - casas.length));
    }
    const pecas = casas.map(i => { const p = { k: 'f', d: Math.floor(this.rnd() * 4), c: this.rnd() < .5 ? 0 : 1 }; this.c[i] = p; return { i, d: p.d, c: p.c }; });
    this.emite('ataque', { golpe: 'ilusao', casas, pecas });
  };

  // Erro do jogador: tocar numa seta bloqueada (`b` = quem bloqueia) ou numa peça falsa (`falsa`).
  // O evento se chama 'bate' ou 'falsa' para a tela animar cada um do seu jeito.
  P.erro = function (i, o) {
    const ev = o.falsa ? 'falsa' : 'bate', r = o.falsa ? 'falsa' : 'bate';
    // no FEVER (Rush) o erro não custa nada: é o momento de poder
    if (this.fever > 0 && this.modo === 'rush') { this.emite(ev, { i, b: o.b, gratis: true }); return { r, b: o.b, gratis: true }; }
    this.erros++;
    const comboAntes = this.combo, poderAntes = this.poder, velAntes = this.vel;
    if (this.combo > 0) this.emite('combo-fim', { erro: true });
    this.combo = 0;
    this.poder = Math.max(0, this.poder - this.cfg.poder_erro);
    if (this.modo === 'rush') {
      const pen = Math.min(this.pen, this.resta);
      this.resta -= pen;
      // cada erro acelera o relógio (até o teto); o FEVER devolve ao normal
      this.vel = Math.min(this.cfg.vel_max, this.vel + this.cfg.vel_erro);
      this.ultimoErro = { tipo: 'tempo', valor: pen, comboAntes, poderAntes, velAntes };
      this.emite(ev, { i, b: o.b, pen, vel: this.vel });
      if (this.resta <= 0) { this.resta = 0; this.fatal('tempo'); }
    } else if (this.coracoesMax > 0) {
      this.coracoes--;
      this.ultimoErro = { tipo: 'coracao', comboAntes, poderAntes, velAntes };
      this.emite(ev, { i, b: o.b, coracao: true });
      if (this.coracoes <= 0) this.fatal('coracoes');
    } else {
      this.ultimoErro = { tipo: 'nada', comboAntes, poderAntes, velAntes };
      this.emite(ev, { i, b: o.b });
    }
    return { r, b: o.b };
  };

  // ---------- power-ups (a tela confere o estoque; aqui é só a regra) ----------
  P.podeDesfazer = function () { return (this.ativo() || this.estado === 'salvavel') && !!this.ultimoErro; };
  P.desfazer = function () {
    if (!this.podeDesfazer()) return false;
    const e = this.ultimoErro;
    if (e.tipo === 'tempo') this.resta += e.valor;
    if (e.tipo === 'coracao') this.coracoes = Math.min(this.coracoesMax, this.coracoes + 1);
    this.combo = e.comboAntes;
    this.poder = e.poderAntes;
    this.vel = e.velAntes;
    if (this.combo > 0) this.ultimoAcerto = this.agora; // o combo devolvido ganha a janela de novo
    this.erros = Math.max(0, this.erros - 1);
    this.ultimoErro = null;
    this.usos.desfazer++;
    const salvou = this.estado === 'salvavel';
    if (salvou) { this.estado = 'jogando'; this.salvaMotivo = null; this.salvaT = 0; }
    this.emite('desfeito', { era: e.tipo, valor: e.valor || 0, salvou }); // (não usar a chave `tipo`: ela é o nome do evento)
    return true;
  };

  // casas atingidas pela explosão centrada em i
  P.areaBomba = function (i) {
    const W = this.c.w, H = this.c.h, x = i % W, y = i / W | 0, out = [];
    const forma = this.cfg.bomba;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (forma === 'uma' && (dx || dy)) continue;
      if (forma === 'cruz' && dx && dy) continue;
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H) out.push(ny * W + nx);
    }
    return out;
  };
  P.bomba = function (i) {
    if (!this.ativo()) return false;
    this.marcaInicio();
    this.inicia();
    const area = this.areaBomba(i), foram = [];
    let setas = 0;
    for (const j of area) if (this.c[j]) { foram.push({ i: j, k: this.c[j].k, d: this.c[j].d, cor: this.c[j].c }); if (this.c[j].k === 'a') { this.restantes--; setas++; } this.c[j] = null; }
    this.usos.bomba++;
    // a explosão mexe no tabuleiro: o erro anterior deixa de ser desfazível
    this.ultimoErro = null;
    this.emite('explode', { i, foram });
    // no chefe, cada seta explodida também conta como progresso (tira a parte dela da vida)
    if (this.chefe && setas) this.vidaDoProgresso(i);
    if (this.restantes === 0 && this.ativo()) this.acabouTabuleiro();
    return true;
  };
  P.congela = function () {
    if (!this.ativo() || this.modo !== 'rush') return false;
    this.marcaInicio();
    this.inicia();
    this.gelo += this.cfg.gelo_seg;
    this.usos.gelo++;
    this.emite('gelo');
    return true;
  };
  P.acendeRaio = function () {
    if (!this.ativo() || this.raio > 0) return false;
    this.raio = this.cfg.raio_seg;
    this.usos.raio++;
    this.emite('raio', { livres: Motor.livres(this.c) });
    return true;
  };

  // REVIVER: a partida perdida (tempo ou corações) continua de onde parou — o Rush ganha `seg`
  // segundos e o relógio volta à velocidade normal; o Classic ganha 1 coração. O tabuleiro fica
  // como estava. (Quantas vezes por tentativa e quanto custa é regra da tela.)
  P.revive = function (seg) {
    if (this.estado !== 'tempo' && this.estado !== 'coracoes') return false;
    if (this.modo === 'rush') { this.resta = Math.max(this.resta, 0) + seg; this.vel = 1; }
    else this.coracoes = Math.min(this.coracoesMax, this.coracoes + 1);
    this.estado = 'jogando'; this.tFim = null; this.salvaMotivo = null; this.ultimoErro = null;
    this.combo = 0;
    this.revives = (this.revives || 0) + 1;
    this.emite('revive');
    return true;
  };

  P.estrelas = function () {
    if (this.estado !== 'vitoria') return 0;
    // vitória depois de REVIVER vale 1 estrela: a sobra do tempo devolvido não é mérito
    if (this.revives) return 1;
    if (this.modo === 'rush') {
      const f = this.limite > 0 ? this.resta / this.limite : 1;
      return f >= this.cfg.estrelas_rush[0] ? 3 : f >= this.cfg.estrelas_rush[1] ? 2 : 1;
    }
    return this.erros === 0 ? 3 : this.erros === 1 ? 2 : 1;
  };

  // fila de eventos para a tela: devolve e esvazia
  P.consome = function () { const e = this.eventos; this.eventos = []; return e; };

  return Sessao;
});
