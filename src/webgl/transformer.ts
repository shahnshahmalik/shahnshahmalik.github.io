import * as THREE from 'three';
import { fitRenderer, makeRenderer, rafLoop, type SceneController } from './renderer';

const LAYERS = [
  { id: 'attention', y: 1.2 },
  { id: 'ff', y: 0 },
  { id: 'residual', y: -1.2 },
] as const;

function smooth(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function mountTransformer(slot: HTMLElement, labels: HTMLElement[]): SceneController {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  slot.append(canvas);

  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(2.35, 0.35, 6.7);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xfff1dc, 1.8);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9eb8aa, 0.4);
  rim.position.set(-4, -2, -2);
  scene.add(rim);

  const slabGeo = new THREE.BoxGeometry(3.3, 0.5, 1.55);
  const slabs = LAYERS.map((layer) => {
    const material = new THREE.MeshStandardMaterial({
      color: 0x1b201c,
      emissive: 0xe4a45e,
      emissiveIntensity: 0.04,
      roughness: 0.42,
      metalness: 0.18,
    });
    const mesh = new THREE.Mesh(slabGeo, material);
    mesh.position.y = layer.y;
    scene.add(mesh);
    return mesh;
  });

  const token = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 28, 20),
    new THREE.MeshStandardMaterial({
      color: 0xe4a45e,
      emissive: 0xe4a45e,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    }),
  );
  scene.add(token);

  const ghostMat = new THREE.MeshBasicMaterial({
    color: 0xf4f0e8,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const ghost = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), ghostMat);
  scene.add(ghost);

  const reduce = document.documentElement.classList.contains('reduce');
  let elapsed = reduce ? 6 : 0;
  let playing = !reduce;

  function setHot(index: number): void {
    slabs.forEach((slab, i) => {
      const material = slab.material as THREE.MeshStandardMaterial;
      const on = i === index;
      material.emissiveIntensity += ((on ? 0.62 : 0.05) - material.emissiveIntensity) * 0.15;
    });
    labels.forEach((label, i) => label.classList.toggle('is-hot', i === index));
  }

  function apply(time: number): void {
    if (reduce || time >= 5.1) {
      token.position.set(0, -1.2, 0.55);
      ghostMat.opacity = 0;
      setHot(2);
      playing = false;
      return;
    }
    if (time < 0.45) {
      token.position.set(0, 2.15, 0.55);
      ghost.position.set(-2.4, -1.2, 0.55);
      ghostMat.opacity = 0;
      setHot(-1);
      return;
    }
    if (time < 1.55) {
      const u = smooth((time - 0.45) / 0.75);
      token.position.set(0, mix(2.15, 1.2, u), 0.55);
      setHot(0);
      return;
    }
    if (time < 2.7) {
      const u = smooth((time - 1.55) / 0.75);
      token.position.set(0, mix(1.2, 0, u), 0.55);
      setHot(1);
      return;
    }
    if (time < 3.7) {
      const u = smooth((time - 2.7) / 0.7);
      token.position.set(0, mix(0, -1.2, u), 0.55);
      ghost.position.set(-2.4, -1.2, 0.55);
      ghostMat.opacity = 0;
      setHot(2);
      return;
    }
    const u = smooth((time - 3.7) / 0.95);
    token.position.set(0, -1.2, 0.55);
    ghost.position.set(mix(-2.4, 0.02, u), -1.2, 0.55);
    ghostMat.opacity = Math.sin(u * Math.PI) * 0.85;
    setHot(2);
  }

  apply(elapsed);

  const loop = rafLoop((dt) => {
    if (playing) elapsed += dt;
    apply(elapsed);
    renderer.render(scene, camera);
  });

  const resize = () => {
    const { w, h } = fitRenderer(renderer, slot);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(slot);
  resize();

  return {
    start: () => loop.start(),
    stop: () => loop.stop(),
    resize,
    replay() {
      if (reduce) return;
      elapsed = 0;
      playing = true;
      labels.forEach((label) => label.classList.remove('is-hot'));
      loop.start();
    },
    dispose() {
      loop.stop();
      observer.disconnect();
      slabGeo.dispose();
      token.geometry.dispose();
      ghost.geometry.dispose();
      slabs.forEach((slab) => (slab.material as THREE.Material).dispose());
      (token.material as THREE.Material).dispose();
      ghostMat.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
