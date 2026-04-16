# Feature Specification: Secciones reutilizables landing IA

**Feature Branch**: `004-run-git-feature`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "Crear secciones de página reutilizables para la landing page IA y Mercado Laboral con Hero, sección de datos con gráficas y cards de provincias, usando datos internos y cumpliendo lineamientos de diseño, accesibilidad y despliegue en subruta"

## Clarifications

### Session 2026-04-16

- Q: ¿Cuál es el destino del CTA principal del Hero? → A: Navega siempre a la sección de datos (#datos).
- Q: ¿Qué hacer si falla una fuente de datos? → A: Mostrar estado de error amigable y mantener visible el resto del contenido.
- Q: ¿Qué orden deben tener las tarjetas de provincias? → A: Orden fijo: Barcelona, Girona, Lleida, Tarragona.
- Q: ¿Qué hacer si falta una provincia objetivo? → A: Mostrar tarjeta placeholder con mensaje "Datos no disponibles" para mantener 4 tarjetas.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Comprender mensaje principal rápido (Priority: P1)

Como visitante de la landing, quiero ver un bloque principal claro con un mensaje contundente, un subtítulo fácil de entender y una llamada a la acción visible para decidir rápidamente si continúo explorando los datos.

**Why this priority**: Es la primera impresión de la página y define si el usuario avanza o abandona.

**Independent Test**: Puede probarse cargando la landing desde cero y verificando que el bloque principal muestre título, subtítulo y CTA accionable sin depender de otras secciones.

**Acceptance Scenarios**:

1. **Given** que una persona entra a la landing por primera vez, **When** se renderiza la parte superior de la página, **Then** ve un título principal, un subtítulo en lenguaje coloquial y un botón de acción claramente identificable.
2. **Given** que la persona activa el CTA principal del Hero, **When** se procesa la navegación interna, **Then** la vista se desplaza a la sección de datos identificada como #datos.
3. **Given** que la persona navega con teclado, **When** llega al CTA principal, **Then** el foco visual es perceptible y el botón puede activarse sin ratón.

---

### User Story 2 - Entender cifras clave con contexto visual (Priority: P1)

Como visitante interesado en el impacto laboral, quiero consultar un resumen de datos clave y gráficos de apoyo en una misma sección para entender tendencias sin tener que saltar entre pantallas.

**Why this priority**: El valor principal de la landing es comunicar datos de forma clara y comprensible.

**Independent Test**: Puede probarse abriendo la sección de datos y confirmando que muestra cifras clave y visualizaciones coherentes con la información publicada.

**Acceptance Scenarios**:

1. **Given** que la sección de datos está visible, **When** el usuario la revisa, **Then** encuentra indicadores clave y gráficos con etiquetas comprensibles.
2. **Given** que un gráfico no dispone de datos válidos, **When** la sección se renderiza, **Then** se presenta un estado alternativo entendible que permite seguir navegando.
3. **Given** que falla una fuente de datos puntual, **When** la sección se renderiza, **Then** se muestra un estado de error amigable en el bloque afectado y el resto del contenido permanece visible.

---

### User Story 3 - Comparar provincias de forma rápida (Priority: P2)

Como visitante, quiero ver tarjetas de provincias con ejemplos cotidianos para comparar diferencias territoriales sin leer tablas largas.

**Why this priority**: Aporta contexto local y facilita la comprensión de impacto por territorio.

**Independent Test**: Puede probarse accediendo a la sección de provincias y verificando que aparecen cuatro tarjetas diferenciadas con contenido legible en móvil y escritorio.

**Acceptance Scenarios**:

1. **Given** que el usuario llega a la sección de provincias, **When** se muestran las tarjetas, **Then** visualiza exactamente cuatro provincias objetivo con su contenido asociado.
2. **Given** que el usuario usa móvil, **When** revisa las tarjetas, **Then** la distribución mantiene legibilidad y no requiere zoom horizontal.
3. **Given** que la sección de provincias se renderiza, **When** se presentan las cuatro tarjetas, **Then** el orden visual es fijo: Barcelona, Girona, Lleida y Tarragona.
4. **Given** que falta una provincia objetivo en la fuente de datos, **When** se renderiza la sección territorial, **Then** se muestra una tarjeta placeholder con el texto "Datos no disponibles" y se conserva el total de 4 tarjetas.

---

### Edge Cases

- ¿Qué ocurre si faltan campos no críticos en un registro de provincia? Se debe mostrar contenido disponible sin romper la estructura visual.
- ¿Qué ocurre si una cifra llega vacía o inválida en datos clave? Debe mostrarse un valor alternativo legible y no un fallo de renderizado.
- ¿Qué ocurre si la landing se publica bajo subruta (no dominio raíz)? Los enlaces internos y CTAs deben seguir funcionando correctamente.
- ¿Qué ocurre si no se carga una gráfica por error puntual? Debe mostrarse un estado de respaldo con texto claro y acción de continuidad.
- ¿Qué ocurre si falla una fuente completa (Randstad o Idescat)? Debe mostrarse error amigable en la parte afectada sin bloquear el resto de la landing.
- ¿Qué ocurre si falta una provincia objetivo en el dataset? Debe renderizarse una tarjeta placeholder para mantener consistencia de layout y cobertura de 4 provincias.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: La landing MUST incluir una sección principal reutilizable con título, subtítulo y una acción principal visible.
- **FR-002**: La sección principal MUST comunicar el contexto de "IA y mercado laboral" en lenguaje comprensible para público general.
- **FR-002a**: El CTA principal del Hero MUST navegar siempre a la sección interna `#datos`.
- **FR-003**: La landing MUST incluir una sección de datos reutilizable que combine cifras clave y visualizaciones en el mismo bloque informativo.
- **FR-004**: La sección de datos MUST consumir y mostrar datos publicados de Randstad e Idescat para contexto de cifras y lectura territorial.
- **FR-005**: La sección de datos MUST incluir visualizaciones con etiquetas entendibles y contenido alternativo cuando falten datos.
- **FR-006**: La landing MUST incluir una sección reutilizable de tarjetas territoriales con exactamente cuatro provincias objetivo: Barcelona, Girona, Lleida y Tarragona.
- **FR-007**: La sección de tarjetas provinciales MUST mantener un orden fijo de presentación (Barcelona, Girona, Lleida y Tarragona), incluir ejemplo cotidiano por tarjeta y, si falta una provincia objetivo, renderizar placeholder con el mensaje "Datos no disponibles" manteniendo el total de cuatro tarjetas.
- **FR-008**: La presentación MUST respetar el sistema visual de marca establecido (paleta, jerarquía tipográfica y bordes asimétricos).
- **FR-009**: La distribución responsive MUST funcionar mobile-first con 1 columna en móvil, 2 en tablet y 3 en escritorio cuando aplique a rejillas de contenido.
- **FR-010**: En vistas móviles, la página MUST omitir el footer y MUST exponer una acción flotante de "volver arriba" accesible.
- **FR-011**: Los elementos interactivos MUST cumplir accesibilidad WCAG AA, incluyendo contraste suficiente y foco visible.
- **FR-012**: La navegación y los enlaces internos MUST funcionar correctamente tanto en raíz como en despliegues bajo subruta.
- **FR-013**: Las secciones definidas MUST poder reutilizarse en la landing sin duplicar contenido ni crear dependencias rígidas entre bloques.
- **FR-014**: Ante fallo parcial de una fuente de datos, el sistema MUST mostrar un estado de error amigable en el bloque afectado y MUST mantener renderizado el resto del contenido de la página.

### Key Entities _(include if feature involves data)_

- **LandingSection**: Bloque reutilizable de página con identidad semántica (hero, datos, provincias), título y contenido principal.
- **KpiSummary**: Conjunto de indicadores clave de mercado laboral para comunicar magnitudes resumidas.
- **SectorImpactItem**: Registro de sector con métricas de impacto para alimentar visualizaciones comparativas.
- **ProvinceCardItem**: Registro territorial con nombre de provincia, datos descriptivos y ejemplo cotidiano.
- **ChartPresentationConfig**: Parámetros de presentación de visualización (etiquetas, categorías, colores y formato) para mantener consistencia.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Al menos el 95% de las visitas muestran el bloque principal completo (título, subtítulo y CTA) en la primera carga sin interacción adicional.
- **SC-002**: El 90% de usuarios de prueba identifica correctamente el mensaje principal de la landing en menos de 10 segundos.
- **SC-003**: El 95% de sesiones de prueba visualiza la sección de datos sin errores de contenido bloqueante y con al menos una visualización disponible.
- **SC-004**: El 100% de las pruebas de aceptación confirman la presencia de las 4 provincias objetivo en la sección territorial.
- **SC-005**: El 100% de los controles interactivos críticos evaluados en la landing muestran foco visible y contraste compatible con WCAG AA.
- **SC-006**: El 100% de los enlaces internos de la landing funcionan correctamente tanto en entorno raíz como en subruta de publicación.

### Protocolos de medicion

- **SC-001 protocolo**: registrar 20 cargas iniciales de la landing (desktop+mobile) y contar en cuantas se renderiza Hero completo (titulo, subtitulo, CTA) sin interacción.
- **SC-001 formula**: tasa = (cargas_validas / 20) \* 100; criterio pass >= 95.
- **SC-002 protocolo**: test moderado con 10 usuarios, medir tiempo hasta verbalizar correctamente el mensaje principal.
- **SC-002 formula**: usuarios*en*<=10s / 10 \* 100; criterio pass >= 90.

## Assumptions

- Los archivos de datos internos requeridos permanecen disponibles y con estructura compatible durante esta iteración.
- La landing reutiliza componentes base ya existentes para botones, tarjetas y visualizaciones sin rediseñar su API pública.
- El alcance incluye únicamente las secciones Hero, Datos y Provincias solicitadas, sin añadir nuevas secciones editoriales.
- La publicación final seguirá el patrón actual de despliegue estático con rutas internas relativas/normalizadas.
- La validación de accesibilidad se centrará en contraste, foco visible, estructura semántica y navegabilidad por teclado en las secciones del alcance.
