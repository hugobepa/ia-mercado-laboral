// astro.config.ts
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const deployTarget = process.env.PUBLIC_DEPLOY_TARGET ?? "local";
const isGitHubPages = deployTarget === "github-pages";
const site = process.env.PUBLIC_SITE_URL ?? "https://example.github.io";
const rawBasePath = process.env.PUBLIC_BASE_PATH ?? "";
const normalizedBasePath = rawBasePath
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

export default defineConfig({
  // Estrategia dinámica para subruta: usar variables de entorno en deploy.
  site,
  base: normalizedBasePath,
  output: isGitHubPages ? "static" : "server",
  ...(isGitHubPages
    ? {}
    : {
        adapter: node({
          mode: "standalone",
        }),
      }),
  trailingSlash: "always",

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
