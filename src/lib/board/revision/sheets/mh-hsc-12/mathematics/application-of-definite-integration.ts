import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 5 Application of Definite Integration.
 * Statements are the Balbharati text's own, trimmed; every area re-worked from
 * its integral; most-asked years from the 13 board past-paper questions in
 * the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Application of Definite Integration",
  chapterSlug: "application-of-definite-integration",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Sketch the curves first",
      text: "For evaluation of area bounded by certain curves, we need to know the nature of the curves and their graphs. Draw a sketch and shade the region before you write the integral.",
    },
    {
      term: "Area under a curve",
      text: "The area bounded by the curve \\(y = f(x)\\), the X-axis and the lines \\(x = a\\), \\(x = b\\) is \\(\\int_a^b y\\,dx\\), when \\(f(x) \\ge 0\\) in \\([a, b]\\).",
    },
    {
      term: "Area with respect to the Y-axis",
      text: "The area bounded by the curve \\(x = g(y)\\), the Y-axis and the lines \\(y = c\\) and \\(y = d\\) is \\(\\int_c^d x\\,dy\\). Use it when the region is closed by lines parallel to the X-axis.",
    },
    {
      term: "Area below the X-axis",
      text: "If the area lies below the X-axis, the integral is negative; area is always positive, so take its absolute value \\(|A|\\).",
    },
    {
      term: "Curve crossing the X-axis",
      text: "If \\(f(x) \\le 0\\) on \\([a, t]\\) and \\(f(x) \\ge 0\\) on \\([t, b]\\), part \\(A_1\\) is below the X-axis and part \\(A_2\\) above it. Find each part separately and add their absolute values.",
    },
    {
      term: "Area between two curves",
      text: "Area bounded by \\(y = f(x)\\) and \\(y = g(x)\\) is the area under the upper curve minus the area under the lower one. The points of intersection can be obtained by solving their equations simultaneously; they give the limits.",
    },
    {
      term: "Symmetry of a curve",
      text: "The X-axis is an axis of symmetry if \\((x, y)\\) on C means \\((x, -y)\\) on C (as in \\(y^2 = 4ax\\)); the Y-axis is one if \\((-x, y)\\) is on C (as in \\(y = x^2\\)). Find one part and multiply.",
    },
    {
      term: "Using symmetry for a closed curve",
      text: "By the symmetry of the ellipse, its area is 4 times the area of the region in the first quadrant, where the limits of integration are \\(x = 0\\) and \\(x = a\\).",
    },
  ],
  formulas: [
    { label: "Area under a curve (about the X-axis)", latex: "A = \\int_a^b y\\,dx = \\int_a^b f(x)\\,dx" },
    { label: "Area about the Y-axis", latex: "A = \\int_c^d x\\,dy = \\int_c^d g(y)\\,dy" },
    { label: "Region below the X-axis", latex: "A = \\left|\\int_a^b f(x)\\,dx\\right|" },
    {
      label: "Curve crossing the X-axis at t",
      latex: "A = \\left|\\int_a^t f(x)\\,dx\\right| + \\left|\\int_t^b f(x)\\,dx\\right|",
    },
    {
      label: "Area between two curves",
      latex: "A = \\int_a^b [f(x) - g(x)]\\,dx, \\quad f(x) \\ge g(x) \\text{ on } [a, b]",
      symbols: [{ symbol: "a, b", meaning: "x-coordinates of the points of intersection" }],
    },
    {
      label: "Integral for a circle or an ellipse",
      latex: "\\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + c",
    },
    { label: "Quarter circle", latex: "\\int_0^a \\sqrt{a^2 - x^2}\\,dx = \\frac{\\pi a^2}{4}" },
    {
      label: "Area of an ellipse and a circle",
      latex: "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1: \\ A = \\pi ab \\qquad x^2 + y^2 = a^2: \\ A = \\pi a^2",
    },
    {
      label: "Two parabolas, y squared = 4ax and x squared = 4ay",
      latex: "A = \\frac{16a^2}{3}, \\quad \\text{intersecting at } (0, 0) \\text{ and } (4a, 4a)",
    },
    {
      label: "Parabola y squared = 4ax cut by its latus rectum",
      latex: "A = 2\\int_0^a 2\\sqrt{a}\\sqrt{x}\\,dx = \\frac{8a^2}{3}",
    },
  ],
  derivations: [
    {
      title: "Find the area of the ellipse \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\). Hence write the area of \\(\\frac{x^2}{25} + \\frac{y^2}{16} = 1\\)",
      steps: [
        "By symmetry, \\(A = 4\\) times the area in the first quadrant, where \\(y = \\frac{b}{a}\\sqrt{a^2 - x^2}\\) and \\(0 \\le x \\le a\\).",
        "\\(A = \\frac{4b}{a}\\int_0^a \\sqrt{a^2 - x^2}\\,dx = \\frac{4b}{a}\\Big[\\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a}\\Big]_0^a\\).",
        "\\(= \\frac{4b}{a}\\cdot\\frac{a^2}{2}\\cdot\\frac{\\pi}{2} = \\pi ab\\) sq. units.",
        "Hence: \\(a = 5\\), \\(b = 4\\), area \\(= 20\\pi\\) sq. units. (For \\(\\frac{x^2}{1} + \\frac{y^2}{4} = 1\\): \\(2\\pi\\).)",
      ],
    },
    {
      title: "Find the area of the region lying between the parabolas \\(y^2 = 4ax\\) and \\(x^2 = 4ay\\)",
      steps: [
        "Put \\(y = \\frac{x^2}{4a}\\) in \\(y^2 = 4ax\\): \\(x^4 = 64a^3x\\), so \\(x = 0\\) or \\(x = 4a\\). They meet at O(0, 0) and P(4a, 4a).",
        "\\(A = \\int_0^{4a} 2\\sqrt{a}\\sqrt{x}\\,dx - \\int_0^{4a} \\frac{x^2}{4a}\\,dx\\).",
        "\\(= \\frac{4\\sqrt{a}}{3}(4a)^{3/2} - \\frac{(4a)^3}{12a} = \\frac{32a^2}{3} - \\frac{16a^2}{3} = \\frac{16a^2}{3}\\) sq. units. (With \\(a = 1\\): \\(\\frac{16}{3}\\).)",
      ],
    },
    {
      title: "Find the area enclosed between the circle \\(x^2 + y^2 = 1\\) and the line \\(x + y = 1\\), lying in the first quadrant",
      steps: [
        "The line meets the circle at (1, 0) and (0, 1); the arc lies above the chord.",
        "\\(A = \\int_0^1 \\sqrt{1 - x^2}\\,dx - \\int_0^1 (1 - x)\\,dx\\).",
        "\\(= \\frac{\\pi}{4} - \\frac{1}{2} = \\frac{\\pi - 2}{4}\\) sq. units.",
      ],
    },
    {
      title: "Find the area of the region bounded by the parabola \\(y^2 = 16x\\) and its latus rectum",
      steps: [
        "\\(4a = 16\\), so \\(a = 4\\): the latus rectum is \\(x = 4\\). The X-axis is an axis of symmetry.",
        "\\(A = 2\\int_0^4 4\\sqrt{x}\\,dx = 8\\Big[\\frac{2}{3}x^{3/2}\\Big]_0^4 = \\frac{128}{3}\\) sq. units.",
      ],
    },
    {
      title: "Find the area of the region bounded by the curve \\(y = x^2\\) and the line \\(y = 4\\)",
      steps: [
        "The region is symmetric about the Y-axis and closed by \\(y = 4\\), so integrate along the Y-axis with \\(x = \\sqrt{y}\\).",
        "\\(A = 2\\int_0^4 \\sqrt{y}\\,dy = 2\\cdot\\frac{2}{3}\\Big[y^{3/2}\\Big]_0^4 = \\frac{32}{3}\\) sq. units.",
      ],
    },
    {
      title: "Find the area bounded by the line \\(y = x\\), the X-axis and the lines \\(x = -1\\) and \\(x = 4\\)",
      steps: [
        "The line is below the X-axis for \\(-1 \\le x < 0\\) and above it for \\(0 < x \\le 4\\): split at 0.",
        "\\(A_1 = \\left|\\int_{-1}^0 x\\,dx\\right| = \\frac{1}{2}\\), \\(A_2 = \\int_0^4 x\\,dx = 8\\).",
        "\\(A = \\frac{1}{2} + 8 = \\frac{17}{2}\\) sq. units. (For \\(y = 2x\\) on the same lines: \\(1 + 16 = 17\\).)",
      ],
    },
    {
      title: "Find the area bounded by the curve \\(y = -x^2\\) (that is, \\(x^2 + y = 0\\)), the X-axis and the lines \\(x = 1\\), \\(x = 4\\)",
      steps: [
        "\\(\\int_1^4 (-x^2)\\,dx = -\\Big[\\frac{x^3}{3}\\Big]_1^4 = -\\frac{63}{3} = -21\\).",
        "The region is below the X-axis; area is positive, so \\(A = |-21| = 21\\) sq. units.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Area of an ellipse",
      labels: ["axes and centre O", "vertices (a, 0) and (0, b)", "first-quadrant region shaded", "A = 4 times shaded area"],
    },
    {
      title: "Region between the parabolas \\(y^2 = 4ax\\) and \\(x^2 = 4ay\\)",
      labels: ["both parabolas through O", "intersection P(4a, 4a)", "region between them shaded", "x from 0 to 4a"],
    },
    {
      title: "Line \\(y = x\\) with the X-axis and \\(x = -1\\), \\(x = 4\\)",
      labels: ["part A1 below the X-axis", "part A2 above the X-axis", "lines x = -1 and x = 4", "both parts shaded"],
    },
  ],
  mostAsked: [
    {
      topic: "Area bounded by a curve (\\(y^2 = 4ax\\), \\(y = x^2\\), \\(y = -x^2\\)), the X-axis and two ordinates",
      years: [2026, 2024, 2023, 2016],
    },
    {
      topic: "Area between two curves: two parabolas \\(y^2 = 4ax\\), \\(x^2 = 4ay\\), or a circle and a line",
      years: [2026, 2025, 2022],
    },
    {
      topic: "Area bounded by a line \\(y = mx\\), the X-axis and \\(x = -1\\), \\(x = 4\\) (MCQ: part lies below the axis)",
      years: [2026, 2025],
    },
    {
      topic: "Area cut off from a parabola by a line: its latus rectum, or \\(y = x^2\\) and \\(y = 4\\)",
      years: [2025, 2023],
    },
    {
      topic: "Area of an ellipse, \\(\\pi ab\\), or of a given ellipse",
      years: [2024, 2018],
    },
  ],
  mistakes: [
    {
      title: "Integrating straight across the X-axis",
      body: "\\(\\int_{-1}^{4} x\\,dx = \\frac{15}{2}\\) is not the area: the part below the axis cancels. Split at the crossing point and add absolute values: \\(\\frac{1}{2} + 8 = \\frac{17}{2}\\).",
    },
    {
      title: "Leaving a negative area",
      body: "For \\(y = -x^2\\) from 1 to 4 the integral is \\(-21\\). Write the area as \\(|-21| = 21\\) sq. units: an area is never negative.",
    },
    {
      title: "Guessing the limits between two curves",
      body: "Solve the two equations together first. For \\(y^2 = 4x\\) and \\(x^2 = 4y\\) the limits are 0 and 4, from the intersection points (0, 0) and (4, 4).",
    },
    {
      title: "Forgetting the symmetry factor",
      body: "The ellipse needs 4 times the first-quadrant area; a parabola cut by its latus rectum needs 2 times the area above the X-axis. \\(\\frac{64}{3}\\) for \\(y^2 = 16x\\) is half the answer.",
    },
    {
      title: "Subtracting the curves the wrong way",
      body: "Write (upper curve) minus (lower curve) in the region. Check with one value of \\(x\\) inside the interval, and draw the sketch: it earns marks.",
    },
    {
      title: "Dropping the units",
      body: "End every answer with \"sq. units\".",
    },
  ],
};

export default sheet;
