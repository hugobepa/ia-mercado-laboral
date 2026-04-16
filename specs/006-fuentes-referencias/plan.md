# Implementation Plan: Fuentes y Referencias

**Branch**: `006-prepare-specify-branch` | **Date**: 2026-04-16 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/006-fuentes-referencias/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construir una pagina dedicada `/fuentes` para consultar referencias del estudio con navegacion global, render responsive (cards <640px y tabla >=640px), filtro por categoria de seleccion unica, iconografia SVG por tipo de fuente, y resiliencia ante datos/enlaces invalidos. Se reutilizan componentes existentes (`Table.astro`, `Card.astro`, `Navigation.astro`) y los 3 graficos de contexto de la landing, manteniendo accesibilidad WCAG AA y compatibilidad con GitHub Pages mediante enlaces internos resueltos con `Astro.url`.

## Technical Context

**Language/Version**: TypeScript/JavaScript sobre Astro 6 (latest stable)
**Primary Dependencies**: Astro 6, Tailwind CSS 4 con `@theme`, Bun, componentes UI existentes, ApexCharts existente
**Storage**: Archivos JSON internos (`src/data/fuentes.json`)
**Testing**: Sin pruebas automatizadas (unit/integration/e2e); validacion manual en navegador/Playwright CLI
**Target Platform**: Navegadores modernos (mobile-first, iOS/Android/desktop)
**Project Type**: Web statica con Astro (pagina y componentes reutilizables)
**Performance Goals**: Carga inicial rapida con contenido estatico, evitar JS extra innecesario, mantener estabilidad visual en cambios de filtro
**Constraints**: WCAG AA (contraste >=4.5:1, focus visible, labels ARIA), Manrope+Inter, paleta de DESIGN.md, base path dinamico para GitHub Pages con enlaces internos robustos
**Scale/Scope**: 1 ruta nueva (`/fuentes`), 1 dataset JSON, 3 componentes reutilizables, reutilizacion de 3 graficos de contexto

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Research Gate

- ✅ Codigo limpio: reutilizacion de componentes existentes y logica acotada por responsabilidad.
- ✅ UX/UI: mobile-first, WCAG AA, coherencia visual con DESIGN.md, sin estetica generica.
- ✅ Testing policy: sin tests automatizados; se mantiene validacion manual.
- ✅ Stack tecnico: Astro 6 + Tailwind 4 + Bun + JSON interno.
- ✅ Restricciones de despliegue: soporte GitHub Pages con subruta dinamica en navegacion.

**Gate Result (Pre-Research): PASS**

### Post-Design Gate (Phase 1)

- ✅ `research.md` define decisiones sin desviarse de constitucion.
- ✅ `data-model.md` usa entidades simples y validables para JSON local.
- ✅ `contracts/` fija contratos UI/accesibilidad y comportamiento de fallos.
- ✅ `quickstart.md` mantiene flujo Bun + validacion manual.

**Gate Result (Post-Design): PASS**

## Project Structure

### Documentation (this feature)

```text
specs/006-fuentes-referencias/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── fuentes-page-interface.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── pages/
│   └── fuentes.astro                # nueva pagina dedicada
├── components/
│   ├── ui/
│   │   ├── Navigation.astro         # extender items con enlace Fuentes
│   │   ├── Table.astro              # reutilizado para vista desktop
│   │   └── Card.astro               # reutilizado para vista mobile/estados
│   ├── charts/
│   │   ├── BarChart.astro           # reutilizado en contexto
│   │   └── DonutChart.astro         # reutilizado en contexto
│   └── sections/
│       └── DataSection.astro        # referencia de composicion de graficos
├── data/
│   └── fuentes.json                 # dataset fuente de la pagina
├── layouts/
│   └── BaseLayout.astro
└── styles/
    └── global.css

specs/006-fuentes-referencias/
└── (artefactos de plan)
```

**Structure Decision**: Proyecto web unico Astro. Se crea `src/pages/fuentes.astro` y se integran componentes existentes para minimizar deuda tecnica y mantener consistencia de UX/estilo.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because  |
| --------- | ---------- | ------------------------------------- |
| N/A       | N/A        | No constitutional violations detected |
