---
name: htmx-interactions
description: Add lightweight dynamic interactions using HTMX 2+ in Astro components. Use this skill when the user needs dynamic content loading, form submissions, or interactive elements without React islands. Produces accessible, progressive-enhancement-friendly code with proper loading states.
license: Complete terms in LICENSE.txt
---

# Skill: htmx-interactions

## Trigger

- "añade interacción con htmx"
- "carga dinámica de contenido"
- "formulario con htmx"
- "sin react islands"

## Descripción

Añade interacciones dinámicas ligeras con HTMX 2+ en componentes Astro, sin islands React innecesarias.

## Output

- Atributos hx-\* correctos (hx-get, hx-target, hx-swap)
- Endpoints Astro API para responder a requests HTMX
- Loading states y error handling básico

## Ejemplo de uso

```astro
<!-- Componente con HTMX -->
<button
  hx-get="/api/provincia-data"
  hx-target="#data-container"
  hx-swap="innerHTML"
  class="btn-primary"
>
  Cargar datos de Cataluña
</button>
<div id="data-container"></div>
```

## Restricciones

- NO usar React islands para interacciones simples
- SIEMPRE incluir fallback para JS deshabilitado
- hx-trigger por defecto: 'click'
- Loading state con skeleton o spinner mínimo
