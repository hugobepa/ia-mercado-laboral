# Contracts: ApexCharts Chart Components

## Version

- Version: 1.0
- Date: 2026-04-16
- Scope: Feature `003-apexcharts-components`

## Shared Prop Contract

```ts
export interface BaseChartProps {
  id: string;
  ariaLabel: string;
  title: string;
  heightMobile?: 300;
  heightDesktop?: 350;
  className?: string;
  emptyStateMessage?: string;
  ctaLabel?: string;
  ctaHref?: string;
}
```

### Rules

- `ariaLabel` is required.
- `heightMobile` defaults to `300`.
- `heightDesktop` defaults to `350`.
- `ctaHref` must be generated in a path-safe way for GitHub Pages (using current pathname context).

## BarChart Contract

```ts
export interface BarChartProps extends BaseChartProps {
  configKey?: "barChart";
}
```

Data source contract:

- Reads `barChart` from `src/data/charts-config.json`.
- Required fields:
  - `chart.type === "bar"`
  - `series[0].data.length > 0`
  - `xaxis.categories.length === series[0].data.length`

## DonutChart Contract

```ts
export interface DonutChartProps extends BaseChartProps {
  configKey?: "donutChart";
}
```

Data source contract:

- Reads `donutChart` from `src/data/charts-config.json`.
- Required fields:
  - `chart.type === "donut"`
  - `series.length > 0`
  - `labels.length === series.length`

## LineChart Contract

```ts
export interface LineChartProps extends BaseChartProps {
  configKey?: "lineChart";
}
```

Data source contract:

- Reads `lineChart` from `src/data/charts-config.json`.
- Required fields:
  - `chart.type === "line"`
  - `xaxis.categories` includes years `2023..2033`
  - `series[0].data.length === xaxis.categories.length`

## Shared Global Rules Contract

Source: `src/utils/chart-helpers.js`

Required exports/behavior:

- Global palette and font tokens for all chart types.
- Shared tooltip/legend setup.
- Shared responsive chart sizing (300 mobile, 350 desktop).
- Shared deferred initialization function reused by all chart components.

## Empty/Error State Contract

When config/data is missing or invalid:

- Component must render a non-crashing fallback card.
- Fallback includes:
  - descriptive message for user
  - CTA (`recargar` or `volver a filtros`)
  - `aria-live="polite"` text container for assistive tech compatibility

## Interaction Contract

- Hover interaction must show contextual tooltip values.
- Legend interaction must allow toggling/emphasizing visible series.
- Interaction should remain functional in both mobile and desktop layouts.
