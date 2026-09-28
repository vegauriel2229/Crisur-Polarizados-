import { Color, DoubleSide, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import { createConcreteTexture, createPavingTexture, createWoodTexture } from './textures';

export const BRAND_RED = new Color('#e3262b');
const WARM_LIGHT = new Color('#ffcf9a');

/**
 * Librería PBR compartida por los tres dioramas.
 * Los vidrios son el producto: polarizado (oscuro y reflectivo), espejado (metálico) y esmerilado (transmisión rugosa).
 */
export function createMaterialLibrary() {
  return {
    carPaint: new MeshPhysicalMaterial({
      color: '#c9cdd3',
      metalness: 0.55,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      iridescence: 0.18,
      iridescenceIOR: 1.3,
    }),
    tintedGlass: new MeshPhysicalMaterial({
      color: '#0b0e13',
      metalness: 0.35,
      roughness: 0.04,
      clearcoat: 1,
      clearcoatRoughness: 0.01,
      envMapIntensity: 2.2,
    }),
    storefrontTint: new MeshPhysicalMaterial({
      color: '#0a0d11',
      metalness: 0.15,
      roughness: 0.03,
      transparent: true,
      opacity: 0.78,
      envMapIntensity: 1.8,
    }),
    mirrorGlass: new MeshPhysicalMaterial({
      color: '#cdd9e4',
      metalness: 1,
      roughness: 0.04,
      envMapIntensity: 1.35,
    }),
    frostedGlass: new MeshPhysicalMaterial({
      color: '#f4f7f9',
      metalness: 0,
      roughness: 0.55,
      transmission: 1,
      thickness: 0.04,
      ior: 1.5,
      side: DoubleSide,
    }),
    frostedFilm: new MeshPhysicalMaterial({
      color: '#eef2f5',
      metalness: 0,
      roughness: 0.7,
      transparent: true,
      opacity: 0.88,
    }),
    chrome: new MeshStandardMaterial({ color: '#dfe3e8', metalness: 1, roughness: 0.12 }),
    alloy: new MeshStandardMaterial({ color: '#a4aab2', metalness: 1, roughness: 0.28 }),
    anodized: new MeshStandardMaterial({ color: '#23262b', metalness: 0.8, roughness: 0.35 }),
    blackGloss: new MeshPhysicalMaterial({ color: '#0d0f12', metalness: 0.2, roughness: 0.18, clearcoat: 1 }),
    plasticBlack: new MeshStandardMaterial({ color: '#16181b', metalness: 0, roughness: 0.62 }),
    rubber: new MeshStandardMaterial({ color: '#141517', metalness: 0, roughness: 0.88 }),
    headlight: new MeshStandardMaterial({
      color: '#10141a',
      emissive: '#dfeaff',
      emissiveIntensity: 1.3,
      metalness: 0.5,
      roughness: 0.15,
    }),
    taillight: new MeshStandardMaterial({
      color: '#2a0405',
      emissive: BRAND_RED,
      emissiveIntensity: 2.6,
      roughness: 0.2,
    }),
    ledRed: new MeshStandardMaterial({ color: '#000000', emissive: BRAND_RED, emissiveIntensity: 3 }),
    ledWhite: new MeshStandardMaterial({ color: '#000000', emissive: '#ffffff', emissiveIntensity: 1.4 }),
    warmLight: new MeshStandardMaterial({ color: '#000000', emissive: WARM_LIGHT, emissiveIntensity: 2.2 }),
    interiorDark: new MeshStandardMaterial({ color: '#241f1a', emissive: '#3a2a1c', emissiveIntensity: 0.45, roughness: 0.9 }),
    concrete: new MeshStandardMaterial({ map: createConcreteTexture('#dedad4', 7), roughness: 0.92 }),
    stucco: new MeshStandardMaterial({ map: createConcreteTexture('#d6d1c9', 19), roughness: 0.95 }),
    darkCladding: new MeshStandardMaterial({ color: '#2a2c30', metalness: 0.35, roughness: 0.55 }),
    wood: new MeshStandardMaterial({ map: createWoodTexture(3), roughness: 0.7 }),
    paving: new MeshStandardMaterial({ map: createPavingTexture(11), roughness: 0.85 }),
    stoneDark: new MeshStandardMaterial({ color: '#3a3b3f', roughness: 0.75 }),
    lawn: new MeshStandardMaterial({ color: '#2f4a2e', roughness: 0.95 }),
    foliage: new MeshStandardMaterial({ color: '#2d4b32', roughness: 0.85, flatShading: true }),
    foliageLight: new MeshStandardMaterial({ color: '#3f6441', roughness: 0.85, flatShading: true }),
    bark: new MeshStandardMaterial({ color: '#4a3526', roughness: 0.9 }),
    planter: new MeshStandardMaterial({ color: '#26282c', metalness: 0.2, roughness: 0.5 }),
    pedestalTop: new MeshPhysicalMaterial({
      color: '#101318',
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
    }),
    pedestalSide: new MeshStandardMaterial({ color: '#1c2026', metalness: 0.7, roughness: 0.4 }),
    floor: new MeshStandardMaterial({ color: '#0d1014', metalness: 0.35, roughness: 0.5, transparent: true, depthWrite: false }),
  };
}

export type MaterialLibrary = ReturnType<typeof createMaterialLibrary>;
