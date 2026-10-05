/** Etiquetas de los botones de WhatsApp (D-006). Las de cada servicio siguen en `ctaLabel` (services.ts). */
const SHORT_LABEL = 'Consultar';
/** Complemento oculto a la vista del "Consultar" (D-027): el nombre accesible empieza con el texto visible. */
const HIDDEN_SUFFIX = 'por WhatsApp';

export const WHATSAPP_CTA_LABELS = {
  /** Header y botón flotante. */
  short: SHORT_LABEL,
  hiddenSuffix: HIDDEN_SUFFIX,
  /** Cuerpo del inicio y 404. */
  general: `${SHORT_LABEL} ${HIDDEN_SUFFIX}`,
} as const;
