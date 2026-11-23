import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_AL_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Squares and Values of Expressions",
  title: "Squares and Values of Expressions",
  oneLineDefinition:
    "The square of a sum or a difference has three terms, and the middle one is twice the product; to find a value, put the numbers in place of the letters.",
  whyItMatters:
    "3 of the chapter's 6 questions: 2 EASY and 1 MODERATE. One expands the square of a difference, one adds the squares of a sum and a difference (the middle terms cancel), and one finds xy for given numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7alid-square",
      name: "Square of a sum and of a difference",
      intuition:
        "Squaring a + b is not just a² + b². The two parts also multiply each other twice, and that gives the middle term 2ab. With a minus sign, the middle term takes the minus.",
      definition:
        "- \\((a + b)^2 = a^2 + 2ab + b^2\\).\n" +
        "- \\((a - b)^2 = a^2 - 2ab + b^2\\).\n" +
        "- Adding them, the middle terms cancel: \\((a + b)^2 + (a - b)^2 = 2a^2 + 2b^2\\).\n" +
        "- Taking one from the other leaves only the middle terms: \\((a + b)^2 - (a - b)^2 = 4ab\\).\n" +
        "- When a is \\(6x\\), square the **whole term**: \\((6x)^2 = 36x^2\\).",
      formula: {
        label: "Squares of a sum and a difference",
        latex: "(a+b)^2 = a^2 + 2ab + b^2 \\qquad (a-b)^2 = a^2 - 2ab + b^2",
        symbols: [
          { symbol: "a", meaning: "the first term, which may be a number times a letter, like 3x" },
          { symbol: "b", meaning: "the second term" },
        ],
      },
      authoredExample: {
        prompt: "Expand \\((4x + 3y)^2\\).",
        steps: [
          "Here \\(a = 4x\\) and \\(b = 3y\\).",
          "\\(a^2 = 16x^2\\), \\(2ab = 2 \\times 4x \\times 3y = 24xy\\), \\(b^2 = 9y^2\\).",
        ],
        answer: "\\(16x^2 + 24xy + 9y^2\\)",
      },
      selfCheckExample: {
        prompt: "Expand \\((2a - 5)^2\\).",
        steps: ["\\((2a)^2 = 4a^2\\), \\(2 \\times 2a \\times 5 = 20a\\) with a minus sign, \\(5^2 = 25\\)."],
        answer: "\\(4a^2 - 20a + 25\\)",
      },
      practiceSet: [
        { prompt: "Expand \\((x + 6)^2\\).", answer: "\\(x^2 + 12x + 36\\)" },
        { prompt: "Simplify \\((a + b)^2 + (a - b)^2\\).", answer: "\\(2a^2 + 2b^2\\)" },
        { prompt: "Simplify \\((a + b)^2 - (a - b)^2\\).", answer: "\\(4ab\\)" },
        { prompt: "Use \\((a + b)^2\\) to find \\(101^2\\).", answer: "\\((100 + 1)^2 = 10000 + 200 + 1 = 10201\\)" },
      ],
      pyqExampleId: "855d8233-48cb-4b55-b1ae-2d4b0da0a0fa",
      traps: [
        {
          title: "Forgetting the middle term",
          body: "\\((a + b)^2\\) is not \\(a^2 + b^2\\). The middle term \\(2ab\\) is always there.",
        },
        {
          title: "Halving the middle term",
          body: "The middle term is twice the product. For \\((5a - 2b)^2\\) it is \\(2 \\times 10ab = 20ab\\), not \\(10ab\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7alid-value",
      name: "Value of an expression",
      intuition:
        "To find the value of an expression, put each number in place of its letter and work it out. Splitting a number into an easy part (like 30 − 3) makes the multiplying quicker.",
      definition:
        "- **Substitute**: write the number where the letter was, in brackets.\n" +
        "- \\(xy\\) means x **times** y; \\(2x^2\\) means 2 times x times x.\n" +
        "- Multiply smartly: \\(49 \\times 19 = 49 \\times 20 - 49\\).\n" +
        "- Work **powers first**, then multiply, then add and take away.",
      authoredExample: {
        prompt: "If \\(a = 25\\) and \\(b = 16\\), find \\(ab\\).",
        steps: [
          "\\(ab = 25 \\times 16\\).",
          "\\(25 \\times 16 = 25 \\times 4 \\times 4 = 100 \\times 4\\).",
        ],
        answer: "400",
      },
      selfCheckExample: {
        prompt: "If \\(x = 4\\) and \\(y = 3\\), find \\(x^2 + y^2\\).",
        steps: ["\\(16 + 9\\)."],
        answer: "25",
      },
      practiceSet: [
        { prompt: "If \\(p = 12\\) and \\(q = 15\\), find \\(pq\\).", answer: "180" },
        { prompt: "If \\(x = 5\\), find \\(2x^2 - 3x\\).", answer: "\\(50 - 15 = 35\\)" },
        { prompt: "If \\(a = 3\\) and \\(b = 2\\), find \\((a + b)^2\\).", answer: "25" },
        { prompt: "Find \\(49 \\times 21\\) by splitting 21 into 20 + 1.", answer: "\\(980 + 49 = 1029\\)" },
      ],
      pyqExampleId: "e9683eb2-de55-4f7a-9a8e-71fb98d3e7b3",
      traps: [
        {
          title: "Reading xy as a two-digit number",
          body: "xy means x times y. With x = 4 and y = 3 it is 12, not 43.",
        },
      ],
    },
  ],
};
