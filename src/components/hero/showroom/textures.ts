import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Texture } from 'three';

/** PRNG determinístico: las texturas procedurales son idénticas en cada carga (y en los posters). */
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

function createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (context === null) {
    throw new Error('Canvas 2D context unavailable for procedural textures.');
  }
  return [canvas, context];
}

function toColorTexture(canvas: HTMLCanvasElement, repeatX = 1, repeatY = 1): Texture {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.anisotropy = 4;
  return texture;
}

/** Hormigón / revoque: base plana con manchas suaves y poro fino. */
export function createConcreteTexture(baseColor: string, seed: number): Texture {
  const size = 256;
  const [canvas, context] = createCanvas(size, size);
  const random = createRandom(seed);
  context.fillStyle = baseColor;
  context.fillRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const radius = 12 + random() * 40;
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius);
    const tone = random() > 0.5 ? '255,255,255' : '0,0,0';
    gradient.addColorStop(0, `rgba(${tone},${0.035 + random() * 0.04})`);
    gradient.addColorStop(1, `rgba(${tone},0)`);
    context.save();
    context.translate(random() * size, random() * size);
    context.fillStyle = gradient;
    context.fillRect(-radius, -radius, radius * 2, radius * 2);
    context.restore();
  }
  for (let i = 0; i < 2600; i++) {
    context.fillStyle = `rgba(0,0,0,${random() * 0.08})`;
    context.fillRect(random() * size, random() * size, 1, 1);
  }
  return toColorTexture(canvas, 2, 2);
}

/** Listones de madera verticales con veta. */
export function createWoodTexture(seed: number): Texture {
  const width = 256;
  const height = 512;
  const [canvas, context] = createCanvas(width, height);
  const random = createRandom(seed);
  const boardWidth = width / 8;
  for (let board = 0; board < 8; board++) {
    const lightness = 30 + random() * 9;
    context.fillStyle = `hsl(24, 42%, ${lightness}%)`;
    context.fillRect(board * boardWidth, 0, boardWidth, height);
    for (let line = 0; line < 14; line++) {
      const x = board * boardWidth + random() * boardWidth;
      context.strokeStyle = `rgba(40,20,8,${0.15 + random() * 0.2})`;
      context.lineWidth = 0.6 + random();
      context.beginPath();
      context.moveTo(x, 0);
      for (let y = 0; y <= height; y += 32) {
        context.lineTo(x + Math.sin(y * 0.02 + board) * 2 * random(), y);
      }
      context.stroke();
    }
    context.fillStyle = 'rgba(0,0,0,0.55)';
    context.fillRect(board * boardWidth, 0, 2, height);
  }
  return toColorTexture(canvas);
}

/** Baldosas de vereda. */
export function createPavingTexture(seed: number): Texture {
  const size = 256;
  const [canvas, context] = createCanvas(size, size);
  const random = createRandom(seed);
  const tile = size / 4;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 4; column++) {
      const lightness = 52 + random() * 8;
      context.fillStyle = `hsl(30, 5%, ${lightness}%)`;
      context.fillRect(column * tile, row * tile, tile, tile);
    }
  }
  context.strokeStyle = 'rgba(20,20,20,0.55)';
  context.lineWidth = 2;
  for (let i = 0; i <= 4; i++) {
    context.beginPath();
    context.moveTo(i * tile, 0);
    context.lineTo(i * tile, size);
    context.moveTo(0, i * tile);
    context.lineTo(size, i * tile);
    context.stroke();
  }
  return toColorTexture(canvas, 3, 1);
}

/** Patente Mercosur genérica. */
export function createPlateTexture(text: string): Texture {
  const [canvas, context] = createCanvas(512, 160);
  context.fillStyle = '#f4f5f6';
  context.fillRect(0, 0, 512, 160);
  context.fillStyle = '#1f3f9a';
  context.fillRect(0, 0, 512, 34);
  context.strokeStyle = '#111';
  context.lineWidth = 6;
  context.strokeRect(3, 3, 506, 154);
  context.fillStyle = '#111';
  context.font = 'bold 92px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 256, 100);
  return toColorTexture(canvas);
}

/** Degradé radial blanco→transparente; se tiñe con `color` del material (glows aditivos, sombras de contacto). */
export function createRadialFalloffTexture(): Texture {
  const size = 256;
  const [canvas, context] = createCanvas(size, size);
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Máscara de opacidad del piso (escala de grises opaca: alphaMap lee el canal verde). */
export function createFloorAlphaTexture(): Texture {
  const size = 512;
  const [canvas, context] = createCanvas(size, size);
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.45, '#ffffff');
  gradient.addColorStop(1, '#000000');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/** Cielo de estudio (claro arriba, oscuro en el horizonte): lo que reflejan los vidrios espejados. */
export function createSkyGradientTexture(): Texture {
  const [canvas, context] = createCanvas(4, 256);
  const gradient = context.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, '#e6eef6');
  gradient.addColorStop(0.45, '#9fb1c4');
  gradient.addColorStop(0.62, '#6b7b8c');
  gradient.addColorStop(0.85, '#353e49');
  gradient.addColorStop(1, '#1a1f26');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 4, 256);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Anillo luminoso (derrame de luz del LED del pedestal sobre el piso). */
export function createRingGlowTexture(): Texture {
  const size = 512;
  const [canvas, context] = createCanvas(size, size);
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.72, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.8, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.86, 'rgba(255,255,255,0.35)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
