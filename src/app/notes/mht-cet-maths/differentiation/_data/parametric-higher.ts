import type { SubtopicNote } from "@/app/notes/_types";

export const PARAMETRIC_HIGHER_NOTE: SubtopicNote = {
  subtopicName: "Parametric, Higher-Order Derivatives & Relations",
  title: "Parametric Differentiation, Second Derivatives & Proving Relations",
  oneLineDefinition:
    "When x and y are each given through a parameter t (or theta), differentiate each with respect to the parameter and divide; for the second derivative, differentiate dy/dx again with respect to the parameter and divide once more.",
  whyItMatters:
    "This subtopic carries 10 PYQs — 5 HARD, 3 MODERATE, 2 EASY — and is the part of Differentiation MHT-CET likes most. " +
    "Three shapes recur: parametric forms (x and y through a parameter), second derivatives of those forms, and 'prove this relation' problems where you must show y satisfies an equation like y'' + n squared times y = 0. " +
    "The single most-punished mistake is computing the parametric second derivative as a ratio of second derivatives — it is not — so that trap is drilled hard below.",
  concepts: [
    // 1 — parametric first derivative (anchored)
    {
      kind: "formula" as const,
      slug: "cetdiff-parametric-first-derivative",
      name: "Parametric Differentiation",
      intuition:
        "When you cannot (or do not want to) eliminate the parameter to write y as a function of x, differentiate x and y separately with respect to the parameter, then divide. The parameter cancels in spirit, leaving the genuine slope dy/dx.",
      definition:
        "If \\(x = x(t)\\) and \\(y = y(t)\\) are both differentiable and \\(\\dfrac{dx}{dt} \\neq 0\\), then " +
        "\\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\). " +
        "The result is usually still a function of the parameter \\(t\\) (or \\(\\theta\\)) — that is fine; you evaluate it at the required parameter value.\n" +
        "- **Step 1:** differentiate \\(y\\) with respect to the parameter.\n" +
        "- **Step 2:** differentiate \\(x\\) with respect to the parameter.\n" +
        "- **Step 3:** divide \\(dy/dt\\) by \\(dx/dt\\).",
      formula: {
        label: "Parametric first derivative",
        latex: "\\dfrac{dy}{dx} = \\dfrac{\\,dy/dt\\,}{\\,dx/dt\\,}, \\qquad \\dfrac{dx}{dt} \\neq 0",
        symbols: [
          { symbol: "t", meaning: "the parameter (often \\(\\theta\\)) linking \\(x\\) and \\(y\\)" },
          { symbol: "dx/dt \\neq 0", meaning: "needed so the slope is defined" },
        ],
      },
      authoredExample: {
        prompt:
          "For the parabola in parametric form \\(x = at^2,\\ y = 2at\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Differentiate with respect to \\(t\\): \\(\\dfrac{dx}{dt} = 2at\\) and \\(\\dfrac{dy}{dt} = 2a\\).",
          "Divide: \\(\\dfrac{dy}{dx} = \\dfrac{2a}{2at} = \\dfrac{1}{t}\\).",
          "The slope is a clean function of the parameter — no need to eliminate \\(t\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{1}{t}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(x = a\\cos\\theta,\\ y = b\\sin\\theta\\), find \\(\\dfrac{dy}{dx}\\) at \\(\\theta = \\dfrac{\\pi}{4}\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = -a\\sin\\theta\\), \\(\\dfrac{dy}{d\\theta} = b\\cos\\theta\\).",
          "Divide: \\(\\dfrac{dy}{dx} = \\dfrac{b\\cos\\theta}{-a\\sin\\theta} = -\\dfrac{b}{a}\\cot\\theta\\).",
          "At \\(\\theta = \\dfrac{\\pi}{4}\\), \\(\\cot\\theta = 1\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{b}{a}\\).",
        ],
        answer: "\\(-\\dfrac{b}{a}\\)",
      },
      practiceSet: [
        { prompt: "\\(x = t^3,\\ y = t^2\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(\\dfrac{2}{3t}\\)", method: "\\((2t)/(3t^2)\\)" },
        { prompt: "\\(x = 2t,\\ y = t^2 + 1\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(t\\)", method: "\\((2t)/2\\)" },
        { prompt: "\\(x = \\sin\\theta,\\ y = \\cos\\theta\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-\\cot\\theta\\)", method: "\\((-\\sin\\theta)/(\\cos\\theta)\\)" },
        { prompt: "\\(x = e^{t},\\ y = e^{-t}\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-e^{-2t}\\)", method: "\\((-e^{-t})/(e^{t})\\)" },
      ],
      pyqExampleId: "23749e1a-acae-4f74-8345-46304bd7094e",
      traps: [
        {
          title: "Do not flip the ratio",
          body:
            "The slope is \\(\\dfrac{dy/dt}{dx/dt}\\) — the parameter-derivative of \\(y\\) on top, of \\(x\\) on the bottom. Writing \\(\\dfrac{dx/dt}{dy/dt}\\) gives the reciprocal slope and a wrong answer.",
        },
        {
          title: "The slope can stay in terms of the parameter",
          body:
            "There is no rule that says \\(\\dfrac{dy}{dx}\\) must be a function of \\(x\\). Leaving it as \\(\\dfrac{1}{t}\\) or \\(-\\dfrac{b}{a}\\cot\\theta\\) is the final form; only substitute a parameter value when the question asks for the slope at a point.",
        },
      ],
    },

    // 2 — parametric second derivative (anchored) — THE big trap
    {
      kind: "formula" as const,
      slug: "cetdiff-parametric-second-derivative",
      name: "Second Derivative of a Parametric Function",
      intuition:
        "The second derivative is NOT the ratio of the two second derivatives. You already have dy/dx as a function of the parameter; differentiate THAT with respect to the parameter, then divide by dx/dt one more time — exactly the same divide-by-dx/dt move as before.",
      definition:
        "Given \\(x = x(t),\\ y = y(t)\\), first find \\(\\dfrac{dy}{dx}\\) (a function of \\(t\\)). Then " +
        "\\(\\dfrac{d^2y}{dx^2} = \\dfrac{\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}\\). " +
        "**The key point:** apply the chain rule — \\(\\dfrac{d}{dx} = \\dfrac{1}{dx/dt}\\cdot\\dfrac{d}{dt}\\) — to the quantity \\(\\dfrac{dy}{dx}\\), not to \\(y\\). " +
        "It is emphatically **not** \\(\\dfrac{d^2y/dt^2}{d^2x/dt^2}\\).",
      formula: {
        label: "Parametric second derivative",
        latex: "\\dfrac{d^2y}{dx^2} = \\dfrac{\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}",
        symbols: [
          { symbol: "d/dt(dy/dx)", meaning: "differentiate the first slope (a function of \\(t\\)) again w.r.t. \\(t\\)" },
          { symbol: "dx/dt", meaning: "divide by it once more — the chain-rule leftover" },
        ],
      },
      authoredExample: {
        prompt:
          "For the parabola \\(x = at^2,\\ y = 2at\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
        steps: [
          "First slope (from the previous concept): \\(\\dfrac{dy}{dx} = \\dfrac{1}{t}\\).",
          "Differentiate this with respect to \\(t\\): \\(\\dfrac{d}{dt}\\!\\left(\\dfrac{1}{t}\\right) = -\\dfrac{1}{t^2}\\).",
          "Divide by \\(\\dfrac{dx}{dt} = 2at\\): \\(\\dfrac{d^2y}{dx^2} = \\dfrac{-1/t^2}{2at} = -\\dfrac{1}{2at^3}\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{1}{2at^3}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(x = t^2,\\ y = t^3\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
        steps: [
          "First slope: \\(\\dfrac{dy}{dx} = \\dfrac{3t^2}{2t} = \\dfrac{3t}{2}\\).",
          "Differentiate w.r.t. \\(t\\): \\(\\dfrac{d}{dt}\\!\\left(\\dfrac{3t}{2}\\right) = \\dfrac{3}{2}\\).",
          "Divide by \\(\\dfrac{dx}{dt} = 2t\\): \\(\\dfrac{d^2y}{dx^2} = \\dfrac{3/2}{2t} = \\dfrac{3}{4t}\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} = \\dfrac{3}{4t}\\)",
      },
      practiceSet: [
        { prompt: "\\(x = t,\\ y = t^2\\). Find \\(\\dfrac{d^2y}{dx^2}\\).", answer: "\\(2\\)", method: "\\(dy/dx = 2t\\), then \\((2)/(1)\\)" },
        { prompt: "\\(x = 2t,\\ y = t^2\\). Find \\(\\dfrac{d^2y}{dx^2}\\).", answer: "\\(\\dfrac{1}{2}\\)", method: "\\(dy/dx = t\\), then \\((1)/(2)\\)" },
        { prompt: "True or false: \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d^2y/dt^2}{d^2x/dt^2}\\).", answer: "False", method: "must divide \\(\\frac{d}{dt}(dy/dx)\\) by \\(dx/dt\\)" },
        { prompt: "\\(x = \\theta,\\ y = \\sin\\theta\\). Find \\(\\dfrac{d^2y}{dx^2}\\).", answer: "\\(-\\sin\\theta\\)", method: "\\(dy/dx = \\cos\\theta\\), then \\((-\\sin\\theta)/1\\)" },
      ],
      pyqExampleId: "ac61ccba-729d-45fc-a3db-9103db7417bb",
      traps: [
        {
          title: "NEVER divide the two second derivatives",
          body:
            "\\(\\dfrac{d^2y}{dx^2} \\neq \\dfrac{d^2y/dt^2}{d^2x/dt^2}\\). This is the single most common parametric error in MHT-CET. The correct route is: find \\(dy/dx\\), differentiate it with respect to the parameter, then divide by \\(dx/dt\\).",
        },
        {
          title: "Differentiate dy/dx with respect to t, not x",
          body:
            "After you have \\(\\dfrac{dy}{dx}\\) as a function of \\(t\\), you cannot differentiate it directly with respect to \\(x\\). Differentiate it with respect to \\(t\\) and then divide by \\(\\dfrac{dx}{dt}\\) to convert back to a derivative in \\(x\\).",
        },
      ],
    },

    // 3 — proving second-order relations (anchored)
    {
      kind: "formula" as const,
      slug: "cetdiff-higher-order-relations",
      name: "Proving Second-Order Relations",
      intuition:
        "Some questions give y in a form (a sum of sin/cos, a power combination, an exponential) and ask you to show it satisfies a differential relation. The recipe is mechanical: differentiate twice, then look for the original y (or x times y) staring back at you, and substitute.",
      definition:
        "To verify that \\(y\\) satisfies a relation such as \\(y'' + n^2 y = 0\\) or \\(x^2 y'' = n(n+1)y\\): " +
        "differentiate \\(y\\) once, then again, and rearrange \\(y''\\) until the bracket that appears is exactly \\(y\\) (or a known multiple of it). Two patterns dominate the bank:\n" +
        "- **Trigonometric:** \\(y = A\\cos(nx) + B\\sin(nx)\\) gives \\(y'' = -n^2 y\\), i.e. \\(y'' + n^2 y = 0\\).\n" +
        "- **Power combination:** \\(y = a x^{n+1} + b x^{-n}\\) gives \\(x^2 y'' = n(n+1)y\\).",
      formula: {
        label: "Two standard second-order relations",
        latex: "y = A\\cos nx + B\\sin nx \\Rightarrow y'' = -n^2 y; \\qquad y = ax^{n+1} + bx^{-n} \\Rightarrow x^2 y'' = n(n+1)y",
        symbols: [
          { symbol: "y'' = -n^2 y", meaning: "the SHM-type relation from the sin/cos combination" },
          { symbol: "n(n+1)y", meaning: "the multiple that appears for the power combination" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(y = e^{mx}\\), show that \\(y'' - m^2 y = 0\\).",
        steps: [
          "Differentiate once: \\(y' = m\\,e^{mx}\\).",
          "Differentiate again: \\(y'' = m^2 e^{mx}\\).",
          "Recognise \\(e^{mx} = y\\), so \\(y'' = m^2 y\\), giving \\(y'' - m^2 y = 0\\).",
        ],
        answer: "\\(y'' - m^2 y = 0\\) is satisfied.",
      },
      selfCheckExample: {
        prompt:
          "If \\(y = \\sin(3x)\\), find the relation between \\(y''\\) and \\(y\\).",
        steps: [
          "\\(y' = 3\\cos 3x\\), then \\(y'' = -9\\sin 3x\\).",
          "Since \\(\\sin 3x = y\\), we get \\(y'' = -9y\\).",
          "So \\(y'' + 9y = 0\\) (the \\(n^2 = 9\\) case of the SHM relation).",
        ],
        answer: "\\(y'' + 9y = 0\\)",
      },
      practiceSet: [
        { prompt: "\\(y = \\cos 2x\\). Relation for \\(y''\\)?", answer: "\\(y'' + 4y = 0\\)", method: "\\(y'' = -4\\cos 2x = -4y\\)" },
        { prompt: "\\(y = e^{2x}\\). Relation for \\(y''\\)?", answer: "\\(y'' - 4y = 0\\)", method: "\\(y'' = 4e^{2x} = 4y\\)" },
        { prompt: "\\(y = A\\cos 5x + B\\sin 5x\\). Find \\(y''\\) in terms of \\(y\\).", answer: "\\(y'' = -25y\\)", method: "\\(n = 5\\)" },
        { prompt: "\\(y = x^3 + \\dfrac{1}{x^2}\\) (so \\(n = 2\\)). Find \\(x^2 y''\\).", answer: "\\(6y\\)", method: "\\(n(n+1) = 2\\cdot 3 = 6\\)" },
      ],
      pyqExampleId: "fce07665-3953-44c0-b670-b66da4e627f6",
      traps: [
        {
          title: "Carry the constants — they cancel cleanly",
          body:
            "In \\(y = A\\cos nx + B\\sin nx\\), differentiating twice brings down \\(-n^2\\) from BOTH terms identically, so the whole bracket reforms into \\(y\\). Do not drop \\(A\\) or \\(B\\) — the relation only emerges because both terms behave the same way.",
        },
        {
          title: "Match the power-combination exponents",
          body:
            "For \\(y = ax^{n+1} + bx^{-n}\\) the relation \\(x^2 y'' = n(n+1)y\\) holds only because both exponents are tuned to give the SAME factor \\(n(n+1)\\) after two derivatives. If the exponents are arbitrary, no single relation appears — read them carefully.",
        },
      ],
    },

    // 4 — showing an expression is constant (anchored)
    {
      kind: "formula" as const,
      slug: "cetdiff-show-expression-constant",
      name: "Showing an Expression Is Constant",
      intuition:
        "If you can show the derivative of an expression is identically zero, the expression cannot change — it is a constant. So its value at any one point equals its value everywhere. These questions hand you a value at one point and ask for it at another; the answer is just the same number.",
      definition:
        "If \\(\\dfrac{d}{dx}\\big[E(x)\\big] = 0\\) for all \\(x\\), then \\(E(x)\\) is **constant**, so \\(E(b) = E(a)\\) for any \\(a, b\\). " +
        "The work is to differentiate the given expression and watch the terms cancel to zero, using the supplied relations (for example \\(f'' = -f\\) and \\(g = f'\\)). " +
        "Once \\(E' = 0\\), simply read off: whatever value is given at one point is the value at every point.",
      formula: {
        label: "Zero derivative implies constant",
        latex: "\\dfrac{d}{dx}E(x) = 0 \\ \\text{for all } x \\ \\Longrightarrow\\ E(x) = \\text{const}, \\quad E(b) = E(a)",
      },
      authoredExample: {
        prompt:
          "Verify that \\(E(x) = \\sin^2 x + \\cos^2 x\\) is constant by differentiation, and hence find \\(E(7)\\) given \\(E(0) = 1\\).",
        steps: [
          "Differentiate: \\(E'(x) = 2\\sin x\\cos x + 2\\cos x(-\\sin x) = 2\\sin x\\cos x - 2\\sin x\\cos x = 0\\).",
          "Since \\(E'(x) = 0\\) everywhere, \\(E\\) is constant.",
          "Therefore \\(E(7) = E(0) = 1\\) — the value does not depend on the point.",
        ],
        answer: "\\(E(7) = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "Let \\(f''(x) = -f(x)\\) and \\(g = f'\\). Show \\(p(x) = (f(x))^2 + (g(x))^2\\) is constant.",
        steps: [
          "Differentiate: \\(p'(x) = 2f f' + 2g g'\\).",
          "Substitute \\(f' = g\\) and \\(g' = f'' = -f\\): \\(p' = 2fg + 2g(-f) = 2fg - 2fg = 0\\).",
          "So \\(p\\) is constant — \\(p(\\text{any point}) = p(\\text{any other point})\\).",
        ],
        answer: "\\(p(x)\\) is constant, since \\(p'(x) = 0\\).",
      },
      practiceSet: [
        { prompt: "\\(E = \\sec^2 x - \\tan^2 x\\). Is \\(E\\) constant? Value?", answer: "Yes, \\(E = 1\\)", method: "\\(E' = 0\\); identity \\(\\sec^2 - \\tan^2 = 1\\)" },
        { prompt: "\\(E' = 0\\) and \\(E(3) = 7\\). Find \\(E(50)\\).", answer: "\\(7\\)", method: "constant" },
        { prompt: "\\(y = a\\sin x + b\\cos x\\). Show \\(y^2 + (y')^2\\) is constant. Value?", answer: "\\(a^2 + b^2\\)", method: "derivative cancels to 0" },
        { prompt: "If \\(\\dfrac{d}{dx}h(x) = 0\\) and \\(h(1) = -4\\), find \\(h(100)\\).", answer: "\\(-4\\)", method: "constant" },
      ],
      pyqExampleId: "9419b7ce-4313-4465-b6ca-c515306a1c42",
      traps: [
        {
          title: "Zero derivative means constant — the second point is a decoy",
          body:
            "Once \\(E'(x) = 0\\), the specific points (5 and 10, say) carry no information beyond the given value. \\(E(10) = E(5)\\) exactly. Students waste time trying to compute \\(E\\) at the new point from scratch.",
        },
        {
          title: "Use the supplied relations during differentiation",
          body:
            "Expressions like \\((f)^2 + (g)^2\\) only collapse to zero because of the given conditions \\(f'' = -f\\) and \\(g = f'\\). Substitute them as soon as \\(g'\\) or \\(f''\\) appears — that substitution is exactly what produces the cancellation.",
        },
      ],
    },

    // 5 — nth-derivative standard results (FOUNDATION — no PYQ)
    {
      kind: "formula" as const,
      slug: "cetdiff-nth-derivative-standard-results",
      name: "nth-Order Derivatives — Standard Results",
      intuition:
        "A handful of functions have a clean pattern when you keep differentiating: powers shed exponents factorially, the sine/cosine of a linear argument simply add quarter-turns to the phase, and the exponential reproduces a power of its coefficient. Knowing the pattern lets you jump straight to the nth derivative without grinding through every step. MHT-CET usually stops at the second order, so treat these as a completeness reference.",
      definition:
        "Standard nth-order derivatives (for a linear argument \\(ax + b\\)):\n" +
        "- \\(\\dfrac{d^n}{dx^n}(x^m) = \\dfrac{m!}{(m-n)!}\\,x^{m-n}\\) (for \\(m \\geq n\\))\n" +
        "- \\(\\dfrac{d^n}{dx^n}\\!\\left(\\dfrac{1}{ax+b}\\right) = \\dfrac{(-1)^n\\,n!\\,a^n}{(ax+b)^{n+1}}\\)\n" +
        "- \\(\\dfrac{d^n}{dx^n}\\big(\\log(ax+b)\\big) = \\dfrac{(-1)^{n-1}(n-1)!\\,a^n}{(ax+b)^n}\\)\n" +
        "- \\(\\dfrac{d^n}{dx^n}\\big(\\sin(ax+b)\\big) = a^n \\sin\\!\\left(ax+b+\\dfrac{n\\pi}{2}\\right)\\)\n" +
        "- \\(\\dfrac{d^n}{dx^n}\\big(\\cos(ax+b)\\big) = a^n \\cos\\!\\left(ax+b+\\dfrac{n\\pi}{2}\\right)\\)\n" +
        "- \\(\\dfrac{d^n}{dx^n}\\big(e^{ax}\\big) = a^n e^{ax}\\)",
      formula: {
        label: "nth derivative of a sine with linear argument",
        latex: "\\dfrac{d^n}{dx^n}\\big(\\sin(ax+b)\\big) = a^n \\sin\\!\\left(ax+b+\\dfrac{n\\pi}{2}\\right)",
        symbols: [
          { symbol: "a^n", meaning: "the coefficient \\(a\\) factors out once per differentiation" },
          { symbol: "n\\pi/2", meaning: "each derivative advances the phase by a quarter-turn" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the nth derivative of \\(\\dfrac{1}{2x+1}\\), and then write the 4th derivative of \\(\\sin 2x\\).",
        steps: [
          "Use \\(\\dfrac{d^n}{dx^n}\\!\\left(\\dfrac{1}{ax+b}\\right) = \\dfrac{(-1)^n n! a^n}{(ax+b)^{n+1}}\\) with \\(a = 2,\\ b = 1\\): \\(\\dfrac{(-1)^n\\,n!\\,2^n}{(2x+1)^{n+1}}\\).",
          "For the sine, use \\(\\dfrac{d^n}{dx^n}\\sin(ax+b) = a^n\\sin\\!\\left(ax+b+\\tfrac{n\\pi}{2}\\right)\\) with \\(a = 2,\\ b = 0,\\ n = 4\\).",
          "That gives \\(2^4 \\sin\\!\\left(2x + \\tfrac{4\\pi}{2}\\right) = 16\\sin(2x + 2\\pi) = 16\\sin 2x\\).",
        ],
        answer:
          "\\(\\dfrac{d^n}{dx^n}\\!\\left(\\dfrac{1}{2x+1}\\right) = \\dfrac{(-1)^n n!\\,2^n}{(2x+1)^{n+1}}\\); \\(\\dfrac{d^4}{dx^4}(\\sin 2x) = 16\\sin 2x\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{d^n}{dx^n}(e^{3x})\\)?", answer: "\\(3^n e^{3x}\\)", method: "coefficient power" },
        { prompt: "\\(\\dfrac{d^2}{dx^2}\\cos x\\)?", answer: "\\(-\\cos x\\)", method: "\\(\\cos(x + \\pi) = -\\cos x\\)" },
        { prompt: "\\(\\dfrac{d^n}{dx^n}(x^4)\\) for \\(n = 4\\)?", answer: "\\(24\\)", method: "\\(4!/0! = 24\\)" },
        { prompt: "\\(\\dfrac{d^n}{dx^n}\\log(x)\\)?", answer: "\\(\\dfrac{(-1)^{n-1}(n-1)!}{x^n}\\)", method: "\\(a = 1\\) case" },
      ],
      traps: [
        {
          title: "Sine and cosine cycle with period 4 in the order n",
          body:
            "Differentiating \\(\\sin x\\) four times returns to \\(\\sin x\\); the \\(\\tfrac{n\\pi}{2}\\) phase term encodes exactly this 4-step cycle. Reduce \\(n\\) modulo 4 if you prefer to evaluate the phase directly.",
        },
        {
          title: "The power-rule nth derivative stops at zero",
          body:
            "\\(\\dfrac{d^n}{dx^n}(x^m) = \\dfrac{m!}{(m-n)!}x^{m-n}\\) is valid only for \\(m \\geq n\\). Once \\(n > m\\) every further derivative of a polynomial term is \\(0\\) — the factorial pattern would otherwise give a meaningless negative factorial.",
        },
      ],
    },
  ],
};
