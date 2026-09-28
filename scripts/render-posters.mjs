// Genera los posters estáticos del showroom (respaldo sin WebGL) a partir del mismo 3D.
// Uso: npm run build && npm run posters   (requiere CHROME_PATH con un Chrome/Edge instalado)
import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const SERVICES = ['locales', 'autos', 'hogares'];
const DIST_DIR = fileURLToPath(new URL('../dist/', import.meta.url));
const OUTPUT_DIR = fileURLToPath(new URL('../src/assets/hero/posters/', import.meta.url));
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 1.5 };
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const executablePath = process.env.CHROME_PATH;
if (!executablePath) {
  throw new Error('CHROME_PATH is not set. Point it to a local Chrome or Edge executable.');
}

// Servidor estático mínimo sobre dist/: independiente de `astro preview` (que admite una sola instancia).
const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://local').pathname);
  const relative = normalize(pathname.endsWith('/') ? `${pathname}index.html` : pathname).replace(/^([/\\])+/, '');
  if (relative.startsWith('..')) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(join(DIST_DIR, relative));
    response.writeHead(200, { 'content-type': CONTENT_TYPES[extname(relative)] ?? 'application/octet-stream' });
    response.end(body);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    response.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}/`;

try {
  await mkdir(OUTPUT_DIR, { recursive: true });
  // Un navegador por poster: el render por software acumula memoria y puede tumbar el proceso.
  for (const service of SERVICES) {
    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      protocolTimeout: 300_000,
      args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars'],
    });
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    // Movimiento reducido: sin entrada animada, el encuadre final se renderiza de inmediato.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`${baseUrl}#${service}`, { waitUntil: 'load', timeout: 120_000 });
    await page.waitForSelector('[data-showroom="ready"]', { timeout: 120_000 });
    await page.addStyleTag({ content: '.carousel-controls, .site-header, .copy { visibility: hidden !important; }' });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const zone = await page.$('[data-showroom-zone]');
    if (zone === null) throw new Error('Showroom zone not found.');
    await zone.screenshot({ path: join(OUTPUT_DIR, `${service}.png`) });
    console.log(`poster: ${service}.png`);
    await browser.close();
  }
} finally {
  server.close();
}
