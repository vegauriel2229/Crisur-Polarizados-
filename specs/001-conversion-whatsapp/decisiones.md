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
