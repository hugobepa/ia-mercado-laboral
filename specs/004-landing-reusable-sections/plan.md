# Implementation Plan: Reusable Landing Sections

**Branch**: `[004-run-git-feature]` | **Date**: 2026-04-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-landing-reusable-sections/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build three reusable Astro sections for the landing (`Hero.astro`, `DataSection.astro`, `ProvinceCards.astro`) using the existing UI/chart components (`Button.astro`, `Card.astro`, `BarChart.astro`, `DonutChart.astro`) and internal JSON datasets from Randstad/Idescat. The implementation must preserve DESIGN constraints (palette, typography, asymmetrical shapes), mobile-first behavior (<640, 640-1024, >1024), WCAG AA baseline, and GitHub Pages path-safety through current-path-aware internal links.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript/JavaScript on Astro 6  
**Primary Dependencies**: Astro 6, Tailwind CSS 4 with `@theme`, HTMX 2+, Bun, existing reusable UI/chart components  
**Storage**: Internal JSON files (`src/data/randstad-catalunya.json`, `src/data/idescat-provincias.json`, `src/data/charts-config.json`)  
**Testing**: Manual localhost validation + Playwright CLI-assisted manual checks only (no unit/integration/e2e suites)  
**Target Platform**: Modern browsers (mobile/tablet/desktop), static deployment on GitHub Pages
**Project Type**: Web frontend (Astro static site)  
**Performance Goals**: Fast initial content render, no blocking failure on partial data errors, chart sections readable on mobile  
**Constraints**: WCAG AA contrast/focus baseline, no more than design-system palette usage, fixed province order, placeholder on missing province, dynamic path safety for subpath deployment  
**Scale/Scope**: 3 section components in `src/components/sections/` + landing composition updates + documentation artifacts for planning

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Gate results before research:

- ✅ Clean code/modularity: Section-level decomposition with existing reusable components aligns with DRY/SOLID/KISS.
- ✅ UX/UI constraints: Mobile-first breakpoints and non-generic visual system are explicitly captured.
- ✅ Accessibility: WCAG AA focus/contrast + keyboard scenarios present in spec.
- ✅ Testing policy: Plan excludes unit/integration/e2e tests and uses manual + Playwright CLI validation.
- ✅ Stack alignment: Astro 6 + Tailwind 4 + Bun + internal JSON sources only.

No blocking constitution violations detected.

Post-design re-check (after Phase 1 artifacts):

- ✅ Research decisions keep architecture simple and reusable.
- ✅ Data model and contracts preserve accessibility/failure handling requirements.
- ✅ Quickstart enforces manual validation flow and no automated test suites.
- ✅ No additional constitution violations introduced.

## Project Structure

### Documentation (this feature)

```text
specs/004-landing-reusable-sections/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── components/
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── DataSection.astro
│   │   └── ProvinceCards.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   └── Card.astro
│   └── charts/
│       ├── BarChart.astro
│       └── DonutChart.astro
├── data/
│   ├── randstad-catalunya.json
│   ├── idescat-provincias.json
│   └── charts-config.json
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── utils/
  └── navigation-path.ts

specs/004-landing-reusable-sections/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
  └── landing-sections.md
```

**Structure Decision**: Keep the existing single Astro project layout and implement only section-level composition changes under `src/components/sections/` with no new architectural layers. Planning artifacts remain in `specs/004-landing-reusable-sections/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |
