// HTMX Chart Re-initialization JavaScript
// Handles ApexCharts and custom charts after HTMX content swaps

/**
 * Chart Re-initialization Manager
 * Handles dynamic chart updates when HTMX swaps content
 */
class ChartManager {
  constructor() {
    this.charts = new Map(); // Store chart instances
    this.initialized = false;
    this.observers = new Map(); // Intersection observers for lazy loading

    this.init();
  }

  /**
   * Initialize chart manager and set up HTMX event listeners
   */
  init() {
    if (this.initialized) return;

    // Wait for DOM and HTMX to be ready
    document.addEventListener("DOMContentLoaded", () => {
      this.setupHTMXListeners();
      this.initializeExistingCharts();
    });

    // If HTMX is already loaded, set up listeners immediately
    if (window.htmx) {
      this.setupHTMXListeners();
    }

    this.initialized = true;
  }

  /**
   * Set up HTMX event listeners for chart re-initialization
   */
  setupHTMXListeners() {
    // Before content swap - cleanup old charts
    document.addEventListener("htmx:beforeSwap", (event) => {
      const targetElement = event.target;
      this.cleanupChartsInElement(targetElement);
    });

    // After content swap - initialize new charts
    document.addEventListener("htmx:afterSwap", (event) => {
      const targetElement = event.target;
      setTimeout(() => {
        this.initializeChartsInElement(targetElement);
        this.announceChartUpdate();
      }, 100); // Small delay to ensure DOM is updated
    });

    // On HTMX errors - show error states
    document.addEventListener("htmx:responseError", (event) => {
      this.handleChartError(event.target);
    });

    // On HTMX timeout - show timeout message
    document.addEventListener("htmx:timeout", (event) => {
      this.handleChartTimeout(event.target);
    });
  }

  /**
   * Initialize all charts in the current document
   */
  initializeExistingCharts() {
    this.initializeChartsInElement(document.body);
  }

  /**
   * Initialize charts within a specific element
   */
  initializeChartsInElement(element) {
    if (!element) return;

    // Find all chart containers
    const chartContainers = element.querySelectorAll("[data-chart-type]");

    chartContainers.forEach((container) => {
      const chartType = container.getAttribute("data-chart-type");

      switch (chartType) {
        case "bar":
          this.initializeBarChart(container);
          break;
        case "donut":
          this.initializeDonutChart(container);
          break;
        case "line":
          this.initializeLineChart(container);
          break;
        case "apex":
          this.initializeApexChart(container);
          break;
        default:
          console.warn("Unknown chart type:", chartType);
      }
    });

    // Set up intersection observers for lazy loading
    this.setupLazyLoading(element);
  }

  /**
   * Clean up charts within an element before content swap
   */
  cleanupChartsInElement(element) {
    if (!element) return;

    const chartContainers = element.querySelectorAll("[data-chart-type]");

    chartContainers.forEach((container) => {
      const chartId = container.id || container.getAttribute("data-chart-id");

      if (chartId && this.charts.has(chartId)) {
        const chart = this.charts.get(chartId);

        // Destroy ApexCharts instances
        if (chart && typeof chart.destroy === "function") {
          chart.destroy();
        }

        this.charts.delete(chartId);
      }

      // Clean up intersection observers
      if (this.observers.has(chartId)) {
        this.observers.get(chartId).disconnect();
        this.observers.delete(chartId);
      }
    });
  }

  /**
   * Initialize custom bar charts (CSS-based)
   */
  initializeBarChart(container) {
    // Custom bar charts are CSS-based, just add animations
    const bars = container.querySelectorAll(".bar-chart__fill");

    bars.forEach((bar, index) => {
      // Reset animation
      bar.style.animation = "none";
      bar.offsetHeight; // Trigger reflow

      // Re-apply animation with staggered delay
      setTimeout(() => {
        bar.style.animation = `barGrow 0.8s ease-out ${index * 100}ms forwards`;
      }, 50);
    });

    // Add hover interactions
    this.addBarChartInteractions(container);
  }

  /**
   * Initialize custom donut charts (CSS-based)
   */
  initializeDonutChart(container) {
    const visual = container.querySelector(".donut-chart__visual");
    const legendItems = container.querySelectorAll(".donut-chart__legend li");

    if (visual) {
      // Reset and re-apply rotation animation
      visual.style.animation = "none";
      visual.offsetHeight; // Trigger reflow
      visual.style.animation = "donutRotate 1s ease-out forwards";
    }

    // Animate legend items
    legendItems.forEach((item, index) => {
      item.style.animation = "none";
      item.offsetHeight; // Trigger reflow

      setTimeout(() => {
        item.style.animation = `slideInRight 0.6s ease-out ${index * 100}ms forwards`;
      }, 300);
    });

    // Add hover interactions
    this.addDonutChartInteractions(container);
  }

  /**
   * Initialize ApexCharts instances
   */
  initializeApexChart(container) {
    const chartData = container.getAttribute("data-chart-config");

    if (!chartData) {
      console.warn("No chart configuration found for ApexChart");
      return;
    }

    try {
      const config = JSON.parse(chartData);
      const chartId = container.id || `chart-${Date.now()}`;

      // Create ApexChart instance
      if (window.ApexCharts) {
        const chart = new ApexCharts(container, config);
        chart.render();

        this.charts.set(chartId, chart);
      } else {
        console.warn("ApexCharts library not loaded");
      }
    } catch (error) {
      console.error("Error initializing ApexChart:", error);
    }
  }

  /**
   * Initialize line charts (placeholder for future implementation)
   */
  initializeLineChart(container) {
    // Placeholder for line chart initialization
    console.log("Line chart initialization not implemented yet");
  }

  /**
   * Add interactive behaviors to bar charts
   */
  addBarChartInteractions(container) {
    const rows = container.querySelectorAll(".bar-chart__row");

    rows.forEach((row) => {
      // Add keyboard navigation
      row.setAttribute("tabindex", "0");
      row.setAttribute("role", "button");

      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.displayBarDetails(row);
        }
      });

      row.addEventListener("click", () => {
        this.displayBarDetails(row);
      });
    });
  }

  /**
   * Add interactive behaviors to donut charts
   */
  addDonutChartInteractions(container) {
    const legendItems = container.querySelectorAll(".donut-chart__legend li");

    legendItems.forEach((item, index) => {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");

      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.highlightSlice(container, index);
        }
      });

      item.addEventListener("click", () => {
        this.highlightSlice(container, index);
      });
    });
  }

  /**
   * Display detailed information for a bar chart item
   */
  displayBarDetails(row) {
    const label = row.getAttribute("data-label");
    const value = row.getAttribute("data-value");

    // Create or update tooltip
    let tooltip = document.getElementById("chart-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "chart-tooltip";
      tooltip.className = "chart-tooltip";
      document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `
      <div class="bg-gray-900 text-white p-3 rounded shadow-lg">
        <div class="font-semibold">${label}</div>
        <div class="text-sm">${value}%</div>
      </div>
    `;

    // Position tooltip
    const rect = row.getBoundingClientRect();
    tooltip.style.position = "absolute";
    tooltip.style.top = `${rect.top - 60}px`;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.zIndex = "1000";

    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 3000);
  }

  /**
   * Highlight a slice in donut chart
   */
  highlightSlice(container, sliceIndex) {
    const legendItems = container.querySelectorAll(".donut-chart__legend li");

    // Remove previous highlights
    legendItems.forEach((item) => item.classList.remove("highlighted"));

    // Highlight selected item
    if (legendItems[sliceIndex]) {
      legendItems[sliceIndex].classList.add("highlighted");

      // Announce to screen readers
      const label = legendItems[sliceIndex].textContent;
      this.announceToScreenReader(`Seleccionado: ${label}`);
    }
  }

  /**
   * Set up lazy loading for charts using Intersection Observer
   */
  setupLazyLoading(element) {
    const lazyCharts = element.querySelectorAll('[data-chart-lazy="true"]');

    if (!window.IntersectionObserver || lazyCharts.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = entry.target;
            this.initializeChartsInElement(container);
            observer.unobserve(container);
          }
        });
      },
      {
        rootMargin: "50px",
      },
    );

    lazyCharts.forEach((chart) => {
      observer.observe(chart);
    });
  }

  /**
   * Handle chart loading errors
   */
  handleChartError(element) {
    const errorMessage = document.createElement("div");
    errorMessage.className =
      "chart-error p-6 text-center bg-red-50 border border-red-200 rounded-lg";
    errorMessage.innerHTML = `
      <div class="text-red-600 mb-2">⚠️</div>
      <p class="text-red-800 font-medium mb-2">Error al cargar las gráficas</p>
      <p class="text-red-600 text-sm mb-3">No se pudieron obtener los datos actualizados</p>
      <button 
        onclick="location.reload()" 
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Reintentar
      </button>
    `;

    // Replace content with error message
    element.innerHTML = "";
    element.appendChild(errorMessage);
  }

  /**
   * Handle chart loading timeout
   */
  handleChartTimeout(element) {
    const timeoutMessage = document.createElement("div");
    timeoutMessage.className =
      "chart-timeout p-6 text-center bg-yellow-50 border border-yellow-200 rounded-lg";
    timeoutMessage.innerHTML = `
      <div class="text-yellow-600 mb-2">⏱️</div>
      <p class="text-yellow-800 font-medium mb-2">Tiempo de carga agotado</p>
      <p class="text-yellow-600 text-sm mb-3">Los datos tardan más de lo esperado en cargar</p>
      <button 
        onclick="location.reload()" 
        class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Reintentar
      </button>
    `;

    element.innerHTML = "";
    element.appendChild(timeoutMessage);
  }

  /**
   * Announce chart updates to screen readers
   */
  announceChartUpdate() {
    this.announceToScreenReader("Gráficas actualizadas con nuevos datos");
  }

  /**
   * Announce messages to screen readers
   */
  announceToScreenReader(message) {
    const announcer =
      document.getElementById("chart-announcer") ||
      document.createElement("div");
    announcer.id = "chart-announcer";
    announcer.setAttribute("aria-live", "assertive");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";

    if (!announcer.parentNode) {
      document.body.appendChild(announcer);
    }

    announcer.textContent = message;
  }
}

// Initialize chart manager when script loads
const chartManager = new ChartManager();

// Expose to global scope for debugging
window.ChartManager = chartManager;

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ChartManager;
}
