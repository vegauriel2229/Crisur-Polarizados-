---
description: 'Fase 0 SDD para un proyecto que ya existe: releva el stack actual (no lo elige), lo audita y propone por dónde empezar a mejorarlo'
argument-hint: '[qué es el proyecto y qué querés mejorar]'
---
Proyecto existente: $ARGUMENTS

**Fase 0 — Constitución de un proyecto existente** (regla suprema de CLAUDE.md: todo se consulta). El stack ya está dado: se documenta, no se elige.

1. Punto de guardado: si el proyecto no usa Git o tiene cambios sin commitear, `devops` propone cómo crearlo (`git init` + commit del estado actual) y se ejecuta solo con mi confirmación. Sin punto de guardado no se sigue.
2. Si la carpeta está dentro de OneDrive, avisame y preguntame si la muevo a `C:\Proyectos\`.
3. Si hay brief o documentación del proyecto, leela. Preguntame lo que falte del negocio: cliente, usuarios, qué funciona mal hoy y qué querés mejorar.
4. `arquitecto` (relevamiento, sin proponer cambios) → documenta lo que hay: framework y versiones, dependencias, base de datos, auth, hosting y deploy, estructura de carpetas, convenciones del código, comandos (dev/build/test/lint), tests y CI existentes. En proyectos grandes puede usar `graphify`.
5. Consultame:
   - por cada estándar de `docs/estandares/`: adoptarlo, respetar las convenciones que ya tiene el proyecto, o adoptarlo con excepciones.
   - si el stack no es el que cubre el equipo (Astro / Next.js / Prisma), mostrámelo y preguntame cómo seguir.
6. Armá `specs/constitucion.md` con `plantillas/sdd/constitucion.md`, marcando el stack como **existente** (no como decisión), mostrámela y pedime la aprobación.
7. Al aprobarla, ofreceme un diagnóstico: `/auditoria-web` si es una web, o `code-reviewer` (calidad general) + `seguridad` si es un sistema. Con el resultado, proponeme cómo agrupar las mejoras en specs y en qué orden, para que yo elija por cuál empezar.

En esta fase no se modifica código, ni se actualizan dependencias, ni se cambia configuración.
