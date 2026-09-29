import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_THREE_VARIABLES_NOTE: SubtopicNote = {
  subtopicName: "Sums and Products of Three Variables",
  title: "Sums and Products of Three Variables",
  oneLineDefinition:
    "The square of a + b + c links the sum of squares to the sum of pairwise products, and expanding a product of brackets is read off from those same sums.",
  whyItMatters:
    "Eleven PYQs, mostly MODERATE. Three pieces carry the page: (a + b + c)² = Σa² + 2Σab, the expansion of (x − a)(x − b)(x − c), and the substitution x = s − a when 2s = a + b + c. The 'sum of products two at a time' of a list of numbers is the first identity in disguise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-square-of-trinomial",
      name: "The square of a + b + c",
      intuition:
        "Squaring \\(a + b + c\\) produces each square once and each product of two different letters twice. So any two of \\(\\sum a\\), \\(\\sum a^2\\), \\(\\sum ab\\) fix the third.",
      definition:
        "- \\((a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)\\).\n" +
        "- For any list of numbers, the sum of all products two at a time is \\(\\dfrac{(\\text{sum})^2 - \\text{sum of squares}}{2}\\).\n" +
        "- \\((a - b)^2 + (b - c)^2 + (c - a)^2 = 2(a^2 + b^2 + c^2) - 2(ab + bc + ca)\\).",
      formula: {
        label: "Square of a sum of three",
        latex: "(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)",
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 6\\) and \\(ab + bc + ca = 11\\), find \\(a^2 + b^2 + c^2\\).",
        steps: ["\\(a^2 + b^2 + c^2 = 36 - 2\\times 11\\).", "Check with \\(1, 2, 3\\): \\(1 + 4 + 9 = 14\\)."],
        answer: "\\(14\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of all products taken two at a time of the numbers \\(\\pm 1, \\pm 2, \\pm 3\\).",
        steps: ["The sum is \\(0\\) and the sum of squares is \\(2(1 + 4 + 9) = 28\\).", "\\(\\dfrac{0 - 28}{2}\\)."],
        answer: "\\(-14\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum a^2 = 50\\), \\(\\sum ab = 7\\). Find \\(a + b + c\\).", answer: "\\(\\pm 8\\)" },
        { prompt: "\\(a + b + c = 0\\), \\(\\sum a^2 = 10\\). Find \\(\\sum ab\\).", answer: "\\(-5\\)" },
        { prompt: "\\(\\sum a^2 = 20\\), \\(\\sum ab = 14\\). Find \\(\\sum(a - b)^2\\).", answer: "\\(12\\)" },
        { prompt: "Sum of products two at a time of \\(1, 2, 3, 4\\)?", answer: "\\(35\\)" },
      ],
      pyqExampleId: "dbb8cd7f-551d-4173-86ee-9059c8f3c443", // 2025 (II) — squared differences and sum of squares
      traps: [
        {
          title: "A square root gives two signs",
          body:
            "From \\((a + b + c)^2 = 64\\), \\(a + b + c = \\pm 8\\). Keep both unless the question says the numbers are positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-expanding-products",
      name: "Expanding a product of brackets",
      intuition:
        "Multiplying out \\((x - a)(x - b)(x - c)\\) chooses one term from each bracket in every possible way. Collected by powers of \\(x\\), the coefficients are the sum, the sum of pairs and the product, with alternating signs.",
      definition:
        "- \\((x - a)(x - b)(x - c) = x^3 - (a + b + c)x^2 + (ab + bc + ca)x - abc\\).\n" +
        "- Put \\(x = 1\\): \\((1 - a)(1 - b)(1 - c) = 1 - \\sum a + \\sum ab - abc\\).\n" +
        "- \\((a + b + c)^3 = a^3 + b^3 + c^3 + 3(a + b)(b + c)(c + a)\\).\n" +
        "- A product of brackets of distinct symbols has as many terms as the product of the bracket lengths.",
      formula: {
        label: "Cubic from its roots",
        latex: "(x - a)(x - b)(x - c) = x^3 - \\textstyle\\sum a\\, x^2 + \\sum ab\\, x - abc",
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 6\\), \\(ab + bc + ca = 11\\) and \\(abc = 6\\), find \\((2 - a)(2 - b)(2 - c)\\).",
        steps: [
          "\\((2 - a)(2 - b)(2 - c) = 8 - 4\\sum a + 2\\sum ab - abc\\).",
          "\\(= 8 - 24 + 22 - 6 = 0\\) (indeed \\(2\\) is one of \\(1, 2, 3\\)).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "How many terms are there in \\((a + b)(c + d + e)(f + g)\\)?",
        steps: ["Each term takes one letter from each bracket: \\(2\\times 3\\times 2\\)."],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "Coefficient of \\(x\\) in \\((x - 1)(x - 2)(x - 3)\\)?", answer: "\\(11\\)" },
        { prompt: "\\((1 + a)(1 + b)(1 + c)\\)?", answer: "\\(1 + \\sum a + \\sum ab + abc\\)" },
        { prompt: "If \\(a + b + c = 0\\), \\((a + b)(b + c)(c + a)\\)?", answer: "\\(-abc\\)" },
        { prompt: "Constant term of \\((x - 2)(x + 3)(x - 5)\\)?", answer: "\\(30\\)" },
      ],
      pyqExampleId: "b358e1af-bdc5-44f6-af54-895fea54b449", // 2021 (II) — (1 − α)(1 − β)(1 − γ)
      traps: [
        {
          title: "The signs alternate",
          body:
            "In \\((x - a)(x - b)(x - c)\\) the coefficients go \\(+, -, +, -\\): the \\(x\\) term is \\(+\\sum ab\\) and the constant is \\(-abc\\). With \\((x + a)(x + b)(x + c)\\) every sign is \\(+\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-semi-perimeter",
      name: "When 2s = a + b + c",
      intuition:
        "The quantities \\(s - a\\), \\(s - b\\), \\(s - c\\) are simpler than they look: any two of them add to the third side, and all three add to \\(s\\). Renaming them turns a messy expression into a short one.",
      definition:
        "If \\(2s = a + b + c\\), write \\(x = s - a\\), \\(y = s - b\\), \\(z = s - c\\). Then:\n" +
        "- \\(x + y = c\\), \\(y + z = a\\), \\(z + x = b\\);\n" +
        "- \\(x + y + z = s\\);\n" +
        "- \\((s - a)(s - b) + (s - b)(s - c) + (s - c)(s - a) = 3s^2 - 2s(a + b + c) + \\sum ab = \\sum ab - s^2\\).",
      formula: {
        label: "Semi-perimeter pieces",
        latex: "(s - a) + (s - b) + (s - c) = s",
      },
      authoredExample: {
        prompt: "If \\(2s = a + b + c\\), write \\(s^2 + (s - a)^2 + (s - b)^2 + (s - c)^2\\) in terms of \\(a\\), \\(b\\), \\(c\\).",
        steps: [
          "\\((s - a)^2 + (s - b)^2 + (s - c)^2 = 3s^2 - 2s(a + b + c) + \\sum a^2 = 3s^2 - 4s^2 + \\sum a^2\\).",
          "Adding \\(s^2\\) leaves \\(a^2 + b^2 + c^2\\).",
        ],
        answer: "\\(a^2 + b^2 + c^2\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has sides \\(5, 5, 6\\). Find \\(s(s - a)(s - b)(s - c)\\).",
        steps: ["\\(s = 8\\), so the product is \\(8\\times 3\\times 3\\times 2\\)."],
        answer: "\\(144\\) (the square of the area, \\(12\\)).",
      },
      practiceSet: [
        { prompt: "\\(a + b + c = 10\\), \\(a = 3\\). Find \\(s - a\\).", answer: "\\(2\\)" },
        { prompt: "\\((s - a) + (s - b)\\)?", answer: "\\(c\\)" },
        { prompt: "Sides \\(7, 8, 9\\). Find \\(s\\).", answer: "\\(12\\)" },
        { prompt: "\\((s - a) + (s - b) + (s - c)\\)?", answer: "\\(s\\)" },
      ],
      pyqExampleId: "646fbdcf-8c9e-45ae-a54f-c492f69d5a17", // 2023 (II) — s² + Σ(s − a)(s − b)
      traps: [
        {
          title: "s is half the perimeter",
          body:
            "\\(2s = a + b + c\\), so \\(s - a = \\dfrac{b + c - a}{2}\\), not \\(b + c - a\\). Substituting \\(s = a + b + c\\) doubles every term.",
        },
      ],
    },
  ],
};
