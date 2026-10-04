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
  document.addEventListener('visibilitychange', function () { if (document.hidden) soltaTudo(); });
})();
