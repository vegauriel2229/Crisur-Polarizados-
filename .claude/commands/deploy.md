---
description: 'Prepara un deploy con checklist; cada acción sobre producción requiere confirmación del usuario'
argument-hint: '[destino: vercel | netlify | vps | cpanel]'
---
Deploy a: $ARGUMENTS

1. Verificá que el destino coincida con el definido en `specs/constitucion.md`. Si no coincide o no está definido, consultame.
2. `devops` → checklist común de `docs/estandares/deploy.md`. Si falta algo, mostrámelo y consultame cómo seguir.
3. Mostrame el plan de deploy paso a paso (incluido el rollback) y pedime la aprobación.
4. Ejecutá **un paso por vez** con mi confirmación en cada acción sobre producción (variables, migraciones, DNS, publicación).
5. Verificación post-deploy y reporte.
