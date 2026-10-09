# Shahnshah

One-page portfolio. Static HTML, CSS, and JavaScript — GitHub Pages serves this repository from the site root. No build step.

This version is a scroll-led story: the practice first, then the journey from Estater to Upwork, then what the work is for. Smooth scrolling and pinned sequences run on a fine pointer, a wide viewport, and when the visitor has not asked for reduced motion. Smaller screens and reduced-motion preferences get the same content in a direct editorial layout.

Display name on the site is Shahnshah. Location on the site is New Delhi, India.

## Run locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

Any static server works the same way. Paths are relative, so the site does not need to be mounted at `/`.

Resume file: [public/Shahnshah-Malik-Resume.docx](public/Shahnshah-Malik-Resume.docx).

## Deploy

On a user GitHub Pages site, the default branch root is the site. There is no install and no build. `.nojekyll` keeps Pages from running Jekyll on these files.

Scroll libraries (GSAP ScrollTrigger and Lenis) load from a CDN in the browser. The page stays readable if they do not load.
