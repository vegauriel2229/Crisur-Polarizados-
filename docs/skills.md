# Skills del equipo

Las skills se instalan con `instalar.bat` (las copia desde `Escritorio\skills` a `%USERPROFILE%\.claude\skills`).

> **Las skills aportan criterio y conocimiento, nunca deciden.** Si una skill sugiere omitir, simplificar o cambiar algo, el agente lo devuelve como opción y el usuario decide.

**Precargada** = se inyecta completa al iniciar el agente. **A demanda** = el agente la invoca solo si la tarea lo necesita.

| Skill | Qué aporta | Precargada en | A demanda en | Requisitos |
|---|---|---|---|---|
| `frontend-design` | Criterio de dirección visual e identidad | `disenador-ui` | `dev-frontend` | — |
| `ui-ux-pro-max` | Datos de estilos, paletas, tipografías y guías UX | `disenador-ui` | — | Python (para sus scripts) |
| `impeccable` | Auditoría y pulido de interfaces | — | `disenador-ui`, `dev-frontend`, `seo-rendimiento` | — |
| `motion` | Implementación de animaciones (Motion/CSS) | — | `dev-frontend` | — |
| `seo-audit` | Auditoría SEO técnica y on-page | `seo-rendimiento` | — | — |
| `ponytail` | Detectar complejidad innecesaria — **solo como sugerencia** | `code-reviewer` | — | — |
| `graphify` | Mapa de proyectos grandes | — | `arquitecto`, `debugger` | Python + `pip install graphifyy` |
| `claudemem` | Memoria entre sesiones (`/wrapup`, `/recall`) | — | Sesión principal | CLI `claudemem` |

## Sobre ponytail
Por diseño, `ponytail` intenta aplicar la solución mínima por su cuenta. En este equipo:
- Solo la usa `code-reviewer`, y sus hallazgos se presentan como 🟡 con opciones.
- El plugin `ponytail@ponytail` está desactivado en `.claude/settings.json` (`enabledPlugins`): así no se activa en la sesión principal ni se inyecta en los demás subagentes. `code-reviewer` usa la skill instalada en `%USERPROFILE%\.claude\skills\ponytail`.

## Agregar una skill
Copiala a `%USERPROFILE%\.claude\skills\<nombre>`, decidí en qué agente va (máx. 2 precargadas por agente) y agregala a `docs/skills.md`.
