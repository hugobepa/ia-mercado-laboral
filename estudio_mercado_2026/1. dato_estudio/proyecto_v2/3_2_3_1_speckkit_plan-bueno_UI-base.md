# 🚀 FASE 2: UI Base (Button, Card, Table, Navigation)

¡Perfecto! Empezamos con los componentes UI base. Estos son los cimientos visuales de toda la web, así que es crítico que queden bien desde el inicio.

---

## 📋 PASO 2.1: Ejecutar `/speckit.specify`

Copia y pega este comando en tu agente de IA (Copilot/Kilo):

```
/speckit.specify

Crear componentes UI base reutilizables para toda la web "IA y Mercado Laboral".

Componentes requeridos:
1. Button.astro - 3 variantes (primary, secondary, outline)
2. Card.astro - Base + Province + Data + Demographic variants
3. Table.astro - Desktop (tabla clásica) + Mobile (cards apiladas)
4. Navigation.astro - Desktop (header fijo) + Mobile (menú hamburguesa)

Requisitos de diseño (DESIGN.md):
- Bordes asimétricos: rounded-t-xl rounded-b-lg
- Sombras: Solo en hover (shadow-sm → shadow-md)
- Transiciones: duration-200
- Colores: Primary #C86405, Secondary #4A7C59, Neutral #F5F1E6, Text #2C2C2C
- Tipografía: Manrope (títulos), Inter (cuerpo)
- Mobile-first: Touch targets mín. 44x44px en móvil
- No parecer IA: evitar azules/lilas saturados, usar tonos tierra

Requisitos técnicos:
- Astro 6 + Tailwind 4 con @theme
- Sin testing (no unit/integration/e2e tests)
- Datos en JSON dentro del proyecto (src/data/)
- Archivos en './src/components/ui/'
- Configurar para GitHub Pages (base path dinámico)
- Accesibilidad WCAG AA: contraste 4.5:1, focus visible, labels ARIA

Skills a utilizar:
- tailwind-css-patterns (referencias/responsive-design.md)
- frontend-design (UI no-IA, asimetría, espacios orgánicos)
- accessibility-wcag (WCAG AA, focus visible, contraste)
- astro (estructura de componentes, slots, props)
```

---

## 📋 PASO 2.2: `/speckit.clarify` (IMPESCINDIBLE)

Deja que Spec-Kit haga preguntas. Cuando aparezcan, responde así:

```
/speckit.clarify

1. ¿Los botones deben incluir estados disabled y loading?
   → Respuesta: A) Sí, ambos estados (disabled con opacity-50, loading con spinner minimal)

2. ¿La navegación móvil debe ser drawer lateral o menú dropdown?
   → Respuesta: A) Drawer lateral desde la derecha con fondo neutral y backdrop blur

3. ¿Las cards deben incluir imagen opcional o solo contenido texto/datos?
   → Respuesta: B) Solo texto/datos (minimalismo tipográfico, sin imágenes genéricas)

4. ¿La tabla responsive debe convertir a cards en móvil o scroll horizontal?
   → Respuesta: A) Cards apiladas en móvil (<640px), tabla clásica en desktop
```

---

## 📋 PASO 2.3: `/speckit.plan`

Una vez aclaradas las dudas:

```
/speckit.plan

Planifica esto usando:
- Astro 6 + Tailwind 4 con @theme (ver DESIGN.md)
- Fuentes Manrope (títulos) + Inter (cuerpo) de Google Fonts
- No se necesitan pruebas (no unit/integration/e2e tests)
- Gestor de paquetes: Bun
- Archivos dentro de './src/components/ui/'
- Utilizar skills del proyecto (.agents/skills/)
- Configurar para GitHub Pages (base path dinámico con Astro.url)
- Especificar librerías por uso:
  * htmx para interacciones ligeras (menú hamburguesa, toggle)
- Accesibilidad: WCAG AA (contraste 4.5:1, focus visible, labels ARIA, skip links)
- Mobile-first: Breakpoints <640px (móvil), 640-1024px (tablet), >1024px (desktop)
- Estructura de archivos:
  * src/components/ui/Button.astro
  * src/components/ui/Card.astro
  * src/components/ui/Table.astro
  * src/components/ui/Navigation.astro
```

---

## 📋 PASO 2.4: `/speckit.tasks` → `/speckit.analyze` → `/speckit.implement`

```
/speckit.tasks
/speckit.analyze
/speckit.implement
```

---

## ✅ Checklist de Verificación Post-Implementación

Después de que Spec-Kit genere el código, verifica manualmente:

```powershell
# 1. Build local para detectar errores
bun run build

# 2. Verificar que los archivos existen
Test-Path src/components/ui/Button.astro
Test-Path src/components/ui/Card.astro
Test-Path src/components/ui/Table.astro
Test-Path src/components/ui/Navigation.astro

# 3. Verificar que no hay enlaces absolutos rotos
grep -r 'href="/[^/]' src/components/ui/ --include="*.astro" | grep -v 'http'

# 4. Test visual en localhost
bun run dev
# Abrir http://localhost:4321 y verificar:
# [ ] Botones tienen hover y focus visible
# [ ] Cards tienen bordes asimétricos (rounded-t-xl rounded-b-lg)
# [ ] Tabla se convierte en cards en móvil (<640px)
# [ ] Navegación móvil es drawer lateral funcional
# [ ] Contraste de colores cumple WCAG AA
```

---

## 🎯 ¿Listo para ejecutar?

**Opciones:**
- **A)** ✅ Sí, copio el comando `/speckit.specify` ahora y empiezo
- **B)** ⏳ Primero quiero revisar DESIGN.md para confirmar algún detalle
- **C)** ❓ Tengo una duda sobre algún requisito antes de continuar

**¿Cuál prefieres?** 🚀

*(Recomendación: Si todo está claro, ve con la opción A. El flujo Spec-Kit está diseñado para aclarar dudas en el paso `/clarify` si algo no queda definido).*