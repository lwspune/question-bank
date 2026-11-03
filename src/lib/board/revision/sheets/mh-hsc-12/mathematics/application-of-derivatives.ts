import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 2 Applications of Derivatives (the
 * database's name is singular). Theorem statements are the Balbharati text's
 * own, trimmed; every worked figure re-checked by hand; most-asked years from
 * the 42 board past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Application of Derivatives",
  chapterSlug: "application-of-derivatives",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Slope of the tangent",
      text: "\\(\\left(\\frac{dy}{dx}\\right)_{(x_1, y_1)}\\) represents the slope, also called gradient, of the tangent to the curve \\(y = f(x)\\) at \\(P(x_1, y_1)\\).",
    },
    {
      term: "Normal",
      text: "The normal is perpendicular to the tangent, so the slope of the normal at P is the negative of the reciprocal of the slope of the tangent at P.",
    },
    {
      term: "Derivative as a rate measure",
      text: "The limit of the average rates of change is called the instantaneous rate of change of \\(y\\) with respect to \\(x\\). It is the derivative \\(f'(x_1)\\).",
    },
    {
      term: "Velocity and speed",
      text: "If \\(s = f(t)\\) is the displacement of a particle moving along a straight line, \\(f'(t)\\) is its velocity. The speed is the absolute value of the velocity, \\(|f'(t)|\\).",
    },
    {
      term: "Acceleration and jerk",
      text: "The rate of change of velocity with respect to time is the acceleration: \\(a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}\\). The derivative of the acceleration is called the jerk.",
    },
    {
      term: "Approximation",
      text: "For a sufficiently small \\(h\\), \\(f(a + h) \\approx f(a) + h\\,f'(a)\\). This is the formula to find the approximate value of the function at \\(x = a + h\\), when \\(f'(a)\\) exists.",
    },
    {
      term: "Rolle's theorem",
      text: "If a real-valued function \\(f\\) is continuous on \\([a, b]\\), differentiable on the open interval \\((a, b)\\) and \\(f(a) = f(b)\\), then there exists at least one \\(c\\) in \\((a, b)\\) such that \\(f'(c) = 0\\).",
    },
    {
      term: "Lagrange's mean value theorem",
      text: "If \\(f\\) is continuous on \\([a, b]\\) and differentiable on \\((a, b)\\), there exists at least one \\(c\\) in \\((a, b)\\) with \\(f'(c) = \\frac{f(b) - f(a)}{b - a}\\). Geometrically, the tangent at \\(x = c\\) is parallel to the chord AB.",
    },
    {
      term: "Increasing function",
      text: "\\(f\\) is monotonically (strictly) increasing on \\((a, b)\\) if \\(x_1 < x_2\\) gives \\(f(x_1) < f(x_2)\\). Test: \\(f'(x) > 0\\). If \\(f'(x) \\ge 0\\), \\(f\\) is increasing.",
    },
    {
      term: "Decreasing function",
      text: "\\(f\\) is monotonically (strictly) decreasing on \\((a, b)\\) if \\(x_1 < x_2\\) gives \\(f(x_1) > f(x_2)\\). Test: \\(f'(x) < 0\\). If \\(f'(x) \\le 0\\), \\(f\\) is decreasing.",
    },
    {
      term: "Stationary (turning) point",
      text: "A point where \\(f'(c) = 0\\): the function is neither increasing nor decreasing there, and the tangent to the graph is horizontal.",
    },
    {
      term: "Local maxima and minima",
      text: "The maxima and the minima of a function are not necessarily the greatest and the least values in the whole domain; they are the greatest and least values in a small interval (local, or relative).",
    },
    {
      term: "Point of inflexion",
      text: "If \\(f'(c) = 0\\) but \\(f'\\) has the same sign on both sides of \\(c\\), \\(f\\) has neither a maxima nor a minima at \\(c\\): \\(x = c\\) is a point of inflexion (e.g. \\(f(x) = x^3\\) at 0).",
    },
  ],
  formulas: [
    {
      label: "Slopes of the tangent and the normal",
      latex: "m = \\left(\\frac{dy}{dx}\\right)_{(x_1, y_1)} \\qquad m' = -\\frac{1}{m}, \\quad m \\neq 0",
    },
    {
      label: "Equations of the tangent and the normal",
      latex: "\\text{Tangent: } y - y_1 = m(x - x_1) \\qquad \\text{Normal: } y - y_1 = -\\frac{1}{m}(x - x_1)",
    },
    {
      label: "Parallel and perpendicular tangents",
      latex: "\\text{parallel to } y = kx + c: \\frac{dy}{dx} = k \\qquad \\text{parallel to X-axis: } \\frac{dy}{dx} = 0 \\qquad \\text{parallel to Y-axis: } \\frac{dx}{dy} = 0",
    },
    { label: "Rate of change by the chain rule", latex: "\\frac{dA}{dt} = \\frac{dA}{dr}\\cdot\\frac{dr}{dt}" },
    { label: "Velocity, acceleration and jerk", latex: "v = \\frac{ds}{dt} \\qquad a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2} \\qquad j = \\frac{da}{dt} = \\frac{d^3s}{dt^3}" },
    { label: "Approximate value", latex: "f(a + h) \\approx f(a) + h\\,f'(a)" },
    { label: "Degrees to radians", latex: "1^{\\circ} = \\frac{\\pi}{180} \\approx 0.0175^{c} \\qquad 30' = 0.5^{\\circ} \\approx 0.00875^{c}" },
    { label: "Rolle's theorem", latex: "f(a) = f(b) \\;\\Rightarrow\\; f'(c) = 0 \\text{ for some } c \\in (a, b)" },
    { label: "Lagrange's mean value theorem", latex: "f'(c) = \\frac{f(b) - f(a)}{b - a}, \\quad c \\in (a, b)" },
    { label: "Increasing and decreasing", latex: "f'(x) > 0: \\text{ strictly increasing} \\qquad f'(x) < 0: \\text{ strictly decreasing}" },
    {
      label: "Second derivative test",
      latex: "f'(c) = 0,\\ f''(c) < 0: \\text{ maxima at } c \\qquad f'(c) = 0,\\ f''(c) > 0: \\text{ minima at } c",
    },
    {
      label: "Circle and sphere",
      latex: "A = \\pi r^2 \\quad C = 2\\pi r \\qquad V = \\frac{4}{3}\\pi r^3 \\quad S = 4\\pi r^2",
    },
    {
      label: "Cylinder, cone and open box",
      latex: "V_{cyl} = \\pi r^2 h \\qquad V_{cone} = \\frac{1}{3}\\pi r^2 h \\qquad \\text{open box, square base } x\\text{: } S = x^2 + 4xh,\\ V = x^2 h",
    },
  ],
  derivations: [
    {
      title: "Find the equations of the tangent and the normal to a curve at a point",
      steps: [
        "Differentiate and put the point in: \\(m = \\left(\\frac{dy}{dx}\\right)_{(x_1, y_1)}\\).",
        "Tangent: \\(y - y_1 = m(x - x_1)\\).",
        "Normal: \\(y - y_1 = -\\frac{1}{m}(x - x_1)\\). If \\(m = 0\\), the normal is \\(x = x_1\\).",
        "Example: \\(y = x^2 + 4x + 1\\) at \\((-1, -2)\\): \\(m = 2x + 4 = 2\\), tangent \\(2x - y = 0\\).",
      ],
    },
    {
      title: "Find the points on a curve where the tangent is parallel to a given line",
      steps: [
        "Slope of the line: for \\(y = x + 5\\) it is 1.",
        "Set \\(\\frac{dy}{dx}\\) equal to it: for \\(y = x^3 - 6x^2 + x + 3\\), \\(3x^2 - 12x + 1 = 1\\), so \\(x = 0\\) or \\(x = 4\\).",
        "Put each \\(x\\) in the curve for \\(y\\): the points are \\((0, 3)\\) and \\((4, -25)\\).",
      ],
    },
    {
      title: "Rate of change: how fast is the area of a circular wave increasing?",
      steps: [
        "Write the relation between the quantities: \\(A = \\pi r^2\\).",
        "Differentiate with respect to \\(t\\): \\(\\frac{dA}{dt} = 2\\pi r\\frac{dr}{dt}\\).",
        "Only now put in the given values (radius and \\(\\frac{dr}{dt}\\)), and write the unit, e.g. cm²/sec.",
      ],
    },
    {
      title: "Velocity and acceleration from the displacement \\(s = f(t)\\)",
      steps: [
        "\\(v = \\frac{ds}{dt}\\), \\(a = \\frac{dv}{dt}\\).",
        "For \\(s = 2t^3 - 5t^2 + 4t - 3\\): \\(v = 6t^2 - 10t + 4\\), \\(a = 12t - 10\\).",
        "Acceleration 14 gives \\(12t - 10 = 14\\), so \\(t = 2\\); then \\(v = 8\\) and \\(s = 1\\).",
      ],
    },
    {
      title: "Find an approximate value, e.g. \\(e^{1.005}\\)",
      steps: [
        "Take \\(f(x) = e^x\\), \\(a = 1\\) (a value you know) and \\(h = 0.005\\) (small).",
        "\\(f'(x) = e^x\\), so \\(f(a + h) \\approx f(a) + h f'(a) = e + 0.005e\\).",
        "\\(e^{1.005} \\approx 2.7183 \\times 1.005 = 2.7319\\). For an angle, write \\(h\\) in radians.",
      ],
    },
    {
      title: "Verify Rolle's theorem for \\(f(x)\\) on \\([a, b]\\)",
      steps: [
        "\\(f\\) is continuous on \\([a, b]\\) (polynomial, or check each point) and differentiable on \\((a, b)\\).",
        "Compute \\(f(a)\\) and \\(f(b)\\); show \\(f(a) = f(b)\\).",
        "Solve \\(f'(c) = 0\\) and check that \\(c\\) lies in \\((a, b)\\). Example: \\(x^2 - 5x + 9\\) on \\([1, 4]\\): \\(f(1) = f(4) = 5\\), \\(c = \\frac{5}{2}\\).",
      ],
    },
    {
      title: "Verify Lagrange's mean value theorem for \\(f(x)\\) on \\([a, b]\\)",
      steps: [
        "Check \\(f\\) is continuous on \\([a, b]\\) and differentiable on \\((a, b)\\).",
        "Compute \\(\\frac{f(b) - f(a)}{b - a}\\).",
        "Solve \\(f'(c)\\) equal to it; \\(c\\) must lie in \\((a, b)\\). Example: \\(\\log x\\) on \\([1, e]\\): \\(\\frac{1}{c} = \\frac{1}{e - 1}\\), \\(c = e - 1\\).",
      ],
    },
    {
      title: "Test whether a function is increasing or decreasing",
      steps: [
        "Find \\(f'(x)\\) and write it as a sum of squares or in factors.",
        "Example: \\(f(x) = x^3 + 6x^2 + 12x - 7\\) gives \\(f'(x) = 3(x + 2)^2 \\ge 0\\) for all \\(x \\in R\\).",
        "Conclude from the sign: here \\(f\\) is increasing for all \\(x \\in R\\).",
      ],
    },
    {
      title: "Find the maximum and minimum values of \\(f(x) = 2x^3 - 21x^2 + 36x - 20\\)",
      steps: [
        "\\(f'(x) = 6x^2 - 42x + 36 = 6(x - 1)(x - 6)\\); \\(f'(x) = 0\\) gives \\(x = 1, 6\\).",
        "\\(f''(x) = 12x - 42\\): \\(f''(1) = -30 < 0\\), maxima at 1; \\(f''(6) = 30 > 0\\), minima at 6.",
        "Maximum value \\(f(1) = -3\\); minimum value \\(f(6) = -128\\).",
      ],
    },
    {
      title: "Word problem on maxima: a wire of length 36 cm is bent into a rectangle of maximum area",
      steps: [
        "Use the constraint to write the quantity in one variable: \\(2(x + y) = 36\\), so \\(A = x(18 - x)\\).",
        "\\(\\frac{dA}{dx} = 18 - 2x = 0\\) gives \\(x = 9\\).",
        "\\(\\frac{d^2A}{dx^2} = -2 < 0\\), so the area is maximum: a square of side 9 cm.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Maxima and minima: of a function, or a word problem (wire into a rectangle, open box, dividing a number)", years: [2026, 2025, 2024, 2022, 2019, 2018, 2016, 2015] },
    { topic: "Tangent and normal at a point, or points where the tangent is parallel to a line", years: [2025, 2024, 2022, 2019, 2017, 2015] },
    { topic: "Approximate value of a function, an angle or \\(e^x\\)", years: [2026, 2024, 2023, 2020] },
    { topic: "Increasing or decreasing function, or strictly increasing", years: [2026, 2025, 2023, 2022, 2017] },
    { topic: "Verify Rolle's theorem or Lagrange's mean value theorem", years: [2026, 2025, 2023, 2019] },
    { topic: "Velocity and acceleration of a particle from its displacement", years: [2026, 2025, 2024, 2016] },
    { topic: "Rate of change: circular wave, water in a cylinder, spherical balloon", years: [2026, 2025, 2020] },
  ],
  mistakes: [
    {
      title: "Using \\(\\frac{1}{m}\\) for the slope of the normal",
      body: "The normal's slope is \\(-\\frac{1}{m}\\). If the tangent's slope is 0 the normal is vertical, \\(x = x_1\\); never divide by zero.",
    },
    {
      title: "Writing \\(h\\) in degrees in an approximation",
      body: "For \\(\\sin\\), \\(\\cos\\) or \\(\\tan\\) of an angle, \\(h\\) must be in radians: \\(30' = 0.5^{\\circ} = 0.5 \\times 0.0175 = 0.00875^{c}\\).",
    },
    {
      title: "Skipping the conditions in Rolle's theorem or LMVT",
      body: "Write continuity on \\([a, b]\\), differentiability on \\((a, b)\\) and, for Rolle, \\(f(a) = f(b)\\) before finding \\(c\\). A value of \\(c\\) outside the open interval \\((a, b)\\) is rejected.",
    },
    {
      title: "Stopping at \\(x = c\\) in a maxima question",
      body: "The board asks for the maximum or minimum **value**: put \\(c\\) back into \\(f(x)\\). Confirm the nature with \\(f''(c)\\) before naming it.",
    },
    {
      title: "Putting numbers in before differentiating",
      body: "In a rate problem, differentiate the general relation (\\(V = \\frac{4}{3}\\pi r^3\\)) with respect to \\(t\\) first; substitute the given radius only afterwards.",
    },
    {
      title: "Calling \\(f'(x) = 3(x + 2)^2\\) neither increasing nor decreasing",
      body: "\\(f'(x) \\ge 0\\) everywhere, zero only at the single point \\(x = -2\\), so \\(f\\) is increasing for all \\(x \\in R\\).",
    },
  ],
};

export default sheet;
