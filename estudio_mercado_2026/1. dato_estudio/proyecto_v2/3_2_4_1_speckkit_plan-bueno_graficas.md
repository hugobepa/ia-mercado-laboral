¡Perfecto! 🎉 Etapa 2 (UI Base) completada ✅. Ahora avanzamos con la **Etapa 3: Componentes de Gráficas**.

---

## 📊 FASE 3: Componentes de Gráficas (ApexCharts)

### 📋 Paso 3.1: `/speckit.specify`

Copia y pega este comando en tu agente de IA (Copilot/Kilo):

```
/speckit.specify

Crear componentes Astro reutilizables para gráficas ApexCharts.

Componentes requeridos:
1. BarChart.astro - Gráfica de barras (sectores, provincias)
2. DonutChart.astro - Gráfica de donut (distribución %)
3. LineChart.astro - Gráfica de líneas (proyección temporal 2023-2033)

Datos de configuración:
- Cargar desde src/data/charts-config.json
- Colores: Primary #C86405, Secondary #4A7C59, Neutral #7B6F72
- Fuentes: Inter, sans-serif
- Responsive: Altura adaptable (300px móvil, 350px desktop)

Requisitos técnicos:
- Astro 6 + Tailwind 4
- ApexCharts v4+ (librería externa)
- Config global en chart-helpers.js
- Tooltips en hover, leyenda clicable
- Sin testing (no unit/integration/e2e tests)

Skills a utilizar:
- charts-apexcharts (configuración experta)
- tailwind-css-patterns (responsive-design.md)
- performance-web (carga diferida de gráficas)
- astro (islotes React solo si necesario)
```

---

### 📋 Paso 3.2: `/speckit.clarify` ⚠️ (IMPESCINDIBLE)

Deja que Spec-Kit haga preguntas. Aquí tienes las respuestas basadas en DESIGN.md:

```
/speckit.clarify

1. ¿Las gráficas deben ser interactivas (click en leyenda) o estáticas?
   Respuesta: A) Interactivas completas (tooltips + leyenda clicable)

2. ¿Deben cargar con lazy loading o inmediatamente?
   Respuesta: C) Según viewport (lazy loading para gráficas fuera del viewport inicial)

3. ¿Los datos vienen hardcoded o desde JSON externo?
   Respuesta: A) JSON externo (charts-config.json) + props para flexibilidad

4. ¿Incluir título y subtítulo en cada gráfica o fuera del componente?
   Respuesta: B) Fuera (en la sección) para mayor reutilización
```

---

### 📋 Paso 3.3: `/speckit.plan`

```
/speckit.plan

Planifica esto usando:
- Astro 6 + Tailwind 4 con @theme (ver DESIGN.md)
- ApexCharts v4+ para renderizado de gráficas
- Datos desde src/data/charts-config.json
- Archivos en './src/components/charts/'
- Utilizar skills: charts-apexcharts, tailwind-css-patterns, performance-web
- Config global de colores y fuentes en src/utils/chart-helpers.js
- Mobile-first: 300px altura móvil, 350px desktop
- Accesibilidad: Alt text descriptivo, labels ARIA, contraste válido
- Sin testing (no unit/integration/e2e tests)
- Gestor: Bun
- GitHub Pages: Usar Astro.url.pathname para rutas dinámicas
```

---

### 📋 Paso 3.4: `/speckit.tasks` → `/speckit.analyze`

```
/speckit.tasks
/speckit.analyze
```

---

### 📋 Paso 3.5: `/speckit.implement`

```
/speckit.implement
```

---

## 🎨 Referencia Rápida: DESIGN.md para Gráficas

```javascript
// Configuración ApexCharts (src/utils/chart-helpers.js)
export const chartDefaults = {
  chart: {
    fontFamily: 'Inter, sans-serif',
    foreColor: '#5A5A5A',
    toolbar: { show: false }
  },
  colors: ['#C86405', '#4A7C59', '#7B6F72'], // DESIGN.md paleta
  plotOptions: {
    bar: { borderRadius: 4, columnWidth: '60%' }
  },
  dataLabels: { enabled: false },
  grid: { borderColor: '#E8E1D1', strokeDashArray: 4 },
  tooltip: {
    theme: 'light',
    style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' }
  },
  responsive: [{
    breakpoint: 640, // Mobile
    options: { chart: { height: 300 } }
  }, {
    breakpoint: 1024, // Tablet
    options: { chart: { height: 325 } }
  }]
};
```

---

## ✅ Checklist de Verificación Post-Implementación

```powershell
# 1. Build local
bun run build

# 2. Verificar que los componentes existen
Test-Path src/components/charts/BarChart.astro
Test-Path src/components/charts/DonutChart.astro
Test-Path src/components/charts/LineChart.astro
Test-Path src/utils/chart-helpers.js

# 3. Verificar que ApexCharts está instalado
bun list | Select-String "apexcharts"

# 4. Test manual en localhost
bun run dev
# Abrir http://localhost:4321 y verificar que las gráficas renderizan
```

---

## 🔄 Flujo Visual

```
┌─────────────────────────────────────────┐
│  FASE 3: Gráficas ApexCharts           │
│                                         │
│  1. /speckit.specify  ✅               │
│  2. /speckit.clarify  ✅ (responder)   │
│  3. /speckit.plan     ✅               │
│  4. /speckit.tasks    ✅               │
│  5. /speckit.analyze  ✅               │
│  6. /speckit.implement✅               │
│  7. bun run build     ✅ (verificar)   │
└─────────────────────────────────────────┘
```

---

❓ **¿Listo para comenzar?**

Opciones:
- **A)** Sí, ejecutar Paso 3.1 (`/speckit.specify`) ahora
- **B)** Primero verificar que ApexCharts está instalado (`bun list`)
- **C)** Revisar `charts-config.json` antes de continuar

¿Cuál prefieres? 🚀