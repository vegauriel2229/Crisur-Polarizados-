# Auditoría web — Crisur Polarizados (2026-10-03)

> Diagnóstico de la Fase 0, paso 7 (`/auditoria-web`), en modo solo lectura: no se corrigió nada. Lo corrieron `seo-rendimiento`, `seguridad` y `disenador-ui` (con la skill `impeccable`) y lo consolidó el orquestador.
>
> - **Alcance:** `https://crisur-polarizados.vercel.app/` y el código de `main` (`cdd2982`). El HTML publicado es idéntico al de la build de `main` (comparado por MD5).
> - **Vara:** constitución aprobada (`specs/constitucion.md`): WCAG 2.2 AA (D-009), Lighthouse ≥ 95 en mobile (D-012) y principios de `PRODUCT.md`.
> - **Uso:** es la fuente de los requisitos de las specs 001–006 (agrupación aprobada en D-015). Las opciones de cada hallazgo se deciden en la spec que corresponda, no acá.

## Resumen

| Área | Resultado |
|---|---|
| Rendimiento (Lighthouse mobile) | 🔴 **60–67** en las 4 páginas (meta ≥ 95) |
| Accesibilidad / Buenas prácticas / SEO (Lighthouse) | 🟢 100 / 100 / 100 en las 4 páginas |
| Conversión (principio 1 de `PRODUCT.md`) | 🔴 Hay secciones sin acción de WhatsApp |
| Accesibilidad (revisión manual) | 🔴 Muestras de lámina solo con mouse |
| Seguridad | 🟢 Apta, sin críticos; faltan headers antes de Hostinger |

## Lighthouse (D-016)

Condiciones de la medición:
- Lighthouse 12.8.2 local, con Edge headless.
- Emulación mobile con throttling simulado: CPU ×4 y 4G lento.
- `benchmarkIndex` ≈ 1200.
- Una corrida por página (variación típica de ±5 puntos).
- PageSpeed Insights no se pudo usar: devolvió 429 por cuota agotada.

| Página | Perf | A11y | BP | SEO | LCP | FCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|---|---|---|
| `/` | **67** | 100 | 100 | 100 | 2,3 s | 2,1 s | **2.090 ms** | 0,027 | 3,8 s |
| `/autos/` | **66** | 100 | 100 | 100 | 1,9 s | 1,9 s | **4.720 ms** | 0 | 4,2 s |
| `/hogares/` | **63** | 100 | 100 | 100 | 2,4 s | 2,1 s | **4.140 ms** | 0 | 4,6 s |
| `/negocios/` | **60** | 100 | 100 | 100 | 3,5 s | 1,6 s | **3.440 ms** | 0 | 3,5 s |

**Qué lo causa: el bloqueo del hilo principal (TBT), no la carga.** LCP y CLS están bien.

- **Páginas de servicio:**
  - `engine.*.js` (three.js) ocupa unos 8,8 s de ejecución de scripts en la CPU emulada.
  - La tarea larga más pesada dura unos 2,8 s, y `animate.*.js` (Motion) suma otra de alrededor de 1,7 s.
  - El tiempo hasta que la página responde va de 5,7 a 7,3 s.
- **Inicio:**
  - El script de la moneda (`CoinLogo`, unos 0,9 s de tarea larga) y Motion (`animate`, unos 2,6 s en total) son los que más pesan.
  - Además hay unos 2 s de estilo y layout. Sospechosos: `backdrop-filter` y transformaciones 3D, todavía sin confirmar.
- **Accesibilidad:** el 100 de Lighthouse no detecta los problemas de interacción de abajo (muestras de lámina). Lighthouse sí marca `label-content-name-mismatch` (WCAG 2.5.3, no puntúa) en el link del logo (`aria-label="Crisur Polarizados, inicio"`) y en el portal "Siguiente: Hogares".

## 🔴 Críticos

| # | Hallazgo | Evidencia | Opciones | Spec · agente |
|---|---|---|---|---|
| C1 | **Secciones sin acción de WhatsApp.** En el inicio, "Una lámina para cada vidrio", "Sobre nosotros" y "Cómo trabajamos" no tienen botón. En las páginas de servicio, los 4 capítulos de la escena (unos 500 svh de scroll) quedan entre la portada y el cierre sin acción. Incumple el principio 1 de `PRODUCT.md` | `FilmTypesSection.astro`, `AboutSection.astro` (menciona WhatsApp solo como texto, `:9`), `ProcessSection.astro`, `ServiceStory.astro:85-93` | A) CTA corto al final de cada sección, con el mensaje del servicio · B) Convertir el paso "Nos escribís" en el link y poner botón solo en las muestras; la escena queda con portada, cierre y botón flotante | 001 · `dev-frontend` |
| C2 | **Muestras de lámina solo con mouse.** No se pueden enfocar ni activar con teclado ni por toque; el texto dice "Pasá el mouse (o tocá)". Falla WCAG 2.1.1 | `FilmTypesSection.astro:9,87` (`.swatch:hover`, sin script) | A) Hacerlas enfocables y activables (foco y toque), con texto "Tocá cada vidrio…" · B) Mostrarlas con la lámina ya aplicada, sin interacción (se pierde el antes/después) | 002 · `dev-frontend` |
| C3 | **Rendimiento mobile de 60 a 67** (meta ≥ 95) por bloqueo del hilo principal | Tabla de Lighthouse | A) No cargar el 3D en gama baja, con `Save-Data` o en pantallas chicas, y usar la ilustración SVG · B) Diferir el 3D hasta la interacción o hasta que esté visible, y aligerar el motor · C) Revisar el costo de la moneda, Motion y `backdrop-filter` en el inicio | 003 · `dev-frontend` + `seo-rendimiento` |

## 🟡 Mejoras

### Conversión y textos → spec 001
- Las etiquetas de los botones no siguen un criterio común:
  - "WhatsApp", sin verbo (`HomeHero.astro:30`).
  - "Consultar" (header).
  - "Consultar por WhatsApp".
  - "Consultar por mi auto/casa/negocio".
  - "Hacer otra pregunta por WhatsApp" (`ServiceDetails.astro:38`).
- El CTA en celular queda poco visible:
  - El "Consultar" del header está dentro de la hamburguesa (`SiteHeader.astro:245`).
  - El botón flotante aparece recién al pasar el 80 % de la altura (`WhatsAppFab.astro:21`).
  - A 360×640, los botones del hero quedan al borde de la primera pantalla. Es una estimación por código.
- Cada beneficio (calor, privacidad, UV, seguridad) aparece 3 veces por página de servicio: en los facts de la portada, en los capítulos y en "Qué ganás" (`ServiceStory.astro:69-81`, `ServiceDetails.astro:20-31`).
- La galería vacía se titula "Trabajos en autos" (`WorkGallery.astro:20`) aunque todavía no hay fotos.
- Textos que no coinciden con el resto del sitio:
  - La FAQ "¿Hacen autos, casas y negocios?" (`data/home.ts:49`) lista tratamientos distintos de los de `services.ts`.
  - "Elegí qué querés polarizar" (`HomeHero.astro:25`) no cubre bien espejado y esmerilado.
- La página 404 no ofrece WhatsApp.

### Accesibilidad → spec 002
- No hay link "Saltar al contenido".
- Hay dos `<nav aria-label="Servicios">` con el mismo nombre (header y pie).
- El contador de carga de la escena está `aria-hidden`, así que no anuncia su estado, y `loader.reach` no respeta reduced-motion.
- WCAG 2.5.3: el texto visible no coincide con el `aria-label` en el logo y en el portal (ver la sección de Lighthouse).
- Pendiente de verificar a mano: WCAG 2.2 AA en 360/768/1024/1440 y áreas táctiles ≥ 44 px.

### Rendimiento → spec 003
- La escena 3D descarga unos 170 KB gzip apenas carga la página, también en gama baja. `detectQuality` (`story-controller.ts:30`) baja la calidad, pero no evita la descarga.
- Hay 4 elementos con `backdrop-filter` en el selector del inicio.
- El chunk de three.js pesa 539 KB (warning de Vite; ya figura en el Anexo A).

### SEO local → spec 004 (depende de datos del cliente, D-018)
- Los títulos superan los 60 caracteres: `/` unos 83–86, `/hogares/` unos 80–84, `/negocios/` unos 79–85 y `/autos/` unos 62. La descripción de `/hogares/` tiene unos 162 caracteres. `/hogares/` no usa "polarizado" en el título.
- Al JSON-LD `LocalBusiness` le faltan:
  - Calle y código postal.
  - Horarios.
  - `geo`.
  - `FAQPage` y `Service`.
- En el sitio no hay calle ni mapa visibles: la FAQ "¿Dónde están?" (`data/home.ts:36`) y el pie no dicen dónde ir.
- **El dominio temporal de Vercel es indexable:**
  - `robots.txt` tiene `Allow: /`.
  - El canonical y el sitemap apuntan a `vercel.app`.
  - Hay riesgo de contenido duplicado al pasar a Hostinger.
  - Opciones: A) `Disallow`/`noindex` hasta tener dominio · B) dejarlo indexable.
- La 404 no tiene `noindex` y declara canonical `/404/`. Hoy devuelve un 404 real; el riesgo aparece si un hosting la sirviera con 200.
- Si falta `PUBLIC_SITE_URL`, la build sale sin canonical ni sitemap y solo avisa (`astro.config.mjs:6-10`). Choca con la regla heredada de fail-fast.
- Hay una sola `og-image.jpg` para todas las páginas, y no hay `twitter:*` explícitos (cae en OG, que es válido).
- Sin fotos propias no hay imágenes indexables ni prueba social (no se inventan: `PRODUCT.md`).

### Publicación y seguridad → spec 005
- Vercel solo envía HSTS. Faltan:
  - CSP.
  - `X-Content-Type-Options`.
  - `Referrer-Policy`.
  - `Permissions-Policy`.
  - `frame-ancestors`/`X-Frame-Options` (riesgo de clickjacking; impacto bajo porque no hay formularios ni sesión).
  - Opciones: A) `vercel.json` con headers · B) resolverlo solo en Hostinger, ya que Vercel es temporal (D-013).
- `public/.htaccess` no tiene headers de seguridad, HSTS ni `Options -Indexes`, ni caché de estáticos.
- CSP: hay 3 scripts inline más el JSON-LD.
  - A) `security.csp` de Astro (hashes) + `frame-ancestors` por header.
  - B) Header con `'unsafe-inline'`.
  - C) Sin CSP por ahora.
- HSTS en Hostinger:
  - A) `max-age` sin `preload` hasta conocer el dominio.
  - B) Completo con `preload`, difícil de revertir.
- `npm audit` da 2 High en `http-cache-semantics@4.2.0` (viene con `astro@7.3.5`, sin parche publicado). No se puede explotar en este proyecto: solo se usa para imágenes remotas en el build y el sitio no las usa. **No aplicar `npm audit fix --force`**: bajaría a astro 2.
  - A) Aceptar el riesgo y documentarlo.
  - B) `overrides` cuando salga el parche.

### Calidad y mantenimiento → spec 006
- `graphify-out/.graphify_root` versiona una ruta local con el usuario de Windows. El repo no es público según la API de GitHub.
- El resto ya está en el Anexo A de la constitución: herramientas que faltan, duplicaciones, parches de OneDrive, tokens y higiene del repo.

## 🟢 OK
- **Contenido:** tono rioplatense con voseo consistente. Sin precios, cifras, fotos ni testimonios inventados.
- **Accesibilidad:**
  - Foco visible global (`global.css:53`).
  - Reduced-motion respetado en botones, menú, moneda, view transitions y escenas.
  - Menú mobile con Escape, `aria-expanded` y cierre al hacer clic fuera.
  - FAQ con `<details>` de 56 px.
  - Contraste holgado: unos 8:1 en el texto secundario y unos 4,9:1 en el CTA blanco sobre rojo.
- **Estructura:** `lang="es-AR"` y un solo `h1` por página, con jerarquía sin saltos.
- **SEO técnico:** canonical autorreferente con barra final, sitemap con 4 URLs, robots, Open Graph completo, favicon y apple-touch-icon.
- **Imágenes y fuente:** WebP con `width`/`height` y `lazy`; fuente self-hosted precargada; assets con `Cache-Control: immutable` de 1 año.
- **Seguridad:**
  - HTTPS con HSTS en Vercel. En el `.htaccess`, una sola redirección 301 a https sin `www`.
  - Sin terceros, cookies, analytics ni formularios: el sitio no recolecta datos personales.
  - 12 `target="_blank"` con `rel="noopener noreferrer"`.
  - Un solo `set:html`, con JSON-LD escapado. Sin `innerHTML` ni `eval`.
  - Ningún secreto en el historial.
- **Respaldo:** si falla WebGL o no hay JS, se muestra la ilustración SVG. El 3D va en un chunk por escena, con carga diferida.
