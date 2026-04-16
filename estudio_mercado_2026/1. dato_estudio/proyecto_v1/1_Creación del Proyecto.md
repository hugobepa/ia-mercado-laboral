# 🚀 Fase C0: Setup Manual del Proyecto (Astro 6 + Tailwind 4 + Bun)

¡Perfecto! Empezamos la **Fase C** con el setup manual básico. Esto es imprescindible antes de usar spec-kit.

---

## 📋 Paso 1: Crear Estructura Base del Proyecto

### Comandos a ejecutar (en tu terminal):

```bash
# 1. Crear carpeta del proyecto
mkdir ia-mercado-laboral
cd ia-mercado-laboral

# 2. Inicializar con Bun
bun init -y

# 3. Instalar Astro 6 (última versión estable)
bun add astro@latest

# 4. Instalar Tailwind CSS 4
bun add @tailwindcss/vite@latest tailwindcss@latest

# 5. Instalar dependencias adicionales
bun add apexcharts htmx.org@latest
bun add @astrojs/dbbun add @astrojs/dbbun add @astrojs/db
# 6. Inicializar Astro
bun x astro init --template minimal --install --no-git
```

---

## 📁 Paso 2: Estructura de Carpetas (Clean Architecture Astro)

Crea manualmente esta estructura:

```
ia-mercado-laboral/
├── .github/
│   └── workflows/
│       └── deploy.yml          # ← Para GitHub Pages (lo creamos después)
├── public/
│   └── 404.html                # ← CRÍTICO para GitHub Pages
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Navigation.astro
│   │   ├── charts/
│   │   │   ├── BarChart.astro
│   │   │   └── DonutChart.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       └── DataSection.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── randstad-catalunya.json
│   │   ├── idescat-provincias.json
│   │   └── charts-config.json
│   └── utils/
│       ├── formatters.js
│       └── chart-helpers.js
├── astro.config.ts             # ← TypeScript, NO .mjs
├── tailwind.config.js
├── package.json
└── bun.lockb
```

---

## ⚙️ Paso 3: Configuración Base (`astro.config.ts`)

Crea este archivo en la raíz:

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<TU-USUARIO>.github.io',
  base: '/ia-mercado-laboral',  // ← Cambia por el nombre de tu repo
  
  output: 'static',
  
  build: {
    assets: 'assets',
    format: 'directory'
  },
  
  // CRÍTICO para GitHub Pages
  trailingSlash: 'always',
  
  // Integración Tailwind
  integrations: [],
  
  // Imágenes
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
```

> ⚠️ **Importante**: Reemplaza `<TU-USUARIO>` con tu usuario de GitHub y `/ia-mercado-laboral` con el nombre exacto de tu repositorio.

---

## 🎨 Paso 4: Tailwind Config con Nuestra Paleta "No-IA"

Crea `tailwind.config.js` en la raíz:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: { 
          DEFAULT: '#C86405', 
          hover: '#A55204' 
        },
        secondary: { 
          DEFAULT: '#4A7C59', 
          hover: '#3A6246' 
        },
        neutral: { 
          DEFAULT: '#F5F1E6', 
          dark: '#E8E1D1' 
        },
        text: { 
          DEFAULT: '#2C2C2C', 
          light: '#5A5A5A' 
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      borderRadius: {
        't-xl': '1rem 1rem 0 0',
        'b-lg': '0 0 0.75rem 0.75rem'
      },
      transitionDuration: {
        '200': '200ms'
      }
    }
  },
  plugins: []
}
```

---

## 📄 Paso 5: CSS Global con Tipografía

Crea `src/styles/global.css`:

```css
/* Importación de fuentes Google */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&family=Inter:wght@400;500&display=swap');

/* Variables globales */
:root {
  --color-primary: #C86405;
  --color-primary-hover: #A55204;
  --color-secondary: #4A7C59;
  --color-secondary-hover: #3A6246;
  --color-neutral: #F5F1E6;
  --color-neutral-dark: #E8E1D1;
  --color-text: #2C2C2C;
  --color-text-light: #5A5A5A;
  
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
}

/* Reset básico */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-neutral);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

/* Tipografía responsive */
h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.5rem); }
```

---

## 🧩 Paso 6: Componente Base (Button.astro)

Crea `src/components/ui/Button.astro`:

```astro
---
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  children: any;
  class?: string;
  type?: 'button' | 'submit' | 'reset';
}

const { 
  variant = 'primary', 
  href, 
  onClick, 
  children, 
  class: className = '',
  type = 'button'
} = Astro.props;

const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'
};

const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
---

{href ? (
  <a href={href} class={classes}>
    {children}
  </a>
) : (
  <button type={type} onClick={onClick} class={classes}>
    {children}
  </button>
)}
```

---

## 📊 Paso 7: Archivo de Datos (randstad-catalunya.json)

Crea `src/data/randstad-catalunya.json` con el contenido de la Fase A:

```json
{
  "resumen_ejecutivo": {
    "titulo": "¿La IA me va a quitar el trabajo?",
    "subtitulo": "Lo que dice la ciencia, explicado sin rollo",
    "fecha_actualizacion": "2026",
    "fuente_principal": "Randstad Research + INE + Idescat"
  },
  "cifras_clave_catalunya_2033": {
    "ocupados_actuales_2023": 3842100,
    "empleo_riesgo_automatizacion": 376526,
    "porcentaje_riesgo": 9.8,
    "empleo_mejora_productividad": 610894,
    "porcentaje_mejora": 15.9,
    "empleo_sin_efecto": 2854680,
    "porcentaje_sin_efecto": 74.3,
    "nuevos_empleos_creados": 302566,
    "efecto_neto_estimado": -73960
  },
  "sectores_catalunya_mas_afectados": [
    {
      "sector": "Comercio",
      "empleo_riesgo": 77234,
      "nuevos_empleos": 47632,
      "efecto_neto": -29602,
      "ejemplo_cotidiano": "Dependientas de Barcelona, reponedores de supermercados"
    },
    {
      "sector": "Hostelería y Turismo",
      "empleo_riesgo": 42356,
      "nuevos_empleos": 21178,
      "efecto_neto": -21178,
      "ejemplo_cotidiano": "Camareros de la Costa Brava, recepcionistas de hoteles"
    },
    {
      "sector": "Tecnología y Consultoría",
      "empleo_riesgo": 15167,
      "nuevos_empleos": 29473,
      "efecto_neto": 14306,
      "ejemplo_cotidiano": "Programadores del 22@, consultores IT de Barcelona"
    }
  ]
}
```

---

## ✅ Checklist de Verificación (Antes de Continuar)

Ejecuta estos comandos para verificar:

```bash
# 1. Verificar que Astro está instalado
bun run astro --version

# 2. Verificar build local
bun run build

# 3. Verificar que 404.html existe en public/
test -f public/404.html && echo "✓ 404 existe" || echo "✗ FALTA 404"

# 4. Verificar estructura de carpetas
ls -la src/components/ui/
ls -la src/data/
```

---

## 🔄 Siguiente Paso: ¿Todo correcto hasta aquí?

Antes de avanzar a **C1 (Spec-Kit Configuration)**, necesito que confirmes:

1. ✅ ¿Has ejecutado los comandos de instalación sin errores?
2. ✅ ¿La estructura de carpetas está creada?
3. ✅ ¿El build local funciona (`bun run build`)?
4. ✅ ¿Tienes ya el repositorio creado en GitHub o lo creamos ahora?

> 💡 **Recuerda**: Si algo falla, dime el error exacto y lo solucionamos antes de continuar. No avanzamos con errores pendientes.

**¿Seguimos con Spec-Kit?** 🚀

# 🔄 Fase C0 Corregida: Setup Manual + Skills + 404

Tienes toda la razón. Me precipité con el `base` de GitHub Pages y me salté pasos clave. Vamos a corregirlo manteniendo lo que ya está bien.

---

## ✅ Corrección 1: `astro.config.ts` para LOCAL (sin base path)

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ⚠️ PARA LOCAL: site y base vacíos o comentados
  // Se activarán solo al desplegar a GitHub Pages
  // site: 'https://<TU-USUARIO>.github.io',
  // base: '/ia-mercado-laboral',
  
  output: 'static',
  
  build: {
    assets: 'assets',
    format: 'directory'
  },
  
  // CRÍTICO para GitHub Pages (lo dejamos preparado)
  trailingSlash: 'always',
  
  // Para imágenes
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
```

> ✅ **Nota**: Dejamos comentado `site` y `base` para local. Se descomentarán en la fase de GitHub Pages.

---

## ✅ Corrección 2: Página 404 Inspirada en Guía de Diseño

Basado en `guia-diseño_app_abril2026.md`, creamos una 404 sencilla, rápida y con nuestra paleta "Mediterráneo Urbano".

### Archivo 1: `public/404.html` (OBLIGATORIO para GitHub Pages)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
    <meta name="description" content="La página que buscas no existe">
    <style>
        /* Minimal CSS - Sin dependencias externas */
        :root {
            --color-primary: #C86405;
            --color-secondary: #4A7C59;
            --color-neutral: #F5F1E6;
            --color-text: #2C2C2C;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--color-neutral);
            color: var(--color-text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
            line-height: 1.6;
        }
        
        .container {
            text-align: center;
            max-width: 500px;
        }
        
        h1 {
            font-size: clamp(4rem, 15vw, 8rem);
            font-weight: 700;
            color: var(--color-primary);
            line-height: 1;
            margin-bottom: 1rem;
        }
        
        h2 {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        p {
            color: var(--color-text);
            opacity: 0.8;
            margin-bottom: 2rem;
        }
        
        .btn {
            display: inline-block;
            background-color: var(--color-primary);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.2s ease;
        }
        
        .btn:hover {
            background-color: #A55204;
        }
        
        .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        /* Asimetría intencional (guía diseño no-IA) */
        .container {
            border-radius: 1rem 1rem 0.75rem 0.75rem;
            padding: 3rem 2rem;
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    </style>
    <!-- Preconnect para fuentes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <span class="icon">🔍</span>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <a href="/" class="btn">← Volver al inicio</a>
    </div>
    
    <!-- Script opcional para detectar base path en GitHub Pages -->
    <script>
        (function() {
            // Detecta si estamos en un subdirectorio (GitHub Pages project site)
            const path = window.location.pathname;
            const match = path.match(/^\/([^\/]+)\/404/);
            if (match) {
                const repoName = match[1];
                // Actualiza el enlace de volver al inicio
                const btn = document.querySelector('.btn');
                if (btn) {
                    btn.href = '/' + repoName + '/';
                }
            }
        })();
    </script>
</body>
</html>
```

### Archivo 2: `src/pages/404.astro` (Para desarrollo local)

```astro
---
// src/pages/404.astro
// Esta página se usa en desarrollo local
// GitHub Pages usará public/404.html en producción

const base = import.meta.env.BASE_URL || '/';
---

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
    <meta name="description" content="La página que buscas no existe">
</head>
<body style="font-family: 'Inter', system-ui, sans-serif; background-color: #F5F1E6; color: #2C2C2C; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem; margin: 0;">
    <div style="text-align: center; max-width: 500px; background: white; padding: 3rem 2rem; border-radius: 1rem 1rem 0.75rem 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🔍</span>
        <h1 style="font-size: clamp(4rem, 15vw, 8rem); font-weight: 700; color: #C86405; line-height: 1; margin-bottom: 1rem; font-family: 'Manrope', sans-serif;">404</h1>
        <h2 style="font-size: clamp(1.25rem, 4vw, 1.5rem); font-weight: 600; margin-bottom: 0.5rem;">Página no encontrada</h2>
        <p style="color: #2C2C2C; opacity: 0.8; margin-bottom: 2rem; line-height: 1.6;">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <a href={base} style="display: inline-block; background-color: #C86405; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; transition: background-color 0.2s ease;">← Volver al inicio</a>
    </div>
</body>
</html>
```

---

## ✅ Corrección 3: Instalación de Skills con AutoSkills

Basado en `creacion_proyecto_speckit.md`, instalamos las skills antes de spec-kit.

### Paso 3.1: Instalar AutoSkills

```bash
# En la raíz del proyecto
npx autoskills --agent copilot
```

### Paso 3.2: Crear Skills Personalizadas para el Proyecto

Crea el archivo `.autoskills/skills.md`:

```markdown
# Skills del Proyecto - IA y Mercado Laboral

## Skill 1: Generador de Componentes Astro
**Nombre**: `astro-component`
**Descripción**: Genera componentes Astro con Tailwind siguiendo el DESIGN.md
**Trigger**: "crea un componente"
**Output**: Archivo .astro en src/components/ con estilos Tailwind

## Skill 2: Generador de Gráficas ApexCharts
**Nombre**: `apex-chart`
**Descripción**: Crea configuraciones de gráficas para ApexCharts en JSON
**Trigger**: "crea una gráfica"
**Output**: JSON listo para usar en componentes de gráficas

## Skill 3: Formateador de Datos Idescat/INE
**Nombre**: `data-formatter`
**Descripción**: Convierte datos brutos a formato JSON web-ready
**Trigger**: "formatea datos"
**Output**: JSON estructurado para la web

## Skill 4: Validador de Accesibilidad
**Nombre**: `a11y-check`
**Descripción**: Verifica contraste WCAG AA y etiquetas alt
**Trigger**: "valida accesibilidad"
**Output**: Reporte de problemas y sugerencias

## Skill 5: Optimizador Mobile-First
**Nombre**: `mobile-optimize`
**Descripción**: Adapta componentes para móvil (cards en vez de tablas)
**Trigger**: "optimiza para móvil"
**Output**: Versión responsive del componente
```

### Paso 3.3: Verificar Instalación

```bash
# Verificar que autoskills está instalado
npx autoskills --version

# Verificar skills disponibles
npx autoskills list
```

---

## 📁 Estructura Actualizada del Proyecto

```
ia-mercado-laboral/
├── .autoskills/
│   └── skills.md              # ← NUEVO: Skills personalizadas
├── .github/
│   └── workflows/
│       └── deploy.yml         # ← Para GitHub Pages (después)
├── public/
│   └── 404.html               # ← CORREGIDO: 404 para GH Pages
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Navigation.astro
│   │   ├── charts/
│   │   │   ├── BarChart.astro
│   │   │   └── DonutChart.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       └── DataSection.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro          # ← NUEVO: 404 para desarrollo
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── randstad-catalunya.json
│   │   ├── idescat-provincias.json
│   │   └── charts-config.json
│   └── utils/
│       ├── formatters.js
│       └── chart-helpers.js
├── astro.config.ts            # ← CORREGIDO: base comentado para local
├── tailwind.config.js
├── package.json
└── bun.lockb
```

---

## 🔄 Checklist de Verificación Actualizado

```bash
# 1. Verificar que Astro está instalado
bun run astro --version

# 2. Verificar build local
bun run build

# 3. Verificar que 404.html existe en public/
test -f public/404.html && echo "✓ 404 existe" || echo "✗ FALTA 404"

# 4. Verificar que 404.astro existe en src/pages/
test -f src/pages/404.astro && echo "✓ 404.astro existe" || echo "✗ FALTA 404.astro"

# 5. Verificar autoskills instalado
npx autoskills --version

# 6. Verificar estructura de carpetas
ls -la .autoskills/
ls -la src/components/ui/
ls -la src/data/
```

---

## 📋 Resumen de Correcciones

| Elemento | Antes | Ahora | Estado |
|----------|-------|-------|--------|
| `astro.config.ts` | `base` activado para GitHub Pages | `base` comentado para local | ✅ Corregido |
| `public/404.html` | No existía | Creado con diseño guía no-IA | ✅ Añadido |
| `src/pages/404.astro` | No existía | Creado para desarrollo local | ✅ Añadido |
| AutoSkills | No instalado | Instalado + skills.md creado | ✅ Añadido |
| Skills personalizadas | No existían | 5 skills definidas en `.autoskills/` | ✅ Añadido |

---

## 🎯 Siguiente Paso: ¿Todo correcto ahora?

Antes de avanzar a **C1 (Spec-Kit Configuration)**, necesito que confirmes:

1. ✅ ¿El `astro.config.ts` está correcto para local (base comentado)?
2. ✅ ¿La página 404 sigue el diseño de la guía (colores, asimetría, minimalista)?
3. ✅ ¿AutoSkills está instalado y las skills están definidas?
4. ✅ ¿El build local funciona sin errores?

> 💡 **Recuerda**: El `base` de GitHub Pages lo activaremos en la fase de adaptación (Fase C4), no ahora.

**¿Seguimos con Spec-Kit o necesitas ajustar algo más?** 🚀