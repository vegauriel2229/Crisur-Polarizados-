import {
  BackSide,
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  type WebGLRenderTarget,
  type WebGLRenderer,
} from 'three';
import { BRAND_RED } from './materials';
import { createSkyGradientTexture } from './textures';

type PanelSpec = readonly [width: number, height: number, x: number, y: number, z: number, rotationX: number, rotationY: number, color: Color];

/**
 * Estudio fotográfico oscuro para reflejos (PMREM): softboxes blancos + una tira roja baja.
 * Es lo que se ve reflejado en pintura y vidrios; la tira roja firma los reflejos con el color de marca.
 */
export function createStudioEnvironment(renderer: WebGLRenderer): WebGLRenderTarget {
  const scene = new Scene();
  const geometries: BoxGeometry[] = [];
  const planes: PlaneGeometry[] = [];
  const materials: MeshBasicMaterial[] = [];

  const roomGeometry = new BoxGeometry(34, 16, 34);
  const roomMaterial = new MeshBasicMaterial({ color: '#08090c', side: BackSide });
  geometries.push(roomGeometry);
  materials.push(roomMaterial);
  const room = new Mesh(roomGeometry, roomMaterial);
  room.position.y = 6;
  scene.add(room);

  const white = (intensity: number): Color => new Color(1, 1, 1).multiplyScalar(intensity);
  const panels: readonly PanelSpec[] = [
    [14, 5, 0, 13.5, 0, Math.PI / 2, 0, white(5)],
    [3, 9, -16.5, 5, 3, 0, Math.PI / 2, white(3.2)],
    [2, 9, 16.5, 5, -3, 0, -Math.PI / 2, white(2)],
    [18, 3, 0, 5, 16.5, 0, Math.PI, white(1.3)],
    [22, 0.6, 0, 1.2, -16.5, 0, 0, new Color(BRAND_RED).multiplyScalar(7)],
  ];
  for (const [width, height, x, y, z, rotationX, rotationY, color] of panels) {
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({ color });
    planes.push(geometry);
    materials.push(material);
    const panel = new Mesh(geometry, material);
    panel.position.set(x, y, z);
    panel.rotation.set(rotationX, rotationY, 0);
    scene.add(panel);
  }

  // Cielo detrás de la cámara: los espejados y la pintura lo reflejan con línea de horizonte.
  const skyTexture = createSkyGradientTexture();
  // Se extiende bajo el horizonte: con la cámara apenas elevada, los espejados reflejan esta franja.
  const skyGeometry = new PlaneGeometry(34, 26);
  const skyMaterial = new MeshBasicMaterial({ map: skyTexture, color: white(1.8) });
  planes.push(skyGeometry);
  materials.push(skyMaterial);
  const sky = new Mesh(skyGeometry, skyMaterial);
  sky.position.set(0, 3, 16.9);
  sky.rotation.y = Math.PI;
  scene.add(sky);

  const generator = new PMREMGenerator(renderer);
  const target = generator.fromScene(scene, 0.03);
  generator.dispose();
  [...geometries, ...planes, ...materials, skyTexture].forEach((resource) => resource.dispose());
  return target;
}
