import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PO_ZEROES_NOTE: SubtopicNote = {
  subtopicName: "Zeroes and Coefficients",
  title: "Zeroes and Coefficients",
  oneLineDefinition:
    "The sum and the product of a polynomial's zeroes can be read straight from its coefficients, so you can build a polynomial from its zeroes or find a missing zero without solving.",
  whyItMatters:
    "Nine questions in the bank: five EASY, two MODERATE and two HARD. They form a quadratic or cubic from its zeroes, find a third zero, or reason about the signs of zeroes. Each needs the sum and product rules, and a lost minus sign in −b/a is the commonest wrong option.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spipoze-quadratic",
      name: "Sum and product of the zeroes of a quadratic polynomial",
      intuition:
        "If α and β are the zeroes of \\(ax^2 + bx + c\\), then it equals \\(a(x - \\alpha)(x - \\beta)\\). Multiplying out shows the sum of the zeroes in the x term and their product in the constant.",
      definition:
        "- \\(\\alpha + \\beta = -\\frac{b}{a}\\) and \\(\\alpha\\beta = \\frac{c}{a}\\).\n" +
        "- \\(\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta}\\) and \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta\\).\n" +
        "- **Signs:** a positive product means both zeroes have the same sign; then a positive sum means both positive, a negative sum both negative. A negative product means one positive and one negative.",
      formula: {
        label: "Zeroes of a quadratic polynomial",
        latex: "\\alpha + \\beta = -\\frac{b}{a} \\qquad \\alpha\\beta = \\frac{c}{a} \\qquad \\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta",
      },
      authoredExample: {
        prompt: "α and β are the zeroes of \\(2x^2 - 5x - 3\\). Find \\(\\frac{1}{\\alpha} + \\frac{1}{\\beta}\\).",
        steps: [
          "\\(\\alpha + \\beta = \\frac{5}{2}\\) and \\(\\alpha\\beta = -\\frac{3}{2}\\).",
          "\\(\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{5/2}{-3/2} = -\\frac{5}{3}\\).",
          "Check: the zeroes are 3 and \\(-\\frac{1}{2}\\), and \\(\\frac{1}{3} - 2 = -\\frac{5}{3}\\).",
        ],
        answer: "\\(-\\frac{5}{3}\\)",
      },
      selfCheckExample: {
        prompt: "α and β are the zeroes of \\(x^2 - 6x + 4\\). Find \\(\\alpha^2 + \\beta^2\\).",
        steps: ["\\(\\alpha + \\beta = 6\\), \\(\\alpha\\beta = 4\\).", "\\(\\alpha^2 + \\beta^2 = 36 - 8 = 28\\)."],
        answer: "28",
      },
      practiceSet: [
        { prompt: "What is the product of the zeroes of \\(3x^2 + 5x - 6\\)?", answer: "\\(-\\frac{6}{3} = -2\\)" },
        { prompt: "What is the sum of the zeroes of \\(x^2 - 7x + 2\\)?", answer: "7" },
        { prompt: "Both zeroes of a quadratic polynomial are negative. What are the signs of their sum and their product?", answer: "The sum is negative and the product is positive" },
        { prompt: "α and β are the zeroes of \\(x^2 + 3x - 5\\). Find \\(\\frac{1}{\\alpha} + \\frac{1}{\\beta}\\).", answer: "\\(\\frac{-3}{-5} = \\frac{3}{5}\\)" },
      ],
      pyqExampleId: "dcf64123-95d6-454e-9c2e-4d332aa06718",
      traps: [
        {
          title: "Dropping the minus in the sum",
          body: "For \\(2x^2 + 3x + 4\\), the sum of the zeroes is \\(-\\frac{3}{2}\\) and the product 2, so \\(\\frac{1}{\\alpha} + \\frac{1}{\\beta} = -\\frac{3}{4}\\), not \\(\\frac{3}{4}\\).",
        },
        {
          title: "Reading signs from the product alone",
          body: "A positive product says only that the zeroes share a sign. Look at the sum to tell whether both are positive or both are negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipoze-forming",
      name: "Forming a quadratic polynomial from its zeroes",
      intuition:
        "The sum and the product of the zeroes are all a quadratic needs. Put them in the pattern \\(x^2 - (\\text{sum})x + \\text{product}\\), and any non-zero multiple of the result has the same zeroes.",
      definition:
        "- Quadratic polynomial with zeroes α and β: \\(k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta]\\), for any non-zero k.\n" +
        "- So there are **infinitely many** polynomials with the same two zeroes.\n" +
        "- If one zero is \\(p + \\sqrt{q}\\) and the sum is 2p, the other zero is \\(p - \\sqrt{q}\\), and their product is \\(p^2 - q\\).",
      formula: {
        label: "Quadratic from its zeroes",
        latex: "k\\left[x^2 - (\\alpha + \\beta)x + \\alpha\\beta\\right]",
      },
      authoredExample: {
        prompt: "Find a quadratic polynomial whose zeroes are \\(3 + \\sqrt{2}\\) and \\(3 - \\sqrt{2}\\).",
        steps: [
          "Sum \\(= 6\\).",
          "Product \\(= (3 + \\sqrt{2})(3 - \\sqrt{2}) = 9 - 2 = 7\\).",
          "Polynomial: \\(x^2 - 6x + 7\\).",
        ],
        answer: "\\(x^2 - 6x + 7\\)",
      },
      selfCheckExample: {
        prompt: "Find a quadratic polynomial whose zeroes have sum \\(-2\\) and product \\(-8\\).",
        steps: ["\\(x^2 - (-2)x + (-8) = x^2 + 2x - 8\\).", "Check: \\((x + 4)(x - 2)\\) has zeroes \\(-4\\) and 2, sum \\(-2\\), product \\(-8\\)."],
        answer: "\\(x^2 + 2x - 8\\)",
      },
      practiceSet: [
        { prompt: "Find a quadratic polynomial whose zeroes are 6 and \\(-1\\).", answer: "\\(x^2 - 5x - 6\\)" },
        { prompt: "Find a quadratic polynomial whose zeroes are 0 and 5.", answer: "\\(x^2 - 5x\\)" },
        { prompt: "How many quadratic polynomials have the zeroes 1 and 4?", answer: "Infinitely many: \\(k(x^2 - 5x + 4)\\) for any non-zero k" },
        { prompt: "One zero of a quadratic polynomial is \\(1 + \\sqrt{3}\\) and the sum of its zeroes is 2. Find the polynomial.", answer: "The other zero is \\(1 - \\sqrt{3}\\), product \\(-2\\): \\(x^2 - 2x - 2\\)" },
      ],
      pyqExampleId: "7f01a0ac-5200-4395-81a3-a4d2efa3f72c",
      traps: [
        {
          title: "Thinking only one polynomial fits",
          body: "\\(x^2 - 5x + 4\\), \\(2x^2 - 10x + 8\\) and \\(-x^2 + 5x - 4\\) all have the zeroes 1 and 4. An option that is a multiple of your answer is still right.",
        },
        {
          title: "Adding instead of subtracting in a conjugate product",
          body: "\\((3 + \\sqrt{2})(3 - \\sqrt{2}) = 9 - 2 = 7\\), not \\(9 + 2\\). The square of the root part is always subtracted.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipoze-cubic",
      name: "Zeroes and coefficients of a cubic polynomial",
      intuition:
        "A cubic has three zeroes, and three relations tie them to the coefficients: their sum, the sum of their products two at a time, and their product. One relation is often enough to find a missing zero.",
      definition:
        "- For \\(ax^3 + bx^2 + cx + d\\) with zeroes α, β, γ:\n" +
        "- \\(\\alpha + \\beta + \\gamma = -\\frac{b}{a}\\), \\(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a}\\), \\(\\alpha\\beta\\gamma = -\\frac{d}{a}\\).\n" +
        "- Two zeroes given: the sum gives the third at once.\n" +
        "- Zeroes in an A.P.: write them \\(m - n\\), m, \\(m + n\\). Their sum is 3m, so m comes first.",
      formula: {
        label: "Zeroes of a cubic polynomial",
        latex: "\\alpha + \\beta + \\gamma = -\\frac{b}{a} \\qquad \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a} \\qquad \\alpha\\beta\\gamma = -\\frac{d}{a}",
      },
      authoredExample: {
        prompt: "Find a cubic polynomial whose zeroes are 1, 2 and 4.",
        steps: [
          "Sum \\(= 7\\). Products in pairs \\(= 2 + 8 + 4 = 14\\). Product \\(= 8\\).",
          "Polynomial: \\(x^3 - 7x^2 + 14x - 8\\).",
          "Check: \\((x - 1)(x - 2)(x - 4) = (x^2 - 3x + 2)(x - 4) = x^3 - 7x^2 + 14x - 8\\).",
        ],
        answer: "\\(x^3 - 7x^2 + 14x - 8\\)",
      },
      selfCheckExample: {
        prompt: "Two zeroes of \\(x^3 - 6x^2 + 11x - 6\\) are 1 and 2. Find the third zero.",
        steps: ["The sum of the zeroes is 6.", "\\(1 + 2 + \\gamma = 6\\), so \\(\\gamma = 3\\). Check the product: \\(1 \\times 2 \\times 3 = 6\\)."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "What is the product of the zeroes of \\(2x^3 - 5x^2 + x + 6\\)?", answer: "\\(-\\frac{6}{2} = -3\\)" },
        { prompt: "What is the sum of the zeroes of \\(x^3 + 4x^2 - x - 4\\)?", answer: "\\(-4\\)" },
        { prompt: "Find a cubic polynomial whose zeroes are 1, \\(-1\\) and 3.", answer: "\\(x^3 - 3x^2 - x + 3\\)" },
        { prompt: "The zeroes of a cubic polynomial are written as \\(m - n\\), m and \\(m + n\\). What is their sum?", answer: "3m" },
      ],
      pyqExampleId: "2dee071e-affe-4634-8f34-4b73b6e3d8ea",
      traps: [
        {
          title: "Using the quadratic sign for a cubic product",
          body: "For a quadratic the product of the zeroes is \\(+\\frac{c}{a}\\), but for a cubic it is \\(-\\frac{d}{a}\\). The product of the zeroes of \\(x^3 - 2x + 5\\) is \\(-5\\).",
        },
      ],
    },
  ],
};
