# Tasks: Fuentes y Referencias

**Input**: Design documents from `/specs/006-fuentes-referencias/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No se incluyen tareas de pruebas unitarias/integración/e2e (fuera de alcance por especificación y constitución). Solo validación manual.

**Organization**: Tasks grouped by user story to enable independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar rutas, datos y estructura mínima para la nueva página.

- [X] T001 Crear esqueleto de página dedicada en src/pages/fuentes.astro
- [X] T002 Verificar y normalizar estructura mínima de datos en src/data/fuentes.json
- [X] T003 Revisar integración base de layout para la nueva ruta en src/layouts/BaseLayout.astro

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Fundamentos compartidos que bloquean todas las historias.

**⚠️ CRITICAL**: No comenzar historias de usuario hasta completar esta fase.

- [X] T004 Implementar enlace global a Fuentes en navegación principal en src/components/ui/Navigation.astro
- [X] T005 [P] Ajustar resolución de enlaces internos para subruta GitHub Pages en src/utils/navigation-path.ts
- [X] T006 [P] Implementar utilidades de normalización/truncado de descripción (40 + elipsis) en src/utils/formatters.js
- [X] T007 Definir mapeo de categorías y fallback `otros` para datos no válidos en src/pages/fuentes.astro
- [X] T008 Definir mapeo de iconografía SVG por tipo con fallback neutral en src/pages/fuentes.astro
- [X] T009 [P] Implementar reglas compartidas de accesibilidad visual (focus/contraste helper classes) en src/styles/global.css

**Checkpoint**: Base lista para implementar historias en paralelo.

---

## Phase 3: User Story 1 - Consultar Fuentes en Pagina Dedicada (Priority: P1) 🎯 MVP

**Goal**: Entregar acceso a `/fuentes` desde header y listado base de referencias.

**Independent Test**: Desde cualquier página navegar por header a `/fuentes` y ver listado con campos requeridos.

### Implementation for User Story 1

- [X] T010 [P] [US1] Implementar metadata/encabezado semántico de la página en src/pages/fuentes.astro
- [X] T011 [P] [US1] Cargar dataset y construir vista base de registros en src/pages/fuentes.astro
- [X] T012 [US1] Renderizar campos obligatorios por registro (estudio, tipo, fuente, descripción, enlace) en src/pages/fuentes.astro
- [X] T013 [US1] Destacar visualmente nombre del estudio según contrato en src/pages/fuentes.astro
- [X] T014 [US1] Validar estado de datos insuficientes (<8 válidos) con mensaje amigable en src/pages/fuentes.astro

**Checkpoint**: US1 funcional y validable de forma independiente.

---

## Phase 4: User Story 2 - Leer Referencias en Cualquier Dispositivo (Priority: P1)

**Goal**: Entregar experiencia responsive con cards en móvil y tabla en desktop.

**Independent Test**: <640px muestra cards; >=640px muestra tabla con los mismos campos.

### Implementation for User Story 2

- [X] T015 [P] [US2] Implementar vista mobile con cards reutilizando Card.astro en src/pages/fuentes.astro
- [X] T016 [P] [US2] Implementar vista desktop con tabla reutilizando Table.astro en src/pages/fuentes.astro
- [X] T017 [US2] Asegurar paridad de campos entre cards y tabla en src/pages/fuentes.astro
- [X] T018 [US2] Aplicar truncado de descripción a 40 visibles con elipsis y corte por palabra cuando sea posible en src/pages/fuentes.astro
- [X] T019 [US2] Ajustar estilos responsive mobile-first y breakpoints del feature en src/styles/global.css

**Checkpoint**: US2 funcional y validable de forma independiente.

---

## Phase 5: User Story 3 - Filtrar y Entender Tipo de Fuente (Priority: P2)

**Goal**: Entregar filtro de categoría de selección única e iconografía por tipo.

**Independent Test**: Seleccionar categoría y comprobar resultados + icono correcto por tipo.

### Implementation for User Story 3

- [X] T020 [P] [US3] Implementar control de filtro de categoría con selección única en src/pages/fuentes.astro
- [X] T021 [P] [US3] Implementar lógica de filtrado (`todas`, gubernamental, universidad, fundacion) en src/pages/fuentes.astro
- [X] T022 [US3] Implementar estado vacío de filtro sin coincidencias con acción de limpiar en src/pages/fuentes.astro
- [X] T023 [US3] Renderizar iconos SVG por tipo y fallback neutral para tipos desconocidos en src/pages/fuentes.astro
- [X] T024 [US3] Añadir etiquetado textual accesible para iconografía y control de filtro en src/pages/fuentes.astro

**Checkpoint**: US3 funcional y validable de forma independiente.

---

## Phase 6: User Story 4 - Mantener Visualizacion y Resiliencia de Datos (Priority: P2)

**Goal**: Reutilizar 3 gráficos de contexto y manejar fallos parciales sin colapsar la página.

**Independent Test**: Ver los 3 gráficos en `/fuentes` y confirmar continuidad de contenido ante fallos parciales.

### Implementation for User Story 4

- [X] T025 [P] [US4] Integrar bloque de gráficos de contexto reutilizando componentes existentes en src/pages/fuentes.astro
- [X] T026 [P] [US4] Conectar configuración/datos actuales de gráficos reutilizados en src/pages/fuentes.astro
- [X] T027 [US4] Implementar manejo de fallo parcial por bloque manteniendo contenido no afectado en src/pages/fuentes.astro
- [X] T028 [US4] Implementar fallback de enlace inválido como texto no clicable `No disponible` en src/pages/fuentes.astro
- [X] T029 [US4] Aplicar atributos seguros en enlaces válidos (`target="_blank" rel="noopener noreferrer"`) en src/pages/fuentes.astro

**Checkpoint**: US4 funcional y validable de forma independiente.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cierre de calidad transversal y validación manual final.

- [X] T030 Revisar contraste, foco visible y labels ARIA globales del feature en src/pages/fuentes.astro
- [X] T031 Verificar navegación interna y subruta GitHub Pages para el nuevo enlace Fuentes en src/components/ui/Navigation.astro
- [X] T032 Validar coherencia visual (paleta y tipografías Manrope/Inter) con DESIGN.md en src/styles/global.css
- [X] T033 Ejecutar protocolo de evidencia para SC-001 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T034 Ejecutar protocolo de evidencia para SC-002 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T035 Ejecutar protocolo de evidencia para SC-003 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T036 Ejecutar protocolo de evidencia para SC-004 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T037 Ejecutar protocolo de evidencia para SC-005 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T038 Ejecutar protocolo de evidencia para SC-006 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T039 Ejecutar protocolo de evidencia para SC-007 y registrar resultados en specs/006-fuentes-referencias/quickstart.md
- [X] T040 Ejecutar build de verificación y registrar resultado en specs/006-fuentes-referencias/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): sin dependencias.
- Foundational (Phase 2): depende de Setup y bloquea historias.
- User Stories (Phases 3-6): dependen de Foundational.
- Polish (Phase 7): depende de completar historias objetivo.

### User Story Dependencies

- US1 (P1): inicia tras Foundational; define el MVP navegable.
- US2 (P1): inicia tras Foundational; complementa US1 con responsive.
- US3 (P2): inicia tras Foundational; independiente del flujo base.
- US4 (P2): inicia tras Foundational; integra gráficos y resiliencia.

### Parallel Opportunities

- En Foundational: T005/T006/T009 pueden ejecutarse en paralelo.
- En US1: T010/T011 en paralelo.
- En US2: T015/T016 en paralelo.
- En US3: T020/T021 en paralelo.
- En US4: T025/T026 en paralelo.

---

## Parallel Example: User Story 2

```bash
Task: "T015 [US2] Implementar vista mobile con cards reutilizando Card.astro en src/pages/fuentes.astro"
Task: "T016 [US2] Implementar vista desktop con tabla reutilizando Table.astro en src/pages/fuentes.astro"
```

---

## Implementation Strategy

### MVP First (US1)

1. Completar Phase 1 y Phase 2.
2. Completar US1 (Phase 3).
3. Validar navegación a `/fuentes` y listado base.

### Incremental Delivery

1. MVP con US1.
2. Añadir US2 (responsive) y validar.
3. Añadir US3 (filtros + iconos) y validar.
4. Añadir US4 (gráficos + resiliencia) y validar.
5. Cerrar con polish y evidencia manual.
