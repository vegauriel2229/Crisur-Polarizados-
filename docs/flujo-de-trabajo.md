# Flujo de trabajo — Spec-Driven Development (SDD)

> Regla suprema: **el usuario decide**. Los agentes proponen opciones; el orquestador consulta y registra.

```
FASE 0  Constitución ── /nueva-web · /nuevo-sistema · /proyecto-existente
        arquitecto releva opciones → el usuario elige stack, hosting y estándares
        → specs/constitucion.md ─────────────────────────────── ✋ aprobación

FASE 1  Requisitos ──── /nueva-feature
        analista-requisitos → historias + criterios EARS + preguntas
        → el usuario responde preguntas y confirma prioridades
        → specs/NNN/requisitos.md ───────────────────────────── ✋ aprobación

FASE 2  Diseño ──────── /spec-diseno
        arquitecto (opciones técnicas) ∥ disenador-ui (direcciones visuales)
        → el usuario decide cada punto → specs/NNN/diseno.md ── ✋ aprobación

FASE 3  Tareas ──────── /spec-tareas
        arquitecto → tareas chicas con verificación
        → specs/NNN/tareas.md ───────────────────────────────── ✋ aprobación

FASE 4  Implementación ─ /spec-implementar   (repetir por tarea)
        dev-* implementa UNA tarea → verificación → code-reviewer
        → el usuario ve el resultado ────────────────────────── ✋ OK por tarea

FASE 5  Verificación ── /spec-verificar
        qa-tester ∥ code-reviewer ∥ seguridad / seo-rendimiento
        → correcciones elegidas por el usuario = tareas nuevas
        → entrega ───────────────────────────────────────────── ✋ aprobación
```

## Bugs — /fix-bug
`debugger` diagnóstico (sin tocar código) → opciones → **el usuario elige** → `debugger` corrige + test → `code-reviewer` → ✋ OK

## Cambios a algo ya aprobado
Volver a la fase correspondiente → consultar → subir versión del documento → ✋ aprobación → seguir.

## En cualquier momento
`/spec-estado` muestra fase, tareas y decisiones pendientes.

## Empresa vs freelance
- **Empresa:** la constitución suele venir dada por el equipo (stack y estándares de la empresa); las specs se alinean a tickets e historias del sprint.
- **Freelance:** `/presupuesto` antes de aceptar el trabajo; la constitución se arma con el cliente en mente (costos de hosting, quién mantiene el sitio).
