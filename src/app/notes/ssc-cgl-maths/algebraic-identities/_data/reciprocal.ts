import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_RECIPROCAL_NOTE: SubtopicNote = {
  subtopicName: "Reciprocal Sums x ± 1/x",
  title: "Reciprocal Sums x ± 1/x",
  oneLineDefinition:
    "From x + 1/x or x − 1/x to their squares and fourth powers, switching between the two signs, and getting x + 1/x out of an equation or a surd.",
  whyItMatters:
    "35 questions in the bank, and seven of them come from the 2025 shifts. Every one rests on one fact: x times 1/x is 1, so when you square x ± 1/x the cross term is just 2. Learn the ladder and the sign rule and most of these take a single line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscairc-ladder",
      name: "Squaring x + 1/x and x − 1/x",
      intuition:
        "In \\(\\left(x + \\frac{1}{x}\\right)^2\\) the middle term is \\(2 \\times x \\times \\frac{1}{x} = 2\\): the x cancels. So each rung up the ladder costs only \"square it, then take away 2\".",
      definition:
        "- \\(x^2 + \\frac{1}{x^2} = \\left(x + \\frac{1}{x}\\right)^2 - 2 = \\left(x - \\frac{1}{x}\\right)^2 + 2\\).\n" +
        "- Climb again: \\(x^4 + \\frac{1}{x^4} = \\left(x^2 + \\frac{1}{x^2}\\right)^2 - 2\\). Every rung is \"square, minus 2\".\n" +
        "- **A number in front:** for \\(4y + \\frac{4}{y} = m\\), divide by 4 first to get \\(y + \\frac{1}{y}\\).\n" +
        "- **Two terms that still multiply to 1:** in \\(3t + \\frac{1}{3t}\\), the product is 1, so the same rule works with \\(3t\\) in place of x: \\(9t^2 + \\frac{1}{9t^2} = \\left(3t + \\frac{1}{3t}\\right)^2 - 2\\).\n" +
        "- If the terms do not multiply to 1, as in \\(x + \\frac{1}{16x}\\), multiply through first: \\(4x + \\frac{1}{4x}\\) has product 1.\n" +
        "- **Square roots:** \\(\\sqrt{x} + \\frac{1}{\\sqrt{x}} = k\\) gives \\(x + \\frac{1}{x} = k^2 - 2\\).",
      formula: {
        label: "The squaring ladder",
        latex:
          "x^2 + \\frac{1}{x^2} = \\left(x + \\frac{1}{x}\\right)^2 - 2 \\qquad x^2 + \\frac{1}{x^2} = \\left(x - \\frac{1}{x}\\right)^2 + 2 \\qquad x^4 + \\frac{1}{x^4} = \\left(x^2 + \\frac{1}{x^2}\\right)^2 - 2",
      },
      authoredExample: {
        prompt: "If \\(x + \\frac{1}{x} = 6\\), find \\(x^4 + \\frac{1}{x^4}\\).",
        steps: [
          "\\(x^2 + \\frac{1}{x^2} = 6^2 - 2 = 34\\).",
          "\\(x^4 + \\frac{1}{x^4} = 34^2 - 2 = 1156 - 2 = 1154\\).",
        ],
        answer: "1154",
      },
      selfCheckExample: {
        prompt: "If \\(4y + \\frac{4}{y} = 18\\), find \\(y^2 + \\frac{1}{y^2}\\).",
        steps: [
          "Divide by 4: \\(y + \\frac{1}{y} = \\frac{9}{2}\\).",
          "\\(y^2 + \\frac{1}{y^2} = \\frac{81}{4} - 2 = \\frac{73}{4}\\).",
        ],
        answer: "\\(\\frac{73}{4}\\)",
      },
      practiceSet: [
        { prompt: "If \\(a + \\frac{1}{a} = 8\\), find \\(a^2 + \\frac{1}{a^2}\\).", answer: "62" },
        { prompt: "If \\(m - \\frac{1}{m} = 5\\), find \\(m^2 + \\frac{1}{m^2}\\).", answer: "\\(25 + 2 = 27\\)" },
        { prompt: "If \\(\\sqrt{p} + \\frac{1}{\\sqrt{p}} = 5\\), find \\(p + \\frac{1}{p}\\).", answer: "\\(25 - 2 = 23\\)" },
        {
          prompt: "If \\(x + \\frac{1}{16x} = 2\\), find \\(16x^2 + \\frac{1}{16x^2}\\).",
          answer: "Multiply by 4: \\(4x + \\frac{1}{4x} = 8\\), so the value is \\(64 - 2 = 62\\)",
        },
      ],
      pyqExampleId: "90a7c7c9-34ce-47d8-90a0-c929eb5d52e2",
      traps: [
        {
          title: "Plus 2 or minus 2",
          body:
            "From \\(x + \\frac{1}{x}\\), subtract 2; from \\(x - \\frac{1}{x}\\), add 2. \\(\\left(x - \\frac{1}{x}\\right)^2 = x^2 - 2 + \\frac{1}{x^2}\\), so \\(x^2 + \\frac{1}{x^2}\\) is that square plus 2.",
        },
        {
          title: "A number in front left inside",
          body:
            "From \\(5y + \\frac{5}{y} = 12\\), \\(y + \\frac{1}{y}\\) is \\(\\frac{12}{5}\\), not 12. Divide by the number in front first, then square.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscairc-switch",
      name: "Switching between x + 1/x and x − 1/x",
      intuition:
        "The squares of \\(x + \\frac{1}{x}\\) and \\(x - \\frac{1}{x}\\) differ by exactly 4. So either one gives the other, up to a sign that you choose from what you know about x.",
      definition:
        "- \\(\\left(x - \\frac{1}{x}\\right)^2 = \\left(x + \\frac{1}{x}\\right)^2 - 4\\) and \\(\\left(x + \\frac{1}{x}\\right)^2 = \\left(x - \\frac{1}{x}\\right)^2 + 4\\).\n" +
        "- \\(x^2 - \\frac{1}{x^2} = \\left(x + \\frac{1}{x}\\right)\\left(x - \\frac{1}{x}\\right)\\), and \\(x^4 - \\frac{1}{x^4} = \\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^2 - \\frac{1}{x^2}\\right)\\).\n" +
        "- **Choosing the sign:** if \\(x > 1\\) then \\(x > \\frac{1}{x}\\), so \\(x - \\frac{1}{x}\\) is positive. If \\(0 < x < 1\\) then \\(\\frac{1}{x}\\) is the bigger one, so \\(x - \\frac{1}{x}\\) and \\(x^2 - \\frac{1}{x^2}\\) are negative. \\(x + \\frac{1}{x}\\) is positive whenever x is.\n" +
        "- If the question gives no condition and the options show only one sign, take that one.",
      formula: {
        label: "Switching the sign",
        latex:
          "\\left(x - \\frac{1}{x}\\right)^2 = \\left(x + \\frac{1}{x}\\right)^2 - 4 \\qquad x^2 - \\frac{1}{x^2} = \\left(x + \\frac{1}{x}\\right)\\left(x - \\frac{1}{x}\\right) \\qquad x^4 - \\frac{1}{x^4} = \\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^2 - \\frac{1}{x^2}\\right)",
      },
      authoredExample: {
        prompt: "If \\(x + \\frac{1}{x} = 5\\) and \\(0 < x < 1\\), find \\(x^2 - \\frac{1}{x^2}\\).",
        steps: [
          "\\(\\left(x - \\frac{1}{x}\\right)^2 = 25 - 4 = 21\\).",
          "With \\(0 < x < 1\\), \\(x < \\frac{1}{x}\\), so \\(x - \\frac{1}{x} = -\\sqrt{21}\\).",
          "\\(x^2 - \\frac{1}{x^2} = 5 \\times (-\\sqrt{21}) = -5\\sqrt{21}\\).",
        ],
        answer: "\\(-5\\sqrt{21}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x - \\frac{1}{x} = 4\\) and \\(x > 0\\), find \\(x + \\frac{1}{x}\\).",
        steps: [
          "\\(\\left(x + \\frac{1}{x}\\right)^2 = 16 + 4 = 20\\).",
          "x is positive, so \\(x + \\frac{1}{x} = \\sqrt{20} = 2\\sqrt{5}\\).",
        ],
        answer: "\\(2\\sqrt{5}\\)",
      },
      practiceSet: [
        { prompt: "If \\(a + \\frac{1}{a} = 3\\) and \\(a > 1\\), find \\(a - \\frac{1}{a}\\).", answer: "\\(\\sqrt{9 - 4} = \\sqrt{5}\\)" },
        {
          prompt: "If \\(p - \\frac{1}{p} = 2\\) and \\(p > 0\\), find \\(p^2 - \\frac{1}{p^2}\\).",
          answer: "\\(p + \\frac{1}{p} = \\sqrt{8} = 2\\sqrt{2}\\), so the value is \\(4\\sqrt{2}\\)",
        },
        {
          prompt: "If \\(x = \\frac{1}{2}\\), is \\(x - \\frac{1}{x}\\) positive or negative?",
          answer: "Negative: \\(\\frac{1}{2} - 2 = -\\frac{3}{2}\\)",
        },
        {
          prompt: "If \\(m^2 + \\frac{1}{m^2} = 11\\) and \\(m^2 - \\frac{1}{m^2} = 3\\sqrt{13}\\), find \\(m^4 - \\frac{1}{m^4}\\).",
          answer: "\\(11 \\times 3\\sqrt{13} = 33\\sqrt{13}\\)",
        },
      ],
      pyqExampleId: "d07673a3-2494-4d48-865e-07e0efa81e43",
      traps: [
        {
          title: "Losing the sign when x is between 0 and 1",
          body:
            "For \\(0 < x < 1\\), \\(\\frac{1}{x} > x\\), so \\(x - \\frac{1}{x}\\) and \\(x^2 - \\frac{1}{x^2}\\) are negative. The positive root is printed as a wrong option.",
        },
        {
          title: "Minus 4, not minus 2",
          body:
            "\\(\\left(x - \\frac{1}{x}\\right)^2\\) is \\(\\left(x + \\frac{1}{x}\\right)^2 - 4\\). The 2 belongs to \\(x^2 + \\frac{1}{x^2}\\); the difference between the two squares is 4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscairc-equation",
      name: "Getting x + 1/x from an equation or a surd",
      intuition:
        "An equation like \\(x^2 - kx + 1 = 0\\) is \\(x + \\frac{1}{x} = k\\) in disguise: divide by x. A surd like \\(3 + 2\\sqrt{2}\\) has a reciprocal that is its conjugate. Either way you land back on the ladder.",
      definition:
        "- **Divide by x:** \\(x^2 - kx + 1 = 0\\) gives \\(x + \\frac{1}{x} = k\\), and \\(x^2 - kx - 1 = 0\\) gives \\(x - \\frac{1}{x} = k\\). This needs the \\(x^2\\) term and the constant to be equal (or opposite).\n" +
        "- **Multiply by \\(x^2\\)** to go back: from \\(x^2 + \\frac{1}{x^2} = m\\), \\(x^4 + 1 = mx^2\\).\n" +
        "- **A surd and its reciprocal:** when \\((a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b = 1\\), the reciprocal of \\(a + \\sqrt{b}\\) is \\(a - \\sqrt{b}\\). So \\(\\frac{1}{3 + 2\\sqrt{2}} = 3 - 2\\sqrt{2}\\), since \\(9 - 8 = 1\\).\n" +
        "- **\\(x + \\frac{1}{x} = 2\\) means \\(x = 1\\)**, because \\((x - 1)^2 = 0\\); and \\(-2\\) means \\(x = -1\\). Then every power is 1 (or ±1), whatever the exponent.\n" +
        "- **Inside a fraction:** divide the top and the bottom by x. \\(\\frac{3x^2 - 5x + 3}{x^2 + x + 1}\\) becomes \\(\\frac{3\\left(x + \\frac{1}{x}\\right) - 5}{\\left(x + \\frac{1}{x}\\right) + 1}\\).",
      formula: {
        label: "From a quadratic to x ± 1/x",
        latex:
          "x^2 - kx + 1 = 0 \\Rightarrow x + \\frac{1}{x} = k \\qquad x^2 - kx - 1 = 0 \\Rightarrow x - \\frac{1}{x} = k",
      },
      authoredExample: {
        prompt: "If \\(x^2 - 6x + 1 = 0\\), find \\(\\frac{2x^2 + 3x + 2}{x^2 + 1}\\).",
        steps: [
          "Divide the equation by x: \\(x + \\frac{1}{x} = 6\\).",
          "Divide the fraction's top and bottom by x: \\(\\frac{2\\left(x + \\frac{1}{x}\\right) + 3}{x + \\frac{1}{x}} = \\frac{12 + 3}{6}\\).",
          "\\(= \\frac{15}{6} = \\frac{5}{2}\\). Check with \\(x^2 + 1 = 6x\\): \\(\\frac{12x + 3x}{6x} = \\frac{5}{2}\\).",
        ],
        answer: "\\(\\frac{5}{2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x = 3 + 2\\sqrt{2}\\), find \\(x + \\frac{1}{x}\\).",
        steps: [
          "\\((3 + 2\\sqrt{2})(3 - 2\\sqrt{2}) = 9 - 8 = 1\\), so \\(\\frac{1}{x} = 3 - 2\\sqrt{2}\\).",
          "\\(x + \\frac{1}{x} = 6\\).",
        ],
        answer: "6",
      },
      practiceSet: [
        { prompt: "If \\(x^2 - 10x + 1 = 0\\), find \\(x^2 + \\frac{1}{x^2}\\).", answer: "\\(100 - 2 = 98\\)" },
        { prompt: "If \\(y^2 - 4y - 1 = 0\\), find \\(y - \\frac{1}{y}\\).", answer: "4" },
        { prompt: "If \\(t + \\frac{1}{t} = 2\\), find \\(t^{50} + \\frac{1}{t^{50}}\\).", answer: "\\(t = 1\\), so the value is 2" },
        { prompt: "If \\(x = \\sqrt{5} + 2\\), find \\(\\frac{1}{x}\\).", answer: "\\(\\sqrt{5} - 2\\), since \\(5 - 4 = 1\\)" },
      ],
      pyqExampleId: "d4433a00-0411-4352-9cb8-24869fde45ee",
      traps: [
        {
          title: "Dividing an equation whose ends do not match",
          body:
            "\\(x^2 - 6x + 4 = 0\\) divided by x gives \\(x + \\frac{4}{x} = 6\\), not \\(x + \\frac{1}{x} = 6\\). The trick needs the \\(x^2\\) coefficient and the constant to be equal.",
        },
        {
          title: "A conjugate is the reciprocal only when the product is 1",
          body:
            "\\(\\frac{1}{2 + \\sqrt{5}}\\) is not \\(2 - \\sqrt{5}\\): the product is \\(4 - 5 = -1\\), so the reciprocal is \\(\\sqrt{5} - 2\\). Work out \\(a^2 - b\\) first.",
        },
      ],
    },
  ],
};
