# Research: ApexCharts Reusable Components

## Decision 1: Shared chart configuration in `src/utils/chart-helpers.js`

- Decision: Centralize chart defaults (colors, typography, tooltip, legend, responsive height rules) in shared helper exports used by Bar/Donut/Line.
- Rationale: Satisfies FR-011 and reduces config drift between components.
- Alternatives considered: Per-component inline config (rejected: duplicates logic and increases inconsistency risk).

## Decision 2: Lazy/Deferred chart initialization for all chart components

- Decision: Reuse global deferred initialization helper for `BarChart.astro`, `DonutChart.astro`, and `LineChart.astro`.
- Rationale: Aligns with FR-012 and keeps initial page render light.
- Alternatives considered: Eager initialization on page load (rejected: more JS work before interaction and lower perceived performance).

## Decision 3: Data source contract from `src/data/charts-config.json`

- Decision: Extend `charts-config.json` with a line-series dataset for 2023-2033 while preserving current bar/donut keys.
- Rationale: Matches clarified requirement for line chart data origin (FR-004).
- Alternatives considered: Hardcoded array inside `LineChart.astro` (rejected: breaks single-source-of-truth and makes updates harder).

## Decision 4: Mobile-first fixed heights by breakpoint

- Decision: Enforce 300px chart height on mobile and 350px on desktop through shared responsive options.
- Rationale: Directly implements FR-009 and SC-002.
- Alternatives considered: Fluid auto-height only (rejected: can produce cramped unreadable charts on small screens).

## Decision 5: Accessibility and fallback behavior

- Decision: Require `ariaLabel` per chart component, descriptive fallback copy when data/config is missing, and palette/contrast aligned with DESIGN constraints.
- Rationale: Covers FR-010 plus constitution accessibility requirements.
- Alternatives considered: Silent failure with empty container (rejected: poor UX and inaccessible behavior).

## Decision 6: GitHub Pages path-safe integration

- Decision: Use route-safe logic based on `Astro.url.pathname` for any dynamic chart links/targets in feature integration.
- Rationale: Keeps behavior stable under repository subpath deployment.
- Alternatives considered: Root-absolute hardcoded paths (rejected: prone to break on GitHub Pages base path).

## Decision 7: Validation strategy (no automated tests)

- Decision: Use manual localhost verification with Playwright CLI-assisted walkthrough only; skip unit/integration/e2e suites.
- Rationale: Matches explicit project constitution and user request.
- Alternatives considered: Add Vitest/Playwright test files (rejected: out of scope by policy).
