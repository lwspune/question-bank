import type { SubtopicNote } from "@/app/notes/_types";

export const VARIABLE_SEPARABLE_NOTE: SubtopicNote = {
  subtopicName: "Variable-Separable Equations",
  title: "Variable-Separable Differential Equations",
  oneLineDefinition:
    "Get every y (with dy) on one side and every x (with dx) on the other, integrate both sides once, and add a single constant — the workhorse method for first-order MHT-CET differential equations.",
  whyItMatters:
    "This is the most-tested subtopic in the chapter: 33 PYQs sit here (14 HARD, 16 MODERATE, 3 EASY). Almost every first-order MHT-CET equation is separable directly or after one rewrite — taking a log, spotting an exponential, or using a trig product-to-sum. " +
    "The recurring traps are all here too: forgetting the arbitrary constant (or writing two), dividing by a factor g(y) that can be zero, and slipping on the standard integrals that produce log, arctan and arcsin.",
  concepts: [
    // 0 — foundation: the separate-then-integrate idea (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetde-separate-integrate",
      name: "The Separate-Then-Integrate Idea",
      intuition:
        "A first-order equation is separable when you can algebraically herd all the y's (multiplied by dy) to one side and all the x's (multiplied by dx) to the other. Once separated, each side is an ordinary integral in a single variable — integrate both, add ONE constant, done.",
      definition:
        "An equation is **variable-separable** if it can be written in the form \\(\\dfrac{dy}{dx} = f(x)\\,g(y)\\), i.e. the right side factors into an x-only part times a y-only part. Then:\n" +
        "- **Separate:** \\(\\dfrac{dy}{g(y)} = f(x)\\,dx\\) — divide across so each side holds one variable only.\n" +
        "- **Integrate both sides once:** \\(\\displaystyle\\int \\dfrac{dy}{g(y)} = \\int f(x)\\,dx + c\\).\n" +
        "- **One arbitrary constant** for the whole (first-order) equation — never one per side.\n" +
        "The number of arbitrary constants in the general solution equals the ORDER of the equation, so a first-order equation carries exactly one.",
      formula: {
        label: "Separable form and its solution",
        latex:
          "\\dfrac{dy}{dx} = f(x)\\,g(y) \\;\\Longrightarrow\\; \\int \\dfrac{dy}{g(y)} = \\int f(x)\\,dx + c",
        symbols: [
          { symbol: "f(x)", meaning: "the x-only factor (integrated in x)" },
          { symbol: "g(y)", meaning: "the y-only factor (its reciprocal is integrated in y)" },
          { symbol: "c", meaning: "the single arbitrary constant of a first-order equation" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{x}{y}\\).",
        steps: [
          "The right side factors as \\(x \\cdot \\tfrac{1}{y}\\), so it is separable.",
          "Separate: \\(y\\,dy = x\\,dx\\).",
          "Integrate both sides once: \\(\\dfrac{y^2}{2} = \\dfrac{x^2}{2} + c_1\\).",
          "Multiply by 2 and rename the constant: \\(y^2 - x^2 = c\\).",
        ],
        answer: "\\(y^2 - x^2 = c\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = xy\\).",
        steps: [
          "Separate: \\(\\dfrac{dy}{y} = x\\,dx\\).",
          "Integrate: \\(\\log y = \\dfrac{x^2}{2} + \\log c\\).",
          "Exponentiate: \\(y = c\\,e^{x^2/2}\\).",
        ],
        answer: "\\(y = c\\,e^{x^2/2}\\)",
      },
      practiceSet: [
        { prompt: "Separate \\(\\dfrac{dy}{dx} = \\dfrac{y}{x}\\).", answer: "\\(\\dfrac{dy}{y} = \\dfrac{dx}{x}\\); \\(y = cx\\)", method: "divide across, integrate" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} = e^{2y}\\).", answer: "\\(-\\tfrac12 e^{-2y} = x + c\\)", method: "\\(e^{-2y}\\,dy = dx\\)" },
        { prompt: "How many arbitrary constants in the general solution of a FIRST-order equation?", answer: "Exactly one", method: "constants = order" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} = ky\\).", answer: "\\(y = A\\,e^{kx}\\)", method: "\\(\\tfrac{dy}{y}=k\\,dx\\)" },
      ],
      traps: [
        {
          title: "One arbitrary constant, and add it at the integration step",
          body:
            "Integrating both sides of a first-order equation gives ONE constant, not one per side. \\(\\int e^y\\,dy = \\int e^x\\,dx\\) is \\(e^y = e^x + c\\), never \\(e^y + c_1 = e^x + c_2\\). Dropping the constant, or writing two, is the classic separable-method slip.",
        },
        {
          title: "You cannot divide by a factor that might be zero",
          body:
            "To separate \\(\\dfrac{dy}{dx} = f(x)\\,g(y)\\) you divide by \\(g(y)\\) — but if \\(g(y)=0\\) for some \\(y=y_0\\), that constant function \\(y=y_0\\) is a solution you would lose by dividing. Note any such \\(g(y)=0\\) branch before dividing.",
        },
      ],
    },

    // 1 — basic separation & integrate (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-separable-basic",
      name: "Basic Separation and Integrating Both Sides",
      intuition:
        "The bread-and-butter case: the equation separates with only routine algebra, and each side integrates to a power, log or exponential. A great many 'family of curves' questions (\\(y=cx^2\\), \\(y=cx\\)) are exactly this — separate, integrate, read off the family.",
      definition:
        "Once separated, reach for the elementary integrals:\n" +
        "- \\(\\displaystyle\\int \\dfrac{dy}{y} = \\log y\\), \\(\\displaystyle\\int y\\,dy = \\dfrac{y^2}{2}\\), \\(\\displaystyle\\int \\dfrac{dx}{x^2} = -\\dfrac{1}{x}\\).\n" +
        "- Absorbing constants into \\(\\log c\\) turns \\(\\log y = 2\\log x + \\log c\\) into the clean family \\(y = cx^2\\).\n" +
        "- A first-order **linear-looking** equation like \\(x\\dfrac{dy}{dx} = 2y\\) is really separable: \\(\\dfrac{dy}{y} = 2\\dfrac{dx}{x}\\).",
      formula: {
        label: "Standard integrals used after separating",
        latex:
          "\\int \\dfrac{dy}{y} = \\log y + c,\\qquad \\int \\dfrac{dx}{x^2} = -\\dfrac{1}{x} + c",
      },
      authoredExample: {
        prompt: "Solve \\(x\\dfrac{dy}{dx} = 3y\\).",
        steps: [
          "Separate: \\(\\dfrac{dy}{y} = 3\\dfrac{dx}{x}\\).",
          "Integrate: \\(\\log y = 3\\log x + \\log c = \\log(c x^3)\\).",
          "Exponentiate: \\(y = c x^3\\).",
        ],
        answer: "\\(y = c x^3\\) (a family of cubics through the origin)",
      },
      selfCheckExample: {
        prompt:
          "A curve has slope \\(\\dfrac{3y}{x}\\) at \\((x,y)\\) and passes through \\((1,2)\\). Find its equation.",
        steps: [
          "Separate: \\(\\dfrac{dy}{y} = 3\\dfrac{dx}{x}\\).",
          "Integrate: \\(\\log y = 3\\log x + \\log c = \\log(c x^3)\\).",
          "Exponentiate: \\(y = c x^3\\).",
          "Use \\((1,2)\\): \\(2 = c\\cdot 1^3 \\Rightarrow c = 2\\), so \\(y = 2x^3\\).",
        ],
        answer: "\\(y = 2x^3\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(x\\,dy - y\\,dx = 0\\).", answer: "\\(y = cx\\)", method: "\\(\\tfrac{dy}{y}=\\tfrac{dx}{x}\\)" },
        { prompt: "What family does \\(x\\dfrac{dy}{dx} = 2y\\) represent?", answer: "Parabolas \\(y = cx^2\\), vertex at origin, axis along the Y-axis", method: "\\(\\tfrac{dy}{y}=2\\tfrac{dx}{x}\\)" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{y-1}{x(x+1)}\\).", answer: "\\(y-1 = \\dfrac{cx}{x+1}\\)", method: "partial fractions on the x-side" },
        { prompt: "Integrate \\(\\dfrac{dy}{y}\\).", answer: "\\(\\log y + c\\)" },
      ],
      pyqExampleId: "c37c4bf4-aaf4-46ac-9a09-cc92d054570a", // slope 2y/x² through circle centre → x log|y| = 2(x-1)
      traps: [
        {
          title: "Absorb the constant as \\(\\log c\\), not \\(+c\\), when both sides are logs",
          body:
            "When integration gives \\(\\log y = 2\\log x + \\text{(const)}\\), write the constant as \\(\\log c\\) so the answer collapses to the clean family \\(y = cx^2\\). Leaving it as \\(+c\\) blocks the tidy multiplicative form the options are written in.",
        },
        {
          title: "\\(x\\dfrac{dy}{dx} = 2y\\) is a parabola family, not a linear one",
          body:
            "It separates to \\(y = cx^2\\) — parabolas with vertex at the origin and axis along the Y-axis (since \\(x^2 = \\tfrac1c\\,y\\)). Reading it as \\(y = cx\\) (a line) or picking the X-axis parabola is the standard MHT-CET distractor pair.",
        },
      ],
    },

    // 2 — initial condition / particular solution (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-particular-ic",
      name: "Applying an Initial Condition (Particular Solutions)",
      intuition:
        "The general solution carries one arbitrary constant. An initial condition — a single point \\((x_0, y_0)\\) the curve passes through — pins that constant down, giving the particular solution. Golden rule: integrate FIRST (keep the constant), then substitute the condition.",
      definition:
        "Procedure for an initial-value problem (IVP):\n" +
        "- Separate and integrate to the general solution with its arbitrary constant \\(c\\).\n" +
        "- Substitute the given \\((x_0, y_0)\\) to solve for \\(c\\).\n" +
        "- Substitute \\(c\\) back, then evaluate at the requested point.\n" +
        "A very common MHT-CET shape is \\((2+\\sin x)\\dfrac{dy}{dx} + (y+1)\\cos x = 0\\): separating gives \\(\\dfrac{dy}{y+1} = -\\dfrac{\\cos x}{2+\\sin x}\\,dx\\), so \\(\\log(y+1) = -\\log(2+\\sin x) + c\\), i.e. \\((y+1)(2+\\sin x) = k\\).",
      formula: {
        label: "General → particular via the condition",
        latex:
          "y = \\Phi(x, c),\\qquad y(x_0) = y_0 \\;\\Rightarrow\\; c = c_0 \\;\\Rightarrow\\; y = \\Phi(x, c_0)",
      },
      authoredExample: {
        prompt:
          "Solve \\(\\dfrac{dy}{dx} = 2y\\) with \\(y(0)=3\\), and find \\(y\\!\\left(\\tfrac12\\log 2\\right)\\).",
        steps: [
          "Separate: \\(\\dfrac{dy}{y} = 2\\,dx\\).",
          "Integrate (keep the constant): \\(\\log y = 2x + c\\).",
          "Apply \\(y(0)=3\\): \\(\\log 3 = c\\), so \\(\\log y = 2x + \\log 3\\), i.e. \\(y = 3\\,e^{2x}\\).",
          "At \\(x = \\tfrac12\\log 2\\): \\(y = 3\\,e^{\\log 2} = 3\\cdot 2 = 6\\).",
        ],
        answer: "\\(y\\!\\left(\\tfrac12\\log 2\\right) = 6\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{dy}{dx} = y+3\\) with \\(y+3>0\\) and \\(y(0)=2\\), find \\(y(\\log 2)\\).",
        steps: [
          "Separate: \\(\\dfrac{dy}{y+3} = dx\\), integrate: \\(\\log(y+3) = x + c\\).",
          "Apply \\(y(0)=2\\): \\(\\log 5 = c\\).",
          "At \\(x = \\log 2\\): \\(y+3 = 5\\,e^{\\log 2} = 10\\), so \\(y = 7\\).",
        ],
        answer: "\\(y(\\log 2) = 7\\)",
      },
      practiceSet: [
        { prompt: "For an IVP, do you substitute the condition before or after integrating?", answer: "After — integrate first, keep the constant, then substitute", method: "or you lose the constant" },
        { prompt: "General solution \\((y+1)(2+\\sin x)=k\\), \\(y(0)=2\\). Find \\(k\\).", answer: "\\(k = 6\\)", method: "\\((3)(2)=6\\)" },
        { prompt: "\\(\\dfrac{dy}{dx}=y+3\\), \\(y(0)=0\\). Value of \\(c\\) in \\(\\log(y+3)=x+c\\)?", answer: "\\(c = \\log 3\\)" },
        { prompt: "After finding \\(c\\), what is the last step?", answer: "Substitute \\(c\\) back and evaluate at the requested point" },
      ],
      pyqExampleId: "096a0ca1-a4e6-4ca9-8f9a-6810f0000d33", // (2+sinx)y'+(y+1)cosx=0, y(0)=1 → y(π/2)=1/3
      traps: [
        {
          title: "Don't forget the \\(+c\\) BEFORE applying the initial condition",
          body:
            "The whole point of an IVP is to determine the constant from the condition — so you must carry \\(c\\) through the integration. Substituting the point before integrating, or dropping \\(c\\), leaves you nothing to solve for and gives the wrong particular solution.",
        },
        {
          title: "Watch the \\(\\log\\) → product conversion",
          body:
            "\\(\\log(y+1) = -\\log(2+\\sin x) + c\\) becomes \\((y+1)(2+\\sin x) = k\\) (a PRODUCT, since the constant absorbs as \\(\\log k\\)). Writing it as a sum, or keeping a stray minus outside, mis-fixes the constant and throws the final value.",
        },
      ],
    },

    // 3 — separables in disguise: log(dy/dx), exponential RHS (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-exponential-disguise",
      name: "Separables in Disguise — Logs and Exponential Right Sides",
      intuition:
        "Some equations look non-separable until one rewrite exposes the split. \\(\\log\\!\\big(\\tfrac{dy}{dx}\\big) = ax+by\\) hides an exponential; \\(\\tfrac{dy}{dx} = 2xy\\,e^{x^2}\\) hides a product. Exponentiate or factor first, then the variables come apart cleanly.",
      definition:
        "Two recurring disguises:\n" +
        "- **Log of the derivative:** \\(\\log\\!\\big(\\tfrac{dy}{dx}\\big) = ax + by \\Rightarrow \\tfrac{dy}{dx} = e^{ax}e^{by} \\Rightarrow e^{-by}\\,dy = e^{ax}\\,dx\\), giving \\(a\\,e^{-by} + b\\,e^{ax} = c_1\\).\n" +
        "- **Exponential factor on the RHS:** \\(\\tfrac{dy}{dx} = 2xy\\,e^{x^2} \\Rightarrow \\dfrac{dy}{y} = 2x\\,e^{x^2}\\,dx\\); put \\(u = x^2\\) so the x-side is \\(\\int e^u\\,du = e^{x^2}\\), giving \\(\\log y = e^{x^2} + \\log c\\), i.e. \\(y = c\\,e^{e^{x^2}}\\).\n" +
        "- The **product form** \\(e^{\\,y-x}\\tfrac{dy}{dx} = \\dfrac{y(\\sin x+\\cos x)}{1+y\\log y}\\) rearranges to \\(\\dfrac{e^y(1+y\\log y)}{y}\\,dy = e^x(\\sin x+\\cos x)\\,dx\\), and the standard trick \\(\\int e^x\\big(f+f'\\big)\\,dx = e^x f\\) collapses the RHS to \\(e^x\\sin x\\), giving \\(e^y\\log y = e^x\\sin x + c\\).",
      formula: {
        label: "Exponentiate to separate; the eˣ(f + f′) trick",
        latex:
          "\\log\\!\\Big(\\tfrac{dy}{dx}\\Big) = ax+by \\;\\Rightarrow\\; e^{-by}\\,dy = e^{ax}\\,dx,\\qquad \\int e^x\\big(f(x)+f'(x)\\big)\\,dx = e^x f(x) + c",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = 2xy\\,e^{x^2}\\).",
        steps: [
          "Factor the RHS: it is \\(y \\cdot \\big(2x\\,e^{x^2}\\big)\\), so separate: \\(\\dfrac{dy}{y} = 2x\\,e^{x^2}\\,dx\\).",
          "For the x-side put \\(u = x^2\\), \\(du = 2x\\,dx\\): \\(\\int e^u\\,du = e^{x^2}\\).",
          "So \\(\\log y = e^{x^2} + \\log c\\), i.e. \\(\\log\\tfrac{y}{c} = e^{x^2}\\).",
          "Exponentiate: \\(y = c\\,e^{e^{x^2}}\\).",
        ],
        answer: "\\(y = c\\,e^{e^{x^2}}\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\log\\!\\Big(\\dfrac{dy}{dx}\\Big) = ax + by\\).",
        steps: [
          "Exponentiate: \\(\\dfrac{dy}{dx} = e^{ax+by} = e^{ax}\\,e^{by}\\).",
          "Separate: \\(e^{-by}\\,dy = e^{ax}\\,dx\\).",
          "Integrate: \\(-\\dfrac{1}{b}e^{-by} = \\dfrac{1}{a}e^{ax} + C\\).",
          "Multiply through by \\(-ab\\) and rename: \\(a\\,e^{-by} + b\\,e^{ax} = c_1\\).",
        ],
        answer: "\\(a\\,e^{-by} + b\\,e^{ax} = c_1\\)",
      },
      practiceSet: [
        { prompt: "Separate \\(\\log\\!\\big(\\tfrac{dy}{dx}\\big) = 2x + 3y\\).", answer: "\\(e^{-3y}\\,dy = e^{2x}\\,dx\\)", method: "exponentiate then split" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} = 2xy\\,e^{x^2}\\).", answer: "\\(y = c\\,e^{e^{x^2}}\\)", method: "put \\(u=x^2\\) on the x-side" },
        { prompt: "Evaluate \\(\\int e^x(\\sin x + \\cos x)\\,dx\\).", answer: "\\(e^x \\sin x + c\\)", method: "\\(\\int e^x(f+f') = e^x f\\), \\(f=\\sin x\\)" },
        { prompt: "\\(\\ln(dy/dx) + y = x\\): separate.", answer: "\\(e^y\\,dy = e^x\\,dx\\)", method: "\\(dy/dx = e^{x-y}\\)" },
      ],
      pyqExampleId: "1d166c2e-ac5a-42a6-a12f-f4de88da97ba", // e^{y-x}y' = y(sinx+cosx)/(1+y log y) → e^y log y = eˣ sin x + c
      traps: [
        {
          title: "Take logs / exponentials to unlock separation",
          body:
            "An equation like \\(\\log(dy/dx)=ax+by\\) looks non-separable until you exponentiate to \\(dy/dx = e^{ax}e^{by}\\), which splits cleanly. Always test whether one rewrite makes the variables come apart before reaching for a heavier method.",
        },
        {
          title: "Spot the \\(\\int e^x(f+f')\\,dx = e^x f\\) pattern",
          body:
            "On the x-side, \\(e^x(\\sin x + \\cos x) = e^x(f + f')\\) with \\(f = \\sin x\\), so its integral is \\(e^x\\sin x\\) (NOT \\(e^x\\cos x\\)). Missing this pattern — or picking \\(f=\\cos x\\) — sends you to the wrong option; note that the y-side of \\(\\frac{e^y(1+y\\log y)}{y}\\) integrates to \\(e^y\\log y\\) by the same trick with \\(f = \\log y\\).",
        },
      ],
    },

    // 4 — trig-product separables (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-trig-product",
      name: "Trigonometric-Product Separables",
      intuition:
        "When an equation is a product of an x-trig factor and a y-trig factor — \\(\\cos x(1+\\cos y)\\,dx = \\sin y(1+\\sin x)\\,dy\\), or \\(\\tfrac{dy}{dx} = \\cot x\\cot y\\) — it separates immediately. The only work is integrating each trig side, often as a \\(\\log\\) of the denominator. A product-to-sum identity sometimes has to come first.",
      definition:
        "Trig separables split into standard log-integrals:\n" +
        "- \\(\\displaystyle\\int \\dfrac{\\cos x}{1+\\sin x}\\,dx = \\log(1+\\sin x)\\), \\(\\displaystyle\\int \\dfrac{\\sin y}{1+\\cos y}\\,dy = -\\log(1+\\cos y)\\) — both are \\(\\int \\tfrac{f'}{f}\\).\n" +
        "- \\(\\dfrac{dy}{dx} = \\cot x\\cot y \\Rightarrow \\tan y\\,dy = \\cot x\\,dx \\Rightarrow -\\log\\cos y = \\log\\sin x - \\log c\\), i.e. \\(\\sin x = c\\sec y\\).\n" +
        "- **Product-to-sum first:** \\(\\sin\\tfrac{x-y}{2} - \\sin\\tfrac{x+y}{2} = -2\\cos\\tfrac{x}{2}\\sin\\tfrac{y}{2}\\), which then separates as \\(\\csc\\tfrac{y}{2}\\,dy = -2\\cos\\tfrac{x}{2}\\,dx\\).",
      formula: {
        label: "The log-integrals you reach for",
        latex:
          "\\int \\dfrac{\\cos x}{1+\\sin x}\\,dx = \\log(1+\\sin x) + c,\\qquad \\int \\tan y\\,dy = -\\log\\cos y + c = \\log\\sec y + c",
      },
      authoredExample: {
        prompt:
          "Solve \\(\\cos x(1+\\cos y)\\,dx - \\sin y(1+\\sin x)\\,dy = 0\\).",
        steps: [
          "Separate: \\(\\dfrac{\\cos x}{1+\\sin x}\\,dx = \\dfrac{\\sin y}{1+\\cos y}\\,dy\\).",
          "Each side is \\(\\int \\tfrac{f'}{f}\\): LHS \\(= \\log(1+\\sin x)\\), RHS \\(= -\\log(1+\\cos y)\\).",
          "So \\(\\log(1+\\sin x) = -\\log(1+\\cos y) + \\log c\\).",
          "Combine: \\((1+\\sin x)(1+\\cos y) = c\\).",
        ],
        answer: "\\((1+\\sin x)(1+\\cos y) = c\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\cot x\\cdot\\cot y\\).",
        steps: [
          "Separate: \\(\\tan y\\,dy = \\cot x\\,dx\\).",
          "Integrate: \\(-\\log\\cos y = \\log\\sin x - \\log c\\).",
          "So \\(\\log\\sec y + \\log c = \\log\\sin x\\), giving \\(\\sin x = c\\sec y\\).",
        ],
        answer: "\\(\\sin x = c\\sec y\\)",
      },
      practiceSet: [
        { prompt: "\\(\\displaystyle\\int \\dfrac{\\cos x}{1+\\sin x}\\,dx\\).", answer: "\\(\\log(1+\\sin x) + c\\)", method: "\\(\\int f'/f\\)" },
        { prompt: "\\(\\displaystyle\\int \\tan y\\,dy\\).", answer: "\\(\\log\\sec y + c\\)" },
        { prompt: "Separate \\(3e^x\\tan y\\,dx + (1-e^x)\\sec^2 y\\,dy = 0\\).", answer: "\\(\\dfrac{3e^x}{1-e^x}\\,dx = -\\dfrac{\\sec^2 y}{\\tan y}\\,dy\\)", method: "each side \\(\\int f'/f\\)" },
        { prompt: "Product-to-sum: \\(\\sin\\tfrac{x-y}{2} - \\sin\\tfrac{x+y}{2} = ?\\)", answer: "\\(-2\\cos\\tfrac{x}{2}\\sin\\tfrac{y}{2}\\)" },
      ],
      pyqExampleId: "6e781c9a-ddaf-4e7c-b4dc-a1e3e63605dc", // x cos y dy = (x eˣ log x + eˣ) dx → sin y = eˣ log x + c
      traps: [
        {
          title: "Apply product-to-sum BEFORE trying to separate",
          body:
            "\\(\\dfrac{dy}{dx} + \\sin\\tfrac{x+y}{2} = \\sin\\tfrac{x-y}{2}\\) does not separate as written. Convert the difference of sines: \\(\\sin\\tfrac{x-y}{2} - \\sin\\tfrac{x+y}{2} = -2\\cos\\tfrac{x}{2}\\sin\\tfrac{y}{2}\\). Only then does \\(\\csc\\tfrac{y}{2}\\,dy = -2\\cos\\tfrac{x}{2}\\,dx\\) fall out, integrating to \\(\\log\\tan\\tfrac{y}{4} = c - 2\\sin\\tfrac{x}{2}\\).",
        },
        {
          title: "Signs of the trig log-integrals",
          body:
            "\\(\\int \\dfrac{\\sin y}{1+\\cos y}\\,dy = -\\log(1+\\cos y)\\) (a MINUS, because \\(\\tfrac{d}{dy}(1+\\cos y) = -\\sin y\\)), while \\(\\int \\dfrac{\\cos x}{1+\\sin x}\\,dx = +\\log(1+\\sin x)\\). Dropping that minus turns the product answer \\((1+\\sin x)(1+\\cos y)=c\\) into a wrong sum.",
        },
      ],
    },

    // 5 — rational separables → arctan / arcsin / circles (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-rational-arctan-arcsin",
      name: "Rational Separables — arctan, arcsin, and Families of Circles",
      intuition:
        "When separation leaves \\(\\dfrac{dy}{1+y^2}\\) you get \\(\\tan^{-1}y\\); when it leaves \\(\\dfrac{y\\,dy}{\\sqrt{k^2-y^2}}\\) you get \\(-\\sqrt{k^2-y^2}\\). These standard integrals turn many geometric problems (slope conditions, normal-length conditions) into families of circles.",
      definition:
        "The standard integrals that appear here:\n" +
        "- \\(\\displaystyle\\int \\dfrac{dy}{1+y^2} = \\tan^{-1}y\\); combining \\(\\tan^{-1}y - \\tan^{-1}x = \\tan^{-1}c\\) gives \\(\\dfrac{y-x}{1+xy} = c\\).\n" +
        "- \\(\\displaystyle\\int \\dfrac{y\\,dy}{\\sqrt{k^2-y^2}} = -\\sqrt{k^2-y^2}\\), so \\(\\dfrac{y\\,dy}{\\sqrt{k^2-y^2}} = \\pm dx\\) integrates to \\(x^2 + y^2 = k^2\\) — a family of circles.\n" +
        "- \\(y\\dfrac{dy}{dx} = a - x\\) integrates to \\(x^2 + y^2 - 2ax - 2c = 0\\): circles with centre \\((a,0)\\), radius \\(\\sqrt{a^2+2c}\\).",
      formula: {
        label: "arctan and the circle-producing integral",
        latex:
          "\\int \\dfrac{dy}{1+y^2} = \\tan^{-1}y + c,\\qquad \\int \\dfrac{y\\,dy}{\\sqrt{k^2-y^2}} = -\\sqrt{k^2-y^2} + c",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{1+y^2}{1+x^2}\\).",
        steps: [
          "Separate: \\(\\dfrac{dy}{1+y^2} = \\dfrac{dx}{1+x^2}\\).",
          "Integrate: \\(\\tan^{-1}y = \\tan^{-1}x + \\tan^{-1}c\\).",
          "Bring together: \\(\\tan^{-1}y - \\tan^{-1}x = \\tan^{-1}c\\), i.e. \\(\\tan^{-1}\\dfrac{y-x}{1+xy} = \\tan^{-1}c\\).",
          "So \\(y - x = c(1+xy)\\).",
        ],
        answer: "\\(y - x = c(1+xy)\\)",
      },
      selfCheckExample: {
        prompt:
          "The equation \\(\\dfrac{dy}{dx} = \\dfrac{\\sqrt{1-y^2}}{y}\\) determines a family of circles. Describe it.",
        steps: [
          "Separate: \\(\\dfrac{y\\,dy}{\\sqrt{1-y^2}} = dx\\).",
          "Integrate: \\(-\\sqrt{1-y^2} = x + C\\).",
          "Square: \\((x+C)^2 + y^2 = 1\\).",
          "So the centres \\((-C, 0)\\) lie on the X-axis and the radius is fixed at 1.",
        ],
        answer: "Fixed radius 1, variable centres along the X-axis.",
      },
      practiceSet: [
        { prompt: "\\(\\displaystyle\\int \\dfrac{dy}{1+y^2}\\).", answer: "\\(\\tan^{-1}y + c\\)" },
        { prompt: "Combine \\(\\tan^{-1}y - \\tan^{-1}x = \\tan^{-1}c\\).", answer: "\\(\\dfrac{y-x}{1+xy} = c\\)", method: "subtraction formula" },
        { prompt: "\\(\\displaystyle\\int \\dfrac{y\\,dy}{\\sqrt{k^2-y^2}}\\).", answer: "\\(-\\sqrt{k^2-y^2} + c\\)" },
        { prompt: "\\(y\\dfrac{dy}{dx} = a - x\\) gives which curve?", answer: "Circle \\(x^2+y^2-2ax-2c=0\\), centre \\((a,0)\\)", method: "integrate both sides" },
      ],
      pyqExampleId: "ac97a151-8d04-4dd2-8deb-ef84547a9366", // dy/dx=(1+y²)/(1+x²) → y-x = c(1+xy)
      traps: [
        {
          title: "Write the arctan constant as \\(\\tan^{-1}c\\), then use the subtraction formula",
          body:
            "\\(\\tan^{-1}y = \\tan^{-1}x + \\tan^{-1}c\\) only collapses to \\(y-x = c(1+xy)\\) if you set the constant as \\(\\tan^{-1}c\\) and apply \\(\\tan^{-1}A - \\tan^{-1}B = \\tan^{-1}\\tfrac{A-B}{1+AB}\\). A bare \\(+c\\) leaves you stuck at \\(\\tan^{-1}y - \\tan^{-1}x = c\\).",
        },
        {
          title: "Identify the circle's centre-axis and radius carefully",
          body:
            "For \\(\\dfrac{dy}{dx} = \\dfrac{\\sqrt{1-y^2}}{y}\\) the solution \\((x+C)^2 + y^2 = 1\\) has FIXED radius 1 and centres on the X-axis. For \\(y\\,dy = (a-x)\\,dx\\) the radius is \\(\\sqrt{a^2+2c}\\) — variable, centre \\((a,0)\\). Read which quantity is fixed vs variable before choosing the option.",
        },
      ],
    },

    // 6 — direct integration dy/dx = f(x) (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-direct-integration",
      name: "Direct Integration — dy/dx = f(x) and Slope-of-Curve Problems",
      intuition:
        "The simplest separable case: when \\(\\dfrac{dy}{dx}\\) depends on x ONLY, there is no y to move — just integrate the x-side once. Most 'slope of the tangent at any point is …' curve problems reduce to this, often after a preliminary simplification or a polynomial division.",
      definition:
        "When \\(\\dfrac{dy}{dx} = f(x)\\), the solution is simply \\(y = \\int f(x)\\,dx + c\\). Useful setups:\n" +
        "- **Simplify first:** \\(\\dfrac{dy}{dx} = \\dfrac{3e^{2x}+3e^{4x}}{e^x+e^{-x}} = \\dfrac{3e^{2x}(1+e^{2x})}{e^{-x}(e^{2x}+1)} = 3e^{3x}\\), so \\(y = e^{3x} + c\\).\n" +
        "- **Polynomial division:** \\((x+2)\\dfrac{dy}{dx} = x^2+4x-9\\) gives \\(\\dfrac{dy}{dx} = (x+2) - \\dfrac{13}{x+2}\\), which integrates to \\(y = \\tfrac{(x+2)^2}{2} - 13\\log|x+2| + c\\).\n" +
        "- **A constant derivative** from an implicit relation: \\(\\cos\\!\\big(\\tfrac{dy}{dx}\\big) = 7 \\Rightarrow \\tfrac{dy}{dx} = \\cos^{-1}7\\) (a constant), so \\(y = (\\cos^{-1}7)x + c\\).",
      formula: {
        label: "Pure x-side integration",
        latex:
          "\\dfrac{dy}{dx} = f(x) \\;\\Longrightarrow\\; y = \\int f(x)\\,dx + c",
      },
      authoredExample: {
        prompt:
          "Solve \\((x+2)\\dfrac{dy}{dx} = x^2 + 4x - 9\\) with \\(y(0)=0\\), and find \\(y(-4)\\).",
        steps: [
          "Divide: \\(\\dfrac{x^2+4x-9}{x+2} = (x+2) - \\dfrac{13}{x+2}\\), so \\(\\dfrac{dy}{dx} = (x+2) - \\dfrac{13}{x+2}\\).",
          "Integrate: \\(y = \\dfrac{(x+2)^2}{2} - 13\\log|x+2| + c\\).",
          "Apply \\(y(0)=0\\): \\(0 = 2 - 13\\log 2 + c \\Rightarrow c = 13\\log 2 - 2\\).",
          "At \\(x=-4\\): \\(y = 2 - 13\\log 2 + 13\\log 2 - 2 = 0\\).",
        ],
        answer: "\\(y(-4) = 0\\)",
      },
      selfCheckExample: {
        prompt:
          "A curve through \\(\\left(2, \\tfrac{9}{2}\\right)\\) has slope \\(1 - \\dfrac{1}{x^2}\\) at \\((x,y)\\). Find its equation.",
        steps: [
          "Integrate the x-only slope: \\(y = x + \\dfrac{1}{x} + c\\).",
          "Apply \\(\\left(2, \\tfrac{9}{2}\\right)\\): \\(\\tfrac{9}{2} = 2 + \\tfrac{1}{2} + c \\Rightarrow c = 2\\).",
          "So \\(y = x + \\dfrac{1}{x} + 2\\); multiply by \\(x\\): \\(xy = x^2 + 2x + 1\\).",
        ],
        answer: "\\(xy = x^2 + 2x + 1\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\dfrac{dy}{dx} = 3e^{3x}\\).", answer: "\\(y = e^{3x} + c\\)" },
        { prompt: "Simplify \\(\\dfrac{3e^{2x}+3e^{4x}}{e^x+e^{-x}}\\).", answer: "\\(3e^{3x}\\)", method: "factor \\(3e^{2x}(1+e^{2x})\\), cancel" },
        { prompt: "\\(\\cos\\!\\big(\\tfrac{dy}{dx}\\big) = 7\\): what is \\(\\tfrac{dy}{dx}\\)?", answer: "\\(\\cos^{-1}7\\) (a constant)", method: "invert the cosine" },
        { prompt: "Solve \\(\\dfrac{1}{x}\\dfrac{dy}{dx} = \\tan^{-1}x\\).", answer: "\\(y = \\tfrac{x^2}{2}\\tan^{-1}x - \\tfrac12(x - \\tan^{-1}x) + c\\)", method: "\\(dy = x\\tan^{-1}x\\,dx\\), by parts" },
      ],
      pyqExampleId: "9bc248ae-9e04-4425-874a-2ea63a624d3d", // (x+2)y'=x²+4x-9, y(0)=0 → y(-4)=0
      traps: [
        {
          title: "Simplify the RHS before integrating",
          body:
            "\\(\\dfrac{3e^{2x}+3e^{4x}}{e^x+e^{-x}}\\) looks like it needs a substitution, but it collapses to \\(3e^{3x}\\) after factoring — then \\(y = e^{3x}+c\\) in one line. Grinding the quotient without simplifying invites algebra errors.",
        },
        {
          title: "Divide the polynomial before integrating a rational \\(f(x)\\)",
          body:
            "For \\(\\dfrac{dy}{dx} = \\dfrac{x^2+4x-9}{x+2}\\), do the division first: \\((x+2) - \\dfrac{13}{x+2}\\). Integrating term-by-term gives the \\(\\log|x+2|\\) piece cleanly; trying to integrate the raw quotient is where students lose the log term.",
        },
      ],
    },
  ],
};
