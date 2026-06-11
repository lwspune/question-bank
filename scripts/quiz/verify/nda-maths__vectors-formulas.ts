/**
 * NDA Maths · Vectors · per-FORMULA recall MCQs (bundle-split pass).
 * Dedup/judgment skips: unit-vector-and-direction-construction:formula:0
 * (== types-of-vectors:formula:0, the unit-vector formula), position-and-
 * displacement:formula:1 (== magnitude-and-distance:formula:1, distance),
 * parallelogram-properties:formula:0/1 (niche half-diagonal forms — :2 kept),
 * unit-vector-orthogonal-triple:formula:2 ("for an orthonormal triple" text),
 * vector-addition:formula:1 (trivial a−b=a+(−b)).
 *   npm run quiz:verify nda-maths__vectors-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "component-form-and-basis:formula:0",
    stem: "Which is the component (basis) form of a vector \\(\\vec{v}\\) with components \\(v_1, v_2, v_3\\)?",
    distractors: [
      f("v_1 + v_2 + v_3"),
      f("\\sqrt{v_1^2 + v_2^2 + v_3^2}"),
      f("v_1\\hat{i} \\cdot v_2\\hat{j} \\cdot v_3\\hat{k}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "component-form-and-basis:formula:1",
    stem: "In component form, the sum \\(\\vec{a} + \\vec{b}\\) equals:",
    correct: f("(a_1+b_1)\\hat{i} + (a_2+b_2)\\hat{j} + (a_3+b_3)\\hat{k}"),
    distractors: [
      f("(a_1 b_1)\\hat{i} + (a_2 b_2)\\hat{j} + (a_3 b_3)\\hat{k}"),
      f("(a_1-b_1)\\hat{i} + (a_2-b_2)\\hat{j} + (a_3-b_3)\\hat{k}"),
      f("(a_1+b_2)\\hat{i} + (a_2+b_3)\\hat{j} + (a_3+b_1)\\hat{k}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cross-product-magnitude-area-and-lagrange:formula:0",
    stem: "The magnitude of the cross product \\(|\\vec{a}\\times\\vec{b}|\\) is:",
    correct: f("|\\vec{a}||\\vec{b}|\\sin\\theta"),
    distractors: [f("|\\vec{a}||\\vec{b}|\\cos\\theta"), f("|\\vec{a}||\\vec{b}|\\tan\\theta"), f("|\\vec{a}||\\vec{b}|")],
    theme: "formula",
  },
  {
    atomKey: "cross-product-magnitude-area-and-lagrange:formula:1",
    stem: "Which is the Lagrange identity relating the cross and dot products?",
    distractors: [
      f("|\\vec{a}\\times\\vec{b}|^2 - (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2 |\\vec{b}|^2"),
      f("|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}||\\vec{b}|"),
      f("|\\vec{a}\\times\\vec{b}|^2 = |\\vec{a}|^2 |\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2"),
    ],
    theme: "formula",
  },
  {
    atomKey: "direction-cosines:formula:0",
    stem: "For direction cosines of a line, which identity holds?",
    distractors: [
      f("\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 2"),
      f("\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 0"),
      f("\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 3"),
    ],
    theme: "formula",
  },
  {
    atomKey: "direction-cosines:formula:1",
    stem: "For direction angles \\(\\alpha, \\beta, \\gamma\\), the sum \\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma\\) equals:",
    correct: f("2"),
    distractors: [f("1"), f("3"), f("0")],
    theme: "formula",
  },
  {
    atomKey: "dot-product-evaluation-and-work:formula:0",
    stem: "Which is the component formula for the dot product \\(\\vec{a}\\cdot\\vec{b}\\)?",
    distractors: [
      f("a_1 b_2 + a_2 b_3 + a_3 b_1"),
      f("(a_1+b_1)(a_2+b_2)(a_3+b_3)"),
      f("a_1 b_1 \\cdot a_2 b_2 \\cdot a_3 b_3"),
    ],
    theme: "formula",
  },
  {
    atomKey: "dot-product-evaluation-and-work:formula:1",
    stem: "Which expresses the work done by a constant force \\(\\vec{F}\\) over displacement \\(\\vec{d}\\)?",
    distractors: [f("W = \\vec{F} \\times \\vec{d}"), f("W = |\\vec{F}||\\vec{d}|"), f("W = \\dfrac{\\vec{F}}{\\vec{d}}")],
    theme: "formula",
  },
  {
    atomKey: "magnitude-and-distance:formula:0",
    stem: "Which is the magnitude of a vector \\(\\vec{v}\\) with components \\(v_1, v_2, v_3\\)?",
    correct: f("\\sqrt{v_1^2 + v_2^2 + v_3^2}"),
    distractors: [f("v_1^2 + v_2^2 + v_3^2"), f("\\sqrt{v_1 + v_2 + v_3}"), f("|v_1| + |v_2| + |v_3|")],
    theme: "formula",
  },
  {
    atomKey: "magnitude-and-distance:formula:1",
    stem: "The distance \\(AB\\) between points with position vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) is:",
    correct: f("|\\vec{b} - \\vec{a}|"),
    distractors: [f("|\\vec{b} + \\vec{a}|"), f("\\vec{b} - \\vec{a}"), f("\\sqrt{|\\vec{b}| - |\\vec{a}|}")],
    theme: "formula",
  },
  {
    atomKey: "parallelogram-properties-and-diagonals:formula:2",
    stem: "For a parallelogram \\(ABCD\\) and any origin \\(O\\), which relation between the diagonals holds?",
    distractors: [
      f("\\vec{OA} + \\vec{OB} = \\vec{OC} + \\vec{OD}"),
      f("\\vec{OA} - \\vec{OC} = \\vec{OB} - \\vec{OD}"),
      f("\\vec{OA} + \\vec{OC} = 2(\\vec{OB} + \\vec{OD})"),
    ],
    theme: "formula",
  },
  {
    atomKey: "position-and-displacement-vectors:formula:0",
    stem: "The displacement vector \\(\\vec{AB}\\) from \\(A\\) (position \\(\\vec{a}\\)) to \\(B\\) (position \\(\\vec{b}\\)) is:",
    correct: f("\\vec{b} - \\vec{a}"),
    distractors: [f("\\vec{a} - \\vec{b}"), f("\\vec{a} + \\vec{b}"), f("\\dfrac{\\vec{a} + \\vec{b}}{2}")],
    theme: "formula",
  },
  {
    atomKey: "scalar-multiplication:formula:0",
    stem: "For a scalar \\(k\\) and vector \\(\\vec{v}\\), the magnitude \\(|k\\vec{v}|\\) equals:",
    correct: f("|k|\\,|\\vec{v}|"),
    distractors: [f("k\\,|\\vec{v}|"), f("|k|\\,\\vec{v}"), f("k^2\\,|\\vec{v}|")],
    theme: "formula",
  },
  {
    atomKey: "scalar-multiplication:formula:1",
    stem: "Which is the distributive law of scalar multiplication over vector addition?",
    distractors: [
      f("k(\\vec{a} + \\vec{b}) = k\\vec{a} + \\vec{b}"),
      f("k(\\vec{a} + \\vec{b}) = \\vec{a} + k\\vec{b}"),
      f("k(\\vec{a} + \\vec{b}) = k^2\\vec{a} + k^2\\vec{b}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "scalar-projection:formula:0",
    stem: "Which is the SCALAR projection of \\(\\vec{a}\\) onto \\(\\vec{b}\\)?",
    correct: f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}"),
    distractors: [f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|}"), f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}"), f("\\dfrac{|\\vec{b}|}{\\vec{a}\\cdot\\vec{b}}")],
    theme: "formula",
  },
  {
    atomKey: "scalar-projection:formula:1",
    stem: "Which is the VECTOR projection of \\(\\vec{a}\\) onto \\(\\vec{b}\\)?",
    correct: f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\,\\vec{b}"),
    distractors: [f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}\\,\\vec{b}"), f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\,\\vec{a}"), f("(\\vec{a}\\cdot\\vec{b})\\,\\vec{b}")],
    theme: "formula",
  },
  {
    atomKey: "section-formula-internal-external:formula:0",
    stem: "Which is the position vector of the point dividing \\(AB\\) INTERNALLY in the ratio \\(m:n\\)?",
    correct: f("\\dfrac{m\\vec{b} + n\\vec{a}}{m + n}"),
    distractors: [f("\\dfrac{m\\vec{a} + n\\vec{b}}{m + n}"), f("\\dfrac{m\\vec{b} - n\\vec{a}}{m - n}"), f("\\dfrac{m\\vec{b} + n\\vec{a}}{m - n}")],
    theme: "formula",
  },
  {
    atomKey: "section-formula-internal-external:formula:1",
    stem: "Which is the position vector of the point dividing \\(AB\\) EXTERNALLY in the ratio \\(m:n\\)?",
    correct: f("\\dfrac{m\\vec{b} - n\\vec{a}}{m - n}"),
    distractors: [f("\\dfrac{m\\vec{b} + n\\vec{a}}{m + n}"), f("\\dfrac{m\\vec{a} - n\\vec{b}}{m - n}"), f("\\dfrac{m\\vec{b} - n\\vec{a}}{m + n}")],
    theme: "formula",
  },
  {
    atomKey: "triangle-vector-loop-and-centroid:formula:0",
    stem: "By the triangle law of addition, the sum \\(\\vec{AB} + \\vec{BC} + \\vec{CA}\\) equals:",
    correct: f("\\vec{0}"),
    distractors: [f("\\vec{AC}"), f("2\\vec{AB}"), f("\\vec{AB}")],
    theme: "formula",
  },
  {
    atomKey: "triangle-vector-loop-and-centroid:formula:1",
    stem: "Which is the position vector of the centroid of a triangle with vertices \\(\\vec{a}, \\vec{b}, \\vec{c}\\)?",
    correct: f("\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}"),
    distractors: [f("\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{2}"), f("\\vec{a} + \\vec{b} + \\vec{c}"), f("\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{6}")],
    theme: "formula",
  },
  {
    atomKey: "types-of-vectors:formula:0",
    stem: "Which gives the unit vector in the direction of \\(\\vec{v}\\)?",
    correct: f("\\dfrac{\\vec{v}}{|\\vec{v}|}"),
    distractors: [f("\\dfrac{|\\vec{v}|}{\\vec{v}}"), f("\\vec{v}\\,|\\vec{v}|"), f("\\dfrac{\\vec{v}}{|\\vec{v}|^2}")],
    theme: "formula",
  },
  {
    atomKey: "types-of-vectors:formula:1",
    stem: "Two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) are PARALLEL if and only if:",
    correct: f("\\vec{a} = k\\vec{b} \\text{ for some } k \\neq 0"),
    distractors: [f("\\vec{a}\\cdot\\vec{b} = 0"), f("\\vec{a}\\times\\vec{b} \\neq \\vec{0}"), f("|\\vec{a}| = |\\vec{b}|")],
    theme: "property",
  },
  {
    atomKey: "unit-vector-and-direction-construction:formula:1",
    stem: "A vector of magnitude \\(r\\) with direction cosines \\(\\cos\\alpha, \\cos\\beta, \\cos\\gamma\\) is:",
    correct: f("r(\\cos\\alpha\\,\\hat{i} + \\cos\\beta\\,\\hat{j} + \\cos\\gamma\\,\\hat{k})"),
    distractors: [
      f("\\cos\\alpha\\,\\hat{i} + \\cos\\beta\\,\\hat{j} + \\cos\\gamma\\,\\hat{k}"),
      f("r(\\sin\\alpha\\,\\hat{i} + \\sin\\beta\\,\\hat{j} + \\sin\\gamma\\,\\hat{k})"),
      f("\\dfrac{1}{r}(\\cos\\alpha\\,\\hat{i} + \\cos\\beta\\,\\hat{j} + \\cos\\gamma\\,\\hat{k})"),
    ],
    theme: "formula",
  },
  {
    atomKey: "unit-vector-orthogonal-triple-configurations:formula:0",
    stem: "For a unit vector \\(\\vec{a}\\), the dot product \\(\\vec{a}\\cdot\\vec{a}\\) equals:",
    correct: f("1"),
    distractors: [f("0"), f("|\\vec{a}|"), f("2")],
    theme: "formula",
  },
  {
    atomKey: "unit-vector-orthogonal-triple-configurations:formula:1",
    stem: "Two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) are ORTHOGONAL if and only if \\(\\vec{a}\\cdot\\vec{b}\\) equals:",
    correct: f("0"),
    distractors: [f("1"), f("|\\vec{a}||\\vec{b}|"), f("-1")],
    theme: "formula",
  },
  {
    atomKey: "vector-addition:formula:0",
    stem: "Which is the commutative law of vector addition?",
    distractors: [
      f("\\vec{a} + \\vec{b} = -(\\vec{b} + \\vec{a})"),
      f("\\vec{a} - \\vec{b} = \\vec{b} - \\vec{a}"),
      f("\\vec{a} + \\vec{b} = \\vec{a}\\cdot\\vec{b}"),
    ],
    theme: "formula",
  },

  // ── auto-atom fixes (2026-06-11) ──────────────────────────────────
  {
    atomKey: "angle-via-dot-product-formula:formula:0",
    stem: "The angle \\(\\theta\\) between non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) satisfies \\(\\cos\\theta=\\):",
    distractors: [
      f("\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}| + |\\vec{b}|}"),
      f("\\dfrac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}|\\,|\\vec{b}|}"),
      f("\\dfrac{|\\vec{a}|\\,|\\vec{b}|}{\\vec{a}\\cdot\\vec{b}}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "angles-and-vertices-from-position-vectors:formula:0",
    stem: "For a triangle \\(ABC\\) with position vectors \\(\\vec{a},\\vec{b},\\vec{c}\\), the angle at vertex \\(C\\) satisfies \\(\\cos C=\\):",
    distractors: [
      f("\\dfrac{(\\vec{a} - \\vec{c})\\cdot(\\vec{b} - \\vec{c})}{|\\vec{a} - \\vec{c}| + |\\vec{b} - \\vec{c}|}"),
      f("\\dfrac{(\\vec{a} - \\vec{b})\\cdot(\\vec{c} - \\vec{b})}{|\\vec{a} - \\vec{b}|\\,|\\vec{c} - \\vec{b}|}"),
      f("\\dfrac{(\\vec{a} + \\vec{c})\\cdot(\\vec{b} + \\vec{c})}{|\\vec{a} + \\vec{c}|\\,|\\vec{b} + \\vec{c}|}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "collinearity-and-vector-relations-in-figures:formula:0",
    stem: "Points with position vectors \\(\\vec{a},\\vec{b},\\vec{c}\\) are COLLINEAR if there exist scalars (not all zero) such that:",
    distractors: [
      f("\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0} \\;\\text{ with }\\; \\alpha + \\beta + \\gamma = 1"),
      f("\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0} \\;\\text{ with }\\; \\alpha\\beta\\gamma = 0"),
      f("\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0} \\;\\text{ with }\\; \\alpha + \\beta + \\gamma \\neq 0"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cross-product-algebra-and-properties:formula:0",
    stem: "The cross product \\((\\vec{a} - \\vec{b}) \\times (\\vec{a} + \\vec{b})\\) equals:",
    distractors: [
      f("2\\,\\vec{b}\\times\\vec{a}"),
      f("\\vec{a}\\times\\vec{b}"),
      f("\\vec{0}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "distance-identities-in-quadrilaterals:formula:0",
    stem: "By the parallelogram law, for any vectors \\(\\vec{p},\\vec{q}\\), \\(|\\vec{p}+\\vec{q}|^2 + |\\vec{p}-\\vec{q}|^2=\\):",
    distractors: [
      f("2(|\\vec{p}|^2 - |\\vec{q}|^2)"),
      f("4(|\\vec{p}|^2 + |\\vec{q}|^2)"),
      f("|\\vec{p}|^2 + |\\vec{q}|^2"),
    ],
    theme: "formula",
  },
  {
    atomKey: "moment-of-force:formula:0",
    stem: "The moment \\(\\vec{M}\\) of a force \\(\\vec{F}\\) (acting at \\(P\\)) about a point \\(O\\) is:",
    distractors: [
      f("\\vec{M} = \\vec{F} \\times \\overrightarrow{OP}"),
      f("\\vec{M} = \\overrightarrow{OP} \\cdot \\vec{F}"),
      f("\\vec{M} = |\\overrightarrow{OP}|\\,|\\vec{F}|"),
    ],
    theme: "formula",
  },
  {
    atomKey: "perpendicularity-test:formula:0",
    stem: "Which correctly states the perpendicularity test for non-zero vectors \\(\\vec{a},\\vec{b}\\)?",
    distractors: [
      f("\\vec{a}\\perp\\vec{b} \\;\\Longleftrightarrow\\; \\vec{a}\\times\\vec{b} = \\vec{0} \\;\\Longleftrightarrow\\; |\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|"),
      f("\\vec{a}\\perp\\vec{b} \\;\\Longleftrightarrow\\; \\vec{a}\\cdot\\vec{b} = 0 \\;\\Longleftrightarrow\\; |\\vec{a}+\\vec{b}| = |\\vec{a}| + |\\vec{b}|"),
      f("\\vec{a}\\perp\\vec{b} \\;\\Longleftrightarrow\\; \\vec{a}\\cdot\\vec{b} = 1 \\;\\Longleftrightarrow\\; |\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|"),
    ],
    theme: "formula",
  },
  {
    atomKey: "scalar-triple-product-and-coplanarity:formula:0",
    stem: "Three vectors \\(\\vec{a},\\vec{b},\\vec{c}\\) are COPLANAR if and only if:",
    distractors: [
      f("\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} \\neq 0"),
      f("\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = 1"),
      f("\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = 1"),
    ],
    theme: "formula",
  },
  {
    atomKey: "solve-perpendicularity-constraint-system:formula:0",
    stem: "Expanding the dot product, \\((\\alpha\\vec{a}+\\beta\\vec{b})\\cdot(\\gamma\\vec{a}+\\delta\\vec{b})\\) equals:",
    distractors: [
      f("\\alpha\\gamma|\\vec{a}|^2 + (\\alpha\\delta-\\beta\\gamma)\\,\\vec{a}\\cdot\\vec{b} + \\beta\\delta|\\vec{b}|^2"),
      f("\\alpha\\gamma|\\vec{a}|^2 + \\beta\\delta|\\vec{b}|^2"),
      f("\\alpha\\gamma|\\vec{a}|^2 + (\\alpha\\delta+\\beta\\gamma)\\,|\\vec{a}|\\,|\\vec{b}| + \\beta\\delta|\\vec{b}|^2"),
    ],
    theme: "formula",
  },
  {
    atomKey: "triple-product-cyclic-and-derived-identities:formula:0",
    stem: "The cyclic sum \\((\\vec{a}\\times\\vec{b})\\cdot\\vec{c} + (\\vec{b}\\times\\vec{c})\\cdot\\vec{a} + (\\vec{c}\\times\\vec{a})\\cdot\\vec{b}\\) equals:",
    distractors: [
      f("[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"),
      f("2[\\vec{a}\\,\\vec{b}\\,\\vec{c}]"),
      f("\\vec{0}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "unit-vector-perpendicular-via-cross:formula:0",
    stem: "A unit vector \\(\\hat{n}\\) perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\) is:",
    distractors: [
      f("\\hat{n} = \\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}|\\,|\\vec{b}|}"),
      f("\\hat{n} = \\pm\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}\\times\\vec{b}|}"),
      f("\\hat{n} = \\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|^2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "vector-triple-product-bac-cab:formula:0",
    stem: "By the BAC-CAB rule, the vector triple product \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) equals:",
    distractors: [
      f("(\\vec{a}\\cdot\\vec{b})\\,\\vec{c} - (\\vec{a}\\cdot\\vec{c})\\,\\vec{b}"),
      f("(\\vec{a}\\cdot\\vec{c})\\,\\vec{c} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{b}"),
      f("(\\vec{a}\\cdot\\vec{b})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{c})\\,\\vec{c}"),
    ],
    theme: "formula",
  },
];
