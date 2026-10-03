---
description: 'Revisión de los cambios actuales contra la spec antes de commit o PR'
---
Revisá los cambios actuales (`git diff` y archivos nuevos):
1. `code-reviewer` → conformidad con la spec, calidad y simplicidad (sugerencias, no cambios).
2. `seguridad` → solo si los cambios tocan auth, roles, pagos, datos personales, archivos o webhooks.
3. `qa-tester` → correr la suite.
Resumen: bloqueantes, sugerencias y veredicto. **No apliques ninguna corrección**: presentame las opciones y esperá mi decisión.
