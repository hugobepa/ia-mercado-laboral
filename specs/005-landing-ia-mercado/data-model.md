# Data Model: Landing IA Mercado

## Entity: LandingComposition

- Description: Contrato de ensamblaje de la página principal.
- Fields:
  - `layout`: string (`BaseLayout`)
  - `sections`: array (`inicio`, `datos`, `sectores`, `provincias`)
  - `navOrder`: array fija (`Inicio`, `Datos`, `Gráficos`, `Provincias`)
- Validation rules:
  - Deben existir todas las anclas requeridas.
  - El orden de navegación no puede variar.

## Entity: HeroContent

- Description: Contenido principal de apertura.
- Fields:
  - `title`: string
  - `subtitle`: string
  - `ctaLabel`: string
  - `ctaHref`: string (ancla hacia datos)
- Validation rules:
  - `title` y `ctaLabel` obligatorios.
  - `ctaHref` debe resolver a `#datos` con path seguro.

## Entity: DataSummaryCatalunya

- Description: Indicadores clave de Cataluña para bloque de datos.
- Source: `src/data/randstad-catalunya.json`.
- Fields:
  - `ocupados_actuales_2023`: number
  - `porcentaje_riesgo`: number
  - `nuevos_empleos_creados`: number
- Validation rules:
  - Si un valor falta o es inválido, mostrar fallback legible.
  - Error parcial no bloquea render global.

## Entity: ChartGroup

- Description: Conjunto de visualizaciones del bloque de datos/sectores.
- Source: `src/data/charts-config.json`.
- Fields:
  - `barChart`: object
  - `donutChart`: object
  - `lineChart`: object
- Validation rules:
  - Deben existir configuraciones para barra, donut y línea anual.
  - Si una falla, las demás siguen visibles.

## Entity: TerritorySummary

- Description: Contexto territorial agregado de Cataluña.
- Source: `src/data/idescat-provincias.json`.
- Fields:
  - `avgAdopcionIA`: number
  - `message`: string
- Validation rules:
  - Si no hay provincias válidas, mostrar mensaje de fallback.

## Entity: ProvinceCardItem

- Description: Tarjeta por provincia objetivo.
- Source: `src/data/idescat-provincias.json` (`provincias`).
- Fields:
  - `nombre`: string
  - `ocupados_2023`: number
  - `adopcionIA`: number
  - `riesgo_automatizacion_pct`: number
  - `ejemplo_cotidiano`: string
- Derived constraints:
  - Orden fijo: Barcelona, Girona, Lleida, Tarragona.
  - Si falta provincia objetivo: placeholder `Datos no disponibles`.

## Entity: ScrollTopControl

- Description: Botón flotante de retorno al inicio.
- Fields:
  - `thresholdPx`: number (=300)
  - `visible`: boolean
  - `keyboardAccessible`: boolean
- Validation rules:
  - Visible solo cuando `scrollY > 300px`.
  - Debe poder activarse por teclado y mostrar foco visible.

## Cross-entity constraints

- La landing debe seguir operativa ante fallo parcial de cualquier fuente.
- Navegación y anclas deben funcionar en raíz y subruta.
- No se añaden suites de test automáticas en esta feature.
