import type { SubtopicNote } from "@/app/notes/_types";

export const HIDDEN_DE_NOTE: SubtopicNote = {
  subtopicName: "Equations Hidden in Integrals and Limits",
  title: "Equations Hidden in Integrals and Limits",
  oneLineDefinition:
    "Questions that never print a differential equation: a function is defined by an integral of itself, by a limit, or by a rule on its derivatives, and differentiating is what produces the equation.",
  whyItMatters:
    "Fourteen PYQs, and five of them are from 2026 alone. Differentiating the given relation produces an equation from the earlier pages, and putting the lower limit into the original relation gives the starting value for free. Two ideas cover the page.",
  concepts: [
    // C1 — integral equations
    {
      kind: "formula" as const,
      slug: "jde-integral-eq",
      name: "Differentiating an integral equation",
      intuition:
        "If \\(f\\) appears inside \\(\\int_a^x\\), differentiate both sides: by the fundamental theorem, \\(\\frac{d}{dx}\\int_a^xg(t)\\,dt=g(x)\\). The relation becomes a differential equation, and setting \\(x=a\\) in the original relation gives \\(f(a)\\), because the integral vanishes there. When the integral has constant limits, it is just a number — call it \\(k\\) and solve for it at the end.",
      definition:
        "- \\(\\frac{d}{dx}\\int_a^xg(t)\\,dt=g(x)\\).\n" +
        "- Initial value: put \\(x=a\\) in the original relation.\n" +
        "- \\(\\int_0^xe^{x-t}f(t)\\,dt=e^x\\int_0^xe^{-t}f(t)\\,dt\\): take \\(e^x\\) out before differentiating.\n" +
        "- \\(\\int_0^2f(t)\\,dt=k\\) is a constant.",
      formula: {
        label: "Fundamental theorem",
        latex: "f(x)=h(x)+\\int_a^xg\\big(t,f(t)\\big)\\,dt\\ \\Rightarrow\\ f'(x)=h'(x)+g\\big(x,f(x)\\big),\\ f(a)=h(a)",
      },
      authoredExample: {
        prompt: "\\(f(x)=1+\\int_0^x2t\\,f(t)\\,dt\\). Find \\(f(1)\\).",
        steps: [
          "Differentiate: \\(f'=2xf\\), and \\(f(0)=1\\).",
          "\\(\\ln f=x^2\\), so \\(f=e^{x^2}\\).",
        ],
        answer: "\\(f(1)=e\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)+\\int_1^x\\frac{f(t)}{t}\\,dt=x\\). Find \\(f(1)\\) and the equation for \\(f\\).",
        steps: [
          "\\(x=1\\): \\(f(1)=1\\).",
          "Differentiate: \\(f'+\\frac fx=1\\).",
        ],
        answer: "\\(f(1)=1\\); \\(f'+\\frac fx=1\\), giving \\(f=\\frac x2+\\frac{1}{2x}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}\\int_0^xt^2f(t)\\,dt\\)?", answer: "\\(x^2f(x)\\)" },
        { prompt: "\\(f(x)=3+\\int_2^xf\\): \\(f(2)\\)?", answer: "\\(3\\)" },
        { prompt: "\\(f(x)=e^x+\\int_0^xf\\): the equation?", answer: "\\(f'=e^x+f\\)" },
        { prompt: "Is \\(\\int_0^1f(t)\\,dt\\) a function of \\(x\\)?", answer: "No, a constant" },
      ],
      pyqExampleId: "0cbc1f82-aafa-4bd6-bb7e-58095a585418", // 2021 — f(x) = integral of e^t f(t) + e^x
      traps: [
        {
          title: "The starting value is free",
          body: "Differentiating throws away the constant, so the equation alone cannot give \\(f\\). Put the lower limit into the original relation to get \\(f(a)\\) — the question almost never states it.",
        },
      ],
    },

    // C2 — limits and derivative rules
    {
      kind: "formula" as const,
      slug: "jde-limit-def",
      name: "Equations from limits and derivative rules",
      intuition:
        "A limit like \\(\\lim_{t\\to x}\\frac{t^2f(x)-x^2f(t)}{t-x}\\) is a \\(\\frac00\\) form; differentiating the numerator in \\(t\\) (L'Hôpital) gives \\(2xf(x)-x^2f'(x)\\), and the stated value turns this into a linear equation. A rule such as \\(f''=f\\) is solved by multiplying by \\(f'\\) and integrating: \\((f')^2=f^2+C\\).",
      definition:
        "- \\(\\lim_{t\\to x}\\frac{g(t,x)}{t-x}=\\frac{\\partial g}{\\partial t}\\Big|_{t=x}\\) when \\(g(x,x)=0\\).\n" +
        "- \\(\\lim_{t\\to x}\\frac{t^2f(x)-x^2f(t)}{t-x}=2xf(x)-x^2f'(x)\\).\n" +
        "- \\(f''=f\\): \\(f'f''=f'f\\Rightarrow(f')^2=f^2+C\\).\n" +
        "- \\(2ff'=f^2+f'^2\\Rightarrow(f'-f)^2=0\\Rightarrow f'=f\\).",
      formula: {
        label: "The limit as a derivative",
        latex: "\\lim_{t\\to x}\\frac{t^2f(x)-x^2f(t)}{t-x}=2xf(x)-x^2f'(x)",
      },
      authoredExample: {
        prompt: "\\(\\lim_{t\\to x}\\frac{tf(x)-xf(t)}{t-x}=1\\) for all \\(x>0\\), and \\(f(1)=0\\). Find \\(f\\).",
        steps: [
          "Differentiate the numerator in \\(t\\): \\(f(x)-xf'(x)=1\\).",
          "\\(\\left(\\frac fx\\right)'=-\\frac1{x^2}\\Rightarrow\\frac fx=\\frac1x+C\\); \\(f(1)=0\\) gives \\(C=-1\\).",
        ],
        answer: "\\(f(x)=1-x\\).",
      },
      selfCheckExample: {
        prompt: "\\(f'=f\\) and \\(f(0)=2\\). Find the mean of \\(f(\\ln1),f(\\ln2),f(\\ln3)\\).",
        steps: [
          "\\(f=2e^x\\), so \\(f(\\ln k)=2k\\).",
        ],
        answer: "\\(\\frac{2+4+6}{3}=4\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{t\\to x}\\frac{f(t)-f(x)}{t-x}\\)?", answer: "\\(f'(x)\\)" },
        { prompt: "\\(f''=f\\), \\(f(0)=0\\), \\(f'(0)=1\\): \\(f\\)?", answer: "\\(\\sinh x\\)" },
        { prompt: "\\((f'-f)^2=0\\) means?", answer: "\\(f'=f\\)" },
        { prompt: "\\(f'=f\\), \\(f(0)=3\\): \\(f(\\ln2)\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "4da1fe0b-2776-4a92-84a7-26919cae81de", // 2026 — limit (t^2 y(x) - x^2 y(t))/(x - t) = 3
      traps: [
        {
          title: "Watch the order in the denominator",
          body: "\\(\\frac{\\dots}{x-t}\\) and \\(\\frac{\\dots}{t-x}\\) differ by a sign. Differentiate in \\(t\\) and divide by the derivative of the denominator in \\(t\\), which is \\(-1\\) for \\(x-t\\).",
        },
      ],
    },
  ],
};
