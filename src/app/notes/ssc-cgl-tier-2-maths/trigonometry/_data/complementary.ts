import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TG_COMPLEMENTARY_NOTE: SubtopicNote = {
  subtopicName: "Complementary and Allied Angles",
  title: "Complementary and Allied Angles",
  oneLineDefinition:
    "Angles that add to 90 degrees swap sine for cosine, tangent for cotangent and secant for cosecant, so a stem full of odd angles pairs up and cancels; angles past 90 degrees are read from 180 degrees with a sign.",
  whyItMatters:
    "12 questions in the Tier II bank, 9 EASY and 3 MODERATE. The MODERATE ones are long fractions of odd angles that pair up and shrink to a small whole number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tgco-pairs",
      name: "Complementary pairs",
      visualizationSlug: "cds-trig-right-triangle",
      intuition:
        "Two angles that add to 90° swap their co-functions: the sine of one is the cosine of the other, the tangent of one is the cotangent of the other. A stem full of angles like 23° and 67° is asking you to pair them up.",
      definition:
        "- \\(\\sin(90^\\circ - \\theta) = \\cos\\theta\\), \\(\\tan(90^\\circ - \\theta) = \\cot\\theta\\), \\(\\sec(90^\\circ - \\theta) = \\text{cosec}\\,\\theta\\), and the other way round.\n" +
        "- So \\(\\tan\\theta\\tan(90^\\circ - \\theta) = 1\\) and \\(\\sin^2\\theta + \\sin^2(90^\\circ - \\theta) = 1\\).\n" +
        "- After pairing, finish with \\(\\sec^2 - \\tan^2 = 1\\) or \\(\\text{cosec}^2 - \\cot^2 = 1\\).\n" +
        "- With a letter in the angle: \\(\\cot(22^\\circ - \\theta) = \\tan(68^\\circ + \\theta)\\), because the two angles still add to 90°.",
      formula: {
        label: "Co-functions",
        latex: "\\sin(90^\\circ - \\theta) = \\cos\\theta, \\quad \\tan(90^\\circ - \\theta) = \\cot\\theta, \\quad \\sec(90^\\circ - \\theta) = \\text{cosec}\\,\\theta",
      },
      authoredExample: {
        prompt: "Find \\(\\frac{\\sin 35^\\circ}{\\cos 55^\\circ} + \\tan 20^\\circ\\tan 70^\\circ - \\left(\\sec^2 33^\\circ - \\cot^2 57^\\circ\\right)\\).",
        steps: [
          "\\(\\cos 55^\\circ = \\sin 35^\\circ\\), so the first term is 1; \\(\\tan 70^\\circ = \\cot 20^\\circ\\), so the second is 1.",
          "\\(\\cot 57^\\circ = \\tan 33^\\circ\\), so the bracket is \\(\\sec^2 33^\\circ - \\tan^2 33^\\circ = 1\\).",
          "Value \\(= 1 + 1 - 1 = 1\\).",
        ],
        answer: "1",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos^2 17^\\circ + \\cos^2 73^\\circ + 2\\tan 40^\\circ\\tan 50^\\circ\\).",
        steps: ["\\(\\cos 73^\\circ = \\sin 17^\\circ\\), so the first two terms make 1.", "\\(\\tan 50^\\circ = \\cot 40^\\circ\\), so the last term is 2. Total 3."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Find \\(\\frac{\\sin 64^\\circ}{\\cos 26^\\circ}\\).", answer: "1" },
        { prompt: "Find \\(\\text{cosec}^2 58^\\circ - \\tan^2 32^\\circ\\).", answer: "1", method: "\\(\\text{cosec}\\,58^\\circ = \\sec 32^\\circ\\)" },
        { prompt: "Find \\(\\tan 5^\\circ\\tan 25^\\circ\\tan 45^\\circ\\tan 65^\\circ\\tan 85^\\circ\\).", answer: "1" },
      ],
      pyqExampleId: "1f24cbe5-010a-4c9a-a7df-7c6861bb7899",
      traps: [
        {
          title: "Pairing angles that do not add to 90 degrees",
          body: "\\(\\sin 25^\\circ\\) equals \\(\\cos 65^\\circ\\), not \\(\\cos 75^\\circ\\). Check that each pair really sums to 90° before you swap.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgco-find",
      name: "Finding an angle from a complementary pair",
      intuition:
        "A stem that sets sin X equal to cos Y, with both angles acute, is telling you that X and Y make 90° together. Write that sum as an equation and the unknown drops out.",
      definition:
        "- \\(\\sin X = \\cos Y\\) with both acute means \\(X + Y = 90^\\circ\\). The same holds for \\(\\tan X = \\cot Y\\) and \\(\\sec X = \\text{cosec}\\,Y\\).\n" +
        "- \\(\\tan X\\tan Y = 1\\) with both acute also means \\(X + Y = 90^\\circ\\).\n" +
        "- Solve the linear equation, then check that both angles really are acute.",
      formula: {
        label: "From a co-function to a sum",
        latex: "\\sin X = \\cos Y \\;\\Rightarrow\\; X + Y = 90^\\circ",
      },
      authoredExample: {
        prompt: "If \\(\\tan 2A = \\cot(A - 15^\\circ)\\), where \\(2A\\) is acute, find A.",
        steps: ["\\(2A + (A - 15^\\circ) = 90^\\circ\\), so \\(3A = 105^\\circ\\) and \\(A = 35^\\circ\\).", "Check: the angles are \\(70^\\circ\\) and \\(20^\\circ\\), both acute."],
        answer: "\\(35^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sec 4\\theta = \\text{cosec}(\\theta + 20^\\circ)\\), where \\(4\\theta\\) is acute, find \\(\\theta\\).",
        steps: ["\\(4\\theta + \\theta + 20^\\circ = 90^\\circ\\).", "\\(5\\theta = 70^\\circ\\), so \\(\\theta = 14^\\circ\\)."],
        answer: "\\(14^\\circ\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sin 5x = \\cos 4x\\) and both angles are acute, find \\(x\\).", answer: "\\(10^\\circ\\)" },
        { prompt: "If \\(\\tan(x + 25^\\circ)\\tan(x - 5^\\circ) = 1\\) with both angles acute, find \\(x\\).", answer: "\\(35^\\circ\\)" },
        { prompt: "If \\(\\cos 3y = \\sin(y + 10^\\circ)\\) with both angles acute, find \\(\\tan(2y + 5^\\circ)\\).", answer: "1", method: "\\(y = 20^\\circ\\)" },
      ],
      pyqExampleId: "53f95171-5bcc-4699-89cd-6fac230f3ec2",
      traps: [
        {
          title: "Setting the two angles equal",
          body: "\\(\\sin X = \\cos Y\\) makes \\(X + Y = 90^\\circ\\), not \\(X = Y\\). Equal angles come from equal ratios of the SAME kind.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgco-allied",
      name: "Angles larger than 90 degrees",
      intuition:
        "An angle such as 120° or 150° is read from 180°. Its ratios are the ratios of the gap to 180°, with a minus sign on cosine and tangent because the angle has crossed past 90°.",
      definition:
        "- For \\(90^\\circ < \\theta < 180^\\circ\\): \\(\\sin\\theta = \\sin(180^\\circ - \\theta)\\) stays positive.\n" +
        "- \\(\\cos\\theta = -\\cos(180^\\circ - \\theta)\\) and \\(\\tan\\theta = -\\tan(180^\\circ - \\theta)\\) are negative.\n" +
        "- So \\(\\sin 150^\\circ = \\frac{1}{2}\\), \\(\\cos 120^\\circ = -\\frac{1}{2}\\), \\(\\tan 135^\\circ = -1\\).\n" +
        "- Also \\(\\sin(90^\\circ + \\theta) = \\cos\\theta\\) and \\(\\cos(90^\\circ + \\theta) = -\\sin\\theta\\).",
      formula: {
        label: "Angles measured from 180 degrees",
        latex: "\\sin(180^\\circ - \\theta) = \\sin\\theta, \\quad \\cos(180^\\circ - \\theta) = -\\cos\\theta, \\quad \\tan(180^\\circ - \\theta) = -\\tan\\theta",
      },
      authoredExample: {
        prompt: "Find \\(\\sin 135^\\circ + \\cos 150^\\circ\\).",
        steps: ["\\(\\sin 135^\\circ = \\sin 45^\\circ = \\frac{\\sqrt{2}}{2}\\).", "\\(\\cos 150^\\circ = -\\cos 30^\\circ = -\\frac{\\sqrt{3}}{2}\\).", "Sum \\(= \\frac{\\sqrt{2} - \\sqrt{3}}{2}\\)."],
        answer: "\\(\\frac{\\sqrt{2} - \\sqrt{3}}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan 120^\\circ \\times \\cos 135^\\circ\\).",
        steps: ["\\(\\tan 120^\\circ = -\\sqrt{3}\\) and \\(\\cos 135^\\circ = -\\frac{1}{\\sqrt{2}}\\).", "Product \\(= \\frac{\\sqrt{3}}{\\sqrt{2}} = \\frac{\\sqrt{6}}{2}\\)."],
        answer: "\\(\\frac{\\sqrt{6}}{2}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\cos 150^\\circ\\).", answer: "\\(-\\frac{\\sqrt{3}}{2}\\)" },
        { prompt: "Find \\(\\sin 120^\\circ\\).", answer: "\\(\\frac{\\sqrt{3}}{2}\\)" },
        { prompt: "Find \\(\\tan 150^\\circ\\).", answer: "\\(-\\frac{1}{\\sqrt{3}}\\)" },
      ],
      pyqExampleId: "675bb102-bf26-4bfc-8f06-27c39ec33686",
      traps: [
        {
          title: "Dropping the minus sign",
          body: "Between 90° and 180°, cosine and tangent are negative. \\(\\cos 120^\\circ\\) is \\(-\\frac{1}{2}\\), not \\(\\frac{1}{2}\\).",
        },
      ],
    },
  ],
};
