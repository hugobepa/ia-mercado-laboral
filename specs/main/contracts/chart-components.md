# Chart Component Interface Contracts

**Version**: 1.0  
**Date**: 2026-04-14  
**Status**: ✅ Finalized

## Overview

Defines the public interfaces for all chart components used in the landing page. These contracts ensure consistent data flow, accessibility, and performance across all visualizations.

## Base Chart Interface

All chart components must implement this base interface:

```typescript
interface BaseChartProps {
  // Data Configuration
  data: ChartData[];
  config: ChartConfig;

  // Interaction
  filterId?: string; // HTMX target for dynamic updates
  onError?: (error: string) => void;

  // Performance
  lazy?: boolean; // Default: true (lazy load)
  skeleton?: boolean; // Default: true (show loading state)

  // Accessibility
  ariaLabel: string; // Required for screen readers
  dataTableId?: string; // Link to associated data table

  // Styling
  className?: string;
  theme?: "light" | "dark"; // Default: light
}

interface ChartData {
  label: string;
  value: number;
  metadata?: Record<string, any>;
}

interface ChartConfig {
  title: string;
  subtitle?: string;
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  colors?: string[]; // Must use DESIGN.md palette
  responsive: boolean; // Default: true
}
```

## Specific Chart Contracts

### BarChart.astro

```typescript
interface BarChartProps extends BaseChartProps {
  orientation?: "horizontal" | "vertical";    // Default: vertical
  stacked?: boolean;                         // Default: false

  // Bar-specific configuration
  barConfig?: {
    borderRadius?: number;                   // Default: 4
    spacing?: number;                       // Default: 0.65
    maxBarWidth?: number;                   // Default: 60
  };
}

// Usage Example:
<BarChart
  data={employmentData}
  config={{
    title: "Desempleo por Provincia",
    xAxis: { categories: provinces },
    yAxis: { title: "Tasa (%)" }
  }}
  ariaLabel="Gráfico de barras mostrando tasa de desempleo por provincia catalana"
  filterId="province-filter"
  lazy={true}
/>
```

### DonutChart.astro

```typescript
interface DonutChartProps extends BaseChartProps {
  innerRadius?: number;                      // Default: 50%
  showLabels?: boolean;                     // Default: true
  showPercentages?: boolean;                // Default: true

  // Donut-specific configuration
  donutConfig?: {
    startAngle?: number;                    // Default: -90
    endAngle?: number;                      // Default: 270
    dataLabels?: {
      enabled?: boolean;                    // Default: true
      formatter?: string;                   // Default: "{series.name}: {point.percentage:.1f}%"
    };
  };
}

// Usage Example:
<DonutChart
  data={sectorData}
  config={{
    title: "Distribución por Sector",
    colors: ["var(--color-terracota)", "var(--color-verde)"]
  }}
  ariaLabel="Gráfico circular mostrando distribución del empleo por sectores"
  showPercentages={true}
/>
```

### LineChart.astro (New - to be created)

```typescript
interface LineChartProps extends BaseChartProps {
  smooth?: boolean;                         // Default: true
  markers?: boolean;                        // Default: false

  // Line-specific configuration
  lineConfig?: {
    stroke?: {
      width?: number;                       // Default: 2
      dashArray?: number[];                // Default: [0] (solid)
    };
    fill?: {
      gradient?: boolean;                   // Default: false
    };
  };
}

// Usage Example:
<LineChart
  data={trendData}
  config={{
    title: "Evolución del Empleo 2020-2024",
    xAxis: { type: "datetime" },
    yAxis: { title: "Personas (miles)" }
  }}
  ariaLabel="Gráfico de línea mostrando evolución temporal del empleo"
  smooth={true}
/>
```

## Chart Data Provider Contract

Interface for data fetching and filtering:

```typescript
interface ChartDataProvider {
  // Data Access
  getData(source: DataSource, filters?: DataFilters): Promise<ChartData[]>;
  getProvinces(): Province[];
  getSources(): SourceMetadata[];

  // Filtering
  filterByProvince(data: ChartData[], province: string | "all"): ChartData[];
  filterByDateRange(data: ChartData[], start: Date, end: Date): ChartData[];

  // Validation
  validateData(data: unknown): data is ChartData[];

  // Error Handling
  handleDataError(error: Error): ErrorState;
}

interface DataFilters {
  province?: string | "all";
  dateRange?: [Date, Date];
  source?: DataSource[];
  sector?: string[];
}
```

## HTMX Integration Contract

For dynamic chart updates without page reload:

```typescript
interface HTMXChartUpdate {
  // HTMX Attributes (applied to chart containers)
  "hx-get": string;                 // "/api/chart-data?province={province}"
  "hx-trigger": string;            // "change from:#province-filter"
  "hx-target": string;             // "#chart-container"
  "hx-indicator": string;          // "#loading-spinner"
  "hx-swap": string;               // "innerHTML"

  // Loading States
  "hx-on::before-request": string; // Show skeleton
  "hx-on::after-request": string;  // Hide skeleton
  "hx-on::response-error": string; // Show error message
}

// Implementation Pattern:
<div
  id="employment-chart"
  hx-get="/components/charts/employment-data"
  hx-trigger="change from:#province-filter"
  hx-target="this"
  hx-indicator="#chart-loader"
  hx-swap="innerHTML"
  class="chart-container"
>
  <!-- Chart content or skeleton -->
</div>
```

## Error Handling Contract

Standardized error states across all charts:

```typescript
interface ChartErrorContract {
  // Error Types
  errorType: "data" | "render" | "network" | "validation";

  // Error Display
  showRetryButton: boolean;         // Default: true
  retryAction: () => void;         // Function to retry loading

  // Error Messages (internationalized)
  messages: {
    data: "Error al cargar los datos. Inténtalo de nuevo.";
    render: "Error al mostrar el gráfico. Actualiza la página.";
    network: "Error de conexión. Verifica tu conexión a internet.";
    validation: "Los datos recibidos no son válidos.";
  };

  // Accessibility
  ariaLive: "polite" | "assertive";  // Default: polite
  errorId: string;                   // For aria-describedby
}

// Error Component Usage:
<ChartErrorBoundary
  onRetry={() => window.location.reload()}
  errorId="chart-error-1"
  ariaLive="polite"
>
  <BarChart {...chartProps} />
</ChartErrorBoundary>
```

## Performance Contract

Loading and optimization requirements:

```typescript
interface ChartPerformanceContract {
  // Lazy Loading
  intersectionThreshold: 0.1; // Load when 10% visible
  rootMargin: "100px"; // Start loading 100px before visible

  // Bundle Size Targets
  maxBundleSize: "50KB"; // Per chart component
  maxApexChartsBundle: "150KB"; // Total ApexCharts import

  // Rendering Performance
  maxRenderTime: 200; // ms - show skeleton if longer
  maxUpdateTime: 100; // ms - for filter updates

  // Memory Management
  disposeOnUnmount: true; // Cleanup charts on component removal
  reuseInstances: false; // Create new instances for data changes
}
```

## Accessibility Contract

WCAG AA compliance requirements:

```typescript
interface ChartAccessibilityContract {
  // Required ARIA attributes
  "aria-label": string;              // Chart description
  "aria-describedby"?: string;       // Link to data table
  "aria-live"?: "polite";           // For dynamic updates
  "role": "img" | "application";     // Default: img

  // Keyboard Navigation
  tabIndex?: 0;                      // Focusable for keyboard users
  onKeyPress?: (event: KeyboardEvent) => void;  // Space/Enter for details

  // Color & Contrast
  contrastRatio: 4.5;               // Minimum for text
  colorBlindSafe: true;             // Use shape + color differentiation

  // Alternative Formats
  dataTable: {
    id: string;                     // Associated table ID
    caption: string;                // Table description
    headers: string[];              // Column headers
    rows: (string | number)[][];    // Table data
  };

  // Text Alternatives
  longDescription?: string;          // Extended chart description
  summaryStats?: {                  // Key insights for screen readers
    min: number;
    max: number;
    average: number;
    trend?: "increasing" | "decreasing" | "stable";
  };
}

// Accessibility Implementation Example:
<div class="chart-with-table">
  <BarChart
    aria-label="Tasa de desempleo por provincia catalana en 2024"
    aria-describedby="unemployment-table"
    role="img"
    tabIndex={0}
    dataTable={{
      id: "unemployment-table",
      caption: "Datos de desempleo por provincia",
      headers: ["Provincia", "Tasa (%)"],
      rows: [["Barcelona", "12.5"], ["Girona", "8.3"]]
    }}
  />

  <table id="unemployment-table" class="sr-only">
    <caption>Datos de desempleo por provincia</caption>
    <!-- Table data for screen readers -->
  </table>
</div>
```

## Contract Validation

All components implementing these contracts must:

1. ✅ **Type Safety**: Pass TypeScript strict mode compilation
2. ✅ **Runtime Validation**: Validate props using Zod or similar
3. ✅ **Accessibility Testing**: Pass axe-core automated tests
4. ✅ **Performance Testing**: Meet Core Web Vitals targets
5. ✅ **Visual Testing**: Match DESIGN.md specifications
6. ✅ **Integration Testing**: Work with HTMX filtering

## Breaking Changes

Any changes to these interfaces require:

1. Version bump in this contract document
2. Update all implementing components
3. Update tests and documentation
4. Backward compatibility plan or migration guide

---

**Next**: See `data-api-contracts.md` for data layer interfaces
