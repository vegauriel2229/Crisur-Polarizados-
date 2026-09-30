import {
  ACESFilmicToneMapping,
  Color,
  Fog,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { sampleCameraPath, spanProgress, type CameraPose } from './camera-path';
import { addGround, addStudioLights, createEnvironment, createFalloffTexture, disposeTree, PAGE_BACKGROUND, type StudioMood } from './studio';
import type { CameraKeyframe, RenderQuality, SceneFactory } from './types';

export class WebGLUnavailableError extends Error {
  constructor() {
    super('WebGL is not available in this browser.');
    this.name = 'WebGLUnavailableError';
  }
}

export interface FilmSceneOptions {
  mood: StudioMood;
  quality: RenderQuality;
  /** Sin movimiento de cámara (prefers-reduced-motion): la lámina igual sigue al scroll. */
  reducedMotion: boolean;
  shadow: { width: number; depth: number; opacity: number };
  /** El navegador descartó el contexto WebGL (poca memoria, driver): el componente vuelve a la ilustración. */
  onContextLost(): void;
}

export interface FilmScene {
  /** Progreso objetivo (0 a 1); la escena lo alcanza con amortiguación. */
  setProgress(progress: number): void;
  dispose(): void;
}

/** Cuánto tarda la escena en alcanzar al scroll: más alto = más pegada, más bajo = más "pesada". */
const DAMPING_PER_SECOND = 5.5;
const SETTLED = 0.0004;
const PORTRAIT_BELOW_ASPECT = 0.9;
/** En vertical el texto ocupa la mitad de abajo: el encuadre sube el objeto esta fracción del alto. */
const PORTRAIT_LIFT = 0.17;

function assertWebGL(): void {
  const probe = document.createElement('canvas');
  const context = probe.getContext('webgl2') ?? probe.getContext('webgl');
  if (context === null) throw new WebGLUnavailableError();
}

/**
 * Motor común de las tres escenas: renderer, estudio, cámara que sigue el recorrido y
 * láminas que avanzan con el progreso. Renderiza solo cuando algo cambia (scroll o resize).
 * @throws {WebGLUnavailableError}
 */
export function createFilmScene(canvas: HTMLCanvasElement, factory: SceneFactory, options: FilmSceneOptions): FilmScene {
  assertWebGL();
  const renderer = new WebGLRenderer({ canvas, antialias: options.quality === 'high', powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, options.quality === 'high' ? 2 : 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = options.mood === 'dusk' ? 1.2 : 1.1;

  const scene = new Scene();
  scene.background = new Color(PAGE_BACKGROUND);
  // El auto se mira de cerca; casas y negocios desde la vereda de enfrente: la niebla arranca más lejos.
  scene.fog = options.mood === 'studio' ? new Fog(PAGE_BACKGROUND, 10, 28) : new Fog(PAGE_BACKGROUND, 20, 52);
  const environment = createEnvironment(renderer, options.mood);
  scene.environment = environment.texture;
  addStudioLights(scene, options.mood);
  const falloff = createFalloffTexture();
  addGround(scene, falloff, options.shadow);

  const model = factory({ environment: environment.texture, quality: options.quality });
  scene.add(model.root);

  // near 0,5 m (la cámara nunca está más cerca de 5 m): más precisión de profundidad, sin superficies que titilen.
  const camera = new PerspectiveCamera(30, 1, 0.5, 90);
  const pose: CameraPose = { position: new Vector3(), target: new Vector3(), shift: 0 };
  let portrait = false;
  // Movimiento reducido: la cámara queda quieta en el encuadre de portada.
  const still = (path: readonly CameraKeyframe[]): readonly CameraKeyframe[] => (options.reducedMotion ? path.slice(0, 1) : path);
  const paths = { landscape: still(model.camera.landscape), portrait: still(model.camera.portrait) };

  function applyCamera(shift: number): void {
    // filmOffset corre el encuadre sin cambiar la perspectiva: el objeto se desplaza `shift` del ancho.
    const offset = -shift * camera.getFilmWidth() * 2 * camera.aspect * Math.tan((camera.fov * Math.PI) / 360);
    if (offset !== camera.filmOffset) {
      camera.filmOffset = offset;
      camera.updateProjectionMatrix();
    }
  }

  function apply(progress: number): void {
    sampleCameraPath(portrait ? paths.portrait : paths.landscape, progress, pose);
    camera.position.copy(pose.position);
    camera.lookAt(pose.target);
    applyCamera(portrait ? 0 : pose.shift);
    for (const pane of model.panes) pane.glass.setCoverage(spanProgress(progress, pane.window[0], pane.window[1]));
    model.update(progress);
  }

  let target = 0;
  let current = 0;
  let frame = 0;
  let lastTime = 0;

  function tick(now: number): void {
    frame = 0;
    // Tope de 0,1 s: en equipos lentos la escena alcanza al scroll igual, sin saltos gigantes tras una pausa.
    const deltaSeconds = lastTime === 0 ? 1 / 60 : Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    current += (target - current) * (1 - Math.exp(-deltaSeconds * DAMPING_PER_SECOND));
    if (Math.abs(target - current) < SETTLED) current = target;
    apply(current);
    renderer.render(scene, camera);
    if (current === target) lastTime = 0;
    else frame = requestAnimationFrame(tick);
  }

  function requestRender(): void {
    if (frame === 0) frame = requestAnimationFrame(tick);
  }

  function resize(): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    portrait = camera.aspect < PORTRAIT_BELOW_ASPECT;
    camera.fov = portrait ? 50 : 30;
    if (portrait) camera.setViewOffset(width, height, 0, height * PORTRAIT_LIFT, width, height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    requestRender();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  function handleContextLost(event: Event): void {
    event.preventDefault();
    options.onContextLost();
  }
  canvas.addEventListener('webglcontextlost', handleContextLost);

  return {
    setProgress(progress) {
      target = Math.min(1, Math.max(0, progress));
      requestRender();
    },
    dispose() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      model.dispose();
      disposeTree(scene);
      falloff.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
