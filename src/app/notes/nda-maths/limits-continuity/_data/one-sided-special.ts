import type { SubtopicNote } from "@/app/notes/_types";

export const ONE_SIDED_SPECIAL_NOTE: SubtopicNote = {
  subtopicName:
    "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
  title: "One-Sided, Greatest-Integer & Modulus Limits",
  oneLineDefinition:
    "When the function behaves differently on the two sides of a point — a modulus, a greatest-integer step, or a piecewise rule — you must compute the left and right limits separately.",
  whyItMatters:
    "These are where 'the limit doesn't exist' answers come from. The greatest-integer and modulus functions are the NDA's favourite trap: the two sides genuinely disagree, so blindly substituting gives the wrong answer.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lim-one-sided",
      name: "Left-hand and right-hand limits",
      intuition:
        "Approach the point from below (\\(x\\to a^-\\)) and from above (\\(x\\to a^+\\)) separately. If the two agree, the limit is that common value; if they differ, the two-sided limit does not exist. Essential whenever the rule changes at the point.",
      definition:
        "**LHL** \\(=\\lim_{x\\to a^-}f(x)\\), **RHL** \\(=\\lim_{x\\to a^+}f(x)\\). The limit exists iff LHL \\(=\\) RHL. For a piecewise \\(f\\), use the piece valid on each side; for a product/quotient of one-sided-sensitive parts, evaluate each side end-to-end.",
      visualizationSlug: "lim-one-sided-approach",
      authoredExample: {
        prompt: "For \\(f(x)=\\begin{cases}x+1,&x<0\\\\ x^2,&x\\ge 0\\end{cases}\\), find \\(\\lim_{x\\to 0}f(x)\\).",
        steps: [
          "LHL \\(=\\lim_{x\\to0^-}(x+1)=1\\); RHL \\(=\\lim_{x\\to0^+}x^2=0\\).",
          "LHL \\(\\neq\\) RHL.",
        ],
        answer: "The limit does not exist.",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to 0}\\dfrac{x^2+x+|x|}{x}\\).",
        steps: [
          "RHL (\\(x>0\\), \\(|x|=x\\)): \\(\\dfrac{x^2+2x}{x}=x+2\\to 2\\). LHL (\\(x<0\\), \\(|x|=-x\\)): \\(\\dfrac{x^2}{x}=x\\to 0\\).",
          "LHL \\(\\neq\\) RHL.",
        ],
        answer: "Does not exist (RHL \\(=2\\), LHL \\(=0\\)).",
      },
      practiceSet: [
        { prompt: "Two-sided limit exists iff?", answer: "LHL \\(=\\) RHL" },
        { prompt: "Notation for the right-hand limit?", answer: "\\(\\lim_{x\\to a^+}f(x)\\)" },
        { prompt: "If LHL \\(=2\\), RHL \\(=2\\), limit?", answer: "\\(2\\)" },
        { prompt: "If LHL \\(=1\\), RHL \\(=-1\\), limit?", answer: "Does not exist" },
      ],
      pyqExampleId: "328bc8a1-8629-4eee-90b5-beb1c00a4d78", // lim x→0 piecewise f
    },

    {
      kind: "formula" as const,
      slug: "lim-greatest-integer-limits",
      name: "Limits of the greatest-integer function",
      intuition:
        "The greatest-integer function \\(\\lfloor x\\rfloor\\) jumps at every integer: just below \\(n\\) it equals \\(n-1\\), at and just above \\(n\\) it equals \\(n\\). So at an integer the one-sided limits differ by 1 — almost every \\(\\lfloor x\\rfloor\\) limit is a one-sided question in disguise.",
      definition:
        "At an integer \\(n\\): \\(\\lim_{x\\to n^-}\\lfloor x\\rfloor=n-1\\), \\(\\lim_{x\\to n^+}\\lfloor x\\rfloor=n\\) — so \\(\\lim_{x\\to n}\\lfloor x\\rfloor\\) does not exist. Between integers \\(\\lfloor x\\rfloor\\) is constant. For \\(\\lfloor g(x)\\rfloor\\), track which integers \\(g\\) crosses near the point (e.g. \\(\\lfloor x^2\\rfloor\\) near \\(x=0\\)).",
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to 2}\\lfloor x\\rfloor\\) (if it exists).",
        steps: [
          "LHL \\(=\\lim_{x\\to2^-}\\lfloor x\\rfloor=1\\); RHL \\(=\\lim_{x\\to2^+}\\lfloor x\\rfloor=2\\).",
          "They differ.",
        ],
        answer: "Does not exist (LHL \\(=1\\), RHL \\(=2\\)).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to 0^-}\\dfrac{\\lfloor x\\rfloor}{|x|}\\).",
        steps: [
          "For \\(-1<x<0\\): \\(\\lfloor x\\rfloor=-1\\) and \\(|x|=-x\\to 0^+\\).",
          "\\(\\dfrac{-1}{0^+}\\to-\\infty\\).",
        ],
        answer: "\\(-\\infty\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to3^-}\\lfloor x\\rfloor\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\lim_{x\\to3^+}\\lfloor x\\rfloor\\)?", answer: "\\(3\\)" },
        { prompt: "Does \\(\\lim_{x\\to n}\\lfloor x\\rfloor\\) exist at an integer \\(n\\)?", answer: "No" },
        { prompt: "\\(\\lfloor x\\rfloor\\) on \\((2,3)\\)?", answer: "\\(2\\) (constant)" },
      ],
      pyqExampleId: "0f2d5dfc-ddbb-46b5-9d49-4b3bd4a715f2", // [x]/|x|
    },

    {
      kind: "formula" as const,
      slug: "lim-absolute-value-limits",
      name: "Limits involving the modulus",
      intuition:
        "A modulus splits at its zero: \\(|x|=x\\) for \\(x\\ge 0\\) and \\(-x\\) for \\(x<0\\). Near that split the sign flips, so \\(x/|x|\\) and similar ratios have different one-sided values. Watch for hidden moduli from square roots like \\(\\sqrt{1-\\cos\\theta}=\\sqrt2\\,|\\sin\\tfrac\\theta2|\\).",
      definition:
        "Replace \\(|g(x)|\\) by \\(+g\\) on the side where \\(g>0\\) and \\(-g\\) where \\(g<0\\), then take each one-sided limit. \\(\\dfrac{x}{|x|}\\) is \\(+1\\) for \\(x>0\\) and \\(-1\\) for \\(x<0\\). A surd hides a modulus: \\(\\sqrt{A^2}=|A|\\), which is sign-sensitive.",
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to 5}\\dfrac{5-x}{|x-5|}\\) (if it exists).",
        steps: [
          "For \\(x>5\\): \\(|x-5|=x-5\\), ratio \\(=\\dfrac{-(x-5)}{x-5}=-1\\). For \\(x<5\\): \\(|x-5|=5-x\\), ratio \\(=+1\\).",
          "RHL \\(=-1\\), LHL \\(=+1\\).",
        ],
        answer: "Does not exist (the two sides give \\(\\pm 1\\)).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{\\theta\\to 0^+}\\dfrac{\\sqrt{1-\\cos\\theta}}{\\theta}\\).",
        steps: [
          "\\(1-\\cos\\theta=2\\sin^2\\tfrac\\theta2\\Rightarrow\\sqrt{1-\\cos\\theta}=\\sqrt2\\,|\\sin\\tfrac\\theta2|=\\sqrt2\\sin\\tfrac\\theta2\\) for \\(\\theta>0\\).",
          "\\(\\dfrac{\\sqrt2\\sin(\\theta/2)}{\\theta}\\to\\sqrt2\\cdot\\tfrac12=\\tfrac{1}{\\sqrt2}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt2}\\) (the left limit is \\(-\\tfrac{1}{\\sqrt2}\\)).",
      },
      practiceSet: [
        { prompt: "\\(x/|x|\\) for \\(x>0\\)?", answer: "\\(+1\\)" },
        { prompt: "\\(x/|x|\\) for \\(x<0\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(\\sqrt{A^2}=?\\)", answer: "\\(|A|\\)" },
        { prompt: "Does \\(\\lim_{x\\to0}\\dfrac{x}{|x|}\\) exist?", answer: "No" },
      ],
      pyqExampleId: "1d8e2d3e-c275-4508-ba64-ccd9ea58be18", // (5-x)/|x-5|
    },
  ],
  related: [
    { label: "Evaluating Limits", href: "/notes/nda-maths/limits-continuity/lim-evaluation" },
    { label: "Continuity & Differentiability", href: "/notes/nda-maths/limits-continuity/lim-continuity" },
  ],
};
