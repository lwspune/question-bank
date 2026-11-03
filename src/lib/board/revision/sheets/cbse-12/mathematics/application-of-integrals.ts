import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 8 Application of Integrals.
 * The rationalised NCERT chapter teaches the area under a simple curve
 * (a line, circle, parabola or ellipse) with an axis and ordinates; every
 * area below was worked by hand. Most-asked years and marks from the 74 CBSE
 * board past-paper questions in the bank, 2022-2026. The 19 on the area
 * between two curves are kept: the board still set them in 2025, though the
 * rationalised book has no section on it.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Application of Integrals",
  chapterSlug: "application-of-integrals",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 8",
  keyPoints: [
    {
      term: "Elementary area",
      text: "Think of the area under a curve as made of very thin vertical strips. A strip of height \\(y\\) and width \\(dx\\) has elementary area \\(dA = y\\,dx\\); the total area is the sum of these: \\(A = \\int_a^b y\\,dx\\).",
    },
    {
      term: "Area with the x-axis",
      text: "The area of the region bounded by the curve \\(y = f(x)\\), the x-axis and the lines \\(x = a\\) and \\(x = b\\) \\((b > a)\\) is \\(\\int_a^b y\\,dx = \\int_a^b f(x)\\,dx\\).",
    },
    {
      term: "Area with the y-axis",
      text: "The area of the region bounded by the curve \\(x = g(y)\\), the y-axis and the lines \\(y = c\\), \\(y = d\\) is \\(\\int_c^d x\\,dy = \\int_c^d g(y)\\,dy\\). Here we take horizontal strips.",
    },
    {
      term: "Curve below the x-axis",
      text: "If \\(f(x) < 0\\) from \\(x = a\\) to \\(x = b\\), the integral comes out negative. Only the numerical value of the area is taken: \\(A = \\left|\\int_a^b f(x)\\,dx\\right|\\).",
    },
    {
      term: "Curve partly above, partly below",
      text: "If some portion of the curve is above the x-axis and some below, find where it cuts the axis, integrate each part separately, and add: \\(A = |A_1| + A_2\\).",
    },
    {
      term: "Symmetry",
      text: "A circle or an ellipse in standard form is symmetrical about both the x-axis and the y-axis, so its whole area is 4 times the area in the first quadrant. The parabola \\(y^2 = 4ax\\) is symmetrical about the x-axis.",
    },
    {
      term: "Upper half of a curve",
      text: "Solve for \\(y\\) and take the positive root above the x-axis: circle \\(y = \\sqrt{a^2 - x^2}\\), ellipse \\(y = \\frac{b}{a}\\sqrt{a^2 - x^2}\\), parabola \\(y^2 = 4ax\\) gives \\(y = 2\\sqrt{ax}\\).",
    },
    {
      term: "Modulus curves",
      text: "Remove the modulus piece by piece: \\(y = x|x|\\) is \\(x^2\\) for \\(x \\ge 0\\) and \\(-x^2\\) for \\(x < 0\\); \\(y = |x + 3|\\) changes form at \\(x = -3\\). Split the integral at that point.",
    },
    {
      term: "Rough sketch",
      text: "Draw a rough sketch first and shade the region: mark where the curve meets the axes and the given ordinates. It decides the limits, the strip (vertical or horizontal) and any doubling for symmetry.",
    },
    {
      term: "Area between two curves",
      text: "A thin vertical strip between the upper curve \\(y = f(x)\\) and the lower curve \\(y = g(x)\\) has height \\(f(x) - g(x)\\). Find \\(a\\) and \\(b\\) by solving the two equations together, sketch, then add up the strips: \\(\\int_a^b [f(x) - g(x)]\\,dx\\).",
    },
  ],
  formulas: [
    { label: "Area with the x-axis", latex: "A = \\int_a^b y\\,dx = \\int_a^b f(x)\\,dx" },
    { label: "Area with the y-axis", latex: "A = \\int_c^d x\\,dy = \\int_c^d g(y)\\,dy" },
    { label: "Curve crossing the x-axis", latex: "A = \\left|\\int_a^c f(x)\\,dx\\right| + \\int_c^b f(x)\\,dx = |A_1| + A_2" },
    { label: "Area between two curves", latex: "A = \\int_a^b [f(x) - g(x)]\\,dx, \\quad f(x) \\ge g(x) \\text{ on } [a, b], \\quad a, b \\text{ from } f(x) = g(x)" },
    { label: "Standard integral for circles and ellipses", latex: "\\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + C" },
    { label: "Circle and ellipse", latex: "x^2 + y^2 = a^2: \\; A = \\pi a^2 \\qquad \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1: \\; A = \\pi ab" },
    { label: "Parabola and its latus rectum", latex: "y^2 = 4ax,\\; x = a: \\quad A = 2\\int_0^a 2\\sqrt{ax}\\,dx = \\frac{8a^2}{3}" },
    { label: "Powers", latex: "\\int_0^k \\sqrt{x}\\,dx = \\frac{2}{3}k^{3/2} \\qquad \\int_0^k x^2\\,dx = \\frac{k^3}{3}" },
  ],
  derivations: [
    {
      title: "Find the area enclosed by the circle \\(x^2 + y^2 = a^2\\)",
      steps: [
        "By symmetry, area = 4 × (area in the first quadrant between \\(x = 0\\) and \\(x = a\\)), with \\(y = \\sqrt{a^2 - x^2}\\).",
        "\\(A = 4\\int_0^a \\sqrt{a^2 - x^2}\\,dx = 4\\Big[\\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a}\\Big]_0^a\\).",
        "\\(= 4\\cdot\\frac{a^2}{2}\\cdot\\frac{\\pi}{2} = \\pi a^2\\).",
      ],
    },
    {
      title: "Find the area enclosed by the ellipse \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\)",
      steps: [
        "Upper half: \\(y = \\frac{b}{a}\\sqrt{a^2 - x^2}\\). By symmetry, \\(A = 4\\cdot\\frac{b}{a}\\int_0^a \\sqrt{a^2 - x^2}\\,dx\\).",
        "\\(\\int_0^a \\sqrt{a^2 - x^2}\\,dx = \\frac{a^2}{2}\\cdot\\frac{\\pi}{2} = \\frac{\\pi a^2}{4}\\).",
        "\\(A = 4\\cdot\\frac{b}{a}\\cdot\\frac{\\pi a^2}{4} = \\pi ab\\). For \\(9x^2 + 16y^2 = 144\\), \\(a = 4\\), \\(b = 3\\): \\(12\\pi\\).",
      ],
    },
    {
      title: "Area of the ellipse \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) between the lines \\(x = -\\frac{a}{2}\\) and \\(x = \\frac{a}{2}\\)",
      steps: [
        "By symmetry, \\(A = 4\\cdot\\frac{b}{a}\\int_0^{a/2} \\sqrt{a^2 - x^2}\\,dx\\).",
        "\\(\\int_0^{a/2} \\sqrt{a^2 - x^2}\\,dx = \\frac{a}{4}\\cdot\\frac{\\sqrt{3}a}{2} + \\frac{a^2}{2}\\cdot\\frac{\\pi}{6} = \\frac{\\sqrt{3}a^2}{8} + \\frac{\\pi a^2}{12}\\).",
        "\\(A = ab\\left(\\frac{\\sqrt{3}}{2} + \\frac{\\pi}{3}\\right)\\) square units.",
      ],
    },
    {
      title: "Area of the minor segment of the circle \\(x^2 + y^2 = 4\\) cut off by the line \\(x = 1\\)",
      steps: [
        "The segment lies between \\(x = 1\\) and \\(x = 2\\), above and below the x-axis: \\(A = 2\\int_1^2 \\sqrt{4 - x^2}\\,dx\\).",
        "\\(= 2\\Big[\\frac{x}{2}\\sqrt{4 - x^2} + 2\\sin^{-1}\\frac{x}{2}\\Big]_1^2 = 2\\left[\\pi - \\frac{\\sqrt{3}}{2} - \\frac{\\pi}{3}\\right]\\).",
        "\\(A = \\frac{4\\pi}{3} - \\sqrt{3}\\) square units.",
      ],
    },
    {
      title: "Area bounded by the parabola \\(y^2 = 4ax\\) and its latus rectum",
      steps: [
        "The latus rectum is \\(x = a\\); the parabola is symmetrical about the x-axis, with upper branch \\(y = 2\\sqrt{a}\\sqrt{x}\\).",
        "\\(A = 2\\int_0^a 2\\sqrt{a}\\,x^{1/2}\\,dx = 4\\sqrt{a}\\cdot\\frac{2}{3}a^{3/2}\\).",
        "\\(A = \\frac{8a^2}{3}\\) square units. (With \\(x = 4a\\) instead, \\(A = \\frac{64a^2}{3}\\).)",
      ],
    },
    {
      title: "Area bounded by the line \\(y = 3x + 2\\), the x-axis and the ordinates \\(x = -1\\) and \\(x = 1\\)",
      steps: [
        "The line meets the x-axis at \\(x = -\\frac{2}{3}\\): below the axis on \\(\\left(-1, -\\frac{2}{3}\\right)\\), above on \\(\\left(-\\frac{2}{3}, 1\\right)\\).",
        "\\(A = \\left|\\int_{-1}^{-2/3} (3x + 2)\\,dx\\right| + \\int_{-2/3}^{1} (3x + 2)\\,dx = \\frac{1}{6} + \\frac{25}{6}\\).",
        "\\(A = \\frac{13}{3}\\) square units.",
      ],
    },
    {
      title: "Sketch \\(y = x|x|\\) and find the area bounded by it, the x-axis and \\(x = -2\\), \\(x = 2\\)",
      steps: [
        "\\(y = x^2\\) for \\(x \\ge 0\\) (above the axis) and \\(y = -x^2\\) for \\(x < 0\\) (below the axis).",
        "\\(A = \\left|\\int_{-2}^{0} (-x^2)\\,dx\\right| + \\int_0^2 x^2\\,dx = \\frac{8}{3} + \\frac{8}{3}\\).",
        "\\(A = \\frac{16}{3}\\) square units. (Between \\(x = -1\\) and \\(x = 1\\): \\(\\frac{2}{3}\\).)",
      ],
    },
    {
      title: "Area bounded by \\(y = x^2\\), \\(y = 9\\) and \\(x = 0\\) (first quadrant)",
      steps: [
        "The region lies against the y-axis, so take horizontal strips: \\(x = \\sqrt{y}\\), from \\(y = 0\\) to \\(y = 9\\).",
        "\\(A = \\int_0^9 \\sqrt{y}\\,dy = \\frac{2}{3}\\Big[y^{3/2}\\Big]_0^9 = \\frac{2}{3}\\cdot 27 = 18\\) square units.",
      ],
    },
    {
      title: "Find the area of the region \\(\\{(x, y) : x^2 \\le y \\le x + 2\\}\\), using integration",
      steps: [
        "Solve \\(x^2 = x + 2\\): \\(x = -1\\) or \\(x = 2\\). Between them the line \\(y = x + 2\\) lies above the parabola \\(y = x^2\\).",
        "\\(A = \\int_{-1}^{2} (x + 2 - x^2)\\,dx = \\Big[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\Big]_{-1}^{2} = \\frac{10}{3} + \\frac{7}{6}\\).",
        "\\(A = \\frac{9}{2}\\) square units.",
      ],
    },
  ],
  diagrams: [
    { title: "Area of a circle by vertical strips", labels: ["Circle centred at O", "A(a, 0) and B(0, a)", "Vertical strip of width dx, height y", "First-quadrant region shaded"] },
    { title: "Area of an ellipse", labels: ["Vertices A(a, 0), B(0, b)", "Region AOBA in the first quadrant", "Vertical strip of height y", "Both axes of symmetry"] },
    { title: "Curve partly above and partly below the x-axis", labels: ["Point where the curve cuts the x-axis", "A1 below the axis, A2 above", "Ordinates x = a and x = b"] },
    { title: "Area with the y-axis by horizontal strips", labels: ["Curve x = g(y)", "Lines y = c and y = d", "Horizontal strip of width dy, length x"] },
  ],
  mostAsked: [
    { topic: "Area under a parabola (\\(y = x^2\\), \\(y^2 = 4ax\\), \\(y = \\sqrt{x}\\)) with an axis and given lines, including the latus rectum", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Area between two curves, such as a line and a circle, parabola or ellipse", marks: 5, years: [2025, 2023, 2022] },
    { topic: "Case study: write the boundary line or curve, then find the area of a pond, roundabout, park region or elliptical ground by integration", marks: 2, years: [2026] },
    { topic: "Area bounded by a straight line, the x-axis and two ordinates (the line may cross the axis)", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Area under a modulus curve: \\(y = x|x|\\), \\(|x + 3|\\), \\(|x - 6|\\), \\(2 + |x + 1|\\)", marks: 5, years: [2026, 2025, 2024] },
    { topic: "Area of an ellipse, whole or between two ordinates", marks: 5, years: [2026, 2025, 2024] },
    { topic: "Area of a circle between ordinates, or of its minor segment cut off by \\(x = c\\)", marks: 5, years: [2026, 2024, 2023] },
    { topic: "Area bounded by lines or a triangle, using integration", marks: 5, years: [2023, 2022] },
  ],
  mistakes: [
    {
      title: "Adding signed integrals across the axis",
      body: "For \\(y = 5x + 2\\) from \\(x = -2\\) to 2, the line cuts the axis at \\(x = -\\frac{2}{5}\\). Integrate the two parts separately and add their absolute values: \\(\\frac{32}{5} + \\frac{72}{5} = \\frac{104}{5}\\).",
    },
    {
      title: "Forgetting the factor for symmetry",
      body: "A whole circle or ellipse is 4 times the first-quadrant area. A region of \\(y^2 = 4x\\) and \\(x = 1\\) with no quadrant named has two halves: double it.",
    },
    {
      title: "Taking the whole curve for a half",
      body: "\\(y = \\sqrt{4 - x^2}\\) is only the upper semicircle, and \\(y = \\sqrt{x}\\) only the upper branch of \\(y^2 = x\\). Read the region before doubling.",
    },
    {
      title: "Vertical strips where the region needs horizontal ones",
      body: "A region bounded by the y-axis and lines \\(y = c\\), \\(y = d\\) is \\(\\int_c^d x\\,dy\\): write \\(x\\) in terms of \\(y\\) and use limits in \\(y\\).",
    },
    {
      title: "No sketch, no units",
      body: "A rough sketch with the region shaded carries marks. End with \"square units\", and use \\(\\sin^{-1} 1 = \\frac{\\pi}{2}\\), \\(\\sin^{-1}\\frac{1}{2} = \\frac{\\pi}{6}\\) carefully.",
    },
  ],
};

export default sheet;
