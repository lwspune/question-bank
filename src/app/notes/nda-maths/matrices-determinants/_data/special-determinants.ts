import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_DETERMINANTS_NOTE: SubtopicNote = {
  subtopicName: "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
  title: "Special Determinants: Trig, Complex, ω, Polynomial",
  oneLineDefinition:
    "Determinants whose entries are trig functions, complex numbers, cube roots of unity, or polynomial/sequence terms — each family has an identity that collapses it, very often to 0.",
  whyItMatters:
    "Twenty PYQs and the joint-hardest area in the chapter (50% HARD). These look intimidating but " +
    "reward pattern recognition: a trig identity, ω's relation 1 + ω + ω² = 0, the powers of i, or " +
    "an AP/GP row that forces two rows to be dependent. The four families below cover them — and the " +
    "answer is 0 far more often than you'd expect.",
  concepts: [
    // C1 — trig
    {
      kind: "formula" as const,
      slug: "trigonometric-determinants",
      name: "Trigonometric determinants",
      intuition:
        "When entries are trig functions, the move is to apply an identity (Pythagorean, sum-to-product, " +
        "or a triangle relation \\(A+B+C = \\pi\\)) so that two rows/columns become equal or proportional " +
        "— and the determinant drops to 0.",
      definition:
        "Use \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), double-angle, and (for triangle problems) " +
        "\\(A + B + C = \\pi\\). Many such determinants are identically 0 because a trig identity makes " +
        "rows dependent. Expand only after simplifying with the identity.",
      authoredExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}\\cos^2\\tfrac{\\theta}{2} & \\sin^2\\tfrac{\\theta}{2}\\\\ \\sin^2\\tfrac{\\theta}{2} & \\cos^2\\tfrac{\\theta}{2}\\end{vmatrix}\\).",
        steps: [
          "\\(= \\cos^4\\tfrac\\theta2 - \\sin^4\\tfrac\\theta2 = (\\cos^2\\tfrac\\theta2 - \\sin^2\\tfrac\\theta2)(\\cos^2\\tfrac\\theta2 + \\sin^2\\tfrac\\theta2)\\).",
          "Second factor \\(= 1\\); first factor \\(= \\cos\\theta\\) (double-angle).",
        ],
        answer: "\\(\\cos\\theta\\).",
      },
      selfCheckExample: {
        prompt: "In triangle \\(ABC\\), evaluate the determinant whose rows force a triangle identity such that two rows coincide. What is the typical value?",
        steps: [
          "Triangle determinants usually exploit \\(A + B + C = \\pi\\) so that one row becomes a linear combination of the others.",
          "Dependent rows ⇒ determinant 0.",
          "Always test for row dependence via the angle-sum identity before grinding.",
        ],
        answer: "Most triangle trig determinants in the bank evaluate to 0 by row dependence.",
      },
      practiceSet: [
        { prompt: "\\(\\cos^2\\theta + \\sin^2\\theta = ?\\)", answer: "\\(1\\)" },
        { prompt: "\\(\\cos^2 x - \\sin^2 x = ?\\)", answer: "\\(\\cos 2x\\)" },
        { prompt: "First move on a trig determinant?", answer: "Apply an identity to make rows dependent" },
        { prompt: "In a triangle, \\(A + B + C = ?\\)", answer: "\\(\\pi\\)" },
      ],
      pyqExampleId: "31f076a7-9082-452c-bb63-e41458f44d03", // 2017 — cos2/sin2 determinant
    },

    // C2 — complex entries
    {
      kind: "formula" as const,
      slug: "complex-entry-determinants",
      name: "Determinants with complex entries",
      intuition:
        "Treat \\(i\\) like any algebraic symbol but reduce its powers with the cycle " +
        "\\(i, -1, -i, 1\\) (period 4). Expand normally; then collect real and imaginary parts to match " +
        "a target \\(A + iB\\).",
      definition:
        "Powers of \\(i\\): \\(i^1 = i,\\ i^2 = -1,\\ i^3 = -i,\\ i^4 = 1\\), repeating every 4. After " +
        "expanding a complex determinant, write it as \\(A + iB\\) and read off \\(A\\) (real) and " +
        "\\(B\\) (imaginary), or solve for unknowns by equating real/imaginary parts.",
      formula: {
        label: "Powers of i (period 4)",
        latex: "i = i,\\quad i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\begin{vmatrix} i & i^2 & i^3 \\\\ i^4 & i^6 & i^8 \\\\ i^9 & i^{12} & i^{15}\\end{vmatrix}\\).",
        steps: [
          "Reduce powers mod 4: row 1 \\((i, -1, -i)\\); row 2 \\((1, i^2{=}-1, i^0{=}1) = (1, -1, 1)\\); row 3 \\((i^1{=}i, i^0{=}1, i^3{=}-i) = (i, 1, -i)\\).",
          "Determinant of \\(\\begin{pmatrix}i&-1&-i\\\\1&-1&1\\\\i&1&-i\\end{pmatrix}\\): note rows 1 and 3 share columns 1,3 \\((i,-i)\\); expand.",
          "Expanding gives 0 (rows become dependent after reduction).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "If a complex determinant evaluates to \\(6 + 11i\\) and you must find real unknowns \\(x, y\\) inside it, what's the method?",
        steps: [
          "Expand the determinant symbolically into the form \\((\\text{real expr}) + i(\\text{imag expr})\\).",
          "Equate the real part to 6 and the imaginary part to 11.",
          "Solve the two real equations for \\(x\\) and \\(y\\).",
        ],
        answer: "Expand to \\(A + iB\\), then set \\(A = 6\\) and \\(B = 11\\) and solve.",
      },
      practiceSet: [
        { prompt: "\\(i^2 = ?\\)", answer: "\\(-1\\)" },
        { prompt: "\\(i^{15} = ?\\)", answer: "\\(-i\\)", method: "\\(15 \\bmod 4 = 3\\)" },
        { prompt: "\\(i^{12} = ?\\)", answer: "\\(1\\)" },
        { prompt: "To match \\(A + iB\\), you equate?", answer: "real parts and imaginary parts separately" },
      ],
      pyqExampleId: "6d8c7ec3-fcbe-4a4c-95fd-9a7627149201", // 2020 — i-powers determinant
    },

    // C3 — roots of unity
    {
      kind: "formula" as const,
      slug: "roots-of-unity-determinants",
      name: "Cube-root-of-unity determinants",
      intuition:
        "The non-real cube root \\(\\omega\\) obeys two relations that crush these determinants: " +
        "\\(\\omega^3 = 1\\) and \\(1 + \\omega + \\omega^2 = 0\\). Substitute to reduce powers, then the " +
        "sum-to-zero relation usually makes a row vanish.",
      definition:
        "For a non-real cube root of unity \\(\\omega\\): \\(\\omega^3 = 1\\) and " +
        "\\(1 + \\omega + \\omega^2 = 0\\). Reduce every power of \\(\\omega\\) mod 3, then use the " +
        "sum relation — a row or column summing to \\(1 + \\omega + \\omega^2\\) becomes 0, forcing the " +
        "determinant to 0.",
      formula: {
        label: "Cube roots of unity",
        latex: "\\omega^3 = 1, \\qquad 1 + \\omega + \\omega^2 = 0",
      },
      authoredExample: {
        prompt: "If \\(\\omega = -\\tfrac12 + i\\tfrac{\\sqrt3}{2}\\), evaluate \\(\\begin{vmatrix}1+\\omega & 1+\\omega^2\\\\ \\omega & \\omega^2\\end{vmatrix}\\).",
        steps: [
          "Use \\(1 + \\omega = -\\omega^2\\) and \\(1 + \\omega^2 = -\\omega\\) (from \\(1+\\omega+\\omega^2=0\\)).",
          "Determinant \\(= (-\\omega^2)(\\omega^2) - (-\\omega)(\\omega) = -\\omega^4 + \\omega^2\\).",
          "\\(\\omega^4 = \\omega^3\\cdot\\omega = \\omega\\), so \\(= -\\omega + \\omega^2 = \\omega^2 - \\omega\\).",
        ],
        answer: "\\(\\omega^2 - \\omega\\) (equivalently \\(-i\\sqrt3\\)).",
      },
      practiceSet: [
        { prompt: "\\(1 + \\omega + \\omega^2 = ?\\)", answer: "\\(0\\)" },
        { prompt: "\\(\\omega^3 = ?\\)", answer: "\\(1\\)" },
        { prompt: "\\(1 + \\omega = ?\\)", answer: "\\(-\\omega^2\\)" },
        { prompt: "\\(\\omega^4 = ?\\)", answer: "\\(\\omega\\)" },
      ],
      pyqExampleId: "b030202b-f60b-46d8-b0a4-d6dd23e10ceb", // 2025 — omega root of equation
    },

    // C4 — polynomial / progression
    {
      kind: "formula" as const,
      slug: "polynomial-progression-determinants",
      name: "Polynomial and progression determinants",
      intuition:
        "If the rows are terms of an AP or GP (or shifted copies), they're linearly dependent and the " +
        "determinant is 0. When a determinant is set equal to a polynomial \\(ax^4 + \\dots\\), match " +
        "powers of \\(x\\) (or use the degree) to read off a coefficient.",
      definition:
        "**AP/GP rows:** three rows in arithmetic progression satisfy \\(R_1 + R_3 = 2R_2\\) " +
        "(dependent) → determinant 0; GP rows are proportional after a log/ratio step → 0. " +
        "**Determinant as polynomial:** expand to a polynomial in \\(x\\) and equate coefficients, " +
        "or argue the degree to find a specific coefficient.",
      authoredExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}1! & 2! & 3!\\\\2! & 3! & 4!\\\\3! & 4! & 5!\\end{vmatrix}\\).",
        steps: [
          "Write entries: \\(\\begin{vmatrix}1&2&6\\\\2&6&24\\\\6&24&120\\end{vmatrix}\\).",
          "Factor 2 from \\(R_2\\) and 6 from \\(R_3\\): \\(2\\cdot6\\begin{vmatrix}1&2&6\\\\1&3&12\\\\1&4&20\\end{vmatrix}\\).",
          "\\(R_2\\to R_2-R_1,\\ R_3\\to R_3-R_1\\): \\(12\\begin{vmatrix}1&2&6\\\\0&1&6\\\\0&2&14\\end{vmatrix} = 12(1\\cdot(14-12)) = 12\\cdot2\\).",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a, b, c\\) are in AP, what is \\(\\begin{vmatrix}x+1&x+2&x+3\\\\x+2&x+3&x+4\\\\x+a&x+b&x+c\\end{vmatrix}\\)?",
        steps: [
          "Rows 1 and 2 differ by the constant row \\((1,1,1)\\); the entries are themselves in AP across each row.",
          "\\(R_3 - R_2\\) and \\(R_2 - R_1\\) are equal (constant differences) ⇒ rows dependent.",
          "Dependent rows ⇒ determinant 0.",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "Three rows in AP ⇒ determinant?", answer: "\\(0\\)" },
        { prompt: "Rows of a GP (after ratio) are?", answer: "Proportional ⇒ determinant 0" },
        { prompt: "To find a coefficient of \\(x^k\\) in a determinant-polynomial?", answer: "Equate coefficients / use the degree" },
        { prompt: "\\(R_1 + R_3 = 2R_2\\) implies the rows are?", answer: "Dependent (det 0)" },
      ],
      pyqExampleId: "9fe11390-d5a8-4b07-9e78-f088497a3fff", // 2019 — factorial determinant
    },
  ],
};
