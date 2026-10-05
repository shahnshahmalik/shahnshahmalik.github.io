# Shahnshah Malik

Personal site for Shahnshah Malik, a senior Angular developer in New Delhi. Scrolling walks through how a language model turns a sentence into the next word, then lands on selected work and contact.

Chapters, in order: Landing, Prompt, Tokens, Embeddings, Attention, Transformer block, Next token, Work, Contact.

## Preview locally

```bash
npm install
npm run dev
```

Vite prints a local URL, usually http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` typechecks and writes a static site to `dist/`. The core experience does not need a backend. Any static host can serve `dist/`.

## GitHub Pages

Pushing to `master` runs `.github/workflows/pages.yml`, which publishes `dist/`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Diagrams

Embeddings, attention, and the transformer block use WebGL when the screen is wide enough and the browser is not on a software renderer. Otherwise those chapters show a flat diagram. Add `?diagram=2d` to force the flat diagrams, or `?diagram=3d` to try WebGL anyway.

Keyboard: Tab reaches the chapter list, work, contact, token chips, and the optional terminal. Page Down and the scroll hint move between chapters. `prefers-reduced-motion` keeps the same chapters without the looping motion.
