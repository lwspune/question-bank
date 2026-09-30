import type { SubtopicNote } from "@/app/notes/_types";

export const SERIES_LIM_NOTE: SubtopicNote = {
  subtopicName: "Series Expansions and Unknown Constants",
  title: "Series Expansions and Unknown Constants",
  oneLineDefinition:
    "Evaluating limits by writing each function as the first few terms of its series, and choosing unknown constants so that a limit exists.",
  whyItMatters:
    "Twenty-two PYQs, seventeen of them multiple choice, and five from 2026. Six evaluate a limit by expanding sin x, cos x, eˣ or ln(1 + x); sixteen ask for constants that make a limit finite, then for the limit itself. Two ideas cover the page.",
  concepts: [
    // C1 — evaluate by series
    {
      kind: "formula" as const,
      slug: "jlim-series-value",
      name: "Limits by series expansion",
      intuition:
        "Near 0, replace each function by its series up to the power that matters: the lowest power in the denominator. Terms cancel, and the first surviving term decides the limit. This works where standard limits do not, as in \\(\\frac{x-\\sin x}{x^3}\\).",
      definition:
        "- \\(\\sin x=x-\\frac{x^3}6+\\dots\\), \\(\\cos x=1-\\frac{x^2}2+\\frac{x^4}{24}-\\dots\\).\n" +
        "- \\(e^x=1+x+\\frac{x^2}2+\\frac{x^3}6+\\dots\\), \\(\\ln(1+x)=x-\\frac{x^2}2+\\frac{x^3}3-\\dots\\).\n" +
        "- \\(\\tan x=x+\\frac{x^3}3+\\dots\\), \\((1+x)^n=1+nx+\\frac{n(n-1)}2x^2+\\dots\\).",
      formula: {
        label: "Key expansions",
        latex: "\\sin x=x-\\tfrac{x^3}{6}+\\cdots,\\quad\\cos x=1-\\tfrac{x^2}{2}+\\cdots,\\quad e^x=1+x+\\tfrac{x^2}{2}+\\cdots",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac{x-\\sin x}{x^3}\\).",
        steps: [
          "\\(x-\\sin x=\\frac{x^3}6-\\dots\\).",
        ],
        answer: "\\(\\frac16\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac{e^x-1-x}{x^2}\\).",
        steps: [
          "\\(e^x-1-x=\\frac{x^2}2+\\dots\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to0}\\frac{\\tan x-x}{x^3}\\)?", answer: "\\(\\frac13\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{x-\\ln(1+x)}{x^2}\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{\\cos x-1+\\frac{x^2}2}{x^4}\\)?", answer: "\\(\\frac1{24}\\)" },
        { prompt: "Lowest term of \\(\\sin x-\\tan x\\)?", answer: "\\(-\\frac{x^3}2\\)" },
      ],
      pyqExampleId: "e9af773d-b33f-41b9-b7d7-beb005313064", // 2026 — a limit evaluated by series
      traps: [
        {
          title: "Expand far enough",
          body: "Stop too early and everything cancels, leaving \\(\\frac00\\) again. Expand each function to the power of \\(x\\) in the denominator.",
        },
      ],
    },

    // C2 — constants for a finite limit
    {
      kind: "formula" as const,
      slug: "jlim-constants",
      name: "Constants that make a limit finite",
      intuition:
        "If a limit like \\(\\frac{f(x)}{x^n}\\) is finite, every term of \\(f\\) below \\(x^n\\) must vanish. Expand \\(f\\), set the coefficients of \\(1, x, \\dots, x^{n-1}\\) to zero to find the constants, and the coefficient of \\(x^n\\) is the limit.",
      definition:
        "- \\(\\lim\\frac{f(x)}{x^n}\\) finite: the coefficients of \\(x^0,\\dots,x^{n-1}\\) in \\(f\\) are 0.\n" +
        "- The limit is then the coefficient of \\(x^n\\).\n" +
        "- One equation per vanishing coefficient: count the unknowns.",
      formula: {
        label: "Matching coefficients",
        latex: "f(x)=c_0+c_1x+\\dots:\\ \\lim_{x\\to0}\\frac{f(x)}{x^n}\\ \\text{finite}\\Rightarrow c_0=\\dots=c_{n-1}=0",
      },
      authoredExample: {
        prompt: "Find \\(a\\) so that \\(\\lim_{x\\to0}\\frac{e^{ax}-1-2x}{x^2}\\) is finite, and the limit.",
        steps: [
          "\\(e^{ax}-1-2x=(a-2)x+\\frac{a^2}2x^2+\\dots\\), so \\(a=2\\).",
        ],
        answer: "\\(a=2\\); the limit is \\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(a\\) so that \\(\\lim_{x\\to0}\\frac{\\sin x+ax}{x^3}\\) is finite, and the limit.",
        steps: [
          "\\(\\sin x+ax=(1+a)x-\\frac{x^3}6+\\dots\\), so \\(a=-1\\).",
        ],
        answer: "\\(a=-1\\); the limit is \\(-\\frac16\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim\\frac{a+\\cos x}{x^2}\\) finite: \\(a\\)?", answer: "\\(-1\\)" },
        { prompt: "Then the limit?", answer: "\\(-\\frac12\\)" },
        { prompt: "\\(\\lim\\frac{\\ln(1+x)-bx}{x^2}\\) finite: \\(b\\)?", answer: "\\(1\\)" },
        { prompt: "Then the limit?", answer: "\\(-\\frac12\\)" },
      ],
      pyqExampleId: "df77001c-dd99-488e-be17-0323d54aa96b", // 2026 — constants that make a limit finite
      traps: [
        {
          title: "Finite is not the same as zero",
          body: "The lower coefficients must vanish; the \\(x^n\\) coefficient need not. Setting it to zero as well answers a different question.",
        },
      ],
    },
  ],
};
