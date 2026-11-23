import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DI_FUNDAMENTAL_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Theorem of Integral Calculus",
  title: "The Fundamental Theorem of Integral Calculus",
  oneLineDefinition:
    "If g(x) is a primitive of a continuous function f(x) on [a, b], then the integral of f(x) from a to b is g(b) − g(a).",
  whyItMatters:
    "13 questions, three of them from board papers: the integral of cos² x from 0 to π/2 (2024), the integral of e to the power −x from 0 to −1 (2025) and the integral of 1/(1 − sin x) from −π/4 to π/4 (2025). The textbook rows are the worked example of section 4.2, Part I of Exercise 4.2 and one 'show that' from Miscellaneous Exercise 4. Each needs only the antiderivative and clean arithmetic at the limits.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdi-fundamental-theorem",
      name: "The fundamental theorem: g(b) minus g(a)",
      intuition:
        "A definite integral is a number, not a family of functions. Find any antiderivative g(x), put in the upper limit, put in the lower limit, and subtract. The constant of integration is added to both values and so cancels, which is why it never appears.",
      definition:
        "- If \\(f\\) is continuous on \\([a, b]\\) and \\(\\int f(x)\\,dx = g(x) + c\\), then \\(\\int_a^b f(x)\\,dx = \\left[g(x)\\right]_a^b = g(b) - g(a)\\).\n" +
        "- Proof of the cancelling: \\(\\left[g(b) + c\\right] - \\left[g(a) + c\\right] = g(b) - g(a)\\).\n" +
        "- \\(a\\) is the **lower limit** and \\(b\\) the **upper limit**. Always take upper value minus lower value, even when the upper limit is the smaller number.\n" +
        "- **Board layout:** the antiderivative in square brackets with the limits, then the two values, then the simplified answer.",
      formula: {
        label: "Fundamental theorem of integral calculus",
        latex: "\\int_a^b f(x)\\,dx = \\left[g(x)\\right]_a^b = g(b) - g(a), \\qquad g'(x) = f(x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^2 \\left(4x^3 - \\dfrac{1}{x^2}\\right)dx\\).",
        steps: [
          "\\(\\int \\left(4x^3 - x^{-2}\\right)dx = x^4 + x^{-1} + c\\), so take \\(g(x) = x^4 + \\dfrac{1}{x}\\).",
          "\\(\\int_1^2 \\left(4x^3 - \\dfrac{1}{x^2}\\right)dx = \\left[x^4 + \\dfrac{1}{x}\\right]_1^2\\).",
          "\\(= \\left(16 + \\dfrac{1}{2}\\right) - \\left(1 + 1\\right)\\).",
          "\\(= \\dfrac{33}{2} - 2 = \\dfrac{29}{2}\\).",
        ],
        answer: "\\(\\int_1^2 \\left(4x^3 - \\dfrac{1}{x^2}\\right)dx = \\dfrac{29}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\cos x\\,dx\\).",
        steps: ["\\(\\left[\\sin x\\right]_0^{\\pi/2} = \\sin\\dfrac{\\pi}{2} - \\sin 0 = 1 - 0\\)."],
        answer: "\\(1\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_1^e \\dfrac{1}{x}\\,dx\\).", answer: "\\(\\left[\\log x\\right]_1^e = 1 - 0 = 1\\)" },
        { prompt: "If \\(\\int_0^k 2x\\,dx = 9\\) and \\(k > 0\\), find \\(k\\).", answer: "\\(k^2 = 9\\), so \\(k = 3\\)" },
        { prompt: "Evaluate \\(\\int_0^1 \\left(x^2 + 1\\right)dx\\).", answer: "\\(\\dfrac{1}{3} + 1 = \\dfrac{4}{3}\\)" },
      ],
      pyqExampleId: "2911924a-c8aa-4c65-a067-13ea5dd89d13",
      traps: [
        {
          title: "Writing + c in a definite integral",
          body: "The constant cancels in \\(g(b) - g(a)\\). An answer such as \\(\\dfrac{29}{2} + c\\) is wrong, because a definite integral is a single number.",
        },
        {
          title: "Losing the minus sign from the chain rule",
          body: "\\(\\int e^{kx}\\,dx = \\dfrac{e^{kx}}{k}\\), so \\(\\int e^{-2x}\\,dx = -\\dfrac{1}{2}e^{-2x}\\). Differentiate your antiderivative in your head before putting in the limits.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-trig-identities",
      name: "Trigonometric integrands: an identity before the integral",
      intuition:
        "Many board integrands, such as cos² x or a product like sin 4x sin 3x, have no direct antiderivative in the table. One identity turns each into a sum of terms that do, and then the fundamental theorem finishes the job. The skill is to recognise which identity the integrand is asking for.",
      definition:
        "- Power reduction: \\(\\cos^2 x = \\dfrac{1 + \\cos 2x}{2}\\), \\(\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}\\).\n" +
        "- Product to sum: \\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\), \\(2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)\\).\n" +
        "- \\(\\tan^2 x = \\sec^2 x - 1\\), \\(\\cot^2 x = \\operatorname{cosec}^2 x - 1\\), and \\(1 + \\sin 2x = (\\sin x + \\cos x)^2\\).\n" +
        "- For \\(\\dfrac{1}{1 - \\sin x}\\): multiply above and below by \\(1 + \\sin x\\) to get \\(\\sec^2 x + \\sec x\\tan x\\).",
      formula: {
        label: "The identities used most",
        latex: "\\cos^2 x = \\frac{1 + \\cos 2x}{2}, \\qquad \\sin^2 x = \\frac{1 - \\cos 2x}{2}, \\qquad 2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/4} 2\\sin 3x\\cos x\\,dx\\).",
        steps: [
          "Use \\(2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)\\): \\(2\\sin 3x\\cos x = \\sin 4x + \\sin 2x\\).",
          "\\(\\int_0^{\\pi/4}\\left(\\sin 4x + \\sin 2x\\right)dx = \\left[-\\dfrac{\\cos 4x}{4} - \\dfrac{\\cos 2x}{2}\\right]_0^{\\pi/4}\\).",
          "At \\(x = \\dfrac{\\pi}{4}\\): \\(-\\dfrac{\\cos \\pi}{4} - \\dfrac{1}{2}\\cos\\dfrac{\\pi}{2} = \\dfrac{1}{4} - 0 = \\dfrac{1}{4}\\).",
          "At \\(x = 0\\): \\(-\\dfrac{1}{4} - \\dfrac{1}{2} = -\\dfrac{3}{4}\\).",
          "Value \\(= \\dfrac{1}{4} - \\left(-\\dfrac{3}{4}\\right) = 1\\).",
        ],
        answer: "\\(\\int_0^{\\pi/4} 2\\sin 3x\\cos x\\,dx = 1\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\sin^2 x\\,dx\\).",
        steps: [
          "\\(\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}\\).",
          "\\(\\dfrac{1}{2}\\left[x - \\dfrac{\\sin 2x}{2}\\right]_0^{\\pi/2} = \\dfrac{1}{2}\\left(\\dfrac{\\pi}{2} - 0\\right)\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^{\\pi/4}\\tan^2 x\\,dx\\).", answer: "\\(\\left[\\tan x - x\\right]_0^{\\pi/4} = 1 - \\dfrac{\\pi}{4}\\)" },
        { prompt: "Evaluate \\(\\int_0^{\\pi}\\cos^2 x\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\left[x + \\dfrac{\\sin 2x}{2}\\right]_0^{\\pi} = \\dfrac{\\pi}{2}\\)" },
        { prompt: "For \\(0 \\leq x \\leq \\dfrac{\\pi}{2}\\), write \\(\\sqrt{1 + \\sin 2x}\\) without the square root.", answer: "\\(\\sin x + \\cos x\\)" },
      ],
      pyqExampleId: "657cceda-6a6f-4082-8d2f-10d585635a52",
      traps: [
        {
          title: "Dropping a half in the power reduction",
          body: "\\(\\cos^2 x = \\dfrac{1 + \\cos 2x}{2}\\), and \\(\\int \\cos 2x\\,dx = \\dfrac{\\sin 2x}{2}\\). Missing either half doubles a part of the answer.",
        },
        {
          title: "Taking a square root without its sign",
          body: "\\(\\sqrt{(\\sin x + \\cos x)^2} = \\left|\\sin x + \\cos x\\right|\\). Remove the modulus only after checking the sign over the whole interval.",
        },
      ],
    },
  ],
};
