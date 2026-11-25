import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DE_SEPARABLE_NOTE: SubtopicNote = {
  subtopicName: "Variables Separable",
  title: "Variables Separable",
  oneLineDefinition:
    "Equations in which the slope is a function of x times a function of y: separate the variables, integrate both sides, add one constant, and use a given condition to find a particular solution.",
  whyItMatters:
    "68 questions, thirty-one of them from board papers in every year from 2022 to 2026; twelve of the thirty-one are one-mark MCQs. The board asks for general solutions of equations that separate (every year), equations written with an exponential or a logarithm such as log(dy/dx) = 3x + 4y or dy/dx = e to the power x + y (2022 and 2024 to 2026, once in 2026 as assertion-reason), particular solutions from a condition such as y(π/4) = 2 (every year), and case studies on growing bacteria (2024) and a cooling laptop processor (2025). The textbook adds Exercise 9.3, Examples 4 to 9, Miscellaneous Example 20 and several Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmde-direct",
      name: "When the slope is a function of x alone",
      intuition:
        "If dy/dx depends on x only, there is nothing to separate: the solution is just the integral of the right side, plus one constant. The work is in simplifying the right side so that it can be integrated.",
      definition:
        "- \\(\\dfrac{dy}{dx} = g(x)\\) gives \\(dy = g(x)\\,dx\\), so \\(y = \\displaystyle\\int g(x)\\,dx + C\\).\n" +
        "- **Simplify first:** cancel a common factor, divide out a fraction, or use an identity such as \\(\\dfrac{1 - \\cos x}{1 + \\cos x} = \\tan^2\\dfrac{x}{2} = \\sec^2\\dfrac{x}{2} - 1\\).\n" +
        "- **dy and dx mixed:** rearrange first. \\(x\\,dy = (2x^2 + 1)\\,dx\\) gives \\(dy = \\left(2x + \\dfrac{1}{x}\\right)dx\\).\n" +
        "- **The derivative inside a function:** undo the function. \\(e^{\\frac{dy}{dx}} = g(x)\\) gives \\(\\dfrac{dy}{dx} = \\log g(x)\\); \\(\\cos\\left(\\dfrac{dy}{dx}\\right) = a\\) gives \\(\\dfrac{dy}{dx} = \\cos^{-1}a\\).\n" +
        "- Add exactly one arbitrary constant, on one side.",
      formula: {
        label: "Direct integration",
        latex: "\\dfrac{dy}{dx} = g(x) \\;\\Rightarrow\\; y = \\int g(x)\\,dx + C",
      },
      authoredExample: {
        prompt: "Find the general solution of \\((x^2 + 4)\\dfrac{dy}{dx} = x^3\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{x^3}{x^2 + 4}\\).",
          "Dividing, \\(x^3 = x(x^2 + 4) - 4x\\), so \\(\\dfrac{x^3}{x^2 + 4} = x - \\dfrac{4x}{x^2 + 4}\\).",
          "So \\(dy = \\left(x - \\dfrac{4x}{x^2 + 4}\\right)dx\\).",
          "Integrating, \\(y = \\dfrac{x^2}{2} - 2\\displaystyle\\int \\dfrac{2x}{x^2 + 4}\\,dx = \\dfrac{x^2}{2} - 2\\log(x^2 + 4) + C\\).",
          "(\\(x^2 + 4 > 0\\), so no modulus is needed.)",
        ],
        answer: "\\(y = \\dfrac{x^2}{2} - 2\\log(x^2 + 4) + C\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = x\\cos x\\).",
        steps: ["Integrate by parts, taking x as the first function: \\(\\displaystyle\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx\\)."],
        answer: "\\(y = x\\sin x + \\cos x + C\\)",
      },
      practiceSet: [
        {
          prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = \\dfrac{1}{x^2 - 1}\\).",
          answer: "\\(y = \\dfrac{1}{2}\\log\\left|\\dfrac{x - 1}{x + 1}\\right| + C\\)",
        },
        {
          prompt: "Find the general solution of \\(e^{\\frac{dy}{dx}} = x + 1\\).",
          answer: "\\(\\dfrac{dy}{dx} = \\log(x + 1)\\), so \\(y = (x + 1)\\log(x + 1) - x + C\\)",
        },
        {
          prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = \\sin^2 x\\).",
          answer: "\\(y = \\dfrac{x}{2} - \\dfrac{\\sin 2x}{4} + C\\)",
        },
      ],
      pyqExampleId: "e36831df-8ec6-4509-855e-624952d6e634",
      traps: [
        {
          title: "No arbitrary constant",
          body: "A general solution must carry its constant. \\(y = x\\sin x + \\cos x\\) without the \\(+\\,C\\) is one particular solution, not the general one.",
        },
        {
          title: "Integrating before simplifying",
          body: "A fraction such as \\(\\dfrac{x^3}{x^2 + 4}\\) cannot be integrated as it stands. Divide first, or cancel the common factor, then integrate term by term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-separate",
      name: "Separating a product g(x) h(y)",
      intuition:
        "When the slope is a function of x multiplied by a function of y, move everything with y to the dy side and everything with x to the dx side. Then each side can be integrated on its own.",
      definition:
        "- If \\(\\dfrac{dy}{dx} = g(x)\\,h(y)\\) with \\(h(y) \\neq 0\\), separate: \\(\\dfrac{dy}{h(y)} = g(x)\\,dx\\).\n" +
        "- Integrate both sides: \\(H(y) = G(x) + C\\), where H and G are antiderivatives of \\(\\dfrac{1}{h(y)}\\) and \\(g(x)\\).\n" +
        "- For an equation in the form \\(M\\,dx + N\\,dy = 0\\), divide through by the product of the factors that are on the 'wrong' side, for example by \\(\\tan x\\tan y\\).\n" +
        "- A term \\(\\dfrac{f'(x)}{f(x)}\\) integrates to \\(\\log|f(x)|\\). When both sides give logarithms, write the constant as \\(\\log C\\) and combine: \\(\\log|x| + \\log|y| = \\log C\\) gives \\(xy = C\\).\n" +
        "- An improper fraction such as \\(\\dfrac{y}{y + 3}\\) is split first: \\(1 - \\dfrac{3}{y + 3}\\).",
      formula: {
        label: "Separating the variables",
        latex: "\\dfrac{dy}{dx} = g(x)\\,h(y) \\;\\Rightarrow\\; \\int \\dfrac{dy}{h(y)} = \\int g(x)\\,dx + C",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(x(1 + y^2)\\,dx + y(1 + x^2)\\,dy = 0\\).",
        steps: [
          "Divide throughout by \\((1 + x^2)(1 + y^2)\\): \\(\\dfrac{x}{1 + x^2}\\,dx + \\dfrac{y}{1 + y^2}\\,dy = 0\\).",
          "Multiply by 2: \\(\\dfrac{2x}{1 + x^2}\\,dx + \\dfrac{2y}{1 + y^2}\\,dy = 0\\). Each numerator is the derivative of its denominator.",
          "Integrating, \\(\\log(1 + x^2) + \\log(1 + y^2) = \\log C\\).",
          "Combining, \\(\\log\\left[(1 + x^2)(1 + y^2)\\right] = \\log C\\).",
          "Hence \\((1 + x^2)(1 + y^2) = C\\).",
        ],
        answer: "\\((1 + x^2)(1 + y^2) = C\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = (1 + y^2)e^{x}\\).",
        steps: ["Separate: \\(\\dfrac{dy}{1 + y^2} = e^{x}\\,dx\\)."],
        answer: "\\(\\tan^{-1}y = e^{x} + C\\)",
      },
      practiceSet: [
        { prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = \\dfrac{x^2}{y}\\).", answer: "\\(\\dfrac{y^2}{2} = \\dfrac{x^3}{3} + C\\)" },
        { prompt: "Find the general solution of \\(\\cos y\\,\\dfrac{dy}{dx} = x\\).", answer: "\\(\\sin y = \\dfrac{x^2}{2} + C\\)" },
        { prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = \\dfrac{3y}{x}\\).", answer: "\\(\\log|y| = 3\\log|x| + \\log C\\), so \\(y = Cx^3\\)" },
      ],
      pyqExampleId: "85d0cc5c-f9f6-467f-8f41-118fd05409fb",
      traps: [
        {
          title: "Leaving x on the dy side",
          body: "Every factor with y must go with dy and every factor with x with dx. A term like \\(\\dfrac{1 + x^2}{y}\\,dy\\) cannot be integrated with respect to y.",
        },
        {
          title: "Combining logs wrongly",
          body: "\\(\\log|x| + \\log|y| = \\log C\\) gives \\(xy = C\\), not \\(x + y = C\\). And \\(\\log|y| - \\log|x| = \\log C\\) gives \\(y = Cx\\).",
        },
        {
          title: "Dropping a minus sign when you move a term across",
          body: "From \\(x^2\\,dy + y^2\\,dx = 0\\) you get \\(\\dfrac{dy}{y^2} = -\\dfrac{dx}{x^2}\\). Losing the minus changes which option matches.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-exponential",
      name: "Exponentials and logarithms of the slope",
      intuition:
        "An equation like log(dy/dx) = ax + by, or dy/dx = e to the power x + y, looks hard, but taking the exponential and splitting the power turns it into a product of a function of x and a function of y. Then it separates.",
      definition:
        "- \\(\\log\\left(\\dfrac{dy}{dx}\\right) = ax + by\\) means \\(\\dfrac{dy}{dx} = e^{ax + by} = e^{ax}e^{by}\\).\n" +
        "- Separate: \\(e^{-by}\\,dy = e^{ax}\\,dx\\). Integrate: \\(-\\dfrac{e^{-by}}{b} = \\dfrac{e^{ax}}{a} + C\\).\n" +
        "- \\(e^{x - y} = \\dfrac{e^{x}}{e^{y}}\\), so \\(\\dfrac{dy}{dx} = e^{x - y}\\) separates as \\(e^{y}\\,dy = e^{x}\\,dx\\).\n" +
        "- Clear fractions by multiplying through by the LCM and rename the constant, to match the form of an MCQ option.\n" +
        "- \\(e^{x}\\) and \\(e^{-y}\\) are always positive, so a sum such as \\(e^{x} + e^{-y}\\) can never equal zero or a negative number.\n" +
        "- **Assertion-reason (Mathematics, 2023 to 2026):** (A) both A and R are true and R explains A; (B) both true but R does not explain A; (C) A is true and R is false; (D) **A is false and R is true**. Decide A and R separately before you choose.",
      formula: {
        label: "Splitting an exponential",
        latex: "e^{ax + by} = e^{ax}\\,e^{by}",
      },
      authoredExample: {
        prompt: "Find the general solution of \\(\\log\\left(\\dfrac{dy}{dx}\\right) = 2x + 5y\\).",
        steps: [
          "Taking exponentials, \\(\\dfrac{dy}{dx} = e^{2x + 5y} = e^{2x}e^{5y}\\).",
          "Separating, \\(e^{-5y}\\,dy = e^{2x}\\,dx\\).",
          "Integrating, \\(-\\dfrac{e^{-5y}}{5} = \\dfrac{e^{2x}}{2} + C\\).",
          "Multiplying by \\(-10\\): \\(2e^{-5y} = -5e^{2x} - 10C\\).",
          "So \\(5e^{2x} + 2e^{-5y} = K\\), where \\(K = -10C\\).",
        ],
        answer: "\\(5e^{2x} + 2e^{-5y} = K\\)",
      },
      selfCheckExample: {
        prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = e^{2x - y}\\).",
        steps: ["Separate: \\(e^{y}\\,dy = e^{2x}\\,dx\\), then integrate."],
        answer: "\\(e^{y} = \\dfrac{e^{2x}}{2} + C\\), or \\(2e^{y} = e^{2x} + K\\)",
      },
      practiceSet: [
        { prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = e^{y}\\cos x\\).", answer: "\\(-e^{-y} = \\sin x + C\\)" },
        { prompt: "Find the general solution of \\(\\dfrac{dy}{dx} = x\\,e^{-y}\\).", answer: "\\(e^{y} = \\dfrac{x^2}{2} + C\\)" },
        {
          prompt:
            "Assertion (A): the general solution of \\(\\dfrac{dy}{dx} = e^{x}e^{y}\\) contains one arbitrary constant. Reason (R): the equation is of the first order. Choose the code.",
          answer: "(A): both are true and R explains A",
        },
      ],
      pyqExampleId: "e7092772-6a56-46e6-8032-9a36ec4775e5",
      traps: [
        {
          title: "Writing the exponential of a sum as a sum",
          body: "\\(e^{x + y} = e^{x}e^{y}\\), not \\(e^{x} + e^{y}\\). Only the product form separates.",
        },
        {
          title: "Integrating e to the power −5y without the divisor",
          body: "\\(\\displaystyle\\int e^{-5y}\\,dy = -\\dfrac{e^{-5y}}{5}\\). Forgetting the \\(-\\dfrac{1}{5}\\) gives an option that looks right but has the wrong coefficients.",
        },
        {
          title: "Using the Physics meaning of code (D)",
          body: "In the Mathematics paper, code (D) means the Assertion is false and the Reason is true. It does not mean that both are false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-particular",
      name: "A particular solution, and the curve through a point",
      intuition:
        "Solve the equation in general first. Then the given condition, a value of y at some x or a point the curve passes through, picks out one value of the constant. Put it back and you have the particular solution.",
      definition:
        "- **Step 1:** find the general solution, with its constant C.\n" +
        "- **Step 2:** put in the condition, \\(y = y_0\\) when \\(x = x_0\\) (written \\(y(x_0) = y_0\\)), and solve for C.\n" +
        "- **Step 3:** write the particular solution with that value of C; simplify it if you can.\n" +
        "- 'The slope of the tangent at \\((x, y)\\) is ...' means \\(\\dfrac{dy}{dx} = \\ldots\\); 'the curve passes through \\((x_0, y_0)\\)' is the condition.\n" +
        "- Values to have ready: \\(\\log 1 = 0\\), \\(e^{0} = 1\\), \\(\\sin\\dfrac{\\pi}{2} = 1\\), \\(\\sec 0 = 1\\), \\(\\tan\\dfrac{\\pi}{4} = 1\\).\n" +
        "- NCERT also uses a substitution when it gives a hint, such as \\(x - y = t\\) (Miscellaneous Question 9): the new equation then separates in x and t.",
      formula: {
        label: "Fixing the constant",
        latex: "H(y_0) = G(x_0) + C \\;\\Rightarrow\\; C = H(y_0) - G(x_0)",
      },
      authoredExample: {
        prompt: "Find the particular solution of \\((1 + x^2)\\dfrac{dy}{dx} = 2xy\\), given that \\(y = 4\\) when \\(x = 1\\).",
        steps: [
          "Separating, \\(\\dfrac{dy}{y} = \\dfrac{2x}{1 + x^2}\\,dx\\).",
          "Integrating, \\(\\log|y| = \\log(1 + x^2) + \\log C\\).",
          "So the general solution is \\(y = C(1 + x^2)\\).",
          "At \\(x = 1\\), \\(y = 4\\): \\(4 = C(1 + 1) = 2C\\), so \\(C = 2\\).",
          "The particular solution is \\(y = 2(1 + x^2)\\).",
        ],
        answer: "\\(y = 2(1 + x^2)\\)",
      },
      selfCheckExample: {
        prompt: "Find the equation of the curve through \\((0, 2)\\) whose slope at any point \\((x, y)\\) is \\(3x^2y\\).",
        steps: [
          "\\(\\dfrac{dy}{y} = 3x^2\\,dx\\), so \\(\\log|y| = x^3 + c\\), that is \\(y = Ce^{x^3}\\).",
          "At \\((0, 2)\\): \\(2 = C\\).",
        ],
        answer: "\\(y = 2e^{x^3}\\)",
      },
      practiceSet: [
        { prompt: "Find the particular solution of \\(\\dfrac{dy}{dx} = 2y\\), given \\(y(0) = 3\\).", answer: "\\(y = 3e^{2x}\\)" },
        {
          prompt: "Find the particular solution of \\(y\\dfrac{dy}{dx} = \\sin x\\), given \\(y(0) = 2\\).",
          answer: "\\(\\dfrac{y^2}{2} = -\\cos x + 3\\), that is \\(y^2 = 6 - 2\\cos x\\)",
        },
        { prompt: "Find the curve through \\((0, 4)\\) whose slope at \\((x, y)\\) is \\(e^{x}\\).", answer: "\\(y = e^{x} + 3\\)" },
      ],
      pyqExampleId: "73bc5347-d11a-480b-b436-48252e95f171",
      traps: [
        {
          title: "Putting the condition in before integrating",
          body: "The condition belongs in the general solution, after you integrate. Substituting it into the differential equation itself does not give C.",
        },
        {
          title: "Stopping at the value of C",
          body: "Finding \\(C = 2\\) is not the answer. Write the particular solution with C replaced, for example \\(y = 2(1 + x^2)\\).",
        },
        {
          title: "A wrong value at the point",
          body: "At \\(x = 1\\), \\(\\log 1 = 0\\); at \\(x = 0\\), \\(\\cos 0 = 1\\), not 0. A slip here gives the wrong C even when the integration is right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-growth",
      name: "Growth, decay and cooling",
      intuition:
        "Many word problems say that a quantity changes at a rate proportional to its size, or to its difference from a fixed value. That sentence is the differential equation, and it always separates. Its solution is an exponential.",
      definition:
        "- **Rate proportional to the amount:** \\(\\dfrac{dP}{dt} = kP\\). Separating, \\(\\log P = kt + C\\), so \\(P = P_0e^{kt}\\), where \\(P_0\\) is the value at \\(t = 0\\).\n" +
        "- **Interest compounded continuously at r% a year:** \\(\\dfrac{dP}{dt} = \\dfrac{r}{100}P\\) (NCERT Example 9).\n" +
        "- **Rate proportional to a difference**, as in cooling towards a room temperature \\(T_s\\): \\(\\dfrac{dT}{dt} = -k(T - T_s)\\). Separate with \\(T - T_s\\) to get \\(T - T_s = (T_0 - T_s)e^{-kt}\\), where \\(T_0\\) is the temperature at \\(t = 0\\).\n" +
        "- **Doubling:** \\(e^{kt} = 2\\) gives \\(t = \\dfrac{\\log 2}{k}\\).\n" +
        "- Use the log or exponential values given in the question, and give the answer with its unit.",
      formula: {
        label: "Rate proportional to the amount",
        latex: "\\dfrac{dP}{dt} = kP \\;\\Rightarrow\\; P = P_0e^{kt}",
      },
      authoredExample: {
        prompt: "Rs 500 is deposited in a bank where the principal increases continuously at 8% per year. Find the amount after 5 years. \\((e^{0.4} = 1.492)\\)",
        steps: [
          "Let P be the principal after t years. Then \\(\\dfrac{dP}{dt} = \\dfrac{8}{100}P = 0.08P\\).",
          "Separating, \\(\\dfrac{dP}{P} = 0.08\\,dt\\), so \\(\\log P = 0.08t + C\\) and \\(P = P_0e^{0.08t}\\).",
          "At \\(t = 0\\), \\(P = 500\\), so \\(P_0 = 500\\).",
          "At \\(t = 5\\): \\(P = 500e^{0.4} = 500 \\times 1.492 = 746\\).",
        ],
        answer: "Rs 746",
      },
      selfCheckExample: {
        prompt: "A liquid at \\(100^\\circ\\)C cools in a room at \\(30^\\circ\\)C so that \\(\\dfrac{dT}{dt} = -k(T - 30)\\). Find T in terms of t.",
        steps: [
          "\\(\\dfrac{dT}{T - 30} = -k\\,dt\\), so \\(\\log(T - 30) = -kt + C\\).",
          "At \\(t = 0\\): \\(\\log 70 = C\\).",
        ],
        answer: "\\(T = 30 + 70e^{-kt}\\)",
      },
      practiceSet: [
        {
          prompt: "Bacteria grow so that \\(\\dfrac{dN}{dt} = kN\\). If the number doubles in 3 hours, find k.",
          answer: "\\(e^{3k} = 2\\), so \\(k = \\dfrac{\\log 2}{3}\\)",
        },
        {
          prompt: "If \\(P = P_0e^{0.05t}\\), in how many years does P double? \\((\\log_e 2 = 0.6931)\\)",
          answer: "\\(t = \\dfrac{0.6931}{0.05} = 13.862\\), about 13.86 years",
        },
        {
          prompt: "Solve \\(\\dfrac{dT}{dt} = -k(T - 20)\\) given \\(T = 70\\) at \\(t = 0\\).",
          answer: "\\(T = 20 + 50e^{-kt}\\)",
        },
      ],
      pyqExampleId: "eb1a5ff5-7e7f-47ea-bbbc-6b91c79eeaae",
      traps: [
        {
          title: "Writing the percentage as a whole number",
          body: "Growth at 8% a year means \\(\\dfrac{dP}{dt} = 0.08P\\), not \\(8P\\).",
        },
        {
          title: "Losing the minus sign in cooling",
          body: "A body cooling towards room temperature has \\(\\dfrac{dT}{dt} = -k(T - T_s)\\) with \\(k > 0\\). Without the minus the temperature would rise for ever.",
        },
        {
          title: "No unit in the answer",
          body: "Answer in the question's words: 'after about 13.86 years', 'Rs 746', 'after 4 weeks'. A bare number loses the last mark.",
        },
      ],
    },
  ],
};
