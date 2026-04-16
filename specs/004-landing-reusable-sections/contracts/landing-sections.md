# Contracts: Landing Reusable Sections

## Version

- Version: 1.0
- Date: 2026-04-16
- Scope: Feature `004-landing-reusable-sections`

## Section Composition Contract

Required section files:

- `src/components/sections/Hero.astro`
- `src/components/sections/DataSection.astro`
- `src/components/sections/ProvinceCards.astro`

Composition rules:

- All three sections are reusable and can be composed from `index.astro` without tight coupling.
- Hero must render independently from data-source availability in other sections.
- DataSection and ProvinceCards must handle local failures without blocking page render.

## Hero Contract

### Required behavior

- Must render title, subtitle, and one primary CTA.
- Primary CTA destination is fixed to `#datos`.
- CTA must remain keyboard reachable with visible focus state.

### Optional props

- `title?: string`
- `subtitle?: string`
- `ctaLabel?: string`

Defaults must preserve required behavior (including `#datos` target).

## DataSection Contract

### Data sources

- `src/data/randstad-catalunya.json`
  - `cifras_clave_catalunya_2033`
  - `sectores_catalunya_mas_afectados`
- `src/data/idescat-provincias.json`
  - `provincias` (contexto territorial resumido para la sección de datos)
- `src/data/charts-config.json`
  - chart config consumed through existing `BarChart.astro` and `DonutChart.astro`

### Required behavior

- Must show key data context plus integrated chart components.
- On partial data failure, must show friendly local error/empty state and keep unaffected content visible.
- Must not trigger full-page failure for single-source issues.

### Accessibility

- Headings and labels must be descriptive.
- Interactive controls (if any) must keep visible focus.

## ProvinceCards Contract

### Data source

- `src/data/idescat-provincias.json` (`provincias` array)

### Required behavior

- Must always render exactly four card slots.
- Display order is fixed:
  1. Barcelona
  2. Girona
  3. Lleida
  4. Tarragona
- If target province data is missing, render placeholder card text: `Datos no disponibles`.
- If non-critical fields are missing, render available values plus readable fallback text.

### Responsive contract

- Mobile base: 1 column (<640px)
- Tablet: 2 columns (640-1024px)
- Desktop: 3 columns (>1024px) where layout region applies

## Reusable Component Contract

- Sections must reuse existing:
  - `Button.astro`
  - `Card.astro`
  - `BarChart.astro`
  - `DonutChart.astro`
- New duplicated variants of those components are out of scope.

## Routing/Base Path Contract

- Internal section navigation and links must remain valid in local root and GitHub Pages subpath deployments.
- Path generation must use current-path-aware Astro approach (existing helper pattern in project).

## Out of Scope Contract

- No unit tests
- No integration tests
- No e2e test suites
