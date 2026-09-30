import {
  AdditiveBlending,
  BackSide,
  DoubleSide,
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  type BufferGeometry,
  type Material,
  type Object3D,
  type Texture,
  type WebGLRenderTarget,
  type WebGLRenderer,
} from 'three';

/** Mismos valores que tokens.css (--color-bg, --color-brand-red): la escena se funde con la página. */
export const PAGE_BACKGROUND = '#0c0f13';
export const BRAND_RED = '#e3262b';
export const WARM_INTERIOR = '#ffb46b';

/**
 * `studio`: estudio de fotografía de autos (softboxes en tira que dibujan líneas de luz en las curvas).
 * `dusk`: cielo de hora azul (lo que reflejan los espejados de casas y negocios).
 */
export type StudioMood = 'studio' | 'dusk';

function createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (context === null) throw new Error('Canvas 2D context unavailable for procedural textures.');
  return [canvas, context];
}

function toTexture(canvas: HTMLCanvasElement): Texture {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Degradé radial (centro opaco → borde transparente): sombras de contacto y charcos de luz. */
export function createFalloffTexture(): Texture {
  const size = 128;
  const [canvas, context] = createCanvas(size, size);
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.45, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return toTexture(canvas);
}

/** Cielo vertical: arriba grafito azulado, horizonte frío y claro, abajo casi negro. */
function createSkyTexture(mood: StudioMood): Texture {
  const [canvas, context] = createCanvas(4, 256);
  const gradient = context.createLinearGradient(0, 0, 0, 256);
  if (mood === 'dusk') {
    gradient.addColorStop(0, '#1e2836');
    gradient.addColorStop(0.38, '#4f637b');
    gradient.addColorStop(0.49, '#c3d1df');
    gradient.addColorStop(0.53, '#3b4046');
    gradient.addColorStop(1, '#0b0d10');
  } else {
    gradient.addColorStop(0, '#07080a');
    gradient.addColorStop(0.47, '#1a2029');
    gradient.addColorStop(0.5, '#3e4a57');
    gradient.addColorStop(0.53, '#111418');
    gradient.addColorStop(1, '#050607');
  }
  context.fillStyle = gradient;
  context.fillRect(0, 0, 4, 256);
  return toTexture(canvas);
}

type Panel = readonly [width: number, height: number, x: number, y: number, z: number, rotationX: number, rotationY: number, color: Color];

/**
 * Entorno para reflejos (PMREM). No se ve directamente: es lo que reflejan la pintura, el cromo y los vidrios.
 * Las tiras blancas dibujan líneas de luz sobre las curvas; la tira roja baja firma los reflejos con el color de marca.
 */
export function createEnvironment(renderer: WebGLRenderer, mood: StudioMood): WebGLRenderTarget {
  const scene = new Scene();
  const disposables: (BufferGeometry | Material | Texture)[] = [];

  const skyTexture = createSkyTexture(mood);
  const skyGeometry = new SphereGeometry(30, 32, 16);
  const skyMaterial = new MeshBasicMaterial({ map: skyTexture, side: BackSide });
  disposables.push(skyTexture, skyGeometry, skyMaterial);
  scene.add(new Mesh(skyGeometry, skyMaterial));

  const white = (intensity: number): Color => new Color(1, 1, 1).multiplyScalar(intensity);
  // Tira roja moderada: sobre la pintura perla un rojo fuerte se lee como mancha, no como reflejo.
  const red = new Color(BRAND_RED).multiplyScalar(1.8);
  const panels: readonly Panel[] =
    mood === 'studio'
      ? [
          [18, 1.2, 0, 11, 0, Math.PI / 2, 0, white(6)],
          [16, 0.7, 0, 10.5, 3.2, Math.PI / 2, 0, white(3)],
          [1.4, 10, -14, 5, 2, 0, Math.PI / 2, white(3.4)],
          [1, 10, 14, 5, -2, 0, -Math.PI / 2, white(2.2)],
          [20, 0.5, 0, 1.4, -14, 0, 0, red],
          [12, 1.2, 0, 4, 14, 0, Math.PI, white(1.2)],
        ]
      : [
          [10, 3, -6, 12, 4, Math.PI / 2, 0, white(2.2)],
          [24, 0.4, 0, 1.2, -16, 0, 0, red.clone().multiplyScalar(0.6)],
          // Enfrente y baja: la franja que los espejados de las fachadas reflejan como una línea roja.
          [24, 0.35, 0, 1.2, 16, 0, Math.PI, red.clone().multiplyScalar(0.5)],
        ];
  for (const [width, height, x, y, z, rotationX, rotationY, color] of panels) {
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({ color, side: DoubleSide });
    disposables.push(geometry, material);
    const panel = new Mesh(geometry, material);
    panel.position.set(x, y, z);
    panel.rotation.set(rotationX, rotationY, 0);
    scene.add(panel);
  }

  const generator = new PMREMGenerator(renderer);
  const target = generator.fromScene(scene, 0.02);
  generator.dispose();
  disposables.forEach((resource) => resource.dispose());
  return target;
}

/** Luz principal fría desde arriba, relleno de cielo y contraluz rojo bajo (la marca como luz). */
export function addStudioLights(scene: Scene, mood: StudioMood): void {
  scene.add(new HemisphereLight('#c9d5e2', '#1a1f26', mood === 'dusk' ? 1.1 : 0.55));

  const key = new DirectionalLight('#f3f6fa', mood === 'dusk' ? 1.7 : 1.8);
  key.position.set(4, 8, 6);
  scene.add(key);

  const coolRim = new DirectionalLight('#9fb4cc', mood === 'dusk' ? 0.8 : 0.45);
  coolRim.position.set(7, 3, -6);
  scene.add(coolRim);

  // Contraluz rojo bajo y de atrás: marca los cantos sin teñir las caras que mira la cámara.
  // Más suave en la hora azul: los techos planos lo reflejan de lleno y se ven rosados.
  const redRim = new DirectionalLight(BRAND_RED, mood === 'dusk' ? 0.4 : 1);
  redRim.position.set(-7, 1.4, -7);
  scene.add(redRim);
}

/** Piso grafito (la niebla lo funde con la página) + charco de luz roja de marca + sombra de contacto bajo el objeto. */
export function addGround(scene: Scene, falloff: Texture, shadow: { width: number; depth: number; opacity: number }): void {
  const floor = new Mesh(new PlaneGeometry(80, 80), new MeshStandardMaterial({ color: '#0d1014', roughness: 0.82, metalness: 0.05 }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const contact = new Mesh(
    new PlaneGeometry(shadow.width, shadow.depth),
    new MeshBasicMaterial({ color: '#000000', alphaMap: falloff, transparent: true, opacity: shadow.opacity, depthWrite: false }),
  );
  contact.rotation.x = -Math.PI / 2;
  // 2 cm sobre el piso: más cerca, el test de profundidad la hace parpadear a la distancia de la cámara.
  contact.position.y = 0.02;
  // Se dibuja después del charco rojo: el objeto queda asentado en el centro de la luz.
  contact.renderOrder = 1;
  scene.add(contact);

  // Como la luz roja detrás de la moneda del inicio. Sin depthWrite, a la misma altura que la sombra no titila.
  const glow = new Mesh(
    new PlaneGeometry(shadow.width * 2.2, shadow.depth * 2.6),
    new MeshBasicMaterial({ color: BRAND_RED, map: falloff, transparent: true, opacity: 0.55, depthWrite: false, blending: AdditiveBlending }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.02;
  scene.add(glow);
}

/** Caja con material: el ladrillo básico de casas y negocios. */
export function addBox(
  parent: Object3D,
  size: readonly [number, number, number],
  position: readonly [number, number, number],
  material: Material,
): Mesh {
  const mesh = new Mesh(new BoxGeometry(...size), material);
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}

/** Libera geometrías, materiales y texturas de un árbol de objetos. */
export function disposeTree(root: Object3D): void {
  const materials = new Set<Material>();
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    (object.geometry as BufferGeometry).dispose();
    const objectMaterials: Material[] = Array.isArray(object.material) ? object.material : [object.material];
    objectMaterials.forEach((material) => materials.add(material));
  });
  materials.forEach((material) => {
    for (const value of Object.values(material)) {
      if (value !== null && typeof value === 'object' && 'isTexture' in value) (value as Texture).dispose();
    }
    material.dispose();
  });
}
