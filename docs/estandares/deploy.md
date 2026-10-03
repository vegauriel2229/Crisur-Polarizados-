# Estándar de deploy

> **Estándar base propuesto.** No se aplica automáticamente: en la Fase 0 de cada proyecto el usuario decide si lo adopta tal cual o con excepciones (queda registrado en `specs/constitucion.md`). Cualquier punto no adoptado o no cubierto se consulta.

## Checklist común (antes de cualquier deploy)
- [ ] `npm run build` sin errores ni warnings relevantes.
- [ ] Lint, typecheck y tests en verde.
- [ ] Variables de entorno cargadas en el destino y documentadas en `.env.example`.
- [ ] `seguridad` revisó si hubo cambios en auth, pagos o datos personales.
- [ ] Migraciones de BD probadas en una copia/staging.
- [ ] Plan de rollback definido (deploy anterior / backup de BD).
- [ ] Dominio con HTTPS y redirección `www` ↔ raíz definida.

## Vercel / Netlify (Astro y Next.js)
- Conectar el repo de GitHub; deploy automático desde `main`, previews por PR.
- Variables de entorno separadas por entorno (Production / Preview).
- Next.js con Prisma: correr `prisma generate` en el build; `prisma migrate deploy` en un paso controlado, no en cada build si hay riesgo.

## Supabase / Neon (PostgreSQL)
- Usar la URL **con pooling** para la app y la **directa** para migraciones (`DATABASE_URL` / `DIRECT_URL` en Prisma).
- Si el frontend usa el cliente de Supabase directamente: **Row Level Security activado** en todas las tablas.
- Backups automáticos activos; región cercana a los usuarios.

## VPS (Hostinger, DigitalOcean)
- Usuario no-root con SSH por clave; login con contraseña deshabilitado; firewall (`ufw`) solo 22/80/443.
- App en **Docker** (Next.js con `output: 'standalone'`) + `docker compose`.
- **Nginx** como reverse proxy + certificado SSL con **Certbot** (renovación automática).
- Backups diarios de la BD fuera del servidor. Logs con rotación.
- Actualizaciones de seguridad del sistema activas.

## Hosting compartido (cPanel)
- Ideal para **Astro estático**: `npm run build` y subir el contenido de `dist/` a `public_html` (Administrador de archivos, FTP o "Git Version Control" de cPanel).
- `.htaccess`: forzar HTTPS, redirecciones, páginas 404 personalizadas, caché de estáticos.
- BD MySQL creada desde cPanel (usuario con permisos mínimos).
- Next.js en cPanel solo si el plan tiene "Setup Node.js App"; si no, recomendar Vercel o VPS al cliente.
- Configurar correo del dominio (SPF, DKIM, DMARC) si el sitio envía mails.

## Rollback
- Vercel/Netlify: "Promote" del deploy anterior.
- VPS: volver a la imagen/tag anterior de Docker.
- cPanel: conservar el `dist/` anterior comprimido antes de subir uno nuevo.
