/**
 * The /guide/<exam> hub's list: the biggest subject guide marked "Start here",
 * the rest by size, each named by its subject alone ("Physics", not "NDA PART B
 * Physics", since the page already says which exam).
 *
 * The hub used to show one tall card per guide (~12,000 px of scrolling for
 * NDA's ten on a phone). Pure; spec tests/guides-hub-list.test.ts.
 */

/** "NDA PART B Physics" -> "Physics"; "NDA English (GAT)" -> "English". */
export function guideShortName(examLabel: string, examDisplay: string): string {
  let s = examLabel.startsWith(`${examDisplay} `) ? examLabel.slice(examDisplay.length + 1) : examLabel;
  s = s.replace(/^PART [A-Z]\s+/, "").replace(/\s*\([^)]*\)$/, "");
  return s.trim();
}

/** Biggest guide first (Start here), then the rest by size; equal sizes keep catalogue order. */
export function orderHubGuides<T extends { qCount: number }>(guides: readonly T[]): { start: T | null; rest: T[] } {
  const ordered = [...guides].sort((a, b) => b.qCount - a.qCount);
  return { start: ordered[0] ?? null, rest: ordered.slice(1) };
}
