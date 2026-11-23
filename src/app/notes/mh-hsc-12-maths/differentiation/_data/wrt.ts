import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_WRT_NOTE: SubtopicNote = {
  subtopicName: "Differentiation of One Function with respect to Another",
  title: "Differentiation of One Function with respect to Another",
  oneLineDefinition:
    "To differentiate u = f(x) with respect to v = g(x), differentiate both with respect to x and divide: du/dv = (du/dx)/(dv/dx), where dv/dx is not zero.",
  whyItMatters:
    "16 questions, two of them from board papers: an MCQ on the derivative of tan³ θ with respect to sec³ θ at θ = π/3 (2017), and the derivative of 7 to the power x with respect to x⁷ after proving the parametric rule (2025). The textbook rows are Exercise 1.4 Q.4, the solved examples of section 1.4.3 and Q.6 of Miscellaneous Exercise 1 (II).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-wrt",
      name: "du/dv through a common variable",
      intuition:
        "u and v are both functions of x, so x plays the part of a parameter. This is the parametric rule again: du/dv is du/dx divided by dv/dx. The function written after 'with respect to' always goes in the denominator.",
      definition:
        "- Let \\(u = f(x)\\) and \\(v = g(x)\\).\n" +
        "- Find \\(\\dfrac{du}{dx}\\) and \\(\\dfrac{dv}{dx}\\).\n" +
        "- \\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx}\\), where \\(\\dfrac{dv}{dx} \\neq 0\\).\n" +
        "- When both are functions of an angle \\(\\theta\\), differentiate both with respect to \\(\\theta\\) instead, and substitute the value of \\(\\theta\\) at the end.",
      formula: {
        label: "Derivative of u with respect to v",
        latex: "\\frac{du}{dv} = \\frac{du/dx}{dv/dx} = \\frac{f'(x)}{g'(x)}",
      },
      authoredExample: {
        prompt: "Find the derivative of \\(\\sin^2 x\\) with respect to \\(\\cos x\\).",
        steps: [
          "Let \\(u = \\sin^2 x\\) and \\(v = \\cos x\\).",
          "\\(\\dfrac{du}{dx} = 2\\sin x\\cos x\\) and \\(\\dfrac{dv}{dx} = -\\sin x\\).",
          "\\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx} = \\dfrac{2\\sin x\\cos x}{-\\sin x}\\), for \\(\\sin x \\neq 0\\).",
          "\\(\\dfrac{du}{dv} = -2\\cos x\\).",
        ],
        answer: "\\(\\dfrac{du}{dv} = -2\\cos x\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(e^{x^2}\\) with respect to \\(x^2\\).",
        steps: ["\\(\\dfrac{du}{dx} = 2x\\,e^{x^2}\\) and \\(\\dfrac{dv}{dx} = 2x\\)."],
        answer: "\\(\\dfrac{du}{dv} = e^{x^2}\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(\\log x\\) with respect to \\(\\sqrt{x}\\).", answer: "\\(\\dfrac{1/x}{1/(2\\sqrt{x})} = \\dfrac{2}{\\sqrt{x}}\\)" },
        { prompt: "Differentiate \\(x^2\\) with respect to \\(x^3\\).", answer: "\\(\\dfrac{2x}{3x^2} = \\dfrac{2}{3x}\\)" },
      ],
      pyqExampleId: "02333e03-002b-4787-a8bb-5fe5123f6c53",
      traps: [
        {
          title: "Dividing the wrong way",
          body: "In 'differentiate u with respect to v', \\(v\\) is the denominator: \\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx}\\). Turning it over gives \\(\\dfrac{dv}{du}\\).",
        },
        {
          title: "Stopping at du/dx",
          body: "The derivative of \\(u\\) with respect to \\(v\\) is not \\(\\dfrac{du}{dx}\\). It must still be divided by \\(\\dfrac{dv}{dx}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-wrtsub",
      name: "Inverse trigonometric pairs: simplify both first",
      intuition:
        "When u and v are both inverse trigonometric expressions in x, one substitution often turns both into simple multiples of the same angle, such as u = 2θ and v = θ. Then du/dv is just the ratio of the two multiples.",
      definition:
        "- Use the same substitution in both, for example \\(x = \\tan\\theta\\) or \\(x = \\sin\\theta\\).\n" +
        "- Simplify each to a multiple of \\(\\theta\\) plus a constant.\n" +
        "- If \\(u = m\\theta + c_1\\) and \\(v = n\\theta + c_2\\), then \\(\\dfrac{du}{dv} = \\dfrac{m}{n}\\).\n" +
        "- State the interval of \\(x\\) you assumed; outside it the sign of the answer can change.",
      formula: {
        label: "Both in the same angle",
        latex: "u = m\\theta + c_1,\\; v = n\\theta + c_2 \\Rightarrow \\frac{du}{dv} = \\frac{m}{n}",
      },
      authoredExample: {
        prompt: "Differentiate \\(\\sin^{-1}\\left(3x - 4x^3\\right)\\) with respect to \\(\\sin^{-1}x\\), for \\(|x| < \\dfrac{1}{2}\\).",
        steps: [
          "Let \\(u = \\sin^{-1}\\left(3x - 4x^3\\right)\\) and \\(v = \\sin^{-1}x\\). Put \\(x = \\sin\\theta\\), so \\(v = \\theta\\) and \\(-\\dfrac{\\pi}{6} < \\theta < \\dfrac{\\pi}{6}\\).",
          "\\(3x - 4x^3 = 3\\sin\\theta - 4\\sin^3\\theta = \\sin 3\\theta\\), and \\(3\\theta\\) lies between \\(-\\dfrac{\\pi}{2}\\) and \\(\\dfrac{\\pi}{2}\\).",
          "So \\(u = \\sin^{-1}(\\sin 3\\theta) = 3\\theta\\).",
          "\\(\\dfrac{du}{d\\theta} = 3\\) and \\(\\dfrac{dv}{d\\theta} = 1\\), so \\(\\dfrac{du}{dv} = 3\\).",
        ],
        answer: "\\(\\dfrac{du}{dv} = 3\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\sin^{-1}x\\) with respect to \\(\\cos^{-1}x\\), for \\(|x| < 1\\).",
        steps: ["\\(\\dfrac{du}{dx} = \\dfrac{1}{\\sqrt{1 - x^2}}\\) and \\(\\dfrac{dv}{dx} = -\\dfrac{1}{\\sqrt{1 - x^2}}\\)."],
        answer: "\\(\\dfrac{du}{dv} = -1\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{3x - x^3}{1 - 3x^2}\\right)\\) with respect to \\(\\tan^{-1}x\\), for \\(|x| < \\dfrac{1}{\\sqrt{3}}\\).",
          answer: "Put \\(x = \\tan\\theta\\): \\(u = 3\\theta\\), \\(v = \\theta\\), so \\(\\dfrac{du}{dv} = 3\\)",
        },
        {
          prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{\\sqrt{1 + x^2} - 1}{x}\\right)\\) with respect to \\(\\tan^{-1}x\\), for \\(x > 0\\).",
          answer: "Put \\(x = \\tan\\theta\\): \\(\\dfrac{\\sec\\theta - 1}{\\tan\\theta} = \\dfrac{1 - \\cos\\theta}{\\sin\\theta} = \\tan\\dfrac{\\theta}{2}\\), so \\(u = \\dfrac{\\theta}{2}\\), \\(v = \\theta\\) and \\(\\dfrac{du}{dv} = \\dfrac{1}{2}\\)",
        },
      ],
      pyqExampleId: "a8aff41e-708f-4bc7-9f56-99e105335b1e",
      traps: [
        {
          title: "Two different substitutions",
          body: "Put the same \\(x = \\tan\\theta\\) (or \\(x = \\sin\\theta\\)) in both expressions, so both become multiples of the same \\(\\theta\\). With two different substitutions the ratio cannot be read off.",
        },
        {
          title: "Ignoring the interval",
          body: "\\(\\sin^{-1}(\\sin 2\\theta) = 2\\theta\\) only while \\(2\\theta\\) stays in \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\). Name the interval of \\(x\\); outside it the answer can change sign.",
        },
      ],
    },
  ],
};
