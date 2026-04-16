# Tasks: ApexCharts Reusable Components

**Input**: Design documents from `/specs/003-apexcharts-components/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No se incluyen tareas de unit/integration/e2e tests por requerimiento explícito. Solo validación manual + Playwright CLI.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar dependencias y superficie inicial del feature.

- [ ] T001 Verificar y ajustar dependencia ApexCharts v4+ en package.json
- [ ] T002 Verificar script de desarrollo y build con Bun en package.json
- [ ] T003 [P] Preparar archivo de datos base para gráficas en src/data/charts-config.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura común que bloquea todas las historias.

**⚠️ CRITICAL**: Ninguna historia inicia hasta cerrar esta fase.

- [ ] T004 Centralizar paleta, tipografías y defaults globales de charts en src/utils/chart-helpers.js
- [ ] T005 [P] Centralizar reglas responsive 300px móvil / 350px desktop en src/utils/chart-helpers.js
- [ ] T006 [P] Estandarizar utilidades de inicialización diferida de gráficas en src/utils/chart-reinitialization.js
- [ ] T007 Extender contrato de datos con serie temporal 2023-2033 en src/data/charts-config.json
- [ ] T008 Definir fallback accesible con mensaje + CTA en src/components/ui/ErrorStates.astro
- [ ] T009 Añadir normalización segura de configuración de gráficas en src/utils/data-loader.ts

**Checkpoint**: Base técnica lista para implementar historias de usuario.

---

## Phase 3: User Story 1 - Visualizar datos con componentes reutilizables (Priority: P1) 🎯 MVP

**Goal**: Entregar BarChart, DonutChart y LineChart reutilizables renderizando datos internos de forma consistente.

**Independent Test**: En localhost, una vista de referencia debe mostrar correctamente las tres gráficas con datos válidos desde `charts-config.json`.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Implementar render base y props reutilizables de BarChart en src/components/charts/BarChart.astro
- [ ] T011 [P] [US1] Implementar render base y props reutilizables de DonutChart en src/components/charts/DonutChart.astro
- [ ] T012 [US1] Crear componente reusable de línea y contrato de props en src/components/charts/LineChart.astro
- [ ] T013 [US1] Conectar BarChart al bloque `barChart` de configuración interna en src/components/charts/BarChart.astro
- [ ] T014 [US1] Conectar DonutChart al bloque `donutChart` de configuración interna en src/components/charts/DonutChart.astro
- [ ] T015 [US1] Conectar LineChart al bloque `lineChart` de configuración interna en src/components/charts/LineChart.astro
- [ ] T016 [US1] Integrar defaults compartidos del helper en BarChart en src/components/charts/BarChart.astro
- [ ] T017 [US1] Integrar defaults compartidos del helper en DonutChart en src/components/charts/DonutChart.astro
- [ ] T018 [US1] Integrar defaults compartidos del helper en LineChart en src/components/charts/LineChart.astro
- [ ] T047 [US1] Integrar inicializacion diferida reutilizable en BarChart con chart-reinitialization en src/components/charts/BarChart.astro
- [ ] T048 [US1] Integrar inicializacion diferida reutilizable en DonutChart con chart-reinitialization en src/components/charts/DonutChart.astro
- [ ] T049 [US1] Integrar inicializacion diferida reutilizable en LineChart con chart-reinitialization en src/components/charts/LineChart.astro
- [ ] T019 [US1] Incrustar las tres visualizaciones en sección de datos principal en src/components/sections/DataSection.astro
- [ ] T020 [US1] Montar showcase funcional de las tres gráficas en src/pages/index.astro

**Checkpoint**: US1 funcional y demostrable como MVP.

---

## Phase 4: User Story 2 - Explorar datos con interacciones claras (Priority: P2)

**Goal**: Habilitar interacciones útiles (hover + leyenda) y estados de fallback robustos.

**Independent Test**: En localhost, hover muestra contexto de datos y la leyenda alterna/enfatiza series sin romper el layout.

### Implementation for User Story 2

- [ ] T021 [P] [US2] Definir formatter de tooltip contextual compartido en src/utils/chart-helpers.js
- [ ] T022 [P] [US2] Definir configuración compartida de leyenda interactiva en src/utils/chart-helpers.js
- [ ] T023 [US2] Aplicar tooltip contextual en gráfica de barras en src/components/charts/BarChart.astro
- [ ] T024 [US2] Aplicar tooltip contextual en gráfica donut en src/components/charts/DonutChart.astro
- [ ] T025 [US2] Aplicar tooltip contextual en gráfica de líneas en src/components/charts/LineChart.astro
- [ ] T026 [US2] Aplicar interacción de leyenda en gráfica de barras en src/components/charts/BarChart.astro
- [ ] T027 [US2] Aplicar interacción de leyenda en gráfica donut en src/components/charts/DonutChart.astro
- [ ] T028 [US2] Aplicar interacción de leyenda en gráfica de líneas en src/components/charts/LineChart.astro
- [ ] T029 [US2] Mostrar estado vacío con CTA al faltar config/datos en BarChart en src/components/charts/BarChart.astro
- [ ] T030 [US2] Mostrar estado vacío con CTA al faltar config/datos en DonutChart en src/components/charts/DonutChart.astro
- [ ] T031 [US2] Mostrar estado vacío con CTA al faltar config/datos en LineChart en src/components/charts/LineChart.astro
- [ ] T050 [US2] Normalizar series con valores nulos o vacios antes de renderizar en src/utils/chart-helpers.js
- [ ] T051 [US2] Definir estrategia para categorias que superan el espacio visible (rotacion/truncado/scroll) en src/utils/chart-helpers.js

**Checkpoint**: US2 estable con interacciones y fallback comprensible.

---

## Phase 5: User Story 3 - Consultar gráficas en móvil y desktop sin fricción (Priority: P2)

**Goal**: Garantizar legibilidad cross-device con contrato de alturas fijo y accesibilidad.

**Independent Test**: En viewport móvil/desktop, todas las gráficas mantienen 300/350 px respectivamente, con labels accesibles y contraste válido.

### Implementation for User Story 3

- [ ] T032 [US3] Aplicar altura fija móvil 300px en render de barras en src/components/charts/BarChart.astro
- [ ] T033 [US3] Aplicar altura fija móvil 300px en render donut en src/components/charts/DonutChart.astro
- [ ] T034 [US3] Aplicar altura fija móvil 300px en render de líneas en src/components/charts/LineChart.astro
- [ ] T035 [US3] Aplicar altura desktop 350px en render de barras en src/components/charts/BarChart.astro
- [ ] T036 [US3] Aplicar altura desktop 350px en render donut en src/components/charts/DonutChart.astro
- [ ] T037 [US3] Aplicar altura desktop 350px en render de líneas en src/components/charts/LineChart.astro
- [ ] T038 [US3] Añadir labels ARIA descriptivos en gráfica de barras en src/components/charts/BarChart.astro
- [ ] T039 [US3] Añadir labels ARIA descriptivos en gráfica donut en src/components/charts/DonutChart.astro
- [ ] T040 [US3] Añadir labels ARIA descriptivos en gráfica de líneas en src/components/charts/LineChart.astro
- [ ] T041 [US3] Asegurar rutas dinámicas seguras con Astro.url.pathname para CTAs/fallbacks en src/components/charts/LineChart.astro

**Checkpoint**: US3 completa con experiencia responsive y accesible.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cierre transversal, documentación y validación final.

- [ ] T042 [P] Ajustar contrato final de componentes según implementación en specs/003-apexcharts-components/contracts/chart-components.md
- [ ] T043 [P] Actualizar guía de ejecución/validación manual + Playwright en specs/003-apexcharts-components/quickstart.md
- [ ] T044 Consolidar decisiones finales de diseño técnico en specs/003-apexcharts-components/research.md
- [ ] T045 Ejecutar build local con Bun y registrar resultado en specs/003-apexcharts-components/quickstart.md
- [ ] T046 Ejecutar validación manual en localhost con Playwright CLI y registrar evidencias en specs/003-apexcharts-components/quickstart.md
- [ ] T052 Definir y documentar protocolo cuantitativo para SC-003 (95% hover correcto) en specs/003-apexcharts-components/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: inicia inmediatamente.
- **Phase 2 (Foundational)**: depende de Phase 1 y bloquea historias.
- **Phase 3 (US1)**: depende de cierre de Phase 2.
- **Phase 4 (US2)**: depende de cierre de Phase 2; recomendable después de US1 para reutilizar integración base.
- **Phase 5 (US3)**: depende de cierre de Phase 2; puede avanzar en paralelo con US2 si hay capacidad.
- **Phase 6 (Polish)**: depende de historias objetivo completadas.

### User Story Dependencies

- **US1 (P1)**: sin dependencia de otras historias tras Foundational.
- **US2 (P2)**: usa componentes de US1 para aplicar interacción.
- **US3 (P2)**: comparte base con US1; coordina con US2 para validar resultado final.

### Within Each User Story

- Configuración compartida antes que wiring por componente.
- Wiring por componente antes de integración de página.
- Comportamientos interactivos antes de fallback final.
- Responsive y accesibilidad antes de validación final.

### Parallel Opportunities

- Setup: T003.
- Foundational: T005, T006.
- US1: T010 y T011.
- US2: T021 y T022.
- Polish: T042 y T043.

---

## Parallel Example: User Story 1

```bash
Task: "T010 [US1] Implementar render base y props reutilizables de BarChart en src/components/charts/BarChart.astro"
Task: "T011 [US1] Implementar render base y props reutilizables de DonutChart en src/components/charts/DonutChart.astro"
```

## Parallel Example: User Story 2

```bash
Task: "T021 [US2] Definir formatter de tooltip contextual compartido en src/utils/chart-helpers.js"
Task: "T022 [US2] Definir configuración compartida de leyenda interactiva en src/utils/chart-helpers.js"
```

## Parallel Example: User Story 3

```bash
Task: "T032 [US3] Aplicar altura fija móvil 300px en render de barras en src/components/charts/BarChart.astro"
Task: "T033 [US3] Aplicar altura fija móvil 300px en render donut en src/components/charts/DonutChart.astro"
Task: "T034 [US3] Aplicar altura fija móvil 300px en render de líneas en src/components/charts/LineChart.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 + Phase 2.
2. Completar Phase 3 (US1).
3. Validar US1 de forma independiente en localhost.
4. Demostrar/entregar MVP.

### Incremental Delivery

1. Base compartida lista (Phase 1 + 2).
2. Entregar US1 (valor funcional principal).
3. Añadir US2 (interacción analítica).
4. Añadir US3 (robustez responsive + accesibilidad).
5. Cerrar con Phase 6 (build + validación manual/Playwright + documentación).

### Parallel Team Strategy

1. Equipo alinea Foundational.
2. Tras Foundational:
   - Dev A: US1 wiring e integración.
   - Dev B: US2 interacción y fallbacks.
   - Dev C: US3 responsive/accesibilidad.
3. Convergencia en Phase 6.
