import type { ImageMetadata } from 'astro';

export type ServiceId = 'locales' | 'autos' | 'hogares';
export type Treatment = 'polarizado' | 'espejado' | 'esmerilado' | 'seguridad';
export type BenefitKind = 'heat' | 'privacy' | 'uv' | 'security';

export interface Benefit {
  kind: BenefitKind;
  /** Primeras palabras en negrita: se leen de un vistazo. */
  title: string;
  text: string;
}

export interface Service {
  id: ServiceId;
  navLabel: string;
  /** h1 del hero en dos líneas: `titlePrefix` + `title` (display gigante). */
  hero: { titlePrefix: string; title: string; lede: string };
  summary: string;
  treatments: readonly Treatment[];
  benefits: readonly Benefit[];
  whatsappMessage: string;
  ctaLabel: string;
  /**
   * FOTO REAL: cuando tengas la foto de un trabajo, guardala en src/assets/services/, importala arriba
   *   import autosPhoto from '../assets/services/autos.jpg';
   * y completá este campo:  photo: { src: autosPhoto, alt: 'Descripción de la foto' }
   * Con `photo` cargado, el hero y la tarjeta muestran la foto en lugar de la ilustración.
   */
  photo?: { src: ImageMetadata; alt: string };
}

export const TREATMENT_LABEL: Record<Treatment, string> = {
  polarizado: 'polarizado',
  espejado: 'espejado',
  esmerilado: 'esmerilado',
  seguridad: 'láminas de seguridad',
};

// Textos provisorios (sin cifras técnicas: decisión del cliente, ver PRODUCT.md).
/** Orden visual del selector, de izquierda a derecha. */
export const services: readonly Service[] = [
  {
    id: 'locales',
    navLabel: 'Locales',
    hero: {
      titlePrefix: 'Polarizado y espejado para',
      title: 'LOCALES',
      lede: 'Vidrieras y ventanales con polarizado, espejado o esmerilado: menos reflejo y calor adentro, más confort para tus clientes y una fachada prolija.',
    },
    summary:
      'Vidrieras, ventanales y oficinas con la lámina justa para cada vidrio. Tu local se ve prolijo desde la vereda y adentro se trabaja más cómodo.',
    treatments: ['polarizado', 'espejado', 'esmerilado', 'seguridad'],
    benefits: [
      { kind: 'heat', title: 'Menos calor y encandilamiento', text: 'para clientes y empleados.' },
      { kind: 'privacy', title: 'Privacidad donde hace falta:', text: 'esmerilado para oficinas, depósitos y probadores.' },
      { kind: 'uv', title: 'Filtro UV', text: 'que ayuda a que la mercadería de la vidriera no se decolore.' },
      { kind: 'security', title: 'Láminas antivandálicas', text: 'que hacen más difícil romper la vidriera.' },
    ],
    whatsappMessage: '¡Hola Crisur! Quiero consultar por polarizado para mi local u oficina.',
    ctaLabel: 'Consultar por mi local',
  },
  {
    id: 'autos',
    navLabel: 'Autos',
    hero: {
      titlePrefix: 'Polarizado para',
      title: 'AUTOS',
      lede: 'Más privacidad, menos calor y protección UV para vos y tu tapizado. Elegís la tonalidad y te asesoramos. Más de 10 años en Godoy Cruz, Mendoza.',
    },
    summary:
      'Polarizado con el tono que elijas y terminación prolija en cada ventanilla. Viajás más fresco, con más privacidad y el interior protegido del sol.',
    treatments: ['polarizado', 'seguridad'],
    benefits: [
      { kind: 'heat', title: 'Menos calor', text: 'adentro del auto, sobre todo en verano.' },
      { kind: 'privacy', title: 'Privacidad:', text: 'desde afuera no se ve lo que llevás adentro.' },
      { kind: 'uv', title: 'Filtro UV', text: 'que cuida tu piel y el tapizado.' },
      { kind: 'security', title: 'Lámina de seguridad:', text: 'si el vidrio se rompe, no se desparrama.' },
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
    summary:
      'Espejado para ventanas y ventanales, esmerilado para baños y mamparas. Ganás privacidad sin perder luz y cada ambiente queda renovado.',
    treatments: ['espejado', 'esmerilado', 'seguridad'],
    benefits: [
      { kind: 'privacy', title: 'Privacidad de día:', text: 'ves hacia afuera sin que te vean.' },
      { kind: 'heat', title: 'Control solar:', text: 'menos calor en verano y ambientes más parejos.' },
      { kind: 'uv', title: 'Filtro UV', text: 'para que muebles, pisos y cortinas se decoloren menos.' },
      { kind: 'security', title: 'Láminas de seguridad', text: 'que retienen el vidrio ante un golpe.' },
    ],
    whatsappMessage: '¡Hola Crisur! Quiero consultar por espejado o esmerilado para mi casa.',
    ctaLabel: 'Consultar por mi casa',
  },
];

export const initialServiceId: ServiceId = 'autos';

/** "polarizado, espejado y esmerilado" → con la primera letra en mayúscula. */
export function describeTreatments(treatments: readonly Treatment[]): string {
  const text = new Intl.ListFormat('es-AR', { type: 'conjunction' }).format(treatments.map((treatment) => TREATMENT_LABEL[treatment]));
  return text.charAt(0).toUpperCase() + text.slice(1);
}
