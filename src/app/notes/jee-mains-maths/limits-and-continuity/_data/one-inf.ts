import type { SubtopicNote } from "@/app/notes/_types";

export const ONE_INF_LIM_NOTE: SubtopicNote = {
  subtopicName: "Exponential Limits (1 to the Power Infinity)",
  title: "Exponential Limits (1 to the Power Infinity)",
  oneLineDefinition:
    "Limits of a base tending to 1 raised to a power tending to infinity, all settled by one formula.",
  whyItMatters:
    "Ten PYQs, six of them multiple choice. Seven have the variable tending to 0 or to a finite point, three tend to infinity; every one is the same formula once the form is recognised. Two ideas cover the page.",
  concepts: [
    // C1 — at a point
    {
      kind: "formula" as const,
      slug: "jlim-one-inf-zero",
      name: "The 1^∞ formula at a point",
      intuition:
        "If \\(f\\to1\\) and \\(g\\to\\infty\\), then \\(f^g=e^{g\\ln f}\\), and \\(\\ln f\\approx f-1\\) because \\(f\\) is near 1. So \\(f^g\\to e^{\\lim g(f-1)}\\). Find that product's limit with the standard limits and exponentiate.",
      definition:
        "- Form \\(1^\\infty\\): \\(\\lim f^g=e^{\\lim g(f-1)}\\).\n" +
        "- \\(\\lim_{x\\to0}(1+ax)^{b/x}=e^{ab}\\).\n" +
        "- Check the base really tends to 1 first.",
      formula: {
        label: "1 to the power infinity",
        latex: "\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}\\quad(f\\to1,\\ g\\to\\infty)",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to0}(1+3x)^{2/x}\\).",
        steps: [
          "\\(\\frac2x\\cdot3x=6\\).",
        ],
        answer: "\\(e^6\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0}(\\cos x)^{1/x^2}\\).",
        steps: [
          "\\(\\frac{\\cos x-1}{x^2}\\to-\\frac12\\).",
        ],
        answer: "\\(e^{-1/2}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to0}(1-x)^{1/x}\\)?", answer: "\\(e^{-1}\\)" },
        { prompt: "\\(\\lim_{x\\to0}(1+\\sin x)^{1/x}\\)?", answer: "\\(e\\)" },
        { prompt: "\\(\\lim_{x\\to0}(1+\\tan^2x)^{1/x^2}\\)?", answer: "\\(e\\)" },
        { prompt: "\\(\\lim_{x\\to0}(1+2x)^{1/(3x)}\\)?", answer: "\\(e^{2/3}\\)" },
      ],
      pyqExampleId: "808db13e-9f2e-4374-b2cd-2028f15b9dfe", // 2025 — a 1^infinity limit at a point
      traps: [
        {
          title: "Is it really 1 to the infinity?",
          body: "If the base tends to something other than 1, the limit is just (base limit)^(power limit) or 0 or infinity. Apply the formula only when the base tends to 1.",
        },
      ],
    },

    // C2 — at infinity
    {
      kind: "formula" as const,
      slug: "jlim-one-inf-infinity",
      name: "The 1^∞ formula at infinity",
      intuition:
        "As \\(x\\to\\infty\\), a ratio like \\(\\frac{x+2}{x-1}\\) tends to 1 while the power \\(x\\) grows, so the same formula applies: \\(g(f-1)=x\\cdot\\frac3{x-1}\\to3\\). The pattern \\(\\left(1+\\frac an\\right)^{bn}\\to e^{ab}\\) covers most cases.",
      definition:
        "- \\(\\lim_{n\\to\\infty}\\left(1+\\frac an\\right)^{bn}=e^{ab}\\).\n" +
        "- For a ratio, write \\(f-1\\) as one fraction, then multiply by \\(g\\).",
      formula: {
        label: "The e limit",
        latex: "\\lim_{n\\to\\infty}\\left(1+\\frac an\\right)^{bn}=e^{ab}",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to\\infty}\\left(\\frac{x+2}{x-1}\\right)^x\\).",
        steps: [
          "\\(f-1=\\frac3{x-1}\\), and \\(x\\cdot\\frac3{x-1}\\to3\\).",
        ],
        answer: "\\(e^3\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\left(1-\\frac1n\\right)^{2n}\\).",
        steps: [
          "\\(a=-1\\), \\(b=2\\).",
        ],
        answer: "\\(e^{-2}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim\\left(1+\\frac1n\\right)^n\\)?", answer: "\\(e\\)" },
        { prompt: "\\(\\lim\\left(1+\\frac3n\\right)^{n}\\)?", answer: "\\(e^3\\)" },
        { prompt: "\\(\\lim\\left(\\frac{n}{n+1}\\right)^n\\)?", answer: "\\(e^{-1}\\)" },
        { prompt: "\\(\\lim\\left(1+\\frac1{n^2}\\right)^n\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "ab57859b-4fb1-4da3-ba68-640eed5b4a99", // 2025 — a 1^infinity limit as x tends to infinity
      traps: [
        {
          title: "The product can tend to 0",
          body: "In \\(\\left(1+\\frac1{n^2}\\right)^n\\), \\(g(f-1)=\\frac1n\\to0\\), so the limit is \\(e^0=1\\). Compute the product; do not assume it gives \\(e\\).",
        },
      ],
    },
  ],
};
