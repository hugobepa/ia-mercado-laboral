# Configuración de Deploy - ia-mercado-laboral

## 🚀 Para GitHub Pages (Estático)

### 1. Cambiar astro.config.ts:

```ts
export default defineConfig({
  site: "https://TU-USUARIO.github.io",
  base: "/ia-mercado-laboral",
  output: "static", // ← Cambiar de "server"
  // Remover: adapter: node()
});
```

### 2. Convertir API HTMX a Cliente:

- Remover `src/pages/api/filter-charts.astro`
- Mover lógica de filtrado a JavaScript client-side en `ProvinceFilter.astro`
- Usar `fetch()` con archivos JSON directos desde `/src/data/`

### 3. Alternativas con SSR:

#### Opción A: Netlify

```bash
bun add @astrojs/netlify
```

```ts
import netlify from "@astrojs/netlify";
export default defineConfig({
  output: "server",
  adapter: netlify(),
});
```

#### Opción B: Vercel

```bash
bun add @astrojs/vercel
```

```ts
import vercel from "@astrojs/vercel/serverless";
export default defineConfig({
  output: "server",
  adapter: vercel(),
});
```

#### Opción C: Cloudflare Pages

```bash
bun add @astrojs/cloudflare
```

```ts
import cloudflare from "@astrojs/cloudflare";
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
});
```

## 💡 Recomendación

Para **máximo rendimiento** y compatibilidad:

1. Mantén desarrollo con adaptador node
2. Deploy a GitHub Pages estático
3. Convierte HTMX filtering a JavaScript client-side

Los datos son estáticos (JSON files), no necesitas SSR real para filtrado.
