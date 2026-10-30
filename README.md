# Upasana Sahu — Portfolio

Interactive portfolio for Upasana R. Sahu, clinician-scientist and PhD candidate in Rehabilitation Sciences at the University of Illinois Chicago.

Built with React + Vite. The build produces a single self-contained `dist/index.html`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Edit content

All text, numbers, publications and awards live in `src/data.js`. Components only render that data.

| File | What it does |
|---|---|
| `src/walker.js` | Simulated motion-capture walker (gait cycle + trip perturbation) used by the hero and the game |
| `src/components/Hero.jsx` | Point-light walker, live kinematic trace, animated stats |
| `src/components/Sides.jsx` | Scientist / Clinician / Person tabs, skill → project map |
| `src/components/Education.jsx` | Degrees, dissertation, coursework credits chart |
| `src/components/Research.jsx` | Computed facts, output timeline, co-author network, publications |
| `src/components/Awards.jsx` | Award shelf by year |
| `src/components/Future.jsx` | Roadmap |
| `src/components/Game.jsx` | Single- vs dual-task reaction game |
| `src/components/Contact.jsx` | Contact block |

## Deploy

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`
(enable it once under **Settings → Pages → Source: GitHub Actions**).
