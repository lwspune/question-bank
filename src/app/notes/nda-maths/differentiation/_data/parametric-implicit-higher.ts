import type { SubtopicNote } from "@/app/notes/_types";

export const PARAMETRIC_IMPLICIT_HIGHER_NOTE: SubtopicNote = {
  subtopicName: "Parametric, Implicit, and Higher-Order Derivatives",
  title: "Parametric, Implicit & Higher-Order Derivatives",
  oneLineDefinition:
    "When y is tangled with x (an implicit equation), routed through a parameter t, or you need the second derivative, the chain rule is still the engine — applied a little differently.",
  whyItMatters:
    "These are the advanced-form questions: differentiate both sides of F(x,y)=0, divide parametric rates, or differentiate twice. They reward knowing the right setup — especially the parametric second-derivative formula and the d²x/dy² reciprocal identity, which are easy marks once memorised and easy to botch otherwise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "diff-implicit",
      name: "Implicit differentiation",
      intuition:
        "When \\(y\\) can't be isolated, differentiate **both sides** with respect to \\(x\\), treating \\(y\\) as a function of \\(x\\) — so every \\(y\\)-term picks up a \\(\\frac{dy}{dx}\\) factor by the chain rule. Then solve the linear equation for \\(\\frac{dy}{dx}\\).",
      definition:
        "Differentiate \\(F(x,y)=0\\) term by term w.r.t. \\(x\\): a term in \\(y\\) gives its derivative \\(\\times \\frac{dy}{dx}\\) (chain rule), and products use the product rule. Collect the \\(\\frac{dy}{dx}\\) terms and solve. No need to express \\(y\\) explicitly.",
      formula: {
        label: "Implicit rule of thumb",
        latex: "\\frac{d}{dx}\\big[\\,y\\text{-term}\\,\\big] = (\\text{its derivative})\\cdot\\frac{dy}{dx}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) for \\(x^2 + y^2 = 25\\).",
        steps: [
          "Differentiate both sides: \\(2x + 2y\\dfrac{dy}{dx} = 0\\).",
          "Solve: \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) for \\(xy = 1\\).",
        steps: [
          "Product rule on the left: \\(y + x\\dfrac{dy}{dx} = 0\\).",
          "Solve: \\(\\dfrac{dy}{dx} = -\\dfrac{y}{x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{y}{x}\\ \\left(=-\\dfrac{1}{x^2}\\right)\\).",
      },
      practiceSet: [
        { prompt: "Differentiating \\(y^3\\) w.r.t. \\(x\\) gives?", answer: "\\(3y^2\\dfrac{dy}{dx}\\)" },
        { prompt: "\\(\\frac{dy}{dx}\\) for \\(x^2+y^2=r^2\\)?", answer: "\\(-x/y\\)" },
        { prompt: "Which rule for the term \\(xy\\)?", answer: "Product rule" },
        { prompt: "Must you isolate \\(y\\) first?", answer: "No" },
      ],
      pyqExampleId: "35463eb2-c9f5-451b-aa83-1ed1b617b679", // 2020 — x^m y^n = a^{m+n}
      traps: [
        {
          title: "Every \\(y\\)-term needs a \\(\\frac{dy}{dx}\\) factor",
          body:
            "Differentiating \\(y^2\\) w.r.t. \\(x\\) gives \\(2y\\dfrac{dy}{dx}\\), NOT \\(2y\\). Because \\(y\\) is a function of \\(x\\), the chain rule attaches a \\(\\frac{dy}{dx}\\) to every \\(y\\)-term. Forgetting it is the defining error of implicit differentiation — you'd never recover \\(\\frac{dy}{dx}\\) to solve for.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-implicit-logarithmic",
      name: "Logarithmic differentiation of implicit power relations",
      intuition:
        "When both \\(x\\) and \\(y\\) appear in exponents — \\(x^y\\), \\(y^x\\), \\(x^m y^n\\) — take \\(\\ln\\) of both sides FIRST. Logs turn products into sums and exponents into coefficients, after which implicit differentiation is routine.",
      definition:
        "For relations like \\(x^y y^x = c\\): take \\(\\ln\\) to get \\(y\\ln x + x\\ln y = \\ln c\\), then differentiate implicitly (product rule on each term, \\(\\frac{dy}{dx}\\) on \\(y\\)-terms) and solve. For \\(x^m y^n = k\\): \\(\\,m\\ln x + n\\ln y = \\ln k \\Rightarrow \\frac{m}{x} + \\frac{n}{y}\\frac{dy}{dx} = 0\\).",
      authoredExample: {
        prompt: "Use logarithms to find \\(\\dfrac{dy}{dx}\\) for \\(x^2 y^3 = 1\\).",
        steps: [
          "Take \\(\\ln\\): \\(2\\ln x + 3\\ln y = 0\\).",
          "Differentiate: \\(\\dfrac{2}{x} + \\dfrac{3}{y}\\dfrac{dy}{dx} = 0\\).",
          "Solve: \\(\\dfrac{dy}{dx} = -\\dfrac{2y}{3x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{2y}{3x}\\).",
      },
      selfCheckExample: {
        prompt: "For \\(x^y = e\\) (constant), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "\\(\\ln\\): \\(y\\ln x = 1\\).",
          "Differentiate: \\(\\dfrac{y}{x} + \\ln x\\dfrac{dy}{dx} = 0\\).",
          "Solve: \\(\\dfrac{dy}{dx} = -\\dfrac{y}{x\\ln x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{y}{x\\ln x}\\).",
      },
      practiceSet: [
        { prompt: "First step for \\(x^y y^x = c\\)?", answer: "Take \\(\\ln\\) of both sides" },
        { prompt: "\\(\\ln(x^m y^n)\\)?", answer: "\\(m\\ln x + n\\ln y\\)" },
        { prompt: "\\(\\frac{dy}{dx}\\) for \\(x^m y^n = k\\)?", answer: "\\(-\\dfrac{my}{nx}\\)" },
        { prompt: "Why take logs first?", answer: "Turns products/exponents into sums/coefficients" },
      ],
      pyqExampleId: "aea3d997-5e1a-4857-99a6-276a64623a85", // 2022 — x^y y^x = 1 at (1,1)
    },

    {
      kind: "formula" as const,
      slug: "diff-parametric",
      name: "Parametric differentiation",
      intuition:
        "When \\(x\\) and \\(y\\) are both given in terms of a parameter \\(t\\), you don't eliminate \\(t\\). Differentiate each w.r.t. \\(t\\) and **divide**: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\). The parameter cancels out of the ratio.",
      definition:
        "If \\(x=f(t)\\) and \\(y=g(t)\\), then \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt} = \\dfrac{g'(t)}{f'(t)}\\) (provided \\(f'(t)\\neq 0\\)). The result is usually left in terms of \\(t\\).",
      formula: {
        label: "Parametric first derivative",
        latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}",
      },
      authoredExample: {
        prompt: "If \\(x = t^2\\) and \\(y = t^3\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = 2t\\), \\(\\dfrac{dy}{dt} = 3t^2\\).",
          "Divide: \\(\\dfrac{dy}{dx} = \\dfrac{3t^2}{2t} = \\dfrac{3t}{2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{3t}{2}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x = a\\cos\\theta\\), \\(y = a\\sin\\theta\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = -a\\sin\\theta\\), \\(\\dfrac{dy}{d\\theta} = a\\cos\\theta\\).",
          "Divide: \\(\\dfrac{dy}{dx} = \\dfrac{a\\cos\\theta}{-a\\sin\\theta} = -\\cot\\theta\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = -\\cot\\theta\\).",
      },
      practiceSet: [
        { prompt: "Parametric \\(\\frac{dy}{dx}\\) formula?", answer: "\\(\\dfrac{dy/dt}{dx/dt}\\)" },
        { prompt: "\\(x=t^2, y=t^3\\): \\(\\frac{dy}{dx}\\)?", answer: "\\(\\frac{3t}{2}\\)" },
        { prompt: "Do you eliminate \\(t\\) first?", answer: "No — differentiate each, then divide" },
        { prompt: "Condition for the formula?", answer: "\\(dx/dt \\neq 0\\)" },
      ],
      pyqExampleId: "1d527f2b-2acb-481e-a17f-442fb96c3f51", // 2021 — x=e^t cos t, y=e^t sin t
      traps: [
        {
          title: "Don't invert the parametric ratio",
          body:
            "\\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\) — the \\(y\\)-rate is on TOP, the \\(x\\)-rate on the bottom (it cancels like a fraction: \\(\\frac{dy}{dt}\\div\\frac{dx}{dt}\\)). Writing \\(\\frac{dx/dt}{dy/dt}\\) gives the reciprocal \\(\\frac{dx}{dy}\\) instead. For \\(x=t^2, y=t^3\\) the slope is \\(\\frac{3t^2}{2t}=\\frac{3t}{2}\\), not \\(\\frac{2}{3t}\\).",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-higher-order",
      name: "Higher-order derivatives",
      intuition:
        "The second derivative is just the derivative of the first; the \\(n\\)-th is the derivative applied \\(n\\) times. For named functions there are clean patterns; for a specific point, differentiate the required number of times and substitute last.",
      definition:
        "\\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dx}\\!\\left(\\dfrac{dy}{dx}\\right)\\), and so on. Useful standard results: \\((e^{ax})^{(n)} = a^n e^{ax}\\); \\((\\sin x)^{(n)} = \\sin\\!\\left(x + \\tfrac{n\\pi}{2}\\right)\\). To evaluate at a point, differentiate first and substitute the value at the end.",
      formula: {
        label: "Second derivative",
        latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\!\\left(\\frac{dy}{dx}\\right)",
      },
      authoredExample: {
        prompt: "If \\(y = x^4\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
        steps: [
          "First derivative: \\(\\dfrac{dy}{dx} = 4x^3\\).",
          "Differentiate again: \\(\\dfrac{d^2y}{dx^2} = 12x^2\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} = 12x^2\\).",
      },
      selfCheckExample: {
        prompt: "Find the second derivative of \\(y = \\sin x\\) at \\(x = 0\\).",
        steps: [
          "\\(y' = \\cos x\\), \\(y'' = -\\sin x\\).",
          "At \\(x=0\\): \\(-\\sin 0 = 0\\).",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d^2y}{dx^2}\\) means?", answer: "Derivative of \\(\\frac{dy}{dx}\\)" },
        { prompt: "\\(n\\)-th derivative of \\(e^{ax}\\)?", answer: "\\(a^n e^{ax}\\)" },
        { prompt: "\\(y=x^4\\): \\(y''\\)?", answer: "\\(12x^2\\)" },
        { prompt: "Evaluate at a point — before or after differentiating?", answer: "After" },
      ],
      pyqExampleId: "393016a8-2dbf-47a2-b874-affb9f727620", // 2019 — d^2y/dx^2 at x=1
      traps: [
        {
          title: "\\(\\frac{d^2y}{dx^2}\\) is not \\(\\left(\\frac{dy}{dx}\\right)^2\\)",
          body:
            "The second derivative means 'differentiate the first derivative AGAIN', not 'square the first derivative'. For \\(y=x^3\\): \\(\\frac{dy}{dx}=3x^2\\), so \\(\\frac{d^2y}{dx^2}=6x\\) — whereas \\(\\left(\\frac{dy}{dx}\\right)^2 = 9x^4\\), a completely different (and wrong) object.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-second-derivative-inverse",
      name: "Second derivative of an inverse — the d²x/dy² identity",
      intuition:
        "The first derivatives are reciprocals: \\(\\frac{dx}{dy} = 1/\\frac{dy}{dx}\\). But the SECOND derivatives are NOT reciprocals — \\(\\frac{d^2x}{dy^2} \\neq 1/\\frac{d^2y}{dx^2}\\). The correct relation carries a cube and a sign.",
      definition:
        "\\(\\dfrac{dx}{dy} = \\left(\\dfrac{dy}{dx}\\right)^{-1}\\), and differentiating this w.r.t. \\(y\\) (chain rule) gives \\(\\dfrac{d^2x}{dy^2} = -\\dfrac{d^2y/dx^2}{\\left(dy/dx\\right)^{3}}\\). Memorise the **cube in the denominator and the minus sign** — the classic trap.",
      formula: {
        label: "Second derivative of the inverse",
        latex: "\\frac{d^2x}{dy^2} = -\\frac{d^2y/dx^2}{\\left(dy/dx\\right)^{3}}",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac{dy}{dx} = 2\\) and \\(\\dfrac{d^2y}{dx^2} = 3\\) at a point, find \\(\\dfrac{d^2x}{dy^2}\\) there.",
        steps: [
          "Apply \\(\\dfrac{d^2x}{dy^2} = -\\dfrac{d^2y/dx^2}{(dy/dx)^3}\\).",
          "Substitute: \\(-\\dfrac{3}{2^3} = -\\dfrac{3}{8}\\).",
        ],
        answer: "\\(\\dfrac{d^2x}{dy^2} = -\\dfrac{3}{8}\\).",
      },
      selfCheckExample: {
        prompt: "Why is \\(\\dfrac{d^2x}{dy^2}\\) not simply \\(1\\big/\\dfrac{d^2y}{dx^2}\\)?",
        steps: [
          "\\(\\frac{dx}{dy} = (\\frac{dy}{dx})^{-1}\\) must be differentiated w.r.t. \\(y\\), not \\(x\\).",
          "The chain rule injects another \\(\\frac{dx}{dy} = (\\frac{dy}{dx})^{-1}\\) factor, producing the cube and the sign.",
        ],
        answer: "Because differentiating the reciprocal w.r.t. \\(y\\) brings an extra chain-rule factor.",
      },
      practiceSet: [
        { prompt: "\\(\\frac{dx}{dy}\\) in terms of \\(\\frac{dy}{dx}\\)?", answer: "\\((dy/dx)^{-1}\\)" },
        { prompt: "\\(\\frac{d^2x}{dy^2} = ?\\)", answer: "\\(-\\dfrac{d^2y/dx^2}{(dy/dx)^3}\\)" },
        { prompt: "Common wrong answer?", answer: "\\(1/\\frac{d^2y}{dx^2}\\) (missing cube + sign)" },
        { prompt: "\\(dy/dx=1, d^2y/dx^2=5\\): \\(d^2x/dy^2\\)?", answer: "\\(-5\\)" },
      ],
      pyqExampleId: "29f6f88f-c4e5-4f45-ad6f-3ceeed988160", // 2017 — d^2x/dy^2
      traps: [
        {
          title: "Second derivatives don't invert like first derivatives",
          body:
            "\\(\\frac{dx}{dy}=1/\\frac{dy}{dx}\\) is fine, but \\(\\frac{d^2x}{dy^2}\\neq 1/\\frac{d^2y}{dx^2}\\). The right formula has \\((dy/dx)^3\\) in the denominator and a minus sign.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-proves-differential-equation",
      name: "Showing y satisfies a differential equation",
      intuition:
        "A common question gives \\(y\\) (often \\(\\sin(\\ln x)\\), \\(e^{m\\sin^{-1}x}\\), or similar) and asks you to verify it satisfies a relation among \\(y, y', y''\\). Strategy: compute \\(y'\\) and \\(y''\\), then combine them to cancel the transcendental parts back to \\(y\\).",
      definition:
        "Differentiate \\(y\\) once and twice, then substitute into the target relation and simplify — the goal is to eliminate \\(\\sin, \\ln,\\) etc. and land on \\(0\\). Example: \\(y=\\sin(\\ln x)\\) gives \\(xy' = \\cos(\\ln x)\\), and differentiating again yields \\(x^2 y'' + x y' + y = 0\\).",
      authoredExample: {
        prompt: "Show that \\(y = e^{2x}\\) satisfies \\(y'' - 4y = 0\\).",
        steps: [
          "\\(y' = 2e^{2x}\\), \\(y'' = 4e^{2x}\\).",
          "Substitute: \\(y'' - 4y = 4e^{2x} - 4e^{2x} = 0\\).",
        ],
        answer: "Verified — \\(y'' - 4y = 0\\).",
      },
      selfCheckExample: {
        prompt: "Verify that \\(y = \\sin(\\ln x)\\) satisfies \\(x^2 y'' + x y' + y = 0\\).",
        steps: [
          "\\(y' = \\dfrac{\\cos(\\ln x)}{x}\\Rightarrow xy' = \\cos(\\ln x)\\).",
          "Differentiate \\(xy' = \\cos(\\ln x)\\): \\(xy'' + y' = -\\dfrac{\\sin(\\ln x)}{x}\\), so \\(x^2 y'' + xy' = -\\sin(\\ln x) = -y\\).",
          "Rearrange: \\(x^2 y'' + xy' + y = 0\\).",
        ],
        answer: "Verified.",
      },
      practiceSet: [
        { prompt: "Strategy to prove a relation in \\(y, y', y''\\)?", answer: "Compute \\(y', y''\\), substitute, simplify to 0" },
        { prompt: "\\(y=e^{2x}\\): \\(y''\\)?", answer: "\\(4e^{2x}\\)" },
        { prompt: "For \\(y=\\sin(\\ln x)\\), \\(xy' = ?\\)", answer: "\\(\\cos(\\ln x)\\)" },
        { prompt: "Goal after substituting?", answer: "Cancel the transcendental terms to reach 0" },
      ],
      pyqExampleId: "5893dded-ba56-49fd-bc6e-145f24689f23", // 2018 — y=sin(ln x) ODE
    },
  ],
  related: [
    { label: "Core Techniques", href: "/notes/nda-maths/differentiation/diff-core-techniques" },
    { label: "Differentiability", href: "/notes/nda-maths/differentiation/diff-differentiability" },
  ],
};
