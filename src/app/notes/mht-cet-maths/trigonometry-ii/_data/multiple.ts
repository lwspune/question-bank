import type { SubtopicNote } from "@/app/notes/_types";

export const MULTIPLE_NOTE: SubtopicNote = {
  subtopicName: "Multiple and Sub-multiple Angles",
  title: "Double, Triple and Half Angles",
  oneLineDefinition:
    "The formulas for 2A, 3A and A/2, the sign of a half angle read from its own quadrant, and the standard values at π/8, 18° and 36° that most of the HARD questions reduce to.",
  whyItMatters:
    "13 PYQs, nine HARD — the hardest page in the chapter. Eight use the double- and half-angle formulas: tan(π/8), a half angle with its sign, sin(x/4) from sec x + tan x, cos 2θ from three sines in H.P. " +
    "Five are evaluations at π/8, 10° or 20°, done with the triple-angle formulas and angle pairing. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cett2-double-half",
      name: "Double and Half Angles, and the Sign of a Half Angle",
      intuition:
        "Put B = A in the compound formulas and you get the double angles. cos 2A has three forms; pick the one that cancels what the question already has. Read backwards, the same forms give the half angle: cos²(x/2) = (1 + cos x)/2. The square root leaves a sign to choose, and it comes from where x/2 lies, not where x lies.",
      definition:
        "- \\(\\sin 2A = 2\\sin A\\cos A = \\dfrac{2\\tan A}{1 + \\tan^2 A}\\).\n" +
        "- \\(\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A = \\dfrac{1 - \\tan^2 A}{1 + \\tan^2 A}\\).\n" +
        "- \\(\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}\\).\n" +
        "- Half angles: \\(\\cos\\frac{x}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos x}{2}}\\), \\(\\sin\\frac{x}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos x}{2}}\\), \\(\\tan\\frac{x}{2} = \\dfrac{1 - \\cos x}{\\sin x}\\).\n" +
        "- **The sign**: if \\(\\pi < x < \\frac{3\\pi}{2}\\), then \\(\\frac{\\pi}{2} < \\frac{x}{2} < \\frac{3\\pi}{4}\\), the second quadrant, where cosine is negative.\n" +
        "- \\(\\tan\\frac{\\pi}{8} = \\sqrt2 - 1\\), from \\(\\dfrac{1 - \\cos\\frac{\\pi}{4}}{\\sin\\frac{\\pi}{4}}\\).",
      formula: {
        label: "Double and half angles",
        latex:
          "\\cos 2A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A \\qquad \\cos\\frac{x}{2}=\\pm\\sqrt{\\frac{1+\\cos x}{2}} \\qquad \\tan\\frac{x}{2}=\\frac{1-\\cos x}{\\sin x}",
      },
      authoredExample: {
        prompt: "If \\(\\cos x = -\\frac{7}{25}\\) and \\(\\pi < x < \\frac{3\\pi}{2}\\), find \\(\\sin\\frac{x}{2}\\).",
        steps: [
          "\\(\\sin^2\\frac{x}{2} = \\dfrac{1 - \\cos x}{2} = \\dfrac{32/25}{2} = \\dfrac{16}{25}\\).",
          "\\(\\frac{x}{2}\\) lies between \\(\\frac{\\pi}{2}\\) and \\(\\frac{3\\pi}{4}\\), where sine is positive.",
        ],
        answer: "\\(\\dfrac{4}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan\\frac{\\pi}{12}\\).",
        steps: [
          "\\(\\tan\\frac{\\pi}{12} = \\dfrac{1 - \\cos\\frac{\\pi}{6}}{\\sin\\frac{\\pi}{6}} = \\dfrac{1 - \\frac{\\sqrt3}{2}}{\\frac12}\\).",
        ],
        answer: "\\(2 - \\sqrt3\\)",
      },
      practiceSet: [
        { prompt: "\\(\\tan A = \\frac13\\). Find \\(\\cos 2A\\).", answer: "\\(\\frac45\\)", method: "\\((1 - \\frac19)/(1 + \\frac19)\\)." },
        { prompt: "\\(\\cos x = \\frac{1}{9}\\), x acute. Find \\(\\cos\\frac{x}{2}\\).", answer: "\\(\\frac{\\sqrt5}{3}\\)" },
        { prompt: "Maximum of \\(\\sin A\\cos A\\)?", answer: "\\(\\frac12\\)", method: "It is \\(\\frac12\\sin 2A\\)." },
      ],
      pyqExampleId: "e651ae89-e10a-4b60-adc2-3f0bcc9657c9",
      traps: [
        {
          title: "Taking the sign from the quadrant of x",
          body: "With x in the third quadrant, cos x is negative, but x/2 is in the second quadrant and so is cos(x/2) — negative too. With x in the fourth, x/2 is in the second again. Always halve the interval first.",
        },
        {
          title: "Using the wrong form of cos 2A",
          body: "2cos²A − 1 and 1 − 2sin²A are both right; the choice decides whether the question collapses. For cos 2θ from sin²θ, use 1 − 2sin²θ.",
        },
        {
          title: "The negative root of tan(π/8)",
          body: "tan(π/8) solves t² + 2t − 1 = 0, whose roots are √2 − 1 and −1 − √2. π/8 is acute, so only the positive root is right; the other is an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cett2-triple-standard",
      name: "Triple Angles, Standard Values and Pairing",
      intuition:
        "Most HARD evaluations here are not algebra. They pair angles that add to 90° or 180°, use a triple-angle formula at an angle whose triple is standard (10° to 30°, 20° to 60°), or use a product that collapses to a triple angle. Learn the values and look for the pairing before expanding anything.",
      definition:
        "- \\(\\sin 3A = 3\\sin A - 4\\sin^3 A\\), \\(\\cos 3A = 4\\cos^3 A - 3\\cos A\\), \\(\\tan 3A = \\dfrac{3\\tan A - \\tan^3 A}{1 - 3\\tan^2 A}\\).\n" +
        "- \\(\\tan\\theta\\tan(60^\\circ - \\theta)\\tan(60^\\circ + \\theta) = \\tan 3\\theta\\): so \\(\\tan 20^\\circ\\tan 40^\\circ\\tan 80^\\circ = \\sqrt3\\).\n" +
        "- \\(\\sin 18^\\circ = \\dfrac{\\sqrt5 - 1}{4}\\), \\(\\cos 36^\\circ = \\dfrac{\\sqrt5 + 1}{4}\\).\n" +
        "- Pairing: \\(\\cos\\frac{5\\pi}{8} = -\\cos\\frac{3\\pi}{8}\\), \\(\\cos\\frac{7\\pi}{8} = -\\cos\\frac{\\pi}{8}\\), and \\(\\cos\\frac{3\\pi}{8} = \\sin\\frac{\\pi}{8}\\).\n" +
        "- Squaring a triple-angle identity at a known angle gives a polynomial identity: at \\(\\theta = 10^\\circ\\), \\(3\\tan^6\\theta - 27\\tan^4\\theta + 33\\tan^2\\theta = 1\\).",
      formula: {
        label: "Triple angles",
        latex:
          "\\sin 3A = 3\\sin A - 4\\sin^3 A \\qquad \\cos 3A = 4\\cos^3 A - 3\\cos A \\qquad \\tan 3A=\\frac{3\\tan A-\\tan^3 A}{1-3\\tan^2 A}",
      },
      authoredExample: {
        prompt: "Find \\(\\sin^4\\frac{\\pi}{8} + \\sin^4\\frac{3\\pi}{8} + \\sin^4\\frac{5\\pi}{8} + \\sin^4\\frac{7\\pi}{8}\\).",
        steps: [
          "Pair: \\(\\sin\\frac{7\\pi}{8} = \\sin\\frac{\\pi}{8}\\) and \\(\\sin\\frac{5\\pi}{8} = \\sin\\frac{3\\pi}{8} = \\cos\\frac{\\pi}{8}\\).",
          "The sum is \\(2\\left(\\sin^4\\frac{\\pi}{8} + \\cos^4\\frac{\\pi}{8}\\right) = 2\\left(1 - \\frac12\\sin^2\\frac{\\pi}{4}\\right) = 2 \\cdot \\frac34\\).",
        ],
        answer: "\\(\\dfrac32\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin 20^\\circ\\sin 40^\\circ\\sin 80^\\circ\\).",
        steps: [
          "\\(\\sin\\theta\\sin(60^\\circ - \\theta)\\sin(60^\\circ + \\theta) = \\frac14\\sin 3\\theta\\), with \\(\\theta = 20^\\circ\\).",
          "\\(\\frac14\\sin 60^\\circ\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt3}{8}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cos 36^\\circ\\)?", answer: "\\(\\frac{\\sqrt5 + 1}{4}\\)" },
        { prompt: "\\(\\tan 10^\\circ\\tan 50^\\circ\\tan 70^\\circ\\)?", answer: "\\(\\frac{1}{\\sqrt3}\\)", method: "\\(\\tan 3\\theta\\) with \\(\\theta = 10^\\circ\\)." },
        { prompt: "\\(\\sin\\frac{\\pi}{8}\\cos\\frac{\\pi}{8}\\)?", answer: "\\(\\frac{1}{2\\sqrt2}\\)" },
      ],
      pyqExampleId: "1b756542-5ccf-4f86-bf9d-86b4fe2d2cca",
      traps: [
        {
          title: "Multiplying out four brackets",
          body: "(1 + cos π/8)(1 + cos 3π/8)(1 + cos 5π/8)(1 + cos 7π/8) pairs into (1 − cos²π/8)(1 − cos²3π/8) = sin²(π/8) cos²(π/8) = 1/8. Expanding all four brackets is slow and error-prone.",
        },
        {
          title: "Mixing up sin 18° and cos 36°",
          body: "sin 18° = (√5 − 1)/4 and cos 36° = (√5 + 1)/4. They differ only in one sign, and both are printed as options.",
        },
      ],
    },
  ],
  related: [
    { label: "Compound Angles and Conditional Identities", href: "/notes/mht-cet-maths/trigonometry-ii/cett2-compound" },
    { label: "Sum-to-Product and Product Formulas", href: "/notes/mht-cet-maths/trigonometry-ii/cett2-factorisation" },
  ],
};
