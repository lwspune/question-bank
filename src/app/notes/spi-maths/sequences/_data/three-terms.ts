import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SQ_THREE_TERMS_NOTE: SubtopicNote = {
  subtopicName: "Three Terms in an AP",
  title: "Three Terms in an AP",
  oneLineDefinition:
    "If a, b, c are in AP, the middle term is the average of the other two (2b = a + c), and three unknown terms are best written as a − d, a, a + d.",
  whyItMatters:
    "Five questions in the bank, 4 EASY and 1 MODERATE. Each turns on one of two facts: twice the middle term equals the sum of the other two, and the sum of three terms centred on the middle one is three times the middle term.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisqtt-middle",
      name: "The middle term is the average of its neighbours",
      intuition:
        "If a, b, c are in AP, the step from a to b equals the step from b to c. So b sits exactly halfway between them, and twice b is a plus c. Use this whenever three terms are written with an unknown in them.",
      definition:
        "- \\(a, b, c\\) are in AP exactly when \\(b - a = c - b\\), that is \\(2b = a + c\\).\n" +
        "- \\(b = \\dfrac{a + c}{2}\\) is called the **arithmetic mean** of \\(a\\) and \\(c\\).\n" +
        "- With an unknown in the terms, write \\(2 \\times \\text{middle} = \\text{first} + \\text{third}\\) and solve. Then check that the gaps are equal.",
      formula: {
        label: "Three terms in AP",
        latex: "2b = a + c \\qquad b = \\frac{a + c}{2}",
      },
      authoredExample: {
        prompt: "Find \\(x\\) if \\(x + 1\\), \\(2x + 1\\) and \\(4x - 3\\) are in AP.",
        steps: [
          "\\(2(2x + 1) = (x + 1) + (4x - 3)\\).",
          "\\(4x + 2 = 5x - 2\\), so \\(x = 4\\).",
          "Check: the terms are 5, 9, 13, with gaps 4 and 4.",
        ],
        answer: "\\(x = 4\\)",
      },
      selfCheckExample: {
        prompt: "Find the arithmetic mean of 14 and 36.",
        steps: ["\\(\\frac{14 + 36}{2} = \\frac{50}{2} = 25\\)."],
        answer: "25",
      },
      practiceSet: [
        { prompt: "If 7, \\(k\\), 19 are in AP, find \\(k\\).", answer: "13" },
        {
          prompt: "Find \\(y\\) if \\(y\\), \\(2y + 1\\) and \\(4y - 5\\) are in AP.",
          answer: "\\(y = 7\\) (the terms are 7, 15, 23)",
        },
        {
          prompt: "If \\(p\\), \\(q\\), \\(r\\) are in AP, which is true: \\(p + r = q\\) or \\(p + r = 2q\\)?",
          answer: "\\(p + r = 2q\\)",
        },
      ],
      pyqExampleId: "73bec4b6-beec-4843-b173-011dd556138f",
      traps: [
        {
          title: "Writing the middle term as the sum",
          body:
            "The middle term is the average of its neighbours, not their sum. For 4, 10, 16: \\(2 \\times 10 = 4 + 16\\), while \\(4 + 16 = 20\\) is not 10.",
        },
        {
          title: "Skipping the check",
          body:
            "After solving for the unknown, put it back into all three terms. If the gaps are not equal, an algebra slip has crept in.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqtt-symmetric",
      name: "Three unknown terms written around the middle one",
      intuition:
        "When a question gives the sum of three AP terms, call them a minus d, a and a plus d. The two d's cancel in the sum, so the sum alone gives the middle term.",
      definition:
        "- Write three terms in AP as \\(a - d, a, a + d\\). Their sum is \\(3a\\).\n" +
        "- So the middle term is the sum divided by 3, whatever \\(d\\) is.\n" +
        "- A product condition then gives \\(d\\), using \\((a - d)(a + d) = a^2 - d^2\\).\n" +
        "- Choose the sign of \\(d\\) from the wording: an **increasing** AP has \\(d > 0\\), a **decreasing** one \\(d < 0\\).",
      formula: {
        label: "Three terms centred on the middle one",
        latex: "(a - d) + a + (a + d) = 3a \\qquad (a - d)(a + d) = a^2 - d^2",
      },
      authoredExample: {
        prompt:
          "Three terms of an increasing AP add up to 27, and the product of the first and the third is 77. Find the three terms.",
        steps: [
          "Call them \\(a - d, a, a + d\\). Then \\(3a = 27\\), so \\(a = 9\\).",
          "\\((9 - d)(9 + d) = 77\\), so \\(81 - d^2 = 77\\) and \\(d^2 = 4\\).",
          "Increasing, so \\(d = 2\\). Check: \\(7 \\times 11 = 77\\).",
        ],
        answer: "7, 9, 11",
      },
      selfCheckExample: {
        prompt: "Three numbers in AP have a sum of 45. Find the middle number.",
        steps: ["\\(3a = 45\\), so \\(a = 15\\)."],
        answer: "15",
      },
      practiceSet: [
        { prompt: "Three terms of an AP add up to 63. What is the middle term?", answer: "21" },
        {
          prompt: "Three terms of an increasing AP have a sum of 15 and a product of 105. Find them.",
          answer: "3, 5, 7",
        },
        {
          prompt:
            "Three terms of a decreasing AP have a sum of 24, and the product of the first and the third is 39. Find the first term.",
          answer: "13 (the terms are 13, 8, 3)",
        },
      ],
      pyqExampleId: "d2d8d93e-6628-4cbd-a3aa-7cc1161332b2",
      traps: [
        {
          title: "Calling the terms a, a + d, a + 2d",
          body:
            "That also works, but the sum becomes \\(3a + 3d\\) and leaves two unknowns. Centre the terms on the middle one and the sum gives it at once.",
        },
        {
          title: "Choosing the wrong sign for d",
          body:
            "\\(d^2 = 9\\) gives \\(d = 3\\) or \\(d = -3\\). The two signs list the same numbers in opposite orders, so the first and third terms swap. Read 'increasing' or 'decreasing' before you answer.",
        },
      ],
    },
  ],
};
