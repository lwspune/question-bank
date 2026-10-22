import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_QE_SUM_PRODUCT_NOTE: SubtopicNote = {
  subtopicName: "Sum and Product of the Roots",
  title: "Sum and Product of the Roots",
  oneLineDefinition:
    "For ax² + bx + c = 0 the roots add up to −b/a and multiply to c/a, so an equation can be built from its roots and its roots tested without solving.",
  whyItMatters:
    "Seven questions in the bank: three EASY, three MODERATE and one HARD. They form an equation from its roots, find a coefficient from roots in a ratio or reciprocal roots, or rebuild an equation two students copied wrongly. All of them need only the sum and the product, never the formula.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiqesp-relations",
      name: "Sum and product of the roots from the coefficients",
      intuition:
        "If the roots are α and β, the equation is \\(a(x - \\alpha)(x - \\beta) = 0\\). Multiply it out and compare with \\(ax^2 + bx + c\\): the sum and the product of the roots sit right there in the coefficients.",
      definition:
        "- **Sum:** \\(\\alpha + \\beta = -\\frac{b}{a}\\). **Product:** \\(\\alpha\\beta = \\frac{c}{a}\\).\n" +
        "- Roots in a ratio such as \\(1 : 2\\): call them \\(m\\) and \\(2m\\), then use the sum and the product.\n" +
        "- **Reciprocal roots** (\\(\\alpha\\) and \\(\\frac{1}{\\alpha}\\)): the product is 1, so \\(c = a\\).\n" +
        "- One root given: the product (or the sum) gives the other root at once.",
      formula: {
        label: "Sum and product of roots",
        latex: "\\alpha + \\beta = -\\frac{b}{a} \\qquad \\alpha\\beta = \\frac{c}{a}",
      },
      authoredExample: {
        prompt: "Find the sum and the product of the roots of \\(2x^2 - 8x + 3 = 0\\).",
        steps: [
          "\\(a = 2\\), \\(b = -8\\), \\(c = 3\\).",
          "Sum \\(= -\\frac{b}{a} = \\frac{8}{2} = 4\\).",
          "Product \\(= \\frac{c}{a} = \\frac{3}{2}\\).",
        ],
        answer: "Sum 4, product \\(\\frac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "One root of \\(x^2 - 9x + c = 0\\) is twice the other. Find c.",
        steps: [
          "Let the roots be m and 2m. Sum: \\(3m = 9\\), so \\(m = 3\\).",
          "The roots are 3 and 6, so \\(c = 3 \\times 6 = 18\\).",
          "Check: \\(x^2 - 9x + 18 = (x - 3)(x - 6)\\).",
        ],
        answer: "\\(c = 18\\)",
      },
      practiceSet: [
        { prompt: "What is the sum of the roots of \\(3x^2 + 6x - 2 = 0\\)?", answer: "\\(-\\frac{6}{3} = -2\\)" },
        { prompt: "What is the product of the roots of \\(4x^2 - 7x - 12 = 0\\)?", answer: "\\(-\\frac{12}{4} = -3\\)" },
        { prompt: "The roots of \\(kx^2 - 10x + 4 = 0\\) are reciprocals of each other. Find k.", answer: "Product \\(\\frac{4}{k} = 1\\), so \\(k = 4\\)" },
        { prompt: "One root of \\(x^2 + px + 12 = 0\\) is 3. Find the other root.", answer: "Product 12, so the other root is 4" },
      ],
      pyqExampleId: "77f91f55-6a6f-4e40-aae4-1ab1a715fdfb",
      traps: [
        {
          title: "Forgetting the minus in the sum",
          body: "The sum of the roots is \\(-\\frac{b}{a}\\). For \\(x^2 - 9x + 18 = 0\\) it is \\(+9\\), and for \\(x^2 + 9x + 18 = 0\\) it is \\(-9\\).",
        },
        {
          title: "Not dividing by a",
          body: "For \\(2x^2 - 8x + 3 = 0\\) the product of the roots is \\(\\frac{3}{2}\\), not 3. Divide by a unless a is 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqesp-forming",
      name: "Forming a quadratic equation from its roots",
      intuition:
        "Knowing the two roots is the same as knowing the sum and the product, and those two numbers are all an equation with \\(a = 1\\) needs.",
      definition:
        "- The equation with roots α and β is \\(x^2 - (\\text{sum})x + (\\text{product}) = 0\\).\n" +
        "- The middle term carries a **minus** sign in front of the sum.\n" +
        "- If the sum or product is a fraction, multiply every term by the denominator to clear it.\n" +
        "- Check by factorising: \\(x^2 - 10x + 24 = (x - 4)(x - 6)\\).",
      formula: {
        label: "Equation from its roots",
        latex: "x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0",
      },
      authoredExample: {
        prompt: "Form the quadratic equation whose roots are 3 and \\(-5\\).",
        steps: [
          "Sum \\(= 3 + (-5) = -2\\). Product \\(= 3 \\times (-5) = -15\\).",
          "\\(x^2 - (-2)x + (-15) = 0\\), that is \\(x^2 + 2x - 15 = 0\\).",
        ],
        answer: "\\(x^2 + 2x - 15 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Form the quadratic equation, with whole-number coefficients, whose roots are \\(\\frac{2}{3}\\) and 3.",
        steps: [
          "Sum \\(= \\frac{11}{3}\\), product \\(= 2\\).",
          "\\(x^2 - \\frac{11}{3}x + 2 = 0\\). Multiply by 3: \\(3x^2 - 11x + 6 = 0\\).",
          "Check: \\((3x - 2)(x - 3) = 3x^2 - 11x + 6\\).",
        ],
        answer: "\\(3x^2 - 11x + 6 = 0\\)",
      },
      practiceSet: [
        { prompt: "Form the quadratic equation whose roots are 4 and 6.", answer: "\\(x^2 - 10x + 24 = 0\\)" },
        { prompt: "Form the quadratic equation whose roots are \\(-1\\) and \\(-8\\).", answer: "\\(x^2 + 9x + 8 = 0\\)" },
        { prompt: "Form the quadratic equation, with whole-number coefficients, whose roots are \\(\\frac{1}{2}\\) and \\(-4\\).", answer: "\\(2x^2 + 7x - 4 = 0\\)" },
        { prompt: "Form the quadratic equation whose roots are \\(\\sqrt{3}\\) and \\(-\\sqrt{3}\\).", answer: "\\(x^2 - 3 = 0\\)" },
      ],
      pyqExampleId: "f62ec5a8-69d4-4b98-bbc8-b6ffb88c5a7e",
      traps: [
        {
          title: "Writing plus the sum",
          body: "The equation is \\(x^2 - (\\text{sum})x + \\text{product} = 0\\). Roots 2 and 5 give \\(x^2 - 7x + 10 = 0\\); \\(x^2 + 7x + 10 = 0\\) has the roots \\(-2\\) and \\(-5\\).",
        },
        {
          title: "Leaving fractions in the equation",
          body: "Options are printed with whole-number coefficients. \\(x^2 - \\frac{5}{2}x + 1 = 0\\) appears as \\(2x^2 - 5x + 2 = 0\\), so multiply through before comparing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqesp-wrong-copy",
      name: "Rebuilding an equation from wrongly copied coefficients",
      intuition:
        "A student who copies one coefficient wrongly still gets the other relation right. If the constant term was wrong, the x term was right, so that student's sum of roots is correct. If the x term was wrong, the constant was right, so that student's product is correct.",
      definition:
        "- Constant term copied **wrongly**: trust that student's **sum** of roots.\n" +
        "- Coefficient of x copied **wrongly**: trust that student's **product** of roots.\n" +
        "- Put the trusted sum and product together: \\(x^2 - (\\text{sum})x + \\text{product} = 0\\), then factorise if the roots are asked.",
      authoredExample: {
        prompt: "In solving \\(x^2 + bx + c = 0\\), one student copies the constant term wrongly and gets the roots 1 and 7. Another copies the coefficient of x wrongly and gets the roots 2 and 5. Find the correct equation.",
        steps: [
          "The first student had the right x term, so the sum is \\(1 + 7 = 8\\).",
          "The second had the right constant, so the product is \\(2 \\times 5 = 10\\).",
          "Correct equation: \\(x^2 - 8x + 10 = 0\\).",
        ],
        answer: "\\(x^2 - 8x + 10 = 0\\)",
      },
      selfCheckExample: {
        prompt: "In solving \\(x^2 + bx + c = 0\\), one student copies b wrongly and gets the roots \\(-2\\) and 6. Another copies c wrongly and gets the roots 3 and \\(-2\\). Find the correct roots.",
        steps: [
          "Right product from the first: \\(-12\\). Right sum from the second: \\(1\\).",
          "\\(x^2 - x - 12 = 0\\), that is \\((x - 4)(x + 3) = 0\\).",
        ],
        answer: "4 and \\(-3\\)",
      },
      practiceSet: [
        { prompt: "A student copies the constant term of \\(x^2 + bx + c = 0\\) wrongly and gets the roots 4 and 5. What is the correct value of b?", answer: "The sum 9 is right, so \\(b = -9\\)" },
        { prompt: "A student copies the coefficient of x in \\(x^2 + bx + c = 0\\) wrongly and gets the roots 2 and \\(-7\\). What is the correct value of c?", answer: "The product is right, so \\(c = -14\\)" },
      ],
      pyqExampleId: "de951b7f-f259-46d3-9845-fd811ac877f0",
      traps: [
        {
          title: "Trusting the wrong student's sum",
          body: "A student who copied the coefficient of x wrongly has a wrong sum of roots. Take only the product from that student, and the sum from the one who got the x term right.",
        },
      ],
    },
  ],
};
