import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TG_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Values at Standard Angles",
  title: "Values at Standard Angles",
  oneLineDefinition:
    "The ratios of 0°, 30°, 45°, 60° and 90° are known exact values, so an expression in them is plain arithmetic and an equation like sin 2θ = 1/2 gives the angle at once.",
  whyItMatters:
    "Thirteen questions in the bank, the largest page in the chapter, and twelve are EASY. Six are arithmetic with these values, five give a value and ask for the angle, and two find the sides of a right triangle or a rectangle. All of them need the table on this page by heart.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spitgva-table",
      name: "The table of standard values",
      intuition:
        "Learn the sine row as \\(\\dfrac{\\sqrt{0}}{2}, \\dfrac{\\sqrt{1}}{2}, \\dfrac{\\sqrt{2}}{2}, \\dfrac{\\sqrt{3}}{2}, \\dfrac{\\sqrt{4}}{2}\\) for \\(0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ\\). Cosine is the same list backwards. Tangent is sine divided by cosine, and the last three ratios are reciprocals.",
      definition:
        "- \\(\\sin 0^\\circ = 0\\) and \\(\\cos 0^\\circ = 1\\); \\(\\sin 90^\\circ = 1\\) and \\(\\cos 90^\\circ = 0\\).\n" +
        "- \\(\\tan 45^\\circ = 1\\), and \\(\\sin 45^\\circ = \\cos 45^\\circ = \\frac{1}{\\sqrt{2}}\\).\n" +
        "- **Not defined:** \\(\\tan 90^\\circ\\), \\(\\sec 90^\\circ\\), \\(\\cot 0^\\circ\\) and \\(\\operatorname{cosec} 0^\\circ\\), because each divides by zero.\n" +
        "- \\(\\sin^2 30^\\circ\\) means \\((\\sin 30^\\circ)^2 = \\frac{1}{4}\\).",
      table: {
        columns: ["Angle", "sin", "cos", "tan", "cosec", "sec", "cot"],
        rows: [
          { cells: ["\\(0^\\circ\\)", "\\(0\\)", "\\(1\\)", "\\(0\\)", "not defined", "\\(1\\)", "not defined"] },
          {
            cells: [
              "\\(30^\\circ\\)",
              "\\(\\frac{1}{2}\\)",
              "\\(\\frac{\\sqrt{3}}{2}\\)",
              "\\(\\frac{1}{\\sqrt{3}}\\)",
              "\\(2\\)",
              "\\(\\frac{2}{\\sqrt{3}}\\)",
              "\\(\\sqrt{3}\\)",
            ],
          },
          {
            cells: [
              "\\(45^\\circ\\)",
              "\\(\\frac{1}{\\sqrt{2}}\\)",
              "\\(\\frac{1}{\\sqrt{2}}\\)",
              "\\(1\\)",
              "\\(\\sqrt{2}\\)",
              "\\(\\sqrt{2}\\)",
              "\\(1\\)",
            ],
          },
          {
            cells: [
              "\\(60^\\circ\\)",
              "\\(\\frac{\\sqrt{3}}{2}\\)",
              "\\(\\frac{1}{2}\\)",
              "\\(\\sqrt{3}\\)",
              "\\(\\frac{2}{\\sqrt{3}}\\)",
              "\\(2\\)",
              "\\(\\frac{1}{\\sqrt{3}}\\)",
            ],
          },
          {
            cells: ["\\(90^\\circ\\)", "\\(1\\)", "\\(0\\)", "not defined", "\\(1\\)", "not defined", "\\(0\\)"],
            noteAmber: "\\(\\tan 90^\\circ\\) is not defined. It is not 0 and not 1.",
          },
        ],
        caption: "Sine rises from 0 to 1, cosine falls from 1 to 0, and tangent is their quotient.",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(2\\tan^2 45^\\circ + \\cos^2 30^\\circ - \\sin^2 60^\\circ\\).",
        steps: [
          "\\(\\tan^2 45^\\circ = 1\\), \\(\\cos^2 30^\\circ = \\frac{3}{4}\\), \\(\\sin^2 60^\\circ = \\frac{3}{4}\\).",
          "\\(2 + \\frac{3}{4} - \\frac{3}{4} = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\tan 60^\\circ \\cos 30^\\circ\\)?", answer: "\\(\\sqrt{3} \\times \\frac{\\sqrt{3}}{2} = \\frac{3}{2}\\)" },
        { prompt: "What is \\(4\\sin^2 45^\\circ + 3\\tan^2 30^\\circ\\)?", answer: "\\(2 + 1 = 3\\)" },
        { prompt: "What is \\(\\operatorname{cosec} 30^\\circ + \\sec 60^\\circ\\)?", answer: "\\(2 + 2 = 4\\)" },
        { prompt: "What is \\(\\cos 90^\\circ + \\tan 0^\\circ + \\sin 0^\\circ\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "9afa502a-ae4a-48ba-887c-751d8f13b62a",
      traps: [
        {
          title: "Doubling the angle does not double the value",
          body:
            "\\(\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}\\), but \\(2\\sin 30^\\circ = 1\\). The ratio of twice an angle is not twice the ratio.",
        },
        {
          title: "Squaring the angle instead of the value",
          body:
            "\\(\\cos^2 60^\\circ\\) is \\(\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}\\). The square belongs to the value of the ratio, never to the angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgva-angle",
      name: "Reading the angle back from a value",
      intuition:
        "The table works both ways. If \\(\\sin(\\text{something}) = \\frac{\\sqrt{3}}{2}\\), that something is \\(60^\\circ\\). Find the whole angle inside the bracket first, then solve for \\(\\theta\\), then answer exactly what the question asks.",
      definition:
        "- Match the value to the table: \\(\\cos x = \\frac{1}{2}\\) gives \\(x = 60^\\circ\\), \\(\\tan x = 1\\) gives \\(x = 45^\\circ\\).\n" +
        "- If the bracket holds \\(2\\theta\\) or \\(3\\theta\\), solve for that first, then divide.\n" +
        "- The angles here are taken from \\(0^\\circ\\) to \\(90^\\circ\\), so each value gives one angle: \\(\\tan\\theta = 0\\) means \\(\\theta = 0^\\circ\\).\n" +
        "- Once the angle is known, any other ratio of it comes from the table.",
      authoredExample: {
        prompt: "If \\(2\\cos 2\\theta = 1\\), find \\(\\theta\\) and then \\(\\sin\\theta\\).",
        steps: [
          "\\(\\cos 2\\theta = \\frac{1}{2}\\), so \\(2\\theta = 60^\\circ\\).",
          "\\(\\theta = 30^\\circ\\).",
          "\\(\\sin 30^\\circ = \\frac{1}{2}\\).",
        ],
        answer: "\\(\\theta = 30^\\circ\\), \\(\\sin\\theta = \\frac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sqrt{3}\\tan\\theta = 3\\), find \\(\\sin\\theta + \\cos\\theta\\).",
        steps: [
          "\\(\\tan\\theta = \\frac{3}{\\sqrt{3}} = \\sqrt{3}\\), so \\(\\theta = 60^\\circ\\).",
          "\\(\\sin 60^\\circ + \\cos 60^\\circ = \\frac{\\sqrt{3}}{2} + \\frac{1}{2} = \\frac{\\sqrt{3} + 1}{2}\\).",
        ],
        answer: "\\(\\frac{\\sqrt{3} + 1}{2}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\cos\\theta = 1\\), what is \\(\\theta\\)?", answer: "\\(0^\\circ\\)" },
        { prompt: "If \\(2\\cos\\theta = \\sqrt{2}\\), what is \\(\\theta\\)?", answer: "\\(45^\\circ\\)" },
        { prompt: "If \\(\\tan 2A = 1\\), what is A?", answer: "\\(22.5^\\circ\\)" },
        { prompt: "If \\(\\cos(A - B) = 1\\) and \\(A = 35^\\circ\\), what is B?", answer: "\\(35^\\circ\\) (since \\(A - B = 0^\\circ\\))" },
      ],
      pyqExampleId: "18ea9b6a-db42-46f4-8401-5f739847b8c4",
      traps: [
        {
          title: "Stopping at the angle in the bracket",
          body:
            "From \\(\\tan 2\\theta = \\sqrt{3}\\) you get \\(2\\theta = 60^\\circ\\), so \\(\\theta = 30^\\circ\\). The bracket's angle, \\(60^\\circ\\), is usually printed as a wrong option.",
        },
        {
          title: "Answering the angle when a part of it is asked",
          body:
            "If the question wants \\(\\frac{\\theta}{2}\\) or \\(\\frac{\\theta}{3}\\), finish the last division. Writing \\(\\theta\\) itself is the most common slip on these questions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitgva-triangle",
      name: "Sides of a right triangle from one side and an angle",
      intuition:
        "If you know the hypotenuse and an angle, each leg is the hypotenuse times a ratio: the side opposite the angle uses sin, the side next to it uses cos. If you know a leg instead, tan links the two legs.",
      definition:
        "- Opposite side \\(=\\) hypotenuse \\(\\times \\sin\\theta\\).\n" +
        "- Adjacent side \\(=\\) hypotenuse \\(\\times \\cos\\theta\\).\n" +
        "- Opposite side \\(=\\) adjacent side \\(\\times \\tan\\theta\\).\n" +
        "- A right triangle with a \\(45^\\circ\\) angle has two equal legs. A rectangle's diagonal splits it into two right triangles, so its sides come the same way.",
      formula: {
        label: "Legs from the hypotenuse",
        latex: "\\text{opp} = \\text{hyp} \\times \\sin\\theta, \\qquad \\text{adj} = \\text{hyp} \\times \\cos\\theta, \\qquad \\text{opp} = \\text{adj} \\times \\tan\\theta",
      },
      authoredExample: {
        prompt: "A right triangle has a hypotenuse of 10 cm and one angle of \\(30^\\circ\\). Find its two legs and its area.",
        steps: [
          "Side opposite \\(30^\\circ\\): \\(10\\sin 30^\\circ = 5\\) cm.",
          "Side next to \\(30^\\circ\\): \\(10\\cos 30^\\circ = 5\\sqrt{3}\\) cm.",
          "Area \\(= \\frac{1}{2} \\times 5 \\times 5\\sqrt{3} = \\frac{25\\sqrt{3}}{2}\\ \\text{cm}^2\\).",
        ],
        answer: "Legs 5 cm and \\(5\\sqrt{3}\\) cm, area \\(\\frac{25\\sqrt{3}}{2}\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "In a right triangle, one leg is 6 cm and the angle opposite it is \\(60^\\circ\\). Find the other leg.",
        steps: [
          "\\(\\tan 60^\\circ = \\dfrac{6}{\\text{other leg}}\\), so the other leg \\(= \\dfrac{6}{\\sqrt{3}}\\).",
          "\\(\\dfrac{6}{\\sqrt{3}} = 2\\sqrt{3}\\) cm.",
        ],
        answer: "\\(2\\sqrt{3}\\) cm",
      },
      practiceSet: [
        {
          prompt: "A right triangle has a hypotenuse of 20 cm and an angle of \\(60^\\circ\\). How long is the side opposite that angle?",
          answer: "\\(20\\sin 60^\\circ = 10\\sqrt{3}\\) cm",
        },
        { prompt: "A rectangle's diagonal is 10 cm and makes \\(60^\\circ\\) with one side. How long is that side?", answer: "\\(10\\cos 60^\\circ = 5\\) cm" },
        { prompt: "A right triangle has a \\(45^\\circ\\) angle and one leg of 7 cm. How long is its hypotenuse?", answer: "\\(7\\sqrt{2}\\) cm" },
      ],
      pyqExampleId: "aa320389-e6dd-4be2-8725-3fe6f0a3b582",
      traps: [
        {
          title: "Using sin for the side next to the angle",
          body:
            "The side touching the angle (not the hypotenuse) is hypotenuse \\(\\times \\cos\\theta\\). Sin gives the side across from the angle. Swapping them swaps the two legs.",
        },
        {
          title: "Taking the hypotenuse as a leg",
          body:
            "The hypotenuse is always across from the right angle. In a right triangle PQR with hypotenuse PR, the right angle is at Q, and the area uses the two legs PQ and QR.",
        },
      ],
    },
  ],
};
