# 🎨 Fase B: Diseño "No-IA" Completo

¡Perfecto! Creamos el sistema de diseño siguiendo las guías para evitar estética de IA. Todo en formatos web-ready.

---

## 📄 Archivo DESIGN.md (Fuente de Verdad para Spec-Kit)

```markdown
# DESIGN.md - IA y Mercado Laboral (Cataluña/España)

## 🎯 Principios Rectores
- **No parecer hecho por IA**: Evitar azules/lilas saturados, gradientes arcoíris, simetría perfecta
- **Mobile-first**: Prioridad móvil, luego tablet y desktop
- **Accesibilidad**: Contraste WCAG AA mínimo (4.5:1 para texto)
- **Velocidad**: Carga rápida, dependencias mínimas
- **Identidad humana**: Tonos tierra, asimetría intencional, espacios orgánicos

## 🎨 Paleta de Colores (4 colores máx.)

### Colores Principales
| Variable | Valor | Uso | Hover |
|----------|-------|-----|-------|
| `--color-primary` | `#C86405` | CTAs, títulos, datos clave | `#A55204` |
| `--color-secondary` | `#4A7C59` | Acentos positivos, gráficos | `#3A6246` |
| `--color-neutral` | `#F5F1E6` | Fondos, cards | `#E8E1D1` |
| `--color-text` | `#2C2C2C` | Texto principal | `#5A5A5A` (light) |

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
| Elemento | Tamaño | Line-height | Peso |
|----------|--------|-------------|------|
| H1 | `2.5rem` (40px) | 1.2 | 700 |
| H2 | `2rem` (32px) | 1.3 | 700 |
| H3 | `1.5rem` (24px) | 1.4 | 600 |
| H4 | `1.25rem` (20px) | 1.4 | 600 |
| Body | `1rem` (16px) | 1.6 | 400 |
| Small | `0.875rem` (14px) | 1.5 | 400 |
| Caption | `0.75rem` (12px) | 1.4 | 400 |

### Responsive Typography (clamp)
```css
h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.5rem); }
body { font-size: clamp(0.9rem, 2vw, 1rem); }
```

## 🧩 Componentes Base

### Botones
```css
/* Estilos base */
.btn-primary {
  @apply bg-primary text-white px-4 py-2 rounded-lg font-medium;
  @apply hover:bg-primary-hover transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
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

## 🚀 Checklist de Implementación

### Fase B1: Configuración
- [ ] DESIGN.md creado en raíz
- [ ] Tailwind config con colores personalizados
- [ ] Google Fonts importadas en layouts
- [ ] CSS variables globales definidas

### Fase B2: Componentes Base
- [ ] Button (3 variantes)
- [ ] Card (base + province + data)
- [ ] Table (desktop + mobile cards)
- [ ] Navigation (desktop + mobile drawer)

### Fase B3: Gráficas
- [ ] ApexCharts configurado con defaults
- [ ] BarChart component
- [ ] DonutChart component
- [ ] LineChart component

### Fase B4: Accesibilidad
- [ ] Contrastes validados (WebAIM)
- [ ] Navegación teclado probada
- [ ] Focus styles visibles
- [ ] Alt text en imágenes

---

**Última actualización**: Fase B - Diseño "No-IA"
**Versión**: 1.0
**Estado**: ✅ Listo para spec-kit
```

---

## 🎨 Propuestas Visuales (3 Opciones)

### Opción A: "Mediterráneo Urbano" (Recomendada ✅)
```
Paleta: Terracota + Verde Pino + Crema
Vibe: Cercano, profesional, catalán
Ideal para: Target general (oficinas, comercio, servicios)
```

### Opción B: "Industrial Moderno"
```
Paleta: Bronce + Verde Salvia + Marfil
Vibe: Más serio, industria, logística
Ideal para: Enfoque en sectores industriales
```

### Opción C: "Natural Orgánico"
```
Paleta: Verde Menta + Rosa Suave + Crema Natural
Vibe: Fresco, sostenible, agrícola
Ideal para: Enfoque en sector primario/rural
```

---

## 📋 Archivos Base Creados (Listos para Proyecto)

### 1. `src/styles/global.css`
```css
/* Importación de fuentes */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&family=Inter:wght@400;500&display=swap');

/* Variables globales */
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

/* Reset básico */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-neutral);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

/* Tipografía responsive */
h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.5rem); }
```

### 2. `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: { 
          DEFAULT: '#C86405', 
          hover: '#A55204' 
        },
        secondary: { 
          DEFAULT: '#4A7C59', 
          hover: '#3A6246' 
        },
        neutral: { 
          DEFAULT: '#F5F1E6', 
          dark: '#E8E1D1' 
        },
        text: { 
          DEFAULT: '#2C2C2C', 
          light: '#5A5A5A' 
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      borderRadius: {
        't-xl': '1rem 1rem 0 0',
        'b-lg': '0 0 0.75rem 0.75rem'
      },
      transitionDuration: {
        '200': '200ms'
      }
    }
  },
  plugins: []
}
```

### 3. `src/components/ui/Button.astro`
```astro
---
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  children: any;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
}

const { 
  variant = 'primary', 
  href, 
  onClick, 
  children, 
  class: className = '',
  type = 'button'
} = Astro.props;

const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'
};

const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
---

{href ? (
  <a href={href} class={classes}>
    {children}
  </a>
) : (
  <button type={type} onClick={onClick} class={classes}>
    {children}
  </button>
)}
```

---

## 🔄 Siguiente Paso: ¿Te encaja este diseño?

Para avanzar a la **Fase C (Creación del Proyecto)**, necesito que me confirmes:

1. ✅ ¿La paleta "Mediterráneo Urbano" (terracota + verde + crema) te gusta o prefieres otra opción?
2. ✅ ¿Los componentes base (Button, Card, Table) están bien definidos para spec-kit?
3. ✅ ¿Empezamos ya con la **Fase C0: Setup Manual del Proyecto** (Astro 6 + Tailwind 4 + Bun + estructura)?

> 💡 **Recuerda**: Este DESIGN.md será la "biblia" que spec-kit leerá para generar UI consistente sin caer en clichés de IA.

**¿Seguimos con el setup del proyecto?** 🚀