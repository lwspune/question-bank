import type { SubtopicNote } from "@/app/notes/_types";

export const EXTREMA_AOD_NOTE: SubtopicNote = {
  subtopicName: "Local Maxima and Minima",
  title: "Local Maxima and Minima",
  oneLineDefinition:
    "Finding and counting the local maxima and minima of a function from the sign changes of its derivative, including at corners and cusps where the derivative does not exist.",
  whyItMatters:
    "Nineteen PYQs, thirteen of them multiple choice, and three from 2026. Twelve find or count local extrema from where f′ changes sign — often f is defined by an integral, so f′ comes straight from the integrand; seven have corners or cusps, from a modulus, a piecewise rule or a fractional power, where f′ does not exist. Two ideas cover the page.",
  concepts: [
    // C1 — sign changes of f'
    {
      kind: "formula" as const,
      slug: "jaod-signchange",
      name: "Sign changes of the derivative",
      intuition:
        "A local maximum is where \\(f'\\) changes from \\(+\\) to \\(-\\), a local minimum where it changes from \\(-\\) to \\(+\\). A factor \\((x-a)^n\\) of \\(f'\\) changes sign at \\(a\\) only when \\(n\\) is odd. When \\(f(x)=\\int_0^{g(x)}h(t)\\,dt\\), the derivative is \\(h(g(x))\\,g'(x)\\), so the extrema come from the zeros of \\(h\\) at \\(g(x)\\) and of \\(g'\\).",
      definition:
        "- Maximum: \\(f'\\) goes \\(+\\to-\\); minimum: \\(-\\to+\\).\n" +
        "- \\((x-a)^n\\) in \\(f'\\): a sign change only for odd \\(n\\).\n" +
        "- \\(\\frac{d}{dx}\\int_a^{g(x)}h(t)\\,dt=h(g(x))\\,g'(x)\\).\n" +
        "- Second-derivative test: \\(f'(a)=0\\), \\(f''(a)<0\\) gives a maximum.",
      formula: {
        label: "Derivative of an integral",
        latex: "\\frac{d}{dx}\\int_a^{g(x)}h(t)\\,dt=h\\big(g(x)\\big)\\,g'(x)",
      },
      authoredExample: {
        prompt: "Find the local extrema of \\(f(x)=\\int_0^x t(t-2)^2\\,dt\\).",
        steps: [
          "\\(f'(x)=x(x-2)^2\\). The even power at 2 does not change sign; at 0, \\(f'\\) goes \\(-\\to+\\).",
        ],
        answer: "One local minimum, at \\(x=0\\); none at \\(x=2\\).",
      },
      selfCheckExample: {
        prompt: "Find the local maximum and minimum values of \\(x^3-6x^2+9x+1\\).",
        steps: [
          "\\(f'=3(x-1)(x-3)\\): maximum at 1, minimum at 3.",
        ],
        answer: "Maximum 5, minimum 1.",
      },
      practiceSet: [
        { prompt: "\\((x-1)^4\\) at \\(x=1\\)?", answer: "Minimum" },
        { prompt: "\\((x-2)^3\\) at \\(x=2\\)?", answer: "Neither" },
        { prompt: "\\(f'=(x+1)(x-3)^2\\): extrema?", answer: "A minimum at \\(-1\\) only" },
        { prompt: "Maximum value of \\(xe^{-x}\\)?", answer: "\\(\\frac1e\\)" },
      ],
      pyqExampleId: "433aac79-e767-4d50-9d29-4a8ba1546ecf", // 2025 — local extrema of an integral with upper limit x^2
      traps: [
        {
          title: "Even powers do not change sign",
          body: "A zero of \\(f'\\) from a factor like \\((t-4)^6\\) is a critical point but not an extremum. Count only the zeros where the sign actually flips.",
        },
      ],
    },

    // C2 — corners and cusps
    {
      kind: "formula" as const,
      slug: "jaod-corners",
      name: "Corners, cusps and piecewise functions",
      intuition:
        "A critical point is also a point where \\(f\\) is defined but \\(f'\\) is not: the corner of \\(|x|\\), the cusp of \\(x^{2/3}\\), the join of a piecewise rule. Decide such a point by the sign of \\(f'\\) on either side, or by comparing values. For \\(|g|\\), each zero of \\(g\\) (where \\(g\\) changes sign) is a minimum with value 0.",
      definition:
        "- Critical points: \\(f'=0\\) or \\(f'\\) undefined, with \\(f\\) defined there.\n" +
        "- \\(|g|\\): zeros of \\(g\\) are minima; extrema of \\(g\\) stay extrema of \\(|g|\\).\n" +
        "- Piecewise: check the value at the join against both sides.\n" +
        "- A corner is an extremum only if the function turns there.",
      formula: {
        label: "Critical points",
        latex: "f'(c)=0\\ \\text{or}\\ f'(c)\\ \\text{does not exist}\\ (c\\in\\text{domain})",
      },
      authoredExample: {
        prompt: "Find the local extrema of \\(|x^2-4|\\).",
        steps: [
          "\\(x^2-4\\) is 0 at \\(\\pm2\\): minima with value 0.",
          "At 0, \\(|x^2-4|=4-x^2\\) has a maximum.",
        ],
        answer: "Minima at \\(\\pm2\\) (value 0), maximum at 0 (value 4).",
      },
      selfCheckExample: {
        prompt: "Classify the critical point of \\(x^{2/3}\\).",
        steps: [
          "\\(f'=\\frac23x^{-1/3}\\) does not exist at 0; it is negative to the left and positive to the right.",
        ],
        answer: "A local minimum at 0 (a cusp).",
      },
      practiceSet: [
        { prompt: "Critical points of \\(|x|\\)?", answer: "\\(x=0\\)" },
        { prompt: "Local maxima of \\(|\\sin x|\\) in \\((0,2\\pi)\\)?", answer: "\\(2\\)" },
        { prompt: "\\(x|x|\\) at 0?", answer: "Neither" },
        { prompt: "Minimum of \\(|x-2|+1\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "59ea0ab4-6e97-48d0-8a8b-76204a5a3d47", // 2024 — extrema of 2x + 3x^(2/3), one at a cusp
      traps: [
        {
          title: "A corner need not be an extremum",
          body: "If the function falls on both sides of a corner, the corner is not an extremum. Check the direction on each side instead of counting every kink.",
        },
      ],
    },
  ],
};
