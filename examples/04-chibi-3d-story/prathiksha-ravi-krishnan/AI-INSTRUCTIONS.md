# Instructions for personalizing Chibi 3D Story

1. Read the complete `PROFILE.md` and require the exact approval marker before
   changing public portfolio content.
2. Use the approved profile as the only factual source. Never invent links, metrics,
   roles, projects, dates, projects, awards, or personal information.
3. Update personal content only in `src/data/profile.ts` plus approved metadata in
   `index.html`. Do not scatter content through the 3D components.
4. Preserve the visual design, section structure, responsive behavior, model
   fallback, keyboard navigation, and reduced-motion behavior.
5. Omit blank project links and the Resume control. A Resume link is allowed only
   when `public/assets/resume.pdf` exists and the participant approved publication.
6. Do not place credentials, private URLs, API keys, confidential material, or
   unapproved phone numbers in frontend files.
7. Preserve `base: "./"` in `vite.config.ts` for GitHub Pages subpath support.
8. Run `npm run build` after personalization and stop for visual review before any
   deployment.

9. Treat `contactFormEndpoint` as optional. When the approved profile does not
   explicitly enable a public form and provide an endpoint, set it to an empty
   string; the component will omit the form.
10. Leave the `ANALYTICS` marker in `index.html` unchanged during profile
    personalization. Analytics is a later, participant-approved step and must use
    the participant's own project ID.
11. Use only a character model the participant created, licensed, or has permission
    to publish. Do not replace or publish a model based only on an unverified link.

The 3D model belongs at `public/models/chibi.glb`. Do not create or invent a GLB.
