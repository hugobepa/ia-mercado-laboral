# 🚀 FASE 1.2: Layouts - Prompt `/speckit.specify`

Perfecto. Constitution está completado ✅. Ahora vamos con el **Layout Base**.

---

## 📋 PROMPT 1.2: `/speckit.specify` (Layouts)

**Copia y pega esto en tu agente de IA (Copilot/Kilo):**

```
/speckit.specify

Crear layout base (BaseLayout.astro) para toda la web.

Requisitos:
- Estructura HTML5 semántica con lang="es"
- Importar fuentes Google Fonts (Manrope + Inter) desde DESIGN.md
- Incluir slot para contenido principal
- Header fijo con navegación (desktop) y menú hamburguesa (móvil)
- Botón flotante "Volver arriba" visible al hacer scroll (solo móvil)
- Sin footer en móvil (según DESIGN.md)
- Accesibilidad WCAG AA (contraste 4.5:1, focus visible)
- Usar variables CSS de global.css para colores

Datos:
- El menú de navegación debe ser configurable (prop o constante)
- Links iniciales: Inicio, Datos, Provincias, Fuentes

Skills a utilizar:
- astro (estructura de layouts)
- tailwind-css-patterns (referencias/responsive-design.md)
- frontend-design (UI no-IA, asimetría)
- accessibility-wcag (WCAG AA)
```

---

## ⏭️ SIGUIENTE PASO (Después de que Spec-Kit responda)

Una vez Spec-Kit genere la especificación, **NO ejecutes `/plan` todavía**. Primero viene:

**Paso 1.3: `/speckit.clarify`** (Imprescindible según `creacion_proyecto_speckit.md`)

Spec-Kit debería hacerte preguntas de aclaración. Si no las hace automáticamente, usa este prompt:

```
/speckit.clarify

1. ¿El header debe ser sticky o fixed?
   Respuesta: Fixed (según DESIGN.md navegación desktop)

2. ¿Qué breakpoints para móvil/tablet/desktop?
   Respuesta: Mobile <640px, Tablet 640-1024px, Desktop >1024px (según DESIGN.md)

3. ¿Incluir logo o solo texto?
   Respuesta: Texto con tipografía Manrope (según DESIGN.md)

4. ¿El botón "volver arriba" debe aparecer después de X px de scroll?
   Respuesta: Sí, después de 300px de scroll (mobile-first)
```

---

## 📊 CHECKLIST DE SEGUIMIENTO

| Componente | Specify | Clarify | Plan | Tasks | Implement | Estado |
|------------|---------|---------|------|-------|-----------|--------|
| 1. Constitution | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETADO |
| 1.1 proyecto_base | ✅ | ✅ | ✅ | ✅ | ✅ | COMPLETADO |
| **2. Layouts** | **⏳ AHORA** | ⏳ |  | ⏳ |  | **EN PROGRESO** |
| 3. UI Base | ⏳ | | ⏳ | | ⏳ | Pendiente |
| 4. Gráficas | ⏳ | | ⏳ | | ⏳ | Pendiente |
| 5. Secciones | ⏳ |  | ⏳ |  | ⏳ | Pendiente |
| 6. Páginas | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pendiente |
| 7. Fuentes | ⏳ |  | ⏳ |  | ⏳ | Pendiente |

---

## ⚠️ REGLAS (Según `3_2_0_.speckkit_plan-bueno.md`)

1. **NO repetir `/speckit.constitution`** → Solo una vez al inicio (ya hecho)
2. **SIEMPRE `/speckit.clarify` antes de `/plan`** → Imprescindible
3. **`/speckit.analyze` antes de `/implement`** → Control de calidad
4. **Build solo al final de la FASE** → No después de cada componente

---

**¿Ejecutas el prompt de `/speckit.specify` ahora y me confirmas cuando Spec-Kit responda?** 🚀

Luego continuamos con `/speckit.clarify` → `/plan` → `/tasks` → `/analyze` → `/implement` → **Build** ✅