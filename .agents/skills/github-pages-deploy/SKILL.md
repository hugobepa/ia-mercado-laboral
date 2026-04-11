---
name: github-pages-deploy
description: Configure GitHub Pages deployment for Astro 6 + Bun projects. Use this skill when the user needs to deploy static sites to GitHub Pages, configure base paths, fix broken links, or set up 404 pages. Produces production-ready deployment configs that handle subdirectory routing correctly.
license: Complete terms in LICENSE.txt
---

# Skill: github-pages-deploy

## Trigger

- "despliega a github pages"
- "configura deploy"
- "astro.config base path"
- "enlaces rotos github pages"

## Descripción

Configura despliegue a GitHub Pages para Astro 6 + Bun, manejando base path, 404 y enlaces.

## Output

- astro.config.ts con site/base correctos
- .github/workflows/deploy.yml para Bun
- public/404.html con detección de base path
- Componentes de navegación con Astro.url.pathname

## Ejemplo de uso

```ts
// astro.config.ts generado:
export default defineConfig({
  site: "https://usuario.github.io",
  base: "/nombre-repo",
  output: "static",
  trailingSlash: "always",
});
```

## Restricciones

- NO usar enlaces absolutos internos (href="/ruta")
- SIEMPRE usar new URL(href, Astro.url).pathname
- public/404.html debe existir en raíz del build
- trailingSlash: 'always' es OBLIGATORIO
