import { Group } from 'three';
import { addBox, addContactShadow, addGlow, addPane, addShrub, addTree, type DioramaContext } from './common';

/*
 * Casa moderna de dos plantas (metros). Fachada principal mirando a +Z.
 * Técnicas visibles: ventanales espejados (reflejan el entorno) y vidrios esmerilados con luz cálida detrás.
 */
const GROUND_TOP = 0.1;
const GROUND_FLOOR = { width: 8, height: 3, depth: 4.6, centerZ: -0.6 } as const;
const GROUND_FRONT_Z = GROUND_FLOOR.centerZ + GROUND_FLOOR.depth / 2;
const UPPER_FLOOR = { width: 5.6, height: 2.6, depth: 4.2, centerX: 1, centerZ: -0.5 } as const;
const UPPER_BASE = GROUND_TOP + GROUND_FLOOR.height + 0.22;
const UPPER_FRONT_Z = UPPER_FLOOR.centerZ + UPPER_FLOOR.depth / 2;

function addGlazingPanels(
  house: Group,
  context: DioramaContext,
  left: number,
  right: number,
  bottom: number,
  top: number,
  frontZ: number,
  panels: number,
): void {
  const { materials } = context;
  const frame = 0.06;
  const width = right - left;
  const height = top - bottom;
  const panelWidth = width / panels;
  for (let i = 0; i < panels; i++) {
    const centerX = left + panelWidth * (i + 0.5);
    addPane(house, [panelWidth - frame, height - frame], [centerX, bottom + height / 2, frontZ + 0.02], materials.mirrorGlass);
  }
  addBox(house, [width + frame, frame, 0.1], [left + width / 2, top, frontZ + 0.03], materials.anodized);
  addBox(house, [width + frame, frame, 0.1], [left + width / 2, bottom, frontZ + 0.03], materials.anodized);
  for (let i = 0; i <= panels; i++) {
    addBox(house, [frame, height, 0.1], [left + panelWidth * i, bottom + height / 2, frontZ + 0.03], materials.anodized);
  }
}

/** Vidrio esmerilado con un panel cálido detrás: la transmisión rugosa difunde la luz interior. */
function addFrostedWindow(
  house: Group,
  context: DioramaContext,
  centerX: number,
  bottom: number,
  size: readonly [number, number],
  frontZ: number,
): void {
  const { materials } = context;
  const [width, height] = size;
  const centerY = bottom + height / 2;
  addPane(house, [width, height], [centerX, centerY, frontZ + 0.006], materials.warmLight);
  addPane(house, [width, height], [centerX, centerY, frontZ + 0.03], materials.frostedGlass);
  addBox(house, [width + 0.08, 0.05, 0.1], [centerX, bottom + height, frontZ + 0.04], materials.anodized);
  addBox(house, [width + 0.08, 0.05, 0.1], [centerX, bottom, frontZ + 0.04], materials.anodized);
  addBox(house, [0.05, height, 0.1], [centerX - width / 2, centerY, frontZ + 0.04], materials.anodized);
  addBox(house, [0.05, height, 0.1], [centerX + width / 2, centerY, frontZ + 0.04], materials.anodized);
}

function addVolumes(house: Group, context: DioramaContext): void {
  const { materials } = context;
  addBox(
    house,
    [GROUND_FLOOR.width, GROUND_FLOOR.height, GROUND_FLOOR.depth],
    [0, GROUND_TOP + GROUND_FLOOR.height / 2, GROUND_FLOOR.centerZ],
    materials.concrete,
  );
  addBox(house, [8.5, 0.22, 5.1], [0, GROUND_TOP + GROUND_FLOOR.height + 0.11, -0.5], materials.darkCladding);
  addBox(house, [8.3, 0.03, 0.05], [0, GROUND_TOP + GROUND_FLOOR.height - 0.01, 2.02], materials.warmLight, { castShadow: false });

  addBox(
    house,
    [UPPER_FLOOR.width, UPPER_FLOOR.height, UPPER_FLOOR.depth],
    [UPPER_FLOOR.centerX, UPPER_BASE + UPPER_FLOOR.height / 2, UPPER_FLOOR.centerZ],
    materials.concrete,
  );
  addBox(house, [1.3, UPPER_FLOOR.height, 0.08], [-1.15, UPPER_BASE + UPPER_FLOOR.height / 2, UPPER_FRONT_Z + 0.04], materials.wood);
  addBox(house, [6, 0.18, 4.6], [UPPER_FLOOR.centerX, UPPER_BASE + UPPER_FLOOR.height + 0.09, UPPER_FLOOR.centerZ], materials.darkCladding);
  addBox(house, [5.8, 0.03, 0.05], [UPPER_FLOOR.centerX, UPPER_BASE + UPPER_FLOOR.height - 0.01, UPPER_FRONT_Z + 0.26], materials.warmLight, {
    castShadow: false,
  });
}

function addOpenings(house: Group, context: DioramaContext): void {
  const { materials } = context;
  // Planta baja: ventanal espejado de piso a techo.
  addGlazingPanels(house, context, -3.6, 0.6, GROUND_TOP + 0.15, GROUND_TOP + 2.75, GROUND_FRONT_Z, 3);
  // Planta alta: ventana corrida espejada.
  addGlazingPanels(house, context, -0.35, 3.45, UPPER_BASE + 0.7, UPPER_BASE + 2.05, UPPER_FRONT_Z, 2);

  // Puerta de madera con paño esmerilado vertical.
  addBox(house, [1.05, 2.45, 0.08], [1.7, GROUND_TOP + 1.225, GROUND_FRONT_Z + 0.04], materials.wood);
  addFrostedWindow(house, context, 1.45, GROUND_TOP + 0.35, [0.28, 1.8], GROUND_FRONT_Z + 0.081);
  addBox(house, [0.03, 0.5, 0.05], [2.05, GROUND_TOP + 1.2, GROUND_FRONT_Z + 0.12], materials.chrome);

  // Ventana alta esmerilada (baño / escalera).
  addFrostedWindow(house, context, 3.15, GROUND_TOP + 0.7, [0.75, 2], GROUND_FRONT_Z);
  addGlow(house, context, '#ffcf9a', 1.6, [3.15, GROUND_TOP + 1.7, GROUND_FRONT_Z + 0.4], 0.18);
}

function addGarden(house: Group, context: DioramaContext): void {
  const { materials } = context;
  addBox(house, [9.4, GROUND_TOP, 6.6], [0, GROUND_TOP / 2, 0], materials.lawn);
  addBox(house, [1.2, 0.03, 1.3], [1.7, GROUND_TOP + 0.015, 2.35], materials.paving);
  addBox(house, [1.2, 0.03, 0.55], [1.7, GROUND_TOP + 0.015, 3.0], materials.paving);
  addBox(house, [4.4, 0.35, 0.3], [-2.4, GROUND_TOP + 0.175, 2.75], materials.stoneDark);
  addShrub(house, context, 0.42, [-3.8, GROUND_TOP, 2.2]);
  addShrub(house, context, 0.34, [-0.8, GROUND_TOP, 2.25]);
  addShrub(house, context, 0.3, [3.9, GROUND_TOP, 2.4]);
  addTree(house, context, 3.2, [-4.25, GROUND_TOP, 2.55]);
}

export function createHouse(context: DioramaContext): Group {
  const house = new Group();
  addGarden(house, context);
  addVolumes(house, context);
  addOpenings(house, context);
  addContactShadow(house, context, 10.4, 7.6, 0.002, 0.55);
  return house;
}
