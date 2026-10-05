# Crisur Polarizados — sitio web

Sitio de Crisur Polarizados (Godoy Cruz, Mendoza): polarizado, espejado, esmerilado y láminas de seguridad para autos, hogares y negocios. Hecho con [Astro](https://astro.build) + TypeScript estricto, sin frameworks de UI. Las páginas de cada servicio tienen una escena 3D ([Three.js](https://threejs.org)) que aplica la lámina mientras se scrollea; el scroll lo mide [Motion](https://motion.dev).

## Páginas

| Ruta | Qué tiene |
|---|---|
| `/` | Moneda con el logo, redes, selector de los tres servicios, sobre nosotros, tipos de lámina, cómo trabajamos, preguntas frecuentes |
| `/autos`, `/hogares`, `/negocios` | Escena 3D con capítulos, carrusel de trabajos, beneficios, preguntas frecuentes y portal al servicio siguiente |
| `/404` | Página no encontrada |

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias (una sola vez) |
| `npm run dev` | Servidor local en `http://localhost:4321` con recarga automática |
| `npm run build` | Chequeo de tipos (`astro check`) + build de producción en `dist/` |
| `npm run preview` | Sirve `dist/` para probar la build final |

## Qué archivo tocar

| Quiero cambiar… | Archivo |
|---|---|
| Textos de cada servicio: portada, capítulos de la escena, cierre, preguntas frecuentes y mensajes de WhatsApp | `src/data/services.ts` |
| Texto de "Sobre nosotros" | `src/components/home/AboutSection.astro` |
| Pasos de "Cómo trabajamos", tipos de lámina y preguntas de la home | `src/data/home.ts` |
| Modelos 3D, encuadres de cámara y en qué parte del scroll entra cada lámina | `src/components/film-scene/scenes/` (`car.ts`, `house.ts`, `storefront.ts`) |
| Luces, reflejos y piso de las escenas | `src/components/film-scene/studio.ts` |
| Cómo se ve la lámina en 3D (colores, borde de la espátula) | `src/components/film-scene/film-glass.ts` |
| Teléfono, Instagram, años de experiencia, zona | `src/config/site.ts` |
| Colores, tipografía, radios, colores de las láminas | `src/styles/tokens.css` |
| Dibujos del auto, la casa y el negocio (home y respaldo sin 3D) | `src/components/ServiceArt.astro` |

## Fotos de trabajos (carrusel)

Copiá las fotos en `src/assets/gallery/autos/`, `hogares/` o `negocios/` y listo: la página del servicio arma el carrusel sola (las optimiza a WebP/AVIF). Si la carpeta de un servicio está vacía, la galería no aparece; aparece sola en cuanto hay fotos y se vuelve a compilar.

- **Orden:** el del nombre del archivo; numerá al principio (`01-`, `02-`…).
- **Descripción:** sale del nombre. `02-auto-polarizado-negro-humo.jpg` → "Auto polarizado negro humo".
- Detalle en `src/assets/gallery/README.md`.

La imagen de vista previa al compartir el link es `public/og-image.jpg` (1200×630).

## Publicar (Hostinger)

1. Copiá `.env.example` como `.env` y poné el dominio real en `PUBLIC_SITE_URL`. Sin esto la build sale sin canonical ni sitemap, y lo avisa en la consola.
2. `npm run build`.
3. En hPanel → Administrador de archivos, subí **el contenido** de `dist/` a `public_html`, incluido `.htaccess` (es un archivo oculto). Ese archivo fuerza https sin `www` y muestra la página 404 propia.

Todas las URLs terminan en `/` (`/autos/`): así Hostinger no tiene que redirigir.

## Documentación

- `docs/SDD.md`: especificación (arquitectura, contratos, animación, pendientes).
- `DESIGN.md`: sistema visual (tokens y reglas de diseño).
- `PRODUCT.md`: qué es el negocio y qué no se puede inventar (cifras, fotos, testimonios).

## Nota sobre OneDrive

El proyecto vive en una carpeta de OneDrive. Para que Vite pueda resolver paquetes ahí, `astro.config.mjs` usa `preserveSymlinks: true` y `tsconfig.json` extiende la config de Astro con ruta relativa. No los cambies. Si podés, conviene mover el proyecto fuera de OneDrive.
