import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ecsstatic } from "@acab/ecsstatic/vite";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import Sonda from "sonda/vite";

const isHostRender = !!process.env.RENDER;

export default defineConfig({
  plugins: [
    react(),
    ecsstatic(),
    svgr(),
    checker({
      overlay: { initialIsOpen: false },
      eslint: {
        useFlatConfig: true,
        lintCommand: "eslint './src/**/*.{ts,tsx}'",
      },
    }),
    Sonda({ enabled: !isHostRender, gzip: true }),
  ],
  css: {
    transformer: "lightningcss",
    lightningcss: {
      // targets: browserslistToTargets(browserslist('>= 0.25%'))
    },
  },
  build: {
    cssMinify: "lightningcss",
    sourcemap: !isHostRender,
  },
  server: {
    open: true,
    port: 3000,
    strictPort: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@src": `${import.meta.dirname}/src`,
    },
  },
  cacheDir: "../node_modules/.vite",
});
