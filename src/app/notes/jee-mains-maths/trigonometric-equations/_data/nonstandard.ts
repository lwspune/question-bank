import type { SubtopicNote } from "@/app/notes/_types";

export const NONSTANDARD_TEQ_NOTE: SubtopicNote = {
  subtopicName: "Exponential, Bounded and Graphical Equations",
  title: "Exponential, Bounded and Graphical Equations",
  oneLineDefinition:
    "Equations that are not a polynomial in one ratio: powers with a trigonometric exponent, sides that meet only at their bounds, a line against the tangent graph, and moduli.",
  whyItMatters:
    "Thirteen PYQs, ten of them multiple choice. Four put sin², cos², tan² or sec² in an exponent and become an equation in one power; nine have no algebraic route, so they compare bounds on the two sides, draw a line against the tangent graph, use a function that only increases, or split a modulus by sign. Two ideas cover the page.",
  concepts: [
    // C1 — trigonometric exponents
    {
      kind: "formula" as const,
      slug: "jteq-exponential",
      name: "Powers with sin² and cos² in the exponent",
      intuition:
        "In \\(a^{\\sin^2x}+a^{\\cos^2x}\\) the exponents add to 1, so with \\(t=a^{\\sin^2x}\\) the second term is \\(\\frac at\\). The equation becomes a quadratic in \\(t\\). Each root gives a value of \\(\\sin^2x\\), which must lie in \\([0,1]\\). The same works for \\(\\tan^2x\\) and \\(\\sec^2x\\), which differ by 1.",
      definition:
        "- \\(a^{\\cos^2x}=\\frac{a}{a^{\\sin^2x}}\\) and \\(a^{\\sec^2x}=a\\cdot a^{\\tan^2x}\\).\n" +
        "- For \\(a>1\\), \\(t=a^{\\sin^2x}\\) lies in \\([1,a]\\); keep only roots in that range.\n" +
        "- Then \\(\\sin^2x=\\log_at\\); count the angles as usual.",
      formula: {
        label: "Substitution",
        latex: "t=a^{\\sin^2x}:\\qquad a^{\\sin^2x}+a^{\\cos^2x}=t+\\frac at",
      },
      authoredExample: {
        prompt: "How many solutions has \\(4^{\\sin^2x}+4^{\\cos^2x}=5\\) in \\([0,2\\pi]\\)?",
        steps: [
          "Let \\(t=4^{\\sin^2x}\\); then \\(4^{\\cos^2x}=\\frac4t\\), and \\(t+\\frac4t=5\\).",
          "\\(t^2-5t+4=0\\) gives \\(t=1\\) or \\(t=4\\), so \\(\\sin^2x=0\\) or \\(1\\).",
          "\\(\\sin x=0\\): \\(0,\\pi,2\\pi\\). \\(\\sin x=\\pm1\\): \\(\\frac{\\pi}{2},\\frac{3\\pi}{2}\\).",
        ],
        answer: "5 solutions.",
      },
      selfCheckExample: {
        prompt: "Solve \\(2^{\\tan^2x}+2^{\\sec^2x}=6\\) for \\(x\\in\\left[0,\\frac{\\pi}{2}\\right)\\).",
        steps: [
          "\\(2^{\\sec^2x}=2\\cdot2^{\\tan^2x}\\), so \\(3\\cdot2^{\\tan^2x}=6\\).",
          "\\(2^{\\tan^2x}=2\\), so \\(\\tan^2x=1\\), and in this interval \\(\\tan x=1\\).",
        ],
        answer: "One solution, \\(x=\\frac{\\pi}{4}\\).",
      },
      practiceSet: [
        { prompt: "\\(t=9^{\\sin^2x}\\): range of \\(t\\)?", answer: "\\([1,9]\\)" },
        { prompt: "\\(9^{\\cos^2x}\\) in terms of \\(t\\)?", answer: "\\(\\frac9t\\)" },
        { prompt: "\\(t+\\frac9t=6\\) gives \\(\\sin^2x=\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\sin^2x=\\frac12\\): solutions in \\([0,2\\pi]\\)?", answer: "4" },
      ],
      pyqExampleId: "5a0b5776-2439-401e-ac1a-66b9ede955b5", // 2023 — 9^(1 − tan²x) + 9^(tan²x) = 10, a quadratic in t
      traps: [
        {
          title: "A root in t may be out of range",
          body: "For \\(a>1\\), \\(t=a^{\\sin^2x}\\) lies in \\([1,a]\\). A root of the quadratic outside that range gives no angle, just as \\(\\sin x=2\\) gives none.",
        },
      ],
    },

    // C2 — bounds, graphs and moduli
    {
      kind: "formula" as const,
      slug: "jteq-compare-sides",
      name: "Bounds, graphs and moduli",
      intuition:
        "Some equations have no algebraic route. If one side is at most 2 and the other at least 2, both must equal 2 at the same point. If a line meets \\(\\tan x\\), count one crossing per full branch and check the part-branches at the ends. If a function only increases, it has at most one root. A modulus is split by sign, and each root is kept only if it has the sign its case assumed.",
      definition:
        "- Bounds: \\(2\\cos u\\le2\\) and \\(a^x+a^{-x}\\ge2\\), with equality only at \\(x=0\\).\n" +
        "- \\(\\sin^7x+\\cos^7x\\le\\sin^2x+\\cos^2x=1\\), with equality only when one of \\(\\sin x,\\cos x\\) is 1 and the other 0.\n" +
        "- A decreasing line meets each full branch of \\(\\tan x\\) exactly once.\n" +
        "- \\(f'>0\\) throughout: at most one root, and exactly one if \\(f\\) changes sign.\n" +
        "- \\(|u|=v\\): solve \\(u=v\\) where \\(u\\ge0\\) and \\(-u=v\\) where \\(u<0\\); keep roots that fit their case.",
      formula: {
        label: "Forced equality",
        latex: "f(x)\\le m\\le g(x)\\ \\text{for all}\\ x:\\quad f(x)=g(x)\\ \\text{exactly when}\\ f(x)=g(x)=m",
      },
      authoredExample: {
        prompt: "How many real \\(x\\) satisfy \\(2\\sin x=3^x+3^{-x}\\)?",
        steps: [
          "\\(3^x+3^{-x}\\ge2\\), with equality only at \\(x=0\\).",
          "\\(2\\sin x\\le2\\), so the sides can meet only where both equal 2, which means at \\(x=0\\).",
          "At \\(x=0\\) the left side is \\(0\\), not 2.",
        ],
        answer: "No real solution.",
      },
      selfCheckExample: {
        prompt: "How many \\(x\\in[0,2\\pi]\\) satisfy \\(|\\sin x|=\\sin2x\\)?",
        steps: [
          "Where \\(\\sin x\\ge0\\): \\(\\sin x=2\\sin x\\cos x\\), so \\(\\sin x=0\\) or \\(\\cos x=\\frac12\\). This gives \\(0,\\frac{\\pi}{3},\\pi,2\\pi\\); \\(\\frac{5\\pi}{3}\\) is dropped because \\(\\sin\\frac{5\\pi}{3}<0\\).",
          "Where \\(\\sin x<0\\): \\(-\\sin x=2\\sin x\\cos x\\), so \\(\\cos x=-\\frac12\\). This gives \\(\\frac{4\\pi}{3}\\); \\(\\frac{2\\pi}{3}\\) is dropped because \\(\\sin\\frac{2\\pi}{3}>0\\).",
        ],
        answer: "5 solutions: \\(0,\\frac{\\pi}{3},\\pi,\\frac{4\\pi}{3},2\\pi\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^5x+\\cos^5x=1\\) in \\([0,2\\pi]\\)?", answer: "3: \\(0,\\frac{\\pi}{2},2\\pi\\)" },
        { prompt: "\\(\\tan x+x=0\\) in \\(\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)\\)?", answer: "1, at \\(x=0\\)" },
        { prompt: "\\(x+\\sin x=5\\): how many real roots?", answer: "1, since \\(x+\\sin x\\) only increases" },
        { prompt: "\\(|\\cos x|=\\cos x\\) holds where?", answer: "Wherever \\(\\cos x\\ge0\\)" },
      ],
      pyqExampleId: "dfc77253-007d-4bfe-8632-056e5e91dec4", // 2025 — 2x + 3tan x = π, a line against five tangent branches
      traps: [
        {
          title: "Check the part-branches at the ends",
          body: "A full branch of \\(\\tan x\\) always meets a decreasing line once. A part-branch at the edge of the interval may or may not: compare the line's values there with the range that \\(\\tan x\\) covers on that piece.",
        },
      ],
    },
  ],
};
