# Implementation Plan: Landing Principal

**Branch**: `main` | **Date**: 2026-04-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/main/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Crear la landing principal del proyecto que muestre una vista consolidada de datos del mercado laboral español y catalán. La página debe incluir gráficas interactivas con filtrado por provincia, carga progresiva, estados de error, y cumplir estrictos criterios de rendimiento y accesibilidad. Los datos son estáticos (JSON) y se actualizan vía Git/deploy.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript/JavaScript - Astro 6 (latest stable)
**Primary Dependencies**: Astro 6, Tailwind CSS 4, ApexCharts, HTMX 2+, Bun (package manager)
**Storage**: Static JSON files in `src/data/` (Randstad 2024, Idescat 2023, OECD 2023)
**Testing**: Manual testing only (per constitution: NO automated testing)
**Target Platform**: Web browsers (mobile-first responsive design, iOS 15+, Android 10+)
**Project Type**: Static site generation (Astro SSG) with interactive components
**Performance Goals**: LCP ≤2.5s móvil/≤1.5s desktop, CLS ≤0.1, FID ≤100ms, 3G compatibility
**Constraints**: WCAG AA compliance (contrast ≥4.5), no automated tests, Git-based updates only
**Scale/Scope**: Single landing page, ~4 chart types, ~50 data points, provincial filtering (47 provinces)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ **PASS**: Código Limpio

- DRY: Componentes chart reutilizables ✅
- SOLID: Separación clara components/layouts/data ✅
- KISS: Landing simple sin sobre-ingeniería ✅
- Modular: Estructura src/ definida ✅

### ✅ **PASS**: UX/UI

- Mobile-first: Diseño responsive priority ✅
- WCAG AA: Contraste ≥4.5, skip link, focus ✅
- Velocidad: LCP targets estrictos ✅
- No parecer IA: Evitar azules saturados ✅

### ✅ **PASS**: Testing

- NO automated tests: Confirmed ✅
- Manual testing: Con Playwright CLI ✅

### ✅ **PASS**: Stack Técnico

- Astro 6: Latest stable ✅
- Tailwind 4: Con @theme ✅
- HTMX: Para interacciones ligeras ✅
- JSON data: En src/data/ ✅
- Bun: Package manager ✅

### ✅ **PASS**: Fuentes de Datos

- Randstad 2024: ✅ Disponible en src/data/
- Idescat 2023-2024: ✅ Disponible en src/data/
- OECD: ✅ Disponible en src/data/
- NO Santiago Niño Becerra: ✅ Confirmed

### ✅ **PASS**: Restricciones

- Máximo 4 colores: ✅ Per DESIGN.md
- NO blancos puros: ✅ Will use off-white
- NO simetría perfecta: ✅ Organic layouts
- NO base path local: ✅ Solo para GitHub Pages

**GATE RESULT: ✅ ALL GATES PASS - Proceed to Phase 0**

### 🔄 **POST-DESIGN RE-VALIDATION** (Phase 1 Complete)

#### ✅ **PASS**: Design Artifacts Alignment

- **research.md**: ✅ All technical decisions follow constitution stack
- **data-model.md**: ✅ Uses required JSON structure, maintains TypeScript typing
- **contracts/**: ✅ Chart interfaces enforce WCAG AA, performance targets, mobile-first
- **quickstart.md**: ✅ Implementation guide follows constitution principles exactly

#### ✅ **PASS**: Constitutional Compliance Verification

- **No over-engineering**: ✅ Simple chart interfaces, standard patterns
- **Performance constraints**: ✅ Lazy loading, bundle size limits, Core Web Vitals targets
- **Accessibility first**: ✅ ARIA contracts, screen reader support, keyboard navigation
- **Mobile-first**: ✅ Responsive contracts, touch-friendly interactions
- **Stack adherence**: ✅ Zero deviation from Astro 6 + Tailwind 4 + HTMX + JSON mandate

**FINAL GATE RESULT: ✅ ALL CONSTITUTIONAL GATES PASS - Design phase maintains full compliance**

## Project Structure

### Documentation (this feature)

```text
specs/main/
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
├── layouts/              # BaseLayout.astro (✅ exists), PageLayout.astro
├── pages/               # index.astro (landing principal)
├── components/          # Componentes reutilizables
│   ├── ui/              # Button.astro, Card.astro, Navigation.astro (✅ exist)
│   ├── charts/          # BarChart.astro, DonutChart.astro (✅ exist) + nuevos
│   └── sections/        # Hero.astro, DataSection.astro (✅ exist)
├── data/                # JSONs with datos (✅ exist: randstad, idescat, fuentes)
├── styles/              # global.css (✅ exists)
└── utils/               # chart-helpers.js, formatters.js (✅ exist)

public/
├── 404.html             # (✅ exists)
└── favicon.ico          # (pending)

config files:
├── astro.config.ts      # (✅ exists)
├── tailwind.config.js   # (✅ exists)
├── tsconfig.json        # (✅ exists)
└── package.json         # (✅ exists)
```

**Structure Decision**: Single Astro project with SSG. El proyecto ya tiene la estructura base implementada según la constitución. Los componentes de charts y UI ya existen, solo necesitamos integrarlos en la landing principal y agregar funcionalidad de filtrado dinámico.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because      |
| --------- | ---------- | ----------------------------------------- |
| N/A       | N/A        | No violations detected - all gates passed |
