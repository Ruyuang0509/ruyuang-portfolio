import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, statSync } from "node:fs";
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
const hiddenPortfolioModule =
  portfolioMode === "submission"
    ? path.resolve(projectRoot, "src/data/portfolio.hidden.disabled.js")
    : path.resolve(projectRoot, "src/data/portfolio.hidden.js");
const publicPortfolioMediaRoot = path.resolve(projectRoot, "public/media/portfolio");
const submissionFsDeny = [
  ".env",
  ".env.*",
  "*.{crt,pem,key,p12,pfx,cer,der}",
  ".npmrc",
  ".yarnrc.yml",
  "**/.git/**",
  "**/.tmp/**",
  "**/dist/**",
  "**/reports/**",
  "**/restricted-media/**",
  "**/src/assets/draft/**",
  "**/src/data/portfolio.hidden.js",
  "**/src/data/portfolio.internal.js",
  "**/src/draft/DraftModeEnabled.jsx",
];
const submissionDevBoundary = {
  name: "submission-dev-boundary",
  configureServer(server) {
    if (portfolioMode !== "submission") return;

    server.middlewares.use((request, response, next) => {
      let pathname;
      try {
        pathname = decodeURIComponent(new URL(request.url ?? "/", "http://vite.local").pathname).replaceAll("\\", "/");
      } catch {
        response.statusCode = 400;
        response.end("Bad Request");
        return;
      }

      if (pathname === "/dist" || pathname.startsWith("/dist/")) {
        response.statusCode = 404;
        response.end("Not Found");
        return;
      }

      const mediaPrefix = "/media/portfolio/";
      if (!pathname.startsWith(mediaPrefix)) {
        next();
        return;
      }

      const requestedMedia = path.resolve(publicPortfolioMediaRoot, pathname.slice(mediaPrefix.length));
      const staysInsideMediaRoot = requestedMedia.startsWith(`${publicPortfolioMediaRoot}${path.sep}`);
      let isPublicMediaFile = false;
      if (staysInsideMediaRoot && existsSync(requestedMedia)) {
        try {
          isPublicMediaFile = statSync(requestedMedia).isFile();
        } catch {
          isPublicMediaFile = false;
        }
      }
      if (!isPublicMediaFile) {
        response.statusCode = 404;
        response.end("Not Found");
        return;
      }

      next();
    });
  },
};
// Codex-Fix: Resolve the draft UI to an empty module for submission builds so internal notes are not bundled.

export default defineConfig({
  base: deploymentBase,
  // Keep the static build portable across root domains and GitHub Pages project subpaths.
  plugins: [
    submissionDevBoundary,
    // Codex-Fix: Official Tailwind Vite plugin keeps utility styling zero-runtime.
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "#portfolio-draft": draftModeModule,
      "#portfolio-hidden": hiddenPortfolioModule,
    },
  },
  ...(portfolioMode === "submission"
    ? { server: { fs: { deny: submissionFsDeny } } }
    : {}),
  // Submission dev denies draft, restricted, generated, and historical artifact paths while preserving Vite's default deny rules.
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll("\\", "/");
          if (!normalizedId.includes("/node_modules/")) return undefined;
          if (
            /\/node_modules\/(?:\.pnpm\/)?three@/.test(normalizedId) ||
            normalizedId.includes("/node_modules/three/")
          ) {
            return "three-core";
          }
          // Keep R3F attached to the delayed HeroScene instead of forcing a second oversized vendor chunk.
          if (normalizedId.includes("/node_modules/@react-three/")) return undefined;
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
