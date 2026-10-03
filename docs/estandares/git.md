# Estándar de Git

> **Estándar base propuesto.** No se aplica automáticamente: en la Fase 0 de cada proyecto el usuario decide si lo adopta tal cual o con excepciones (queda registrado en `specs/constitucion.md`). Cualquier punto no adoptado o no cubierto se consulta.

## Ramas
- `main` → producción (siempre desplegable).
- `develop` → integración (en proyectos con más de una persona o con staging).
- `feature/<descripcion-corta>`, `fix/<descripcion>`, `hotfix/<descripcion>`, `chore/<descripcion>`.

En proyectos freelance chicos alcanza con `main` + ramas `feature/*`.

## Commits — Conventional Commits (en inglés)

```
feat(auth): add password reset flow
fix(cart): prevent negative quantities
refactor(orders): extract price calculation
docs: add deploy instructions
test(orders): cover discount edge cases
chore: update dependencies
```

- Un commit = un cambio lógico. Mensaje en imperativo, < 72 caracteres en el título.
- Nunca commitear: `.env*` (salvo `.env.example`), `node_modules`, builds, archivos del sistema operativo, credenciales.

## Pull Requests
- Usar `plantillas/pull-request.md`.
- PR chicos (idealmente < 400 líneas cambiadas).
- Requisitos para mergear: CI en verde + revisión de `code-reviewer` sin bloqueantes.
- Squash merge en features; el título del PR sigue Conventional Commits.

## Prohibido
- `git push --force` a `main`/`develop`.
- Reescribir historia ya compartida.
- Commitear directo a `main` en proyectos de empresa.
