import { siteSettings } from '../config/site';
import type { FaqItem, Treatment } from './services';

// Textos provisorios para confirmar con el cliente (SDD §11): sin cifras, precios ni plazos inventados.

export interface ProcessStep {
  title: string;
  text: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  { title: 'Nos escribís', text: 'Por WhatsApp, con fotos del auto, las ventanas o la vidriera que querés tratar.' },
  { title: 'Te asesoramos', text: 'Te mostramos las láminas y tonos que convienen para tu caso y elegís con toda la información.' },
  { title: 'Coordinamos el turno', text: 'Acordamos el día por el mismo chat.' },
  { title: 'Colocamos la lámina', text: 'A medida y con terminación prolija en cada vidrio.' },
];

export type SwatchFilm = 'tint' | 'mirror' | 'frost' | 'security';

export interface FilmType {
  treatment: Treatment;
  film: SwatchFilm;
  title: string;
  text: string;
}

export const FILM_TYPES: readonly FilmType[] = [
  { treatment: 'polarizado', film: 'tint', title: 'Polarizado', text: 'Oscurece el vidrio: más privacidad y menos sol adentro.' },
  { treatment: 'espejado', film: 'mirror', title: 'Espejado', text: 'Refleja hacia afuera: de día ves sin que te vean.' },
  { treatment: 'esmerilado', film: 'frost', title: 'Esmerilado', text: 'Vuelve el vidrio traslúcido: privacidad sin perder luz.' },
  { treatment: 'seguridad', film: 'security', title: 'De seguridad', text: 'Retiene el vidrio si se rompe, para que no se desparrame.' },
];

export const HOME_FAQ: readonly FaqItem[] = [
  {
    question: '¿Dónde están?',
    answer: `Estamos en ${siteSettings.serviceArea}. ${siteSettings.openingHours}`,
  },
  {
    question: '¿Cuánto cuesta?',
    answer: 'Cada trabajo es distinto, por eso no publicamos precios. Mandanos fotos o medidas y te pasamos el presupuesto.',
  },
  {
    question: '¿Qué láminas usan?',
    answer: 'Trabajamos con todas las láminas y tonos del mercado, y te recomendamos la que mejor va con tu caso.',
  },
  {
    question: '¿Hacen autos, casas y negocios?',
    answer: 'Sí: polarizado y láminas de seguridad para autos; espejado, esmerilado y seguridad para casas; y todas las opciones para negocios y oficinas. También hacemos ploteo, sobre todo en autos.',
  },
];
