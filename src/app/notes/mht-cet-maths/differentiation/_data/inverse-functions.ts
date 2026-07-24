import type { SubtopicNote } from "@/app/notes/_types";

export const INVERSE_FUNCTIONS_NOTE: SubtopicNote = {
  subtopicName: "Inverse Functions & Inverse Trigonometric Differentiation",
  title: "Inverse Functions and Inverse Trigonometric Differentiation",
  oneLineDefinition:
    "Differentiating an inverse function by reciprocal-of-the-slope, and taming messy inverse-trig expressions by a single trig substitution that collapses them to a constant times an angle.",
  whyItMatters:
    "This is the heart of the chapter — 29 PYQs sit here, the biggest subtopic by far, and the hardest (13 HARD, 14 MODERATE, only 2 EASY). " +
    "Almost every question is one disguised skill: a fearsome-looking sin-inverse / tan-inverse / cos-inverse argument that, after the RIGHT trig substitution, simplifies to a constant multiple of an angle and differentiates in one line. " +
    "Recognise the standard argument shapes (the substitution table) and these go from 'impossible' to 'instant'.",
  concepts: [
    // 1 — derivative of an inverse function
    {
      kind: "formula" as const,
      slug: "cetdiff-derivative-of-inverse-function",
      name: "Derivative of an Inverse Function",
      visualizationSlug: "inverse-reflection-line",
      intuition:
        "The graph of \\(f^{-1}\\) is the graph of \\(f\\) reflected across the line \\(y = x\\). Reflection swaps run and rise, so wherever \\(f\\) has slope \\(m\\), its inverse has slope \\(1/m\\) at the mirrored point. You never need a formula for \\(f^{-1}\\) itself — just the slope of \\(f\\) at the matching point.",
      definition:
        "If \\(g\\) is the inverse of \\(f\\), then \\(f(g(x)) = x\\). Differentiating both sides by the chain rule, \\(f'(g(x))\\cdot g'(x) = 1\\), so:\n" +
        "- \\(g'(x) = \\dfrac{1}{f'(g(x))}\\) — the derivative of the inverse is the **reciprocal** of \\(f'\\) evaluated at \\(g(x)\\), **not** at \\(x\\).\n" +
        "- To use it at a point \\(x = a\\): first find \\(b = g(a)\\) (the input that makes \\(f(b) = a\\)), then \\(g'(a) = \\dfrac{1}{f'(b)}\\).\n" +
        "- Geometrically: \\(f\\) and \\(f^{-1}\\) are **reflections across \\(y = x\\)**; the slope at a point and the slope at its mirror image are reciprocals.",
      formula: {
        label: "Derivative of an inverse function",
        latex: "g'(x) = \\dfrac{1}{f'\\big(g(x)\\big)} \\qquad\\text{where } g = f^{-1}",
        symbols: [
          { symbol: "g(x)", meaning: "the inverse \\(f^{-1}(x)\\) — the input that maps to \\(x\\) under \\(f\\)" },
          { symbol: "f'(g(x))", meaning: "slope of \\(f\\) at the matching point, NOT \\(f'(x)\\)" },
        ],
      },
      pyqExampleId: "f307c3c9-0719-455a-9384-f0a0e80b1dba",
      authoredExample: {
        prompt:
          "If \\(f(x) = x^5 + 2x + 1\\) and \\(g = f^{-1}\\), find \\(g'(4)\\).",
        steps: [
          "Find \\(b = g(4)\\): the value with \\(f(b) = 4\\). Try \\(b = 1\\): \\(1 + 2 + 1 = 4\\). ✓ So \\(g(4) = 1\\).",
          "Differentiate \\(f\\): \\(f'(x) = 5x^4 + 2\\), so \\(f'(1) = 5 + 2 = 7\\).",
          "Apply the rule: \\(g'(4) = \\dfrac{1}{f'(g(4))} = \\dfrac{1}{f'(1)} = \\dfrac{1}{7}\\).",
        ],
        answer: "\\(g'(4) = \\dfrac{1}{7}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(g\\) is the inverse of \\(f\\) and \\(f'(x) = \\dfrac{1}{1 + x^4}\\), express \\(g'(x)\\) in terms of \\(g(x)\\).",
        steps: [
          "From \\(f(g(x)) = x\\): \\(f'(g(x))\\cdot g'(x) = 1\\).",
          "So \\(g'(x) = \\dfrac{1}{f'(g(x))}\\). Substitute \\(g(x)\\) into \\(f'\\): \\(f'(g(x)) = \\dfrac{1}{1 + (g(x))^4}\\).",
          "Take the reciprocal.",
        ],
        answer: "\\(g'(x) = 1 + (g(x))^4\\)",
      },
      practiceSet: [
        { prompt: "\\(f(x)=x^3\\), \\(g=f^{-1}\\). Find \\(g'(8)\\).", answer: "\\(\\dfrac{1}{12}\\)", method: "\\(g(8)=2\\), \\(f'(2)=12\\)" },
        { prompt: "\\(f(x)=2x+3\\), \\(g=f^{-1}\\). Find \\(g'(x)\\).", answer: "\\(\\dfrac{1}{2}\\)", method: "\\(f'\\equiv 2\\) everywhere" },
        { prompt: "\\(g=f^{-1}\\), \\(f'(x)=\\dfrac{1}{1+x^2}\\). Find \\(g'(x)\\).", answer: "\\(1 + (g(x))^2\\)", method: "reciprocal of \\(f'(g(x))\\)" },
        { prompt: "\\(f(x)=x^2-x\\) for \\(x>\\tfrac12\\), \\(g=f^{-1}\\). Find \\(g'(0)\\).", answer: "\\(1\\)", method: "\\(g(0)=1\\), \\(f'(1)=1\\)" },
      ],
      traps: [
        {
          title: "Evaluate \\(f'\\) at \\(g(x)\\), never at \\(x\\)",
          body:
            "The single most common error: writing \\(g'(x) = 1/f'(x)\\). It is \\(g'(x) = 1/f'(g(x))\\). At a numeric point you must first find \\(g(a)\\) (the input mapping to \\(a\\)), then plug THAT into \\(f'\\).",
        },
        {
          title: "You rarely need the formula for \\(f^{-1}\\)",
          body:
            "For a point value, don't invert \\(f\\) algebraically — just find the matching input \\(b\\) with \\(f(b) = a\\) and take \\(1/f'(b)\\). Inverting an awkward cubic-plus-exponential is impossible anyway; the reciprocal rule sidesteps it.",
        },
      ],
    },

    // 2 — inverse-trig derivative table
    {
      kind: "formula" as const,
      slug: "cetdiff-inverse-trig-derivatives",
      name: "The Inverse Trigonometric Derivative Table",
      intuition:
        "The six inverse-trig functions have a fixed, memorisable derivative table. Cofunction pairs (sin/cos, tan/cot, sec/cosec) have IDENTICAL derivatives except for a minus sign on the 'co' member. Master the table, then apply the chain rule for any inner function.",
      definition:
        "Learn these six cold — they are reflexes:\n" +
        "- \\(\\dfrac{d}{dx}\\sin^{-1}x = \\dfrac{1}{\\sqrt{1-x^2}}\\), \\(\\dfrac{d}{dx}\\cos^{-1}x = -\\dfrac{1}{\\sqrt{1-x^2}}\\)\n" +
        "- \\(\\dfrac{d}{dx}\\tan^{-1}x = \\dfrac{1}{1+x^2}\\), \\(\\dfrac{d}{dx}\\cot^{-1}x = -\\dfrac{1}{1+x^2}\\)\n" +
        "- \\(\\dfrac{d}{dx}\\sec^{-1}x = \\dfrac{1}{|x|\\sqrt{x^2-1}}\\), \\(\\dfrac{d}{dx}\\operatorname{cosec}^{-1}x = -\\dfrac{1}{|x|\\sqrt{x^2-1}}\\)\n" +
        "For an inner function, **chain through**: \\(\\dfrac{d}{dx}\\sin^{-1}(u) = \\dfrac{1}{\\sqrt{1-u^2}}\\cdot\\dfrac{du}{dx}\\), and similarly for the rest. " +
        "A handy identity for direct work: \\(\\sec(\\tan^{-1}x) = \\sqrt{1+x^2}\\) and \\(\\tan(\\sec^{-1}x) = \\sqrt{x^2-1}\\) — drawing the right triangle reads these off instantly.",
      formula: {
        label: "Chain rule on an inverse-trig function",
        latex: "\\dfrac{d}{dx}\\tan^{-1}(u) = \\dfrac{1}{1+u^2}\\cdot\\dfrac{du}{dx}",
        symbols: [
          { symbol: "u", meaning: "the inner function (e.g. \\(x^2\\), \\(3x\\), \\(\\log x\\))" },
          { symbol: "du/dx", meaning: "derivative of the inner function — never forget it" },
        ],
      },
      pyqExampleId: "06bd6abe-5be2-4e50-936e-e493bf7d41b1",
      authoredExample: {
        prompt: "Find \\(\\dfrac{d}{dx}\\tan^{-1}(x^2)\\).",
        steps: [
          "Outer rule: \\(\\dfrac{d}{dx}\\tan^{-1}u = \\dfrac{1}{1+u^2}\\), with \\(u = x^2\\).",
          "Inner derivative: \\(\\dfrac{du}{dx} = 2x\\).",
          "Chain them: \\(\\dfrac{1}{1+(x^2)^2}\\cdot 2x = \\dfrac{2x}{1+x^4}\\).",
        ],
        answer: "\\(\\dfrac{2x}{1+x^4}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{d}{dx}\\sin^{-1}(3x)\\).",
        steps: [
          "Outer rule: \\(\\dfrac{d}{dx}\\sin^{-1}u = \\dfrac{1}{\\sqrt{1-u^2}}\\), with \\(u = 3x\\).",
          "Inner derivative: \\(\\dfrac{du}{dx} = 3\\).",
          "Chain: \\(\\dfrac{1}{\\sqrt{1-9x^2}}\\cdot 3 = \\dfrac{3}{\\sqrt{1-9x^2}}\\).",
        ],
        answer: "\\(\\dfrac{3}{\\sqrt{1-9x^2}}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{d}{dx}\\cos^{-1}(2x)\\)", answer: "\\(-\\dfrac{2}{\\sqrt{1-4x^2}}\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\tan^{-1}(e^x)\\)", answer: "\\(\\dfrac{e^x}{1+e^{2x}}\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\cot^{-1}(x^3)\\)", answer: "\\(-\\dfrac{3x^2}{1+x^6}\\)" },
        { prompt: "Value of \\(\\sec(\\tan^{-1}2)\\)", answer: "\\(\\sqrt{5}\\)", method: "draw the right triangle, hypotenuse \\(\\sqrt{1+4}\\)" },
      ],
      traps: [
        {
          title: "Don't forget the inner derivative \\(du/dx\\)",
          body:
            "\\(\\dfrac{d}{dx}\\sin^{-1}(3x)\\) is NOT \\(\\dfrac{1}{\\sqrt{1-9x^2}}\\) — you must multiply by the inner derivative \\(3\\). The chain factor is what most option-traps omit.",
        },
        {
          title: "The minus sign rides on the 'co' functions",
          body:
            "\\(\\cos^{-1}\\), \\(\\cot^{-1}\\), \\(\\operatorname{cosec}^{-1}\\) carry the negative sign; their partners \\(\\sin^{-1}\\), \\(\\tan^{-1}\\), \\(\\sec^{-1}\\) are positive. Mixing the sign flips the answer onto a distractor.",
        },
        {
          title: "\\(\\sec\\) and \\(\\operatorname{cosec}\\) derivatives carry \\(|x|\\)",
          body:
            "\\(\\dfrac{d}{dx}\\sec^{-1}x = \\dfrac{1}{|x|\\sqrt{x^2-1}}\\) — the absolute value on \\(x\\) is part of the formula. Dropping it is a quiet error the bank tests.",
        },
      ],
    },

    // 3 — collapsing inverse-trig with a substitution (the dominant skill)
    {
      kind: "formula" as const,
      slug: "cetdiff-inverse-trig-substitution",
      name: "Collapsing Inverse-Trig with a Substitution",
      intuition:
        "The highest-value skill in the whole chapter. A monstrous argument inside \\(\\sin^{-1}\\) or \\(\\tan^{-1}\\) is almost always a known double-angle or triple-angle formula in disguise. Substitute \\(x = \\tan\\theta\\) (or \\(\\sin\\theta\\), or \\(\\cos\\theta\\)) so the argument becomes \\(\\sin 2\\theta\\), \\(\\tan 3\\theta\\), etc.; the inverse cancels the trig, the function collapses to a constant multiple of an angle, and the derivative falls out in one line.",
      definition:
        "Pick the substitution that matches the argument's shape, then read off the standard collapse:\n" +
        "- \\(x = \\tan\\theta\\) turns: \\(\\dfrac{2x}{1+x^2} = \\sin 2\\theta\\); \\(\\dfrac{1-x^2}{1+x^2} = \\cos 2\\theta\\); \\(\\dfrac{2x}{1-x^2} = \\tan 2\\theta\\); \\(\\dfrac{3x-x^3}{1-3x^2} = \\tan 3\\theta\\).\n" +
        "- \\(x = \\sin\\theta\\) turns: \\(3x - 4x^3 = \\sin 3\\theta\\); \\(2x\\sqrt{1-x^2} = \\sin 2\\theta\\).\n" +
        "- \\(x = \\cos\\theta\\) turns: \\(4x^3 - 3x = \\cos 3\\theta\\); and the half-angle \\(\\sqrt{\\dfrac{1-\\cos\\theta}{1+\\cos\\theta}} = \\tan\\dfrac{\\theta}{2}\\).\n" +
        "After substituting, \\(\\sin^{-1}(\\sin 3\\theta) = 3\\theta\\) etc., so e.g. \\(\\sin^{-1}(3x-4x^3) = 3\\sin^{-1}x\\) and \\(\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x\\). " +
        "**Branch care**: \\(\\sin^{-1}(\\sin\\alpha) = \\alpha\\) only when \\(\\alpha\\) lies in the principal range \\([-\\pi/2, \\pi/2]\\); outside it the collapse picks up a sign or a \\(\\pi - \\alpha\\) correction.",
      formula: {
        label: "The two workhorse collapses",
        latex: "\\sin^{-1}\\!\\big(3x - 4x^3\\big) = 3\\sin^{-1}x, \\qquad \\tan^{-1}\\!\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x",
        symbols: [
          { symbol: "\\(x = \\sin\\theta\\)", meaning: "use when the argument is a sine multiple-angle (\\(3x-4x^3\\), \\(2x\\sqrt{1-x^2}\\))" },
          { symbol: "\\(x = \\tan\\theta\\)", meaning: "use when the argument is a tangent/double-angle ratio" },
        ],
      },
      pyqExampleId: "c02f435c-dbb4-4029-a0ea-c912605d4a91",
      authoredExample: {
        prompt: "Show that \\(\\tan^{-1}\\!\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x\\), and hence find its derivative (for \\(|x| < 1\\)).",
        steps: [
          "Substitute \\(x = \\tan\\theta\\). Then \\(\\dfrac{2x}{1-x^2} = \\dfrac{2\\tan\\theta}{1-\\tan^2\\theta} = \\tan 2\\theta\\).",
          "So the function is \\(\\tan^{-1}(\\tan 2\\theta) = 2\\theta\\) (valid since \\(|x|<1\\) keeps \\(2\\theta\\) in range). Back-substitute \\(\\theta = \\tan^{-1}x\\): the function equals \\(2\\tan^{-1}x\\).",
          "Differentiate the collapsed form: \\(\\dfrac{d}{dx}\\big(2\\tan^{-1}x\\big) = \\dfrac{2}{1+x^2}\\).",
        ],
        answer: "Function \\(= 2\\tan^{-1}x\\); derivative \\(= \\dfrac{2}{1+x^2}\\).",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = \\cos^{-1}(4x^3 - 3x)\\) (in the range where the collapse is valid).",
        steps: [
          "Substitute \\(x = \\cos\\theta\\). Then \\(4x^3 - 3x = 4\\cos^3\\theta - 3\\cos\\theta = \\cos 3\\theta\\).",
          "So \\(y = \\cos^{-1}(\\cos 3\\theta) = 3\\theta = 3\\cos^{-1}x\\).",
          "Differentiate: \\(\\dfrac{dy}{dx} = 3\\cdot\\left(-\\dfrac{1}{\\sqrt{1-x^2}}\\right) = -\\dfrac{3}{\\sqrt{1-x^2}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{3}{\\sqrt{1-x^2}}\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sin^{-1}(2x\\sqrt{1-x^2})\\) (principal range).", answer: "\\(2\\sin^{-1}x\\)", method: "\\(x=\\sin\\theta\\Rightarrow \\sin 2\\theta\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\tan^{-1}\\!\\dfrac{3x-x^3}{1-3x^2}\\)", answer: "\\(\\dfrac{3}{1+x^2}\\)", method: "\\(x=\\tan\\theta\\Rightarrow \\tan 3\\theta\\Rightarrow 3\\tan^{-1}x\\)" },
        { prompt: "Simplify \\(\\tan^{-1}\\!\\dfrac{1-x^2}{2x}\\) shape: what is \\(\\tan^{-1}\\!\\dfrac{2x}{1-x^2}\\) at \\(x=\\tan\\theta\\)?", answer: "\\(2\\theta = 2\\tan^{-1}x\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\sin^{-1}(3x-4x^3)\\)", answer: "\\(\\dfrac{3}{\\sqrt{1-x^2}}\\)", method: "\\(=3\\sin^{-1}x\\)" },
      ],
      traps: [
        {
          title: "Match the substitution to the argument's shape",
          body:
            "\\(3x-4x^3\\) screams \\(x=\\sin\\theta\\) (it is \\(\\sin 3\\theta\\)); \\(4x^3-3x\\) screams \\(x=\\cos\\theta\\) (it is \\(\\cos 3\\theta\\)); ratios with \\(1+x^2\\)/\\(1-x^2\\) scream \\(x=\\tan\\theta\\). Picking the wrong one buries the simplification.",
        },
        {
          title: "Watch the principal-value branch",
          body:
            "\\(\\sin^{-1}(\\sin\\alpha) = \\alpha\\) only inside \\([-\\pi/2,\\pi/2]\\). When the substituted angle leaves that range — e.g. at \\(x=\\tfrac12\\) in \\(\\sin^{-1}\\!\\frac{2\\cdot 3^x}{1+9^x}\\), where \\(2\\theta = 2\\pi/3 > \\pi/2\\) — the collapse becomes \\(\\pi - \\) (angle), flipping the sign of the derivative.",
        },
        {
          title: "Exponential/log inner functions hide the same shapes",
          body:
            "\\(\\dfrac{2\\log x}{1+(\\log x)^2}\\) is \\(\\sin 2\\phi\\) with \\(\\log x = \\tan\\phi\\), collapsing to \\(2\\tan^{-1}(\\log x)\\). Substitute on the INNER expression (\\(\\log x\\), \\(3^x\\)), then chain the extra inner derivative when differentiating.",
        },
      ],
    },

    // 4 — tan-inverse addition and complementary identities
    {
      kind: "formula" as const,
      slug: "cetdiff-inverse-trig-addition-identities",
      name: "tan inverse Addition and Complementary Identities",
      intuition:
        "A sum of two arctangents whose arguments are ugly fractions often splits into a constant plus a single clean arctan. The arctan addition formula run in reverse pulls a fraction like \\(\\frac{a+x}{1-ax}\\) apart into \\(\\tan^{-1}a + \\tan^{-1}x\\); the constant pieces differentiate to zero, leaving an easy derivative.",
      definition:
        "Two identities do almost all the work here:\n" +
        "- **Arctan addition/subtraction**: \\(\\tan^{-1}x \\pm \\tan^{-1}y = \\tan^{-1}\\!\\dfrac{x \\pm y}{1 \\mp xy}\\) (subject to range/branch). Run it BACKWARDS: a fraction of the shape \\(\\dfrac{a + x}{1 - ax}\\) splits as \\(\\tan^{-1}a + \\tan^{-1}x\\).\n" +
        "- **Complementary identity**: \\(\\sin^{-1}x + \\cos^{-1}x = \\dfrac{\\pi}{2}\\) (constant!), and likewise \\(\\tan^{-1}x + \\cot^{-1}x = \\dfrac{\\pi}{2}\\) and \\(\\sec^{-1}x + \\operatorname{cosec}^{-1}x = \\dfrac{\\pi}{2}\\).\n" +
        "Because a constant has zero derivative, recognising these saves the entire calculation — the answer to 'differentiate \\(\\sin^{-1}x + \\cos^{-1}x\\)' is simply \\(0\\).",
      formula: {
        label: "Arctan addition + complementary pair",
        latex: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\!\\dfrac{x+y}{1-xy}, \\qquad \\sin^{-1}x + \\cos^{-1}x = \\dfrac{\\pi}{2}",
        symbols: [
          { symbol: "1 - xy", meaning: "denominator of the combined argument; sign flips for the subtraction form" },
          { symbol: "\\(\\pi/2\\)", meaning: "the constant a complementary pair collapses to — derivative \\(0\\)" },
        ],
      },
      pyqExampleId: "ad13852e-9e8c-4494-acb1-9416090063f4",
      authoredExample: {
        prompt: "Differentiate \\(y = \\tan^{-1}\\!\\dfrac{1+2x}{1-2x} + \\tan^{-1}\\!\\dfrac{2x}{1-x^2}\\) for small \\(x\\).",
        steps: [
          "First term has the shape \\(\\dfrac{a+x'}{1-ax'}\\): write \\(\\dfrac{1+2x}{1-2x}\\) as \\(\\dfrac{1+2x}{1-(1)(2x)}\\), so it equals \\(\\tan^{-1}1 + \\tan^{-1}(2x) = \\dfrac{\\pi}{4} + \\tan^{-1}(2x)\\).",
          "Second term is the double-angle collapse: \\(\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x\\).",
          "So \\(y = \\dfrac{\\pi}{4} + \\tan^{-1}(2x) + 2\\tan^{-1}x\\). Differentiate (the constant drops): \\(\\dfrac{dy}{dx} = \\dfrac{2}{1+4x^2} + \\dfrac{2}{1+x^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2}{1+4x^2} + \\dfrac{2}{1+x^2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) where \\(y = \\tan^{-1}x + \\cot^{-1}x + \\sin^{-1}(2x)\\).",
        steps: [
          "By the complementary identity, \\(\\tan^{-1}x + \\cot^{-1}x = \\dfrac{\\pi}{2}\\) — a constant.",
          "So \\(y = \\dfrac{\\pi}{2} + \\sin^{-1}(2x)\\); only the last term has a derivative.",
          "\\(\\dfrac{dy}{dx} = 0 + \\dfrac{2}{\\sqrt{1-4x^2}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2}{\\sqrt{1-4x^2}}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{d}{dx}\\big(\\sin^{-1}x + \\cos^{-1}x\\big)\\)", answer: "\\(0\\)", method: "the sum is the constant \\(\\pi/2\\)" },
        { prompt: "Split \\(\\tan^{-1}\\!\\dfrac{2+x}{1-2x}\\) (small \\(x\\)).", answer: "\\(\\tan^{-1}2 + \\tan^{-1}x\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\big(\\tan^{-1}x + \\cot^{-1}x\\big)\\)", answer: "\\(0\\)", method: "constant \\(\\pi/2\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\Big(\\tan^{-1}\\dfrac{3+x}{1-3x}\\Big)\\) (small \\(x\\))", answer: "\\(\\dfrac{1}{1+x^2}\\)", method: "constant \\(+\\tan^{-1}x\\)" },
      ],
      traps: [
        {
          title: "The constant differentiates to zero — but only if you SEE it",
          body:
            "A sum of arctans that collapses to a constant has derivative \\(0\\). Students grind out two quotient-rule derivatives and miss that the whole thing was \\(\\pi/4 + \\) constant. Always test for the addition/complementary pattern first.",
        },
        {
          title: "Mind the \\(1 \\mp xy\\) sign and the validity range",
          body:
            "Addition uses \\(1-xy\\) in the denominator, subtraction uses \\(1+xy\\). The split \\(\\tan^{-1}\\frac{x+y}{1-xy} = \\tan^{-1}x + \\tan^{-1}y\\) is exact only when \\(xy < 1\\); outside that a \\(\\pm\\pi\\) correction appears (a constant, so the derivative is unchanged — but the function value differs).",
        },
      ],
    },

    // 5 — differentiating one inverse-trig wrt another
    {
      kind: "formula" as const,
      slug: "cetdiff-inverse-wrt-inverse",
      name: "Differentiating One Inverse-Trig with Respect to Another",
      intuition:
        "When asked for the derivative of one inverse-trig function WITH RESPECT TO a second one, don't touch \\(x\\). Collapse BOTH functions to constant multiples of the same angle \\(\\theta\\) via one shared substitution; the answer is just the ratio of the two multipliers.",
      definition:
        "To find \\(\\dfrac{du}{dv}\\) where \\(u\\) and \\(v\\) are both inverse-trig in \\(x\\):\n" +
        "- Choose ONE substitution (\\(x = \\sin\\theta\\), \\(\\tan\\theta\\), or \\(\\cos\\theta\\)) that collapses both.\n" +
        "- Suppose it gives \\(u = a\\theta\\) and \\(v = b\\theta\\) (each a constant times the same angle).\n" +
        "- Then \\(\\dfrac{du}{dv} = \\dfrac{du/d\\theta}{dv/d\\theta} = \\dfrac{a}{b}\\) — the \\(d\\theta\\) cancels, so it is simply the **ratio of the angle-multiples**.\n" +
        "This works because both \\(u\\) and \\(v\\) become linear in \\(\\theta\\) after the collapse; the derivative of a constant-times-\\(\\theta\\) is just that constant.",
      formula: {
        label: "Ratio of angle-multiples",
        latex: "\\text{If } u = a\\,\\theta \\text{ and } v = b\\,\\theta, \\text{ then } \\dfrac{du}{dv} = \\dfrac{a}{b}",
        symbols: [
          { symbol: "a, b", meaning: "the constant multiples after each function collapses to a multiple of \\(\\theta\\)" },
          { symbol: "\\(d\\theta\\)", meaning: "cancels in the ratio — never appears in the final answer" },
        ],
      },
      pyqExampleId: "264b2e9f-53db-4324-8f58-154ab674a1af",
      authoredExample: {
        prompt:
          "Find the derivative of \\(\\sin^{-1}(2x\\sqrt{1-x^2})\\) with respect to \\(\\cos^{-1}(4x^3 - 3x)\\) (in the range where both collapse cleanly).",
        steps: [
          "Substitute \\(x = \\sin\\theta\\) for the first (sine multiple-angle): \\(2x\\sqrt{1-x^2} = \\sin 2\\theta\\), so \\(u = \\sin^{-1}(\\sin 2\\theta) = 2\\theta\\). Note \\(\\theta = \\sin^{-1}x\\), consistent.",
          "For the second, \\(4x^3 - 3x = \\cos 3\\phi\\) under \\(x = \\cos\\phi\\), giving \\(v = 3\\phi = 3\\cos^{-1}x\\). To share one angle, use \\(\\sin^{-1}x\\) vs \\(\\cos^{-1}x\\): since \\(\\cos^{-1}x = \\frac{\\pi}{2} - \\sin^{-1}x\\), write \\(v = 3(\\frac{\\pi}{2} - \\theta)\\), so \\(dv/d\\theta = -3\\).",
          "Now \\(u = 2\\theta\\) gives \\(du/d\\theta = 2\\). Ratio: \\(\\dfrac{du}{dv} = \\dfrac{2}{-3} = -\\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\dfrac{du}{dv} = -\\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find the derivative of \\(\\cos^{-1}x\\) with respect to \\(\\sin^{-1}x\\).",
        steps: [
          "Let \\(\\theta = \\sin^{-1}x\\). Then \\(\\cos^{-1}x = \\dfrac{\\pi}{2} - \\theta\\) by the complementary identity.",
          "So \\(u = \\cos^{-1}x = \\frac{\\pi}{2} - \\theta\\) and \\(v = \\sin^{-1}x = \\theta\\).",
          "\\(\\dfrac{du}{dv} = \\dfrac{du/d\\theta}{dv/d\\theta} = \\dfrac{-1}{1} = -1\\).",
        ],
        answer: "\\(\\dfrac{du}{dv} = -1\\)",
      },
      practiceSet: [
        { prompt: "\\(\\sin^{-1}(3x-4x^3)\\) w.r.t. \\(\\sin^{-1}x\\)", answer: "\\(3\\)", method: "first \\(=3\\sin^{-1}x\\); ratio \\(3/1\\)" },
        { prompt: "\\(2\\sin^{-1}x\\) w.r.t. \\(3\\sin^{-1}x\\)", answer: "\\(\\dfrac{2}{3}\\)", method: "ratio of multiples" },
        { prompt: "\\(\\tan^{-1}\\dfrac{2x}{1-x^2}\\) w.r.t. \\(\\tan^{-1}x\\)", answer: "\\(2\\)", method: "first \\(=2\\tan^{-1}x\\)" },
        { prompt: "\\(\\tan^{-1}x\\) w.r.t. \\(\\cot^{-1}x\\)", answer: "\\(-1\\)", method: "\\(\\cot^{-1}x = \\frac{\\pi}{2}-\\tan^{-1}x\\)" },
      ],
      traps: [
        {
          title: "Don't differentiate w.r.t. \\(x\\) separately and then divide blindly",
          body:
            "You CAN compute \\(\\dfrac{du/dx}{dv/dx}\\), but the elegant route is to collapse both to multiples of one angle and take the ratio. The shortcut avoids messy \\(\\sqrt{1-x^2}\\) factors that cancel anyway.",
        },
        {
          title: "Both functions must share ONE angle",
          body:
            "If one collapses with \\(x=\\sin\\theta\\) and the other with \\(x=\\cos\\phi\\), convert via \\(\\cos^{-1}x = \\frac{\\pi}{2}-\\sin^{-1}x\\) so both are in the same \\(\\theta\\). Mixing two different angle variables corrupts the ratio (and can flip the sign).",
        },
      ],
    },

    // 6 — exponentials of inverse-trig functions
    {
      kind: "formula" as const,
      slug: "cetdiff-exp-of-inverse-trig",
      name: "Exponentials of Inverse-Trig Functions",
      intuition:
        "Functions like \\(e^{\\sin^{-1}x}\\) differentiate cleanly with the chain rule. The neat result is that the logarithmic-derivative ratio \\(h'/h\\) drops the exponential entirely, leaving just the derivative of the inner inverse-trig.",
      definition:
        "For \\(h(x) = e^{g(x)}\\) with \\(g\\) an inverse-trig function:\n" +
        "- \\(h'(x) = e^{g(x)}\\cdot g'(x) = h(x)\\,g'(x)\\), so the **logarithmic-derivative ratio** is \\(\\dfrac{h'(x)}{h(x)} = g'(x)\\).\n" +
        "- For \\(h(x) = e^{\\sin^{-1}x}\\): \\(\\dfrac{h'}{h} = \\dfrac{1}{\\sqrt{1-x^2}}\\). For \\(h(x) = e^{\\cos^{-1}x}\\): \\(\\dfrac{h'}{h} = -\\dfrac{1}{\\sqrt{1-x^2}}\\).\n" +
        "- A related monotonicity shape: \\(g(u) = 2\\tan^{-1}(e^u) - \\dfrac{\\pi}{2}\\) has \\(g'(u) = \\dfrac{2e^u}{1+e^{2u}} > 0\\) for all \\(u\\), so it is **strictly increasing**, and \\(g(-u) = -g(u)\\), so it is **odd**.",
      formula: {
        label: "Logarithmic-derivative ratio",
        latex: "h(x) = e^{g(x)} \\;\\Rightarrow\\; \\dfrac{h'(x)}{h(x)} = g'(x)",
        symbols: [
          { symbol: "g(x)", meaning: "the inner inverse-trig exponent (e.g. \\(\\sin^{-1}x\\))" },
          { symbol: "h'/h", meaning: "the exponential cancels, leaving just \\(g'(x)\\)" },
        ],
      },
      pyqExampleId: "72f9d643-555f-461c-9023-9348e01c3437",
      authoredExample: {
        prompt: "If \\(h(x) = e^{\\tan^{-1}x}\\), find \\(\\dfrac{h'(x)}{h(x)}\\), and then \\(h'(x)\\).",
        steps: [
          "Differentiate by the chain rule: \\(h'(x) = e^{\\tan^{-1}x}\\cdot\\dfrac{d}{dx}\\tan^{-1}x = e^{\\tan^{-1}x}\\cdot\\dfrac{1}{1+x^2}\\).",
          "Divide by \\(h(x) = e^{\\tan^{-1}x}\\): the exponential cancels, so \\(\\dfrac{h'(x)}{h(x)} = \\dfrac{1}{1+x^2}\\).",
          "Hence \\(h'(x) = h(x)\\cdot\\dfrac{1}{1+x^2} = \\dfrac{e^{\\tan^{-1}x}}{1+x^2}\\).",
        ],
        answer: "\\(\\dfrac{h'}{h} = \\dfrac{1}{1+x^2}\\); \\(\\;h'(x) = \\dfrac{e^{\\tan^{-1}x}}{1+x^2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(h(x) = e^{\\cos^{-1}x}\\), find \\(\\dfrac{h'(x)}{h(x)}\\).",
        steps: [
          "\\(h'(x) = e^{\\cos^{-1}x}\\cdot\\dfrac{d}{dx}\\cos^{-1}x = e^{\\cos^{-1}x}\\cdot\\left(-\\dfrac{1}{\\sqrt{1-x^2}}\\right)\\).",
          "Divide by \\(h(x)\\): the exponential cancels.",
        ],
        answer: "\\(\\dfrac{h'(x)}{h(x)} = -\\dfrac{1}{\\sqrt{1-x^2}}\\)",
      },
      practiceSet: [
        { prompt: "\\(h(x)=e^{\\sin^{-1}x}\\). Find \\(h'/h\\).", answer: "\\(\\dfrac{1}{\\sqrt{1-x^2}}\\)" },
        { prompt: "\\(\\dfrac{d}{dx}e^{\\tan^{-1}x}\\)", answer: "\\(\\dfrac{e^{\\tan^{-1}x}}{1+x^2}\\)", method: "\\(h\\cdot g'\\)" },
        { prompt: "Is \\(g(u)=2\\tan^{-1}(e^u)-\\frac{\\pi}{2}\\) increasing or decreasing?", answer: "increasing", method: "\\(g'(u)=\\frac{2e^u}{1+e^{2u}}>0\\)" },
        { prompt: "Is \\(g(u)=2\\tan^{-1}(e^u)-\\frac{\\pi}{2}\\) odd or even?", answer: "odd", method: "\\(g(-u)=-g(u)\\)" },
      ],
      traps: [
        {
          title: "\\(h'/h\\) strips the exponential — don't carry it",
          body:
            "Because \\(h'(x) = h(x)\\,g'(x)\\), the ratio \\(h'/h\\) is just \\(g'(x)\\) with no \\(e^{(\\cdots)}\\) left. Distractors keep the exponential in the answer; the clean ratio doesn't.",
        },
        {
          title: "The sign comes from the inner inverse-trig",
          body:
            "\\(e^{\\sin^{-1}x}\\) gives \\(+\\frac{1}{\\sqrt{1-x^2}}\\); \\(e^{\\cos^{-1}x}\\) gives \\(-\\frac{1}{\\sqrt{1-x^2}}\\). The exponential is always positive, so the sign is decided entirely by \\(g'(x)\\).",
        },
        {
          title: "For monotonicity, check the SIGN of \\(g'\\), not its messiness",
          body:
            "\\(g'(u) = \\frac{2e^u}{1+e^{2u}}\\) looks complicated, but \\(e^u>0\\) and the denominator \\(>0\\), so \\(g'>0\\) everywhere — strictly increasing. You don't need to simplify further to conclude monotonicity.",
        },
      ],
    },
  ],
};
