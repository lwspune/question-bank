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
  const noLabels = s
    // Line-start list markers: "1. ", "2) ". The trailing-whitespace lookahead
    // is what keeps a decimal safe — "0.5" has no space after the dot.
    .replace(/^[ \t]*\d+[.)](?=\s)/gm, "")
    // Inline claim markers: "(1)", "( 2 )". A coordinate "(4,5)" has a comma
    // before the bracket closes, and LaTeX "\(3\)" has a backslash, so neither
    // matches.
    .replace(/\(\s*\d+\s*\)/g, "");
  const noSubscripts = noLabels.replace(/_\{[^}]*\}/g, "").replace(/_\d+/g, "");
  return noSubscripts.match(/-?\d+(?:\.\d+)?/g) ?? [];
}

/** Sorted multiset key — two strings share one iff their numbers match exactly. */
function multisetKey(nums: string[]): string {
  return [...nums].sort().join("|");
}

/**
 * True when `exampleText` looks like the same problem as `pyqText`. Two
 * independent branches, either of which warns:
 *
 * 1. **Partial overlap + distinctiveness** (original): ≥80% of the PYQ's
 *    numbers reappear in the example AND either ≥5 shared numbers
 *    (coordinate/matrix-heavy problems) OR ≥2 distinctive ones (|n|≥5,
 *    multi-digit, or decimal). The distinctive guard suppresses coincidental
 *    overlap on small structural integers (1, 2, 4 exponents/coefficients).
 *
 * 2. **Identical multiset**: the example and the PYQ use the *exact same*
 *    numbers, with the same repeats, and there are ≥3 of them. Branch 1 is
 *    blind wherever every number in the problem is a small single digit —
 *    which is all of coordinate geometry and much of vectors and probability.
 *    Measured 2026-09-22: branch 1 fired on 0 of 2,455 pairs across the whole
 *    shipped corpus while `/notes/nda-maths/lines` carried two self-checks
 *    that were their own featured PYQ verbatim, sharing 100% of its numbers
 *    and rejected for having none ≥5.
 *
 *    Equality is required in BOTH directions deliberately. Lowering branch 1's
 *    count threshold instead would re-flag two genuine non-duplicates that
 *    also share exactly 4 small numbers (see tests) — they differ from a real
 *    duplicate by having UNEQUAL multisets, not by sharing fewer numbers.
 *
 * Number-based, so strong on computational dups and weak on word/variable-only
 * ones. It is a WARN, not a gate: a hit means "read these two side by side".
 */
export function reusesPyqNumbers(exampleText: string, pyqText: string): boolean {
  const pyqNums = numberMultiset(pyqText);
  if (pyqNums.length < 3) return false; // too few numbers to be distinctive
  const exampleNums = numberMultiset(exampleText);

  // Branch 2 — same numbers, same repeats, either order.
  if (multisetKey(pyqNums) === multisetKey(exampleNums)) return true;

  const avail = new Map<string, number>();
  for (const n of exampleNums) avail.set(n, (avail.get(n) ?? 0) + 1);
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
