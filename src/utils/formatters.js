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

export function formatTextOrFallback(value, fallback = "Datos no disponibles") {
  const safeValue = typeof value === "string" ? value.trim() : "";
  return safeValue.length > 0 ? safeValue : fallback;
}

export function formatNumberOrFallback(
  value,
  fallback = "Datos no disponibles",
) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return fallback;
  }
  return numericValue.toLocaleString("es-ES");
}

export function formatPercentOrFallback(
  value,
  fallback = "Datos no disponibles",
) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return fallback;
  }
  return `${numericValue}%`;
}

export function truncateByWord(value, maxLength = 40) {
  const text = formatTextOrFallback(value, "").trim();
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  const safeSlice = text.slice(0, maxLength).trimEnd();
  const lastSpace = safeSlice.lastIndexOf(" ");
  const base = lastSpace > 0 ? safeSlice.slice(0, lastSpace) : safeSlice;
  return `${base}...`;
}

export function isValidExternalUrl(value) {
  const candidate = typeof value === "string" ? value.trim() : "";
  if (!candidate) {
    return false;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
