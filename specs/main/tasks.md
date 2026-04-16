# Tasks: Landing Principal

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests required (per project constitution - manual testing only)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single Astro project**: `src/`, `public/` at repository root
- Paths assume Astro 6 SSG structure as defined in plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency verification

- [x] T001 Verify project dependencies and structure per implementation plan
- [ ] T002 [P] Validate existing chart components (BarChart.astro, DonutChart.astro) compatibility with new interfaces
- [x] T003 [P] Update src/styles/global.css with chart-specific skeleton loading styles

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create TypeScript interfaces for data model in src/utils/types.ts
- [x] T005 [P] Implement data loading utilities in src/utils/data-loader.ts
- [x] T006 [P] Create chart configuration helpers in src/utils/chart-helpers.js (enhance existing)
- [x] T007 [P] Implement error boundary component in src/components/ui/ErrorBoundary.astro
- [x] T008 [P] Create skeleton loading component in src/components/ui/SkeletonLoader.astro
- [x] T009 Setup province filtering utilities in src/utils/province-filter.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Landing con Datos Consolidados (Priority: P1) 🎯 MVP

**Goal**: Usuario visitante puede ver la landing principal con datos consolidados del mercado laboral

**Independent Test**: Visitar http://localhost:4321, ver hero section, chart sections cargar con skeletons → datos finales, verificar accesibilidad con screen reader

### Implementation for User Story 1

- [x] T010 [P] [US1] Update src/pages/index.astro with complete landing structure and navigation
- [x] T011 [P] [US1] Enhance src/components/sections/Hero.astro with market data overview
- [x] T012 [US1] Update src/components/sections/DataSection.astro to load consolidated employment data
- [x] T013 [US1] Integrate BarChart.astro for unemployment by province in DataSection
- [x] T014 [US1] Integrate DonutChart.astro for sector distribution in DataSection
- [x] T015 [US1] Add accessible data tables for screen readers in DataSection
- [x] T016 [US1] Implement chart loading states and error handling per contracts
- [x] T017 [US1] Add sources section with data attribution in index.astro

**Checkpoint**: ✅ **User Story 1 COMPLETE** - Landing page with consolidated data display fully functional

---

## Phase 4: User Story 2 - Filtrado Dinámico (Priority: P2)

**Goal**: Usuario puede filtrar datos por provincia con actualización dinámica de gráficas sin recarga

**Independent Test**: Seleccionar provincia desde dropdown → verificar que charts se actualizan dinámicamente, loading states funcionan, sin recarga de página

### Implementation for User Story 2

- [x] T018 [P] [US2] Create province dropdown component in src/components/ui/ProvinceFilter.astro
- [x] T019 [P] [US2] Create HTMX endpoint in src/pages/api/filter-charts.astro for dynamic updates
- [x] T020 [US2] Implement province filtering logic in src/utils/province-filter.ts
- [x] T021 [US2] Add HTMX attributes to chart containers for dynamic updates
- [x] T022 [US2] Update chart components to handle filtered data props
- [x] T023 [US2] Add JavaScript for ApexCharts re-initialization after HTMX swaps
- [x] T024 [US2] Implement loading indicators and error states for filter operations
- [x] T025 [US2] Add client-side validation for province selection
- [ ] T026 [US2] Test and optimize filter performance for Core Web Vitals targets

**Checkpoint**: Complete interactive filtering functionality working smoothly

---

## Phase 5: User Story 3 - Gestión de Datos (Priority: P3)

**Goal**: Desarrollador puede actualizar datos JSON vía Git y redeploy sin elementos dinámicos externos

**Independent Test**: Actualizar archivo JSON en src/data/, commit, deploy → verificar datos actualizados en producción

### Implementation for User Story 3

- [ ] T027 [P] [US3] Document data update workflow in README.md
- [ ] T028 [P] [US3] Create data validation script in scripts/validate-data.js
- [ ] T029 [P] [US3] Add JSON schema validation for employment data files
- [ ] T030 [US3] Create deployment checklist for data updates
- [ ] T031 [US3] Add pre-commit hooks for data validation (via Git hooks)
- [ ] T032 [US3] Document data sources and update schedule in src/components/sections/DataSources.astro

**Checkpoint**: Data management workflow established and documented for maintainers

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, final accessibility validation, and production readiness

- [ ] T033 [P] Implement lazy loading for charts using Intersection Observer
- [ ] T034 [P] Optimize bundle size - implement selective ApexCharts imports
- [ ] T035 [P] Add comprehensive SEO meta tags and structured data to index.astro
- [ ] T036 Performance audit - ensure LCP ≤2.5s mobile, ≤1.5s desktop via Lighthouse
- [ ] T037 Accessibility audit - validate WCAG AA compliance with axe-core
- [ ] T038 [P] Add keyboard navigation for chart interactions
- [ ] T039 [P] Optimize mobile experience - test touch interactions and readability
- [ ] T040 [P] Add error handling for data loading failures with retry mechanisms
- [ ] T041 Cross-browser testing on target platforms (iOS 15+, Android 10+)
- [ ] T042 Final performance validation - Core Web Vitals meet success criteria

---

## Dependencies

### User Story Completion Order

1. **US1** (Landing básica) → Foundational MVP, can be deployed independently
2. **US2** (Filtrado) → Enhances US1, requires US1 complete
3. **US3** (Gestión datos) → Supports maintenance, can run parallel to US2

### Parallel Execution Examples

**Within User Story 1**:

- T010 (index.astro) + T011 (Hero) + T012 (DataSection) can run in parallel
- T013 (BarChart) + T014 (DonutChart) can run in parallel
- T015 (data tables) depends on T013, T014 complete

**Within User Story 2**:

- T018 (ProvinceFilter) + T019 (API endpoint) + T020 (filter logic) can run in parallel
- T022-T025 depend on T018-T021 complete

**Cross-Phase Parallel**:

- Final Phase polish tasks (T033-T042) mostly parallelizable
- Documentation tasks (T027, T030, T032) can run during implementation

---

## Implementation Strategy

### MVP First (User Story 1)

- Focus on US1 for initial deployment
- Get basic landing functional before adding complexity
- Validate performance and accessibility foundations

### Incremental Delivery

- Each user story delivers independent value
- US2 adds interactivity to working US1 base
- US3 establishes maintainable data workflow

### Success Validation

- **US1**: Landing loads, charts render, accessibility works
- **US2**: Filtering works smoothly without performance degradation
- **US3**: Data updates can be performed and deployed reliably
- **Final**: All Core Web Vitals targets met, WCAG AA compliance verified

---

## Total Task Count: 42 tasks

**Breakdown by User Story**:

- **Setup + Foundation**: 9 tasks (~2 hours)
- **US1 (Landing básica)**: 8 tasks (~3 hours)
- **US2 (Filtrado dinámico)**: 9 tasks (~2.5 hours)
- **US3 (Gestión datos)**: 6 tasks (~1 hour)
- **Polish & Cross-cutting**: 10 tasks (~1.5 hours)

**Estimated Total**: 4-6 hours (matches quickstart estimate)

**Parallel Opportunities**: ~60% of tasks can run in parallel within phases

**Critical Path**: Setup → Foundation → US1 → US2 → Polish (US3 can run parallel to US2)
