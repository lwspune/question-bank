import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M2_RECTANGLES_NOTE: SubtopicNote = {
  subtopicName: "Rectangles, Squares and Triangles",
  title: "Rectangles, Squares and Triangles",
  oneLineDefinition:
    "Perimeter is the distance round a shape and area is the space it covers; for a rectangle they are 2(l + b) and l × b.",
  whyItMatters:
    "Thirteen questions in the bank, two of them from the 2022 paper: ten EASY and three MODERATE. Rounds of a park, carpeting a room, sides in a ratio, the diagonal of a hall and the area of a regular hexagon. Most marks are lost on mixing perimeter with area, or metres with centimetres.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim2rs-rectangle",
      name: "Perimeter, area and cost of a rectangle",
      intuition:
        "Walk round a field and you cover its perimeter; lay carpet in it and you cover its area. Fencing is paid by the metre of perimeter, carpeting by the square metre of area.",
      definition:
        "- **Perimeter** \\(= 2(l + b)\\); **area** \\(= l \\times b\\). For a square of side \\(a\\): \\(4a\\) and \\(a^2\\).\n" +
        "- **Sides in a ratio** \\(m : n\\): write them as \\(mk\\) and \\(nk\\), then find \\(k\\) from the perimeter or the area.\n" +
        "- **Cost** of carpeting or tiling \\(=\\) area \\(\\times\\) rate. Fencing \\(=\\) perimeter \\(\\times\\) rate.\n" +
        "- At the same rate, cost goes with area. If the length stays fixed, cost goes with the breadth alone.",
      formula: {
        label: "Rectangle and square",
        latex: "P = 2(l + b), \\quad A = lb, \\quad P_{\\text{square}} = 4a, \\quad A_{\\text{square}} = a^2",
        symbols: [
          { symbol: "l, b", meaning: "length and breadth" },
          { symbol: "a", meaning: "side of the square" },
        ],
      },
      authoredExample: {
        prompt: "The length and breadth of a rectangle are in the ratio 5 : 3 and its perimeter is 64 cm. Find its area.",
        steps: [
          "Sides \\(5k\\) and \\(3k\\): \\(2(5k + 3k) = 16k = 64\\), so \\(k = 4\\).",
          "Sides are 20 cm and 12 cm.",
          "Area \\(= 20 \\times 12 = 240\\) square cm.",
        ],
        answer: "240 square cm",
      },
      selfCheckExample: {
        prompt: "Carpeting a room 12 m long costs ₹1800 at ₹25 per square m. Find the breadth of the room.",
        steps: [
          "Area \\(= 1800 \\div 25 = 72\\) square m.",
          "Breadth \\(= 72 \\div 12 = 6\\) m.",
        ],
        answer: "6 m",
      },
      practiceSet: [
        { prompt: "A park is 40 m long and 20 m wide. How far does a runner go in 15 rounds of it?", answer: "\\(15 \\times 120 = 1800\\) m" },
        { prompt: "A square has a perimeter of 36 cm. What is its area?", answer: "Side 9 cm, area 81 square cm" },
        { prompt: "The length of a rectangle is \\(\\frac{3}{2}\\) of its breadth and its perimeter is 50 m. What is its area?", answer: "Breadth 10 m, length 15 m, area 150 square m" },
        {
          prompt: "Carpeting a room costs ₹600. At the same rate, what would a room of the same length but half the breadth cost?",
          answer: "₹300",
        },
      ],
      pyqExampleId: "39fe7103-4650-4f7c-8d29-293211cb45e2",
      traps: [
        {
          title: "Perimeter where area is needed",
          body: "Fencing and walking round use the perimeter; carpeting, tiling and painting use the area. Decide which before you multiply by the rate.",
        },
        {
          title: "Forgetting to halve the perimeter",
          body: "A perimeter of 30 cm means \\(l + b = 15\\) cm, not 30 cm. Divide by 2 before splitting the sum in a ratio.",
        },
        {
          title: "Counting rectangles with a fixed perimeter",
          body:
            "Infinitely many rectangles have a perimeter of 14 cm. Only if the sides must be whole centimetres is the answer a count: \\(l + b = 7\\) gives 1 by 6, 2 by 5 and 3 by 4, so three.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim2rs-diagonal",
      name: "Diagonals of rectangles and squares",
      intuition:
        "A diagonal cuts a rectangle into two right triangles, with the diagonal as the hypotenuse. Pythagoras connects the two sides and the diagonal.",
      definition:
        "- **Rectangle**: \\(d^2 = l^2 + b^2\\).\n" +
        "- **Square**: \\(d = a\\sqrt{2}\\), so the area is \\(\\frac{d^2}{2}\\).\n" +
        "- Put both sides in the same unit before squaring.\n" +
        "- Whole-number sets worth knowing: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25 (and their multiples).",
      formula: {
        label: "Diagonals",
        latex: "d = \\sqrt{l^2 + b^2}, \\qquad d_{\\text{square}} = a\\sqrt{2}, \\qquad A_{\\text{square}} = \\frac{d^2}{2}",
      },
      authoredExample: {
        prompt: "A rectangle has length 24 cm and diagonal 25 cm. Find its breadth and its area.",
        steps: [
          "\\(b = \\sqrt{25^2 - 24^2} = \\sqrt{625 - 576} = \\sqrt{49} = 7\\) cm.",
          "Area \\(= 24 \\times 7 = 168\\) square cm.",
        ],
        answer: "7 cm and 168 square cm",
      },
      selfCheckExample: {
        prompt: "The sides of a rectangle are in the ratio 5 : 12 and its diagonal is 26 cm. Find its area.",
        steps: [
          "Sides \\(5k\\) and \\(12k\\): diagonal \\(= 13k = 26\\), so \\(k = 2\\).",
          "Sides 10 cm and 24 cm, area \\(= 240\\) square cm.",
        ],
        answer: "240 square cm",
      },
      practiceSet: [
        { prompt: "A square has a diagonal of 10 cm. What is its area?", answer: "\\(\\frac{100}{2} = 50\\) square cm" },
        { prompt: "A square has an area of 49 square cm. What are its side and its perimeter?", answer: "7 cm and 28 cm" },
        { prompt: "A rectangle is 0.6 m long and 80 cm wide. How long is its diagonal?", answer: "\\(\\sqrt{60^2 + 80^2} = 100\\) cm" },
        { prompt: "The side of one square is three times the side of another. What is the ratio of their areas?", answer: "9 : 1" },
      ],
      pyqExampleId: "cc6b4c6f-8bb3-4b16-8a67-1b3e5eb7bd0f",
      traps: [
        {
          title: "Mixing metres and centimetres",
          body: "A hall 0.5 m by 30 cm must become 50 cm by 30 cm before squaring. Options often print the same number in both units, so check the unit too.",
        },
        {
          title: "Doubling the diagonal doubles the area",
          body: "It does not. A square's area is \\(\\frac{d^2}{2}\\), so twice the diagonal gives four times the area.",
        },
        {
          title: "Side or perimeter from an area",
          body: "A square of area 81 square cm has side \\(\\sqrt{81} = 9\\) cm. Its perimeter, 36 cm, is the usual wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim2rs-triangle",
      name: "Triangles and the regular hexagon",
      intuition:
        "Every triangle is half of a rectangle with the same base and height. A regular hexagon splits from its centre into six equal equilateral triangles.",
      definition:
        "- **Any triangle**: area \\(= \\frac{1}{2} \\times\\) base \\(\\times\\) height. In a right triangle the two shorter sides are the base and height.\n" +
        "- **Equilateral triangle** of side \\(a\\): perimeter \\(3a\\), area \\(\\frac{\\sqrt{3}}{4}a^2\\).\n" +
        "- **Regular hexagon** of side \\(a\\): six equilateral triangles of side \\(a\\), so area \\(= 6 \\times \\frac{\\sqrt{3}}{4}a^2 = \\frac{3\\sqrt{3}}{2}a^2\\).",
      formula: {
        label: "Triangle and hexagon",
        latex:
          "A = \\frac{1}{2}bh, \\quad A_{\\text{equilateral}} = \\frac{\\sqrt{3}}{4}a^2, \\quad A_{\\text{hexagon}} = 6 \\times \\frac{\\sqrt{3}}{4}a^2 = \\frac{3\\sqrt{3}}{2}a^2",
      },
      authoredExample: {
        prompt: "Find the area of a regular hexagon of side 6 cm.",
        steps: [
          "It is six equilateral triangles of side 6 cm.",
          "One triangle \\(= \\frac{\\sqrt{3}}{4} \\times 36 = 9\\sqrt{3}\\) square cm.",
          "Hexagon \\(= 6 \\times 9\\sqrt{3} = 54\\sqrt{3}\\) square cm.",
        ],
        answer: "\\(54\\sqrt{3}\\) square cm",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle has a perimeter of 24 cm. Find its area.",
        steps: ["Side \\(= 24 \\div 3 = 8\\) cm.", "Area \\(= \\frac{\\sqrt{3}}{4} \\times 64 = 16\\sqrt{3}\\) square cm."],
        answer: "\\(16\\sqrt{3}\\) square cm",
      },
      practiceSet: [
        { prompt: "A right triangle has base 12 cm and height 7 cm. What is its area?", answer: "42 square cm" },
        { prompt: "What is the area of an equilateral triangle of side 10 cm?", answer: "\\(25\\sqrt{3}\\) square cm" },
        { prompt: "What is the area of a regular hexagon of side 10 cm?", answer: "\\(6 \\times 25\\sqrt{3} = 150\\sqrt{3}\\) square cm" },
        { prompt: "A triangle has area 45 square cm and height 9 cm. What is its base?", answer: "10 cm" },
      ],
      pyqExampleId: "4b6d17ec-e6d7-4d30-a678-b51105e0305a",
      traps: [
        {
          title: "Forgetting the half",
          body: "A triangle's area is half of base times height. Base 10 cm and height 6 cm give 30 square cm, not 60.",
        },
        {
          title: "Too few triangles in a hexagon",
          body: "A regular hexagon is six equilateral triangles, so multiply one triangle's area by 6. A hexagon of side 3 cm is \\(6 \\times \\frac{9\\sqrt{3}}{4} = \\frac{27\\sqrt{3}}{2}\\) square cm, not \\(\\frac{9\\sqrt{3}}{4}\\).",
        },
      ],
    },
  ],
};
