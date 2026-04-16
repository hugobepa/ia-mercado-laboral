# Quickstart: Reusable Landing Sections

## Prerequisites

- Bun installed
- Project dependencies installed
- Local data files present in `src/data/`

## 1. Install dependencies

```bash
bun install
```

## 2. Start local development

```bash
bun run dev
```

## 3. Implement section scope

Create/update these files:

- `src/components/sections/Hero.astro`
- `src/components/sections/DataSection.astro`
- `src/components/sections/ProvinceCards.astro`

Integrate from landing page composition (`src/pages/index.astro`) using existing reusable components:

- `Button.astro`
- `Card.astro`
- `BarChart.astro`
- `DonutChart.astro`

## 4. Data binding requirements

- Hero CTA navigates to `#datos`.
- DataSection reads:
  - `src/data/randstad-catalunya.json`
  - `src/data/charts-config.json`
- ProvinceCards reads:
  - `src/data/idescat-provincias.json`
- Province card order is fixed: Barcelona, Girona, Lleida, Tarragona.
- Missing province renders placeholder card: `Datos no disponibles`.

## 5. Manual validation checklist (required)

### Visual and responsive

- Mobile (<640px): section layout remains single-column readable.
- Tablet (640-1024px): grid sections move to 2 columns where applicable.
- Desktop (>1024px): grid sections move to 3 columns where applicable.
- No footer in mobile; floating "volver arriba" action remains usable.

### Accessibility baseline (WCAG AA)

- Focus indicator is visible on CTA/buttons/links.
- Text contrast is acceptable against DESIGN palette backgrounds.
- Semantic heading order is coherent across Hero, DataSection, ProvinceCards.

### Resilience behavior

- If one data source fails, affected block shows friendly error/empty text.
- Remaining sections continue rendering normally.
- ProvinceCards always shows four cards using placeholders if needed.

### Routing compatibility

- Internal anchors/links work in local root.
- Internal anchors/links work in GitHub Pages subpath context.

## 6. Playwright CLI-assisted manual pass (required)

Use existing UI check command as manual support:

```bash
bun run ui:check http://localhost:4322/
```

If local Playwright browser launch is blocked on Windows environment, validate through VS Code shared browser session as fallback while preserving the same checklist criteria.

## 7. Build validation

```bash
bun run build
```

## 8. SC-001/SC-002 measurement protocol (required)

- SC-001 (Hero visible at first load): execute 20 initial page loads (desktop+mobile mix), record whether title+subtitle+CTA are visible without interaction.
- SC-001 pass criteria: `(valid_loads / 20) * 100 >= 95`.
- SC-002 (message comprehension in <=10s): run moderated check with 10 users and timestamp understanding confirmation.
- SC-002 pass criteria: `(users_under_10s / 10) * 100 >= 90`.
- Store evidence notes in this quickstart file under implementation results section.

## 9. Out of scope

- Unit tests
- Integration tests
- E2E test suites
