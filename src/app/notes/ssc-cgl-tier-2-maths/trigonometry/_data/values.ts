import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TG_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Standard Values and Simple Equations",
  title: "Standard Values and Simple Equations",
  oneLineDefinition:
    "Five angles carry nearly every exact value SSC asks for: learn the sine row and build the rest from it, then spot the standard angle hiding inside an equation.",
  whyItMatters:
    "8 questions in the Tier II bank, 7 EASY and 1 MODERATE. They test the table of values directly, or hide a standard angle inside an equation you solve first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tgva-table",
      name: "The standard values",
      intuition:
        "Five angles, 0°, 30°, 45°, 60° and 90°, carry almost every exact value in this chapter. Learn the sine row and the rest follows: cosine is the same row read backwards, and tangent is sine divided by cosine.",
      definition:
        "- \\(\\sin\\) at 0°, 30°, 45°, 60°, 90° is \\(\\frac{\\sqrt{0}}{2}, \\frac{\\sqrt{1}}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, \\frac{\\sqrt{4}}{2}\\), that is \\(0, \\frac{1}{2}, \\frac{1}{\\sqrt{2}}, \\frac{\\sqrt{3}}{2}, 1\\).\n" +
        "- \\(\\cos\\) is the same row backwards. \\(\\tan = \\frac{\\sin}{\\cos}\\): \\(0, \\frac{1}{\\sqrt{3}}, 1, \\sqrt{3}\\), and none at 90°.\n" +
        "- \\(\\sec\\), \\(\\text{cosec}\\) and \\(\\cot\\) are the reciprocals of \\(\\cos\\), \\(\\sin\\) and \\(\\tan\\).\n" +
        "- \\(\\sin(A + B) = \\sin A\\cos B + \\cos A\\sin B\\) and \\(\\cos(A + B) = \\cos A\\cos B - \\sin A\\sin B\\); when \\(A + B = 90^\\circ\\) they are 1 and 0.\n" +
        "- Square the value, not the angle: \\(\\sin^2 60^\\circ = \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}\\).",
      formula: {
        label: "The sine row",
        latex: "\\sin 0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ = 0, \\tfrac{1}{2}, \\tfrac{1}{\\sqrt{2}}, \\tfrac{\\sqrt{3}}{2}, 1",
      },
      authoredExample: {
        prompt: "Find the value of \\(4\\cos^2 30^\\circ + 2\\sec^2 45^\\circ - 3\\tan^2 60^\\circ\\).",
        steps: [
          "\\(4 \\times \\frac{3}{4} = 3\\); \\(2 \\times 2 = 4\\); \\(3 \\times 3 = 9\\).",
          "\\(3 + 4 - 9 = -2\\).",
        ],
        answer: "\\(-2\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\left(\\sin^2 45^\\circ + \\cos^2 60^\\circ\\right) \\div \\cot^2 30^\\circ\\).",
        steps: ["\\(\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}\\), and \\(\\cot^2 30^\\circ = 3\\).", "\\(\\frac{3}{4} \\div 3 = \\frac{1}{4}\\)."],
        answer: "\\(\\frac{1}{4}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(2\\sin 30^\\circ + 3\\tan 45^\\circ\\).", answer: "4" },
        { prompt: "Find \\(\\text{cosec}^2 60^\\circ + \\cot^2 45^\\circ\\).", answer: "\\(\\frac{7}{3}\\)" },
        { prompt: "Find \\(\\sin 45^\\circ\\cos 45^\\circ + \\sin 30^\\circ\\cos 60^\\circ\\).", answer: "\\(\\frac{3}{4}\\)" },
      ],
      pyqExampleId: "41900a3b-2bfc-482b-99e3-53d35fff9d9e",
      traps: [
        {
          title: "Forgetting to square the value",
          body: "\\(\\sin^2 45^\\circ\\) is \\(\\left(\\frac{1}{\\sqrt{2}}\\right)^2 = \\frac{1}{2}\\), not \\(\\frac{1}{\\sqrt{2}}\\). The square applies to the value of the ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgva-equations",
      name: "Equations that land on a standard angle",
      intuition:
        "Many stems hide the angle inside an equation. Divide out a common sine, or factor a quadratic in one ratio, and the answer is a standard value; after that the question is just the table.",
      definition:
        "- '\\(a\\tan\\theta = b\\sin\\theta\\)' with \\(0^\\circ < \\theta < 90^\\circ\\): divide by \\(\\sin\\theta\\) (it is not 0) to get \\(\\cos\\theta = \\frac{a}{b}\\).\n" +
        "- \\(\\tan(A + B) = \\sqrt{3}\\) and \\(\\tan(A - B) = \\frac{1}{\\sqrt{3}}\\) give \\(A + B = 60^\\circ\\) and \\(A - B = 30^\\circ\\): add and halve.\n" +
        "- A quadratic like \\(2\\sin^2\\theta - 3\\sin\\theta + 1 = 0\\) factorises. Keep only the roots that lie in the allowed range and do not make any denominator in the stem zero.\n" +
        "- Once \\(\\theta\\) is known, put \\(2\\theta\\) or \\(\\frac{\\theta}{2}\\) straight into the table.",
      formula: {
        label: "Dividing out the sine",
        latex: "a\\tan\\theta = b\\sin\\theta \\;\\Rightarrow\\; \\cos\\theta = \\frac{a}{b}",
      },
      authoredExample: {
        prompt: "If \\(2\\tan\\theta = 4\\sin\\theta\\), \\(0^\\circ < \\theta < 90^\\circ\\), find \\(\\cos^2\\theta + \\tan^2\\theta\\).",
        steps: [
          "Divide by \\(\\sin\\theta\\): \\(\\frac{2}{\\cos\\theta} = 4\\), so \\(\\cos\\theta = \\frac{1}{2}\\) and \\(\\theta = 60^\\circ\\).",
          "\\(\\cos^2 60^\\circ + \\tan^2 60^\\circ = \\frac{1}{4} + 3 = \\frac{13}{4}\\).",
        ],
        answer: "\\(\\frac{13}{4}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin(A + B) = 1\\) and \\(\\cos(A - B) = \\frac{\\sqrt{3}}{2}\\), with \\(A > B\\), find A and B.",
        steps: ["\\(A + B = 90^\\circ\\) and \\(A - B = 30^\\circ\\).", "Adding: \\(2A = 120^\\circ\\), so \\(A = 60^\\circ\\) and \\(B = 30^\\circ\\)."],
        answer: "\\(60^\\circ\\) and \\(30^\\circ\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sqrt{2}\\sin\\theta = 1\\), \\(0^\\circ < \\theta < 90^\\circ\\), find \\(\\theta\\).", answer: "\\(45^\\circ\\)" },
        { prompt: "If \\(2\\sin^2\\theta - 3\\sin\\theta + 1 = 0\\) and \\(0^\\circ < \\theta < 90^\\circ\\), find \\(\\theta\\).", answer: "\\(30^\\circ\\)", method: "\\(\\sin\\theta = \\frac{1}{2}\\) or 1, and 1 gives \\(90^\\circ\\), outside the range." },
        { prompt: "If \\(\\tan 2\\theta = \\sqrt{3}\\) and \\(2\\theta\\) is acute, find \\(\\sin\\theta\\).", answer: "\\(\\frac{1}{2}\\)" },
      ],
      pyqExampleId: "43f3b2bf-62f2-4e26-8116-8d145f01b1de",
      traps: [
        {
          title: "Keeping a root that breaks the stem",
          body: "A root such as \\(\\cos\\theta = 1\\) may solve the quadratic but make a denominator in the original stem zero, or fall outside the stated range. Check each root before you use it.",
        },
      ],
    },
  ],
};
