import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 7 Mensuration. Definitions follow the Balbharati
 * book; formulas rebuilt (the book text loses its powers, roots and pi).
 * Most-asked from the SSC board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Mensuration",
  chapterSlug: "mensuration",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Slant height of a cone",
      text: "The slant height \\(l\\), the perpendicular height \\(h\\) and the base radius \\(r\\) form a right triangle: \\(l^2 = h^2 + r^2\\).",
    },
    {
      term: "Recasting (melting one solid into others)",
      text: "The volume does not change. Volume of the solid melted = number of new solids × volume of one new solid.",
    },
    {
      term: "Frustum of a cone",
      text: "When a cone is cut parallel to its base we get two figures; one is a cone and the other is a frustum. A bucket and a drinking glass are frustums.",
    },
    {
      term: "Sector of a circle",
      text: "The part enclosed by two radii of the circle and the arc joining their end points. With the minor arc it is a minor sector; with the major arc, a major sector.",
    },
    {
      term: "Length of an arc",
      text: "If the measure of an arc is \\(\\theta\\), its length is the circumference multiplied by \\(\\frac{\\theta}{360}\\).",
    },
    {
      term: "Arc and sector",
      text: "Area of a sector \\(= \\frac{\\text{length of arc} \\times \\text{radius}}{2}\\), so \\(A = \\frac{lr}{2}\\). Use it when the arc length is given and the angle is not.",
    },
    {
      term: "Segment of a circle",
      text: "The region bounded by a chord and its arc. Minor arc: minor segment; major arc: major segment; a diameter gives a semicircular segment.",
    },
    {
      term: "Area of a minor segment",
      text: "Area of the sector minus area of the triangle formed by the two radii and the chord: \\(A(\\text{segment } PXQ) = A(O\\text{-}PXQ) - A(\\triangle OPQ)\\).",
    },
    {
      term: "Units",
      text: "\\(1 \\text{ litre} = 1000 \\text{ cm}^3\\); \\(1 \\text{ m} = 100 \\text{ cm}\\). Change everything to one unit before you substitute.",
    },
  ],
  formulas: [
    { label: "Cuboid and cube", latex: "V = lbh, \\ \\ TSA = 2(lb + bh + hl) \\qquad V = l^3, \\ \\ TSA = 6l^2" },
    { label: "Cylinder", latex: "CSA = 2\\pi rh \\qquad TSA = 2\\pi r(r + h) \\qquad V = \\pi r^2 h" },
    { label: "Cone", latex: "l = \\sqrt{h^2 + r^2} \\qquad CSA = \\pi rl \\qquad TSA = \\pi r(r + l) \\qquad V = \\frac{1}{3}\\pi r^2 h" },
    { label: "Sphere", latex: "S = 4\\pi r^2 \\qquad V = \\frac{4}{3}\\pi r^3" },
    { label: "Hemisphere (solid)", latex: "CSA = 2\\pi r^2 \\qquad TSA = 3\\pi r^2 \\qquad V = \\frac{2}{3}\\pi r^3" },
    { label: "Frustum: slant height", latex: "l = \\sqrt{h^2 + (r_1 - r_2)^2}" },
    { label: "Frustum: surface areas", latex: "CSA = \\pi l(r_1 + r_2) \\qquad TSA = \\pi l(r_1 + r_2) + \\pi r_1^2 + \\pi r_2^2" },
    { label: "Frustum: volume", latex: "V = \\frac{1}{3}\\pi h(r_1^2 + r_2^2 + r_1 r_2)" },
    { label: "Arc length and sector area", latex: "l = \\frac{\\theta}{360} \\times 2\\pi r \\qquad A = \\frac{\\theta}{360} \\times \\pi r^2 = \\frac{lr}{2}" },
    { label: "Area of a minor segment", latex: "A = r^2\\left(\\frac{\\pi\\theta}{360} - \\frac{\\sin\\theta}{2}\\right)" },
    { label: "Circle", latex: "C = 2\\pi r \\qquad A = \\pi r^2" },
  ],
  derivations: [
    {
      title: "Relation between the length of an arc and the area of a sector",
      steps: [
        "\\(A = \\frac{\\theta}{360} \\times \\pi r^2\\) (I) and \\(l = \\frac{\\theta}{360} \\times 2\\pi r\\), so \\(\\frac{\\theta}{360} = \\frac{l}{2\\pi r}\\) (II).",
        "Put (II) in (I): \\(A = \\frac{l}{2\\pi r} \\times \\pi r^2 = \\frac{lr}{2}\\).",
      ],
    },
    {
      title: "Area of a minor segment",
      steps: [
        "Draw radii OP and OQ. Segment PXQ = sector O-PXQ minus \\(\\triangle OPQ\\).",
        "\\(A(\\triangle OPQ) = \\frac{1}{2}r^2\\sin\\theta\\) (height from P is \\(r\\sin\\theta\\)).",
        "So \\(A = \\frac{\\theta}{360}\\pi r^2 - \\frac{1}{2}r^2\\sin\\theta = r^2\\left(\\frac{\\pi\\theta}{360} - \\frac{\\sin\\theta}{2}\\right)\\). For \\(\\theta = 90^\\circ\\), the triangle is \\(\\frac{1}{2}r^2\\).",
      ],
    },
    {
      title: "How many small solids can be made by melting a big one",
      steps: [
        "Write: volume of the big solid = \\(n\\) × volume of one small solid.",
        "Use radius, not diameter, and the same unit for both.",
        "\\(n = \\frac{\\text{volume of big solid}}{\\text{volume of one small solid}}\\); cancel \\(\\pi\\) before you multiply.",
      ],
    },
  ],
  diagrams: [
    { title: "Frustum of a cone", labels: ["radii r1 and r2 of the circular faces", "height h", "slant height l"] },
    { title: "Sector and segment", labels: ["centre O, radii OP and OQ", "central angle θ", "chord PQ", "minor segment PXQ", "major segment PYQ"] },
    { title: "Cone", labels: ["base radius r", "perpendicular height h", "slant height l", "right angle at the centre of the base"] },
  ],
  mostAsked: [
    { topic: "Cone: slant height, volume or curved surface area", marks: 2, years: [2025, 2024, 2023, 2019, 2018] },
    { topic: "Cube, cuboid and cylinder: volume or surface area", marks: 1, years: [2026, 2025, 2024, 2020, 2018, 2017] },
    { topic: "Melting and recasting, or a solid made of two or more shapes", marks: 4, years: [2026, 2025, 2024, 2023, 2020, 2019, 2017, 2016] },
    { topic: "Sphere: surface area or volume", marks: 2, years: [2026, 2025, 2024, 2023, 2019, 2016] },
    { topic: "Length of an arc and area of a sector", marks: 2, years: [2026, 2025, 2024, 2016] },
    { topic: "Frustum: capacity, curved or total surface area", marks: 3, years: [2026, 2025, 2023] },
    { topic: "Area of a shaded region made of squares, sectors and circles", marks: 2, years: [2026, 2024, 2020, 2019] },
    { topic: "Area or circumference of a circle", marks: 1, years: [2019, 2017] },
  ],
  mistakes: [
    {
      title: "Using the diameter as the radius",
      body: "Coins, pipes and balls are often given by diameter. Halve it first: a coin of diameter 2.2 cm has \\(r = 1.1\\) cm.",
    },
    {
      title: "Mixing units",
      body: "A height of 0.2 m is 20 cm. Convert before you substitute, and change cm³ to litres by dividing by 1000.",
    },
    {
      title: "Frustum slant height with r1 + r2",
      body: "Use the **difference** of the radii: \\(l = \\sqrt{h^2 + (r_1 - r_2)^2}\\). The sum goes only into the surface area.",
    },
    {
      title: "Adding the triangle to the sector",
      body: "Minor segment = sector **minus** triangle. Major segment = circle minus minor segment.",
    },
    {
      title: "Hemisphere total surface area",
      body: "A solid hemisphere has \\(3\\pi r^2\\) (curved \\(2\\pi r^2\\) plus the flat circle \\(\\pi r^2\\)). A sphere has \\(4\\pi r^2\\).",
    },
  ],
};

export default sheet;
