export interface NavItem {
  label: string;
  href: string;
}

function withLeadingSlash(value: string): string {
  if (!value) {
    return "/";
  }
  return value.startsWith("/") ? value : `/${value}`;
}

function withoutTrailingSlash(value: string): string {
  if (value.length <= 1) {
    return value;
  }
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function normalizeBasePath(rawBasePath?: string): string {
  const cleaned = (rawBasePath ?? "").trim();
  if (!cleaned || cleaned === "/") {
    return "";
  }
  return withoutTrailingSlash(withLeadingSlash(cleaned));
}

export function resolveInternalHref(href: string, basePath?: string): string {
  const normalizedBase = normalizeBasePath(basePath);
  const normalizedHref = withoutTrailingSlash(withLeadingSlash(href));

  if (!normalizedBase) {
    return normalizedHref === "" ? "/" : normalizedHref;
  }

  if (normalizedHref === "/") {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}${normalizedHref}`;
}

export function getCurrentPath(pathname: string, basePath?: string): string {
  const normalizedBase = normalizeBasePath(basePath);
  const safePathname = pathname || "/";

  if (!normalizedBase) {
    return safePathname;
  }

  if (safePathname.startsWith(`${normalizedBase}/`)) {
    const stripped = safePathname.slice(normalizedBase.length);
    return stripped || "/";
  }

  if (safePathname === normalizedBase) {
    return "/";
  }

  return safePathname;
}
