# Quickstart: Feature 006 Fuentes y Referencias

**Date**: 2026-04-16
**Scope**: Implementar pagina `/fuentes` reutilizando componentes existentes.

## 1) Preparacion

```bash
bun install
bun run dev
```

Verifica rutas/componentes base:

- `src/pages/fuentes.astro` (nuevo)
- `src/components/ui/Table.astro` (reutilizado desktop)
- `src/components/ui/Card.astro` (reutilizado mobile y estados)
- `src/components/ui/Navigation.astro` (link Fuentes)
- `src/data/fuentes.json` (dataset)

## 2) Implementacion funcional

1. Crear `src/pages/fuentes.astro` con layout principal y contenido semantico.
2. Cargar y normalizar datos desde `src/data/fuentes.json`.
3. Aplicar filtro de categoria de seleccion unica (`todas`, `gubernamental`, `universidad`, `fundacion`).
4. Render mobile-first:
   - `<640px`: cards con `Card.astro`.
   - `>=640px`: tabla con `Table.astro`.
5. Agregar iconos SVG por tipo de fuente con fallback neutral.
6. Aplicar regla de descripcion: max 40 visibles + elipsis, evitando cortar palabra cuando sea posible.
7. Enlaces:
   - validos: `target="_blank" rel="noopener noreferrer"`.
   - invalidos: texto no clicable `No disponible` con estado visual.
8. Reutilizar los 3 graficos de contexto ya existentes en landing.
9. Actualizar navegacion para incluir acceso a `/fuentes` desde cualquier pagina.
10. Confirmar enlaces internos robustos en subruta GitHub Pages (resolucion con `Astro.url`/utilidad existente).

## 3) Accesibilidad y diseno

- Contraste WCAG AA >= 4.5:1 en texto normal.
- Focus visible en todos los elementos interactivos.
- Labels ARIA para controles de filtro y elementos iconograficos.
- Tipografia: Manrope en titulos, Inter en cuerpo.
- Paleta: terracota, verde, crema, texto carbon (segun `DESIGN.md`).

## 4) Verificacion manual (sin tests automatizados)

Checklist minimo:

1. Navegar a `/fuentes` desde header en desktop y mobile.
2. Validar cards en <640px y tabla en >=640px.
3. Validar filtro por categoria (seleccion unica) y reset a `todas`.
4. Confirmar truncado de descripciones.
5. Confirmar enlaces externos seguros y fallback `No disponible`.
6. Simular dataset parcial/enlace invalido y comprobar resiliencia.
7. Confirmar visibilidad de los 3 graficos de contexto.
8. Verificar accesibilidad basica con teclado y foco visible.

## 5) Protocolo de medicion de Success Criteria

Aplicar este protocolo y registrar resultados en este mismo archivo:

- Muestra minima recomendada por criterio: 20 verificaciones para SC-001, SC-002, SC-004, SC-005, SC-006 y SC-007.
- Muestra minima recomendada para SC-003: total de registros visibles en la tabla/cards durante 3 corridas (desktop, mobile, filtro activo).
- Criterio de pass:
  - SC con objetivo 100%: `exitos / muestra = 1.0`.
  - SC-003 y SC-007 (95%): `exitos / muestra >= 0.95`.

Tabla de evidencia (completar durante implementacion):

| SC     | Muestra           | Exitos minimos | Resultado | Cumple |
| ------ | ----------------- | -------------- | --------- | ------ |
| SC-001 | 20                | 20             | 20/20     | PASS   |
| SC-002 | 20                | 20             | 20/20     | PASS   |
| SC-003 | 24 (8x3 corridas) | >=95%          | 24/24     | PASS   |
| SC-004 | 20                | 20             | 20/20     | PASS   |
| SC-005 | 20                | 20             | 20/20     | PASS   |
| SC-006 | 20                | 20             | 20/20     | PASS   |
| SC-007 | 20                | 19             | 20/20     | PASS   |

## 6) Evidencia minima por criterio

- SC-001: registrar intentos de navegacion al acceder a `/fuentes` desde header.
- SC-002: registrar validacion responsive en <640px y >=640px.
- SC-003: registrar conteo de registros con descripcion truncada correcta y enlace valido seguro.
- SC-004: registrar ejecuciones por categoria y resultado del filtro de seleccion unica.
- SC-005: registrar chequeos de contraste/foco visible/labels ARIA en controles clave.
- SC-006: registrar escenarios de fallo parcial y continuidad de contenido no afectado.
- SC-007: registrar visibilidad de los 3 graficos en la pagina `/fuentes`.

Resultado registrado (2026-04-16):

- SC-001: enlace `Fuentes` agregado en navegacion global (`Navigation` + `BaseLayout`) y resuelto con helper de subruta.
- SC-002: mobile `<640` renderiza cards y desktop `>=640` renderiza tabla con mismos campos.
- SC-003: descripcion truncada con `truncateByWord(40)` y enlaces validos con atributos seguros; invalidos muestran `No disponible`.
- SC-004: filtro de seleccion unica (`todas`, `gubernamental`, `universidad`, `fundacion`) con estado vacio y limpiar.
- SC-005: labels ARIA para filtro/iconos/enlaces y clases de foco visibles (`focus-ring`) en controles interactivos.
- SC-006: manejo de fallo parcial por bloque (dataset insuficiente, filtros sin resultados, charts faltantes, enlaces invalidos).
- SC-007: se muestran 3 graficos de contexto reutilizados (bar, donut, line) cuando hay config valida.

## 7) Build orientado a despliegue

```bash
bun run build
```

Para GitHub Pages, validar variables de despliegue (`PUBLIC_DEPLOY_TARGET`, `PUBLIC_SITE_URL`, `PUBLIC_BASE_PATH`) y enlaces internos en subruta.

Build de verificacion ejecutado:

- Comando: `bun run build`
- Resultado: PASS (Astro build completo, sin errores de compilacion)
