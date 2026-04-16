# Landing: Página Principal

## Short name

landing-main

## Summary

Crear la especificación para la landing principal del proyecto: objetivo, actores, flujos, requisitos funcionales y criterios de aceptación.

## Actors

- Usuario visitante (no autenticado)
- Desarrollador/Editor (actualiza datos JSON vía Git y redepliegue)

## Actions / Flows

1. Usuario visita la landing.
2. Usuario consulta datos y gráficos consolidados (défault: todas las provincias).
3. Usuario selecciona provincia específica desde dropdown → las gráficas se actualizan dinámicamente sin recarga.
4. Desarrollador actualiza archivos JSON en src/data/ → commit → redepliegue → datos actualizados en producción.

## Functional requirements

- La página debe mostrar una vista consolidada con datos de empleo por provincias catalanas (Idescat), tendencias del mercado laboral nacional (Randstad 2024), y contexto internacional (OECD 2023).
- Las gráficas deben cargarse progresivamente y ser accesibles, mostrando comparativas entre fuentes cuando sea relevante.
- La página debe ser responsive y cumplir WCAG AA.

## Success criteria

### Measurable Outcomes

- **Core Web Vitals - Móvil**: LCP ≤2.5s, CLS ≤0.1, FID ≤100ms en conexión 3G simulada.
- **Core Web Vitals - Desktop**: LCP ≤1.5s, CLS ≤0.1, FID ≤100ms.
- **Usabilidad**: Usuarios pueden encontrar datos por provincia en menos de 3 clicks.
- **Navegación**: 95% de las transiciones entre filtros completadas sin errores de carga.

## Assumptions

- No autenticación requerida para visitantes.
- Datos provienen de `src/data`.

## Acceptance scenarios

- Dado que un usuario visita la landing, entonces ve el hero, skeletons de gráficas durante la carga, y las gráficas completamente renderizadas al finalizar.
- Dado que un usuario filtra por provincia, entonces las gráficas se actualizan con los datos filtrados mostrando skeletons durante la transición.
- Dado que falla la carga de datos, entonces el usuario ve un mensaje de error claro con botón "Reintentar" que permite volver a cargar los datos.

## Edge Cases

- **Error de carga de datos**: Mostrar mensaje "Error al cargar los datos. Inténtalo de nuevo." con botón de reintento.
- **Carga lenta**: Skeletons de gráficas permanecen visibles hasta que los datos están listos para renderizar.
- **Datos vacíos**: Mostrar mensaje "No hay datos disponibles para esta selección" cuando el filtro no devuelve resultados.

## Notes

- Seguir las directrices de accesibilidad: skip link, focus visible, contraste >= 4.5.

## Clarifications

### Session 2026-04-14

- Q: ¿Qué tipos específicos de datos del mercado laboral debe mostrar la landing principal? → A: Vista consolidada: empleo por provincias + tendencias nacionales + datos Randstad
- Q: ¿Cómo debe funcionar exactamente el filtrado por provincia en la interfaz? → A: Selector dropdown con actualización dinámica de gráficas sin recarga
- Q: ¿Qué estados de carga y error debe mostrar la aplicación mientras se cargan los datos? → A: Skeletons para gráficas + mensaje de error con botón de reintento si fallan
- Q: ¿Cómo debe funcionar exactamente la "actualización desde CMS" mencionada para el editor de contenido? → A: Datos estáticos (JSON en src/data/) - "CMS" es actualizar archivos vía Git/deploy
- Q: ¿Cuáles deben ser los objetivos específicos de rendimiento para Core Web Vitals y dispositivos móviles? → A: LCP ≤2.5s, CLS ≤0.1, FID ≤100ms en conexión 3G móvil; ≤1.5s LCP desktop
