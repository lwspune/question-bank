import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_GEO_AREAS_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Plane Areas and Circles",
  title: "Areas, Circles, Arcs and Circle Theorems",
  oneLineDefinition:
    "Areas and perimeters of flat shapes, the measures of a circle and its parts, and the angle facts about chords, tangents and inscribed angles.",
  whyItMatters:
    "Area questions appear across the years: a rectangle from its perimeter and the ratio of its sides (2025), shapes with circular pieces removed (2011, 2013) and a sector between two circles (2022). In 2024 the ministry paper asked how the angle between a tangent and a chord compares with an inscribed angle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-geo-plane-areas",
      name: "Areas and perimeters of plane figures",
      intuition:
        "Area counts unit squares inside a shape; perimeter is the length of its boundary. Every common formula comes from the rectangle: a parallelogram is a rectangle with a slice moved across, a triangle is half a parallelogram, and a trapezium is the average of its two parallel sides times the height. Awkward shapes are made of these pieces, added or cut away.",
      definition:
        "- **Rectangle** \\(l \\times w\\): area \\(lw\\), perimeter \\(2(l + w)\\). **Square** of side \\(s\\): area \\(s^2\\), perimeter \\(4s\\).\n" +
        "- **Parallelogram**: base times **perpendicular** height (not the slanted side).\n" +
        "- **Triangle**: \\(\\tfrac{1}{2} \\times\\) base \\(\\times\\) height.\n" +
        "- **Trapezium** with parallel sides \\(a\\) and \\(b\\), \\(h\\) apart: \\(\\tfrac{1}{2}(a + b)h\\).\n" +
        "- **Composite shapes**: split into these pieces, then add, or subtract the pieces cut out.",
      formula: {
        label: "Trapezium area",
        latex: "A = \\tfrac{1}{2}(a + b)\\,h",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "the two parallel sides" },
          { symbol: "\\(h\\)", meaning: "the perpendicular distance between them" },
        ],
      },
      authoredExample: {
        prompt:
          "A lawn is a trapezium with parallel sides of 12 m and 20 m, which are 7 m apart. A square pond of side 3 m is dug in the lawn. What area of grass is left?",
        steps: [
          "Trapezium: \\(\\tfrac{1}{2}(12 + 20) \\times 7 = 16 \\times 7 = 112\\ \\text{m}^2\\).",
          "Pond: \\(3^2 = 9\\ \\text{m}^2\\).",
          "Grass: \\(112 - 9 = 103\\ \\text{m}^2\\).",
        ],
        answer: "\\(103\\ \\text{m}^2\\)",
      },
      selfCheckExample: {
        prompt:
          "The length of a rectangle is 3 cm more than twice its width, and its perimeter is 54 cm. What is its area?",
        options: ["\\(629\\ \\text{cm}^2\\)", "\\(140\\ \\text{cm}^2\\)", "\\(76\\ \\text{cm}^2\\)", "\\(27\\ \\text{cm}^2\\)", "\\(152\\ \\text{cm}^2\\)"],
        steps: [
          "Width \\(w\\), length \\(2w + 3\\). Perimeter: \\(2(2w + 3 + w) = 54\\), so \\(3w + 3 = 27\\) and \\(w = 8\\) cm.",
          "Length \\(= 19\\) cm; area \\(= 8 \\times 19 = 152\\ \\text{cm}^2\\).",
          "A uses \\(l + w = 54\\) instead of \\(2(l + w) = 54\\). B reads the length as \\(2(w + 3)\\). C halves the area; D is \\(l + w\\), not an area.",
        ],
        answer: "(E) \\(152\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "Area of a parallelogram with base 9 cm and perpendicular height 4 cm?", answer: "\\(36\\ \\text{cm}^2\\)" },
        { prompt: "Area of a triangle with base 10 and height 7?", answer: "35" },
        { prompt: "A square has perimeter 36 cm. What is its area?", answer: "\\(81\\ \\text{cm}^2\\)", method: "Side 9 cm" },
        { prompt: "Area of a trapezium with parallel sides 5 and 9 and height 4?", answer: "28" },
      ],
      traps: [
        {
          title: "Perimeter counts every side",
          body: "A rectangle has two lengths and two widths, so its perimeter is \\(2(l + w)\\). Setting \\(l + w\\) equal to the perimeter gives a rectangle far too big, and its area is usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-circle-measure",
      name: "Circle measures: circumference, area, arcs and sectors",
      intuition:
        "An arc is a fraction of the circumference and a sector is the same fraction of the area. The fraction is the angle at the centre out of 360°. So every arc or sector problem is the whole-circle formula times \\(\\theta/360\\).",
      definition:
        "For a circle of radius \\(r\\) (diameter \\(2r\\)):\n" +
        "- **Circumference** \\(2\\pi r\\); **area** \\(\\pi r^2\\).\n" +
        "- An **arc** cut off by a centre angle \\(\\theta^\\circ\\) has length \\(\\dfrac{\\theta}{360} \\times 2\\pi r\\).\n" +
        "- A **sector** (a slice like a pizza piece) with centre angle \\(\\theta^\\circ\\) has area \\(\\dfrac{\\theta}{360} \\times \\pi r^2\\).\n" +
        "- In radians: arc \\(r\\theta\\), sector \\(\\tfrac{1}{2}r^2\\theta\\).\n" +
        "- The perimeter of a sector is the arc plus two radii.",
      formula: {
        label: "Arc and sector",
        latex: "\\text{arc} = \\frac{\\theta}{360} \\times 2\\pi r \\qquad \\text{sector} = \\frac{\\theta}{360} \\times \\pi r^2",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle at the centre, in degrees" },
          { symbol: "\\(r\\)", meaning: "radius" },
        ],
      },
      authoredExample: {
        prompt: "A circle has radius 9 cm. A sector has a centre angle of \\(80^\\circ\\). Find its arc length, its area and its perimeter.",
        steps: [
          "Fraction of the circle: \\(80/360 = 2/9\\).",
          "Arc: \\(\\tfrac{2}{9} \\times 18\\pi = 4\\pi \\approx 12.6\\) cm.",
          "Area: \\(\\tfrac{2}{9} \\times 81\\pi = 18\\pi \\approx 56.5\\ \\text{cm}^2\\).",
          "Perimeter: \\(4\\pi + 9 + 9 = 4\\pi + 18 \\approx 30.6\\) cm.",
        ],
        answer: "Arc \\(4\\pi\\) cm; area \\(18\\pi\\ \\text{cm}^2\\); perimeter \\(4\\pi + 18\\) cm",
      },
      selfCheckExample: {
        prompt: "A circle has area \\(64\\pi\\ \\text{cm}^2\\). A sector of this circle has area \\(8\\pi\\ \\text{cm}^2\\). What is the angle of the sector?",
        options: ["\\(45^\\circ\\)", "\\(22.5^\\circ\\)", "\\(8^\\circ\\)", "\\(90^\\circ\\)", "\\(60^\\circ\\)"],
        steps: [
          "The sector is \\(8\\pi / 64\\pi = 1/8\\) of the circle.",
          "Angle: \\(\\tfrac{1}{8} \\times 360^\\circ = 45^\\circ\\).",
          "B takes a fraction of \\(180^\\circ\\) instead of \\(360^\\circ\\); C reads the area number as the angle.",
        ],
        answer: "(A) \\(45^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Circumference of a circle of radius 7 cm?", answer: "\\(14\\pi \\approx 44\\) cm" },
        { prompt: "Area of a circle of diameter 10 cm?", answer: "\\(25\\pi\\ \\text{cm}^2\\)", method: "Radius 5" },
        { prompt: "Arc length of a \\(90^\\circ\\) arc of radius 4?", answer: "\\(2\\pi\\)" },
        { prompt: "Area of a \\(120^\\circ\\) sector of radius 3?", answer: "\\(3\\pi\\)" },
      ],
      traps: [
        {
          title: "Check whether you are given the radius or the diameter",
          body: "A circle of diameter 10 has radius 5 and area \\(25\\pi\\), not \\(100\\pi\\). Using the diameter in \\(\\pi r^2\\) makes the area four times too big.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-geo-circle-theorems",
      name: "Circle facts: chords, tangents and inscribed angles",
      intuition:
        "Most circle theorems come from one picture: two radii make an isosceles triangle. From it you get the angle at the centre being twice the angle at the edge, and from that the angle in a semicircle, angles in the same segment and the tangent-chord rule.",
      definition:
        "- A **chord** joins two points of the circle; a **tangent** touches it at one point only.\n" +
        "- An **inscribed angle** has its vertex on the circle, its arms passing through the ends of a chord.\n" +
        "- A chord divides the circle into two **segments**: the major (larger) and the minor (smaller).\n" +
        "- A **cyclic quadrilateral** has all four corners on a circle.",
      table: {
        columns: ["Fact", "Statement"],
        rows: [
          { cells: ["Tangent and radius", "A tangent is perpendicular to the radius at the point of contact"] },
          { cells: ["Two tangents from one point", "Have equal lengths"] },
          { cells: ["Perpendicular from the centre to a chord", "Bisects the chord"] },
          { cells: ["Angle at the centre", "Is twice the inscribed angle standing on the same arc"] },
          { cells: ["Angles in the same segment", "Inscribed angles on the same arc are equal"] },
          { cells: ["Angle in a semicircle", "An inscribed angle standing on a diameter is \\(90^\\circ\\)"] },
          { cells: ["Cyclic quadrilateral", "Opposite angles add up to \\(180^\\circ\\)"] },
          {
            cells: ["Tangent and chord (alternate segment theorem)", "The angle between a tangent and a chord equals the inscribed angle on that chord in the other segment"],
            noteAmber: "They are equal: not complementary, not supplementary.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Points A, B and C lie on a circle with centre O, and C is on the major arc AB. The angle AOB at the centre is \\(130^\\circ\\). What is the angle ACB?",
        options: ["\\(130^\\circ\\)", "\\(65^\\circ\\)", "\\(50^\\circ\\)", "\\(115^\\circ\\)", "\\(260^\\circ\\)"],
        steps: [
          "The angle at the centre is twice the inscribed angle on the same arc: \\(ACB = 130^\\circ / 2 = 65^\\circ\\).",
          "D would be the inscribed angle from a point on the minor arc (\\(180^\\circ - 65^\\circ\\)). E doubles instead of halving; C is \\(180^\\circ - 130^\\circ\\), which no theorem gives.",
        ],
        answer: "(B) \\(65^\\circ\\)",
      },
      practiceSet: [
        { prompt: "A chord of length 16 cm lies in a circle of radius 10 cm. How far is it from the centre?", answer: "6 cm", method: "\\(\\sqrt{10^2 - 8^2}\\)" },
        { prompt: "A triangle is drawn in a circle with one side a diameter. What is the angle opposite that side?", answer: "\\(90^\\circ\\)" },
        { prompt: "One angle of a cyclic quadrilateral is \\(75^\\circ\\). What is the opposite angle?", answer: "\\(105^\\circ\\)" },
        { prompt: "A tangent makes \\(40^\\circ\\) with a chord AB at A. What is the inscribed angle on AB in the other segment?", answer: "\\(40^\\circ\\)" },
      ],
      traps: [
        {
          title: "The centre angle is double the edge angle, not half",
          body: "On the same arc, the angle at the centre is the larger one: twice the inscribed angle. Halving the inscribed angle to get the centre angle reverses the theorem.",
        },
      ],
    },
  ],
};
