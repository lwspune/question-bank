import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PO_DIVISION_NOTE: SubtopicNote = {
  subtopicName: "Division Algorithm, Remainder and Factor Theorems",
  title: "Division Algorithm, Remainder and Factor Theorems",
  oneLineDefinition:
    "Dividing p(x) by g(x) gives a quotient and a remainder of lower degree than g(x); the remainder on dividing by x − a is p(a), and x − a is a factor exactly when p(a) = 0.",
  whyItMatters:
    "Ten questions in the bank: two EASY, six MODERATE and two HARD, the hardest block in the chapter. Long division gives the quotient, but most of these are faster by the remainder theorem: put one number into the polynomial instead of dividing.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spipodi-algorithm",
      name: "The division algorithm for polynomials",
      intuition:
        "Polynomial division works like long division of numbers. At each step divide the leading term by the divisor's leading term, multiply back, subtract, and carry on until what is left has a lower degree than the divisor. That leftover is the remainder.",
      definition:
        "- \\(p(x) = g(x) \\times q(x) + r(x)\\): dividend \\(=\\) divisor \\(\\times\\) quotient \\(+\\) remainder.\n" +
        "- The remainder has a **lower degree** than the divisor (or is 0).\n" +
        "- Degree of the quotient \\(=\\) degree of the dividend \\(-\\) degree of the divisor.\n" +
        "- Write a missing power with a 0 coefficient before dividing, so the columns line up.\n" +
        "- **Divisible** means the remainder is 0. If \\(g(x)\\) divides \\(p(x)\\), you can write \\(p(x) = g(x) \\times (\\text{unknown quotient})\\) and compare coefficients.",
      formula: {
        label: "Division algorithm",
        latex: "p(x) = g(x)\\,q(x) + r(x), \\quad \\deg r < \\deg g \\qquad \\deg q = \\deg p - \\deg g",
      },
      authoredExample: {
        prompt: "Divide \\(2x^3 + 3x^2 - x + 5\\) by \\(x + 2\\).",
        steps: [
          "\\(2x^2(x + 2) = 2x^3 + 4x^2\\). Subtract: \\(-x^2 - x + 5\\).",
          "\\(-x(x + 2) = -x^2 - 2x\\). Subtract: \\(x + 5\\).",
          "\\(1(x + 2) = x + 2\\). Subtract: 3.",
          "Check: \\((x + 2)(2x^2 - x + 1) + 3 = 2x^3 + 3x^2 - x + 5\\).",
        ],
        answer: "Quotient \\(2x^2 - x + 1\\), remainder 3",
      },
      selfCheckExample: {
        prompt: "Divide \\(x^2 + 5x + 9\\) by \\(x + 2\\).",
        steps: ["\\(x(x + 2) = x^2 + 2x\\). Subtract: \\(3x + 9\\).", "\\(3(x + 2) = 3x + 6\\). Subtract: 3."],
        answer: "Quotient \\(x + 3\\), remainder 3",
      },
      practiceSet: [
        { prompt: "A polynomial of degree 6 is divided by a polynomial of degree 2. What is the degree of the quotient?", answer: "4" },
        { prompt: "A polynomial is divided by a cubic polynomial. What is the greatest possible degree of the remainder?", answer: "2" },
        { prompt: "Divide \\(x^2 + 9x + 20\\) by \\(x + 4\\).", answer: "Quotient \\(x + 5\\), remainder 0" },
        { prompt: "Divide \\(x^3 - 1\\) by \\(x - 1\\).", answer: "Quotient \\(x^2 + x + 1\\), remainder 0" },
      ],
      pyqExampleId: "75f2987a-06f6-4b4c-8805-c71b169addd8",
      traps: [
        {
          title: "Skipping a missing power",
          body: "\\(x^3 - 7x + 6\\) has no \\(x^2\\) term. Write it as \\(x^3 + 0x^2 - 7x + 6\\) before dividing, or the subtraction lines up the wrong columns.",
        },
        {
          title: "Expecting a number as every remainder",
          body: "The remainder only has to be of lower degree than the divisor. Divided by a quadratic, the remainder can be linear, such as \\(3x + 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipodi-remainder",
      name: "The remainder theorem",
      intuition:
        "Put \\(x = a\\) into \\(p(x) = (x - a)q(x) + r\\). The first part becomes 0, so \\(p(a) = r\\). The remainder on dividing by \\(x - a\\) is just the value of the polynomial at a, with no division needed.",
      definition:
        "- The remainder when \\(p(x)\\) is divided by \\(x - a\\) is \\(p(a)\\).\n" +
        "- For a divisor \\(x + a\\), put \\(x = -a\\). For \\(ax - b\\), put \\(x = \\frac{b}{a}\\).\n" +
        "- The number to **subtract** to make \\(p(x)\\) exactly divisible by \\(x - a\\) is the remainder \\(p(a)\\).",
      formula: {
        label: "Remainder theorem",
        latex: "\\text{remainder of } p(x) \\div (x - a) = p(a)",
      },
      authoredExample: {
        prompt: "Find the remainder when \\(x^3 - 3x^2 + 4x - 5\\) is divided by \\(x - 2\\).",
        steps: ["Put \\(x = 2\\): \\(8 - 12 + 8 - 5\\).", "\\(= -1\\)."],
        answer: "\\(-1\\)",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(2x^3 + x^2 - 3\\) is divided by \\(x + 1\\).",
        steps: ["Put \\(x = -1\\): \\(-2 + 1 - 3 = -4\\)."],
        answer: "\\(-4\\)",
      },
      practiceSet: [
        { prompt: "What is the remainder when \\(x^2 + 4x + 7\\) is divided by \\(x - 1\\)?", answer: "\\(1 + 4 + 7 = 12\\)" },
        { prompt: "What is the remainder when \\(x^3 + 8\\) is divided by \\(x + 2\\)?", answer: "\\(-8 + 8 = 0\\)" },
        { prompt: "What number must be subtracted from \\(x^2 + 3x + 5\\) so that the result is exactly divisible by \\(x - 2\\)?", answer: "\\(4 + 6 + 5 = 15\\)" },
        { prompt: "What is the remainder when \\(4x^2 - 2x + 1\\) is divided by \\(2x - 1\\)?", answer: "Put \\(x = \\frac{1}{2}\\): \\(1 - 1 + 1 = 1\\)" },
      ],
      pyqExampleId: "3ceb9eab-eb9d-4eac-a05f-a0d7faa6bb3c",
      traps: [
        {
          title: "Putting in the wrong sign",
          body: "For the divisor \\(x + 3\\), put \\(x = -3\\), not \\(x = 3\\). The number you put in is the one that makes the divisor 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipodi-factor",
      name: "The factor theorem",
      intuition:
        "A factor divides with remainder 0. By the remainder theorem that remainder is \\(p(a)\\), so \\(x - a\\) is a factor exactly when \\(p(a) = 0\\), that is, when a is a zero.",
      definition:
        "- \\(x - a\\) is a factor of \\(p(x)\\) when \\(p(a) = 0\\), and only then.\n" +
        "- \\(x + a\\) is a factor when \\(p(-a) = 0\\).\n" +
        "- An unknown coefficient: put the zero in, set the value to 0 and solve.\n" +
        "- Two zeroes known, say \\(\\sqrt{3}\\) and \\(-\\sqrt{3}\\): then \\((x - \\sqrt{3})(x + \\sqrt{3}) = x^2 - 3\\) is a factor. Divide by it to find the rest.",
      formula: {
        label: "Factor theorem",
        latex: "(x - a) \\text{ is a factor of } p(x) \\text{ when } p(a) = 0",
      },
      authoredExample: {
        prompt: "Find k if \\(x - 1\\) is a factor of \\(x^3 + kx^2 - 3x + 4\\).",
        steps: ["Put \\(x = 1\\): \\(1 + k - 3 + 4 = 0\\).", "\\(k + 2 = 0\\), so \\(k = -2\\)."],
        answer: "\\(k = -2\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(x + 2\\) a factor of \\(x^3 + 2x^2 - x - 2\\)?",
        steps: ["Put \\(x = -2\\): \\(-8 + 8 + 2 - 2 = 0\\)."],
        answer: "Yes",
      },
      practiceSet: [
        { prompt: "Is \\(x - 3\\) a factor of \\(x^2 - 7x + 12\\)?", answer: "Yes: \\(9 - 21 + 12 = 0\\)" },
        { prompt: "Find a if \\(x + 1\\) is a factor of \\(x^2 + ax - 4\\).", answer: "\\(1 - a - 4 = 0\\), so \\(a = -3\\)" },
        { prompt: "If 2 and \\(-3\\) are zeroes of a polynomial \\(p(x)\\), which quadratic polynomial must divide \\(p(x)\\)?", answer: "\\((x - 2)(x + 3) = x^2 + x - 6\\)" },
        { prompt: "If \\(\\sqrt{3}\\) and \\(-\\sqrt{3}\\) are zeroes of a polynomial, which quadratic factor must it have?", answer: "\\(x^2 - 3\\)" },
      ],
      pyqExampleId: "fbe7547c-abb5-4248-b197-c36d628d4070",
      traps: [
        {
          title: "Mixing up the factor and the zero",
          body: "The factor \\(x + 5\\) goes with the zero \\(-5\\), and the factor \\(x - 5\\) with the zero 5. Test a factor by putting in the number that makes it 0.",
        },
      ],
    },
  ],
};
