import type { SubtopicNote } from "@/app/notes/_types";

export const INFINITE_GP_SEQ_NOTE: SubtopicNote = {
  subtopicName: "Infinite Geometric Series",
  title: "Infinite Geometric Series",
  oneLineDefinition:
    "The sum to infinity of a GP with ratio between −1 and 1, the series of its squares or alternate terms, and infinite GPs hidden inside exponents, logarithms, double sums and repeated figures.",
  whyItMatters:
    "Eighteen PYQs, split evenly. Half give an infinite GP outright, often with the sum of its squares. The other half hide one: in an exponent like cos²x + cos⁴x + …, in a chain of logarithms, or in shapes shrinking step by step. Two ideas cover the page.",
  concepts: [
    // C1 — sum to infinity
    {
      kind: "formula" as const,
      slug: "jseq-igp-sum",
      name: "Sum to infinity, and the series of squares",
      intuition:
        "When \\(|r|<1\\), the terms shrink to zero and \\(S_\\infty=\\frac{a}{1-r}\\). The squares of the terms form another infinite GP, \\(a^2,a^2r^2,\\dots\\), with sum \\(\\frac{a^2}{1-r^2}\\). Dividing that by \\(S_\\infty\\) cancels one \\(a\\) and leaves \\(\\frac{a}{1+r}\\). Alternate terms form a GP with ratio \\(r^2\\).",
      definition:
        "- \\(S_\\infty=\\frac a{1-r}\\), only for \\(|r|<1\\).\n" +
        "- **Squares:** \\(\\frac{a^2}{1-r^2}\\). **Cubes:** \\(\\frac{a^3}{1-r^3}\\).\n" +
        "- \\(\\frac{\\text{sum of squares}}{S_\\infty}=\\frac a{1+r}\\).\n" +
        "- **Alternate terms** from \\(ar^k\\): \\(\\frac{ar^k}{1-r^2}\\).",
      formula: {
        label: "Sum to infinity",
        latex: "S_\\infty=\\frac{a}{1-r},\\quad |r|<1",
      },
      authoredExample: {
        prompt: "An infinite GP has sum 6, and the sum of the squares of its terms is 12. Find \\(a\\) and \\(r\\).",
        steps: [
          "\\(\\frac a{1+r}=\\frac{12}{6}=2\\) and \\(\\frac a{1-r}=6\\).",
          "\\(2+2r=6-6r\\), so \\(r=\\frac12\\).",
        ],
        answer: "\\(a=3\\), \\(r=\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(1+\\frac13+\\frac19+\\dots\\).",
        steps: [
          "\\(\\frac{1}{1-\\frac13}\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      practiceSet: [
        { prompt: "\\(8-4+2-\\dots\\)?", answer: "\\(\\frac{16}3\\)" },
        { prompt: "\\(0.222\\ldots\\) as a fraction?", answer: "\\(\\frac29\\)" },
        { prompt: "\\(S_\\infty=4\\), \\(a=3\\). \\(r\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "Even-placed terms of \\(1,\\frac12,\\frac14,\\dots\\): their sum?", answer: "\\(\\frac23\\)" },
      ],
      pyqExampleId: "d30ea289-042f-4694-9bac-732918e7a90d", // 2021 — sum 15, sum of squares 150, find the sum of ar^2, ar^4, ...
      traps: [
        {
          title: "Check |r| < 1",
          body: "A quadratic in \\(r\\) may give a root with \\(|r|\\ge1\\). The sum to infinity does not exist there, so that root is rejected.",
        },
      ],
    },

    // C2 — disguised infinite GPs
    {
      kind: "formula" as const,
      slug: "jseq-igp-disguise",
      name: "Infinite GPs inside exponents, logarithms and figures",
      intuition:
        "An exponent \\(\\cos^2x+\\cos^4x+\\dots\\) is an infinite GP with ratio \\(\\cos^2x\\), summing to \\(\\cot^2x\\). A chain \\(\\log x+\\log x^{1/3}+\\log x^{1/9}+\\dots\\) is \\(\\log x\\) times \\(1+\\frac13+\\frac19+\\dots=\\frac32\\). A bracket-by-bracket series such as \\((a+b)+(a^2+ab+b^2)+\\dots\\) often regroups into two GPs. Figures that shrink by the same factor each step, like triangles joined at midpoints, give a GP of areas or perimeters.",
      definition:
        "- \\(\\sum_{k\\ge1}\\cos^{2k}x=\\cot^2x\\); \\(\\sum_{k\\ge1}\\sin^{2k}x=\\tan^2x\\).\n" +
        "- \\(\\sum_{k\\ge0}\\log x^{c^k}=\\frac{\\log x}{1-c}\\) for \\(|c|<1\\).\n" +
        "- **Regroup:** a sum over brackets can often be written as \\(\\sum a^i\\) times \\(\\sum b^j\\), or as two separate GPs.\n" +
        "- **Midpoint triangles:** each area is \\(\\frac14\\) of the last, each perimeter \\(\\frac12\\).",
      formula: {
        label: "The geometric series",
        latex: "1+x+x^2+\\dots=\\frac{1}{1-x},\\quad |x|<1",
      },
      authoredExample: {
        prompt: "\\(3^{\\sin^2x+\\sin^4x+\\dots}=3\\) with \\(0<x<\\frac\\pi2\\). Find \\(x\\).",
        steps: [
          "The exponent is \\(\\frac{\\sin^2x}{1-\\sin^2x}=\\tan^2x\\), which must be 1.",
        ],
        answer: "\\(x=\\frac\\pi4\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\log_2x+\\log_2x^{1/2}+\\log_2x^{1/4}+\\dots=6\\). Find \\(x\\).",
        steps: [
          "\\(\\log_2x\\left(1+\\frac12+\\frac14+\\dots\\right)=2\\log_2x=6\\).",
        ],
        answer: "\\(x=8\\).",
      },
      practiceSet: [
        { prompt: "Equilateral triangle of area 16; midpoint triangles forever. Total area?", answer: "\\(\\frac{64}3\\)" },
        { prompt: "\\(\\sum_{n\\ge0}\\left(\\frac12\\right)^n\\left(\\frac13\\right)^n\\)?", answer: "\\(\\frac65\\)" },
        { prompt: "\\(\\left(\\frac12+\\frac13\\right)+\\left(\\frac14+\\frac19\\right)+\\dots\\)?", answer: "\\(\\frac32\\)" },
        { prompt: "\\(e^{1+x+x^2+\\dots}\\) at \\(x=\\frac12\\)?", answer: "\\(e^2\\)" },
      ],
      pyqExampleId: "5417f996-5caf-410b-9932-4ebd8b65460a", // 2021 — e^{(cos^2x + cos^4x + ...) ln 2} a root of t^2 - 9t + 8 = 0
      traps: [
        {
          title: "The ratio must stay below 1",
          body: "\\(\\cos^2x+\\cos^4x+\\dots\\) diverges where \\(\\cos^2x=1\\). Check the stated range keeps the ratio strictly between −1 and 1.",
        },
      ],
    },
  ],
};
