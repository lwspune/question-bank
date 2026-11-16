import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_UM_ERRORS_NOTE: SubtopicNote = {
  subtopicName: "Errors in Measurement",
  title: "Errors in Measurement",
  oneLineDefinition:
    "Every measurement carries some error: the kinds of error, how big an error is, and how the errors of measured values carry into a result worked out from them.",
  whyItMatters:
    "Four NEET questions, from 2023 to 2025. One asks which kind of error comes from unpredictable changes in temperature and supply voltage (2023). Three combine errors: a wire's density from its mass, radius and length (2023), a resistance from a voltage and a current each given with its error (Re-NEET 2024), and the percentage error of a product of powers (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphum-error-types",
      name: "Kinds of error, and how big an error is",
      intuition:
        "No measurement is perfect. Some errors push every reading the same way, like a scale whose zero is off: these are systematic. Others push readings up and down at random, like a sudden change in room temperature: these are random, and they shrink when you repeat the measurement and take the mean.",
      definition:
        "- **Systematic errors** push readings in one direction: instrumental errors, errors from an imperfect method, and personal errors of the observer.\n" +
        "- **Random errors** come from unpredictable changes in the conditions, such as temperature, pressure or supply voltage. They are reduced by taking many readings and averaging.\n" +
        "- **Least count error** comes from the smallest division the instrument can read.\n" +
        "- For readings \\(a_1, a_2, \\ldots, a_n\\): the mean \\(\\bar{a}\\) is the best value, the **absolute error** of each is \\(|a_i - \\bar{a}|\\), and the **mean absolute error** \\(\\Delta\\bar{a}\\) is their average.\n" +
        "- **Relative error** \\(= \\dfrac{\\Delta\\bar{a}}{\\bar{a}}\\); **percentage error** \\(= \\dfrac{\\Delta\\bar{a}}{\\bar{a}} \\times 100\\%\\). The result is written \\(\\bar{a} \\pm \\Delta\\bar{a}\\).\n" +
        "- **Accuracy** is how close a value is to the true value. **Precision** is the resolution, the limit to which it is measured.",
      table: {
        columns: ["Error", "Cause", "How to reduce it"],
        rows: [
          { cells: ["Instrumental error", "Faulty design or calibration, such as a zero error", "Correct for it, or use a better instrument"] },
          { cells: ["Error of method", "An imperfect technique, such as a thermometer under the armpit reading below the true body temperature", "Improve the procedure"] },
          { cells: ["Personal error", "The observer's bias or carelessness, such as reading a scale at an angle (parallax)", "Take care while reading"] },
          {
            cells: ["Random error", "Unpredictable changes in temperature, pressure or supply voltage", "Repeat many times and take the mean"],
            noteAmber: "NEET 2023 asked which error comes from unpredictable changes in temperature and voltage supply: random errors.",
          },
          { cells: ["Least count error", "The smallest division the instrument can show", "Use a finer instrument and repeat the reading"] },
        ],
        caption: "The first three are systematic: they push every reading the same way, so averaging does not remove them.",
      },
      selfCheckExample: {
        prompt: "A length is read four times as 5.2 cm, 5.4 cm, 5.3 cm and 5.1 cm. Find the mean, the mean absolute error and the percentage error.",
        steps: [
          "Mean: \\(\\dfrac{5.2 + 5.4 + 5.3 + 5.1}{4} = \\dfrac{21.0}{4} = 5.25\\ \\text{cm}\\).",
          "Absolute errors: 0.05, 0.15, 0.05, 0.15 cm. Their mean is \\(\\dfrac{0.40}{4} = 0.10\\ \\text{cm}\\).",
          "Percentage error: \\(\\dfrac{0.10}{5.25} \\times 100 \\approx 1.9\\%\\).",
        ],
        answer: "5.25 cm, 0.10 cm, about 1.9%",
      },
      practiceSet: [
        { prompt: "Is the error caused by a zero error in an instrument systematic or random?", answer: "Systematic" },
        { prompt: "Which error comes from reading a scale at an angle?", answer: "Personal error (parallax)" },
        { prompt: "A length is \\((20.0 \\pm 0.2)\\ \\text{cm}\\). What is its percentage error?", answer: "1%" },
        { prompt: "What does precision describe?", answer: "The resolution, or limit, to which a quantity is measured" },
      ],
      pyqExampleId: "75534fc0-6c62-493d-86a1-f29834c08108",
      traps: [
        {
          title: "Averaging only beats random errors",
          body: "Repeating a reading and taking the mean reduces random errors. A systematic error, such as a zero error, stays in every reading and in the mean.",
        },
        {
          title: "Precise is not the same as accurate",
          body: "Readings can agree closely with each other and still all be wrong by the same amount. That is high precision and low accuracy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-plus-minus",
      name: "Combining errors in sums, differences, products and quotients",
      intuition:
        "Errors always make a result less certain, never more. When you add or subtract two values, their absolute errors add, even for a difference. When you multiply or divide, it is the relative errors that add. Take the worst case: assume every error pushes the same way.",
      definition:
        "- **Sum or difference,** \\(Z = A \\pm B\\): \\(\\Delta Z = \\Delta A + \\Delta B\\). The absolute errors add.\n" +
        "- **Product or quotient,** \\(Z = AB\\) or \\(Z = A/B\\): \\(\\dfrac{\\Delta Z}{Z} = \\dfrac{\\Delta A}{A} + \\dfrac{\\Delta B}{B}\\). The relative errors add.\n" +
        "- To give a product or quotient as \\(Z \\pm \\Delta Z\\): find Z, add the relative errors, then multiply that sum by Z.",
      formula: {
        label: "Combining errors",
        latex: "Z = A \\pm B:\\ \\Delta Z = \\Delta A + \\Delta B, \\qquad Z = AB \\text{ or } \\frac{A}{B}:\\ \\frac{\\Delta Z}{Z} = \\frac{\\Delta A}{A} + \\frac{\\Delta B}{B}",
      },
      authoredExample: {
        prompt: "The temperatures of a liquid before and after heating are \\((25.3 \\pm 0.2)\\) °C and \\((40.6 \\pm 0.2)\\) °C. Find the rise in temperature with its error.",
        steps: [
          "Rise: \\(40.6 - 25.3 = 15.3\\) °C.",
          "This is a difference, so the absolute errors add: \\(0.2 + 0.2 = 0.4\\) °C.",
        ],
        answer: "\\((15.3 \\pm 0.4)\\) °C",
      },
      selfCheckExample: {
        prompt: "A rectangle measures \\((10.0 \\pm 0.1)\\ \\text{cm}\\) by \\((5.0 \\pm 0.1)\\ \\text{cm}\\). Find its perimeter with the error.",
        steps: [
          "Perimeter: \\(2(10.0 + 5.0) = 30.0\\ \\text{cm}\\).",
          "Each side appears twice, so the error is \\(2(0.1 + 0.1) = 0.4\\ \\text{cm}\\).",
        ],
        answer: "\\((30.0 \\pm 0.4)\\ \\text{cm}\\)",
      },
      practiceSet: [
        { prompt: "Add \\((25.2 \\pm 0.1)\\ \\text{cm}\\) and \\((14.6 \\pm 0.2)\\ \\text{cm}\\).", answer: "\\((39.8 \\pm 0.3)\\ \\text{cm}\\)" },
        { prompt: "Two masses are \\((5.0 \\pm 0.1)\\ \\text{g}\\) and \\((3.0 \\pm 0.1)\\ \\text{g}\\). Find their difference with the error.", answer: "\\((2.0 \\pm 0.2)\\ \\text{g}\\)" },
        { prompt: "For \\(Z = AB\\), write the relative error of Z.", answer: "\\(\\dfrac{\\Delta Z}{Z} = \\dfrac{\\Delta A}{A} + \\dfrac{\\Delta B}{B}\\)" },
        { prompt: "A time is \\((50.0 \\pm 0.5)\\ \\text{s}\\). What is its percentage error?", answer: "1%" },
      ],
      pyqExampleId: "c3d129f5-580e-4943-a9ef-be6275770b94",
      traps: [
        {
          title: "A difference still adds the errors",
          body: "For \\(Z = A - B\\) the error is \\(\\Delta A + \\Delta B\\), never \\(\\Delta A - \\Delta B\\). Errors never cancel.",
        },
        {
          title: "Absolute for sums, relative for products",
          body: "In a sum the absolute errors add; in a product or quotient the relative (or percentage) errors add. Adding absolute errors for a quotient gives a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-power-rule",
      name: "Errors in a product of powers",
      intuition:
        "If a measured value is squared, its error counts twice; if it is cubed, three times. A square root counts half. So in a formula built from powers, each relative error is multiplied by its power, and then they are all added, whether the quantity is on top or at the bottom.",
      definition:
        "- For \\(Z = \\dfrac{A^{p}B^{q}}{C^{r}}\\): \\(\\dfrac{\\Delta Z}{Z} = p\\dfrac{\\Delta A}{A} + q\\dfrac{\\Delta B}{B} + r\\dfrac{\\Delta C}{C}\\).\n" +
        "- Every term is added, including those in the denominator. A square root brings a factor \\(\\tfrac{1}{2}\\).\n" +
        "- Exact numbers such as \\(\\tfrac{1}{2}\\), \\(\\pi\\) or \\(4\\pi^{2}\\) carry no error.\n" +
        "- The quantity with the highest power brings in the largest share of the error, so it should be measured most carefully.",
      formula: {
        label: "Error in a product of powers",
        latex: "Z = \\frac{A^{p}B^{q}}{C^{r}} \\ \\Rightarrow\\ \\frac{\\Delta Z}{Z} = p\\frac{\\Delta A}{A} + q\\frac{\\Delta B}{B} + r\\frac{\\Delta C}{C}",
      },
      authoredExample: {
        prompt: "In a pendulum experiment \\(g = \\dfrac{4\\pi^{2}l}{T^{2}}\\). The length l is measured with a 2% error and the period T with a 1% error. Find the percentage error in g.",
        steps: [
          "\\(4\\pi^{2}\\) is exact, so it adds nothing.",
          "\\(\\dfrac{\\Delta g}{g} = \\dfrac{\\Delta l}{l} + 2\\dfrac{\\Delta T}{T}\\).",
          "\\(= 2\\% + 2 \\times 1\\% = 4\\%\\).",
        ],
        answer: "4%",
      },
      selfCheckExample: {
        prompt: "The radius of a sphere is measured with a 0.5% error. What is the percentage error in its volume?",
        steps: [
          "\\(V = \\tfrac{4}{3}\\pi r^{3}\\), so \\(\\dfrac{\\Delta V}{V} = 3\\dfrac{\\Delta r}{r}\\).",
          "\\(3 \\times 0.5\\% = 1.5\\%\\).",
        ],
        answer: "1.5%",
      },
      practiceSet: [
        { prompt: "Mass is measured with a 1% error and speed with a 2% error. What is the maximum percentage error in kinetic energy?", answer: "5%" },
        { prompt: "The side of a cube is measured with a 2% error. What is the percentage error in its volume?", answer: "6%" },
        { prompt: "In \\(Z = \\dfrac{A^{4}B}{C^{2}}\\), with all three measured to the same percentage error, which quantity brings in the largest error?", answer: "A" },
        { prompt: "Does the factor \\(\\pi\\) in a formula add to the percentage error?", answer: "No; exact numbers carry no error" },
      ],
      pyqExampleId: "ac942892-54ec-4d4a-a2b7-cbb86cbe63c8",
      traps: [
        {
          title: "The power multiplies the error",
          body: "For \\(r^{2}\\) the relative error is \\(2\\dfrac{\\Delta r}{r}\\). Leaving out the 2 is the most common slip in a density or volume question.",
        },
        {
          title: "Denominator terms are added too",
          body: "A quantity in the denominator still adds its error. In \\(Z = A/C^{2}\\) the error is \\(\\dfrac{\\Delta A}{A} + 2\\dfrac{\\Delta C}{C}\\), not a difference.",
        },
        {
          title: "A square root halves the error",
          body: "For \\(\\sqrt{d}\\) the relative error is \\(\\tfrac{1}{2}\\dfrac{\\Delta d}{d}\\). A 6% error in d becomes 3%, not 6% or 12%.",
        },
      ],
    },
  ],
};
