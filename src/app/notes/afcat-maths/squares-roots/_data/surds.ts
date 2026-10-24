import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SQ_SURDS_NOTE: SubtopicNote = {
  subtopicName: "Simplifying and Rationalising Surds",
  title: "Surds: Multiplying, Simplifying and Rationalising",
  oneLineDefinition:
    "Multiply and divide roots under one sign, take square and cube factors out of a root, square a two-term surd and undo it, and clear a root from a denominator.",
  whyItMatters:
    "About a third of this page is HARD, mostly rationalising and the longer surd expressions. The rules are few: roots of one kind multiply under one sign, like surds add, and a conjugate clears a denominator. Marks go on adding unlike surds and on multiplying only the bottom of a fraction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsq-surd-product",
      name: "Multiplying and dividing roots",
      intuition:
        "Roots of the same kind multiply and divide under one root sign. Choose the pairing so that what ends up under the sign is a perfect square or cube, and the root disappears.",
      definition:
        "- \\(\\sqrt a \\times \\sqrt b = \\sqrt{ab}\\) and \\(\\dfrac{\\sqrt a}{\\sqrt b} = \\sqrt{\\dfrac ab}\\): the **product rule** and the **quotient rule**.\n" +
        "- The same holds for cube roots: \\(\\sqrt[3]{9} \\times \\sqrt[3]{3} = \\sqrt[3]{27} = 3\\).\n" +
        "- Look for a perfect power under the sign: \\(\\sqrt 3 \\times \\sqrt{27} = \\sqrt{81} = 9\\).\n" +
        "- Only roots of the same kind combine like this: two square roots, or two cube roots.",
      formula: {
        label: "Product and quotient rules",
        latex: "\\sqrt[n]{a}\\,\\sqrt[n]{b} = \\sqrt[n]{ab}, \\quad \\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\dfrac ab}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{20} \\times \\sqrt 5\\) and \\(\\dfrac{\\sqrt[3]{81}}{\\sqrt[3]{3}}\\).",
        steps: [
          "\\(\\sqrt{20 \\times 5} = \\sqrt{100} = 10\\).",
          "\\(\\sqrt[3]{81 \\div 3} = \\sqrt[3]{27} = 3\\).",
        ],
        answer: "\\(10\\) and \\(3\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{\\sqrt{98}}{\\sqrt 2}\\).",
        steps: ["\\(\\sqrt{98 \\div 2} = \\sqrt{49}\\)."],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt 8 \\times \\sqrt{32}\\).", answer: "\\(16\\)" },
        { prompt: "Find \\(\\sqrt[3]{4} \\times \\sqrt[3]{16}\\).", answer: "\\(4\\)" },
        { prompt: "Find \\(\\dfrac{\\sqrt{75}}{\\sqrt 3}\\).", answer: "\\(5\\)" },
        { prompt: "Find \\(\\sqrt[3]{250} \\div \\sqrt[3]{2}\\).", answer: "\\(5\\)" },
      ],
      pyqExampleId: "0ee66100-52a4-4d01-911d-8ba45b13a300",
      traps: [
        {
          title: "Products combine, sums do not",
          body: "\\(\\sqrt 3 + \\sqrt{12}\\) is not \\(\\sqrt{15}\\). Only a product or a quotient goes under one root sign.",
        },
        {
          title: "One kind of root at a time",
          body: "\\(\\sqrt 5 \\times \\sqrt[3]{5}\\) is neither \\(\\sqrt{25}\\) nor \\(\\sqrt[3]{25}\\). A square root and a cube root combine only as fractional powers, which come on the last page.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-simplify-surd",
      name: "Simplest form of a surd, and like surds",
      intuition:
        "Take the largest square factor out of a square root, or the largest cube factor out of a cube root. Surds with the same root left over are like terms and add like \\(x\\)s.",
      definition:
        "- \\(\\sqrt{a^2 b} = a\\sqrt b\\): \\(\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt 5\\).\n" +
        "- \\(\\sqrt[3]{a^3 b} = a\\sqrt[3]{b}\\): \\(\\sqrt[3]{40} = \\sqrt[3]{8 \\times 5} = 2\\sqrt[3]{5}\\).\n" +
        "- Like surds add and subtract through their numbers in front: \\(4\\sqrt 5 - \\sqrt 5 = 3\\sqrt 5\\).\n" +
        "- Unlike surds, such as \\(\\sqrt 2\\) and \\(\\sqrt 3\\), do not combine.\n" +
        "- If the value of one root is given, write every term as a multiple of that root first.",
      formula: {
        label: "Taking out a square or cube factor",
        latex: "\\sqrt{a^2 b} = a\\sqrt b, \\quad \\sqrt[3]{a^3 b} = a\\sqrt[3]{b}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{98} + \\sqrt{18} - \\sqrt{72}\\).",
        steps: [
          "\\(\\sqrt{98} = 7\\sqrt 2\\), \\(\\sqrt{18} = 3\\sqrt 2\\), \\(\\sqrt{72} = 6\\sqrt 2\\).",
          "\\((7 + 3 - 6)\\sqrt 2\\).",
        ],
        answer: "\\(4\\sqrt 2\\).",
      },
      selfCheckExample: {
        prompt: "Given \\(\\sqrt 2 = 1.414\\), find \\(\\sqrt{50} + \\sqrt{32}\\).",
        steps: [
          "\\(\\sqrt{50} = 5\\sqrt 2\\) and \\(\\sqrt{32} = 4\\sqrt 2\\), so the sum is \\(9\\sqrt 2\\).",
          "\\(9 \\times 1.414 = 12.726\\).",
        ],
        answer: "\\(12.726\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sqrt{63}\\).", answer: "\\(3\\sqrt 7\\)" },
        { prompt: "Simplify \\(\\sqrt[3]{128}\\).", answer: "\\(4\\sqrt[3]{2}\\)" },
        { prompt: "Simplify \\(\\sqrt{20} + \\sqrt{45}\\).", answer: "\\(5\\sqrt 5\\)" },
        { prompt: "Simplify \\(\\sqrt[3]{81} - \\sqrt[3]{24}\\).", answer: "\\(\\sqrt[3]{3}\\)", method: "\\(3\\sqrt[3]{3} - 2\\sqrt[3]{3}\\)." },
      ],
      pyqExampleId: "a1b8b9de-fc8d-4ab8-ae63-80330eb568a8",
      traps: [
        {
          title: "Take out the largest square",
          body: "\\(\\sqrt{200} = 2\\sqrt{50}\\) is true but not finished. The largest square factor is 100, so \\(\\sqrt{200} = 10\\sqrt 2\\).",
        },
        {
          title: "Unlike surds stay apart",
          body: "\\(2\\sqrt 5 + 3\\sqrt 2\\) cannot be written as \\(5\\sqrt 7\\) or \\(5\\sqrt{10}\\). It is already as simple as it gets.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-surd-square",
      name: "Squaring a two-term surd, and its square root",
      intuition:
        "\\((\\sqrt a + \\sqrt b)^2 = a + b + 2\\sqrt{ab}\\). Read backwards, it finds the square root of a number like \\(x + 2\\sqrt y\\): look for two numbers that add to \\(x\\) and multiply to \\(y\\).",
      definition:
        "- \\((\\sqrt a \\pm \\sqrt b)^2 = a + b \\pm 2\\sqrt{ab}\\), the square identities from the first page.\n" +
        "- Backwards: \\(\\sqrt{x \\pm 2\\sqrt y} = \\sqrt a \\pm \\sqrt b\\), where \\(a + b = x\\), \\(ab = y\\) and \\(a\\) is the larger.\n" +
        "- If the middle term has no 2 in front, make one: \\(16 + \\sqrt{240} = 16 + 2\\sqrt{60}\\). Then \\(10 + 6 = 16\\) and \\(10 \\times 6 = 60\\), so the root is \\(\\sqrt{10} + \\sqrt 6\\).",
      formula: {
        label: "Square of a two-term surd",
        latex: "(\\sqrt a \\pm \\sqrt b)^2 = a + b \\pm 2\\sqrt{ab}",
      },
      authoredExample: {
        prompt: "Find \\((\\sqrt{10} - \\sqrt 3)^2\\).",
        steps: [
          "\\(a + b = 10 + 3 = 13\\).",
          "\\(2\\sqrt{ab} = 2\\sqrt{30}\\), with a minus sign.",
        ],
        answer: "\\(13 - 2\\sqrt{30}\\).",
      },
      selfCheckExample: {
        prompt: "Find a square root of \\(11 + 2\\sqrt{30}\\).",
        steps: ["Two numbers adding to 11 and multiplying to 30: 6 and 5."],
        answer: "\\(\\sqrt 6 + \\sqrt 5\\).",
      },
      practiceSet: [
        { prompt: "Find \\((\\sqrt 3 + 1)^2\\).", answer: "\\(4 + 2\\sqrt 3\\)" },
        { prompt: "Find a square root of \\(8 - 2\\sqrt{15}\\).", answer: "\\(\\sqrt 5 - \\sqrt 3\\)" },
        { prompt: "Find a square root of \\(6 + 2\\sqrt 5\\).", answer: "\\(\\sqrt 5 + 1\\)", method: "\\(5 + 1 = 6\\) and \\(5 \\times 1 = 5\\)." },
      ],
      pyqExampleId: "59392c8b-a970-43bb-b476-fa96669b39ec",
      traps: [
        {
          title: "Keep the cross term",
          body: "\\((\\sqrt{11} + \\sqrt 5)^2\\) is \\(16 + 2\\sqrt{55}\\), not 16. The cross term \\(2\\sqrt{ab}\\) is the part most often dropped.",
        },
        {
          title: "Larger first with a minus",
          body: "A square root of \\(13 - 2\\sqrt{40}\\) is \\(\\sqrt 8 - \\sqrt 5\\), that is \\(2\\sqrt 2 - \\sqrt 5\\). Writing \\(\\sqrt 5 - \\sqrt 8\\) gives a negative number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-rationalise",
      name: "Rationalising a denominator",
      intuition:
        "Rationalising removes the root from the bottom of a fraction. Multiply top and bottom by whatever makes the bottom a whole number: the same root for a single square root, the conjugate for \\(\\sqrt a \\pm \\sqrt b\\).",
      definition:
        "- \\(\\dfrac{1}{\\sqrt a} = \\dfrac{\\sqrt a}{a}\\).\n" +
        "- A cube root needs two more of the same factor: \\(\\dfrac{1}{\\sqrt[3]{3}} = \\dfrac{\\sqrt[3]{9}}{3}\\), because \\(\\sqrt[3]{3} \\times \\sqrt[3]{9} = 3\\).\n" +
        "- The **conjugate** of \\(\\sqrt a + \\sqrt b\\) is \\(\\sqrt a - \\sqrt b\\), and their product is \\(a - b\\). So \\(\\dfrac{1}{\\sqrt a + \\sqrt b} = \\dfrac{\\sqrt a - \\sqrt b}{a - b}\\).\n" +
        "- For two numbers one apart the bottom becomes 1: \\(\\dfrac{1}{\\sqrt{n + 1} - \\sqrt n} = \\sqrt{n + 1} + \\sqrt n\\). In a long sum of such terms, most of them cancel.",
      formula: {
        label: "Rationalising with the conjugate",
        latex: "\\dfrac{1}{\\sqrt a + \\sqrt b} = \\dfrac{\\sqrt a - \\sqrt b}{a - b}",
      },
      authoredExample: {
        prompt: "Rationalise \\(\\dfrac{4}{\\sqrt 7 - \\sqrt 3}\\).",
        steps: [
          "Multiply top and bottom by the conjugate \\(\\sqrt 7 + \\sqrt 3\\).",
          "The bottom becomes \\(7 - 3 = 4\\).",
          "\\(\\dfrac{4(\\sqrt 7 + \\sqrt 3)}{4} = \\sqrt 7 + \\sqrt 3\\).",
        ],
        answer: "\\(\\sqrt 7 + \\sqrt 3\\).",
      },
      selfCheckExample: {
        prompt: "Given \\(\\sqrt 6 = 2.449\\), find \\(\\dfrac{\\sqrt 3 + \\sqrt 2}{\\sqrt 3 - \\sqrt 2}\\).",
        steps: [
          "Multiply top and bottom by \\(\\sqrt 3 + \\sqrt 2\\). The bottom becomes \\(3 - 2 = 1\\).",
          "The top is \\((\\sqrt 3 + \\sqrt 2)^2 = 5 + 2\\sqrt 6\\).",
          "\\(5 + 2 \\times 2.449 = 9.898\\).",
        ],
        answer: "\\(9.898\\).",
      },
      practiceSet: [
        { prompt: "Rationalise \\(\\dfrac{6}{\\sqrt 3}\\).", answer: "\\(2\\sqrt 3\\)" },
        { prompt: "Rationalise \\(\\dfrac{1}{\\sqrt 5 + 2}\\).", answer: "\\(\\sqrt 5 - 2\\)", method: "The bottom becomes \\(5 - 4 = 1\\)." },
        { prompt: "Rationalise \\(\\dfrac{1}{\\sqrt[3]{5}}\\).", answer: "\\(\\dfrac{\\sqrt[3]{25}}{5}\\)" },
        {
          prompt: "Find \\(\\dfrac{1}{\\sqrt{11} - \\sqrt{10}} - \\dfrac{1}{\\sqrt{10} - 3}\\).",
          answer: "\\(\\sqrt{11} - 3\\)",
          method: "The terms are \\(\\sqrt{11} + \\sqrt{10}\\) and \\(\\sqrt{10} + 3\\).",
        },
      ],
      pyqExampleId: "c5defadf-d8a2-4c7a-bd34-beca166a31b3",
      traps: [
        {
          title: "Multiply the top too",
          body: "Multiplying only the bottom changes the value. \\(\\dfrac{1}{\\sqrt 6 - 2}\\) becomes \\(\\dfrac{\\sqrt 6 + 2}{2}\\) only when top and bottom are both multiplied by \\(\\sqrt 6 + 2\\).",
        },
        {
          title: "A cube root needs two more",
          body: "To clear \\(\\sqrt[3]{3}\\), multiply by \\(\\sqrt[3]{9}\\), not by \\(\\sqrt[3]{3}\\): \\(\\sqrt[3]{3} \\times \\sqrt[3]{3} = \\sqrt[3]{9}\\) is still a root.",
        },
      ],
    },
  ],
};
