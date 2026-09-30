import type { SubtopicNote } from "@/app/notes/_types";

export const CALCULUS_LIM_NOTE: SubtopicNote = {
  subtopicName: "Limits via Derivatives and Integrals",
  title: "Limits via Derivatives and Integrals",
  oneLineDefinition:
    "Limits that are derivatives in disguise, and limits of integrals with a variable limit, settled by differentiating.",
  whyItMatters:
    "Fifteen PYQs, ten of them multiple choice. Eight recognise a difference quotient or use L'Hospital's rule, often with f and f′ given only at one point; seven have an integral with a variable limit, differentiated by the Leibniz rule. Two ideas cover the page.",
  concepts: [
    // C1 — derivatives
    {
      kind: "formula" as const,
      slug: "jlim-derivative",
      name: "Limits that are derivatives",
      intuition:
        "\\(\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h\\) is \\(f'(a)\\) by definition. Rearrange a limit into difference quotients and read off derivatives. For any 0/0 form of differentiable functions, L'Hospital's rule replaces the ratio by the ratio of derivatives.",
      definition:
        "- \\(f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\).\n" +
        "- \\(\\lim_{h\\to0}\\frac{f(a+h)-f(a-h)}h=2f'(a)\\).\n" +
        "- L'Hospital: for \\(\\frac00\\) or \\(\\frac\\infty\\infty\\), \\(\\lim\\frac fg=\\lim\\frac{f'}{g'}\\).",
      formula: {
        label: "Derivative as a limit",
        latex: "f'(a)=\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to1}\\frac{x^{10}-1}{x-1}\\).",
        steps: [
          "It is the derivative of \\(x^{10}\\) at 1.",
        ],
        answer: "\\(10\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(2)=3\\) and \\(f'(2)=5\\). Find \\(\\lim_{h\\to0}\\frac{f(2+h)-f(2-h)}h\\).",
        steps: [
          "Split as \\(\\frac{f(2+h)-f(2)}h+\\frac{f(2)-f(2-h)}h\\to5+5\\).",
        ],
        answer: "\\(10\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to0}\\frac{\\sin x-x}{x^2}\\) (L'Hospital)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim_{h\\to0}\\frac{e^{2+h}-e^2}h\\)?", answer: "\\(e^2\\)" },
        { prompt: "\\(\\lim_{x\\to a}\\frac{xf(a)-af(x)}{x-a}\\)?", answer: "\\(f(a)-af'(a)\\)" },
        { prompt: "\\(\\lim_{x\\to\\pi}\\frac{\\sin x}{x-\\pi}\\)?", answer: "\\(-1\\)" },
      ],
      pyqExampleId: "f6b8b3f2-cbdd-4c98-9a1c-769abbd5ca8e", // 2026 — a limit read as a derivative
      traps: [
        {
          title: "Check the form before L'Hospital",
          body: "L'Hospital's rule needs \\(\\frac00\\) or \\(\\frac\\infty\\infty\\). Applied to a determinate form it gives a wrong answer.",
        },
      ],
    },

    // C2 — integrals
    {
      kind: "formula" as const,
      slug: "jlim-integral",
      name: "Limits of integrals",
      intuition:
        "An integral with a variable limit, such as \\(\\int_0^{x^2}g(t)\\,dt\\), tends to 0 as \\(x\\to0\\), so a ratio with a power of \\(x\\) is 0/0. Differentiate top and bottom: by the Leibniz rule the top becomes \\(g(x^2)\\cdot2x\\). Repeat if it is still 0/0.",
      definition:
        "- \\(\\frac d{dx}\\int_a^{u(x)}g(t)\\,dt=g(u(x))\\,u'(x)\\).\n" +
        "- Use L'Hospital on \\(\\frac{\\int_0^{u(x)}g}{x^n}\\).\n" +
        "- Near 0, \\(\\int_0^xg(t)\\,dt\\approx g(0)x\\).",
      formula: {
        label: "Leibniz rule",
        latex: "\\frac{d}{dx}\\int_a^{u(x)}g(t)\\,dt=g\\big(u(x)\\big)\\,u'(x)",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac1x\\int_0^x\\cos t^2\\,dt\\).",
        steps: [
          "L'Hospital: \\(\\frac{\\cos x^2}1\\to1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac1{x^4}\\int_0^{x^2}\\sin t\\,dt\\).",
        steps: [
          "L'Hospital: \\(\\frac{\\sin(x^2)\\cdot2x}{4x^3}\\to\\frac24\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac d{dx}\\int_0^{x^3}e^t\\,dt\\)?", answer: "\\(3x^2e^{x^3}\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac1x\\int_0^xe^{t^2}dt\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac1{x^2}\\int_0^x\\sin t\\,dt\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\frac d{dx}\\int_x^1t\\,dt\\)?", answer: "\\(-x\\)" },
      ],
      pyqExampleId: "b8165383-17ca-433d-888f-dff83d8fff4d", // 2024 — a limit of an integral with a variable limit
      traps: [
        {
          title: "Chain rule on the limit",
          body: "Differentiating \\(\\int_0^{x^2}g(t)\\,dt\\) gives \\(g(x^2)\\cdot2x\\), not \\(g(x^2)\\). The factor \\(u'(x)\\) is easy to drop.",
        },
      ],
    },
  ],
};
