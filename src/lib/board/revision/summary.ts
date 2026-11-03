/**
 * A revision sheet in one line (2026-11-03): "8 most-asked questions · 13 key
 * points · 14 formulas · 10 derivations · 6 diagrams". Empty sections are
 * left out. Spec: tests/board-revision-summary.test.ts.
 */
import type { RevisionSheet } from "./types";

function count(n: number, one: string, many: string): string | null {
  return n === 0 ? null : `${n} ${n === 1 ? one : many}`;
}

export function revisionSummary(
  sheet: Pick<RevisionSheet, "mostAsked" | "keyPoints" | "formulas" | "derivations" | "diagrams">
): string {
  return [
    count(sheet.mostAsked.length, "most-asked question", "most-asked questions"),
    count(sheet.keyPoints.length, "key point", "key points"),
    count(sheet.formulas.length, "formula", "formulas"),
    count(sheet.derivations.length, "derivation", "derivations"),
    count(sheet.diagrams.length, "diagram", "diagrams"),
  ]
    .filter(Boolean)
    .join(" · ");
}
