import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DE_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Order and Degree of a Differential Equation",
  title: "Order and Degree of a Differential Equation",
  oneLineDefinition:
    "The order is the order of the highest derivative in the equation; the degree is the power of that derivative, defined only when the equation is a polynomial in its derivatives.",
  whyItMatters:
    "48 questions, thirty of them from board papers in every year from 2022 to 2026, and twenty-seven of those thirty are one-mark MCQs. The board asks for the order and degree, or their sum or product (every year); spots a derivative inside a sine, cosine, logarithm or exponential, where the degree is not defined (2023 to 2025); and sets equations that must be expanded or differentiated before you read the degree (2022, 2023, 2025, 2026). The 2025 case study on a camphor tablet opened by asking the order and degree of dV/dt = kS. The textbook adds Exercise 9.1, Example 1 and Miscellaneous Question 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmde-read",
      name: "Reading the order and the degree",
      intuition:
        "The order tells you how many times y has been differentiated in the highest derivative that appears. The degree is the power on that one derivative. Look only at the highest derivative: the powers on lower derivatives do not decide the degree.",
      definition:
        "- **Order:** the order of the highest order derivative of the dependent variable in the equation.\n" +
        "- **Degree:** defined when the equation is a polynomial equation in its derivatives \\(y', y'', y''', \\ldots\\). It is then the highest power (a positive whole number) of the highest order derivative.\n" +
        "- Read the degree from the highest order derivative alone. In \\(\\dfrac{d^2y}{dx^2} + \\left(\\dfrac{dy}{dx}\\right)^3 = 0\\) the cube is on \\(\\dfrac{dy}{dx}\\), so the degree is 1.\n" +
        "- Functions of x or y alone, such as \\(\\sin y\\), \\(\\sqrt{y}\\), \\(\\log x\\) or \\(e^x\\), are not derivatives. They do not stop the equation being a polynomial in its derivatives.\n" +
        "- A constant coefficient such as \\(-1\\) or \\(\\lambda\\) changes neither the order nor the degree.\n" +
        "- Order and degree (when defined) are always positive whole numbers.",
      formula: {
        label: "Order and degree",
        latex:
          "\\text{order} = \\text{order of the highest derivative}, \\qquad \\text{degree} = \\text{its highest power}",
      },
      authoredExample: {
        prompt:
          "Find the order and the degree of \\(\\left(\\dfrac{d^2y}{dx^2}\\right)^3 + 7\\left(\\dfrac{dy}{dx}\\right)^5 - y\\cos x = 0\\), and their sum.",
        steps: [
          "The derivatives present are \\(\\dfrac{d^2y}{dx^2}\\) and \\(\\dfrac{dy}{dx}\\). The highest is the second derivative, so the order is 2.",
          "Each derivative appears with a whole-number power, and none sits inside a sine, logarithm or root, so the equation is a polynomial in its derivatives.",
          "The term \\(y\\cos x\\) has no derivative in it, so it does not affect the degree.",
          "The highest order derivative \\(\\dfrac{d^2y}{dx^2}\\) is raised to the power 3, so the degree is 3. The power 5 belongs to \\(\\dfrac{dy}{dx}\\) and is ignored.",
          "Sum \\(= 2 + 3 = 5\\).",
        ],
        answer: "Order 2, degree 3, sum 5",
      },
      selfCheckExample: {
        prompt: "Find the order and the degree of \\(\\left(\\dfrac{d^3y}{dx^3}\\right)^2 + x\\dfrac{d^2y}{dx^2} = e^{x}\\).",
        steps: [
          "The highest derivative is the third, so the order is 3.",
          "It is a polynomial in the derivatives, and \\(\\dfrac{d^3y}{dx^3}\\) is squared.",
        ],
        answer: "Order 3, degree 2",
      },
      practiceSet: [
        {
          prompt: "Find the order and the degree of \\(y'' + 5y' - 6y = \\sin x\\).",
          answer: "Order 2, degree 1",
        },
        {
          prompt: "Find the product of the order and the degree of \\(\\left(\\dfrac{dy}{dx}\\right)^4 + y = x\\).",
          answer: "Order 1, degree 4, product 4",
        },
        {
          prompt: "Find the order and the degree of \\(\\dfrac{d^4y}{dx^4} + \\left(\\dfrac{d^2y}{dx^2}\\right)^3 + \\sqrt{y} = 0\\).",
          answer: "Order 4, degree 1 (the cube is on a lower derivative, and \\(\\sqrt{y}\\) is not a derivative)",
        },
      ],
      pyqExampleId: "6597e33a-e8d7-4bd7-9676-095d85300260",
      traps: [
        {
          title: "Taking the largest power anywhere as the degree",
          body: "In \\(\\dfrac{d^2y}{dx^2} + \\left(\\dfrac{dy}{dx}\\right)^5 = 0\\) the degree is 1, not 5. The degree is the power of the HIGHEST order derivative only.",
        },
        {
          title: "Counting the power of a bracket on a lower derivative",
          body: "\\(\\left[1 + \\left(\\dfrac{dy}{dx}\\right)^2\\right]^4 = \\dfrac{d^2y}{dx^2}\\) has order 2 and degree 1. The power 4 acts on \\(\\dfrac{dy}{dx}\\), not on the second derivative.",
        },
        {
          title: "Thinking sin y or a root of y spoils the degree",
          body: "Only a derivative inside such a function makes the degree undefined. \\(y'' + \\sin y = 0\\) has degree 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-undefined",
      name: "When the degree is not defined",
      intuition:
        "The degree only makes sense when every derivative appears as a plain power. If a derivative is trapped inside a sine, cosine, tangent, logarithm or exponential, no algebra can turn the equation into a polynomial in the derivatives, so the degree is not defined. The order is still defined.",
      definition:
        "- If any derivative appears inside \\(\\sin\\), \\(\\cos\\), \\(\\tan\\), \\(\\log\\) or as a power of e, the equation is not a polynomial in its derivatives, and its **degree is not defined** (NCERT: \\(\\dfrac{dy}{dx} + \\sin\\left(\\dfrac{dy}{dx}\\right) = 0\\)).\n" +
        "- This holds whichever derivative is trapped, even a lower one: in \\(\\left(\\dfrac{d^2y}{dx^2}\\right)^2 + \\sin\\left(\\dfrac{dy}{dx}\\right) = 0\\) the degree is still not defined.\n" +
        "- The **order is always defined**: it is the highest derivative present, inside a function or not.\n" +
        "- When an MCQ asks for 'degree and order' in that order, write them in that order.",
      formula: {
        label: "Not a polynomial in derivatives",
        latex: "\\dfrac{d^2y}{dx^2} + \\cos\\left(\\dfrac{dy}{dx}\\right) = 0 \\;\\Rightarrow\\; \\text{order } 2,\\ \\text{degree not defined}",
      },
      authoredExample: {
        prompt: "Find the order and the degree, if defined, of \\(\\dfrac{d^3y}{dx^3} + e^{\\frac{dy}{dx}} = 7x\\).",
        steps: [
          "The highest derivative present is \\(\\dfrac{d^3y}{dx^3}\\), so the order is 3.",
          "\\(\\dfrac{dy}{dx}\\) sits in the power of e, in the term \\(e^{\\frac{dy}{dx}}\\).",
          "No rearranging can turn \\(e^{\\frac{dy}{dx}}\\) into a power of \\(\\dfrac{dy}{dx}\\), so the equation is not a polynomial in its derivatives.",
          "Hence the degree is not defined.",
        ],
        answer: "Order 3, degree not defined",
      },
      selfCheckExample: {
        prompt: "Find the order and the degree, if defined, of \\(\\left(\\dfrac{dy}{dx}\\right)^4 + \\tan\\left(\\dfrac{d^2y}{dx^2}\\right) = 0\\).",
        steps: ["The highest derivative is the second; it sits inside a tangent."],
        answer: "Order 2, degree not defined",
      },
      practiceSet: [
        {
          prompt: "Find the order and the degree, if defined, of \\(y'' + \\cos(y') = 0\\).",
          answer: "Order 2, degree not defined",
        },
        {
          prompt: "Find the order and the degree, if defined, of \\(y''' + \\sin x = y\\).",
          answer: "Order 3, degree 1 (the sine acts on x, not on a derivative)",
        },
        {
          prompt: "Find the order of \\(\\dfrac{d^2y}{dx^2} = \\log\\left(\\dfrac{d^3y}{dx^3}\\right)\\).",
          answer: "3 (the degree is not defined, but the question asks for the order)",
        },
      ],
      pyqExampleId: "20b2e168-6f10-4ce7-a9b6-89dbcf63c4ad",
      traps: [
        {
          title: "Answering 'not defined' for the order",
          body: "Only the degree can be undefined. If the question asks for the ORDER of \\(\\dfrac{d^4y}{dx^4} - \\sin\\left(\\dfrac{d^2y}{dx^2}\\right) = 5\\), the answer is 4.",
        },
        {
          title: "Reading the visible power as the degree",
          body: "In \\(\\left(\\dfrac{d^2y}{dx^2}\\right)^3 + \\sin\\left(\\dfrac{dy}{dx}\\right) = 0\\) the 3 is not the degree: the sine of a derivative makes the degree not defined.",
        },
        {
          title: "Confusing sin y with sin y′",
          body: "\\(y'' + 2y' + \\sin y = 0\\) has degree 1: the sine acts on y, not on a derivative. Check what is inside the function before you answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmde-simplify",
      name: "Expand or differentiate first, then read the degree",
      intuition:
        "Sometimes the equation hides its true shape. A bracket that is squared may lose its square once you expand and cancel, and a d/dx written in front of a bracket raises the order once you carry it out. Do the algebra first, then read the order and degree.",
      definition:
        "- **A derivative written as d/dx of something:** carry it out first. \\(\\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right)^3 = 3\\left(\\dfrac{dy}{dx}\\right)^2\\dfrac{d^2y}{dx^2}\\), so the order is 2, not 1.\n" +
        "- \\(\\dfrac{d}{dx}(\\sin y) = \\cos y\\,\\dfrac{dy}{dx}\\) and \\(\\dfrac{d}{dx}(e^y) = e^y\\dfrac{dy}{dx}\\): the order is 1 and the degree is 1.\n" +
        "- **A squared bracket:** expand it, then cancel equal terms on the two sides. A square that cancels leaves degree 1.\n" +
        "- **Terms on both sides:** collect everything on one side. \\(\\dfrac{d^2y}{dx^2} = 1 - \\left(\\dfrac{d^3y}{dx^3}\\right)^2\\) becomes \\(\\left(\\dfrac{d^3y}{dx^3}\\right)^2 + \\dfrac{d^2y}{dx^2} - 1 = 0\\): order 3, degree 2.\n" +
        "- Then apply the usual rules: order from the highest derivative, degree from its power.",
      formula: {
        label: "Carry out the derivative first",
        latex: "\\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right)^n = n\\left(\\dfrac{dy}{dx}\\right)^{n-1}\\dfrac{d^2y}{dx^2}",
      },
      authoredExample: {
        prompt: "Find the sum of the order and the degree of \\(\\dfrac{d}{dx}\\left(y\\,\\dfrac{dy}{dx}\\right) = x\\).",
        steps: [
          "By the product rule, \\(\\dfrac{d}{dx}\\left(y\\,\\dfrac{dy}{dx}\\right) = \\dfrac{dy}{dx}\\cdot\\dfrac{dy}{dx} + y\\,\\dfrac{d^2y}{dx^2}\\).",
          "So the equation is \\(\\left(\\dfrac{dy}{dx}\\right)^2 + y\\,\\dfrac{d^2y}{dx^2} = x\\).",
          "The highest derivative is \\(\\dfrac{d^2y}{dx^2}\\), so the order is 2.",
          "The equation is a polynomial in its derivatives and \\(\\dfrac{d^2y}{dx^2}\\) appears to the power 1, so the degree is 1.",
          "Sum \\(= 2 + 1 = 3\\).",
        ],
        answer: "Order 2, degree 1, sum 3",
      },
      selfCheckExample: {
        prompt: "Find the order and the degree of \\(\\left(\\dfrac{dy}{dx} - 3\\right)^2 = \\left(\\dfrac{dy}{dx}\\right)^2 + 5x\\).",
        steps: [
          "Expanding: \\(\\left(\\dfrac{dy}{dx}\\right)^2 - 6\\dfrac{dy}{dx} + 9 = \\left(\\dfrac{dy}{dx}\\right)^2 + 5x\\).",
          "The squares cancel, leaving \\(-6\\dfrac{dy}{dx} + 9 = 5x\\).",
        ],
        answer: "Order 1, degree 1",
      },
      practiceSet: [
        {
          prompt: "Find the order and the degree of \\(\\dfrac{d}{dx}(\\cos y) = x^2\\).",
          answer: "\\(-\\sin y\\,\\dfrac{dy}{dx} = x^2\\): order 1, degree 1",
        },
        {
          prompt: "Find the order and the degree of \\(\\dfrac{d}{dx}\\left(x\\dfrac{dy}{dx}\\right) = 0\\).",
          answer: "\\(x\\dfrac{d^2y}{dx^2} + \\dfrac{dy}{dx} = 0\\): order 2, degree 1",
        },
        {
          prompt: "Find the degree of \\(y = x\\dfrac{dy}{dx} + 4\\left(\\dfrac{dy}{dx}\\right)^2\\).",
          answer: "2: the whole equation is scanned, and the highest power of \\(\\dfrac{dy}{dx}\\) is 2",
        },
      ],
      pyqExampleId: "100abd95-eed5-4c60-993e-bf1bd489f82b",
      traps: [
        {
          title: "Reading the degree before expanding",
          body: "\\(\\left(2 + \\dfrac{dy}{dx}\\right)^2 = \\left(\\dfrac{dy}{dx}\\right)^2 + 3x\\) becomes \\(4 + 4\\dfrac{dy}{dx} = 3x\\) after expanding. Its degree is 1, not 2.",
        },
        {
          title: "Leaving d/dx undone",
          body: "The order of \\(\\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right)^2 = 0\\) is 2, because carrying out the derivative brings in \\(\\dfrac{d^2y}{dx^2}\\). Reading it as 1 loses the mark.",
        },
      ],
    },
  ],
};
