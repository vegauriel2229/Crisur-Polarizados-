import type { ServiceId } from '../../data/services';

type PanePosition = 'left' | 'center' | 'right';

interface HeroConfig {
  order: ServiceId[];
  initial: ServiceId;
  whatsappUrls: Record<ServiceId, string>;
  labels: Record<ServiceId, string>;
}

/** Recorrido horizontal mínimo (px) para que un deslizamiento cuente como swipe. */
const SWIPE_MIN_PX = 40;

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

/**
 * Lugar de cada ventana en la ruleta según cuál está destacada.
 * La cuenta es circular (módulo 3): 0 pasos = centro, 1 paso = derecha, 2 pasos = izquierda.
 */
function positionOf(order: readonly ServiceId[], featured: ServiceId, id: ServiceId): PanePosition {
  const steps = (order.indexOf(id) - order.indexOf(featured) + order.length) % order.length;
  if (steps === 0) return 'center';
  return steps === 1 ? 'right' : 'left';
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

function initSelector(root: HTMLElement): void {
  const config = readConfig(root);
  const selector = requireElement<HTMLElement>(root, '[data-selector]');
  const copy = requireElement<HTMLElement>(root, '#hero-copy');
  const cta = requireElement<HTMLAnchorElement>(root, '[data-cta]');
  const live = requireElement<HTMLElement>(root, '[data-live]');
  const variants = root.querySelectorAll<HTMLElement>('[data-variant]');
  const navLinks = root.querySelectorAll<HTMLAnchorElement>('[data-nav-service]');
  // Map id → botón: acceso O(1) al actualizar cada ventana.
  const tabs = new Map<ServiceId, HTMLButtonElement>(
    config.order.map((id) => [id, requireElement<HTMLButtonElement>(selector, `[data-select="${id}"]`)]),
  );

  let featured = config.initial;

  /**
   * Única función que toca el DOM. No anima nada por sí misma: cambia atributos
   * (data-pos, is-active, aria-*) y el CSS de ServiceHero.astro hace las transiciones.
   */
  function render(): void {
    variants.forEach((variant) => variant.classList.toggle('is-active', variant.dataset['variant'] === featured));
    navLinks.forEach((link) => {
      if (link.dataset['navService'] === featured) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    tabs.forEach((tab, id) => {
      const isFeatured = id === featured;
      tab.dataset['pos'] = positionOf(config.order, featured, id);
      tab.setAttribute('aria-selected', String(isFeatured));
      // "Roving tabindex": solo la ventana elegida entra en el orden de Tab; las flechas mueven la selección.
      tab.tabIndex = isFeatured ? 0 : -1;
    });
    copy.setAttribute('aria-labelledby', `tab-${featured}`);
    cta.href = config.whatsappUrls[featured];
  }

  function show(id: ServiceId): void {
    if (id === featured) return;
    featured = id;
    render();
    live.textContent = `Mostrando ${config.labels[id].toLowerCase()}`;
    // replaceState (no pushState): cambiar de servicio no llena el historial del botón "atrás".
    history.replaceState(null, '', `#${id}`);
  }

  function step(direction: 1 | -1): void {
    const index = config.order.indexOf(featured);
    const next = config.order[(index + direction + config.order.length) % config.order.length];
    if (next !== undefined) show(next);
  }

  // Un swipe que empieza y termina sobre la misma ventana también dispara "click": se ignora ese click.
  let swipedSinceDown = false;
  tabs.forEach((tab, id) =>
    tab.addEventListener('click', () => {
      if (!swipedSinceDown) show(id);
    }),
  );

  selector.addEventListener('keydown', (event) => {
    const direction = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (direction === 0) return;
    event.preventDefault();
    step(direction);
    tabs.get(featured)?.focus();
  });

  // Swipe: se compara dónde empezó y dónde terminó el gesto; si fue más horizontal que vertical, cambia.
  let swipeStart: { x: number; y: number } | null = null;
  selector.addEventListener('pointerdown', (event) => {
    swipeStart = { x: event.clientX, y: event.clientY };
    swipedSinceDown = false;
  });
  selector.addEventListener('pointerup', (event) => {
    if (swipeStart === null) return;
    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(deltaX) >= SWIPE_MIN_PX && Math.abs(deltaX) > Math.abs(deltaY)) {
      swipedSinceDown = true;
      step(deltaX < 0 ? 1 : -1);
    }
  });
  selector.addEventListener('pointercancel', () => {
    swipeStart = null;
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.dataset['navService'] as ServiceId | undefined;
      if (id === undefined) return;
      event.preventDefault();
      show(id);
    });
  });

  // Deep link: /#hogares abre la página con Hogares en el centro.
  const fromHash = config.order.find((id) => `#${id}` === location.hash);
  if (fromHash !== undefined) featured = fromHash;
  render();
}

document.querySelectorAll<HTMLElement>('[data-service-hero]').forEach((root) => {
  initMenu(root);
  initSelector(root);
});
