import * as THREE from 'three';
import { fitRenderer, makeRenderer, placeLabel, rafLoop, type SceneController } from './renderer';

export type CloudWord = {
  word: string;
  color: string;
  x: number;
  y: number;
  z: number;
  near: string;
};

export function mountEmbeddings(host: HTMLElement, words: CloudWord[], detail: HTMLElement): SceneController {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const layer = document.createElement('div');
  layer.className = 'label-layer';
  host.append(canvas, layer);

  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x101210, 0.035);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
  camera.position.set(0, 0.15, 7.6);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const key = new THREE.DirectionalLight(0xfff4e4, 1.6);
  key.position.set(4, 5, 6);
  scene.add(key);

  const group = new THREE.Group();
  scene.add(group);

  const reduce = document.documentElement.classList.contains('reduce');
  const meshes: THREE.Mesh[] = [];
  const labels: HTMLButtonElement[] = [];
  const tmp = new THREE.Vector3();

  words.forEach((word, i) => {
    const color = new THREE.Color(word.color);
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 22, 16),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.45,
        roughness: 0.38,
        metalness: 0.08,
      }),
    );
    mesh.position.set(word.x, word.y, word.z);
    mesh.userData.baseY = word.y;
    mesh.userData.phase = i * 0.7;
    group.add(mesh);
    meshes.push(mesh);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cloud-label';
    btn.textContent = word.word;
    btn.style.setProperty('--c', word.color);
    btn.addEventListener('pointerenter', () => highlight(i));
    btn.addEventListener('focus', () => highlight(i));
    layer.append(btn);
    labels.push(btn);
  });

  function highlight(index: number): void {
    meshes.forEach((mesh, i) => {
      mesh.scale.setScalar(i === index ? 1.65 : 1);
      labels[i].classList.toggle('is-on', i === index);
    });
    const word = words[index];
    detail.textContent = `${word.word} — ${word.near}`;
  }

  let pointerX = 0;
  let pointerY = 0;
  const onPointer = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  };
  host.addEventListener('pointermove', onPointer);

  let yaw = 0.4;
  const loop = rafLoop((dt) => {
    if (!reduce) yaw += dt * 0.18;
    group.rotation.y += (yaw + pointerX * 0.28 - group.rotation.y) * 0.06;
    group.rotation.x += (pointerY * -0.12 - group.rotation.x) * 0.06;
    const time = performance.now() / 1000;
    meshes.forEach((mesh) => {
      const baseY = mesh.userData.baseY as number;
      const phase = mesh.userData.phase as number;
      mesh.position.y = reduce ? baseY : baseY + Math.sin(time * 0.7 + phase) * 0.045;
    });
    renderer.render(scene, camera);
    meshes.forEach((mesh, i) => {
      mesh.getWorldPosition(tmp);
      placeLabel(tmp, camera, host, labels[i]);
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
    start: () => loop.start(),
    stop: () => loop.stop(),
    resize,
    dispose() {
      loop.stop();
      observer.disconnect();
      host.removeEventListener('pointermove', onPointer);
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      canvas.remove();
      layer.remove();
    },
  };
}
