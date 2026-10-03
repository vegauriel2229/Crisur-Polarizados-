# Estándar de código

> **Estándar base propuesto.** No se aplica automáticamente: en la Fase 0 de cada proyecto el usuario decide si lo adopta tal cual o con excepciones (queda registrado en `specs/constitucion.md`). Cualquier punto no adoptado o no cubierto se consulta.

## Nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Archivos y carpetas | kebab-case | `user-card.tsx`, `create-order.ts` |
| Componentes | PascalCase | `UserCard` |
| Funciones y variables | camelCase, verbo para funciones | `getUserById`, `isActive` |
| Constantes globales | UPPER_SNAKE_CASE | `MAX_UPLOAD_MB` |
| Tipos e interfaces | PascalCase, sin prefijo `I` | `Order`, `CreateOrderInput` |
| Booleanos | `is/has/can/should` | `hasAccess` |

Idioma del código: **inglés**. Textos visibles para el usuario final: **español** (centralizados si el sitio es multilenguaje).

## Estructura Next.js (por funcionalidad)

```
src/
├── app/                    # rutas (page.tsx, layout.tsx, loading.tsx, error.tsx)
├── components/
│   ├── ui/                 # shadcn/ui (no editar salvo ajustes de tema)
│   └── shared/             # componentes reutilizables del proyecto
├── features/
│   └── orders/
│       ├── components/
│       ├── actions.ts      # server actions
│       ├── queries.ts      # lecturas a la BD
│       └── schemas.ts      # esquemas Zod
├── lib/                    # utilidades (db.ts, auth.ts, utils.ts)
└── env.ts
```

## Reglas

- Funciones cortas y con una sola responsabilidad (~40 líneas como referencia).
- Validar en los bordes (input del usuario, APIs externas, env). Dentro del sistema, confiar en los tipos.
- Manejo de errores: nunca tragar errores en silencio. Mensaje claro al usuario, detalle técnico al log.
- Server Actions devuelven un resultado tipado: `{ ok: true, data } | { ok: false, error }`.
- Sin números mágicos ni strings repetidos: constantes con nombre.
- Comentarios para explicar el **por qué**, no el qué.
- Imports con alias `@/`.
- Sin código comentado, sin `console.log` de debug, sin `TODO` sin issue asociado en la entrega.
- Reutilizar antes de crear: buscar en el proyecto si ya existe un helper/componente.
- Dependencia nueva = justificar (qué resuelve, tamaño, mantenimiento, alternativa nativa).
