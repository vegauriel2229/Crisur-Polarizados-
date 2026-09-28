import { CylinderGeometry, Group, Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { BRAND_RED } from '../materials';
import { addBox, addContactShadow, addGlow, addPane, addShrub, type DioramaContext } from './common';

/*
 * Frente comercial (metros). Fachada en z = 0 mirando a +Z, vereda adelante.
 * Técnicas visibles: vidriera polarizada (se intuye el interior), banda esmerilada y puerta espejada.
 */
const WIDTH = 6;
const SIDEWALK_TOP = 0.12;
const OPENING_TOP = 3.02;
const GLASS_BOTTOM = 0.37;
const GLASS_Z = -0.06;
const FROST_BAND: readonly [number, number] = [1.2, 1.5];

interface Pane {
  left: number;
  right: number;
}

const VITRINE_PANES: readonly Pane[] = [
  { left: -2.62, right: -1.4 },
  { left: -1.35, right: -0.08 },
  { left: 1.3, right: 2.62 },
];
const DOOR: Pane = { left: 0.02, right: 1.22 };
const MULLION_XS = [-2.65, -1.375, -0.05, 1.26, 2.65];

function addInterior(storefront: Group, context: DioramaContext): void {
  const { materials } = context;
  addPane(storefront, [5.3, OPENING_TOP - SIDEWALK_TOP], [0, (OPENING_TOP + SIDEWALK_TOP) / 2, -0.39], materials.interiorDark);
  addBox(storefront, [5.3, 0.04, 0.4], [0, OPENING_TOP - 0.02, -0.2], materials.interiorDark);
  for (const x of [-1.8, 0, 1.8]) {
    addBox(storefront, [1.2, 0.02, 0.08], [x, OPENING_TOP - 0.05, -0.25], materials.warmLight, { castShadow: false });
  }
  addBox(storefront, [1.6, 0.9, 0.3], [-1.5, SIDEWALK_TOP + 0.45, -0.25], materials.anodized);
  addBox(storefront, [2.2, 0.05, 0.25], [1.6, 1.8, -0.28], materials.anodized);
  addBox(storefront, [2.2, 0.05, 0.25], [1.6, 2.3, -0.28], materials.anodized);
}

function addFrame(storefront: Group, context: DioramaContext): void {
  const { materials } = context;
  addBox(storefront, [5.36, 0.25, 0.12], [0, SIDEWALK_TOP + 0.125, GLASS_Z], materials.anodized);
  addBox(storefront, [5.36, 0.08, 0.12], [0, OPENING_TOP - 0.04, GLASS_Z], materials.anodized);
  addBox(storefront, [1.26, 0.06, 0.1], [(DOOR.left + DOOR.right) / 2, 2.63, GLASS_Z], materials.anodized);
  for (const x of MULLION_XS) {
    addBox(storefront, [0.06, OPENING_TOP - SIDEWALK_TOP, 0.12], [x, (OPENING_TOP + SIDEWALK_TOP) / 2, GLASS_Z], materials.anodized);
  }
}

function addGlazing(storefront: Group, context: DioramaContext): void {
  const { materials } = context;
  const height = OPENING_TOP - 0.08 - GLASS_BOTTOM;
  for (const pane of VITRINE_PANES) {
    const width = pane.right - pane.left;
    const centerX = (pane.left + pane.right) / 2;
    addPane(storefront, [width, height], [centerX, GLASS_BOTTOM + height / 2, GLASS_Z], materials.storefrontTint);
    addPane(storefront, [width, FROST_BAND[1] - FROST_BAND[0]], [centerX, (FROST_BAND[0] + FROST_BAND[1]) / 2, GLASS_Z + 0.004], materials.frostedFilm);
  }
  const doorWidth = DOOR.right - DOOR.left;
  const doorCenter = (DOOR.left + DOOR.right) / 2;
  addPane(storefront, [doorWidth, 2.6 - SIDEWALK_TOP], [doorCenter, (2.6 + SIDEWALK_TOP) / 2, GLASS_Z], materials.mirrorGlass);
  addPane(storefront, [doorWidth, 0.3], [doorCenter, 2.8, GLASS_Z], materials.mirrorGlass);
  addPane(storefront, [doorWidth, FROST_BAND[1] - FROST_BAND[0]], [doorCenter, (FROST_BAND[0] + FROST_BAND[1]) / 2, GLASS_Z + 0.004], materials.frostedFilm);

  const handle = new Mesh(new CylinderGeometry(0.018, 0.018, 0.9, 12), materials.chrome);
  handle.position.set(DOOR.left + 0.18, 1.35, GLASS_Z + 0.08);
  handle.castShadow = true;
  storefront.add(handle);
  for (const y of [0.98, 1.72]) {
    addBox(storefront, [0.02, 0.02, 0.08], [DOOR.left + 0.18, y, GLASS_Z + 0.04], materials.chrome);
  }
}

function addFacade(storefront: Group, context: DioramaContext): void {
  const { materials } = context;
  addBox(storefront, [WIDTH, 4.2, 1.8], [0, SIDEWALK_TOP + 2.1, -1.3], materials.stucco);
  addBox(storefront, [WIDTH, 4.32 - OPENING_TOP, 0.4], [0, (OPENING_TOP + SIDEWALK_TOP + 4.2) / 2, -0.2], materials.stucco);
  for (const x of [-(WIDTH / 2 - 0.175), WIDTH / 2 - 0.175]) {
    addBox(storefront, [0.35, OPENING_TOP - SIDEWALK_TOP, 0.4], [x, (OPENING_TOP + SIDEWALK_TOP) / 2, -0.2], materials.stucco);
  }
  addBox(storefront, [WIDTH + 0.2, 0.14, 2.3], [0, SIDEWALK_TOP + 4.27, -1.1], materials.darkCladding);
  addBox(storefront, [WIDTH, 0.25, 0.44], [0, SIDEWALK_TOP + 0.125, -0.2], materials.stoneDark);

  const sign = new Mesh(new RoundedBoxGeometry(4.8, 0.62, 0.14, 3, 0.03), materials.blackGloss);
  sign.position.set(0, 3.64, 0.07);
  sign.castShadow = true;
  storefront.add(sign);
  addBox(storefront, [4.6, 0.025, 0.03], [0, 3.3, 0.13], materials.ledRed, { castShadow: false });
  addGlow(storefront, context, BRAND_RED, 1.2, [-1.6, 3.28, 0.2], 0.35);
  addGlow(storefront, context, BRAND_RED, 1.2, [1.6, 3.28, 0.2], 0.35);

  for (const x of [-(WIDTH / 2 - 0.175), WIDTH / 2 - 0.175]) {
    addBox(storefront, [0.12, 0.2, 0.1], [x, 2.55, 0.05], materials.anodized);
    addBox(storefront, [0.1, 0.02, 0.08], [x, 2.44, 0.06], materials.warmLight, { castShadow: false });
    addGlow(storefront, context, '#ffcf9a', 0.9, [x, 2.3, 0.15], 0.3);
  }
}

function addStreet(storefront: Group, context: DioramaContext): void {
  const { materials } = context;
  addBox(storefront, [WIDTH + 0.6, SIDEWALK_TOP, 3.2], [0, SIDEWALK_TOP / 2, 0.2], materials.paving);
  addBox(storefront, [WIDTH + 0.6, 0.14, 0.14], [0, 0.07, 1.87], materials.stoneDark);
  for (const x of [-2.35, 2.35]) {
    addBox(storefront, [0.8, 0.45, 0.45], [x, SIDEWALK_TOP + 0.225, 0.62], materials.planter);
    addShrub(storefront, context, 0.38, [x, SIDEWALK_TOP + 0.3, 0.62]);
  }
}

export function createStorefront(context: DioramaContext): Group {
  const storefront = new Group();
  addStreet(storefront, context);
  addFacade(storefront, context);
  addInterior(storefront, context);
  addFrame(storefront, context);
  addGlazing(storefront, context);
  addContactShadow(storefront, context, WIDTH + 1.4, 4.4, 0.002, 0.6);
  return storefront;
}
