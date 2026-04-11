---
name: accessibility-wcag
description: Validate and fix components for WCAG 2.2 AA compliance. Use this skill when the user needs accessibility audits, contrast checks, ARIA labels, or keyboard navigation. Produces inclusive, accessible code that works with screen readers and assistive technologies.
license: Complete terms in LICENSE.txt
---

# Skill: accessibility-wcag

## Trigger

- "valida accesibilidad"
- "WCAG AA"
- "alt text imágenes"
- "navegación teclado"

## Descripción

Valida y corrige componentes para cumplir WCAG 2.2 AA: contraste, navegación teclado, ARIA labels.

## Output

- Contraste mínimo 4.5:1 para texto normal
- Focus visible en elementos interactivos
- Alt text descriptivo en imágenes
- Labels asociados a inputs

## Ejemplo de uso

```astro
<!-- Input accesible -->
<label for="search" class="sr-only">Buscar estudios</label>
<input
  id="search"
  type="search"
  placeholder="Buscar..."
  class="border border-neutral-dark rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
/>
```
