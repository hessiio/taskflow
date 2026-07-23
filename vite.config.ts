import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Configure CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // if you're on a recent Sass/Vite setup
        loadPaths: [path.resolve(__dirname, "src")],
        additionalData: `
          @use "assets/styles/variables" as *;
          @use "assets/styles/mixins" as *;
        `,
      },
    },
  },
});
