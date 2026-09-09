# swe-ai-portfolio-workshop

Free AI-powered portfolio workshop: choose a template, personalize it with AI, publish with GitHub Pages, and improve it using visitor analytics.

## Workshop workflow

1. Turn a resume into a reviewable profile with Skill 01.
2. Approve the profile and personalize a template with Skill 02.
3. Run QA and publish to GitHub Pages with Skill 03.
4. Optionally add free, privacy-aware visitor analytics by following
   [`guides/04-add-free-analytics.md`](guides/04-add-free-analytics.md).

Analytics is deliberately added after deployment because Microsoft Clarity needs the
final public URL. Each participant must create and approve their own Clarity project;
never reuse the workshop example's project ID.

## Template 1: Minimal Professional

- [Start with the reusable template](templates/01-minimal-professional/README.md)
- [View the completed Prathiksha Ravi Krishnan example](examples/01-minimal-professional/prathiksha-ravi-krishnan/index.html)

The template is intentionally filled with prompts and placeholders for workshop
attendees. The completed example shows how the same design looks after an AI
assistant personalizes it from a real resume.

## Template 4: Chibi 3D Story

- [Start with the workshop-ready React template](templates/04-chibi-3d-story/README.md)
- [View the completed Prathiksha Ravi Krishnan example](examples/04-chibi-3d-story/prathiksha-ravi-krishnan/README.md)

This advanced option keeps all portfolio facts in one editable profile file while
the template handles the interactive 3D character, animation, responsive layout,
accessibility fallback, and GitHub Pages build. Participants do not need to edit the
Three.js code.
