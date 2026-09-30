import type { SubtopicNote } from "@/app/notes/_types";

export const VALUES_ITF_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Values of Inverse Expressions",
  title: "Trigonometric Values of Inverse Expressions",
  oneLineDefinition:
    "Finding a sine, cosine or tangent of a sum or multiple of inverse functions by reading each angle off a right triangle and using the angle formulas.",
  whyItMatters:
    "Eleven PYQs, ten of them multiple choice, and two from 2026. Six evaluate a sum of inverse functions or a trigonometric ratio of one; five apply the double, half or triple angle formulas to an inverse. Two ideas cover the page.",
  concepts: [
    // C1 — right triangle and the sum formulas
    {
      kind: "formula" as const,
      slug: "jitf-triangle",
      name: "Reading ratios off a right triangle",
      intuition:
        "Each inverse function names an angle. For \\(A=\\tan^{-1}\\frac{8}{15}\\), draw a right triangle with opposite side 8 and adjacent side 15; the hypotenuse is 17, so \\(\\sin A=\\frac8{17}\\) and \\(\\cos A=\\frac{15}{17}\\). With every angle's sine and cosine known, the formulas for \\(\\sin(A\\pm B)\\) and \\(\\cos(A\\pm B)\\) finish the job.",
      definition:
        "- \\(\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B\\).\n" +
        "- \\(\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B\\).\n" +
        "- \\(\\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}\\).\n" +
        "- \\(\\cos^{-1}\\) of a negative number is obtuse: its sine is positive and its tangent negative.",
      formula: {
        label: "Sum formula",
        latex: "\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B",
      },
      authoredExample: {
        prompt: "Find \\(\\sin\\left(\\tan^{-1}\\frac{8}{15}+\\cos^{-1}\\frac{7}{25}\\right)\\).",
        steps: [
          "\\(A=\\tan^{-1}\\frac8{15}\\): \\(\\sin A=\\frac8{17}\\), \\(\\cos A=\\frac{15}{17}\\).",
          "\\(B=\\cos^{-1}\\frac7{25}\\): \\(\\cos B=\\frac7{25}\\), \\(\\sin B=\\frac{24}{25}\\).",
          "\\(\\sin(A+B)=\\frac{8\\cdot7+15\\cdot24}{17\\cdot25}=\\frac{416}{425}\\).",
        ],
        answer: "\\(\\frac{416}{425}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos\\left(\\cos^{-1}\\left(-\\frac{8}{17}\\right)+\\tan^{-1}\\frac{7}{24}\\right)\\).",
        steps: [
          "\\(A=\\cos^{-1}\\left(-\\frac8{17}\\right)\\) is obtuse: \\(\\cos A=-\\frac8{17}\\), \\(\\sin A=\\frac{15}{17}\\).",
          "\\(B=\\tan^{-1}\\frac7{24}\\): \\(\\sin B=\\frac7{25}\\), \\(\\cos B=\\frac{24}{25}\\).",
          "\\(\\cos(A+B)=\\frac{-8\\cdot24-15\\cdot7}{17\\cdot25}\\).",
        ],
        answer: "\\(-\\frac{297}{425}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos(\\tan^{-1}2)\\)?", answer: "\\(\\frac1{\\sqrt5}\\)" },
        { prompt: "\\(\\tan(\\sec^{-1}3)\\)?", answer: "\\(2\\sqrt2\\)" },
        { prompt: "\\(\\sin\\left(\\cos^{-1}\\left(-\\frac12\\right)\\right)\\)?", answer: "\\(\\frac{\\sqrt3}2\\)" },
        { prompt: "\\(\\tan\\left(\\cos^{-1}\\left(-\\frac13\\right)\\right)\\)?", answer: "\\(-2\\sqrt2\\)" },
      ],
      pyqExampleId: "fe678f76-d744-4274-95da-95c740f71b47", // 2025 — cosine of a sum of three inverse sines
      traps: [
        {
          title: "A triangle has no signs",
          body: "A right triangle gives only positive ratios. For \\(\\cos^{-1}\\) of a negative number the angle is in \\(\\left(\\frac\\pi2,\\pi\\right)\\), so its cosine and tangent are negative. For \\(\\sin^{-1}\\) or \\(\\tan^{-1}\\) of a negative number the angle is negative, so its sine and tangent are negative.",
        },
      ],
    },

    // C2 — double, half and triple angles
    {
      kind: "formula" as const,
      slug: "jitf-multiple",
      name: "Double, half and triple angles of an inverse",
      intuition:
        "If \\(A=\\tan^{-1}t\\), then \\(\\tan2A\\), \\(\\sin2A\\) and \\(\\cos2A\\) are all rational in \\(t\\). So a multiple of an inverse function becomes an ordinary number. Convert every inverse to a tangent first, apply the multiple-angle formula, then combine with the sum formula for tangents.",
      definition:
        "- With \\(t=\\tan A\\): \\(\\tan2A=\\frac{2t}{1-t^2}\\), \\(\\sin2A=\\frac{2t}{1+t^2}\\), \\(\\cos2A=\\frac{1-t^2}{1+t^2}\\).\n" +
        "- \\(\\tan3A=\\frac{3t-t^3}{1-3t^2}\\); \\(\\cos2A=1-2\\sin^2A\\).\n" +
        "- Half angle: \\(\\tan\\frac\\theta2=\\frac{\\sin\\theta}{1+\\cos\\theta}=\\frac{1-\\cos\\theta}{\\sin\\theta}\\).",
      formula: {
        label: "Double angle in terms of the tangent",
        latex: "\\tan2A=\\frac{2t}{1-t^2},\\quad \\sin2A=\\frac{2t}{1+t^2},\\quad \\cos2A=\\frac{1-t^2}{1+t^2}",
      },
      authoredExample: {
        prompt: "Find \\(\\tan\\left(2\\tan^{-1}\\frac12-\\tan^{-1}\\frac17\\right)\\).",
        steps: [
          "\\(\\tan\\left(2\\tan^{-1}\\frac12\\right)=\\frac{1}{1-\\frac14}=\\frac43\\).",
          "\\(\\tan(2A-B)=\\frac{\\frac43-\\frac17}{1+\\frac43\\cdot\\frac17}=\\frac{25/21}{25/21}\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan\\left(\\frac12\\cos^{-1}\\frac{7}{25}\\right)\\).",
        steps: [
          "\\(\\theta=\\cos^{-1}\\frac7{25}\\): \\(\\cos\\theta=\\frac7{25}\\), \\(\\sin\\theta=\\frac{24}{25}\\).",
          "\\(\\tan\\frac\\theta2=\\frac{\\sin\\theta}{1+\\cos\\theta}=\\frac{24/25}{32/25}\\).",
        ],
        answer: "\\(\\frac34\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos(2\\tan^{-1}2)\\)?", answer: "\\(-\\frac35\\)" },
        { prompt: "\\(\\cos\\left(2\\sin^{-1}\\frac13\\right)\\)?", answer: "\\(\\frac79\\)" },
        { prompt: "\\(\\tan\\left(3\\tan^{-1}\\frac13\\right)\\)?", answer: "\\(\\frac{13}9\\)" },
        { prompt: "\\(\\tan\\left(\\frac12\\tan^{-1}\\frac43\\right)\\)?", answer: "\\(\\frac12\\)" },
      ],
      pyqExampleId: "17193f68-3451-4e15-b7e4-8725ff0814fb", // 2026 — tangent of a difference of double angles
      traps: [
        {
          title: "Pick the half angle that fits the range",
          body: "Solving \\(\\tan\\theta=\\frac{2t}{1-t^2}\\) for \\(t=\\tan\\frac\\theta2\\) gives two roots. When \\(\\theta\\) is a principal value in \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\), \\(\\frac\\theta2\\) lies in \\(\\left(-\\frac\\pi4,\\frac\\pi4\\right)\\), so keep the root with \\(|t|<1\\).",
        },
      ],
    },
  ],
};
