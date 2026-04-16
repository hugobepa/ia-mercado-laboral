# Data Model: Reusable Landing Sections

## Entity: HeroContent

- Description: Content contract for the landing hero section.
- Fields:
  - `title`: string (impact-focused heading)
  - `subtitle`: string (colloquial explanatory text)
  - `ctaLabel`: string
  - `ctaHref`: string (fixed to `#datos`)
- Validation rules:
  - `title` and `ctaLabel` must be non-empty.
  - `ctaHref` must resolve to in-page anchor `#datos`.

## Entity: KpiSummary

- Description: Key figures extracted from Randstad dataset for the DataSection summary block.
- Source: `src/data/randstad-catalunya.json` (`cifras_clave_catalunya_2033`).
- Fields (representative):
  - `empleo_en_riesgo`: number | string
  - `nuevos_empleos`: number | string
  - `efecto_neto`: number | string
- Validation rules:
  - Missing value must fallback to readable placeholder text.
  - Section must remain renderable if one KPI is missing.

## Entity: SectorImpactItem

- Description: Sector-level dataset items used in DataSection context.
- Source: `src/data/randstad-catalunya.json` (`sectores_catalunya_mas_afectados`).
- Fields:
  - `sector`: string
  - `empleo_riesgo`: number
  - `nuevos_empleos`: number
  - `efecto_neto`: number
- Validation rules:
  - Invalid numeric fields are displayed with fallback labels.
  - Empty sector list triggers local empty/error state without collapsing other section blocks.

## Entity: ChartSectionConfig

- Description: Configuration source for embedded bar/donut charts in DataSection.
- Source: `src/data/charts-config.json`.
- Fields:
  - `barChart`: object
  - `donutChart`: object
- Validation rules:
  - Missing chart config triggers chart-level fallback UI.
  - DataSection surrounding text/KPIs remains visible on chart failure.

## Entity: ProvinceCardItem

- Description: Province card model used by ProvinceCards section.
- Source: `src/data/idescat-provincias.json` (`provincias`).
- Fields:
  - `nombre`: string
  - `ocupados_2023`: number
  - `adopcionIA`: number
  - `riesgo_automatizacion_pct`: number
  - `ejemplo_cotidiano`: string
- Derived constraints:
  - Display order is fixed: `Barcelona`, `Girona`, `Lleida`, `Tarragona`.
  - Missing province renders placeholder card with "Datos no disponibles".

## Entity: ProvinceCardRenderState

- Description: Render-state model for each province card.
- States:
  - `ready`: province data found and valid.
  - `placeholder`: province target missing in dataset.
  - `partial`: province exists but one or more non-critical fields missing.
- Transitions:
  - target province found -> `ready` or `partial`.
  - target province missing -> `placeholder`.

## Cross-entity constraints

- The landing must keep three reusable section blocks independent in composition.
- Partial failures in DataSection sources must not hide Hero or ProvinceCards.
- ProvinceCards must always render exactly four cards, regardless of source completeness.
