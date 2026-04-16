# Implementation Plan: Landing IA Mercado

**Branch**: `[005-crear-landing-ia-mercado]` | **Date**: 2026-04-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-landing-ia-mercado/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construir la página principal `src/pages/index.astro` que ensambla `Navigation.astro`, `Hero.astro`, `DataSection.astro` y `ProvinceCards.astro` sobre `BaseLayout.astro`, manteniendo anclas `#inicio`, `#datos`, `#sectores`, `#provincias`. La implementación debe usar datos internos JSON (Randstad/Idescat/charts-config), estilo mobile-first con Tailwind 4 `@theme`, accesibilidad WCAG AA, y enlaces internos seguros para GitHub Pages mediante `Astro.url.pathname` y helpers de navegación existentes.

## Technical Context

**Language/Version**: TypeScript/JavaScript sobre Astro 6  
**Primary Dependencies**: Astro 6, Tailwind CSS 4 con `@theme`, HTMX 2+, ApexCharts (componentes ya existentes), Bun  
**Storage**: Archivos JSON internos (`src/data/randstad-catalunya.json`, `src/data/idescat-provincias.json`, `src/data/charts-config.json`)  
**Testing**: Solo validacion manual en localhost con Playwright-CLI (sin unit/integration/e2e)  
**Target Platform**: Navegadores modernos en móvil/tablet/desktop con despliegue estático en GitHub Pages
**Project Type**: Web frontend (Astro)  
**Performance Goals**: Render inicial rápido, sin bloqueo de página ante fallos parciales de datos, interacción fluida en móvil  
**Constraints**: Paleta y tipografia de `DESIGN.md`, WCAG AA, menu hamburguesa movil, footer oculto en movil, boton volver arriba con umbral `scrollY > 300px`, anclas obligatorias y orden fijo de navegacion, validacion manual de SC-001 y SC-002 en muestra de 20 ejecuciones con Playwright-CLI  
**Scale/Scope**: Composición de una landing principal y ajuste de contratos/documentación para sección de datos, sectores y provincias

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Gate inicial (pre-research):

- ✅ Código limpio/modular: se reutilizan layout y componentes existentes evitando duplicación.
- ✅ UX/UI: mobile-first, paleta mediterránea y reglas visuales de `DESIGN.md` contempladas.
- ✅ Accesibilidad: foco visible, contraste WCAG AA, navegación por teclado y semántica por secciones.
- ✅ Política de testing: no se añaden suites automáticas; validación manual solamente.
- ✅ Stack: Astro 6 + Tailwind 4 + Bun + JSON interno sin desviaciones.

Resultado: sin bloqueos constitucionales.

Re-check post-design (Phase 1):

- ✅ `research.md` resuelve decisiones de composición/anclas/subruta.
- ✅ `data-model.md` define entidades y estados de fallback sin acoplamiento extra.
- ✅ `contracts/landing-page.md` mantiene interfaz clara para secciones/navegación.
- ✅ `quickstart.md` conserva validación manual y exclusión de tests automáticos.

## Project Structure

### Documentation (this feature)

```text
specs/005-landing-ia-mercado/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── landing-page.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── components/
│   ├── ui/
│   │   └── Navigation.astro
│   └── sections/
│       ├── Hero.astro
│       ├── DataSection.astro
│       └── ProvinceCards.astro
├── data/
│   ├── randstad-catalunya.json
│   ├── idescat-provincias.json
│   └── charts-config.json
├── styles/
│   └── global.css
└── utils/
  └── navigation-path.ts

specs/005-landing-ia-mercado/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
  └── landing-page.md
```

**Structure Decision**: Se mantiene el proyecto Astro monolítico existente. El alcance se concentra en ensamblar secciones en `src/pages/index.astro`, respetando contratos de componentes existentes y reglas de navegación/anclas sin añadir nuevas capas arquitectónicas.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |
