import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 11 Three Dimensional
 * Geometry. Definitions in NCERT's own wording, trimmed; every distance and
 * foot of perpendicular re-worked by hand; most-asked years and marks from
 * the CBSE board past-paper questions in the bank, 2022-2026 (the 2022
 * questions on planes and coplanar lines left out: the current book teaches
 * lines only).
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Three Dimensional Geometry",
  chapterSlug: "three-dimensional-geometry",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 11",
  keyPoints: [
    {
      term: "Direction cosines",
      text: "If a directed line makes angles \\(\\alpha, \\beta, \\gamma\\) with the x, y and z axes, then \\(\\cos\\alpha, \\cos\\beta, \\cos\\gamma\\) are called direction cosines of the directed line, written \\(l, m, n\\). Always \\(l^2 + m^2 + n^2 = 1\\).",
    },
    {
      term: "Reversing the direction",
      text: "If we reverse the direction of the line, the direction angles are replaced by their supplements, and the signs of the direction cosines are reversed. So a line has two sets of direction cosines.",
    },
    {
      term: "Direction ratios",
      text: "Any three numbers which are proportional to the direction cosines of a line are called the direction ratios of the line: \\(a = \\lambda l\\), \\(b = \\lambda m\\), \\(c = \\lambda n\\) for any nonzero \\(\\lambda\\).",
    },
    {
      term: "Line through two points",
      text: "The direction ratios of the line joining \\(P(x_1, y_1, z_1)\\) and \\(Q(x_2, y_2, z_2)\\) may be taken as \\(x_2 - x_1, y_2 - y_1, z_2 - z_1\\); divide by PQ for the direction cosines.",
    },
    {
      term: "Vector equation",
      text: "A line through the point with position vector \\(\\vec{a}\\), parallel to \\(\\vec{b}\\), is \\(\\vec{r} = \\vec{a} + \\lambda\\vec{b}\\). If \\(\\vec{b} = a\\hat{i} + b\\hat{j} + c\\hat{k}\\), then a, b, c are direction ratios of the line.",
    },
    {
      term: "Cartesian and parametric forms",
      text: "\\(x = x_1 + \\lambda a\\), \\(y = y_1 + \\lambda b\\), \\(z = z_1 + \\lambda c\\) are parametric equations of the line. Eliminating \\(\\lambda\\) gives the Cartesian equation \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}\\).",
    },
    {
      term: "Standard form first",
      text: "Read direction ratios only when x, y, z each have coefficient 1 in the numerator: \\(\\frac{2x - 1}{4} = \\frac{1 - y}{3} = \\frac{-z}{6}\\) is \\(\\frac{x - 1/2}{2} = \\frac{y - 1}{-3} = \\frac{z}{-6}\\), so the direction ratios are 2, \\(-3\\), \\(-6\\).",
    },
    {
      term: "Angle between two lines",
      text: "The acute angle between two lines is found from their direction ratios (or the vectors \\(\\vec{b_1}, \\vec{b_2}\\)). Angle between skew lines is the angle between two intersecting lines drawn from any point parallel to each of them.",
    },
    {
      term: "Perpendicular and parallel lines",
      text: "Lines with direction ratios \\(a_1, b_1, c_1\\) and \\(a_2, b_2, c_2\\) are perpendicular if \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\), and parallel if \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}\\).",
    },
    {
      term: "Skew lines",
      text: "Skew lines are lines in space which are neither parallel nor intersecting. They lie in different planes.",
    },
    {
      term: "Shortest distance",
      text: "If two lines intersect, the shortest distance between them is zero; if parallel, it is the perpendicular distance between them. For skew lines, the line of the shortest distance will be perpendicular to both the lines.",
    },
    {
      term: "Do the lines intersect?",
      text: "Write the general point of each line, equate the coordinates, solve two equations for \\(\\lambda\\) and \\(\\mu\\) and test the third. If it holds, the lines intersect at that point; if not (and they are not parallel), they are skew.",
    },
    {
      term: "Foot of the perpendicular",
      text: "For a point P and a line with direction ratios a, b, c: take the general point Q of the line in \\(\\lambda\\), and set \\(\\overrightarrow{PQ}\\cdot(a\\hat{i} + b\\hat{j} + c\\hat{k}) = 0\\). That \\(\\lambda\\) gives the foot Q; PQ is the perpendicular distance.",
    },
    {
      term: "Image of a point in a line",
      text: "The foot Q is the midpoint of P and its image \\(P'\\): \\(P' = 2Q - P\\), coordinate by coordinate. The distance \\(PP' = 2PQ\\).",
    },
  ],
  formulas: [
    { label: "Direction cosines from direction ratios", latex: "l = \\frac{a}{\\sqrt{a^2 + b^2 + c^2}},\\; m = \\frac{b}{\\sqrt{a^2 + b^2 + c^2}},\\; n = \\frac{c}{\\sqrt{a^2 + b^2 + c^2}} \\qquad l^2 + m^2 + n^2 = 1" },
    { label: "Direction cosines of the line PQ", latex: "\\frac{x_2 - x_1}{PQ},\\; \\frac{y_2 - y_1}{PQ},\\; \\frac{z_2 - z_1}{PQ}, \\quad PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}" },
    { label: "Angle identities for a line", latex: "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1 \\qquad \\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2 \\qquad \\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma = -1" },
    { label: "Line through a point, parallel to a vector", latex: "\\vec{r} = \\vec{a} + \\lambda\\vec{b} \\qquad \\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}" },
    { label: "Line through two points", latex: "\\vec{r} = \\vec{a} + \\lambda(\\vec{b} - \\vec{a}) \\qquad \\frac{x - x_1}{x_2 - x_1} = \\frac{y - y_1}{y_2 - y_1} = \\frac{z - z_1}{z_2 - z_1}" },
    { label: "Angle between two lines", latex: "\\cos\\theta = \\frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}} = \\frac{|\\vec{b_1}\\cdot\\vec{b_2}|}{|\\vec{b_1}||\\vec{b_2}|}" },
    { label: "Angle from direction cosines", latex: "\\cos\\theta = |l_1l_2 + m_1m_2 + n_1n_2|" },
    { label: "Perpendicular and parallel", latex: "a_1a_2 + b_1b_2 + c_1c_2 = 0 \\qquad \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}" },
    { label: "Shortest distance between skew lines", latex: "d = \\left|\\frac{(\\vec{b_1}\\times\\vec{b_2})\\cdot(\\vec{a_2} - \\vec{a_1})}{|\\vec{b_1}\\times\\vec{b_2}|}\\right|" },
    {
      label: "Shortest distance, Cartesian form",
      latex: "d = \\frac{\\left|\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}\\right|}{\\sqrt{(b_1c_2 - b_2c_1)^2 + (c_1a_2 - c_2a_1)^2 + (a_1b_2 - a_2b_1)^2}}",
    },
    { label: "Distance between parallel lines", latex: "d = \\left|\\frac{\\vec{b}\\times(\\vec{a_2} - \\vec{a_1})}{|\\vec{b}|}\\right|" },
    { label: "Line perpendicular to two lines", latex: "\\text{direction} = \\vec{b_1}\\times\\vec{b_2} \\qquad \\vec{r} = \\vec{a} + \\lambda(\\vec{b_1}\\times\\vec{b_2})" },
    { label: "Foot of the perpendicular and image", latex: "Q = (x_1 + a\\lambda,\\, y_1 + b\\lambda,\\, z_1 + c\\lambda), \\quad \\overrightarrow{PQ}\\cdot\\vec{b} = 0 \\qquad P' = 2Q - P" },
    { label: "Distance of P(a, b, c) from the axes", latex: "\\text{x-axis: } \\sqrt{b^2 + c^2} \\qquad \\text{y-axis: } \\sqrt{a^2 + c^2} \\qquad \\text{z-axis: } \\sqrt{a^2 + b^2}" },
  ],
  derivations: [
    {
      title: "Derive the shortest distance between the skew lines \\(\\vec{r} = \\vec{a_1} + \\lambda\\vec{b_1}\\) and \\(\\vec{r} = \\vec{a_2} + \\mu\\vec{b_2}\\)",
      steps: [
        "S on the first line has position vector \\(\\vec{a_1}\\), T on the second \\(\\vec{a_2}\\), so \\(\\overrightarrow{ST} = \\vec{a_2} - \\vec{a_1}\\).",
        "The shortest distance PQ is perpendicular to both lines, so it is along \\(\\hat{n} = \\frac{\\vec{b_1}\\times\\vec{b_2}}{|\\vec{b_1}\\times\\vec{b_2}|}\\).",
        "PQ is the projection of \\(\\overrightarrow{ST}\\) on \\(\\hat{n}\\): \\(d = |\\overrightarrow{ST}\\cdot\\hat{n}| = \\left|\\frac{(\\vec{b_1}\\times\\vec{b_2})\\cdot(\\vec{a_2} - \\vec{a_1})}{|\\vec{b_1}\\times\\vec{b_2}|}\\right|\\).",
      ],
    },
    {
      title: "Derive the distance between the parallel lines \\(\\vec{r} = \\vec{a_1} + \\lambda\\vec{b}\\) and \\(\\vec{r} = \\vec{a_2} + \\mu\\vec{b}\\)",
      steps: [
        "Parallel lines are coplanar. Let S (\\(\\vec{a_1}\\)) be on the first, T (\\(\\vec{a_2}\\)) on the second, and d the perpendicular distance.",
        "The parallelogram on \\(\\vec{b}\\) and \\(\\overrightarrow{ST}\\) has area \\(|\\vec{b}\\times\\overrightarrow{ST}|\\), and also base times height \\(= |\\vec{b}|\\,d\\).",
        "So \\(d = \\left|\\frac{\\vec{b}\\times(\\vec{a_2} - \\vec{a_1})}{|\\vec{b}|}\\right|\\).",
      ],
    },
    {
      title: "Find the foot of the perpendicular and the image of \\((2, -1, 5)\\) in the line \\(\\frac{x - 11}{10} = \\frac{y + 2}{-4} = \\frac{z + 8}{-11}\\)",
      steps: [
        "General point \\(Q(11 + 10\\lambda, -2 - 4\\lambda, -8 - 11\\lambda)\\); \\(\\overrightarrow{PQ} = (9 + 10\\lambda, -1 - 4\\lambda, -13 - 11\\lambda)\\).",
        "\\(\\overrightarrow{PQ}\\cdot(10, -4, -11) = 237 + 237\\lambda = 0\\), so \\(\\lambda = -1\\) and the foot is Q(1, 2, 3).",
        "Perpendicular distance \\(PQ = \\sqrt{1 + 9 + 4} = \\sqrt{14}\\). Image \\(P' = 2Q - P = (0, 5, 1)\\).",
      ],
    },
    {
      title: "Show that \\(\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}\\) and \\(\\frac{x - 4}{5} = \\frac{y - 1}{2} = z\\) intersect; find the point",
      steps: [
        "General points: \\((1 + 2\\lambda, 2 + 3\\lambda, 3 + 4\\lambda)\\) and \\((4 + 5\\mu, 1 + 2\\mu, \\mu)\\). The direction ratios 2, 3, 4 and 5, 2, 1 are not proportional.",
        "From z: \\(\\mu = 3 + 4\\lambda\\). From x: \\(1 + 2\\lambda = 19 + 20\\lambda\\), so \\(\\lambda = -1\\), \\(\\mu = -1\\).",
        "Check y: \\(2 - 3 = -1\\) and \\(1 - 2 = -1\\). They intersect at \\((-1, -1, -1)\\).",
      ],
    },
    {
      title: "Shortest distance: \\(\\vec{a_1} = (3, 5, 7)\\), \\(\\vec{b_1} = (1, -2, 1)\\); \\(\\vec{a_2} = (-1, -1, -1)\\), \\(\\vec{b_2} = (7, -6, 1)\\)",
      steps: [
        "\\(\\vec{a_2} - \\vec{a_1} = -4\\hat{i} - 6\\hat{j} - 8\\hat{k}\\); \\(\\vec{b_1}\\times\\vec{b_2} = 4\\hat{i} + 6\\hat{j} + 8\\hat{k}\\), with magnitude \\(\\sqrt{116} = 2\\sqrt{29}\\).",
        "\\((\\vec{b_1}\\times\\vec{b_2})\\cdot(\\vec{a_2} - \\vec{a_1}) = -16 - 36 - 64 = -116\\).",
        "\\(d = \\frac{116}{2\\sqrt{29}} = 2\\sqrt{29}\\) units.",
      ],
    },
    {
      title: "Distance between lines: \\(\\vec{a_1} = (1, 2, -4)\\), \\(\\vec{b_1} = (2, 3, 6)\\); \\(\\vec{a_2} = (3, 3, -5)\\), \\(\\vec{b_2} = (4, 6, 12)\\)",
      steps: [
        "The direction vectors are proportional, so the lines are parallel: take \\(\\vec{b} = 2\\hat{i} + 3\\hat{j} + 6\\hat{k}\\), \\(|\\vec{b}| = 7\\).",
        "\\(\\vec{a_2} - \\vec{a_1} = 2\\hat{i} + \\hat{j} - \\hat{k}\\); \\(\\vec{b}\\times(\\vec{a_2} - \\vec{a_1}) = -9\\hat{i} + 14\\hat{j} - 4\\hat{k}\\), magnitude \\(\\sqrt{293}\\).",
        "\\(d = \\frac{\\sqrt{293}}{7}\\) units.",
      ],
    },
    {
      title: "Line through \\((1, 2, -4)\\) perpendicular to two lines with direction ratios 3, \\(-16\\), 7 and 3, 8, \\(-5\\)",
      steps: [
        "\\(\\vec{b_1} = 3\\hat{i} - 16\\hat{j} + 7\\hat{k}\\), \\(\\vec{b_2} = 3\\hat{i} + 8\\hat{j} - 5\\hat{k}\\); \\(\\vec{b_1}\\times\\vec{b_2} = 24\\hat{i} + 36\\hat{j} + 72\\hat{k} = 12(2\\hat{i} + 3\\hat{j} + 6\\hat{k})\\).",
        "Vector form: \\(\\vec{r} = \\hat{i} + 2\\hat{j} - 4\\hat{k} + \\lambda(2\\hat{i} + 3\\hat{j} + 6\\hat{k})\\).",
        "Cartesian form: \\(\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z + 4}{6}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Direction cosines and direction ratios: of a line in any form, from angles with the axes, \\(l^2 + m^2 + n^2 = 1\\)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Foot of the perpendicular from a point to a line, perpendicular distance, image of a point in a line", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "Angle between two lines, or a value making them perpendicular or parallel", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Equation of a line (vector and Cartesian): through a point parallel to a line, through two points, perpendicular to two lines", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Do the lines intersect? Point of intersection, and a line through it", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Shortest distance between skew lines, or distance between parallel lines", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "A point on a line at a given distance from a point, or meeting a condition", years: [2026, 2025, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Reading direction ratios from a line not in standard form",
      body: "In \\(\\frac{x - 1}{2} = -y = \\frac{2z + 1}{6}\\) the direction ratios are 2, \\(-1\\), 3, not 2, 1, 6: write \\(-y\\) as \\(\\frac{y}{-1}\\) and \\(\\frac{2z + 1}{6}\\) as \\(\\frac{z + 1/2}{3}\\).",
    },
    {
      title: "Using the skew-line formula on parallel lines",
      body: "If \\(\\vec{b_2}\\) is a multiple of \\(\\vec{b_1}\\), then \\(\\vec{b_1}\\times\\vec{b_2} = \\vec{0}\\) and the skew formula gives 0/0. Check for parallel lines first, and use \\(\\frac{|\\vec{b}\\times(\\vec{a_2} - \\vec{a_1})|}{|\\vec{b}|}\\).",
    },
    {
      title: "Numbers that cannot be direction cosines",
      body: "Direction cosines must satisfy \\(l^2 + m^2 + n^2 = 1\\), so 1, 1, 1 can not be direction cosines. If they are \\(\\lambda, \\lambda, \\lambda\\), then \\(\\lambda = \\pm\\frac{1}{\\sqrt{3}}\\).",
    },
    {
      title: "Dropping the modulus in the angle formula",
      body: "The angle between two lines is the acute angle: take \\(|a_1a_2 + b_1b_2 + c_1c_2|\\). The angle a line makes with an axis is not limited to acute: \\(\\frac{x}{1} = \\frac{y}{-1} = \\frac{z}{0}\\) makes \\(\\frac{3\\pi}{4}\\) with the positive y-axis.",
    },
    {
      title: "Giving the foot as the image",
      body: "The foot Q is the midpoint of P and its image, so the image is \\(2Q - P\\). Also, the perpendicular distance is PQ, not \\(PP'\\).",
    },
    {
      title: "Distance from an axis",
      body: "The distance of P(a, b, c) from the y-axis is \\(\\sqrt{a^2 + c^2}\\) (foot (0, b, 0)), not b. From the line \\(\\frac{x}{0} = \\frac{y}{1} = \\frac{z}{0}\\) (the y-axis), (1, 2, 3) is \\(\\sqrt{10}\\) away.",
    },
  ],
};

export default sheet;
