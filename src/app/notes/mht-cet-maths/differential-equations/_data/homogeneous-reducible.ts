import type { SubtopicNote } from "@/app/notes/_types";

export const HOMOGENEOUS_REDUCIBLE_NOTE: SubtopicNote = {
  subtopicName: "Homogeneous and Reducible Equations",
  title: "Homogeneous and Reducible Differential Equations",
  oneLineDefinition:
    "When an equation's right side depends only on the ratio y over x, the substitution y = vx turns it into a separable one. A second family of equations — where x and y appear together as x plus y (or a x plus b y) — separates after the substitution v = x plus y.",
  whyItMatters:
    "This is the HARD engine of MHT-CET Differential Equations: 16 PYQs sit here (6 HARD, 9 MODERATE, 1 EASY) and almost every difficult DE question in recent papers is one of these two shapes. The whole skill is reading the equation's form to pick the right substitution — y = vx when you see the ratio y over x, and v = x plus y when the pair travels together — then integrating the resulting separable equation and, crucially, substituting the variable back at the end.",
  concepts: [
    // 1 — recognizing a homogeneous DE (foundation, no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetde-recognizing-homogeneous",
      name: "Recognizing a Homogeneous Differential Equation",
      intuition:
        "A first-order equation is homogeneous when its right-hand side can be written purely in terms of the ratio y over x — nothing survives except that ratio. Equivalently, the numerator and denominator are polynomials of the SAME degree, so scaling both x and y by the same factor leaves the fraction unchanged.",
      definition:
        "A function \\(f(x,y)\\) is **homogeneous of degree n** if \\(f(\\lambda x, \\lambda y) = \\lambda^n f(x,y)\\) for every \\(\\lambda\\). The equation \\(\\dfrac{dy}{dx} = \\dfrac{P(x,y)}{Q(x,y)}\\) is **homogeneous** when:\n" +
        "- \\(P\\) and \\(Q\\) are homogeneous of the **same degree** (so the ratio has degree 0), OR equivalently\n" +
        "- the right side can be rewritten as a function of \\(\\dfrac{y}{x}\\) alone: \\(\\dfrac{dy}{dx} = g\\!\\left(\\dfrac{y}{x}\\right)\\).\n" +
        "Quick tests: \\(y^2 + 2xy\\) is homogeneous of degree 2; \\(2x - 3y\\) of degree 1; \\(\\sin\\!\\left(\\tfrac{y}{x}\\right)\\) of degree 0. But \\(\\cos x + \\sin y\\) is **not** homogeneous — mixing \\(x\\) and \\(y\\) separately (not as a ratio) breaks the scaling test.",
      formula: {
        label: "Homogeneity test",
        latex: "f(\\lambda x, \\lambda y) = \\lambda^n f(x,y) \\quad\\Longleftrightarrow\\quad \\dfrac{dy}{dx} = g\\!\\left(\\dfrac{y}{x}\\right)",
        symbols: [
          { symbol: "n", meaning: "degree of homogeneity — for the DE, P and Q must share it" },
          { symbol: "g(y/x)", meaning: "the right side collapses to a function of the ratio alone" },
        ],
      },
      authoredExample: {
        prompt:
          "Is \\(\\dfrac{dy}{dx} = \\dfrac{x^2 + y^2}{xy}\\) homogeneous? If so, write it in terms of \\(v = \\dfrac{y}{x}\\).",
        steps: [
          "Numerator \\(x^2 + y^2\\) is degree 2; denominator \\(xy\\) is degree 2 — same degree, so it is homogeneous.",
          "Divide top and bottom by \\(x^2\\): \\(\\dfrac{1 + (y/x)^2}{(y/x)}\\).",
          "With \\(v = y/x\\): \\(\\dfrac{dy}{dx} = \\dfrac{1 + v^2}{v}\\) — a function of \\(v\\) alone, confirming it is homogeneous.",
        ],
        answer: "Yes; \\(\\dfrac{dy}{dx} = \\dfrac{1 + v^2}{v}\\) where \\(v = \\dfrac{y}{x}\\).",
      },
      selfCheckExample: {
        prompt: "Which of \\(x^3 + y^3\\), \\(x + y + 1\\), \\(\\tan\\!\\left(\\tfrac{y}{x}\\right)\\) are homogeneous?",
        steps: [
          "\\(x^3 + y^3\\): scaling gives \\(\\lambda^3(x^3+y^3)\\) — homogeneous of degree 3.",
          "\\(x + y + 1\\): the constant \\(1\\) does not scale — NOT homogeneous.",
          "\\(\\tan(y/x)\\): depends only on the ratio — homogeneous of degree 0.",
        ],
        answer: "\\(x^3 + y^3\\) (degree 3) and \\(\\tan(y/x)\\) (degree 0) are homogeneous; \\(x + y + 1\\) is not.",
      },
      practiceSet: [
        { prompt: "Is \\(2x - 3y\\) homogeneous? Of what degree?", answer: "Yes, degree 1", method: "every term degree 1" },
        { prompt: "Is \\(\\cos x + \\sin y\\) homogeneous?", answer: "No", method: "x, y appear separately, not as a ratio" },
        { prompt: "Is \\(\\dfrac{y^2 - x^2}{xy}\\) homogeneous?", answer: "Yes, degree 0", method: "num and denom both degree 2" },
        { prompt: "Rewrite \\(\\dfrac{y + \\sqrt{x^2 - y^2}}{x}\\) in terms of \\(v = y/x\\).", answer: "\\(v + \\sqrt{1 - v^2}\\)", method: "divide by \\(x\\)" },
      ],
      traps: [
        {
          title: "A stray constant breaks homogeneity",
          body:
            "\\(x + y + 1\\) is NOT homogeneous — the \\(+1\\) does not scale with \\(\\lambda\\). Likewise \\(\\cos x + \\sin y\\) fails because \\(x\\) and \\(y\\) enter separately, not through the ratio \\(y/x\\). Only when EVERY term scales by the same power of \\(\\lambda\\) is the function homogeneous.",
        },
        {
          title: "Same degree top and bottom is the fast check",
          body:
            "For a quotient \\(\\dfrac{P}{Q}\\), you rarely need the full scaling test — just confirm \\(P\\) and \\(Q\\) have the SAME degree. \\(\\dfrac{x^2 + 2y^2}{xy}\\): both degree 2, so homogeneous. If the degrees differ, \\(y = vx\\) will not clean it up.",
        },
      ],
    },

    // 2 — the y = vx substitution (foundation-ish, anchored)
    {
      kind: "formula" as const,
      slug: "cetde-homogeneous-vx",
      name: "The y = vx Substitution",
      intuition:
        "Once you know a DE is homogeneous, there is exactly one move: put y = vx. Because v is a function of x, differentiating y = vx by the product rule gives dy/dx = v + x·dv/dx. Substituting this and the ratio v collapses the equation into one that separates in v and x.",
      definition:
        "For a homogeneous equation \\(\\dfrac{dy}{dx} = g\\!\\left(\\dfrac{y}{x}\\right)\\):\n" +
        "- Put \\(y = vx\\), so by the product rule \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\).\n" +
        "- Substitute: \\(v + x\\dfrac{dv}{dx} = g(v)\\), hence \\(x\\dfrac{dv}{dx} = g(v) - v\\).\n" +
        "- Separate: \\(\\dfrac{dv}{g(v) - v} = \\dfrac{dx}{x}\\), then integrate both sides.\n" +
        "- **Substitute \\(v = \\dfrac{y}{x}\\) back at the end** to return to \\(x, y\\), and fit any initial condition to find the constant.",
      formula: {
        label: "Homogeneous substitution",
        latex: "y = vx \\;\\Rightarrow\\; \\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx} \\;\\Rightarrow\\; \\dfrac{dv}{g(v) - v} = \\dfrac{dx}{x}",
        symbols: [
          { symbol: "v", meaning: "the ratio y/x, itself a function of x" },
          { symbol: "v + x dv/dx", meaning: "the derivative dy/dx after the product rule — never just dv/dx" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{x^2 + y^2}{xy}\\).",
        steps: [
          "Homogeneous. Put \\(y = vx\\): \\(v + x\\dfrac{dv}{dx} = \\dfrac{1 + v^2}{v}\\).",
          "Isolate: \\(x\\dfrac{dv}{dx} = \\dfrac{1 + v^2}{v} - v = \\dfrac{1}{v}\\).",
          "Separate: \\(v\\,dv = \\dfrac{dx}{x}\\). Integrate: \\(\\dfrac{v^2}{2} = \\log x + c\\).",
          "Put \\(v = y/x\\) back: \\(\\dfrac{y^2}{2x^2} = \\log x + c\\), i.e. \\(y^2 = 2x^2(\\log x + c)\\).",
        ],
        answer: "\\(y^2 = 2x^2(\\log x + c)\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{y + \\sqrt{x^2 - y^2}}{x}\\).",
        steps: [
          "Divide by \\(x\\): \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + \\sqrt{1 - (y/x)^2}\\) — homogeneous.",
          "Put \\(y = vx\\): \\(v + x\\dfrac{dv}{dx} = v + \\sqrt{1 - v^2}\\), so \\(x\\dfrac{dv}{dx} = \\sqrt{1 - v^2}\\).",
          "Separate: \\(\\dfrac{dv}{\\sqrt{1 - v^2}} = \\dfrac{dx}{x}\\). Integrate: \\(\\sin^{-1} v = \\log x + c\\).",
          "Back-substitute \\(v = y/x\\): \\(\\sin^{-1}\\dfrac{y}{x} = \\log x + c\\).",
        ],
        answer: "\\(\\sin^{-1}\\dfrac{y}{x} = \\log x + c\\)",
      },
      practiceSet: [
        { prompt: "For \\(y = vx\\), write \\(\\dfrac{dy}{dx}\\).", answer: "\\(v + x\\dfrac{dv}{dx}\\)", method: "product rule" },
        { prompt: "After putting \\(y=vx\\) in \\(\\frac{dy}{dx}=\\frac{y}{x}\\), what remains?", answer: "\\(x\\dfrac{dv}{dx} = 0\\)", method: "\\(v + x v' = v\\)" },
        { prompt: "Separate \\(x\\dfrac{dv}{dx} = \\sqrt{1-v^2}\\).", answer: "\\(\\dfrac{dv}{\\sqrt{1-v^2}} = \\dfrac{dx}{x}\\)" },
        { prompt: "After integrating \\(v\\,dv = \\frac{dx}{x}\\), what is the result?", answer: "\\(\\dfrac{v^2}{2} = \\log x + c\\)" },
      ],
      pyqExampleId: "f5e35385-6033-49af-bfcd-d5ea3b8c2d19", // (y+√(x²−y²))/x → sin⁻¹(y/x)=log x + c
      traps: [
        {
          title: "dy/dx is v + x·dv/dx, not just dv/dx",
          body:
            "The single most common homogeneous-substitution error is writing \\(\\dfrac{dy}{dx} = \\dfrac{dv}{dx}\\). Since \\(y = vx\\) is a PRODUCT, the product rule gives \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\). Miss the \\(v\\) term and every subsequent step is wrong.",
        },
        {
          title: "Substitute v = y/x back at the very end",
          body:
            "After integrating in \\(v\\) and \\(x\\), students often leave the answer in \\(v\\). The options are always in \\(x\\) and \\(y\\), so you MUST replace \\(v\\) with \\(\\dfrac{y}{x}\\) in the final line — e.g. \\(\\sin^{-1} v = \\log x + c\\) becomes \\(\\sin^{-1}\\dfrac{y}{x} = \\log x + c\\).",
        },
      ],
    },

    // 3 — worked homogeneous equations, incl. IVP (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-worked-homogeneous",
      name: "Worked Homogeneous Equations and Initial Conditions",
      intuition:
        "Most homogeneous PYQs follow the same rhythm: confirm same-degree numerator and denominator, put y = vx, separate, integrate, back-substitute. When an initial condition is given, plug it in AFTER back-substituting to pin down the constant — that final value is often what separates the correct option from the decoys.",
      definition:
        "The full procedure on a worked homogeneous DE:\n" +
        "- **Set up:** rewrite the right side as a function of \\(v = y/x\\), put \\(y = vx\\), and use \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\).\n" +
        "- **Separate and integrate** the resulting \\(v\\)-\\(x\\) equation.\n" +
        "- **Back-substitute** \\(v = y/x\\).\n" +
        "- **Fit the initial condition:** substitute the given point to evaluate the constant of integration. For a *particular* solution the constant is a specific number, not \\(c\\).\n" +
        "Watch the algebra of \\(g(v) - v\\): for \\((y^2 - x^2)\\,dx = xy\\,dy\\) this becomes \\(\\dfrac{v^2 - 1}{v} - v = -\\dfrac{1}{v}\\), giving \\(-v\\,dv = \\dfrac{dx}{x}\\).",
      formula: {
        label: "Particular solution from an IC",
        latex: "\\text{integrate} \\;\\to\\; \\text{back-substitute } v=\\tfrac{y}{x} \\;\\to\\; \\text{plug the point to find } c",
      },
      authoredExample: {
        prompt:
          "Solve \\(\\dfrac{dy}{dx} = \\dfrac{x + y}{x - y}\\) with \\(y(1) = 0\\).",
        steps: [
          "Numerator and denominator are both degree 1 — homogeneous. Put \\(y = vx\\), so \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\).",
          "\\(v + x\\dfrac{dv}{dx} = \\dfrac{1 + v}{1 - v}\\), so \\(x\\dfrac{dv}{dx} = \\dfrac{1 + v}{1 - v} - v = \\dfrac{1 + v^2}{1 - v}\\).",
          "Separate: \\(\\dfrac{1 - v}{1 + v^2}\\,dv = \\dfrac{dx}{x}\\). Integrate: \\(\\tan^{-1} v - \\dfrac{1}{2}\\log(1 + v^2) = \\log x + c\\).",
          "Put \\(v = y/x\\) and simplify (the \\(\\log x\\) cancels): \\(\\tan^{-1}\\dfrac{y}{x} - \\dfrac{1}{2}\\log(x^2 + y^2) = c\\).",
          "Apply \\(y(1) = 0\\): \\(\\tan^{-1} 0 - \\dfrac{1}{2}\\log 1 = 0\\), so \\(c = 0\\). Hence \\(2\\tan^{-1}\\dfrac{y}{x} = \\log(x^2 + y^2)\\).",
        ],
        answer: "\\(2\\tan^{-1}\\dfrac{y}{x} = \\log(x^2 + y^2)\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\((y^2 - x^2)\\,dx = xy\\,dy\\), \\(x \\neq 0\\).",
        steps: [
          "Write \\(\\dfrac{dy}{dx} = \\dfrac{y^2 - x^2}{xy}\\) — homogeneous. Put \\(y = vx\\).",
          "\\(v + x\\dfrac{dv}{dx} = \\dfrac{v^2 - 1}{v}\\), so \\(x\\dfrac{dv}{dx} = \\dfrac{v^2 - 1}{v} - v = -\\dfrac{1}{v}\\).",
          "Separate: \\(-v\\,dv = \\dfrac{dx}{x}\\). Integrate: \\(-\\dfrac{v^2}{2} = \\log|x| + c_1\\).",
          "Back-substitute \\(v = y/x\\): \\(-\\dfrac{y^2}{2x^2} = \\log x + c_1\\), i.e. \\(2x^2\\log x + y^2 + 2c x^2 = 0\\).",
        ],
        answer: "\\(2x^2\\log x + y^2 + 2c x^2 = 0\\)",
      },
      practiceSet: [
        { prompt: "In the IVP \\(y(1)=0\\) with \\(x^2+y^2 = Cx^4\\), find \\(C\\).", answer: "\\(C = 1\\)", method: "put \\(x=1, y=0\\)" },
        { prompt: "Integrate \\(\\dfrac{v\\,dv}{1+v^2} = \\dfrac{dx}{x}\\).", answer: "\\(\\tfrac12\\log(1+v^2) = \\log x + c\\)" },
        { prompt: "For \\((y^2-x^2)dx = xy\\,dy\\), simplify \\(\\frac{v^2-1}{v} - v\\).", answer: "\\(-\\dfrac{1}{v}\\)" },
        { prompt: "A 'particular' solution has the constant as a?", answer: "specific number (from the IC)" },
      ],
      pyqExampleId: "a24724c1-1a27-41d0-963a-930eb94214e8", // xy y'=x²+2y², y(1)=0 → x²+y²=x⁴
      traps: [
        {
          title: "Use the initial condition only after back-substituting",
          body:
            "Plug the given point in \\(x, y\\) AFTER you have replaced \\(v\\) with \\(y/x\\). Trying to apply \\(y(1)=0\\) while still in \\(v\\) (where \\(v = y/x\\) may be \\(0/1 = 0\\) but the equation is mid-integration) is where sign and constant errors creep in.",
        },
        {
          title: "Track the sign of g(v) − v",
          body:
            "The separable step needs \\(x\\dfrac{dv}{dx} = g(v) - v\\). For \\((y^2 - x^2)\\,dx = xy\\,dy\\), \\(g(v) - v = \\dfrac{v^2 - 1}{v} - v = -\\dfrac{1}{v}\\) — a MINUS sign that carries into the final answer as \\(+y^2\\) after moving terms. Dropping it flips the whole solution.",
        },
      ],
    },

    // 4 — homogeneous "curve through a point" — trig ratio (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-homogeneous-curve-through-point",
      name: "Homogeneous Curves Through a Point (Trig Ratio Slopes)",
      intuition:
        "A recurring HARD shape gives the slope of a curve as y/x plus a trig function of y/x — for example y/x + sec(y/x) or y/x − cos²(y/x). The y/x terms CANCEL after the substitution, leaving a clean separable equation in v whose integral is a standard trig integral. The given point fixes the constant.",
      definition:
        "The slope is \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + h\\!\\left(\\dfrac{y}{x}\\right)\\) where \\(h\\) is a trig function of the ratio. Put \\(y = vx\\):\n" +
        "- \\(v + x\\dfrac{dv}{dx} = v + h(v)\\), and the \\(v\\) on both sides cancels, leaving \\(x\\dfrac{dv}{dx} = h(v)\\).\n" +
        "- Separate: \\(\\dfrac{dv}{h(v)} = \\dfrac{dx}{x}\\). The integral is standard:\n" +
        "  - slope \\(\\dfrac{y}{x} + \\sec\\dfrac{y}{x}\\): \\(\\dfrac{dv}{\\sec v} = \\cos v\\,dv \\Rightarrow \\sin v = \\log x + c\\).\n" +
        "  - slope \\(\\dfrac{y}{x} - \\cos^2\\dfrac{y}{x}\\): \\(\\dfrac{dv}{-\\cos^2 v} = -\\sec^2 v\\,dv \\Rightarrow -\\tan v = \\log x + c\\), i.e. \\(\\tan v = -\\log x + c\\).\n" +
        "Then substitute \\(v = y/x\\) and use the given point to find \\(c\\).",
      formula: {
        label: "Trig-ratio homogeneous slopes",
        latex: "\\dfrac{dy}{dx} = \\dfrac{y}{x} + h\\!\\left(\\dfrac{y}{x}\\right) \\;\\xrightarrow{\\,y=vx\\,}\\; \\dfrac{dv}{h(v)} = \\dfrac{dx}{x}",
        symbols: [
          { symbol: "h(y/x)", meaning: "trig function of the ratio; the bare y/x cancels" },
        ],
      },
      authoredExample: {
        prompt:
          "A curve through \\(\\left(1, \\dfrac{\\pi}{6}\\right)\\) has slope \\(\\dfrac{y}{x} + \\sec\\dfrac{y}{x}\\) for \\(x > 0\\). Find its equation.",
        steps: [
          "Put \\(y = vx\\): \\(v + x\\dfrac{dv}{dx} = v + \\sec v\\), so \\(x\\dfrac{dv}{dx} = \\sec v\\).",
          "Separate: \\(\\cos v\\,dv = \\dfrac{dx}{x}\\). Integrate: \\(\\sin v = \\log x + c\\).",
          "At \\((1, \\pi/6)\\): \\(v = \\pi/6\\), \\(\\sin(\\pi/6) = 1/2 = \\log 1 + c = c\\).",
          "So \\(\\sin\\dfrac{y}{x} = \\log x + \\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\sin\\dfrac{y}{x} = \\log x + \\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A curve through \\(\\left(1, \\dfrac{\\pi}{4}\\right)\\) has slope \\(\\dfrac{y}{x} - \\cos^2\\dfrac{y}{x}\\). Find its equation.",
        steps: [
          "Put \\(y = vx\\): \\(v + x\\dfrac{dv}{dx} = v - \\cos^2 v\\), so \\(x\\dfrac{dv}{dx} = -\\cos^2 v\\).",
          "Separate: \\(\\sec^2 v\\,dv = -\\dfrac{dx}{x}\\). Integrate: \\(\\tan v = -\\log x + c\\).",
          "At \\((1, \\pi/4)\\): \\(\\tan(\\pi/4) = 1 = -\\log 1 + c = c\\).",
          "So \\(\\tan\\dfrac{y}{x} = -\\log x + 1 = \\log\\dfrac{e}{x}\\), i.e. \\(y = x\\tan^{-1}\\!\\left(\\log\\dfrac{e}{x}\\right)\\).",
        ],
        answer: "\\(y = x\\tan^{-1}\\!\\left(\\log\\dfrac{e}{x}\\right)\\)",
      },
      practiceSet: [
        { prompt: "After \\(y=vx\\), what does slope \\(\\frac{y}{x}+\\sec\\frac{y}{x}\\) reduce to?", answer: "\\(x\\dfrac{dv}{dx} = \\sec v\\)", method: "the \\(v\\) cancels" },
        { prompt: "Integrate \\(\\cos v\\,dv = \\frac{dx}{x}\\).", answer: "\\(\\sin v = \\log x + c\\)" },
        { prompt: "Integrate \\(\\sec^2 v\\,dv = -\\frac{dx}{x}\\).", answer: "\\(\\tan v = -\\log x + c\\)" },
        { prompt: "Rewrite \\(-\\log x + 1\\) as a single log.", answer: "\\(\\log\\dfrac{e}{x}\\)", method: "\\(1 = \\log e\\)" },
      ],
      pyqExampleId: "317f5b2c-1424-4394-97c1-93180d947e56", // slope y/x+sec(y/x), (1,π/6) → sin(y/x)=log x+1/2
      traps: [
        {
          title: "The bare y/x cancels — don't integrate it",
          body:
            "In \\(v + x\\dfrac{dv}{dx} = v + h(v)\\), the \\(v\\) on both sides cancels. Students who keep it and try to integrate \\(v\\) as well produce an extra \\(\\log\\) term. Only the trig part \\(h(v)\\) survives to the separable equation.",
        },
        {
          title: "Feed the initial point to find c — always",
          body:
            "These are 'curve through a point' questions, so the constant is fixed by the point, not left as \\(c\\). Forgetting to substitute \\((1, \\pi/4)\\) etc. leaves you with a general-solution decoy rather than the specific curve the options list.",
        },
      ],
    },

    // 5 — reducible to homogeneous / log-form via v = y/x (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-reducible-log-form",
      name: "Log-Form Homogeneous Equations (v = y/x)",
      intuition:
        "Some equations hide their homogeneity inside a log: x·y′ = y(log(y/x) + 1). Dividing by x shows the right side is y/x times a function of y/x, so it IS homogeneous. Substituting v = y/x produces a separable equation of the form dv/(v·log v) = dx/x — whose left side integrates to log(log v).",
      definition:
        "For \\(x\\dfrac{dy}{dx} = y\\!\\left(\\log\\dfrac{y}{x} + 1\\right)\\):\n" +
        "- Divide by \\(x\\): \\(\\dfrac{dy}{dx} = \\dfrac{y}{x}\\!\\left(\\log\\dfrac{y}{x} + 1\\right)\\) — homogeneous.\n" +
        "- Put \\(v = \\dfrac{y}{x}\\), \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\): \\(v + x\\dfrac{dv}{dx} = v(\\log v + 1) = v\\log v + v\\).\n" +
        "- Cancel \\(v\\): \\(x\\dfrac{dv}{dx} = v\\log v\\), so \\(\\dfrac{dv}{v\\log v} = \\dfrac{dx}{x}\\).\n" +
        "- The key integral: \\(\\displaystyle\\int\\dfrac{dv}{v\\log v} = \\log(\\log v)\\) (put \\(t = \\log v\\)). Hence \\(\\log(\\log v) = \\log x + \\log c\\), giving \\(\\log v = c x\\), i.e. \\(\\log\\dfrac{y}{x} = c x\\).",
      formula: {
        label: "The log-form integral",
        latex: "\\int\\dfrac{dv}{v\\,\\log v} = \\log(\\log v) \\;\\Rightarrow\\; \\log\\dfrac{y}{x} = c\\,x",
        symbols: [
          { symbol: "t = log v", meaning: "substitution making \\(dt = dv/v\\), so the integrand becomes \\(dt/t\\)" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(x\\dfrac{dy}{dx} = y(\\log y - \\log x + 1)\\).",
        steps: [
          "Combine the logs: \\(\\log y - \\log x = \\log\\dfrac{y}{x}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{y}{x}\\!\\left(\\log\\dfrac{y}{x} + 1\\right)\\).",
          "Put \\(v = y/x\\): \\(v + x\\dfrac{dv}{dx} = v(\\log v + 1)\\), so \\(x\\dfrac{dv}{dx} = v\\log v\\).",
          "Separate: \\(\\dfrac{dv}{v\\log v} = \\dfrac{dx}{x}\\). Integrate: \\(\\log(\\log v) = \\log x + \\log c\\).",
          "So \\(\\log v = c x\\), i.e. \\(\\log\\dfrac{y}{x} = c x\\).",
        ],
        answer: "\\(\\log\\dfrac{y}{x} = c x\\)",
      },
      selfCheckExample: {
        prompt: "Confirm \\(\\displaystyle\\int\\dfrac{dv}{v\\log v}\\) and hence solve \\(x\\dfrac{dv}{dx} = v\\log v\\).",
        steps: [
          "Let \\(t = \\log v\\), \\(dt = \\dfrac{dv}{v}\\). Then \\(\\displaystyle\\int\\dfrac{dv}{v\\log v} = \\int\\dfrac{dt}{t} = \\log t = \\log(\\log v)\\).",
          "So \\(\\log(\\log v) = \\log x + \\log c\\), giving \\(\\log v = c x\\).",
        ],
        answer: "\\(\\log v = c x\\), i.e. \\(\\log\\dfrac{y}{x} = c x\\).",
      },
      practiceSet: [
        { prompt: "Combine \\(\\log y - \\log x\\).", answer: "\\(\\log\\dfrac{y}{x}\\)" },
        { prompt: "Simplify \\(v(\\log v + 1) - v\\).", answer: "\\(v\\log v\\)" },
        { prompt: "\\(\\int\\dfrac{dv}{v\\log v} = ?\\)", answer: "\\(\\log(\\log v)\\)", method: "\\(t = \\log v\\)" },
        { prompt: "From \\(\\log(\\log v) = \\log(cx)\\), solve for \\(\\log v\\).", answer: "\\(\\log v = cx\\)" },
      ],
      pyqExampleId: "1183e498-fdf0-4acb-82bb-6257e6ed605d", // x y' = y(log y - log x + 1) → log(y/x)=cx
      traps: [
        {
          title: "The integral is log(log v), not log v",
          body:
            "\\(\\displaystyle\\int\\dfrac{dv}{v\\log v}\\) uses \\(t = \\log v\\) so it becomes \\(\\int\\dfrac{dt}{t} = \\log(\\log v)\\). Stopping at \\(\\log v\\) (as if the denominator were just \\(v\\)) gives the wrong final relation — you would miss the outer log and get \\(v = cx\\) instead of \\(\\log v = cx\\).",
        },
        {
          title: "It's cx, not cy — check which variable the constant multiplies",
          body:
            "The correct answer is \\(\\log\\dfrac{y}{x} = c x\\) (the \\(dx/x\\) side integrated to \\(\\log x\\)). Decoys swap it to \\(cy\\) or flip the ratio to \\(\\log\\dfrac{x}{y}\\). Track which side became \\(\\log x\\) so you land on \\(cx\\) with the ratio \\(y/x\\).",
        },
      ],
    },

    // 6 — reducible to separable via v = x+y / v = ax+by (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-reducible-linear-substitution",
      name: "Reducible to Separable via v = x + y (or v = ax + by)",
      intuition:
        "When x and y always appear together as x + y — for instance dy/dx = (x + y)² or (x + y + 1)/(x + y − 1) — the substitution v = x + y collapses the pair into one variable. Since v = x + y, differentiating gives dv/dx = 1 + dy/dx, so dy/dx = dv/dx − 1, and the equation becomes separable in v and x. For a scaled pair like x + 9y, use v = x + 9y with dv/dx = 1 + 9·dy/dx.",
      definition:
        "For \\(\\dfrac{dy}{dx} = f(x + y)\\) put \\(v = x + y\\):\n" +
        "- \\(\\dfrac{dv}{dx} = 1 + \\dfrac{dy}{dx}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{dv}{dx} - 1\\).\n" +
        "- The equation becomes \\(\\dfrac{dv}{dx} - 1 = f(v)\\), i.e. \\(\\dfrac{dv}{1 + f(v)} = dx\\) — separable.\n" +
        "- **Worked forms:**\n" +
        "  - \\(\\dfrac{dy}{dx} = (x + y)^2\\): \\(\\dfrac{dv}{1 + v^2} = dx \\Rightarrow \\tan^{-1}v = x + c \\Rightarrow \\tan^{-1}(x + y) = x + c\\).\n" +
        "  - \\(\\cos(x + y)\\,dy = dx\\): \\(\\dfrac{du}{1 + \\cos u} = dy \\Rightarrow y = \\tan\\dfrac{x + y}{2} + c\\).\n" +
        "- **Scaled pair:** for \\(\\dfrac{dy}{dx} = (x + 9y)^2\\) put \\(u = x + 9y\\), \\(\\dfrac{du}{dx} = 1 + 9\\dfrac{dy}{dx}\\), giving \\(\\dfrac{du}{1 + 9u^2} = dx\\).",
      formula: {
        label: "Linear-argument substitution",
        latex: "v = x + y \\;\\Rightarrow\\; \\dfrac{dv}{dx} = 1 + \\dfrac{dy}{dx} \\;\\Rightarrow\\; \\dfrac{dv}{1 + f(v)} = dx",
        symbols: [
          { symbol: "v = x + y", meaning: "collapses the repeated pair into one variable" },
          { symbol: "dv/dx = 1 + dy/dx", meaning: "the +1 from differentiating x — never omit it" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = (x + y)^2\\).",
        steps: [
          "Put \\(v = x + y\\), so \\(\\dfrac{dv}{dx} = 1 + \\dfrac{dy}{dx}\\), i.e. \\(\\dfrac{dy}{dx} = \\dfrac{dv}{dx} - 1\\).",
          "Substitute: \\(\\dfrac{dv}{dx} - 1 = v^2\\), so \\(\\dfrac{dv}{1 + v^2} = dx\\).",
          "Integrate: \\(\\tan^{-1}v = x + c\\).",
          "Back-substitute \\(v = x + y\\): \\(\\tan^{-1}(x + y) = x + c\\).",
        ],
        answer: "\\(\\tan^{-1}(x + y) = x + c\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{x + y + 1}{x + y - 1}\\).",
        steps: [
          "Put \\(v = x + y\\): \\(\\dfrac{dv}{dx} = 1 + \\dfrac{dy}{dx}\\), so \\(\\dfrac{dv}{dx} - 1 = \\dfrac{v + 1}{v - 1}\\).",
          "Then \\(\\dfrac{dv}{dx} = \\dfrac{v + 1}{v - 1} + 1 = \\dfrac{2v}{v - 1}\\), so \\(\\dfrac{v - 1}{2v}\\,dv = dx\\).",
          "Integrate: \\(\\dfrac{v}{2} - \\dfrac{\\log v}{2} = x + c_1\\), i.e. \\(v - \\log v = 2x + c_2\\).",
          "Back-substitute and tidy: \\(y = x + \\log(x + y) + c\\).",
        ],
        answer: "\\(y = x + \\log(x + y) + c\\)",
      },
      practiceSet: [
        { prompt: "For \\(v = x + y\\), write \\(\\dfrac{dv}{dx}\\).", answer: "\\(1 + \\dfrac{dy}{dx}\\)" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} = (x+y)^2\\).", answer: "\\(\\tan^{-1}(x+y) = x + c\\)", method: "\\(v = x+y\\)" },
        { prompt: "For \\(\\dfrac{dy}{dx} = (x+9y)^2\\), what substitution and \\(\\frac{du}{dx}\\)?", answer: "\\(u = x+9y,\\; \\dfrac{du}{dx} = 1 + 9\\dfrac{dy}{dx}\\)" },
        { prompt: "Integrate \\(\\dfrac{du}{1 + 9u^2} = dx\\).", answer: "\\(\\tfrac13\\tan^{-1}(3u) = x + c\\)" },
      ],
      pyqExampleId: "2449b82c-132d-49cc-ae51-dcdfad45b39b", // dy/dx=(x+y)² → tan⁻¹(x+y)=x+c
      traps: [
        {
          title: "v = x + y gives dv/dx = 1 + dy/dx — keep the +1",
          body:
            "Differentiating \\(v = x + y\\) yields \\(\\dfrac{dv}{dx} = 1 + \\dfrac{dy}{dx}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{dv}{dx} - 1\\). Dropping the \\(1\\) (writing \\(\\dfrac{dy}{dx} = \\dfrac{dv}{dx}\\)) is the signature error and makes the equation fail to separate.",
        },
        {
          title: "For v = ax + by, the coefficient rides through",
          body:
            "For \\(\\dfrac{dy}{dx} = (x + 9y)^2\\), use \\(u = x + 9y\\) so \\(\\dfrac{du}{dx} = 1 + 9\\dfrac{dy}{dx}\\). The integral picks up a \\(\\dfrac13\\) factor: \\(\\dfrac13\\tan^{-1}(3u) = x + c\\). Forgetting the \\(9\\) (or the resulting \\(\\tfrac13\\)) loses the constant when you fit an initial condition.",
        },
        {
          title: "Substitute v = x + y back at the end",
          body:
            "Just like y = vx, the final line must be in \\(x, y\\). \\(\\tan^{-1}v = x + c\\) is only finished once you write \\(\\tan^{-1}(x + y) = x + c\\). Leaving \\(v\\) in the answer will not match any option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Same topic on NDA: Solving and Verifying ODEs",
      href: "/notes/nda-maths/differential-equations/solving",
    },
  ],
};
