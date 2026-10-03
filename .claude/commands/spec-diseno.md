---
description: 'Fase 2 SDD: diseño técnico y visual de la spec activa, con cada decisión consultada'
argument-hint: '[NNN-nombre de la spec, opcional]'
---
Spec: $ARGUMENTS (si no se indica, la spec activa más reciente)

1. Verificá que `requisitos.md` esté APROBADO. Si no, frená.
2. `arquitecto` → identifica todas las decisiones técnicas (modelo de datos, contratos, auth, librerías, estructura) y devuelve **opciones**, no elecciones.
3. Si la spec tiene interfaz: `disenador-ui` → devuelve 2–3 **direcciones visuales** y las decisiones de UX pendientes.
4. Consultame todas las decisiones (en tandas de hasta 4) y registralas en `decisiones.md`.
5. Con mis elecciones, `arquitecto` (y `disenador-ui`) redactan `diseno.md` con trazabilidad a los requisitos.
6. Mostrame el diseño y pedime la aprobación. Siguiente paso: `/spec-tareas`.
