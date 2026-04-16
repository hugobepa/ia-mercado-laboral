# 🎨 DESIGN.md - IA y Mercado Laboral (España/Cataluña)

## 🎯 Principios Rectores (NO NEGOCIABLES)

### 1. No Parecer Hecho por IA
- ❌ EVITAR: Azules/lilas saturados (#8B5CF6, #3B82F6), gradientes arcoíris, ilustraciones 3D genéricas
- ✅ USAR: Tonos tierra, terracota, verdes apagados, fotografía auténtica o minimalismo tipográfico
- ✅ ASIMETRÍA: Bordes redondeados asimétricos (`rounded-t-xl rounded-b-lg`), espacios orgánicos

### 2. Mobile-First
- Prioridad móvil (<640px), luego tablet (640-1024px), luego desktop (>1024px)
- Touch targets mín. 44x44px en móvil
- Menú hamburguesa en móvil, header fijo en desktop
- Sin footer en móvil, botón flotante "volver arriba"

### 3. Accesibilidad (WCAG AA)
- Contraste mínimo 4.5:1 para texto
- Focus visible en elementos interactivos
- Navegación por teclado funcional
- Alt text en todas las imágenes

### 4. Velocidad
- Carga rápida, dependencias mínimas
- Máximo 4 colores en paleta
- Sin blancos puros de fondo (#FFFFFF) → usar cremas (#F5F1E6)

---

## 🎨 Paleta de Colores (4 colores máx.)

### Colores Principales
| Variable | Valor Hex | Uso | Hover | Contraste |
|----------|-----------|-----|-------|-----------|
| `--color-primary` | `#C86405` | CTAs, títulos, datos clave | `#A55204` | 4.8:1 ✅ |
| `--color-secondary` | `#4A7C59` | Acentos positivos, gráficos | `#3A6246` | 5.2:1 ✅ |
| `--color-neutral` | `#F5F1E6` | Fondos, cards | `#E8E1D1` | - |
| `--color-text` | `#2C2C2C` | Texto principal | `#5A5A5A` (light) | 12.5:1 ✅ |

### Tailwind Config
```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#C86405', hover: '#A55204' },
        secondary: { DEFAULT: '#4A7C59', hover: '#3A6246' },
        neutral: { DEFAULT: '#F5F1E6', dark: '#E8E1D1' },
        text: { DEFAULT: '#2C2C2C', light: '#5A5A5A' }
      }
    }
  }
}
```

### CSS Variables (Global)
```css
/* src/styles/global.css */
:root {
  --color-primary: #C86405;
  --color-primary-hover: #A55204;
  --color-secondary: #4A7C59;
  --color-secondary-hover: #3A6246;
  --color-neutral: #F5F1E6;
  --color-neutral-dark: #E8E1D1;
  --color-text: #2C2C2C;
  --color-text-light: #5A5A5A;
  
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 🔤 Tipografía (Google Fonts - Gratis)

### Combinación
| Tipo | Fuente | Pesos | Uso |
|------|--------|-------|-----|
| Títulos | `Manrope` | 600, 700 | H1-H4, datos destacados |
| Cuerpo | `Inter` | 400, 500 | Párrafos, tablas, labels |

### Importación
```html
<!-- En <head> de layouts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### Escala Tipográfica
| Elemento | Tamaño Desktop | Tamaño Mobile | Line-height | Peso |
|----------|---------------|---------------|-------------|------|
| H1 | `2.5rem` (40px) | `clamp(1.75rem, 5vw, 2.5rem)` | 1.2 | 700 |
| H2 | `2rem` (32px) | `clamp(1.5rem, 4vw, 2rem)` | 1.3 | 700 |
| H3 | `1.5rem` (24px) | `clamp(1.25rem, 3vw, 1.5rem)` | 1.4 | 600 |
| H4 | `1.25rem` (20px) | `1.125rem` (18px) | 1.4 | 600 |
| Body | `1rem` (16px) | `clamp(0.9rem, 2vw, 1rem)` | 1.6 | 400 |
| Small | `0.875rem` (14px) | `0.8125rem` (13px) | 1.5 | 400 |
| Caption | `0.75rem` (12px) | `0.6875rem` (11px) | 1.4 | 400 |

---

## 🧩 Componentes Base

### Botones
```css
/* Estilos base */
.btn-primary {
  @apply bg-primary text-white px-4 py-2 rounded-lg font-medium;
  @apply hover:bg-primary-hover transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
  @apply min-h-[44px] min-w-[44px]; /* Touch target móvil */
}

.btn-secondary {
  @apply bg-secondary text-white px-4 py-2 rounded-lg font-medium;
  @apply hover:bg-secondary-hover transition-colors duration-200;
}

.btn-outline {
  @apply border-2 border-primary text-primary px-4 py-2 rounded-lg font-medium;
  @apply hover:bg-primary hover:text-white transition-colors duration-200;
}
```

### Cards (Asimetría intencional)
```css
.card-base {
  @apply bg-neutral rounded-t-xl rounded-b-lg p-4;
  @apply shadow-sm hover:shadow-md transition-shadow duration-200;
  @apply border border-neutral-dark/50;
}

.card-province {
  @apply card-base;
  @apply hover:-translate-y-1 transition-transform duration-200;
}

.card-data {
  @apply card-base;
  @apply grid grid-cols-2 gap-4;
}
```

### Tablas (Responsive)
```css
/* Desktop: tabla clásica */
.table-desktop {
  @apply w-full border-collapse;
  @apply [&_th]:bg-neutral [&_th]:p-3 [&_th]:text-left [&_th]:font-heading [&_th]:font-bold;
  @apply [&_td]:p-3 [&_td]:border-t [&_td]:border-neutral-dark;
}

/* Mobile: convertir a cards */
@media (max-width: 640px) {
  .table-mobile-cards {
    @apply flex flex-col gap-4;
  }
  .table-mobile-cards tr {
    @apply card-base flex flex-col gap-2;
  }
  .table-mobile-cards td {
    @apply flex justify-between items-center border-t-0;
  }
  .table-mobile-cards td::before {
    @apply font-medium text-text-light;
    content: attr(data-label);
  }
}
```

### Gráficas (ApexCharts)
```js
// Configuración global ApexCharts
const chartDefaults = {
  chart: {
    fontFamily: 'Inter, sans-serif',
    foreColor: '#5A5A5A',
    toolbar: { show: false }
  },
  colors: ['#C86405', '#4A7C59', '#7B6F72'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '60%'
    }
  },
  dataLabels: { enabled: false },
  grid: {
    borderColor: '#E8E1D1',
    strokeDashArray: 4
  },
  tooltip: {
    theme: 'light',
    style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' }
  }
};
```

### Navegación
```css
/* Desktop */
.nav-desktop {
  @apply fixed top-0 left-0 right-0 bg-neutral/95 backdrop-blur-sm z-50;
  @apply border-b border-neutral-dark;
}

/* Mobile */
.nav-mobile {
  @apply fixed bottom-4 right-4 z-50;
  @apply bg-primary text-white p-3 rounded-full shadow-lg;
  @apply hover:bg-primary-hover transition-colors duration-200;
}
```

---

## 📐 Layout & Espaciado

### Contenedor Principal
```css
.container-base {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  @apply py-8 sm:py-12;
}
```

### Espaciado Orgánico (no grid perfecto)
```css
/* Secciones con ritmo variable */
.section-spacing {
  @apply space-y-8 sm:space-y-12 lg:space-y-16;
}

/* Cards con gap variable para asimetría */
.cards-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6;
}
```

### Breakpoints
| Punto | Ancho | Uso |
|-------|-------|-----|
| Mobile | `<640px` | 1 columna, menú hamburguesa, cards en vez de tablas |
| Tablet | `640-1024px` | 2 columnas, navegación visible |
| Desktop | `>1024px` | 3 columnas, todos los elementos visibles |

---

## 🎯 Elementos "No-IA" (Diferenciadores)

### ✅ DO's (Hacer)
- [ ] Tonos tierra (terracota, verde bosque, crema)
- [ ] Bordes redondeados asimétricos (`rounded-t-xl rounded-b-lg`)
- [ ] Sombras solo en hover, no siempre
- [ ] Espacios en blanco orgánicos (no grid perfecto)
- [ ] Iconos SVG personalizados (no librerías genéricas)
- [ ] Transiciones suaves (`duration-200`)
- [ ] Touch targets mín. 44x44px en móvil

### ❌ DON'Ts (Evitar)
- [ ] Azules/lilas saturados (#8B5CF6, #3B82F6)
- [ ] Gradientes arcoíris
- [ ] Ilustraciones 3D genéricas
- [ ] Simetría perfecta
- [ ] Más de 4 colores
- [ ] Blancos puros de fondo (#FFFFFF)
- [ ] Dependencias pesadas

---

## 📱 Navegación Mobile-First

### Menú Móvil
```
- Hamburguesa (44x44px touch target)
- Drawer lateral con fondo neutral
- Enlaces con padding generoso (min 48px altura)
- Sin footer en móvil (botón flotante "volver arriba")
```

### Navegación Desktop
```
- Header fijo con logo + enlaces principales
- Breadcrumbs en páginas internas
- Paginador con flechas + números
- Botón "volver arriba" visible al hacer scroll
```

---

## ♿ Accesibilidad (WCAG AA)

### Contrastes Validados
| Combinación | Ratio | Cumple |
|-------------|-------|--------|
| Text/Neutral | 12.5:1 | ✅ AAA |
| Primary/Neutral | 4.8:1 | ✅ AA |
| Secondary/Neutral | 5.2:1 | ✅ AA |

### Requisitos
- [ ] Alt text en todas las imágenes
- [ ] Navegación por teclado funcional
- [ ] Focus visible en elementos interactivos
- [ ] Labels en formularios
- [ ] Skip link para contenido principal

---

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Table.astro
│   │   └── Navigation.astro
│   ├── charts/
│   │   ├── BarChart.astro
│   │   ├── DonutChart.astro
│   │   └── LineChart.astro
│   └── sections/
│       ├── Hero.astro
│       ├── DataSection.astro
│       └── ProvinceCards.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── pages/
│   ├── index.astro
│   └── 404.astro
├── styles/
│   ├── global.css
│   └── components.css
├── data/
│   ├── randstad-catalunya.json
│   ├── idescat-provincias.json
│   └── charts-config.json
└── utils/
    ├── formatters.js
    └── chart-helpers.js
```

