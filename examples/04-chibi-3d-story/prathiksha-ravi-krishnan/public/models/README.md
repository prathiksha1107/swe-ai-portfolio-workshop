# Character model

Place the final model here as `chibi.glb`. Compress portfolio models before
publishing; the current file uses Draco compression with the full skinned mesh and
2048px WebP textures and a 25% mesh target with locked borders.
Runtime safeguards remove the defective normal-map seam and direct head-track
deformation while preserving the rig and animation clips.

The site works without it and displays a styled development fallback. The preferred
animation clip names are `Greet` and `Idle`; matching is case-insensitive and also
recognizes common alternatives such as `Wave` and `Hello`. When a `Bow` clip exists,
the About section uses it once before returning to Idle. The Contact section plays
the greeting gesture as a friendly closing moment.

Use only a character the participant created, licensed, or has permission to
publish. A model under 5 MB is a practical maximum for this workshop; under 2 MB is
preferred for visitors on mobile connections.
