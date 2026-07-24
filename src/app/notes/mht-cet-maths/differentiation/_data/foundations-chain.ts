import type { SubtopicNote } from "@/app/notes/_types";

export const FOUNDATIONS_CHAIN_NOTE: SubtopicNote = {
  subtopicName: "Foundations, Chain Rule & Differentiability",
  title: "Foundations, the Chain Rule, and Differentiability",
  oneLineDefinition:
    "Differentiation measures instantaneous rate of change. Master the standard-derivative table, the sum/product/quotient rules, and the chain rule for composite functions — then know exactly where a derivative can fail to exist.",
  whyItMatters:
    "This subtopic is the on-ramp to the whole chapter: 15 PYQs sit directly here (4 HARD, 11 MODERATE). Every harder differentiation question — implicit, logarithmic, parametric, applications — reduces to applying the chain rule cleanly and recalling the table cold. " +
    "The recurring MHT-CET traps live here too: forgetting the inner factor of a composite, treating any modulus as a corner, and slipping on the exponential derivative aˣ log a.",
  concepts: [
    // 1 — standard derivatives + rules (foundation)
    {
      kind: "formula" as const,
      slug: "cetdiff-standard-derivatives-rules",
      name: "Standard Derivatives and the Rules of Differentiation",
      intuition:
        "About a dozen derivatives are the alphabet of the whole chapter — power, exponential, logarithmic, and the six trig functions. Combined with three rules (sum, product, quotient) they cover most of what the paper asks before any chain rule appears. Know them as reflexes.",
      definition:
        "The standard derivatives you must recall instantly:\n" +
        "- \\(\\dfrac{d}{dx}x^n = nx^{n-1}\\), \\(\\dfrac{d}{dx}\\sqrt{x} = \\dfrac{1}{2\\sqrt{x}}\\), \\(\\dfrac{d}{dx}\\dfrac{1}{x} = -\\dfrac{1}{x^2}\\)\n" +
        "- \\(\\dfrac{d}{dx}e^x = e^x\\), and \\(\\dfrac{d}{dx}a^x = a^x \\log a\\)\n" +
        "- \\(\\dfrac{d}{dx}\\log x = \\dfrac{1}{x}\\), and \\(\\dfrac{d}{dx}\\log_a x = \\dfrac{1}{x \\log a}\\)\n" +
        "- \\(\\dfrac{d}{dx}\\sin x = \\cos x\\), \\(\\dfrac{d}{dx}\\cos x = -\\sin x\\), \\(\\dfrac{d}{dx}\\tan x = \\sec^2 x\\)\n" +
        "- \\(\\dfrac{d}{dx}\\sec x = \\sec x \\tan x\\), \\(\\dfrac{d}{dx}\\csc x = -\\csc x \\cot x\\), \\(\\dfrac{d}{dx}\\cot x = -\\csc^2 x\\)\n" +
        "The three combining rules:\n" +
        "- **Sum/difference:** \\(\\dfrac{d}{dx}[u \\pm v] = u' \\pm v'\\)\n" +
        "- **Product:** \\(\\dfrac{d}{dx}[u\\,v] = u'v + uv'\\)\n" +
        "- **Quotient:** \\(\\dfrac{d}{dx}\\!\\left(\\dfrac{u}{v}\\right) = \\dfrac{u'v - uv'}{v^2}\\)",
      formula: {
        label: "Product rule",
        latex: "\\dfrac{d}{dx}\\big[u(x)\\,v(x)\\big] = u'(x)\\,v(x) + u(x)\\,v'(x)",
        symbols: [
          { symbol: "u, v", meaning: "the two factors being multiplied" },
        ],
      },
      authoredExample: {
        prompt: "Differentiate \\(y = x^2 e^x\\).",
        steps: [
          "This is a product: take \\(u = x^2\\), \\(v = e^x\\).",
          "Then \\(u' = 2x\\) and \\(v' = e^x\\).",
          "Apply the product rule: \\(y' = u'v + uv' = 2x\\,e^x + x^2 e^x\\).",
          "Factor: \\(y' = x e^x(2 + x)\\).",
        ],
        answer: "\\(y' = x e^x(x + 2)\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = 2^x\\) and evaluate \\(y'\\) at \\(x = 0\\).",
        steps: [
          "Use the exponential rule \\(\\dfrac{d}{dx}a^x = a^x \\log a\\) with \\(a = 2\\): \\(y' = 2^x \\log 2\\).",
          "At \\(x = 0\\): \\(2^0 \\log 2 = \\log 2\\).",
        ],
        answer: "\\(y' = 2^x \\log 2\\); at \\(x = 0\\) it is \\(\\log 2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{d}{dx}(5^x)\\)", answer: "\\(5^x \\log 5\\)", method: "exponential rule \\(a^x \\log a\\)" },
        { prompt: "\\(\\dfrac{d}{dx}(x^3 \\sin x)\\)", answer: "\\(3x^2 \\sin x + x^3 \\cos x\\)", method: "product rule" },
        { prompt: "\\(\\dfrac{d}{dx}\\!\\left(\\dfrac{x}{\\cos x}\\right)\\)", answer: "\\(\\dfrac{\\cos x + x \\sin x}{\\cos^2 x}\\)", method: "quotient rule" },
        { prompt: "\\(\\dfrac{d}{dx}(\\log_3 x)\\)", answer: "\\(\\dfrac{1}{x \\log 3}\\)", method: "log-to-any-base rule" },
      ],
      pyqExampleId: "427de549-357d-4adc-882d-bb25ce14e58a",
      traps: [
        {
          title: "\\(\\dfrac{d}{dx}a^x\\) is \\(a^x \\log a\\), not \\(x\\,a^{x-1}\\)",
          body:
            "Do not apply the power rule to a constant base. \\(2^x\\) has a variable EXPONENT, so its derivative is \\(2^x \\log 2\\). The power rule \\(nx^{n-1}\\) applies only to \\(x^n\\) (variable base, constant exponent). At \\(x = 0\\), \\(\\dfrac{d}{dx}3^x = \\log 3\\) — exactly the kind of value the bank tests.",
        },
        {
          title: "Quotient rule sign: numerator is \\(u'v - uv'\\)",
          body:
            "The order matters — \\(u'v - uv'\\), not \\(uv' - u'v\\). Writing it backwards flips the sign of the whole answer. Memorise it as 'low d-high minus high d-low, over low squared'.",
        },
      ],
    },

    // 2 — chain rule + composites (foundation)
    {
      kind: "formula" as const,
      slug: "cetdiff-chain-rule",
      name: "The Chain Rule and Composite Functions",
      intuition:
        "When a function sits inside another — like \\(\\sin(x^2)\\) or \\((3x+1)^5\\) — you differentiate the outer function first (treating the inside as a single block), then MULTIPLY by the derivative of the inside. Peel the layers from outside in, multiplying as you go.",
      definition:
        "If \\(y = f(g(x))\\), then \\(\\dfrac{dy}{dx} = f'(g(x)) \\cdot g'(x)\\). For multiple nested layers, multiply the derivative of every layer:\n" +
        "\\[\\dfrac{d}{dx}f(g(h(x))) = f'(g(h(x))) \\cdot g'(h(x)) \\cdot h'(x).\\]\n" +
        "The composite standard forms (outer derivative times inner derivative \\(g'(x)\\)):\n" +
        "- \\(\\dfrac{d}{dx}[g(x)]^n = n[g(x)]^{n-1}\\,g'(x)\\)\n" +
        "- \\(\\dfrac{d}{dx}\\sin[g(x)] = \\cos[g(x)]\\,g'(x)\\), \\(\\dfrac{d}{dx}\\cos[g(x)] = -\\sin[g(x)]\\,g'(x)\\)\n" +
        "- \\(\\dfrac{d}{dx}\\log[g(x)] = \\dfrac{g'(x)}{g(x)}\\), \\(\\dfrac{d}{dx}e^{g(x)} = e^{g(x)}\\,g'(x)\\)",
      formula: {
        label: "Chain rule",
        latex: "\\dfrac{dy}{dx} = f'\\big(g(x)\\big) \\cdot g'(x) \\qquad \\text{for } y = f(g(x))",
        symbols: [
          { symbol: "f", meaning: "outer function" },
          { symbol: "g(x)", meaning: "inner function — its derivative is the multiplying factor" },
        ],
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\sin(3x^2 + 1)\\).",
        steps: [
          "Outer function is \\(\\sin\\), inner is \\(g(x) = 3x^2 + 1\\).",
          "Derivative of the outer at the inner: \\(\\cos(3x^2 + 1)\\).",
          "Multiply by the inner derivative \\(g'(x) = 6x\\).",
          "So \\(\\dfrac{dy}{dx} = \\cos(3x^2 + 1) \\cdot 6x\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = 6x \\cos(3x^2 + 1)\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = (2x^2 - 5)^4\\).",
        steps: [
          "Outer is the 4th power, inner is \\(g(x) = 2x^2 - 5\\).",
          "Power rule on the outer: \\(4(2x^2 - 5)^3\\).",
          "Multiply by \\(g'(x) = 4x\\): \\(4(2x^2 - 5)^3 \\cdot 4x = 16x(2x^2 - 5)^3\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = 16x(2x^2 - 5)^3\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{d}{dx}\\cos(5x)\\)", answer: "\\(-5\\sin(5x)\\)", method: "inner derivative \\(= 5\\)" },
        { prompt: "\\(\\dfrac{d}{dx}e^{x^2}\\)", answer: "\\(2x\\,e^{x^2}\\)", method: "\\(e^{g}\\cdot g'\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\log(x^2 + 1)\\)", answer: "\\(\\dfrac{2x}{x^2 + 1}\\)", method: "\\(g'/g\\)" },
        { prompt: "\\(\\dfrac{d}{dx}(\\sin x)^3\\)", answer: "\\(3\\sin^2 x \\cos x\\)", method: "power then chain" },
      ],
      pyqExampleId: "c86598b5-de99-4adb-9bc5-4cd72ab3e469",
      traps: [
        {
          title: "Never forget the inner derivative factor",
          body:
            "Differentiating \\(\\sin(3x^2+1)\\) as just \\(\\cos(3x^2+1)\\) drops the \\(\\times 6x\\) — the single most common chain-rule error. Every layer contributes a multiplying factor.",
        },
        {
          title: "Evaluate the inner argument, not the outer, when a factor is zero",
          body:
            "For \\(y = \\cos(\\sin x^2)\\), \\(\\dfrac{dy}{dx} = -\\sin(\\sin x^2)\\cdot \\cos x^2 \\cdot 2x\\). At \\(x = \\sqrt{\\pi/2}\\), \\(x^2 = \\pi/2\\) so \\(\\cos x^2 = 0\\) — the whole product is \\(0\\). Spot the vanishing middle factor before grinding the arithmetic.",
        },
      ],
    },

    // 3 — iterated function chain (anchored)
    {
      kind: "formula" as const,
      slug: "cetdiff-iterated-function-chain",
      name: "Differentiating Iterated Functions f(f(x))",
      intuition:
        "When the same function is applied repeatedly — \\(f(f(x))\\) or \\(f(f(f(x)))\\) — and you are only given \\(f\\) and \\(f'\\) at one point, the chain rule still works one layer at a time. You never need the formula for \\(f\\); you just multiply the slope at each layer.",
      definition:
        "By the chain rule, \\(\\dfrac{d}{dx}f(f(x)) = f'(f(x)) \\cdot f'(x)\\), and for three layers " +
        "\\(\\dfrac{d}{dx}f(f(f(x))) = f'(f(f(x))) \\cdot f'(f(x)) \\cdot f'(x)\\). " +
        "If a fixed point is given (e.g. \\(f(1) = 1\\)), each nested \\(f\\) at that point is still \\(1\\), so every factor becomes \\(f'(1)\\). " +
        "When an inner expression carries its own coefficient (such as \\(f(2f(x) + 2)\\)), the chain rule pulls out that extra factor too — do not drop it.",
      formula: {
        label: "Chain rule on an iterated function",
        latex: "\\dfrac{d}{dx}f\\big(f(f(x))\\big) = f'\\big(f(f(x))\\big)\\cdot f'\\big(f(x)\\big)\\cdot f'(x)",
      },
      authoredExample: {
        prompt:
          "If \\(f(2) = 2\\) and \\(f'(2) = 5\\), find the derivative of \\(f(f(x))\\) at \\(x = 2\\).",
        steps: [
          "Chain rule: \\(\\dfrac{d}{dx}f(f(x)) = f'(f(x)) \\cdot f'(x)\\).",
          "At \\(x = 2\\): the inner \\(f(2) = 2\\), so \\(f'(f(2)) = f'(2) = 5\\).",
          "And \\(f'(2) = 5\\). Multiply: \\(5 \\times 5 = 25\\).",
        ],
        answer: "\\(25\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(f(0) = 0\\) and \\(f'(0) = 4\\), find the derivative of \\(g(x) = f(3f(x))\\) at \\(x = 0\\).",
        steps: [
          "Chain rule with the inner coefficient: \\(g'(x) = f'(3f(x)) \\cdot 3f'(x)\\).",
          "At \\(x = 0\\): inner \\(3f(0) = 0\\), so \\(f'(3f(0)) = f'(0) = 4\\).",
          "Then \\(g'(0) = 4 \\cdot 3 \\cdot f'(0) = 4 \\cdot 3 \\cdot 4 = 48\\).",
        ],
        answer: "\\(48\\)",
      },
      practiceSet: [
        { prompt: "\\(f(1)=1, f'(1)=2\\). Find \\(\\dfrac{d}{dx}f(f(x))\\) at \\(x=1\\).", answer: "\\(4\\)", method: "\\(f'(1)\\cdot f'(1)=2\\cdot2\\)" },
        { prompt: "\\(f(3)=3, f'(3)=2\\). Find \\(\\dfrac{d}{dx}f(f(f(x)))\\) at \\(x=3\\).", answer: "\\(8\\)", method: "\\(2\\cdot2\\cdot2\\)" },
        { prompt: "\\(f(0)=0, f'(0)=5\\). Find \\(\\dfrac{d}{dx}(f(x))^2\\) at \\(x=0\\).", answer: "\\(0\\)", method: "\\(2f(0)f'(0)=2\\cdot0\\cdot5\\)" },
        { prompt: "\\(f(0)=0, f'(0)=3\\). Find \\(\\dfrac{d}{dx}f(2f(x))\\) at \\(x=0\\).", answer: "\\(18\\)", method: "inner \\(2f(0)=0\\): \\(f'(0)\\cdot2\\cdot f'(0)=3\\cdot2\\cdot3\\)" },
      ],
      pyqExampleId: "5fac33c1-cf9f-49b4-987b-7419ceef79b3",
      traps: [
        {
          title: "Drop the inner coefficient and you lose a factor",
          body:
            "For \\(g(x) = [f(2f(x) + 2)]^2\\) the chain rule contributes \\(\\times 2\\) from the inner \\(2f(x)\\). Students who differentiate \\(f(2f(x)+2)\\) as if the inner were just \\(f(x)\\) miss this factor and get half the answer.",
        },
        {
          title: "Don't try to find a formula for \\(f\\)",
          body:
            "These questions give only \\(f\\) and \\(f'\\) at a point. You never need an explicit rule for \\(f\\) — evaluate each chain-rule factor at the appropriate point and multiply. For \\(f(f(f(x))) + (f(x))^2\\) at \\(x=1\\) with \\(f(1)=1, f'(1)=3\\): \\(3\\cdot3\\cdot3 + 2\\cdot1\\cdot3 = 33\\).",
        },
      ],
    },

    // 4 — simplify before differentiating (anchored)
    {
      kind: "formula" as const,
      slug: "cetdiff-simplify-before-differentiating",
      name: "Simplify the Expression Before Differentiating",
      intuition:
        "Many integrands and derivands look intimidating only because they are written badly. Cancel common factors, combine fractions, or use an algebraic identity FIRST — a 'hard' derivative often collapses to a one-line quotient rule once the expression is clean. Always simplify before differentiating.",
      definition:
        "Before differentiating, look for cheap algebraic simplifications:\n" +
        "- **Common factors** in a quotient that cancel.\n" +
        "- **Negative/fractional powers** that combine — e.g. multiply top and bottom by the lower power to clear them.\n" +
        "- **Identities** that reduce a product or ratio to a standard form.\n" +
        "Only after the expression is in its simplest form do you apply the rules. This converts an ugly derivative into a routine one and removes most of the error surface.",
      formula: {
        label: "Quotient rule (used after simplifying)",
        latex: "\\dfrac{d}{dx}\\!\\left(\\dfrac{u}{v}\\right) = \\dfrac{u'v - uv'}{v^2}",
      },
      authoredExample: {
        prompt:
          "If \\(y = \\dfrac{x^{1/2} + x^{-1/2}}{x^{1/2} - x^{-1/2}}\\), simplify \\(y\\) and find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Multiply numerator and denominator by \\(x^{1/2}\\): \\(y = \\dfrac{x + 1}{x - 1}\\).",
          "Now apply the quotient rule with \\(u = x+1\\), \\(v = x-1\\): \\(u' = 1\\), \\(v' = 1\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{(1)(x-1) - (x+1)(1)}{(x-1)^2} = \\dfrac{-2}{(x-1)^2}\\).",
        ],
        answer: "\\(y = \\dfrac{x+1}{x-1}, \\quad \\dfrac{dy}{dx} = \\dfrac{-2}{(x-1)^2}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(y = \\dfrac{1 - \\tan^2 x}{1 + \\tan^2 x}\\), simplify and differentiate.",
        steps: [
          "Use the identity: \\(\\dfrac{1 - \\tan^2 x}{1 + \\tan^2 x} = \\cos 2x\\).",
          "Differentiate the clean form: \\(\\dfrac{dy}{dx} = -2\\sin 2x\\).",
        ],
        answer: "\\(y = \\cos 2x, \\quad \\dfrac{dy}{dx} = -2\\sin 2x\\)",
      },
      practiceSet: [
        { prompt: "Simplify and differentiate \\(y = \\dfrac{x^2 - 1}{x - 1}\\).", answer: "\\(y = x+1,\\; y' = 1\\)", method: "cancel \\((x-1)\\)" },
        { prompt: "Simplify and differentiate \\(y = \\dfrac{2\\tan x}{1 + \\tan^2 x}\\).", answer: "\\(y = \\sin 2x,\\; y' = 2\\cos 2x\\)", method: "identity for \\(\\sin 2x\\)" },
        { prompt: "Simplify \\(y = \\dfrac{x^{3/2}}{x^{1/2}}\\) before differentiating.", answer: "\\(y = x,\\; y' = 1\\)", method: "subtract exponents" },
        { prompt: "Differentiate \\(y = \\log(e^{2x})\\).", answer: "\\(2\\)", method: "simplify \\(\\log(e^{2x}) = 2x\\) first" },
      ],
      pyqExampleId: "dafdeb1b-00f3-43b4-802b-b9af38ef53a9",
      traps: [
        {
          title: "Simplify first, or the algebra buries you",
          body:
            "Differentiating \\(\\dfrac{x^{2/3} - x^{-1/3}}{x^{2/3} + x^{-1/3}}\\) directly with the quotient rule is error-prone. Multiply through by \\(x^{1/3}\\) to get \\(\\dfrac{x-1}{x+1}\\) — then \\(y' = \\dfrac{2}{(x+1)^2}\\) and \\((x+1)^2 y' = 2\\) falls out instantly.",
        },
      ],
    },

    // 5 — linear approximation (anchored)
    {
      kind: "formula" as const,
      slug: "cetdiff-linear-approximation",
      name: "Linear Approximation Using the Derivative",
      intuition:
        "Near a known point, a smooth curve is almost a straight line — its tangent. So to estimate a value slightly away from an easy point, start at the easy value and add the tangent's rise, \\(h \\times \\text{slope}\\). This turns a hard arithmetic value into a one-line estimate.",
      definition:
        "For a small change \\(h\\) about a point \\(a\\): \\(f(a + h) \\approx f(a) + h\\,f'(a)\\). " +
        "Choose \\(a\\) so that \\(f(a)\\) is easy to compute exactly; let \\(h\\) be the small (possibly negative) gap to the target. " +
        "The term \\(h\\,f'(a)\\) is the tangent-line correction. The closer \\(h\\) is to zero, the better the estimate.",
      formula: {
        label: "Linear approximation",
        latex: "f(a + h) \\approx f(a) + h\\,f'(a)",
        symbols: [
          { symbol: "a", meaning: "nearby point with an easy exact value" },
          { symbol: "h", meaning: "small gap to the target (may be negative)" },
        ],
      },
      authoredExample: {
        prompt: "Use linear approximation to estimate \\(\\sqrt{36.6}\\).",
        steps: [
          "Take \\(f(x) = \\sqrt{x}\\), \\(a = 36\\) (easy: \\(\\sqrt{36} = 6\\)), \\(h = 0.6\\).",
          "\\(f'(x) = \\dfrac{1}{2\\sqrt{x}}\\), so \\(f'(36) = \\dfrac{1}{12}\\).",
          "Apply the formula: \\(\\sqrt{36.6} \\approx 6 + 0.6 \\times \\dfrac{1}{12} = 6 + 0.05 = 6.05\\).",
        ],
        answer: "\\(\\sqrt{36.6} \\approx 6.05\\)",
      },
      selfCheckExample: {
        prompt: "Estimate \\((1.02)^5\\) using linear approximation.",
        steps: [
          "Take \\(f(x) = x^5\\), \\(a = 1\\) (\\(f(1) = 1\\)), \\(h = 0.02\\).",
          "\\(f'(x) = 5x^4\\), so \\(f'(1) = 5\\).",
          "\\((1.02)^5 \\approx 1 + 0.02 \\times 5 = 1 + 0.1 = 1.10\\).",
        ],
        answer: "\\((1.02)^5 \\approx 1.10\\)",
      },
      practiceSet: [
        { prompt: "Estimate \\(\\sqrt{25.3}\\).", answer: "\\(\\approx 5.03\\)", method: "\\(a=25, h=0.3, f'=1/10\\)" },
        { prompt: "Estimate \\((8.1)^{1/3}\\).", answer: "\\(\\approx 2.0083\\)", method: "\\(a=8, h=0.1, f'=1/12\\)" },
        { prompt: "Estimate \\(\\log_{10} 1002\\) given \\(\\log_{10} e = 0.4343\\).", answer: "\\(\\approx 3.0008686\\)", method: "\\(a=1000, h=2, f'=0.4343/1000\\)" },
        { prompt: "Estimate \\(\\sin 31^\\circ\\) (use \\(1^\\circ \\approx 0.01745\\) rad).", answer: "\\(\\approx 0.515\\)", method: "\\(a=30^\\circ, f'=\\cos30^\\circ\\)" },
      ],
      pyqExampleId: "3cdd58b2-6d41-4c63-b4bb-9de40992a735",
      traps: [
        {
          title: "Pick \\(h\\) small and signed correctly",
          body:
            "To estimate \\(\\log_{10} 998\\), use \\(a = 1000\\) and \\(h = -2\\) (negative, since \\(998 < 1000\\)). Getting the sign of \\(h\\) wrong pushes the estimate the wrong way. With \\(f'(x) = \\dfrac{0.4343}{x}\\): \\(\\log_{10} 998 \\approx 3 - 2\\cdot\\dfrac{0.4343}{1000} = 2.99913\\).",
        },
        {
          title: "The slope is the DERIVATIVE at \\(a\\), not at the target",
          body:
            "Evaluate \\(f'(a)\\) at the easy anchor point \\(a\\), not at \\(a + h\\). Using \\(f'(a+h)\\) defeats the purpose — you wanted an easy slope.",
        },
      ],
    },

    // 6 — tangent slope geometric meaning (anchored, SVG)
    {
      kind: "formula" as const,
      slug: "cetdiff-tangent-slope-geometric-meaning",
      name: "The Derivative as the Slope of the Tangent",
      visualizationSlug: "diff-tangent-slope",
      intuition:
        "Geometrically, the derivative at a point IS the slope of the tangent line there. As the second point of a secant slides toward the first, the secant's slope approaches the tangent's slope — that limiting slope is \\(f'(x)\\). So 'find where the slope is maximum/minimum' means 'analyse \\(f'(x)\\)'.",
      definition:
        "The slope of the tangent to \\(y = f(x)\\) at \\(x = a\\) is \\(f'(a)\\). " +
        "To find where the slope itself is greatest or least, treat the slope function \\(s(x) = f'(x)\\) as a new function and analyse IT: set \\(s'(x) = f''(x) = 0\\) to locate the candidate points, then compare \\(s\\)-values. " +
        "Equation of the tangent at \\((a, f(a))\\): \\(y - f(a) = f'(a)(x - a)\\).",
      formula: {
        label: "Slope of the tangent",
        latex: "m_{\\text{tangent}} = \\left.\\dfrac{dy}{dx}\\right|_{x=a} = f'(a)",
        symbols: [
          { symbol: "f'(a)", meaning: "instantaneous slope at \\(x = a\\)" },
        ],
      },
      authoredExample: {
        prompt: "Find the slope of the tangent to \\(y = x^3 - 3x\\) at \\(x = 2\\).",
        steps: [
          "The slope function is \\(\\dfrac{dy}{dx} = 3x^2 - 3\\).",
          "Substitute \\(x = 2\\): \\(3(4) - 3 = 12 - 3 = 9\\).",
        ],
        answer: "Slope \\(= 9\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(y = e^x \\cos x\\), find where the SLOPE of the tangent is minimum on \\(0 \\leq x \\leq 2\\pi\\).",
        steps: [
          "Slope function: \\(s(x) = \\dfrac{dy}{dx} = e^x(\\cos x - \\sin x)\\).",
          "Differentiate the slope: \\(s'(x) = e^x(\\cos x - \\sin x) + e^x(-\\sin x - \\cos x) = -2e^x \\sin x\\).",
          "Set \\(s'(x) = 0\\): \\(\\sin x = 0 \\Rightarrow x = 0, \\pi, 2\\pi\\).",
          "Compare: \\(s(0) = 1\\), \\(s(\\pi) = -e^\\pi\\), \\(s(2\\pi) = e^{2\\pi}\\). The smallest is at \\(x = \\pi\\).",
        ],
        answer: "Slope is minimum at \\(x = \\pi\\) (value \\(-e^\\pi\\)).",
      },
      practiceSet: [
        { prompt: "Slope of \\(y = x^2\\) at \\(x = 3\\).", answer: "\\(6\\)", method: "\\(y' = 2x\\)" },
        { prompt: "Slope of \\(y = \\sin x\\) at \\(x = 0\\).", answer: "\\(1\\)", method: "\\(y' = \\cos x\\)" },
        { prompt: "Where is the slope of \\(y = x^2 - 4x\\) zero?", answer: "\\(x = 2\\)", method: "\\(2x - 4 = 0\\)" },
        { prompt: "Slope of the tangent to \\(y = \\log x\\) at \\(x = e\\).", answer: "\\(\\dfrac{1}{e}\\)", method: "\\(y' = 1/x\\)" },
      ],
      pyqExampleId: "a9513f1c-98c9-4eac-9c47-8b052c762bd1",
      traps: [
        {
          title: "Minimum SLOPE means differentiate twice",
          body:
            "When a question asks where the slope (not the function) is minimum, you must differentiate again. First derivative \\(f'(x)\\) IS the slope; set its derivative \\(f''(x) = 0\\). Confusing 'minimum of \\(y\\)' with 'minimum of \\(y'\\)' is a classic MHT-CET trap.",
        },
        {
          title: "Simplify the curve before differentiating",
          body:
            "\\(2\\sin\\theta\\cos\\theta = \\sin 2\\theta\\): the curve \\(y = 2e^x \\sin(\\tfrac{\\pi}{4} - \\tfrac{x}{2})\\cos(\\tfrac{\\pi}{4} - \\tfrac{x}{2})\\) collapses to \\(y = e^x \\cos x\\) before you ever differentiate. Spot the double-angle identity first.",
        },
      ],
    },

    // 7 — differentiability (anchored, SVG)
    {
      kind: "formula" as const,
      slug: "cetdiff-differentiability",
      name: "Differentiability and Where a Derivative Fails to Exist",
      visualizationSlug: "diff-modulus-corner",
      intuition:
        "A function is differentiable at a point only if it has ONE well-defined tangent slope there — the slope coming from the left must equal the slope from the right. Smooth curves are fine everywhere; sharp corners (like the tip of \\(|x|\\)) and breaks are where the derivative dies. But a vanishing factor can smooth a corner so the function IS differentiable after all.",
      definition:
        "\\(f\\) is **differentiable** at \\(x = a\\) if the left-hand derivative equals the right-hand derivative:\n" +
        "\\[\\text{LHD} = \\lim_{h \\to 0^-}\\dfrac{f(a+h) - f(a)}{h} = \\lim_{h \\to 0^+}\\dfrac{f(a+h) - f(a)}{h} = \\text{RHD}.\\]\n" +
        "Key facts:\n" +
        "- **Differentiable \\(\\Rightarrow\\) continuous** (but NOT the converse — \\(|x|\\) is continuous yet not differentiable at \\(0\\)).\n" +
        "- A derivative typically fails at **corners** (\\(|x|\\) at \\(0\\)), **cusps**, **breaks** (jump discontinuities), and **vertical tangents**.\n" +
        "- A modulus inside a product can be smoothed: if another factor vanishes at the corner, the product may be differentiable everywhere.",
      formula: {
        label: "Differentiability test",
        latex: "\\text{LHD} = \\lim_{h\\to0^-}\\dfrac{f(a+h)-f(a)}{h} = \\lim_{h\\to0^+}\\dfrac{f(a+h)-f(a)}{h} = \\text{RHD}",
      },
      authoredExample: {
        prompt: "Is \\(f(x) = x\\,|x|\\) differentiable at \\(x = 0\\)?",
        steps: [
          "Write piecewise: \\(f(x) = x^2\\) for \\(x \\geq 0\\) and \\(f(x) = -x^2\\) for \\(x < 0\\).",
          "RHD: \\(\\dfrac{d}{dx}x^2 = 2x \\to 0\\) as \\(x \\to 0^+\\).",
          "LHD: \\(\\dfrac{d}{dx}(-x^2) = -2x \\to 0\\) as \\(x \\to 0^-\\).",
          "LHD \\(= 0 =\\) RHD, so \\(f\\) IS differentiable at \\(0\\) — the corner of \\(|x|\\) was smoothed by the extra factor \\(x\\).",
        ],
        answer: "Yes — \\(f(x) = x|x|\\) is differentiable at \\(x = 0\\) (and everywhere), with \\(f'(0) = 0\\).",
      },
      selfCheckExample: {
        prompt: "At which point does the derivative of \\(f(x) = |x - 3|\\) fail to exist?",
        steps: [
          "\\(|x - 3|\\) has a sharp corner where the inside is zero, i.e. \\(x = 3\\).",
          "For \\(x > 3\\), slope \\(= +1\\); for \\(x < 3\\), slope \\(= -1\\). LHD \\(\\neq\\) RHD at \\(x = 3\\).",
        ],
        answer: "The derivative fails to exist only at \\(x = 3\\); elsewhere \\(f\\) is differentiable.",
      },
      practiceSet: [
        { prompt: "Is \\(|x|\\) differentiable at \\(x = 0\\)?", answer: "No", method: "LHD \\(=-1\\), RHD \\(=+1\\)" },
        { prompt: "Where does \\(f(x) = |x + 2|\\) fail to be differentiable?", answer: "\\(x = -2\\)", method: "corner where inside \\(= 0\\)" },
        { prompt: "Does differentiable at \\(a\\) imply continuous at \\(a\\)?", answer: "Yes", method: "differentiability is stronger" },
        { prompt: "Is \\(x^2|x|\\) differentiable at \\(0\\)?", answer: "Yes", method: "the \\(x^2\\) factor kills the corner" },
      ],
      pyqExampleId: "abfb8c43-34f2-45cf-8d95-4ba9c2831713",
      traps: [
        {
          title: "Not every modulus is a non-differentiable point",
          body:
            "Students reflexively answer 'fails at the corner' whenever they see \\(|\\cdot|\\). But \\(f(x) = \\dfrac{x}{1 + |x|}\\) is differentiable on ALL of \\(\\mathbb{R}\\): the LHD and RHD at \\(x = 0\\) both equal \\(1\\). Always test LHD vs RHD at the suspect point — a vanishing or matching factor can smooth the corner, sometimes making the 'set of failure points' EMPTY.",
        },
        {
          title: "Continuous does not mean differentiable",
          body:
            "\\(|x|\\) is continuous everywhere but has no derivative at \\(0\\). Differentiability is the stronger condition: differentiable \\(\\Rightarrow\\) continuous, never the reverse.",
        },
      ],
    },

    // Trig simplification toolkit (foundation — used across the whole chapter; no single PYQ)
    {
      kind: "formula" as const,
      slug: "cetdiff-trig-simplification-toolkit",
      name: "Trigonometric Simplification Toolkit",
      intuition:
        "Across calculus a 'hard' derivative is often just an unsimplified trig expression. Before differentiating, scan for these standard forms and collapse them first — a root becomes a plain sum, a quotient becomes a single tangent, a product becomes one angle.",
      definition:
        "Keep these collapses in reflex memory:\n" +
        "- **Half-angle of \\(1\\pm\\cos x\\):** \\(1-\\cos x = 2\\sin^2\\tfrac{x}{2}\\), \\(1+\\cos x = 2\\cos^2\\tfrac{x}{2}\\); so \\(\\dfrac{1-\\cos x}{1+\\cos x}=\\tan^2\\tfrac{x}{2}\\), \\(\\dfrac{1}{1-\\cos x}=\\tfrac12\\csc^2\\tfrac{x}{2}\\), \\(\\dfrac{1}{1+\\cos x}=\\tfrac12\\sec^2\\tfrac{x}{2}\\).\n" +
        "- **Power-reduction (double angle):** \\(1-\\cos 2x = 2\\sin^2 x\\), \\(1+\\cos 2x = 2\\cos^2 x\\), \\(\\sin 2x = 2\\sin x\\cos x\\).\n" +
        "- **Perfect square under a root:** \\(1\\pm\\sin 2x=(\\sin x\\pm\\cos x)^2\\) and \\(1\\pm\\sin\\theta=\\left(\\cos\\tfrac\\theta2\\pm\\sin\\tfrac\\theta2\\right)^2\\), so \\(\\sqrt{1\\pm\\sin 2x}=|\\sin x\\pm\\cos x|\\) — **keep the modulus; its sign depends on the interval.**\n" +
        "- **\\(\\sec\\pm\\tan\\):** \\(\\sec x+\\tan x=\\dfrac{1+\\sin x}{\\cos x}=\\tan\\!\\left(\\tfrac\\pi4+\\tfrac x2\\right)\\), \\(\\sec x-\\tan x=\\tan\\!\\left(\\tfrac\\pi4-\\tfrac x2\\right)\\).\n" +
        "- **Harmonic form:** \\(a\\sin x+b\\cos x=\\sqrt{a^2+b^2}\\,\\sin(x+\\alpha)\\), so its extreme values are \\(\\pm\\sqrt{a^2+b^2}\\).\n" +
        "- **Weierstrass \\(t=\\tan\\tfrac{x}{2}\\):** \\(\\sin x=\\dfrac{2t}{1+t^2}\\), \\(\\cos x=\\dfrac{1-t^2}{1+t^2}\\) — useful whenever a rational function of \\(\\sin x,\\cos x\\) must be handled in one variable.",
      formula: {
        label: "The collapses you reach for most",
        latex:
          "1+\\cos x = 2\\cos^2\\tfrac{x}{2},\\quad 1-\\cos x = 2\\sin^2\\tfrac{x}{2},\\quad \\sqrt{1\\pm\\sin 2x}=|\\sin x\\pm\\cos x|",
        symbols: [
          { symbol: "\\(\\tfrac{x}{2}\\)", meaning: "half-angle — appears whenever you collapse \\(1\\pm\\cos x\\)" },
          { symbol: "\\(|\\cdots|\\)", meaning: "the root of a perfect square is a MODULUS; fix the sign on the given interval" },
        ],
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{1+\\sin 2x}\\) for \\(0<x<\\tfrac{\\pi}{4}\\), then differentiate it.",
        steps: [
          "Recognise the perfect square: \\(1+\\sin 2x = 1+2\\sin x\\cos x = (\\sin x+\\cos x)^2\\).",
          "Take the root with the modulus: \\(\\sqrt{1+\\sin 2x}=|\\sin x+\\cos x|\\). On \\(0<x<\\tfrac{\\pi}{4}\\) both \\(\\sin x,\\cos x>0\\), so it is \\(\\sin x+\\cos x\\).",
          "Now differentiate the simplified form: \\(\\dfrac{d}{dx}(\\sin x+\\cos x)=\\cos x-\\sin x\\).",
        ],
        answer: "\\(\\cos x-\\sin x\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\sqrt{\\dfrac{1-\\cos x}{1+\\cos x}}\\) for \\(0<x<\\pi\\).",
        steps: [
          "Collapse the quotient: \\(\\dfrac{1-\\cos x}{1+\\cos x}=\\tan^2\\tfrac{x}{2}\\), so the expression is \\(\\left|\\tan\\tfrac{x}{2}\\right|=\\tan\\tfrac{x}{2}\\) (positive since \\(\\tfrac{x}{2}\\in(0,\\tfrac\\pi2)\\)).",
          "Differentiate: \\(\\dfrac{d}{dx}\\tan\\tfrac{x}{2}=\\tfrac12\\sec^2\\tfrac{x}{2}\\).",
        ],
        answer: "\\(\\tfrac12\\sec^2\\tfrac{x}{2}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(1-\\cos 6x\\) without the leading \\(1\\).", answer: "\\(2\\sin^2 3x\\)", method: "power-reduction \\(1-\\cos 2\\theta=2\\sin^2\\theta\\) with \\(\\theta=3x\\)" },
        { prompt: "Simplify \\(\\sqrt{1-\\sin 2x}\\) for \\(\\tfrac{\\pi}{4}<x<\\tfrac{\\pi}{2}\\).", answer: "\\(\\sin x-\\cos x\\)", method: "\\((\\sin x-\\cos x)^2\\); \\(\\sin x>\\cos x\\) on this interval" },
        { prompt: "Write \\(\\sec x-\\tan x\\) as one tangent.", answer: "\\(\\tan\\!\\left(\\tfrac\\pi4-\\tfrac x2\\right)\\)" },
        { prompt: "Maximum value of \\(5\\sin x+12\\cos x\\).", answer: "\\(13\\)", method: "\\(\\sqrt{5^2+12^2}\\)" },
      ],
      traps: [
        {
          title: "\\(1\\pm\\cos x\\) (half-angle) vs \\(1\\pm\\cos 2x\\) (power-reduction)",
          body:
            "Different collapses: \\(1-\\cos x = 2\\sin^2\\tfrac{x}{2}\\) but \\(1-\\cos 2x = 2\\sin^2 x\\). Read the angle inside the cosine before choosing the factor — the wrong one halves or doubles the argument.",
        },
        {
          title: "The root of a perfect square is a MODULUS",
          body:
            "\\(\\sqrt{(\\sin x-\\cos x)^2} = |\\sin x-\\cos x|\\), not \\(\\sin x-\\cos x\\). Resolve the sign on the given interval: on \\((\\tfrac\\pi4,\\tfrac\\pi2)\\) it is \\(+(\\sin x-\\cos x)\\); on \\((0,\\tfrac\\pi4)\\) it is \\(-(\\sin x-\\cos x)\\). Dropping the modulus flips the sign of the whole derivative.",
        },
        {
          title: "\\(\\sec\\pm\\tan\\) — mind which way the half-angle shifts",
          body:
            "\\(\\sec x+\\tan x=\\tan\\!\\left(\\tfrac\\pi4+\\tfrac x2\\right)\\) but \\(\\sec x-\\tan x=\\tan\\!\\left(\\tfrac\\pi4-\\tfrac x2\\right)\\). Useful check: \\((\\sec x+\\tan x)(\\sec x-\\tan x)=\\sec^2x-\\tan^2x=1\\).",
        },
      ],
    },
  ],
};
