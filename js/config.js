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
  empresas: 'soporte',
  comercios: 'internet',
  hogares: 'internet',
  edificios: 'internet',
  ayuda: 'soporte',
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

/* --- Servicios para Google (JSON-LD) ---------------------------------------
   Se publican como catálogo de servicios del negocio.
   ------------------------------------------------------------------------ */
const SERVICIOS_SEO = [
  { nombre: 'Internet por fibra óptica', descripcion: 'Conexión por fibra para empresas, comercios y hogares en el microcentro de Mendoza, con IP fija para empresas.' },
  { nombre: 'Internet de respaldo', descripcion: 'Segundo enlace que entra en funcionamiento si se corta la conexión principal.' },
  { nombre: 'Obras de fibra óptica', descripcion: 'Tendidos de fibra en edificios, parques y predios privados, y enlaces entre edificios.' },
  { nombre: 'Conexión entre sucursales (VPN)', descripcion: 'Red privada y segura entre oficinas, administrada y monitoreada.' },
  { nombre: 'Internet y WiFi para eventos', descripcion: 'Conectividad WiFi para eventos multitudinarios con monitoreo en vivo.' },
  { nombre: 'Soporte y monitoreo IT para pymes', descripcion: 'Soporte a usuarios, servidores, redes y backups con abono mensual fijo.' },
  { nombre: 'Cámaras de seguridad', descripcion: 'Instalación de cámaras IP con grabación y vista en vivo desde el celular, para empresas, comercios, hogares y espacios comunes de edificios.' },
];

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
  /* Botón "Contacto" del menú (uno por página) */
  contacto: 'Hola Silink! Quiero hacer una consulta.',
  contactoInicio: 'Hola Silink! Quiero consultar por sus servicios de internet, soporte IT o cámaras.',
  contactoEmpresas: 'Hola Silink! Quiero consultar por internet, soporte IT o cámaras para mi empresa.',
  contactoComercios: 'Hola Silink! Quiero consultar por internet, WiFi o cámaras para mi comercio.',
  contactoHogares: 'Hola Silink! Quiero consultar por internet por fibra para mi hogar.',
  contactoEdificios: 'Hola Silink! Quiero consultar por fibra óptica para un edificio o consorcio.',
  contactoAyuda: 'Hola Silink! Necesito ayuda.',

  /* Generales */
  consulta: 'Hola Silink! Tengo una consulta sobre sus servicios.',
  diagnostico: 'Hola Silink! Quiero pedir el diagnóstico IT sin cargo.',
  todoEnUno: 'Hola Silink! Quiero consultar por el precio especial de internet + soporte IT + cámaras.',

  /* Empresas */
  diagnosticoEmpresas: 'Hola Silink! Quiero pedir el diagnóstico IT sin cargo para mi empresa.',
  internetEmpresas: 'Hola Silink! Quiero consultar disponibilidad y precio de internet para mi empresa (conexión simétrica con IP fija).',
  respaldo: 'Hola Silink! Quiero consultar disponibilidad y precio de un internet de respaldo para mi empresa.',
  sucursales: 'Hola Silink! Quiero consultar por una conexión privada y segura entre mis sucursales.',
  soporte: 'Hola Silink! Quiero consultar por soporte IT para mi empresa.',
  camarasEmpresas: 'Hola Silink! Quiero consultar por cámaras y control de acceso para mi empresa (oficina o depósito).',
  paquetesEmpresas: 'Hola Silink! Quiero consultar por el precio especial de internet + soporte IT para mi empresa.',
  proyecto: 'Hola Silink! Quiero cotizar un proyecto (cableado, WiFi, mudanza de oficina, servidores o dominios/correo). Les cuento qué necesito:',
  fibra: 'Hola Silink! Quiero consultar por una obra de fibra óptica (tendido en edificio o predio, o enlace entre edificios).',
  eventos: 'Hola Silink! Quiero consultar por internet y WiFi para un evento.',
  // Se usa para los botones de cada plan; {plan}, {moneda} y {precio} se reemplazan solos.
  plan: 'Hola Silink! Me interesa el plan {plan} ({moneda} {precio}/mes). ¿Podemos charlar para ver si es el indicado para mi empresa?',

  /* Comercios */
  diagnosticoComercios: 'Hola Silink! Quiero pedir el diagnóstico sin cargo para mi comercio.',
  internetComercios: 'Hola Silink! Quiero consultar disponibilidad y precio de internet por fibra para mi comercio.',
  wifiComercios: 'Hola Silink! Quiero consultar por WiFi para los clientes de mi comercio.',
  camarasComercios: 'Hola Silink! Quiero consultar por cámaras de seguridad para mi comercio.',
  soporteComercios: 'Hola Silink! Quiero consultar por soporte a demanda para mi comercio (computadoras, impresoras y red).',
  paqueteComercio: 'Hola Silink! Quiero consultar por el precio especial del paquete Comercio Conectado.',

  /* Hogares */
  internetHogares: 'Hola Silink! Quiero consultar disponibilidad y precio de internet por fibra para mi hogar.',
  wifiHogares: 'Hola Silink! Quiero consultar por WiFi que llegue a toda mi casa.',
  camarasHogares: 'Hola Silink! Quiero consultar por cámaras de seguridad para mi hogar.',

  /* Formularios. Los {campos} se reemplazan solos con lo que escribe la persona. */
  cobertura: 'Hola, quiero saber si llegan con internet a {direccion}{piso}. Es para {tipo}. Mi nombre es {nombre}.',
  edificio: 'Hola Silink! Soy {nombre}. Quiero fibra en mi edificio: {direccion}{unidades}.',

  /* Ayuda */
  falla: 'Hola Silink! Quiero reportar una falla.\nNombre o empresa: \nDirección: \nServicio afectado (internet, WiFi, cámaras, computadoras): \nDesde cuándo pasa: \nQué ya probé: ',
  sinInternet: 'Hola Silink! No tengo internet. Ya revisé las luces y reinicié el router, pero sigue sin funcionar.',
  ayudaWifi: 'Hola Silink! Necesito ayuda para cambiar el nombre y la clave del WiFi.',
  ayudaCamaras: 'Hola Silink! Necesito ayuda para ver mis cámaras desde el celular.',
  ayudaPagos: 'Hola Silink! Quiero consultar cómo puedo pagar.',
};
