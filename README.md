# IA y Mercado Laboral

Landing web en Astro para visualizar impacto de IA en mercado laboral con datos estaticos (JSON) y componentes reutilizables.
Incluye vistas separadas de Inicio, Datos, Graficos, Fuentes y Provincias, con enfoque mobile-first y accesibilidad.
Usa render server/local con Bun y compilacion Astro para despliegue en entornos locales o GitHub Pages.

## Instalacion

### Requisitos

- Bun 1.x
- Git

### Pasos

1. Clonar repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd ia-mercado-laboral
   ```
2. Instalar dependencias:
   ```bash
   bun install
   ```

## Configuracion

El proyecto lee estas variables opcionales (ver [astro.config.ts](astro.config.ts)):

- `PUBLIC_DEPLOY_TARGET`: `local` (default) o `github-pages`
- `PUBLIC_SITE_URL`: URL base del sitio (default: `https://example.github.io`)
- `PUBLIC_BASE_PATH`: subruta para deploy (ejemplo: `ia-mercado-laboral`)

Ejemplo PowerShell:

```powershell
$env:PUBLIC_DEPLOY_TARGET="local"
$env:PUBLIC_SITE_URL="http://127.0.0.1:4321"
$env:PUBLIC_BASE_PATH=""
```

## Probar y correr

### Desarrollo

```bash
bun run dev
```

### Build de produccion

```bash
bun run build
```

### Preview local del build

```bash
bun run preview
```

### Validacion UI (manual asistida con Playwright)

```bash
bun run ui:check
```

## Tecnologias utilizadas

### Core

- Astro `^6.1.5`
- Bun (runtime/package manager) `1.x`
- TypeScript/JavaScript

### Dependencias principales

- `@astrojs/node` `^10.0.4`
- `@astrojs/react` `^5.0.3`
- `@astrojs/db` `^0.20.1`
- `apexcharts` `^5.10.5`
- `htmx.org` `^2.0.8`

### Estilos y tooling

- `tailwindcss` `^4.0.0`
- `@tailwindcss/vite` `^4.2.2`
- `@tailwindcss/postcss` `^4.2.2`
- `postcss` `^8.5.9`
- `playwright` `^1.59.1`

## Skills utilizadas

Skills aplicadas para este trabajo:

- `astro`
- `bun`

Skills disponibles en el repo (catalogo interno):

- `accessibility`, `accessibility-wcag`, `astro`, `bun`, `charts-apexcharts`, `frontend-design`, `github-pages-deploy`, `htmx-interactions`, `performance-web`, `seo`, `tailwind-css-patterns`, `typescript-advanced-types`, entre otras de soporte Speckit.
