import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M2_SHADED_NOTE: SubtopicNote = {
  subtopicName: "Combined and Shaded Regions",
  title: "Combined and Shaded Regions",
  oneLineDefinition:
    "A shaded region is a whole shape with known pieces taken away or added on, so its area is a sum or difference of areas from the earlier pages.",
  whyItMatters:
    "Sixteen questions in the bank, fifteen of them from the 2025 shifts, and half are MODERATE: the hardest page of the chapter. Nothing here is a new formula. The work is seeing which pieces make up the region: a segment is a sector minus a triangle, and a figure inside another touches it at points that fix its size.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm2sh-segment",
      name: "Area of a segment: sector minus triangle",
      intuition:
        "A chord cuts a slice of the circle away from the centre. The sector reaches all the way to the centre; take away the triangle between the chord and the centre, and what remains is the thin piece between the chord and the arc.",
      definition:
        "- A **segment** is the region between a chord and its arc. The **minor** segment is the smaller piece.\n" +
        "- Segment \\(=\\) sector \\(-\\) triangle formed by the two radii and the chord.\n" +
        "- The triangle has two sides \\(r\\) with angle \\(\\theta\\) between them, so its area is \\(\\frac{1}{2}r^2\\sin\\theta\\):\n" +
        "- \\(60^\\circ\\): the triangle is equilateral, area \\(\\frac{\\sqrt{3}}{4}r^2\\). A chord equal to the radius means this case.\n" +
        "- \\(90^\\circ\\): a right triangle, area \\(\\frac{r^2}{2}\\).\n" +
        "- \\(120^\\circ\\): area \\(\\frac{\\sqrt{3}}{4}r^2\\) again, since \\(\\sin 120^\\circ = \\sin 60^\\circ\\). \\(150^\\circ\\): area \\(\\frac{r^2}{4}\\).\n" +
        "- **Major segment** \\(=\\) whole circle \\(-\\) minor segment.\n" +
        "- **Fast route:** a segment's area is positive and smaller than its sector. Work out each option roughly (\\(\\pi \\approx 3.14\\), \\(\\sqrt{3} \\approx 1.73\\)) and strike out any that is negative or larger than the sector. Safe for elimination; it does not replace the working when two options survive.",
      formula: {
        label: "Area of a segment",
        latex: "A_{\\text{segment}} = \\frac{\\theta}{360^\\circ} \\pi r^2 - \\frac{1}{2}r^2\\sin\\theta",
      },
      authoredExample: {
        prompt: "A chord of a circle of radius 14 cm makes an angle of 90° at the centre. Find the area of the minor segment. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Sector \\(= \\frac{1}{4} \\times \\frac{22}{7} \\times 196 = 154\\ \\text{cm}^2\\).",
          "Triangle \\(= \\frac{1}{2} \\times 14 \\times 14 = 98\\ \\text{cm}^2\\).",
          "Segment \\(= 154 - 98 = 56\\ \\text{cm}^2\\).",
        ],
        answer: "\\(56\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A chord of a circle of radius 6 cm makes an angle of 120° at the centre. Find the area of the minor segment.",
        steps: [
          "Sector \\(= \\frac{1}{3} \\times 36\\pi = 12\\pi\\).",
          "Triangle \\(= \\frac{1}{2} \\times 36 \\times \\frac{\\sqrt{3}}{2} = 9\\sqrt{3}\\).",
          "Segment \\(= 12\\pi - 9\\sqrt{3}\\ \\text{cm}^2\\).",
        ],
        answer: "\\(12\\pi - 9\\sqrt{3}\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A chord of a circle of radius 4 cm makes an angle of 60° at the centre. What is the area of the triangle formed by the chord and the two radii?", answer: "\\(4\\sqrt{3}\\ \\text{cm}^2\\)" },
        { prompt: "A chord of a circle of radius 10 cm makes an angle of 30° at the centre. What is the area of the triangle formed by the chord and the two radii?", answer: "\\(25\\ \\text{cm}^2\\)" },
        { prompt: "A circle of radius 7 cm has a minor segment of area 14 cm². What is the area of the major segment? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(140\\ \\text{cm}^2\\)" },
        { prompt: "A chord of a circle of radius 2 cm makes an angle of 90° at the centre. What is the area of the minor segment?", answer: "\\((\\pi - 2)\\ \\text{cm}^2\\)" },
      ],
      pyqExampleId: "4c5c0840-31b0-45ca-9211-61e40a72f70d",
      traps: [
        {
          title: "Giving the sector as the segment",
          body: "The sector runs to the centre; the segment stops at the chord. Subtract the triangle between the chord and the centre.",
        },
        {
          title: "Using the equilateral triangle at every angle",
          body: "\\(\\frac{\\sqrt{3}}{4}r^2\\) is the triangle only at \\(60^\\circ\\) (and, by the same sine, \\(120^\\circ\\)). At \\(90^\\circ\\) it is \\(\\frac{r^2}{2}\\); in general use \\(\\frac{1}{2}r^2\\sin\\theta\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2sh-pieces",
      name: "Shaded areas: the whole minus the holes, or the sum of the pieces",
      intuition:
        "Most shaded figures are a simple outline with simple shapes cut out of it, or a few simple shapes placed side by side. Name each piece, find its area with a rule you already know, then subtract or add.",
      definition:
        "- **Whole minus holes:** shaded area \\(=\\) outer shape \\(-\\) every piece removed (a pond in a field, a hole in a nut).\n" +
        "- **Sum of pieces:** a figure built from shapes side by side is the sum of their areas. A share of the total is that piece \\(\\div\\) the total \\(\\times 100\\).\n" +
        "- **Equal circles at the corners:** the sectors drawn at the three corners of any triangle have angles adding to \\(180^\\circ\\), so together they make **half a circle**. At the four corners of a square or rectangle they add to \\(360^\\circ\\), a **full circle**.\n" +
        "- **A hole of the same shape:** a regular hexagon of side \\(a\\) with a hexagonal hole of side \\(b\\) leaves \\(\\frac{3\\sqrt{3}}{2}(a^2 - b^2)\\), the difference of the squares of the sides, not the square of the difference.\n" +
        "- **Fast route:** never find the corner sectors one by one; add their angles first.",
      formula: {
        label: "Corner sectors of equal radius",
        latex: "\\text{three corners of a triangle: } \\frac{1}{2}\\pi r^2 \\qquad \\text{four corners of a rectangle: } \\pi r^2",
      },
      authoredExample: {
        prompt: "A square of side 14 cm has a quarter circle of radius 7 cm cut from each corner. Find the area that is left. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "The four quarter circles together make one full circle of radius 7: \\(\\frac{22}{7} \\times 49 = 154\\ \\text{cm}^2\\).",
          "Square \\(= 14^2 = 196\\ \\text{cm}^2\\).",
          "Left \\(= 196 - 154 = 42\\ \\text{cm}^2\\).",
        ],
        answer: "\\(42\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle has sides of 12 cm. With each corner as centre, a circle of radius 6 cm is drawn. Find the area of the triangle not covered by the circles.",
        steps: [
          "The three sectors inside the triangle have angles adding to \\(180^\\circ\\): half a circle of radius 6, that is \\(18\\pi\\).",
          "Triangle \\(= \\left(\\frac{12}{2}\\right)^2\\sqrt{3} = 36\\sqrt{3}\\).",
          "Not covered \\(= 36\\sqrt{3} - 18\\pi\\ \\text{cm}^2\\).",
        ],
        answer: "\\(36\\sqrt{3} - 18\\pi\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A square field of side 20 m has a round flower bed of radius 7 m in the middle. What area of the field is outside the bed? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(246\\ \\text{m}^2\\)" },
        { prompt: "A rectangle 12 cm by 10 cm has a quarter circle of radius 2 cm cut away at each corner. What area is left?", answer: "\\((120 - 4\\pi)\\ \\text{cm}^2\\)" },
        { prompt: "A regular hexagonal washer has outer sides of 4 cm and a hexagonal hole with sides of 2 cm. What is the area of metal?", answer: "\\(18\\sqrt{3}\\ \\text{cm}^2\\)", method: "\\(\\frac{3\\sqrt{3}}{2}(16 - 4)\\)." },
        { prompt: "A triangle of area 150 m² stands on one side of a rectangle of area 450 m². What percentage of the whole figure is the triangle?", answer: "25%" },
      ],
      pyqExampleId: "10956bb8-6a88-4c42-9412-7bba346dda98",
      traps: [
        {
          title: "Counting each corner sector as a full circle",
          body: "Three equal circles drawn at a triangle's corners each put only a sector inside it. Together those sectors are half of one circle, because the triangle's angles add to \\(180^\\circ\\).",
        },
        {
          title: "Squaring the difference for a hole of the same shape",
          body: "A hexagon of side 5 with a hexagonal hole of side 2 leaves \\(\\frac{3\\sqrt{3}}{2}(25 - 4)\\), not \\(\\frac{3\\sqrt{3}}{2}(5 - 2)^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2sh-inscribed",
      name: "Inscribed figures: a circle in a square or triangle, a square or hexagon in a circle",
      intuition:
        "When one figure fits exactly inside another, they touch at a few points, and those points fix one size from the other. Find the one length they share (a diameter, a diagonal, a radius) and every area follows.",
      definition:
        "- **Circle in a square** of side \\(a\\): the diameter equals the side, so \\(r = \\frac{a}{2}\\). The corners left over have area \\(a^2 - \\frac{\\pi a^2}{4}\\).\n" +
        "- **Square in a circle** of radius \\(r\\): the square's diagonal is the diameter, so its area is \\(\\frac{(2r)^2}{2} = 2r^2\\).\n" +
        "- **Circle in an equilateral triangle** of side \\(a\\): from area \\(=\\) inradius \\(\\times\\) semi-perimeter, \\(r = \\frac{a}{2\\sqrt{3}}\\). The circle through the corners has radius \\(R = \\frac{a}{\\sqrt{3}} = 2r\\).\n" +
        "- **Regular hexagon in a circle** of radius \\(R\\): its side equals \\(R\\), so its area is \\(\\frac{3\\sqrt{3}}{2}R^2\\), about \\(83\\%\\) of the circle.\n" +
        "- **Fast route:** an inscribed figure is always smaller than the one around it. An option larger than the outer figure, or a leftover area that is negative, is wrong. Always safe for elimination.",
      formula: {
        label: "Inscribed figures",
        latex: "r_{\\text{in square}} = \\frac{a}{2} \\qquad A_{\\text{square in circle}} = 2r^2 \\qquad r_{\\text{in equilateral}} = \\frac{a}{2\\sqrt{3}} \\qquad R_{\\text{equilateral}} = \\frac{a}{\\sqrt{3}}",
        symbols: [
          { symbol: "a", meaning: "side of the outer square or triangle" },
          { symbol: "r, R", meaning: "radius of the circle inside, radius of the circle outside" },
        ],
      },
      authoredExample: {
        prompt: "A circle is inscribed in an equilateral triangle of side \\(12\\sqrt{3}\\) cm. Find the radius of the circle and the area of the triangle outside it.",
        steps: [
          "\\(r = \\frac{a}{2\\sqrt{3}} = \\frac{12\\sqrt{3}}{2\\sqrt{3}} = 6\\) cm.",
          "Triangle \\(= \\frac{\\sqrt{3}}{4} \\times (12\\sqrt{3})^2 = \\frac{\\sqrt{3}}{4} \\times 432 = 108\\sqrt{3}\\ \\text{cm}^2\\).",
          "Circle \\(= 36\\pi\\). Outside the circle: \\(108\\sqrt{3} - 36\\pi\\ \\text{cm}^2\\).",
        ],
        answer: "6 cm, \\(108\\sqrt{3} - 36\\pi\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A square is inscribed in a circle of radius 8 cm. Find the area of the square.",
        steps: ["The square's diagonal is the diameter, 16 cm.", "Area \\(= \\frac{16^2}{2} = 128\\ \\text{cm}^2\\)."],
        answer: "\\(128\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A circle fits exactly inside a square of side 42 cm. What area of the square is outside the circle? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(378\\ \\text{cm}^2\\)", method: "\\(1764 - 1386\\)." },
        { prompt: "A regular hexagon is inscribed in a circle of radius 6 cm. What is the perimeter of the hexagon?", answer: "36 cm" },
        { prompt: "An equilateral triangle has sides of \\(6\\sqrt{3}\\) cm. What is the radius of the circle inscribed in it?", answer: "3 cm" },
        { prompt: "An equilateral triangle has sides of 9 cm. What is the radius of the circle through its three corners?", answer: "\\(3\\sqrt{3}\\) cm" },
      ],
      pyqExampleId: "59427631-b37b-4b5c-9c22-2995b4d2b61c",
      traps: [
        {
          title: "Taking a square's side as the diameter of the circle round it",
          body: "For a square INSIDE a circle, the diagonal is the diameter. The side equals the diameter only when the circle is inside the square.",
        },
        {
          title: "Mixing up a triangle's two circles",
          body: "In an equilateral triangle the circle inside has radius \\(\\frac{a}{2\\sqrt{3}}\\) and the circle through the corners has radius \\(\\frac{a}{\\sqrt{3}}\\), exactly twice as large.",
        },
      ],
    },
  ],
};
