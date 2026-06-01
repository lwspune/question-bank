/**
 * "Back to notes" return-target plumbing for /browse.
 *
 * When a student clicks a "Drill these questions →" link from a /notes or
 * /guide page, the link carries a `from=` (and optional `fromLabel=`) query
 * param. /browse captures it into sessionStorage so a floating "← Back to …"
 * pill can return them to the exact spot they were studying — surviving
 * pagination + further filtering (which drop the param from the URL).
 *
 * Pure helpers only — no DOM, no storage — so they're unit-testable. The
 * client component (BackToNotes) owns the sessionStorage + window access.
 */

/** Versioned sessionStorage key holding the serialized {@link ReturnTarget}. */
export const RETURN_TO_KEY = "qb:returnTo:v1";

export type ReturnTarget = { href: string; label: string };

/**
 * True when `path` is a safe in-app return target: a root-relative path into
 * the /notes or /guide subtrees. Rejects absolute URLs, protocol-relative
 * URLs ("//host"), and backslash tricks so a crafted `?from=` can't turn the
 * back-link into an open redirect.
 */
export function isSafeReturnPath(path: string | null | undefined): boolean {
  if (!path) return false;
  if (!path.startsWith("/")) return false; // must be root-relative
  if (path.startsWith("//")) return false; // protocol-relative
  if (path.includes("://")) return false; // belt-and-suspenders
  if (path.includes("\\")) return false; // backslash escapes
  return path.startsWith("/notes/") || path.startsWith("/guide/");
}

/**
 * Parse the back-target out of a /browse query string (with or without the
 * leading "?"). Returns null when there's no `from` param or it fails the
 * safe-path guard. `fromLabel` is optional and falls back to a generic label.
 */
export function parseReturnTarget(search: string): ReturnTarget | null {
  const params = new URLSearchParams(search);
  const from = params.get("from");
  if (!isSafeReturnPath(from)) return null;
  const label = params.get("fromLabel")?.trim() || "your notes";
  return { href: from as string, label };
}
