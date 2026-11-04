import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 4 Quadratic Equations. Statements checked against
 * the NCERT Class 10 text (rationalised); formulas rebuilt; most-asked years
 * and marks from the CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Quadratic Equations",
  chapterSlug: "quadratic-equations",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 4",
  keyPoints: [
    {
      term: "Quadratic equation",
      text: "Any equation \\(p(x) = 0\\), where \\(p(x)\\) is a polynomial of **degree 2**, is a quadratic equation. Simplify first: in \\((x + 2)^2 = x^2 + 3\\) the \\(x^2\\) cancels, so it is not quadratic.",
    },
    {
      term: "Standard form",
      text: "\\(ax^2 + bx + c = 0\\), \\(a \\neq 0\\), is called the standard form of a quadratic equation (terms in descending order of degree).",
    },
    {
      term: "Root",
      text: "A real number \\(\\alpha\\) is a root of \\(ax^2 + bx + c = 0\\) if \\(a\\alpha^2 + b\\alpha + c = 0\\). We also say \\(x = \\alpha\\) is a solution, or \\(\\alpha\\) satisfies the equation.",
    },
    {
      term: "Roots and zeroes",
      text: "The zeroes of the polynomial \\(ax^2 + bx + c\\) and the roots of the equation \\(ax^2 + bx + c = 0\\) are the same. A quadratic equation has at most two roots.",
    },
    {
      term: "Factorisation method",
      text: "Split the middle term, write the left side as a product of two linear factors, and find the roots by equating each factor to zero.",
    },
    {
      term: "Quadratic formula",
      text: "The roots of \\(ax^2 + bx + c = 0\\) are \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\), provided \\(b^2 - 4ac \\geq 0\\).",
    },
    {
      term: "Discriminant",
      text: "\\(b^2 - 4ac\\) decides whether the equation has real roots or not, so it is called the **discriminant**, \\(D\\).",
    },
    {
      term: "Nature of roots",
      text: "\\(D > 0\\): two distinct real roots. \\(D = 0\\): two equal (coincident) real roots, each \\(-\\frac{b}{2a}\\). \\(D < 0\\): no real roots.",
    },
    {
      term: "Word problems",
      text: "Let the unknown be \\(x\\), form the equation, write it in standard form and solve. Reject a root that makes no sense (negative speed, age, length or a fraction of a person).",
    },
  ],
  formulas: [
    { label: "Standard form", latex: "ax^2 + bx + c = 0, \\qquad a \\neq 0" },
    { label: "Quadratic formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
    { label: "Discriminant", latex: "D = b^2 - 4ac" },
    { label: "Equal roots", latex: "D = 0 \\;\\Rightarrow\\; x = -\\frac{b}{2a}" },
    { label: "Real roots", latex: "D \\geq 0" },
    { label: "Equation from its roots", latex: "x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0" },
    { label: "Speed and time", latex: "\\text{time} = \\frac{\\text{distance}}{\\text{speed}}, \\qquad \\text{upstream} = u - v, \\quad \\text{downstream} = u + v" },
    { label: "Pipes and taps", latex: "\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{\\text{time taken together}}" },
  ],
  derivations: [
    {
      title: "Verify that the roots of \\((p - q)x^2 + (q - r)x + (r - p) = 0\\) are equal when \\(q + r = 2p\\)",
      steps: [
        "\\(D = (q - r)^2 - 4(p - q)(r - p)\\).",
        "From \\(q + r = 2p\\): \\(p - q = \\frac{r - q}{2}\\) and \\(r - p = \\frac{r - q}{2}\\).",
        "So \\(4(p - q)(r - p) = (r - q)^2\\), and \\(D = (q - r)^2 - (r - q)^2 = 0\\).",
        "\\(D = 0\\), so the roots are equal.",
      ],
    },
    {
      title: "If \\((1 + a^2)x^2 + 2abx + (b^2 - c^2) = 0\\) has equal roots, prove that \\(b^2 = c^2(1 + a^2)\\)",
      steps: [
        "Equal roots, so \\(D = 0\\): \\((2ab)^2 - 4(1 + a^2)(b^2 - c^2) = 0\\).",
        "Divide by 4 and expand: \\(a^2b^2 - b^2 + c^2 - a^2b^2 + a^2c^2 = 0\\).",
        "So \\(c^2 + a^2c^2 = b^2\\), that is, \\(b^2 = c^2(1 + a^2)\\).",
      ],
    },
    {
      title: "Speed word problem (method)",
      steps: [
        "Let the usual speed be \\(x\\) km/h. Time \\(= \\frac{\\text{distance}}{x}\\); the other time uses the changed speed.",
        "Write: (longer time) \\(-\\) (shorter time) \\(=\\) the given difference in hours (convert minutes: 48 min \\(= \\frac{4}{5}\\) h).",
        "Clear the fractions, write in standard form, factorise or use the formula.",
        "Reject the negative root and state the speed with units.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Discriminant: nature of roots, or find k for equal, real or distinct roots", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Word problems: numbers, digits, fractions, ages and marks", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Case study: form the quadratic equation from the story (lawn, walkway, tiles, ball), then solve", marks: 2, years: [2025, 2024, 2023, 2022] },
    { topic: "Word problems: areas, right triangles, cost price and tour expenses", marks: 5, years: [2026, 2025, 2024] },
    { topic: "Word problems: speed and time (trains, aircraft, boats), pipes and taps", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "Which is a quadratic equation; solve by factorisation or by the quadratic formula", marks: 1, years: [2026, 2025, 2023, 2022] },
    { topic: "A given root: find k; or the equation whose roots are given", marks: 1, years: [2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Reading a, b, c before the standard form",
      body: "\\(px(x - 2) + 6 = 0\\) is \\(px^2 - 2px + 6 = 0\\): \\(a = p\\), \\(b = -2p\\), \\(c = 6\\). Expand and collect every term on one side first.",
    },
    {
      title: "Keeping k = 0 when a = 0",
      body: "If \\(k = 0\\) makes the coefficient of \\(x^2\\) zero, it is no longer a quadratic. Reject that value of \\(k\\) and say why.",
    },
    {
      title: "Wrong condition for real roots",
      body: "Real roots means \\(D \\geq 0\\) (equal or distinct). Distinct real roots means \\(D > 0\\). Equal roots means \\(D = 0\\).",
    },
    {
      title: "Mixing minutes and hours",
      body: "If speed is in km/h, write every time in hours: 30 min \\(= \\frac{1}{2}\\) h, 48 min \\(= \\frac{4}{5}\\) h.",
    },
    {
      title: "Not rejecting an impossible root",
      body: "A speed, age, side or number of days cannot be negative. Write 'rejecting the negative value' and give the final answer in a sentence with units.",
    },
  ],
};

export default sheet;
