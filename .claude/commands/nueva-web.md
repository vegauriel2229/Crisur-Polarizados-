---
description: 'Fase 0 SDD para un proyecto web de contenido: crea la constitución del proyecto consultando cada decisión'
argument-hint: '[cliente y tipo de web]'
---
Proyecto web: $ARGUMENTS

**Fase 0 — Constitución** (regla suprema de CLAUDE.md: todo se consulta).

1. Si existe un brief del cliente, leelo. Si faltan datos del negocio, preguntámelos.
2. Pedile al `arquitecto` las **opciones** (no elecciones) para: framework, estilos/UI, formularios, hosting, dominio y analítica, con pros, contras y costo mensual estimado para el cliente.
3. Consultame cada decisión con `AskUserQuestion` y registrala.
4. Preguntame si adopto cada estándar de `docs/estandares/` tal cual o con excepciones.
5. Armá `specs/constitucion.md` con `plantillas/sdd/constitucion.md`, mostrámela y pedime la aprobación.
6. Al aprobarla, proponeme la primera spec (ej. `001-sitio-base`) para iniciar con `/nueva-feature`.

No crees el proyecto ni instales nada en esta fase.
