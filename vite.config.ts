import { copyFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/4.2.3/",
  plugins: [
    react(),
    {
      name: "github-pages-fallback",
      apply: "build",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
});
