import type { DerivedSummary } from "@/lib/notes/deriveSummary";

/**
 * What a chapter's formula sheet holds, as the download box's one line:
 * "10 formulas · 2 tables · 14 traps". Zero parts are left out, so a
 * reference-only chapter reads "6 tables · 9 traps". Pure; spec in
 * tests/formula-sheet-summary.test.ts.
 */
export function formulaSheetSummaryLine(summaries: readonly Pick<DerivedSummary, "formulas" | "references" | "traps">[]): string {
  const formulas = summaries.reduce((a, s) => a + s.formulas.length, 0);
  const references = summaries.reduce((a, s) => a + s.references.length, 0);
  const traps = summaries.reduce((a, s) => a + s.traps.length, 0);
  const part = (n: number, one: string, many: string) => (n === 0 ? null : `${n} ${n === 1 ? one : many}`);
  const parts = [part(formulas, "formula", "formulas"), part(references, "table", "tables"), part(traps, "trap", "traps")].filter(
    (x): x is string => x !== null
  );
  return parts.join(" · ");
}
