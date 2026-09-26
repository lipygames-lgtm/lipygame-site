/* ==========================================================================
   LIPY GAMES — idioma automático pelo país
   Carregado no <head> de todas as páginas, antes de tudo (é pequeno de propósito).
   - O site nasce em INGLÊS, na raiz. Essa é a porta de entrada: quem chega de fora e ainda não escolheu
     idioma é levado para o idioma do próprio país. O país vem do IP, informado pela Cloudflare ao servidor
     da Lipy (Supabase, função public.site_pais). País que não está na lista fica em inglês.
   - A escolha manual (bandeira no menu) fica guardada e manda sempre.
   - Páginas com idioma no endereço (/pt/, /es/, …) nunca redirecionam: o link que a pessoa abriu vale.
   - Quem já está navegando pelo site (veio de outra página nossa) também nunca é redirecionado: se chegou
     na raiz por dentro do site, foi porque quis o inglês (mesmo sem armazenamento, em aba nova etc.).
   Quando a raiz decide ficar em inglês, avisa a página com o evento "lipy:idioma" (o vídeo e a abertura
   esperam por ele, para não gastar banda nem a animação numa página que vai ser trocada).
   ========================================================================== */
(function (W, d) {
  'use strict';
  var h = d.documentElement;
  var SUPABASE = 'https://ldpccejvvzqaocyhioju.supabase.co';
  // chave PÚBLICA (a mesma do lipy.js): só consegue chamar as funções public.site_*
  var CHAVE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcGNjZWp2dnpxYW9jeWhpb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjc2ODIsImV4cCI6MjEwNTg0MzY4Mn0.Usf-hgs3rAxIiFCQx7MKW41NZUufOqIsxtFcpbussDo';

  // país (ISO) → idioma do site
  var PAISES = {
    pt: 'BR PT AO MZ CV GW ST TL',
    es: 'ES MX AR CO CL PE VE EC GT CU BO DO HN PY SV NI CR PA UY PR GQ',
    hi: 'IN',
    ja: 'JP',
    ar: 'SA EG AE KW QA BH OM JO LB SY IQ YE PS LY TN DZ MA SD MR DJ KM SO'
  };
  var SUPORTADOS = ['en', 'pt', 'es', 'hi', 'ja', 'ar'];
  var DO_PAIS = {};
  Object.keys(PAISES).forEach(function (l) { PAISES[l].split(' ').forEach(function (p) { DO_PAIS[p] = l; }); });

  var ls = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } }
  };
  var doPais = function (p) { return DO_PAIS[p] || 'en'; };
  var doAparelho = function () {
    var lista = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < lista.length; i++) {
      var l = String(lista[i]).toLowerCase().split('-')[0];
      if (SUPORTADOS.indexOf(l) >= 0) return l;
    }
    return 'en';
  };
  // página atual ("/quiver" e "/quiver.html" são a mesma no GitHub Pages)
  var arquivo = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  arquivo = /^(index|quiver|this-level-hates-you|nitrovenant|privacidade)$/.test(arquivo) ? arquivo + '.html' : 'index.html';

  W.LipyIdioma = {
    doPais: doPais,
    doAparelho: doAparelho,
    arquivo: arquivo,
    // o idioma que esta pessoa quer: escolha manual > país do IP > (nada ainda)
    preferido: function () { var e = ls.get('lipy:idioma'); if (e) return e; var p = ls.get('lipy:pais'); return p ? doPais(p) : null; },
    escolhe: function (l) { ls.set('lipy:idioma', l); }
  };

  if (!h.hasAttribute('data-raiz')) return;
  var dentro = false;
  try { dentro = !!d.referrer && new URL(d.referrer).origin === location.origin; } catch (e) { /* referrer estranho */ }
  if (dentro) return;

  var vai = function (l) {
    if (!l || l === 'en' || SUPORTADOS.indexOf(l) < 0) return false;
    location.replace(l + '/' + arquivo + location.search + location.hash);
    // navegação cancelada (Esc, sem rede): a página não pode ficar invisível
    setTimeout(libera, 3000);
    return true;
  };
  var libera = function () {
    if (!h.classList.contains('is-detectando')) return;
    h.classList.remove('is-detectando');
    try { d.dispatchEvent(new Event('lipy:idioma')); } catch (e) { /* navegador antigo */ }
  };
  var escolhido = ls.get('lipy:idioma');
  if (escolhido) { vai(escolhido); return; }
  var pais = ls.get('lipy:pais');
  if (pais) { vai(doPais(pais)); return; }

  // ainda não sabemos o país: a tela espera no máximo 1 s pela resposta (depois disso, idioma do aparelho)
  h.classList.add('is-detectando');
  var decidido = false;
  var decide = function (l) {
    if (decidido) return;
    decidido = true;
    if (!vai(l)) libera();
  };
  setTimeout(function () { decide(doAparelho()); }, 1000);
  try {
    fetch(SUPABASE + '/rest/v1/rpc/site_pais', {
      method: 'POST',
      headers: { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE, 'Content-Type': 'application/json' },
      body: '{}'
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (p) {
        // guardado mesmo se chegar atrasado: vale para as próximas visitas (e para o aviso de idioma)
        if (typeof p === 'string' && /^[A-Z]{2}$/.test(p)) { ls.set('lipy:pais', p); decide(doPais(p)); }
        else decide(doAparelho());
      })
      .catch(function () { decide(doAparelho()); });
  } catch (e) { decide(doAparelho()); }
})(window, document);
