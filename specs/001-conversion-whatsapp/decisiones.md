# Spec 001 — Conversión a WhatsApp · Registro de decisiones

> Toda decisión la toma el usuario. Este registro se completa en el momento en que responde. Las decisiones de proyecto (D-001 a D-019) están en `specs/constitucion.md`; acá se citan como "constitución D-0NN".

| ID | Fase | Tema | Elegida | Fecha |
|---|---|---|---|---|
| D-001 | 1 | P1 · Acción de WhatsApp en las secciones del inicio | A) Un CTA corto al final de cada sección | 2026-10-03 |
| D-002 | 1 | P2 · Acción durante la escena de las páginas de servicio | B) Botón flotante visible durante la escena | 2026-10-03 |
| D-003 | 1 | P5 · Acción siempre visible en celular | A) "Consultar" fuera del menú hamburguesa, en el header | 2026-10-03 |
| D-004 | 1 | P6 · Cuándo aparece el botón flotante | B) Al salir el hero / la portada de la pantalla | 2026-10-03 |
| D-005 | 1 | P3 · Mensajes prearmados de los botones nuevos | A) Reusar los actuales (general en el inicio, el de cada servicio en servicios) | 2026-10-03 |
| D-006 | 1 | P4 · Criterio de etiquetas | C) Corta arriba ("Consultar" en header y flotante), completa en el cuerpo ("Consultar por WhatsApp" en el inicio, "Consultar por mi auto/casa/negocio" en servicios) | 2026-10-03 |
| D-007 | 1 | P7 · Dónde queda cada beneficio en las páginas de servicio | B) Capítulos + "Qué ganás con la lámina"; se quitan los datos de la portada | 2026-10-03 |
| D-008 | 1 | P8 · Galería sin fotos | A) Ocultarla hasta que haya fotos | 2026-10-03 |
| D-009 | 1 | P9 · Texto que reemplaza "Elegí qué querés polarizar" | "¿Dónde querés colocar la lámina?" (hero, título del selector y 404) | 2026-10-03 |
| D-010 | 1 | P10 · WhatsApp en la 404 | A) Acción principal; "Ir al inicio" pasa a secundaria | 2026-10-03 |
| D-011 | 1 | P11 · FAQ "¿Hacen autos, casas y negocios?" | A) Listar los tratamientos reales con el texto propuesto | 2026-10-03 |
| D-012 | 1 | P12 · Hero a 360×640 | A) Medir primero (capturas en la Fase 2) y después proponer el ajuste | 2026-10-03 |
| D-013 | 1 | Prioridades de R1–R9 | Confirmadas: Must R1, R2, R5 · Should R3, R4, R6, R7, R8, R9 | 2026-10-03 |
| D-014 | 1 | Supuestos S2, S3, S4, S6, S7, S8, S9 | Confirmados todos (S1 = D-013; S5 resuelto por D-012) | 2026-10-03 |
| D-015 | 2 | Qué cuenta como "hero" en el inicio (D-004) | Solo el intro (moneda, título, lede y botones); el selector no cuenta | 2026-10-03 |
| D-016 | 2 | Forma del botón flotante | Píldora roja con glifo + "Consultar" visible | 2026-10-03 |
| D-017 | 2 | Solapamiento del flotante (R5.6) | Se retira al llegar al cierre de cada servicio; capítulos con aire abajo en celular; en el inicio no se retira (aire extra al pie) | 2026-10-03 |
| D-018 | 2 | Aparición del flotante | Fundido + subida de 12 px (la actual); sin animación con movimiento reducido | 2026-10-03 |
| D-019 | 2 | Tratamiento del CTA corto de las secciones del inicio | Botón secundario ("ghost") con glifo de WhatsApp | 2026-10-03 |
| D-020 | 2 | "Consultar" en el header | Píldora roja de 44 px: solo texto a ≤ 520 px, con glifo de WhatsApp desde 521 px | 2026-10-03 |
| D-021 | 2 | Orden de la 404 | Acciones primero: ilustración · título · texto · [Consultar por WhatsApp] · [Ir al inicio] · frase · Autos/Hogares/Negocios | 2026-10-03 |
| D-022 | 2 | Portada de servicio sin los datos | Una columna abajo a la izquierda, con el título gigante limitado a su tamaño actual | 2026-10-03 |
| D-023 | 2 | Frase del hero que reemplaza "Elegí qué querés polarizar…" (R8.3) | "Elegí dónde va la lámina y mirá cómo queda." | 2026-10-03 |
| D-024 | 2 | Frase de la 404 que reemplaza "Elegí qué querés polarizar:" (R8.3) | "¿Dónde querés colocar la lámina?" (línea propia sobre Autos / Hogares / Negocios) | 2026-10-03 |
| D-025 | 2 | Ajuste del hero en celular (R5.3, D-012) | Ninguno: la medición muestra que R5.3 ya se cumple | 2026-10-03 |
| D-026 | 2 | Link de WhatsApp del pie | Se deja como está ("WhatsApp" + número): es un dato de contacto, fuera de R4 | 2026-10-03 |
| D-027 | 2 | Nombre accesible de "Consultar" (header y flotante) | "Consultar por WhatsApp": texto visible "Consultar" + "por WhatsApp" oculto a la vista (R4.4 leído como "empieza con el texto visible", WCAG 2.5.3) | 2026-10-03 |
| D-028 | 2 | Si el flotante no encuentra el hero o la portada | Falla rápido: error en consola y el flotante no aparece | 2026-10-03 |
| D-029 | 2 | Verificación de la spec | `npm run build` + checklist manual por criterio en 360/768/1024/1440 (teclado, movimiento reducido, sin JS) + capturas con Edge; sin dependencias nuevas | 2026-10-03 |
| D-030 | 2 | Medición de RNF2 (Lighthouse) | 3 corridas por página antes y después, en la misma máquina; se compara la mediana; tolerancia de −3 puntos | 2026-10-03 |
| D-031 | 2 | Paquete técnico T1–T11 | Aprobado en bloque con las sugerencias del `arquitecto` (detalle abajo) | 2026-10-03 |
| D-032 | 2 | Instagram a ≤ 520 px: DESIGN.md vs. sitio | Fuera de esta spec: se anota en el Anexo A de la constitución para la spec 002 o 006 | 2026-10-03 |
| D-033 | 2 | PD-2 · Qué elemento del cierre retira el flotante | El contenido del cierre (`.closing-copy` y el portal), no el bloque completo | 2026-10-03 |
| D-034 | 2 | PD-3 · ¿El flotante vuelve después del cierre en servicios? | Sí: reaparece cuando el contenido del cierre sale de pantalla | 2026-10-03 |
| D-035 | 2 | PD-4 · Aire extra al pie para el flotante | En el pie de todas las páginas, 5,5 rem (sin props nuevas) | 2026-10-03 |
| D-036 | 2 | PD-10 · Celular en horizontal | Se verifica aparte a 640×360, con el método de capturas de D-025 | 2026-10-03 |
| D-037 | 2 | PD-8 · Servidor de Lighthouse | Build local (`npm run preview`) antes y después, en la misma máquina | 2026-10-03 |
| D-038 | 2 | PD-9 · Tolerancia del TBT (RNF2) | Mediana de después ≤ mediana de antes + 10 % | 2026-10-03 |
| D-039 | 2 | PD-1, PD-5, PD-6, PD-7 · Detalles internos | Aprobados en bloque con las sugerencias (detalle abajo) | 2026-10-03 |
| D-040 | 2 | Aprobación del diseño y de los 9 detalles propuestos de la interfaz | Aprobados tal como están en `diseno.md` v1 | 2026-10-03 |
| D-041 | 3 | PT-1 · Rama y commits durante la implementación | A) `feature/001-conversion-whatsapp` después de T1, un commit por tarea aprobada, merge a `main` al aprobar la entrega | 2026-10-03 |
| D-042 | 3 | PT-2 · Dónde se registran las mediciones y las capturas | A) Tabla de T1 en `tareas.md` (pasa al informe de Fase 5); las capturas se muestran y no se guardan | 2026-10-03 |
| D-043 | 3 | PT-3 · Quién hace los chequeos manuales | A) Mixto: `qa-tester` hace build, HTML y capturas; el usuario recorre una checklist corta de lo interactivo | 2026-10-03 |
| D-044 | 3 | PT-4 · Header en escritorio (≥ 881 px) | A) Como hoy: `<nav>` a la derecha, a ≈ 0,75 rem de "Consultar" | 2026-10-03 |
| D-045 | 3 | PT-5 · Verificación de D-028 | A) Revisión de código (`code-reviewer`) | 2026-10-03 |
| D-046 | 3 | PT-6 · Prueba real de R7.3 | A) Sí, en T11: imagen de prueba que se crea y se borra, con OK del usuario | 2026-10-03 |
| D-047 | 3 | Aprobación de `tareas.md` v1 | Aprobado tal como está: T1–T12 en ese orden | 2026-10-03 |
| D-048 | 4 | Corridas de Lighthouse en el inicio (varianza en T1) | 5 corridas en `/` antes y después (mediana de 5); los servicios siguen con 3. Ajusta D-030 | 2026-10-04 |
| D-049 | 4 | Qué pasa si `/` no pasa el piso o el techo en la Fase 5 | Revisar el origen: si los scripts del bloqueo no son archivos tocados por la spec, se informa como variación y decide el usuario | 2026-10-04 |
| D-050 | 4 | Aprobación de T1 y de `diseno.md` / `tareas.md` v2 | Aprobados; commit en `main` y rama `feature/001-conversion-whatsapp` (D-041) | 2026-10-04 |
| D-051 | 4 | Contrato de `WhatsAppButton` (T3): ¿`extends HTMLAttributes<'a'>`? | Quitarlo: queda el contrato literal del diseño (`href`, `label`, `variant`, `class?`) | 2026-10-04 |
| D-052 | 4 | Ritmo de T4–T12 | Una tarea a la vez, con OK y confirmación de commit en cada una | 2026-10-04 |
| D-053 | 4 | Espacio sobre el CTA de "Sobre nosotros" (T4) | El `gap` de la grilla `.about-inner` (`clamp(2rem, 5vw, 3rem)`), sin `margin-top` extra | 2026-10-04 |
| D-054 | 4 | Bloque `.section-cta` repetido en las 3 secciones (T4, sugerencia 🟡 de `code-reviewer`) | Mantenerlo con scope en cada sección; `global.css` sin cambios | 2026-10-04 |
| D-055 | 4 | Margen negativo para D-044 en el header (T5, S1 de `code-reviewer`) | Simplificar: `gap` del header a 0,75 rem, sin margen negativo | 2026-10-04 |
| D-056 | 4 | Tamaño explícito del glifo en el header (T5, S2 de `code-reviewer`) | Borrar las 4 líneas: usa el tamaño por defecto de `.icon` | 2026-10-04 |
| D-057 | 4 | Índice de capítulos superpuesto con el título en `/autos/` a 1440×800 (fuera de T5) | Anotarlo en el Anexo A de la constitución y volver a mirarlo en T10 | 2026-10-04 |
| D-058 | 4 | Aprobación de T5 | Aprobada con D-055 y D-056; commit tras verificar | 2026-10-04 |
| D-059 | 4 | Tamaño explícito del glifo del flotante (T6, sugerencia de `code-reviewer`) | Borrarlo (y la clase `fab-icon`), como en D-056 | 2026-10-04 |
| D-060 | 4 | Aprobación de T6 | Aprobada con D-059; commit tras verificar | 2026-10-04 |
| D-061 | 4 | Cómo sumar el ploteo (servicio nuevo informado por el usuario) | Mínimo ahora (FAQ + `PRODUCT.md`) y spec propia (007) para mostrarlo | 2026-10-04 |
| D-062 | 4 | Fotos de ploteo | Fuera del proyecto por ahora; en `gallery/autos/` solo fotos de polarizado | 2026-10-04 |
| D-063 | 4 | Texto de la FAQ "¿Hacen autos, casas y negocios?" con el ploteo (reemplaza el texto de D-011) | D-011 + "También hacemos ploteo, sobre todo en autos." | 2026-10-04 |
| D-064 | 4 | Lugar de la spec 007-ploteo en el plan | Después de la 001: 001 → 007 → 003 → 002 | 2026-10-04 |
| D-065 | 4 | Aprobación de requisitos v2, diseño v3 y tareas v3 (FAQ con ploteo) | Aprobados; commit en la rama | 2026-10-04 |
| D-066 | 4 | Fotos de ploteo subidas a `gallery/autos/` (Beetle "Herbie", 2) | Moverlas fuera del repo, a `C:\Proyectos\Crisur-fotos-ploteo\` (D-062) | 2026-10-04 |
| D-067 | 4 | Foto de la Chrysler PT Cruiser de frente | Es polarizado: va a la galería | 2026-10-04 |
| D-068 | 4 | Patentes cortadas en el borde de 4 fotos | Dejarlas como están (no se leen completas) | 2026-10-04 |
| D-069 | 4 | Nombres (descripción) y orden de las 11 fotos de `/autos` | Los propuestos; commit aparte | 2026-10-04 |
| D-070 | 4 | Bug: la galería muestra las fotos verticales (480 × 803) en lugar de 4:3 | Corregirlo ahora con `height: auto` en `.gallery-photo`, commit aparte | 2026-10-04 |
| D-071 | 4 | Bug de T7: el flotante no aparece al entrar por el ancla de un capítulo (adyacencia por borde) | `rootMargin: '-1px 0px'` en el observer | 2026-10-04 |
| D-072 | 4 | Documentar el `rootMargin` | Diseño v4 y tareas v4 con la nota; se aprueban con T7 | 2026-10-04 |
| D-073 | 4 | Prueba de regresión del bug de T7 | Script de medición fuera del repo (scratchpad), como en D-070 | 2026-10-04 |
| D-074 | 4 | Sugerencias menores de `code-reviewer` en T7 | En bloque: corregir el comentario del flotante; dejar los otros dos comentarios y `querySelectorAll` | 2026-10-04 |
| D-075 | 4 | Aprobación de T7 y de diseño v4 / tareas v4 | Aprobados; commit en la rama | 2026-10-04 |
| D-076 | 4 | Capítulos que crecen en celular horizontal con pantalla baja (~300 px) por el aire de T8 | Volver a Fase 2 para ajustarlo (diseño v5) | 2026-10-04 |
| D-077 | 4 | Sugerencias de simplificación de `code-reviewer` en T8 | Dejar `calc(2rem + 5.5rem)` y el 5,5 rem en los 2 archivos | 2026-10-04 |
| D-078 | 4 | Aprobación de T8 | Aprobada; commit en la rama | 2026-10-04 |
| D-079 | 4 | Orden entre el commit de T8 y el ajuste de D-076 | Commit de T8 ahora; ajuste aparte como T8b | 2026-10-04 |
| D-080 | 2 | Ajuste para pantallas bajas en horizontal (D-076) | Tipografía compacta en los capítulos; padding superior sin cambios | 2026-10-04 |
| D-081 | 2 | Mención de la tipografía compacta en "Componentes y archivos afectados" | Dejarla como está (la regla vive en Interfaz) | 2026-10-04 |
| D-082 | 2–3 | Aprobación de diseño v5 y tareas v5 (T8b) | Aprobados; commit en la rama | 2026-10-04 |
| D-083 | 4 | Título del capítulo sobre el objeto 3D en horizontal con pantalla baja (T8b) | Anotarlo en el Anexo A de la constitución | 2026-10-04 |
| D-084 | 4 | Aprobación de T8b | Aprobada; commit en la rama | 2026-10-04 |
| D-085 | 4 | Lugar de las fotos de ploteo (reemplaza la ubicación de D-066) | Dentro del proyecto, en `fotos-pendientes/ploteo/`, fuera de `src/` y `public/` | 2026-10-04 |
| D-086 | 4 | ¿Las fotos de ploteo van a Git? | No: `fotos-pendientes/` en `.gitignore` (una foto tiene la patente completa) | 2026-10-04 |
| D-087 | 4 | `.claude/agent-memory/` sin trackear | Sumarla a `.gitignore` | 2026-10-04 |
| D-088 | 4 | "Polarizado(s)" como término general en el `h1`, el `<title>` y "Sobre nosotros" (fuera de T9) | Anotarlo en el Anexo A para la spec 004 (SEO) | 2026-10-04 |
| D-089 | 4 | Aprobación de T9 | Aprobada; 2 commits: `chore` (D-085 a D-087) y T9 | 2026-10-04 |

---

### D-001 — Acción de WhatsApp en las secciones del inicio (P1)
- **Fase:** 1
- **Contexto:** "Una lámina para cada vidrio", "Sobre nosotros" y "Cómo trabajamos" no tienen acción (auditoría C1); principio 1 de `PRODUCT.md`.
- **Opciones presentadas:**
  - A) Un CTA corto al final de cada sección — pro: cumple el principio al pie de la letra, fácil de verificar · contra: más botones repetidos.
  - B) El paso "Nos escribís" como link + botón en las muestras — pro: menos botones · contra: "Sobre nosotros" queda sin acción propia.
- **Recomendación del equipo:** A, por el principio 1.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-002 — Acción durante la escena de las páginas de servicio (P2)
- **Fase:** 1
- **Contexto:** los 4 capítulos de la escena 3D (unos 500 svh de scroll) quedan sin acción entre la portada y el cierre (auditoría C1).
- **Opciones presentadas:**
  - A) Un CTA al final de cada capítulo — pro: acción siempre en contexto · contra: repetición, escena más cargada.
  - B) Botón flotante visible durante toda la escena — pro: escena limpia · contra: depende de P6 y de JavaScript.
- **Recomendación del equipo:** B, combinada con P6.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-03

### D-003 — Acción siempre visible en celular (P5)
- **Fase:** 1
- **Contexto:** en celular, "Consultar" está dentro del menú hamburguesa (`SiteHeader.astro:245`).
- **Opciones presentadas:**
  - A) "Consultar" fuera del menú, siempre visible en el header — pro: visible desde la primera pantalla, sin tapar contenido, sin depender de JS · contra: ocupa lugar en un header de 360 px.
  - B) Botón flotante desde que carga — pro: siempre a mano · contra: tapa la primera pantalla y duplica el hero.
  - C) Las dos — pro: máxima visibilidad · contra: redundancia.
  - D) Dejarlo como está — contra: depende del scroll.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-004 — Cuándo aparece el botón flotante (P6)
- **Fase:** 1
- **Contexto:** hoy aparece al pasar el 80 % del alto de la pantalla (`WhatsAppFab.astro:21`).
- **Opciones presentadas:**
  - A) Desde que carga — pro: siempre visible · contra: duplica el CTA del hero.
  - B) Al salir el hero / la portada — pro: no compite con el hero; en servicios aparece cuando empieza la escena (cubre D-002) · contra: ninguno relevante con D-003.
  - C) Mantener el 80 % — contra: sigue el tramo sin acción fija.
- **Recomendación del equipo:** B.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-03

### D-005 — Mensajes prearmados de los botones nuevos (P3)
- **Fase:** 1
- **Contexto:** hoy existen el mensaje general ("¡Hola Crisur! Quiero hacer una consulta.", `src/config/site.ts:28`) y uno por servicio (`src/data/services.ts`, `whatsappMessage`).
- **Opciones presentadas:**
  - A) Reusar los actuales — pro: nada nuevo que aprobar · contra: el dueño no sabe desde qué sección escribieron.
  - B) Un mensaje por sección — pro: más contexto para el dueño · contra: textos nuevos a aprobar en la Fase 2.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-006 — Criterio de etiquetas de los botones de WhatsApp (P4)
- **Fase:** 1
- **Contexto:** hoy hay 5 etiquetas: "WhatsApp", "Consultar", "Consultar por WhatsApp", "Consultar por mi auto/casa/negocio" y "Hacer otra pregunta por WhatsApp".
- **Opciones presentadas:**
  - A) Verbo + "por WhatsApp" en todo, con variante por servicio — pro: claro · contra: etiqueta larga en el header de 360 px.
  - B) Una única etiqueta — pro: máxima consistencia · contra: se pierde la personalización por servicio.
  - C) Corta arriba, completa abajo: "Consultar" en header y flotante; "Consultar por WhatsApp" en el inicio y "Consultar por mi auto/casa/negocio" en servicios — pro: entra en 360 px, coherente con D-003 · contra: dos formas (corta y completa).
- **Recomendación del equipo:** C.
- **Decisión del usuario:** C, con esos textos.
- **Fecha:** 2026-10-03

### D-007 — Dónde queda cada beneficio en las páginas de servicio (P7)
- **Fase:** 1
- **Contexto:** cada beneficio aparece 3 veces: datos de la portada (ocultos en celular), capítulos de la escena y "Qué ganás con la lámina".
- **Opciones presentadas:**
  - A) Portada + capítulos; quitar o reducir "Qué ganás" — pro: resumen inmediato · contra: se pierde el resumen final.
  - B) Capítulos + "Qué ganás"; quitar los datos de la portada — pro: portada más limpia, "Qué ganás" como resumen antes del cierre · contra: la portada de escritorio pierde el resumen inmediato.
  - C) Portada + "Qué ganás"; capítulos con otro contenido — pro: sin repetición · contra: contenido nuevo a redactar.
- **Recomendación del equipo:** B.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-03

### D-008 — Galería sin fotos (P8)
- **Fase:** 1
- **Contexto:** sin fotos, la galería se titula "Trabajos en …" (`WorkGallery.astro:20`) y muestra "Muy pronto…" con link a Instagram. Instagram sigue en el header, el pie y el hero.
- **Opciones presentadas:**
  - A) Ocultarla hasta tener fotos — pro: no promete lo que no hay, acorta el scroll, reaparece sola al cargar fotos · contra: se pierde ese link a Instagram.
  - B) Título neutro + Instagram — pro: encamina a los trabajos publicados · contra: manda gente fuera del sitio; depende de lo publicado en @crisur2026.
  - C) Otro título + WhatsApp — pro: empuja a la consulta · contra: texto nuevo a aprobar.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-009 — Texto que reemplaza "Elegí qué querés polarizar" (P9)
- **Fase:** 1
- **Contexto:** el texto aparece en el párrafo del hero (`HomeHero.astro:25`), el título del selector (`HomeHero.astro:40`, "¿Qué querés polarizar?") y la 404 (`404.astro:18`). Hogares no ofrece polarizado (espejado, esmerilado y seguridad).
- **Opciones presentadas:**
  - A) "¿Dónde querés colocar la lámina?" — pro: cubre los 3 servicios y los 4 tratamientos.
  - B) "Elegí tu caso" — pro: corto · contra: dice menos.
  - C) "¿Qué querés proteger o transformar?" — pro: habla del resultado · contra: más abstracto.
  - D) Dejarlo como está — pro: "polarizar" es la palabra coloquial y de la marca · contra: no cubre Hogares.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A, aplicado en los 3 lugares.
- **Fecha:** 2026-10-03

### D-010 — WhatsApp en la 404 (P10)
- **Fase:** 1
- **Contexto:** la 404 tiene texto, links a los 3 servicios y "Ir al inicio" como botón principal (`404.astro:20-23`); WhatsApp solo está en el "Consultar" del header.
- **Opciones presentadas:**
  - A) WhatsApp como acción principal; "Ir al inicio" secundaria; se mantienen los links y el texto.
  - B) WhatsApp secundaria, debajo de la navegación.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-011 — FAQ "¿Hacen autos, casas y negocios?" (P11)
- **Fase:** 1
- **Contexto:** la respuesta actual (`data/home.ts:49`) no menciona seguridad y no coincide con `treatments` de `services.ts` (autos: polarizado y seguridad; hogares: espejado, esmerilado y seguridad; negocios: los 4).
- **Opciones presentadas:**
  - A) Listar lo real. Texto propuesto: "Sí: polarizado y láminas de seguridad para autos; espejado, esmerilado y seguridad para casas; y todas las opciones para negocios y oficinas."
  - B) Remitir a los servicios sin listar — contra: no responde qué hacen en cada uno.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A, con el texto propuesto.
- **Fecha:** 2026-10-03

### D-012 — Hero a 360×640 (P12)
- **Fase:** 1
- **Contexto:** que los botones del hero queden al borde de la primera pantalla es una estimación por código.
- **Opciones presentadas:**
  - A) Medir primero (capturas a 360×640 con barra del navegador en la Fase 2) y después proponer el ajuste.
  - B) Achicar el título del hero en celular.
  - C) Subir el selector de servicios.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-013 — Prioridades de los requisitos
- **Fase:** 1
- **Contexto:** prioridades propuestas por el analista (supuesto S1).
- **Opciones presentadas:**
  - A) Confirmarlas: Must R1, R2, R5 · Should R3, R4, R6, R7, R8, R9 — todos entran en la spec; los Should se pueden postergar si algo se complica.
  - B) Todas Must — la spec no se cierra sin los 9.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-014 — Supuestos
- **Fase:** 1
- **Contexto:** supuestos S2, S3, S4, S6, S7, S8 y S9 de `requisitos.md` (S1 se resolvió con D-013 y S5 con D-012).
- **Opciones presentadas:** confirmar todos · corregir alguno.
- **Decisión del usuario:** confirmados todos.
- **Fecha:** 2026-10-03

### D-015 — Qué cuenta como "hero" en el inicio (opciones T5 / V6)
- **Fase:** 2
- **Contexto:** la sección `home-hero` (`HomeHero.astro:17-61`) incluye el intro y el selector de servicios (~1,7 pantallas en celular). El header no es fijo.
- **Opciones presentadas:**
  - A) Solo el intro — pro: el flotante aparece cuando los botones del hero salen de pantalla; nunca hay tramo sin WhatsApp · contra: convive con el selector.
  - B) Toda la sección — pro: selector limpio · contra: ~1 pantalla sin ningún WhatsApp a la vista.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-016 — Forma del botón flotante (opción V4)
- **Fase:** 2
- **Contexto:** hoy es un círculo de 56 px solo con el glifo; D-006 fija la etiqueta "Consultar".
- **Opciones presentadas:**
  - A) Píldora con glifo + "Consultar" (~140 px, 52 px de alto) — pro: etiqueta visible, misma palabra que el header · contra: ocupa ~39 % del ancho a 360 px.
  - B) Círculo solo ícono — pro: tapa lo mínimo · contra: la etiqueta no se ve.
  - C) Píldora que se contrae a círculo — contra: más movimiento y JS.
  - Común a todas: margen para la barra de gestos de iOS (`safe-area-inset-bottom`).
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-017 — Solapamiento del flotante (opciones T7 / V5)
- **Fase:** 2
- **Contexto:** en el cierre de cada servicio el flotante cae sobre el portal "Siguiente" (`ServiceStory.astro:513-516`) de forma permanente; en celular tapa el final del texto de los capítulos.
- **Opciones presentadas:**
  - A) Se retira al llegar al cierre del servicio; los capítulos reservan aire abajo en celular; en el inicio no se retira (aire extra al pie).
  - B) A + se retira también en el bloque final del inicio.
  - C) Siempre visible; el portal y los textos se corren — contra: más cambios de layout, dos WhatsApp a la vez en el cierre.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-018 — Aparición del flotante (opción V7)
- **Fase:** 2
- **Opciones presentadas:** A) fundido + subida (actual) · B) barrido tipo espátula · C) instantáneo. Con movimiento reducido, todas sin animación.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-019 — Tratamiento del CTA corto de las secciones del inicio (opción V2)
- **Fase:** 2
- **Contexto:** 3 CTA nuevos (D-001) con etiqueta "Consultar por WhatsApp" (D-006); con D-004/D-015 conviven con el flotante rojo.
- **Opciones presentadas:**
  - A) Rojo lleno en las tres — contra: 6 botones rojos más el flotante.
  - B) Secundario "ghost" con glifo — pro: respeta "el rojo es luz y acción" · contra: menos peso visual.
  - C) Franja con texto + botón rojo — contra: textos nuevos, parece banner.
  - D) Graduado: ghost en dos, rojo en "Cómo trabajamos".
- **Recomendación del equipo:** B.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-03

### D-020 — "Consultar" en el header (opción V3)
- **Fase:** 2
- **Contexto:** a 360 px quedan ~165 px entre logo y hamburguesa; el botón sube de 40 a 44 px (R5.4).
- **Opciones presentadas:**
  - A) Solo texto siempre.
  - B) Glifo + texto siempre — contra: ~31 px de holgura a 360 px.
  - C) Solo texto a ≤ 520 px; glifo desde 521 px — contra: dos formas del mismo botón.
- **Recomendación del equipo:** C.
- **Decisión del usuario:** C.
- **Fecha:** 2026-10-03

### D-021 — Orden de la 404 (opción V8)
- **Fase:** 2
- **Opciones presentadas:**
  - A) Acciones primero (WhatsApp entra en la primera pantalla a 360×640 y 360×560).
  - B) Cambio mínimo — contra: el WhatsApp queda fuera de la primera pantalla en celular.
  - C) A + ilustración más chica en pantallas bajas.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-022 — Portada de servicio sin los datos (opción V9)
- **Fase:** 2
- **Contexto:** al quitar la columna de datos (D-007, solo visible ≥ 881 px), el título gigante crecería ~50 % (se mide contra su contenedor).
- **Opciones presentadas:**
  - A) Una columna con el título limitado a su tamaño actual.
  - B) El título crece hasta su tope — contra: puede tapar el 3D a 1024 px.
  - C) A + pista de scroll — contra: elemento y texto nuevos fuera de la spec.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-023 — Frase del hero (opción V10, R8.3)
- **Fase:** 2
- **Contexto:** `HomeHero.astro:25`. Se cambia solo la segunda frase; límite medido de ~46 caracteres para que el párrafo siga en 3 líneas a 360 px (R5.3).
- **Opciones presentadas:**
  - A) "Elegí dónde va la lámina y mirá cómo queda." (43) — misma idea que D-009 sin repetir "colocar" · contra: "lámina" dos veces en el párrafo.
  - B) "Elegí tu vidrio y mirá cómo queda." (33) — corta · contra: se aleja de la idea del título.
  - C) "Elegí tu auto, casa o negocio y mirá cómo queda." (48) — pasa el límite, requeriría ajustar el hero.
- **Recomendación del equipo:** A (el `disenador-ui` prefería B; el orquestador recomendó A porque R8.3 pide la misma idea que el título).
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-024 — Frase de la 404 (opción V11, R8.3)
- **Fase:** 2
- **Contexto:** `404.astro:18`; con D-021 la frase va en su propia línea, sobre las píldoras de servicios.
- **Opciones presentadas:**
  - A) "¿Dónde querés colocar la lámina?" — igual al selector del inicio.
  - B) "Elegí dónde va la lámina:".
  - C) "Escribinos por WhatsApp o elegí dónde querés la lámina:" — contra: repite el botón de arriba.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-025 — Ajuste del hero en celular (opción V1, D-012)
- **Fase:** 2
- **Contexto:** medición del 2026-10-03 (capturas con iframe de 360 px): el botón de WhatsApp entra completo a 360×640 (y≈485–537) y a 360×560 (holgura ≈ 28 px); Instagram queda cortado a 560.
- **Opciones presentadas:**
  - A) Ninguno, siempre que la frase de D-023 entre en 3 líneas.
  - B) Seguro liviano en pantallas ≤ 600 px de alto (~20 px menos de espacios).
  - C) B + moneda más chica — contra: toca la pieza firma.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-026 — Link de WhatsApp del pie (opción V12.1)
- **Fase:** 2
- **Contexto:** `SiteFooter.astro:34` muestra "WhatsApp" + número; R4.1–R4.3 no lo incluyen.
- **Opciones presentadas:**
  - A) Dejarlo: es un dato de contacto.
  - B) Pasarlo a "Consultar por WhatsApp".
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-027 — Nombre accesible de "Consultar" (opción T9)
- **Fase:** 2
- **Contexto:** "Consultar" (header D-020 y flotante D-016) no dice que abre WhatsApp. R4.4 pide nombre accesible "coincidente" con el texto visible.
- **Opciones presentadas:**
  - A) Exactamente "Consultar" — lectura literal de R4.4 · contra: no anticipa WhatsApp.
  - B) "Consultar" visible + "por WhatsApp" oculto a la vista (`.sr-only`) — nombre "Consultar por WhatsApp", empieza con el texto visible (WCAG 2.5.3) · contra: lee "coincidente" como "empieza igual".
- **Recomendación del equipo:** B.
- **Decisión del usuario:** B. Queda como interpretación de R4.4 para esta spec.
- **Fecha:** 2026-10-03

### D-028 — Si el flotante no encuentra el hero o la portada (opción T6.b)
- **Fase:** 2
- **Opciones presentadas:**
  - A) Falla rápido: error en consola, el flotante no aparece (regla heredada de fail-fast; el "Consultar" del header sigue).
  - B) Falla seguro: flotante siempre visible y error en consola.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-029 — Verificación de la spec (opciones T12 / T14)
- **Fase:** 2
- **Contexto:** no hay tests ni lint (constitución D-012: se exigen cuando existan).
- **Opciones presentadas:**
  - A) Build + checklist manual por criterio en 360/768/1024/1440 + capturas con Edge (método del iframe de 360 px que ya funcionó); Playwright queda para la spec 006.
  - B) A + script de Node sin dependencias que revisa `dist/` — contra: roza la spec 006, frágil.
  - C) Playwright ahora — contra: dependencia nueva, alarga la spec.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-030 — Medición de RNF2 (opción T13)
- **Fase:** 2
- **Contexto:** la línea de base del 2026-10-03 es de 1 corrida por página, con ±5 puntos de ruido.
- **Opciones presentadas:**
  - A) 3 corridas antes y después (misma máquina y configuración: Lighthouse 12.8.2, Edge headless, mobile), mediana, tolerancia −3 puntos.
  - B) 3 corridas, sin tolerancia.
  - C) 1 corrida contra la tabla del 2026-10-03.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-031 — Paquete técnico T1–T11 (aprobado en bloque)
- **Fase:** 2
- **Contexto:** decisiones de estructura interna sin efecto visible ni dependencias nuevas. Opciones completas (A/B/C con pro y contra) en el relevamiento del `arquitecto` del 2026-10-03; acá se registra la opción elegida de cada una.
- **Opciones presentadas:** aprobar en bloque las sugerencias · revisarlas una por una.
- **Decisión del usuario:** aprobar en bloque:
  - **T1:** componente `WhatsAppButton.astro` (props `href`, `label`; siempre `target="_blank"`, `rel="noopener noreferrer"` y glifo) para los 4 CTA nuevos (3 del inicio + 404) y los 2 que cambian de etiqueta (`HomeHero`, `ServiceDetails`). Los 3 que no cambian quedan con su marcado (unificarlos → spec 006).
  - **T1.b:** el CTA corto va dentro de cada sección, al final; la sección recibe la URL por prop.
  - **T2:** "Consultar" y "Consultar por WhatsApp" en un módulo de datos nuevo (`src/data/cta.ts`); `ctaLabel` de servicios sigue en `services.ts`.
  - **T3:** la página arma la URL de WhatsApp y la pasa por props (patrón actual).
  - **T4:** aparición del flotante con `IntersectionObserver` nativo (reemplaza el listener de scroll).
  - **T6:** el hero / la portada se marcan con un atributo `data-`; el script del flotante lo busca (con D-028 si falta).
  - **T8:** el link "Consultar" sale del `<nav>` y queda en el header como hermano, entre el `<nav>` y la hamburguesa.
  - **T10:** `[service].astro` renderiza `WorkGallery` solo si hay fotos (recibe las fotos por prop); se borra el bloque "Muy pronto…" sin uso.
  - **T11:** texto literal de D-011 + ítem de revisión manual para R8.4.
- **Fecha:** 2026-10-03

### D-032 — Instagram a ≤ 520 px: DESIGN.md vs. sitio (opción V12.3)
- **Fase:** 2
- **Contexto:** DESIGN.md dice que a ≤ 520 px el botón de Instagram pasa a acción de texto de 2,75 rem; el sitio lo muestra con fondo y anillo de 3,25 rem.
- **Opciones presentadas:** A) fuera de esta spec (anotarlo) · B) corregir el sitio en la 001 · C) corregir DESIGN.md.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-033 — Qué elemento del cierre retira el flotante (PD-2)
- **Fase:** 2
- **Contexto:** el cierre (`footer#consultar`, `ServiceStory.astro:95`) ocupa una pantalla; su contenido está abajo de todo. R2.1 pide el flotante durante los 4 capítulos.
- **Opciones presentadas:**
  - A) Todo el bloque del cierre — contra: en celular se va mientras se lee el capítulo 4.
  - B) El contenido del cierre (`.closing-copy` y el portal) — pro: se va justo antes de tapar el portal; cumple R2.1 y R5.6.
- **Recomendación del equipo:** B.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-03

### D-034 — ¿El flotante vuelve después del cierre? (PD-3)
- **Fase:** 2
- **Opciones presentadas:**
  - A) Reaparece cuando el cierre sale de pantalla — pro: misma regla que el inicio, acción a mano hasta el pie.
  - B) Queda oculto hasta el final — contra: "Qué ganás" y la FAQ sin acción fija.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-035 — Aire extra al pie (PD-4)
- **Fase:** 2
- **Contexto:** D-017 pide aire al pie sin medida ni lugar; el pie es compartido por las 5 páginas.
- **Opciones presentadas:**
  - A) En el pie de todas las páginas, 5,5 rem — pro: un solo cambio de CSS · contra: en la 404 sobra un poco.
  - B) Solo en páginas con flotante, con una prop nueva en `SiteFooter`.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A (incluye la medida de 5,5 rem).
- **Fecha:** 2026-10-03

### D-036 — Celular en horizontal (PD-10)
- **Fase:** 2
- **Opciones presentadas:** A) verificar a 640×360 con el método de capturas · B) no verificarlo aparte.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-037 — Servidor de Lighthouse (PD-8)
- **Fase:** 2
- **Opciones presentadas:**
  - A) `npm run preview` (build local) antes y después — pro: mismas condiciones, nada que publicar · contra: no comparable uno a uno con la tabla del 2026-10-03.
  - B) Vercel antes + deploy de preview después — contra: requiere deploy y depende de la red.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-038 — Tolerancia del TBT (PD-9)
- **Fase:** 2
- **Opciones presentadas:**
  - A) Sin tolerancia — contra: el ruido puede dar un falso "empeoró".
  - B) Mediana de después ≤ mediana de antes + 10 %.
  - C) Evaluar solo el puntaje — contra: cambia RNF2 (aprobado).
- **Recomendación del equipo:** B.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-03

### D-039 — Detalles internos PD-1, PD-5, PD-6, PD-7 (aprobados en bloque)
- **Fase:** 2
- **Opciones presentadas:** aprobar en bloque las sugerencias · revisarlas una por una.
- **Decisión del usuario:** aprobar en bloque:
  - **PD-1:** `WhatsAppButton` recibe `variant: 'primary' | 'secondary'` (obligatoria, tipada) y `class?` para el layout del padre, y reparte `...rest` (patrón de `Icon.astro`).
  - **PD-5:** la marca de retiro es opcional: sin marca no hay retiro y no hay error.
  - **PD-6:** se quita la prop `label` de `WhatsAppFab`; toma "Consultar" de `src/data/cta.ts`, como el header.
  - **PD-7:** el texto del botón de `HomeFaqSection.astro:24` pasa a `WHATSAPP_CTA_LABELS.general` (un import y una línea; el marcado no cambia).
- **Fecha:** 2026-10-03

### D-040 — Aprobación del diseño y de los detalles propuestos
- **Fase:** 2
- **Contexto:** `diseno.md` v1 incluye 9 detalles de interfaz que propuso el `disenador-ui` para que las decisiones funcionen: (1) CTA de sección alineado a la izquierda con margen superior `clamp(2rem, 4vw, 3rem)`; (2) ancho completo a ≤ 520 px (máx. 22 rem), al contenido desde 521 px; (3) en secciones de dos columnas desde 900 px, el CTA va debajo de ambas; (4) orden del header [Consultar][≡]; (5) paddings del "Consultar" del header (1 rem ≤ 520 px, 1,2 rem desde 521 px; 0,5 rem hasta la hamburguesa); (6) el panel de la hamburguesa ya no lleva su propio botón de WhatsApp; (7) flotante a 1 rem del borde + `safe-area-inset`; (8) aire inferior ≥ 5,5 rem en los capítulos en celular; (9) retirada del flotante con el gesto inverso de la aparición.
- **Opciones presentadas:** aprobar el diseño con los 9 detalles · cambiar algún detalle antes de aprobar.
- **Decisión del usuario:** aprobado tal como está.
- **Fecha:** 2026-10-03

### D-041 — Rama y commits durante la implementación (PT-1)
- **Fase:** 3
- **Opciones presentadas:**
  - A) Rama `feature/001-conversion-whatsapp` desde `main` después de T1; un commit por tarea aprobada (Conventional Commits, en inglés); merge a `main` al aprobar la entrega — pro: cada tarea se puede revertir sola · contra: ~11 confirmaciones de commit.
  - B) La misma rama, un solo commit al terminar la Fase 4 — pro: menos interrupciones · contra: trabajo sin respaldo varios días.
  - C) Commits directo en `main` — contra: no cumple constitución D-010.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A. Cada commit y el merge se siguen confirmando con el usuario.
- **Fecha:** 2026-10-03

### D-042 — Dónde se registran las mediciones y las capturas (PT-2)
- **Fase:** 3
- **Opciones presentadas:**
  - A) Tabla de T1 en `tareas.md`, que después pasa al informe de Fase 5; las capturas se muestran y no se guardan — pro: sin imágenes en el repo · contra: las capturas no quedan como evidencia.
  - B) Carpeta versionada `specs/001-conversion-whatsapp/evidencia/` — pro: evidencia duradera · contra: imágenes en el repo y más commits.
  - C) Solo en el chat — contra: el "antes" puede perderse.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-043 — Quién hace los chequeos manuales (PT-3)
- **Fase:** 3
- **Opciones presentadas:**
  - A) Mixto: `qa-tester` hace build, HTML y capturas con Edge headless, y arma una checklist corta de lo interactivo (scroll del flotante, Tab, movimiento reducido, sin JS) que el usuario recorre en Edge — pro: lo interactivo lo comprueba una persona · contra: unos minutos del usuario por tarea.
  - B) Todo el usuario — contra: más carga.
  - C) Todo el agente con Edge headless — contra: no cubre Tab ni el scroll real.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-044 — Header en escritorio (PT-4)
- **Fase:** 3
- **Contexto:** al sacar "Consultar" del `<nav>`, con el `justify-content: space-between` actual el `<nav>` quedaría centrado.
- **Opciones presentadas:**
  - A) Como hoy: `<nav>` a la derecha, pegado a "Consultar", a ≈ 0,75 rem de Instagram — pro: el escritorio se ve igual.
  - B) A la derecha con el gap del header (1,5 rem) — pro: CSS más simple · contra: cambia un poco el escritorio.
  - C) Centrado entre el logo y "Consultar" — contra: cambia la composición.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-045 — Verificación de D-028 (PT-5)
- **Fase:** 3
- **Opciones presentadas:**
  - A) Revisión de código (`code-reviewer`): el script lanza `Error` con mensaje descriptivo y no toca `data-visible` — pro: sin pasos extra · contra: no se ve funcionando.
  - B) A + prueba en Edge con "Local overrides" — contra: un paso manual más.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-046 — Prueba real de R7.3 (PT-6)
- **Fase:** 3
- **Opciones presentadas:**
  - A) En T11: copiar una imagen de prueba (ej. copia de `src/assets/brand/logo.jpeg`) en `src/assets/gallery/autos/`, compilar, ver el carrusel y borrarla; crear y borrar el archivo con OK del usuario — pro: confirma que funciona sin tocar código.
  - B) Solo revisión de código — contra: R7.3 sin prueba real.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-03

### D-047 — Aprobación de las tareas
- **Fase:** 3
- **Opciones presentadas:** aprobar `tareas.md` v1 · cambiar antes (reordenar, dividir o quitar tareas) · leerlo primero.
- **Decisión del usuario:** aprobado tal como está (T1–T12, en ese orden).
- **Fecha:** 2026-10-03

### D-048 — Corridas de Lighthouse en el inicio (T1)
- **Fase:** 4 (T1)
- **Contexto:** en la medición "antes", `/` varió mucho entre corridas (Rendimiento 91/71/99, TBT 358/2.192/50 ms). Con 3 corridas, el techo de TBT +10 % (D-038) queda en 394 ms y un "empeoró" por azar es probable. Los servicios dieron valores parejos.
- **Opciones presentadas:**
  - A) 5 corridas en `/` antes y después (mediana de 5); los servicios siguen con 3 — pro: línea base más firme, ~4 min más · contra: ajusta D-030 solo en el inicio.
  - B) 3 corridas, como en D-030, anotando el rango junto a la mediana — pro: lo aprobado · contra: falso "empeoró" probable en `/`.
  - C) 5 corridas en las 4 páginas — pro: criterio uniforme · contra: ~10 min más ahora y en la Fase 5.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A. Modifica D-030 para `/`: `diseno.md` y `tareas.md` pasan a v2.
- **Fecha:** 2026-10-04

### D-049 — Qué pasa si `/` no pasa el piso o el techo en la Fase 5
- **Fase:** 4 (T1)
- **Contexto:** con 5 corridas, la mediana de `/` quedó en 99 / 50 ms; el piso es 96 y el techo de TBT 55 ms. `/` alterna corridas rápidas (15–50 ms) y lentas (358 y 2.192 ms), así que un "empeoró" por azar es probable (≈ 1 de cada 3).
- **Opciones presentadas:**
  - A) Revisar el origen: si `/` no pasa, `seo-rendimiento` mira en el reporte qué scripts causan el bloqueo; si ninguno es un archivo tocado por la spec 001, se informa como variación y decide el usuario — pro: separa azar de problema real · contra: un paso más en la Fase 5.
  - B) Dejarlo como está y consultar en la Fase 5 — contra: sin método acordado.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-050 — Aprobación de T1 y de la v2 del diseño y las tareas
- **Fase:** 4 (T1)
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · cambiar algo.
- **Decisión del usuario:** aprobar y commitear. T1 aprobada; `diseno.md` v2 y `tareas.md` v2 (D-048 y D-049) pasan a APROBADO. Commit en `main` sin push y creación de la rama `feature/001-conversion-whatsapp` (D-041).
- **Fecha:** 2026-10-04

### D-051 — Contrato de `WhatsAppButton` (T3)
- **Fase:** 4 (T3)
- **Contexto:** la implementación usaba `interface Props extends Omit<HTMLAttributes<'a'>, 'href' | 'target' | 'rel'>`, como `Icon.astro`. El contrato de `diseno.md` no tiene `extends`. `code-reviewer` comprobó que sin el `extends` compila con 0 errores, que el CSS con scope del padre sigue llegando por `...rest` y que `target` y `rel` siguen sin poder pisarse (RNF8).
- **Opciones presentadas:**
  - A) Quitar el `extends` y el import de `HTMLAttributes` — pro: contrato literal aprobado, más corto · contra: distinto de `Icon.astro`.
  - B) Mantenerlo y registrarlo como cambio de contrato — pro: igual que `Icon.astro` · contra: acepta atributos que la spec no pide (`onclick`, `style`, `id`…).
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-052 — Ritmo de las tareas T4 a T12
- **Fase:** 4 (T4)
- **Contexto:** el usuario pidió "seguí todo lo que sea necesario"; se consultó si eso cambiaba la aprobación por tarea.
- **Opciones presentadas:** A) encadenar T4–T12 con un commit por tarea sin confirmar cada uno, frenando solo ante decisiones o 🔴 · B) una a la vez, como hasta ahora · C) encadenar sin commits hasta la revisión final.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** B — una tarea a la vez, con OK y confirmación de commit en cada una.
- **Fecha:** 2026-10-04

### D-053 — Espacio sobre el CTA de "Sobre nosotros" (T4)
- **Fase:** 4 (T4)
- **Contexto:** el CTA queda dentro de `.about-inner`, una grilla con `gap: clamp(2rem, 5vw, 3rem)`. Sumar el `margin-top: clamp(2rem, 4vw, 3rem)` del diseño (D-040, detalle 1) daría 4–6 rem. Con solo el `gap`, la diferencia con el diseño va de 0 a ~8 px entre 640 y 1200 px (igual a 360 y a 1440).
- **Opciones presentadas:**
  - A) Usar el `gap` de la grilla — pro: sin markup extra · contra: no es literal el valor del diseño.
  - B) Sacar el botón de la grilla, con un contenedor de 76 rem y el `margin-top` exacto — pro: valor exacto · contra: un `div` que el diseño no menciona.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A. Las secciones "Láminas" y "Proceso" usan el `margin-top` del diseño.
- **Fecha:** 2026-10-04

### D-054 — Bloque `.section-cta` repetido (T4)
- **Fase:** 4 (T4)
- **Contexto:** sugerencia 🟡 de `code-reviewer`: el CSS de ubicación del CTA (~9 líneas) se repite en `AboutSection`, `FilmTypesSection` y `ProcessSection`.
- **Opciones presentadas:**
  - A) Mantenerlo — pro: es lo que pide el diseño (estilos con scope, `global.css` sin cambios), igual que `.faq-cta` · contra: ~9 líneas repetidas.
  - B) Pasarlo a una utilidad en `global.css` — pro: una sola copia · contra: reabre el diseño (v3).
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-055 — Margen negativo para D-044 en el header (T5)
- **Fase:** 4 (T5)
- **Contexto:** para los 12 px entre Instagram y "Consultar" (D-044), la implementación usaba `.header-cta { margin-left: -0.75rem }` para compensar el `gap: 1.5rem` del header.
- **Opciones presentadas:**
  - A) Simplificar: `gap` del header a 0,75 rem, sin margen negativo; el `margin-left: auto` queda en `.site-nav` — pro: más simple y robusto · contra: el mínimo entre logo y menú baja de 24 a 12 px (hoy no se alcanza).
  - B) Dejarlo como está — contra: si cambia el `gap`, deja de cumplir D-044.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-056 — Tamaño explícito del glifo en el header (T5)
- **Fase:** 4 (T5)
- **Opciones presentadas:** A) borrar las 4 líneas (`width/height: 1.25rem`), que repiten el tamaño por defecto de `.icon` · B) mantenerlas explícitas.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-057 — Índice de capítulos superpuesto en `/autos/` (fuera de T5)
- **Fase:** 4 (T5)
- **Contexto:** en la captura de `qa-tester` a 1440×800, el índice de capítulos de la escena se superpone con "Polarizado para". T5 solo tocó el header (mismo alto que antes): es anterior a la spec.
- **Opciones presentadas:** A) anotarlo en el Anexo A de la constitución y volver a mirarlo en T10 · B) incluirlo en esta spec (diseño v3) · C) ignorarlo.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-058 — Aprobación de T5
- **Fase:** 4 (T5)
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · algo no está bien.
- **Decisión del usuario:** aprobar y commitear, con D-055 y D-056 aplicadas y verificadas antes del commit.
- **Fecha:** 2026-10-04

### D-059 — Tamaño explícito del glifo del flotante (T6)
- **Fase:** 4 (T6)
- **Contexto:** `.fab-icon { width/height: 1.25rem }` repite el tamaño por defecto de `.icon` (`Icon.astro`); mismo caso que D-056 en el header.
- **Opciones presentadas:** A) borrar la regla y la clase `fab-icon`, que queda sin uso (resultado idéntico, 20 px) · B) mantenerlo explícito.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-060 — Aprobación de T6
- **Fase:** 4 (T6)
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · algo no está bien.
- **Decisión del usuario:** aprobar y commitear, con D-059 aplicada y verificada antes del commit.
- **Fecha:** 2026-10-04

### D-061 — Cómo sumar el ploteo
- **Fase:** 4 (entre T6 y T7). Reabre requisitos (v2), diseño (v3) y tareas (v3).
- **Contexto:** el usuario informó que Crisur también hace ploteos, principalmente de autos. No figuraba en `PRODUCT.md`, `services.ts`, la FAQ ni los mensajes.
- **Opciones presentadas:**
  - A) Mínimo ahora (la FAQ de D-011 y `PRODUCT.md`) + spec propia para mostrarlo — pro: la 001 no publica una lista incompleta · contra: reabrir requisitos, diseño y tareas por una frase.
  - B) Spec nueva sin tocar la 001 — contra: la FAQ queda sin el ploteo hasta entonces.
  - C) Todo dentro de la 001 — contra: amplía mucho el alcance.
  - D) Anotarlo y decidir después.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A. `services.ts` (`treatments`) no cambia en la 001: el ploteo como servicio lo define la spec 007.
- **Fecha:** 2026-10-04

### D-062 — Fotos de ploteo
- **Fase:** 4
- **Opciones presentadas:** A) en `gallery/autos/` solo polarizado; las de ploteo fuera del proyecto hasta la spec 007 · B) crear `gallery/ploteo/` ahora · C) mezclarlas en `autos/` · D) son todas de polarizado.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-063 — Texto de la FAQ con el ploteo
- **Fase:** 4 (reabre R8.1)
- **Opciones presentadas:**
  - A) Agregar al final: "…y todas las opciones para negocios y oficinas. También hacemos ploteo, sobre todo en autos." — pro: fiel a "principalmente autos", sin afirmar nada de casas o negocios.
  - B) Sumarlo a la lista de autos: "Sí: polarizado, láminas de seguridad y ploteo para autos; …" — contra: da a entender que es solo para autos.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A. Texto completo: "Sí: polarizado y láminas de seguridad para autos; espejado, esmerilado y seguridad para casas; y todas las opciones para negocios y oficinas. También hacemos ploteo, sobre todo en autos."
- **Fecha:** 2026-10-04

### D-064 — Lugar de la spec 007-ploteo
- **Fase:** 4
- **Opciones presentadas:** A) después de la 001 (001 → 007 → 003 → 002) · B) después de la 003 · C) al final de la cola.
- **Recomendación del equipo:** A, porque es un servicio que ya venden y el sitio no muestra.
- **Decisión del usuario:** A. Necesita del cliente los tipos de ploteo y fotos.
- **Fecha:** 2026-10-04

### D-065 — Aprobación de requisitos v2, diseño v3 y tareas v3
- **Fase:** 4
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · cambiar algo.
- **Decisión del usuario:** aprobar y commitear. Los tres documentos pasan a APROBADO (2026-10-04).
- **Fecha:** 2026-10-04

### D-066 a D-069 — Fotos de autos subidas por el usuario
- **Fase:** 4 (fuera de las tareas; la galería ya las carga sola, R7.3)
- **Contexto:** el usuario subió 13 fotos a `src/assets/gallery/autos/` con nombres de WhatsApp ("WhatsApp Image…", "as", "o"). El nombre del archivo es el `alt` de la foto. 2 eran de ploteo (Beetle "Herbie", una con la patente completa).
- **D-066:** A) mover las 2 de ploteo fuera del repo (`C:\Proyectos\Crisur-fotos-ploteo\`) · B) las mueve el usuario · C) dejarlas en `autos/`. Recomendación: A. **Elegida: A.**
- **D-067:** la PT Cruiser de frente: A) polarizado · B) otro trabajo · C) dejarla afuera. **Elegida: A.**
- **D-068:** 4 fotos con un pedazo de patente en el borde: A) dejarlas · B) las recorta el usuario · C) sacarlas. **Elegida: A.**
- **D-069:** renombrar con número de orden + descripción de lo que se ve (sin tonos ni marcas de lámina) y commit aparte. Orden: Hilux, Mercedes coupé, Captur, C3 Aircross, luneta C3 Aircross, Etios, 207, Focus, luneta Focus, sedán gris oscuro, PT Cruiser. **Elegida: sí, como se propuso.**
- **Fecha:** 2026-10-04

### D-070 — Bug del recorte vertical de la galería
- **Fase:** 4 (bug, fuera de las tareas)
- **Diagnóstico:** `<Image>` de Astro pone `width="1070" height="803"` en el `<img>`. El atributo `height` fija el alto y anula el `aspect-ratio: 4 / 3` de `.gallery-photo` (`WorkGallery.astro:156-163`): las tarjetas quedan de 480 × 803 px y `object-fit: cover` recorta los costados. DESIGN.md pide fotos 4:3. No se veía porque la galería estaba vacía.
- **Opciones presentadas:**
  - A) Corregirlo ahora con `height: auto`, commit aparte `fix(gallery)` — pro: cumple DESIGN.md, una línea.
  - B) Meterlo en T11 (tareas v4) — contra: hasta entonces las fotos se ven recortadas.
  - C) Dejarlo para después (Anexo A).
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-071 — Bug de T7: el flotante no aparece al entrar por el ancla de un capítulo
- **Fase:** 4 (T7, antes de aprobarla)
- **Diagnóstico (`debugger`):** la spec de `IntersectionObserver` da `isIntersecting = true` también cuando el elemento queda pegado al borde de la raíz con área 0. Al entrar por `/<servicio>/#vidrio-original`, la portada termina justo en el borde (`cover.bottom = 0`) y el flotante se oculta. Afecta también al índice de capítulos, a un scroll que caiga justo en el borde y a la vuelta del flotante después del cierre a 1440. Los "6 px a 1440" que midió `qa-tester` venían del `scroll-behavior: smooth` (medición a mitad de la animación), no del layout.
- **Opciones presentadas:**
  - A) `rootMargin: '-1px 0px'` — pro: una línea, cumple "al menos un píxel" en los dos bordes · contra: una franja de menos de 1 px cuenta como no visible.
  - B) `.beat-chapter { scroll-margin-top: -1px }` — contra: solo arregla los enlaces.
  - C) `threshold: [0, 1e-6]` + `intersectionRatio > 0` — contra: dos cambios, regla menos legible.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-072 — Documentar el `rootMargin`
- **Fase:** 4 (T7)
- **Opciones presentadas:** A) diseño v4 y tareas v4 con la nota, aprobados junto con T7 · B) tomarlo como detalle de implementación.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-073 — Prueba de regresión del bug de T7
- **Fase:** 4 (T7)
- **Opciones presentadas:** A) script de medición fuera del repo, como en D-070 · B) script en el repo sin dependencias (lo recomendó el `debugger`) · C) Playwright (dependencia nueva, contra D-029).
- **Recomendación del equipo (orquestador):** A, por coherencia con D-012 y D-070 y para no fijar la ruta del Edge en el repo.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-074 — Sugerencias menores de `code-reviewer` en T7
- **Fase:** 4 (T7)
- **Opciones presentadas:** aceptar en bloque (corregir el comentario de `WhatsAppFab.astro:12` a "el hero o la portada (disparador) o el contenido del cierre en servicios (retiro)"; dejar los comentarios de `:29` y `:32`; dejar `querySelectorAll` para el disparador) · solo corregir el comentario · no tocar nada.
- **Recomendación del equipo:** aceptar en bloque.
- **Decisión del usuario:** aceptar en bloque.
- **Fecha:** 2026-10-04

### D-075 — Aprobación de T7 y de diseño v4 / tareas v4
- **Fase:** 4 (T7)
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · algo no está bien.
- **Decisión del usuario:** aprobar y commitear.
- **Fecha:** 2026-10-04

### D-076 — Capítulos en celular horizontal con pantalla baja (T8)
- **Fase:** 4 (T8)
- **Contexto:** 🟡 de `code-reviewer`, medido por el orquestador. A 640×360 (D-036) los capítulos conservan `100svh`. Con unos 300 px de alto (celular en horizontal con la barra del navegador), los 5,5 rem de T8 más los 4,5 rem de arriba no dejan lugar al texto:
  - a 740×300, 1 o 2 capítulos por servicio crecen de 300 a 317–360 px;
  - a 667×320, crece 1 capítulo por servicio, hasta 352 px;
  - la escena 3D reparte el scroll en partes iguales (`story-controller.ts`) y queda ≈ 3 % desfasada;
  - el flotante no tapa nada.
  Antes de T8 no pasaba.
- **Opciones presentadas:**
  - A) Aceptar y anotarlo en el Anexo A de la constitución — pro: T8 cumple la spec tal cual · contra: el desfase queda en pantallas bajas.
  - B) Volver a la Fase 2 para ajustarlo (diseño v5) — pro: sin desfase · contra: reabre diseño y tareas por un detalle menor.
  - C) Aceptar sin anotar.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** B.
- **Fecha:** 2026-10-04

### D-077 — Sugerencias de simplificación de `code-reviewer` en T8
- **Fase:** 4 (T8)
- **Opciones presentadas:** A) dejar `calc(2rem + 5.5rem)` en el pie y el 5,5 rem repetido en los 2 archivos, cada uno con su D-ID · B) escribir `7.5rem` en el pie · C) mantener el código y anotar la unificación para la spec 006.
- **Recomendación del equipo:** A (unificar el valor obliga a tocar `global.css`, que la regla común de `tareas.md` no permite).
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-078 — Aprobación de T8
- **Fase:** 4 (T8)
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · algo no está bien.
- **Decisión del usuario:** aprobar y commitear.
- **Fecha:** 2026-10-04

### D-079 — Orden entre el commit de T8 y el ajuste de D-076
- **Fase:** 4 (T8)
- **Opciones presentadas:**
  - A) Commitear T8 ahora (cumple la spec v4); después, diseño v5 con el ajuste, una tarea nueva T8b y su propio commit — pro: cada cambio queda registrado por separado · contra: dos commits sobre el mismo CSS.
  - B) Ajustar antes del commit y commitear todo junto — contra: T8 queda abierta hasta aprobar el diseño v5.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-080 — Ajuste de los capítulos en horizontal con pantalla baja (D-076)
- **Fase:** 2 (reabierta: diseño v5)
- **Contexto:** a ≤ 880 px y con ≤ 340 px de alto, el header (72 px de padding superior) y el aire del flotante (88 px) dejan 140 px para el texto del capítulo, que mide entre 157 y 200 px. Las estimaciones de `disenador-ui` son por cálculo y se miden en la implementación.
- **Opciones presentadas** (todas dentro de `@media (max-width: 880px) and (max-height: 340px)`, solo en `ServiceStory.astro`):
  - A) Tipografía compacta: `.chapter-title { font-size: 1.625rem; line-height: 1.05 }` y `.chapter-text { margin-top: .5rem; font-size: .9375rem; line-height: 1.5 }` — pro: el cambio más chico, mantiene los 5,5 rem (D-017, D-040 detalle 8) · contra: el texto baja a 15 px; un texto largo o una pantalla angosta podría no entrar.
  - A + `.beat { padding-top: 4rem }` — pro: 8 px más · contra: el título queda pegado al header cuando el texto llena el capítulo.
  - B) Título y texto en dos columnas — contra: layout nuevo, hay que reajustar la penumbra.
  - C) Aire al costado (`padding-right: 10rem` y el padding inferior anterior a T8) — contra: reabre D-017 y D-040 detalle 8.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A, sin cambiar el padding superior.
- **Fecha:** 2026-10-04

### D-081 — Mención de la tipografía compacta en "Componentes y archivos afectados"
- **Fase:** 2 (diseño v5)
- **Opciones presentadas:** A) dejar `diseno.md:128` como está; la regla queda en Interfaz y la trazabilidad de R2.3 y R5.6 apunta a T8b · B) sumar media línea que remita a Interfaz.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-082 — Aprobación de diseño v5 y tareas v5
- **Fase:** 2 y 3
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · cambiar algo.
- **Decisión del usuario:** aprobar y commitear. Los dos documentos pasan a APROBADO (2026-10-04).
- **Fecha:** 2026-10-04

### D-083 — Título sobre el objeto 3D en horizontal con pantalla baja (T8b)
- **Fase:** 4 (T8b)
- **Contexto:** en la captura de `qa-tester` a 740×300 (`/autos/`, capítulo 2), el título del capítulo queda encima del auto y tapa las ventanillas. Se lee bien gracias a la penumbra. En 300 px de alto no entran el objeto y el texto uno arriba del otro; el aire de T8 subió el texto unos 64 px.
- **Opciones presentadas:** A) anotarlo en el Anexo A de la constitución y revisarlo en una spec de la escena 3D · B) aceptarlo sin registrar · C) ajustarlo en esta spec (diseño v6), con el riesgo de tocar la escena 3D, que está fuera del alcance.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-084 — Aprobación de T8b
- **Fase:** 4 (T8b)
- **Opciones presentadas:** aprobar y commitear · aprobar sin commit · algo no está bien.
- **Decisión del usuario:** aprobar y commitear.
- **Fecha:** 2026-10-04

### D-085 — Lugar de las fotos de ploteo dentro del proyecto
- **Fase:** 4 (reemplaza la ubicación de D-066; D-062 sigue vigente: no van a la galería hasta la spec 007)
- **Contexto:** el usuario pidió que la carpeta de ploteos (`C:\Proyectos\Crisur-fotos-ploteo\`, 2 fotos) quede dentro del proyecto para ordenar. `gallery.ts` importa todo lo que esté en `src/assets/gallery/*/`.
- **Opciones presentadas:** A) `fotos-pendientes/ploteo/` en la raíz, fuera de `src/` y `public/` · B) `src/assets/gallery/ploteo/` (el glob la importa ya; es lo descartado en D-062) · C) `Crisur-fotos-ploteo/` en la raíz, con su nombre actual.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A. Se movió el 2026-10-04; la carpeta externa ya no existe.
- **Fecha:** 2026-10-04

### D-086 — ¿Las fotos de ploteo van a Git?
- **Fase:** 4
- **Contexto:** una de las 2 fotos muestra la patente completa (D-066) y el repo tiene remoto en GitHub.
- **Opciones presentadas:** A) no: `fotos-pendientes/` en `.gitignore` — contra: sin copia en Git · B) sí, en un commit aparte — contra: la patente queda en GitHub y en el historial.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-087 — `.claude/agent-memory/` en `.gitignore`
- **Fase:** 4
- **Opciones presentadas:** A) sumarla a `.gitignore` · B) dejarla sin trackear · C) commitearla.
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-088 — "Polarizado(s)" como término general en el inicio
- **Fase:** 4 (T9, sugerencia de `code-reviewer`)
- **Contexto:** fuera de D-009 y de T9 quedan 3 textos que usan "polarizado(s)" para todo: el `h1` "Polarizados para autos, hogares y negocios" (`HomeHero.astro:25`), el `<title>` (`index.astro:18`) y "Sobre nosotros" (`AboutSection.astro:30`, sin las láminas de seguridad). En hogares no se ofrece polarizado.
- **Opciones presentadas:** A) anotarlo en el Anexo A para la spec 004 (SEO), donde se deciden el `h1` y el `<title>` · B) dejarlos como están ("polarizado" es la palabra coloquial y de la marca).
- **Recomendación del equipo:** A.
- **Decisión del usuario:** A.
- **Fecha:** 2026-10-04

### D-089 — Aprobación de T9
- **Fase:** 4 (T9)
- **Contexto:** QA informó que el botón del hero sobresalía 5,4 px a 360×560. Era un artefacto de la emulación de escritorio (barra de scroll de 15 px: 345 px de ancho y `h1` en 4 líneas). Con emulación de celular (360 px, `h1` en 3 líneas) la holgura es de 28 px, igual que en la medición de D-025.
- **Opciones presentadas:** aprobar con 2 commits (`chore` + T9) · aprobar con 1 commit · aprobar sin commit · algo no está bien.
- **Decisión del usuario:** aprobar con 2 commits.
- **Fecha:** 2026-10-04
