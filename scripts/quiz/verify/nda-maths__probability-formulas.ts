/**
 * NDA Maths · Probability · per-FORMULA recall MCQs (bundle-split pass).
 * Each genuine formula piece gets a specific stem + tempting permutation
 * distractors. Skipped (judgment): conditional-probability:formula:1 (P(B)>0
 * condition), geometric-probability:formula:1 ("(length/area/volume)" note).
 *   npm run quiz:verify nda-maths__probability-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Axioms & complement ──────────────────────────────────────────
  {
    atomKey: "complement-and-axioms:formula:0",
    stem: "Which axiom gives the range of any probability \\(P(E)\\)?",
    distractors: [f("0 < P(E) < 1"), f("-1 \\le P(E) \\le 1"), f("0 \\le P(E) \\le 100")],
    theme: "formula",
  },
  {
    atomKey: "complement-and-axioms:formula:1",
    stem: "Which is the probability axiom for the sample space \\(S\\) (the certain event)?",
    distractors: [f("P(S) = 0"), f("P(\\varnothing) = 1"), f("P(S) = |S|")],
    theme: "formula",
  },
  {
    atomKey: "complement-and-axioms:formula:2",
    stem: "Which is the complement rule (probability of \\(E\\) not occurring)?",
    distractors: [f("P(E') = P(E) - 1"), f("P(E') = 1 + P(E)"), f("P(E') = \\dfrac{1}{P(E)}")],
    theme: "formula",
  },

  // ── Conditional & multiplication ─────────────────────────────────
  {
    atomKey: "conditional-probability:formula:0",
    stem: "Which is the formula for the conditional probability of \\(A\\) given \\(B\\)?",
    distractors: [
      f("P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(A)}"),
      f("P(A \\mid B) = \\dfrac{P(A)\\,P(B)}{P(B)}"),
      f("P(A \\mid B) = \\dfrac{P(A \\cup B)}{P(B)}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "multiplication-rule-and-restricted-sample-space:formula:0",
    stem: "Which is the multiplication rule for \\(P(A \\cap B)\\)?",
    distractors: [f("P(A \\cap B) = P(A) + P(B)"), f("P(A \\cap B) = \\dfrac{P(A)}{P(B)}"), f("P(A \\cap B) = P(B) + P(A \\mid B)")],
    theme: "formula",
  },
  {
    atomKey: "multiplication-rule-and-restricted-sample-space:formula:1",
    stem: "Which is the counting (restricted-sample-space) form of \\(P(A \\mid B)\\)?",
    distractors: [
      f("P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(S)}"),
      f("P(A \\mid B) = \\dfrac{n(B)}{n(A \\cap B)}"),
      f("P(A \\mid B) = \\dfrac{n(A)}{n(B)}"),
    ],
    theme: "formula",
  },

  // ── Identity statements ──────────────────────────────────────────
  {
    atomKey: "probability-identity-statements:formula:0",
    stem: "Which gives the probability that EXACTLY ONE of \\(A, B\\) occurs?",
    correct: f("P(A) + P(B) - 2P(A \\cap B)"),
    distractors: [f("P(A) + P(B) - P(A \\cap B)"), f("P(A) + P(B) - 2P(A \\cup B)"), f("2P(A \\cap B) - P(A) - P(B)")],
    theme: "formula",
  },
  {
    atomKey: "probability-identity-statements:formula:1",
    stem: "Which is the addition rule for \\(P(A \\cup B)\\)?",
    distractors: [f("P(A \\cup B) = P(A) + P(B) + P(A \\cap B)"), f("P(A \\cup B) = P(A) + P(B)"), f("P(A \\cup B) = P(A) + P(B) - 2P(A \\cap B)")],
    theme: "formula",
  },

  // ── Coins & dice ─────────────────────────────────────────────────
  {
    atomKey: "probability-with-coins:formula:0",
    stem: "\\(n\\) fair coins are tossed. The size of the sample space \\(n(S)\\) is:",
    correct: f("2^{n}"),
    distractors: [f("2n"), f("n^2"), f("n!")],
    theme: "formula",
  },
  {
    atomKey: "probability-with-coins:formula:1",
    stem: "\\(n\\) fair coins are tossed. \\(P(\\text{at least one head})\\) is:",
    correct: f("1 - \\left(\\tfrac{1}{2}\\right)^{n}"),
    distractors: [f("\\left(\\tfrac{1}{2}\\right)^{n}"), f("1 - \\left(\\tfrac{1}{2}\\right)^{n-1}"), f("\\dfrac{n}{2}")],
    theme: "formula",
  },
  {
    atomKey: "probability-with-dice:formula:0",
    stem: "Two dice are thrown. The size of the sample space \\(n(S)\\) is:",
    correct: f("36"),
    distractors: [f("12"), f("6"), f("66")],
    theme: "formula",
  },
  {
    atomKey: "probability-with-dice:formula:1",
    stem: "Two dice are thrown. \\(P(\\text{sum} = 7)\\) is:",
    correct: f("\\dfrac{1}{6}"),
    distractors: [f("\\dfrac{1}{12}"), f("\\dfrac{5}{36}"), f("\\dfrac{1}{9}")],
    theme: "formula",
  },

  // ── Geometric probability ────────────────────────────────────────
  {
    atomKey: "geometric-probability:formula:0",
    stem: "In geometric probability, the probability of an event \\(E\\) is:",
    correct: f("\\dfrac{\\text{favourable measure}}{\\text{total measure}}"),
    distractors: [
      f("\\dfrac{\\text{total measure}}{\\text{favourable measure}}"),
      f("\\dfrac{\\text{favourable measure}}{\\text{total measure}} \\times 100"),
      f("\\text{favourable measure} - \\text{total measure}"),
    ],
    theme: "formula",
  },
];
