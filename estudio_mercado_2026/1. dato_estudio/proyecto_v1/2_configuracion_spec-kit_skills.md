# 🚀 Fase C1: Configuración de Spec-Kit + Skills

¡Perfecto! Continuamos con la configuración de **Spec-Kit** y **AutoSkills** manteniendo todo lo corregido anteriormente.

---

## 📋 Paso 1: Instalar Spec-Kit con UV

### Comandos a ejecutar (PowerShell o Terminal):

```bash
# 1. Instalar UV (gestor de paquetes Python rápido)
winget install astral-sh.uv

# 2. Instalar Spec-Kit con UV (one-time)
uvx --from git+https://github.com/github/spec-kit.git specify init --here

# 3. Verificar instalación
specify --version
specify --help

# 4. Instalar AutoSkills para el proyecto
npx autoskills --agent copilot
```

---

## 📄 Paso 2: Crear Constitución del Proyecto (`.specify/constitution.md`)

Este archivo define las "reglas del juego" para Spec-Kit:

```markdown
# 📜 Constitución del Proyecto - IA y Mercado Laboral

## 🎯 Principios Rectores (NO NEGOCIABLES)

### 1. Código Limpio
- **DRY**: No repetir código. Componentes reutilizables.
- **SOLID**: Cada archivo tiene una responsabilidad clara.
- **KISS**: Soluciones simples, no sobre-ingeniería.
- **Módular**: Carpetas mínimas, máxima reutilización.

### 2. UX/UI
- **Mobile-first**: Prioridad móvil, luego tablet y desktop.
- **Accesibilidad**: WCAG AA mínimo (contraste 4.5:1).
- **Velocidad**: Carga rápida, dependencias mínimas.
- **No parecer IA**: Evitar azules/lilas saturados, gradientes arcoíris.

### 3. Testing
- **NO unit tests**
- **NO integration tests**
- **NO e2e tests**
- **SÍ test manual** con Playwright-CLI en localhost

### 4. Stack Técnico
- **Astro 6** (última versión estable)
- **Tailwind 4** (con @theme)
- **HTMX** para interacciones ligeras
- **Islas React** solo cuando sea necesario
- **Bun** como gestor de paquetes
- **Datos en JSON** dentro del proyecto

### 5. Estructura de Carpetas
```
src/
├── layouts/          # Layouts base
├── pages/            # Páginas (index, 404, etc.)
├── components/       # Componentes reutilizables
│   ├── ui/           # Botones, cards, tablas
│   ├── charts/       # Gráficas ApexCharts
│   └── sections/     # Secciones de página
├── data/             # JSON con datos Randstad/Idescat
├── styles/           # CSS global
└── utils/            # Funciones helper
```

## 🎨 Sistema de Diseño (DESIGN.md)

Ver `DESIGN.md` en raíz para:
- Paleta de colores (4 máx: terracota, verde, crema, carbón)
- Tipografía (Manrope + Inter)
- Componentes base (Button, Card, Table)
- Elementos "no-IA" (asimetría, espacios orgánicos)

## 📊 Fuentes de Datos

- **Randstad Research 2024**: Impacto IA empleo España/Cataluña
- **Idescat 2023-2024**: Datos laborales Cataluña (EPA)
- **INE 2023-2024**: Datos laborales España (EPA)
- **ECB 2026**: Inflación, shocks oferta y IA
- **BLS 2024-2034**: Proyecciones empleo y metodología

## ⚠️ Restricciones Explícitas

- **NO** usar datos de Santiago Niño Becerra
- **NO** más de 4 colores en paleta
- **NO** blancos puros de fondo (#FFFFFF)
- **NO** simetría perfecta en layouts
- **NO** base path en astro.config para local (solo para GitHub Pages)

## 🔄 Flujo de Trabajo con Spec-Kit

1. `/specify` → Definir qué construir
2. `/clarify` → Aclarar dudas (IMPESCINDIBLE)
3. `/plan` → Plan técnico con stack elegido
4. `/tasks` → Lista de tareas accionables
5. `/implement` → Ejecutar tareas
6. `/checklist` → Validar calidad

---

**Última actualización**: Fase C1
**Versión**: 1.0
**Estado**: ✅ Activo
```

---

## 📄 Paso 3: Crear Especificación Principal (`.specify/specifications.md`)

```markdown
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
```

---

## 📄 Paso 4: Crear Skills Personalizadas (`.autoskills/skills.md`)

```markdown
# 🛠️ Skills del Proyecto - IA y Mercado Laboral

## Skill 1: `astro-component`
**Trigger**: "crea un componente", "nuevo componente"
**Descripción**: Genera componentes Astro con Tailwind siguiendo DESIGN.md
**Output**: Archivo .astro en `src/components/` con estilos Tailwind
**Ejemplo**:
```
/autoskills astro-component
Nombre: ProvinceCard
Ubicación: src/components/ui/
Estilos: card-base, rounded-t-xl, bg-neutral
```

## Skill 2: `apex-chart`
**Trigger**: "crea una gráfica", "configura chart"
**Descripción**: Crea configuraciones de gráficas para ApexCharts en JSON
**Output**: JSON listo para usar en componentes de gráficas
**Ejemplo**:
```
/autoskills apex-chart
Tipo: bar
Datos: [77234, 42356, 31245, 15167]
Categorías: ["Comercio", "Hostelería", "Industria", "Tech"]
Colores: ["#C86405", "#4A7C59"]
```

## Skill 3: `data-formatter`
**Trigger**: "formatea datos", "prepara JSON"
**Descripción**: Convierte datos brutos (Randstad/Idescat) a formato JSON web-ready
**Output**: JSON estructurado en `src/data/`
**Ejemplo**:
```
/autoskills data-formatter
Fuente: Randstad 2024
Sección: sectores_catalunya
Formato: JSON con campos: sector, empleo_riesgo, nuevos_empleos, ejemplo_cotidiano
```

## Skill 4: `a11y-check`
**Trigger**: "valida accesibilidad", "check WCAG"
**Descripción**: Verifica contraste WCAG AA y etiquetas alt
**Output**: Reporte de problemas y sugerencias
**Ejemplo**:
```
/autoskills a11y-check
Archivo: src/pages/index.astro
Check: contraste texto/fondo, alt en imágenes, labels en formularios
```

## Skill 5: `mobile-optimize`
**Trigger**: "optimiza para móvil", "responsive"
**Descripción**: Adapta componentes para móvil (cards en vez de tablas)
**Output**: Versión responsive del componente
**Ejemplo**:
```
/autoskills mobile-optimize
Componente: Table.astro
Breakpoint: 640px
Transformación: tabla → cards apiladas
```

## Skill 6: `gh-pages-audit`
**Trigger**: "audita github pages", "revisa enlaces"
**Descripción**: Verifica enlaces absolutos, base path, 404
**Output**: Reporte de enlaces rotos y correcciones
**Ejemplo**:
```
/autoskills gh-pages-audit
Carpeta: dist/
Check: href absolutos, 404.html existe, base path en enlaces
```
```

---

## ✅ Checklist de Verificación (Fase C1)

```bash
# 1. Verificar Spec-Kit instalado
specify --version

# 2. Verificar AutoSkills instalado
npx autoskills --version

# 3. Verificar estructura .specify/
ls -la .specify/

# 4. Verificar estructura .autoskills/
ls -la .autoskills/

# 5. Verificar archivos de configuración
test -f .specify/constitution.md && echo "✓ Constitution existe" || echo "✗ FALTA Constitution"
test -f .specify/specifications.md && echo "✓ Specifications existe" || echo "✗ FALTA Specifications"
test -f .autoskills/skills.md && echo "✓ Skills existe" || echo "✗ FALTA Skills"
```

---

## 📁 Estructura Actualizada del Proyecto

```
ia-mercado-laboral/
├── .autoskills/
│   └── skills.md              # ← Skills personalizadas
├── .specify/
│   ├── constitution.md        # ← Reglas del proyecto
│   └── specifications.md      # ← Especificaciones detalladas
├── .github/
│   └── workflows/
│       └── deploy.yml         # ← Para GitHub Pages (fase C4)
├── public/
│   └── 404.html               # ← 404 para GH Pages
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Navigation.astro
│   │   ├── charts/
│   │   │   ├── BarChart.astro
│   │   │   └── DonutChart.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       └── DataSection.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── randstad-catalunya.json
│   │   ├── idescat-provincias.json
│   │   └── charts-config.json
│   └── utils/
│       ├── formatters.js
│       └── chart-helpers.js
├── astro.config.ts            # ← Base comentado para local
├── tailwind.config.js
├── DESIGN.md                  # ← Sistema de diseño
├── package.json
└── bun.lockb
```

---

## 🎯 Siguiente Paso: ¿Todo correcto hasta aquí?

Antes de avanzar a **C2 (Implementación con Spec-Kit)**, necesito que confirmes:

1. ✅ ¿Spec-Kit y AutoSkills están instalados sin errores?
2. ✅ ¿Los archivos `.specify/constitution.md` y `.specify/specifications.md` están creados?
3. ✅ ¿Las skills en `.autoskills/skills.md` están definidas?
4. ✅ ¿La estructura de carpetas coincide con lo planeado?

> 💡 **Recuerda**: Ahora Spec-Kit leerá `constitution.md` y `specifications.md` para generar UI consistente sin caer en clichés de IA.

**¿Seguimos con la implementación de componentes base usando Spec-Kit?** 🚀

specify init --here
C2 (Implementación con Spec-Kit), necesito que confirmes:

falta design.md en raiz tmabien antes continuar