# Data Model: Base Layout Component

**Phase**: 1 - Design & Contracts  
**Date**: 2026-04-15  
**Feature**: Base Layout Component

## Entity Definitions

### BaseLayout Component

**Purpose**: Root layout wrapper that provides consistent structure, navigation, and styling for all pages in the IA and Labor Market application.

**Fields**:

- `title: string` - Page title for HTML head (default: "IA y Mercado Laboral")
- `description: string?` - Meta description for SEO (optional)
- `ogTitle: string?` - Open Graph title for social sharing (optional)
- `currentPage: string?` - Current page identifier for navigation highlighting (optional)

**Responsibilities**:

- HTML document structure and meta tags
- Google Fonts loading with system font fallbacks
- Responsive navigation rendering
- Accessibility compliance (WCAG AA)
- CSS variable integration from global design system

**State Transitions**: None (stateless component)

### Navigation Menu

**Purpose**: Configurable navigation system that adapts to viewport size and accessibility requirements.

**Fields**:

- `items: NavigationItem[]` - Array of navigation items
- `currentPath: string?` - Current page path for active state highlighting
- `isOpen: boolean` - Mobile menu open/closed state (client-side only)

**Validation Rules**:

- All navigation items must have valid hrefs
- Item labels must be non-empty strings
- Touch targets must be minimum 44x44px on mobile
- Focus order must be logical and sequential

**State Transitions**:

- Closed → Open (mobile menu activation)
- Open → Closed (navigation selection or backdrop tap)
- Responsive (desktop ↔ mobile based on viewport)

### NavigationItem

**Purpose**: Individual navigation link with label and routing information.

**Fields**:

- `label: string` - Display text for the navigation link
- `href: string` - Target route using Astro's file-based routing
- `isActive: boolean` - Computed property indicating current page
- `ariaLabel: string?` - Optional ARIA label for accessibility

**Validation Rules**:

- Label must be 1-50 characters
- href must follow Astro routing patterns (/, /datos, /provincias, /fuentes)
- ariaLabel required for icon-only navigation items

### Viewport Breakpoints

**Purpose**: Defined screen size thresholds that trigger different UI behaviors.

**Fields**:

- `mobile: number` - Maximum width for mobile behavior (639px)
- `tablet: number` - Minimum width for tablet behavior (640px)
- `desktop: number` - Minimum width for desktop behavior (1024px)

**Relationships**:

- Controls Navigation Menu display mode
- Affects BaseLayout responsive behavior
- Determines touch target sizing requirements

**Validation Rules**:

- Breakpoints must be positive integers
- Mobile < Tablet < Desktop (ascending order)
- Must align with Tailwind CSS configuration

## Data Flow

```
PageComponent → BaseLayout.astro
              ↓
              Props (title, description, currentPage)
              ↓
              NavigationMenu (items, currentPath)
              ↓
              5x NavigationItem (Inicio, Datos, Provincias, Fuentes, active state)
```

## Validation Requirements

### Accessibility Validation

- All text contrast ratios ≥ 4.5:1 against backgrounds
- Interactive elements have visible focus indicators
- Semantic HTML structure validated by accessibility tools
- Screen reader navigation tested and functional
- Keyboard navigation covers all interactive elements

### Performance Validation

- Google Fonts load within 2 seconds on broadband connection
- Layout Shift (CLS) < 0.1 during font loading
- Critical path CSS < 50KB compressed
- No horizontal scroll on mobile viewports

### Cross-browser Validation

- Renders consistently across Chrome, Firefox, Safari, Edge
- Progressive enhancement works without JavaScript
- CSS Grid/Flexbox fallbacks function on older browsers

## Integration Points

### Input Sources

- Page components pass props to BaseLayout
- Global CSS variables from `/src/styles/global.css`
- Navigation configuration from component constants
- Responsive breakpoints from Tailwind CSS config

### Output Interface

- HTML document with semantic structure
- CSS classes applied via Tailwind utilities
- JavaScript-enhanced mobile navigation (progressive)
- Accessibility attributes and ARIA labels
