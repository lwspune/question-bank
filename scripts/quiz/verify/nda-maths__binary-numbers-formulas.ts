/**
 * NDA Maths · Binary Numbers · FORMULA-recall MCQs.
 * Binary is computation-heavy with relatively few genuine recall formulas, but
 * it has enough to clear the floor: the place-value sum, the bit-count bracket,
 * the division identity, the two carry rules, and the two cube identities.
 * Distractors are full-equation permutations — wrong versions of the SAME
 * relation, same shape (no length/format tell).
 *
 * SKIPPED (parked needs_review — conditions/process-prose, not recallable equations):
 *   - bin-decimal-to-binary:formula:0 (the "÷2 → (q,r) → …" process arrow — a
 *     PROCEDURE, not an equation) and :formula:1 (read-the-remainders ordering)
 *   - bin-division:formula:1 (the CONSTRAINT 0 ≤ R < B, an annotation on A=BQ+R)
 *   - bin-place-value-foundation:formula:0 (a 10-column powers-of-2 reference
 *     TABLE, not a single recall formula — its content rides the binary→decimal
 *     sum formula below)
 *   npm run quiz:verify nda-maths__binary-numbers-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bin-binary-to-decimal: the weighted-sum formula ──
  {
    atomKey: "bin-binary-to-decimal:formula:0",
    stem: "Which is the formula converting a binary string \\((b_n\\ldots b_1 b_0)_2\\) to decimal?",
    distractors: [
      f("(b_n\\ldots b_1 b_0)_2 = \\sum_{i=0}^{n} b_i\\, 10^i"),
      f("(b_n\\ldots b_1 b_0)_2 = \\sum_{i=0}^{n} b_i\\, 2^{i+1}"),
      f("(b_n\\ldots b_1 b_0)_2 = \\sum_{i=1}^{n} b_i\\, 2^i"),
    ],
    theme: "formula",
  },

  // ── bin-addition-subtraction: the two carry rules ──
  {
    atomKey: "bin-addition-subtraction:formula:0",
    stem: "In binary addition, what is \\(1 + 1\\)?",
    distractors: [f("1 + 1 = (1)_2"), f("1 + 1 = (11)_2"), f("1 + 1 = (2)_2")],
    theme: "formula",
  },
  {
    atomKey: "bin-addition-subtraction:formula:1",
    stem: "In binary addition (a column with a carry-in), what is \\(1 + 1 + 1\\)?",
    distractors: [f("1 + 1 + 1 = (10)_2"), f("1 + 1 + 1 = (111)_2"), f("1 + 1 + 1 = (1)_2")],
    theme: "formula",
  },

  // ── bin-division: the division identity (skip the 0≤R<B constraint piece) ──
  {
    atomKey: "bin-division:formula:0",
    stem: "Which is the division identity relating dividend \\(A\\), divisor \\(B\\), quotient \\(Q\\) and remainder \\(R\\)?",
    distractors: [f("A = B\\,Q - R"), f("A = B(Q + R)"), f("A = Q\\,R + B")],
    theme: "formula",
  },

  // ── bin-algebraic-identities: the two cube identities ──
  {
    atomKey: "bin-algebraic-identities:formula:0",
    stem: "Which is the sum-of-cubes identity?",
    distractors: [
      f("x^3 + y^3 = (x+y)(x^2 + xy + y^2)"),
      f("x^3 + y^3 = (x-y)(x^2 - xy + y^2)"),
      f("x^3 + y^3 = (x+y)(x^2 + y^2)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "bin-algebraic-identities:formula:1",
    stem: "If \\(a = b + c\\), which expression collapses to zero?",
    distractors: [
      f("a = b + c \\ \\Rightarrow\\ a^3 - b^3 - c^3 + 3abc = 0"),
      f("a = b + c \\ \\Rightarrow\\ a^3 + b^3 + c^3 - 3abc = 0"),
      f("a = b + c \\ \\Rightarrow\\ a^3 - b^3 - c^3 - abc = 0"),
    ],
    theme: "formula",
  },

  // ── bin-representation-bit-count: the bit-count bracket ──
  {
    atomKey: "bin-representation-bit-count:formula:0",
    stem: "A decimal number \\(N\\) needs exactly \\(k\\) bits in binary when:",
    distractors: [
      f("2^{k} \\le N \\le 2^{k+1} - 1"),
      f("2^{k-1} < N < 2^{k}"),
      f("2^{k-1} \\le N \\le 2^{k} \\ \\Longrightarrow\\ N \\text{ uses } k \\text{ bits}"),
    ],
    theme: "formula",
  },

  // ── bin-number-theory-facts: sum of the first n odd numbers ──
  {
    atomKey: "bin-number-theory-facts:formula:0",
    stem: "What is the sum of the first \\(n\\) odd numbers, \\(1 + 3 + 5 + \\cdots + (2n-1)\\)?",
    distractors: [
      f("1 + 3 + 5 + \\cdots + (2n - 1) = n(n+1)"),
      f("1 + 3 + 5 + \\cdots + (2n - 1) = 2n - 1"),
      f("1 + 3 + 5 + \\cdots + (2n - 1) = \\dfrac{n(n+1)}{2}"),
    ],
    theme: "formula",
  },
];
