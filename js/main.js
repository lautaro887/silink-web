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
      .replace('{plan}', plan.nombre)
      .replace('{moneda}', CONDICIONES.moneda)
      .replace('{precio}', plan.precio);
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

      var price = el('p', 'plan__price');
      price.appendChild(el('span', 'plan__currency', CONDICIONES.moneda));
      price.appendChild(el('span', 'plan__amount', String(plan.precio)));
      price.appendChild(el('span', 'plan__period', '/mes'));
      card.appendChild(price);

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
      'condiciones.horaAdicional': CONDICIONES.moneda + ' ' + CONDICIONES.horaAdicional,
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
      'textos.queEsCamaras': TEXTOS.queEsCamaras,
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

  /* ---------- Datos estructurados (Google) ---------- */
  function renderJsonLd() {
    var canonical = $('link[rel="canonical"]');
    var data = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': SITE.url + '/#negocio',
      name: SITE.nombre,
      description: 'Soluciones tecnológicas en Mendoza: internet por fibra óptica en el microcentro, soporte informático en todo Mendoza, cámaras de seguridad y proyectos de redes, con un equipo local que responde.',
      slogan: 'Resolvemos la tecnología de tu empresa, tu comercio o tu hogar',
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
      founder: { '@type': 'Person', name: 'Lautaro Celedón' },
    };
    if (SITE.email) data.email = SITE.email;

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

  /* ---------- Inicio (espera a que layout.js haya insertado el footer) ---------- */
  function init() {
    renderPlanes();
    renderBindings();
    renderWhatsapp();
    renderEmail();
    renderZonas();
    renderPagos();
    initWaForms();
    renderJsonLd();
    initMenu();
    initFloatingButton();
    initFaq();

    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
