import type { SiteSettings } from '../config/site';

interface BusinessLinks {
  /** URL canónica del sitio; `undefined` sin dominio configurado (build local). */
  site: URL | undefined;
  /** Logo absoluto para Google; requiere dominio. */
  image: URL | undefined;
  instagram: string;
}

/**
 * JSON-LD schema.org/LocalBusiness para SEO local (SDD §5).
 * Los campos opcionales vacíos (dirección, horarios) se omiten: no se publican datos vacíos a Google.
 */
export function buildLocalBusinessSchema(settings: SiteSettings, links: BusinessLinks): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.businessName,
    telephone: `+${settings.whatsappNumber}`,
    areaServed: settings.serviceArea,
    sameAs: [links.instagram],
  };
  if (links.site !== undefined) schema['url'] = links.site.href;
  if (links.image !== undefined) schema['image'] = links.image.href;
  if (settings.address !== undefined && settings.address !== '') {
    schema['address'] = { '@type': 'PostalAddress', streetAddress: settings.address, addressCountry: 'AR' };
  }
  if (settings.openingHours !== undefined && settings.openingHours !== '') schema['openingHours'] = settings.openingHours;
  return schema;
}
