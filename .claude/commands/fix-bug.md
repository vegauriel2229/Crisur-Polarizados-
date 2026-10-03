---
description: 'Diagnostica un bug y propone opciones de corrección; se implementa solo la opción que elija el usuario'
argument-hint: '[descripción del error o stack trace]'
---
Bug: $ARGUMENTS

1. `debugger` (modo diagnóstico) → reproduce, encuentra la causa raíz y propone 1–3 opciones de corrección con pros y contras. **No modifica código en este paso.**
2. Mostrame el diagnóstico y consultame la opción.
3. `debugger` (modo corrección) → implementa la opción elegida + test de regresión.
4. `code-reviewer` revisa. Mostrame el resultado y pedime el OK.
5. Registrá el bug y la decisión en `decisiones.md` de la spec afectada (o en la constitución si es global).
