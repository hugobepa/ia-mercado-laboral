# 📘 MANUAL DE REFERENCIA v3.0: ASTRO 5 → GITHUB PAGES CON BUN

**Audiencia:** IA de automatización senior  
**Versión:** Astro 5.x, Bun 1.x, GitHub Pages  
**Cobertura completa:** Build + Enlaces + 404 + Paginación + Breadcrumbs

---

## 🧠 0. ÍNDICE DE PROBLEMAS RESUELTOS

| Problema | Solución en este manual |
| :--- | :--- |
| Base path rompe enlaces | Sección 4 (Auditoría de enlaces) |
| Página 404 no se sirve | Sección 5 (Configuración de 404) |
| Breadcrumbs duplican base | Sección 4.3 |
| Paginador apunta a raíz | Sección 4.4 |
| Assets (CSS/JS) no cargan | Sección 3.2 |

---

## 📁 1. ESTRUCTURA DE ARCHIVOS REQUERIDA (POST-CONVERSIÓN)

```
tu-proyecto/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── 404.html              # ← ARCHIVO CRÍTICO (explicado en sección 5)
├── src/
│   ├── pages/
│   │   └── 404.astro         # ← OPCIONAL pero recomendado
│   └── components/
├── astro.config.ts           # ← TypeScript, NO .mjs
├── package.json
└── bun.lockb
```

---

## ⚙️ 2. CONFIGURACIÓN BASE (`astro.config.ts`)

```typescript
import { defineConfig } from 'astro/config';

// DETECCIÓN AUTOMÁTICA QUE LA IA DEBE HACER:
// 1. Obtener URL del repo: git remote get-url origin
// 2. Si termina en .github.io → SITE = esa URL, BASE = ''
// 3. Si no → SITE = 'https://<usuario>.github.io', BASE = '/nombre-repo'

export default defineConfig({
  site: 'https://<USUARIO>.github.io',
  base: '<NOMBRE-DEL-REPO>',  // ← Vacío '' para user site
  
  output: 'static',
  
  build: {
    assets: 'assets',
    format: 'directory'
  },
  
  // CRÍTICO: La 404 necesita esta configuración
  trailingSlash: 'always',  // ← GitHub Pages funciona mejor con trailing slash
  
  // Para imágenes
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
```

---

## 🔍 3. WORKFLOW DE GITHUB ACTIONS (deploy.yml)

*(Mismo YAML de versiones anteriores, no lo repito por claridad)*

---

## 🔗 4. AUDITORÍA DE ENLACES (FASE OBLIGATORIA)

### 4.1. Patrones peligrosos (buscar y corregir)

```bash
# Comandos que la IA debe ejecutar sobre el código del usuario
grep -r "href=\"/[^/]" src/ --include="*.astro" --include="*.mdx"
grep -r "src=\"/" src/ --include="*.astro"
grep -r "fetch('/" src/ --include="*.astro" --include="*.js"
```

### 4.2. Componente de navegación corregido

```astro
---
// src/components/Navigation.astro
// CORRECTO: usa Astro.url para respetar base
const currentPath = Astro.url.pathname;
const links = [
  { href: '/', label: 'Inicio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Sobre mí' },
];
---

<nav>
  {links.map(link => (
    <a 
      href={new URL(link.href, Astro.url).pathname}
      class:list={{ active: currentPath === new URL(link.href, Astro.url).pathname }}
    >
      {link.label}
    </a>
  ))}
</nav>
```

### 4.3. Breadcrumbs (migas de pan) corregidas

```astro
---
// src/components/Breadcrumbs.astro
// CORRECTO: evita duplicación de base
const pathParts = Astro.url.pathname.split('/').filter(p => p && p !== import.meta.env.BASE_URL.replace(/\\//g, ''));
const breadcrumbs = pathParts.map((part, index) => {
  const path = '/' + pathParts.slice(0, index + 1).join('/');
  return { label: part.replace(/-/g, ' '), href: path };
});
---

<nav aria-label="breadcrumb">
  <a href={import.meta.env.BASE_URL || '/'}>Inicio</a>
  {breadcrumbs.map((crumb, i) => (
    <span>
      <span class="separator">/</span>
      {i === breadcrumbs.length - 1 ? (
        <span>{crumb.label}</span>
      ) : (
        <a href={new URL(crumb.href, Astro.url).pathname}>{crumb.label}</a>
      )}
    </span>
  ))}
</nav>
```

### 4.4. Paginador corregido

```astro
---
// src/components/Pagination.astro
// Para páginas generadas con paginate()
const { page, baseUrl } = Astro.props;
const currentPage = page.currentPage;
const totalPages = page.lastPage;
const base = import.meta.env.BASE_URL;

const createPageUrl = (pageNum: number) => {
  if (pageNum === 1) return base || '/';
  return `${base}/page/${pageNum}`;
};
---

{totalPages > 1 && (
  <div class="pagination">
    {currentPage > 1 && (
      <a href={createPageUrl(currentPage - 1)}>← Anterior</a>
    )}
    
    <span>Página {currentPage} de {totalPages}</span>
    
    {currentPage < totalPages && (
      <a href={createPageUrl(currentPage + 1)}>Siguiente →</a>
    )}
  </div>
)}
```

---

## 🚨 5. PÁGINA 404 (EL PUNTO QUE FALTABA)

### 5.1. El problema específico de GitHub Pages

| Tipo de sitio | Dónde busca GitHub Pages la 404 | Dónde cree el desarrollador |
| :--- | :--- | :--- |
| User site (`usuario.github.io`) | `https://usuario.github.io/404.html` | `https://usuario.github.io/mi-repo/404.html` |
| Project site (`usuario.github.io/repo`) | `https://usuario.github.io/404.html` | `https://usuario.github.io/repo/404.html` |

**Conclusión:** La 404 SIEMPRE se sirve desde la raíz del dominio, independientemente de tu `base`.

### 5.2. Solución: DOS archivos 404

#### Archivo 1: `public/404.html` (OBLIGATORIO)

Este archivo **debe existir en la raíz del build**. Como `base` no afecta a `public/`, se copia directamente a `dist/404.html`.

```html
<!-- public/404.html -->
<!-- ESTE ARCHIVO ES CRÍTICO. GitHub Pages lo sirve automáticamente -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página no encontrada</title>
    <meta http-equiv="refresh" content="3;url=/<NOMBRE-DEL-REPO>/">
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #0a0a0a;
            color: white;
            text-align: center;
        }
        .container { padding: 2rem; }
        h1 { font-size: 6rem; margin: 0; }
        a { color: #7c3aed; }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Página no encontrada</p>
        <!-- CRÍTICO: La URL debe incluir el base path -->
        <a href="/<NOMBRE-DEL-REPO>/">Volver al inicio</a>
        <p>Redirigiendo en 3 segundos...</p>
    </div>
</body>
</html>
```

#### Archivo 2: `src/pages/404.astro` (RECOMENDADO)

Para mantener consistencia en desarrollo local:

```astro
---
// src/pages/404.astro
// Esta página se genera como /<base>/404.html en desarrollo
// Pero GitHub Pages usará public/404.html en producción
const base = import.meta.env.BASE_URL;
---

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
</head>
<body>
    <h1>404</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <a href={base || '/'}>← Volver al inicio</a>
</body>
</html>
```

### 5.3. Verificación de la 404 (la IA debe ejecutar)

```bash
# Post-build: verificar que existe
ls dist/404.html

# Verificar contenido (buscar base path)
grep -o 'href="/[^"]*"' dist/404.html
# Debe mostrar: href="/nombre-repo/" (o href="/" para user site)
```

### 5.4. Redirección automática (mejor práctica)

Para una experiencia superior, añade JavaScript que detecte la URL real:

```html
<script>
// En public/404.html
(function() {
    // Detecta si estamos en un subdirectorio
    const path = window.location.pathname;
    const match = path.match(/^\/([^\/]+)\//);
    if (match) {
        const repoName = match[1];
        // Redirige a la página 404 dentro del repo
        window.location.href = '/' + repoName + '/404';
    } else {
        window.location.href = '/';
    }
})();
</script>
```

---

## 🧪 6. VALIDACIÓN PRE-DESPLIEGUE (CHECKLIST FINAL)

La IA DEBE verificar cada uno:

### Configuración
- [ ] `astro.config.ts` existe (no `.mjs`)
- [ ] `site` y `base` configurados correctamente
- [ ] `trailingSlash: 'always'`

### Archivos
- [ ] `public/404.html` existe y contiene la URL correcta
- [ ] `src/pages/404.astro` existe (opcional pero recomendado)

### Enlaces (análisis estático)
- [ ] No hay `href="/ruta"` absolutos (excepto enlaces externos)
- [ ] No hay `src="/imagen.png"` absolutos
- [ ] Breadcrumbs usan `Astro.url.pathname`
- [ ] Paginador usa `import.meta.env.BASE_URL`

### Build verification
```bash
bun run build

# Verificar que 404.html está en la raíz del build
test -f dist/404.html && echo "✓ 404 existe" || echo "✗ FALTA 404"

# Verificar que no hay enlaces absolutos rotos
grep -r "href=\"/[^/]" dist/ --include="*.html" | grep -v "http" | grep -v "mailto"
```

---

## 📋 7. RESPUESTA QUE LA IA DEBE DAR AL USUARIO

```markdown
## ✅ Conversión completada para GitHub Pages (Astro 5 + Bun)

### 📁 Archivos creados/modificados

| Archivo | Acción | Propósito |
| :--- | :--- | :--- |
| `.github/workflows/deploy.yml` | ✅ Creado | CI/CD pipeline |
| `astro.config.ts` | ✅ Creado/Modificado | Base path + trailing slash |
| `public/404.html` | ✅ Creado | Página 404 para GH Pages |
| `src/pages/404.astro` | ✅ Creado | 404 en desarrollo |
| `src/components/Navigation.astro` | ✅ Corregido | Enlaces con base |
| `src/components/Breadcrumbs.astro` | ✅ Corregido | Migas sin duplicación |
| `src/components/Pagination.astro` | ✅ Creado | Paginador con base |

### 🔍 Enlaces corregidos (detección automática)

Se encontraron y corrigieron **X** enlaces absolutos en:
- `src/components/Header.astro` (3 cambios)
- `src/layouts/BaseLayout.astro` (1 canonical)
- `src/pages/index.astro` (2 imágenes)

### 🚀 Instrucciones de despliegue

```bash
# 1. Instalar dependencias (genera/actualiza bun.lockb)
bun install

# 2. Build local para verificar
bun run build

# 3. Verificar 404
cat dist/404.html | grep -o 'href="/[^"]*"'

# 4. Commit y push
git add .
git commit -m "feat(ci): despliegue GH Pages + 404 + corrección enlaces"
git push origin main
```

### ⚙️ Configuración manual en GitHub

1. Ve a `Settings > Pages`
2. Source: **GitHub Actions** (no "Deploy from a branch")
3. Espera ~2 minutos

### 🧪 Pruebas post-despliegue

- [ ] Página principal carga
- [ ] Navegación funciona (click en todos los enlaces)
- [ ] **Página 404**: escribe `https://tu-usuario.github.io/tu-repo/ruta-inexistente`
- [ ] Breadcrumbs muestran ruta correcta
- [ ] Paginador (si existe) funciona

### 🐛 Si la 404 no funciona

**Problema típico:** GitHub Pages cachea la 404. Solución:
1. Espera 5 minutos
2. Haz hard refresh (Ctrl+Shift+R)
3. Verifica que `dist/404.html` existe en el artefacto del Actions
```

---

## 🎯 8. DEFINICIÓN DE EXCELENCIA (VERSIÓN FINAL)

Un despliegue es **excelente** si:

1. ✅ `astro.config.ts` con `site`, `base`, `trailingSlash: 'always'`
2. ✅ **`public/404.html` existe y redirige correctamente**
3. ✅ Cero enlaces absolutos internos (`grep` sobre `dist/` no encuentra `href="/[^/]"` excepto externos)
4. ✅ Breadcrumbs no duplican `base`
5. ✅ Paginador funciona en subdirectorios
6. ✅ Canonicals dinámicos
7. ✅ El sitio funciona con y sin trailing slash
8. ✅ La página 404 se ve y redirige (probado manualmente)

---

## ✅ MANUAL COMPLETO

**Este documento es la fuente de verdad para cualquier IA que convierta Astro 5 a GitHub Pages con Bun.**

La IA que ejecute este manual debe:
1. Leerlo completo (ya lo ha hecho)
2. Ejecutar cada fase en orden
3. Reportar **todos** los hallazgos al usuario
4. No saltarse la fase de 404 ni la de enlaces

---

- example deploy.yml :

````yml

name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build with Astro
        run: bun run build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4


````