# Research: UI Base Components

## Decision 1: Arquitectura de componentes en Astro puro con props + slots

- Decision: Implementar `Button.astro`, `Card.astro`, `Table.astro` y `Navigation.astro` como componentes Astro reutilizables, tipados con interfaces de props y slots para contenido composable.
- Rationale: Reduce complejidad, cumple KISS/SOLID y evita JS cliente innecesario para render estructural.
- Alternatives considered:
  - React islands para todos los componentes: descartado por sobrecarga de JS y complejidad innecesaria.
  - CSS/HTML duplicado por página: descartado por violar DRY y mantenibilidad.

## Decision 2: Tailwind 4 con tokens de diseño y utilidades mobile-first

- Decision: Usar Tailwind 4 (`@theme`) y clases utilitarias alineadas a `DESIGN.md` (bordes asimétricos, sombras solo hover, `duration-200`, paleta tierra y tipografía Manrope/Inter).
- Rationale: Mantiene consistencia visual en todo el sistema UI y facilita variantes sin CSS redundante.
- Alternatives considered:
  - CSS ad-hoc por componente: descartado por riesgo de inconsistencias visuales.
  - Añadir más colores fuera de paleta: descartado por restricción explícita de diseño.

## Decision 3: HTMX para interacción ligera en navegación móvil

- Decision: Implementar interacción de menú hamburguesa/toggle con HTMX 2+ y fallback sin JavaScript mostrando enlaces visibles.
- Rationale: Cumple el requisito de interacción ligera, accesibilidad progresiva y evita islands para un caso simple.
- Alternatives considered:
  - JS custom imperativo sin HTMX: descartado por desviarse del stack definido.
  - React island de navegación: descartado por innecesario para el alcance.

## Decision 4: Accesibilidad WCAG AA como contrato transversal

- Decision: Establecer contratos de accesibilidad en todos los componentes: contraste >=4.5:1, `focus-visible` uniforme, ARIA explícita en hamburguesa (`aria-expanded`, `aria-controls`, etiqueta dinámica) y skip link.
- Rationale: Asegura cumplimiento AA desde diseño/arquitectura, no como parche posterior.
- Alternatives considered:
  - Reglas de foco distintas por componente: descartado por inconsistencia de UX.
  - ARIA mínima solo con `aria-label`: descartado por menor robustez para tecnologías asistivas.

## Decision 5: Compatibilidad GitHub Pages con base path dinámico

- Decision: Configurar resolución de base path mediante variable de entorno con fallback seguro y uso de rutas derivadas de contexto de Astro (`Astro.url`) en navegación.
- Rationale: Evita roturas entre local/prod y mantiene despliegue estable en subruta.
- Alternatives considered:
  - Base fija hardcodeada (`/ia-mercado-laboral/`): descartado por fragilidad ante cambios de repo/path.
  - Detección por nombre de repo sin configuración: descartado por menor control operativo.

## Decision 6: Estrategia de validación sin test suite automática

- Decision: No crear pruebas unit/integration/e2e; validar manualmente comportamiento responsive, accesibilidad y enlaces en local/build.
- Rationale: Cumple constitución del proyecto y reduce trabajo fuera de alcance.
- Alternatives considered:
  - Añadir tests automatizados: descartado por política explícita del proyecto.
