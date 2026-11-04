import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 11 Areas Related to Circles. Statements checked
 * against the NCERT Class 10 text (rationalised); formulas rebuilt; most-asked
 * years and marks from the CBSE board past-paper questions in the bank,
 * 2023-2026. Shaded regions built from several figures are no longer a
 * section of the rationalised book but were set from 2023 to 2026, so they
 * stay (as standard results).
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Areas Related to Circles",
  chapterSlug: "areas-related-to-circles",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 11",
  keyPoints: [
    {
      term: "Sector",
      text: "The part of the circular region enclosed by **two radii** and the corresponding arc is called a sector of the circle.",
    },
    {
      term: "Segment",
      text: "The part of the circular region enclosed between a **chord** and the corresponding arc is called a segment of the circle.",
    },
    {
      term: "Minor and major",
      text: "The smaller sector (or segment) is the minor one, the larger is the major one. The angle of the major sector is \\(360^\\circ - \\theta\\).",
    },
    {
      term: "Sector and segment by default",
      text: "When a question says 'sector' or 'segment', it means the **minor** sector or minor segment, unless stated otherwise.",
    },
    {
      term: "Arc and area",
      text: "A sector of angle \\(\\theta\\) is \\(\\frac{\\theta}{360^\\circ}\\) of the whole circle. So its arc is \\(\\frac{\\theta}{360^\\circ}\\) of the circumference, and its area is \\(\\frac{\\theta}{360^\\circ}\\) of \\(\\pi r^2\\).",
    },
    {
      term: "Area of a segment",
      text: "Area of segment = area of the corresponding sector \\(-\\) area of the corresponding triangle OAB.",
    },
    {
      term: "Major sector and segment",
      text: "Area of the major sector \\(= \\pi r^2 -\\) area of the minor sector. Area of the major segment \\(= \\pi r^2 -\\) area of the minor segment.",
    },
  ],
  formulas: [
    { label: "Circumference and area", latex: "C = 2\\pi r, \\qquad A = \\pi r^2" },
    { label: "Length of an arc", latex: "l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r" },
    { label: "Area of a sector", latex: "A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2 = \\frac{1}{2} l r" },
    { label: "Perimeter of a sector", latex: "P = 2r + \\frac{\\theta}{360^\\circ} \\times 2\\pi r" },
    { label: "Area of a minor segment", latex: "\\frac{\\theta}{360^\\circ}\\pi r^2 - \\text{ar}(\\Delta OAB)" },
    { label: "Triangle OAB at 60°, 90°, 120°", latex: "\\frac{\\sqrt{3}}{4}r^2, \\qquad \\frac{1}{2}r^2, \\qquad \\frac{\\sqrt{3}}{4}r^2" },
    { label: "Clock hands", latex: "\\text{minute hand: } 6^\\circ \\text{ per minute}, \\qquad \\text{hour hand: } 30^\\circ \\text{ per hour}" },
    { label: "Distance in n revolutions", latex: "\\text{distance} = n \\times 2\\pi r" },
  ],
  derivations: [
    {
      title: "Area of the minor and major segments when a chord of a circle of radius 14 cm subtends 60° at the centre",
      steps: [
        "Sector OAPB: \\(\\frac{60}{360} \\times \\frac{22}{7} \\times 14^2 = \\frac{308}{3} \\approx 102.67\\ \\text{cm}^2\\).",
        "\\(OA = OB\\) and \\(\\angle AOB = 60^\\circ\\), so \\(\\Delta OAB\\) is equilateral: area \\(= \\frac{\\sqrt{3}}{4} \\times 14^2 = 49\\sqrt{3} \\approx 84.77\\ \\text{cm}^2\\).",
        "Minor segment \\(= 102.67 - 84.77 \\approx 17.90\\ \\text{cm}^2\\).",
        "Major segment \\(= \\pi r^2 - \\) minor segment \\(= 616 - 17.90 = 598.10\\ \\text{cm}^2\\).",
      ],
    },
    {
      title: "Area of the segment when the angle is 120°",
      steps: [
        "Draw \\(OM \\perp AB\\). Then \\(\\angle AOM = 60^\\circ\\), \\(OM = r\\cos 60^\\circ = \\frac{r}{2}\\), \\(AM = r\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}r\\).",
        "\\(AB = 2AM = \\sqrt{3}\\,r\\), so \\(\\text{ar}(\\Delta OAB) = \\frac{1}{2} \\times \\sqrt{3}r \\times \\frac{r}{2} = \\frac{\\sqrt{3}}{4}r^2\\).",
        "Segment \\(= \\frac{120}{360}\\pi r^2 - \\frac{\\sqrt{3}}{4}r^2 = \\left(\\frac{\\pi}{3} - \\frac{\\sqrt{3}}{4}\\right)r^2\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Sector and segment of a circle",
      labels: ["Centre O and radius r", "Chord AB", "Angle at the centre", "Minor sector OAPB shaded", "Minor segment APB shaded", "Major sector or segment named"],
    },
  ],
  mostAsked: [
    { topic: "Case study: brooch, piece of land, playground and parking, garden: sectors, wire lengths, areas and costs", marks: 2, years: [2026, 2025, 2023] },
    { topic: "Area and perimeter of a sector; find its angle or radius from the area", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Area of a segment (minor or major) when a chord subtends 60°, 90° or 120° at the centre", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Length of an arc, circumference, or the angle from an arc", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Clock hands, car wipers and a grazing horse", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Shaded regions made of circles, semicircles, squares and triangles", marks: 1, years: [2026, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Shaded regions done in one step",
      body: "Split a shaded region into circles, sectors, squares and triangles. Add the pieces that are shaded, subtract the pieces cut out.",
    },
    {
      title: "Perimeter of a sector without the radii",
      body: "Perimeter of a sector = arc length **+ 2r**. The arc alone is not the perimeter.",
    },
    {
      title: "Segment area taken as the sector area",
      body: "Subtract the triangle. For a \\(90^\\circ\\) chord, the triangle is \\(\\frac{1}{2}r^2\\); for \\(60^\\circ\\) it is equilateral, \\(\\frac{\\sqrt{3}}{4}r^2\\).",
    },
    {
      title: "Using the diameter as the radius",
      body: "A circle of diameter 20 cm has \\(r = 10\\) cm. Read the figure carefully before substituting.",
    },
    {
      title: "Wrong angle for clock hands",
      body: "The minute hand turns \\(360^\\circ\\) in 60 minutes (\\(6^\\circ\\) a minute). The hour hand turns \\(30^\\circ\\) an hour, so from 7:00 to 8:10 it turns \\(35^\\circ\\).",
    },
    {
      title: "Choosing pi badly",
      body: "Use \\(\\frac{22}{7}\\) when the radius is a multiple of 7, and \\(3.14\\) when the question says so. Write the units (cm or \\(\\text{cm}^2\\)).",
    },
  ],
};

export default sheet;
