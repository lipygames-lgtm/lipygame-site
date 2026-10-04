'use strict';
const $=id=>document.getElementById(id);const dict={en:{wallet:'GARAGE CREDITS',damage:'DAMAGE',armor:'ARMOR',drive:'START ENGINE →',prototype:'Offline prototype • Original cars • Simulated ads',banner:'AD SPACE · TEST BUILD · NO LIVE ADS',boss:'THE HEAD MECHANIC',swipe:'SWIPE TO CHANGE LANES',owned:'IN YOUR GARAGE',locked:'AVAILABLE TO BUY',equipped:'EQUIPPED',equip:'EQUIP CAR',buy:'BUY',stage:'STAGE',weapon:'WEAPON',tires:'TRACTION',asphalt:'ASPHALT',dirt:'DIRT · SLOWER',mud:'MUD · SLOWER SHOTS',ready:'READY',collect:'COLLECT NITRO',safe:'MOVE TO THE SAFE LANE!',finish:'ROAD CLEARED',defeat:'ENGINE DOWN',earned:'Credits earned',kills:'Zombies defeated',garage:'BACK TO GARAGE',retry:'TRY AGAIN',continue:'CONTINUE',pause:'PAUSED',resume:'RESUME',quit:'LEAVE RACE',quitText:'Leave this run? Unbanked credits from this run will be lost.',yes:'LEAVE',no:'CANCEL',settings:'SETTINGS',sound:'SOUND',effects:'PULSE EFFECTS',language:'LANGUAGE',close:'CLOSE',ad:'AD PLACEMENT TEST',adDesc:'This is a local simulation, not a Google advertisement. No data is sent and no revenue is generated.',adWait:'Close in',adClose:'CLOSE TEST',bonus:'TEST AD · +25% CREDITS',revive:'TEST AD · REVIVE',test:'TEST BUILD',tutorialTitle:'BUILD YOUR WAY UP',tutorial:'Swipe left or right to change lanes. Your car fires automatically. Collect gold credits and blue/green upgrades. Avoid red penalties. Pick up NITRO, wait for READY, then tap it to clear the road — including the boss.',tutorial2:'Buy cars or upgrade in the garage. Upgrades are permanent. Track pickups reset each run. Mud slows you down. All vehicles are original designs.',lets:'LET’S DRIVE',saved:'Progress saved on this device',low:'Not enough credits',max:'MAX',upgraded:'UPGRADED',bought:'NEW CAR UNLOCKED',nos:'NITRO OVERDRIVE',next:'NEXT STAGE',retryStage:'REPLAY STAGE',warnStorage:'Saving unavailable on this device',cancel:'CANCEL'},pt:{wallet:'CRÉDITOS DA GARAGEM',damage:'DANO',armor:'BLINDAGEM',drive:'LIGAR MOTOR →',prototype:'Protótipo offline • Carros originais • Anúncios simulados',banner:'ESPAÇO PUBLICITÁRIO · TESTE · SEM ANÚNCIOS REAIS',boss:'O MECÂNICO CHEFE',swipe:'DESLIZE PARA TROCAR DE FAIXA',owned:'NA SUA GARAGEM',locked:'DISPONÍVEL PARA COMPRA',equipped:'EQUIPADO',equip:'EQUIPAR CARRO',buy:'COMPRAR',stage:'FASE',weapon:'ARMA',tires:'TRAÇÃO',asphalt:'ASFALTO',dirt:'TERRA · MAIS LENTO',mud:'LAMA · TIROS MAIS LENTOS',ready:'PRONTO',collect:'COLETE NITRO',safe:'VÁ PARA A FAIXA SEGURA!',finish:'PISTA LIBERADA',defeat:'MOTOR APAGADO',earned:'Créditos recebidos',kills:'Zumbis derrotados',garage:'VOLTAR À GARAGEM',retry:'TENTAR NOVAMENTE',continue:'CONTINUAR',pause:'PAUSADO',resume:'CONTINUAR',quit:'SAIR DA CORRIDA',quitText:'Sair desta corrida? Os créditos ainda não guardados serão perdidos.',yes:'SAIR',no:'CANCELAR',settings:'CONFIGURAÇÕES',sound:'SOM',effects:'EFEITOS PULSANTES',language:'IDIOMA',close:'FECHAR',ad:'TESTE DE PUBLICIDADE',adDesc:'Esta é uma simulação local, não um anúncio do Google. Nenhum dado é enviado e nenhuma receita é gerada.',adWait:'Fechar em',adClose:'FECHAR TESTE',bonus:'TESTAR ANÚNCIO · +25% CRÉDITOS',revive:'TESTAR ANÚNCIO · REVIVER',test:'VERSÃO DE TESTE',tutorialTitle:'EVOLUA SUA GARAGEM',tutorial:'Deslize para os lados para mudar de faixa. O carro atira sozinho. Colete dinheiro dourado e melhorias azuis/verdes. Evite penalidades vermelhas. Colete NITRO, espere PRONTO e toque para limpar a pista — inclusive o chefe.',tutorial2:'Compre carros ou melhorias na garagem. Upgrades são permanentes. Itens da pista reiniciam a cada corrida. A lama deixa tudo mais lento. Todos os carros têm design original.',lets:'VAMOS DIRIGIR',saved:'Progresso salvo neste aparelho',low:'Créditos insuficientes',max:'MÁX',upgraded:'MELHORIA COMPRADA',bought:'NOVO CARRO DESBLOQUEADO',nos:'ARRANCADA NITRO',next:'PRÓXIMA FASE',retryStage:'REJOGAR FASE',warnStorage:'Salvamento indisponível neste aparelho',cancel:'CANCELAR'}};
Object.assign(dict.en,{arrows:'DIRECTION ARROWS',midboss:'FOREMAN · MID BOSS',finalboss:'HEAD MECHANIC · FINAL BOSS',jam:'WEAPON JAM',slow:'SLOW',rush:'CHARGE! CHANGE LANES',throw:'INCOMING TOOL',bomb:'INCOMING BOMB',slam:'MOVE TO THE SAFE LANE',runner:'LANE SWITCH',weak:'−35% DAMAGE',minus:'−26 HP · JAM 4s',ally:'ALLY CAR!',music:'MUSIC',intro:'INTRO VIDEOS',cineSkip:'TAP TO SKIP',allyDrop:'ALLY CAR INBOUND · JUMP TO GRAB IT',allyIn:'ALLY CAR JOINED THE FIGHT',leak:'NITRO DELAY · SLOW 4s',spike:'−24 ARMOR',loss:'CREDITS LOST'});
Object.assign(dict.pt,{arrows:'SETAS DE DIREÇÃO',midboss:'ENCARREGADO · CHEFE INTERMEDIÁRIO',finalboss:'MECÂNICO · CHEFE FINAL',jam:'ARMA TRAVANDO',slow:'LENTO',rush:'INVESTIDA! TROQUE DE FAIXA',throw:'FERRAMENTA A CAMINHO',bomb:'BOMBA A CAMINHO',slam:'VÁ PARA A FAIXA SEGURA',runner:'TROCA DE FAIXA',weak:'−35% DANO',minus:'−26 HP · TRAVA 4s',ally:'CARRO ALIADO!',music:'MÚSICA',intro:'VÍDEOS DE ABERTURA',cineSkip:'TOQUE PARA PULAR',allyDrop:'CARRO ALIADO CHEGANDO · PULE PARA PEGAR',allyIn:'O CARRO ALIADO ENTROU NA LUTA',leak:'ATRASA NITRO · LENTO 4s',spike:'−24 BLINDAGEM',loss:'CRÉDITOS PERDIDOS'});
Object.assign(dict.en,{resumeRun:'RESUME RUN →',quitText:'Return to the garage? Your run and upgrades will be saved. Finish the run before making purchases.',quit:'SAVE & RETURN',reset:'ERASE PROGRESS',resetTitle:'Erase local progress?',resetText:'This removes your cars, credits, upgrades and saved run on this device. This cannot be undone.',yesReset:'ERASE & START OVER',carPrice:'PRICE',carry:'Carried upgrades',repeat:'Replay payout',tutorial2:'Track upgrades carry over after victory and reset only on defeat. Purchased cars and garage upgrades stay yours. Nitro deals 2,000 damage +1,000 per car tier. Red pickups reduce damage, jam the gun or delay Nitro.'});
Object.assign(dict.pt,{resumeRun:'CONTINUAR CORRIDA →',quitText:'Voltar à garagem? A corrida e as melhorias serão salvas. Termine a corrida antes de fazer compras.',quit:'SALVAR E VOLTAR',reset:'APAGAR PROGRESSO',resetTitle:'Apagar o progresso local?',resetText:'Remove carros, créditos, upgrades e a corrida salva deste aparelho. Esta ação não pode ser desfeita.',yesReset:'APAGAR E RECOMEÇAR',carPrice:'PREÇO',carry:'Melhorias acumuladas',repeat:'Pagamento de repetição',tutorial2:'Os bônus da pista continuam após vitórias e reiniciam só na derrota. Carros comprados e upgrades da garagem permanecem seus. Nitro causa 2.000 de dano +1.000 por nível do carro. Itens vermelhos reduzem dano, travam a arma ou atrasam o Nitro.'});
Object.assign(dict.en,{restart:'RESTART STAGE',leak:'−25% NITRO · SLOW',tutorial:'Swipe deliberately to change one lane. Fire is automatic. Collect purple missile parts to unlock up to eight shots. Blue cans fill Nitro: four cans charge it. Some large enemies drop healing. Dodge red penalties.'});Object.assign(dict.pt,{restart:'REINICIAR FASE',leak:'−25% NITRO · LENTO',tutorial:'Deslize com intenção para trocar uma faixa. O disparo é automático. Junte peças roxas para liberar até oito mísseis. Quatro tanques azuis carregam o Nitro. Alguns inimigos grandes deixam cura. Desvie dos itens vermelhos.'});
Object.assign(dict.en,{quit:'LEAVE RACE',yes:'LEAVE',quitText:'Back to the garage? This run is discarded and the stage starts over next time. Garage purchases and upgrades carried from earlier stages are kept.'});
Object.assign(dict.pt,{quit:'SAIR DA CORRIDA',yes:'SAIR',quitText:'Voltar à garagem? Esta corrida é descartada e a fase recomeça do início na próxima vez. Compras da garagem e melhorias trazidas das fases anteriores continuam suas.'});
Object.assign(dict.en,{loading:'LOADING STAGE…'});Object.assign(dict.pt,{loading:'CARREGANDO FASE…'});
Object.assign(dict.en,{winBig:'YOU WIN',winSub:'ROAD CLEARED',loseBig:'YOU LOSE',loseSub:'ENGINE DOWN'});
Object.assign(dict.pt,{winBig:'VOCÊ VENCEU',winSub:'PISTA LIBERADA',loseBig:'VOCÊ PERDEU',loseSub:'MOTOR APAGADO'});

// Chaves que antes estavam escritas no meio do código.
Object.assign(dict.en,{"shots":"SHOTS","pkMissiles":"MISSILES","pkParts":"PARTS","pkHp":"HP","pkNos":"NITRO CHARGING","pkUpgrade":"UPGRADE","bossFinal":"FINAL BOSS","bossMid":"MID BOSS","jumpItem":"↑ JUMP!","potholeLabel":"POTHOLE"});
Object.assign(dict.pt,{"shots":"TIROS","pkMissiles":"MÍSSEIS","pkParts":"PEÇAS","pkHp":"VIDA","pkNos":"NITRO CARREGANDO","pkUpgrade":"MELHORIA","bossFinal":"CHEFE FINAL","bossMid":"CHEFE INTERMEDIÁRIO","jumpItem":"↑ PULE!","potholeLabel":"BURACO"});

// ESPANHOL (neutro da América Latina). O jogo já nasceu com en/pt; este bloco fecha o terceiro.
dict.es={"wallet":"CRÉDITOS DEL TALLER","damage":"DAÑO","armor":"BLINDAJE","drive":"ENCENDER MOTOR →","prototype":"Prototipo sin conexión • Autos originales • Anuncios simulados","banner":"ESPACIO PUBLICITARIO · PRUEBA · SIN ANUNCIOS REALES","boss":"EL JEFE MECÁNICO","swipe":"DESLIZA = CARRIL · ARRIBA = SALTO · MANTÉN = AMETRALLADORA","owned":"EN TU TALLER","locked":"DISPONIBLE PARA COMPRAR","equipped":"EQUIPADO","equip":"EQUIPAR AUTO","buy":"COMPRAR","stage":"NIVEL","weapon":"ARMA","tires":"TRACCIÓN","asphalt":"ASFALTO","dirt":"TIERRA · MÁS LENTO","mud":"LODO · DISPAROS LENTOS","ready":"LISTO","collect":"JUNTA NITRO","safe":"¡VE AL CARRIL SEGURO!","finish":"PISTA DESPEJADA","defeat":"MOTOR APAGADO","earned":"Créditos ganados","kills":"Zombis derrotados","garage":"VOLVER AL TALLER","retry":"INTENTAR DE NUEVO","continue":"CONTINUAR","pause":"EN PAUSA","resume":"CONTINUAR","quit":"SALIR DE LA CARRERA","quitText":"¿Volver al taller? Esta carrera se descarta y el nivel empieza de cero la próxima vez. Las compras del taller y las mejoras traídas de niveles anteriores se conservan.","yes":"SALIR","no":"CANCELAR","settings":"AJUSTES","sound":"SONIDO","effects":"EFECTOS DE PULSO","language":"IDIOMA","close":"CERRAR","ad":"PRUEBA DE PUBLICIDAD","adDesc":"Esta es una simulación local, no un anuncio de Google. No se envía ningún dato ni se genera ingreso.","adWait":"Cerrar en","adClose":"CERRAR PRUEBA","bonus":"ANUNCIO DE PRUEBA · +25% CRÉDITOS","revive":"ANUNCIO DE PRUEBA · REVIVIR","test":"VERSIÓN DE PRUEBA","tutorialTitle":"HAZ CRECER TU TALLER","tutorial":"Desliza con intención para cambiar un carril. El disparo es automático. Los zombis sueltan monedas de oro donde caen: pásales por encima (los zombis grandes sueltan más). Desliza HACIA ARRIBA para saltar baches, zombis y la onda de choque del jefe. Junta piezas moradas de misil para llegar a diez disparos. Los bidones azules llenan el Nitro: cuatro lo cargan. Algunos enemigos grandes sueltan curación. Esquiva los objetos rojos.","tutorial2":"El NITRO es un solo tanque para dos poderes. MANTÉN el botón de Nitro: velocidad, rayos sobre cada enemigo, eres inmune y atropellas zombis. MANTÉN un dedo en la pista: ametralladora azul. Los dos vacían el anillo del botón solo mientras lo mantienes; los bidones azules lo rellenan, incluso en pleno uso. Las mejoras de la pista se conservan tras ganar y se reinician solo al perder. Los objetos rojos bajan el daño, traban el arma o vacían el Nitro.","lets":"¡A CONDUCIR!","saved":"Progreso guardado en este dispositivo","low":"Créditos insuficientes","max":"MÁX","upgraded":"MEJORA COMPRADA","bought":"AUTO NUEVO DESBLOQUEADO","nos":"IMPULSO NITRO","next":"SIGUIENTE NIVEL","retryStage":"REPETIR NIVEL","warnStorage":"No se puede guardar en este dispositivo","cancel":"CANCELAR","arrows":"FLECHAS DE DIRECCIÓN","midboss":"CAPATAZ · JEFE INTERMEDIO","finalboss":"MECÁNICO · JEFE FINAL","jam":"ARMA TRABADA","slow":"LENTO","rush":"¡EMBESTIDA! CAMBIA DE CARRIL","throw":"HERRAMIENTA EN CAMINO","bomb":"BOMBA EN CAMINO","slam":"VE AL CARRIL SEGURO","runner":"CAMBIO DE CARRIL","weak":"−35% DAÑO","minus":"−26 HP · TRABA 4s","ally":"¡AUTO ALIADO!","music":"MÚSICA","intro":"VIDEOS DE APERTURA","cineSkip":"TOCA PARA SALTAR","allyDrop":"AUTO ALIADO EN CAMINO · SALTA PARA AGARRARLO","allyIn":"EL AUTO ALIADO ENTRÓ A LA PELEA","leak":"−25% NITRO · LENTO","spike":"−24 BLINDAJE","loss":"CRÉDITOS PERDIDOS","resumeRun":"SEGUIR CARRERA →","reset":"BORRAR PROGRESO","resetTitle":"¿Borrar el progreso local?","resetText":"Elimina autos, créditos, mejoras y la carrera guardada en este dispositivo. No se puede deshacer.","yesReset":"BORRAR Y EMPEZAR DE NUEVO","carPrice":"PRECIO","carry":"Mejoras acumuladas","repeat":"Pago por repetición","restart":"REINICIAR NIVEL","loading":"CARGANDO NIVEL…","winBig":"¡GANASTE!","winSub":"PISTA DESPEJADA","loseBig":"PERDISTE","loseSub":"MOTOR APAGADO","hellName":"INFIERNO","hellFall":"CAÍSTE AL INFIERNO","hellFall2":"Tu auto va como estaba","hellGoal":"Vence al jefe para volver donde quedaste","hellBack":"VUELVES AL NIVEL","terr_rainy_dirt":"CHARCOS · MÁS LENTO","terr_rainy_mud":"LODO · DISPAROS LENTOS","terr_desert_dirt":"ARENA · MÁS LENTO","terr_desert_mud":"ARENA PROFUNDA · DISPAROS LENTOS","terr_snowy_dirt":"NIEVE · MÁS LENTO","terr_snowy_mud":"HIELO · DISPAROS LENTOS","terr_city_dirt":"ESCOMBROS · MÁS LENTO","terr_hell_dirt":"CENIZA · MÁS LENTO","terr_hell_mud":"LAVA FRÍA · DISPAROS LENTOS","hole":"¡SALTA! DESLIZA ARRIBA","holeAhead":"BACHE ADELANTE","vibra":"VIBRACIÓN"};
Object.assign(dict.es,{"shots":"TIROS","pkMissiles":"MISILES","pkParts":"PIEZAS","pkHp":"VIDA","pkNos":"NITRO CARGANDO","pkUpgrade":"MEJORA","bossFinal":"JEFE FINAL","bossMid":"JEFE INTERMEDIO","jumpItem":"↑ ¡SALTA!","potholeLabel":"BACHE"});

Object.assign(dict.en,{"premium":"PREMIUM","unlockNow":"UNLOCK","storeOff":"STORE UNAVAILABLE","storeWait":"CHECKING STORE…","restore":"RESTORE PURCHASE","restoring":"ASKING THE STORE…","buyTitle":"UNLOCK FOREVER","buyText":"One-time purchase, no subscription. It stays on your Google account: change phone, reinstall, and it comes back.","buyGo":"CONTINUE TO GOOGLE PLAY","thanks":"UNLOCKED! IT IS YOURS","buyFail":"Purchase not completed. Nothing was charged.","onlyStore":"Only available through the store"});
Object.assign(dict.pt,{"premium":"PREMIUM","unlockNow":"LIBERAR","storeOff":"LOJA INDISPONÍVEL","storeWait":"CONSULTANDO A LOJA…","restore":"RESTAURAR COMPRA","restoring":"PERGUNTANDO À LOJA…","buyTitle":"LIBERAR PARA SEMPRE","buyText":"Compra única, sem assinatura. Fica na sua conta Google: trocou de celular, reinstalou, ela volta.","buyGo":"CONTINUAR NA GOOGLE PLAY","thanks":"LIBERADO! AGORA É SEU","buyFail":"A compra não foi concluída. Nada foi cobrado.","onlyStore":"Disponível só pela loja"});
Object.assign(dict.es,{"premium":"PREMIUM","unlockNow":"DESBLOQUEAR","storeOff":"TIENDA NO DISPONIBLE","storeWait":"CONSULTANDO LA TIENDA…","restore":"RESTAURAR COMPRA","restoring":"PREGUNTANDO A LA TIENDA…","buyTitle":"DESBLOQUEAR PARA SIEMPRE","buyText":"Compra única, sin suscripción. Queda en tu cuenta de Google: cambias de celular, reinstalas, y vuelve.","buyGo":"CONTINUAR EN GOOGLE PLAY","thanks":"¡DESBLOQUEADO! YA ES TUYO","buyFail":"La compra no se completó. No se cobró nada.","onlyStore":"Solo disponible en la tienda"});
Object.assign(dict.en,{"pending":"PAYMENT IN REVIEW","pendingText":"Your payment is being confirmed by Google. As soon as it clears, the vehicle unlocks by itself — you do not need to pay again.","opening":"Opening Google Play…"});
Object.assign(dict.pt,{"pending":"PAGAMENTO EM ANÁLISE","pendingText":"A Google está confirmando o seu pagamento. Assim que ele for aprovado, o veículo libera sozinho — não precisa pagar de novo.","opening":"Abrindo a Google Play…"});
Object.assign(dict.es,{"pending":"PAGO EN REVISIÓN","pendingText":"Google está confirmando tu pago. En cuanto se apruebe, el vehículo se desbloquea solo — no hace falta pagar de nuevo.","opening":"Abriendo Google Play…"});
Object.assign(dict.en,{"cloudSave":"SAVE PROGRESS","cloudOn":"ON","cloudOff":"OFF","cloudTitle":"KEEP YOUR PROGRESS","cloudText":"Link your progress to the Google account already on this phone. Uninstall, change phones, reinstall — your cars, credits and stages come back. No password to remember.","cloudConnect":"LINK MY GOOGLE ACCOUNT","cloudSync":"SEND NOW","cloudLinked":"PROGRESS LINKED","cloudRestored":"PROGRESS RESTORED","cloudSent":"PROGRESS SAVED","cloudKeptLocal":"This phone was further ahead, so it was kept","cloudFail":"Could not talk to Google Play Games. Your progress on this phone is untouched.","cloudOffline":"Play Games is not available on this device","cloudSending":"Sending to your Google account…"});
Object.assign(dict.pt,{"cloudSave":"SALVAR PROGRESSO","cloudOn":"LIGADO","cloudOff":"DESLIGADO","cloudTitle":"NÃO PERCA SEU PROGRESSO","cloudText":"Ligue seu progresso à conta Google que já está neste celular. Desinstalou, trocou de aparelho, reinstalou — seus carros, créditos e fases voltam. Sem senha para lembrar.","cloudConnect":"LIGAR MINHA CONTA GOOGLE","cloudSync":"ENVIAR AGORA","cloudLinked":"PROGRESSO LIGADO","cloudRestored":"PROGRESSO RECUPERADO","cloudSent":"PROGRESSO SALVO","cloudKeptLocal":"Este celular estava mais adiantado, então ele foi mantido","cloudFail":"Não consegui falar com o Google Play Games. Seu progresso neste celular continua intacto.","cloudOffline":"O Play Games não está disponível neste aparelho","cloudSending":"Enviando para a sua conta Google…"});
Object.assign(dict.es,{"cloudSave":"GUARDAR PROGRESO","cloudOn":"ACTIVADO","cloudOff":"DESACTIVADO","cloudTitle":"NO PIERDAS TU PROGRESO","cloudText":"Vincula tu progreso a la cuenta de Google que ya está en este celular. Desinstalaste, cambiaste de aparato, reinstalaste — tus autos, créditos y niveles vuelven. Sin contraseña que recordar.","cloudConnect":"VINCULAR MI CUENTA DE GOOGLE","cloudSync":"ENVIAR AHORA","cloudLinked":"PROGRESO VINCULADO","cloudRestored":"PROGRESO RECUPERADO","cloudSent":"PROGRESO GUARDADO","cloudKeptLocal":"Este celular estaba más avanzado, así que se mantuvo","cloudFail":"No pude hablar con Google Play Games. Tu progreso en este celular sigue intacto.","cloudOffline":"Play Games no está disponible en este aparato","cloudSending":"Enviando a tu cuenta de Google…"});
Object.assign(dict.en,{"reminders":"REMINDERS","rem1t":"The road is waiting","rem1x":"Your garage is parked. The horde is not.","rem2t":"Three days off the track","rem2x":"Come back and take your stage. The zombies got comfortable."});
Object.assign(dict.pt,{"reminders":"LEMBRETES","rem1t":"A pista está esperando","rem1x":"Sua garagem está parada. A horda não.","rem2t":"Três dias fora da pista","rem2x":"Volte e tome sua fase de volta. Os zumbis se acomodaram."});
Object.assign(dict.es,{"reminders":"RECORDATORIOS","rem1t":"La pista te espera","rem1x":"Tu taller está parado. La horda no.","rem2t":"Tres días fuera de la pista","rem2x":"Vuelve y recupera tu nivel. Los zombis se acomodaron."});
// Categoria do carro. Vinha da tabela do motor e ficava em inglês nos três idiomas.
Object.assign(dict.en,{"cat_Compact":"COMPACT","cat_Hatch":"HATCH","cat_SUV":"SUV","cat_Off-road":"OFF-ROAD","cat_Pickup":"PICKUP","cat_Muscle":"MUSCLE","cat_Electric":"ELECTRIC","cat_Super":"SUPER","cat_SUV Premium":"SUV PREMIUM","cat_Truck":"TRUCK","cat_Ultimate":"ULTIMATE","cat_Moto":"MOTORCYCLE"});
Object.assign(dict.pt,{"cat_Compact":"COMPACTO","cat_Hatch":"HATCH","cat_SUV":"SUV","cat_Off-road":"FORA DE ESTRADA","cat_Pickup":"PICAPE","cat_Muscle":"MUSCLE","cat_Electric":"ELÉTRICO","cat_Super":"SUPERESPORTIVO","cat_SUV Premium":"SUV PREMIUM","cat_Truck":"CAMINHÃO","cat_Ultimate":"SUPREMO","cat_Moto":"MOTOCICLETA"});
Object.assign(dict.es,{"cat_Compact":"COMPACTO","cat_Hatch":"HATCH","cat_SUV":"SUV","cat_Off-road":"TODOTERRENO","cat_Pickup":"PICKUP","cat_Muscle":"MUSCLE","cat_Electric":"ELÉCTRICO","cat_Super":"SÚPER","cat_SUV Premium":"SUV PREMIUM","cat_Truck":"CAMIÓN","cat_Ultimate":"SUPREMO","cat_Moto":"MOTOCICLETA"});
Object.assign(dict.en,{hellName:'HELL',hellFall:'YOU FELL INTO HELL',hellFall2:'Your car goes as it was',hellGoal:'Beat the boss to go back where you stopped',hellBack:'BACK TO STAGE',terr_rainy_dirt:'PUDDLES · SLOWER',terr_rainy_mud:'MUD · SLOWER SHOTS',terr_desert_dirt:'SAND · SLOWER',terr_desert_mud:'DEEP SAND · SLOWER SHOTS',terr_snowy_dirt:'SNOW · SLOWER',terr_snowy_mud:'ICE · SLOWER SHOTS',terr_city_dirt:'RUBBLE · SLOWER',terr_hell_dirt:'ASH · SLOWER',terr_hell_mud:'COOLED LAVA · SLOWER SHOTS',hole:'JUMP! SWIPE UP',holeAhead:'POTHOLE AHEAD',swipe:'SWIPE = LANE · UP = JUMP · HOLD = MACHINE GUN',tutorial2:'NITRO is one tank for two specials. HOLD the Nitro button: speed, lightning on every enemy, you are immune and run zombies over. HOLD a finger on the road: blue machine gun. Both drain the ring around the button only while you hold; blue cans refill it, even mid-use. Track upgrades carry over after victory and reset only on defeat. Red pickups reduce damage, jam the gun or drain Nitro.',vibra:'VIBRATION',tutorial:'Swipe deliberately to change one lane. Fire is automatic. Zombies drop gold coins where they fall: drive over them (bigger zombies drop more). Swipe UP to jump over potholes, zombies and the boss shockwave. Collect purple missile parts to unlock up to ten shots. Blue cans fill Nitro: four cans charge it. Some large enemies drop healing. Dodge red penalties.'});
Object.assign(dict.pt,{hellName:'INFERNO',hellFall:'VOCÊ CAIU NO INFERNO',hellFall2:'Seu carro vai como estava',hellGoal:'Derrote o chefe para voltar de onde parou',hellBack:'DE VOLTA À FASE',terr_rainy_dirt:'POÇAS · MAIS LENTO',terr_rainy_mud:'LAMA · TIROS MAIS LENTOS',terr_desert_dirt:'AREIA · MAIS LENTO',terr_desert_mud:'AREIA FOFA · TIROS MAIS LENTOS',terr_snowy_dirt:'NEVE · MAIS LENTO',terr_snowy_mud:'GELO · TIROS MAIS LENTOS',terr_city_dirt:'ENTULHO · MAIS LENTO',terr_hell_dirt:'CINZAS · MAIS LENTO',terr_hell_mud:'LAVA FRIA · TIROS MAIS LENTOS',hole:'PULE! DESLIZE PARA CIMA',holeAhead:'BURACO À FRENTE',swipe:'DESLIZE = FAIXA · PARA CIMA = PULO · SEGURE = METRALHADORA',tutorial2:'O NITRO é um tanque só para dois especiais. SEGURE o botão Nitro: velocidade, raios em todos os inimigos, você fica imune e atropela os zumbis. SEGURE o dedo na pista: metralhadora azul. Os dois gastam o anel em volta do botão só enquanto você segura; os tanques azuis reabastecem, mesmo durante o uso. Os bônus da pista continuam após vitórias e reiniciam só na derrota. Itens vermelhos reduzem dano, travam a arma ou drenam o Nitro.',vibra:'VIBRAÇÃO',tutorial:'Deslize com intenção para trocar uma faixa. O disparo é automático. Os zumbis deixam moedas douradas onde caem: passe por cima para pegar (os maiores deixam mais). Deslize PARA CIMA para pular buracos, zumbis e a onda do chefe. Junte peças roxas para liberar até dez mísseis. Quatro tanques azuis carregam o Nitro. Alguns inimigos grandes deixam cura. Desvie dos itens vermelhos.'});
const nativeAds=typeof window.NitroAds!=='undefined';
// Build de TESTE (sem anuncio de verdade: APK de teste e AAB de teste interno)? Quem responde e o build
// (Unity Ads desde a 0.19.1; ate a 0.19.0, AdMob). Versao antiga da ponte nao tem o metodo:
// nesse caso assumimos teste, que e o que ela era.
const testAds=nativeAds&&(typeof window.NitroAds.testAds!=='function'||window.NitroAds.testAds());
Object.assign(dict.en,{prototype:testAds?'TEST BUILD · Original cars · Test ads':nativeAds?'Original cars · Lipy Games':'BROWSER PREVIEW · Ads unavailable',banner:testAds?'TEST ADS':nativeAds?'ADVERTISEMENT':'PREVIEW · ADS UNAVAILABLE',privacy:'PRIVACY',adUnavailable:'Ad unavailable. Try again later.',adWaiting:testAds?'OPENING TEST AD…':'OPENING AD…',bonus:testAds?'WATCH TEST AD · +25% CREDITS':'WATCH AD · +25% CREDITS',revive:testAds?'WATCH TEST AD · REVIVE':'WATCH AD · REVIVE'});
Object.assign(dict.pt,{prototype:testAds?'VERSÃO DE TESTE · Carros originais · Anúncios de teste':nativeAds?'Carros originais · Lipy Games':'PRÉVIA NO NAVEGADOR · Anúncios indisponíveis',banner:testAds?'ANÚNCIOS DE TESTE':nativeAds?'PUBLICIDADE':'PRÉVIA · ANÚNCIOS INDISPONÍVEIS',privacy:'PRIVACIDADE',adUnavailable:'Anúncio indisponível. Tente mais tarde.',adWaiting:testAds?'ABRINDO ANÚNCIO DE TESTE…':'ABRINDO ANÚNCIO…',bonus:testAds?'VER ANÚNCIO DE TESTE · +25% CRÉDITOS':'VER ANÚNCIO · +25% CRÉDITOS',revive:testAds?'VER ANÚNCIO DE TESTE · REVIVER':'VER ANÚNCIO · REVIVER'});
Object.assign(dict.es,{prototype:testAds?'VERSIÓN DE PRUEBA · Autos originales · Anuncios de prueba':nativeAds?'Autos originales · Lipy Games':'VISTA PREVIA EN EL NAVEGADOR · Anuncios no disponibles',banner:testAds?'ANUNCIOS DE PRUEBA':nativeAds?'PUBLICIDAD':'VISTA PREVIA · ANUNCIOS NO DISPONIBLES',privacy:'PRIVACIDAD',adUnavailable:'Anuncio no disponible. Inténtalo más tarde.',adWaiting:testAds?'ABRIENDO ANUNCIO DE PRUEBA…':'ABRIENDO ANUNCIO…',bonus:testAds?'VER ANUNCIO DE PRUEBA · +25% CRÉDITOS':'VER ANUNCIO · +25% CRÉDITOS',revive:testAds?'VER ANUNCIO DE PRUEBA · REVIVIR':'VER ANUNCIO · REVIVIR'});
if(nativeAds)document.querySelector('.adBanner').classList.add('hidden');
const NVS=window.NVStore||{get:k=>localStorage.getItem(k),set:(k,v)=>localStorage.setItem(k,v)};let profile;try{profile=JSON.parse(NVS.get('nitrovenant-v1'))}catch(e){}let audioCtx,viewCar=0,level=1,toastTimer,cashTimer,lastAd=-999,adBusy=false,bonusClaimed=false,garage=true;
const game=new NV.Game(profile,event);window.game=game;viewCar=game.p.selected;level=game.p.active?(game.p.active.inHell&&game.p.active.realLevel||game.p.active.level):game.p.unlocked;
let renderer;try{renderer=new Renderer($('world'));}catch(e){$('garage').innerHTML='<div class="panel"><h2>3D unavailable</h2><p>Update Android System WebView and reopen Nitrovenant.</p></div>';throw e;}
try{renderer.chars=new CharacterLayer(renderer);if(renderer.scenery)renderer.scenery.name=null;renderer.restoreState();}catch(e){console.warn('Personagens 3D indisponíveis:',e);}
// Força de cada tipo de batida no carro (faíscas, tranco, tremor e vibração proporcionais).
const HIT_POWER={hole:.65,mob:.35,spike:.3,tool:.55,slam:.85,rush:1,bomber:.9,bomb:.9};
// Vibração leve: ponte nativa (amplitude controlada) no APK; navigator.vibrate como reserva no navegador.
function buzz(ms,amp){if(!game.p.vibra||document.hidden)return;try{if(window.NitroHaptics)NitroHaptics.pulse(ms,amp);else if(navigator.vibrate)navigator.vibrate(ms)}catch(e){}}
renderer.onThunder=()=>{if(game.state!=='race')return;motorAudio.cue('thunder',game.p.sound);if(game.p.fx){const f=$('flash');if(f){f.style.transition='none';f.style.opacity=.22;requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transition='opacity .5s ease-out';f.style.opacity=0}))}}};
renderer.onImpact=kind=>{motorAudio.cue('thud',game.p.sound);if(kind==='landing')buzz(45,120);else buzz(24,80)};
// Ordem da roda do seletor. Cada idioma aparece escrito NA PRÓPRIA língua.
const IDIOMAS=[['en','ENGLISH'],['pt','PORTUGUÊS'],['es','ESPAÑOL']];
function t(k){const d=dict[game.p.lang];return (d&&d[k])||dict.en[k]||k}function fmt(v){return Math.floor(v).toLocaleString('en-US')}function save(){try{NVS.set('nitrovenant-v1',JSON.stringify(game.p))}catch(e){toast(t('warnStorage'))}}
// Cópia para a nuvem em MARCOS (voltar à garagem, comprar, sair do jogo), não a cada gravação:
// salvar é chamado dezenas de vezes por corrida, e cada envio é uma ida à rede.
function nuvemGuardar(){if(!window.Nuvem||!Nuvem.ligado||!Nuvem.lido)return;
 const agora=performance.now();if(agora-nuvemEnvio<8000)return;nuvemEnvio=agora;Nuvem.salvar(game.p)}
const motorAudio=new MotorAudio();document.addEventListener('pointerdown',()=>motorAudio.unlock(),{passive:true});
// Clique de botão: só nos menus e na garagem. Os botões da corrida ficam de fora de propósito —
// trocar de faixa já tem o som da curva, e um clique por cima viraria matraca.
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('button');
 if(b&&!b.disabled&&!b.closest('#race'))motorAudio.cue('clique',game.p.sound)},true);function sound(freq=.5,duration=.08){if(game.p.sound&&!document.hidden)motorAudio.tone(Math.max(40,freq*700),Math.max(30,freq*300),duration,.06)}
function flash(){if(!game.p.fx)return;const f=$('flash');if(!f)return;f.style.transition='none';f.style.opacity=.5;requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transition='opacity .45s ease-out';f.style.opacity=0}))}
// Sair para a garagem DESCARTA a corrida (pedido do dono): a fase recomeça do zero na volta. As melhorias de
// pista voltam ao que eram na entrada da fase (mesma regra do reinício), e a garagem fica liberada para compras.
function abandonRun(){game.p.campaign=game.entryCampaign?JSON.parse(JSON.stringify(game.entryCampaign)):null;game.p.active=null;save();openGarage()}
// INFERNO: faixa na tela durante a queda; ao chegar, carrega os modelos daquela dificuldade antes de soltar o jogo.
function hellBanner(a,b){let el=$('hellBanner');if(!el){el=document.createElement('div');el.id='hellBanner';$('race').appendChild(el)}el.innerHTML='<b>'+a+'</b><span>'+b+'</span>';el.classList.add('on')}
function hideHellBanner(){const el=$('hellBanner');if(el)el.classList.remove('on')}
// FIM DE FASE. A música sai de cena ANTES do efeito, senão vitória e trilha tocam juntas e nenhuma
// das duas se ouve. Na vitória o carro acelera e some na pista enquanto a faixa entra na tela.
// O relógio é o de PAREDE, não o acumulado dos quadros: o passo por quadro é limitado a 0,04 s, então
// num aparelho a 20 fps a animação andaria a um terço da velocidade e o resultado abriria por cima
// dela no meio do caminho. A hora de abrir o resultado também sai de setTimeout, então os dois casam.
let outroIni=0;
function outro(win){
 if(window.Music)Music.parar();
 let el=$('outro');
 if(!el){el=document.createElement('div');el.id='outro';el.setAttribute('role','status');document.body.appendChild(el)}
 el.innerHTML='<b>'+t(win?'winBig':'loseBig')+'</b><span>'+t(win?'winSub':'loseSub')+'</span>';
 el.className=win?'on win':'on lose';
 outroIni=performance.now();
 $('race').classList.add('saindo');
 // O aviso de prêmio do chefe e os rótulos de vida ficam FORA de #race e sobreviveriam à faixa:
 // matar o chefe final avisa "+$3.480" no mesmo quadro em que a fase termina.
 {const tt=$('toast');if(tt){tt.style.opacity=0;tt.textContent=''}const lb=$('labels');if(lb)lb.innerHTML=''}
 if(renderer)renderer.fuga=0;
 // O efeito entra no silêncio deixado pela música, não por cima dela.
 setTimeout(()=>{if(outroIni)motorAudio.cue(win?'vitoria':'derrota',game.p.sound)},280);
 if(win)buzz(30,120);else{flash();buzz(110,320)}
}
function fimOutro(){outroIni=0;const el=$('outro');if(el)el.className='';const r=$('race');if(r)r.classList.remove('saindo');if(renderer)renderer.fuga=0}
// Chamado a cada quadro enquanto a faixa está na tela: é o que faz o carro fugir e a pista correr.
function outroTick(dt){
 if(!outroIni||!game.win)return;
 // Com um anúncio no meio, a faixa fica viva os 30 segundos dele; sem o teto, a pista somaria
 // dezenas de milhares de unidades por fora do motor.
 const t=Math.min(2.5,(performance.now()-outroIni)/1000);
 if(renderer)renderer.fuga=Math.min(1,t/1.7);
 game.roadScroll=(game.roadScroll||0)+dt*(55+t*110);   // a pista acelera junto com o carro
}
function enterHellView(){const c=renderer&&renderer.chars,fin=()=>{if(game.state==='paused'&&$('modal').classList.contains('hidden')){game.state='race';if(document.hidden)pause()}setTimeout(hideHellBanner,2200)};hellBanner(t('hellName'),t('hellGoal'));if(!c||!c.ok||!c.ready){fin();return}game.state='paused';let done=false;const once=()=>{if(done)return;done=true;fin()};c.ready(game.level,null,renderer.scenery?renderer.scenery.modelsFor('hell'):[]).then(once,once);setTimeout(once,8000)}
// O carro REGRIDE com a vida, entao a corrida pode precisar de qualquer carro da escada do jogador
// (os comprados ate o escolhido) e ainda do carro amigo. Sem isso eles carregariam no meio da corrida e
// o carro piscaria para a versao de blocos bem na hora de regredir.
function carrosDaCorrida(){const M=window.NV_MODELS;if(!M||!M.cars)return [];const p=game.p,alto=p.selected;
 const escada=[...new Set([0,...(p.owned||[0]).filter(t=>t<=alto),alto])];
 let amigo=-1;for(let k=alto+1;k<NV.CARS.length&&amigo<0;k++)if(!escada.includes(k))amigo=k;
 if(amigo<0)for(let k=NV.CARS.length-1;k>=0&&amigo<0;k--)if(!escada.includes(k))amigo=k;
 if(amigo<0)amigo=(alto+1)%NV.CARS.length;
 return [...escada,amigo].map(t=>M.cars[t]).filter(Boolean);}
// VIDEOS DE ABERTURA (animacoes do dono). O app libera autoplay COM som
// (MainActivity: setMediaPlaybackRequiresUserGesture(false)), entao eles tocam com audio; sem som nas
// configuracoes, tocam mudos. Regra de ouro: video nenhum pode travar a entrada do jogo. Se o arquivo
// faltar, o formato nao rolar, o navegador recusar o autoplay ou o video simplesmente enroscar, o
// 'acabar' dispara do mesmo jeito - por fim do video, por erro, por toque na tela ou pelo relogio.
function cine(nome,depois){
 const host=document.getElementById('cine'),v=document.getElementById('cineVid');
 // navigator.webdriver = navegador de teste automatico: os testes clicam nos botoes e a tela cheia do
 // video ficaria na frente deles. Em celular isso e sempre falso.
 if(!game.p.intro||navigator.webdriver||!host||!v||!v.canPlayType||!v.canPlayType('video/mp4')){host&&host.classList.add('hidden');depois();return}
 host.dataset.on='1';
 let fim=false,guarda=0;
 const acabar=()=>{if(fim)return;fim=true;clearTimeout(guarda);host.classList.add('hidden');host.onclick=null;
  try{v.pause();v.removeAttribute('src');v.load()}catch(e){}
  depois()};
 v.onended=acabar;v.onerror=acabar;v.onstalled=acabar;host.onclick=acabar;
 // O fundo preto entra na hora, mas o VIDEO so fica visivel quando comeca a rodar: um video parado na
 // tela ganha o botao PLAY gigante do sistema. Se em 2,5s ele nao engatou, o jogo segue sem ele.
 v.onplaying=()=>{if(!fim)host.classList.remove('carregando')};
 v.controls=false;
 document.getElementById('cineSkip').textContent=t('cineSkip');
 v.muted=!game.p.sound;v.volume=Math.max(0,Math.min(1,(game.p.sfx||0)/100));v.playsInline=true;v.src='video/'+nome+'.mp4';
 host.classList.add('carregando');host.classList.remove('hidden');
 guarda=setTimeout(acabar,12000); // teto absoluto: nenhuma abertura passa disso
 setTimeout(()=>{if(!fim&&(v.paused||!(v.currentTime>0)))acabar()},2500); // não engatou ou engatou e não anda: segue o jogo
 const tenta=()=>{const r=v.play();if(r&&r.catch)r.catch(()=>{if(!v.muted){v.muted=true;const r2=v.play();if(r2&&r2.catch)r2.catch(acabar)}else acabar()})};
 try{v.currentTime=0}catch(e){}
 tenta();}
// A musica sai do CONTEXTO a cada quadro. Regras que o dono pediu: comeca na GARAGEM (nao ao abrir o
// jogo), CALA durante as animacoes (so o audio delas), e PARA na pausa e na derrota.
function musicTick(dt){motorAudio.setVolume(game.p.sfx);if(!window.Music)return;Music.setVolume(game.p.music);
 const tela=document.getElementById('cine'),animando=tela&&!tela.classList.contains('hidden');
 // App em segundo plano: a musica cala. Sem isto ela seguia tocando com o jogo fechado, porque o laco
 // de desenho para mas o <audio> nao.
 if(document.hidden)Music.parar();
 else if(animando)Music.parar();
 else if(!garage&&game.state==='race')Music.set(game.inHell?'hell':'race',game.inHell?(game.hellVisits||1):(game.level||1));
 else if(garage)Music.set('menu',1);
 else Music.parar();
 Music.tick(dt);}
// O laço de desenho não roda com o app em segundo plano, então quem cala a música e para o vídeo ao
// sair do jogo é este aviso do sistema. Na volta, o contexto do quadro seguinte religa o que for o caso.
document.addEventListener('visibilitychange',()=>{
 const v=document.getElementById('cineVid'),tela=document.getElementById('cine');
 if(document.hidden){if(window.Music)Music.parar();if(v&&!v.paused){try{v.pause()}catch(e){}}return}
 // de volta ao app: vídeo parado no meio volta a andar, senão fica um quadro congelado na tela
 Loja.reconsultar();Aviso.limpar();
 if(!$('modal').classList.contains('hidden')&&$('closeSettings'))settings();
 if(v&&tela&&!tela.classList.contains('hidden')&&v.paused){const r=v.play();if(r&&r.catch)r.catch(()=>tela.click())}
});
window.addEventListener('pagehide',()=>{if(window.Music)Music.parar()});
// A GARAGEM SE MONTA: quando a animacao de abertura sai, as pecas entram deslizando uma atras da outra
// (o ritmo esta no --atraso de cada uma, no CSS). A classe sai sozinha para nao repetir a cada desenho.
function montaGaragem(){const b=document.body;b.classList.remove("montando");void b.offsetWidth;b.classList.add("montando");setTimeout(()=>b.classList.remove("montando"),2000);}
function toast(s){$('toast').textContent=s;$('toast').style.opacity=1;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').style.opacity=0,1400)}
function event(e,data){if(['pickup','burst','hurt','penalty','nos','tell','explode'].includes(e))motorAudio.cue(e==='pickup'?data.kind:e,game.p.sound,data&&data.src);if(e==='lane')motorAudio.cue('lane',game.p.sound);if(e==='save')save();if(e==='hellfall'){flash();if(renderer){renderer.shake=1;renderer.crack(game.x,0,3.4);}motorAudio.cue('hellfall',game.p.sound);buzz(90,200);hellBanner(t('hellFall'),t('hellFall2'));}if(e==='allyDrop'){motorAudio.cue('allyDrop',game.p.sound);toast(t('allyDrop'))}if(e==='allyIn'){buzz(40,90);toast(t('allyIn'))}if(e==='hell')enterHellView();if(e==='hellWin'){flash();hideHellBanner();toast(t('hellBack')+' '+game.level);buzz(40,140);}if(e==='hellLose')hideHellBanner();if(e==='start'){renderer&&renderer.resetFx();activePointer=null;if(!game.inHell)hideHellBanner();}if(e==='finish'){activePointer=null;game.setBoost(false);game.setFire(false);}if(e==='burst'){renderer&&renderer.burst(data);sound(.2,.05);if(data.boss&&data.coins)toast('+$'+fmt(data.coins));}if(e==='pickup'&&data.kind==='coin'){const el=$('raceCash');el.classList.add('pulse');clearTimeout(cashTimer);cashTimer=setTimeout(()=>el.classList.remove('pulse'),110)}else if(e==='pickup'){sound(1,.07);if(data.kind!=='cash')toast(data.kind==='multi'?(data.upgraded?'×'+game.multi+' '+t('pkMissiles'):game.multiProgress+'/'+game.multiTarget()+' '+t('pkParts')):data.kind==='damage'?'+'+(data.gain||6).toFixed(1)+' '+t('damage'):data.kind==='repair'?'+28 '+t('pkHp'):data.kind==='nos'?t('pkNos'):t('pkUpgrade'))}if(e==='penalty'){sound(.15,.3);toast(data.kind==='loss'?'−'+data.lost+' $':t(data.kind));}if(e==='hurt'){sound(.12,.2);const pw=HIT_POWER[data&&data.src]||.4,top=data&&data.src==='tool';if(renderer)renderer.carHit(game.x,pw,top?1.55:.9,top?.3:-1.5);buzz(Math.round(28+40*pw),Math.round(90+110*pw));}if(e==='ram'&&renderer)renderer.ram(data,game.x);if(e==='jump'){renderer&&renderer.jumpFx(game.x);motorAudio.cue('jump',game.p.sound);}if(e==='land'){renderer&&renderer.landFx(game.x);motorAudio.cue('land',game.p.sound);buzz(16,70);}if(e==='slam'&&renderer)renderer.groundStrike(data);if(e==='clang'){renderer&&renderer.tossTool(data,true);motorAudio.cue('clang',game.p.sound);}if(e==='miss'&&renderer)renderer.tossTool(data,false);if(e==='nos'){sound(.8,.6);buzz(30,110)}if(e==='boss'){const nm=renderer&&renderer.chars&&renderer.chars.bossTitle(data,game.p.lang);toast(nm?nm+' · '+t(data.final?'bossFinal':'bossMid'):t(data.final?'finalboss':'midboss'));}if(e==='explode'){renderer&&renderer.explode(data.x,data.z===undefined?0:data.z,.85,game.p.fx);flash();buzz(70,200);}if(e==='tell')sound(.35,.15);if(e==='finish'){if(nativeAds)NitroAds.race(false);bonusClaimed=false;outro(game.win);setTimeout(()=>{if(game.state==='result'){if(performance.now()/1000-lastAd>=90&&game.level>1)showAd(showResult);else showResult()}},game.win?2300:1900)}}
function themeName(){const s=window.SCENERY&&SCENERY[game.theme];return s?(s.name[game.p.lang]||s.name.en):''}
function terrainName(){const k='terr_'+game.theme+'_'+game.terrain,d=dict[game.p.lang]||dict.en;return d[k]||dict.en[k]||t(game.terrain)}
function translate(){document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));document.documentElement.lang=game.p.lang;}
function updateGarage(){const c=NV.CARS[viewCar];translate();$('wallet').textContent=fmt(game.p.money);$('category').textContent=t('cat_'+c.type);$('carName').textContent=c.name;$('carCount').textContent=String(viewCar+1).padStart(2,'0')+' / '+NV.CARS.length;const carried=game.p.active?game.p.active.damage-game.p.active.baseDamage:game.p.campaign?game.p.campaign.bonus:0;const vDano=Math.floor(Math.max(5,c.damage+game.p.weapon*4+carried));$('carDmg').textContent=vDano;$('carCount').textContent+=' · ×'+(game.p.active?game.p.active.multi:game.p.campaign?game.p.campaign.multi:1)+' '+t('shots');const vArmadura=c.hp+game.p.armor*18,vNitro=2000+c.tier*1000;$('carHp').textContent=vArmadura;$('carNos').textContent=fmt(vNitro)+' DMG';
 // Os tetos são o carro mais forte com tudo no máximo: 45+8*4 de dano, 254+8*18 de blindagem, 13000 de
 // nitro. Sem isto a barrinha era um desenho fixo, igual em todos os carros.
 const barra=(id,v,teto)=>{const e=$(id).nextElementSibling;if(e)e.style.setProperty('--p',Math.round(Math.max(4,Math.min(100,v/teto*100)))+'%')};
 barra('carDmg',vDano,77);barra('carHp',vArmadura,398);barra('carNos',vNitro,14000);const owned=game.p.owned.includes(viewCar);
 // VEÍCULO PAGO: o preço é o que a LOJA escreve, nunca um valor cravado aqui — a Google define o
 // valor por país e a tela mentiria para quem abrisse o jogo fora do Brasil.
 const pago=c.iap&&!owned,preco=c.iap?Loja.preco(c.iap):'';
 document.body.dataset.premium=c.iap?(owned?'meu':'tranca'):'';
 $('ownedBadge').textContent=owned?t('owned'):c.iap?t('premium'):t('locked');
 const analise=c.iap&&Loja.emAnalise(c.iap);
 $('buyCar').textContent=owned?t(game.p.selected===viewCar?'equipped':'equip')
  :pago?(analise?t('pending'):preco?t('unlockNow')+' · '+preco:Loja.nativa()?t('storeWait'):t('storeOff'))
  :t('buy')+' '+c.name.toUpperCase()+' · '+fmt(c.price);
 $('buyCar').classList.toggle('premium',!!pago);
 // Pago: o botão fica SEMPRE vivo (ele abre a tela, e é lá dentro que mora o RESTAURAR). Sem isso,
 // quem trocou de celular via 'CONSULTANDO A LOJA…' com o botão morto e não recuperava a compra.
 $('buyCar').disabled=pago?false:game.p.active?true:owned?game.p.selected===viewCar:game.p.money<c.price;for(let k of ['weapon','armor','tires']){$(k+'Up').innerHTML=t(k)+' '+game.p[k]+'/8<b>'+(game.p[k]>=8?t('max'):fmt(game.cost(k)))+'</b>';$(k+'Up').disabled=!!game.p.active||game.p[k]>=8||game.p.money<game.cost(k);$(k+'Up').style.setProperty('--p',(game.p[k]/8*100)+'%')}$('levelName').textContent=t('stage')+' '+String(level).padStart(2,'0')+' / '+game.p.unlocked;$('prevLevel').disabled=!!game.p.active||level<=1;$('nextLevel').disabled=!!game.p.active||level>=game.p.unlocked;$('play').textContent=t(game.p.active?'resumeRun':'drive');}
function modal(html){$('modalContent').innerHTML=html;$('modal').classList.remove('hidden')}function hideModal(){$('modal').classList.add('hidden')}function btn(id,text,secondary=false){return '<button id="'+id+'" class="main '+(secondary?'secondary':'cyan')+'">'+text+'</button>'}
// Um anúncio pedido e ainda sem resposta é esquecido ao voltar para a garagem: senão a resposta
// atrasada abriria o painel de resultado por cima da garagem, ou de uma corrida já em andamento.
function openGarage(){fimOutro();pendingAd=null;adBusy=false;setTimeout(nuvemGuardar,50);hideHellBanner();if(nativeAds)NitroAds.race(false);garage=true;game.state='garage';$('garage').classList.remove('hidden');$('race').classList.add('hidden');$('labels').innerHTML='';hideModal();viewCar=game.p.selected;updateGarage()}
function updateControls(){document.querySelector('.controls').classList.toggle('swipeOnly',!game.p.arrows);$('left').classList.toggle('hidden',!game.p.arrows);$('right').classList.toggle('hidden',!game.p.arrows);}
// Largada com portão de carga: os modelos da fase são decodificados, as piscinas de avatares enchidas e a GPU
// aquecida ANTES de a corrida começar (era isso que travava no meio da fase). Falhou ou demorou: larga assim mesmo.
// CARREGAMENTO ESCONDIDO ATRAS DA ANIMACAO: os modelos da fase comecam a carregar JUNTO com o video de
// ligar o motor. Quando o video acaba, se ja terminou, a corrida entra direto e a tela de "carregando"
// nunca chega a aparecer. So aparece se a espera sobrar depois da animacao.
let carga=null;
function carregarFase(){
 const c=renderer&&renderer.chars,lv=game.p.active?game.p.active.level:level;
 // A carga é POR FASE. Sem isto, o "PRÓXIMA FASE" reaproveitava a carga da fase anterior, já pronta, e a
 // fase nova começava com o chefe da vez sem modelo — voltando a aparecer como boneco de blocos.
 if(carga&&carga.fase===lv)return carga.promessa;
 carga={fase:lv,k:0,pronta:false,promessa:null};
 if(!c||!c.ok||!c.ready){carga.pronta=true;carga.promessa=Promise.resolve();return carga.promessa}
 const extras=carrosDaCorrida().concat(renderer.scenery?renderer.scenery.modelsFor(game.p.active&&game.p.active.inHell?'hell':NV.Game.themeFor(lv)):[]);
 const anda=k=>{carga.k=k;const f=$('loadFill');if(f)f.style.width=Math.round(4+96*k)+'%'};
 const pronto=c.ready(lv,anda,extras).then(()=>{},()=>{});
 const teto=new Promise(r=>setTimeout(r,10000));
 carga.promessa=Promise.race([pronto,teto]).then(()=>{carga.pronta=true});
 return carga.promessa;
}
function start(){
 const espera=carregarFase();
 if(carga.pronta){go();return}
 let entrou=false;const entrar=()=>{if(entrou)return;entrou=true;go()};
 const aviso=setTimeout(()=>{if(!entrou)modal('<span class="tag">NITROVENANT</span><h2>'+t('loading')+'</h2><div class="progress"><i id="loadFill" style="width:'+Math.round(4+96*carga.k)+'%"></i></div>')},220);
 espera.then(()=>{clearTimeout(aviso);entrar()});
 setTimeout(()=>{clearTimeout(aviso);entrar()},11000);
}
function go(){if(nativeAds)NitroAds.race(true);hideModal();updateControls();garage=false;$('garage').classList.add('hidden');$('race').classList.remove('hidden');if(game.p.active){if(!game.resumeSaved())game.start(level);else level=game.inHell?game.realLevel:game.level;}else game.start(level);sound(.7,.2);{const nm=themeName();if(nm)toast(game.inHell?nm:t('stage')+' '+game.level+' · '+nm)}$('swipeHint').style.display='block';setTimeout(()=>$('swipeHint').style.display='none',7000)}
function tutorial(){modal('<span class="tag">NITROVENANT / LIPY</span><h2>'+t('tutorialTitle')+'</h2><p>'+t('tutorial')+'</p><p>'+t('tutorial2')+'</p><p class="notice">'+t('prototype')+'</p>'+btn('lets',t('lets')));$('lets').onclick=()=>{game.p.tutorial=true;save();start()}}
$('play').onclick=()=>{carregarFase();cine('motor',()=>{if(!game.p.tutorial)tutorial();else start()})};$('prevCar').onclick=()=>{viewCar=(viewCar+NV.CARS.length-1)%NV.CARS.length;updateGarage()};$('nextCar').onclick=()=>{viewCar=(viewCar+1)%NV.CARS.length;updateGarage()};$('buyCar').onclick=()=>{const cc=NV.CARS[viewCar];if(cc.iap&&!game.p.owned.includes(viewCar))return telaCompra(cc);let own=game.p.owned.includes(viewCar);if(own)game.select(viewCar);else if(game.buy(viewCar)){toast(t('bought'));sound(1.5,.3)}updateGarage()};for(let k of ['weapon','armor','tires'])$(k+'Up').onclick=()=>{if(game.upgrade(k)){toast(t('upgraded'));sound(.9)}updateGarage()};$('prevLevel').onclick=()=>{level=Math.max(1,level-1);updateGarage()};$('nextLevel').onclick=()=>{level=Math.min(game.p.unlocked,level+1);updateGarage()};
function settings(){
 // linha com interruptor; ligado = laranja, igual a referencia
 const sw=(id,icone,rotulo,ligado)=>'<button id="'+id+'" class="cfgRow"><i class="ci '+icone+'"></i><span>'+rotulo+'</span><em class="sw'+(ligado?' on':'')+'">'+(ligado?'ON':'OFF')+'</em></button>';
 // linha que abre outra coisa: mostra seta
 const go=(id,icone,rotulo)=>'<button id="'+id+'" class="cfgRow"><i class="ci '+icone+'"></i><span>'+rotulo+'</span><em class="chev"></em></button>';
 // linha com barra de volume: música e efeitos usam a mesma
 const nivel=(id,icone,rotulo,v)=>'<button id="'+id+'" class="cfgRow"><i class="ci '+icone+'"></i><span>'+rotulo+'</span><em class="lvl"><b>'+(v>0?v+'%':'OFF')+'</b><s style="--p:'+v+'%"></s></em></button>';
 modal('<div class="cfgTop"><h2>'+t('settings')+'</h2><span class="cfgVer">NITROVENANT<br>v0.19.0</span></div>'
  +go('langToggle','globo',t('language')+': '+(IDIOMAS.find(i=>i[0]===game.p.lang)||IDIOMAS[0])[1])
  +nivel('soundToggle','som',t('sound'),game.p.sfx)
  +sw('arrowsToggle','setas',t('arrows'),game.p.arrows)
  +sw('vibraToggle','vibra',t('vibra'),game.p.vibra)
  +sw('avisoToggle','sino',t('reminders'),game.p.avisos&&Aviso.permitido())
  +sw('perfToggle','perf','PERF',perf.on)
  +sw('fxToggle','pulso',t('effects'),game.p.fx)
  +nivel('musicToggle','musica',t('music'),game.p.music)
  +sw('introToggle','video',t('intro'),game.p.intro)
  +'<div class="cfgInfo"><i class="ci info"></i><p>'+t('saved')+'. '+t('prototype')+'.</p></div>'
  +go('cloudSave','nuvem',t('cloudSave')+': '+nuvemLinha())
  +go('privacy','escudo',t('privacy'))
  +go('resetProfile','perfil',t('reset'))
  +'<button id="closeSettings" class="cfgClose">'+t('close')+'</button>'
 );$('langToggle').onclick=()=>{const i=IDIOMAS.findIndex(x=>x[0]===game.p.lang);game.p.lang=IDIOMAS[(i+1)%IDIOMAS.length][0];save();updateGarage();settings()};$('soundToggle').onclick=()=>{const passos=[100,70,35,0],i=passos.indexOf(game.p.sfx);game.p.sfx=passos[(i<0?0:i+1)%passos.length];game.p.sound=game.p.sfx>0;save();motorAudio.setVolume(game.p.sfx);if(game.p.sound)motorAudio.cue('lane',true);settings()};$('fxToggle').onclick=()=>{game.p.fx=!game.p.fx;save();settings()};$('introToggle').onclick=()=>{game.p.intro=!game.p.intro;save();settings()};$('musicToggle').onclick=()=>{const passos=[100,70,35,0];game.p.music=passos[(passos.indexOf(game.p.music)+1+passos.length)%passos.length]??70;save();if(window.Music)Music.setVolume(game.p.music);settings()};$('avisoToggle').onclick=()=>{
  // O clique age sobre o que a TELA mostra, não sobre o campo do perfil: eles divergem enquanto
  // a permissão do Android não foi dada, e aí desligar viraria ligar.
  const naTela=game.p.avisos&&Aviso.permitido();
  if(naTela){game.p.avisos=false;Aviso.limpar()}
  // A permissão do Android 13+ é pedida AQUI, quando ele liga a opção — nunca no primeiro
  // arranque, que é o jeito mais rápido de levar um 'não' permanente.
  else{game.p.avisos=true;if(!Aviso.permitido())Aviso.pedir()}
  save();setTimeout(settings,400)};$('vibraToggle').onclick=()=>{game.p.vibra=!game.p.vibra;save();if(game.p.vibra)buzz(40,120);settings()};$('arrowsToggle').onclick=()=>{game.p.arrows=!game.p.arrows;save();updateControls();settings()};$('cloudSave').onclick=()=>telaNuvem();$('privacy').onclick=()=>{if(nativeAds)NitroAds.privacy();else toast(t('adUnavailable'))};$('resetProfile').onclick=()=>{modal('<h2>'+t('resetTitle')+'</h2><p>'+t('resetText')+'</p>'+btn('confirmReset',t('yesReset'),true)+btn('cancelReset',t('cancel')));$('cancelReset').onclick=settings;$('confirmReset').onclick=()=>{NVS.set('nitrovenant-v1',JSON.stringify(NV.defaults()));location.reload()}};$('perfToggle').onclick=()=>{perf.on=!perf.on;try{localStorage.setItem('nitrovenant-perf',perf.on?'1':'0')}catch(e){}perfShow();settings()};$('closeSettings').onclick=hideModal}
$('settingsBtn').onclick=settings;
function pause(){if(game.state!=='race')return;game.setBoost(false);game.setFire(false);activePointer=null;game.checkpoint();game.state='paused';modal('<span class="tag">NITROVENANT</span><h2>'+t('pause')+'</h2>'+btn('resume',t('resume'))+btn('restart',t('restart'),true)+btn('quit',t('quit'),true));$('restart').onclick=()=>{hideModal();game.restart()};$('resume').onclick=()=>{hideModal();game.state='race'};$('quit').onclick=()=>{modal('<h2>'+t('quit')+'</h2><p>'+t('quitText')+'</p>'+btn('confirmQuit',t('yes'),true)+btn('cancelQuit',t('no')));$('confirmQuit').onclick=abandonRun;$('cancelQuit').onclick=()=>{game.state='race';pause()}}}
$('pauseBtn').onclick=pause;window.appPause=()=>{pause();motorAudio.mute();Aviso.agendar();nuvemGuardar();if(window.Music)Music.parar();const v=document.getElementById('cineVid');if(v&&!v.paused){try{v.pause()}catch(e){}}};window.appBack=()=>{if(game.state==='race')pause();else if(!$('modal').classList.contains('hidden')&&!adBusy){if(game.state==='paused'){hideModal();game.state='race'}else if(game.state==='result')voltarDoResultado();else hideModal()}else if(game.state==='result')voltarDoResultado();};
// Sair pela faixa de vitória (botão voltar do Android) tem que avançar a fase mostrada na garagem,
// igual ao botão VOLTAR À GARAGEM do painel — senão a garagem reabre na fase que acabou de ser vencida.
function voltarDoResultado(){if(game.win)level=Math.min(game.level+1,game.p.unlocked);openGarage()}
let adRequestId=0,pendingAd=null;
window.nativeAdResult=(id,earned,shown)=>{if(!pendingAd||pendingAd.id!==id)return;let request=pendingAd;pendingAd=null;adBusy=false;clearTimeout(request.relogio);if(shown)lastAd=performance.now()/1000;hideModal();request.done(!!earned);if(request.reward&&!earned)toast(t('adUnavailable'));};
// O anúncio APARECEU na tela (aviso da parte nativa, desde a 0.19.1): o relógio de 90 s, que é para o anúncio
// que nunca abre, vira uma rede de 20 min. Quem sai do app no meio ou assiste um vídeo longo não perde o
// prêmio que já está vendo; a resposta certa chega pelo nativeAdResult quando o anúncio fechar.
window.nativeAdShown=id=>{if(!pendingAd||pendingAd.id!==id)return;clearTimeout(pendingAd.relogio);pendingAd.relogio=setTimeout(()=>window.nativeAdResult(id,false,true),1200000)};
function showAd(done,reward=false){
 // Sair sem chamar done() travava o jogo: quem esperava o resultado ficava com a faixa na tela e
 // nenhum painel. Todo portão do jogo tem relógio de segurança; este era o único sem.
 if(adBusy){done(false);return}if(!nativeAds){done(false);if(reward)toast(t('adUnavailable'));return;}adBusy=true;motorAudio.mute();let id=++adRequestId;pendingAd={id,done,reward};modal('<span class="tag">'+t('banner')+'</span><h2>'+t('adWaiting')+'</h2>');// Rede de segurança para a resposta nativa que nunca chega. 90 s de propósito: um vídeo recompensado
// passa de 30 s, e cortar antes tiraria do jogador um prêmio que ele já assistiu. Se a resposta certa
// tiver chegado, esta aqui não faz nada — pendingAd já é nulo.
 pendingAd.relogio=setTimeout(()=>window.nativeAdResult(id,false,false),90000);
 try{NitroAds.request(id,reward)}catch(e){window.nativeAdResult(id,false,false)}}



// LEMBRETES locais. Agendados no próprio celular ao sair do jogo, e cancelados ao voltar — senão o
// aviso dispara com o jogador jogando.
const Aviso={
 nativa(){return typeof window.NitroNotify!=='undefined'},
 permitido(){try{return this.nativa()&&NitroNotify.allowed()}catch(e){return false}},
 pedir(){try{if(this.nativa())NitroNotify.ask()}catch(e){}},
 limpar(){try{if(this.nativa())NitroNotify.clear()}catch(e){}},
 agendar(){
  if(!this.nativa()||!game.p.avisos||!this.permitido())return this.limpar();
  // Um lembrete no dia seguinte e outro no terceiro dia. Mais que isso vira praga e o jogador desliga.
  try{NitroNotify.schedule(JSON.stringify([
   {h:24,titulo:t('rem1t'),texto:t('rem1x')},
   {h:72,titulo:t('rem2t'),texto:t('rem2x')},
  ]))}catch(e){}
 },
};
// SALVAR PROGRESSO (Google Play Games). O progresso de verdade continua no aparelho; a nuvem é uma
// cópia que segue a conta do jogador.
let nuvemEnvio=-1e9,nuvemPedido=false;
function nuvemLinha(){
 return Nuvem.ligado?t('cloudOn'):t('cloudOff');
}
function telaNuvem(){
 const on=Nuvem.ligado;
 modal('<span class="tag">'+t('cloudSave')+'</span><h2>'+t('cloudTitle')+'</h2>'
  +'<p>'+t('cloudText')+'</p>'
  +(Nuvem.nativa()?'':'<p class="notice">'+t('cloudOffline')+'</p>')
  +(on?btn('nuvemAgora',t('cloudSync')):btn('nuvemLigar',t('cloudConnect')))
  +btn('nuvemFechar',t('close'),true));
 if($('nuvemLigar')){$('nuvemLigar').disabled=!Nuvem.nativa();
  $('nuvemLigar').onclick=()=>{if(!Nuvem.conectar(true))toast(t('cloudFail'))};}
 if($('nuvemAgora'))$('nuvemAgora').onclick=()=>{nuvemEnvio=-1e9;nuvemGuardar();toast(t('cloudSending'))};
 $('nuvemFechar').onclick=()=>{hideModal();settings()};
}
// A nuvem respondeu: mudou o estado da conexão.
function nuvemMudou(){
 // 'sem-play-games' e 'desligado' são ESTADO, não erro do jogador: avisar disso a cada arranque
 // de quem não usa Play Games seria só barulho.
 if(Nuvem.erro==='salvar-falhou'||Nuvem.erro==='ler-falhou'||Nuvem.erro==='conflito-falhou')toast(t('cloudFail'));
 if(Nuvem.ligado&&!Nuvem.lido&&!nuvemPedido){nuvemPedido=true;Nuvem.carregar()}
 if(!$('modal').classList.contains('hidden')&&$('nuvemFechar'))telaNuvem();
}
// Chegou a cópia da nuvem. Aqui mora a decisão de quem vale mais — e ela NÃO é pela data: um celular
// com a hora errada apagaria meses de progresso.
function nuvemChegou(doNuvem,conflito){
 if(!doNuvem&&!conflito){nuvemGuardar();toast(t('cloudLinked'));return}
 // Nunca no meio de uma corrida: trocar o perfil ali mudaria carro, vida e dano em pleno jogo.
 // Quem manda é o ESTADO do jogo, não a variável de tela: dá para estar correndo com ela ainda true.
 if(game.state!=='garage'){setTimeout(()=>nuvemChegou(doNuvem,conflito),4000);return}
 const antes=Nuvem.peso(game.p);
 // FUNDE, não escolhe: escolher um vencedor apagaria dinheiro, melhorias e carros PAGOS do perdedor.
 // Aqui fica o maior de cada campo e a união dos veículos.
 game.p=NV.sanitize(Nuvem.fundir(game.p,doNuvem));
 // A loja é quem manda nos veículos pagos: se ela já respondeu, a palavra final é dela.
 if(window.Loja&&Loja.sabe())game.syncCompras(Loja.ativos);
 save();viewCar=game.p.owned.includes(viewCar)?viewCar:game.p.selected;
 level=Math.min(Math.max(1,level),game.p.unlocked);
 if(conflito)Nuvem.resolver(game.p);else nuvemGuardar();
 updateGarage();
 toast(Nuvem.peso(game.p)>antes?t('cloudRestored'):t('cloudLinked'));
}
// TELA DE COMPRA. O preço é o que a loja escreveu; sem preço, o botão de comprar fica desligado em
// vez de prometer um valor que pode não ser o cobrado. O RESTAURAR continua vivo nessa hora: é
// justamente quem trocou de celular que precisa dele.
let compraAberta=null;
function telaCompra(c,estado){
 compraAberta=c;
 const preco=Loja.preco(c.iap),analise=Loja.emAnalise(c.iap);
 const aviso=estado==='erro'?'<p class="notice">'+t('buyFail')+'</p>'
  :estado==='indo'?'<p class="notice">'+t('opening')+'</p>'
  :analise?'<p class="notice">'+t('pendingText')+'</p>':'';
 modal('<span class="tag">'+t('premium')+'</span><h2>'+c.name.toUpperCase()+'</h2>'
  +'<div class="big">'+(analise?t('pending'):preco||(Loja.nativa()?t('storeWait'):t('storeOff')))+'</div>'
  +'<p>'+t('buyText')+'</p>'+aviso
  +'<div class="row"><span>'+t('damage')+'</span><b>'+c.damage+'</b></div>'
  +'<div class="row"><span>'+t('armor')+'</span><b>'+c.hp+'</b></div>'
  +btn('irLoja',t('buyGo'))+btn('restaurar',t('restore'),true)+btn('fecharCompra',t('cancel'),true));
 $('irLoja').disabled=!preco||analise||estado==='indo';
 $('irLoja').onclick=()=>{if(Loja.comprar(c.iap))telaCompra(c,'indo');else telaCompra(c,'erro')};
 $('restaurar').onclick=()=>{Loja.reconsultar();toast(t('restoring'))};
 $('fecharCompra').onclick=()=>{compraAberta=null;hideModal()};
}
// A loja avisou alguma coisa: preço novo, compra concluída, pagamento em análise ou erro.
let ultimoErro=0;
function lojaMudou(){
 const houveErro=Loja.erroSeq!==ultimoErro;ultimoErro=Loja.erroSeq;
 if(Loja.sabe()){
  const antes=game.p.owned.slice();
  if(game.syncCompras(Loja.ativos)){
   const ganhou=game.p.owned.filter(x=>!antes.includes(x));
   if(ganhou.length){
    toast(t('thanks'));motorAudio.cue('vitoria',game.p.sound);buzz(40,160);
    // Só equipa na GARAGEM: trocar o veículo no meio da corrida mudaria o carro na pista para um
    // modelo que pode nem estar carregado.
    if(garage){viewCar=ganhou[ganhou.length-1];game.select(viewCar);}
   }
  }
 }
 // A tela de compra aberta precisa acompanhar: senão ela congela em "CONSULTANDO A LOJA…" ou fica
 // oferecendo um veículo que o jogador acabou de receber.
 if(compraAberta&&!$('modal').classList.contains('hidden')){
  if(game.p.owned.includes(compraAberta.tier)){compraAberta=null;hideModal()}
  else telaCompra(compraAberta,houveErro?'erro':'');
 }
 if(garage)updateGarage();
}
function showResult(){fimOutro();const win=game.win;modal('<span class="tag">'+t('stage')+' '+game.level+'</span><h2>'+t(win?'finish':'defeat')+'</h2><div class="big">+'+fmt(game.reward)+'</div><p>'+t('earned')+'</p>'+(game.win&&game.rewardFactor<1?'<p class="notice">'+t('repeat')+': '+Math.round(game.rewardFactor*100)+'%</p>':'')+'<div class="row"><span>'+t('kills')+'</span><b>'+game.kills+'</b></div>'+(!bonusClaimed?btn('bonus',t('bonus'),true):'')+(!win&&!game.revived?btn('revive',t('revive'),true):'')+btn('resultGarage',t('garage'))+btn('again',t(win?'next':'retry'),true));$('resultGarage').onclick=()=>{level=win?Math.min(game.level+1,game.p.unlocked):game.level;openGarage()};$('again').onclick=()=>{level=win?Math.min(game.level+1,game.p.unlocked):game.level;start()};if($('bonus'))$('bonus').onclick=()=>showAd(earned=>{if(!earned){showResult();return;}let n=Math.floor(game.reward*.25);game.p.money+=n;game.reward+=n;bonusClaimed=true;save();showResult()},true);if($('revive'))$('revive').onclick=()=>showAd(earned=>{if(!earned){showResult();return;}game.revive();if(nativeAds)NitroAds.race(true);hideModal()},true);}
$('left').onclick=()=>game.move(-1);$('right').onclick=()=>game.move(1);{const n=$('nos'),off=()=>game.setBoost(false);n.addEventListener('pointerdown',e=>{e.preventDefault();if(game.state!=='race')return;try{n.setPointerCapture(e.pointerId)}catch(x){}game.setBoost(true)});for(const k of ['pointerup','pointercancel','lostpointercapture'])n.addEventListener(k,off);n.addEventListener('contextmenu',e=>e.preventDefault());}
let downX=0,downY=0,lastX=0,lastY=0,downAt=0,movedAt=0,activePointer=null;const releaseFire=()=>{activePointer=null;game.setFire(false)};$('world').addEventListener('pointerdown',e=>{if(game.state!=='race'||activePointer!==null)return;activePointer=e.pointerId;downX=lastX=e.clientX;downY=lastY=e.clientY;downAt=performance.now();movedAt=0;try{$('world').setPointerCapture(e.pointerId)}catch(x){}});
// Deslizar troca UMA faixa e o ponto de apoio anda junto com o dedo: com o dedo parado na tela (metralhando) dá para trocar de faixa quantas vezes quiser.
const swipe=e=>{if(e.pointerId!==activePointer)return;lastX=e.clientX;lastY=e.clientY;if(performance.now()-movedAt<260){downX=e.clientX;downY=e.clientY;return;}let dx=e.clientX-downX,dy=e.clientY-downY;if(dy<=-Math.max(56,Math.min(85,innerWidth*.15))&&Math.abs(dy)>Math.abs(dx)*1.4){game.jump();downX=e.clientX;downY=e.clientY;movedAt=downAt=performance.now();return;}if(Math.abs(dx)>=Math.max(56,Math.min(85,innerWidth*.15))&&Math.abs(dx)>Math.abs(dy)*1.4){game.move(dx>0?1:-1);downX=e.clientX;downY=e.clientY;movedAt=downAt=performance.now();}else if(Math.abs(dy)>120){downX=e.clientX;downY=e.clientY;}};$('world').addEventListener('pointermove',swipe);$('world').addEventListener('pointerup',e=>{swipe(e);if(e.pointerId===activePointer)releaseFire()});$('world').addEventListener('pointercancel',e=>{if(e.pointerId===activePointer)releaseFire()});$('world').addEventListener('lostpointercapture',e=>{if(e.pointerId===activePointer)releaseFire()});$('world').addEventListener('contextmenu',e=>e.preventDefault());document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='a')game.move(-1);if(e.key==='ArrowRight'||e.key==='d')game.move(1);if(e.key==='ArrowUp'||e.key==='w'){e.preventDefault();game.jump()}if(e.code==='Space'){e.preventDefault();game.setBoost(true)}if(e.key==='f'||e.key==='F')game.setFire(true);if(e.key==='Escape')window.appBack()});document.addEventListener('keyup',e=>{if(e.code==='Space')game.setBoost(false);if(e.key==='f'||e.key==='F')game.setFire(false)});window.addEventListener('pagehide',()=>game.checkpoint());document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();motorAudio.mute()}});window.addEventListener('resize',()=>renderer.resize());
// HUD: só toca no DOM quando o valor muda (escrever textContent/style a cada quadro força layout à toa).
const hudCache={};function hudText(id,v){if(hudCache[id]!==v){hudCache[id]=v;$(id).textContent=v}}function hudStyle(id,prop,v){const k=id+'|'+prop;if(hudCache[k]!==v){hudCache[k]=v;if(prop.startsWith('--'))$(id).style.setProperty(prop,v);else $(id).style[prop]=v}}function hudClass(id,cls,on){on=!!on;const k=id+'.'+cls;if(hudCache[k]!==on){hudCache[k]=on;$(id).classList.toggle(cls,on)}}
// Desempenho: média e pior quadro. Resolução adaptativa: só reduz se o aparelho não segura ~48 fps na corrida,
// e volta a subir quando sobra folga. O medidor (Configurações → PERF) mostra os números do aparelho real.
const perf={ema:16.7,worst:0,clock:0,hold:0,on:false,scale:1};try{perf.on=localStorage.getItem('nitrovenant-perf')==='1'}catch(e){}
function perfShow(){const el=$('perf');if(el)el.style.display=perf.on?'block':'none'}
function perfTick(ms,dt){if(ms>250)return;perf.ema+=(ms-perf.ema)*.06;perf.worst=Math.max(perf.worst,ms);perf.clock+=dt;perf.hold=Math.max(0,perf.hold-dt);if(perf.clock<1.5)return;
 if(!garage&&game.state==='race'){if(perf.ema>21&&perf.scale>.6){perf.scale=Math.max(.6,+(perf.scale-.1).toFixed(2));perf.hold=5;renderer.setScale(perf.scale)}else if(perf.ema<14.5&&perf.scale<1&&!perf.hold){perf.scale=Math.min(1,+(perf.scale+.05).toFixed(2));renderer.setScale(perf.scale)}}
 if(perf.on){const c=renderer.chars,i=c&&c.gl?c.gl.info.render:null;$('perf').textContent=Math.round(1000/perf.ema)+' fps · pior '+Math.round(perf.worst)+' ms · '+(c&&c.live?c.live.length:0)+' zumbis · res '+Math.round(perf.scale*100)+'%'+(i?' · '+i.calls+' draws · '+Math.round(i.triangles/1000)+'k tri':'')}
 perf.clock=0;perf.worst=0}
let last=performance.now(),labelClock=0,saveClock=0,labelHtml='';function frame(now){const ms=now-last;let dt=Math.min(.04,ms/1000);last=now;perfTick(ms,dt);try{game.update(dt)}catch(err){if(!frame.failed){frame.failed=true;console.error('update',err)}}try{motorAudio.update(game);musicTick(dt)}catch(err){if(!frame.semAudio){frame.semAudio=true;console.error('audio',err)}}
 // Separado do áudio de propósito: um erro em musicTick não pode deixar o carro parado na fuga.
 try{outroTick(dt)}catch(err){if(!frame.semOutro){frame.semOutro=true;console.error('outro',err)}}{const tela=garage?"g":"c";if(document.body.dataset.tela!==tela)document.body.dataset.tela=tela;}saveClock+=dt;if(saveClock>=4&&game.state==='race'){saveClock=0;game.checkpoint()}renderer.frame(game,game.state==='paused'?0:dt,garage,viewCar);
 if(!garage){hudText('raceCash','$'+fmt(game.earned+(game.inHell&&game.hellReturn?game.hellReturn.earned||0:0)));hudText('stage',game.inHell?t('hellName'):t('stage')+' '+String(game.level).padStart(2,'0'));hudStyle('healthFill','width',Math.round(1000*game.hp/game.maxHp)/10+'%');hudText('healthText',Math.ceil(game.hp)+' / '+game.maxHp);hudStyle('progressFill','width',Math.round(Math.min(100,100*game.distance/game.end))+'%');hudText('terrain',terrainName());
  hudText('weaponInfo',Math.floor(game.damage)+' DMG · ×'+game.multi+' · '+(game.multi<10?game.multiProgress+'/'+game.multiTarget():'MAX')+' · '+game.missileRange()+'m'+(game.jam>0?' · '+t('jam')+' '+Math.ceil(game.jam)+'s':'')+(game.slow>0?' · '+t('slow'):''));
  hudClass('race','hurt',game.hurtFlash>0&&game.p.fx);hudClass('race','hellfall',game.state==='hellfall');const fuel=Math.floor(game.nitroFuel);hudText('nosText',fuel>=100?t('ready'):fuel+'%');hudClass('nos','ready',fuel>=4);hudClass('nos','burn',game.boosting);hudClass('race','boost',game.boosting&&game.p.fx);hudClass('race','mg',game.firing&&game.p.fx);if(activePointer!==null&&game.state==='race'&&!game.fire&&performance.now()-downAt>200&&Math.hypot(lastX-downX,lastY-downY)<24)game.setFire(true);hudStyle('nos','--fuel',fuel+'%');if(hudCache.nosAria!==fuel){hudCache.nosAria=fuel;$('nos').setAttribute('aria-label','Nitro '+fuel+'%')}hudStyle('nos','animation',game.p.fx?'':'none');
  let hazard=game.hazards.find(h=>h.kind==='hole')||game.hazards.find(h=>h.boss)||game.hazards.find(h=>h.kind!=='holeAhead')||game.hazards[0];hudText('warning',hazard?t(hazard.kind):'');labelClock+=dt;if(labelClock>.06){labelClock=0;const html=renderer.labels.filter(p=>p.y>24&&p.y<renderer.h-120).map(p=>'<span class="label '+(p.bad?'bad ':'')+(p.hp?'hp ':'')+(p.special?'special ':'')+(p.boss?'boss':'')+'" style="left:'+Math.round(p.x)+'px;top:'+Math.round(p.y)+'px;--hp:'+Math.round((p.ratio??1)*100)+'%">'+p.text+'</span>').join('');if(html!==labelHtml){labelHtml=html;$('labels').innerHTML=html}}}
 requestAnimationFrame(frame)}// TRILHA: a faixa sai do CONTEXTO a cada quadro, em vez de ser ligada e desligada em cada evento.
 // Assim ela nunca fica fora de lugar depois de pausar, morrer, reviver, cair no Inferno ou sair da corrida.
 Loja.aoMudar=lojaMudou;Loja.iniciar(NV.IAP);
 Nuvem.aoMudar=nuvemMudou;Nuvem.aoChegar=nuvemChegou;
 // Se o jogador já usa Play Games, o SDK entra sozinho e a cópia chega sem perguntar nada. A
 // leitura é disparada por nuvemMudou, na primeira vez que a conexão aparece: um relógio fixo
 // perderia a corrida num celular lento, e quem liga a conta depois nunca seria atendido.
 Nuvem.iniciar();
 updateGarage();perfShow();requestAnimationFrame(frame);cine('abertura',montaGaragem);
