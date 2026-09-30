import type { SubtopicNote } from "@/app/notes/_types";

export const MULTIPLE_TI_NOTE: SubtopicNote = {
  subtopicName: "Standard Values and Multiple Angles",
  title: "Standard Values and Multiple Angles",
  oneLineDefinition:
    "Exact values at 15°, 18° and 36°, and the double- and triple-angle formulas that turn one ratio into another.",
  whyItMatters:
    "Ten PYQs, eight of them multiple choice, and two from 2026. Five need an exact value at 15°, 18° or 36°, two of them to name the equation that value is a root of; five use double- or triple-angle formulas, or join cos θ and sin θ terms into one ratio. Two ideas cover the page.",
  concepts: [
    // C1 — exact values
    {
      kind: "formula" as const,
      slug: "jti-values",
      name: "Exact values at 15°, 18° and 36°",
      intuition:
        "Beyond \\(30^\\circ\\), \\(45^\\circ\\) and \\(60^\\circ\\), a few angles have exact surd values. \\(15^\\circ\\) is \\(45^\\circ-30^\\circ\\). For \\(\\theta=18^\\circ\\), \\(2\\theta=90^\\circ-3\\theta\\), so \\(\\sin2\\theta=\\cos3\\theta\\); dividing by \\(\\cos\\theta\\) gives \\(4\\sin^2\\theta+2\\sin\\theta-1=0\\). The \\(36^\\circ\\) values follow from \\(\\cos36^\\circ=1-2\\sin^218^\\circ\\).",
      definition:
        "- \\(\\sin15^\\circ=\\frac{\\sqrt6-\\sqrt2}{4}\\), \\(\\cos15^\\circ=\\frac{\\sqrt6+\\sqrt2}{4}\\), \\(\\tan15^\\circ=2-\\sqrt3\\), \\(\\tan75^\\circ=2+\\sqrt3\\).\n" +
        "- \\(\\sin18^\\circ=\\cos72^\\circ=\\frac{\\sqrt5-1}{4}\\).\n" +
        "- \\(\\cos36^\\circ=\\sin54^\\circ=\\frac{\\sqrt5+1}{4}\\).\n" +
        "- \\(\\cos36^\\circ-\\sin18^\\circ=\\frac12\\) and \\(\\cos36^\\circ\\sin18^\\circ=\\frac14\\).\n" +
        "- To find an equation with a surd root, isolate the surd and square.",
      formula: {
        label: "Values at 18° and 36°",
        latex: "\\sin18^\\circ=\\frac{\\sqrt5-1}{4},\\qquad\\cos36^\\circ=\\frac{\\sqrt5+1}{4}",
      },
      authoredExample: {
        prompt: "Find \\(\\cos^236^\\circ+\\sin^218^\\circ\\).",
        steps: [
          "\\(\\cos^236^\\circ=\\frac{(\\sqrt5+1)^2}{16}=\\frac{6+2\\sqrt5}{16}\\) and \\(\\sin^218^\\circ=\\frac{6-2\\sqrt5}{16}\\).",
          "The surds cancel: \\(\\frac{12}{16}\\).",
        ],
        answer: "\\(\\frac34\\).",
      },
      selfCheckExample: {
        prompt: "Find a quadratic with integer coefficients that has \\(\\sin18^\\circ\\) as a root.",
        steps: [
          "\\(x=\\frac{\\sqrt5-1}{4}\\), so \\(4x+1=\\sqrt5\\).",
          "Square: \\(16x^2+8x+1=5\\).",
        ],
        answer: "\\(4x^2+2x-1=0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan75^\\circ\\)?", answer: "\\(2+\\sqrt3\\)" },
        { prompt: "\\(\\cos36^\\circ-\\cos72^\\circ\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\cos36^\\circ\\cos72^\\circ\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\sin^236^\\circ\\)?", answer: "\\(\\frac{5-\\sqrt5}{8}\\)" },
      ],
      pyqExampleId: "0b61797f-fe36-426b-a59d-7d8e4588389c", // 2026 — product forms of cos²A − sin²B, then cos 36° / sin 18°
      traps: [
        {
          title: "sin 18° and cos 36° differ in one sign",
          body: "\\(\\sin18^\\circ=\\frac{\\sqrt5-1}{4}\\approx0.31\\) and \\(\\cos36^\\circ=\\frac{\\sqrt5+1}{4}\\approx0.81\\). Check the size before substituting: a value above \\(\\frac12\\) cannot be \\(\\sin18^\\circ\\).",
        },
      ],
    },

    // C2 — double and triple angles
    {
      kind: "formula" as const,
      slug: "jti-multiple",
      name: "Double and triple angles",
      intuition:
        "Double- and triple-angle formulas trade powers of one angle for a single ratio of a larger angle, or the reverse. Squaring \\(\\sin\\theta\\pm\\cos\\theta\\) gives \\(\\sin2\\theta\\) at once. A pair such as \\(\\cos\\theta-\\sqrt3\\sin\\theta\\) is \\(2\\cos(\\theta+60^\\circ)\\), so two ratios can become one.",
      definition:
        "- \\(\\sin2\\theta=2\\sin\\theta\\cos\\theta\\); \\(\\cos2\\theta=\\cos^2\\theta-\\sin^2\\theta=1-2\\sin^2\\theta=2\\cos^2\\theta-1\\).\n" +
        "- \\(\\sin3\\theta=3\\sin\\theta-4\\sin^3\\theta\\); \\(\\cos3\\theta=4\\cos^3\\theta-3\\cos\\theta\\).\n" +
        "- \\(\\cos2\\theta=\\frac{1-\\tan^2\\theta}{1+\\tan^2\\theta}\\), \\(\\sin2\\theta=\\frac{2\\tan\\theta}{1+\\tan^2\\theta}\\).\n" +
        "- \\((\\sin\\theta\\pm\\cos\\theta)^2=1\\pm\\sin2\\theta\\).\n" +
        "- \\(\\cos\\theta+\\sqrt3\\sin\\theta=2\\cos(\\theta-60^\\circ)\\); \\(\\sqrt3\\cos\\theta+\\sin\\theta=2\\cos(\\theta-30^\\circ)\\).",
      formula: {
        label: "Double and triple angles",
        latex: "\\cos2\\theta=1-2\\sin^2\\theta,\\quad\\sin3\\theta=3\\sin\\theta-4\\sin^3\\theta,\\quad\\cos3\\theta=4\\cos^3\\theta-3\\cos\\theta",
      },
      authoredExample: {
        prompt: "\\(\\sin\\theta-\\cos\\theta=\\frac15\\). Find \\(\\sin2\\theta\\) and \\(\\cos4\\theta\\).",
        steps: [
          "Square: \\(1-\\sin2\\theta=\\frac{1}{25}\\), so \\(\\sin2\\theta=\\frac{24}{25}\\).",
          "\\(\\cos4\\theta=1-2\\sin^22\\theta=1-\\frac{1152}{625}\\).",
        ],
        answer: "\\(\\sin2\\theta=\\frac{24}{25}\\), \\(\\cos4\\theta=-\\frac{527}{625}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{\\sin3\\theta}{\\sin\\theta}-\\frac{\\cos3\\theta}{\\cos\\theta}\\).",
        steps: [
          "\\(\\frac{\\sin3\\theta}{\\sin\\theta}=3-4\\sin^2\\theta\\) and \\(\\frac{\\cos3\\theta}{\\cos\\theta}=4\\cos^2\\theta-3\\).",
          "Subtract: \\(6-4(\\sin^2\\theta+\\cos^2\\theta)\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos2\\theta\\) if \\(\\tan\\theta=\\frac12\\)?", answer: "\\(\\frac35\\)" },
        { prompt: "\\(4\\cos^320^\\circ-3\\cos20^\\circ\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\sqrt3\\cos20^\\circ+\\sin20^\\circ\\) as one ratio?", answer: "\\(2\\cos10^\\circ\\)" },
        { prompt: "\\(\\sin\\theta\\cos\\theta\\) if \\(\\sin\\theta+\\cos\\theta=\\frac43\\)?", answer: "\\(\\frac{7}{18}\\)" },
      ],
      pyqExampleId: "4796ad52-79b7-4c69-b9d5-d05fd0ee1aca", // 2026 — csc 10° − √3 sec 10° as one ratio over ½ sin 20°
      traps: [
        {
          title: "sin 3θ and cos 3θ have opposite sign patterns",
          body: "\\(\\sin3\\theta=3\\sin\\theta-4\\sin^3\\theta\\), but \\(\\cos3\\theta=4\\cos^3\\theta-3\\cos\\theta\\). Writing \\(3\\cos\\theta-4\\cos^3\\theta\\) gives \\(-\\cos3\\theta\\).",
        },
      ],
    },
  ],
};
