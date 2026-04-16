# BaseLayout Component Interface Contract

**Purpose**: Defines the public interface that other Astro components and pages must follow when using BaseLayout.astro

**Version**: 1.0  
**Date**: 2026-04-15

## Component Props Interface

### Required Props

None - all props are optional with sensible defaults

### Optional Props

```typescript
interface BaseLayoutProps {
  /** Page title for HTML <title> tag and browser tab */
  title?: string;

  /** Meta description for SEO, displayed in search results */
  description?: string;

  /** Open Graph title for social media sharing previews */
  ogTitle?: string;

  /** Current page identifier for navigation active state highlighting */
  currentPage?: "inicio" | "datos" | "provincias" | "fuentes";
}
```

### Default Values

```astro
const {
  title = "IA y Mercado Laboral - España/Cataluña",
  description,
  ogTitle = title,
  currentPage
} = Astro.props;
```

## Slot Interface

### Primary Content Slot

```astro
<slot />
```

**Purpose**: Main page content injection point  
**Required**: Yes  
**Constraints**: Must contain valid HTML5 content

### Named Slots

#### head

```astro
<slot name="head" />
```

**Purpose**: Additional head elements (meta tags, scripts, styles)  
**Required**: No  
**Constraints**: Only valid `<head>` elements

#### header-actions

```astro
<slot name="header-actions" />
```

**Purpose**: Additional header actions (search, user menu, etc.)  
**Required**: No  
**Constraints**: Interactive elements must meet 44px touch target minimum

## CSS Class Interface

### Provided CSS Classes

The layout component provides these CSS classes for styling:

```css
.layout-container {
  /* Main layout wrapper */
}

.layout-header {
  /* Fixed header styling */
}

.layout-main {
  /* Main content area */
}

.layout-navigation {
  /* Navigation component wrapper */
}
```

### CSS Variables Required

Layout expects these CSS variables from global.css:

```css
:root {
  --color-primary: #c86405;
  --color-secondary: #4a7c59;
  --color-neutral: #f5f1e6;
  --color-text: #2c2c2c;
  --font-heading: "Manrope", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

## Navigation Interface

### Static Navigation Items

Layout renders these navigation items by default:

```typescript
const navigationItems = [
  { label: "Inicio", href: "/", id: "inicio" },
  { label: "Datos", href: "/datos", id: "datos" },
  { label: "Provincias", href: "/provincias", id: "provincias" },
  { label: "Fuentes", href: "/fuentes", id: "fuentes" },
];
```

### Active State Logic

Current page highlighting based on `currentPage` prop:

- Matches `currentPage` prop to navigation item `id`
- Active items receive `aria-current="page"` attribute
- Visual styling applies `text-primary` class to active items

## Accessibility Interface

### ARIA Attributes Provided

```html
<header role="banner">
  <nav role="navigation" aria-label="Navegación principal">
    <main role="main">
      <button aria-expanded="false" aria-controls="mobile-menu"></button>
    </main>
  </nav>
</header>
```

### Keyboard Navigation

- Tab order: Logo → Desktop nav items → Mobile menu button → Mobile nav items
- Escape key closes mobile menu
- Enter/Space activates navigation buttons
- Arrow keys navigate between menu items (mobile)

### Screen Reader Support

- Semantic HTML structure
- Spanish language declaration (`lang="es"`)
- Descriptive navigation labels
- State announcements for mobile menu

## Error Handling

### Invalid Props

Layout handles invalid props gracefully:

- Unknown `currentPage` values → No active state applied
- Missing `title` → Uses default title
- Invalid slot content → Renders as-is (browser handles validation)

### Missing Dependencies

- Missing Google Fonts → Falls back to system fonts
- Missing CSS variables → Uses Tailwind defaults
- JavaScript disabled → Shows full navigation menu

## Browser Compatibility

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement

- Core layout works without JavaScript
- Enhanced interactions require JavaScript
- CSS Grid with Flexbox fallbacks
- CSS Custom Properties with fallback values

## Usage Examples

### Basic Usage

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Inicio - IA y Mercado Laboral" currentPage="inicio">
  <h1>Bienvenido</h1>
  <p>Contenido de la página...</p>
</BaseLayout>
```

### Advanced Usage with Head Elements

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Análisis de Datos"
  description="Análisis detallado del impacto de la IA en el mercado laboral"
  currentPage="datos"
>
  <Fragment slot="head">
    <meta property="og:image" content="/images/datos-preview.jpg">
    <script src="/js/charts.js"></script>
  </Fragment>

  <section>
    <h1>Datos del Mercado Laboral</h1>
    <!-- Page content -->
  </section>
</BaseLayout>
```

## Version History

**v1.0** (2026-04-15)

- Initial interface definition
- Basic props and slot structure
- Navigation and accessibility interfaces
