import {
  CircleGeometry,
  CylinderGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
  type Material,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createLoftGeometry, createMonotoneCurve, loftSurfacePoint, loftYawAt, type LoftProfile } from '../geometry';
import { BRAND_RED } from '../materials';
import { createPlateTexture } from '../textures';
import { addContactShadow, addGlow, type DioramaContext } from './common';

/*
 * Sedán 0 km con proporciones de Fiat Cronos (medidas en metros):
 * largo 4,36 · ancho 1,73 · alto 1,52 · entre ejes 2,52. Frente hacia +X.
 */
const HALF_LENGTH = 2.19;
const HALF_WIDTH = 0.86;
const WHEEL_RADIUS = 0.31;
const FRONT_AXLE_X = 1.33;
const REAR_AXLE_X = -1.19;
const ARCH_RADIUS = 0.41;
const TRACK_HALF = 0.745;

// Línea de cintura/capó/baúl: capó corto (~1,1 m) y baúl marcado, como un sedán de tres volúmenes.
const BODY_TOP = createMonotoneCurve([
  [-2.19, 0.64],
  [-2.17, 0.86],
  [-2.12, 0.97],
  [-1.98, 1.03],
  [-1.6, 1.05],
  [-1.2, 1.035],
  [-0.4, 0.995],
  [0.6, 0.97],
  [1.02, 0.955],
  [1.4, 0.91],
  [1.8, 0.85],
  [2.05, 0.8],
  [2.16, 0.76],
  [2.19, 0.7],
]);

const BODY_BASE = createMonotoneCurve([
  [-2.19, 0.4],
  [-2.14, 0.3],
  [-1.95, 0.24],
  [-1.7, 0.21],
  [1.8, 0.21],
  [2.05, 0.24],
  [2.16, 0.29],
  [2.19, 0.34],
]);

function archCut(x: number, axleX: number): number {
  const dx = x - axleX;
  return Math.abs(dx) < ARCH_RADIUS ? WHEEL_RADIUS + Math.sqrt(ARCH_RADIUS ** 2 - dx ** 2) : Number.NEGATIVE_INFINITY;
}

const BODY_MATERIAL = { paint: 0, grille: 1, trim: 2 } as const;

const bodyProfile: LoftProfile = {
  xStart: -HALF_LENGTH,
  xEnd: HALF_LENGTH,
  sections: 170,
  ringSegments: 72,
  exponent: 5,
  top: BODY_TOP,
  bottom: (x) => Math.max(BODY_BASE(x), archCut(x, FRONT_AXLE_X), archCut(x, REAR_AXLE_X)),
  // Exponente alto en planta: esquinas redondeadas pero trompa y cola rectas (no en punta).
  halfWidth: (x) => HALF_WIDTH * Math.max(0, 1 - Math.abs(x / HALF_LENGTH) ** 8) ** 0.125,
  tumbleHome: 0.06,
  tuckUnder: 0.08,
  materialIndexOf: ({ x, cz, cy }) => {
    if (x > 2.1 && Math.abs(cz) < 0.55 && cy > -0.25 && cy < 0.42) return BODY_MATERIAL.grille;
    if (Math.abs(x) > 1.95 && cy < -0.72) return BODY_MATERIAL.trim;
    if (cy < -0.93) return BODY_MATERIAL.trim;
    return BODY_MATERIAL.paint;
  },
};

const CABIN_X_START = -1.28;
const CABIN_X_END = 1.08;
const CABIN_MATERIAL = { glass: 0, paint: 1, pillar: 2, chrome: 3 } as const;

const cabinProfile: LoftProfile = {
  xStart: CABIN_X_START,
  xEnd: CABIN_X_END,
  sections: 120,
  ringSegments: 72,
  exponent: 7,
  top: createMonotoneCurve([
    [-1.28, 1.0],
    [-1.1, 1.17],
    [-0.85, 1.37],
    [-0.55, 1.48],
    [-0.2, 1.515],
    [0.2, 1.515],
    [0.42, 1.47],
    [0.66, 1.3],
    [0.9, 1.1],
    [1.08, 0.94],
  ]),
  bottom: (x) => BODY_TOP(x) - 0.1,
  halfWidth: (x) => {
    const t = (x - (CABIN_X_START + CABIN_X_END) / 2) / ((CABIN_X_END - CABIN_X_START) / 2);
    return 0.7 * Math.max(0, 1 - Math.abs(t) ** 10) ** 0.1;
  },
  tumbleHome: 0.24,
  tuckUnder: 0,
  // Pilares y techo pintados; el resto del habitáculo es vidrio polarizado.
  materialIndexOf: ({ x, cz, cy }) => {
    if (cy > 0.78 && x > -0.62 && x < 0.45) return CABIN_MATERIAL.paint;
    if (x > 0.4 && Math.abs(cz) > 0.9) return CABIN_MATERIAL.paint;
    if (x < -0.6 && Math.abs(cz) > 0.82 && cy > -0.6) return CABIN_MATERIAL.paint;
    if (x > -0.14 && x < -0.04 && Math.abs(cz) > 0.6 && cy <= 0.78) return CABIN_MATERIAL.pillar;
    // Moldura cromada sobre la línea de cintura, justo encima de donde el habitáculo entra en la carrocería.
    if (Math.abs(cz) > 0.9 && cy > -0.7 && cy < -0.6) return CABIN_MATERIAL.chrome;
    return CABIN_MATERIAL.glass;
  },
};

function createWheel(context: DioramaContext): Group {
  const { materials } = context;
  const wheel = new Group();
  const tireProfile = [
    [0.215, -0.098],
    [0.285, -0.1],
    [0.303, -0.086],
    [0.31, -0.05],
    [0.31, 0.05],
    [0.303, 0.086],
    [0.285, 0.1],
    [0.215, 0.098],
  ].map(([radius, axial]) => new Vector2(radius, axial));
  const tire = new Mesh(new LatheGeometry(tireProfile, 56), materials.rubber);
  tire.rotation.x = Math.PI / 2;
  tire.castShadow = true;
  wheel.add(tire);

  const barrel = new Mesh(new CylinderGeometry(0.215, 0.215, 0.17, 40, 1, true), materials.alloy);
  barrel.rotation.x = Math.PI / 2;
  wheel.add(barrel);

  const face = new Mesh(new CircleGeometry(0.212, 40), materials.plasticBlack);
  face.position.z = 0.06;
  wheel.add(face);

  const disc = new Mesh(new CylinderGeometry(0.15, 0.15, 0.02, 32), materials.alloy);
  disc.rotation.x = Math.PI / 2;
  disc.position.z = 0.07;
  wheel.add(disc);

  // Caliper rojo: el color de marca aparece también en el auto.
  const caliper = new Mesh(new RoundedBoxGeometry(0.07, 0.12, 0.05, 2, 0.015), materials.taillight);
  caliper.position.set(-0.11, 0.06, 0.085);
  wheel.add(caliper);

  const spokeGeometry = new RoundedBoxGeometry(0.03, 0.17, 0.025, 2, 0.008);
  for (let i = 0; i < 5; i++) {
    for (const offset of [-0.09, 0.09]) {
      const spoke = new Mesh(spokeGeometry, materials.alloy);
      const angle = (i / 5) * Math.PI * 2 + offset;
      spoke.position.set(Math.sin(angle) * 0.115, Math.cos(angle) * 0.115, 0.1);
      spoke.rotation.z = -angle;
      wheel.add(spoke);
    }
  }
  const hub = new Mesh(new CylinderGeometry(0.045, 0.05, 0.03, 24), materials.chrome);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.11;
  wheel.add(hub);
  return wheel;
}

function addWheelWell(car: Group, axleX: number, material: Material): void {
  const liner = new Mesh(new CylinderGeometry(ARCH_RADIUS - 0.01, ARCH_RADIUS - 0.01, HALF_WIDTH * 2 - 0.06, 28, 1, true, Math.PI / 2, Math.PI), material);
  liner.rotation.x = Math.PI / 2;
  liner.position.set(axleX, WHEEL_RADIUS, 0);
  car.add(liner);
}

function placeOnBody(object: Mesh | Group, x: number, cy: number, side: 1 | -1, outset = 0): void {
  const point = loftSurfacePoint(bodyProfile, x, cy, side);
  const yaw = loftYawAt(bodyProfile, x, side);
  object.position.set(point.x + Math.sin(yaw) * outset, point.y, point.z + Math.cos(yaw) * outset);
  object.rotation.y = yaw;
}

function addPlate(car: Group, text: string, x: number, y: number, facing: 1 | -1): void {
  const plateMaterial = new MeshBasicMaterial({ map: createPlateTexture(text) });
  const plate = new Mesh(new PlaneGeometry(0.4, 0.13), plateMaterial);
  plate.position.set(x, y, 0);
  plate.rotation.y = (facing * Math.PI) / 2;
  car.add(plate);
}

export function createCar(context: DioramaContext): Group {
  const { materials } = context;
  const car = new Group();

  const body = new Mesh(createLoftGeometry(bodyProfile), [materials.carPaint, materials.blackGloss, materials.plasticBlack]);
  body.castShadow = true;
  body.receiveShadow = true;
  car.add(body);

  const cabin = new Mesh(createLoftGeometry(cabinProfile), [materials.tintedGlass, materials.carPaint, materials.blackGloss, materials.chrome]);
  cabin.castShadow = true;
  car.add(cabin);

  addWheelWell(car, FRONT_AXLE_X, materials.plasticBlack);
  addWheelWell(car, REAR_AXLE_X, materials.plasticBlack);

  const wheelPositions: ReadonlyArray<readonly [number, 1 | -1, number]> = [
    [FRONT_AXLE_X, 1, 0.22],
    [FRONT_AXLE_X, -1, 0.22],
    [REAR_AXLE_X, 1, 0],
    [REAR_AXLE_X, -1, 0],
  ];
  wheelPositions.forEach(([x, side, steer]) => {
    const wheel = createWheel(context);
    wheel.position.set(x, WHEEL_RADIUS, side * TRACK_HALF);
    wheel.scale.z = side;
    wheel.rotation.y = steer;
    car.add(wheel);
  });

  for (const side of [1, -1] as const) {
    // Piezas apoyadas en la carrocería: eje X local = tangente, eje Z local = normal saliente.
    const headlight = new Mesh(new RoundedBoxGeometry(0.36, 0.08, 0.06, 3, 0.02), materials.headlight);
    placeOnBody(headlight, 2.07, 0.55, side, -0.012);
    car.add(headlight);
    addGlow(car, context, '#cfe0ff', 0.3, [headlight.position.x + 0.1, headlight.position.y, headlight.position.z], 0.22);

    const fogLight = new Mesh(new CircleGeometry(0.045, 20), materials.ledWhite);
    placeOnBody(fogLight, 2.14, -0.45, side, 0.004);
    car.add(fogLight);

    const taillight = new Mesh(new RoundedBoxGeometry(0.34, 0.1, 0.05, 3, 0.02), materials.taillight);
    placeOnBody(taillight, -2.1, 0.55, side, -0.01);
    car.add(taillight);
    addGlow(car, context, BRAND_RED, 0.34, [taillight.position.x - 0.08, taillight.position.y, taillight.position.z], 0.35);

    const mirror = new Mesh(new RoundedBoxGeometry(0.12, 0.11, 0.22, 3, 0.035), materials.carPaint);
    mirror.position.set(0.95, 1.03, side * 0.86);
    mirror.castShadow = true;
    car.add(mirror);
    const mirrorArm = new Mesh(new RoundedBoxGeometry(0.1, 0.04, 0.12, 2, 0.012), materials.blackGloss);
    mirrorArm.position.set(0.99, 0.99, side * 0.74);
    car.add(mirrorArm);

    for (const handleX of [0.3, -0.45]) {
      const handle = new Mesh(new RoundedBoxGeometry(0.16, 0.025, 0.02, 2, 0.008), materials.chrome);
      placeOnBody(handle, handleX, 0.55, side, 0.004);
      car.add(handle);
    }

    // Juntas de puertas: líneas finas oscuras sobre el lateral.
    for (const [lineX, bottomCy] of [
      [0.88, -0.85],
      [-0.09, -0.85],
      [-0.74, -0.85],
    ] as const) {
      const bottom = loftSurfacePoint(bodyProfile, lineX, bottomCy, side);
      const top = loftSurfacePoint(bodyProfile, lineX, 0.86, side);
      const seam = new Mesh(new PlaneGeometry(0.006, top.y - bottom.y), materials.blackGloss);
      seam.position.set(lineX, (top.y + bottom.y) / 2, side * (Math.max(Math.abs(top.z), Math.abs(bottom.z)) + 0.003));
      seam.rotation.y = side === 1 ? 0 : Math.PI;
      car.add(seam);
    }
  }

  // Frente: parrilla superior fina con filete cromado y toma de aire inferior ancha.
  const upperGrille = new Mesh(new RoundedBoxGeometry(0.04, 0.075, 0.66, 2, 0.015), materials.blackGloss);
  upperGrille.position.set(HALF_LENGTH - 0.012, 0.635, 0);
  car.add(upperGrille);
  const grilleTrim = new Mesh(new RoundedBoxGeometry(0.02, 0.012, 0.64, 2, 0.005), materials.chrome);
  grilleTrim.position.set(HALF_LENGTH + 0.008, 0.635, 0);
  car.add(grilleTrim);
  const lowerIntake = new Mesh(new RoundedBoxGeometry(0.04, 0.13, 0.98, 2, 0.02), materials.plasticBlack);
  lowerIntake.position.set(HALF_LENGTH - 0.02, 0.33, 0);
  car.add(lowerIntake);

  addPlate(car, 'AF 026 CR', HALF_LENGTH + 0.004, 0.46, 1);
  addPlate(car, 'AF 026 CR', -HALF_LENGTH - 0.004, 0.68, -1);
  addContactShadow(car, context, 5.2, 2.4, 0.004, 0.85);
  return car;
}
