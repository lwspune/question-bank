import type { SubtopicNote } from "@/app/notes/_types";

export const DISGUISE_DE_NOTE: SubtopicNote = {
  subtopicName: "Integrating Factors in Disguise",
  title: "Integrating Factors in Disguise",
  oneLineDefinition:
    "Linear equations where the integrating factor is not found by a standard integral: the left side is already the derivative of a product, or P is the derivative of the logarithm of some function.",
  whyItMatters:
    "Twenty-two PYQs, and they look much harder than they are. A long coefficient of y is usually the derivative of a log, so its integrating factor is a simple quotient; and a messy left side is often already d(uy)/dx. Spotting that is the whole question. Two ideas cover the page.",
  concepts: [
    // C1 — left side is already a derivative
    {
      kind: "formula" as const,
      slug: "jde-exact-left",
      name: "The left side is already a derivative",
      intuition:
        "Before computing anything, check whether the left side is the derivative of a product: \\(u\\,y'+u'\\,y=(uy)'\\). If the coefficient of \\(y\\) is the derivative of the coefficient of \\(y'\\), integrate both sides at once. Likewise \\(u\\,y'-u'\\,y\\) over \\(u^2\\) is \\(\\left(\\frac yu\\right)'\\). Simplifying a heavy coefficient first — or moving the origin — often reveals the same pattern.",
      definition:
        "- \\(u\\,y'+u'\\,y=(uy)'\\): e.g. \\(x^4y'+4x^3y=(x^4y)'\\).\n" +
        "- \\(\\frac{u\\,y'-u'\\,y}{u^2}=\\left(\\frac yu\\right)'\\).\n" +
        "- \\((1+\\cos^2x)'=-\\sin2x\\), \\((x^2+4)'=2x\\).\n" +
        "- Simplify first: \\(\\sin x(\\sec x-\\sin x\\tan x)=\\sin x\\cos x\\).",
      formula: {
        label: "Product rule in reverse",
        latex: "u\\,\\frac{dy}{dx}+\\frac{du}{dx}\\,y=\\frac{d}{dx}(uy)",
      },
      authoredExample: {
        prompt: "Solve \\((1+x^2)\\frac{dy}{dx}+2xy=\\cos x\\) with \\(y(0)=0\\).",
        steps: [
          "The left side is \\(\\frac{d}{dx}\\left((1+x^2)y\\right)\\).",
          "\\((1+x^2)y=\\sin x+C\\), \\(C=0\\).",
        ],
        answer: "\\(y=\\frac{\\sin x}{1+x^2}\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sin x\\,\\frac{dy}{dx}+y\\cos x=2x\\) with \\(y\\left(\\frac\\pi2\\right)=0\\).",
        steps: [
          "\\((y\\sin x)'=2x\\Rightarrow y\\sin x=x^2+C\\), \\(C=-\\frac{\\pi^2}{4}\\).",
        ],
        answer: "\\(y=\\frac{x^2-\\pi^2/4}{\\sin x}\\).",
      },
      practiceSet: [
        { prompt: "\\(x\\,y'+y\\)?", answer: "\\((xy)'\\)" },
        { prompt: "\\(e^xy'+e^xy\\)?", answer: "\\((e^xy)'\\)" },
        { prompt: "\\(\\frac{xy'-y}{x^2}\\)?", answer: "\\(\\left(\\frac yx\\right)'\\)" },
        { prompt: "\\(\\cos x\\,y'-\\sin x\\,y\\)?", answer: "\\((y\\cos x)'\\)" },
      ],
      pyqExampleId: "26f7a0ea-225e-49a9-89f3-aab30bc1cbb9", // 2024 — (x^2 + 4)^2 dy + (2x^3 y + 8xy - 2)dx = 0
      traps: [
        {
          title: "Divide only if it helps",
          body: "Dividing \\(x^4y'+4x^3y=f\\) by \\(x^4\\) and computing \\(e^{\\int4/x}=x^4\\) just multiplies back by \\(x^4\\). If the left side is already exact, integrate it directly.",
        },
      ],
    },

    // C2 — P is a log-derivative
    {
      kind: "formula" as const,
      slug: "jde-log-p",
      name: "When P is the derivative of a logarithm",
      intuition:
        "If \\(P=\\frac{g'}{g}\\), then \\(\\int P\\,dx=\\ln g\\) and the integrating factor is simply \\(g\\). A long rational or exponential coefficient is usually built this way: test the derivative of the denominator, or split by partial fractions into pieces like \\(\\frac1x\\), \\(\\frac{2}{x+1}\\), \\(-\\frac{1}{x+3}\\). The right side is then chosen so that \\(\\mu Q\\) integrates cleanly.",
      definition:
        "- \\(P=\\frac{g'}{g}\\Rightarrow\\mu=g\\); \\(P=\\frac{g'}{g}-\\frac{h'}{h}\\Rightarrow\\mu=\\frac gh\\).\n" +
        "- Partial fractions: \\(\\frac{5}{x(x^5+1)}=\\frac5x-\\frac{5x^4}{x^5+1}\\), so \\(\\mu=\\frac{x^5}{x^5+1}\\).\n" +
        "- \\(P=u'\\) for a known \\(u\\): \\(\\mu=e^{u}\\), and often \\(Q=e^{u}\\cdot(\\dots)\\).\n" +
        "- \\(\\int\\frac{dx}{x^2-1}=\\frac12\\ln\\frac{x-1}{x+1}\\).",
      formula: {
        label: "Log-derivative coefficient",
        latex: "P=\\frac{g'(x)}{g(x)}\\ \\Rightarrow\\ e^{\\int P\\,dx}=g(x)",
      },
      authoredExample: {
        prompt: "Find the integrating factor of \\(\\frac{dy}{dx}+\\frac{3x^2+1}{x^3+x}\\,y=1\\).",
        steps: [
          "The numerator is the derivative of the denominator \\(x^3+x\\).",
        ],
        answer: "\\(\\mu=x^3+x\\).",
      },
      selfCheckExample: {
        prompt: "Find the integrating factor of \\(\\frac{dy}{dx}+\\left(\\frac1x-\\frac{1}{x+1}\\right)y=1\\).",
        steps: [
          "\\(\\int P=\\ln x-\\ln(x+1)\\).",
        ],
        answer: "\\(\\mu=\\frac{x}{x+1}\\).",
      },
      practiceSet: [
        { prompt: "Integrating factor for \\(P=\\frac{2x}{x^2+3}\\)?", answer: "\\(x^2+3\\)" },
        { prompt: "Integrating factor for \\(P=\\frac{e^x}{1+e^x}\\)?", answer: "\\(1+e^x\\)" },
        { prompt: "Integrating factor for \\(P=\\frac{\\cos x}{\\sin x}\\)?", answer: "\\(\\sin x\\)" },
        { prompt: "Integrating factor for \\(P=\\frac{1}{x^2-1}\\) (\\(x>1\\))?", answer: "\\(\\sqrt{\\frac{x-1}{x+1}}\\)" },
      ],
      pyqExampleId: "cb81842b-fdc0-4ee0-ab17-96a0eb94935d", // 2022 — P = (2x^2 + 11x + 13)/(x^3 + 6x^2 + 11x + 6)
      traps: [
        {
          title: "Check the derivative, do not integrate blindly",
          body: "Differentiate the denominator and compare with the numerator before attempting the integral. When they match, the factor is the denominator itself; attempting a long integral wastes the time the question is testing.",
        },
      ],
    },
  ],
};
