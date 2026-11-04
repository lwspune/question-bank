import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 7 Coordinate Geometry. Statements checked against
 * the NCERT Class 10 text (rationalised); formulas rebuilt; most-asked years
 * and marks from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Coordinate Geometry",
  chapterSlug: "coordinate-geometry",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 7",
  keyPoints: [
    {
      term: "Distance formula",
      text: "The distance between \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) is \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).",
    },
    {
      term: "Distance from the origin",
      text: "The distance of a point \\(P(x, y)\\) from the origin is \\(\\sqrt{x^2 + y^2}\\).",
    },
    {
      term: "Distance from the axes",
      text: "The distance of a point from the y-axis is its x-coordinate (abscissa); from the x-axis, its y-coordinate (ordinate). So \\((a, -b)\\) is \\(|b|\\) units from the x-axis.",
    },
    {
      term: "Points on an axis",
      text: "A point on the x-axis is \\((x, 0)\\); a point on the y-axis is \\((0, y)\\). Use this when an axis divides a segment or a line meets an axis.",
    },
    {
      term: "Collinear points",
      text: "A, B, C are collinear (on one line) if the sum of two of the distances equals the third, for example \\(AB + BC = AC\\).",
    },
    {
      term: "Section formula",
      text: "The point dividing the join of \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\) internally in the ratio \\(m_1 : m_2\\) is \\(\\left(\\frac{m_1x_2 + m_2x_1}{m_1 + m_2}, \\frac{m_1y_2 + m_2y_1}{m_1 + m_2}\\right)\\).",
    },
    {
      term: "Ratio k : 1",
      text: "To find an unknown ratio, take it as \\(k : 1\\), write the point by the section formula, and use the known coordinate (for example \\(x = 0\\) on the y-axis) to find \\(k\\).",
    },
    {
      term: "Mid-point",
      text: "The mid-point divides the segment in the ratio \\(1 : 1\\): it is \\(\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)\\).",
    },
    {
      term: "Points of trisection",
      text: "Points dividing a segment in three equal parts: one divides it in \\(1 : 2\\), the other in \\(2 : 1\\).",
    },
    {
      term: "Parallelogram",
      text: "Diagonals of a parallelogram (also rectangle, rhombus, square) bisect each other, so the mid-point of AC = the mid-point of BD.",
    },
  ],
  formulas: [
    { label: "Distance formula", latex: "PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" },
    { label: "Distance from the origin", latex: "OP = \\sqrt{x^2 + y^2}" },
    { label: "Section formula", latex: "P = \\left(\\frac{m_1x_2 + m_2x_1}{m_1 + m_2},\\ \\frac{m_1y_2 + m_2y_1}{m_1 + m_2}\\right)" },
    { label: "Mid-point formula", latex: "M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)" },
    { label: "Ratio by the x-axis", latex: "k = -\\frac{y_1}{y_2} \\quad (\\text{ratio } k : 1)" },
    { label: "Ratio by the y-axis", latex: "k = -\\frac{x_1}{x_2} \\quad (\\text{ratio } k : 1)" },
  ],
  derivations: [
    {
      title: "Find the ratio in which the y-axis divides the join of \\((5, -6)\\) and \\((-1, -4)\\), and the point of division",
      steps: [
        "Let the ratio be \\(k : 1\\). The point is \\(\\left(\\frac{-k + 5}{k + 1}, \\frac{-4k - 6}{k + 1}\\right)\\).",
        "On the y-axis, \\(x = 0\\): \\(-k + 5 = 0\\), so \\(k = 5\\). The ratio is \\(5 : 1\\).",
        "Put \\(k = 5\\): \\(y = \\frac{-20 - 6}{6} = -\\frac{13}{3}\\). The point is \\(\\left(0, -\\frac{13}{3}\\right)\\).",
      ],
    },
    {
      title: "Show that three points form an isosceles (or right) triangle, or are collinear",
      steps: [
        "Find all three distances AB, BC, CA by the distance formula. Keep them as \\(\\sqrt{\\ }\\) or squares.",
        "Isosceles: two distances equal. Equilateral: all three equal.",
        "Right-angled: the square of the longest equals the sum of the squares of the other two.",
        "Collinear: the sum of the two smaller distances equals the largest. Then no triangle is formed.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Find the ratio in which the x-axis, the y-axis, a line or a given point divides a segment", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Equidistant points and circles: a relation between x and y, find x, the radius or k", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Type of figure: isosceles, right or equilateral triangle, collinear points, rhombus, parallelogram or rectangle", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Mid-point: find it, use it to find k, a median's length or the centre of a square", years: [2026, 2025, 2024, 2023] },
    { topic: "Coordinates of a dividing point: given ratio, trisection, four equal parts, AC = 2BC", years: [2026, 2025, 2024, 2023] },
    { topic: "Distance formula: between two points, from the origin, or find p from a given distance", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Distance of a point from an axis, or where a line meets the axes", marks: 1, years: [2026, 2025, 2023] },
    { topic: "Case study on a map or grid: distances, coordinates of a place, type of triangle", years: [2026, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Swapping x1 and x2 in the section formula",
      body: "In the ratio \\(m_1 : m_2\\), \\(m_1\\) multiplies the **second** point: \\(\\frac{m_1x_2 + m_2x_1}{m_1 + m_2}\\). Name A and B clearly first.",
    },
    {
      title: "Distance from an axis",
      body: "The distance of \\((x, y)\\) from the x-axis is \\(|y|\\), not \\(|x|\\). Distance of \\((-6, 8)\\) from the x-axis is 8; from the origin it is 10.",
    },
    {
      title: "Dropping the sign inside a square",
      body: "\\((x_2 - x_1)^2\\) with \\(x_1 = -3\\): write \\((2 - (-3))^2 = 25\\). Brackets prevent sign errors.",
    },
    {
      title: "Radius from a diameter",
      body: "Given the ends of a diameter, the centre is their mid-point, and the radius is **half** the distance between them.",
    },
    {
      title: "Taking the vertices of a parallelogram out of order",
      body: "For ABCD in order, AC and BD are the diagonals. Equate the mid-points of AC and BD, not of AB and CD.",
    },
  ],
};

export default sheet;
