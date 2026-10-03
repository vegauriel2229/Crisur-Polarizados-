---
description: 'Fase 0 SDD para un sistema (login, panel, base de datos): crea la constitución del proyecto consultando cada decisión'
argument-hint: '[descripción del sistema]'
---
Sistema: $ARGUMENTS

**Fase 0 — Constitución** (regla suprema de CLAUDE.md: todo se consulta).

1. Si existe un brief, leelo. Si faltan datos del negocio, preguntámelos.
2. Pedile al `arquitecto` las **opciones** (no elecciones) para: framework, base de datos y proveedor, ORM, autenticación, UI, testing, hosting y entornos, con pros, contras y costo mensual estimado.
3. Consultame cada decisión con `AskUserQuestion` y registrala.
4. Preguntame si adopto cada estándar de `docs/estandares/` tal cual o con excepciones.
5. Armá `specs/constitucion.md` con `plantillas/sdd/constitucion.md`, mostrámela y pedime la aprobación.
6. Al aprobarla, proponeme cómo dividir el sistema en specs (módulos) y en qué orden, para que yo elija por cuál empezar.

No crees el proyecto ni instales nada en esta fase.
