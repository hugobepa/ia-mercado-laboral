# Research: Landing IA Mercado

## Decision 1: Mantener composición en index con secciones reutilizables

- Decision: Ensamblar la landing en `src/pages/index.astro` usando `Hero.astro`, `DataSection.astro`, `ProvinceCards.astro` y `Navigation.astro` sobre `BaseLayout.astro`.
- Rationale: Cumple el alcance sin introducir componentes duplicados ni nuevas capas.
- Alternatives considered: Crear nuevas secciones paralelas para sectores o navegación (rechazado por deuda técnica y mayor acoplamiento).

## Decision 2: Sectores como sub-bloque dentro de #datos

- Decision: "Sectores más afectados" vive dentro de la sección `#datos` y no como sección independiente.
- Rationale: Reduce ambigüedad funcional y mantiene continuidad narrativa de KPIs + gráficas.
- Alternatives considered: Sección `#sectores` independiente (rechazado por fragmentación de navegación y mayor complejidad).

## Decision 3: Contrato de navegación fijo

- Decision: Header con enlaces obligatorios y orden fijo: Inicio, Datos, Gráficos, Provincias.
- Rationale: Permite validación consistente y evita divergencias entre diseño/implementación.
- Alternatives considered: Menú variable según viewport (rechazado por inconsistencias de QA y contenido).

## Decision 4: Gestión de anclas y subruta con helpers path-aware

- Decision: Resolver enlaces internos con helpers basados en `Astro.url.pathname` y normalización de base path.
- Rationale: Evita enlaces rotos en despliegue GitHub Pages bajo subdirectorio.
- Alternatives considered: href absolutos estáticos (rechazado por fragilidad en subruta).

## Decision 5: Estrategia de responsive y accesibilidad

- Decision: Mobile-first (<640, 640-1024, >1024), menú hamburguesa móvil, footer oculto móvil, botón volver arriba visible con `scrollY > 300px`, y foco visible WCAG AA.
- Rationale: Alineado con `DESIGN.md` y constitución del proyecto.
- Alternatives considered: Breakpoints no definidos o botón siempre visible (rechazado por incumplir UX pactada).

## Decision 6: Política de fallos parciales de datos

- Decision: Mostrar fallback local amigable en el bloque afectado manteniendo el resto de la landing operativa.
- Rationale: Preserva legibilidad y evita fallo global por una fuente puntual.
- Alternatives considered: Ocultar sección completa ante error parcial (rechazado por pérdida de valor informativo).

## Decision 7: Alcance de datos clave limitado a Cataluña

- Decision: El bloque de datos clave usa ámbito Cataluña (sin comparación obligatoria con España en esta iteración).
- Rationale: Clarificación explícita de negocio y coherencia con datasets disponibles del feature.
- Alternatives considered: Forzar comparativa España/Cataluña con fuente adicional (rechazado por expansión de alcance).

## Decision 8: Sin suites automáticas para esta iteración

- Decision: Mantener validación manual y build check, sin unit/integration/e2e.
- Rationale: Restricción explícita de constitución y requerimientos del feature.
- Alternatives considered: Añadir pruebas automatizadas (rechazado por estar fuera de alcance).
