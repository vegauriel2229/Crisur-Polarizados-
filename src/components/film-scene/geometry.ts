import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';

export type Curve1D = (x: number) => number;

/**
 * Interpolación cúbica monótona (Fritsch–Carlson) sobre puntos con x creciente.
 * Monótona = sin sobrepicos: los perfiles de carrocería no "ondulan" entre puntos de control.
 */
export function createMonotoneCurve(points: ReadonlyArray<readonly [number, number]>): Curve1D {
  const count = points.length;
  if (count < 2) throw new Error('createMonotoneCurve requires at least 2 points.');
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const secants: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    const dx = xs[i + 1]! - xs[i]!;
    if (dx <= 0) throw new Error('createMonotoneCurve requires strictly increasing x.');
    secants.push((ys[i + 1]! - ys[i]!) / dx);
  }
  const tangents: number[] = [secants[0]!];
  for (let i = 1; i < count - 1; i++) {
    const left = secants[i - 1]!;
    const right = secants[i]!;
    tangents.push(left * right <= 0 ? 0 : (left + right) / 2);
  }
  tangents.push(secants[count - 2]!);
  // Paso de Fritsch–Carlson: limita tangentes para preservar monotonía.
  for (let i = 0; i < count - 1; i++) {
    const secant = secants[i]!;
    if (secant === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i]! / secant;
    const b = tangents[i + 1]! / secant;
    const magnitude = a * a + b * b;
    if (magnitude > 9) {
      const scale = 3 / Math.sqrt(magnitude);
      tangents[i] = scale * a * secant;
      tangents[i + 1] = scale * b * secant;
    }
  }
  return (x: number): number => {
    if (x <= xs[0]!) return ys[0]!;
    if (x >= xs[count - 1]!) return ys[count - 1]!;
    let index = 0;
    while (x > xs[index + 1]!) index++;
    const x0 = xs[index]!;
    const h = xs[index + 1]! - x0;
    const t = (x - x0) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      (2 * t3 - 3 * t2 + 1) * ys[index]! +
      (t3 - 2 * t2 + t) * h * tangents[index]! +
      (-2 * t3 + 3 * t2) * ys[index + 1]! +
      (t3 - t2) * h * tangents[index + 1]!
    );
  };
}

export interface LoftFaceSample {
  x: number;
  /** Coordenadas normalizadas de la sección: cz ∈ [-1, 1] (lado), cy ∈ [-1, 1] (abajo→arriba). */
  cz: number;
  cy: number;
}

export interface LoftProfile {
  xStart: number;
  xEnd: number;
  sections: number;
  ringSegments: number;
  /** Exponente de la superelipse de la sección (2 = elipse, >4 = caja redondeada). */
  exponent: number;
  top: Curve1D;
  bottom: Curve1D;
  halfWidth: Curve1D;
  /** Estrechamiento hacia arriba (tumblehome) y hacia abajo. */
  tumbleHome: number;
  tuckUnder: number;
  materialIndexOf?: (sample: LoftFaceSample) => number;
}

const signedPow = (value: number, exponent: number): number => Math.sign(value) * Math.abs(value) ** exponent;

function sectionPoint(profile: LoftProfile, x: number, cz: number, cy: number, target: Vector3): Vector3 {
  const top = profile.top(x);
  const bottom = Math.min(profile.bottom(x), top);
  const mid = (top + bottom) / 2;
  const halfHeight = (top - bottom) / 2;
  const narrowing = 1 - profile.tumbleHome * Math.max(cy, 0) - profile.tuckUnder * Math.max(-cy, 0) ** 2;
  return target.set(x, mid + cy * halfHeight, cz * profile.halfWidth(x) * narrowing);
}

function sectionX(profile: LoftProfile, index: number): number {
  // Espaciado coseno: más secciones en los extremos, donde la curvatura en planta es mayor.
  const t = (1 - Math.cos((Math.PI * index) / (profile.sections - 1))) / 2;
  return profile.xStart + (profile.xEnd - profile.xStart) * t;
}

/** Superficie cerrada barrida a lo largo de X con secciones superelípticas. Indexada → normales suaves. */
export function createLoftGeometry(profile: LoftProfile): BufferGeometry {
  const { sections, ringSegments, exponent } = profile;
  const positions: number[] = [];
  const ringCz: number[] = [];
  const ringCy: number[] = [];
  const shapePower = 2 / exponent;
  for (let j = 0; j < ringSegments; j++) {
    const theta = (2 * Math.PI * j) / ringSegments;
    ringCz.push(signedPow(Math.cos(theta), shapePower));
    ringCy.push(signedPow(Math.sin(theta), shapePower));
  }
  const point = new Vector3();
  const xs: number[] = [];
  for (let i = 0; i < sections; i++) {
    const x = sectionX(profile, i);
    xs.push(x);
    for (let j = 0; j < ringSegments; j++) {
      sectionPoint(profile, x, ringCz[j]!, ringCy[j]!, point);
      positions.push(point.x, point.y, point.z);
    }
  }

  const buckets = new Map<number, number[]>();
  const vertex = (i: number, j: number): number => i * ringSegments + (j % ringSegments);
  for (let i = 0; i < sections - 1; i++) {
    for (let j = 0; j < ringSegments; j++) {
      const materialIndex =
        profile.materialIndexOf?.({
          x: (xs[i]! + xs[i + 1]!) / 2,
          cz: (ringCz[j]! + ringCz[(j + 1) % ringSegments]!) / 2,
          cy: (ringCy[j]! + ringCy[(j + 1) % ringSegments]!) / 2,
        }) ?? 0;
      const indices = buckets.get(materialIndex) ?? [];
      const a = vertex(i, j);
      const b = vertex(i + 1, j);
      const c = vertex(i + 1, j + 1);
      const d = vertex(i, j + 1);
      indices.push(a, b, c, a, c, d);
      buckets.set(materialIndex, indices);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const allIndices: number[] = [];
  [...buckets.keys()]
    .sort((left, right) => left - right)
    .forEach((materialIndex) => {
      const indices = buckets.get(materialIndex)!;
      geometry.addGroup(allIndices.length, indices.length, materialIndex);
      allIndices.push(...indices);
    });
  geometry.setIndex(allIndices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Punto de la superficie lateral a una altura normalizada `cy`; `side` = +1 / -1. */
export function loftSurfacePoint(profile: LoftProfile, x: number, cy: number, side: 1 | -1): Vector3 {
  const cz = side * (1 - Math.abs(cy) ** profile.exponent) ** (1 / profile.exponent);
  return sectionPoint(profile, x, cz, cy, new Vector3());
}

/** Orientación (yaw) de la normal en planta en `x`, para apoyar piezas sobre la carrocería. */
export function loftYawAt(profile: LoftProfile, x: number, side: 1 | -1): number {
  const delta = 0.002;
  const slope = (profile.halfWidth(x + delta) - profile.halfWidth(x - delta)) / (2 * delta);
  return Math.atan2(-slope, side);
}
