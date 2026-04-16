// Shared ApexCharts helpers for reusable chart components.

export const CHART_THEME = {
  fontFamily: "Inter, sans-serif",
  colors: ["#C86405", "#4A7C59", "#7B6F72"],
  text: "#2C2C2C",
  textLight: "#5A5A5A",
  grid: "#E8E1D1",
};

export const CHART_HEIGHTS = {
  mobile: 300,
  desktop: 350,
};

export const formatters = {
  percentage: (value, decimals = 1) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "N/A";
    }
    return `${Number(value).toFixed(decimals)}%`;
  },
  employment: (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "0";
    }
    return Number(value).toLocaleString("es-ES");
  },
  aiScore: (value, decimals = 1) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "N/A";
    }
    return Number(value).toFixed(decimals);
  },
  currency: (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "0€";
    }
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  },
  compact: (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "0";
    }
    return new Intl.NumberFormat("es-ES", {
      notation: "compact",
      compactDisplay: "short",
    }).format(Number(value));
  },
};

export function formatTooltipValue(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "N/A";
  }
  return Number(value).toLocaleString("es-ES", {
    maximumFractionDigits: 2,
  });
}

export const SHARED_LEGEND_CONFIG = {
  show: true,
  position: "bottom",
  horizontalAlign: "center",
  fontFamily: CHART_THEME.fontFamily,
  fontSize: "13px",
  labels: {
    colors: CHART_THEME.text,
  },
  onItemClick: {
    toggleDataSeries: true,
  },
  onItemHover: {
    highlightDataSeries: true,
  },
};

export function normalizeNumericSeries(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values.map((value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  });
}

export function normalizeCategories(categories, maxVisible = 8) {
  if (!Array.isArray(categories)) {
    return {
      categories: [],
      rotate: 0,
      trim: false,
    };
  }

  const rotate = categories.length > maxVisible ? -35 : 0;
  const trim = categories.length > maxVisible;

  const normalized = categories.map((label) => {
    const safeLabel = String(label ?? "").trim();
    if (!trim || safeLabel.length <= 14) {
      return safeLabel;
    }
    return `${safeLabel.slice(0, 12)}...`;
  });

  return {
    categories: normalized,
    rotate,
    trim,
  };
}

export function normalizeChartConfig(chartKey, config) {
  if (!config || typeof config !== "object") {
    return { valid: false, reason: "missing-config" };
  }

  if (chartKey === "barChart") {
    const categories = config?.xaxis?.categories;
    const values = config?.series?.[0]?.data;

    if (!Array.isArray(categories) || !Array.isArray(values) || categories.length === 0) {
      return { valid: false, reason: "invalid-bar-data" };
    }

    const normalizedValues = normalizeNumericSeries(values);
    return {
      valid: true,
      config: {
        ...config,
        series: [{ ...config.series[0], data: normalizedValues }],
      },
    };
  }

  if (chartKey === "donutChart") {
    const labels = config?.labels;
    const series = config?.series;

    if (!Array.isArray(labels) || !Array.isArray(series) || labels.length === 0 || labels.length !== series.length) {
      return { valid: false, reason: "invalid-donut-data" };
    }

    return {
      valid: true,
      config: {
        ...config,
        series: normalizeNumericSeries(series),
      },
    };
  }

  if (chartKey === "lineChart") {
    const categories = config?.xaxis?.categories;
    const values = config?.series?.[0]?.data;

    if (!Array.isArray(categories) || !Array.isArray(values) || categories.length !== values.length || categories.length === 0) {
      return { valid: false, reason: "invalid-line-data" };
    }

    return {
      valid: true,
      config: {
        ...config,
        series: [{ ...config.series[0], data: normalizeNumericSeries(values) }],
      },
    };
  }

  return { valid: false, reason: "unknown-chart-key" };
}

export function createBaseOptions({ type, title, ariaLabel, height = CHART_HEIGHTS.mobile }) {
  return {
    chart: {
      type,
      height,
      fontFamily: CHART_THEME.fontFamily,
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 500 },
      foreColor: CHART_THEME.textLight,
    },
    colors: CHART_THEME.colors,
    title: {
      text: title,
      align: "left",
      style: {
        fontFamily: CHART_THEME.fontFamily,
        fontWeight: 600,
        color: CHART_THEME.text,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: CHART_THEME.fontFamily,
      },
      y: {
        formatter: formatTooltipValue,
      },
    },
    legend: SHARED_LEGEND_CONFIG,
    grid: {
      borderColor: CHART_THEME.grid,
      strokeDashArray: 3,
    },
    noData: {
      text: "Sin datos disponibles",
      align: "center",
      verticalAlign: "middle",
      style: {
        color: CHART_THEME.textLight,
        fontFamily: CHART_THEME.fontFamily,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: CHART_HEIGHTS.mobile },
          legend: { position: "bottom" },
        },
      },
      {
        breakpoint: 9999,
        options: {
          chart: { height: CHART_HEIGHTS.desktop },
        },
      },
    ],
    // Data attribute used by a11y tooling.
    subtitle: {
      text: ariaLabel,
      style: {
        color: CHART_THEME.textLight,
        fontSize: "12px",
      },
    },
  };
}

export function buildBarOptions(config, title, ariaLabel) {
  const normalized = normalizeChartConfig("barChart", config);
  if (!normalized.valid) {
    return null;
  }

  const categoriesMeta = normalizeCategories(normalized.config.xaxis.categories);

  return {
    ...createBaseOptions({ type: "bar", title, ariaLabel }),
    series: normalized.config.series,
    xaxis: {
      categories: categoriesMeta.categories,
      labels: {
        rotate: categoriesMeta.rotate,
        trim: categoriesMeta.trim,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "58%",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
}

export function buildDonutOptions(config, title, ariaLabel) {
  const normalized = normalizeChartConfig("donutChart", config);
  if (!normalized.valid) {
    return null;
  }

  return {
    ...createBaseOptions({ type: "donut", title, ariaLabel }),
    labels: normalized.config.labels,
    series: normalized.config.series,
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
        },
      },
    },
  };
}

export function buildLineOptions(config, title, ariaLabel) {
  const normalized = normalizeChartConfig("lineChart", config);
  if (!normalized.valid) {
    return null;
  }

  const categoriesMeta = normalizeCategories(normalized.config.xaxis.categories, 11);

  return {
    ...createBaseOptions({ type: "line", title, ariaLabel }),
    series: normalized.config.series,
    xaxis: {
      categories: categoriesMeta.categories,
      labels: {
        rotate: categoriesMeta.rotate,
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
  };
}

export function getRouteSafeCtaHref(currentPath = "/", anchor = "datos") {
  const safePath = typeof currentPath === "string" && currentPath.length > 0 ? currentPath : "/";
  const [base] = safePath.split("#");
  return `${base}#${anchor}`;
}
