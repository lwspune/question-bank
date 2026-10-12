/**
 * `/login?next=<this exact page>`: where a sign-in link sends a visitor, so
 * that signing in returns them to the page they were reading.
 */
export function signInHref(pathname: string | null, search: string): string {
  const path = pathname ?? "/browse";
  const next = search ? `${path}?${search}` : path;
  return `/login?next=${encodeURIComponent(next)}`;
}

/** Pages where signing in should land on the signed-in home, not come back. */
const NO_RETURN = new Set(["/", "/login", "/signup", "/welcome"]);

/**
 * Where the header's Sign in (and other general sign-in links) send a visitor:
 * back to this page, except from the home page and the sign-in pages
 * themselves, where plain /login lands a student on /me as before.
 */
export function headerSignInHref(pathname: string | null, search: string): string {
  if (pathname === null) return "/login";
  const path = pathname.replace(/\/+$/, "") || "/";
  if (NO_RETURN.has(path)) return "/login";
  return signInHref(path, search);
}
