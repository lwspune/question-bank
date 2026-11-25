import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_EXPONENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Exponential and Logarithmic Functions",
  title: "Exponential and Logarithmic Functions",
  oneLineDefinition:
    "The derivatives of e to the x, log x and a to the x, the laws of logarithms that simplify a function before it is differentiated, and relations in which x or y sits in an index.",
  whyItMatters:
    "25 questions, nine of them from board papers from 2024 to 2026. The board asks the derivative of one exponential with respect to another (5^x with respect to e^x, 2^x with respect to 3^x and e^(2x) with respect to e^x in 2024; 2^(cos² x) with respect to cos² x in 2025), the implicit relation 5^x + 5^y = 5^(x + y) (2024), the derivative of 5^x/x^5 (2025), an MCQ on the logarithm of √(2x) to base 2x (2025), the derivative of e^(e^x) (2026) and a proof built on log(√(x² + 1) − x) (2026). The textbook adds Examples 25 and 26, Exercise 5.4 and Miscellaneous Example 39(ii).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-exp-log",
      name: "Derivatives of e to the x, log x and a to the x",
      intuition:
        "The natural exponential \\(e^x\\) is its own derivative, and \\(\\log x\\) has derivative \\(\\dfrac{1}{x}\\). Every other exponential \\(a^x\\) can be written as \\(e^{x\\log a}\\), so its derivative follows from these two with the chain rule.",
      definition:
        "- **Theorem 5:** \\(\\dfrac{d}{dx}e^x = e^x\\), and \\(\\dfrac{d}{dx}\\log x = \\dfrac{1}{x}\\) for \\(x > 0\\). Here \\(\\log\\) means the natural logarithm, to base e.\n" +
        "- \\(\\dfrac{d}{dx}a^x = a^x\\log a\\) for a positive constant a (NCERT Example 28: \\(a^x = e^{x\\log a}\\)).\n" +
        "- With the chain rule: \\(\\dfrac{d}{dx}e^{g(x)} = e^{g(x)}g'(x)\\) and \\(\\dfrac{d}{dx}\\log g(x) = \\dfrac{g'(x)}{g(x)}\\) (NCERT Example 26).\n" +
        "- \\(\\log x\\) is defined only for \\(x > 0\\), so the derivative of \\(\\log(\\log x)\\) is found for \\(x > 1\\).",
      formula: {
        label: "Three standard derivatives",
        latex: "\\frac{d}{dx}e^x = e^x,\\qquad \\frac{d}{dx}\\log x = \\frac{1}{x},\\qquad \\frac{d}{dx}a^x = a^x\\log a",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = e^{2x}\\cos 3x\\) with respect to x.",
        steps: [
          "Product rule: \\(\\dfrac{dy}{dx} = \\dfrac{d}{dx}\\left(e^{2x}\\right) \\cdot \\cos 3x + e^{2x} \\cdot \\dfrac{d}{dx}(\\cos 3x)\\).",
          "\\(\\dfrac{d}{dx}e^{2x} = 2e^{2x}\\) and \\(\\dfrac{d}{dx}\\cos 3x = -3\\sin 3x\\).",
          "\\(\\dfrac{dy}{dx} = 2e^{2x}\\cos 3x - 3e^{2x}\\sin 3x = e^{2x}(2\\cos 3x - 3\\sin 3x)\\).",
        ],
        answer: "\\(e^{2x}(2\\cos 3x - 3\\sin 3x)\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\log(\\sec x + \\tan x)\\).",
        steps: [
          "\\(\\dfrac{d}{dx}\\log(\\sec x + \\tan x) = \\dfrac{1}{\\sec x + \\tan x} \\cdot (\\sec x\\tan x + \\sec^2 x)\\).",
          "\\(= \\dfrac{\\sec x(\\tan x + \\sec x)}{\\sec x + \\tan x} = \\sec x\\).",
        ],
        answer: "\\(\\sec x\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(7^{x^2}\\).", answer: "\\(2x \\cdot 7^{x^2}\\log 7\\)" },
        { prompt: "Find the derivative of \\(e^{\\sin x}\\) at \\(x = 0\\).", answer: "1", method: "\\(e^{\\sin x}\\cos x\\) at 0" },
        { prompt: "Differentiate \\(\\log(x^2 + 4)\\).", answer: "\\(\\dfrac{2x}{x^2 + 4}\\)" },
      ],
      pyqExampleId: "192002c5-1da1-4c01-aa08-cf78e8b85ed9",
      traps: [
        {
          title: "a to the x is not a power",
          body: "\\(\\dfrac{d}{dx}7^x = 7^x\\log 7\\), not \\(x \\cdot 7^{x - 1}\\). The power rule needs a constant index; here the variable is in the index.",
        },
        {
          title: "e to the power e to the x",
          body: "\\(\\dfrac{d}{dx}e^{e^x} = e^{e^x} \\cdot e^x\\). The inner \\(e^x\\) has its own derivative, and the board's options include the answer without it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-log-rules",
      name: "Laws of logarithms before differentiating",
      intuition:
        "A logarithm turns products into sums and powers into multiples. Use these laws first and the derivative often becomes one short line, or even zero.",
      definition:
        "- \\(\\log_b pq = \\log_b p + \\log_b q\\), \\(\\log_b \\dfrac{x}{y} = \\log_b x - \\log_b y\\), and \\(\\log_b p^n = n\\log_b p\\).\n" +
        "- Change of base: \\(\\log_a p = \\dfrac{\\log_b p}{\\log_b a}\\), so \\(\\log_7(\\log x) = \\dfrac{\\log(\\log x)}{\\log 7}\\) (NCERT Miscellaneous Example 39).\n" +
        "- \\(x = e^{\\log x}\\) only for \\(x > 0\\) (NCERT Example 25).\n" +
        "- There is no law for \\(\\log(p + q)\\): it does not split.",
      formula: {
        label: "Change of base",
        latex: "\\log_a p = \\frac{\\log_b p}{\\log_b a}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\log\\dfrac{(x^2 + 1)^3}{\\sqrt{x - 1}}\\), \\(x > 1\\).",
        steps: [
          "Use the laws of logarithms: \\(y = 3\\log(x^2 + 1) - \\dfrac{1}{2}\\log(x - 1)\\).",
          "\\(\\dfrac{dy}{dx} = 3 \\cdot \\dfrac{2x}{x^2 + 1} - \\dfrac{1}{2} \\cdot \\dfrac{1}{x - 1}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{6x}{x^2 + 1} - \\dfrac{1}{2(x - 1)}\\).",
        ],
        answer: "\\(\\dfrac{6x}{x^2 + 1} - \\dfrac{1}{2(x - 1)}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\log_3(x^2 + 5)\\).",
        steps: [
          "Change of base: \\(y = \\dfrac{\\log(x^2 + 5)}{\\log 3}\\).",
          "\\(\\log 3\\) is a constant, so \\(\\dfrac{dy}{dx} = \\dfrac{2x}{(x^2 + 5)\\log 3}\\).",
        ],
        answer: "\\(\\dfrac{2x}{(x^2 + 5)\\log 3}\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(e^{\\log x^2}\\), \\(x > 0\\).", answer: "\\(2x\\)", method: "\\(e^{\\log x^2} = x^2\\)" },
        { prompt: "Differentiate \\(\\log(x^3e^x)\\), \\(x > 0\\).", answer: "\\(\\dfrac{3}{x} + 1\\)" },
        { prompt: "Differentiate \\(\\log_2 x\\).", answer: "\\(\\dfrac{1}{x\\log 2}\\)" },
      ],
      pyqExampleId: "b626e538-1efd-43b2-9d5a-1652befb09b1",
      traps: [
        {
          title: "Splitting the log of a sum",
          body: "\\(\\log(x^x + \\operatorname{cosec}^2 x)\\) is not \\(\\log x^x + \\log\\operatorname{cosec}^2 x\\). Use the chain rule: one over the bracket, times the derivative of the bracket.",
        },
        {
          title: "Brackets round the argument",
          body: "\\(\\log\\sqrt{x^2 + 1} - x\\) and \\(\\log\\left(\\sqrt{x^2 + 1} - x\\right)\\) are different functions with different derivatives. Read, and write, the argument of every log inside brackets.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-exp-relations",
      name: "Relations with a variable in the index, and one exponential with respect to another",
      intuition:
        "When x or y sits in an index, take logs or differentiate with the rule for \\(a^u\\). The given relation itself is often the key to tidying the answer.",
      definition:
        "- \\(\\dfrac{d}{dx}a^{u} = a^{u}\\log a\\,\\dfrac{du}{dx}\\); when u is y, the factor is \\(\\dfrac{dy}{dx}\\).\n" +
        "- A common factor such as \\(\\log 5\\) appears in every term; cancel it early.\n" +
        "- After differentiating, substitute the given relation back to simplify, for example replace \\(5^{x + y}\\) by \\(5^x + 5^y\\).\n" +
        "- To differentiate \\(a^x\\) with respect to \\(b^x\\), divide the two derivatives: \\(\\dfrac{a^x\\log a}{b^x\\log b}\\).",
      formula: {
        label: "Derivative of a to the power u",
        latex: "\\frac{d}{dx}a^{u} = a^{u}\\log a\\,\\frac{du}{dx}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(2^y = x^3\\), \\(x > 0\\).",
        steps: [
          "Take logs: \\(y\\log 2 = 3\\log x\\).",
          "Differentiate: \\(\\log 2\\,\\dfrac{dy}{dx} = \\dfrac{3}{x}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{3}{x\\log 2}\\).",
        ],
        answer: "\\(\\dfrac{3}{x\\log 2}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(4^x\\) with respect to \\(2^x\\).",
        steps: [
          "\\(\\dfrac{d}{dx}4^x = 4^x\\log 4 = 2 \\cdot 4^x\\log 2\\), and \\(\\dfrac{d}{dx}2^x = 2^x\\log 2\\).",
          "Divide: \\(\\dfrac{2 \\cdot 4^x\\log 2}{2^x\\log 2} = 2 \\cdot 2^x = 2^{x + 1}\\).",
        ],
        answer: "\\(2^{x + 1}\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(e^{x - y} = x\\), \\(x > 0\\).",
          answer: "\\(1 - \\dfrac{1}{x}\\)",
          method: "\\(x - y = \\log x\\)",
        },
        { prompt: "Differentiate \\(e^{3x}\\) with respect to \\(e^x\\).", answer: "\\(3e^{2x}\\)" },
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(3^{x + y} = 9\\).",
          answer: "\\(-1\\)",
          method: "\\(x + y = 2\\)",
        },
      ],
      pyqExampleId: "5821f27f-4e4c-4b81-a08b-c82655a01708",
      traps: [
        {
          title: "Dropping dy/dx from an index",
          body: "\\(\\dfrac{d}{dx}3^y = 3^y\\log 3\\,\\dfrac{dy}{dx}\\). Without the factor \\(\\dfrac{dy}{dx}\\) there is nothing to solve for.",
        },
      ],
    },
  ],
};
