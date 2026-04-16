# Research: Reusable Landing Sections

## Decision 1: Keep section architecture in src/components/sections

- Decision: Implement Hero, DataSection, and ProvinceCards as independent section components in `src/components/sections/`.
- Rationale: Matches requested structure, improves composition clarity, and keeps page-level code minimal.
- Alternatives considered: Build everything directly in `index.astro` (rejected: harder maintenance and lower reuse).

## Decision 2: Reuse existing UI and chart components

- Decision: Compose sections using existing `Button.astro`, `Card.astro`, `BarChart.astro`, and `DonutChart.astro`.
- Rationale: Enforces DRY and avoids visual drift from design system components.
- Alternatives considered: Create section-specific button/card/chart variants (rejected: duplicate behavior and style debt).

## Decision 3: DataSection merges KPI + charts with graceful partial failure

- Decision: Read KPI/sector data from Randstad and province context from Idescat, while embedding chart components and showing friendly local error states when one source fails.
- Rationale: Aligns with clarified requirement FR-014 to avoid full-page failure on partial data issues.
- Alternatives considered: Hide full data section on single-source failure (rejected: unnecessary loss of usable content).

## Decision 4: ProvinceCards uses fixed order and placeholders

- Decision: Render province cards in fixed order `Barcelona, Girona, Lleida, Tarragona` and inject placeholder cards with "Datos no disponibles" when data is missing.
- Rationale: Satisfies clarified ordering and completeness requirements (FR-006, FR-007) while preserving layout consistency.
- Alternatives considered: Dynamic sort or dropping missing provinces (rejected: unstable UX and broken acceptance criteria).

## Decision 5: Mobile-first layout strategy by explicit breakpoints

- Decision: Use 1-column base, 2-column at `sm` (>=640), and 3-column at `lg` (>1024) where grid content applies.
- Rationale: Mirrors DESIGN breakpoint policy and reduces interpretation ambiguity.
- Alternatives considered: Auto-fit grid only (rejected: less predictable compliance with explicit breakpoint requirements).

## Decision 6: Accessibility baseline at section level

- Decision: Enforce semantic headings, visible focus states on interactive controls, meaningful ARIA labels, and no text contrast regressions.
- Rationale: Required by constitution and WCAG AA constraints in feature spec.
- Alternatives considered: Delegate accessibility solely to base components (rejected: section composition still controls heading hierarchy and landmarks).

## Decision 7: GitHub Pages path-safe links via Astro-aware internal resolution

- Decision: Use current-path-aware internal links compatible with subpath deployment (`Astro.url` context + existing path helpers) for CTA/internal anchors.
- Rationale: Prevents broken navigation when deployed under repository path.
- Alternatives considered: hardcoded root-absolute links (rejected: fragile on GitHub Pages).

## Decision 8: Validation workflow without automated test suites

- Decision: Use manual localhost verification and Playwright CLI-assisted checks only; no unit/integration/e2e suites are added.
- Rationale: Explicit project constitution and request constraints.
- Alternatives considered: Add Vitest/Playwright test files (rejected: out of scope for this feature policy).
