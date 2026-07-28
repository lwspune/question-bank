import type { QuestionRow } from "@/lib/questions/query";

/**
 * The source-attribution bracket printed after a question's stem in an
 * exported Question Paper — `[JEE Mains 2016]` — the standard coaching-book
 * citation that tells a student which sitting the question came from.
 *
 * Deliberately EXAM + YEAR only, and deliberately NOT `formatProvenance`
 * (src/lib/questions/query's web-card chip), which builds `Q# · disambiguator
 * · year` and would print `[Q12 · Apr · 2023]` on a printed paper.
 *
 * Why no session/shift detail: `pyq_note` is only a clean label for NDA
 * ("NDA 1"/"NDA 2"). Elsewhere it is inconsistent within one exam (JEE carries
 * "Paper 7" AND "29 June 2022" AND "8 Apr 2023") or a full provenance sentence
 * (MH-SSC-10). A uniform exam+year tag is the one shape that reads correctly
 * for every exam in the bank.
 *
 * Returns null when the question must NOT be attributed — see the pyqYear note
 * below — and the caller then prints no bracket at all.
 */
export type SourceTagInput = Pick<QuestionRow, "exam" | "pyqYear">;

export function formatSourceTag(q: SourceTagInput): string | null {
  // A null pyq_year IS the "not a past-year question" signal: bank-wide,
  // pyq_year is non-null on exactly the question_kind='pyq' rows and null on
  // exactly the practice rows. So a mixed PYQ+practice paper tags the PYQs and
  // leaves practice questions clean, rather than crediting them to a sitting
  // they never appeared in.
  if (q.pyqYear === null || q.pyqYear === undefined) return null;
  const name = q.exam?.name?.trim();
  if (!name) return null;
  return `[${name} ${q.pyqYear}]`;
}
