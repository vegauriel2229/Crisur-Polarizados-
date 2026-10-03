# Guía del equipo — quién hace qué

> Todos proponen, nadie decide: cada decisión vuelve al usuario (CLAUDE.md §0). La sesión principal (el **orquestador**) es la única que delega y te consulta. No hace falta llamar a los agentes por nombre: usás un comando o pedís lo que necesitás ("que el arquitecto me releve opciones de hosting") y el orquestador delega.

## Roles

### Orquestador (sesión principal) · Tech Lead
- **Rol:** coordina el equipo, detecta cada decisión, te la presenta con opciones, la registra y delega de a una tarea.
- **Entra en:** siempre.
- **No hace:** decidir por vos ni saltear fases.

### Planificación

**`analista-requisitos` · Analista funcional** (sonnet)
- **Rol:** convierte lo que pide el cliente en requisitos verificables: historias de usuario + criterios EARS (`CUANDO…, EL SISTEMA DEBERÁ…`).
- **Entra en:** Fase 1 (`/nueva-feature`) y en `/presupuesto` (alcance).
- **Entrega:** `requisitos.md` con alcance incluye / no incluye, casos borde, supuestos y preguntas abiertas.
- **No hace:** elegir tecnologías, fijar prioridades ni programar.

**`arquitecto` · Arquitecto de software** (modelo de la sesión, con memoria de proyecto)
- **Rol:** releva las opciones técnicas con pros, contras y costo mensual; con tus elecciones redacta el diseño técnico y lo divide en tareas.
- **Entra en:** Fase 0 (stack, hosting), Fase 2 (modelo de datos, contratos, auth, librerías) y Fase 3 (`tareas.md`).
- **Entrega:** opciones → `diseno.md` (parte técnica) → `tareas.md` con agente, dependencias y verificación por tarea.
- **No hace:** elegir por vos ni escribir código.

### Diseño

**`disenador-ui` · Diseñador UI/UX** (sonnet · skills `frontend-design`, `ui-ux-pro-max`)
- **Rol:** propone 2–3 direcciones visuales (paleta AA, tipografías, layout) y las decisiones de UX; con la elegida especifica tokens, pantallas y todos los estados.
- **Entra en:** Fase 2 de toda spec con interfaz, y en auditorías visuales (`/auditoria-web`).
- **Entrega:** direcciones → sección de interfaz de `diseno.md` · lista de contenido que falta pedirle al cliente.
- **No hace:** tocar el código del proyecto.

### Desarrollo (Fase 4, de a una tarea aprobada)

**`dev-frontend` · Frontend** (sonnet)
- **Rol:** páginas, componentes, formularios, estilos, animaciones y responsive en Astro o Next.js, fiel al diseño aprobado.
- **Entrega:** la tarea implementada + cómo verla (ruta/URL) + build verificado.
- **No hace:** instalar dependencias, inventar estados o textos.

**`dev-backend` · Backend** (sonnet)
- **Rol:** lógica de servidor: server actions, route handlers, Astro Actions y endpoints, auth y permisos, validación Zod, integraciones, pagos y webhooks.
- **Entrega:** actions/endpoints según los contratos + variables nuevas en `.env.example`.
- **No hace:** definir reglas de negocio ni contratos que no estén en la spec.

**`dev-database` · Bases de datos** (sonnet)
- **Rol:** schema Prisma, migraciones, índices, queries y seeds según el modelo aprobado.
- **Entrega:** migración creada **sin aplicar** + el SQL para que lo revises.
- **No hace:** aplicar migraciones sin tu OK, ni cambios destructivos sin plan.

### Calidad

**`code-reviewer` · Revisor de código** (modelo de la sesión · skill `ponytail` solo como sugerencia)
- **Rol:** verifica que cada tarea haga exactamente lo pedido: ni más ni menos. Revisa corrección, tipos, accesibilidad y tests.
- **Entra en:** después de cada tarea (Fase 4), en `/revisar` y en `/spec-verificar`.
- **Entrega:** 🔴 bloqueantes / 🟡 sugerencias con opciones / 🟢 · veredicto.
- **No hace:** modificar código (solo lectura).

**`qa-tester` · QA** (sonnet)
- **Rol:** escribe y corre los tests que la tarea especifica (Vitest, Testing Library, Playwright); en Fase 5 arma la tabla requisito → test → resultado.
- **Entrega:** tests que citan el criterio (`R2.3 …`), cobertura de criterios y bug reports.
- **No hace:** corregir bugs ni ajustar un test para que pase.

**`seguridad` · AppSec** (modelo de la sesión)
- **Rol:** audita con OWASP Top 10: control de acceso, inyección, auth, secretos, pagos y webhooks, archivos, headers, dependencias, RLS y Ley 25.326.
- **Entra en:** specs con auth, roles, pagos, datos personales, archivos o webhooks, y antes de todo deploy a producción.
- **Entrega:** hallazgos por severidad con opciones · **Apto para producción: Sí / No**.
- **No hace:** modificar código (solo lectura).

**`seo-rendimiento` · SEO, rendimiento y accesibilidad** (sonnet · skill `seo-audit`)
- **Rol:** mide Lighthouse y Core Web Vitals, revisa SEO técnico y local, Open Graph, JSON-LD y accesibilidad.
- **Entra en:** Fase 5 de toda web y cuando una web está lenta o no aparece en Google.
- **Entrega:** puntajes medidos + 🔴/🟡/🟢 con opciones · **Apta para publicar: Sí / No**.
- **No hace:** modificar archivos ni reescribir textos del cliente.

**`debugger` · Debugging** (modelo de la sesión)
- **Rol:** en modo DIAGNÓSTICO reproduce el error, encuentra la causa raíz y propone de 1 a 3 correcciones. En modo CORRECCIÓN aplica solo la que elegiste, con test de regresión.
- **Entra en:** `/fix-bug`, builds rotos, comportamiento inesperado.
- **No hace:** silenciar errores ni corregir sin tu elección.

### Operaciones, documentación y negocio

**`devops` · DevOps / release** (sonnet)
- **Rol:** ramas, commits y PRs (Conventional Commits), GitHub Actions, `.gitignore` y `.env.example`, plan de deploy con rollback para Vercel/Netlify, VPS o cPanel.
- **Entrega:** planes y comandos; cada acción real (commit, push, deploy, DNS, migración) se ejecuta solo con tu confirmación.

**`documentador` · Documentación** (haiku)
- **Rol:** README técnico, CHANGELOG por spec y manual del cliente en lenguaje simple, basados solo en lo implementado y aprobado.
- **Entra en:** el cierre de cada spec o proyecto.

**`gestor-cliente` · Project manager** (sonnet)
- **Rol:** brief, estimación de 3 puntos, borradores de presupuesto y propuesta, reportes de avance, cambios de alcance y checklist de entrega.
- **No hace:** fijar precios, plazos ni condiciones (quedan `[A DEFINIR POR EL USUARIO]`), ni enviarle nada al cliente.

---

## Situaciones

Formato: **comando** → agentes en orden → **lo que decidís vos**.

### 1. Un cliente pide presupuesto
`/presupuesto` → `gestor-cliente` (qué falta del brief) → `analista-requisitos` (alcance) → `arquitecto` (stack y costos mensuales) → `gestor-cliente` (estimación + borradores).
**Vos:** alcance, stack, tarifa, precio, forma de pago, plazos y condiciones.

### 2. Landing o web institucional desde cero
`nuevo-proyecto.bat` → `/nueva-web` (`arquitecto`: opciones) → `/nueva-feature 001-sitio-base` (`analista-requisitos`) → `/spec-diseno` (`arquitecto` ∥ `disenador-ui`) → `/spec-tareas` → `/spec-implementar` × N (`dev-frontend`; `dev-backend` si hay formulario con Astro Actions; `code-reviewer` en cada una) → `/spec-verificar` (`qa-tester` ∥ `code-reviewer` ∥ `seo-rendimiento`) → `/deploy` (`devops`) → `documentador`.
**Vos:** framework, hosting, dirección visual, textos, aprobación de cada tarea y de la entrega.

### 3. Sistema con login y panel (turnos, stock, clientes)
`nuevo-proyecto.bat` → `/nuevo-sistema` → el orquestador propone dividirlo en specs (ej.: `001-auth`, `002-turnos`, `003-reportes`) → ciclo de fases 1 a 5 por spec. En Fase 4 el orden típico es `dev-database` (schema) → `dev-backend` (actions y permisos) → `dev-frontend` (pantallas) → `qa-tester`. En Fase 5 se suma `seguridad`.
**Vos:** base de datos y proveedor, auth, roles, reglas de negocio (qué pasa si se cancela un turno), aplicar cada migración.

### 4. E-commerce o cobros online
Igual que el caso 3, con `dev-backend` a cargo del webhook del proveedor (idempotente y con montos recalculados en el servidor). `seguridad` es obligatoria antes de producción.
**Vos:** Mercado Pago o Stripe, políticas de stock, envío, cancelación y reembolso.

### 5. Agregar una funcionalidad a un proyecto en marcha
`/nueva-feature <nombre>` → fases 1 a 5. Si la funcionalidad cambia algo ya aprobado, se vuelve a esa fase, se sube la versión del documento y se aprueba de nuevo.

### 6. Aparece un bug
`/fix-bug <error>` → `debugger` en modo diagnóstico (causa raíz + opciones) → **elegís** → `debugger` en modo corrección (fix + test de regresión) → `code-reviewer`.
**Vos:** cuál corrección se aplica.

### 7. Mejorar un proyecto que ya existe (propio o hecho por otro)
Solo diagnóstico, sin tocar nada: `/auditoria-web <url o ruta>` → `seo-rendimiento` ∥ `seguridad` ∥ `disenador-ui` (con `impeccable`), en solo lectura.
Para trabajar sobre el proyecto: pedile al orquestador que integre el equipo en la carpeta (copia solo lo que falta) → `/proyecto-existente` en el proyecto → `devops` (punto de guardado con Git) → `arquitecto` documenta el stack actual (con `graphify` si es grande) → diagnóstico → cada mejora como spec con `/nueva-feature`.
**Vos:** si adoptás los estándares o respetás las convenciones existentes, qué hallazgos se corrigen y en qué orden.

### 8. El cliente pide algo nuevo a mitad de proyecto
`gestor-cliente` lo detecta y prepara una cotización aparte → si la aceptás, `analista-requisitos` agrega los requisitos (nueva versión o nueva spec) → re-aprobación.
**Vos:** si se cotiza aparte, se absorbe o se rechaza.

### 9. Cambio puntual y totalmente especificado
Ej.: "cambiá el teléfono del footer por 11 5555-5555". Lo ejecuta el orquestador directamente (excepción controlada) y te muestra el cambio. Si falta cualquier dato, consulta.

### 10. Rediseño visual
`/nueva-feature rediseno` → `/spec-diseno` con `disenador-ui` (2–3 direcciones nuevas) → tareas → `dev-frontend` → `seo-rendimiento` verifica que no empeoren rendimiento ni accesibilidad.

### 11. La web está lenta o no aparece en Google
`seo-rendimiento` mide (Lighthouse, Core Web Vitals, indexación) → opciones → las que elijas se vuelven tareas → `dev-frontend` → `seo-rendimiento` vuelve a medir.

### 12. Antes de un commit o PR
`/revisar` → `code-reviewer` + `seguridad` (si se tocó auth, pagos, datos personales, archivos o webhooks) + `qa-tester` (suite). Después, `devops` propone el commit y el PR.

### 13. Cambio en la base de datos
Tarea de `dev-database` → migración creada sin aplicar + SQL. Si borra o renombra columnas, viene con un plan de migración de datos.
**Vos:** aprobás aplicarla (nunca `migrate reset` ni `db push` en producción).

### 14. Publicar en producción
`/deploy <destino>` → `devops` verifica el destino contra la constitución y arma el checklist, el plan y el rollback. Antes de producción interviene `seguridad`. Se ejecuta un paso a la vez con tu confirmación.

### 15. Cierre y entrega al cliente
`/spec-verificar` → `documentador` (README, CHANGELOG, manual del cliente) → `gestor-cliente` (checklist de entrega y borrador del mensaje de entrega).

### 16. Reporte de avance para el cliente
`/spec-estado` → `gestor-cliente` redacta el reporte en borrador (hecho · en curso · bloqueos · próximo paso).

### 17. Trabajo para una empresa con stack propio
Fase 0 registrando lo que la empresa impone como constitución dada. Las specs se alinean a los tickets del sprint y `devops` sigue el flujo de Git de la empresa.
