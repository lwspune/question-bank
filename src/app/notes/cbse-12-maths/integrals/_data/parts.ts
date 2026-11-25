import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Parts",
  title: "Integration by Parts",
  oneLineDefinition:
    "The integral of a product of two functions equals the first function times the integral of the second, minus the integral of the derivative of the first times the integral of the second.",
  whyItMatters:
    "66 questions, twenty-nine of them from board papers: four in 2022, six in 2023, seven in 2024, six in 2025 and six in 2026. The board asks polynomials times logs and inverse functions (x squared log(x² + 1) in 2023, x squared log(x² − 1) and x squared times the inverse sine of x to the power 3/2 in 2024, the inverse tan of (1 − x)/(1 + x) in 2026), integrals that come back to themselves (e to the x sin 2x in 2022, sec cubed in 2024) and the form e to the x times f(x) + f′(x) (2023, 2024, 2025). Twelve of the board items ask for a definite integral worked out by parts, four of them in 2026. The textbook adds Examples 17 to 22, Exercise 7.6 and Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-parts-rule",
      name: "The rule and the choice of first function",
      intuition:
        "Integration by parts trades one product for another. It helps only when the new product is easier, so choose as the first function the one that becomes simpler when differentiated: \\(x\\) or a polynomial, which loses a power each time. But if the other function is a log or an inverse trigonometric function, take that one first, because you cannot integrate it directly.",
      definition:
        "- \\(\\int f(x)g(x)\\,dx = f(x)\\int g(x)\\,dx - \\int \\left[f'(x)\\int g(x)\\,dx\\right]dx\\).\n" +
        "- **First function:** usually the power of \\(x\\) or the polynomial.\n" +
        "- **Exception:** if the other function is a logarithm or an inverse trigonometric function, that one is the first function.\n" +
        "- Write no constant when you integrate the second function inside the rule; one \\(+ C\\) goes at the very end.\n" +
        "- For \\(x^2 e^x\\) or \\(x^2\\sin x\\), apply the rule twice.\n" +
        "- If the remaining integral is an improper fraction, as in \\(\\int \\dfrac{x^4}{x^2 + 1}\\,dx\\), divide first.",
      formula: {
        label: "Integration by parts",
        latex: "\\int f(x)\\,g(x)\\,dx = f(x)\\int g(x)\\,dx - \\int \\left[\\dfrac{d}{dx}f(x) \\cdot \\int g(x)\\,dx\\right]dx",
        symbols: [
          { symbol: "\\(f\\)", meaning: "the first function, differentiated" },
          { symbol: "\\(g\\)", meaning: "the second function, integrated" },
        ],
      },
      authoredExample: {
        prompt: "Find \\(\\int x\\cos 2x\\,dx\\).",
        steps: [
          "Take \\(x\\) as the first function and \\(\\cos 2x\\) as the second.",
          "\\(\\int x\\cos 2x\\,dx = x \\cdot \\dfrac{\\sin 2x}{2} - \\int 1 \\cdot \\dfrac{\\sin 2x}{2}\\,dx\\).",
          "\\(= \\dfrac{x\\sin 2x}{2} - \\dfrac{1}{2}\\left(-\\dfrac{\\cos 2x}{2}\\right) + C\\).",
          "\\(= \\dfrac{x\\sin 2x}{2} + \\dfrac{\\cos 2x}{4} + C\\).",
        ],
        answer: "\\(\\dfrac{x\\sin 2x}{2} + \\dfrac{\\cos 2x}{4} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int x^3\\log x\\,dx\\).",
        steps: [
          "\\(\\log x\\) is a logarithm, so it is the first function; \\(x^3\\) is the second.",
          "\\(\\int x^3\\log x\\,dx = \\log x \\cdot \\dfrac{x^4}{4} - \\int \\dfrac{1}{x} \\cdot \\dfrac{x^4}{4}\\,dx\\).",
          "\\(= \\dfrac{x^4}{4}\\log x - \\dfrac{1}{4}\\int x^3\\,dx = \\dfrac{x^4}{4}\\log x - \\dfrac{x^4}{16} + C\\).",
        ],
        answer: "\\(\\dfrac{x^4}{4}\\log x - \\dfrac{x^4}{16} + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int x e^{3x}\\,dx\\).", answer: "\\(\\dfrac{x e^{3x}}{3} - \\dfrac{e^{3x}}{9} + C\\)" },
        { prompt: "Find \\(\\int (x + 1)\\sin x\\,dx\\).", answer: "\\(-(x + 1)\\cos x + \\sin x + C\\)" },
        { prompt: "Find \\(\\int x^2\\cos x\\,dx\\).", answer: "\\(x^2\\sin x + 2x\\cos x - 2\\sin x + C\\)", method: "Apply the rule twice." },
      ],
      pyqExampleId: "07b2b74e-e98d-405e-9f8a-1be1518086fb",
      traps: [
        {
          title: "Choosing the log as the second function",
          body: "In \\(\\int x^3\\log x\\,dx\\), taking \\(x^3\\) first forces you to integrate \\(\\log x\\), which is harder than the question. The log is always the first function.",
        },
        {
          title: "The minus sign in the rule",
          body: "The second term is subtracted. With \\(\\int \\sin x\\,dx = -\\cos x\\) inside it, two minus signs meet; write the bracket in full before you simplify.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-parts-one-function",
      name: "Logs and inverse trigonometric functions",
      intuition:
        "\\(\\log x\\) and \\(\\tan^{-1} x\\) have no integral in the standard list, but their derivatives are simple fractions. So write them as a product with 1: take the log or inverse function first and 1 as the second. Differentiating removes the hard function, and what is left is an algebraic integral.",
      definition:
        "- \\(\\int \\log x\\,dx = x\\log x - x + C\\).\n" +
        "- \\(\\int \\tan^{-1} x\\,dx = x\\tan^{-1} x - \\dfrac{1}{2}\\log(1 + x^2) + C\\).\n" +
        "- \\(\\int \\sin^{-1} x\\,dx = x\\sin^{-1} x + \\sqrt{1 - x^2} + C\\).\n" +
        "- With a polynomial, as in \\(x\\tan^{-1} x\\), the inverse function is still the first function.\n" +
        "- Simplify an inverse function first where you can: putting \\(x = \\tan\\theta\\) gives \\(\\tan^{-1}\\dfrac{1 + x}{1 - x} = \\dfrac{\\pi}{4} + \\tan^{-1} x\\) for \\(x < 1\\).\n" +
        "- An inverse function of a power, such as \\(\\sin^{-1}(x^{3/2})\\), is substituted first and then done by parts.",
      formula: {
        label: "Writing the function as a product with 1",
        latex: "\\int \\log x\\,dx = \\int \\log x \\cdot 1\\,dx = x\\log x - \\int \\dfrac{1}{x} \\cdot x\\,dx",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\sin^{-1} x\\,dx\\).",
        steps: [
          "Take \\(\\sin^{-1} x\\) as the first function and 1 as the second.",
          "\\(\\int \\sin^{-1} x \\cdot 1\\,dx = x\\sin^{-1} x - \\int \\dfrac{x}{\\sqrt{1 - x^2}}\\,dx\\).",
          "Put \\(1 - x^2 = t\\), so \\(x\\,dx = -\\dfrac{dt}{2}\\): \\(\\int \\dfrac{x}{\\sqrt{1 - x^2}}\\,dx = -\\dfrac{1}{2}\\int t^{-1/2}\\,dt = -\\sqrt{1 - x^2}\\).",
          "\\(\\therefore \\int \\sin^{-1} x\\,dx = x\\sin^{-1} x + \\sqrt{1 - x^2} + C\\).",
        ],
        answer: "\\(x\\sin^{-1} x + \\sqrt{1 - x^2} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\log(x + 2)\\,dx\\).",
        steps: [
          "\\(\\int \\log(x + 2) \\cdot 1\\,dx = x\\log(x + 2) - \\int \\dfrac{x}{x + 2}\\,dx\\).",
          "\\(\\dfrac{x}{x + 2} = 1 - \\dfrac{2}{x + 2}\\), so \\(\\int \\dfrac{x}{x + 2}\\,dx = x - 2\\log(x + 2)\\).",
          "\\(\\therefore\\) the integral is \\(x\\log(x + 2) - x + 2\\log(x + 2) + C = (x + 2)\\log(x + 2) - x + C\\).",
        ],
        answer: "\\((x + 2)\\log(x + 2) - x + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\cos^{-1} x\\,dx\\).", answer: "\\(x\\cos^{-1} x - \\sqrt{1 - x^2} + C\\)" },
        { prompt: "Find \\(\\int (\\log x)^2\\,dx\\).", answer: "\\(x(\\log x)^2 - 2x\\log x + 2x + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{\\log x}{x^2}\\,dx\\).", answer: "\\(-\\dfrac{\\log x}{x} - \\dfrac{1}{x} + C\\)" },
      ],
      pyqExampleId: "841215d6-1c0f-4ce3-ae2d-5caf33f97891",
      traps: [
        {
          title: "Not simplifying the inverse function first",
          body: "An inverse tangent of a fraction in \\(x\\), taken by parts straight away, gives a long derivative. Put \\(x = \\tan\\theta\\) first: it usually becomes a constant plus or minus \\(\\tan^{-1} x\\), and only \\(\\int \\tan^{-1} x\\,dx\\) is left.",
        },
        {
          title: "A wrong sign in the integral of sin⁻¹ x",
          body: "\\(\\int \\sin^{-1} x\\,dx = x\\sin^{-1} x + \\sqrt{1 - x^2} + C\\), with a plus sign; for \\(\\cos^{-1} x\\) it is minus. Differentiate the answer to check the sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-parts-cyclic",
      name: "When the integral comes back",
      intuition:
        "For \\(e^x\\cos x\\), applying the rule twice brings back the very integral you started with. Call it \\(I\\), collect the two \\(I\\)'s on one side, and divide. The same happens with \\(\\sec^3 x\\) and with \\(\\sin(\\log x)\\).",
      definition:
        "- Let \\(I\\) be the integral. Apply the rule, then apply it again to the new integral, keeping the **same kind** of function first both times.\n" +
        "- When \\(I\\) reappears, move it to the left side: for example \\(2I = \\ldots\\) or \\(5I = \\ldots\\).\n" +
        "- Divide by the number in front of \\(I\\), then add \\(C\\).\n" +
        "- \\(\\int \\sec^3 x\\,dx = \\dfrac{1}{2}\\left(\\sec x\\tan x + \\log|\\sec x + \\tan x|\\right) + C\\).",
      formula: {
        label: "Collecting I",
        latex: "I = \\int e^{x}\\cos x\\,dx \\Rightarrow 2I = e^{x}(\\sin x + \\cos x)",
      },
      authoredExample: {
        prompt: "Find \\(\\int e^x\\cos x\\,dx\\).",
        steps: [
          "Let \\(I = \\int e^x\\cos x\\,dx\\). Take \\(e^x\\) as the first function both times.",
          "\\(I = e^x\\sin x - \\int e^x\\sin x\\,dx\\).",
          "\\(\\int e^x\\sin x\\,dx = -e^x\\cos x + \\int e^x\\cos x\\,dx = -e^x\\cos x + I\\).",
          "So \\(I = e^x\\sin x + e^x\\cos x - I\\), that is \\(2I = e^x(\\sin x + \\cos x)\\).",
          "\\(\\therefore I = \\dfrac{e^x}{2}(\\sin x + \\cos x) + C\\).",
        ],
        answer: "\\(\\dfrac{e^x}{2}(\\sin x + \\cos x) + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\sin(\\log x)\\,dx\\).",
        steps: [
          "Let \\(I = \\int \\sin(\\log x) \\cdot 1\\,dx = x\\sin(\\log x) - \\int x\\cos(\\log x) \\cdot \\dfrac{1}{x}\\,dx\\).",
          "\\(= x\\sin(\\log x) - \\int \\cos(\\log x)\\,dx\\).",
          "\\(\\int \\cos(\\log x)\\,dx = x\\cos(\\log x) + \\int \\sin(\\log x)\\,dx = x\\cos(\\log x) + I\\).",
          "So \\(I = x\\sin(\\log x) - x\\cos(\\log x) - I\\), that is \\(2I = x[\\sin(\\log x) - \\cos(\\log x)]\\).",
          "\\(\\therefore I = \\dfrac{x}{2}[\\sin(\\log x) - \\cos(\\log x)] + C\\).",
        ],
        answer: "\\(\\dfrac{x}{2}[\\sin(\\log x) - \\cos(\\log x)] + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\cos(\\log x)\\,dx\\).", answer: "\\(\\dfrac{x}{2}[\\cos(\\log x) + \\sin(\\log x)] + C\\)" },
        { prompt: "Find \\(\\int \\operatorname{cosec}^3 x\\,dx\\).", answer: "\\(-\\dfrac{1}{2}\\operatorname{cosec} x\\cot x + \\dfrac{1}{2}\\log|\\operatorname{cosec} x - \\cot x| + C\\)", method: "First function \\(\\operatorname{cosec} x\\), second \\(\\operatorname{cosec}^2 x\\)." },
      ],
      pyqExampleId: "595c215d-bfe8-4c2e-8bb9-c387941af5f2",
      traps: [
        {
          title: "Switching the first function halfway",
          body: "If \\(e^x\\) is the first function in the first step and the trigonometric function is first in the second, the two steps undo each other and you get \\(I = I\\). Keep the same choice both times.",
        },
        {
          title: "Forgetting to divide",
          body: "From \\(2I = e^x(\\sin x + \\cos x)\\) the answer is \\(I = \\dfrac{e^x}{2}(\\sin x + \\cos x) + C\\). Writing \\(e^x(\\sin x + \\cos x)\\) as the answer gives twice the integral.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-parts-exf",
      name: "The form e to the x times f(x) + f′(x)",
      intuition:
        "If the bracket after \\(e^x\\) is a function plus its own derivative, the answer is simply \\(e^x\\) times that function. The whole skill is to rewrite the bracket until you can see the pair: split a fraction, or turn \\(1 + \\cos 2x\\) into \\(2\\cos^2 x\\).",
      definition:
        "- \\(\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x) + C\\).\n" +
        "- Reason: \\(\\dfrac{d}{dx}[e^x f(x)] = e^x f(x) + e^x f'(x)\\).\n" +
        "- Split fractions: \\(\\dfrac{x - 1}{x^2} = \\dfrac{1}{x} - \\dfrac{1}{x^2}\\), and \\(-\\dfrac{1}{x^2}\\) is the derivative of \\(\\dfrac{1}{x}\\).\n" +
        "- With half angles: \\(\\dfrac{1 + \\sin x}{1 + \\cos x} = \\dfrac{1}{2}\\sec^2\\dfrac{x}{2} + \\tan\\dfrac{x}{2}\\), so \\(f(x) = \\tan\\dfrac{x}{2}\\).\n" +
        "- Name \\(f(x)\\) and \\(f'(x)\\) in your answer; that line earns the method mark.",
      formula: {
        label: "The e to the x form",
        latex: "\\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) + C",
      },
      authoredExample: {
        prompt: "Find \\(\\int e^x\\left(\\log x + \\dfrac{1}{x}\\right)dx\\).",
        steps: [
          "Let \\(f(x) = \\log x\\). Then \\(f'(x) = \\dfrac{1}{x}\\).",
          "The integrand is \\(e^x[f(x) + f'(x)]\\).",
          "\\(\\therefore \\int e^x\\left(\\log x + \\dfrac{1}{x}\\right)dx = e^x\\log x + C\\).",
        ],
        answer: "\\(e^x\\log x + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int e^x(\\tan x + \\log\\sec x)\\,dx\\).",
        steps: [
          "Let \\(f(x) = \\log\\sec x\\). Then \\(f'(x) = \\dfrac{\\sec x\\tan x}{\\sec x} = \\tan x\\).",
          "The integrand is \\(e^x[f(x) + f'(x)]\\).",
          "\\(\\therefore\\) the integral is \\(e^x\\log\\sec x + C\\).",
        ],
        answer: "\\(e^x\\log|\\sec x| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int e^x\\left(\\sin^{-1} x + \\dfrac{1}{\\sqrt{1 - x^2}}\\right)dx\\).", answer: "\\(e^x\\sin^{-1} x + C\\)" },
        { prompt: "Find \\(\\int e^x(\\cot x - \\operatorname{cosec}^2 x)\\,dx\\).", answer: "\\(e^x\\cot x + C\\)" },
        { prompt: "Find \\(\\int e^x(x^3 + 3x^2)\\,dx\\).", answer: "\\(x^3 e^x + C\\)" },
      ],
      pyqExampleId: "0442f9fe-9c7c-4ff5-935c-278e7ed6ac1c",
      traps: [
        {
          title: "Picking the wrong f",
          body: "In \\(e^x(\\cot x - \\operatorname{cosec}^2 x)\\), \\(f(x) = \\cot x\\), because its derivative is \\(-\\operatorname{cosec}^2 x\\). Taking \\(f(x) = -\\operatorname{cosec}^2 x\\) does not fit the pattern.",
        },
        {
          title: "A sign inside the bracket",
          body: "\\(e^{-x}\\) does not fit the rule as it stands: \\(\\dfrac{d}{dx}[e^{-x}f(x)] = e^{-x}[f'(x) - f(x)]\\). Check the pattern by differentiating your answer.",
        },
      ],
    },
  ],
};
