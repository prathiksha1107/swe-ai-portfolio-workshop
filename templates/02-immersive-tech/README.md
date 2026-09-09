# Immersive Tech

Status: Experimental  
Template ID: 02-immersive-tech  
Workshop Ready: Yes

## What this template is

Immersive Tech is a technology-focused portfolio with layered depth, atmospheric
motion, a real-time WebGL orbital scene, scroll reveals, and subtle 3D project cards. It is
expressive while keeping the content professional and readable.

On desktop, it uses a permanent command rail and large numbered content panels rather
than the conventional top navigation and document-like flow of Minimal Professional.
The navigation returns to a compact top menu on smaller screens.

## Best for

Software engineers, AI and data professionals, technical students, engineers,
researchers, and people with technology-focused projects.

## Technology

The template uses only HTML, CSS, and vanilla JavaScript. There is no installation,
framework, package manager, build step, API, or paid service.

## Customize with AI

Follow this workflow:

**Resume → Resume-to-Profile skill → verify `PROFILE.md` → AI customizes portfolio**

1. Ask your AI assistant to use `skills/01-resume-to-profile/SKILL.md` with your
   resume and this template's `PROFILE.md`.
2. Correct the generated profile and decide what is safe to make public.
3. Add `Status: APPROVED FOR PORTFOLIO GENERATION` under Human Review.
4. Ask the assistant to use `skills/02-profile-to-portfolio/SKILL.md` to personalize
   this existing template.
5. Visually review the result, then use Skill 03 for QA.

Never approve invented career information or metrics.

## Preview

Open `index.html` in a browser. No local server is required. The template remains
usable when JavaScript is unavailable; JavaScript adds the mobile menu and optional
visual enhancements.

## Public resume

The optional public resume must be `assets/resume.pdf`. Keep the Resume button only
when that file exists and you approve it for public download.

## Publish

This folder can be hosted free with GitHub Pages because it is a static website and
uses relative paths. Run portfolio QA before publishing.

After the public URL works, participants may optionally follow the
[free analytics guide](../../guides/04-add-free-analytics.md) to create and install
their own Microsoft Clarity project. The reusable starter intentionally contains no
tracking ID.

## Performance note

This template has more effects than Minimal Professional. Avoid large media files or
additional continuous animation. The WebGL geometry and rendering resolution are
reduced on mobile, motion pauses when the page is hidden, and the orbit becomes a
static frame when a visitor requests reduced motion. An accessible visual fallback
appears when WebGL is unavailable.

For smoother scrolling, the hero renderer stops when it leaves the viewport,
section objects pause while offscreen, and the background particle frame rate and
particle count are capped—more aggressively on mobile.
