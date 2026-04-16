// Chart Helper Utilities for Landing Principal
// Common chart operations, formatting, and configuration

/**
 * Chart color scheme from DESIGN.md
 */
export const CHART_COLORS = {
  // Primary colors for main data series
  primary: {
    blue: "#1e40af", // Blue 700
    indigo: "#4338ca", // Indigo 700
    purple: "#7c3aed", // Purple 700
    cyan: "#0891b2", // Cyan 600
    emerald: "#059669", // Emerald 600
    orange: "#ea580c", // Orange 600
    rose: "#e11d48", // Rose 600
  },

  // Secondary/accent colors
  secondary: {
    lightBlue: "#3b82f6", // Blue 500
    lightIndigo: "#6366f1", // Indigo 500
    lightPurple: "#8b5cf6", // Purple 500
    lightCyan: "#06b6d4", // Cyan 500
    lightEmerald: "#10b981", // Emerald 500
    lightOrange: "#f97316", // Orange 500
    lightRose: "#f43f5e", // Rose 500
  },

  // Neutral colors for backgrounds, borders
  neutral: {
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",
  },

  // Status colors
  status: {
    success: "#10b981", // Green 500
    warning: "#f59e0b", // Yellow 500
    error: "#ef4444", // Red 500
    info: "#3b82f6", // Blue 500
  },
};

/**
 * Get color palette for charts based on data count
 */
export function getChartColorPalette(dataCount, type = "primary") {
  const colors =
    type === "primary" ? CHART_COLORS.primary : CHART_COLORS.secondary;
  const colorArray = Object.values(colors);

  // Return colors cycling through palette if more data than colors
  return Array.from(
    { length: dataCount },
    (_, i) => colorArray[i % colorArray.length],
  );
}

/**
 * Common chart configuration following DESIGN.md
 */
export const BASE_CHART_CONFIG = {
  chart: {
    fontFamily: "Inter, system-ui, sans-serif",
    toolbar: {
      show: false, // Simplified UI per specs
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
  },

  grid: {
    borderColor: CHART_COLORS.neutral.gray200,
    strokeDashArray: 4,
    xaxis: {
      lines: { show: false },
    },
  },

  tooltip: {
    theme: "light",
    style: {
      fontSize: "14px",
      fontFamily: "Inter, system-ui, sans-serif",
    },
    x: {
      format: undefined, // Will be set per chart type
    },
  },

  legend: {
    fontSize: "14px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 500,
    labels: {
      colors: [CHART_COLORS.neutral.gray700],
    },
  },
};

/**
 * Format numbers for different metrics
 */
export const formatters = {
  /**
   * Format percentage values
   */
  percentage: (value, decimals = 1) => {
    if (!value && value !== 0) return "N/A";
    return `${Number(value).toFixed(decimals)}%`;
  },

  /**
   * Format employment counts
   */
  employment: (value) => {
    if (!value && value !== 0) return "0";
    return Number(value).toLocaleString("es-ES");
  },

  /**
   * Format AI impact scores
   */
  aiScore: (value, decimals = 1) => {
    if (!value && value !== 0) return "N/A";
    return Number(value).toFixed(decimals);
  },

  /**
   * Format currency values
   */
  currency: (value) => {
    if (!value && value !== 0) return "0€";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  },

  /**
   * Format compact numbers (K, M notation)
   */
  compact: (value) => {
    if (!value && value !== 0) return "0";
    return new Intl.NumberFormat("es-ES", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  },
};

/**
 * Generate responsive chart options
 */
export function getResponsiveOptions() {
  return [
    {
      breakpoint: 768, // Mobile
      options: {
        chart: { height: 280 },
        legend: { position: "bottom" },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: { position: "top" },
          },
        },
        dataLabels: {
          enabled: false, // Disable on mobile for clarity
        },
      },
    },
    {
      breakpoint: 1024, // Tablet
      options: {
        chart: { height: 320 },
        legend: { position: "right" },
      },
    },
  ];
}

/**
 * Generate accessibility-compliant chart configuration
 */
export function getAccessibilityConfig(chartTitle, chartDescription) {
  return {
    chart: {
      description: chartDescription,
      background: "transparent",
    },

    title: {
      text: chartTitle,
      style: {
        fontSize: "18px",
        fontWeight: "600",
        color: CHART_COLORS.neutral.gray900,
      },
    },

    // High contrast colors for accessibility
    colors: getChartColorPalette(10).filter((color, index, arr) => {
      // Ensure sufficient contrast between adjacent colors
      if (index === 0) return true;
      return getColorContrast(color, arr[index - 1]) > 3;
    }),

    // Keyboard navigation support
    chart: {
      selection: {
        enabled: false, // Disable selection to prevent confusion
      },
    },

    // Screen reader support
    accessibility: {
      enabled: true,
      description: chartDescription,
      keyboardNavigation: {
        enabled: true,
      },
    },
  };
}

/**
 * Calculate color contrast ratio (simplified)
 */
function getColorContrast(color1, color2) {
  // Simplified contrast calculation
  // In production, use a proper contrast calculation library
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  // Simple euclidean distance
  return (
    Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2),
    ) / 255
  );
}

/**
 * Bar Chart specific configuration
 */
export function getBarChartConfig(data, options = {}) {
  const {
    horizontal = false,
    stacked = false,
    showValues = true,
    metric = "percentage",
  } = options;

  return {
    ...BASE_CHART_CONFIG,

    chart: {
      ...BASE_CHART_CONFIG.chart,
      type: "bar",
    },

    plotOptions: {
      bar: {
        horizontal,
        columnWidth: "65%",
        dataLabels: {
          position: horizontal ? "end" : "top",
        },
      },
    },

    dataLabels: {
      enabled: showValues,
      formatter: (value) => formatters[metric](value),
      style: {
        fontSize: "12px",
        colors: [horizontal ? "#fff" : CHART_COLORS.neutral.gray700],
      },
    },

    xaxis: {
      categories: data.map((item) => item.label),
      labels: {
        style: {
          fontSize: "12px",
          colors: CHART_COLORS.neutral.gray600,
        },
      },
    },

    yaxis: {
      labels: {
        formatter: (value) => formatters[metric](value),
        style: {
          fontSize: "12px",
          colors: CHART_COLORS.neutral.gray600,
        },
      },
    },

    colors: getChartColorPalette(data.length),
    responsive: getResponsiveOptions(),
  };
}

/**
 * Donut Chart specific configuration
 */
export function getDonutChartConfig(data, options = {}) {
  const {
    showPercentages = true,
    showLabels = true,
    innerRadius = 50,
    metric = "percentage",
  } = options;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return {
    ...BASE_CHART_CONFIG,

    chart: {
      ...BASE_CHART_CONFIG.chart,
      type: "donut",
    },

    plotOptions: {
      pie: {
        donut: {
          size: `${innerRadius}%`,
          labels: {
            show: showLabels,
            name: {
              fontSize: "16px",
              color: CHART_COLORS.neutral.gray700,
            },
            value: {
              fontSize: "20px",
              color: CHART_COLORS.neutral.gray900,
              formatter: (value) => formatters[metric](value),
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              color: CHART_COLORS.neutral.gray600,
              formatter: () => formatters[metric](total),
            },
          },
        },
      },
    },

    labels: data.map((item) => item.label),

    dataLabels: {
      enabled: showPercentages,
      formatter: (val, opts) => {
        const value = data[opts.seriesIndex].value;
        return showPercentages
          ? `${val.toFixed(1)}%`
          : formatters[metric](value);
      },
      style: {
        fontSize: "12px",
      },
    },

    colors: getChartColorPalette(data.length),
    responsive: getResponsiveOptions(),
  };
}

/**
 * Error handling for chart data
 */
export function validateChartData(data, chartType) {
  const errors = [];

  if (!Array.isArray(data)) {
    errors.push("Chart data must be an array");
    return { isValid: false, errors };
  }

  if (data.length === 0) {
    errors.push("Chart data cannot be empty");
    return { isValid: false, errors };
  }

  data.forEach((item, index) => {
    if (!item.label) {
      errors.push(`Item ${index}: missing label`);
    }

    if (typeof item.value !== "number") {
      errors.push(`Item ${index}: value must be a number`);
    }

    if (item.value < 0 && ["donut", "pie"].includes(chartType)) {
      errors.push(
        `Item ${index}: ${chartType} charts cannot have negative values`,
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Performance optimization: lazy load charts
 */
export function initLazyChartLoading() {
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chartContainer = entry.target;
          const chartId = chartContainer.getAttribute("data-chart-id");

          if (chartId && !chartContainer.hasAttribute("data-loaded")) {
            // Trigger chart loading
            if (window.loadChart) {
              window.loadChart(chartId);
            }

            chartContainer.setAttribute("data-loaded", "true");
            observer.unobserve(chartContainer);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "100px",
    },
  );

  // Observe all lazy chart containers
  document
    .querySelectorAll("[data-chart-id]:not([data-loaded])")
    .forEach((container) => observer.observe(container));

  return observer;
}

// Legacy functions (preserved for existing code compatibility)
export function getMaxChartValue(items = []) {
  return Math.max(...items.map((item) => Number(item?.value ?? 0)), 1);
}

export function getTotalChartValue(items = []) {
  return items.reduce((sum, item) => sum + Number(item?.value ?? 0), 0);
}
