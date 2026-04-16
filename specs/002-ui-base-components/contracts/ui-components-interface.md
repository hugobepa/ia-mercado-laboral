# Contract: UI Components Interface

## Scope

Contrato de interfaz para los componentes en `src/components/ui/`:

- `Button.astro`
- `Card.astro`
- `Table.astro`
- `Navigation.astro`

## 1) Button.astro

### Props Contract

- `variant`: `primary | secondary | outline` (required)
- `size`: `sm | md | lg` (optional, default `md`)
- `type`: `button | submit | reset` (optional, default `button`)
- `disabled`: `boolean` (optional, default `false`)
- `ariaLabel`: `string` (optional; required if visible label is absent)

### Behavioral Contract

- Debe exponer foco visible uniforme con `focus-visible`.
- Debe mantener target táctil >=44x44px en móvil.
- Debe respetar tokens de color y transición definidos.

## 2) Card.astro

### Props Contract

- `variant`: `base | province | data | demographic` (required)
- `title`: `string` (optional)
- `subtitle`: `string` (optional)
- `empty`: `boolean` (optional)
- `emptyMessage`: `string` (optional)
- `emptyCtaLabel`: `string` (optional)
- `emptyCtaHref`: `string` (optional)

### Slots Contract

- `default`: contenido principal de la card.
- `header` (optional): encabezado custom.
- `footer` (optional): acciones o meta información.

### Behavioral Contract

- Bordes asimétricos y sombra solo en hover.
- Si `empty=true`, renderizar estado vacío con mensaje claro + CTA secundaria.

## 3) Table.astro

### Props Contract

- `columns`: `Array<{ key: string; label: string }>` (required)
- `rows`: `Array<Record<string, string | number | null>>` (required)
- `caption`: `string` (optional)
- `emptyMessage`: `string` (optional, default requerido por UX)
- `emptyCtaLabel`: `string` (optional)
- `emptyCtaHref`: `string` (optional)

### Behavioral Contract

- Desktop: tabla semántica clásica (`table`, `thead`, `tbody`).
- Mobile: cards apiladas preservando pares etiqueta-valor.
- Sin datos: estado vacío con mensaje y CTA secundaria.

## 4) Navigation.astro

### Props Contract

- `items`: `Array<{ label: string; href: string }>` (required)
- `currentPath`: `string` (required)
- `basePath`: `string` (optional, resuelto por entorno)
- `menuId`: `string` (optional, default estable)
- `openLabel`: `string` (optional, default `Abrir menu`)
- `closeLabel`: `string` (optional, default `Cerrar menu`)

### Behavioral Contract

- Desktop: navegación visible persistente.
- Mobile JS-enabled: menú hamburguesa con toggle.
- Mobile no-JS: enlaces visibles sin hamburguesa.
- Accesibilidad hamburguesa: `aria-expanded`, `aria-controls`, etiqueta dinámica abrir/cerrar.
- Soporte skip link hacia contenido principal.
- Rutas internas compatibles con subruta de GitHub Pages mediante resolución contextual.

## Cross-Component Accessibility Contract

- Contraste mínimo 4.5:1 en texto normal.
- `focus-visible` uniforme en todos los controles interactivos.
- Nombres accesibles (texto visible o `aria-label`) en controles.
- Navegación por teclado funcional sin dependencia de puntero.

## Cross-Component Design Contract

- Colores permitidos: `#C86405`, `#4A7C59`, `#F5F1E6`, `#2C2C2C`.
- Bordes asimétricos donde aplique: `rounded-t-xl rounded-b-lg`.
- Sombras solo en hover: `shadow-sm` a `hover:shadow-md`.
- Transiciones: `duration-200`.
- Tipografía: Manrope para títulos, Inter para cuerpo.
