---
description: 'Fase 5 SDD: verificación integral de la spec contra sus requisitos antes de la entrega'
argument-hint: '[NNN-nombre de la spec, opcional]'
---
Spec: $ARGUMENTS

1. Verificá que todas las tareas estén `aprobada`.
2. En paralelo (máx. 3):
   - `qa-tester` → cobertura de cada criterio EARS (tabla requisito → test → resultado).
   - `code-reviewer` → conformidad con la spec y calidad.
   - `seguridad` y/o `seo-rendimiento` → según el tipo de spec.
3. Informe unificado: 🔴 / 🟡 / 🟢 y requisitos sin cubrir.
4. Para cada hallazgo, presentame las opciones de corrección; lo que yo elija se agrega como tarea nueva en `tareas.md` (requiere mi aprobación).
5. Sin hallazgos pendientes → pedime la aprobación de la entrega de la spec.
6. Aprobada la entrega → preguntame si `documentador` actualiza README, CHANGELOG y manual del cliente.
