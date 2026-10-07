# Shahnshah

One-page portfolio. Static HTML, CSS, and JavaScript — no build step. GitHub Pages serves this repository from the site root.

The page is a practice register: skills are the first answer, then a calendar of the work you can point at. Display name on the site is Shahnshah.

## Run locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

Any static server works the same way (`npx serve`, VS Code Live Server). Paths are relative, so the site does not need to be mounted at `/`.

Resume file: [public/Shahnshah-Malik-Resume.docx](public/Shahnshah-Malik-Resume.docx).

## Deploy

On a user GitHub Pages site, the default branch root is the site. There is no install and no build. `.nojekyll` keeps Pages from running Jekyll on these files.
