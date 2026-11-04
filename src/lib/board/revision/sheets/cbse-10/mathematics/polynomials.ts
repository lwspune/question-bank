import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 2 Polynomials. Statements checked against the
 * NCERT Class 10 text (rationalised); formulas rebuilt; most-asked years and
 * marks from the CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Polynomials",
  chapterSlug: "polynomials",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 2",
  keyPoints: [
    {
      term: "Degree",
      text: "The highest power of \\(x\\) in \\(p(x)\\) is called the degree of the polynomial \\(p(x)\\).",
    },
    {
      term: "Linear, quadratic, cubic",
      text: "Polynomials of degrees 1, 2 and 3 are called linear, quadratic and cubic polynomials. A quadratic is \\(ax^2 + bx + c\\), with \\(a, b, c\\) real and \\(a \\neq 0\\).",
    },
    {
      term: "Zero of a polynomial",
      text: "A real number \\(k\\) is a zero of a polynomial \\(p(x)\\) if \\(p(k) = 0\\).",
    },
    {
      term: "Zero of a linear polynomial",
      text: "The zero of \\(ax + b\\) is \\(-\\frac{b}{a}\\), that is, \\(-\\frac{\\text{constant term}}{\\text{coefficient of } x}\\).",
    },
    {
      term: "Geometrical meaning",
      text: "The zeroes of \\(p(x)\\) are precisely the x-coordinates of the points where the graph of \\(y = p(x)\\) **intersects the x-axis**. Points where the graph only meets the y-axis are not zeroes.",
    },
    {
      term: "Graph of a quadratic",
      text: "The graph of \\(y = ax^2 + bx + c\\) is a parabola: it opens upwards if \\(a > 0\\) and downwards if \\(a < 0\\).",
    },
    {
      term: "Number of zeroes",
      text: "A polynomial of degree \\(n\\) has **at most \\(n\\) zeroes**. So a quadratic has at most 2 zeroes and a cubic at most 3.",
    },
    {
      term: "Two, one or no zero",
      text: "A quadratic polynomial can have two distinct zeroes, two equal zeroes (one zero, the graph touches the x-axis), or no zero (the graph does not meet the x-axis).",
    },
    {
      term: "Sum and product of zeroes",
      text: "If \\(\\alpha\\), \\(\\beta\\) are the zeroes of \\(ax^2 + bx + c\\): \\(\\alpha + \\beta = -\\frac{b}{a}\\) and \\(\\alpha\\beta = \\frac{c}{a}\\).",
    },
    {
      term: "Polynomial from its zeroes",
      text: "A quadratic with zeroes \\(\\alpha\\), \\(\\beta\\) is \\(k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta]\\), \\(k\\) any non-zero real number. So there are **infinitely many** such polynomials.",
    },
    {
      term: "Cubic polynomial",
      text: "If \\(\\alpha, \\beta, \\gamma\\) are the zeroes of \\(ax^3 + bx^2 + cx + d\\): \\(\\alpha + \\beta + \\gamma = -\\frac{b}{a}\\), \\(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a}\\), \\(\\alpha\\beta\\gamma = -\\frac{d}{a}\\).",
    },
  ],
  formulas: [
    { label: "Sum of zeroes", latex: "\\alpha + \\beta = -\\frac{b}{a} = -\\frac{\\text{coefficient of } x}{\\text{coefficient of } x^2}" },
    { label: "Product of zeroes", latex: "\\alpha\\beta = \\frac{c}{a} = \\frac{\\text{constant term}}{\\text{coefficient of } x^2}" },
    { label: "Polynomial from its zeroes", latex: "p(x) = k\\left[x^2 - (\\alpha + \\beta)x + \\alpha\\beta\\right]" },
    { label: "Sum of squares", latex: "\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta" },
    { label: "Sum of reciprocals", latex: "\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta}" },
    { label: "Difference of zeroes", latex: "(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta" },
    { label: "Ratio form", latex: "\\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha} = \\frac{\\alpha^2 + \\beta^2}{\\alpha\\beta}" },
    { label: "Cubic: three zeroes", latex: "\\alpha + \\beta + \\gamma = -\\frac{b}{a}, \\quad \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a}, \\quad \\alpha\\beta\\gamma = -\\frac{d}{a}" },
  ],
  derivations: [
    {
      title: "Find a polynomial whose zeroes are the reciprocals (or twice, or 2 less) of the zeroes of a given polynomial",
      steps: [
        "Find the zeroes of the given polynomial by splitting the middle term. Example: \\(4x^2 + 3x - 1 = (4x - 1)(x + 1)\\), zeroes \\(\\frac{1}{4}\\) and \\(-1\\).",
        "Write the new zeroes: reciprocals are \\(4\\) and \\(-1\\).",
        "New sum \\(= 3\\), new product \\(= -4\\).",
        "Required polynomial: \\(x^2 - 3x - 4\\) (or any \\(k\\) times it).",
      ],
    },
    {
      title: "If the zeroes of \\(x^2 + ax + b\\) are in the ratio \\(3 : 4\\), prove that \\(12a^2 = 49b\\)",
      steps: [
        "Let the zeroes be \\(3k\\) and \\(4k\\).",
        "Sum: \\(7k = -a\\), so \\(k = -\\frac{a}{7}\\).",
        "Product: \\(12k^2 = b\\).",
        "Substitute: \\(12 \\cdot \\frac{a^2}{49} = b\\), so \\(12a^2 = 49b\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Sum and product of zeroes, or the value of an expression like \\(\\frac{1}{\\alpha} + \\frac{1}{\\beta}\\) or \\(\\alpha^2 + \\beta^2\\)", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Find k: zeroes reciprocal, one zero n times the other, sum equals product, or a given zero", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Number of zeroes: read from a graph, or use 'degree n has at most n zeroes'", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Form a quadratic polynomial from its zeroes, or from the sum and product of its zeroes", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Find the zeroes, then a polynomial whose zeroes are twice, reciprocal or 2 less than them", marks: 3, years: [2025, 2024, 2023] },
    { topic: "Case study on a parabola (arch, ball, dolphin): zeroes, span, height, values of p(x)", marks: 1, years: [2026, 2024, 2023] },
    { topic: "Find the zeroes of a quadratic polynomial and verify the relation with its coefficients", marks: 1, years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Counting where the graph meets the y-axis",
      body: "Zeroes are only where the graph **cuts or touches the x-axis**. Count those points; a graph touching the x-axis at one point gives one zero.",
    },
    {
      title: "Wrong sign in the sum of zeroes",
      body: "\\(\\alpha + \\beta = -\\frac{b}{a}\\). For \\(5x - 7x^2 + 3\\), first write \\(-7x^2 + 5x + 3\\): sum \\(= \\frac{5}{7}\\), product \\(= -\\frac{3}{7}\\).",
    },
    {
      title: "Saying only one polynomial has given zeroes",
      body: "Every \\(k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta]\\) works, so infinitely many polynomials have zeroes \\(-1\\) and 2.",
    },
    {
      title: "Not verifying in a 'find and verify' question",
      body: "After finding the zeroes, show both: sum \\(= -\\frac{b}{a}\\) and product \\(= \\frac{c}{a}\\), each side worked out. The verification carries marks.",
    },
    {
      title: "Using reciprocal zeroes wrongly",
      body: "If the zeroes are reciprocals of each other, their **product** is 1, so \\(\\frac{c}{a} = 1\\), that is \\(c = a\\).",
    },
  ],
};

export default sheet;
