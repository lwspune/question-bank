/**
 * NDA Maths · Binomial Distribution · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (multi-piece
 * `\qquad`-joined formula strings split into one atom per piece; key index =
 * 0-based position in the bundle). Covers all 17 sourceKind:"formula" atoms
 * (10 status:auto + 7 status:needs_review), so the formula theme has 17 atoms —
 * well above the 12-atom floor; no new pieces appended.
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *   npm run quiz:verify nda-maths__binomial-distribution-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bernoulli-trial: q=1-p | p+q=1 ──
  {
    atomKey: "bernoulli-trial:formula:0",
    stem: "For a Bernoulli trial with success probability \\(p\\), what is the failure probability \\(q\\)?",
    distractors: [f("q = 1 + p"), f("q = p - 1"), f("q = \\dfrac{1}{p}")],
    theme: "formula",
  },
  {
    atomKey: "bernoulli-trial:formula:1",
    stem: "Which relation always holds between the success and failure probabilities of a Bernoulli trial?",
    distractors: [f("p - q = 1"), f("p + q = 0"), f("pq = 1")],
    theme: "formula",
  },

  // ── reading-p-from-problem: odds → probability ──
  {
    atomKey: "reading-p-from-problem:formula:0",
    stem: "If success and failure occur in odds \\(a : b\\), what is the success probability \\(p\\)?",
    distractors: [
      f("\\text{odds } a : b \\ \\Longrightarrow\\ p = \\dfrac{a}{b}"),
      f("\\text{odds } a : b \\ \\Longrightarrow\\ p = \\dfrac{b}{a + b}"),
      f("\\text{odds } a : b \\ \\Longrightarrow\\ p = a"),
    ],
    theme: "formula",
  },

  // ── binomial-probability-formula: P(X=k) ──
  {
    atomKey: "binomial-probability-formula:formula:0",
    stem: "For \\(X \\sim B(n, p)\\), which is the probability of exactly \\(k\\) successes?",
    distractors: [
      f("P(X = k) = \\binom{n}{k} p^{\\,n-k} q^{\\,k}"),
      f("P(X = k) = \\binom{n}{k} p^{k} q^{k}"),
      f("P(X = k) = p^{k} q^{\\,n-k}"),
    ],
    theme: "formula",
  },

  // ── complement-at-least-one: P(X≥1) = 1 − qⁿ ──
  {
    atomKey: "complement-at-least-one:formula:0",
    stem: "Which gives the probability of at least one success in \\(n\\) trials?",
    distractors: [
      f("P(X \\ge 1) = 1 - p^{n}"),
      f("P(X \\ge 1) = q^{n}"),
      f("P(X \\ge 1) = 1 - nq"),
    ],
    theme: "formula",
  },

  // ── tail-probabilities: P(X≥2) via complement ──
  {
    atomKey: "tail-probabilities:formula:0",
    stem: "Which expresses \\(P(X \\ge 2)\\) using the complement of the short side?",
    distractors: [
      f("P(X \\ge 2) = 1 - P(X = 0)"),
      f("P(X \\ge 2) = P(X = 0) + P(X = 1)"),
      f("P(X \\ge 2) = 1 - P(X = 1) - P(X = 2)"),
    ],
    theme: "formula",
  },

  // ── complementary-count-variable: n − X ~ B(n, 1−p) ──
  {
    atomKey: "complementary-count-variable:formula:0",
    stem: "If \\(X \\sim B(n, p)\\), which distribution does the complementary count \\(n - X\\) follow?",
    distractors: [
      f("X \\sim B(n, p) \\ \\Longrightarrow\\ n - X \\sim B(n,\\, p)"),
      f("X \\sim B(n, p) \\ \\Longrightarrow\\ n - X \\sim B\\!\\left(\\tfrac{n}{2},\\, 1 - p\\right)"),
      f("X \\sim B(n, p) \\ \\Longrightarrow\\ n - X \\sim B(n - 1,\\, 1 - p)"),
    ],
    theme: "formula",
  },

  // ── why-np-npq: E(I)=p | Var(I)=pq (single trial) ──
  {
    atomKey: "why-np-npq:formula:0",
    stem: "For a single Bernoulli indicator \\(I\\) (1 on success, 0 on failure), what is its mean \\(E(I)\\)?",
    distractors: [f("E(I) = pq"), f("E(I) = np"), f("E(I) = q")],
    theme: "formula",
  },
  {
    atomKey: "why-np-npq:formula:1",
    stem: "For a single Bernoulli indicator \\(I\\), what is its variance \\(\\operatorname{Var}(I)\\)?",
    distractors: [f("\\operatorname{Var}(I) = p"), f("\\operatorname{Var}(I) = npq"), f("\\operatorname{Var}(I) = p + q")],
    theme: "formula",
  },

  // ── mean-variance-sd: μ=np | σ²=npq | σ=√(npq) ──
  {
    atomKey: "mean-variance-sd:formula:0",
    stem: "For \\(X \\sim B(n, p)\\), what is the mean \\(\\mu\\)?",
    distractors: [f("\\mu = npq"), f("\\mu = nq"), f("\\mu = \\sqrt{np}")],
    theme: "formula",
  },
  {
    atomKey: "mean-variance-sd:formula:1",
    stem: "For \\(X \\sim B(n, p)\\), what is the variance \\(\\sigma^2\\)?",
    distractors: [f("\\sigma^2 = np"), f("\\sigma^2 = \\sqrt{npq}"), f("\\sigma^2 = (np)^2")],
    theme: "formula",
  },
  {
    atomKey: "mean-variance-sd:formula:2",
    stem: "For \\(X \\sim B(n, p)\\), what is the standard deviation \\(\\sigma\\)?",
    distractors: [f("\\sigma = npq"), f("\\sigma = \\sqrt{np}"), f("\\sigma = np")],
    theme: "formula",
  },

  // ── recovering-n-and-p: q = σ²/μ ──
  {
    atomKey: "recovering-n-and-p:formula:0",
    stem: "Dividing the variance of \\(B(n, p)\\) by its mean gives which parameter?",
    distractors: [
      f("p = \\dfrac{\\sigma^2}{\\mu} = \\dfrac{npq}{np}"),
      f("q = \\dfrac{\\mu}{\\sigma^2} = \\dfrac{np}{npq}"),
      f("n = \\dfrac{\\sigma^2}{\\mu} = \\dfrac{npq}{np}"),
    ],
    theme: "formula",
  },

  // ── mean-variance-relation: np = c(npq) ⟹ q = 1/c ──
  {
    atomKey: "mean-variance-relation:formula:0",
    stem: "If the mean equals \\(c\\) times the variance \\((np = c\\,npq)\\), what is \\(q\\)?",
    distractors: [
      f("np = c\\,(npq) \\ \\Longrightarrow\\ p = \\dfrac{1}{c}"),
      f("np = c\\,(npq) \\ \\Longrightarrow\\ q = c"),
      f("np = c\\,(npq) \\ \\Longrightarrow\\ q = \\dfrac{c}{n}"),
    ],
    theme: "formula",
  },

  // ── parameter-from-probability-equation: ratio of two probabilities ──
  {
    atomKey: "parameter-from-probability-equation:formula:0",
    stem: "Which correctly gives the ratio \\(\\dfrac{P(X=b)}{P(X=a)}\\) for \\(X \\sim B(n, p)\\)?",
    distractors: [
      f("\\dfrac{P(X=b)}{P(X=a)} = \\dfrac{\\binom{n}{b}}{\\binom{n}{a}}\\, p^{\\,a-b}\\, q^{\\,b-a}"),
      f("\\dfrac{P(X=b)}{P(X=a)} = \\dfrac{\\binom{n}{a}}{\\binom{n}{b}}\\, p^{\\,b-a}\\, q^{\\,a-b}"),
      f("\\dfrac{P(X=b)}{P(X=a)} = \\dfrac{\\binom{n}{b}}{\\binom{n}{a}}\\, p^{\\,b-a}\\, q^{\\,b-a}"),
    ],
    theme: "formula",
  },

  // ── variance-invariance-complement: Var(n−X) = npq = Var(X) ──
  {
    atomKey: "variance-invariance-complement:formula:0",
    stem: "For \\(X \\sim B(n, p)\\), what is the variance of the complementary count \\(n - X\\)?",
    distractors: [
      f("\\operatorname{Var}(n - X) = nqp - np = -np^2"),
      f("\\operatorname{Var}(n - X) = n - npq"),
      f("\\operatorname{Var}(n - X) = nq = n - np"),
    ],
    theme: "formula",
  },

  // ── mean-of-symmetric-binomial: p=½ ⟹ μ = n/2 ──
  {
    atomKey: "mean-of-symmetric-binomial:formula:0",
    stem: "For the symmetric binomial \\(p = \\tfrac12\\), what is the mean \\(\\mu\\)?",
    distractors: [
      f("p = \\tfrac12 \\ \\Longrightarrow\\ \\mu = \\dfrac{n}{4}"),
      f("p = \\tfrac12 \\ \\Longrightarrow\\ \\mu = n"),
      f("p = \\tfrac12 \\ \\Longrightarrow\\ \\mu = \\dfrac{1}{2}"),
    ],
    theme: "formula",
  },
];
