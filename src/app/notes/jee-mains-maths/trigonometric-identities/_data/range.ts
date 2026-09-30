import type { SubtopicNote } from "@/app/notes/_types";

export const RANGE_TI_NOTE: SubtopicNote = {
  subtopicName: "Maximum, Minimum and Range",
  title: "Maximum, Minimum and Range",
  oneLineDefinition:
    "The greatest and least values of a trigonometric expression, found from a sin θ + b cos θ or from a quantity with a known range.",
  whyItMatters:
    "Nine PYQs, all of them multiple choice, and three from 2026. Four bound a sin θ + b cos θ between −√(a² + b²) and √(a² + b²), often after a rewrite; five reduce the expression to something whose range or sign is known — sin²θ cos²θ, a single sine, the signs by quadrant — or force the only solution through a discriminant. Two ideas cover the page.",
  concepts: [
    // C1 — a sin θ + b cos θ
    {
      kind: "formula" as const,
      slug: "jti-auxiliary",
      name: "The bound on a sin θ + b cos θ",
      intuition:
        "\\(a\\sin\\theta+b\\cos\\theta\\) is one sine wave in disguise: it equals \\(R\\sin(\\theta+\\varphi)\\) with \\(R=\\sqrt{a^2+b^2}\\), so it swings between \\(-R\\) and \\(R\\). Most questions first need a rewrite into this shape: expand a compound angle, or turn \\(\\sin^2\\theta\\), \\(\\cos^2\\theta\\) and \\(\\sin\\theta\\cos\\theta\\) into ratios of \\(2\\theta\\).",
      definition:
        "- \\(a\\sin\\theta+b\\cos\\theta=R\\sin(\\theta+\\varphi)\\), \\(R=\\sqrt{a^2+b^2}\\), \\(\\tan\\varphi=\\frac ba\\).\n" +
        "- \\(c+a\\sin\\theta+b\\cos\\theta\\) lies in \\([c-R,\\,c+R]\\).\n" +
        "- \\(\\sin^2\\theta=\\frac{1-\\cos2\\theta}{2}\\), \\(\\cos^2\\theta=\\frac{1+\\cos2\\theta}{2}\\), \\(\\sin\\theta\\cos\\theta=\\frac12\\sin2\\theta\\).\n" +
        "- If \\(c>R\\), \\(\\frac{1}{c+a\\sin\\theta+b\\cos\\theta}\\) lies in \\(\\left[\\frac{1}{c+R},\\frac{1}{c-R}\\right]\\).\n" +
        "- An increasing function such as \\(2^u\\) keeps the order, so its extremes come from the extremes of \\(u\\).",
      formula: {
        label: "The bound",
        latex: "-\\sqrt{a^2+b^2}\\le a\\sin\\theta+b\\cos\\theta\\le\\sqrt{a^2+b^2}",
      },
      authoredExample: {
        prompt: "Find the range of \\(3\\sin\\theta-4\\cos\\theta+7\\), and of its reciprocal.",
        steps: [
          "\\(R=\\sqrt{9+16}=5\\), so \\(3\\sin\\theta-4\\cos\\theta\\in[-5,5]\\).",
          "Adding 7: \\([2,12]\\).",
          "The expression is always positive, so the reciprocal runs from \\(\\frac{1}{12}\\) to \\(\\frac12\\).",
        ],
        answer: "\\([2,12]\\) and \\(\\left[\\frac{1}{12},\\frac12\\right]\\).",
      },
      selfCheckExample: {
        prompt: "Find the greatest value of \\(\\sin\\theta+\\sin\\left(\\theta+\\frac{\\pi}{3}\\right)\\).",
        steps: [
          "Expand: \\(\\sin\\theta+\\frac12\\sin\\theta+\\frac{\\sqrt3}{2}\\cos\\theta=\\frac32\\sin\\theta+\\frac{\\sqrt3}{2}\\cos\\theta\\).",
          "\\(R=\\sqrt{\\frac94+\\frac34}\\).",
        ],
        answer: "\\(\\sqrt3\\).",
      },
      practiceSet: [
        { prompt: "Greatest value of \\(\\sin\\theta+\\sqrt3\\cos\\theta\\)?", answer: "\\(2\\)" },
        { prompt: "Least value of \\(5\\cos\\theta+12\\sin\\theta\\)?", answer: "\\(-13\\)" },
        { prompt: "Range of \\(\\sin^2\\theta+\\sin2\\theta\\)?", answer: "\\(\\left[\\frac{1-\\sqrt5}{2},\\frac{1+\\sqrt5}{2}\\right]\\)" },
        { prompt: "Greatest value of \\(2^{\\sin\\theta+\\cos\\theta}\\)?", answer: "\\(2^{\\sqrt2}\\)" },
      ],
      pyqExampleId: "6a7001b8-51ce-4120-b7fb-f3c4866de63e", // 2026 — a quadratic form in sin θ, cos θ becomes 4 − cos 2θ − 3 sin 2θ
      traps: [
        {
          title: "The bound needs one angle",
          body: "\\(\\sqrt{a^2+b^2}\\) bounds \\(a\\sin\\theta+b\\cos\\theta\\) only when both terms have the same angle. \\(\\sin\\theta+\\cos2\\theta\\) is not of this form; bounding each term on its own gives a range that is too wide.",
        },
      ],
    },

    // C2 — ranges through a bounded quantity
    {
      kind: "formula" as const,
      slug: "jti-bounded",
      name: "Ranges through a bounded quantity",
      intuition:
        "When an expression reduces to one simpler quantity — \\(p=\\sin^2\\theta\\cos^2\\theta\\), a single \\(\\sin k\\theta\\), or the sign of each ratio — its range follows from the range of that quantity. When an equation can hold only at the edge of a bound, the equality case fixes the angles.",
      definition:
        "- \\(p=\\sin^2\\theta\\cos^2\\theta\\in\\left[0,\\frac14\\right]\\); \\(\\sin k\\theta,\\cos k\\theta\\in[-1,1]\\).\n" +
        "- A linear function of \\(p\\) or of \\(\\sin k\\theta\\) takes its extremes at the ends of that interval.\n" +
        "- The signs by quadrant decide the sign of an expression; a sum of signs takes only a few values.\n" +
        "- A quadratic in \\(\\cos u\\) with a real root needs a discriminant \\(\\ge0\\). If that holds only with equality, the angles are fixed.",
      formula: {
        label: "The range of p",
        latex: "\\sin^2\\theta\\cos^2\\theta=\\tfrac14\\sin^22\\theta\\in\\left[0,\\tfrac14\\right]",
      },
      authoredExample: {
        prompt: "Find the range of \\(\\sin^6\\theta+\\cos^6\\theta\\).",
        steps: [
          "\\(\\sin^6\\theta+\\cos^6\\theta=1-3p\\), with \\(p=\\sin^2\\theta\\cos^2\\theta\\).",
          "\\(p\\) runs over \\(\\left[0,\\frac14\\right]\\), and \\(1-3p\\) decreases as \\(p\\) grows.",
          "Ends: \\(1\\) at \\(p=0\\), and \\(\\frac14\\) at \\(p=\\frac14\\).",
        ],
        answer: "\\(\\left[\\frac14,1\\right]\\).",
      },
      selfCheckExample: {
        prompt: "Find the range of \\(5+2\\sin\\theta\\cos\\theta\\cos2\\theta\\).",
        steps: [
          "\\(2\\sin\\theta\\cos\\theta\\cos2\\theta=\\sin2\\theta\\cos2\\theta=\\frac12\\sin4\\theta\\).",
          "\\(\\sin4\\theta\\in[-1,1]\\), so the expression runs from \\(5-\\frac12\\) to \\(5+\\frac12\\).",
        ],
        answer: "\\(\\left[\\frac92,\\frac{11}{2}\\right]\\).",
      },
      practiceSet: [
        { prompt: "Range of \\(\\sin^4\\theta+\\cos^4\\theta\\)?", answer: "\\(\\left[\\frac12,1\\right]\\)" },
        { prompt: "Range of \\(3-\\sin^22\\theta\\)?", answer: "\\([2,3]\\)" },
        { prompt: "Values of \\(\\frac{|\\sin x|}{\\sin x}+\\frac{|\\cos x|}{\\cos x}\\)?", answer: "\\(-2,0,2\\)" },
        { prompt: "Least value of \\(\\tan^2\\theta+\\cot^2\\theta\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "9ea47716-919e-4f6c-8beb-2b1b60b460ae", // 2026 — shifted fourth and sixth powers reduce to 2 − 2p
      traps: [
        {
          title: "Check that each end is reached",
          body: "The range of \\(1-3p\\) uses both ends of \\(p\\in\\left[0,\\frac14\\right]\\). If the question removes some angles, for example where \\(\\tan^2\\theta=1\\), an end can drop out and the interval becomes open there.",
        },
      ],
    },
  ],
};
