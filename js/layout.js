/* Silink · header, footer y botón flotante compartidos por todas las páginas.
   Se carga al principio del <body> para que el menú aparezca sin saltos.
   Para cambiar el menú o el footer, editá solo este archivo. */
(function () {
  'use strict';

  var page = document.body.getAttribute('data-page') || 'inicio';

  /* Menú principal: [clave de página, archivo, texto] */
  var NAV = [
    ['empresas', 'empresas.html', 'Empresas'],
    ['comercios', 'comercios.html', 'Comercios'],
    ['hogares', 'hogares.html', 'Hogares'],
    ['edificios', 'edificios.html', 'Edificios y consorcios'],
    ['ayuda', 'ayuda.html', 'Ayuda']
  ];
  var FOOTER_NAV = [['inicio', 'index.html', 'Inicio']].concat(NAV);

  function linkList(items, withCurrent) {
    return items.map(function (it) {
      var current = withCurrent && it[0] === page ? ' aria-current="page"' : '';
      return '<li><a href="' + it[1] + '"' + current + '>' + it[2] + '</a></li>';
    }).join('');
  }

  /* Íconos (sprite). Se usan con <svg class="ico"><use href="#i-..."/></svg> */
  var SPRITE =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><circle cx="12" cy="16.6" r=".6" fill="currentColor"/></symbol>' +
    '<symbol id="i-db" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></symbol>' +
    '<symbol id="i-wifi" viewBox="0 0 24 24"><path d="M4.5 9.5a11 11 0 0 1 15 0"/><path d="M7.5 13a6.7 6.7 0 0 1 9 0"/><path d="M10.4 16.4a2.6 2.6 0 0 1 3.2 0"/><circle cx="12" cy="19.3" r=".8" fill="currentColor"/></symbol>' +
    '<symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></symbol>' +
    '<symbol id="i-server" viewBox="0 0 24 24"><rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/><circle cx="7" cy="7" r=".7" fill="currentColor"/><circle cx="7" cy="17" r=".7" fill="currentColor"/><path d="M11 7h6M11 17h6"/></symbol>' +
    '<symbol id="i-network" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5l-5.3 5.4M12 11.5l5.3 5.4"/></symbol>' +
    '<symbol id="i-pulse" viewBox="0 0 24 24"><path d="M2 12h4l3-8 6 16 3-8h4"/></symbol>' +
    '<symbol id="i-cable" viewBox="0 0 24 24"><path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0V8z"/><path d="M12 18v4"/></symbol>' +
    '<symbol id="i-building" viewBox="0 0 24 24"><path d="M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17"/><path d="M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 7h3M8 11h3M8 15h3"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>' +
    '<symbol id="i-printer" viewBox="0 0 24 24"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></symbol>' +
    '<symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></symbol>' +
    '<symbol id="i-people" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14h1a4.5 4.5 0 0 1 4.5 4.5V20"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>' +
    '<symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.2A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 10.5h7M8.5 13.5h4"/></symbol>' +
    '<symbol id="i-camera" viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></symbol>' +
    '<symbol id="i-store" viewBox="0 0 24 24"><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M9.5 20v-5h5v5"/></symbol>' +
    '<symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></symbol>' +
    '<symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1 1-1.1 1.8"/><circle cx="12" cy="16.6" r=".6" fill="currentColor"/></symbol>' +
    '</defs></svg>';

  var HEADER =
    '<a class="skip-link" href="#contenido">Saltar al contenido</a>' +
    '<header class="header">' +
      '<div class="container header__inner">' +
        '<a class="brand" href="index.html" aria-label="Silink, ir al inicio"><img src="assets/logo-horizontal.png" alt="Silink" width="164" height="36"></a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><span class="nav-toggle__bars" aria-hidden="true"></span></button>' +
        '<nav id="menu" class="nav" aria-label="Principal"><ul>' +
          linkList(NAV, true) +
          '<li class="nav__cta"><a class="btn btn--wa btn--sm" data-wa-contacto href="#contacto">Contacto</a></li>' +
        '</ul></nav>' +
      '</div>' +
    '</header>';

  var FOOTER =
    '<footer id="contacto" class="footer">' +
      '<div class="container footer__inner">' +
        '<div class="footer__brand">' +
          '<a href="index.html"><img src="assets/logo-silink.png" alt="Silink, conectados siempre" width="150" height="118" loading="lazy"></a>' +
          '<p class="footer__about">Internet por fibra, soporte IT y cámaras de seguridad para empresas, comercios, hogares y edificios de Mendoza.</p>' +
        '</div>' +
        '<nav class="footer__nav" aria-label="Páginas del sitio"><p class="footer__h">Páginas</p><ul>' + linkList(FOOTER_NAV, true) + '</ul></nav>' +
        '<div><p class="footer__h">Contacto</p><ul class="footer__list">' +
          '<li><svg class="ico"><use href="#i-chat"/></svg><a data-wa="consulta" data-bind="site.whatsappVisible" href="#contacto"></a></li>' +
          '<li data-internet-li hidden><svg class="ico"><use href="#i-globe"/></svg><span>Internet y cámaras: <a data-wa="consulta" data-wa-tel="internet" data-bind="site.whatsappInternetVisible" href="#contacto"></a></span></li>' +
          '<li data-email><svg class="ico"><use href="#i-mail"/></svg><a href="#"></a></li>' +
          '<li><svg class="ico"><use href="#i-pin"/></svg><span data-bind="site.ubicacion"></span></li>' +
          '<li><svg class="ico"><use href="#i-clock"/></svg><span>Atención: <span data-bind="site.horario"></span></span></li>' +
        '</ul></div>' +
      '</div>' +
      '<p class="footer__legal container">© <span id="year"></span> Silink. Todos los derechos reservados.</p>' +
    '</footer>' +
    '<a class="fab" data-wa-contacto href="#contacto" aria-label="Escribinos por WhatsApp"><svg class="ico" aria-hidden="true"><use href="#i-chat"/></svg></a>';

  document.body.insertAdjacentHTML('afterbegin', SPRITE + HEADER);
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', FOOTER);
  });
})();
