import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_CHAIN_NOTE: SubtopicNote = {
  subtopicName: "Differentiability and the Chain Rule",
  title: "Differentiability and the Chain Rule",
  oneLineDefinition:
    "Checking whether a function has a derivative at a point by comparing its left and right hand derivatives, finding constants that make a function differentiable, differentiating composite functions by the chain rule, and differentiating one function with respect to another.",
  whyItMatters:
    "64 questions, forty-five of them from board papers from 2023 to 2026. The board checks differentiability at a point with left and right hand derivatives (|x − 5| and [x] at x = −3 in 2024, x|x| in 2025, a piecewise race track in 2026), asks which of |x|, |x| − x and x|x| are differentiable at 0 (2023, 2025), sets a case study on the L.H.D. and R.H.D. of a piecewise function (2023), asks for a and b that make a function differentiable (2023, 2024), and asks chain rule derivatives such as cos³(sec² 2t) (2024) and the derivative of one function with respect to another (2024, 2025). The textbook adds Example 21, Exercise 5.2, Miscellaneous Examples 39(i) and 43, and Miscellaneous Exercise questions 1, 2, 8, 19, 20 and 21.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-lhd-rhd",
      name: "Differentiability at a point: left and right hand derivatives",
      intuition:
        "A function is differentiable at a point when its graph has one clear tangent there. A sharp corner, as in |x| at 0, gives one slope from the left and another from the right, so there is no derivative.",
      definition:
        "- **Left hand derivative:** \\(Lf'(c) = \\lim_{h \\to 0} \\dfrac{f(c - h) - f(c)}{-h}\\). **Right hand derivative:** \\(Rf'(c) = \\lim_{h \\to 0} \\dfrac{f(c + h) - f(c)}{h}\\). Here \\(h > 0\\).\n" +
        "- The book writes both as \\(\\lim \\dfrac{f(c + h) - f(c)}{h}\\), with h tending to 0 from below for the left side; the two forms give the same value.\n" +
        "- f is **differentiable at c** when both one-sided derivatives are finite and equal; then \\(f'(c)\\) is their common value.\n" +
        "- **Theorem 3:** if f is differentiable at c, it is continuous at c. The converse is false: \\(|x|\\) is continuous at 0, but its one-sided derivatives there are \\(-1\\) and 1.\n" +
        "- So if f is **not continuous** at c, it is not differentiable at c. Say so and stop.\n" +
        "- **Board layout:** \\(f(c)\\), then the LHD, then the RHD, each limit on its own line, then the conclusion.",
      formula: {
        label: "Differentiable at x = c",
        latex: "\\lim_{h \\to 0} \\frac{f(c - h) - f(c)}{-h} = \\lim_{h \\to 0} \\frac{f(c + h) - f(c)}{h}",
      },
      authoredExample: {
        prompt:
          "Check the differentiability of \\(f(x) = \\begin{cases} 8x - 9, & x < 4 \\\\ x^2 + 7, & x \\ge 4 \\end{cases}\\) at \\(x = 4\\).",
        steps: [
          "Value: \\(f(4) = 4^2 + 7 = 23\\).",
          "LHD \\(= \\lim_{h \\to 0} \\dfrac{f(4 - h) - f(4)}{-h} = \\lim_{h \\to 0} \\dfrac{8(4 - h) - 9 - 23}{-h} = \\lim_{h \\to 0} \\dfrac{-8h}{-h} = 8\\).",
          "RHD \\(= \\lim_{h \\to 0} \\dfrac{f(4 + h) - f(4)}{h} = \\lim_{h \\to 0} \\dfrac{(4 + h)^2 + 7 - 23}{h} = \\lim_{h \\to 0} \\dfrac{8h + h^2}{h} = \\lim_{h \\to 0} (8 + h) = 8\\).",
          "LHD \\(=\\) RHD \\(= 8\\), so f is differentiable at \\(x = 4\\) and \\(f'(4) = 8\\).",
        ],
        answer: "Differentiable at \\(x = 4\\), with \\(f'(4) = 8\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(f(x) = |x + 3|\\) differentiable at \\(x = -3\\)?",
        steps: [
          "\\(f(-3) = 0\\).",
          "LHD \\(= \\lim_{h \\to 0} \\dfrac{|-h| - 0}{-h} = \\lim_{h \\to 0} \\dfrac{h}{-h} = -1\\).",
          "RHD \\(= \\lim_{h \\to 0} \\dfrac{|h| - 0}{h} = 1\\).",
          "\\(-1 \\ne 1\\), so f is not differentiable at \\(x = -3\\).",
        ],
        answer: "Not differentiable at \\(x = -3\\)",
      },
      practiceSet: [
        { prompt: "Find the right hand derivative of \\(f(x) = |x|\\) at \\(x = 0\\).", answer: "1" },
        { prompt: "A function is differentiable at \\(x = 4\\). Must it be continuous at \\(x = 4\\)?", answer: "Yes, by Theorem 3" },
        {
          prompt: "Is \\(f(x) = |x - 2| + 3\\) continuous at \\(x = 2\\)? Is it differentiable there?",
          answer: "Continuous, but not differentiable: the one-sided derivatives are \\(-1\\) and 1",
        },
      ],
      pyqExampleId: "9e74c59c-376b-47c6-ae1f-87341b80b3f1",
      traps: [
        {
          title: "The minus sign in the LHD",
          body: "In \\(\\dfrac{f(c - h) - f(c)}{-h}\\) the denominator is \\(-h\\). Dropping that minus turns \\(-1\\) into 1 and hides a corner.",
        },
        {
          title: "Differentiating across a jump",
          body: "If the pieces do not meet at the join, f is not continuous there, so it is not differentiable. Board 2025 set pieces giving \\(-7\\) and \\(-1\\) at \\(x = -2\\): check continuity first.",
        },
        {
          title: "Continuous but not differentiable",
          body: "\\(|x - a|\\) is continuous at a but not differentiable there. When an MCQ asks about both properties, decide each one separately.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-diff-constants",
      name: "Finding constants so that a function is differentiable",
      intuition:
        "A function made of two pieces is differentiable at the join only if the pieces meet (continuity) and leave the join with the same slope (LHD = RHD). Each condition gives one equation, so two unknowns can be found.",
      definition:
        "- **Equation 1, continuity at c:** the two pieces have the same value at c.\n" +
        "- **Equation 2, LHD = RHD:** once the pieces meet at c, the one-sided derivatives are the derivatives of the two pieces at c.\n" +
        "- Solve the two equations together. State both conditions in words before the algebra; each carries marks.\n" +
        "- When each piece is a polynomial, the only point that needs checking is the join.",
      formula: {
        label: "Two conditions at the join c",
        latex: "f_1(c) = f_2(c), \\qquad f_1'(c) = f_2'(c)",
      },
      authoredExample: {
        prompt:
          "Find a and b if \\(f(x) = \\begin{cases} ax^2 + b, & x \\le 2 \\\\ 4x + 1, & x > 2 \\end{cases}\\) is differentiable at \\(x = 2\\).",
        steps: [
          "Continuity at 2: \\(4a + b = 4(2) + 1 = 9\\) ... (i)",
          "LHD: the derivative of \\(ax^2 + b\\) at 2 is \\(2a(2) = 4a\\). RHD: the derivative of \\(4x + 1\\) is 4.",
          "LHD \\(=\\) RHD gives \\(4a = 4\\), so \\(a = 1\\).",
          "From (i), \\(b = 9 - 4 = 5\\).",
        ],
        answer: "\\(a = 1\\), \\(b = 5\\)",
      },
      selfCheckExample: {
        prompt:
          "Find p and q if \\(f(x) = \\begin{cases} px + q, & x < 4 \\\\ x^2, & x \\ge 4 \\end{cases}\\) is differentiable at \\(x = 4\\).",
        steps: [
          "Continuity: \\(4p + q = 16\\).",
          "Equal slopes: \\(p = 2(4) = 8\\).",
          "\\(q = 16 - 32 = -16\\).",
        ],
        answer: "\\(p = 8\\), \\(q = -16\\)",
      },
      practiceSet: [
        {
          prompt: "Find a and b if \\(f(x) = \\begin{cases} 3x + 2, & x \\le 1 \\\\ ax^2 + b, & x > 1 \\end{cases}\\) is differentiable at \\(x = 1\\).",
          answer: "\\(a = \\dfrac{3}{2}\\), \\(b = \\dfrac{7}{2}\\)",
          method: "\\(a + b = 5\\) and \\(2a = 3\\)",
        },
        {
          prompt: "Name the two conditions for a two-piece function to be differentiable at its join.",
          answer: "The pieces have the same value at the join, and the same derivative there",
        },
        {
          prompt: "Find m if \\(f(x) = \\begin{cases} x^2, & x \\le 2 \\\\ mx - 4, & x > 2 \\end{cases}\\) is differentiable at \\(x = 2\\).",
          answer: "\\(m = 4\\)",
          method: "Continuity gives \\(4 = 2m - 4\\); equal slopes give \\(4 = m\\). Both agree.",
        },
      ],
      pyqExampleId: "d8920d77-6ba8-4320-a13d-e99c29a6ef5e",
      traps: [
        {
          title: "One equation for two unknowns",
          body: "LHD = RHD alone leaves one constant free. Continuity gives the second equation; without it you cannot finish.",
        },
        {
          title: "Slopes of the pieces before continuity",
          body: "Reading the one-sided derivatives as the derivatives of the pieces is valid only once the pieces meet at the join. Write the continuity equation first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-chain-rule",
      name: "The chain rule",
      intuition:
        "A composite such as \\(\\sin(x^2)\\) is a function inside a function. Differentiate the outside layer, keep the inside as it is, then multiply by the derivative of the inside. Repeat until you reach x.",
      definition:
        "- **Theorem 4 (chain rule):** if \\(f = v \\circ u\\), \\(t = u(x)\\), and both \\(\\dfrac{dv}{dt}\\) and \\(\\dfrac{dt}{dx}\\) exist, then \\(\\dfrac{df}{dx} = \\dfrac{dv}{dt} \\cdot \\dfrac{dt}{dx}\\).\n" +
        "- For three layers, \\(\\dfrac{df}{dx} = \\dfrac{dw}{ds} \\cdot \\dfrac{ds}{dt} \\cdot \\dfrac{dt}{dx}\\).\n" +
        "- Work from the outside in, one factor for each layer, and write the final answer in x (NCERT Example 21).\n" +
        "- \\(\\sin^2(x^3)\\) means \\([\\sin(x^3)]^2\\): three layers (the square, the sine, the cube).\n" +
        "- The product and quotient rules still apply; use the chain rule inside each part.",
      formula: {
        label: "Chain rule",
        latex: "\\frac{df}{dx} = \\frac{dv}{dt} \\cdot \\frac{dt}{dx}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = (1 + \\tan 3x)^4\\) with respect to x.",
        steps: [
          "Outer layer, the fourth power: \\(\\dfrac{d}{du}u^4 = 4u^3\\), with \\(u = 1 + \\tan 3x\\).",
          "Inner layers: \\(\\dfrac{d}{dx}(1 + \\tan 3x) = \\sec^2 3x \\cdot \\dfrac{d}{dx}(3x) = 3\\sec^2 3x\\).",
          "Multiply: \\(\\dfrac{dy}{dx} = 4(1 + \\tan 3x)^3 \\cdot 3\\sec^2 3x\\).",
          "\\(\\dfrac{dy}{dx} = 12(1 + \\tan 3x)^3\\sec^2 3x\\).",
        ],
        answer: "\\(12(1 + \\tan 3x)^3\\sec^2 3x\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = \\cos\\sqrt{x^2 + 1}\\) with respect to x.",
        steps: [
          "\\(\\dfrac{dy}{dx} = -\\sin\\sqrt{x^2 + 1} \\cdot \\dfrac{d}{dx}\\sqrt{x^2 + 1}\\).",
          "\\(\\dfrac{d}{dx}\\sqrt{x^2 + 1} = \\dfrac{2x}{2\\sqrt{x^2 + 1}} = \\dfrac{x}{\\sqrt{x^2 + 1}}\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{x\\sin\\sqrt{x^2 + 1}}{\\sqrt{x^2 + 1}}\\).",
        ],
        answer: "\\(-\\dfrac{x\\sin\\sqrt{x^2 + 1}}{\\sqrt{x^2 + 1}}\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(\\sin(x^3 + 2x)\\).", answer: "\\((3x^2 + 2)\\cos(x^3 + 2x)\\)" },
        {
          prompt: "Find the derivative of \\(\\sqrt{\\sin x}\\) at \\(x = \\dfrac{\\pi}{2}\\).",
          answer: "0",
          method: "\\(\\dfrac{\\cos x}{2\\sqrt{\\sin x}}\\), and \\(\\cos\\dfrac{\\pi}{2} = 0\\)",
        },
        { prompt: "Differentiate \\(\\sec^2 5x\\).", answer: "\\(10\\sec^2 5x\\tan 5x\\)" },
      ],
      pyqExampleId: "57d4a483-737e-47cd-a1e4-28c93cb47e02",
      traps: [
        {
          title: "Dropping the inner derivative",
          body: "\\(\\dfrac{d}{dx}\\cos(\\log x + e^x) = -\\sin(\\log x + e^x)\\left(\\dfrac{1}{x} + e^x\\right)\\). The board's MCQs list the answer without the inner factor as a wrong option.",
        },
        {
          title: "Putting in the value too early",
          body: "To find a derivative at \\(x = a\\), differentiate first and substitute last. Substituting first turns the function into a number, whose derivative is 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-wrt-function",
      name: "Derivative of one function with respect to another",
      intuition:
        "To differentiate u with respect to v, when both are functions of x, find how fast each changes with x and divide. The x cancels out in the ratio.",
      definition:
        "- Put \\(u = f(x)\\) and \\(v = g(x)\\). Then \\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx}\\), where \\(\\dfrac{dv}{dx} \\ne 0\\).\n" +
        "- NCERT uses this in Miscellaneous Example 43: \\(\\sin^2 x\\) with respect to \\(e^{\\cos x}\\).\n" +
        "- If u is already a simple function of v, such as \\(u = \\sqrt{v}\\), differentiate in v directly.\n" +
        "- With inverse trigonometric functions, simplify each one first (next page).",
      formula: {
        label: "u with respect to v",
        latex: "\\frac{du}{dv} = \\frac{du/dx}{dv/dx}, \\quad \\frac{dv}{dx} \\ne 0",
      },
      authoredExample: {
        prompt: "Differentiate \\(\\sin x\\) with respect to \\(\\cos x\\).",
        steps: [
          "Let \\(u = \\sin x\\) and \\(v = \\cos x\\).",
          "\\(\\dfrac{du}{dx} = \\cos x\\) and \\(\\dfrac{dv}{dx} = -\\sin x\\).",
          "\\(\\dfrac{du}{dv} = \\dfrac{\\cos x}{-\\sin x} = -\\cot x\\).",
        ],
        answer: "\\(-\\cot x\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\tan x\\) with respect to \\(\\sec x\\).",
        steps: [
          "\\(\\dfrac{d}{dx}\\tan x = \\sec^2 x\\) and \\(\\dfrac{d}{dx}\\sec x = \\sec x\\tan x\\).",
          "\\(\\dfrac{du}{dv} = \\dfrac{\\sec^2 x}{\\sec x\\tan x} = \\dfrac{\\sec x}{\\tan x} = \\operatorname{cosec} x\\).",
        ],
        answer: "\\(\\operatorname{cosec} x\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(x^4\\) with respect to \\(x^2\\).", answer: "\\(2x^2\\)" },
        {
          prompt: "Differentiate \\(\\sin^2 x\\) with respect to \\(\\cos^2 x\\).",
          answer: "\\(-1\\)",
          method: "\\(\\sin^2 x = 1 - \\cos^2 x\\)",
        },
        { prompt: "Write the formula for the derivative of u with respect to v.", answer: "\\(\\dfrac{du/dx}{dv/dx}\\), with \\(\\dfrac{dv}{dx} \\ne 0\\)" },
      ],
      pyqExampleId: "6ab76e8d-41cf-4194-8349-54c5a6f1b536",
      traps: [
        {
          title: "Writing du/dx",
          body: "The derivative of u with respect to v is not \\(\\dfrac{du}{dx}\\). Divide by \\(\\dfrac{dv}{dx}\\), or the answer is wrong by a whole factor.",
        },
        {
          title: "Upside down",
          body: "\\(\\dfrac{du}{dv}\\) has the derivative of u on top. The derivative of \\(x^2\\) with respect to \\(x^3\\) is \\(\\dfrac{2x}{3x^2} = \\dfrac{2}{3x}\\), not \\(\\dfrac{3x}{2}\\).",
        },
      ],
    },
  ],
};
