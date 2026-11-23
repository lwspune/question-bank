import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DE_SOLUTION_NOTE: SubtopicNote = {
  subtopicName: "Solution of a Differential Equation",
  title: "Solving a Differential Equation",
  oneLineDefinition:
    "General and particular solutions, checking that a function is a solution, and the three methods of the chapter: separating the variables, the substitution y = vx for homogeneous equations, and the integrating factor for linear equations.",
  whyItMatters:
    "116 questions, the largest page of the chapter, twenty-five of them from board papers. In all but one of its years here the board asks for an equation to be solved: by separating the variables twelve times (2016 to 2026, with a substitution in 2016, 2022 and 2024 and a particular solution in 2016, 2018, 2023 and 2024), as a homogeneous equation five times (2015, 2024, 2025 and twice in 2026), and as a linear equation or its integrating factor seven times (2019 to 2025). In 2015 it also asked to show that y = e^(ax) satisfies x dy/dx = y log y. The textbook rows are section 6.4 with its solved examples, Exercises 6.3, 6.4 and 6.5, and Questions 2, 5, 6 and 7 and eight MCQs of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmde-verify",
      name: "General and particular solutions, and verifying a solution",
      intuition:
        "A solution of a differential equation is a relation between x and y that makes the equation true for every x. The general solution carries as many arbitrary constants as the order and describes every solution; a particular solution is one member, got by giving the constants values. To verify, you differentiate and substitute: you never need to solve.",
      definition:
        "- A **solution** of a differential equation is a relation which satisfies it.\n" +
        "- The **general solution** has as many arbitrary constants as the order of the equation.\n" +
        "- A **particular solution** is obtained from the general solution by giving particular values to the arbitrary constants.\n" +
        "- **To verify** that a function is a solution: differentiate it as many times as the order, substitute in the left side, simplify, and show it equals the right side.\n" +
        "- If the given relation has a constant, use the relation itself to replace it (or show that it cancels).",
      formula: {
        label: "Verifying a solution",
        latex: "\\text{L.H.S. with } y, \\; \\dfrac{dy}{dx}, \\; \\dfrac{d^2y}{dx^2} \\text{ substituted} \\; = \\; \\text{R.H.S.}",
      },
      authoredExample: {
        prompt: "Verify that \\(y = e^{-3x}\\) is a solution of the differential equation \\(\\dfrac{d^2y}{dx^2} + \\dfrac{dy}{dx} - 6y = 0\\).",
        steps: [
          "Given \\(y = e^{-3x}\\) ... (1)",
          "Differentiate with respect to \\(x\\): \\(\\dfrac{dy}{dx} = -3e^{-3x}\\).",
          "Differentiate again: \\(\\dfrac{d^2y}{dx^2} = 9e^{-3x}\\).",
          "L.H.S. \\(= 9e^{-3x} + (-3e^{-3x}) - 6e^{-3x}\\)",
          "\\(= (9 - 3 - 6)e^{-3x} = 0 =\\) R.H.S.",
          "Hence \\(y = e^{-3x}\\) is a solution of the given differential equation.",
        ],
        answer: "L.H.S. = 0 = R.H.S., so \\(y = e^{-3x}\\) is a solution",
      },
      selfCheckExample: {
        prompt: "Verify that \\(y = \\sin 2x\\) is a solution of \\(\\dfrac{d^2y}{dx^2} + 4y = 0\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = 2\\cos 2x\\), \\(\\dfrac{d^2y}{dx^2} = -4\\sin 2x\\).",
          "L.H.S. \\(= -4\\sin 2x + 4\\sin 2x = 0 =\\) R.H.S.",
        ],
        answer: "It is a solution",
      },
      practiceSet: [
        { prompt: "Is \\(y = x^2\\) a solution of \\(x\\dfrac{dy}{dx} = 2y\\)?", answer: "Yes: \\(x(2x) = 2x^2 = 2y\\)" },
        { prompt: "How many arbitrary constants does the general solution of a second order differential equation contain?", answer: "Two" },
        {
          prompt: "\\(y = A\\cos x + B\\sin x\\) is the general solution of \\(\\dfrac{d^2y}{dx^2} + y = 0\\). Is \\(y = 3\\cos x\\) a general or a particular solution?",
          answer: "A particular solution (\\(A = 3\\), \\(B = 0\\))",
        },
      ],
      pyqExampleId: "14467bb0-9e8e-42a5-8026-f93c88a9a814",
      traps: [
        {
          title: "Stopping before the right side",
          body: "Simplify the left side all the way and end with 'L.H.S. = R.H.S., hence ... is a solution'. A page of derivatives without that last line loses the final mark.",
        },
        {
          title: "Calling a solution with too few constants general",
          body: "The general solution of a first order equation has one arbitrary constant, of a second order equation two. A solution with fewer is a particular solution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-separable",
      name: "Variables separable, and equations reduced to it",
      intuition:
        "If every y can be taken to the side of dy and every x to the side of dx, the two sides can be integrated one by one. One arbitrary constant is added. When x and y appear together, as in cos(x + y), a substitution u = x + y often turns the equation into a separable one.",
      definition:
        "- If the equation can be written as \\(f(x)\\,dx = g(y)\\,dy\\), integrate both sides: \\(\\int f(x)\\,dx = \\int g(y)\\,dy + c\\). This is the method of separation of variables.\n" +
        "- Add one constant only. With logarithms on both sides, write it as \\(\\log c\\).\n" +
        "- **Particular solution:** find the general solution first, then put the given values of \\(x\\) and \\(y\\) to find \\(c\\), and write the solution again with that value of \\(c\\).\n" +
        "- **Reducible form:** for \\(\\dfrac{dy}{dx} = f(ax + by + c)\\), put \\(u = ax + by + c\\), so \\(\\dfrac{du}{dx} = a + b\\dfrac{dy}{dx}\\). The equation becomes separable in \\(u\\) and \\(x\\).",
      formula: {
        label: "Separating the variables",
        latex: "f(x)\\,dx = g(y)\\,dy \\;\\Rightarrow\\; \\int f(x)\\,dx = \\int g(y)\\,dy + c",
      },
      authoredExample: {
        prompt: "Find the particular solution of \\(\\dfrac{dy}{dx} = x\\left(1 + y^2\\right)\\), given \\(y = 1\\) when \\(x = 0\\).",
        steps: [
          "Separate the variables: \\(\\dfrac{dy}{1 + y^2} = x\\,dx\\).",
          "Integrate both sides: \\(\\int \\dfrac{dy}{1 + y^2} = \\int x\\,dx\\).",
          "\\(\\tan^{-1} y = \\dfrac{x^2}{2} + c\\) ... (I), the general solution.",
          "Put \\(x = 0\\), \\(y = 1\\) in (I): \\(\\tan^{-1} 1 = 0 + c\\), so \\(c = \\dfrac{\\pi}{4}\\).",
          "Put \\(c = \\dfrac{\\pi}{4}\\) in (I).",
        ],
        answer: "\\(\\tan^{-1} y = \\dfrac{x^2}{2} + \\dfrac{\\pi}{4}\\) is the required particular solution",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = e^{x - y}\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{e^x}{e^y}\\), so \\(e^y\\,dy = e^x\\,dx\\).",
          "Integrate: \\(e^y = e^x + c\\).",
        ],
        answer: "\\(e^y = e^x + c\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(\\dfrac{dy}{dx} = 3x^2y\\).", answer: "\\(\\log|y| = x^3 + c\\)" },
        { prompt: "Solve \\(y\\dfrac{dy}{dx} = x\\).", answer: "\\(y^2 - x^2 = c\\)" },
        { prompt: "Which substitution reduces \\(\\dfrac{dy}{dx} = \\sin(x + y)\\) to the variable separable form?", answer: "\\(u = x + y\\), with \\(\\dfrac{du}{dx} = 1 + \\dfrac{dy}{dx}\\)" },
      ],
      pyqExampleId: "de10f8d6-1466-40f3-bfdd-7e586cdd6ec6",
      traps: [
        {
          title: "Two constants, one on each side",
          body: "After integrating both sides, add a single constant \\(c\\). Writing \\(c_1\\) on the left and \\(c_2\\) on the right is not wrong, but you must combine them into one before using a condition.",
        },
        {
          title: "Using the condition too early",
          body: "Put the given values of \\(x\\) and \\(y\\) only after integrating, to find \\(c\\). Then write the final relation with the value of \\(c\\) in it: that line is the particular solution.",
        },
        {
          title: "Forgetting the 1 in du/dx",
          body: "With \\(u = x + y\\), \\(\\dfrac{du}{dx} = 1 + \\dfrac{dy}{dx}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{du}{dx} - 1\\). Writing \\(\\dfrac{dy}{dx} = \\dfrac{du}{dx}\\) gives a wrong equation in \\(u\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-homogeneous",
      name: "Homogeneous differential equations: put y = vx",
      intuition:
        "In a homogeneous equation every term has the same degree, so dy/dx depends only on the ratio y/x. Putting y = vx turns that ratio into v, the powers of x cancel, and the equation becomes separable in v and x. Put v = y/x back at the end.",
      definition:
        "- The degree of a term is the sum of the degrees of its variables (\\(x^2y\\) has degree 3). If all the terms have the same degree, the equation is a **homogeneous differential equation**.\n" +
        "- Put \\(y = vx\\); then \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\) (product rule).\n" +
        "- Cancel the powers of \\(x\\), separate \\(v\\) and \\(x\\), and integrate.\n" +
        "- Replace \\(v\\) by \\(\\dfrac{y}{x}\\) in the answer.\n" +
        "- When \\(\\dfrac{x}{y}\\) appears (as in \\(e^{x/y}\\)), put \\(x = vy\\) and \\(\\dfrac{dx}{dy} = v + y\\dfrac{dv}{dy}\\) instead.",
      formula: {
        label: "Substitution for a homogeneous equation",
        latex: "y = vx, \\qquad \\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}",
      },
      authoredExample: {
        prompt: "Solve \\(2xy\\dfrac{dy}{dx} = x^2 + 3y^2\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{x^2 + 3y^2}{2xy}\\) ... (I). Every term is of degree 2, so (I) is homogeneous.",
          "Put \\(y = vx\\), so \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\).",
          "(I) becomes \\(v + x\\dfrac{dv}{dx} = \\dfrac{x^2 + 3v^2x^2}{2x \\cdot vx} = \\dfrac{1 + 3v^2}{2v}\\).",
          "\\(x\\dfrac{dv}{dx} = \\dfrac{1 + 3v^2}{2v} - v = \\dfrac{1 + v^2}{2v}\\).",
          "Separate: \\(\\dfrac{2v}{1 + v^2}\\,dv = \\dfrac{dx}{x}\\).",
          "Integrate: \\(\\log\\left(1 + v^2\\right) = \\log x + \\log c = \\log(cx)\\), so \\(1 + v^2 = cx\\).",
          "Put \\(v = \\dfrac{y}{x}\\): \\(\\dfrac{x^2 + y^2}{x^2} = cx\\).",
        ],
        answer: "\\(x^2 + y^2 = cx^3\\) is the general solution",
      },
      selfCheckExample: {
        prompt: "Solve \\(x\\dfrac{dy}{dx} = y + x\\).",
        steps: [
          "Put \\(y = vx\\): \\(x\\left(v + x\\dfrac{dv}{dx}\\right) = vx + x\\), so \\(x\\dfrac{dv}{dx} = 1\\).",
          "\\(dv = \\dfrac{dx}{x}\\), so \\(v = \\log|x| + c\\).",
        ],
        answer: "\\(y = x\\log|x| + cx\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(\\dfrac{dy}{dx} = \\dfrac{x^2 + y^2}{x + y}\\) a homogeneous differential equation?",
          answer: "No, the numerator has degree 2 and the denominator degree 1",
        },
        {
          prompt: "Put \\(y = vx\\) in \\(\\dfrac{dy}{dx} = \\dfrac{y}{x} + \\dfrac{x}{y}\\) and write the equation in \\(v\\) and \\(x\\).",
          answer: "\\(x\\dfrac{dv}{dx} = \\dfrac{1}{v}\\)",
        },
        { prompt: "Which substitution is used for a homogeneous equation containing \\(e^{x/y}\\)?", answer: "\\(x = vy\\), with \\(\\dfrac{dx}{dy} = v + y\\dfrac{dv}{dy}\\)" },
      ],
      pyqExampleId: "58d80972-a85e-44a4-8bd4-c894db755c6d",
      traps: [
        {
          title: "Writing dy/dx = x dv/dx",
          body: "\\(y = vx\\) is a product, so \\(\\dfrac{dy}{dx} = v + x\\dfrac{dv}{dx}\\). Dropping the \\(v\\) gives an equation that does not separate properly.",
        },
        {
          title: "Leaving the answer in v",
          body: "The question is in \\(x\\) and \\(y\\), so the answer must be too. Replace \\(v\\) by \\(\\dfrac{y}{x}\\) and simplify in the last line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-linear",
      name: "Linear differential equations: the integrating factor",
      intuition:
        "An equation of the form \\(\\dfrac{dy}{dx} + Py = Q\\), with \\(P\\) and \\(Q\\) functions of \\(x\\), usually cannot be separated. Multiplying it by the integrating factor \\(e^{\\int P\\,dx}\\) turns the left side into the derivative of \\(y\\) times that factor, so one integration finishes the job.",
      definition:
        "- **Standard form:** \\(\\dfrac{dy}{dx} + Py = Q\\), where \\(P\\) and \\(Q\\) are functions of \\(x\\) (or constants). Divide first if \\(\\dfrac{dy}{dx}\\) has a coefficient.\n" +
        "- **Why it works:** multiply by \\(e^{\\int P\\,dx}\\).\n" +
        "- Note that \\(\\dfrac{d}{dx}\\left(y\\,e^{\\int P\\,dx}\\right) = e^{\\int P\\,dx}\\left(\\dfrac{dy}{dx} + Py\\right)\\).\n" +
        "- So \\(\\dfrac{d}{dx}\\left(y\\,e^{\\int P\\,dx}\\right) = Q\\,e^{\\int P\\,dx}\\).\n" +
        "- Integrate: \\(y\\,e^{\\int P\\,dx} = \\int Q\\,e^{\\int P\\,dx}\\,dx + c\\). Here \\(e^{\\int P\\,dx}\\) is the integrating factor (I.F.).\n" +
        "- For \\(\\dfrac{dx}{dy} + Px = Q\\) (\\(P\\), \\(Q\\) functions of \\(y\\)): I.F. \\(= e^{\\int P\\,dy}\\) and \\(x\\,(\\text{I.F.}) = \\int Q\\,(\\text{I.F.})\\,dy + c\\).\n" +
        "- Simplify the I.F.: \\(e^{\\log f(x)} = f(x)\\), and \\(e^{k\\log x} = x^k\\).",
      formula: {
        label: "Solution of a linear equation",
        latex: "\\dfrac{dy}{dx} + Py = Q: \\quad \\text{I.F.} = e^{\\int P\\,dx}, \\qquad y\\,(\\text{I.F.}) = \\int Q\\,(\\text{I.F.})\\,dx + c",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} - 2y = e^{3x}\\).",
        steps: [
          "This is linear, \\(\\dfrac{dy}{dx} + Py = Q\\), with \\(P = -2\\) and \\(Q = e^{3x}\\).",
          "I.F. \\(= e^{\\int -2\\,dx} = e^{-2x}\\).",
          "The solution is \\(y\\,(\\text{I.F.}) = \\int Q\\,(\\text{I.F.})\\,dx + c\\).",
          "\\(y\\,e^{-2x} = \\int e^{3x}e^{-2x}\\,dx + c = \\int e^{x}\\,dx + c = e^{x} + c\\).",
          "Multiply by \\(e^{2x}\\): \\(y = e^{3x} + c\\,e^{2x}\\).",
        ],
        answer: "\\(y = e^{3x} + c\\,e^{2x}\\) is the general solution",
      },
      selfCheckExample: {
        prompt: "Find the integrating factor of \\(x\\dfrac{dy}{dx} - 3y = x^4\\).",
        steps: [
          "Divide by \\(x\\): \\(\\dfrac{dy}{dx} - \\dfrac{3}{x}y = x^3\\), so \\(P = -\\dfrac{3}{x}\\).",
          "I.F. \\(= e^{\\int -\\frac{3}{x}\\,dx} = e^{-3\\log x} = x^{-3}\\).",
        ],
        answer: "I.F. \\(= \\dfrac{1}{x^3}\\)",
      },
      practiceSet: [
        { prompt: "Write the integrating factor of \\(\\dfrac{dy}{dx} + y\\cot x = 1\\).", answer: "\\(e^{\\log\\sin x} = \\sin x\\)" },
        { prompt: "Solve \\(\\dfrac{dy}{dx} + y = 2\\).", answer: "\\(y\\,e^{x} = 2e^{x} + c\\), i.e. \\(y = 2 + c\\,e^{-x}\\)" },
        { prompt: "Solve \\(\\dfrac{dx}{dy} + \\dfrac{x}{y} = y^2\\).", answer: "I.F. \\(= y\\), and \\(xy = \\dfrac{y^4}{4} + c\\)" },
      ],
      pyqExampleId: "086e68bc-2f5d-4b15-bc53-e1f6c3839a26",
      traps: [
        {
          title: "Reading P before dividing",
          body: "\\(P\\) is the coefficient of \\(y\\) only after the coefficient of \\(\\dfrac{dy}{dx}\\) is made 1. In \\(x\\dfrac{dy}{dx} + 2y = Q\\), \\(P\\) is \\(\\dfrac{2}{x}\\), not 2.",
        },
        {
          title: "Dropping the constant before dividing",
          body: "Write \\(+\\,c\\) in the line \\(y\\,(\\text{I.F.}) = \\int Q\\,(\\text{I.F.})\\,dx + c\\). When you then divide by the I.F., \\(c\\) is divided too: \\(c\\,e^{2x}\\), not \\(c\\).",
        },
        {
          title: "Leaving the I.F. as e to a log",
          body: "Simplify \\(e^{\\log\\sec x}\\) to \\(\\sec x\\) and \\(e^{2\\log x}\\) to \\(x^2\\) before multiplying. The unsimplified form makes the integral look impossible.",
        },
      ],
    },
  ],
};
