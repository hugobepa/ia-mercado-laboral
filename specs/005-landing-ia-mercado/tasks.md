# Tasks: Landing IA Mercado

**Input**: Design documents from `/specs/005-landing-ia-mercado/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No unit/integration/e2e test tasks are included (explicitly out of scope). Manual validation with Playwright-CLI in localhost is required.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar composición base y utilidades globales para secciones ancladas.

- [ ] T001 Preparar estructura base de composición de landing en src/pages/index.astro
- [ ] T002 [P] Revisar y alinear variables de diseño y utilidades comunes de secciones en src/styles/global.css
- [ ] T003 [P] Verificar scripts/comandos Bun y dependencias necesarias de ejecución en package.json
- [ ] T004 [P] Confirmar disponibilidad y consistencia de fuentes JSON internas en src/data/randstad-catalunya.json
- [ ] T005 [P] Confirmar disponibilidad y consistencia de fuentes JSON internas en src/data/idescat-provincias.json
- [ ] T006 [P] Confirmar disponibilidad y consistencia de fuentes JSON internas en src/data/charts-config.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Base de navegación, anclas, accesibilidad y comportamiento global antes de historias.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T007 Definir/ajustar IDs de secciones y helpers de anclas (#inicio,#datos,#sectores,#provincias) en src/utils/navigation-path.ts
- [ ] T008 [P] Definir helper route-safe con Astro.url.pathname para enlaces internos en src/utils/navigation-path.ts
- [ ] T009 [P] Añadir/ajustar formateadores con fallback para valores inválidos o vacíos en src/utils/formatters.js
- [ ] T010 Implementar contrato base de navegación con orden fijo (Inicio, Datos, Gráficos, Provincias) en src/layouts/BaseLayout.astro
- [ ] T011 Implementar ocultación de footer en móvil en src/layouts/BaseLayout.astro
- [ ] T012 Implementar botón flotante volver arriba con umbral scrollY > 300 y foco visible en src/layouts/BaseLayout.astro
- [ ] T013 [P] Asegurar skip-link y utilidades focus visibles WCAG AA en src/styles/global.css

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Entender el Mensaje Principal (Priority: P1) 🎯 MVP

**Goal**: Entregar header + Hero claros con CTA funcional a `#datos`.

**Independent Test**: Cargar landing y verificar header visible, mensaje principal legible y CTA navegando a `#datos`.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Implementar contrato de props/defaults de Hero en src/components/sections/Hero.astro
- [ ] T015 [P] [US1] Implementar CTA principal de Hero apuntando a #datos con helper de ancla en src/components/sections/Hero.astro
- [ ] T016 [US1] Aplicar jerarquía semántica y ARIA principal del Hero en src/components/sections/Hero.astro
- [ ] T017 [US1] Aplicar diseño mobile-first del Hero según DESIGN.md en src/components/sections/Hero.astro
- [ ] T018 [US1] Integrar Navigation + Hero en composición de landing en src/pages/index.astro

**Checkpoint**: User Story 1 is fully functional and independently validatable.

---

## Phase 4: User Story 2 - Analizar Datos y Gráficas (Priority: P1)

**Goal**: Entregar bloque `#datos` con KPIs de Cataluña, contexto territorial y sub-bloque `#sectores` con 3 gráficas.

**Independent Test**: Ir a `#datos` y confirmar KPIs + contexto + gráficas barra/donut/línea anual sin cambio de página.

### Implementation for User Story 2

- [ ] T019 [P] [US2] Implementar extracción de KPIs de Cataluña con guards en src/components/sections/DataSection.astro
- [ ] T020 [P] [US2] Implementar resumen territorial (Idescat) con fallback amigable en src/components/sections/DataSection.astro
- [ ] T021 [P] [US2] Integrar sub-bloque #sectores dentro de #datos en src/components/sections/DataSection.astro
- [ ] T022 [P] [US2] Integrar BarChart con charts-config en src/components/sections/DataSection.astro
- [ ] T023 [P] [US2] Integrar DonutChart con charts-config en src/components/sections/DataSection.astro
- [ ] T024 [P] [US2] Integrar LineChart anual de implantación por años en src/components/sections/DataSection.astro
- [ ] T025 [US2] Implementar estado de fallo parcial por fuente manteniendo contenido no afectado en src/components/sections/DataSection.astro
- [ ] T026 [US2] Asegurar labels/semántica accesible de gráficas y bloques de datos en src/components/sections/DataSection.astro
- [ ] T027 [US2] Integrar DataSection en src/pages/index.astro con ancla #datos y sub-ancla #sectores

**Checkpoint**: User Story 2 is independently functional and resilient to partial data issues.

---

## Phase 5: User Story 3 - Comparar Territorio de Forma Rápida (Priority: P1)

**Goal**: Entregar tarjetas de provincias con orden fijo y placeholders sin romper la estructura.

**Independent Test**: Ir a `#provincias` y verificar 4 tarjetas en orden Barcelona, Girona, Lleida, Tarragona con placeholder cuando falte dato.

### Implementation for User Story 3

- [ ] T028 [P] [US3] Implementar selector de provincias en orden fijo en src/components/sections/ProvinceCards.astro
- [ ] T029 [P] [US3] Implementar placeholders Datos no disponibles para provincias ausentes en src/components/sections/ProvinceCards.astro
- [ ] T030 [US3] Renderizar métricas y ejemplo cotidiano por provincia con Card en src/components/sections/ProvinceCards.astro
- [ ] T031 [US3] Aplicar layout responsive 1/2/3 columnas de provincias en src/components/sections/ProvinceCards.astro
- [ ] T032 [US3] Integrar ProvinceCards en src/pages/index.astro con ancla #provincias

**Checkpoint**: User Story 3 is independently functional with stable ordering and fallback behavior.

---

## Phase 6: User Story 4 - Navegar Bien en Móvil y Escritorio (Priority: P2)

**Goal**: Garantizar experiencia responsive accesible con menú móvil, navegación fija y control volver arriba.

**Independent Test**: Validar en móvil y desktop navegación, footer oculto en móvil y aparición de volver arriba solo al superar 300px de scroll.

### Implementation for User Story 4

- [ ] T033 [P] [US4] Implementar/ajustar comportamiento de menú hamburguesa móvil en src/components/ui/Navigation.astro
- [ ] T034 [P] [US4] Verificar orden fijo de enlaces del header (Inicio, Datos, Gráficos, Provincias) en src/components/ui/Navigation.astro
- [ ] T035 [US4] Validar enlaces internos route-safe en navegación con subruta GitHub Pages en src/components/ui/Navigation.astro
- [ ] T036 [US4] Ajustar visibilidad de footer por breakpoint móvil en src/layouts/BaseLayout.astro
- [ ] T037 [US4] Ajustar lógica de aparición de volver arriba con threshold exacto >300 en src/layouts/BaseLayout.astro
- [ ] T038 [US4] Asegurar foco visible y activación por teclado en navegación y volver arriba en src/layouts/BaseLayout.astro

**Checkpoint**: User Story 4 is independently functional on mobile and desktop.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cierre funcional, consistencia visual/accesible y validación manual final.

- [ ] T039 [P] Ejecutar revisión final de consistencia de anclas y composición en src/pages/index.astro
- [ ] T040 [P] Ejecutar revisión final de clases responsivas y contraste en src/styles/global.css
- [ ] T041 Documentar evidencia de validación manual en specs/005-landing-ia-mercado/quickstart.md
- [ ] T042 Verificar build final y registrar resultado de aceptación en specs/005-landing-ia-mercado/quickstart.md
- [ ] T043 Ejecutar 20 cargas manuales con Playwright-CLI y registrar resultado de SC-001 en specs/005-landing-ia-mercado/quickstart.md
- [ ] T044 Ejecutar 20 validaciones visuales manuales con Playwright-CLI y registrar resultado de SC-002 en specs/005-landing-ia-mercado/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories
- **User Stories (Phases 3-6)**: Depend on Foundational completion
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; MVP slice
- **US2 (P1)**: Starts after Foundational; independent from US1 except integration touchpoint in index
- **US3 (P1)**: Starts after Foundational; independent from US1/US2 except integration touchpoint in index
- **US4 (P2)**: Starts after Foundational; depends mainly on Navigation/BaseLayout contracts

### Within Each User Story

- Implement section contract first
- Add accessibility/resilience behaviors next
- Integrate section in `src/pages/index.astro` last
- Validate story behavior before moving to next phase

### Parallel Opportunities

- Setup: T003-T006 can run in parallel
- Foundational: T008, T009, T013 can run in parallel after T007
- US1: T014, T015 can run in parallel
- US2: T019-T024 can run in parallel
- US3: T028, T029 can run in parallel
- US4: T033, T034 can run in parallel
- Polish: T039, T040 can run in parallel

---

## Parallel Example: User Story 2

```bash
# Parallel work for DataSection core
Task: "T019 [US2] Implementar extracción de KPIs de Cataluña con guards en src/components/sections/DataSection.astro"
Task: "T022 [US2] Integrar BarChart con charts-config en src/components/sections/DataSection.astro"
Task: "T023 [US2] Integrar DonutChart con charts-config en src/components/sections/DataSection.astro"
Task: "T024 [US2] Integrar LineChart anual de implantación por años en src/components/sections/DataSection.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validar Hero + Header + CTA a `#datos`
5. Demo/deploy MVP slice if needed

### Incremental Delivery

1. Setup + Foundational
2. Add US1 and validate independently
3. Add US2 and validate independently
4. Add US3 and validate independently
5. Add US4 and validate independently
6. Finish with Polish + manual acceptance evidence

### Parallel Team Strategy

With multiple developers after Foundational completion:

1. Developer A: US1 (`Hero.astro` + `index.astro`)
2. Developer B: US2 (`DataSection.astro`)
3. Developer C: US3 (`ProvinceCards.astro`)
4. Developer D: US4 (`Navigation.astro` + `BaseLayout.astro`)

---

## Notes

- [P] tasks are limited to independent work with low conflict risk.
- Story labels map each task to a user-facing slice for traceability.
- No automated test suite tasks are included by explicit feature constraint.
- Manual validation evidence with Playwright-CLI is captured in `specs/005-landing-ia-mercado/quickstart.md`.
