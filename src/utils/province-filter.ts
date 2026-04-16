// Province Filtering Logic - TypeScript utilities for data filtering
// Core filtering functions used by API endpoints and components

import type { EmploymentData, Province } from "./types";

/**
 * Available provinces with their metadata
 */
export const PROVINCES: Province[] = [
  // Cataluña
  { id: "barcelona", name: "Barcelona", region: "Catalunya" },
  { id: "girona", name: "Girona", region: "Catalunya" },
  { id: "lleida", name: "Lleida", region: "Catalunya" },
  { id: "tarragona", name: "Tarragona", region: "Catalunya" },

  // Madrid
  { id: "madrid", name: "Madrid", region: "Madrid" },

  // Andalucía
  { id: "sevilla", name: "Sevilla", region: "Andalucía" },
  { id: "malaga", name: "Málaga", region: "Andalucía" },
  { id: "cordoba", name: "Córdoba", region: "Andalucía" },
  { id: "granada", name: "Granada", region: "Andalucía" },
  { id: "almeria", name: "Almería", region: "Andalucía" },
  { id: "cadiz", name: "Cádiz", region: "Andalucía" },
  { id: "huelva", name: "Huelva", region: "Andalucía" },
  { id: "jaen", name: "Jaén", region: "Andalucía" },

  // Valencia
  { id: "valencia", name: "Valencia", region: "Valencia" },
  { id: "alicante", name: "Alicante", region: "Valencia" },
  { id: "castellon", name: "Castellón", region: "Valencia" },

  // País Vasco
  { id: "vizcaya", name: "Vizcaya", region: "País Vasco" },
  { id: "guipuzcoa", name: "Guipúzcoa", region: "País Vasco" },
  { id: "alava", name: "Álava", region: "País Vasco" },

  // Galicia
  { id: "a-coruna", name: "A Coruña", region: "Galicia" },
  { id: "vigo", name: "Vigo", region: "Galicia" },
  { id: "lugo", name: "Lugo", region: "Galicia" },
  { id: "ourense", name: "Ourense", region: "Galicia" },

  // Other major provinces
  { id: "zaragoza", name: "Zaragoza", region: "Aragón" },
  { id: "valladolid", name: "Valladolid", region: "Castilla y León" },
  { id: "murcia", name: "Murcia", region: "Murcia" },

  // Add more provinces as needed
];

/**
 * Filter employment data by province ID
 */
export function filterDataByProvince(
  data: EmploymentData[],
  provinceId: string,
): EmploymentData[] {
  // If "all" is selected, return all data
  if (provinceId === "all" || !provinceId) {
    return data;
  }

  // Filter data for specific province
  return data.filter((item) => {
    // Handle case where province field might be null (national data)
    if (!item.province) {
      return false;
    }

    // Match by exact province ID or normalized name
    return (
      item.province.toLowerCase() === provinceId.toLowerCase() ||
      normalizeProvinceName(item.province) === normalizeProvinceName(provinceId)
    );
  });
}

/**
 * Filter data by region (autonomous community)
 */
export function filterDataByRegion(
  data: EmploymentData[],
  regionName: string,
): EmploymentData[] {
  if (!regionName || regionName === "all") {
    return data;
  }

  const provincesInRegion = PROVINCES.filter(
    (p) => p.region === regionName,
  ).map((p) => p.id);

  return data.filter((item) => {
    if (!item.province) return false;

    return provincesInRegion.some(
      (provinceId) =>
        item.province?.toLowerCase() === provinceId.toLowerCase() ||
        normalizeProvinceName(item.province) ===
          normalizeProvinceName(provinceId),
    );
  });
}

/**
 * Get province by ID
 */
export function getProvinceById(provinceId: string): Province | undefined {
  return PROVINCES.find((p) => p.id === provinceId);
}

/**
 * Get all provinces grouped by region
 */
export function getProvincesByRegion(): Record<string, Province[]> {
  return PROVINCES.reduce(
    (acc, province) => {
      if (!acc[province.region]) {
        acc[province.region] = [];
      }
      acc[province.region].push(province);
      return acc;
    },
    {} as Record<string, Province[]>,
  );
}

/**
 * Validate province ID
 */
export function isValidProvinceId(provinceId: string): boolean {
  if (provinceId === "all") return true;
  return PROVINCES.some((p) => p.id === provinceId);
}

/**
 * Get available years for a specific province
 */
export function getAvailableYears(
  data: EmploymentData[],
  provinceId: string,
): number[] {
  const filteredData = filterDataByProvince(data, provinceId);
  const years = [...new Set(filteredData.map((item) => item.year))];
  return years.sort((a, b) => b - a); // Most recent first
}

/**
 * Calculate aggregated metrics for filtered data
 */
export function calculateAggregatedMetrics(data: EmploymentData[]) {
  if (data.length === 0) {
    return {
      avgUnemploymentRate: null,
      avgEmploymentGrowth: null,
      totalDataPoints: 0,
      latestYear: null,
      availableSources: [],
    };
  }

  // Extract numeric values, filtering out null/undefined
  const unemploymentRates = data
    .map((item) => item.metrics.unemployment_rate)
    .filter((rate): rate is number => typeof rate === "number" && !isNaN(rate));

  const employmentGrowthRates = data
    .map((item) => item.metrics.employment_growth)
    .filter(
      (growth): growth is number =>
        typeof growth === "number" && !isNaN(growth),
    );

  const years = data.map((item) => item.year);
  const sources = [...new Set(data.map((item) => item.source))];

  return {
    avgUnemploymentRate:
      unemploymentRates.length > 0
        ? Number(
            (
              unemploymentRates.reduce((a, b) => a + b, 0) /
              unemploymentRates.length
            ).toFixed(2),
          )
        : null,
    avgEmploymentGrowth:
      employmentGrowthRates.length > 0
        ? Number(
            (
              employmentGrowthRates.reduce((a, b) => a + b, 0) /
              employmentGrowthRates.length
            ).toFixed(2),
          )
        : null,
    totalDataPoints: data.length,
    latestYear: Math.max(...years),
    availableSources: sources,
    dataQuality: {
      hasUnemploymentData: unemploymentRates.length > 0,
      hasGrowthData: employmentGrowthRates.length > 0,
      completeness:
        (unemploymentRates.length + employmentGrowthRates.length) /
        (data.length * 2),
    },
  };
}

/**
 * Search provinces by name (for autocomplete/search functionality)
 */
export function searchProvinces(query: string, limit: number = 10): Province[] {
  if (!query || query.length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  // Exact matches first
  const exactMatches = PROVINCES.filter(
    (p) => p.name.toLowerCase() === normalizedQuery || p.id === normalizedQuery,
  );

  // Then starts-with matches
  const startsWithMatches = PROVINCES.filter(
    (p) =>
      !exactMatches.includes(p) &&
      (p.name.toLowerCase().startsWith(normalizedQuery) ||
        p.id.startsWith(normalizedQuery)),
  );

  // Then contains matches
  const containsMatches = PROVINCES.filter(
    (p) =>
      !exactMatches.includes(p) &&
      !startsWithMatches.includes(p) &&
      (p.name.toLowerCase().includes(normalizedQuery) ||
        p.region.toLowerCase().includes(normalizedQuery)),
  );

  return [...exactMatches, ...startsWithMatches, ...containsMatches].slice(
    0,
    limit,
  );
}

/**
 * Normalize province name for comparison
 * Handles accents, case, and common variations
 */
function normalizeProvinceName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]/g, "") // Remove special characters
    .trim();
}

/**
 * Validate filter parameters for API endpoints
 */
export interface FilterValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedParams: {
    provinceId?: string;
    year?: number;
    source?: string;
  };
}

export function validateFilterParams(params: {
  province?: string;
  year?: string | number;
  source?: string;
}): FilterValidationResult {
  const errors: string[] = [];
  const sanitizedParams: FilterValidationResult["sanitizedParams"] = {};

  // Validate province
  if (params.province) {
    if (typeof params.province !== "string") {
      errors.push("Province must be a string");
    } else if (!isValidProvinceId(params.province)) {
      errors.push(`Invalid province ID: ${params.province}`);
    } else {
      sanitizedParams.provinceId = params.province;
    }
  }

  // Validate year
  if (params.year) {
    const year =
      typeof params.year === "string" ? parseInt(params.year, 10) : params.year;

    if (isNaN(year) || year < 2000 || year > new Date().getFullYear() + 1) {
      errors.push("Year must be between 2000 and current year + 1");
    } else {
      sanitizedParams.year = year;
    }
  }

  // Validate source
  if (params.source) {
    const validSources = ["randstad", "idescat", "oecd"];
    if (!validSources.includes(params.source)) {
      errors.push(`Invalid source. Must be one of: ${validSources.join(", ")}`);
    } else {
      sanitizedParams.source = params.source;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedParams,
  };
}
