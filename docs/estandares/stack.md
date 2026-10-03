# Estándar de stack

> **Estándar base propuesto.** No se aplica automáticamente: en la Fase 0 de cada proyecto el usuario decide si lo adopta tal cual o con excepciones (queda registrado en `specs/constitucion.md`). Cualquier punto no adoptado o no cubierto se consulta.

Regla general: **última versión estable** de cada herramienta y **Node.js LTS**. Antes de usar una API, verificar en la documentación oficial de la versión instalada (no asumir de memoria).

## ¿Astro o Next.js? (recomendación — decide el usuario)

| Si el proyecto… | Opción que el equipo recomienda |
|---|---|
| Es mayormente contenido (institucional, landing, portfolio, blog, menú de restaurante) | **Astro** |
| Necesita SEO máximo y carga ultrarrápida con poca interactividad | **Astro** |
| Tiene que alojarse en hosting compartido (cPanel) | **Astro** (build estático) |
| Tiene usuarios con login, roles o panel de administración | **Next.js** |
| Guarda y edita datos (turnos, stock, clientes, pedidos, reportes) | **Next.js** |
| Es e-commerce con carrito, pagos y gestión de pedidos | **Next.js** |
| Es una web de contenido + un panel interno | Astro (web) + Next.js (panel), o todo Next.js si el presupuesto es chico |

## Astro — webs

- **Base:** Astro + TypeScript (strict) + Tailwind CSS.
- **Estructura:** `src/pages` (rutas) · `src/layouts` · `src/components` · `src/content` (content collections para blog/servicios/proyectos) · `src/styles` · `public`.
- **Interactividad:** HTML/CSS primero; JS vanilla después; islas de React (`client:visible` / `client:idle`) solo si hace falta estado complejo.
- **Imágenes:** `astro:assets` (`<Image />`/`<Picture />`), formatos AVIF/WebP, siempre con `alt`, `width` y `height`.
- **Formularios:** Astro Actions (si hay SSR) o un servicio externo (Resend vía endpoint, Formspree, Web3Forms) si es estático.
- **Salida:** estática por defecto. Adapter SSR (Vercel/Netlify/Node) solo si hay endpoints o contenido dinámico.
- **SEO:** componente `<SEO />` en el layout (title, description, canonical, Open Graph, Twitter), `@astrojs/sitemap`, `robots.txt`, datos estructurados (JSON-LD).

## Next.js — sistemas

- **Base:** Next.js (App Router) + TypeScript (strict) + Tailwind CSS + **shadcn/ui**.
- **Renderizado:** Server Components por defecto; `"use client"` solo en componentes interactivos y lo más abajo posible del árbol.
- **Mutaciones:** Server Actions. **Route Handlers** solo para webhooks, APIs públicas o integraciones.
- **Validación:** **Zod** en todo límite (formularios, actions, route handlers, variables de entorno).
- **Formularios:** React Hook Form + Zod (o `useActionState` en formularios simples).
- **ORM:** **Prisma**.
- **Auth:** Auth.js si la BD es propia (VPS/Neon) · Supabase Auth si el proyecto usa Supabase. Autorización por rol verificada **en el servidor**.
- **Tablas:** TanStack Table cuando haya ordenamiento/filtros/paginación.
- **Emails:** Resend + React Email.
- **Pagos:** Mercado Pago (Argentina/LatAm) · Stripe (internacional). Confirmar pagos **siempre por webhook**, nunca solo por redirect.
- **Archivos:** Supabase Storage, UploadThing o S3-compatible. Nunca en el filesystem del servidor en Vercel.

## Base de datos

| Hosting | Base de datos |
|---|---|
| Vercel / Netlify | PostgreSQL en **Supabase** o **Neon** |
| VPS | PostgreSQL en Docker (con backups) o Supabase/Neon |
| cPanel | MySQL/MariaDB del hosting (Prisma lo soporta) |

## Calidad y herramientas

- ESLint + Prettier (`prettier-plugin-tailwindcss`), TypeScript `strict: true`.
- **Vitest** + Testing Library (unitarios/componentes) · **Playwright** (e2e).
- Gestor de paquetes: npm (o pnpm si el proyecto ya lo usa). Lockfile siempre commiteado.
- Variables de entorno tipadas en `src/env.ts` validadas con Zod.
