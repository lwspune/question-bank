import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_DEGREE_NOTE: SubtopicNote = {
  subtopicName: "Degree, Zeros and Coefficients",
  title: "Degree, Zeros and Coefficients",
  oneLineDefinition:
    "Degrees add when polynomials are multiplied and can drop when they are added; the zeros of a polynomial are tied to its coefficients by sums and products.",
  whyItMatters:
    "Eight PYQs. Two facts about degree, one about identities (every coefficient must vanish), and the sum-and-product relations for the zeros — the same ones as for a quadratic, extended to a cubic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspo-degree",
      name: "Degree, identities and integer values",
      intuition:
        "Multiplying leading terms can never cancel, so degrees add. Adding two polynomials of the same degree can cancel the leading terms, so the degree can fall. A polynomial that is zero for EVERY x must have every coefficient zero.",
      definition:
        "- \\(\\deg(fg) = \\deg f + \\deg g\\).\n" +
        "- \\(\\deg(f \\pm g) \\le \\max(\\deg f, \\deg g)\\), with equality when the degrees differ.\n" +
        "- \\(ax^2 + bx + c = 0\\) for all \\(x\\) (an identity) only when \\(a = b = c = 0\\).\n" +
        "- A polynomial can take integer values at every integer without having integer coefficients: \\(\\dfrac{x(x + 1)}{2}\\) is always an integer. The constant term, the value at \\(0\\), must be an integer.",
      formula: {
        label: "Degree of a product",
        latex: "\\deg(fg) = \\deg f + \\deg g",
      },
      authoredExample: {
        prompt: "For which \\(k\\) is \\((k^2 - 1)x^2 + (k^2 + k)x + (k + 1) = 0\\) an identity?",
        steps: [
          "\\(k^2 - 1 = 0\\): \\(k = \\pm 1\\). \\(k^2 + k = 0\\): \\(k = 0\\) or \\(-1\\). \\(k + 1 = 0\\): \\(k = -1\\).",
          "Only \\(k = -1\\) makes all three zero.",
        ],
        answer: "\\(k = -1\\).",
      },
      selfCheckExample: {
        prompt: "\\(f\\) has degree \\(5\\) and \\(g\\) has degree \\(5\\). What can the degree of \\(f - g\\) be?",
        steps: ["At most \\(5\\); less if the leading terms cancel (or \\(f - g\\) may be the zero polynomial)."],
        answer: "Any value up to \\(5\\).",
      },
      practiceSet: [
        { prompt: "Degree of \\(f\\cdot g\\), degrees \\(2\\) and \\(6\\)?", answer: "\\(8\\)" },
        { prompt: "Degree of \\(f + g\\), degrees \\(2\\) and \\(6\\)?", answer: "\\(6\\)" },
        { prompt: "\\((a - 2)x + (b + 3) = 0\\) for all \\(x\\). \\(a, b\\)?", answer: "\\(2, -3\\)" },
        { prompt: "Must \\(p\\) be an integer if \\(x^2 + px\\) is always an integer?", answer: "Yes (put \\(x = 1\\))" },
      ],
      pyqExampleId: "d6252dd2-b997-47c6-81cf-38e719ed5835", // 2026 (I) — k for which the quadratic is an identity
      traps: [
        {
          title: "Equal degrees can cancel",
          body:
            "\\((x^3 + x) - (x^3 + 1) = x - 1\\): the degree dropped from \\(3\\) to \\(1\\). So the degree of a sum is only 'at most' the larger degree.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-zeros-coefficients",
      name: "Zeros and coefficients",
      intuition:
        "A monic polynomial with zeros \\(\\alpha, \\beta, \\gamma\\) is \\((x - \\alpha)(x - \\beta)(x - \\gamma)\\). Expanding it shows the coefficients are sums and products of the zeros, exactly as for a quadratic.",
      definition:
        "For \\(ax^3 + bx^2 + cx + d\\) with zeros \\(\\alpha, \\beta, \\gamma\\):\n" +
        "- \\(\\alpha + \\beta + \\gamma = -\\dfrac ba\\), \\(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\dfrac ca\\), \\(\\alpha\\beta\\gamma = -\\dfrac da\\);\n" +
        "- \\(\\alpha^2 + \\beta^2 + \\gamma^2 = \\left(\\dfrac ba\\right)^2 - \\dfrac{2c}{a}\\).\n" +
        "- A polynomial with new zeros: find their sum and product, then write \\(x^2 - (\\text{sum})x + \\text{product}\\) and clear fractions.\n" +
        "- Two monic polynomials sharing three zeros differ by (common cubic) \\(\\times\\) (difference of the fourth factors).",
      formula: {
        label: "Cubic: sum of zeros",
        latex: "\\alpha + \\beta + \\gamma = -\\dfrac ba, \\quad \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\dfrac ca, \\quad \\alpha\\beta\\gamma = -\\dfrac da",
      },
      authoredExample: {
        prompt: "The zeros of \\(2x^3 - 3x^2 - 3x + 2\\) are \\(\\alpha, \\beta, \\gamma\\). Find \\(\\dfrac1\\alpha + \\dfrac1\\beta + \\dfrac1\\gamma\\).",
        steps: [
          "\\(\\dfrac1\\alpha + \\dfrac1\\beta + \\dfrac1\\gamma = \\dfrac{\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha}{\\alpha\\beta\\gamma}\\).",
          "\\(\\sum\\alpha\\beta = -\\dfrac32\\) and \\(\\alpha\\beta\\gamma = -\\dfrac22 = -1\\), so the sum is \\(\\dfrac32\\). (The zeros are \\(-1, \\dfrac12, 2\\).)",
        ],
        answer: "\\(\\dfrac32\\).",
      },
      selfCheckExample: {
        prompt: "The zeros of \\(x^2 - 5x + 6\\) are \\(\\alpha, \\beta\\). Find a polynomial with zeros \\(\\dfrac1\\alpha\\) and \\(\\dfrac1\\beta\\).",
        steps: ["Sum \\(= \\dfrac{\\alpha + \\beta}{\\alpha\\beta} = \\dfrac56\\), product \\(= \\dfrac16\\).", "\\(x^2 - \\dfrac56x + \\dfrac16\\), times \\(6\\)."],
        answer: "\\(6x^2 - 5x + 1\\).",
      },
      practiceSet: [
        { prompt: "Product of the zeros of \\(2x^3 - 3x + 8\\)?", answer: "\\(-4\\)" },
        { prompt: "Sum of the zeros of \\(x^3 + 4x^2 - 1\\)?", answer: "\\(-4\\)" },
        { prompt: "Zeros \\(1, 1, 2\\): the monic cubic?", answer: "\\(x^3 - 4x^2 + 5x - 2\\)" },
        { prompt: "\\(\\sum\\alpha = 3\\), \\(\\sum\\alpha\\beta = 1\\). \\(\\sum\\alpha^2\\)?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "533d35bd-c79c-40f4-89e0-97bf2399d2d5", // 2018 (II) — α² + β² + γ² for ax³ + bx² + cx + d
      traps: [
        {
          title: "Divide by a",
          body:
            "The relations use \\(\\dfrac ba\\), \\(\\dfrac ca\\), \\(\\dfrac da\\). For a non-monic cubic, \\(\\sum\\alpha^2 = \\dfrac{b^2 - 2ac}{a^2}\\), not \\(b^2 - 2c\\).",
        },
      ],
    },
  ],
};
