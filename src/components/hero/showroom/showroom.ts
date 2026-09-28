import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CircleGeometry,
  Color,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  SRGBColorSpace,
  Scene,
  SpotLight,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
} from 'three';
import type { ServiceId } from '../../../data/hero-slides';
import { createCar } from './dioramas/car';
import { createHouse } from './dioramas/house';
import { createStorefront } from './dioramas/storefront';
import { PEDESTAL_RADIUS, createPedestal, type DioramaContext, type Pedestal } from './dioramas/common';
import { createStudioEnvironment } from './environment';
import { BRAND_RED, createMaterialLibrary } from './materials';
import { ScalarTween, clamp, easeInOutCubic, easeOutExpo, lerp, smoothstep } from './motion';
import { createFloorAlphaTexture, createRadialFalloffTexture, createRingGlowTexture } from './textures';
import { WIDE_LAYOUT_MIN_PX, WebGLUnavailableError, type FramingZone, type ScreenAnchor, type Showroom, type ShowroomOptions } from './types';

const RING_STEP = (Math.PI * 2) / 3;
const FIELD_OF_VIEW = 28;
const TAN_HALF_FOV = Math.tan(MathUtils.degToRad(FIELD_OF_VIEW / 2));
const FRAME_HEIGHT = 3.9;
const FRAME_WIDTH = 5.8;
const LOOK_AT_HEIGHT = 0.95;
const REST_ELEVATION = MathUtils.degToRad(7);
/** Escala de los dioramas laterales: el destacado manda, los laterales acompañan. */
const SIDE_SCALE = 0.8;
const INTRO_ELEVATION = MathUtils.degToRad(24);
const INTRO_DISTANCE_FACTOR = 2.6;
const INTRO_RING_OFFSET = 0.9;
const INTRO_SECONDS = 2.8;
const SWITCH_SECONDS = 1.3;
const DOLLY_PULSE = 0.22;
const IDLE_SWAY = 0.2;
const IDLE_PERIOD_SECONDS = 10;
/** Los laterales miran levemente hacia el centro para leerse de frente y con profundidad. */
const INWARD_YAW_FACTOR = 0.3;
const SWIPE_THRESHOLD_PX = 50;
/** Tope de delta: evita saltos si el navegador congela el loop (p. ej. un frame de 2 s). */
const MAX_FRAME_SECONDS = 0.25;
const TAP_TOLERANCE_PX = 8;
const COMPACT_BREAKPOINT_PX = 700;
const BACKGROUND = new Color('#0c0f13');

interface DioramaSpec {
  build(context: DioramaContext): Group;
  scale: number;
  yaw: number;
}

const DIORAMAS: Record<ServiceId, DioramaSpec> = {
  autos: { build: createCar, scale: 1, yaw: MathUtils.degToRad(-142) },
  locales: { build: createStorefront, scale: 0.56, yaw: MathUtils.degToRad(14) },
  hogares: { build: createHouse, scale: 0.44, yaw: MathUtils.degToRad(-16) },
};

interface CarouselItem {
  id: ServiceId;
  baseAngle: number;
  root: Group;
  turntable: Group;
  pedestal: Pedestal;
  led: ScalarTween;
  emphasis: ScalarTween;
}

interface Framing {
  distance: number;
  ringRadius: number;
  offsetY: number;
}

function createRenderer(canvas: HTMLCanvasElement, compact: boolean): WebGLRenderer {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (error) {
    throw new WebGLUnavailableError(error);
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.5 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  // Canvas transparente: el degradé de fondo lo pinta CSS y el piso se funde en él sin horizonte duro.
  renderer.setClearColor(BACKGROUND, 0);
  return renderer;
}

type Renderable = Object3D & { geometry?: BufferGeometry; material?: Material | Material[] };

/** Three.js no libera memoria de GPU solo: se recorren y liberan geometrías, materiales y texturas. */
function disposeScene(scene: Scene): void {
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  scene.traverse((object) => {
    const { geometry, material } = object as Renderable;
    if (geometry) geometries.add(geometry);
    if (material) (Array.isArray(material) ? material : [material]).forEach((entry) => materials.add(entry));
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value instanceof Texture) textures.add(value);
    });
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  textures.forEach((texture) => texture.dispose());
}

export function createShowroom(canvas: HTMLCanvasElement, options: ShowroomOptions): Showroom {
  const { order, reducedMotion } = options;
  const initialIndex = order.indexOf(options.initial);
  if (order.length !== 3 || initialIndex < 0) {
    throw new Error(`Showroom requires 3 services including "${options.initial}".`);
  }

  const compactQuery = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT_PX - 1}px), (pointer: coarse)`);
  const compact = compactQuery.matches;
  const renderer = createRenderer(canvas, compact);
  const environment = createStudioEnvironment(renderer);

  const scene = new Scene();
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.85;
  scene.fog = new Fog(BACKGROUND, 20, 60);

  const camera = new PerspectiveCamera(FIELD_OF_VIEW, 1, 0.5, 200);
  const context: DioramaContext = {
    materials: createMaterialLibrary(),
    textures: { falloff: createRadialFalloffTexture(), ringGlow: createRingGlowTexture() },
  };

  // ── Escenario fijo ──────────────────────────────────────────
  context.materials.floor.alphaMap = createFloorAlphaTexture();
  const floor = new Mesh(new CircleGeometry(1, 72), context.materials.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.renderOrder = -1;
  scene.add(floor);

  const lightPool = new Mesh(
    new PlaneGeometry(12, 12),
    new MeshBasicMaterial({
      color: '#ffffff',
      map: context.textures.falloff,
      blending: AdditiveBlending,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    }),
  );
  lightPool.rotation.x = -Math.PI / 2;
  scene.add(lightPool);

  scene.add(new HemisphereLight('#dfe6ee', '#0b0d10', 0.45));

  const keyLight = new DirectionalLight('#fff3e6', 2.1);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.setScalar(compact ? 1024 : 2048);
  keyLight.shadow.camera.left = -4.6;
  keyLight.shadow.camera.right = 4.6;
  keyLight.shadow.camera.top = 4.6;
  keyLight.shadow.camera.bottom = -4.6;
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 40;
  keyLight.shadow.bias = -0.0004;
  keyLight.shadow.normalBias = 0.02;
  keyLight.shadow.radius = 3;
  scene.add(keyLight, keyLight.target);

  const fillLight = new DirectionalLight('#b8c6d8', 0.55);
  scene.add(fillLight, fillLight.target);

  const rimLights = [-1, 1].map((side) => {
    const light = new SpotLight(BRAND_RED, 55, 0, 0.45, 0.9, 2);
    light.userData['side'] = side;
    scene.add(light, light.target);
    return light;
  });

  const sweepLight = new SpotLight('#ffffff', 55, 0, 0.3, 1, 2);
  scene.add(sweepLight, sweepLight.target);

  // ── Ruleta ──────────────────────────────────────────────────
  const ring = new Group();
  scene.add(ring);
  const items: CarouselItem[] = order.map((id, index) => {
    const root = new Group();
    root.userData['serviceId'] = id;
    const pedestal = createPedestal(context);
    root.add(pedestal.group);
    const turntable = new Group();
    turntable.position.y = pedestal.topY;
    const spec = DIORAMAS[id];
    const diorama = spec.build(context);
    diorama.scale.setScalar(spec.scale);
    diorama.rotation.y = spec.yaw;
    turntable.add(diorama);
    root.add(turntable);
    ring.add(root);
    return {
      id,
      baseAngle: (index - initialIndex) * RING_STEP,
      root,
      turntable,
      pedestal,
      led: new ScalarTween(0, easeInOutCubic),
      emphasis: new ScalarTween(index === initialIndex ? 1 : SIDE_SCALE, easeInOutCubic),
    };
  });

  let featuredIndex = initialIndex;
  const ringAngle = new ScalarTween(0, easeInOutCubic);
  const intro = new ScalarTween(reducedMotion ? 1 : 0, (t) => t);
  if (!reducedMotion) intro.start(1, INTRO_SECONDS);
  let dollyElapsed = SWITCH_SECONDS;
  let elapsedTime = 0;

  // ── Encuadre ────────────────────────────────────────────────
  const framing: Framing = { distance: 12, ringRadius: 8, offsetY: 0 };
  const framingTarget: Framing = { ...framing };
  let framingDirty = true;
  let framingInitialized = false;

  function computeFraming(zone: FramingZone, width: number, height: number): Framing {
    const zoneHeight = Math.max(80, zone.bottom - zone.top);
    const zoneCenter = (zone.top + zone.bottom) / 2;
    const isPhone = width < COMPACT_BREAKPOINT_PX;
    const isNarrow = width < WIDE_LAYOUT_MIN_PX || width < height;
    const widthShare = isPhone ? 1 : isNarrow ? 0.84 : 0.56;
    const distanceForHeight = (FRAME_HEIGHT * height) / (0.86 * zoneHeight * 2 * TAN_HALF_FOV);
    const distanceForWidth = (FRAME_WIDTH * height) / (widthShare * width * 2 * TAN_HALF_FOV);
    const distance = Math.max(distanceForHeight, distanceForWidth);
    const focalPx = height / (2 * TAN_HALF_FOV);
    // Los laterales se ubican a una fracción del ancho: en mobile asoman desde los bordes.
    const sideOffsetPx = width * (isNarrow ? 0.5 : 0.34);
    const denominator = 0.866 * focalPx - 1.5 * sideOffsetPx;
    const ringRadius = denominator > 0 ? clamp((sideOffsetPx * distance) / denominator, 4.6, 24) : 24;
    return { distance, ringRadius, offsetY: height / 2 - zoneCenter };
  }

  function updateFraming(delta: number): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (framingDirty) {
      Object.assign(framingTarget, computeFraming(options.getFramingZone(), width, height));
      framingDirty = false;
      if (!framingInitialized) {
        Object.assign(framing, framingTarget);
        framingInitialized = true;
      }
    }
    const blend = 1 - Math.exp(-delta * 6);
    framing.distance = lerp(framing.distance, framingTarget.distance, blend);
    framing.ringRadius = lerp(framing.ringRadius, framingTarget.ringRadius, blend);
    framing.offsetY = lerp(framing.offsetY, framingTarget.offsetY, blend);
    camera.setViewOffset(width, height, 0, framing.offsetY, width, height);
  }

  // ── Interacción ─────────────────────────────────────────────
  const raycaster = new Raycaster();
  const pointerNdc = new Vector2();
  const parallax = new Vector2();
  const parallaxTarget = new Vector2();
  let pointerStart: { x: number; y: number } | null = null;
  let hoverCheckPending = false;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function itemAt(clientX: number, clientY: number): CarouselItem | undefined {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const [hit] = raycaster.intersectObjects(
      items.map((item) => item.root),
      true,
    );
    let node: Object3D | null = hit?.object ?? null;
    while (node !== null && node.userData['serviceId'] === undefined) node = node.parent;
    const id = node?.userData['serviceId'] as ServiceId | undefined;
    return items.find((item) => item.id === id);
  }

  function neighbour(step: 1 | -1): ServiceId {
    return order[(featuredIndex + step + order.length) % order.length]!;
  }

  function onPointerDown(event: PointerEvent): void {
    pointerStart = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent): void {
    if (pointerStart === null) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      options.onSelect(neighbour(dx < 0 ? 1 : -1));
      return;
    }
    if (Math.hypot(dx, dy) > TAP_TOLERANCE_PX) return;
    const item = itemAt(event.clientX, event.clientY);
    if (item !== undefined && item !== items[featuredIndex]) options.onSelect(item.id);
  }

  let lastPointer = { x: 0, y: 0 };
  function onPointerMove(event: PointerEvent): void {
    lastPointer = { x: event.clientX, y: event.clientY };
    hoverCheckPending = true;
    if (finePointer) {
      const rect = canvas.getBoundingClientRect();
      parallaxTarget.set(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    }
  }

  function onPointerLeave(): void {
    parallaxTarget.set(0, 0);
    canvas.style.cursor = '';
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);

  // ── Frame ───────────────────────────────────────────────────
  const anchorPoint = new Vector3();
  const lookAt = new Vector3();
  const cameraTarget = new Vector3();
  const featuredPosition = new Vector3();
  const anchors = new Map<ServiceId, ScreenAnchor>();
  let ready = false;

  function updateItems(ringRotation: number, delta: number): void {
    const swayBlend = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.5);
    const introProgress = intro.progress;
    items.forEach((item, index) => {
      const angle = item.baseAngle;
      item.root.position.set(Math.sin(angle) * framing.ringRadius, 0, Math.cos(angle) * framing.ringRadius);
      const worldAngle = MathUtils.euclideanModulo(angle + ringRotation + Math.PI, Math.PI * 2) - Math.PI;
      item.root.rotation.y = -worldAngle * INWARD_YAW_FACTOR - ringRotation;
      item.root.scale.setScalar(item.emphasis.value);

      const isFeatured = index === featuredIndex;
      const swayTarget = isFeatured && !reducedMotion ? Math.sin((elapsedTime * Math.PI * 2) / IDLE_PERIOD_SECONDS) * IDLE_SWAY : 0;
      item.turntable.rotation.y = lerp(item.turntable.rotation.y, swayTarget, swayBlend);

      // Los LED se encienden en secuencia durante la entrada.
      const introLed = smoothstep(0.2 + index * 0.12, 0.5 + index * 0.12, introProgress);
      const level = introLed * item.led.value;
      item.pedestal.ledMaterial.color.copy(BRAND_RED).multiplyScalar(0.15 + level * 2.4);
      item.pedestal.floorGlow.opacity = 0.06 + level * 0.3;
    });
  }

  function updateLights(): void {
    lookAt.set(featuredPosition.x, LOOK_AT_HEIGHT, featuredPosition.z);
    keyLight.position.set(lookAt.x - 5, 10, lookAt.z + 6);
    keyLight.target.position.copy(lookAt);
    fillLight.position.set(lookAt.x + 7, 3.5, lookAt.z + 3);
    fillLight.target.position.copy(lookAt);
    rimLights.forEach((light) => {
      const side = light.userData['side'] as number;
      light.position.set(lookAt.x + side * 4.6, 1.7, lookAt.z - 3.8);
      light.target.position.copy(lookAt);
    });
    const sweepX = reducedMotion ? -3 : Math.sin(elapsedTime * 0.35) * 6.5;
    sweepLight.position.set(lookAt.x + sweepX, 3.6, lookAt.z + 5.5);
    sweepLight.target.position.copy(lookAt);
    lightPool.position.set(featuredPosition.x, 0.003, featuredPosition.z);
    floor.position.set(0, 0, framing.ringRadius * 0.25);
    floor.scale.setScalar(framing.ringRadius * 1.6 + 14);
  }

  function updateCamera(delta: number): void {
    const introEase = easeOutExpo(intro.progress);
    dollyElapsed += delta;
    const pulse = reducedMotion ? 0 : Math.sin(Math.PI * clamp(dollyElapsed / SWITCH_SECONDS, 0, 1)) * DOLLY_PULSE;
    const distance = framing.distance * lerp(INTRO_DISTANCE_FACTOR, 1, introEase) * (1 + pulse);
    const elevation = lerp(INTRO_ELEVATION, REST_ELEVATION, introEase);
    parallax.lerp(parallaxTarget, 1 - Math.exp(-delta * 3));
    cameraTarget.set(parallax.x * 0.3, LOOK_AT_HEIGHT - parallax.y * 0.12, framing.ringRadius);
    camera.position.set(cameraTarget.x, cameraTarget.y + Math.sin(elevation) * distance, cameraTarget.z + Math.cos(elevation) * distance);
    camera.lookAt(cameraTarget);
    const fog = scene.fog as Fog;
    fog.near = distance * 0.95 + framing.ringRadius * 0.3;
    fog.far = distance + framing.ringRadius * 2.8;
  }

  function writeAnchors(): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    items.forEach((item) => {
      anchorPoint.set(0, 0.05, PEDESTAL_RADIUS);
      item.root.localToWorld(anchorPoint);
      anchorPoint.project(camera);
      const x = ((anchorPoint.x + 1) / 2) * width;
      const y = ((1 - anchorPoint.y) / 2) * height;
      anchors.set(item.id, { x, y, visible: anchorPoint.z < 1 && x > -width * 0.2 && x < width * 1.2 });
    });
  }

  let lastTimestamp: number | null = null;
  function renderFrame(timestamp: number): void {
    // Tiempo real (no por frame): en equipos lentos las animaciones terminan a tiempo con menos cuadros.
    const delta = lastTimestamp === null ? 0 : Math.min((timestamp - lastTimestamp) / 1000, MAX_FRAME_SECONDS);
    lastTimestamp = timestamp;
    elapsedTime += delta;
    intro.update(delta);
    ringAngle.update(delta);
    items.forEach((item) => {
      item.led.update(delta);
      item.emphasis.update(delta);
    });

    updateFraming(delta);
    const introOffset = reducedMotion ? 0 : (1 - easeOutExpo(intro.progress)) * INTRO_RING_OFFSET;
    ring.rotation.y = ringAngle.value + introOffset;
    updateItems(ring.rotation.y, delta);
    ring.updateMatrixWorld(true);
    featuredPosition.set(0, 0, framing.ringRadius);
    updateLights();
    updateCamera(delta);

    if (hoverCheckPending && finePointer) {
      hoverCheckPending = false;
      const hovered = itemAt(lastPointer.x, lastPointer.y);
      canvas.style.cursor = hovered !== undefined && hovered !== items[featuredIndex] ? 'pointer' : '';
    }

    renderer.render(scene, camera);
    writeAnchors();
    options.onFrame(anchors);
    if (!ready) {
      ready = true;
      options.onReady();
    }
  }

  function setFeaturedLeds(): void {
    items.forEach((item, index) => {
      item.led.start(index === featuredIndex ? 1 : 0.45, reducedMotion ? 0 : 0.8);
      item.emphasis.start(index === featuredIndex ? 1 : SIDE_SCALE, reducedMotion ? 0 : SWITCH_SECONDS);
    });
  }
  setFeaturedLeds();

  // ── Ciclo de vida ───────────────────────────────────────────
  let inView = true;
  let running = false;
  let compiled = false;
  function syncLoop(): void {
    const shouldRun = compiled && inView && document.visibilityState === 'visible';
    if (shouldRun === running) return;
    running = shouldRun;
    lastTimestamp = null;
    renderer.setAnimationLoop(shouldRun ? renderFrame : null);
  }

  const resizeObserver = new ResizeObserver(() => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    framingDirty = true;
  });
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? true;
    syncLoop();
  });
  intersectionObserver.observe(canvas);
  document.addEventListener('visibilitychange', syncLoop);
  // Shaders precompilados antes del primer frame: la entrada no pierde cuadros compilando a mitad de animación.
  void renderer.compileAsync(scene, camera).then(() => {
    compiled = true;
    syncLoop();
  });

  return {
    show(id: ServiceId): void {
      const index = order.indexOf(id);
      if (index < 0) throw new Error(`Unknown service "${id}".`);
      if (index === featuredIndex) return;
      const step = (index - featuredIndex + order.length) % order.length === 1 ? -RING_STEP : RING_STEP;
      featuredIndex = index;
      ringAngle.start(ringAngle.target + step, reducedMotion ? 0 : SWITCH_SECONDS);
      dollyElapsed = 0;
      setFeaturedLeds();
    },
    refreshLayout(): void {
      framingDirty = true;
    },
    dispose(): void {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', syncLoop);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      disposeScene(scene);
      environment.dispose();
      renderer.dispose();
    },
  };
}
