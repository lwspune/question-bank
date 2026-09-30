import type { SubtopicNote } from "@/app/notes/_types";

export const SERIES_ITF_NOTE: SubtopicNote = {
  subtopicName: "Sums of Inverse Tangents and Telescoping Series",
  title: "Sums of Inverse Tangents and Telescoping Series",
  oneLineDefinition:
    "Adding inverse tangents and cotangents with the addition formula, and summing series whose terms split into differences of two inverse tangents.",
  whyItMatters:
    "Thirteen PYQs, ten of them multiple choice, and two from 2026. Four add two or three inverse tangents or cotangents with the addition formula; nine sum a series whose terms telescope. Two ideas cover the page.",
  concepts: [
    // C1 — addition formula
    {
      kind: "formula" as const,
      slug: "jitf-addition",
      name: "The addition formula for inverse tangents",
      intuition:
        "Taking the tangent of \\(\\tan^{-1}a+\\tan^{-1}b\\) gives \\(\\frac{a+b}{1-ab}\\). When \\(ab<1\\), the sum lies in \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\) and equals \\(\\tan^{-1}\\frac{a+b}{1-ab}\\). When \\(a,b>0\\) and \\(ab>1\\), the sum is past \\(\\frac\\pi2\\), so add \\(\\pi\\). Convert inverse cotangents to inverse tangents first.",
      definition:
        "- \\(ab<1\\): \\(\\tan^{-1}a+\\tan^{-1}b=\\tan^{-1}\\frac{a+b}{1-ab}\\).\n" +
        "- \\(a,b>0,\\ ab>1\\): add \\(\\pi\\). \\(a,b<0,\\ ab>1\\): subtract \\(\\pi\\).\n" +
        "- \\(ab>-1\\): \\(\\tan^{-1}a-\\tan^{-1}b=\\tan^{-1}\\frac{a-b}{1+ab}\\).\n" +
        "- \\(\\cot^{-1}x=\\tan^{-1}\\frac1x\\) for \\(x>0\\), and \\(\\pi+\\tan^{-1}\\frac1x\\) for \\(x<0\\).",
      formula: {
        label: "Addition formula",
        latex: "\\tan^{-1}a+\\tan^{-1}b=\\tan^{-1}\\frac{a+b}{1-ab}\\quad(ab<1)",
      },
      authoredExample: {
        prompt: "Find \\(\\tan^{-1}2+\\tan^{-1}3\\).",
        steps: [
          "\\(ab=6>1\\) with both positive, so add \\(\\pi\\).",
          "\\(\\pi+\\tan^{-1}\\frac{5}{1-6}=\\pi+\\tan^{-1}(-1)=\\pi-\\frac\\pi4\\).",
        ],
        answer: "\\(\\frac{3\\pi}4\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\tan^{-1}x+\\tan^{-1}\\frac14=\\frac\\pi4\\).",
        steps: [
          "\\(\\frac{x+\\frac14}{1-\\frac x4}=1\\), so \\(x+\\frac14=1-\\frac x4\\).",
          "\\(\\frac{5x}4=\\frac34\\); and \\(\\frac x4<1\\), so the formula applies.",
        ],
        answer: "\\(x=\\frac35\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}\\frac12+\\tan^{-1}\\frac13\\)?", answer: "\\(\\frac\\pi4\\)" },
        { prompt: "\\(\\tan^{-1}1+\\tan^{-1}2+\\tan^{-1}3\\)?", answer: "\\(\\pi\\)" },
        { prompt: "\\(\\tan^{-1}3-\\tan^{-1}1\\)?", answer: "\\(\\tan^{-1}\\frac12\\)" },
        { prompt: "\\(\\cot^{-1}(-1)\\)?", answer: "\\(\\frac{3\\pi}4\\)" },
      ],
      pyqExampleId: "e831fa30-1e87-4f78-a3ed-a63a103832f0", // 2026 — two inverse tangents summing to π/4
      traps: [
        {
          title: "When the product exceeds 1",
          body: "For positive \\(a,b\\) with \\(ab>1\\), \\(\\frac{a+b}{1-ab}\\) is negative although both angles are positive. The formula alone gives a negative angle; add \\(\\pi\\).",
        },
      ],
    },

    // C2 — telescoping
    {
      kind: "formula" as const,
      slug: "jitf-telescope",
      name: "Telescoping sums of inverse tangents",
      intuition:
        "Read the subtraction formula backwards: \\(\\tan^{-1}\\frac{b-a}{1+ab}=\\tan^{-1}b-\\tan^{-1}a\\). If each term of a series can be written this way with \\(b\\) of one term equal to \\(a\\) of the next, the sum collapses to the last \\(b\\) minus the first \\(a\\). The work is spotting \\(a\\) and \\(b\\): write the denominator as \\(1+ab\\) where \\(b-a\\) is the numerator.",
      definition:
        "- \\(\\tan^{-1}\\frac{b-a}{1+ab}=\\tan^{-1}b-\\tan^{-1}a\\) for \\(ab>-1\\).\n" +
        "- \\(\\frac1{1+n(n+1)}\\): \\(a=n\\), \\(b=n+1\\).\n" +
        "- A cotangent term \\(\\cot^{-1}c\\) with \\(c>0\\) is \\(\\tan^{-1}\\frac1c\\); scale numerator and denominator until the numerator is \\(b-a\\).\n" +
        "- \\(\\sum_{r=1}^{n}\\left(\\tan^{-1}b_r-\\tan^{-1}b_{r-1}\\right)=\\tan^{-1}b_n-\\tan^{-1}b_0\\), and \\(\\tan^{-1}b_n\\to\\frac\\pi2\\) as \\(b_n\\to\\infty\\).",
      formula: {
        label: "Telescoping term",
        latex: "\\tan^{-1}\\frac{b-a}{1+ab}=\\tan^{-1}b-\\tan^{-1}a",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{r=1}^{\\infty}\\tan^{-1}\\frac{2r}{r^4+r^2+2}\\).",
        steps: [
          "With \\(b=r^2+r+1\\), \\(a=r^2-r+1\\): \\(b-a=2r\\) and \\(1+ab=1+(r^4+r^2+1)\\).",
          "The \\(b\\) of term \\(r\\) is the \\(a\\) of term \\(r+1\\), so the sum to \\(n\\) is \\(\\tan^{-1}(n^2+n+1)-\\tan^{-1}1\\).",
          "As \\(n\\to\\infty\\): \\(\\frac\\pi2-\\frac\\pi4\\).",
        ],
        answer: "\\(\\frac\\pi4\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{r=1}^{\\infty}\\tan^{-1}\\frac{3}{r^2+r+9}\\).",
        steps: [
          "Divide top and bottom by 9: \\(\\frac{1/3}{1+\\frac r3\\cdot\\frac{r+1}3}\\), so the term is \\(\\tan^{-1}\\frac{r+1}3-\\tan^{-1}\\frac r3\\).",
          "The sum tends to \\(\\frac\\pi2-\\tan^{-1}\\frac13\\).",
        ],
        answer: "\\(\\tan^{-1}3\\).",
      },
      practiceSet: [
        { prompt: "Write \\(\\tan^{-1}\\frac13\\) as a difference.", answer: "\\(\\tan^{-1}2-\\tan^{-1}1\\)" },
        { prompt: "Write \\(\\tan^{-1}\\frac17\\) as a difference.", answer: "\\(\\tan^{-1}3-\\tan^{-1}2\\)" },
        { prompt: "\\(\\sum_{r=1}^{n}\\left(\\tan^{-1}(r+1)-\\tan^{-1}r\\right)\\)?", answer: "\\(\\tan^{-1}(n+1)-\\frac\\pi4\\)" },
        { prompt: "Its limit as \\(n\\to\\infty\\)?", answer: "\\(\\frac\\pi4\\)" },
      ],
      pyqExampleId: "b1b54809-3c3e-400a-89de-90e47dad6fa8", // 2026 — a telescoping sum with powers of 2
      traps: [
        {
          title: "Keep the order of the difference",
          body: "The term must be \\(\\tan^{-1}(\\text{next})-\\tan^{-1}(\\text{this})\\), so the numerator is the larger minus the smaller. With the order reversed the sum comes out with the wrong sign, and it will not match the options.",
        },
      ],
    },
  ],
};
