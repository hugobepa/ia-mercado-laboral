# Research Report: Base Layout Component

**Phase**: 0 - Outline & Research  
**Date**: 2026-04-15  
**Feature**: Base Layout Component

## Astro 6.x Layout Component Best Practices

**Decision**: Use Astro's native slot system with progressive enhancement approach
**Rationale**: Astro 6.1.5 provides robust layout patterns through slots, enabling clean separation of concerns while maintaining SEO benefits and performance. The slot system allows flexible content injection while preserving static site generation capabilities.
**Alternatives considered**: React-based layouts (rejected - adds complexity), Vue layouts (rejected - not in stack), plain HTML templates (rejected - lacks component reusability)

### Key Implementation Patterns:

- Named slots for head, header, main content, and footer sections
- Props interface for meta tags and page-specific configuration
- HTML5 semantic structure with proper lang attributes
- Integration with Astro's file-based routing system

## Tailwind CSS 4.x Responsive Navigation Patterns

**Decision**: CSS-first approach with progressive JavaScript enhancement
**Rationale**: Tailwind CSS 4.2.2 utilities provide comprehensive responsive controls without additional dependencies. CSS-first ensures navigation works without JavaScript, meeting progressive enhancement requirements while maintaining design system consistency.
**Alternatives considered**: JavaScript-only solutions (rejected - fails without JS), CSS frameworks like Bootstrap (rejected - not in stack), custom CSS (rejected - loses utility-first benefits)

### Key Implementation Patterns:

- Mobile-first breakpoint strategy (sm:640px, md:768px, lg:1024px)
- Fixed header with backdrop-blur effects for modern browsers
- CSS-only hamburger menu with transform animations
- Touch target compliance (44px minimum) for all interactive elements
- CSS custom properties integration for design system variables

## WCAG AA Accessibility Compliance Patterns

**Decision**: Semantic HTML5 structure with comprehensive keyboard navigation support
**Rationale**: WCAG AA compliance is both a legal requirement and constitutional principle. Semantic HTML provides screen reader compatibility while proper focus management ensures keyboard accessibility. 4.5:1 contrast ratios meet AA standards for the chosen color palette.
**Alternatives considered**: Basic accessibility (rejected - below AA standard), AAA compliance (rejected - unnecessary complexity for this application), accessibility-first libraries (rejected - adds dependencies)

### Key Implementation Patterns:

- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
- ARIA labels and roles for complex interactive elements
- Visible focus indicators with sufficient contrast
- Logical tab order and skip navigation links
- Screen reader announcements for dynamic content changes
- Spanish language declarations (`lang="es"`)

## Google Fonts Loading Strategy

**Decision**: Preconnect with system font fallbacks and progressive loading
**Rationale**: Based on clarification, system fonts display immediately while Google Fonts load in background. This approach prevents FOUC (Flash of Unstyled Content) and ensures readable text regardless of network conditions or font loading failures.
**Alternatives considered**: Blocking font loads (rejected - poor UX), local font files (rejected - maintenance overhead), font display strategies only (rejected - insufficient fallback)

### Key Implementation Patterns:

- Preconnect to Google Fonts domains for DNS optimization
- Font-display: swap for progressive enhancement
- System font fallback stack: Inter → system-ui → -apple-system → Segoe UI → sans-serif
- Manrope fallback: Manrope → system-ui → Georgia → serif

## Progressive Enhancement for JavaScript-Disabled Scenarios

**Decision**: Always-visible navigation menu on mobile when JavaScript is disabled
**Rationale**: Based on clarification, full navigation menu appears below header when JavaScript is unavailable. This ensures core functionality remains accessible while providing enhanced experience for JavaScript-enabled users.
**Alternatives considered**: No-JS warnings (rejected - poor UX), JS-only navigation (rejected - fails accessibility), separate no-JS pages (rejected - maintenance burden)

### Key Implementation Patterns:

- CSS-only responsive breakpoints for fallback navigation
- Form-based interactions where possible
- Semantic anchor links for navigation
- CSS :target pseudo-selectors for basic interactivity
- Server-side rendering for all critical content

## Performance and Browser Support Considerations

**Decision**: Modern CSS features with graceful degradation
**Rationale**: Target browsers (Chrome, Firefox, Safari, Edge) support modern CSS Grid, Flexbox, and Custom Properties. Graceful degradation ensures functionality on older browsers while leveraging modern capabilities for enhanced experience.
**Alternatives considered**: IE11 support (rejected - not required), cutting-edge features only (rejected - limited support), legacy CSS only (rejected - verbose and unmaintainable)

### Key Implementation Patterns:

- CSS Grid for layout with Flexbox fallbacks
- CSS Custom Properties with fallback values
- Modern pseudo-selectors with legacy alternatives
- Feature detection via CSS @supports queries
- Compress and optimize critical path CSS
