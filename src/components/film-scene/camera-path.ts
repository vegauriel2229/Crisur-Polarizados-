import type { Vector3 } from 'three';
import type { CameraKeyframe } from './types';

export interface CameraPose {
  position: Vector3;
  target: Vector3;
  shift: number;
}

/** Arranca y frena suave en cada encuadre: la cámara "se apoya" en cada capítulo mientras se lee. */
const smootherStep = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);

/**
 * Escribe en `out` el encuadre para `progress` (0 a 1). Corre en cada frame: no crea objetos.
 * @throws {Error} si el recorrido está vacío.
 */
export function sampleCameraPath(path: readonly CameraKeyframe[], progress: number, out: CameraPose): void {
  const first = path[0];
  if (first === undefined) throw new Error('Camera path needs at least one keyframe.');
  let from = first;
  let to = first;
  for (let index = 1; index < path.length; index++) {
    const keyframe = path[index];
    if (keyframe === undefined) break;
    to = keyframe;
    if (progress <= keyframe.at) break;
    from = keyframe;
  }
  const span = to.at - from.at;
  const t = span <= 0 ? 0 : smootherStep(Math.min(1, Math.max(0, (progress - from.at) / span)));
  out.position.set(
    from.position[0] + (to.position[0] - from.position[0]) * t,
    from.position[1] + (to.position[1] - from.position[1]) * t,
    from.position[2] + (to.position[2] - from.position[2]) * t,
  );
  out.target.set(
    from.target[0] + (to.target[0] - from.target[0]) * t,
    from.target[1] + (to.target[1] - from.target[1]) * t,
    from.target[2] + (to.target[2] - from.target[2]) * t,
  );
  const fromShift = from.shift ?? 0;
  out.shift = fromShift + ((to.shift ?? 0) - fromShift) * t;
}

/** Progreso local de un tramo [start, end] del recorrido, recortado a 0–1. */
export function spanProgress(progress: number, start: number, end: number): number {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}
