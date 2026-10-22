import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AP_RECTANGLES_NOTE: SubtopicNote = {
  subtopicName: "Rectangles and Squares",
  title: "Rectangles and Squares: Area, Perimeter, Diagonal and Cost",
  oneLineDefinition:
    "Area is length × breadth, perimeter is twice their sum and the diagonal comes from Pythagoras; most questions give two facts and ask you to find the sides first.",
  whyItMatters:
    "Every other figure in the chapter is measured against these formulas, so the page is mostly EASY. Marks go on two slips: mixing up the perimeter with the area, and dividing the perimeter in a ratio before halving it. The cost, tile and path questions are the same formulas with one extra step.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afap-rect-basics",
      name: "Area, perimeter and diagonal of a rectangle and a square",
      intuition:
        "Area counts the unit squares that cover a shape; perimeter is the distance round its edge. A rectangle \\(l\\) by \\(b\\) holds \\(l \\times b\\) unit squares and has an edge of \\(l + b + l + b\\). Its diagonal is the hypotenuse of a right triangle with legs \\(l\\) and \\(b\\), so it comes from Pythagoras, which the Triangles page takes up properly.",
      definition:
        "- **Rectangle:** area \\(lb\\), perimeter \\(2(l + b)\\), diagonal \\(\\sqrt{l^2 + b^2}\\).\n" +
        "- **Square of side \\(a\\):** area \\(a^2\\), perimeter \\(4a\\), diagonal \\(a\\sqrt 2\\).\n" +
        "- **Square from its diagonal \\(d\\):** area \\(\\dfrac{d^2}{2}\\), because the side is \\(\\dfrac{d}{\\sqrt 2}\\).\n" +
        "- Area is in square units (cm², m²); perimeter and diagonal are lengths (cm, m).",
      formula: {
        label: "Rectangle and square",
        latex: "A = lb,\\quad P = 2(l + b),\\quad d = \\sqrt{l^2 + b^2};\\qquad A_{\\text{square}} = a^2 = \\dfrac{d^2}{2}",
      },
      authoredExample: {
        prompt: "A rectangle is 24 m long and 7 m wide. Find its area, perimeter and diagonal.",
        steps: [
          "Area \\(= 24 \\times 7 = 168\\) m².",
          "Perimeter \\(= 2(24 + 7) = 62\\) m.",
          "Diagonal \\(= \\sqrt{576 + 49} = \\sqrt{625} = 25\\) m.",
        ],
        answer: "168 m², 62 m, 25 m.",
      },
      selfCheckExample: {
        prompt: "The diagonal of a square is 12 cm. Find its area and its side.",
        steps: [
          "Area \\(= \\dfrac{12^2}{2} = 72\\) cm².",
          "Side \\(= \\dfrac{12}{\\sqrt 2} = 6\\sqrt 2\\) cm, and \\((6\\sqrt 2)^2 = 72\\) checks.",
        ],
        answer: "72 cm²; \\(6\\sqrt 2\\) cm.",
      },
      practiceSet: [
        { prompt: "Find the diagonal of a rectangle 15 cm by 8 cm.", answer: "\\(17\\) cm" },
        { prompt: "A square has a perimeter of 36 cm. Find its area.", answer: "\\(81\\) cm²", method: "The side is 9 cm." },
        { prompt: "A square has an area of 18 cm². Find its diagonal.", answer: "\\(6\\) cm", method: "\\(d^2 = 2 \\times 18 = 36\\)." },
        { prompt: "A rectangle of area 60 cm² is 12 cm long. Find its perimeter.", answer: "\\(34\\) cm", method: "The breadth is 5 cm." },
      ],
      pyqExampleId: "f8aa7c21-1f0d-477d-b438-836c6cd5eb24",
      traps: [
        {
          title: "A square from its diagonal",
          body: "A square with a diagonal of 6 cm has an area of \\(\\tfrac{36}{2} = 18\\) cm², not 36 cm². The diagonal is longer than the side by a factor of \\(\\sqrt 2\\).",
        },
        {
          title: "Perimeter is a length",
          body: "A 9 cm by 4 cm rectangle has area 36 cm² and perimeter 26 cm. Check the unit an option carries: cm² means an area was asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-rect-sides",
      name: "Finding the sides from two facts",
      intuition:
        "A rectangle has two unknowns, its length and its breadth, so it needs two facts. The perimeter gives their sum; a ratio, a difference, the area or the diagonal gives the second equation.",
      definition:
        "- Half the perimeter is \\(l + b\\). Halve first, then split it in the ratio or use the difference.\n" +
        "- Sum and diagonal: \\((l + b)^2 - (l^2 + b^2) = 2lb\\), so the area comes out without finding \\(l\\) and \\(b\\).\n" +
        "- Two rectangles of equal area: \\(l_1 b_1 = l_2 b_2\\).\n" +
        "- A shape fact alone ('the length is twice the breadth') fixes no size. Statement questions turn on this: one fact about shape and one about size are needed together.\n" +
        "- With \\(a = lb\\) and \\(p = 2(l + b)\\), any claimed identity can be tested by substituting both.",
      formula: {
        label: "Two facts, two sides",
        latex: "l + b = \\dfrac{P}{2},\\qquad 2lb = (l + b)^2 - d^2",
      },
      authoredExample: {
        prompt: "A rectangle has a perimeter of 56 cm and its length and breadth are in the ratio \\(4 : 3\\). Find its area and its diagonal.",
        steps: [
          "\\(l + b = 56 \\div 2 = 28\\), which is 7 parts, so one part is 4 cm.",
          "\\(l = 16\\) cm and \\(b = 12\\) cm, so the area is \\(192\\) cm².",
          "Diagonal \\(= \\sqrt{256 + 144} = 20\\) cm.",
        ],
        answer: "192 cm²; 20 cm.",
      },
      selfCheckExample: {
        prompt: "The length of a rectangle is 5 cm more than its breadth and its perimeter is 50 cm. Find its area.",
        steps: [
          "\\(l + b = 25\\) and \\(l - b = 5\\), so \\(l = 15\\) and \\(b = 10\\).",
          "Area \\(= 15 \\times 10 = 150\\) cm².",
        ],
        answer: "150 cm².",
      },
      practiceSet: [
        { prompt: "A rectangle of area 84 cm² is 12 cm long. Find its perimeter.", answer: "\\(38\\) cm" },
        {
          prompt: "A rectangle has a perimeter of 28 cm and a diagonal of 10 cm. Find its area.",
          answer: "\\(48\\) cm²",
          method: "\\(2lb = 14^2 - 10^2 = 96\\).",
        },
        { prompt: "A 9 cm by 8 cm rectangle has the same area as one 12 cm long. Find the breadth of the second.", answer: "\\(6\\) cm" },
        { prompt: "A rectangle's length is twice its breadth and its area is 98 cm². Find its perimeter.", answer: "\\(42\\) cm", method: "\\(2b^2 = 98\\), so \\(b = 7\\)." },
      ],
      pyqExampleId: "f6a83896-2f73-46a8-926d-ec69517f87bd",
      traps: [
        {
          title: "Halve the perimeter before splitting it",
          body: "With a perimeter of 56 and a ratio of \\(4 : 3\\), split 28, not 56. Splitting the full perimeter doubles both sides and makes the area four times too big.",
        },
        {
          title: "Shape is not size",
          body: "'The length is three times the breadth' is true of a 3 by 1 rectangle and a 30 by 10 one. A statement like that needs a second fact about size before any area follows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-rect-costs",
      visualizationSlug: "af-path-around-lawn",
      name: "Fencing, flooring, tiles and paths",
      intuition:
        "A cost question asks which measure is being paid for. Fencing and borders go round the edge, so they use the perimeter; carpeting, paving and painting cover the surface, so they use the area. A path is the difference between two rectangles.",
      definition:
        "- **Cost** = perimeter × rate per metre (fencing), or area × rate per m² (flooring).\n" +
        "- **Tiles** = area of the floor ÷ area of one tile, both in the same unit.\n" +
        "- **Fewest square slabs** that fit exactly: the slab side is the HCF of the length and the breadth.\n" +
        "- **Path of width \\(w\\) outside** an \\(l\\) by \\(b\\) plot: \\((l + 2w)(b + 2w) - lb\\). **Inside:** \\(lb - (l - 2w)(b - 2w)\\).\n" +
        "- **Two crossing paths** through the middle: \\(w(l + b) - w^2\\), the square where they cross counted once.\n" +
        "- When the path's width is the unknown, the area left gives a quadratic. Keep only the root that fits inside the plot.",
      formula: {
        label: "Path outside a rectangle",
        latex: "\\text{path} = (l + 2w)(b + 2w) - lb = 2w(l + b) + 4w^2",
      },
      authoredExample: {
        prompt: "A lawn 30 m by 18 m has a path 3 m wide all round it, outside. Find the area of the path, and the cost of paving it at ₹15 per m².",
        steps: [
          "With the path, the outer rectangle is \\(36 \\times 24 = 864\\) m².",
          "The lawn is \\(30 \\times 18 = 540\\) m², so the path is \\(864 - 540 = 324\\) m².",
          "Check: \\(2 \\times 3 \\times 48 + 4 \\times 9 = 288 + 36 = 324\\).",
          "Cost \\(= 324 \\times 15 = 4{,}860\\).",
        ],
        answer: "324 m²; ₹4,860.",
      },
      selfCheckExample: {
        prompt: "A hall 9 m long and 4.2 m wide is to be paved with the fewest identical square tiles. Find the side of a tile and the number needed.",
        steps: [
          "In cm the hall is 900 by 420. The HCF of 900 and 420 is 60.",
          "Tiles of side 60 cm: \\(\\dfrac{900}{60} \\times \\dfrac{420}{60} = 15 \\times 7\\).",
        ],
        answer: "60 cm; 105 tiles.",
      },
      practiceSet: [
        { prompt: "Find the cost of fencing a 60 m by 40 m field at ₹12 per metre.", answer: "₹2,400" },
        { prompt: "How many 40 cm by 40 cm tiles cover a floor 6 m by 4 m?", answer: "\\(150\\)", method: "\\(24 \\div 0.16\\)." },
        { prompt: "A plot 25 m by 14 m has a path 1.5 m wide along its edges, inside. Find the area of the path.", answer: "\\(108\\) m²", method: "\\(350 - 22 \\times 11\\)." },
        { prompt: "Two paths 4 m wide cross through the middle of a 50 m by 30 m field, parallel to its sides. Find their total area.", answer: "\\(304\\) m²" },
      ],
      pyqExampleId: "7b8ea123-f9dd-48d9-a672-733deabd0105",
      traps: [
        {
          title: "A path adds its width on both sides",
          body: "A path 3 m wide round a 30 m lawn makes the outer length 36 m, not 33 m. The width is added at each end.",
        },
        {
          title: "Same units before dividing",
          body: "A 6 m by 4 m floor is 24 m², and a 40 cm tile is 0.16 m². Dividing 24 by 1,600 (the tile in cm²) gives nonsense.",
        },
        {
          title: "Throw out the root that cannot fit",
          body: "A quadratic for a path's width has two roots. A width that is more than half the plot's breadth would leave nothing inside, so it is rejected.",
        },
      ],
    },
  ],
};
