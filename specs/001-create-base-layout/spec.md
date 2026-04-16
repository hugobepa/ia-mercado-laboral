# Feature Specification: Base Layout Component

**Feature Branch**: `001-create-base-layout`  
**Created**: April 15, 2026  
**Status**: Draft  
**Input**: User description: "Crear layout base (BaseLayout.astro) para toda la web. Requisitos: Estructura HTML5 semántica con lang='es', importar fuentes Google Fonts (Manrope + Inter) desde DESIGN.md, incluir slot para contenido principal, header fijo con navegación (desktop) y menú hamburguesa (móvil), botón flotante 'Volver arriba' visible al hacer scroll (solo móvil), sin footer en móvil (según DESIGN.md), accesibilidad WCAG AA (contraste 4.5:1, focus visible), usar variables CSS de global.css para colores"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Desktop Navigation Experience (Priority: P1)

A user visits the website on a desktop computer and needs to navigate through different sections efficiently with a consistent layout experience.

**Why this priority**: Core navigation is essential for all users to access site functionality and provides the foundation for all other features.

**Independent Test**: Can be fully tested by loading any page in desktop viewport (>1024px) and verifies that fixed header navigation, semantic HTML structure, and proper font loading work correctly.

**Acceptance Scenarios**:

1. **Given** a user with a desktop browser (>1024px), **When** they visit any page, **Then** they see a fixed header with visible navigation links (Inicio, Datos, Provincias, Fuentes)
2. **Given** a desktop user viewing any page, **When** the page loads, **Then** Google Fonts (Manrope for headings, Inter for body text) are loaded and applied correctly
3. **Given** a desktop user on any page, **When** they navigate using keyboard Tab key, **Then** all interactive elements show visible focus indicators meeting WCAG AA requirements

---

### User Story 2 - Mobile Layout & Navigation (Priority: P1)

A mobile user accesses the website and needs an optimized touch-friendly interface with hamburger menu navigation and scroll assistance.

**Why this priority**: Mobile-first design is a core principle stated in DESIGN.md, making mobile experience equally critical as desktop.

**Independent Test**: Can be fully tested by loading any page in mobile viewport (<640px) and verifies hamburger menu, no footer, floating back-to-top button, and touch-friendly interactions.

**Acceptance Scenarios**:

1. **Given** a mobile user (<640px viewport), **When** they visit any page, **Then** they see a hamburger menu button (44x44px minimum) instead of desktop navigation links
2. **Given** a mobile user with an opened hamburger menu, **When** they tap any navigation link, **Then** they navigate to the correct section and the menu closes
3. **Given** a mobile user who has scrolled down, **When** the page scroll position is greater than 300px, **Then** a floating "Volver arriba" button appears in the bottom right corner
4. **Given** a mobile user viewing any page, **When** they interact with the interface, **Then** no footer appears at the bottom of the page

---

### User Story 3 - Accessibility & Content Integration (Priority: P2)

Users with disabilities or using assistive technologies need to access the website with proper semantic structure, keyboard navigation, and color contrast compliance.

**Why this priority**: Accessibility is a legal requirement and ensures the site is usable by all users, though it builds on the base navigation functionality.

**Independent Test**: Can be tested independently using accessibility tools (screen reader, keyboard navigation, contrast checkers) to verify WCAG AA compliance and semantic HTML structure.

**Acceptance Scenarios**:

1. **Given** a user with a screen reader, **When** they access any page, **Then** the HTML structure uses proper semantic elements (header, nav, main, article, section) with Spanish language declared
2. **Given** a user checking color contrast, **When** they analyze text elements, **Then** all text meets minimum 4.5:1 contrast ratio against backgrounds
3. **Given** a keyboard user, **When** they navigate the site using only Tab/Shift+Tab, **Then** they can reach all interactive elements with visible focus indicators

---

### Edge Cases

- What occurs when the viewport size changes dynamically (device rotation, browser resize)?
- How does the floating back-to-top button behave when the page is very short (less than one viewport)?

## Clarifications

### Session 2026-04-15

- Q: Font Loading Fallback Strategy - When Google Fonts fail to load or are blocked by user's browser/network, what should be the fallback behavior? → A: Show system fonts immediately, retry Google Fonts in background
- Q: Mobile Navigation Drawer Behavior - How should the mobile hamburger menu navigation drawer appear and behave when opened? → A: Slide in from left with backdrop overlay, tapping backdrop or links closes drawer
- Q: JavaScript-Disabled Mobile Navigation - What should happen to mobile navigation when JavaScript is disabled and the hamburger menu cannot function? → A: Always show full navigation menu below header (no hamburger)
- Q: Navigation Link Routing Behavior - How should the navigation links handle routing and current page indication? → A: Use Astro's built-in routing (/index, /datos, /provincias, /fuentes) with current page highlighted
- Q: Back-to-Top Button Scroll Threshold - On mobile, what should trigger the "Volver arriba" floating button to appear? → A: Appears after scrolling down 300px from top

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a BaseLayout.astro component that serves as the root layout for all pages
- **FR-002**: System MUST declare HTML document language as Spanish (`lang="es"`) in the HTML root element
- **FR-003**: System MUST import and load Google Fonts (Manrope weights 600,700 for headings; Inter weights 400,500 for body text) from the Google Fonts API with system fonts displayed immediately while Google Fonts load in background
- **FR-004**: System MUST provide a slots system allowing page-specific content to be injected into the main content area
- **FR-005**: System MUST display a fixed header with horizontal navigation links on desktop viewports (>1024px)
- **FR-006**: System MUST display a hamburger menu button on mobile viewports (<640px) that opens a slide-out navigation drawer from the left with backdrop overlay, closing when backdrop or navigation links are tapped, with fallback to always-visible navigation menu when JavaScript is disabled
- **FR-007**: System MUST render navigation links using Astro's built-in routing: Inicio (/), Datos (/datos), Provincias (/provincias), Fuentes (/fuentes) with current page visually highlighted
- **FR-008**: System MUST display a floating "Volver arriba" button on mobile only, visible when user has scrolled down more than 300px
- **FR-009**: System MUST exclude footer elements entirely on mobile viewports (<640px)
- **FR-010**: System MUST use CSS variables from global.css for all color applications (--color-primary, --color-secondary, --color-neutral, --color-text)
- **FR-011**: System MUST ensure all interactive elements meet minimum 44x44px touch target size on mobile
- **FR-012**: System MUST implement proper HTML5 semantic structure using header, nav, main, and appropriate sectioning elements

### Key Entities _(include if feature involves data)_

- **BaseLayout Component**: Root layout wrapper that provides consistent structure, navigation, and styling for all pages
- **Navigation Menu**: Configurable list of navigation items with labels and routes, responsive to viewport size
- **Viewport Breakpoints**: Defined screen size thresholds that trigger different UI behaviors (mobile <640px, desktop >1024px)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: All pages using BaseLayout.astro load fonts within 2 seconds on typical broadband connection (measured by Web Vitals)
- **SC-002**: Navigation elements maintain minimum 4.5:1 color contrast ratio against backgrounds when tested with accessibility tools
- **SC-003**: Mobile users can access hamburger menu and all navigation items with touch targets measuring at least 44x44px
- **SC-004**: Keyboard users can navigate to all interactive elements within the layout using only Tab/Shift+Tab keys
- **SC-005**: Back-to-top button appears and functions correctly on mobile devices when page scroll position exceeds 300px
- **SC-006**: Layout renders correctly and consistently across major browsers (Chrome, Firefox, Safari, Edge) without horizontal scroll on mobile
- **SC-007**: Screen readers can properly announce page structure and navigation elements using semantic HTML

## Assumptions

- Target browsers support modern CSS Grid, Flexbox, and CSS Custom Properties (variables)
- Google Fonts service is available and accessible to end users (fallback fonts defined in CSS for offline scenarios)
- Navigation menu items and routes will be statically defined initially, with future configurability possible
- Users have JavaScript enabled for interactive elements like hamburger menu and scroll-triggered back-to-top button
- Existing global.css file contains all necessary CSS variables and base styles as referenced in requirements
- Mobile viewport is consistently defined as <640px based on project's Tailwind CSS configuration
- All content passed through slots will be properly structured and accessible by the implementing pages
