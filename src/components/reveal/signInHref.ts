/**
 * `/login?next=<this exact page>`: where a sign-in link sends a visitor, so
 * that signing in returns them to the page they were reading.
 */
export function signInHref(pathname: string | null, search: string): string {
  const path = pathname ?? "/browse";
  const next = search ? `${path}?${search}` : path;
  return `/login?next=${encodeURIComponent(next)}`;
}
