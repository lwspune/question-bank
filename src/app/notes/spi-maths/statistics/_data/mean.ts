import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ST_MEAN_NOTE: SubtopicNote = {
  subtopicName: "Mean of Raw Data",
  title: "Mean of Raw Data",
  oneLineDefinition:
    "The mean of a list of numbers is their sum divided by how many numbers there are, so the sum is always the mean times the count.",
  whyItMatters:
    "Thirteen questions in the bank, ten of them EASY. Most give the mean and ask for a missing value, some ask for the mean of a number pattern such as the first n odd numbers, and the rest ask what happens to the mean when every value is changed in the same way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spistme-mean",
      name: "Mean, sum and count",
      intuition:
        "The mean shares the total out equally. If five friends have a mean of 8 sweets each, they have 40 sweets between them, however unevenly they are split. Turn every mean into a sum first and the missing value falls out.",
      definition:
        "- \\(\\bar{x} = \\dfrac{\\text{sum of the values}}{\\text{number of values}}\\).\n" +
        "- **Sum \\(=\\) mean \\(\\times\\) number of values.** This is the step that finds a missing value.\n" +
        "- Count every value in the list, unknowns included: 3, x, 5 and y are four values.\n" +
        "- With two unknowns and one mean you can find only their sum, such as \\(x + y\\), not each one.",
      formula: {
        label: "Mean of n values",
        latex: "\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n} \\qquad \\sum x = n\\bar{x}",
        symbols: [
          { symbol: "\\(\\bar{x}\\)", meaning: "the mean" },
          { symbol: "\\(n\\)", meaning: "how many values there are" },
        ],
      },
      authoredExample: {
        prompt: "The mean of 4, 9, k, 11 and 6 is 8. Find k.",
        steps: [
          "There are 5 values, so their sum is \\(5 \\times 8 = 40\\).",
          "The known values add to \\(4 + 9 + 11 + 6 = 30\\).",
          "\\(k = 40 - 30 = 10\\).",
        ],
        answer: "\\(k = 10\\)",
      },
      selfCheckExample: {
        prompt: "The mean of five numbers is 12. Four of them are 10, 15, 9 and 14. Find the fifth number.",
        steps: [
          "Sum of all five: \\(5 \\times 12 = 60\\).",
          "Sum of the four: \\(10 + 15 + 9 + 14 = 48\\).",
          "Fifth number: \\(60 - 48 = 12\\).",
        ],
        answer: "12",
      },
      practiceSet: [
        { prompt: "Find the mean of 3, 8, 10 and 15.", answer: "\\(\\frac{36}{4} = 9\\)" },
        { prompt: "The mean of 7 numbers is 20. What is their sum?", answer: "140" },
        { prompt: "The mean of a, a + 2 and a + 4 is 9. Find a.", answer: "\\(3a + 6 = 27\\), so \\(a = 7\\)" },
        { prompt: "The mean of 3, 5, p and q is 6. What is p + q?", answer: "\\(24 - 8 = 16\\)" },
      ],
      pyqExampleId: "a3ac8828-8967-49b2-966a-f28522c6bce0",
      traps: [
        {
          title: "Dividing by the number of known values",
          body:
            "In a list like 5, x, 9, y, 11 there are five values, so the sum is 5 times the mean. Leaving the unknowns out of the count gives a wrong sum.",
        },
        {
          title: "Looking for x and y separately",
          body:
            "One mean gives one equation. With two unknowns it fixes only their sum, so the right option is the one that states \\(x + y\\), not a value of x alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistme-patterns",
      name: "Mean of a number pattern",
      intuition:
        "When the numbers go up by the same step each time, the mean is simply the middle of the list: the average of the first and last numbers. A few known sums settle the rest.",
      definition:
        "- Numbers that go up by a fixed step (an A.P.) have mean \\(= \\dfrac{\\text{first} + \\text{last}}{2}\\).\n" +
        "- First n natural numbers 1 to n: mean \\(\\dfrac{n + 1}{2}\\).\n" +
        "- First n odd numbers: sum \\(n^2\\), so mean \\(n\\).\n" +
        "- First n even numbers: sum \\(n(n + 1)\\), so mean \\(n + 1\\).\n" +
        "- **Whole numbers start at 0**, natural numbers at 1. The first five whole numbers are 0, 1, 2, 3, 4.\n" +
        "- Squares do not go up by a fixed step: add them one by one, or use \\(1^2 + 2^2 + \\dots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}\\).",
      formula: {
        label: "Means of common patterns",
        latex:
          "\\text{mean of } 1, 2, \\dots, n = \\frac{n + 1}{2} \\qquad \\text{mean of first } n \\text{ odd numbers} = n \\qquad \\text{mean of first } n \\text{ multiples of } k = \\frac{k(n + 1)}{2}",
      },
      authoredExample: {
        prompt: "Find the mean of the first 8 multiples of 5.",
        steps: [
          "The multiples are 5, 10, 15, ..., 40, going up by 5 each time.",
          "Mean \\(= \\frac{5 + 40}{2} = 22.5\\).",
          "Check with the formula: \\(\\frac{5 \\times 9}{2} = 22.5\\).",
        ],
        answer: "22.5",
      },
      selfCheckExample: {
        prompt: "Find the mean of the first 12 even natural numbers.",
        steps: ["The numbers are 2, 4, ..., 24.", "Mean \\(= \\frac{2 + 24}{2} = 13\\), which is \\(n + 1\\) for \\(n = 12\\)."],
        answer: "13",
      },
      practiceSet: [
        { prompt: "What is the mean of the first 9 natural numbers?", answer: "\\(\\frac{9 + 1}{2} = 5\\)" },
        { prompt: "What is the mean of the first 15 odd natural numbers?", answer: "15" },
        { prompt: "What is the mean of the first five whole numbers?", answer: "\\(\\frac{0 + 1 + 2 + 3 + 4}{5} = 2\\)" },
        { prompt: "What is the mean of the squares 1, 4, 9 and 16?", answer: "\\(\\frac{30}{4} = 7.5\\)" },
      ],
      pyqExampleId: "f9ea6325-5bc7-46d2-be6e-11846fdba0df",
      traps: [
        {
          title: "Starting whole numbers at 1",
          body:
            "The first six whole numbers are 0 to 5, not 1 to 6. Starting at 1 gives the answer for natural numbers, and that answer is usually printed as a wrong option.",
        },
        {
          title: "Taking the sum for the mean",
          body:
            "The first n odd numbers add to \\(n^2\\), but their mean is \\(n^2 \\div n = n\\). Divide by the count before you compare with the options.",
        },
        {
          title: "Using first plus last over two for squares",
          body:
            "The first and last trick works only when the numbers go up by a fixed step. The squares 1, 4, 9, 16 do not, so add them up instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spistme-change",
      name: "When every value changes the same way",
      intuition:
        "If everyone in a class gets 3 bonus marks, the class average goes up by exactly 3. If every mark is halved, the average is halved. The mean follows whatever you do to every value.",
      definition:
        "- Add c to every value: the mean goes up by c (not by \\(nc\\)).\n" +
        "- Subtract c from every value: the mean goes down by c.\n" +
        "- Multiply every value by k: the mean is multiplied by k. Divide by k: the mean is divided by k.\n" +
        "- Do the steps in the order given: divide by x then add y gives \\(\\frac{\\bar{x}}{x} + y\\).\n" +
        "- **Deviations from the mean add to zero:** \\(\\sum (x - \\bar{x}) = 0\\), for a frequency table too.\n" +
        "- Since \\(\\sum x = n\\bar{x}\\), the sum less the mean is \\(n\\bar{x} - \\bar{x} = (n - 1)\\bar{x}\\).",
      formula: {
        label: "Changing every value",
        latex: "\\text{new values } kx + c \\;\\Rightarrow\\; \\text{new mean} = k\\bar{x} + c \\qquad \\sum (x - \\bar{x}) = 0",
      },
      authoredExample: {
        prompt: "The mean of a set of numbers is 15. Each number is multiplied by 2 and then 5 is subtracted. Find the new mean.",
        steps: ["Multiplying by 2 doubles the mean: \\(30\\).", "Subtracting 5 from every number lowers the mean by 5: \\(30 - 5 = 25\\)."],
        answer: "25",
      },
      selfCheckExample: {
        prompt: "The mean of 10 numbers is 20. Each number is decreased by 4. Find the new mean.",
        steps: ["Every value drops by 4, so the mean drops by 4.", "\\(20 - 4 = 16\\)."],
        answer: "16",
      },
      practiceSet: [
        { prompt: "The mean of a set of values is 9. Each value is multiplied by 3. What is the new mean?", answer: "27" },
        { prompt: "The mean of 5, 7 and 9 is 7. What is the mean of 15, 17 and 19?", answer: "17 (every value is 10 more)" },
        { prompt: "The mean of 8 numbers is 6. What is the sum of their deviations from 6?", answer: "0" },
        { prompt: "The mean of 12 numbers is 5. What is the sum of the numbers minus their mean?", answer: "\\(60 - 5 = 55\\)" },
      ],
      pyqExampleId: "92630cc7-73c9-49d2-9b4d-415592a23bf0",
      traps: [
        {
          title: "Adding n times the change to the mean",
          body:
            "Adding 3 to each of n values adds \\(3n\\) to the total, but the count is also n, so the mean rises by 3. 'Increases by 3n' is a printed wrong option.",
        },
        {
          title: "Doing the steps in the wrong order",
          body:
            "If the mean is m, dividing every value by x and then adding y gives a new mean of \\(\\frac{m}{x} + y\\). Adding first and then dividing gives \\(\\frac{m + y}{x}\\), which is a different number.",
        },
      ],
    },
  ],
};
