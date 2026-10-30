/**
 * Exams that belong to the international site, never to PYQ Vault's www
 * (intl.pyqvault.com, 2026-10-30; NICHE_SITES_SPEC.md).
 *
 * For lists read straight from the `exams` table (the /browse exam dropdown),
 * which only know an exam by its DB name. Registry-driven lists use
 * PYQVAULT_EXAMS / INTL_EXAMS instead.
 *
 * A NAMED list on purpose, not "anything missing from EXAM_REGISTRY": /browse
 * keeps listing an exam that was ingested before anyone registered it (see
 * FilterBar), and that rule must keep working for PYQ Vault's own exams.
 */
import { INTL_EXAMS } from "@/lib/sites/intl";

export const NICHE_EXAM_NAMES: ReadonlySet<string> = new Set<string>(INTL_EXAMS.map((e) => e.examName));

export function isNicheExam(examName: string): boolean {
  return NICHE_EXAM_NAMES.has(examName);
}

/** The rows a PYQ Vault surface may list: every exam except international ones. */
export function withoutNicheExams<T extends { name: string }>(rows: readonly T[]): T[] {
  return rows.filter((row) => !isNicheExam(row.name));
}

/** The rows a site lists: international exams on intl, every other exam on www. */
export function examsForSite<T extends { name: string }>(rows: readonly T[], intl: boolean): T[] {
  return intl ? rows.filter((row) => isNicheExam(row.name)) : withoutNicheExams(rows);
}
