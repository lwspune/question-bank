import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_MONOTONIC_NOTE: SubtopicNote = {
  subtopicName: "Increasing and Decreasing Functions",
  title: "Increasing and Decreasing Functions",
  oneLineDefinition:
    "A function is increasing where its derivative is positive and decreasing where its derivative is negative, so the sign of f'(x) decides it.",
  whyItMatters:
    "28 questions, six of them from board papers, all short written answers: whether x − 1/x is increasing or decreasing (2017, 2026), showing that tan x is increasing on (0, π/2) (2022), showing that x³ + 10x + 7 is strictly increasing (2023), writing the condition for a strictly increasing function (2025) and testing x³ + 6x² + 12x − 7 (2026). The textbook rows are Exercise 2.4 Q.1 to Q.8, Q.23 and Q.24, the solved examples of section 2.4.1 and three Miscellaneous Exercise questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-sign",
      name: "The derivative test for increasing and decreasing",
      intuition:
        "If the tangent slopes upwards at every point, the graph climbs as you move to the right: the function is increasing. So to show a function is increasing, show that its derivative is positive, and give the reason, such as a square that can never be negative.",
      definition:
        "- **Strictly increasing on \\((a, b)\\):** \\(x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)\\).\n" +
        "- **Strictly decreasing on \\((a, b)\\):** \\(x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)\\).\n" +
        "- If \\(f'(x) > 0\\) on an interval, \\(f\\) is strictly increasing there; if \\(f'(x) < 0\\), strictly decreasing.\n" +
        "- Where \\(f'(x) = 0\\) the tangent is parallel to the X-axis, and the test says nothing at that point.\n" +
        "- Useful reasons: \\(x^2 \\geq 0\\), \\(e^{x} > 0\\), \\(-1 \\leq \\cos x \\leq 1\\), \\(\\sec^2 x \\geq 1\\).\n" +
        "- If the domain has a gap (such as \\(x \\neq 0\\)), state the result on each piece separately.",
      formula: {
        label: "Sign of the derivative",
        latex: "f'(x) > 0 \\Rightarrow f \\text{ is increasing}, \\qquad f'(x) < 0 \\Rightarrow f \\text{ is decreasing}",
      },
      authoredExample: {
        prompt: "Show that \\(f(x) = 2x + \\sin x\\) is strictly increasing for all \\(x \\in R\\).",
        steps: [
          "\\(f'(x) = 2 + \\cos x\\).",
          "Since \\(-1 \\leq \\cos x \\leq 1\\), we get \\(2 + \\cos x \\geq 2 - 1 = 1\\).",
          "So \\(f'(x) \\geq 1 > 0\\) for every \\(x \\in R\\).",
        ],
        answer: "\\(f'(x) > 0\\) for all \\(x\\), so \\(f\\) is strictly increasing on \\(R\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(f(x) = 5 - 3x\\) increasing or decreasing?",
        steps: ["\\(f'(x) = -3 < 0\\) for all \\(x\\)."],
        answer: "Decreasing",
      },
      practiceSet: [
        { prompt: "Show that \\(f(x) = e^{x}\\) is increasing for all \\(x\\).", answer: "\\(f'(x) = e^{x} > 0\\) for all \\(x\\)" },
        { prompt: "Show that \\(f(x) = \\log x\\) is increasing for \\(x > 0\\).", answer: "\\(f'(x) = \\dfrac{1}{x} > 0\\) for \\(x > 0\\)" },
        {
          prompt: "Is \\(f(x) = x^3\\) increasing on \\(R\\), even though \\(f'(0) = 0\\)?",
          answer: "Yes: \\(f'(x) = 3x^2 \\geq 0\\) and it is zero only at the single point \\(x = 0\\), so the graph never turns",
        },
      ],
      pyqExampleId: "7c983d9a-a164-4f72-acaa-1536b80a1541",
      traps: [
        {
          title: "Writing f'(x) and stopping",
          body: "The marks are for the reason why \\(f'(x) > 0\\): 'a square is never negative', or '\\(\\cos x \\geq -1\\)'. Without it the conclusion is only a claim.",
        },
        {
          title: "Joining the pieces across a gap",
          body: "\\(f(x) = -\\dfrac{1}{x}\\) has \\(f'(x) = \\dfrac{1}{x^2} > 0\\), yet \\(f(-1) = 1\\) is more than \\(f(1) = -1\\). It is increasing on \\((-\\infty, 0)\\) and on \\((0, \\infty)\\) separately, not across 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-intervals",
      name: "Intervals where a function increases or decreases",
      intuition:
        "Factorise f'(x). The values where f'(x) = 0 cut the number line into pieces, and on each piece the derivative keeps one sign. Read the sign of each factor on each piece: positive means increasing, negative means decreasing.",
      definition:
        "- Find \\(f'(x)\\) and factorise it.\n" +
        "- Solve \\(f'(x) = 0\\); these values split the number line into intervals.\n" +
        "- For \\(f'(x) = k(x - \\alpha)(x - \\beta)\\) with \\(k > 0\\) and \\(\\alpha < \\beta\\): \\(f' > 0\\) for \\(x < \\alpha\\) or \\(x > \\beta\\), and \\(f' < 0\\) for \\(\\alpha < x < \\beta\\).\n" +
        "- Leave out any point where \\(f\\) is not defined, and give the intervals on each side of it separately.\n" +
        "- Write the answer as intervals for 'increasing' and for 'decreasing'.",
      formula: {
        label: "Sign of a factorised derivative",
        latex: "f'(x) = k(x - \\alpha)(x - \\beta),\\ k > 0: \\quad f' < 0 \\text{ on } (\\alpha, \\beta), \\quad f' > 0 \\text{ outside } [\\alpha, \\beta]",
      },
      authoredExample: {
        prompt: "Find the values of \\(x\\) for which \\(f(x) = x^3 - 3x^2 - 9x + 4\\) is strictly increasing and strictly decreasing.",
        steps: [
          "\\(f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1)\\).",
          "\\(f'(x) = 0\\) at \\(x = -1\\) and \\(x = 3\\).",
          "For \\(x < -1\\) both factors are negative, so \\(f'(x) > 0\\). For \\(x > 3\\) both are positive, so \\(f'(x) > 0\\).",
          "For \\(-1 < x < 3\\) the factors have opposite signs, so \\(f'(x) < 0\\).",
        ],
        answer: "Strictly increasing for \\(x < -1\\) or \\(x > 3\\); strictly decreasing for \\(-1 < x < 3\\)",
      },
      selfCheckExample: {
        prompt: "Where is \\(f(x) = x^2 - 6x\\) strictly decreasing?",
        steps: ["\\(f'(x) = 2x - 6 < 0\\) when \\(x < 3\\)."],
        answer: "For \\(x < 3\\)",
      },
      practiceSet: [
        { prompt: "Find where \\(f(x) = x e^{-x}\\) is increasing.", answer: "For \\(x < 1\\), since \\(f'(x) = e^{-x}(1 - x)\\)" },
        { prompt: "Find where \\(f(x) = x + \\dfrac{4}{x}\\) is strictly decreasing.", answer: "On \\((-2, 0)\\) and on \\((0, 2)\\)" },
      ],
      pyqExampleId: "d5090270-a488-44ca-bf68-5f552d0f4593",
      traps: [
        {
          title: "Getting the signs between the roots backwards",
          body: "For a product \\((x - \\alpha)(x - \\beta)\\), the value is negative between the roots and positive outside them. Test one number from each interval if you are unsure.",
        },
        {
          title: "Including a point where f is not defined",
          body: "For \\(x + \\dfrac{9}{x}\\), the point \\(x = 0\\) is not in the domain. It is decreasing on \\((-3, 0)\\) and on \\((0, 3)\\); writing \\((-3, 3)\\) includes a point where \\(f\\) does not exist.",
        },
      ],
    },
  ],
};
