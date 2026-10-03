// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// Prefijo '' = todas las variables: las de los archivos .env y las del entorno (Vercel).
const env = loadEnv('production', '.', '');
// Dominio propio (PUBLIC_SITE_URL) primero; si no está, el dominio de producción que Vercel expone solo.
const vercelProductionHost = env['VERCEL_PROJECT_PRODUCTION_URL'];
const site = env['PUBLIC_SITE_URL'] || (vercelProductionHost ? `https://${vercelProductionHost}` : undefined);
if (site === undefined) console.warn('[crisur] Sin PUBLIC_SITE_URL: la build sale sin canonical ni sitemap. Sirve para probar, no para publicar.');

export default defineConfig({
  ...(site === undefined ? {} : { site }),
  // Hostinger (Apache/LiteSpeed) redirige /autos → /autos/: con la barra en todos los links,
  // el sitemap y el canonical apuntan directo a la URL final, sin redirecciones.
  trailingSlash: 'always',
  vite: {
    resolve: {
      // Workaround OneDrive (Windows): el resolvedor nativo de Vite falla al canonicalizar las
      // carpetas sincronizadas (reparse points) y no encuentra ningún paquete. Sin symlinks en
      // el proyecto, preservarlos no cambia nada en otros entornos (Vercel incluido).
      preserveSymlinks: true,
    },
  },
});
