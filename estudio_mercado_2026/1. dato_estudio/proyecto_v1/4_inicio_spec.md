# 📋 Recapitulación Completa + Adaptación al Flujo Spec-Kit
C:\Users\User\Documents\programacion2025\prueba\spec_drive\ia-mercado-laboral
C:\Users\User\Documents\curro2026\estudio_mercado_2026\1. dato_estudio
C:\Users\User\Documents\curro2026\estudio_mercado_2026

0. specify init --here
1. guadar constitucion.md:
	- '.specify/'
	- '.specify/memorize'
2. guardar specify:
	- '.sepicify/'
3.guardar 'DESIGN.md':
	- raiz proyecto


He revisado las líneas 4-13 y 29+ del documento `creacion_proyecto_speckit.md`. Vamos a **adaptar todo el proceso** al flujo oficial de Spec-Kit, integrando nuestras **15 skills configuradas**.

---

## 🎯 Estado Actual del Proyecto

| Elemento | Estado | Notas |
|----------|--------|-------|
| **Skills** | ✅ 15 skills en `.agents/skills/` | Listas para usar |
| **Astro + Tailwind + Bun** | ✅ Configurado | Build funciona |
| **DESIGN.md** | ✅ Creado | Paleta "Mediterráneo Urbano" |
| **deploy.yml** | ✅ Creado | Workflow corregido |
| **404 Pages** | ✅ `public/404.html` + `src/pages/404.astro` | Listas |
| **Layouts** | ✅ `BaseLayout.astro` + `PageLayout.astro` | Creados |
| **Datos** | ✅ JSON Randstad + Idescat | En `src/data/` |
| **Git** | ❌ NO inicializado | **Pendiente** |
| **Spec-Kit** | ❌ NO inicializado | **Pendiente** |
| **Constitution** | ❌ NO creada | **Pendiente** |

---

## 🚀 Flujo Spec-Kit Adaptado (Según `creacion_proyecto_speckit.md`)

### **FASE 0: Instalación de Spec-Kit** (Líneas 4-13 del documento)

```powershell
# 1. Instalar UV (gestor de paquetes Python rápido)
winget install astral-sh.uv

# 2. Verificar UV instalado
uv --version

# 3. Instalar Spec-Kit con UV (one-time)
uvx --from git+https://github.com/github/spec-kit.git specify init --here

# 4. Verificar Spec-Kit instalado
specify --version
specify --help

# 5. Inicializar Git (OBLIGATORIO para Spec-Kit)
git init
git branch -M main

# 6. Crear .gitignore (si no existe)
@"
node_modules
dist
.DS_Store
*.log
.env
.vscode
.agents/.cache
"@ | Out-File -FilePath ".gitignore" -Encoding utf8

# 7. Primer commit
git add .
git commit -m "feat: setup inicial - skills + config + 404 + DESIGN.md"
```

---

### **FASE 1: Crear Constitución** (Líneas 29-41 del documento)

Crear `.specify/constitution.md` con este contenido:
specify init --here 
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

---

**Última actualización**: Fase 1 - Setup Inicial
**Versión**: 1.0
**Estado**: ✅ Activo
```

---

### **FASE 2: Primer Componente con Spec-Kit** (Líneas 42-80+)

#### **Paso 1: /specify** (Definir qué construir)

```
/specify
Crear Hero section para landing page sobre IA y empleo en Cataluña.

Requisitos:
- Título: "¿La IA me va a quitar el trabajo?"
- Subtítulo: "Datos Randstad 2024 - Explicado sin rollo"
- 3 cifras destacadas: Ocupados (3.84M), Riesgo (9.8%), Mejora (15.9%)
- CTA botón: "Ver datos completos" (ancla a #datos)
- Seguir DESIGN.md: paleta Mediterráneo Urbano
- Mobile-first, responsive
- Sin React islands (es estático)

Skills a utilizar:
- astro (estructura de componentes)
- tailwind-css-patterns (estilos responsive)
- frontend-design (UI no-IA)
- accessibility-wcag (contraste, focus visible)
- performance-web (optimización móvil)
```

---

#### **Paso 2: /clarify** (Imprescindible - Línea 52 del documento)

```
/clarify
1. ¿El Hero incluye imagen/ilustración o solo tipografía?
   Opciones: A) Solo tipografía, B) Icono SVG simple, C) Ilustración completa

2. ¿Las cifras van en cards separadas o inline?
   Opciones: A) 3 cards horizontales, B) 3 columnas inline, C) Grid 2+1

3. ¿El CTA lleva ancla interna o es enlace externo?
   Opciones: A) Ancla a #datos (misma página), B) Enlace a otra página, C) Scroll suave

4. ¿Qué breakpoint priorizamos para mobile?
   Opciones: A) <640px, B) <768px, C) <1024px
```

---

#### **Paso 3: /plan** (Plan técnico - Líneas 56-68 del documento)

```
/plan
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
- Configurar para GitHub Pages (base path dinámico)
- Especificar librerías por uso:
  * apexcharts para gráficas
  * htmx para interacciones ligeras
```

---

#### **Paso 4: /tasks** (Lista de tareas accionables)

```
/tasks
```

Spec-Kit generará una lista como:
```
- [ ] Crear src/components/sections/Hero.astro
- [ ] Añadir datos de cifras en src/data/randstad-catalunya.json
- [ ] Implementar responsive con Tailwind breakpoints
- [ ] Validar contraste WCAG AA
- [ ] Optimizar imágenes para mobile (lazy load)
- [ ] Test manual en localhost:4321
```

---

#### **Paso 5: /analyze** (Opcional - Línea 11 del documento)

```
/analyze
Verificar consistencia entre:
- DESIGN.md (paleta, tipografía)
- constitution.md (principios rectores)
- skills disponibles (.agents/skills/)
- estructura de carpetas (src/)
```

---

#### **Paso 6: /implement** (Ejecutar todas las tareas - Línea 13 del documento)

```
/implement
```

Spec-Kit ejecutará todas las tareas del /tasks automáticamente.

---

### **FASE 3: Añadir Nuevos Elementos** (Líneas 80+ del documento)

Para cada nuevo componente, repetir el flujo:

```
/specify
[nombre del componente] - [descripción detallada]

/clarify
[preguntas específicas sobre implementación]

/plan
[stack técnico + skills a utilizar]

/tasks
[generar lista de tareas]

/analyze
[verificar consistencia]

/implement
[ejecutar tareas]
```

---

### **FASE 4: Git Commits con Skills** (Skills speckit-git-*)

Para cada commit importante, usar las skills de Git:

```powershell
# Skill: speckit-git-commit
git add .
git commit -m "feat: Hero section implementado

- Componente Hero.astro creado
- Cifras Randstad integradas
- Responsive mobile-first
- WCAG AA validado"

# Skill: speckit-git-feature (para features grandes)
git checkout -b feature/hero-section
# ... trabajar ...
git add .
git commit -m "feat: Hero section completo"
git checkout main
git merge feature/hero-section

# Skill: speckit-git-validate (antes de push)
git status
git diff --cached
```

---

## 📋 Checklist de Implementación (Adaptado del documento)

```markdown
## [ ] Fase 0: Instalación
- [ ] UV instalado (winget install astral-sh.uv)
- [ ] Spec-Kit instalado (uvx --from git+... specify init --here)
- [ ] Git inicializado (git init + git branch -M main)
- [ ] .gitignore creado

## [ ] Fase 1: Constitución
- [ ] .specify/constitution.md creado
- [ ] DESIGN.md verificado
- [ ] Skills verificadas (.agents/skills/)

## [ ] Fase 2: Primer Componente (Hero)
- [ ] /specify ejecutado
- [ ] /clarify ejecutado (imprescindible)
- [ ] /plan ejecutado
- [ ] /tasks generado
- [ ] /analyze ejecutado (opcional)
- [ ] /implement ejecutado

## [ ] Fase 3: Git
- [ ] speckit-git-commit usado
- [ ] speckit-git-validate antes de push
- [ ] Primer commit hecho

## [ ] Fase 4: Verificación
- [ ] bun run build funciona
- [ ] Test manual en localhost:4321
- [ ] Accesibilidad validada (WCAG AA)
```

---

## 🎯 Skills Disponibles para Referenciar en Prompts

```
.agents/skills/
├── astro/                      ✅ Para estructura Astro
├── bun/                        ✅ Para comandos Bun
├── charts-apexcharts/          ✅ Para gráficas
├── frontend-design/            ✅ Para UI no-IA
├── github-pages-deploy/        ✅ Para deploy GH Pages
├── htmx-interactions/          ✅ Para interacciones ligeras
├── performance-web/            ✅ Para Core Web Vitals
├── accessibility-wcag/         ✅ Para WCAG AA
├── seo/                        ✅ Para SEO
├── speckit-git-commit/         ✅ Para commits
├── speckit-git-feature/        ✅ Para features
├── speckit-git-initialize/     ✅ Para init git
├── speckit-git-remote/         ✅ Para remote
├── speckit-git-validate/       ✅ Para validar antes de push
├── tailwind-css-patterns/      ✅ Para Tailwind (con references/)
└── typescript-advanced-types/  ✅ Para TypeScript
```

---

## 🚀 ¿Empezamos Ahora?

**Orden exacto a seguir:**

1. ✅ **Ejecutar Fase 0** (Instalación UV + Spec-Kit + Git)
2. ✅ **Crear Fase 1** (.specify/constitution.md)
3. ✅ **Ejecutar Fase 2** (/specify → /clarify → /plan → /tasks → /implement)
4. ✅ **Fase 3** (Git commit con speckit-git-*)
5. ✅ **Fase 4** (Verificación build + test manual)

**¿Quieres que empecemos con la Fase 0 (instalación) ahora?** 🎯