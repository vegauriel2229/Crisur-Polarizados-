import type { APIRoute } from 'astro';

import { services } from '../data/services';

// ponytail: lista armada a mano (home + una página por servicio); pasar a @astrojs/sitemap si el sitio crece mucho.
const ROUTES = ['/', ...services.map((service) => `/${service.id}/`)];

/** Sin dominio configurado el sitemap queda vacío: Google exige URLs absolutas. */
export const GET: APIRoute = ({ site }) => {
  const urls = site === undefined ? [] : ROUTES.map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
