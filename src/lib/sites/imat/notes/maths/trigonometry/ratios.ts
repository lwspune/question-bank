import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_TRG_RATIOS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Ratios",
  title: "Angles, Ratios and Exact Values",
  oneLineDefinition:
    "Sine, cosine and tangent compare the sides of a right triangle, extend to any angle on the unit circle, and have exact values at 0°, 30°, 45°, 60° and 90°.",
  whyItMatters:
    "The 2024 paper asked which side of a right triangle equals the hypotenuse times the sine of an angle, and a 2021 question combined a tangent and a cosine across two right triangles sharing a side.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-trg-radians",
      name: "Measuring angles in radians and degrees",
      intuition:
        "Wrap the radius of a circle along its edge: the angle it covers is one radian, a little under 60°. The whole edge is \\(2\\pi\\) radii long, so a full turn is \\(2\\pi\\) radians. Radians make arc lengths simple, which is why advanced formulas use them.",
      definition:
        "- A full turn is \\(360^\\circ = 2\\pi\\) radians, so \\(180^\\circ = \\pi\\) radians.\n" +
        "- Degrees to radians: multiply by \\(\\dfrac{\\pi}{180}\\). Radians to degrees: multiply by \\(\\dfrac{180}{\\pi}\\).\n" +
        "- One radian is about \\(57.3^\\circ\\).\n" +
        "- With the angle \\(\\theta\\) in radians, an **arc** of a circle of radius \\(r\\) has length \\(s = r\\theta\\).",
      formula: {
        label: "Converting angles",
        latex: "\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\frac{\\pi}{180} \\qquad s = r\\theta",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "the angle" },
          { symbol: "\\(s\\)", meaning: "arc length, with \\(\\theta\\) in radians" },
          { symbol: "\\(r\\)", meaning: "radius" },
        ],
      },
      authoredExample: {
        prompt: "Convert \\(150^\\circ\\) to radians and \\(\\dfrac{3\\pi}{4}\\) radians to degrees.",
        steps: [
          "\\(150 \\times \\dfrac{\\pi}{180} = \\dfrac{5\\pi}{6}\\).",
          "\\(\\dfrac{3\\pi}{4} \\times \\dfrac{180}{\\pi} = \\dfrac{3 \\times 180}{4} = 135^\\circ\\).",
          "A quick check: \\(\\pi\\) is \\(180^\\circ\\), so \\(\\dfrac{3\\pi}{4}\\) is three quarters of \\(180^\\circ\\).",
        ],
        answer: "\\(\\dfrac{5\\pi}{6}\\) rad; \\(135^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "What is an angle of \\(\\dfrac{7\\pi}{6}\\) radians in degrees?",
        options: ["\\(105^\\circ\\)", "\\(210^\\circ\\)", "\\(420^\\circ\\)", "\\(240^\\circ\\)", "\\(330^\\circ\\)"],
        steps: [
          "Replace \\(\\pi\\) by \\(180^\\circ\\): \\(\\dfrac{7 \\times 180}{6} = 210^\\circ\\).",
          "Option A takes \\(\\pi\\) as \\(90^\\circ\\); C takes it as \\(360^\\circ\\). D is \\(\\dfrac{4\\pi}{3}\\) and E is \\(\\dfrac{11\\pi}{6}\\).",
        ],
        answer: "(B) \\(210^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Convert \\(45^\\circ\\) to radians.", answer: "\\(\\dfrac{\\pi}{4}\\)" },
        { prompt: "Convert \\(\\dfrac{2\\pi}{3}\\) to degrees.", answer: "\\(120^\\circ\\)" },
        { prompt: "Convert \\(270^\\circ\\) to radians.", answer: "\\(\\dfrac{3\\pi}{2}\\)" },
        { prompt: "An arc of a circle of radius 5 cm subtends 0.8 rad at the centre. How long is it?", answer: "4 cm", method: "\\(s = r\\theta = 5 \\times 0.8\\)" },
      ],
      traps: [
        {
          title: "Pi radians is 180 degrees, not 360",
          body: "A full turn is \\(2\\pi\\), so \\(\\pi\\) alone is half a turn, \\(180^\\circ\\). Using \\(360^\\circ\\) for \\(\\pi\\) doubles every converted angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-trg-right-triangle",
      name: "Sine, cosine and tangent in a right triangle",
      intuition:
        "All right triangles with the same acute angle are similar, so the ratios of their sides depend only on that angle. Sine, cosine and tangent are names for those ratios. Turned round, they give a side: the side opposite an angle is the hypotenuse times the sine.",
      definition:
        "In a right triangle, for an acute angle \\(\\alpha\\):\n" +
        "- The **hypotenuse** is the longest side, opposite the right angle; the **opposite** side faces \\(\\alpha\\); the **adjacent** side is the leg next to \\(\\alpha\\).\n" +
        "- \\(\\sin\\alpha = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos\\alpha = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan\\alpha = \\dfrac{\\text{opposite}}{\\text{adjacent}}\\) (SOH CAH TOA).\n" +
        "- So opposite \\(= \\text{hyp} \\times \\sin\\alpha\\), adjacent \\(= \\text{hyp} \\times \\cos\\alpha\\), opposite \\(= \\text{adjacent} \\times \\tan\\alpha\\).\n" +
        "- The other acute angle is \\(90^\\circ - \\alpha\\), and \\(\\sin\\alpha = \\cos(90^\\circ - \\alpha)\\).",
      formula: {
        label: "SOH CAH TOA",
        latex: "\\sin\\alpha = \\frac{\\text{opp}}{\\text{hyp}} \\qquad \\cos\\alpha = \\frac{\\text{adj}}{\\text{hyp}} \\qquad \\tan\\alpha = \\frac{\\text{opp}}{\\text{adj}}",
      },
      authoredExample: {
        prompt:
          "A right triangle has legs 8 cm and 15 cm. Let \\(\\alpha\\) be the angle opposite the 8 cm leg. Find \\(\\sin\\alpha\\), \\(\\cos\\alpha\\) and \\(\\tan\\alpha\\).",
        steps: [
          "Hypotenuse by Pythagoras: \\(\\sqrt{8^2 + 15^2} = \\sqrt{289} = 17\\) cm.",
          "Opposite is 8, adjacent is 15, hypotenuse is 17.",
          "\\(\\sin\\alpha = \\dfrac{8}{17}\\), \\(\\cos\\alpha = \\dfrac{15}{17}\\), \\(\\tan\\alpha = \\dfrac{8}{15}\\).",
        ],
        answer: "\\(\\dfrac{8}{17}\\), \\(\\dfrac{15}{17}\\), \\(\\dfrac{8}{15}\\)",
      },
      selfCheckExample: {
        prompt:
          "A right triangle has hypotenuse \\(h\\). For one of its acute angles \\(\\beta\\), the leg next to \\(\\beta\\) is \\(d\\) and the leg facing \\(\\beta\\) is \\(e\\). Which relation is true?",
        options: [
          "\\(d = h\\sin\\beta\\)",
          "\\(e = h\\cos\\beta\\)",
          "\\(d = h\\cos\\beta\\)",
          "\\(h = d\\cos\\beta\\)",
          "\\(e = d\\sin\\beta\\)",
        ],
        steps: [
          "\\(d\\) is adjacent to \\(\\beta\\), so \\(\\cos\\beta = d/h\\), giving \\(d = h\\cos\\beta\\).",
          "A and B swap sine and cosine. D rearranges wrongly: \\(h = d/\\cos\\beta\\). E should use the tangent: \\(e = d\\tan\\beta\\).",
        ],
        answer: "(C) \\(d = h\\cos\\beta\\)",
      },
      practiceSet: [
        { prompt: "A right triangle has hypotenuse 13 and a leg of 5 opposite angle \\(\\alpha\\). Find \\(\\cos\\alpha\\).", answer: "\\(\\dfrac{12}{13}\\)", method: "Other leg \\(\\sqrt{169 - 25} = 12\\)" },
        { prompt: "\\(\\tan\\alpha = \\dfrac{3}{4}\\) and the adjacent leg is 8. How long is the opposite leg?", answer: "6", method: "\\(8 \\times \\dfrac{3}{4}\\)" },
        { prompt: "The hypotenuse is 20 and \\(\\sin\\alpha = 0.6\\). How long is the leg opposite \\(\\alpha\\)?", answer: "12", method: "\\(20 \\times 0.6\\)" },
      ],
      traps: [
        {
          title: "Opposite goes with sine, adjacent with cosine",
          body: "The leg facing the angle is hypotenuse times sine; the leg touching the angle is hypotenuse times cosine. Swapping them is the most common wrong option, so label the triangle from the given angle before writing anything.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-trg-exact-values",
      name: "Exact values of sine, cosine and tangent at the standard angles",
      intuition:
        "Two triangles give all these values. Half an equilateral triangle of side 2 has sides 1, \\(\\sqrt{3}\\) and 2 with angles 30°, 60°, 90°. A right isosceles triangle with legs 1 has hypotenuse \\(\\sqrt{2}\\) and angles 45°, 45°, 90°.",
      definition:
        "- Sine rises from 0 to 1 as the angle goes from 0° to 90°; cosine falls from 1 to 0 over the same range.\n" +
        "- \\(\\sin\\theta = \\cos(90^\\circ - \\theta)\\), so the sine column read downwards is the cosine column read upwards.\n" +
        "- \\(\\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}\\) and \\(\\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}\\).",
      table: {
        columns: ["Angle", "sin", "cos", "tan"],
        rows: [
          { cells: ["\\(0^\\circ\\) (0)", "0", "1", "0"] },
          { cells: ["\\(30^\\circ\\) \\((\\pi/6)\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\dfrac{\\sqrt{3}}{2}\\)", "\\(\\dfrac{\\sqrt{3}}{3}\\)"] },
          { cells: ["\\(45^\\circ\\) \\((\\pi/4)\\)", "\\(\\dfrac{\\sqrt{2}}{2}\\)", "\\(\\dfrac{\\sqrt{2}}{2}\\)", "1"] },
          { cells: ["\\(60^\\circ\\) \\((\\pi/3)\\)", "\\(\\dfrac{\\sqrt{3}}{2}\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\sqrt{3}\\)"] },
          { cells: ["\\(90^\\circ\\) \\((\\pi/2)\\)", "1", "0", "Not defined"], noteAmber: "\\(\\tan 90^\\circ\\) does not exist, because \\(\\cos 90^\\circ = 0\\)." },
        ],
        caption: "From the triangles with sides \\(1, \\sqrt{3}, 2\\) and \\(1, 1, \\sqrt{2}\\).",
      },
      selfCheckExample: {
        prompt: "What is the exact value of \\(\\sin 60^\\circ \\cos 30^\\circ - \\tan 45^\\circ\\)?",
        options: ["\\(\\dfrac{1}{4}\\)", "0", "\\(\\dfrac{3}{4}\\)", "\\(-\\dfrac{1}{4}\\)", "\\(\\dfrac{1}{2}\\)"],
        steps: [
          "\\(\\sin 60^\\circ \\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2} \\times \\dfrac{\\sqrt{3}}{2} = \\dfrac{3}{4}\\).",
          "\\(\\tan 45^\\circ = 1\\), so the value is \\(\\dfrac{3}{4} - 1 = -\\dfrac{1}{4}\\).",
          "C forgets to subtract; A loses the minus sign; B treats \\(\\sin 60^\\circ \\cos 30^\\circ\\) as 1.",
        ],
        answer: "(D) \\(-\\dfrac{1}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\tan 60^\\circ = ?\\)", answer: "\\(\\sqrt{3}\\)" },
        { prompt: "\\(\\cos 45^\\circ = ?\\)", answer: "\\(\\dfrac{\\sqrt{2}}{2}\\)" },
        { prompt: "\\(\\sin 30^\\circ + \\cos 60^\\circ = ?\\)", answer: "1" },
        { prompt: "\\(2\\sin 45^\\circ \\cos 45^\\circ = ?\\)", answer: "1" },
      ],
      traps: [
        {
          title: "sin 30° is one half; cos 30° is root 3 over 2",
          body: "The two values swap between 30° and 60°. Remember that sine grows with the angle: the smaller angle has the smaller sine, so \\(\\sin 30^\\circ = \\tfrac{1}{2}\\) and \\(\\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-trg-unit-circle",
      name: "The unit circle: any angle, signs in four quadrants and sin² + cos² = 1",
      intuition:
        "Put a point on a circle of radius 1 and turn it anticlockwise from the positive x-axis by \\(\\theta\\). Its x-coordinate is \\(\\cos\\theta\\) and its y-coordinate is \\(\\sin\\theta\\). This works for any angle, and Pythagoras on the radius gives the most useful identity in trigonometry.",
      definition:
        "- On the **unit circle** the point at angle \\(\\theta\\) is \\((\\cos\\theta, \\sin\\theta)\\), so both lie between \\(-1\\) and \\(1\\).\n" +
        "- **Signs**: first quadrant (0° to 90°) all positive; second (90° to 180°) only sine positive; third (180° to 270°) only tangent positive; fourth (270° to 360°) only cosine positive.\n" +
        "- The **reference angle** is the acute angle to the x-axis: \\(\\sin 150^\\circ = \\sin 30^\\circ\\), \\(\\cos 240^\\circ = -\\cos 60^\\circ\\).\n" +
        "- **Identities**: \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and \\(\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}\\).",
      formula: {
        label: "The two basic identities",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1 \\qquad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}",
      },
      authoredExample: {
        prompt: "The angle \\(\\theta\\) is between \\(90^\\circ\\) and \\(180^\\circ\\), and \\(\\sin\\theta = \\dfrac{3}{5}\\). Find \\(\\cos\\theta\\) and \\(\\tan\\theta\\).",
        steps: [
          "\\(\\cos^2\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}\\), so \\(\\cos\\theta = \\pm\\dfrac{4}{5}\\).",
          "In the second quadrant cosine is negative: \\(\\cos\\theta = -\\dfrac{4}{5}\\).",
          "\\(\\tan\\theta = \\dfrac{3/5}{-4/5} = -\\dfrac{3}{4}\\).",
        ],
        answer: "\\(\\cos\\theta = -\\dfrac{4}{5}\\), \\(\\tan\\theta = -\\dfrac{3}{4}\\)",
      },
      selfCheckExample: {
        prompt: "The angle \\(\\theta\\) is between \\(180^\\circ\\) and \\(270^\\circ\\), and \\(\\cos\\theta = -\\dfrac{5}{13}\\). What is \\(\\tan\\theta\\)?",
        options: ["\\(\\dfrac{12}{5}\\)", "\\(-\\dfrac{12}{5}\\)", "\\(\\dfrac{5}{12}\\)", "\\(-\\dfrac{12}{13}\\)", "\\(-\\dfrac{5}{12}\\)"],
        steps: [
          "\\(\\sin^2\\theta = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}\\); in the third quadrant sine is negative, so \\(\\sin\\theta = -\\dfrac{12}{13}\\).",
          "\\(\\tan\\theta = \\dfrac{-12/13}{-5/13} = \\dfrac{12}{5}\\), positive as expected in the third quadrant.",
          "B gets the sign wrong; C turns the ratio upside down; D is \\(\\sin\\theta\\), not \\(\\tan\\theta\\).",
        ],
        answer: "(A) \\(\\dfrac{12}{5}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\sin 150^\\circ = ?\\)", answer: "\\(\\dfrac{1}{2}\\)", method: "Reference angle 30°, sine positive in the second quadrant" },
        { prompt: "\\(\\cos 300^\\circ = ?\\)", answer: "\\(\\dfrac{1}{2}\\)", method: "Reference angle 60°, cosine positive in the fourth quadrant" },
        { prompt: "Is \\(\\tan 200^\\circ\\) positive or negative?", answer: "Positive", method: "Third quadrant" },
        { prompt: "\\(\\theta\\) is acute and \\(\\sin\\theta = 0.8\\). Find \\(\\cos\\theta\\).", answer: "0.6", method: "\\(\\sqrt{1 - 0.64}\\)" },
      ],
      traps: [
        {
          title: "The identity gives cos only up to a sign",
          body: "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) gives \\(\\cos\\theta = \\pm\\sqrt{1 - \\sin^2\\theta}\\). The quadrant decides the sign, and the option with the wrong sign is always offered.",
        },
      ],
    },
  ],
};
