# Implementation Plan: UI Base Components

**Branch**: `001-create-base-layout` | **Date**: April 16, 2026 | **Spec**: `specs/002-ui-base-components/spec.md`
**Input**: Feature specification from `specs/002-ui-base-components/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construir un sistema de componentes UI reutilizables en `src/components/ui/` (Button, Card, Table, Navigation) con variantes definidas, enfoque mobile-first, accesibilidad WCAG AA y estética coherente con `DESIGN.md`. El enfoque técnico usa Astro 6 con Tailwind 4 (`@theme`), interacciones ligeras con HTMX para menú/toggle y configuración de despliegue en GitHub Pages con base path por variable de entorno y fallback seguro.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript/JavaScript sobre Astro 6  
**Primary Dependencies**: Astro 6, Tailwind CSS 4 via `@tailwindcss/vite`, HTMX 2+  
**Storage**: Archivos JSON internos en `src/data/` (sin base de datos)  
**Testing**: Sin pruebas automáticas (unit/integration/e2e); validación manual funcional y accesibilidad  
**Target Platform**: Web responsive (mobile, tablet, desktop) + despliegue estático en GitHub Pages
**Project Type**: Aplicación web estática con componentes UI reutilizables  
**Performance Goals**: Interacciones de UI ligeras sin islands innecesarias; carga rápida con JS mínimo  
**Constraints**: WCAG AA (contraste 4.5:1, focus visible, ARIA, skip links), 4 colores máx., no estética IA, touch targets >=44x44px, mobile-first  
**Scale/Scope**: 4 componentes base y sus variantes para uso transversal en toda la web

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Código limpio (DRY/SOLID/KISS)**: PASS. Se define API clara por componente y variantes sin duplicación estructural.
- **UX/UI mobile-first y estética no-IA**: PASS. Se respetan breakpoints `<640`, `640-1024`, `>1024`, paleta tierra, asimetría y transiciones `duration-200`.
- **Accesibilidad WCAG AA**: PASS. El diseño contempla foco visible uniforme, ARIA en hamburguesa, contraste mínimo y skip links.
- **Testing policy**: PASS. Se mantiene la política explícita de no pruebas automáticas.
- **Stack técnico obligatorio**: PASS. Astro 6 + Tailwind 4 + HTMX + Bun + datos JSON internos.
- **Restricciones explícitas del proyecto**: PASS. No nuevos colores fuera de paleta ni patrones visuales prohibidos.

**Post-Design Re-check**: PASS. Los artefactos de Fase 0/1 mantienen todos los gates sin violaciones.

## Project Structure

### Documentation (this feature)

```text
specs/002-ui-base-components/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── ui-components-interface.md
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
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Table.astro
│   │   └── Navigation.astro
│   ├── charts/
│   └── sections/
├── layouts/
├── pages/
├── data/
├── styles/
└── utils/

tests/
└── types/
```

**Structure Decision**: Se usa la estructura web existente de Astro en un único proyecto y se limita el alcance de implementación a `src/components/ui/` para los 4 componentes base requeridos.

## Complexity Tracking

> Sin violaciones de constitución en esta fase.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       | N/A        | N/A                                  |
