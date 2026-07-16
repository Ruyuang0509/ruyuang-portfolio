import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const portfolioMode = process.env.VITE_PORTFOLIO_MODE === "submission" ? "submission" : "draft";
const configuredBase = process.env.VITE_BASE_PATH?.trim();
const deploymentBase = configuredBase
  ? configuredBase.endsWith("/")
    ? configuredBase
    : `${configuredBase}/`
  : "./";
const draftModeModule =
  portfolioMode === "submission"
    ? path.resolve(projectRoot, "src/draft/DraftModeDisabled.jsx")
    : path.resolve(projectRoot, "src/draft/DraftModeEnabled.jsx");
// Codex-Fix: Resolve the draft UI to an empty module for submission builds so internal notes are not bundled.

export default defineConfig({
  base: deploymentBase,
  // Keep the static build portable across root domains and GitHub Pages project subpaths.
  plugins: [
    // Codex-Fix: Official Tailwind Vite plugin keeps utility styling zero-runtime.
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "#portfolio-draft": draftModeModule,
    },
  },
  build: {
    modulePreload: {
      resolveDependencies(_url, deps) {
        return deps.filter((dep) => !/assets\/(HeroScene|three)-/.test(dep));
      },
    },
    // Codex-Fix: Keep lazy R3F/Three chunks out of initial modulepreload so the DOM hero wins LCP priority.
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll("\\", "/");
          if (!normalizedId.includes("/node_modules/")) return undefined;
          if (
            /\/node_modules\/(?:\.pnpm\/)?three@/.test(normalizedId) ||
            normalizedId.includes("/node_modules/three/") ||
            normalizedId.includes("/node_modules/@react-three/")
          ) {
            return "three";
          }
          if (
            /\/node_modules\/(?:\.pnpm\/)?(?:motion|framer-motion)@/.test(normalizedId) ||
            normalizedId.includes("/node_modules/motion/")
          ) {
            return "motion";
          }
          if (
            /\/node_modules\/(?:\.pnpm\/)?(?:gsap|lenis)@/.test(normalizedId) ||
            normalizedId.includes("/node_modules/gsap/") ||
            normalizedId.includes("/node_modules/lenis/")
          ) {
            return "scroll";
          }
          if (
            /\/node_modules\/(?:\.pnpm\/)?(?:react|react-dom|scheduler)@/.test(normalizedId) ||
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/")
          ) {
            return "react";
          }
          return "vendor";
        },
      },
    },
  },
  // Codex-Fix: Split React, 3D, motion, and scroll runtimes into cacheable vendor chunks.
});
