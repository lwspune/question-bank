/**
 * NDA Maths · Binomial Distribution · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (each concept's only trap
 * → index 0; binomial-setting also carries one). The first distractor in each is
 * the warned mistake. Every `correct` re-derived.
 *   npm run quiz:verify nda-maths__binomial-distribution-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // n must be fixed in advance — "until the first success" is NOT binomial
    atomKey: "binomial-setting:trap:0",
    stem: "Which experiment is NOT binomial?",
    correct: "Toss a coin until the first head appears and count the tosses.",
    distractors: [
      "Toss a coin exactly 10 times and count the heads.",
      "Roll a die 5 times and count the sixes.",
      "Inspect 20 fixed items and count the defectives.",
    ],
    theme: "trap",
  },
  {
    // "thrice as likely" = odds 3:1 ⇒ p = 3/4, not p = 3 or 1/3
    atomKey: "reading-p-from-problem:trap:0",
    stem: "A coin is biased so heads is thrice as likely as tails. What is \\(p\\) = P(heads)?",
    correct: f("p = \\tfrac34"),
    distractors: [f("p = 3"), f("p = \\tfrac13"), f("p = \\tfrac14")],
    theme: "trap",
  },
  {
    // pᵏ qⁿ⁻ᵏ — do not swap the exponents
    atomKey: "binomial-probability-formula:trap:0",
    stem: "For \\(X \\sim B(5, \\tfrac13)\\), what is \\(P(X = 2)\\)?",
    correct: f("\\dfrac{80}{243}"),
    distractors: [f("\\dfrac{40}{243}"), f("\\dfrac{8}{243}"), f("\\dfrac{10}{243}")],
    theme: "trap",
  },
  {
    // "at most" flips to a complement
    atomKey: "complement-at-least-one:trap:0",
    stem: "A fair coin is tossed 5 times. What is the probability of at most 4 tails?",
    correct: f("\\tfrac{31}{32}"),
    distractors: [f("\\tfrac{1}{32}"), f("\\tfrac45"), f("\\tfrac{5}{32}")],
    theme: "trap",
  },
  {
    // count the tail terms; include the boundary j=n
    atomKey: "tail-probabilities:trap:0",
    stem: "A fair coin is tossed 8 times. What is the probability of at least 6 heads?",
    correct: f("\\dfrac{37}{256}"),
    distractors: [f("\\dfrac{36}{256}"), f("\\dfrac{28}{256}"), f("\\dfrac{9}{256}")],
    theme: "trap",
  },
  {
    // n stays the same; only p flips
    atomKey: "complementary-count-variable:trap:0",
    stem: "Defectives \\(X \\sim B(20, \\tfrac14)\\). What distribution does the count of non-defectives follow?",
    correct: f("B\\!\\left(20, \\tfrac34\\right)"),
    distractors: [
      f("B\\!\\left(10, \\tfrac34\\right)"),
      f("B\\!\\left(20, \\tfrac14\\right)"),
      f("B\\!\\left(15, \\tfrac34\\right)"),
    ],
    theme: "trap",
  },
  {
    // SD = √(npq); square it to get the variance
    atomKey: "mean-variance-sd:trap:0",
    stem: "A binomial distribution has mean 6 and standard deviation 2. What is its variance?",
    correct: f("4"),
    distractors: [f("2"), f("6"), f("\\sqrt{2}")],
    theme: "trap",
  },
  {
    // variance ÷ mean = q (failure), then p = 1 − q
    atomKey: "recovering-n-and-p:trap:0",
    stem: "A binomial distribution has mean 12 and variance 4. What is the success probability \\(p\\)?",
    correct: f("p = \\tfrac23"),
    distractors: [f("p = \\tfrac13"), f("p = \\tfrac{1}{12}"), f("p = 3")],
    theme: "trap",
  },
  {
    // np = c·npq ⇒ surviving factor is q (= 1/c)
    atomKey: "mean-variance-relation:trap:0",
    stem: "In a binomial distribution the mean is 3 times the variance. What is \\(q\\)?",
    correct: f("q = \\tfrac13"),
    distractors: [f("q = 3"), f("q = \\tfrac23"), f("q = \\tfrac12")],
    theme: "trap",
  },
  {
    // coefficient symmetry C(6,4)=C(6,2); positive root ⇒ p = q = 1/2
    atomKey: "parameter-from-probability-equation:trap:0",
    stem: "For \\(X \\sim B(6, p)\\), \\(P(X = 4) = P(X = 2)\\). What is \\(p\\)?",
    correct: f("p = \\tfrac12"),
    distractors: [f("p = \\tfrac13"), f("p = \\tfrac23"), f("p = \\tfrac14")],
    theme: "trap",
  },
  {
    // variance is unchanged by Y = n − X; only the mean flips
    atomKey: "variance-invariance-complement:trap:0",
    stem: "\\(X \\sim B(50, \\tfrac35)\\) and \\(Y = 50 - X\\). What is \\(\\operatorname{Var}(Y)\\)?",
    correct: f("12"),
    distractors: [f("30"), f("20"), f("18")],
    theme: "trap",
  },
  {
    // mean = np (= 4), NOT n/2, when p ≠ ½
    atomKey: "mean-of-symmetric-binomial:trap:0",
    stem: "For \\(X \\sim B(12, \\tfrac13)\\), what is the mean number of successes?",
    correct: f("4"),
    distractors: [f("6"), f("8"), f("3")],
    theme: "trap",
  },
];
