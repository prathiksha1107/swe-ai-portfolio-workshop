# Chibi 3D Story

Status: Experimental  
Template ID: `04-chibi-3d-story`  
Workshop Ready: Testing

## What this template is

This is a polished professional portfolio guided by one interactive 3D chibi
character. The character greets the visitor, settles into an idle pose, follows the
desktop pointer gently in the Hero, and changes prominence as the visitor moves
through the story. The text remains complete when the model or JavaScript is not
available.

Participants do not need to know React or Three.js. They work with their resume,
`PROFILE.md`, an AI assistant, and GitHub. The technical complexity stays inside the
template.

## Technology

- React and TypeScript
- Vite
- React Three Fiber, Drei, and Three.js
- GSAP, ScrollTrigger, and the GSAP React integration
- Modern CSS

The primary call-to-action interaction is adapted from the MIT-licensed Uiverse
Galaxy component `0x-Sarthak_hungry-penguin-30.html`, recolored and rebuilt for
this template's accessibility, focus, and reduced-motion requirements.

There is no backend, database, authentication, paid API, or runtime secret.

## Files participants normally use

- `PROFILE.md`: the human-reviewed content contract used by the workshop skills.
- `src/data/profile.ts`: the centralized public content generated from an approved
  profile. Participants should not edit the 3D files.
- `public/models/chibi.glb`: the final character model.
- `public/assets/resume.pdf`: the optional approved public resume.
- `index.html`: page metadata and the documented Microsoft Clarity insertion point.

## Add the character

Place the model at:

```text
public/models/chibi.glb
```

Do not rename it. If it is missing, the page shows a tasteful abstract development
character and continues working.

Preferred animation clip names:

- `Greet` plays once on initial load.
- `Idle` fades in after Greet finishes and loops.

Clip matching is case-insensitive. `Wave` and `Hello` are accepted as greeting
alternatives. If Greet is missing, Idle starts immediately. If Idle is also missing,
the model remains in its default pose. Visitors requesting reduced motion see the
default pose without automatic character animation.

The loader searches safely for Head, Neck, Chest, UpperChest, and common prefixed
bone names. Head movement is strongest, Neck is lighter, and Chest/Spine is subtle.
When those bones do not exist, restrained whole-model rotation is used instead.

## Pointer and scroll behavior

On desktop, dragging horizontally across the Hero character area sets a normalized
rotation target that is damped on every rendered frame. Rotation is capped at about
8 degrees. Releasing preserves the selected view; leaving the Hero smoothly returns
the character to neutral.

One fixed Canvas is reused for the Hero, About, and Contact. Its viewport position and
size never change while scrolling. About triggers one Bow gesture, then the character
returns to Idle. The character fades out and pauses while Experience, Projects, Skills,
and Education are in view, keeping the fixed canvas clear of portfolio copy.

Mobile-width devices disable pointer tracking, constrain device pixel ratio, remove
shadows, and show the character only in the Hero. Page visibility
pauses rendering when the tab is hidden. Reduced-motion mode disables cursor
tracking, GSAP transitions, and continuous character animation.

The character includes a visible Play/Pause control whenever automatic motion is
enabled. Portfolio content enters through short, coordinated GSAP timelines without
pinning or replacing native scrolling. Reduced-motion mode renders every content
item immediately and keeps the character still.

## Run locally

Install Node.js, open a terminal in this folder, and run:

```bash
npm install
npm run dev
```

Open the local address Vite prints. Stop the server with `Ctrl+C`.

## Build and preview

```bash
npm run build
npm run preview
```

The production site is written to `dist/`. Vite cannot be previewed by
double-clicking `index.html`; use the local server commands above.

## GitHub Pages

`vite.config.ts` uses relative built asset paths, so the generated `dist/` works in
a GitHub Pages repository subfolder. Build the site in a GitHub Actions workflow and
publish the `dist` artifact, or publish that output using your established Pages
process. Run Skill 03 and obtain explicit deployment approval before publishing.

## Replace the character

Export a humanoid GLB with its skeleton and animation clips included, optimize its
textures before export, and replace `public/models/chibi.glb`. Keep the character
near the origin and facing the positive camera direction. If it appears too large,
small, high, or low, adjust the group scale/position in
`src/components/three/ChibiScene.tsx` rather than editing every section.

## Portfolio workflow

Use the same workshop sequence as the other templates:

**Resume → Skill 01 → `PROFILE.md` → Human Approval → Skill 02 → Portfolio → Human
Review → Skill 03**

Skill 02 should update `src/data/profile.ts`, remove missing links, and preserve the
3D architecture. The current content demonstrates the template using approved
portfolio facts; `PROFILE.md` remains an unapproved reusable starter schema.

## Resume and analytics

The Resume control is hidden while `resumeUrl` is blank. To enable it, place an
approved file at `public/assets/resume.pdf` and set `resumeUrl` to
`"./assets/resume.pdf"` in the profile data.

The Microsoft Clarity insertion point is documented in `index.html`. Add only a real
project script after the participant approves analytics. Never add a fake project ID.

## Troubleshooting

- **Abstract character appears:** `public/models/chibi.glb` is absent or the server
  returned HTML instead of a model. Confirm the exact path and capitalization.
- **Greet does not play:** inspect the animation names in the modeling tool and name
  the intended clip `Greet`, `Wave`, or `Hello`.
- **Model stays still:** an Idle clip was not found. This is safe; check that the clip
  was exported inside the GLB.
- **Model framing is wrong:** adjust the group transform in `ChibiScene.tsx`.
- **Page is blank:** run `npm run build` and fix the first reported TypeScript error.
- **GitHub Pages assets fail:** deploy the built `dist/` output and preserve the
  relative `base: "./"` setting.
- **Animation is intentionally still:** check the operating system's Reduce Motion
  accessibility preference.
