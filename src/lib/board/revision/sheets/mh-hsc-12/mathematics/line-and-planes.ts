import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 6 Line and Plane. Definitions and
 * theorems in the Balbharati wording; every formula re-derived. Most-asked years
 * from the 46 board past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Line and Planes",
  chapterSlug: "line-and-planes",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Vector equation of a line",
      text: "The line through \\(A(\\bar{a})\\) parallel to \\(\\bar{b}\\) is \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\): \\(\\lambda\\) is a parameter, and this is the parametric form. Its non-parametric form is \\((\\bar{r} - \\bar{a}) \\times \\bar{b} = \\bar{0}\\).",
    },
    {
      term: "Skew lines",
      text: "A pair of lines in space which neither intersect each other nor are parallel to each other are called skew lines. Skew lines are non-coplanar; the shortest distance between them is along their common perpendicular.",
    },
    {
      term: "Coplanar lines",
      text: "Two parallel lines are always coplanar. Two non-parallel lines are coplanar (they intersect) if and only if the shortest distance between them is zero: \\((\\bar{a}_2 - \\bar{a}_1) \\cdot (\\bar{b}_1 \\times \\bar{b}_2) = 0\\).",
    },
    {
      term: "Normal to a plane",
      text: "A line perpendicular to a plane is called a normal to the plane. A plane has several normals; they all have proportional direction ratios.",
    },
    {
      term: "Plane: scalar product form",
      text: "The plane through \\(A(\\bar{a})\\) with normal \\(\\bar{n}\\) is \\(\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}\\), the vector equation of the plane in scalar product form; it is often written \\(\\bar{r} \\cdot \\bar{n} = d\\).",
    },
    {
      term: "Plane: parametric form",
      text: "The plane through \\(A(\\bar{a})\\) parallel to \\(\\bar{b}\\) and \\(\\bar{c}\\) is \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b} + \\mu\\bar{c}\\), the vector equation of the plane in parametric form. Its normal is \\(\\bar{b} \\times \\bar{c}\\).",
    },
    {
      term: "Normal form of a plane",
      text: "The plane at distance \\(p\\) from the origin, with unit normal \\(\\hat{n}\\), is \\(\\bar{r} \\cdot \\hat{n} = p\\); in Cartesian form \\(lx + my + nz = p\\). The foot of the perpendicular from the origin is \\(N(pl, pm, pn)\\).",
    },
    {
      term: "Plane through the intersection of two planes",
      text: "If the planes \\(\\bar{r} \\cdot \\bar{n}_1 = d_1\\) and \\(\\bar{r} \\cdot \\bar{n}_2 = d_2\\) intersect, then for every real \\(\\lambda\\), \\(\\bar{r} \\cdot (\\bar{n}_1 + \\lambda\\bar{n}_2) = d_1 + \\lambda d_2\\) is a plane through their line of intersection.",
    },
    {
      term: "Angle between a line and a plane",
      text: "The complementary angle of the acute angle between the normal to the plane and the line. So it is never obtuse, and uses \\(\\sin\\theta\\), not \\(\\cos\\theta\\).",
    },
    {
      term: "Line parallel or perpendicular to a plane",
      text: "The line \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\) is perpendicular to the plane \\(\\bar{r} \\cdot \\bar{n} = d\\) if and only if \\(\\bar{b}\\) and \\(\\bar{n}\\) are collinear, and parallel to it if and only if \\(\\bar{b} \\cdot \\bar{n} = 0\\).",
    },
    {
      term: "Distance of a point from a plane",
      text: "For finding the distance of a point from a plane, the equation of the plane must be in the normal form. The distance of the origin from \\(\\bar{r} \\cdot \\hat{n} = p\\) is \\(p\\).",
    },
  ],
  formulas: [
    {
      label: "Line through a point, parallel to a vector",
      latex: "\\bar{r} = \\bar{a} + \\lambda\\bar{b} \\qquad \\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}",
    },
    {
      label: "Line through two points",
      latex: "\\bar{r} = \\bar{a} + \\lambda(\\bar{b} - \\bar{a}) \\qquad \\frac{x - x_1}{x_2 - x_1} = \\frac{y - y_1}{y_2 - y_1} = \\frac{z - z_1}{z_2 - z_1}",
    },
    {
      label: "Distance of a point from a line",
      latex: "d^2 = |\\bar{\\alpha} - \\bar{a}|^2 - \\left[\\frac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\right]^2 \\qquad d = \\frac{|(\\bar{\\alpha} - \\bar{a}) \\times \\bar{b}|}{|\\bar{b}|}",
      symbols: [
        { symbol: "α", meaning: "position vector of the point P" },
        { symbol: "a, b", meaning: "the line is r = a + λb" },
      ],
    },
    {
      label: "Shortest distance between skew lines",
      latex: "d = \\frac{|(\\bar{a}_2 - \\bar{a}_1) \\cdot (\\bar{b}_1 \\times \\bar{b}_2)|}{|\\bar{b}_1 \\times \\bar{b}_2|}",
    },
    { label: "Distance between parallel lines", latex: "d = \\frac{|(\\bar{a}_2 - \\bar{a}_1) \\times \\bar{b}|}{|\\bar{b}|}" },
    { label: "Lines intersect (coplanar)", latex: "(\\bar{a}_2 - \\bar{a}_1) \\cdot (\\bar{b}_1 \\times \\bar{b}_2) = 0" },
    {
      label: "Coplanar lines in Cartesian form",
      latex: "\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0",
    },
    {
      label: "Plane through a point, normal given",
      latex: "\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n} \\qquad a(x - x_1) + b(y - y_1) + c(z - z_1) = 0",
    },
    {
      label: "Plane through a point, parallel to two vectors",
      latex: "\\bar{r} = \\bar{a} + \\lambda\\bar{b} + \\mu\\bar{c} \\qquad (\\bar{r} - \\bar{a}) \\cdot (\\bar{b} \\times \\bar{c}) = 0",
    },
    {
      label: "Plane through three points",
      latex: "(\\bar{r} - \\bar{a}) \\cdot [(\\bar{b} - \\bar{a}) \\times (\\bar{c} - \\bar{a})] = 0 \\qquad \\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \\end{vmatrix} = 0",
    },
    { label: "Normal form", latex: "\\bar{r} \\cdot \\hat{n} = p \\qquad lx + my + nz = p" },
    {
      label: "Plane through the line of intersection",
      latex: "\\bar{r} \\cdot (\\bar{n}_1 + \\lambda\\bar{n}_2) = d_1 + \\lambda d_2 \\qquad (a_1x + b_1y + c_1z + d_1) + \\lambda(a_2x + b_2y + c_2z + d_2) = 0",
    },
    {
      label: "Angles",
      latex: "\\text{lines: } \\cos\\theta = \\frac{|\\bar{b}_1 \\cdot \\bar{b}_2|}{|\\bar{b}_1||\\bar{b}_2|} \\quad \\text{planes: } \\cos\\theta = \\frac{|\\bar{n}_1 \\cdot \\bar{n}_2|}{|\\bar{n}_1||\\bar{n}_2|} \\quad \\text{line and plane: } \\sin\\theta = \\frac{|\\bar{b} \\cdot \\bar{n}|}{|\\bar{b}||\\bar{n}|}",
    },
    {
      label: "Distance of a point from a plane",
      latex: "d = |p - \\bar{a} \\cdot \\hat{n}| = \\frac{|\\bar{a} \\cdot \\bar{n} - q|}{|\\bar{n}|} \\qquad d = \\frac{|ax_1 + by_1 + cz_1 + k|}{\\sqrt{a^2 + b^2 + c^2}}",
      symbols: [
        { symbol: "q", meaning: "the plane is r·n = q" },
        { symbol: "k", meaning: "the plane is ax + by + cz + k = 0" },
      ],
    },
  ],
  derivations: [
    {
      title: "Find the vector and Cartesian equations of the line through \\(A(x_1, y_1, z_1)\\) and \\(B(x_2, y_2, z_2)\\)",
      steps: [
        "The line passes through \\(A(\\bar{a})\\) and is parallel to \\(\\overline{AB} = \\bar{b} - \\bar{a}\\).",
        "Vector form: \\(\\bar{r} = \\bar{a} + \\lambda(\\bar{b} - \\bar{a})\\).",
        "Direction ratios are \\(x_2 - x_1, y_2 - y_1, z_2 - z_1\\), so \\(\\frac{x - x_1}{x_2 - x_1} = \\frac{y - y_1}{y_2 - y_1} = \\frac{z - z_1}{z_2 - z_1}\\).",
      ],
    },
    {
      title: "Find the length of the perpendicular from \\(P(\\bar{\\alpha})\\) to the line \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\)",
      steps: [
        "The line passes through \\(A(\\bar{a})\\). Let M be the foot of the perpendicular from P.",
        "AM = projection of \\(\\overline{AP}\\) on \\(\\bar{b}\\) \\(= \\frac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\).",
        "Triangle AMP is right angled at M: \\(PM^2 = AP^2 - AM^2 = |\\bar{\\alpha} - \\bar{a}|^2 - \\left[\\frac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\right]^2\\).",
      ],
    },
    {
      title: "Find the shortest distance between the skew lines \\(\\bar{r} = \\bar{a}_1 + \\lambda_1\\bar{b}_1\\) and \\(\\bar{r} = \\bar{a}_2 + \\lambda_2\\bar{b}_2\\)",
      steps: [
        "The lines pass through \\(A(\\bar{a}_1)\\) and \\(B(\\bar{a}_2)\\). Let PQ be perpendicular to both lines.",
        "So PQ is parallel to \\(\\bar{b}_1 \\times \\bar{b}_2\\); its unit vector is \\(\\hat{n} = \\frac{\\bar{b}_1 \\times \\bar{b}_2}{|\\bar{b}_1 \\times \\bar{b}_2|}\\).",
        "PQ = projection of \\(\\overline{AB}\\) on PQ \\(= \\frac{|(\\bar{a}_2 - \\bar{a}_1) \\cdot (\\bar{b}_1 \\times \\bar{b}_2)|}{|\\bar{b}_1 \\times \\bar{b}_2|}\\).",
        "For Cartesian lines, read \\(\\bar{a}_1, \\bar{a}_2\\) from the points and \\(\\bar{b}_1, \\bar{b}_2\\) from the denominators.",
      ],
    },
    {
      title: "Find the distance between the parallel lines \\(\\bar{r} = \\bar{a}_1 + \\lambda\\bar{b}\\) and \\(\\bar{r} = \\bar{a}_2 + \\mu\\bar{b}\\)",
      steps: [
        "The lines are parallel because they have the same direction \\(\\bar{b}\\) (check the denominators are proportional).",
        "The distance is the distance of the point \\(\\bar{a}_2\\) from the first line.",
        "\\(d = \\frac{|(\\bar{a}_2 - \\bar{a}_1) \\times \\bar{b}|}{|\\bar{b}|}\\).",
      ],
    },
    {
      title: "Show that two lines intersect, and find the point of intersection",
      steps: [
        "Check \\((\\bar{a}_2 - \\bar{a}_1) \\cdot (\\bar{b}_1 \\times \\bar{b}_2) = 0\\) (the lines are not parallel), so they are coplanar and intersect.",
        "To find the point: equate the general points \\(\\bar{a}_1 + \\lambda\\bar{b}_1 = \\bar{a}_2 + \\mu\\bar{b}_2\\) component by component.",
        "Solve two equations for \\(\\lambda, \\mu\\), check the third, and substitute back.",
      ],
    },
    {
      title: "Find the vector equation of the plane through the points \\(A(\\bar{a}), B(\\bar{b}), C(\\bar{c})\\)",
      steps: [
        "For any point \\(P(\\bar{r})\\) on the plane, \\(\\overline{AP}, \\overline{AB}, \\overline{AC}\\) are coplanar.",
        "So their scalar triple product is zero: \\((\\bar{r} - \\bar{a}) \\cdot [(\\bar{b} - \\bar{a}) \\times (\\bar{c} - \\bar{a})] = 0\\).",
        "Work out \\(\\bar{n} = (\\bar{b} - \\bar{a}) \\times (\\bar{c} - \\bar{a})\\) and write \\(\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}\\); expand for the Cartesian form.",
      ],
    },
    {
      title: "Find the vector equation of the plane through \\(A(\\bar{a})\\) parallel to \\(\\bar{b}\\) and \\(\\bar{c}\\)",
      steps: [
        "\\(\\overline{AP}, \\bar{b}, \\bar{c}\\) are parallel to the same plane, so they are coplanar.",
        "Hence \\(\\overline{AP} = \\lambda\\bar{b} + \\mu\\bar{c}\\), giving \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b} + \\mu\\bar{c}\\) (parametric form).",
        "Non-parametric form: \\((\\bar{r} - \\bar{a}) \\cdot (\\bar{b} \\times \\bar{c}) = 0\\), that is \\(\\bar{r} \\cdot (\\bar{b} \\times \\bar{c}) = \\bar{a} \\cdot (\\bar{b} \\times \\bar{c})\\).",
      ],
    },
    {
      title: "Find the equation of the plane through the intersection of two planes and a given point",
      steps: [
        "Write the family \\((a_1x + b_1y + c_1z + d_1) + \\lambda(a_2x + b_2y + c_2z + d_2) = 0\\).",
        "Substitute the given point to find \\(\\lambda\\).",
        "Put \\(\\lambda\\) back and simplify. Through the origin: \\(d_1 + \\lambda d_2 = 0\\).",
      ],
    },
    {
      title: "Find the equation of the line through a point and perpendicular to two given lines",
      steps: [
        "Take the direction vectors \\(\\bar{b}_1\\) and \\(\\bar{b}_2\\) of the given lines (Cartesian: the denominators).",
        "The required direction is \\(\\bar{b}_1 \\times \\bar{b}_2\\), perpendicular to both.",
        "Write \\(\\bar{r} = \\bar{a} + \\lambda(\\bar{b}_1 \\times \\bar{b}_2)\\), and its Cartesian form. Dividing its components by its magnitude gives the direction cosines.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Equation of a plane: point and normal, point and two parallel vectors, or three points; vector form to Cartesian and back",
      years: [2026, 2025, 2022, 2019, 2017, 2016],
    },
    {
      topic: "Vector or Cartesian equation of a line: through a point parallel to a vector, or through two points",
      years: [2026, 2025, 2024, 2022, 2020, 2018, 2015],
    },
    { topic: "Angle between two lines, two planes, or a line and a plane", years: [2026, 2025, 2024, 2019, 2018] },
    { topic: "Shortest distance between skew lines, or distance between parallel lines", years: [2026, 2025, 2024, 2023, 2022, 2016] },
    {
      topic: "Distance of a point from a plane or from a line; distance of a plane from the origin",
      years: [2024, 2023, 2020, 2015],
    },
    { topic: "Line or direction perpendicular to two given lines", years: [2024, 2020, 2019, 2015] },
    { topic: "Show that two lines intersect", years: [2026] },
    { topic: "Plane through the intersection of two planes and the origin", years: [2024] },
  ],
  mistakes: [
    {
      title: "Reading the Cartesian line without making x, y, z coefficients 1",
      body: "In \\(\\frac{3x - 1}{1} = \\frac{6y + 2}{1} = \\frac{1 - z}{1}\\), rewrite as \\(\\frac{x - 1/3}{1/3} = \\frac{y + 1/3}{1/6} = \\frac{z - 1}{-1}\\) first. Only then read the point and the direction ratios.",
    },
    {
      title: "Using \\(\\cos\\theta\\) for the angle between a line and a plane",
      body: "The angle between a line and a plane is the complement of the angle with the normal, so \\(\\sin\\theta = \\frac{|\\bar{b} \\cdot \\bar{n}|}{|\\bar{b}||\\bar{n}|}\\).",
    },
    {
      title: "Finding a distance from a plane not in normal form",
      body: "Divide by \\(|\\bar{n}|\\). The distance of \\(\\bar{r} \\cdot (3\\hat{i} + 4\\hat{j} + 12\\hat{k}) = 78\\) from the origin is \\(\\frac{78}{13} = 6\\), not 78.",
    },
    {
      title: "Using the skew-lines formula for parallel lines",
      body: "For parallel lines \\(\\bar{b}_1 \\times \\bar{b}_2 = \\bar{0}\\), so the skew formula gives 0/0. Use \\(\\frac{|(\\bar{a}_2 - \\bar{a}_1) \\times \\bar{b}|}{|\\bar{b}|}\\) instead.",
    },
    {
      title: "Leaving out the modulus",
      body: "Distances and the acute angle need absolute values. A negative numerator only means the point is on the other side.",
    },
  ],
};

export default sheet;
