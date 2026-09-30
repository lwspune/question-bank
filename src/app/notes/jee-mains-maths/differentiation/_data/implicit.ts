import type { SubtopicNote } from "@/app/notes/_types";

export const IMPLICIT_DIFF_NOTE: SubtopicNote = {
  subtopicName: "Implicit, Parametric and Logarithmic Differentiation",
  title: "Implicit, Parametric and Logarithmic Differentiation",
  oneLineDefinition:
    "Finding dy/dx and d²y/dx² when y is tied to x by an equation or a parameter, or is a power or product that is easier after taking logarithms.",
  whyItMatters:
    "Ten PYQs, six of them multiple choice. Five differentiate an equation in x and y, or a curve given by a parameter, four of them twice; five use logarithms — two powers like xˣ, a long product, a logarithm of a quotient, and ln y given as a function of x. Two ideas cover the page.",
  concepts: [
    // C1 — implicit and parametric
    {
      kind: "formula" as const,
      slug: "jdiff-implicit",
      name: "Implicit and parametric differentiation",
      intuition:
        "When \\(x\\) and \\(y\\) are tied by one equation, differentiate every term with respect to \\(x\\) and treat \\(y\\) as a function: \\(y^2\\) gives \\(2yy'\\). Put in the point before solving for \\(y'\\); the arithmetic is much lighter. For a curve given by a parameter \\(t\\), \\(\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}\\), and the second derivative needs one more division by \\(\\frac{dx}{dt}\\).",
      definition:
        "- Differentiate both sides; each \\(y\\) term picks up a factor \\(y'\\).\n" +
        "- Put in the point, then solve for \\(y'\\); differentiate again for \\(y''\\).\n" +
        "- Parametric: \\(\\frac{dy}{dx}=\\frac{\\dot y}{\\dot x}\\) and \\(\\frac{d^2y}{dx^2}=\\frac{\\dot x\\ddot y-\\dot y\\ddot x}{\\dot x^3}\\).",
      formula: {
        label: "Second derivative, parametric",
        latex: "\\frac{d^2y}{dx^2}=\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)\\Big/\\frac{dx}{dt}",
      },
      authoredExample: {
        prompt: "Find \\(y'\\) and \\(y''\\) at \\((1,2)\\) on the curve \\(x^2+xy+y^2=7\\).",
        steps: [
          "Differentiate: \\(2x+y+xy'+2yy'=0\\). At \\((1,2)\\): \\(4+5y'=0\\), so \\(y'=-\\frac45\\).",
          "Differentiate again: \\(2+2y'+2y'^2+(x+2y)y''=0\\).",
          "At the point: \\(2-\\frac85+\\frac{32}{25}+5y''=0\\), so \\(5y''=-\\frac{42}{25}\\).",
        ],
        answer: "\\(y'=-\\frac45\\) and \\(y''=-\\frac{42}{125}\\).",
      },
      selfCheckExample: {
        prompt: "\\(x=t^2\\), \\(y=t^3\\). Find \\(\\frac{d^2y}{dx^2}\\) at \\(t=1\\).",
        steps: [
          "\\(\\frac{dy}{dx}=\\frac{3t^2}{2t}=\\frac{3t}{2}\\).",
          "\\(\\frac{d^2y}{dx^2}=\\frac{3/2}{2t}=\\frac{3}{4t}\\).",
        ],
        answer: "\\(\\frac34\\).",
      },
      practiceSet: [
        { prompt: "\\(y'\\) at \\((3,4)\\) on \\(x^2+y^2=25\\)?", answer: "\\(-\\frac34\\)" },
        { prompt: "\\(x=\\cos t,\\ y=\\sin t\\): \\(\\frac{dy}{dx}\\) at \\(t=\\frac\\pi4\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(y'\\) at \\((2,2)\\) on \\(xy=4\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(x=t^2,\\ y=2t\\): \\(\\frac{d^2y}{dx^2}\\)?", answer: "\\(-\\frac{1}{2t^3}\\)" },
      ],
      pyqExampleId: "69c14a67-a722-4a2e-bf01-5bb141d673a7", // 2023 — dy/dx at (2, 2) on 2x^y + 3y^x = 20
      traps: [
        {
          title: "Not the ratio of second derivatives",
          body: "For a parametric curve \\(\\frac{d^2y}{dx^2}\\ne\\frac{\\ddot y}{\\ddot x}\\). With \\(x=t^2,\\ y=t^3\\) the ratio gives \\(3t\\), but the true value is \\(\\frac{3}{4t}\\). Differentiate \\(\\frac{dy}{dx}\\) with respect to \\(t\\), then divide by \\(\\frac{dx}{dt}\\).",
        },
      ],
    },

    // C2 — logarithmic differentiation
    {
      kind: "formula" as const,
      slug: "jdiff-logdiff",
      name: "Logarithmic differentiation",
      intuition:
        "A variable power like \\(x^x\\) has no ordinary rule. Take logarithms: \\(\\ln y=x\\ln x\\), so \\(\\frac{y'}{y}=\\ln x+1\\). The same step turns a long product into a sum and a quotient into a difference. When \\(\\ln y\\) is given, as in \\(\\ln y=k\\sin^{-1}x\\), clear the square root and differentiate again: the question usually wants a combination of \\(y''\\), \\(y'\\) and \\(y\\), not each one.",
      definition:
        "- \\(y=f(x)^{g(x)}\\): \\(\\ln y=g\\ln f\\), so \\(\\frac{y'}{y}=g'\\ln f+\\frac{gf'}{f}\\).\n" +
        "- A product becomes a sum of logarithms; a quotient becomes a difference.\n" +
        "- \\(\\frac{dx}{dy}=\\frac{1}{y'}\\) and \\(\\frac{d^2x}{dy^2}=-\\frac{y''}{(y')^3}\\).",
      formula: {
        label: "Variable power",
        latex: "\\frac{d}{dx}f^{\\,g}=f^{\\,g}\\left(g'\\ln f+\\frac{g\\,f'}{f}\\right)",
      },
      authoredExample: {
        prompt: "Find \\(y'(e)\\) if \\(y=x^{\\ln x}\\), \\(x>0\\).",
        steps: [
          "\\(\\ln y=(\\ln x)^2\\), so \\(\\frac{y'}{y}=\\frac{2\\ln x}{x}\\).",
          "At \\(x=e\\): \\(y=e^{1}=e\\) and \\(\\frac{y'}{y}=\\frac2e\\).",
        ],
        answer: "\\(y'(e)=2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(y'(0)\\) for \\(y=(1+x)(1+2x)(1+3x)\\).",
        steps: [
          "\\(\\frac{y'}{y}=\\frac{1}{1+x}+\\frac{2}{1+2x}+\\frac{3}{1+3x}\\).",
          "At \\(x=0\\): \\(y=1\\) and \\(\\frac{y'}{y}=1+2+3\\).",
        ],
        answer: "\\(y'(0)=6\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}x^x\\) at \\(x=1\\)?", answer: "\\(1\\)" },
        { prompt: "\\(y=\\frac{(x+1)^2}{x+2}\\): \\(y'(0)\\)?", answer: "\\(\\frac34\\)" },
        { prompt: "\\(\\frac{d}{dx}\\ln\\frac{1+x}{1-x}\\)?", answer: "\\(\\frac{2}{1-x^2}\\)" },
        { prompt: "\\(y=e^x\\): \\(\\frac{d^2x}{dy^2}\\)?", answer: "\\(-\\frac{1}{y^2}\\)" },
      ],
      pyqExampleId: "a9e6f8e0-ad21-47bf-ad59-88561026c488", // 2024 — y = ln((1 - x²)/(1 + x²)); 225(y′ - y″) at x = 1/2
      traps: [
        {
          title: "d²x/dy² is not 1/y″",
          body: "\\(\\frac{dx}{dy}=\\frac{1}{y'}\\), but \\(\\frac{d^2x}{dy^2}=-\\frac{y''}{(y')^3}\\), not \\(\\frac{1}{y''}\\). Differentiate \\(\\frac{1}{y'}\\) with respect to \\(x\\), then divide by \\(y'\\) once more.",
        },
      ],
    },
  ],
};
