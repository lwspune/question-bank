import { buildSearchParams, type Filters } from "./filters";

/**
 * Constructs an absolute, shareable URL for the current /browse filter state.
 * Thin wrapper around buildSearchParams that prepends the user's origin and
 * trims duplicate slashes.
 */
export function buildShareUrl(filters: Filters, origin: string): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  const params = buildSearchParams(filters).toString();
  return params
    ? `${cleanOrigin}/browse?${params}`
    : `${cleanOrigin}/browse`;
}
