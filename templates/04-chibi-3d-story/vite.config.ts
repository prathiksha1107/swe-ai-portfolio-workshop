import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative assets allow the built site to work in a GitHub Pages subfolder.
  base: "./",
  build: {
    target: "es2022",
    sourcemap: false,
  },
});
