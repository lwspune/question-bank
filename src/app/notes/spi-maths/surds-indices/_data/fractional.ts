import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SI_FRACTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Fractional Indices and Exponential Equations",
  title: "Fractional Indices and Exponential Equations",
  oneLineDefinition:
    "A fractional index is a root followed by a power, and an equation in powers is solved by writing both sides as powers of one base and matching the indices.",
  whyItMatters:
    "Eleven questions in the bank: three EASY, seven MODERATE and the chapter's one HARD question. Seven ask for the value of a fractional or negative power, and four ask you to solve an equation by writing both sides as powers of the same base.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisifr-roots",
      name: "Fractional indices as roots",
      intuition:
        "Squaring and taking a square root undo each other, so \\(a^{\\frac{1}{2}}\\) must be \\(\\sqrt{a}\\). In \\(a^{\\frac{p}{q}}\\) the bottom number is the root and the top number is the power. Write the base as a power first and the arithmetic stays small.",
      definition:
        "- \\(a^{\\frac{1}{n}} = \\sqrt[n]{a}\\), the \\(n\\)th root of \\(a\\).\n" +
        "- \\(a^{\\frac{p}{q}} = \\left(\\sqrt[q]{a}\\right)^p\\): take the \\(q\\)th root, then raise to the power \\(p\\).\n" +
        "- First write the base as a power: \\(81 = 3^4\\), \\(\\frac{243}{32} = \\left(\\frac{3}{2}\\right)^5\\), \\(0.008 = (0.2)^3\\). Then multiply the indices.\n" +
        "- A negative fractional index: turn the base over as well, \\(\\left(\\frac{4}{9}\\right)^{-\\frac{1}{2}} = \\left(\\frac{9}{4}\\right)^{\\frac{1}{2}} = \\frac{3}{2}\\).\n" +
        "- An odd root of a negative number is negative: \\(\\sqrt[3]{-8} = -2\\).",
      formula: {
        label: "Fractional index",
        latex: "a^{\\frac{1}{n}} = \\sqrt[n]{a} \\qquad a^{\\frac{p}{q}} = \\left(\\sqrt[q]{a}\\right)^{p}",
      },
      authoredExample: {
        prompt: "Find \\(81^{\\frac{3}{4}}\\).",
        steps: [
          "\\(81 = 3^4\\).",
          "\\((3^4)^{\\frac{3}{4}} = 3^{4 \\times \\frac{3}{4}} = 3^3\\).",
          "\\(3^3 = 27\\).",
        ],
        answer: "27",
      },
      selfCheckExample: {
        prompt: "Find \\((0.008)^{-\\frac{2}{3}}\\).",
        steps: [
          "\\(0.008 = (0.2)^3\\), so \\((0.008)^{-\\frac{2}{3}} = (0.2)^{-2}\\).",
          "\\((0.2)^{-2} = \\frac{1}{0.04} = 25\\).",
        ],
        answer: "25",
      },
      practiceSet: [
        { prompt: "Find \\(64^{\\frac{1}{6}}\\).", answer: "2" },
        { prompt: "Find \\(125^{\\frac{2}{3}}\\).", answer: "25" },
        { prompt: "Find \\(16^{-\\frac{3}{4}}\\).", answer: "\\(\\frac{1}{8}\\)" },
        { prompt: "Find \\(\\left(\\frac{8}{27}\\right)^{\\frac{2}{3}}\\).", answer: "\\(\\frac{4}{9}\\)" },
        { prompt: "Find \\((-8)^{\\frac{1}{3}}\\).", answer: "\\(-2\\)" },
      ],
      pyqExampleId: "d23c6341-dab1-47d5-89a4-f35eb3c2afd9",
      traps: [
        {
          title: "Swapping the root and the power",
          body: "In \\(8^{\\frac{2}{3}}\\) the 3 is the root and the 2 the power: \\((\\sqrt[3]{8})^2 = 4\\). Reading it as \\(8^{\\frac{3}{2}}\\) gives about 22.6.",
        },
        {
          title: "Forgetting to turn a fraction over",
          body: "\\(\\left(\\frac{9}{16}\\right)^{-\\frac{1}{2}}\\) is \\(\\frac{4}{3}\\), not \\(\\frac{3}{4}\\). A negative index flips the fraction before the root is taken.",
        },
        {
          title: "Miscounting the decimal places",
          body: "\\(0.0016 = (0.2)^4\\) because \\(2^4 = 16\\) and four places of 0.1 give four decimal places. Count places before writing a decimal as a power.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisifr-equations",
      name: "Solving equations in powers",
      intuition:
        "If two powers of the same base are equal, their indices must be equal too. So the whole job is to rewrite each side as a power of one base: then the unknown comes out of a plain equation.",
      definition:
        "- If \\(a^x = a^y\\) with \\(a > 0\\) and \\(a \\ne 1\\), then \\(x = y\\).\n" +
        "- Rewrite both sides with one base: \\(9 = 3^2\\), \\(27 = 3^3\\), \\(\\frac{1}{4} = 2^{-2}\\).\n" +
        "- When powers are added or subtracted, take out the **smaller** power as a common factor: \\(2^{x+3} - 2^{x+1} = 2^{x+1}(2^2 - 1)\\).\n" +
        "- When several letters are linked, write each one as a power of the same letter, then compare indices.",
      formula: {
        label: "Equal powers of one base",
        latex: "a^x = a^y \\Rightarrow x = y \\quad (a > 0,\\ a \\ne 1)",
      },
      authoredExample: {
        prompt: "Solve \\(2^{x+3} - 2^{x+1} = 48\\).",
        steps: [
          "Take out the smaller power: \\(2^{x+1}(2^2 - 1) = 48\\), so \\(3 \\times 2^{x+1} = 48\\).",
          "\\(2^{x+1} = 16 = 2^4\\).",
          "\\(x + 1 = 4\\), so \\(x = 3\\). Check: \\(2^6 - 2^4 = 64 - 16 = 48\\).",
        ],
        answer: "\\(x = 3\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(9^x = 27^{x - 1}\\).",
        steps: [
          "Base 3: \\(3^{2x} = 3^{3x - 3}\\).",
          "\\(2x = 3x - 3\\), so \\(x = 3\\). Check: \\(9^3 = 729 = 27^2\\).",
        ],
        answer: "\\(x = 3\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(2^x = 32\\).", answer: "\\(x = 5\\)" },
        { prompt: "Solve \\(4^x = 8\\).", answer: "\\(x = \\frac{3}{2}\\) (since \\(2^{2x} = 2^3\\))" },
        { prompt: "Solve \\(5^{x - 2} = 1\\).", answer: "\\(x = 2\\) (since \\(1 = 5^0\\))" },
        { prompt: "Solve \\(3^x + 3^x + 3^x = 81\\).", answer: "\\(x = 3\\) (since \\(3 \\times 3^x = 3^{x+1} = 3^4\\))" },
      ],
      pyqExampleId: "9c22d47d-02d8-46c6-80ce-aa0da1d76727",
      traps: [
        {
          title: "Matching indices on different bases",
          body: "From \\(4^x = 8\\) you cannot say \\(x = 2\\). Make the bases equal first, \\(2^{2x} = 2^3\\), and only then match the indices.",
        },
        {
          title: "Treating a difference of powers as one power",
          body: "\\(3^{x+2} - 3^x\\) is not \\(3^2\\). Take out \\(3^x\\): it equals \\(3^x(9 - 1) = 8 \\times 3^x\\).",
        },
        {
          title: "Missing the answer x = 1",
          body: "Matching indices needs a base that is not 1. In \\(x^{2x} = x^6\\) the indices give \\(x = 3\\), but \\(x = 1\\) also works, because 1 to any power is 1. Check which values the question allows.",
        },
      ],
    },
  ],
};
