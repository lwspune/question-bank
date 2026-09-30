import type { SubtopicNote } from "@/app/notes/_types";

export const LINEAR_DE_NOTE: SubtopicNote = {
  subtopicName: "Linear Equations: The Integrating Factor",
  title: "Linear Equations: The Integrating Factor",
  oneLineDefinition:
    "Solving dy/dx + P(x)y = Q(x) by multiplying through by the integrating factor, the exponential of the integral of P, which turns the left side into the derivative of a product.",
  whyItMatters:
    "Twenty-seven PYQs, ten of them numerical answer. Each is one routine: write the equation in standard form, find the integrating factor, integrate, and fix the constant. The two ideas differ only in where the factor comes from — algebraic P, or trigonometric and inverse-trigonometric P.",
  concepts: [
    // C1 — standard form, algebraic P
    {
      kind: "formula" as const,
      slug: "jde-if",
      name: "Standard form and the integrating factor",
      intuition:
        "Divide by the coefficient of \\(\\frac{dy}{dx}\\) to reach \\(\\frac{dy}{dx}+Py=Q\\). The integrating factor is the multiplier \\(\\mu=e^{\\int P\\,dx}\\); it is chosen so that \\(\\mu y'+\\mu Py=(\\mu y)'\\). Then \\(\\mu y=\\int\\mu Q\\,dx+C\\). With \\(P=\\frac kx\\), \\(\\mu=x^k\\); with \\(P=\\frac{2x}{1+x^2}\\), \\(\\mu=1+x^2\\).",
      definition:
        "- Standard form: \\(\\frac{dy}{dx}+P(x)\\,y=Q(x)\\).\n" +
        "- Integrating factor \\(\\mu=e^{\\int P\\,dx}\\); then \\(\\mu y=\\int\\mu Q\\,dx+C\\).\n" +
        "- \\(e^{\\int P}\\) for \\(P=\\frac kx\\): \\(x^k\\); for \\(P=\\frac{1}{x\\ln x}\\): \\(\\ln x\\); for \\(P=-\\frac{x}{1-x^2}\\): \\(\\sqrt{1-x^2}\\).\n" +
        "- Constant \\(P=k\\): \\(\\mu=e^{kx}\\).",
      formula: {
        label: "Linear equation",
        latex: "\\frac{dy}{dx}+Py=Q\\ \\Rightarrow\\ y\\,e^{\\int P\\,dx}=\\int Q\\,e^{\\int P\\,dx}\\,dx+C",
      },
      authoredExample: {
        prompt: "Solve \\(x\\frac{dy}{dx}+2y=x^2\\) with \\(y(1)=1\\), and find \\(y(2)\\).",
        steps: [
          "Standard form \\(y'+\\frac2xy=x\\); integrating factor \\(x^2\\).",
          "\\((x^2y)'=x^3\\Rightarrow x^2y=\\frac{x^4}{4}+C\\); \\(y(1)=1\\) gives \\(C=\\frac34\\).",
        ],
        answer: "\\(y(2)=\\frac{4+3/4}{4}=\\frac{19}{16}\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{dy}{dx}-y=e^{2x}\\) with \\(y(0)=0\\).",
        steps: [
          "Integrating factor \\(e^{-x}\\): \\((ye^{-x})'=e^x\\Rightarrow ye^{-x}=e^x-1\\).",
        ],
        answer: "\\(y=e^{2x}-e^x\\).",
      },
      practiceSet: [
        { prompt: "Integrating factor of \\(y'+\\frac3xy=x\\)?", answer: "\\(x^3\\)" },
        { prompt: "Integrating factor of \\(y'+\\frac{2x}{1+x^2}y=1\\)?", answer: "\\(1+x^2\\)" },
        { prompt: "Integrating factor of \\(y'-2y=1\\)?", answer: "\\(e^{-2x}\\)" },
        { prompt: "\\(\\int\\frac{dx}{x\\ln x}\\)?", answer: "\\(\\ln(\\ln x)\\)" },
      ],
      pyqExampleId: "8b6c7b60-2ad6-408d-b6f8-6230880e8115", // 2022 — (4 + x^2)dy - 2x(x^2 + 3y + 4)dx = 0 through the origin
      traps: [
        {
          title: "Standard form before the factor",
          body: "The integrating factor comes from \\(P\\) only after the coefficient of \\(y'\\) is 1. In \\(x\\,y'+2y=x^2\\), \\(P\\) is \\(\\frac2x\\), not 2.",
        },
      ],
    },

    // C2 — trig and inverse trig P
    {
      kind: "formula" as const,
      slug: "jde-if-trig",
      name: "Integrating factors from trigonometric P",
      intuition:
        "The same routine, with the integrals that make trigonometric factors. \\(P=\\tan x\\) gives \\(\\sec x\\); \\(P=2\\tan x\\) gives \\(\\sec^2x\\); \\(P=-\\tan x\\) gives \\(\\cos x\\). \\(P=\\frac{1}{1+x^2}\\) gives \\(e^{\\tan^{-1}x}\\), and then putting \\(t=\\tan^{-1}x\\) makes \\(\\int\\mu Q\\,dx\\) routine.",
      definition:
        "- \\(e^{\\int\\tan x\\,dx}=\\sec x\\); \\(e^{\\int2\\tan x\\,dx}=\\sec^2x\\); \\(e^{-\\int\\tan x\\,dx}=\\cos x\\).\n" +
        "- \\(e^{\\int\\sec^2x\\,dx}=e^{\\tan x}\\); \\(e^{\\int\\cos x\\,dx}=e^{\\sin x}\\).\n" +
        "- \\(e^{\\int\\frac{dx}{1+x^2}}=e^{\\tan^{-1}x}\\); then put \\(t=\\tan^{-1}x\\).\n" +
        "- \\(\\int\\sec x\\tan x\\,dx=\\sec x\\).",
      formula: {
        label: "Common trigonometric factors",
        latex: "P=k\\tan x\\ \\Rightarrow\\ \\mu=\\sec^kx,\\qquad P=\\frac{1}{1+x^2}\\ \\Rightarrow\\ \\mu=e^{\\tan^{-1}x}",
      },
      authoredExample: {
        prompt: "Solve \\(\\frac{dy}{dx}+y\\tan x=\\cos x\\) with \\(y(0)=0\\), and find \\(y\\left(\\frac\\pi3\\right)\\).",
        steps: [
          "Integrating factor \\(\\sec x\\): \\((y\\sec x)'=1\\Rightarrow y\\sec x=x\\).",
        ],
        answer: "\\(y=x\\cos x\\), so \\(y\\left(\\frac\\pi3\\right)=\\frac\\pi6\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{dy}{dx}+y\\sec^2x=\\sec^2x\\) with \\(y(0)=0\\).",
        steps: [
          "Integrating factor \\(e^{\\tan x}\\): \\(ye^{\\tan x}=e^{\\tan x}+C\\), \\(C=-1\\).",
        ],
        answer: "\\(y=1-e^{-\\tan x}\\).",
      },
      practiceSet: [
        { prompt: "Integrating factor of \\(y'+2y\\tan x=\\sin x\\)?", answer: "\\(\\sec^2x\\)" },
        { prompt: "Integrating factor of \\(y'-y\\tan x=1\\)?", answer: "\\(\\cos x\\)" },
        { prompt: "Integrating factor of \\((1+x^2)y'+y=0\\)?", answer: "\\(e^{\\tan^{-1}x}\\)" },
        { prompt: "\\(\\int te^t\\,dt\\)?", answer: "\\(e^t(t-1)\\)" },
      ],
      pyqExampleId: "72ce0255-465f-4f48-ae68-5dad89112d71", // 2024 — (1 + x^2) y' + y = e^{tan^-1 x}, y(1) = 0
      traps: [
        {
          title: "Sign of the tangent term",
          body: "\\(\\int\\tan x\\,dx=\\ln\\sec x\\), so \\(+\\tan x\\) gives \\(\\sec x\\) and \\(-\\tan x\\) gives \\(\\cos x\\). Swapping them is the commonest slip on this page.",
        },
      ],
    },
  ],
};
