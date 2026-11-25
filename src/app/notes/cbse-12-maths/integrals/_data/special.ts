import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Integrals of Special Forms",
  title: "Integrals of Special Forms",
  oneLineDefinition:
    "The integrals of the square roots of x² − a², x² + a² and a² − x², and of any root quadratic reduced to them by completing the square, together with two forms the board files here: e to the x times f + f′, and the root of tan x plus the root of cot x.",
  whyItMatters:
    "20 questions, seven of them from board papers: one in 2022, two in 2023, one in 2024, two in 2025 and one in 2026. The board asked for the root of 5 − 4x − x² integrated from −2 to 1 (2022), three quarters of the root of 16 − x² from an elliptical racing track in a 2026 case study, the root of tan x plus the root of cot x (2025), and four integrals of the form e to the x times f(x) + f′(x) (2023 twice, 2024, 2025). The textbook adds Examples 23 and 24 and Exercise 7.7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-sqrt-quadratic",
      name: "Square roots of quadratics",
      intuition:
        "These three results come from integration by parts, and they look alike: each has \\(\\dfrac{x}{2}\\) times the root itself, plus \\(\\dfrac{a^2}{2}\\) times a log or an inverse sine. Learn which sign goes with which. A root of any quadratic is first written as one of the three by completing the square.",
      definition:
        "- \\(\\int \\sqrt{x^2 - a^2}\\,dx = \\dfrac{x}{2}\\sqrt{x^2 - a^2} - \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right| + C\\).\n" +
        "- \\(\\int \\sqrt{x^2 + a^2}\\,dx = \\dfrac{x}{2}\\sqrt{x^2 + a^2} + \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{x^2 + a^2}\\right| + C\\).\n" +
        "- \\(\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + C\\).\n" +
        "- For \\(\\sqrt{ax^2 + bx + c}\\), complete the square under the root, then put \\(t = x + \\dfrac{b}{2a}\\).\n" +
        "- A coefficient on \\(x^2\\) comes out of the root as its square root: \\(\\sqrt{9 - 4x^2} = 2\\sqrt{\\dfrac{9}{4} - x^2}\\).",
      formula: {
        label: "Root of a² − x²",
        latex: "\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + C",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\sqrt{x^2 + 6x + 13}\\,dx\\).",
        steps: [
          "\\(x^2 + 6x + 13 = (x + 3)^2 + 4 = (x + 3)^2 + 2^2\\).",
          "Put \\(x + 3 = t\\), so \\(dx = dt\\): \\(\\int \\sqrt{t^2 + 2^2}\\,dt\\).",
          "\\(= \\dfrac{t}{2}\\sqrt{t^2 + 4} + \\dfrac{4}{2}\\log\\left|t + \\sqrt{t^2 + 4}\\right| + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{x + 3}{2}\\sqrt{x^2 + 6x + 13} + 2\\log\\left|x + 3 + \\sqrt{x^2 + 6x + 13}\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{x + 3}{2}\\sqrt{x^2 + 6x + 13} + 2\\log\\left|x + 3 + \\sqrt{x^2 + 6x + 13}\\right| + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\sqrt{x^2 - 4x}\\,dx\\).",
        steps: [
          "\\(x^2 - 4x = (x - 2)^2 - 2^2\\). Put \\(x - 2 = t\\).",
          "\\(\\int \\sqrt{t^2 - 2^2}\\,dt = \\dfrac{t}{2}\\sqrt{t^2 - 4} - \\dfrac{4}{2}\\log\\left|t + \\sqrt{t^2 - 4}\\right| + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{x - 2}{2}\\sqrt{x^2 - 4x} - 2\\log\\left|x - 2 + \\sqrt{x^2 - 4x}\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{x - 2}{2}\\sqrt{x^2 - 4x} - 2\\log\\left|x - 2 + \\sqrt{x^2 - 4x}\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\sqrt{x^2 + 16}\\,dx\\).", answer: "\\(\\dfrac{x}{2}\\sqrt{x^2 + 16} + 8\\log\\left|x + \\sqrt{x^2 + 16}\\right| + C\\)" },
        { prompt: "Find \\(\\int \\sqrt{x^2 - 1}\\,dx\\).", answer: "\\(\\dfrac{x}{2}\\sqrt{x^2 - 1} - \\dfrac{1}{2}\\log\\left|x + \\sqrt{x^2 - 1}\\right| + C\\)" },
        { prompt: "Find \\(\\int \\sqrt{9 - 4x^2}\\,dx\\).", answer: "\\(\\dfrac{x}{2}\\sqrt{9 - 4x^2} + \\dfrac{9}{4}\\sin^{-1}\\dfrac{2x}{3} + C\\)" },
      ],
      pyqExampleId: "874e5f2f-1bdf-48be-95a6-370472898c52",
      traps: [
        {
          title: "Mixing up the signs of the three forms",
          body: "Only \\(\\sqrt{x^2 - a^2}\\) has a minus sign before its log term. \\(\\sqrt{x^2 + a^2}\\) has a plus, and \\(\\sqrt{a^2 - x^2}\\) has a plus with \\(\\sin^{-1}\\).",
        },
        {
          title: "Using the reciprocal formula",
          body: "\\(\\int \\sqrt{a^2 - x^2}\\,dx\\) is not \\(\\sin^{-1}\\dfrac{x}{a}\\); that is the integral of \\(\\dfrac{1}{\\sqrt{a^2 - x^2}}\\). With the root on top, the answer has two terms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-special-exf",
      name: "e to the x times f(x) + f′(x), with trigonometric and algebraic f",
      intuition:
        "This is the same form as on the integration by parts page: \\(\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x) + C\\). The board's versions hide the pair behind half angles or a fraction, so the work is in the rewriting. Once \\(f\\) and \\(f'\\) are visible, the answer is one line.",
      definition:
        "- **Fractions:** split \\(\\dfrac{x + p - 1}{(x + p)^2}\\) as \\(\\dfrac{1}{x + p} - \\dfrac{1}{(x + p)^2}\\); here \\(f(x) = \\dfrac{1}{x + p}\\).\n" +
        "- **Half angles:** \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\) and \\(\\sin x = 2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}\\) turn a trigonometric fraction into \\(\\cot\\dfrac{x}{2}\\) and \\(\\operatorname{cosec}^2\\dfrac{x}{2}\\) terms.\n" +
        "- \\(\\dfrac{d}{dx}\\cot\\dfrac{x}{2} = -\\dfrac{1}{2}\\operatorname{cosec}^2\\dfrac{x}{2}\\) and \\(\\dfrac{d}{dx}\\tan\\dfrac{x}{2} = \\dfrac{1}{2}\\sec^2\\dfrac{x}{2}\\).\n" +
        "- For a definite integral of this form, the antiderivative \\(e^x f(x)\\) is put between the limits.",
      formula: {
        label: "The e to the x form",
        latex: "\\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) + C",
      },
      authoredExample: {
        prompt: "Find \\(\\int e^x\\,\\dfrac{x - 1}{(x + 1)^3}\\,dx\\).",
        steps: [
          "\\(x - 1 = (x + 1) - 2\\), so \\(\\dfrac{x - 1}{(x + 1)^3} = \\dfrac{1}{(x + 1)^2} - \\dfrac{2}{(x + 1)^3}\\).",
          "Let \\(f(x) = \\dfrac{1}{(x + 1)^2}\\). Then \\(f'(x) = -\\dfrac{2}{(x + 1)^3}\\).",
          "The integrand is \\(e^x[f(x) + f'(x)]\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{e^x}{(x + 1)^2} + C\\).",
        ],
        answer: "\\(\\dfrac{e^x}{(x + 1)^2} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int e^x\\,\\dfrac{x + 3}{(x + 4)^2}\\,dx\\).",
        steps: [
          "\\(\\dfrac{x + 3}{(x + 4)^2} = \\dfrac{(x + 4) - 1}{(x + 4)^2} = \\dfrac{1}{x + 4} - \\dfrac{1}{(x + 4)^2}\\).",
          "Let \\(f(x) = \\dfrac{1}{x + 4}\\). Then \\(f'(x) = -\\dfrac{1}{(x + 4)^2}\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{e^x}{x + 4} + C\\).",
        ],
        answer: "\\(\\dfrac{e^x}{x + 4} + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int e^x(x^2 + 2x)\\,dx\\).", answer: "\\(x^2 e^x + C\\)" },
        { prompt: "Find \\(\\int e^x\\,\\dfrac{2 - x}{(1 - x)^2}\\,dx\\).", answer: "\\(\\dfrac{e^x}{1 - x} + C\\)", method: "\\(\\dfrac{1}{1 - x} + \\dfrac{1}{(1 - x)^2}\\)" },
      ],
      pyqExampleId: "ac07406a-405f-4c49-a9c2-395c809293fd",
      traps: [
        {
          title: "The derivative of cot(x/2)",
          body: "\\(\\dfrac{d}{dx}\\left(-\\cot\\dfrac{x}{2}\\right) = +\\dfrac{1}{2}\\operatorname{cosec}^2\\dfrac{x}{2}\\). Check the sign and the factor \\(\\dfrac{1}{2}\\) before you name \\(f(x)\\); a wrong sign gives \\(+e^x\\cot\\dfrac{x}{2}\\).",
        },
        {
          title: "Not showing f and f′",
          body: "Writing only the final \\(e^x f(x)\\) can lose the method mark. State \\(f(x)\\), find \\(f'(x)\\), and say that the integrand is \\(e^x[f(x) + f'(x)]\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-tan-cot",
      name: "The sin x ± cos x substitution",
      intuition:
        "\\(\\sin x + \\cos x\\) and \\(\\sin x - \\cos x\\) are each other's derivatives, up to sign, and the square of either one is \\(1 \\pm \\sin 2x\\). So an integrand with \\(\\sin x \\pm \\cos x\\) on top and \\(\\sin 2x\\) below is changed into a standard form in \\(t\\). The root of \\(\\tan x\\) plus the root of \\(\\cot x\\) becomes such an integrand once the two roots share a denominator.",
      definition:
        "- \\(t = \\sin x - \\cos x\\): \\(dt = (\\cos x + \\sin x)\\,dx\\) and \\(\\sin 2x = 1 - t^2\\).\n" +
        "- \\(t = \\sin x + \\cos x\\): \\(dt = (\\cos x - \\sin x)\\,dx\\) and \\(\\sin 2x = t^2 - 1\\).\n" +
        "- Choose the \\(t\\) whose derivative is the numerator.\n" +
        "- \\(\\sqrt{\\tan x} + \\sqrt{\\cot x} = \\dfrac{\\sin x + \\cos x}{\\sqrt{\\sin x\\cos x}} = \\sqrt{2}\\,\\dfrac{\\sin x + \\cos x}{\\sqrt{\\sin 2x}}\\).",
      formula: {
        label: "Two substitutions",
        latex: "t = \\sin x \\mp \\cos x \\Rightarrow t^2 = 1 \\mp \\sin 2x",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{\\cos x - \\sin x}{\\sqrt{8 - \\sin 2x}}\\,dx\\).",
        steps: [
          "Put \\(\\sin x + \\cos x = t\\), so \\((\\cos x - \\sin x)\\,dx = dt\\).",
          "\\(t^2 = 1 + \\sin 2x\\), so \\(\\sin 2x = t^2 - 1\\) and \\(8 - \\sin 2x = 9 - t^2\\).",
          "\\(\\int \\dfrac{dt}{\\sqrt{3^2 - t^2}} = \\sin^{-1}\\dfrac{t}{3} + C\\).",
          "\\(\\therefore\\) the integral is \\(\\sin^{-1}\\left(\\dfrac{\\sin x + \\cos x}{3}\\right) + C\\).",
        ],
        answer: "\\(\\sin^{-1}\\left(\\dfrac{\\sin x + \\cos x}{3}\\right) + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{\\sin x + \\cos x}{9 + 16\\sin 2x}\\,dx\\).",
        steps: [
          "Put \\(\\sin x - \\cos x = t\\), so \\((\\cos x + \\sin x)\\,dx = dt\\) and \\(\\sin 2x = 1 - t^2\\).",
          "\\(9 + 16(1 - t^2) = 25 - 16t^2\\).",
          "\\(\\int \\dfrac{dt}{25 - 16t^2} = \\dfrac{1}{16}\\int \\dfrac{dt}{\\left(\\dfrac{5}{4}\\right)^2 - t^2} = \\dfrac{1}{16} \\cdot \\dfrac{1}{2 \\cdot \\dfrac{5}{4}}\\log\\left|\\dfrac{\\dfrac{5}{4} + t}{\\dfrac{5}{4} - t}\\right| + C\\).",
          "\\(= \\dfrac{1}{40}\\log\\left|\\dfrac{5 + 4t}{5 - 4t}\\right| + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{1}{40}\\log\\left|\\dfrac{5 + 4(\\sin x - \\cos x)}{5 - 4(\\sin x - \\cos x)}\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{1}{40}\\log\\left|\\dfrac{5 + 4(\\sin x - \\cos x)}{5 - 4(\\sin x - \\cos x)}\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{\\cos x - \\sin x}{4 + \\sin 2x}\\,dx\\).", answer: "\\(\\dfrac{1}{\\sqrt{3}}\\tan^{-1}\\left(\\dfrac{\\sin x + \\cos x}{\\sqrt{3}}\\right) + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{\\cos x - \\sin x}{(\\sin x + \\cos x)^3}\\,dx\\).", answer: "\\(-\\dfrac{1}{2(\\sin x + \\cos x)^2} + C\\)" },
      ],
      pyqExampleId: "580980d0-c57a-4911-9fc8-6f4059a69f86",
      traps: [
        {
          title: "Choosing the wrong combination",
          body: "If the numerator is \\(\\sin x + \\cos x\\), put \\(t = \\sin x - \\cos x\\), whose derivative it is. Putting \\(t = \\sin x + \\cos x\\) gives \\(dt = (\\cos x - \\sin x)\\,dx\\), which does not match.",
        },
        {
          title: "The sign of sin 2x in terms of t",
          body: "With \\(t = \\sin x - \\cos x\\), \\(\\sin 2x = 1 - t^2\\); with \\(t = \\sin x + \\cos x\\), \\(\\sin 2x = t^2 - 1\\). Square \\(t\\) on paper each time rather than recalling it.",
        },
      ],
    },
  ],
};
