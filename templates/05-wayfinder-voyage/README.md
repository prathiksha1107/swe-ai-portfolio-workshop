# Wayfinder Voyage

Status: Experimental  
Template ID: `05-wayfinder-voyage`  
Workshop Ready: Testing

## What this template is

An original, story-driven ocean-wayfinding portfolio. Scrolling moves the visitor
through a sunlit shore, open water, a night navigation chapter, and a green-island
homecoming. The visual world uses lightweight HTML and CSS illustration; it does not
require a 3D model or copy characters and places from an existing film.

Portfolio facts remain readable above every scene. The interactive constellation is
keyboard accessible, and reduced-motion preferences disable ambient movement.

## Technology

- React and TypeScript
- Vite
- GSAP and ScrollTrigger
- Modern CSS illustration

There is no backend, database, authentication, paid API, runtime secret, or required
image service.

## Files participants normally change

- `PROFILE.md`: the human-reviewed profile created by the workshop workflow.
- `src/data/profile.ts`: public content generated from the approved profile.
- `public/assets/resume.pdf`: an optional approved public resume.
- `index.html`: metadata and the documented analytics insertion point.

The scenery lives in `src/components/layout/VoyageBackdrop.tsx`. The star activity
lives in `src/components/interactive/StarWayfinding.tsx`. Participants normally do
not need to edit either file.

## Run locally

```bash
npm install
npm run dev -- --port 5175
```

Open `http://localhost:5175/`. Stop the server with `Ctrl+C`.

## Build and preview

```bash
npm run build
npm run preview
```

The production site is written to `dist/`. Vite uses relative asset paths so this
output works in a GitHub Pages repository subfolder.

## Portfolio workflow

Use the workshop sequence:

**Resume → Skill 01 → `PROFILE.md` → Human approval → Skill 02 → Portfolio → Human
review → Skill 03**

Skill 02 should update only approved public facts in `src/data/profile.ts`, hide
missing links, and preserve the voyage narrative.

## Resume and analytics

The Resume control stays hidden while `resumeUrl` is blank. To enable it, add an
approved file at `public/assets/resume.pdf` and set `resumeUrl` to
`./assets/resume.pdf`.

Add analytics only with the participant's own project ID. Follow
`guides/04-add-free-analytics.md`; never copy an analytics ID from an example site.
