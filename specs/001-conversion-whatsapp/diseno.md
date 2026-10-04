# Spec 001 — Conversión a WhatsApp · Diseño

**Estado:** APROBADO (2026-10-04) · **Versión:** 4 · **Basado en:** requisitos v2

> **v4 (2026-10-04):** el observer del flotante usa `rootMargin: '-1px 0px'` para que la adyacencia por borde no cuente como visible (D-071, D-072). El resto no cambia respecto de v3.
>
> **v3 (2026-10-04):** la respuesta de la FAQ "¿Hacen autos, casas y negocios?" suma el ploteo (D-061, D-063). El resto no cambia respecto de v2.
>
> **v2 (2026-10-04):** el protocolo de Lighthouse usa 5 corridas en `/` (D-048) y define qué hacer si `/` no pasa (D-049). El resto no cambia respecto de v1 (APROBADO 2026-10-03).

> Fuentes: `requisitos.md` (APROBADO 2026-10-03), `decisiones.md` (D-001 a D-039, todas del usuario), el relevamiento técnico del `arquitecto` y las opciones visuales del `disenador-ui` (2026-10-03), y el código del commit `405f6e0`. Las referencias `archivo:línea` apuntan al código **actual** (antes de implementar). Los pendientes que surgieron al redactar (PD-1 a PD-10) los resolvió el usuario en D-033 a D-039.

## Resumen de la solución
Cada página arma una sola vez su URL de WhatsApp (mensaje general o del servicio) y la pasa por props, ahora también a las 3 secciones del inicio que no tenían acción. Esas secciones, la 404 y los 2 botones que cambian de etiqueta usan un componente nuevo, `WhatsAppButton`. Las etiquetas de D-006 viven en `src/data/cta.ts`. "Consultar" sale del menú hamburguesa y queda siempre visible en el header. El botón flotante pasa a ser una píldora con texto, aparece con `IntersectionObserver` cuando sale el hero o la portada (que se marcan con un atributo `data-`) y se retira en el cierre de cada servicio. Además, la portada de servicio queda sin el bloque de datos, la galería solo se renderiza si hay fotos y se aplican los textos de D-009, D-011, D-023 y D-024. No se suman dependencias.

## Decisiones aplicadas
| ID | Tema | Elección del usuario |
|---|---|---|
| D-001 | Acción en las secciones del inicio | Un CTA corto al final de cada sección |
| D-002 | Acción durante la escena de servicios | Botón flotante visible durante la escena |
| D-003 | Acción siempre visible en celular | "Consultar" fuera del menú hamburguesa, en el header |
| D-004 | Cuándo aparece el flotante | Cuando el hero o la portada salen de la pantalla |
| D-005 | Mensajes prearmados | Se reusan los actuales: el general en el inicio, la 404 y el pie; el de cada servicio en su página |
| D-006 | Criterio de etiquetas | "Consultar" en el header y el flotante · "Consultar por WhatsApp" en el cuerpo del inicio y la 404 · "Consultar por mi auto/casa/negocio" en servicios |
| D-007 | Beneficios en servicios | Capítulos + "Qué ganás con la lámina"; se quitan los datos de la portada |
| D-008 | Galería sin fotos | Se oculta hasta que haya fotos |
| D-009 | Reemplazo de "Elegí qué querés polarizar" | "¿Dónde querés colocar la lámina?" (título del selector; frases del hero y la 404 en D-023 y D-024) |
| D-010 | WhatsApp en la 404 | Acción principal; "Ir al inicio" pasa a secundaria |
| D-011, D-063 | FAQ "¿Hacen autos, casas y negocios?" | Texto literal con los tratamientos reales, más la frase del ploteo |
| D-012 | Hero a 360×640 | Medir primero (lo resuelve D-025) |
| D-013 | Prioridades | Must: R1, R2, R5 · Should: R3, R4, R6, R7, R8, R9 |
| D-014 | Supuestos | Confirmados S2, S3, S4, S6, S7, S8 y S9 |
| D-015 | Qué es el "hero" del inicio | Solo el intro (moneda, título, lede y botones); el selector no cuenta |
| D-016 | Forma del flotante | Píldora roja con glifo + "Consultar" visible, con margen para `safe-area-inset-bottom` |
| D-017 | Solapamiento del flotante | Se retira al llegar al cierre de cada servicio; en celular, los capítulos dejan aire abajo; en el inicio no se retira (aire extra al pie) |
| D-018 | Aparición del flotante | Fundido + subida de 12 px (la actual); sin animación con movimiento reducido |
| D-019 | CTA corto del inicio | Botón secundario ("ghost") con glifo de WhatsApp |
| D-020 | "Consultar" en el header | Píldora roja de 44 px: solo texto a ≤ 520 px, con glifo desde 521 px |
| D-021 | Orden de la 404 | Ilustración · título · texto · [Consultar por WhatsApp] · [Ir al inicio] · frase · Autos/Hogares/Negocios |
| D-022 | Portada de servicio sin los datos | Una columna abajo a la izquierda; el título gigante no pasa de su tamaño actual |
| D-023 | Frase del hero (R8.3) | "Elegí dónde va la lámina y mirá cómo queda." |
| D-024 | Frase de la 404 (R8.3) | "¿Dónde querés colocar la lámina?", en una línea propia sobre Autos / Hogares / Negocios |
| D-025 | Ajuste del hero en celular | Ninguno: la medición muestra que R5.3 ya se cumple |
| D-026 | Link de WhatsApp del pie | Sin cambios: es un dato de contacto y queda fuera de R4 |
| D-027 | Nombre accesible de "Consultar" | "Consultar" visible + "por WhatsApp" oculto (`.sr-only`). R4.4 se lee como "el nombre empieza con el texto visible" |
| D-028 | Flotante sin hero ni portada | Falla rápido: error en consola y el flotante no aparece |
| D-029 | Verificación | `npm run build` + checklist manual en 360/768/1024/1440 (con teclado, movimiento reducido y sin JS) + capturas con Edge; sin dependencias nuevas |
| D-030 | Medición de RNF2 | 3 corridas por página antes y después, en la misma máquina; se compara la mediana; tolerancia de −3 puntos |
| D-031 | Paquete técnico T1–T11 | Aprobado en bloque: T1, T1.b, T2, T3, T4, T6, T8, T10 y T11 (ver Arquitectura) |
| D-032 | Instagram a ≤ 520 px | Fuera de esta spec (anotado en el Anexo A de la constitución) |
| D-033 | Qué retira el flotante (PD-2) | El contenido del cierre (`.closing-copy` y el portal), no el bloque completo |
| D-034 | ¿Vuelve después del cierre? (PD-3) | Sí: reaparece cuando el contenido del cierre sale de pantalla |
| D-035 | Aire al pie (PD-4) | 5,5 rem en el pie de todas las páginas |
| D-036 | Celular en horizontal (PD-10) | Se verifica aparte a 640×360 |
| D-037 | Servidor de Lighthouse (PD-8) | `npm run preview` antes y después |
| D-038 | Tolerancia del TBT (PD-9) | Mediana de después ≤ mediana de antes + 10 % |
| D-039 | Detalles internos (PD-1, PD-5, PD-6, PD-7) | `variant` tipada + `class?`; marca de retiro opcional; el flotante toma "Consultar" de `cta.ts`; el texto de la FAQ del inicio pasa a `cta.ts` |

## Arquitectura

### Lo que no cambia
- El sitio sigue siendo estático (Astro, salida estática), sin backend ni dependencias nuevas (RNF3), con CSS propio y tokens (constitución D-007).
- **T3:** cada página arma la URL de WhatsApp una sola vez con `buildWhatsAppUrl` y la pasa por props. Los componentes nuevos no importan `siteSettings` ni `buildWhatsAppUrl`. `HomeFaqSection` (`:8`) y `SiteFooter` (`:8`) siguen armando la suya, sin cambios.

### Flujo
```
index.astro ── buildWhatsAppUrl(número, whatsappDefaultMessage) ──► URL general
  ├─► SiteHeader(whatsappUrl)                    "Consultar" fuera del <nav>            (T8)
  ├─► HomeHero(whatsappUrl)                      .intro con data-whatsapp-fab-trigger   (T6, D-015)
  ├─► AboutSection / FilmTypesSection / ProcessSection(whatsappUrl)   CTA al final      (T1.b) ← nuevo
  └─► WhatsAppFab(href)                          observa el disparador                  (T4)

[service].astro ── buildWhatsAppUrl(número, service.whatsappMessage) ──► URL del servicio
  ├─► SiteHeader · ServiceStory · ServiceDetails · WhatsAppFab   (la misma URL)
  │      ServiceStory: portada con data-whatsapp-fab-trigger · contenido del cierre con data-whatsapp-fab-retire (D-033)
  └─► WorkGallery(service, photos)               solo si galleryFor(service.id) tiene fotos  (T10)

404.astro ── URL general ──► SiteHeader · WhatsAppButton principal   (sin flotante)
```

### Módulos nuevos
| Archivo | Qué es | Origen |
|---|---|---|
| `src/components/WhatsAppButton.astro` | Botón de WhatsApp del cuerpo: un `<a class="button …">` con glifo y etiqueta, siempre con `target="_blank"` y `rel="noopener noreferrer"`. Va junto a `Icon.astro` y `Faq.astro`. Se usa en los 4 CTA nuevos (3 del inicio + 404) y en los 2 que cambian de etiqueta (`HomeHero`, `ServiceDetails`). | T1 |
| `src/data/cta.ts` | Etiquetas "Consultar" y "Consultar por WhatsApp", más el complemento oculto de D-027. | T2, D-006, D-027 |

### Componentes y archivos afectados
**`src/pages/index.astro`**
- Pasa `whatsappUrl={defaultWhatsappUrl}` (que ya arma en `:14`) a `AboutSection`, `FilmTypesSection` y `ProcessSection` (`:25-27`). Cubre T1.b, T3 y D-005.
- `WhatsAppFab` (`:31`): ya no recibe `label="Consultar por WhatsApp"`; la etiqueta sale de `cta.ts` (D-039).

**`src/components/home/HomeHero.astro`**
- `.intro` (`:21`) recibe `data-whatsapp-fab-trigger` (T6, D-015).
- El botón "WhatsApp" (`:28-31`) pasa a `WhatsAppButton` con la etiqueta "Consultar por WhatsApp" y `variant="primary"` (R4.2, T1, D-039). El de Instagram (`:32-35`) no cambia.
- Lede (`:25`): se mantiene la primera frase y la segunda pasa a "Elegí dónde va la lámina y mirá cómo queda." (D-023).
- Título del selector (`:40`): "¿Dónde querés colocar la lámina?" (D-009).
- No se ajustan tamaños ni espacios (D-025).

**`src/components/home/AboutSection.astro` · `FilmTypesSection.astro` · `ProcessSection.astro`**
- Reciben la prop nueva `whatsappUrl: string` (hoy no tienen props: `AboutSection.astro:1-11`, `FilmTypesSection.astro:1-3`, `ProcessSection.astro:1-3`).
- Al final de su contenido y dentro del `<section>` (T1.b) suman un `WhatsAppButton` "Consultar por WhatsApp" con `variant="secondary"` (ghost, D-019, D-039). La ubicación exacta y los márgenes se definen en Interfaz.

**`src/components/home/HomeFaqSection.astro`**: sin cambios de marcado; ya dice "Consultar por WhatsApp" (`:22-25`) y T1 no lo migra. Solo el texto (`:24`) pasa a `WHATSAPP_CTA_LABELS.general`: un import y una línea (D-039).

**`src/components/layout/SiteHeader.astro`**
- El enlace "Consultar" (`:42`) sale del `<nav id="site-nav">` y se ubica como hermano, entre el `<nav>` y la hamburguesa (`:43-44`) (T8, D-003). Así se ve en todos los anchos aunque no haya JS (R5.1).
- Contenido: glifo de WhatsApp (oculto a ≤ 520 px, D-020) + "Consultar" + " por WhatsApp" con `.sr-only` (D-027, `global.css:58`). El glifo ya sale con `aria-hidden` (`Icon.astro:16`).
- Estilos: las reglas `.site-nav .nav-cta` (`:143-154` y `:245-249`) se reemplazan por las del enlace nuevo, que mide 44 px de alto (D-020, R5.4) y tiene su propia regla de movimiento reducido (R5.5). Las medidas y el layout del header (que pasa de 3 a 4 hijos) se definen en Interfaz.
- El panel del menú de celular ya no incluye "Consultar", que queda a la vista en el header (T8).
- `site-header.ts` no cambia: tocar fuera del menú ya lo cierra, y eso incluye el enlace nuevo.
- Las props no cambian. El header es compartido, así que el cambio llega a las 5 páginas.

**`src/components/layout/WhatsAppFab.astro`**
- Marcado: hoy es un círculo con solo el ícono y un `aria-label` (`:13-15`). Pasa a ser una píldora con glifo + "Consultar" visible + " por WhatsApp" en `.sr-only`, y se quita el `aria-label` (D-016, D-027). Se quita la prop `label`: el texto sale de `cta.ts` (D-039).
- Script (`:17-26`): el listener de `scroll` con umbral del 80 % se reemplaza por un `IntersectionObserver` (T4). Observa el disparador `[data-whatsapp-fab-trigger]` y, si las hay, las marcas de retiro `[data-whatsapp-fab-retire]` (D-017, D-033; opcionales, D-039). La regla de visibilidad está en Contratos.
- Si falta el disparador, lanza `Error` y el flotante queda oculto (D-028; ver Manejo de errores).
- CSS: se mantienen el estado oculto por defecto, el fundido + subida de 12 px y la regla de movimiento reducido (`:44-58`, `:66-70`) (D-018, R5.5). Cambian la forma y el tamaño (D-016), y al margen inferior se le suma `env(safe-area-inset-bottom)` (D-016). Nota técnica: el viewport actual (`BaseLayout.astro:37`) no declara `viewport-fit=cover`, y en ese caso iOS ya deja el contenido dentro del área segura (WebKit). La suma no rompe nada y el viewport no se toca.
- El comentario de `:12`, que describe el umbral del 80 %, se actualiza.

**`src/pages/[service].astro`**
- Arma `photos = galleryFor(service.id)` y renderiza `<WorkGallery service={service} photos={photos} />` solo si `photos.length > 0` (T10, D-008).
- `WhatsAppFab` (`:33`): deja de recibir `` `${service.ctaLabel} por WhatsApp` ``, que no respeta D-006; la etiqueta sale de `cta.ts` (D-039). Su `href` sigue siendo la URL del servicio (`:22`, R2.2).

**`src/components/service-story/ServiceStory.astro`**
- La portada, `header.beat-cover` (`:55`), recibe `data-whatsapp-fab-trigger` (T6).
- El cierre, `footer#consultar` (`:95-116`), lleva la marca `data-whatsapp-fab-retire` en su contenido: `.closing-copy` y el portal (D-017, D-033). El flotante se retira cuando cualquiera de los dos está en pantalla y vuelve cuando salen (D-034). El botón y el portal del cierre no cambian (R2.4).
- Se quitan `<dl class="facts">` (`:69-81`) y su CSS (`:324-351` y `:492-494`) (D-007, R6.1). La grilla de la portada (`:278-282`) pasa a una columna y el título gigante no supera su tamaño actual (D-022; las medidas se definen en Interfaz). El botón de la portada (`:62-67`) se mantiene (R6.4).
- En celular (≤ 880 px), los capítulos dejan aire abajo para que el flotante no tape el texto (D-017; la medida se define en Interfaz).
- Los botones de la portada (`:63-66`) y del cierre (`:99-102`) no cambian: ya usan `service.ctaLabel` (R4.3) y T1 no los migra.

**`src/components/service-story/ServiceDetails.astro`**
- El botón "Hacer otra pregunta por WhatsApp" (`:36-39`) pasa a `WhatsAppButton` con `label={service.ctaLabel}` y `variant="primary"` (R4.3, T1, D-039). Mantiene la clase de layout `faq-cta` (`:105-112`).
- "Qué ganás con la lámina" (`:17-31`) no cambia y sigue mostrando todos los `benefits` (R6.1, R6.2).

**`src/components/service-story/WorkGallery.astro`**
- Recibe `photos` por prop y deja de llamar a `galleryFor` (`:5`, `:14`) (T10).
- Se borran el estado vacío "Muy pronto…" (`:52-67`), su CSS (`:165-199`) y los imports que quedan sin uso: `Icon` (`:3`), `ServiceArt` (`:4`), `instagramUrl` y `siteSettings` (`:7`) (T10.b).
- El carrusel, los controles y el script no cambian (R7.3).

**`src/pages/404.astro`**
- Queda en el orden de D-021:
  1. Ilustración.
  2. Título.
  3. Texto (`:18`), sin "Elegí qué querés polarizar:".
  4. `WhatsAppButton` principal "Consultar por WhatsApp".
  5. "Ir al inicio" (`:23`), que pasa de `button-primary` a `button-secondary`.
  6. Línea "¿Dónde querés colocar la lámina?" (D-024).
  7. Autos / Hogares / Negocios (`:20-22`).
- Estructura: las dos acciones van en un grupo propio. Los 3 servicios siguen en `<nav aria-label="Servicios">`, con la línea de D-024 encima. "Ir al inicio" sale de ese `<nav>` porque en el orden de D-021 queda arriba de la frase.
- Usa la URL general que ya arma en `:9` (R3.2). No tiene flotante, porque R5.2 no lo pide.

**`src/data/home.ts`**: la respuesta de la FAQ (`:49`) pasa al texto literal de D-063 (ver Modelo de datos).

**`src/components/layout/SiteFooter.astro`**: el link de WhatsApp no cambia (D-026). El pie suma 5,5 rem de aire inferior en todas las páginas, para que el flotante no tape su texto (D-017, D-035). Solo CSS; las props no cambian.

**Sin cambios:** `src/lib/whatsapp.ts`, `src/config/site.ts`, `src/data/services.ts`, `src/data/gallery.ts`, `src/layouts/BaseLayout.astro`, `src/components/layout/site-header.ts`, `package.json`. En `src/styles/global.css` no hay cambios previstos: se reusan `.button`, `.button-primary`, `.button-secondary`, `.sr-only` y `:focus-visible`.

### Fuera de alcance (recordatorio)
- Pasar al componente los 3 botones de WhatsApp que no cambian (`HomeFaqSection.astro:22-25`, `ServiceStory.astro:63-66` y `:99-102`): queda para la spec 006 (T1).
- Unificar las copias de `buildWhatsAppUrl(siteSettings.whatsappNumber, …)` y de `requireElement`: spec 006.
- Botón de Instagram a ≤ 520 px: D-032.
- `viewport-fit`, el salto al contenido y WCAG 2.5.3 del logo y del portal: spec 002.

## Modelo de datos
No hay base de datos. Los datos son módulos TS que se resuelven en el build.

**`src/data/cta.ts` (nuevo, T2)**
```ts
/** Etiquetas de los botones de WhatsApp (D-006). Las de cada servicio siguen en `ctaLabel` (services.ts). */
const SHORT_LABEL = 'Consultar';
/** Complemento oculto a la vista del "Consultar" (D-027): el nombre accesible empieza con el texto visible. */
const HIDDEN_SUFFIX = 'por WhatsApp';

export const WHATSAPP_CTA_LABELS = {
  /** Header y botón flotante. */
  short: SHORT_LABEL,
  hiddenSuffix: HIDDEN_SUFFIX,
  /** Cuerpo del inicio y 404. */
  general: `${SHORT_LABEL} ${HIDDEN_SUFFIX}`,
} as const;
```
`general` se arma con las otras dos. Así el nombre accesible del header y del flotante ("Consultar por WhatsApp") es siempre igual a la etiqueta del cuerpo.

**`src/data/services.ts`**: sin cambios.
- `benefits` (`:39`) se conserva porque lo usa "Qué ganás con la lámina" (`ServiceDetails.astro:22`), que R6.1 mantiene. Solo deja de leerlo la portada (`ServiceStory.astro:71`). Así R6.2 se cumple sin tocar datos.
- `ctaLabel` (`:127`, `:194`, `:261`) sigue siendo la etiqueta del cuerpo en servicios (R4.3) y deja de usarse en el flotante.
- `whatsappMessage` (`:126`, `:193`, `:260`) no cambia (R3.1, R3.3).

**`src/data/gallery.ts`**: sin cambios. `galleryFor` y `GalleryPhoto` se usan desde `[service].astro` y ya no desde `WorkGallery`. El `import.meta.glob` (`:14-16`) sigue resolviendo las fotos en el build: si se copian fotos en `src/assets/gallery/<servicio>/` y se vuelve a compilar, la galería aparece sin tocar código (R7.3).

**`src/config/site.ts`**: sin cambios. `whatsappDefaultMessage` (`:28`) sigue siendo el mensaje del inicio, la 404 y el pie (R3.2), y el contrato `SiteSettings` no se toca (ese es el motivo de T2).

**`src/data/home.ts`**: en `HOME_FAQ`, la respuesta (`:49`) a "¿Hacen autos, casas y negocios?" (`:48`) pasa a: "Sí: polarizado y láminas de seguridad para autos; espejado, esmerilado y seguridad para casas; y todas las opciones para negocios y oficinas. También hacemos ploteo, sobre todo en autos." (D-011, D-063). Va literal; no se genera desde `treatments` (T11).

## Contratos
Como es un sitio estático, no hay endpoints ni permisos. Los contratos son las props de los componentes, que `astro check` verifica en el build, y los atributos `data-` que conectan el flotante con cada página.

| Componente | Props | Qué renderiza | Errores |
|---|---|---|---|
| `WhatsAppButton` (nuevo) | `href`, `label`, `variant`, `class?` (D-039) | `<a>` con glifo y etiqueta; `target` y `rel` fijos | Si falta una prop, `astro check` falla y corta el build |
| `AboutSection`, `FilmTypesSection`, `ProcessSection` | `whatsappUrl: string` (nueva, obligatoria) | CTA corto al final de la sección | Si falta la prop, el build falla |
| `HomeHero` | Sin cambios (`whatsappUrl`) | `.intro` con `data-whatsapp-fab-trigger` | — |
| `SiteHeader` | Sin cambios (`current?`, `whatsappUrl`, `overlay?`) | "Consultar" fuera del `<nav>` | — |
| `WhatsAppFab` | `href` (se quita `label`, D-039) | Píldora con `data-whatsapp-fab` y `data-visible` | Si no hay disparador: `Error` en consola y queda oculto (D-028) |
| `ServiceStory` | Sin cambios (`service`, `next`, `whatsappUrl`) | Marcas de disparador y de retiro | Sin cambios (sigue exigiendo 4 capítulos) |
| `ServiceDetails` | Sin cambios (`service`, `whatsappUrl`) | Botón con `ctaLabel` | — |
| `WorkGallery` | `service`, `photos` (nueva, obligatoria) | Carrusel | Si falta la prop, el build falla |

### Props (TypeScript)
```ts
// src/components/WhatsAppButton.astro
interface Props {
  /** URL de wa.me que arma la página (T3). */
  href: string;
  /** Texto visible y también nombre accesible (R4.4): el glifo es aria-hidden. */
  label: string;
  /** Principal (rojo) o secundario (ghost, D-019). Obligatoria y tipada (D-039). */
  variant: 'primary' | 'secondary';
  /** Clase de layout que pone el padre (p. ej. `faq-cta`). */
  class?: string;
}
// const { href, label, variant, class: className, ...rest } = Astro.props;
// <a class:list={['button', `button-${variant}`, className]} href={href}
//    target="_blank" rel="noopener noreferrer" {...rest}>
//   <Icon name="whatsapp" /><span>{label}</span>
// </a>
```
- `class` y `...rest`: con la estrategia de estilos con scope que Astro usa por defecto, los estilos del padre solo llegan al hijo si este recibe `class` y reparte `...rest`, que lleva el atributo `data-astro-cid-*` (documentación de Astro, "Passing a class to a child component"). Es el mismo patrón de `Icon.astro:11-16`. Sin esto se pierden reglas que hoy funcionan: `.socials .button` (`HomeHero.astro:253`) y `.faq-cta` (`ServiceDetails.astro:105-112`).
- `target` y `rel` no son props, así que no se pueden pisar (RNF8).

```ts
// src/components/home/AboutSection.astro · FilmTypesSection.astro · ProcessSection.astro
interface Props {
  /** URL con el mensaje general (whatsappDefaultMessage), armada en index.astro (T3, D-005). */
  whatsappUrl: string;
}

// src/components/layout/WhatsAppFab.astro
interface Props {
  href: string;
  // `label` se quitó: la etiqueta sale de WHATSAPP_CTA_LABELS (D-039)
}

// src/components/service-story/WorkGallery.astro
import type { GalleryPhoto } from '../../data/gallery';
interface Props {
  service: Service;
  /** Fotos ya resueltas por la página; la página solo renderiza el componente si hay al menos una (T10). */
  photos: readonly GalleryPhoto[];
}
```

### Atributos `data-` del flotante (T6)
| Atributo | Dónde va | Cantidad por página | Si falta |
|---|---|---|---|
| `data-whatsapp-fab` | El `<a>` del flotante (`WhatsAppFab.astro:13`, ya existe) | 1 | — (es el mismo componente) |
| `data-visible="true\|false"` | Lo escribe el script sobre el flotante (ya existe) | — | Sin JS queda oculto |
| `data-whatsapp-fab-trigger` | Inicio: `.intro` (`HomeHero.astro:21`) · servicios: `header.beat-cover` (`ServiceStory.astro:55`) | 1 en cada página con flotante | `Error` y flotante oculto (D-028) |
| `data-whatsapp-fab-retire` | Servicios: `.closing-copy` y el portal del cierre (D-033) · inicio: no lleva (D-017) | 0 o más | Sin marca no hay retiro y no hay error (D-039) |

### Regla de visibilidad del flotante (T4)
- `visible = !disparadorVisible && !retiroActivo`.
- `disparadorVisible`: el disparador cruza el viewport en al menos un píxel (umbral 0). Mientras se vea cualquier parte del hero o de la portada, el flotante no se muestra (R5.2 al pie de la letra).
- "Al menos un píxel": la spec de `IntersectionObserver` cuenta como intersección un elemento pegado al borde aunque se vean 0 px (pasa al entrar por el ancla de un capítulo: la portada termina justo en el borde). Por eso el observer usa `rootMargin: '-1px 0px'`: con la raíz achicada 1 px arriba y abajo, estar pegado al borde equivale a tener 1 px visible (D-071).
- `retiroActivo`: alguna marca de retiro cruza el viewport. Cuando las marcas salen de pantalla (por arriba o por abajo), el flotante vuelve (D-034).
- Cuando el `IntersectionObserver` empieza a observar, informa el estado inicial. Por eso, si se entra por un ancla (`/#nosotros`, `/autos/#<capítulo>`) con el disparador fuera de pantalla, el flotante aparece sin scrollear (caso borde).
- No se ejecuta código en cada evento de scroll (RNF2).

| Página | Flotante | Disparador | Retiro | URL |
|---|---|---|---|---|
| `/` | Sí | `.intro` | No (D-017) | General |
| `/autos/`, `/hogares/`, `/negocios/` | Sí | `.beat-cover` | Contenido del cierre (D-033); vuelve después (D-034) | Del servicio |
| 404 | No | — | — | General |

### Etiquetas y nombres accesibles (D-006, D-027)
| Lugar | Texto visible | Nombre accesible | De dónde sale |
|---|---|---|---|
| Header | "Consultar" | "Consultar por WhatsApp" | `WHATSAPP_CTA_LABELS.short` + `.hiddenSuffix` (`.sr-only`) |
| Botón flotante | "Consultar" | "Consultar por WhatsApp" | Igual que el header |
| Hero, las 3 secciones del inicio y la 404 | "Consultar por WhatsApp" | Igual al texto | `WHATSAPP_CTA_LABELS.general` |
| Cierre de la FAQ del inicio | "Consultar por WhatsApp" | Igual al texto | `WHATSAPP_CTA_LABELS.general` (`HomeFaqSection.astro:24`, D-039) |
| Servicios: portada, cierre y FAQ | "Consultar por mi auto/casa/negocio" | Igual al texto | `service.ctaLabel` |
| Pie | "WhatsApp 261 625-6467" | Igual al texto | Sin cambios (D-026) |

**Interpretación de R4.4 para esta spec (D-027):** "nombre accesible coincidente con el texto visible" se cumple cuando el nombre accesible **empieza con el texto visible** (WCAG 2.5.3, *label in name*). En el header y el flotante el texto visible es "Consultar" y el nombre es "Consultar por WhatsApp". En los demás botones, el nombre es igual al texto.

## Interfaz (UI/UX)
### Alcance y reglas generales de la interfaz

Esta spec **no crea una identidad nueva** ni tokens nuevos: usa `src/styles/tokens.css`, las clases globales `.button`, `.button-primary`, `.button-secondary` y `.sr-only` (`src/styles/global.css`) y el sistema de `DESIGN.md` (pills de 999 px, rojo = acción/luz, Archivo, vidrio solo en ventanas, sin gradientes ni cards nuevas). **Tokens nuevos: ninguno.**

Convenciones de este documento:
- **[D-0NN]** = decidido por el usuario; se aplica tal cual.
- **[detalle propuesto, se aprueba con el diseño]** = el `disenador-ui` lo propone porque hace falta para que la decisión funcione; no lo decidió el usuario todavía. Se aprueba junto con este documento.
- Todos los elementos nuevos o modificados son **enlaces** (`<a>` a `wa.me`, abren en pestaña nueva con `rel="noopener noreferrer"`, RNF8). Por eso los estados *cargando*, *vacío*, *error*, *éxito* y *disabled* **no aplican** (no hay envío ni validación propia; el resultado ocurre en WhatsApp).
- Accesibilidad AA y mobile first: objetivo táctil ≥ 44×44 px (R5.4), foco = contorno global `:focus-visible` de 2 px Signal Coral (`--color-accent-ink`) con 3 px de separación, contraste texto blanco sobre `--color-cta` ≈ 5,0:1 y sobre `--color-cta-hover` ≥ 4,5:1 (ya documentado en DESIGN.md), texto `--color-ink` sobre `rgba(255,255,255,0.04)` sobre `--color-bg` muy por encima de 4,5:1.
- Anchos de verificación: 360 / 768 / 1024 / 1440 px.

### Inventario de elementos y de pantallas afectadas

| Elemento | Dónde | Cambio | Decisión |
|---|---|---|---|
| Header: "Consultar" | Todas las páginas | Sale del menú; píldora roja de 44 px entre el `<nav>` y la hamburguesa; solo texto ≤ 520 px, con glifo desde 521 px | D-003, D-020, D-027 |
| Botón flotante | Inicio y 3 servicios | Pasa de círculo de 56 px a píldora con glifo + "Consultar"; aparece al salir el intro / la portada; se retira en el cierre del servicio | D-002, D-004, D-015, D-016, D-017, D-018, D-028 |
| CTA de sección (3) | Inicio: "Una lámina para cada vidrio", "Sobre nosotros", "Cómo trabajamos" | Nuevo; ghost con glifo; "Consultar por WhatsApp" | D-001, D-005, D-006, D-019 |
| Botón del hero | Inicio | Etiqueta "WhatsApp" pasa a "Consultar por WhatsApp" | D-006 |
| Frase del hero y título del selector | Inicio | Textos nuevos | D-009, D-023 |
| FAQ "¿Hacen autos…?" | Inicio | Respuesta nueva | D-011, D-063 |
| Portada de servicio | `/autos`, `/hogares`, `/negocios` | Sin datos de beneficios; una columna; título gigante a su tamaño actual | D-007, D-022 |
| Capítulos (celular) | Servicios | Aire inferior ≥ 5,5 rem | D-017 |
| Cierre de servicio | Servicios | Sin cambios de layout; el flotante se retira cuando asoma su contenido y vuelve después | D-017, D-033, D-034, R2.4 |
| Galería | Servicios | Ausente si no hay fotos | D-008 |
| "Qué ganás con la lámina" | Servicios | Sin cambios de contenido; la etiqueta de su botón pasa a "Consultar por mi auto/casa/negocio" | D-006, D-007 |
| 404 | `/404` | WhatsApp principal; reorden | D-010, D-021, D-024 |
| Pie de página | Todas | Link sin cambios; suma 5,5 rem de aire inferior para el flotante | D-026, D-035 |
| Instagram (header, pie, hero) | Todas | **Sin cambios** (la diferencia con DESIGN.md a ≤ 520 px queda fuera: Anexo A de la constitución) | D-032, R7.4 |

### Componente: botón de WhatsApp del cuerpo (CTA de sección, hero, servicios, 404)

Un único patrón visual para todo botón de WhatsApp que está dentro del contenido. Técnicamente es `WhatsAppButton.astro` (D-031/T1); acá se define solo cómo se ve.

| Variante | Clases existentes | Dónde | Etiqueta |
|---|---|---|---|
| Primaria (rojo) | `.button .button-primary` | Hero del inicio, cierre del inicio (FAQ), 404, portada y cierre/detalles de servicio | ver tabla de microcopy |
| Ghost con glifo | `.button .button-secondary` + glifo de WhatsApp | Los 3 CTA nuevos de sección del inicio | "Consultar por WhatsApp" |

Medidas: alto mínimo 3,25 rem (52 px), padding horizontal 1,5 rem, `gap` 0,6 rem entre glifo y texto, glifo 1,25 rem, texto Button (650, 1 rem), radio `--radius-control`.

Estados (los de `.button`, sin definir nada nuevo):

| Estado | Primaria | Ghost |
|---|---|---|
| Normal | fondo `--color-cta`, texto `--color-on-red`, CTA Glow | fondo `rgba(255,255,255,.04)`, anillo hairline `--color-line`, texto `--color-ink` |
| Hover | `--color-cta-hover`, sube 1 px, brillo diagonal 0,7 s | fondo `rgba(255,255,255,.09)`, sube 1 px |
| Focus (teclado) | contorno 2 px `--color-accent-ink`, separación 3 px | ídem |
| Active | `scale(.98)` | ídem |
| Movimiento reducido | sin transiciones ni brillo | sin transiciones |
| Sin JS | funciona igual (es un enlace) | ídem |
| Cargando / vacío / error / disabled | no aplican | no aplican |

Diferenciación con Instagram (R4.5): WhatsApp lleva el glifo de WhatsApp (único ícono relleno del sistema) y el texto "Consultar por WhatsApp"; Instagram sigue con su ícono y su nombre accesible actuales.

### Pantalla: Inicio

Orden de secciones **sin cambios**; solo se agregan el CTA al final de tres secciones, el header cambia y aparece el flotante.

```
360 px (no a escala)
┌──────────────────────────┐
│ (logo) crisur  [Consultar] [≡] │  header (no fijo)
│        (moneda)          │
│   título h1              │
│   lede (3 líneas)        │  "…Elegí dónde va la lámina y mirá cómo queda."
│ [wa Consultar por WhatsApp] │  <- hero, primaria (D-006)
│ [  Instagram          ]  │
│ ¿Dónde querés colocar    │  <- título del selector (D-009)
│   la lámina?             │
│ [fila Autos]             │
│ [fila Hogares]           │  ── aquí aparece el flotante (D-015):
│ [fila Negocios]          │     el intro ya salió de pantalla
│ Sobre nosotros ...       │
│ ( wa Consultar por WhatsApp ) ghost
│ Una lámina para cada vidrio (4 muestras)
│ ( wa Consultar por WhatsApp ) ghost
│ Cómo trabajamos (4 pasos)│
│ ( wa Consultar por WhatsApp ) ghost
│ Preguntas + cierre       │  <- hero/cierre existentes, primaria (R1.5)
│ [aire 5,5 rem al pie]    │  <- D-035
│ Pie                      │
└──────────────────────────┘
                   ( wa Consultar )  <- flotante, abajo a la derecha
```

CTA de sección (3):
- Posición: **dentro de cada sección, al final**, debajo del contenido, **alineado a la izquierda** al borde del contenedor de 76 rem, con margen superior `clamp(2rem, 4vw, 3rem)`. **[detalle propuesto, se aprueba con el diseño]**
- Ancho: a **≤ 520 px, ancho completo** (como `.final-actions`, máx. 22 rem); desde 521 px, ancho al contenido. **[detalle propuesto, se aprueba con el diseño]** El anillo hairline y el fondo del ghost se mantienen en todos los anchos (la clase `.button-secondary` actual no los quita).
- Estilo: ghost con glifo **[D-019]**. Sin rojo lleno: el rojo queda para hero, cierre, header y flotante.

| Ancho | Comportamiento de los CTA de sección |
|---|---|
| 360 | ancho completo, 52 px de alto, apilado bajo el contenido de la sección |
| 768 | ancho al contenido, a la izquierda del contenedor |
| 1024 | ídem; las secciones de dos columnas desde 900 px: el CTA va debajo de **ambas** columnas, no dentro de una **[detalle propuesto, se aprueba con el diseño]** |
| 1440 | ídem, contenedor máx. 76 rem |

Hero: la frase del lede cambia solo en su segunda oración y **debe seguir en 3 líneas a 360 px** (D-023, límite ~46 caracteres; la frase aprobada tiene 43). No hay ajuste de hero, moneda ni espaciados (D-025). A 360×640 el botón del hero entra completo (y ≈ 485–537) y a 360×560 queda con ≈ 28 px de holgura (medición V0).

### Pantalla: Páginas de servicio (`/autos`, `/hogares`, `/negocios`)

```
Portada (≥ 881 px, D-022)                 Portada (360 px)
 ┌────────────────────────────────┐        ┌───────────────────┐
 │         [ objeto 3D ]          │        │   [ objeto 3D ]   │
 │                                │        │                   │
 │ Polarizado para                │        │ Polarizado para   │
 │ AUTOS (tamaño actual)          │        │ AUTOS             │
 │ lede                           │        │ lede              │
 │ [wa Consultar por mi auto]     │        │ [wa Consultar por mi auto]
 │                  (vacío, la    │        └───────────────────┘
 │                   escena respira)
 └────────────────────────────────┘
Capítulos 1–4 (flotante visible, abajo a la derecha)
 ... texto del capítulo (celular: aire inferior ≥ 5,5 rem)
Cierre (el flotante se retira): panel + [Consultar por mi auto] + portal "Siguiente"
(Galería: ausente si no hay fotos)
Qué ganás con la lámina  →  [Consultar por mi auto/casa/negocio]
```

1. **Portada.** Una columna abajo a la izquierda. El título gigante queda **limitado a su tamaño actual** [D-022]: el contenedor del texto tiene el ancho máximo equivalente a la columna actual, de modo que `100cqi` no lo haga crecer (hoy ≈ 113 px a 1440; sin límite llegaría a 168 px). Se **eliminan** los 4 renglones de beneficios (`.facts`, solo visibles ≥ 881 px) [D-007]. El botón de WhatsApp de la portada se conserva (R6.4) con la etiqueta "Consultar por mi auto/casa/negocio" (D-006). En celular la portada no cambia (los datos ya estaban ocultos).
2. **Capítulos.** Sin cambios de contenido. En **celular** (≤ 880 px, texto abajo) reservan **aire inferior ≥ 5,5 rem** para que el flotante (52 px + margen) no tape las últimas líneas **[D-017; la medida es detalle propuesto, se aprueba con el diseño]**. En escritorio el texto va a los lados y no se solapa.
3. **Cierre.** Sin cambios de layout: panel con su botón y el portal "Siguiente" (R2.4). **El flotante se retira cuando asoma el contenido del cierre** (texto y portal) [D-017, D-033] y **vuelve** cuando ese contenido sale de pantalla [D-034]; así nunca tapa el portal ni hay dos botones de WhatsApp a la vez.
4. **Galería.** Sin fotos = **la sección no existe** (ni título, ni aviso, ni "Muy pronto…") [D-008, R7.1]. El cierre pasa directo a "Qué ganás con la lámina"; el padding superior de esa sección (`section`: 4,5–8 rem) conserva el ritmo vertical, sin espacio extra. Con fotos, la galería reaparece sola sin cambios visuales [R7.3].
5. **"Qué ganás con la lámina".** Sin cambios; mantiene todos los beneficios [R6.1, R6.2]. Etiqueta del botón: "Consultar por mi auto/casa/negocio" [D-006].

### Pantalla: 404

Orden [D-021] (de arriba abajo):

```
360 px
  [ ilustración de vidriera ]
  Esta página no existe                   (título, texto actuales)
  Puede que el link esté mal escrito o que la página se haya movido.
  [ wa Consultar por WhatsApp ]           <- primaria, ancho completo ≤ 520
  [ Ir al inicio ]                        <- secundaria (ghost)
  ¿Dónde querés colocar la lámina?        <- línea propia (D-024)
  ( Autos ) ( Hogares ) ( Negocios )      <- pills secundarias, como hoy
```

- "Consultar por WhatsApp" es el **único botón rojo** de la página; "Ir al inicio" pasa a `.button-secondary` [D-010].
- La frase de D-024 va **en su propia línea** sobre las pills; sin los dos puntos finales (es una pregunta) [D-024].
- Los títulos y textos de la 404 no se tocan salvo la frase final (R9.2, R8.3). Los enlaces a Autos / Hogares / Negocios se mantienen igual.
- Primera pantalla: el botón de WhatsApp entra completo a 360×640 y a 360×560 (medición V0, D-021); no se achica la ilustración [D-021 elegida A, no C].
- Estados: los de `.button` (ver arriba). Sin estados propios de error.

| Ancho | 404 |
|---|---|
| 360 | acciones apiladas a ancho completo (máx. 22 rem), pills en fila que puede envolver |
| 768 / 1024 / 1440 | acciones centradas en fila o apiladas según el contenedor actual; el orden **no cambia** |

### Componente: header global con "Consultar" [D-003, D-020, D-027]

```
360 px (≤ 520: solo texto)                      ≥ 521 px (con glifo)
 (logo) crisur         ( Consultar ) [≡]         (logo) crisur polarizados   ( wa Consultar ) [≡]
 |-118-|   ~165 libres        |44|
 
≥ 881 px (escritorio): (logo) crisur polarizados  · nav · [Instagram]  ( wa Consultar )
```

- **Orden en el DOM y visual: logo · `<nav>` · [Consultar] · [≡]** (el link sale del `<nav>` y queda como hermano entre el `<nav>` y la hamburguesa, D-031/T8). **[detalle propuesto, se aprueba con el diseño]** en cuanto al orden [Consultar][≡] (la hamburguesa queda en su lugar de siempre, al borde derecho).
- Alto **44 px (2,75 rem)** en todos los anchos (hoy 40 px; R5.4). Padding horizontal 1 rem a ≤ 520 px (≈ 104 px de ancho con solo texto) y 1,2 rem desde 521 px (con glifo 1,25 rem + `gap` 0,5 rem, ≈ 150 px). Separación con la hamburguesa 0,5 rem. Dentro del header de 4 rem (64 px) entra sin cambios de alto. **[detalle propuesto, se aprueba con el diseño]** para los paddings y separaciones.
- Fondo `--color-cta` sin glow, texto `--color-on-red`, peso 650. Etiqueta visible: **"Consultar"**; nombre accesible: **"Consultar por WhatsApp"** con el fragmento " por WhatsApp" en un `<span class="sr-only">` [D-027]. Sobre la escena (`is-overlay`) el rojo sólido sigue legible sobre el degradé del header.
- Con el menú de la hamburguesa abierto, "Consultar" queda a la vista arriba del panel, por lo que **el panel ya no lleva su propio botón de WhatsApp**. **[detalle propuesto, se aprueba con el diseño]**
- El header **no es fijo** (se va con el scroll): por eso el flotante es la acción que sigue a la vista (D-015).

| Estado | Header "Consultar" |
|---|---|
| Normal | `--color-cta`, texto blanco ≈ 5,0:1 |
| Hover | `--color-cta-hover`, sin elevación ni brillo (compacto) |
| Focus | contorno 2 px `--color-accent-ink`, separación 3 px |
| Active | `scale(.98)` |
| Movimiento reducido | sin transiciones |
| Sin JS | visible y funcional (R5.1) |
| Cargando / vacío / error / disabled | no aplican |

| Ancho | Header |
|---|---|
| 360 | logo + "crisur" · (sufijo "polarizados" oculto) · [Consultar solo texto] · [≡]; holgura ≈ 61 px |
| 768 | ≤ 880: igual con glifo (≥ 521); hamburguesa visible; `<nav>` en el panel |
| 1024 / 1440 | `<nav>` en línea, Instagram icon-only (2,75 rem) y [Consultar con glifo] |

### Componente: botón flotante de WhatsApp [D-002, D-004, D-015, D-016, D-017, D-018, D-028]

- **Forma:** píldora roja (`--color-cta`, texto `--color-on-red`) con glifo de WhatsApp (1,25 rem) + "Consultar" visible; alto 3,25 rem (52 px), ancho ≈ 140 px (≈ 39 % de 360 px); sombra CTA Glow; **sin vidrio** (regla "glass solo donde hay vidrio") [D-016].
- **Posición:** fija, abajo a la derecha, **1 rem del borde derecho y del inferior más `env(safe-area-inset-bottom)`** (barra de gestos de iOS) y `safe-area-inset-right` en horizontal. **[detalle propuesto, se aprueba con el diseño]** (la decisión D-016 solo establece el margen para la barra de gestos; los 1 rem salen del patrón actual de 1–1,75 rem).
- **Nombre accesible:** "Consultar por WhatsApp" = texto visible "Consultar" + `<span class="sr-only"> por WhatsApp</span>` [D-027]. En servicios el mensaje prearmado es el del servicio (R2.2); el nombre accesible no cambia.
- **Cuándo aparece** [D-004, D-015]: apenas el hero (inicio: solo el **intro**, es decir moneda, título, lede y botones; el selector **no** cuenta) o la portada (servicios) sale de pantalla. Mientras están visibles, está oculto. Si se entra por un ancla a un capítulo, la portada no está en pantalla y el flotante ya está visible (R5.2).
- **Cuándo se retira** [D-017, D-033, D-034]: en servicios, cuando asoma el **contenido del cierre** (texto y portal), y **vuelve a aparecer** cuando ese contenido sale de pantalla; en el inicio **no se retira**. El pie de **todas las páginas** deja **5,5 rem** de aire inferior para que el flotante no tape su texto [D-035].
- **Si el script no encuentra el hero o la portada:** el flotante **no aparece** y hay un error en consola [D-028]; el "Consultar" del header sigue disponible.
- **Aparición** [D-018]: fundido (opacidad 0 → 1, 0,3 s) + subida de 12 px (0,4 s, `--ease-out`), la actual. La retirada usa el mismo gesto en sentido inverso, igual de breve. **[la retirada simétrica es detalle propuesto, se aprueba con el diseño]**

| Estado | Flotante |
|---|---|
| Oculto (antes de aparecer / en el cierre) | opacidad 0, desplazado 12 px, `visibility: hidden` y fuera del orden de tabulación (no hay foco invisible) |
| Visible | opacidad 1, en su posición |
| Hover | `--color-cta-hover` |
| Focus | contorno 2 px `--color-accent-ink`, separación 3 px |
| Active | `scale(.98)` |
| Movimiento reducido | aparece y se retira **sin animación** (cambio instantáneo de visibilidad) [D-018, R5.5] |
| Sin JS | **no aparece** (el header cubre R5.1) |
| Cargando / vacío / error / disabled | no aplican |

| Ancho | Flotante |
|---|---|
| 360 | ≈ 140 × 52 px; los capítulos reservan aire inferior ≥ 5,5 rem para no ser tapados |
| 768 | mismo tamaño; capítulos en layout de celular (≤ 880) con aire ≥ 5,5 rem |
| 1024 / 1440 | mismo tamaño; capítulos a los lados, sin solapamiento; el cierre es donde se retira |

### Movimiento (propósito de cada uno)

| Movimiento | Propósito | Reducido | Decisión |
|---|---|---|---|
| Aparición/retirada del flotante (fundido + 12 px) | Avisar que la acción apareció cuando el intro/portada se va; ya existe | Sin animación | D-018, R5.5 |
| Hover de botones (sube 1 px, brillo en el primario) | Respuesta al puntero; ya existe | Sin transiciones | R5.5 |
| Active (`scale .98`) | Confirmar el toque | Sin transiciones | R5.5 |

No se agrega movimiento nuevo ni se anima el layout (regla de DESIGN.md: solo transform, opacity, filter y `--film`).

### Microcopy aprobado

Todos los textos son los de las decisiones; no se reescribe ninguno.

| Texto exacto | Dónde | Decisión |
|---|---|---|
| Consultar | Header (visible) y botón flotante (visible) | D-006, R4.1 |
| Consultar por WhatsApp (nombre accesible; " por WhatsApp" con `.sr-only`) | Header y flotante: lo que lee el lector de pantalla | D-027 |
| Consultar por WhatsApp | Botón del hero del inicio (reemplaza "WhatsApp"); 3 CTA de sección del inicio; botón principal de la 404; cierre del inicio (ya dice este texto; pasa a leerse de `cta.ts`, D-039) | D-006, D-001, D-010, R4.2 |
| Consultar por mi auto | Botones de WhatsApp del cuerpo de `/autos` (portada, cierre, "Qué ganás") | D-006, R4.3 |
| Consultar por mi casa | Ídem en `/hogares` | D-006, R4.3 |
| Consultar por mi negocio | Ídem en `/negocios` | D-006, R4.3 |
| Elegí dónde va la lámina y mirá cómo queda. | Segunda frase del lede del hero (la primera, "Más de {años} años colocando láminas en {zona}.", **no cambia**) | D-023, D-009, R8.3 |
| ¿Dónde querés colocar la lámina? | Título del selector de servicios del inicio (reemplaza "¿Qué querés polarizar?") | D-009, R8.2 |
| ¿Dónde querés colocar la lámina? | 404: línea propia sobre Autos / Hogares / Negocios (reemplaza "Elegí qué querés polarizar:") | D-024, R8.3 |
| Ir al inicio | 404: botón secundario (texto sin cambio) | D-010, R9.2 |
| Sí: polarizado y láminas de seguridad para autos; espejado, esmerilado y seguridad para casas; y todas las opciones para negocios y oficinas. También hacemos ploteo, sobre todo en autos. | Respuesta de la FAQ "¿Hacen autos, casas y negocios?" | D-011, D-063, R8.1 |
| ¡Hola Crisur! Quiero hacer una consulta. | Mensaje prearmado general (inicio, 404, pie): **sin cambios** | D-005, R3.2 |
| `whatsappMessage` de cada servicio (`src/data/services.ts`) | Mensaje prearmado de servicios (cuerpo y flotante): **sin cambios** | D-005, R3.1 |
| WhatsApp + número | Link del pie: **sin cambios** | D-026 |

Textos que **se eliminan**: "Muy pronto, fotos de nuestros trabajos en …" y el título "Trabajos en …" (galería sin fotos, D-008); "Hacer otra pregunta por WhatsApp" y "WhatsApp" como etiquetas de botón (D-006); los 4 renglones de beneficios de la portada (D-007, el texto sigue en capítulos y "Qué ganás").

Contenido del cliente que falta: **ninguno** para esta spec (no se agregan textos del cliente; fotos de trabajos siguen pendientes por constitución D-018, la galería queda oculta hasta que lleguen).

### Verificación visual por ancho (guía para la Fase 5, D-029)

| Elemento | 360 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Header "Consultar" | solo texto, 44 px, sin recorte | con glifo, hamburguesa | con glifo, `<nav>` en línea | ídem |
| CTA de sección (inicio) | ancho completo, ghost | al contenido | debajo de las dos columnas | ídem |
| Hero | botón WhatsApp completo a 360×640 y 360×560; lede en 3 líneas | todo visible | todo visible | botones y selector visibles |
| Flotante | no tapa texto de capítulos; se retira en el cierre | ídem | ídem | ídem |
| Portada servicio | una columna, título actual | una columna | título no tapa el 3D | título no tapa el 3D |
| 404 | WhatsApp en primera pantalla | orden D-021 | orden D-021 | orden D-021 |
| Teclado | Tab llega a header, CTA, flotante; foco visible; flotante oculto no recibe foco | ídem | ídem | ídem |
| Movimiento reducido | flotante sin animación | ídem | ídem | ídem |
| Sin JS | header y CTA funcionan; flotante ausente | ídem | ídem | ídem |

Además, **celular en horizontal a 640×360** [D-036]: el flotante no tapa texto ni controles (capítulos, portal, pie).

### Pendientes de decisión (interfaz)

Ninguno. La etiqueta del cierre del inicio ya es "Consultar por WhatsApp" (verificado en `HomeFaqSection.astro:24`) y el aire del pie quedó en 5,5 rem para todas las páginas (D-035).

## Manejo de errores
- **Número inválido (build, ya existe):** si el número no es E.164, `buildWhatsAppUrl` lanza `InvalidPhoneNumberError` (`whatsapp.ts:14-17`) y el build se corta en lugar de publicar enlaces rotos. Todas las acciones nuevas usan la URL que ya arma cada página, así que quedan cubiertas (RNF8).
- **Props faltantes (build, tipos):** `whatsappUrl` es obligatoria en las 3 secciones del inicio, `photos` en `WorkGallery` y `href`, `label` y `variant` en `WhatsAppButton`. Si una página no las pasa, falla `astro check` (que corre dentro de `npm run build`).
- **Capítulos (build, ya existe):** `ServiceStory` sigue exigiendo 4 capítulos (`:15-17`).
- **Disparador faltante (navegador, D-028):** si el script del flotante no encuentra `[data-whatsapp-fab-trigger]` (ni el propio `[data-whatsapp-fab]`), lanza un `Error` con mensaje descriptivo, por ejemplo `WhatsAppFab: missing element "[data-whatsapp-fab-trigger]"`. El error aparece en la consola y el flotante sigue oculto, como empieza. El "Consultar" del header sigue disponible (R5.1). Es el mismo patrón de `requireElement` (`site-header.ts:1-5`), pero sin sumar otra copia de esa función (unificarlas es tarea de la spec 006).
- **Marca de retiro faltante:** es opcional; sin marca no hay retiro y no hay error (D-039). Si se borrara por error, lo detecta la checklist (R5.6).
- **Sin `try/catch` genéricos** (regla heredada): el script del flotante no atrapa errores. Tampoco hace I/O ni llama a servicios externos.
- **Sin JavaScript:** el flotante no aparece porque arranca oculto (caso borde aceptado en los requisitos). Los CTA del cuerpo y el "Consultar" del header son enlaces y funcionan igual (R5.1).
- **Fuera del control del sitio:** si el visitante no tiene WhatsApp instalado, `wa.me` abre WhatsApp Web.

## Seguridad y privacidad
- **RNF4:** no se agregan formularios, cookies, almacenamiento local, analytics ni scripts de terceros. Los únicos destinos externos siguen siendo `wa.me` e Instagram. El script del flotante solo lee el DOM y escribe `data-visible`.
- **RNF8:** todos los enlaces de WhatsApp abren en una pestaña nueva con `rel="noopener noreferrer"`. Así la pestaña abierta no puede controlar la del sitio y no se envía el referer. En `WhatsAppButton`, `target` y `rel` son fijos y no se pasan como props. Los enlaces escritos a mano que cambian (header y flotante) los conservan.
- **Número y mensaje:** el número se valida en el build. El mensaje se codifica con `URLSearchParams` (`whatsapp.ts:18-19`), incluidas las tildes y la "¡" (caso borde de los requisitos).
- **Sin datos del visitante:** los mensajes prearmados son fijos y no incluyen nada que escriba el visitante.
- No se suman orígenes externos, así que no cambia lo que tienen que cubrir los headers de seguridad de la spec 005.

## Estrategia de testing
No hay tests automáticos ni lint (constitución D-012) y no se suman dependencias (D-029). Playwright queda para la spec 006. Las verificaciones manuales se hacen sobre `npm run preview`, la build de producción local.

### Métodos
| Código | Método |
|---|---|
| B | `npm run build` (incluye `astro check`) termina con 0 errores |
| H | Revisión manual de los enlaces en el HTML de `dist/` o en DevTools: `href` (número y `text=`), `target`, `rel`, texto y nombre accesible (DevTools, pestaña Accessibility) |
| M | Checklist manual en Edge (modo responsive de DevTools) en 360, 768, 1024 y 1440 px, recorriendo la página completa |
| C | Capturas con Edge headless. Para 360 px, que está por debajo del ancho mínimo de ventana de Edge (unos 500 px), se usa el `<iframe>` de 360 px del método de D-025, a 360×640 y a 360×560 (y a 640×360 en horizontal, D-036) |
| K | Teclado: Tab, Shift+Tab y Enter, con foco visible en cada acción |
| RM | Movimiento reducido emulado (DevTools → Rendering → `prefers-reduced-motion: reduce`) |
| NJ | JavaScript desactivado (DevTools) |
| L | Lighthouse, con el protocolo de abajo |
| R | Revisión de textos y de código (`code-reviewer` o `qa-tester`) |

### Protocolo de Lighthouse (D-030, D-037, D-038, D-048, D-049; RNF2)
- Se usa la misma configuración del 2026-10-03 (constitución D-016): Lighthouse 12.8.2 local, Edge headless, emulación mobile, en la misma máquina.
- Páginas: `/`, `/autos/`, `/hogares/` y `/negocios/`. Se hacen 3 corridas por página **antes** y 3 **después**, salvo en `/`, que lleva 5 antes y 5 después por su varianza (D-048). En total, 28.
- El "antes" se mide sobre `main`, antes de implementar la primera tarea. El "después", al terminar todas las tareas. Los dos sobre `npm run preview` (build local), en la misma máquina (D-037).
- Se compara la **mediana**:
  - Rendimiento: la mediana de después tiene que ser ≥ la de antes − 3 puntos (D-030).
  - TBT: la mediana de después tiene que ser ≤ la de antes + 10 % (D-038).
  - Accesibilidad, Buenas prácticas y SEO: 100.
- Si `/` no pasa el piso de Rendimiento o el techo de TBT, `seo-rendimiento` revisa en el reporte qué scripts causan el bloqueo. Si ninguno es un archivo tocado por esta spec, lo informa como variación y decide el usuario (D-049).
- La tabla antes/después va en el informe de verificación.

### Requisito → verificación
| Criterio | Método | Se da por cumplido cuando… |
|---|---|---|
| R1.1 | M, H | Al final de "Una lámina para cada vidrio", dentro de la sección, hay un botón "Consultar por WhatsApp" en las 4 anchuras |
| R1.2 | M, H | Lo mismo en "Sobre nosotros" |
| R1.3 | M, H | Lo mismo en "Cómo trabajamos" |
| R1.4 | H, M | Los 3 `href` son `https://wa.me/5492616256467?text=…` y `text` decodificado es "¡Hola Crisur! Quiero hacer una consulta."; al tocarlos, WhatsApp abre en una pestaña nueva |
| R1.5 | M, H | El hero y el cierre de la FAQ conservan su acción, y ninguna sección del inicio termina sin acción |
| R2.1 | M | En los 3 servicios y las 4 anchuras, con la portada fuera de pantalla, el flotante se ve durante los 4 capítulos hasta que asoma el contenido del cierre (D-033). También al entrar por un ancla de capítulo |
| R2.2 | H, M | En cada servicio, el `href` del flotante lleva el `whatsappMessage` de ese servicio |
| R2.3 | M | En las 4 anchuras y los 3 servicios, el flotante queda dentro de la pantalla durante la escena y ningún elemento lo tapa (índice de capítulos, header, textos) |
| R2.4 | M, H | El cierre conserva su botón de WhatsApp y el portal "Siguiente", y el portal funciona con mouse, toque y teclado |
| R3.1 | H | En cada servicio, todos los `wa.me` (header, portada, cierre, FAQ y flotante) llevan el `whatsappMessage` del servicio |
| R3.2 | H | En `/`, en la 404 y en el pie, todos los `wa.me` llevan `whatsappDefaultMessage` |
| R3.3 | R, H | El diff no toca `whatsappMessage` (`services.ts`) ni `whatsappDefaultMessage` (`site.ts`), y en `dist/` no aparecen otros valores de `text=` |
| R4.1 | M, H | El header y el flotante muestran "Consultar" |
| R4.2 | M, H | El hero, las 3 secciones, el cierre de la FAQ del inicio y la 404 dicen "Consultar por WhatsApp", y el hero ya no dice "WhatsApp" a secas |
| R4.3 | M, H | La portada, el cierre y la FAQ de cada servicio dicen "Consultar por mi auto/casa/negocio", y ya no aparece "Hacer otra pregunta por WhatsApp" |
| R4.4 | H, R | El nombre accesible de cada acción es igual al texto visible o, en el header y el flotante, "Consultar por WhatsApp", que empieza con el texto visible (D-027) |
| R4.5 | M | Las acciones de WhatsApp tienen el glifo de WhatsApp (salvo el header a ≤ 520 px, D-020) y un texto con "Consultar…"; las de Instagram tienen su glifo y "@crisur2026", "Ver trabajos" o "Instagram" |
| R5.1 | M, NJ, C | A 360 px y con JS desactivado, "Consultar" se ve en el header sin abrir el menú en `/`, en un servicio y en la 404, y abre WhatsApp |
| R5.2 | M, RM | En el inicio, el flotante no aparece mientras se vea alguna parte del intro y aparece cuando sale; en servicios pasa lo mismo con la portada. Al volver arriba se oculta. Al entrar por un ancla aparece sin scrollear |
| R5.3 | C | En las capturas a 360×640 y 360×560 de `/`, un servicio y la 404 entra completa al menos una acción de WhatsApp. En el inicio, el lede sigue en 3 líneas (D-023, D-025) |
| R5.4 | M, K | En DevTools: el "Consultar" del header y el flotante miden ≥ 44×44 y los botones del cuerpo ≥ 44 px de alto y de ancho. Todas las acciones tienen foco visible |
| R5.5 | RM | Con movimiento reducido, el flotante aparece sin transición y los botones no se animan al pasar el mouse |
| R5.6 | M, C | En las 4 anchuras, el flotante no tapa el portal ni el texto de los capítulos en servicios, y al final de cada página no queda sobre el texto del pie (5,5 rem de aire, D-035). El menú abierto y las preguntas de la FAQ se pueden usar; lo que el flotante tape al pasar se destapa al seguir scrolleando. También a 640×360 en horizontal (D-036). Teclado en pantalla: no aplica, porque el sitio no tiene campos de texto |
| R6.1 | M | La portada de cada servicio ya no muestra el bloque de datos en ≥ 881 px (donde se veía), y los beneficios siguen en los capítulos y en "Qué ganás" |
| R6.2 | R, M | Cada `benefit` de `services.ts` aparece en el "Qué ganás" de su servicio (4 por servicio) |
| R6.3 | R | El diff no toca `benefits` ni `story` de `services.ts`, y no hay cifras ni porcentajes nuevos |
| R6.4 | M | La portada conserva su botón "Consultar por mi …" en las 4 anchuras |
| R7.1 | M, H | Hoy, sin fotos, ninguna página de servicio tiene la sección de galería: ni el título "Trabajos en…" ni "Muy pronto…" |
| R7.2 | M, R | Ninguna página muestra fotos, testimonios ni ilustraciones presentadas como trabajos reales |
| R7.3 | R (+ prueba opcional) | Revisión: `galleryFor` y el glob no cambian, y la página tiene la condición `photos.length > 0`. Prueba real opcional: copiar una imagen de prueba en `src/assets/gallery/autos/`, compilar, ver el carrusel y borrar la imagen (crear y borrar el archivo requiere el OK del usuario) |
| R7.4 | M | Instagram sigue en el header (dentro del menú), en el pie y en el hero |
| R8.1 | H, R | La respuesta de la FAQ en `/` es exactamente el texto de D-063 |
| R8.2 | M | El título del selector es "¿Dónde querés colocar la lámina?" |
| R8.3 | M, C | El hero dice "Elegí dónde va la lámina y mirá cómo queda." (D-023), la 404 tiene "¿Dónde querés colocar la lámina?" en su propia línea (D-024) y "Elegí qué querés polarizar" ya no aparece en `dist/` |
| R8.4 | R | Queda como ítem de la checklist de revisión (T11): si cambia `treatments`, se revisan los textos escritos a mano (`home.ts:49`, `AboutSection.astro:7`, `SiteFooter.astro:21`, `index.astro:19` y los textos de cada servicio en `services.ts`: `hero`, `page`, `story`, `faq`). Los que usan `describeTreatments` se actualizan solos (`HomeHero.astro:52`, `ServiceDetails.astro:18`). En esta spec: los textos coinciden con los `treatments` actuales |
| R8.5 | R | Los textos nuevos o modificados usan voseo y no tienen precios, cifras, testimonios ni fotos |
| R9.1 | M, H, C | En la 404, "Consultar por WhatsApp" es el botón principal (rojo), lleva el mensaje general, es la primera acción y entra en la primera pantalla a 360×640 (D-021) |
| R9.2 | M | "Ir al inicio" es secundario, y se conservan Autos, Hogares, Negocios y el texto (salvo el cambio de R8.3) |
| RNF1 | M, K, C | En las 4 anchuras, cada acción nueva o modificada cumple: contraste del texto ≥ 4,5:1 (DevTools), foco visible, ≥ 44×44 y uso con teclado (con Tab se llega al "Consultar" del header, a los CTA y al flotante cuando está visible) |
| RNF2 | L | Se cumple el protocolo de Lighthouse de arriba |
| RNF3 | R, H | `package.json` y `package-lock.json` no cambian, y en `dist/` no aparecen `<script src>` ni peticiones nuevas a terceros |
| RNF4 | R, H | No hay `<form>`, cookies, `localStorage` ni analytics, y los únicos destinos externos son `wa.me` e `instagram.com` |
| RNF5 | R | Hay 0 cifras, precios, testimonios o fotos inventados en los textos nuevos o modificados |
| RNF6 | R | El 100 % de los textos visibles nuevos o modificados está en español rioplatense con voseo |
| RNF7 | RM | Igual que R5.5, para toda acción fija o animada: flotante, header y botones |
| RNF8 | H, B | En `dist/`, todo `wa.me` tiene `target="_blank"` y `rel="noopener noreferrer"`. El build valida el número (`whatsapp.ts` no cambia y el build pasa con el número actual) |

### Casos borde
| Caso | Verificación |
|---|---|
| Visitante sin JavaScript | NJ: los CTA del cuerpo y el header funcionan; el flotante no aparece (aceptado en los requisitos) |
| 360×640 con la barra del navegador visible | C a 360×560 (R5.3) |
| Link directo a un ancla dentro de la escena | M: el flotante aparece sin scrollear (R2.1, R5.2) |
| Mensaje con tildes y "¡" | H: el `text=` decodificado es igual al mensaje original |
| Servicio sin fotos hoy y con fotos mañana | Igual que R7.3 |
| Servicios con distinta cantidad de tratamientos | Igual que R8.1 y R8.4 |
| Celular en horizontal | C y M a 640×360 (D-036) |
| Teclado en pantalla abierto | No aplica: el sitio no tiene campos de texto |
| Visitante sin WhatsApp instalado | Fuera del control del sitio (`wa.me` abre WhatsApp Web) |

## Trazabilidad
| Criterio | Componente / archivo |
|---|---|
| R1.1 | `FilmTypesSection.astro` (CTA al final) · `WhatsAppButton.astro` · `index.astro` (prop `whatsappUrl`) |
| R1.2 | `AboutSection.astro` · `WhatsAppButton.astro` · `index.astro` |
| R1.3 | `ProcessSection.astro` · `WhatsAppButton.astro` · `index.astro` |
| R1.4 | `index.astro:14` (URL general por props) · `lib/whatsapp.ts` y `config/site.ts:28` (sin cambios) |
| R1.5 | `HomeHero.astro` (botón por `WhatsAppButton`) · `HomeFaqSection.astro` (solo el texto pasa a `cta.ts`, D-039) |
| R2.1 | `WhatsAppFab.astro` (script con `IntersectionObserver`) · `ServiceStory.astro` (marcas de disparador y retiro) · `[service].astro` |
| R2.2 | `[service].astro:22` y `:33` (`href` con el `whatsappMessage` del servicio) |
| R2.3 | `WhatsAppFab.astro` (posición y apilado) · `ServiceStory.astro` (aire en capítulos en celular, D-017) |
| R2.4 | `ServiceStory.astro:95-116` (cierre sin cambios, salvo las marcas de retiro) |
| R3.1 | `[service].astro:22` (una URL para header, portada, cierre, FAQ y flotante) |
| R3.2 | `index.astro:14` · `404.astro:9` · `SiteFooter.astro:8` · `HomeFaqSection.astro:8` |
| R3.3 | `services.ts` (`whatsappMessage`) y `site.ts` (`whatsappDefaultMessage`), sin cambios |
| R4.1 | `SiteHeader.astro` · `WhatsAppFab.astro` · `data/cta.ts` |
| R4.2 | `HomeHero.astro` · `AboutSection`, `FilmTypesSection`, `ProcessSection` · `404.astro` · `data/cta.ts` · `HomeFaqSection.astro` (ya cumple; texto desde `cta.ts`) |
| R4.3 | `ServiceDetails.astro` (`ctaLabel`) · `ServiceStory.astro:65`, `:101` (ya cumplen) · `services.ts` (`ctaLabel`) |
| R4.4 | `WhatsAppButton.astro` (texto = nombre) · `SiteHeader.astro` y `WhatsAppFab.astro` (`.sr-only`, D-027) · `global.css:58` |
| R4.5 | `WhatsAppButton.astro` (glifo + texto) · `SiteHeader.astro` · `HomeHero.astro:32-35` (Instagram, sin cambios) |
| R5.1 | `SiteHeader.astro` (enlace fuera del `<nav>`, T8) |
| R5.2 | `WhatsAppFab.astro` · `HomeHero.astro` (`.intro`) · `ServiceStory.astro` (`.beat-cover`) |
| R5.3 | `HomeHero.astro` (sin ajuste, D-025; lede de D-023) · `SiteHeader.astro` ("Consultar" visible a 360 px) |
| R5.4 | `SiteHeader.astro` (44 px, D-020) · `WhatsAppFab.astro` (D-016) · `global.css:89` (`.button`) y `:53` (`:focus-visible`) |
| R5.5 | `WhatsAppFab.astro:66-70` · `global.css:145-150` · regla de movimiento reducido del enlace nuevo en `SiteHeader.astro` |
| R5.6 | `WhatsAppFab.astro` (retiro y regreso, D-033, D-034) · `ServiceStory.astro` (marcas de retiro y aire en capítulos) · `SiteFooter.astro` (5,5 rem al pie, D-035) |
| R6.1 | `ServiceStory.astro` (sin `.facts`: `:69-81`, `:324-351`, `:492-494`; portada en una columna, D-022) |
| R6.2 | `ServiceDetails.astro:20-31` · `services.ts` (`benefits` se conserva) |
| R6.3 | `services.ts` (`benefits` y `story` sin cambios) |
| R6.4 | `ServiceStory.astro:62-67` |
| R7.1 | `[service].astro` (renderizado condicional) · `WorkGallery.astro` |
| R7.2 | `WorkGallery.astro` (se borra el estado vacío con la ilustración) |
| R7.3 | `data/gallery.ts:14-16`, `:28-34` (sin cambios) · `[service].astro` (condición) |
| R7.4 | `SiteHeader.astro:38-41` · `SiteFooter.astro:36-39` · `HomeHero.astro:32-35` (sin cambios) |
| R8.1 | `data/home.ts:49` |
| R8.2 | `HomeHero.astro:40` |
| R8.3 | `HomeHero.astro:25` (D-023) · `404.astro:18` (D-024) |
| R8.4 | Checklist de revisión (T11): `home.ts:49`, `AboutSection.astro:7`, `SiteFooter.astro:21`, `index.astro:19`, `services.ts` |
| R8.5 | Textos nuevos o modificados: `HomeHero.astro`, `404.astro`, `home.ts`, `cta.ts` |
| R9.1 | `404.astro` (`WhatsAppButton` principal) · `data/cta.ts` |
| R9.2 | `404.astro` ("Ir al inicio" secundario, `<nav>` de servicios, texto) |
| RNF1 | `WhatsAppButton.astro` · `SiteHeader.astro` · `WhatsAppFab.astro` · `404.astro` · `global.css` |
| RNF2 | `WhatsAppFab.astro` (sin trabajo por scroll) · protocolo de Lighthouse |
| RNF3 | `package.json` (sin cambios); sin scripts de terceros |
| RNF4 | Todos los cambios: solo `wa.me` e Instagram |
| RNF5 | Textos nuevos o modificados (ver R8.5) |
| RNF6 | Textos nuevos o modificados (ver R8.5) |
| RNF7 | `WhatsAppFab.astro` · `SiteHeader.astro` · `global.css:145-150` |
| RNF8 | `WhatsAppButton.astro` (`target` y `rel` fijos) · `SiteHeader.astro` · `WhatsAppFab.astro` · `lib/whatsapp.ts` (sin cambios) |

**Criterios trazados:** 38 funcionales (R1.1–R9.2) y 8 no funcionales (RNF1–RNF8): 46 de 46.

## Aprobación
- [x] Aprobado por el usuario · Fecha: 2026-10-03 (incluye los detalles propuestos de la interfaz, D-040)

## Pendientes de decisión
Ninguno. PD-1 a PD-10 los resolvió el usuario (D-033 a D-039).
