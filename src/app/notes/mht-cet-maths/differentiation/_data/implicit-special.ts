import type { SubtopicNote } from "@/app/notes/_types";

export const IMPLICIT_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Implicit Differentiation & Special Forms",
  title: "Implicit Differentiation and Special Forms",
  oneLineDefinition:
    "When y is tangled up with x in one equation, differentiate the whole equation as it stands — treating y as a hidden function of x — and then solve for dy/dx.",
  whyItMatters:
    "This is the broadest subtopic in the chapter — 25 PYQs (12 HARD, 12 MODERATE, 1 EASY) — and the paper's reliable source of non-routine relations. " +
    "Beyond the core implicit method, MHT-CET keeps recycling a handful of signature shapes: the log(x+y)=2xy family, exponential relations you must log first, tan y written as a rational in x, " +
    "'prove this relation' problems, self-referential infinite expressions, and functional equations. Recognise the shape and the method follows.",
  concepts: [
    // 1 — implicit method (core)
    {
      kind: "formula" as const,
      slug: "cetdiff-implicit-method",
      name: "Implicit Differentiation — the Core Method",
      intuition:
        "Sometimes you cannot solve an equation for y cleanly (it is buried inside the equation with x). " +
        "You do not need to. Differentiate every term of the equation with respect to x as it stands — wherever y appears, its derivative carries a dy/dx by the chain rule — then collect the dy/dx terms and solve.",
      definition:
        "For a relation \\(F(x,y)=0\\) where \\(y\\) is an (implicit) function of \\(x\\):\n" +
        "- Differentiate **both sides** with respect to \\(x\\).\n" +
        "- Every \\(y\\)-term picks up a factor \\(\\dfrac{dy}{dx}\\) (chain rule): \\(\\dfrac{d}{dx}(y^n)=n y^{n-1}\\dfrac{dy}{dx}\\), \\(\\dfrac{d}{dx}(xy)=y+x\\dfrac{dy}{dx}\\).\n" +
        "- Gather all \\(\\dfrac{dy}{dx}\\) terms on one side and **solve** for \\(\\dfrac{dy}{dx}\\).\n" +
        "The **slope of the tangent** at a point is \\(\\dfrac{dy}{dx}\\) evaluated there.",
      formula: {
        label: "Implicit chain rule",
        latex:
          "\\frac{d}{dx}\\big[g(y)\\big] = g'(y)\\,\\frac{dy}{dx}, \\qquad \\frac{d}{dx}(xy)=y+x\\frac{dy}{dx}",
        symbols: [
          { symbol: "\\frac{dy}{dx}", meaning: "the unknown you collect and solve for" },
          { symbol: "g(y)", meaning: "any function of \\(y\\); its \\(x\\)-derivative carries \\(\\frac{dy}{dx}\\)" },
        ],
      },
      pyqExampleId: "df7d0af3-a3bf-4c5b-b172-fb4cb6d81047",
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) for \\(x^3 + y^3 = 3axy\\) (the folium of Descartes).",
        steps: [
          "Differentiate every term w.r.t. \\(x\\): \\(3x^2 + 3y^2\\dfrac{dy}{dx} = 3a\\!\\left(y + x\\dfrac{dy}{dx}\\right)\\).",
          "Divide by 3 and expand: \\(x^2 + y^2\\dfrac{dy}{dx} = ay + ax\\dfrac{dy}{dx}\\).",
          "Collect \\(\\dfrac{dy}{dx}\\): \\(\\left(y^2 - ax\\right)\\dfrac{dy}{dx} = ay - x^2\\).",
          "Solve: \\(\\dfrac{dy}{dx} = \\dfrac{ay - x^2}{y^2 - ax}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{ay - x^2}{y^2 - ax}\\)",
      },
      selfCheckExample: {
        prompt: "Find the slope of the tangent to \\(x^2 + xy + y^2 = 3\\) at the point \\((1,1)\\).",
        steps: [
          "Differentiate: \\(2x + \\left(y + x\\dfrac{dy}{dx}\\right) + 2y\\dfrac{dy}{dx} = 0\\).",
          "Collect: \\((x + 2y)\\dfrac{dy}{dx} = -(2x + y)\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{2x+y}{x+2y}\\).",
          "At \\((1,1)\\): \\(\\dfrac{dy}{dx} = -\\dfrac{2+1}{1+2} = -1\\).",
        ],
        answer: "Slope \\(= -1\\).",
      },
      practiceSet: [
        { prompt: "\\(x^2 + y^2 = 25\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-\\dfrac{x}{y}\\)", method: "\\(2x + 2y\\,y' = 0\\)" },
        { prompt: "\\(xy = 1\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-\\dfrac{y}{x}\\)", method: "\\(y + x y' = 0\\)" },
        { prompt: "\\(x^2 - y^2 = 16\\). Find \\(\\dfrac{dy}{dx}\\).", answer: "\\(\\dfrac{x}{y}\\)" },
        { prompt: "Slope of \\(y^2 = 4x\\) at \\((1,2)\\).", answer: "\\(1\\)", method: "\\(2y\\,y' = 4 \\Rightarrow y' = 2/y\\)" },
      ],
      traps: [
        {
          title: "Differentiating a y-term without the dy/dx factor",
          body:
            "\\(\\dfrac{d}{dx}(y^2)\\) is \\(2y\\dfrac{dy}{dx}\\), NOT \\(2y\\). The whole method rests on attaching \\(\\dfrac{dy}{dx}\\) to every \\(y\\)-derivative by the chain rule. Drop it and every answer is wrong.",
        },
        {
          title: "Forgetting the product rule on the xy term",
          body:
            "\\(\\dfrac{d}{dx}(xy) = y + x\\dfrac{dy}{dx}\\) — it has TWO terms because both factors carry an \\(x\\)-dependence. Writing just \\(x\\dfrac{dy}{dx}\\) or just \\(y\\) loses half the term.",
        },
      ],
    },

    // 2 — log(x+y)=2xy family
    {
      kind: "formula" as const,
      slug: "cetdiff-implicit-log-xy-relations",
      name: "Implicit Relations like log(x + y) = 2xy",
      intuition:
        "These ask for dy/dx at a single point (almost always x = 0), not a general formula. " +
        "The trick is in two halves: first use the equation itself to find the y-value at that x, then differentiate implicitly and plug in BOTH coordinates to read off the slope.",
      definition:
        "For a relation tying \\(x+y\\) to a product or transcendental expression, evaluated at a point:\n" +
        "- **Find the point.** Substitute the given \\(x\\) into the original equation to solve for \\(y\\). For \\(\\log(x+y)=2xy\\) at \\(x=0\\): \\(\\log y = 0 \\Rightarrow y = 1\\).\n" +
        "- **Differentiate implicitly**, then substitute the full point \\((x,y)\\) and solve for \\(\\dfrac{dy}{dx}\\).\n" +
        "For \\(\\log(x+y)=2xy\\): \\(\\dfrac{1+y'}{x+y} = 2(y + xy')\\); at \\((0,1)\\) this gives \\(1+y' = 2y' \\Rightarrow y' = 1\\).",
      formula: {
        label: "Differentiating log(x + y)",
        latex: "\\frac{d}{dx}\\log(x+y) = \\frac{1}{x+y}\\left(1 + \\frac{dy}{dx}\\right)",
        symbols: [
          { symbol: "1 + \\frac{dy}{dx}", meaning: "the chain-rule derivative of the inner \\(x+y\\)" },
        ],
      },
      pyqExampleId: "f232541d-a646-4a25-9beb-7ecac489bcab",
      authoredExample: {
        prompt: "If \\(\\log(x + y) = xy\\), find \\(\\dfrac{dy}{dx}\\) at \\(x = 0\\).",
        steps: [
          "Find the point. At \\(x=0\\): \\(\\log(0+y) = 0 \\Rightarrow \\log y = 0 \\Rightarrow y = 1\\). So the point is \\((0,1)\\).",
          "Differentiate implicitly: \\(\\dfrac{1}{x+y}\\!\\left(1 + \\dfrac{dy}{dx}\\right) = y + x\\dfrac{dy}{dx}\\).",
          "Substitute \\((0,1)\\): \\(\\dfrac{1}{1}(1 + y') = 1 + 0 = 1\\), so \\(1 + y' = 1\\).",
          "Solve: \\(y' = 0\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = 0\\) at \\(x=0\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\log(x + y) = \\tan(x + y)\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Both sides depend only on \\(x+y\\). Differentiate: \\(\\dfrac{1}{x+y}(1+y') = \\sec^2(x+y)\\,(1+y')\\).",
          "Factor out \\((1+y')\\): \\((1+y')\\!\\left[\\dfrac{1}{x+y} - \\sec^2(x+y)\\right] = 0\\).",
          "The bracket is non-zero in general, so \\(1 + y' = 0\\), giving \\(y' = -1\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log(x+y)=2xy\\): find \\(y\\) at \\(x=0\\).", answer: "\\(y = 1\\)", method: "\\(\\log y = 0\\)" },
        { prompt: "\\(\\log(x+y) = x+y\\): \\(\\dfrac{dy}{dx}\\) where \\(x+y\\neq1\\).", answer: "\\(-1\\)", method: "factor \\((1+y')\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\log(x+y)\\)?", answer: "\\(\\dfrac{1+y'}{x+y}\\)" },
        { prompt: "\\(\\dfrac{d}{dx}(2xy)\\)?", answer: "\\(2y + 2x\\,y'\\)", method: "product rule" },
      ],
      traps: [
        {
          title: "Find the y-value before substituting into the derivative",
          body:
            "The derivative formula contains both \\(x\\) and \\(y\\). At \\(x=0\\) you still need \\(y\\); get it from the ORIGINAL equation (e.g. \\(\\log y = 0 \\Rightarrow y=1\\)) before plugging into \\(y'\\). Substituting only \\(x=0\\) leaves the answer undetermined.",
        },
        {
          title: "log(x + y) = sin(x + y) collapses to slope -1",
          body:
            "When both sides are functions of the single quantity \\(x+y\\), differentiating factors out \\((1+y')\\). Setting it to zero gives \\(y' = -1\\), independent of the functions — recognise this shortcut for \\(\\log(x+y)=\\sin(x+y)\\) and its cousins.",
        },
      ],
    },

    // 3 — exponential relations (take logs)
    {
      kind: "formula" as const,
      slug: "cetdiff-implicit-exponential-relations",
      name: "Exponential Relations — Take Logs, Then Differentiate",
      intuition:
        "When the variable y sits in an EXPONENT (like (2x) raised to the power 2y), you cannot differentiate directly — the exponent is variable. " +
        "Take natural logs of the whole equation first. That pulls the exponent down as a multiplier, turning a power into a product you can differentiate implicitly.",
      definition:
        "For a relation where \\(y\\) appears in an exponent on one or both sides:\n" +
        "- **Take \\(\\log\\) of both sides** to bring exponents down: \\(\\log(A^{B}) = B\\log A\\).\n" +
        "- Differentiate implicitly (product rule on each \\(B\\log A\\) term).\n" +
        "- Collect and solve for \\(\\dfrac{dy}{dx}\\).\n" +
        "Example shape: \\((2x)^{2y}=4e^{2x-2y}\\) becomes \\(2y\\log(2x) = \\log 4 + 2x - 2y\\); differentiating yields \\((1+\\log 2x)^2\\dfrac{dy}{dx} = x\\log 2x - \\log 2x\\).",
      formula: {
        label: "Log first, then differentiate",
        latex: "\\frac{d}{dx}\\big[u(x)\\,\\log v(x)\\big] = u'\\log v + u\\cdot\\frac{v'}{v}",
        symbols: [
          { symbol: "u(x)", meaning: "the exponent (often containing \\(y\\))" },
          { symbol: "\\log v(x)", meaning: "log of the base, after taking logs of both sides" },
        ],
      },
      pyqExampleId: "943a5a7c-1940-4b72-8a7c-a3c656d32e5e",
      authoredExample: {
        prompt: "If \\(x^{y} = e^{x-y}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take \\(\\log\\) of both sides: \\(y\\log x = x - y\\).",
          "Differentiate implicitly (product rule on the left): \\(y'\\log x + y\\cdot\\dfrac{1}{x} = 1 - y'\\).",
          "Collect \\(y'\\): \\(y'(\\log x + 1) = 1 - \\dfrac{y}{x}\\).",
          "Solve and use \\(y = \\dfrac{x}{1+\\log x}\\) (from the logged equation) to simplify: \\(1 - \\dfrac{y}{x} = 1 - \\dfrac{1}{1+\\log x} = \\dfrac{\\log x}{1+\\log x}\\), so \\(y' = \\dfrac{\\log x}{(1+\\log x)^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{\\log x}{(1+\\log x)^2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y^{x} = e^{y}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Take \\(\\log\\): \\(x\\log y = y\\).",
          "Differentiate: \\(\\log y + x\\cdot\\dfrac{1}{y}y' = y'\\).",
          "Collect: \\(\\log y = y'\\!\\left(1 - \\dfrac{x}{y}\\right) = y'\\cdot\\dfrac{y-x}{y}\\).",
          "Solve: \\(y' = \\dfrac{y\\log y}{y - x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{y\\log y}{y-x}\\)",
      },
      practiceSet: [
        { prompt: "First step for \\((3x)^{y}=e^{x}\\)?", answer: "\\(y\\log 3x = x\\)", method: "take logs" },
        { prompt: "\\(\\dfrac{d}{dx}(y\\log x)\\)?", answer: "\\(y'\\log x + \\dfrac{y}{x}\\)", method: "product rule" },
        { prompt: "From \\(y\\log x = x\\), find \\(y\\).", answer: "\\(y = \\dfrac{x}{\\log x}\\)" },
        { prompt: "Why can't you differentiate \\(x^{y}\\) directly?", answer: "the exponent \\(y\\) is variable", method: "log it down first" },
      ],
      traps: [
        {
          title: "You cannot use the power rule when the exponent contains y",
          body:
            "\\(\\dfrac{d}{dx}(x^{y})\\) is NOT \\(yx^{y-1}\\) — that rule needs a CONSTANT power. Because \\(y\\) varies, take logs first: \\(\\log(x^{y}) = y\\log x\\), then differentiate the product.",
        },
        {
          title: "Use the original (logged) relation to simplify the final answer",
          body:
            "These answers are meant to come out clean. After collecting \\(y'\\), substitute \\(y\\) from the logged equation (e.g. \\(y = x/(1+\\log x)\\)) — that is what turns a messy fraction into the tidy form the options expect.",
        },
      ],
    },

    // 4 — tan y = rational in x
    {
      kind: "formula" as const,
      slug: "cetdiff-tan-y-rational",
      name: "Relations of the Form tan y = (rational in x)",
      intuition:
        "When y is given by tan y equal to a rational function of x, you differentiate using sec-squared on the left and the quotient rule on the right. " +
        "The magic is that sec-squared y rebuilds itself from 1 + tan-squared y, and the tan-squared cancels neatly against the rational expression — leaving a clean quadratic denominator in x.",
      definition:
        "Given \\(\\tan y = \\dfrac{x\\sin\\alpha}{1 - x\\cos\\alpha}\\):\n" +
        "- Differentiate: \\(\\sec^2 y\\,\\dfrac{dy}{dx} = \\dfrac{d}{dx}\\!\\left[\\dfrac{x\\sin\\alpha}{1-x\\cos\\alpha}\\right]\\) (quotient rule on the right).\n" +
        "- Replace \\(\\sec^2 y = 1 + \\tan^2 y\\) and substitute \\(\\tan y\\) from the given relation; the algebra collapses to\n" +
        "\\(\\dfrac{dy}{dx} = \\dfrac{\\sin\\alpha}{1 - 2x\\cos\\alpha + x^2}\\).\n" +
        "Matching to \\(\\dfrac{m}{x^2 + 2nx + 1}\\) gives \\(m = \\sin\\alpha\\), \\(n = -\\cos\\alpha\\), so \\(m^2 + n^2 = 1\\).",
      formula: {
        label: "Standard result",
        latex:
          "\\tan y = \\frac{x\\sin\\alpha}{1 - x\\cos\\alpha} \\;\\Rightarrow\\; \\frac{dy}{dx} = \\frac{\\sin\\alpha}{1 - 2x\\cos\\alpha + x^2}",
        symbols: [
          { symbol: "\\sec^2 y", meaning: "rewritten as \\(1 + \\tan^2 y\\) to substitute the given expression" },
        ],
      },
      pyqExampleId: "95773188-0bab-4435-a2f2-1c073a573c6a",
      authoredExample: {
        prompt:
          "If \\(\\tan y = \\dfrac{2x}{1 - x^2}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Recognise the double-angle identity: \\(\\dfrac{2x}{1-x^2} = \\tan(2\\theta)\\) when \\(x = \\tan\\theta\\). So \\(\\tan y = \\tan(2\\tan^{-1}x)\\), i.e. \\(y = 2\\tan^{-1}x\\).",
          "Differentiate the simplified form: \\(\\dfrac{dy}{dx} = 2\\cdot\\dfrac{1}{1+x^2}\\).",
          "So \\(\\dfrac{dy}{dx} = \\dfrac{2}{1+x^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2}{1+x^2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\tan y = \\dfrac{x\\sin\\beta}{1 - x\\cos\\beta}\\), express \\(\\dfrac{dy}{dx}\\) as a single rational in \\(x\\).",
        steps: [
          "This is the standard shape with \\(\\alpha = \\beta\\): differentiate, use \\(\\sec^2 y = 1+\\tan^2 y\\), substitute the given \\(\\tan y\\).",
          "The expression collapses to \\(\\dfrac{dy}{dx} = \\dfrac{\\sin\\beta}{1 - 2x\\cos\\beta + x^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{\\sin\\beta}{x^2 - 2x\\cos\\beta + 1}\\)",
      },
      practiceSet: [
        { prompt: "Denominator of \\(\\dfrac{dy}{dx}\\) for \\(\\tan y = \\dfrac{x\\sin\\alpha}{1-x\\cos\\alpha}\\)?", answer: "\\(x^2 - 2x\\cos\\alpha + 1\\)" },
        { prompt: "Rewrite \\(\\sec^2 y\\) using \\(\\tan y\\).", answer: "\\(1 + \\tan^2 y\\)" },
        { prompt: "\\(\\dfrac{2x}{1-x^2}\\) equals \\(\\tan(\\;?\\;)\\) with \\(x=\\tan\\theta\\).", answer: "\\(2\\theta\\)", method: "double-angle for tan" },
        { prompt: "If \\(y = 2\\tan^{-1}x\\), \\(\\dfrac{dy}{dx}\\)?", answer: "\\(\\dfrac{2}{1+x^2}\\)" },
      ],
      traps: [
        {
          title: "Differentiate tan y as sec-squared y times dy/dx",
          body:
            "\\(\\dfrac{d}{dx}(\\tan y) = \\sec^2 y\\,\\dfrac{dy}{dx}\\) — the \\(\\dfrac{dy}{dx}\\) is essential (chain rule on the implicit \\(y\\)). Then convert \\(\\sec^2 y\\) to \\(1+\\tan^2 y\\) so the given relation can be substituted.",
        },
        {
          title: "Spotting a hidden inverse-tangent shortcut",
          body:
            "If the rational in \\(x\\) is exactly \\(\\dfrac{2x}{1-x^2}\\) (or \\(\\dfrac{x+a}{1-ax}\\)), it is a \\(\\tan\\) addition/double-angle in disguise. Recognising it lets you write \\(y\\) explicitly and skip the heavy quotient differentiation.",
        },
      ],
    },

    // 5 — prove the relation
    {
      kind: "formula" as const,
      slug: "cetdiff-prove-the-relation",
      name: "Proving a Given Differential Relation",
      intuition:
        "These show a relation that hides an explicit form of y (often through a substitution), then ask you to verify an identity in y and its derivative. " +
        "The reliable route: unwrap the relation to get y explicitly, differentiate, and confirm the claimed identity falls out.",
      definition:
        "Typical shape: \\(y^{1/m} + y^{-1/m} = 2x\\) (or similar), prove \\((x^2-1)(y')^2 = m^2 y^2\\).\n" +
        "- **Unwrap to explicit \\(y\\).** Set \\(t = y^{1/m}\\); then \\(t + \\dfrac{1}{t} = 2x\\) is a quadratic \\(t^2 - 2xt + 1 = 0\\), giving \\(t = x + \\sqrt{x^2-1}\\), so \\(y = \\left(x+\\sqrt{x^2-1}\\right)^{m}\\).\n" +
        "- **Differentiate.** \\(\\dfrac{dy}{dx} = \\dfrac{m y}{\\sqrt{x^2-1}}\\).\n" +
        "- **Square and clear** the root: \\((x^2-1)(y')^2 = m^2 y^2\\). Done.",
      formula: {
        label: "Key explicit form",
        latex: "y^{1/m} + y^{-1/m} = 2x \\;\\Rightarrow\\; y = \\left(x + \\sqrt{x^2-1}\\right)^{m}",
        symbols: [
          { symbol: "t = y^{1/m}", meaning: "substitution that turns the relation into a quadratic in \\(t\\)" },
        ],
      },
      pyqExampleId: "6391fcd5-34a1-418d-ab24-07cd920119ca",
      authoredExample: {
        prompt:
          "If \\(y = \\left(x + \\sqrt{x^2+1}\\right)^{n}\\), prove that \\((x^2+1)(y')^2 = n^2 y^2\\).",
        steps: [
          "Differentiate: \\(y' = n\\left(x+\\sqrt{x^2+1}\\right)^{n-1}\\!\\left(1 + \\dfrac{x}{\\sqrt{x^2+1}}\\right)\\).",
          "Simplify the bracket: \\(1 + \\dfrac{x}{\\sqrt{x^2+1}} = \\dfrac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}}\\).",
          "So \\(y' = n\\left(x+\\sqrt{x^2+1}\\right)^{n-1}\\cdot\\dfrac{x+\\sqrt{x^2+1}}{\\sqrt{x^2+1}} = \\dfrac{n\\,y}{\\sqrt{x^2+1}}\\).",
          "Square: \\((y')^2 = \\dfrac{n^2 y^2}{x^2+1}\\), hence \\((x^2+1)(y')^2 = n^2 y^2\\). Proved.",
        ],
        answer: "\\((x^2+1)(y')^2 = n^2 y^2\\) — verified.",
      },
      selfCheckExample: {
        prompt:
          "If \\(x^2 + y^2 = t + \\dfrac{1}{t}\\) and \\(x^4 + y^4 = t^2 + \\dfrac{1}{t^2}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Square the first: \\((x^2+y^2)^2 = t^2 + \\dfrac{1}{t^2} + 2\\). Using the second, \\(x^4 + y^4 + 2x^2y^2 = (x^4+y^4) + 2\\).",
          "Cancel: \\(2x^2 y^2 = 2 \\Rightarrow x^2 y^2 = 1\\).",
          "Differentiate \\(x^2 y^2 = 1\\): \\(2x y^2 + x^2\\cdot 2y\\,y' = 0\\), so \\(y' = -\\dfrac{y}{x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{y}{x}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(t + \\dfrac{1}{t} = 2x\\) for \\(t\\) (larger root).", answer: "\\(t = x + \\sqrt{x^2-1}\\)", method: "quadratic \\(t^2-2xt+1=0\\)" },
        { prompt: "From \\(x^2 y^2 = 1\\), find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-\\dfrac{y}{x}\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\left(x+\\sqrt{x^2-1}\\right)\\)?", answer: "\\(\\dfrac{x+\\sqrt{x^2-1}}{\\sqrt{x^2-1}}\\)", method: "factor out the bracket" },
        { prompt: "If \\(y'=\\dfrac{my}{\\sqrt{x^2-1}}\\), find \\((x^2-1)(y')^2\\).", answer: "\\(m^2 y^2\\)" },
      ],
      traps: [
        {
          title: "Use the substitution to get y explicitly first",
          body:
            "Trying to differentiate \\(y^{1/m}+y^{-1/m}=2x\\) directly is painful. Set \\(t=y^{1/m}\\), solve the resulting quadratic for \\(y\\), THEN differentiate — the proof falls out in two lines.",
        },
        {
          title: "Square only after isolating the root",
          body:
            "The target identities carry a \\((x^2-1)\\) or \\((x^2+1)\\) factor because \\(y'\\) has a \\(\\sqrt{x^2\\pm1}\\) in its denominator. Square \\(y'\\) to clear that root — squaring is what produces the polynomial coefficient.",
        },
      ],
    },

    // 6 — self-referential infinite forms
    {
      kind: "formula" as const,
      slug: "cetdiff-self-referential-infinite",
      name: "Self-Referential Infinite Expressions",
      intuition:
        "An infinite nested radical or continued product repeats itself forever — so the whole thing equals one copy of the pattern wrapped around the whole thing again. " +
        "Set y equal to the entire expression; the inner copy is also y. That self-reference turns an infinite tower into a simple finite equation you can differentiate implicitly.",
      definition:
        "For \\(y = \\sqrt{f(x) + \\sqrt{f(x) + \\sqrt{f(x) + \\cdots}}}\\):\n" +
        "- The expression under the **first** root is \\(f(x)\\) plus the SAME infinite expression, i.e. \\(f(x) + y\\).\n" +
        "- So \\(y = \\sqrt{f(x) + y}\\), giving the finite equation \\(y^2 = f(x) + y\\).\n" +
        "- Differentiate implicitly: \\(2y\\,y' = f'(x) + y'\\), so \\(\\dfrac{dy}{dx} = \\dfrac{f'(x)}{2y - 1}\\).\n" +
        "For \\(f(x) = x - \\sin x\\) this gives \\(\\dfrac{dy}{dx} = \\dfrac{1 - \\cos x}{2y - 1}\\).",
      formula: {
        label: "Self-reference for a nested radical",
        latex: "y = \\sqrt{f(x) + y} \\;\\Rightarrow\\; y^2 = f(x) + y \\;\\Rightarrow\\; \\frac{dy}{dx} = \\frac{f'(x)}{2y - 1}",
        symbols: [
          { symbol: "y", meaning: "the whole infinite expression — it reappears under the first root" },
        ],
      },
      pyqExampleId: "043b6886-7511-4b2e-a6a0-c50eb9887eb5",
      authoredExample: {
        prompt: "If \\(y = \\sqrt{x + \\sqrt{x + \\sqrt{x + \\cdots}}}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "The expression under the first root is \\(x\\) plus the whole expression again, i.e. \\(x + y\\). So \\(y = \\sqrt{x+y}\\).",
          "Square: \\(y^2 = x + y\\).",
          "Differentiate implicitly: \\(2y\\,y' = 1 + y'\\).",
          "Collect: \\((2y - 1)y' = 1\\), so \\(\\dfrac{dy}{dx} = \\dfrac{1}{2y - 1}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{1}{2y - 1}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = \\sqrt{\\tan x + \\sqrt{\\tan x + \\sqrt{\\tan x + \\cdots}}}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Self-reference: \\(y = \\sqrt{\\tan x + y}\\), so \\(y^2 = \\tan x + y\\).",
          "Differentiate: \\(2y\\,y' = \\sec^2 x + y'\\).",
          "Solve: \\(\\dfrac{dy}{dx} = \\dfrac{\\sec^2 x}{2y - 1}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{\\sec^2 x}{2y - 1}\\)",
      },
      practiceSet: [
        { prompt: "\\(y=\\sqrt{x+\\sqrt{x+\\cdots}}\\): the finite equation?", answer: "\\(y^2 = x + y\\)", method: "inner copy is \\(y\\)" },
        { prompt: "From \\(y^2 = x + y\\), find \\(\\dfrac{dy}{dx}\\).", answer: "\\(\\dfrac{1}{2y-1}\\)" },
        { prompt: "\\(y=\\sqrt{2x+y}\\): \\(\\dfrac{dy}{dx}\\)?", answer: "\\(\\dfrac{2}{2y-1}\\)", method: "\\(y^2=2x+y\\)" },
        { prompt: "\\(\\dfrac{d}{dx}(x-\\sin x)\\)?", answer: "\\(1 - \\cos x\\)" },
      ],
      traps: [
        {
          title: "The inner expression equals the WHOLE y, not part of it",
          body:
            "Because the nesting is infinite, what sits under the first root is \\(f(x) + (\\text{the same infinite expression}) = f(x) + y\\). Treating it as a finite tower (or as just \\(f(x)\\)) breaks the self-reference that makes the problem solvable.",
        },
        {
          title: "Square before differentiating, not after",
          body:
            "Convert \\(y = \\sqrt{f(x)+y}\\) into \\(y^2 = f(x)+y\\) FIRST, then differentiate. Differentiating the square root directly forces a chain-rule mess; the squared form differentiates in one clean line.",
        },
      ],
    },

    // 7 — functional equations
    {
      kind: "formula" as const,
      slug: "cetdiff-functional-equations",
      name: "Functional Equations — Find f, Then Differentiate",
      intuition:
        "These give an equation that f must satisfy (often involving f(x) and f(1/x), or f together with its own derivatives) rather than f directly. " +
        "First pin down f — by substituting x to 1/x and solving the pair, or by comparing coefficients — and only then differentiate to answer the question.",
      definition:
        "Two recurring routes:\n" +
        "- **Reciprocal substitution.** Given \\(a f(x) + b f(1/x) = g(x)\\), replace \\(x \\to 1/x\\) to get a second equation, then solve the two simultaneously for \\(f(x)\\).\n" +
        "- **Coefficient comparison.** Given \\(f(x) = x^3 + x^2 f'(1) + x f''(2) + 6\\), let \\(f'(1)=a\\), \\(f''(2)=b\\) (constants); differentiate to get \\(f'(x), f''(x)\\), evaluate at the stated points, and solve for \\(a, b\\). Here \\(a=-5, b=2\\), so \\(f(x)=x^3-5x^2+2x+6\\) and \\(f(2)=-2\\).\n" +
        "Once \\(f\\) is explicit, differentiate normally.",
      formula: {
        label: "Reciprocal-substitution setup",
        latex: "a f(x) + b f\\!\\left(\\tfrac{1}{x}\\right) = g(x), \\quad\\text{then } x\\to\\tfrac1x:\\; a f\\!\\left(\\tfrac1x\\right) + b f(x) = g\\!\\left(\\tfrac1x\\right)",
        symbols: [
          { symbol: "f'(1), f''(2)", meaning: "treat as unknown CONSTANTS, solve via coefficient comparison" },
        ],
      },
      pyqExampleId: "c037a704-a178-4688-9fbf-f92d0bec4902",
      authoredExample: {
        prompt: "If \\(2f(x) + f\\!\\left(\\dfrac{1}{x}\\right) = 3x\\) for \\(x \\neq 0\\), find \\(f'(2)\\).",
        steps: [
          "Write the given equation: \\(2f(x) + f(1/x) = 3x\\).",
          "Replace \\(x \\to 1/x\\): \\(2f(1/x) + f(x) = \\dfrac{3}{x}\\).",
          "Solve the pair: from \\(2\\times\\) (first) minus (second), \\(4f(x) + 2f(1/x) - 2f(1/x) - f(x) = 6x - \\dfrac{3}{x}\\), so \\(3f(x) = 6x - \\dfrac{3}{x}\\), giving \\(f(x) = 2x - \\dfrac{1}{x}\\).",
          "Differentiate: \\(f'(x) = 2 + \\dfrac{1}{x^2}\\), so \\(f'(2) = 2 + \\dfrac{1}{4} = \\dfrac{9}{4}\\).",
        ],
        answer: "\\(f'(2) = \\dfrac{9}{4}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(3f(x) - f\\!\\left(\\dfrac{1}{x}\\right) = \\dfrac{2}{x}\\) for \\(x \\neq 0\\), find \\(f'(1)\\).",
        steps: [
          "Given: \\(3f(x) - f(1/x) = \\dfrac{2}{x}\\).",
          "Replace \\(x \\to 1/x\\): \\(3f(1/x) - f(x) = 2x\\).",
          "Solve the pair — multiply the first by 3 and add the second: \\(9f(x) - 3f(1/x) + 3f(1/x) - f(x) = \\dfrac{6}{x} + 2x\\), so \\(8f(x) = 2x + \\dfrac{6}{x}\\), giving \\(f(x) = \\dfrac{x}{4} + \\dfrac{3}{4x}\\).",
          "Differentiate: \\(f'(x) = \\dfrac{1}{4} - \\dfrac{3}{4x^2}\\), so \\(f'(1) = \\dfrac{1}{4} - \\dfrac{3}{4} = -\\dfrac{1}{2}\\).",
        ],
        answer: "\\(f'(1) = -\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "From \\(2f(x)+f(1/x)=3x\\), find \\(f(x)\\).", answer: "\\(2x - \\dfrac{1}{x}\\)", method: "sub \\(x\\to1/x\\), solve the pair" },
        { prompt: "If \\(f'(x)=f(x)\\), \\(f(1)=2\\), find \\(f(x)\\).", answer: "\\(2e^{x-1}\\)", method: "\\(f=Ce^x\\), fit \\(f(1)=2\\)" },
        { prompt: "From \\(f(x)=2x-\\dfrac1x\\), find \\(f'(x)\\).", answer: "\\(2 + \\dfrac{1}{x^2}\\)" },
        { prompt: "If \\(f(x)=x^3-5x^2+2x+6\\), find \\(f(2)\\).", answer: "\\(-2\\)", method: "\\(8-20+4+6\\)" },
      ],
      traps: [
        {
          title: "f'(1), f''(2) are CONSTANTS — name them and solve",
          body:
            "In \\(f(x)=x^3+x^2f'(1)+xf''(2)+6\\), the terms \\(f'(1)\\) and \\(f''(2)\\) are fixed numbers, not functions. Let them be \\(a, b\\), build \\(f'\\) and \\(f''\\), evaluate at the stated points, and solve the resulting linear system.",
        },
        {
          title: "For f(x) and f(1/x), substitute x to 1/x to get a second equation",
          body:
            "One equation in two unknowns \\(f(x)\\) and \\(f(1/x)\\) is not enough. Replacing \\(x\\) by \\(1/x\\) gives an independent equation; solve the pair simultaneously to isolate \\(f(x)\\) before differentiating.",
        },
        {
          title: "f'(x) = f(x) means exponential",
          body:
            "The only functions satisfying \\(f'=f\\) are \\(f(x)=Ce^{x}\\). Use the given value (e.g. \\(f(1)=2\\)) to fix \\(C\\), then differentiate compositions like \\(h(x)=f(f(x))\\) by the chain rule.",
        },
      ],
    },
  ],
};
