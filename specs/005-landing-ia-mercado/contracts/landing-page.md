# Contracts: Landing IA Mercado

## Version

- Version: 1.0
- Date: 2026-04-16
- Scope: Feature `005-landing-ia-mercado`

## Page Composition Contract

Archivo principal:

- `src/pages/index.astro`

Layout obligatorio:

- `src/layouts/BaseLayout.astro`

Secciones/componentes obligatorios:

- `src/components/ui/Navigation.astro`
- `src/components/sections/Hero.astro`
- `src/components/sections/DataSection.astro`
- `src/components/sections/ProvinceCards.astro`

## Navigation Contract

### Required behavior

- Debe existir navegación principal con exactamente estos enlaces y orden:
  1. Inicio
  2. Datos
  3. Gráficos
  4. Provincias
- Debe funcionar en desktop y móvil (hamburguesa en móvil).

### Anchor contract

- Secciones navegables por ancla:
  - `#inicio`
  - `#datos`
  - `#sectores` (sub-bloque dentro de datos)
  - `#provincias`

### Routing/base-path contract

- Enlaces internos deben resolverse correctamente en raíz local y subruta de GitHub Pages.
- La resolución debe usar enfoque path-aware con `Astro.url.pathname` y helpers de navegación.

## Hero Contract

### Required behavior

- Hero muestra título, subtítulo y CTA principal.
- CTA principal navega a `#datos`.
- CTA mantiene foco visible y activación por teclado.

## Data + Sectors Contract

### Data sources

- `src/data/randstad-catalunya.json`
- `src/data/idescat-provincias.json`
- `src/data/charts-config.json`

### Required behavior

- El bloque `#datos` muestra KPIs de Cataluña y contexto territorial resumido.
- Debe incluir tres visualizaciones: barras, donut y línea anual de implantación.
- "Sectores más afectados" se representa dentro del mismo bloque de datos (`#datos`/`#sectores`).
- Fallos parciales de una fuente no deben romper el resto del contenido.

## ProvinceCards Contract

### Required behavior

- Debe renderizar exactamente cuatro tarjetas de provincias objetivo.
- Orden obligatorio: Barcelona, Girona, Lleida, Tarragona.
- Provincia ausente -> placeholder con texto `Datos no disponibles`.

## Mobile/Footer/Scroll Contract

### Required behavior

- En móvil no se muestra footer.
- Debe existir botón flotante "volver arriba".
- El botón aparece únicamente cuando `scrollY > 300px`.
- El botón debe ser accesible por teclado y foco visible.

## Out of Scope Contract

- No unit tests
- No integration tests
- No e2e tests
