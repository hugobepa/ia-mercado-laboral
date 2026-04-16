import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const method = context.request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    return next();
  }

  const url = new URL(context.request.url);
  const { pathname, search } = url;

  if (pathname === "/grafico" || pathname === "/grafico/") {
    return context.redirect(`/graficos/${search}`, 308);
  }

  // Ignore root, API routes, and file-like paths.
  if (
    pathname === "/" ||
    pathname.startsWith("/api") ||
    pathname.endsWith("/") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return next();
  }

  return context.redirect(`${pathname}/${search}`, 308);
});
