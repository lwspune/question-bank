import type { SubtopicNote } from "@/app/notes/_types";

export const LOGARITHMIC_NOTE: SubtopicNote = {
  subtopicName: "Logarithmic Differentiation",
  title: "Logarithmic Differentiation — Logs, Powers, and Long Products",
  oneLineDefinition:
    "When a function is a product, a quotient, or has a variable in the exponent, take the natural log of both sides FIRST — logs turn products into sums and pull exponents down front, so the differentiation becomes routine.",
  whyItMatters:
    "This is the most mechanical high-yield method in the chapter — 19 PYQs sit here, 9 HARD and 10 MODERATE, yet almost every one follows the SAME three steps. " +
    "Two shapes dominate the exam: a variable raised to a variable power like (sin x) to the tan x, and a long product (x+1)(2x+1)…(nx+1) whose derivative is asked at x = 0. " +
    "Master the three steps — take log, differentiate (1/y)·y′, multiply back by y — and most of these become one-minute questions.",
  concepts: [
    // 1 — the method (foundation + f^g formula), featured PYQ (sin x)^{tan x}
    {
      kind: "formula" as const,
      slug: "cetdiff-log-diff-method",
      name: "Logarithmic Differentiation — the Method",
      intuition:
        "If \\(y\\) is a product, a quotient, or — crucially — has a variable in BOTH the base and the exponent, the ordinary power rule and chain rule do not apply directly. " +
        "Taking the natural log of both sides first turns multiplication into addition and pulls exponents down as multipliers, after which differentiation is straightforward.",
      definition:
        "The three-step method for \\(y = f(x)\\):\n" +
        "- **Take logs:** write \\(\\log y = \\log f(x)\\) and simplify using log laws (\\(\\log(ab)=\\log a+\\log b\\), \\(\\log(a^p)=p\\log a\\)).\n" +
        "- **Differentiate both sides:** the left becomes \\(\\dfrac{1}{y}\\dfrac{dy}{dx}\\) (chain rule), the right is now a sum.\n" +
        "- **Multiply back by \\(y\\):** \\(\\dfrac{dy}{dx} = y\\cdot[\\text{the differentiated right side}]\\).\n\n" +
        "The headline result is the **variable-base, variable-exponent** rule below — both the \"treat the exponent as constant\" term and the \"treat the base as constant\" term appear and ADD.",
      formula: {
        label: "Derivative of f(x) raised to g(x)",
        latex:
          "\\frac{d}{dx}\\left[f(x)^{g(x)}\\right] = f(x)^{g(x)}\\left[g'(x)\\,\\log f(x) + g(x)\\,\\frac{f'(x)}{f(x)}\\right]",
        symbols: [
          { symbol: "g'(x)\\,\\log f(x)", meaning: "the term from differentiating the exponent (treat base as constant)" },
          { symbol: "g(x)\\,f'(x)/f(x)", meaning: "the term from differentiating the base (treat exponent as constant)" },
        ],
      },
      authoredExample: {
        prompt: "If \\(y = x^x\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take logs: \\(\\log y = x\\log x\\).",
          "Differentiate both sides; use the product rule on the right: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = 1\\cdot\\log x + x\\cdot\\dfrac{1}{x} = \\log x + 1\\).",
          "Multiply back by \\(y = x^x\\): \\(\\dfrac{dy}{dx} = x^x(\\log x + 1)\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = x^x(1 + \\log x)\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = (\\cos x)^x\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take logs: \\(\\log y = x\\log(\\cos x)\\).",
          "Differentiate (product rule): \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\log(\\cos x) + x\\cdot\\dfrac{-\\sin x}{\\cos x} = \\log(\\cos x) - x\\tan x\\).",
          "Multiply back: \\(\\dfrac{dy}{dx} = (\\cos x)^x[\\log(\\cos x) - x\\tan x]\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = (\\cos x)^x[\\log(\\cos x) - x\\tan x]\\)",
      },
      practiceSet: [
        { prompt: "\\(y = x^2\\) — does this need logs?", answer: "No — use the power rule: \\(2x\\).", method: "logs are only for variable exponents or long products" },
        { prompt: "\\(y = 2^x\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(2^x\\log 2\\)", method: "constant base, variable exponent" },
        { prompt: "\\(y = x^{\\log x}\\). State \\(\\log y\\) after taking logs.", answer: "\\(\\log y = (\\log x)^2\\)", method: "\\(\\log(x^{\\log x}) = \\log x\\cdot\\log x\\)" },
        { prompt: "Differentiate the exponent of \\(x^x\\) only: \\(\\dfrac{d}{dx}(x\\log x)\\).", answer: "\\(1 + \\log x\\)", method: "product rule" },
      ],
      pyqExampleId: "32990241-fcd9-4192-9f41-6bc0672b713c",
      traps: [
        {
          title: "Both terms appear — never use just one",
          body:
            "For \\(f^g\\), the \"power rule\" alone (\\(g f^{g-1}f'\\)) and the \"exponential rule\" alone (\\(f^g\\log f\\cdot g'\\)) are each HALF the answer. Logarithmic differentiation produces BOTH terms and adds them. Using only one is the single most common error here.",
        },
        {
          title: "A variable in the exponent kills the power rule",
          body:
            "\\(\\dfrac{d}{dx}(x^x)\\) is NOT \\(x\\cdot x^{x-1}\\). The power rule \\(\\dfrac{d}{dx}x^n = nx^{n-1}\\) requires \\(n\\) to be CONSTANT. When the exponent itself depends on \\(x\\), take logs.",
        },
        {
          title: "cos⁻¹(sin θ) collapses before you differentiate",
          body:
            "In mixed stems like \\(\\cos^{-1}(\\sin\\theta) + x^x\\), use \\(\\cos^{-1}(\\sin\\theta) = \\tfrac{\\pi}{2} - \\theta\\) (for \\(\\theta\\in[0,\\tfrac{\\pi}{2}]\\)) to flatten the inverse-trig piece to a simple \\(-\\theta'\\); only the \\(x^x\\) part needs log differentiation. Mixing the two methods up wastes time.",
        },
      ],
    },

    // 2 — products / quotients / fractional powers via logs
    {
      kind: "formula" as const,
      slug: "cetdiff-products-quotients-powers",
      name: "Products, Quotients and Powers via Logs",
      intuition:
        "When \\(y\\) is a tangle of products, quotients, and fractional powers, taking logs once flattens the whole thing into a SUM of simple \\(\\log\\) terms. Each term differentiates to \\(\\dfrac{(\\text{inner})'}{\\text{inner}}\\), and you read off \\(dy/dx\\) almost by inspection.",
      definition:
        "After \\(\\log y = \\log(\\text{everything})\\), use the three log laws to split:\n" +
        "- **Product** \\(\\to\\) sum: \\(\\log(ab) = \\log a + \\log b\\).\n" +
        "- **Quotient** \\(\\to\\) difference: \\(\\log(a/b) = \\log a - \\log b\\).\n" +
        "- **Power** \\(\\to\\) coefficient: \\(\\log(a^p) = p\\log a\\) (so a fractional exponent \\(4/3\\) becomes a coefficient \\(4/3\\)).\n\n" +
        "Each resulting \\(\\log u(x)\\) differentiates to \\(\\dfrac{u'(x)}{u(x)}\\); then multiply the whole sum by \\(y\\). " +
        "If the function is **already** wrapped in a log (\\(y = \\log(\\cdots)\\)), you do NOT have a hidden \\(1/y\\) — just expand the inside with log laws and differentiate the sum directly.",
      formula: {
        label: "Log of a power-product",
        latex:
          "\\log\\!\\left(\\frac{a^{p}\\,b^{q}}{c^{r}}\\right) = p\\log a + q\\log b - r\\log c",
      },
      authoredExample: {
        prompt: "If \\(y = \\dfrac{x^2\\sqrt{x-1}}{(x+2)^3}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take logs and split: \\(\\log y = 2\\log x + \\tfrac{1}{2}\\log(x-1) - 3\\log(x+2)\\).",
          "Differentiate term-by-term: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{2}{x} + \\dfrac{1}{2(x-1)} - \\dfrac{3}{x+2}\\).",
          "Multiply back by \\(y\\): \\(\\dfrac{dy}{dx} = \\dfrac{x^2\\sqrt{x-1}}{(x+2)^3}\\left[\\dfrac{2}{x} + \\dfrac{1}{2(x-1)} - \\dfrac{3}{x+2}\\right]\\).",
        ],
        answer:
          "\\(\\dfrac{dy}{dx} = \\dfrac{x^2\\sqrt{x-1}}{(x+2)^3}\\left[\\dfrac{2}{x} + \\dfrac{1}{2(x-1)} - \\dfrac{3}{x+2}\\right]\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(y = \\log\\!\\left(\\dfrac{x^3(2x+1)^4}{(x-3)^5}\\right)\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Expand with log laws (no \\(1/y\\) — \\(y\\) is already a log): \\(y = 3\\log x + 4\\log(2x+1) - 5\\log(x-3)\\).",
          "Differentiate each: \\(\\dfrac{dy}{dx} = \\dfrac{3}{x} + 4\\cdot\\dfrac{2}{2x+1} - 5\\cdot\\dfrac{1}{x-3}\\).",
          "Tidy: \\(\\dfrac{3}{x} + \\dfrac{8}{2x+1} - \\dfrac{5}{x-3}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{3}{x} + \\dfrac{8}{2x+1} - \\dfrac{5}{x-3}\\)",
      },
      practiceSet: [
        { prompt: "\\(y = x^4(x+1)^2\\). State \\(\\log y\\).", answer: "\\(4\\log x + 2\\log(x+1)\\)", method: "product \\(\\to\\) sum" },
        { prompt: "Differentiate \\(\\log(3x-4)\\).", answer: "\\(\\dfrac{3}{3x-4}\\)", method: "\\(u'/u\\) with \\(u=3x-4\\)" },
        { prompt: "Coefficient of \\(\\log(x+5)\\) after \\(\\log\\) of \\((x+5)^{4/3}\\)?", answer: "\\(\\tfrac{4}{3}\\)", method: "power \\(\\to\\) coefficient" },
        { prompt: "\\(y = \\log\\!\\dfrac{x}{x+1}\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(\\dfrac{1}{x} - \\dfrac{1}{x+1}\\)", method: "\\(\\log x - \\log(x+1)\\)" },
      ],
      pyqExampleId: "38b052e3-e01f-4243-b738-6da3ac45508e",
      traps: [
        {
          title: "If y is already a log, there is no 1/y",
          body:
            "For \\(y = \\log(\\text{expression})\\), expand the inside with log laws and differentiate the SUM directly. The \\(\\dfrac{1}{y}\\dfrac{dy}{dx}\\) form is only for \\(\\log y = \\cdots\\) (i.e. you took the log yourself).",
        },
        {
          title: "Simplify before you differentiate — \\(\\log\\sqrt{\\frac{1+\\sin x}{1-\\sin x}}\\)",
          body:
            "Some quotient-log stems collapse to a tidy single function. \\(\\log\\sqrt{\\tfrac{1+\\sin x}{1-\\sin x}} = \\log\\tan\\!\\left(\\tfrac{\\pi}{4}+\\tfrac{x}{2}\\right)\\), whose derivative is the clean \\(\\sec x\\). Charging in with the quotient rule on the raw fraction works but is far slower and error-prone.",
        },
        {
          title: "A fractional exponent becomes a fractional COEFFICIENT",
          body:
            "\\(\\log[(x+5)^{4/3}] = \\tfrac{4}{3}\\log(x+5)\\), not \\(\\tfrac{4}{3}(x+5)\\) and not \\((x+5)^{4/3}\\log\\). Drop the exponent out front; do not leave it on the argument.",
        },
      ],
    },

    // 3 — the signature product-chain-at-zero pattern
    {
      kind: "formula" as const,
      slug: "cetdiff-product-chain-at-zero",
      name: "The Product Chain [(x+1)(2x+1)⋯(nx+1)] Evaluated at x=0",
      intuition:
        "This is the chapter's signature trick. A long product like \\([(x+1)(2x+1)\\cdots(nx+1)]^p\\) looks frightening, but logs turn it into a sum and the magic happens AT \\(x=0\\): every factor \\(kx+1\\) equals \\(1\\) there, so \\(y=1\\) and the messy denominators all collapse, leaving a simple sum like \\(\\sum k\\) or \\(\\sum k^2\\).",
      definition:
        "For \\(y = [(x+1)(2x+1)(3x+1)\\cdots(nx+1)]^{p}\\):\n" +
        "- Take logs: \\(\\log y = p\\sum_{k=1}^{n}\\log(kx+1)\\).\n" +
        "- Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = p\\sum_{k=1}^{n}\\dfrac{k}{kx+1}\\).\n" +
        "- Evaluate at \\(x=0\\): every \\(kx+1=1\\) so \\(y=1\\) and \\(\\dfrac{dy}{dx} = p\\sum_{k=1}^{n}k\\).\n\n" +
        "The leftover sum is a standard power-sum (carried in the formula box). If the \\(k\\)-th factor is \\(k^2x+1\\) instead, you get \\(\\sum k^2\\). " +
        "If the product runs \\((1-x)(2-x)\\cdots(n-x)\\) and you evaluate at \\(x=1\\), only the vanishing factor's term survives — handle that by factoring it out, not by the sum.",
      formula: {
        label: "Power sums (the leftover at x=0)",
        latex:
          "\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2} \\qquad \\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}",
        symbols: [
          { symbol: "p", meaning: "the outer power (e.g. \\(2\\), \\(4\\), \\(3/2\\), or \\(n\\)) — it just multiplies the sum" },
          { symbol: "k", meaning: "the coefficient of \\(x\\) in the \\(k\\)-th factor; squared factors give \\(\\sum k^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(y = (1+2x)(1+5x)(1+7x)\\), find \\(\\dfrac{dy}{dx}\\) at \\(x=0\\).",
        steps: [
          "There is no outer power here (\\(p=1\\)). Take logs: \\(\\log y = \\log(1+2x) + \\log(1+5x) + \\log(1+7x)\\).",
          "Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\dfrac{2}{1+2x} + \\dfrac{5}{1+5x} + \\dfrac{7}{1+7x}\\).",
          "At \\(x=0\\): every factor is \\(1\\), so \\(y=1\\) and the sum is \\(2+5+7=14\\) — note you simply add the coefficients of \\(x\\).",
          "Therefore \\(\\dfrac{dy}{dx}\\Big|_{0} = 14\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx}\\Big|_{x=0} = 14\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(y = (1+x)(1+4x)(1+9x)(1+16x)\\), find \\(\\dfrac{dy}{dx}\\) at \\(x=0\\).",
        steps: [
          "No outer power. At \\(x=0\\) every factor is \\(1\\), so \\(y=1\\) and \\(\\dfrac{dy}{dx}\\) is the sum of the \\(x\\)-coefficients.",
          "Coefficients are the squares \\(1, 4, 9, 16\\): \\(\\dfrac{dy}{dx} = 1+4+9+16 = \\sum_{k=1}^{4}k^2 = \\dfrac{4\\cdot5\\cdot9}{6} = 30\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx}\\Big|_{x=0} = 30\\)",
      },
      practiceSet: [
        { prompt: "\\(y=[(x+1)(2x+1)\\cdots(nx+1)]^2\\) at \\(x=0\\).", answer: "\\(n(n+1)\\)", method: "\\(2\\cdot\\tfrac{n(n+1)}{2}\\)" },
        { prompt: "Same product to the power \\(4\\), at \\(x=0\\).", answer: "\\(2n(n+1)\\)", method: "\\(4\\cdot\\tfrac{n(n+1)}{2}\\)" },
        { prompt: "\\(y=(x+1)(4x+1)(9x+1)\\cdots\\) with \\((k^2x+1)\\), squared, at \\(x=0\\).", answer: "\\(\\dfrac{n(n+1)(2n+1)}{3}\\)", method: "\\(2\\sum k^2\\)" },
        { prompt: "\\(y=(1+x)(1+x^2)(1+x^4)\\cdots\\) at \\(x=0\\).", answer: "\\(1\\)", method: "only the \\((1+x)\\) factor contributes \\(1\\); the rest give \\(0\\)" },
      ],
      pyqExampleId: "4a368943-2e9d-4c0a-9147-caf3c1124b5f",
      traps: [
        {
          title: "Substitute x=0 only AFTER differentiating",
          body:
            "If you plug \\(x=0\\) into \\(y\\) before differentiating, you get the constant \\(1\\) and derivative \\(0\\) — wrong. Differentiate the log-sum fully (keep \\(x\\)), THEN set \\(x=0\\) so the denominators collapse to \\(1\\).",
        },
        {
          title: "Squared factor \\(\\Rightarrow\\) \\(\\sum k^2\\), not \\(\\sum k\\)",
          body:
            "If the \\(k\\)-th factor is \\(k^2x+1\\) (i.e. \\(1, 4x+1, 9x+1,\\ldots\\)), differentiating \\(\\log(k^2x+1)\\) gives \\(\\dfrac{k^2}{k^2x+1}\\), so the leftover sum is \\(\\sum k^2 = \\tfrac{n(n+1)(2n+1)}{6}\\). Don't reflexively write \\(\\sum k\\).",
        },
        {
          title: "Product like (1-x)(2-x)⋯(n-x) at x=1 — factor, don't sum",
          body:
            "When a factor itself VANISHES at the evaluation point (here \\((1-x)=0\\) at \\(x=1\\)), the \\(\\dfrac{1}{y}y'\\) form blows up. Instead write \\(y=(1-x)\\,g(x)\\); then \\(y'(1) = -1\\cdot g(1)\\), where \\(g(1)\\) is the product of the remaining factors at \\(x=1\\).",
        },
        {
          title: "The outer power just multiplies the sum",
          body:
            "A power \\(3/2\\) or \\(n\\) on the whole product becomes a coefficient \\(p\\) in \\(\\log y = p\\sum\\log(\\cdots)\\). So the answer is always \\(p\\sum k\\) (or \\(p\\sum k^2\\)) — e.g. power \\(3/2\\) gives \\(\\tfrac{3}{2}\\cdot\\tfrac{n(n+1)}{2} = \\tfrac{3n(n+1)}{4}\\).",
        },
      ],
    },

    // 4 — change of base / log-of-a-log
    {
      kind: "formula" as const,
      slug: "cetdiff-change-of-base-log",
      name: "Change of Base and log-of-a-log Forms",
      intuition:
        "A logarithm with a VARIABLE base — like \\(\\log_{\\sin x}(\\tan x)\\) — can't be differentiated as is. Change it to natural logs first via \\(\\log_a b = \\dfrac{\\log b}{\\log a}\\); now both top and bottom are ordinary logs and the quotient rule finishes the job.",
      definition:
        "**Change of base:** \\(\\log_a b = \\dfrac{\\log b}{\\log a}\\) (any common base; use natural \\(\\log\\)). " +
        "This converts a variable-base logarithm into a QUOTIENT of two natural logs, after which differentiate by the quotient rule. " +
        "**Nested form:** \\(\\log_{x^2}(\\log x) = \\dfrac{\\log(\\log x)}{\\log(x^2)} = \\dfrac{\\log(\\log x)}{2\\log x}\\); differentiate this quotient, then evaluate. " +
        "Many of these are asked at a clean point (\\(x = \\tfrac{\\pi}{4}\\), \\(x = e\\)) where one of the two log terms vanishes, killing half the quotient-rule expression.",
      formula: {
        label: "Change of base",
        latex: "\\log_a b = \\frac{\\log b}{\\log a}",
        symbols: [
          { symbol: "\\log", meaning: "natural log (base \\(e\\)) throughout this chapter" },
          { symbol: "a", meaning: "the base — when it depends on \\(x\\), this is why you must convert" },
        ],
      },
      authoredExample: {
        prompt: "If \\(y = \\log_{x}(e)\\), find \\(\\dfrac{dy}{dx}\\) for \\(x>0,\\ x\\neq 1\\).",
        steps: [
          "Change base: \\(y = \\dfrac{\\log e}{\\log x} = \\dfrac{1}{\\log x}\\) (since \\(\\log e = 1\\)).",
          "Write as \\((\\log x)^{-1}\\) and differentiate: \\(\\dfrac{dy}{dx} = -1\\cdot(\\log x)^{-2}\\cdot\\dfrac{1}{x}\\).",
          "Tidy: \\(\\dfrac{dy}{dx} = -\\dfrac{1}{x(\\log x)^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{1}{x(\\log x)^2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(x) = \\log_{x^2}(\\log x)\\), find \\(f'(x)\\) at \\(x=e\\).",
        steps: [
          "Change base: \\(f(x) = \\dfrac{\\log(\\log x)}{\\log(x^2)} = \\dfrac{\\log(\\log x)}{2\\log x}\\).",
          "At \\(x=e\\): \\(\\log x = 1\\) so the numerator \\(\\log(\\log x) = \\log 1 = 0\\), and the denominator is \\(2\\). The quotient-rule term carrying the \\(0\\) numerator drops.",
          "The surviving term gives \\(f'(e) = \\dfrac{(1/(\\log x))\\cdot(1/x)}{2\\log x}\\Big|_{x=e} = \\dfrac{(1)(1/e)}{2} = \\dfrac{1}{2e}\\).",
        ],
        answer: "\\(f'(e) = \\dfrac{1}{2e}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\log_{\\sin x}(\\tan x)\\) with natural logs.", answer: "\\(\\dfrac{\\log\\tan x}{\\log\\sin x}\\)", method: "change of base" },
        { prompt: "Value of \\(\\log\\tan(\\pi/4)\\)?", answer: "\\(0\\)", method: "\\(\\tan(\\pi/4)=1,\\ \\log 1 = 0\\)" },
        { prompt: "Simplify \\(\\log_{x^2}(\\log x)\\) denominator.", answer: "\\(2\\log x\\)", method: "\\(\\log(x^2)=2\\log x\\)" },
        { prompt: "\\(\\log_a a = ?\\)", answer: "\\(1\\)", method: "\\(\\dfrac{\\log a}{\\log a}\\)" },
      ],
      pyqExampleId: "f2e27584-4537-42a5-a355-3aa7ce445697",
      traps: [
        {
          title: "Convert the variable base BEFORE differentiating",
          body:
            "\\(\\dfrac{d}{dx}\\log_{\\sin x}(\\tan x)\\) cannot be done with the \\(\\dfrac{1}{u}\\) rule directly — the base \\(\\sin x\\) is not constant. Always rewrite as \\(\\dfrac{\\log\\tan x}{\\log\\sin x}\\) first, then use the quotient rule.",
        },
        {
          title: "A vanishing log term kills half the quotient rule",
          body:
            "At nice points (\\(x=\\pi/4\\) gives \\(\\log\\tan x = 0\\); \\(x=e\\) gives \\(\\log\\log x = 0\\)), the quotient-rule term multiplying that zero disappears. Spot the vanishing term FIRST — it saves most of the algebra. The bank answer for \\(\\log_{\\sin x}\\tan x\\) at \\(\\pi/4\\) is \\(-4\\log 2\\).",
        },
        {
          title: "log of a log is NOT (log)²",
          body:
            "\\(\\log(\\log x)\\) is a composition (log applied to \\(\\log x\\)), with derivative \\(\\dfrac{1}{\\log x}\\cdot\\dfrac{1}{x}\\). It is not \\((\\log x)^2\\), whose derivative would be \\(2\\log x\\cdot\\tfrac{1}{x}\\). Keep the two straight.",
        },
      ],
    },

    // 5 — sqrt quotient with inverse-trig argument
    {
      kind: "formula" as const,
      slug: "cetdiff-log-diff-sqrt-quotient",
      name: "Square-Root Quotients with Inverse-Trig Arguments",
      intuition:
        "A function like \\(\\sqrt{\\dfrac{1-\\sin^{-1}x}{1+\\sin^{-1}x}}\\) bundles a square root, a quotient, and an inverse-trig term. Logs flatten all three at once: the \\(\\sqrt{\\ }\\) becomes a \\(\\tfrac{1}{2}\\) coefficient and the quotient becomes a difference, leaving a short sum to differentiate and evaluate.",
      definition:
        "For \\(y = \\sqrt{\\dfrac{1 - u}{1 + u}}\\) where \\(u = u(x)\\) (e.g. \\(u = \\sin^{-1}x\\)):\n" +
        "- Take logs and use the square root \\(\\to\\) \\(\\tfrac{1}{2}\\): \\(\\log y = \\tfrac{1}{2}[\\log(1-u) - \\log(1+u)]\\).\n" +
        "- Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\tfrac{1}{2}\\left[\\dfrac{-u'}{1-u} - \\dfrac{u'}{1+u}\\right]\\).\n" +
        "- Multiply back by \\(y\\) and evaluate at the given point.\n\n" +
        "When asked at \\(x=0\\), note \\(\\sin^{-1}0 = 0\\), so \\(u=0\\), \\(y=1\\), and \\(u' = \\dfrac{1}{\\sqrt{1-x^2}} = 1\\) at \\(x=0\\) — the whole expression collapses to a single clean number.",
      formula: {
        label: "Log of a square-root quotient",
        latex: "\\log\\sqrt{\\frac{1-u}{1+u}} = \\frac{1}{2}\\Big[\\log(1-u) - \\log(1+u)\\Big]",
        symbols: [
          { symbol: "u", meaning: "the inner function, e.g. \\(\\sin^{-1}x\\), with \\(u' = 1/\\sqrt{1-x^2}\\)" },
          { symbol: "1/2", meaning: "the coefficient produced by the outer square root" },
        ],
      },
      authoredExample: {
        prompt: "If \\(y = \\sqrt{\\dfrac{1-x}{1+x}}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take logs: \\(\\log y = \\tfrac{1}{2}[\\log(1-x) - \\log(1+x)]\\).",
          "Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\tfrac{1}{2}\\left[\\dfrac{-1}{1-x} - \\dfrac{1}{1+x}\\right] = \\tfrac{1}{2}\\cdot\\dfrac{-(1+x)-(1-x)}{(1-x)(1+x)} = \\dfrac{-1}{1-x^2}\\).",
          "Multiply back by \\(y = \\sqrt{\\tfrac{1-x}{1+x}}\\): \\(\\dfrac{dy}{dx} = -\\dfrac{1}{1-x^2}\\sqrt{\\dfrac{1-x}{1+x}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{1}{1-x^2}\\sqrt{\\dfrac{1-x}{1+x}}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = \\sqrt{\\dfrac{1-\\log x}{1+\\log x}}\\), find \\(\\dfrac{dy}{dx}\\) at \\(x=1\\).",
        steps: [
          "Let \\(u = \\log x\\), so \\(u' = \\dfrac{1}{x}\\), and at \\(x=1\\): \\(u=0,\\ u'=1,\\ y=1\\).",
          "Take logs: \\(\\log y = \\tfrac{1}{2}[\\log(1-u) - \\log(1+u)]\\). Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\tfrac{1}{2}u'\\left[\\dfrac{-1}{1-u} - \\dfrac{1}{1+u}\\right]\\).",
          "At \\(x=1\\): \\(\\dfrac{dy}{dx} = 1\\cdot\\tfrac{1}{2}(1)\\left[-1 - 1\\right] = -1\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx}\\Big|_{x=1} = -1\\)",
      },
      practiceSet: [
        { prompt: "Value of \\(\\sin^{-1}0\\)?", answer: "\\(0\\)", method: "needed so \\(u=0,\\ y=1\\) at \\(x=0\\)" },
        { prompt: "Value of \\(\\dfrac{d}{dx}\\sin^{-1}x\\) at \\(x=0\\)?", answer: "\\(1\\)", method: "\\(1/\\sqrt{1-x^2}=1\\) at \\(0\\)" },
        { prompt: "Coefficient from the outer \\(\\sqrt{\\ }\\) after taking logs?", answer: "\\(\\tfrac{1}{2}\\)", method: "\\(\\log\\sqrt{A} = \\tfrac12\\log A\\)" },
        { prompt: "\\(y=\\sqrt{\\tfrac{1-\\sin^{-1}x}{1+\\sin^{-1}x}}\\) at \\(x=0\\).", answer: "\\(-1\\)", method: "same method, sign flips vs the \\(+\\) version" },
      ],
      pyqExampleId: "b125a0c1-9953-4387-bc6a-82dcfc123390",
      traps: [
        {
          title: "Don't forget the chain factor u' on the inverse-trig inner",
          body:
            "When \\(u = \\sin^{-1}x\\), each \\(\\log(1\\pm u)\\) differentiates to \\(\\dfrac{\\pm u'}{1\\pm u}\\) with \\(u' = \\dfrac{1}{\\sqrt{1-x^2}}\\). Dropping the \\(u'\\) (treating \\(u\\) as \\(x\\)) is a frequent error; at \\(x=0\\) it happens to equal \\(1\\), but you must include it in general.",
        },
        {
          title: "Compute y at the point — usually y=1 at x=0",
          body:
            "You multiply \\(\\dfrac{1}{y}y'\\) by \\(y\\) to finish. At \\(x=0\\) the quotient under the root is \\(\\tfrac{1}{1}=1\\), so \\(y=1\\) and the multiply-back is trivial. Forgetting to put \\(y\\) back (leaving only \\(\\tfrac{1}{y}y'\\)) gives the wrong magnitude when \\(y\\neq 1\\).",
        },
        {
          title: "Watch which factor is on top — it sets the sign",
          body:
            "\\(\\sqrt{\\tfrac{1-\\sin^{-1}x}{1+\\sin^{-1}x}}\\) gives \\(-1\\) at \\(x=0\\); flipping to \\(\\sqrt{\\tfrac{1+\\sin^{-1}x}{1-\\sin^{-1}x}}\\) gives \\(+1\\). The numerator/denominator order flips every sign — read the stem carefully before reaching for a memorised answer.",
        },
      ],
    },
  ],
};
