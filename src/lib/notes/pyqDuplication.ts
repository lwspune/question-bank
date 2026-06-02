/**
 * Pure heuristic behind notes-lint check #5 — the "worked example == featured
 * PYQ" duplication WARN. A concept's worked example / self-check must be a
 * DIFFERENT problem from its featured PYQ (CLAUDE.md "Notes editorial
 * workflow"); the natural authoring shortcut is to demonstrate the exact PYQ
 * then feature it below. We can't check the math, but we can flag when the
 * example prompt re-uses (almost) all of the PYQ's distinctive numbers.
 *
 * Lives here (not inline in the script) so it's unit-testable; notes-lint.ts
 * imports it. See [[notes-concept-content-alignment]].
 */

/**
 * The multiset of numeric literals in a string. Subscripts are stripped FIRST
 * because they are indices/labels (I_2, A_k, C_{11}, a_{ij}, x_1), not problem
 * magnitudes, and would otherwise inject spurious shared digits (e.g. the "2"
 * in I_2). Superscripts are kept: a power like A^4 IS often the distinguishing
 * datum of the problem.
 */
export function numberMultiset(s: string): string[] {
  const noSubscripts = s.replace(/_\{[^}]*\}/g, "").replace(/_\d+/g, "");
  return noSubscripts.match(/-?\d+(?:\.\d+)?/g) ?? [];
}

/**
 * True when `exampleText` looks like the same problem as `pyqText`: ≥80% of the
 * PYQ's numbers reappear in the example AND either ≥5 shared numbers
 * (coordinate/matrix-heavy problems) OR ≥2 distinctive ones (|n|≥5, multi-digit,
 * or decimal). The distinctive guard suppresses coincidental overlap on small
 * structural integers (1, 2, 4 exponents/coefficients). Number-based, so strong
 * on computational dups and weak on word/variable-only ones.
 */
export function reusesPyqNumbers(exampleText: string, pyqText: string): boolean {
  const pyqNums = numberMultiset(pyqText);
  if (pyqNums.length < 3) return false; // too few numbers to be distinctive
  const avail = new Map<string, number>();
  for (const n of numberMultiset(exampleText)) avail.set(n, (avail.get(n) ?? 0) + 1);
  const shared: string[] = [];
  for (const n of pyqNums) {
    const c = avail.get(n) ?? 0;
    if (c > 0) {
      shared.push(n);
      avail.set(n, c - 1);
    }
  }
  if (shared.length / pyqNums.length < 0.8) return false;
  const distinctive = (n: string) =>
    Math.abs(parseFloat(n)) >= 5 || n.includes(".") || n.replace("-", "").length >= 2;
  const distinctiveShared = shared.filter(distinctive).length;
  return shared.length >= 5 || distinctiveShared >= 2;
}
