# QuickStart: Base Layout Component

**Feature**: Base Layout Component  
**Last Updated**: 2026-04-15  
**Prerequisites**: Astro 6.x, Tailwind CSS 4.x, Node.js 18+

## 🚀 Quick Setup

### 1. Verify Dependencies

```bash
# Check your package.json includes:
bun list astro tailwindcss
```

### 2. Check Global Styles

Ensure `src/styles/global.css` has required CSS variables:

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

### 3. Basic Usage

Create any new page with BaseLayout:

```astro
---
// src/pages/nueva-pagina.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Mi Nueva Página" currentPage="datos">
  <h1>Contenido de la página</h1>
  <p>Tu contenido aquí...</p>
</BaseLayout>
```

## 📱 Responsive Behavior

### Desktop (≥1024px)

- Fixed header with horizontal navigation
- Logo on left, nav items center, actions right
- Hover effects on navigation items

### Mobile (<640px)

- Fixed header with hamburger menu
- Slide-out navigation drawer from left
- Floating "Volver arriba" button after scrolling 300px
- No footer (per design requirements)

### Tablet (640px-1023px)

- Similar to desktop but may stack some elements
- Touch-friendly 44px minimum targets

## 🎨 Customization

### Navigation Items

Edit the navigation array in BaseLayout.astro:

```typescript
const navigationItems = [
  { label: "Inicio", href: "/", id: "inicio" },
  { label: "Datos", href: "/datos", id: "datos" },
  { label: "Tu Página", href: "/nueva-pagina", id: "nueva" },
];
```

### Page Titles and Meta

```astro
<BaseLayout
  title="Título Específico"
  description="Descripción para SEO"
  currentPage="datos"
>
```

### Additional Head Elements

```astro
<BaseLayout title="Página con Scripts">
  <Fragment slot="head">
    <meta property="og:image" content="/preview.jpg">
    <script src="/mi-script.js"></script>
  </Fragment>

  <main>Tu contenido</main>
</BaseLayout>
```

## ♿ Accessibility Features

### Keyboard Navigation

- **Tab**: Move through interactive elements
- **Shift+Tab**: Move backwards
- **Enter/Space**: Activate buttons and links
- **Escape**: Close mobile menu

### Screen Reader Support

- Semantic HTML structure
- Spanish language declaration (`lang="es"`)
- ARIA labels and roles
- Skip navigation link (if implemented)

### Visual Indicators

- High contrast focus rings (4.5:1 ratio)
- Clear active/hover states
- Sufficient color contrast for all text

## 🔧 Development Workflow

### 1. Create New Page

```bash
# Create the file
touch src/pages/mi-pagina.astro

# Basic template
cat > src/pages/mi-pagina.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Mi Página" currentPage="inicio">
  <section class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-heading">Mi Página</h1>
  </section>
</BaseLayout>
EOF
```

### 2. Test Responsiveness

```bash
# Start dev server
bun dev

# Test breakpoints in browser:
# - < 640px (mobile)
# - 640-1023px (tablet)
# - ≥ 1024px (desktop)
```

### 3. Validate Accessibility

```bash
# Manual testing checklist:
# □ Tab navigation works
# □ Mobile menu opens/closes
# □ Focus indicators visible
# □ Screen reader announces properly
```

## 🐛 Common Issues & Solutions

### Google Fonts Not Loading

**Problem**: Fonts appear as system fonts  
**Solution**: Check network connectivity, verify font URLs in global.css

### Mobile Menu Not Working

**Problem**: Hamburger menu doesn't open  
**Solution**: Ensure JavaScript is enabled, check browser console for errors

### Navigation Not Highlighting

**Problem**: Current page not highlighted  
**Solution**: Verify `currentPage` prop matches navigation item `id`

### CSS Variables Not Applied

**Problem**: Colors appear as Tailwind defaults  
**Solution**: Ensure global.css is imported in BaseLayout.astro

### Layout Breaking on Small Screens

**Problem**: Horizontal scroll or overlapping elements  
**Solution**: Test with browser dev tools, verify responsive classes

## 🔍 Testing Checklist

### Manual Testing

- [ ] Desktop navigation visible and functional
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] All navigation links work
- [ ] Page titles display correctly in browser tab
- [ ] Back-to-top button appears after scrolling (mobile)
- [ ] Focus indicators visible on all interactive elements
- [ ] No horizontal scroll on mobile devices
- [ ] Fonts load correctly (or fallback gracefully)

### Accessibility Testing

- [ ] Tab order is logical
- [ ] Screen reader announces page structure
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Touch targets are 44px minimum on mobile
- [ ] Works without JavaScript (progressive enhancement)

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 📚 Related Documentation

- [Feature Specification](./spec.md) - Complete requirements
- [Implementation Plan](./plan.md) - Technical approach
- [Data Model](./data-model.md) - Component structure
- [Interface Contracts](./contracts/) - API documentation
- [Research Report](./research.md) - Technology decisions

## 🆘 Need Help?

### Common Commands

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun preview
```

### Key Files to Check

- `src/layouts/BaseLayout.astro` - Main component
- `src/styles/global.css` - CSS variables and base styles
- `tailwind.config.js` - Responsive breakpoints
- `astro.config.ts` - Astro configuration

### Debugging Tips

1. Check browser console for JavaScript errors
2. Verify CSS variables by inspecting computed styles
3. Test mobile navigation in browser device mode
4. Use accessibility dev tools for WCAG validation
