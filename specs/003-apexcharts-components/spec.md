# Feature Specification: ApexCharts Components

**Feature Branch**: `[003-apexcharts-components]`  
**Created**: April 16, 2026  
**Status**: Draft  
**Input**: User description: "Crear componentes Astro reutilizables para graficas ApexCharts (bar, donut, line), con configuracion desde datos internos y comportamiento interactivo responsive."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Visualizar datos con componentes reutilizables (Priority: P1)

Como visitante del sitio, quiero ver graficas consistentes y reutilizables para entender datos de sectores y provincias sin depender de visualizaciones ad hoc en cada pagina.

**Why this priority**: Es el valor principal del feature: estandarizar visualizacion de datos para que distintas secciones compartan una experiencia coherente.

**Independent Test**: Puede validarse renderizando una pagina de ejemplo que muestre las tres visualizaciones y comprobando que cada tipo de grafica se presenta correctamente con datos validos.

**Acceptance Scenarios**:

1. **Given** una pagina con datos de sectores, **When** se carga la visualizacion, **Then** se muestra una grafica de barras legible y reutilizable para comparacion.
2. **Given** una pagina con distribuciones porcentuales, **When** se solicita la visualizacion, **Then** se muestra una grafica de donut que facilita lectura de proporciones.
3. **Given** una pagina con datos temporales, **When** se representa la serie, **Then** se muestra una grafica de lineas que permite entender tendencia en el tiempo.

---

### User Story 2 - Explorar datos con interacciones claras (Priority: P2)

Como usuario, quiero interaccionar con leyendas y tooltips para inspeccionar valores con mayor detalle sin perder contexto de lectura.

**Why this priority**: La interactividad aporta valor analitico directo y mejora la comprension sin requerir vistas adicionales.

**Independent Test**: Puede validarse al pasar el cursor y activar/desactivar series, verificando respuesta visual inmediata y coherente.

**Acceptance Scenarios**:

1. **Given** una grafica cargada, **When** el usuario pasa el cursor sobre un punto o segmento, **Then** aparece informacion contextual clara del dato.
2. **Given** una grafica con leyenda visible, **When** el usuario selecciona una serie desde la leyenda, **Then** la visualizacion refleja el cambio de forma comprensible.

---

### User Story 3 - Consultar graficas en movil y desktop sin friccion (Priority: P2)

Como usuario en distintos dispositivos, quiero que las graficas mantengan legibilidad y proporcion adecuada para interpretar datos en movil y desktop.

**Why this priority**: El sitio es mobile-first, por lo que la experiencia en pantallas pequenas debe conservar utilidad analitica.

**Independent Test**: Puede validarse cambiando viewport movil/desktop y comprobando que cada grafica adapta altura y mantiene legibilidad.

**Acceptance Scenarios**:

1. **Given** un usuario en movil, **When** abre una vista con graficas, **Then** las visualizaciones conservan una altura adecuada para lectura sin desbordes.
2. **Given** un usuario en desktop, **When** consulta las mismas graficas, **Then** las visualizaciones se expanden a una altura mayor sin perder claridad.

---

### Edge Cases

- Que ocurre cuando la configuracion de una grafica no existe o llega incompleta?
- Como se comporta la visualizacion cuando una serie contiene valores vacios o nulos?
- Que sucede cuando la cantidad de categorias supera el espacio visible disponible?
- Como se presenta el estado cuando no hay datos para una grafica solicitada?

## Clarifications

### Session 2026-04-16

- Q: ¿Qué comportamiento debe tener la UI cuando falta configuración o datos de una gráfica? → A: Mostrar estado vacío en tarjeta con mensaje + CTA de recarga o volver a filtros
- Q: ¿Cómo debe resolverse la carga diferida de ApexCharts? → A: Usar helper global para inicialización diferida y reutilizarlo en Bar/Donut/Line
- Q: ¿Qué contrato responsive se define para altura de gráficas? → A: Altura fija por breakpoint: 300px móvil y 350px desktop
- Q: ¿Cómo se define el dataset temporal para LineChart en esta fase? → A: Definir dataset 2023-2033 dentro de src/data/charts-config.json

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema MUST ofrecer un componente reutilizable de grafica de barras para comparativas por categoria.
- **FR-002**: El sistema MUST ofrecer un componente reutilizable de grafica de donut para distribuciones porcentuales.
- **FR-003**: El sistema MUST ofrecer un componente reutilizable de grafica de lineas para tendencias temporales.
- **FR-004**: El sistema MUST obtener configuraciones de graficas desde una fuente de datos interna del proyecto, incluyendo la serie temporal 2023-2033 para LineChart en `src/data/charts-config.json`.
- **FR-005**: El sistema MUST aplicar una paleta visual consistente y limitada para todas las visualizaciones del feature.
- **FR-006**: El sistema MUST mostrar informacion contextual en interacciones de hover sobre elementos de grafica.
- **FR-007**: El sistema MUST permitir interaccion con leyenda para alternar o enfatizar series de datos.
- **FR-008**: El sistema MUST mantener tipografia consistente en textos de apoyo dentro de las visualizaciones.
- **FR-009**: El sistema MUST adaptar la altura de graficas segun contexto movil y desktop para preservar legibilidad, usando 300px en movil y 350px en desktop.
- **FR-010**: El sistema MUST contemplar estados de falta de datos o configuracion incompleta sin romper la interfaz, mostrando estado vacio en tarjeta con mensaje claro y CTA de recarga o retorno a filtros.
- **FR-011**: El sistema MUST centralizar reglas compartidas de configuracion para evitar inconsistencias entre componentes.
- **FR-012**: El sistema MUST priorizar carga eficiente y experiencia fluida al mostrar visualizaciones en pagina, centralizando la inicializacion diferida de ApexCharts mediante helper global reutilizable.

### Key Entities _(include if feature involves data)_

- **Chart Component**: Unidad reutilizable de visualizacion para barras, donut o lineas.
- **Chart Configuration**: Definicion de serie, etiquetas, estilos e interacciones de cada visualizacion.
- **Chart Dataset**: Conjunto de valores y categorias utilizados para renderizar una grafica.
- **Global Chart Rules**: Reglas compartidas de presentacion e interaccion aplicadas transversalmente.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El 100% de visualizaciones objetivo se renderiza correctamente con datos validos en una pagina de referencia.
- **SC-002**: El 100% de graficas mantiene legibilidad en movil y desktop con alturas adaptadas al dispositivo.
- **SC-003**: Al menos el 95% de interacciones de hover muestran informacion contextual sin errores visuales.
- **SC-004**: El 100% de componentes de grafica usa una configuracion visual compartida y consistente.
- **SC-005**: El 100% de escenarios sin datos o con configuracion incompleta muestra fallback comprensible para el usuario.

## Assumptions

- Las fuentes de datos internas necesarias para configurar graficas estaran disponibles durante la implementacion.
- La navegacion y el layout actuales del sitio no requieren cambios estructurales profundos para alojar estas visualizaciones.
- El feature se integra con la guia visual existente del proyecto y no redefine la identidad de marca.
- La validacion de calidad se realizara mediante pruebas manuales funcionales y visuales.
- La primera iteracion cubre barras, donut y lineas; otros tipos de visualizacion quedan fuera de alcance.
