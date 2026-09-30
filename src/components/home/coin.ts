import { animate, type Easing } from 'motion';

/** Vueltas completas en el aire antes de caer. */
const SPINS = 2;
/** Lento a propósito: el lanzamiento se tiene que poder seguir con la vista (pedido del cliente). */
const TOSS_SECONDS = 2.8;
/** Altura del salto, en fracciones del diámetro: más alto, la moneda se mete en el header. */
const TOSS_HEIGHT = 0.3;
const START_DELAY_MS = 300;

function requireElement<T extends Element>(scope: ParentNode, selector: string): T {
  const element = scope.querySelector<T>(selector);
  if (element === null) throw new Error(`CoinLogo: missing element "${selector}"`);
  return element;
}

/** Un único lanzamiento de bienvenida: sube frenando, gira, cae acelerando y rebota una vez. */
function tossOnce(coin: HTMLElement): void {
  const stage = coin.parentElement;
  if (stage === null) throw new Error('CoinLogo: the coin needs its stage element.');
  const body = requireElement<HTMLElement>(coin, '[data-coin-body]');
  const shadow = requireElement<HTMLElement>(stage, '[data-coin-shadow]');
  const height = -coin.offsetHeight * TOSS_HEIGHT;
  const arcEase: Easing[] = ['easeOut', 'easeIn', 'easeOut', 'easeIn'];
  // La duración va explícita en cada valor: una transición por valor no hereda la duración general.
  const arc = { duration: TOSS_SECONDS, times: [0, 0.42, 0.82, 0.91, 1], ease: arcEase };
  animate(
    body,
    { rotateX: [0, SPINS * 360], y: [0, height, 0, height * 0.07, 0] },
    { rotateX: { duration: TOSS_SECONDS * 0.82, ease: 'easeOut' }, y: arc },
  );
  animate(shadow, { scale: [1, 0.5, 1, 0.92, 1], opacity: [0.55, 0.18, 0.55, 0.5, 0.55] }, arc);
}

// Movimiento reducido: la moneda queda quieta mostrando el logo.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll<HTMLElement>('[data-coin]').forEach((coin) => {
    window.setTimeout(() => tossOnce(coin), START_DELAY_MS);
  });
}
