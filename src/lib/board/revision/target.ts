/**
 * The chapter a board revision-sheet download names (2026-11-03): its /board
 * URL parts. Pure, no registry import; whether a sheet EXISTS is the route's
 * question. Spec: tests/board-revision-target.test.ts.
 */

export type RevisionTarget = { examSlug: string; subjectRoute: string; chapterSlug: string };

const SLUG = /^[a-z0-9][a-z0-9-]{0,119}$/;

export function parseRevisionTarget(v: unknown): RevisionTarget | null {
  if (!v || typeof v !== "object") return null;
  const { examSlug, subjectRoute, chapterSlug } = v as Record<string, unknown>;
  for (const s of [examSlug, subjectRoute, chapterSlug]) if (typeof s !== "string" || !SLUG.test(s)) return null;
  return { examSlug, subjectRoute, chapterSlug } as RevisionTarget;
}
