import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_PARAMETRIC_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Parametric Functions",
  title: "Derivatives of Parametric Functions",
  oneLineDefinition:
    "When x and y are both given in terms of a third variable t, called the parameter, dy/dx is found as dy/dt divided by dx/dt, where dx/dt is not zero.",
  whyItMatters:
    "37 questions, five of them from board papers, and all five are the same long question: prove that dy/dx = (dy/dt)/(dx/dt), then find dy/dx for a given pair such as x = at², y = 2at (2019, 2022, 2024, 2025 and 2026). The textbook rows are Exercise 1.4 Q.1 to Q.3 and the solved examples of section 1.4.2.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-paramrule",
      name: "The parametric rule and its proof",
      intuition:
        "As t changes, both x and y change. In a small step, y changes by about (dy/dt) times the step and x by about (dx/dt) times the same step, so their ratio is (dy/dt)/(dx/dt). The proof makes this exact with limits, and the board asked for it in 2019, 2022, 2024, 2025 and 2026.",
      definition:
        "- **Theorem:** if \\(x = f(t)\\) and \\(y = g(t)\\) are differentiable functions of \\(t\\), then \\(y\\) is a differentiable function of \\(x\\) and \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\), where \\(\\dfrac{dx}{dt} \\neq 0\\).\n" +
        "- **Proof:** let \\(\\delta t\\) be a small increment in \\(t\\), and \\(\\delta x\\), \\(\\delta y\\) the corresponding increments in \\(x\\) and \\(y\\), with \\(\\delta t \\neq 0\\) and \\(\\delta x \\neq 0\\).\n" +
        "- Consider \\(\\dfrac{\\delta y}{\\delta x} = \\dfrac{\\delta y/\\delta t}{\\delta x/\\delta t}\\), since \\(\\delta t \\neq 0\\).\n" +
        "- Take the limit as \\(\\delta t \\to 0\\). As \\(\\delta t \\to 0\\), \\(\\delta x \\to 0\\), because \\(x\\) is a continuous function of \\(t\\). So \\(\\displaystyle\\lim_{\\delta x \\to 0}\\dfrac{\\delta y}{\\delta x} = \\dfrac{\\lim_{\\delta t \\to 0}\\delta y/\\delta t}{\\lim_{\\delta t \\to 0}\\delta x/\\delta t}\\) ... (I)\n" +
        "- Since \\(x\\) and \\(y\\) are differentiable functions of \\(t\\): \\(\\displaystyle\\lim_{\\delta t \\to 0}\\dfrac{\\delta y}{\\delta t} = \\dfrac{dy}{dt}\\) and \\(\\displaystyle\\lim_{\\delta t \\to 0}\\dfrac{\\delta x}{\\delta t} = \\dfrac{dx}{dt} \\neq 0\\) ... (II)\n" +
        "- From (I) and (II), \\(\\displaystyle\\lim_{\\delta x \\to 0}\\dfrac{\\delta y}{\\delta x} = \\dfrac{dy/dt}{dx/dt}\\) ... (III)\n" +
        "- The right side of (III) exists and is finite, so \\(y\\) is a differentiable function of \\(x\\) and \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\).",
      formula: {
        label: "Derivative of parametric functions",
        latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\qquad \\frac{dx}{dt} \\neq 0",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x = 3t^2\\) and \\(y = 2t^3\\).",
        steps: [
          "Differentiate both with respect to \\(t\\): \\(\\dfrac{dx}{dt} = 6t\\) and \\(\\dfrac{dy}{dt} = 6t^2\\).",
          "By the parametric rule, \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt} = \\dfrac{6t^2}{6t}\\), for \\(t \\neq 0\\).",
          "\\(\\dfrac{dy}{dx} = t\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = t\\), \\(t \\neq 0\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x = a(\\theta - \\sin\\theta)\\) and \\(y = a(1 - \\cos\\theta)\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = a(1 - \\cos\\theta)\\), \\(\\dfrac{dy}{d\\theta} = a\\sin\\theta\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{\\sin\\theta}{1 - \\cos\\theta} = \\dfrac{2\\sin\\frac{\\theta}{2}\\cos\\frac{\\theta}{2}}{2\\sin^2\\frac{\\theta}{2}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\cot\\dfrac{\\theta}{2}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x = e^t\\) and \\(y = e^{-t}\\).", answer: "\\(\\dfrac{-e^{-t}}{e^{t}} = -e^{-2t}\\)" },
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x = \\log t\\) and \\(y = t^2\\).", answer: "\\(\\dfrac{2t}{1/t} = 2t^2\\)" },
      ],
      pyqExampleId: "9d3fd6af-3738-4605-8edd-7f3c84b4f62a",
      traps: [
        {
          title: "Turning the fraction upside down",
          body: "\\(\\dfrac{dy}{dx}\\) is \\(\\dfrac{dy}{dt}\\) over \\(\\dfrac{dx}{dt}\\). Writing \\(\\dfrac{dx}{dt}\\) over \\(\\dfrac{dy}{dt}\\) gives \\(\\dfrac{dx}{dy}\\), the reciprocal.",
        },
        {
          title: "Leaving out the condition",
          body: "The theorem needs \\(\\dfrac{dx}{dt} \\neq 0\\). Write it in the statement, and at the end of the 'hence' part say for which values of the parameter the answer holds.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-paramvalue",
      name: "Value of dy/dx at a given parameter",
      intuition:
        "Find dy/dx in terms of the parameter first and simplify it, then put in the given value of t or θ. Simplifying before substituting is shorter and shows up any slip in the algebra.",
      definition:
        "- Find \\(\\dfrac{dx}{dt}\\) and \\(\\dfrac{dy}{dt}\\).\n" +
        "- Divide and simplify, cancelling common factors.\n" +
        "- Substitute the given value; use exact values such as \\(\\tan\\dfrac{\\pi}{3} = \\sqrt{3}\\).\n" +
        "- If \\(\\dfrac{dx}{dt} = 0\\) at the given value, \\(\\dfrac{dy}{dx}\\) does not exist there.",
      formula: {
        label: "Derivative at a value of the parameter",
        latex: "\\left(\\frac{dy}{dx}\\right)_{t = t_0} = \\frac{g'(t_0)}{f'(t_0)}, \\qquad x = f(t),\\; y = g(t)",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) at \\(\\theta = \\dfrac{\\pi}{2}\\) if \\(x = \\theta + \\sin\\theta\\) and \\(y = 1 - \\cos\\theta\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = 1 + \\cos\\theta\\) and \\(\\dfrac{dy}{d\\theta} = \\sin\\theta\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{\\sin\\theta}{1 + \\cos\\theta} = \\dfrac{2\\sin\\frac{\\theta}{2}\\cos\\frac{\\theta}{2}}{2\\cos^2\\frac{\\theta}{2}} = \\tan\\dfrac{\\theta}{2}\\).",
          "At \\(\\theta = \\dfrac{\\pi}{2}\\): \\(\\dfrac{dy}{dx} = \\tan\\dfrac{\\pi}{4} = 1\\).",
        ],
        answer: "\\(\\left(\\dfrac{dy}{dx}\\right)_{\\theta = \\frac{\\pi}{2}} = 1\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) at \\(t = 2\\) if \\(x = t^2\\) and \\(y = t^3\\).",
        steps: ["\\(\\dfrac{dy}{dx} = \\dfrac{3t^2}{2t} = \\dfrac{3t}{2}\\)."],
        answer: "\\(\\left(\\dfrac{dy}{dx}\\right)_{t = 2} = 3\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) at \\(t = 1\\) if \\(x = t^2 + 1\\) and \\(y = t^3 - t\\).",
          answer: "\\(\\dfrac{3t^2 - 1}{2t} = \\dfrac{2}{2} = 1\\)",
        },
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) at \\(\\theta = \\dfrac{\\pi}{6}\\) if \\(x = \\cos\\theta\\) and \\(y = \\sin\\theta\\).",
          answer: "\\(-\\cot\\theta = -\\sqrt{3}\\)",
        },
      ],
      pyqExampleId: "e940b5a9-1e8c-41a0-94c9-75268f142988",
      traps: [
        {
          title: "Substituting before differentiating",
          body: "Putting the value of \\(\\theta\\) into \\(x\\) and \\(y\\) first turns them into numbers, whose derivatives are 0. Differentiate first, then substitute.",
        },
        {
          title: "Decimal answers",
          body: "Keep exact values such as \\(\\sqrt{3}\\) and \\(\\dfrac{1}{\\sqrt{2}}\\). A rounded decimal hides the exact answer the examiner checks for.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-paramshow",
      name: "Showing a result in terms of x and y",
      intuition:
        "Many questions ask you to show that dy/dx equals an expression in x and y, not in t. Find dy/dx in terms of the parameter, then rewrite it using the given x and y, often by dividing y by x or by using an identity such as cos² t + sin² t = 1.",
      definition:
        "- Find \\(\\dfrac{dy}{dx}\\) in terms of the parameter.\n" +
        "- Write the required expression in terms of the parameter, using the given \\(x\\) and \\(y\\).\n" +
        "- Show that the two are equal, and end with 'as required'.\n" +
        "- Sometimes removing the parameter is quicker: \\(x = a\\cos t\\), \\(y = a\\sin t\\) gives \\(x^2 + y^2 = a^2\\), which can be differentiated implicitly.",
      formula: {
        label: "From the parameter to x and y",
        latex: "\\frac{dy}{dx} = h(t) \\text{ and } h(t) = H(x, y) \\Rightarrow \\frac{dy}{dx} = H(x, y)",
      },
      authoredExample: {
        prompt: "If \\(x = a\\cos t\\) and \\(y = b\\sin t\\), show that \\(\\dfrac{dy}{dx} = -\\dfrac{b^2x}{a^2y}\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = -a\\sin t\\) and \\(\\dfrac{dy}{dt} = b\\cos t\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{b\\cos t}{-a\\sin t} = -\\dfrac{b\\cos t}{a\\sin t}\\).",
          "Right side: \\(-\\dfrac{b^2x}{a^2y} = -\\dfrac{b^2 \\cdot a\\cos t}{a^2 \\cdot b\\sin t} = -\\dfrac{b\\cos t}{a\\sin t}\\).",
          "The two are equal, so \\(\\dfrac{dy}{dx} = -\\dfrac{b^2x}{a^2y}\\), as required.",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{b^2x}{a^2y}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x = e^t\\) and \\(y = e^{2t}\\), show that \\(\\dfrac{dy}{dx} = 2x\\).",
        steps: ["\\(\\dfrac{dy}{dx} = \\dfrac{2e^{2t}}{e^t} = 2e^t = 2x\\)."],
        answer: "\\(\\dfrac{dy}{dx} = 2x\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(x = t + \\dfrac{1}{t}\\) and \\(y = t - \\dfrac{1}{t}\\), show that \\(\\dfrac{dy}{dx} = \\dfrac{x}{y}\\).",
          answer: "\\(\\dfrac{dy}{dx} = \\dfrac{1 + 1/t^2}{1 - 1/t^2} = \\dfrac{t^2 + 1}{t^2 - 1}\\), and \\(\\dfrac{x}{y} = \\dfrac{t^2 + 1}{t^2 - 1}\\)",
        },
        {
          prompt: "If \\(x = \\log t\\) and \\(y = \\dfrac{1}{t}\\), show that \\(\\dfrac{dy}{dx} = -y\\).",
          answer: "\\(\\dfrac{dy}{dx} = \\dfrac{-1/t^2}{1/t} = -\\dfrac{1}{t} = -y\\)",
        },
      ],
      pyqExampleId: "e7c5b949-3b34-4336-bb1c-f26f587e831f",
      traps: [
        {
          title: "Leaving the answer in the parameter",
          body: "When the question asks you to show a result in \\(x\\) and \\(y\\), an answer in \\(t\\) alone is incomplete. Write the conversion line that links the two.",
        },
        {
          title: "Dividing in the wrong order",
          body: "\\(\\dfrac{y}{x}\\) and \\(\\dfrac{x}{y}\\) are different. Write each conversion in full, with the given \\(x\\) and \\(y\\) substituted, rather than doing it in your head.",
        },
      ],
    },
  ],
};
