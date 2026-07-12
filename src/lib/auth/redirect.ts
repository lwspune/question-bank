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
