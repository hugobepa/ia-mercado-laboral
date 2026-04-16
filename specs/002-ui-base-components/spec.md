# Feature Specification: UI Base Components

**Feature Branch**: `[002-ui-base-components]`  
**Created**: April 16, 2026  
**Status**: Draft  
**Input**: User description: "Crear componentes UI base reutilizables para toda la web IA y Mercado Laboral: Button, Card, Table y Navigation con variantes desktop/mobile, lineamientos visuales específicos, accesibilidad WCAG AA y compatibilidad de despliegue en subruta."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Reutilizar componentes consistentes en toda la web (Priority: P1)

Como visitante, quiero que los elementos de interfaz principales se vean y se comporten de forma consistente en todas las secciones para navegar y consumir información sin fricción.

**Why this priority**: Es el núcleo de la experiencia del sitio; sin una base visual y funcional consistente, el resto del producto pierde claridad y confianza.

**Independent Test**: Puede validarse renderizando una página de referencia que use botón, tarjeta, tabla y navegación, comprobando variantes visuales definidas, estados interactivos y coherencia entre secciones.

**Acceptance Scenarios**:

1. **Given** una página que usa componentes base, **When** se muestra el botón en sus variantes principales, **Then** cada variante mantiene estilo, jerarquía visual y comportamiento interactivo coherentes con la guía de diseño.
2. **Given** una página con tarjetas de distintos tipos de contenido, **When** se renderizan las variantes definidas, **Then** cada una conserva una estructura legible y una diferenciación visual clara sin romper consistencia global.
3. **Given** una página con navegación activa, **When** el usuario interactúa con enlaces y controles, **Then** el estado visual de foco y hover es claro, consistente y comprensible.

---

### User Story 2 - Consultar datos en desktop y móvil sin pérdida de usabilidad (Priority: P1)

Como usuario en diferentes dispositivos, quiero ver tablas y navegación adaptadas al contexto para acceder a datos y moverme por el sitio sin esfuerzo adicional.

**Why this priority**: El contenido principal del sitio es informativo y comparativo; su valor depende de poder leerse y usarse bien en pantallas grandes y pequeñas.

**Independent Test**: Puede probarse cambiando entre viewport móvil y desktop, verificando que la tabla cambia a formato apilado en móvil, que la navegación usa menú compacto en móvil y que la versión desktop mantiene lectura eficiente.

**Acceptance Scenarios**:

1. **Given** un usuario en escritorio, **When** accede a una vista con datos tabulares, **Then** visualiza una tabla clásica con encabezados claros y alineación legible.
2. **Given** un usuario en móvil, **When** accede a la misma información, **Then** los datos se presentan en bloques apilados fáciles de recorrer y tocar.
3. **Given** un usuario en móvil, **When** abre y cierra el menú de navegación, **Then** puede acceder a los destinos principales sin perder contexto ni bloquear la interacción.

---

### User Story 3 - Acceder a una interfaz inclusiva y confiable (Priority: P2)

Como persona que usa teclado, lector de pantalla o requiere alto contraste, quiero que los componentes base sean accesibles para completar tareas sin barreras.

**Why this priority**: Garantiza inclusión y calidad percibida, además de reducir fricción de uso para todos los perfiles de usuario.

**Independent Test**: Puede validarse con navegación por teclado, revisión de contraste, comprobación de nombres accesibles y verificación de indicadores visibles de foco en todos los componentes interactivos.

**Acceptance Scenarios**:

1. **Given** un usuario que navega solo con teclado, **When** recorre componentes interactivos, **Then** todos son alcanzables y muestran foco visible.
2. **Given** un usuario con lector de pantalla, **When** interactúa con navegación y controles, **Then** recibe nombres accesibles claros para comprender su función.
3. **Given** un auditor de accesibilidad, **When** verifica texto e indicadores relevantes, **Then** se cumple contraste mínimo AA para lectura normal.

---

### Edge Cases

- ¿Qué ocurre cuando una tabla no tiene filas o solo tiene una fila de datos?
- ¿Cómo responde la navegación móvil cuando hay muchos enlaces y el alto de pantalla es reducido?
- ¿Qué comportamiento muestran los componentes cuando etiquetas o valores son muy largos?
- ¿Qué sucede cuando se usa el sitio desde una subruta de publicación y no desde la raíz del dominio?

## Clarifications

### Session 2026-04-16

- Q: ¿Qué fallback de navegación móvil quieres cuando JavaScript no esté disponible? → A: Mostrar enlaces de navegación visibles (sin hamburguesa)
- Q: Para el despliegue en subruta (GitHub Pages), ¿cómo quieres definir el base path dinámico? → A: Configurarlo por variable de entorno con fallback seguro
- Q: Para focus visible, ¿qué estrategia quieres como regla global en todos los componentes interactivos? → A: Mismo anillo de foco para todos (focus-visible uniforme)
- Q: Cuando no haya datos para tabla o cards, ¿qué comportamiento quieres por defecto? → A: Mostrar estado vacío con mensaje claro y CTA secundaria
- Q: Para el botón hamburguesa en móvil, ¿qué comportamiento ARIA quieres exigir? → A: aria-expanded + aria-controls + etiqueta dinámica (Abrir/Cerrar menú)

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema MUST ofrecer un conjunto de componentes base reutilizables para acciones, contenedores de contenido, navegación y presentación tabular en todo el sitio.
- **FR-002**: El sistema MUST permitir variantes de botón con jerarquía visual diferenciada para acción principal, acción secundaria y acción de bajo énfasis.
- **FR-003**: El sistema MUST permitir variantes de tarjeta para contenido general, contenido territorial, métricas de datos y bloques demográficos.
- **FR-004**: El sistema MUST presentar datos tabulares en formato de tabla en escritorio y formato apilado legible en móvil, preservando el significado de cada dato.
- **FR-005**: El sistema MUST ofrecer navegación persistente en escritorio y navegación compacta en móvil con apertura y cierre explícitos, y en ausencia de JavaScript MUST mostrar enlaces de navegación visibles (sin menú hamburguesa).
- **FR-006**: El sistema MUST aplicar la identidad visual definida para color, tipografía, forma, sombras y transiciones en todos los componentes base.
- **FR-007**: El sistema MUST garantizar objetivos táctiles adecuados en móvil para todos los controles interactivos relevantes.
- **FR-008**: El sistema MUST cumplir criterios de accesibilidad AA en contraste, foco visible y nombres accesibles para elementos interactivos, aplicando un patrón uniforme de focus-visible en todos los componentes interactivos.
- **FR-009**: El sistema MUST evitar una estética genérica y mantener una dirección visual cálida y coherente con tonos tierra.
- **FR-010**: El sistema MUST funcionar correctamente cuando el sitio se publica en una subruta, manteniendo navegación y recursos accesibles, con base path configurado por variable de entorno y fallback seguro.
- **FR-011**: El sistema MUST permitir poblar contenido informativo desde archivos de datos internos del proyecto sin depender de fuentes externas en tiempo de ejecución.
- **FR-012**: El sistema MUST mantener consistencia de comportamiento entre componentes, incluyendo estados base, hover, foco y deshabilitado cuando aplique.
- **FR-013**: El sistema MUST mostrar un estado vacío cuando no existan datos para tabla o cards, incluyendo mensaje claro y una acción secundaria.
- **FR-014**: El sistema MUST implementar en el botón hamburguesa móvil los atributos aria-expanded y aria-controls, junto con etiqueta accesible dinámica para estado de abrir/cerrar menú.

### Key Entities _(include if feature involves data)_

- **UI Component Variant**: Definición de una presentación específica de un componente base con reglas de apariencia, estado e interacción.
- **Responsive Presentation Mode**: Regla de adaptación de un mismo contenido a disposición de escritorio o móvil sin pérdida semántica.
- **Accessibility Interaction Contract**: Conjunto de expectativas de foco, nombre accesible y contraste que deben cumplir los componentes interactivos.
- **Visual Design Token Group**: Conjunto de reglas de color, tipografía, forma y transición que asegura coherencia visual transversal.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El 100% de páginas que usan componentes base muestran apariencia y comportamiento consistentes en revisión visual comparativa.
- **SC-002**: Al menos el 95% de usuarios de prueba completa tareas de navegación principal en menos de 20 segundos en desktop y en móvil.
- **SC-003**: El 100% de controles interactivos evaluados cumple foco visible y nombre accesible en revisión manual de accesibilidad.
- **SC-004**: El 100% de textos e indicadores críticos en componentes base cumple contraste AA para texto normal.
- **SC-005**: El 100% de tablas de muestra conserva legibilidad y comprensión de pares etiqueta-valor al cambiar de desktop a móvil.
- **SC-006**: El 100% de rutas de navegación principales funciona correctamente cuando el sitio se publica en subruta.

## Assumptions

- El sitio mantiene una única guía visual oficial y todas las nuevas interfaces deben alinearse con ella.
- La primera versión de estos componentes cubre los casos de uso actuales; variantes adicionales se incorporarán de forma incremental.
- Los datos usados para poblar vistas de ejemplo están disponibles como archivos internos y son suficientemente representativos.
- La validación de accesibilidad se realiza como criterio de aceptación funcional del feature.
- La navegación principal y el mapa de secciones del sitio se mantienen estables durante esta iteración.
