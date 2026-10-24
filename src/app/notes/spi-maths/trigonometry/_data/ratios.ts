import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TG_RATIOS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Ratios of an Acute Angle",
  title: "Trigonometric Ratios of an Acute Angle",
  oneLineDefinition:
    "In a right triangle, each trigonometric ratio of an acute angle is one side divided by another, named by where the sides sit relative to that angle.",
  whyItMatters:
    "Six questions in the bank, five EASY and one MODERATE: name the ratio, find every ratio from one given ratio, or turn a fraction of sines and cosines into tangents. Every later page in this chapter is built on these six ratios.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitgra-six",
      name: "The six ratios of a right triangle",
      intuition:
        "Stand at the acute angle you care about. The longest side, across from the right angle, is the **hypotenuse**. The side across from your angle is the **opposite** side, and the third side, touching your angle, is the **adjacent** side. Each ratio is one of these sides over another.",
      definition:
        "For an acute angle \\(A\\) of a right triangle:\n" +
        "- \\(\\sin A = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos A = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan A = \\dfrac{\\text{opposite}}{\\text{adjacent}}\\).\n" +
        "- The other three are their **reciprocals**: \\(\\operatorname{cosec} A = \\dfrac{1}{\\sin A}\\), \\(\\sec A = \\dfrac{1}{\\cos A}\\), \\(\\cot A = \\dfrac{1}{\\tan A}\\).\n" +
        "- A missing side comes from **Pythagoras**: \\(\\text{hypotenuse}^2 = \\text{opposite}^2 + \\text{adjacent}^2\\).\n" +
        "- The ratios depend only on the angle, not on how big the triangle is.",
      formula: {
        label: "The six trigonometric ratios",
        latex:
          "\\sin A = \\frac{\\text{opp}}{\\text{hyp}},\\ \\cos A = \\frac{\\text{adj}}{\\text{hyp}},\\ \\tan A = \\frac{\\text{opp}}{\\text{adj}},\\ \\operatorname{cosec} A = \\frac{\\text{hyp}}{\\text{opp}},\\ \\sec A = \\frac{\\text{hyp}}{\\text{adj}},\\ \\cot A = \\frac{\\text{adj}}{\\text{opp}}",
        symbols: [
          { symbol: "opp", meaning: "the side opposite the angle" },
          { symbol: "adj", meaning: "the side next to the angle (not the hypotenuse)" },
          { symbol: "hyp", meaning: "the hypotenuse, across from the right angle" },
        ],
      },
      authoredExample: {
        prompt: "Triangle ABC has a right angle at B, with AB = 5 cm and BC = 12 cm. Find \\(\\sin A\\), \\(\\cos A\\) and \\(\\tan A\\).",
        steps: [
          "Hypotenuse: \\(AC = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13\\) cm.",
          "Seen from A, the opposite side is BC = 12 and the adjacent side is AB = 5.",
          "\\(\\sin A = \\frac{12}{13}\\), \\(\\cos A = \\frac{5}{13}\\), \\(\\tan A = \\frac{12}{5}\\).",
        ],
        answer: "\\(\\sin A = \\frac{12}{13}\\), \\(\\cos A = \\frac{5}{13}\\), \\(\\tan A = \\frac{12}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Triangle PQR has a right angle at Q, with PQ = 8 cm and QR = 15 cm. Find \\(\\tan P\\).",
        steps: [
          "Seen from P, the opposite side is QR = 15 and the adjacent side is PQ = 8.",
          "\\(\\tan P = \\frac{15}{8}\\).",
        ],
        answer: "\\(\\frac{15}{8}\\)",
      },
      practiceSet: [
        {
          prompt: "In a right triangle, the side opposite angle \\(\\theta\\) is 7 cm and the hypotenuse is 25 cm. What is \\(\\sin\\theta\\)?",
          answer: "\\(\\frac{7}{25}\\)",
        },
        {
          prompt: "In a right triangle, the side adjacent to angle \\(\\theta\\) is 20 cm and the hypotenuse is 29 cm. What is \\(\\tan\\theta\\)?",
          answer: "\\(\\frac{21}{20}\\) (opposite side \\(= \\sqrt{29^2 - 20^2} = 21\\))",
        },
        { prompt: "Which trigonometric ratio is the hypotenuse divided by the side opposite the angle?", answer: "\\(\\operatorname{cosec}\\)" },
        { prompt: "A right triangle has legs of 9 cm and 12 cm. How long is its hypotenuse?", answer: "15 cm" },
      ],
      pyqExampleId: "12e088d7-c288-4f2c-8367-e6336a72a75a",
      traps: [
        {
          title: "Opposite and adjacent change with the angle",
          body:
            "In a right triangle ABC with the right angle at B, side BC is opposite A but adjacent to C. Name the sides again every time the question moves to the other acute angle.",
        },
        {
          title: "Reading sin A as sin times A",
          body:
            "\\(\\sin A\\) is one number, the value of a ratio for the angle A. You cannot cancel the A in \\(\\frac{\\sin A}{A}\\) or split \\(\\sin(A + B)\\) into \\(\\sin A + \\sin B\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgra-one-ratio",
      name: "Finding every ratio from one given ratio",
      intuition:
        "One ratio gives you two sides of the triangle. Draw it, find the third side by Pythagoras, and you can read off all six ratios. The reciprocal and quotient relations give some of them without a drawing at all.",
      definition:
        "- Read the given ratio as two sides: \\(\\sin\\theta = \\frac{5}{13}\\) means opposite 5, hypotenuse 13.\n" +
        "- Find the third side: adjacent \\(= \\sqrt{13^2 - 5^2} = 12\\).\n" +
        "- **Quotient relations:** \\(\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}\\) and \\(\\cot\\theta = \\dfrac{\\cos\\theta}{\\sin\\theta}\\).\n" +
        "- **Reciprocal pairs:** sin with cosec, cos with sec, tan with cot. Each pair multiplies to 1.",
      formula: {
        label: "Reciprocal and quotient relations",
        latex:
          "\\sin\\theta \\operatorname{cosec}\\theta = 1,\\quad \\cos\\theta \\sec\\theta = 1,\\quad \\tan\\theta \\cot\\theta = 1,\\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta},\\quad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}",
      },
      authoredExample: {
        prompt: "If \\(\\sin\\theta = \\frac{5}{13}\\), find \\(\\cos\\theta\\), \\(\\tan\\theta\\) and \\(\\sec\\theta\\).",
        steps: [
          "Opposite 5, hypotenuse 13, so adjacent \\(= \\sqrt{169 - 25} = \\sqrt{144} = 12\\).",
          "\\(\\cos\\theta = \\frac{12}{13}\\) and \\(\\tan\\theta = \\frac{5}{12}\\).",
          "\\(\\sec\\theta = \\frac{1}{\\cos\\theta} = \\frac{13}{12}\\).",
        ],
        answer: "\\(\\cos\\theta = \\frac{12}{13}\\), \\(\\tan\\theta = \\frac{5}{12}\\), \\(\\sec\\theta = \\frac{13}{12}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sec\\theta = \\frac{5}{3}\\), find \\(\\tan\\theta\\).",
        steps: [
          "\\(\\cos\\theta = \\frac{3}{5}\\): adjacent 3, hypotenuse 5.",
          "Opposite \\(= \\sqrt{25 - 9} = 4\\), so \\(\\tan\\theta = \\frac{4}{3}\\).",
        ],
        answer: "\\(\\frac{4}{3}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta = \\frac{3}{5}\\), what is \\(\\operatorname{cosec}\\theta\\)?", answer: "\\(\\frac{5}{3}\\)" },
        { prompt: "If \\(\\cot A = \\frac{4}{3}\\), what is \\(\\tan A\\)?", answer: "\\(\\frac{3}{4}\\)" },
        { prompt: "If \\(\\cos A = \\frac{8}{17}\\) for an acute angle A, what is \\(\\sin A\\)?", answer: "\\(\\frac{15}{17}\\)" },
        { prompt: "If \\(\\sin A = 0.6\\) and \\(\\cos A = 0.8\\), what is \\(\\cot A\\)?", answer: "\\(\\frac{0.8}{0.6} = \\frac{4}{3}\\)" },
      ],
      pyqExampleId: "fcc09b1a-276a-4e99-a29d-9ecbc283abaa",
      traps: [
        {
          title: "Pairing sec with sin",
          body:
            "The names cross over: sec is the reciprocal of cos, and cosec is the reciprocal of sin. If \\(\\cos\\theta = \\frac{3}{5}\\), then \\(\\sec\\theta = \\frac{5}{3}\\).",
        },
        {
          title: "Forgetting the square root",
          body:
            "With hypotenuse 13 and one side 5, the third side is \\(\\sqrt{169 - 25} = 12\\), not 144. Take the root before you write the ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgra-divide",
      name: "Dividing by cos to turn a fraction into tan",
      intuition:
        "When you know \\(\\tan\\theta\\) but the question is a fraction of sines and cosines, you do not need the sides at all. Divide every term, top and bottom, by \\(\\cos\\theta\\): each \\(\\sin\\theta\\) becomes \\(\\tan\\theta\\) and each \\(\\cos\\theta\\) becomes 1.",
      definition:
        "- Works when **every** term on top and bottom has exactly one \\(\\sin\\theta\\) or one \\(\\cos\\theta\\), as in \\(\\dfrac{a\\sin\\theta + b\\cos\\theta}{c\\sin\\theta + d\\cos\\theta}\\).\n" +
        "- Dividing by \\(\\cos\\theta\\) gives \\(\\dfrac{a\\tan\\theta + b}{c\\tan\\theta + d}\\).\n" +
        "- If you are given \\(\\cot\\theta\\) instead, divide by \\(\\sin\\theta\\): each \\(\\cos\\theta\\) becomes \\(\\cot\\theta\\).",
      formula: {
        label: "A sin and cos fraction in terms of tan",
        latex: "\\frac{a\\sin\\theta + b\\cos\\theta}{c\\sin\\theta + d\\cos\\theta} = \\frac{a\\tan\\theta + b}{c\\tan\\theta + d}",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\theta = 2\\), find \\(\\dfrac{3\\sin\\theta + \\cos\\theta}{\\sin\\theta + 2\\cos\\theta}\\).",
        steps: [
          "Divide every term by \\(\\cos\\theta\\): \\(\\dfrac{3\\tan\\theta + 1}{\\tan\\theta + 2}\\).",
          "Put \\(\\tan\\theta = 2\\): \\(\\dfrac{6 + 1}{2 + 2} = \\dfrac{7}{4}\\).",
        ],
        answer: "\\(\\frac{7}{4}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\cot\\theta = 3\\), find \\(\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}\\).",
        steps: [
          "Divide every term by \\(\\sin\\theta\\): \\(\\dfrac{1 + \\cot\\theta}{1 - \\cot\\theta}\\).",
          "\\(\\dfrac{1 + 3}{1 - 3} = \\dfrac{4}{-2} = -2\\).",
        ],
        answer: "\\(-2\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(\\tan\\theta = 3\\), what is \\(\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}\\)?",
          answer: "\\(\\frac{4}{2} = 2\\)",
        },
        {
          prompt: "If \\(4\\tan\\theta = 3\\), what is \\(\\dfrac{4\\sin\\theta - \\cos\\theta}{4\\sin\\theta + \\cos\\theta}\\)?",
          answer: "\\(\\frac{3 - 1}{3 + 1} = \\frac{1}{2}\\)",
        },
        { prompt: "If \\(\\tan\\theta = \\frac{1}{2}\\), what is \\(\\dfrac{2\\sin\\theta + \\cos\\theta}{\\cos\\theta}\\)?", answer: "\\(2\\tan\\theta + 1 = 2\\)" },
      ],
      pyqExampleId: "6e7b392c-c730-4981-9584-3ad29390a5b7",
      traps: [
        {
          title: "Dividing only the top",
          body:
            "Divide the numerator and the denominator by \\(\\cos\\theta\\). Dividing only one of them changes the value of the fraction.",
        },
        {
          title: "A plain number breaks the trick",
          body:
            "In \\(\\dfrac{\\sin\\theta + 1}{\\cos\\theta}\\) the 1 has no sin or cos, so dividing by \\(\\cos\\theta\\) leaves \\(\\frac{1}{\\cos\\theta}\\) behind. Then you need the actual values of \\(\\sin\\theta\\) and \\(\\cos\\theta\\) from the sides.",
        },
      ],
    },
  ],
};
