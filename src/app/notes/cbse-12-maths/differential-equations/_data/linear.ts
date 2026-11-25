import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DE_LINEAR_NOTE: SubtopicNote = {
  subtopicName: "Linear Differential Equations",
  title: "Linear Differential Equations",
  oneLineDefinition:
    "Equations of the form dy/dx + Py = Q: the standard form, the integrating factor, the general and particular solutions, and equations that are linear in x, written as dx/dy + P₁x = Q₁.",
  whyItMatters:
    "67 questions, thirty-eight of them from board papers in every year from 2022 to 2026. Sixteen of the thirty-eight are one-mark MCQs, and fourteen of those ask only for the integrating factor (2023 to 2026). The written questions ask for general and particular solutions of dy/dx + Py = Q (every year), and for equations that are linear in x rather than y, such as y dx = (x + 2y²) dy or (tan⁻¹y − x) dy = (1 + y²) dx (2024 to 2026). The textbook adds Exercise 9.5, Examples 14 to 18, Miscellaneous Example 22 and Miscellaneous Questions 10, 11, 14 and 15.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmde-if",
      name: "The standard form and the integrating factor",
      intuition:
        "A linear equation has y and dy/dx only to the first power, never multiplied together. Multiplying it by the right function of x, the integrating factor, turns the left side into the derivative of a single product, which can then be integrated.",
      definition:
        "- A **first order linear differential equation** has the form \\(\\dfrac{dy}{dx} + Py = Q\\), where P and Q are constants or functions of x only.\n" +
        "- **Make the coefficient of \\(\\dfrac{dy}{dx}\\) equal to 1 first:** divide through by it, then read off P.\n" +
        "- **Integrating factor:** \\(\\text{I.F.} = e^{\\int P\\,dx}\\). Use \\(e^{\\log f(x)} = f(x)\\).\n" +
        "- Multiplying by the I.F. makes the left side \\(\\dfrac{d}{dx}\\left(y \\cdot \\text{I.F.}\\right)\\).\n" +
        "- **Common factors:** \\(P = \\dfrac{1}{x}\\) gives x; \\(P = -\\dfrac{1}{x}\\) gives \\(\\dfrac{1}{x}\\); \\(P = \\dfrac{2}{x}\\) gives \\(x^2\\); \\(P = \\tan x\\) gives \\(\\sec x\\); \\(P = \\cot x\\) gives \\(\\sin x\\); \\(P = \\dfrac{2x}{1 + x^2}\\) gives \\(1 + x^2\\); \\(P = \\dfrac{1}{x\\log x}\\) gives \\(\\log x\\).\n" +
        "- If the question writes \\(\\dfrac{dx}{dy}\\), turn it the right way up first, then see which variable the equation is linear in.",
      formula: {
        label: "Integrating factor",
        latex: "\\text{I.F.} = e^{\\int P\\,dx}",
      },
      authoredExample: {
        prompt: "Find the integrating factor of \\(x\\dfrac{dy}{dx} + 3y = x^2\\), \\(x > 0\\).",
        steps: [
          "Divide by x to reach the standard form: \\(\\dfrac{dy}{dx} + \\dfrac{3}{x}y = x\\).",
          "So \\(P = \\dfrac{3}{x}\\) and \\(\\displaystyle\\int P\\,dx = 3\\log x = \\log x^3\\).",
          "\\(\\text{I.F.} = e^{\\log x^3} = x^3\\).",
        ],
        answer: "\\(x^3\\)",
      },
      selfCheckExample: {
        prompt: "Find the integrating factor of \\(\\cos x\\,\\dfrac{dy}{dx} + y\\sin x = 1\\), \\(0 < x < \\dfrac{\\pi}{2}\\).",
        steps: [
          "Divide by \\(\\cos x\\): \\(\\dfrac{dy}{dx} + (\\tan x)\\,y = \\sec x\\), so \\(P = \\tan x\\).",
          "\\(\\displaystyle\\int \\tan x\\,dx = \\log \\sec x\\).",
        ],
        answer: "\\(\\sec x\\)",
      },
      practiceSet: [
        { prompt: "Find the integrating factor of \\(\\dfrac{dy}{dx} - 3y = e^{x}\\).", answer: "\\(e^{-3x}\\)" },
        { prompt: "Find the integrating factor of \\(\\dfrac{dy}{dx} + \\dfrac{2}{x}y = x\\), \\(x > 0\\).", answer: "\\(x^2\\)" },
        { prompt: "Is \\(\\dfrac{dy}{dx} + y^2 = x\\) a linear differential equation?", answer: "No: y appears squared" },
      ],
      pyqExampleId: "42a4f0ec-ce89-452d-9ddf-375153ca3a18",
      traps: [
        {
          title: "Reading P before dividing",
          body: "In \\(x\\dfrac{dy}{dx} - y = x^3\\), P is not \\(-1\\). Divide by x first: \\(P = -\\dfrac{1}{x}\\), so the I.F. is \\(\\dfrac{1}{x}\\), not \\(e^{-x}\\).",
        },
        {
          title: "Giving the integral of P as the I.F.",
          body: "For \\(P = \\tan x\\), \\(\\displaystyle\\int P\\,dx = \\log \\sec x\\), but the integrating factor is its exponential, \\(\\sec x\\).",
        },
        {
          title: "Turning a minus log into a minus sign",
          body: "\\(e^{-\\log x} = e^{\\log x^{-1}} = \\dfrac{1}{x}\\), not \\(-x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-lsolve",
      name: "Solving dy/dx + Py = Q",
      intuition:
        "Once the left side is the derivative of y times the integrating factor, integrate both sides with respect to x. The constant is added at that step, before you divide by the integrating factor.",
      definition:
        "- **Step 1:** write the equation as \\(\\dfrac{dy}{dx} + Py = Q\\).\n" +
        "- **Step 2:** find \\(\\text{I.F.} = e^{\\int P\\,dx}\\).\n" +
        "- **Step 3:** write the solution \\(y \\cdot \\text{I.F.} = \\displaystyle\\int Q \\cdot \\text{I.F.}\\,dx + C\\).\n" +
        "- **Step 4:** do the integral (often by parts or by a substitution), and divide by the I.F. if y is wanted on its own.\n" +
        "- The constant C goes in before dividing, so it ends up multiplied by \\(\\dfrac{1}{\\text{I.F.}}\\).",
      formula: {
        label: "Solution of a linear equation",
        latex: "y \\cdot \\text{I.F.} = \\int Q \\cdot \\text{I.F.}\\,dx + C",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(\\dfrac{dy}{dx} + y = x\\).",
        steps: [
          "The equation is linear with \\(P = 1\\) and \\(Q = x\\).",
          "\\(\\text{I.F.} = e^{\\int 1\\,dx} = e^{x}\\).",
          "The solution is \\(y\\,e^{x} = \\displaystyle\\int x\\,e^{x}\\,dx + C\\).",
          "By parts, \\(\\displaystyle\\int x\\,e^{x}\\,dx = x\\,e^{x} - \\int e^{x}\\,dx = (x - 1)e^{x}\\).",
          "So \\(y\\,e^{x} = (x - 1)e^{x} + C\\).",
          "Dividing by \\(e^{x}\\): \\(y = x - 1 + Ce^{-x}\\).",
        ],
        answer: "\\(y = x - 1 + Ce^{-x}\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\dfrac{dy}{dx} + 2y = e^{x}\\).",
        steps: ["\\(\\text{I.F.} = e^{2x}\\), so \\(y\\,e^{2x} = \\displaystyle\\int e^{3x}\\,dx = \\dfrac{e^{3x}}{3} + C\\)."],
        answer: "\\(y = \\dfrac{e^{x}}{3} + Ce^{-2x}\\)",
      },
      practiceSet: [
        { prompt: "Find the general solution of \\(\\dfrac{dy}{dx} - y = e^{2x}\\).", answer: "\\(y = e^{2x} + Ce^{x}\\)" },
        {
          prompt: "Find the general solution of \\(\\dfrac{dy}{dx} + y\\tan x = \\cos^2 x\\), \\(0 < x < \\dfrac{\\pi}{2}\\).",
          answer: "I.F. \\(= \\sec x\\); \\(y\\sec x = \\sin x + C\\), so \\(y = \\sin x\\cos x + C\\cos x\\)",
        },
        { prompt: "Find the general solution of \\(x\\dfrac{dy}{dx} - y = x^2\\), \\(x > 0\\).", answer: "I.F. \\(= \\dfrac{1}{x}\\); \\(\\dfrac{y}{x} = x + C\\), so \\(y = x^2 + Cx\\)" },
      ],
      pyqExampleId: "5b89720b-b609-46b8-9de2-3f64c267130b",
      traps: [
        {
          title: "Adding C after dividing",
          body: "From \\(y\\,e^{x} = (x - 1)e^{x} + C\\) the answer is \\(y = x - 1 + Ce^{-x}\\), not \\(y = x - 1 + C\\).",
        },
        {
          title: "Integrating Q without the I.F.",
          body: "The right side is \\(\\displaystyle\\int Q \\cdot \\text{I.F.}\\,dx\\). Writing \\(\\displaystyle\\int Q\\,dx\\) alone gives a function that does not satisfy the equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-lparticular",
      name: "Particular solutions and curves from a slope",
      intuition:
        "As with any first order equation, solve in general first, then let the given condition fix C. Word problems about a curve give the slope in words: turn that sentence into dy/dx, and the point on the curve into the condition.",
      definition:
        "- Find the general solution \\(y \\cdot \\text{I.F.} = \\displaystyle\\int Q \\cdot \\text{I.F.}\\,dx + C\\).\n" +
        "- Put in the condition (\\(y(x_0) = y_0\\), or 'passes through \\((x_0, y_0)\\)') and solve for C.\n" +
        "- Write the particular solution with that value of C.\n" +
        "- 'The slope at \\((x, y)\\) equals the sum of the coordinates' means \\(\\dfrac{dy}{dx} = x + y\\), which is linear: \\(\\dfrac{dy}{dx} - y = x\\).\n" +
        "- 'The sum of the coordinates exceeds the slope by 5' means \\(x + y = \\dfrac{dy}{dx} + 5\\).",
      formula: {
        label: "Fixing C in a linear solution",
        latex: "y_0 \\cdot \\text{I.F.}(x_0) = \\left[\\int Q \\cdot \\text{I.F.}\\,dx\\right]_{x = x_0} + C",
      },
      authoredExample: {
        prompt: "Find the particular solution of \\(\\dfrac{dy}{dx} + \\dfrac{y}{x} = 3x\\), given that \\(y = 2\\) when \\(x = 1\\).",
        steps: [
          "\\(P = \\dfrac{1}{x}\\), so \\(\\text{I.F.} = e^{\\log x} = x\\) (taking \\(x > 0\\)).",
          "The solution is \\(xy = \\displaystyle\\int 3x \\cdot x\\,dx + C = x^3 + C\\).",
          "At \\(x = 1\\), \\(y = 2\\): \\(2 = 1 + C\\), so \\(C = 1\\).",
          "So \\(xy = x^3 + 1\\), that is \\(y = x^2 + \\dfrac{1}{x}\\).",
        ],
        answer: "\\(y = x^2 + \\dfrac{1}{x}\\)",
      },
      selfCheckExample: {
        prompt: "Find the curve through \\((0, 3)\\) whose slope at any point \\((x, y)\\) is \\(y + 2x\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} - y = 2x\\); \\(\\text{I.F.} = e^{-x}\\).",
          "\\(y\\,e^{-x} = \\displaystyle\\int 2x\\,e^{-x}\\,dx = -2(x + 1)e^{-x} + C\\), so \\(y = -2x - 2 + Ce^{x}\\). At \\((0, 3)\\): \\(C = 5\\).",
        ],
        answer: "\\(y = 5e^{x} - 2x - 2\\)",
      },
      practiceSet: [
        { prompt: "Find the particular solution of \\(\\dfrac{dy}{dx} + y = 1\\), given \\(y(0) = 3\\).", answer: "\\(y = 1 + 2e^{-x}\\)" },
        { prompt: "Find the particular solution of \\(\\dfrac{dy}{dx} - \\dfrac{y}{x} = x\\), given \\(y = 2\\) when \\(x = 1\\).", answer: "\\(y = x^2 + x\\)" },
        { prompt: "Find the particular solution of \\(\\dfrac{dy}{dx} + 2y = 4\\), given \\(y(0) = 0\\).", answer: "\\(y = 2 - 2e^{-2x}\\)" },
      ],
      pyqExampleId: "149a6a76-0eb7-433d-b30f-4209bd9c9cc0",
      traps: [
        {
          title: "Using the condition before integrating",
          body: "Put the given point into \\(y \\cdot \\text{I.F.} = \\displaystyle\\int Q \\cdot \\text{I.F.}\\,dx + C\\), after the integral is done. Earlier, there is no C to find.",
        },
        {
          title: "A wrong value of the integrating factor at the point",
          body: "At \\(x = 0\\), \\(e^{0} = 1\\); at \\(x = \\dfrac{\\pi}{2}\\), \\(\\sin x = 1\\) and \\(\\cos x = 0\\). Work out every term at the point before solving for C.",
        },
        {
          title: "Turning 'exceeds' round",
          body: "'The sum of the coordinates exceeds the slope by 5' is \\(x + y = \\dfrac{dy}{dx} + 5\\), not \\(\\dfrac{dy}{dx} = x + y + 5\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-linx",
      name: "Linear in x: dx/dy + P₁x = Q₁",
      intuition:
        "Some equations are not linear in y, because y sits inside a square, an inverse tangent or an exponential, but x appears only to the first power. Then swap the roles: make x the dependent variable and y the independent one, and use the same method with dy in place of dx.",
      definition:
        "- **Spot it:** y appears in a non-linear way (\\(y^2\\), \\(\\tan^{-1}y\\), \\(e^{y}\\)) while x appears only to the first power.\n" +
        "- Write the equation as \\(\\dfrac{dx}{dy} + P_1x = Q_1\\), where \\(P_1\\) and \\(Q_1\\) are constants or functions of y only.\n" +
        "- \\(\\text{I.F.} = e^{\\int P_1\\,dy}\\).\n" +
        "- The solution is \\(x \\cdot \\text{I.F.} = \\displaystyle\\int Q_1 \\cdot \\text{I.F.}\\,dy + C\\).\n" +
        "- For \\(R\\dfrac{dx}{dy} + Px = Q\\) with P, Q, R functions of y, divide by R first: the I.F. is \\(e^{\\int \\frac{P}{R}\\,dy}\\).",
      formula: {
        label: "Solution when x is the dependent variable",
        latex: "x \\cdot e^{\\int P_1\\,dy} = \\int Q_1\\,e^{\\int P_1\\,dy}\\,dy + C",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{1}{x + e^{y}}\\).",
        steps: [
          "The equation is not linear in y, but turned over it reads \\(\\dfrac{dx}{dy} = x + e^{y}\\), that is \\(\\dfrac{dx}{dy} - x = e^{y}\\).",
          "This is linear in x with \\(P_1 = -1\\) and \\(Q_1 = e^{y}\\).",
          "\\(\\text{I.F.} = e^{\\int -1\\,dy} = e^{-y}\\).",
          "The solution is \\(x\\,e^{-y} = \\displaystyle\\int e^{y} \\cdot e^{-y}\\,dy + C = \\int 1\\,dy + C = y + C\\).",
          "So \\(x = (y + C)e^{y}\\).",
        ],
        answer: "\\(x = (y + C)e^{y}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(y^2\\dfrac{dx}{dy} + xy = 1\\), \\(y > 0\\).",
        steps: ["Divide by \\(y^2\\): \\(\\dfrac{dx}{dy} + \\dfrac{1}{y}x = \\dfrac{1}{y^2}\\). I.F. \\(= y\\)."],
        answer: "\\(xy = \\log y + C\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\dfrac{dx}{dy} + x = y\\).", answer: "I.F. \\(= e^{y}\\); \\(x = y - 1 + Ce^{-y}\\)" },
        { prompt: "Find the integrating factor of \\(y\\dfrac{dx}{dy} + 2x = y^2\\), \\(y > 0\\).", answer: "\\(P_1 = \\dfrac{2}{y}\\), so I.F. \\(= y^2\\)" },
        { prompt: "Solve \\(\\dfrac{dx}{dy} - \\dfrac{x}{y} = y\\cos y\\), \\(y > 0\\).", answer: "I.F. \\(= \\dfrac{1}{y}\\); \\(\\dfrac{x}{y} = \\sin y + C\\), so \\(x = y\\sin y + Cy\\)" },
      ],
      pyqExampleId: "cc80fed7-b3ab-4fa0-b720-ee30ee9e31f1",
      traps: [
        {
          title: "Forcing the dy/dx form",
          body: "\\((x + 2y^2)\\dfrac{dy}{dx} = y\\) is not linear in y, because of the \\(y^2\\). It is linear in x: \\(\\dfrac{dx}{dy} - \\dfrac{1}{y}x = 2y\\).",
        },
        {
          title: "Integrating with respect to the wrong variable",
          body: "In \\(\\dfrac{dx}{dy} + P_1x = Q_1\\), both the I.F. and the right side are integrals with respect to y. Writing \\(e^{\\int P_1\\,dx}\\) is a common slip.",
        },
        {
          title: "Writing y · I.F. on the left",
          body: "When x is the dependent variable the solution is \\(x \\cdot \\text{I.F.} = \\ldots\\). Writing \\(y \\cdot \\text{I.F.}\\) is the wrong form.",
        },
      ],
    },
  ],
};
