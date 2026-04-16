# 🚀 FASE 5: Páginas (index.astro + fuentes.astro)

¡Perfecto! Avanzamos con la **Fase de Páginas**. Esta es la fase donde ensamblamos todos los componentes anteriores (Layouts, UI Base, Gráficas, Secciones) en las páginas finales.

---

## 📋 PASO 5.1: Página Principal (`index.astro`) - `/speckit.specify`

**Copia y pega en tu agente de IA (Copilot/Kilo):**

```
/speckit.specify

Crear página principal (landing page) que ensambla todas las secciones para el proyecto "IA y Mercado Laboral".

Estructura de la página:
1. Header con navegación (Navigation.astro)
2. Hero section (Hero.astro) - Título impactante + CTA a #datos
3. Datos clave España/Cataluña (DataSection.astro + gráficas)
4. Provincias Cataluña (ProvinceCards.astro) - 4 provincias orden fijo
5. Sectores más afectados (DataSection.astro + gráficas)
6. Footer minimalista (sin footer en móvil, botón "volver arriba")

Datos a cargar:
- src/data/randstad-catalunya.json
- src/data/idescat-provincias.json
- src/data/charts-config.json

Requisitos de diseño (DESIGN.md):
- Paleta Mediterráneo Urbano (terracota #C86405, verde #4A7C59, crema #F5F1E6)
- Tipografía Manrope (títulos) + Inter (cuerpo)
- Mobile-first: Menú hamburguesa en móvil (<640px)
- Sin footer en móvil, botón flotante "volver arriba" (>300px scroll)
- Accesibilidad WCAG AA (contraste 4.5:1, focus visible)

Requisitos técnicos:
- Layout: BaseLayout.astro
- Componentes: Hero.astro, DataSection.astro, ProvinceCards.astro, Navigation.astro
- Sin testing (no unit/integration/e2e tests)
- Archivos: './src/pages/index.astro'
- GitHub Pages: Usar Astro.url.pathname para enlaces

Skills a utilizar:
- astro (estructura de páginas)
- tailwind-css-patterns (responsive-design.md)
- accessibility-wcag (WCAG AA)
- frontend-design (UI no-IA)
```

---

## 📋 PASO 5.2: `/speckit.clarify` (Página Principal)

**Deja que Spec-Kit haga preguntas. Aquí tienes las respuestas basadas en DESIGN.md:**

```
/speckit.clarify

1. ¿La navegación debe incluir enlace a página de fuentes?
   → Respuesta: A) Sí, en header (enlace "Fuentes" visible en desktop y móvil)

2. ¿Las secciones deben tener IDs para anclas (#datos, #provincias)?
   → Respuesta: A) Sí, todas con IDs para navegación interna

3. ¿El botón "volver arriba" debe aparecer después de X px de scroll?
   → Respuesta: A) 300px (según DESIGN.md mobile-first)

4. ¿Incluir breadcrumbs o solo navegación principal?
   → Respuesta: A) Solo navegación principal (landing page única)
```

---

## 📋 PASO 5.3: `/speckit.plan` (Página Principal)

```
/speckit.plan

Planifica esto usando:
- Astro 6 + Tailwind 4 con @theme (ver DESIGN.md)
- Layout: BaseLayout.astro
- Componentes: Hero.astro, DataSection.astro, ProvinceCards.astro, Navigation.astro
- Datos: src/data/randstad-catalunya.json, src/data/idescat-provincias.json, src/data/charts-config.json
- Archivos: './src/pages/index.astro'
- Skills: astro, tailwind-css-patterns, accessibility-wcag, frontend-design
- GitHub Pages: Usar Astro.url.pathname para enlaces
- Mobile-first: Breakpoints <640px, 640-1024px, >1024px
- Sin testing (no unit/integration/e2e tests)
- Gestor: Bun
- Estructura de secciones con IDs para anclas (#inicio, #datos, #provincias, #sectores)
```

---

## 📋 PASO 5.4: `/speckit.tasks` → `/speckit.analyze` → `/speckit.implement`

```
/speckit.tasks
/speckit.analyze
/speckit.implement
```

---

## 📋 PASO 5.5: Página de Fuentes (`fuentes.astro`) - `/speckit.specify`

**Una vez completada index.astro, ejecuta:**

```
/speckit.specify

Crear página de fuentes y referencias del estudio "IA y Mercado Laboral".

Requisitos:
- que se vean los graficos
- Página accesible desde navegación principal (enlace "Fuentes" en header)
- Ruta: /fuentes (página dedicada, NO sección ancla)
- Tabla responsive: desktop (tabla clásica), mobile (cards apiladas)
- Columnas: 
  * Nombre del estudio (negrita, H3)
  * Tipo (económico/empleo/metodología)
  * Fuente (organismo: INE, OCDE, Universidad...)
  * Descripción (máximo 40 caracteres)
  * Enlace (formato markdown, abre en nueva pestaña target="_blank")
- Filtros opcionales por categoría (gubernamental, universidad, fundación)
- Datos cargados desde src/data/fuentes.json (8 fuentes mínimas)
- Diseño coherente con DESIGN.md (paleta terracota/verde/crema)
- Accesibilidad WCAG AA (contraste 4.5:1, focus visible)
- Iconos SVG por tipo de fuente (🏛️ gubernamental, 🎓 universidad, 🏢 fundación)
- Empty state: Si falla una fuente, mostrar mensaje amigable y mantener resto visible

Requisitos técnicos:
- Layout: BaseLayout.astro
- Componentes: Table.astro, Card.astro, Navigation.astro
- Sin testing (no unit/integration/e2e tests)
- Archivos: './src/pages/fuentes.astro'
- GitHub Pages: Usar Astro.url.pathname para enlaces

Skills a utilizar:
- astro (estructura de páginas)
- tailwind-css-patterns (referencias/responsive-design.md)
- frontend-design (UI no-IA, asimetría)
- accessibility-wcag (WCAG AA)
```

---

## 📋 PASO 5.6: `/speckit.clarify` (Página Fuentes)

```
/speckit.clarify

1. ¿Los filtros de categoría son obligatorios o opcionales?
   → Respuesta: B) Opcionales (toggle) para no sobrecargar móvil

2. ¿La página de fuentes debe tener su propia ruta (/fuentes) o ser sección ancla?
   → Respuesta: A) Ruta propia /fuentes (página dedicada)

3. ¿Los enlaces a fuentes deben abrir en misma pestaña o nueva pestaña?
   → Respuesta: B) Nueva pestaña (target="_blank") para no perder navegación

4. ¿Incluir año de publicación de cada fuente?
   → Respuesta: B) Sí (junto al nombre, formato "2024")
```

---

## 📋 PASO 5.7: `/speckit.plan` (Página Fuentes)

```
/speckit.plan

Planifica esto usando:
- Astro 6 + Tailwind 4 con @theme (ver DESIGN.md)
- Fuentes Manrope (títulos) + Inter (cuerpo) de Google Fonts
- No se necesitan pruebas (no unit/integration/e2e tests)
- Gestor de paquetes: Bun
- Datos en JSON: src/data/fuentes.json
- Archivos dentro de './src/pages/fuentes.astro'
- Utilizar skills del proyecto (.agents/skills/)
- Componentes reutilizables: Table.astro, Card.astro, Navigation.astro
- Configurar para GitHub Pages (base path dinámico con Astro.url)
- Accesibilidad: WCAG AA (contraste 4.5:1, focus visible, labels ARIA)
- Mobile-first: Breakpoints <640px (cards), >640px (tabla)
```

---

## 📋 PASO 5.8: `/speckit.tasks` → `/speckit.analyze` → `/speckit.implement`

```
/speckit.tasks
/speckit.analyze
/speckit.implement
```

---

## 📋 PASO 5.9: Build de Verificación (Fin de Fase)

**Después de /implement, ejecuta en PowerShell:**

```powershell
# Build de verificación (Fase 5 completada)
bun run build

# Verificar archivos críticos
Test-Path dist/index.html
Test-Path dist/fuentes/index.html
Test-Path dist/404.html

# Verificar componentes de páginas
Test-Path src/pages/index.astro
Test-Path src/pages/fuentes.astro
```

---

## ✅ Checklist de Verificación Post-Implementación

```markdown
## [ ] Página Principal (index.astro)
- [ ] Hero section con CTA a #datos
- [ ] DataSection con gráficas integradas
- [ ] ProvinceCards con 4 provincias (orden fijo)
- [ ] Navegación incluye enlace a Fuentes
- [ ] Botón "volver arriba" funcional (>300px scroll)
- [ ] IDs de sección para anclas (#inicio, #datos, #provincias, #sectores)

## [ ] Página de Fuentes (fuentes.astro)
- [ ] Ruta propia /fuentes (no sección ancla)
- [ ] Tabla responsive (desktop: tabla, mobile: cards)
- [ ] 8 fuentes mínimas de src/data/fuentes.json
- [ ] Enlaces abren en nueva pestaña (target="_blank")
- [ ] Filtros por categoría (opcionales)
- [ ] Empty state amigable si falla una fuente

## [ ] Accesibilidad (WCAG AA)
- [ ] Contraste 4.5:1 mínimo
- [ ] Focus visible en elementos interactivos
- [ ] Navegación por teclado funcional
- [ ] Labels ARIA en tablas/gráficas

## [ ] Build
- [ ] bun run build sin errores
- [ ] dist/index.html existe
- [ ] dist/fuentes/index.html existe
- [ ] dist/404.html existe
```

---

## 📊 Estado Actual del Plan

| Fase | Componente | Specify | Clarify | Plan | Tasks | Analyze | Implement | Build | Estado |
|------|------------|---------|---------|------|-------|---------|-----------|-------|--------|
| 1 | Constitution | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - | **COMPLETADO** |
| 2 | Layouts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **COMPLETADO** |
| 3 | UI Base | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **COMPLETADO** |
| 4 | Gráficas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **COMPLETADO** |
| 5 | Secciones | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **COMPLETADO** |
| **6** | **Páginas (index)** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **EN PROGRESO** |
| **7** | **Páginas (fuentes)** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **PENDIENTE** |

---

## ⚠️ Recordatorio Crítico: `astro.config.ts`

**Para producción (GitHub Pages), deberás cambiar:**

```typescript
// ❌ ACTUAL (desarrollo)
output: "server",
adapter: node({ mode: "standalone" }),

// ✅ PRODUCCIÓN (GitHub Pages)
output: "static",
// Sin adapter
site: 'https://<TU-USUARIO>.github.io',
base: '/ia-mercado-laboral',
```

**Esto se hace en la Fase de Deploy, NO ahora.**

---

## 🎯 ¿Listo para comenzar?

**Opciones:**
- **A)** Sí, ejecutar Paso 5.1 (`/speckit.specify` para index.astro) ahora
- **B)** Primero verificar que Secciones está completo
- **C)** Revisar algún archivo específico antes de continuar

**¿Cuál prefieres?** 🚀