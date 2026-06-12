/**
 * NDA Maths · Quadratic Equations · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data. Each `correct`
 * is the atom's existing formula.latex (read from the harvested JSON); these entries
 * only supply a CONCRETE stem (naming the formula) + 3 full-equation permutation
 * distractors — wrong versions of the SAME identity, same shape, no length tell.
 *
 * Covers all 35 formula atoms (the 11 `auto` ones the publish-guard targets PLUS
 * the 24 `needs_review` formula atoms), so the whole formula theme is publishable.
 * NONE skipped — every formula.latex here is a genuinely recallable identity,
 * condition, or named structural result a student is expected to know.
 *   npm run quiz:verify nda-maths__quadratic-equations-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── qe-what-is-a-quadratic: standard form | a≠0 ──
  {
    atomKey: "qe-what-is-a-quadratic:formula:0",
    stem: "What is the standard form of a quadratic equation?",
    distractors: [f("ax^2 + bx + c"), f("ax + b = 0"), f("ax^3 + bx + c = 0")],
    theme: "formula",
  },
  {
    atomKey: "qe-what-is-a-quadratic:formula:1",
    stem: "In \\(ax^2 + bx + c = 0\\), what condition must the leading coefficient satisfy for it to be quadratic?",
    distractors: [f("a = 0"), f("a > 0"), f("b \\neq 0")],
    theme: "formula",
  },

  // ── qe-solving-methods: quadratic formula (AUTO) ──
  {
    atomKey: "qe-solving-methods:formula:0",
    stem: "Which is the quadratic formula for the roots of \\(ax^2 + bx + c = 0\\)?",
    distractors: [
      f("x = \\dfrac{b \\pm \\sqrt{b^2 - 4ac}}{2a}"),
      f("x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{a}"),
      f("x = \\dfrac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}"),
    ],
    theme: "formula",
  },

  // ── qe-discriminant-nature: D = b²-4ac (AUTO) ──
  {
    atomKey: "qe-discriminant-nature:formula:0",
    stem: "What is the discriminant \\(D\\) of \\(ax^2 + bx + c = 0\\)?",
    distractors: [f("D = b^2 + 4ac"), f("D = b^2 - 2ac"), f("D = \\sqrt{b^2 - 4ac}")],
    theme: "formula",
  },

  // ── qe-equal-roots-progressions: GP | AP | HP coefficient tests ──
  {
    atomKey: "qe-equal-roots-progressions:formula:0",
    stem: "When the coefficients \\(a, b, c\\) are in GP, which relation holds?",
    distractors: [f("\\text{GP}:\\ b^2 = a + c"), f("\\text{GP}:\\ 2b = ac"), f("\\text{GP}:\\ b = \\sqrt{a + c}")],
    theme: "formula",
  },
  {
    atomKey: "qe-equal-roots-progressions:formula:1",
    stem: "When the coefficients \\(a, b, c\\) are in AP, which relation holds?",
    distractors: [f("\\text{AP}:\\ b = a + c"), f("\\text{AP}:\\ 2b = ac"), f("\\text{AP}:\\ b^2 = a + c")],
    theme: "formula",
  },
  {
    atomKey: "qe-equal-roots-progressions:formula:2",
    stem: "When the coefficients \\(a, b, c\\) are in HP, which relation holds?",
    distractors: [
      f("\\text{HP}:\\ \\tfrac{2}{b} = \\tfrac{1}{a} - \\tfrac{1}{c}"),
      f("\\text{HP}:\\ \\tfrac{1}{b} = \\tfrac{1}{a} + \\tfrac{1}{c}"),
      f("\\text{HP}:\\ 2b = a + c"),
    ],
    theme: "formula",
  },

  // ── qe-difference-and-ratio-of-roots: |α-β| (AUTO) ──
  {
    atomKey: "qe-difference-and-ratio-of-roots:formula:0",
    stem: "What is the magnitude of the difference of the roots, \\(|\\alpha - \\beta|\\)?",
    distractors: [
      f("|\\alpha - \\beta| = \\sqrt{(\\alpha+\\beta)^2 - 2\\alpha\\beta} = \\dfrac{\\sqrt{D}}{|a|}"),
      f("|\\alpha - \\beta| = \\sqrt{(\\alpha+\\beta)^2 - 4\\alpha\\beta} = \\dfrac{D}{|a|}"),
      f("|\\alpha - \\beta| = \\sqrt{(\\alpha-\\beta)^2 - 4\\alpha\\beta} = \\dfrac{\\sqrt{D}}{2|a|}"),
    ],
    theme: "formula",
  },

  // ── qe-vanishing-coefficient-sum: a+b+c=0 shortcut | other root c/a ──
  {
    atomKey: "qe-vanishing-coefficient-sum:formula:0",
    stem: "Which condition guarantees that \\(x = 1\\) is a root of \\(ax^2 + bx + c = 0\\)?",
    distractors: [
      f("a - b + c = 0 \\iff x = 1 \\text{ is a root}"),
      f("a + b + c = 0 \\iff x = -1 \\text{ is a root}"),
      f("ab + c = 0 \\iff x = 1 \\text{ is a root}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "qe-vanishing-coefficient-sum:formula:1",
    stem: "A quadratic \\(ax^2 + bx + c = 0\\) has \\(a + b + c = 0\\), so its roots are \\(1\\) and which value?",
    distractors: [
      f("\\text{other root} = \\tfrac{a}{c}"),
      f("\\text{other root} = -\\tfrac{c}{a}"),
      f("\\text{other root} = \\tfrac{b}{a}"),
    ],
    theme: "formula",
  },

  // ── qe-location-of-roots: D≥0 | f(p)>0 | f(q)>0 | vertex in (p,q) ──
  {
    atomKey: "qe-location-of-roots:formula:0",
    stem: "For both roots to be real (a prerequisite for locating them on the number line), which condition is required?",
    distractors: [f("D < 0"), f("D = 0"), f("D \\le 0")],
    theme: "formula",
  },
  {
    atomKey: "qe-location-of-roots:formula:1",
    stem: "For both roots of an upward parabola to lie strictly above \\(p\\), what sign condition does \\(f(p)\\) need (with \\(a > 0\\))?",
    distractors: [f("f(p) < 0"), f("f(p) = 0"), f("f(p) \\le 0")],
    theme: "formula",
  },
  {
    atomKey: "qe-location-of-roots:formula:2",
    stem: "For both roots of an upward parabola to lie strictly below \\(q\\), what sign condition does \\(f(q)\\) need (with \\(a > 0\\))?",
    distractors: [f("f(q) < 0"), f("f(q) = 0"), f("f(q) \\le 0")],
    theme: "formula",
  },
  {
    atomKey: "qe-location-of-roots:formula:3",
    stem: "For both roots to lie inside the interval \\((p, q)\\), where must the vertex of \\(f(x) = ax^2 + bx + c\\) lie?",
    distractors: [
      f("p < -\\tfrac{b}{a} < q"),
      f("p < \\tfrac{b}{2a} < q"),
      f("p < -\\tfrac{2a}{b} < q"),
    ],
    theme: "formula",
  },

  // ── qe-reduce-to-quadratic: substitution u=√x or x² (AUTO) ──
  {
    atomKey: "qe-reduce-to-quadratic:formula:0",
    stem: "Which substitution reduces a biquadratic / surd equation to a quadratic (with the domain constraint on the new variable)?",
    distractors: [
      f("u = \\sqrt{x}\\ (\\le 0)\\ \\text{ or }\\ u = x^2\\ (\\le 0)\\ \\Rightarrow\\ \\text{quadratic in } u"),
      f("u = \\sqrt{x}\\ \\text{ or }\\ u = 2x\\ \\Rightarrow\\ \\text{quadratic in } u"),
      f("u = x^{1/3}\\ (\\ge 0)\\ \\Rightarrow\\ \\text{quadratic in } u"),
    ],
    theme: "formula",
  },

  // ── qe-vieta-sum-product: α+β=-b/a | αβ=c/a ──
  {
    atomKey: "qe-vieta-sum-product:formula:0",
    stem: "By Vieta's relations, what is the sum of the roots \\(\\alpha + \\beta\\) of \\(ax^2 + bx + c = 0\\)?",
    distractors: [
      f("\\alpha + \\beta = \\dfrac{b}{a}"),
      f("\\alpha + \\beta = -\\dfrac{c}{a}"),
      f("\\alpha + \\beta = -\\dfrac{b}{2a}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "qe-vieta-sum-product:formula:1",
    stem: "By Vieta's relations, what is the product of the roots \\(\\alpha\\beta\\) of \\(ax^2 + bx + c = 0\\)?",
    distractors: [
      f("\\alpha\\beta = -\\dfrac{c}{a}"),
      f("\\alpha\\beta = \\dfrac{b}{a}"),
      f("\\alpha\\beta = \\dfrac{c}{b}"),
    ],
    theme: "formula",
  },

  // ── qe-symmetric-functions: forming x²-Sx+P=0 | S,P new ──
  {
    atomKey: "qe-symmetric-functions:formula:0",
    stem: "Given sum \\(S\\) and product \\(P\\) of the desired roots, which monic equation has them as roots?",
    distractors: [f("x^2 + S x + P = 0"), f("x^2 - S x - P = 0"), f("x^2 - P x + S = 0")],
    theme: "formula",
  },
  {
    atomKey: "qe-symmetric-functions:formula:1",
    stem: "When forming a new quadratic from transformed roots, what do \\(S\\) and \\(P\\) denote?",
    distractors: [
      f("S = \\text{(new product)},\\ P = \\text{(new sum)}"),
      f("S = \\text{(old sum)},\\ P = \\text{(old product)}"),
      f("S = \\text{(new difference)},\\ P = \\text{(new product)}"),
    ],
    theme: "formula",
  },

  // ── qe-special-root-relations: AM | GM | HM of roots ──
  {
    atomKey: "qe-special-root-relations:formula:0",
    stem: "What is the arithmetic mean (AM) of the roots of \\(ax^2 + bx + c = 0\\)?",
    distractors: [f("\\text{AM} = -\\tfrac{b}{a}"), f("\\text{AM} = \\tfrac{b}{2a}"), f("\\text{AM} = -\\tfrac{c}{2a}")],
    theme: "formula",
  },
  {
    atomKey: "qe-special-root-relations:formula:1",
    stem: "What is the geometric mean (GM) of the roots of \\(ax^2 + bx + c = 0\\)?",
    distractors: [f("\\text{GM} = \\tfrac{c}{a}"), f("\\text{GM} = \\sqrt{\\tfrac{a}{c}}"), f("\\text{GM} = \\sqrt{-\\tfrac{b}{a}}")],
    theme: "formula",
  },
  {
    atomKey: "qe-special-root-relations:formula:2",
    stem: "What is the harmonic mean (HM) of the roots of \\(ax^2 + bx + c = 0\\)?",
    distractors: [f("\\text{HM} = -\\tfrac{b}{2c}"), f("\\text{HM} = \\tfrac{2c}{b}"), f("\\text{HM} = -\\tfrac{2a}{b}")],
    theme: "formula",
  },

  // ── qe-cross-equation-conditions: n²+pn+m=0 / m²+pm+n=0 (AUTO) ──
  {
    atomKey: "qe-cross-equation-conditions:formula:0",
    stem: "If \\(n\\) satisfies \\(t^2+pt+m=0\\) and \\(m\\) satisfies \\(t^2+pt+n=0\\), subtracting gives which factored condition?",
    distractors: [
      f("n^2+pn+m = 0,\\ \\ m^2+pm+n = 0 \\ \\Rightarrow\\ (n-m)(n+m-p-1) = 0"),
      f("n^2+pn+m = 0,\\ \\ m^2+pm+n = 0 \\ \\Rightarrow\\ (n+m)(n-m+p-1) = 0"),
      f("n^2+pn+m = 0,\\ \\ m^2+pm+n = 0 \\ \\Rightarrow\\ (n-m)(n+m+p+1) = 0"),
    ],
    theme: "formula",
  },

  // ── qe-reduce-symmetric-substitution: (x-a)⁴+(x-b)⁴=k (AUTO) ──
  {
    atomKey: "qe-reduce-symmetric-substitution:formula:0",
    stem: "Which substitution turns \\((x-a)^4 + (x-b)^4 = k\\) into a biquadratic in one variable?",
    distractors: [
      f("(x-a)^4 + (x-b)^4 = k,\\ \\ u = x - \\tfrac{a+b}{2} \\ \\Rightarrow\\ u^4 + Au^3 + B = 0"),
      f("(x-a)^4 + (x-b)^4 = k,\\ \\ u = x - (a+b) \\ \\Rightarrow\\ u^4 + Au^2 + B = 0"),
      f("(x-a)^4 + (x-b)^4 = k,\\ \\ u = x + \\tfrac{a+b}{2} \\ \\Rightarrow\\ u^3 + Au + B = 0"),
    ],
    theme: "formula",
  },

  // ── qe-self-referential-roots: s=α+β | p=αβ system ──
  {
    atomKey: "qe-self-referential-roots:formula:0",
    stem: "In a self-referential root problem, what does \\(s\\) denote in the system you set up?",
    distractors: [f("s = \\alpha\\beta"), f("s = \\alpha - \\beta"), f("s = \\alpha^2 + \\beta^2")],
    theme: "formula",
  },
  {
    atomKey: "qe-self-referential-roots:formula:1",
    stem: "In a self-referential root problem, after writing \\(p = \\alpha\\beta\\), what do you do next?",
    distractors: [
      f("p = \\alpha + \\beta \\ \\Rightarrow\\ \\text{solve the system in } s, p"),
      f("p = \\alpha\\beta \\ \\Rightarrow\\ \\text{discard } s \\text{ and solve for } p \\text{ alone}"),
      f("p = \\alpha - \\beta \\ \\Rightarrow\\ \\text{solve the system in } s, p"),
    ],
    theme: "formula",
  },

  // ── qe-structural-root-problems: {α²,β²}={α,β} (AUTO) ──
  {
    atomKey: "qe-structural-root-problems:formula:0",
    stem: "If \\(\\{\\alpha^2, \\beta^2\\} = \\{\\alpha, \\beta\\}\\), to which set must the roots belong?",
    distractors: [
      f("\\{\\alpha^2, \\beta^2\\} = \\{\\alpha, \\beta\\} \\ \\Rightarrow\\ \\alpha, \\beta \\in \\{1, -1, \\omega, \\omega^2\\}"),
      f("\\{\\alpha^2, \\beta^2\\} = \\{\\alpha, \\beta\\} \\ \\Rightarrow\\ \\alpha, \\beta \\in \\{0, 1, i, -i\\}"),
      f("\\{\\alpha^2, \\beta^2\\} = \\{\\alpha, \\beta\\} \\ \\Rightarrow\\ \\alpha, \\beta \\in \\{0, 1\\}"),
    ],
    theme: "formula",
  },

  // ── qe-cube-roots-of-unity: ω³=1 | 1+ω+ω²=0 ──
  {
    atomKey: "qe-cube-roots-of-unity:formula:0",
    stem: "For a non-real cube root of unity \\(\\omega\\), what is \\(\\omega^3\\)?",
    distractors: [f("\\omega^3 = \\omega"), f("\\omega^3 = -1"), f("\\omega^3 = 0")],
    theme: "formula",
  },
  {
    atomKey: "qe-cube-roots-of-unity:formula:1",
    stem: "What is \\(1 + \\omega + \\omega^2\\) for a non-real cube root of unity \\(\\omega\\)?",
    distractors: [f("1 + \\omega + \\omega^2 = 1"), f("1 + \\omega + \\omega^2 = 3"), f("1 + \\omega + \\omega^2 = \\omega")],
    theme: "formula",
  },

  // ── qe-constructed-symmetric-equations: (q-r)x²+... ⇒ x=1, (p-q)/(q-r) (AUTO) ──
  {
    atomKey: "qe-constructed-symmetric-equations:formula:0",
    stem: "For \\((q-r)x^2 + (r-p)x + (p-q) = 0\\) (coefficients summing to zero), what are the two roots?",
    distractors: [
      f("(q-r)x^2 + (r-p)x + (p-q) = 0 \\ \\Rightarrow\\ x = -1,\\ \\ x = \\tfrac{p-q}{q-r}"),
      f("(q-r)x^2 + (r-p)x + (p-q) = 0 \\ \\Rightarrow\\ x = 1,\\ \\ x = \\tfrac{q-r}{p-q}"),
      f("(q-r)x^2 + (r-p)x + (p-q) = 0 \\ \\Rightarrow\\ x = 1,\\ \\ x = \\tfrac{r-p}{q-r}"),
    ],
    theme: "formula",
  },

  // ── qe-modulus-equations: |x-a|²+|x-a|-2=0 (AUTO) ──
  {
    atomKey: "qe-modulus-equations:formula:0",
    stem: "Which substitution reduces \\(|x-a|^2 + |x-a| - 2 = 0\\) to a quadratic (with the domain constraint)?",
    distractors: [
      f("|x-a|^2 + |x-a| - 2 = 0,\\ \\ t = |x-a| < 0 \\ \\Rightarrow\\ t^2 + t - 2 = 0"),
      f("|x-a|^2 + |x-a| - 2 = 0,\\ \\ t = (x-a) \\ \\Rightarrow\\ t^2 + t - 2 = 0"),
      f("|x-a|^2 + |x-a| - 2 = 0,\\ \\ t = |x-a| \\ge 0 \\ \\Rightarrow\\ t^2 - t - 2 = 0"),
    ],
    theme: "formula",
  },

  // ── qe-parametric-quadratics: min(ax²+bx+c) = -D/4a (AUTO) ──
  {
    atomKey: "qe-parametric-quadratics:formula:0",
    stem: "For \\(a > 0\\), what is the minimum value of \\(ax^2 + bx + c\\)?",
    distractors: [
      f("\\min(ax^2+bx+c) = c + \\dfrac{b^2}{4a} = \\dfrac{D}{4a}"),
      f("\\min(ax^2+bx+c) = c - \\dfrac{b^2}{2a} = -\\dfrac{D}{2a}"),
      f("\\min(ax^2+bx+c) = -\\dfrac{b}{2a} = -\\dfrac{D}{4a}"),
    ],
    theme: "formula",
  },

  // ── qe-logarithmic-quadratics: t=log_b u ⇒ quadratic | u=b^t ──
  {
    atomKey: "qe-logarithmic-quadratics:formula:0",
    stem: "Which substitution turns a log equation into a quadratic in a new variable?",
    distractors: [
      f("t = u^b \\ \\Rightarrow\\ \\text{quadratic in } t"),
      f("t = b^u \\ \\Rightarrow\\ \\text{quadratic in } t"),
      f("t = \\log_u b \\ \\Rightarrow\\ \\text{quadratic in } t"),
    ],
    theme: "formula",
  },
  {
    atomKey: "qe-logarithmic-quadratics:formula:1",
    stem: "After solving the quadratic in \\(t = \\log_b u\\), how do you recover \\(u\\)?",
    distractors: [f("u = t^{\\,b}"), f("u = \\log_b t"), f("u = b \\cdot t")],
    theme: "formula",
  },

  // ── qe-constructed-from-roots: x²-ax-bx+(ab-c)=0 (AUTO) ──
  {
    atomKey: "qe-constructed-from-roots:formula:0",
    stem: "Expanding \\(x^2 - ax - bx + (ab - c) = 0\\) to standard form, what are the sum and product of its roots?",
    distractors: [
      f("x^2 - ax - bx + (ab - c) = 0 \\ \\Rightarrow\\ \\alpha+\\beta = -(a+b),\\ \\ \\alpha\\beta = ab - c"),
      f("x^2 - ax - bx + (ab - c) = 0 \\ \\Rightarrow\\ \\alpha+\\beta = a+b,\\ \\ \\alpha\\beta = ab + c"),
      f("x^2 - ax - bx + (ab - c) = 0 \\ \\Rightarrow\\ \\alpha+\\beta = a-b,\\ \\ \\alpha\\beta = ab - c"),
    ],
    theme: "formula",
  },
];
