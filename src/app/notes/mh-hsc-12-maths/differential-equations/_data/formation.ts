import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DE_FORMATION_NOTE: SubtopicNote = {
  subtopicName: "Formation of a Differential Equation",
  title: "Formation of a Differential Equation",
  oneLineDefinition:
    "Forming a differential equation from a relation by differentiating it and eliminating its arbitrary constants, or from a statement about a rate of change.",
  whyItMatters:
    "46 questions, eight of them from board papers: eliminating two constants from a pair of exponentials (2017, 2018, 2019) and from c1 cos(log x) + c2 sin(log x) (2025), an MCQ on the equation of y = c² + c/x (2015, 2024), the lines that make intercept 3 on the X-axis (2022), and a particle whose acceleration is proportional to its velocity (2024). The textbook rows are the solved examples of section 6.3, Exercise 6.2, and Questions 3 and 4 and four MCQs of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmde-oneconstant",
      name: "Eliminating one arbitrary constant",
      intuition:
        "A relation with an arbitrary constant, such as y = cx + c³, is not one curve but a whole family: each value of c gives a member. Differentiating once gives a second equation, and from the two you can remove c. What is left holds for every member of the family, and it is a first order differential equation.",
      definition:
        "- Number the given relation (1).\n" +
        "- Differentiate (1) with respect to \\(x\\) to get (2).\n" +
        "- From (2) find the constant in terms of \\(x\\), \\(y\\), \\(\\dfrac{dy}{dx}\\) and substitute in (1).\n" +
        "- The final equation must contain no arbitrary constant.\n" +
        "- A relation with \\(n\\) arbitrary constants gives a differential equation of order \\(n\\): one constant, first order.",
      formula: {
        label: "One constant gives first order",
        latex: "f(x, y, c) = 0 \\;\\xrightarrow{\\text{differentiate once, eliminate } c}\\; F\\left(x, y, \\dfrac{dy}{dx}\\right) = 0",
      },
      authoredExample: {
        prompt: "Obtain the differential equation by eliminating the arbitrary constant \\(c\\) from \\(y = cx + c^3\\).",
        steps: [
          "Given \\(y = cx + c^3\\) ... (1)",
          "Differentiate (1) with respect to \\(x\\): \\(\\dfrac{dy}{dx} = c\\) ... (2)",
          "Substitute \\(c = \\dfrac{dy}{dx}\\) from (2) in (1): \\(y = x\\dfrac{dy}{dx} + \\left(\\dfrac{dy}{dx}\\right)^3\\).",
          "This contains no arbitrary constant, so it is the required differential equation.",
        ],
        answer: "\\(y = x\\dfrac{dy}{dx} + \\left(\\dfrac{dy}{dx}\\right)^3\\)",
      },
      selfCheckExample: {
        prompt: "Obtain the differential equation by eliminating \\(a\\) from \\(y^2 = 4ax\\).",
        steps: [
          "Differentiate: \\(2y\\dfrac{dy}{dx} = 4a\\).",
          "Substitute \\(4a\\) in \\(y^2 = 4ax\\): \\(y^2 = 2xy\\dfrac{dy}{dx}\\), so \\(y = 2x\\dfrac{dy}{dx}\\).",
        ],
        answer: "\\(y = 2x\\dfrac{dy}{dx}\\)",
      },
      practiceSet: [
        { prompt: "Eliminate the arbitrary constant \\(c\\) from \\(xy = c\\).", answer: "\\(x\\dfrac{dy}{dx} + y = 0\\)" },
        { prompt: "Eliminate the arbitrary constant \\(m\\) from \\(y = mx\\).", answer: "\\(y = x\\dfrac{dy}{dx}\\)" },
        { prompt: "A relation has three arbitrary constants. What is the order of the differential equation formed from it?", answer: "3" },
      ],
      pyqExampleId: "25cd0926-8f3e-4bc5-aa5c-056614b896c7",
      traps: [
        {
          title: "An answer that still contains the constant",
          body: "If \\(c\\) appears in your last line, the elimination is not finished. Find \\(c\\) from the differentiated equation and substitute it back into the given relation.",
        },
        {
          title: "Picking a second order option for one constant",
          body: "One arbitrary constant gives a first order equation. In an MCQ, any option with \\(\\dfrac{d^2y}{dx^2}\\) can be crossed out at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-twoconstants",
      name: "Eliminating two arbitrary constants",
      intuition:
        "With two constants you need three equations to remove both: the relation and its first two derivatives. So you differentiate twice and the result is a second order equation. Pairs of exponentials and pairs of sine and cosine give short patterns worth knowing.",
      definition:
        "- Number the relation (1), differentiate it to get (2), and differentiate again to get (3).\n" +
        "- Eliminate both constants between (1), (2) and (3).\n" +
        "- \\(y = Ae^{kx} + Be^{-kx}\\) gives \\(\\dfrac{d^2y}{dx^2} = k^2y\\).\n" +
        "- \\(y = A\\cos kx + B\\sin kx\\) gives \\(\\dfrac{d^2y}{dx^2} = -k^2y\\).\n" +
        "- \\(y = A\\cos(\\log x) + B\\sin(\\log x)\\) gives \\(x^2\\dfrac{d^2y}{dx^2} + x\\dfrac{dy}{dx} + y = 0\\): multiply the first derivative by \\(x\\) before differentiating again.",
      formula: {
        label: "Two standard results",
        latex: "y = Ae^{kx} + Be^{-kx} \\Rightarrow \\dfrac{d^2y}{dx^2} = k^2y, \\qquad y = A\\cos kx + B\\sin kx \\Rightarrow \\dfrac{d^2y}{dx^2} = -k^2y",
      },
      authoredExample: {
        prompt: "Obtain the differential equation by eliminating the arbitrary constants \\(A\\) and \\(B\\) from \\(y = Ae^{x} + Be^{4x}\\).",
        steps: [
          "Given \\(y = Ae^{x} + Be^{4x}\\) ... (1)",
          "Differentiate: \\(\\dfrac{dy}{dx} = Ae^{x} + 4Be^{4x}\\) ... (2)",
          "Differentiate again: \\(\\dfrac{d^2y}{dx^2} = Ae^{x} + 16Be^{4x}\\) ... (3)",
          "(2) minus (1): \\(\\dfrac{dy}{dx} - y = 3Be^{4x}\\) ... (4)",
          "(3) minus (2): \\(\\dfrac{d^2y}{dx^2} - \\dfrac{dy}{dx} = 12Be^{4x} = 4\\left(\\dfrac{dy}{dx} - y\\right)\\), by (4).",
          "Simplify: \\(\\dfrac{d^2y}{dx^2} - 5\\dfrac{dy}{dx} + 4y = 0\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} - 5\\dfrac{dy}{dx} + 4y = 0\\)",
      },
      selfCheckExample: {
        prompt: "Eliminate \\(A\\) and \\(B\\) from \\(y = A\\cos 3x + B\\sin 3x\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = -3A\\sin 3x + 3B\\cos 3x\\).",
          "\\(\\dfrac{d^2y}{dx^2} = -9A\\cos 3x - 9B\\sin 3x = -9y\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} + 9y = 0\\)",
      },
      practiceSet: [
        { prompt: "Eliminate \\(a\\) and \\(b\\) from \\(y = ax + b\\).", answer: "\\(\\dfrac{d^2y}{dx^2} = 0\\)" },
        { prompt: "Eliminate \\(A\\) and \\(B\\) from \\(y = (A + Bx)e^{2x}\\).", answer: "\\(\\dfrac{d^2y}{dx^2} - 4\\dfrac{dy}{dx} + 4y = 0\\)" },
        { prompt: "Eliminate \\(A\\) and \\(B\\) from \\(y = Ax^2 + Bx\\).", answer: "\\(x^2\\dfrac{d^2y}{dx^2} - 2x\\dfrac{dy}{dx} + 2y = 0\\)" },
      ],
      pyqExampleId: "47e7bf8c-0a6e-4b9a-b06d-725952d05469",
      traps: [
        {
          title: "Differentiating only once",
          body: "Two arbitrary constants need two differentiations, and the answer is a second order equation. A first order answer still hides one of the constants.",
        },
        {
          title: "Mixing up the sign of k squared",
          body: "Exponentials \\(e^{kx}\\) and \\(e^{-kx}\\) give \\(\\dfrac{d^2y}{dx^2} = +k^2y\\); sine and cosine of \\(kx\\) give \\(\\dfrac{d^2y}{dx^2} = -k^2y\\). Check one term by differentiating it twice.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-families",
      name: "Differential equation of a family of curves",
      intuition:
        "Questions such as 'all circles of radius 9' or 'all lines parallel to a given line' describe a family in words. Write the equation of a general member, using a letter for every quantity that is free to change. Those letters are the arbitrary constants; the quantities the question fixes stay as they are. Then eliminate as before.",
      definition:
        "- **Step 1:** write the general member: a line \\(y = mx + c\\), a circle \\((x - h)^2 + (y - k)^2 = r^2\\), a parabola \\(y^2 = 4ax\\) and so on, shifted as the question says.\n" +
        "- **Step 2:** decide which letters are free (arbitrary constants) and which are fixed by the question.\n" +
        "- **Step 3:** differentiate as many times as there are arbitrary constants and eliminate them.\n" +
        "- Example: circles of radius 9 with any centre \\((h, k)\\) have two arbitrary constants, so the equation is second order and 9 stays in it.",
      formula: {
        label: "Order equals the number of free constants",
        latex: "\\text{order of the differential equation} = \\text{number of arbitrary constants in the family}",
      },
      authoredExample: {
        prompt: "Form the differential equation of all parabolas whose vertex is at the origin and whose axis is the Y-axis.",
        steps: [
          "A member of the family is \\(x^2 = 4ay\\) ... (1), where \\(a\\) is the arbitrary constant.",
          "Differentiate (1) with respect to \\(x\\): \\(2x = 4a\\dfrac{dy}{dx}\\), so \\(4a = \\dfrac{2x}{\\frac{dy}{dx}}\\).",
          "Substitute in (1): \\(x^2 = \\dfrac{2xy}{\\frac{dy}{dx}}\\).",
          "Multiply by \\(\\dfrac{dy}{dx}\\) and divide by \\(x\\): \\(x\\dfrac{dy}{dx} = 2y\\).",
        ],
        answer: "\\(x\\dfrac{dy}{dx} = 2y\\)",
      },
      selfCheckExample: {
        prompt: "Form the differential equation of all circles with centre at the origin.",
        steps: [
          "A member is \\(x^2 + y^2 = r^2\\), with \\(r\\) arbitrary.",
          "Differentiate: \\(2x + 2y\\dfrac{dy}{dx} = 0\\).",
        ],
        answer: "\\(x + y\\dfrac{dy}{dx} = 0\\)",
      },
      practiceSet: [
        { prompt: "Form the differential equation of all lines with slope 5.", answer: "\\(\\dfrac{dy}{dx} = 5\\)" },
        { prompt: "How many arbitrary constants does the family of circles of radius 2 (any centre) have?", answer: "Two, \\(h\\) and \\(k\\), so its differential equation is of order 2" },
        { prompt: "Form the differential equation of all lines parallel to the X-axis.", answer: "\\(\\dfrac{dy}{dx} = 0\\)" },
      ],
      pyqExampleId: "19b84a80-dd0f-4625-b412-34ec33b13655",
      traps: [
        {
          title: "Eliminating a quantity the question fixes",
          body: "In 'circles of radius 9' the radius is given, so 9 stays in the answer; in 'parabolas with latus rectum 4a' the letter \\(a\\) is fixed and stays. Eliminate only the letters that change from member to member.",
        },
        {
          title: "Starting from the wrong general equation",
          body: "Draw a quick sketch and check one member against the words: a family through a fixed point, or with its centre on a line, must satisfy that condition for every value of the constant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-statement",
      name: "Forming a differential equation from a statement",
      intuition:
        "Words about rates translate straight into derivatives. 'The rate of change of N' is dN/dt; 'proportional to' means equal to a constant k times. Velocity is the first derivative of distance and acceleration the second.",
      definition:
        "- 'Rate of change of \\(A\\) with respect to \\(t\\)' is \\(\\dfrac{dA}{dt}\\).\n" +
        "- '\\(A\\) is proportional to \\(B\\)' means \\(A = kB\\), with \\(k\\) a constant of proportionality.\n" +
        "- For a particle on a line at distance \\(s\\) at time \\(t\\): velocity \\(v = \\dfrac{ds}{dt}\\), acceleration \\(\\dfrac{d^2s}{dt^2}\\).\n" +
        "- A quantity that decreases has a negative rate: write \\(-k\\) with \\(k > 0\\), or say \\(k < 0\\).",
      formula: {
        label: "Rates in symbols",
        latex: "\\dfrac{dA}{dt} \\propto B \\;\\Rightarrow\\; \\dfrac{dA}{dt} = kB, \\qquad v = \\dfrac{ds}{dt}, \\quad \\text{acceleration} = \\dfrac{d^2s}{dt^2}",
      },
      authoredExample: {
        prompt: "The rate of increase of the number \\(N\\) of bacteria in a culture at time \\(t\\) is proportional to the number present. Form the differential equation.",
        steps: [
          "The rate of increase of \\(N\\) is \\(\\dfrac{dN}{dt}\\).",
          "It is proportional to \\(N\\): \\(\\dfrac{dN}{dt} \\propto N\\).",
          "So \\(\\dfrac{dN}{dt} = kN\\), where \\(k\\) is the constant of proportionality, and \\(k > 0\\) because \\(N\\) increases.",
        ],
        answer: "\\(\\dfrac{dN}{dt} = kN\\), \\(k > 0\\)",
      },
      selfCheckExample: {
        prompt: "The slope of the tangent to a curve at any point \\((x, y)\\) is twice the x-coordinate of the point. Form the differential equation of the curve.",
        steps: ["The slope of the tangent is \\(\\dfrac{dy}{dx}\\), and it equals \\(2x\\)."],
        answer: "\\(\\dfrac{dy}{dx} = 2x\\)",
      },
      practiceSet: [
        {
          prompt: "The temperature \\(\\theta\\) of a body falls at a rate proportional to \\(\\theta - 25\\). Form the differential equation.",
          answer: "\\(\\dfrac{d\\theta}{dt} = -k(\\theta - 25)\\), \\(k > 0\\)",
        },
        { prompt: "The rate of change of the area \\(A\\) of a circle with respect to its radius \\(r\\) is \\(2\\pi r\\). Write this as a differential equation.", answer: "\\(\\dfrac{dA}{dr} = 2\\pi r\\)" },
      ],
      pyqExampleId: "9ff9c806-3963-4561-bfd4-49ca1a51ea4e",
      traps: [
        {
          title: "Dropping the constant of proportionality",
          body: "'Proportional to \\(N\\)' is \\(\\dfrac{dN}{dt} = kN\\), not \\(\\dfrac{dN}{dt} = N\\). Name \\(k\\) and say what sign it has.",
        },
        {
          title: "A decreasing quantity with a positive rate",
          body: "When a mass decays or a body cools, the derivative is negative. Write \\(\\dfrac{dx}{dt} = -kx\\) with \\(k > 0\\) (or state \\(k < 0\\)), otherwise the model grows instead of decaying.",
        },
      ],
    },
  ],
};
