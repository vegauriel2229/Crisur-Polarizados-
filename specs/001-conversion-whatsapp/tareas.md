# Spec 001 — Conversión a WhatsApp · Tareas

**Estado:** APROBADO (2026-10-04) · **Versión:** 2 · **Basado en:** diseño v2 (APROBADO 2026-10-04)

> **v2 (2026-10-04):** T1 y la verificación de cierre usan 5 corridas en `/` (D-048), y la verificación de cierre suma la revisión de origen si `/` no pasa (D-049). v1 fue APROBADO el 2026-10-03 (D-047); v2, el 2026-10-04 (D-050).

> Implementación de a **una tarea por vez**. Al terminar cada una: verificar, mostrar resultado y esperar el OK del usuario.
> Estados: `pendiente` · `en curso` · `esperando OK` · `aprobada` · `bloqueada (motivo)`

> Fuentes: `diseno.md` v1, `decisiones.md` (D-001 a D-040), `requisitos.md` v1 y el código del commit `05b9271`. Las referencias `archivo:línea` apuntan al código actual, igual que en el diseño. Las decisiones tomadas al dividir el trabajo (D-041 a D-046) están al final.

## Cómo leer este documento
- **IDs.** En `diseno.md` y `decisiones.md`, "T1" a "T11" son las decisiones técnicas del paquete D-031. Acá se citan como **D-031/T1**, D-031/T8, etc. Las tareas tienen numeración propia (T1 a T12) porque D-031 es una lista de decisiones y no de trabajo:
  - D-031/T3 no implica cambios: es el patrón actual.
  - D-031/T4 y D-031/T6 son las dos mitades del mismo contrato y se hacen juntas (T7).
  - Hay trabajo del diseño que no figura en D-031: la medición "antes", la forma del flotante, la portada, el aire al pie, los textos del hero y la 404.
  - La correspondencia completa está en la tabla "D-031 → tareas".
- **Verificación.** Los códigos B, H, M, C, K, RM, NJ, L y R son los métodos de `diseno.md` → Estrategia de testing. Toda tarea de código termina con **B** (`npm run build` con 0 errores) y con la revisión de `code-reviewer` contra la spec (paso 6 de `/spec-implementar`). Las verificaciones manuales se hacen sobre `npm run preview`.
- **Orden.** Primero va la medición "antes", porque se toma antes de tocar código (D-030, D-037). Después vienen las bases (etiquetas y componente), luego los requisitos Must (R1, R2, R5) y al final los Should (R4 a R9), según D-013. Al aprobar, el usuario puede reordenar, dividir o quitar tareas.

## Reglas comunes a todas las tareas
- Solo lo que dice `diseno.md`, sin agregados.
- Sin dependencias nuevas: `package.json` y `package-lock.json` no cambian (D-029, RNF3).
- No se tocan los archivos que el diseño marca "sin cambios" (esto cubre R3.3 y R6.3):
  - `src/lib/whatsapp.ts` y `src/config/site.ts`.
  - `src/data/services.ts` y `src/data/gallery.ts`.
  - `src/layouts/BaseLayout.astro` y `src/components/layout/site-header.ts`.
  - `src/styles/global.css`.
- Queda para la spec 006:
  - Migrar al componente los 3 botones que no cambian (`HomeFaqSection.astro:22-25`, `ServiceStory.astro:63-66` y `:99-102`).
  - Unificar las copias de `buildWhatsAppUrl` y de `requireElement`.
- Todo enlace a `wa.me` lleva `target="_blank"` y `rel="noopener noreferrer"` (RNF8).
- Sin `try/catch` genéricos. Código en inglés y comentarios en español (constitución D-008).
- Cada tarea deja el build en verde. Si cambia una prop, en la misma tarea se actualizan todas las páginas que la usan.
- Decisiones que afectan a todas las tareas:
  - Rama y commits (D-041): rama `feature/001-conversion-whatsapp` creada después de T1; un commit por tarea aprobada; merge a `main` al aprobar la entrega. Cada commit y el merge se confirman con el usuario.
  - Mediciones y capturas (D-042): la tabla de T1 se anota en este documento; las capturas se muestran y no se guardan en el repo.
  - Chequeos (D-043): `qa-tester` hace B, H y C; el usuario recorre en Edge una checklist corta con M, K, RM y NJ.

## Tareas

- [x] **T1 — Medición "antes" de Lighthouse**
  - Qué: sobre `main`, antes de cualquier cambio de código, correr `npm run build` y `npm run preview`. Después, 3 corridas de Lighthouse en `/autos/`, `/hogares/` y `/negocios/`, y 5 en `/` (14 en total, D-048). La configuración es la de la auditoría: Lighthouse 12.8.2 local, Edge headless y emulación mobile (constitución D-016, D-030, D-037). Por página se registran:
    - los 3 valores y la mediana de Rendimiento y de TBT;
    - Accesibilidad, Buenas prácticas y SEO.
  - Archivos: ninguno del código. Los resultados se anotan en este documento, como resultado de T1 (D-042).
  - Requisitos: RNF2 (medición "antes")
  - Agente: `seo-rendimiento`
  - Depende de: — (va primera: ninguna tarea de código puede empezar antes)
  - Verificación:
    - Las 14 corridas terminaron sin errores.
    - La tabla tiene los valores de cada corrida y la mediana por página (Rendimiento y TBT), más Accesibilidad, Buenas prácticas y SEO.
    - Quedaron anotados el commit medido y las versiones de Lighthouse y de Edge.
    - `git status` no muestra cambios en `src/`.
  - Resultado: ver "Línea base de Lighthouse (resultado de T1)", antes de la verificación de cierre.
  - Estado: aprobada (2026-10-04, D-050)

- [x] **T2 — Etiquetas de WhatsApp en `src/data/cta.ts`**
  - Qué:
    - Crear `src/data/cta.ts` con `WHATSAPP_CTA_LABELS` (`short`, `hiddenSuffix` y `general`), tal como el bloque "Modelo de datos" del diseño (D-031/T2, D-006, D-027).
    - En `HomeFaqSection.astro:24`, el texto del botón pasa a `WHATSAPP_CTA_LABELS.general`. Es un import y una línea; el marcado no cambia (D-039/PD-7).
  - Archivos:
    - `src/data/cta.ts` (nuevo)
    - `src/components/home/HomeFaqSection.astro`
  - Requisitos: R1.5, R3.2, R4.2 (cierre de la FAQ del inicio), RNF6
  - Agente: `dev-frontend`
  - Depende de: T1
  - Verificación:
    - B.
    - R: `cta.ts` coincide con el diseño. El diff de `HomeFaqSection.astro` es solo el import y la línea `:24`.
    - H: en `dist/index.html`, el botón del cierre sigue diciendo "Consultar por WhatsApp", con el mismo `href`, `target` y `rel` que antes.
  - Estado: aprobada (2026-10-04)

- [x] **T3 — Componente `WhatsAppButton` y los 2 botones que cambian de etiqueta**
  - Qué: crear `src/components/WhatsAppButton.astro` (D-031/T1, D-039/PD-1):
    - Props del diseño: `href`, `label`, `variant: 'primary' | 'secondary'` y `class?`.
    - Reparte `...rest`, con el mismo patrón que `Icon.astro`.
    - Lleva el glifo de WhatsApp. `target` y `rel` son fijos.
    
    Se usa en dos lugares:
    - `HomeHero.astro:28-31`: etiqueta `WHATSAPP_CTA_LABELS.general` y `variant="primary"` (R4.2). El botón de Instagram (`:32-35`) no cambia.
    - `ServiceDetails.astro:36-39`: `label={service.ctaLabel}`, `variant="primary"` y `class="faq-cta"` (R4.3).
  - Archivos:
    - `src/components/WhatsAppButton.astro` (nuevo)
    - `src/components/home/HomeHero.astro`
    - `src/components/service-story/ServiceDetails.astro`
  - Requisitos: R1.5, R3.1, R4.2, R4.3, R4.4, R4.5, R5.3, R5.4, RNF1, RNF8
  - Agente: `dev-frontend`
  - Depende de: T2
  - Verificación:
    - B.
    - H en el inicio: en `dist/index.html`, el botón del hero dice "Consultar por WhatsApp" (ya no "WhatsApp" a secas) y lleva la URL general, `target` y `rel`.
    - H en servicios: en los 3 servicios, el botón de la FAQ dice "Consultar por mi auto/casa/negocio" y lleva la URL del servicio. "Hacer otra pregunta por WhatsApp" ya no aparece en `dist/`.
    - M (360 y 1440): se conservan los estilos que pone el padre. `.socials .button` va a ancho completo a ≤ 520 px. `.faq-cta` conserva su margen y el ancho completo a ≤ 520 px.
    - C: a 360×640 y a 360×560, el botón del hero entra completo (R5.3).
    - K: los dos botones tienen foco visible.
  - Estado: aprobada (2026-10-04; contrato sin `extends`, D-051)

- [ ] **T4 — CTA corto al final de las 3 secciones del inicio**
  - Qué:
    - `AboutSection`, `FilmTypesSection` y `ProcessSection` reciben la prop obligatoria `whatsappUrl: string`. Al final de su contenido, dentro del `<section>`, suman un `WhatsAppButton` con `WHATSAPP_CTA_LABELS.general` y `variant="secondary"` (D-031/T1.b, D-001, D-019).
    - `index.astro` les pasa `defaultWhatsappUrl` (`:14`, `:25-27`; D-031/T3, D-005).
    - Ubicación (D-040, detalles 1 a 3):
      - alineado a la izquierda del contenedor de 76 rem, con margen superior `clamp(2rem, 4vw, 3rem)`;
      - a ≤ 520 px, ancho completo (máx. 22 rem); desde 521 px, ancho al contenido;
      - en `AboutSection`, desde 900 px, va debajo de las dos columnas.
    - Los estilos de ubicación van con scope en cada sección y llegan al botón por `class`. `global.css` no cambia.
  - Archivos:
    - `src/pages/index.astro`
    - `src/components/home/AboutSection.astro`
    - `src/components/home/FilmTypesSection.astro`
    - `src/components/home/ProcessSection.astro`
  - Requisitos: R1.1, R1.2, R1.3, R1.4, R1.5, R3.2, R4.2, R4.4, R4.5, R5.4, RNF1, RNF8
  - Agente: `dev-frontend`
  - Depende de: T3
  - Verificación:
    - B.
    - H: en `dist/index.html` hay un "Consultar por WhatsApp" al final de cada una de las 3 secciones. Los 3 `href` son `https://wa.me/5492616256467?text=…`, el `text` decodificado es "¡Hola Crisur! Quiero hacer una consulta." y todos llevan `target` y `rel`.
    - M en 360, 768, 1024 y 1440: los 3 botones son ghost con glifo. A 360 ocupan el ancho completo (máx. 22 rem); desde 768, el ancho del contenido. En "Sobre nosotros", a 1024 y 1440, el botón queda debajo de las dos columnas.
    - K: con Tab se llega a los 3 botones, con foco visible. Miden al menos 44 px de alto.
  - Estado: pendiente

- [ ] **T5 — "Consultar" fuera del menú en el header**
  - Qué:
    - En `SiteHeader.astro`, el enlace "Consultar" (`:42`) sale del `<nav id="site-nav">` y queda como hermano, entre el `<nav>` y la hamburguesa (D-031/T8, D-003).
    - Contenido: glifo de WhatsApp (oculto a ≤ 520 px) + `WHATSAPP_CTA_LABELS.short` + `<span class="sr-only">` con el complemento de `hiddenSuffix` (D-020, D-027).
    - Las reglas `.site-nav .nav-cta` (`:143-154` y `:245-249`) se reemplazan por las del enlace nuevo:
      - píldora con `--color-cta`, de 44 px de alto en todos los anchos;
      - padding de 1 rem a ≤ 520 px y de 1,2 rem desde 521 px, con 0,5 rem hasta la hamburguesa (D-040, detalles 4 y 5);
      - hover con `--color-cta-hover` y sin elevación; active con `scale(.98)`;
      - una regla propia de movimiento reducido.
    - El panel del menú ya no incluye "Consultar" (D-040, detalle 6).
    - Escritorio (≥ 881 px): el `<nav>` queda a la derecha, pegado a "Consultar", con ≈ 0,75 rem desde Instagram, como hoy (D-044).
    - `site-header.ts` y las props no cambian.
  - Archivos: `src/components/layout/SiteHeader.astro`
  - Requisitos: R4.1, R4.4, R4.5, R5.1, R5.3, R5.4, R5.5, R7.4, RNF1, RNF7, RNF8
  - Agente: `dev-frontend`
  - Depende de: T2
  - Verificación:
    - B.
    - H en las 5 páginas de `dist/`:
      - el enlace está fuera del `<nav>`, entre el `<nav>` y el botón de menú;
      - lleva la URL general en `/` y en la 404, y la del servicio en cada servicio, con `target` y `rel`;
      - su nombre accesible es "Consultar por WhatsApp" (DevTools → Accessibility).
    - NJ + C a 360 px: "Consultar" se ve sin abrir el menú en `/`, `/autos/` y la 404, y no se superpone con el logo.
    - M:
      - mide 44 px de alto;
      - a 360 muestra solo texto y a 768 suma el glifo;
      - a 1024 y 1440, el `<nav>` va en línea con Instagram, a la derecha y a ≈ 0,75 rem de "Consultar", como hoy (D-044), y "Consultar" lleva glifo;
      - el panel del menú (360 y 768) ya no lo incluye, e Instagram sigue ahí (R7.4);
      - el alto del header no cambia.
    - RM: sin transiciones.
    - K: foco visible.
  - Estado: pendiente

- [ ] **T6 — Botón flotante: forma de píldora y etiqueta de `cta.ts`**
  - Qué:
    - `WhatsAppFab.astro` deja de ser un círculo con `aria-label` y pasa a ser una píldora. Lleva el glifo (1,25 rem), `WHATSAPP_CTA_LABELS.short` visible y un `<span class="sr-only">` con el complemento. Se quitan el `aria-label` y la prop `label` (D-016, D-027, D-039/PD-6).
    - CSS:
      - alto de 3,25 rem, ancho de ≈ 140 px, sombra CTA Glow y sin vidrio;
      - a 1 rem del borde derecho y del inferior, más `env(safe-area-inset-bottom)` y `env(safe-area-inset-right)` (D-040, detalle 7);
      - se mantienen el estado oculto por defecto, el fundido con subida de 12 px y la regla de movimiento reducido (D-018).
    - `index.astro:31` y `[service].astro:33` dejan de pasar `label`.
    - El script no cambia en esta tarea: el umbral del 80 % sigue hasta T7.
  - Archivos:
    - `src/components/layout/WhatsAppFab.astro`
    - `src/pages/index.astro`
    - `src/pages/[service].astro`
  - Requisitos: R2.2, R3.1, R4.1, R4.4, R5.4, R5.5, RNF1, RNF7, RNF8
  - Agente: `dev-frontend`
  - Depende de: T2
  - Verificación:
    - B.
    - H en `/` y en los 3 servicios:
      - el flotante muestra "Consultar", tiene el `.sr-only` y no tiene `aria-label`;
      - el `href` es la URL general en `/` y la del servicio en cada servicio (R2.2).
    - M a 360: mide ≈ 140 × 52 px y está abajo a la derecha, a 1 rem de los bordes.
    - RM: aparece sin animación.
    - K: oculto, no recibe foco; visible, tiene foco visible.
  - Estado: pendiente

- [ ] **T7 — Botón flotante: aparición con `IntersectionObserver` y marcas de disparador y de retiro**
  - Qué:
    - Marcas (D-031/T6):
      - `data-whatsapp-fab-trigger` en `.intro` (`HomeHero.astro:21`, D-015) y en `header.beat-cover` (`ServiceStory.astro:55`);
      - `data-whatsapp-fab-retire` en `.closing-copy` (`:96`) y en el portal (`:105`) (D-033);
      - el inicio no lleva marca de retiro (D-017).
    - Script (D-031/T4):
      - un `IntersectionObserver` con umbral 0 reemplaza el listener de `scroll` (`WhatsAppFab.astro:17-26`);
      - aplica la regla del diseño (Contratos): `visible = !disparadorVisible && !retiroActivo`;
      - el flotante vuelve cuando las marcas de retiro salen de pantalla (D-034);
      - la marca de retiro es opcional (D-039/PD-5);
      - si falta `[data-whatsapp-fab]` o `[data-whatsapp-fab-trigger]`, lanza un `Error` descriptivo (`WhatsAppFab: missing element "…"`) y el flotante queda oculto (D-028);
      - sin `try/catch` y sin sumar otra copia de `requireElement`.
    - Se actualiza el comentario de `:12`.
    - La retirada usa el gesto de la aparición en sentido inverso (D-018; D-040, detalle 9).
  - Archivos:
    - `src/components/layout/WhatsAppFab.astro`
    - `src/components/home/HomeHero.astro`
    - `src/components/service-story/ServiceStory.astro`
  - Requisitos: R2.1, R2.3, R2.4, R5.2, R5.5, R5.6, RNF2, RNF4, RNF7
  - Agente: `dev-frontend`
  - Depende de: T6
  - Verificación:
    - B.
    - H:
      - hay un solo disparador en `/` y en cada servicio;
      - cada servicio tiene 2 marcas de retiro y `/` ninguna;
      - la 404 no tiene flotante;
      - el script no escucha `scroll`.
    - M en el inicio (360, 768, 1024 y 1440): el flotante está oculto mientras se ve cualquier parte del intro, aparece cuando sale y se oculta al volver arriba.
    - M en los 3 servicios (mismos anchos):
      - el flotante se ve durante los 4 capítulos;
      - se retira cuando asoma el texto del cierre o el portal, y vuelve cuando salen;
      - queda dentro de la pantalla y nada lo tapa (R2.3);
      - el cierre conserva su botón y el portal (R2.4).
    - M con anclas: al entrar por `/#nosotros` y por `/autos/#<capítulo>`, aparece sin scrollear.
    - RM: aparece y se retira sin animación.
    - D-028, por revisión de código (`code-reviewer`, D-045): si falta el disparador, el script lanza `Error` con un mensaje descriptivo y no toca `data-visible`.
  - Estado: pendiente

- [ ] **T8 — Aire para el flotante en los capítulos (celular) y en el pie**
  - Qué:
    - En `ServiceStory.astro`, a ≤ 880 px, los capítulos (`.beat-chapter`) dejan al menos 5,5 rem de aire abajo (D-017; D-040, detalle 8).
    - En `SiteFooter.astro`, el padding inferior del pie suma 5,5 rem en todas las páginas (D-035).
    - Solo CSS. Las props no cambian.
  - Archivos:
    - `src/components/service-story/ServiceStory.astro`
    - `src/components/layout/SiteFooter.astro`
  - Requisitos: R2.3, R5.6
  - Agente: `dev-frontend`
  - Depende de: T7 (para verificarlo hace falta el flotante con su comportamiento final)
  - Verificación:
    - B.
    - M + C a 360 y 768: en los 3 servicios, el flotante no tapa las últimas líneas de ningún capítulo.
    - M en 360, 768, 1024 y 1440: al final de `/` y de cada servicio, el flotante no queda sobre el texto del pie.
    - C a 640×360 (D-036): el flotante no tapa capítulos, portal ni pie.
    - M: el menú abierto y las preguntas de la FAQ se pueden usar.
  - Estado: pendiente

- [ ] **T9 — Textos del inicio: frase del hero, título del selector y FAQ**
  - Qué:
    - `HomeHero.astro:25`: la segunda frase pasa a "Elegí dónde va la lámina y mirá cómo queda." (D-023). La primera no cambia.
    - `HomeHero.astro:40`: el título pasa a "¿Dónde querés colocar la lámina?" (D-009).
    - `home.ts:49`: la respuesta pasa al texto literal de D-011 (D-031/T11).
    - No se ajustan tamaños ni espacios del hero (D-025).
  - Archivos:
    - `src/components/home/HomeHero.astro`
    - `src/data/home.ts`
  - Requisitos: R5.3, R8.1, R8.2, R8.3 (hero), R8.4, R8.5, RNF5, RNF6
  - Agente: `dev-frontend`
  - Depende de: T1
  - Verificación:
    - B.
    - H: `dist/index.html` tiene los 3 textos exactos y ya no tiene "¿Qué querés polarizar?" ni "Elegí qué querés polarizar".
    - C: a 360×640 y a 360×560, el lede sigue en 3 líneas y el botón de WhatsApp del hero entra completo (R5.3, D-025).
    - R: los textos usan voseo y no tienen cifras ni precios (R8.5). La respuesta de la FAQ coincide con los `treatments` actuales (R8.4).
  - Estado: pendiente

- [ ] **T10 — Portada de servicio sin los datos, en una columna**
  - Qué:
    - En `ServiceStory.astro` se quitan `<dl class="facts">` (`:69-81`) y su CSS (`:324-351` y `:492-494`) (D-007).
    - La grilla de la portada (`:278-282`) pasa a una columna, abajo a la izquierda (D-022).
    - Desde 881 px, el ancho máximo de `.cover-copy` es el de la columna actual: 100 % − ancho de los datos (`min(27rem, 32vw)`) − `column-gap` (`clamp(2rem, 5vw, 5rem)`). Así `100cqi` da el mismo tamaño de título que hoy.
    - El botón de la portada (`:62-67`) no cambia (R6.4). `services.ts` tampoco.
  - Archivos: `src/components/service-story/ServiceStory.astro`
  - Requisitos: R4.3, R6.1, R6.2, R6.3, R6.4
  - Agente: `dev-frontend`
  - Depende de: T1
  - Verificación:
    - B.
    - H: en los 3 servicios de `dist/` no aparece `class="facts"`. "Qué ganás con la lámina" sigue con los 4 `benefits` de cada servicio.
    - R: el diff no toca `services.ts`. A ≥ 881 px, el ancho máximo de `.cover-copy` reproduce la columna actual.
    - M a 1024 y 1440: la portada va en una columna, abajo a la izquierda, y el título no tapa el objeto 3D.
    - M a 360 y 768: la portada no cambia.
    - M: el botón "Consultar por mi …" de la portada está en los 4 anchos (R6.4).
  - Estado: pendiente

- [ ] **T11 — Galería solo cuando hay fotos**
  - Qué (D-031/T10, D-008):
    - `[service].astro` arma `photos = galleryFor(service.id)` y renderiza `<WorkGallery service={service} photos={photos} />` solo si `photos.length > 0`.
    - `WorkGallery.astro` recibe `photos: readonly GalleryPhoto[]` por prop y deja de llamar a `galleryFor` (`:5`, `:14`).
    - Se borran el estado vacío (`:52-67`), su CSS (`:165-199`) y los imports que quedan sin uso: `Icon` (`:3`), `ServiceArt` (`:4`), `instagramUrl` y `siteSettings` (`:7`).
    - El carrusel, los controles y el script no cambian (R7.3).
  - Archivos:
    - `src/pages/[service].astro`
    - `src/components/service-story/WorkGallery.astro`
  - Requisitos: R7.1, R7.2, R7.3, R7.4
  - Agente: `dev-frontend`
  - Depende de: T1
  - Verificación:
    - B.
    - H: en los 3 servicios de `dist/` no aparecen `data-gallery`, "Trabajos en" ni "Muy pronto".
    - M: en los 4 anchos, el cierre pasa directo a "Qué ganás con la lámina".
    - R: `gallery.ts` no cambia y la página tiene la condición `photos.length > 0`. Instagram sigue en el header, el pie y el hero (R7.4).
    - Galería con fotos (R7.3, D-046): con OK del usuario, copiar una imagen de prueba (por ejemplo, `src/assets/brand/logo.jpeg`) en `src/assets/gallery/autos/`, compilar y ver el carrusel en `/autos/`; después, con OK, borrar la copia y comprobar que `git status` no la muestra.
  - Estado: pendiente

- [ ] **T12 — Página 404 con WhatsApp como acción principal**
  - Qué: `404.astro` queda en el orden de D-021:
    1. Ilustración.
    2. Título.
    3. Texto (`:18`), sin "Elegí qué querés polarizar:".
    4. Grupo de acciones, con dos elementos:
       - `WhatsAppButton` con `WHATSAPP_CTA_LABELS.general`, `variant="primary"` y la URL general de `:9`;
       - "Ir al inicio", que pasa de `button-primary` a `button-secondary` y sale del `<nav>`.
    5. Línea "¿Dónde querés colocar la lámina?" (D-024).
    6. `<nav aria-label="Servicios">` con Autos, Hogares y Negocios.
    
    No lleva flotante. Responsive:
    - a ≤ 520 px, las acciones van apiladas a ancho completo (máx. 22 rem);
    - desde 768 px van centradas, en fila o apiladas según el contenedor, sin cambiar el orden.
  - Archivos: `src/pages/404.astro`
  - Requisitos: R3.2, R4.2, R5.3, R5.4, R8.3 (404), R8.5, R9.1, R9.2, RNF1, RNF5, RNF6, RNF8
  - Agente: `dev-frontend`
  - Depende de: T3
  - Verificación:
    - B.
    - H en `dist/404.html`:
      - el orden es el de D-021;
      - "Consultar por WhatsApp" es el único botón rojo y lleva el mensaje general, `target` y `rel`;
      - "Ir al inicio" es `button-secondary`;
      - la línea de D-024 va sola, sin dos puntos, encima del `<nav>`.
    - H en todo `dist/`: "Elegí qué querés polarizar" ya no aparece en ningún archivo.
    - C: a 360×640 y a 360×560, el botón de WhatsApp entra completo.
    - M en 768, 1024 y 1440: el orden se mantiene.
    - K: las dos acciones tienen foco visible.
  - Estado: pendiente

## Línea base de Lighthouse (resultado de T1)
Medida el 2026-10-04 (D-042). Es la referencia para la medición "después" de la Fase 5.

- **Qué se midió:** commit `968ef00` (`main`), sin cambios en `src/`. `npm run build` (0 errores, 5 páginas) + `npm run preview` en `http://localhost:4321`.
- **Herramientas:** Lighthouse 12.8.2 (`npx --offline -y lighthouse@12.8.2 <url> --output=json --chrome-flags="--headless=new" --quiet`, con `CHROME_PATH` apuntando a `msedge.exe`), preset mobile con throttling simulado, Edge 154 headless, Node v24.21.0, Astro 7.3.5. Corridas secuenciales; `benchmarkIndex` entre 1.032 y 1.446.
- **Build sin `PUBLIC_SITE_URL`:** sale sin canonical ni sitemap. El "después" se mide igual.

| Página | Corridas | Rendimiento (por corrida) | Mediana | Piso "después" (−3, D-030) | TBT ms (por corrida) | Mediana | Techo "después" (+10 %, D-038) | A11y | BP | SEO |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 5 (D-048) | 91 / 71 / 99 / 99 / 99 | **99** | 96 | 358 / 2.192 / 50 / 15 / 43 | **50** | 55,0 | 100 | 100 | 100 |
| `/autos/` | 3 | 44 / 53 / 48 | **48** | 45 | 8.082 / 4.852 / 5.878 | **5.878** | 6.465,8 | 100 | 100 | 100 |
| `/hogares/` | 3 | 55 / 54 / 55 | **55** | 52 | 3.669 / 3.653 / 3.364 | **3.653** | 4.018,3 | 100 | 100 | 100 |
| `/negocios/` | 3 | 56 / 55 / 44 | **55** | 52 | 3.405 / 3.397 / 2.264 | **3.397** | 3.736,7 | 100 | 100 | 100 |

Observaciones:
- `/` se comporta en dos niveles: 3 corridas rápidas (TBT 15–50 ms) y 2 lentas (358 y 2.192 ms).
- Las páginas de servicio dan menos que en la auditoría del 2026-10-03 (66/63/60). La auditoría midió el sitio publicado en Vercel y esto es el build local: D-030 y D-037 comparan local contra local.
- Los JSON de las 14 corridas quedaron fuera del repo (D-042).

## Verificación de cierre (Fase 5, `/spec-verificar`)
No son tareas de implementación, pero completan la trazabilidad:
- `seo-rendimiento` hace la medición "después" con el mismo protocolo de T1 (5 corridas en `/`, 3 en cada servicio; D-048) y compara las medianas (RNF2):
  - Rendimiento: después ≥ antes − 3 (D-030).
  - TBT: después ≤ antes + 10 % (D-038).
  - Accesibilidad, Buenas prácticas y SEO: 100.
  - Si `/` no pasa, revisa qué scripts causan el bloqueo; si ninguno es un archivo tocado por esta spec, lo informa como variación y decide el usuario (D-049).
- `qa-tester` recorre la tabla "Requisito → verificación" del diseño completa (46 criterios):
  - en 360, 768, 1024 y 1440, y en horizontal a 640×360 (D-036);
  - con teclado (K), movimiento reducido (RM) y sin JS (NJ);
  - con los casos borde del diseño;
  - incluye el ítem de revisión de R8.4 (D-031/T11).
- `code-reviewer` revisa el diff completo contra la spec:
  - sin cambios en `services.ts`, `site.ts` ni `package.json` (R3.3, R6.3, RNF3);
  - sin `<form>`, cookies, `localStorage`, analytics ni orígenes nuevos (RNF4).

## D-031 → tareas
| Decisión técnica | Contenido | Tarea(s) |
|---|---|---|
| D-031/T1 | Componente `WhatsAppButton` | T3 (lo crea) · T4 y T12 (lo usan) |
| D-031/T1.b | CTA dentro de cada sección del inicio, con la URL por prop | T4 |
| D-031/T2 | `src/data/cta.ts` | T2 |
| D-031/T3 | La página arma la URL y la pasa por props | T4 (`index.astro`). En el resto se mantiene el patrón actual |
| D-031/T4 | `IntersectionObserver` en el flotante | T7 |
| D-031/T6 | Marcas `data-` de disparador y de retiro | T7 |
| D-031/T8 | "Consultar" fuera del `<nav>` | T5 |
| D-031/T10 | Galería solo con fotos; se borra "Muy pronto…" | T11 |
| D-031/T11 | Texto literal de D-011 + ítem de revisión de R8.4 | T9 · Fase 5 |

## Trazabilidad requisito → tareas
| Criterio | Tarea(s) | Además, en Fase 5 |
|---|---|---|
| R1.1 | T4 (`FilmTypesSection`) | M, H |
| R1.2 | T4 (`AboutSection`) | M, H |
| R1.3 | T4 (`ProcessSection`) | M, H |
| R1.4 | T4 (`index.astro` pasa la URL general) | H, M |
| R1.5 | T2, T3, T4 | M, H |
| R2.1 | T7 | M |
| R2.2 | T6, T7 | H, M |
| R2.3 | T6 (posición), T7, T8 | M |
| R2.4 | T7 (en el cierre solo se agregan las marcas) | M, H |
| R3.1 | T3, T5, T6 (usan la URL del servicio que arma `[service].astro`) | H |
| R3.2 | T2, T4, T5, T12 | H |
| R3.3 | T2 a T12 (regla común: `services.ts` y `site.ts` no cambian) | R, H |
| R4.1 | T5, T6 (con T2) | M, H |
| R4.2 | T2, T3, T4, T12 | M, H |
| R4.3 | T3 (FAQ de servicios), T10 (se conserva el botón de la portada) | M, H |
| R4.4 | T3, T4, T5, T6 | H, R |
| R4.5 | T3, T4, T5 | M |
| R5.1 | T5 | M, NJ, C |
| R5.2 | T7 | M, RM |
| R5.3 | T3, T5, T9, T12 | C |
| R5.4 | T3, T4, T5, T6, T12 | M, K |
| R5.5 | T5, T6, T7 | RM |
| R5.6 | T7 (retiro y regreso), T8 (aire) | M, C |
| R6.1 | T10 | M |
| R6.2 | T10 | R, M |
| R6.3 | T10 · regla común | R |
| R6.4 | T10 | M |
| R7.1 | T11 | M, H |
| R7.2 | T11 | M, R |
| R7.3 | T11 (prueba real, D-046) | R |
| R7.4 | T3 (Instagram del hero), T5 (Instagram del menú), T11 (sin tocar los demás accesos) | M |
| R8.1 | T9 | H, R |
| R8.2 | T9 | M |
| R8.3 | T9 (hero), T12 (404) | M, C |
| R8.4 | T9 | R (ítem de revisión) |
| R8.5 | T9, T12 | R |
| R9.1 | T12 | M, H, C |
| R9.2 | T12 | M |
| RNF1 | T3, T4, T5, T6, T12 | M, K, C |
| RNF2 | T1 ("antes"), T7 (nada se ejecuta en cada scroll) | L ("después") |
| RNF3 | T2 a T12 (regla común: sin dependencias) | R, H |
| RNF4 | T7 (el script solo lee el DOM) · regla común | R, H |
| RNF5 | T9, T12 | R |
| RNF6 | T2, T9, T12 | R |
| RNF7 | T5, T6, T7 | RM |
| RNF8 | T3, T4, T5, T6, T12 | H, B |

**Criterios trazados:** 38 funcionales (R1.1 a R9.2) y 8 no funcionales (RNF1 a RNF8): 46 de 46. Ninguna tarea tiene trabajo que no figure en `diseno.md`.

## Decisiones tomadas en esta fase
Resueltas por el usuario el 2026-10-03; detalle en `decisiones.md`.

| ID | Tema | Elegida |
|---|---|---|
| D-041 | Rama y commits (PT-1) | Rama `feature/001-conversion-whatsapp` desde `main` después de T1; un commit por tarea aprobada (Conventional Commits, en inglés); merge a `main` al aprobar la entrega. Cada commit y el merge, con confirmación. |
| D-042 | Mediciones y capturas (PT-2) | La tabla de T1 se anota en este documento y después pasa al informe de Fase 5. Las capturas se muestran y no se guardan en el repo. |
| D-043 | Chequeos manuales (PT-3) | Mixto: `qa-tester` hace B, H y C (Edge headless); el usuario recorre en Edge una checklist corta de lo interactivo (M, K, RM, NJ). |
| D-044 | Header en escritorio (PT-4) | Como hoy: `<nav>` a la derecha, pegado a "Consultar", a ≈ 0,75 rem de Instagram. |
| D-045 | Verificación de D-028 (PT-5) | Revisión de código (`code-reviewer`). |
| D-046 | Prueba real de R7.3 (PT-6) | Sí, en T11, con imagen temporal que se crea y se borra con OK del usuario. |

## Aprobación
- [x] Aprobado por el usuario · Fecha: 2026-10-03 (D-047)
