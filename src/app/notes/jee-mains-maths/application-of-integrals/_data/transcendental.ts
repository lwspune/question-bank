import type { SubtopicNote } from "@/app/notes/_types";

export const TRANSCENDENTAL_AOI_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric, Exponential and Reciprocal Curves",
  title: "Trigonometric, Exponential and Reciprocal Curves",
  oneLineDefinition:
    "Areas bounded by sine and cosine, exponential and log curves, or the curve y = k/x, where the answer carries a surd, e or a logarithm.",
  whyItMatters:
    "Eighteen PYQs, fifteen of them multiple choice, and six from 2026. Eight use sin x and cos x, which cross where tan x = 1; four use eˣ, 2ˣ or a log curve; six bound the region by y = k/x or xy = k, so the answer has a log. Three ideas cover the page.",
  concepts: [
    // C1 — sine and cosine
    {
      kind: "formula" as const,
      slug: "jaoi-sin-cos",
      name: "Sine and cosine",
      intuition:
        "\\(\\sin x\\) and \\(\\cos x\\) cross at \\(\\frac\\pi4+n\\pi\\), and a min or max of the two switches there. Their difference is \\(\\sqrt2\\sin\\left(x-\\frac\\pi4\\right)\\), a single sine wave, so the area between consecutive crossings is fixed. Split at every crossing and at every zero of the curves.",
      definition:
        "- \\(\\sin x=\\cos x\\) at \\(x=\\frac\\pi4+n\\pi\\).\n" +
        "- \\(\\sin x-\\cos x=\\sqrt2\\sin\\left(x-\\frac\\pi4\\right)\\); \\(\\sin x+\\cos x=\\sqrt2\\sin\\left(x+\\frac\\pi4\\right)\\).\n" +
        "- One arch of \\(\\sin x\\) or \\(\\cos x\\) has area 2.",
      formula: {
        label: "Between consecutive crossings",
        latex: "\\int_{\\pi/4}^{5\\pi/4}(\\sin x-\\cos x)\\,dx=2\\sqrt2",
      },
      authoredExample: {
        prompt: "Find the area between \\(y=\\sin x\\) and \\(y=\\cos x\\) for \\(0\\le x\\le\\frac\\pi2\\).",
        steps: [
          "They cross at \\(\\frac\\pi4\\); cos is on top before it and sin after it.",
          "\\(\\int_0^{\\pi/4}(\\cos x-\\sin x)\\,dx=[\\sin x+\\cos x]_0^{\\pi/4}=\\sqrt2-1\\).",
          "By symmetry the second piece is the same.",
        ],
        answer: "\\(2\\sqrt2-2\\).",
      },
      selfCheckExample: {
        prompt: "Find the area under \\(y=\\min\\{\\sin x,\\cos x\\}\\) for \\(0\\le x\\le\\frac\\pi2\\).",
        steps: [
          "The min is \\(\\sin x\\) on \\([0,\\frac\\pi4]\\) and \\(\\cos x\\) on \\([\\frac\\pi4,\\frac\\pi2]\\).",
          "Each piece is \\(1-\\frac{\\sqrt2}2\\).",
        ],
        answer: "\\(2-\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^{\\pi/2}\\cos x\\,dx\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sin x=\\cos x\\) in \\((\\pi,2\\pi)\\)?", answer: "\\(x=\\frac{5\\pi}4\\)" },
        { prompt: "Largest value of \\(\\sin x+\\cos x\\)?", answer: "\\(\\sqrt2\\)" },
        { prompt: "Area of one arch of \\(y=\\sin2x\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "35a41a27-2c9c-4f65-9c8f-370342515233", // 2023 — between |cos x - sin x| and sin x
      traps: [
        {
          title: "Area is not the signed integral",
          body: "\\(\\int_0^{2\\pi}\\sin x\\,dx=0\\), but the area is 4. Split wherever the curve crosses the axis, or where the top and bottom swap, and add the pieces as positive numbers.",
        },
      ],
    },

    // C2 — exponential and log curves
    {
      kind: "formula" as const,
      slug: "jaoi-exp-log",
      name: "Exponential and log curves",
      intuition:
        "\\(e^x\\) integrates to itself and \\(a^x\\) to \\(\\frac{a^x}{\\ln a}\\). \\(\\ln x\\) is the reflection of \\(e^x\\) in \\(y=x\\), so a region beside a log curve is often easier with horizontal strips, where the boundary is \\(x=e^y\\).",
      definition:
        "- \\(\\int e^{kx}\\,dx=\\frac{e^{kx}}k\\); \\(\\int a^x\\,dx=\\frac{a^x}{\\ln a}\\).\n" +
        "- \\(\\int\\ln x\\,dx=x\\ln x-x\\).\n" +
        "- \\(y=\\ln x\\) is \\(x=e^y\\): the area between \\(\\ln x\\), the x-axis and \\(x=e\\) is \\(\\int_0^1(e-e^y)\\,dy=1\\).",
      formula: {
        label: "Log and exponential",
        latex: "\\int\\ln x\\,dx=x\\ln x-x+C,\\qquad\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C",
      },
      authoredExample: {
        prompt: "Find the area between \\(y=e^x\\) and \\(y=x+1\\) for \\(0\\le x\\le1\\).",
        steps: [
          "\\(e^x\\ge x+1\\), so \\(e^x\\) is on top.",
          "Area \\(=\\int_0^1(e^x-x-1)\\,dx=(e-1)-\\frac12-1\\).",
        ],
        answer: "\\(e-\\frac52\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y=\\ln x\\), the x-axis and \\(x=e^2\\).",
        steps: [
          "\\(\\ln x\\ge0\\) on \\([1,e^2]\\).",
          "\\([x\\ln x-x]_1^{e^2}=(2e^2-e^2)-(0-1)\\).",
        ],
        answer: "\\(e^2+1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^1e^x\\,dx\\)?", answer: "\\(e-1\\)" },
        { prompt: "\\(\\int_0^1 3^x\\,dx\\)?", answer: "\\(\\frac2{\\ln3}\\)" },
        { prompt: "\\(\\int_0^{\\ln2}e^x\\,dx\\)?", answer: "\\(1\\)" },
        { prompt: "\\(y=\\ln x\\) as x in terms of y?", answer: "\\(x=e^y\\)" },
      ],
      pyqExampleId: "c9723a95-a02c-43d6-a9e9-5ba0b37168ef", // 2026 — between x^2 and an exponential on [0, 1]
      traps: [
        {
          title: "The ln a factor",
          body: "\\(\\int_0^1 2^x\\,dx=\\frac1{\\ln2}\\), not 1. Only base e integrates to itself; any other base divides by its log.",
        },
      ],
    },

    // C3 — reciprocal curves
    {
      kind: "formula" as const,
      slug: "jaoi-reciprocal",
      name: "Reciprocal curves and xy = k",
      intuition:
        "\\(xy=k\\) is the curve \\(y=\\frac kx\\), and its integral is \\(k\\ln x\\), so the answer has a log. Find where the hyperbola meets the other curve; the top usually switches to the hyperbola there, so split the interval at that point.",
      definition:
        "- For \\(x>0\\), \\(xy=k\\) is \\(y=\\frac kx\\), and \\(\\int_a^b\\frac kx\\,dx=k\\ln\\frac ba\\).\n" +
        "- \\((x+c)y=k\\) is \\(y=\\frac k{x+c}\\), with integral \\(k\\ln(x+c)\\).\n" +
        "- \\(xy\\le k\\) with no condition on x lets x run negative, where the region can be unbounded.",
      formula: {
        label: "Under y = k/x",
        latex: "\\int_a^b\\frac{k}{x}\\,dx=k\\ln\\frac{b}{a}",
      },
      authoredExample: {
        prompt: "Find the area between \\(y=\\frac1x\\) and the line \\(x+y=\\frac52\\).",
        steps: [
          "\\(\\frac1x=\\frac52-x\\) gives \\(x=\\frac12\\) and \\(x=2\\); the line is on top between them.",
          "Area \\(=\\int_{1/2}^{2}\\left(\\frac52-x-\\frac1x\\right)dx=\\frac{15}4-\\frac{15}8-\\ln4\\).",
        ],
        answer: "\\(\\frac{15}8-2\\ln2\\).",
      },
      selfCheckExample: {
        prompt: "Find the area of \\(\\{(x,y):0\\le x\\le4,\\ 0\\le y\\le x,\\ xy\\le4\\}\\).",
        steps: [
          "\\(y=x\\) meets \\(y=\\frac4x\\) at \\(x=2\\).",
          "The top is x on \\([0,2]\\) and \\(\\frac4x\\) on \\([2,4]\\).",
          "Area \\(=2+4\\ln2\\).",
        ],
        answer: "\\(2+4\\ln2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_1^3\\frac2x\\,dx\\)?", answer: "\\(2\\ln3\\)" },
        { prompt: "\\(\\int_0^1\\frac1{x+1}\\,dx\\)?", answer: "\\(\\ln2\\)" },
        { prompt: "Where does \\(y=\\frac1x\\) meet \\(y=x^2\\)?", answer: "\\((1,1)\\)" },
        { prompt: "\\(\\int_1^e\\frac1x\\,dx\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "c3008290-2a28-4163-b22e-25a6fd30b1ef", // 2026 — xy <= 8 with 1 <= y <= x^2 and x >= 0
      traps: [
        {
          title: "State the quadrant",
          body: "Without \\(x\\ge0\\), a region such as \\(xy\\le k\\), \\(1\\le y\\le x^2\\) includes every \\(x\\le-1\\), where \\(xy\\le0\\le k\\) always holds, so it is unbounded. The printed answers assume \\(x\\ge0\\).",
        },
      ],
    },
  ],
};
