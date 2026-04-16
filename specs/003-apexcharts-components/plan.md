# Implementation Plan: ApexCharts Reusable Components

**Branch**: `[003-apexcharts-components]` | **Date**: 2026-04-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-apexcharts-components/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement reusable Astro chart components (`BarChart`, `DonutChart`, `LineChart`) using ApexCharts v4+ with a shared configuration layer in `src/utils/chart-helpers.js`, data sourced from `src/data/charts-config.json` (including 2023-2033 line series), and progressive/lazy initialization for performance. The feature must preserve mobile-first readability (300px mobile, 350px desktop), enforce accessibility requirements (ARIA labels, descriptive alternatives, valid contrast), and keep GitHub Pages compatibility via route-safe behavior based on `Astro.url.pathname`.

## Technical Context

**Language/Version**: TypeScript/JavaScript on Astro 6  
**Primary Dependencies**: Astro 6, Tailwind CSS 4 (`@theme`), ApexCharts v4+, HTMX 2+, Bun  
**Storage**: Internal JSON files (`src/data/charts-config.json`)  
**Testing**: Manual localhost validation and Playwright CLI exploratory checks only; no unit/integration/e2e tests  
**Target Platform**: Modern browsers (mobile-first, desktop support), static deployment on GitHub Pages  
**Project Type**: Web frontend (Astro static site)  
**Performance Goals**: Lazy chart bootstrapping, non-blocking initial render, stable chart interactions (hover/legend) across breakpoints  
**Constraints**: Respect DESIGN palette and typography, 300px/350px chart heights, ARIA labeling, fallback empty states, shared chart rules in `src/utils/chart-helpers.js`, route safety using `Astro.url.pathname`  
**Scale/Scope**: 3 reusable chart components + shared helper updates + one integrated showcase/data flow from internal JSON

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Gate results before research:

- ✅ Clean code and modularity: Component-per-chart + centralized helper strategy is aligned with DRY/SOLID/KISS.
- ✅ UX/UI and mobile-first: Explicit responsive heights and reusable UI states satisfy mobile-first and consistency constraints.
- ✅ Accessibility baseline: Plan includes ARIA labels, descriptive alternatives, and contrast constraints.
- ✅ Testing policy: No unit/integration/e2e tests planned; manual validation and Playwright CLI checks only.
- ✅ Stack compliance: Astro 6 + Tailwind 4 + Bun + internal JSON respected.

No blocking violations detected.

Post-design re-check (after Phase 1 artifacts):

- ✅ Research, data model, contracts, and quickstart preserve constitution constraints.
- ✅ Testing scope remains manual + Playwright CLI only.
- ✅ No additional violations introduced by design decisions.

## Project Structure

### Documentation (this feature)

```text
specs/003-apexcharts-components/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── charts/
│   │   ├── BarChart.astro
│   │   ├── DonutChart.astro
│   │   └── LineChart.astro
│   └── ui/
├── data/
│   └── charts-config.json
├── pages/
│   └── index.astro
└── utils/
  ├── chart-helpers.js
  └── chart-reinitialization.js

specs/003-apexcharts-components/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
  └── chart-components.md
```

**Structure Decision**: Use the existing single Astro project structure with focused updates in `src/components/charts/`, `src/data/charts-config.json`, and `src/utils/chart-helpers.js`. Planning artifacts stay under `specs/003-apexcharts-components/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |
