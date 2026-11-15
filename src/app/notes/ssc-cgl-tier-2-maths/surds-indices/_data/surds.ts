import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_SI_SURDS_NOTE: SubtopicNote = {
  subtopicName: "Surds and Rationalisation",
  title: "Surds and Rationalisation",
  oneLineDefinition:
    "A surd in a denominator is cleared with its conjugate, a surd such as 7 + 4√3 may be a perfect square, and a tower of roots is solved from the inside out or, if endless, by calling it x.",
  whyItMatters:
    "12 questions in the Tier II bank, 6 EASY, 5 MODERATE and 1 HARD. The hard work is almost always the same move: multiply by the conjugate and watch a difference of squares appear.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2sisu-rationalise",
      name: "Rationalising and telescoping",
      intuition:
        "A surd in a denominator is cleared by multiplying top and bottom by its conjugate, which turns the bottom into a difference of squares. When a whole chain of such fractions is rationalised, neighbouring terms often cancel.",
      definition:
        "- \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}\\).\n" +
        "- \\((3 + 2\\sqrt{2})(3 - 2\\sqrt{2}) = 1\\), so \\(\\frac{1}{3 - 2\\sqrt{2}} = 3 + 2\\sqrt{2}\\).\n" +
        "- \\(\\frac{1}{\\sqrt{n + 1} - \\sqrt{n}} = \\sqrt{n + 1} + \\sqrt{n}\\): a chain of these with alternating signs telescopes.\n" +
        "- Simplify each surd first (\\(\\sqrt{20} = 2\\sqrt{5}\\), \\(\\sqrt{40} = 2\\sqrt{10}\\)) and collect like surds.",
      formula: {
        label: "Rationalising a difference",
        latex: "\\frac{1}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{\\sqrt{5} + \\sqrt{3}}{\\sqrt{5} - \\sqrt{3}}\\).",
        steps: [
          "Multiply top and bottom by \\(\\sqrt{5} + \\sqrt{3}\\): the bottom becomes \\(5 - 3 = 2\\).",
          "The top is \\((\\sqrt{5} + \\sqrt{3})^2 = 8 + 2\\sqrt{15}\\).",
          "Value \\(= 4 + \\sqrt{15}\\).",
        ],
        answer: "\\(4 + \\sqrt{15}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{1}{\\sqrt{2} + 1} + \\frac{1}{\\sqrt{3} + \\sqrt{2}} + \\frac{1}{2 + \\sqrt{3}}\\).",
        steps: ["Each term rationalises to a difference: \\((\\sqrt{2} - 1) + (\\sqrt{3} - \\sqrt{2}) + (2 - \\sqrt{3})\\).", "Everything cancels except \\(2 - 1 = 1\\)."],
        answer: "1",
      },
      practiceSet: [
        { prompt: "Rationalise \\(\\frac{6}{\\sqrt{7} - 1}\\).", answer: "\\(\\sqrt{7} + 1\\)" },
        { prompt: "Find \\(\\frac{1}{5 - 2\\sqrt{6}}\\).", answer: "\\(5 + 2\\sqrt{6}\\)" },
        { prompt: "Simplify \\(\\sqrt{18} + \\sqrt{50} - \\sqrt{8}\\).", answer: "\\(6\\sqrt{2}\\)" },
      ],
      pyqExampleId: "8ee86867-26ba-4ce8-8d3b-ded319911c71",
      traps: [
        {
          title: "Multiplying only the bottom by the conjugate",
          body: "Rationalising multiplies the fraction by 1 in disguise: the conjugate goes on top AND bottom. Changing only the bottom changes the value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2sisu-sqrt",
      name: "The square root of a surd",
      intuition:
        "A surd such as \\(7 + 4\\sqrt{3}\\) may be the perfect square of something like \\(2 + \\sqrt{3}\\). Write the middle part as \\(2\\sqrt{y}\\), then find two numbers that add to the whole part and multiply to y.",
      definition:
        "- \\(\\sqrt{x + 2\\sqrt{y}} = \\sqrt{m} + \\sqrt{n}\\), where \\(m + n = x\\) and \\(mn = y\\).\n" +
        "- \\(7 + 4\\sqrt{3} = 7 + 2\\sqrt{12}\\): \\(m + n = 7\\), \\(mn = 12\\), so 4 and 3, giving \\(2 + \\sqrt{3}\\).\n" +
        "- With a minus sign, \\(\\sqrt{x - 2\\sqrt{y}} = \\sqrt{m} - \\sqrt{n}\\) with \\(m > n\\), so the root stays positive.\n" +
        "- A quotient of two such roots: rationalise first, then take the root by matching.",
      formula: {
        label: "Square root of a surd",
        latex: "\\sqrt{x + 2\\sqrt{y}} = \\sqrt{m} + \\sqrt{n} \\text{ where } m + n = x,\\; mn = y",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{8 + 2\\sqrt{15}}\\).",
        steps: ["Two numbers that add to 8 and multiply to 15 are 5 and 3.", "So the root is \\(\\sqrt{5} + \\sqrt{3}\\)."],
        answer: "\\(\\sqrt{5} + \\sqrt{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{11 - 6\\sqrt{2}}\\).",
        steps: ["\\(6\\sqrt{2} = 2\\sqrt{18}\\): numbers adding to 11 and multiplying to 18 are 9 and 2.", "The root is \\(\\sqrt{9} - \\sqrt{2} = 3 - \\sqrt{2}\\)."],
        answer: "\\(3 - \\sqrt{2}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{7 + 4\\sqrt{3}}\\).", answer: "\\(2 + \\sqrt{3}\\)" },
        { prompt: "Find \\(\\sqrt{5 - 2\\sqrt{6}}\\).", answer: "\\(\\sqrt{3} - \\sqrt{2}\\)" },
        { prompt: "Find \\(\\sqrt{9 + 4\\sqrt{5}}\\).", answer: "\\(\\sqrt{5} + 2\\)" },
      ],
      pyqExampleId: "0a9ebf2d-b334-462b-a2dc-ce0249c64295",
      traps: [
        {
          title: "Putting the smaller root first",
          body: "\\(\\sqrt{5 - 2\\sqrt{6}} = \\sqrt{3} - \\sqrt{2}\\), not \\(\\sqrt{2} - \\sqrt{3}\\). A square root is positive, so the larger surd goes first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2sisu-nested",
      name: "Nested and endless radicals",
      intuition:
        "A tower of roots is solved from the inside out, and each step is usually a perfect square. An endless tower is equal to itself one level down, so call it x and square both sides.",
      definition:
        "- Work from the innermost root outwards; each step should give a whole number.\n" +
        "- \\(\\sqrt{a + \\sqrt{a + \\sqrt{a + \\cdots}}} = x\\) gives \\(x^2 = a + x\\).\n" +
        "- \\(\\sqrt{a - \\sqrt{a - \\cdots}} = x\\) gives \\(x^2 = a - x\\).\n" +
        "- Keep only the positive root of the quadratic.",
      formula: {
        label: "An endless radical",
        latex: "x = \\sqrt{a + x} \\;\\Rightarrow\\; x^2 - x - a = 0",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{12 + \\sqrt{12 + \\sqrt{12 + \\cdots}}}\\).",
        steps: ["\\(x^2 = 12 + x\\), so \\(x^2 - x - 12 = 0\\) and \\((x - 4)(x + 3) = 0\\).", "x is positive, so \\(x = 4\\)."],
        answer: "4",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{30 - \\sqrt{30 - \\sqrt{30 - \\cdots}}}\\).",
        steps: ["\\(x^2 = 30 - x\\), so \\(x^2 + x - 30 = 0\\) and \\((x + 6)(x - 5) = 0\\).", "x is positive, so \\(x = 5\\)."],
        answer: "5",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{6 + \\sqrt{6 + \\sqrt{6 + \\cdots}}}\\).", answer: "3" },
        { prompt: "Find \\(\\sqrt{40 + \\sqrt{81}}\\).", answer: "7" },
        { prompt: "Find \\(\\sqrt{19 + \\sqrt{31 + \\sqrt{25}}}\\).", answer: "5" },
      ],
      pyqExampleId: "97b0fae8-0271-4f2c-8ab6-cf9f402b97f1",
      traps: [
        {
          title: "Keeping the negative root",
          body: "The quadratic for an endless radical has a negative root too, but a square root is never negative. Keep only the positive one.",
        },
      ],
    },
  ],
};
