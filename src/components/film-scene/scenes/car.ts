import {
  AdditiveBlending,
  CircleGeometry,
  Color,
  CylinderGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  TorusGeometry,
  Vector2,
  type Material,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { spanProgress } from '../camera-path';
import { createFilmGlass } from '../film-glass';
import { createLoftGeometry, createMonotoneCurve, loftSurfacePoint, loftYawAt, type LoftProfile } from '../geometry';
import { createFalloffTexture, WARM_INTERIOR } from '../studio';
import type { CameraKeyframe, FilmPane, SceneFactory, SceneModel } from '../types';

export const mood = 'studio';
export const shadow = { width: 5.6, depth: 2.6, opacity: 0.9 };

/*
 * Sedán de tres volúmenes (medidas en metros, frente hacia +X, lado derecho hacia +Z):
 * largo 4,38 · ancho 1,72 · alto 1,52 · entre ejes 2,52.
 */
const HALF_LENGTH = 2.19;
const HALF_WIDTH = 0.86;
const WHEEL_RADIUS = 0.31;
const FRONT_AXLE_X = 1.33;
const REAR_AXLE_X = -1.19;
const ARCH_RADIUS = 0.41;
const TRACK_HALF = 0.745;

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

const BODY = { paint: 0, grille: 1, trim: 2 } as const;

const bodyProfile = (sections: number): LoftProfile => ({
  xStart: -HALF_LENGTH,
  xEnd: HALF_LENGTH,
  sections,
  ringSegments: 64,
  exponent: 5,
  top: BODY_TOP,
  bottom: (x) => Math.max(BODY_BASE(x), archCut(x, FRONT_AXLE_X), archCut(x, REAR_AXLE_X)),
  halfWidth: (x) => HALF_WIDTH * Math.max(0, 1 - Math.abs(x / HALF_LENGTH) ** 8) ** 0.125,
  tumbleHome: 0.06,
  tuckUnder: 0.08,
  materialIndexOf: ({ x, cz, cy }) => {
    if (x > 2.1 && Math.abs(cz) < 0.55 && cy > -0.25 && cy < 0.42) return BODY.grille;
    if (Math.abs(x) > 1.95 && cy < -0.72) return BODY.trim;
    if (cy < -0.93) return BODY.trim;
    return BODY.paint;
  },
});

const CABIN_X_START = -1.28;
const CABIN_X_END = 1.08;
/** Grupos de material del habitáculo: cada vidrio con lámina es un material propio (su espátula avanza sola). */
const CABIN = { windshield: 0, paint: 1, pillar: 2, chrome: 3, frontSide: 4, rearSide: 5, rearGlass: 6 } as const;

const cabinProfile = (sections: number): LoftProfile => ({
  xStart: CABIN_X_START,
  xEnd: CABIN_X_END,
  sections,
  ringSegments: 64,
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
  materialIndexOf: ({ x, cz, cy }) => {
    if (cy > 0.78 && x > -0.62 && x < 0.45) return CABIN.paint;
    if (x > 0.4 && Math.abs(cz) > 0.9) return CABIN.paint;
    if (x < -0.6 && Math.abs(cz) > 0.82 && cy > -0.6) return CABIN.paint;
    if (x > -0.14 && x < -0.04 && Math.abs(cz) > 0.6 && cy <= 0.78) return CABIN.pillar;
    if (Math.abs(cz) > 0.9 && cy > -0.7 && cy < -0.6) return CABIN.chrome;
    if (x >= 0.4) return CABIN.windshield;
    if (x <= -0.6) return CABIN.rearGlass;
    return x > -0.09 ? CABIN.frontSide : CABIN.rearSide;
  },
});

function createMaterials() {
  return {
    // Blanco perla: contra un auto claro, la lámina oscura se lee de un vistazo (pedido del cliente, 2026-09-30).
    paint: new MeshPhysicalMaterial({
      color: '#d9dde2',
      metalness: 0.35,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1.4,
    }),
    blackGloss: new MeshPhysicalMaterial({ color: '#0b0d10', metalness: 0.2, roughness: 0.16, clearcoat: 1 }),
    plasticBlack: new MeshStandardMaterial({ color: '#131518', roughness: 0.66 }),
    chrome: new MeshStandardMaterial({ color: '#e1e5ea', metalness: 1, roughness: 0.1 }),
    // Llantas pulidas: el brillo de las ruedas acompaña a la pintura clara.
    alloy: new MeshStandardMaterial({ color: '#c9ced4', metalness: 1, roughness: 0.16 }),
    rubber: new MeshStandardMaterial({ color: '#121315', roughness: 0.9 }),
    headlight: new MeshStandardMaterial({ color: '#0f1318', emissive: '#dfe8f5', emissiveIntensity: 0.85, metalness: 0.4, roughness: 0.14 }),
    // Faroles traseros encendidos: rojo saturado (no el rojo de marca, que con el tono mapeado se vuelve rosado).
    taillight: new MeshStandardMaterial({ color: '#3a0406', emissive: '#ff0a12', emissiveIntensity: 0.95, roughness: 0.18 }),
    // Tapizado: la luz cálida (el sol que entra por el vidrio limpio) es emisiva, así no tiñe la carrocería.
    fabric: new MeshStandardMaterial({ color: '#2e2621', emissive: WARM_INTERIOR, emissiveIntensity: 0, roughness: 0.92 }),
    dash: new MeshStandardMaterial({ color: '#15181c', emissive: WARM_INTERIOR, emissiveIntensity: 0, roughness: 0.8 }),
  };
}
type CarMaterials = ReturnType<typeof createMaterials>;

function createWheel(materials: CarMaterials, spokeGeometry: RoundedBoxGeometry): Group {
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
  ].map(([radius = 0, axial = 0]) => new Vector2(radius, axial));
  const tire = new Mesh(new LatheGeometry(tireProfile, 48), materials.rubber);
  tire.rotation.x = Math.PI / 2;
  wheel.add(tire);

  const barrel = new Mesh(new CylinderGeometry(0.215, 0.215, 0.17, 36, 1, true), materials.alloy);
  barrel.rotation.x = Math.PI / 2;
  wheel.add(barrel);

  const face = new Mesh(new CircleGeometry(0.212, 36), materials.plasticBlack);
  face.position.z = 0.06;
  wheel.add(face);

  for (let index = 0; index < 5; index++) {
    for (const offset of [-0.09, 0.09]) {
      const spoke = new Mesh(spokeGeometry, materials.alloy);
      const angle = (index / 5) * Math.PI * 2 + offset;
      spoke.position.set(Math.sin(angle) * 0.115, Math.cos(angle) * 0.115, 0.1);
      spoke.rotation.z = -angle;
      wheel.add(spoke);
    }
  }
  const hub = new Mesh(new CylinderGeometry(0.045, 0.05, 0.03, 20), materials.chrome);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.11;
  wheel.add(hub);
  return wheel;
}

function addWheelWell(car: Group, axleX: number, material: Material): void {
  const liner = new Mesh(
    new CylinderGeometry(ARCH_RADIUS - 0.01, ARCH_RADIUS - 0.01, HALF_WIDTH * 2 - 0.06, 24, 1, true, Math.PI / 2, Math.PI),
    material,
  );
  liner.rotation.x = Math.PI / 2;
  liner.position.set(axleX, WHEEL_RADIUS, 0);
  car.add(liner);
}

function placeOnBody(profile: LoftProfile, object: Mesh, x: number, cy: number, side: 1 | -1, outset = 0): void {
  const point = loftSurfacePoint(profile, x, cy, side);
  const yaw = loftYawAt(profile, x, side);
  object.position.set(point.x + Math.sin(yaw) * outset, point.y, point.z + Math.cos(yaw) * outset);
  object.rotation.y = yaw;
}

function addBox(parent: Group, size: readonly [number, number, number], position: readonly [number, number, number], material: Material, radius = 0.03): Mesh {
  const mesh = new Mesh(new RoundedBoxGeometry(size[0], size[1], size[2], 2, radius), material);
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}

/** Tablero, volante y asientos: lo que se ve por el vidrio limpio y la lámina oculta. */
function addInterior(car: Group, materials: CarMaterials): void {
  addBox(car, [0.34, 0.2, 1.36], [0.74, 0.93, 0], materials.dash, 0.05);
  const wheel = new Mesh(new TorusGeometry(0.17, 0.024, 10, 36), materials.dash);
  wheel.position.set(0.5, 1.02, -0.36);
  wheel.rotation.y = Math.PI / 2;
  wheel.rotation.x = 0.35;
  car.add(wheel);

  for (const side of [1, -1] as const) {
    const z = side * 0.37;
    addBox(car, [0.48, 0.16, 0.44], [0.12, 0.62, z], materials.fabric, 0.05);
    const back = addBox(car, [0.13, 0.56, 0.44], [-0.14, 0.95, z], materials.fabric, 0.06);
    back.rotation.z = 0.14;
    addBox(car, [0.1, 0.15, 0.26], [-0.19, 1.3, z], materials.fabric, 0.05);
  }
  // Asiento trasero dentro del perfil del habitáculo: el techo baja rápido hacia la luneta.
  addBox(car, [0.5, 0.16, 1.16], [-0.58, 0.62, 0], materials.fabric, 0.05);
  const bench = addBox(car, [0.13, 0.5, 1.16], [-0.84, 0.92, 0], materials.fabric, 0.06);
  bench.rotation.z = 0.18;
  for (const side of [1, -1] as const) addBox(car, [0.1, 0.14, 0.24], [-0.88, 1.23, side * 0.36], materials.fabric, 0.05);
}

// Recorrido de 6 capítulos: portada 0 · vidrio original 0.2 · la lámina 0.4 · privacidad 0.6 · confort 0.8 · cierre 1.
const LANDSCAPE: readonly CameraKeyframe[] = [
  { at: 0, position: [5.9, 1.2, 6.8], target: [0.1, 0.34, 0], shift: 0.05 },
  { at: 0.2, position: [0.3, 1.35, 8.8], target: [0, 0.78, 0], shift: 0.19 },
  { at: 0.4, position: [-0.5, 1.3, 8.2], target: [-0.2, 0.82, 0], shift: -0.19 },
  { at: 0.6, position: [-7.4, 2.0, 5.6], target: [-0.4, 0.68, 0], shift: 0.17 },
  { at: 0.8, position: [5.6, 5.2, 6.2], target: [0, 0.45, 0], shift: -0.17 },
  { at: 1, position: [6.8, 1.4, 5.2], target: [0.3, 0.3, 0] },
];
const PORTRAIT: readonly CameraKeyframe[] = [
  { at: 0, position: [8.6, 2.2, 10.2], target: [0.1, 0.55, 0] },
  { at: 0.2, position: [0.3, 1.6, 12.4], target: [0, 0.7, 0] },
  { at: 0.4, position: [-0.5, 1.6, 12], target: [-0.2, 0.7, 0] },
  { at: 0.6, position: [-10, 2.6, 7.6], target: [-0.4, 0.6, 0] },
  { at: 0.8, position: [7, 7.4, 8.2], target: [0, 0.4, 0] },
  { at: 1, position: [9.2, 2, 8.4], target: [0.2, 0.5, 0] },
];

/** Tramos de la espátula: laterales traseras, laterales delanteras y luneta (la cámara ya está girando hacia atrás). */
const FILM_WINDOWS = {
  rearSide: [0.27, 0.36],
  frontSide: [0.35, 0.45],
  rearGlass: [0.47, 0.57],
} as const;

export const createScene: SceneFactory = ({ quality }): SceneModel => {
  const materials = createMaterials();
  const sections = quality === 'high' ? 150 : 90;
  const car = new Group();

  const body = bodyProfile(sections);
  car.add(new Mesh(createLoftGeometry(body), [materials.paint, materials.blackGloss, materials.plasticBlack]));

  // El parabrisas no lleva lámina (queda limpio, como en la calle): usa el vidrio sin tramo asignado.
  const windshield = createFilmGlass('tint', { direction: [1, 0, 0], from: 0.4, to: 1.08 });
  const frontSide = createFilmGlass('tint', { direction: [1, 0, 0], from: -0.08, to: 0.42 });
  const rearSide = createFilmGlass('tint', { direction: [1, 0, 0], from: -0.64, to: -0.12 });
  const rearGlass = createFilmGlass('tint', { direction: [0, 0, 1], from: -0.72, to: 0.72 });
  car.add(
    new Mesh(createLoftGeometry(cabinProfile(Math.round(sections * 0.8))), [
      windshield.material,
      materials.paint,
      materials.blackGloss,
      materials.chrome,
      frontSide.material,
      rearSide.material,
      rearGlass.material,
    ]),
  );

  addInterior(car, materials);
  addWheelWell(car, FRONT_AXLE_X, materials.plasticBlack);
  addWheelWell(car, REAR_AXLE_X, materials.plasticBlack);

  const spokeGeometry = new RoundedBoxGeometry(0.03, 0.17, 0.025, 2, 0.008);
  const wheelPositions: ReadonlyArray<readonly [number, 1 | -1, number]> = [
    [FRONT_AXLE_X, 1, 0.2],
    [FRONT_AXLE_X, -1, 0.2],
    [REAR_AXLE_X, 1, 0],
    [REAR_AXLE_X, -1, 0],
  ];
  for (const [x, side, steer] of wheelPositions) {
    const wheel = createWheel(materials, spokeGeometry);
    wheel.position.set(x, WHEEL_RADIUS, side * TRACK_HALF);
    wheel.scale.z = side;
    wheel.rotation.y = steer;
    car.add(wheel);
  }

  for (const side of [1, -1] as const) {
    const headlight = new Mesh(new RoundedBoxGeometry(0.34, 0.055, 0.05, 3, 0.018), materials.headlight);
    placeOnBody(body, headlight, 2.07, 0.55, side, -0.012);
    car.add(headlight);

    addBox(car, [0.12, 0.11, 0.22], [0.95, 1.03, side * 0.86], materials.paint, 0.035);
    addBox(car, [0.1, 0.04, 0.12], [0.99, 0.99, side * 0.74], materials.blackGloss, 0.012);

    for (const handleX of [0.3, -0.45]) {
      const handle = new Mesh(new RoundedBoxGeometry(0.16, 0.025, 0.02, 2, 0.008), materials.chrome);
      placeOnBody(body, handle, handleX, 0.55, side, 0.004);
      car.add(handle);
    }
  }

  addBox(car, [0.04, 0.075, 0.66], [HALF_LENGTH - 0.012, 0.635, 0], materials.blackGloss, 0.015);
  addBox(car, [0.02, 0.012, 0.64], [HALF_LENGTH + 0.008, 0.635, 0], materials.chrome, 0.005);
  addBox(car, [0.04, 0.13, 0.98], [HALF_LENGTH - 0.02, 0.33, 0], materials.plasticBlack, 0.02);

  /*
   * Resplandor de las luces: un plano aditivo delante de cada óptica que mira hacia donde alumbra
   * (los traseros hacia atrás, los delanteros hacia adelante). Plano y no sprite: de frente, un
   * resplandor trasero no debe asomar flotando al costado del auto.
   */
  const glowTexture = createFalloffTexture();
  const glowGeometry = new PlaneGeometry(1, 1);
  const addGlow = (color: string, opacity: number, facing: 1 | -1, position: readonly [number, number, number], scale: readonly [number, number]): void => {
    const material = new MeshBasicMaterial({ map: glowTexture, color, transparent: true, opacity, depthWrite: false, blending: AdditiveBlending });
    const glow = new Mesh(glowGeometry, material);
    glow.rotation.y = (facing * Math.PI) / 2;
    glow.position.set(...position);
    glow.scale.set(scale[0], scale[1], 1);
    car.add(glow);
  };

  // Faroles traseros: dos ópticas en las esquinas de la cola, unidas por una tira de luz roja.
  for (const side of [1, -1] as const) {
    addBox(car, [0.06, 0.1, 0.3], [-2.172, 0.625, side * 0.46], materials.taillight, 0.025);
    addGlow('#d0121a', 0.5, -1, [-2.215, 0.625, side * 0.46], [0.5, 0.2]);
    const headlightPoint = loftSurfacePoint(body, 2.07, 0.55, side);
    addGlow('#e4edf8', 0.3, 1, [headlightPoint.x + 0.06, headlightPoint.y, headlightPoint.z], [0.42, 0.16]);
    // Moldura cromada entre las ruedas: una línea de brillo que recorre el costado.
    const rocker = loftSurfacePoint(body, 0, -0.55, side);
    addBox(car, [1.62, 0.02, 0.014], [0.07, rocker.y, rocker.z + side * 0.006], materials.chrome, 0.006);
  }
  addBox(car, [0.03, 0.024, 0.62], [-2.198, 0.66, 0], materials.taillight, 0.01);

  const panes: FilmPane[] = [
    { glass: rearSide, window: FILM_WINDOWS.rearSide },
    { glass: frontSide, window: FILM_WINDOWS.frontSide },
    { glass: rearGlass, window: FILM_WINDOWS.rearGlass },
  ];
  const warm = new Color(WARM_INTERIOR);

  return {
    root: car,
    panes,
    camera: { landscape: LANDSCAPE, portrait: PORTRAIT },
    update(progress) {
      // El sol que entra por el vidrio limpio: el interior brilla cálido hasta que la lámina lo tapa.
      const shade = spanProgress(progress, FILM_WINDOWS.rearSide[0], FILM_WINDOWS.rearGlass[1]);
      const sunlight = 0.2 * (1 - shade) + 0.02;
      materials.fabric.emissiveIntensity = sunlight;
      materials.dash.emissiveIntensity = sunlight * 0.6;
      materials.fabric.emissive.copy(warm);
    },
    dispose() {
      spokeGeometry.dispose();
      // Geometría y materiales de los resplandores los libera el motor (son meshes de la escena); la textura, acá.
      glowTexture.dispose();
    },
  };
};
