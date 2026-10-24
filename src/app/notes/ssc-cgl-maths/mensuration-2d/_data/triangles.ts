import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M2_TRIANGLES_NOTE: SubtopicNote = {
  subtopicName: "Areas of Triangles",
  title: "Areas of Triangles",
  oneLineDefinition:
    "A triangle's area is half its base times its height; when the height is not given, use two sides and the angle between them, or all three sides.",
  whyItMatters:
    "Twenty-one questions in the bank, nineteen EASY and two MODERATE, ten of them from the 2025 shifts. Equilateral triangles and regular hexagons come up again and again, so their formulas are worth knowing by heart. The scaling rule on this page also settles every 'side doubled' or 'area up by 44%' question in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm2tr-baseheight",
      name: "Half base times height, and two sides with the angle between them",
      intuition:
        "Every triangle is half of a parallelogram with the same base and height, so its area is half of base times height. When the height is not given but two sides and the angle between them are, the sine of that angle supplies the height.",
      definition:
        "- Area \\(= \\frac{1}{2} \\times \\text{base} \\times \\text{height}\\), where the height is drawn **perpendicular** to that base. Any side can be the base if you use the height to it.\n" +
        "- In a **right triangle**, the two legs are a base and its height: area \\(= \\frac{1}{2} \\times\\) leg \\(\\times\\) leg.\n" +
        "- A **right isosceles** triangle with legs \\(a\\) has area \\(\\frac{a^2}{2}\\) and hypotenuse \\(a\\sqrt{2}\\).\n" +
        "- **Two sides and the included angle:** area \\(= \\frac{1}{2}ab\\sin C\\). Values to know: \\(\\sin 30^\\circ = \\sin 150^\\circ = \\frac{1}{2}\\), \\(\\sin 60^\\circ = \\sin 120^\\circ = \\frac{\\sqrt{3}}{2}\\), \\(\\sin 90^\\circ = 1\\).\n" +
        "- **Comparing triangles:** area ratio \\(=\\) base ratio \\(\\times\\) height ratio. With equal heights, areas are in the ratio of the bases; with equal areas, bases and heights are in inverse ratio.\n" +
        "- **Fast route:** when two triangles share a height, skip the area and divide the bases straight in the area ratio. Safe only when the heights really are equal.",
      formula: {
        label: "Area of a triangle",
        latex: "A = \\frac{1}{2}bh \\qquad A = \\frac{1}{2}ab\\sin C",
        symbols: [
          { symbol: "b, h", meaning: "a base and the perpendicular height to it" },
          { symbol: "a, b, C", meaning: "two sides and the angle between them" },
        ],
      },
      authoredExample: {
        prompt: "A triangle has a base of 18 cm and an area of 108 cm². A second triangle has the same height and an area of 72 cm². Find the height, and the base of the second triangle.",
        steps: [
          "Height: \\(\\frac{1}{2} \\times 18 \\times h = 108\\), so \\(h = \\frac{216}{18} = 12\\) cm.",
          "Second base: \\(\\frac{1}{2} \\times b \\times 12 = 72\\), so \\(b = 12\\) cm.",
          "Fast route: the heights are equal, so the bases are in the ratio of the areas, \\(108 : 72 = 3 : 2\\). The second base is \\(18 \\times \\frac{2}{3} = 12\\) cm.",
        ],
        answer: "Height 12 cm, second base 12 cm",
      },
      selfCheckExample: {
        prompt: "Two sides of a triangle are 12 cm and 9 cm and the angle between them is 30°. Find the area.",
        steps: ["Area \\(= \\frac{1}{2} \\times 12 \\times 9 \\times \\sin 30^\\circ = 54 \\times \\frac{1}{2} = 27\\ \\text{cm}^2\\)."],
        answer: "\\(27\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A right triangle has legs of 9 cm and 14 cm. What is its area?", answer: "\\(63\\ \\text{cm}^2\\)" },
        { prompt: "A right isosceles triangle has legs of 8 cm. What is its area?", answer: "\\(32\\ \\text{cm}^2\\)" },
        { prompt: "Two triangles have equal areas and their bases are in the ratio 3 : 4. What is the ratio of their heights?", answer: "4 : 3" },
        {
          prompt: "Two sides of a triangle are 6 cm and 10 cm and the angle between them is 150°. What is its area?",
          answer: "\\(15\\ \\text{cm}^2\\)",
          method: "\\(\\frac{1}{2} \\times 6 \\times 10 \\times \\frac{1}{2} = 15\\).",
        },
      ],
      pyqExampleId: "3b968dd9-a226-4728-a4bf-f0751cd3f48a",
      traps: [
        {
          title: "Pairing a base with the wrong height",
          body: "The height must be perpendicular to the side you call the base. A slanting side is not a height unless the triangle has a right angle there.",
        },
        {
          title: "Reading an area ratio as a base ratio",
          body: "Area ratio is base ratio times height ratio. Areas \\(5 : 3\\) with heights \\(5 : 7\\) give bases \\(\\frac{5}{3} \\div \\frac{5}{7} = 7 : 3\\), not \\(5 : 3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2tr-heron",
      name: "Three sides: semi-perimeter, Heron's formula and the inradius",
      intuition:
        "Three sides fix a triangle completely, so they must fix its area too. Heron's formula does it with the semi-perimeter alone. The same semi-perimeter links the area to the circle that fits inside the triangle.",
      definition:
        "- **Semi-perimeter** \\(s = \\frac{a + b + c}{2}\\), half the perimeter.\n" +
        "- **Heron's formula:** area \\(= \\sqrt{s(s - a)(s - b)(s - c)}\\).\n" +
        "- **Check for a right angle first.** If \\(a^2 + b^2 = c^2\\) (as with 8, 15, 17), the area is simply half the product of the two shorter sides. This fast route is safe only when the squares really add up.\n" +
        "- **Isosceles** triangle with equal sides \\(a\\) and base \\(b\\): the height bisects the base, so height \\(= \\sqrt{a^2 - \\frac{b^2}{4}}\\) and area \\(= \\frac{b}{4}\\sqrt{4a^2 - b^2}\\).\n" +
        "- **Inradius:** the circle that touches all three sides has radius \\(r\\), and area \\(= r \\times s\\). For a right triangle, \\(r = \\frac{a + b - c}{2}\\) with \\(c\\) the hypotenuse.",
      formula: {
        label: "Heron's formula and the inradius",
        latex: "s = \\frac{a + b + c}{2} \\qquad A = \\sqrt{s(s - a)(s - b)(s - c)} \\qquad A = rs \\qquad A_{\\text{isosceles}} = \\frac{b}{4}\\sqrt{4a^2 - b^2}",
        symbols: [
          { symbol: "s", meaning: "semi-perimeter" },
          { symbol: "r", meaning: "radius of the inscribed circle" },
        ],
      },
      authoredExample: {
        prompt: "Find the area of a triangle whose sides are 13 cm, 14 cm and 15 cm.",
        steps: [
          "\\(s = \\frac{13 + 14 + 15}{2} = 21\\).",
          "\\(s - a = 8\\), \\(s - b = 7\\), \\(s - c = 6\\).",
          "Area \\(= \\sqrt{21 \\times 8 \\times 7 \\times 6} = \\sqrt{7056} = 84\\ \\text{cm}^2\\).",
          "Check that it is not a right triangle: \\(13^2 + 14^2 = 365 \\ne 225\\), so Heron was needed.",
        ],
        answer: "\\(84\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "An isosceles triangle has two equal sides of 10 cm and a base of 12 cm. Find its area.",
        steps: [
          "The height bisects the base: height \\(= \\sqrt{10^2 - 6^2} = 8\\) cm.",
          "Area \\(= \\frac{1}{2} \\times 12 \\times 8 = 48\\ \\text{cm}^2\\).",
          "Check by Heron: \\(s = 16\\), \\(\\sqrt{16 \\times 6 \\times 6 \\times 4} = \\sqrt{2304} = 48\\).",
        ],
        answer: "\\(48\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A triangle has sides of 7 cm, 8 cm and 9 cm. What is its semi-perimeter?", answer: "12 cm" },
        { prompt: "A triangle has sides of 9 cm, 12 cm and 15 cm. What is its area?", answer: "\\(54\\ \\text{cm}^2\\)", method: "\\(9^2 + 12^2 = 15^2\\), so the area is \\(\\frac{1}{2} \\times 9 \\times 12\\)." },
        { prompt: "A triangle has an area of 84 cm² and a semi-perimeter of 21 cm. What is the radius of its inscribed circle?", answer: "4 cm" },
        {
          prompt: "A triangle has sides of 8 cm, 15 cm and 17 cm. What is the radius of its inscribed circle?",
          answer: "3 cm",
          method: "Right triangle: area \\(= 60\\), \\(s = 20\\), \\(r = \\frac{60}{20}\\).",
        },
      ],
      pyqExampleId: "0707bc52-fb9b-42f1-9317-c8db5d5508c4",
      traps: [
        {
          title: "Putting the perimeter into Heron's formula",
          body: "Heron uses the SEMI-perimeter \\(s\\). With the full perimeter every bracket is wrong and the answer is far too large.",
        },
        {
          title: "Running Heron on a right triangle",
          body: "Sides such as 7, 24, 25 or 15, 20, 25 form a right triangle. Half the product of the two shorter sides gives the area in one step.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2tr-equilateral",
      name: "Area of an equilateral triangle and a regular hexagon",
      intuition:
        "An equilateral triangle has one size number, its side, so its height and area follow from that alone. Six equilateral triangles meeting at a point make a regular hexagon, so the hexagon needs nothing new.",
      definition:
        "- Equilateral triangle of side \\(a\\): perimeter \\(3a\\), height \\(\\frac{\\sqrt{3}}{2}a\\), area \\(\\frac{\\sqrt{3}}{4}a^2\\).\n" +
        "- **Regular hexagon** of side \\(a\\): six equilateral triangles of side \\(a\\), so area \\(= 6 \\times \\frac{\\sqrt{3}}{4}a^2 = \\frac{3\\sqrt{3}}{2}a^2\\). Its perimeter is \\(6a\\).\n" +
        "- A hexagon is therefore 6 times the equilateral triangle on the same side.\n" +
        "- **Fast route:** \\(\\frac{\\sqrt{3}}{4}a^2 = \\left(\\frac{a}{2}\\right)^2\\sqrt{3}\\). Halve the side, square it, attach \\(\\sqrt{3}\\): side 16 gives \\(64\\sqrt{3}\\). Always safe for an equilateral triangle.\n" +
        "- When a decimal answer is wanted, use \\(\\sqrt{3} \\approx 1.732\\).",
      formula: {
        label: "Equilateral triangle and regular hexagon",
        latex: "A = \\frac{\\sqrt{3}}{4}a^2 \\qquad h = \\frac{\\sqrt{3}}{2}a \\qquad A_{\\text{hexagon}} = \\frac{3\\sqrt{3}}{2}a^2",
        symbols: [{ symbol: "a", meaning: "side of the triangle or hexagon" }],
      },
      authoredExample: {
        prompt: "An equilateral triangle has a perimeter of 30 cm. Find its area and its height.",
        steps: [
          "Side \\(= \\frac{30}{3} = 10\\) cm.",
          "Area \\(= \\frac{\\sqrt{3}}{4} \\times 100 = 25\\sqrt{3}\\ \\text{cm}^2\\). Fast route: \\(\\left(\\frac{10}{2}\\right)^2 = 25\\), so \\(25\\sqrt{3}\\).",
          "Height \\(= \\frac{\\sqrt{3}}{2} \\times 10 = 5\\sqrt{3}\\) cm.",
        ],
        answer: "Area \\(25\\sqrt{3}\\ \\text{cm}^2\\), height \\(5\\sqrt{3}\\) cm",
      },
      selfCheckExample: {
        prompt: "A regular hexagon has sides of 8 cm. Find its area.",
        steps: [
          "One equilateral triangle of side 8: \\(\\left(\\frac{8}{2}\\right)^2\\sqrt{3} = 16\\sqrt{3}\\).",
          "Hexagon \\(= 6 \\times 16\\sqrt{3} = 96\\sqrt{3}\\ \\text{cm}^2\\).",
        ],
        answer: "\\(96\\sqrt{3}\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "An equilateral triangle has sides of 14 cm. What is its area?", answer: "\\(49\\sqrt{3}\\ \\text{cm}^2\\)" },
        { prompt: "An equilateral triangle has a height of \\(9\\sqrt{3}\\) cm. What is its side?", answer: "18 cm" },
        { prompt: "A regular hexagon has a perimeter of 36 cm. What is its area?", answer: "\\(54\\sqrt{3}\\ \\text{cm}^2\\)", method: "Side 6, and \\(6 \\times 9\\sqrt{3}\\)." },
        { prompt: "An equilateral triangle has an area of \\(100\\sqrt{3}\\) cm². What is its side?", answer: "20 cm", method: "\\(\\left(\\frac{a}{2}\\right)^2 = 100\\), so \\(a = 20\\)." },
      ],
      pyqExampleId: "57e48343-5295-4a6d-acb9-f4f5204a751f",
      traps: [
        {
          title: "Mixing up the height and the area",
          body: "The height of an equilateral triangle is \\(\\frac{\\sqrt{3}}{2}a\\), a length. The area is \\(\\frac{\\sqrt{3}}{4}a^2\\). Writing \\(\\frac{\\sqrt{3}}{2}a^2\\) for the area doubles it.",
        },
        {
          title: "Taking a hexagon as three triangles",
          body: "Lines from the centre to the six corners cut a regular hexagon into SIX equilateral triangles, each with the hexagon's side.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2tr-scaling",
      name: "Similar figures: scale the sides, square the area",
      intuition:
        "Make every length of a figure twice as long and it holds four copies of the old one, two along and two across. Area always grows as the square of the length scale, whatever the shape.",
      definition:
        "- Two figures of the **same shape** (two squares, two equilateral triangles, two regular hexagons, two regular polygons with the same number of sides) are similar.\n" +
        "- If every side is multiplied by \\(k\\), the area is multiplied by \\(k^2\\). So area ratio \\(= (\\text{side ratio})^2\\), and side ratio \\(= \\sqrt{\\text{area ratio}}\\).\n" +
        "- **Percentages:** a side up by \\(x\\%\\) makes the area change by \\(2x + \\frac{x^2}{100}\\) percent. Up 50% gives \\(1.5^2 = 2.25\\), that is 125% more. Down 10% gives \\(0.9^2 = 0.81\\), that is 19% less.\n" +
        "- **When it breaks:** the rule needs every length scaled by the same factor. Doubling only the length of a rectangle doubles its area; it does not multiply it by 4.",
      formula: {
        label: "Scaling of area",
        latex: "\\frac{A_2}{A_1} = \\left(\\frac{s_2}{s_1}\\right)^2 \\qquad \\text{area change} = 2x + \\frac{x^2}{100}\\ \\%",
        symbols: [
          { symbol: "\\(s_1, s_2\\)", meaning: "matching sides of the two figures" },
          { symbol: "x", meaning: "percentage change in every side" },
        ],
      },
      authoredExample: {
        prompt: "The side of a square is increased by 30%. By what percentage does its area increase?",
        steps: [
          "Full method: new side \\(= 1.3a\\), new area \\(= 1.69a^2\\), so the area rises by 69%.",
          "Fast route: \\(30 + 30 + \\frac{30 \\times 30}{100} = 60 + 9 = 69\\%\\).",
        ],
        answer: "69%",
      },
      selfCheckExample: {
        prompt: "Two equilateral triangles have areas in the ratio 16 : 25. The smaller one has a side of 12 cm. Find the side of the larger one.",
        steps: ["Side ratio \\(= \\sqrt{16} : \\sqrt{25} = 4 : 5\\).", "Larger side \\(= 12 \\times \\frac{5}{4} = 15\\) cm."],
        answer: "15 cm",
      },
      practiceSet: [
        { prompt: "The side of an equilateral triangle is tripled. How many times its old area is the new area?", answer: "9 times" },
        { prompt: "Two regular hexagons have sides of 3 cm and 5 cm. What is the ratio of their areas?", answer: "9 : 25" },
        { prompt: "The side of a square is decreased by 20%. By what percentage does its area decrease?", answer: "36%", method: "\\(0.8^2 = 0.64\\), so 36% less." },
        { prompt: "The area of a regular pentagon becomes 2.25 times as large while its shape stays the same. By what percentage did its side increase?", answer: "50%", method: "\\(\\sqrt{2.25} = 1.5\\)." },
      ],
      pyqExampleId: "de6cf1ed-818b-4f94-8c80-336ba520d6b0",
      traps: [
        {
          title: "Doubling the side doubles the area",
          body: "Area scales as the square of the side. Doubling every side of a figure makes its area 4 times as large; tripling makes it 9 times.",
        },
        {
          title: "A percentage change in area is not the side's change",
          body: "A side up by 10% raises the area by 21%, not 10%. Square the factor \\(1.1\\) to get \\(1.21\\).",
        },
      ],
    },
  ],
};
