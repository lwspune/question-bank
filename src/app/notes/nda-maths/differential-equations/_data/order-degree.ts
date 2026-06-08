import type { SubtopicNote } from "@/app/notes/_types";

export const ORDER_DEGREE_NOTE: SubtopicNote = {
  subtopicName: "Order, Degree, and Solutions of ODE",
  title: "Order, Degree and Solutions",
  oneLineDefinition:
    "The order of a differential equation is the highest derivative present; the degree is the power of that highest derivative once the equation is made polynomial in its derivatives; the number of arbitrary constants in a solution equals the order.",
  whyItMatters:
    "Start here — and bank the easy marks. 22 PYQs, and many simply ask for order and/or degree, which is pure definition once you handle one trap: clear radicals and fractional powers first. The rest connect a solution's arbitrary constants to the order.",
  concepts: [
    // 1 — order and degree
    {
      kind: "formula" as const,
      slug: "order-and-degree",
      name: "Order and degree of a differential equation",
      intuition:
        "Order counts how many times you have differentiated — it is the highest derivative that appears. Degree is the exponent on that highest derivative, but ONLY after you have cleared away any radicals or fractional powers so the equation is polynomial in its derivatives. If a derivative is trapped inside a trig or log, the degree simply does not exist.",
      definition:
        "The two classifiers:\n" +
        "- **Order** = the order of the **highest derivative** present (e.g. \\(d^2y/dx^2\\) gives order 2).\n" +
        "- **Degree** = the **power of the highest-order derivative** AFTER the equation is made free of radicals and fractional powers (made polynomial in the derivatives).\n" +
        "- **Degree is undefined** when a derivative appears inside a transcendental function, e.g. \\(\\cos\\!\\big(\\tfrac{dy}{dx}\\big)\\) or \\(\\ln\\!\\big(\\tfrac{dy}{dx}\\big)\\).\n" +
        "- Tip: \\(\\dfrac{dx}{dy} = \\Big(\\dfrac{dy}{dx}\\Big)^{-1}\\) — rewrite mixed derivatives in one form before reading the degree.",
      authoredExample: {
        prompt:
          "Find the order and degree of \\(\\Big(\\dfrac{d^2y}{dx^2}\\Big)^{2} = 1 + \\Big(\\dfrac{dy}{dx}\\Big)^{3}\\).",
        steps: [
          "Highest derivative present is \\(\\dfrac{d^2y}{dx^2}\\) → order 2.",
          "The equation is already polynomial in the derivatives (no radicals).",
          "The power of \\(\\dfrac{d^2y}{dx^2}\\) is 2 → degree 2.",
        ],
        answer: "Order 2, degree 2.",
      },
      selfCheckExample: {
        prompt:
          "Find the order and degree of \\(k\\dfrac{d^2y}{dx^2} = \\Big[1 + \\Big(\\dfrac{dy}{dx}\\Big)^{2}\\Big]^{2/3}\\).",
        steps: [
          "Highest derivative is \\(\\dfrac{d^2y}{dx^2}\\) → order 2.",
          "Clear the fractional power: cube both sides → \\(k^3\\Big(\\dfrac{d^2y}{dx^2}\\Big)^{3} = \\big[1+(y')^2\\big]^{2}\\).",
          "Now the power of \\(\\dfrac{d^2y}{dx^2}\\) is 3 → degree 3.",
        ],
        answer: "Order 2, degree 3.",
      },
      practiceSet: [
        { prompt: "Order and degree of \\(\\big(\\frac{d^3y}{dx^3}\\big)^2 = y^4 + \\big(\\frac{dy}{dx}\\big)^5\\)?", answer: "Order 3, degree 2" },
        { prompt: "Degree of \\(\\frac{dy}{dx} + \\cos\\!\\big(\\frac{dy}{dx}\\big) = 0\\)?", answer: "Undefined", method: "a derivative is inside \\(\\cos\\)" },
        { prompt: "After squaring \\(\\big(\\frac{d^2y}{dx^2}\\big)^{3/2} = \\big(\\frac{dy}{dx}\\big)^{5/2}\\), the degree is?", answer: "3", method: "\\((y'')^3=(y')^5\\)" },
        { prompt: "Order of \\(x^2\\frac{d^3y}{dx^3} - \\frac{dy}{dx} = 0\\)?", answer: "3" },
      ],
      pyqExampleId: "ea9e8dd1-1fb9-44dd-b78b-a853f0318cab", // integral ODE order 2 degree 3
      traps: [
        {
          title: "Clear fractional powers BEFORE reading the degree",
          body:
            "The degree is NOT the fractional exponent you see. For \\(\\big(2-(y')^2\\big)^{0.6} = y''\\), raise to the 5th power to get \\(\\big(2-(y')^2\\big)^3 = (y'')^5\\): the degree is 5, not 0.6. Make it polynomial first.",
        },
      ],
    },

    // 2 — solutions and arbitrary constants
    {
      kind: "formula" as const,
      slug: "solutions-and-arbitrary-constants",
      name: "Solutions and arbitrary constants",
      intuition:
        "A general solution carries one arbitrary constant for each integration — so the number of arbitrary constants equals the order of the equation. Turn that around: to find the order of the ODE behind a given family, just count its independent arbitrary constants.",
      definition:
        "Solutions and what they tell you:\n" +
        "- A **general solution** of an order-\\(n\\) ODE contains exactly \\(n\\) **arbitrary constants**; a **particular solution** fixes them via conditions.\n" +
        "- So the **order = number of independent arbitrary constants** in the family. \\(y=a\\cos x+b\\sin x\\) (two constants) → order 2.\n" +
        "- An ODE like \\(\\dfrac{d^2y}{dx^2}+k^2y=0\\) has **periodic (SHM)** solutions; \\(\\dfrac{d^2y}{dx^2}-k^2y=0\\) gives exponential growth.",
      authoredExample: {
        prompt: "What is the order of the differential equation whose general solution is \\(y = c_1 e^{2x} + c_2 e^{-3x}\\)?",
        steps: [
          "Count the independent arbitrary constants: \\(c_1\\) and \\(c_2\\) — two of them.",
          "Order = number of arbitrary constants.",
        ],
        answer: "Order 2.",
      },
      selfCheckExample: {
        prompt: "What is the order of the differential equation whose solution is \\(y = a\\cos x + b\\sin x\\)?",
        steps: [
          "There are two independent arbitrary constants, \\(a\\) and \\(b\\).",
          "Order = number of arbitrary constants = 2.",
        ],
        answer: "Order 2.",
      },
      practiceSet: [
        { prompt: "A general solution has 3 arbitrary constants. The ODE's order is?", answer: "3" },
        { prompt: "Which has periodic solutions: \\(y''+9y=0\\) or \\(y''-9y=0\\)?", answer: "\\(y''+9y=0\\)", method: "the \\(+\\) sign gives SHM" },
        { prompt: "Order of the ODE of all circles with centre on the x-axis (one free constant)?", answer: "1... actually 2 constants (centre + radius) → 2", method: "count independent constants" },
      ],
      pyqExampleId: "54a4d934-8474-40b4-ab90-9245e4339c14", // order of y=acosx+bsinx
      traps: [
        {
          title: "Count INDEPENDENT constants",
          body:
            "\\(y=A[\\sin(x+C)+\\cos(x+C)]\\) looks like two constants, but it collapses to \\(B\\sin(x+D)\\) — still two independent constants, so order 2 (giving \\(y''+y=0\\)). Combine first; constants that merge don't each count.",
        },
      ],
    },
  ],
};
