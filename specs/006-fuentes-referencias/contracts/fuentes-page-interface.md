# Contract: Fuentes Page Interface

**Version**: 1.0
**Date**: 2026-04-16

## 1. Route Contract

- Route: `/fuentes`
- Rendering: Astro page (`src/pages/fuentes.astro`)
- Navigation: Header must expose link `Fuentes` resolvable in subpath deployments.

## 2. Data Input Contract

Source file: `src/data/fuentes.json`

```ts
interface FuentesDataset {
  titulo: string;
  subtitulo?: string;
  categorias?: Array<{ id: string; nombre: string; icono?: string }>;
  fuentes: Array<{
    nombre: string;
    tipo: string;
    categoria: string;
    fuente: string;
    descripcion: string;
    link: string;
    anio?: number;
  }>;
}
```

Validation constraints:

- Dataset nominal requires >= 8 valid entries.
- Unknown category => `otros` handling path.
- Invalid link => non-clickable `No disponible` display.

## 3. UI Rendering Contract

### Desktop (>=640px)

- Use `Table.astro`.
- Required columns: `Nombre del estudio`, `Tipo`, `Fuente`, `Descripcion`, `Enlace`.
- Study name must be visually emphasized.

### Mobile (<640px)

- Use stacked cards based on `Card.astro`.
- Must preserve same fields as desktop.

### Description rule

- Max 40 visible chars.
- Ellipsis (`...`) when truncated.
- Avoid splitting word when possible.

## 4. Filter Contract

- Categories: `todas`, `gubernamental`, `universidad`, `fundacion`.
- Selection mode: single selection.
- No-match result: clear empty state + action to clear filter.

## 5. External Link Contract

- Valid link rendering:
  - Clickable anchor.
  - `target="_blank"`.
  - `rel="noopener noreferrer"`.
- Invalid link rendering:
  - Non-clickable text `No disponible`.
  - Visual unavailable state.

## 6. Context Charts Contract

- `/fuentes` must show the same 3 context charts used in landing.
- Reuse existing chart components/configuration.
- Failure in a source block must not hide unaffected chart/content blocks.

## 7. Accessibility Contract (WCAG AA)

- Contrast ratio >= 4.5:1 for normal text.
- Visible focus state for all controls/links.
- ARIA labels for filter controls and icon-only affordances.
- Keyboard navigation must cover filter and links.

## 8. Non-Functional Contract

- No automated tests required by scope.
- Manual verification required on mobile and desktop.
- Keep additional JS minimal; prioritize server-rendered markup and existing reusable components.
