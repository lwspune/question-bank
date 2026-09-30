import type { SubtopicNote } from "@/app/notes/_types";

export const QUADRATIC_TEQ_NOTE: SubtopicNote = {
  subtopicName: "Quadratic in One Ratio",
  title: "Quadratic in One Ratio",
  oneLineDefinition:
    "Equations that become a quadratic in sin θ, cos θ, sec θ or csc θ: solve it, discard the root outside the range, then count the angles in the interval.",
  whyItMatters:
    "Sixteen PYQs, ten of them multiple choice, and one from 2026. Ten reduce to a quadratic in one ratio and count or add its roots in an interval; six add a condition — two equations at once, a domain limit, or an interval sized to hold an exact number of roots. Two ideas cover the page.",
  concepts: [
    // C1 — solve for the ratio, count per period
    {
      kind: "formula" as const,
      slug: "jteq-quad-count",
      name: "Solve for the ratio, then count per period",
      intuition:
        "Replace \\(\\cos2\\theta\\), \\(\\sin^2\\theta\\) or \\(\\tan^2\\theta\\) so that only one ratio is left. The equation becomes a quadratic in that ratio. A root outside \\([-1,1]\\) for \\(\\sin\\) or \\(\\cos\\), or inside \\((-1,1)\\) for \\(\\sec\\) or \\(\\csc\\), gives no angle. Each value that survives is taken twice in every period of \\(2\\pi\\), so count by periods and test the endpoints separately.",
      definition:
        "- \\(\\cos2\\theta=2\\cos^2\\theta-1=1-2\\sin^2\\theta\\); \\(\\tan^2\\theta=\\sec^2\\theta-1\\).\n" +
        "- Reject \\(|\\sin\\theta|>1\\), \\(|\\cos\\theta|>1\\), \\(|\\sec\\theta|<1\\), \\(|\\csc\\theta|<1\\).\n" +
        "- \\(\\cos\\theta=c\\) with \\(|c|<1\\): two solutions in each full period of length \\(2\\pi\\).\n" +
        "- Substitute each endpoint of the interval to see if it is a solution.",
      formula: {
        label: "General solutions",
        latex: "\\sin\\theta=\\sin\\alpha\\Rightarrow\\theta=n\\pi+(-1)^n\\alpha;\\qquad \\cos\\theta=\\cos\\alpha\\Rightarrow\\theta=2n\\pi\\pm\\alpha",
      },
      authoredExample: {
        prompt: "How many solutions has \\(2\\sin^2\\theta+3\\cos\\theta=0\\) in \\([0,4\\pi]\\)?",
        steps: [
          "\\(2(1-\\cos^2\\theta)+3\\cos\\theta=0\\Rightarrow2\\cos^2\\theta-3\\cos\\theta-2=0\\Rightarrow(2\\cos\\theta+1)(\\cos\\theta-2)=0\\).",
          "\\(\\cos\\theta=2\\) is impossible, so \\(\\cos\\theta=-\\frac12\\).",
          "In \\([0,4\\pi]\\): \\(\\frac{2\\pi}{3},\\frac{4\\pi}{3},\\frac{8\\pi}{3},\\frac{10\\pi}{3}\\). Both endpoints give \\(\\cos\\theta=1\\), so neither is a solution.",
        ],
        answer: "4 solutions.",
      },
      selfCheckExample: {
        prompt: "How many solutions has \\(2\\csc^2\\theta-5\\csc\\theta+2=0\\) in \\([0,3\\pi]\\)?",
        steps: [
          "\\((2\\csc\\theta-1)(\\csc\\theta-2)=0\\). \\(\\csc\\theta=\\frac12\\) is impossible, so \\(\\csc\\theta=2\\) and \\(\\sin\\theta=\\frac12\\).",
          "In \\([0,3\\pi]\\): \\(\\frac{\\pi}{6},\\frac{5\\pi}{6},\\frac{13\\pi}{6},\\frac{17\\pi}{6}\\). At \\(0\\) and \\(3\\pi\\), \\(\\csc\\theta\\) is undefined.",
        ],
        answer: "4 solutions.",
      },
      practiceSet: [
        { prompt: "\\(\\cos\\theta=\\frac13\\): solutions in \\([0,2\\pi]\\)?", answer: "2" },
        { prompt: "\\(\\sin\\theta=1\\): solutions in \\([0,4\\pi]\\)?", answer: "2: \\(\\frac{\\pi}{2}\\) and \\(\\frac{5\\pi}{2}\\)" },
        { prompt: "\\(\\sec\\theta=\\frac12\\)?", answer: "No solution" },
        { prompt: "\\(\\cos\\theta=-1\\) in \\([-\\pi,\\pi]\\)?", answer: "2: both endpoints" },
      ],
      pyqExampleId: "e2bfcd12-23c0-45f9-9523-291d34c5355e", // 2026 — a quadratic in cos θ counted over [−3π, 2π]
      traps: [
        {
          title: "Values ±1 and the endpoints",
          body: "\\(\\cos\\theta=\\pm1\\) or \\(\\sin\\theta=\\pm1\\) is reached once per period, not twice. And a closed interval can hold a solution at each end: \\(\\cos\\theta=-1\\) on \\([-\\pi,\\pi]\\) holds at both \\(-\\pi\\) and \\(\\pi\\).",
        },
      ],
    },

    // C2 — conditions on top of the quadratic
    {
      kind: "formula" as const,
      slug: "jteq-quad-conditions",
      name: "Two equations, domain limits and a sized interval",
      intuition:
        "Some questions add a condition to the quadratic. When two equations must both hold, solve each for the ratio and keep the common value. When \\(\\tan\\), \\(\\sec\\) or a logarithm appears, drop any root where it is undefined. When the interval is unknown and must hold exactly \\(k\\) roots, list the roots in order from the left end and stop at the \\(k\\)-th.",
      definition:
        "- Two equations: find the ratio values of each, and keep those in both.\n" +
        "- Remove roots with \\(\\cos\\theta=0\\) if \\(\\tan\\theta\\) or \\(\\sec\\theta\\) appears. A log base must be positive and not 1.\n" +
        "- Exactly \\(k\\) roots in \\([0,L]\\): \\(L\\) is at least the \\(k\\)-th root and less than the \\((k+1)\\)-th.\n" +
        "- Do not cancel a ratio; take it out as a factor.",
      formula: {
        label: "Roots of cos θ = c in order from 0",
        latex: "\\alpha,\\ 2\\pi-\\alpha,\\ 2\\pi+\\alpha,\\ 4\\pi-\\alpha,\\ \\dots\\qquad(\\alpha=\\cos^{-1}c\\in(0,\\pi))",
      },
      authoredExample: {
        prompt: "Find the sum of all \\(\\theta\\in[0,2\\pi]\\) satisfying both \\(2\\cos^2\\theta-\\cos\\theta-1=0\\) and \\(\\cos2\\theta=-\\frac12\\).",
        steps: [
          "First: \\((2\\cos\\theta+1)(\\cos\\theta-1)=0\\), so \\(\\cos\\theta=1\\) or \\(-\\frac12\\).",
          "Second: \\(2\\cos^2\\theta-1=-\\frac12\\), so \\(\\cos\\theta=\\pm\\frac12\\).",
          "Common value: \\(\\cos\\theta=-\\frac12\\), at \\(\\frac{2\\pi}{3}\\) and \\(\\frac{4\\pi}{3}\\).",
        ],
        answer: "The sum is \\(2\\pi\\).",
      },
      selfCheckExample: {
        prompt: "Find the least \\(n\\in\\mathbb{N}\\) for which \\(\\tan^2\\theta+\\sec\\theta=1\\) has exactly 3 solutions in \\(\\left[0,\\frac{n\\pi}{2}\\right]\\).",
        steps: [
          "\\(\\sec^2\\theta+\\sec\\theta-2=0\\Rightarrow(\\sec\\theta+2)(\\sec\\theta-1)=0\\), so \\(\\cos\\theta=1\\) or \\(-\\frac12\\).",
          "Roots from 0 in order: \\(0,\\frac{2\\pi}{3},\\frac{4\\pi}{3},2\\pi,\\dots\\); \\(\\tan\\theta\\) is defined at each.",
          "Need \\(\\frac{4\\pi}{3}\\le\\frac{n\\pi}{2}<2\\pi\\), so \\(\\frac83\\le n<4\\).",
        ],
        answer: "\\(n=3\\); the roots are \\(0,\\frac{2\\pi}{3},\\frac{4\\pi}{3}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin\\theta=\\frac12\\) and \\(\\cos\\theta=\\frac{\\sqrt3}{2}\\) together, in \\([0,2\\pi]\\)?", answer: "\\(\\frac{\\pi}{6}\\) only" },
        { prompt: "\\(\\sin\\theta\\tan\\theta=0\\) in \\(\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)\\)?", answer: "\\(\\theta=0\\) only" },
        { prompt: "The base of \\(\\log_{\\cos x}\\) needs?", answer: "\\(\\cos x>0\\) and \\(\\cos x\\neq1\\)" },
        { prompt: "\\(\\cos\\theta=\\frac13\\): the 3rd root after 0?", answer: "\\(2\\pi+\\cos^{-1}\\frac13\\)" },
      ],
      pyqExampleId: "65404b0d-66f4-4afa-a3dc-092edffe6f2a", // 2025 — two equations, keep the common value of sin θ
      traps: [
        {
          title: "Do not cancel a ratio",
          body: "In \\(\\sin\\theta\\cos\\theta=\\sin\\theta\\), cancelling \\(\\sin\\theta\\) leaves \\(\\cos\\theta=1\\) and loses \\(\\theta=\\pi\\). Write \\(\\sin\\theta(\\cos\\theta-1)=0\\) and keep both factors.",
        },
      ],
    },
  ],
};
