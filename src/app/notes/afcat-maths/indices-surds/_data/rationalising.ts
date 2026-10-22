import type { SubtopicNote } from "@/app/notes/_types";

export const AF_IS_RATIONALISING_NOTE: SubtopicNote = {
  subtopicName: "Rationalising and Surd Identities",
  title: "Conjugates, Rationalising, and the Square Root of a Surd",
  oneLineDefinition:
    "Expand squares and conjugate products of surds, clear a surd from a denominator by multiplying by its conjugate, and find the square root of an expression like a + 2√b.",
  whyItMatters:
    "This is the hardest page of the chapter: most of its questions are HARD. They are denominators such as 3 − √2 that must be cleared, sums of two such fractions, and square roots of expressions such as 3 + 2√2. All of them rest on one identity, (a + b)(a − b) = a² − b², and the marks go on a lost middle term or a wrong sign in the conjugate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afis-conjugate-products",
      name: "Squares and conjugate products of surds",
      intuition:
        "\\(3 + \\sqrt 2\\) and \\(3 - \\sqrt 2\\) are **conjugates**: the same two terms with the sign between them changed. Their product loses the root completely, because the cross terms cancel. A square keeps its middle term, and that middle term is where the root lives.",
      definition:
        "- \\((a + b)(a - b) = a^2 - b^2\\): with surds, \\((\\sqrt p + \\sqrt q)(\\sqrt p - \\sqrt q) = p - q\\).\n" +
        "- \\((a + b)^2 = a^2 + 2ab + b^2\\) and \\((a - b)^2 = a^2 - 2ab + b^2\\).\n" +
        "- \\((\\sqrt p)^2 = p\\), so the squared terms come out rational and only \\(2ab\\) carries a root.\n" +
        "- The difference of the two squares, \\((a + b)^2 - (a - b)^2\\), is \\(4ab\\); their sum is \\(2(a^2 + b^2)\\).",
      formula: {
        label: "Conjugate product",
        latex: "(\\sqrt p + \\sqrt q)(\\sqrt p - \\sqrt q) = p - q",
      },
      authoredExample: {
        prompt: "Expand \\((3 + \\sqrt 2)^2\\) and \\((\\sqrt 7 + \\sqrt 2)(\\sqrt 7 - \\sqrt 2)\\).",
        steps: [
          "\\((3 + \\sqrt 2)^2 = 9 + 2 \\times 3 \\times \\sqrt 2 + 2 = 11 + 6\\sqrt 2\\).",
          "\\((\\sqrt 7 + \\sqrt 2)(\\sqrt 7 - \\sqrt 2) = 7 - 2 = 5\\).",
        ],
        answer: "\\(11 + 6\\sqrt 2\\) and \\(5\\).",
      },
      selfCheckExample: {
        prompt: "Expand \\((\\sqrt 6 - 1)^2\\).",
        steps: ["\\(6 - 2\\sqrt 6 + 1 = 7 - 2\\sqrt 6\\)."],
        answer: "\\(7 - 2\\sqrt 6\\).",
      },
      practiceSet: [
        { prompt: "Find \\((\\sqrt{11} + 3)(\\sqrt{11} - 3)\\).", answer: "\\(2\\)" },
        { prompt: "Expand \\((1 + \\sqrt 5)^2\\).", answer: "\\(6 + 2\\sqrt 5\\)" },
        { prompt: "Find \\((2\\sqrt 3 - \\sqrt 2)(2\\sqrt 3 + \\sqrt 2)\\).", answer: "\\(10\\)", method: "\\(12 - 2\\)." },
        { prompt: "Simplify \\((\\sqrt x + \\sqrt y)^2 + (\\sqrt x - \\sqrt y)^2\\).", answer: "\\(2(x + y)\\)" },
      ],
      pyqExampleId: "be3547cd-59d1-4695-a754-9f2df9ff0b9a",
      traps: [
        {
          title: "A square keeps its middle term",
          body: "\\((1 + \\sqrt 3)^2 = 1 + 2\\sqrt 3 + 3 = 4 + 2\\sqrt 3\\), not \\(1 + 3 = 4\\). Squaring each term alone drops the \\(2ab\\).",
        },
        {
          title: "A conjugate product has no root left",
          body: "\\((\\sqrt 5 + 1)(\\sqrt 5 - 1) = 5 - 1 = 4\\). If a root is still in your answer, a cross term was not cancelled.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-rationalise",
      name: "Rationalising a denominator",
      intuition:
        "To rationalise is to clear the root out of the bottom of a fraction. Multiplying top and bottom by the same thing does not change the value. Choose that thing so the bottom becomes rational: \\(\\sqrt a\\) for a single root, the conjugate for a sum or difference.",
      definition:
        "- \\(\\dfrac{k}{\\sqrt a} = \\dfrac{k\\sqrt a}{a}\\): multiply top and bottom by \\(\\sqrt a\\).\n" +
        "- \\(\\dfrac{k}{a + \\sqrt b} = \\dfrac{k(a - \\sqrt b)}{a^2 - b}\\), and \\(\\dfrac{k}{a - \\sqrt b} = \\dfrac{k(a + \\sqrt b)}{a^2 - b}\\).\n" +
        "- The conjugate changes only the sign between the terms: for \\(3 - \\sqrt 7\\) it is \\(3 + \\sqrt 7\\).\n" +
        "- A sum of two such fractions: rationalise each one, then add. Often the roots cancel.",
      formula: {
        label: "Multiply by the conjugate",
        latex: "\\dfrac{1}{a + \\sqrt b} = \\dfrac{a - \\sqrt b}{a^2 - b}",
      },
      authoredExample: {
        prompt: "Rationalise \\(\\dfrac{6}{\\sqrt 3}\\) and \\(\\dfrac{4}{\\sqrt 5 - 1}\\).",
        steps: [
          "\\(\\dfrac{6}{\\sqrt 3} \\times \\dfrac{\\sqrt 3}{\\sqrt 3} = \\dfrac{6\\sqrt 3}{3} = 2\\sqrt 3\\).",
          "\\(\\dfrac{4}{\\sqrt 5 - 1} \\times \\dfrac{\\sqrt 5 + 1}{\\sqrt 5 + 1} = \\dfrac{4(\\sqrt 5 + 1)}{5 - 1} = \\sqrt 5 + 1\\).",
        ],
        answer: "\\(2\\sqrt 3\\) and \\(\\sqrt 5 + 1\\).",
      },
      selfCheckExample: {
        prompt: "Rationalise \\(\\dfrac{\\sqrt 5}{\\sqrt 5 + 2}\\).",
        steps: [
          "Multiply top and bottom by \\(\\sqrt 5 - 2\\). The bottom is \\(5 - 4 = 1\\).",
          "The top is \\(\\sqrt 5(\\sqrt 5 - 2) = 5 - 2\\sqrt 5\\).",
        ],
        answer: "\\(5 - 2\\sqrt 5\\).",
      },
      practiceSet: [
        { prompt: "Rationalise \\(\\dfrac{10}{\\sqrt 5}\\).", answer: "\\(2\\sqrt 5\\)" },
        { prompt: "Rationalise \\(\\dfrac{1}{4 + \\sqrt{15}}\\).", answer: "\\(4 - \\sqrt{15}\\)" },
        { prompt: "Rationalise \\(\\dfrac{2}{\\sqrt 7 - \\sqrt 5}\\).", answer: "\\(\\sqrt 7 + \\sqrt 5\\)" },
        {
          prompt: "Find \\(\\dfrac{1}{\\sqrt 3 + \\sqrt 2} + \\dfrac{1}{\\sqrt 3 - \\sqrt 2}\\).",
          answer: "\\(2\\sqrt 3\\)",
          method: "Each bottom becomes \\(3 - 2 = 1\\).",
        },
      ],
      pyqExampleId: "1334aee3-ce74-45d5-9ba6-d70625b5da1c",
      traps: [
        {
          title: "Square the surd, not the number inside",
          body: "\\((4 + \\sqrt 3)(4 - \\sqrt 3) = 16 - 3 = 13\\), because \\((\\sqrt 3)^2 = 3\\). Writing \\(16 - 9\\) squares the 3 a second time.",
        },
        {
          title: "Multiply the top as well",
          body: "Multiplying only the bottom by the conjugate changes the value of the fraction. Top and bottom both take the same factor.",
        },
        {
          title: "Change only the middle sign",
          body: "The conjugate of \\(3 - \\sqrt 7\\) is \\(3 + \\sqrt 7\\). Changing the sign of the 3 instead gives \\((3 - \\sqrt 7)(-3 + \\sqrt 7) = -16 + 6\\sqrt 7\\), and the root stays in the bottom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-root-of-surd",
      name: "The square root of a + 2√b",
      intuition:
        "Since \\((\\sqrt m + \\sqrt n)^2 = m + n + 2\\sqrt{mn}\\), an expression \\(a + 2\\sqrt b\\) is a perfect square whenever two numbers add to \\(a\\) and multiply to \\(b\\). Find those two numbers and the square root is \\(\\sqrt m + \\sqrt n\\).",
      definition:
        "- First make the root term look like \\(2\\sqrt b\\): \\(6\\sqrt 2 = 2\\sqrt{18}\\), so \\(b = 18\\).\n" +
        "- Find \\(m\\) and \\(n\\) with \\(m + n = a\\) and \\(mn = b\\).\n" +
        "- \\(\\sqrt{a + 2\\sqrt b} = \\sqrt m + \\sqrt n\\).\n" +
        "- \\(\\sqrt{a - 2\\sqrt b} = \\sqrt m - \\sqrt n\\) with \\(m > n\\), so the answer is positive.\n" +
        "- A perfect square of letters works the same way, but a square root is never negative: \\(\\sqrt{x^2} = |x|\\).",
      formula: {
        label: "Square root of a surd expression",
        latex: "\\sqrt{a \\pm 2\\sqrt b} = \\sqrt m \\pm \\sqrt n \\quad (m + n = a,\\ mn = b,\\ m > n)",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{8 + 2\\sqrt{15}}\\).",
        steps: [
          "Two numbers adding to 8 and multiplying to 15: 5 and 3.",
          "So the root is \\(\\sqrt 5 + \\sqrt 3\\). Check: \\(5 + 3 + 2\\sqrt{15}\\).",
        ],
        answer: "\\(\\sqrt 5 + \\sqrt 3\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{9 - 4\\sqrt 5}\\).",
        steps: [
          "\\(4\\sqrt 5 = 2\\sqrt{20}\\), so look for two numbers adding to 9 and multiplying to 20: 5 and 4.",
          "With the minus sign, the larger root comes first: \\(\\sqrt 5 - \\sqrt 4 = \\sqrt 5 - 2\\).",
        ],
        answer: "\\(\\sqrt 5 - 2\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{4 + 2\\sqrt 3}\\).", answer: "\\(\\sqrt 3 + 1\\)" },
        { prompt: "Find \\(\\sqrt{11 + 2\\sqrt{30}}\\).", answer: "\\(\\sqrt 6 + \\sqrt 5\\)" },
        { prompt: "Find \\(\\sqrt{6 - 2\\sqrt 5}\\).", answer: "\\(\\sqrt 5 - 1\\)" },
        { prompt: "Simplify \\(\\sqrt{x^2 + 6x + 9}\\).", answer: "\\(|x + 3|\\)" },
      ],
      pyqExampleId: "b0e5cdb2-53ee-4a0e-9b92-585f68a2b99c",
      traps: [
        {
          title: "Make it 2√b before you look for the pair",
          body: "In \\(\\sqrt{11 + 6\\sqrt 2}\\), the pair does not multiply to 2. Write \\(6\\sqrt 2 = 2\\sqrt{18}\\): the pair is 9 and 2, and the root is \\(3 + \\sqrt 2\\).",
        },
        {
          title: "With a minus sign, the larger root goes first",
          body: "\\(\\sqrt{7 - 2\\sqrt{10}} = \\sqrt 5 - \\sqrt 2\\). The order \\(\\sqrt 2 - \\sqrt 5\\) is negative, and a square root never is.",
        },
        {
          title: "The root of a square is a modulus",
          body: "\\(\\sqrt{(x - 4)^2} = |x - 4|\\), not \\(x - 4\\). The two agree only when \\(x \\ge 4\\).",
        },
      ],
    },
  ],
};
