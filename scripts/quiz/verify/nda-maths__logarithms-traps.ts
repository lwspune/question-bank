/**
 * NDA Maths · Logarithms · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (trap index = position
 * in that concept's `traps` array, 0-based). The chapter had 10 callouts (1 per
 * concept); to clear the ≥12 floor, 3 SECOND traps (index :1) were added —
 * log-foundations (base restriction), log-change-of-base (CoB direction),
 * log-domain-and-count (argument must be > 0, strictly). Total = 13.
 * Each entry supplies the concrete question; the first distractor is the warned
 * mistake.
 *   npm run quiz:verify nda-maths__logarithms-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── log-foundations:trap:0 — log(M+N) ≠ log M + log N ──
  {
    atomKey: "log-foundations:trap:0",
    stem: "Which equation is FALSE for all valid \\(M, N > 0\\)?",
    correct: f("\\log_a(M+N) = \\log_a M + \\log_a N"),
    distractors: [
      f("\\log_a(MN) = \\log_a M + \\log_a N"),
      f("\\log_a\\tfrac{M}{N} = \\log_a M - \\log_a N"),
      f("\\log_a M^k = k\\log_a M"),
    ],
    theme: "trap",
  },
  // ── log-foundations:trap:1 — base must be > 0 and ≠ 1 ──
  {
    atomKey: "log-foundations:trap:1",
    stem: "Which is NOT a valid base for a logarithm?",
    correct: f("a = 1"),
    distractors: [f("a = 2"), f("a = 10"), f("a = \\tfrac12")],
    theme: "trap",
  },
  // ── log-laws-evaluate-combine:trap:0 — keep the base / don't drop a term ──
  {
    atomKey: "log-laws-evaluate-combine:trap:0",
    stem: "Simplify \\(\\log_7 \\dfrac{7}{8}\\) using \\(\\log_7 2 = c\\).",
    correct: f("1 - 3c"),
    distractors: [f("1 - c"), f("1 + 3c"), f("-3c")],
    theme: "trap",
  },
  // ── log-change-of-base:trap:0 — reciprocal swaps base & argument ──
  {
    atomKey: "log-change-of-base:trap:0",
    stem: "What does \\(\\dfrac{1}{\\log_2 5}\\) equal?",
    correct: f("\\log_5 2"),
    distractors: [f("\\log_2\\tfrac15"), f("-\\log_2 5"), f("\\log_5\\tfrac12")],
    theme: "trap",
  },
  // ── log-change-of-base:trap:1 — CoB puts new argument on TOP ──
  {
    atomKey: "log-change-of-base:trap:1",
    stem: "Rewrite \\(\\log_8 5\\) using base-2 logs.",
    correct: f("\\dfrac{\\log_2 5}{\\log_2 8}"),
    distractors: [f("\\dfrac{\\log_2 8}{\\log_2 5}"), f("\\log_2 5 - \\log_2 8"), f("\\log_2 5 \\cdot \\log_2 8")],
    theme: "trap",
  },
  // ── log-sign-and-bounds:trap:0 — minimum is of the LOG, not the quadratic ──
  {
    atomKey: "log-sign-and-bounds:trap:0",
    stem: "Find the minimum value of \\(\\log_{10}(x^2 - 4x + 104)\\).",
    correct: f("2"),
    distractors: [f("100"), f("104"), f("0")],
    theme: "trap",
  },
  // ── log-in-sequences:trap:0 — AP does not imply GP ──
  {
    atomKey: "log-in-sequences:trap:0",
    stem: "\\(\\ln x,\\ 3\\ln x,\\ 5\\ln x\\) (\\(x>1\\)) are in which progression(s)?",
    correct: f("\\text{AP only}"),
    distractors: [f("\\text{both AP and GP}"), f("\\text{GP only}"), f("\\text{neither}")],
    theme: "trap",
  },
  // ── log-solve-exponential:trap:0 — log_10 0.2 = log_10 2 - 1 (negative) ──
  {
    atomKey: "log-solve-exponential:trap:0",
    stem: "Using \\(\\log_{10} 2 = 0.3010\\), what is \\(\\log_{10} 0.2\\)?",
    correct: f("-0.6990"),
    distractors: [f("0.3010"), f("0.6990"), f("1.3010")],
    theme: "trap",
  },
  // ── log-substitute-to-quadratic:trap:0 — throw out the non-positive t ──
  {
    atomKey: "log-substitute-to-quadratic:trap:0",
    stem: "After \\(t = 2^x\\) gives roots \\(t = 4\\) and \\(t = -1\\), what is the solution set for \\(x\\)?",
    correct: f("x = 2"),
    distractors: [f("x = 2 \\text{ or } x = \\log_2(-1)"), f("x = -1 \\text{ or } x = 2"), f("\\text{no real } x")],
    theme: "trap",
  },
  // ── log-domain-and-count:trap:0 — algebraic root must clear the domain ──
  {
    atomKey: "log-domain-and-count:trap:0",
    stem: "\\(\\log_4(x-1) = \\log_2(x-3)\\) yields algebraic roots \\(x = 2\\) and \\(x = 5\\). How many are genuine solutions?",
    correct: f("1"),
    distractors: [f("2"), f("0"), f("\\text{infinitely many}")],
    theme: "trap",
  },
  // ── log-domain-and-count:trap:1 — argument must be > 0, strictly ──
  {
    atomKey: "log-domain-and-count:trap:1",
    stem: "For which value is \\(\\log_5(x-4)\\) undefined?",
    correct: f("x = 4"),
    distractors: [f("x = 5"), f("x = 9"), f("x = 29")],
    theme: "trap",
  },
  // ── log-advanced-conditions:trap:0 — GP squares the MIDDLE term ──
  {
    atomKey: "log-advanced-conditions:trap:0",
    stem: "For \\(p, q, r\\) in GP, which relation is correct?",
    correct: f("q^2 = pr"),
    distractors: [f("p^2 = qr"), f("r^2 = pq"), f("2q = p + r")],
    theme: "trap",
  },
  // ── log-trailing-zeros:trap:0 — count 5s, don't forget 25, 125… ──
  {
    atomKey: "log-trailing-zeros:trap:0",
    stem: "How many trailing zeros does \\(30!\\) have?",
    correct: f("7"),
    distractors: [f("6"), f("8"), f("5")],
    theme: "trap",
  },
];
