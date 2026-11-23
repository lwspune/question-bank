import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DE_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Order and Degree of a Differential Equation",
  title: "Order and Degree of a Differential Equation",
  oneLineDefinition:
    "The order of a differential equation is the order of the highest derivative in it; the degree is the power of that highest derivative once the equation is a polynomial in the derivatives.",
  whyItMatters:
    "31 questions, six of them from board papers, all short ones: the degree of an equation written with y′, y″ and y‴ (2022, 2026), the order of an equation with fractional powers (2025, 2026), an equation whose degree is not defined (2023) and an MCQ on order and degree (2020). The textbook rows are the solved examples of section 6.2, Exercise 6.1 and Question 1 of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmde-order",
      name: "Order and degree of a polynomial differential equation",
      intuition:
        "A differential equation is an equation that contains the derivative of a function. Its order tells you how many times y has been differentiated at most. Its degree is the power on that highest derivative. Powers on lower derivatives, on y or on x do not count.",
      definition:
        "- A **differential equation** is an equation which contains the derivative of a function.\n" +
        "- **Order:** the highest order of the derivative appearing in the equation.\n" +
        "- **Degree:** the power of the highest ordered derivative, when every derivative carries a positive integer index.\n" +
        "- \\(\\dfrac{dy}{dx}\\), \\(\\dfrac{d^2y}{dx^2}\\), \\(\\dfrac{d^3y}{dx^3}\\) are also written \\(y'\\), \\(y''\\), \\(y'''\\).\n" +
        "- The order and degree of a differential equation are always positive integers.\n" +
        "- Board layout: name the highest derivative, write 'order = ...', then write 'its power is ..., so degree = ...'.",
      formula: {
        label: "Order and degree",
        latex: "\\text{order} = \\text{order of the highest derivative}, \\qquad \\text{degree} = \\text{power of the highest derivative}",
      },
      authoredExample: {
        prompt:
          "Find the order and degree of \\(x\\dfrac{d^3y}{dx^3} + \\left(\\dfrac{d^2y}{dx^2}\\right)^2 - 5\\dfrac{dy}{dx} = \\sin x\\).",
        steps: [
          "The derivatives present are \\(\\dfrac{dy}{dx}\\) (order 1), \\(\\dfrac{d^2y}{dx^2}\\) (order 2) and \\(\\dfrac{d^3y}{dx^3}\\) (order 3).",
          "The highest derivative is \\(\\dfrac{d^3y}{dx^3}\\), so the order is 3.",
          "Every derivative has a positive integer index, so the equation is a polynomial in the derivatives.",
          "The power of \\(\\dfrac{d^3y}{dx^3}\\) is 1. The square belongs to \\(\\dfrac{d^2y}{dx^2}\\), a lower derivative, so it does not decide the degree.",
          "Hence the degree is 1.",
        ],
        answer: "Order 3, degree 1",
      },
      selfCheckExample: {
        prompt: "Find the order and degree of \\(\\left(\\dfrac{dy}{dx}\\right)^3 + 2y = e^x\\).",
        steps: [
          "The only derivative is \\(\\dfrac{dy}{dx}\\), so the order is 1.",
          "Its power is 3, so the degree is 3.",
        ],
        answer: "Order 1, degree 3",
      },
      practiceSet: [
        { prompt: "What is the order of \\(\\dfrac{d^4y}{dx^4} + y = 0\\)?", answer: "4" },
        { prompt: "Find the order and degree of \\(x^2\\dfrac{d^2y}{dx^2} - x\\dfrac{dy}{dx} + y = 0\\).", answer: "Order 2, degree 1" },
        { prompt: "Can the degree of a differential equation be \\(\\dfrac{1}{2}\\)?", answer: "No, order and degree are always positive integers" },
      ],
      pyqExampleId: "0d23dac8-d236-4fd5-b75e-75875cd1c1be",
      traps: [
        {
          title: "Taking the biggest power in the equation as the degree",
          body: "The degree is the power of the highest order derivative only. A cube on \\(y''\\) does not count when \\(y'''\\) is present: look first for the highest derivative, then read its power.",
        },
        {
          title: "Letting powers of y or x change the answer",
          body: "Terms such as \\(y^3\\), \\(5xy\\) or \\(x^2\\) are not derivatives, so they affect neither the order nor the degree. Only the derivatives are counted.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-radical",
      name: "Clearing roots and fractions before finding the degree",
      intuition:
        "The degree is read only when every derivative carries a positive whole-number power. A square root, a cube root or a fractional power on a derivative must be cleared first by raising both sides to a power, and a derivative in a denominator by multiplying across. The order needs no clearing: it is read straight away.",
      definition:
        "- **Step 1:** keep the root on one side by itself.\n" +
        "- **Step 2:** raise both sides to the power that clears it (square for \\(\\sqrt{\\ }\\), cube for \\(\\sqrt[3]{\\ }\\)); multiply across by any derivative in a denominator.\n" +
        "- **Step 3:** expand fully, then read the power of the highest derivative.\n" +
        "- Clearing a root never changes the order, because no derivative of a new order appears.",
      formula: {
        label: "Clearing a fractional power",
        latex: "\\left(\\dfrac{d^2y}{dx^2}\\right)^{\\frac{p}{q}} = f \\;\\Rightarrow\\; \\left(\\dfrac{d^2y}{dx^2}\\right)^{p} = f^{\\,q}",
      },
      authoredExample: {
        prompt: "Find the order and degree of \\(\\dfrac{d^2y}{dx^2} = \\sqrt{1 + \\left(\\dfrac{dy}{dx}\\right)^3}\\).",
        steps: [
          "The highest derivative is \\(\\dfrac{d^2y}{dx^2}\\), so the order is 2.",
          "Squaring both sides to clear the root: \\(\\left(\\dfrac{d^2y}{dx^2}\\right)^2 = 1 + \\left(\\dfrac{dy}{dx}\\right)^3\\).",
          "Now every derivative has a positive integer index, and the power of \\(\\dfrac{d^2y}{dx^2}\\) is 2.",
          "Hence the degree is 2.",
        ],
        answer: "Order 2, degree 2",
      },
      selfCheckExample: {
        prompt: "Find the order and degree of \\(\\dfrac{dy}{dx} + \\dfrac{4}{\\dfrac{dy}{dx}} = x\\).",
        steps: [
          "Multiply by \\(\\dfrac{dy}{dx}\\): \\(\\left(\\dfrac{dy}{dx}\\right)^2 + 4 = x\\dfrac{dy}{dx}\\).",
          "The highest derivative is \\(\\dfrac{dy}{dx}\\) and its power is 2.",
        ],
        answer: "Order 1, degree 2",
      },
      practiceSet: [
        {
          prompt: "Find the degree of \\(\\left(\\dfrac{d^3y}{dx^3}\\right)^{\\frac{2}{3}} = \\dfrac{dy}{dx} + 1\\).",
          answer: "Cubing gives \\(\\left(\\dfrac{d^3y}{dx^3}\\right)^2 = \\left(\\dfrac{dy}{dx} + 1\\right)^3\\), so the degree is 2",
        },
        {
          prompt: "Find the order and degree of \\(y = x\\dfrac{dy}{dx} + \\sqrt{1 + \\left(\\dfrac{dy}{dx}\\right)^2}\\).",
          answer: "Squaring \\(y - x\\dfrac{dy}{dx}\\) gives \\(\\left(x^2 - 1\\right)\\left(\\dfrac{dy}{dx}\\right)^2 - 2xy\\dfrac{dy}{dx} + y^2 - 1 = 0\\): order 1, degree 2",
        },
        { prompt: "Does squaring both sides of a differential equation change its order?", answer: "No, it changes only the powers, never the highest derivative" },
      ],
      pyqExampleId: "4c554673-8b99-467a-b6ba-806a198e360f",
      traps: [
        {
          title: "Reading the degree off a fractional power",
          body: "A power such as \\(\\dfrac{3}{2}\\) on a derivative is not a degree. Clear the fraction first: degree is a positive integer, never \\(\\dfrac{3}{2}\\) or \\(\\dfrac{1}{2}\\).",
        },
        {
          title: "Not expanding after squaring",
          body: "In \\(x + \\dfrac{d^2y}{dx^2} = \\sqrt{1 + \\left(\\dfrac{d^2y}{dx^2}\\right)^2}\\), squaring gives \\(\\left(\\dfrac{d^2y}{dx^2}\\right)^2\\) on both sides, and they cancel. What is left has \\(\\dfrac{d^2y}{dx^2}\\) to the power 1, so the degree is 1, not 2. Expand and simplify before you read the power.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-undefined",
      name: "When the degree is not defined",
      intuition:
        "If a derivative sits inside a function such as e to the power, sine, cosine or tangent, no power can bring it out. The equation then cannot be written as a polynomial in the derivatives, and its degree is not defined. The order is still defined: it is read from the highest derivative as usual.",
      definition:
        "- The degree is defined only when the equation can be expressed as a polynomial in the derivatives.\n" +
        "- A derivative inside \\(e^{(\\ )}\\), \\(\\sin\\), \\(\\cos\\) or \\(\\tan\\), added to other terms, cannot be cleared by any power, so the degree is **not defined**.\n" +
        "- The order is always defined.\n" +
        "- A function of \\(x\\) alone, such as \\(e^x\\) or \\(\\sin x\\), is harmless: it is not a derivative.\n" +
        "- Board answer: 'order = ...; the equation cannot be expressed as a polynomial in the derivatives, so the degree is not defined'.",
      formula: {
        label: "Degree not defined",
        latex: "\\dfrac{d^2y}{dx^2} + \\cos\\left(\\dfrac{dy}{dx}\\right) = 0: \\quad \\text{order } 2, \\text{ degree not defined}",
      },
      authoredExample: {
        prompt: "Find the order and degree of \\(\\dfrac{d^2y}{dx^2} + x\\tan\\left(\\dfrac{dy}{dx}\\right) = 0\\).",
        steps: [
          "The highest derivative is \\(\\dfrac{d^2y}{dx^2}\\), so the order is 2.",
          "\\(\\dfrac{dy}{dx}\\) is inside \\(\\tan\\), and no power can bring it out.",
          "So the equation cannot be expressed as a polynomial in the derivatives.",
        ],
        answer: "Order 2, degree not defined",
      },
      selfCheckExample: {
        prompt: "Find the order and degree of \\(\\dfrac{d^3y}{dx^3} = \\sin\\left(\\dfrac{d^2y}{dx^2}\\right)\\).",
        steps: [
          "The highest derivative is \\(\\dfrac{d^3y}{dx^3}\\), so the order is 3.",
          "\\(\\dfrac{d^2y}{dx^2}\\) is inside \\(\\sin\\), so the equation is not a polynomial in the derivatives.",
        ],
        answer: "Order 3, degree not defined",
      },
      practiceSet: [
        { prompt: "Is the degree of \\(\\dfrac{dy}{dx} + e^{x} = y\\) defined?", answer: "Yes, \\(e^x\\) does not contain a derivative; the degree is 1" },
        { prompt: "Write the order of \\(\\sin\\left(\\dfrac{d^2y}{dx^2}\\right) + \\dfrac{dy}{dx} = 0\\).", answer: "2" },
      ],
      pyqExampleId: "6c74c564-b4d8-4480-ba23-d3130a4a2cf1",
      traps: [
        {
          title: "Saying the order is not defined too",
          body: "Only the degree fails. The order is still the highest derivative present, so write both parts: the order as a number and 'degree not defined'.",
        },
        {
          title: "Confusing a function of x with a function of the derivative",
          body: "\\(e^{x}\\), \\(\\sin x\\) and \\(\\log x\\) are ordinary terms and leave the degree defined. Only a derivative inside such a function makes the degree undefined.",
        },
      ],
    },
  ],
};
