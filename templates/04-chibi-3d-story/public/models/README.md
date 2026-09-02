# Character model

Place the final model here as `chibi.glb`. Compress portfolio models before
publishing; the current file uses Meshopt geometry compression, quantized vertex
data, reduced geometry, and 1024px WebP textures to reduce download and decode
time while preserving its rig and animation clips.

The site works without it and displays a styled development fallback. The preferred
animation clip names are `Greet` and `Idle`; matching is case-insensitive and also
recognizes common alternatives such as `Wave` and `Hello`. When a `Bow` clip exists,
the Contact section uses it once as a closing gesture before returning to Idle.
