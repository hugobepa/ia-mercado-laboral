// Deferred chart initialization manager for ApexCharts.
(function () {
  const chartInstances = new Map();
  let apexModulePromise = null;

  function loadApexCharts() {
    if (!apexModulePromise) {
      apexModulePromise = import("apexcharts").then((mod) => mod.default || mod);
    }
    return apexModulePromise;
  }

  async function initChart(container) {
    if (!container) return;

    const chartId = container.id || container.dataset.chartId;
    if (!chartId || chartInstances.has(chartId)) return;

    const rawConfig = container.dataset.apexConfig;
    if (!rawConfig) return;

    let config;
    try {
      config = JSON.parse(rawConfig);
    } catch (error) {
      console.error("Invalid chart config JSON", error);
      return;
    }

    try {
      const ApexCharts = await loadApexCharts();
      const instance = new ApexCharts(container, config);
      await instance.render();
      chartInstances.set(chartId, instance);
    } catch (error) {
      console.error("Failed to initialize Apex chart", error);
    }
  }

  function destroyChart(container) {
    if (!container) return;

    const chartId = container.id || container.dataset.chartId;
    if (!chartId) return;

    const instance = chartInstances.get(chartId);
    if (instance && typeof instance.destroy === "function") {
      instance.destroy();
    }
    chartInstances.delete(chartId);
  }

  function getChartContainers(root = document) {
    return Array.from(root.querySelectorAll("[data-chart-type='apex'][data-apex-config]"));
  }

  function initializeImmediate(root = document) {
    getChartContainers(root)
      .filter((el) => el.dataset.chartLazy !== "true")
      .forEach((el) => {
        initChart(el);
      });
  }

  function initializeDeferred(root = document) {
    const lazyContainers = getChartContainers(root).filter((el) => el.dataset.chartLazy === "true");
    if (!lazyContainers.length) return;

    if (!window.IntersectionObserver) {
      lazyContainers.forEach((el) => initChart(el));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initChart(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" },
    );

    lazyContainers.forEach((el) => observer.observe(el));
  }

  function initAll(root = document) {
    initializeImmediate(root);
    initializeDeferred(root);
  }

  document.addEventListener("DOMContentLoaded", () => initAll(document));

  document.addEventListener("htmx:beforeSwap", (event) => {
    getChartContainers(event.target).forEach((container) => destroyChart(container));
  });

  document.addEventListener("htmx:afterSwap", (event) => {
    initAll(event.target);
  });

  window.ChartReinit = {
    initAll,
    initChart,
    destroyChart,
    destroyAll() {
      getChartContainers(document).forEach((container) => destroyChart(container));
    },
  };
})();
