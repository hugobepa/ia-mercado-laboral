# Quickstart: Landing Principal Implementation

**Version**: 1.0  
**Date**: 2026-04-14  
**Estimated Time**: 4-6 hours  
**Skill Level**: Intermediate (familiar with Astro, TypeScript, Tailwind)

## Overview

This guide walks through implementing the landing principal from scratch using the existing project foundation. You'll create an interactive, accessible landing page with employment data visualizations and province filtering.

## Prerequisites

### Required Knowledge

- ✅ **Astro 6** basics (components, pages, layouts)
- ✅ **TypeScript** interfaces and types
- ✅ **Tailwind CSS 4** utility classes
- ✅ **HTMX 2+** for dynamic interactions
- ✅ **Basic accessibility** (ARIA, semantic HTML)

### Project Setup Verification

```bash
# Ensure you're in the project root
cd path/to/ia-mercado-laboral

# Verify dependencies
bun install
bun run dev

# Check existing structure
ls src/components/charts/    # Should show BarChart.astro, DonutChart.astro
ls src/data/                # Should show randstad-catalunya.json, idescat-provincias.json
```

## Implementation Steps

### Step 1: Update Main Page Layout (15 minutes)

Update `src/pages/index.astro` to use the landing structure:

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
import DataSection from '../components/sections/DataSection.astro';

const pageTitle = "Mercado Laboral - IA y Empleo en España";
const nav = [
  { label: "Inicio", href: "#hero" },
  { label: "Datos", href: "#datos" },
  { label: "Fuentes", href: "#fuentes" }
];
---

<BaseLayout title={pageTitle} nav={nav}>
  <main>
    <!-- Hero Section -->
    <Hero />

    <!-- Filter Section -->
    <section id="filtros" class="py-8 bg-crema/30">
      <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto">
          <label for="province-filter" class="block text-sm font-medium text-carbon mb-2">
            Filtrar por provincia:
          </label>
          <select
            id="province-filter"
            name="province"
            class="w-full px-3 py-2 border border-terracota/30 rounded-md focus:ring-2 focus:ring-terracota focus:border-terracota"
            hx-get="/api/filter-charts"
            hx-trigger="change"
            hx-target="#charts-container"
            hx-indicator="#loader"
            hx-swap="innerHTML"
          >
            <option value="all">Todas las provincias</option>
            <option value="barcelona">Barcelona</option>
            <option value="girona">Girona</option>
            <option value="lleida">Lleida  </option>
            <option value="tarragona">Tarragona</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Charts Section -->
    <section id="datos" class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-carbon text-center mb-12">
          Datos del Mercado Laboral
        </h2>

        <!-- Loading indicator -->
        <div id="loader" class="htmx-indicator text-center py-8">
          <div class="inline-flex items-center gap-2 text-carbon/60">
            <div class="w-4 h-4 border-2 border-terracota border-t-transparent rounded-full animate-spin"></div>
            Actualizando datos...
          </div>
        </div>

        <!-- Charts container -->
        <div id="charts-container" class="space-y-16">
          <DataSection />
        </div>
      </div>
    </section>

    <!-- Sources Section -->
    <section id="fuentes" class="py-16 bg-carbon/5">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-carbon mb-8">Fuentes de Datos</h2>
        <div class="flex flex-wrap justify-center gap-8 text-sm text-carbon/70">
          <div>Randstad Research 2024</div>
          <div>Idescat 2023-2024</div>
          <div>OECD Employment Data 2023</div>
        </div>
      </div>
    </section>
  </main>
</BaseLayout>

<style>
  .htmx-indicator {
    display: none;
  }
  .htmx-request .htmx-indicator {
    display: block;
  }
  .htmx-request.htmx-indicator {
    display: inline-block;
  }
</style>
```

### Step 2: Enhance DataSection Component (30 minutes)

Update `src/components/sections/DataSection.astro`:

```astro
---
// src/components/sections/DataSection.astro
import BarChart from '../charts/BarChart.astro';
import DonutChart from '../charts/DonutChart.astro';
import Card from '../ui/Card.astro';

// Import data (in real implementation, this would be dynamic)
const unemploymentData = await import('../../data/idescat-provincias.json').then(m => m.default);
const sectorData = await import('../../data/randstad-catalunya.json').then(m => m.default);

// Transform data for charts (simplified example)
const chartData = unemploymentData.map(item => ({
  label: item.provincia,
  value: item.tasa_desempleo || 0
}));

const sectorChartData = Object.entries(sectorData.sectores || {}).map(([sector, data]) => ({
  label: sector,
  value: data.empleo_total || 0
}));
---

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Employment by Province -->
  <Card class="p-6">
    <div class="chart-wrapper">
      <BarChart
        data={chartData}
        config={{
          title: "Desempleo por Provincia",
          subtitle: "Tasa de desempleo en Cataluña 2024",
          colors: ["var(--color-terracota)"]
        }}
        ariaLabel="Gráfico de barras mostrando la tasa de desempleo por provincia catalana"
        lazy={true}
        skeleton={true}
      />
    </div>

    <!-- Accessible data table -->
    <table id="unemployment-table" class="sr-only">
      <caption>Datos de desempleo por provincia catalana</caption>
      <thead>
        <tr>
          <th>Provincia</th>
          <th>Tasa de Desempleo (%)</th>
        </tr>
      </thead>
      <tbody>
        {chartData.map(item => (
          <tr>
            <td>{item.label}</td>
            <td>{item.value.toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>

  <!-- Sector Distribution -->
  <Card class="p-6">
    <div class="chart-wrapper">
      <DonutChart
        data={sectorChartData}
        config={{
          title: "Distribución por Sector",
          subtitle: "Empleo por sectores económicos",
          colors: [
            "var(--color-terracota)",
            "var(--color-verde)",
            "var(--color-carbon)",
            "var(--color-crema)"
          ]
        }}
        ariaLabel="Gráfico circular mostrando la distribución del empleo por sectores económicos"
        showPercentages={true}
        lazy={true}
        skeleton={true}
      />
    </div>

    <!-- Accessible data table -->
    <table id="sector-table" class="sr-only">
      <caption>Distribución del empleo por sectores económicos</caption>
      <thead>
        <tr>
          <th>Sector</th>
          <th>Número de Empleos</th>
        </tr>
      </thead>
      <tbody>
        {sectorChartData.map(item => (
          <tr>
            <td>{item.label}</td>
            <td>{item.value.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
</div>

<style>
  .chart-wrapper {
    min-height: 400px;
    position: relative;
  }

  /* Skeleton loader styles */
  .chart-wrapper.loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg,
      transparent,
      rgba(255,255,255,0.4),
      transparent
    );
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  @keyframes skeleton-pulse {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
```

### Step 3: Create Province Filter API Endpoint (45 minutes)

Create the HTMX endpoint for dynamic filtering:

```typescript
// src/pages/api/filter-charts.astro
---
// This is an Astro endpoint that returns HTML for HTMX
import DataSection from '../../components/sections/DataSection.astro';

// Get province from query params
const url = new URL(Astro.request.url);
const selectedProvince = url.searchParams.get('province') || 'all';

// Load and filter data based on province
const unemploymentData = await import('../../data/idescat-provincias.json').then(m => m.default);
const sectorData = await import('../../data/randstad-catalunya.json').then(m => m.default);

// Filter logic
let filteredUnemploymentData = unemploymentData;
let filteredSectorData = sectorData;

if (selectedProvince !== 'all') {
  filteredUnemploymentData = unemploymentData.filter(
    item => item.provincia.toLowerCase() === selectedProvince.toLowerCase()
  );

  // Adapt sector data filtering as needed based on your data structure
  // This is a simplified example
}

// Transform to chart format
const chartData = filteredUnemploymentData.map(item => ({
  label: item.provincia,
  value: item.tasa_desempleo || 0
}));

const sectorChartData = Object.entries(filteredSectorData.sectores || {}).map(([sector, data]) => ({
  label: sector,
  value: data.empleo_total || 0
}));
---

<!-- Return the filtered chart data as HTML -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Employment Chart with filtered data -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div id="employment-chart"
         data-chart-type="bar"
         data-chart-data={JSON.stringify(chartData)}
         data-chart-title={`Desempleo ${selectedProvince === 'all' ? 'en Cataluña' : `en ${selectedProvince}`}`}
         class="h-96">
      <!-- Chart renders here via JavaScript -->
    </div>
  </div>

  <!-- Sector Chart with filtered data -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div id="sector-chart"
         data-chart-type="donut"
         data-chart-data={JSON.stringify(sectorChartData)}
         data-chart-title="Distribución por Sector"
         class="h-96">
      <!-- Chart renders here via JavaScript -->
    </div>
  </div>
</div>

<script>
  // Re-initialize charts after HTMX swap
  document.addEventListener('htmx:afterSwap', function(event) {
    if (event.detail.target.id === 'charts-container') {
      initCharts();
    }
  });

  function initCharts() {
    // Initialize employment chart
    const employmentChartEl = document.getElementById('employment-chart');
    if (employmentChartEl) {
      const data = JSON.parse(employmentChartEl.dataset.chartData);
      const title = employmentChartEl.dataset.chartTitle;

      // ApexCharts initialization
      const options = {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: { show: false }
        },
        series: [{
          name: 'Tasa de Desempleo',
          data: data.map(d => d.value)
        }],
        xaxis: {
          categories: data.map(d => d.label)
        },
        title: {
          text: title,
          style: {
            fontFamily: 'Manrope, sans-serif'
          }
        },
        colors: ['var(--color-terracota)'],
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            },
            xaxis: {
              labels: {
                rotate: -45
              }
            }
          }
        }]
      };

      const chart = new ApexCharts(employmentChartEl, options);
      chart.render();
    }

    // Initialize sector chart (similar pattern)
    // ... donut chart initialization
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', initCharts);
</script>
```

### Step 4: Add Error Handling & Accessibility (30 minutes)

Create error boundary component:

```astro
---
// src/components/ui/ChartErrorBoundary.astro
interface Props {
  chartId: string;
  onRetry?: () => void;
  class?: string;
}

const { chartId, onRetry, class: className = "" } = Astro.props;
---

<div class={`chart-error-boundary ${className}`} id={`error-${chartId}`} style="display: none;">
  <div class="text-center py-8 px-4 bg-red-50 rounded-lg border border-red-200">
    <div class="mb-4">
      <svg class="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>

    <h3 class="text-lg font-medium text-red-900 mb-2">
      Error al cargar los datos
    </h3>

    <p class="text-sm text-red-700 mb-4" id={`error-message-${chartId}`}>
      No se pudieron cargar los datos del gráfico. Por favor, inténtalo de nuevo.
    </p>

    <button
      type="button"
      onclick={onRetry ? `(${onRetry.toString()})()` : `window.location.reload()`}
      class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-describedby={`error-message-${chartId}`}
    >
      <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reintentar
    </button>
  </div>
</div>

<script define:vars={{ chartId }}>
  // Show error when chart fails to load
  document.addEventListener('chartLoadError', function(event) {
    if (event.detail.chartId === chartId) {
      const errorElement = document.getElementById(`error-${chartId}`);
      const chartElement = document.getElementById(chartId);

      if (errorElement && chartElement) {
        chartElement.style.display = 'none';
        errorElement.style.display = 'block';

        // Announce error to screen readers
        const message = document.getElementById(`error-message-${chartId}`);
        if (message) {
          message.setAttribute('aria-live', 'polite');
        }
      }
    }
  });
</script>
```

### Step 5: Testing & Validation (30 minutes)

Create a simple test checklist:

```bash
# 1. Visual Testing
bun run dev
# Visit http://localhost:4321
# Test on different screen sizes (mobile, tablet, desktop)

# 2. Accessibility Testing (manual)
# - Tab through all interactive elements
# - Test with screen reader (NVDA/JAWS/VoiceOver)
# - Verify color contrast with browser dev tools

# 3. Performance Testing
# Install Lighthouse CLI (if not already)
bunx lighthouse http://localhost:4321 --output=html --output-path=./lighthouse-report.html

# 4. Chart Interaction Testing
# - Select different provinces from dropdown
# - Verify charts update without page refresh
# - Test error states (disconnect network, reload, reconnect)

# 5. Data Validation
# Check that chart data matches source JSONs
node -e "
const data = require('./src/data/idescat-provincias.json');
console.log('Provinces loaded:', data.length);
console.log('Sample data:', JSON.stringify(data[0], null, 2));
"
```

## Performance Optimization Tips

### Lazy Loading Implementation

```javascript
// Add to chart components for intersection observer
const observerOptions = {
  rootMargin: "100px 0px",
  threshold: 0.1,
};

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadChart(entry.target);
      chartObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all chart containers
document.querySelectorAll("[data-chart-lazy]").forEach((chart) => {
  chartObserver.observe(chart);
});
```

### Bundle Size Optimization

```javascript
// Only import needed ApexCharts modules
import { ApexCharts, BarChart, DonutChart } from "apexcharts/dist/esm";

// Avoid importing entire library
// Don't: import ApexCharts from 'apexcharts';
```

## Common Issues & Solutions

| Issue                    | Solution                                              |
| ------------------------ | ----------------------------------------------------- |
| **Charts not rendering** | Check ApexCharts import and container height          |
| **HTMX not updating**    | Verify endpoint returns valid HTML, check network tab |
| **Slow performance**     | Implement lazy loading, reduce chart data points      |
| **Accessibility errors** | Add proper ARIA labels, test with screen reader       |
| **Mobile layout broken** | Test responsive breakpoints, adjust chart heights     |

## Deployment Checklist

Before deploying:

- [ ] All charts render correctly
- [ ] Province filtering works
- [ ] Error states display properly
- [ ] Performance targets met (LCP ≤2.5s mobile)
- [ ] Accessibility tests pass
- [ ] Data tables present for screen readers
- [ ] HTMX interactions work without JavaScript fallback
- [ ] Color contrast ≥4.5:1 verified
- [ ] SEO meta tags added

## Next Steps

After basic implementation:

1. **Add more chart types** (line charts for trends)
2. **Implement data caching** (localStorage for performance)
3. **Add data export** (CSV/Excel download)
4. **Create admin interface** (for data updates)
5. **Add internationalization** (English/Catalan support)

---

**Estimated total time**: 4-6 hours for full implementation  
**Ready for**: `/speckit.tasks` to break this into specific development tasks
