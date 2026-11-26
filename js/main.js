/* Silink · lógica del sitio. Los datos editables están en config.js
   y el header/footer compartidos en layout.js */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var pageKey = document.body.getAttribute('data-page') || 'inicio';

  /* ---------- Helpers ---------- */
  function waLink(texto, numero) {
    return 'https://wa.me/' + (numero || SITE.whatsapp) + '?text=' + encodeURIComponent(texto);
  }

  function numeroPara(tel) {
    return tel === 'internet' ? SITE.whatsappInternet : SITE.whatsapp;
  }

  function planMessage(plan) {
    return MENSAJES_WA.plan
      .replace('{plan}', plan.nombre);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function openLink(a) {
    a.target = '_blank';
    a.rel = 'noopener';
  }

  /* ---------- Planes de soporte (se arman desde config.js; solo en la página Empresas) ---------- */
  function renderPlanes() {
    var grid = $('#planes-grid');
    if (!grid) return;
    grid.textContent = '';

    PLANES.forEach(function (plan) {
      var card = el('article', 'plan' + (plan.destacado ? ' plan--featured' : ''));
      card.setAttribute('aria-labelledby', 'plan-' + plan.id);

      if (plan.destacado) card.appendChild(el('p', 'plan__badge', 'Más elegido'));

      var title = el('h3', 'plan__name', plan.nombre);
      title.id = 'plan-' + plan.id;
      card.appendChild(title);
      card.appendChild(el('p', 'plan__for', plan.para));

      var list = el('ul', 'plan__list');
      plan.incluye.forEach(function (item) {
        list.appendChild(el('li', '', item));
      });
      card.appendChild(list);

      var btn = el('a', 'btn ' + (plan.destacado ? 'btn--wa' : 'btn--outline') + ' btn--block', 'Quiero el plan ' + plan.nombre);
      btn.href = waLink(planMessage(plan));
      openLink(btn);
      card.appendChild(btn);

      grid.appendChild(card);
    });
  }

  /* ---------- Textos con datos de config (data-bind="ruta"). Si el valor está vacío se deja el texto del HTML ---------- */
  function renderBindings() {
    var values = {
      'condiciones.contratoMinimoMeses': String(CONDICIONES.contratoMinimoMeses),
      'condiciones.avisoCancelacionDias': String(CONDICIONES.avisoCancelacionDias),
      'condiciones.anticipo': CONDICIONES.anticipoProyecto + '%',
      'condiciones.saldo': (100 - CONDICIONES.anticipoProyecto) + '%',
      'site.horario': SITE.horario,
      'site.ubicacion': SITE.ubicacion,
      'site.whatsappVisible': SITE.whatsappVisible,
      'site.whatsappInternetVisible': SITE.whatsappInternetVisible,
      'site.email': SITE.email,
      'ayuda.appCamaras': AYUDA.appCamaras,
      'textos.bajadaSoporte': TEXTOS.bajadaSoporte,
      'textos.queEsInternet': TEXTOS.queEsInternet,
      'textos.queEsSoporte': TEXTOS.queEsSoporte,
    };
    $$('[data-bind]').forEach(function (node) {
      var value = values[node.getAttribute('data-bind')];
      if (value) node.textContent = value;
    });
  }

  /* ---------- Enlaces de WhatsApp ----------
     data-wa="clave"            → mensaje de MENSAJES_WA
     data-wa-tel="internet"     → usa SITE.whatsappInternet (si no, SITE.whatsapp)
     data-wa-contacto           → botón "Contacto": mensaje y número según la página */
  function renderWhatsapp() {
    $$('[data-wa]').forEach(function (a) {
      var msg = MENSAJES_WA[a.getAttribute('data-wa')] || MENSAJES_WA.consulta;
      a.href = waLink(msg, numeroPara(a.getAttribute('data-wa-tel')));
      openLink(a);
    });

    var contactoKey = 'contacto' + pageKey.charAt(0).toUpperCase() + pageKey.slice(1);
    $$('[data-wa-contacto]').forEach(function (a) {
      a.href = waLink(MENSAJES_WA[contactoKey] || MENSAJES_WA.contacto, numeroPara(WHATSAPP_POR_PAGINA[pageKey]));
      openLink(a);
    });

    // El número de internet solo se muestra en el footer si es distinto del principal
    var extra = $('[data-internet-li]');
    if (extra) extra.hidden = SITE.whatsappInternet === SITE.whatsapp;
  }

  /* ---------- Cobertura: lista de zonas (config) ---------- */
  function renderZonas() {
    if (!ZONAS_COBERTURA.length) return;
    $$('.zones').forEach(function (box) {
      var list = $('ul', box);
      if (!list) return;
      ZONAS_COBERTURA.forEach(function (zona) { list.appendChild(el('li', '', zona)); });
      box.hidden = false;
    });
  }

  /* ---------- Formularios que arman un mensaje y abren WhatsApp ----------
     <form data-wa-form="clave" data-wa-tel="internet">
     Cada campo con name se reemplaza en la plantilla como {nombre-del-campo}.
     Atributos opcionales por campo: data-error (mensaje si falta), data-needs-number
     (exige un número, ej. altura), data-prefix / data-suffix (texto que se agrega
     solo si el campo no está vacío). */
  function initWaForms() {
    $$('form[data-wa-form]').forEach(function (form) {
      var template = MENSAJES_WA[form.getAttribute('data-wa-form')];
      var numero = numeroPara(form.getAttribute('data-wa-tel'));
      var error = $('.form__error', form);
      var status = $('.form__status', form);
      if (!template) return;

      function showError(msg, field) {
        error.textContent = msg;
        error.hidden = false;
        field.focus();
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        error.hidden = true;
        status.hidden = true;

        var fields = Array.prototype.slice.call(form.elements).filter(function (f) { return f.name; });
        for (var i = 0; i < fields.length; i++) {
          var f = fields[i];
          var value = f.value.trim();
          if (f.required && !value) return showError(f.getAttribute('data-error') || 'Completá este campo.', f);
          if (value && f.hasAttribute('data-needs-number') && !/\d/.test(value)) {
            return showError(f.getAttribute('data-error') || 'Completá este campo.', f);
          }
        }

        var msg = template;
        fields.forEach(function (f) {
          var value = f.value.trim();
          var text = value ? (f.getAttribute('data-prefix') || '') + value + (f.getAttribute('data-suffix') || '') : '';
          msg = msg.split('{' + f.name + '}').join(text);
        });
        var url = waLink(msg, numero);

        var win = window.open(url, '_blank', 'noopener');
        status.textContent = '';
        status.appendChild(document.createTextNode(win ? 'Se abrió WhatsApp con tu consulta. ' : 'No pudimos abrir WhatsApp automáticamente. '));
        var link = el('a', '', 'Tocá acá si no se abrió');
        link.href = url;
        openLink(link);
        status.appendChild(link);
        status.hidden = false;
      });
    });
  }

  /* ---------- Eventos: fotos del cartel (config) ---------- */
  function renderFotosEventos() {
    if (typeof FOTOS_EVENTOS === 'undefined') return;
    $$('[data-foto]').forEach(function (item) {
      var dato = FOTOS_EVENTOS[item.getAttribute('data-foto')];
      if (!dato || !dato.fotos || !dato.fotos.length) return;
      var nombre = $('h3', item) ? $('h3', item).textContent : '';
      var galeria = dato.fotos.length > 1;
      var caja = el('div', galeria ? 'lineup__gallery' : 'lineup__photo');

      dato.fotos.forEach(function (foto) {
        var figura = el('figure');
        var img = el('img');
        img.alt = foto.alt || 'Foto del evento ' + nombre;
        img.loading = 'lazy';
        // Con las medidas declaradas la página reserva el lugar y no salta al cargar
        if (foto.ancho && foto.alto) {
          img.width = foto.ancho;
          img.height = foto.alto;
          figura.style.setProperty('--r', (foto.ancho / foto.alto).toFixed(3));
        }
        // En la galería cada foto ocupa según su proporción: todas quedan a la misma altura sin recortes
        img.onload = function () { figura.style.setProperty('--r', (img.naturalWidth / img.naturalHeight).toFixed(3)); };
        // Si la ruta está mal escrita, esa foto no se muestra
        img.onerror = function () {
          figura.remove();
          if (!$('img', caja)) { caja.remove(); item.classList.remove('has-photo', 'has-gallery'); }
        };
        img.src = foto.src || foto;
        figura.appendChild(img);
        caja.appendChild(figura);
      });

      if (dato.credito) caja.appendChild(el('p', 'lineup__credit', 'Fotos: ' + dato.credito));
      item.appendChild(caja);
      item.classList.add(galeria ? 'has-gallery' : 'has-photo');
    });
  }

  /* ---------- Ayuda: formas de pago (config) ---------- */
  function renderPagos() {
    var list = $('#pagos-lista');
    var fallback = $('#pagos-vacio');
    if (!list || !AYUDA.formasDePago.length) return;
    AYUDA.formasDePago.forEach(function (forma) { list.appendChild(el('li', '', forma)); });
    list.hidden = false;
    if (fallback) fallback.hidden = true;
  }

  /* ---------- Correo ---------- */
  function renderEmail() {
    $$('[data-email]').forEach(function (node) {
      if (!SITE.email) { node.hidden = true; return; }
      var link = $('a', node) || node;
      link.href = 'mailto:' + SITE.email;
      link.textContent = SITE.email;
    });
  }

  /* ---------- Instagram (config) ---------- */
  function renderInstagram() {
    var item = $('[data-instagram]');
    if (!item || !SITE.instagram) return;
    var link = $('a', item);
    link.href = SITE.instagram;
    link.textContent = 'Instagram ' + (SITE.instagramUsuario || '');
    item.hidden = false;
  }

  /* ---------- Datos estructurados (Google) ---------- */
  function renderJsonLd() {
    var canonical = $('link[rel="canonical"]');
    var data = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': SITE.url + '/#negocio',
      name: SITE.nombre,
      description: 'Empresa de soluciones tecnológicas de Mendoza: soporte informático y tecnológico, internet por fibra óptica en el microcentro, cámaras de seguridad e internet y WiFi para eventos.',
      slogan: 'Soluciones tecnológicas en Mendoza. Todo centralizado.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Silink',
        itemListElement: SERVICIOS_SEO.map(function (s) {
          return {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.nombre, description: s.descripcion, areaServed: SITE.zonaDeServicio },
          };
        }),
      },
      url: canonical ? canonical.href : SITE.url + '/',
      image: SITE.url + '/assets/og-image.png',
      logo: SITE.url + '/assets/logo-silink.png',
      telephone: '+' + SITE.whatsapp,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.direccion,
        postalCode: SITE.codigoPostal,
        addressLocality: SITE.zonaDeServicio,
        addressRegion: SITE.zonaDeServicio,
        addressCountry: 'AR',
      },
      areaServed: { '@type': 'AdministrativeArea', name: SITE.zonaDeServicio + ', Argentina' },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SITE.diasAtencion,
        opens: SITE.horaApertura,
        closes: SITE.horaCierre,
      }],
    };
    if (SITE.email) data.email = SITE.email;
    if (SITE.instagram) data.sameAs = [SITE.instagram];

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ---------- Menú mobile ---------- */
  function initMenu() {
    var toggle = $('.nav-toggle');
    var nav = $('#menu');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Botón flotante: aparece al pasar el hero y se esconde en el llamado final y el footer ---------- */
  function initFloatingButton() {
    var fab = $('.fab');
    var hero = $('.hero');
    var cta = $('.cta');
    var footer = $('.footer');
    if (!fab || !('IntersectionObserver' in window)) {
      if (fab) fab.classList.add('is-visible');
      return;
    }
    var hidden = new Set(hero ? [hero] : []); // secciones que esconden el botón mientras se ven
    function update() {
      fab.classList.toggle('is-visible', hidden.size === 0);
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) hidden.add(e.target); else hidden.delete(e.target);
      });
      update();
    });
    [hero, cta, footer].forEach(function (node) { if (node) obs.observe(node); });
    update();
  }

  /* ---------- FAQ: cerrar las otras del mismo grupo al abrir una ---------- */
  function initFaq() {
    $$('.faq').forEach(function (group) {
      var items = $$('details', group);
      items.forEach(function (d) {
        d.addEventListener('toggle', function () {
          if (!d.open) return;
          items.forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });
  }

  /* ---------- Ilustraciones animadas (.art-anim): arrancan cuando entran en pantalla ---------- */
  function initHeroArt() {
    $$('.art-anim').forEach(function (art) {
      if (!('IntersectionObserver' in window)) { art.classList.add('is-play'); return; }
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { art.classList.add('is-play'); obs.disconnect(); }
        });
      }, { threshold: 0.5 });
      obs.observe(art);
    });
  }
  /* ---------- Movimiento al desplazarse (solo Inicio) ----------
     Cada bloque se comporta distinto: entra desde un lado, escalonado, se escribe con el scroll,
     se dibuja o se abre. Todo con transform, opacity y clip-path. Con "reducir movimiento" o sin
     IntersectionObserver no se hace nada y la página queda en su estado final. */
  function initScrollFx() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var items = $$('[data-fx], [data-fx-stagger] > *');
    var scrubs = $$('[data-scrub], [data-parallax], [data-words]');
    if (!items.length && !scrubs.length) return;
    document.documentElement.classList.add('fx');

    /* Entradas */
    $$('[data-fx-stagger]').forEach(function (box) {
      var side = box.getAttribute('data-fx-stagger') === 'side';
      Array.prototype.forEach.call(box.children, function (el, i) {
        el.setAttribute('data-fx', side ? (i % 2 ? 'right' : 'left') : 'up');
        el.style.setProperty('--d', (i * 90) + 'ms');
      });
    });
    var pending = [];
    function reveal(el) {
      if (el.classList.contains('is-in')) return;
      el.classList.add('is-in');
      io.unobserve(el);
      pending = pending.filter(function (p) { return p !== el; });
      var delay = parseFloat((el.style.getPropertyValue('--d') || '0')) || 0;
      // Terminada la entrada se quita el atributo: el hover vuelve a ser inmediato
      setTimeout(function () { el.removeAttribute('data-fx'); el.classList.remove('is-in'); }, 750 + delay);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) reveal(e.target); });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    $$('[data-fx]').forEach(function (el) { pending.push(el); io.observe(el); });

    /* Texto que se "escribe": cada palabra pasa de apagada a tinta según el scroll */
    function wrapWords(node, list) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.nodeValue.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = part;
            list.push(s); frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) wrapWords(n, list);
      });
    }
    var state = scrubs.map(function (el) {
      var s = { el: el, kind: el.hasAttribute('data-words') ? 'words' : el.hasAttribute('data-parallax') ? 'parallax' : 'scrub', last: -1, words: [] };
      if (s.kind === 'words') wrapWords(el, s.words);
      return s;
    });

    var ticking = false;
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      // Lo que quedó arriba por un salto (ancla, tecla Fin, scroll rápido) se muestra de inmediato
      pending.slice().forEach(function (el) { if (el.getBoundingClientRect().bottom < 0) reveal(el); });
      state.forEach(function (s) {
        var r = s.el.getBoundingClientRect(), p;
        if (s.kind === 'parallax') p = clamp(-r.top / Math.max(r.height, 1));
        else if (s.kind === 'words') p = clamp((vh * 0.9 - r.top) / (vh * 0.5 + r.height * 0.5));
        else p = clamp((vh * 0.92 - r.top) / (vh * 0.5));
        if (s.kind === 'words') {
          var n = Math.round(p * s.words.length);
          if (n !== s.last) { s.words.forEach(function (w, i) { w.classList.toggle('on', i < n); }); s.last = n; }
        } else {
          var v = Math.round(p * 500) / 500;
          if (v !== s.last) { s.el.style.setProperty('--p', v); s.last = v; }
        }
      });
    }
    function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------- Inicio (espera a que layout.js haya insertado el footer) ---------- */
  function init() {
    renderPlanes();
    renderBindings();
    renderWhatsapp();
    renderEmail();
    renderInstagram();
    renderZonas();
    renderPagos();
    renderFotosEventos();
    initWaForms();
    renderJsonLd();
    initMenu();
    initFloatingButton();
    initFaq();
    initHeroArt();
    initScrollFx(); // al final: los planes y el resto ya están en el DOM

    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
