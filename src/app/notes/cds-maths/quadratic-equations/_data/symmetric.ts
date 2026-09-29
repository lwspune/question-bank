import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_SYMMETRIC_NOTE: SubtopicNote = {
  subtopicName: "Symmetric Functions of the Roots",
  title: "Symmetric Functions of the Roots",
  oneLineDefinition:
    "Any expression in α and β that does not change when they swap can be written through α + β and αβ, which the coefficients give directly.",
  whyItMatters:
    "Seventeen PYQs, the largest page in the chapter. Never solve for the roots: rewrite the asked expression through the sum and product. Three rewrites cover nearly all of them — α² + β², (α − β)², and α³ + β³.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-sum-of-squares",
      name: "Squares, reciprocals and products of the roots",
      intuition:
        "The sum and product are the two building blocks. Squares come from squaring the sum; reciprocals from dividing the sum by the product; and a product like \\((\\alpha + 1)(\\beta + 1)\\) from expanding it.",
      definition:
        "With \\(S = \\alpha + \\beta = -\\dfrac ba\\) and \\(P = \\alpha\\beta = \\dfrac ca\\):\n" +
        "- \\(\\alpha^2 + \\beta^2 = S^2 - 2P\\) and \\(\\alpha^4 + \\beta^4 = (\\alpha^2 + \\beta^2)^2 - 2P^2\\);\n" +
        "- \\(\\dfrac1\\alpha + \\dfrac1\\beta = \\dfrac SP\\) and \\(\\dfrac\\alpha\\beta + \\dfrac\\beta\\alpha = \\dfrac{S^2 - 2P}{P}\\);\n" +
        "- \\((\\alpha + k)(\\beta + k) = P + kS + k^2\\);\n" +
        "- since \\(a\\alpha^2 + b\\alpha + c = 0\\), \\(a\\alpha + b = -\\dfrac c\\alpha\\).",
      formula: {
        label: "Sum of squares of the roots",
        latex: "\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta",
      },
      authoredExample: {
        prompt: "If \\(\\alpha, \\beta\\) are the roots of \\(x^2 - 5x + 3 = 0\\), find \\(\\alpha^2 + \\beta^2\\) and \\(\\dfrac1\\alpha + \\dfrac1\\beta\\).",
        steps: ["\\(S = 5\\), \\(P = 3\\).", "\\(\\alpha^2 + \\beta^2 = 25 - 6 = 19\\); \\(\\dfrac SP = \\dfrac53\\)."],
        answer: "\\(19\\) and \\(\\dfrac53\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\alpha, \\beta\\) are the roots of \\(x^2 - 4x + 2 = 0\\), find \\(\\alpha^4 + \\beta^4\\).",
        steps: ["\\(\\alpha^2 + \\beta^2 = 16 - 4 = 12\\).", "\\(\\alpha^4 + \\beta^4 = 144 - 2\\times 4 = 136\\)."],
        answer: "\\(136\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2 + 3x - 4 = 0\\): \\(\\alpha^2 + \\beta^2\\)?", answer: "\\(17\\)" },
        { prompt: "Roots of \\(2x^2 - 6x + 1 = 0\\): \\(\\dfrac1\\alpha + \\dfrac1\\beta\\)?", answer: "\\(6\\)" },
        { prompt: "Roots of \\(x^2 - 3x + 1 = 0\\): \\((\\alpha - 1)(\\beta - 1)\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(\\alpha + \\beta = 10\\), \\(\\alpha^2 + \\beta^2 = 58\\). \\(\\alpha\\beta\\)?", answer: "\\(21\\)" },
      ],
      pyqExampleId: "eb38531a-793d-4d2c-9780-e0b406621fb1", // 2023 (I) — α⁴ + β⁴ for x² − 7x + 1 = 0
      traps: [
        {
          title: "A bound that is never reached",
          body:
            "When a parameter varies, an expression like \\(\\dfrac{18}{k} - 2\\) with \\(k < 0\\) gets as close to \\(-2\\) as you like but never equals it. Check whether the extreme value is actually attained before calling it the maximum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-difference-of-roots",
      name: "The difference of the roots",
      intuition:
        "\\((\\alpha - \\beta)^2\\) is the square of the sum minus four times the product, which is the discriminant divided by \\(a^2\\). So a condition on the difference of the roots is a condition on the discriminant.",
      definition:
        "- \\((\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta = \\dfrac{b^2 - 4ac}{a^2}\\).\n" +
        "- If the roots differ by \\(d\\): \\(b^2 - 4ac = a^2d^2\\).\n" +
        "- Sum and difference together give the roots: \\(\\alpha = \\dfrac{S + d}{2}\\), \\(\\beta = \\dfrac{S - d}{2}\\).\n" +
        "- Move every term to one side before reading the coefficients: in \\(x^2 - bx + c = 5\\) the constant is \\(c - 5\\).",
      formula: {
        label: "Difference of the roots",
        latex: "(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2 - 9x + k = 0\\) differ by \\(3\\). Find \\(k\\).",
        steps: ["\\(81 - 4k = 9\\), so \\(k = 18\\).", "Check: the roots are \\(6\\) and \\(3\\)."],
        answer: "\\(18\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(x^2 + kx + 12 = 0\\) differ by \\(1\\). Find the positive value of \\(k\\).",
        steps: ["\\(k^2 - 48 = 1\\), so \\(k^2 = 49\\)."],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2 - 6x + 5 = 0\\): \\(|\\alpha - \\beta|\\)?", answer: "\\(4\\)" },
        { prompt: "Sum \\(12\\), difference \\(2\\). The roots?", answer: "\\(7\\) and \\(5\\)" },
        { prompt: "Roots of \\(x^2 - 11x + r = 0\\) differ by \\(1\\). \\(r\\)?", answer: "\\(30\\)" },
        { prompt: "\\((\\alpha - \\beta)^2\\) for \\(2x^2 - 6x + 1 = 0\\)?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "3728539f-f89d-45fe-865c-9da745acb285", // 2020 (I) — x² + kx − 15 = 0, α − β = 8
      traps: [
        {
          title: "The difference fixes k only up to sign",
          body:
            "\\(k^2 = 49\\) gives \\(k = \\pm 7\\); the question usually says which sign it wants. Squared conditions always lose the sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-cubes-of-roots",
      name: "Cubes of the roots",
      intuition:
        "Cube the sum and remove the cross terms, exactly as for any two numbers. When a coefficient depends on a parameter, the result is a function of that parameter whose extreme you can then find.",
      definition:
        "- \\(\\alpha^3 + \\beta^3 = S^3 - 3PS\\).\n" +
        "- \\(\\alpha^3 - \\beta^3 = (\\alpha - \\beta)(S^2 - P)\\).\n" +
        "- If \\(S\\) and \\(P\\) depend on an angle or a parameter, write the answer in one variable and find its least or greatest value on the allowed range.",
      formula: {
        label: "Sum of cubes of the roots",
        latex: "\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta)",
      },
      authoredExample: {
        prompt: "If \\(\\alpha, \\beta\\) are the roots of \\(x^2 - 3x + 1 = 0\\), find \\(\\alpha^3 + \\beta^3\\).",
        steps: ["\\(27 - 3\\times 1\\times 3\\)."],
        answer: "\\(18\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(x^2 - tx + (t - 1) = 0\\) are \\(p, q\\). Find the least value of \\(p^2 + q^2\\).",
        steps: ["\\(p^2 + q^2 = t^2 - 2(t - 1) = (t - 1)^2 + 1\\)."],
        answer: "\\(1\\), at \\(t = 1\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2 - 2x - 1 = 0\\): \\(\\alpha^3 + \\beta^3\\)?", answer: "\\(14\\)" },
        { prompt: "Roots of \\(x^2 + x + 1 = 0\\): \\(\\alpha^3 + \\beta^3\\)?", answer: "\\(2\\)" },
        { prompt: "\\(S = 4\\), \\(P = 3\\). \\(\\alpha^3 + \\beta^3\\)?", answer: "\\(28\\)" },
        { prompt: "\\(S = 0\\). \\(\\alpha^3 + \\beta^3\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "313b98a9-2583-4eb9-ad11-4fe37609af02", // 2026 (II) — 2α³ + 2β³ in terms of n
      traps: [
        {
          title: "Keep a leading coefficient",
          body:
            "For \\(2x^2 - \\ldots\\) the product is the constant DIVIDED BY \\(2\\). Forgetting to divide is the commonest slip on this page, and it produces an answer twice too large in one term.",
        },
      ],
    },
  ],
};
