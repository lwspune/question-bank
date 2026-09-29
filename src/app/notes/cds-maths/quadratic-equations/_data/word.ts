import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_WORD_NOTE: SubtopicNote = {
  subtopicName: "Word Problems and Applications",
  title: "Word Problems with Quadratics",
  oneLineDefinition:
    "Name the unknown, turn each sentence into an equation, solve the quadratic, and keep only the root the situation allows.",
  whyItMatters:
    "Six PYQs, mostly MODERATE. The equation is always short; marks are lost in the last step, by keeping a negative length or a non-natural number, or by answering the wrong quantity (the sum of the numbers, not the smallest one).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-number-problems",
      name: "Number problems",
      intuition:
        "Consecutive numbers are \\(n, n + 1, n + 2\\); consecutive even or odd numbers, and 'alternate' numbers, are \\(n, n + 2, n + 4\\). With the right naming, the condition becomes a quadratic in \\(n\\).",
      definition:
        "- Consecutive: \\(n, n + 1, \\ldots\\). Alternate or consecutive even/odd: \\(n, n + 2, \\ldots\\).\n" +
        "- A number and its square: \\(n + n^2\\); a number and its reciprocal: \\(n + \\dfrac1n\\).\n" +
        "- Keep the root the question allows (natural, positive, integer). Both roots may be valid if nothing rules one out.\n" +
        "- Answer the quantity asked for — often the sum or difference, not \\(n\\) itself.",
      formula: {
        label: "Sum of squares of consecutive numbers",
        latex: "n^2 + (n + 1)^2 = 2n^2 + 2n + 1",
      },
      authoredExample: {
        prompt: "The sum of the squares of three consecutive natural numbers is \\(149\\). Find their sum.",
        steps: [
          "\\((n - 1)^2 + n^2 + (n + 1)^2 = 3n^2 + 2 = 149\\), so \\(n^2 = 49\\) and \\(n = 7\\).",
          "The numbers are \\(6, 7, 8\\).",
        ],
        answer: "\\(21\\).",
      },
      selfCheckExample: {
        prompt: "The product of two consecutive even numbers is \\(168\\). Find the numbers (positive).",
        steps: ["\\(n(n + 2) = 168\\): \\(n^2 + 2n - 168 = (n - 12)(n + 14) = 0\\)."],
        answer: "\\(12\\) and \\(14\\).",
      },
      practiceSet: [
        { prompt: "A number exceeds its square root by \\(12\\) (positive). The number?", answer: "\\(16\\)" },
        { prompt: "Sum of a number and its square is \\(30\\). The numbers?", answer: "\\(5\\) or \\(-6\\)" },
        { prompt: "\\(\\dfrac1n + \\dfrac{1}{n + 1} = \\dfrac{5}{6}\\), \\(n\\) natural. \\(n\\)?", answer: "\\(2\\)" },
        { prompt: "Two numbers: sum \\(15\\), sum of squares \\(113\\). The numbers?", answer: "\\(7\\) and \\(8\\)" },
      ],
      pyqExampleId: "ab925a46-ce2b-4559-aaf8-1519ac7f327a", // 2019 (I) — four consecutive numbers, squares add to 294
      traps: [
        {
          title: "Both roots can be right",
          body:
            "'The sum of a number and its square is \\(30\\)' has two answers, \\(5\\) and \\(-6\\), because nothing says the number is positive. Reject a root only when the stem rules it out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-lengths-and-prices",
      name: "Lengths and prices",
      intuition:
        "A fixed total split in two ways gives two fractions whose difference is known. Clearing the denominators leaves a quadratic in the unknown length or quantity.",
      definition:
        "- Price per unit \\(= \\dfrac{\\text{total}}{\\text{quantity}}\\). 'Buy \\(2\\) more for the same money and pay \\(r\\) less per unit': \\(\\dfrac Tn - \\dfrac{T}{n + 2} = r\\), so \\(\\dfrac{2T}{n(n + 2)} = r\\).\n" +
        "- A point dividing a segment: if \\(AC = x\\) then \\(CB = \\text{length} - x\\); keep the root that lies inside the segment.\n" +
        "- Lengths, times and quantities are positive; drop a negative root.",
      formula: {
        label: "Same total, two prices",
        latex: "\\dfrac{T}{n} - \\dfrac{T}{n + k} = r \\;\\Rightarrow\\; n(n + k) = \\dfrac{kT}{r}",
      },
      authoredExample: {
        prompt: "Some pens cost Rs. 180. With \\(3\\) more pens for the same money, each would cost Rs. 3 less. How many pens were bought?",
        steps: [
          "\\(\\dfrac{180}{n} - \\dfrac{180}{n + 3} = 3\\), so \\(n(n + 3) = \\dfrac{3\\times 180}{3} = 180\\).",
          "\\(n^2 + 3n - 180 = (n - 12)(n + 15) = 0\\).",
        ],
        answer: "\\(12\\) pens.",
      },
      selfCheckExample: {
        prompt: "A rectangle has perimeter \\(34\\) cm and area \\(60\\) cm\\(^2\\). Find its length.",
        steps: ["\\(l + b = 17\\), \\(lb = 60\\): the sides are roots of \\(x^2 - 17x + 60 = 0\\)."],
        answer: "\\(12\\) cm (breadth \\(5\\) cm).",
      },
      practiceSet: [
        { prompt: "\\(n(n + 2) = 80\\), \\(n > 0\\). \\(n\\)?", answer: "\\(8\\)" },
        { prompt: "A piece of a \\(4\\) cm segment satisfies \\(x^2 - 12x + 16 = 0\\). Which root is it?", answer: "\\(6 - 2\\sqrt5\\) (the other exceeds \\(4\\))" },
        { prompt: "Rectangle: \\(l - b = 3\\), \\(lb = 40\\). \\(l\\)?", answer: "\\(8\\)" },
        { prompt: "Can a length be \\(-6\\)?", answer: "No" },
      ],
      pyqExampleId: "8bb94127-7577-439e-bd9b-5ac4bffcc808", // 2022 (I) — cloth for Rs. 10,000, 2 m longer, Rs. 250 less
      traps: [
        {
          title: "Keep the root inside the segment",
          body:
            "When a point \\(C\\) divides a segment of length \\(4\\), a root like \\(6 + 2\\sqrt5\\) is longer than the segment itself. Only the root between \\(0\\) and the length is a real position.",
        },
      ],
    },
  ],
};
