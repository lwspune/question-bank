import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PO_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Degree, Value and Zeroes of a Polynomial",
  title: "Degree, Value and Zeroes of a Polynomial",
  oneLineDefinition:
    "The degree of a polynomial is its highest power of x, its value at a number comes from putting that number in for x, and a zero is a value of x that makes it 0.",
  whyItMatters:
    "Eight questions in the bank, seven of them EASY: name the degree, pick the linear polynomial, find a value, or count the zeroes on a graph. These are the quickest marks in the chapter, and they are lost to a squared negative number or to counting where a graph meets the wrong axis.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spipoba-degree",
      name: "Degree of a polynomial and the name for each degree",
      intuition:
        "A polynomial is a sum of terms like \\(5x^3\\) or \\(-2x\\) or 7, where every power of x is a whole number. The highest power present is its degree, and each low degree has its own name.",
      definition:
        "- The **degree** is the highest power of x with a non-zero coefficient, wherever that term is written.\n" +
        "- Every power must be a whole number. \\(x + \\frac{1}{x}\\) is **not** a polynomial (it has \\(x^{-1}\\)), and neither is anything with \\(\\sqrt{x}\\).\n" +
        "- A number such as 7 or \\(\\sqrt{2}\\) is a **constant** term: its degree is 0, so it never changes the degree.",
      table: {
        columns: ["Name", "Degree", "Example"],
        rows: [
          { cells: ["Constant polynomial", "0", "7"] },
          { cells: ["Linear polynomial", "1", "3x + 2"] },
          { cells: ["Quadratic polynomial", "2", "x² − 4x + 1"] },
          { cells: ["Cubic polynomial", "3", "2x³ + x − 5"] },
          {
            cells: ["Biquadratic (quartic) polynomial", "4", "x⁴ − 5x² + 6"],
            noteAmber: "A biquadratic is a quadratic in x², so its degree is 4, not 2.",
          },
        ],
        caption: "The same names are used for equations: a cubic equation has degree 3.",
      },
      selfCheckExample: {
        prompt: "What is the degree of the polynomial \\(7x - 3x^4 + x^2\\)?",
        steps: ["The powers present are 1, 4 and 2.", "The highest is 4."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "What is the degree of the constant polynomial 6?", answer: "0" },
        { prompt: "Is \\(x^2 + \\frac{2}{x}\\) a polynomial?", answer: "No: \\(\\frac{2}{x} = 2x^{-1}\\) has a negative power" },
        { prompt: "What is the degree of \\((x + 1)(x^2 - 3)\\)?", answer: "3, since \\(x \\times x^2 = x^3\\)" },
        { prompt: "What is a polynomial of degree 2 called?", answer: "A quadratic polynomial" },
      ],
      pyqExampleId: "c7a0923e-4763-4b61-a25d-c3c1dbe2c843",
      traps: [
        {
          title: "Taking the degree from the first term",
          body: "The degree is the highest power anywhere in the polynomial. \\(2x - x^3 + 4\\) has degree 3, even though it starts with an x term.",
        },
        {
          title: "Treating a root sign as a power of x",
          body: "\\(\\sqrt{2}\\) is a constant and does not change the degree. \\(\\sqrt{x}\\) is \\(x^{1/2}\\), which makes the expression not a polynomial.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spipoba-value",
      name: "Value of a polynomial and what a zero is",
      intuition:
        "To find the value of a polynomial at a number, put that number in place of x and work it out. If the answer is 0, that number is a zero of the polynomial.",
      definition:
        "- \\(p(a)\\) means the value of \\(p(x)\\) when \\(x = a\\).\n" +
        "- a is a **zero** of \\(p(x)\\) when \\(p(a) = 0\\).\n" +
        "- Put a negative number in brackets and square it before multiplying by the coefficient: \\(-3(-2)^2 = -3 \\times 4 = -12\\).\n" +
        "- The zero of a linear polynomial \\(ax + b\\) is \\(-\\frac{b}{a}\\).",
      formula: {
        label: "Zero of a polynomial",
        latex: "p(a) = 0 \\qquad \\text{zero of } ax + b = -\\frac{b}{a}",
      },
      authoredExample: {
        prompt: "For \\(p(x) = 2x^2 - 3x + 1\\), find \\(p(-2)\\) and check whether 1 is a zero.",
        steps: [
          "\\(p(-2) = 2(4) - 3(-2) + 1 = 8 + 6 + 1 = 15\\).",
          "\\(p(1) = 2 - 3 + 1 = 0\\), so 1 is a zero.",
        ],
        answer: "\\(p(-2) = 15\\); yes, 1 is a zero",
      },
      selfCheckExample: {
        prompt: "Find \\(p(3)\\) for \\(p(x) = x^3 - 4x + 2\\).",
        steps: ["\\(27 - 12 + 2 = 17\\)."],
        answer: "17",
      },
      practiceSet: [
        { prompt: "Find \\(p(-1)\\) for \\(p(x) = x^2 + 6x - 2\\).", answer: "\\(1 - 6 - 2 = -7\\)" },
        { prompt: "Is 2 a zero of \\(p(x) = x^2 - 5x + 6\\)?", answer: "Yes: \\(4 - 10 + 6 = 0\\)" },
        { prompt: "What is the zero of the linear polynomial \\(3x - 6\\)?", answer: "\\(x = 2\\)" },
        { prompt: "If 1 is a zero of \\(p(x) = kx^2 - 3x + 1\\), find k.", answer: "\\(k - 3 + 1 = 0\\), so \\(k = 2\\)" },
      ],
      pyqExampleId: "8092edd2-4b1c-4e88-99c2-d658690f9d67",
      traps: [
        {
          title: "Squaring after attaching the minus sign",
          body: "At \\(x = -2\\), the term \\(-3x^2\\) is \\(-3 \\times 4 = -12\\), not \\(+12\\). Square the number first, then multiply by the coefficient with its sign.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipoba-graph",
      name: "Reading the zeroes of a polynomial from its graph",
      intuition:
        "The graph of \\(y = p(x)\\) meets the x-axis exactly where \\(p(x) = 0\\). So the zeroes are the x-values of the points where the curve cuts or touches the x-axis, and the number of zeroes is the number of such points.",
      definition:
        "- A polynomial of degree n has **at most n** zeroes.\n" +
        "- The graph of a quadratic polynomial is a **parabola**, one U shape: it opens upwards when the coefficient of \\(x^2\\) is positive and downwards when it is negative.\n" +
        "- A curve that rises, falls and rises again, crossing the x-axis three times, is a cubic, not a quadratic.\n" +
        "- Points on the y-axis are not zeroes. Only the x-axis counts.",
      table: {
        columns: ["What the graph does", "Number of distinct zeroes"],
        rows: [
          { cells: ["A straight line crosses the x-axis once", "1"] },
          { cells: ["A parabola cuts the x-axis at two points", "2"] },
          {
            cells: ["A parabola only touches the x-axis at one point", "1"],
            noteAmber: "Touching counts: the point where it touches is a zero.",
          },
          { cells: ["A parabola never meets the x-axis", "0"] },
          { cells: ["A cubic curve crosses the x-axis three times", "3"] },
        ],
        caption: "Count the meeting points with the x-axis, not with the y-axis.",
      },
      selfCheckExample: {
        prompt: "The graph of a polynomial crosses the x-axis at x = −1, x = 2 and x = 4 and nowhere else. How many zeroes does it have, and what is its least possible degree?",
        steps: ["Three meeting points, so three zeroes.", "A polynomial of degree n has at most n zeroes, so the degree is at least 3."],
        answer: "3 zeroes; degree at least 3",
      },
      practiceSet: [
        { prompt: "At most how many zeroes can a quadratic polynomial have?", answer: "2" },
        { prompt: "The graph of \\(y = x^2 + 1\\) lies wholly above the x-axis. How many real zeroes does \\(x^2 + 1\\) have?", answer: "0" },
        { prompt: "Does the parabola \\(y = -x^2 + 4\\) open upwards or downwards?", answer: "Downwards: the coefficient of \\(x^2\\) is negative" },
        { prompt: "At which x-values does the graph of \\(y = (x - 1)(x + 3)\\) meet the x-axis?", answer: "\\(x = 1\\) and \\(x = -3\\)" },
      ],
      pyqExampleId: "efdeba83-2cb4-4526-b4f4-9317bf6fa412",
      traps: [
        {
          title: "Counting where the graph meets the y-axis",
          body: "Zeroes are where the graph meets the x-axis. A curve that cuts the y-axis at 3 has \\(p(0) = 3\\), which says nothing about its zeroes.",
        },
        {
          title: "Missing a zero where the curve only touches",
          body: "A parabola that just touches the x-axis and turns back still meets it there, so it has exactly one distinct zero, not none.",
        },
      ],
    },
  ],
};
