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
