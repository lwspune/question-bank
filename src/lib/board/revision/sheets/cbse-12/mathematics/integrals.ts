import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 7 Integrals. Definitions,
 * methods and properties P0 to P7 in NCERT's own wording, trimmed; every
 * integral below was checked by differentiating the answer back (definite
 * results re-worked by hand); most-asked years and marks from the 242 CBSE
 * board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Integrals",
  chapterSlug: "integrals",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 7",
  keyPoints: [
    {
      term: "Anti derivative",
      text: "Integration is the inverse process of differentiation. If \\(\\frac{d}{dx}F(x) = f(x)\\), we write \\(\\int f(x)\\,dx = F(x) + C\\): an indefinite integral, with \\(C\\) the constant of integration. All anti derivatives differ by a constant.",
    },
    {
      term: "A particular anti derivative",
      text: "If we know one anti derivative \\(F\\), then so is \\(F + C\\). An additional condition such as \\(F(0) = 3\\) determines a specific value of \\(C\\), giving a unique anti derivative.",
    },
    {
      term: "Properties",
      text: "\\(\\int [f(x) + g(x)]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx\\), and for any real number \\(k\\), \\(\\int k f(x)\\,dx = k\\int f(x)\\,dx\\).",
    },
    {
      term: "Integration by substitution",
      text: "A change in the variable of integration often reduces an integral to one of the fundamental integrals. Look for a function whose derivative is also present, e.g. \\(\\frac{f'(x)}{f(x)}\\) gives \\(\\log|f(x)|\\).",
    },
    {
      term: "Trigonometric identities",
      text: "When the integrand involves trigonometric functions, use known identities first: \\(1 + \\cos 2x = 2\\cos^2 x\\), \\(1 - \\cos 2x = 2\\sin^2 x\\), \\(1 + \\sin 2x = (\\sin x + \\cos x)^2\\), \\(2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)\\).",
    },
    {
      term: "Quadratic in the denominator",
      text: "For \\(\\int \\frac{dx}{ax^2 + bx + c}\\) or \\(\\int \\frac{dx}{\\sqrt{ax^2 + bx + c}}\\), write \\(ax^2 + bx + c = a\\left[\\left(x + \\frac{b}{2a}\\right)^2 + \\left(\\frac{c}{a} - \\frac{b^2}{4a^2}\\right)\\right]\\) and use a standard form.",
    },
    {
      term: "Linear over quadratic",
      text: "For \\(\\int \\frac{px + q}{ax^2 + bx + c}\\,dx\\) or \\(\\int \\frac{px + q}{\\sqrt{ax^2 + bx + c}}\\,dx\\), express \\(px + q = A\\frac{d}{dx}(ax^2 + bx + c) + B\\), with \\(A\\) and \\(B\\) found by comparing coefficients.",
    },
    {
      term: "Proper and improper rational functions",
      text: "\\(\\frac{P(x)}{Q(x)}\\) is proper if the degree of \\(P\\) is less than the degree of \\(Q\\); otherwise improper. Improper ones are reduced to proper ones by long division: \\(\\frac{P(x)}{Q(x)} = T(x) + \\frac{P_1(x)}{Q(x)}\\).",
    },
    {
      term: "Partial fractions",
      text: "Factor \\(Q(x)\\) fully. Linear factors give \\(\\frac{A}{x - a}\\); a repeated factor gives \\(\\frac{A}{x - a} + \\frac{B}{(x - a)^2}\\); a quadratic \\(x^2 + bx + c\\) that can not be factorised further gives \\(\\frac{Bx + C}{x^2 + bx + c}\\).",
    },
    {
      term: "Integration by parts",
      text: "The integral of the product of two functions = first function times integral of the second function, minus the integral of (differential coefficient of the first times integral of the second). Take as the second function one whose integral is well known.",
    },
    {
      term: "Fundamental theorems",
      text: "First: if \\(A(x) = \\int_a^x f(t)\\,dt\\), then \\(A'(x) = f(x)\\). Second: if \\(F' = f\\) and \\(f\\) is continuous on \\([a, b]\\), then \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\). No constant is needed.",
    },
    {
      term: "Definite integrals by substitution",
      text: "After substituting, keep the integral in the new variable and change the limits accordingly; there is no need to go back to \\(x\\).",
    },
    {
      term: "Modulus and split intervals",
      text: "By P2, \\(\\int_a^b = \\int_a^c + \\int_c^b\\). For \\(|x - 1|\\), \\(|x^3 - x|\\), \\(\\sin|x|\\) or \\(|\\sin x - \\cos x|\\), split where the expression changes sign and remove the modulus on each piece.",
    },
    {
      term: "Even and odd functions",
      text: "\\(\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\) if \\(f\\) is even, \\(f(-x) = f(x)\\), and \\(= 0\\) if \\(f\\) is odd, \\(f(-x) = -f(x)\\). Split a mixed integrand into its odd part and its even part.",
    },
  ],
  formulas: [
    { label: "Power, reciprocal, exponential", latex: "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\;(n \\neq -1) \\qquad \\int \\frac{dx}{x} = \\log|x| + C \\qquad \\int e^x\\,dx = e^x + C \\qquad \\int a^x\\,dx = \\frac{a^x}{\\log a} + C" },
    {
      label: "Basic trigonometric integrals",
      latex: "\\int \\sec^2 x\\,dx = \\tan x + C \\quad \\int \\operatorname{cosec}^2 x\\,dx = -\\cot x + C \\quad \\int \\sec x\\tan x\\,dx = \\sec x + C \\quad \\int \\operatorname{cosec} x\\cot x\\,dx = -\\operatorname{cosec} x + C",
    },
    { label: "Inverse trigonometric results", latex: "\\int \\frac{dx}{\\sqrt{1 - x^2}} = \\sin^{-1}x + C \\qquad \\int \\frac{dx}{1 + x^2} = \\tan^{-1}x + C" },
    { label: "Tangent and cotangent", latex: "\\int \\tan x\\,dx = \\log|\\sec x| + C \\qquad \\int \\cot x\\,dx = \\log|\\sin x| + C" },
    { label: "Secant and cosecant", latex: "\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + C \\qquad \\int \\operatorname{cosec} x\\,dx = \\log|\\operatorname{cosec} x - \\cot x| + C" },
    { label: "Difference of squares", latex: "\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a}\\log\\left|\\frac{x - a}{x + a}\\right| + C \\qquad \\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a}\\log\\left|\\frac{a + x}{a - x}\\right| + C" },
    { label: "Sum of squares", latex: "\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a} + C" },
    { label: "Square roots in the denominator", latex: "\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\frac{x}{a} + C \\qquad \\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\log\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C" },
    { label: "Root of a squared difference, integrated", latex: "\\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + C" },
    { label: "Roots of x squared plus or minus a squared", latex: "\\int \\sqrt{x^2 \\pm a^2}\\,dx = \\frac{x}{2}\\sqrt{x^2 \\pm a^2} \\pm \\frac{a^2}{2}\\log\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C" },
    { label: "Integration by parts", latex: "\\int f_1(x) f_2(x)\\,dx = f_1(x)\\int f_2(x)\\,dx - \\int\\left[\\frac{d}{dx}f_1(x)\\cdot\\int f_2(x)\\,dx\\right]dx" },
    { label: "Exponential times a function plus its derivative", latex: "\\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) + C" },
    {
      label: "Partial fraction forms",
      latex: "\\frac{A}{x - a} + \\frac{B}{x - b} \\qquad \\frac{A}{x - a} + \\frac{B}{(x - a)^2} + \\frac{C}{x - b} \\qquad \\frac{A}{x - a} + \\frac{Bx + C}{x^2 + bx + c}",
    },
    { label: "Second fundamental theorem", latex: "\\int_a^b f(x)\\,dx = \\Big[F(x)\\Big]_a^b = F(b) - F(a), \\quad F'(x) = f(x)" },
    { label: "P0, P1, P2", latex: "\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt \\qquad \\int_a^b f = -\\int_b^a f \\qquad \\int_a^b f = \\int_a^c f + \\int_c^b f" },
    { label: "P3 and P4", latex: "\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx \\qquad \\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx" },
    {
      label: "P5 and P6",
      latex: "\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx = \\begin{cases} 2\\int_0^a f(x)\\,dx, & f(2a - x) = f(x) \\\\ 0, & f(2a - x) = -f(x) \\end{cases}",
    },
    { label: "P7: even and odd functions", latex: "\\int_{-a}^{a} f(x)\\,dx = \\begin{cases} 2\\int_0^a f(x)\\,dx, & f(-x) = f(x) \\\\ 0, & f(-x) = -f(x) \\end{cases}" },
    { label: "Standard definite results", latex: "\\int_0^{\\pi/2} \\log\\sin x\\,dx = \\int_0^{\\pi/2} \\log\\cos x\\,dx = -\\frac{\\pi}{2}\\log 2 \\qquad \\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\,dx = \\frac{\\pi}{4}" },
  ],
  derivations: [
    {
      title: "Evaluate \\(\\int_0^{\\pi/4} \\log(1 + \\tan x)\\,dx\\)",
      steps: [
        "By P4, \\(\\tan\\left(\\frac{\\pi}{4} - x\\right) = \\frac{1 - \\tan x}{1 + \\tan x}\\), so \\(1 + \\tan\\left(\\frac{\\pi}{4} - x\\right) = \\frac{2}{1 + \\tan x}\\).",
        "\\(I = \\int_0^{\\pi/4} [\\log 2 - \\log(1 + \\tan x)]\\,dx = \\frac{\\pi}{4}\\log 2 - I\\).",
        "\\(2I = \\frac{\\pi}{4}\\log 2\\), so \\(I = \\frac{\\pi}{8}\\log 2\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_0^{\\pi/2} \\log\\sin x\\,dx\\)",
      steps: [
        "By P4, \\(I = \\int_0^{\\pi/2} \\log\\cos x\\,dx\\), so \\(2I = \\int_0^{\\pi/2} \\log(\\sin x\\cos x)\\,dx = \\int_0^{\\pi/2} \\log\\sin 2x\\,dx - \\frac{\\pi}{2}\\log 2\\).",
        "Put \\(2x = t\\): \\(\\int_0^{\\pi/2} \\log\\sin 2x\\,dx = \\frac{1}{2}\\int_0^{\\pi} \\log\\sin t\\,dt = \\int_0^{\\pi/2} \\log\\sin t\\,dt = I\\) (by P6).",
        "\\(2I = I - \\frac{\\pi}{2}\\log 2\\), so \\(I = -\\frac{\\pi}{2}\\log 2\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_0^{\\pi/2} \\frac{x}{\\sin x + \\cos x}\\,dx\\)",
      steps: [
        "By P4, \\(I = \\int_0^{\\pi/2} \\frac{\\frac{\\pi}{2} - x}{\\cos x + \\sin x}\\,dx\\); add: \\(2I = \\frac{\\pi}{2}\\int_0^{\\pi/2} \\frac{dx}{\\sin x + \\cos x}\\).",
        "\\(\\sin x + \\cos x = \\sqrt{2}\\sin(x + \\frac{\\pi}{4})\\): the integral is \\(\\frac{1}{\\sqrt{2}}\\Big[\\log\\left|\\operatorname{cosec}\\left(x + \\frac{\\pi}{4}\\right) - \\cot\\left(x + \\frac{\\pi}{4}\\right)\\right|\\Big]_0^{\\pi/2}\\).",
        "\\(= \\frac{1}{\\sqrt{2}}\\log\\frac{\\sqrt{2} + 1}{\\sqrt{2} - 1} = \\sqrt{2}\\log(\\sqrt{2} + 1)\\), so \\(I = \\frac{\\pi}{2\\sqrt{2}}\\log(\\sqrt{2} + 1)\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_0^{\\pi} \\frac{x}{1 + \\sin x}\\,dx\\)",
      steps: [
        "By P4 (\\(\\sin(\\pi - x) = \\sin x\\)): \\(I = \\int_0^{\\pi} \\frac{\\pi - x}{1 + \\sin x}\\,dx\\), so \\(2I = \\pi\\int_0^{\\pi} \\frac{dx}{1 + \\sin x}\\).",
        "\\(\\frac{1}{1 + \\sin x} = \\frac{1 - \\sin x}{\\cos^2 x} = \\sec^2 x - \\sec x\\tan x\\); its integral is \\(\\tan x - \\sec x\\).",
        "\\(\\big[\\tan x - \\sec x\\big]_0^{\\pi} = 1 - (-1) = 2\\), so \\(2I = 2\\pi\\) and \\(I = \\pi\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_0^{\\pi} \\frac{x\\,dx}{a^2\\cos^2 x + b^2\\sin^2 x}\\)",
      steps: [
        "By P4, \\(2I = \\pi\\int_0^{\\pi} \\frac{dx}{a^2\\cos^2 x + b^2\\sin^2 x} = 2\\pi\\int_0^{\\pi/2} \\frac{dx}{a^2\\cos^2 x + b^2\\sin^2 x}\\) (by P6).",
        "Divide by \\(\\cos^2 x\\), put \\(\\tan x = t\\): \\(\\int_0^{\\infty} \\frac{dt}{a^2 + b^2t^2} = \\frac{1}{ab}\\Big[\\tan^{-1}\\frac{bt}{a}\\Big]_0^{\\infty} = \\frac{\\pi}{2ab}\\).",
        "So \\(2I = \\frac{\\pi^2}{ab}\\) and \\(I = \\frac{\\pi^2}{2ab}\\). (Without the \\(x\\), the integral over \\([0, \\pi]\\) is \\(\\frac{\\pi}{ab}\\).)",
      ],
    },
    {
      title: "Evaluate \\(\\int_{\\pi/6}^{\\pi/3} \\frac{dx}{1 + \\sqrt{\\tan x}}\\) and \\(\\int_{-2}^{2} \\frac{x^2}{1 + 5^x}\\,dx\\)",
      steps: [
        "First: \\(I = \\int \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}}\\,dx\\). By P3 (\\(a + b = \\frac{\\pi}{2}\\)), \\(I = \\int \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\,dx\\).",
        "Add: \\(2I = \\int_{\\pi/6}^{\\pi/3} 1\\,dx = \\frac{\\pi}{6}\\), so \\(I = \\frac{\\pi}{12}\\).",
        "Second: by P3 (\\(x \\to -x\\)), \\(I = \\int_{-2}^{2} \\frac{x^2\\,5^x}{5^x + 1}\\,dx\\). Add: \\(2I = \\int_{-2}^{2} x^2\\,dx = \\frac{16}{3}\\), so \\(I = \\frac{8}{3}\\).",
      ],
    },
    {
      title: "Find \\(\\int \\frac{x^2}{(x^2 + 4)(x^2 + 9)}\\,dx\\)",
      steps: [
        "Put \\(x^2 = y\\) only to split: \\(\\frac{y}{(y + 4)(y + 9)} = \\frac{A}{y + 4} + \\frac{B}{y + 9}\\), giving \\(A = -\\frac{4}{5}\\), \\(B = \\frac{9}{5}\\).",
        "So the integrand is \\(-\\frac{4}{5}\\cdot\\frac{1}{x^2 + 4} + \\frac{9}{5}\\cdot\\frac{1}{x^2 + 9}\\).",
        "\\(I = -\\frac{2}{5}\\tan^{-1}\\frac{x}{2} + \\frac{3}{5}\\tan^{-1}\\frac{x}{3} + C\\).",
      ],
    },
    {
      title: "Find \\(\\int \\frac{x + 3}{x^2 + 4x + 5}\\,dx\\)",
      steps: [
        "Write \\(x + 3 = \\frac{1}{2}\\frac{d}{dx}(x^2 + 4x + 5) + 1 = \\frac{1}{2}(2x + 4) + 1\\).",
        "\\(I = \\frac{1}{2}\\int \\frac{2x + 4}{x^2 + 4x + 5}\\,dx + \\int \\frac{dx}{(x + 2)^2 + 1}\\).",
        "\\(I = \\frac{1}{2}\\log(x^2 + 4x + 5) + \\tan^{-1}(x + 2) + C\\) (no modulus needed: \\(x^2 + 4x + 5 > 0\\)).",
      ],
    },
    {
      title: "Find \\(\\int e^x\\left(\\frac{1 - \\sin x}{1 - \\cos x}\\right)dx\\)",
      steps: [
        "\\(\\frac{1 - \\sin x}{1 - \\cos x} = \\frac{1 - 2\\sin\\frac{x}{2}\\cos\\frac{x}{2}}{2\\sin^2\\frac{x}{2}} = \\frac{1}{2}\\operatorname{cosec}^2\\frac{x}{2} - \\cot\\frac{x}{2}\\).",
        "With \\(f(x) = -\\cot\\frac{x}{2}\\), \\(f'(x) = \\frac{1}{2}\\operatorname{cosec}^2\\frac{x}{2}\\): the integrand is \\(e^x[f(x) + f'(x)]\\).",
        "\\(I = -e^x\\cot\\frac{x}{2} + C\\).",
      ],
    },
    {
      title: "Find \\(\\int \\left(\\sqrt{\\tan x} + \\sqrt{\\cot x}\\right)dx\\)",
      steps: [
        "\\(\\sqrt{\\tan x} + \\sqrt{\\cot x} = \\frac{\\sin x + \\cos x}{\\sqrt{\\sin x\\cos x}} = \\sqrt{2}\\,\\frac{\\sin x + \\cos x}{\\sqrt{1 - (\\sin x - \\cos x)^2}}\\).",
        "Put \\(\\sin x - \\cos x = t\\), \\((\\cos x + \\sin x)\\,dx = dt\\): \\(I = \\sqrt{2}\\int \\frac{dt}{\\sqrt{1 - t^2}} = \\sqrt{2}\\sin^{-1}t + C\\).",
        "\\(I = \\sqrt{2}\\sin^{-1}(\\sin x - \\cos x) + C\\). (NCERT puts \\(\\tan x = t^2\\) and gets \\(\\sqrt{2}\\tan^{-1}\\frac{\\tan x - 1}{\\sqrt{2\\tan x}} + C\\).)",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Substitution and trigonometric identities: \\(\\sqrt{1 + \\sin 2x}\\), \\(\\frac{1}{1 + \\cos x}\\), \\(\\frac{\\cos 2x}{\\sin^2 x\\cos^2 x}\\), \\(e^{k\\log x}\\)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Definite integrals by properties: P4 with \\(x\\) in the numerator, \\(\\log(1 + \\tan x)\\), \\(\\frac{1}{1 + e^{\\sin x}}\\), even and odd functions", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Integration by parts, and \\(e^x[f(x) + f'(x)]\\): \\(x\\tan^{-1}x\\), \\(x^2\\log(x^2 + 1)\\), \\(\\sin 2x\\tan^{-1}(\\sin x)\\), \\(e^x\\frac{1 - \\sin x}{1 - \\cos x}\\)", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Partial fractions, often after putting \\(x^2 = y\\), \\(\\sin x = t\\) or \\(\\log x = t\\)", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Quadratic forms: \\(\\frac{1}{ax^2 + bx + c}\\), \\(\\frac{px + q}{\\sqrt{ax^2 + bx + c}}\\), \\(\\frac{e^x}{\\sqrt{5 - 4e^x - e^{2x}}}\\)", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Evaluate a simple definite integral, or find \\(a\\) or \\(k\\) from its value", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Definite integrals with modulus: \\(|x - 1| + |x - 2| + |x - 3|\\), \\(|x^3 - x|\\), \\(\\sin|x| + \\cos|x|\\)", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Find \\(F(x)\\) from \\(F'(x)\\) and one value such as \\(F(0)\\)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Dropping the modulus inside log",
      body: "\\(\\int \\frac{dx}{x} = \\log|x| + C\\). So \\(\\int_{-5}^{-1} \\frac{dx}{x} = \\log 1 - \\log 5 = -\\log 5\\), and \\(\\int_0^1 \\frac{dx}{3x - 4} = \\frac{1}{3}(\\log 1 - \\log 4) = -\\frac{1}{3}\\log 4\\).",
    },
    {
      title: "Taking a square root without its sign",
      body: "\\(\\sqrt{1 + \\sin 2x} = |\\sin x + \\cos x|\\) and \\(\\sqrt{1 + \\cos 2x} = \\sqrt{2}|\\cos x|\\). Check the sign on the interval before removing the modulus.",
    },
    {
      title: "Not splitting a modulus",
      body: "\\(\\int_{-1}^{2} |x^3 - x|\\,dx\\) needs the zeros \\(-1, 0, 1\\): split into \\([-1, 0]\\), \\([0, 1]\\), \\([1, 2]\\) and take the right sign on each.",
    },
    {
      title: "Keeping the old limits after a substitution",
      body: "In \\(\\int_0^{\\pi/2} \\cos x\\, e^{\\sin x}\\,dx\\) with \\(t = \\sin x\\), the limits become 0 and 1: the answer is \\(e - 1\\).",
    },
    {
      title: "Partial fractions on an improper fraction",
      body: "\\(\\frac{x^4}{(x - 1)(x^2 + 1)}\\) and \\(\\frac{x^2}{x^2 + 6x + 12}\\) are improper: divide first, then split the proper remainder.",
    },
    {
      title: "Writing \\(+ C\\) in the wrong place",
      body: "Every indefinite integral ends with \\(+ C\\). A definite integral has no \\(C\\); with a condition like \\(F(0) = \\log\\frac{1}{2}\\), find \\(C\\) and write the final \\(F(x)\\).",
    },
  ],
};

export default sheet;
