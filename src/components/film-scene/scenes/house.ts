import { CylinderGeometry, Group, Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { addBox, addGlazing, addRoom, addWallWithOpenings, createArchitectureMaterials, WALL_THICKNESS, type Rect } from '../architecture';
import type { CameraKeyframe, FilmPane, SceneFactory, SceneModel } from '../types';

export const mood = 'dusk';
export const shadow = { width: 12, depth: 8.5, opacity: 0.75 };

/*
 * Casa moderna de dos plantas (metros; frente hacia +Z). Planta baja ancha con el ventanal
 * del living; planta alta en voladizo con una ventana corrida. Espejado en los paños grandes,
 * esmerilado en baños.
 */
const GROUND: Rect = { x0: -4.2, x1: 3.0, y0: 0, y1: 3.0 };
const GROUND_Z = 2.0;
const GROUND_BACK = -3.0;
const UPPER: Rect = { x0: -2.0, x1: 4.4, y0: 3.0, y1: 5.9 };
const UPPER_Z = 2.6;
const UPPER_BACK = -2.6;

const LIVING_WINDOW: Rect = { x0: -3.9, x1: -0.5, y0: 0.18, y1: 2.66 };
const DOOR: Rect = { x0: 0.25, x1: 1.25, y0: 0, y1: 2.45 };
const SIDELIGHT: Rect = { x0: 1.45, x1: 1.8, y0: 0.18, y1: 2.45 };
const GROUND_BATH: Rect = { x0: 2.15, x1: 2.75, y0: 1.55, y1: 2.45 };
const UPPER_WINDOW: Rect = { x0: -1.6, x1: 3.0, y0: 3.75, y1: 5.15 };
const UPPER_BATH: Rect = { x0: 3.35, x1: 4.05, y0: 4.25, y1: 5.15 };

/** Caja de una planta: paredes laterales, fondo, losa superior y frente con aberturas. */
function addVolume(house: Group, bounds: Rect, front: number, back: number, openings: readonly Rect[], materials: ReturnType<typeof createArchitectureMaterials>, wall = materials.wall): void {
  const width = bounds.x1 - bounds.x0;
  const height = bounds.y1 - bounds.y0;
  const depth = front - back;
  const cx = (bounds.x0 + bounds.x1) / 2;
  const cy = (bounds.y0 + bounds.y1) / 2;
  const cz = (front + back) / 2;
  addWallWithOpenings(house, bounds, front, openings, wall);
  addBox(house, [width, height, WALL_THICKNESS], [cx, cy, back + WALL_THICKNESS / 2], wall);
  // Laterales entre el frente y el fondo (no encima): en las esquinas las caras coincidirían y titilarían.
  const sideDepth = depth - WALL_THICKNESS * 2;
  addBox(house, [WALL_THICKNESS, height, sideDepth], [bounds.x0 + WALL_THICKNESS / 2, cy, cz], wall);
  addBox(house, [WALL_THICKNESS, height, sideDepth], [bounds.x1 - WALL_THICKNESS / 2, cy, cz], wall);
  // Losa con alero: el filo más oscuro dibuja la línea horizontal típica de la arquitectura moderna.
  addBox(house, [width + 0.4, 0.2, depth + 0.4], [cx, bounds.y1 + 0.1, cz], materials.slab);
}

const LANDSCAPE: readonly CameraKeyframe[] = [
  { at: 0, position: [12.5, 2.6, 19.5], target: [0.3, 1.5, 0], shift: 0.07 },
  { at: 0.2, position: [-1.4, 1.9, 11.5], target: [-1.4, 1.8, 0], shift: 0.2 },
  { at: 0.4, position: [0.4, 3.0, 13.5], target: [0.4, 3.0, 0], shift: -0.19 },
  { at: 0.6, position: [-9.5, 1.3, 11], target: [-0.6, 2.8, 0], shift: 0.17 },
  { at: 0.8, position: [12.5, 8.6, 15.5], target: [0.4, 2.6, 0], shift: -0.17 },
  { at: 1, position: [11, 2.6, 13.5], target: [0.3, 2.5, 0] },
];
const PORTRAIT: readonly CameraKeyframe[] = [
  { at: 0, position: [13, 3, 20], target: [0.2, 2.8, 0] },
  { at: 0.2, position: [-1.6, 2.2, 15], target: [-1.6, 2.2, 0] },
  { at: 0.4, position: [0.4, 3.4, 18], target: [0.4, 3.2, 0] },
  { at: 0.6, position: [-12.5, 1.6, 14], target: [-0.6, 3, 0] },
  { at: 0.8, position: [13, 10, 16], target: [0.4, 2.8, 0] },
  { at: 1, position: [14, 3, 18], target: [0.3, 2.8, 0] },
];

// Espátula: ventanal del living, ventana corrida de arriba, y después los baños (esmerilado).
const FILM_WINDOWS = {
  living: [0.27, 0.39],
  upper: [0.35, 0.47],
  groundBath: [0.47, 0.53],
  sidelight: [0.5, 0.56],
  upperBath: [0.53, 0.59],
} as const;

export const createScene: SceneFactory = (): SceneModel => {
  const materials = createArchitectureMaterials();
  const house = new Group();

  // Zócalo: ancla la casa al piso con un plano un poco más claro que el suelo.
  addBox(house, [10.4, 0.08, 7.6], [0.1, 0.04, -0.3], materials.slab);

  addVolume(house, GROUND, GROUND_Z, GROUND_BACK, [LIVING_WINDOW, DOOR, SIDELIGHT, GROUND_BATH], materials);
  addVolume(house, UPPER, UPPER_Z, UPPER_BACK, [UPPER_WINDOW, UPPER_BATH], materials, materials.wallLight);
  // Fondo del voladizo: la planta alta sobresale adelante y a la derecha de la baja.
  // 2 cm más grande que la planta: con la misma medida, sus caras coinciden con las paredes y titilan.
  addBox(house, [UPPER.x1 - UPPER.x0 + 0.04, 0.2, UPPER_Z - UPPER_BACK + 0.04], [(UPPER.x0 + UPPER.x1) / 2, UPPER.y0, (UPPER_Z + UPPER_BACK) / 2], materials.slab);

  addRoom(house, { x0: GROUND.x0, x1: 0.1, y0: GROUND.y0, y1: GROUND.y1 }, GROUND_Z - WALL_THICKNESS, 3.6, materials);
  addRoom(house, { x0: UPPER.x0, x1: UPPER.x1, y0: UPPER.y0 + 0.2, y1: UPPER.y1 }, UPPER_Z - WALL_THICKNESS, 3.8, materials);

  // Living: sillón y lámpara de pie recortados contra la pared cálida del fondo.
  const sofaSeat = new Mesh(new RoundedBoxGeometry(2.2, 0.42, 0.9, 3, 0.08), materials.furniture);
  sofaSeat.position.set(-2.3, 0.25, 0.1);
  house.add(sofaSeat);
  const sofaBack = new Mesh(new RoundedBoxGeometry(2.2, 0.5, 0.22, 3, 0.08), materials.furniture);
  sofaBack.position.set(-2.3, 0.62, -0.28);
  house.add(sofaBack);
  const lampPole = new Mesh(new CylinderGeometry(0.02, 0.02, 1.5, 8), materials.frame);
  lampPole.position.set(-0.95, 0.75, -0.2);
  house.add(lampPole);
  const lampShade = new Mesh(new CylinderGeometry(0.16, 0.24, 0.3, 20, 1, true), materials.lamp);
  lampShade.position.set(-0.95, 1.58, -0.2);
  house.add(lampShade);
  // Arriba: estante con luz de acento y una lámpara colgante.
  addBox(house, [2.4, 0.06, 0.35], [0.6, 4.35, -0.8], materials.furniture);
  addBox(house, [2.3, 0.02, 0.02], [0.6, 4.31, -0.65], materials.lamp);
  const pendant = new Mesh(new CylinderGeometry(0.05, 0.22, 0.22, 20, 1, true), materials.lamp);
  pendant.position.set(-0.6, 5.2, 0.4);
  house.add(pendant);

  // Puerta de entrada maciza con manija cromada vertical.
  // Un poco más chica que el vano: con la misma medida, sus bordes titilan contra la pared.
  addBox(house, [DOOR.x1 - DOOR.x0 - 0.02, DOOR.y1 - DOOR.y0 - 0.01, 0.06], [(DOOR.x0 + DOOR.x1) / 2, (DOOR.y0 + DOOR.y1) / 2, GROUND_Z - 0.12], materials.slab);
  addBox(house, [0.03, 0.7, 0.04], [DOOR.x1 - 0.14, 1.1, GROUND_Z - 0.07], materials.chrome);

  const living = addGlazing(house, LIVING_WINDOW, GROUND_Z, materials, { kind: 'mirror', mullions: [-2.77, -1.63] });
  const upper = addGlazing(house, UPPER_WINDOW, UPPER_Z, materials, { kind: 'mirror', mullions: [-0.07, 1.47] });
  const groundBath = addGlazing(house, GROUND_BATH, GROUND_Z, materials, { kind: 'frost' });
  const sidelight = addGlazing(house, SIDELIGHT, GROUND_Z, materials, { kind: 'frost' });
  const upperBath = addGlazing(house, UPPER_BATH, UPPER_Z, materials, { kind: 'frost' });
  // El esmerilado deja pasar la luz del interior: brilla suave, pero no se ve nada.
  for (const frosted of [groundBath, sidelight, upperBath]) frosted.setBacklight(1);

  const panes: FilmPane[] = [
    { glass: living, window: FILM_WINDOWS.living },
    { glass: upper, window: FILM_WINDOWS.upper },
    { glass: groundBath, window: FILM_WINDOWS.groundBath },
    { glass: sidelight, window: FILM_WINDOWS.sidelight },
    { glass: upperBath, window: FILM_WINDOWS.upperBath },
  ];

  return {
    root: house,
    panes,
    camera: { landscape: LANDSCAPE, portrait: PORTRAIT },
    update() {},
    dispose() {},
  };
};
