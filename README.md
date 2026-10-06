# Shahnshah

Personal site for Shahnshah, a senior Angular developer in New Delhi. One fixed viewport: a floating island whose sky follows the visitor’s local time. The cottage, campfire, and pond open About, Work, and Contact on top of the scene. Resume downloads from the gold button and from Contact.

## Preview locally

```bash
npm install
npm run dev
```

Vite prints a local URL, usually http://localhost:5173.

Add `?hour=7`, `?hour=12`, `?hour=18`, or `?hour=22` to preview morning, day, evening, and night. Without that query the scene uses the browser’s local clock.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` typechecks and writes a static site to `dist/`. The page does not need a backend.

## GitHub Pages

Pushing to `master` runs `.github/workflows/pages.yml`, which publishes `dist/`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Assets

The island is original pixel art drawn in `src/scene.ts`. A rainy-night floating-island picture was used as a composition reference only and is not included in the site or the build. Night keeps that rainy look. Morning, day, and evening change the sky, sun, grass, and window light. Rain falls at night.

`public/Shahnshah-Malik-Resume.docx` is the downloadable resume. The filename keeps the full name; the page itself shows the first name only.

Fonts, bundled locally (SIL Open Font License):

- [Outfit](https://fonts.google.com/specimen/Outfit) via `@fontsource/outfit`
- [Silkscreen](https://fonts.google.com/specimen/Silkscreen) via `@fontsource/silkscreen`

`prefers-reduced-motion` draws the scene once, without rain, smoke, or fire loops, and refreshes the time of day about once a minute.
