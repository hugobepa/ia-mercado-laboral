// Province Filtering Utilities with HTMX Integration
// Handles dynamic filtering dropdown and chart updates

import { CATALUNYA_PROVINCES } from "./data-loader.ts";

/**
 * Province Filter Configuration
 */
const FILTER_CONFIG = {
  // HTMX endpoints for dynamic updates
  endpoints: {
    chartUpdate: "/api/charts/update",
    statsUpdate: "/api/stats/update",
  },

  // Debounce delay for filter changes (UX)
  debounceMs: 300,

  // Animation durations
  transitions: {
    chartFadeMs: 200,
    skeletonShowMs: 100,
  },

  // CSS classes
  classes: {
    loading: "htmx-indicator",
    skeleton: "chart-skeleton",
    filterActive: "filter-active",
    chartContainer: "chart-container",
    errorState: "chart-error",
  },
};

/**
 * Initialize province filter dropdown with HTMX
 */
export function initProvinceFilter() {
  const filterSelect = document.getElementById("province-filter");
  if (!filterSelect) {
    console.warn("Province filter element not found");
    return;
  }

  // Populate dropdown with provinces
  populateProvinceOptions(filterSelect);

  // Set up HTMX attributes for dynamic updates
  setupHTMXAttributes(filterSelect);

  // Add event listeners for enhanced UX
  setupFilterEventListeners(filterSelect);

  // Initialize filter state from URL params
  initializeFromURL(filterSelect);

  console.log("Province filter initialized");
}

/**
 * Populate dropdown with province options
 */
function populateProvinceOptions(selectElement) {
  // Clear existing options (keep placeholder)
  const placeholder = selectElement.querySelector('option[value=""]');
  selectElement.innerHTML = "";

  if (placeholder) {
    selectElement.appendChild(placeholder);
  } else {
    // Create default placeholder
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona provincia...";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);
  }

  // Add "All provinces" option
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Todas las provincias";
  selectElement.appendChild(allOption);

  // Add individual provinces
  CATALUNYA_PROVINCES.forEach((province) => {
    const option = document.createElement("option");
    option.value = province.id;
    option.textContent = province.name;
    option.dataset.code = province.code || "";
    option.dataset.region = province.region;
    selectElement.appendChild(option);
  });
}

/**
 * Setup HTMX attributes for dynamic chart updates
 */
function setupHTMXAttributes(selectElement) {
  // Main filter attributes
  selectElement.setAttribute("hx-get", FILTER_CONFIG.endpoints.chartUpdate);
  selectElement.setAttribute("hx-trigger", "change delay:300ms");
  selectElement.setAttribute("hx-target", ".charts-grid");
  selectElement.setAttribute("hx-swap", "innerHTML transition:true");
  selectElement.setAttribute("hx-indicator", ".htmx-loading");

  // Include form data for context
  selectElement.setAttribute("hx-include", '[name="data-source"]');

  // Error handling
  selectElement.setAttribute(
    "hx-on::request-error",
    "handleFilterError(event)",
  );
  selectElement.setAttribute(
    "hx-on::response-error",
    "handleFilterError(event)",
  );
}

/**
 * Enhanced event listeners for better UX
 */
function setupFilterEventListeners(selectElement) {
  let debounceTimer;

  // Filter change handler with debouncing
  selectElement.addEventListener("change", function (event) {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      handleFilterChange(event.target.value);
    }, FILTER_CONFIG.debounceMs);
  });

  // Visual feedback for selection
  selectElement.addEventListener("change", function () {
    this.classList.add(FILTER_CONFIG.classes.filterActive);
    updateURLParams(this.value);
  });

  // HTMX event listeners
  selectElement.addEventListener("htmx:beforeRequest", handleBeforeRequest);
  selectElement.addEventListener("htmx:afterRequest", handleAfterRequest);
}

/**
 * Handle filter changes - show loading states
 */
function handleFilterChange(selectedProvince) {
  console.log("Filter changed to:", selectedProvince);

  // Show loading skeleton for all charts
  showChartSkeletons();

  // Update UI state
  updateFilterUI(selectedProvince);

  // Track analytics (optional)
  if (typeof gtag !== "undefined") {
    gtag("event", "province_filter_change", {
      custom_parameter: selectedProvince,
    });
  }
}

/**
 * Show loading skeletons for charts
 */
function showChartSkeletons() {
  const chartContainers = document.querySelectorAll(
    `.${FILTER_CONFIG.classes.chartContainer}`,
  );

  chartContainers.forEach((container) => {
    // Add skeleton overlay
    if (!container.querySelector(`.${FILTER_CONFIG.classes.skeleton}`)) {
      const skeleton = createChartSkeleton();
      container.appendChild(skeleton);
    }

    // Fade out current chart
    const chart = container.querySelector("[data-chart]");
    if (chart) {
      chart.style.opacity = "0.5";
      chart.style.transition = `opacity ${FILTER_CONFIG.transitions.chartFadeMs}ms ease`;
    }
  });
}

/**
 * Create chart skeleton element
 */
function createChartSkeleton() {
  const skeleton = document.createElement("div");
  skeleton.className = FILTER_CONFIG.classes.skeleton;
  skeleton.setAttribute("aria-hidden", "true");

  skeleton.innerHTML = `
    <div class="skeleton-header"></div>
    <div class="skeleton-chart">
      <div class="skeleton-bar"></div>
      <div class="skeleton-bar"></div>
      <div class="skeleton-bar"></div>
      <div class="skeleton-bar"></div>
    </div>
    <div class="skeleton-legend">
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
    </div>
  `;

  return skeleton;
}

/**
 * Update filter UI state
 */
function updateFilterUI(selectedProvince) {
  const filterLabel = document.querySelector("[data-filter-label]");
  if (filterLabel) {
    const provinceName = getProvinceName(selectedProvince);
    filterLabel.textContent =
      selectedProvince === "all"
        ? "Mostrando datos de todas las provincias"
        : `Mostrando datos de ${provinceName}`;
  }

  // Update stats summary
  const statsContainer = document.querySelector("[data-stats-summary]");
  if (statsContainer) {
    statsContainer.setAttribute("data-province", selectedProvince);
  }
}

/**
 * Get province display name from ID
 */
function getProvinceName(provinceId) {
  if (provinceId === "all") return "Todas";

  const province = CATALUNYA_PROVINCES.find((p) => p.id === provinceId);
  return province ? province.name : provinceId;
}

/**
 * Handle HTMX before request
 */
function handleBeforeRequest(event) {
  // Show global loading indicator
  const loadingIndicator = document.querySelector(".htmx-loading");
  if (loadingIndicator) {
    loadingIndicator.style.display = "block";
  }

  // Disable filter during request
  event.target.disabled = true;

  // Set loading ARIA state
  const chartsGrid = document.querySelector(".charts-grid");
  if (chartsGrid) {
    chartsGrid.setAttribute("aria-busy", "true");
    chartsGrid.setAttribute("aria-live", "polite");
  }
}

/**
 * Handle HTMX after request
 */
function handleAfterRequest(event) {
  // Hide loading indicator
  const loadingIndicator = document.querySelector(".htmx-loading");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }

  // Re-enable filter
  event.target.disabled = false;

  // Remove loading state
  removeChartSkeletons();

  // Update ARIA state
  const chartsGrid = document.querySelector(".charts-grid");
  if (chartsGrid) {
    chartsGrid.setAttribute("aria-busy", "false");
  }

  // Announce successful update to screen readers
  announceFilterUpdate(event.target.value);
}

/**
 * Remove chart skeletons after loading
 */
function removeChartSkeletons() {
  const skeletons = document.querySelectorAll(
    `.${FILTER_CONFIG.classes.skeleton}`,
  );
  skeletons.forEach((skeleton) => {
    skeleton.style.opacity = "0";
    setTimeout(
      () => skeleton.remove(),
      FILTER_CONFIG.transitions.skeletonShowMs,
    );
  });

  // Restore chart opacity
  const charts = document.querySelectorAll("[data-chart]");
  charts.forEach((chart) => {
    chart.style.opacity = "1";
  });
}

/**
 * Announce filter updates to screen readers
 */
function announceFilterUpdate(selectedProvince) {
  const announcement = document.getElementById("sr-announcements");
  if (announcement) {
    const provinceName = getProvinceName(selectedProvince);
    announcement.textContent =
      selectedProvince === "all"
        ? "Gráficas actualizadas con datos de todas las provincias"
        : `Gráficas actualizadas con datos de ${provinceName}`;
  }
}

/**
 * Handle filter errors
 */
function handleFilterError(event) {
  console.error("Filter error:", event.detail);

  // Show error state
  const chartsGrid = document.querySelector(".charts-grid");
  if (chartsGrid) {
    chartsGrid.classList.add(FILTER_CONFIG.classes.errorState);
    chartsGrid.innerHTML = `
      <div class="error-message" role="alert">
        <h3>Error al cargar datos</h3>
        <p>No se pudieron cargar los datos para la provincia seleccionada.</p>
        <button onclick="retryFilter()" class="retry-button">
          Intentar de nuevo
        </button>
      </div>
    `;
  }

  // Remove loading states
  removeChartSkeletons();

  // Re-enable filter
  const filterSelect = document.getElementById("province-filter");
  if (filterSelect) {
    filterSelect.disabled = false;
  }
}

/**
 * Retry filter operation
 */
window.retryFilter = function () {
  const filterSelect = document.getElementById("province-filter");
  const chartsGrid = document.querySelector(".charts-grid");

  if (filterSelect && chartsGrid) {
    // Remove error state
    chartsGrid.classList.remove(FILTER_CONFIG.classes.errorState);

    // Trigger HTMX request again
    htmx.trigger(filterSelect, "change");
  }
};

/**
 * Initialize filter state from URL parameters
 */
function initializeFromURL(selectElement) {
  const urlParams = new URLSearchParams(window.location.search);
  const province = urlParams.get("province");

  if (
    province &&
    (province === "all" || CATALUNYA_PROVINCES.some((p) => p.id === province))
  ) {
    selectElement.value = province;
    selectElement.dispatchEvent(new Event("change"));
  }
}

/**
 * Update URL parameters without page reload
 */
function updateURLParams(selectedProvince) {
  const url = new URL(window.location);

  if (selectedProvince && selectedProvince !== "all") {
    url.searchParams.set("province", selectedProvince);
  } else {
    url.searchParams.delete("province");
  }

  window.history.replaceState({}, "", url);
}

/**
 * Get current filter state
 */
export function getCurrentFilter() {
  const filterSelect = document.getElementById("province-filter");
  return filterSelect ? filterSelect.value : "all";
}

/**
 * Set filter programmatically
 */
export function setProvinceFilter(provinceId) {
  const filterSelect = document.getElementById("province-filter");
  if (
    filterSelect &&
    (provinceId === "all" ||
      CATALUNYA_PROVINCES.some((p) => p.id === provinceId))
  ) {
    filterSelect.value = provinceId;
    filterSelect.dispatchEvent(new Event("change"));
    return true;
  }
  return false;
}

/**
 * Get available provinces for external use
 */
export function getAvailableProvinces() {
  return [
    { id: "all", name: "Todas las provincias", region: "Catalunya" },
    ...CATALUNYA_PROVINCES,
  ];
}

/**
 * Clear all filters
 */
export function clearFilters() {
  const filterSelect = document.getElementById("province-filter");
  if (filterSelect) {
    filterSelect.value = "all";
    filterSelect.dispatchEvent(new Event("change"));
  }

  // Clear URL params
  const url = new URL(window.location);
  url.searchParams.delete("province");
  window.history.replaceState({}, "", url);
}

/**
 * Initialize filter on page load
 */
document.addEventListener("DOMContentLoaded", () => {
  initProvinceFilter();

  // Add HTMX after settle handler for chart re-initialization
  document.addEventListener("htmx:afterSettle", (event) => {
    if (event.target.classList.contains("charts-grid")) {
      // Re-initialize any charts that were dynamically loaded
      if (window.initializeCharts) {
        window.initializeCharts();
      }
    }
  });
});

export default {
  init: initProvinceFilter,
  getCurrentFilter,
  setProvinceFilter,
  getAvailableProvinces,
  clearFilters,
};
