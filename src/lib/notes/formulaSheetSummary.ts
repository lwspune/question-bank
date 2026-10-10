import type { DerivedSummary } from "@/lib/notes/deriveSummary";

/**
 * What a chapter's formula sheet holds, as the download box's one line:
 * "10 formulas · 2 tables · 14 traps". Zero parts are left out, so a
 * reference-only chapter reads "6 tables · 9 traps". Pure; spec in
 * tests/formula-sheet-summary.test.ts.
 */
export function formulaSheetSummaryLine(summaries: readonly Pick<DerivedSummary, "formulas" | "references" | "traps">[]): string {
  return formulaCountsLine({
    formulas: summaries.reduce((a, s) => a + s.formulas.length, 0),
    tables: summaries.reduce((a, s) => a + s.references.length, 0),
    traps: summaries.reduce((a, s) => a + s.traps.length, 0),
  });
}

/** The same line from counts already made (the /formula chapter pages carry them). */
export function formulaCountsLine(c: { formulas: number; tables: number; traps: number }): string {
  const { formulas, tables: references, traps } = c;
  const part = (n: number, one: string, many: string) => (n === 0 ? null : `${n} ${n === 1 ? one : many}`);
  const parts = [part(formulas, "formula", "formulas"), part(references, "table", "tables"), part(traps, "trap", "traps")].filter(
    (x): x is string => x !== null
  );
  return parts.join(" · ");
}
