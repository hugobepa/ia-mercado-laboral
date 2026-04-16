# 📋 Especificaciones del Proyecto - IA y Mercado Laboral

## 🎯 Especificación 1: Página Principal (Landing)

### Qué

Una landing page única con secciones ancla que explica el impacto de la IA en el empleo en España y Cataluña.

### Por qué

Target: gente sin estudios universitarios. Necesitan información clara, coloquial y visual.

### Requisitos

- **Hero section**: Título impactante + subtítulo coloquial
- **Sección España**: Datos Randstad (20.4M ocupados, 9.8% riesgo)
- **Sección Cataluña**: Datos Idescat (3.8M ocupados, desglose provincial)
- **Sección Edad/Género**: Impacto diferenciado por perfil demográfico
- **Sección Sectores**: Qué empleos ganan/pierden
- **Gráficas**: ApexCharts interactivas (barras, donut, líneas)
- **Tablas**: Responsive (cards en móvil, tabla en desktop)

### Diseño

- Paleta: Terracota (#C86405) + Verde (#4A7C59) + Crema (#F5F1E6)
- Tipografía: Manrope (títulos) + Inter (cuerpo)
- Mobile-first: Menú hamburguesa, sin footer en móvil, botón flotante "volver arriba"

### Datos

- Fuente principal: Randstad Research 2024
- Fuente secundaria: Idescat EPA 2023-2024
- Formato: JSON en `src/data/`

---

## 🎯 Especificación 2: Componentes de Gráficas

### Qué

Componentes Astro reutilizables para ApexCharts.

### Por qué

Evitar repetir configuración de gráficas en cada página.

### Requisitos

- **BarChart.astro**: Gráfica de barras (sectores, provincias)
- **DonutChart.astro**: Gráfica de donut (distribución %)
- **LineChart.astro**: Gráfica de líneas (proyección temporal)
- **Config global**: Colores, fuentes, tooltips en `chart-helpers.js`

### Diseño

- Colores: Primary (#C86405), Secondary (#4A7C59), Neutral (#7B6F72)
- Responsive: Altura adaptable (300px móvil, 350px desktop)
- Interactivo: Tooltips en hover, leyenda clicable

---

## 🎯 Especificación 3: Componentes UI Base

### Qué

Componentes reutilizables para toda la web.

### Por qué

Consistencia visual y código DRY.

### Requisitos

- **Button.astro**: 3 variantes (primary, secondary, outline)
- **Card.astro**: Base + Province + Data + Demographic
- **Table.astro**: Desktop (tabla) + Mobile (cards)
- **Navigation.astro**: Desktop (header fijo) + Mobile (hamburguesa)

### Diseño

- Bordes asimétricos: `rounded-t-xl rounded-b-lg`
- Sombras: Solo en hover (`shadow-sm` → `shadow-md`)
- Transiciones: `duration-200`

---

## 🎯 Especificación 4: Página 404

### Qué

Página de error 404 personalizada.

### Por qué

GitHub Pages requiere `public/404.html`. Mejora UX y branding.

### Requisitos

- **public/404.html**: Para GitHub Pages (producción)
- **src/pages/404.astro**: Para desarrollo local
- Diseño: Minimalista, paleta del proyecto, botón "volver al inicio"
- Script: Detectar base path automáticamente (para GH Pages)

### Diseño

- Icono: 🔍 (lupa, no robot)
- Título: "404 - Página no encontrada"
- Enlace: Volver al inicio (con base path dinámico)
- Redirect: Opcional a los 3 segundos

---

## 🎯 Especificación 5: Adaptación GitHub Pages

### Qué

Configurar despliegue automático con GitHub Actions.

### Por qué

Hosting gratuito y sencillo para proyectos estáticos.

### Requisitos

- **astro.config.ts**: Activar `site` y `base` solo para producción
- **.github/workflows/deploy.yml**: Pipeline CI/CD con Bun
- **trailingSlash: 'always'**: Crítico para GH Pages
- **Enlaces**: Usar `Astro.url.pathname` para evitar rutas rotas

### Checklist

- [ ] `public/404.html` existe
- [ ] `astro.config.ts` con `site` y `base`
- [ ] `deploy.yml` configurado
- [ ] Enlaces auditados (no absolutos internos)
- [ ] Test manual post-despliegue
