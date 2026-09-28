import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_QUADRILATERALS_NOTE: SubtopicNote = {
  subtopicName: "Rectangles, Squares and Other Quadrilaterals",
  title: "Rectangles, Squares & Other Quadrilaterals",
  oneLineDefinition:
    "Area and perimeter of rectangles, squares, rhombuses, parallelograms and trapeziums, and quadrilaterals cut into triangles.",
  whyItMatters:
    "As large as the triangle page, and a little harder, because the question usually hides a pair of equations (a sum and a product) or asks for a quadrilateral that must first be cut along a diagonal. The rhombus, with its perpendicular diagonals, is the single most repeated shape.",
  concepts: [
    // C1 — rectangle and square as equations
    {
      kind: "formula" as const,
      slug: "cdsm2-rectangle-square",
      name: "Rectangles and squares as a pair of equations",
      intuition:
        "A rectangle is two unknowns, so the stem gives two facts: usually the perimeter (a sum) and the area (a product). Treat them as the sum and product of the roots of a quadratic.",
      definition:
        "- Rectangle \\(l \\times b\\): area \\(lb\\), perimeter \\(2(l + b)\\), diagonal \\(\\sqrt{l^2 + b^2}\\).\n" +
        "- Square of side \\(s\\): area \\(s^2\\), diagonal \\(s\\sqrt2\\), so area \\(= \\dfrac{d^2}{2}\\).\n" +
        "- Given \\(l + b\\) and \\(lb\\): \\(l\\) and \\(b\\) are the roots of \\(t^2 - (l + b)t + lb = 0\\).\n" +
        "- The square drawn on a square's diagonal has twice its area.\n" +
        "- Areas of squares in ratio \\(p : q\\) means sides (and perimeters) in ratio \\(\\sqrt p : \\sqrt q\\).",
      formula: {
        label: "Square from its diagonal",
        latex: "\\text{Area} = s^2 = \\frac{d^2}{2}",
      },
      authoredExample: {
        prompt: "A rectangle has perimeter \\(34\\) cm and area \\(60\\) cm\\(^2\\). Find its diagonal.",
        steps: [
          "\\(l + b = 17\\) and \\(lb = 60\\).",
          "\\(l^2 + b^2 = (l + b)^2 - 2lb = 289 - 120 = 169\\).",
          "The diagonal is \\(\\sqrt{169} = 13\\) cm. (The sides, \\(12\\) and \\(5\\), were never needed.)",
        ],
        answer: "\\(13\\) cm.",
      },
      selfCheckExample: {
        prompt: "When each side of a square is increased by \\(3\\) cm, its area increases by \\(57\\) cm\\(^2\\). Find the side.",
        steps: [
          "\\((s + 3)^2 - s^2 = 6s + 9 = 57\\).",
          "\\(6s = 48\\), so \\(s = 8\\) cm.",
        ],
        answer: "\\(8\\) cm.",
      },
      practiceSet: [
        { prompt: "Square with diagonal \\(10\\): area?", answer: "\\(50\\)" },
        { prompt: "Rectangle \\(l + b = 9\\), \\(lb = 20\\): the longer side?", answer: "\\(5\\)" },
        { prompt: "Areas of two squares \\(9 : 16\\): perimeters in ratio?", answer: "\\(3 : 4\\)" },
        { prompt: "Nine equal squares form one big square of side \\(12\\): small side?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "18b0e990-da0c-442b-90ff-4ea8f5e8854d", // 2018 (I) — product of the diagonals is 50
      traps: [
        {
          title: "The diagonal is an option on purpose",
          body:
            "When a stem gives a square's diagonal (or the product of both diagonals), the diagonal itself is usually one of the options. Read the question again: it asks for the side.",
        },
      ],
    },

    // C2 — changes, borders, paths
    {
      kind: "formula" as const,
      slug: "cdsm2-borders-changes",
      name: "Borders, paths and percentage changes",
      intuition:
        "A border or a path is the outer rectangle minus the inner one. The trap is the width: a border of width \\(w\\) takes \\(w\\) off BOTH ends of each side, so each dimension changes by \\(2w\\).",
      definition:
        "- Path of width \\(w\\) **outside** an \\(l \\times b\\) plot: area \\((l + 2w)(b + 2w) - lb\\).\n" +
        "- Border of width \\(w\\) **inside**: area \\(lb - (l - 2w)(b - 2w)\\).\n" +
        "- Covering with tiles: number of tiles \\(= \\dfrac{\\text{area to cover}}{\\text{area of one tile}}\\) (convert units first).\n" +
        "- Length and breadth up by \\(x\\%\\) and \\(y\\%\\): area factor \\(\\left(1 + \\dfrac{x}{100}\\right)\\left(1 + \\dfrac{y}{100}\\right)\\).",
      formula: {
        label: "Path of width w outside",
        latex: "\\text{Path} = (l + 2w)(b + 2w) - lb",
      },
      authoredExample: {
        prompt: "A garden \\(20\\) m by \\(15\\) m has a path \\(2\\) m wide all round it, outside. Find the area of the path.",
        steps: [
          "The outer rectangle is \\((20 + 4)\\times(15 + 4) = 24\\times 19 = 456\\) m\\(^2\\).",
          "The garden is \\(20\\times 15 = 300\\) m\\(^2\\).",
          "The path is \\(456 - 300 = 156\\) m\\(^2\\).",
        ],
        answer: "\\(156\\) m\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "The length of a rectangle is increased by \\(25\\%\\) and its breadth decreased by \\(20\\%\\). What happens to its area?",
        steps: [
          "The area factor is \\(1.25\\times 0.8 = 1\\).",
          "The area is unchanged.",
        ],
        answer: "No change.",
      },
      practiceSet: [
        { prompt: "Floor \\(6\\) m by \\(4\\) m, tiles \\(50\\) cm square: number of tiles?", answer: "\\(96\\)" },
        { prompt: "Inner border \\(1\\) m wide in a \\(10\\times 8\\) rectangle: border area?", answer: "\\(32\\)" },
        { prompt: "Both sides up \\(10\\%\\): area up by?", answer: "\\(21\\%\\)" },
        { prompt: "Plot \\(30\\times 20\\) extended \\(1\\) m on every side: new area?", answer: "\\(704\\)" },
      ],
      pyqExampleId: "c9df67a4-6584-4714-a994-b32ff56037f3", // 2019 (II) — carpet 6 ft × 12 ft, border 6 inches
      traps: [
        {
          title: "Width counts twice",
          body:
            "A \\(1\\) m path on every side adds \\(2\\) m to the length and \\(2\\) m to the breadth. Adding \\(1\\) m to each gives the wrong outer rectangle.",
        },
      ],
    },

    // C3 — rhombus
    {
      kind: "formula" as const,
      slug: "cdsm2-rhombus",
      name: "The rhombus — half the product of the diagonals",
      intuition:
        "The diagonals of a rhombus cross at right angles and cut each other in half, so the rhombus is four equal right triangles. Their legs are the half-diagonals and their hypotenuse is the side.",
      definition:
        "For diagonals \\(d_1, d_2\\) and side \\(a\\):\n" +
        "- Area \\(= \\dfrac12 d_1 d_2\\).\n" +
        "- \\(a^2 = \\left(\\dfrac{d_1}{2}\\right)^2 + \\left(\\dfrac{d_2}{2}\\right)^2\\), so \\(4a^2 = d_1^2 + d_2^2\\).\n" +
        "- Given the sum of the diagonals and the area: \\(d_1^2 + d_2^2 = (d_1 + d_2)^2 - 4\\times\\text{Area}\\).",
      formula: {
        label: "Rhombus",
        latex: "\\text{Area} = \\tfrac12 d_1 d_2, \\qquad 4a^2 = d_1^2 + d_2^2",
      },
      authoredExample: {
        prompt: "A rhombus has side \\(13\\) cm and one diagonal \\(24\\) cm. Find its area.",
        steps: [
          "Half the known diagonal is \\(12\\), so half the other is \\(\\sqrt{13^2 - 12^2} = 5\\).",
          "The diagonals are \\(24\\) and \\(10\\).",
          "\\(\\text{Area} = \\dfrac12\\times 24\\times 10 = 120\\) cm\\(^2\\).",
        ],
        answer: "\\(120\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "The diagonals of a rhombus add to \\(34\\) cm and its area is \\(120\\) cm\\(^2\\). Find its perimeter.",
        steps: [
          "\\(d_1 d_2 = 240\\), so \\(d_1^2 + d_2^2 = 34^2 - 480 = 676\\).",
          "\\(4a^2 = 676\\), so \\(a = 13\\) cm.",
          "The perimeter is \\(52\\) cm.",
        ],
        answer: "\\(52\\) cm.",
      },
      practiceSet: [
        { prompt: "Diagonals \\(6\\) and \\(8\\): area?", answer: "\\(24\\)" },
        { prompt: "Diagonals \\(6\\) and \\(8\\): side?", answer: "\\(5\\)" },
        { prompt: "Side \\(10\\), one diagonal \\(16\\): other diagonal?", answer: "\\(12\\)" },
        { prompt: "Area \\(96\\), one diagonal \\(12\\): other diagonal?", answer: "\\(16\\)" },
      ],
      pyqExampleId: "821fe9ab-9df0-4790-8e97-2f6f52ff6ebb", // 2021 (II) — area 336, one diagonal 48
    },

    // C4 — parallelogram and trapezium
    {
      kind: "formula" as const,
      slug: "cdsm2-parallelogram-trapezium",
      name: "Parallelogram and trapezium",
      intuition:
        "A parallelogram is base times height, and the height is the slant side times the sine of the angle. A trapezium is the average of the parallel sides times the distance between them; the height usually comes from dropping perpendiculars and using Pythagoras.",
      definition:
        "- Parallelogram with sides \\(a, b\\) and angle \\(\\theta\\): area \\(ab\\sin\\theta\\), which is less than the rectangle \\(ab\\) unless \\(\\theta = 90^\\circ\\).\n" +
        "- A triangle and a parallelogram on the same base with equal areas: the triangle's height is twice the parallelogram's.\n" +
        "- Trapezium: area \\(= \\dfrac12(\\text{sum of parallel sides})\\times h\\).\n" +
        "- Isosceles trapezium with parallel sides \\(p > q\\) and legs \\(l\\): each leg overhangs by \\(\\dfrac{p - q}{2}\\), so \\(h = \\sqrt{l^2 - \\left(\\dfrac{p - q}{2}\\right)^2}\\).",
      formula: {
        label: "Parallelogram and trapezium",
        latex: "A_{\\text{par}} = ab\\sin\\theta, \\qquad A_{\\text{trap}} = \\tfrac12 (p + q)\\,h",
      },
      authoredExample: {
        prompt: "An isosceles trapezium has parallel sides \\(20\\) cm and \\(12\\) cm and each slant side \\(5\\) cm. Find its area.",
        steps: [
          "Each slant side overhangs by \\(\\dfrac{20 - 12}{2} = 4\\) cm.",
          "The height is \\(\\sqrt{5^2 - 4^2} = 3\\) cm.",
          "\\(\\text{Area} = \\dfrac12(20 + 12)\\times 3 = 48\\) cm\\(^2\\).",
        ],
        answer: "\\(48\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A parallelogram has sides \\(12\\) cm and \\(7\\) cm with an angle of \\(135^\\circ\\) between them. Find its area.",
        steps: [
          "\\(\\sin 135^\\circ = \\sin 45^\\circ = \\dfrac{1}{\\sqrt2}\\).",
          "\\(\\text{Area} = 12\\times 7\\times\\dfrac{1}{\\sqrt2} = 42\\sqrt2\\) cm\\(^2\\).",
        ],
        answer: "\\(42\\sqrt2\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Parallelogram, sides \\(9\\) and \\(4\\), angle \\(30^\\circ\\): area?", answer: "\\(18\\)" },
        { prompt: "Trapezium, parallel sides \\(7\\) and \\(13\\), height \\(6\\): area?", answer: "\\(60\\)" },
        { prompt: "Triangle and parallelogram, same base and area: height ratio?", answer: "\\(2 : 1\\)" },
        { prompt: "Isosceles trapezium \\(16\\) and \\(10\\), legs \\(5\\): height?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "ec7eedd9-7a02-433e-9913-87cc43a7bf3a", // 2022 (II) — parallel sides 29 and 21, legs 8.5
      traps: [
        {
          title: "An unequal-leg trapezium needs two right triangles",
          body:
            "When the slant sides differ, drop both perpendiculars. The two overhangs add to the difference of the parallel sides, and each leg gives its own Pythagoras equation with the same height. Subtract the two equations to find the overhangs.",
        },
      ],
    },

    // C5 — cut along a diagonal / figures inside a square
    {
      kind: "formula" as const,
      slug: "cdsm2-cut-into-triangles",
      name: "Cut it into triangles",
      intuition:
        "A quadrilateral with four given sides and one right angle is two triangles joined along a diagonal: the right angle gives the diagonal by Pythagoras, and the other triangle then has three known sides. The same habit handles a triangle drawn inside a square: subtract the corner triangles.",
      definition:
        "- Quadrilateral \\(ABCD\\) with \\(\\angle B = 90^\\circ\\): \\(AC = \\sqrt{AB^2 + BC^2}\\), then \\(\\text{Area} = [ABC] + [ACD]\\), the second by Heron.\n" +
        "- A triangle whose vertices sit on the sides of a square: square minus the three right triangles at the corners.\n" +
        "- A right angle at a point on a side of a square makes the two corner triangles similar; use the ratio of their hypotenuses.",
      formula: {
        label: "Quadrilateral split along a diagonal",
        latex: "[ABCD] = [ABC] + [ACD]",
      },
      authoredExample: {
        prompt: "In quadrilateral \\(ABCD\\), \\(AB = 6\\), \\(BC = 8\\), \\(CD = 24\\), \\(DA = 26\\) and \\(\\angle ABC = 90^\\circ\\). Find its area.",
        steps: [
          "\\(AC = \\sqrt{6^2 + 8^2} = 10\\), and \\([ABC] = \\dfrac12\\times 6\\times 8 = 24\\).",
          "Triangle \\(ACD\\) has sides \\(10, 24, 26\\), and \\(10^2 + 24^2 = 26^2\\), so it is right-angled at \\(C\\): \\([ACD] = \\dfrac12\\times 10\\times 24 = 120\\).",
          "\\([ABCD] = 24 + 120 = 144\\).",
        ],
        answer: "\\(144\\) square units.",
      },
      selfCheckExample: {
        prompt: "\\(ABCD\\) is a square of side \\(6\\). \\(P\\) is the midpoint of \\(AB\\) and \\(Q\\) the midpoint of \\(BC\\). Find the area of triangle \\(DPQ\\).",
        steps: [
          "The three corner triangles are \\(APD\\): \\(\\dfrac12\\times 3\\times 6 = 9\\); \\(PBQ\\): \\(\\dfrac12\\times 3\\times 3 = 4.5\\); \\(QCD\\): \\(\\dfrac12\\times 3\\times 6 = 9\\).",
          "\\([DPQ] = 36 - 9 - 4.5 - 9 = 13.5\\).",
        ],
        answer: "\\(13.5\\) square units.",
      },
      practiceSet: [
        { prompt: "Rectangle with sides \\(8\\) and \\(6\\): area of the triangle cut off by a diagonal?", answer: "\\(24\\)" },
        { prompt: "Square of side \\(4\\): triangle with a vertex at one corner and the two far midpoints — area?", answer: "\\(6\\)" },
        { prompt: "\\(AB = 5\\), \\(BC = 12\\), \\(\\angle B = 90^\\circ\\): \\(AC\\)?", answer: "\\(13\\)" },
        { prompt: "Diagonal splits a quadrilateral into triangles of areas \\(18\\) and \\(30\\): total?", answer: "\\(48\\)" },
      ],
      pyqExampleId: "dcd1c38d-6b11-45d0-a50d-198128e7617c", // 2019 (II) — AB 9, BC 40, CD 28, DA 15, ∠B = 90°
    },
  ],
};
