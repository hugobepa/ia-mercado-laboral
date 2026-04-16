// Data Model: TypeScript interfaces for Landing Principal
// Generated from specs/main/data-model.md

// Province Entity
export interface Province {
  id: string; // "barcelona", "girona", etc.
  name: string; // "Barcelona", "Girona", etc.
  code?: string; // INE code if applicable
  region: string; // "Catalunya", "España"
}

// Data Source enumeration
export enum DataSource {
  RANDSTAD = "randstad",
  IDESCAT = "idescat",
  OECD = "oecd",
}

// Source metadata
export interface SourceMetadata {
  name: string;
  year: number;
  description: string;
  url?: string; // Source URL for attribution
  methodology: string;
  lastUpdated: string; // ISO date
}

// Sector data
export interface SectorData {
  sector_name: string;
  employment_count: number;
  growth_rate?: number;
}

// Employment Data Entity
export interface EmploymentData {
  source: DataSource; // "randstad" | "idescat" | "oecd"
  year: number; // 2023, 2024, etc.
  province?: string; // Optional - null means national data
  metrics: {
    unemployment_rate?: number; // percentage
    employment_growth?: number; // percentage change
    ai_impact_score?: number; // Randstad specific
    sector_distribution?: SectorData[];
  };
  metadata: {
    collection_date: string;
    methodology?: string;
    confidence_level?: number;
  };
}

// Chart Configuration Entity
export interface ChartConfig {
  id: string; // "unemployment-by-province"
  type: "bar" | "donut" | "line" | "area";
  title: string;
  subtitle?: string;
  dataSource: DataSource[]; // Can combine multiple sources
  filterBy?: "province" | "sector" | "year";
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  colors?: string[]; // Must use DESIGN.md palette
  responsive: boolean; // Default: true
  accessibility: {
    description: string;
    dataTable: boolean; // Show data table for screen readers
  };
  performance: {
    lazy: boolean; // Load on intersection
    skeleton: boolean; // Show skeleton while loading
  };
}

// Axis configuration
export interface AxisConfig {
  title?: string;
  categories?: string[];
  type?: "category" | "datetime" | "numeric";
  min?: number;
  max?: number;
  formatter?: string;
}

// Chart data structure
export interface ChartData {
  label: string;
  value: number;
  metadata?: Record<string, any>;
}

// Base Chart Props - all chart components must implement this interface
export interface BaseChartProps {
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

// Bar Chart specific props
export interface BarChartProps extends BaseChartProps {
  orientation?: "horizontal" | "vertical"; // Default: vertical
  stacked?: boolean; // Default: false

  // Bar-specific configuration
  barConfig?: {
    borderRadius?: number; // Default: 4
    spacing?: number; // Default: 0.65
    maxBarWidth?: number; // Default: 60
  };
}

// Donut Chart specific props
export interface DonutChartProps extends BaseChartProps {
  innerRadius?: number; // Default: 50%
  showLabels?: boolean; // Default: true
  showPercentages?: boolean; // Default: true

  // Donut-specific configuration
  donutConfig?: {
    startAngle?: number; // Default: -90
    endAngle?: number; // Default: 270
    dataLabels?: {
      enabled?: boolean; // Default: true
      formatter?: string; // Default: "{series.name}: {point.percentage:.1f}%"
    };
  };
}

// UI State Entity
export interface UIState {
  selectedProvince: string | "all"; // Filter state
  loadingStates: {
    [chartId: string]: "loading" | "loaded" | "error";
  };
  errorStates: {
    [chartId: string]: string | null; // Error message or null
  };
}

// Chart Data Provider interface
export interface ChartDataProvider {
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

// Data filters
export interface DataFilters {
  province?: string | "all";
  dateRange?: [Date, Date];
  source?: DataSource[];
  sector?: string[];
}

// Error state
export interface ErrorState {
  errorType: "data" | "render" | "network" | "validation";
  message: string;
  showRetryButton: boolean;
  retryAction: () => void;
}

// Chart error contract
export interface ChartErrorContract {
  // Error Types
  errorType: "data" | "render" | "network" | "validation";

  // Error Display
  showRetryButton: boolean; // Default: true
  retryAction: () => void; // Function to retry loading

  // Error Messages (internationalized)
  messages: {
    data: string;
    render: string;
    network: string;
    validation: string;
  };

  // Accessibility
  ariaLive: "polite" | "assertive"; // Default: polite
  errorId: string; // For aria-describedby
}

// Performance contract
export interface ChartPerformanceContract {
  // Lazy Loading
  intersectionThreshold: number; // 0.1 - Load when 10% visible
  rootMargin: string; // "100px" - Start loading before visible

  // Bundle Size Targets
  maxBundleSize: string; // "50KB" per chart component
  maxApexChartsBundle: string; // "150KB" total ApexCharts import

  // Rendering Performance
  maxRenderTime: number; // 200ms - show skeleton if longer
  maxUpdateTime: number; // 100ms - for filter updates

  // Memory Management
  disposeOnUnmount: boolean; // Cleanup charts on component removal
  reuseInstances: boolean; // Create new instances for data changes
}

// Accessibility contract
export interface ChartAccessibilityContract {
  // Required ARIA attributes
  "aria-label": string; // Chart description
  "aria-describedby"?: string; // Link to data table
  "aria-live"?: "polite"; // For dynamic updates
  role: "img" | "application"; // Default: img

  // Keyboard Navigation
  tabIndex?: number; // Focusable for keyboard users
  onKeyPress?: (event: KeyboardEvent) => void; // Space/Enter for details

  // Color & Contrast
  contrastRatio: number; // 4.5 minimum for text
  colorBlindSafe: boolean; // Use shape + color differentiation

  // Alternative Formats
  dataTable: {
    id: string; // Associated table ID
    caption: string; // Table description
    headers: string[]; // Column headers
    rows: (string | number)[][]; // Table data
  };

  // Text Alternatives
  longDescription?: string; // Extended chart description
  summaryStats?: {
    // Key insights for screen readers
    min: number;
    max: number;
    average: number;
    trend?: "increasing" | "decreasing" | "stable";
  };
}
