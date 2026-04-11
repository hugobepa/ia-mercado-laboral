export function formatPercent(value) {
  const numericValue = Number(value ?? 0);
  return `${numericValue}%`;
}

export function formatCompactNumber(value) {
  const numericValue = Number(value ?? 0);
  return new Intl.NumberFormat("es-ES", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(numericValue);
}
