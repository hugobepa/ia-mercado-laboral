# 📋 Plan Completo Actualizado - Spec-Kit + Datos Integrados
C:\Users\User\Documents\curro2026\estudio_mercado_2026\1. dato_estudio
C:\Users\User\Documents\curro2026\estudio_mercado_2026\0.preparacion
C:\Users\User\Documents\programacion2025\prueba\spec_drive\ia-mercado-laboral



1. specify init --here
2 poner:
	-constituicon
		- raiz '.specify'
		- dentro  '.specify/memory'
	- specifactions 
		- raiz '.specify'
	- DESIGN.
		- raiz proyecto
		


Tienes toda la razón. **Antes de `/specify`** debemos integrar TODOS los datos que hemos preparado. Voy a recapitular el plan inicial y añadir lo que faltaba.

---

## 🔄 Estado Actual de Archivos de Datos

| Archivo | Contenido | Estado |
|---------|-----------|--------|
| `randstad-catalunya.json` | Datos Randstad 2024 (España/Cataluña) | ✅ Creado |
| `idescat-provincias.json` | 4 provincias (peso económico, adopción IA) | ✅ Creado |
| `charts-config.json` | Configuración gráficas (barras, donut) | ✅ Creado |
| `constitution.md` | Principios rectores del proyecto | ✅ Creado |
| `DESIGN.md` | Sistema de diseño completo | ✅ Creado |
| `specifications.md` | 5 especificaciones detalladas | ✅ Creado |

---

## 🎯 Plan Completo Actualizado (Con Datos Integrados)

### **FASE 0: Verificación Pre-Spec-Kit** (5 minutos)

```powershell
# 1. Verificar Spec-Kit instalado
specify --version
specify --help

# 2. Verificar archivos críticos
Test-Path constitution.md
Test-Path DESIGN.md
Test-Path specifications.md
Test-Path src/data/randstad-catalunya.json
Test-Path src/data/idescat-provincias.json
Test-Path src/data/charts-config.json

# 3. Verificar build
bun run build
Test-Path dist/index.html
```

---

### **FASE 1: Git + Spec-Kit Init** (OBLIGATORIO)

```powershell
# 1. Git init
git init
git branch -M main

# 2. Crear .gitignore
@"
node_modules
dist
.DS_Store
*.log
.env
.vscode
.agents/.cache
"@ | Out-File -FilePath ".gitignore" -Encoding utf8

# 3. Spec-Kit init
uvx --from git+https://github.com/github/spec-kit.git specify init --here

# 4. Primer commit
git add .
git commit -m "feat: setup inicial - datos + config + DESIGN.md"
```

---

### **FASE 2: /speckit.constitution** (Principios del Proyecto)

```
/speckit.constitution

Actualizar constitución del proyecto con:
- Principios de código limpio (DRY, SOLID, KISS)
- Mobile-first, prioridad móviles
- No testing (no unit/integration/e2e)
- Astro 6 + Tailwind 4 + HTMX + Islas React
- Bun como gestor de paquetes
- Datos en JSON dentro del proyecto (src/data/)
- Estructura de carpetas: layouts, components, utils, data, pages

Skills a utilizar:
- astro
- tailwind-css-patterns
- frontend-design
- accessibility-wcag
- performance-web
```

---

### **FASE 3: Especificaciones Múltiples (Con Datos Integrados)**

#### **Especificación 1: Hero Section**

```
/speckit.specify

Crear Hero section para landing page sobre IA y empleo.

Requisitos:
- Título: "¿La IA me va a quitar el trabajo?"
- Subtítulo: "Datos Randstad 2024 - Explicado sin rollo"
- 3 cifras destacadas: Ocupados (3.84M), Riesgo (9.8%), Mejora (15.9%)
- CTA botón: "Ver datos completos" (ancla a #datos)
- Seguir DESIGN.md: paleta Mediterráneo Urbano
- Mobile-first, responsive
- Sin React islands (es estático)

Datos a usar:
- src/data/randstad-catalunya.json (cifras_clave_catalunya_2033)

Skills a utilizar:
- astro (estructura de componentes)
- tailwind-css-patterns (referencias/responsive-design.md)
- frontend-design (UI no-IA)
- accessibility-wcag (WCAG AA)
- performance-web (Core Web Vitals)
```

---

#### **Especificación 2: Cards de Provincias (Rural vs Urbano)**

```
/speckit.specify

Crear sección de cards de provincias con enfoque rural/urbano.

Requisitos:
- 4 cards: Barcelona (urbano), Girona (mixto), Lleida (rural), Tarragona (industrial)
- Cada card muestra: nombre, ocupados, riesgo IA %, ejemplo cotidiano
- Diseño asimétrico: rounded-t-xl rounded-b-lg
- Hover effect: shadow-sm → shadow-md + translate-y
- Mobile: 1 columna, Desktop: 4 columnas

Datos a usar:
- src/data/idescat-provincias.json (provincias array)
- src/data/randstad-catalunya.json (estimacion_impacto_ia_por_provincia_2033)

Skills a utilizar:
- astro (componentes reutilizables)
- tailwind-css-patterns (referencias/component-patterns.md)
- frontend-design (asimetría intencional)
- performance-web (lazy load images si hay)
```

---

#### **Especificación 3: Estadísticas por Edad y Género**

```
/speckit.specify

Crear sección de estadísticas demográficas (edad + género).

Requisitos:
- 2 gráficas: Barras (riesgo por edad) + Donut (distribución género)
- Tabla responsive: desktop (tabla) / mobile (cards)
- Datos desglosados: 16-24, 25-44, 45-54, 55-64 años
- Género: hombres vs mujeres (riesgo, oportunidad, sin efecto)
- Ejemplos cotidianos por perfil

Datos a usar:
- src/data/randstad-catalunya.json (ocupados_catalunya_por_edad_genero_2023)
- src/data/charts-config.json (barChart, donutChart)

Skills a utilizar:
- charts-apexcharts (configuración de gráficas)
- tailwind-css-patterns (referencias/responsive-design.md)
- accessibility-wcag (contraste, alt text)
- performance-web (optimización de gráficas)
```

---

#### **Especificación 4: Componentes de Gráficas (Reutilizables)**

```
/speckit.specify

Crear componentes reutilizables para gráficas ApexCharts.

Requisitos:
- BarChart.astro: Gráfica de barras (sectores, provincias, edad)
- DonutChart.astro: Gráfica de donut (distribución %, género)
- LineChart.astro: Gráfica de líneas (proyección temporal 2023-2033)
- Config global: Colores, fuentes, tooltips en chart-helpers.js
- Responsive: 300px móvil, 350px desktop

Datos a usar:
- src/data/charts-config.json (configuración base)
- DESIGN.md (colores: primary #C86405, secondary #4A7C59)

Skills a utilizar:
- charts-apexcharts (configuración experta)
- astro (islotes React solo si necesario)
- performance-web (carga diferida de gráficas)
```

---

### **FASE 4: /clarify (Imprescindible para Cada Especificación)**

```
/speckit.clarify

Para Hero section:
1. ¿El Hero incluye imagen/ilustración o solo tipografía?
   Opciones: A) Solo tipografía, B) Icono SVG simple, C) Ilustración completa

2. ¿Las cifras van en cards separadas o inline?
   Opciones: A) 3 cards horizontales, B) 3 columnas inline, C) Grid 2+1

3. ¿El CTA lleva ancla interna o es enlace externo?
   Opciones: A) Ancla a #datos, B) Enlace a otra página, C) Scroll suave

Para Cards de Provincias:
4. ¿Qué breakpoint para 4 columnas?
   Opciones: A) >1024px, B) >1280px, C) Siempre responsive

5. ¿Incluir mapa interactivo de Cataluña?
   Opciones: A) No (solo cards), B) Mapa estático SVG, C) Mapa interactivo

Para Estadísticas Edad/Género:
6. ¿Gráficas interactivas o estáticas?
   Opciones: A) Interactivas (hover, click), B) Estáticas (imagen), C) Híbridas

7. ¿Tabla con ordenación o fija?
   Opciones: A) Fija (más rápido), B) Ordenable (más funcional)
```

---

### **FASE 5: /plan (Plan Técnico con Stack)**

```
/speckit.plan

Planifica esto usando:
- Astro 6 + Tailwind 4 con @theme (ver DESIGN.md)
- Fuentes Manrope (títulos) + Inter (cuerpo) de Google Fonts
- No se necesitan pruebas (no unit/integration/e2e tests)
- Gestor de paquetes: Bun
- Datos en JSON mismo proyecto (src/data/)
- Archivos dentro de './src' con carpetas: layouts, components, utils, data, pages
- Utilizar skills del proyecto (.agents/skills/):
  * astro (estructura)
  * tailwind-css-patterns (referencias/responsive-design.md)
  * frontend-design (UI no-IA)
  * accessibility-wcag (WCAG AA)
  * performance-web (Core Web Vitals)
  * charts-apexcharts (configuración de gráficas)
- Configurar para GitHub Pages (base path dinámico)
- Especificar librerías por uso:
  * apexcharts para gráficas
  * htmx para interacciones ligeras
```

---

### **FASE 6: /tasks → /analyze → /implement**

```
/speckit.tasks
/speckit.analyze
/speckit.implement
```

---

## 📊 Resumen de Datos a Integrar

| Sección | Archivo JSON | Datos Clave |
|---------|-------------|-------------|
| **Hero** | `randstad-catalunya.json` | ocupados_actuales_2023, porcentaje_riesgo, porcentaje_mejora |
| **Provincias** | `idescat-provincias.json` | 4 provincias con pesoEconomico, adopcionIA |
| **Provincias (detalle)** | `randstad-catalunya.json` | estimacion_impacto_ia_por_provincia_2033 |
| **Edad/Género** | `randstad-catalunya.json` | ocupados_catalunya_por_edad_genero_2023 |
| **Gráficas** | `charts-config.json` | barChart, donutChart configuraciones |

---

## 🎯 Checklist Completo del Plan

```markdown
## [ ] Fase 0: Verificación
- [ ] specify --version funciona
- [ ] Archivos de datos existen (3 JSON)
- [ ] Build local funciona

## [ ] Fase 1: Git + Spec-Kit
- [ ] git init + git branch -M main
- [ ] .gitignore creado
- [ ] specify init --here ejecutado
- [ ] Primer commit hecho

## [ ] Fase 2: Constitution
- [ ] /speckit.constitution ejecutado
- [ ] Principios actualizados con stack técnico

## [ ] Fase 3: Especificaciones (4 total)
- [ ] Hero section (/specify + /clarify + /plan + /tasks + /implement)
- [ ] Cards de Provincias (rural/urbano)
- [ ] Estadísticas Edad/Género
- [ ] Componentes Gráficas (reutilizables)

## [ ] Fase 4: Git Commits
- [ ] speckit-git-commit para cada feature
- [ ] speckit-git-validate antes de push

## [ ] Fase 5: Verificación
- [ ] bun run build funciona
- [ ] Test manual localhost:4321
- [ ] Accesibilidad validada (WCAG AA)
- [ ] Performance check (Core Web Vitals)
```

---

## ❓ Confirmación Final

¿Quieres que:

**A)** Empecemos con **Fase 0 y 1** (Verificación + Git + Spec-Kit init)  
**B)** Primero verifiquemos que los **3 archivos JSON** tienen el contenido correcto  
**C)** Directamente al primer `/speckit.specify` (Hero section)

> 💡 **Recomendación**: Opción A → B → C (orden lógico, sin saltar pasos)

**¿Por cuál empezamos?** 🚀