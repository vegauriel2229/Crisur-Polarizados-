# Estándar de diseño y UI

> **Estándar base propuesto.** No se aplica automáticamente: en la Fase 0 de cada proyecto el usuario decide si lo adopta tal cual o con excepciones (queda registrado en `specs/constitucion.md`). Cualquier punto no adoptado o no cubierto se consulta.

## Sistema de diseño
- Definir **tokens** antes de maquetar: colores (primario, secundario, neutros, estados), tipografías, escala tipográfica, espaciado, radios, sombras.
- Tokens como variables CSS + tema de Tailwind. Nunca colores o tamaños sueltos en los componentes.
- Escala de espaciado base 4/8 px. Máximo 2 familias tipográficas.

## Identidad
- Cada cliente tiene identidad propia: nada de plantillas genéricas ni "look de IA" (gradientes violeta por defecto, tarjetas idénticas, emojis como íconos).
- Diseñar con **contenido real** del cliente. Lorem ipsum solo en bocetos, nunca en la entrega.

## Accesibilidad (WCAG 2.2 AA)
- Contraste mínimo 4.5:1 en texto normal, 3:1 en texto grande y componentes.
- Foco visible en todo elemento interactivo; navegación completa por teclado.
- Áreas táctiles ≥ 44×44 px.
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`, un solo `h1`, jerarquía de encabezados).
- `alt` descriptivo en imágenes informativas, `alt=""` en decorativas. Labels en todos los inputs.
- Respetar `prefers-reduced-motion`.

## Estados obligatorios
Todo componente interactivo contempla: normal · hover · focus · active · disabled · cargando · vacío · error · éxito.

## Responsive
Mobile first. Verificar en 360 px, 768 px, 1024 px y 1440 px. Sin scroll horizontal.

## Rendimiento visual
- Imágenes optimizadas (AVIF/WebP), con dimensiones definidas (evita saltos de layout).
- Fuentes con `font-display: swap`, preferir fuentes self-hosted.
- Animaciones con `transform` y `opacity`; nada que bloquee la interacción.
