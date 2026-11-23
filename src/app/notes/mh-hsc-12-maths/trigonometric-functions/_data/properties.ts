import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_TF_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Inverse Trigonometric Functions",
  title: "Properties of Inverse Trigonometric Functions",
  oneLineDefinition:
    "The rules that combine inverse trigonometric functions: negative arguments, complementary pairs, the addition formula for tan⁻¹, changing one inverse function into another, and solving equations in them.",
  whyItMatters:
    "64 questions. Thirteen were set in board papers: prove sin⁻¹x + cos⁻¹x = π/2 (2023), evaluate an expression in sin⁻¹ (2026), the tan⁻¹ addition formula and 2 tan⁻¹(1/3) + cos⁻¹(3/5) = π/2 (2024, 2025), sums such as sin⁻¹(3/5) + cos⁻¹(12/13) = sin⁻¹(56/65) (2017, 2018, 2020, 2026), and equations in inverse functions (2016, 2022, 2024, 2026). The textbook adds substitutions and longer identities.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmtf-negatives-complements",
      name: "Negative arguments, reciprocals and complementary pairs",
      intuition:
        "Two facts do most of the work. A negative number either flips the sign of the angle (for functions whose branch is centred on 0) or gives \\(\\pi\\) minus the angle (for functions whose branch is \\([0, \\pi]\\)). And a function and its co-function always add to a right angle, just as \\(\\sin\\theta = \\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right)\\).",
      definition:
        "- **Negative arguments:** \\(\\sin^{-1}(-x) = -\\sin^{-1}x\\), \\(\\tan^{-1}(-x) = -\\tan^{-1}x\\), \\(\\operatorname{cosec}^{-1}(-x) = -\\operatorname{cosec}^{-1}x\\); but \\(\\cos^{-1}(-x) = \\pi - \\cos^{-1}x\\), \\(\\sec^{-1}(-x) = \\pi - \\sec^{-1}x\\), \\(\\cot^{-1}(-x) = \\pi - \\cot^{-1}x\\).\n" +
        "- **Complementary pairs:** \\(\\sin^{-1}x + \\cos^{-1}x = \\dfrac{\\pi}{2}\\) for \\(-1 \\le x \\le 1\\); \\(\\tan^{-1}x + \\cot^{-1}x = \\dfrac{\\pi}{2}\\) for every real \\(x\\); \\(\\operatorname{cosec}^{-1}x + \\sec^{-1}x = \\dfrac{\\pi}{2}\\) for \\(|x| \\ge 1\\).\n" +
        "- **Reciprocals:** \\(\\sin^{-1}x = \\operatorname{cosec}^{-1}\\dfrac{1}{x}\\) and \\(\\cos^{-1}x = \\sec^{-1}\\dfrac{1}{x}\\) for \\(-1 \\le x \\le 1\\), \\(x \\ne 0\\); \\(\\tan^{-1}x = \\cot^{-1}\\dfrac{1}{x}\\) if \\(x > 0\\), and \\(-\\pi + \\cot^{-1}\\dfrac{1}{x}\\) if \\(x < 0\\).\n" +
        "- **Proof of \\(\\sin^{-1}x + \\cos^{-1}x = \\dfrac{\\pi}{2}\\), step 1:** let \\(\\sin^{-1}x = \\theta\\), so \\(\\sin\\theta = x\\) with \\(-\\dfrac{\\pi}{2} \\le \\theta \\le \\dfrac{\\pi}{2}\\).\n" +
        "- **Step 2:** \\(\\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right) = \\sin\\theta = x\\), and \\(0 \\le \\dfrac{\\pi}{2} - \\theta \\le \\pi\\), the branch of \\(\\cos^{-1}\\).\n" +
        "- **Step 3:** so \\(\\cos^{-1}x = \\dfrac{\\pi}{2} - \\theta\\); adding \\(\\sin^{-1}x = \\theta\\) gives \\(\\dfrac{\\pi}{2}\\).",
      formula: {
        label: "Negative arguments and complementary pairs",
        latex:
          "\\sin^{-1}(-x) = -\\sin^{-1}x, \\quad \\cos^{-1}(-x) = \\pi - \\cos^{-1}x, \\quad \\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}, \\quad \\tan^{-1}x + \\cot^{-1}x = \\frac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\tan^{-1}(-1) + \\cos^{-1}\\left(-\\dfrac{1}{\\sqrt{2}}\\right)\\).",
        steps: [
          "\\(\\tan^{-1}(-1) = -\\tan^{-1}1 = -\\dfrac{\\pi}{4}\\).",
          "\\(\\cos^{-1}\\left(-\\dfrac{1}{\\sqrt{2}}\\right) = \\pi - \\cos^{-1}\\dfrac{1}{\\sqrt{2}} = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
          "Sum \\(= -\\dfrac{\\pi}{4} + \\dfrac{3\\pi}{4} = \\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\sec^{-1}\\left(-\\sqrt{2}\\right) + \\cot^{-1}(-1)\\).",
        steps: [
          "\\(\\sec^{-1}(-\\sqrt{2}) = \\pi - \\sec^{-1}\\sqrt{2} = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
          "\\(\\cot^{-1}(-1) = \\pi - \\cot^{-1}1 = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{3\\pi}{2}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\sin\\left(\\sin^{-1}\\dfrac{1}{3} + \\cos^{-1}\\dfrac{1}{3}\\right)\\).", answer: "\\(\\sin\\dfrac{\\pi}{2} = 1\\)" },
        { prompt: "Find \\(\\cot^{-1}\\left(-\\sqrt{3}\\right)\\).", answer: "\\(\\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}\\)" },
        { prompt: "If \\(\\tan^{-1}x = \\dfrac{\\pi}{10}\\), find \\(\\cot^{-1}x\\).", answer: "\\(\\dfrac{\\pi}{2} - \\dfrac{\\pi}{10} = \\dfrac{2\\pi}{5}\\)" },
      ],
      pyqExampleId: "57fe2a8a-93e0-40ed-92a5-b8e44f548f36",
      traps: [
        {
          title: "Treating cos⁻¹ like sin⁻¹ for a negative number",
          body: "\\(\\cos^{-1}(-x)\\) is \\(\\pi - \\cos^{-1}x\\), never \\(-\\cos^{-1}x\\): a negative angle is outside \\([0, \\pi]\\). The same holds for \\(\\sec^{-1}\\) and \\(\\cot^{-1}\\).",
        },
        {
          title: "A proof with no branch check",
          body: "Showing \\(\\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right) = x\\) is not enough. You must also show that \\(\\dfrac{\\pi}{2} - \\theta\\) lies in \\([0, \\pi]\\); only then is it \\(\\cos^{-1}x\\).",
        },
        {
          title: "Forgetting the domain",
          body: "\\(\\sin^{-1}x + \\cos^{-1}x = \\dfrac{\\pi}{2}\\) holds only for \\(-1 \\le x \\le 1\\). State the condition with the result.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-tan-addition",
      name: "The addition formula for tan⁻¹ and doubling",
      intuition:
        "The formula \\(\\tan(\\alpha + \\beta) = \\dfrac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}\\) turned round gives a way to add two inverse tangents. The only care needed is the size of the sum: if it passes \\(\\dfrac{\\pi}{2}\\), the formula alone gives a negative angle and \\(\\pi\\) has to be added back.",
      definition:
        "- If \\(x > 0\\), \\(y > 0\\) and \\(xy < 1\\): \\(\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\dfrac{x + y}{1 - xy}\\).\n" +
        "- If \\(x > 0\\), \\(y > 0\\) and \\(xy > 1\\): \\(\\tan^{-1}x + \\tan^{-1}y = \\pi + \\tan^{-1}\\dfrac{x + y}{1 - xy}\\).\n" +
        "- If \\(x > 0\\), \\(y > 0\\) and \\(xy = 1\\): \\(\\tan^{-1}x + \\tan^{-1}y = \\dfrac{\\pi}{2}\\).\n" +
        "- If \\(x > 0\\) and \\(y > 0\\): \\(\\tan^{-1}x - \\tan^{-1}y = \\tan^{-1}\\dfrac{x - y}{1 + xy}\\).\n" +
        "- **Doubling** (Miscellaneous Exercise): for \\(|x| < 1\\), \\(2\\tan^{-1}x = \\tan^{-1}\\dfrac{2x}{1 - x^2} = \\sin^{-1}\\dfrac{2x}{1 + x^2} = \\cos^{-1}\\dfrac{1 - x^2}{1 + x^2}\\).\n" +
        "- Three or more terms: combine two, then add the next.",
      formula: {
        label: "Adding two inverse tangents",
        latex: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\frac{x + y}{1 - xy} \\quad (x > 0,\\ y > 0,\\ xy < 1)",
      },
      authoredExample: {
        prompt: "Prove that \\(\\tan^{-1}2 + \\tan^{-1}3 = \\dfrac{3\\pi}{4}\\).",
        steps: [
          "Here \\(x = 2\\), \\(y = 3\\), both positive, and \\(xy = 6 > 1\\).",
          "So \\(\\tan^{-1}2 + \\tan^{-1}3 = \\pi + \\tan^{-1}\\dfrac{2 + 3}{1 - 6} = \\pi + \\tan^{-1}(-1)\\).",
          "\\(\\tan^{-1}(-1) = -\\dfrac{\\pi}{4}\\), so the sum is \\(\\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
        ],
        answer: "Hence proved: \\(\\tan^{-1}2 + \\tan^{-1}3 = \\dfrac{3\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan^{-1}3 - \\tan^{-1}\\dfrac{1}{2}\\).",
        steps: ["\\(\\tan^{-1}\\dfrac{3 - \\frac{1}{2}}{1 + \\frac{3}{2}} = \\tan^{-1}\\dfrac{5/2}{5/2} = \\tan^{-1}1\\)."],
        answer: "\\(\\dfrac{\\pi}{4}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(2\\tan^{-1}\\dfrac{1}{2}\\) as a single inverse tangent.", answer: "\\(\\tan^{-1}\\dfrac{1}{1 - 1/4} = \\tan^{-1}\\dfrac{4}{3}\\)" },
        { prompt: "Find \\(\\tan^{-1}\\dfrac{2}{3} + \\tan^{-1}\\dfrac{3}{2}\\).", answer: "\\(\\dfrac{\\pi}{2}\\), since the product is 1" },
        { prompt: "Which form of the addition formula applies to \\(\\tan^{-1}4 + \\tan^{-1}5\\)?", answer: "The \\(xy > 1\\) form: the sum is \\(\\pi + \\tan^{-1}\\left(-\\dfrac{9}{19}\\right)\\)" },
      ],
      pyqExampleId: "7f6bae9d-d9b9-47bf-a91c-39fda47bbbcb",
      traps: [
        {
          title: "Missing the π when xy > 1",
          body: "If \\(xy > 1\\) the two angles add to more than \\(\\dfrac{\\pi}{2}\\), while \\(\\tan^{-1}\\dfrac{x + y}{1 - xy}\\) is negative. Add \\(\\pi\\).",
        },
        {
          title: "Not stating the condition",
          body: "Write the line \"\\(xy < 1\\)\" (with the product worked out) before you use the formula. It is the step that shows the formula applies.",
        },
        {
          title: "Wrong sign in the difference formula",
          body: "For \\(\\tan^{-1}x - \\tan^{-1}y\\) the denominator is \\(1 + xy\\), with a plus.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-converting",
      name: "Changing one inverse function into another, and substitution",
      intuition:
        "An inverse value is just an angle. Give it a name, find all its ratios from one right triangle, and you can add it to any other angle with the compound angle formulae. For expressions in \\(x\\), put \\(x\\) equal to a ratio of a new angle so that an identity collapses the expression.",
      definition:
        "- Name each inverse value: \\(\\theta = \\cos^{-1}x\\) means \\(\\cos\\theta = x\\) with \\(\\theta\\) in the branch.\n" +
        "- Find its other ratios from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\). For a positive argument the angle is acute, so every ratio is positive.\n" +
        "- Combine with \\(\\sin(\\theta + \\phi) = \\sin\\theta\\cos\\phi + \\cos\\theta\\sin\\phi\\) or \\(\\cos(\\theta + \\phi) = \\cos\\theta\\cos\\phi - \\sin\\theta\\sin\\phi\\).\n" +
        "- **Check the branch:** \\(\\sin^{-1}\\) returns angles in \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\). A sum of two acute angles may be obtuse, so show \\(\\cos(\\theta + \\phi) > 0\\) before writing the sum as \\(\\sin^{-1}\\) of a number.\n" +
        "- **Substitution:** for an expression in \\(x\\), put \\(x = \\tan\\theta\\), \\(\\cos\\theta\\) or \\(\\cos 2\\theta\\), simplify with an identity, and use the given range of \\(x\\) to place \\(\\theta\\) in the branch.",
      formula: {
        label: "Compound angle formulae",
        latex: "\\sin(\\theta + \\phi) = \\sin\\theta\\cos\\phi + \\cos\\theta\\sin\\phi, \\qquad \\cos(\\theta + \\phi) = \\cos\\theta\\cos\\phi - \\sin\\theta\\sin\\phi",
      },
      authoredExample: {
        prompt: "Prove that \\(\\cos^{-1}\\dfrac{3}{5} + \\sin^{-1}\\dfrac{5}{13} = \\cos^{-1}\\dfrac{16}{65}\\).",
        steps: [
          "Let \\(\\theta = \\cos^{-1}\\dfrac{3}{5}\\): \\(\\cos\\theta = \\dfrac{3}{5}\\), \\(0 < \\theta < \\dfrac{\\pi}{2}\\), so \\(\\sin\\theta = \\sqrt{1 - \\dfrac{9}{25}} = \\dfrac{4}{5}\\).",
          "Let \\(\\phi = \\sin^{-1}\\dfrac{5}{13}\\): \\(\\sin\\phi = \\dfrac{5}{13}\\), \\(0 < \\phi < \\dfrac{\\pi}{2}\\), so \\(\\cos\\phi = \\sqrt{1 - \\dfrac{25}{169}} = \\dfrac{12}{13}\\).",
          "\\(\\cos(\\theta + \\phi) = \\cos\\theta\\cos\\phi - \\sin\\theta\\sin\\phi = \\dfrac{3}{5} \\cdot \\dfrac{12}{13} - \\dfrac{4}{5} \\cdot \\dfrac{5}{13} = \\dfrac{36 - 20}{65} = \\dfrac{16}{65}\\).",
          "\\(0 < \\theta + \\phi < \\pi\\), the branch of \\(\\cos^{-1}\\), so \\(\\theta + \\phi = \\cos^{-1}\\dfrac{16}{65}\\).",
        ],
        answer: "Hence proved",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan\\left(\\sin^{-1}\\dfrac{7}{25}\\right)\\).",
        steps: [
          "Let \\(\\theta = \\sin^{-1}\\dfrac{7}{25}\\), so \\(\\sin\\theta = \\dfrac{7}{25}\\) and \\(\\theta\\) is acute.",
          "\\(\\cos\\theta = \\sqrt{1 - \\dfrac{49}{625}} = \\dfrac{24}{25}\\), so \\(\\tan\\theta = \\dfrac{7}{24}\\).",
        ],
        answer: "\\(\\dfrac{7}{24}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\cos^{-1}\\dfrac{5}{13}\\) as an inverse tangent.", answer: "\\(\\tan^{-1}\\dfrac{12}{5}\\)" },
        { prompt: "Find \\(\\cos\\left(2\\sin^{-1}\\dfrac{1}{3}\\right)\\).", answer: "\\(1 - 2 \\times \\dfrac{1}{9} = \\dfrac{7}{9}\\)" },
        { prompt: "Simplify \\(\\cos^{-1}\\dfrac{1 - x^2}{1 + x^2}\\) for \\(0 \\le x \\le 1\\) by putting \\(x = \\tan\\theta\\).", answer: "\\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta = 2\\tan^{-1}x\\)" },
      ],
      pyqExampleId: "06a015b3-48a7-4630-8c78-9e2b2f7ed0fe",
      traps: [
        {
          title: "Skipping the branch check",
          body: "\\(\\sin(\\theta + \\phi)\\) equal to a number does not yet prove \\(\\theta + \\phi = \\sin^{-1}\\) of it. Show \\(\\cos(\\theta + \\phi) > 0\\), so the sum is acute.",
        },
        {
          title: "The negative root",
          body: "With a positive argument the angle is acute, so \\(\\cos\\theta = +\\sqrt{1 - \\sin^2\\theta}\\). Say why the root is positive.",
        },
        {
          title: "Dropping the range in a substitution",
          body: "After \\(x = \\tan\\theta\\), use the given range of \\(x\\) to find the range of \\(\\theta\\). Without it you cannot say that \\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-inverse-equations",
      name: "Solving equations in inverse trigonometric functions",
      intuition:
        "Use the properties to bring the equation to a single inverse function, then take the ratio of both sides and an ordinary equation in \\(x\\) is left. The last step is the one that earns the marks: every root must be put back into the original equation, because the formulae have conditions.",
      definition:
        "- Step 1: use the properties (complementary pairs, the addition formula) to get one inverse function on each side.\n" +
        "- Step 2: take \\(\\tan\\), \\(\\sin\\) or \\(\\cos\\) of both sides and solve the algebraic equation.\n" +
        "- Step 3: **check every root in the original equation.** Taking a ratio of both sides can add roots, and the addition formula needs its condition.\n" +
        "- A condition printed in the question (such as \\(x > 0\\)) is there to reject a root. Use it and say so.\n" +
        "- If one side is \\(\\dfrac{\\pi}{2}\\), do not take \\(\\tan\\) of it. Use \\(\\tan^{-1}x + \\cot^{-1}x = \\dfrac{\\pi}{2}\\) instead.",
      formula: {
        label: "Undoing an inverse function",
        latex: "\\tan(\\tan^{-1}x) = x, \\qquad \\sin(\\sin^{-1}x) = x \\ \\ (-1 \\le x \\le 1)",
      },
      authoredExample: {
        prompt: "Solve \\(\\sin^{-1}x + \\sin^{-1}(1 - x) = \\cos^{-1}x\\).",
        steps: [
          "\\(\\sin^{-1}(1 - x) = \\cos^{-1}x - \\sin^{-1}x = \\left(\\dfrac{\\pi}{2} - \\sin^{-1}x\\right) - \\sin^{-1}x = \\dfrac{\\pi}{2} - 2\\sin^{-1}x\\).",
          "Let \\(\\sin^{-1}x = \\alpha\\), so \\(x = \\sin\\alpha\\). Take the sine of both sides: \\(1 - x = \\sin\\left(\\dfrac{\\pi}{2} - 2\\alpha\\right) = \\cos 2\\alpha = 1 - 2\\sin^2\\alpha = 1 - 2x^2\\).",
          "\\(\\therefore 2x^2 - x = 0\\), so \\(x(2x - 1) = 0\\): \\(x = 0\\) or \\(x = \\dfrac{1}{2}\\).",
          "Check \\(x = 0\\): \\(0 + \\sin^{-1}1 = \\dfrac{\\pi}{2} = \\cos^{-1}0\\). True.",
          "Check \\(x = \\dfrac{1}{2}\\): \\(\\dfrac{\\pi}{6} + \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3} = \\cos^{-1}\\dfrac{1}{2}\\). True.",
        ],
        answer: "\\(x = 0\\) or \\(x = \\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sin^{-1}x = \\cos^{-1}x\\).",
        steps: ["\\(\\sin^{-1}x = \\dfrac{\\pi}{2} - \\sin^{-1}x\\), so \\(2\\sin^{-1}x = \\dfrac{\\pi}{2}\\) and \\(\\sin^{-1}x = \\dfrac{\\pi}{4}\\)."],
        answer: "\\(x = \\dfrac{1}{\\sqrt{2}}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\cos^{-1}x = \\dfrac{2\\pi}{3}\\).", answer: "\\(x = \\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}\\)" },
        { prompt: "Solve \\(\\sin\\left(\\sin^{-1}\\dfrac{1}{2} + \\cos^{-1}x\\right) = 1\\).", answer: "\\(\\cos^{-1}x = \\dfrac{\\pi}{2} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3}\\), so \\(x = \\dfrac{1}{2}\\)" },
        { prompt: "Solve \\(2\\tan^{-1}x = \\cos^{-1}\\dfrac{3}{5}\\).", answer: "\\(x = \\dfrac{1}{2}\\)", method: "\\(\\cos^{-1}\\dfrac{3}{5} = \\tan^{-1}\\dfrac{4}{3}\\), so \\(\\dfrac{2x}{1 - x^2} = \\dfrac{4}{3}\\), \\((2x - 1)(x + 2) = 0\\); \\(x = -2\\) is rejected as doubling needs \\(|x| < 1\\)." },
      ],
      pyqExampleId: "6c6735cb-2063-4d31-8588-b95d41056c1c",
      traps: [
        {
          title: "Stopping at the quadratic",
          body: "Both roots of the algebraic equation are only candidates. Put each one back into the original equation and keep only those that satisfy it.",
        },
        {
          title: "Ignoring the condition in the question",
          body: "A condition like \\(x > 0\\) or a range for \\(x\\) is given to reject a root. Reject it in writing, naming the condition.",
        },
        {
          title: "Taking tan of π/2",
          body: "\\(\\tan\\dfrac{\\pi}{2}\\) is not defined. When the right side is \\(\\dfrac{\\pi}{2}\\), move one term across and use a complementary pair.",
        },
      ],
    },
  ],
};
