# Tasks: UI Base Components

**Input**: Design documents from `specs/002-ui-base-components/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No se incluyen tareas de tests automáticos (unit/integration/e2e) por decisión explícita del feature.

**Organization**: Tareas agrupadas por historia de usuario para implementación y validación independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencia directa)
- **[Story]**: Historia de usuario asociada (US1, US2, US3)
- Cada tarea incluye ruta de archivo exacta

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar configuración base de UI y despliegue

- [x] T001 Configurar estrategia de base path por variable de entorno con fallback seguro en astro.config.ts
- [x] T002 Definir/ajustar tokens de color y tipografía con Tailwind 4 @theme en src/styles/global.css
- [x] T003 Establecer clases base mobile-first y transiciones compartidas para UI en src/styles/global.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura mínima transversal que bloquea todas las historias

- [x] T004 Integrar HTMX para interacciones ligeras del menú móvil en src/layouts/BaseLayout.astro
- [x] T005 Implementar skip link y ancla de contenido principal accesible en src/layouts/BaseLayout.astro
- [x] T006 Crear utilitario de resolución de rutas internas con base path dinámico en src/utils/navigation-path.ts
- [x] T007 Conectar el utilitario de rutas en el layout base para consumo de navegación en src/layouts/BaseLayout.astro

**Checkpoint**: Fundación lista, se puede implementar cada historia de usuario

---

## Phase 3: User Story 1 - Reutilizar componentes consistentes en toda la web (Priority: P1) 🎯 MVP

**Goal**: Entregar Button y Card reutilizables con variantes y estética consistente

**Independent Test**: Renderizar botón y card en una vista de referencia y verificar variantes, estados y consistencia visual

### Implementation for User Story 1

- [x] T008 [P] [US1] Implementar API de props y variantes primary/secondary/outline en src/components/ui/Button.astro
- [x] T009 [P] [US1] Implementar API de props y variantes base/province/data/demographic en src/components/ui/Card.astro
- [x] T010 [US1] Aplicar bordes asimétricos, hover shadows y duration-200 en src/components/ui/Button.astro
- [x] T011 [US1] Aplicar bordes asimétricos, hover shadows y duration-200 en src/components/ui/Card.astro
- [x] T012 [US1] Implementar estado deshabilitado y target táctil mínimo 44x44 en src/components/ui/Button.astro
- [x] T029 [US1] Implementar estado vacío con mensaje y CTA secundaria para Card en src/components/ui/Card.astro
- [x] T013 [US1] Integrar ejemplos de uso de Button/Card para validación de historia en src/pages/index.astro

**Checkpoint**: US1 funcional y validable por sí sola

---

## Phase 4: User Story 2 - Consultar datos en desktop y móvil sin pérdida de usabilidad (Priority: P1)

**Goal**: Entregar Table y Navigation responsive con interacción móvil ligera y fallback sin JS

**Independent Test**: Verificar table desktop/mobile y navegación desktop/hamburguesa móvil con fallback sin JavaScript

### Implementation for User Story 2

- [x] T014 [P] [US2] Implementar tabla semántica desktop y modo cards móvil en src/components/ui/Table.astro
- [x] T015 [P] [US2] Implementar estado vacío con mensaje y CTA secundaria en src/components/ui/Table.astro
- [x] T016 [P] [US2] Implementar navegación desktop fija y menú hamburguesa móvil en src/components/ui/Navigation.astro
- [x] T017 [US2] Implementar fallback no-JS con enlaces visibles sin hamburguesa en src/components/ui/Navigation.astro
- [x] T018 [US2] Integrar resolución de rutas con Astro.url y utilitario de base path en src/components/ui/Navigation.astro
- [x] T030 [US2] Integrar consumo explícito de datos JSON locales (`src/data/charts-config.json` y datasets relacionados) en vista de referencia para Table/Card en src/pages/index.astro
- [x] T019 [US2] Integrar Navigation y Table en layout/página de referencia en src/layouts/BaseLayout.astro

**Checkpoint**: US2 funcional y validable por sí sola

---

## Phase 5: User Story 3 - Acceder a una interfaz inclusiva y confiable (Priority: P2)

**Goal**: Garantizar cumplimiento WCAG AA transversal en componentes base

**Independent Test**: Navegar con teclado, revisar contraste y atributos ARIA en todos los componentes interactivos

### Implementation for User Story 3

- [x] T020 [P] [US3] Unificar patrón de focus-visible en Button/Card/Table/Navigation en src/components/ui/Button.astro
- [x] T021 [P] [US3] Unificar patrón de focus-visible en Button/Card/Table/Navigation en src/components/ui/Card.astro
- [x] T022 [P] [US3] Unificar patrón de focus-visible en Button/Card/Table/Navigation en src/components/ui/Table.astro
- [x] T023 [P] [US3] Unificar patrón de focus-visible en Button/Card/Table/Navigation en src/components/ui/Navigation.astro
- [x] T024 [US3] Implementar aria-expanded, aria-controls y etiqueta dinámica abrir/cerrar en src/components/ui/Navigation.astro
- [x] T025 [US3] Verificar y ajustar contraste mínimo AA y tokens necesarios en src/styles/global.css

**Checkpoint**: US3 funcional y validable por sí sola

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cierre de implementación y validación manual integral

- [x] T026 [P] Documentar pasos finales de validación manual en specs/002-ui-base-components/quickstart.md
- [x] T027 [P] Ajustar notas de decisiones finales y tradeoffs en specs/002-ui-base-components/research.md
- [x] T031 Definir protocolo de medición manual para SC-002 (muestra, pasos, umbral <20s) en specs/002-ui-base-components/quickstart.md
- [ ] T032 Ejecutar validación manual obligatoria con Playwright-CLI en localhost y registrar evidencias en specs/002-ui-base-components/quickstart.md
- [ ] T028 Ejecutar y registrar checklist de verificación responsive/accesibilidad/despliegue en specs/002-ui-base-components/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: sin dependencias
- **Phase 2 (Foundational)**: depende de Phase 1 y bloquea historias
- **Phase 3 (US1)**: depende de Phase 2
- **Phase 4 (US2)**: depende de Phase 2
- **Phase 5 (US3)**: depende de Phase 2 y de componentes implementados en US1/US2
- **Phase 6 (Polish)**: depende de historias objetivo completadas

### User Story Dependencies

- **US1 (P1)**: inicia tras Foundational, sin dependencia funcional de otras historias
- **US2 (P1)**: inicia tras Foundational, sin dependencia funcional de otras historias
- **US3 (P2)**: inicia tras Foundational, requiere que Button/Card/Table/Navigation ya existan

### Within Each User Story

- Definir contrato de componente antes de refinamientos de estado
- Implementar comportamiento principal antes de integración en páginas/layout
- Completar criterio de validación independiente antes de pasar a siguiente historia

### Parallel Opportunities

- Setup: T002 y T003 en paralelo
- Foundational: T005 y T006 en paralelo
- US1: T008 y T009 en paralelo
- US2: T014, T015 y T016 en paralelo
- US3: T020, T021, T022 y T023 en paralelo
- Polish: T026 y T027 en paralelo

---

## Parallel Example: User Story 1

```bash
Task: T008 [US1] src/components/ui/Button.astro
Task: T009 [US1] src/components/ui/Card.astro
```

## Parallel Example: User Story 2

```bash
Task: T014 [US2] src/components/ui/Table.astro
Task: T016 [US2] src/components/ui/Navigation.astro
Task: T030 [US2] src/pages/index.astro
```

## Parallel Example: User Story 3

```bash
Task: T020 [US3] src/components/ui/Button.astro
Task: T022 [US3] src/components/ui/Table.astro
Task: T023 [US3] src/components/ui/Navigation.astro
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 y Phase 2
2. Completar US1 (Phase 3)
3. Validar independencia de US1 en página de referencia
4. Hacer demo interna de consistencia visual base

### Incremental Delivery

1. Base técnica (Setup + Foundational)
2. US1 para consistencia de componentes
3. US2 para responsive de datos y navegación
4. US3 para hardening de accesibilidad AA
5. Polish final y checklist manual

### Parallel Team Strategy

1. Un desarrollador cierra Setup/Foundational
2. Luego reparto paralelo:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3 (arranca al estar componentes base listos)
3. Cierre conjunto con Phase 6
