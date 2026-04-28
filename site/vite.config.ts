import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/react-amiga-guru-meditation/",
  plugins: [react()],
  resolve: {
    alias: {
      "react-amiga-guru-meditation": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../site-dist", import.meta.url)),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        upgrade: fileURLToPath(new URL("./upgrade/index.html", import.meta.url)),
      },
    },
  },
});
