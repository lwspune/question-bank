import type { SubtopicNote } from "@/app/notes/_types";

export const CORE_TECHNIQUES_NOTE: SubtopicNote = {
  subtopicName:
    "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions",
  title: "Core Techniques — Standard Derivatives, Rules, Chain & Logarithmic",
  oneLineDefinition:
    "The everyday toolkit: the derivative as a limit, the standard-derivative table, the product/quotient/chain rules, and logarithmic differentiation for variable exponents.",
  whyItMatters:
    "This subtopic carries the bulk of the chapter. Almost every question is 'recognise which tool applies' — a standard derivative, the chain rule, log-differentiation for a power tower, or a simplify-first move on an inverse-trig mess. Get these reflexes right and most of Differentiation becomes mechanical.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "diff-first-principles",
      name: "The derivative as a limit (first principles)",
      intuition:
        "The derivative is the **limit of the slope** of a chord as its two points slide together — the instantaneous rate of change. Every rule below is a shortcut for this one limit, so a question that writes the limit out is really just asking for the derivative.",
      definition:
        "\\(f'(x) = \\lim_{h\\to 0}\\dfrac{f(x+h)-f(x)}{h}\\) — the slope of the tangent at \\(x\\). Equivalently \\(f'(a)=\\lim_{x\\to a}\\dfrac{f(x)-f(a)}{x-a}\\). Geometrically it is the slope of the tangent line; physically, a rate of change.",
      formula: {
        label: "First-principles definition",
        latex: "f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}",
      },
      visualizationSlug: "diff-tangent-slope",
      authoredExample: {
        prompt: "Find \\(f'(x)\\) for \\(f(x)=x^2\\) from first principles.",
        steps: [
          "\\(f'(x)=\\lim_{h\\to 0}\\dfrac{(x+h)^2 - x^2}{h}=\\lim_{h\\to 0}\\dfrac{2xh + h^2}{h}\\).",
          "Cancel \\(h\\): \\(\\lim_{h\\to 0}(2x + h) = 2x\\).",
        ],
        answer: "\\(f'(x)=2x\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(g(x)=\\sqrt{25-x^2}\\), what does \\(\\lim_{x\\to 1}\\dfrac{g(x)-g(1)}{x-1}\\) equal?",
        steps: [
          "This is the definition of \\(g'(1)\\).",
          "\\(g'(x)=\\dfrac{-x}{\\sqrt{25-x^2}}\\); at \\(x=1\\): \\(\\dfrac{-1}{\\sqrt{24}}\\).",
        ],
        answer: "\\(g'(1) = -\\dfrac{1}{2\\sqrt{6}}\\).",
      },
      practiceSet: [
        { prompt: "First-principles definition of \\(f'(x)\\)?", answer: "\\(\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\)" },
        { prompt: "Geometric meaning of \\(f'(a)\\)?", answer: "Slope of the tangent at \\(x=a\\)" },
        { prompt: "\\(\\lim_{x\\to a}\\frac{f(x)-f(a)}{x-a}\\) is?", answer: "\\(f'(a)\\)" },
        { prompt: "From first principles, derivative of \\(x^2\\)?", answer: "\\(2x\\)" },
      ],
      pyqExampleId: "41158a28-ad41-4eaf-a107-cb3a39162602", // 2017 — l1=d/dx(e^sinx), l2=limit def
    },

    {
      kind: "reference" as const,
      slug: "diff-standard-derivatives",
      name: "Standard derivatives to memorise",
      intuition:
        "A fixed table of derivatives underlies everything. Know it cold — power, trig, exponential, logarithmic, and inverse-trig — so that the rules below just stitch these together. Most EASY marks are a single lookup from this table.",
      definition:
        "Memorise these; the rules (product, quotient, chain) combine them. Angles are in **radians** — a degree argument must be converted first.",
      table: {
        columns: ["Function f(x)", "Derivative f′(x)"],
        rows: [
          { cells: ["\\(x^n\\)", "\\(n\\,x^{n-1}\\)"] },
          { cells: ["\\(\\sin x\\)", "\\(\\cos x\\)"] },
          { cells: ["\\(\\cos x\\)", "\\(-\\sin x\\)"] },
          { cells: ["\\(\\tan x\\)", "\\(\\sec^2 x\\)"] },
          { cells: ["\\(\\sec x\\)", "\\(\\sec x\\tan x\\)"] },
          { cells: ["\\(e^x\\)", "\\(e^x\\)"] },
          { cells: ["\\(a^x\\)", "\\(a^x\\ln a\\)"], noteAmber: "The \\(\\ln a\\) factor is the most-forgotten part of the table." },
          { cells: ["\\(\\ln x\\)", "\\(\\dfrac{1}{x}\\)"] },
          { cells: ["\\(\\log_a x\\)", "\\(\\dfrac{1}{x\\ln a}\\)"] },
          { cells: ["\\(\\sin^{-1} x\\)", "\\(\\dfrac{1}{\\sqrt{1-x^2}}\\)"] },
          { cells: ["\\(\\tan^{-1} x\\)", "\\(\\dfrac{1}{1+x^2}\\)"] },
        ],
        caption: "Radians only. The chain rule extends each of these to a composite argument.",
      },
      selfCheckExample: {
        prompt: "What is the derivative of \\(\\cosec(x^{\\circ})\\) with respect to \\(x\\)?",
        steps: [
          "Convert degrees to radians: \\(x^{\\circ} = \\dfrac{\\pi x}{180}\\).",
          "\\(\\dfrac{d}{dx}\\cosec\\!\\left(\\dfrac{\\pi x}{180}\\right) = -\\dfrac{\\pi}{180}\\cosec\\!\\left(\\dfrac{\\pi x}{180}\\right)\\cot\\!\\left(\\dfrac{\\pi x}{180}\\right)\\).",
        ],
        answer: "\\(-\\dfrac{\\pi}{180}\\cosec(x^{\\circ})\\cot(x^{\\circ})\\) — the \\(\\pi/180\\) is the trap.",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}(a^x)\\)?", answer: "\\(a^x\\ln a\\)" },
        { prompt: "\\(\\frac{d}{dx}(\\tan^{-1}x)\\)?", answer: "\\(\\dfrac{1}{1+x^2}\\)" },
        { prompt: "\\(\\frac{d}{dx}(\\log_a x)\\)?", answer: "\\(\\dfrac{1}{x\\ln a}\\)" },
        { prompt: "Angle unit assumed by the trig derivatives?", answer: "Radians" },
      ],
      pyqExampleId: "98c2c87d-b0ca-44de-a9fe-ceb8d9fd3d6b", // 2023 — cosec(x°) degree-conversion trap
      traps: [
        {
          title: "Degrees must be converted to radians first",
          body:
            "\\(\\frac{d}{dx}\\sin(x^{\\circ}) = \\frac{\\pi}{180}\\cos(x^{\\circ})\\), NOT \\(\\cos(x^{\\circ})\\). The standard table holds only for radian arguments; a degree symbol injects a \\(\\pi/180\\) factor by the chain rule.",
        },
        {
          title: "Don't power-rule an exponential",
          body:
            "\\(\\frac{d}{dx}(a^x) = a^x\\ln a\\), NOT \\(x\\,a^{x-1}\\). The power rule \\(\\frac{d}{dx}(x^n)=nx^{n-1}\\) applies only when the BASE is the variable. When the variable is in the EXPONENT, the derivative carries the base unchanged and picks up a \\(\\ln a\\) factor. (And \\(\\frac{d}{dx}e^x = e^x\\), since \\(\\ln e = 1\\).)",
        },
        {
          title: "Derivative of \\(\\ln x\\) is \\(1/x\\), not \\(\\ln x\\) or \\(x\\)",
          body:
            "\\(\\frac{d}{dx}(\\ln x) = \\dfrac{1}{x}\\). It is neither \\(\\ln x\\) (that's its own integral mistake) nor \\(x\\). For a general base, \\(\\frac{d}{dx}(\\log_a x) = \\dfrac{1}{x\\ln a}\\) — the extra \\(\\ln a\\) lives in the DENOMINATOR here, the opposite of where it sits for \\(a^x\\).",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-product-quotient",
      name: "Product and quotient rules",
      intuition:
        "Differentiating a product is not the product of derivatives. Use \\((uv)' = u'v + uv'\\) for products and the quotient rule for ratios. Linearity handles sums: constants pull out, and \\((u\\pm v)' = u' \\pm v'\\).",
      definition:
        "- **Product:** \\((uv)' = u'v + uv'\\).\n" +
        "- **Quotient:** \\(\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}\\).\n" +
        "- **Linearity:** \\((au \\pm bv)' = au' \\pm bv'\\).",
      formula: {
        label: "Product and quotient rules",
        latex: "(uv)' = u'v + uv', \\qquad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = x^2 \\sin x\\).",
        steps: [
          "Product rule with \\(u=x^2\\), \\(v=\\sin x\\).",
          "\\(y' = (2x)(\\sin x) + (x^2)(\\cos x)\\).",
        ],
        answer: "\\(y' = 2x\\sin x + x^2\\cos x\\).",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = \\dfrac{x}{1+x}\\).",
        steps: [
          "Quotient rule: \\(u=x\\ (u'=1)\\), \\(v=1+x\\ (v'=1)\\).",
          "\\(y' = \\dfrac{(1)(1+x) - (x)(1)}{(1+x)^2} = \\dfrac{1}{(1+x)^2}\\).",
        ],
        answer: "\\(y' = \\dfrac{1}{(1+x)^2}\\).",
      },
      practiceSet: [
        { prompt: "\\((uv)'\\)?", answer: "\\(u'v + uv'\\)" },
        { prompt: "\\((u/v)'\\)?", answer: "\\(\\dfrac{u'v - uv'}{v^2}\\)" },
        { prompt: "\\(\\frac{d}{dx}(x^2\\sin x)\\)?", answer: "\\(2x\\sin x + x^2\\cos x\\)" },
        { prompt: "Is \\((uv)' = u'v'\\)?", answer: "No" },
      ],
      pyqExampleId: "7151655a-04ba-478c-8a64-7fa4d9b5bbbd", // 2019 — h=5f(x)-xg(x), h'
      traps: [
        {
          title: "The product rule is not the product of derivatives",
          body:
            "\\((uv)' \\neq u'v'\\). The correct rule is \\((uv)' = u'v + uv'\\) — differentiate one factor at a time and add. For \\(x^2\\sin x\\), the answer is \\(2x\\sin x + x^2\\cos x\\), not \\((2x)(\\cos x)\\).",
        },
        {
          title: "Quotient rule — order and sign in the numerator matter",
          body:
            "\\(\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}\\), NOT \\(\\dfrac{uv' - u'v}{v^2}\\) and NOT \\(\\dfrac{u'v + uv'}{v^2}\\). The derivative-of-the-top term comes first and the two terms are SUBTRACTED. Flipping the order negates the whole answer.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-chain-rule",
      name: "The chain rule (composite functions)",
      intuition:
        "To differentiate a function of a function, differentiate the **outer** function (leaving the inner alone) and **multiply** by the derivative of the inner. Peel the layers from outside in — this single rule is the most-used tool in the chapter.",
      definition:
        "\\(\\dfrac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)\\). For nested layers, multiply each layer's derivative: \\(\\dfrac{d}{dx}f(g(h(x))) = f'(g(h(x)))\\,g'(h(x))\\,h'(x)\\).",
      formula: {
        label: "Chain rule",
        latex: "\\frac{d}{dx}\\,f(g(x)) = f'(g(x))\\cdot g'(x)",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\sin(3x^2)\\).",
        steps: [
          "Outer \\(\\sin\\) → \\(\\cos(3x^2)\\), inner \\(3x^2\\) → \\(6x\\).",
          "Multiply: \\(y' = \\cos(3x^2)\\cdot 6x\\).",
        ],
        answer: "\\(y' = 6x\\cos(3x^2)\\).",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(y = e^{\\sin x}\\).",
        steps: [
          "Outer \\(e^{(\\cdot)}\\) → \\(e^{\\sin x}\\), inner \\(\\sin x\\) → \\(\\cos x\\).",
          "Multiply: \\(y' = e^{\\sin x}\\cos x\\).",
        ],
        answer: "\\(y' = e^{\\sin x}\\cos x\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}f(g(x))\\)?", answer: "\\(f'(g(x))\\,g'(x)\\)" },
        { prompt: "\\(\\frac{d}{dx}\\sin(3x^2)\\)?", answer: "\\(6x\\cos(3x^2)\\)" },
        { prompt: "\\(\\frac{d}{dx}e^{\\sin x}\\)?", answer: "\\(e^{\\sin x}\\cos x\\)" },
        { prompt: "\\(\\frac{d}{dx}(\\ln(\\cos x))\\)?", answer: "\\(-\\tan x\\)" },
      ],
      pyqExampleId: "531cd2cc-b68a-4bb8-bc2f-4504b6678734", // 2018 — e^{x^2} sin 2x at x=π
      traps: [
        {
          title: "Don't forget the derivative of the inner function",
          body:
            "\\(\\frac{d}{dx}\\sin(3x^2) = \\cos(3x^2)\\cdot 6x\\), NOT just \\(\\cos(3x^2)\\). The chain rule multiplies by the inner derivative \\(6x\\); leaving it out is the single most common slip in the chapter. Every layer contributes its own factor.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-logarithmic",
      name: "Logarithmic differentiation",
      intuition:
        "When the variable is in the **exponent** (\\(x^x\\), \\(f(x)^{g(x)}\\)) or you face a long **product/quotient of powers**, take \\(\\ln\\) of both sides first. Logs convert powers to products and products to sums, after which you differentiate implicitly. It also cracks infinite power towers.",
      definition:
        "Take \\(\\ln y\\), simplify with log laws, then differentiate (the left side gives \\(\\frac{1}{y}\\frac{dy}{dx}\\)):\n" +
        "- **Variable exponent:** \\(y = f(x)^{g(x)} \\Rightarrow \\ln y = g(x)\\ln f(x)\\).\n" +
        "- **Product of powers:** \\(\\ln y\\) splits into a sum, each term differentiated alone.\n" +
        "- **Power tower:** \\(y = (f(x))^{y} \\Rightarrow \\ln y = y\\ln f(x)\\) (the exponent is the whole \\(y\\) again).",
      formula: {
        label: "Logarithmic differentiation",
        latex: "y = f(x)^{g(x)} \\;\\Rightarrow\\; \\frac{1}{y}\\frac{dy}{dx} = g'(x)\\ln f(x) + g(x)\\frac{f'(x)}{f(x)}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = x^x\\).",
        steps: [
          "Take \\(\\ln\\): \\(\\ln y = x\\ln x\\).",
          "Differentiate: \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\ln x + 1\\).",
          "Multiply by \\(y=x^x\\): \\(\\dfrac{dy}{dx} = x^x(\\ln x + 1)\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = x^x(1 + \\ln x)\\).",
      },
      selfCheckExample: {
        prompt: "If \\(y = (\\cos x)^{(\\cos x)^{\\cdots\\infty}}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "The tower is self-similar: \\(y = (\\cos x)^y\\), so \\(\\ln y = y\\ln(\\cos x)\\).",
          "Differentiate: \\(\\dfrac{1}{y}y' = y'\\ln(\\cos x) + y\\cdot(-\\tan x)\\).",
          "Solve for \\(y'\\): \\(y'\\left(\\dfrac{1}{y} - \\ln\\cos x\\right) = -y\\tan x \\Rightarrow y' = \\dfrac{-y^2\\tan x}{1 - y\\ln\\cos x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{-y^2\\tan x}{1 - y\\ln(\\cos x)}\\).",
      },
      practiceSet: [
        { prompt: "First step for \\(y = f(x)^{g(x)}\\)?", answer: "Take \\(\\ln\\) of both sides" },
        { prompt: "\\(\\frac{d}{dx}(x^x)\\)?", answer: "\\(x^x(1+\\ln x)\\)" },
        { prompt: "Left side after \\(\\ln y\\) differentiated?", answer: "\\(\\frac{1}{y}\\frac{dy}{dx}\\)" },
        { prompt: "Power tower \\(y=a^{a^{\\cdots}}\\) becomes?", answer: "\\(y = a^{y}\\)" },
      ],
      pyqExampleId: "74b10a45-4abd-4f54-831f-581721148288", // 2021 — y = cos x · cos 4x · cos 8x
    },

    {
      kind: "formula" as const,
      slug: "diff-derivative-wrt-function",
      name: "Derivative of one function with respect to another",
      intuition:
        "'Differentiate \\(u\\) with respect to \\(v\\)' is NOT \\(\\frac{du}{dx}\\). Treat both as functions of \\(x\\), differentiate each w.r.t. \\(x\\), and **divide**: \\(\\frac{du}{dv} = \\frac{du/dx}{dv/dx}\\).",
      definition:
        "To find \\(\\dfrac{du}{dv}\\) where \\(u=u(x)\\) and \\(v=v(x)\\): compute \\(\\dfrac{du}{dx}\\) and \\(\\dfrac{dv}{dx}\\), then \\(\\dfrac{du}{dv} = \\dfrac{du/dx}{dv/dx}\\). It is the same idea as parametric differentiation, with \\(x\\) as the hidden parameter.",
      formula: {
        label: "Derivative of u w.r.t. v",
        latex: "\\frac{du}{dv} = \\frac{du/dx}{dv/dx}",
      },
      authoredExample: {
        prompt: "Find the derivative of \\(x^2\\) with respect to \\(x^3\\).",
        steps: [
          "\\(\\dfrac{d(x^2)}{dx} = 2x\\), \\(\\dfrac{d(x^3)}{dx} = 3x^2\\).",
          "Divide: \\(\\dfrac{d(x^2)}{d(x^3)} = \\dfrac{2x}{3x^2} = \\dfrac{2}{3x}\\).",
        ],
        answer: "\\(\\dfrac{2}{3x}\\).",
      },
      selfCheckExample: {
        prompt: "Find the derivative of \\(\\sin^2 x\\) with respect to \\(\\cos^2 x\\).",
        steps: [
          "\\(\\dfrac{d(\\sin^2 x)}{dx} = 2\\sin x\\cos x\\); \\(\\dfrac{d(\\cos^2 x)}{dx} = -2\\sin x\\cos x\\).",
          "Divide: \\(\\dfrac{2\\sin x\\cos x}{-2\\sin x\\cos x} = -1\\).",
        ],
        answer: "\\(-1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{du}{dv}\\) in terms of \\(x\\)-derivatives?", answer: "\\(\\dfrac{du/dx}{dv/dx}\\)" },
        { prompt: "Derivative of \\(x^2\\) w.r.t. \\(x^3\\)?", answer: "\\(\\dfrac{2}{3x}\\)" },
        { prompt: "Derivative of \\(\\sin^2 x\\) w.r.t. \\(\\cos^2 x\\)?", answer: "\\(-1\\)" },
        { prompt: "Is 'derivative of \\(u\\) w.r.t. \\(v\\)' the same as \\(du/dx\\)?", answer: "No" },
      ],
      pyqExampleId: "a71b980e-f033-43be-81d7-a3d0b77b5ae5", // 2021 — derivative of e^x w.r.t. x^e
    },

    {
      kind: "formula" as const,
      slug: "diff-inverse-trig-simplify",
      name: "Simplify the inverse-trig first, then differentiate",
      intuition:
        "A messy inverse-trig expression almost always **collapses** before you differentiate. The standard move: substitute \\(x=\\tan\\theta\\) (or \\(x=\\sin\\theta\\)), recognise a double-angle or sum identity, and reduce the whole thing to a simple multiple of an angle. Differentiating the simplified form is trivial.",
      definition:
        "Common collapses (memorise the substitutions):\n" +
        "- \\(\\tan^{-1}\\!\\dfrac{2x}{1-x^2},\\ \\sin^{-1}\\!\\dfrac{2x}{1+x^2},\\ \\cos^{-1}\\!\\dfrac{1-x^2}{1+x^2}\\): put \\(x=\\tan\\theta\\Rightarrow 2\\theta = 2\\tan^{-1}x\\).\n" +
        "- \\(\\cos^{-1}(\\sin x) = \\tfrac{\\pi}{2}-x\\); \\(\\tan^{-1}\\!\\dfrac{a-b}{1+ab}=\\tan^{-1}a-\\tan^{-1}b\\).\n" +
        "Differentiate the collapsed form (often \\(\\pm 1\\), \\(\\pm 2/(1+x^2)\\), etc.).",
      formula: {
        label: "Standard inverse-trig collapses",
        latex:
          "\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x \\qquad \\sin^{-1}\\dfrac{2x}{1+x^2} = 2\\tan^{-1}x \\qquad \\cos^{-1}\\dfrac{1-x^2}{1+x^2} = 2\\tan^{-1}x \\qquad \\cos^{-1}(\\sin x) = \\dfrac{\\pi}{2} - x \\qquad \\tan^{-1}\\dfrac{a-b}{1+ab} = \\tan^{-1}a - \\tan^{-1}b",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\tan^{-1}\\!\\left(\\dfrac{2x}{1-x^2}\\right)\\).",
        steps: [
          "Put \\(x=\\tan\\theta\\): \\(\\dfrac{2x}{1-x^2} = \\tan 2\\theta\\), so \\(y = 2\\theta = 2\\tan^{-1}x\\).",
          "Differentiate: \\(\\dfrac{dy}{dx} = \\dfrac{2}{1+x^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2}{1+x^2}\\).",
      },
      selfCheckExample: {
        prompt: "Find the slope of \\(y = \\cos^{-1}(\\sin x)\\).",
        steps: [
          "For the principal range, \\(\\cos^{-1}(\\sin x) = \\dfrac{\\pi}{2} - x\\).",
          "Differentiate: \\(\\dfrac{dy}{dx} = -1\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -1\\).",
      },
      practiceSet: [
        { prompt: "Substitution for \\(\\tan^{-1}\\frac{2x}{1-x^2}\\)?", answer: "\\(x=\\tan\\theta\\) (gives \\(2\\tan^{-1}x\\))" },
        { prompt: "\\(\\frac{d}{dx}\\tan^{-1}\\frac{2x}{1-x^2}\\)?", answer: "\\(\\dfrac{2}{1+x^2}\\)" },
        { prompt: "\\(\\cos^{-1}(\\sin x)\\) simplifies to?", answer: "\\(\\frac{\\pi}{2}-x\\)" },
        { prompt: "Do you differentiate before or after simplifying?", answer: "After — simplify first" },
      ],
      pyqExampleId: "ebf6073e-30b3-4ca8-bde9-a1512340a99e", // 2017 — y = cos⁻¹(2x/(1+x²))
      traps: [
        {
          title: "Don't quotient-rule the raw inverse-trig",
          body:
            "Differentiating \\(\\tan^{-1}\\frac{2x}{1-x^2}\\) directly with the chain + quotient rule is slow and error-prone. The intended path is the \\(x=\\tan\\theta\\) collapse to \\(2\\tan^{-1}x\\) first.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-functional-equation",
      name: "Differentiating functional equations",
      intuition:
        "When a function is defined by a rule like \\(f(x+y)=f(x)f(y)\\) rather than a formula, differentiate the relation (or use first principles) to extract \\(f'\\). The exponential law \\(f(x+y)=f(x)f(y)\\) forces \\(f'(x)=f'(0)\\,f(x)\\).",
      definition:
        "For \\(f(x+y)=f(x)f(y)\\): from first principles \\(f'(x)=f(x)\\lim_{h\\to 0}\\dfrac{f(h)-1}{h}=f'(0)\\,f(x)\\). More generally, differentiate the given relation w.r.t. one variable and substitute convenient values (often \\(y=0\\)) to expose \\(f'\\).",
      formula: {
        label: "Exponential functional equation",
        latex: "f(x+y)=f(x)f(y) \\;\\Rightarrow\\; f'(x) = f'(0)\\,f(x)",
      },
      authoredExample: {
        prompt: "If \\(f(x+y)=f(x)f(y)\\) for all \\(x,y\\) and \\(f'(0)=2\\), express \\(f'(x)\\).",
        steps: [
          "From the relation, \\(f'(x) = f'(0)\\,f(x)\\).",
          "With \\(f'(0)=2\\): \\(f'(x) = 2f(x)\\).",
        ],
        answer: "\\(f'(x) = 2f(x)\\) (so \\(f(x)=e^{2x}\\) up to \\(f(0)=1\\)).",
      },
      selfCheckExample: {
        prompt: "If \\(f(x+y)=f(x)f(y)\\) and \\(f(0)=1\\), what is \\(f'(5)\\) in terms of \\(f'(0)\\)?",
        steps: [
          "\\(f'(x) = f'(0)f(x)\\), so \\(f'(5) = f'(0)f(5)\\).",
        ],
        answer: "\\(f'(5) = f'(0)\\,f(5)\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x+y)=f(x)f(y) \\Rightarrow f'(x)=?\\)", answer: "\\(f'(0)f(x)\\)" },
        { prompt: "What must \\(f(0)\\) equal for \\(f(x+y)=f(x)f(y)\\) (non-trivial)?", answer: "\\(1\\)" },
        { prompt: "Such an \\(f\\) is which standard function?", answer: "Exponential \\(e^{kx}\\)" },
        { prompt: "Handy substitution to extract \\(f'\\)?", answer: "\\(y=0\\)" },
      ],
      pyqExampleId: "be6505b9-e14b-4bf6-a179-7a04148ef8a9", // 2017 — f(x+y)=f(x)f(y), f'(5)
    },
  ],
  related: [
    { label: "Parametric, Implicit & Higher-Order", href: "/notes/nda-maths/differentiation/diff-parametric-implicit-higher" },
    { label: "Differentiability", href: "/notes/nda-maths/differentiation/diff-differentiability" },
  ],
};
