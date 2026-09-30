import type { SubtopicNote } from "@/app/notes/_types";

export const HOMOGENEOUS_DE_NOTE: SubtopicNote = {
  subtopicName: "Homogeneous Equations",
  title: "Homogeneous Equations",
  oneLineDefinition:
    "Equations where the slope depends only on the ratio y/x, solved by putting y = vx; and the variants that need x = vy, a shift of origin, or a power substitution first.",
  whyItMatters:
    "Twenty-four PYQs, twenty of them multiple choice. Most are the standard move: y = vx turns the equation into a separable one in v and x. The rest hide the homogeneous form behind x as the dependent variable, a constant term that a shift of origin removes, or y² where y should be. Two ideas cover the page.",
  concepts: [
    // C1 — y = vx
    {
      kind: "formula" as const,
      slug: "jde-vx",
      name: "Putting y = vx",
      intuition:
        "An equation is homogeneous when every term has the same total degree in \\(x\\) and \\(y\\), so the slope can be written as \\(F\\left(\\frac yx\\right)\\). Put \\(y=vx\\): then \\(\\frac{dy}{dx}=v+x\\frac{dv}{dx}\\), and the equation becomes \\(x\\frac{dv}{dx}=F(v)-v\\), which separates. Return to \\(y\\) at the end, then use the given point.",
      definition:
        "- Test: replacing \\(x,y\\) by \\(tx,ty\\) leaves the slope unchanged.\n" +
        "- \\(y=vx\\Rightarrow y'=v+xv'\\) and \\(\\frac{dv}{F(v)-v}=\\frac{dx}{x}\\).\n" +
        "- \\(x\\,dy-y\\,dx=x^2\\,dv\\) when \\(y=vx\\).\n" +
        "- \\(\\int\\frac{dv}{\\sqrt{1+v^2}}=\\ln\\left(v+\\sqrt{1+v^2}\\right)\\), \\(\\int\\frac{dv}{\\sqrt{1-v^2}}=\\sin^{-1}v\\).",
      formula: {
        label: "The substitution",
        latex: "y=vx:\\quad v+x\\frac{dv}{dx}=F(v)\\ \\Rightarrow\\ \\int\\frac{dv}{F(v)-v}=\\ln|x|+C",
      },
      authoredExample: {
        prompt: "Solve \\(\\frac{dy}{dx}=\\frac{y}{x}+\\frac{x}{y}\\) with \\(y(1)=1\\), and find \\(y(e)^2\\).",
        steps: [
          "\\(y=vx\\): \\(xv'=\\frac1v\\), so \\(v\\,dv=\\frac{dx}{x}\\) and \\(\\frac{v^2}{2}=\\ln x+C\\).",
          "\\(v(1)=1\\): \\(C=\\frac12\\), so \\(y^2=x^2(2\\ln x+1)\\).",
        ],
        answer: "\\(y(e)^2=3e^2\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(x\\frac{dy}{dx}=y+x\\) with \\(y(1)=0\\).",
        steps: [
          "\\(y=vx\\): \\(xv'=1\\), so \\(v=\\ln x+C\\) and \\(C=0\\).",
        ],
        answer: "\\(y=x\\ln x\\).",
      },
      practiceSet: [
        { prompt: "Is \\(y'=\\frac{x^2+y^2}{xy}\\) homogeneous?", answer: "Yes" },
        { prompt: "\\(y=vx\\): \\(y'\\)?", answer: "\\(v+xv'\\)" },
        { prompt: "Is \\(y'=\\frac{x+y+1}{x-y}\\) homogeneous?", answer: "No: shift the origin first" },
        { prompt: "\\(\\int\\frac{dv}{1+v^2}\\)?", answer: "\\(\\tan^{-1}v\\)" },
      ],
      pyqExampleId: "dbfa7923-b653-4086-aa17-fb00e8956ca5", // 2022 — x y' - y = sqrt(y^2 + 16x^2), y(1) = 3
      traps: [
        {
          title: "Return to y before using the point",
          body: "The condition is given in \\(x\\) and \\(y\\). Either convert it to \\(v=\\frac yx\\) at that point, or substitute back first; mixing the two gives the wrong constant.",
        },
      ],
    },

    // C2 — reshape first
    {
      kind: "formula" as const,
      slug: "jde-reshape",
      name: "When y = vx is not the first move",
      intuition:
        "Three variants reach the same method. If the equation is simpler with \\(x\\) as the dependent variable, put \\(x=vy\\). If numerator and denominator are linear with constant terms, move the origin to where both lines meet, \\(x=X+h\\), \\(y=Y+k\\), and the constants vanish. If \\(y\\) appears only as \\(y^2\\) (with \\(y\\,dy\\)), put \\(t=y^2\\) and the equation becomes homogeneous in \\(x\\) and \\(t\\).",
      definition:
        "- \\(\\frac{dx}{dy}=F\\left(\\frac xy\\right)\\): put \\(x=vy\\), \\(\\frac{dx}{dy}=v+y\\frac{dv}{dy}\\).\n" +
        "- \\(\\frac{dy}{dx}=\\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\\): solve \\(a_1h+b_1k+c_1=0\\), \\(a_2h+b_2k+c_2=0\\) and shift.\n" +
        "- \\(y\\,dy\\) with \\(y^2\\) elsewhere: put \\(t=y^2\\), \\(dt=2y\\,dy\\).",
      formula: {
        label: "Shift of origin",
        latex: "x=X+h,\\ y=Y+k:\\quad \\frac{dY}{dX}=\\frac{a_1X+b_1Y}{a_2X+b_2Y}",
      },
      authoredExample: {
        prompt: "Reduce \\(\\frac{dy}{dx}=\\frac{x+y-4}{x-y+2}\\) to a homogeneous equation.",
        steps: [
          "\\(h+k=4\\), \\(h-k=-2\\): \\(h=1,\\ k=3\\).",
          "With \\(x=X+1\\), \\(y=Y+3\\): \\(\\frac{dY}{dX}=\\frac{X+Y}{X-Y}\\).",
        ],
        answer: "\\(\\frac{dY}{dX}=\\frac{X+Y}{X-Y}\\), centred at \\((1,3)\\).",
      },
      selfCheckExample: {
        prompt: "Which substitution suits \\(y\\frac{dx}{dy}=x+y\\)?",
        steps: [
          "The slope \\(\\frac{dx}{dy}=\\frac xy+1\\) depends on \\(\\frac xy\\).",
        ],
        answer: "\\(x=vy\\), giving \\(v=\\ln y+C\\).",
      },
      practiceSet: [
        { prompt: "\\(x=vy\\): \\(\\frac{dx}{dy}\\)?", answer: "\\(v+y\\frac{dv}{dy}\\)" },
        { prompt: "Shift for \\(\\frac{x+y-2}{x-y-4}\\)?", answer: "\\(h=3,\\ k=-1\\)" },
        { prompt: "Substitution for \\((x+y^2)\\,dx=xy\\,dy\\)?", answer: "\\(t=y^2\\)" },
        { prompt: "When does a shift fail?", answer: "When the two lines are parallel" },
      ],
      pyqExampleId: "46939101-d71c-4094-9892-52c66084898e", // 2022 — dy/dx = (x + y - 2)/(x - y) through (2, 1)
      traps: [
        {
          title: "Parallel lines need a different substitution",
          body: "If \\(a_1x+b_1y\\) and \\(a_2x+b_2y\\) are proportional, the two lines never meet and no shift exists. Put \\(t=a_1x+b_1y\\) instead; the equation then separates.",
        },
      ],
    },
  ],
};
