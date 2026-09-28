import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_SHADED_REGIONS_NOTE: SubtopicNote = {
  subtopicName: "Combined and Shaded Regions",
  title: "Combined & Shaded Regions",
  oneLineDefinition:
    "Areas of figures built from squares, circles, semicircles and triangles: write the shaded part as whole shapes added and taken away.",
  whyItMatters:
    "The figure-heavy page of the chapter, and none of it is EASY. The work is bookkeeping rather than new formulas: decide which whole shapes the shading is made of, then add and subtract.",
  concepts: [
    // C1 — whole minus holes
    {
      kind: "formula" as const,
      slug: "cdsm2-whole-minus-holes",
      name: "The whole minus the holes",
      intuition:
        "Most shaded regions are one big shape with smaller shapes removed. Name the big shape, name what is cut out, and subtract. Four quarter-circles at the corners of a square make one full circle.",
      definition:
        "- Square of side \\(2a\\) minus its incircle: \\((4 - \\pi)a^2\\).\n" +
        "- Circle through the corners of a square of side \\(a\\), minus the square: \\(\\dfrac{(\\pi - 2)a^2}{2}\\).\n" +
        "- Circle round a rectangle: its diameter is the rectangle's diagonal.\n" +
        "- A plate of uniform thickness: weight is proportional to area, so a cut-out removes the same fraction of weight.\n" +
        "- A triangle with a sector cut at a vertex: the sector's angle is the triangle's angle at that vertex.",
      formula: {
        label: "Shaded area",
        latex: "\\text{shaded} = \\text{whole} - \\sum \\text{removed pieces}",
      },
      authoredExample: {
        prompt: "From a square of side \\(14\\) cm, a quarter-circle of radius \\(7\\) cm is cut at each corner. Find the remaining area. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "The four quarter-circles make one circle of radius \\(7\\): \\(\\dfrac{22}{7}\\times 49 = 154\\).",
          "Square \\(= 196\\).",
          "Remaining \\(= 196 - 154 = 42\\) cm\\(^2\\).",
        ],
        answer: "\\(42\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A rectangle \\(12\\) cm by \\(5\\) cm is inscribed in a circle. Find the area of the circle outside the rectangle, in terms of \\(\\pi\\).",
        steps: [
          "The diagonal is \\(\\sqrt{144 + 25} = 13\\), so the radius is \\(6.5\\).",
          "Circle \\(= 42.25\\pi\\); rectangle \\(= 60\\).",
          "Outside \\(= 42.25\\pi - 60\\) cm\\(^2\\) (about \\(72.7\\)).",
        ],
        answer: "\\(42.25\\pi - 60\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Square of side \\(2\\) minus its incircle?", answer: "\\(4 - \\pi\\)" },
        { prompt: "Circumcircle of a square of side \\(2\\) minus the square?", answer: "\\(2\\pi - 4\\)" },
        { prompt: "Rectangle \\(6\\times 8\\) in a circle: radius?", answer: "\\(5\\)" },
        { prompt: "Square plate of area \\(100\\) weighing \\(50\\) g, a disc of area \\(40\\) removed: weight left?", answer: "\\(30\\) g" },
      ],
      pyqExampleId: "e7f3bbf6-c529-4edf-b202-e2999e900f42", // 2018 (II) — square of side 4, four quadrants and a circle removed
      traps: [
        {
          title: "Read the hatching, not the words",
          body:
            "The stem says 'the shaded region' and the figure decides what that is. Some papers shade the parts of a circle AND a triangle that do not overlap; others shade only the overlap. Decide from the figure before choosing a formula.",
        },
      ],
    },

    // C2 — semicircles on a split diameter
    {
      kind: "formula" as const,
      slug: "cdsm2-semicircles-on-diameter",
      name: "Semicircles on a divided diameter",
      intuition:
        "A diameter cut into equal parts, with semicircles drawn on some of the parts, produces figures made entirely of half-discs. Every area is a sum of \\(\\dfrac12\\pi r^2\\) terms, and every perimeter a sum of \\(\\pi r\\) arcs.",
      definition:
        "- Semicircle of radius \\(r\\): area \\(\\dfrac{\\pi r^2}{2}\\), arc \\(\\pi r\\).\n" +
        "- Semicircles on the two halves of a diameter \\(2R\\) have radius \\(\\dfrac R2\\): together they have half the area of the big semicircle, but the same arc length \\(\\pi R\\).\n" +
        "- A semicircle drawn on the same side as the shading is subtracted; on the other side, added.",
      formula: {
        label: "Arcs on a split diameter",
        latex: "\\pi r_1 + \\pi r_2 + \\cdots = \\pi R \\quad \\text{when } r_1 + r_2 + \\cdots = R",
      },
      authoredExample: {
        prompt: "\\(AB\\) is a diameter of a circle of radius \\(8\\) cm, and \\(C\\) is the point on \\(AB\\) with \\(AC = 4\\) cm. Semicircles are drawn below \\(AB\\) on \\(AC\\) and \\(CB\\). Find the area of the lower half-disc outside both small semicircles.",
        steps: [
          "\\(AB = 16\\), so \\(CB = 12\\). The small semicircles have radii \\(2\\) and \\(6\\).",
          "Lower half-disc \\(= \\dfrac12\\pi(64) = 32\\pi\\).",
          "Outside both \\(= 32\\pi - 2\\pi - 18\\pi = 12\\pi\\) cm\\(^2\\).",
        ],
        answer: "\\(12\\pi\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "In the same figure, find the perimeter of that region.",
        steps: [
          "It is bounded by the big lower arc (\\(8\\pi\\)) and the two small arcs (\\(2\\pi\\) and \\(6\\pi\\)).",
          "Perimeter \\(= 16\\pi\\) cm.",
        ],
        answer: "\\(16\\pi\\) cm.",
      },
      practiceSet: [
        { prompt: "Semicircle of radius \\(7\\): area? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(77\\)" },
        { prompt: "Diameter \\(12\\) trisected: radii of semicircles on one part and on two parts?", answer: "\\(2\\) and \\(4\\)" },
        { prompt: "Two semicircles on the halves of a diameter \\(2R\\): total arc?", answer: "\\(\\pi R\\)" },
        { prompt: "Semicircles on radii \\(3\\) and \\(5\\): total area?", answer: "\\(17\\pi\\)" },
      ],
      pyqExampleId: "47f0db9c-33aa-4309-b999-0ab252598e46", // 2020 (I) — PQRS diameter trisected, semicircle on QS
    },

    // C3 — overlaps: lenses and lunes
    {
      kind: "formula" as const,
      slug: "cdsm2-lens-and-lune",
      name: "Overlaps — lenses and crescents",
      intuition:
        "Where two shapes overlap, the overlap is counted in both. Two quarter-circles drawn from opposite corners of a square overlap in a lens made of two segments. Semicircles on the sides of a right triangle leave crescents whose total is exactly the triangle.",
      definition:
        "- Lens from quarter-circles centred at opposite corners of a square of side \\(a\\): two \\(90^\\circ\\) segments, \\(2\\left(\\dfrac{\\pi a^2}{4} - \\dfrac{a^2}{2}\\right) = a^2\\left(\\dfrac{\\pi}{2} - 1\\right)\\).\n" +
        "- Region covered by exactly one of two shapes: \\(A_1 + A_2 - 2\\times\\text{overlap}\\).\n" +
        "- Crescents (lunes of Hippocrates): semicircles on the legs of a right triangle, minus the semicircle on the hypotenuse, plus the triangle, equal the triangle's area.",
      formula: {
        label: "Lens from two quarter-circles",
        latex: "\\text{lens} = a^2\\left(\\frac{\\pi}{2} - 1\\right)",
      },
      authoredExample: {
        prompt: "With opposite corners of a square of side \\(10\\) cm as centres, quarter-circles of radius \\(10\\) are drawn inside the square. Find the area common to both. \\((\\pi = 3.14)\\)",
        steps: [
          "Each quarter-circle is \\(78.5\\); the square is \\(100\\).",
          "Together the two quarter-circles cover the square once and the lens twice: \\(2\\times 78.5 = 100 + \\text{lens}\\).",
          "Lens \\(= 157 - 100 = 57\\) cm\\(^2\\).",
        ],
        answer: "\\(57\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A right triangle has legs \\(6\\) and \\(8\\) cm. Semicircles are drawn outward on the two legs, and a semicircle on the hypotenuse is drawn on the triangle's side, passing through the right-angle vertex. Find the total area of the two crescents that lie outside the semicircle on the hypotenuse.",
        steps: [
          "Crescents \\(= \\) (semicircles on the legs) \\(+\\) triangle \\(-\\) (semicircle on the hypotenuse).",
          "The semicircle terms cancel because \\(6^2 + 8^2 = 10^2\\), leaving the triangle.",
          "\\(\\dfrac12\\times 6\\times 8 = 24\\) cm\\(^2\\).",
        ],
        answer: "\\(24\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Square of side \\(a\\), quarter-circles from opposite corners: lens?", answer: "\\(a^2\\left(\\dfrac\\pi2 - 1\\right)\\)" },
        { prompt: "Two regions of area \\(5\\) each overlapping in \\(2\\): covered exactly once?", answer: "\\(6\\)" },
        { prompt: "Crescents on legs \\(p\\) and \\(q\\): total area?", answer: "\\(\\dfrac{pq}{2}\\)" },
        { prompt: "Two regions of area \\(5\\) overlapping in \\(2\\): union?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "19b6eeb6-a398-4e3c-8ca8-20b446b4b115", // 2019 (II) — two sectors from opposite corners
      traps: [
        {
          title: "Half the lens is a single segment",
          body:
            "A lens is two segments back to back. An option equal to half the right answer is usually the area of one segment.",
        },
      ],
    },

    // C4 — composite polygons
    {
      kind: "formula" as const,
      slug: "cdsm2-composite-figures",
      name: "Figures built from pieces",
      intuition:
        "A field or a figure made of rectangles, triangles and trapeziums is the sum of its pieces. The perimeter is only the OUTER boundary: sides that are glued together inside do not count.",
      definition:
        "- Area of a composite figure \\(= \\) sum of the areas of its pieces.\n" +
        "- Perimeter \\(= \\) only the outside edges; a shared side disappears from it.\n" +
        "- Squares drawn outward on the sides of a triangle: total \\(= \\) triangle \\(+\\) the three squares.",
      formula: {
        label: "Composite figure",
        latex: "\\text{Area} = \\sum \\text{pieces}, \\qquad \\text{Perimeter} = \\text{outer edges only}",
      },
      authoredExample: {
        prompt: "An equilateral triangle is drawn outward on one side of a square of side \\(6\\) cm. Find the perimeter and the area of the whole figure.",
        steps: [
          "The shared side is inside, so the perimeter is \\(3\\times 6 + 2\\times 6 = 30\\) cm.",
          "Area \\(= 36 + \\dfrac{\\sqrt3}{4}\\times 36 = 36 + 9\\sqrt3\\) cm\\(^2\\).",
        ],
        answer: "\\(30\\) cm and \\(36 + 9\\sqrt3\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Squares are drawn outward on the three sides of a right triangle with legs \\(3\\) and \\(4\\) cm. Find the area of the whole figure.",
        steps: [
          "The squares are \\(9\\), \\(16\\) and \\(25\\).",
          "The triangle is \\(6\\).",
          "Total \\(= 9 + 16 + 25 + 6 = 56\\) cm\\(^2\\).",
        ],
        answer: "\\(56\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Two unit squares side by side: perimeter?", answer: "\\(6\\)" },
        { prompt: "Square of side \\(4\\) with a semicircle outward on one side: perimeter?", answer: "\\(12 + 2\\pi\\)" },
        { prompt: "Rectangle \\(5\\times 2\\) with a right triangle of legs \\(2\\) and \\(3\\) on the short side: area?", answer: "\\(13\\)" },
        { prompt: "Isosceles triangle of base \\(2a\\) and height \\(h\\): area?", answer: "\\(ah\\)" },
      ],
      pyqExampleId: "e22c8b3c-c6b4-447f-9109-fdbaad4dc2f0", // 2017 (II) — isosceles triangle on a square, perimeter 7/6
    },
  ],
};
