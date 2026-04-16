# Quickstart: UI Base Components

## Objetivo

Implementar y validar los componentes base UI en Astro 6 + Tailwind 4 dentro de `src/components/ui/`.

## Prerrequisitos

- Bun instalado.
- Dependencias del proyecto instaladas.
- Feature spec y plan aprobados.

## 1. Instalar dependencias (si aplica)

```bash
bun install
```

## 2. Crear/actualizar componentes

Crear o actualizar los siguientes archivos:

- `src/components/ui/Button.astro`
- `src/components/ui/Card.astro`
- `src/components/ui/Table.astro`
- `src/components/ui/Navigation.astro`

## 3. Reglas de implementación

- Mobile-first:
  - móvil: `<640px`
  - tablet: `640-1024px`
  - desktop: `>1024px`
- Diseño:
  - bordes asimétricos: `rounded-t-xl rounded-b-lg`
  - sombras solo hover: `shadow-sm` -> `hover:shadow-md`
  - transición: `duration-200`
  - paleta: `#C86405`, `#4A7C59`, `#F5F1E6`, `#2C2C2C`
  - tipografía: Manrope (headings), Inter (body)
- Accesibilidad:
  - contraste WCAG AA 4.5:1
  - focus visible uniforme en elementos interactivos
  - menú hamburguesa: `aria-expanded`, `aria-controls`, etiqueta dinámica
  - incluir skip link para contenido principal
  - touch targets >=44x44px en móvil
- Interacciones:
  - HTMX para menú hamburguesa/toggles ligeros
  - fallback sin JS: navegación visible sin hamburguesa
- Datos:
  - usar JSON local en `src/data/`
  - cuando no haya datos: mostrar estado vacío con mensaje + CTA secundaria

## 4. GitHub Pages (subruta)

- Definir base path por variable de entorno con fallback seguro.
- Resolver enlaces internos con contexto de Astro para evitar roturas en subruta.
- Ajustar `astro.config.ts` para modo estático al preparar deploy.

## 5. Ejecutar en local

```bash
bun run dev
```

## 6. Validación manual (sin tests automáticos)

- Verificar variantes de Button/Card/Table/Navigation.
- Verificar responsive en móvil/tablet/desktop.
- Verificar navegación con teclado y foco visible.
- Verificar contraste AA y atributos ARIA.
- Verificar fallback sin JS en navegación móvil.
- Verificar rutas bajo base path de subruta.

### 6.1 Validación obligatoria con Playwright-CLI (localhost)

1. Levantar app en local:

```bash
bun run dev
```

2. Abrir navegador controlado por Playwright-CLI para validación manual:

```bash
bunx playwright open http://localhost:4321
```

3. Verificar manualmente en Playwright-CLI:

- navegación desktop y móvil
- menú hamburguesa con ARIA y fallback sin JS
- focus-visible uniforme
- contraste AA en textos relevantes

### 6.2 Protocolo de medición para SC-002 (<20s)

- Muestra mínima: 10 ejecuciones manuales (5 desktop, 5 móvil).
- Tarea medida: abrir menú principal y navegar al destino objetivo.
- Criterio de éxito: al menos 95% de ejecuciones completadas en menos de 20 segundos.
- Registro: anotar tiempo por ejecución y resumen final en este documento.

## 7. Build de verificación

```bash
bun run build
```

## Resultado esperado

Componentes base reutilizables, consistentes visualmente, accesibles, mobile-first y compatibles con despliegue en GitHub Pages en subruta.
