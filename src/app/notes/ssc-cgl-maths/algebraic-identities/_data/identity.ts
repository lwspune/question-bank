import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_IDENTITY_NOTE: SubtopicNote = {
  subtopicName: "The Cube Identity and a + b + c = 0",
  title: "The Cube Identity and a + b + c = 0",
  oneLineDefinition:
    "a³ + b³ + c³ − 3abc has a + b + c as a factor, so when a + b + c = 0 the sum of the three cubes is 3abc.",
  whyItMatters:
    "26 questions in the bank, and seven of them come from the 2025 shifts. About half give two of the sums and ask for the cube expression; the other half hide three numbers that add to zero. Before cubing any number, add the bases: if they sum to zero, the cubes need no arithmetic at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscaiid-factor",
      name: "The factorisation of a³ + b³ + c³ − 3abc",
      intuition:
        "The expression is the sum \\(a + b + c\\) times the bracket \\(a^2 + b^2 + c^2 - ab - bc - ca\\) from the three-variable page. So it is built from sums you already know how to find.",
      definition:
        "- \\(a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)\\).\n" +
        "- The bracket is half the sum of squared differences, so \\(a^3 + b^3 + c^3 - 3abc = \\frac{1}{2}(a + b + c)\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]\\).\n" +
        "- With the sum \\(s = a + b + c\\) and the pair sum \\(q = ab + bc + ca\\): \\(a^3 + b^3 + c^3 - 3abc = s(s^2 - 3q)\\).\n" +
        "- For \\(a^3 + b^3 + c^3\\) itself, add \\(3abc\\) back: \\(a^3 + b^3 + c^3 = s^3 - 3sq + 3abc\\).\n" +
        "- **A minus sign:** \\(a^3 + b^3 - c^3 + 3abc\\) is \\(a^3 + b^3 + (-c)^3 - 3ab(-c)\\), so its factor is \\(a + b - c\\) and its bracket is \\(a^2 + b^2 + c^2 - ab + bc + ca\\).\n" +
        "- **Number fractions:** when the top is \\(a^3 + b^3 + c^3 - 3abc\\) and the bottom is \\(a^2 + b^2 + c^2 - ab - bc - ca\\) for the same three numbers, the value is \\(a + b + c\\).",
      formula: {
        label: "The three-cube identity",
        latex:
          "a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) \\qquad a^3 + b^3 + c^3 - 3abc = \\frac{1}{2}(a + b + c)\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right] \\qquad a^3 + b^3 + c^3 = s^3 - 3sq + 3abc",
        symbols: [
          { symbol: "s", meaning: "the sum a + b + c" },
          { symbol: "q", meaning: "the sum of pair products ab + bc + ca" },
        ],
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 10\\) and \\(a^2 + b^2 + c^2 = 38\\), find \\(a^3 + b^3 + c^3 - 3abc\\).",
        steps: [
          "\\(ab + bc + ca = \\frac{100 - 38}{2} = 31\\).",
          "\\(a^3 + b^3 + c^3 - 3abc = 10 \\times (38 - 31) = 70\\).",
          "Check with 2, 3 and 5: \\(8 + 27 + 125 - 3 \\times 30 = 160 - 90 = 70\\).",
        ],
        answer: "70",
      },
      selfCheckExample: {
        prompt: "If \\(x + y + z = 6\\), \\(xy + yz + zx = 11\\) and \\(xyz = 6\\), find \\(x^3 + y^3 + z^3\\).",
        steps: [
          "\\(x^3 + y^3 + z^3 = s^3 - 3sq + 3xyz = 216 - 198 + 18 = 36\\).",
          "Check with 1, 2 and 3: \\(1 + 8 + 27 = 36\\).",
        ],
        answer: "36",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\frac{5^3 + 6^3 + 9^3 - 3 \\times 5 \\times 6 \\times 9}{5^2 + 6^2 + 9^2 - 5 \\times 6 - 6 \\times 9 - 9 \\times 5}\\).",
          answer: "\\(5 + 6 + 9 = 20\\)",
        },
        {
          prompt: "If \\(a + b + c = 8\\) and \\(ab + bc + ca = 20\\), find \\(a^3 + b^3 + c^3 - 3abc\\).",
          answer: "\\(8 \\times (64 - 60) = 32\\)",
        },
        {
          prompt: "If \\(p + q + r = 3\\) and \\((p - q)^2 + (q - r)^2 + (r - p)^2 = 8\\), find \\(p^3 + q^3 + r^3 - 3pqr\\).",
          answer: "\\(\\frac{1}{2} \\times 3 \\times 8 = 12\\)",
        },
        {
          prompt: "Factorise \\(x^3 - y^3 + z^3 + 3xyz\\).",
          answer: "\\((x - y + z)(x^2 + y^2 + z^2 + xy + yz - zx)\\)",
        },
      ],
      pyqExampleId: "dd08b4c9-286f-4ad7-8f18-2625a13f5d92",
      traps: [
        {
          title: "Forgetting to add 3abc back",
          body:
            "The identity gives \\(a^3 + b^3 + c^3 - 3abc\\). If the question asks for \\(a^3 + b^3 + c^3\\), add \\(3abc\\) at the end.",
        },
        {
          title: "The bracket uses the sum of squares",
          body:
            "The second factor is \\(a^2 + b^2 + c^2 - (ab + bc + ca)\\). Putting \\((a + b + c)^2\\) in place of \\(a^2 + b^2 + c^2\\) adds \\(2(ab + bc + ca)\\) too much.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaiid-zero",
      name: "When a + b + c = 0, a³ + b³ + c³ = 3abc",
      intuition:
        "If \\(a + b + c = 0\\), the first factor of the identity is zero, so \\(a^3 + b^3 + c^3 - 3abc\\) is zero. The sum of the three cubes is then just three times their product.",
      definition:
        "- \\(a + b + c = 0 \\Rightarrow a^3 + b^3 + c^3 = 3abc\\).\n" +
        "- **Hidden zero sums:** \\(x - y\\), \\(y - z\\) and \\(z - x\\) always add to zero, so \\((x - y)^3 + (y - z)^3 + (z - x)^3 = 3(x - y)(y - z)(z - x)\\) for any x, y, z.\n" +
        "- **A minus sign:** \\(a + b = c\\) means \\(a + b + (-c) = 0\\), so \\(a^3 + b^3 - c^3 = -3abc\\).\n" +
        "- **Coefficients:** \\(27a^3 + b^3 + 8c^3 = 18abc\\) is \\((3a)^3 + b^3 + (2c)^3 = 3(3a)(b)(2c)\\), which holds when \\(3a + b + 2c = 0\\).\n" +
        "- **Two terms:** if \\(a + b = 0\\) then \\(b = -a\\) and \\(a^3 + b^3 = 0\\).\n" +
        "- **In numbers:** for \\(15^3 + 8^3 - 23^3\\), the bases \\(15 + 8 - 23 = 0\\), so the value is \\(3 \\times 15 \\times 8 \\times (-23) = -8280\\).\n" +
        "- **Add the bases first.** If they add to 7, not 0, the shortcut does not apply: cube and add, or use the full identity.",
      formula: {
        label: "Three cubes when the sum is zero",
        latex: "a + b + c = 0 \\Rightarrow a^3 + b^3 + c^3 = 3abc",
      },
      authoredExample: {
        prompt: "Find \\(\\frac{(0.4)^3 + (0.5)^3 - (0.9)^3}{0.4 \\times 0.5 \\times 0.9}\\).",
        steps: [
          "Take \\(a = 0.4\\), \\(b = 0.5\\), \\(c = -0.9\\). Then \\(a + b + c = 0\\).",
          "So the top is \\(3abc = 3 \\times 0.4 \\times 0.5 \\times (-0.9)\\), and the fraction is \\(-3\\).",
          "Check: \\(0.064 + 0.125 - 0.729 = -0.54\\), and \\(0.4 \\times 0.5 \\times 0.9 = 0.18\\); \\(\\frac{-0.54}{0.18} = -3\\).",
        ],
        answer: "\\(-3\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\frac{(a - 2b)^3 + (2b - 3c)^3 + (3c - a)^3}{(a - 2b)(2b - 3c)(3c - a)}\\).",
        steps: [
          "The three bases add to \\(a - 2b + 2b - 3c + 3c - a = 0\\).",
          "So the top is 3 times the product of the bases, and the fraction is 3.",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "If \\(p + q + r = 0\\) and \\(pqr = -4\\), find \\(p^3 + q^3 + r^3\\).", answer: "\\(3 \\times (-4) = -12\\)" },
        {
          prompt: "Find \\(12^3 + 13^3 - 25^3\\) without cubing.",
          answer: "\\(12 + 13 - 25 = 0\\), so \\(3 \\times 12 \\times 13 \\times (-25) = -11700\\)",
        },
        {
          prompt: "If \\(x = 3\\), \\(y = -1\\) and \\(z = -2\\), find \\(\\frac{x^3 + y^3 + z^3}{xyz}\\).",
          answer: "The sum is 0, so the value is 3",
        },
        {
          prompt: "If \\(m + n = 30\\), find \\((m - 18)^3 + (n - 12)^3\\).",
          answer: "The two bases add to 0, so the value is 0",
        },
      ],
      pyqExampleId: "6d813867-4146-4a80-a2a1-0ea00e4e4d2e",
      traps: [
        {
          title: "Equal values also satisfy the cube condition",
          body:
            "\\(x^3 + y^3 + z^3 = 3xyz\\) also holds when \\(x = y = z\\), because then the bracket is zero. So the condition gives \\(x + y + z = 0\\) or \\(x = y = z\\): check the options for both.",
        },
        {
          title: "A sum that is nearly zero",
          body:
            "In \\(21^3 + 9^3 - 31^3\\), the bases add to \\(-1\\), not 0, so \\(3abc\\) is not the answer. Add the bases before using the shortcut.",
        },
      ],
    },
  ],
};
