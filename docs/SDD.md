# Crisur — Software Design Document

> Estado: **v0.5 — Selector de vidrio + sección Servicios** · Última actualización: 2026-09-28
>
> v0.5 reemplaza el showroom 3D (v0.4, recuperable en el commit `07b90f7`) por un selector de ventanas de vidrio dibujadas con SVG + CSS, y agrega la sección de servicios.

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
      ServiceHero.astro      # header, copy por servicio y selector de ventanas (tablist)
      hero-controller.ts     # estado del selector, teclado, swipe, #hash, menú mobile
    services/
      ServicesSection.astro  # grilla de tarjetas de servicio
    ServiceArt.astro         # ilustración SVG de cada servicio + capa de lámina animable
    Icon.astro               # íconos SVG (WhatsApp, Instagram, beneficios)
  assets/brand/     # logo
  config/site.ts    # datos del negocio (provisorio hasta Keystatic)
  data/services.ts  # contenido de los 3 servicios (hero + tarjetas)
  layouts/ · pages/ · lib/ · styles/
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
- Escala 1.25; display máx. 6rem; tracking mínimo −0.03em; títulos escalan según largo (`--title-chars`).

### 9.3 Principios

1. **Un solo momento memorable:** la lámina que se aplica sobre la ventana elegida. El resto es sobrio.
2. **El vidrio es el tema:** los marcos translúcidos con blur existen porque el producto es vidrio; no se usa glassmorphism como adorno en otras superficies (las tarjetas son sólidas).
3. **El rojo es luz:** brillo bajo la ventana destacada, borde de la espátula y CTA; no se reparte en adornos.
4. **Nada inventado:** sin cifras técnicas, fotos ni testimonios falsos (ver `PRODUCT.md`).

## 9.4 Hero "Selector de vidrio" (home) — reemplaza al showroom 3D

### Layout

```
Desktop / tablet                                      Mobile
┌──────────────────────────────────────────────┐     ┌──────────────────┐
│ ◉ crisur polarizados   Locales Autos Hogares ☐│     │ ◉ crisur      ☰  │
├──────────────────────────────────────────────┤     ├──────────────────┤
│              Polarizado para                 │     │ Polarizado para  │
│                  AUTOS                       │     │      AUTOS       │
│     Privacidad, menos calor y protección…    │     │  Privacidad, …   │
│   [ ◯ Consultar por WhatsApp ] [ Trabajos ]  │     │ [◯ Consultar  ]  │
│                                              │     │   Ver trabajos   │
│  ┌──────┐   ┌────────────────┐   ┌──────┐    │     │┐ ┌────────────┐ ┌│
│  │local │   │  AUTO + lámina │   │ casa │    │     ││ │AUTO+lámina │ ││
│  └──────┘   └────────────────┘   └──────┘    │     │┘ └────────────┘ └│
│   Locales     Autos (brillo rojo)  Hogares   │     │      Autos       │
└──────────────────────────────────────────────┘     └──────────────────┘
```

- `.stage` = columna flex, `min-height: max(100svh, 640px)`: copy arriba, selector abajo (`flex: 1`).
- Las 3 ventanas comparten la misma celda de grid; su lugar (izquierda/centro/derecha) es un `transform` según `data-pos`. En mobile las laterales asoman desde los bordes.

### Ruleta (orden fijo, cíclico)

`['locales', 'autos', 'hogares']` → al cargar: **Locales izquierda · Autos centro · Hogares derecha**. Elegir una lateral la trae al centro y las otras rotan un lugar.

| `ServiceId` | Ilustración | Láminas dibujadas |
|---|---|---|
| `locales` | Frente comercial con vidriera y puerta | Vidriera polarizada + banda esmerilada + puerta espejada |
| `autos` | Sedán de perfil | Ventanillas polarizadas |
| `hogares` | Casa moderna de dos plantas | Ventanales espejados + ventanas esmeriladas |

### Contratos

```ts
// src/data/services.ts
type ServiceId = 'locales' | 'autos' | 'hogares';
type Treatment = 'polarizado' | 'espejado' | 'esmerilado' | 'seguridad';
type BenefitKind = 'heat' | 'privacy' | 'uv' | 'security';
interface Benefit { kind: BenefitKind; title: string; text: string }
interface Service {
  id: ServiceId;
  navLabel: string;
  hero: { titlePrefix: string; title: string; lede: string };   // h1 en dos líneas (prefijo + palabra display) + bajada
  summary: string;                                          // párrafo de la tarjeta
  treatments: readonly Treatment[];
  benefits: readonly Benefit[];
  whatsappMessage: string;
  ctaLabel: string;
  photo?: { src: ImageMetadata; alt: string };             // foto real: reemplaza a la ilustración en hero y tarjeta
}
const services: readonly Service[];      // orden = orden de la ruleta
const initialServiceId: ServiceId;

// src/components/ServiceArt.astro
interface Props { service: ServiceId; uid: string }        // uid: prefijo único de ids SVG (clipPath/gradientes)
// API de estilo: --film ∈ [0, 1] (heredable, registrada con @property) = cuánto de la lámina está aplicada.

// src/components/hero/ServiceHero.astro
interface Props { services: readonly Service[]; initial: ServiceId; whatsappNumber: string;
                  defaultWhatsappMessage: string; instagramUrl: string }
// @throws Error si services.length !== 3 o `initial` no existe (build time).

// src/components/services/ServicesSection.astro
interface Props { services: readonly Service[]; whatsappNumber: string; yearsOfExperience: number; serviceArea: string }
```

### Animación

| Momento | Qué pasa | Duración |
|---|---|---|
| Entrada | Copy sube y se enfoca; las ventanas aparecen (centro primero); la espátula aplica la lámina en la ventana central | ~1.9 s |
| Cambio de servicio | Las ventanas se deslizan a su nuevo lugar; la saliente pierde la lámina, la nueva destacada la recibe; el copy hace crossfade | ~1.6 s |
| Tarjetas (hover/foco) | La lámina, detenida a mitad de camino, termina de aplicarse | 0.9 s |
| `prefers-reduced-motion` | Sin entrada ni deslizamientos; cambio instantáneo | — |

- La lámina se mueve con una sola variable CSS (`--film`), registrada con `@property` para que sea animable. Sin JS de animación: el JS solo cambia `data-pos`.

### Interacción y accesibilidad

- Selector = `role="tablist"`; cada ventana es un `role="tab"` que controla el copy (`role="tabpanel"`). Tabindex móvil: solo la ventana elegida entra en el orden de tabulación; ←/→ cambian de servicio.
- Otros controles: click/tap en una lateral, swipe horizontal, links del nav, deep link por `#hash` (`/#hogares`).
- `aria-live="polite"` anuncia el servicio mostrado. Las ilustraciones son `aria-hidden` (la información vive en el texto).

### Rendimiento

- Sin dependencias de runtime: SVG inline + CSS; JS del hero ≈ 2 KB.
- Solo se animan `transform`, `opacity`, `filter` y `--film` (que termina en un `transform`). `backdrop-filter` solo en las 3 ventanas del hero.

## 9.5 Sección "Servicios" (home, debajo del hero)

- `id="servicios"`. Encabezado: h2 con el aval de años (`yearsOfExperience`) + párrafo de alcance (`serviceArea`).
- Grilla de 3 tarjetas (1 columna < 900 px, 3 columnas ≥ 900 px). Cada tarjeta: ilustración con la lámina aplicada a medias (o `photo` si existe), técnicas (chips), resumen, 4 beneficios con ícono (calor, privacidad, UV, seguridad) y CTA a WhatsApp con el mensaje del servicio.
- Copy provisorio y **sin cifras** (decisión del cliente). Crisur coloca láminas de seguridad (confirmado).

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
| Fotos de trabajos | Cliente | Galería; foto por servicio en hero y tarjetas vía `Service.photo` (no bloquea build) |
| Cifras técnicas de las láminas (UV, calor) | Cliente | Nada: hoy se publican beneficios sin cifras |
| Dominio | Cliente | Nada en v1 |
