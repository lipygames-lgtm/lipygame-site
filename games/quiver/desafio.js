// Quiver — calendário do DESAFIO RELÂMPAGO: 3 por semana, 2 horas cada, no horário do aparelho
// (e um por dia na semana de uma data comemorativa: Natal, Halloween, Páscoa, St. Patrick).
// Não guarda nada nem desenha nada: dada uma hora, diz qual desafio está aberto e quais vêm. O
// sorteio é pela SEMANA (a mesma para todos os jogadores), então os desafios caem nos mesmos dias
// para todo mundo — e um aviso vindo de um servidor, no futuro, fala do mesmo desafio.
//
// Cada semana tem um de cada tipo, em dias espalhados (um em seg/ter, um em qua/qui, um de sex a
// dom), em horários de quem joga no celular (almoço e noite; à tarde no fim de semana). Nenhum
// termina depois das 22h (é a hora em que os avisos param).
(function (raiz, fabrica) {
  const M = fabrica(typeof module === 'object' && module.exports ? require('./engine.js') : raiz.Motor);
  if (typeof module === 'object' && module.exports) module.exports = M; else raiz.Desafio = M;
})(this, function (Motor) {
  'use strict';

  const TIPOS = ['relogio', 'coracao', 'chefe'];
  const DURACAO = 2 * 3600000;
  const GRUPOS = [[0, 1], [2, 3], [4, 5, 6]];      // dias (0 = segunda) de onde sai cada um
  const HORAS_SEMANA = [12, 18, 19, 20], HORAS_FIM = [11, 15, 18];
  const POOL = 8;                                  // fases de cada tipo em desafios.js
  const CHEFES = [1, 2, 3, 4];                     // arenas com chefe (o do desafio "escapou" de uma)
  const DIA = 86400000;

  // segunda-feira 00:00 (hora local) da semana ISO de `ms`, e o número dessa semana no ano ISO
  function segunda(ms) { const d = new Date(ms); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d; }
  function semanaIso(ms) {
    const s = segunda(ms), qui = new Date(s); qui.setDate(qui.getDate() + 3); // a semana é do ano da sua quinta
    const ano = qui.getFullYear(), sem1 = segunda(new Date(ano, 0, 4).getTime()); // a semana 1 tem o dia 4 de janeiro
    // (arredonda: com horário de verão a diferença não dá semanas exatas)
    return { ano, n: 1 + Math.round((s - sem1) / (7 * DIA)), segunda: s };
  }
  // semanas desde uma segunda fixa: faz as fases e os chefes girarem sem repetir antes da hora
  const REF = new Date(2026, 0, 5).getTime();
  const indiceSemana = s => Math.round((s.getTime() - REF) / (7 * DIA));

  // DATAS COMEMORATIVAS (decisão do dono): nos 7 dias que terminam no dia da data, os desafios são
  // a FASE ESPECIAL dela (especiais.js: chefe, cenário, música e aviso próprios)
  const DATAS = [
    { id: 'patrick', dia: ano => new Date(ano, 2, 17) },
    { id: 'pascoa', dia: ano => pascoa(ano) },
    { id: 'halloween', dia: ano => new Date(ano, 9, 31) },
    { id: 'natal', dia: ano => new Date(ano, 11, 25) },
  ];
  // domingo de Páscoa no calendário gregoriano (algoritmo de Meeus/Jones/Butcher)
  function pascoa(ano) {
    const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = h + l - 7 * m + 114;
    return new Date(ano, Math.floor(n / 31) - 1, (n % 31) + 1);
  }
  // a data comemorativa em vigor no instante `ms` (ou null)
  function dataEspecial(ms) {
    const ano = new Date(ms).getFullYear();
    for (const D of DATAS) {
      const fim = D.dia(ano); fim.setHours(23, 59, 59, 999);
      const ini = new Date(fim); ini.setDate(ini.getDate() - 6); ini.setHours(0, 0, 0, 0);
      if (ms >= ini.getTime() && ms <= fim.getTime()) return D.id;
    }
    return null;
  }

  // a próxima semana especial que começa nos próximos `dias` dias: { id, ini } (ini = 00:00 do 1º dia)
  function proximaData(ms, dias) {
    const d = new Date(ms); d.setHours(12, 0, 0, 0);
    let antes = dataEspecial(d.getTime());
    for (let k = 1; k <= (dias || 30); k++) {
      d.setDate(d.getDate() + 1);
      const esp = dataEspecial(d.getTime());
      if (esp && esp !== antes) { const ini = new Date(d); ini.setHours(0, 0, 0, 0); return { id: esp, ini: ini.getTime() }; }
      antes = esp;
    }
    return null;
  }

  // Os 3 desafios da semana. Nos dias de uma DATA COMEMORATIVA (os 7 que terminam nela), um desafio
  // ESPECIAL por dia, no lugar dos comuns daqueles dias: a semana da data vira evento.
  function daSemana(ms) {
    const w = semanaIso(ms), k = indiceSemana(w.segunda);
    const rnd = Motor.rng(w.ano * 100 + w.n);
    const tipos = TIPOS.slice();
    for (let i = tipos.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [tipos[i], tipos[j]] = [tipos[j], tipos[i]]; }
    const hora = (dia, r) => { const horas = dia >= 5 ? HORAS_FIM : HORAS_SEMANA; return horas[Math.floor(r * horas.length)]; };
    // (o sorteio dos comuns vem primeiro e sempre na mesma ordem: a data não mexe nas outras semanas)
    const comuns = GRUPOS.map((g, i) => { const dia = g[Math.floor(rnd() * g.length)]; return { dia, hora: hora(dia, rnd()), tipo: tipos[i] }; });
    // n: a fase do banco (desafios.js) · chefe: a arena do chefe · k: a semana (gira as artes)
    // especial: a data comemorativa (a cena, o chefe e o aviso viram os dela)
    // (na semana especial, cada dia pega uma fase diferente: com a mesma `n` da semana, o mesmo
    // tipo repetia a mesma fase 2 ou 3 vezes em dias alternados)
    const monta = (dia, h, tipo, especial) => {
      const ini = new Date(w.segunda); ini.setDate(ini.getDate() + dia); ini.setHours(h, 0, 0, 0);
      const n = especial ? k * 7 + dia : k;
      return {
        id: w.ano + 'w' + w.n + 'd' + dia, tipo, ini: ini.getTime(), fim: ini.getTime() + DURACAO,
        n: ((n % POOL) + POOL) % POOL, chefe: CHEFES[((k % CHEFES.length) + CHEFES.length) % CHEFES.length], k: Math.abs(k),
        especial,
      };
    };
    const out = [];
    for (let dia = 0; dia < 7; dia++) {
      const meio = new Date(w.segunda); meio.setDate(meio.getDate() + dia); meio.setHours(12, 0, 0, 0);
      const esp = dataEspecial(meio.getTime());
      if (esp) {
        // um por dia, os tipos se revezando; o horário sai de um sorteio próprio do dia
        const r = Motor.rng((w.ano * 100 + w.n) * 10 + dia)();
        out.push(monta(dia, hora(dia, r), TIPOS[(dia + Math.abs(k)) % TIPOS.length], esp));
        continue;
      }
      const c = comuns.find(x => x.dia === dia);
      if (c) out.push(monta(dia, c.hora, c.tipo, null));
    }
    return out;
  }
  // desafios das semanas `de`..`ate` (0 = a de `ms`), em ordem. Anda pelo CALENDÁRIO (quarta-feira
  // ao meio-dia de cada semana): somar 7x24 h pulava ou repetia uma semana na troca do horário de verão
  function semanas(ms, de, ate) {
    let out = [];
    for (let s = de; s <= ate; s++) {
      const d = segunda(ms); d.setDate(d.getDate() + 7 * s + 2); d.setHours(12, 0, 0, 0);
      out = out.concat(daSemana(d.getTime()));
    }
    return out.sort((a, b) => a.ini - b.ini);
  }
  // desafios desta semana e das `n` seguintes
  function lista(ms, n) { return semanas(ms, 0, n == null ? 1 : n); }
  function ativo(ms) { return semanas(ms, -1, 0).find(e => ms >= e.ini && ms < e.fim) || null; }
  function proximo(ms) { return semanas(ms, 0, 1).find(e => e.ini > ms) || null; }
  function proximos(ms, dias) { return semanas(ms, 0, Math.ceil(dias / 7)).filter(e => e.ini > ms && e.ini <= ms + dias * DIA); }
  // desafio do atalho de TESTE (só no APK de teste): começa `emMs` a partir de agora; `especial`
  // força a fase de uma data comemorativa fora da data
  function deTeste(ms, tipo, emMs, especial) {
    const ini = ms + (emMs || 0), k = Math.floor(ms / 1000);
    return { id: 'teste' + k, tipo, ini, fim: ini + DURACAO, n: k % POOL, chefe: CHEFES[k % CHEFES.length], k, teste: true, especial: especial || null };
  }

  return { TIPOS, DURACAO, DATAS: DATAS.map(d => d.id), daSemana, lista, ativo, proximo, proximos, deTeste, semanaIso, dataEspecial, proximaData, pascoa };
});
