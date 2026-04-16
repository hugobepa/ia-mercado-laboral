# 🔄 Skills Corregidas con Formato AutoSkills Oficial

¡Perfecto! Tienes toda la razón. El formato debe seguir el **frontmatter YAML** oficial de AutoSkills. Voy a crear las 5 skills faltantes con el formato correcto.

---

## 📁 Skill 1: `charts-apexcharts`

Crea: `.agents/skills/charts-apexcharts/SKILL.md`

```markdown
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
```

---

## 📁 Skill 2: `github-pages-deploy`

Crea: `.agents/skills/github-pages-deploy/SKILL.md`

```markdown
---
name: github-pages-deploy
description: Configure GitHub Pages deployment for Astro 6 + Bun projects. Use this skill when the user needs to deploy static sites to GitHub Pages, configure base paths, fix broken links, or set up 404 pages. Produces production-ready deployment configs that handle subdirectory routing correctly.
license: Complete terms in LICENSE.txt
---

# Skill: github-pages-deploy

## Trigger
- "despliega a github pages"
- "configura deploy"
- "astro.config base path"
- "enlaces rotos github pages"

## Descripción
Configura despliegue a GitHub Pages para Astro 6 + Bun, manejando base path, 404 y enlaces.

## Output
- astro.config.ts con site/base correctos
- .github/workflows/deploy.yml para Bun
- public/404.html con detección de base path
- Componentes de navegación con Astro.url.pathname

## Ejemplo de uso
```ts
// astro.config.ts generado:
export default defineConfig({
  site: 'https://usuario.github.io',
  base: '/nombre-repo',
  output: 'static',
  trailingSlash: 'always',
});
```

## Restricciones
- NO usar enlaces absolutos internos (href="/ruta")
- SIEMPRE usar new URL(href, Astro.url).pathname
- public/404.html debe existir en raíz del build
- trailingSlash: 'always' es OBLIGATORIO
```

---

## 📁 Skill 3: `htmx-interactions`

Crea: `.agents/skills/htmx-interactions/SKILL.md`

```markdown
---
name: htmx-interactions
description: Add lightweight dynamic interactions using HTMX 2+ in Astro components. Use this skill when the user needs dynamic content loading, form submissions, or interactive elements without React islands. Produces accessible, progressive-enhancement-friendly code with proper loading states.
license: Complete terms in LICENSE.txt
---

# Skill: htmx-interactions

## Trigger
- "añade interacción con htmx"
- "carga dinámica de contenido"
- "formulario con htmx"
- "sin react islands"

## Descripción
Añade interacciones dinámicas ligeras con HTMX 2+ en componentes Astro, sin islands React innecesarias.

## Output
- Atributos hx-* correctos (hx-get, hx-target, hx-swap)
- Endpoints Astro API para responder a requests HTMX
- Loading states y error handling básico

## Ejemplo de uso
```astro
<!-- Componente con HTMX -->
<button 
  hx-get="/api/provincia-data"
  hx-target="#data-container"
  hx-swap="innerHTML"
  class="btn-primary"
>
  Cargar datos de Cataluña
</button>
<div id="data-container"></div>
```

## Restricciones
- NO usar React islands para interacciones simples
- SIEMPRE incluir fallback para JS deshabilitado
- hx-trigger por defecto: 'click'
- Loading state con skeleton o spinner mínimo
```

---

## 📁 Skill 4: `performance-web`

Crea: `.agents/skills/performance-web/SKILL.md`

```markdown
---
name: performance-web
description: Optimize Astro components for Core Web Vitals (LCP, FID, CLS). Use this skill when the user needs performance improvements, image optimization, lazy loading, or CSS/JS bundling. Produces mobile-first, accessibility-compliant optimizations that improve page speed scores.
license: Complete terms in LICENSE.txt
---

# Skill: performance-web

## Trigger
- "optimiza rendimiento"
- "core web vitals"
- "lazy load imágenes"
- "mejora page speed"

## Descripción
Optimiza componentes Astro para Core Web Vitals: LCP, FID, CLS. Enfocado en móvil.

## Output
- Imágenes con loading="lazy" y sizes responsive
- CSS crítico inline, resto diferido
- Fonts con font-display: swap
- Código JS dividido por ruta

## Ejemplo de uso
```astro
<!-- Imagen optimizada -->
<img 
  src="/hero-mobile.jpg"
  srcset="/hero-mobile.jpg 400w, /hero-tablet.jpg 768w, /hero-desktop.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
  alt="Descripción accesible"
  loading="lazy"
  width="1200"
  height="630"
  class="rounded-t-xl"
/>
```

## Restricciones
- NO cargar fonts sin font-display: swap
- NO imágenes sin width/height (evita CLS)
- SIEMPRE lazy load para imágenes below-the-fold
- Máximo 100KB CSS crítico por página
```

---

## 📁 Skill 5: `accessibility-wcag`

Crea: `.agents/skills/accessibility-wcag/SKILL.md`

```markdown
---
name: accessibility-wcag
description: Validate and fix components for WCAG 2.2 AA compliance. Use this skill when the user needs accessibility audits, contrast checks, ARIA labels, or keyboard navigation. Produces inclusive, accessible code that works with screen readers and assistive technologies.
license: Complete terms in LICENSE.txt
---

# Skill: accessibility-wcag

## Trigger
- "valida accesibilidad"
- "WCAG AA"
- "alt text imágenes"
- "navegación teclado"

## Descripción
Valida y corrige componentes para cumplir WCAG 2.2 AA: contraste, navegación teclado, ARIA labels.

## Output
- Contraste mínimo 4.5:1 para texto normal
- Focus visible en elementos interactivos
- Alt text descriptivo en imágenes
- Labels asociados a inputs

## Ejemplo de uso
```astro
<!-- Input accesible -->
<label for="search" class="sr-only">Buscar estudios</label>
<input 
  id="search"
  type="search"
  placeholder="Buscar..."
  class="border border-neutral-dark rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
/>
```

## Restricciones
- NO usar color como único indicador de estado
- SIEMPRE incluir skip link para contenido principal
- Touch targets mín. 44x44px en móvil
- ARIA labels solo cuando el texto visible no es suficiente
```

---

## ✅ Script PowerShell para Crear Todas las Skills

Copia y ejecuta en PowerShell:

```powershell
# Crear carpetas de skills
$skills = @('charts-apexcharts', 'github-pages-deploy', 'htmx-interactions', 'performance-web', 'accessibility-wcag')

foreach ($skill in $skills) {
  $path = ".agents/skills/$skill"
  New-Item -Path $path -ItemType Directory -Force
  Write-Host "✓ Creada carpeta: $path" -ForegroundColor Green
}

# Verificar estructura
Write-Host "`n📋 Skills creadas:" -ForegroundColor Cyan
Get-ChildItem -Path ".agents/skills" -Directory | ForEach-Object {
  Write-Host "  • $($_.Name)"
}

# Verificar que el formato frontmatter es correcto
Write-Host "`n🔍 Verificando formato frontmatter..." -ForegroundColor Cyan
foreach ($skill in $skills) {
  $path = ".agents/skills/$skill/SKILL.md"
  if (Test-Path $path) {
    $content = Get-Content $path -Raw
    if ($content -match "^---" -and $content -match "name:" -and $content -match "description:" -and $content -match "license:") {
      Write-Host "  ✓ $skill: formato válido" -ForegroundColor Green
    } else {
      Write-Host "  ✗ $skill: formato INCORRECTO" -ForegroundColor Red
    }
  }
}
```

---

## 📁 Estructura Final de Skills

```
.agents/skills/
├── accessibility-wcag/
│   └── SKILL.md          # ← Formato frontmatter correcto
├── astro/
│   └── SKILL.md          # ✅ Ya existía
├── bun/
│   └── SKILL.md          # ✅ Ya existía
├── charts-apexcharts/
│   └── SKILL.md          # ← NUEVA
├── frontend-design/
│   ├── LICENSE.txt       # ✅ Ya existía
│   └── SKILL.md          # ✅ Ya existía
├── github-pages-deploy/
│   └── SKILL.md          # ← NUEVA
├── htmx-interactions/
│   └── SKILL.md          # ← NUEVA
├── performance-web/
│   └── SKILL.md          # ← NUEVA
├── seo/
│   └── SKILL.md          # ✅ Ya existía
├── speckit-git-commit/
│   └── SKILL.md          # ✅ Ya existía
├── speckit-git-feature/
│   └── SKILL.md          # ✅ Ya existía
├── speckit-git-initialize/
│   └── SKILL.md          # ✅ Ya existía
├── speckit-git-remote/
│   └── SKILL.md          # ✅ Ya existía
├── speckit-git-validate/
│   └── SKILL.md          # ✅ Ya existía
├── tailwind-css-patterns/
│   └── SKILL.md          # ✅ Ya existía
└── typescript-advanced-types/
    └── SKILL.md          # ✅ Ya existía
```

---

## 🔄 Verificación Final

```powershell
# 1. Reiniciar terminal para que AutoSkills detecte las nuevas skills
# 2. Verificar que Spec-Kit puede leer las skills
specify --version

# 3. Probar una skill
/specify
"Crear componente de gráfica de barras con datos de Randstad"

# Debería usar la skill 'charts-apexcharts' automáticamente
```

---

## 🎯 ¿Seguimos con Spec-Kit?

Ahora que las skills tienen el **formato oficial correcto**, podemos:

1. ✅ **Ejecutar Spec-Kit** para crear el primer componente (Hero section)
2. ✅ **Verificar que AutoSkills detecta las nuevas skills**
3. ✅ **Hacer build local** para confirmar que todo funciona

**¿Por cuál empezamos?** 🚀