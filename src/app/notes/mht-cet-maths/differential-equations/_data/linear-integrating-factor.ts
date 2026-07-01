import type { SubtopicNote } from "@/app/notes/_types";

export const LINEAR_IF_NOTE: SubtopicNote = {
  subtopicName: "Linear Differential Equations (Integrating Factor)",
  title: "Linear Differential Equations — the Integrating Factor",
  oneLineDefinition:
    "A first-order linear ODE has the shape dy/dx + P(x)y = Q(x). Multiply by the integrating factor IF = e to the power of the integral of P, and the left side collapses into d/dx(y times IF) — integrate once and you are done.",
  whyItMatters:
    "This is the workhorse subtopic and the densest HARD pool in the chapter — 24 PYQs, most of them HARD. Nearly every question is one skill: force the equation into standard form, read off P and Q, build the integrating factor, and integrate. " +
    "The recurring MHT-CET traps live entirely here: reading P before the equation is in standard form, missing that some equations are only linear in x (swap the roles of x and y), and failing to spot a Bernoulli equation that becomes linear after one substitution.",
  concepts: [
    // 1 — standard form recognition (FOUNDATION, no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetde-standard-form",
      name: "Recognizing the Standard Linear Form",
      intuition:
        "Before you can use any of this, the equation must be written so that dy/dx sits alone with coefficient 1, the plain-y term is on the same side, and everything free of y is on the right. That shape — dy/dx plus P(x)y equals Q(x) — is what makes the whole integrating-factor machine run. Get the equation into it FIRST; only then read P and Q.",
      definition:
        "A first-order ODE is **linear** when it can be written in the standard form\n" +
        "\\[\\dfrac{dy}{dx} + P(x)\\,y = Q(x),\\]\n" +
        "where \\(P\\) and \\(Q\\) depend on \\(x\\) only (not on \\(y\\)). To reach it:\n" +
        "- **Divide through** by whatever multiplies \\(\\dfrac{dy}{dx}\\) so its coefficient becomes \\(1\\).\n" +
        "- **Collect** every term containing \\(y\\) on the left; the rest becomes \\(Q(x)\\) on the right.\n" +
        "- \\(P(x)\\) is then the coefficient of \\(y\\), read off **only after** the coefficient of \\(\\dfrac{dy}{dx}\\) is \\(1\\).",
      formula: {
        label: "Standard linear form",
        latex: "\\dfrac{dy}{dx} + P(x)\\,y = Q(x)",
        symbols: [
          { symbol: "P(x)", meaning: "coefficient of y — read AFTER dividing so dy/dx has coefficient 1" },
          { symbol: "Q(x)", meaning: "everything with no y, on the right" },
        ],
      },
      authoredExample: {
        prompt:
          "Put \\(x\\dfrac{dy}{dx} - 2y = x^3\\) into standard linear form and identify \\(P(x)\\) and \\(Q(x)\\).",
        steps: [
          "Divide every term by \\(x\\) so \\(\\dfrac{dy}{dx}\\) has coefficient \\(1\\): \\(\\dfrac{dy}{dx} - \\dfrac{2}{x}y = x^2\\).",
          "Compare with \\(\\dfrac{dy}{dx} + P(x)y = Q(x)\\).",
          "Read off: \\(P(x) = -\\dfrac{2}{x}\\), \\(Q(x) = x^2\\).",
        ],
        answer: "\\(P(x) = -\\dfrac{2}{x}\\), \\(Q(x) = x^2\\).",
      },
      selfCheckExample: {
        prompt:
          "Write \\((1+x^2)\\dfrac{dy}{dx} + 2xy = 4x^2\\) in standard form and give \\(P(x)\\).",
        steps: [
          "Divide by \\(1+x^2\\): \\(\\dfrac{dy}{dx} + \\dfrac{2x}{1+x^2}\\,y = \\dfrac{4x^2}{1+x^2}\\).",
          "So \\(P(x) = \\dfrac{2x}{1+x^2}\\) and \\(Q(x) = \\dfrac{4x^2}{1+x^2}\\).",
        ],
        answer: "\\(P(x) = \\dfrac{2x}{1+x^2}\\).",
      },
      practiceSet: [
        { prompt: "Standard form of \\(2\\dfrac{dy}{dx} + 6y = e^x\\): give \\(P\\).", answer: "\\(P = 3\\)", method: "divide by 2 first" },
        { prompt: "For \\(x\\dfrac{dy}{dx} + y = \\log x\\), what is \\(P(x)\\)?", answer: "\\(\\dfrac{1}{x}\\)", method: "divide by \\(x\\)" },
        { prompt: "For \\(\\cos x\\dfrac{dy}{dx} - y\\sin x = 6x\\), what is \\(P(x)\\)?", answer: "\\(-\\tan x\\)", method: "divide by \\(\\cos x\\)" },
        { prompt: "Is \\(\\dfrac{dy}{dx} + xy^2 = x\\) linear?", answer: "No", method: "the \\(y^2\\) term breaks linearity" },
      ],
      traps: [
        {
          title: "Read \\(P\\) only AFTER making the \\(\\dfrac{dy}{dx}\\) coefficient \\(1\\)",
          body:
            "In \\(\\cos x\\,\\dfrac{dy}{dx} - y\\sin x = 6x\\), the naive read \\(P = -\\sin x\\) is wrong. Divide by \\(\\cos x\\) first: \\(\\dfrac{dy}{dx} - y\\tan x = 6x\\sec x\\), so \\(P = -\\tan x\\). Reading \\(P\\) before normalizing the leading coefficient is the single most common mistake here.",
        },
        {
          title: "A \\(y^2\\), \\(\\sqrt{y}\\), or \\(1/y\\) means it is NOT linear (yet)",
          body:
            "Linear means \\(y\\) appears only to the first power. Terms like \\(y^2\\sec x\\) or \\(y^4\\cos x\\) are NON-linear — those are Bernoulli equations that first need a substitution before an integrating factor applies.",
        },
      ],
    },

    // 2 — IF and the solution formula (CORE, anchored)
    {
      kind: "formula" as const,
      slug: "cetde-integrating-factor-solution",
      name: "The Integrating Factor and the Solution Formula",
      intuition:
        "Once the equation is in standard form, multiply the whole thing by the integrating factor IF = e to the integral of P. The magic: the left side becomes an exact derivative, d/dx of (y times IF). So integrating both sides just once gives y times IF equals the integral of Q times IF. Two formulas carry the entire subtopic.",
      definition:
        "For the standard linear ODE \\(\\dfrac{dy}{dx} + P(x)y = Q(x)\\):\n" +
        "- The **integrating factor** is \\(\\text{IF} = e^{\\int P\\,dx}\\).\n" +
        "- Multiplying by IF turns the left side into a perfect derivative: \\(\\dfrac{d}{dx}\\big(y\\cdot\\text{IF}\\big) = Q\\cdot\\text{IF}\\).\n" +
        "- Integrating once gives the **solution formula**\n" +
        "\\[y\\cdot\\text{IF} = \\int Q\\cdot\\text{IF}\\,dx + c.\\]\n" +
        "The constant \\(c\\) is fixed later by any initial condition. Everything in this subtopic is: normalize, compute IF, integrate \\(Q\\cdot\\text{IF}\\).",
      formula: {
        label: "Integrating factor and general solution",
        latex:
          "\\text{IF} = e^{\\int P(x)\\,dx}, \\qquad y\\cdot\\text{IF} = \\int Q(x)\\cdot\\text{IF}\\,dx + c",
        symbols: [
          { symbol: "IF", meaning: "the integrating factor e to the integral of P" },
          { symbol: "c", meaning: "the single arbitrary constant, fixed by an initial condition" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} + 2y = e^{-2x}\\).",
        steps: [
          "Already standard: \\(P = 2\\), \\(Q = e^{-2x}\\).",
          "\\(\\text{IF} = e^{\\int 2\\,dx} = e^{2x}\\).",
          "Solution formula: \\(y\\,e^{2x} = \\int e^{-2x}\\cdot e^{2x}\\,dx + c = \\int 1\\,dx + c = x + c\\).",
          "Divide by \\(e^{2x}\\): \\(y = (x+c)e^{-2x}\\).",
        ],
        answer: "\\(y = (x + c)e^{-2x}\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(y + \\dfrac{d}{dx}(xy) = x(\\sin x + \\log x)\\), reduce it to a linear ODE, find the integrating factor, and give the solution.",
        steps: [
          "Expand \\(\\dfrac{d}{dx}(xy) = x\\dfrac{dy}{dx} + y\\): the equation becomes \\(x\\dfrac{dy}{dx} + 2y = x(\\sin x + \\log x)\\).",
          "Divide by \\(x\\): \\(\\dfrac{dy}{dx} + \\dfrac{2}{x}y = \\sin x + \\log x\\), so \\(P = \\dfrac{2}{x}\\).",
          "\\(\\text{IF} = e^{\\int \\frac{2}{x}dx} = e^{2\\log x} = x^2\\).",
          "\\(y x^2 = \\int (x^2\\sin x + x^2\\log x)\\,dx = -x^2\\cos x + 2x\\sin x + 2\\cos x + \\dfrac{x^3}{3}\\log x - \\dfrac{x^3}{9} + c\\); divide by \\(x^2\\).",
        ],
        answer:
          "\\(y = -\\cos x + \\dfrac{2}{x}\\sin x + \\dfrac{2}{x^2}\\cos x + \\dfrac{x}{3}\\log x - \\dfrac{x}{9} + \\dfrac{c}{x^2}\\).",
      },
      practiceSet: [
        { prompt: "IF for \\(\\dfrac{dy}{dx} + 3y = x\\).", answer: "\\(e^{3x}\\)", method: "\\(e^{\\int 3\\,dx}\\)" },
        { prompt: "IF for \\(\\dfrac{dy}{dx} + \\dfrac{y}{x} = x\\).", answer: "\\(x\\)", method: "\\(e^{\\int \\frac{1}{x}dx} = e^{\\log x}\\)" },
        { prompt: "After multiplying by IF, the left side equals?", answer: "\\(\\dfrac{d}{dx}(y\\cdot\\text{IF})\\)" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} + y = 0\\).", answer: "\\(y = ce^{-x}\\)", method: "IF \\(= e^x\\); \\(ye^x = c\\)" },
      ],
      pyqExampleId: "cb3273f0-ee95-45e2-8382-3c570b41a156",
      traps: [
        {
          title: "The left side is \\(\\dfrac{d}{dx}(y\\cdot\\text{IF})\\) — do not re-differentiate the product",
          body:
            "After multiplying by IF, the entire left side is ALREADY the derivative of \\(y\\cdot\\text{IF}\\). Integrating both sides simply un-does it, giving \\(y\\cdot\\text{IF} = \\int Q\\cdot\\text{IF}\\,dx + c\\). Students who try to apply the product rule again are re-doing work the integrating factor already handled.",
        },
        {
          title: "One arbitrary constant only, added at the integration step",
          body:
            "The solution formula produces exactly ONE constant \\(c\\), not one per side. Add it when you integrate \\(\\int Q\\cdot\\text{IF}\\,dx\\); an initial condition then pins its value.",
        },
      ],
    },

    // 3 — simple integrating factors (CORE workhorse, many anchors)
    {
      kind: "formula" as const,
      slug: "cetde-simple-integrating-factors",
      name: "Simple Integrating Factors",
      intuition:
        "Most exam questions have a friendly P whose integral you can do in your head, so the IF comes out as a clean power, a clean exponential, or a trig factor. The three you meet constantly: P = n/x gives IF = x to the n; a constant P gives an exponential; and P = -tan x gives IF = cos x. Recognize the pattern and the IF is instant.",
      definition:
        "Common integrating factors worth recognizing at a glance:\n" +
        "- \\(P = \\dfrac{1}{x} \\Rightarrow \\text{IF} = e^{\\log x} = x\\); more generally \\(P = \\dfrac{n}{x} \\Rightarrow \\text{IF} = x^{n}\\).\n" +
        "- \\(P = \\dfrac{2x}{1+x^2} \\Rightarrow \\text{IF} = e^{\\log(1+x^2)} = 1+x^2\\) (and likewise \\(\\dfrac{3x^2}{1+x^3} \\Rightarrow 1+x^3\\)).\n" +
        "- \\(P = \\text{constant } k \\Rightarrow \\text{IF} = e^{kx}\\).\n" +
        "- \\(P = -\\tan x \\Rightarrow \\text{IF} = e^{\\log\\cos x} = \\cos x\\); \\(P = \\cot x \\Rightarrow \\text{IF} = \\sin x\\).\n" +
        "In every case the pattern is: \\(\\int P\\,dx\\) is a logarithm, so the IF is what that logarithm is a log OF.",
      formula: {
        label: "Common integrating factors",
        latex:
          "P=\\dfrac{n}{x}\\Rightarrow\\text{IF}=x^{n}, \\quad P=k\\Rightarrow\\text{IF}=e^{kx}, \\quad P=-\\tan x\\Rightarrow\\text{IF}=\\cos x",
      },
      authoredExample: {
        prompt:
          "Solve \\(x\\dfrac{dy}{dx} + 2y = x^2\\) with \\(y(1)=1\\), and find \\(y\\!\\left(\\tfrac12\\right)\\).",
        steps: [
          "Standard form: \\(\\dfrac{dy}{dx} + \\dfrac{2}{x}y = x\\), so \\(P = \\dfrac{2}{x}\\).",
          "\\(\\text{IF} = e^{\\int \\frac{2}{x}dx} = x^2\\).",
          "\\(y x^2 = \\int x\\cdot x^2\\,dx + c = \\dfrac{x^4}{4} + c\\). At \\(x=1,\\,y=1\\): \\(1 = \\tfrac14 + c \\Rightarrow c = \\tfrac34\\).",
          "At \\(x = \\tfrac12\\): \\(y\\cdot\\tfrac14 = \\tfrac{1}{64} + \\tfrac34 \\Rightarrow y = \\tfrac{49}{16}\\).",
        ],
        answer: "\\(y\\!\\left(\\tfrac12\\right) = \\dfrac{49}{16}\\).",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\dfrac{dy}{dx} - y = x - 5\\), then the curve through \\((0,2)\\).",
        steps: [
          "Standard: \\(P = -1\\), \\(Q = x-5\\); \\(\\text{IF} = e^{-x}\\).",
          "\\(y e^{-x} = \\int (x-5)e^{-x}\\,dx + c = -(x-4)e^{-x} + c\\) (by parts).",
          "So \\(y = -x + 4 + ce^{x}\\). Through \\((0,2)\\): \\(2 = 4 + c \\Rightarrow c = -2\\).",
        ],
        answer: "\\(y = 4 - x - 2e^{x}\\).",
      },
      practiceSet: [
        { prompt: "IF for \\(\\dfrac{dy}{dx} + \\dfrac{y}{x} = \\sin x\\).", answer: "\\(x\\)", method: "\\(P = 1/x\\)" },
        { prompt: "IF for \\((1+x^3)\\dfrac{dy}{dx}\\)-form with \\(P = \\dfrac{3x^2}{1+x^3}\\).", answer: "\\(1+x^3\\)" },
        { prompt: "IF for \\(\\sin x\\dfrac{dy}{dx} + y\\cos x = 4x\\).", answer: "\\(\\sin x\\)", method: "\\(P = \\cot x\\)" },
        { prompt: "IF for \\(\\dfrac{dy}{dx} + y = e^{-x}\\).", answer: "\\(e^{x}\\)", method: "\\(P = 1\\)" },
      ],
      pyqExampleId: "00785bed-4ace-4d6b-a922-bea6023d2d8d",
      traps: [
        {
          title: "\\(e^{\\log f(x)} = f(x)\\) — simplify the exponential of a log",
          body:
            "When \\(\\int P\\,dx = \\log(1+x^2)\\), the IF is \\(e^{\\log(1+x^2)} = 1+x^2\\), NOT \\(e^{1+x^2}\\). Any time \\(\\int P\\,dx\\) turns out to be a logarithm, the IF is simply the thing inside that log. Forgetting to cancel \\(e\\) and \\(\\log\\) leaves an unusable IF.",
        },
        {
          title: "Watch the sign of \\(P\\) in the exponential",
          body:
            "\\(P = -\\tan x\\) gives \\(\\int P\\,dx = \\log\\cos x\\), so \\(\\text{IF} = \\cos x\\). A dropped minus sign would give \\(\\sec x\\) and the wrong solution. Track the sign of \\(P\\) all the way into the IF.",
        },
      ],
    },

    // 4 — tricky integrating factors (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-tricky-integrating-factors",
      name: "Tricky Integrating Factors",
      intuition:
        "Some P's need real work before the IF appears: the integral might be a log-of-a-log, might combine an exponential with a power, or might need partial fractions. The method is identical — IF = e to the integral of P — but the integral itself is the challenge. Do that integral carefully and the rest is routine.",
      definition:
        "Harder integrating factors seen in HARD questions:\n" +
        "- **Log-of-a-log:** \\(P = \\dfrac{1}{x\\log x}\\) gives \\(\\int P\\,dx = \\log(\\log x)\\), so \\(\\text{IF} = \\log x\\).\n" +
        "- **Exponential times a power:** \\(P = -\\dfrac{x}{1+x} = -1 + \\dfrac{1}{1+x}\\) gives \\(\\int P\\,dx = -x + \\log(1+x)\\), so \\(\\text{IF} = e^{-x}(1+x)\\).\n" +
        "- **Combine-then-cancel:** \\(P = 1 - \\dfrac{1}{x}\\) gives \\(\\int P\\,dx = x - \\log x\\), so \\(\\text{IF} = \\dfrac{e^{x}}{x}\\).\n" +
        "- **Partial fractions:** \\(P = -\\dfrac{2}{x} + \\dfrac{1}{x-1}\\) gives \\(\\int P\\,dx = -2\\log x + \\log(x-1)\\), so \\(\\text{IF} = \\dfrac{x-1}{x^2}\\).\n" +
        "Split \\(P\\) into standard pieces, integrate each, then exponentiate.",
      formula: {
        label: "A tricky IF built by partial fractions",
        latex:
          "P = -\\dfrac{2}{x} + \\dfrac{1}{x-1} \\;\\Rightarrow\\; \\int P\\,dx = \\log\\dfrac{x-1}{x^2} \\;\\Rightarrow\\; \\text{IF} = \\dfrac{x-1}{x^2}",
      },
      authoredExample: {
        prompt: "Find the integrating factor of \\(x\\log x\\,\\dfrac{dy}{dx} + y = 2x\\log x\\).",
        steps: [
          "Divide by \\(x\\log x\\): \\(\\dfrac{dy}{dx} + \\dfrac{1}{x\\log x}\\,y = 2\\), so \\(P = \\dfrac{1}{x\\log x}\\).",
          "Substitute \\(u = \\log x\\), \\(du = \\dfrac{dx}{x}\\): \\(\\int \\dfrac{1}{x\\log x}\\,dx = \\int \\dfrac{du}{u} = \\log(\\log x)\\).",
          "So \\(\\text{IF} = e^{\\log(\\log x)} = \\log x\\).",
        ],
        answer: "\\(\\text{IF} = \\log x\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\((1+x)\\dfrac{dy}{dx} - xy = 1 - x\\).",
        steps: [
          "Standard form: \\(\\dfrac{dy}{dx} - \\dfrac{x}{1+x}\\,y = \\dfrac{1-x}{1+x}\\), so \\(P = -\\dfrac{x}{1+x} = -1 + \\dfrac{1}{1+x}\\).",
          "\\(\\int P\\,dx = -x + \\log(1+x)\\), so \\(\\text{IF} = e^{-x}(1+x)\\).",
          "\\(y(1+x)e^{-x} = \\int \\dfrac{1-x}{1+x}\\cdot e^{-x}(1+x)\\,dx = \\int (1-x)e^{-x}\\,dx = xe^{-x} + c\\).",
          "Multiply by \\(e^{x}/(1+x)\\): \\(y(1+x) = x + ce^{x}\\).",
        ],
        answer: "\\(y(1+x) = x + ce^{x}\\).",
      },
      practiceSet: [
        { prompt: "IF when \\(P = \\dfrac{1}{x\\log x}\\).", answer: "\\(\\log x\\)", method: "\\(\\int = \\log(\\log x)\\)" },
        { prompt: "IF when \\(P = 1 - \\dfrac{1}{x}\\).", answer: "\\(\\dfrac{e^{x}}{x}\\)", method: "\\(\\int = x - \\log x\\)" },
        { prompt: "IF when \\(P = -\\dfrac{x}{1+x}\\).", answer: "\\(e^{-x}(1+x)\\)" },
        { prompt: "First step when \\(P\\) is a rational function?", answer: "Partial fractions" },
      ],
      pyqExampleId: "d37d549c-4077-43a2-a029-44a494d8347a",
      traps: [
        {
          title: "Split \\(P\\) before integrating a rational coefficient",
          body:
            "For \\(P = -\\dfrac{x}{1+x}\\), do polynomial/partial-fraction division first: \\(-\\dfrac{x}{1+x} = -1 + \\dfrac{1}{1+x}\\). Integrating the un-split form is where students stall. The same trick handles \\(\\dfrac{2-x}{x(x-1)}\\) via partial fractions before the IF appears.",
        },
        {
          title: "Do not stop at \\(\\int P\\,dx\\) — exponentiate it",
          body:
            "The IF is \\(e^{\\int P\\,dx}\\), so after finding \\(\\int P\\,dx = -x + \\log(1+x)\\) you still must exponentiate to \\(e^{-x}(1+x)\\). Using the raw integral as the IF is a common slip on the harder coefficients.",
        },
      ],
    },

    // 5 — linear in x (reciprocal form, anchored)
    {
      kind: "formula" as const,
      slug: "cetde-linear-in-x",
      name: "Linear in x — Swap the Roles of x and y",
      intuition:
        "Some equations are hopeless as dy/dx but become perfectly linear when you flip them to dx/dy. If y appears in awkward places but x appears only to the first power, treat x as the unknown function of y: write dx/dy + P(y)x = Q(y), and use exactly the same integrating factor machine with y as the variable.",
      definition:
        "An ODE is **linear in \\(x\\)** if it fits\n" +
        "\\[\\dfrac{dx}{dy} + P(y)\\,x = Q(y),\\]\n" +
        "with \\(P, Q\\) functions of \\(y\\) only. Then \\(\\text{IF} = e^{\\int P(y)\\,dy}\\) and \\(x\\cdot\\text{IF} = \\int Q(y)\\cdot\\text{IF}\\,dy + c\\).\n" +
        "**Signals to flip:** the equation has \\(y\\,dx\\) and \\(x\\,dy\\) terms, or a coefficient of \\(\\dfrac{dy}{dx}\\) that is a messy function of \\(y\\). Rewriting \\(\\dfrac{dy}{dx}\\) as \\(1/\\dfrac{dx}{dy}\\) exposes the linear-in-\\(x\\) shape.",
      formula: {
        label: "Linear in x (reciprocal form)",
        latex:
          "\\dfrac{dx}{dy} + P(y)\\,x = Q(y), \\qquad \\text{IF} = e^{\\int P(y)\\,dy}",
      },
      authoredExample: {
        prompt:
          "Solve \\(y\\,dx - (x + 3y^2)\\,dy = 0\\), the curve through \\((1,1)\\).",
        steps: [
          "Rewrite as \\(\\dfrac{dx}{dy} = \\dfrac{x}{y} + 3y\\), i.e. \\(\\dfrac{dx}{dy} - \\dfrac{1}{y}x = 3y\\) — linear in \\(x\\), \\(P(y) = -\\dfrac{1}{y}\\).",
          "\\(\\text{IF} = e^{\\int -\\frac{1}{y}dy} = e^{-\\log y} = \\dfrac{1}{y}\\).",
          "\\(x\\cdot\\dfrac{1}{y} = \\int 3y\\cdot\\dfrac{1}{y}\\,dy + c = 3y + c\\), so \\(x = 3y^2 + cy\\). Through \\((1,1)\\): \\(1 = 3 + c \\Rightarrow c = -2\\).",
          "The curve is \\(x = 3y^2 - 2y\\).",
        ],
        answer: "\\(x = 3y^2 - 2y\\) (so it passes through \\(\\left(-\\tfrac13, \\tfrac13\\right)\\)).",
      },
      selfCheckExample: {
        prompt:
          "Solve \\((1 + y^2) + (x - e^{\\tan^{-1}y})\\dfrac{dy}{dx} = 0\\).",
        steps: [
          "Flip: \\(\\dfrac{dx}{dy} + \\dfrac{x}{1+y^2} = \\dfrac{e^{\\tan^{-1}y}}{1+y^2}\\) — linear in \\(x\\), \\(P(y) = \\dfrac{1}{1+y^2}\\).",
          "\\(\\text{IF} = e^{\\int \\frac{dy}{1+y^2}} = e^{\\tan^{-1}y}\\).",
          "\\(x\\,e^{\\tan^{-1}y} = \\int \\dfrac{e^{\\tan^{-1}y}}{1+y^2}\\cdot e^{\\tan^{-1}y}\\,dy + k\\). Put \\(t = e^{\\tan^{-1}y}\\): \\(= \\int t\\,dt + k = \\tfrac{t^2}{2} + k\\).",
          "So \\(x\\,e^{\\tan^{-1}y} = \\tfrac12 e^{2\\tan^{-1}y} + k \\Rightarrow 2x\\,e^{\\tan^{-1}y} = e^{2\\tan^{-1}y} + k\\).",
        ],
        answer: "\\(2x\\,e^{\\tan^{-1}y} = e^{2\\tan^{-1}y} + k\\).",
      },
      practiceSet: [
        { prompt: "When is flipping to \\(\\dfrac{dx}{dy}\\) worth it?", answer: "When \\(x\\) is linear but \\(y\\) is not", method: "look at powers of \\(x\\)" },
        { prompt: "IF of \\(\\dfrac{dx}{dy} - \\dfrac{1}{y}x = 3y\\).", answer: "\\(\\dfrac{1}{y}\\)", method: "\\(e^{-\\log y}\\)" },
        { prompt: "IF of \\(\\dfrac{dx}{dy} + \\dfrac{x}{1+y^2} = \\cdots\\).", answer: "\\(e^{\\tan^{-1}y}\\)" },
        { prompt: "In linear-in-\\(x\\), the variable of integration is?", answer: "\\(y\\)" },
      ],
      pyqExampleId: "e897cd09-afa2-49ec-8856-919714d7d4ad",
      traps: [
        {
          title: "If \\(y\\) is tangled, check whether \\(x\\) is linear before giving up",
          body:
            "\\(y\\,dx - (x+3y^2)\\,dy = 0\\) never separates and is not linear in \\(y\\) — but dividing by \\(dy\\) shows \\(x\\) appears only to the first power, so it is linear in \\(x\\). Flipping to \\(\\dfrac{dx}{dy}\\) is the move; forcing \\(\\dfrac{dy}{dx}\\) leads nowhere.",
        },
        {
          title: "After flipping, integrate with respect to \\(y\\), not \\(x\\)",
          body:
            "Everything shifts: \\(P\\) and \\(Q\\) are functions of \\(y\\), the IF is \\(e^{\\int P(y)\\,dy}\\), and the solution formula integrates \\(Q\\cdot\\text{IF}\\) over \\(y\\). Slipping back to \\(dx\\) mid-solution is a classic error.",
        },
      ],
    },

    // 6 — Bernoulli (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-bernoulli",
      name: "Bernoulli Equations — Substitute to Linearize",
      intuition:
        "A Bernoulli equation has a lone power of y on the right: dy/dx + P y = Q y to the n. It is not linear as written, but one substitution fixes it. Divide through by y to the n, then let v = y to the (1 minus n) — the equation becomes linear in v, and you finish with the ordinary integrating factor.",
      definition:
        "A **Bernoulli equation** is \\(\\dfrac{dy}{dx} + P(x)y = Q(x)y^{n}\\) with \\(n \\neq 0, 1\\). To solve:\n" +
        "- **Divide by \\(y^{n}\\):** \\(y^{-n}\\dfrac{dy}{dx} + P\\,y^{1-n} = Q\\).\n" +
        "- **Substitute** \\(v = y^{1-n}\\), so \\(\\dfrac{dv}{dx} = (1-n)y^{-n}\\dfrac{dy}{dx}\\).\n" +
        "- The equation becomes **linear in \\(v\\):** \\(\\dfrac{dv}{dx} + (1-n)P\\,v = (1-n)Q\\) — now use \\(\\text{IF} = e^{\\int (1-n)P\\,dx}\\).\n" +
        "Special common case \\(n = 2\\): \\(v = y^{-1} = 1/y\\).",
      formula: {
        label: "Bernoulli substitution",
        latex:
          "\\dfrac{dy}{dx} + Py = Qy^{n} \\;\\xrightarrow{\\;v = y^{1-n}\\;}\\; \\dfrac{dv}{dx} + (1-n)Pv = (1-n)Q",
        symbols: [
          { symbol: "n", meaning: "the power on the right-hand y; must not be 0 or 1" },
          { symbol: "v", meaning: "the new unknown y to the power (1 minus n)" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = y\\tan x - y^2\\sec x\\).",
        steps: [
          "Rewrite: \\(\\dfrac{dy}{dx} - y\\tan x = -y^2\\sec x\\) — Bernoulli with \\(n = 2\\).",
          "Divide by \\(y^2\\) and let \\(v = y^{-1}\\), so \\(\\dfrac{dv}{dx} = -y^{-2}\\dfrac{dy}{dx}\\): the equation becomes \\(\\dfrac{dv}{dx} - v\\tan x = \\sec x\\).",
          "\\(\\text{IF} = e^{\\int -\\tan x\\,dx} = \\cos x\\). Then \\(\\dfrac{d}{dx}(v\\cos x) = \\cos x\\sec x = 1\\), so \\(v\\cos x = x + c\\).",
          "With \\(v = 1/y\\): \\(\\dfrac{\\cos x}{y} = x + c\\), i.e. \\(\\cos x = y(x + c)\\). Matching the bank's tan-form solution: \\(\\sec x = y(\\tan x + c)\\).",
        ],
        answer: "\\(\\sec x = y(\\tan x + c)\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} + \\dfrac{y}{x} = x\\,y^2\\).",
        steps: [
          "Bernoulli with \\(n = 2\\). Divide by \\(y^2\\): \\(y^{-2}\\dfrac{dy}{dx} + \\dfrac{1}{x}y^{-1} = x\\).",
          "Let \\(v = y^{-1}\\), so \\(\\dfrac{dv}{dx} = -y^{-2}\\dfrac{dy}{dx}\\); the equation becomes \\(-\\dfrac{dv}{dx} + \\dfrac{v}{x} = x\\), i.e. \\(\\dfrac{dv}{dx} - \\dfrac{v}{x} = -x\\).",
          "\\(P(x) = -\\dfrac{1}{x}\\), so \\(\\text{IF} = e^{\\int -\\frac{1}{x}dx} = e^{-\\log x} = \\dfrac{1}{x}\\). Then \\(v\\cdot\\dfrac{1}{x} = \\int -x\\cdot\\dfrac{1}{x}\\,dx + c = -x + c\\), giving \\(v = cx - x^2\\).",
          "With \\(v = 1/y\\): \\(\\dfrac{1}{y} = cx - x^2\\).",
        ],
        answer: "\\(\\dfrac{1}{y} = cx - x^2\\).",
      },
      practiceSet: [
        { prompt: "For \\(\\dfrac{dy}{dx} + Py = Qy^2\\), substitute?", answer: "\\(v = 1/y\\)", method: "\\(n = 2 \\Rightarrow v = y^{-1}\\)" },
        { prompt: "For \\(n = 3\\), what is \\(v\\)?", answer: "\\(v = y^{-2}\\)", method: "\\(v = y^{1-n}\\)" },
        { prompt: "First step to linearize a Bernoulli equation?", answer: "Divide by \\(y^{n}\\)" },
        { prompt: "Is \\(\\dfrac{dy}{dx} + xy = x^2 y^0\\) Bernoulli?", answer: "No", method: "\\(n = 0\\) is already linear" },
      ],
      pyqExampleId: "4ff0f1e7-cc71-48a4-8e82-8fbbbc564c13",
      traps: [
        {
          title: "Divide by \\(y^{n}\\) BEFORE substituting",
          body:
            "You cannot substitute \\(v = y^{1-n}\\) usefully until the \\(y^{-n}\\dfrac{dy}{dx}\\) term is exposed. Divide the whole equation by \\(y^{n}\\) first; only then does \\(\\dfrac{dv}{dx}\\) appear cleanly. Skipping this step leaves an equation you cannot linearize.",
        },
        {
          title: "Spot the lone \\(y^{n}\\) — it is not a linear ODE",
          body:
            "\\(\\dfrac{dy}{dx} = y\\tan x - y^2\\sec x\\) looks linear until you see the \\(y^2\\). Treating it as linear (integrating factor straight away) is wrong. The \\(y^{n}\\) on the right is the tell: substitute first.",
        },
      ],
    },

    // 7 — exact / d(·)-grouping (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-exact-grouping",
      name: "Exact Equations by d(·)-Grouping",
      intuition:
        "Sometimes the fastest route is not an integrating factor at all — it is recognizing that a clump of terms is itself the differential of a simple product or quotient. Group the terms into pieces like d(xy) or d(x/y), integrate each piece directly, and the answer falls out. This beats the linear machine when the grouping is obvious.",
      definition:
        "Recognize these exact differentials and integrate by grouping:\n" +
        "- \\(x\\,dy + y\\,dx = d(xy)\\).\n" +
        "- \\(\\dfrac{x\\,dy - y\\,dx}{y^2} = d\\!\\left(\\dfrac{x}{y}\\right)\\), and \\(\\dfrac{y\\,dx - x\\,dy}{x^2} = d\\!\\left(\\dfrac{y}{x}\\right)\\).\n" +
        "- \\(x\\,dx + y\\,dy = \\tfrac12\\,d(x^2 + y^2)\\).\n" +
        "- For products like \\((1+xy)y\\,dx + (1-xy)x\\,dy = 0\\), divide by a factor such as \\(x^2y^2\\) to expose \\(d\\!\\left(-\\tfrac{1}{xy}\\right)\\), \\(d(\\log x)\\), and \\(d(\\log y)\\).",
      formula: {
        label: "Exact differentials to spot",
        latex:
          "x\\,dy + y\\,dx = d(xy), \\qquad \\dfrac{x\\,dy - y\\,dx}{y^2} = d\\!\\left(\\dfrac{x}{y}\\right)",
      },
      authoredExample: {
        prompt: "Solve \\(x\\,dy = y(dx + y\\,dy)\\) with \\(y(1) = 1\\), \\(y > 0\\), and find \\(y(-3)\\).",
        steps: [
          "Expand: \\(x\\,dy = y\\,dx + y^2\\,dy \\Rightarrow x\\,dy - y\\,dx = y^2\\,dy \\Rightarrow \\dfrac{x\\,dy - y\\,dx}{y^2} = dy\\).",
          "Recognize the left side: since \\(\\dfrac{y\\,dx - x\\,dy}{y^2} = d\\!\\left(\\dfrac{x}{y}\\right)\\), the negative of it is \\(\\dfrac{x\\,dy - y\\,dx}{y^2} = d\\!\\left(-\\dfrac{x}{y}\\right)\\). So \\(d\\!\\left(-\\dfrac{x}{y}\\right) = dy\\).",
          "Integrate: \\(-\\dfrac{x}{y} = y + c\\). At \\((1,1)\\): \\(-1 = 1 + c \\Rightarrow c = -2\\).",
          "At \\(x = -3\\): \\(\\dfrac{3}{y} = y - 2 \\Rightarrow y^2 - 2y - 3 = 0 \\Rightarrow y = 3\\) (taking \\(y > 0\\)).",
        ],
        answer: "\\(y(-3) = 3\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\((1 + xy)y\\,dx + (1 - xy)x\\,dy = 0\\).",
        steps: [
          "Expand: \\((y + xy^2)\\,dx + (x - x^2y)\\,dy = 0\\); divide throughout by \\(x^2y^2\\) to make each clump a recognizable differential.",
          "The regrouping gives \\(\\dfrac{x\\,dy - y\\,dx}{x^2y^2} + \\dfrac{dx}{x} - \\dfrac{dy}{y} = 0\\), and since \\(\\dfrac{x\\,dy - y\\,dx}{x^2y^2} = d\\!\\left(-\\dfrac{1}{xy}\\right)\\), this is \\(d\\!\\left(-\\dfrac{1}{xy}\\right) + d(\\log x) - d(\\log y) = 0\\).",
          "Integrate each piece: \\(-\\dfrac{1}{xy} + \\log x - \\log y = \\text{const}\\). Writing \\(\\log x - \\log y\\) with the constant absorbed and rearranging gives the bank's form \\(\\log(xy) = \\dfrac{1}{xy} + k\\).",
        ],
        answer: "\\(\\log(xy) = \\dfrac{1}{xy} + k\\).",
      },
      practiceSet: [
        { prompt: "\\(x\\,dy + y\\,dx = ?\\)", answer: "\\(d(xy)\\)" },
        { prompt: "\\(\\dfrac{x\\,dy - y\\,dx}{y^2} = ?\\)", answer: "\\(d(x/y)\\)" },
        { prompt: "\\(x\\,dx + y\\,dy = ?\\)", answer: "\\(\\tfrac12 d(x^2+y^2)\\)" },
        { prompt: "To expose a grouping in \\((1+xy)y\\,dx + \\cdots\\), divide by?", answer: "\\(x^2y^2\\)" },
      ],
      pyqExampleId: "999b08cb-52b5-44df-a261-d66027ac8435",
      traps: [
        {
          title: "Mind the sign and denominator of the quotient differentials",
          body:
            "\\(x\\,dy + y\\,dx = d(xy)\\) (a PLUS), but \\(\\dfrac{x\\,dy - y\\,dx}{y^2} = d\\!\\left(\\tfrac{x}{y}\\right)\\) (a MINUS, over \\(y^2\\)). Swapping the sign or writing \\(x^2\\) in the denominator gives the wrong grouping and the wrong answer.",
        },
        {
          title: "Try grouping before reaching for an integrating factor",
          body:
            "When you see \\(x\\,dy\\) and \\(y\\,dx\\) sitting together, test for an exact differential first. Forcing the equation into standard linear form when a clean \\(d(xy)\\) or \\(d(x/y)\\) is staring at you wastes the whole solution.",
        },
      ],
    },

    // 8 — direct integration / reduction of order (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-direct-integration",
      name: "Direct Integration and Reduction of Order",
      intuition:
        "The simplest first-order equations are the ones where dy/dx is already isolated as a function of x alone — just integrate. And a second-order equation with no y term (only y'' and x) drops an order: integrate once to get dy/dx, apply a condition, integrate again. No integrating factor needed at all.",
      definition:
        "Two direct routes:\n" +
        "- **Direct integration:** if \\(\\dfrac{dy}{dx} = f(x)\\), then \\(y = \\int f(x)\\,dx + c\\). Likewise \\((x+2)\\dfrac{dy}{dx} = x^2 + 4x - 9\\) becomes \\(\\dfrac{dy}{dx} = \\dfrac{x^2+4x-9}{x+2}\\), integrate after dividing.\n" +
        "- **Reduction of order:** for \\(x\\dfrac{d^2y}{dx^2} = 1\\) (no \\(y\\), no \\(\\dfrac{dy}{dx}\\)), write it as \\(\\dfrac{d^2y}{dx^2} = \\dfrac{1}{x}\\); integrate to \\(\\dfrac{dy}{dx} = \\log x + c_1\\), fix \\(c_1\\) with the slope condition, then integrate again for \\(y\\).\n" +
        "Each integration introduces one constant — a second-order problem needs two conditions.",
      formula: {
        label: "Reduction of order (integrate twice)",
        latex:
          "\\dfrac{d^2y}{dx^2} = g(x) \\;\\Rightarrow\\; \\dfrac{dy}{dx} = \\int g(x)\\,dx + c_1 \\;\\Rightarrow\\; y = \\int\\!\\left(\\int g\\,dx\\right)dx + c_1 x + c_2",
      },
      authoredExample: {
        prompt:
          "Solve \\(\\dfrac{d^2y}{dx^2} = 12x\\) given \\(y = 5\\) and \\(\\dfrac{dy}{dx} = 3\\) at \\(x = 0\\).",
        steps: [
          "The right side has no \\(y\\), so integrate twice. Integrate once: \\(\\dfrac{dy}{dx} = 6x^2 + c_1\\).",
          "Apply \\(\\dfrac{dy}{dx} = 3\\) at \\(x = 0\\): \\(3 = 0 + c_1 \\Rightarrow c_1 = 3\\).",
          "Integrate again: \\(y = 2x^3 + 3x + c_2\\). Apply \\(y = 5\\) at \\(x = 0\\): \\(5 = c_2\\).",
        ],
        answer: "\\(y = 2x^3 + 3x + 5\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = 3x^2 - 4x + 1\\), the curve through \\((0, 5)\\).",
        steps: [
          "Direct integration: \\(y = \\int (3x^2 - 4x + 1)\\,dx = x^3 - 2x^2 + x + c\\).",
          "Through \\((0,5)\\): \\(5 = 0 + c \\Rightarrow c = 5\\).",
        ],
        answer: "\\(y = x^3 - 2x^2 + x + 5\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(\\dfrac{dy}{dx} = \\cos x\\).", answer: "\\(y = \\sin x + c\\)" },
        { prompt: "\\(\\int \\log x\\,dx = ?\\)", answer: "\\(x\\log x - x + c\\)", method: "by parts" },
        { prompt: "How many constants does a 2nd-order ODE solution carry?", answer: "Two" },
        { prompt: "First step for \\(x\\dfrac{d^2y}{dx^2} = 1\\)?", answer: "Write \\(\\dfrac{d^2y}{dx^2} = \\dfrac{1}{x}\\)" },
      ],
      pyqExampleId: "8bcce5ae-6aa2-49e2-815d-0fe0cec09d92",
      traps: [
        {
          title: "Apply the slope condition after the FIRST integration",
          body:
            "For a second-order equation, use the \\(\\dfrac{dy}{dx}\\) condition to fix \\(c_1\\) as soon as you have \\(\\dfrac{dy}{dx}\\) — do not wait until the end. Fixing both constants only at the final step tangles the algebra and often gives the wrong \\(c_2\\).",
        },
        {
          title: "Divide out the leading factor before integrating",
          body:
            "\\(x\\dfrac{d^2y}{dx^2} = 1\\) is NOT \\(\\dfrac{d^2y}{dx^2} = 1\\); first isolate \\(\\dfrac{d^2y}{dx^2} = \\dfrac{1}{x}\\). Integrating the un-isolated form gives \\(y = x + \\cdots\\) instead of the correct \\(x\\log x\\) term.",
        },
      ],
    },
  ],
};
