// Quiver — quais AVISOS (notificações do celular) agendar e quando. Só a regra: quem fala com o
// Android (ponte LipyNotify) é o main.js, que chama isto sempre que o jogo vai para segundo plano
// — a agenda nova substitui a anterior inteira.
//
// Regras (para o jogador não desligar tudo):
// - no máximo 2 avisos por dia e 3 horas entre um e outro;
// - silêncio das 22h às 9h (o de energia cheia espera a manhã; os outros já são de dia);
// - ordem de importância quando não cabe tudo: desafio > energia cheia > prêmio diário > saudade;
// - quem IGNORA os avisos recebe menos: 3 seguidos sem abrir o jogo e somem os de energia e de
//   prêmio diário; 6 e só ficam os desafios. Tocar num aviso zera a conta;
// - no máximo 8 agendados (uma semana, no pior caso): quem parou de jogar não é perseguido.
(function (raiz) {
  'use strict';
  const H = 3600000, DIA = 24 * H;
  const MAX = 8, POR_DIA = 2, ESPACO = 3 * H;
  const PRIO = { desafio: 0, vem: 1, energia: 2, diario: 3, volta: 4 };
  // datas comemorativas: o aviso ganha o emoji, o ícone (res/drawable/ic_<data>) e a cor da data
  const EMOJI = { natal: '🎄', halloween: '🎃', pascoa: '🐰', patrick: '🍀' };
  const COR = { natal: '#E53935', halloween: '#FF8F00', pascoa: '#EC407A', patrick: '#2E7D32' };

  const silencio = ms => { const h = new Date(ms).getHours(); return h >= 22 || h < 9; };
  // o dia `d` dias depois de `ms`, às `h` horas (hora local)
  function diaAs(ms, d, h, m) { const x = new Date(ms); x.setDate(x.getDate() + d); x.setHours(h, m || 0, 0, 0); return x.getTime(); }
  // passou das 22h: a próxima manhã, 9h30
  const manha = ms => new Date(ms).getHours() >= 22 ? diaAs(ms, 1, 9, 30) : diaAs(ms, 0, 9, 30);
  const diaDe = ms => { const x = new Date(ms); return x.getFullYear() * 400 + x.getMonth() * 32 + x.getDate(); };

  // ctx: { agora, t(chave, vars), eventos: [{id, tipo, ini, fim, chefeNome, imagem}] (os que ainda não foram
  //        vencidos), energiaCheia: ms | null, diarioHoje: bool (já pegou o de hoje), diarioDia: 1-7,
  //        chefeVolta + falaVolta: o chefe (e a provocação dele) que chama quem sumiu há 5 dias,
  //        ignorados: avisos seguidos que o jogador deixou passar,
  //        entregues: horários dos avisos que JÁ apareceram (a agenda é refeita a cada saída do
  //        jogo: sem eles, o "2 por dia" valia só dentro de cada agenda),
  //        vemData: { id, ini, chefeNome, imagem } da próxima semana especial (aviso na véspera),
  //        iconeJogo: a imagem pequena dos lembretes (o ícone do jogo, em assets) }
  function candidatos(ctx) {
    const { agora, t } = ctx, L = [];
    // lembrete que o Android atrasar para depois das 22h daquele dia não aparece (`limite`); a
    // imagem pequena dos lembretes é o ícone do jogo
    const lembrete = (tipo, quando, abre, titulo, texto) => L.push({ tipo, quando, limite: diaAs(quando, 0, 22), canal: 'lembretes', abre, titulo, texto, grande: ctx.iconeJogo || '' });
    for (const e of ctx.eventos || []) {
      const esp = e.especial, data = esp ? t('data_' + esp) : '';
      L.push({ tipo: 'desafio', quando: e.ini, ate: e.fim, canal: 'desafios', abre: 'desafio:' + e.id, imagem: e.imagem || '',
        // desafio de data comemorativa: aviso especial (emoji, chefe da data, ícone e cor dela)
        titulo: esp ? EMOJI[esp] + ' ' + t('av_esp_titulo', { data }) : t('av_desafio_titulo'),
        texto: esp ? t('av_esp_texto', { chefe: e.chefeNome || '' }) : t('av_desafio_' + e.tipo, { chefe: e.chefeNome || '' }),
        icone: esp || '', cor: esp ? COR[esp] : '' });
    }
    // véspera de uma semana especial: "vem aí" (com a arte e o chefe da data). Às 18h; se a véspera
    // tem desafio à noite (o desafio ganha o horário), às 21h; senão, ao meio-dia e meia
    const v = ctx.vemData;
    if (v) L.push({ tipo: 'vem', quando: diaAs(v.ini, -1, 18), alternativas: [diaAs(v.ini, -1, 18), diaAs(v.ini, -1, 21), diaAs(v.ini, -1, 12, 30)],
      limite: diaAs(v.ini, -1, 22), canal: 'lembretes', abre: 'volta', imagem: v.imagem || '',
      titulo: EMOJI[v.id] + ' ' + t('av_esp_vem_titulo', { data: t('data_' + v.id) }), texto: t('av_esp_vem', { chefe: v.chefeNome || '' }), icone: v.id, cor: COR[v.id] });
    // energia cheia: só se falta mais que meia hora (antes disso o jogador ainda está por perto)
    if (ctx.energiaCheia && ctx.energiaCheia - agora > 30 * 60000) {
      lembrete('energia', silencio(ctx.energiaCheia) ? manha(ctx.energiaCheia) : ctx.energiaCheia, 'energia', t('av_energia_titulo'), t('av_energia'));
    }
    // prêmio diário. Não pegou o de hoje: hoje mesmo (19h, ou daqui a 1 h se já passou das 18h) até
    // as 21h45; mais tarde, nenhum — amanhã a sequência já recomeça no dia 1 e "não perca a
    // sequência" seria mentira. Já pegou: o de amanhã ao meio-dia e meia.
    const titulo = t('av_diario_titulo', { n: ctx.diarioDia });
    if (!ctx.diarioHoje) {
      const q = Math.max(diaAs(agora, 0, 19), agora + H);
      if (q <= diaAs(agora, 0, 21, 45)) lembrete('diario', q, 'diario', titulo, t('av_diario'));
    } else lembrete('diario', diaAs(agora, 1, 12, 30), 'diario', titulo, t('av_diario'));
    // saudade: 2 dias sem jogar e, depois, o chefe provocando (5 dias)
    lembrete('volta', diaAs(agora, 2, 18, 30), 'volta', t('av_volta_titulo'), t('av_volta'));
    if (ctx.chefeVolta && ctx.falaVolta) lembrete('volta', diaAs(agora, 5, 18, 30), 'volta', ctx.chefeVolta, ctx.falaVolta);
    return L;
  }

  // Os já entregues contam só para os LEMBRETES: o aviso do desafio (o do prêmio em dobro) nunca
  // some por causa de um lembrete que o Android entregou atrasado. Entre os agendados, o desafio
  // vem primeiro e os lembretes se ajeitam em volta dele.
  function filtra(lista, agora, ignorados, entregues) {
    const ok = [], porDia = {}, porDiaTodos = {}, ja = (entregues || []).filter(x => x > 0).map(q => ({ quando: q }));
    const soma = (m, q) => { m[diaDe(q)] = (m[diaDe(q)] || 0) + 1; };
    for (const x of ja) soma(porDiaTodos, x.quando);
    const cabe = c => {
      const desafio = c.tipo === 'desafio';
      // lembrete a menos de 1 min: o jogador ainda está no jogo. O desafio vale até o último
      // instante antes de abrir (quem sai às 11:59 não perde o aviso do desafio das 12h).
      if (c.quando <= agora + (desafio ? 0 : 60000)) return false;
      if (!desafio && silencio(c.quando)) return false;
      if (ignorados >= 6 && !desafio) return false;
      if (ignorados >= 3 && (c.tipo === 'energia' || c.tipo === 'diario' || c.tipo === 'vem')) return false;
      if (((desafio ? porDia : porDiaTodos)[diaDe(c.quando)] || 0) >= POR_DIA) return false;
      return (desafio ? ok : ok.concat(ja)).every(o => Math.abs(o.quando - c.quando) >= ESPACO);
    };
    lista.slice().sort((a, b) => PRIO[a.tipo] - PRIO[b.tipo] || a.quando - b.quando).forEach(c => {
      if (ok.length >= MAX) return;
      // quem tem horários alternativos fica com o primeiro que couber
      const opcoes = c.alternativas ? c.alternativas.map(q => Object.assign({}, c, { quando: q })) : [c];
      const x = opcoes.find(cabe); if (!x) return;
      delete x.alternativas;
      ok.push(x); soma(porDia, x.quando); soma(porDiaTodos, x.quando);
    });
    return ok.sort((a, b) => a.quando - b.quando);
  }

  const Avisos = { candidatos, filtra, monta: ctx => filtra(candidatos(ctx), ctx.agora, ctx.ignorados || 0, ctx.entregues), silencio, MAX };
  if (typeof module === 'object' && module.exports) module.exports = Avisos; else raiz.Avisos = Avisos;
})(this);
