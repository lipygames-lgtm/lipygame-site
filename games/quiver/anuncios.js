// ANÚNCIOS (0.9). Quem fala com a Unity Ads (desde a 1.0.1) é Anuncios.java (ponte LipyAds); aqui fica QUANDO pedir.
// Regras do dono e do GDD (seção 6):
//   * PREMIADO só quando o jogador escolhe, com teto por dia: roleta (1 giro por anúncio — pedido do
//     dono), reviver (1 vez por tentativa, só com a fase adiantada: "uma oferta clara, sem repetir sem
//     fim"), +1 energia e +1 do poder que acabou. O prêmio só vale se a Unity disser que ele assistiu.
//   * INTERSTICIAL só em pausa natural (saindo de uma vitória), com freio: nunca para quem está
//     começando, a cada N vitórias e com intervalo mínimo. Quem compra SEM ANÚNCIOS nunca vê.
//   * Nunca encurtar tempo nem dificuldade para fabricar anúncio.
// Os números vêm de CONFIG.anuncios, e o servidor pode trocá-los sem atualizar o app (quiver_config).
(function (raiz) {
  'use strict';
  let seq = 0, pendente = null, ponteTeste;
  const ponte = () => (ponteTeste !== undefined ? ponteTeste : (typeof raiz.LipyAds !== 'undefined' ? raiz.LipyAds : null));

  const Anuncios = {
    nativo() { return !!ponte(); },
    // build sem anúncio de verdade (sem o Game ID da Unity)? (APK de teste, teste interno e navegador: o
    // jogo escreve "anúncios de teste"; no APK de teste o Android mostra a tela ANÚNCIO DE TESTE)
    teste() { try { const p = ponte(); return !p || !!p.teste(); } catch (e) { return true; } },
    // há um premiado carregado agora? (sem ele, o botão de vídeo nem aparece: tocar e ouvir
    // "indisponível" é pior do que não oferecer)
    temPremiado() { try { const p = ponte(); return !!(p && p.temPremiado()); } catch (e) { return false; } },
    ocupado() { return !!pendente; },
    // a lei pede o botão de rever a escolha de anúncios? (Europa/Reino Unido)
    opcoesObrigatorias() { try { const p = ponte(); return !!(p && p.opcoesObrigatorias()); } catch (e) { return false; } },
    opcoes() { try { const p = ponte(); if (p) p.opcoes(); } catch (e) { } },
    // Pede um anúncio. `fim(ganhou, apareceu)` é chamado SEMPRE, uma vez só: pela resposta do Android
    // ou pelo relógio de segurança. São 90 s até o anúncio aparecer. Depois que ele aparece (o Android
    // avisa), o jogo espera o fim dele, até 20 min: quem pausa o vídeo não perde o prêmio já assistido.
    pede(premiado, fim) {
      const p = ponte();
      if (pendente || !p) { fim(false, false); return; }
      const id = ++seq;
      pendente = { id, fim, t: setTimeout(() => Anuncios.resposta(id, false, false), 90000) };
      try { p.pede(id, !!premiado); } catch (e) { Anuncios.resposta(id, false, false); }
    },
    // o anúncio apareceu na tela: troca o relógio de 90 s pelo de 20 min
    mostrou(id) {
      if (!pendente || pendente.id !== id || pendente.viu) return;
      pendente.viu = true; clearTimeout(pendente.t);
      pendente.t = setTimeout(() => Anuncios.resposta(id, false, true), 20 * 60000);
    },
    resposta(id, ganhou, apareceu) {
      if (!pendente || pendente.id !== id) return; // (resposta atrasada de um pedido que já acabou)
      const q = pendente; pendente = null; clearTimeout(q.t);
      try { q.fim(!!ganhou, !!apareceu); } catch (e) { }
    },

    // ---------- regras (puras: os testes chamam direto) ----------
    // quantos premiados de um tipo ainda cabem hoje
    restam(est, tipo, lim, hoje) {
      const usados = est && est.dia === hoje && est.usados ? est.usados[tipo] || 0 : 0;
      return Math.max(0, (lim || 0) - usados);
    },
    // anota um premiado assistido
    usa(est, tipo, hoje) {
      if (est.dia !== hoje || !est.usados) { est.dia = hoje; est.usados = {}; }
      est.usados[tipo] = (est.usados[tipo] || 0) + 1;
    },
    // intersticial agora? Pausa natural (saindo de uma vitória) E: não comprou SEM ANÚNCIOS, já venceu
    // o bastante para não ser iniciante, vieram `a_cada` vitórias desde o último e passou o intervalo
    querIntersticial(est, regras, ctx) {
      if (!regras || ctx.semAnuncios) return false;
      if ((ctx.vitorias || 0) < regras.vitorias_min) return false;
      if ((est.desde || 0) < regras.a_cada) return false;
      return ctx.agora - (est.ultimo || 0) >= regras.intervalo_s * 1000;
    },
    // as regras de verdade: as do jogo, com o que o servidor mandou por cima (só números sensatos)
    regras(padrao, remoto) {
      const r = JSON.parse(JSON.stringify(padrao));
      const num = (v, min, max) => typeof v === 'number' && isFinite(v) && v >= min && v <= max;
      const m = remoto && typeof remoto === 'object' ? remoto : {};
      const ri = m.intersticial && typeof m.intersticial === 'object' ? m.intersticial : {};
      if (num(ri.a_cada, 1, 50)) r.intersticial.a_cada = Math.round(ri.a_cada);
      if (num(ri.intervalo_s, 30, 3600)) r.intersticial.intervalo_s = ri.intervalo_s;
      if (num(ri.vitorias_min, 0, 1000)) r.intersticial.vitorias_min = Math.round(ri.vitorias_min);
      if (ri.desligado === true) r.intersticial.a_cada = Infinity;
      for (const k of ['roleta_dia', 'energia_dia', 'poder_dia']) if (num(m[k], 0, 50)) r[k] = Math.round(m[k]);
      if (num(m.reviver_progresso, 0, 1)) r.reviver_progresso = m.reviver_progresso;
      if (m.reviver_anuncio === false) r.reviver_anuncio = false;
      return r;
    },
    // (testes)
    _troca(o) { if ('ponte' in o) ponteTeste = o.ponte; },
  };
  raiz.appAnuncio = (id, ganhou, apareceu) => Anuncios.resposta(id, ganhou, apareceu);
  raiz.appAnuncioMostrou = id => Anuncios.mostrou(id);
  if (typeof module === 'object' && module.exports) module.exports = Anuncios; else raiz.Anuncios = Anuncios;
})(this);
