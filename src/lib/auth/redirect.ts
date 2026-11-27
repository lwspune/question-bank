/**
 * Open-redirect guard for the `?next=` login round-trip. A `next` value comes
 * straight from the URL, so it must be constrained to a SAME-ORIGIN absolute
 * path before we hand it to `router.replace` — otherwise `?next=https://evil.com`
 * (or the protocol-relative `//evil.com`) would bounce a freshly-authenticated
 * user off-site. Pure — unit-tested in tests/auth-redirect.test.ts.
 *
 * Allowed: a string starting with a single "/" (e.g. "/me", "/browse?x=1").
 * Rejected → fallback: non-strings, external URLs, "//host", "/\host", and
 * anything not beginning with a slash.
 */
export function safeNextPath(raw: unknown, fallback = "/browse"): string {
  if (typeof raw !== "string") return fallback;
  if (!raw.startsWith("/")) return fallback;
  // Protocol-relative ("//host") and backslash ("/\host") both resolve to an
  // external origin in a browser. Strip any leading whitespace/control chars
  // first (browsers ignore them in URLs) so "/\t//host" can't sneak past.
  const rest = raw.slice(1).replace(/^\s+/, "");
  if (rest.startsWith("/") || rest.startsWith("\\")) return fallback;
  return raw;
}

/**
 * The other auth page's link, keeping where the student was going: /signup's
 * "Sign in" and /login's "Create one" drop `next` otherwise, so a student sent
 * to sign up who already has an account lost their way back. An unsafe or
 * empty next leaves the link bare.
 */
export function withNext(path: string, next: string | null): string {
  const safe = safeNextPath(next, "");
  return safe === "" ? path : `${path}?next=${encodeURIComponent(safe)}`;
}

/**
 * A `next` that is a route handler (e.g. /api/partner-course/[id], which
 * redirects off-site) must be opened with a full page load: a client
 * navigation fetches it in the background and cannot follow that redirect.
 */
export function needsFullLoad(path: string): boolean {
  return path.startsWith("/api/");
}

/** An org role, or null for a signed-in person with no org membership (a student). */
export type OrgRole = "ADMIN" | "TEACHER" | null;

/**
 * Where a signed-in person lands when nothing else was asked for. The same
 * routing /dashboard applies to whoever reaches it, so a caller that knows the
 * role sends people straight there: before 2026-10-06 every student login went
 * through /dashboard only to be redirected to /me (Clarity recordings).
 */
export function signedInHome(role: OrgRole): string {
  if (role === "ADMIN") return "/dashboard";
  if (role === "TEACHER") return "/browse";
  return "/me";
}

const AUTH_PAGES = ["/login", "/signup"];

function isAuthPage(path: string): boolean {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  return AUTH_PAGES.includes(pathname);
}

/**
 * Where a SIGNED-IN visitor to /login or /signup should be sent instead of
 * seeing the form again: their safe `?next=`, else /dashboard (which routes
 * students to /me and staff to their console). Returns null for any other
 * path. A `next` that points back at an auth page falls back too, so the
 * middleware can never redirect in a loop. Pure — tests/auth-redirect.test.ts.
 */
export function signedInAuthPageRedirect(
  pathname: string,
  next: string | null
): string | null {
  if (!isAuthPage(pathname)) return null;
  const target = safeNextPath(next, "/dashboard");
  return isAuthPage(target) ? "/dashboard" : target;
}
