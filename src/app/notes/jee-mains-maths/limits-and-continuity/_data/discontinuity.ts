import type { SubtopicNote } from "@/app/notes/_types";

export const DISCONTINUITY_LIM_NOTE: SubtopicNote = {
  subtopicName: "Counting Discontinuities and Non-Differentiability",
  title: "Counting Discontinuities and Non-Differentiability",
  oneLineDefinition:
    "Counting the points where a function breaks or has a corner: jumps of the greatest integer function, compositions, and functions defined as a limit.",
  whyItMatters:
    "Eighteen PYQs, half of them numerical answers, and four from 2026. Nine count where a greatest-integer expression jumps or where a modulus makes a corner; four compose two functions; five define f as a limit in n and ask where the result breaks. Three ideas cover the page.",
  concepts: [
    // C1 — greatest integer jumps and corners
    {
      kind: "formula" as const,
      slug: "jlim-gif-jumps",
      name: "Jumps and corners",
      intuition:
        "\\([g(x)]\\) jumps wherever \\(g(x)\\) crosses an integer, so list those crossings in the interval — unless a factor multiplying it is zero there, which can cancel the jump. A modulus \\(|g(x)|\\) has a corner where \\(g\\) changes sign with non-zero slope; a function is not differentiable at a jump or a corner.",
      definition:
        "- \\([g(x)]\\): possible breaks where \\(g(x)\\) is an integer.\n" +
        "- Check each: a factor that vanishes there can make the product continuous.\n" +
        "- \\(|g(x)|\\): corner at a simple zero of \\(g\\); smooth at a double zero.\n" +
        "- Not continuous means not differentiable.",
      formula: {
        label: "Where the greatest integer jumps",
        latex: "[g(x)]\\ \\text{can break only where}\\ g(x)\\in\\mathbb Z",
      },
      authoredExample: {
        prompt: "Where is \\([x^2]\\) discontinuous on \\((0,2)\\)?",
        steps: [
          "\\(x^2\\) crosses 1, 2, 3 at \\(x=1,\\sqrt2,\\sqrt3\\).",
        ],
        answer: "At 3 points: \\(1,\\sqrt2,\\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "How many points of discontinuity has \\([2x]\\) on \\((0,2)\\)?",
        steps: [
          "\\(2x\\) crosses 1, 2, 3 at \\(x=\\frac12,1,\\frac32\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "Corners of \\(|x-1|+|x-3|\\)?", answer: "\\(2\\)" },
        { prompt: "Is \\(|x^2|\\) differentiable at 0?", answer: "Yes" },
        { prompt: "Is \\(x[x]\\) continuous at 0?", answer: "Yes" },
        { prompt: "Breaks of \\([\\sin x]\\) in \\((0,\\pi)\\)?", answer: "\\(1\\) (at \\(\\frac\\pi2\\))" },
      ],
      pyqExampleId: "e6503a63-58bf-4874-a410-61d30493f404", // 2026 — counting discontinuities of a greatest-integer expression
      traps: [
        {
          title: "A zero factor can hide a jump",
          body: "In \\(x[x]\\) at 0 the jump of \\([x]\\) is multiplied by 0, so the product is continuous. Test each candidate point; do not just count the integer crossings.",
        },
      ],
    },

    // C2 — compositions
    {
      kind: "formula" as const,
      slug: "jlim-composite",
      name: "Compositions",
      intuition:
        "\\(f(g(x))\\) can break where \\(g\\) breaks, or where \\(g(x)\\) lands on a point where \\(f\\) breaks. So find the bad points of \\(f\\), solve \\(g(x)=\\) each of them, and add the bad points of \\(g\\). Then check each candidate.",
      definition:
        "- Candidates: breaks of \\(g\\), and \\(x\\) with \\(g(x)\\) at a break of \\(f\\).\n" +
        "- Continuous inside and outside gives a continuous composition.\n" +
        "- Check each candidate by the left and right limits.",
      formula: {
        label: "Candidate points",
        latex: "\\{x:g\\ \\text{breaks}\\}\\cup\\{x:g(x)\\ \\text{is a break of}\\ f\\}",
      },
      authoredExample: {
        prompt: "Where is \\([\\sin x]\\) discontinuous in \\((0,2\\pi)\\)?",
        steps: [
          "\\(\\sin x\\) reaches the integer 1 at \\(\\frac\\pi2\\) (value jumps from 0 to 1 and back) and crosses 0 at \\(\\pi\\) (0 to \\(-1\\)).",
        ],
        answer: "At \\(\\frac\\pi2\\) and \\(\\pi\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(t)=\\frac1{t-2}\\) and \\(g(x)=\\frac1{x-1}\\). Where is \\(f(g(x))\\) undefined?",
        steps: [
          "\\(g\\) breaks at 1; \\(g(x)=2\\) at \\(x=\\frac32\\).",
        ],
        answer: "At \\(x=1\\) and \\(x=\\frac32\\).",
      },
      practiceSet: [
        { prompt: "Is \\(|\\sin x|\\) continuous everywhere?", answer: "Yes" },
        { prompt: "\\(\\frac1{1+[x]}\\) undefined on?", answer: "\\([-1,0)\\)" },
        { prompt: "\\(f\\) breaks only at 0, \\(g(x)=x^2-1\\): candidates of \\(f(g(x))\\)?", answer: "\\(x=\\pm1\\)" },
        { prompt: "Is \\(e^{[x]}\\) continuous at 1?", answer: "No" },
      ],
      pyqExampleId: "0817b19f-cd91-4c70-bc7c-e4eebd1fb99e", // 2026 — discontinuities of a composition
      traps: [
        {
          title: "Also where the inside lands on a bad point",
          body: "Checking only where \\(g\\) breaks misses the points where \\(g(x)\\) equals a break of \\(f\\). Solve \\(g(x)=\\) each bad point of \\(f\\).",
        },
      ],
    },

    // C3 — functions defined by a limit
    {
      kind: "formula" as const,
      slug: "jlim-limit-defined",
      name: "Functions defined as a limit",
      intuition:
        "When \\(f(x)=\\lim_{n\\to\\infty}\\) of an expression with \\(x^n\\), split by \\(|x|\\): for \\(|x|<1\\), \\(x^n\\to0\\); for \\(|x|>1\\) it dominates; at \\(x=\\pm1\\) compute directly. The result is a piecewise function, and its breaks are usually at \\(x=\\pm1\\).",
      definition:
        "- \\(|x|<1\\): \\(x^{n}\\to0\\).\n" +
        "- \\(|x|>1\\): divide by the dominant power.\n" +
        "- \\(x=1\\) and \\(x=-1\\): substitute.\n" +
        "- Then check continuity at the boundaries.",
      formula: {
        label: "Powers in the limit",
        latex: "\\lim_{n\\to\\infty}x^{2n}=\\begin{cases}0,&|x|<1\\\\1,&|x|=1\\\\\\infty,&|x|>1\\end{cases}",
      },
      authoredExample: {
        prompt: "\\(f(x)=\\lim_{n\\to\\infty}\\frac{x^{2n}}{1+x^{2n}}\\). Where is \\(f\\) discontinuous?",
        steps: [
          "\\(f=0\\) for \\(|x|<1\\), \\(\\frac12\\) at \\(x=\\pm1\\), \\(1\\) for \\(|x|>1\\).",
        ],
        answer: "At \\(x=\\pm1\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\lim_{n\\to\\infty}x^n\\) on \\([0,1]\\). Where is \\(f\\) discontinuous?",
        steps: [
          "\\(f=0\\) for \\(0\\le x<1\\) and \\(f(1)=1\\).",
        ],
        answer: "At \\(x=1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim x^{2n}\\) at \\(x=0.5\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim\\frac{1}{1+x^{2n}}\\) for \\(|x|>1\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim\\frac{x^{2n}-1}{x^{2n}+1}\\) at \\(x=1\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim\\frac{x^{2n}-1}{x^{2n}+1}\\) for \\(|x|<1\\)?", answer: "\\(-1\\)" },
      ],
      pyqExampleId: "3fa2f71d-4cc0-4bb9-9166-74687c363aa7", // 2026 — a function defined as a limit
      traps: [
        {
          title: "Compute the boundary separately",
          body: "At \\(x=\\pm1\\) the power \\(x^{2n}\\) is exactly 1, giving a third value. Leaving the boundary out misses the break.",
        },
      ],
    },
  ],
};
