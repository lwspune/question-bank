import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part I), Ch. 6 Application of Derivatives.
 * Definitions and tests in NCERT's own wording, trimmed; every worked result
 * below was re-derived by hand; most-asked years and marks from the 166 CBSE
 * board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Application of Derivatives",
  chapterSlug: "application-of-derivatives",
  source: "NCERT Mathematics Part I (CBSE Class 12), Chapter 6",
  keyPoints: [
    {
      term: "Rate of change",
      text: "Whenever one quantity \\(y\\) varies with another quantity \\(x\\), satisfying some rule \\(y = f(x)\\), then \\(\\frac{dy}{dx}\\) (or \\(f'(x)\\)) represents the rate of change of \\(y\\) with respect to \\(x\\), and \\(f'(x_0)\\) the rate at \\(x = x_0\\).",
    },
    {
      term: "Sign of the rate",
      text: "\\(\\frac{dy}{dx}\\) is positive if \\(y\\) increases as \\(x\\) increases and is negative if \\(y\\) decreases as \\(x\\) increases. A quantity that is **decreasing** at 2 cm/s has \\(\\frac{dr}{dt} = -2\\).",
    },
    {
      term: "Related rates",
      text: "If two variables \\(x\\) and \\(y\\) are varying with respect to another variable \\(t\\), then by the Chain Rule \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\), if \\(\\frac{dx}{dt} \\neq 0\\).",
    },
    {
      term: "Increasing and strictly increasing",
      text: "Let I be an interval in the domain of \\(f\\). \\(f\\) is increasing on I if \\(x_1 < x_2 \\Rightarrow f(x_1) \\le f(x_2)\\), and strictly increasing if \\(x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)\\), for all \\(x_1, x_2\\) in I. Decreasing is the same with the inequality reversed.",
    },
    {
      term: "First derivative test for monotonicity",
      text: "Let \\(f\\) be continuous on \\([a, b]\\) and differentiable on \\((a, b)\\). Then \\(f\\) is increasing in \\([a, b]\\) if \\(f'(x) > 0\\), decreasing if \\(f'(x) < 0\\), and constant if \\(f'(x) = 0\\), for each \\(x\\) in \\((a, b)\\).",
    },
    {
      term: "Finding the intervals",
      text: "Solve \\(f'(x) = 0\\) (and note where \\(f'\\) does not exist). These points divide the domain into disjoint intervals; the sign of \\(f'\\) in each interval tells whether \\(f\\) increases or decreases there.",
    },
    {
      term: "Monotonic function",
      text: "By a monotonic function \\(f\\) in an interval I, we mean that \\(f\\) is either increasing in I or decreasing in I.",
    },
    {
      term: "Local maxima and minima",
      text: "\\(c\\) is a point of local maxima if there is an \\(h > 0\\) such that \\(f(c) \\ge f(x)\\) for all \\(x\\) in \\((c - h, c + h)\\); \\(f(c)\\) is the local maximum value. Local minima: \\(f(c) \\le f(x)\\).",
    },
    {
      term: "Critical point",
      text: "A point \\(c\\) in the domain of \\(f\\) at which either \\(f'(c) = 0\\) or \\(f\\) is not differentiable. A local maximum or minimum can occur only at a critical point; the converse need not be true (\\(x^3\\) at 0).",
    },
    {
      term: "First derivative test",
      text: "If \\(f'(x)\\) changes sign from positive to negative as \\(x\\) increases through \\(c\\), \\(c\\) is a point of local maxima; from negative to positive, local minima. If \\(f'\\) does not change sign, \\(c\\) is neither: it is a **point of inflexion**.",
    },
    {
      term: "Second derivative test",
      text: "\\(x = c\\) is a point of local maxima if \\(f'(c) = 0\\) and \\(f''(c) < 0\\), and of local minima if \\(f'(c) = 0\\) and \\(f''(c) > 0\\). The test fails if \\(f'(c) = 0\\) and \\(f''(c) = 0\\): go back to the first derivative test.",
    },
    {
      term: "Absolute maximum and minimum",
      text: "A function continuous on \\([a, b]\\) has an absolute maximum and an absolute minimum value, each attained at least once in \\([a, b]\\). The absolute (greatest, least) value may differ from a local maximum or minimum value.",
    },
    {
      term: "Working rule on a closed interval",
      text: "Step 1: find all critical points in the interval. Step 2: take the end points of the interval. Step 3: calculate \\(f\\) at all these points. Step 4: the largest value is the absolute maximum, the smallest the absolute minimum.",
    },
    {
      term: "Equal parts",
      text: "The two positive numbers whose sum is \\(k\\) and the sum of whose squares is minimum are \\(\\frac{k}{2}\\) and \\(\\frac{k}{2}\\). In an optimisation problem, use the given condition to write the quantity in one variable first.",
    },
  ],
  formulas: [
    { label: "Rate of change at a point", latex: "\\left.\\frac{dy}{dx}\\right|_{x = x_0} = f'(x_0)" },
    { label: "Chain rule for related rates", latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} \\;\\left(\\frac{dx}{dt} \\neq 0\\right) \\qquad \\frac{dV}{dt} = \\frac{dV}{dr}\\cdot\\frac{dr}{dt}" },
    { label: "Marginal cost and marginal revenue", latex: "\\text{MC} = \\frac{dC}{dx} \\qquad \\text{MR} = \\frac{dR}{dx}" },
    { label: "Velocity of a particle", latex: "v = \\frac{ds}{dt}, \\qquad \\text{at rest when } v = 0" },
    { label: "Monotonicity", latex: "f'(x) > 0 \\Rightarrow f \\text{ increasing} \\qquad f'(x) < 0 \\Rightarrow f \\text{ decreasing} \\qquad f'(x) = 0 \\Rightarrow f \\text{ constant}" },
    { label: "Second derivative test", latex: "f'(c) = 0,\\; f''(c) < 0 \\Rightarrow \\text{local max} \\qquad f'(c) = 0,\\; f''(c) > 0 \\Rightarrow \\text{local min}" },
    { label: "Sphere and solid hemisphere", latex: "V = \\frac{4}{3}\\pi r^3,\\; S = 4\\pi r^2 \\qquad V_{\\text{hemi}} = \\frac{2}{3}\\pi r^3,\\; S_{\\text{hemi}} = 3\\pi r^2" },
    { label: "Cylinder", latex: "V = \\pi r^2 h \\qquad \\text{CSA} = 2\\pi r h \\qquad \\text{TSA} = 2\\pi r(r + h)" },
    { label: "Cone", latex: "V = \\frac{1}{3}\\pi r^2 h \\qquad \\text{CSA} = \\pi r l, \\; l = \\sqrt{r^2 + h^2} \\qquad r = h\\tan\\alpha \\;(\\alpha = \\text{semi-vertical angle})" },
    { label: "Cube, circle, equilateral triangle", latex: "V = a^3,\\; S = 6a^2 \\qquad A = \\pi r^2,\\; C = 2\\pi r \\qquad A = \\frac{\\sqrt{3}}{4}a^2,\\; \\text{median} = \\frac{\\sqrt{3}}{2}a" },
    { label: "Range of a sin x + b cos x", latex: "-\\sqrt{a^2 + b^2} \\le a\\sin x + b\\cos x \\le \\sqrt{a^2 + b^2} \\qquad \\sin x + \\cos x = \\sqrt{2}\\sin\\left(x + \\frac{\\pi}{4}\\right)" },
    {
      label: "Derivatives often needed",
      latex: "\\frac{d}{dx}x^x = x^x(1 + \\log x) \\qquad \\frac{d}{dx}\\tan^{-1}u = \\frac{u'}{1 + u^2} \\qquad \\frac{d}{dx}\\cot^{-1}u = -\\frac{u'}{1 + u^2}",
    },
  ],
  derivations: [
    {
      title: "Show that of all the rectangles with a fixed perimeter, the square has the greatest area",
      steps: [
        "Sides \\(x\\) and \\(y\\), perimeter \\(2(x + y) = P\\), so \\(y = \\frac{P}{2} - x\\) and \\(A = x\\left(\\frac{P}{2} - x\\right)\\).",
        "\\(\\frac{dA}{dx} = \\frac{P}{2} - 2x = 0 \\Rightarrow x = \\frac{P}{4}\\).",
        "\\(\\frac{d^2A}{dx^2} = -2 < 0\\), so the area is maximum at \\(x = \\frac{P}{4}\\).",
        "Then \\(y = \\frac{P}{4} = x\\): the rectangle is a square.",
      ],
    },
    {
      title: "A rectangle of perimeter \\(p\\) is revolved about one of its sides to sweep out a cylinder. Find the dimensions for maximum volume",
      steps: [
        "Sides \\(x\\) (radius) and \\(y\\) (axis), \\(x + y = \\frac{p}{2}\\). \\(V = \\pi x^2 y = \\pi x^2\\left(\\frac{p}{2} - x\\right) = \\pi\\left(\\frac{p}{2}x^2 - x^3\\right)\\).",
        "\\(\\frac{dV}{dx} = \\pi(px - 3x^2) = 0 \\Rightarrow x = \\frac{p}{3}\\), so \\(y = \\frac{p}{6}\\).",
        "\\(\\frac{d^2V}{dx^2} = \\pi(p - 6x) = -\\pi p < 0\\) at \\(x = \\frac{p}{3}\\): maximum.",
        "Perimeter 36 cm: 12 cm by 6 cm, revolved about the 6 cm side; \\(V_{\\max} = \\pi(12)^2(6) = 864\\pi\\) cm³.",
      ],
    },
    {
      title: "Show that the right circular cylinder of given surface and maximum volume has its height equal to the diameter of the base",
      steps: [
        "\\(S = 2\\pi r^2 + 2\\pi r h\\) is fixed, so \\(h = \\frac{S - 2\\pi r^2}{2\\pi r}\\) and \\(V = \\pi r^2 h = \\frac{Sr - 2\\pi r^3}{2}\\).",
        "\\(\\frac{dV}{dr} = \\frac{S - 6\\pi r^2}{2} = 0 \\Rightarrow S = 6\\pi r^2\\); \\(\\frac{d^2V}{dr^2} = -6\\pi r < 0\\): maximum.",
        "\\(2\\pi r^2 + 2\\pi r h = 6\\pi r^2 \\Rightarrow h = 2r\\), the diameter. (An open tumbler, \\(S = \\pi r^2 + 2\\pi r h\\), gives \\(h = r\\).)",
      ],
    },
    {
      title: "If the volume of a cube increases at a constant rate, show that its surface area increases inversely as its edge",
      steps: [
        "\\(V = x^3\\): \\(\\frac{dV}{dt} = 3x^2\\frac{dx}{dt} = k\\), so \\(\\frac{dx}{dt} = \\frac{k}{3x^2}\\).",
        "\\(S = 6x^2\\): \\(\\frac{dS}{dt} = 12x\\frac{dx}{dt} = \\frac{4k}{x}\\), which varies inversely as \\(x\\).",
        "Same method for a solid hemisphere: \\(\\frac{dV}{dt} = 2\\pi r^2\\frac{dr}{dt} = k\\) gives \\(\\frac{dS}{dt} = 6\\pi r\\frac{dr}{dt} = \\frac{3k}{r}\\).",
      ],
    },
    {
      title: "Show that \\(f(x) = \\tan^{-1}(\\sin x + \\cos x)\\) is increasing in \\(\\left(0, \\frac{\\pi}{4}\\right)\\)",
      steps: [
        "\\(f'(x) = \\frac{\\cos x - \\sin x}{1 + (\\sin x + \\cos x)^2} = \\frac{\\cos x - \\sin x}{2 + \\sin 2x}\\).",
        "\\(2 + \\sin 2x > 0\\) for all \\(x\\), and \\(\\cos x > \\sin x\\) in \\(\\left(0, \\frac{\\pi}{4}\\right)\\), so \\(f'(x) > 0\\): \\(f\\) is increasing there.",
        "Similarly \\(\\tan^{-1}(\\sin x - \\cos x)\\) has \\(f' = \\frac{\\cos x + \\sin x}{1 + (\\sin x - \\cos x)^2}\\): increasing on \\(\\left(0, \\frac{3\\pi}{4}\\right)\\), decreasing on \\(\\left(\\frac{3\\pi}{4}, \\pi\\right)\\).",
      ],
    },
    {
      title: "Prove that \\(f(x) = 4x^3 - 18x^2 + 27x - 7\\) has neither maxima nor minima",
      steps: [
        "\\(f'(x) = 12x^2 - 36x + 27 = 3(2x - 3)^2 \\ge 0\\) for all \\(x\\).",
        "\\(f'(x) = 0\\) only at \\(x = \\frac{3}{2}\\), and \\(f'\\) does not change sign there.",
        "By the first derivative test \\(x = \\frac{3}{2}\\) is a point of inflexion, so \\(f\\) has no maxima or minima.",
      ],
    },
    {
      title: "Find the absolute maximum and minimum values of \\(f(x) = 2x^3 - 15x^2 + 36x + 1\\) on \\([1, 5]\\)",
      steps: [
        "\\(f'(x) = 6x^2 - 30x + 36 = 6(x - 2)(x - 3)\\): critical points \\(x = 2, 3\\).",
        "\\(f(1) = 24\\), \\(f(2) = 29\\), \\(f(3) = 28\\), \\(f(5) = 56\\).",
        "Absolute maximum 56 at \\(x = 5\\); absolute minimum 24 at \\(x = 1\\).",
      ],
    },
    {
      title: "Find the values of \\(a\\) for which \\(f(x) = \\sqrt{3}\\sin x - \\cos x - 2ax + b\\) is decreasing on R",
      steps: [
        "\\(f'(x) = \\sqrt{3}\\cos x + \\sin x - 2a = 2\\sin\\left(x + \\frac{\\pi}{3}\\right) - 2a\\).",
        "Decreasing on R needs \\(f'(x) \\le 0\\) for all \\(x\\): \\(\\sin\\left(x + \\frac{\\pi}{3}\\right) \\le a\\) for all \\(x\\).",
        "The greatest value of the sine is 1, so \\(a \\ge 1\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Rate of change: sphere, balloon, cube, cone, cylinder, ladder, circle; show a rate varies inversely or directly as the radius", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Case-study optimisation: set up the function, find its derivative, then the maximum or minimum (revenue, fuel, box, tumbler, garden)", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Find the intervals in which \\(f\\) is (strictly) increasing or decreasing", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Show that \\(f\\) is increasing or decreasing, or find \\(a\\) (or \\(k\\), \\(\\lambda\\)) so that it is", marks: 2, years: [2025, 2024, 2023] },
    { topic: "Local maxima and minima: critical points, first or second derivative test, point of inflexion", years: [2026, 2025, 2024, 2023] },
    { topic: "Absolute maximum and minimum on a closed interval", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Rectangle of given perimeter revolved or rolled into a cylinder of maximum volume", marks: 5, years: [2026, 2025, 2024] },
    { topic: "Two numbers with a given sum or product: least sum, sum of squares or cubes", years: [2025, 2023] },
  ],
  mistakes: [
    {
      title: "Putting in the value before differentiating",
      body: "Differentiate the general relation first, then substitute \\(r = 10\\) or the depth given. Putting the value in first turns the quantity into a constant and the rate into zero.",
    },
    {
      title: "Losing the sign of a decreasing quantity",
      body: "\"Decreasing at 2 cm/s\" means \\(\\frac{dr}{dt} = -2\\). A negative answer means the quantity is decreasing; state it in words.",
    },
    {
      title: "Ignoring the domain",
      body: "For \\(\\frac{x}{3} + \\frac{3}{x}\\), \\(f'(x) = \\frac{x^2 - 9}{3x^2}\\) and \\(x \\neq 0\\): increasing on \\((-\\infty, -3]\\) and \\([3, \\infty)\\). For \\(x^x\\), \\(x\\log x\\), \\(\\frac{\\log x}{x}\\), only \\(x > 0\\) counts.",
    },
    {
      title: "Forgetting the end points",
      body: "On a closed interval the absolute maximum or minimum is often at an end point: \\(x^2 + 1\\) on \\([-5, 2]\\) has absolute maximum 26 at \\(x = -5\\), not at a critical point.",
    },
    {
      title: "Not justifying maximum or minimum",
      body: "After \\(f'(c) = 0\\), show \\(f''(c) < 0\\) (or the sign change of \\(f'\\)) before calling it a maximum. If \\(f''(c) = 0\\), use the first derivative test.",
    },
    {
      title: "Answering only \\(x\\)",
      body: "Give what is asked: both dimensions, the maximum volume, or the number of days and the maximum height, with units.",
    },
  ],
};

export default sheet;
