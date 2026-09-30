import { Group, Mesh, MeshStandardMaterial } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { spanProgress } from '../camera-path';
import { addBox, addCrack, addGlazing, addRoom, addWallWithOpenings, createArchitectureMaterials, WALL_THICKNESS, type Rect } from '../architecture';
import { WARM_INTERIOR } from '../studio';
import type { CameraKeyframe, FilmPane, SceneFactory, SceneModel } from '../types';

export const mood = 'dusk';
export const shadow = { width: 12, depth: 7.5, opacity: 0.75 };

/*
 * Frente comercial de una planta (metros; frente hacia +Z): cartel arriba, vidriera grande con
 * banda esmerilada, puerta de vidrio espejada y ventana de oficina esmerilada.
 */
const FACADE: Rect = { x0: -4.6, x1: 4.6, y0: 0, y1: 4.7 };
const FRONT_Z = 0;
const BACK_Z = -5.4;
const DISPLAY: Rect = { x0: -4.15, x1: 0.95, y0: 0.45, y1: 3.05 };
const FROST_BAND: Rect = { x0: -4.15, x1: 0.95, y0: 1.4, y1: 1.78 };
const DOOR: Rect = { x0: 1.4, x1: 2.75, y0: 0, y1: 2.9 };
const OFFICE: Rect = { x0: 3.15, x1: 4.2, y0: 0.95, y1: 2.7 };
const SIGN: Rect = { x0: -4.3, x1: 4.3, y0: 3.45, y1: 4.35 };

const LANDSCAPE: readonly CameraKeyframe[] = [
  { at: 0, position: [10.5, 2.3, 17], target: [0, 1.4, -0.5], shift: 0.07 },
  { at: 0.2, position: [-1.7, 1.8, 10.5], target: [-1.7, 1.75, 0], shift: 0.2 },
  { at: 0.4, position: [0.4, 2.0, 11.5], target: [0.2, 1.8, 0], shift: -0.19 },
  { at: 0.6, position: [7, 1.7, 8.8], target: [2.4, 1.7, 0], shift: 0.17 },
  { at: 0.8, position: [-4.8, 1.9, 7.6], target: [-2, 1.75, 0], shift: -0.17 },
  { at: 1, position: [9.4, 2.4, 13.5], target: [0, 2.1, -0.5] },
];
const PORTRAIT: readonly CameraKeyframe[] = [
  { at: 0, position: [12, 2.6, 19], target: [0, 2.3, -0.5] },
  { at: 0.2, position: [-1.7, 2.0, 13.5], target: [-1.7, 2.0, 0] },
  { at: 0.4, position: [0.4, 2.2, 16], target: [0.2, 2.0, 0] },
  { at: 0.6, position: [9, 1.9, 12], target: [2.6, 1.9, 0] },
  { at: 0.8, position: [-6, 2.1, 10.5], target: [-1.9, 1.9, 0] },
  { at: 1, position: [13, 2.8, 18], target: [0, 2.3, -0.5] },
];

// Espátula: vidriera (polarizado), puerta (espejado), banda y oficina (esmerilado). Después, el golpe.
const FILM_WINDOWS = {
  display: [0.27, 0.38],
  door: [0.36, 0.44],
  band: [0.46, 0.53],
  office: [0.51, 0.58],
} as const;
const CRACK_WINDOW = [0.7, 0.76] as const;

export const createScene: SceneFactory = (): SceneModel => {
  const materials = createArchitectureMaterials();
  const shop = new Group();

  // Vereda y cordón: ancla el local a la calle.
  addBox(shop, [11.5, 0.14, 2.4], [0, 0.07, 1.2], materials.slab);

  addWallWithOpenings(shop, FACADE, FRONT_Z, [DISPLAY, DOOR, OFFICE], materials.wall);
  const width = FACADE.x1 - FACADE.x0;
  const height = FACADE.y1 - FACADE.y0;
  addBox(shop, [width, height, WALL_THICKNESS], [0, height / 2, BACK_Z + WALL_THICKNESS / 2], materials.wall);
  // Laterales entre el frente y el fondo: superpuestos en las esquinas, sus caras titilarían.
  const sideDepth = FRONT_Z - BACK_Z - WALL_THICKNESS * 2;
  addBox(shop, [WALL_THICKNESS, height, sideDepth], [FACADE.x0 + WALL_THICKNESS / 2, height / 2, (FRONT_Z + BACK_Z) / 2], materials.wall);
  addBox(shop, [WALL_THICKNESS, height, sideDepth], [FACADE.x1 - WALL_THICKNESS / 2, height / 2, (FRONT_Z + BACK_Z) / 2], materials.wall);
  addBox(shop, [width + 0.3, 0.2, FRONT_Z - BACK_Z + 0.3], [0, height + 0.1, (FRONT_Z + BACK_Z) / 2], materials.slab);

  // Cartel sin marca (el local es del cliente, no de Crisur) con una tira de luz debajo.
  addBox(shop, [SIGN.x1 - SIGN.x0, SIGN.y1 - SIGN.y0, 0.12], [0, (SIGN.y0 + SIGN.y1) / 2, FRONT_Z + 0.06], materials.slab);
  addBox(shop, [SIGN.x1 - SIGN.x0 - 0.2, 0.025, 0.03], [0, SIGN.y0 - 0.04, FRONT_Z + 0.1], materials.ledStrip);

  addRoom(shop, { x0: FACADE.x0, x1: FACADE.x1, y0: 0, y1: 3.3 }, FRONT_Z - WALL_THICKNESS, 4.8, materials);

  // Góndolas con mercadería: cajas de tonos cálidos distintos para que se lea "local" a través del vidrio.
  const goods = [
    new MeshStandardMaterial({ color: '#8a6a4a', emissive: WARM_INTERIOR, emissiveIntensity: 0.12, roughness: 0.8 }),
    new MeshStandardMaterial({ color: '#5d6f7d', emissive: WARM_INTERIOR, emissiveIntensity: 0.06, roughness: 0.7 }),
    new MeshStandardMaterial({ color: '#a8a39a', emissive: WARM_INTERIOR, emissiveIntensity: 0.1, roughness: 0.8 }),
  ];
  const itemGeometry = new RoundedBoxGeometry(0.28, 0.34, 0.24, 2, 0.02);
  for (let shelf = 0; shelf < 3; shelf++) {
    const y = 0.75 + shelf * 0.72;
    addBox(shop, [4.4, 0.04, 0.45], [-1.7, y, -3.6], materials.furniture);
    for (let slot = 0; slot < 11; slot++) {
      if ((slot + shelf) % 4 === 3) continue;
      const item = new Mesh(itemGeometry, goods[(slot + shelf * 2) % goods.length]);
      item.position.set(-3.7 + slot * 0.4, y + 0.19, -3.6);
      shop.add(item);
    }
  }
  addBox(shop, [1.8, 1.0, 0.6], [2.4, 0.5, -2.2], materials.furniture);
  for (const x of [-3, -1, 1, 3]) addBox(shop, [1.2, 0.03, 0.18], [x, 3.26, -2], materials.lamp);

  const display = addGlazing(shop, DISPLAY, FRONT_Z, materials, { kind: 'tint', mullions: [-1.6] });
  const band = addGlazing(shop, FROST_BAND, FRONT_Z + 0.004, materials, { kind: 'frost' });
  const door = addGlazing(shop, DOOR, FRONT_Z, materials, { kind: 'mirror', sweep: 'left' });
  const office = addGlazing(shop, OFFICE, FRONT_Z, materials, { kind: 'frost', sweep: 'left' });
  band.setBacklight(1);
  office.setBacklight(1);
  addBox(shop, [0.04, 0.9, 0.05], [DOOR.x0 + 0.16, 1.2, FRONT_Z - 0.05], materials.chrome);

  // Lámina de seguridad: el vidrio se raja pero no cae. Impacto en la mitad baja de la vidriera.
  const crack = addCrack(shop, DISPLAY, FRONT_Z + 0.008, { u: 0.36, v: 0.4 });

  const panes: FilmPane[] = [
    { glass: display, window: FILM_WINDOWS.display },
    { glass: door, window: FILM_WINDOWS.door },
    { glass: band, window: FILM_WINDOWS.band },
    { glass: office, window: FILM_WINDOWS.office },
  ];

  return {
    root: shop,
    panes,
    camera: { landscape: LANDSCAPE, portrait: PORTRAIT },
    update(progress) {
      crack.opacity = 0.9 * spanProgress(progress, CRACK_WINDOW[0], CRACK_WINDOW[1]);
    },
    dispose() {
      itemGeometry.dispose();
      crack.alphaMap?.dispose();
    },
  };
};
