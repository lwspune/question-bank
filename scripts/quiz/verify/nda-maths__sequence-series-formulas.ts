/**
 * NDA Maths · Sequence & Series · per-FORMULA recall MCQs.
 * Each formula gets a specific stem + 3 TEMPTING PERMUTATION distractors — wrong
 * versions of the SAME formula, in the SAME full-equation format as the answer
 * (no length/format tell). Run:
 *   npm run quiz:verify nda-maths__sequence-series-formulas
 *
 * Covers the recallable formulas the chapter teaches: AP nth-term + sum,
 * term-from-sum, ratio-of-sums, GP nth-term + GM + finite/infinite sums, HP
 * definition + harmonic mean, power-sums (Σk, Σk², Σk³ as each other's
 * distractors), AM/GM/HM + GM²=AM·HM, continued-fraction quadratics, and Vieta.
 *
 * Skipped (not a formula — bare condition/connective, parked harmless):
 *   ap-nth-term-from-sum:formula:1   "(n ≥ 2)"
 *   ap-sum-ratios:formula:1          "when"
 *   foundations-sequence-series:formula:1  "(n ≥ 2)"
 *   gp-sum-finite:formula:1          "(r ≠ 1)"
 *   gp-sum-infinite:formula:1        "(|r| < 1)"
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Arithmetic Progression ──
  { atomKey: "ap-nth-term-and-sum:formula:0", stem: "Which is the nth-term formula for an AP?", distractors: [f("a_n = a + nd"), f("a_n = a + (n+1)d"), f("a_n = a - (n-1)d")], theme: "formula" },
  { atomKey: "ap-nth-term-and-sum:formula:1", stem: "Which is the sum-of-n-terms formula for an AP?", distractors: [f("S_n = \\frac{n}{2}\\,[\\,2a + nd\\,] = \\frac{n}{2}(a + l)"), f("S_n = \\frac{n}{2}\\,[\\,a + (n-1)d\\,] = \\frac{n}{2}(a + l)"), f("S_n = n\\,[\\,2a + (n-1)d\\,] = n(a + l)")], theme: "formula" },
  { atomKey: "ap-nth-term-from-sum:formula:0", stem: "How do you recover the nth term from the sum of n terms?", distractors: [f("a_n = S_n - S_{n+1}"), f("a_n = S_{n-1} - S_n"), f("a_n = S_n + S_{n-1}")], theme: "formula" },
  { atomKey: "ap-sum-ratios:formula:0", stem: "If the ratio of sums of two APs is f(n):g(n), what is the ratio of their nth terms?", distractors: [f("\\frac{a_n}{a_n'} = \\frac{f(2n+1)}{g(2n+1)}"), f("\\frac{a_n}{a_n'} = \\frac{f(2n)}{g(2n)}"), f("\\frac{a_n}{a_n'} = \\frac{f(n-1)}{g(n-1)}")], theme: "formula" },
  { atomKey: "ap-sum-ratios:formula:2", stem: "What is the ratio of sums of two APs in terms of the polynomials f and g?", distractors: [f("\\frac{S_n}{S_n'} = \\frac{f(2n-1)}{g(2n-1)}"), f("\\frac{S_n}{S_n'} = \\frac{f(n-1)}{g(n-1)}"), f("\\frac{S_n}{S_n'} = \\frac{g(n)}{f(n)}")], theme: "formula" },

  // ── Foundations (term ↔ sum) ──
  { atomKey: "foundations-sequence-series:formula:0", stem: "Which relation gives the nth term from the partial sums of a series?", distractors: [f("a_n = S_n - S_{n+1}"), f("a_n = S_{n-1} - S_n"), f("a_n = S_n + S_{n-1}")], theme: "formula" },
  { atomKey: "foundations-sequence-series:formula:2", stem: "What is the first term of a series in terms of its partial sums?", distractors: [f("a_1 = S_1 - S_0"), f("a_1 = S_0"), f("a_1 = S_2 - S_1")], theme: "formula" },

  // ── Geometric Progression ──
  { atomKey: "gp-nth-term-and-mean:formula:0", stem: "Which is the nth-term formula for a GP?", distractors: [f("a_n = a\\,r^{\\,n}"), f("a_n = a\\,r^{\\,n+1}"), f("a_n = a + r^{\\,n-1}")], theme: "formula" },
  { atomKey: "gp-nth-term-and-mean:formula:1", stem: "If a, b, c are in GP, which condition holds (geometric mean)?", distractors: [f("b^2 = a + c \\ \\text{(for } a,b,c \\text{ in GP)}"), f("b = ac \\ \\text{(for } a,b,c \\text{ in GP)}"), f("2b = ac \\ \\text{(for } a,b,c \\text{ in GP)}")], theme: "formula" },
  { atomKey: "gp-sum-finite:formula:0", stem: "Which is the sum of the first n terms of a GP (r ≠ 1)?", distractors: [f("S_n = \\frac{a\\,(r^{n-1} - 1)}{r - 1}"), f("S_n = \\frac{a\\,(1 - r^n)}{r + 1}"), f("S_n = \\frac{a\\,(r^n - 1)}{r + 1}")], theme: "formula" },
  { atomKey: "gp-sum-infinite:formula:0", stem: "Which is the sum of an infinite GP with |r| < 1?", distractors: [f("S_\\infty = \\frac{a}{r - 1}"), f("S_\\infty = \\frac{a}{1 + r}"), f("S_\\infty = \\frac{1}{1 - r}")], theme: "formula" },

  // ── Harmonic Progression ──
  { atomKey: "hp-definition:formula:0", stem: "Which is the nth-term formula for an HP (reciprocal of an AP)?", distractors: [f("a_n = \\frac{1}{a + nd}"), f("a_n = a + (n-1)d"), f("a_n = \\frac{1}{a - (n-1)d}")], theme: "formula" },
  { atomKey: "hp-definition:formula:1", stem: "If a, b, c are in HP, which gives the harmonic mean b?", distractors: [f("b = \\frac{a+c}{2ac}\\ \\text{(for } a,b,c \\text{ in HP)}"), f("b = \\frac{ac}{a+c}\\ \\text{(for } a,b,c \\text{ in HP)}"), f("b = \\frac{2ac}{a-c}\\ \\text{(for } a,b,c \\text{ in HP)}")], theme: "formula" },

  // ── Power sums (the three closed forms as each other's distractors) ──
  { atomKey: "power-sums:formula:0", stem: "What is the sum of the first n natural numbers, Σk?", distractors: [f("\\sum k = \\frac{n(n-1)}{2}"), f("\\sum k = \\frac{n(n+1)(2n+1)}{6}"), f("\\sum k = \\left[\\frac{n(n+1)}{2}\\right]^2")], theme: "formula" },
  { atomKey: "power-sums:formula:1", stem: "What is the sum of squares Σk² of the first n natural numbers?", distractors: [f("\\sum k^2 = \\frac{n(n+1)}{2}"), f("\\sum k^2 = \\left[\\frac{n(n+1)}{2}\\right]^2"), f("\\sum k^2 = \\frac{n(n+1)(2n-1)}{6}")], theme: "formula" },
  { atomKey: "power-sums:formula:2", stem: "What is the sum of cubes Σk³ of the first n natural numbers?", distractors: [f("\\sum k^3 = \\frac{n(n+1)(2n+1)}{6}"), f("\\sum k^3 = \\frac{n(n+1)}{2}"), f("\\sum k^3 = \\left[\\frac{n(n+1)(2n+1)}{6}\\right]^2")], theme: "formula" },

  // ── Self-referential continued fractions / nested radicals ──
  { atomKey: "self-referential-continued-fractions:formula:0", stem: "The periodic continued fraction x = a + 1/x reduces to which quadratic?", distractors: [f("x = a + \\tfrac{1}{x}\\ \\Rightarrow\\ x^2 - ax + 1 = 0"), f("x = a + \\tfrac{1}{x}\\ \\Rightarrow\\ x^2 + ax - 1 = 0"), f("x = a + \\tfrac{1}{x}\\ \\Rightarrow\\ ax^2 - x - 1 = 0")], theme: "formula" },
  { atomKey: "self-referential-continued-fractions:formula:1", stem: "The nested radical x = √(a + x) reduces to which quadratic?", distractors: [f("x = \\sqrt{a + x}\\ \\Rightarrow\\ x^2 + x - a = 0"), f("x = \\sqrt{a + x}\\ \\Rightarrow\\ x^2 - x + a = 0"), f("x = \\sqrt{a + x}\\ \\Rightarrow\\ x^2 - ax - 1 = 0")], theme: "formula" },

  // ── AM / GM / HM and the relation between them ──
  { atomKey: "three-means-am-gm-hm:formula:0", stem: "What is the arithmetic mean (AM) of a and b?", distractors: [f("\\text{AM} = \\frac{2ab}{a+b}"), f("\\text{AM} = \\sqrt{ab}"), f("\\text{AM} = \\frac{a-b}{2}")], theme: "formula" },
  { atomKey: "three-means-am-gm-hm:formula:1", stem: "What is the geometric mean (GM) of a and b?", distractors: [f("\\text{GM} = \\frac{a+b}{2}"), f("\\text{GM} = \\frac{2ab}{a+b}"), f("\\text{GM} = \\frac{\\sqrt{a}+\\sqrt{b}}{2}")], theme: "formula" },
  { atomKey: "three-means-am-gm-hm:formula:2", stem: "What is the harmonic mean (HM) of a and b?", distractors: [f("\\text{HM} = \\frac{a+b}{2ab}"), f("\\text{HM} = \\frac{ab}{a+b}"), f("\\text{HM} = \\frac{a+b}{2}")], theme: "formula" },
  { atomKey: "three-means-am-gm-hm:formula:3", stem: "Which relation connects the three means AM, GM, HM?", distractors: [f("\\text{AM}^2 = \\text{GM}\\cdot\\text{HM}"), f("\\text{HM}^2 = \\text{AM}\\cdot\\text{GM}"), f("\\text{GM} = \\text{AM}\\cdot\\text{HM}")], theme: "formula" },

  // ── Vieta's relations ──
  { atomKey: "vieta-progression-conditions:formula:0", stem: "For ax² + bx + c = 0, what is the sum of the roots?", distractors: [f("\\alpha + \\beta = \\frac{b}{a}"), f("\\alpha + \\beta = -\\frac{c}{a}"), f("\\alpha + \\beta = -\\frac{b}{c}")], theme: "formula" },
  { atomKey: "vieta-progression-conditions:formula:1", stem: "For ax² + bx + c = 0, what is the product of the roots?", distractors: [f("\\alpha\\beta = -\\frac{c}{a}"), f("\\alpha\\beta = \\frac{b}{a}"), f("\\alpha\\beta = \\frac{a}{c}")], theme: "formula" },

  // ── Bucket 2 enrichment 2026-06-10 (clever AP identities + GP product symmetry) ──
  { atomKey: "ap-clever-identities:formula:0", stem: "If \\(S_m = n\\) and \\(S_n = m\\) (AP, \\(m\\ne n\\)), then \\(S_{m+n} = ?\\)", distractors: [f("S_{m+n} = m+n"), f("S_{m+n} = 0"), f("S_{m+n} = -(m-n)")], theme: "formula" },
  { atomKey: "ap-clever-identities:formula:1", stem: "If \\(p\\,a_p = q\\,a_q\\) (AP, \\(p\\ne q\\)), then which holds?", distractors: [f("a_{p+q} = p+q"), f("a_{pq} = 0"), f("a_{p+q} = 1")], theme: "formula" },
  { atomKey: "ap-clever-identities:formula:2", stem: "If \\(S_p = S_q\\) (AP, \\(p\\ne q\\)), then which holds?", distractors: [f("S_{p+q} = p+q"), f("S_{p+q} = -(p+q)"), f("S_{pq} = 0")], theme: "formula" },
  { atomKey: "gp-product-symmetry:formula:0", stem: "In a GP, the product of terms equidistant from the ends equals:", distractors: [f("a_k \\cdot a_{n+1-k} = a_1 + a_n"), f("a_k \\cdot a_{n+1-k} = a_1 \\cdot a_{n-1}"), f("a_k + a_{n+1-k} = a_1 \\cdot a_n")], theme: "formula" },
  { atomKey: "gp-product-symmetry:formula:1", stem: "The product of the first \\(2m-1\\) terms of a GP (middle term \\(M\\)) is:", distractors: [f("\\prod_{i=1}^{2m-1} a_i = M^{2m}"), f("\\prod_{i=1}^{2m-1} a_i = (2m-1)M"), f("\\prod_{i=1}^{2m-1} a_i = M^{m}")], theme: "formula" },

  // ── auto-atom fixes (2026-06-11) ──
  // The arithmetic mean of a and b: AM = (a+b)/2.
  { atomKey: "ap-means-symmetric-terms:formula:0", stem: "The arithmetic mean of two numbers \\(a\\) and \\(b\\) is:", distractors: [f("\\text{AM} = a + b"), f("\\text{AM} = \\sqrt{ab}"), f("\\text{AM} = \\frac{2ab}{a+b}")], theme: "formula" },
  // Three-term AP condition: 2b = a + c.
  { atomKey: "ap-properties-condition:formula:0", stem: "Three numbers \\(a, b, c\\) are in AP if and only if:", distractors: [f("2b = ac"), f("b^2 = a + c"), f("b = a + c")], theme: "formula" },
  // Common terms of two APs form an AP with common difference = lcm(d1, d2).
  { atomKey: "common-terms-of-two-aps:formula:0", stem: "The common terms of two APs with common differences \\(d_1\\) and \\(d_2\\) form an AP whose common difference is:", distractors: [f("d_{\\text{common}} = \\gcd(d_1, d_2)"), f("d_{\\text{common}} = d_1 \\cdot d_2"), f("d_{\\text{common}} = d_1 + d_2")], theme: "formula" },
  // Factorial telescoping sum: Σ k·k! = (n+1)! − 1.
  { atomKey: "factorial-series:formula:0", stem: "Using \\(k\\cdot k! = (k+1)! - k!\\), the sum \\(\\sum_{k=1}^{n} k\\cdot k!\\) equals:", distractors: [f("\\sum_{k=1}^{n} k\\cdot k! = (n+1)! + 1"), f("\\sum_{k=1}^{n} k\\cdot k! = n! - 1"), f("\\sum_{k=1}^{n} k\\cdot k! = (n+1)!")], theme: "formula" },
  // Harmonic mean of n numbers: HM = n / Σ(1/x_i).
  { atomKey: "harmonic-mean-computation:formula:0", stem: "The harmonic mean of \\(n\\) positive numbers \\(x_1, \\ldots, x_n\\) is:", distractors: [f("\\text{HM} = \\frac{\\sum_{i=1}^{n} x_i}{n}"), f("\\text{HM} = \\frac{\\sum_{i=1}^{n} \\frac{1}{x_i}}{n}"), f("\\text{HM} = n\\sum_{i=1}^{n} \\frac{1}{x_i}")], theme: "formula" },
  // Log bridge: x,y,z in GP ⟺ log x, log y, log z in AP.
  { atomKey: "log-bridge-gp-to-ap:formula:0", stem: "Which bridge converts a GP into an AP by taking logarithms?", distractors: [f("x, y, z \\text{ in AP} \\iff \\log x, \\log y, \\log z \\text{ in GP}"), f("x, y, z \\text{ in GP} \\iff \\log x, \\log y, \\log z \\text{ in HP}"), f("x, y, z \\text{ in GP} \\iff \\log x, \\log y, \\log z \\text{ in GP}")], theme: "formula" },
  // Reciprocal bridge: 1/u,1/v,1/w in HP ⟺ u,v,w in AP.
  { atomKey: "reciprocal-bridge-hp-to-ap:formula:0", stem: "Which bridge converts an HP into an AP by taking reciprocals?", distractors: [f("\\frac{1}{u}, \\frac{1}{v}, \\frac{1}{w} \\text{ in AP} \\iff u, v, w \\text{ in HP}"), f("\\frac{1}{u}, \\frac{1}{v}, \\frac{1}{w} \\text{ in HP} \\iff u, v, w \\text{ in GP}"), f("\\frac{1}{u}, \\frac{1}{v}, \\frac{1}{w} \\text{ in HP} \\iff u, v, w \\text{ in HP}")], theme: "formula" },
  // Telescoping standard sum: Σ 1/(k(k+1)) = n/(n+1).
  { atomKey: "telescoping-and-number-patterns:formula:0", stem: "\\(\\displaystyle\\sum_{k=1}^{n} \\frac{1}{k(k+1)}\\) equals:", distractors: [f("\\sum_{k=1}^{n} \\frac{1}{k(k+1)} = 1 - \\frac{1}{n} = \\frac{n-1}{n}"), f("\\sum_{k=1}^{n} \\frac{1}{k(k+1)} = 1 + \\frac{1}{n+1} = \\frac{n+2}{n+1}"), f("\\sum_{k=1}^{n} \\frac{1}{k(k+1)} = \\frac{1}{n+1}")], theme: "formula" },
  // The unifying ratio (a−b)/(b−c): 1 for AP, a/b for GP, a/c for HP.
  { atomKey: "three-term-conditions:formula:0", stem: "For three numbers \\(a, b, c\\), the ratio \\(\\frac{a-b}{b-c}\\) distinguishes the progressions as:", distractors: [f("\\frac{a-b}{b-c} = \\begin{cases} 1 & \\text{AP} \\\\[2pt] a/c & \\text{GP} \\\\[2pt] a/b & \\text{HP} \\end{cases}"), f("\\frac{a-b}{b-c} = \\begin{cases} a/b & \\text{AP} \\\\[2pt] 1 & \\text{GP} \\\\[2pt] a/c & \\text{HP} \\end{cases}"), f("\\frac{a-b}{b-c} = \\begin{cases} a/c & \\text{AP} \\\\[2pt] a/b & \\text{GP} \\\\[2pt] 1 & \\text{HP} \\end{cases}")], theme: "formula" },
];
