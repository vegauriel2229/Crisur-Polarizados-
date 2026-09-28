# Crisur — Software Design Document

> Estado: **v0.4 — Hero showroom 3D** · Última actualización: 2026-09-28

## 1. Objetivo

Sitio web institucional de **Crisur Polarizados** (Godoy Cruz, Mendoza; +10 años de trayectoria) cuyo fin es **captar consultas** vía WhatsApp e Instagram. El eje de la marca es el **polarizado** (autos, casas, ventanales, oficinas); esmerilados y demás servicios se presentan como información complementaria. El contenido (galería, servicios, datos de contacto) se edita desde un panel sin tocar código.

### Principios de contenido
- **Sin precios:** todo se resuelve por consulta → cada sección termina en un CTA a WhatsApp.
- **Sin catálogo rígido de láminas/tonos:** trabajan con todas las láminas y niveles de oscuridad; el sitio explica opciones y beneficios de forma general y deriva a la charla con el cliente.

### Fuera de alcance (v1)
- Cotizador online, turnos, e-commerce, formulario por email.

## 2. Decisiones de arquitectura

| Decisión | Elección | Motivo |
|---|---|---|
| Framework | Astro + TypeScript estricto | HTML estático por defecto → máxima velocidad y SEO local; JS solo donde haga falta (islas). |
| CMS | Keystatic (modo GitHub) | Contenido versionado en el repo, sin base de datos ni costo; panel en `/keystatic`. |
| Hosting | Vercel (`@astrojs/vercel`) | Deploy automático por push; el commit de Keystatic dispara el rebuild. |
| Render | Estático + rutas on-demand solo para Keystatic | Las páginas públicas se prerenderizan; el panel necesita endpoints de servidor (OAuth GitHub). |
| Imágenes | `astro:assets` (`<Image>`) | Conversión a WebP/AVIF, `srcset` y dimensiones automáticas → buen LCP/CLS. |
| Contacto | Links `wa.me` con mensaje prearmado + Instagram | Sin backend ni datos personales que almacenar. |

## 3. Mapa del sitio

| Ruta | Contenido |
|---|---|
| `/` | Hero + CTA WhatsApp, resumen de servicios (autos / hogar-oficina), galería destacada, diferenciales, CTA final |
| `/autos` | Polarizado automotor: tipos de film, niveles de oscuridad, beneficios, CTA |
| `/hogar-y-oficinas` | Polarizado y esmerilado arquitectónico: ventanales, mamparas, oficinas, CTA |
| `/galeria` | Trabajos filtrables por categoría |
| `/keystatic` | Panel de administración (protegido por login GitHub) |
| `/404` | Página no encontrada |

Elementos globales: header con navegación, footer con contacto, botón flotante de WhatsApp.

## 4. Modelo de datos (colecciones Keystatic)

```ts
type ServiceCategory = 'automotive' | 'architectural';

/** Colección: src/content/services/*.yaml */
interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;              // ≤ 160 caracteres, usado en cards y meta description
  benefits: string[];
  coverImage: ImageAsset;
  displayOrder: number;
}

/** Colección: src/content/gallery/*.yaml */
interface GalleryItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  images: ImageAsset[];         // mínimo 1
  isFeatured: boolean;          // aparece en la home
  completedAt: string;          // ISO date
}

interface ImageAsset {
  src: string;
  alt: string;                  // obligatorio (accesibilidad + SEO)
}

/** Singleton: src/content/settings.yaml */
interface SiteSettings {
  businessName: string;
  whatsappNumber: string;       // formato E.164 sin '+', ej. 5493511234567
  whatsappDefaultMessage: string;
  instagramHandle: string;      // sin '@'
  serviceArea: string;          // "Godoy Cruz, Mendoza"
  address?: string;             // pendiente; si está vacío, no se renderiza
  openingHours?: string;        // pendiente; si está vacío, no se renderiza
  yearsOfExperience: number;    // 10 → "+10 años"
}
```

### Casos borde de contenido
- **Galería vacía** (fotos aún no disponibles): la home oculta la sección de destacados; `/galeria` muestra un estado vacío con CTA a Instagram.
- **Dirección/horarios vacíos:** se omiten en footer y en JSON-LD (no se publican campos vacíos a Google).

## 5. Contratos de funciones núcleo

```ts
// src/lib/whatsapp.ts
/**
 * @throws InvalidPhoneNumberError si el número no cumple E.164 (sin '+', 8–15 dígitos).
 */
function buildWhatsAppUrl(phoneNumber: string, message: string): URL;

// src/lib/seo.ts
/** Genera JSON-LD schema.org/LocalBusiness para SEO local. */
function buildLocalBusinessSchema(settings: SiteSettings): Record<string, unknown>;
```

- La validación del número se ejecuta en **build time**: un número inválido rompe el build (fail-fast) en vez de publicar links rotos.
- WhatsApp en Argentina exige el `9` de celular tras el código país: el número +54 261 625-6467 se almacena como `5492616256467`.
- Keystatic valida campos obligatorios (`alt`, `title`, etc.) antes de guardar.

## 6. Configuración y entorno

Variables (en Vercel, nunca en el repo):

| Variable | Uso |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | OAuth de la GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | OAuth de la GitHub App |
| `KEYSTATIC_SECRET` | Firma de sesión |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Identificador público de la App |
| `PUBLIC_SITE_URL` | URL canónica (sitemap, OG, JSON-LD) |

En desarrollo, Keystatic usa almacenamiento `local` (sin credenciales).

## 7. Requisitos no funcionales

- **Rendimiento:** Lighthouse ≥ 95 en mobile; LCP < 2.5 s.
- **SEO local:** títulos/descripciones por página, JSON-LD `LocalBusiness`, sitemap, Open Graph.
- **Accesibilidad:** WCAG 2.1 AA (contraste, foco visible, `alt` obligatorio).
- **Mobile-first:** la mayoría del tráfico llega desde Instagram en celular.

## 8. Estructura de carpetas

```
src/
  components/
    hero/
      ServiceHero.astro      # markup, estilos y posters de respaldo
      hero-controller.ts     # estado de la ruleta, DOM, teclado, #hash, carga diferida del 3D
      showroom/              # Three.js (chunk diferido)
        showroom.ts          # renderer, cámara/encuadre, ruleta, animación, ciclo de vida
        dioramas/            # car.ts · storefront.ts · house.ts · common.ts (pedestal, helpers)
        materials.ts · environment.ts · textures.ts · geometry.ts · motion.ts · types.ts
  assets/brand/     # logo
  assets/hero/posters/  # PNG generados del 3D (npm run posters)
  config/site.ts    # datos del negocio (provisorio hasta Keystatic)
  data/hero-slides.ts
  layouts/ · pages/ · lib/ · styles/
scripts/render-posters.mjs  # genera los posters con Chrome/Edge headless (CHROME_PATH)
```

## 9. Sistema de diseño (v2 — showroom 3D)

- Todos los valores visuales viven como **custom properties en `src/styles/tokens.css`** (un único archivo para cambiar tipografía o paleta).
- Fuentes self-hosted (`@fontsource-variable`), sin Google Fonts.
- Recursos de marca en `src/assets/brand/`.

### 9.1 Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0c0f13` | Vidrio polarizado (grafito azulado, no negro plano) |
| `--color-surface` | `#1a1e24` | Superficies/controles |
| `--color-ink` | `#eef1f4` | Texto principal (cromo) |
| `--color-ink-muted` | `#a9b0b9` | Texto secundario (8.5:1 sobre bg) |
| `--color-brand-red` | `#e3262b` | Rojo del logo: **como luz** (rim light, LED de pedestales) y CTA |
| `--color-cta` | `#d91f26` | Fondo del CTA (texto blanco ≥ 5:1) |
| `--color-accent-ink` | `#ff5a5f` | Rojo para texto/foco sobre fondo oscuro |

### 9.2 Tipografía

- **Archivo Variable** (una sola familia, dos anchos):
  - Display: `wdth 125` · `wght 800` — ancha y rellena, lenguaje automotriz.
  - Texto: `wdth 100` · `wght 400/500`.
- Escala 1.25; display máx. 6rem; tracking mínimo −0.03em; títulos escalan según largo (`--title-chars`).

### 9.3 Principios

1. **Un solo momento memorable:** el showroom 3D. El resto (texto, nav, controles) es sobrio.
2. **El vidrio es el tema, no la decoración:** polarizado, espejado y esmerilado se renderizan físicamente (PBR); la UI no usa glassmorphism.
3. **El rojo es luz:** aparece en rim lights, anillos LED y el CTA; no se reparte en adornos.
4. **Nada tapa el producto:** el texto y los CTA viven en su propia zona; el diorama destacado se encuadra en la zona libre.

Revisión contra defaults genéricos: se eliminan eyebrow en mayúsculas con tracking, separadores "·", flechas "→" en botones y la serif fina de la v1.

## 9.4 Hero "Showroom 3D" (home) — reemplaza al switcher 2D

### Layout

```
Desktop / tablet                                      Mobile
┌──────────────────────────────────────────────┐     ┌──────────────────┐
│ ◉ crisur polarizados   Autos Locales Hogares ☐│     │ ◉ crisur      ☰  │
├──────────────────────────────────────────────┤     ├──────────────────┤
│              Polarizado para                 │     │ Polarizado para  │
│                  AUTOS                       │     │      AUTOS       │
│     Privacidad, menos calor y protección…    │     │  Privacidad, …   │
│   [ ◯ Consultar por WhatsApp ] [ Trabajos ]  │     │ [◯ Consultar  ]  │
│                                              │     │   Ver trabajos   │
│ ‹ Locales      ▄▆█ AUTO 3D █▆▄      Hogares › │     │‹   ▄▆█ 3D █▆▄  › │
│   (diorama)      (pedestal LED)    (diorama) │     │  Locales Hogares │
└──────────────────────────────────────────────┘     └──────────────────┘
```

- `.stage` = columna flex, `min-height: max(100svh, 640px)`: copy arriba, **zona de showroom** abajo (`flex: 1`). El canvas WebGL cubre todo el stage (fondo con niebla), pero la cámara encuadra el diorama destacado **dentro de la zona de showroom** (`setViewOffset`), así nunca queda debajo del texto ni del CTA.

### Ruleta (orden fijo, cíclico)

`['locales', 'autos', 'hogares']` → al cargar: **Locales izquierda · Autos centro · Hogares derecha**. Los 3 dioramas están sobre un anillo a 120°; elegir uno lateral **rota el anillo** por el camino más corto.

| `ServiceId` | Título | Diorama 3D | Técnicas visibles |
|---|---|---|---|
| `locales` | LOCALES | Frente comercial con vidriera y puerta | Polarizado + banda esmerilada + puerta espejada |
| `autos` | AUTOS | Sedán 0 km (proporciones Fiat Cronos) blanco perlado | Vidrios polarizados, pintura con clearcoat |
| `hogares` | HOGARES | Casa moderna de dos plantas | Ventanales espejados + vidrios esmerilados con luz interior |

### Contratos

```ts
// src/components/hero/showroom/types.ts
interface ShowroomOptions {
  order: readonly ServiceId[];
  initial: ServiceId;
  reducedMotion: boolean;
  getFramingZone(): FramingZone;          // px relativos al canvas
  onSelect(id: ServiceId): void;          // tap/click sobre un diorama lateral
}
interface FramingZone { top: number; bottom: number }
interface ScreenAnchor { x: number; y: number; visible: boolean }
interface Showroom {
  show(id: ServiceId): void;              // rota la ruleta; idempotente
  getAnchors(): ReadonlyMap<ServiceId, ScreenAnchor>;
  dispose(): void;                        // libera geometrías, materiales, texturas, contexto
}
function createShowroom(canvas: HTMLCanvasElement, options: ShowroomOptions): Showroom;
// @throws WebGLUnavailableError → el hero mantiene los posters estáticos
```

### Animación

| Momento | Qué pasa | Duración |
|---|---|---|
| Entrada | Cámara desde lejos y en altura **se acerca** al destacado; el anillo gira a su lugar; los LED de los pedestales se encienden en secuencia; el copy se revela en paralelo | ~2.6 s |
| Cambio de servicio | El anillo rota 120°; la cámara retrocede y vuelve a acercarse (dolly) | ~1.3 s |
| Reposo | El destacado gira suave (±12°); un barrido de luz recorre los vidrios | continuo |
| `prefers-reduced-motion` | Sin entrada, sin reposo; cambio instantáneo | — |

### Interacción y accesibilidad

- Controles: botones ‹ › , etiquetas laterales (botones anclados a la proyección 3D de cada pedestal), nav, teclado ←/→ dentro del hero, swipe horizontal, click en el diorama.
- `aria-live="polite"` anuncia el servicio mostrado; canvas `aria-hidden` (la información vive en el texto).
- Deep link por `#hash` (`/#hogares`).

### Rendimiento

- Three.js se carga **diferido** (import dinámico) después del primer render; el HTML inicial ya muestra texto + poster.
- `pixelRatio ≤ 2` (≤ 1.5 en mobile), sombras 1024–2048 según dispositivo, render pausado fuera de viewport o con la pestaña oculta, `dispose()` completo.
- Respaldo estático (posters PNG generados del mismo 3D con `npm run posters`) cuando: no hay WebGL, falla la descarga del chunk 3D, o JavaScript está desactivado. Con 3D activo los posters no se descargan (`display:none` + `loading="lazy"`).
- Presupuesto medido: JS inicial ≈ 5 KB; chunk 3D ≈ 580 KB sin comprimir (~150 KB gzip), cargado en `requestIdleCallback`.
- Shaders precompilados (`compileAsync`) antes del primer frame; animaciones por tiempo real (no por frame) para terminar a tiempo en equipos lentos.

### Verificación realizada

- `tsc --noEmit` y `astro check`: 0 errores.
- Capturas headless (Edge + SwiftShader) en 1920, 1440, 1366, tablet 820×1180, teléfono 390×844 y horizontal 844×390; los tres servicios destacados, entrada animada, giro de la ruleta a mitad de animación y respaldo sin WebGL.

## 10. Operación

- **Administrador del contenido:** el hijo del dueño, con su cuenta de GitHub (login del panel Keystatic).
- **Dominio:** no hay aún. Se publica en el subdominio de Vercel (`*.vercel.app`); al registrar el dominio (ej. `.com.ar` vía NIC Argentina) solo cambia `PUBLIC_SITE_URL` y la config DNS.

## 11. Pendientes

| Ítem | Responsable | Bloquea |
|---|---|---|
| Logo vectorial (SVG/PNG alta resolución) | Cliente | Nada (se usa el JPEG recibido, recortado en círculo) |
| Confirmar paleta derivada del logo (§9.1) | Cliente | Nada |
| Diseño de las secciones siguientes | Cliente | Resto de la home |
| Probar el 3D en celulares reales (gama media) | Cliente | Ajuste fino de calidad/rendimiento |
| Dirección exacta | Cliente | Footer, JSON-LD (no bloquea build) |
| Horarios | Cliente | Footer, JSON-LD (no bloquea build) |
| Fotos de trabajos | Cliente | Galería (no bloquea build) |
| Dominio | Cliente | Nada en v1 |
