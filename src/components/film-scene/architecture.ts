import {
  BoxGeometry,
  CanvasTexture,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  type Material,
  type Object3D,
  type Texture,
} from 'three';
import { createFilmGlass, type FilmGlass, type FilmKind } from './film-glass';
import { WARM_INTERIOR } from './studio';

/** Rectángulo en el plano de una fachada (x a lo ancho, y en altura), en metros. */
export interface Rect {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

export const WALL_THICKNESS = 0.22;

export function createArchitectureMaterials() {
  return {
    // Microcemento grafito: el mismo mundo oscuro de la página, con textura mínima de luz.
    // Hormigón claro: la fachada se recorta contra el fondo oscuro de la página (pedido del cliente, 2026-09-30).
    wall: new MeshStandardMaterial({ color: '#8b9299', roughness: 0.9, metalness: 0.02 }),
    wallLight: new MeshStandardMaterial({ color: '#a7adb3', roughness: 0.85, metalness: 0.02 }),
    slab: new MeshStandardMaterial({ color: '#3a4048', roughness: 0.6, metalness: 0.2 }),
    frame: new MeshStandardMaterial({ color: '#0d0f12', roughness: 0.35, metalness: 0.6 }),
    chrome: new MeshStandardMaterial({ color: '#dfe3e8', metalness: 1, roughness: 0.12 }),
    // Interior visto por el vidrio limpio: cálido y emisivo, así se lee desde afuera de noche.
    interiorWall: new MeshStandardMaterial({ color: '#3a2c20', emissive: WARM_INTERIOR, emissiveIntensity: 0.4, roughness: 0.95 }),
    interiorFloor: new MeshStandardMaterial({ color: '#2a211a', emissive: WARM_INTERIOR, emissiveIntensity: 0.08, roughness: 0.8 }),
    furniture: new MeshStandardMaterial({ color: '#1a1512', emissive: WARM_INTERIOR, emissiveIntensity: 0.05, roughness: 0.9 }),
    lamp: new MeshStandardMaterial({ color: '#000000', emissive: '#ffd2a0', emissiveIntensity: 2.2 }),
    ledStrip: new MeshStandardMaterial({ color: '#000000', emissive: '#f4f7fb', emissiveIntensity: 1.6 }),
  };
}
export type ArchitectureMaterials = ReturnType<typeof createArchitectureMaterials>;

export function addBox(parent: Object3D, size: readonly [number, number, number], center: readonly [number, number, number], material: Material): Mesh {
  const mesh = new Mesh(new BoxGeometry(...size), material);
  mesh.position.set(...center);
  parent.add(mesh);
  return mesh;
}

/**
 * Pared con aberturas reales (no un vidrio pegado sobre una caja): se parte en una grilla por
 * los bordes de cada abertura y se construye cada celda que no cae dentro de ninguna.
 * La pared vive en el plano z = `z` (cara exterior) y crece hacia -z.
 */
export function addWallWithOpenings(parent: Object3D, bounds: Rect, z: number, openings: readonly Rect[], material: Material): void {
  const xs = [...new Set([bounds.x0, bounds.x1, ...openings.flatMap((o) => [o.x0, o.x1])])].sort((a, b) => a - b);
  const ys = [...new Set([bounds.y0, bounds.y1, ...openings.flatMap((o) => [o.y0, o.y1])])].sort((a, b) => a - b);
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      const x0 = xs[i] ?? 0;
      const x1 = xs[i + 1] ?? 0;
      const y0 = ys[j] ?? 0;
      const y1 = ys[j + 1] ?? 0;
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2;
      const isOpening = openings.some((o) => cx > o.x0 && cx < o.x1 && cy > o.y0 && cy < o.y1);
      if (isOpening || x1 - x0 < 1e-4 || y1 - y0 < 1e-4) continue;
      addBox(parent, [x1 - x0, y1 - y0, WALL_THICKNESS], [cx, cy, z - WALL_THICKNESS / 2], material);
    }
  }
}

export interface GlassOptions {
  kind: FilmKind;
  /** Parantes verticales que dividen el paño (posiciones x). */
  mullions?: readonly number[];
  /** Hacia dónde avanza la espátula: por defecto de izquierda a derecha. */
  sweep?: 'right' | 'left';
}

/**
 * Vidrio en una abertura + marco de aluminio. El vidrio queda retirado dentro del vano
 * (sombra de profundidad) y la espátula lo recorre de un borde al otro.
 */
export function addGlazing(parent: Object3D, opening: Rect, z: number, materials: ArchitectureMaterials, options: GlassOptions): FilmGlass {
  const width = opening.x1 - opening.x0;
  const height = opening.y1 - opening.y0;
  const glassZ = z - WALL_THICKNESS * 0.45;
  // u = 0 en el borde donde arranca la espátula: hacia la izquierda se proyecta sobre -x (de x1 a x0).
  const glass = createFilmGlass(
    options.kind,
    options.sweep === 'left'
      ? { direction: [-1, 0, 0], from: -opening.x1, to: -opening.x0 }
      : { direction: [1, 0, 0], from: opening.x0, to: opening.x1 },
  );
  const pane = new Mesh(new PlaneGeometry(width, height), glass.material);
  pane.position.set((opening.x0 + opening.x1) / 2, (opening.y0 + opening.y1) / 2, glassZ);
  // El eje de la lámina usa coordenadas locales: el paño se ubica con position, así que se corrige el origen.
  pane.geometry.translate(pane.position.x, 0, 0);
  pane.position.x = 0;
  parent.add(pane);

  const bar = 0.05;
  const depth = 0.08;
  const frameZ = glassZ + 0.02;
  addBox(parent, [width + bar, bar, depth], [(opening.x0 + opening.x1) / 2, opening.y0 + bar / 2, frameZ], materials.frame);
  addBox(parent, [width + bar, bar, depth], [(opening.x0 + opening.x1) / 2, opening.y1 - bar / 2, frameZ], materials.frame);
  // Los verticales van ENTRE los horizontales: si se superponen en las esquinas, sus caras coinciden y titilan.
  const innerHeight = height - bar * 2;
  addBox(parent, [bar, innerHeight, depth], [opening.x0 + bar / 2, (opening.y0 + opening.y1) / 2, frameZ], materials.frame);
  addBox(parent, [bar, innerHeight, depth], [opening.x1 - bar / 2, (opening.y0 + opening.y1) / 2, frameZ], materials.frame);
  for (const x of options.mullions ?? []) addBox(parent, [bar * 0.8, innerHeight, depth * 0.9], [x, (opening.y0 + opening.y1) / 2, frameZ], materials.frame);
  return glass;
}

/** Fondo cálido de un ambiente: lo que se ve por la ventana antes de la lámina. */
export function addRoom(parent: Object3D, bounds: Rect, zFront: number, depth: number, materials: ArchitectureMaterials): void {
  const width = bounds.x1 - bounds.x0 - WALL_THICKNESS * 2;
  const height = bounds.y1 - bounds.y0;
  const cx = (bounds.x0 + bounds.x1) / 2;
  const back = new Mesh(new PlaneGeometry(width, height), materials.interiorWall);
  back.position.set(cx, bounds.y0 + height / 2, zFront - depth);
  parent.add(back);
  // Piso y techo interiores separados 6–10 cm de losas y zócalos: a 1 cm se pelean con ellos y titilan.
  const floor = new Mesh(new PlaneGeometry(width, depth), materials.interiorFloor);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(cx, bounds.y0 + 0.1, zFront - depth / 2);
  parent.add(floor);
  const ceiling = new Mesh(new PlaneGeometry(width, depth), materials.furniture);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(cx, bounds.y1 - 0.06, zFront - depth / 2);
  parent.add(ceiling);
}

/** PRNG determinístico: la grieta es idéntica en cada carga. */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Grieta de vidrio laminado (máscara): radios quebrados desde el punto de impacto y anillos
 * cortados. Con lámina de seguridad el vidrio se raja pero se queda en su lugar.
 */
export function createCrackTexture(aspect: number, impact: { u: number; v: number }, seed = 7): Texture {
  const height = 512;
  const width = Math.round(height * aspect);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (context === null) throw new Error('Canvas 2D context unavailable for the crack texture.');
  const random = createRandom(seed);
  const cx = impact.u * width;
  const cy = (1 - impact.v) * height;
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = '#fff';
  context.lineCap = 'round';

  const rays = 16;
  const reach = Math.max(width, height) * 0.62;
  for (let i = 0; i < rays; i++) {
    let angle = (i / rays) * Math.PI * 2 + random() * 0.3;
    let x = cx;
    let y = cy;
    let travelled = 0;
    const length = reach * (0.45 + random() * 0.55);
    context.lineWidth = 1.3;
    context.beginPath();
    context.moveTo(x, y);
    while (travelled < length) {
      const step = 14 + random() * 26;
      angle += (random() - 0.5) * 0.5;
      x += Math.cos(angle) * step;
      y += Math.sin(angle) * step;
      travelled += step;
      context.lineTo(x, y);
    }
    context.stroke();
  }
  for (let ring = 1; ring <= 4; ring++) {
    const radius = ring * (reach * 0.11) * (0.8 + random() * 0.4);
    context.lineWidth = 0.9;
    for (let i = 0; i < rays; i++) {
      if (random() < 0.35) continue;
      const start = (i / rays) * Math.PI * 2;
      const end = ((i + 1) / rays) * Math.PI * 2;
      context.beginPath();
      context.moveTo(cx + Math.cos(start) * radius, cy + Math.sin(start) * radius * 0.92);
      context.lineTo(cx + Math.cos(end) * radius * (0.94 + random() * 0.1), cy + Math.sin(end) * radius * 0.9);
      context.stroke();
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

/** Plano con la grieta, justo delante del vidrio; se muestra con `opacity`. */
export function addCrack(parent: Object3D, opening: Rect, z: number, impact: { u: number; v: number }): MeshBasicMaterial {
  const width = opening.x1 - opening.x0;
  const height = opening.y1 - opening.y0;
  const material = new MeshBasicMaterial({
    color: new Color('#e6edf4'),
    alphaMap: createCrackTexture(width / height, impact),
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const plane = new Mesh(new PlaneGeometry(width, height), material);
  plane.position.set((opening.x0 + opening.x1) / 2, (opening.y0 + opening.y1) / 2, z - WALL_THICKNESS * 0.45 + 0.006);
  parent.add(plane);
  return material;
}
