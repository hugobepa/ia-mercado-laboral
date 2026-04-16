# Quickstart: Landing IA Mercado

## Prerequisites

- Bun instalado
- Dependencias del proyecto instaladas
- Datasets JSON presentes en `src/data/`

## 1. Instalar dependencias

```bash
bun install
```

## 2. Ejecutar en desarrollo

```bash
bun run dev
```

## 3. Alcance de implementación

Actualizar/ensamblar en:

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/ui/Navigation.astro`
- `src/components/sections/Hero.astro`
- `src/components/sections/DataSection.astro`
- `src/components/sections/ProvinceCards.astro`

## 4. Datos obligatorios

- `src/data/randstad-catalunya.json`
- `src/data/idescat-provincias.json`
- `src/data/charts-config.json`

## 5. Contratos funcionales clave

- IDs/anclas de secciones: `#inicio`, `#datos`, `#sectores`, `#provincias`.
- Navegación principal en orden: Inicio, Datos, Gráficos, Provincias.
- CTA del Hero hacia `#datos`.
- Sub-bloque de sectores dentro de `#datos`.
- En móvil: menú hamburguesa y footer oculto.
- Botón volver arriba visible solo con `scrollY > 300px`.

## 6. Validacion manual (sin testing automatizado)

### Layout y responsive

- Mobile (<640): 1 columna, menú hamburguesa, footer oculto.
- Tablet (640-1024): distribución intermedia, navegación usable.
- Desktop (>1024): composición completa con bloques visibles.

### Datos y contenido

- KPIs de Cataluña visibles.
- Tres gráficas visibles (barra, donut, línea anual).
- Provincias en orden fijo Barcelona, Girona, Lleida, Tarragona.
- Placeholders visibles cuando falten datos de provincia.

### Accesibilidad

- Foco visible en enlaces/botones/CTA.
- Contraste legible de texto sobre fondos de la paleta.
- Navegación por teclado en menú, CTA y volver arriba.

### Rutas y subruta

- Enlaces internos funcionando en local y en contexto GitHub Pages.
- Resolución de enlaces usando helpers path-aware con `Astro.url.pathname`.

## 7. Protocolo obligatorio Playwright-CLI (SC-001 y SC-002)

Ejecutar validacion manual asistida por Playwright-CLI en localhost para registrar evidencia cuantitativa:

1. Levantar app en local con `bun run dev`.
2. Ejecutar 20 cargas manuales (refresh completo por corrida) y registrar en cada corrida si se ven header + Hero + CTA sin interaccion adicional (SC-001).
3. Ejecutar 20 validaciones visuales del bloque `#datos` y registrar en cada corrida si se muestran barra + donut + linea anual (SC-002).
4. Consolidar resultados en una tabla de evidencia dentro de este archivo.

Formato minimo sugerido de evidencia:

| Criterio                    | Muestra | Exitos minimos | Resultado | Cumple    |
| --------------------------- | ------- | -------------- | --------- | --------- |
| SC-001 Header+Hero+CTA      | 20      | 19             | pendiente | pendiente |
| SC-002 3 graficas en #datos | 20      | 19             | pendiente | pendiente |

## 8. Validacion de build

```bash
bun run build
```

## 9. Fuera de alcance

- Unit tests
- Integration tests
- E2E tests
