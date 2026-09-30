import type { SubtopicNote } from "@/app/notes/_types";

export const SEPARABLE_DE_NOTE: SubtopicNote = {
  subtopicName: "Separating the Variables",
  title: "Separating the Variables",
  oneLineDefinition:
    "Solving an equation by putting every y on one side and every x on the other, then integrating both sides; including the cases that separate only after a substitution or after spotting an exact differential.",
  whyItMatters:
    "Thirty-one PYQs, and 2024 alone has twelve. Most separate at once, and the work is the integral and the constant from the given point. A few need a substitution for x + y, or a regrouping such as x dy + y dx = d(xy), before they separate. Three ideas cover the page.",
  concepts: [
    // C1 — separate
    {
      kind: "formula" as const,
      slug: "jde-separate",
      name: "Separate, integrate, fix the constant",
      intuition:
        "If the right side factors as \\(f(x)\\,g(y)\\), divide by \\(g(y)\\) and integrate: \\(\\int\\frac{dy}{g(y)}=\\int f(x)\\,dx+C\\). One given point fixes \\(C\\). Keep the constant as a multiplier when logs appear: \\(\\ln|y+3|=\\ln|x|+C\\) is \\(y+3=Ax\\), which is easier to use.",
      definition:
        "- \\(\\frac{dy}{dx}=f(x)g(y)\\Rightarrow\\int\\frac{dy}{g(y)}=\\int f(x)\\,dx+C\\).\n" +
        "- Factor first: \\(xy-1+x-y=(x-1)(y+1)\\), \\(2^{x+y}-2^x=2^x(2^y-1)\\).\n" +
        "- \\(\\int\\frac{dy}{1+y^2}=\\tan^{-1}y\\); \\(\\int\\frac{e^x\\,dx}{1+e^{2x}}=\\tan^{-1}e^x\\).\n" +
        "- Two solutions with different constants of \\(y'=y+k\\) never meet.",
      formula: {
        label: "Separable form",
        latex: "\\frac{dy}{dx}=f(x)\\,g(y)\\ \\Rightarrow\\ \\int\\frac{dy}{g(y)}=\\int f(x)\\,dx+C",
      },
      authoredExample: {
        prompt: "Solve \\(\\frac{dy}{dx}=\\frac{x(1+y^2)}{y}\\) with \\(y(0)=1\\), and find \\(y^2\\) at \\(x=1\\).",
        steps: [
          "\\(\\frac{y\\,dy}{1+y^2}=x\\,dx\\Rightarrow\\frac12\\ln(1+y^2)=\\frac{x^2}{2}+C\\).",
          "\\(y(0)=1\\): \\(C=\\frac12\\ln2\\), so \\(1+y^2=2e^{x^2}\\).",
        ],
        answer: "\\(y^2(1)=2e-1\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{dy}{dx}=e^{x-y}\\) with \\(y(0)=0\\), and find \\(y(\\ln3)\\).",
        steps: [
          "\\(e^y\\,dy=e^x\\,dx\\Rightarrow e^y=e^x+C\\), and \\(C=0\\).",
        ],
        answer: "\\(y(\\ln3)=\\ln3\\).",
      },
      practiceSet: [
        { prompt: "Separate \\(y'=xy\\).", answer: "\\(\\frac{dy}{y}=x\\,dx\\)" },
        { prompt: "Solution of \\(y'=xy\\), \\(y(0)=1\\)?", answer: "\\(y=e^{x^2/2}\\)" },
        { prompt: "\\(\\int\\frac{2^y\\,dy}{2^y-1}\\)?", answer: "\\(\\log_2(2^y-1)\\)" },
        { prompt: "Factor \\(1+x+y+xy\\).", answer: "\\((1+x)(1+y)\\)" },
      ],
      pyqExampleId: "bb315f2e-d7e2-4e61-a5cb-ef169e2101a7", // 2025 — 2(3 + y)e^{2x} dx = (7 + e^{2x}) dy
      traps: [
        {
          title: "Constant before exponentiating",
          body: "From \\(\\ln y=x^2+C\\), the solution is \\(y=Ae^{x^2}\\), not \\(e^{x^2}+C\\). Fix the constant in whichever form you keep, and never add it after exponentiating.",
        },
      ],
    },

    // C2 — direct integration
    {
      kind: "formula" as const,
      slug: "jde-direct",
      name: "When the slope depends on x alone",
      intuition:
        "If \\(\\frac{dy}{dx}\\) is a function of \\(x\\) only, the equation is just an integral: \\(y=\\int f(x)\\,dx+C\\). The work is the integration — often by parts, by \\(t=e^x\\), or by recognising a derivative. A second-order equation with no \\(y\\) in it integrates twice.",
      definition:
        "- \\(y'=f(x)\\Rightarrow y=\\int f(x)\\,dx+C\\).\n" +
        "- \\(f''=g''\\Rightarrow f-g=ax+b\\).\n" +
        "- \\(1+\\sin2x=(\\sin x+\\cos x)^2=2\\sin^2\\left(x+\\frac\\pi4\\right)\\).",
      formula: {
        label: "Direct integration",
        latex: "\\frac{dy}{dx}=f(x)\\ \\Rightarrow\\ y=\\int f(x)\\,dx+C",
      },
      authoredExample: {
        prompt: "\\(y'=x\\cos x\\) and \\(y(0)=1\\). Find \\(y(\\pi)\\).",
        steps: [
          "By parts, \\(y=x\\sin x+\\cos x+C\\); \\(y(0)=1\\) gives \\(C=0\\).",
        ],
        answer: "\\(y(\\pi)=-1\\).",
      },
      selfCheckExample: {
        prompt: "\\(f''(x)=6x\\), \\(f'(0)=1\\), \\(f(0)=2\\). Find \\(f(1)\\).",
        steps: [
          "\\(f'=3x^2+1\\), \\(f=x^3+x+2\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "\\(y'=\\sec^2x\\), \\(y(0)=0\\)?", answer: "\\(y=\\tan x\\)" },
        { prompt: "\\(f''=g''\\) means \\(f-g\\) is?", answer: "Linear, \\(ax+b\\)" },
        { prompt: "\\(y'=2x\\), \\(y(1)=0\\)?", answer: "\\(y=x^2-1\\)" },
        { prompt: "Constants in \\(y''=0\\)?", answer: "Two" },
      ],
      pyqExampleId: "241902ce-0ab7-4196-a469-67674f3d9da1", // 2026 — f'' = g'', find f(25) - g(25)
      traps: [
        {
          title: "Two conditions for a second-order equation",
          body: "Integrating twice brings two constants, so it needs two conditions — often one on the derivative and one on the value.",
        },
      ],
    },

    // C3 — substitution and regrouping
    {
      kind: "formula" as const,
      slug: "jde-regroup",
      name: "Substituting for x + y, and exact differentials",
      intuition:
        "When the right side is a function of \\(ax+by+c\\), put \\(t=ax+by+c\\): then \\(\\frac{dt}{dx}=a+b\\frac{dy}{dx}\\) and the equation separates in \\(t\\) and \\(x\\). When the equation mixes \\(x\\,dy\\) and \\(y\\,dx\\), look for the exact pieces \\(x\\,dy+y\\,dx=d(xy)\\) and \\(\\frac{x\\,dy-y\\,dx}{x^2}=d\\left(\\frac yx\\right)\\).",
      definition:
        "- \\(y'=f(ax+by+c)\\): put \\(t=ax+by+c\\), \\(t'=a+bf(t)\\).\n" +
        "- \\(x\\,dy+y\\,dx=d(xy)\\).\n" +
        "- \\(\\frac{x\\,dy-y\\,dx}{x^2}=d\\left(\\frac yx\\right)\\), \\(\\frac{x\\,dy-y\\,dx}{xy}=d\\left(\\ln\\frac yx\\right)\\).\n" +
        "- \\(M\\,dx+N\\,dy=0\\) with \\(M_y=N_x\\) is exact: integrate to one function \\(F(x,y)=C\\).",
      formula: {
        label: "Substitution for a linear combination",
        latex: "t=ax+by+c\\ \\Rightarrow\\ \\frac{dt}{dx}=a+b\\,\\frac{dy}{dx}",
      },
      authoredExample: {
        prompt: "Solve \\(\\frac{dy}{dx}=(x+y)^2\\) with \\(y(0)=0\\).",
        steps: [
          "\\(t=x+y\\): \\(t'=1+t^2\\), so \\(\\tan^{-1}t=x+C\\), \\(C=0\\).",
        ],
        answer: "\\(y=\\tan x-x\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(x\\,dy+y\\,dx=x^2\\,dx\\) with \\(y(1)=1\\).",
        steps: [
          "\\(d(xy)=x^2\\,dx\\Rightarrow xy=\\frac{x^3}{3}+C\\), \\(C=\\frac23\\).",
        ],
        answer: "\\(y=\\frac{x^2}{3}+\\frac{2}{3x}\\).",
      },
      practiceSet: [
        { prompt: "\\(x\\,dy+y\\,dx\\)?", answer: "\\(d(xy)\\)" },
        { prompt: "\\(\\frac{x\\,dy-y\\,dx}{x^2}\\)?", answer: "\\(d(y/x)\\)" },
        { prompt: "Substitution for \\(y'=\\sin(x+y)\\)?", answer: "\\(t=x+y\\)" },
        { prompt: "Test for exactness of \\(M\\,dx+N\\,dy\\)?", answer: "\\(M_y=N_x\\)" },
      ],
      pyqExampleId: "22ba0472-5b9d-46f3-962f-a502a464b162", // 2024 — (2x + 3y - 2)dx + (4x + 6y - 7)dy = 0
      traps: [
        {
          title: "Differentiate the substitution fully",
          body: "With \\(t=2x+3y\\), \\(\\frac{dt}{dx}=2+3\\frac{dy}{dx}\\), not \\(3\\frac{dy}{dx}\\). Dropping the 2 gives a separable equation with the wrong answer.",
        },
      ],
    },
  ],
};
