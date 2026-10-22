import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SI_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Laws of Indices",
  title: "Laws of Indices",
  oneLineDefinition:
    "Powers of the same base multiply by adding their indices, divide by subtracting them, and a power of a power multiplies them.",
  whyItMatters:
    "Nine questions in the bank, seven EASY and two MODERATE, and one is from the 2022 paper. Every one is settled by a few laws: add the indices to multiply, multiply them for a power of a power, and know what a zero or a negative index means.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisila-laws",
      name: "Multiplying, dividing and raising powers",
      intuition:
        "\\(a^m\\) is just \\(a\\) written down \\(m\\) times and multiplied. Put \\(m\\) of them next to \\(n\\) more and you have \\(m + n\\). Take a power of a power and you copy the whole block again and again, so the indices multiply.",
      definition:
        "- \\(a^m \\times a^n = a^{m + n}\\): same base, **add** the indices.\n" +
        "- \\(a^m \\div a^n = a^{m - n}\\): same base, **subtract** the indices.\n" +
        "- \\((a^m)^n = a^{mn}\\): a power of a power, **multiply** the indices.\n" +
        "- \\((ab)^n = a^n b^n\\) and \\(\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}\\): the same index on different bases.\n" +
        "- The first three laws need the **same base**. \\(2^3 \\times 3^2\\) cannot be joined into one power.",
      formula: {
        label: "Laws of indices",
        latex:
          "a^m \\times a^n = a^{m+n} \\qquad a^m \\div a^n = a^{m-n} \\qquad (a^m)^n = a^{mn} \\qquad (ab)^n = a^n b^n",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{2^7 \\times 2^3}{(2^2)^4}\\).",
        steps: [
          "Top: \\(2^7 \\times 2^3 = 2^{10}\\).",
          "Bottom: \\((2^2)^4 = 2^8\\).",
          "\\(2^{10} \\div 2^8 = 2^2 = 4\\).",
        ],
        answer: "4",
      },
      selfCheckExample: {
        prompt: "Find x if \\(7^{2x} \\div 7^3 = 7^5\\).",
        steps: ["Subtract the indices: \\(2x - 3 = 5\\).", "\\(2x = 8\\), so \\(x = 4\\)."],
        answer: "\\(x = 4\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\((5^2)^3\\).", answer: "\\(5^6 = 15625\\)" },
        { prompt: "Simplify \\(x^8 \\div x^3\\).", answer: "\\(x^5\\)" },
        { prompt: "Simplify \\((x^2)^3 \\times x^4\\).", answer: "\\(x^{10}\\)" },
        { prompt: "Find \\(2^3 \\times 5^3\\) without working out each power.", answer: "\\((2 \\times 5)^3 = 1000\\)" },
      ],
      pyqExampleId: "756d81e5-ab51-4f9f-af69-e2972a796c25",
      traps: [
        {
          title: "Adding indices for a power of a power",
          body: "\\((a^2)^3\\) is \\(a^6\\), not \\(a^5\\). Add the indices only when two powers of the same base are multiplied.",
        },
        {
          title: "Joining different bases",
          body: "\\(2^3 \\times 3^2 = 8 \\times 9 = 72\\), not \\(6^5\\). The laws that add or subtract indices work only for one base.",
        },
        {
          title: "Spreading a power over a sum",
          body: "\\((a + b)^2\\) is not \\(a^2 + b^2\\): \\((2 + 3)^2 = 25\\), but \\(4 + 9 = 13\\). A power spreads over a product, never over a sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisila-zero",
      name: "Zero and negative indices",
      intuition:
        "Each step down in the index divides by the base once: \\(2^3 = 8\\), \\(2^2 = 4\\), \\(2^1 = 2\\), so \\(2^0 = 1\\) and \\(2^{-1} = \\frac{1}{2}\\). A negative index means 'one over', not 'minus'.",
      definition:
        "- \\(a^0 = 1\\) for any non-zero \\(a\\).\n" +
        "- \\(a^{-n} = \\frac{1}{a^n}\\), and \\(\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n\\): turn the fraction over and make the index positive.\n" +
        "- A negative base to an **even** power is positive; to an **odd** power it is negative: \\((-2)^4 = 16\\), \\((-2)^3 = -8\\).\n" +
        "- Brackets matter: \\(-2^4 = -16\\), because only the 2 is raised to the power.",
      formula: {
        label: "Zero and negative indices",
        latex: "a^0 = 1 \\ (a \\ne 0) \\qquad a^{-n} = \\frac{1}{a^n} \\qquad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^{n}",
      },
      authoredExample: {
        prompt: "Find the value of \\(\\left(\\dfrac{2}{5}\\right)^{-2} + 7^0\\).",
        steps: [
          "Turn the fraction over: \\(\\left(\\frac{2}{5}\\right)^{-2} = \\left(\\frac{5}{2}\\right)^2 = \\frac{25}{4}\\).",
          "\\(7^0 = 1\\).",
          "\\(\\frac{25}{4} + 1 = \\frac{29}{4}\\).",
        ],
        answer: "\\(\\frac{29}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\((-3)^3 \\times 3^{-2}\\).",
        steps: ["\\((-3)^3 = -27\\) (odd power of a negative).", "\\(3^{-2} = \\frac{1}{9}\\).", "\\(-27 \\times \\frac{1}{9} = -3\\)."],
        answer: "\\(-3\\)",
      },
      practiceSet: [
        { prompt: "Find \\(10^{-3}\\).", answer: "\\(\\frac{1}{1000} = 0.001\\)" },
        { prompt: "Find \\(\\left(\\frac{1}{3}\\right)^{-2}\\).", answer: "9" },
        { prompt: "Find \\(\\left(-\\frac{1}{2}\\right)^3\\).", answer: "\\(-\\frac{1}{8}\\)" },
        { prompt: "Find \\(125^0\\).", answer: "1" },
        { prompt: "Find \\((-2)^4\\).", answer: "16" },
      ],
      pyqExampleId: "598dae13-f78a-4a58-8515-7155ca46ed69",
      traps: [
        {
          title: "Reading a zero index as 0",
          body: "\\(a^0\\) is 1, not 0, for every non-zero a. Only \\(0^0\\) is left undefined.",
        },
        {
          title: "Reading a negative index as a negative number",
          body: "\\(2^{-3} = \\frac{1}{8}\\), not \\(-8\\). The minus sign in the index turns the number into its reciprocal.",
        },
        {
          title: "Losing the sign of a negative base",
          body: "\\(\\left(-\\frac{3}{4}\\right)^2 = \\frac{9}{16}\\) is positive, but \\(\\left(-\\frac{3}{4}\\right)^3 = -\\frac{27}{64}\\) is negative. Check whether the power is even or odd.",
        },
      ],
    },
  ],
};
