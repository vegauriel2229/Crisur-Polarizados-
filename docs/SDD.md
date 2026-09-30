# Crisur — Software Design Document

> Estado: **v0.7 — Inicio con moneda + selector, carrusel de trabajos** · Última actualización: 2026-09-30
>
> v0.7 (pedido del cliente): el inicio deja de abrir en Autos. Ahora muestra el logo como una moneda que se lanza una vez al entrar (el logo en las dos caras), las redes, el selector de los tres servicios (diseño 2D de vidrio) y "Sobre nosotros". Cada página de servicio suma un carrusel de trabajos que se llena solo desde `src/assets/gallery/<servicio>/`. Las escenas 3D pasan a objetos claros (auto perla, hormigón claro). Se eliminan la ruleta del hero y las tarjetas de servicio de la home (§9.4).
>
> v0.6 agrega `/autos`, `/hogares` y `/negocios`, cada una con una escena 3D que aplica la lámina mientras se scrollea (§12), header y footer compartidos, secciones institucionales en la home y 404. "Locales" pasa a llamarse **Negocios** (pedido del usuario, 2026-09-30).
> v0.5 reemplazó el showroom 3D (v0.4, commit `07b90f7`) por el selector de vidrio SVG + CSS de la home, que se mantiene.

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
| `/` | Moneda con el logo (se lanza al entrar), redes, selector de los 3 servicios (→ página de cada uno), sobre nosotros, tipos de lámina, cómo trabajamos, preguntas frecuentes, CTA final (§9.4) |
| `/autos` | Escena 3D del auto (§12) + técnicas, preguntas frecuentes, CTA, portal a Hogares |
| `/hogares` | Escena 3D de la casa (§12) + técnicas, preguntas frecuentes, CTA, portal a Negocios |
| `/negocios` | Escena 3D del frente comercial (§12) + técnicas, preguntas frecuentes, CTA, portal a Autos |
| `/galeria` | Pendiente: sin fotos de trabajos todavía (hoy "Ver trabajos" lleva a Instagram) |
| `/keystatic` | Pendiente (Keystatic todavía no está integrado) |
| `/404` | Página no encontrada |

Elementos globales: header con navegación (`SiteHeader`), footer con contacto (`SiteFooter`), botón flotante de WhatsApp.

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
/** Genera JSON-LD schema.org/LocalBusiness para SEO local. Omite url/image si no hay dominio. */
function buildLocalBusinessSchema(
  settings: SiteSettings,
  links: { site: URL | undefined; image: URL | undefined; instagram: string },
): Record<string, unknown>;
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
| `PUBLIC_SITE_URL` | URL canónica (sitemap, OG, JSON-LD). Si falta, se usa `VERCEL_PROJECT_PRODUCTION_URL` (Vercel la define sola); sin ninguna, se omiten canonical, `og:image` y el sitemap queda vacío |

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
    layout/
      SiteHeader.astro · site-header.ts   # header compartido + menú mobile
      SiteFooter.astro · WhatsAppFab.astro
    home/                    # HomeHero (moneda + redes + selector), CoinLogo + coin.ts, AboutSection,
                             # FilmTypesSection, ProcessSection, HomeFaqSection
    service-story/
      ServiceStory.astro     # escena fija + capítulos + portal (§12)
      story-controller.ts    # scroll, índice, contador, carga diferida de la escena
      ServiceDetails.astro   # beneficios + preguntas frecuentes
      WorkGallery.astro      # carrusel de trabajos (o aviso mientras no hay fotos)
    film-scene/              # motor 3D (§12): engine, studio, film-glass, camera-path, geometry, architecture
      scenes/                # car.ts · house.ts · storefront.ts
    ServiceArt.astro         # ilustración SVG de cada servicio + capa de lámina animable
    Faq.astro · Icon.astro
  assets/brand/     # logo
  config/site.ts    # datos del negocio (provisorio hasta Keystatic)
  data/services.ts  # contenido de los 3 servicios (hero, tarjetas, capítulos, preguntas)
  data/home.ts      # pasos, tipos de lámina y preguntas de la home
  data/gallery.ts   # fotos de trabajos por servicio (desde assets/gallery/<servicio>/)
  assets/gallery/   # autos/ · hogares/ · negocios/: acá van las fotos del carrusel
  lib/whatsapp.ts · lib/seo.ts
  layouts/BaseLayout.astro  # <head>: meta, Open Graph, canonical, JSON-LD, preload de fuente
  pages/index.astro · pages/[service].astro · pages/404.astro · pages/robots.txt.ts · pages/sitemap.xml.ts
  styles/
public/og-image.jpg  # vista previa al compartir (captura del hero, 1200×630)
```

## 9. Sistema de diseño (v3 — vidrio y lámina)

- Todos los valores visuales viven como **custom properties en `src/styles/tokens.css`** (un único archivo para cambiar tipografía o paleta, incluidos los colores de las láminas).
- Fuentes self-hosted (`@fontsource-variable`), sin Google Fonts.
- Recursos de marca en `src/assets/brand/`.

### 9.1 Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0c0f13` | Vidrio polarizado (grafito azulado, no negro plano) |
| `--color-surface` | `#1a1e24` | Superficies/controles |
| `--color-ink` | `#eef1f4` | Texto principal (cromo) |
| `--color-ink-soft` | `#c9cfd6` | Bajadas y resúmenes (entre ink e ink-muted) |
| `--color-ink-muted` | `#a9b0b9` | Texto secundario (8.5:1 sobre bg) |
| `--color-brand-red` | `#e3262b` | Rojo del logo: **como luz** (brillo bajo la ventana destacada) y CTA |
| `--color-cta` | `#d91f26` | Fondo del CTA (texto blanco ≥ 5:1) |
| `--color-accent-ink` | `#ff5a5f` | Foco visible y borde de la espátula (los íconos van en tinta) |
| `--film-*` | ver `tokens.css` | Rellenos de lámina: `tint` (polarizado), `mirror` (espejado), `frost` (esmerilado), `clear` (vidrio sin lámina) |

### 9.2 Tipografía

- **Archivo Variable** (una sola familia, dos anchos):
  - Display: `wdth 125` · `wght 820` — ancha y rellena, lenguaje automotriz.
  - Texto: `wdth 100` · `wght 400/500`.
- Tamaños fluidos con `clamp()` (sin escala modular fija); display máx. 6rem; tracking mínimo −0.03em; el título escala según su largo (`--title-chars`).

### 9.3 Principios

1. **Un solo momento memorable:** la lámina que se aplica sobre la ventana elegida. El resto es sobrio.
2. **El vidrio es el tema:** los marcos translúcidos con blur existen porque el producto es vidrio; no se usa glassmorphism como adorno en otras superficies (las tarjetas son sólidas).
3. **El rojo es luz:** brillo bajo la ventana destacada, borde de la espátula y CTA; no se reparte en adornos.
4. **Nada inventado:** sin cifras técnicas, fotos ni testimonios falsos (ver `PRODUCT.md`).

## 9.4 Inicio (v0.7) — reemplaza a la ruleta y a las tarjetas de v0.5

```
┌──────────────────────────────────────────────┐
│ ◉ crisur polarizados  Autos Hogares Negocios Nosotros ◎ [Consultar] │
├──────────────────────────────────────────────┤
│                 ( moneda )                   │   logo en las dos caras; se lanza una vez al entrar
│   Polarizados para autos, hogares y negocios │   h1
│   Más de 10 años … Elegí qué querés …        │
│        [ WhatsApp ]  [ @crisur2026 ]         │
│            ¿Qué querés polarizar?            │
│   [ Autos ]     [ Hogares ]    [ Negocios ]  │   ventanas de vidrio → /autos …
├──────────────────────────────────────────────┤
│ Sobre nosotros · Una lámina para cada vidrio · Cómo trabajamos · Preguntas + cierre │
└──────────────────────────────────────────────┘
```

### Contratos

```ts
// src/components/home/CoinLogo.astro + coin.ts
// Sin props. role="img" con aria-label "Logo de Crisur Polarizados"; no es interactiva (pedido del cliente).
function tossOnce(coin: HTMLElement): void;   // un solo lanzamiento de 2,8 s a los 300 ms de cargar
// prefers-reduced-motion: sin lanzamiento, la moneda queda quieta mostrando el logo.

// src/components/home/HomeHero.astro
interface Props { whatsappUrl: string }                    // slot "header" = SiteHeader
// Opciones = getService() en el orden del recorrido: autos, hogares, negocios.
// Cada opción es un <a> con view-transition-name: portal-<id> (se convierte en la escena de su página).

// src/components/home/AboutSection.astro — id="nosotros" (link "Nosotros" del menú: /#nosotros)
```

- La moneda es gráfica plana en 3D (CSS `preserve-3d`): el logo en las dos caras y un canto de 12 discos apilados. Motion anima `rotateX` (2 vueltas parejas) e `y` (salto bajo, 0,3 del diámetro para no tocar el header: sube frenando, cae acelerando, un rebote) y la sombra.
- "Sobre nosotros" usa solo hechos confirmados (negocio familiar, +10 años, Godoy Cruz, todas las láminas y tonos, atención por WhatsApp).

## 10. Operación

- **Administrador del contenido:** el hijo del dueño, con su cuenta de GitHub (login del panel Keystatic).
- **Dominio:** no hay aún. Se publica en el subdominio de Vercel (`*.vercel.app`); al registrar el dominio (ej. `.com.ar` vía NIC Argentina) solo cambia `PUBLIC_SITE_URL` y la config DNS.

## 11. Pendientes

| Ítem | Responsable | Bloquea |
|---|---|---|
| Logo vectorial (SVG/PNG alta resolución) | Cliente | Nada (se usa el JPEG recibido, recortado en círculo) |
| Confirmar paleta derivada del logo (§9.1) | Cliente | Nada |
| Diseño de las secciones siguientes | Cliente | Resto de la home |
| Dirección exacta | Cliente | Footer, JSON-LD (no bloquea build) |
| Horarios | Cliente | Footer, JSON-LD (no bloquea build) |
| Fotos de trabajos | Cliente | Carrusel de cada servicio: se copian en `src/assets/gallery/<servicio>/` (no bloquea build; mientras tanto, aviso con link a Instagram) |
| Cifras técnicas de las láminas (UV, calor) | Cliente | Nada: hoy se publican beneficios sin cifras |
| `og-image.jpg` con foto real (1200×630) | Cliente | Nada: hoy es una captura del hero |
| Dominio | Cliente | Nada en v1 |
| Confirmar los pasos de "Cómo trabajamos" y las preguntas frecuentes (`src/data/home.ts`, `faq` en `services.ts`) | Cliente | Nada: son textos generales, sin plazos ni precios |
| Confirmar si la colocación en casas y negocios es a domicilio | Cliente | Nada: hoy el texto dice "coordinamos el turno" |

## 12. Páginas de servicio con escena 3D (v0.6)

Una página por servicio (`src/pages/[service].astro`, `getStaticPaths` sobre `services`). La escena se recorre con el scroll y aplica la lámina ventana por ventana. Dirección de diseño: `.impeccable/surfaces/src-pages-service-astro.md`; reglas visuales: `DESIGN.md` (The Film Scene Rule).

### Estructura de la página

```
<ServiceStory>                           track de 6 × 100svh
  viewport (sticky, 100svh)              canvas 3D · ilustración de respaldo · contador · índice
  beats (margin-top: -100svh)            portada · 4 capítulos · cierre (CTA + portal)
<ServiceDetails>                         beneficios · preguntas frecuentes · CTA
```

- Progreso del scroll (0–1) = posición en el track (`scroll()` de Motion, offset `start start` → `end end`). Cada capítulo empieza en un múltiplo de 0,2: los encuadres de cámara están en 0, 0,2, 0,4, 0,6, 0,8 y 1.
- `ServiceStory` exige exactamente `STORY_CHAPTER_COUNT` (4) capítulos: falla el build si no (las escenas están coreografiadas para esa cantidad).

### Contratos

```ts
// src/data/services.ts (se suma a §9.4)
interface StoryChapter { id: string; indexLabel: string; title: string; text: string }   // id = ancla (#privacidad)
interface FaqItem { question: string; answer: string }
interface Service {
  // …campos de §9.4
  page: { title: string; description: string };   // <title> y meta de /{id}
  story: readonly StoryChapter[];                  // 4 capítulos: vidrio original, lámina, 2 beneficios
  closing: { title: string; text: string };        // cierre con CTA
  faq: readonly FaqItem[];
}
function getService(id: ServiceId): Service;       // @throws Error si no existe (build time)
function nextServiceOf(id: ServiceId): Service;    // recorrido autos → hogares → negocios → autos

// src/components/film-scene/types.ts
interface CameraKeyframe { at: number; position: Vec3; target: Vec3; shift?: number }  // shift: corre el objeto en pantalla (fracción del ancho)
interface FilmPane { glass: FilmGlass; window: readonly [start: number, end: number] } // tramo del progreso en que la espátula cruza el vidrio
interface SceneModel {
  root: Object3D;
  panes: readonly FilmPane[];
  camera: { landscape: readonly CameraKeyframe[]; portrait: readonly CameraKeyframe[] };
  update(progress: number): void;                // efectos propios (luz interior, grieta); sin asignar objetos
  dispose(): void;
}
type SceneFactory = (context: { environment: Texture; quality: 'high' | 'low' }) => SceneModel;

// src/components/film-scene/film-glass.ts
function createFilmGlass(kind: 'tint' | 'mirror' | 'frost', axis: { direction: Vec3; from: number; to: number }): FilmGlass;
interface FilmGlass { kind; material: MeshPhysicalMaterial; setCoverage(value: number): void; setBacklight(value: number): void }

// src/components/film-scene/engine.ts
function createFilmScene(canvas: HTMLCanvasElement, factory: SceneFactory, options: {
  mood: 'studio' | 'dusk'; quality: 'high' | 'low'; reducedMotion: boolean;
  shadow: { width: number; depth: number; opacity: number }; onContextLost(): void;
}): { setProgress(progress: number): void; dispose(): void };
// @throws WebGLUnavailableError → queda la ilustración SVG (data-scene="fallback")
```

### Escenas

| Servicio | Módulo | Láminas (tramo del progreso) | Extra |
|---|---|---|---|
| Autos | `scenes/car.ts` (`studio`) | Laterales traseras 0,27–0,36 · delanteras 0,35–0,45 · luneta 0,47–0,57. El parabrisas queda limpio | El tapizado brilla cálido hasta que la lámina lo tapa |
| Hogares | `scenes/house.ts` (`dusk`) | Ventanal del living (espejado) 0,27–0,39 · ventana de arriba (espejado) 0,35–0,47 · baños y paño lateral (esmerilado) 0,47–0,59 | El esmerilado deja pasar la luz del interior |
| Negocios | `scenes/storefront.ts` (`dusk`) | Vidriera (polarizado) 0,27–0,38 · puerta (espejado) 0,36–0,44 · banda y oficina (esmerilado) 0,46–0,58 | Grieta de la lámina de seguridad 0,70–0,76: el vidrio se raja pero no cae |

### Comportamiento y rendimiento

- **Carga diferida:** Three.js y el modelo se descargan después de que la página ya es usable (chunk por escena). Mientras tanto, el contador de carga (0–100 %) avanza por etapas reales: motor, modelo, primer cuadro.
- **Render a demanda:** solo se dibuja cuando cambia el scroll o el tamaño; la escena alcanza al scroll con amortiguación (sin loop permanente, sin gastar batería en reposo).
- **Calidad:** equipos con ≤ 4 núcleos o pantalla chica usan resolución ≤ 1,5× y menos geometría.
- **Vertical (< 0,9 de aspecto):** otro juego de encuadres, cámara más abierta (fov 50) y el objeto corrido hacia arriba para dejar el texto abajo.
- **Movimiento reducido:** la cámara queda fija en el encuadre de portada; la lámina igual sigue al scroll (cambio de estado, no movimiento).
- **Sin WebGL / sin JS / contexto perdido:** queda `ServiceArt` con la lámina aplicada.
- **Portal:** View Transitions entre documentos (`@view-transition { navigation: auto }`); la ventana del portal y la escena de la página siguiente comparten `view-transition-name: portal-<id>`. Navegadores sin soporte navegan normal.

### Carrusel de trabajos (v0.7)

```ts
// src/data/gallery.ts
interface GalleryPhoto { src: ImageMetadata; alt: string }
function galleryFor(service: ServiceId): readonly GalleryPhoto[];
// import.meta.glob('../assets/gallery/*/*.{jpg,jpeg,png,webp,avif}') en build time.
// Orden = nombre de archivo (numérico); alt = nombre sin número ni extensión ("02-auto-negro.jpg" → "Auto negro").

// src/components/service-story/WorkGallery.astro
interface Props { service: Service }
// Con fotos: carrusel nativo (scroll-snap, rueda, swipe y teclado sin JS) + flechas que avanzan de a una foto.
// Sin fotos: aviso con la ilustración del servicio y el botón a Instagram.
```
