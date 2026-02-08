import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import Sonda from "sonda/vite";

const isHostRender = !!process.env.RENDER;

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      overlay: { initialIsOpen: false },
      oxlint: true,
      typescript: true,
    }),
    Sonda({ enabled: !isHostRender, gzip: true }),
  ],
  build: {
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
