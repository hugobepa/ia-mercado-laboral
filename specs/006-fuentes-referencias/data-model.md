# Data Model: Fuentes y Referencias

**Date**: 2026-04-16
**Status**: Complete
**Context**: Phase 1 entity and validation design

## Entity: FuenteReferencia

```ts
interface FuenteReferencia {
  nombre: string;
  tipo: string;
  categoria: "gubernamental" | "universidad" | "fundacion" | "otros";
  fuente: string;
  descripcion: string;
  link: string;
  anio?: number;
}
```

Validation rules:

- `nombre`, `tipo`, `fuente` required and non-empty after trim.
- `categoria` outside known set maps to `otros`.
- `descripcion` rendered as max 40 visible chars with ellipsis.
- `link` invalid => expose non-clickable `No disponible` state.

## Entity: CategoriaFiltro

```ts
type CategoriaFiltro = "todas" | "gubernamental" | "universidad" | "fundacion";
```

Validation rules:

- Single selection only.
- Unknown input falls back to `todas`.

## Entity: EstadoFuente

```ts
type EstadoFuente = "disponible" | "no-disponible" | "datos-insuficientes";
```

State derivation:

- `disponible`: registro valido y enlace valido.
- `no-disponible`: registro presente con enlace invalido o vacio.
- `datos-insuficientes`: dataset total valido < 8 registros.

## Entity: IconoTipoFuente

```ts
interface IconoTipoFuente {
  tipo: string;
  iconId: "empleo" | "economico" | "metodologia" | "neutral";
  ariaLabel: string;
}
```

Validation rules:

- Unknown `tipo` maps to `neutral`.
- Every rendered icon must include accessible text/label.

## Derived View Models

```ts
interface FuenteRowView {
  estudio: string;
  tipo: string;
  categoria: Exclude<CategoriaFiltro, "todas"> | "otros";
  fuente: string;
  descripcionCorta: string;
  enlace: { href?: string; texto: string; clickable: boolean };
  estado: EstadoFuente;
  icono: IconoTipoFuente;
}
```

## Relationships

- `CategoriaFiltro` filters many `FuenteReferencia`.
- `FuenteReferencia` derives one `EstadoFuente`.
- `FuenteReferencia.tipo` maps to one `IconoTipoFuente`.

## Data Source

- Canonical source: `src/data/fuentes.json`.
- Expected minimum: 8 valid registros para estado nominal.
