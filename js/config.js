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
  email: 'contacto@silink.com.ar',    // dejalo vacío ('') para ocultar el correo en todo el sitio
  ubicacion: 'Mendoza, Argentina',
  horario: 'Lunes a viernes de 9 a 18',

  /* --- Datos para Google (JSON-LD) ------------------------------------ */
  zonaDeServicio: 'Mendoza',
  diasAtencion: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  horaApertura: '09:00',
  horaCierre: '18:00',
};

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
  // Se usa para los botones de cada plan; {plan}, {moneda} y {precio} se reemplazan solos.
  plan:
    'Hola Silink! Me interesa el plan {plan} ({moneda} {precio}/mes). ¿Podemos charlar para ver si es el indicado para mi empresa?',
};
