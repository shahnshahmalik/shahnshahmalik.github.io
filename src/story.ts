import { mountAttention, type AttentionWord } from './webgl/attention';
import { mountEmbeddings, type CloudWord } from './webgl/embeddings';
import type { SceneController } from './webgl/renderer';
import { useWebGL } from './webgl/support';
import { mountTransformer } from './webgl/transformer';

type Step = { add: string; options: { word: string; p: number }[] };

type ModelData = {
  cloud: CloudWord[];
  attention: AttentionWord[];
  steps: Step[];
};

type StageBinding = {
  sync: (active: boolean) => '2d' | '3d';
  replay: () => void;
  dispose: () => void;
};

function must<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing #${id}`);
  return node as T;
}

function bindStage(stage: HTMLElement, mount: (host: HTMLElement) => SceneController): StageBinding {
  const fallback = stage.querySelector<HTMLElement>(':scope > .fallback');
  const host = stage.querySelector<HTMLElement>(':scope > .webgl-host');
  if (!fallback || !host) throw new Error('Stage is missing a diagram');

  let ctrl: SceneController | null = null;
  let failed = false;
  let running = false;

  const sync = (active: boolean): '2d' | '3d' => {
    const want = useWebGL() && !failed;
    if (want && active && !ctrl) {
      host.hidden = false;
      fallback.hidden = true;
      try {
        const slot = host.querySelector<HTMLElement>('.gl-slot') ?? host;
        ctrl = mount(slot);
        ctrl.resize();
      } catch (error) {
        console.warn(error);
        failed = true;
        ctrl?.dispose();
        ctrl = null;
        host.hidden = true;
        fallback.hidden = false;
      }
    } else if (!want && ctrl) {
      ctrl.dispose();
      ctrl = null;
      running = false;
      host.hidden = true;
      fallback.hidden = false;
    }

    if (ctrl && active && !running) {
      ctrl.resize();
      ctrl.start();
      running = true;
    } else if (ctrl && !active && running) {
      ctrl.stop();
      running = false;
    }
    return ctrl ? '3d' : '2d';
  };

  return {
    sync,
    replay() {
      ctrl?.replay?.();
    },
    dispose() {
      ctrl?.dispose();
    },
  };
}

function setupSpy(onEnter: (id: string) => void, onActive: (id: string) => void): void {
  const sections = [...document.querySelectorAll<HTMLElement>('.chapter')];
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.rail a')];
  let current = '';

  const update = () => {
    const mark = window.innerHeight * 0.42;
    let best = sections[0];
    let bestDist = Number.POSITIVE_INFINITY;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
      const anchor = rect.top < mark && rect.bottom > mark ? 0 : Math.abs(rect.top - mark);
      if (anchor < bestDist) {
        bestDist = anchor;
        best = section;
      }
    }
    sections.forEach((section) => section.classList.toggle('is-active', section === best));
    links.forEach((link) => {
      const on = link.getAttribute('href') === `#${best.id}`;
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    onActive(best.id);
    if (best.id !== current) {
      current = best.id;
      onEnter(best.id);
    }
  };

  let ticking = false;
  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('hashchange', request);
  update();
  window.setTimeout(update, 60);
}

function setupJumps(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector<HTMLElement>(id);
      window.setTimeout(() => target?.focus({ preventScroll: true }), 0);
    });
  });
}

function setupTerminal(): void {
  const form = must<HTMLFormElement>('term');
  const input = must<HTMLInputElement>('term-input');
  const log = must<HTMLElement>('term-log');
  const replies: Record<string, string> = {
    help: 'hire     say hello\nresume   short background\nclear    wipe this screen',
    hire: 'Available for senior Angular work on SaaS products.\nshahnshahmalik@protonmail.com\nshahenshah.malik@hotmail.com',
    resume: [
      'Shahnshah Malik — senior Angular developer, New Delhi.',
      'Angular front ends for SaaS, including the UI around AI.',
      'InnerSpace — FabricJS floor plans, GoodData, about 40% faster loads.',
      'Appcarry — Angular 12 to 17, AI UI.',
      'Prospecta — SAP data-governance UI.',
      'Estater — GCC property tools.',
    ].join('\n'),
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const command = input.value.trim().toLowerCase();
    input.value = '';
    if (!command) return;
    if (command === 'clear') {
      log.textContent = '';
      return;
    }
    const reply = replies[command] ?? 'Try hire or resume.';
    const prior = log.textContent ? `${log.textContent}\n\n` : '';
    log.textContent = `${prior}$ ${command}\n${reply}`;
  });
}

function setupNext(steps: Step[]): { enter: () => void } {
  const added = must<HTMLElement>('added');
  const list = must<HTMLOListElement>('bars');
  const items = [...list.querySelectorAll<HTMLLIElement>('li')];
  const reduce = document.documentElement.classList.contains('reduce');
  let generation = 0;
  let played = false;

  if (reduce) added.textContent = ' live.';

  const paint = (step: Step, scale: 'zero' | 'full', mark: boolean) => {
    const top = step.options.reduce((best, option) => (option.p > best.p ? option : best)).word;
    items.forEach((item, index) => {
      const option = step.options[index];
      if (!option) return;
      const word = item.querySelector<HTMLElement>('.bw');
      const percent = item.querySelector<HTMLElement>('.bp');
      const fill = item.querySelector<HTMLElement>('.fill');
      if (word) word.textContent = option.word;
      if (percent) percent.textContent = `${Math.round(option.p * 100)}%`;
      fill?.style.setProperty('--p', scale === 'zero' ? '0' : String(option.p));
      const winner = mark && option.word === top;
      item.classList.toggle('is-top', winner);
      if (!winner) item.classList.remove('is-snap');
    });
  };

  const wait = (ms: number, token: number) =>
    new Promise<boolean>((resolve) => {
      window.setTimeout(() => resolve(token === generation), ms);
    });

  const play = async () => {
    const token = ++generation;
    added.textContent = '';
    let built = '';
    for (const step of steps) {
      list.classList.add('no-anim');
      paint(step, 'zero', false);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (token !== generation) return;
      list.classList.remove('no-anim');
      paint(step, 'full', false);
      if (!(await wait(980, token))) return;
      paint(step, 'full', true);
      items.forEach((item) => {
        if (item.classList.contains('is-top')) item.classList.add('is-snap');
      });
      built += step.add;
      added.textContent = built;
      if (!(await wait(720, token))) return;
    }
  };

  document.querySelector<HTMLButtonElement>('[data-replay="next"]')?.addEventListener('click', () => {
    if (reduce) return;
    played = true;
    void play();
  });

  return {
    enter() {
      if (reduce || played) return;
      played = true;
      void play();
    },
  };
}

function setupPass2d(stack: HTMLElement): { play: () => void } {
  const layers = [...stack.querySelectorAll<HTMLElement>('.layer')];
  const dot = stack.querySelector<HTMLElement>('.pass-dot');
  const skip = stack.querySelector<HTMLElement>('.skip-dot');
  const reduce = document.documentElement.classList.contains('reduce');
  let generation = 0;

  if (!dot || !skip) return { play() {} };

  const place = (index: number) => {
    const layer = layers[index];
    if (!layer) return;
    const top = layer.offsetTop + layer.clientHeight / 2 - dot.offsetHeight / 2;
    dot.style.top = `${top}px`;
  };

  const hot = (index: number) => {
    layers.forEach((layer, i) => layer.classList.toggle('is-hot', i === index));
  };

  if (reduce) {
    dot.hidden = true;
    skip.hidden = true;
    return { play() {} };
  }

  place(0);

  const play = () => {
    const token = ++generation;
    dot.hidden = false;
    skip.hidden = false;
    skip.style.opacity = '0';
    skip.style.right = '0.75rem';
    hot(-1);
    dot.style.transition = 'none';
    dot.style.top = '0.2rem';
    window.setTimeout(() => {
      if (token !== generation) return;
      dot.style.transition = '';
      place(0);
      hot(0);
    }, 40);
    window.setTimeout(() => {
      if (token !== generation) return;
      place(1);
      hot(1);
    }, 1200);
    window.setTimeout(() => {
      if (token !== generation) return;
      place(2);
      hot(2);
      const residual = layers[2];
      if (!residual) return;
      skip.style.transition = 'none';
      skip.style.top = `${residual.offsetTop + residual.clientHeight / 2 - skip.offsetHeight / 2}px`;
      skip.style.right = '0.75rem';
      skip.style.opacity = '1';
      requestAnimationFrame(() => {
        skip.style.transition = 'right 0.85s ease, opacity 0.45s ease';
        skip.style.right = 'calc(100% - 2.15rem)';
      });
    }, 2400);
    window.setTimeout(() => {
      if (token !== generation) return;
      skip.style.opacity = '0';
    }, 3300);
  };

  return { play };
}

export function boot(): void {
  const raw = document.getElementById('model-data')?.textContent ?? '{}';
  const data = JSON.parse(raw) as ModelData;
  const reduce = document.documentElement.classList.contains('reduce');

  setupJumps();
  setupTerminal();
  const next = setupNext(data.steps);

  const embeddingStage = must<HTMLElement>('embedding-stage');
  const attentionStage = must<HTMLElement>('attention-stage');
  const blockStage = must<HTMLElement>('block-stage');
  const detail = must<HTMLElement>('cloud-detail');

  const embeddings = bindStage(embeddingStage, (host) => mountEmbeddings(host, data.cloud, detail));
  const attention = bindStage(attentionStage, (host) => mountAttention(host, data.attention));
  const labels = [...blockStage.querySelectorAll<HTMLElement>('.layer-readout li')];
  const transformer = bindStage(blockStage, (slot) => mountTransformer(slot, labels));
  const pass2d = setupPass2d(must<HTMLElement>('stack-2d'));
  let passPlayed = false;

  const replayPass = document.querySelector<HTMLButtonElement>('[data-replay="pass"]');
  replayPass?.addEventListener('click', () => {
    if (reduce) return;
    const mode = transformer.sync(true);
    if (mode === '3d') transformer.replay();
    else pass2d.play();
    passPlayed = true;
  });

  const sync = (id: string) => {
    embeddings.sync(id === 'chapter-3');
    attention.sync(id === 'chapter-4');
    const mode = transformer.sync(id === 'chapter-5');
    if (id === 'chapter-5' && mode === '2d' && !passPlayed && !reduce) {
      passPlayed = true;
      window.setTimeout(() => pass2d.play(), 120);
    }
  };

  setupSpy(
    (id) => {
      if (id === 'chapter-6') next.enter();
      sync(id);
    },
    (id) => {
      sync(id);
    },
  );

  window.addEventListener('pagehide', () => {
    embeddings.dispose();
    attention.dispose();
    transformer.dispose();
  });
}
