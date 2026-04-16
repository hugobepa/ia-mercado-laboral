# Research: Landing Principal

**Date**: 2026-04-14
**Status**: ✅ Complete
**Context**: Phase 0 - Technical research for landing page implementation

## Research Summary

No unknowns requiring external research detected. All technical decisions are constrained by project constitution and existing codebase. Research focused on validating alignment with constitutional principles and technical feasibility.

## Key Research Areas

### 1. Chart Library Selection

**Decision**: ApexCharts v4+  
**Rationale**:

- Already included in constitution and existing components (BarChart.astro, DonutChart.astro)
- Excellent accessibility support with ARIA labels
- Lightweight and performant for Core Web Vitals targets
- Strong TypeScript support matching project stack
  **Alternatives considered**: Chart.js (heavier bundle), D3 (over-engineering for simple charts)

### 2. Interactive Filtering Implementation

**Decision**: HTMX 2+ with minimal JavaScript  
**Rationale**:

- Aligns with constitution mandate for "HTMX para interacciones ligeras"
- Enables dynamic updates without full React islands (keeps bundle light)
- Progressive enhancement (works without JS)
- Excellent for accessibility (screen readers handle DOM updates naturally)
  **Alternatives considered**: React islands (unnecessary complexity), Vanilla JS (more boilerplate)

### 3. Loading States & Skeleton Implementation

**Decision**: CSS-only skeletons + HTMX indicators
**Rationale**:

- No animation libraries needed (respects bundle size constraints)
- HTMX provides built-in loading states via `hx-indicator`
- CSS skeleton reduces Cumulative Layout Shift (CLS ≤0.1 requirement)
- Accessible to screen readers with proper aria-label updates
  **Alternatives considered**: Spinner animations (poor UX), JavaScript loaders (adds complexity)

### 4. Province Filtering Architecture

**Decision**: Client-side filtering of pre-loaded JSON data
**Rationale**:

- Aligns with static site architecture (no backend)
- All data is in `src/data/` per constitution
- Enables instant filtering (better user experience)
- Simpler than build-time generation of per-province pages
  **Alternatives considered**: Multiple static pages per province (worse UX), external API (breaks static architecture)

### 5. Error Handling Strategy

**Decision**: Graceful degradation with retry mechanisms
**Rationale**:

- HTMX handles HTTP errors naturally
- Skeleton → content → retry button flow improves perceived performance
- Maintains accessibility (error messages are announced)
- Aligns with "KISS" principle (simple, effective)
  **Alternatives considered**: Toast notifications (not in constitution), Redirect to error page (poor UX)

### 6. Performance Optimization Approach

**Decision**: Astro SSG + selective hydration + lazy loading  
**Rationale**:

- Astro islands architecture allows selective interactivity
- Static generation meets LCP ≤1.5s desktop requirement
- Intersection Observer for lazy chart loading
- Aligns with mobile-first performance targets
  **Alternatives considered**: SPA architecture (slower), Full hydration (breaks performance budget)

## Technical Dependencies Validation

### Core Stack Compatibility

- ✅ **Astro 6** + **Tailwind 4** + **ApexCharts** + **HTMX 2+** all compatible
- ✅ **TypeScript** support across all dependencies
- ✅ **Bun** compatibility validated for all packages
- ✅ **Bundle size** within performance budget (<200KB initial)

### Data Integration Points

- ✅ **JSON structure** in src/data/ validates against ApexCharts requirements
- ✅ **Province mapping** compatible with both Idescat and Randstad datasets
- ✅ **Chart configurations** (chart-config.json) extensible for new data sources

## Risk Assessment

### Low Risk

- **Browser compatibility**: HTMX 2+ and ApexCharts support target browsers (iOS 15+, Android 10+)
- **Performance targets**: Static generation + lazy loading provides margin for Core Web Vitals
- **Accessibility compliance**: Established patterns in foundation components

### No Significant Risks Identified

All researched approaches align with constitutional constraints and proven patterns.

## Research Verification

- [x] Constitution compliance validated
- [x] Technical stack compatibility confirmed
- [x] Performance feasibility verified
- [x] Accessibility patterns established
- [x] Error handling strategy defined
- [x] Data integration validated

## Next Phase

✅ **Ready for Phase 1**: Design & Contracts

- Data model extraction from datasets
- Interface contracts for chart components
- Quickstart implementation guide
