// Data Loading Utilities for Landing Principal
// Handles static JSON files: randstad-catalunya.json, idescat-provincias.json, fuentes.json

import type {
  ChartData,
  ChartDataProvider,
  DataFilters,
  EmploymentData,
  ErrorState,
  Province,
  SourceMetadata,
} from "./types";
import { DataSource } from "./types";

const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

/**
 * Static Data Paths - JSON files in src/data/
 */
const DATA_PATHS = {
  randstad: "/src/data/randstad-catalunya.json",
  idescat: "/src/data/idescat-provincias.json",
  fuentes: "/src/data/fuentes.json",
} as const;

/**
 * Province definitions for catalán provinces
 */
export const CATALUNYA_PROVINCES: Province[] = [
  { id: "barcelona", name: "Barcelona", code: "08", region: "Catalunya" },
  { id: "girona", name: "Girona", code: "17", region: "Catalunya" },
  { id: "lleida", name: "Lleida", code: "25", region: "Catalunya" },
  { id: "tarragona", name: "Tarragona", code: "43", region: "Catalunya" },
];

/**
 * Error handling for data loading
 */
export class DataLoadingError extends Error {
  constructor(
    message: string,
    public errorType: "data" | "network" | "validation" = "data",
    public source?: DataSource,
  ) {
    super(message);
    this.name = "DataLoadingError";
  }
}

/**
 * Validate raw JSON data structure
 */
export function validateEmploymentData(data: unknown): data is EmploymentData {
  if (!data || typeof data !== "object") return false;

  const employment = data as Partial<EmploymentData>;

  return !!(
    employment.source &&
    employment.year &&
    typeof employment.year === "number" &&
    employment.metrics &&
    typeof employment.metrics === "object"
  );
}

/**
 * Validate chart data structure
 */
export function validateChartData(data: unknown): data is ChartData[] {
  if (!Array.isArray(data)) return false;

  return data.every(
    (item) =>
      item &&
      typeof item === "object" &&
      "label" in item &&
      "value" in item &&
      typeof item.label === "string" &&
      typeof item.value === "number",
  );
}

/**
 * Normalize chart-like input to a safe ChartData[] structure.
 * Invalid numeric values are converted to 0 and empty labels are discarded.
 */
export function normalizeChartDataConfig(data: unknown): ChartData[] {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;

      const record = item as {
        label?: unknown;
        value?: unknown;
        metadata?: unknown;
      };
      const label = typeof record.label === "string" ? record.label.trim() : "";
      const valueNumber = Number(record.value);

      if (!label) return undefined;

      return {
        label,
        value: Number.isFinite(valueNumber) ? valueNumber : 0,
        metadata:
          record.metadata && typeof record.metadata === "object"
            ? (record.metadata as Record<string, unknown>)
            : undefined,
      } satisfies ChartData;
    })
    .filter(isDefined);
}

/**
 * Load and parse JSON file safely
 */
async function loadJSON<T>(path: string): Promise<T> {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new DataLoadingError(
        `Failed to load ${path}: ${response.status} ${response.statusText}`,
        "network",
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof DataLoadingError) throw error;

    throw new DataLoadingError(
      `Error parsing JSON from ${path}: ${error instanceof Error ? error.message : "Unknown error"}`,
      "data",
    );
  }
}

/**
 * Transform employment data to chart format
 */
export function transformToChartData(
  employment: EmploymentData[],
  metric:
    | "unemployment_rate"
    | "employment_growth"
    | "ai_impact_score"
    | "sector_distribution",
): ChartData[] {
  try {
    if (metric === "sector_distribution") {
      // Handle sector data differently - flatten into chart data
      const sectorData: ChartData[] = [];

      employment.forEach((emp) => {
        if (emp.metrics.sector_distribution) {
          emp.metrics.sector_distribution.forEach((sector) => {
            sectorData.push({
              label: sector.sector_name,
              value: sector.employment_count,
              metadata: {
                province: emp.province || "nacional",
                source: emp.source,
                year: emp.year,
                growth_rate: sector.growth_rate,
              },
            });
          });
        }
      });

      return sectorData;
    }

    // Handle single metric data
    return employment
      .map((emp) => {
        const value = emp.metrics[metric];
        if (typeof value !== "number") return undefined;

        return {
          label: emp.province || "Nacional",
          value,
          metadata: {
            source: emp.source,
            year: emp.year,
            collection_date: emp.metadata.collection_date,
          },
        } satisfies ChartData;
      })
      .filter(isDefined);
  } catch (error) {
    throw new DataLoadingError(
      `Error transforming data for metric ${metric}: ${error instanceof Error ? error.message : "Unknown error"}`,
      "validation",
    );
  }
}

/**
 * Filter chart data by province
 */
export function filterByProvince(
  data: ChartData[],
  province: string | "all",
): ChartData[] {
  if (province === "all") return data;

  return data.filter((item) => {
    const itemProvince =
      item.metadata?.province?.toLowerCase() || item.label.toLowerCase();
    return itemProvince.includes(province.toLowerCase());
  });
}

/**
 * Filter chart data by data source
 */
export function filterBySource(
  data: ChartData[],
  sources: DataSource[],
): ChartData[] {
  if (sources.length === 0) return data;

  return data.filter((item) => {
    const source = item.metadata?.source;
    return source && sources.includes(source);
  });
}

/**
 * Aggregate data for overview charts
 */
export function aggregateByMetric(
  data: ChartData[],
  aggregation: "sum" | "average" | "max" | "min" = "average",
): number {
  if (data.length === 0) return 0;

  const values = data.map((item) => item.value);

  switch (aggregation) {
    case "sum":
      return values.reduce((acc, val) => acc + val, 0);
    case "average":
      return values.reduce((acc, val) => acc + val, 0) / values.length;
    case "max":
      return Math.max(...values);
    case "min":
      return Math.min(...values);
    default:
      return values[0] || 0;
  }
}

/**
 * Main Data Provider Implementation
 */
export class StaticDataProvider implements ChartDataProvider {
  private cache = new Map<string, any>();
  private loadingCache = new Map<string, Promise<any>>();

  /**
   * Get data with caching
   */
  async getData(
    source: DataSource,
    filters?: DataFilters,
  ): Promise<ChartData[]> {
    try {
      const cacheKey = `${source}-${JSON.stringify(filters)}`;

      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Prevent duplicate requests
      if (this.loadingCache.has(cacheKey)) {
        return await this.loadingCache.get(cacheKey);
      }

      const loadingPromise = this.loadDataFromSource(source, filters);
      this.loadingCache.set(cacheKey, loadingPromise);

      const data = await loadingPromise;
      this.cache.set(cacheKey, data);
      this.loadingCache.delete(cacheKey);

      return data;
    } catch (error) {
      throw new DataLoadingError(
        `Failed to get data from ${source}: ${error instanceof Error ? error.message : "Unknown error"}`,
        "data",
        source,
      );
    }
  }

  /**
   * Load data from specific source
   */
  private async loadDataFromSource(
    source: DataSource,
    filters?: DataFilters,
  ): Promise<ChartData[]> {
    let rawData: EmploymentData[];

    switch (source) {
      case DataSource.RANDSTAD:
        rawData = await loadJSON<EmploymentData[]>(DATA_PATHS.randstad);
        break;
      case DataSource.IDESCAT:
        rawData = await loadJSON<EmploymentData[]>(DATA_PATHS.idescat);
        break;
      default:
        throw new DataLoadingError(
          `Unsupported data source: ${source}`,
          "validation",
        );
    }

    // Validate data structure
    if (!Array.isArray(rawData) || !rawData.every(validateEmploymentData)) {
      throw new DataLoadingError(
        `Invalid data structure from ${source}`,
        "validation",
        source,
      );
    }

    // Transform to chart data based on source type
    let chartData: ChartData[];

    if (source === DataSource.RANDSTAD) {
      chartData = transformToChartData(rawData, "ai_impact_score");
    } else if (source === DataSource.IDESCAT) {
      chartData = transformToChartData(rawData, "unemployment_rate");
    } else {
      chartData = transformToChartData(rawData, "employment_growth");
    }

    // Apply filters
    if (filters) {
      if (filters.province) {
        chartData = filterByProvince(chartData, filters.province);
      }

      if (filters.source) {
        chartData = filterBySource(chartData, filters.source);
      }
    }

    return chartData;
  }

  /**
   * Get available provinces
   */
  getProvinces(): Province[] {
    return CATALUNYA_PROVINCES;
  }

  /**
   * Get data sources metadata
   */
  async getSources(): Promise<SourceMetadata[]> {
    try {
      if (this.cache.has("sources")) {
        return this.cache.get("sources");
      }

      const sources = await loadJSON<SourceMetadata[]>(DATA_PATHS.fuentes);

      if (!Array.isArray(sources)) {
        throw new DataLoadingError(
          "Invalid sources metadata structure",
          "validation",
        );
      }

      this.cache.set("sources", sources);
      return sources;
    } catch (error) {
      throw new DataLoadingError(
        `Failed to load sources metadata: ${error instanceof Error ? error.message : "Unknown error"}`,
        "data",
      );
    }
  }

  /**
   * Filter by province
   */
  filterByProvince(data: ChartData[], province: string | "all"): ChartData[] {
    return filterByProvince(data, province);
  }

  /**
   * Filter by date range (not implemented for static data)
   */
  filterByDateRange(data: ChartData[], start: Date, end: Date): ChartData[] {
    // Static data doesn't support date ranges - return as is
    console.warn("Date range filtering not supported for static data");
    return data;
  }

  /**
   * Validate data
   */
  validateData(data: unknown): data is ChartData[] {
    return validateChartData(data);
  }

  /**
   * Handle data errors
   */
  handleDataError(error: Error): ErrorState {
    if (error instanceof DataLoadingError) {
      return {
        errorType: error.errorType,
        message: error.message,
        showRetryButton: error.errorType === "network",
        retryAction: () => {
          // Clear cache to force reload
          this.cache.clear();
          this.loadingCache.clear();
        },
      };
    }

    return {
      errorType: "data",
      message: error.message || "Unknown data error",
      showRetryButton: true,
      retryAction: () => {
        this.cache.clear();
        this.loadingCache.clear();
      },
    };
  }

  /**
   * Clear cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    this.cache.clear();
    this.loadingCache.clear();
  }
}

/**
 * Default data provider instance (singleton)
 */
export const dataProvider = new StaticDataProvider();

/**
 * Helper functions for common data operations
 */
export const DataUtils = {
  /**
   * Get unemployment data for all provinces
   */
  async getUnemploymentByProvince(province?: string): Promise<ChartData[]> {
    const filters = province && province !== "all" ? { province } : undefined;
    return dataProvider.getData(DataSource.IDESCAT, filters);
  },

  /**
   * Get AI impact data from Randstad
   */
  async getAIImpactData(province?: string): Promise<ChartData[]> {
    const filters = province && province !== "all" ? { province } : undefined;
    return dataProvider.getData(DataSource.RANDSTAD, filters);
  },

  /**
   * Get combined overview data
   */
  async getOverviewData(selectedProvince: string | "all" = "all"): Promise<{
    unemployment: ChartData[];
    aiImpact: ChartData[];
    provinces: Province[];
  }> {
    const [unemployment, aiImpact, provinces] = await Promise.all([
      DataUtils.getUnemploymentByProvince(selectedProvince),
      DataUtils.getAIImpactData(selectedProvince),
      Promise.resolve(dataProvider.getProvinces()),
    ]);

    return { unemployment, aiImpact, provinces };
  },

  /**
   * Format number for charts (with proper locale)
   */
  formatChartValue(
    value: number,
    metric: "percentage" | "count" | "score",
  ): string {
    switch (metric) {
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "count":
        return value.toLocaleString("es-ES");
      case "score":
        return value.toFixed(2);
      default:
        return value.toString();
    }
  },
} as const;
