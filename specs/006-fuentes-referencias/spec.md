# Feature Specification: Fuentes Referencias

**Feature Branch**: `006-prepare-specify-branch`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "Crear página de fuentes y referencias del estudio IA y Mercado Laboral"

## Clarifications

### Session 2026-04-16

- Q: Que alcance deben tener los graficos de contexto en `/fuentes`? -> A: Reutilizar los mismos 3 graficos de contexto de la landing, usando componentes y datos actuales.
- Q: Como deben abrirse y securizarse los enlaces externos de fuentes? -> A: Abrir en nueva pestana con `target="_blank"` y `rel="noopener noreferrer"`.
- Q: Que comportamiento debe tener el filtrado por categoria? -> A: Seleccion unica (una categoria activa o "todas").
- Q: Como se aplica el limite de 40 caracteres en descripcion? -> A: Truncar hasta 40 visibles con elipsis (`...`) y evitando cortar palabra cuando sea posible.
- Q: Como debe mostrarse un enlace externo invalido? -> A: Mostrar "No disponible" como texto no clicable con estado visual.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Consultar Fuentes en Pagina Dedicada (Priority: P1)

Como visitante, quiero acceder a una pagina dedicada de fuentes desde la navegacion principal para revisar referencias del estudio sin salir del sitio.

**Why this priority**: Es el flujo principal de transparencia y trazabilidad del contenido.

**Independent Test**: Desde cualquier pagina, activar el enlace Fuentes del header y verificar que abre una ruta dedicada con contenido legible.

**Acceptance Scenarios**:

1. **Given** que una persona navega por el sitio, **When** activa el enlace Fuentes en el header, **Then** accede a la ruta dedicada `/fuentes`.
2. **Given** que la persona esta en `/fuentes`, **When** revisa el contenido principal, **Then** encuentra una lista de referencias con nombre del estudio, tipo, fuente, descripcion y enlace externo.

---

### User Story 2 - Leer Referencias en Cualquier Dispositivo (Priority: P1)

Como visitante en desktop o movil, quiero consumir las fuentes en un formato responsive para comparar registros sin friccion.

**Why this priority**: Asegura usabilidad real en el punto mas consultivo de la experiencia.

**Independent Test**: En desktop verificar tabla clasica con columnas completas; en movil verificar tarjetas apiladas con la misma informacion.

**Acceptance Scenarios**:

1. **Given** que la persona visualiza la pagina en desktop, **When** revisa el bloque de referencias, **Then** ve tabla clasica con columnas definidas y nombre del estudio en negrita.
2. **Given** que la persona visualiza la pagina en movil, **When** revisa el bloque de referencias, **Then** ve tarjetas apiladas que preservan todos los campos.
3. **Given** que cada registro tiene descripcion, **When** se renderiza el listado, **Then** cada descripcion visible no supera 40 caracteres.

---

### User Story 3 - Filtrar y Entender Tipo de Fuente (Priority: P2)

Como visitante, quiero filtrar opcionalmente por categoria y reconocer visualmente el origen de cada referencia para encontrar rapido la evidencia que me interesa.

**Why this priority**: Mejora descubrimiento, pero no bloquea la consulta base de referencias.

**Independent Test**: Aplicar filtro por categoria y comprobar que la lista resultante coincide; validar iconografia por tipo de fuente.

**Acceptance Scenarios**:

1. **Given** que la pagina muestra referencias, **When** aplico filtro por categoria (gubernamental, universidad o fundacion), **Then** solo se muestran registros de la categoria seleccionada.
2. **Given** que la pagina renderiza cada referencia, **When** observo el tipo de fuente, **Then** veo icono SVG asociado y etiqueta textual comprensible.

---

### User Story 4 - Mantener Visualizacion y Resiliencia de Datos (Priority: P2)

Como visitante, quiero ver graficos de contexto y una respuesta amigable ante fallos parciales para que la pagina siga siendo util aunque una fuente falle.

**Why this priority**: Refuerza confianza al mantener continuidad visual y robustez.

**Independent Test**: Verificar presencia de graficos de contexto en la pagina y forzar un fallo parcial para confirmar que se mantiene el resto del contenido.

**Acceptance Scenarios**:

1. **Given** que la pagina carga correctamente, **When** entro a `/fuentes`, **Then** se muestran graficos de contexto visibles junto al contenido de referencias.
2. **Given** que falla una fuente puntual, **When** se renderiza la pagina, **Then** aparece mensaje amigable del elemento afectado y el resto de referencias y graficos permanecen visibles.

### Edge Cases

- Si `src/data/fuentes.json` contiene menos de 8 registros validos, se muestra estado de datos insuficientes sin bloquear toda la pagina.
- Si un enlace externo no es valido, el registro MUST mostrar "No disponible" como texto no clicable con estado visual y no romper el resto de la lista.
- Si un tipo o categoria no coincide con valores esperados, el registro se muestra en categoria "otros" con iconografia neutral.
- Si no hay coincidencias en filtros, se muestra estado vacio claro con accion para limpiar filtros.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema MUST exponer una pagina dedicada de referencias en la ruta `/fuentes` y no como seccion ancla.
- **FR-002**: La navegacion principal MUST incluir el enlace "Fuentes" y permitir acceso directo a `/fuentes` desde cualquier pagina.
- **FR-003**: La pagina MUST cargar registros desde el catalogo interno de fuentes del proyecto y mostrar al menos 8 fuentes cuando los datos esten disponibles.
- **FR-004**: El listado MUST mostrar estos campos por registro: nombre del estudio, tipo, fuente, descripcion corta y enlace externo.
- **FR-005**: El nombre del estudio MUST mostrarse destacado y la descripcion MUST limitarse a 40 caracteres visibles, aplicando elipsis (`...`) y evitando cortar palabra cuando sea posible.
- **FR-006**: Para enlaces externos validos, el sistema MUST abrir en nueva pestana con `target="_blank"` y `rel="noopener noreferrer"`, manteniendo formato de texto enlazado legible para usuario.
- **FR-007**: La visualizacion MUST ser responsive con formato tabular en desktop y tarjetas apiladas en movil.
- **FR-008**: El sistema MUST permitir filtrado opcional por categoria con seleccion unica (una categoria activa o "todas"): gubernamental, universidad y fundacion.
- **FR-009**: Cada registro MUST mostrar iconografia SVG por tipo de fuente para apoyo visual consistente.
- **FR-010**: La pagina MUST mostrar los mismos 3 graficos de contexto ya existentes en la landing, reutilizando componentes y datos actuales junto al contenido de referencias.
- **FR-011**: Ante fallo parcial de una fuente, el sistema MUST mostrar mensaje amigable en el bloque afectado y mantener visible el resto del contenido.
- **FR-015**: Si un enlace externo es invalido, el sistema MUST renderizar "No disponible" como texto no clicable con estado visual y mantener visible el resto del registro.
- **FR-012**: La interfaz MUST cumplir WCAG AA, incluyendo contraste minimo 4.5:1 para texto normal y foco visible en elementos interactivos.
- **FR-013**: Los enlaces internos del header MUST resolver correctamente en despliegue bajo subruta.
- **FR-014**: El estilo visual MUST mantener coherencia con la linea cromatica terracota, verde y crema definida por el producto.

### Key Entities _(include if feature involves data)_

- **FuenteReferencia**: Registro de evidencia con atributos de nombre, tipo, categoria, organismo, descripcion corta y enlace externo.
- **CategoriaFiltro**: Valor de segmentacion de lista (`gubernamental`, `universidad`, `fundacion`) usado para filtrado opcional.
- **EstadoFuente**: Estado de disponibilidad por registro (`disponible`, `no-disponible`, `datos-insuficientes`) para manejar fallos parciales.
- **IconoTipoFuente**: Representacion visual asociada a origen de fuente para lectura rapida.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El 100% de verificaciones de navegacion confirman acceso a `/fuentes` desde el enlace "Fuentes" del header.
- **SC-002**: En validacion responsive, el 100% de revisiones confirma tabla en desktop y tarjetas en movil con los mismos campos.
- **SC-003**: Al menos el 95% de registros validos muestran descripcion truncada a <= 40 caracteres visibles con elipsis y enlace externo funcional en nueva pestana con atributos de seguridad requeridos.
- **SC-004**: El 100% de validaciones de filtros confirma resultados correctos para cada categoria disponible en modo de seleccion unica.
- **SC-005**: El 100% de comprobaciones de accesibilidad critica confirma contraste WCAG AA y foco visible en controles interactivos.
- **SC-006**: El 100% de escenarios de fallo parcial (incluyendo enlaces externos invalidos) mantiene visible contenido no afectado, muestra mensaje/estado amigable y evita enlaces clicables invalidos.
- **SC-007**: El 95% de revisiones visuales confirma que los 3 graficos de contexto reutilizados de la landing son visibles en la pagina `/fuentes`.

## Assumptions

- El dataset `src/data/fuentes.json` dispone de estructura consistente y categorias alineadas con el dominio esperado.
- El proyecto mantiene la misma navegacion principal compartida entre paginas.
- El alcance no incluye pruebas automatizadas unitarias, de integracion ni e2e.
- Las referencias externas permiten apertura en nueva pestana sin autenticacion adicional.
- La pagina de fuentes reutiliza patrones visuales existentes del sistema para mantener coherencia de marca.
