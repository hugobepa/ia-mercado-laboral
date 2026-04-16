# Feature Specification: Landing IA Mercado

**Feature Branch**: `005-crear-landing-ia-mercado`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "Crear página principal (landing page) que ensambla todas las secciones para el proyecto IA y Mercado Laboral"

## Clarifications

### Session 2026-04-16

- Q: ¿El bloque de datos clave debe ser España/Cataluña o solo Cataluña? → A: Solo Cataluña.
- Q: ¿"Sectores más afectados" es sección independiente o parte de `#datos`? → A: Sub-bloque dentro de la misma sección `#datos`.
- Q: ¿Qué enlaces son obligatorios en el header y en qué orden? → A: Inicio, Datos, Gráficos, Provincias.
- Q: ¿Cuál es el umbral de scroll para mostrar "volver arriba"? → A: Aparece cuando scrollY > 300px.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Entender el Mensaje Principal (Priority: P1)

Como visitante, quiero ver un encabezado claro y una sección principal con mensaje directo para entender en segundos de qué trata la landing y poder ir a los datos.

**Why this priority**: Es la puerta de entrada a todo el contenido; si falla, cae la comprensión y la navegación.

**Independent Test**: Se valida cargando la página y verificando que se muestra navegación, mensaje principal y CTA que lleva a la sección de datos.

**Acceptance Scenarios**:

1. **Given** que una persona entra a la landing, **When** termina la carga inicial, **Then** ve encabezado con navegación y bloque principal con título, subtítulo y CTA.
2. **Given** que la persona activa el CTA principal, **When** se ejecuta la navegación interna, **Then** llega al bloque de datos identificado como datos clave.

---

### User Story 2 - Analizar Datos y Gráficas (Priority: P1)

Como visitante, quiero consultar datos clave de Cataluña y gráficas en la misma experiencia, incluyendo el sub-bloque de sectores más afectados dentro de `#datos`, para entender el impacto general y la evolución por años sin cambiar de página.

**Why this priority**: Es el valor central de la landing informativa.

**Independent Test**: Se valida revisando que el bloque de datos muestre indicadores y tres visualizaciones: sectores, distribución y evolución anual.

**Acceptance Scenarios**:

1. **Given** que la sección de datos está disponible, **When** la persona navega a ella, **Then** ve indicadores clave y gráficas legibles.
2. **Given** que la persona revisa las visualizaciones, **When** inspecciona el contenido, **Then** encuentra una gráfica de evolución anual de implantación por años.
3. **Given** que falta una fuente de datos parcial, **When** se renderiza el bloque afectado, **Then** aparece un estado amigable y el resto del contenido permanece visible.

---

### User Story 3 - Comparar Territorio de Forma Rápida (Priority: P1)

Como visitante, quiero comparar provincias de Cataluña en un orden fijo para interpretar diferencias territoriales de forma inmediata.

**Why this priority**: La comparación territorial es una necesidad explícita del alcance funcional.

**Independent Test**: Se valida comprobando que siempre se muestran cuatro provincias objetivo en orden fijo y con contenido legible.

**Acceptance Scenarios**:

1. **Given** que la persona entra a la sección territorial, **When** observa las tarjetas, **Then** ve exactamente cuatro tarjetas en orden Barcelona, Girona, Lleida y Tarragona.
2. **Given** que falta información de alguna provincia objetivo, **When** se muestra la sección, **Then** se presenta una tarjeta placeholder con mensaje de datos no disponibles sin romper el total de cuatro.

---

### User Story 4 - Navegar Bien en Móvil y Escritorio (Priority: P2)

Como visitante en móvil o escritorio, quiero una navegación adaptada y controles visibles para moverme por la landing de forma cómoda y accesible.

**Why this priority**: Asegura usabilidad consistente y cumplimiento de accesibilidad en todos los tamaños.

**Independent Test**: Se valida en móvil y escritorio verificando menú adaptado, footer oculto en móvil y botón flotante volver arriba al hacer scroll.

**Acceptance Scenarios**:

1. **Given** que el usuario navega desde móvil, **When** abre la landing, **Then** dispone de navegación hamburguesa y no se muestra footer inferior.
2. **Given** que el usuario supera el umbral de scroll, **When** continúa navegando, **Then** aparece el botón volver arriba con foco visible y activación por teclado.
3. **Given** que la navegación principal está visible, **When** la persona revisa el menú, **Then** encuentra exactamente los enlaces Inicio, Datos, Gráficos y Provincias en ese orden.

### Edge Cases

- ¿Qué ocurre si una fuente devuelve valores vacíos o inválidos? Se deben mostrar valores alternativos legibles en el bloque afectado.
- ¿Qué ocurre si falla una parte de las gráficas? La sección debe seguir mostrando el resto de visualizaciones y contexto.
- ¿Qué ocurre si la landing se publica en subruta? La navegación interna y anclas deben seguir funcionando.
- ¿Qué ocurre si faltan datos de una provincia objetivo? Se mantiene la estructura de cuatro tarjetas con placeholder.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema MUST ensamblar la página principal con encabezado de navegación, sección principal, bloque de datos (incluyendo sub-bloque de sectores), bloque territorial y pie de página.
- **FR-002**: El bloque principal MUST incluir un CTA visible que navegue al bloque de datos clave.
- **FR-003**: El bloque de datos MUST mostrar indicadores de Cataluña y visualizaciones de apoyo en la misma vista.
- **FR-004**: El bloque de visualizaciones dentro de `#datos` MUST incluir tres tipos de lectura: comparativa por sector, distribución de impacto y evolución anual de implantación por años.
- **FR-005**: El bloque territorial MUST mostrar exactamente cuatro provincias objetivo en orden fijo: Barcelona, Girona, Lleida y Tarragona.
- **FR-006**: Cuando falte una provincia objetivo, el sistema MUST renderizar placeholder con mensaje de datos no disponibles manteniendo cuatro tarjetas.
- **FR-007**: La navegación MUST funcionar con anclas internas correctas también en despliegues bajo subruta.
- **FR-007a**: El header MUST incluir exactamente estos enlaces en este orden: Inicio, Datos, Gráficos, Provincias.
- **FR-008**: La interfaz MUST usar exclusivamente la paleta definida en `DESIGN.md` (maximo 4 colores del sistema) y MUST cumplir contraste minimo WCAG AA: 4.5:1 para texto normal y 3:1 para texto grande.
- **FR-009**: La jerarquia tipografica MUST definir, como minimo, niveles diferenciados para titulo principal, subtitulo y cuerpo en todos los breakpoints, manteniendo cuerpo >= 16px y diferencia visual consistente de peso/tamano entre niveles.
- **FR-010**: En móvil, el sistema MUST ocultar footer y MUST mostrar navegación hamburguesa.
- **FR-011**: El botón volver arriba MUST aparecer tras superar el umbral de scroll y MUST ser accesible por teclado.
- **FR-011a**: El umbral de aparición del botón volver arriba MUST ser `scrollY > 300px`.
- **FR-012**: Todos los elementos interactivos MUST mantener foco visible y contraste compatible con WCAG AA.
- **FR-013**: Ante fallos parciales de datos, el sistema MUST preservar el render del resto de secciones sin caída global.

### Key Entities _(include if feature involves data)_

- **LandingSection**: Unidad semántica reutilizable de la página principal (encabezado, principal, datos, territorial, sectorial, pie).
- **KpiSummary**: Conjunto de indicadores clave mostrados en la sección de datos.
- **ChartSeriesGroup**: Colección de series para visualización comparativa, distribución y evolución anual.
- **ProvinceCardItem**: Tarjeta territorial con provincia objetivo, métricas y estado de disponibilidad.
- **NavigationAnchor**: Punto de navegación interna para desplazamiento y acceso por subruta.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: En una muestra de 20 cargas manuales ejecutadas con Playwright-CLI en localhost, al menos 19/20 (>=95%) muestran encabezado, bloque principal y CTA sin interaccion adicional.
- **SC-002**: En una muestra de 20 validaciones visuales manuales ejecutadas con Playwright-CLI en localhost, al menos 19/20 (>=95%) muestran disponibles las tres graficas esperadas en la seccion de datos.
- **SC-003**: El 100% de revisiones funcionales confirma el orden fijo de cuatro provincias objetivo en la sección territorial.
- **SC-004**: El 100% de comprobaciones de navegación interna valida acceso correcto a datos, gráficas y provincias en raíz y subruta.
- **SC-005**: El 100% de controles críticos evaluados mantiene foco visible y legibilidad conforme a WCAG AA.
- **SC-006**: El 100% de validaciones funcionales del botón volver arriba confirman aparición únicamente cuando `scrollY > 300px`.

## Assumptions

- Las fuentes de datos internas necesarias estarán disponibles durante la carga normal de la landing.
- La página principal reutiliza secciones y navegación existentes sin rediseñar contratos públicos previos.
- No se incorporan pruebas automatizadas dentro del alcance de esta feature.
- La experiencia prioriza mobile-first y mantiene equivalencia funcional en escritorio.
