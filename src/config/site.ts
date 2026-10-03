// Provisorio hasta integrar Keystatic (SDD §4): mismo contrato que el singleton `settings`.
export interface SiteSettings {
  businessName: string;
  /** E.164 sin '+'. Celulares AR requieren el 9 tras el 54. */
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  /** Cómo se lee el número en pantalla (footer). */
  phoneDisplay: string;
  instagramHandle: string;
  /** Localidad y provincia: dirección para Google (JSON-LD) y, juntas, `serviceArea`. */
  city: string;
  province: string;
  /** "Godoy Cruz, Mendoza": como se lee en los textos. */
  serviceArea: string;
  /** Calle y número. Sin confirmar → se omite y Google recibe solo localidad y provincia. */
  address?: string;
  /** Frase para la gente (footer y preguntas frecuentes). No va al JSON-LD: Google exige hora de cierre. */
  openingHours: string;
  yearsOfExperience: number;
}

const city = 'Godoy Cruz';
const province = 'Mendoza';

export const siteSettings: SiteSettings = {
  businessName: 'Crisur Polarizados',
  whatsappNumber: '5492616256467',
  whatsappDefaultMessage: '¡Hola Crisur! Quiero hacer una consulta.',
  phoneDisplay: '261 625-6467',
  instagramHandle: 'crisur2026',
  city,
  province,
  serviceArea: `${city}, ${province}`,
  // Confirmado por el cliente (2026-10-02): el dueño trabaja de mañana; el turno se arregla en el chat.
  openingHours: 'Atendemos todos los días desde las 17 h; el día y la hora los coordinamos por WhatsApp.',
  yearsOfExperience: 10,
};

export const instagramUrl = `https://www.instagram.com/${siteSettings.instagramHandle}/`;
