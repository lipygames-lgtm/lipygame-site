// Números de ajuste do jogo (GDD seção 11: "tudo ajustável sem recompilar o motor").
// Cada linha diz o que muda. As decisões e o porquê estão em DEV_NOTES.md.
(function (raiz) {
  const CONFIG = {
    leitura_max: 5,      // s: o relógio do Rush começa no 1º toque OU depois disto (sem estudar para sempre)
    penalidade: 1,       // s tirados por erro no Rush, se a fase não disser outro (fases.js: `pen`)
    vel_erro: 0.15,      // cada erro no Rush acelera o relógio em 15%...
    vel_max: 1.9,        // ...até 1,9x. O FEVER volta para 1x
    bomba_seg: 5,        // últimos segundos em que o relógio vira bomba (vermelho + pavio)
    combo_janela: 2.0,   // s entre acertos para o combo continuar
    // Prêmios de tempo do Rush (v0.2: menores — na v0.1 quem tocava rápido ganhava tanto tempo de
    // combo e de FEVER que terminava com ~88% do relógio sobrando; o dono achou fácil)
    combo_passo: 4,      // a cada N de combo...
    combo_bonus: 1,      // ...ganha estes segundos (Rush)
    bonus_teto: 0.15,    // bônus de combo nunca passa desta fração do tempo da fase
    poder_max: 12,       // acertos em combo para encher o FEVER
    poder_erro: 4,       // quanto um erro tira da barra do FEVER
    poder_decai: 0.8,    // quanto a barra perde por segundo parado
    fever_seg: 3,        // s de relógio congelado no FEVER (só no Rush: o Classic não tem relógio)
    graca: 2,            // s para salvar com o DESFAZER o erro que acabaria a fase (0 = sem chance)
    gelo_seg: 8,         // s de relógio congelado pelo power-up CONGELAR
    raio_seg: 4,         // s que o RAIO deixa as setas livres acesas (Classic)
    classic_coracoes: 3, // corações por fase no Classic (0 = sem limite de erro)
    // CHEFES (fim de cada arena do Classic)
    // a vida do chefe É o progresso da fase: ele cai junto com a última seta (o combo não encurta)
    chefe_dano: 10,      // vida por seta (só a escala dos números de dano na tela)
    chefe_cada: [5, 4],  // ataca a cada 5 acertos (4 quando enfurecido)
    chefe_forca: [2, 3], // casas atingidas por ataque (3 quando enfurecido)
    chefe_raiva: 0.4,    // abaixo de 40% da vida ele se enfurece
    chefe_bloco_seg: 7,  // bloco de pedra/areia do chefe some sozinho depois disto
    chefe_gelo_seg: 6,   // seta congelada descongela depois disto
    chefe_gemas: [15, 20, 25, 30, 50], // diamantes por vencer o chefe de cada arena
    chefe_onda_tentativas: 40, // chefe de vida em dobro: tentativas para montar a onda nova (rápido no celular)
    bomba: 'cruz',       // área da EXPLOSÃO: 'uma' | 'cruz' | '3x3'
    estrelas_rush: [0.45, 0.2], // fração do tempo sobrando para 3 e 2 estrelas
    moedas: { primeira: 20, estrela: 10, repeticao: 5 },
    moedas_iniciais: 200,
    gemas_iniciais: 60,
    // (reviver: fichas de REVIVER — o jogador começa com 1 para conhecer)
    estoque_inicial: { desfazer: 3, bomba: 2, gelo: 2, raio: 2, reviver: 1 },
    // REVIVER (pedido do dono): perdeu, continua de onde parou — no Rush com mais tempo, no Classic
    // com mais 1 coração. Custa uma ficha (roleta/loja) ou diamantes; o passe (compra) deixa de graça.
    reviver_gemas: 40,
    reviver_max: 2,        // vezes por tentativa
    reviver_segundos: 15,  // Rush: tempo devolvido ao relógio
    reviver_pacote: [3, 100], // loja: 3 fichas por 100 diamantes
    coracao_extra: [150, 300], // loja: 1º e 2º coração a mais no Classic (para sempre), em diamantes
    roleta_gratis_dia: 1,  // giros grátis por dia (e mais 1 giro por anúncio assistido: anuncios.roleta_dia)
    roleta_energia_moedas: 50, // roleta: o prêmio "energia" com a energia cheia vira estas moedas
    precos: { desfazer: [3, 120], bomba: [2, 150], gelo: [2, 150], raio: [2, 120] }, // [quantidade, moedas]
    diario: [50, 75, 100, { bomba: 1 }, 150, { gelo: 1 }, { gemas: 25 }], // recompensa dos 7 dias seguidos
    // Energia (decisão do dono): máximo 5, PERDER uma fase gasta 1, volta 1 a cada 20 min.
    // Vencer não gasta. Sair de uma fase já começada conta como perder.
    energia_max: 5,
    energia_min: 20,
    encher_gemas: 30,    // diamantes para encher a energia na hora
    // DESAFIO RELÂMPAGO (3 por semana, 2 h cada — calendário em desafio.js): não gasta energia, pode
    // tentar quantas vezes quiser enquanto está aberto e o prêmio sai uma vez por desafio. Entrando
    // pelo AVISO do celular, o prêmio vem em dobro (a energia cheia não dobra).
    desafio_premio: { gemas: 30, bomba: 1, desfazer: 1 },
    // semana de data comemorativa (Natal, Halloween, Páscoa, St. Patrick): um desafio especial por
    // dia, e o prêmio vem com moedas também ("gerar recompensas: ouro, gemas" — pedido do dono)
    desafio_premio_especial: { gemas: 30, moedas: 300, bomba: 1, desfazer: 1 },
    // Ritmo pessoal no Rush (DEV_NOTES #2): o tempo da fase se ajusta ao jogador. Quem joga rápido
    // recebe menos tempo, quem sofre recebe um pouco mais. As 5 primeiras fases não mudam.
    ritmo: true,
    ritmo_min: 0.55,     // no máximo 45% a menos de tempo...
    ritmo_max: 1.3,      // ...e no máximo 30% a mais
    // MONETIZAÇÃO (0.9). O PREÇO nunca fica aqui: quem escreve é a Play, no dinheiro do país do jogador
    // (e o dono muda na Play Console sem atualizar o app). Os ids precisam bater com os da Play.
    loja_catalogo: [
      { id: 'sem_anuncios', permanente: true },  // nunca mais intersticial (os premiados são escolha: ficam)
      { id: 'passe_reviver', permanente: true }, // reviver de graça para sempre (continua até 2 por tentativa)
      { id: 'gemas_p', gemas: 120 },
      { id: 'gemas_m', gemas: 500 },
      { id: 'gemas_g', gemas: 1200 },
      { id: 'moedas_p', moedas: 3000 },
    ],
    // ANÚNCIOS (regras em anuncios.js). O servidor pode trocar estes números sem atualizar o app
    // (tabela quiver.config, chave "anuncios").
    anuncios: {
      // intersticial: só saindo de uma vitória, a cada `a_cada` vitórias, `intervalo_s` entre um e
      // outro, e nunca antes de o jogador ter vencido `vitorias_min` fases (quem está começando)
      intersticial: { a_cada: 3, intervalo_s: 180, vitorias_min: 10 },
      roleta_dia: 5,           // giros por anúncio por dia
      energia_dia: 3,          // +1 energia por anúncio, por dia
      poder_dia: 3,            // +1 do poder que acabou, por dia
      reviver_anuncio: true,   // reviver por anúncio (1 vez por tentativa)...
      reviver_progresso: 0.5,  // ...só com esta fração da fase já feita ("progresso alto" — GDD)
    },
  };
  if (typeof module === 'object' && module.exports) module.exports = CONFIG; else raiz.CONFIG = CONFIG;
})(this);
