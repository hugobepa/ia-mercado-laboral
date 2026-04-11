---
name: performance-web
description: Optimize Astro components for Core Web Vitals (LCP, FID, CLS). Use this skill when the user needs performance improvements, image optimization, lazy loading, or CSS/JS bundling. Produces mobile-first, accessibility-compliant optimizations that improve page speed scores.
license: Complete terms in LICENSE.txt
---

# Skill: performance-web

## Trigger

- "optimiza rendimiento"
- "core web vitals"
- "lazy load imágenes"
- "mejora page speed"

## Descripción

Optimiza componentes Astro para Core Web Vitals: LCP, FID, CLS. Enfocado en móvil.

## Output

- Imágenes con loading="lazy" y sizes responsive
- CSS crítico inline, resto diferido
- Fonts con font-display: swap
- Código JS dividido por ruta

## Ejemplo de uso

```astro
<!-- Imagen optimizada -->
<img
  src="/hero-mobile.jpg"
  srcset="/hero-mobile.jpg 400w, /hero-tablet.jpg 768w, /hero-desktop.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
  alt="Descripción accesible"
  loading="lazy"
  width="1200"
  height="630"
  class="rounded-t-xl"
/>
```

## Restricciones

- NO cargar fonts sin font-display: swap
- NO imágenes sin width/height (evita CLS)
- SIEMPRE lazy load para imágenes below-the-fold
- Máximo 100KB CSS crítico por página
