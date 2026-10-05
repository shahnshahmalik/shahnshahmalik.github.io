import * as THREE from 'three';
import { fitRenderer, makeRenderer, placeLabel, rafLoop, type SceneController } from './renderer';

export type AttentionWord = {
  word: string;
  weight: number;
  x: number;
  y: number;
  z: number;
  source?: boolean;
};

type Beam = {
  mesh: THREE.Mesh;
  from: THREE.Vector3;
  dir: THREE.Vector3;
  length: number;
  delay: number;
};

export function mountAttention(host: HTMLElement, words: AttentionWord[]): SceneController {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const layer = document.createElement('div');
  layer.className = 'label-layer';
  host.append(canvas, layer);

  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0.35, 7.4);

  const group = new THREE.Group();
  scene.add(group);

  const source = words.find((word) => word.source) ?? words[2];
  const origin = new THREE.Vector3(source.x, source.y, source.z);
  const labels: HTMLElement[] = [];
  const anchors: THREE.Object3D[] = [];

  words.forEach((word) => {
    const anchor = new THREE.Object3D();
    anchor.position.set(word.x, word.y, word.z);
    group.add(anchor);
    anchors.push(anchor);

    const label = document.createElement('span');
    label.className = 'attn-label' + (word.source ? ' is-source' : '');
    label.textContent = word.word;
    layer.append(label);
    labels.push(label);
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.28, 0.015, 8, 40),
    new THREE.MeshBasicMaterial({ color: 0xe4a45e }),
  );
  ring.position.copy(origin);
  group.add(ring);

  const beams: Beam[] = words
    .filter((word) => !word.source)
    .sort((a, b) => b.weight - a.weight)
    .map((word, index) => {
      const target = new THREE.Vector3(word.x, word.y, word.z);
      const delta = new THREE.Vector3().subVectors(target, origin);
      const length = delta.length();
      const dir = delta.normalize();
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012 + word.weight * 0.028, 0.01, 1, 8, 1, true),
        new THREE.MeshBasicMaterial({
          color: 0xe4a45e,
          transparent: true,
          opacity: 0.18 + word.weight * 0.75,
          depthWrite: false,
        }),
      );
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      mesh.scale.y = 0.001;
      group.add(mesh);
      return { mesh, from: origin.clone(), dir, length, delay: index * 0.14 };
    });

  let elapsed = 0;
  let started = false;
  const reduce = document.documentElement.classList.contains('reduce');
  const tmp = new THREE.Vector3();

  function placeBeam(beam: Beam, grow: number): void {
    const amount = Math.max(0.001, beam.length * grow);
    beam.mesh.scale.y = amount;
    beam.mesh.position.copy(beam.from).addScaledVector(beam.dir, amount / 2);
  }

  const loop = rafLoop((dt) => {
    if (started) elapsed += dt;
    const spin = reduce ? 0 : elapsed * 0.35;
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.z = spin;
    beams.forEach((beam) => {
      const linear = reduce ? 1 : Math.min(1, Math.max(0, (elapsed - beam.delay) / 0.7));
      const grow = linear * linear * (3 - 2 * linear);
      placeBeam(beam, grow);
    });
    group.rotation.y = Math.sin(elapsed * 0.25) * (reduce ? 0 : 0.08);
    renderer.render(scene, camera);
    anchors.forEach((anchor, i) => {
      anchor.getWorldPosition(tmp);
      placeLabel(tmp, camera, host, labels[i], '-160%');
    });
  });

  const resize = () => {
    const { w, h } = fitRenderer(renderer, host);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  return {
    start() {
      started = true;
      loop.start();
    },
    stop: () => loop.stop(),
    resize,
    replay() {
      elapsed = 0;
      started = true;
      loop.start();
    },
    dispose() {
      loop.stop();
      observer.disconnect();
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material as THREE.Material | undefined;
        material?.dispose();
      });
      renderer.dispose();
      canvas.remove();
      layer.remove();
    },
  };
}
