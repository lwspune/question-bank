import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_OPERATIONS_NOTE: SubtopicNote = {
  subtopicName: "Operations on Decimals",
  title: "Adding, Subtracting, Multiplying and Dividing Decimals",
  oneLineDefinition:
    "Line up the points to add and subtract, count decimal places to multiply, and move the point in both numbers to divide.",
  whyItMatters:
    "Every question here is a single calculation, and one comes from AFCAT 2018. Nothing on the page is hard to understand; the marks go on a misplaced point, an answer ten times too big or too small, which the options are built to catch.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afdf-add-subtract",
      name: "Adding and subtracting decimals",
      intuition:
        "Tenths add to tenths and hundredths to hundredths, so the points must sit in one column. Pad with zeros so every number has the same number of places, then work as with whole numbers.",
      definition:
        "- Write the numbers with their points in one column, padding with zeros.\n" +
        "- A whole number has its point at the end: \\(9 = 9.00\\).\n" +
        "- Carry and borrow across the point exactly as across any other column.",
      formula: {
        label: "Line up the points",
        latex: "6.07 + 0.935 = 6.070 + 0.935",
      },
      authoredExample: {
        prompt: "Find \\(6.07 + 0.935\\) and \\(9 - 4.38\\).",
        steps: [
          "Pad: \\(6.070 + 0.935 = 7.005\\).",
          "Write 9 as \\(9.00\\): \\(9.00 - 4.38 = 4.62\\).",
        ],
        answer: "\\(7.005\\) and \\(4.62\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(12.4 - 7.86\\).",
        steps: ["Pad: \\(12.40 - 7.86\\).", "Borrow into the hundredths and the ones: \\(4.54\\)."],
        answer: "\\(4.54\\).",
      },
      practiceSet: [
        { prompt: "Find \\(0.45 + 0.385\\).", answer: "\\(0.835\\)" },
        { prompt: "Find \\(3 - 1.25\\).", answer: "\\(1.75\\)" },
        { prompt: "Find \\(4.6 + 2.75 + 0.05\\).", answer: "\\(7.4\\)" },
        { prompt: "Find \\(7.03 - 2.48\\).", answer: "\\(4.55\\)" },
      ],
      pyqExampleId: "76591801-e7ac-4a02-b82e-9172915519cf",
      traps: [
        {
          title: "Line up the points, not the last digits",
          body: "\\(2.5 + 0.25\\) is \\(2.50 + 0.25 = 2.75\\). Lining up the right-hand digits adds 25 to 25 and gives a wrong option.",
        },
        {
          title: "A whole number still has places",
          body: "\\(10 - 3.5\\) is \\(10.0 - 3.5 = 6.5\\). Treat the 10 as having a zero in the tenths.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-multiply",
      name: "Multiplying decimals",
      intuition:
        "\\(0.3 \\times 0.2\\) is three tenths of two tenths, which is six hundredths. Multiply as whole numbers, then give the answer as many places as the two numbers had together.",
      definition:
        "- Ignore the points and multiply the whole numbers.\n" +
        "- Count the decimal places in both numbers; the product has that many.\n" +
        "- Place the point first, then drop zeros at the end: \\(0.5 \\times 0.4\\) is \\(20\\) with two places, \\(0.20 = 0.2\\).\n" +
        "- Times 10, 100, 1000 moves the point 1, 2, 3 places right.",
      formula: {
        label: "Places in a product",
        latex: "\\text{places in } a \\times b = \\text{places in } a + \\text{places in } b",
      },
      authoredExample: {
        prompt: "Find \\(0.6 \\times 0.07\\) and \\(2.4 \\times 0.25\\).",
        steps: [
          "\\(6 \\times 7 = 42\\), with \\(1 + 2 = 3\\) places: \\(0.042\\).",
          "\\(24 \\times 25 = 600\\), with \\(1 + 2 = 3\\) places: \\(0.600 = 0.6\\).",
        ],
        answer: "\\(0.042\\) and \\(0.6\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(1.3 \\times 0.04\\).",
        steps: ["\\(13 \\times 4 = 52\\).", "\\(1 + 2 = 3\\) places."],
        answer: "\\(0.052\\).",
      },
      practiceSet: [
        { prompt: "Find \\(0.3 \\times 0.3\\).", answer: "\\(0.09\\)" },
        { prompt: "Find \\(0.04 \\times 5\\).", answer: "\\(0.2\\)" },
        { prompt: "Find \\(2.5 \\times 1.6\\).", answer: "\\(4\\)" },
        { prompt: "Find \\(0.8 \\times 0.5 \\times 10\\).", answer: "\\(4\\)" },
      ],
      pyqExampleId: "f8e851e1-6e02-4260-b86a-7bf884929bbb",
      traps: [
        {
          title: "Place the point before dropping zeros",
          body: "\\(0.5 \\times 0.4\\): \\(5 \\times 4 = 20\\) with two places is \\(0.20\\). Dropping the zero first and then counting two places gives \\(0.02\\), ten times too small.",
        },
        {
          title: "Multiplying by a decimal below 1 makes it smaller",
          body: "\\(8 \\times 0.25 = 2\\). If your product of a number and a decimal below 1 came out bigger than the number, the point is in the wrong place.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-divide",
      name: "Dividing decimals",
      intuition:
        "A division does not change when both numbers are multiplied by the same thing. So move the point in both until the divisor is a whole number, then divide as usual.",
      definition:
        "- Multiply both numbers by 10, 100 or 1000 so the **divisor** becomes whole: \\(0.144 \\div 0.12 = 14.4 \\div 12\\).\n" +
        "- Dividing by 10, 100, 1000 moves the point 1, 2, 3 places left.\n" +
        "- Dividing by a number below 1 gives a bigger answer: \\(7 \\div 0.25 = 28\\).\n" +
        "- A sum over a number: add first, then divide, or divide each term; the answer is the same.",
      formula: {
        label: "Clearing the divisor",
        latex: "\\dfrac ab = \\dfrac{a \\times 10^n}{b \\times 10^n}",
      },
      authoredExample: {
        prompt: "Find \\(0.144 \\div 0.12\\) and \\(7 \\div 0.25\\).",
        steps: [
          "Multiply both by 100: \\(14.4 \\div 12 = 1.2\\).",
          "Multiply both by 100: \\(700 \\div 25 = 28\\).",
        ],
        answer: "\\(1.2\\) and \\(28\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(0.56 \\div 0.008\\).",
        steps: ["Multiply both by 1000: \\(560 \\div 8\\)."],
        answer: "\\(70\\).",
      },
      practiceSet: [
        { prompt: "Find \\(3.6 \\div 0.4\\).", answer: "\\(9\\)" },
        { prompt: "Find \\(0.9 \\div 30\\).", answer: "\\(0.03\\)" },
        { prompt: "Find \\(1.25 \\div 0.5\\).", answer: "\\(2.5\\)" },
        { prompt: "Find \\((0.36 + 0.04) \\div 4\\).", answer: "\\(0.1\\)" },
      ],
      pyqExampleId: "e071aefe-da95-47ce-8d6d-9d8ab324ab7e",
      traps: [
        {
          title: "Move the point in both numbers",
          body: "\\(4.8 \\div 0.06\\) is \\(480 \\div 6 = 80\\). Moving the point in the divisor only, and dividing 4.8 by 6, gives \\(0.8\\).",
        },
        {
          title: "Count the zeros in a small answer",
          body: "\\(0.5 \\div 10 = 0.05\\), not \\(0.005\\): dividing by 10 moves the point one place, not two.",
        },
      ],
    },
  ],
};
