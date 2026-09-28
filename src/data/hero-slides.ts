export type ServiceId = 'locales' | 'autos' | 'hogares';

export interface HeroSlide {
  id: ServiceId;
  navLabel: string;
  /** Primera línea del h1 (técnica); la segunda es `title` en display. */
  kicker: string;
  title: string;
  lede: string;
  whatsappMessage: string;
  /** Texto alternativo del poster estático (respaldo sin WebGL). */
  sceneDescription: string;
}

/** Orden visual de la ruleta, de izquierda a derecha. */
export const heroSlides: readonly HeroSlide[] = [
  {
    id: 'locales',
    navLabel: 'Locales',
    kicker: 'Polarizado y espejado para',
    title: 'LOCALES',
    lede: 'Vidrieras y ventanales con polarizado, espejado o esmerilado: menos reflejo y calor adentro, más confort para tus clientes y una fachada prolija.',
    whatsappMessage: '¡Hola Crisur! Quiero consultar por polarizado para mi local u oficina.',
    sceneDescription: 'Frente de local comercial con vidriera polarizada, banda esmerilada y puerta espejada.',
  },
  {
    id: 'autos',
    navLabel: 'Autos',
    kicker: 'Polarizado para',
    title: 'AUTOS',
    lede: 'Más privacidad, menos calor y protección UV para vos y tu tapizado. Elegís la tonalidad y te asesoramos. Más de 10 años en Godoy Cruz, Mendoza.',
    whatsappMessage: '¡Hola Crisur! Quiero consultar por el polarizado de mi auto.',
    sceneDescription: 'Sedán plateado 0 km con vidrios polarizados sobre un pedestal iluminado.',
  },
  {
    id: 'hogares',
    navLabel: 'Hogares',
    kicker: 'Espejado y esmerilado para',
    title: 'HOGARES',
    lede: 'Láminas espejadas y esmeriladas para ventanas, ventanales y mamparas. Privacidad de día, control solar y un acabado que renueva cada ambiente.',
    whatsappMessage: '¡Hola Crisur! Quiero consultar por espejado o esmerilado para mi casa.',
    sceneDescription: 'Casa moderna de dos plantas con ventanales espejados y vidrios esmerilados.',
  },
];

export const heroInitialService: ServiceId = 'autos';
