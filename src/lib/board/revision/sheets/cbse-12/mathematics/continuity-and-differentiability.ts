import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics, Ch. 5 Continuity and Differentiability.
 * Definitions are NCERT's own, trimmed; every derivative re-differentiated by
 * hand; most-asked groups from the CBSE board past-paper questions in the
 * bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Continuity and Differentiability",
  chapterSlug: "continuity-and-differentiability",
  source: "NCERT Mathematics Part I (CBSE Class 12), Chapter 5",
  keyPoints: [
    {
      term: "Continuity at a point",
      text: "f is continuous at c if \\(\\lim_{x \\to c} f(x) = f(c)\\): the left hand limit, right hand limit and the value of the function at \\(x = c\\) exist and are equal to each other.",
    },
    {
      term: "Continuous function",
      text: "A real function f is said to be continuous if it is continuous at every point in the domain of f. Polynomials, sin x, cos x, \\(e^x\\) and \\(|x|\\) are continuous everywhere; a rational function wherever its denominator is not zero.",
    },
    {
      term: "Point of discontinuity",
      text: "If f is not continuous at c, we say f is discontinuous at c, and c is a point of discontinuity. \\([x]\\) is discontinuous at every integer.",
    },
    {
      term: "Algebra of continuous functions",
      text: "Sum, difference, product and quotient of continuous functions are continuous: \\(f \\pm g\\), \\(f \\cdot g\\), and \\(\\frac{f}{g}\\) wherever \\(g(x) \\neq 0\\).",
    },
    {
      term: "Composite of continuous functions",
      text: "If g is continuous at c and f is continuous at \\(g(c)\\), then \\(f \\circ g\\) is continuous at c. So \\(\\sin(x^2)\\) and \\(|\\cos x|\\) are continuous.",
    },
    {
      term: "Differentiable at a point",
      text: "f is differentiable at c if both \\(\\lim_{h \\to 0^-} \\frac{f(c + h) - f(c)}{h}\\) and \\(\\lim_{h \\to 0^+} \\frac{f(c + h) - f(c)}{h}\\) (LHD and RHD) are finite and equal. If the limit does not exist, f is not differentiable at c.",
    },
    {
      term: "Differentiable implies continuous",
      text: "Every differentiable function is continuous, but the converse is not true: \\(|x|\\) is continuous at 0 but not differentiable there. A function that is not continuous at c cannot be differentiable at c.",
    },
    {
      term: "Modulus and greatest integer",
      text: "\\(|x - 1|\\) is not differentiable at \\(x = 1\\) (a corner). \\([x]\\), \\(0 < x < 3\\), is not differentiable at \\(x = 1\\) and \\(x = 2\\) (it is not even continuous there). \\(x|x|\\) and \\(|x|^3\\) are differentiable at 0.",
    },
    {
      term: "Chain rule",
      text: "Chain rule is the rule to differentiate composites of functions: if \\(f = v \\circ u\\) and \\(t = u(x)\\), then \\(\\frac{df}{dx} = \\frac{dv}{dt} \\cdot \\frac{dt}{dx}\\).",
    },
    {
      term: "Implicit function",
      text: "When x and y are linked by an equation not solved for y, it is implicit that y is a function of x. Differentiate both sides with respect to x, writing \\(\\frac{dy}{dx}\\) after every y term, then solve for \\(\\frac{dy}{dx}\\).",
    },
    {
      term: "Logarithmic differentiation",
      text: "A powerful technique to differentiate functions of the form \\(f(x) = [u(x)]^{v(x)}\\): take log on both sides first. Both f(x) and u(x) need to be positive for this to make sense.",
    },
    {
      term: "Parametric form",
      text: "A relation \\(x = f(t)\\), \\(y = g(t)\\) is said to be in parametric form with t as a parameter. Then \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\), provided \\(\\frac{dx}{dt} \\neq 0\\).",
    },
    {
      term: "Second order derivative",
      text: "If \\(y = f(x)\\), then \\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)\\), also written \\(y''\\), \\(y_2\\) or \\(f''(x)\\).",
    },
  ],
  formulas: [
    { label: "Continuity at c", latex: "\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)" },
    {
      label: "Left and right hand derivatives",
      latex: "Lf'(c) = \\lim_{h \\to 0^-} \\frac{f(c + h) - f(c)}{h} \\qquad Rf'(c) = \\lim_{h \\to 0^+} \\frac{f(c + h) - f(c)}{h}",
    },
    { label: "Chain rule", latex: "\\frac{dy}{dx} = \\frac{dy}{dt} \\cdot \\frac{dt}{dx}" },
    {
      label: "Inverse trigonometric derivatives",
      latex:
        "\\frac{d}{dx}\\sin^{-1} x = \\frac{1}{\\sqrt{1 - x^2}} \\quad \\frac{d}{dx}\\cos^{-1} x = \\frac{-1}{\\sqrt{1 - x^2}} \\quad \\frac{d}{dx}\\tan^{-1} x = \\frac{1}{1 + x^2} \\quad \\frac{d}{dx}\\cot^{-1} x = \\frac{-1}{1 + x^2}",
    },
    {
      label: "Secant and cosecant inverse",
      latex: "\\frac{d}{dx}\\sec^{-1} x = \\frac{1}{|x|\\sqrt{x^2 - 1}} \\qquad \\frac{d}{dx}\\operatorname{cosec}^{-1} x = \\frac{-1}{|x|\\sqrt{x^2 - 1}} \\qquad (|x| > 1)",
    },
    {
      label: "Exponential and logarithm",
      latex: "\\frac{d}{dx}e^x = e^x \\quad \\frac{d}{dx}\\log x = \\frac{1}{x} \\quad \\frac{d}{dx}a^x = a^x \\log a \\quad \\frac{d}{dx}\\log_a x = \\frac{1}{x \\log a}",
    },
    { label: "Modulus", latex: "\\frac{d}{dx}|x| = \\frac{x}{|x|} \\quad (x \\neq 0)" },
    {
      label: "Logarithmic differentiation",
      latex: "y = u^{v} \\Rightarrow \\log y = v \\log u \\Rightarrow \\frac{dy}{dx} = u^{v}\\left(v\\frac{u'}{u} + v' \\log u\\right)",
    },
    {
      label: "Parametric, first and second",
      latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} \\qquad \\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{dx/dt}",
    },
    { label: "One function with respect to another", latex: "\\frac{du}{dv} = \\frac{du/dx}{dv/dx}" },
    {
      label: "Substitutions that simplify",
      latex:
        "\\sin^{-1}\\frac{2x}{1 + x^2} = 2\\tan^{-1} x \\; (|x| \\le 1) \\qquad \\cos^{-1}\\frac{1 - x^2}{1 + x^2} = 2\\tan^{-1} x \\; (x \\ge 0) \\qquad \\sin^{-1}(3x - 4x^3) = 3\\sin^{-1} x \\; \\left(|x| \\le \\tfrac{1}{2}\\right)",
    },
  ],
  derivations: [
    {
      title: "Find k (or a and b) so that a function is continuous at a point",
      steps: [
        "Find the left hand limit and the right hand limit at c from the pieces of f, and write f(c).",
        "For a \\(\\frac{0}{0}\\) form, factor and cancel, or use \\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\): for \\(\\frac{x^2 - 2x - 3}{x + 1}\\) at \\(-1\\), the limit is \\(-4\\).",
        "Set LHL = RHL = f(c) and solve for k (two unknowns need two equations, at two points if needed).",
      ],
    },
    {
      title: "Check whether f is differentiable at a point (left and right hand derivatives)",
      steps: [
        "First check continuity at c: if f is not continuous, it is not differentiable.",
        "Find \\(Lf'(c)\\) with \\(h \\to 0^-\\) using the left piece, and \\(Rf'(c)\\) with \\(h \\to 0^+\\) using the right piece.",
        "Equal and finite: differentiable, \\(f'(c)\\) is that value. Unequal: not differentiable at c.",
      ],
    },
    {
      title: "Show that \\(f(x) = |x|\\) is continuous but not differentiable at \\(x = 0\\)",
      steps: [
        "LHL = RHL = \\(f(0) = 0\\), so f is continuous at 0.",
        "\\(Rf'(0) = \\lim_{h \\to 0^+} \\frac{|h|}{h} = 1\\) and \\(Lf'(0) = \\lim_{h \\to 0^-} \\frac{|h|}{h} = -1\\).",
        "\\(1 \\neq -1\\), so f is not differentiable at 0: the converse of 'differentiable implies continuous' is false.",
      ],
    },
    {
      title: "Differentiate an inverse trigonometric function by substitution first",
      steps: [
        "Spot the form: \\(\\frac{1 - x^2}{1 + x^2}\\) suggests \\(x = \\tan\\theta\\); \\(\\sqrt{1 - x^2}\\) suggests \\(x = \\sin\\theta\\) or \\(\\cos\\theta\\).",
        "Simplify: \\(\\cos^{-1}\\frac{1 - x^2}{1 + x^2} = \\cos^{-1}(\\cos 2\\theta) = 2\\theta = 2\\tan^{-1} x\\) for \\(x \\ge 0\\) (check the branch).",
        "Now differentiate: \\(\\frac{dy}{dx} = \\frac{2}{1 + x^2}\\).",
      ],
    },
    {
      title: "Find \\(\\frac{dy}{dx}\\) for an implicit function",
      steps: [
        "Differentiate every term with respect to x; for a y term use the chain rule (\\(\\frac{d}{dx}y^2 = 2y\\frac{dy}{dx}\\), product rule for xy).",
        "Collect the \\(\\frac{dy}{dx}\\) terms on one side and solve.",
        "For a 'prove that' form, simplify using the given equation (e.g. \\(\\sqrt{1 - x^2} + \\sqrt{1 - y^2} = a(x - y)\\): put \\(x = \\sin A\\), \\(y = \\sin B\\) first).",
      ],
    },
    {
      title: "Find \\(\\frac{dy}{dx}\\) if \\(y^x + x^y + x^x = a^b\\) (logarithmic differentiation)",
      steps: [
        "Let \\(u = y^x\\), \\(v = x^y\\), \\(w = x^x\\); then \\(\\frac{du}{dx} + \\frac{dv}{dx} + \\frac{dw}{dx} = 0\\) (\\(a^b\\) is constant).",
        "Take logs of each: \\(\\log u = x\\log y\\) gives \\(\\frac{du}{dx} = y^x\\left(\\log y + \\frac{x}{y}\\frac{dy}{dx}\\right)\\); similarly for v and w (\\(\\frac{dw}{dx} = x^x(1 + \\log x)\\)).",
        "Substitute and solve for \\(\\frac{dy}{dx}\\).",
      ],
    },
    {
      title: "Find \\(\\frac{dy}{dx}\\) and \\(\\frac{d^2y}{dx^2}\\) for a parametric pair; differentiate one function with respect to another",
      steps: [
        "Find \\(\\frac{dx}{dt}\\) and \\(\\frac{dy}{dt}\\); then \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\). Simplify fully.",
        "For the second derivative, differentiate \\(\\frac{dy}{dx}\\) with respect to t, then divide by \\(\\frac{dx}{dt}\\). Put in the given value of t last.",
        "u with respect to v: let \\(u = \\sin^2 x\\), \\(v = e^{\\cos x}\\); \\(\\frac{du}{dv} = \\frac{2\\sin x\\cos x}{-\\sin x\\, e^{\\cos x}} = \\frac{-2\\cos x}{e^{\\cos x}}\\).",
      ],
    },
    {
      title: "If \\(y = \\sin^{-1} x\\), show that \\((1 - x^2)\\frac{d^2y}{dx^2} - x\\frac{dy}{dx} = 0\\)",
      steps: [
        "\\(\\frac{dy}{dx} = \\frac{1}{\\sqrt{1 - x^2}}\\), so \\(\\sqrt{1 - x^2}\\,\\frac{dy}{dx} = 1\\).",
        "Differentiate again (product rule): \\(\\sqrt{1 - x^2}\\,\\frac{d^2y}{dx^2} - \\frac{x}{\\sqrt{1 - x^2}}\\frac{dy}{dx} = 0\\).",
        "Multiply by \\(\\sqrt{1 - x^2}\\): \\((1 - x^2)\\frac{d^2y}{dx^2} - x\\frac{dy}{dx} = 0\\). Clearing roots before the second differentiation keeps it short.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Continuity: check f at a point, or find k (or a and b) so that f is continuous",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Parametric derivatives (first and second), and the derivative of one function with respect to another",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Implicit differentiation: find dy/dx or prove a given form",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Chain rule and derivatives of inverse trigonometric functions (simplify by a substitution first)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Differentiability at a point: left and right hand derivatives; find a and b so that f is differentiable",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Second order derivatives: prove a relation such as \\(x^2y_2 + xy_1 = 2\\)",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Logarithmic differentiation: \\(x^x\\), \\((\\sin x)^y = y^{\\cos x}\\), sums of powers",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Where are \\(|x|\\), \\([x]\\) and their combinations continuous or differentiable?",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Checking only the limit, not the value",
      body: "Continuity needs LHL = RHL = \\(f(c)\\). A limit that exists but differs from the defined value \\(f(c)\\) still means f is discontinuous at c.",
    },
    {
      title: "Taking the log of a sum",
      body: "For \\(y = x^{\\tan x} + \\frac{\\sqrt{x^2 + 1}}{2}\\), \\(\\log y\\) does not split. Put \\(u = x^{\\tan x}\\), take the log of u alone, and add the derivative of the other term.",
    },
    {
      title: "Using the power rule on \\(a^x\\) or \\(x^x\\)",
      body: "\\(\\frac{d}{dx}a^x = a^x\\log a\\), not \\(xa^{x-1}\\). \\(x^x\\) is neither form: use logarithmic differentiation, \\(\\frac{d}{dx}x^x = x^x(1 + \\log x)\\).",
    },
    {
      title: "Wrong parametric second derivative",
      body: "\\(\\frac{d^2y}{dx^2}\\) is not \\(\\frac{d^2y/dt^2}{d^2x/dt^2}\\). Differentiate \\(\\frac{dy}{dx}\\) with respect to t and then **divide by** \\(\\frac{dx}{dt}\\).",
    },
    {
      title: "Dropping \\(\\frac{dy}{dx}\\) in implicit work",
      body: "Every y term carries a \\(\\frac{dy}{dx}\\): \\(\\frac{d}{dx}e^{x - y} = e^{x - y}\\left(1 - \\frac{dy}{dx}\\right)\\), \\(\\frac{d}{dx}\\sin(xy) = \\cos(xy)\\left(y + x\\frac{dy}{dx}\\right)\\).",
    },
    {
      title: "Substituting without checking the interval",
      body: "\\(\\sin^{-1}(3x - 4x^3) = 3\\sin^{-1} x\\) only for \\(-\\frac{1}{2} \\le x \\le \\frac{1}{2}\\). State the interval for \\(\\theta\\) before you cancel the inverse function.",
    },
  ],
};

export default sheet;
