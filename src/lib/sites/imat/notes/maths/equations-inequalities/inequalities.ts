import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_EQI_INEQUALITIES_NOTE: SubtopicNote = {
  subtopicName: "Inequalities",
  title: "Linear, Quadratic, Fractional and Absolute Value Inequalities",
  oneLineDefinition:
    "An inequality is solved like an equation, except that multiplying by a negative flips it; quadratic and fractional inequalities are read from a sign chart.",
  whyItMatters:
    "Inequalities are the most asked topic in this chapter since 2023: quadratic inequalities in 2023 and 2026, a pair of linear inequalities in 2023, and a fraction containing an absolute value in 2024. Older papers (2012, 2013) combined a quadratic and a linear inequality.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-eqi-linear-inequalities",
      name: "Linear inequalities and systems of inequalities",
      intuition:
        "Adding or subtracting the same number keeps an inequality true, and so does multiplying by a positive number. Multiplying by a negative number reverses the order: 2 < 3, but \\(-2 > -3\\). That single rule is the whole difference from solving an equation.",
      definition:
        "- Solve as for a linear equation, but **reverse the sign** whenever you multiply or divide both sides by a negative number.\n" +
        "- A **system** (both conditions must hold) is solved one inequality at a time, then the solution sets are **intersected** on a number line.\n" +
        "- Conditions joined by **or** give the **union** of the solution sets.\n" +
        "- An empty intersection means no solution (\\(\\varnothing\\)); an inequality that reduces to a true statement such as \\(0 < 4\\) holds for every real \\(x\\) (\\(\\mathbb{R}\\)).",
      formula: {
        label: "Multiplying by a negative number",
        latex: "a < b \\;\\text{and}\\; c < 0 \\;\\Rightarrow\\; ac > bc",
      },
      authoredExample: {
        prompt: "(a) Solve \\(\\dfrac{x + 4}{2} - \\dfrac{2x - 1}{3} > 1\\). (b) Solve the system \\(3 - 2x \\le 7\\) and \\(5x - 4 < 2x + 11\\).",
        steps: [
          "(a) Multiply by 6 (positive): \\(3(x + 4) - 2(2x - 1) > 6\\), so \\(-x + 14 > 6\\) and \\(-x > -8\\).",
          "Divide by \\(-1\\) and reverse the sign: \\(x < 8\\).",
          "(b) First: \\(-2x \\le 4\\), so \\(x \\ge -2\\) (reversed). Second: \\(3x < 15\\), so \\(x < 5\\).",
          "Both must hold: \\(-2 \\le x < 5\\), the interval \\([-2, 5)\\).",
        ],
        answer: "(a) \\(x < 8\\); (b) \\(-2 \\le x < 5\\)",
      },
      selfCheckExample: {
        prompt: "What is the complete set of values of \\(x\\) for which \\(5 - 3x < 11\\) and \\(4x - 1 \\le 2x + 7\\)?",
        options: [
          "\\(x \\le 4\\)",
          "\\(x < -2\\) or \\(x > 4\\)",
          "\\(-2 < x \\le 4\\)",
          "\\(-2 \\le x < 4\\)",
          "\\(x > -2\\)",
        ],
        steps: [
          "First: \\(-3x < 6\\); divide by \\(-3\\) and reverse: \\(x > -2\\).",
          "Second: \\(2x \\le 8\\), so \\(x \\le 4\\).",
          "Both together: \\(-2 < x \\le 4\\). Options A and E give one condition only; B forgets to reverse the first sign; D puts the equality on the wrong ends.",
        ],
        answer: "(C) \\(-2 < x \\le 4\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(-4x \\ge 12\\).", answer: "\\(x \\le -3\\)" },
        { prompt: "Solve \\(2(x - 1) > 5x + 7\\).", answer: "\\(x < -3\\)", method: "\\(-3x > 9\\)" },
        { prompt: "Solve the system \\(x > 1\\) and \\(x < 0\\).", answer: "No solution, \\(\\varnothing\\)" },
        { prompt: "Solve \\(7x - 3 \\le 7x + 1\\).", answer: "Every real \\(x\\)", method: "It reduces to \\(-3 \\le 1\\), always true" },
      ],
      traps: [
        {
          title: "Dividing by a negative reverses the sign",
          body: "From \\(-3x < 6\\) the answer is \\(x > -2\\), not \\(x < -2\\). The unreversed answer is always among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-quadratic-inequalities",
      name: "Quadratic inequalities with a sign chart",
      intuition:
        "The graph of \\(ax^2 + bx + c\\) with \\(a > 0\\) is a parabola opening upwards. It is below the axis only between its roots and above it outside them. So find the roots, and the shape tells you the answer. With no roots the parabola never crosses the axis, so its sign never changes.",
      definition:
        "- Move everything to one side so the other side is 0. If \\(a < 0\\), multiply by \\(-1\\) and reverse the sign.\n" +
        "- With \\(a > 0\\) and roots \\(x_1 < x_2\\): the expression is **negative between** the roots and **positive outside** them.\n" +
        "- **\\(\\Delta < 0\\)**: always positive. So \\(> 0\\) holds for all of \\(\\mathbb{R}\\), and \\(< 0\\) has no solution.\n" +
        "- **\\(\\Delta = 0\\)**: \\(a(x - r)^2\\) is positive except at \\(x = r\\), where it is 0.\n" +
        "- Include the roots for \\(\\le\\) and \\(\\ge\\); exclude them for \\(<\\) and \\(>\\).",
      formula: {
        label: "Sign of a quadratic with a > 0 and roots x₁ < x₂",
        latex: "a(x - x_1)(x - x_2) < 0 \\;\\text{for}\\; x_1 < x < x_2, \\qquad > 0 \\;\\text{for}\\; x < x_1 \\;\\text{or}\\; x > x_2",
      },
      authoredExample: {
        prompt: "Solve (a) \\(x^2 - x - 12 > 0\\), (b) \\(-x^2 + 4x - 5 < 0\\).",
        steps: [
          "(a) \\((x - 4)(x + 3) > 0\\). Roots \\(-3\\) and 4; positive outside: \\(x < -3\\) or \\(x > 4\\).",
          "(b) Multiply by \\(-1\\) and reverse: \\(x^2 - 4x + 5 > 0\\).",
          "\\(\\Delta = 16 - 20 = -4 < 0\\), so \\(x^2 - 4x + 5\\) is always positive: every real \\(x\\) is a solution.",
        ],
        answer: "(a) \\(x < -3\\) or \\(x > 4\\); (b) \\(\\mathbb{R}\\)",
      },
      selfCheckExample: {
        prompt: "What is the solution set of \\(2x^2 - 5x - 3 \\ge 0\\)?",
        options: [
          "\\(-\\frac{1}{2} \\le x \\le 3\\)",
          "\\(x \\le -\\frac{1}{2}\\) or \\(x \\ge 3\\)",
          "\\(x \\le -3\\) or \\(x \\ge \\frac{1}{2}\\)",
          "\\(x \\ge 3\\)",
          "\\(\\mathbb{R}\\)",
        ],
        steps: [
          "\\(2x^2 - 5x - 3 = (2x + 1)(x - 3)\\), with roots \\(-\\frac{1}{2}\\) and 3.",
          "\\(a = 2 > 0\\), so the expression is \\(\\ge 0\\) outside the roots, endpoints included.",
          "Option A is the region where it is negative; C has the signs of the roots swapped; D keeps only one half.",
        ],
        answer: "(B) \\(x \\le -\\frac{1}{2}\\) or \\(x \\ge 3\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(x^2 < 16\\).", answer: "\\(-4 < x < 4\\)" },
        { prompt: "Solve \\(x^2 - 6x + 9 > 0\\).", answer: "Every \\(x \\ne 3\\)", method: "\\((x - 3)^2 > 0\\)" },
        { prompt: "Solve \\(x^2 + x + 2 \\le 0\\).", answer: "No solution", method: "\\(\\Delta = -7\\), always positive" },
        { prompt: "Solve \\(x^2 \\ge 5x\\).", answer: "\\(x \\le 0\\) or \\(x \\ge 5\\)", method: "\\(x(x - 5) \\ge 0\\)" },
      ],
      traps: [
        {
          title: "x² < 16 is not x < 4",
          body: "Taking the square root of both sides loses the negative half: \\(x = -10\\) satisfies \\(x < 4\\) but not \\(x^2 < 16\\). Write \\((x - 4)(x + 4) < 0\\) and read the answer \\(-4 < x < 4\\) from the sign chart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-fractional-inequalities",
      name: "Fractional inequalities: signs of numerator and denominator",
      intuition:
        "You cannot multiply both sides by a denominator such as \\(x - 1\\) without knowing its sign, because a negative one would reverse the inequality. Instead, keep the fraction and ask when it is positive: when the top and bottom have the same sign.",
      definition:
        "- Move everything to one side and combine into a single fraction \\(\\frac{N(x)}{D(x)}\\) compared with 0.\n" +
        "- Find where \\(N = 0\\) and where \\(D = 0\\); mark them on a number line and record the sign of each factor in each region.\n" +
        "- The fraction is positive where \\(N\\) and \\(D\\) have the same sign, negative where they differ.\n" +
        "- Zeros of \\(D\\) are **always excluded**. Zeros of \\(N\\) are included only for \\(\\le\\) or \\(\\ge\\).\n" +
        "- A factor that is always positive (such as \\(x^2 + 1\\)) never changes the sign: ignore it.",
      authoredExample: {
        prompt: "Solve \\(\\dfrac{2x + 1}{x - 1} < 1\\).",
        steps: [
          "Bring 1 to the left: \\(\\dfrac{2x + 1 - (x - 1)}{x - 1} < 0\\), that is \\(\\dfrac{x + 2}{x - 1} < 0\\).",
          "Critical points: \\(x = -2\\) (top) and \\(x = 1\\) (bottom).",
          "For \\(x < -2\\) both are negative: fraction positive. For \\(-2 < x < 1\\): top positive, bottom negative: fraction negative. For \\(x > 1\\): both positive.",
          "Negative region: \\(-2 < x < 1\\).",
        ],
        answer: "\\(-2 < x < 1\\)",
      },
      selfCheckExample: {
        prompt: "What is the solution set of \\(\\dfrac{x + 4}{2 - x} \\le 0\\)?",
        options: [
          "\\(-4 \\le x < 2\\)",
          "\\(x \\le -4\\) or \\(x \\ge 2\\)",
          "\\(x \\le -4\\) or \\(x > 2\\)",
          "\\(x < -4\\) or \\(x > 2\\)",
          "\\(x \\le -4\\)",
        ],
        steps: [
          "Top is zero at \\(x = -4\\); bottom is zero at \\(x = 2\\), which is excluded.",
          "For \\(x < -4\\): top negative, bottom positive, so the fraction is negative. For \\(-4 < x < 2\\): both positive. For \\(x > 2\\): top positive, bottom negative, so negative.",
          "Include \\(x = -4\\) (the fraction is 0) but never \\(x = 2\\). Option B includes the forbidden 2; A is the region where the fraction is positive; E comes from multiplying by \\(2 - x\\) as if it were always positive.",
        ],
        answer: "(C) \\(x \\le -4\\) or \\(x > 2\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\dfrac{x - 3}{x + 2} \\ge 0\\).", answer: "\\(x < -2\\) or \\(x \\ge 3\\)" },
        { prompt: "Solve \\(\\frac{1}{x} > 0\\).", answer: "\\(x > 0\\)" },
        { prompt: "Solve \\(\\dfrac{x^2 + 1}{x - 5} < 0\\).", answer: "\\(x < 5\\)", method: "The top is always positive" },
        { prompt: "Solve \\(\\dfrac{3}{x - 1} < 1\\).", answer: "\\(x < 1\\) or \\(x > 4\\)", method: "\\(\\frac{4 - x}{x - 1} < 0\\)" },
      ],
      traps: [
        {
          title: "Do not multiply by a denominator of unknown sign",
          body: "Multiplying \\(\\frac{3}{x - 1} < 1\\) by \\(x - 1\\) assumes \\(x - 1 > 0\\) and loses every solution with \\(x < 1\\). Bring everything to one side and use a sign chart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-abs-inequalities",
      name: "Inequalities with absolute value",
      intuition:
        "\\(|A| < k\\) says A is less than \\(k\\) away from 0, so A lies in one piece between \\(-k\\) and \\(k\\). \\(|A| > k\\) says A is more than \\(k\\) away, so A lies in one of two outer pieces. (Absolute value is defined in Numbers, Powers and Logarithms.)",
      definition:
        "For \\(k > 0\\):\n" +
        "- \\(|A| < k\\) means \\(-k < A < k\\): one interval.\n" +
        "- \\(|A| > k\\) means \\(A < -k\\) or \\(A > k\\): two intervals.\n" +
        "- For \\(k < 0\\): \\(|A| < k\\) has no solution and \\(|A| > k\\) holds wherever \\(A\\) is defined.\n" +
        "- \\(|A| \\ge 0\\) always, and \\(|A| = 0\\) only where \\(A = 0\\). So in a fraction, a numerator like \\(|A| + 1\\) is always positive and only the denominator decides the sign.",
      formula: {
        label: "Absolute value inequalities (k > 0)",
        latex: "|A| < k \\;\\Leftrightarrow\\; -k < A < k \\qquad |A| > k \\;\\Leftrightarrow\\; A < -k \\;\\text{or}\\; A > k",
      },
      authoredExample: {
        prompt: "Solve (a) \\(|2x - 1| \\le 5\\), (b) \\(|x + 2| > 3\\).",
        steps: [
          "(a) \\(-5 \\le 2x - 1 \\le 5\\). Add 1: \\(-4 \\le 2x \\le 6\\). Halve: \\(-2 \\le x \\le 3\\).",
          "(b) \\(x + 2 > 3\\) gives \\(x > 1\\); \\(x + 2 < -3\\) gives \\(x < -5\\).",
          "So (b) is \\(x < -5\\) or \\(x > 1\\): two separate pieces.",
        ],
        answer: "(a) \\(-2 \\le x \\le 3\\); (b) \\(x < -5\\) or \\(x > 1\\)",
      },
      selfCheckExample: {
        prompt: "How many integers \\(x\\) satisfy \\(|3x - 2| < 7\\)?",
        options: ["3", "5", "4", "6", "7"],
        steps: [
          "\\(-7 < 3x - 2 < 7\\), so \\(-5 < 3x < 9\\) and \\(-\\frac{5}{3} < x < 3\\).",
          "The integers in this range are \\(-1, 0, 1, 2\\): four of them.",
          "Option B counts 3 as well, but \\(x < 3\\) is strict (\\(|3 \\cdot 3 - 2| = 7\\) is not less than 7).",
        ],
        answer: "(C) 4",
      },
      practiceSet: [
        { prompt: "Solve \\(|x| < 4\\).", answer: "\\(-4 < x < 4\\)" },
        { prompt: "Solve \\(|x - 3| \\ge 2\\).", answer: "\\(x \\le 1\\) or \\(x \\ge 5\\)" },
        { prompt: "Solve \\(|x + 1| < -2\\).", answer: "No solution", method: "An absolute value is never negative" },
        { prompt: "Solve \\(\\dfrac{|x| + 1}{x - 2} > 0\\).", answer: "\\(x > 2\\)", method: "The top is always positive" },
      ],
      traps: [
        {
          title: "Greater than gives two pieces, not one",
          body: "\\(|x + 2| > 3\\) is \\(x < -5\\) or \\(x > 1\\). Writing it as \\(-5 > x > 1\\) describes no number at all. Only the less-than form gives a single interval.",
        },
      ],
    },
  ],
};
