import {
  AdditiveBlending,
  BoxGeometry,
  Color,
  CylinderGeometry,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  type ColorRepresentation,
  type Material,
  type Object3D,
  type Texture,
} from 'three';
import { BRAND_RED, type MaterialLibrary } from '../materials';

export interface SharedTextures {
  falloff: Texture;
  ringGlow: Texture;
}

export interface DioramaContext {
  materials: MaterialLibrary;
  textures: SharedTextures;
}

interface BoxOptions {
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export function addBox(
  parent: Object3D,
  size: readonly [number, number, number],
  position: readonly [number, number, number],
  material: Material,
  { castShadow = true, receiveShadow = true }: BoxOptions = {},
): Mesh {
  const mesh = new Mesh(new BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  parent.add(mesh);
  return mesh;
}

/** Plano vertical (normal +Z) — vidrios, láminas y paneles luminosos. */
export function addPane(
  parent: Object3D,
  size: readonly [number, number],
  position: readonly [number, number, number],
  material: Material,
): Mesh {
  const mesh = new Mesh(new PlaneGeometry(...size), material);
  mesh.position.set(...position);
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

/** Sombra de contacto suave (oclusión) bajo cada objeto; ancla visualmente el modelo al piso. */
export function addContactShadow(
  parent: Object3D,
  context: DioramaContext,
  width: number,
  depth: number,
  y: number,
  opacity = 0.7,
): Mesh {
  const mesh = new Mesh(
    new PlaneGeometry(width, depth),
    new MeshBasicMaterial({
      color: '#000000',
      map: context.textures.falloff,
      transparent: true,
      opacity,
      depthWrite: false,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  mesh.renderOrder = 1;
  parent.add(mesh);
  return mesh;
}

/** Halo aditivo para luces (faros, LED): simula el bloom sin post-procesado. */
export function addGlow(
  parent: Object3D,
  context: DioramaContext,
  color: ColorRepresentation,
  scale: number,
  position: readonly [number, number, number],
  opacity = 0.6,
): Sprite {
  const sprite = new Sprite(
    new SpriteMaterial({
      map: context.textures.falloff,
      color,
      blending: AdditiveBlending,
      transparent: true,
      opacity,
      depthWrite: false,
    }),
  );
  sprite.scale.setScalar(scale);
  sprite.position.set(...position);
  parent.add(sprite);
  return sprite;
}

export function addShrub(parent: Object3D, context: DioramaContext, radius: number, position: readonly [number, number, number]): void {
  const lobes: ReadonlyArray<readonly [number, number, number, number]> = [
    [0, 0.75, 0, 1],
    [0.55, 0.6, 0.15, 0.72],
    [-0.5, 0.58, -0.1, 0.7],
    [0.1, 0.55, 0.5, 0.66],
  ];
  lobes.forEach(([x, y, z, scale], index) => {
    const mesh = new Mesh(
      new IcosahedronGeometry(radius * scale, 1),
      index % 2 === 0 ? context.materials.foliage : context.materials.foliageLight,
    );
    mesh.position.set(position[0] + x * radius, position[1] + y * radius, position[2] + z * radius);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
  });
}

export function addTree(parent: Object3D, context: DioramaContext, height: number, position: readonly [number, number, number]): void {
  const trunk = new Mesh(new CylinderGeometry(height * 0.03, height * 0.045, height * 0.55, 8), context.materials.bark);
  trunk.position.set(position[0], position[1] + height * 0.275, position[2]);
  trunk.castShadow = true;
  parent.add(trunk);
  addShrub(parent, context, height * 0.28, [position[0], position[1] + height * 0.42, position[2]]);
}

export interface Pedestal {
  group: Group;
  /** Material propio del anillo LED: su intensidad se anima por pedestal. */
  ledMaterial: MeshBasicMaterial;
  floorGlow: MeshBasicMaterial;
  topY: number;
}

export const PEDESTAL_RADIUS = 2.6;

/** Base giratoria del showroom. Anillo LED rojo + anillo blanco interior = eco del logo. */
export function createPedestal(context: DioramaContext): Pedestal {
  const group = new Group();
  const { materials } = context;
  const base = new Mesh(new CylinderGeometry(PEDESTAL_RADIUS, PEDESTAL_RADIUS + 0.08, 0.16, 96), materials.pedestalSide);
  base.position.y = 0.08;
  base.receiveShadow = true;
  group.add(base);

  const top = new Mesh(new CylinderGeometry(PEDESTAL_RADIUS, PEDESTAL_RADIUS, 0.06, 96), materials.pedestalTop);
  top.position.y = 0.19;
  top.receiveShadow = true;
  group.add(top);

  const ledMaterial = new MeshBasicMaterial({ color: new Color(BRAND_RED).multiplyScalar(2.2) });
  const led = new Mesh(new TorusGeometry(PEDESTAL_RADIUS + 0.005, 0.022, 8, 180), ledMaterial);
  led.rotation.x = Math.PI / 2;
  led.position.y = 0.205;
  group.add(led);

  const innerRing = new Mesh(new TorusGeometry(PEDESTAL_RADIUS - 0.16, 0.009, 6, 180), materials.ledWhite);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.222;
  group.add(innerRing);

  const floorGlow = new MeshBasicMaterial({
    color: BRAND_RED,
    map: context.textures.ringGlow,
    blending: AdditiveBlending,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const glow = new Mesh(new PlaneGeometry(PEDESTAL_RADIUS * 3, PEDESTAL_RADIUS * 3), floorGlow);
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.004;
  group.add(glow);

  return { group, ledMaterial, floorGlow, topY: 0.22 };
}
