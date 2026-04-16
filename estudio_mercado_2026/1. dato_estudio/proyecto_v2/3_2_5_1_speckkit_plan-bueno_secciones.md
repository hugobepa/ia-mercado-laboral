# 🚀 FASE 4: Secciones de Página (Hero, DataSection, ProvinceCards)

¡Perfecto! Avanzamos con la **Fase 4: Secciones**. Estas secciones ensamblan todos los componentes anteriores (Layouts, UI Base, Gráficas) con los datos JSON.

---

## 📋 PASO 4.1: `/speckit.specify` (Secciones)

**Copia y pega en tu agente de IA (Copilot/Kilo):**

```
/speckit.specify

Crear secciones de página reutilizables para la landing page "IA y Mercado Laboral".

Secciones requeridas:
1. Hero.astro - Título impactante + subtítulo coloquial + CTA botón
2. DataSection.astro - Datos clave Randstad/Idescat con gráficas integradas
3. ProvinceCards.astro - Cards de 4 provincias (Barcelona, Girona, Lleida, Tarragona)

Datos a utilizar:
- src/data/randstad-catalunya.json (cifras_clave_catalunya_2033, sectores_catalunya_mas_afectados)
- src/data/idescat-provincias.json (provincias array con ejemplos cotidianos)
- src/data/charts-config.json (configuración de gráficas)

Requisitos de diseño (DESIGN.md):
- Paleta: Terracota #C86405, Verde #4A7C59, Crema #F5F1E6
- Tipografía: Manrope (títulos), Inter (cuerpo)
- Bordes asimétricos: rounded-t-xl rounded-b-lg
- Mobile-first: 1 columna móvil, 2 tablet, 3 desktop
- Sin footer en móvil, botón flotante "volver arriba"
- Accesibilidad WCAG AA (contraste 4.5:1, focus visible)

Requisitos técnicos:
- Astro 6 + Tailwind 4 con @theme
- Componentes reutilizables: Button.astro, Card.astro, BarChart.astro, DonutChart.astro
- Sin testing (no unit/integration/e2e tests)
- Archivos en './src/components/sections/'
- Configurar para GitHub Pages (base path dinámico)

Skills a utilizar:
- astro (estructura de secciones)
- tailwind-css-patterns (referencias/responsive-design.md)
- frontend-design (UI no-IA, asimetría)
- accessibility-wcag (contraste, focus, labels)
```

---

## 📋 PASO 4.2: `/speckit.clarify` (IMPESCINDIBLE)

**Deja que Spec-Kit haga preguntas. Aquí tienes las respuestas basadas en DESIGN.md:**

```
/speckit.clarify

1. ¿El Hero debe incluir imagen/ilustración o solo tipografía?
   → Respuesta: A) Solo tipografía (minimalismo tipográfico, sin imágenes genéricas de IA)

2. ¿Las province cards deben mostrar todas las provincias o filtrables?
   → Respuesta: A) Todas visibles (4 provincias, grid responsive 1-2-3 columnas)

3. ¿DataSection incluye gráficas integradas o referencias a componentes charts?
   → Respuesta: A) Componentes charts integrados (BarChart.astro, DonutChart.astro)

4. ¿Los ejemplos cotidianos en cards deben ser tooltip o texto visible?
   → Respuesta: A) Texto visible siempre (accesibilidad, sin hover en móvil)
```

---

## 📋 PASO 4.3: `/speckit.plan`

```
/speckit.plan

Planifica esto usando:
- Astro 6 + Tailwind 4 con @theme (ver DESIGN.md)
- Datos desde src/data/randstad-catalunya.json y src/data/idescat-provincias.json
- Archivos en './src/components/sections/'
- Utilizar skills: astro, tailwind-css-patterns, frontend-design, accessibility-wcag
- Componentes reutilizables: Button.astro, Card.astro, BarChart.astro, DonutChart.astro
- Configurar para GitHub Pages (base path dinámico con Astro.url)
- Mobile-first: Breakpoints <640px, 640-1024px, >1024px
- Sin testing (no unit/integration/e2e tests)
- Gestor: Bun
- Estructura de archivos:
  * src/components/sections/Hero.astro
  * src/components/sections/DataSection.astro
  * src/components/sections/ProvinceCards.astro
```

---

## 📋 PASO 4.4: `/speckit.tasks` → `/speckit.analyze`

```
/speckit.tasks
/speckit.analyze
```

---

## 📋 PASO 4.5: `/speckit.implement`

```
/speckit.implement
```

---

## 📋 PASO 4.6: Build de Verificación (Fin de Fase)

**Después de /implement, ejecuta en PowerShell:**

```powershell
# Build de verificación (Fase 4 completada)
bun run build

# Verificar archivos críticos
Test-Path dist/index.html
Test-Path dist/404.html

# Verificar componentes de secciones
Test-Path src/components/sections/Hero.astro
Test-Path src/components/sections/DataSection.astro
Test-Path src/components/sections/ProvinceCards.astro
```

---

## ✅ Checklist de Verificación Post-Implementación

```markdown
## [ ] Componentes Creados
- [ ] Hero.astro existe en src/components/sections/
- [ ] DataSection.astro existe en src/components/sections/
- [ ] ProvinceCards.astro existe en src/components/sections/

## [ ] Datos Integrados
- [ ] randstad-catalunya.json se importa correctamente
- [ ] idescat-provincias.json se importa correctamente
- [ ] charts-config.json se usa en gráficas

## [ ] Diseño (DESIGN.md)
- [ ] Paleta: #C86405, #4A7C59, #F5F1E6
- [ ] Bordes asimétricos: rounded-t-xl rounded-b-lg
- [ ] Mobile-first: 1 columna móvil, 2 tablet, 3 desktop
- [ ] Ejemplos cotidianos visibles (no tooltip)

## [ ] Accesibilidad (WCAG AA)
- [ ] Contraste 4.5:1 mínimo
- [ ] Focus visible en elementos interactivos
- [ ] Labels ARIA en gráficas
- [ ] Alt text en elementos visuales

## [ ] Build
- [ ] bun run build sin errores
- [ ] dist/index.html existe
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
| **5** | **Secciones** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **⏳** | **EN PROGRESO** |
| 6 | Páginas (index) | ⏳ |  | ⏳ |  | ⏳ |  | ⏳ | Pendiente |
| 7 | Páginas (fuentes) | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pendiente |

---

## ⚠️ Recordatorios Críticos (Según `3_1.chequeo_speckit.md`)

1. **Build solo al final de la FASE** → No después de cada componente
2. **SIEMPRE `/speckit.clarify` antes de `/plan`** → Evita suposiciones
3. **`/speckit.analyze` antes de `/implement`** → Control de calidad
4. **Referenciar DESIGN.md en cada comando** → Consistencia visual

---

## 🎯 ¿Listo para comenzar?

**Opciones:**
- **A)** Sí, ejecutar Paso 4.1 (`/speckit.specify`) ahora
- **B)** Primero verificar que Gráficas está completo
- **C)** Revisar algún archivo específico antes de continuar

**¿Cuál prefieres?** 🚀