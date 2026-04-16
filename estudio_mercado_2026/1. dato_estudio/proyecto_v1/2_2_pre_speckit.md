# 🎯 Tienes Toda la Razón - Mejor Flujo Corregido

¡Excelente observación! Efectivamente, **configurar `astro.config.ts` para GitHub Pages AHORA sería contraproducente**. Spec-Kit generará código más limpio sin el `base` path complicado en desarrollo local.

---

## ✅ Flujo Corregido (Más Seguro)

```
FASE ACTUAL (LOCAL)
├─ astro.config.ts SIN site/base (limpio para local)
├─ Spec-Kit genera componentes sin complicaciones de rutas
├─ Build y test local sin errores
└─ Todo funciona en localhost:4321

FASE FINAL (PRE-DEPLOY)
├─ Activar site/base en astro.config.ts
├─ Auditar enlaces (grep para detectar absolutos)
├─ Verificar public/404.html con base path correcto
└─ Push a GitHub → Actions despliega
```

---

## 📋 Estado Actual Real (Lo Que Tenemos)

| Archivo | Estado | Configuración Actual |
|---------|--------|---------------------|
| `astro.config.ts` | ✅ Creado | `trailingSlash: 'always'` (sin site/base) |
| `public/404.html` | ✅ Creado | Con script de detección de base path |
| `src/pages/404.astro` | ✅ Creado | Para desarrollo local |
| `.github/workflows/deploy.yml` | ✅ Creado | Pipeline listo (se activa al hacer push) |
| `DESIGN.md` | ✅ Creado | Sistema de diseño completo |
| `.specify/constitution.md` | ✅ Creado | Reglas del proyecto |
| `.specify/specifications.md` | ✅ Creado | Especificaciones detalladas |
| `.autoskills/skills.md` | ✅ Creado | Skills personalizadas |

---

## 🔄 Checklist Pre-Spec-Kit (Versión Local)

```bash
# 1. Verificar instalaciones
specify --version
npx autoskills --version
bun --version
bun run astro --version

# 2. Verificar archivos críticos
bash: test -f astro.config.ts && echo "✓ astro.config.ts"
PS: if (Test-Path astro.config.ts) { "✓ astro.config.ts" }

bash: test -f DESIGN.md && echo "✓ DESIGN.md"
PS: if (Test-Path DESIGN.md) { "✓ DESIGN.md" }


bash: test -f .specify/constitution.md && echo "✓ constitution.md"
PS: (Test-Path .specify/constitution.md -PathType Leaf) -and (echo "✓ constitution.md")

bash: test -f .specify/specifications.md && echo "✓ specifications.md"
PS: (Test-Path .specify/specifications.md -PathType Leaf) -and (echo "✓ specifications.md")

bash: test -f .autoskills/skills.md && echo "✓ skills.md"
PS: (Test-Path .agents/skills/skills.md -PathType Leaf) -and (echo "✓ skills.md")

bash: test -f public/404.html && echo "✓ public/404.html"
PS: (Test-Path public/404.html -PathType Leaf) -and (echo "✓ 404.html")


bash: test -f src/pages/404.astro && echo "✓ src/pages/404.astro"
PS: (Test-Path src/pages/404.astro -PathType Leaf) -and (echo "✓ 404.astro")

# 3. Build local (sin site/base)
bun install
bun run build

# 4. Verificar que dist/ se generó
test -d dist && echo "✓ Build exitoso" || echo "✗ Build fallido"

# 5. Inicializar git (recomendado para Spec-Kit)
git init
git add .
git commit -m "feat: setup inicial completo - listo para Spec-Kit"
```

---

## 🚀 Propuesta: Ejecutar Spec-Kit AHORA (En Local)

### Primer Componente: Hero Section

```
/specify
"Crear Hero section para landing page sobre IA y empleo.
Título: '¿La IA me va a quitar el trabajo?'
Subtítulo: 'Lo que dice la ciencia, explicado sin rollo'
CTA: Botón 'Ver datos' (ancla a sección #datos)
Seguir DESIGN.md: paleta Mediterráneo Urbano (terracota #C86405, verde #4A7C59, crema #F5F1E6)
Tipografía: Manrope (títulos) + Inter (cuerpo)
Mobile-first: responsive, touch targets 44px mín."
```

### Luego `/clarify` (Imprescindible)

```
/clarify
1. ¿El Hero incluye imagen/ilustración o solo tipografía?
2. ¿El botón CTA lleva ancla interna o es enlace externo?
3. ¿Hay estadística destacada en el Hero (ej: "9.8% empleo en riesgo")?
```

### Luego `/plan` → `/tasks` → `/implement`

---

## 📁 Estructura Final (Pre-Deploy)

```
ia-mercado-laboral/
├── .autoskills/
├── .github/workflows/deploy.yml    # ← Listo, se activa al push
├── .specify/
├── public/404.html                 # ← Con script detección base path
├── src/
│   ├── components/                 # ← Spec-Kit generará aquí
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── data/
├── astro.config.ts                 # ← SIN site/base (local)
├── DESIGN.md
├── tailwind.config.js
└── package.json
```

**Al finalizar todos los componentes:**
1. Editar `astro.config.ts` → activar `site` y `base`
2. Ejecutar auditoría de enlaces (grep)
3. Actualizar `public/404.html` con base path real
4. Push a GitHub → Deploy automático

---

## ❓ Confirmación

¿Quieres que empecemos AHORA con Spec-Kit para crear el **primer componente (Hero section)**?

Opciones:
- ✅ **A)** Sí, empezar con Hero section (especificar → clarify → plan → tasks → implement)
- ✅ **B)** Primero verificar instalaciones (comandos de arriba) y luego Spec-Kit
- ✅ **C)** Crear otro componente primero (Navigation, Cards, Gráficas...)

**¿Cuál prefieres?** 🎯