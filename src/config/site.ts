// Provisorio hasta integrar Keystatic (SDD §4): mismo contrato que el singleton `settings`.
export interface SiteSettings {
  businessName: string;
  /** E.164 sin '+'. Celulares AR requieren el 9 tras el 54. */
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  instagramHandle: string;
  serviceArea: string;
  address?: string;
  openingHours?: string;
  yearsOfExperience: number;
}

export const siteSettings: SiteSettings = {
  businessName: 'Crisur Polarizados',
  whatsappNumber: '5492616256467',
  whatsappDefaultMessage: '¡Hola Crisur! Quiero hacer una consulta.',
  instagramHandle: 'crisur2026',
  serviceArea: 'Godoy Cruz, Mendoza',
  yearsOfExperience: 10,
};

export const instagramUrl = `https://www.instagram.com/${siteSettings.instagramHandle}/`;
