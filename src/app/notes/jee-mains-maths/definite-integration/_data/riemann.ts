import type { SubtopicNote } from "@/app/notes/_types";

export const RIEMANN_DI_NOTE: SubtopicNote = {
  subtopicName: "Limits of Sums as Integrals",
  title: "Limits of Sums as Integrals",
  oneLineDefinition:
    "Limits of long sums rewritten as (1/n) Σ f(k/n) and evaluated as a definite integral, with the limits set by the range of k.",
  whyItMatters:
    "Seven PYQs, the smallest page in the chapter, and all the same move: divide by the right power of n until each term reads (1/n) f(k/n), then integrate. The only choices are f and the limits. One idea covers the page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "jdi-riemann",
      name: "Sums as integrals",
      intuition:
        "\\(\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^nf\\left(\\frac kn\\right)=\\int_0^1f(x)\\,dx\\): the sum adds strips of width \\(\\frac1n\\) and height \\(f\\left(\\frac kn\\right)\\). Divide the numerator and denominator of each term by the power of \\(n\\) that leaves a factor \\(\\frac1n\\) times a function of \\(\\frac kn\\). If \\(k\\) runs to \\(2n\\) the upper limit is 2; constants outside the sum stay outside.",
      definition:
        "- \\(\\lim\\frac1n\\sum_{k=1}^{n}f\\left(\\frac kn\\right)=\\int_0^1f\\).\n" +
        "- \\(k\\) up to \\(pn\\): \\(\\int_0^pf\\).\n" +
        "- Replace \\(\\frac kn\\) by \\(x\\) and \\(\\frac1n\\) by \\(dx\\).",
      formula: {
        label: "Riemann sum",
        latex: "\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^{n}f\\!\\left(\\frac kn\\right)=\\int_0^1 f(x)\\,dx",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\sum_{k=1}^n\\frac{n}{n^2+k^2}\\).",
        steps: [
          "\\(\\frac{n}{n^2+k^2}=\\frac1n\\cdot\\frac{1}{1+(k/n)^2}\\).",
          "\\(\\int_0^1\\frac{dx}{1+x^2}\\).",
        ],
        answer: "\\(\\frac\\pi4\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^{2n}\\frac kn\\).",
        steps: [
          "\\(k\\) runs to \\(2n\\): \\(\\int_0^2x\\,dx\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2\\)?", answer: "\\(\\frac13\\)" },
        { prompt: "\\(\\lim\\sum_{k=1}^n\\frac1{n+k}\\)?", answer: "\\(\\ln2\\)" },
        { prompt: "\\(\\lim\\frac1n\\sum_{k=1}^{3n}1\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\lim\\sum_{k=1}^n\\frac{k}{n^2+k^2}\\)?", answer: "\\(\\frac12\\ln2\\)" },
      ],
      pyqExampleId: "165871a2-cca6-4a49-b3ea-2ccf0fa61f28", // 2022 — sum of n^2/((n^2 + r^2)(n + r)), r = 1..n
      traps: [
        {
          title: "Count the terms",
          body: "The range of \\(k\\) sets the upper limit. A sum to \\(2n\\) or \\(3n\\) integrates to 2 or 3, not 1.",
        },
      ],
    },
  ],
};
