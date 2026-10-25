'use strict';
// PROTEÇÃO DE TOQUE (todos os jogos web do site; tools/arcade/montar.mjs injeta como o 1º script).
// Problema real (04/10, iPhone entrando pelo Instagram): segurar o dedo na tela abre a seleção de texto / o menu
// do sistema; o menu "rouba" o fim do toque, o jogo nunca recebe o "soltou" e a ação fica presa (no Nitrovenant,
// a metralhadora disparando sem parar). Duas camadas:
//   1. não deixar o sistema abrir a seleção nem o menu de segurar (CSS com prefixo -webkit- + eventos);
//   2. se mesmo assim o toque for roubado (seleção, menu, janela perdeu o foco, aba escondida), avisar o jogo que
//      cada dedo ainda apertado SOLTOU (pointerup/touchend sintéticos), para nada ficar preso.
// Campos de digitação continuam selecionáveis.
(function () {
  var css = document.createElement('style');
  css.textContent = 'html,body,body *{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent}' +
    'input,textarea,[contenteditable]{-webkit-user-select:text!important;user-select:text!important}canvas{touch-action:none}';
  (document.head || document.documentElement).appendChild(css);
  var campo = function (t) { return t && t.closest && t.closest('input,textarea,[contenteditable]'); };
  document.addEventListener('contextmenu', function (e) { if (!campo(e.target)) e.preventDefault(); }, true);
  document.addEventListener('selectstart', function (e) { if (!campo(e.target)) e.preventDefault(); }, true);
  document.addEventListener('dragstart', function (e) { e.preventDefault(); }, true);

  // dedos/cliques apertados agora: id → { alvo, x, y, tipo }
  var vivos = {};
  document.addEventListener('pointerdown', function (e) { vivos[e.pointerId] = { alvo: e.target, x: e.clientX, y: e.clientY, tipo: e.pointerType, id: e.pointerId }; }, true);
  var some = function (e) { delete vivos[e.pointerId]; };
  document.addEventListener('pointerup', some, true);
  document.addEventListener('pointercancel', some, true);
  function soltaTudo() {
    for (var k in vivos) {
      var p = vivos[k]; delete vivos[k];
      try { p.alvo.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerId: p.id, pointerType: p.tipo, clientX: p.x, clientY: p.y })); } catch (e) {}
      try { p.alvo.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: p.id, pointerType: p.tipo, clientX: p.x, clientY: p.y })); } catch (e) {}
      try { p.alvo.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: p.x, clientY: p.y })); } catch (e) {}
    }
  }
  document.addEventListener('selectionchange', function () {
    var s = document.getSelection && document.getSelection();
    if (s && s.rangeCount && !campo(s.anchorNode && s.anchorNode.parentElement)) { try { s.removeAllRanges(); } catch (e) {} soltaTudo(); }
  });
  addEventListener('blur', soltaTudo);

  // DIAGNÓSTICO: o 1º erro de JavaScript do jogo vai para a página do site (métricas privadas: coluna "erro").
  // Serve para descobrir por que o jogo não carrega em algum navegador (ex.: WebGL indisponível no app do Instagram).
  var avisouErro = false;
  function relataErro(msg) {
    if (avisouErro) return; avisouErro = true;
    try { parent.postMessage({ lipy: 'erro', msg: String(msg || 'erro').slice(0, 160) }, location.origin); } catch (e) {}
  }
  addEventListener('error', function (e) { relataErro((e.message || (e.target && e.target.src ? 'falhou ao baixar ' + String(e.target.src).split('/').pop() : 'erro')) + (e.lineno ? ' @' + e.lineno : '')); }, true);
  addEventListener('unhandledrejection', function (e) { relataErro('promessa: ' + (e.reason && (e.reason.message || e.reason))); });
  // sem WebGL o jogo 3D não abre: avisa já no começo
  try { var c = document.createElement('canvas'); if (!(c.getContext('webgl2') || c.getContext('webgl'))) relataErro('sem WebGL neste navegador'); } catch (e) {}
  document.addEventListener('visibilitychange', function () { if (document.hidden) soltaTudo(); });
})();
