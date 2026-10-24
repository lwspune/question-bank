import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M2_SECTORS_NOTE: SubtopicNote = {
  subtopicName: "Sectors and Segments",
  title: "Sectors and Segments",
  oneLineDefinition:
    "A sector is a slice of a circle cut by two radii; its area and arc are the same fraction of the whole circle as its angle is of 360°.",
  whyItMatters:
    "Four questions in the bank, three MODERATE and one EASY: a sector from its angle, a sector from its perimeter, the area swept by a clock's minute hand, and a shaded region made of segments. One idea settles all four: a sector is the fraction θ/360 of the circle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim2se-sector",
      name: "Area of a sector, the clock hand and segments",
      intuition:
        "A slice of pizza with a \\(90^\\circ\\) corner is a quarter of the pizza. A sector's area is the circle's area times its angle over \\(360^\\circ\\).",
      definition:
        "- **Area of a sector** \\(= \\frac{\\theta}{360^\\circ} \\times \\pi r^2\\).\n" +
        "- **A clock's minute hand** turns \\(360^\\circ\\) in 60 minutes, so \\(6^\\circ\\) a minute. The hour hand turns \\(30^\\circ\\) an hour.\n" +
        "- **A segment** is the part between a chord and its arc: segment \\(=\\) sector \\(-\\) triangle.\n" +
        "- **Shaded regions**: build them by adding and subtracting whole shapes you know.",
      formula: {
        label: "Sector and segment",
        latex: "A_{\\text{sector}} = \\frac{\\theta}{360^\\circ}\\pi r^2, \\qquad A_{\\text{segment}} = A_{\\text{sector}} - A_{\\text{triangle}}",
        symbols: [{ symbol: "θ", meaning: "angle of the sector at the centre, in degrees" }],
      },
      authoredExample: {
        prompt: "Find the area of a sector of radius 14 cm whose angle at the centre is \\(90^\\circ\\).",
        steps: [
          "Whole circle \\(= \\frac{22}{7} \\times 196 = 616\\) square cm.",
          "\\(\\frac{90}{360} = \\frac{1}{4}\\), so the sector \\(= \\frac{616}{4} = 154\\) square cm.",
        ],
        answer: "154 square cm",
      },
      selfCheckExample: {
        prompt: "The minute hand of a clock is 7 cm long. Find the area it sweeps in 15 minutes.",
        steps: [
          "In 15 minutes it turns \\(15 \\times 6^\\circ = 90^\\circ\\), a quarter turn.",
          "Area \\(= \\frac{1}{4} \\times \\frac{22}{7} \\times 49 = \\frac{154}{4} = 38.5\\) square cm.",
        ],
        answer: "38.5 square cm",
      },
      practiceSet: [
        { prompt: "What is the area of a sector of radius 7 cm with an angle of \\(72^\\circ\\) at the centre?", answer: "\\(\\frac{1}{5} \\times 154 = 30.8\\) square cm" },
        { prompt: "Through how many degrees does the minute hand of a clock turn in 10 minutes?", answer: "\\(60^\\circ\\)" },
        {
          prompt: "In a circle of radius 14 cm, a chord makes a right angle at the centre. What is the area of the smaller segment it cuts off?",
          answer: "\\(154 - 98 = 56\\) square cm",
        },
      ],
      pyqExampleId: "535869b8-28b7-44e4-9d47-fd6e0e01e196",
      traps: [
        {
          title: "Minute hand or hour hand",
          body: "The minute hand turns \\(6^\\circ\\) a minute; the hour hand only \\(0.5^\\circ\\) a minute. In 20 minutes the minute hand sweeps \\(120^\\circ\\), a third of the circle.",
        },
        {
          title: "Giving the sector when the segment is asked",
          body: "A segment is the sector minus the triangle formed by the two radii and the chord. A quarter circle of radius 21 cm is 346.5 square cm, but its segment is only \\(346.5 - 220.5 = 126\\) square cm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim2se-arc",
      name: "Arc length and the perimeter of a sector",
      intuition:
        "The curved edge of a sector is the same fraction of the circumference as its area is of the circle. Its perimeter adds the two straight radii to that curve.",
      definition:
        "- **Arc length** \\(l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r\\).\n" +
        "- **Perimeter of a sector** \\(= 2r + l\\): two radii and the arc.\n" +
        "- **Area from the arc**: \\(\\frac{1}{2}lr\\). This needs no angle at all, so use it when the perimeter is given.",
      formula: {
        label: "Arc and perimeter",
        latex: "l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r, \\qquad P = 2r + l, \\qquad A = \\frac{1}{2}lr",
        symbols: [{ symbol: "l", meaning: "length of the arc" }],
      },
      authoredExample: {
        prompt: "A sector has radius 21 cm and angle \\(60^\\circ\\) at the centre. Find its arc length, perimeter and area.",
        steps: [
          "Circumference \\(= 2 \\times \\frac{22}{7} \\times 21 = 132\\) cm, so the arc \\(= \\frac{60}{360} \\times 132 = 22\\) cm.",
          "Perimeter \\(= 2 \\times 21 + 22 = 64\\) cm.",
          "Area \\(= \\frac{1}{2} \\times 22 \\times 21 = 231\\) square cm.",
        ],
        answer: "22 cm, 64 cm and 231 square cm",
      },
      selfCheckExample: {
        prompt: "A sector has radius 10 cm and perimeter 32 cm. Find its area.",
        steps: ["Arc \\(= 32 - 2 \\times 10 = 12\\) cm.", "Area \\(= \\frac{1}{2} \\times 12 \\times 10 = 60\\) square cm."],
        answer: "60 square cm",
      },
      practiceSet: [
        { prompt: "A sector has an arc of 10 cm and a radius of 6 cm. What is its area?", answer: "30 square cm" },
        { prompt: "A sector of radius 8 cm has a perimeter of 30 cm. What is the length of its arc?", answer: "14 cm" },
        { prompt: "What is the arc length of a quarter circle of radius 14 cm?", answer: "\\(\\frac{88}{4} = 22\\) cm" },
      ],
      pyqExampleId: "a47041de-b945-411b-9d1f-3e50f4102c3b",
      traps: [
        {
          title: "Forgetting the second radius",
          body: "A sector's perimeter has two straight edges. Arc \\(=\\) perimeter \\(- 2r\\), not perimeter \\(- r\\).",
        },
        {
          title: "Hunting for the angle",
          body: "If the arc is known, the area is \\(\\frac{1}{2}lr\\) at once. There is no need to find the angle first.",
        },
      ],
    },
  ],
};
