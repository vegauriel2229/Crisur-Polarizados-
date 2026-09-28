import type { ServiceId } from '../../../data/hero-slides';

/** Franja vertical libre (px, relativa al canvas) donde se encuadra el diorama destacado. */
export interface FramingZone {
  top: number;
  bottom: number;
}

export interface ScreenAnchor {
  x: number;
  y: number;
  visible: boolean;
}

/** Por debajo de este ancho (o en vertical) los laterales asoman desde los bordes y las etiquetas no se anclan. */
export const WIDE_LAYOUT_MIN_PX = 1024;

export type AnchorMap = ReadonlyMap<ServiceId, ScreenAnchor>;

export interface ShowroomOptions {
  order: readonly ServiceId[];
  initial: ServiceId;
  reducedMotion: boolean;
  getFramingZone(): FramingZone;
  onSelect(id: ServiceId): void;
  /** Se invoca después de cada frame renderizado con la proyección de cada pedestal. */
  onFrame(anchors: AnchorMap): void;
  /** Primer frame renderizado: el canvas ya puede mostrarse. */
  onReady(): void;
}

export interface Showroom {
  show(id: ServiceId): void;
  /** Vuelve a leer la zona de encuadre (p. ej. si cambió el layout del copy). */
  refreshLayout(): void;
  dispose(): void;
}

export class WebGLUnavailableError extends Error {
  constructor(cause?: unknown) {
    super('WebGL is not available in this browser.', { cause });
    this.name = 'WebGLUnavailableError';
  }
}
