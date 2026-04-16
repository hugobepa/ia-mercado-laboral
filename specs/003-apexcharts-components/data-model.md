# Data Model: ApexCharts Components

## Entity: ChartConfigFile

- Description: Internal JSON source used to configure chart components.
- Location: `src/data/charts-config.json`
- Fields:
  - `barChart.chart.type`: string (`bar`)
  - `barChart.chart.height`: number (default mobile baseline)
  - `barChart.series[]`: array of `{ name: string, data: number[] }`
  - `barChart.xaxis.categories[]`: string[]
  - `barChart.colors[]`: hex color string[]
  - `donutChart.chart.type`: string (`donut`)
  - `donutChart.series[]`: number[]
  - `donutChart.labels[]`: string[]
  - `donutChart.colors[]`: hex color string[]
  - `lineChart.chart.type`: string (`line`)
  - `lineChart.series[]`: array of `{ name: string, data: number[] }`
  - `lineChart.xaxis.categories[]`: string[] (years `2023`..`2033`)
  - `lineChart.colors[]`: hex color string[]

## Entity: ChartComponentProps

- Description: Shared runtime contract for Astro chart components.
- Fields:
  - `id`: string (DOM-safe unique identifier)
  - `ariaLabel`: string (required for accessibility)
  - `title`: string
  - `heightMobile`: number (fixed `300`)
  - `heightDesktop`: number (fixed `350`)
  - `emptyStateMessage?`: string
  - `ctaHref?`: string (route-safe)
  - `ctaLabel?`: string

## Entity: GlobalChartRules

- Description: Shared visual/behavioral rules in `src/utils/chart-helpers.js`.
- Fields:
  - `fontFamily`: string (Inter/Manrope aligned)
  - `colorPalette`: string[] (limited, DESIGN-compliant)
  - `tooltip`: object (enabled, legible typography)
  - `legend`: object (interactive toggling enabled)
  - `responsive`: object (300/350 breakpoint behavior)
  - `deferredInit`: boolean/function hook reference

## Entity: ChartRenderState

- Description: UI state machine per chart container.
- States:
  - `idle`: container present, waiting for init
  - `loading`: deferred init in progress
  - `ready`: chart rendered with data
  - `empty`: missing data/config, show message + CTA
  - `error`: recoverable render/config error
- Transitions:
  - `idle -> loading` on component mount/intersection
  - `loading -> ready` when config + series are valid
  - `loading -> empty` when data/config missing
  - `loading -> error` on runtime initialization failure
  - `empty -> loading` on retry/filters action

## Validation Rules

- `ariaLabel` must be non-empty for all chart components.
- Series arrays must be numeric and non-empty for render state `ready`.
- `lineChart.xaxis.categories.length` must match line series data length.
- Colors used must come from the approved palette set in shared rules.
- Heights are fixed per breakpoint: mobile 300, desktop 350.
