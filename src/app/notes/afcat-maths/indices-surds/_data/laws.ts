import type { SubtopicNote } from "@/app/notes/_types";

export const AF_IS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Laws of Exponents",
  title: "The Laws of Exponents",
  oneLineDefinition:
    "Multiply powers of one base by adding the indices, divide by subtracting, raise a power by multiplying, and read zero and negative powers correctly.",
  whyItMatters:
    "Every later page leans on these few rules, so this page asks them directly: a product or quotient of powers, a zero or negative index, and a fraction of letters raised to a power. Most of it is EASY; the marks go on a sign slip, adding indices where they should be multiplied, or reading a negative power as a negative number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afis-same-base",
      name: "Product, quotient and power of a power",
      intuition:
        "\\(a^m\\) is \\(a\\) multiplied by itself \\(m\\) times. Multiplying \\(a^m\\) by \\(a^n\\) just strings the factors together, so the indices add. Dividing cancels factors, so they subtract. Raising to a power repeats the whole block, so they multiply.",
      definition:
        "- **Product:** \\(a^m \\times a^n = a^{m+n}\\).\n" +
        "- **Quotient:** \\(a^m \\div a^n = a^{m-n}\\).\n" +
        "- **Power of a power:** \\((a^m)^n = a^{mn}\\).\n" +
        "- **Power of a product or quotient:** \\((ab)^n = a^n b^n\\) and \\(\\left(\\dfrac ab\\right)^n = \\dfrac{a^n}{b^n}\\).\n" +
        "- The first three need the **same base**. With two bases, sort the powers base by base and work on each one.",
      formula: {
        label: "The three index laws",
        latex: "a^m a^n = a^{m+n}, \\quad \\dfrac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{5^6 \\times 7^3}{5^4 \\times 7^2}\\).",
        steps: [
          "Take each base on its own: \\(\\dfrac{5^6}{5^4} = 5^{2}\\) and \\(\\dfrac{7^3}{7^2} = 7^{1}\\).",
          "Multiply the results: \\(25 \\times 7 = 175\\).",
        ],
        answer: "\\(175\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\((10^2)^3 \\div 10^4\\).",
        steps: [
          "\\((10^2)^3 = 10^{6}\\): a power of a power multiplies.",
          "\\(10^6 \\div 10^4 = 10^{2}\\).",
        ],
        answer: "\\(10^2 = 100\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(7^4 \\times 7^5 \\div 7^6\\).", answer: "\\(7^3 = 343\\)" },
        { prompt: "Find \\((6 \\times 5)^2\\).", answer: "\\(900\\)", method: "\\(6^2 \\times 5^2 = 36 \\times 25\\)." },
        { prompt: "Find \\(\\left(\\dfrac 45\\right)^3\\).", answer: "\\(\\dfrac{64}{125}\\)" },
        { prompt: "Simplify \\(\\dfrac{a^9}{a^4}\\).", answer: "\\(a^5\\)" },
      ],
      pyqExampleId: "aefa6187-5a95-4f84-90ea-e47cb52df347",
      traps: [
        {
          title: "Add indices only on the same base",
          body: "\\(4^3 \\times 5^3\\) is \\((4 \\times 5)^3 = 20^3\\), not \\(20^6\\). Indices add when the base is the same; when only the index is the same, the bases multiply and the index stays.",
        },
        {
          title: "A power of a power multiplies",
          body: "\\((7^2)^3 = 7^6\\), but \\(7^2 \\times 7^3 = 7^5\\). Brackets mean multiply the indices; a product means add them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-zero-negative",
      name: "Zero and negative indices",
      intuition:
        "Keep dividing by the base and watch the pattern: \\(3^2 = 9\\), \\(3^1 = 3\\), \\(3^0 = 1\\), \\(3^{-1} = \\tfrac 13\\). A zero index is 1, and a negative index is the reciprocal. Nothing turns negative.",
      definition:
        "- \\(a^0 = 1\\) for any \\(a \\ne 0\\).\n" +
        "- \\(a^{-n} = \\dfrac{1}{a^n}\\), and \\(\\dfrac{1}{a^{-n}} = a^n\\).\n" +
        "- A fraction to a negative power flips: \\(\\left(\\dfrac ab\\right)^{-n} = \\left(\\dfrac ba\\right)^{n}\\).\n" +
        "- A decimal base is a fraction first: \\(0.2 = \\tfrac 15\\), so \\((0.2)^{-1} = 5\\).\n" +
        "- The product and quotient laws still hold: \\(x^6 \\times x^{-9} = x^{-3}\\).",
      formula: {
        label: "Negative index",
        latex: "a^{-n} = \\dfrac{1}{a^n}, \\qquad \\left(\\dfrac ab\\right)^{-n} = \\left(\\dfrac ba\\right)^{n}",
      },
      authoredExample: {
        prompt: "Find \\(\\left(\\dfrac 25\\right)^{-3}\\).",
        steps: [
          "Flip the fraction and make the index positive: \\(\\left(\\dfrac 52\\right)^{3}\\).",
          "\\(\\dfrac{5^3}{2^3} = \\dfrac{125}{8}\\).",
        ],
        answer: "\\(\\dfrac{125}{8}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\((0.2)^{-3}\\).",
        steps: ["\\(0.2 = \\tfrac 15\\), so \\((0.2)^{-3} = 5^3\\)."],
        answer: "\\(125\\).",
      },
      practiceSet: [
        { prompt: "Find \\(6^0 + 6^{-1}\\).", answer: "\\(\\dfrac 76\\)" },
        { prompt: "Find \\(\\left(\\dfrac 13\\right)^{-3}\\).", answer: "\\(27\\)" },
        { prompt: "Simplify \\(y^7 \\times y^{-10}\\).", answer: "\\(\\dfrac{1}{y^3}\\)" },
        { prompt: "Find \\((5^{-1})^3\\).", answer: "\\(\\dfrac{1}{125}\\)" },
      ],
      pyqExampleId: "822b8f4e-647d-432e-90f6-7813ea966a6f",
      traps: [
        {
          title: "A negative index is not a negative number",
          body: "\\(3^{-3} = \\tfrac{1}{27}\\), not \\(-27\\) and not \\(-9\\). The minus sign in the index means take the reciprocal.",
        },
        {
          title: "A zero index gives 1, not 0",
          body: "\\(7^0 = 1\\). The same holds for any non-zero base, and \\(x^{n} \\times x^{-n} = x^0 = 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-letter-powers",
      name: "Simplifying fractions of letters with powers",
      intuition:
        "A fraction such as \\(\\dfrac{p^4 q^{-1}}{p^{-4} q^3}\\) looks busy, but it is two small quotients side by side: one for \\(p\\), one for \\(q\\). Subtract the indices letter by letter, then write any negative index as a reciprocal.",
      definition:
        "- Treat each letter on its own: top index minus bottom index.\n" +
        "- Subtracting a negative index adds: \\(p^4 \\div p^{-4} = p^{8}\\).\n" +
        "- A bracket raised to a power multiplies every index inside it, coefficients included: \\((2y^3)^4 = 16y^{12}\\).\n" +
        "- Finish with positive indices only: a letter with a negative index moves below the line.",
      formula: {
        label: "Letter by letter",
        latex: "\\dfrac{p^a q^b}{p^c q^d} = p^{a-c}\\, q^{b-d}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{p^4 q^{-1}}{p^{-4} q^{3}}\\).",
        steps: [
          "For \\(p\\): \\(4 - (-4) = 8\\). For \\(q\\): \\(-1 - 3 = -4\\).",
          "\\(p^8 q^{-4} = \\dfrac{p^8}{q^4}\\).",
        ],
        answer: "\\(\\dfrac{p^8}{q^4}\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\left(\\dfrac{m^{-1} n^4}{m^3 n}\\right)^3\\).",
        steps: [
          "Inside first: \\(m^{-1-3} n^{4-1} = m^{-4} n^{3}\\).",
          "Cube it: \\(m^{-12} n^{9}\\).",
        ],
        answer: "\\(\\dfrac{n^9}{m^{12}}\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\dfrac{x^6 y^{-4}}{x^{-3} y^{-8}}\\).", answer: "\\(x^9 y^4\\)" },
        { prompt: "Simplify \\(\\left(\\dfrac{x}{4y}\\right)^{-1}\\).", answer: "\\(\\dfrac{4y}{x}\\)" },
        { prompt: "Simplify \\(\\dfrac{(a b^4)^3}{a^6 b^8}\\).", answer: "\\(\\dfrac{b^4}{a^3}\\)" },
      ],
      pyqExampleId: "acfaa3c8-eb2f-4c31-8a59-9ff832789b5d",
      traps: [
        {
          title: "Minus a negative is plus",
          body: "In \\(\\dfrac{x^6}{x^{-3}}\\) the index is \\(6 - (-3) = 9\\), not \\(3\\). Write the subtraction out with brackets before you do it.",
        },
        {
          title: "The coefficient takes the power too",
          body: "\\(\\left(\\dfrac{3m}{n}\\right)^{-2} = \\dfrac{n^2}{9m^2}\\). Flipping the fraction is not enough: the 3 is squared along with \\(m\\).",
        },
      ],
    },
  ],
};
