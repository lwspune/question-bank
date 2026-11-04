import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 1 Differentiation. Statements are the
 * Balbharati text's own, trimmed; every formula re-checked by differentiating
 * a test case; most-asked years from the 42 board past-paper questions in the
 * bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Differentiation",
  chapterSlug: "differentiation",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Differentiability and continuity",
      text: "If a function \\(f(x)\\) is differentiable at \\(x = a\\) then it is continuous at \\(x = a\\), but the converse is not true.",
    },
    {
      term: "Chain rule",
      text: "If \\(y\\) is a differentiable function of \\(u\\) and \\(u\\) is a differentiable function of \\(x\\), then \\(y\\) is a differentiable function of \\(x\\) and \\(\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}\\). Differentiate from the outside in, one layer at a time.",
    },
    {
      term: "Geometrical meaning of the derivative",
      text: "The derivative of \\(y = f(x)\\) at a point \\(P(x_1, y_1)\\) is the **slope of the tangent** at that point on the curve: the limit of the slope of the secant PQ as Q approaches P.",
    },
    {
      term: "Derivative of an inverse function",
      text: "If \\(y = f(x)\\) is one-one and onto, \\(x = f^{-1}(y)\\) exists, and \\(\\frac{dx}{dy} = \\frac{1}{dy/dx}\\) where \\(\\frac{dy}{dx} \\neq 0\\).",
    },
    {
      term: "Inverse trigonometric functions",
      text: "They are multi-valued, so their derivatives depend on which branch is used. The board uses the principal branch: for \\(\\sin^{-1}x\\), \\(-\\frac{\\pi}{2} \\le y \\le \\frac{\\pi}{2}\\).",
    },
    {
      term: "Simplify by substitution first",
      text: "With \\(\\sqrt{1 - x^2}\\) put \\(x = \\sin\\theta\\); with \\(1 + x^2\\) put \\(x = \\tan\\theta\\); with \\(\\sqrt{x^2 - 1}\\) put \\(x = \\sec\\theta\\). The inverse function then often reduces to a multiple of \\(\\theta\\), which is easy to differentiate.",
    },
    {
      term: "Logarithmic differentiation",
      text: "Products, quotients and powers are simplified by taking the natural logarithms on both the sides. Always use it for \\(y = [f(x)]^{g(x)}\\), such as \\(x^x\\) or \\((\\log x)^x\\).",
    },
    {
      term: "Implicit function",
      text: "If an equation in \\(x\\) and \\(y\\) is given but neither is an explicit function of the other, then either of the variables is an implicit function of the other.",
    },
    {
      term: "Parametric functions",
      text: "If two variables \\(x\\) and \\(y\\) are defined separately as functions of an intermediate variable \\(t\\), then \\(t\\) is known as the parameter: \\(x = f(t)\\), \\(y = g(t)\\).",
    },
    {
      term: "Derivative of one function with respect to another",
      text: "If \\(u = f(x)\\) and \\(v = g(x)\\), the derivative of \\(u\\) with respect to \\(v\\) is \\(\\frac{du}{dv} = \\frac{du/dx}{dv/dx} = \\frac{f'(x)}{g'(x)}\\).",
    },
    {
      term: "Second derivative",
      text: "The derivative of \\(f'(x)\\) is called the second derivative of \\(f(x)\\): \\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)\\), also written \\(y''\\) or \\(y_2\\).",
    },
    {
      term: "nth order derivative",
      text: "There is no general formula for the nth derivative of a function. Find the 1st, 2nd and 3rd derivatives, observe the pattern in coefficients, angles, powers and signs, and write the nth.",
    },
    {
      term: "Derivatives of a polynomial",
      text: "If \\(f(x)\\) is a polynomial of degree \\(n\\), then its nth order derivative is a constant and all the onward derivatives are zero.",
    },
  ],
  formulas: [
    { label: "Chain rule", latex: "\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}" },
    { label: "Inverse function", latex: "\\frac{dx}{dy} = \\frac{1}{\\;\\frac{dy}{dx}\\;}, \\qquad \\frac{dy}{dx} \\neq 0" },
    { label: "Parametric functions", latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\qquad \\frac{dx}{dt} \\neq 0" },
    { label: "One function with respect to another", latex: "\\frac{du}{dv} = \\frac{du/dx}{dv/dx} = \\frac{f'(x)}{g'(x)}" },
    { label: "Product and quotient rules", latex: "\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx} \\qquad \\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}" },
    {
      label: "Power, exponential and logarithm",
      latex: "\\frac{d}{dx}x^n = nx^{n-1} \\qquad \\frac{d}{dx}a^x = a^x\\log a \\qquad \\frac{d}{dx}\\log_a x = \\frac{1}{x\\log a}",
    },
    {
      label: "Trigonometric functions",
      latex: "\\frac{d}{dx}\\tan x = \\sec^2 x \\qquad \\frac{d}{dx}\\sec x = \\sec x\\tan x \\qquad \\frac{d}{dx}\\cot x = -\\operatorname{cosec}^2 x \\qquad \\frac{d}{dx}\\operatorname{cosec} x = -\\operatorname{cosec} x\\cot x",
    },
    { label: "Inverse sine and cosine", latex: "\\frac{d}{dx}\\sin^{-1}x = \\frac{1}{\\sqrt{1 - x^2}} \\qquad \\frac{d}{dx}\\cos^{-1}x = \\frac{-1}{\\sqrt{1 - x^2}}, \\qquad |x| < 1" },
    { label: "Inverse tangent and cotangent", latex: "\\frac{d}{dx}\\tan^{-1}x = \\frac{1}{1 + x^2} \\qquad \\frac{d}{dx}\\cot^{-1}x = \\frac{-1}{1 + x^2}" },
    {
      label: "Inverse secant and cosecant",
      latex: "\\frac{d}{dx}\\sec^{-1}x = \\frac{1}{|x|\\sqrt{x^2 - 1}} \\qquad \\frac{d}{dx}\\operatorname{cosec}^{-1}x = \\frac{-1}{|x|\\sqrt{x^2 - 1}}, \\qquad |x| > 1",
    },
    {
      label: "Inverse trigonometric composite functions",
      latex: "\\frac{d}{dx}\\sin^{-1}[f(x)] = \\frac{f'(x)}{\\sqrt{1 - [f(x)]^2}} \\qquad \\frac{d}{dx}\\tan^{-1}[f(x)] = \\frac{f'(x)}{1 + [f(x)]^2}",
    },
    { label: "Sum of inverse tangents", latex: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\frac{x + y}{1 - xy}, \\qquad xy < 1" },
    { label: "A function raised to a function", latex: "\\frac{d}{dx}f^{\\,g} = f^{\\,g}\\left[\\frac{g}{f}\\,f' + (\\log f)\\,g'\\right]" },
    { label: "A standard implicit result", latex: "x^m y^n = (x + y)^{m+n} \\;\\Rightarrow\\; \\frac{dy}{dx} = \\frac{y}{x}, \\quad \\frac{d^2y}{dx^2} = 0" },
    {
      label: "Useful substitutions",
      latex: "\\sqrt{1 - x^2}: x = \\sin\\theta \\qquad 1 + x^2: x = \\tan\\theta \\qquad \\sqrt{x^2 - 1}: x = \\sec\\theta \\qquad \\sqrt{\\frac{a - x}{a + x}}: x = a\\cos 2\\theta",
    },
    { label: "Second derivative, parametric form", latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)\\cdot\\frac{dt}{dx}" },
    { label: "nth derivative of a power", latex: "\\frac{d^n}{dx^n}x^m = \\frac{m!}{(m - n)!}x^{m-n} \\;(m > n) \\qquad \\frac{d^n}{dx^n}x^n = n!" },
    {
      label: "nth derivative of a reciprocal and of log x",
      latex: "\\frac{d^n}{dx^n}\\left(\\frac{1}{ax + b}\\right) = \\frac{(-1)^n\\, n!\\, a^n}{(ax + b)^{n+1}} \\qquad \\frac{d^n}{dx^n}\\log x = \\frac{(-1)^{n-1}(n - 1)!}{x^n}",
    },
    {
      label: "nth derivative of sine, cosine and exponential",
      latex: "\\frac{d^n}{dx^n}\\sin(ax + b) = a^n\\sin\\left(ax + b + \\frac{n\\pi}{2}\\right) \\qquad \\frac{d^n}{dx^n}\\cos(ax + b) = a^n\\cos\\left(ax + b + \\frac{n\\pi}{2}\\right) \\qquad \\frac{d^n}{dx^n}e^{ax} = a^n e^{ax}",
    },
    {
      label: "nth derivative of an exponential times a sine",
      latex: "\\frac{d^n}{dx^n}\\left[e^{ax}\\sin(bx + c)\\right] = r^n e^{ax}\\sin(bx + c + n\\alpha), \\quad r = \\sqrt{a^2 + b^2}, \\; \\alpha = \\tan^{-1}\\frac{b}{a}",
    },
  ],
  derivations: [
    {
      title: "If y = f(u) and u = g(x) are differentiable, prove that \\(\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}\\) (chain rule)",
      steps: [
        "Assume \\(u\\) is not a constant function. Give \\(x\\) a small increment \\(\\delta x\\); let \\(\\delta u\\), \\(\\delta y\\) be the increments in \\(u\\), \\(y\\), with \\(\\delta u \\neq 0\\).",
        "Write \\(\\frac{\\delta y}{\\delta x} = \\frac{\\delta y}{\\delta u}\\cdot\\frac{\\delta u}{\\delta x}\\) and take the limit as \\(\\delta x \\to 0\\).",
        "As \\(\\delta x \\to 0\\), \\(\\delta u \\to 0\\), because \\(u\\) is a continuous function of \\(x\\).",
        "Both limits on the right exist (given differentiable), so the left side exists: \\(\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}\\).",
      ],
    },
    {
      title: "If x = f(t) and y = g(t) are differentiable, prove that \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\), \\(\\frac{dx}{dt} \\neq 0\\)",
      steps: [
        "Give \\(t\\) a small increment \\(\\delta t\\); let \\(\\delta x\\), \\(\\delta y\\) be the increments in \\(x\\), \\(y\\), with \\(\\delta x \\neq 0\\).",
        "Write \\(\\frac{\\delta y}{\\delta x} = \\frac{\\delta y/\\delta t}{\\delta x/\\delta t}\\).",
        "Take the limit as \\(\\delta t \\to 0\\); then \\(\\delta x \\to 0\\), since \\(x\\) is a continuous function of \\(t\\).",
        "So \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\). For the 'hence' part, find \\(\\frac{dx}{dt}\\) and \\(\\frac{dy}{dt}\\) separately and divide.",
      ],
    },
    {
      title: "If y = f(x) is differentiable and x = f⁻¹(y) exists, prove that \\(\\frac{dx}{dy} = \\frac{1}{dy/dx}\\)",
      steps: [
        "Give \\(x\\) a small increment \\(\\delta x\\); the increment in \\(y\\) is \\(\\delta y\\), both non-zero.",
        "\\(\\frac{\\delta x}{\\delta y}\\cdot\\frac{\\delta y}{\\delta x} = 1\\), so \\(\\frac{\\delta x}{\\delta y} = \\frac{1}{\\delta y/\\delta x}\\).",
        "Take the limit as \\(\\delta x \\to 0\\); then \\(\\delta y \\to 0\\), since \\(f\\) is continuous.",
        "So \\(\\frac{dx}{dy} = \\frac{1}{dy/dx}\\), where \\(\\frac{dy}{dx} \\neq 0\\).",
      ],
    },
    {
      title: "Prove that \\(\\frac{d}{dx}(\\sin^{-1}x) = \\frac{1}{\\sqrt{1 - x^2}}\\), \\(|x| < 1\\)",
      steps: [
        "\\(y = \\sin^{-1}x\\), \\(-\\frac{\\pi}{2} \\le y \\le \\frac{\\pi}{2}\\), so \\(x = \\sin y\\).",
        "\\(\\frac{dx}{dy} = \\cos y = \\pm\\sqrt{1 - \\sin^2 y} = \\pm\\sqrt{1 - x^2}\\).",
        "\\(\\cos y\\) is positive, since \\(y\\) lies in the 1st or 4th quadrant, so \\(\\frac{dx}{dy} = \\sqrt{1 - x^2}\\).",
        "Hence \\(\\frac{dy}{dx} = \\frac{1}{\\sqrt{1 - x^2}}\\), \\(|x| < 1\\).",
      ],
    },
    {
      title: "Logarithmic differentiation: find \\(\\frac{dy}{dx}\\) if \\(y = x^x\\)",
      steps: [
        "Take logarithms on both sides: \\(\\log y = x\\log x\\).",
        "Differentiate with respect to \\(x\\): \\(\\frac{1}{y}\\frac{dy}{dx} = x\\cdot\\frac{1}{x} + \\log x = 1 + \\log x\\).",
        "Multiply by \\(y\\): \\(\\frac{dy}{dx} = x^x(1 + \\log x)\\).",
      ],
    },
    {
      title: "Implicit function: find \\(\\frac{dy}{dx}\\) if \\(\\sqrt{x} + \\sqrt{y} = \\sqrt{a}\\)",
      steps: [
        "Differentiate both sides with respect to \\(x\\), treating \\(y\\) as a function of \\(x\\): \\(\\frac{1}{2\\sqrt{x}} + \\frac{1}{2\\sqrt{y}}\\frac{dy}{dx} = 0\\).",
        "Collect the terms containing \\(\\frac{dy}{dx}\\) on one side and solve: \\(\\frac{dy}{dx} = -\\sqrt{\\frac{y}{x}}\\).",
      ],
    },
    {
      title: "Inverse trigonometric function by substitution: \\(y = \\cos^{-1}(2x\\sqrt{1 - x^2})\\)",
      steps: [
        "Put \\(x = \\sin\\theta\\), so \\(\\theta = \\sin^{-1}x\\) and \\(2x\\sqrt{1 - x^2} = 2\\sin\\theta\\cos\\theta = \\sin 2\\theta\\).",
        "\\(y = \\cos^{-1}(\\sin 2\\theta) = \\cos^{-1}\\left[\\cos\\left(\\frac{\\pi}{2} - 2\\theta\\right)\\right] = \\frac{\\pi}{2} - 2\\sin^{-1}x\\).",
        "Differentiate: \\(\\frac{dy}{dx} = \\frac{-2}{\\sqrt{1 - x^2}}\\).",
      ],
    },
    {
      title: "If \\(y = \\sqrt{\\sin x + \\sqrt{\\sin x + \\sqrt{\\sin x + \\cdots}}}\\), show that \\(\\frac{dy}{dx} = \\frac{\\cos x}{2y - 1}\\)",
      steps: [
        "The part under the first root after \\(\\sin x\\) is \\(y\\) itself, so \\(y = \\sqrt{\\sin x + y}\\), that is \\(y^2 = \\sin x + y\\).",
        "Differentiate: \\(2y\\frac{dy}{dx} = \\cos x + \\frac{dy}{dx}\\).",
        "So \\((2y - 1)\\frac{dy}{dx} = \\cos x\\) and \\(\\frac{dy}{dx} = \\frac{\\cos x}{2y - 1}\\).",
      ],
    },
    {
      title: "Second-order 'show that': if \\(y = \\sin^{-1}x\\), show that \\((1 - x^2)\\frac{d^2y}{dx^2} - x\\frac{dy}{dx} = 0\\)",
      steps: [
        "\\(\\frac{dy}{dx} = \\frac{1}{\\sqrt{1 - x^2}}\\), so \\(\\sqrt{1 - x^2}\\,\\frac{dy}{dx} = 1\\). Clear the root by squaring: \\((1 - x^2)\\left(\\frac{dy}{dx}\\right)^2 = 1\\).",
        "Differentiate again: \\((1 - x^2)\\cdot 2\\frac{dy}{dx}\\frac{d^2y}{dx^2} - 2x\\left(\\frac{dy}{dx}\\right)^2 = 0\\).",
        "Divide by \\(2\\frac{dy}{dx}\\): \\((1 - x^2)\\frac{d^2y}{dx^2} - x\\frac{dy}{dx} = 0\\). The same route works for \\(y = \\cos(m\\cos^{-1}x)\\).",
      ],
    },
    {
      title: "Find the nth order derivative of \\(\\log x\\)",
      steps: [
        "\\(y_1 = \\frac{1}{x}\\), \\(y_2 = -\\frac{1}{x^2}\\), \\(y_3 = \\frac{2}{x^3} = \\frac{(-1)^2\\,2!}{x^3}\\).",
        "Observe the pattern of the sign, the factorial and the power.",
        "In general \\(y_n = \\frac{(-1)^{n-1}(n - 1)!}{x^n}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Derivative of an implicit function, e.g. \\(\\sqrt{x} + \\sqrt{y} = \\sqrt{a}\\) or \\(\\log(x + y) = xy\\)", years: [2026, 2025, 2024, 2023, 2020, 2017, 2015] },
    { topic: "Prove \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\) for parametric functions and use it, or differentiate one function with respect to another", years: [2026, 2025, 2024, 2022, 2019, 2017] },
    { topic: "Second or nth order derivatives, and second-order 'show that' results", years: [2026, 2025, 2024, 2023, 2022, 2020, 2015] },
    { topic: "Derivative of a composite function by the chain rule", years: [2026, 2025, 2020, 2018] },
    { topic: "Prove the chain rule, or the derivative of an inverse function, and use it", years: [2026, 2024, 2022, 2017, 2016] },
    { topic: "Inverse trigonometric functions, simplified by a substitution", years: [2026, 2024, 2018, 2016] },
    { topic: "An infinite root: \\(y = \\sqrt{f(x) + \\sqrt{f(x) + \\cdots}}\\), show \\(\\frac{dy}{dx} = \\frac{f'(x)}{2y - 1}\\)", years: [2023, 2015] },
    { topic: "Logarithmic differentiation: \\(x^x\\) or \\((\\log x)^x\\)", years: [2024, 2016] },
  ],
  mistakes: [
    {
      title: "Dropping the derivative of the inside function",
      body: "\\(\\frac{d}{dx}\\sin(x^2 + x) = \\cos(x^2 + x)\\cdot(2x + 1)\\), not just \\(\\cos(x^2 + x)\\). Every layer of a composite function adds its own factor.",
    },
    {
      title: "Treating \\(x^x\\) as a power or as an exponential",
      body: "Neither \\(nx^{n-1}\\) nor \\(a^x\\log a\\) applies when both base and index vary. Take logarithms first: \\(\\frac{d}{dx}x^x = x^x(1 + \\log x)\\).",
    },
    {
      title: "Writing \\(2y\\) for the derivative of \\(y^2\\)",
      body: "In an implicit function \\(y\\) depends on \\(x\\): \\(\\frac{d}{dx}(y^2) = 2y\\frac{dy}{dx}\\), and \\(\\frac{d}{dx}(xy) = x\\frac{dy}{dx} + y\\).",
    },
    {
      title: "Dividing second derivatives in parametric form",
      body: "\\(\\frac{d^2y}{dx^2}\\) is not \\(\\frac{d^2y/dt^2}{d^2x/dt^2}\\). Differentiate \\(\\frac{dy}{dx}\\) with respect to \\(t\\), then multiply by \\(\\frac{dt}{dx}\\).",
    },
    {
      title: "Differentiating \\(\\log_x a\\) as it stands",
      body: "Change the base first: \\(\\log_x a = \\frac{\\log a}{\\log x}\\), so \\(\\frac{dy}{dx} = -\\frac{\\log a}{x(\\log x)^2}\\). In the board paper \\(\\log\\) means the natural logarithm.",
    },
    {
      title: "Cancelling an inverse function outside its principal range",
      body: "\\(\\sin^{-1}(\\sin 2\\theta) = 2\\theta\\) only when \\(2\\theta\\) lies in \\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\). State the range of \\(x\\) for which the substitution holds.",
    },
  ],
};

export default sheet;
