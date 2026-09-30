import { Color, FrontSide, MeshPhysicalMaterial, Vector2, Vector3, type Side } from 'three';
import type { Vec3 } from './types';

export type FilmKind = 'tint' | 'mirror' | 'frost';

/** Eje por el que avanza la espátula, en coordenadas locales del mesh: u = (dot(pos, dirección) - desde) / (hasta - desde). */
export interface FilmAxis {
  direction: Vec3;
  from: number;
  to: number;
}

export interface FilmGlass {
  kind: FilmKind;
  material: MeshPhysicalMaterial;
  /** 0 = vidrio limpio, 1 = lámina aplicada; entre ambos se ve el borde de la espátula recorriendo el vidrio. */
  setCoverage(value: number): void;
  /** Luz del interior que atraviesa la lámina (se nota en el esmerilado). 0 = apagada. */
  setBacklight(value: number): void;
}

interface FilmLook {
  color: string;
  alpha: number;
  roughness: number;
  metalness: number;
}

// Mismas intenciones que los rellenos de lámina de tokens.css, llevadas a materiales PBR.
const CLEAR_GLASS: FilmLook = { color: '#b7cde3', alpha: 0.22, roughness: 0.03, metalness: 0 };
const FILM_LOOK: Record<FilmKind, FilmLook> = {
  tint: { color: '#07090c', alpha: 0.95, roughness: 0.09, metalness: 0.25 },
  mirror: { color: '#d4dde7', alpha: 1, roughness: 0.035, metalness: 1 },
  frost: { color: '#e6ebf0', alpha: 0.9, roughness: 0.85, metalness: 0 },
};
const FROST_GLOW = new Color('#ffcf9a');

/** Ancho del borde de la espátula, en fracciones del vidrio. */
const EDGE = 0.05;

const VERTEX_HEAD = /* glsl */ `
uniform vec3 uFilmAxis;
uniform vec2 uFilmRange;
varying float vFilmU;
`;
const VERTEX_BODY = /* glsl */ `
vFilmU = (dot(position, uFilmAxis) - uFilmRange.x) / (uFilmRange.y - uFilmRange.x);
`;
const FRAGMENT_HEAD = /* glsl */ `
uniform float uCoverage;
uniform float uBacklight;
uniform vec3 uFilmColor;
uniform float uFilmAlpha;
uniform float uFilmRoughness;
uniform float uFilmMetalness;
uniform vec3 uGlowColor;
varying float vFilmU;
#define FILM_EDGE ${EDGE.toFixed(3)}
`;
// Va después de emissivemap_fragment: todos los factores del material ya existen y todavía no se iluminó.
const FRAGMENT_BODY = /* glsl */ `
float filmSweep = uCoverage * (1.0 + 2.0 * FILM_EDGE) - FILM_EDGE;
float film = 1.0 - smoothstep(filmSweep - FILM_EDGE, filmSweep + FILM_EDGE, vFilmU);
// Vidrio limpio: más reflejo en ángulos rasantes (Fresnel aproximado), como un vidrio real.
float grazing = 1.0 - abs(dot(normalize(vViewPosition), normal));
diffuseColor.a = mix(diffuseColor.a, 0.62, grazing * grazing * grazing * (1.0 - film));
diffuseColor.rgb = mix(diffuseColor.rgb, uFilmColor, film);
diffuseColor.a = mix(diffuseColor.a, uFilmAlpha, film);
roughnessFactor = mix(roughnessFactor, uFilmRoughness, film);
metalnessFactor = mix(metalnessFactor, uFilmMetalness, film);
// Espátula: línea blanca en el borde y estela coral sobre la lámina recién puesta.
float sweeping = step(0.001, uCoverage) * step(uCoverage, 0.999);
float fromEdge = vFilmU - filmSweep;
float lead = exp(-(fromEdge * fromEdge) / (FILM_EDGE * FILM_EDGE * 0.08));
float behind = min(fromEdge, 0.0);
float trail = exp(-(behind * behind) / (FILM_EDGE * FILM_EDGE * 0.7)) * (1.0 - lead);
totalEmissiveRadiance += sweeping * (lead * vec3(2.4) + trail * vec3(0.95, 0.16, 0.18));
diffuseColor.a = max(diffuseColor.a, sweeping * lead);
totalEmissiveRadiance += uGlowColor * uBacklight * film;
`;

/**
 * Vidrio que recibe lámina. Es un MeshPhysicalMaterial común (reflejos del estudio, luces)
 * con el shader extendido: la lámina cubre el vidrio de u = 0 a u = 1 según `coverage`.
 */
export function createFilmGlass(kind: FilmKind, axis: FilmAxis, side: Side = FrontSide): FilmGlass {
  const film = FILM_LOOK[kind];
  const material = new MeshPhysicalMaterial({
    color: CLEAR_GLASS.color,
    opacity: CLEAR_GLASS.alpha,
    roughness: CLEAR_GLASS.roughness,
    metalness: CLEAR_GLASS.metalness,
    transparent: true,
    depthWrite: false,
    envMapIntensity: 1.25,
    side,
  });
  const uniforms = {
    uFilmAxis: { value: new Vector3(...axis.direction).normalize() },
    uFilmRange: { value: new Vector2(axis.from, axis.to) },
    uCoverage: { value: 0 },
    uBacklight: { value: 0 },
    uFilmColor: { value: new Color(film.color) },
    uFilmAlpha: { value: film.alpha },
    uFilmRoughness: { value: film.roughness },
    uFilmMetalness: { value: film.metalness },
    uGlowColor: { value: kind === 'frost' ? FROST_GLOW.clone().multiplyScalar(0.55) : new Color(0x000000) },
  };
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${VERTEX_HEAD}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\n${VERTEX_BODY}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${FRAGMENT_HEAD}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n${FRAGMENT_BODY}`);
  };
  // Mismo código para todos los vidrios: un solo programa compilado, uniforms propios por material.
  material.customProgramCacheKey = () => 'crisur-film-glass';

  return {
    kind,
    material,
    setCoverage(value) {
      uniforms.uCoverage.value = value;
    },
    setBacklight(value) {
      uniforms.uBacklight.value = value;
    },
  };
}
