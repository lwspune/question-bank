import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 10 Vector Algebra.
 * Definitions in NCERT's own wording, trimmed; every formula and proof
 * re-worked by hand; most-asked years and marks from the 158 CBSE board
 * past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Vector Algebra",
  chapterSlug: "vector-algebra",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 10",
  keyPoints: [
    {
      term: "Vector",
      text: "A quantity that has magnitude as well as direction is called a vector. The vector with O and P as its initial and terminal points is the **position vector** of P: \\(\\overrightarrow{OP} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\), with magnitude \\(\\sqrt{x^2 + y^2 + z^2}\\).",
    },
    {
      term: "Direction cosines and ratios",
      text: "If a vector makes angles \\(\\alpha, \\beta, \\gamma\\) with the x, y and z axes, \\(l = \\cos\\alpha\\), \\(m = \\cos\\beta\\), \\(n = \\cos\\gamma\\) are its direction cosines, and \\(l^2 + m^2 + n^2 = 1\\). Numbers proportional to them are direction ratios.",
    },
    {
      term: "Types of vectors",
      text: "**Zero vector:** initial and terminal points coincide. **Unit vector:** magnitude 1. **Collinear:** parallel to the same line, irrespective of their magnitudes and directions. **Equal:** same magnitude and direction. **Negative:** same magnitude, opposite direction.",
    },
    {
      term: "Addition of vectors",
      text: "Triangle law: \\(\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}\\). When the sides of a triangle are taken in order, it leads to zero resultant. Parallelogram law: the sum of two coinitial vectors is the diagonal of the parallelogram on them.",
    },
    {
      term: "Collinear vectors",
      text: "Two vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) are collinear if and only if there exists a nonzero scalar \\(\\lambda\\) such that \\(\\vec{b} = \\lambda\\vec{a}\\); in components, \\(\\frac{b_1}{a_1} = \\frac{b_2}{a_2} = \\frac{b_3}{a_3} = \\lambda\\).",
    },
    {
      term: "Collinear points",
      text: "A, B, C are collinear when \\(\\overrightarrow{AB} = \\lambda\\overrightarrow{AC}\\) for some scalar \\(\\lambda\\), or when \\(|\\overrightarrow{AB}| + |\\overrightarrow{BC}| = |\\overrightarrow{AC}|\\) (equality in the triangle inequality).",
    },
    {
      term: "Vector joining two points",
      text: "\\(\\overrightarrow{P_1P_2}\\) = position vector of the terminal point minus that of the initial point: \\((x_2 - x_1)\\hat{i} + (y_2 - y_1)\\hat{j} + (z_2 - z_1)\\hat{k}\\).",
    },
    {
      term: "Scalar (dot) product",
      text: "\\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta\\), \\(0 \\le \\theta \\le \\pi\\); it is a real number. Two nonzero vectors are perpendicular if and only if \\(\\vec{a}\\cdot\\vec{b} = 0\\). Also \\(\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}\\).",
    },
    {
      term: "Projection",
      text: "The projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) is \\(\\vec{a}\\cdot\\hat{b} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}\\). It is zero when the vectors are perpendicular. Projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) is in general not the projection of \\(\\vec{b}\\) on \\(\\vec{a}\\).",
    },
    {
      term: "Vector (cross) product",
      text: "\\(\\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}\\), where \\(\\hat{n}\\) is a unit vector perpendicular to both, with \\(\\vec{a}, \\vec{b}, \\hat{n}\\) forming a right handed system. It is a vector, and \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) if and only if \\(\\vec{a}\\) and \\(\\vec{b}\\) are parallel.",
    },
    {
      term: "Cross product is not commutative",
      text: "It is always true that the vector product is not commutative: \\(\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}\\). For the axes, \\(\\hat{i}\\times\\hat{j} = \\hat{k}\\), \\(\\hat{j}\\times\\hat{k} = \\hat{i}\\), \\(\\hat{k}\\times\\hat{i} = \\hat{j}\\), and \\(\\hat{i}\\times\\hat{i} = \\vec{0}\\).",
    },
    {
      term: "Areas",
      text: "If \\(\\vec{a}\\) and \\(\\vec{b}\\) represent the adjacent sides of a triangle, its area is \\(\\frac{1}{2}|\\vec{a}\\times\\vec{b}|\\); of a parallelogram, \\(|\\vec{a}\\times\\vec{b}|\\).",
    },
    {
      term: "Two inequalities",
      text: "Cauchy-Schwarz: \\(|\\vec{a}\\cdot\\vec{b}| \\le |\\vec{a}||\\vec{b}|\\). Triangle inequality: \\(|\\vec{a} + \\vec{b}| \\le |\\vec{a}| + |\\vec{b}|\\). Also \\(|\\vec{a}\\times\\vec{b}| \\le |\\vec{a}||\\vec{b}|\\), since \\(|\\sin\\theta| \\le 1\\).",
    },
  ],
  formulas: [
    { label: "Magnitude and unit vector", latex: "|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2} \\qquad \\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|} \\qquad |\\lambda\\vec{a}| = |\\lambda|\\,|\\vec{a}|" },
    { label: "Direction cosines from direction ratios", latex: "l = \\frac{a}{r},\\; m = \\frac{b}{r},\\; n = \\frac{c}{r}, \\quad r = \\sqrt{a^2 + b^2 + c^2} \\qquad \\hat{a} = l\\hat{i} + m\\hat{j} + n\\hat{k}" },
    { label: "Equally inclined to the axes", latex: "l = m = n = \\pm\\frac{1}{\\sqrt{3}} \\qquad \\vec{r} = \\pm\\frac{|\\vec{r}|}{\\sqrt{3}}\\left(\\hat{i} + \\hat{j} + \\hat{k}\\right)" },
    { label: "Section formula", latex: "\\text{internal: } \\frac{m\\vec{b} + n\\vec{a}}{m + n} \\qquad \\text{external: } \\frac{m\\vec{b} - n\\vec{a}}{m - n} \\qquad \\text{midpoint: } \\frac{\\vec{a} + \\vec{b}}{2}" },
    { label: "Dot product and angle", latex: "\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3 \\qquad \\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}" },
    { label: "Unit vectors of the axes", latex: "\\hat{i}\\cdot\\hat{i} = \\hat{j}\\cdot\\hat{j} = \\hat{k}\\cdot\\hat{k} = 1 \\qquad \\hat{i}\\cdot\\hat{j} = \\hat{j}\\cdot\\hat{k} = \\hat{k}\\cdot\\hat{i} = 0" },
    { label: "Square of a sum or difference", latex: "|\\vec{a} \\pm \\vec{b}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 \\pm 2\\,\\vec{a}\\cdot\\vec{b} \\qquad (\\vec{a} + \\vec{b})\\cdot(\\vec{a} - \\vec{b}) = |\\vec{a}|^2 - |\\vec{b}|^2" },
    { label: "When the three vectors add to zero", latex: "\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0} \\;\\Rightarrow\\; \\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a} = -\\frac{|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2}{2}" },
    { label: "Projection and projection vector", latex: "\\text{projection of } \\vec{a} \\text{ on } \\vec{b} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|} \\qquad \\text{projection vector} = \\left(\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}" },
    { label: "Cross product in components", latex: "\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}" },
    { label: "Sine of the angle", latex: "\\sin\\theta = \\frac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}||\\vec{b}|} \\qquad \\tan\\theta = \\frac{|\\vec{a}\\times\\vec{b}|}{\\vec{a}\\cdot\\vec{b}}" },
    { label: "Lagrange's identity", latex: "|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2" },
    { label: "Areas", latex: "\\text{triangle} = \\frac{1}{2}|\\vec{a}\\times\\vec{b}| \\qquad \\text{parallelogram} = |\\vec{a}\\times\\vec{b}| \\qquad \\text{parallelogram from diagonals} = \\frac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|" },
    { label: "Vector of magnitude k perpendicular to two vectors", latex: "\\pm\\,k\\,\\frac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}" },
  ],
  derivations: [
    {
      title: "Show that the area of a parallelogram whose diagonals are \\(\\vec{a}\\) and \\(\\vec{b}\\) is \\(\\frac{1}{2}|\\vec{a}\\times\\vec{b}|\\)",
      steps: [
        "Let the adjacent sides be \\(\\vec{p}\\) and \\(\\vec{q}\\). Then the diagonals are \\(\\vec{a} = \\vec{p} + \\vec{q}\\) and \\(\\vec{b} = \\vec{q} - \\vec{p}\\).",
        "\\(\\vec{a}\\times\\vec{b} = \\vec{p}\\times\\vec{q} - \\vec{p}\\times\\vec{p} + \\vec{q}\\times\\vec{q} - \\vec{q}\\times\\vec{p} = \\vec{p}\\times\\vec{q} + \\vec{p}\\times\\vec{q} = 2\\,\\vec{p}\\times\\vec{q}\\).",
        "Area \\(= |\\vec{p}\\times\\vec{q}| = \\frac{1}{2}|\\vec{a}\\times\\vec{b}|\\).",
      ],
    },
    {
      title: "If \\(\\vec{a}\\) and \\(\\vec{b}\\) are unit vectors at an angle \\(\\theta\\), prove that \\(\\frac{1}{2}|\\vec{a} - \\vec{b}| = \\sin\\frac{\\theta}{2}\\)",
      steps: [
        "\\(|\\vec{a} - \\vec{b}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 - 2\\vec{a}\\cdot\\vec{b} = 1 + 1 - 2\\cos\\theta\\).",
        "\\(= 2(1 - \\cos\\theta) = 4\\sin^2\\frac{\\theta}{2}\\).",
        "Since \\(0 \\le \\theta \\le \\pi\\), \\(\\sin\\frac{\\theta}{2} \\ge 0\\), so \\(|\\vec{a} - \\vec{b}| = 2\\sin\\frac{\\theta}{2}\\). (Similarly \\(|\\vec{a} + \\vec{b}| = 2\\cos\\frac{\\theta}{2}\\).)",
      ],
    },
    {
      title: "If \\(|\\vec{a}| = |\\vec{b}|\\) and \\(\\alpha\\) is the angle between them, prove that \\(\\frac{|\\vec{a} + \\vec{b}|}{|\\vec{a} - \\vec{b}|} = \\cot\\frac{\\alpha}{2}\\)",
      steps: [
        "Let \\(|\\vec{a}| = |\\vec{b}| = r\\). \\(|\\vec{a} + \\vec{b}|^2 = 2r^2(1 + \\cos\\alpha) = 4r^2\\cos^2\\frac{\\alpha}{2}\\).",
        "\\(|\\vec{a} - \\vec{b}|^2 = 2r^2(1 - \\cos\\alpha) = 4r^2\\sin^2\\frac{\\alpha}{2}\\).",
        "Divide and take positive roots: the ratio is \\(\\frac{\\cos(\\alpha/2)}{\\sin(\\alpha/2)} = \\cot\\frac{\\alpha}{2}\\).",
      ],
    },
    {
      title: "If \\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\), \\(|\\vec{a}| = 3\\), \\(|\\vec{b}| = 5\\), \\(|\\vec{c}| = 7\\), find the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\)",
      steps: [
        "\\(\\vec{a} + \\vec{b} = -\\vec{c}\\), so \\(|\\vec{a} + \\vec{b}|^2 = |\\vec{c}|^2\\).",
        "\\(9 + 25 + 2\\vec{a}\\cdot\\vec{b} = 49\\), so \\(\\vec{a}\\cdot\\vec{b} = \\frac{15}{2}\\).",
        "\\(\\cos\\theta = \\frac{15/2}{3 \\times 5} = \\frac{1}{2}\\), so \\(\\theta = \\frac{\\pi}{3}\\).",
      ],
    },
    {
      title: "If \\(\\vec{a}\\cdot\\vec{b} = \\vec{a}\\cdot\\vec{c}\\) and \\(\\vec{a}\\times\\vec{b} = \\vec{a}\\times\\vec{c}\\), \\(\\vec{a} \\neq \\vec{0}\\), show that \\(\\vec{b} = \\vec{c}\\)",
      steps: [
        "\\(\\vec{a}\\cdot(\\vec{b} - \\vec{c}) = 0\\): either \\(\\vec{b} = \\vec{c}\\) or \\(\\vec{a} \\perp (\\vec{b} - \\vec{c})\\).",
        "\\(\\vec{a}\\times(\\vec{b} - \\vec{c}) = \\vec{0}\\): either \\(\\vec{b} = \\vec{c}\\) or \\(\\vec{a} \\parallel (\\vec{b} - \\vec{c})\\).",
        "A nonzero \\(\\vec{a}\\) can not be both perpendicular and parallel to a nonzero vector, so \\(\\vec{b} - \\vec{c} = \\vec{0}\\), that is \\(\\vec{b} = \\vec{c}\\).",
      ],
    },
    {
      title: "Prove that the median \\(\\overrightarrow{AD} = \\frac{\\overrightarrow{AB} + \\overrightarrow{AC}}{2}\\), and find its length",
      steps: [
        "D is the midpoint of BC: \\(\\overrightarrow{AD} = \\overrightarrow{AB} + \\frac{1}{2}(\\overrightarrow{AC} - \\overrightarrow{AB}) = \\frac{1}{2}(\\overrightarrow{AB} + \\overrightarrow{AC})\\).",
        "With \\(\\overrightarrow{AB} = \\hat{j} + \\hat{k}\\) and \\(\\overrightarrow{AC} = 3\\hat{i} - \\hat{j} + 4\\hat{k}\\): \\(\\overrightarrow{AD} = \\frac{1}{2}(3\\hat{i} + 0\\hat{j} + 5\\hat{k})\\).",
        "\\(|\\overrightarrow{AD}| = \\frac{1}{2}\\sqrt{9 + 25} = \\frac{\\sqrt{34}}{2}\\) units.",
      ],
    },
    {
      title: "Using vectors, find b if A(\\(-1, -1, 2\\)), B(\\(2, b, 5\\)) and C(\\(3, 11, 6\\)) are collinear",
      steps: [
        "\\(\\overrightarrow{AB} = 3\\hat{i} + (b + 1)\\hat{j} + 3\\hat{k}\\) and \\(\\overrightarrow{AC} = 4\\hat{i} + 12\\hat{j} + 4\\hat{k}\\).",
        "Collinear: \\(\\overrightarrow{AB} = \\lambda\\overrightarrow{AC}\\). The \\(\\hat{i}\\) and \\(\\hat{k}\\) parts give \\(\\lambda = \\frac{3}{4}\\), so \\(b + 1 = 12\\lambda\\).",
        "\\(b + 1 = 9\\), so \\(b = 8\\).",
      ],
    },
    {
      title: "Find a vector of magnitude k perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\)",
      steps: [
        "Find \\(\\vec{c} = \\vec{a}\\times\\vec{b}\\) by the determinant, and its magnitude \\(|\\vec{c}|\\).",
        "Unit vectors perpendicular to both: \\(\\pm\\frac{\\vec{c}}{|\\vec{c}|}\\).",
        "Required vectors: \\(\\pm\\,k\\frac{\\vec{c}}{|\\vec{c}|}\\). Example: \\((\\hat{i} + \\hat{k})\\times(\\hat{i} - \\hat{k}) = 2\\hat{j}\\), so the unit vectors are \\(\\pm\\hat{j}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Position vectors: section formula, median, collinear points, parallel vectors (\\(\\vec{b} = \\lambda\\vec{a}\\))", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Angle between two vectors, or a value making them perpendicular (\\(\\vec{a}\\cdot\\vec{b} = 0\\))", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Magnitude, unit vector, a vector of given magnitude along a direction, direction cosines, equally inclined to the axes", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Dot product identities: \\(|\\vec{a} \\pm \\vec{b}|\\), \\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\), proofs with unit vectors", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Cross product values: \\(|\\vec{a}\\times\\vec{b}|\\), Lagrange's identity, angle from \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{a}\\cdot\\vec{b}\\), proofs", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Projection of a vector on another, or a value from a given projection", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Area of a triangle or parallelogram by vectors, from sides or diagonals", marks: 2, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "A vector (or unit vector) of given magnitude perpendicular to two vectors", marks: 2, years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Dividing by the wrong magnitude in a projection",
      body: "Projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) is \\(\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}\\): divide by the vector you project ON. Projection of \\(2\\hat{i} + 3\\hat{j}\\) on \\(3\\hat{i} - 2\\hat{j}\\) is \\(\\frac{6 - 6}{\\sqrt{13}} = 0\\).",
    },
    {
      title: "Reversing a vector joining two points",
      body: "\\(\\overrightarrow{BA}\\) = (position vector of A) minus (position vector of B). With initial point B(3, \\(-4\\), 7) and terminal point A(2, \\(-3\\), 5) the vector is \\(-\\hat{i} + \\hat{j} - 2\\hat{k}\\).",
    },
    {
      title: "Giving one answer where there are two",
      body: "Vectors perpendicular to two vectors, or equally inclined to the axes, come in pairs: \\(\\pm k\\frac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\), and magnitude \\(5\\sqrt{3}\\) equally inclined gives \\(\\pm 5(\\hat{i} + \\hat{j} + \\hat{k})\\).",
    },
    {
      title: "Forgetting the half",
      body: "Triangle: \\(\\frac{1}{2}|\\vec{a}\\times\\vec{b}|\\). Parallelogram from sides: \\(|\\vec{a}\\times\\vec{b}|\\). Parallelogram from diagonals: \\(\\frac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|\\).",
    },
    {
      title: "Range of \\(|\\lambda\\vec{a}|\\)",
      body: "\\(|\\lambda\\vec{a}| = |\\lambda||\\vec{a}|\\), never negative. If \\(|\\vec{a}| = 5\\) and \\(-2 \\le \\lambda \\le 1\\), then \\(|\\lambda| \\in [0, 2]\\) (\\(\\lambda = 0\\) is allowed), so \\(|\\lambda\\vec{a}| \\in [0, 10]\\).",
    },
    {
      title: "Order in a cross product",
      body: "\\(\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}\\) and \\(\\hat{j}\\times\\hat{i} = -\\hat{k}\\). So \\((\\hat{i}\\times\\hat{j})\\cdot\\hat{j} + (\\hat{j}\\times\\hat{i})\\cdot\\hat{k} = 0 + (-1) = -1\\).",
    },
  ],
};

export default sheet;
