import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_SURDS_NOTE: SubtopicNote = {
  subtopicName: "Surds and Rationalisation",
  title: "Surds and Rationalisation",
  oneLineDefinition:
    "A surd is a root that is not a whole number, such as √2; surds are simplified by taking out square factors, combined only when the roots match, cleared from a denominator with the conjugate, and compared by squaring.",
  whyItMatters:
    "Twenty questions in the bank, 14 EASY and 6 MODERATE, and 18 of them come from the 2025 shifts. Three moves cover all of them: simplify and expand, rationalise with the conjugate, and compare two surd sums by squaring. Knowing √2, √3, √5, √6 and √7 to three decimal places turns several of them into a quick estimate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsisu-like",
      name: "Simplifying, adding and expanding surds",
      intuition:
        "Pull the largest square factor out of each root. Once the numbers left under the roots match, the surds behave like like terms in algebra: \\(3\\sqrt{2}\\) and \\(5\\sqrt{2}\\) add just as \\(3x\\) and \\(5x\\) do.",
      definition:
        "- **Simplify:** \\(\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}\\). Take out the largest square factor: \\(\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}\\).\n" +
        "- **Like surds** have the same number under the root after simplifying: \\(4\\sqrt{3} + 2\\sqrt{3} = 6\\sqrt{3}\\). \\(\\sqrt{2} + \\sqrt{3}\\) cannot be combined.\n" +
        "- **Expand like algebra:** \\((\\sqrt{a} + \\sqrt{b})^2 = a + b + 2\\sqrt{ab}\\) and \\((\\sqrt{a} + c)^2 = a + c^2 + 2c\\sqrt{a}\\).\n" +
        "- \\((x + y)^2 - (x - y)^2 = 4xy\\), so \\((\\sqrt{a} + \\sqrt{b})^2 - (\\sqrt{a} - \\sqrt{b})^2 = 4\\sqrt{ab}\\).\n" +
        "- **Values to know:** \\(\\sqrt{2} \\approx 1.414\\), \\(\\sqrt{3} \\approx 1.732\\), \\(\\sqrt{5} \\approx 2.236\\), \\(\\sqrt{6} \\approx 2.449\\), \\(\\sqrt{7} \\approx 2.646\\). A quick decimal check confirms an answer or removes options.",
      formula: {
        label: "Surd rules",
        latex:
          "\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b} \\qquad (\\sqrt{a} + \\sqrt{b})^2 = a + b + 2\\sqrt{ab} \\qquad (\\sqrt{a} + \\sqrt{b})^2 - (\\sqrt{a} - \\sqrt{b})^2 = 4\\sqrt{ab}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{75} - \\sqrt{27} + \\sqrt{12}\\).",
        steps: [
          "\\(\\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}\\), \\(\\sqrt{27} = 3\\sqrt{3}\\), \\(\\sqrt{12} = 2\\sqrt{3}\\).",
          "All are like surds: \\((5 - 3 + 2)\\sqrt{3} = 4\\sqrt{3}\\).",
          "Check: \\(8.660 - 5.196 + 3.464 = 6.928 = 4 \\times 1.732\\).",
        ],
        answer: "\\(4\\sqrt{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find the missing number: \\((\\sqrt{5} + 3)^2 = ? + 6\\sqrt{5}\\).",
        steps: [
          "\\((\\sqrt{5} + 3)^2 = 5 + 9 + 2 \\times 3\\sqrt{5} = 14 + 6\\sqrt{5}\\).",
        ],
        answer: "14",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sqrt{200}\\).", answer: "\\(10\\sqrt{2}\\)" },
        { prompt: "What is \\((\\sqrt{3} + \\sqrt{2})^2\\)?", answer: "\\(5 + 2\\sqrt{6}\\)" },
        { prompt: "What is \\((\\sqrt{13} + \\sqrt{3})^2 - (\\sqrt{13} - \\sqrt{3})^2\\)?", answer: "\\(4\\sqrt{39}\\)" },
        { prompt: "Simplify \\(\\sqrt{48} + \\sqrt{3}\\).", answer: "\\(5\\sqrt{3}\\)", method: "\\(\\sqrt{48} = 4\\sqrt{3}\\)." },
      ],
      pyqExampleId: "533d03a3-37f3-47a8-8116-fa3a131cd666",
      traps: [
        {
          title: "Adding the numbers under the roots",
          body:
            "\\(\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7\\), but \\(\\sqrt{25} = 5\\). Roots add only when they are like surds, and then you add the numbers in front of them.",
        },
        {
          title: "Dropping the middle term of a surd square",
          body:
            "\\((\\sqrt{7} + 2)^2 = 7 + 4 + 4\\sqrt{7} = 11 + 4\\sqrt{7}\\), not \\(7 + 4 = 11\\). The middle term \\(2ab\\) carries the surd.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsisu-rationalise",
      name: "Rationalising with the conjugate",
      intuition:
        "A root in the denominator makes a fraction hard to use. Multiply the top and bottom by the conjugate, the same two terms with the sign between them changed. The bottom becomes a difference of squares, and the root disappears.",
      definition:
        "- \\((\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b\\), with no root left.\n" +
        "- So \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}\\).\n" +
        "- **When the two squares differ by 1,** the reciprocal is just the conjugate: \\(\\frac{1}{\\sqrt{10} - 3} = \\sqrt{10} + 3\\). This makes long alternating chains collapse, each root cancelling the next.\n" +
        "- **A surd plus its conjugate** has no root: \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}} + \\frac{1}{\\sqrt{a} + \\sqrt{b}} = \\frac{2\\sqrt{a}}{a - b}\\).\n" +
        "- **A number and its reciprocal:** for \\(x = 4 + \\sqrt{15}\\), \\(\\frac{1}{x} = 4 - \\sqrt{15}\\) (since \\(16 - 15 = 1\\)), so \\(x + \\frac{1}{x} = 8\\) and \\(x \\cdot \\frac{1}{x} = 1\\). Questions on \\(x^2 + \\frac{1}{x^2}\\) or \\(x^3 + \\frac{1}{x^3}\\) then use the identities.\n" +
        "- **Sign check:** if the denominator is negative, as in \\(\\sqrt{2} - \\sqrt{3}\\), the answer is negative.",
      formula: {
        label: "Conjugate",
        latex: "(\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b \\qquad \\frac{1}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}",
      },
      authoredExample: {
        prompt: "Rationalise \\(\\frac{\\sqrt{5} + \\sqrt{2}}{\\sqrt{5} - \\sqrt{2}}\\).",
        steps: [
          "Multiply top and bottom by \\(\\sqrt{5} + \\sqrt{2}\\).",
          "Bottom: \\(5 - 2 = 3\\). Top: \\((\\sqrt{5} + \\sqrt{2})^2 = 7 + 2\\sqrt{10}\\).",
          "Value \\(= \\frac{7 + 2\\sqrt{10}}{3}\\). Check: \\(\\frac{3.650}{0.822} \\approx 4.44\\) and \\(\\frac{7 + 6.325}{3} \\approx 4.44\\).",
        ],
        answer: "\\(\\frac{7 + 2\\sqrt{10}}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{1}{4 - \\sqrt{15}} - \\frac{1}{\\sqrt{15} - \\sqrt{14}} + \\frac{1}{\\sqrt{14} - \\sqrt{13}}\\).",
        steps: [
          "In each denominator the two squares differ by 1, so each reciprocal is the conjugate.",
          "\\((4 + \\sqrt{15}) - (\\sqrt{15} + \\sqrt{14}) + (\\sqrt{14} + \\sqrt{13})\\).",
          "The \\(\\sqrt{15}\\) and \\(\\sqrt{14}\\) cancel, leaving \\(4 + \\sqrt{13}\\).",
        ],
        answer: "\\(4 + \\sqrt{13}\\)",
      },
      practiceSet: [
        { prompt: "What is \\((\\sqrt{11} + 3)(\\sqrt{11} - 3)\\)?", answer: "2" },
        { prompt: "Rationalise \\(\\frac{1}{\\sqrt{6} + \\sqrt{5}}\\).", answer: "\\(\\sqrt{6} - \\sqrt{5}\\)" },
        { prompt: "What is \\(\\frac{1}{\\sqrt{5} + 2} + \\frac{1}{\\sqrt{5} - 2}\\)?", answer: "\\(2\\sqrt{5}\\)" },
        { prompt: "If \\(x = 2 + \\sqrt{3}\\), what is \\(\\frac{1}{x}\\)?", answer: "\\(2 - \\sqrt{3}\\)", method: "\\((2 + \\sqrt{3})(2 - \\sqrt{3}) = 1\\)." },
      ],
      pyqExampleId: "bf05695e-0abc-4960-9d51-1425d85ecab0",
      traps: [
        {
          title: "Forgetting to divide by a minus b",
          body:
            "\\(\\frac{1}{\\sqrt{7} - \\sqrt{2}} = \\frac{\\sqrt{7} + \\sqrt{2}}{5}\\), not \\(\\sqrt{7} + \\sqrt{2}\\). The reciprocal is the bare conjugate only when the two squares differ by 1.",
        },
        {
          title: "Missing a negative denominator",
          body:
            "\\(\\frac{\\sqrt{3} + \\sqrt{5}}{\\sqrt{3} - \\sqrt{5}}\\) is negative, because \\(\\sqrt{3} < \\sqrt{5}\\). It equals \\(\\frac{8 + 2\\sqrt{15}}{-2} = -(4 + \\sqrt{15})\\), and the same value without its minus sign is the wrong option SSC likes to print.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsisu-compare",
      name: "Comparing sums and differences of surds",
      intuition:
        "Two surd sums can look almost equal. Since both are positive, square them: the whole numbers match and only the surd parts are left to compare. A difference of surds is easier after rationalising.",
      definition:
        "- **Sums:** \\((\\sqrt{a} + \\sqrt{b})^2 = (a + b) + 2\\sqrt{ab}\\). When \\(a + b = c + d\\), the sum with the **larger product** is larger, so the pair whose numbers are closer together wins.\n" +
        "- **Differences:** \\(\\sqrt{a} - \\sqrt{b} = \\frac{a - b}{\\sqrt{a} + \\sqrt{b}}\\). With the same \\(a - b\\), the difference of the larger numbers is the smaller one: \\(\\sqrt{11} - \\sqrt{10} < \\sqrt{3} - \\sqrt{2}\\).\n" +
        "- **Fast route:** use the decimal values of the roots. Three decimal places separate the options unless two sums agree to two places.\n" +
        "- Squaring keeps the order only when both sides are positive.",
      formula: {
        label: "Comparing surd sums and differences",
        latex: "(\\sqrt{a} + \\sqrt{b})^2 = (a + b) + 2\\sqrt{ab} \\qquad \\sqrt{a} - \\sqrt{b} = \\frac{a - b}{\\sqrt{a} + \\sqrt{b}}",
      },
      authoredExample: {
        prompt: "Which is larger: \\(\\sqrt{10} + \\sqrt{3}\\) or \\(\\sqrt{8} + \\sqrt{5}\\)?",
        steps: [
          "Both are positive, so square them: \\(13 + 2\\sqrt{30}\\) and \\(13 + 2\\sqrt{40}\\).",
          "\\(\\sqrt{40} > \\sqrt{30}\\), so \\(\\sqrt{8} + \\sqrt{5}\\) is larger.",
          "Decimal check: \\(3.162 + 1.732 = 4.894\\) and \\(2.828 + 2.236 = 5.064\\).",
        ],
        answer: "\\(\\sqrt{8} + \\sqrt{5}\\)",
      },
      selfCheckExample: {
        prompt: "Which is smaller: \\(\\sqrt{12} - \\sqrt{10}\\) or \\(\\sqrt{6} - 2\\)?",
        steps: [
          "Rationalise: \\(\\sqrt{12} - \\sqrt{10} = \\frac{2}{\\sqrt{12} + \\sqrt{10}}\\) and \\(\\sqrt{6} - 2 = \\frac{2}{\\sqrt{6} + 2}\\).",
          "Same top, and \\(\\sqrt{12} + \\sqrt{10}\\) is the larger bottom, so \\(\\sqrt{12} - \\sqrt{10}\\) is smaller.",
          "Decimal check: 0.302 against 0.449.",
        ],
        answer: "\\(\\sqrt{12} - \\sqrt{10}\\)",
      },
      practiceSet: [
        { prompt: "Which is larger, \\(\\sqrt{6} + \\sqrt{4}\\) or \\(\\sqrt{9} + \\sqrt{1}\\)?", answer: "\\(\\sqrt{6} + \\sqrt{4}\\)", method: "Same total 10 under the roots, and \\(6 \\times 4 > 9 \\times 1\\); in decimals 4.449 against 4." },
        { prompt: "Write \\(\\sqrt{7} - \\sqrt{5}\\) with no root on top.", answer: "\\(\\frac{2}{\\sqrt{7} + \\sqrt{5}}\\)" },
        { prompt: "Which is larger, \\(\\sqrt{15} - \\sqrt{14}\\) or \\(\\sqrt{3} - \\sqrt{2}\\)?", answer: "\\(\\sqrt{3} - \\sqrt{2}\\)" },
        { prompt: "Which is larger, \\(\\sqrt{2}\\) or 1.4?", answer: "\\(\\sqrt{2}\\), about 1.414" },
      ],
      pyqExampleId: "4a2c2804-4756-4400-adbf-25f48c5ebc8e",
      traps: [
        {
          title: "Calling two surd sums equal because the numbers under the roots add up the same",
          body:
            "\\(\\sqrt{7} + \\sqrt{1}\\) and \\(\\sqrt{4} + \\sqrt{4}\\) both have a total of 8 under the roots, but they are not equal: about 3.646 against 4. Equal totals say nothing; compare the products, 7 against 16.",
        },
        {
          title: "Squaring when a side may be negative",
          body:
            "Squaring keeps the order of positive numbers only: \\(-3 < 2\\) but \\(9 > 4\\). Check that both sides are positive before squaring them.",
        },
      ],
    },
  ],
};
