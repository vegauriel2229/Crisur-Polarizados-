# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Particulares y comerciantes de Godoy Cruz / Gran Mendoza que llegan mayormente desde Instagram, en el celular. Tienen un auto, una casa o un local con vidrios y quieren menos calor, más privacidad o una fachada más prolija. Su tarea en el sitio: entender en segundos qué hace Crisur para su caso y escribir por WhatsApp.

## Product Purpose

Sitio institucional de Crisur Polarizados, negocio familiar con más de 10 años de trayectoria. Existe para convertir visitas en consultas por WhatsApp (y seguimiento por Instagram). Éxito = clic en "Consultar por WhatsApp" con el mensaje prearmado del servicio elegido.

## Positioning

Taller local con más de 10 años que coloca láminas en los tres frentes (autos, hogares, negocios) con todas las láminas y tonos del mercado, y resuelve cada caso en una charla directa, sin catálogo cerrado ni precios publicados.

## Operating Context

- Contacto 100 % por WhatsApp (`wa.me` con mensaje por servicio) e Instagram (`@crisur2026`). Sin formularios ni backend.
- Contenido editable a futuro con Keystatic (ver `docs/SDD.md`).

## Capabilities and Constraints

- Servicios: polarizado, espejado y esmerilado; láminas de seguridad (anti-astillas / antivandálicas) — confirmado por el cliente 2026-09-28.
- Categorías: Autos, Hogares, Negocios ("Locales" pasó a "Negocios" por pedido del cliente, 2026-09-30). Orden en el inicio, el menú y el recorrido entre páginas: Autos → Hogares → Negocios → Autos.
- Inicio (pedido del cliente, 2026-09-30): el logo como moneda que se lanza una vez al entrar (logo en las dos caras, lenta, no interactiva), las redes (WhatsApp, Instagram), los tres servicios para elegir con el diseño 2D y "Sobre nosotros".
- Páginas: `/` (inicio institucional) y una página por servicio (`/autos`, `/hogares`, `/negocios`) con una escena 3D que aplica la lámina mientras se scrollea. Estilo 3D "cromo y vidrio" elegido por el cliente el 2026-09-30 (no modelos realistas).
- Sin precios publicados. Sin catálogo de láminas/tonos.
- Afirmaciones técnicas: **generales, sin cifras** (no publicar % de UV ni de reducción de calor) — decisión del cliente 2026-09-28.
- Stack: Astro + TypeScript estricto, estático, deploy en Vercel. Three.js solo en las páginas de servicio (carga diferida) y Motion para el scroll.

## Brand Commitments

- Nombre: Crisur Polarizados. Logo: JPEG circular rojo/negro/blanco (`src/assets/brand/logo.jpeg`); vectorial pendiente.
- Paleta fijada por el cliente: fondo oscuro, acentos en rojo del logo, textos blancos.
- Tono: rioplatense, voseo, directo y confiable; sin exageraciones.

## Evidence on Hand

- Trayectoria: más de 10 años (confirmado).
- Ubicación: Godoy Cruz, Mendoza. Calle: pendiente.
- Horarios (2026-10-02): todos los días desde las 17 h (el dueño trabaja de mañana); día y hora se coordinan por WhatsApp. Hora de cierre: sin definir.
- **No hay fotos de trabajos todavía**: no fabricar fotos, testimonios, clientes ni cifras. Las imágenes futuras tienen lugares marcados en el código.

## Product Principles

1. Cada sección termina en una acción de WhatsApp.
2. Hablar del resultado para el cliente (confort, privacidad, protección), no de la lámina.
3. Nada inventado: sin cifras, testimonios ni fotos falsas.
4. Mobile primero: la mayoría llega desde Instagram en el celular.

## Accessibility & Inclusion

WCAG 2.1 AA (contraste, foco visible, `alt` obligatorio), respeto de `prefers-reduced-motion`.
