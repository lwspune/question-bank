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

  // ── auto-atom fixes (2026-06-11) ──────────────────────────────────
  // Concrete stems + tight permutation distractors for the 14 kept auto
  // formula atoms (2 retired: selecting-numbers, min-max-of-combined — see
  // handoff). quiz:verify rewrites stem/options + promotes auto→verified.

  // event algebra & addition
  {
    atomKey: "addition-rule:formula:0",
    stem: "For any two events \\(A, B\\), \\(P(A \\cup B)\\) equals:",
    distractors: [
      f("P(A) + P(B) + P(A \\cap B)"),
      f("P(A) + P(B)"),
      f("P(A) + P(B) - 2P(A \\cap B)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "mutually-exclusive-events:formula:0",
    stem: "If \\(A\\) and \\(B\\) are mutually exclusive (disjoint), then \\(P(A \\cup B)\\) equals:",
    correct: f("P(A) + P(B)"),
    distractors: [
      f("P(A) + P(B) - P(A \\cap B)"),
      f("P(A)\\,P(B)"),
      f("P(A) + P(B) - P(A)P(B)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "exhaustive-events:formula:0",
    stem: "If events \\(A_1, \\dots, A_n\\) are exhaustive and mutually exclusive, then:",
    correct: f("\\sum_{i} P(A_i) = 1"),
    distractors: [
      f("\\sum_{i} P(A_i) = n"),
      f("\\prod_{i} P(A_i) = 1"),
      f("\\sum_{i} P(A_i) = 0"),
    ],
    theme: "formula",
  },
  {
    atomKey: "neither-and-complement-of-union:formula:0",
    stem: "The probability that NEITHER \\(A\\) nor \\(B\\) occurs, \\(P(A' \\cap B')\\), equals:",
    correct: f("1 - P(A \\cup B)"),
    distractors: [
      f("1 - P(A \\cap B)"),
      f("1 - P(A) - P(B)"),
      f("P(A \\cup B) - 1"),
    ],
    theme: "formula",
  },

  // classical & counting
  {
    atomKey: "classical-probability:formula:0",
    stem: "For equally likely outcomes, the classical probability of an event \\(E\\) is:",
    correct: f("\\dfrac{n(E)}{n(S)}"),
    distractors: [
      f("\\dfrac{n(S)}{n(E)}"),
      f("\\dfrac{n(E)}{n(S)} \\times 100"),
      f("n(E) - n(S)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "counting-with-combinations:formula:0",
    stem: "An urn has \\(a\\) red and \\(b\\) blue balls; \\(r\\) are drawn at random. \\(P(\\text{exactly } k \\text{ red})\\) is:",
    correct: f("\\dfrac{\\dbinom{a}{k}\\dbinom{b}{r-k}}{\\dbinom{a+b}{r}}"),
    distractors: [
      f("\\dfrac{\\dbinom{a}{k}}{\\dbinom{a+b}{r}}"),
      f("\\dfrac{a^{k}\\,b^{r-k}}{(a+b)^{r}}"),
      f("\\dfrac{\\dbinom{a}{k} + \\dbinom{b}{r-k}}{\\dbinom{a+b}{r}}"),
    ],
    theme: "formula",
  },

  // conditional, total & Bayes
  {
    atomKey: "total-probability:formula:0",
    stem: "If \\(B_1, \\dots, B_n\\) partition the sample space, the total probability \\(P(A)\\) is:",
    correct: f("\\sum_{i} P(B_i)\\,P(A \\mid B_i)"),
    distractors: [
      f("\\sum_{i} P(A \\mid B_i)"),
      f("\\sum_{i} P(B_i)"),
      f("\\prod_{i} P(B_i)\\,P(A \\mid B_i)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "bayes-theorem:formula:0",
    stem: "By Bayes' theorem, the posterior \\(P(B_k \\mid A)\\) equals:",
    correct: f("\\dfrac{P(B_k)\\,P(A \\mid B_k)}{\\displaystyle\\sum_{i} P(B_i)\\,P(A \\mid B_i)}"),
    distractors: [
      f("P(B_k)\\,P(A \\mid B_k)"),
      f("\\dfrac{P(A \\mid B_k)}{\\displaystyle\\sum_{i} P(B_i)\\,P(A \\mid B_i)}"),
      f("\\dfrac{P(B_k)\\,P(B_k \\mid A)}{\\displaystyle\\sum_{i} P(B_i)\\,P(A \\mid B_i)}"),
    ],
    theme: "formula",
  },

  // independence
  {
    atomKey: "independence-and-multiplication-rule:formula:0",
    stem: "If \\(A\\) and \\(B\\) are independent events, then \\(P(A \\cap B)\\) equals:",
    correct: f("P(A)\\,P(B)"),
    distractors: [
      f("P(A) + P(B)"),
      f("P(A) + P(B) - P(A)P(B)"),
      f("\\dfrac{P(A)}{P(B)}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "finding-unknowns-with-independence:formula:0",
    stem: "For two INDEPENDENT events \\(A, B\\), \\(P(A \\cup B)\\) equals:",
    correct: f("P(A) + P(B) - P(A)P(B)"),
    distractors: [
      f("P(A) + P(B)"),
      f("P(A)\\,P(B)"),
      f("1 - P(A') - P(B')"),
    ],
    theme: "formula",
  },
  {
    atomKey: "at-least-one-via-complement:formula:0",
    stem: "For independent events \\(A_1, \\dots, A_n\\), \\(P(\\text{at least one occurs})\\) is:",
    correct: f("1 - \\prod_{i}\\big(1 - P(A_i)\\big)"),
    distractors: [
      f("\\prod_{i}\\big(1 - P(A_i)\\big)"),
      f("1 - \\prod_{i} P(A_i)"),
      f("\\sum_{i} P(A_i)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "solving-a-problem-independently:formula:0",
    stem: "Three people try a problem independently with success probabilities \\(p_1, p_2, p_3\\). \\(P(\\text{at least one solves it})\\) is:",
    correct: f("1 - \\prod_{i}(1 - p_i)"),
    distractors: [
      f("\\prod_{i} p_i"),
      f("\\prod_{i}(1 - p_i)"),
      f("1 - \\prod_{i} p_i"),
    ],
    theme: "formula",
  },

  // bounds
  {
    atomKey: "frechet-and-boole-bounds:formula:0",
    stem: "The Fréchet bounds on \\(P(A \\cap B)\\) for any two events are:",
    correct: f("\\max\\big(0,\\,P(A)+P(B)-1\\big) \\le P(A \\cap B) \\le \\min\\big(P(A),\\,P(B)\\big)"),
    distractors: [
      f("\\min\\big(P(A),\\,P(B)\\big) \\le P(A \\cap B) \\le \\max\\big(0,\\,P(A)+P(B)-1\\big)"),
      f("0 \\le P(A \\cap B) \\le P(A) + P(B)"),
      f("P(A)+P(B)-1 \\le P(A \\cap B) \\le P(A)+P(B)"),
    ],
    theme: "formula",
  },

  // arrangements
  {
    atomKey: "probability-with-arrangements:formula:0",
    stem: "\\(n\\) people sit in a row at random. \\(P(\\text{two specified people are adjacent})\\) is:",
    correct: f("\\dfrac{2}{n}"),
    distractors: [
      f("\\dfrac{1}{n}"),
      f("\\dfrac{2}{n-1}"),
      f("\\dfrac{2}{n!}"),
    ],
    theme: "formula",
  },
];
