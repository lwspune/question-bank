/**
 * NDA Maths · Binary Numbers · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (key index = the trap's
 * position in its concept's `traps[]` array). The first distractor in each is the
 * warned mistake. 13 callouts → 13 trap atoms (≥12 floor cleared).
 * NEW callouts (2): bin-place-value-foundation:trap:1 (no subscript = decimal) and
 * bin-decimal-to-binary:trap:1 (keep 0 in skipped powers).
 *   npm run quiz:verify nda-maths__binary-numbers-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bin-place-value-foundation ──
  {
    // place value starts at 2⁰ on the RIGHT — mis-weighting from the left
    atomKey: "bin-place-value-foundation:trap:0",
    stem: "What is the decimal value of \\((110)_2\\)?",
    correct: f("6"),
    distractors: [f("3"), f("7"), f("11")],
    theme: "trap",
  },
  {
    // no subscript ⇒ DECIMAL, not binary
    atomKey: "bin-place-value-foundation:trap:1",
    stem: "Which of these is the binary number eleven \\((11_{10})\\), and which is one thousand eleven?",
    correct: "\\((1011)_2 = 11_{10}\\); the plain \\(1011\\) (no subscript) is the decimal one thousand eleven.",
    distractors: [
      "\\(1011\\) and \\((1011)_2\\) are the same number — the subscript makes no difference.",
      "\\((1011)_2\\) is one thousand eleven; \\(1011\\) is eleven.",
      "\\((1011)_2 = 13_{10}\\); the plain \\(1011\\) is also \\(13\\).",
    ],
    theme: "trap",
  },

  // ── bin-binary-to-decimal ──
  {
    // a 0 bit contributes nothing — adding its place value is the slip
    atomKey: "bin-binary-to-decimal:trap:0",
    stem: "Convert \\((10010)_2\\) to decimal — adding every place value (not just the 1-bits) is the trap.",
    correct: f("18"),
    distractors: [f("31"), f("20"), f("9")],
    theme: "trap",
  },

  // ── bin-decimal-to-binary ──
  {
    // read remainders BOTTOM-up; top-down reverses the answer
    atomKey: "bin-decimal-to-binary:trap:0",
    stem: "Convert \\(11_{10}\\) to binary — reading the division remainders top-down (the reversed answer) is the trap.",
    correct: f("(1011)_2"),
    distractors: [f("(1101)_2"), f("(111)_2"), f("(10011)_2")],
    theme: "trap",
  },
  {
    // keep a 0 in every skipped power
    atomKey: "bin-decimal-to-binary:trap:1",
    stem: "Convert \\(20_{10}\\) to binary — dropping the empty \\(8\\), \\(2\\), \\(1\\) places is the trap.",
    correct: f("(10100)_2"),
    distractors: [f("(11)_2"), f("(101)_2"), f("(1010)_2")],
    theme: "trap",
  },

  // ── bin-addition-subtraction ──
  {
    // every unknown bit must be 0 or 1
    atomKey: "bin-addition-subtraction:trap:0",
    stem: "If \\((1x1)_2 = 7\\), what is the bit \\(x\\)?",
    correct: f("x = 1"),
    distractors: [f("x = 2"), f("x = 0"), f("x = 3")],
    theme: "trap",
  },
  {
    // convert the FINAL answer back to binary
    atomKey: "bin-addition-subtraction:trap:1",
    stem: "What is \\((110)_2 + (11)_2\\), given in binary?",
    correct: f("(1001)_2"),
    distractors: [f("9"), f("(110)_2"), f("(1011)_2")],
    theme: "trap",
  },

  // ── bin-division ──
  {
    // remainder is usually wanted in BINARY, not decimal
    atomKey: "bin-division:trap:0",
    stem: "Find the remainder of \\((1101)_2 \\div (100)_2\\), expressed in binary.",
    correct: f("(1)_2"),
    distractors: [f("1"), f("(11)_2"), f("(100)_2")],
    theme: "trap",
  },

  // ── bin-algebraic-identities ──
  {
    // spot the identity before cubing — a = b + c collapses to 0
    atomKey: "bin-algebraic-identities:trap:0",
    stem: "With \\(a = (1010)_2,\\ b = (110)_2,\\ c = (100)_2\\), what is \\(a^3 - b^3 - c^3 - 3abc\\)?",
    correct: f("0"),
    distractors: [f("3abc = 720"), f("1000"), f("a^3 = 1000")],
    theme: "trap",
  },
  {
    // (x-y)² + xy = x² - xy + y²
    atomKey: "bin-algebraic-identities:trap:1",
    stem: "Simplify \\((x-y)^2 + xy\\).",
    correct: f("x^2 - xy + y^2"),
    distractors: [f("x^2 - 2xy + y^2"), f("x^2 + xy + y^2"), f("x^2 + y^2")],
    theme: "trap",
  },

  // ── bin-representation-bit-count ──
  {
    // wrong bit count — bracket between powers first
    atomKey: "bin-representation-bit-count:trap:0",
    stem: "How many bits are needed to write \\(64_{10}\\) in binary?",
    correct: f("7 \\text{ bits}"),
    distractors: [f("6 \\text{ bits}"), f("8 \\text{ bits}"), f("64 \\text{ bits}")],
    theme: "trap",
  },

  // ── bin-number-theory-facts ──
  {
    // reduce exponent by CYCLE length, not the modulus
    atomKey: "bin-number-theory-facts:trap:0",
    stem: "What is the remainder when \\(2^{100}\\) is divided by 5? (The powers of 2 cycle with period 4 mod 5.)",
    correct: f("1"),
    distractors: [f("2"), f("4"), f("0")],
    theme: "trap",
  },
  {
    // sum of odds is a PERFECT SQUARE → term count is its root
    atomKey: "bin-number-theory-facts:trap:1",
    stem: "If \\(1 + 3 + 5 + \\cdots = 100\\), how many terms are summed?",
    correct: f("10"),
    distractors: [f("50"), f("100"), f("99")],
    theme: "trap",
  },
];
