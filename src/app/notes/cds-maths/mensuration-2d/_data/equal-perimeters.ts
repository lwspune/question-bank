import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_EQUAL_PERIMETERS_NOTE: SubtopicNote = {
  subtopicName: "Equal Perimeters and Re-bent Wires",
  title: "Equal Perimeters & Re-bent Wires",
  oneLineDefinition:
    "A wire keeps its length when it is bent into a new shape, so the perimeter carries over; and for a fixed perimeter the rounder shape encloses more area.",
  whyItMatters:
    "A family CDS returns to in most years, usually as a quick question: find the length, then the new shape's side or radius. The comparison version (circle against square against triangle) is worth memorising as a ranking, because it needs no working at all.",
  concepts: [
    // C1 — the wire keeps its length
    {
      kind: "formula" as const,
      slug: "cdsm2-same-wire",
      name: "The wire keeps its length",
      intuition:
        "Re-bending changes the shape, never the length. So every question has the same two steps: turn the first shape into a length (its perimeter), then turn that length into the second shape.",
      definition:
        "- Circle: length \\(2\\pi r\\). Square: \\(4s\\). Equilateral triangle: \\(3a\\). Rhombus: \\(4a\\).\n" +
        "- Semicircle: \\(\\pi r + 2r\\), because the diameter is part of the boundary.\n" +
        "- Sector: arc plus two radii.\n" +
        "- A wire cut into two pieces: the two perimeters add to the total length.",
      formula: {
        label: "Length is conserved",
        latex: "\\text{perimeter of the old shape} = \\text{perimeter of the new shape}",
      },
      authoredExample: {
        prompt: "A wire bent into a circle of radius \\(21\\) cm is re-bent into a square. Find the area of the square. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Length \\(= 2\\times\\dfrac{22}{7}\\times 21 = 132\\) cm.",
          "The square's side is \\(\\dfrac{132}{4} = 33\\) cm.",
          "Its area is \\(33^2 = 1089\\) cm\\(^2\\).",
        ],
        answer: "\\(1089\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A wire \\(20\\) m long is cut in two. One piece is bent into a circle and the other into a square that just encloses that circle. Find the radius.",
        steps: [
          "A square that encloses a circle touching all four sides has side \\(2r\\), so its perimeter is \\(8r\\).",
          "\\(2\\pi r + 8r = 20\\), so \\(r = \\dfrac{20}{2\\pi + 8} = \\dfrac{10}{\\pi + 4}\\) m.",
        ],
        answer: "\\(\\dfrac{10}{\\pi + 4}\\) m.",
      },
      practiceSet: [
        { prompt: "Square of area \\(64\\) re-bent into an equilateral triangle: its side?", answer: "\\(\\dfrac{32}{3}\\)" },
        { prompt: "Circle of radius \\(14\\) re-bent into a rhombus: its side? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(22\\)" },
        { prompt: "Semicircle of radius \\(7\\): its boundary length? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(36\\)" },
        { prompt: "Square of side \\(11\\) re-bent into a circle: radius? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(7\\)" },
      ],
      pyqExampleId: "2e2847ab-8c88-4bbf-8a20-cc1cbbf4afca", // 2017 (I) — square of area 121 re-bent into a circle
      traps: [
        {
          title: "A semicircle's boundary includes the diameter",
          body:
            "A wire bent into a semicircle forms the arc AND the straight diameter: \\(\\pi r + 2r\\). Using \\(\\pi r\\) alone gives a larger radius. When no printed option matches either reading, 'None of the above' is the answer the paper wants.",
        },
      ],
    },

    // C2 — the ranking for equal perimeter
    {
      kind: "formula" as const,
      slug: "cdsm2-equal-perimeter-ranking",
      name: "Same perimeter: the rounder shape wins",
      intuition:
        "For a fixed length of boundary, the circle encloses the most area, then the square, then the equilateral triangle. The ratios all follow from writing each area in terms of the common perimeter \\(P\\).",
      definition:
        "With a common perimeter \\(P\\):\n" +
        "- Equilateral triangle: \\(\\dfrac{\\sqrt3P^2}{36} \\approx 0.048P^2\\).\n" +
        "- Square: \\(\\dfrac{P^2}{16} = 0.0625P^2\\).\n" +
        "- Circle: \\(\\dfrac{P^2}{4\\pi} \\approx 0.080P^2\\).\n" +
        "So triangle \\(<\\) square \\(<\\) circle. Circle : square \\(= 4 : \\pi = 14 : 11\\) with \\(\\pi = \\tfrac{22}{7}\\).\n" +
        "Turned round, for **equal areas** the circle has the smaller perimeter: circle : square \\(= \\sqrt\\pi : 2\\).",
      formula: {
        label: "Equal perimeter",
        latex: "\\frac{\\text{circle}}{\\text{square}} = \\frac{4}{\\pi}, \\qquad \\frac{\\text{triangle}}{\\text{square}} = \\frac{4\\sqrt3}{9}",
      },
      authoredExample: {
        prompt: "A square and a regular hexagon have the same perimeter \\(P\\). Which has the larger area?",
        steps: [
          "Square: side \\(\\dfrac{P}{4}\\), area \\(\\dfrac{P^2}{16} = 0.0625P^2\\).",
          "Hexagon: side \\(\\dfrac{P}{6}\\), area \\(\\dfrac{3\\sqrt3}{2}\\left(\\dfrac{P}{6}\\right)^2 = \\dfrac{\\sqrt3P^2}{24} \\approx 0.072P^2\\).",
          "The hexagon is larger. More sides means rounder, and rounder means more area.",
        ],
        answer: "The hexagon.",
      },
      selfCheckExample: {
        prompt: "A circle and a square have equal areas. Find the ratio of the circle's perimeter to the square's.",
        steps: [
          "\\(\\pi r^2 = s^2\\) gives \\(s = r\\sqrt\\pi\\).",
          "\\(\\dfrac{2\\pi r}{4s} = \\dfrac{2\\pi r}{4r\\sqrt\\pi} = \\dfrac{\\sqrt\\pi}{2}\\).",
        ],
        answer: "\\(\\sqrt\\pi : 2\\).",
      },
      practiceSet: [
        { prompt: "Equal perimeters: which encloses least — triangle, square or circle?", answer: "The equilateral triangle" },
        { prompt: "Equal perimeters: circle area : square area?", answer: "\\(4 : \\pi\\)" },
        { prompt: "Equal perimeters, \\(\\pi = \\tfrac{22}{7}\\): circle : square?", answer: "\\(14 : 11\\)" },
        { prompt: "Equal perimeters: triangle area : square area?", answer: "\\(4\\sqrt3 : 9\\)" },
      ],
      pyqExampleId: "78e491a4-72d8-4e41-8e60-6edeca01e4da", // 2018 (II) — T, S, C for equal perimeter
      traps: [
        {
          title: "Equal perimeter and equal area flip the answer",
          body:
            "Equal perimeters: the circle has the MORE area. Equal areas: the circle has the LESS perimeter. Both are the same fact, so read which quantity the stem fixes before choosing.",
        },
      ],
    },

    // C3 — square beats rectangle
    {
      kind: "formula" as const,
      slug: "cdsm2-square-beats-rectangle",
      name: "Same perimeter: the square beats every rectangle",
      intuition:
        "A rectangle and a square with the same perimeter have the same \\(l + b\\). The square's area exceeds the rectangle's by exactly the square of half the difference of the sides.",
      definition:
        "If \\(4s = 2(l + b)\\), then \\(s = \\dfrac{l + b}{2}\\) and \\(s^2 - lb = \\left(\\dfrac{l - b}{2}\\right)^2\\).\n" +
        "- So the square always has the larger area, and the rectangle of largest area for a given perimeter is the square.\n" +
        "- If the areas differ by \\(q\\), then \\((l - b)^2 = 4q\\).",
      formula: {
        label: "Square minus rectangle",
        latex: "s^2 - lb = \\left(\\frac{l-b}{2}\\right)^2",
      },
      authoredExample: {
        prompt: "A square and a rectangle have the same perimeter, and the square's area is \\(9\\) cm\\(^2\\) more. By how much does the rectangle's length exceed its breadth?",
        steps: [
          "\\(\\left(\\dfrac{l - b}{2}\\right)^2 = 9\\).",
          "\\(\\dfrac{l - b}{2} = 3\\), so \\(l - b = 6\\) cm.",
        ],
        answer: "\\(6\\) cm.",
      },
      selfCheckExample: {
        prompt: "What is the largest area a rectangle with perimeter \\(60\\) m can enclose?",
        steps: [
          "The largest is the square, with side \\(\\dfrac{60}{4} = 15\\) m.",
          "Its area is \\(225\\) m\\(^2\\).",
        ],
        answer: "\\(225\\) m\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Rectangle \\(9\\times 5\\) and a square of the same perimeter: difference in area?", answer: "\\(4\\)" },
        { prompt: "Perimeter \\(24\\): maximum rectangle area?", answer: "\\(36\\)" },
        { prompt: "Areas differ by \\(16\\): \\(l - b\\)?", answer: "\\(8\\)" },
        { prompt: "Areas differ by \\(q\\): \\((l - b)^2\\)?", answer: "\\(4q\\)" },
      ],
      pyqExampleId: "3a07c9ed-dc50-4048-8203-896c0cbdd336", // 2022 (II) — areas differ by 1 square cm
    },
  ],
};
