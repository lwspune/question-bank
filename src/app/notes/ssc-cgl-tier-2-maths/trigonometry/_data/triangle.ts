import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TG_TRIANGLE_NOTE: SubtopicNote = {
  subtopicName: "Ratios in a Right Triangle",
  title: "Ratios in a Right Triangle",
  oneLineDefinition:
    "One ratio fixes a right triangle's shape: sketch it, get the missing side from the squares of the other two, and every other ratio follows, as long as you know which side faces which angle.",
  whyItMatters:
    "11 questions in the Tier II bank, 6 EASY and 5 MODERATE. Each gives one ratio, one equation or one named triangle and asks for an expression in the other ratios.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tgtr-one",
      name: "All six ratios from one",
      intuition:
        "One ratio fixes a right triangle up to its size. Sketch it with that ratio's two sides, work out the missing side from the other two, and every other ratio can be read straight off the sketch.",
      definition:
        "- \\(\\sin = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan = \\frac{\\text{opposite}}{\\text{adjacent}}\\); cosec, sec and cot are their reciprocals.\n" +
        "- From \\(\\sin\\theta = \\frac{p}{h}\\), the adjacent side is \\(\\sqrt{h^2 - p^2}\\).\n" +
        "- Triples worth knowing: 3, 4, 5; 5, 12, 13; 7, 24, 25; 8, 15, 17; 9, 40, 41; 20, 21, 29.\n" +
        "- An equation such as \\(a\\sin^2\\theta + b\\cos^2\\theta = c\\): replace \\(\\cos^2\\theta\\) by \\(1 - \\sin^2\\theta\\) and solve for \\(\\sin^2\\theta\\).\n" +
        "- With letters, as in \\(\\frac{\\sin\\theta}{x} = \\frac{\\cos\\theta}{y}\\), the sides are \\(x\\) and \\(y\\) and the hypotenuse is \\(\\sqrt{x^2 + y^2}\\).",
      formula: {
        label: "The three basic ratios",
        latex: "\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\theta = \\frac{8}{15}\\) and \\(\\theta\\) is acute, find \\(\\frac{\\sin\\theta + \\cos\\theta}{\\sec\\theta - \\tan\\theta}\\).",
        steps: [
          "The sides are 8 and 15, so the hypotenuse is 17: \\(\\sin\\theta = \\frac{8}{17}\\), \\(\\cos\\theta = \\frac{15}{17}\\), \\(\\sec\\theta = \\frac{17}{15}\\).",
          "Numerator \\(= \\frac{23}{17}\\); denominator \\(= \\frac{17 - 8}{15} = \\frac{3}{5}\\).",
          "Value \\(= \\frac{23}{17} \\times \\frac{5}{3} = \\frac{115}{51}\\).",
        ],
        answer: "\\(\\frac{115}{51}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(5\\sin^2\\theta + 2\\cos^2\\theta = 3\\) and \\(\\theta\\) is acute, find \\(\\tan\\theta\\).",
        steps: ["\\(2 + 3\\sin^2\\theta = 3\\), so \\(\\sin^2\\theta = \\frac{1}{3}\\) and \\(\\cos^2\\theta = \\frac{2}{3}\\).", "\\(\\tan\\theta = \\sqrt{\\frac{1}{2}} = \\frac{1}{\\sqrt{2}}\\)."],
        answer: "\\(\\frac{1}{\\sqrt{2}}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\cos\\theta = \\frac{7}{25}\\) and \\(\\theta\\) is acute, find \\(\\text{cosec}\\,\\theta\\).", answer: "\\(\\frac{25}{24}\\)" },
        { prompt: "If \\(\\sec\\theta = \\frac{13}{12}\\) and \\(\\theta\\) is acute, find \\(\\sin\\theta\\).", answer: "\\(\\frac{5}{13}\\)" },
        { prompt: "If \\(3\\cot\\theta = 4\\) and \\(\\theta\\) is acute, find \\(\\frac{2\\sin\\theta + \\cos\\theta}{\\sin\\theta + \\cos\\theta}\\).", answer: "\\(\\frac{10}{7}\\)" },
      ],
      pyqExampleId: "da28f209-5075-4292-95bb-95cd482956db",
      traps: [
        {
          title: "Subtracting sides instead of squaring",
          body: "\\(\\sin\\theta = \\frac{9}{41}\\) gives an adjacent side of \\(\\sqrt{41^2 - 9^2} = 40\\), not \\(41 - 9 = 32\\). Pythagoras works on squares.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tgtr-triangle",
      name: "Ratios in a named triangle",
      visualizationSlug: "cds-trig-right-triangle",
      intuition:
        "When the stem names a triangle, label each side as opposite, adjacent or hypotenuse from the angle in question. The same side is opposite one acute angle and adjacent to the other.",
      definition:
        "- In a triangle right-angled at B, the angles at A and C add to 90°, so \\(\\sin A = \\cos C\\) and \\(\\tan A = \\cot C\\).\n" +
        "- 'Opposite' and 'adjacent' depend on which angle you stand at; the hypotenuse is always the side facing the right angle.\n" +
        "- A known angle and one side give the rest: opposite \\(=\\) adjacent \\(\\times \\tan A\\), hypotenuse \\(=\\) adjacent \\(\\div \\cos A\\).",
      formula: {
        label: "Sides from one angle",
        latex: "\\text{opposite} = \\text{adjacent} \\times \\tan A, \\quad \\text{hypotenuse} = \\frac{\\text{adjacent}}{\\cos A}",
      },
      authoredExample: {
        prompt: "In triangle PQR, right-angled at Q, PQ = 8 cm and QR = 15 cm. Find \\(\\sin P\\) and \\(\\cos R\\).",
        steps: ["PR \\(= \\sqrt{64 + 225} = 17\\).", "QR is opposite P, so \\(\\sin P = \\frac{15}{17}\\); QR is next to R, so \\(\\cos R = \\frac{15}{17}\\)."],
        answer: "Both are \\(\\frac{15}{17}\\)",
      },
      selfCheckExample: {
        prompt: "In triangle ABC, right-angled at C, angle A is 30° and BC = 7 cm. Find AB and AC.",
        steps: ["BC is opposite A, so \\(AB = 7 \\div \\sin 30^\\circ = 14\\) cm.", "\\(AC = 7 \\div \\tan 30^\\circ = 7\\sqrt{3}\\) cm."],
        answer: "AB = 14 cm, AC = \\(7\\sqrt{3}\\) cm",
      },
      practiceSet: [
        { prompt: "In a triangle right-angled at B, AB = 5 and AC = 13. Find \\(\\tan C\\).", answer: "\\(\\frac{5}{12}\\)" },
        { prompt: "In a right triangle, one angle is 45° and the side next to it is 9 cm. Find the hypotenuse.", answer: "\\(9\\sqrt{2}\\) cm" },
        { prompt: "In triangle PQR, right-angled at Q, \\(\\tan R = \\frac{4}{3}\\). Find \\(\\sin P\\).", answer: "\\(\\frac{3}{5}\\)" },
      ],
      pyqExampleId: "4432c8d7-fb3a-4b17-a40f-2cc8dd0d7cd6",
      traps: [
        {
          title: "Fixing 'opposite' to one side for good",
          body: "In a triangle right-angled at B, side BC is opposite angle A but next to angle C. Re-label the sides each time the angle changes.",
        },
      ],
    },
  ],
};
