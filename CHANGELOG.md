# Registro de cambios

Todos los cambios importantes del sitio se anotan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/). Las entradas quedan en `[Unreleased]` hasta que el sitio se publique en Hostinger (spec 005).

## [Unreleased]

### Spec 001 — Conversión a WhatsApp

Entregada el 2026-10-04. Detalle en [`specs/001-conversion-whatsapp/`](specs/001-conversion-whatsapp/).

#### Agregado

- Componente `WhatsAppButton` y etiquetas compartidas en `src/data/cta.ts` (`WHATSAPP_CTA_LABELS`: "Consultar", el complemento accesible " por WhatsApp" y "Consultar por WhatsApp").
- Botón "Consultar por WhatsApp" al final de "Una lámina para cada vidrio", "Sobre nosotros" y "Cómo trabajamos" en el inicio.
- "Consultar" siempre visible en el header, fuera del menú (sin glifo a ≤ 520 px).
- Marcas `data-whatsapp-fab-trigger` (hero del inicio y portada de servicio) y `data-whatsapp-fab-retire` (contenido del cierre de servicio).
- Espacio de 5,5 rem para el botón flotante en el pie (todas las páginas) y en los capítulos de servicio a ≤ 880 px.
- Tipografía compacta en los capítulos de servicio en celular horizontal con pantalla baja (≤ 880 × ≤ 340 px).
- 11 fotos de trabajos en la galería de autos.

#### Cambiado

- Botón flotante: pasa de círculo a píldora "Consultar". Aparece con `IntersectionObserver` cuando sale de pantalla el hero o la portada y, en las páginas de servicio, se retira mientras se ve el cierre.
- Etiquetas: el hero del inicio dice "Consultar por WhatsApp" (antes "WhatsApp") y la FAQ de cada servicio, "Consultar por mi auto/casa/negocio" (antes "Hacer otra pregunta por WhatsApp").
- Textos: segunda frase del hero ("Elegí dónde va la lámina y mirá cómo queda."), título del selector y línea de la 404 ("¿Dónde querés colocar la lámina?"), y respuesta de la FAQ "¿Hacen autos, casas y negocios?" con los tratamientos reales y el ploteo.
- Portada de servicio a ≥ 881 px: una columna, abajo a la izquierda; el título gigante conserva su tamaño.
- Página 404: "Consultar por WhatsApp" es la acción principal e "Ir al inicio" pasa a secundaria.
- La galería de cada servicio se muestra solo si tiene fotos.

#### Quitado

- Bloque de datos (beneficios) de la portada de servicio. Los beneficios siguen en los capítulos y en "Qué ganás con la lámina".
- Estado vacío de la galería ("Muy pronto…").
- Listener de `scroll` del botón flotante.

#### Corregido

- Las fotos de la galería mantienen la proporción 4:3.
