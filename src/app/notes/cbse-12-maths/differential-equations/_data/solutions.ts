import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DE_SOLUTIONS_NOTE: SubtopicNote = {
  subtopicName: "General and Particular Solutions",
  title: "General and Particular Solutions",
  oneLineDefinition:
    "What it means for a function to be a solution, how to verify one by substituting it, the difference between the general solution with its arbitrary constants and a particular solution, and fixing constants from given data.",
  whyItMatters:
    "26 questions, seven of them from board papers from 2023 to 2025. The board asks how many arbitrary constants a particular solution has (2024), how many solutions satisfy a given condition (2023, 2024), and, in case studies, puts readings into a solution to find the constant k: the growth of bacteria (2024) and a camphor tablet evaporating (2025). The textbook adds Exercise 9.2 (verify that a function is a solution, and count the constants), Examples 2 and 3, Miscellaneous Example 19 and Miscellaneous Question 2.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmde-verify",
      name: "Verifying that a function is a solution",
      intuition:
        "A solution is a function that makes the equation true. To check one, find the derivatives the equation needs, put them and the function into the left side, and simplify until it becomes the right side.",
      definition:
        "- A **solution** of a differential equation is a function \\(y = \\phi(x)\\) which, substituted with its derivatives, makes L.H.S. = R.H.S. Its graph is a **solution curve** (integral curve).\n" +
        "- **To verify:** differentiate the given function as many times as the order of the equation needs, substitute, and simplify the L.H.S. to the R.H.S.\n" +
        "- **An implicit relation** such as \\(x + y = \\tan^{-1} y\\): differentiate both sides with respect to x, then use the relation itself to replace any leftover term.\n" +
        "- **Arbitrary constants a, b** in the function: write the derivatives in terms of y where you can, for example \\(\\dfrac{d^2y}{dx^2} = -y\\) for \\(y = a\\cos x + b\\sin x\\).\n" +
        "- End with the conclusion: 'L.H.S. = R.H.S., so the function is a solution.'",
      formula: {
        label: "The test",
        latex: "\\text{substitute } y,\\ y',\\ y'' \\;\\Rightarrow\\; \\text{L.H.S.} = \\text{R.H.S.}",
      },
      authoredExample: {
        prompt:
          "Verify that \\(y = e^{2x} + e^{-x}\\) is a solution of the differential equation \\(\\dfrac{d^2y}{dx^2} - \\dfrac{dy}{dx} - 2y = 0\\).",
        steps: [
          "Given \\(y = e^{2x} + e^{-x}\\).",
          "Differentiating, \\(\\dfrac{dy}{dx} = 2e^{2x} - e^{-x}\\).",
          "Differentiating again, \\(\\dfrac{d^2y}{dx^2} = 4e^{2x} + e^{-x}\\).",
          "L.H.S. \\(= \\left(4e^{2x} + e^{-x}\\right) - \\left(2e^{2x} - e^{-x}\\right) - 2\\left(e^{2x} + e^{-x}\\right)\\).",
          "\\(= (4 - 2 - 2)e^{2x} + (1 + 1 - 2)e^{-x} = 0 =\\) R.H.S.",
          "Hence the given function is a solution of the differential equation.",
        ],
        answer: "L.H.S. = 0 = R.H.S., so \\(y = e^{2x} + e^{-x}\\) is a solution",
      },
      selfCheckExample: {
        prompt: "Verify that \\(y = ax + \\dfrac{b}{x}\\) is a solution of \\(x^2y'' + xy' - y = 0\\).",
        steps: [
          "\\(y' = a - \\dfrac{b}{x^2}\\) and \\(y'' = \\dfrac{2b}{x^3}\\).",
          "L.H.S. \\(= \\dfrac{2b}{x} + ax - \\dfrac{b}{x} - ax - \\dfrac{b}{x}\\).",
        ],
        answer: "L.H.S. = 0 = R.H.S.",
      },
      practiceSet: [
        {
          prompt: "Verify that \\(y = e^{4x}\\) is a solution of \\(y' - 4y = 0\\).",
          answer: "\\(y' = 4e^{4x}\\), so \\(y' - 4y = 4e^{4x} - 4e^{4x} = 0\\)",
        },
        {
          prompt: "Verify that \\(y = \\sin 2x\\) is a solution of \\(y'' + 4y = 0\\).",
          answer: "\\(y'' = -4\\sin 2x\\), so \\(y'' + 4y = 0\\)",
        },
        {
          prompt: "Verify that the relation \\(xy = c\\) is a solution of \\(xy' + y = 0\\).",
          answer: "Differentiating \\(xy = c\\): \\(y + xy' = 0\\), which is the equation",
        },
      ],
      pyqExampleId: "0ca33c14-18a6-4050-9402-e2b41cb8f09f",
      traps: [
        {
          title: "Stopping at the derivatives",
          body: "Finding \\(y'\\) and \\(y''\\) is only half the answer. Substitute them, simplify the L.H.S. to the R.H.S., and write the conclusion.",
        },
        {
          title: "Not taking enough derivatives",
          body: "A second order equation needs \\(y''\\). For \\(y = a\\cos x + b\\sin x\\) in \\(y'' + y = 0\\), differentiate twice before you substitute.",
        },
        {
          title: "Solving an implicit relation for y first",
          body: "For \\(y - \\cos y = x\\) you cannot write y in terms of x. Differentiate implicitly, and use \\(x = y - \\cos y\\) to replace x in the equation.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmde-constants",
      name: "General and particular solutions, and counting constants",
      intuition:
        "The general solution is a whole family of curves, one for each value of the arbitrary constant. A particular solution picks out one member of that family, so it has no arbitrary constant left.",
      definition:
        "- **General solution** (primitive): the solution that contains arbitrary constants.\n" +
        "- **Particular solution:** the solution obtained from the general solution by giving particular values to the arbitrary constants. It is free from arbitrary constants.\n" +
        "- The general solution of an equation of order n carries n arbitrary constants: a fourth order equation has four (NCERT Exercise 9.2 Q11).\n" +
        "- A particular solution has **zero** arbitrary constants, whatever the order of the equation.\n" +
        "- A first order equation has one constant, and one condition such as \\(y(0) = 1\\) fixes it, giving one solution.",
      table: {
        columns: ["Solution", "Arbitrary constants", "Example"],
        rows: [
          { cells: ["General solution of a first order equation", "One", "\\(y = x^2 + C\\) for \\(\\dfrac{dy}{dx} = 2x\\)"] },
          {
            cells: ["General solution of a second order equation", "Two", "\\(y = a\\cos x + b\\sin x\\) for \\(\\dfrac{d^2y}{dx^2} + y = 0\\)"],
          },
          { cells: ["General solution of a fourth order equation", "Four", "\\(y = C_1x^3 + C_2x^2 + C_3x + C_4\\) for \\(\\dfrac{d^4y}{dx^4} = 0\\)"] },
          {
            cells: ["Any particular solution", "None (zero)", "\\(y = x^2 + 3\\), the member of \\(y = x^2 + C\\) through \\((1, 4)\\)"],
            noteAmber:
              "Board 2024 asked how many arbitrary constants the particular solution of log(dy/dx) = 3x + 4y with y(0) = 0 has. The answer is 0.",
            pyqExampleId: "63307330-3868-499a-a4a7-140e2285afcf",
          },
          { cells: ["A first order equation with one condition", "Fixed by the condition", "\\(\\dfrac{dy}{dx} = y\\) with \\(y(0) = 1\\) gives the one solution \\(y = e^x\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many arbitrary constants does the general solution of \\(\\dfrac{d^3y}{dx^3} = 0\\) have? Write the general solution.",
        steps: ["Integrate three times; each integration adds one constant."],
        answer: "Three: \\(y = C_1x^2 + C_2x + C_3\\)",
      },
      practiceSet: [
        { prompt: "How many arbitrary constants are there in the general solution of a second order differential equation?", answer: "2" },
        {
          prompt: "The general solution of \\(\\dfrac{dy}{dx} = y\\) is \\(y = Ce^{x}\\). Find the particular solution with \\(y(0) = 5\\).",
          answer: "\\(y = 5e^{x}\\)",
        },
        {
          prompt: "How many arbitrary constants are there in a particular solution of a third order differential equation?",
          answer: "0",
        },
      ],
      pyqExampleId: "63307330-3868-499a-a4a7-140e2285afcf",
      traps: [
        {
          title: "Giving the order as the count for a particular solution",
          body: "The order tells you how many constants the GENERAL solution has. A particular solution has none left, so the answer is 0.",
        },
        {
          title: "Leaving C in a 'particular' solution",
          body: "A particular solution is not finished until C is replaced by the value the condition gives.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-data",
      name: "Fixing the constants from given readings",
      intuition:
        "Case studies give the equation and its solution part by part, and then two readings. The reading at the start fixes the constant of integration. The second reading fixes the rate constant k. Only then can you answer the question about a time or a value.",
      definition:
        "- Write the solution with both constants showing, for example \\(\\log P = kt + C\\), \\(P = P_0e^{kt}\\), or a straight line \\(r = at + C\\).\n" +
        "- The reading at \\(t = 0\\) gives C (or \\(P_0\\)).\n" +
        "- The second reading gives k. When k is in a power of e, take logs: \\(P_1 = P_0e^{kt_1}\\) gives \\(k = \\dfrac{1}{t_1}\\log\\dfrac{P_1}{P_0}\\).\n" +
        "- Then answer what is asked: the time when a value is reached, or the value at a time. Give the unit (hours, minutes, mm).\n" +
        "- k is negative for something that shrinks or cools, and positive for growth.\n" +
        "- In this chapter \\(\\log\\) means the natural logarithm \\(\\log_e\\). Use the log values the question gives.",
      formula: {
        label: "The rate constant from two readings",
        latex: "k = \\dfrac{1}{t_1}\\log\\dfrac{P_1}{P_0}",
      },
      authoredExample: {
        prompt:
          "The number P of insects in a colony grows at a rate proportional to P, so that \\(P = P_0e^{kt}\\), t in weeks. There are 500 insects at \\(t = 0\\) and 1500 at \\(t = 2\\). Find k, and the time when the colony reaches 4500.",
        steps: [
          "At \\(t = 0\\), \\(P = 500\\), so \\(P_0 = 500\\) and \\(P = 500e^{kt}\\).",
          "At \\(t = 2\\): \\(1500 = 500e^{2k}\\), so \\(e^{2k} = 3\\).",
          "Taking logs, \\(2k = \\log 3\\), so \\(k = \\dfrac{1}{2}\\log 3\\).",
          "For \\(P = 4500\\): \\(500e^{kt} = 4500\\), so \\(e^{kt} = 9\\) and \\(kt = \\log 9 = 2\\log 3\\).",
          "So \\(t = \\dfrac{2\\log 3}{\\frac{1}{2}\\log 3} = 4\\).",
        ],
        answer: "\\(k = \\dfrac{1}{2}\\log 3\\); the colony reaches 4500 after 4 weeks",
      },
      selfCheckExample: {
        prompt:
          "The radius r (in mm) of a melting ice ball follows \\(\\dfrac{dr}{dt} = k\\), t in hours. If \\(r = 8\\) at \\(t = 0\\) and \\(r = 6\\) at \\(t = 1\\), find k and the time when r becomes 0.",
        steps: ["\\(r = kt + 8\\). Then \\(6 = k + 8\\) gives \\(k = -2\\), and \\(0 = -2t + 8\\)."],
        answer: "\\(k = -2\\); r becomes 0 after 4 hours",
      },
      practiceSet: [
        {
          prompt: "Given \\(P = P_0e^{kt}\\) with \\(P = 200\\) at \\(t = 0\\) and \\(P = 600\\) at \\(t = 1\\), find k.",
          answer: "\\(e^{k} = 3\\), so \\(k = \\log 3\\)",
        },
        {
          prompt: "The temperature of a liquid follows \\(T - 20 = 60e^{-kt}\\), t in minutes. If \\(T = 50\\) at \\(t = 10\\), find k.",
          answer: "\\(e^{-10k} = \\dfrac{1}{2}\\), so \\(k = \\dfrac{\\log 2}{10}\\)",
        },
        {
          prompt: "A length follows \\(x = 4 + kt\\). If \\(x = 10\\) when \\(t = 2\\), find k.",
          answer: "\\(k = 3\\)",
        },
      ],
      pyqExampleId: "62d6943d-9ae5-4f98-845e-46c436ac5743",
      traps: [
        {
          title: "Using the later reading to find C",
          body: "The constant of integration comes from the reading at \\(t = 0\\). Use the second reading only for k; mixing them up gives a wrong k.",
        },
        {
          title: "Losing the sign of k",
          body: "For a tablet that evaporates or a body that cools, the quantity falls, so k comes out negative in \\(\\dfrac{dr}{dt} = k\\). A positive k there means an arithmetic slip.",
        },
        {
          title: "Stopping at k",
          body: "When the part says 'Hence find t', go on: put the value of k back into the solution and solve for t, with its unit.",
        },
      ],
    },
  ],
};
