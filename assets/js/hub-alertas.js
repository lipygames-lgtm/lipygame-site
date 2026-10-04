/* ==========================================================================
   LIPY HUB — "Me avise de códigos novos" (servidor/alertas.sql). Só entra na página com o interruptor
   hub/ALERTAS ligado (tools/hub.mjs). Arquivo à parte do hub.js para o desligado não mudar nada no site.
   - cartão do jogo: public.hub_alerta_inscrever (o e-mail de confirmação sai pelo tools/alertas-enviar.cjs);
   - /hub/confirmar/?t=… e /hub/sair/?t=…: a ação só acontece no BOTÃO (robô antivírus abre os links sozinho).
   Frases: t('…') em português; o tools/hub.mjs põe a tradução em window.HUB_TEXTOS.
   ========================================================================== */
(function () {
  'use strict';
  var d = document, W = window, html = d.documentElement;
  var T = W.HUB_TEXTOS || {};
  var t = function (k, v) { var s = T[k] || k; if (v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }); return s; };
  var LANG = html.getAttribute('data-lang') || 'pt';
  var API = html.getAttribute('data-api'), CHAVE = html.getAttribute('data-api-chave');
  var rpc = function (fn, args) {
    if (!API || !W.fetch) return Promise.resolve(null);
    return fetch(API + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE, 'Content-Type': 'application/json' }, body: JSON.stringify(args) })
      .then(function (r) { return r.json().catch(function () { return null; }); }).catch(function () { return null; });
  };
  var EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[a-z]{2,24}$/i;
  var diz = function (el, txt, tipo) { el.textContent = txt; el.setAttribute('data-tipo', tipo || ''); };
  var erroComum = function (r) {
    if (r && r.erro === 'limite') return t('Muitas tentativas desta conexão. Tente de novo daqui a 1 hora.');
    if (r && r.erro === 'ocupado') return t('O servidor está ocupado. Tente de novo em alguns minutos.');
    return t('Não deu certo agora. Confira a sua conexão e tente de novo.');
  };

  /* ---------------- cartão do jogo ---------------- */
  Array.prototype.forEach.call(d.querySelectorAll('form[data-alerta]'), function (f) {
    var msg = f.querySelector('.alerta__msg'), bt = f.querySelector('button[type="submit"]');
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = (f.email.value || '').trim();
      if (!EMAIL.test(email)) { diz(msg, t('Digite um e-mail válido.'), 'erro'); f.email.focus(); return; }
      if (!f.idade.checked) { diz(msg, t('Para receber os alertas, marque "Tenho 13 anos ou mais".'), 'erro'); f.idade.focus(); return; }
      bt.disabled = true;
      diz(msg, t('Enviando…'));
      rpc('hub_alerta_inscrever', { p_email: email, p_jogos: [f.getAttribute('data-alerta')], p_idioma: LANG, p_marketing: !!f.marketing.checked, p_idade_ok: true }).then(function (r) {
        bt.disabled = false;
        if (r && r.ok) {
          diz(msg, t('Quase lá! Abra o seu e-mail e toque no link para confirmar. Sem a confirmação, nada é enviado. Não chegou? Veja a caixa de spam.'), 'ok');
          f.email.value = '';
          return;
        }
        if (r && r.erro === 'email') { diz(msg, t('Digite um e-mail válido.'), 'erro'); return; }
        if (r && r.erro === 'idade') { diz(msg, t('Para receber os alertas, marque "Tenho 13 anos ou mais".'), 'erro'); return; }
        diz(msg, erroComum(r), 'erro');
      });
    });
  });

  /* ---------------- páginas dos links do e-mail ---------------- */
  var pag = d.querySelector('[data-alerta-pagina]');
  if (!pag) return;
  var msg = pag.querySelector('.alerta__msg'), bts = pag.querySelectorAll('[data-acao]');
  var token = (new URLSearchParams(location.search).get('t') || '').toLowerCase();
  var nomes = {};
  try { nomes = JSON.parse(pag.getAttribute('data-nomes') || '{}'); } catch (e) {}
  var trava = function (sim) { Array.prototype.forEach.call(bts, function (b) { b.disabled = sim; }); };
  var invalido = function () { diz(msg, t('Este link não vale mais: já foi usado, venceu ou está incompleto. Peça o alerta de novo na página do jogo.'), 'erro'); };
  if (!/^[0-9a-f]{64}$/.test(token)) { trava(true); invalido(); return; }
  Array.prototype.forEach.call(bts, function (b) {
    b.addEventListener('click', function () {
      var acao = b.getAttribute('data-acao');
      trava(true);
      diz(msg, t('Um momento…'));
      var feito = acao === 'confirmar' ? rpc('hub_alerta_confirmar', { p_token: token })
        : rpc('hub_alerta_sair', { p_token: token, p_so_marketing: acao === 'marketing' });
      feito.then(function (r) {
        if (r && r.ok) {
          // feito: tira o token do endereço (não fica no histórico)
          try { history.replaceState(null, '', location.pathname); } catch (e) {}
          if (acao === 'confirmar') {
            var js = (r.jogos || []).map(function (s) { return nomes[s] || s; }).join(', ');
            diz(msg, t('Pronto! Você vai receber um e-mail quando entrar código novo de: {jogos}.', { jogos: js }), 'ok');
          } else if (acao === 'marketing') {
            diz(msg, t('Pronto: você não recebe mais novidades da Lipy Games. Os alertas de códigos continuam.'), 'ok');
          } else {
            diz(msg, t('Pronto: você saiu de todos os alertas e o seu e-mail foi apagado da lista.'), 'ok');
          }
          return;
        }
        if (r && r.erro === 'token') { invalido(); return; }
        trava(false);
        diz(msg, erroComum(r), 'erro');
      });
    });
  });
})();
