import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AP_COMBINED_NOTE: SubtopicNote = {
  subtopicName: "Combined Figures",
  title: "Combined Figures: Inscribed Shapes and Shaded Regions",
  oneLineDefinition:
    "One figure drawn inside another, or a region cut from two of them: find the measure the two figures share, then add or subtract the pieces.",
  whyItMatters:
    "More than half the chapter's HARD questions are on this page, and nearly half of its questions come with a figure. Each one turns on a single link between the shapes, such as a square's diagonal being the circle's diameter. Miss that link and every option looks possible; find it and the rest is the earlier pages' formulas.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afap-inscribed",
      visualizationSlug: "af-square-in-circle",
      name: "Figures inscribed in one another",
      intuition:
        "When one figure sits exactly inside another, they share a length. A circle inside a square touches all four sides, so its diameter is the square's side. A square inside a circle has its corners on the circle, so its diagonal is the circle's diameter.",
      definition:
        "- **Circle in a square of side \\(a\\):** radius \\(\\tfrac a2\\). This is the largest circle that fits.\n" +
        "- **Square in a circle of radius \\(r\\):** diagonal \\(2r\\), so area \\(\\tfrac{(2r)^2}{2} = 2r^2\\).\n" +
        "- **Equilateral triangle of side \\(a\\) in a circle:** circumradius \\(R = \\dfrac{a}{\\sqrt 3}\\), so \\(a = R\\sqrt 3\\). Its inscribed circle has radius \\(\\dfrac{a}{2\\sqrt 3}\\).\n" +
        "- **Regular hexagon in a circle:** its side equals the radius, so its area is \\(\\dfrac{3\\sqrt 3}{2}R^2\\).\n" +
        "- **Regular \\(n\\)-gon in a circle of radius \\(R\\):** it is \\(n\\) triangles with two sides \\(R\\) and angle \\(\\tfrac{360°}{n}\\) between them, so area \\(= \\tfrac12 nR^2 \\sin\\tfrac{360°}{n}\\). Its inscribed circle has radius \\(R\\cos\\tfrac{180°}{n}\\).\n" +
        "- A rhombus with one corner at the centre and three on the circle has every side equal to the radius: it is two equilateral triangles.",
      formula: {
        label: "Square and circle",
        latex: "\\text{circle in square: } r = \\tfrac a2;\\qquad \\text{square in circle: } d = 2r,\\ A = 2r^2",
      },
      authoredExample: {
        prompt: "A circle has a radius of 7 cm. Find the area of the largest square that fits inside it, and of the smallest square that fits round it.",
        steps: [
          "The inner square's diagonal is the diameter, 14 cm, so its area is \\(\\tfrac{14^2}{2} = 98\\) cm².",
          "The outer square's side is the diameter, 14 cm, so its area is 196 cm².",
          "The outer square is always twice the inner one.",
        ],
        answer: "98 cm² and 196 cm².",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle of side \\(6\\sqrt 3\\) cm is inscribed in a circle. Find the radius, and the area of a regular hexagon inscribed in the same circle.",
        steps: [
          "\\(R = \\dfrac{6\\sqrt 3}{\\sqrt 3} = 6\\) cm.",
          "The hexagon's side is 6 cm, so its area is \\(\\dfrac{3\\sqrt 3}{2} \\times 36 = 54\\sqrt 3\\) cm².",
        ],
        answer: "6 cm; \\(54\\sqrt 3\\) cm².",
      },
      practiceSet: [
        { prompt: "Find the area of the largest circle that fits in a square of side 21 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(346.5\\) cm²" },
        { prompt: "A square is inscribed in a circle of diameter 16 cm. Find the area of the square.", answer: "\\(128\\) cm²" },
        { prompt: "Find the area of a regular hexagon inscribed in a circle of radius 2 cm.", answer: "\\(6\\sqrt 3\\) cm²" },
        { prompt: "An equilateral triangle is inscribed in a circle of radius 4 cm. Find its side.", answer: "\\(4\\sqrt 3\\) cm" },
      ],
      pyqExampleId: "5fe66524-5b1e-46b6-b281-0926d63fdd9d",
      traps: [
        {
          title: "Which length is shared",
          body: "For a square inside a circle of radius 7, the diameter 14 is the square's diagonal, giving 98. Taking 14 as the side gives 196, the square outside the circle.",
        },
        {
          title: "The circumradius is not half the side",
          body: "An equilateral triangle of side \\(6\\sqrt 3\\) has a circumradius of 6, from \\(R = \\tfrac{a}{\\sqrt 3}\\). Half its side, \\(3\\sqrt 3\\), is neither its circumradius nor its inradius.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-shaded",
      name: "Shaded regions by subtraction",
      intuition:
        "A shaded region is usually what is left when one figure is taken out of another. Find the outer area, find the area removed, and subtract. When the region is an overlap, cut it into triangles and sectors whose areas you know.",
      definition:
        "- **Outer minus inner:** square less circle, rectangle less a quadrant, big circle less small circles.\n" +
        "- **Four quadrants at the corners** of a square of side \\(2r\\) make one full circle of radius \\(r\\).\n" +
        "- **Segment** (between a chord and its arc) = sector − triangle. For a 90° angle at the centre, the triangle is \\(\\tfrac12 r^2\\).\n" +
        "- **An overlap of two figures:** join the centre to the crossing points and split the region into triangles and sectors.\n" +
        "- If the figure is symmetric and only part is shaded, find the whole unshaded-to-shaded split and take the fraction the figure shows.",
      formula: {
        label: "Shaded area",
        latex: "\\text{shaded} = \\text{outer} - \\text{removed},\\qquad \\text{segment} = \\text{sector} - \\triangle",
      },
      authoredExample: {
        prompt: "A square of side 14 cm has a quadrant of radius 7 cm drawn at each corner. Find the area of the square not covered by the quadrants. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "The four quadrants make one circle of radius 7: \\(\\tfrac{22}{7} \\times 49 = 154\\) cm².",
          "The square is 196 cm², so the uncovered part is \\(196 - 154 = 42\\) cm².",
        ],
        answer: "42 cm².",
      },
      selfCheckExample: {
        prompt: "A chord of a circle of radius 14 cm makes a right angle at the centre. Find the area of the smaller segment. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "Sector \\(= \\tfrac14 \\times \\tfrac{22}{7} \\times 196 = 154\\) cm².",
          "Triangle \\(= \\tfrac12 \\times 14 \\times 14 = 98\\) cm², so the segment is \\(154 - 98 = 56\\) cm².",
        ],
        answer: "56 cm².",
      },
      practiceSet: [
        { prompt: "A circle is drawn inside a square of side 21 cm, touching all four sides. Find the area between them. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(94.5\\) cm²" },
        {
          prompt: "A quadrant of radius 7 cm is cut from one corner of an 18 cm by 12 cm rectangle. Find the area left. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "\\(177.5\\) cm²",
        },
        {
          prompt: "Two equal circles touch each other at the centre of a circle of radius 8 cm, and each touches the big circle from inside. Find the area of the big circle outside them.",
          answer: "\\(32\\pi\\) cm²",
          method: "Each small radius is 4: \\(64\\pi - 2 \\times 16\\pi\\).",
        },
      ],
      pyqExampleId: "60684060-27fd-4fd9-bfad-e4f2f2c1d748",
      traps: [
        {
          title: "A segment is not a sector",
          body: "With radius 14 and a right angle at the centre, the sector is 154 but the segment is only 56. The triangle between the radii must come off.",
        },
        {
          title: "Read what is shaded",
          body: "In a square with quadrants at its corners, the shaded part may be the quadrants (154 for side 14) or what is left between them (42). Both numbers are usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-pieces",
      name: "Building a figure from pieces",
      intuition:
        "Some figures are several simple ones joined edge to edge: a rectangle with a semicircle on each end, an L or T made of rectangles, a boundary of half-circles. Cut the figure where the pieces meet, find each one, and add, making sure no piece is counted twice.",
      definition:
        "- **Rectangle with semicircular ends** on the side \\(b\\): the two ends make one circle of diameter \\(b\\). Area \\(= lb + \\pi\\left(\\tfrac b2\\right)^2\\); perimeter \\(= 2l + \\pi b\\).\n" +
        "- **L and T shapes:** split into rectangles that do not overlap, or take a small rectangle away from a big one.\n" +
        "- **Semicircles on a line** \\(AC\\) with \\(B\\) between: the region inside the big one and outside the two small ones is \\(\\tfrac{\\pi}{8}(AC^2 - AB^2 - BC^2)\\).\n" +
        "- **Arc lengths add:** two semicircles of diameter \\(\\tfrac d2\\) have the same total arc as one semicircle of diameter \\(d\\).",
      formula: {
        label: "Rectangle with semicircular ends",
        latex: "A = lb + \\pi\\left(\\tfrac b2\\right)^2,\\qquad P = 2l + \\pi b",
      },
      authoredExample: {
        prompt: "A running ground is a rectangle 50 m by 21 m with a semicircle on each 21 m side. Find its area and its perimeter. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "The rectangle is \\(50 \\times 21 = 1050\\) m².",
          "The two ends make a circle of radius 10.5 m: \\(\\tfrac{22}{7} \\times 110.25 = 346.5\\) m². Area \\(= 1396.5\\) m².",
          "Perimeter: the two straight sides, 100 m, plus one circumference, \\(\\tfrac{22}{7} \\times 21 = 66\\) m, which is 166 m.",
        ],
        answer: "1396.5 m²; 166 m.",
      },
      selfCheckExample: {
        prompt: "A floor is a 9 m by 7 m rectangle with a 4 m by 3 m rectangle cut out of one corner. Find its area.",
        steps: ["Take the cut-out from the whole: \\(63 - 12\\)."],
        answer: "51 m².",
      },
      practiceSet: [
        {
          prompt: "Points A, B, C lie on a line with AB = 6 cm and BC = 10 cm. Semicircles are drawn on AB, BC and AC on the same side. Find the area inside the big one and outside the two small ones.",
          answer: "\\(15\\pi\\) cm²",
          method: "\\(\\tfrac{\\pi}{8}(256 - 36 - 100)\\).",
        },
        {
          prompt: "A boundary is made of a semicircle of diameter 12 cm and two semicircles of diameter 6 cm. Find its length.",
          answer: "\\(12\\pi\\) cm",
        },
        { prompt: "A T-shaped plate has a 6 cm by 2 cm top bar and a 2 cm wide stem 5 cm long below it. Find its area.", answer: "\\(22\\) cm²" },
        {
          prompt: "A window is a rectangle 1.4 m wide and 2 m tall with a semicircle on top. Find its area. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "\\(3.57\\) m²",
          method: "\\(2.8 + 0.77\\).",
        },
      ],
      pyqExampleId: "1744c6e4-8b96-43e5-b33f-7f640a61ab33",
      traps: [
        {
          title: "Two semicircles, one circle",
          body: "A 50 m by 21 m ground with round ends adds one circle of radius 10.5, not two. Adding two full circles doubles the curved part.",
        },
        {
          title: "Do not count the overlap twice",
          body: "Splitting a T shape into a 6 by 2 bar and a stem, measure the stem from below the bar. Taking its full height through the bar counts the shared square twice.",
        },
      ],
    },
  ],
};
