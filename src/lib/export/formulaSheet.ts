/**
 * The chapter a formula-sheet download names (2026-10-10): `{ subjectRoute,
 * chapterSlug }` as the /notes registry spells them, or the one-string form
 * "<subjectRoute>/<chapterSlug>" the access endpoint receives in a query.
 *
 * Pure, no registry import: the download route and GET /api/export/access
 * both parse here, and the access endpoint must stay out of the registry's
 * 1,884 data modules. Whether the chapter EXISTS is the route's question.
 * Spec: tests/formula-sheet-target.test.ts.
 */

export type FormulaSheetTarget = { subjectRoute: string; chapterSlug: string };

const SLUG = /^[a-z0-9][a-z0-9-]{0,119}$/;

export function parseFormulaSheetTarget(v: unknown): FormulaSheetTarget | null {
  let subjectRoute: unknown;
  let chapterSlug: unknown;
  if (typeof v === "string") {
    const parts = v.split("/");
    if (parts.length !== 2) return null;
    [subjectRoute, chapterSlug] = parts;
  } else if (v && typeof v === "object") {
    ({ subjectRoute, chapterSlug } = v as Record<string, unknown>);
  } else {
    return null;
  }
  if (typeof subjectRoute !== "string" || typeof chapterSlug !== "string") return null;
  if (!SLUG.test(subjectRoute) || !SLUG.test(chapterSlug)) return null;
  return { subjectRoute, chapterSlug };
}

/** The free-sheet key: one string per chapter, in its own namespace from the paper keys. */
export function formulaSheetKey(t: FormulaSheetTarget): string {
  return `formula:${t.subjectRoute}/${t.chapterSlug}`;
}
