import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_ANTIDERIVATIVE_NOTE: SubtopicNote = {
  subtopicName: "Integration as the Inverse of Differentiation",
  title: "Integration as the Inverse of Differentiation",
  oneLineDefinition:
    "Integration undoes differentiation: an antiderivative of f is a function F whose derivative is f, and every other antiderivative is F plus a constant C.",
  whyItMatters:
    "34 questions, seven of them from board papers: four in 2023 and three in 2025, all one-mark MCQs. The board asks for the integral of a power of 2 such as 2 to the power x + 2 (2023), integrals of e to the power k log x and of a quotient of such terms (2023 and 2025), and the function f(x) when its derivative and one value are given (2023 twice, 2025). The textbook adds Examples 1 to 4, Exercise 7.1 and Miscellaneous Question 8.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-standard",
      name: "Standard integrals and integrating term by term",
      intuition:
        "Every derivative you know gives you an integral for free: since the derivative of \\(\\sin x\\) is \\(\\cos x\\), an integral of \\(\\cos x\\) is \\(\\sin x\\). A constant has derivative zero, so any constant can be added, and we write \\(+ C\\). A sum is integrated one term at a time, and a constant multiplier waits outside.",
      definition:
        "- \\(\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C\\), \\(n \\ne -1\\); and \\(\\int \\dfrac{1}{x}\\,dx = \\log|x| + C\\).\n" +
        "- \\(\\int \\cos x\\,dx = \\sin x + C\\), \\(\\int \\sin x\\,dx = -\\cos x + C\\).\n" +
        "- \\(\\int \\sec^2 x\\,dx = \\tan x + C\\), \\(\\int \\operatorname{cosec}^2 x\\,dx = -\\cot x + C\\).\n" +
        "- \\(\\int \\sec x\\tan x\\,dx = \\sec x + C\\), \\(\\int \\operatorname{cosec} x\\cot x\\,dx = -\\operatorname{cosec} x + C\\).\n" +
        "- \\(\\int \\dfrac{dx}{\\sqrt{1 - x^2}} = \\sin^{-1} x + C\\), \\(\\int \\dfrac{dx}{1 + x^2} = \\tan^{-1} x + C\\).\n" +
        "- \\(\\int e^x\\,dx = e^x + C\\), \\(\\int a^x\\,dx = \\dfrac{a^x}{\\log a} + C\\).\n" +
        "- **Properties:** \\(\\int [f(x) \\pm g(x)]\\,dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx\\) and \\(\\int k f(x)\\,dx = k\\int f(x)\\,dx\\).\n" +
        "- **Inspection:** for \\(\\sin 3x\\) or \\(e^{4x}\\), guess the answer and divide by the number that differentiating would bring out: \\(\\int \\sin 3x\\,dx = -\\dfrac{1}{3}\\cos 3x + C\\).",
      formula: {
        label: "Power rule and the antiderivative",
        latex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\ (n \\ne -1), \\qquad \\dfrac{d}{dx}F(x) = f(x) \\Rightarrow \\int f(x)\\,dx = F(x) + C",
        symbols: [
          { symbol: "\\(C\\)", meaning: "the constant of integration, any real number" },
          { symbol: "\\(F\\)", meaning: "an antiderivative of f" },
        ],
      },
      authoredExample: {
        prompt: "Find \\(\\int \\left(3x^2 - 4\\sin x + \\dfrac{5}{x} + e^x\\right)dx\\).",
        steps: [
          "Integrate term by term and keep each constant outside.",
          "\\(\\int 3x^2\\,dx = 3 \\cdot \\dfrac{x^3}{3} = x^3\\).",
          "\\(\\int -4\\sin x\\,dx = -4(-\\cos x) = 4\\cos x\\).",
          "\\(\\int \\dfrac{5}{x}\\,dx = 5\\log|x|\\) and \\(\\int e^x\\,dx = e^x\\).",
          "\\(\\therefore \\int \\left(3x^2 - 4\\sin x + \\dfrac{5}{x} + e^x\\right)dx = x^3 + 4\\cos x + 5\\log|x| + e^x + C\\).",
        ],
        answer: "\\(x^3 + 4\\cos x + 5\\log|x| + e^x + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{x^4 + 3x - 1}{x^2}\\,dx\\).",
        steps: [
          "Divide every term by \\(x^2\\): \\(x^2 + \\dfrac{3}{x} - x^{-2}\\).",
          "\\(\\int x^2\\,dx = \\dfrac{x^3}{3}\\), \\(\\int \\dfrac{3}{x}\\,dx = 3\\log|x|\\).",
          "\\(\\int -x^{-2}\\,dx = -\\dfrac{x^{-1}}{-1} = \\dfrac{1}{x}\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{x^3}{3} + 3\\log|x| + \\dfrac{1}{x} + C\\).",
        ],
        answer: "\\(\\dfrac{x^3}{3} + 3\\log|x| + \\dfrac{1}{x} + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\left(\\dfrac{1}{1 + x^2} + \\dfrac{1}{\\sqrt{1 - x^2}}\\right)dx\\).", answer: "\\(\\tan^{-1} x + \\sin^{-1} x + C\\)" },
        { prompt: "Find \\(\\int \\cos 4x\\,dx\\) by inspection.", answer: "\\(\\dfrac{1}{4}\\sin 4x + C\\)" },
        { prompt: "Find \\(\\int \\operatorname{cosec} x(\\operatorname{cosec} x - \\cot x)\\,dx\\).", answer: "\\(-\\cot x + \\operatorname{cosec} x + C\\)", method: "\\(\\operatorname{cosec}^2 x - \\operatorname{cosec} x\\cot x\\)" },
      ],
      pyqExampleId: "5abf3fc5-d243-49f8-a122-ecf6c8b0ae88",
      traps: [
        {
          title: "Multiplying by log a in place of dividing",
          body: "The derivative of \\(a^x\\) is \\(a^x\\log a\\), so the integral of \\(a^x\\) is \\(\\dfrac{a^x}{\\log a}\\). Writing \\(a^x\\log a + C\\) is the derivative, not the integral.",
        },
        {
          title: "The sign of the integral of sin x",
          body: "\\(\\int \\sin x\\,dx = -\\cos x + C\\). Check by differentiating: \\(\\dfrac{d}{dx}(-\\cos x) = \\sin x\\).",
        },
        {
          title: "Leaving out + C",
          body: "An indefinite integral always ends with \\(+ C\\). In a two or three-mark answer the last line without it can cost the answer mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-simplify-first",
      name: "Simplify the integrand before integrating",
      intuition:
        "Many one-mark questions look hard only because of their dress. \\(e^{3\\log x}\\) is just \\(x^3\\); a fraction whose numerator has the denominator as a factor cancels; \\(\\tan^2 x\\) is \\(\\sec^2 x - 1\\). Rewrite first, and a standard integral appears.",
      definition:
        "- \\(e^{\\log x} = x\\) for \\(x > 0\\), so \\(e^{k\\log x} = e^{\\log x^k} = x^k\\).\n" +
        "- Factorise the numerator and cancel a common factor with the denominator.\n" +
        "- Divide each term of the numerator by a single-term denominator.\n" +
        "- Expand brackets such as \\(\\left(\\sqrt{x} - \\dfrac{1}{\\sqrt{x}}\\right)^2\\) before integrating.\n" +
        "- Use \\(\\tan^2 x = \\sec^2 x - 1\\) and \\(\\cot^2 x = \\operatorname{cosec}^2 x - 1\\).",
      formula: {
        label: "The exponential of a logarithm",
        latex: "e^{k\\log x} = x^k \\quad (x > 0)",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{e^{7\\log x} + e^{3\\log x}}{x^2}\\,dx\\).",
        steps: [
          "\\(e^{7\\log x} = x^7\\) and \\(e^{3\\log x} = x^3\\).",
          "The integrand is \\(\\dfrac{x^7 + x^3}{x^2} = x^5 + x\\).",
          "\\(\\int (x^5 + x)\\,dx = \\dfrac{x^6}{6} + \\dfrac{x^2}{2} + C\\).",
        ],
        answer: "\\(\\dfrac{x^6}{6} + \\dfrac{x^2}{2} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{x^3 + 1}{x + 1}\\,dx\\).",
        steps: [
          "\\(x^3 + 1 = (x + 1)(x^2 - x + 1)\\).",
          "Cancel \\(x + 1\\): the integrand is \\(x^2 - x + 1\\).",
          "\\(\\int (x^2 - x + 1)\\,dx = \\dfrac{x^3}{3} - \\dfrac{x^2}{2} + x + C\\).",
        ],
        answer: "\\(\\dfrac{x^3}{3} - \\dfrac{x^2}{2} + x + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int e^{2\\log x}\\,dx\\).", answer: "\\(\\dfrac{x^3}{3} + C\\)" },
        { prompt: "Find \\(\\int \\tan^2 x\\,dx\\).", answer: "\\(\\tan x - x + C\\)", method: "\\(\\sec^2 x - 1\\)" },
        { prompt: "Find \\(\\int \\dfrac{x^4 - 1}{x^2 + 1}\\,dx\\).", answer: "\\(\\dfrac{x^3}{3} - x + C\\)", method: "\\(x^4 - 1 = (x^2 - 1)(x^2 + 1)\\)" },
      ],
      pyqExampleId: "521de651-6820-4f05-b7b3-4891b70cc590",
      traps: [
        {
          title: "Integrating the exponential as it stands",
          body: "\\(\\int e^{3\\log x}\\,dx\\) is not \\(e^{3\\log x} + C\\). Simplify to \\(x^3\\) first; the answer is \\(\\dfrac{x^4}{4} + C\\).",
        },
        {
          title: "A negative power",
          body: "\\(e^{-4\\log x} = x^{-4}\\), and \\(\\int x^{-4}\\,dx = \\dfrac{x^{-3}}{-3} = -\\dfrac{1}{3x^3}\\). Keep the minus sign that the power rule brings in.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-find-f",
      name: "Finding f(x) from its derivative and one value",
      intuition:
        "Knowing \\(f'(x)\\) tells you \\(f(x)\\) only up to a constant: the whole family \\(F(x) + C\\) has the same derivative. One given value, such as \\(f(1) = 0\\), picks out the one member of the family you want.",
      definition:
        "- Integrate \\(f'(x)\\) term by term to get \\(f(x) = F(x) + C\\).\n" +
        "- Put the given value of \\(x\\) into \\(F(x) + C\\) and set it equal to the given value of \\(f\\).\n" +
        "- Solve for \\(C\\) and write \\(f(x)\\) in full with that number in place of \\(C\\).\n" +
        "- The final answer has **no** \\(+ C\\): the condition has fixed it.",
      formula: {
        label: "Fixing the constant",
        latex: "f(x) = \\int f'(x)\\,dx = F(x) + C, \\qquad f(a) = b \\Rightarrow C = b - F(a)",
      },
      authoredExample: {
        prompt: "Find \\(f(x)\\) if \\(f'(x) = 6x^2 + 4x - 1\\) and \\(f(1) = 5\\).",
        steps: [
          "\\(f(x) = \\int (6x^2 + 4x - 1)\\,dx = 2x^3 + 2x^2 - x + C\\).",
          "\\(f(1) = 2 + 2 - 1 + C = 3 + C\\).",
          "\\(3 + C = 5\\), so \\(C = 2\\).",
          "\\(\\therefore f(x) = 2x^3 + 2x^2 - x + 2\\).",
        ],
        answer: "\\(f(x) = 2x^3 + 2x^2 - x + 2\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(F(x)\\) if \\(F'(x) = \\cos x + e^x\\) and \\(F(0) = 3\\).",
        steps: [
          "\\(F(x) = \\sin x + e^x + C\\).",
          "\\(F(0) = 0 + 1 + C = 1 + C\\).",
          "\\(1 + C = 3\\), so \\(C = 2\\).",
          "\\(\\therefore F(x) = \\sin x + e^x + 2\\).",
        ],
        answer: "\\(F(x) = \\sin x + e^x + 2\\)",
      },
      practiceSet: [
        { prompt: "Find \\(f(x)\\) if \\(f'(x) = \\sec^2 x\\) and \\(f\\left(\\dfrac{\\pi}{4}\\right) = 0\\).", answer: "\\(f(x) = \\tan x - 1\\)" },
        { prompt: "Find \\(f(x)\\) if \\(f'(x) = 3\\sqrt{x}\\) and \\(f(4) = 10\\).", answer: "\\(f(x) = 2x^{3/2} - 6\\)", method: "\\(2 \\times 8 + C = 10\\)" },
        { prompt: "Find \\(f(x)\\) if \\(f'(x) = \\dfrac{1}{x}\\) and \\(f(e) = 4\\).", answer: "\\(f(x) = \\log|x| + 3\\)" },
      ],
      pyqExampleId: "85098fd4-61d2-482d-8864-f920d3a7b444",
      traps: [
        {
          title: "Keeping + C after the condition",
          body: "Once \\(f(a) = b\\) is used, \\(C\\) is a number. An answer such as \\(x^2 + 3\\log|x| + C\\) ignores the condition; the MCQs put that form among the options to catch this.",
        },
        {
          title: "Setting C equal to the given value",
          body: "\\(f(1) = 5\\) does not mean \\(C = 5\\). Put \\(x = 1\\) into the whole of \\(F(x) + C\\) first, then solve.",
        },
      ],
    },
  ],
};
