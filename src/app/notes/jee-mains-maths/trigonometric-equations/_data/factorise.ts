import type { SubtopicNote } from "@/app/notes/_types";

export const FACTORISE_TEQ_NOTE: SubtopicNote = {
  subtopicName: "Product-to-Sum and Multiple Angles",
  title: "Product-to-Sum and Multiple Angles",
  oneLineDefinition:
    "Equations with several angles: turn products into sums to reach cos A = cos B or a product equal to zero, or collapse everything into one ratio of a multiple angle such as 3x or 4x.",
  whyItMatters:
    "Twelve PYQs, half of them multiple choice, and two from 2026. Four turn products or sums of sines and cosines into cos A = cos B, or into factors equal to zero, and merge the families of roots; eight collapse to one ratio of a multiple angle through the triple-angle, double-angle or tangent-addition formulas. Two ideas cover the page.",
  concepts: [
    // C1 — cos A = cos B
    {
      kind: "formula" as const,
      slug: "jteq-cos-equals-cos",
      name: "Reduce to cos A = cos B",
      intuition:
        "A product of two cosines becomes a sum by \\(2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)\\). When both sides produce the same term, it cancels and \\(\\cos A=\\cos B\\) is left. That gives two families of roots, \\(A=2n\\pi+B\\) and \\(A=2n\\pi-B\\). Count each family in the interval, then subtract the angles they share. A sum of sines works the same way: pair the terms into products and set each factor to 0.",
      definition:
        "- \\(2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)\\).\n" +
        "- \\(\\cos A=\\cos B\\) exactly when \\(A=2n\\pi\\pm B\\).\n" +
        "- \\(\\sin C+\\sin D=2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}\\).\n" +
        "- Total = first family + second family − common values.",
      formula: {
        label: "Two families",
        latex: "\\cos A=\\cos B\\Rightarrow A=2n\\pi+B\\ \\text{or}\\ A=2n\\pi-B",
      },
      authoredExample: {
        prompt: "How many \\(\\theta\\in[0,\\pi]\\) satisfy \\(\\cos6\\theta\\cos\\theta=\\cos4\\theta\\cos3\\theta\\)?",
        steps: [
          "\\(\\cos6\\theta\\cos\\theta=\\frac12(\\cos7\\theta+\\cos5\\theta)\\) and \\(\\cos4\\theta\\cos3\\theta=\\frac12(\\cos7\\theta+\\cos\\theta)\\).",
          "\\(\\cos7\\theta\\) cancels, leaving \\(\\cos5\\theta=\\cos\\theta\\).",
          "\\(5\\theta=2n\\pi+\\theta\\) gives \\(\\theta=\\frac{n\\pi}{2}\\): \\(0,\\frac{\\pi}{2},\\pi\\).",
          "\\(5\\theta=2n\\pi-\\theta\\) gives \\(\\theta=\\frac{n\\pi}{3}\\): \\(0,\\frac{\\pi}{3},\\frac{2\\pi}{3},\\pi\\).",
          "\\(0\\) and \\(\\pi\\) are in both, so the count is \\(3+4-2\\).",
        ],
        answer: "5 solutions: \\(0,\\frac{\\pi}{3},\\frac{\\pi}{2},\\frac{2\\pi}{3},\\pi\\).",
      },
      selfCheckExample: {
        prompt: "How many \\(x\\in[0,\\pi]\\) satisfy \\(\\sin x+\\sin2x+\\sin3x=0\\)?",
        steps: [
          "\\(\\sin x+\\sin3x=2\\sin2x\\cos x\\), so the equation is \\(\\sin2x(2\\cos x+1)=0\\).",
          "\\(\\sin2x=0\\): \\(0,\\frac{\\pi}{2},\\pi\\). \\(\\cos x=-\\frac12\\): \\(\\frac{2\\pi}{3}\\).",
        ],
        answer: "4 solutions.",
      },
      practiceSet: [
        { prompt: "\\(\\cos3\\theta=\\cos\\theta\\): the two families?", answer: "\\(\\theta=n\\pi\\) or \\(\\theta=\\frac{n\\pi}{2}\\)" },
        { prompt: "\\(2\\cos3x\\cos x\\) as a sum?", answer: "\\(\\cos4x+\\cos2x\\)" },
        { prompt: "\\(\\theta=\\frac{n\\pi}{3}\\) in \\([-\\pi,\\pi]\\): how many values?", answer: "7" },
        { prompt: "\\(\\sin x+\\sin5x\\) as a product?", answer: "\\(2\\sin3x\\cos2x\\)" },
      ],
      pyqExampleId: "81233dc4-7b5c-4e71-a871-6141597579a2", // 2026 — cos(3θ/2) = cos(21θ/2), two families minus the common values
      traps: [
        {
          title: "Subtract the common angles",
          body: "The two families overlap wherever both formulas give the same angle, and \\(0\\) is always one of them. Adding the two counts without removing the overlap overcounts.",
        },
      ],
    },

    // C2 — one multiple angle
    {
      kind: "formula" as const,
      slug: "jteq-multiple-angle",
      name: "Collapse to one multiple angle",
      intuition:
        "Many equations are one identity away from a single ratio of \\(2x\\), \\(3x\\) or \\(4x\\). \\(\\sin^4x+\\cos^4x\\) is \\(1-\\frac12\\sin^22x\\); \\(4\\cos^3x-3\\cos x\\) is \\(\\cos3x\\); and \\(\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\) is \\(\\tan(A+B)\\). Once one ratio of \\(kx\\) is left, solve for \\(kx\\) over \\(k\\) times the interval, then divide by \\(k\\).",
      definition:
        "- \\(\\cos3x=4\\cos^3x-3\\cos x\\), \\(\\sin3x=3\\sin x-4\\sin^3x\\).\n" +
        "- \\(\\cos x\\cos(60^\\circ-x)\\cos(60^\\circ+x)=\\frac14\\cos3x\\).\n" +
        "- \\(\\sin^4x+\\cos^4x=1-\\frac12\\sin^22x\\).\n" +
        "- \\(\\tan(A+B)=\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\); \\(\\tan A=\\tan B\\) exactly when \\(A=B+n\\pi\\).\n" +
        "- If \\(x\\in[a,b]\\), then \\(kx\\in[ka,kb]\\).",
      formula: {
        label: "Triple angle",
        latex: "\\cos3x=4\\cos^3x-3\\cos x,\\qquad \\tan3x=\\frac{3\\tan x-\\tan^3x}{1-3\\tan^2x}",
      },
      authoredExample: {
        prompt: "Find the number and the sum of the solutions of \\(3\\sin x-4\\sin^3x=\\frac{1}{\\sqrt2}\\) in \\([0,\\pi]\\).",
        steps: [
          "\\(3\\sin x-4\\sin^3x=\\sin3x\\), so \\(\\sin3x=\\frac{1}{\\sqrt2}\\).",
          "\\(x\\in[0,\\pi]\\) means \\(3x\\in[0,3\\pi]\\): \\(3x=\\frac{\\pi}{4},\\frac{3\\pi}{4},\\frac{9\\pi}{4},\\frac{11\\pi}{4}\\).",
          "Divide by 3: \\(x=\\frac{\\pi}{12},\\frac{\\pi}{4},\\frac{3\\pi}{4},\\frac{11\\pi}{12}\\). At both endpoints \\(\\sin3x=0\\).",
        ],
        answer: "4 solutions, with sum \\(2\\pi\\).",
      },
      selfCheckExample: {
        prompt: "How many \\(x\\in[0,\\pi)\\) satisfy \\(\\tan x+\\tan2x=1-\\tan x\\tan2x\\)?",
        steps: [
          "If \\(\\tan x\\tan2x=1\\), the equation forces \\(\\tan x=-\\tan2x\\), so \\(\\tan^2x=-1\\): impossible. So divide: \\(\\tan3x=1\\).",
          "\\(3x\\in[0,3\\pi)\\): \\(3x=\\frac{\\pi}{4},\\frac{5\\pi}{4},\\frac{9\\pi}{4}\\), so \\(x=\\frac{\\pi}{12},\\frac{5\\pi}{12},\\frac{3\\pi}{4}\\).",
          "At \\(x=\\frac{3\\pi}{4}\\), \\(\\tan2x=\\tan\\frac{3\\pi}{2}\\) is undefined, so it is dropped.",
        ],
        answer: "2 solutions: \\(\\frac{\\pi}{12}\\) and \\(\\frac{5\\pi}{12}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^4x+\\cos^4x\\) in terms of \\(\\sin2x\\)?", answer: "\\(1-\\frac12\\sin^22x\\)" },
        { prompt: "\\(\\cos x\\cos(60^\\circ-x)\\cos(60^\\circ+x)\\)?", answer: "\\(\\frac14\\cos3x\\)" },
        { prompt: "\\(x\\in[0,\\pi]\\): range of \\(4x\\)?", answer: "\\([0,4\\pi]\\)" },
        { prompt: "\\(\\tan A+\\tan B=0\\), both defined, gives?", answer: "\\(A+B=n\\pi\\)" },
      ],
      pyqExampleId: "31abe586-1aea-477d-b898-4de49a6310b2", // 2026 — a tangent product collapses to sin(4x + 100°)
      traps: [
        {
          title: "Check the original tangents",
          body: "Collapsing to \\(\\tan3x\\) or \\(\\sin4x\\) widens the domain. A root of the new equation can make an original \\(\\tan\\) or \\(\\sec\\) undefined; substitute each root back and drop those.",
        },
      ],
    },
  ],
};
