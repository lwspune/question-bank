import type { SubtopicNote } from "@/app/notes/_types";

export const FORMATION_NOTE: SubtopicNote = {
  subtopicName: "Formation of ODE from Curves and General Solutions",
  title: "Forming an ODE from a Family of Curves",
  oneLineDefinition:
    "To form the differential equation of a family of curves, differentiate enough times to eliminate every arbitrary constant — n constants need n differentiations and produce an order-n equation.",
  whyItMatters:
    "12 PYQs running the reverse of solving: you are given the answer (a family of curves) and must find the equation. The recipe never changes — differentiate, eliminate the constants — so these are dependable marks once the routine is automatic.",
  concepts: [
    // 1 — forming by elimination (diagram)
    {
      kind: "formula" as const,
      slug: "forming-ode-by-elimination",
      name: "Eliminating arbitrary constants",
      intuition:
        "A family of curves with arbitrary constants is the general solution of some ODE. To recover that ODE, differentiate the family — each differentiation gives a new equation — until you have enough equations to eliminate every constant. With n constants, differentiate n times.",
      definition:
        "The elimination recipe:\n" +
        "- Count the arbitrary constants — that is the order of the ODE you will get.\n" +
        "- **Differentiate** the family that many times.\n" +
        "- **Eliminate** the constants between the original equation and its derivatives; the constant-free relation is the ODE.\n" +
        "- Examples: parabolas \\(x^2=4ay\\) (one constant) → \\(x\\,\\dfrac{dy}{dx}=2y\\); \\(y=e^x(a\\cos x+b\\sin x)\\) (two constants) → \\(y''-2y'+2y=0\\).",
      visualizationSlug: "defeq-family-of-curves",
      authoredExample: {
        prompt: "Form the differential equation of the family \\(y = cx^2\\) (c arbitrary).",
        steps: [
          "One constant \\(c\\) → differentiate once: \\(\\dfrac{dy}{dx} = 2cx\\).",
          "From the original, \\(c = \\dfrac{y}{x^2}\\). Substitute: \\(\\dfrac{dy}{dx} = 2\\cdot\\dfrac{y}{x^2}\\cdot x = \\dfrac{2y}{x}\\).",
          "So \\(x\\dfrac{dy}{dx} = 2y\\).",
        ],
        answer: "\\(x\\dfrac{dy}{dx} - 2y = 0\\).",
      },
      selfCheckExample: {
        prompt: "Form the differential equation of the family of parabolas \\(x^2 = 4ay\\) with vertex at the origin.",
        steps: [
          "One constant \\(a\\) → differentiate once: \\(2x = 4a\\dfrac{dy}{dx}\\), so \\(a = \\dfrac{x}{2\\,dy/dx}\\).",
          "From the original, \\(a = \\dfrac{x^2}{4y}\\). Equate the two: \\(\\dfrac{x^2}{4y} = \\dfrac{x}{2\\,dy/dx}\\).",
          "Cross-multiply: \\(x\\dfrac{dy}{dx} = 2y\\).",
        ],
        answer: "\\(x\\dfrac{dy}{dx} - 2y = 0\\).",
      },
      practiceSet: [
        { prompt: "How many times to differentiate a 2-constant family?", answer: "Twice" },
        { prompt: "ODE of \\(y = A - \\frac{B}{x}\\) (two constants)?", answer: "\\(xy'' + 2y' = 0\\)" },
        { prompt: "ODE of \\(y = e^x(a\\cos x + b\\sin x)\\)?", answer: "\\(y'' - 2y' + 2y = 0\\)" },
      ],
      pyqExampleId: "f85c99f8-8966-4fc4-b472-ff64b6a5a3e1", // parabola x²=4ay → x y'=2y
      traps: [
        {
          title: "Differentiate as many times as there are constants",
          body:
            "A one-constant family needs one differentiation (order 1); a two-constant family like \\(y^2=4a(x-b)\\) needs two (order 2, giving \\(yy''+(y')^2=0\\)). Differentiating too few times leaves a constant stranded in the answer.",
        },
        {
          title: "The order of the resulting ODE equals the number of constants",
          body:
            "Before you differentiate, the family \\(y=Ae^{2x}+Be^{-3x}\\) has 2 arbitrary constants, so the eliminated ODE is order 2 — guaranteed. Reading the order off the highest derivative you happen to reach mid-working (or stopping early) gives the wrong order; count the independent constants first and that IS the order.",
        },
      ],
    },

    // 2 — matching ODE to solution
    {
      kind: "formula" as const,
      slug: "matching-ode-to-solution",
      name: "Matching an ODE to its general solution",
      intuition:
        "Sometimes you are handed both a candidate ODE and a family, and must check they correspond — or decide what condition makes a solution a particular shape (a circle, say). Either differentiate the family to confirm it fits the ODE, or solve the ODE and compare.",
      definition:
        "Two directions, one idea:\n" +
        "- **Family → ODE**: differentiate and eliminate constants (as above), then compare with the given option.\n" +
        "- **ODE → family**: integrate the separable ODE and read off the curve type.\n" +
        "- A solved family is a **circle** only when the \\(x^2\\) and \\(y^2\\) coefficients are equal — e.g. \\(\\dfrac{dy}{dx}=\\dfrac{ax+h}{by+k}\\) integrates to a circle exactly when \\(a=-b\\).",
      authoredExample: {
        prompt: "For what relation between a and b does \\(\\dfrac{dy}{dx} = \\dfrac{ax}{by}\\) have circular solutions?",
        steps: [
          "Separate: \\(by\\,dy = ax\\,dx\\), integrate: \\(\\dfrac{b}{2}y^2 = \\dfrac{a}{2}x^2 + C\\).",
          "Rearrange: \\(\\dfrac{a}{2}x^2 - \\dfrac{b}{2}y^2 + C = 0\\).",
          "A circle needs equal coefficients on \\(x^2\\) and \\(y^2\\): \\(\\dfrac{a}{2} = \\dfrac{b}{2}\\) with opposite signs after moving terms, i.e. \\(a = -b\\).",
        ],
        answer: "\\(a = -b\\) (and nonzero).",
      },
      selfCheckExample: {
        prompt: "The general solution of \\(\\dfrac{dy}{dx} = \\dfrac{ax+h}{by+k}\\) is a circle only when?",
        steps: [
          "Separate and integrate: \\(\\dfrac{b}{2}y^2+ky = \\dfrac{a}{2}x^2+hx+C\\).",
          "Bring to one side: the \\(x^2\\) coefficient is \\(\\dfrac{a}{2}\\), the \\(y^2\\) coefficient is \\(-\\dfrac{b}{2}\\).",
          "A circle requires these equal: \\(\\dfrac{a}{2} = -\\big(-\\dfrac{b}{2}\\big)\\Rightarrow a = -b\\).",
        ],
        answer: "\\(a = -b\\neq 0\\).",
      },
      practiceSet: [
        { prompt: "To confirm a family solves a given ODE, you?", answer: "Differentiate the family and substitute" },
        { prompt: "Integrated \\(x^2 - y^2 = c\\) — circle or hyperbola?", answer: "Hyperbola", method: "opposite-sign squares" },
        { prompt: "Equal, same-sign \\(x^2\\) and \\(y^2\\) coefficients give a?", answer: "Circle" },
      ],
      pyqExampleId: "5d3b6fff-74a5-47e1-9d8a-92b0a519db4b", // circle only when a=-b
      traps: [
        {
          title: "A circle needs equal squared-term coefficients",
          body:
            "After integrating, \\(\\frac{a}{2}x^2 - \\frac{b}{2}y^2\\) is a circle only if those coefficients match in magnitude (giving \\(a=-b\\)); otherwise it is an ellipse or hyperbola. Don't assume any separable solution is a circle.",
        },
      ],
    },
  ],
};
