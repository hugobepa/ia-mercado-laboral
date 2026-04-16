# Data Model: UI Base Components

## Overview

El feature define modelos de contrato de componentes (props + variantes + estados) y no introduce persistencia nueva. Los datos de ejemplo provienen de JSON en `src/data/`.

## Entities

### 1. ButtonVariantConfig

- Description: Configuración visual/funcional de un botón reutilizable.
- Fields:
  - `variant` (enum: `primary` | `secondary` | `outline`) - obligatorio.
  - `size` (enum: `sm` | `md` | `lg`) - opcional, default `md`.
  - `type` (enum: `button` | `submit` | `reset`) - opcional, default `button`.
  - `disabled` (boolean) - opcional, default `false`.
  - `ariaLabel` (string) - opcional; requerido si no hay texto visible.
- Validation Rules:
  - Debe incluir clase de foco visible uniforme.
  - En móvil, altura/ancho interactivo >= 44px.

### 2. CardVariantConfig

- Description: Contrato base para cards con variantes semánticas.
- Fields:
  - `variant` (enum: `base` | `province` | `data` | `demographic`) - obligatorio.
  - `title` (string) - opcional según slot.
  - `subtitle` (string) - opcional.
  - `content` (slot/content) - obligatorio.
  - `emptyState` (object) - opcional para falta de datos.
- Validation Rules:
  - Bordes asimétricos (`rounded-t-xl`, `rounded-b-lg`) obligatorios.
  - Sombras solo en hover (`shadow-sm` -> `hover:shadow-md`).
  - Si no hay datos, renderizar mensaje claro + CTA secundaria.

### 3. TableResponsiveModel

- Description: Representación de datos tabulares adaptable a desktop y móvil.
- Fields:
  - `columns` (array<{ key: string; label: string }>) - obligatorio en desktop.
  - `rows` (array<Record<string, string | number | null>>) - obligatorio.
  - `caption` (string) - opcional recomendado para accesibilidad.
  - `emptyState` (object) - obligatorio cuando `rows` está vacío.
- Validation Rules:
  - Desktop: tabla semántica con `thead`, `tbody`, `th`, `td`.
  - Móvil: cards apiladas preservando pares etiqueta-valor.
  - Debe existir estado vacío con CTA secundaria cuando no hay filas.

### 4. NavigationModel

- Description: Modelo de navegación principal responsive con soporte accesible.
- Fields:
  - `items` (array<{ label: string; href: string; isCurrent?: boolean }>) - obligatorio.
  - `mobileMenuOpen` (boolean) - estado de interacción.
  - `menuId` (string) - identificador para `aria-controls`.
  - `toggleLabel` (string) - etiqueta dinámica: abrir/cerrar.
  - `basePath` (string) - resuelto por entorno para GitHub Pages.
- Validation Rules:
  - Móvil sin JS: mostrar enlaces visibles sin hamburguesa.
  - Botón hamburguesa con `aria-expanded`, `aria-controls` y etiqueta dinámica.
  - Rutas internas deben resolverse con base path dinámico seguro.

## Relationships

- `NavigationModel.items` referencia rutas de páginas Astro.
- `TableResponsiveModel.rows` y `CardVariantConfig` pueden consumir datos de JSON en `src/data/`.
- `ButtonVariantConfig` es dependencia compositiva para CTAs en cards, empty states y navegación.

## State Transitions

### Navigation State

- `closed` -> `open` al activar hamburguesa en móvil.
- `open` -> `closed` al seleccionar enlace, cerrar explícitamente o perder contexto.
- `no-js mode`: navegación siempre visible (sin transición de estado JS).

### Data Display State

- `has-data`: render estándar de tabla/cards.
- `empty-data`: render de estado vacío con mensaje + CTA secundaria.
