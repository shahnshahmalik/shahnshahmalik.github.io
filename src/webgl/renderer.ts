import * as THREE from 'three';

export function makeRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

export function fitRenderer(renderer: THREE.WebGLRenderer, host: HTMLElement): { w: number; h: number } {
  const w = Math.max(1, host.clientWidth);
  const h = Math.max(1, host.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(w, h, false);
  return { w, h };
}

export function rafLoop(fn: (dt: number) => void): { start: () => void; stop: () => void } {
  let id = 0;
  let running = false;
  let last = 0;
  const tick = (now: number) => {
    if (!running) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    id = requestAnimationFrame(tick);
    fn(dt);
  };
  return {
    start() {
      if (running) return;
      running = true;
      last = 0;
      id = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(id);
    },
  };
}

const projected = new THREE.Vector3();

export function placeLabel(
  world: THREE.Vector3,
  camera: THREE.Camera,
  host: HTMLElement,
  el: HTMLElement,
  shiftY = '-130%',
): void {
  projected.copy(world).project(camera);
  const x = (projected.x * 0.5 + 0.5) * host.clientWidth;
  const y = (-projected.y * 0.5 + 0.5) * host.clientHeight;
  const visible = projected.z < 1 && x > -40 && x < host.clientWidth + 40 && y > -40 && y < host.clientHeight + 40;
  el.style.transform = `translate(${x}px, ${y}px) translate(-50%, ${shiftY})`;
  el.style.visibility = visible ? 'visible' : 'hidden';
}

export type SceneController = {
  start: () => void;
  stop: () => void;
  resize: () => void;
  dispose: () => void;
  replay?: () => void;
};
