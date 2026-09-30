import type { Object3D, Texture } from 'three';
import type { FilmGlass } from './film-glass';

export type Vec3 = readonly [x: number, y: number, z: number];

/**
 * Encuadre de la cámara en un punto del recorrido.
 * `at` = progreso del scroll (0 a 1). `shift` corre el objeto horizontalmente en pantalla
 * (fracción del ancho, + = a la derecha) para dejarle lugar al texto del capítulo.
 */
export interface CameraKeyframe {
  at: number;
  position: Vec3;
  target: Vec3;
  shift?: number;
}

/** Un vidrio con lámina: la espátula lo recorre entero dentro de su tramo del progreso. */
export interface FilmPane {
  glass: FilmGlass;
  window: readonly [start: number, end: number];
}

export type RenderQuality = 'high' | 'low';

export interface SceneContext {
  /** Estudio para reflejos (PMREM); lo comparten todos los materiales. */
  environment: Texture;
  quality: RenderQuality;
}

export interface SceneModel {
  root: Object3D;
  panes: readonly FilmPane[];
  camera: {
    /** Pantallas apaisadas: el texto va al costado del objeto. */
    landscape: readonly CameraKeyframe[];
    /** Pantallas verticales: el objeto arriba, el texto abajo. */
    portrait: readonly CameraKeyframe[];
  };
  /** Efectos propios de la escena (luz interior, grietas) para un progreso dado. Sin asignar objetos: corre en cada frame. */
  update(progress: number): void;
  dispose(): void;
}

export type SceneFactory = (context: SceneContext) => SceneModel;
