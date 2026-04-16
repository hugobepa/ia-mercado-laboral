# Research: Fuentes y Referencias

**Date**: 2026-04-16
**Status**: Complete
**Context**: Phase 0 research for `/fuentes`

## Decision 1: Render responsive dual (cards/table)

- Decision: Usar `Card.astro` para mobile (<640px) y `Table.astro` para desktop (>=640px).
- Rationale: Cumple requisito funcional de UX responsive y reaprovecha componentes ya existentes del proyecto.
- Alternatives considered: Crear componente nuevo unificado; descartado por mayor complejidad y duplicacion de estilos/estados.

## Decision 2: Navegacion y subruta GitHub Pages

- Decision: Resolver enlaces internos desde navegacion con utilidades ya existentes basadas en `Astro.url`/`basePath`.
- Rationale: Evita enlaces rotos en despliegue con subruta y mantiene consistencia con la implementacion actual de `Navigation.astro`.
- Alternatives considered: Hrefs absolutos directos (`/fuentes`); descartado por riesgo de ruptura en GitHub Pages.

## Decision 3: Fuente de datos y validacion defensiva

- Decision: Consumir `src/data/fuentes.json` como fuente unica y aplicar mapeo defensivo (defaults para campos vacios, categoria/tipo desconocidos -> `otros`).
- Rationale: Simplifica arquitectura (sin backend), cumple con constitucion de datos JSON internos y mejora robustez ante datos incompletos.
- Alternatives considered: API endpoint dinamico; descartado por alcance innecesario y mayor complejidad operativa.

## Decision 4: Filtro de categoria de seleccion unica

- Decision: Implementar filtro unico (una categoria activa o `todas`) con estado UI simple.
- Rationale: Clarificacion aprobada en `/clarify`; facilita comprension y pruebas manuales.
- Alternatives considered: Multi-select; descartado por mayor complejidad de estado y validacion.

## Decision 5: Enlaces externos seguros y fallback no clicable

- Decision: Enlaces validos con `target="_blank"` + `rel="noopener noreferrer"`; enlaces invalidos muestran `No disponible` no clicable con estado visual.
- Rationale: Cumple seguridad web, accesibilidad y requisito de resiliencia sin romper el resto del contenido.
- Alternatives considered: Placeholder clicable (`#`) u ocultar campo; descartado por mala UX y menor claridad semantica.

## Decision 6: Truncado de descripcion

- Decision: Limitar descripcion a 40 caracteres visibles con elipsis (`...`) evitando cortar palabra cuando sea posible.
- Rationale: Mantiene densidad visual en tabla/cards y responde a aclaracion aprobada.
- Alternatives considered: Corte exacto sin elipsis o sin truncado; descartado por menor legibilidad o ruptura de layout.

## Decision 7: Graficos de contexto

- Decision: Reutilizar los mismos 3 graficos de la landing con componentes y configuracion existentes.
- Rationale: Reduce riesgo de regresion, mantiene coherencia narrativa y evita nuevos contratos de datos.
- Alternatives considered: Crear graficos nuevos para `/fuentes`; descartado por alcance adicional no prioritario.

## Decision 8: Accesibilidad WCAG AA

- Decision: Aplicar contraste >=4.5:1, focus visible, labels ARIA en filtros/controles y semantica de tabla en desktop.
- Rationale: Requisito explicito del feature y principio no negociable de constitucion.
- Alternatives considered: Ajustes minimos sin ARIA; descartado por incumplir requerimientos.

## Decision 9: Tipografia y tema visual

- Decision: Mantener sistema visual de `DESIGN.md` con Manrope (titulos), Inter (cuerpo), paleta terracota/verde/crema y `@theme` de Tailwind 4.
- Rationale: Consistencia de marca y cumplimiento de restricciones de diseno del proyecto.
- Alternatives considered: Tema aislado para `/fuentes`; descartado por ruptura de coherencia global.

## Outcome

No quedan `NEEDS CLARIFICATION` abiertos para avanzar a Phase 1.
