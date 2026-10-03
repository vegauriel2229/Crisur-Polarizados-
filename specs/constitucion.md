# Constitución del proyecto: Crisur Polarizados

**Estado:** BORRADOR · **Versión:** 1

> Documento de la Fase 0 (`/proyecto-existente`). Define las reglas del proyecto. Cada elección referencia la decisión del usuario que la originó. El stack es **existente**: se documenta, no se elige.

> **Dónde quedamos (2026-10-03):** punto de guardado hecho (D-001), clon anidado copiado entero a `Desktop\Crisur-Polarizados-clon-viejo` (D-002), proyecto mudado a `C:\Proyectos\Crisur-Polarizados` y verificado: git íntegro, `npm run build` OK (D-003). Copia vieja de OneDrive borrada (D-004); queda solo la carpeta raíz vacía, que se borra al cerrar la sesión que la tenía abierta. Siguiente paso: relevamiento del `arquitecto` (paso 4 de `/proyecto-existente`) y luego la consulta de estándares (paso 5).

## 1. Proyecto
- Cliente / empresa: Crisur Polarizados — negocio familiar, +10 años, Godoy Cruz (Mendoza). Detalle en `PRODUCT.md`.
- Tipo: Web (contenido)
- Objetivo de negocio: convertir visitas en consultas por WhatsApp (y seguimiento por Instagram).
- Usuarios principales: particulares y comerciantes del Gran Mendoza que llegan desde Instagram, en el celular.

## 2. Stack (existente)
_Pendiente del relevamiento del `arquitecto`._

| Capa | Existente | Decisión |
|---|---|---|
| Framework | | existente |
| Lenguaje | | existente |
| Estilos / UI | | existente |
| Base de datos | | |
| ORM | | |
| Autenticación | | |
| Testing | | |
| Gestor de paquetes | | |

## 3. Hosting y entornos
_Pendiente._

| Entorno | Dónde | URL | Decisión |
|---|---|---|---|
| Desarrollo | Local | localhost:4321 | — |
| Preview / staging | | | |
| Producción | Hostinger (pedido del usuario) | | |

## 4. Estándares adoptados
_Pendiente (paso 5)._

| Estándar | Adoptado | Excepciones aprobadas |
|---|---|---|
| `docs/estandares/codigo.md` | | |
| `docs/estandares/git.md` | | |
| `docs/estandares/diseno.md` | | |
| `docs/estandares/deploy.md` | | |
| `docs/estandares/definicion-de-terminado.md` | | |

## 5. Principios y restricciones del proyecto
- Nada inventado: sin cifras técnicas, fotos ni testimonios falsos (`PRODUCT.md`).
- Áreas a revisar y mejorar antes de publicar (pedido del usuario, 2026-10-02): textos y contenido · SEO local y Google · rendimiento y celular · diseño y accesibilidad.

## 6. Comandos
_Pendiente del relevamiento._

## 7. Registro de decisiones del proyecto
| ID | Tema | Opciones | Opción elegida por el usuario | Fecha |
|---|---|---|---|---|
| D-001 | Punto de guardado | 3 commits en main · 1 commit en main · commits en rama aparte | **3 commits en main, sin push** (`4c12b0a` sitio, `9250b3e` setup del equipo, `6d4fdb4` graphify) | 2026-10-02 |
| D-002 | Clon anidado `Crisur-Polarizados/` (repos Git casi vacíos) | Moverlo fuera · dejarlo · borrarlo | **Moverlo fuera** → `Desktop\Crisur-Polarizados-clon-viejo` | 2026-10-02 |
| D-003 | Proyecto dentro de OneDrive | Mover a `C:\Proyectos\` · dejarlo en OneDrive | **Mover a `C:\Proyectos\Crisur-Polarizados`** (los parches de config siguen hasta que se decida sacarlos) | 2026-10-02 |
| D-004 | Copia vieja en OneDrive y cambios sin commitear | — (instrucción explícita del usuario) | **Commitear todo lo necesario y borrar la copia vieja** | 2026-10-03 |

## 8. Specs
| Spec | Estado | Fase |
|---|---|---|
| — | | |

## Aprobación
- [ ] Aprobado por el usuario · Fecha:
