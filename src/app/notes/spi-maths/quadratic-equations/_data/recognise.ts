import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_QE_RECOGNISE_NOTE: SubtopicNote = {
  subtopicName: "Recognising a Quadratic Equation",
  title: "Recognising a Quadratic Equation",
  oneLineDefinition:
    "A quadratic equation is one that can be written as ax² + bx + c = 0 with a not zero, so its highest power of x is 2.",
  whyItMatters:
    "Seven questions in the bank, three EASY and four MODERATE: name the degree, decide which equation is quadratic, or write a word situation as an equation. The trap in every one is deciding from the look of the equation before expanding it, because x² terms on the two sides often cancel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiqerc-standard",
      name: "Standard form of a quadratic equation",
      intuition:
        "Every quadratic equation can be tidied into one shape: an x² term, an x term and a number, all on one side, with 0 on the other. Once it is in that shape you can read off a, b and c and see that the degree is 2.",
      definition:
        "- **Standard form:** \\(ax^2 + bx + c = 0\\), where a, b, c are real numbers and \\(a \\ne 0\\).\n" +
        "- The **degree** is the highest power of x, so a quadratic has degree 2.\n" +
        "- b or c may be 0: \\(x^2 - 9 = 0\\) and \\(x^2 + 4x = 0\\) are both quadratic.\n" +
        "- If a were 0 there would be no \\(x^2\\) term and the equation would be **linear**.\n" +
        "- To reach standard form, move every term to one side. A term changes sign when it crosses the = sign.",
      formula: {
        label: "Standard form",
        latex: "ax^2 + bx + c = 0, \\quad a \\ne 0",
      },
      authoredExample: {
        prompt: "Write \\(3x^2 - 7 = 2x\\) in standard form and give a, b and c.",
        steps: [
          "Move \\(2x\\) to the left side. It changes sign: \\(3x^2 - 2x - 7 = 0\\).",
          "Read the coefficients: \\(a = 3\\), \\(b = -2\\), \\(c = -7\\).",
          "\\(a \\ne 0\\) and the highest power is 2, so it is a quadratic equation.",
        ],
        answer: "\\(3x^2 - 2x - 7 = 0\\), with \\(a = 3\\), \\(b = -2\\), \\(c = -7\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(4 - x^2 = 5x\\) in standard form with a positive \\(x^2\\) term.",
        steps: [
          "Move every term to the right side: \\(0 = x^2 + 5x - 4\\).",
          "So \\(x^2 + 5x - 4 = 0\\), with \\(a = 1\\), \\(b = 5\\), \\(c = -4\\).",
        ],
        answer: "\\(x^2 + 5x - 4 = 0\\)",
      },
      practiceSet: [
        { prompt: "Write \\(x^2 = 6x - 9\\) in the form \\(ax^2 + bx + c = 0\\).", answer: "\\(x^2 - 6x + 9 = 0\\)" },
        { prompt: "In \\(2x^2 - 5 = 0\\), what are a, b and c?", answer: "\\(a = 2\\), \\(b = 0\\), \\(c = -5\\)" },
        { prompt: "Why can a not be 0 in the standard form of a quadratic equation?", answer: "With \\(a = 0\\) there is no \\(x^2\\) term, so the equation is linear." },
        { prompt: "Is \\(x^2 + 3x = 0\\) a quadratic equation?", answer: "Yes: \\(a = 1\\), \\(b = 3\\), \\(c = 0\\), and c may be 0." },
      ],
      pyqExampleId: "355af212-38e0-47ba-a7d2-c3b783f6187c",
      traps: [
        {
          title: "Thinking b or c must be non-zero",
          body: "Only a must be non-zero. \\(x^2 - 16 = 0\\) has \\(b = 0\\) and is still a quadratic equation of degree 2.",
        },
        {
          title: "Keeping the sign when a term crosses the = sign",
          body: "A term changes sign when it moves to the other side: \\(x^2 = 3x + 4\\) becomes \\(x^2 - 3x - 4 = 0\\), not \\(x^2 + 3x + 4 = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqerc-reduce",
      name: "Simplifying both sides before naming the type of equation",
      intuition:
        "An equation can look quadratic and turn out linear, because the \\(x^2\\) on one side cancels the \\(x^2\\) on the other. It can also look like a cubic and turn out quadratic. Expand first, collect on one side, and only then look at the highest power left.",
      definition:
        "- Expand every bracket, move all terms to one side and collect like terms.\n" +
        "- If the \\(x^2\\) terms cancel and only x is left, the equation is **linear**.\n" +
        "- If an \\(x^3\\) term survives, it is a **cubic**. If the \\(x^3\\) terms cancel and \\(x^2\\) is left, it is quadratic.\n" +
        "- A term in \\(\\sqrt{x}\\) is not a polynomial term, so such an equation is **not** quadratic. A number under the root is fine: \\(\\sqrt{2}x^2\\) is allowed.\n" +
        "- A term in \\(\\frac{1}{x}\\): multiply every term by the power of x that clears it, then check the degree.",
      authoredExample: {
        prompt: "Is \\((x + 3)^2 = x^2 + 4x + 1\\) a quadratic equation?",
        steps: [
          "Expand: \\(x^2 + 6x + 9 = x^2 + 4x + 1\\).",
          "Subtract \\(x^2\\) from both sides: \\(6x + 9 = 4x + 1\\), so \\(2x + 8 = 0\\).",
          "The highest power left is 1.",
        ],
        answer: "No. It reduces to \\(2x + 8 = 0\\), a linear equation.",
      },
      selfCheckExample: {
        prompt: "Is \\((x - 2)(x + 3) = x - 4\\) a quadratic equation?",
        steps: [
          "Expand: \\(x^2 + x - 6 = x - 4\\).",
          "Collect: \\(x^2 - 2 = 0\\). The \\(x^2\\) term survives.",
        ],
        answer: "Yes. It reduces to \\(x^2 - 2 = 0\\).",
      },
      practiceSet: [
        { prompt: "Is \\(x(x + 2) = x^2 + 5\\) a quadratic equation?", answer: "No: it reduces to \\(2x - 5 = 0\\), which is linear." },
        { prompt: "Is \\(x^3 - 4x^2 = x^3 + 1\\) a quadratic equation?", answer: "Yes: the \\(x^3\\) terms cancel, leaving \\(4x^2 + 1 = 0\\)." },
        { prompt: "Is \\(x^2 + \\frac{1}{x} = 2\\) a quadratic equation?", answer: "No: multiplying by x gives \\(x^3 - 2x + 1 = 0\\), a cubic." },
        { prompt: "Is \\(x^2 - 2\\sqrt{x} = 1\\) a quadratic equation?", answer: "No: \\(\\sqrt{x}\\) is not a polynomial term." },
      ],
      pyqExampleId: "eec90f8a-860d-4c52-ab08-ba1607428f97",
      traps: [
        {
          title: "Judging by the look before expanding",
          body: "An \\(x^2\\) on both sides proves nothing. \\(x(x + 3) = x^2 - 5\\) loses its \\(x^2\\) terms and reduces to \\(3x + 5 = 0\\), a linear equation.",
        },
        {
          title: "Confusing a root in the coefficient with a root of x",
          body: "\\(\\sqrt{3}x^2 + x - 1 = 0\\) is quadratic, because \\(\\sqrt{3}\\) is just a number. \\(x^2 + \\sqrt{x} = 1\\) is not, because x itself is under the root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqerc-situation",
      name: "Writing a word situation as a quadratic equation",
      intuition:
        "A word problem becomes an equation in three moves: call the unknown x, write every other quantity using x, then use the one fact the problem gives (an area, a product, a right angle) to join them with an = sign.",
      definition:
        "- Let the **smallest or simplest** unknown be x, and write the others from it: '6 more than twice x' is \\(2x + 6\\).\n" +
        "- Rectangle: length \\(\\times\\) breadth \\(=\\) area.\n" +
        "- Consecutive integers: x and \\(x + 1\\).\n" +
        "- Right triangle: the hypotenuse is the longest side, and its square equals the sum of the squares of the other two sides.",
      formula: {
        label: "Pythagoras theorem",
        latex: "(\\text{hypotenuse})^2 = (\\text{base})^2 + (\\text{height})^2",
      },
      authoredExample: {
        prompt: "The length of a rectangle is 3 m more than its breadth, and its area is 40 m². Write a quadratic equation for the breadth x.",
        steps: [
          "Breadth \\(= x\\) m, so length \\(= (x + 3)\\) m.",
          "Area: \\(x(x + 3) = 40\\).",
          "Standard form: \\(x^2 + 3x - 40 = 0\\).",
        ],
        answer: "\\(x^2 + 3x - 40 = 0\\)",
      },
      selfCheckExample: {
        prompt: "The product of two consecutive positive integers is 132. Write a quadratic equation for the smaller integer x.",
        steps: ["The integers are x and \\(x + 1\\).", "\\(x(x + 1) = 132\\), so \\(x^2 + x - 132 = 0\\)."],
        answer: "\\(x^2 + x - 132 = 0\\)",
      },
      practiceSet: [
        { prompt: "The sum of a number x and its square is 56. Write the quadratic equation for x.", answer: "\\(x^2 + x - 56 = 0\\)" },
        { prompt: "The square of a number x is 30 more than the number. Write the quadratic equation for x.", answer: "\\(x^2 - x - 30 = 0\\)" },
        {
          prompt: "One shorter side of a right triangle is 7 cm longer than the other shorter side x, and the hypotenuse is 13 cm. Write the quadratic equation for x.",
          answer: "\\(x^2 + (x + 7)^2 = 169\\), that is \\(x^2 + 7x - 60 = 0\\)",
        },
      ],
      pyqExampleId: "de4c5ecd-24c2-4edc-9dd2-3acf9ec68ccc",
      traps: [
        {
          title: "Adding the hypotenuse to another side",
          body: "The hypotenuse stands alone on one side: \\(\\text{hypotenuse}^2 = a^2 + b^2\\). An equation that adds the hypotenuse squared to another side squared is wrong.",
        },
        {
          title: "Reading 'more than' backwards",
          body: "'6 more than twice x' is \\(2x + 6\\), and '2 less than h' is \\(h - 2\\). Write the base quantity first, then add or take away.",
        },
      ],
    },
  ],
};
