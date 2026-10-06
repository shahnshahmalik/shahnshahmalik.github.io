# Shahnshah Malik

Personal site for Shahnshah Malik, a senior Angular developer in New Delhi. One fixed viewport: a rainy night on a floating island. The cottage, campfire, and pond open About, Work, and Contact on top of the scene.

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

`npm run build` typechecks and writes a static site to `dist/`. The page does not need a backend.

## GitHub Pages

Pushing to `master` runs `.github/workflows/pages.yml`, which publishes `dist/`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Assets

The island is original pixel art drawn in `src/scene.ts`. A rainy-night floating-island picture was used as a composition reference only and is not included in the site or the build.

Fonts, bundled locally (SIL Open Font License):

- [Outfit](https://fonts.google.com/specimen/Outfit) via `@fontsource/outfit`
- [Silkscreen](https://fonts.google.com/specimen/Silkscreen) via `@fontsource/silkscreen`

`prefers-reduced-motion` draws the scene once, without rain, smoke, or fire loops.
