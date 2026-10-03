import type { SiteSettings } from '../config/site';

interface BusinessLinks {
  /** Raíz del sitio (no la página actual): el negocio es uno solo en todas las páginas. `undefined` sin dominio. */
  site: URL | undefined;
  /** Logo absoluto para Google; requiere dominio. */
  image: URL | undefined;
  instagram: string;
}

/**
 * JSON-LD schema.org/LocalBusiness para SEO local (SDD §5).
 * La dirección siempre lleva localidad y provincia; la calle solo si está confirmada.
 * ponytail: sin horarios en el JSON-LD (Google pide apertura y cierre); sumar openingHoursSpecification cuando haya hora de cierre.
 */
export function buildLocalBusinessSchema(settings: SiteSettings, links: BusinessLinks): Record<string, unknown> {
  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: settings.city,
    addressRegion: settings.province,
    addressCountry: 'AR',
  };
  if (settings.address !== undefined && settings.address !== '') address['streetAddress'] = settings.address;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.businessName,
    telephone: `+${settings.whatsappNumber}`,
    address,
    areaServed: settings.serviceArea,
    sameAs: [links.instagram],
  };
  if (links.site !== undefined) {
    schema['@id'] = new URL('#negocio', links.site).href;
    schema['url'] = links.site.href;
  }
  if (links.image !== undefined) schema['image'] = links.image.href;
  return schema;
}
