import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 5 Co-ordinate Geometry. Statements follow the
 * Balbharati book; formulas rebuilt (the book text loses its powers, roots and
 * fractions). Most-asked from the SSC board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Co-ordinate Geometry",
  chapterSlug: "co-ordinate-geometry",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Points on the axes",
      text: "A point on the X-axis is \\((x, 0)\\); a point on the Y-axis is \\((0, y)\\). The origin is \\((0, 0)\\). On a line parallel to an axis, one co-ordinate stays the same.",
    },
    {
      term: "Distance on an axis",
      text: "Two points on an axis are like two points on a number line: the distance is the larger co-ordinate minus the smaller, \\(x_2 - x_1\\) or \\(y_2 - y_1\\).",
    },
    {
      term: "Distance formula",
      text: "From Pythagoras in the right triangle formed with lines parallel to the axes: \\(d(A, B) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\). From the origin, \\(d(O, P) = \\sqrt{x^2 + y^2}\\).",
    },
    {
      term: "Collinear points (by distance)",
      text: "If the sum of any two distances out of \\(d(A, B)\\), \\(d(B, C)\\) and \\(d(A, C)\\) is equal to the third, then the three points are collinear.",
    },
    {
      term: "Section formula",
      text: "The point dividing the segment joining \\((x_1, y_1)\\) and \\((x_2, y_2)\\) in the ratio \\(m : n\\) is \\(\\left(\\frac{mx_2 + nx_1}{m + n}, \\frac{my_2 + ny_1}{m + n}\\right)\\).",
    },
    {
      term: "Midpoint and centroid",
      text: "The midpoint is the ratio \\(1 : 1\\) case. The centroid divides each median in the ratio \\(2 : 1\\); its co-ordinates are the averages of the three vertices.",
    },
    {
      term: "Slope of a line",
      text: "For two points on a line, slope \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\). The tan ratio of the angle made by the line with the positive direction of the X-axis is its slope: \\(m = \\tan\\theta\\).",
    },
    {
      term: "Slopes of the axes",
      text: "The slope of the X-axis and of any line parallel to it is zero. The slope of the Y-axis and of any line parallel to it cannot be determined.",
    },
    {
      term: "Parallel lines and collinear points (by slope)",
      text: "Lines with the same slope are parallel. If slope of PQ = slope of QR, then P, Q, R are collinear (Q is common).",
    },
    {
      term: "Parallelogram and kinds of triangle",
      text: "Equal slopes of both pairs of opposite sides: a parallelogram. Use distances to check equal sides (isosceles, equilateral) or Pythagoras (right angled).",
    },
  ],
  formulas: [
    { label: "Distance formula", latex: "d(A, B) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\qquad d(O, P) = \\sqrt{x^2 + y^2}" },
    { label: "Section formula, ratio m : n", latex: "P = \\left(\\frac{mx_2 + nx_1}{m + n},\\ \\frac{my_2 + ny_1}{m + n}\\right)" },
    { label: "Midpoint formula", latex: "M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)" },
    { label: "Centroid formula", latex: "G = \\left(\\frac{x_1 + x_2 + x_3}{3},\\ \\frac{y_1 + y_2 + y_3}{3}\\right)" },
    { label: "Slope", latex: "m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan\\theta" },
    { label: "Slopes to remember", latex: "\\tan 30^\\circ = \\frac{1}{\\sqrt{3}} \\qquad \\tan 45^\\circ = 1 \\qquad \\tan 60^\\circ = \\sqrt{3}" },
  ],
  derivations: [
    {
      title: "Derive the distance formula",
      steps: [
        "Take \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\). Draw BP perpendicular to the X-axis and AD perpendicular to seg BP, so \\(D = (x_2, y_1)\\).",
        "\\(AD = x_2 - x_1\\) and \\(BD = y_2 - y_1\\).",
        "In right angled \\(\\triangle ABD\\), \\(AB^2 = AD^2 + BD^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2\\).",
        "So \\(AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).",
      ],
    },
    {
      title: "Derive the section formula",
      steps: [
        "P(x, y) divides AB in the ratio \\(m : n\\). Draw AC, PQ, BD perpendicular to the X-axis: \\(C(x_1, 0)\\), \\(Q(x, 0)\\), \\(D(x_2, 0)\\).",
        "\\(AC \\parallel PQ \\parallel BD\\), so by the property of intercepts of three parallel lines, \\(\\frac{CQ}{QD} = \\frac{AP}{PB} = \\frac{m}{n}\\).",
        "\\(\\frac{x - x_1}{x_2 - x} = \\frac{m}{n}\\), so \\(x = \\frac{mx_2 + nx_1}{m + n}\\). Using perpendiculars to the Y-axis, \\(y = \\frac{my_2 + ny_1}{m + n}\\).",
      ],
    },
    {
      title: "Show that four points are the vertices of a parallelogram",
      steps: [
        "Find the slopes of AB, BC, CD and DA.",
        "Slope of AB = slope of CD, so \\(AB \\parallel CD\\); slope of BC = slope of DA, so \\(BC \\parallel DA\\).",
        "Both pairs of opposite sides are parallel, so \\(\\square ABCD\\) is a parallelogram.",
      ],
    },
  ],
  diagrams: [
    { title: "Distance formula", labels: ["A(x1, y1) and B(x2, y2)", "BP perpendicular to the X-axis", "AD perpendicular to BP", "D(x2, y1) and the right angle at D"] },
    { title: "Section formula", labels: ["A, P, B on the segment", "AC, PQ, BD perpendicular to the X-axis", "C(x1, 0), Q(x, 0), D(x2, 0)", "ratio m : n"] },
  ],
  mostAsked: [
    { topic: "Slope of a line: from the angle it makes with the X-axis, or through two points", marks: 1, years: [2026, 2025, 2024, 2019, 2017, 2016] },
    { topic: "Section formula and midpoint formula: find the point, or use the midpoint", marks: 3, years: [2026, 2025, 2024, 2023, 2022, 2020] },
    { topic: "Show that three points are collinear (by distance or slope)", marks: 2, years: [2025, 2024, 2023, 2019] },
    { topic: "Distance between two points, or from the origin", marks: 1, years: [2026, 2025, 2023, 2020, 2019] },
    { topic: "Points on the axes and on segments parallel to an axis", marks: 1, years: [2026, 2024, 2023, 2022] },
    { topic: "Show that the points form a parallelogram, or name the type of triangle", marks: 3, years: [2025, 2020, 2019] },
    { topic: "Centroid of a triangle", years: [2022] },
  ],
  mistakes: [
    {
      title: "Swapping m and n in the section formula",
      body: "m goes with the **second** point: \\(\\frac{mx_2 + nx_1}{m + n}\\). For A(4, −3), B(8, 5) and ratio 3 : 1, \\(x = \\frac{3(8) + 1(4)}{4} = 7\\).",
    },
    {
      title: "Dropping the sign of a negative co-ordinate",
      body: "Write \\(x_2 - x_1 = 5 - (-1) = 6\\) in brackets. A distance is never negative: \\((3, 4)\\) and \\((-3, 4)\\) are both 5 from the origin.",
    },
    {
      title: "Calling the slope of the Y-axis zero",
      body: "The X-axis has slope 0. The Y-axis (and any vertical line) has no slope: \\(x_2 - x_1 = 0\\) and division by 0 is not possible.",
    },
    {
      title: "Changing the order inside the slope",
      body: "Take \\(y_2 - y_1\\) and \\(x_2 - x_1\\) from the same point first. Mixing the order flips the sign.",
    },
    {
      title: "Centroid from the midpoints of the sides",
      body: "The triangle of midpoints has the same centroid as the original triangle, so average the three midpoints directly.",
    },
    {
      title: "Mixing up the equations of the axes",
      body: "Every point on the Y-axis has x co-ordinate 0, so the Y-axis is \\(x = 0\\); the X-axis is \\(y = 0\\). A segment parallel to the Y-axis keeps the same x co-ordinate.",
    },
  ],
};

export default sheet;
