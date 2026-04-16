# Tasks: Reusable Landing Sections

**Input**: Design documents from `/specs/004-landing-reusable-sections/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No unit/integration/e2e test tasks are included (explicitly out of scope for this feature).

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare section entry points and shared styling/path foundations.

- [x] T001 Prepare section composition placeholders in src/pages/index.astro
- [x] T002 [P] Align shared design token usage for section wrappers in src/styles/global.css
- [x] T003 [P] Verify and normalize section-anchor path handling for subpath deploys in src/utils/navigation-path.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared prerequisites required before implementing user stories.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T004 Add reusable section ID and anchor constants in src/utils/navigation-path.ts
- [x] T005 Add shared fallback formatting helpers for missing values in src/utils/formatters.js
- [x] T006 Add section-level accessibility utility classes (focus/landmarks helpers) in src/styles/global.css
- [x] T007 Establish final section mounting order and anchor targets in src/pages/index.astro
- [x] T008 Implement mobile footer-hidden and floating back-to-top behavior baseline in src/layouts/BaseLayout.astro

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Comprender mensaje principal rápido (Priority: P1) 🎯 MVP

**Goal**: Deliver a reusable Hero section with clear messaging and CTA to `#datos`.

**Independent Test**: Load landing and confirm Hero renders title, subtitle, CTA, visible focus, and CTA navigation to `#datos`.

### Implementation for User Story 1

- [x] T009 [P] [US1] Implement Hero props/default content contract in src/components/sections/Hero.astro
- [x] T010 [P] [US1] Compose Hero CTA with reusable Button component targeting `#datos` in src/components/sections/Hero.astro
- [x] T011 [US1] Apply mobile-first and DESIGN-compliant visual structure for Hero in src/components/sections/Hero.astro
- [x] T012 [US1] Add semantic heading/ARIA and keyboard-focus behavior in src/components/sections/Hero.astro
- [x] T013 [US1] Integrate Hero section into landing composition in src/pages/index.astro

**Checkpoint**: User Story 1 is fully functional and independently validatable.

---

## Phase 4: User Story 2 - Entender cifras clave con contexto visual (Priority: P1)

**Goal**: Deliver DataSection with KPI context, integrated charts, and graceful partial-failure states.

**Independent Test**: Open `#datos` and verify KPI + chart context loads, with friendly local fallbacks when data/config is missing.

### Implementation for User Story 2

- [x] T014 [P] [US2] Implement Randstad KPI extraction and guards in src/components/sections/DataSection.astro
- [x] T015 [P] [US2] Integrate Idescat territorial context summary in src/components/sections/DataSection.astro
- [x] T016 [P] [US2] Integrate BarChart using charts-config source in src/components/sections/DataSection.astro
- [x] T017 [P] [US2] Integrate DonutChart using charts-config source in src/components/sections/DataSection.astro
- [x] T018 [US2] Add friendly local error/empty states for partial source failure in src/components/sections/DataSection.astro
- [x] T019 [US2] Implement mobile-first responsive layout rules for data and chart blocks in src/components/sections/DataSection.astro
- [x] T020 [US2] Ensure route-safe internal section links/anchors for GitHub Pages compatibility in src/components/sections/DataSection.astro
- [x] T021 [US2] Integrate DataSection into landing composition with `#datos` anchor in src/pages/index.astro

**Checkpoint**: User Story 2 is independently functional and resilient to partial data issues.

---

## Phase 5: User Story 3 - Comparar provincias de forma rápida (Priority: P2)

**Goal**: Deliver ProvinceCards with fixed order and guaranteed 4-card rendering including placeholders.

**Independent Test**: Navigate to province section and confirm four cards in fixed order (Barcelona, Girona, Lleida, Tarragona), including placeholders when data is missing.

### Implementation for User Story 3

- [x] T022 [P] [US3] Implement fixed province-order selector logic in src/components/sections/ProvinceCards.astro
- [x] T023 [P] [US3] Implement placeholder card rendering (`Datos no disponibles`) for missing provinces in src/components/sections/ProvinceCards.astro
- [x] T024 [US3] Render province metrics and everyday examples using reusable Card component in src/components/sections/ProvinceCards.astro
- [x] T025 [US3] Apply responsive 1/2/3 columns and accessible section semantics in src/components/sections/ProvinceCards.astro
- [x] T026 [US3] Integrate ProvinceCards into landing composition in src/pages/index.astro

**Checkpoint**: User Story 3 is independently functional with stable ordering and fallback behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, accessibility, and manual validation updates.

- [x] T027 [P] Run section-level accessibility pass (focus visibility, heading structure, ARIA labels) in src/components/sections/Hero.astro
- [x] T028 [P] Run section-level accessibility pass (focus visibility, heading structure, ARIA labels) in src/components/sections/DataSection.astro
- [x] T029 [P] Run section-level accessibility pass (focus visibility, heading structure, ARIA labels) in src/components/sections/ProvinceCards.astro
- [x] T030 Validate mobile footer hidden + floating back-to-top behavior in src/layouts/BaseLayout.astro
- [ ] T031 Execute SC-001/SC-002 measurement protocol and record evidence in specs/004-landing-reusable-sections/quickstart.md
- [x] T032 Verify landing composition consistency after all section integrations in src/pages/index.astro

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories
- **User Stories (Phases 3-5)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; independent MVP slice
- **US2 (P1)**: Starts after Foundational; independent from US1 except shared layout integration points in index
- **US3 (P2)**: Starts after Foundational; independent from US1/US2 except shared layout integration points in index

### Within Each User Story

- Build core section structure first
- Add accessibility/fallback behavior next
- Integrate into `src/pages/index.astro` last
- Validate story-level behavior before moving forward

### Parallel Opportunities

- Setup: T002, T003 can run in parallel
- Foundational: T005, T006 can run in parallel after T004 starts
- US1: T008 and T009 can run in parallel
- US2: T013, T014, T015 can run in parallel
- US3: T020 and T021 can run in parallel
- Polish: T025, T026, T027 can run in parallel

---

## Parallel Example: User Story 2

```bash
# Parallel work for DataSection core
Task: "T013 [US2] Implement Randstad KPI extraction and guards in src/components/sections/DataSection.astro"
Task: "T014 [US2] Integrate BarChart using charts-config source in src/components/sections/DataSection.astro"
Task: "T015 [US2] Integrate DonutChart using charts-config source in src/components/sections/DataSection.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validate Hero independently (CTA to `#datos`, keyboard focus, mobile-first layout)
5. Demo/deploy MVP slice if needed

### Incremental Delivery

1. Setup + Foundational
2. Add US1 and validate independently
3. Add US2 and validate independently
4. Add US3 and validate independently
5. Finish with Polish and manual validation record update

### Parallel Team Strategy

With multiple developers after Foundational completion:

1. Developer A: US1 (`Hero.astro`)
2. Developer B: US2 (`DataSection.astro`)
3. Developer C: US3 (`ProvinceCards.astro`)
4. Merge through coordinated updates in `src/pages/index.astro`

---

## Notes

- [P] tasks are limited to independent work with low conflict risk.
- Story labels map each task to a user-facing slice for traceability.
- No automated test suite tasks are included by explicit project/feature constraint.
- Manual validation is captured in `quickstart.md` as the acceptance evidence path.
