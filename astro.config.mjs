import { createRequire } from "module"
import path from "path"
import { fileURLToPath } from "url"

import sitemap from "@astrojs/sitemap"
import yaml from "@rollup/plugin-yaml"
import { defineConfig } from "astro/config"
import compress from "astro-compress"
import tailwind from "@astrojs/tailwind";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const CONSTANTS = {
  aliasPrefix: {
    root: "~",
    src: "@",
    types: "#",
  },
}

/**
 * @docs https://astro.build/config
 */
export default defineConfig({
  site: "https://wd-flat.com/",
  experimental: {
    assets: true
  },
  integrations: [
    compress({
      path: ["./dist"],
      css: true,
      js: true,
      html: false,
      img: false,
      svg: true,
    }),
    sitemap(),
    [tailwind({
      applyBaseStyles: false,
    })],
  ],
  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: "[ext]/[name][extname]",
          entryFileNames: "js/app.js",
        },
      },
    },
    plugins: [yaml()],
    resolve: {
      alias: {
        [CONSTANTS.aliasPrefix.root]: path.resolve(__dirname, "./"),
        [CONSTANTS.aliasPrefix.src]: path.resolve(__dirname, "./src"),
        [CONSTANTS.aliasPrefix.types]: path.resolve(__dirname, "./src/types"),
      },
    },
    define: {
      require: createRequire(import.meta.url),
    },
  },
})
