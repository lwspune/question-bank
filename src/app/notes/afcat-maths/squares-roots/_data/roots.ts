import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SQ_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Square Roots",
  title: "Square Roots of Whole Numbers, Decimals and Fractions",
  oneLineDefinition:
    "Find the square root of a large perfect square by bracketing it, take roots of decimals and fractions, follow the rules for roots in an expression, and solve equations with a root.",
  whyItMatters:
    "Half the page is quick roots of perfect squares, and some come dressed as trees planted in rows or paise collected from members. Marks are lost on decimals, where the root has half as many decimal places, and on treating the root of a sum as the sum of the roots.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsq-root-large",
      name: "Square root of a large perfect square",
      intuition:
        "The root of a four or five digit perfect square has two or three digits. The front of the number fixes the tens, the last digit leaves two choices for the units, and one more square decides between them.",
      definition:
        "- Strike off the last two digits. The largest square at or below what is left gives the tens: for 5,329, 53 lies between \\(7^2 = 49\\) and \\(8^2 = 64\\), so the root is in the 70s.\n" +
        "- The last digit leaves two choices for the units digit (the table on the previous page, read backwards): a 9 comes from 3 or 7, so 73 or 77.\n" +
        "- Compare with the square of the middle: \\(75^2 = 5625\\) is above 5,329, so the root is the smaller choice, 73.\n" +
        "- 'As many rows as plants in a row' or 'as many paise from each member as there are members' means the total is \\(n^2\\). The answer is the square root of the total, in the right unit.",
      formula: {
        label: "Root by bracketing",
        latex: "(10a)^2 < N < (10a + 10)^2 \\;\\Rightarrow\\; 10a < \\sqrt N < 10a + 10",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{7056}\\).",
        steps: [
          "70 lies between \\(8^2 = 64\\) and \\(9^2 = 81\\), so the root is in the 80s.",
          "7,056 ends in 6, so the root ends in 4 or 6: 84 or 86.",
          "\\(85^2 = 7225\\) is above 7,056, so the root is 84. Check: \\(84^2 = 7056\\).",
        ],
        answer: "\\(84\\).",
      },
      selfCheckExample: {
        prompt:
          "A hall seats 2,209 people, with as many rows as there are seats in each row. How many seats are in each row?",
        steps: [
          "The total is a square, so find \\(\\sqrt{2209}\\).",
          "22 lies between 16 and 25, so the root is in the 40s; a last digit 9 gives 43 or 47.",
          "\\(45^2 = 2025\\) is below 2,209, so the root is 47.",
        ],
        answer: "\\(47\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{1521}\\).", answer: "\\(39\\)" },
        { prompt: "Find \\(\\sqrt{4489}\\).", answer: "\\(67\\)" },
        {
          prompt: "A class collects as many rupees from each student as there are students, ₹1,024 in all. How many students are there?",
          answer: "\\(32\\)",
        },
        { prompt: "Find \\(\\sqrt{15129}\\).", answer: "\\(123\\)", method: "151 lies between 144 and 169; \\(125^2 = 15625\\) is too big." },
      ],
      pyqExampleId: "ead7673b-a5d0-447f-87b9-bea1bb1cc74d",
      traps: [
        {
          title: "Two candidates for the units digit",
          body: "2,116 ends in 6, so its root ends in 4 or 6. \\(45^2 = 2025\\) is below it, so the root is 46, not 44.",
        },
        {
          title: "Convert rupees to paise",
          body: "₹20.25 collected as 'as many paise each as members' is 2,025 paise, so there are 45 members. Taking the root of 20.25 gives 4.5, which cannot be a count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-root-rules",
      name: "Square roots in an expression",
      intuition:
        "A square root undoes a square. It splits over a product or a quotient, but never over a sum. Find each root first, then do the arithmetic.",
      definition:
        "- \\(\\sqrt{ab} = \\sqrt a \\times \\sqrt b\\) and \\(\\sqrt{\\tfrac ab} = \\dfrac{\\sqrt a}{\\sqrt b}\\) for positive \\(a\\) and \\(b\\).\n" +
        "- \\(\\sqrt{a + b}\\) is **not** \\(\\sqrt a + \\sqrt b\\): \\(\\sqrt{36 + 64} = 10\\), but \\(6 + 8 = 14\\).\n" +
        "- \\((\\sqrt a)^2 = a\\). The root sign means the positive root, so \\(\\sqrt{x^2} = |x|\\): \\(\\sqrt{(-5)^2} = 5\\).\n" +
        "- Roots inside roots are worked from the inside out: \\(\\sqrt{\\sqrt{625}} = \\sqrt{25} = 5\\).",
      formula: {
        label: "Roots of products and quotients",
        latex: "\\sqrt{ab} = \\sqrt a\\,\\sqrt b, \\quad \\sqrt{\\tfrac ab} = \\dfrac{\\sqrt a}{\\sqrt b}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{40 + \\sqrt{70 + \\sqrt{121}}}\\).",
        steps: [
          "Innermost first: \\(\\sqrt{121} = 11\\).",
          "\\(\\sqrt{70 + 11} = \\sqrt{81} = 9\\).",
          "\\(\\sqrt{40 + 9} = \\sqrt{49} = 7\\).",
        ],
        answer: "\\(7\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{81} - \\sqrt{36} + \\sqrt{169}\\).",
        steps: ["\\(9 - 6 + 13\\)."],
        answer: "\\(16\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{25 \\times 81}\\).", answer: "\\(45\\)", method: "\\(5 \\times 9\\)." },
        { prompt: "Find \\(\\sqrt{\\sqrt{256}}\\).", answer: "\\(4\\)" },
        { prompt: "Is \\(\\sqrt{9 + 16}\\) equal to \\(\\sqrt 9 + \\sqrt{16}\\)?", answer: "No: 5 against 7" },
        { prompt: "If \\(x = 4\\), find \\(\\sqrt{5x + 5} + \\sqrt x\\).", answer: "\\(7\\)", method: "\\(\\sqrt{25} + 2\\)." },
      ],
      pyqExampleId: "781dfe7f-d846-437a-bc9e-1f95246257a9",
      traps: [
        {
          title: "No splitting over a sum",
          body: "\\(\\sqrt{25 + 144} = \\sqrt{169} = 13\\), not \\(5 + 12 = 17\\). Add first, then take the root.",
        },
        {
          title: "The root sign is positive",
          body: "\\(\\sqrt{49} = 7\\), never \\(-7\\), even though \\((-7)^2 = 49\\). So \\(\\sqrt{(a - b)^2} = |a - b|\\), which is \\(b - a\\) when \\(b\\) is the larger.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-root-decimals",
      name: "Square roots of decimals and fractions",
      intuition:
        "Count the decimal places. A decimal with a neat square root has an even number of them, and its root has half as many. A fraction's root is the root of the top over the root of the bottom.",
      definition:
        "- Write the decimal over 100, 10000, ...: \\(\\sqrt{0.49} = \\sqrt{\\tfrac{49}{100}} = \\tfrac{7}{10} = 0.7\\).\n" +
        "- Each pair of decimal places in the number gives one place in the root: \\(\\sqrt{0.0016} = 0.04\\).\n" +
        "- Moving the decimal point two places in the number moves it one place in the root: \\(\\sqrt{169} = 13\\), \\(\\sqrt{1.69} = 1.3\\), \\(\\sqrt{0.0169} = 0.13\\).\n" +
        "- \\(\\sqrt{\\tfrac{25}{36}} = \\tfrac{5}{6}\\). A root like this is a rational number.",
      formula: {
        label: "Root of a decimal",
        latex: "\\sqrt{\\dfrac{a}{10^{2k}}} = \\dfrac{\\sqrt a}{10^{k}}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{1.44} + \\sqrt{0.0144}\\).",
        steps: [
          "\\(\\sqrt{144} = 12\\).",
          "1.44 has two decimal places, so its root has one: 1.2.",
          "0.0144 has four, so its root has two: 0.12.",
          "\\(1.2 + 0.12 = 1.32\\).",
        ],
        answer: "\\(1.32\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{0.000625}\\).",
        steps: ["\\(\\sqrt{625} = 25\\).", "Six decimal places in the number make three in the root."],
        answer: "\\(0.025\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{0.0064}\\).", answer: "\\(0.08\\)" },
        { prompt: "Find \\(\\sqrt{12.25}\\).", answer: "\\(3.5\\)" },
        { prompt: "Find \\(\\sqrt{\\tfrac{49}{121}}\\).", answer: "\\(\\tfrac{7}{11}\\)" },
        { prompt: "Which number multiplied by itself gives 0.000169?", answer: "\\(0.013\\)" },
      ],
      pyqExampleId: "5c9c817d-c7a4-4776-a29f-e2d0b26d3dee",
      traps: [
        {
          title: "An odd number of decimal places",
          body: "\\(\\sqrt{0.9}\\) is not 0.3, because \\(0.3^2 = 0.09\\). With an odd number of places, write \\(0.9 = 0.90\\): its root is about 0.949.",
        },
        {
          title: "Halve the places, do not keep them",
          body: "\\(\\sqrt{0.000004} = 0.002\\): six places become three. Writing 0.000002 keeps all six.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-root-equations",
      name: "Equations with a square root",
      intuition:
        "To free \\(x\\) from under a root, get the root alone on one side and square both sides. The root undoes, and a plain equation is left.",
      definition:
        "- \\(\\sqrt x = k\\) means \\(x = k^2\\), and \\(k\\) must be 0 or positive.\n" +
        "- \\(\\sqrt{ax + b} = k\\): squaring gives \\(ax + b = k^2\\). Solve that.\n" +
        "- A fraction squares top and bottom: \\(\\sqrt{\\tfrac{x}{25}} = \\tfrac 35\\) gives \\(\\tfrac{x}{25} = \\tfrac{9}{25}\\), so \\(x = 9\\).\n" +
        "- If the root has a number in front or beside it, clear that first: \\(2\\sqrt x + 1 = 15\\) gives \\(\\sqrt x = 7\\).",
      formula: {
        label: "Clearing a root",
        latex: "\\sqrt{ax + b} = k \\;\\Rightarrow\\; ax + b = k^2",
      },
      authoredExample: {
        prompt: "Solve \\(\\sqrt{3x - 2} = 5\\).",
        steps: [
          "Square both sides: \\(3x - 2 = 25\\).",
          "\\(3x = 27\\), so \\(x = 9\\).",
          "Check: \\(\\sqrt{27 - 2} = \\sqrt{25} = 5\\).",
        ],
        answer: "\\(x = 9\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sqrt x = 1.2\\).",
        steps: ["Square both sides: \\(x = 1.2^2\\)."],
        answer: "\\(x = 1.44\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(\\sqrt x = 9\\).", answer: "\\(81\\)" },
        { prompt: "Solve \\(\\sqrt{x - 5} = 6\\).", answer: "\\(41\\)" },
        { prompt: "Solve \\(\\sqrt{5x} = 10\\).", answer: "\\(20\\)" },
      ],
      pyqExampleId: "3043a217-0e61-46e5-a45e-df456725d218",
      traps: [
        {
          title: "Square the whole side",
          body: "\\(\\sqrt{x + 7} = 6\\) gives \\(x + 7 = 36\\), so \\(x = 29\\). Squaring only the \\(x\\) inside gives a wrong equation.",
        },
        {
          title: "A root is never negative",
          body: "\\(\\sqrt x = -3\\) has no solution: \\(x = 9\\) gives \\(\\sqrt 9 = 3\\), not \\(-3\\).",
        },
      ],
    },
  ],
};
