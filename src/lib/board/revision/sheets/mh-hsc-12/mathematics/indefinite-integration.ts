import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 3 Indefinite Integration. Method
 * statements are the Balbharati text's own, trimmed; every integral below was
 * checked by differentiating the answer; most-asked years from the 37 board
 * past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Indefinite Integration",
  chapterSlug: "indefinite-integration",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Primitive",
      text: "If \\(g'(x) = f(x)\\), the integration of \\(f(x)\\) with respect to \\(x\\) is \\(g(x)\\), or \\(g(x)\\) is called the primitive of \\(f(x)\\): \\(\\int f(x)\\,dx = g(x) + c\\).",
    },
    {
      term: "Arbitrary constant",
      text: "Since the derivative of a constant is zero, \\(c\\) is an arbitrary constant that can take infinitely many values: \\(x^2 + c\\) is a family of curves with the same slope \\(2x\\) at each \\(x\\). **Always write \\(+ c\\).**",
    },
    {
      term: "Properties",
      text: "If \\(f\\) and \\(g\\) are integrable, \\(\\int [f(x) \\pm g(x)]\\,dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx\\) and \\(\\int k f(x)\\,dx = k\\int f(x)\\,dx\\) for a constant \\(k\\).",
    },
    {
      term: "Integration by substitution",
      text: "If \\(x = \\phi(t)\\) is a differentiable function of \\(t\\), then \\(\\int f(x)\\,dx = \\int f[\\phi(t)]\\,\\phi'(t)\\,dt\\). Look for a function whose derivative is also present in the integrand.",
    },
    {
      term: "Quadratic expressions",
      text: "Write \\(ax^2 + bx + c\\) with \\(a\\) taken out, complete the square by adding and subtracting \\(\\left(\\frac{1}{2}\\text{ coefficient of } x\\right)^2\\), express it as a sum or difference of two squares, then use a standard integral.",
    },
    {
      term: "Linear over quadratic",
      text: "For \\(\\int \\frac{px + q}{ax^2 + bx + c}\\,dx\\) we express \\(px + q = A\\frac{d}{dx}(ax^2 + bx + c) + B\\), find \\(A\\) and \\(B\\), and split into a log term and a standard integral.",
    },
    {
      term: "Squares of sine and cosine",
      text: "For \\(\\int \\frac{dx}{a\\sin^2 x + b\\cos^2 x + c}\\), divide numerator and denominator by \\(\\cos^2 x\\) and put \\(\\tan x = t\\).",
    },
    {
      term: "Linear in sine and cosine",
      text: "For \\(\\int \\frac{dx}{a\\sin x + b\\cos x + c}\\) we use the standard substitution \\(\\tan\\frac{x}{2} = t\\).",
    },
    {
      term: "Integration by parts",
      text: "Useful when the integrand is a product of two different types of functions, one of which can be differentiated and the other can be integrated conveniently.",
    },
    {
      term: "LIATE",
      text: "The first function \\(u\\) is the one that comes first in the order L I A T E: Logarithmic, Inverse trigonometric, Algebraic, Trigonometric, Exponential. A wrong choice gives a harder integral.",
    },
    {
      term: "A single function by parts",
      text: "To evaluate \\(\\int \\sin^{-1}x\\,dx\\), \\(\\int \\tan^{-1}x\\,dx\\), \\(\\int \\sec^{-1}x\\,dx\\) or \\(\\int \\log x\\,dx\\), take the second function \\(v\\) to be 1 and then apply integration by parts.",
    },
    {
      term: "Integral of the type \\(e^x[f(x) + f'(x)]\\)",
      text: "\\(\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x) + c\\). Split the bracket into a function and its derivative, e.g. \\(\\int e^x(\\tan x + \\sec^2 x)\\,dx = e^x\\tan x + c\\).",
    },
    {
      term: "Proper rational function",
      text: "\\(\\frac{f(x)}{g(x)}\\) is proper if degree of \\(f(x)\\) < degree of \\(g(x)\\); otherwise improper. Divide an improper one first: quotient + \\(\\frac{\\text{remainder}}{g(x)}\\).",
    },
    {
      term: "Partial fractions",
      text: "The three types: non-repeated linear factors, repeated linear factors, and a linear factor times a non-repeated quadratic factor (numerator \\(Bx + C\\) over the quadratic).",
    },
  ],
  formulas: [
    { label: "Power, reciprocal and root", latex: "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + c \\;(n \\neq -1) \\qquad \\int \\frac{1}{x}\\,dx = \\log|x| + c \\qquad \\int \\frac{1}{\\sqrt{x}}\\,dx = 2\\sqrt{x} + c" },
    { label: "Exponential", latex: "\\int e^x\\,dx = e^x + c \\qquad \\int a^x\\,dx = \\frac{a^x}{\\log a} + c" },
    { label: "Linear argument", latex: "\\int f(ax + b)\\,dx = \\frac{1}{a}\\,g(ax + b) + c, \\quad \\text{where } \\int f(x)\\,dx = g(x)" },
    {
      label: "Function and its derivative",
      latex: "\\int \\frac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + c \\qquad \\int [f(x)]^n f'(x)\\,dx = \\frac{[f(x)]^{n+1}}{n+1} + c \\qquad \\int \\frac{f'(x)}{\\sqrt{f(x)}}\\,dx = 2\\sqrt{f(x)} + c",
    },
    {
      label: "Basic trigonometric integrals",
      latex: "\\int \\sec^2 x\\,dx = \\tan x + c \\quad \\int \\operatorname{cosec}^2 x\\,dx = -\\cot x + c \\quad \\int \\sec x\\tan x\\,dx = \\sec x + c \\quad \\int \\operatorname{cosec} x\\cot x\\,dx = -\\operatorname{cosec} x + c",
    },
    { label: "Tangent and cotangent", latex: "\\int \\tan x\\,dx = \\log|\\sec x| + c \\qquad \\int \\cot x\\,dx = \\log|\\sin x| + c" },
    { label: "Secant and cosecant", latex: "\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + c \\qquad \\int \\operatorname{cosec} x\\,dx = \\log|\\operatorname{cosec} x - \\cot x| + c" },
    { label: "Sum of squares", latex: "\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a} + c" },
    { label: "Difference of squares", latex: "\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a}\\log\\left|\\frac{x - a}{x + a}\\right| + c \\qquad \\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a}\\log\\left|\\frac{a + x}{a - x}\\right| + c" },
    { label: "Root of a squared difference, inverse sine", latex: "\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\frac{x}{a} + c" },
    {
      label: "Root of a sum or difference, logarithm",
      latex: "\\int \\frac{dx}{\\sqrt{x^2 + a^2}} = \\log\\left|x + \\sqrt{x^2 + a^2}\\right| + c \\qquad \\int \\frac{dx}{\\sqrt{x^2 - a^2}} = \\log\\left|x + \\sqrt{x^2 - a^2}\\right| + c",
    },
    { label: "Inverse secant form", latex: "\\int \\frac{dx}{x\\sqrt{x^2 - a^2}} = \\frac{1}{a}\\sec^{-1}\\frac{x}{a} + c" },
    { label: "Root of a squared difference, integrated", latex: "\\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + c" },
    { label: "Root of a sum of squares, integrated", latex: "\\int \\sqrt{x^2 + a^2}\\,dx = \\frac{x}{2}\\sqrt{x^2 + a^2} + \\frac{a^2}{2}\\log\\left|x + \\sqrt{x^2 + a^2}\\right| + c" },
    { label: "Root of x squared minus a squared, integrated", latex: "\\int \\sqrt{x^2 - a^2}\\,dx = \\frac{x}{2}\\sqrt{x^2 - a^2} - \\frac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right| + c" },
    { label: "Integration by parts", latex: "\\int uv\\,dx = u\\int v\\,dx - \\int\\left[\\frac{du}{dx}\\int v\\,dx\\right]dx \\qquad \\int u\\,dv = uv - \\int v\\,du" },
    { label: "Exponential times a function plus its derivative", latex: "\\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) + c" },
    {
      label: "Partial fraction forms",
      latex: "\\frac{A}{x - a} + \\frac{B}{x - b} + \\frac{C}{x - c} \\qquad \\frac{A}{x - a} + \\frac{B}{(x - a)^2} + \\frac{C}{x - b} \\qquad \\frac{A}{x - a} + \\frac{Bx + C}{x^2 + bx + c}",
    },
    {
      label: "Half-angle substitution",
      latex: "\\tan\\frac{x}{2} = t: \\quad \\sin x = \\frac{2t}{1 + t^2}, \\quad \\cos x = \\frac{1 - t^2}{1 + t^2}, \\quad dx = \\frac{2\\,dt}{1 + t^2}",
    },
    {
      label: "Trigonometric identities used before integrating",
      latex: "\\cos^3 x = \\frac{\\cos 3x + 3\\cos x}{4} \\qquad \\sin^3 x = \\frac{3\\sin x - \\sin 3x}{4} \\qquad 1 + \\sin 2x = (\\sin x + \\cos x)^2",
    },
  ],
  derivations: [
    {
      title: "Prove that \\(\\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a}\\log\\left|\\frac{a + x}{a - x}\\right| + c\\)",
      steps: [
        "Split: \\(\\frac{1}{a^2 - x^2} = \\frac{1}{2a}\\left[\\frac{1}{a + x} + \\frac{1}{a - x}\\right]\\).",
        "Integrate: \\(\\frac{1}{2a}\\left[\\log|a + x| - \\log|a - x|\\right]\\) (the minus from \\(\\frac{d}{dx}(a - x) = -1\\)).",
        "Combine the logs: \\(\\frac{1}{2a}\\log\\left|\\frac{a + x}{a - x}\\right| + c\\).",
      ],
    },
    {
      title: "Prove that \\(\\int \\frac{dx}{\\sqrt{x^2 + a^2}} = \\log\\left|x + \\sqrt{x^2 + a^2}\\right| + c\\)",
      steps: [
        "Put \\(x = a\\tan\\theta\\): \\(dx = a\\sec^2\\theta\\,d\\theta\\) and \\(\\sqrt{x^2 + a^2} = a\\sec\\theta\\).",
        "\\(I = \\int \\sec\\theta\\,d\\theta = \\log|\\sec\\theta + \\tan\\theta| + c_1\\).",
        "\\(\\sec\\theta = \\frac{\\sqrt{x^2 + a^2}}{a}\\), \\(\\tan\\theta = \\frac{x}{a}\\), so \\(I = \\log\\left|x + \\sqrt{x^2 + a^2}\\right| - \\log a + c_1\\).",
        "Write \\(c = c_1 - \\log a\\).",
      ],
    },
    {
      title: "Prove that \\(\\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + c\\)",
      steps: [
        "Take \\(I = \\int \\sqrt{a^2 - x^2}\\cdot 1\\,dx\\) and integrate by parts: \\(I = x\\sqrt{a^2 - x^2} + \\int \\frac{x^2}{\\sqrt{a^2 - x^2}}\\,dx\\).",
        "Write \\(x^2 = a^2 - (a^2 - x^2)\\): \\(I = x\\sqrt{a^2 - x^2} + a^2\\int \\frac{dx}{\\sqrt{a^2 - x^2}} - I\\).",
        "\\(2I = x\\sqrt{a^2 - x^2} + a^2\\sin^{-1}\\frac{x}{a}\\); divide by 2 and add \\(c\\).",
      ],
    },
    {
      title: "Prove that \\(\\int \\sqrt{x^2 - a^2}\\,dx = \\frac{x}{2}\\sqrt{x^2 - a^2} - \\frac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right| + c\\)",
      steps: [
        "By parts with \\(v = 1\\): \\(I = x\\sqrt{x^2 - a^2} - \\int \\frac{x^2}{\\sqrt{x^2 - a^2}}\\,dx\\).",
        "Write \\(x^2 = (x^2 - a^2) + a^2\\): \\(I = x\\sqrt{x^2 - a^2} - I - a^2\\log\\left|x + \\sqrt{x^2 - a^2}\\right|\\).",
        "So \\(2I = x\\sqrt{x^2 - a^2} - a^2\\log\\left|x + \\sqrt{x^2 - a^2}\\right|\\); divide by 2 and add \\(c\\).",
      ],
    },
    {
      title: "If u and v are differentiable functions of x, prove that \\(\\int uv\\,dx = u\\int v\\,dx - \\int\\left[\\frac{du}{dx}\\int v\\,dx\\right]dx\\)",
      steps: [
        "Let \\(\\int v\\,dx = w\\), so \\(\\frac{dw}{dx} = v\\).",
        "\\(\\frac{d}{dx}(uw) = u\\frac{dw}{dx} + w\\frac{du}{dx} = uv + w\\frac{du}{dx}\\).",
        "By the definition of integration, \\(uw = \\int uv\\,dx + \\int w\\frac{du}{dx}\\,dx\\).",
        "Rearrange and put back \\(w = \\int v\\,dx\\). The form \\(\\int u\\,dv = uv - \\int v\\,du\\) follows the same way from \\(d(uv) = u\\,dv + v\\,du\\).",
      ],
    },
    {
      title: "Integrate by parts: \\(\\int x\\tan^{-1}x\\,dx\\) and \\(\\int \\log x\\,dx\\)",
      steps: [
        "By LIATE, \\(u = \\tan^{-1}x\\), \\(v = x\\): \\(I = \\frac{x^2}{2}\\tan^{-1}x - \\int \\frac{x^2}{2(1 + x^2)}\\,dx\\).",
        "\\(\\frac{x^2}{1 + x^2} = 1 - \\frac{1}{1 + x^2}\\), so \\(I = \\frac{x^2}{2}\\tan^{-1}x - \\frac{x}{2} + \\frac{1}{2}\\tan^{-1}x + c\\).",
        "For \\(\\int \\log x\\,dx\\) take \\(v = 1\\): \\(x\\log x - \\int x\\cdot\\frac{1}{x}\\,dx = x\\log x - x + c\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int \\frac{\\sin(x + a)}{\\cos(x - b)}\\,dx\\)",
      steps: [
        "Write \\(x + a = (x - b) + (a + b)\\) and expand: \\(\\sin(x - b)\\cos(a + b) + \\cos(x - b)\\sin(a + b)\\).",
        "Divide by \\(\\cos(x - b)\\): the integrand is \\(\\cos(a + b)\\tan(x - b) + \\sin(a + b)\\).",
        "\\(I = \\cos(a + b)\\log|\\sec(x - b)| + x\\sin(a + b) + c\\).",
      ],
    },
    {
      title: "Integral of the type \\(\\int e^x[f(x) + f'(x)]\\,dx\\), e.g. \\(\\int e^x\\left(\\sin^{-1}x + \\frac{1}{\\sqrt{1 - x^2}}\\right)dx\\)",
      steps: [
        "Let \\(e^x f(x) = t\\); differentiating, \\(\\frac{dt}{dx} = e^x[f(x) + f'(x)]\\), so the integral is \\(e^x f(x) + c\\).",
        "Here \\(f(x) = \\sin^{-1}x\\) and \\(f'(x) = \\frac{1}{\\sqrt{1 - x^2}}\\), so the answer is \\(e^x\\sin^{-1}x + c\\).",
      ],
    },
    {
      title: "Partial fractions: \\(\\int \\frac{3x^2 + 4x - 5}{(x^2 - 1)(x + 2)}\\,dx\\)",
      steps: [
        "Factor: \\(\\frac{3x^2 + 4x - 5}{(x - 1)(x + 1)(x + 2)} = \\frac{A}{x - 1} + \\frac{B}{x + 1} + \\frac{C}{x + 2}\\).",
        "\\(3x^2 + 4x - 5 = A(x + 1)(x + 2) + B(x - 1)(x + 2) + C(x - 1)(x + 1)\\). Put \\(x = 1, -1, -2\\): \\(A = \\frac{1}{3}\\), \\(B = 3\\), \\(C = -\\frac{1}{3}\\).",
        "\\(I = \\frac{1}{3}\\log|x - 1| + 3\\log|x + 1| - \\frac{1}{3}\\log|x + 2| + c\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int \\frac{2\\,dx}{3 + 2\\sin^2 x + 5\\cos^2 x}\\)",
      steps: [
        "Divide numerator and denominator by \\(\\cos^2 x\\): \\(\\frac{2\\sec^2 x}{3\\sec^2 x + 2\\tan^2 x + 5} = \\frac{2\\sec^2 x}{5\\tan^2 x + 8}\\).",
        "Put \\(\\tan x = t\\), \\(\\sec^2 x\\,dx = dt\\): \\(I = \\frac{2}{5}\\int \\frac{dt}{t^2 + \\frac{8}{5}}\\).",
        "\\(I = \\frac{2}{5}\\sqrt{\\frac{5}{8}}\\tan^{-1}\\left(\\sqrt{\\frac{5}{8}}\\,t\\right) + c = \\frac{1}{\\sqrt{10}}\\tan^{-1}\\left(\\frac{\\sqrt{5}\\tan x}{2\\sqrt{2}}\\right) + c\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Integration by substitution (\\(\\frac{f'}{f}\\), \\(x^9\\sec^2 x^{10}\\), \\(\\frac{e^x(1 + x)}{\\cos^2(xe^x)}\\), \\(\\frac{\\sin\\sqrt{x}}{\\sqrt{x}}\\))", years: [2026, 2025, 2024, 2017] },
    { topic: "Integration by parts: prove the rule, or evaluate \\(\\log x\\), \\(x\\log x\\), \\(x\\tan^{-1}x\\), \\(x^2\\sin 3x\\), \\(\\sec^3 x\\)", years: [2026, 2024, 2023, 2022, 2017, 2015] },
    { topic: "Standard integrals, directly or after rewriting: \\(\\frac{1}{25 - 9x^2}\\), \\(\\frac{1}{9x^2 + 1}\\), \\(\\frac{x}{x^2 + 4x + 8}\\), \\(\\frac{5^x}{3^x}\\)", years: [2026, 2025, 2024, 2022, 2020, 2019] },
    { topic: "Prove a standard integral: \\(\\sqrt{a^2 - x^2}\\), \\(\\sqrt{x^2 - a^2}\\), \\(\\frac{1}{a^2 - x^2}\\) or \\(\\frac{1}{\\sqrt{x^2 + a^2}}\\)", years: [2025, 2019, 2018, 2016, 2015] },
    { topic: "Trigonometric integrands: \\(\\frac{\\sin(x + a)}{\\cos(x - b)}\\), \\(\\frac{\\sin x}{\\sin 3x}\\), \\(\\sqrt{1 + \\sin 2x}\\), \\(\\cos^3 x\\)", years: [2026, 2025, 2024, 2023] },
    { topic: "Integral of the type \\(e^x[f(x) + f'(x)]\\)", years: [2025, 2018, 2015] },
    { topic: "Integration by partial fractions", years: [2026, 2024] },
  ],
  mistakes: [
    {
      title: "Leaving out \\(+ c\\)",
      body: "Every indefinite integral ends with \\(+ c\\). In a proof, an absorbed constant is renamed: \\(c = c_1 - \\log a\\).",
    },
    {
      title: "Forgetting \\(\\frac{1}{a}\\) for a linear argument",
      body: "\\(\\int \\frac{dx}{4x - 1} = \\frac{1}{4}\\log|4x - 1| + c\\), and \\(\\int \\frac{dx}{9x^2 + 1} = \\frac{1}{3}\\tan^{-1}(3x) + c\\). Take the coefficient of \\(x\\) out before using a standard form.",
    },
    {
      title: "Choosing \\(u\\) against LIATE",
      body: "In \\(\\int x\\tan^{-1}x\\,dx\\), \\(u = \\tan^{-1}x\\) (I comes before A). Taking \\(u = x\\) needs \\(\\int \\tan^{-1}x\\,dx\\) and makes the work longer; in \\(\\int x e^x dx\\), \\(u = x\\).",
    },
    {
      title: "Mixing up the two difference-of-squares results",
      body: "\\(\\frac{1}{x^2 - a^2}\\) gives \\(\\frac{1}{2a}\\log\\left|\\frac{x - a}{x + a}\\right|\\); \\(\\frac{1}{a^2 - x^2}\\) gives \\(\\frac{1}{2a}\\log\\left|\\frac{a + x}{a - x}\\right|\\). Check by which term is positive.",
    },
    {
      title: "Answering in the substituted variable",
      body: "After \\(t = \\tan x\\) or \\(x = a\\tan\\theta\\), write the final answer back in terms of \\(x\\).",
    },
    {
      title: "Using partial fractions on an improper fraction",
      body: "If the degree of the numerator is not less than that of the denominator, divide first. Also factor fully: \\(x^2 - 1 = (x - 1)(x + 1)\\).",
    },
  ],
};

export default sheet;
