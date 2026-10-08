/**
 * Exams that belong to a niche site, never to PYQ Vault (NICHE_SITES_SPEC.md).
 *
 * A NAMED list on purpose, not "anything missing from EXAM_REGISTRY": /browse
 * keeps listing an exam that was ingested before anyone registered it (see
 * FilterBar), and that rule must keep working for PYQ Vault's own exams.
 *
 * Names are the `exams.name` values in the database. This list becomes part
 * of the niche-site registry (`lib/sites/registry.ts`) when that is built.
 */
export const NICHE_EXAM_NAMES: ReadonlySet<string> = new Set(["IMAT"]);

export function isNicheExam(examName: string): boolean {
  return NICHE_EXAM_NAMES.has(examName);
}

/** The rows a PYQ Vault surface may list: every exam except niche-site ones. */
export function withoutNicheExams<T extends { name: string }>(rows: readonly T[]): T[] {
  return rows.filter((row) => !isNicheExam(row.name));
}
