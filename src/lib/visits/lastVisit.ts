/**
 * The last notes topic or chapter page a visitor read, kept in their own
 * browser so the homepage can offer "Continue" when they come back signed out
 * (signed-in students never see the homepage; /me has its own continue card).
 *
 * Read back from localStorage, so it is untrusted: only a same-site path is
 * accepted (never "//host" or a scheme), the title must be plain text of sane
 * length, and a visit older than MAX_AGE_DAYS is forgotten.
 *
 * Pure. Spec: tests/personalise-helpers.test.ts.
 */
export const LAST_VISIT_KEY = "qb_last_visit";
const MAX_AGE_DAYS = 60;

export type LastVisitKind = "notes" | "chapter";
export type LastVisit = { href: string; title: string; kind: LastVisitKind; at: number };

export function serializeLastVisit(v: Omit<LastVisit, "at">, now: number): string {
  return JSON.stringify({ href: v.href, title: v.title, kind: v.kind, at: now });
}

export function parseLastVisit(raw: string | null, now: number): LastVisit | null {
  if (!raw) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!v || typeof v !== "object") return null;
  const { href, title, kind, at } = v as Record<string, unknown>;
  if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return null;
  if (typeof title !== "string" || title.trim().length === 0 || title.length > 120) return null;
  if (kind !== "notes" && kind !== "chapter") return null;
  if (typeof at !== "number" || now - at > MAX_AGE_DAYS * 86_400_000) return null;
  return { href, title: title.trim(), kind, at };
}
