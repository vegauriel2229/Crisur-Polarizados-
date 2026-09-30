import type { ImageMetadata } from 'astro';
import type { ServiceId } from './services';

export interface GalleryPhoto {
  src: ImageMetadata;
  alt: string;
}

/*
 * FOTOS DE TRABAJOS: se cargan solas desde src/assets/gallery/<servicio>/ (autos, hogares, negocios).
 * - El orden es el del nombre del archivo: numerá al principio (01-, 02-…) para elegirlo.
 * - El nombre del archivo es la descripción de la foto (alt): "02-auto-polarizado-negro.jpg" → "Auto polarizado negro".
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/gallery/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

/** "02-auto-polarizado-negro.jpg" → "Auto polarizado negro". */
function altFromFileName(path: string): string {
  const name = (path.split('/').pop() ?? '')
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return name === '' ? 'Trabajo de Crisur Polarizados' : name.charAt(0).toUpperCase() + name.slice(1);
}

export function galleryFor(service: ServiceId): readonly GalleryPhoto[] {
  const folder = `../assets/gallery/${service}/`;
  return Object.entries(files)
    .filter(([path]) => path.startsWith(folder))
    .sort(([left], [right]) => left.localeCompare(right, 'es', { numeric: true }))
    .map(([path, module]) => ({ src: module.default, alt: altFromFileName(path) }));
}
