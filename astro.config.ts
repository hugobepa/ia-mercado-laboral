// astro.config.ts
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  // Para desarrollo: usar server para API endpoints
  // Para GitHub Pages: cambiar a "static" y remover adapter

  // site: 'https://TU_USUARIO.github.io',
  // base: '/NOMBRE_DEL_REPO',

  output: "server",
  adapter: node({
    mode: "standalone",
  }),

  // Remover integrations - usaremos Tailwind 4.x via Vite

  server: {
    port: 4321, // Puerto fijo
    host: true, // Escucha en todas las interfaces (0.0.0.0)
    open: true, // Abre navegador automáticamente
  },

  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },

  vite: {
    plugins: [
      // Usar Tailwind 4.x via Vite plugin
      tailwindcss(),
    ],
    server: {
      strictPort: false, // Si puerto ocupado, busca otro
      hmr: {
        port: 4321,
      },
    },
  },
});

// // astro.config.ts
// import node from "@astrojs/node";
// import { defineConfig } from "astro/config";

// export default defineConfig({
//   // ⚠️ PARA LOCAL: site y base vacíos o comentados
//   // Se activarán solo al desplegar a GitHub Pages
//   // site: 'https://<TU-USUARIO>.github.io',
//   // base: '/ia-mercado-laboral',

//   // TEMPORAL: Usar adaptador node para desarrollo con API endpoints
//   // Para GitHub Pages, cambiar a output: "static" y remover adapter
//   output: "server",
//   adapter: node({
//     mode: "standalone",
//   }),

//   build: {
//     assets: "assets",
//     format: "directory",
//   },

//   // CRÍTICO para GitHub Pages (lo dejamos preparado)
//   trailingSlash: "always",

//   // Para imágenes
//   image: {
//     service: {
//       entrypoint: "astro/assets/services/sharp",
//     },
//   },
// });
