import type { SubtopicNote } from "@/app/notes/_types";

export const CONTINUITY_LIM_NOTE: SubtopicNote = {
  subtopicName: "Continuity at a Point",
  title: "Continuity at a Point",
  oneLineDefinition:
    "A function is continuous at a point when its left limit, right limit and value there all agree; most questions find the constants that make that happen.",
  whyItMatters:
    "Twenty PYQs, sixteen of them multiple choice, and four from 2026. Sixteen give a piecewise function with unknown constants and ask for them from continuity at one point; four use continuity to find a value or to show that an equation has a root. Two ideas cover the page.",
  concepts: [
    // C1 — match the sides
    {
      kind: "formula" as const,
      slug: "jlim-match-sides",
      name: "Matching the two sides",
      intuition:
        "At the join of a piecewise rule, compute the limit from each side using that side's formula, and set both equal to the value at the point. Each side often needs a standard limit or a \\(1^\\infty\\) formula; the equations that result give the constants.",
      definition:
        "- Continuous at \\(a\\): \\(\\lim_{x\\to a^-}f=\\lim_{x\\to a^+}f=f(a)\\).\n" +
        "- Use each piece's own formula on its own side.\n" +
        "- Two constants usually need two equations: left = value and right = value.",
      formula: {
        label: "Continuity",
        latex: "\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=f(a)",
      },
      authoredExample: {
        prompt: "\\(f(x)=ax+1\\) for \\(x\\le1\\) and \\(x^2+2\\) for \\(x>1\\). Find \\(a\\) for continuity.",
        steps: [
          "Left value \\(a+1\\), right limit 3.",
        ],
        answer: "\\(a=2\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\frac{\\sin3x}x\\) for \\(x\\neq0\\) and \\(f(0)=k\\). Find \\(k\\) for continuity at 0.",
        steps: [
          "\\(\\frac{\\sin3x}x\\to3\\).",
        ],
        answer: "\\(k=3\\).",
      },
      practiceSet: [
        { prompt: "\\(f=\\frac{e^{2x}-1}x\\), \\(f(0)=k\\): \\(k\\)?", answer: "\\(2\\)" },
        { prompt: "\\(f=\\frac{1-\\cos x}{x^2}\\), \\(f(0)=k\\): \\(k\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(f=(1+x)^{1/x}\\), \\(f(0)=k\\): \\(k\\)?", answer: "\\(e\\)" },
        { prompt: "\\(f=kx^2\\) for \\(x\\le2\\), \\(3\\) for \\(x>2\\): \\(k\\)?", answer: "\\(\\frac34\\)" },
      ],
      pyqExampleId: "2b0997bf-fe41-4275-9bb0-f635670f0922", // 2026 — constants from continuity at a point
      traps: [
        {
          title: "Use the right formula on each side",
          body: "The left limit uses the piece defined for \\(x<a\\), and the value \\(f(a)\\) uses whichever piece includes \\(a\\). Mixing them gives a wrong equation.",
        },
      ],
    },

    // C2 — using continuity
    {
      kind: "formula" as const,
      slug: "jlim-continuity-apply",
      name: "Using continuity",
      intuition:
        "Continuity fills in a value a formula leaves undefined: the value must be the limit. It also guarantees roots: a continuous function that changes sign on an interval is zero somewhere inside (the intermediate value theorem).",
      definition:
        "- Removable gap: define \\(f(a)=\\lim_{x\\to a}f(x)\\).\n" +
        "- Intermediate value theorem: \\(f\\) continuous on \\([a,b]\\), \\(f(a)f(b)<0\\) gives a root in \\((a,b)\\).\n" +
        "- Sums, products and compositions of continuous functions are continuous.",
      formula: {
        label: "Intermediate value theorem",
        latex: "f(a)\\,f(b)<0\\ \\Rightarrow\\ f(c)=0\\ \\text{for some}\\ c\\in(a,b)",
      },
      authoredExample: {
        prompt: "Show that \\(x^3+x-1=0\\) has a root in \\((0,1)\\).",
        steps: [
          "\\(f(0)=-1<0<1=f(1)\\) and \\(f\\) is continuous.",
        ],
        answer: "A root lies in \\((0,1)\\).",
      },
      selfCheckExample: {
        prompt: "\\(f\\) is continuous and \\(f(x)=\\frac{x^2-4}{x-2}\\) for \\(x\\neq2\\). Find \\(f(2)\\).",
        steps: [
          "\\(\\frac{x^2-4}{x-2}=x+2\\to4\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "Is \\(|x|\\) continuous at 0?", answer: "Yes" },
        { prompt: "Is \\([x]\\) continuous at 1?", answer: "No" },
        { prompt: "\\(f(1)=-2\\), \\(f(3)=5\\), \\(f\\) continuous: a root in \\((1,3)\\)?", answer: "Yes" },
        { prompt: "Value making \\(\\frac{\\tan x}x\\) continuous at 0?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "304ca39d-5bee-4256-b046-151e6f1befbf", // 2026 — using continuity to find a value
      traps: [
        {
          title: "No sign change, no guarantee",
          body: "If \\(f(a)\\) and \\(f(b)\\) have the same sign, the theorem says nothing: there may be two roots or none.",
        },
      ],
    },
  ],
};
