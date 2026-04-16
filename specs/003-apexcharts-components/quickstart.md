# Quickstart: ApexCharts Reusable Components

## Prerequisites

- Bun installed
- Node-compatible environment for Astro 6
- Project dependencies installed

## 1. Install dependencies

```bash
bun install
```

## 2. Run local dev server

```bash
bun run dev
```

## 3. Implement feature scope

- Add/update reusable chart components in `src/components/charts/`:
  - `BarChart.astro`
  - `DonutChart.astro`
  - `LineChart.astro`
- Update shared chart rules in `src/utils/chart-helpers.js` (palette, fonts, tooltip, legend, responsive heights, deferred init).
- Extend `src/data/charts-config.json` with line chart data for years 2023-2033.
- Integrate in a reference view (e.g. index/section) with route-safe behavior via `Astro.url.pathname` when generating dynamic paths.

## 4. Manual validation checklist (required)

- Mobile viewport:
  - Each chart renders at 300px height.
  - Tooltip text remains readable.
  - Legend interactions remain usable.
- Desktop viewport:
  - Each chart renders at 350px height.
  - Visual consistency across bar/donut/line.
- Accessibility:
  - Every chart container has meaningful ARIA labels.
  - Empty/fallback state appears with descriptive message + CTA when config/data is missing.
  - Contrast is valid against page background.
- Data contract:
  - Bar and donut still read from existing keys.
  - Line chart reads 2023-2033 dataset from `charts-config.json`.

## 5. Playwright CLI-assisted manual pass (required)

Run a local manual walkthrough using Playwright CLI against localhost to validate:

- chart rendering on load
- hover tooltips
- legend toggle behavior
- responsive heights and fallback state visibility

### SC-003 measurement protocol (required)

- Objetivo: validar que al menos el 95% de interacciones hover muestran informacion contextual correcta sin error visual.
- Muestra minima: 20 interacciones hover por tipo de grafica (bar, donut, line), total minimo 60 interacciones.
- Criterio de exito por interaccion: tooltip visible, valor coherente con serie/categoria, sin solapamientos graves ni recortes.
- Formula: tasa_exito = (interacciones_validas / interacciones_totales) \* 100.
- Criterio pass: tasa_exito >= 95% en el total y sin ningun tipo de grafica por debajo de 90%.
- Registro: documentar resultado por tipo de grafica y capturas representativas en este mismo archivo.

## 6. Build validation

```bash
bun run build
```

## 7. Out of scope

- Unit tests
- Integration tests
- E2E test suites
