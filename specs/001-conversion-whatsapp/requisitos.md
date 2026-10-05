# Spec 001 — Conversión a WhatsApp · Requisitos

**Estado:** APROBADO (2026-10-04) · **Versión:** 2

> **v2 (2026-10-04):** la respuesta de R8.1 suma el ploteo (D-061, D-063). El resto no cambia respecto de v1 (APROBADO 2026-10-03).

> Fuente: `docs/auditoria-2026-10-03.md` (hallazgo C1 y sección "Conversión y textos → spec 001"), `PRODUCT.md` y `specs/constitucion.md` (§4 y §5). Las preguntas abiertas se resolvieron con las decisiones D-001 a D-012, las prioridades con D-013 y los supuestos con D-014 (todas en `decisiones.md`).

## Objetivo
Que el sitio cumpla su principio 1 ("cada sección termina en una acción de WhatsApp") y que quien llega desde el celular encuentre siempre una forma clara y consistente de escribir a Crisur. Además, ordenar los textos de conversión para que no se repitan ni se contradigan, sin inventar contenido.

## Usuarios / roles
| Rol | Qué necesita |
|---|---|
| Visitante (particular o comerciante de Gran Mendoza, desde Instagram, en el celular) | Entender rápido qué hace Crisur para su caso y poder escribir por WhatsApp desde donde esté, sin buscar el botón. |
| Visitante que llega a una URL inexistente | No quedar en un callejón sin salida: poder escribir o seguir navegando. |
| Dueño / equipo de Crisur | Recibir consultas por WhatsApp con un mensaje que indique de qué servicio se trata. |

## Alcance
**Incluye:**
- Acción de WhatsApp en las secciones del inicio que hoy no la tienen: "Una lámina para cada vidrio", "Sobre nosotros" y "Cómo trabajamos" (C1).
- Acción de WhatsApp durante la escena de las páginas de servicio, entre la portada y el cierre (C1).
- Criterio común para las etiquetas de los botones de WhatsApp.
- Visibilidad del CTA en celular: "Consultar" en el header, momento de aparición del botón flotante y primera pantalla a 360×640.
- Repetición de beneficios (calor, privacidad, UV, seguridad) en las páginas de servicio.
- Galería sin fotos.
- Textos inconsistentes: FAQ "¿Hacen autos, casas y negocios?" y "Elegí qué querés polarizar".
- WhatsApp en la página 404.

**No incluye:**
- Muestras de lámina solo con mouse (C2) y demás accesibilidad (salto al contenido, `nav` duplicados, contador de carga, WCAG 2.5.3): spec 002.
- Rendimiento y escena 3D (C3, descarga de three.js, `backdrop-filter`): spec 003. Acá solo se pide no empeorarlo (RNF2).
- Títulos y descripciones SEO, JSON-LD, dirección, mapa, `noindex` de la 404: spec 004.
- Headers de seguridad, `.htaccess` y deploy: spec 005.
- Refactors y herramientas: spec 006.
- Fotos reales de trabajos (dependen del cliente, constitución D-018) y Keystatic (constitución D-014).
- Precios, catálogo de láminas, cifras, testimonios y formularios (principios de `PRODUCT.md`).
- Cambios al número de WhatsApp, a los mensajes prearmados existentes o a Instagram como canal.

## Requisitos funcionales

### R1 — Acción de WhatsApp en cada sección del inicio
**Historia:** Como visitante del inicio, quiero poder escribir por WhatsApp al terminar de leer cada sección, para no tener que volver a buscar el botón.
**Prioridad:** Must *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R1.1 CUANDO un visitante llega al final de la sección "Una lámina para cada vidrio" del inicio, EL SISTEMA DEBERÁ mostrarle un CTA corto de WhatsApp (D-001).
- R1.2 CUANDO un visitante llega al final de la sección "Sobre nosotros", EL SISTEMA DEBERÁ mostrarle un CTA corto de WhatsApp (D-001).
- R1.3 CUANDO un visitante llega al final de la sección "Cómo trabajamos", EL SISTEMA DEBERÁ mostrarle un CTA corto de WhatsApp (D-001).
- R1.4 CUANDO el visitante activa cualquiera de esos CTA, EL SISTEMA DEBERÁ abrir `wa.me` con el número del negocio y el mensaje general existente ("¡Hola Crisur! Quiero hacer una consulta.") (D-005).
- R1.5 EL SISTEMA DEBERÁ mantener las acciones de WhatsApp que el inicio ya tiene (hero y cierre de preguntas frecuentes), de modo que ninguna sección del inicio termine sin acción.

### R2 — Acción de WhatsApp durante la escena de las páginas de servicio
**Historia:** Como visitante de `/autos`, `/hogares` o `/negocios`, quiero tener una acción de WhatsApp a mano durante el recorrido de la escena, para consultar apenas me convenzo sin llegar al cierre.
**Prioridad:** Must *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R2.1 MIENTRAS el visitante recorre los 4 capítulos de la escena, entre la portada y el cierre, EL SISTEMA DEBERÁ mantener visible el botón flotante de WhatsApp (D-002).
- R2.2 CUANDO el visitante activa el botón flotante en una página de servicio, EL SISTEMA DEBERÁ abrir WhatsApp con el mensaje prearmado existente del servicio de esa página (D-005).
- R2.3 SI el botón flotante queda fuera de pantalla o tapado por otro elemento durante la escena en alguna de las 4 anchuras de verificación (360/768/1024/1440), ENTONCES el requisito se considera no cumplido (criterio de verificación).
- R2.4 EL SISTEMA DEBERÁ conservar el cierre de cada página de servicio con su botón de WhatsApp y el portal a la página siguiente.

### R3 — Mensajes prearmados coherentes
**Historia:** Como dueño de Crisur, quiero que cada consulta llegue con un mensaje que diga de qué se trata, para responder sin preguntar lo básico.
**Prioridad:** Should *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R3.1 CUANDO el visitante abre WhatsApp desde una página de servicio (cuerpo o botón flotante), EL SISTEMA DEBERÁ usar el `whatsappMessage` existente de ese servicio (D-005).
- R3.2 CUANDO el visitante abre WhatsApp desde el inicio, la 404 o el pie, EL SISTEMA DEBERÁ usar el mensaje general existente (`whatsappDefaultMessage`) (D-005).
- R3.3 EL SISTEMA DEBERÁ NO incorporar mensajes prearmados nuevos en esta spec (D-005).

### R4 — Etiquetas de botones con criterio común
**Historia:** Como visitante, quiero que todos los botones que abren WhatsApp se entiendan igual, para saber qué pasa al tocarlos.
**Prioridad:** Should *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R4.1 EL SISTEMA DEBERÁ usar la etiqueta "Consultar" en el acceso de WhatsApp del header y en el botón flotante (D-006).
- R4.2 EL SISTEMA DEBERÁ usar "Consultar por WhatsApp" en los botones de WhatsApp del cuerpo del inicio y de la 404 (D-006). Reemplaza, entre otros, al "WhatsApp" del hero.
- R4.3 EL SISTEMA DEBERÁ usar "Consultar por mi auto", "Consultar por mi casa" y "Consultar por mi negocio" en los botones de WhatsApp del cuerpo de cada página de servicio (D-006). Reemplaza, entre otros, a "Hacer otra pregunta por WhatsApp".
- R4.4 CUANDO una etiqueta sea visible, EL SISTEMA DEBERÁ mantener su nombre accesible coincidente con el texto visible (no empeorar lo que revisa la spec 002).
- R4.5 EL SISTEMA DEBERÁ distinguir visualmente y por texto el botón de WhatsApp del enlace a Instagram.

### R5 — CTA visible en celular
**Historia:** Como visitante en celular, quiero ver cómo escribir por WhatsApp sin abrir menús ni scrollear mucho, para consultar en pocos toques.
**Prioridad:** Must *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R5.1 CUANDO un visitante abre cualquier página en un ancho de 360 px, EL SISTEMA DEBERÁ mostrar "Consultar" en el header, fuera del menú hamburguesa, sin depender de JavaScript (D-003).
- R5.2 CUANDO el hero (inicio) o la portada (páginas de servicio) sale de la pantalla, EL SISTEMA DEBERÁ mostrar el botón flotante de WhatsApp; MIENTRAS el hero o la portada estén visibles, EL SISTEMA DEBERÁ no mostrarlo (D-004). Reemplaza el umbral actual del 80 % del alto de la pantalla.
- R5.3 MIENTRAS el visitante está en la primera pantalla a 360×640 (con la barra del navegador visible), EL SISTEMA DEBERÁ mostrar completa, sin scrollear, al menos una acción de WhatsApp. El ajuste del hero se propone en la Fase 2, después de medir con capturas (D-012).
- R5.4 EL SISTEMA DEBERÁ mantener las áreas táctiles de las acciones de WhatsApp en al menos 44×44 px y con foco visible.
- R5.5 DONDE el visitante tenga activada la preferencia de movimiento reducido, EL SISTEMA DEBERÁ mostrar las acciones de WhatsApp (incluida la aparición del botón flotante) sin animaciones.
- R5.6 SI una acción fija de WhatsApp tapa contenido o controles (menú, FAQ, portal a la página siguiente), ENTONCES EL SISTEMA DEBERÁ evitar el solapamiento en 360/768/1024/1440.

### R6 — Beneficios sin repetición excesiva
**Historia:** Como visitante, quiero leer cada beneficio una sola vez bien dicho, para no sentir que el texto se repite.
**Prioridad:** Should *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R6.1 EL SISTEMA DEBERÁ presentar los beneficios de cada página de servicio en los capítulos de la escena y en "Qué ganás con la lámina", y NO en los datos de la portada (D-007).
- R6.2 EL SISTEMA DEBERÁ mantener todos los beneficios que hoy figuran en cada servicio en al menos uno de esos dos lugares.
- R6.3 EL SISTEMA DEBERÁ no reescribir el significado de los beneficios ni agregar cifras o porcentajes (principios 2 y 3 de `PRODUCT.md`; supuesto S9).
- R6.4 CUANDO se quiten los datos de la portada, EL SISTEMA DEBERÁ conservar la acción de WhatsApp de la portada.

### R7 — Galería sin fotos
**Historia:** Como visitante, no quiero ver un título que promete trabajos que no se muestran.
**Prioridad:** Should *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R7.1 MIENTRAS no haya fotos de trabajos de un servicio, EL SISTEMA DEBERÁ ocultar la sección de galería completa de esa página (título y aviso) (D-008).
- R7.2 MIENTRAS no haya fotos, EL SISTEMA DEBERÁ no mostrar fotos, testimonios ni ilustraciones presentadas como trabajos reales.
- R7.3 CUANDO haya al menos una foto en `src/assets/gallery/<servicio>/`, EL SISTEMA DEBERÁ mostrar la galería de ese servicio sin cambios de código (comportamiento actual del carrusel).
- R7.4 EL SISTEMA DEBERÁ conservar los accesos a Instagram del header, el pie y el hero.

### R8 — Textos consistentes entre sí
**Historia:** Como visitante, quiero que lo que dice el sitio sobre qué hace Crisur sea siempre lo mismo, para no dudar.
**Prioridad:** Should *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R8.1 EL SISTEMA DEBERÁ responder la FAQ "¿Hacen autos, casas y negocios?" con: "Sí: polarizado y láminas de seguridad para autos; espejado, esmerilado y seguridad para casas; y todas las opciones para negocios y oficinas. También hacemos ploteo, sobre todo en autos." (D-011, D-063).
- R8.2 EL SISTEMA DEBERÁ usar "¿Dónde querés colocar la lámina?" como título del selector de servicios del inicio, en lugar de "¿Qué querés polarizar?" (D-009).
- R8.3 EL SISTEMA DEBERÁ reemplazar "Elegí qué querés polarizar" en el párrafo del hero y en la 404 por una frase con la misma idea que el título de R8.2 (D-009). La redacción exacta de esas dos frases se propone en la Fase 2 y la aprueba el usuario.
- R8.4 CUANDO cambie la lista de tratamientos de un servicio, EL SISTEMA DEBERÁ reflejarlo en todos los textos que la mencionan (criterio de revisión).
- R8.5 EL SISTEMA DEBERÁ mantener voseo rioplatense, sin precios, cifras, testimonios ni fotos inventados.

### R9 — Página 404 con WhatsApp
**Historia:** Como visitante que cayó en un link roto, quiero poder escribir a Crisur desde esa página, para no perder la consulta.
**Prioridad:** Should *(confirmada, D-013)*

**Criterios de aceptación (EARS):**
- R9.1 CUANDO se muestra la página 404, EL SISTEMA DEBERÁ ofrecer "Consultar por WhatsApp" como botón principal, con el mensaje general (D-010, D-006).
- R9.2 EL SISTEMA DEBERÁ mostrar "Ir al inicio" como acción secundaria y conservar los enlaces a Autos, Hogares y Negocios y el texto de la página (salvo lo que cambia R8.3) (D-010).

## Requisitos no funcionales
| ID | Tipo | Requisito medible |
|---|---|---|
| RNF1 | Accesibilidad | Las acciones nuevas o modificadas cumplen WCAG 2.2 AA (constitución D-009), verificado en 360, 768, 1024 y 1440 px: contraste de texto ≥ 4,5:1, foco visible, objetivo táctil ≥ 44×44 px, operables con teclado. |
| RNF2 | Rendimiento | La spec no empeora Lighthouse mobile respecto de la medición del 2026-10-03 (`/` 67, `/autos/` 66, `/hogares/` 63, `/negocios/` 60) ni sus TBT. La meta ≥ 95 (constitución D-012) se resuelve en la spec 003. Accesibilidad, Buenas prácticas y SEO se mantienen en 100. |
| RNF3 | Rendimiento | No se agregan scripts, librerías ni peticiones de terceros para las acciones nuevas. |
| RNF4 | Privacidad | Sin formularios, cookies, analytics ni recolección de datos; el único canal sigue siendo `wa.me` e Instagram. |
| RNF5 | Contenido | 0 cifras, precios, testimonios o fotos inventados en los textos nuevos o modificados (verificable por revisión). |
| RNF6 | Idioma y tono | 100 % de los textos visibles nuevos o modificados en español rioplatense con voseo. |
| RNF7 | Compatibilidad | Reduced-motion respetado en toda acción fija o animada (R5.5). |
| RNF8 | Robustez | Todos los enlaces de WhatsApp siguen abriendo en pestaña nueva con `rel="noopener noreferrer"` y con número validado en el build (comportamiento actual). |

## Casos borde y escenarios de error
- Visitante con JavaScript desactivado: los CTA del cuerpo y el "Consultar" del header siguen funcionando (son enlaces, R5.1); el botón flotante puede no aparecer porque depende de JS.
- Pantalla de 360×640 con barra del navegador visible: la primera pantalla efectiva es menor a 640 px de alto; se mide así (R5.3, D-012).
- Teclado en pantalla abierto u orientación horizontal en celular: una acción fija no debe tapar el contenido (R5.6).
- Visitante sin WhatsApp instalado: `wa.me` abre la versión web; fuera del control del sitio.
- Páginas de servicio con distinta cantidad de tratamientos (autos: 2; hogares: 3; negocios: 4): los textos y la FAQ deben reflejar cada caso.
- Servicio sin fotos hoy y con fotos mañana: la galería reaparece sola (R7.3).
- Visitante que llega por un link directo a un ancla dentro de la escena: si la portada no está en pantalla, el botón flotante debe estar visible (R2.1, R5.2).
- Mensaje prearmado con tildes y signos de apertura: debe codificarse bien en el enlace (comportamiento actual, no empeorar).

## Supuestos (cada uno se confirma con el usuario)
- [x] S1: Las prioridades Must/Should las confirma el usuario. → Confirmadas (D-013).
- [x] S2: "Acción de WhatsApp" significa un enlace o botón que abre `wa.me` con mensaje prearmado; no se agregan otros canales ni formularios. (D-014)
- [x] S3: Los hallazgos de esta spec son solo C1 y la sección "Conversión y textos" de la auditoría; el resto va a las specs 002–006. (D-014)
- [x] S4: Se conservan las acciones existentes (hero, cierre de servicio, FAQ del inicio) y el botón flotante como elemento, con las etiquetas de D-006. (D-014)
- [x] S5: El problema de visibilidad a 360×640 del hero es una estimación por código. → Se mide primero en la Fase 2 (D-012).
- [x] S6: Mientras no haya fotos propias, ninguna sección muestra fotos ni testimonios. (D-014)
- [x] S7: Las 4 anchuras de verificación son 360, 768, 1024 y 1440 px. (D-014)
- [x] S8: Instagram sigue como canal de seguimiento secundario; la acción principal de conversión es WhatsApp. (D-014)
- [x] S9: El texto "Qué ganás con la lámina" y los beneficios de cada servicio son contenido ya aceptado; solo se decide dónde aparecen, no se reescribe su significado. (D-014)

## Preguntas abiertas (bloquean la aprobación)
- [x] P1: Cobertura de acciones en el inicio. → Un CTA corto al final de cada sección (D-001).
- [x] P2: Acción en la escena de las páginas de servicio. → Botón flotante visible durante la escena (D-002).
- [x] P3: Mensajes prearmados de las secciones nuevas. → Reusar los actuales (D-005).
- [x] P4: Criterio de etiquetas. → "Consultar" en header y flotante; "Consultar por WhatsApp" en el cuerpo del inicio y la 404; "Consultar por mi auto/casa/negocio" en servicios (D-006).
- [x] P5: Acción visible en celular. → "Consultar" fuera del menú hamburguesa (D-003).
- [x] P6: Cuándo aparece el flotante. → Al salir el hero o la portada (D-004).
- [x] P7: Dónde queda cada beneficio. → Capítulos + "Qué ganás"; se quitan los datos de la portada (D-007).
- [x] P8: Galería sin fotos. → Se oculta hasta que haya fotos (D-008).
- [x] P9: Texto del hero. → "¿Dónde querés colocar la lámina?" en el hero, el selector y la 404 (D-009).
- [x] P10: 404. → WhatsApp como acción principal; "Ir al inicio" secundaria (D-010).
- [x] P11: FAQ "¿Hacen autos, casas y negocios?". → Listar los tratamientos reales con el texto aprobado (D-011).
- [x] P12: Hero a 360×640. → Medir primero en la Fase 2 (D-012).

## Aprobación
- [x] Aprobado por el usuario · Fecha: 2026-10-03
