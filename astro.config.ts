// astro.config.ts
import { defineConfig } from "astro/config";

export default defineConfig({
  // ⚠️ PARA LOCAL: site y base vacíos o comentados
  // Se activarán solo al desplegar a GitHub Pages
  // site: 'https://<TU-USUARIO>.github.io',
  // base: '/ia-mercado-laboral',

  output: "static",

  build: {
    assets: "assets",
    format: "directory",
  },

  // CRÍTICO para GitHub Pages (lo dejamos preparado)
  trailingSlash: "always",

  // Para imágenes
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
