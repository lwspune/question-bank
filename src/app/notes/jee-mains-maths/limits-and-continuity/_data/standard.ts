import type { SubtopicNote } from "@/app/notes/_types";

export const STANDARD_LIM_NOTE: SubtopicNote = {
  subtopicName: "Standard Limits and Algebraic Forms",
  title: "Standard Limits and Algebraic Forms",
  oneLineDefinition:
    "Limits of the form 0/0 settled by the standard trigonometric, exponential and logarithmic limits, or by factorising and rationalising.",
  whyItMatters:
    "Twenty-four PYQs, twenty-one of them multiple choice. Thirteen reduce to the standard limits such as sin x / x and (eˣ − 1)/x; eleven cancel a common factor or rationalise a surd first. Two ideas cover the page.",
  concepts: [
    // C1 — standard limits
    {
      kind: "formula" as const,
      slug: "jlim-standard",
      name: "The standard limits",
      intuition:
        "Most 0/0 limits near 0 are built from a few standard ones. Rewrite the expression so each small quantity appears in its standard shape — \\(\\frac{\\sin(3x)}{3x}\\), \\(\\frac{e^{2x}-1}{2x}\\) — and each shape tends to 1. What is left is a plain ratio of constants.",
      definition:
        "- \\(\\lim_{x\\to0}\\frac{\\sin x}x=\\lim_{x\\to0}\\frac{\\tan x}x=1\\).\n" +
        "- \\(\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12\\).\n" +
        "- \\(\\lim_{x\\to0}\\frac{e^x-1}x=1\\), \\(\\lim_{x\\to0}\\frac{a^x-1}x=\\ln a\\), \\(\\lim_{x\\to0}\\frac{\\ln(1+x)}x=1\\).\n" +
        "- \\(\\lim_{x\\to a}\\frac{x^n-a^n}{x-a}=na^{n-1}\\).",
      formula: {
        label: "Standard limits",
        latex: "\\lim_{x\\to0}\\frac{\\sin x}x=1,\\quad\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12,\\quad\\lim_{x\\to0}\\frac{e^x-1}x=1",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac{\\sin3x}{\\tan5x}\\).",
        steps: [
          "\\(\\frac{\\sin3x}{3x}\\cdot\\frac{5x}{\\tan5x}\\cdot\\frac{3x}{5x}\\to1\\cdot1\\cdot\\frac35\\).",
        ],
        answer: "\\(\\frac35\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac{1-\\cos4x}{x^2}\\).",
        steps: [
          "\\(\\frac{1-\\cos4x}{(4x)^2}\\cdot16\\to\\frac12\\cdot16\\).",
        ],
        answer: "\\(8\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to0}\\frac{e^{3x}-1}x\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{2^x-1}x\\)?", answer: "\\(\\ln2\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{\\ln(1+2x)}{\\sin x}\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\lim_{x\\to1}\\frac{x^5-1}{x-1}\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "3aee39a3-616c-4a67-842a-e0f631a3459c", // 2026 — a 0/0 limit built from standard forms
      traps: [
        {
          title: "Match the argument exactly",
          body: "\\(\\frac{\\sin3x}x\\) tends to 3, not 1: the angle and the denominator must be the same before the standard limit applies. Multiply and divide to make them match.",
        },
      ],
    },

    // C2 — factorise and rationalise
    {
      kind: "formula" as const,
      slug: "jlim-factorise",
      name: "Factorise or rationalise",
      intuition:
        "A 0/0 form at \\(x=a\\) means \\(x-a\\) is hiding in both numerator and denominator. Factorise polynomials to cancel it; for a surd, multiply by the conjugate so the difference of squares brings the factor out. After cancelling, substitute.",
      definition:
        "- Polynomial 0/0 at \\(a\\): both have the factor \\(x-a\\); cancel it.\n" +
        "- Surd: multiply by the conjugate, \\((\\sqrt p-\\sqrt q)(\\sqrt p+\\sqrt q)=p-q\\).\n" +
        "- After cancelling, substitute directly.",
      formula: {
        label: "Conjugate",
        latex: "\\sqrt p-\\sqrt q=\\frac{p-q}{\\sqrt p+\\sqrt q}",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to2}\\frac{x^3-8}{x^2-4}\\).",
        steps: [
          "\\(\\frac{(x-2)(x^2+2x+4)}{(x-2)(x+2)}=\\frac{x^2+2x+4}{x+2}\\to\\frac{12}4\\).",
        ],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to0}\\frac{\\sqrt{1+x}-1}x\\).",
        steps: [
          "\\(\\frac{(1+x)-1}{x(\\sqrt{1+x}+1)}=\\frac1{\\sqrt{1+x}+1}\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to3}\\frac{x^2-9}{x-3}\\)?", answer: "\\(6\\)" },
        { prompt: "\\(\\lim_{x\\to4}\\frac{\\sqrt x-2}{x-4}\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\lim_{x\\to1}\\frac{x^2-1}{x^3-1}\\)?", answer: "\\(\\frac23\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{\\sqrt{4+x}-2}x\\)?", answer: "\\(\\frac14\\)" },
      ],
      pyqExampleId: "ea62582c-2ba2-4847-bb49-dd825998e100", // 2022 — an algebraic 0/0 limit
      traps: [
        {
          title: "Rationalise the right part",
          body: "Multiply by the conjugate of the surd that causes the 0, and keep the other factor. Rationalising a denominator that is not zero only adds work.",
        },
      ],
    },
  ],
};
