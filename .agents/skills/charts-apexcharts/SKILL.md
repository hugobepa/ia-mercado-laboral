---
name: charts-apexcharts
description: Generate ApexCharts v4+ configurations for data visualization. Use this skill when the user needs charts, graphs, or data visualization components (examples include bar charts, line charts, donut charts, heatmaps, or any ApexCharts implementation). Produces clean, accessible chart configs that follow the project's DESIGN.md color palette and responsive guidelines.
license: Complete terms in LICENSE.txt
---

# Skill: charts-apexcharts

## Trigger

- "crea una gráfica"
- "configura apexcharts"
- "gráfico de barras/donut/líneas"
- "visualiza datos"

## Descripción

Genera configuraciones de gráficas para ApexCharts v4+ siguiendo el DESIGN.md del proyecto.

## Output

- JSON listo para usar en componentes Astro
- Colores: primary (#C86405), secondary (#4A7C59), neutral (#7B6F72)
- Tipografía: 'Inter', sans-serif
- Responsive: altura adaptable (300px móvil, 350px desktop)

## Ejemplo de uso

```js
// Input: "gráfico de barras con datos de sectores"
// Output:
{
  chart: { type: 'bar', height: 300, fontFamily: 'Inter, sans-serif' },
  series: [{ name: 'Empleo riesgo', data: [77234, 42356, 31245] }],
  xaxis: { categories: ['Comercio', 'Hostelería', 'Industria'] },
  colors: ['#C86405', '#4A7C59', '#7B6F72'],
  plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
  tooltip: { theme: 'light', style: { fontSize: '14px' } }
}
```

## Restricciones

- NO usar gradientes arcoíris
- NO más de 3 colores por gráfica
- SIEMPRE incluir tooltip accesible
- Mobile-first: altura mínima 250px en móvil
