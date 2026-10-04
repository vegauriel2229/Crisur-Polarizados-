# Constitución del proyecto: Crisur Polarizados

**Estado:** APROBADO (2026-10-03) · **Versión:** 1

> Documento de la Fase 0 (`/proyecto-existente`). Define las reglas del proyecto. Cada elección referencia la decisión del usuario que la originó. El stack es **existente**: se documenta, no se elige.

> **Dónde quedamos (2026-10-03):** pasos 1–6 de `/proyecto-existente` hechos. Punto de guardado y mudanza fuera de OneDrive (D-001 a D-006), relevamiento del `arquitecto` (stack en §2, brechas en el Anexo A), estándares consultados (D-007 a D-012), rol de Vercel (D-013) y Keystatic (D-014). Constitución aprobada por el usuario el 2026-10-03. Paso 7 hecho: diagnóstico en `docs/auditoria-2026-10-03.md`, specs y orden en §8 (D-015, D-019). **Fase 0 cerrada.**

## 1. Proyecto
- Cliente / empresa: Crisur Polarizados — negocio familiar, +10 años, Godoy Cruz (Mendoza). Detalle en `PRODUCT.md`.
- Tipo: Web (contenido)
- Objetivo de negocio: convertir visitas en consultas por WhatsApp (y seguimiento por Instagram).
- Usuarios principales: particulares y comerciantes del Gran Mendoza que llegan desde Instagram, en el celular.
- Situación al 2026-10-03: online solo en `crisur-polarizados.vercel.app`; sin dominio; plan de Hostinger sin contratar.

## 2. Stack (existente)
Relevado por el `arquitecto` el 2026-10-03 sobre el commit `89311cd`. `npm run build` OK: 0 errores de tipos, 5 páginas, `dist/` de 1,3 MB.

| Capa | Existente | Decisión |
|---|---|---|
| Framework | Astro 7.3.5, salida estática, sin adapter ni integraciones | existente |
| Lenguaje | TypeScript 6.0.3 con `astro/tsconfigs/strictest` (más estricto que `strict`) | existente |
| Estilos / UI | CSS propio: custom properties en `src/styles/tokens.css` + `<style>` por componente. Sin Tailwind ni framework de UI | existente · sin Tailwind (D-007, D-009) |
| 3D y animación | three.js 0.186.1 (escenas de `/autos`, `/hogares`, `/negocios`, carga diferida) · Motion 13.4.6 (API vanilla) | existente |
| Tipografía | Archivo variable, self-hosted (`@fontsource-variable/archivo`) | existente |
| Contenido | Módulos TS en `src/data/` y `src/config/`; fotos de trabajos en `src/assets/gallery/<servicio>/` | existente · Keystatic postergado (D-014) |
| Base de datos | No hay | — |
| ORM | No hay | — |
| Autenticación | No hay | — |
| Testing | No hay (solo typecheck con `astro check`) | meta según D-007 |
| Gestor de paquetes | npm con `package-lock.json`. Node sin fijar (local 24.21.0; Astro pide ≥ 22.12) | existente |

## 3. Hosting y entornos
| Entorno | Dónde | URL | Decisión |
|---|---|---|---|
| Desarrollo | Local | localhost:4321 | — |
| Online provisorio | Vercel | `crisur-polarizados.vercel.app` | D-013: temporal, se da de baja al publicar en Hostinger |
| Producción | Hostinger (sin contratar; plan a definir: compartido o VPS) | Sin dominio | Pedido del usuario, 2026-10-02 |

Publicación en Hostinger hoy: build local y subida de `dist/` a `public_html` (README, "Publicar (Hostinger)"). `public/.htaccess` fuerza https sin `www` y sirve la 404 propia.

## 4. Estándares adoptados
Adoptar no cambia nada en el momento: lo que el proyecto no cumple pasa a mejoras candidatas (Anexo A) y se hace solo con tareas aprobadas.

| Estándar | Adoptado | Excepciones aprobadas |
|---|---|---|
| `docs/estandares/stack.md` | Sí (D-007) | Sin Tailwind: se mantiene el CSS propio con tokens. Lint, Prettier, tests, `env.ts`, `@astrojs/sitemap` y Node fijado quedan como meta |
| `docs/estandares/codigo.md` | Sí (D-008), sumando las reglas heredadas de Crisur (`CLAUDE.md`) | Componentes `.astro` en PascalCase · comentarios en español · slugs e IDs de dominio en español |
| `docs/estandares/diseno.md` | Sí (D-009) | Sin Tailwind: tokens solo como variables CSS. Accesibilidad: WCAG 2.2 AA |
| `docs/estandares/git.md` | Sí (D-010) | Sin PR ni CI obligatorios; las ramas `feature/*` y `fix/*` se mergean a `main` con el OK del usuario |
| `docs/estandares/deploy.md` | Sí (D-011) | Se aplica la sección del plan de Hostinger que se contrate (compartido o VPS) |
| `docs/estandares/definicion-de-terminado.md` | Sí (D-012) | Lint y tests se exigen recién cuando existan. Lighthouse ≥ 95 en mobile (meta del proyecto, en lugar de ≥ 90) |

## 5. Principios y restricciones del proyecto
- Nada inventado: sin cifras técnicas, fotos ni testimonios falsos (`PRODUCT.md`).
- Contacto solo por WhatsApp e Instagram: sin formularios, backend ni datos personales.
- Mobile primero: la mayoría llega desde Instagram en el celular.
- Accesibilidad WCAG 2.2 AA (D-009) y Lighthouse ≥ 95 en mobile (D-012).
- Keystatic queda fuera del alcance actual; si se hace, va con spec propia (D-014).
- Áreas a revisar y mejorar antes de publicar (pedido del usuario, 2026-10-02; confirmado 2026-10-03): textos y contenido · SEO local y Google · rendimiento y celular · diseño y accesibilidad.

## 6. Comandos
- Desarrollo: `npm run dev` (localhost:4321)
- Typecheck: `npm run check` (`astro check`)
- Build: `npm run build` (`astro check` + `astro build` → `dist/`)
- Preview de la build: `npm run preview`
- Tests: no hay · Lint: no hay · Formatter: no hay

## 7. Registro de decisiones del proyecto
| ID | Tema | Opciones | Opción elegida por el usuario | Fecha |
|---|---|---|---|---|
| D-001 | Punto de guardado | 3 commits en main · 1 commit en main · commits en rama aparte | **3 commits en main, sin push** (`4c12b0a` sitio, `9250b3e` setup del equipo, `6d4fdb4` graphify) | 2026-10-02 |
| D-002 | Clon anidado `Crisur-Polarizados/` (repos Git casi vacíos) | Moverlo fuera · dejarlo · borrarlo | **Moverlo fuera** → `Desktop\Crisur-Polarizados-clon-viejo` | 2026-10-02 |
| D-003 | Proyecto dentro de OneDrive | Mover a `C:\Proyectos\` · dejarlo en OneDrive | **Mover a `C:\Proyectos\Crisur-Polarizados`** (los parches de config siguen hasta que se decida sacarlos) | 2026-10-02 |
| D-004 | Copia vieja en OneDrive y cambios sin commitear | — (instrucción explícita del usuario) | **Commitear todo lo necesario y borrar la copia vieja** | 2026-10-03 |
| D-005 | Qué más borrar | Clon viejo del Escritorio · carpeta `skills/` duplicada · capturas de `.impeccable/review/` · nada más | **Las tres**: clon viejo, `skills/` (copia de `.claude/skills/`) y capturas de `.impeccable/review/` | 2026-10-03 |
| D-006 | Respaldo de los commits en GitHub | Push a main ahora · todavía no | **Push a main ahora** (sin force) | 2026-10-03 |
| D-007 | Estándar `stack.md` | Adoptar sin Tailwind · respetar lo actual · adoptarlo completo (migrar a Tailwind) | **Adoptar sin Tailwind** | 2026-10-03 |
| D-008 | Estándar `codigo.md` | Adoptar con excepciones (+ reglas heredadas) · respetar las reglas heredadas · adoptarlo completo | **Adoptar con excepciones**: `.astro` en PascalCase, comentarios y slugs en español, más las reglas heredadas de Crisur | 2026-10-03 |
| D-009 | Estándar `diseno.md` | Adoptar sin Tailwind (WCAG 2.2) · adoptar sin Tailwind con WCAG 2.1 · respetar lo actual | **Adoptar sin Tailwind, con WCAG 2.2 AA** | 2026-10-03 |
| D-010 | Estándar `git.md` | Adoptar con excepción (sin PR/CI obligatorios) · respetar lo actual (directo a main) · adoptarlo completo | **Adoptar con excepción**: `main` + `feature/*` y `fix/*`, merge con OK del usuario | 2026-10-03 |
| D-011 | Estándar `deploy.md` | Adoptarlo · respetar lo actual (solo el README) | **Adoptarlo**, con la sección del plan de Hostinger que se contrate | 2026-10-03 |
| D-012 | Definición de terminado | Excepciones + Lighthouse ≥ 95 · excepciones + Lighthouse ≥ 90 · adoptarla completa | **Excepciones + Lighthouse ≥ 95**: lint y tests se exigen cuando existan | 2026-10-03 |
| D-013 | Papel de Vercel (`crisur-polarizados.vercel.app`) | Preview permanente · temporal, se baja al publicar | **Temporal**: se da de baja cuando Hostinger esté online; los restos de Vercel en la config pasan a mejoras candidatas | 2026-10-03 |
| D-014 | Keystatic | Postergarlo con spec propia · sacarlo del proyecto · integrarlo antes de publicar | **Postergarlo con spec propia** | 2026-10-03 |
| D-015 | Agrupación de mejoras y primera spec (diagnóstico `/auditoria-web`) | Empezar por 001 conversion-whatsapp · 002 accesibilidad · 003 rendimiento-celular · 006 calidad-y-mantenimiento | **Agrupación de §8 aprobada; se empieza por 001 conversion-whatsapp** | 2026-10-03 |
| D-016 | Cómo medir Lighthouse (PageSpeed sin cuota) | Lighthouse local ahora (`npx`) · reintentar PageSpeed mañana · primera tarea de la spec 003 | **Lighthouse local ahora** | 2026-10-03 |
| D-017 | Guardar el informe de la auditoría | En `docs/auditoria-2026-10-03.md` · solo en el chat | **Guardarlo en `docs/auditoria-2026-10-03.md`** (commit con OK) | 2026-10-03 |
| D-018 | Datos que faltan del cliente (calle, hora de cierre, Google Maps, fotos) | Borrador de mensaje con `gestor-cliente` · los pide el usuario | **Los pide el usuario** | 2026-10-03 |
| D-019 | Orden de specs tras medir Lighthouse (rendimiento mobile 60–67) | 001 → 003 → 002 · mantener 001 → 002 → 003 · empezar por 003 | **001 → 003 → 002** | 2026-10-03 |

## 8. Specs
| Spec | Estado | Fase |
|---|---|---|
Agrupación aprobada en D-015 y orden en D-019, a partir de `docs/auditoria-2026-10-03.md`.

| Spec | Estado | Fase |
|---|---|---|
| 001-conversion-whatsapp | En curso · T1–T12 y T8b aprobadas; requisitos v2, diseño v5 y tareas v6 aprobados (2026-10-04) | 5 — Verificación (pendiente) |
| 007-ploteo | En cola (2.ª) · espera del cliente los tipos de ploteo y fotos; ya hay 2 fotos en `fotos-pendientes/ploteo/`, fuera de Git (D-061, D-064, D-085 y D-086 de la spec 001) | — |
| 003-rendimiento-celular | En cola (3.ª) | — |
| 002-accesibilidad | En cola (4.ª) | — |
| 004-seo-local | En cola · espera datos del cliente (D-018) | — |
| 005-publicacion-hostinger | En cola · espera contratar Hostinger y dominio | — |
| 006-calidad-y-mantenimiento | Cuando el usuario lo decida | — |
| keystatic (D-014) | Postergada | — |

**Pendiente del cliente (lo pide el usuario, D-018):** calle y número del taller · hora de cierre · link de Google Maps / Perfil de empresa · fotos de trabajos.

## Anexo A — Brechas y pendientes del relevamiento
Hechos relevados el 2026-10-03, **sin decidir**. Son insumo para agrupar mejoras en specs (paso 7); ninguno se hace sin aprobación.

- **Documentación desactualizada:**
  - `PRODUCT.md` dice "deploy en Vercel".
  - `docs/SDD.md`:
    - Keystatic aparece como CMS (§1/§2/§4/§6/§10).
    - El modelo de datos de §4 no coincide con `src/data/`.
    - Figura una página `/galeria` que no existe.
    - Dice "variables en Vercel".
    - La fecha del encabezado quedó vieja.
  - `README.md` dice que el proyecto vive en OneDrive.
  - `.env.example` trae un dominio de ejemplo (`crisurpolarizados.com.ar`), pero todavía no hay dominio.
- **Parches de OneDrive** (D-003): `preserveSymlinks` en `astro.config.mjs` y `extends` relativo en `tsconfig.json`.
- **Restos de Vercel** (D-013): fallback `VERCEL_PROJECT_PRODUCTION_URL` en `astro.config.mjs` y `.vercel/` en `.gitignore`.
- **Herramientas que faltan** (D-007, D-012): ESLint, Prettier, Vitest/Playwright, CI, `src/env.ts` con Zod, `@astrojs/sitemap` (hoy es manual) y versión de Node fijada.
- **Código** (D-008):
  - No se usa el alias `@/`.
  - Hay funciones duplicadas: `requireElement` está definida 3 veces y `addBox` 2 (una sin usar).
  - Hay funciones de alrededor de 110 líneas en el motor 3D.
  - Algunos booleanos no llevan prefijo `is/has`.
  - `vite` se importa en `astro.config.mjs` sin estar declarado en `package.json`.
- **Diseño** (D-009):
  - Hay colores sueltos en 11 componentes, más colores duplicados en `studio.ts`.
  - No hay tokens de espaciado ni de sombras.
  - Se usan breakpoints propios.
  - Falta verificar WCAG 2.2 AA y las áreas táctiles.
  - La 404 tiene tres `<nav aria-label="Servicios">` (header, página y pie), y la pregunta "¿Dónde querés colocar la lámina?" no está asociada a su `<nav>`. No incumple WCAG, pero conviene que cada zona tenga un nombre distinto: en la spec 006, el `<nav>` de la 404 toma su nombre de la pregunta (`aria-labelledby`), como el selector del inicio (detectado en la T12 de la spec 001, D-097 de esa spec).
  - DESIGN.md dice que a ≤ 520 px el botón de Instagram es una acción de texto de 2,75 rem; el sitio lo muestra con fondo y anillo de 3,25 rem (detectado en la spec 001, D-032 de esa spec).
  - En `/autos/` a 1440×800, el índice de capítulos de la escena ("Vidrio original", "La lámina", "Privacidad"…) se superpone con "Polarizado para" en la portada. Es anterior a la spec 001; se vuelve a mirar en su T10, que cambia la portada (detectado en la T5 de la spec 001, D-057 de esa spec). Revisado en la T10: sigue a 1440×800 en los 3 servicios y a 1440×900 en autos (10 px); la T10 no cambió el tamaño ni la posición del título. Se revisa en una spec de la escena 3D (D-090 de la spec 001).
  - A 1440×900, en `/hogares/` y `/negocios/`, el título de la portada ("…para HOGARES", "…para NEGOCIOS") pisa la parte baja de la casa y del local 3D. Es anterior a la spec 001: la T10 conserva el tamaño y la posición del título. Se revisa en una spec de la escena 3D (detectado en la T10 de la spec 001, D-090 de esa spec).
  - En celular horizontal con pantalla baja (≤ 880 × ≤ 340 px), el título del capítulo de servicio queda encima del objeto 3D y tapa parte de lo que muestra la escena (en `/autos/`, las ventanillas). Se lee bien gracias a la penumbra. Se revisa en una spec de la escena 3D (detectado en la T8b de la spec 001, D-083 de esa spec).
- **Contenido:** "polarizado(s)" se usa como término general en el `h1` del inicio ("Polarizados para autos, hogares y negocios", `HomeHero.astro:25`), en el `<title>` (`index.astro:18`) y en "Sobre nosotros" ("polarizamos, espejamos y esmerilamos…", `AboutSection.astro:30`, que además no menciona las láminas de seguridad), aunque en hogares no se ofrece polarizado. Se revisa en la spec 004 (SEO), junto con el `<title>` (detectado en la T9 de la spec 001, D-088 de esa spec).
- **Deploy** (D-011): el `.htaccess` no tiene caché de estáticos y no hay un procedimiento documentado para volver atrás.
- **Rendimiento:** el chunk de three.js pesa 539 KB (warning de Vite). Solo lo cargan las páginas de servicio.
- **Higiene del repo:**
  - ~~`graphify-out/` se versiona con su caché.~~ Resuelto el 2026-10-04: fuera de Git y en `.gitignore`; el grafo de código se regenera con `python -m graphify update .` (D-100 de la spec 001).
  - Hay 3 `.pyc` versionados en `.claude/skills/ui-ux-pro-max/scripts/__pycache__/`.
  - El archivo de instrucciones se llama `claude.md` (en minúscula).
  - `tsconfig.json` y `.graphifyignore` siguen nombrando `skills/`, que ya no existe.
  - `.claude/settings.json` autoriza scripts que no existen (`lint`, `test`, `typecheck`).

## Aprobación
- [x] Aprobado por el usuario · Fecha: 2026-10-03
