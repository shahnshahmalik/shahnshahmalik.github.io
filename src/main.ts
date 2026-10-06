import '@fontsource/outfit/latin-400.css';
import '@fontsource/outfit/latin-600.css';
import '@fontsource/silkscreen/latin-400.css';
import './style.css';
import { IslandScene, SPOTS, type PanelId } from './scene';

const world = document.querySelector<HTMLElement>('#world');
const canvas = document.querySelector<HTMLCanvasElement>('#scene');
const backdrop = document.querySelector<HTMLElement>('#backdrop');

if (!world || !canvas || !backdrop) {
  throw new Error('Portfolio shell is missing');
}

const root: HTMLElement = world;
const dimmer: HTMLElement = backdrop;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene = new IslandScene(canvas, reduced);

const PANELS: PanelId[] = ['about', 'work', 'contact'];
let current: PanelId | null = null;
let opener: HTMLElement | null = null;

function isPanel(value: string | null | undefined): value is PanelId {
  return value === 'about' || value === 'work' || value === 'contact';
}

function readHash(): PanelId | null {
  const id = location.hash.replace('#', '');
  return isPanel(id) ? id : null;
}

function panelEl(id: PanelId): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing panel ${id}`);
  return el;
}

function placeSpots(): void {
  const { bw, bh, ox, oy } = scene.metrics();
  for (const spot of SPOTS) {
    const el = root.querySelector<HTMLElement>(`#spots [data-panel="${spot.id}"]`);
    if (!el) continue;
    el.style.left = `${((ox + spot.x) / bw) * 100}%`;
    el.style.top = `${((oy + spot.y) / bh) * 100}%`;
    el.style.width = `${(spot.w / bw) * 100}%`;
    el.style.height = `${(spot.h / bh) * 100}%`;
  }
}

function setPressed(id: PanelId | null): void {
  root.querySelectorAll<HTMLElement>('[data-panel]').forEach((el) => {
    if (el.closest('.panel')) return;
    el.setAttribute('aria-pressed', el.dataset.panel === id ? 'true' : 'false');
  });
}

function setOpen(id: PanelId | null, focus = true): void {
  current = id;
  dimmer.hidden = id === null;
  for (const panelId of PANELS) {
    const el = panelEl(panelId);
    const on = panelId === id;
    el.hidden = !on;
    if (on && focus) {
      const closeBtn = el.querySelector<HTMLElement>('[data-close]');
      (closeBtn ?? el).focus({ preventScroll: true });
    }
  }
  setPressed(id);
  if (id === null && focus && opener) {
    opener.focus({ preventScroll: true });
    opener = null;
  }
}

function navigate(id: PanelId | null, source?: HTMLElement): void {
  if (source) opener = source;
  if (id !== null && current === id) {
    navigate(null);
    return;
  }
  const bare = `${location.pathname}${location.search}`;
  if (id === null) {
    if (location.hash) history.pushState({ panel: null }, '', bare);
    setOpen(null);
    return;
  }
  if (location.hash !== `#${id}`) history.pushState({ panel: id }, '', `#${id}`);
  setOpen(id);
}

function focusables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])')].filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
  );
}

root.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest('[data-close]')) {
    navigate(null);
    return;
  }
  if (target.closest('.panel')) return;
  const trigger = target.closest<HTMLElement>('[data-panel]');
  if (!trigger || !isPanel(trigger.dataset.panel)) return;
  navigate(trigger.dataset.panel, trigger);
});

dimmer.addEventListener('click', () => navigate(null));

document.addEventListener('keydown', (event) => {
  if (!current) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    navigate(null);
    return;
  }
  if (event.key !== 'Tab') return;
  const dialog = panelEl(current);
  const items = focusables(dialog);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener('popstate', () => {
  setOpen(readHash(), readHash() !== null);
});

window.addEventListener('resize', () => {
  scene.resize();
  placeSpots();
});

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
motion.addEventListener('change', () => {
  scene.stop();
  window.location.reload();
});

scene.start();
placeSpots();

const initial = readHash();
if (initial) {
  opener = root.querySelector<HTMLElement>(`#inventory [data-panel="${initial}"]`);
  setOpen(initial);
} else {
  setPressed(null);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) scene.stop();
  else if (!reduced) scene.start();
});
