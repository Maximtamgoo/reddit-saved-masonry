import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { analyzer } from "vite-bundle-analyzer";

const isHostRender = !!process.env.RENDER;

export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: { initialIsOpen: false },
      oxlint: true,
    }),
    analyzer({ enabled: !isHostRender }),
  ],
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
