import type { SubtopicNote } from "@/app/notes/_types";

export const FORMATION_DE_NOTE: SubtopicNote = {
  subtopicName: "Forming a Differential Equation",
  title: "Forming a Differential Equation",
  oneLineDefinition:
    "Going from a family of curves, or a given solution, to the differential equation it satisfies: eliminate the arbitrary constants by differentiating, then read off the order and degree.",
  whyItMatters:
    "Eight PYQs, seven of them multiple choice. Half give a family of circles or parabolas and ask for its equation; the rest give one solution or a rule for f and ask which equation it satisfies, or for the order and degree. Two ideas cover the page.",
  concepts: [
    // C1 — eliminate constants
    {
      kind: "formula" as const,
      slug: "jde-eliminate",
      name: "Eliminating the constants of a family",
      intuition:
        "A family with n arbitrary constants satisfies a differential equation of order n. Differentiate the family n times, then use the equations to remove every constant. For circles through two fixed points, or parabolas with a fixed axis direction, write the general member with as few constants as the conditions allow before differentiating.",
      definition:
        "- Count the free constants: that is the order of the equation.\n" +
        "- Differentiate as many times as there are constants.\n" +
        "- Solve for the constants from the derivatives and substitute back.\n" +
        "- Circles through the origin with centre on \\(y=x\\): \\(x^2+y^2+gx+gy=0\\), one constant.",
      formula: {
        label: "Order = number of constants",
        latex: "y=f(x;c_1,\\dots,c_n)\\ \\Rightarrow\\ F\\big(x,y,y',\\dots,y^{(n)}\\big)=0",
      },
      authoredExample: {
        prompt: "Find the differential equation of the family \\(y=cx^2\\).",
        steps: [
          "\\(y'=2cx\\), so \\(c=\\frac{y'}{2x}\\).",
          "Substitute: \\(y=\\frac{y'}{2x}x^2\\).",
        ],
        answer: "\\(xy'=2y\\).",
      },
      selfCheckExample: {
        prompt: "Find the differential equation of all circles with centre on the \\(x\\)-axis and radius 1.",
        steps: [
          "\\((x-h)^2+y^2=1\\); differentiating, \\(x-h=-yy'\\).",
          "Substitute: \\(y^2y'^2+y^2=1\\).",
        ],
        answer: "\\(y^2(1+y'^2)=1\\).",
      },
      practiceSet: [
        { prompt: "Order of the equation of \\(y=ae^x+be^{-x}\\)?", answer: "2" },
        { prompt: "Equation of \\(y=ae^x+be^{-x}\\)?", answer: "\\(y''=y\\)" },
        { prompt: "Order of the equation of all lines in the plane?", answer: "2" },
        { prompt: "Equation of \\(y=mx\\)?", answer: "\\(xy'=y\\)" },
      ],
      pyqExampleId: "4ce56c3c-8151-453f-98f6-f28e2097b296", // 2022 — circles through (0, 2) and (0, -2)
      traps: [
        {
          title: "Use the conditions first",
          body: "A general circle has three constants. Conditions such as 'through the origin' or 'centre on \\(y=x\\)' remove some of them before you differentiate; skipping that step gives an equation of too high an order.",
        },
      ],
    },

    // C2 — order, degree and the equation a solution satisfies
    {
      kind: "formula" as const,
      slug: "jde-order-degree",
      name: "Order, degree, and the equation a solution satisfies",
      intuition:
        "The order is the highest derivative present. The degree is the power of that highest derivative once the equation is free of radicals and fractions in the derivatives, so clear any square root first. When a question gives a solution, or a rule the function obeys, differentiate it until the equation in the options appears.",
      definition:
        "- Order: the highest derivative.\n" +
        "- Degree: the power of the highest derivative after removing radicals in the derivatives.\n" +
        "- \\(y=A\\cos(k\\ln x)+B\\sin(k\\ln x)\\) satisfies \\(x^2y''+xy'+k^2y=0\\).\n" +
        "- \\(f(xy)=f(x)f(y)\\) with \\(f'(1)=k\\) gives \\(xf'(x)=kf(x)\\).",
      formula: {
        label: "Degree after clearing radicals",
        latex: "y=x y'+\\sqrt{1+y'^2}\\ \\Rightarrow\\ (y-xy')^2=1+y'^2\\ :\\ \\text{order }1,\\ \\text{degree }2",
      },
      authoredExample: {
        prompt: "Find the order and degree of \\(\\left(\\frac{d^2y}{dx^2}\\right)^{3}+\\left(\\frac{dy}{dx}\\right)^{4}=x\\).",
        steps: [
          "The highest derivative is the second, raised to the power 3.",
        ],
        answer: "Order 2, degree 3.",
      },
      selfCheckExample: {
        prompt: "Which equation does \\(y=e^{2x}\\) satisfy: \\(y'=2y\\) or \\(y'=y^2\\)?",
        steps: [
          "\\(y'=2e^{2x}=2y\\).",
        ],
        answer: "\\(y'=2y\\).",
      },
      practiceSet: [
        { prompt: "Order and degree of \\(y'''+y'=0\\)?", answer: "3, 1" },
        { prompt: "Degree of \\(y''=\\sqrt{1+y'}\\)?", answer: "2" },
        { prompt: "\\(y=\\sin x\\) satisfies?", answer: "\\(y''+y=0\\)" },
        { prompt: "Degree when the equation is not a polynomial in the highest derivative?", answer: "Not defined" },
      ],
      pyqExampleId: "70c6cab5-46c5-4f6f-9813-299cbc259c39", // 2022 — cos^-1(y/2) = 5 ln(x/5)
      traps: [
        {
          title: "Clear the radical before counting",
          body: "\\(y=xy'+\\sqrt{1+y'^2}\\) looks like degree 1, but squaring to remove the root gives \\(y'^2\\) terms, so the degree is 2. The degree is read only after the radical is gone.",
        },
      ],
    },
  ],
};
