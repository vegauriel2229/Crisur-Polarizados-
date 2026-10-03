# Definición de terminado (DoD)

> **Estándar base propuesto.** No se aplica automáticamente: en la Fase 0 de cada proyecto el usuario decide si lo adopta tal cual o con excepciones (queda registrado en `specs/constitucion.md`). Cualquier punto no adoptado o no cubierto se consulta.

## Código (toda tarea)
- [ ] Cumple los criterios de aceptación de los requisitos que cubre.
- [ ] Hace exactamente lo que dice la tarea aprobada, sin agregados.
- [ ] Sin decisiones tomadas por agentes: todo lo no especificado fue consultado y registrado.
- [ ] Compila; lint y typecheck sin errores.
- [ ] Tests nuevos/actualizados y en verde.
- [ ] Sin secretos, `console.log`, código comentado ni `any` injustificado.
- [ ] Revisado por `code-reviewer`: conforme a la spec.
- [ ] **Aprobada por el usuario** (estado `aprobada` en `tareas.md`).

## Interfaz
- [ ] Responsive (360 / 768 / 1024 / 1440).
- [ ] Estados: cargando, vacío, error, éxito.
- [ ] Accesible: teclado, foco visible, contraste AA, labels y `alt`.
- [ ] Respeta los tokens del sistema de diseño.

## Backend / datos
- [ ] Input validado con Zod; permisos verificados en el servidor.
- [ ] Errores manejados con mensajes claros.
- [ ] Migraciones versionadas y reversibles.
- [ ] Variables nuevas en `.env.example`.

## Entrega de una web al cliente
- [ ] `seo-rendimiento` aprobó: title/description por página, OG, sitemap, robots, favicon, 404.
- [ ] Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO (mobile).
- [ ] Formularios probados de punta a punta (el mail llega).
- [ ] Analytics instalado si el cliente lo pidió; aviso de privacidad/cookies si corresponde.
- [ ] HTTPS, dominio y redirecciones funcionando.
- [ ] README técnico + manual breve para el cliente.
- [ ] `plantillas/checklist-entrega.md` completo.
