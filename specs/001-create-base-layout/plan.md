# Implementation Plan: Base Layout Component

**Branch**: `001-create-base-layout` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-create-base-layout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Create a BaseLayout.astro component that serves as the root layout for all pages in the IA and Labor Market web application. The layout provides responsive navigation (fixed header on desktop, hamburger menu on mobile), semantic HTML5 structure with Spanish language support, Google Fonts integration with fallbacks, and WCAG AA accessibility compliance. Key features include mobile-first design with no footer on mobile, floating back-to-top button, and CSS variable integration from the global design system.

## Technical Context

**Language/Version**: TypeScript 5.x with Astro 6.x (latest stable)
**Primary Dependencies**: Astro 6, Tailwind CSS 4, Google Fonts API (Manrope + Inter)
**Storage**: Static JSON files within project (no database needed)
**Testing**: Manual testing with Playwright-CLI in localhost (per constitution - no automated tests)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Static site generator web application
**Performance Goals**: Google Fonts load within 2 seconds, WCAG AA compliance (4.5:1 contrast)
**Constraints**: Mobile-first design, max 4 colors, no pure white backgrounds, JavaScript progressive enhancement
**Scale/Scope**: Single layout component serving as foundation for all pages

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Initial Check (Pre-Research) ✅ PASS

**✅ Código Limpio**: Single layout component with clear responsibility, reusable across pages
**✅ UX/UI**: Mobile-first design specified, WCAG AA compliance required, non-IA design principles followed
**✅ Testing**: Manual testing approach aligns with constitution (no automated tests)
**✅ Stack Técnico**: Uses Astro 6, Tailwind 4, follows folder structure
**✅ Sistema de Diseño**: References DESIGN.md colors and fonts, max 4 colors constraint met
**✅ Restricciones**: No pure white backgrounds, asymmetric design, no Santiago Niño Becerra data

### Post-Design Check (After Phase 1) ✅ PASS

**✅ Código Limpio**:

- DRY: Reusable BaseLayout component, no code duplication
- SOLID: Single responsibility for layout structure
- KISS: Simple slot-based architecture without over-engineering
- Módular: Clear separation between layout, navigation, and content

**✅ UX/UI**:

- Mobile-first: Responsive design with mobile <640px priority
- Accesibilidad: WCAG AA compliance with 4.5:1 contrast, keyboard navigation
- Velocidad: Google Fonts with fallbacks, critical path CSS optimization
- No parecer IA: Terracota/verde/crema palette, asymmetric borders, organic spacing

**✅ Testing**: Manual Playwright-CLI testing approach maintained, no automated tests added

**✅ Stack Técnico**:

- Astro 6.1.5 confirmed in implementation
- Tailwind 4.2.2 with utility-first approach
- HTMX patterns for progressive enhancement
- Bun package manager maintained
- JSON data storage approach preserved

**✅ Sistema de Diseño**: All DESIGN.md patterns integrated:

- 4-color palette (primary, secondary, neutral, text)
- Manrope + Inter font combination
- Asymmetric rounded corners (rounded-t-xl rounded-b-lg)
- CSS variables from global.css

**✅ Estructura de Carpetas**: Follows prescribed layout:

- src/layouts/ for BaseLayout.astro
- src/components/ui/ for reusable components
- src/styles/ for global CSS
- src/utils/ for helper functions

**FINAL GATE STATUS**: ✅ PASS - All constitutional principles satisfied in both design and implementation

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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
# Astro Web Application Structure
src/
├── layouts/
│   ├── BaseLayout.astro      # Main layout component (this feature)
│   └── PageLayout.astro      # Existing page layout
├── components/
│   ├── ui/                   # UI components (Navigation, Button, etc.)
│   ├── charts/               # Chart components
│   └── sections/             # Page sections
├── pages/                    # Astro pages (index.astro, etc.)
├── styles/
│   └── global.css            # CSS variables and base styles
├── data/                     # JSON data files
└── utils/                    # Helper functions
```

**Structure Decision**: Single Astro project structure following the constitution's prescribed folder layout. BaseLayout.astro will be created in the existing src/layouts/ directory and will reference existing global.css variables and UI components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations identified**: All requirements align with constitutional principles.
