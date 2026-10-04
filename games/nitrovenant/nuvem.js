'use strict';
// SALVAR PROGRESSO na conta do Google Play Games. Quem conversa com o Android é Nuvem.java.
//
// O progresso DE VERDADE continua no aparelho. Isto aqui é uma cópia que segue a conta do jogador:
// desinstalou, trocou de celular, reinstalou — ela volta.
//
// REGRA DE OURO: a nuvem nunca manda sozinha. Se o Play Games faltar, falhar, ou o jogador recusar, o
// jogo funciona exatamente como sempre funcionou. Nada aqui pode travar a garagem.
//
// COMO JUNTAMOS DUAS CÓPIAS: campo a campo, ficando com o MAIOR de cada um e com a UNIÃO dos carros.
// Não se escolhe um perfil vencedor — escolher jogaria fora tudo que o perdedor tinha de melhor. Um
// jogador na fase 11 com 30 mil não pode apagar o mesmo jogador na fase 10 com 620 mil e nove carros.
// E nunca pela data: um celular com a hora errada apagaria meses de progresso.
(function (root) {
  const Nuvem = {
    ligado: false,      // o jogador está conectado ao Play Games
    lido: false,        // já recebemos a cópia da nuvem — antes disso é PROIBIDO gravar
    erro: '',
    aoMudar: null,
    aoChegar: null,     // recebe o perfil da nuvem (null = nuvem em branco)

    nativa() { return typeof root.NitroCloud !== 'undefined'; },
    iniciar() { if (!this.nativa()) return false; try { root.NitroCloud.start(); return true; } catch (e) { return false; } },
    // `pedir` mostra a tela de login do Google. Só com o jogador tocando no botão.
    conectar(pedir) { if (!this.nativa()) return false; try { root.NitroCloud.signIn(!!pedir); return true; } catch (e) { return false; } },
    carregar() { if (!this.nativa() || !this.ligado) return false; try { root.NitroCloud.load(); return true; } catch (e) { return false; } },

    // GRAVAR SÓ DEPOIS DE LER. Quem reinstalou abre com o perfil zerado; gravar antes de ler
    // transformaria meses de progresso num perfil novo, e sem volta.
    salvar(perfil) {
      if (!this.nativa() || !this.ligado || !this.lido) return false;
      try { root.NitroCloud.save(JSON.stringify(this.paraNuvem(perfil))); return true; } catch (e) { return false; }
    },
    resolver(perfil) {
      if (!this.nativa()) return false;
      try { root.NitroCloud.resolve(JSON.stringify(this.paraNuvem(perfil))); return true; } catch (e) { return false; }
    },
    // A corrida suspensa NÃO viaja: ela é o campo mais pesado e o menos portátil. Chegando de outro
    // aparelho, ela trancaria a garagem com uma corrida que este jogador nunca começou aqui.
    paraNuvem(p) { const c = Object.assign({}, p); c.active = null; return c; },
  };

  // Quanto progresso um perfil representa. Serve SÓ para escolher a mensagem na tela ("recuperado"
  // ou "ligado"). NÃO serve para escolher um vencedor: quem escolhe vencedor joga fora o que o
  // perdedor tinha de melhor. Para juntar, use fundir().
  Nuvem.peso = function (p) {
    if (!p || typeof p !== 'object') return -1;
    const n = (x) => Number(x) || 0;
    return n(p.unlocked) * 1e9 + (Array.isArray(p.owned) ? p.owned.length : 0) * 1e7
      + (n(p.weapon) + n(p.armor) + n(p.tires)) * 1e5 + Math.min(1e5 - 1, n(p.money) / 100);
  };

  // Junta duas cópias sem perder nada de nenhuma das duas.
  Nuvem.fundir = function (a, b) {
    if (!b || typeof b !== 'object') return a;
    if (!a || typeof a !== 'object') return b;
    const num = (x, y) => Math.max(Number(x) || 0, Number(y) || 0);
    const juntos = Object.assign({}, a, {
      money: num(a.money, b.money),
      unlocked: num(a.unlocked, b.unlocked),
      weapon: num(a.weapon, b.weapon),
      armor: num(a.armor, b.armor),
      tires: num(a.tires, b.tires),
      owned: [...new Set([...(Array.isArray(a.owned) ? a.owned : []), ...(Array.isArray(b.owned) ? b.owned : [])])],
      // fases zeradas: fica a maior contagem de cada uma
      clears: (() => { const r = Object.assign({}, b.clears || {}); for (const [k, v] of Object.entries(a.clears || {})) r[k] = num(v, r[k]); return r; })(),
      // a corrida suspensa e as preferências são DESTE aparelho; só herdam se aqui não houver nada
      active: a.active || null,
      campaign: a.campaign || b.campaign || null,
    });
    // o carro equipado precisa ser um que ele realmente tem
    if (!juntos.owned.includes(juntos.selected)) juntos.selected = Math.max(0, ...juntos.owned);
    return juntos;
  };

  // O Android chama isto. {ligado, save?, conflito?, meu?, outro?, erro}
  root.nitroCloudState = function (json) {
    let d;
    try { d = typeof json === 'string' ? JSON.parse(json) : json; } catch (e) { return; }
    if (!d || typeof d !== 'object') return;
    const le = (s) => { if (!s) return null; try { return JSON.parse(s); } catch (e) { return null; } };
    Nuvem.ligado = !!d.ligado;
    Nuvem.erro = typeof d.erro === 'string' ? d.erro : '';

    if (d.conflito) {
      // Dois aparelhos gravaram sem se falar. Fundimos os dois e devolvemos — nunca descartamos um.
      const juntos = Nuvem.fundir(le(d.meu), le(d.outro));
      if (typeof Nuvem.aoChegar === 'function') { try { Nuvem.aoChegar(juntos, true); } catch (e) { console.warn('nuvem', e); } }
    } else if (typeof d.save === 'string') {
      Nuvem.lido = true;
      if (typeof Nuvem.aoChegar === 'function') { try { Nuvem.aoChegar(le(d.save), false); } catch (e) { console.warn('nuvem', e); } }
    }
    if (typeof Nuvem.aoMudar === 'function') { try { Nuvem.aoMudar(); } catch (e) {} }
  };

  root.Nuvem = Nuvem;
})(typeof window !== 'undefined' ? window : globalThis);
