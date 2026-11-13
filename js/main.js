/* Silink · lógica del sitio. Los datos editables están en config.js */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Helpers ---------- */
  function waLink(texto, numero) {
    return 'https://wa.me/' + (numero || SITE.whatsapp) + '?text=' + encodeURIComponent(texto);
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

  /* ---------- Planes (se arman desde config.js) ---------- */
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
      btn.target = '_blank';
      btn.rel = 'noopener';
      card.appendChild(btn);

      grid.appendChild(card);
    });
  }

  /* ---------- Textos con datos de config (data-bind="ruta") ---------- */
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
    };
    $$('[data-bind]').forEach(function (node) {
      var key = node.getAttribute('data-bind');
      if (values[key] !== undefined) node.textContent = values[key];
    });
  }

  /* ---------- Enlaces de WhatsApp (data-wa="clave"; data-wa-tel="internet" usa el número de internet) ---------- */
  function renderWhatsapp() {
    $$('[data-wa]').forEach(function (a) {
      var msg = MENSAJES_WA[a.getAttribute('data-wa')] || MENSAJES_WA.consulta;
      var numero = a.getAttribute('data-wa-tel') === 'internet' ? SITE.whatsappInternet : SITE.whatsapp;
      a.href = waLink(msg, numero);
      a.target = '_blank';
      a.rel = 'noopener';
    });
    // El número de internet solo se muestra en el footer si es distinto del principal
    var extra = $('[data-internet-li]');
    if (extra) extra.hidden = SITE.whatsappInternet === SITE.whatsapp;
  }

  /* ---------- Cobertura: lista de zonas (config) y formulario que abre WhatsApp ---------- */
  function renderZonas() {
    var box = $('#zonas');
    var list = $('#zonas-lista');
    if (!box || !list || !ZONAS_COBERTURA.length) return;
    ZONAS_COBERTURA.forEach(function (zona) { list.appendChild(el('li', '', zona)); });
    box.hidden = false;
  }

  function initCoverageForm() {
    var form = $('#cobertura-form');
    if (!form) return;
    var error = $('#cob-error');
    var status = $('#cob-status');

    function showError(msg, field) {
      error.textContent = msg;
      error.hidden = false;
      if (field) field.focus();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.elements.nombre;
      var direccion = form.elements.direccion;
      var tipo = form.elements.tipo;
      error.hidden = true;
      status.hidden = true;

      if (!nombre.value.trim()) return showError('Escribí tu nombre.', nombre);
      if (!direccion.value.trim() || !/\d/.test(direccion.value)) {
        return showError('Escribí la calle y la altura, por ejemplo: San Martín 1234.', direccion);
      }
      if (!tipo.value) return showError('Elegí si es para una empresa, un comercio o un hogar.', tipo);

      var piso = form.elements.piso.value.trim();
      var msg = MENSAJES_WA.cobertura
        .replace('{direccion}', direccion.value.trim())
        .replace('{piso}', piso ? ', piso/oficina ' + piso : '')
        .replace('{tipo}', tipo.value)
        .replace('{nombre}', nombre.value.trim());
      var url = waLink(msg, SITE.whatsappInternet);

      var win = window.open(url, '_blank', 'noopener');
      status.textContent = '';
      status.appendChild(document.createTextNode(win ? 'Se abrió WhatsApp con tu consulta. ' : 'No pudimos abrir WhatsApp automáticamente. '));
      var link = el('a', '', 'Tocá acá si no se abrió');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      status.appendChild(link);
      status.hidden = false;
    });
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
    var data = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': SITE.url + '/#negocio',
      name: SITE.nombre,
      description: 'Internet por fibra óptica en el microcentro de Mendoza y soporte y monitoreo IT para pymes con abono mensual fijo: conexión, red interna, servidores, backups y WiFi con un solo responsable.',
      slogan: 'Internet, red y soporte para tu empresa, con un solo responsable',
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
      url: SITE.url + '/',
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

  /* ---------- Botón flotante: aparece al pasar el hero y se esconde en el llamado final ---------- */
  function initFloatingButton() {
    var fab = $('.fab');
    var hero = $('#inicio');
    var cta = $('#diagnostico');
    var footer = $('.footer');
    if (!fab || !hero || !('IntersectionObserver' in window)) {
      if (fab) fab.classList.add('is-visible');
      return;
    }
    var hidden = new Set([hero]); // secciones que esconden el botón mientras se ven
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
  }

  /* ---------- FAQ: cerrar las otras al abrir una (opcional, mejora la lectura en mobile) ---------- */
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

  /* ---------- Inicio ---------- */
  renderPlanes();
  renderBindings();
  renderWhatsapp();
  renderEmail();
  renderZonas();
  initCoverageForm();
  renderJsonLd();
  initMenu();
  initFloatingButton();
  initFaq();

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
