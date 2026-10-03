---
description: 'Fase 4 SDD: implementa UNA tarea aprobada, la verifica y espera el OK del usuario'
argument-hint: '[ID de tarea, ej. T3 — opcional, por defecto la siguiente pendiente]'
---
Tarea: $ARGUMENTS (si no se indica, la siguiente `pendiente` cuyas dependencias estén aprobadas)

1. Verificá que `tareas.md` esté APROBADO. Si no, frená.
2. Anunciame qué tarea vas a hacer y qué agente la ejecuta.
3. Delegá **solo esa tarea** al agente indicado, con el encargo estándar (spec, tarea, decisiones relevantes, criterio de terminado).
4. Si el agente devuelve `DECISIONES PENDIENTES` o encuentra que la spec no se puede cumplir tal cual: frená y consultame.
5. Verificá la tarea (su criterio de verificación + lint/typecheck/tests relacionados).
6. `code-reviewer` revisa la tarea contra la spec. Si hay 🔴, mostrámelos con opciones antes de seguir.
7. Marcá la tarea como `esperando OK` y mostrame: qué se hizo, archivos tocados, cómo verlo, resultado de la verificación, veredicto de `code-reviewer` y "Por qué se hizo así".
8. **No sigas con la próxima tarea hasta que yo apruebe.** Al aprobar: marcarla `aprobada` y `[x]`.
