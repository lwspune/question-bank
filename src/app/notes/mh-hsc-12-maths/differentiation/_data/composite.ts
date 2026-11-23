import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_COMPOSITE_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Composite Functions (Chain Rule)",
  title: "Derivatives of Composite Functions: the Chain Rule",
  oneLineDefinition:
    "A composite function is a function of another function, such as sin(x² + 5); its derivative is the derivative of the outer function times the derivative of the inner one.",
  whyItMatters:
    "88 questions, nine of them from board papers: the proof of the chain rule (2016, 2024 and 2026), short derivatives such as sin(x² + x) and log(sec x + tan x) (2020), tan²(log x³) (2018) and sin(log x) (2025), and MCQs on given values of f, g and their derivatives (2025) and on sec(tan⁻¹ x) (2026). The textbook rows are Exercise 1.1, the solved examples of section 1.1 and the first questions of Miscellaneous Exercise 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-chainproof",
      name: "Proof of the chain rule",
      intuition:
        "When y depends on u and u depends on x, a small change in x changes u, and that change in u changes y. So the rate of y per unit x is the rate of y per unit u times the rate of u per unit x. The board asks this proof as a long question, so learn its steps in order, with the reason for each limit.",
      definition:
        "- **Theorem:** if \\(y = f(u)\\) is a differentiable function of \\(u\\) and \\(u = g(x)\\) is a differentiable function of \\(x\\), then \\(y\\) is a differentiable function of \\(x\\) and \\(\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}\\).\n" +
        "- **Proof:** assume \\(u\\) is not a constant function. Let \\(\\delta x\\) be a small increment in \\(x\\), and \\(\\delta u\\), \\(\\delta y\\) the corresponding increments in \\(u\\) and \\(y\\), with \\(\\delta x \\neq 0\\) and \\(\\delta u \\neq 0\\).\n" +
        "- Write \\(\\dfrac{\\delta y}{\\delta x} = \\dfrac{\\delta y}{\\delta u} \\cdot \\dfrac{\\delta u}{\\delta x}\\) and take the limit as \\(\\delta x \\to 0\\) on both sides.\n" +
        "- As \\(\\delta x \\to 0\\), \\(\\delta u \\to 0\\), because \\(u\\) is a continuous function of \\(x\\). So \\(\\displaystyle\\lim_{\\delta x \\to 0}\\dfrac{\\delta y}{\\delta x} = \\lim_{\\delta u \\to 0}\\dfrac{\\delta y}{\\delta u} \\cdot \\lim_{\\delta x \\to 0}\\dfrac{\\delta u}{\\delta x}\\) ... (I)\n" +
        "- Since \\(y\\) is differentiable in \\(u\\) and \\(u\\) is differentiable in \\(x\\): \\(\\displaystyle\\lim_{\\delta u \\to 0}\\dfrac{\\delta y}{\\delta u} = \\dfrac{dy}{du}\\) and \\(\\displaystyle\\lim_{\\delta x \\to 0}\\dfrac{\\delta u}{\\delta x} = \\dfrac{du}{dx}\\) ... (II)\n" +
        "- From (I) and (II), \\(\\displaystyle\\lim_{\\delta x \\to 0}\\dfrac{\\delta y}{\\delta x} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}\\) ... (III)\n" +
        "- The right side of (III) exists and is finite, so the left side exists and is finite: \\(y\\) is a differentiable function of \\(x\\) and \\(\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}\\).",
      formula: {
        label: "Chain rule",
        latex: "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
      },
      authoredExample: {
        prompt: "Using the chain rule, find \\(\\dfrac{dy}{dx}\\) if \\(y = \\sqrt{x^3 + 1}\\).",
        steps: [
          "Let \\(u = x^3 + 1\\), so \\(y = u^{\\frac{1}{2}}\\).",
          "\\(\\dfrac{dy}{du} = \\dfrac{1}{2}u^{-\\frac{1}{2}} = \\dfrac{1}{2\\sqrt{u}}\\) and \\(\\dfrac{du}{dx} = 3x^2\\).",
          "By the chain rule, \\(\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx} = \\dfrac{1}{2\\sqrt{u}} \\cdot 3x^2\\).",
          "Put back \\(u = x^3 + 1\\): \\(\\dfrac{dy}{dx} = \\dfrac{3x^2}{2\\sqrt{x^3 + 1}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{3x^2}{2\\sqrt{x^3 + 1}}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = u^5\\) and \\(u = 2x + 1\\), find \\(\\dfrac{dy}{dx}\\) by the chain rule.",
        steps: ["\\(\\dfrac{dy}{du} = 5u^4\\), \\(\\dfrac{du}{dx} = 2\\), so \\(\\dfrac{dy}{dx} = 10u^4\\)."],
        answer: "\\(\\dfrac{dy}{dx} = 10(2x + 1)^4\\)",
      },
      practiceSet: [
        {
          prompt: "Extend the chain rule to \\(y = f(v)\\), \\(v = g(u)\\), \\(u = h(x)\\).",
          answer: "\\(\\dfrac{dy}{dx} = \\dfrac{dy}{dv} \\cdot \\dfrac{dv}{du} \\cdot \\dfrac{du}{dx}\\)",
        },
        {
          prompt: "In the proof of the chain rule, why does \\(\\delta u \\to 0\\) as \\(\\delta x \\to 0\\)?",
          answer: "Because \\(u = g(x)\\) is differentiable, hence continuous, in \\(x\\)",
        },
      ],
      pyqExampleId: "ba6c6f16-0ed0-4ae3-85fc-84fc06eb83ba",
      traps: [
        {
          title: "Skipping the reason for the limit step",
          body: "The line '\\(\\delta u \\to 0\\) as \\(\\delta x \\to 0\\)' needs its reason: \\(u\\) is a continuous function of \\(x\\). Without it the step is not justified and a mark goes.",
        },
        {
          title: "Stopping after the proof when the question says 'hence'",
          body: "When the proof is followed by 'Hence find ...', that part carries its own marks. Name \\(u\\), find \\(\\dfrac{dy}{du}\\) and \\(\\dfrac{du}{dx}\\), and multiply, so the examiner sees the rule you just proved being used.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-chain",
      name: "Differentiating composite functions",
      intuition:
        "Peel the function like an onion. Differentiate the outermost function and keep what is inside it unchanged, then multiply by the derivative of the inside, and carry on until you reach x itself. Each layer gives one factor of the answer.",
      definition:
        "- \\(\\dfrac{d}{dx}[f(x)]^n = n[f(x)]^{n-1} f'(x)\\) and \\(\\dfrac{d}{dx}\\sqrt{f(x)} = \\dfrac{f'(x)}{2\\sqrt{f(x)}}\\).\n" +
        "- \\(\\dfrac{d}{dx}\\sin f(x) = \\cos f(x) \\cdot f'(x)\\) and \\(\\dfrac{d}{dx}\\cos f(x) = -\\sin f(x) \\cdot f'(x)\\).\n" +
        "- \\(\\dfrac{d}{dx}\\tan f(x) = \\sec^2 f(x) \\cdot f'(x)\\) and \\(\\dfrac{d}{dx}\\cot f(x) = -\\operatorname{cosec}^2 f(x) \\cdot f'(x)\\).\n" +
        "- \\(\\dfrac{d}{dx}e^{f(x)} = e^{f(x)} f'(x)\\) and \\(\\dfrac{d}{dx}a^{f(x)} = a^{f(x)} \\log a \\cdot f'(x)\\).\n" +
        "- \\(\\dfrac{d}{dx}\\log f(x) = \\dfrac{f'(x)}{f(x)}\\).\n" +
        "- A product or quotient of composite functions needs the product or quotient rule, with the chain rule inside each part.",
      formula: {
        label: "Derivative of a function of a function",
        latex: "\\frac{d}{dx} f[g(x)] = f'[g(x)] \\cdot g'(x)",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\cos^3(2x + 1)\\) with respect to \\(x\\).",
        steps: [
          "Let \\(y = u^3\\), \\(u = \\cos v\\) and \\(v = 2x + 1\\).",
          "\\(\\dfrac{dy}{du} = 3u^2\\), \\(\\dfrac{du}{dv} = -\\sin v\\), \\(\\dfrac{dv}{dx} = 2\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dv} \\cdot \\dfrac{dv}{dx} = 3\\cos^2(2x + 1) \\cdot [-\\sin(2x + 1)] \\cdot 2\\).",
          "\\(\\dfrac{dy}{dx} = -6\\cos^2(2x + 1)\\sin(2x + 1)\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -6\\cos^2(2x + 1)\\sin(2x + 1)\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\sqrt{1 + \\sin^2 x}\\) with respect to \\(x\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{1}{2\\sqrt{1 + \\sin^2 x}} \\cdot 2\\sin x \\cos x\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{\\sin x \\cos x}{\\sqrt{1 + \\sin^2 x}}\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(\\sin(x^3)\\) with respect to \\(x\\).", answer: "\\(3x^2\\cos(x^3)\\)" },
        { prompt: "Differentiate \\(e^{x^2 + 1}\\) with respect to \\(x\\).", answer: "\\(2x\\,e^{x^2 + 1}\\)" },
        { prompt: "Differentiate \\(\\log(\\sin x)\\) with respect to \\(x\\).", answer: "\\(\\cot x\\)" },
      ],
      pyqExampleId: "6dc06151-d01d-49e3-a0c2-983864359d58",
      traps: [
        {
          title: "Stopping one layer early",
          body: "In \\(\\sin^2(3x)\\) the answer needs all three factors: \\(2\\sin 3x\\), then \\(\\cos 3x\\), then \\(3\\). It equals \\(3\\sin 6x\\). Leaving out the innermost factor is the most common slip.",
        },
        {
          title: "Degrees inside a trigonometric function",
          body: "The formula \\(\\dfrac{d}{dx}\\sin x = \\cos x\\) holds only for \\(x\\) in radians. For \\(\\sin x^\\circ\\), write \\(x^\\circ = \\dfrac{\\pi x}{180}\\) radians, so \\(\\dfrac{d}{dx}\\sin x^\\circ = \\dfrac{\\pi}{180}\\cos x^\\circ\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-simplify",
      name: "Simplify with log laws and identities first",
      intuition:
        "Many questions look long but shrink before you differentiate. A log of a product breaks into a sum, a power comes down in front, a to the power log of x to base a is just x, and a half-angle ratio under a root becomes a tangent. Fewer layers means fewer chain-rule factors and fewer slips.",
      definition:
        "- \\(\\log(mn) = \\log m + \\log n\\), \\(\\log\\dfrac{m}{n} = \\log m - \\log n\\), \\(\\log m^n = n\\log m\\).\n" +
        "- \\(a^{\\log_a x} = x\\) and \\(\\log_a x = \\dfrac{\\log x}{\\log a}\\).\n" +
        "- \\(1 - \\cos 2\\theta = 2\\sin^2\\theta\\) and \\(1 + \\cos 2\\theta = 2\\cos^2\\theta\\), so \\(\\sqrt{\\dfrac{1 - \\cos 2\\theta}{1 + \\cos 2\\theta}} = \\tan\\theta\\) when \\(\\tan\\theta > 0\\).\n" +
        "- \\(\\log x\\) is to base \\(e\\), so \\(\\dfrac{d}{dx}\\log x = \\dfrac{1}{x}\\). The logarithm of a number, such as \\(\\log 3\\), is a constant.",
      formula: {
        label: "Log laws used before differentiating",
        latex: "\\log\\frac{m^p\\, n^q}{r^s} = p\\log m + q\\log n - s\\log r",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\log\\left[\\dfrac{(x^2 + 1)^3}{\\sqrt{2x - 1}}\\right]\\) with respect to \\(x\\).",
        steps: [
          "Simplify by the log laws: \\(y = 3\\log(x^2 + 1) - \\dfrac{1}{2}\\log(2x - 1)\\).",
          "Differentiate each term: \\(\\dfrac{dy}{dx} = 3 \\cdot \\dfrac{2x}{x^2 + 1} - \\dfrac{1}{2} \\cdot \\dfrac{2}{2x - 1}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{6x}{x^2 + 1} - \\dfrac{1}{2x - 1}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{6x}{x^2 + 1} - \\dfrac{1}{2x - 1}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = 8^{\\log_2 x}\\) with respect to \\(x\\).",
        steps: ["\\(8^{\\log_2 x} = (2^3)^{\\log_2 x} = (2^{\\log_2 x})^3 = x^3\\), so \\(\\dfrac{dy}{dx} = 3x^2\\)."],
        answer: "\\(\\dfrac{dy}{dx} = 3x^2\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(\\log\\sqrt{\\dfrac{1 - \\cos 2x}{1 + \\cos 2x}}\\) for \\(0 < x < \\dfrac{\\pi}{2}\\).",
          answer: "The function is \\(\\log(\\tan x)\\), so the derivative is \\(\\dfrac{\\sec^2 x}{\\tan x} = 2\\operatorname{cosec} 2x\\)",
        },
        { prompt: "Differentiate \\(\\log(x^4 e^{2x})\\) with respect to \\(x\\).", answer: "\\(\\dfrac{4}{x} + 2\\)" },
        { prompt: "Differentiate \\(\\log_{10} x\\) with respect to \\(x\\).", answer: "\\(\\dfrac{1}{x\\log 10}\\)" },
      ],
      pyqExampleId: "e611d542-791c-4cab-9767-9becb9b26cc1",
      traps: [
        {
          title: "Differentiating the log of a big product directly",
          body: "Applying the chain rule to the whole bracket puts a quotient rule inside a logarithm. Break the log into a sum first; each term then needs one short step.",
        },
        {
          title: "Treating the logarithm of a number as a variable",
          body: "\\(\\log 3\\) and \\(\\log 5\\) are constants. Their derivative is 0, and a factor such as \\(\\dfrac{1}{\\log 3}\\) stays outside unchanged.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-values",
      name: "Derivatives from given values of f, g and their derivatives",
      intuition:
        "Sometimes you are not given the formulas for f and g, only a few of their values and the values of their derivatives. The chain rule still works: find the value of the inner function first, then read the outer derivative at that value.",
      definition:
        "- \\(\\dfrac{d}{dx}f[g(x)] = f'[g(x)] \\cdot g'(x)\\), so at \\(x = a\\) it is \\(f'[g(a)] \\cdot g'(a)\\).\n" +
        "- Order of work: find \\(g(a)\\) from the data, then read \\(f'\\) at that value, not at \\(a\\).\n" +
        "- \\(\\dfrac{d}{dx}\\sqrt{h(x)} = \\dfrac{h'(x)}{2\\sqrt{h(x)}}\\), useful when the expression is a root of a combination of \\(f\\) and \\(g\\).\n" +
        "- \\(\\dfrac{d}{dx}[f(x)]^2 = 2f(x)f'(x)\\).",
      formula: {
        label: "Chain rule at a point",
        latex: "\\left[\\frac{d}{dx} f(g(x))\\right]_{x = a} = f'(g(a)) \\cdot g'(a)",
      },
      authoredExample: {
        prompt: "Given \\(g(2) = 5\\), \\(g'(2) = 3\\) and \\(f'(5) = -2\\), find the derivative of \\(f[g(x)]\\) at \\(x = 2\\).",
        steps: [
          "Let \\(r(x) = f[g(x)]\\). By the chain rule, \\(r'(x) = f'[g(x)] \\cdot g'(x)\\).",
          "\\(r'(2) = f'[g(2)] \\cdot g'(2) = f'(5) \\cdot g'(2)\\).",
          "\\(r'(2) = (-2)(3) = -6\\).",
        ],
        answer: "\\(r'(2) = -6\\)",
      },
      selfCheckExample: {
        prompt: "If \\(h(x) = \\sqrt{f(x)}\\), \\(f(3) = 16\\) and \\(f'(3) = 4\\), find \\(h'(3)\\).",
        steps: ["\\(h'(3) = \\dfrac{f'(3)}{2\\sqrt{f(3)}} = \\dfrac{4}{2 \\times 4}\\)."],
        answer: "\\(h'(3) = \\dfrac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "If \\(F(x) = [f(x)]^3\\), \\(f(1) = 2\\) and \\(f'(1) = 5\\), find \\(F'(1)\\).", answer: "\\(3(2)^2(5) = 60\\)" },
        { prompt: "If \\(y = f(x^2)\\) and \\(f'(4) = 3\\), find \\(\\dfrac{dy}{dx}\\) at \\(x = 2\\).", answer: "\\(f'(4) \\cdot 2(2) = 12\\)" },
      ],
      pyqExampleId: "24e2fcaf-db86-4d60-8479-211a16ef0e4e",
      traps: [
        {
          title: "Reading the outer derivative at the wrong point",
          body: "For \\(f[g(x)]\\) at \\(x = a\\), use \\(f'\\) at \\(g(a)\\), not \\(f'(a)\\). Write \\(g(a)\\) on its own line before you look up \\(f'\\).",
        },
        {
          title: "Dropping the sign of a given derivative",
          body: "When a given derivative is negative, keep its sign through every product. A lost minus sign usually lands on one of the printed wrong options.",
        },
      ],
    },
  ],
};
