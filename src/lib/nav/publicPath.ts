/**
 * The address a visitor SEES, from the pathname a component reads. Pure.
 *
 * Middleware serves some www requests from a cached copy at another route, by
 * rewrite, so the address bar keeps the original:
 *
 * - bare /browse -> /browse-start/<all|exam>  (lib/questions/browseLandingRoute)
 * - /            -> /home-exam/<exam>          (routeHome, lib/supabase/middleware)
 *
 * On the server usePathname() returns the copy's route; in the browser it can
 * return the address bar's. Anything drawn from the pathname then differs
 * between the two, and React discards the cached HTML (error #418). The cached
 * homepage itself reads as `/index`, which this also maps to `/`.
 *
 * A new rewrite needs its line here; tests/public-path.test.ts feeds every
 * middleware rewrite through this and fails on one left unmapped.
 */
const COPIES: ReadonlyArray<readonly [prefix: string, shown: string]> = [
  ["/browse-start", "/browse"],
  ["/home-exam", "/"],
  ["/index", "/"],
];

export function publicPath(pathname: string | null): string {
  if (!pathname) return "/";
  for (const [prefix, shown] of COPIES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return shown;
  }
  return pathname;
}
