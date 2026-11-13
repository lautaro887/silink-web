/* ==========================================================================
   SILINK · CONFIGURACIÓN DEL SITIO
   Todo lo que vas a querer cambiar seguido está en este archivo:
   precios, teléfono, correo, horario, textos de los planes y mensajes de WhatsApp.
   No hace falta tocar index.html ni main.js para ajustar estos datos.
   ========================================================================== */

const SITE = {
  nombre: 'Silink',
  url: 'https://silink.com.ar',

  /* --- Contacto ------------------------------------------------------- */
  whatsapp: '5492612407449',          // solo números, con código de país (sin + ni espacios)
  whatsappVisible: '+54 9 261 240-7449', // cómo se muestra en pantalla
  // WhatsApp para consultas de internet (tarjetas de Internet, Cobertura y Todo en uno).
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

/* --- Zonas de cobertura de internet --------------------------------------
   Lista de calles o zonas donde ya llegamos. Vacía = no se muestra nada.
   Cuando la completes aparece sola en la sección Cobertura. Ejemplo:
   const ZONAS_COBERTURA = ['Calle San Martín (cuadras 1000 a 1400)', 'Calle Rivadavia'];
   NO cargues acá direcciones de nodos ni del datacenter.
   ------------------------------------------------------------------------ */
const ZONAS_COBERTURA = [];

/* --- Servicios para Google (JSON-LD) ---------------------------------------
   Se publican como catálogo de servicios del negocio.
   ------------------------------------------------------------------------ */
const SERVICIOS_SEO = [
  { nombre: 'Internet empresarial por fibra óptica', descripcion: 'Conexión simétrica con IP fija para empresas en el microcentro de Mendoza.' },
  { nombre: 'Internet de respaldo', descripcion: 'Segundo enlace que entra en funcionamiento si se corta la conexión principal.' },
  { nombre: 'Obras de fibra óptica', descripcion: 'Tendidos de fibra en edificios, parques y predios privados, y enlaces entre edificios.' },
  { nombre: 'Conexión entre sucursales (VPN)', descripcion: 'Red privada y segura entre oficinas, administrada y monitoreada.' },
  { nombre: 'Internet y WiFi para eventos', descripcion: 'Conectividad WiFi para eventos multitudinarios con monitoreo en vivo.' },
  { nombre: 'Soporte y monitoreo IT para pymes', descripcion: 'Soporte a usuarios, servidores, redes y backups con abono mensual fijo.' },
];

/* --- Condiciones comerciales (se usan debajo de los planes y en las preguntas frecuentes) --- */
const CONDICIONES = {
  moneda: 'USD',
  horaAdicional: 25,        // precio de la hora extra
  contratoMinimoMeses: 6,
  avisoCancelacionDias: 30,
  anticipoProyecto: 50,     // % de anticipo en proyectos; el saldo es 100 - anticipo
};

/* --- Planes mensuales ------------------------------------------------------
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
   ------------------------------------------------------------------------ */
const MENSAJES_WA = {
  diagnostico:
    'Hola Silink! Quiero pedir el diagnóstico IT sin cargo para mi empresa.',
  proyecto:
    'Hola Silink! Quiero cotizar un proyecto (cableado, WiFi, mudanza de oficina, servidores o dominios/correo). Les cuento qué necesito:',
  consulta:
    'Hola Silink! Tengo una consulta sobre sus servicios de soporte IT.',
  soporte:
    'Hola Silink! Quiero consultar por soporte IT para mi empresa.',
  /* Internet: estos mensajes salen al número SITE.whatsappInternet */
  internetGeneral:
    'Hola Silink! Quiero consultar por internet para mi empresa.',
  internetEmpresas:
    'Hola Silink! Quiero consultar disponibilidad y precio de internet para mi empresa (conexión simétrica con IP fija).',
  internetHogares:
    'Hola Silink! Quiero consultar disponibilidad y precio de internet por fibra para mi hogar o comercio.',
  fibra:
    'Hola Silink! Quiero consultar por una obra de fibra óptica (tendido en edificio o predio, o enlace entre edificios).',
  respaldo:
    'Hola Silink! Quiero consultar disponibilidad y precio de un internet de respaldo para mi empresa.',
  sucursales:
    'Hola Silink! Quiero consultar por una conexión privada y segura entre mis sucursales.',
  eventos:
    'Hola Silink! Quiero consultar por internet y WiFi para un evento.',
  todoEnUno:
    'Hola Silink! Quiero consultar por el precio especial de internet + soporte IT para mi empresa.',
  // Formulario de cobertura. {direccion}, {piso}, {tipo} y {nombre} se reemplazan solos.
  cobertura:
    'Hola, quiero saber si llegan con internet a {direccion}{piso}. Es para {tipo}. Mi nombre es {nombre}.',

  // Se usa para los botones de cada plan; {plan}, {moneda} y {precio} se reemplazan solos.
  plan:
    'Hola Silink! Me interesa el plan {plan} ({moneda} {precio}/mes). ¿Podemos charlar para ver si es el indicado para mi empresa?',
};
