import { animate, scroll } from 'motion';
import type { ServiceId } from '../../data/services';
import type { StudioMood } from '../film-scene/studio';
import type { RenderQuality, SceneFactory } from '../film-scene/types';

interface SceneModule {
  createScene: SceneFactory;
  mood: StudioMood;
  shadow: { width: number; depth: number; opacity: number };
}

// Un chunk por escena: cada página descarga solo su modelo.
const SCENES: Record<ServiceId, () => Promise<SceneModule>> = {
  autos: () => import('../film-scene/scenes/car'),
  hogares: () => import('../film-scene/scenes/house'),
  negocios: () => import('../film-scene/scenes/storefront'),
};

function requireElement<T extends Element>(scope: ParentNode, selector: string): T {
  const element = scope.querySelector<T>(selector);
  if (element === null) throw new Error(`ServiceStory: missing element "${selector}"`);
  return element;
}

function isServiceId(value: string | undefined): value is ServiceId {
  return value !== undefined && value in SCENES;
}

/** Equipos modestos (celulares de gama media) renderizan con menos resolución y geometría. */
function detectQuality(): RenderQuality {
  const cores = navigator.hardwareConcurrency;
  const smallScreen = Math.min(window.screen.width, window.screen.height) < 500;
  return cores <= 4 || smallScreen ? 'low' : 'high';
}

/**
 * Contador de carga (0–100 %). Avanza por etapas reales (motor, modelo, primer cuadro) y
 * anima entre ellas; al terminar se desvanece hacia arriba como en la referencia.
 */
function createLoader(root: HTMLElement): { reach(value: number): void; finish(): void } {
  const loader = root.querySelector<HTMLElement>('[data-loader]');
  const output = root.querySelector<HTMLElement>('[data-loader-value]');
  let shown = 0;
  return {
    reach(value) {
      if (output === null) return;
      animate(shown, value, {
        duration: 0.6,
        ease: 'easeOut',
        onUpdate: (latest) => {
          shown = latest;
          output.textContent = String(Math.round(latest));
        },
      });
    },
    finish() {
      if (loader === null || output === null) return;
      output.textContent = '100';
      loader.dataset['state'] = 'done';
    },
  };
}

function initIndex(root: HTMLElement, chapterCount: number): (progress: number) => void {
  const items = [...root.querySelectorAll<HTMLElement>('[data-index-item]')];
  let active = -1;
  return (progress) => {
    // Capítulos del índice = 1..chapterCount: en la portada (0) no hay ninguno activo; el cierre deja marcado el último.
    const beat = Math.round(progress * (chapterCount + 1));
    const next = beat === 0 ? -1 : Math.min(beat - 1, chapterCount - 1);
    if (next === active) return;
    active = next;
    items.forEach((item, index) => {
      if (index === active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
  };
}

/** Máxima inclinación del portal hacia el puntero (referencia: la ventana que "mira" al mouse). */
const PORTAL_TILT_DEG = { x: 9, y: 12 };

function initPortalTilt(root: HTMLElement): void {
  const portal = root.querySelector<HTMLElement>('[data-portal]');
  const pane = portal?.querySelector<HTMLElement>('.portal-window');
  if (portal === null || portal === undefined || pane === null || pane === undefined) return;
  portal.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const box = portal.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    pane.style.setProperty('--tilt-x', `${(-y * PORTAL_TILT_DEG.x * 2).toFixed(2)}deg`);
    pane.style.setProperty('--tilt-y', `${(x * PORTAL_TILT_DEG.y * 2).toFixed(2)}deg`);
  });
  portal.addEventListener('pointerleave', () => {
    pane.style.setProperty('--tilt-x', '0deg');
    pane.style.setProperty('--tilt-y', '0deg');
  });
}

async function initStory(root: HTMLElement): Promise<void> {
  const serviceId = root.dataset['service'];
  if (!isServiceId(serviceId)) throw new Error(`ServiceStory: unknown service "${serviceId}"`);
  const chapterCount = Number(root.dataset['chapters']);
  const canvas = requireElement<HTMLCanvasElement>(root, '[data-scene-canvas]');
  const track = requireElement<HTMLElement>(root, '[data-track]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) initPortalTilt(root);

  const updateIndex = initIndex(root, chapterCount);
  let latestProgress = 0;
  let sceneProgress: ((progress: number) => void) | null = null;
  // El índice funciona aunque el 3D no cargue; la escena se suma cuando está lista.
  scroll(
    (progress: number) => {
      latestProgress = progress;
      updateIndex(progress);
      sceneProgress?.(progress);
    },
    { target: track, offset: ['start start', 'end end'] },
  );

  const loader = createLoader(root);
  loader.reach(35);
  const [{ createFilmScene, WebGLUnavailableError }, sceneModule] = await Promise.all([import('../film-scene/engine'), SCENES[serviceId]()]);
  loader.reach(80);

  const fallBack = (): void => {
    root.dataset['scene'] = 'fallback';
  };
  try {
    const scene = createFilmScene(canvas, sceneModule.createScene, {
      mood: sceneModule.mood,
      shadow: sceneModule.shadow,
      quality: detectQuality(),
      reducedMotion,
      onContextLost: fallBack,
    });
    sceneProgress = (progress) => scene.setProgress(progress);
    scene.setProgress(latestProgress);
    requestAnimationFrame(() => {
      loader.finish();
      root.dataset['scene'] = 'ready';
    });
  } catch (error) {
    // Sin WebGL queda la ilustración SVG, que ya está en el HTML: no es un error para el visitante.
    if (!(error instanceof WebGLUnavailableError)) throw error;
    loader.finish();
    fallBack();
  }
}

document.querySelectorAll<HTMLElement>('[data-service-story]').forEach((root) => {
  initStory(root).catch((error: unknown) => {
    root.dataset['scene'] = 'fallback';
    console.error(error);
  });
});
