# Tasks: Base Layout Component

**Input**: Design documents from `/specs/001-create-base-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests - manual testing with Playwright-CLI per project constitution

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Tasks follow Astro project structure: `src/layouts/`, `src/components/`, `src/styles/` at repository root per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure validation

- [x] T001 Verify Astro 6.x and Tailwind CSS 4.x dependencies in package.json
- [x] T002 [P] Validate global CSS variables exist in src/styles/global.css (--color-primary, --color-secondary, --color-neutral, --color-text, --font-heading, --font-body)
- [x] T003 [P] Confirm Google Fonts preconnect and import setup in src/styles/global.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create BaseLayout.astro component shell in src/layouts/BaseLayout.astro with proper TypeScript interface
- [ ] T005 [P] Implement HTML5 semantic document structure with lang="es" attribute
- [ ] T006 [P] Setup Google Fonts integration with system font fallbacks using font-display: swap
- [ ] T007 Add Astro slots system (main content, head, header-actions) per interface contract
- [ ] T008 Configure responsive breakpoint integration with Tailwind CSS classes

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Desktop Navigation Experience (Priority: P1) 🎯 MVP

**Goal**: Desktop users (>1024px) see fixed header navigation with proper fonts and keyboard accessibility

**Independent Test**: Load any page on desktop viewport, verify fixed header navigation, Google Fonts loading, keyboard Tab navigation with visible focus indicators

### Implementation for User Story 1

- [ ] T009 [P] [US1] Create Navigation component structure in src/components/ui/Navigation.astro
- [ ] T010 [P] [US1] Implement fixed header styling with Tailwind utilities in src/layouts/BaseLayout.astro
- [ ] T011 [US1] Add navigation items array (Inicio, Datos, Provincias, Fuentes) with Astro routing in src/components/ui/Navigation.astro
- [ ] T012 [US1] Implement desktop navigation layout (logo left, nav center, actions right) in src/components/ui/Navigation.astro
- [ ] T013 [US1] Add Google Fonts application to navigation elements with CSS variables integration
- [ ] T014 [US1] Implement keyboard Tab navigation order and visible focus indicators meeting WCAG AA
- [ ] T015 [US1] Add current page highlighting logic using currentPage prop in src/components/ui/Navigation.astro

**Checkpoint**: Desktop navigation fully functional and accessible

---

## Phase 4: User Story 2 - Mobile Layout & Navigation (Priority: P1)

**Goal**: Mobile users (<640px) get hamburger menu, drawer navigation, back-to-top button, no footer

**Independent Test**: Load any page on mobile viewport, verify hamburger menu opens/closes, floating back-to-top appears after 300px scroll, no footer visible

### Implementation for User Story 2

- [ ] T016 [P] [US2] Create hamburger menu button component with 44x44px touch target in src/components/ui/Navigation.astro
- [ ] T017 [P] [US2] Implement CSS-only slide-out drawer animation from left with backdrop overlay
- [ ] T018 [US2] Add mobile navigation state management with JavaScript progressive enhancement
- [ ] T019 [US2] Create floating "Volver arriba" button component in src/components/ui/BackToTop.astro
- [ ] T020 [US2] Implement scroll position detection (300px threshold) and button visibility toggle
- [ ] T021 [US2] Add mobile viewport detection (<640px) and conditional navigation rendering
- [ ] T022 [US2] Ensure no footer elements render on mobile per design requirements
- [ ] T023 [US2] Add JavaScript-disabled fallback (always-visible navigation menu) per clarifications

**Checkpoint**: Mobile navigation and interactions fully functional

---

## Phase 5: User Story 3 - Accessibility & Content Integration (Priority: P2)

**Goal**: Screen reader users and keyboard navigation work properly, semantic HTML structure, WCAG AA compliance

**Independent Test**: Use screen reader to navigate page structure, test keyboard-only navigation, verify color contrast with accessibility tools

### Implementation for User Story 3

- [ ] T024 [P] [US3] Add semantic HTML5 structure elements (header, nav, main, section) in src/layouts/BaseLayout.astro
- [ ] T025 [P] [US3] Implement ARIA labels and roles for navigation components in src/components/ui/Navigation.astro
- [ ] T026 [US3] Add Spanish language screen reader support with proper aria-label translations
- [ ] T027 [US3] Validate and adjust color contrast ratios to meet 4.5:1 WCAG AA standard
- [ ] T028 [US3] Implement logical tab order and skip navigation functionality
- [ ] T029 [US3] Add screen reader announcements for mobile menu state changes
- [ ] T030 [US3] Test and validate semantic HTML structure with accessibility tools

**Checkpoint**: Full WCAG AA accessibility compliance achieved

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T031 [P] Validate BaseLayout component against interface contract in contracts/base-layout-interface.md
- [ ] T032 [P] Test cross-browser compatibility (Chrome, Firefox, Safari, Edge) per success criteria
- [ ] T033 Performance optimization - verify Google Fonts load within 2 seconds per SC-001
- [ ] T034 [P] Mobile layout validation - ensure no horizontal scroll on mobile viewports
- [ ] T035 [P] Responsive behavior testing for dynamic viewport changes (device rotation)
- [ ] T036 Manual testing validation using quickstart.md checklist
- [ ] T037 [P] Final code cleanup and documentation updates

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P2)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Desktop Navigation - Can start after Foundational (Phase 2), no dependencies on other stories
- **User Story 2 (P1)**: Mobile Navigation - Can start after Foundational (Phase 2), may reference US1 components but independently testable
- **User Story 3 (P2)**: Accessibility - Can start after Foundational (Phase 2), enhances US1/US2 but independently validatable

### Within Each User Story

- Components before layouts
- CSS structure before JavaScript enhancement
- Core implementation before accessibility enhancements
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel (different file validation)
- **Phase 2**: T005 and T006 can run in parallel (different concerns)
- **User Story 1**: T009 and T010 can run in parallel (different files)
- **User Story 2**: T016, T017, and T019 can run in parallel (different components)
- **User Story 3**: T024 and T025 can run in parallel (different aspects)
- **Phase 6**: T031, T032, T034, T035, T037 can run in parallel (different validation areas)

### Critical Path

```
Phase 1 → Phase 2 → [US1 + US2 in parallel] → US3 → Phase 6
```

---

## Parallel Example: User Story 2 (Mobile Navigation)

```bash
# These tasks can run simultaneously:
- Developer A: T016 (hamburger button component)
- Developer A: T017 (CSS drawer animation)
- Developer B: T019 (back-to-top button component)

# Then these depend on T016+T017:
- T018 (state management)
- T021 (viewport detection)
- T023 (JS-disabled fallback)

# T020 depends on T019:
- T020 (scroll detection for back-to-top)

# T022 can run independently:
- T022 (no footer on mobile)
```

---

## MVP Definition

**Minimum Viable Product**: Phase 3 (User Story 1) + Phase 4 (User Story 2)

- Desktop navigation experience fully functional
- Mobile responsive navigation and interactions working
- Basic accessibility through semantic HTML
- Can defer Phase 5 (enhanced accessibility) to later iteration if needed

**Suggested Delivery Order**:

1. MVP: US1 + US2 (both P1 priority)
2. Enhanced: US3 (P2 accessibility improvements)
3. Polish: Cross-cutting concerns and optimization

---

## Implementation Strategy

**Iterative Delivery**: Each user story represents a deployable increment

- **US1 Complete**: Desktop users have full navigation experience
- **US1 + US2 Complete**: Both desktop and mobile users have full experience
- **US1 + US2 + US3 Complete**: Accessible to all users including those with disabilities

**Testing Approach**: Manual validation per constitution

- Use browser dev tools for responsive testing
- Manual keyboard navigation testing
- Screen reader testing for accessibility validation
- Cross-browser manual testing on target browsers

**Performance Validation**:

- Web Vitals measurement for font loading performance
- Manual mobile testing for touch targets and usability
- Accessibility tool validation for WCAG AA compliance
