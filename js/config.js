/* ==========================================================================
   SILINK · CONFIGURACIÓN DEL SITIO
   Todo lo que vas a querer cambiar seguido está en este archivo:
   precios de los planes de soporte, teléfonos, correo, horario, textos de
   los planes, mensajes de WhatsApp, zonas de cobertura y datos de la página Ayuda.
   No hace falta tocar los .html ni main.js para ajustar estos datos.
   ========================================================================== */

const SITE = {
  nombre: 'Silink',
  url: 'https://silink.com.ar',

  /* --- Contacto ------------------------------------------------------- */
  // WhatsApp de SOPORTE / EMPRESAS (solo números, con código de país, sin + ni espacios)
  whatsapp: '5492612407449',
  whatsappVisible: '+54 9 261 240-7449', // cómo se muestra en pantalla

  // WhatsApp de INTERNET / HOGARES / CÁMARAS / EDIFICIOS.
  // Por ahora es el mismo número; si lo atiende otra persona, cambialo acá.
  whatsappInternet: '5492612407449',
  whatsappInternetVisible: '+54 9 261 240-7449',

  email: 'contacto@silink.com.ar',    // dejalo vacío ('') para ocultar el correo en todo el sitio
  ubicacion: 'Mendoza, Argentina',
  horario: 'Lunes a viernes de 9 a 18',

  /* --- Datos para Google (JSON-LD) ------------------------------------ */
  zonaDeServicio: 'Mendoza',
  diasAtencion: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  horaApertura: '09:00',
  horaCierre: '18:00',
};

/* --- A qué número va el botón "Contacto" del menú según la página ----------
   'soporte'  → SITE.whatsapp
   'internet' → SITE.whatsappInternet
   ------------------------------------------------------------------------ */
const WHATSAPP_POR_PAGINA = {
  inicio: 'soporte',
  soporte: 'soporte',
  internet: 'internet',
  camaras: 'internet',
  eventos: 'internet',
  ayuda: 'soporte',
  nosotros: 'soporte',
};

/* --- Zonas de cobertura de internet --------------------------------------
   Lista de calles o zonas donde ya llegamos. Vacía = no se muestra nada.
   Cuando la completes aparece sola en las secciones de Cobertura. Ejemplo:
   const ZONAS_COBERTURA = ['Calle San Martín (cuadras 1000 a 1400)', 'Calle Rivadavia'];
   NO cargues acá direcciones de nodos ni del datacenter.
   ------------------------------------------------------------------------ */
const ZONAS_COBERTURA = [];

/* --- Página Ayuda ---------------------------------------------------------
   appCamaras: nombre de la app para ver las cámaras. Vacío = el texto dice
               "la app que te indicamos al instalar".
   formasDePago: lista de medios de pago, por ejemplo ['Transferencia bancaria', 'Efectivo'].
               Vacía = el texto invita a consultar por WhatsApp.
   ------------------------------------------------------------------------ */
const AYUDA = {
  appCamaras: '',
  formasDePago: [],
};

/* --- Fotos de la página Eventos --------------------------------------------
   1) Copiá cada foto en la carpeta assets/eventos/ (JPG o WebP, unos
      1200 px de ancho, para que la página cargue rápido).
   2) Agregala en "fotos" con su ruta y una descripción corta, por ejemplo:
      { src: 'assets/eventos/sunsetstrip.jpg', alt: 'Escenario de Sunsetstrip' }
   Una foto se muestra al lado del nombre; dos o más arman una galería.
   Sin fotos queda solo el nombre del evento.
   Usá solo fotos propias o con permiso. "credito" aparece debajo.
   ------------------------------------------------------------------------ */
const FOTOS_EVENTOS = {
  sunsetstrip:    {
    credito: 'Sunsetstrip',
    fotos: [
      { src: 'assets/eventos/sunsetstrip-escenario.jpg',  alt: 'Escenario de Sunsetstrip de día, con la montaña de fondo' },
      { src: 'assets/eventos/sunsetstrip-potrerillos.jpg', alt: 'Vista aérea del público de Sunsetstrip en Potrerillos, junto al dique' },
      { src: 'assets/eventos/sunsetstrip-noche.jpg',       alt: 'Público de Sunsetstrip de noche, con luces azules' },
      { src: 'assets/eventos/sunsetstrip-cabina.jpg',      alt: 'El público visto desde la cabina del DJ en Sunsetstrip' },
    ],
  },
  primaveraFolck: {
    credito: 'Folck Producciones',
    fotos: [
      { src: 'assets/eventos/primavera-folck-dia.jpg',   alt: 'Escenario de Primavera Folck de día, con público en el parque' },
      { src: 'assets/eventos/primavera-folck-noche.jpg', alt: 'Escenario de Primavera Folck de noche, con pantalla y llamaradas' },
    ],
  },
  moonfest:       {
    credito: 'Folck Producciones',
    fotos: [
      { src: 'assets/eventos/moonfest.jpg', alt: 'Público de Moonfest junto al dique de Potrerillos' },
    ],
  },
  fiestasFolck:   {
    credito: 'Folck Producciones',
    fotos: [
      { src: 'assets/eventos/folck-escenario.jpg', alt: 'Escenario con luces azules y banderas del público en una fiesta Folck' },
      { src: 'assets/eventos/folck-publico.jpg',   alt: 'El público visto desde la cabina del DJ en una fiesta Folck' },
      { src: 'assets/eventos/folck-naranja.jpg',   alt: 'Escenario iluminado en naranja en una fiesta Folck' },
    ],
  },
  terroir:        {
    credito: 'Silink',
    fotos: [
      { src: 'assets/eventos/terroir-vinedo.webp', alt: 'Antena y equipos de conectividad instalados junto a un viñedo' },
    ],
  },
  sub0:           {
    credito: 'sub0',
    fotos: [
      { src: 'assets/eventos/sub0-cartel.jpg', alt: 'Cartel de sub0 en la entrada del evento en Buenos Aires' },
      { src: 'assets/eventos/sub0-charla.jpg', alt: 'Charla en sub0 con pantalla gigante y público' },
    ],
  },
};

/* --- Servicios para Google (JSON-LD) ---------------------------------------
   Se publican como catálogo de servicios del negocio.
   ------------------------------------------------------------------------ */
const SERVICIOS_SEO = [
  { nombre: 'Internet por fibra óptica', descripcion: 'Conexión por fibra para empresas, comercios y hogares en el microcentro de Mendoza, con IP fija para empresas.' },
  { nombre: 'Internet de respaldo', descripcion: 'Segundo enlace que entra en funcionamiento si se corta la conexión principal.' },
  { nombre: 'Obras de fibra óptica', descripcion: 'Tendidos de fibra en edificios, parques y predios privados, y enlaces entre edificios.' },
  { nombre: 'Conexión entre sucursales (VPN)', descripcion: 'Red privada y segura entre oficinas, administrada y monitoreada.' },
  { nombre: 'Internet y WiFi para eventos', descripcion: 'Conectividad WiFi para eventos multitudinarios con monitoreo en vivo.' },
  { nombre: 'Soporte tecnológico y monitoreo', descripcion: 'Cuidamos tus computadoras, impresoras, red y sistemas con abono mensual fijo, remoto y en sitio en todo Mendoza.' },
  { nombre: 'Cámaras de seguridad', descripcion: 'Instalación de cámaras IP con grabación y vista en vivo desde el celular, para empresas, comercios, hogares y espacios comunes de edificios.' },
];

/* --- Textos que se repiten en varias páginas --------------------------------
   Se editan acá y se actualizan en todo el sitio (data-bind="textos.clave").
   ------------------------------------------------------------------------ */
const TEXTOS = {
  // Bajada fija cada vez que se presenta el soporte tecnológico
  bajadaSoporte: 'Cuidamos tus computadoras, impresoras, red y sistemas',
  // Línea "Qué es" de cada servicio
  queEsInternet: 'La conexión que llega a tu casa, local u oficina.',
  queEsSoporte: 'El equipo que cuida la tecnología que tenés adentro: computadoras, impresoras, red, correo y copias de seguridad.',
  queEsCamaras: 'Cámaras que graban y que ves en vivo desde el celular.',
};

/* --- Condiciones comerciales (se usan debajo de los planes y en las preguntas frecuentes) --- */
const CONDICIONES = {
  moneda: 'USD',
  horaAdicional: 25,        // precio de la hora extra
  contratoMinimoMeses: 6,
  avisoCancelacionDias: 30,
  anticipoProyecto: 50,     // % de anticipo en proyectos; el saldo es 100 - anticipo
};

/* --- Planes mensuales de SOPORTE (se muestran en la página Empresas) -------
   destacado: true  → muestra la etiqueta "Más elegido" y resalta la tarjeta.
   incluye: lista de ítems; podés agregar, quitar o reordenar.
   ------------------------------------------------------------------------ */
const PLANES = [
  {
    id: 'base',
    nombre: 'Base',
    precio: 150,
    para: 'Para tener respaldo técnico sin comprometerte a mucho.',
    destacado: false,
    incluye: [
      '8 horas de soporte por mes',
      'Visitas en sitio a demanda',
      'Soporte remoto',
      'Monitoreo básico',
    ],
  },
  {
    id: 'pyme',
    nombre: 'Pyme',
    precio: 270,
    para: 'Para tener soporte constante y control mensual de cómo viene todo.',
    destacado: true,
    incluye: [
      '15 horas de soporte por mes',
      '1 visita mensual en sitio',
      'Todo lo del plan Base',
      'Reporte mensual',
    ],
  },
  {
    id: 'pro',
    nombre: 'Pro',
    precio: 425,
    para: 'Para empresas con sucursales o que no se pueden permitir parar.',
    destacado: false,
    incluye: [
      '25 horas de soporte por mes',
      '2 visitas mensuales en sitio',
      'Todo lo del plan Pyme',
      'Monitoreo de sucursales',
    ],
  },
];

/* --- Mensajes que se precargan en WhatsApp ---------------------------------
   Cada botón del sitio tiene un data-wa="..." que elige uno de estos mensajes.
   Los botones con data-wa-tel="internet" salen al número SITE.whatsappInternet;
   el resto sale a SITE.whatsapp.
   ------------------------------------------------------------------------ */
const MENSAJES_WA = {
  /* Botón "Contacto" del menú (uno por página: 'contacto' + nombre de la página) */
  contacto: 'Hola Silink! Quiero hacer una consulta.',
  contactoInicio: 'Hola Silink! Quiero consultar por sus servicios de soporte tecnológico, internet o cámaras.',
  contactoSoporte: 'Hola Silink! Quiero consultar por soporte tecnológico.',
  contactoInternet: 'Hola Silink! Quiero consultar por internet por fibra.',
  contactoCamaras: 'Hola Silink! Quiero consultar por cámaras de seguridad.',
  contactoEventos: 'Hola Silink! Quiero consultar por internet y WiFi para un evento.',
  contactoAyuda: 'Hola Silink! Necesito ayuda.',
  contactoNosotros: 'Hola Silink! Quiero hacer una consulta.',

  /* Generales */
  consulta: 'Hola Silink! Tengo una consulta sobre sus servicios.',
  diagnostico: 'Hola Silink! Quiero pedir el diagnóstico sin cargo.',

  /* Soporte tecnológico (número de soporte) */
  soporte: 'Hola Silink! Quiero consultar por soporte tecnológico para mi empresa.',
  soporteComercios: 'Hola Silink! Quiero consultar por soporte tecnológico a demanda para mi comercio (computadoras, impresoras y red).',
  proyecto: 'Hola Silink! Quiero cotizar un proyecto (cableado, WiFi, mudanza de oficina, servidores o dominios/correo). Les cuento qué necesito:',
  // Se usa para los botones de cada plan; {plan}, {moneda} y {precio} se reemplazan solos.
  plan: 'Hola Silink! Me interesa el plan {plan} ({moneda} {precio}/mes). ¿Podemos charlar para ver si es el indicado para mi empresa?',

  /* Internet (número de internet) */
  internetGeneral: 'Hola Silink! Quiero consultar por internet por fibra.',
  internetHogares: 'Hola Silink! Quiero consultar disponibilidad y precio de internet por fibra para mi hogar.',
  internetComercios: 'Hola Silink! Quiero consultar disponibilidad y precio de internet por fibra para mi comercio.',
  wifiComercios: 'Hola Silink! Quiero consultar por WiFi para los clientes de mi comercio.',
  internetEmpresas: 'Hola Silink! Quiero consultar disponibilidad y precio de internet para mi empresa (conexión simétrica con IP fija).',
  respaldo: 'Hola Silink! Quiero consultar disponibilidad y precio de un internet de respaldo para mi empresa.',
  sucursales: 'Hola Silink! Quiero consultar por una conexión privada y segura entre mis sucursales.',
  fibra: 'Hola Silink! Quiero consultar por una obra de fibra óptica (tendido en edificio o predio, o enlace entre edificios).',
  eventos: 'Hola Silink! Quiero consultar por internet y WiFi para un evento.',

  /* Cámaras (número de internet) */
  camaras: 'Hola Silink! Quiero consultar por cámaras de seguridad.',
  camarasHogares: 'Hola Silink! Quiero consultar por cámaras de seguridad para mi hogar.',
  camarasComercios: 'Hola Silink! Quiero consultar por cámaras de seguridad para mi comercio.',
  camarasEmpresas: 'Hola Silink! Quiero consultar por cámaras y control de acceso para mi empresa (oficina o depósito).',
  camarasEdificios: 'Hola Silink! Quiero consultar por cámaras y control de acceso para los espacios comunes de un edificio.',

  /* Precio combinado (número de internet) */
  todoEnUno: 'Hola Silink! Quiero consultar por el precio especial de combinar internet, soporte tecnológico y cámaras.',

  /* Formularios. Los {campos} se reemplazan solos con lo que escribe la persona. */
  cobertura: 'Hola, quiero saber si llegan con internet a {direccion}{piso}. Es para {tipo}. Mi nombre es {nombre}.',
  edificio: 'Hola Silink! Soy {nombre}. Quiero fibra en mi edificio: {direccion}{unidades}.',

  consultaEvento: 'Hola Silink! Soy {nombre}. Quiero consultar por internet y WiFi para un evento: {evento}. Lugar: {lugar}.{fecha}{personas}',

  /* Ayuda */
  falla: 'Hola Silink! Quiero reportar una falla.\nNombre o empresa: \nDirección: \nServicio afectado (internet, WiFi, cámaras, computadoras): \nDesde cuándo pasa: \nQué ya probé: ',
  sinInternet: 'Hola Silink! No tengo internet. Ya revisé las luces y reinicié el router, pero sigue sin funcionar.',
  ayudaWifi: 'Hola Silink! Necesito ayuda para cambiar el nombre y la clave del WiFi.',
  ayudaCamaras: 'Hola Silink! Necesito ayuda para ver mis cámaras desde el celular.',
  ayudaPagos: 'Hola Silink! Quiero consultar cómo puedo pagar.',
};
