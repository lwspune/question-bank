import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TG_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Simplifying and Proving Identities",
  title: "Simplifying and Proving Identities",
  oneLineDefinition:
    "Three Pythagorean identities and their rearrangements collapse long expressions to one ratio or one number; write everything in sine and cosine, use the sec-plus-tan pair, and test an easy angle when stuck.",
  whyItMatters:
    "25 questions in the Tier II bank, 10 EASY, 14 MODERATE and 1 HARD: the largest page of the chapter and the hardest. Nearly every answer is a single ratio or a number, so testing the options at 45 degrees is always open to you.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tgid-basic",
      name: "The three Pythagorean identities",
      intuition:
        "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is Pythagoras on a right triangle whose hypotenuse is 1. Divide it by \\(\\cos^2\\theta\\) or by \\(\\sin^2\\theta\\) and you get the other two. Almost every simplification in this chapter uses one of the three.",
      definition:
        "- \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\(\\sec^2\\theta - \\tan^2\\theta = 1\\), \\(\\text{cosec}^2\\theta - \\cot^2\\theta = 1\\).\n" +
        "- Rearranged: \\(1 - \\cos^2\\theta = \\sin^2\\theta\\), \\(\\sec^2\\theta - 1 = \\tan^2\\theta\\), \\(1 + \\cot^2\\theta = \\text{cosec}^2\\theta\\).\n" +
        "- \\(\\tan\\theta + \\cot\\theta = \\sec\\theta\\,\\text{cosec}\\,\\theta = \\frac{1}{\\sin\\theta\\cos\\theta}\\).\n" +
        "- \\(\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta\\) and \\(\\text{cosec}\\,\\theta - \\sin\\theta = \\cos\\theta\\cot\\theta\\).\n" +
        "- **Check by a value:** put \\(\\theta = 45^\\circ\\) (or 30°) into the stem and each option. The right option gives the same number.",
      formula: {
        label: "The Pythagorean identities",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad \\sec^2\\theta - \\tan^2\\theta = 1, \\quad \\text{cosec}^2\\theta - \\cot^2\\theta = 1",
      },
      authoredExample: {
        prompt: "Simplify \\((1 - \\sin^2\\theta)(1 + \\tan^2\\theta)\\).",
        steps: ["\\(1 - \\sin^2\\theta = \\cos^2\\theta\\) and \\(1 + \\tan^2\\theta = \\sec^2\\theta\\).", "\\(\\cos^2\\theta \\times \\sec^2\\theta = 1\\)."],
        answer: "1",
      },
      selfCheckExample: {
        prompt: "Simplify \\((\\text{cosec}\\,\\theta - \\sin\\theta)(\\sec\\theta - \\cos\\theta)(\\tan\\theta + \\cot\\theta)\\).",
        steps: [
          "The first two brackets are \\(\\frac{\\cos^2\\theta}{\\sin\\theta}\\) and \\(\\frac{\\sin^2\\theta}{\\cos\\theta}\\); their product is \\(\\sin\\theta\\cos\\theta\\).",
          "The last bracket is \\(\\frac{1}{\\sin\\theta\\cos\\theta}\\), so the whole product is 1.",
        ],
        answer: "1",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sin\\theta\\cot\\theta\\).", answer: "\\(\\cos\\theta\\)" },
        { prompt: "Simplify \\((\\sec^2\\theta - 1)\\cot^2\\theta\\).", answer: "1" },
        { prompt: "Simplify \\((1 + \\cot^2\\theta)\\sin^2\\theta\\).", answer: "1" },
      ],
      pyqExampleId: "3f419737-0749-4be1-8693-8b2d4fdb31a4",
      traps: [
        {
          title: "Pairing the wrong two ratios",
          body: "The identities pair sine with cosine, secant with tangent, cosecant with cotangent. \\(\\sec^2\\theta + \\cos^2\\theta\\) is not 1; at 0° it is 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgid-simplify",
      name: "Long expressions: rewrite in sine and cosine",
      intuition:
        "A long expression becomes short work once every ratio is written in \\(\\sin\\theta\\) and \\(\\cos\\theta\\). Factor what you can, cancel, and let the identities collapse what is left.",
      definition:
        "- Write \\(\\tan = \\frac{s}{c}\\), \\(\\sec = \\frac{1}{c}\\), \\(\\text{cosec} = \\frac{1}{s}\\), \\(\\cot = \\frac{c}{s}\\), with \\(s, c\\) for \\(\\sin\\theta, \\cos\\theta\\).\n" +
        "- \\(\\sin^4\\theta + \\cos^4\\theta = 1 - 2s^2c^2\\) and \\(\\sin^6\\theta + \\cos^6\\theta = 1 - 3s^2c^2\\).\n" +
        "- \\(\\cos^4\\theta - \\sin^4\\theta = \\cos^2\\theta - \\sin^2\\theta\\) (difference of squares, then the identity).\n" +
        "- \\((1 + s)(1 - s) = c^2\\), and \\((\\sec\\theta - \\tan\\theta)(1 + \\sin\\theta) = \\cos\\theta\\).\n" +
        "- \\(2 + \\tan^2\\theta + \\cot^2\\theta = (\\tan\\theta + \\cot\\theta)^2 = \\sec^2\\theta\\,\\text{cosec}^2\\theta\\).\n" +
        "- If a stem gives \\(\\frac{a}{b} = \\frac{1 + s}{1 - s}\\), then \\(\\frac{a + b}{a - b} = \\frac{1}{s}\\) (add and subtract top and bottom).",
      formula: {
        label: "Fourth and sixth powers",
        latex: "\\sin^4\\theta + \\cos^4\\theta = 1 - 2\\sin^2\\theta\\cos^2\\theta, \\quad \\sin^6\\theta + \\cos^6\\theta = 1 - 3\\sin^2\\theta\\cos^2\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{\\sin^4\\theta - \\cos^4\\theta + 1}{\\sin^2\\theta}\\).",
        steps: [
          "\\(\\sin^4\\theta - \\cos^4\\theta = (\\sin^2\\theta - \\cos^2\\theta)(\\sin^2\\theta + \\cos^2\\theta) = \\sin^2\\theta - \\cos^2\\theta\\).",
          "Adding 1, written as \\(\\sin^2\\theta + \\cos^2\\theta\\), gives \\(2\\sin^2\\theta\\).",
          "Divided by \\(\\sin^2\\theta\\): 2.",
        ],
        answer: "2",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\frac{\\sin^6\\theta + \\cos^6\\theta - 1}{\\sin^2\\theta\\cos^2\\theta}\\).",
        steps: ["The numerator is \\(1 - 3\\sin^2\\theta\\cos^2\\theta - 1 = -3\\sin^2\\theta\\cos^2\\theta\\).", "Divided by \\(\\sin^2\\theta\\cos^2\\theta\\): \\(-3\\)."],
        answer: "\\(-3\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\((1 - \\sin\\theta)(\\sec\\theta + \\tan\\theta)\\).", answer: "\\(\\cos\\theta\\)" },
        { prompt: "Simplify \\((\\tan\\theta + \\cot\\theta)\\sin\\theta\\cos\\theta\\).", answer: "1" },
        { prompt: "Simplify \\((\\sin\\theta + \\cos\\theta)^2 + (\\sin\\theta - \\cos\\theta)^2\\).", answer: "2" },
      ],
      pyqExampleId: "63575563-3864-4438-bfbc-bc41248e563a",
      traps: [
        {
          title: "Squaring a sum as if it were 1",
          body: "\\((\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta\\), not 1. Only the sum of the SQUARES is 1.",
        },
        {
          title: "Expanding before looking for an identity",
          body: "Multiplying out a long product first usually makes it longer. Look for \\(1 - \\sin^2\\theta\\), \\(\\sec^2\\theta - \\tan^2\\theta\\) or a difference of squares, and cancel before you expand.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgid-reciprocal",
      name: "The sec-plus-tan and cosec-plus-cot pairs",
      intuition:
        "Because \\(\\sec^2\\theta - \\tan^2\\theta = 1\\) factors as \\((\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta) = 1\\), the two brackets are each other's reciprocals. Know one and you know the other; adding and subtracting them gives \\(\\sec\\theta\\) and \\(\\tan\\theta\\).",
      definition:
        "- \\((\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1\\) and \\((\\text{cosec}\\,\\theta + \\cot\\theta)(\\text{cosec}\\,\\theta - \\cot\\theta) = 1\\).\n" +
        "- If \\(\\sec\\theta + \\tan\\theta = k\\), then \\(\\sec\\theta - \\tan\\theta = \\frac{1}{k}\\), so \\(\\sec\\theta = \\frac{1}{2}\\left(k + \\frac{1}{k}\\right)\\) and \\(\\tan\\theta = \\frac{1}{2}\\left(k - \\frac{1}{k}\\right)\\).\n" +
        "- \\(\\sec\\theta + \\tan\\theta = \\frac{1 + \\sin\\theta}{\\cos\\theta}\\), so \\(\\frac{\\sec\\theta - \\tan\\theta}{\\sec\\theta + \\tan\\theta} = \\frac{1 - \\sin\\theta}{1 + \\sin\\theta}\\).\n" +
        "- In \\(\\frac{\\tan\\theta + \\sec\\theta - 1}{\\tan\\theta - \\sec\\theta + 1}\\), replace the 1 on top by \\(\\sec^2\\theta - \\tan^2\\theta\\) and factor.",
      formula: {
        label: "The reciprocal pair",
        latex: "(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1",
      },
      authoredExample: {
        prompt: "If \\(\\sec\\theta + \\tan\\theta = 3\\), find \\(\\sin\\theta\\).",
        steps: [
          "\\(\\sec\\theta - \\tan\\theta = \\frac{1}{3}\\).",
          "\\(\\sec\\theta = \\frac{1}{2}\\left(3 + \\frac{1}{3}\\right) = \\frac{5}{3}\\) and \\(\\tan\\theta = \\frac{1}{2}\\left(3 - \\frac{1}{3}\\right) = \\frac{4}{3}\\).",
          "\\(\\sin\\theta = \\frac{\\tan\\theta}{\\sec\\theta} = \\frac{4}{5}\\).",
        ],
        answer: "\\(\\frac{4}{5}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\text{cosec}\\,\\theta - \\cot\\theta = \\frac{1}{4}\\), find \\(\\cos\\theta\\).",
        steps: [
          "\\(\\text{cosec}\\,\\theta + \\cot\\theta = 4\\).",
          "\\(\\text{cosec}\\,\\theta = \\frac{17}{8}\\) and \\(\\cot\\theta = \\frac{15}{8}\\), so \\(\\cos\\theta = \\frac{\\cot\\theta}{\\text{cosec}\\,\\theta} = \\frac{15}{17}\\).",
        ],
        answer: "\\(\\frac{15}{17}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sec\\theta - \\tan\\theta = \\frac{1}{2}\\), find \\(\\sec\\theta + \\tan\\theta\\).", answer: "2" },
        { prompt: "If \\(\\frac{1 - \\sin\\theta}{1 + \\sin\\theta} = \\frac{1}{4}\\), find \\(\\sin\\theta\\).", answer: "\\(\\frac{3}{5}\\)" },
        { prompt: "Simplify \\(\\frac{1}{\\sec\\theta - \\tan\\theta} - \\tan\\theta\\).", answer: "\\(\\sec\\theta\\)" },
      ],
      pyqExampleId: "6fa339dc-d110-4877-8083-32d17067188f",
      traps: [
        {
          title: "Inverting term by term",
          body: "\\(\\frac{1}{\\sec\\theta - \\tan\\theta}\\) is \\(\\sec\\theta + \\tan\\theta\\), not \\(\\cos\\theta - \\cot\\theta\\). A reciprocal of a difference is never the difference of reciprocals.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgid-eliminate",
      name: "Eliminating the angle from two equations",
      intuition:
        "When two equations both contain the angle, square or combine them so that the angle's ratios form an identity equal to 1. What is left is a relation between the letters alone.",
      definition:
        "- \\(x = a\\sec\\theta\\), \\(y = b\\tan\\theta\\) give \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\).\n" +
        "- \\(x = a\\cos\\theta\\), \\(y = b\\sin\\theta\\) give \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\).\n" +
        "- When two squared equations are added or subtracted, choose the sign that makes the cross terms cancel.\n" +
        "- Quick check: give the angle an easy value, such as 90° or 45°, and test the options.",
      formula: {
        label: "Removing the angle",
        latex: "x = a\\sec\\theta,\\; y = b\\tan\\theta \\;\\Rightarrow\\; \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1",
      },
      authoredExample: {
        prompt: "If \\(x = 2\\sec\\theta\\) and \\(y = 3\\tan\\theta\\), find \\(9x^2 - 4y^2\\).",
        steps: ["\\(9x^2 = 36\\sec^2\\theta\\) and \\(4y^2 = 36\\tan^2\\theta\\).", "\\(9x^2 - 4y^2 = 36(\\sec^2\\theta - \\tan^2\\theta) = 36\\)."],
        answer: "36",
      },
      selfCheckExample: {
        prompt: "If \\(a = \\sin\\theta + \\cos\\theta\\) and \\(b = \\sin\\theta - \\cos\\theta\\), find \\(a^2 + b^2\\).",
        steps: ["\\(a^2 = 1 + 2\\sin\\theta\\cos\\theta\\) and \\(b^2 = 1 - 2\\sin\\theta\\cos\\theta\\).", "The cross terms cancel: \\(a^2 + b^2 = 2\\)."],
        answer: "2",
      },
      practiceSet: [
        { prompt: "If \\(x = 5\\cos\\theta\\) and \\(y = 5\\sin\\theta\\), find \\(x^2 + y^2\\).", answer: "25" },
        { prompt: "If \\(p = \\sec\\theta + \\tan\\theta\\) and \\(q = \\sec\\theta - \\tan\\theta\\), find \\(pq\\).", answer: "1" },
        { prompt: "If \\(x = a\\,\\text{cosec}\\,\\theta\\) and \\(y = a\\cot\\theta\\), find \\(x^2 - y^2\\).", answer: "\\(a^2\\)" },
      ],
      pyqExampleId: "b51f01a1-bc98-4da1-8c2d-30f150f695f6",
      traps: [
        {
          title: "Choosing the sign that keeps the cross terms",
          body: "Squaring \\(\\sin\\theta + \\cos\\theta\\) and \\(\\sin\\theta - \\cos\\theta\\) gives \\(\\pm 2\\sin\\theta\\cos\\theta\\). Adding the squares removes them; subtracting doubles them. Pick the sign that removes the angle.",
        },
      ],
    },
  ],
};
