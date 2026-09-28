import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_INSCRIBED_NOTE: SubtopicNote = {
  subtopicName: "Inscribed and Circumscribed Figures",
  title: "Inscribed & Circumscribed Figures",
  oneLineDefinition:
    "One figure drawn inside another so that it just touches: squares and circles, a triangle's incircle and circumcircle, figures in a semicircle, and regular polygons.",
  whyItMatters:
    "One of the two hardest pages here, with a third of it HARD. Every question turns on one shared length: the diagonal that is also a diameter, the radius that is also a half-side. Find that length and the rest is substitution.",
  concepts: [
    // C1 — square and circle
    {
      kind: "formula" as const,
      slug: "cdsm2-square-circle",
      name: "Square in a circle, circle in a square",
      intuition:
        "A square inside a circle has its diagonal along a diameter. A circle inside a square has its diameter equal to the side. Those two facts, and the triangle's version below, settle almost every 'largest square' or 'largest disc' question.",
      definition:
        "- Square inscribed in a circle of radius \\(r\\): diagonal \\(2r\\), side \\(r\\sqrt2\\), area \\(2r^2\\). Circle : square \\(= \\pi : 2\\).\n" +
        "- Circle inscribed in a square of side \\(s\\): radius \\(\\dfrac{s}{2}\\), area \\(\\dfrac{\\pi s^2}{4}\\).\n" +
        "- Equilateral triangle inscribed in a circle of radius \\(r\\): side \\(r\\sqrt3\\), area \\(\\dfrac{3\\sqrt3}{4}r^2\\).\n" +
        "- Rectangle inscribed in a circle: its diagonal is a diameter.\n" +
        "- Joining the midpoints of a square's sides gives a square of half the area.",
      formula: {
        label: "In a circle of radius r",
        latex: "\\text{square} = 2r^2, \\qquad \\text{equilateral triangle} = \\tfrac{3\\sqrt3}{4}r^2",
      },
      authoredExample: {
        prompt: "A rectangle with sides in the ratio \\(3 : 4\\) is inscribed in a circle of radius \\(10\\) cm. Find its area.",
        steps: [
          "The diagonal is the diameter, \\(20\\) cm. With sides \\(3k\\) and \\(4k\\), the diagonal is \\(5k\\), so \\(k = 4\\).",
          "The sides are \\(12\\) and \\(16\\) cm, and the area is \\(192\\) cm\\(^2\\).",
        ],
        answer: "\\(192\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Find the ratio of the area of the largest square cut from a disc of radius \\(r\\) to the area of the largest disc cut from a square of side \\(r\\).",
        steps: [
          "The square in the disc has area \\(2r^2\\).",
          "The disc in the square has radius \\(\\dfrac r2\\) and area \\(\\dfrac{\\pi r^2}{4}\\).",
          "The ratio is \\(2 : \\dfrac{\\pi}{4} = 8 : \\pi\\).",
        ],
        answer: "\\(8 : \\pi\\).",
      },
      practiceSet: [
        { prompt: "Largest square in a circle of radius \\(5\\): area?", answer: "\\(50\\)" },
        { prompt: "Largest disc in a square of side \\(10\\): area?", answer: "\\(25\\pi\\)" },
        { prompt: "Square in a circle, \\(\\pi = \\tfrac{22}{7}\\): circle : square?", answer: "\\(11 : 7\\)" },
        { prompt: "Midpoint square of a square of area \\(64\\): area?", answer: "\\(32\\)" },
      ],
      pyqExampleId: "4cac010d-c302-4fc2-8a82-4ad51a946e2b", // 2023 (I) — square and equilateral triangle in the same circle
    },

    // C2 — triangle incircle and circumcircle
    {
      kind: "formula" as const,
      slug: "cdsm2-triangle-circles",
      name: "A triangle's incircle and circumcircle",
      intuition:
        "The incircle's radius is the area divided by the semi-perimeter. The circumcircle's radius is \\(\\dfrac{abc}{4\\times\\text{area}}\\). For the two special triangles CDS likes, there are one-line versions.",
      definition:
        "- Any triangle: \\(r = \\dfrac{\\Delta}{s}\\), \\(R = \\dfrac{abc}{4\\Delta}\\).\n" +
        "- Right triangle with legs \\(a, b\\) and hypotenuse \\(c\\): \\(r = \\dfrac{a + b - c}{2}\\), \\(R = \\dfrac{c}{2}\\).\n" +
        "- Equilateral triangle of side \\(a\\): \\(r = \\dfrac{a}{2\\sqrt3}\\), \\(R = \\dfrac{a}{\\sqrt3}\\), so \\(R = 2r\\), and the height is \\(3r\\).\n" +
        "- A circle through the apex of an equilateral triangle, touching the base at its midpoint, has the altitude as its diameter.",
      formula: {
        label: "Inradius and circumradius",
        latex: "r = \\frac{\\Delta}{s}, \\qquad R = \\frac{abc}{4\\Delta}",
      },
      authoredExample: {
        prompt: "Find the inradius and circumradius of a triangle with sides \\(7\\), \\(24\\) and \\(25\\) cm.",
        steps: [
          "\\(7^2 + 24^2 = 625 = 25^2\\): a right triangle.",
          "\\(r = \\dfrac{7 + 24 - 25}{2} = 3\\) cm.",
          "\\(R = \\dfrac{25}{2} = 12.5\\) cm.",
        ],
        answer: "\\(r = 3\\) cm, \\(R = 12.5\\) cm.",
      },
      selfCheckExample: {
        prompt: "A circle of radius \\(3\\) cm is inscribed in an equilateral triangle. Find the area of the triangle outside the circle.",
        steps: [
          "\\(r = \\dfrac{a}{2\\sqrt3} = 3\\) gives \\(a = 6\\sqrt3\\).",
          "Triangle \\(= \\dfrac{\\sqrt3}{4}\\times 108 = 27\\sqrt3\\).",
          "The part outside the circle is \\(27\\sqrt3 - 9\\pi\\) cm\\(^2\\).",
        ],
        answer: "\\(27\\sqrt3 - 9\\pi\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Right triangle \\(6, 8, 10\\): inradius?", answer: "\\(2\\)" },
        { prompt: "Equilateral side \\(6\\): circumradius?", answer: "\\(2\\sqrt3\\)" },
        { prompt: "Equilateral triangle: \\(R : r\\)?", answer: "\\(2 : 1\\)" },
        { prompt: "Area \\(84\\), \\(s = 21\\): inradius?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "e8709567-57e0-488d-9d05-43a1ee14a329", // 2023 (I) — incircle of the 12-16-20 triangle
      visualizationSlug: "pt-circumcircle-incircle",
      traps: [
        {
          title: "The inradius and the circumradius swap easily",
          body:
            "For an equilateral triangle \\(\\dfrac{a}{\\sqrt3}\\) is the circumradius and \\(\\dfrac{a}{2\\sqrt3}\\) the inradius. Check with \\(R = 2r\\): the circle through the corners is the bigger one.",
        },
      ],
    },

    // C3 — semicircle and quarter circle
    {
      kind: "formula" as const,
      slug: "cdsm2-semicircle-quarter",
      name: "Figures in a semicircle or a quarter circle",
      intuition:
        "Put the centre of the flat side at the origin. A square in a semicircle sits symmetrically on the diameter, so its top corner is at \\(\\left(\\dfrac s2, s\\right)\\) and lies on the circle. A circle in a quarter circle sits on the bisector of the right angle.",
      definition:
        "- Square in a semicircle of radius \\(r\\): \\(\\dfrac{s^2}{4} + s^2 = r^2\\), so \\(s^2 = \\dfrac{4r^2}{5}\\).\n" +
        "- Largest triangle in a semicircle: base on the diameter, apex at the top, area \\(r^2\\). Any triangle on the diameter is right-angled at the arc.\n" +
        "- Circle in a quarter circle of radius \\(R\\): its centre is \\(r\\sqrt2\\) from the corner, so \\(r\\sqrt2 + r = R\\) and \\(R : r = (\\sqrt2 + 1) : 1\\).",
      formula: {
        label: "Square in a semicircle",
        latex: "s^2 = \\tfrac45 r^2",
      },
      authoredExample: {
        prompt: "A square is inscribed in a semicircle of radius \\(5\\) cm with one side on the diameter. Find its area.",
        steps: [
          "The top corners are at \\(\\left(\\pm\\dfrac s2, s\\right)\\), on the circle: \\(\\dfrac{s^2}{4} + s^2 = 25\\).",
          "\\(\\dfrac{5s^2}{4} = 25\\), so \\(s^2 = 20\\).",
        ],
        answer: "\\(20\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A circle is inscribed in a quarter circle of radius \\(\\sqrt2 + 1\\) cm. Find its radius.",
        steps: [
          "\\(R = r(\\sqrt2 + 1)\\).",
          "So \\(r = 1\\) cm.",
        ],
        answer: "\\(1\\) cm.",
      },
      practiceSet: [
        { prompt: "Largest triangle in a semicircle of radius \\(6\\): area?", answer: "\\(36\\)" },
        { prompt: "Square in a semicircle of radius \\(r\\) : square in a circle of radius \\(r\\)?", answer: "\\(2 : 5\\)" },
        { prompt: "Triangle on a diameter of \\(10\\) with legs \\(6\\) and \\(8\\): area?", answer: "\\(24\\)" },
        { prompt: "Circle in a quarter circle: \\(R : r\\)?", answer: "\\((\\sqrt2 + 1) : 1\\)" },
      ],
      pyqExampleId: "88b1f73d-465f-4039-a695-9eabe08bd3d0", // 2019 (I) — square in a semicircle vs square in a circle
    },

    // C4 — squares wedged into corners
    {
      kind: "formula" as const,
      slug: "cdsm2-square-in-corner",
      name: "A square or rectangle wedged into a corner",
      intuition:
        "When a square sits in the corner of a right triangle, or a rectangle's far corner touches a circle, put the corner at the origin. The far vertex then has simple coordinates, and 'it lies on the hypotenuse' or 'it lies on the circle' is one equation.",
      definition:
        "- Square in the right angle of a right triangle with legs \\(a, b\\): its far corner \\((s, s)\\) lies on the hypotenuse, so \\(s = \\dfrac{ab}{a + b}\\).\n" +
        "- Square standing on the hypotenuse \\(c\\) with altitude \\(h\\): \\(s = \\dfrac{ch}{c + h}\\), which is smaller.\n" +
        "- Largest square in an equilateral triangle of side \\(a\\) stands on a side: \\(s = \\dfrac{a\\sqrt3}{2 + \\sqrt3} = a(2\\sqrt3 - 3)\\).\n" +
        "- A point \\((p, q)\\) measured from the corner of a square lies on its incircle of radius \\(t\\) when \\((p - t)^2 + (q - t)^2 = t^2\\).",
      formula: {
        label: "Square in the right angle",
        latex: "s = \\frac{ab}{a + b}",
      },
      authoredExample: {
        prompt: "A square has one corner at the right angle of a right triangle with legs \\(12\\) cm and \\(6\\) cm, and the opposite corner on the hypotenuse. Find its side.",
        steps: [
          "\\(s = \\dfrac{12\\times 6}{12 + 6} = \\dfrac{72}{18} = 4\\) cm.",
          "Check: the hypotenuse is the line \\(\\dfrac{x}{12} + \\dfrac{y}{6} = 1\\), and \\(\\dfrac4{12} + \\dfrac46 = 1\\).",
        ],
        answer: "\\(4\\) cm.",
      },
      selfCheckExample: {
        prompt: "A circle of radius \\(t\\) is inscribed in a square. A \\(3\\) cm by \\(6\\) cm rectangle sits in one corner of the square, outside the circle, with its far corner touching the circle. Find \\(t\\).",
        steps: [
          "With the square's corner at the origin, the centre is \\((t, t)\\) and the far corner \\((3, 6)\\) is on the circle: \\((t - 3)^2 + (t - 6)^2 = t^2\\).",
          "\\(t^2 - 18t + 45 = 0\\), so \\(t = 15\\) or \\(t = 3\\).",
          "The rectangle sits in the corner gap, so both its coordinates are less than \\(t\\). That rules out \\(t = 3\\).",
        ],
        answer: "\\(15\\) cm.",
      },
      practiceSet: [
        { prompt: "Legs \\(3\\) and \\(6\\): square in the right angle, side?", answer: "\\(2\\)" },
        { prompt: "Legs \\(10\\) and \\(10\\): square in the right angle, side?", answer: "\\(5\\)" },
        { prompt: "Equilateral side \\(2 + \\sqrt3\\): largest square's side?", answer: "\\(\\sqrt3\\)" },
        { prompt: "Right triangle: which square is larger — at the right angle or on the hypotenuse?", answer: "At the right angle" },
      ],
      pyqExampleId: "cd32a3ed-8577-4646-98d0-4791a26fe62d", // 2024 (I) — square in the 6-8 right triangle
      traps: [
        {
          title: "Side or perimeter?",
          body:
            "These stems often ask for the perimeter or the area of the square, and the side itself is an option. Finish the question.",
        },
      ],
    },

    // C5 — regular polygons
    {
      kind: "formula" as const,
      slug: "cdsm2-regular-polygons",
      name: "Regular polygons — hexagon and octagon",
      intuition:
        "A regular hexagon is six equilateral triangles. A regular octagon is a square with its corners cut off as isosceles right triangles. Both facts turn a polygon question into triangle work.",
      definition:
        "- Hexagon of side \\(a\\): area \\(6\\times\\dfrac{\\sqrt3}{4}a^2 = \\dfrac{3\\sqrt3}{2}a^2\\).\n" +
        "- Cutting the corners off an equilateral triangle of side \\(3s\\) leaves a hexagon of side \\(s\\): triangle : hexagon \\(= 9 : 6 = 3 : 2\\).\n" +
        "- Octagon from a square of side \\(a\\): cut legs \\(x\\) with \\(a - 2x = x\\sqrt2\\); the octagon's side is \\(a(\\sqrt2 - 1)\\).\n" +
        "- Regular \\(n\\)-gon of side \\(a\\): inradius \\(\\dfrac a2\\cot\\dfrac{180^\\circ}{n}\\).",
      formula: {
        label: "Hexagon and octagon",
        latex: "A_{\\text{hex}} = \\tfrac{3\\sqrt3}{2}a^2, \\qquad \\text{octagon side} = a(\\sqrt2 - 1)",
      },
      authoredExample: {
        prompt: "A regular octagon is made by cutting the corners off a square of side \\(10\\) cm. Find the octagon's side. \\((\\sqrt2 = 1.414)\\)",
        steps: [
          "Each cut is an isosceles right triangle with legs \\(x\\); its hypotenuse \\(x\\sqrt2\\) is an octagon side.",
          "Along the square's side: \\(10 - 2x = x\\sqrt2\\), so the side is \\(10(\\sqrt2 - 1)\\).",
          "\\(10\\times 0.414 = 4.14\\) cm.",
        ],
        answer: "\\(4.14\\) cm.",
      },
      selfCheckExample: {
        prompt: "Find the area of a regular hexagon of side \\(4\\) cm.",
        steps: [
          "Six equilateral triangles of side \\(4\\): each \\(\\dfrac{\\sqrt3}{4}\\times 16 = 4\\sqrt3\\).",
          "Total \\(= 24\\sqrt3\\) cm\\(^2\\).",
        ],
        answer: "\\(24\\sqrt3\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Hexagon of side \\(2\\): area?", answer: "\\(6\\sqrt3\\)" },
        { prompt: "Octagon from a square of side \\(a\\): side?", answer: "\\(a(\\sqrt2 - 1)\\)" },
        { prompt: "Triangle : hexagon cut from it?", answer: "\\(3 : 2\\)" },
        { prompt: "Regular hexagon of side \\(a\\): inradius?", answer: "\\(\\dfrac{\\sqrt3}{2}a\\)" },
      ],
      pyqExampleId: "8e510be4-74b1-4ec5-bcbb-39ade9efb278", // 2019 (II) — octagon from a square of side a
    },
  ],
};
