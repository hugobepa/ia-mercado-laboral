# 📊 Revisión de Estructura Actual

Perfecto, veo tu estructura. Déjame hacer un **análisis rápido** y los ajustes necesarios antes de continuar.

---

## ✅ Lo que está BIEN

1. **Skills configuradas** → Tienes las 15 skills necesarias en `.agents/skills/`
2. **Archivos de datos** → `randstad-catalunya.json` e `idescat-provincias.json` en `src/data/`
3. **Layouts** → `BaseLayout.astro` y `PageLayout.astro` creados
4. **Páginas** → `index.astro` y `404.astro` en `src/pages/`
5. **Build generado** → `dist/` existe con `index.html` y `404.html`
6. **Configuración** → `astro.config.ts`, `tailwind.config.js`, `DESIGN.md`

---

## ⚠️ Lo que FALTA o necesita VERIFICACIÓN

### 1. **`public/404.html`** (CRÍTICO para GitHub Pages)
Veo que tienes `dist/404.html` pero **NO veo `public/404.html`** en la estructura.

**GitHub Pages requiere que `public/404.html` exista** (se copia a `dist/404.html` en build).

### 2. **`.github/workflows/deploy.yml`**
Veo `.github/workflows/` pero no sé si hay un `deploy.yml` dentro.

### 3. **`astro.config.ts`**
Necesito verificar si tiene:
- `site` y `base` configurados (o comentados para local)
- `trailingSlash: 'always'`

### 4. **`.specify/`**
Veo la carpeta pero necesito confirmar si tiene:
- `constitution.md`
- `specifications.md`

---

## 🔧 Acciones Inmediatas (PowerShell)

Ejecuta estos comandos para verificar:

```powershell
# 1. Verificar public/404.html
Test-Path public/404.html
if (-not (Test-Path public/404.html)) {
    Write-Host "⚠️ FALTA: public/404.html" -ForegroundColor Yellow
}

# 2. Verificar deploy.yml
Test-Path .github/workflows/deploy.yml
if (-not (Test-Path .github/workflows/deploy.yml)) {
    Write-Host "⚠️ FALTA: .github/workflows/deploy.yml" -ForegroundColor Yellow
}

# 3. Verificar .specify/
Test-Path .specify/constitution.md
Test-Path .specify/specifications.md

# 4. Verificar contenido de astro.config.ts
Get-Content astro.config.ts | Select-String -Pattern "site|base|trailingSlash"
```

---

## 📝 Archivos que NECESITAMOS crear/verificar

### A. Si NO existe `public/404.html`:

Crea: `public/404.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
    <style>
        :root {
            --color-primary: #C86405;
            --color-neutral: #F5F1E6;
            --color-text: #2C2C2C;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--color-neutral);
            color: var(--color-text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
        }
        .container {
            text-align: center;
            max-width: 500px;
            background: white;
            padding: 3rem 2rem;
            border-radius: 1rem 1rem 0.75rem 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        h1 { font-size: clamp(4rem, 15vw, 8rem); font-weight: 700; color: var(--color-primary); margin-bottom: 1rem; }
        h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        p { margin-bottom: 2rem; opacity: 0.8; }
        .btn {
            display: inline-block;
            background-color: var(--color-primary);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
        }
        .btn:hover { background-color: #A55204; }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <a href="/" class="btn">← Volver al inicio</a>
    </div>
    <script>
        (function() {
            const path = window.location.pathname;
            const match = path.match(/^\/([^\/]+)\//);
            if (match) {
                const repoName = match[1];
                const btn = document.querySelector('.btn');
                if (btn) btn.href = '/' + repoName + '/';
            }
        })();
    </script>
</body>
</html>
```

### B. Verificar `astro.config.ts`

Debe tener (para LOCAL, sin base path):
```typescript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // PARA LOCAL: site y base comentados
  // site: 'https://<TU-USUARIO>.github.io',
  // base: '/ia-mercado-laboral',
  
  output: 'static',
  trailingSlash: 'always',  // ← CRÍTICO
  
  build: {
    assets: 'assets',
    format: 'directory'
  },
  
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
```

### C. Verificar `.specify/constitution.md`

Debe existir con contenido básico:
```markdown
# Constitución del Proyecto

## Principios Rectores
- Código limpio (DRY, SOLID, KISS)
- Mobile-first
- Sin testing (no unit/integration/e2e tests)
- Astro 6 + Tailwind 4 + Bun
- Datos en JSON dentro del proyecto
```

---

## 🎯 Plan de Acción Inmediato

**Antes de Git y Spec-Kit**, necesitamos:

1. ✅ Crear `public/404.html` (si no existe)
2. ✅ Verificar `.github/workflows/deploy.yml` (si existe)
3. ✅ Confirmar `astro.config.ts` (configuración local)
4. ✅ Verificar `.specify/` (constitution.md + specifications.md)

---

## 📋 Preguntas para Ti

**Responde y te doy los siguientes comandos exactos:**

1. ¿Existe `public/404.html`? (Ejecuta: `Test-Path public/404.html`)
2. ¿Existe `.github/workflows/deploy.yml`? (Ejecuta: `Test-Path .github/workflows/deploy.yml`)
3. ¿Qué dice `Get-Content astro.config.ts`? (Pega el contenido o dime si tiene `site` y `base` descomentados)
4. ¿Existen `.specify/constitution.md` y `.specify/specifications.md`?

**Una vez me respondas, te doy:**
- Los archivos exactos a crear/modificar
- Los comandos de PowerShell para git init
- El primer comando de Spec-Kit

**¿Empezamos por verificar esos 4 puntos?** 🔍