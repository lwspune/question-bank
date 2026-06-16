import type { SubtopicNote } from "@/app/notes/_types";

export const DERIVATIVE_WRT_NOTE: SubtopicNote = {
  subtopicName: "Derivative of One Function with Respect to Another",
  title: "Differentiating One Function With Respect to Another",
  oneLineDefinition:
    "To find how u changes with respect to v (not x), differentiate both with respect to x and divide: du/dv equals (du/dx) over (dv/dx).",
  whyItMatters:
    "This is a compact, formulaic technique that turns up almost every year as a quick scoring question — and it is pure mechanics once you see the trick. " +
    "5 PYQs sit directly here, 3 HARD and 2 MODERATE: most pair two composite functions and ask for their rate of change at a point, " +
    "and the harder ones supply f' and g' at specific values so you must apply the chain rule to numerator and denominator separately. " +
    "Master the single formula below and these become easy marks.",
  concepts: [
    // 1 — the core method
    {
      kind: "formula" as const,
      slug: "cetdiff-wrt-method",
      name: "Differentiating One Function With Respect to Another",
      intuition:
        "When a question asks for the rate of change of one function with respect to ANOTHER function (not with respect to x), you cannot differentiate directly. " +
        "The trick is to route both through x: differentiate the top function and the bottom function with respect to x, then divide. The shared dx cancels.",
      definition:
        "To differentiate \\(u = f(x)\\) with respect to \\(v = g(x)\\), differentiate each with respect to \\(x\\) and take the ratio:\n" +
        "- Compute \\(\\dfrac{du}{dx}\\) and \\(\\dfrac{dv}{dx}\\) separately.\n" +
        "- Then \\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx}\\), **provided** \\(\\dfrac{dv}{dx} \\neq 0\\).\n" +
        "If a specific point is given, substitute it only **after** forming the ratio.",
      formula: {
        label: "Derivative of u with respect to v",
        latex: "\\dfrac{du}{dv} = \\dfrac{\\dfrac{du}{dx}}{\\dfrac{dv}{dx}}, \\qquad \\dfrac{dv}{dx} \\neq 0",
        symbols: [
          { symbol: "u = f(x)", meaning: "the function being differentiated (the 'top')" },
          { symbol: "v = g(x)", meaning: "the function we differentiate with respect to (the 'bottom')" },
          { symbol: "dv/dx \\neq 0", meaning: "ratio is undefined where the bottom's derivative vanishes" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the derivative of \\(x^3\\) with respect to \\(x^2\\).",
        steps: [
          "Let \\(u = x^3\\) and \\(v = x^2\\). These are differentiated with respect to \\(x\\), not each other.",
          "Differentiate each with respect to \\(x\\): \\(\\dfrac{du}{dx} = 3x^2\\) and \\(\\dfrac{dv}{dx} = 2x\\).",
          "Form the ratio: \\(\\dfrac{du}{dv} = \\dfrac{3x^2}{2x} = \\dfrac{3x}{2}\\).",
        ],
        answer: "\\(\\dfrac{du}{dv} = \\dfrac{3x}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the derivative of \\(\\log x\\) with respect to \\(x^2\\).",
        steps: [
          "Let \\(u = \\log x\\), \\(v = x^2\\). Differentiate each with respect to \\(x\\).",
          "\\(\\dfrac{du}{dx} = \\dfrac{1}{x}\\), \\(\\dfrac{dv}{dx} = 2x\\).",
          "Divide: \\(\\dfrac{du}{dv} = \\dfrac{1/x}{2x} = \\dfrac{1}{2x^2}\\).",
        ],
        answer: "\\(\\dfrac{du}{dv} = \\dfrac{1}{2x^2}\\)",
      },
      practiceSet: [
        { prompt: "Derivative of \\(x^4\\) with respect to \\(x^2\\).", answer: "\\(2x^2\\)", method: "\\(\\dfrac{4x^3}{2x}\\)" },
        { prompt: "Derivative of \\(\\sin x\\) with respect to \\(\\cos x\\).", answer: "\\(-\\cot x\\)", method: "\\(\\dfrac{\\cos x}{-\\sin x}\\)" },
        { prompt: "Derivative of \\(e^{2x}\\) with respect to \\(e^x\\).", answer: "\\(2e^x\\)", method: "\\(\\dfrac{2e^{2x}}{e^x}\\)" },
        { prompt: "Derivative of \\(x^2\\) with respect to \\(\\dfrac{1}{x}\\).", answer: "\\(-2x^3\\)", method: "\\(\\dfrac{2x}{-1/x^2}\\)" },
      ],
      pyqExampleId: "ebdba9bd-ad08-4230-886e-34bf104f0af6",
      traps: [
        {
          title: "Do NOT differentiate one function directly by the other",
          body:
            "\\(\\dfrac{du}{dv}\\) is not 'differentiate \\(u\\) and substitute \\(v\\)'. You must form both \\(\\dfrac{du}{dx}\\) and \\(\\dfrac{dv}{dx}\\) and divide. There is no shortcut that skips \\(x\\).",
        },
        {
          title: "Substitute the point only after dividing",
          body:
            "If a value like \\(x = 5\\) is given, keep \\(x\\) symbolic while you form \\(\\dfrac{du/dx}{dv/dx}\\), then substitute. Plugging the point into \\(\\dfrac{du}{dx}\\) and \\(\\dfrac{dv}{dx}\\) before simplifying invites arithmetic slips.",
        },
        {
          title: "The bottom's derivative must be non-zero",
          body:
            "\\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx}\\) is only valid where \\(\\dfrac{dv}{dx} \\neq 0\\). If \\(v = g(x)\\) has a stationary point at the value asked, the rate of change with respect to \\(v\\) is undefined there.",
        },
      ],
    },

    // 2 — composite functions with given derivatives
    {
      kind: "formula" as const,
      slug: "cetdiff-wrt-composite-given-derivatives",
      name: "Composite Functions Using Given Derivatives f' and g'",
      intuition:
        "A harder version pairs two composite functions like \\(f(\\sec x)\\) and \\(g(\\tan x)\\), and hands you the values of \\(f'\\) and \\(g'\\) at specific points. " +
        "Same ratio idea — but now differentiating the top and bottom needs the chain rule, and the inner derivative and the supplied \\(f'\\)/\\(g'\\) value both ride along.",
      definition:
        "To differentiate \\(f(p(x))\\) with respect to \\(g(q(x))\\):\n" +
        "- Chain-rule the top: \\(\\dfrac{d}{dx}f(p(x)) = f'(p(x)) \\cdot p'(x)\\).\n" +
        "- Chain-rule the bottom: \\(\\dfrac{d}{dx}g(q(x)) = g'(q(x)) \\cdot q'(x)\\).\n" +
        "- Take the ratio: \\(\\dfrac{f'(p(x))\\,p'(x)}{g'(q(x))\\,q'(x)}\\), then substitute the given point and the supplied values of \\(f'\\) and \\(g'\\).",
      formula: {
        label: "Composite-over-composite ratio",
        latex:
          "\\dfrac{d\\,[f(p(x))]}{d\\,[g(q(x))]} = \\dfrac{f'(p(x))\\,p'(x)}{g'(q(x))\\,q'(x)}",
        symbols: [
          { symbol: "f'(p(x))", meaning: "outer derivative of the top, read from the given f' value" },
          { symbol: "p'(x)", meaning: "inner derivative of the top function" },
          { symbol: "g'(q(x))", meaning: "outer derivative of the bottom, read from the given g' value" },
          { symbol: "q'(x)", meaning: "inner derivative of the bottom function" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the derivative of \\(f(\\sin x)\\) with respect to \\(g(\\cos x)\\) at \\(x = \\dfrac{\\pi}{3}\\), given \\(f'\\!\\left(\\dfrac{\\sqrt{3}}{2}\\right) = 4\\) and \\(g'\\!\\left(\\dfrac{1}{2}\\right) = 2\\).",
        steps: [
          "Chain-rule the top: \\(\\dfrac{d}{dx}f(\\sin x) = f'(\\sin x)\\cdot\\cos x\\).",
          "Chain-rule the bottom: \\(\\dfrac{d}{dx}g(\\cos x) = g'(\\cos x)\\cdot(-\\sin x)\\).",
          "Form the ratio: \\(\\dfrac{f'(\\sin x)\\,\\cos x}{g'(\\cos x)\\,(-\\sin x)}\\).",
          "At \\(x = \\dfrac{\\pi}{3}\\): \\(\\sin x = \\dfrac{\\sqrt{3}}{2}\\), \\(\\cos x = \\dfrac{1}{2}\\). Substitute the given values: \\(\\dfrac{4 \\cdot \\frac{1}{2}}{2 \\cdot \\left(-\\frac{\\sqrt{3}}{2}\\right)} = \\dfrac{2}{-\\sqrt{3}}\\).",
        ],
        answer: "\\(-\\dfrac{2}{\\sqrt{3}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the derivative of \\(f(x^2)\\) with respect to \\(g(x^3)\\) at \\(x = 1\\), given \\(f'(1) = 6\\) and \\(g'(1) = 2\\).",
        steps: [
          "Top: \\(\\dfrac{d}{dx}f(x^2) = f'(x^2)\\cdot 2x\\).",
          "Bottom: \\(\\dfrac{d}{dx}g(x^3) = g'(x^3)\\cdot 3x^2\\).",
          "Ratio: \\(\\dfrac{f'(x^2)\\,2x}{g'(x^3)\\,3x^2}\\). At \\(x = 1\\): \\(x^2 = 1\\), \\(x^3 = 1\\), so \\(\\dfrac{6 \\cdot 2}{2 \\cdot 3} = \\dfrac{12}{6} = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        {
          prompt:
            "Derivative of \\(f(x^2)\\) w.r.t. \\(g(x)\\) at \\(x = 2\\), given \\(f'(4) = 3\\), \\(g'(2) = 1\\).",
          answer: "\\(12\\)",
          method: "\\(\\dfrac{f'(x^2)\\,2x}{g'(x)} = \\dfrac{3\\cdot 4}{1}\\)",
        },
        {
          prompt:
            "Derivative of \\(f(\\log x)\\) w.r.t. \\(g(x)\\) at \\(x = 1\\), given \\(f'(0) = 5\\), \\(g'(1) = 1\\).",
          answer: "\\(5\\)",
          method: "top \\(= f'(\\log x)\\cdot\\frac1x\\); at \\(x=1\\), \\(\\dfrac{5\\cdot 1}{1}\\)",
        },
        {
          prompt:
            "Derivative of \\(f(\\sin x)\\) w.r.t. \\(g(\\sin x)\\) at any \\(x\\), given \\(f'(t) = 3\\), \\(g'(t) = 2\\) for all \\(t\\).",
          answer: "\\(\\dfrac{3}{2}\\)",
          method: "the common \\(\\cos x\\) inner derivative cancels",
        },
        {
          prompt:
            "Derivative of \\(f(e^x)\\) w.r.t. \\(g(x)\\) at \\(x = 0\\), given \\(f'(1) = 7\\), \\(g'(0) = 7\\).",
          answer: "\\(1\\)",
          method: "top \\(= f'(e^x)e^x\\); at \\(x=0\\), \\(\\dfrac{7\\cdot 1}{7}\\)",
        },
      ],
      pyqExampleId: "6cdfd2e8-0035-4961-8e70-76131eef6935",
      traps: [
        {
          title: "Each inner derivative must be carried through",
          body:
            "When the top is \\(f(\\sec x)\\), its derivative is \\(f'(\\sec x)\\cdot\\sec x\\tan x\\) — the inner \\(\\sec x\\tan x\\) is part of it. Forgetting the inner derivative is the most common slip and silently drops a factor.",
        },
        {
          title: "Match each supplied value to the right inner argument",
          body:
            "A given \\(f'(\\sqrt{2})\\) is meant for where the inner function equals \\(\\sqrt{2}\\) (e.g. \\(\\sec\\frac{\\pi}{4} = \\sqrt{2}\\)) — not for \\(x = \\sqrt{2}\\). Evaluate the inner function at the given \\(x\\) first, then read off the matching \\(f'\\) value.",
        },
        {
          title: "Keep the negative sign on falling inner functions",
          body:
            "If the bottom is \\(g(\\cos x)\\), its inner derivative is \\(-\\sin x\\); the minus sign stays in the denominator and sets the sign of the final answer. Drop it and you get the right magnitude with the wrong sign.",
        },
      ],
    },
  ],
};
