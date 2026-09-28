import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound and Multiple Angles",
  title: "Compound & Multiple Angles",
  oneLineDefinition:
    "The addition formulas for sin(A ± B), cos(A ± B) and tan(A ± B), and the double-angle forms that follow from them.",
  whyItMatters:
    "Only eight PYQs, because CDS keeps compound angles light: recognise an expansion and collapse it to a standard angle, or use 2 sin θ cos θ = sin 2θ. They are worth knowing mainly because the maximum-and-minimum page leans on sin 2θ.",
  concepts: [
    // C1 — addition formulas
    {
      kind: "formula" as const,
      slug: "cdstr-addition-formulas",
      name: "The addition formulas",
      intuition:
        "The paper uses these backwards far more than forwards: it prints \\(\\sin 46^\\circ\\cos 44^\\circ + \\cos 46^\\circ\\sin 44^\\circ\\) and expects you to see \\(\\sin 90^\\circ\\). Recognising the pattern is the whole skill.",
      definition:
        "- \\(\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\)\n" +
        "- \\(\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B\\) (note the sign flips)\n" +
        "- \\(\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}\\)\n" +
        "When a stem supplies \\(\\tan(\\alpha + \\beta)\\) and \\(\\tan(\\alpha - \\beta)\\) as standard values, find \\(\\alpha + \\beta\\) and \\(\\alpha - \\beta\\) first and solve for the angles.",
      formula: {
        label: "Addition formulas",
        latex: "\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B, \\quad \\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\cos 70^\\circ\\cos 10^\\circ + \\sin 70^\\circ\\sin 10^\\circ\\).",
        steps: [
          "The pattern \\(\\cos A\\cos B + \\sin A\\sin B\\) is \\(\\cos(A - B)\\).",
          "\\(\\cos(70^\\circ - 10^\\circ) = \\cos 60^\\circ\\).",
        ],
        answer: "\\(\\dfrac12\\).",
      },
      selfCheckExample: {
        prompt: "In a right triangle \\(ABC\\) with \\(\\angle B = 90^\\circ\\), \\(AB = 12\\) and \\(P\\) the midpoint of \\(BC\\) with \\(\\angle BAP = 45^\\circ\\), find \\(\\tan\\angle PAC\\).",
        steps: [
          "\\(\\tan 45^\\circ = \\dfrac{BP}{AB}\\), so \\(BP = 12\\) and \\(BC = 24\\).",
          "\\(\\tan\\angle BAC = \\dfrac{24}{12} = 2\\), and \\(\\angle BAC = 45^\\circ + \\angle PAC\\).",
          "With \\(t = \\tan\\angle PAC\\): \\(\\dfrac{1 + t}{1 - t} = 2\\), so \\(t = \\dfrac13\\).",
        ],
        answer: "\\(\\dfrac13\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin 50^\\circ\\cos 40^\\circ + \\cos 50^\\circ\\sin 40^\\circ\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\tan 75^\\circ\\) from \\(\\tan(45^\\circ + 30^\\circ)\\)?", answer: "\\(2 + \\sqrt3\\)" },
        { prompt: "\\(\\cos 15^\\circ\\)?", answer: "\\(\\dfrac{\\sqrt3 + 1}{2\\sqrt2}\\)" },
        { prompt: "If \\(\\cos(\\alpha - \\beta) = 1\\) with \\(\\alpha, \\beta\\) in \\([0^\\circ, 90^\\circ]\\), then?", answer: "\\(\\alpha = \\beta\\)" },
      ],
      pyqExampleId: "e9ffcc8d-a317-4a0c-b74d-957ad32dd071", // 2019 (II) — sin 46° cos 44° + cos 46° sin 44°
      traps: [
        {
          title: "cos(A + B) has a minus sign",
          body:
            "\\(\\cos(A + B) = \\cos A\\cos B - \\sin A\\sin B\\). The sign in the cosine formula is the opposite of the sign inside the bracket, and writing it with a plus reproduces \\(\\cos(A - B)\\) instead.",
        },
      ],
    },

    // C2 — double angle
    {
      kind: "formula" as const,
      slug: "cdstr-double-angle",
      name: "Double-angle forms",
      intuition:
        "Put \\(B = A\\) into the addition formulas and you get the double-angle forms. Their main use in CDS is recognition: \\(2\\sin\\theta\\cos\\theta\\) is \\(\\sin 2\\theta\\), \\(1 - 2\\sin^2\\theta\\) is \\(\\cos 2\\theta\\), and a fraction \\(\\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}\\) is \\(\\tan 2\\theta\\).",
      definition:
        "- \\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\)\n" +
        "- \\(\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta = 2\\cos^2\\theta - 1\\)\n" +
        "- \\(\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}\\)\n" +
        "A fraction like \\(\\dfrac{\\sin\\theta - 2\\sin^3\\theta}{2\\cos^3\\theta - \\cos\\theta}\\) factors to \\(\\dfrac{\\sin\\theta\\cos 2\\theta}{\\cos\\theta\\cos 2\\theta} = \\tan\\theta\\).",
      formula: {
        label: "Double-angle forms",
        latex: "\\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\quad \\cos 2\\theta = 1 - 2\\sin^2\\theta, \\quad \\tan 2\\theta = \\frac{2\\tan\\theta}{1 - \\tan^2\\theta}",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\theta = 3\\) with \\(\\theta\\) acute, find \\(\\tan 2\\theta\\).",
        steps: [
          "\\(\\tan 2\\theta = \\dfrac{2 \\cdot 3}{1 - 9} = \\dfrac{6}{-8}\\).",
          "So \\(\\tan 2\\theta = -\\dfrac34\\): negative because \\(2\\theta\\) is past \\(90^\\circ\\).",
        ],
        answer: "\\(-\\dfrac34\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin 2\\theta\\) if \\(\\sin\\theta = \\dfrac{5}{13}\\) with \\(\\theta\\) acute.",
        steps: [
          "\\(\\cos\\theta = \\dfrac{12}{13}\\).",
          "\\(\\sin 2\\theta = 2 \\cdot \\dfrac{5}{13} \\cdot \\dfrac{12}{13} = \\dfrac{120}{169}\\).",
        ],
        answer: "\\(\\dfrac{120}{169}\\).",
      },
      practiceSet: [
        { prompt: "\\(2\\sin 15^\\circ\\cos 15^\\circ\\)?", answer: "\\(\\dfrac12\\)" },
        { prompt: "\\(1 - 2\\sin^2 22.5^\\circ\\)?", answer: "\\(\\dfrac{1}{\\sqrt2}\\)" },
        { prompt: "\\(\\cos^2 30^\\circ - \\sin^2 30^\\circ\\)?", answer: "\\(\\dfrac12\\)" },
        { prompt: "If \\(\\tan x = 1\\), then \\(2\\sin x\\cos x\\) for acute \\(x\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "d4b13cbd-8fdd-488c-a255-37bb18cd06f5", // 2018 (II) — cos θ = 1/√5, find 2tan θ/(1 − tan²θ)
      traps: [
        {
          title: "tan 2θ can be negative for an acute θ",
          body:
            "If \\(\\theta\\) is above \\(45^\\circ\\), then \\(2\\theta\\) is above \\(90^\\circ\\) and \\(\\tan 2\\theta < 0\\). A positive option with the right size is the planted answer.",
        },
      ],
    },
  ],
};
