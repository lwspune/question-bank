import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DE_HOMOGENEOUS_NOTE: SubtopicNote = {
  subtopicName: "Homogeneous Differential Equations",
  title: "Homogeneous Differential Equations",
  oneLineDefinition:
    "Testing whether dy/dx = F(x, y) is homogeneous, solving it with y = vx, handling y/x inside a sine, cosine, exponential or logarithm, and the dx/dy form solved with x = vy.",
  whyItMatters:
    "59 questions, thirty-five of them from board papers in every year from 2022 to 2026, and all but three of those thirty-five are written answers. The board asks which function or equation is homogeneous (2023 to 2026), general and particular solutions by y = vx of equations such as (x² − y²) dx + 2xy dy = 0 (every year), equations with y/x inside a sine, cosine, cosecant, exponential or logarithm, usually with a condition such as y = π/4 when x = 1 (every year), and the dx/dy form solved by x = vy (2023, 2026). The textbook adds Exercise 9.4, Examples 10 to 13, Miscellaneous Example 21 and Miscellaneous Questions 3 and 8.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmde-homtest",
      name: "Is it homogeneous? The degree zero test",
      intuition:
        "Replace x by λx and y by λy. If λ cancels out completely, the right side depends only on the ratio y/x, and the equation is homogeneous. A term that does not scale the same way, such as a stand-alone sin x or a constant, spoils it.",
      definition:
        "- A function \\(F(x, y)\\) is **homogeneous of degree n** if \\(F(\\lambda x, \\lambda y) = \\lambda^n F(x, y)\\) for any nonzero constant \\(\\lambda\\).\n" +
        "- Examples from NCERT: \\(y^2 + 2xy\\) has degree 2, \\(2x - 3y\\) degree 1, \\(\\cos\\left(\\dfrac{y}{x}\\right)\\) degree 0; \\(\\sin x + \\cos y\\) is not homogeneous.\n" +
        "- \\(\\dfrac{dy}{dx} = F(x, y)\\) is a **homogeneous differential equation** if \\(F(x, y)\\) is homogeneous of degree **zero**. Then \\(F(x, y) = g\\left(\\dfrac{y}{x}\\right)\\).\n" +
        "- To show it: write \\(F(\\lambda x, \\lambda y) = \\lambda^0 F(x, y)\\), or divide the top and bottom by a power of x to get a function of \\(\\dfrac{y}{x}\\) alone.\n" +
        "- \\(\\log y - \\log x = \\log\\dfrac{y}{x}\\) is a function of \\(\\dfrac{y}{x}\\).\n" +
        "- In the form \\(M\\,dx + N\\,dy = 0\\): homogeneous when M and N are homogeneous functions of the same degree.",
      formula: {
        label: "Degree zero test",
        latex: "F(\\lambda x, \\lambda y) = \\lambda^0 F(x, y) = F(x, y)",
      },
      authoredExample: {
        prompt: "Show that \\(\\dfrac{dy}{dx} = \\dfrac{3x^2 + y^2}{xy}\\) is a homogeneous differential equation.",
        steps: [
          "Here \\(F(x, y) = \\dfrac{3x^2 + y^2}{xy}\\).",
          "Replacing x by \\(\\lambda x\\) and y by \\(\\lambda y\\): \\(F(\\lambda x, \\lambda y) = \\dfrac{3\\lambda^2x^2 + \\lambda^2y^2}{\\lambda x \\cdot \\lambda y} = \\dfrac{\\lambda^2(3x^2 + y^2)}{\\lambda^2 xy}\\).",
          "So \\(F(\\lambda x, \\lambda y) = \\lambda^0 F(x, y)\\): F is homogeneous of degree zero.",
          "Equivalently, dividing top and bottom by \\(x^2\\), \\(F = \\dfrac{3 + \\left(\\frac{y}{x}\\right)^2}{\\frac{y}{x}} = g\\left(\\dfrac{y}{x}\\right)\\).",
          "Hence the differential equation is homogeneous.",
        ],
        answer: "F is homogeneous of degree zero, so the equation is homogeneous",
      },
      selfCheckExample: {
        prompt: "Is \\(F(x, y) = x^2 + \\sin\\left(\\dfrac{y}{x}\\right)\\) a homogeneous function?",
        steps: [
          "\\(F(\\lambda x, \\lambda y) = \\lambda^2x^2 + \\sin\\left(\\dfrac{y}{x}\\right)\\).",
          "The first term scales by \\(\\lambda^2\\), the second by \\(\\lambda^0\\): no single power of \\(\\lambda\\) comes out.",
        ],
        answer: "No",
      },
      practiceSet: [
        { prompt: "Find the degree of the homogeneous function \\(x^3 + 2xy^2\\).", answer: "3" },
        { prompt: "Is \\((x + y + 1)\\,dy = (x - y)\\,dx\\) a homogeneous differential equation?", answer: "No: the constant 1 does not scale with \\(\\lambda\\)" },
        { prompt: "Is \\(\\dfrac{dy}{dx} = \\dfrac{x - y}{x + y}\\) homogeneous?", answer: "Yes: \\(F(\\lambda x, \\lambda y) = F(x, y)\\), degree zero" },
      ],
      pyqExampleId: "331366d5-7364-4104-8f56-1925bc5fcf2f",
      traps: [
        {
          title: "Homogeneous of degree 1 is not enough",
          body: "\\(\\dfrac{dy}{dx} = 3x + 2y\\) has a right side homogeneous of degree 1. The equation needs degree ZERO, so it is not a homogeneous differential equation.",
        },
        {
          title: "Missing a stand-alone function of x",
          body: "\\(\\tan x + \\dfrac{y}{x}\\) is not a function of \\(\\dfrac{y}{x}\\) alone: \\(\\tan(\\lambda x) \\neq \\tan x\\). Check every term, not just the one with \\(\\dfrac{y}{x}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-vx",
      name: "Solving with y = vx",
      intuition:
        "Since the right side is a function of y/x, give that ratio its own name, v. Then y = vx, and the product rule gives dy/dx = v + x dv/dx. The equation becomes one in v and x that separates.",
      definition:
        "- Put \\(y = vx\\); then \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\).\n" +
        "- Write the right side as \\(g(v)\\): divide the top and bottom by the highest power of x.\n" +
        "- \\(v + x\\dfrac{dv}{dx} = g(v)\\) gives \\(x\\dfrac{dv}{dx} = g(v) - v\\).\n" +
        "- Separate: \\(\\dfrac{dv}{g(v) - v} = \\dfrac{dx}{x}\\), and integrate both sides.\n" +
        "- Replace v by \\(\\dfrac{y}{x}\\) at the end and simplify; a \\(\\log|x|\\) often cancels.\n" +
        "- For a particular solution, use the condition after you have replaced v.",
      formula: {
        label: "The substitution",
        latex: "y = vx, \\qquad \\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(2xy\\,\\dfrac{dy}{dx} = x^2 + 3y^2\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{x^2 + 3y^2}{2xy}\\). The top and bottom are both of degree 2, so the equation is homogeneous.",
          "Put \\(y = vx\\), \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\). Then \\(v + x\\dfrac{dv}{dx} = \\dfrac{1 + 3v^2}{2v}\\).",
          "\\(x\\dfrac{dv}{dx} = \\dfrac{1 + 3v^2}{2v} - v = \\dfrac{1 + v^2}{2v}\\).",
          "Separating, \\(\\dfrac{2v}{1 + v^2}\\,dv = \\dfrac{dx}{x}\\).",
          "Integrating, \\(\\log(1 + v^2) = \\log|x| + \\log C\\), so \\(1 + v^2 = Cx\\).",
          "Replacing v: \\(1 + \\dfrac{y^2}{x^2} = Cx\\), that is \\(x^2 + y^2 = Cx^3\\).",
        ],
        answer: "\\(x^2 + y^2 = Cx^3\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x\\,dy = (x + 2y)\\,dx\\) by putting \\(y = vx\\).",
        steps: [
          "\\(v + x\\dfrac{dv}{dx} = 1 + 2v\\), so \\(x\\dfrac{dv}{dx} = 1 + v\\).",
          "\\(\\log|1 + v| = \\log|x| + \\log C\\), so \\(1 + v = Cx\\).",
        ],
        answer: "\\(x + y = Cx^2\\)",
      },
      practiceSet: [
        {
          prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + \\dfrac{y^2}{x^2}\\).",
          answer: "\\(x\\dfrac{dv}{dx} = v^2\\), so \\(-\\dfrac{x}{y} = \\log|x| + C\\)",
        },
        {
          prompt: "Solve \\(xy\\,\\dfrac{dy}{dx} = x^2 + 2y^2\\).",
          answer: "\\(x\\dfrac{dv}{dx} = \\dfrac{1 + v^2}{v}\\), giving \\(x^2 + y^2 = Cx^4\\)",
        },
        {
          prompt: "Solve \\(x\\dfrac{dy}{dx} = y + \\sqrt{x^2 - y^2}\\), \\(x > 0\\).",
          answer: "\\(x\\dfrac{dv}{dx} = \\sqrt{1 - v^2}\\), so \\(\\sin^{-1}\\left(\\dfrac{y}{x}\\right) = \\log x + C\\)",
        },
      ],
      pyqExampleId: "a0a35f09-ef98-44de-bc9c-38e054a68f4a",
      traps: [
        {
          title: "Writing dv/dx for dy/dx",
          body: "With \\(y = vx\\), \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\) by the product rule. Writing just \\(\\dfrac{dv}{dx}\\) loses the v that should cancel.",
        },
        {
          title: "Leaving the answer in v",
          body: "The question is in x and y. Replace v by \\(\\dfrac{y}{x}\\) and simplify; the last mark is for the answer in x and y.",
        },
        {
          title: "A sign slip in g(v) − v",
          body: "Subtract v from the WHOLE right side: \\(\\dfrac{v^2 - 1}{2v} - v = \\dfrac{-(1 + v^2)}{2v}\\). A slip here changes \\(x^2 + y^2\\) into \\(x^2 - y^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-vxtrig",
      name: "y/x inside a sine, cosine, exponential or logarithm",
      intuition:
        "Many board questions have the shape dy/dx = y/x + f(y/x). With y = vx the two v terms cancel at once, leaving x dv/dx = f(v), which separates straight away. The work is in the integral of 1/f(v) and in using the condition.",
      definition:
        "- Divide by x to get the form \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + f\\left(\\dfrac{y}{x}\\right)\\).\n" +
        "- With \\(y = vx\\): \\(v + x\\dfrac{dv}{dx} = v + f(v)\\), so \\(x\\dfrac{dv}{dx} = f(v)\\) and \\(\\dfrac{dv}{f(v)} = \\dfrac{dx}{x}\\).\n" +
        "- Integrals you will need: \\(\\displaystyle\\int \\sec^2 v\\,dv = \\tan v\\), \\(\\displaystyle\\int \\text{cosec}^2 v\\,dv = -\\cot v\\), \\(\\displaystyle\\int \\text{cosec}\\,v\\,dv = \\log|\\text{cosec}\\,v - \\cot v|\\), \\(\\displaystyle\\int \\cot v\\,dv = \\log|\\sin v|\\), \\(\\displaystyle\\int e^{-v}\\,dv = -e^{-v}\\).\n" +
        "- For \\(\\log y - \\log x\\), write \\(\\log v\\); \\(\\displaystyle\\int \\dfrac{dv}{v\\log v} = \\log|\\log v|\\).\n" +
        "- With a condition at \\(x = 1\\): \\(\\log 1 = 0\\), so C equals the value of the trigonometric or exponential term at the given y.",
      formula: {
        label: "When the v terms cancel",
        latex: "\\dfrac{dy}{dx} = \\dfrac{y}{x} + f\\left(\\dfrac{y}{x}\\right) \\;\\Rightarrow\\; \\int \\dfrac{dv}{f(v)} = \\log|x| + C",
      },
      authoredExample: {
        prompt:
          "Find the particular solution of \\(x\\dfrac{dy}{dx} = y - x\\tan\\left(\\dfrac{y}{x}\\right)\\), given that \\(y = \\dfrac{\\pi}{2}\\) when \\(x = 1\\).",
        steps: [
          "Dividing by x, \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} - \\tan\\left(\\dfrac{y}{x}\\right)\\): a function of \\(\\dfrac{y}{x}\\), so homogeneous.",
          "Put \\(y = vx\\): \\(v + x\\dfrac{dv}{dx} = v - \\tan v\\), so \\(x\\dfrac{dv}{dx} = -\\tan v\\).",
          "Separating, \\(\\cot v\\,dv = -\\dfrac{dx}{x}\\).",
          "Integrating, \\(\\log|\\sin v| = -\\log|x| + \\log C\\), so \\(x\\sin v = C\\), that is \\(x\\sin\\left(\\dfrac{y}{x}\\right) = C\\).",
          "At \\(x = 1\\), \\(y = \\dfrac{\\pi}{2}\\): \\(1 \\cdot \\sin\\dfrac{\\pi}{2} = C\\), so \\(C = 1\\).",
          "The particular solution is \\(x\\sin\\left(\\dfrac{y}{x}\\right) = 1\\).",
        ],
        answer: "\\(x\\sin\\left(\\dfrac{y}{x}\\right) = 1\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x\\dfrac{dy}{dx} = y + x\\,e^{-\\frac{y}{x}}\\).",
        steps: ["\\(x\\dfrac{dv}{dx} = e^{-v}\\), so \\(e^{v}\\,dv = \\dfrac{dx}{x}\\)."],
        answer: "\\(e^{\\frac{y}{x}} = \\log|x| + C\\)",
      },
      practiceSet: [
        {
          prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + \\tan\\left(\\dfrac{y}{x}\\right)\\).",
          answer: "\\(\\cot v\\,dv = \\dfrac{dx}{x}\\), so \\(\\sin\\left(\\dfrac{y}{x}\\right) = Cx\\)",
        },
        {
          prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + \\sin\\left(\\dfrac{y}{x}\\right)\\).",
          answer: "\\(\\text{cosec}\\,v\\,dv = \\dfrac{dx}{x}\\), so \\(\\tan\\left(\\dfrac{y}{2x}\\right) = Cx\\)",
        },
        {
          prompt: "Solve \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + \\cos^2\\left(\\dfrac{y}{x}\\right)\\), given \\(y = 0\\) when \\(x = 1\\).",
          answer: "\\(\\tan\\left(\\dfrac{y}{x}\\right) = \\log|x| + C\\) and \\(C = 0\\): \\(\\tan\\left(\\dfrac{y}{x}\\right) = \\log|x|\\)",
        },
      ],
      pyqExampleId: "258dc51b-d9b5-41eb-9671-e39e8a7a96f3",
      traps: [
        {
          title: "Integrating cosec v as −cot v",
          body: "\\(\\displaystyle\\int \\text{cosec}\\,v\\,dv = \\log|\\text{cosec}\\,v - \\cot v|\\). It is \\(\\text{cosec}^2 v\\) that integrates to \\(-\\cot v\\).",
        },
        {
          title: "A sign lost in the integral of sin v",
          body: "\\(\\displaystyle\\int (-\\sin v)\\,dv = \\cos v\\). Dropping the sign turns the answer into a different curve, and the condition then gives the wrong C.",
        },
        {
          title: "Using y instead of y/x in the condition",
          body: "At \\(x = 1\\) the ratio \\(\\dfrac{y}{x}\\) equals y, but at \\(x = 2\\) it is \\(\\dfrac{y}{2}\\). Always work out \\(\\dfrac{y}{x}\\) at the given point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-xvy",
      name: "The dx/dy form: put x = vy",
      intuition:
        "When the ratio that keeps appearing is x/y, as in e to the power x/y, or when dx carries the simpler coefficient, treat x as the dependent variable. The same method works with the roles of x and y swapped.",
      definition:
        "- If the equation is \\(\\dfrac{dx}{dy} = F(x, y) = h\\left(\\dfrac{x}{y}\\right)\\), with F homogeneous of degree zero, put \\(x = vy\\).\n" +
        "- Then \\(\\dfrac{dx}{dy} = v + y\\dfrac{dv}{dy}\\).\n" +
        "- \\(y\\dfrac{dv}{dy} = h(v) - v\\); separate in v and y, and integrate.\n" +
        "- Replace v by \\(\\dfrac{x}{y}\\) at the end.\n" +
        "- Signs that this is the better route: \\(\\dfrac{x}{y}\\) inside an exponential, or the equation already given as \\(\\dfrac{dx}{dy}\\).",
      formula: {
        label: "The x = vy substitution",
        latex: "x = vy, \\qquad \\dfrac{dx}{dy} = v + y\\dfrac{dv}{dy}",
      },
      authoredExample: {
        prompt: "Solve \\(y\\,dx = \\left(x + y\\,e^{\\frac{x}{y}}\\right)dy\\).",
        steps: [
          "\\(\\dfrac{dx}{dy} = \\dfrac{x}{y} + e^{\\frac{x}{y}}\\), a function of \\(\\dfrac{x}{y}\\), so put \\(x = vy\\).",
          "\\(v + y\\dfrac{dv}{dy} = v + e^{v}\\), so \\(y\\dfrac{dv}{dy} = e^{v}\\).",
          "Separating, \\(e^{-v}\\,dv = \\dfrac{dy}{y}\\).",
          "Integrating, \\(-e^{-v} = \\log|y| + C\\).",
          "Replacing v: \\(-e^{-\\frac{x}{y}} = \\log|y| + C\\), or \\(e^{-\\frac{x}{y}} + \\log|y| = K\\).",
        ],
        answer: "\\(e^{-\\frac{x}{y}} + \\log|y| = K\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dx}{dy} = \\dfrac{x}{y} + \\dfrac{y}{x}\\).",
        steps: ["With \\(x = vy\\): \\(y\\dfrac{dv}{dy} = \\dfrac{1}{v}\\), so \\(v\\,dv = \\dfrac{dy}{y}\\)."],
        answer: "\\(\\dfrac{x^2}{2y^2} = \\log|y| + C\\)",
      },
      practiceSet: [
        { prompt: "Which substitution solves \\(\\dfrac{dx}{dy} = \\dfrac{x^2 + y^2}{xy}\\)?", answer: "\\(x = vy\\)" },
        { prompt: "Solve \\(\\dfrac{dx}{dy} = \\dfrac{x + y}{y}\\).", answer: "\\(y\\dfrac{dv}{dy} = 1\\), so \\(x = y\\log|y| + Cy\\)" },
        {
          prompt: "Solve \\(\\dfrac{dx}{dy} = \\dfrac{x}{y} + \\tan\\left(\\dfrac{x}{y}\\right)\\).",
          answer: "\\(\\cot v\\,dv = \\dfrac{dy}{y}\\), so \\(\\sin\\left(\\dfrac{x}{y}\\right) = Cy\\)",
        },
      ],
      pyqExampleId: "901ff5ae-5165-472d-a8c8-3c2c592e0d77",
      traps: [
        {
          title: "Using y = vx on a dx/dy equation",
          body: "For \\(\\dfrac{dx}{dy} = h\\left(\\dfrac{x}{y}\\right)\\), \\(y = vx\\) leaves the variables mixed. Put \\(x = vy\\) so that y stays the independent variable.",
        },
        {
          title: "Writing dx/dy = v + x dv/dx",
          body: "With \\(x = vy\\), differentiate with respect to y: \\(\\dfrac{dx}{dy} = v + y\\dfrac{dv}{dy}\\).",
        },
      ],
    },
  ],
};
