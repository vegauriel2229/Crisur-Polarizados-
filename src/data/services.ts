export type ServiceId = 'negocios' | 'autos' | 'hogares';
export type Treatment = 'polarizado' | 'espejado' | 'esmerilado' | 'seguridad';
export type BenefitKind = 'heat' | 'privacy' | 'uv' | 'security';

export interface Benefit {
  kind: BenefitKind;
  /** Primeras palabras en negrita: se leen de un vistazo. */
  title: string;
  text: string;
}

/**
 * Un capítulo de la escena 3D de la página del servicio. Las escenas están coreografiadas
 * para exactamente STORY_CHAPTER_COUNT capítulos, en este orden de significado:
 * 0 portada · 1 vidrio original · 2 colocación · 3 y 4 beneficios · 5 cierre con CTA.
 */
export interface StoryChapter {
  /** Ancla de la URL (/autos#privacidad) y clave del índice lateral. */
  id: string;
  /** Texto corto del índice lateral. */
  indexLabel: string;
  title: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  id: ServiceId;
  navLabel: string;
  /** h1 en dos líneas: `titlePrefix` + `title` (display gigante). */
  hero: { titlePrefix: string; title: string; lede: string };
  /** <title> y meta description de la página /{id}. */
  page: { title: string; description: string };
  treatments: readonly Treatment[];
  benefits: readonly Benefit[];
  /** Capítulos 1 a 4 de la escena (la portada usa `hero` y el cierre usa `closing`). */
  story: readonly StoryChapter[];
  closing: { title: string; text: string };
  faq: readonly FaqItem[];
  whatsappMessage: string;
  ctaLabel: string;
  // Las fotos de trabajos no van acá: se cargan solas desde src/assets/gallery/<id>/ (ver data/gallery.ts).
}

/** Capítulos intermedios por servicio (vidrio original, colocación y dos beneficios). */
export const STORY_CHAPTER_COUNT = 4;

export const TREATMENT_LABEL: Record<Treatment, string> = {
  polarizado: 'polarizado',
  espejado: 'espejado',
  esmerilado: 'esmerilado',
  seguridad: 'láminas de seguridad',
};

// Textos provisorios (sin cifras técnicas ni precios: decisión del cliente, ver PRODUCT.md).
/** Orden de declaración (el inicio y el menú usan el recorrido: autos → hogares → negocios). */
export const services: readonly Service[] = [
  {
    id: 'negocios',
    navLabel: 'Negocios',
    hero: {
      titlePrefix: 'Polarizado y espejado para',
      title: 'NEGOCIOS',
      lede: 'Vidrieras, oficinas y ventanales con polarizado, espejado o esmerilado: menos reflejo y calor adentro, más confort para tus clientes y una fachada prolija.',
    },
    page: {
      title: 'Polarizado para negocios y oficinas en Godoy Cruz',
      description:
        'Polarizado, espejado, esmerilado y láminas de seguridad para vidrieras, locales y oficinas en Godoy Cruz, Mendoza. Consultá por WhatsApp.',
    },
    treatments: ['polarizado', 'espejado', 'esmerilado', 'seguridad'],
    benefits: [
      { kind: 'heat', title: 'Menos calor y encandilamiento', text: 'para clientes y empleados.' },
      { kind: 'privacy', title: 'Privacidad donde hace falta:', text: 'esmerilado para oficinas, depósitos y probadores.' },
      { kind: 'uv', title: 'Filtro UV', text: 'que ayuda a que la mercadería de la vidriera no se decolore.' },
      { kind: 'security', title: 'Láminas antivandálicas', text: 'que hacen más difícil romper la vidriera.' },
    ],
    story: [
      {
        id: 'vidrio-original',
        indexLabel: 'Vidrio original',
        title: 'Tu vidriera, tal cual está',
        text: 'Reflejos, sol directo sobre la mercadería y oficinas a la vista de cualquiera que pasa por la vereda.',
      },
      {
        id: 'la-lamina',
        indexLabel: 'La lámina',
        title: 'La lámina justa para cada vidrio',
        text: 'Polarizado para la vidriera, esmerilado donde hace falta privacidad y espejado para puertas y oficinas.',
      },
      {
        id: 'privacidad',
        indexLabel: 'Privacidad',
        title: 'Privacidad donde hace falta',
        text: 'Oficinas, depósitos y probadores quedan reservados, y la luz sigue entrando.',
      },
      {
        id: 'seguridad',
        indexLabel: 'Seguridad',
        title: 'Una vidriera más difícil de romper',
        text: 'Las láminas antivandálicas retienen el vidrio: si recibe un golpe, no se desparrama.',
      },
    ],
    closing: {
      title: 'Hablemos de tu negocio',
      text: 'Contanos cuántos vidrios tenés y qué querés resolver, y te recomendamos la lámina para cada uno.',
    },
    faq: [
      {
        question: '¿Qué lámina conviene para una vidriera?',
        answer: 'Depende de lo que quieras resolver: menos sol y reflejo, privacidad o seguridad. Lo vemos juntos según tu local.',
      },
      {
        question: '¿Trabajan en oficinas?',
        answer: 'Sí: esmerilado para oficinas, depósitos y probadores, y espejado para puertas y ventanas.',
      },
      {
        question: '¿Cuánto sale?',
        answer: 'No publicamos precios porque cada negocio es distinto. Escribinos con fotos o medidas de los vidrios y te pasamos el presupuesto.',
      },
    ],
    whatsappMessage: '¡Hola Crisur! Quiero consultar por polarizado para mi negocio u oficina.',
    ctaLabel: 'Consultar por mi negocio',
  },
  {
    id: 'autos',
    navLabel: 'Autos',
    hero: {
      titlePrefix: 'Polarizado para',
      title: 'AUTOS',
      lede: 'Más privacidad, menos calor y protección UV para vos y tu tapizado. Elegís la tonalidad y te asesoramos. Más de 10 años en Godoy Cruz, Mendoza.',
    },
    page: {
      title: 'Polarizado de autos en Godoy Cruz',
      description:
        'Polarizado y láminas de seguridad para autos en Godoy Cruz, Mendoza: más privacidad, menos calor y filtro UV. Más de 10 años. Consultá por WhatsApp.',
    },
    treatments: ['polarizado', 'seguridad'],
    benefits: [
      { kind: 'heat', title: 'Menos calor', text: 'adentro del auto, sobre todo en verano.' },
      { kind: 'privacy', title: 'Privacidad:', text: 'desde afuera no se ve lo que llevás adentro.' },
      { kind: 'uv', title: 'Filtro UV', text: 'que cuida tu piel y el tapizado.' },
      { kind: 'security', title: 'Lámina de seguridad:', text: 'si el vidrio se rompe, no se desparrama.' },
    ],
    story: [
      {
        id: 'vidrio-original',
        indexLabel: 'Vidrio original',
        title: 'Así se ve hoy',
        text: 'Con el vidrio original, desde afuera se ve todo lo que llevás adentro y el sol entra de lleno en la cabina.',
      },
      {
        id: 'la-lamina',
        indexLabel: 'La lámina',
        title: 'Colocamos la lámina, vidrio por vidrio',
        text: 'Elegís el tono y la aplicamos a medida en cada ventanilla y en la luneta, con terminación prolija en los bordes.',
      },
      {
        id: 'privacidad',
        indexLabel: 'Privacidad',
        title: 'Desde afuera, no se ve adentro',
        text: 'Lo que llevás en los asientos queda a resguardo de las miradas, estés andando o estacionado.',
      },
      {
        id: 'confort',
        indexLabel: 'Confort',
        title: 'Viajás más fresco',
        text: 'La lámina filtra el sol: menos calor en la cabina, sobre todo en verano, y un filtro UV que cuida tu piel y el tapizado.',
      },
    ],
    closing: {
      title: '¿Qué tono va con tu auto?',
      text: 'Contanos el modelo y cómo lo usás, y te recomendamos la lámina justa.',
    },
    faq: [
      {
        question: '¿Qué tono me conviene?',
        answer: 'Depende de cuánta privacidad buscás y de cómo usás el auto. Te mostramos las opciones y te recomendamos la más adecuada.',
      },
      {
        question: '¿Cuánto sale?',
        answer: 'No publicamos precios porque cada auto es distinto. Escribinos con el modelo y te pasamos el presupuesto.',
      },
      {
        question: '¿Cuánto tiempo lleva?',
        answer: 'Depende del auto y de la lámina. Te confirmamos el tiempo cuando coordinamos el turno.',
      },
    ],
    whatsappMessage: '¡Hola Crisur! Quiero consultar por el polarizado de mi auto.',
    ctaLabel: 'Consultar por mi auto',
  },
  {
    id: 'hogares',
    navLabel: 'Hogares',
    hero: {
      titlePrefix: 'Espejado y esmerilado para',
      title: 'HOGARES',
      lede: 'Láminas espejadas y esmeriladas para ventanas, ventanales y mamparas. Privacidad de día, control solar y un acabado que renueva cada ambiente.',
    },
    page: {
      title: 'Espejado y esmerilado para casas en Godoy Cruz',
      description:
        'Láminas espejadas, esmeriladas y de seguridad para ventanas, ventanales y mamparas en Godoy Cruz, Mendoza. Privacidad y control solar. Consultá por WhatsApp.',
    },
    treatments: ['espejado', 'esmerilado', 'seguridad'],
    benefits: [
      { kind: 'privacy', title: 'Privacidad de día:', text: 'ves hacia afuera sin que te vean.' },
      { kind: 'heat', title: 'Control solar:', text: 'menos calor en verano y ambientes más parejos.' },
      { kind: 'uv', title: 'Filtro UV', text: 'para que muebles, pisos y cortinas se decoloren menos.' },
      { kind: 'security', title: 'Láminas de seguridad', text: 'que retienen el vidrio ante un golpe.' },
    ],
    story: [
      {
        id: 'vidrio-original',
        indexLabel: 'Vidrio original',
        title: 'Ventanales a la vista',
        text: 'Con el vidrio común, de día se ve el interior desde la calle y el sol calienta los ambientes.',
      },
      {
        id: 'la-lamina',
        indexLabel: 'La lámina',
        title: 'Espejado y esmerilado a medida',
        text: 'Colocamos lámina espejada en ventanas y ventanales, y esmerilada en baños y mamparas.',
      },
      {
        id: 'privacidad',
        indexLabel: 'Privacidad',
        title: 'Ves hacia afuera sin que te vean',
        text: 'De día, el espejado refleja la calle y el interior queda reservado. El esmerilado deja pasar la luz sin mostrar nada.',
      },
      {
        id: 'confort',
        indexLabel: 'Confort',
        title: 'Ambientes más parejos',
        text: 'Control solar para que haga menos calor en verano, y filtro UV para que muebles, pisos y cortinas se decoloren menos.',
      },
    ],
    closing: {
      title: '¿Qué ventanas querés tratar?',
      text: 'Mandanos fotos por WhatsApp y te asesoramos sobre la lámina para cada ambiente.',
    },
    faq: [
      {
        question: '¿Espejado o esmerilado?',
        answer: 'El espejado da privacidad de día y control solar en ventanas y ventanales. El esmerilado da privacidad en baños y mamparas sin tapar la luz. Te ayudamos a elegir.',
      },
      {
        question: '¿En qué vidrios se puede colocar?',
        answer: 'Trabajamos con ventanas, ventanales y mamparas. Mandanos fotos por WhatsApp y te decimos qué conviene en cada caso.',
      },
      {
        question: '¿Cuánto sale?',
        answer: 'No publicamos precios porque cada casa es distinta. Escribinos con fotos o medidas y te pasamos el presupuesto.',
      },
    ],
    whatsappMessage: '¡Hola Crisur! Quiero consultar por espejado o esmerilado para mi casa.',
    ctaLabel: 'Consultar por mi casa',
  },
];

/** Orden del recorrido entre páginas: cada una termina con un portal a la siguiente. */
const TOUR_ORDER: readonly ServiceId[] = ['autos', 'hogares', 'negocios'];

/** @throws {Error} si el servicio no existe (build time). */
export function getService(id: ServiceId): Service {
  const service = services.find((candidate) => candidate.id === id);
  if (service === undefined) throw new Error(`Unknown service "${id}".`);
  return service;
}

export function nextServiceOf(id: ServiceId): Service {
  const index = TOUR_ORDER.indexOf(id);
  const nextId = TOUR_ORDER[(index + 1) % TOUR_ORDER.length];
  if (nextId === undefined) throw new Error(`Service "${id}" is not in the tour order.`);
  return getService(nextId);
}

/** "polarizado, espejado y esmerilado" → con la primera letra en mayúscula. */
export function describeTreatments(treatments: readonly Treatment[]): string {
  const text = new Intl.ListFormat('es-AR', { type: 'conjunction' }).format(treatments.map((treatment) => TREATMENT_LABEL[treatment]));
  return text.charAt(0).toUpperCase() + text.slice(1);
}
