import type { ServiceId } from '../../data/hero-slides';
import { WIDE_LAYOUT_MIN_PX, WebGLUnavailableError, type AnchorMap, type FramingZone, type Showroom } from './showroom/types';

type Side = 'left' | 'center' | 'right';

interface HeroConfig {
  order: ServiceId[];
  initial: ServiceId;
  whatsappUrls: Record<ServiceId, string>;
  titles: Record<ServiceId, string>;
}

const LABEL_EDGE_MARGIN_PX = 16;
const LABEL_GAP_PX = 14;

function requireElement<T extends Element>(scope: ParentNode, selector: string): T {
  const element = scope.querySelector<T>(selector);
  if (element === null) throw new Error(`ServiceHero: missing element "${selector}"`);
  return element;
}

function readConfig(root: HTMLElement): HeroConfig {
  const raw = root.dataset['config'];
  if (raw === undefined) throw new Error('ServiceHero: missing data-config');
  // Serializado por el propio componente en build time.
  return JSON.parse(raw) as HeroConfig;
}

function initMenu(root: HTMLElement): void {
  const header = requireElement<HTMLElement>(root, '.site-header');
  const burger = requireElement<HTMLButtonElement>(header, '.burger');
  const menu = requireElement<HTMLElement>(header, '.site-nav');

  function setOpen(open: boolean): void {
    header.dataset['open'] = String(open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  setOpen(false);
  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(header.dataset['open'] !== 'true');
  });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !menu.contains(event.target) && !burger.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.dataset['open'] === 'true') {
      setOpen(false);
      burger.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a') !== null) setOpen(false);
  });
}

function initHero(root: HTMLElement): void {
  const config = readConfig(root);
  const canvas = requireElement<HTMLCanvasElement>(root, '.showroom-canvas');
  const zone = requireElement<HTMLElement>(root, '[data-showroom-zone]');
  const controls = requireElement<HTMLElement>(root, '[data-carousel-controls]');
  const cta = requireElement<HTMLAnchorElement>(root, '[data-cta]');
  const live = requireElement<HTMLElement>(root, '[data-live]');
  const variants = root.querySelectorAll<HTMLElement>('[data-variant]');
  const navLinks = root.querySelectorAll<HTMLAnchorElement>('[data-nav-service]');
  const labels = new Map<ServiceId, HTMLButtonElement>(
    config.order.map((id) => [id, requireElement<HTMLButtonElement>(controls, `[data-select="${id}"]`)]),
  );

  let featured = config.initial;
  let showroom: Showroom | null = null;

  function sideOf(id: ServiceId): Side {
    const offset = (config.order.indexOf(id) - config.order.indexOf(featured) + config.order.length) % config.order.length;
    if (offset === 0) return 'center';
    return offset === 1 ? 'right' : 'left';
  }

  function applyState(): void {
    variants.forEach((variant) => variant.classList.toggle('is-active', variant.dataset['variant'] === featured));
    navLinks.forEach((link) => {
      if (link.dataset['navService'] === featured) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    labels.forEach((label, id) => {
      const side = sideOf(id);
      label.dataset['side'] = side;
      label.tabIndex = side === 'center' ? -1 : 0;
      label.setAttribute('aria-hidden', String(side === 'center'));
    });
    cta.href = config.whatsappUrls[featured];
  }

  function show(id: ServiceId, updateHash: boolean): void {
    if (id === featured) return;
    featured = id;
    applyState();
    live.textContent = `Mostrando ${config.titles[id].toLowerCase()}`;
    showroom?.show(id);
    if (updateHash) history.replaceState(null, '', `#${id}`);
  }

  function step(direction: 1 | -1): void {
    const index = config.order.indexOf(featured);
    const next = config.order[(index + direction + config.order.length) % config.order.length];
    if (next !== undefined) show(next, true);
  }

  /** Si la etiqueta enfocada pasa al centro (oculta), el foco sigue en la etiqueta que ocupa ese lado. */
  function keepFocusOnSide(side: Side): void {
    if (side === 'center') return;
    [...labels.values()].find((label) => label.dataset['side'] === side)?.focus();
  }

  labels.forEach((label, id) =>
    label.addEventListener('click', () => {
      const side = sideOf(id);
      show(id, true);
      if (document.activeElement === label) keepFocusOnSide(side);
    }),
  );
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.dataset['navService'] as ServiceId | undefined;
      if (id === undefined) return;
      event.preventDefault();
      show(id, true);
    });
  });
  controls.addEventListener('keydown', (event) => {
    const direction = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (direction === 0) return;
    event.preventDefault();
    step(direction);
    keepFocusOnSide(direction === -1 ? 'left' : 'right');
  });

  const fromHash = config.order.find((id) => `#${id}` === location.hash);
  if (fromHash !== undefined) featured = fromHash;
  applyState();

  function framingZone(): FramingZone {
    const canvasRect = canvas.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();
    return { top: zoneRect.top - canvasRect.top, bottom: zoneRect.bottom - canvasRect.top };
  }

  // Medidas cacheadas: se escriben estilos en cada frame y no se deben forzar lecturas de layout.
  const layout = {
    width: root.clientWidth,
    height: root.clientHeight,
    zoneTop: zone.offsetTop,
    zoneBottom: zone.offsetTop + zone.offsetHeight,
  };
  const labelSizes = new Map<Element, { width: number; height: number }>();
  const layoutObserver = new ResizeObserver(() => {
    layout.width = root.clientWidth;
    layout.height = root.clientHeight;
    layout.zoneTop = zone.offsetTop;
    layout.zoneBottom = zone.offsetTop + zone.offsetHeight;
    labels.forEach((label) => labelSizes.set(label, { width: label.offsetWidth, height: label.offsetHeight }));
    showroom?.refreshLayout();
  });
  [root, zone, ...labels.values()].forEach((element) => layoutObserver.observe(element));

  // Etiquetas laterales ancladas a la proyección 3D de cada pedestal.
  function positionLabels(anchors: AnchorMap): void {
    if (layout.width < WIDE_LAYOUT_MIN_PX || layout.width < layout.height) {
      labels.forEach((label) => label.removeAttribute('data-anchored'));
      return;
    }
    labels.forEach((label, id) => {
      const anchor = anchors.get(id);
      const size = labelSizes.get(label);
      if (anchor === undefined || size === undefined || label.dataset['side'] === 'center') return;
      const halfWidth = size.width / 2;
      const x = Math.min(Math.max(anchor.x, LABEL_EDGE_MARGIN_PX + halfWidth), layout.width - LABEL_EDGE_MARGIN_PX - halfWidth);
      const y = Math.min(Math.max(anchor.y + LABEL_GAP_PX, layout.zoneTop), layout.zoneBottom - size.height - LABEL_EDGE_MARGIN_PX);
      label.style.setProperty('--x', `${x.toFixed(1)}px`);
      label.style.setProperty('--y', `${y.toFixed(1)}px`);
      label.dataset['anchored'] = String(anchor.visible);
    });
  }

  async function startShowroom(): Promise<void> {
    let showroomModule: typeof import('./showroom/showroom');
    try {
      showroomModule = await import('./showroom/showroom');
    } catch (error) {
      // Chunk no descargable (red caída, deploy nuevo en curso): el hero queda con los posters estáticos.
      if (error instanceof TypeError) {
        root.dataset['showroom'] = 'unavailable';
        return;
      }
      throw error;
    }
    const { createShowroom } = showroomModule;
    try {
      showroom = createShowroom(canvas, {
        order: config.order,
        initial: featured,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        getFramingZone: framingZone,
        onSelect: (id) => show(id, true),
        onFrame: positionLabels,
        onReady: () => {
          root.dataset['showroom'] = 'ready';
        },
      });
    } catch (error) {
      if (error instanceof WebGLUnavailableError) {
        root.dataset['showroom'] = 'unavailable';
        return;
      }
      throw error;
    }
  }

  // Three.js se descarga después del primer render: el texto y el CTA no esperan al 3D.
  const start = (): void => void startShowroom();
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1200 });
  else setTimeout(start, 200);
}

document.querySelectorAll<HTMLElement>('[data-service-hero]').forEach((root) => {
  initMenu(root);
  initHero(root);
});
