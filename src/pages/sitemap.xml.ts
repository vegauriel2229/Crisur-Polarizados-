import type { APIRoute } from 'astro';

// ponytail: lista manual de rutas (el sitio tiene una sola página); pasar a @astrojs/sitemap cuando haya más.
const ROUTES = ['/'];

/** Sin dominio configurado el sitemap queda vacío: Google exige URLs absolutas. */
export const GET: APIRoute = ({ site }) => {
  const urls = site === undefined ? [] : ROUTES.map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
