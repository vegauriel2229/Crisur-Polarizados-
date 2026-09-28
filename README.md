# Crisur Polarizados — sitio web

Landing de Crisur Polarizados (Godoy Cruz, Mendoza): polarizado, espejado, esmerilado y láminas de seguridad para autos, hogares y locales. Hecha con [Astro](https://astro.build) + TypeScript estricto, sin frameworks de UI ni librerías de animación.

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
| Textos del hero y de las tarjetas, mensajes de WhatsApp | `src/data/services.ts` |
| Teléfono, Instagram, años de experiencia, zona | `src/config/site.ts` |
| Colores, tipografía, radios, colores de las láminas | `src/styles/tokens.css` |
| Dibujos del auto, la casa y el local | `src/components/ServiceArt.astro` |

## Fotos reales

Buscá `FOTO REAL` en el código. Lo recomendado:

1. Guardá la foto en `src/assets/services/` (por ejemplo `autos.jpg`).
2. En `src/data/services.ts`, importala y completá el campo `photo` del servicio:
   ```ts
   import autosPhoto from '../assets/services/autos.jpg';
   // ...
   photo: { src: autosPhoto, alt: 'Auto con polarizado negro humo en el taller' },
   ```
3. Listo: el hero y la tarjeta muestran la foto (optimizada a WebP/AVIF) en lugar del dibujo.

La imagen de vista previa al compartir el link es `public/og-image.jpg` (1200×630).

## Publicar (Vercel)

Importá el repo en Vercel; detecta Astro solo. Cuando haya dominio propio, cargá la variable `PUBLIC_SITE_URL` (por ejemplo `https://crisurpolarizados.com.ar`). Sin ella se usa el dominio `*.vercel.app` que Vercel asigna.

## Documentación

- `docs/SDD.md`: especificación (arquitectura, contratos, animación, pendientes).
- `DESIGN.md`: sistema visual (tokens y reglas de diseño).
- `PRODUCT.md`: qué es el negocio y qué no se puede inventar (cifras, fotos, testimonios).

## Nota sobre OneDrive

El proyecto vive en una carpeta de OneDrive. Para que Vite pueda resolver paquetes ahí, `astro.config.mjs` usa `preserveSymlinks: true` y `tsconfig.json` extiende la config de Astro con ruta relativa. No los cambies. Si podés, conviene mover el proyecto fuera de OneDrive.
