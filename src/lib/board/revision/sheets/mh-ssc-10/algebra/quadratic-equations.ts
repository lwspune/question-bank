import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Algebra, Ch. 2 Quadratic Equations. Statements checked against the
 * Balbharati Mathematics Part I text; formulas rebuilt (the book's text loses
 * its notation); most-asked years and marks from the board past-paper
 * questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Algebra",
  subjectRoute: "algebra",
  chapterName: "Quadratic Equations",
  chapterSlug: "quadratic-equations",
  source: "Balbharati Mathematics Part I Std X (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Quadratic equation",
      text: "An equation in one variable, with all indices whole numbers and **2 as the maximum index** of the variable. So \\(x^2 + 4x = 11 + x^2\\) is not quadratic (the \\(x^2\\) cancels), and neither is \\(\\frac{5}{x} - 3 = x^2\\).",
    },
    {
      term: "General (standard) form",
      text: "\\(ax^2 + bx + c = 0\\), where \\(a, b, c\\) are real numbers and \\(a \\neq 0\\). Bring every term to one side first, then read \\(a\\), \\(b\\), \\(c\\) with their signs.",
    },
    {
      term: "Roots",
      text: "The values of the variable which satisfy the equation (make both sides equal) are its solutions or roots. A quadratic equation has at most two roots.",
    },
    {
      term: "Factorisation method",
      text: "Split the middle term, write the equation as a product of two linear factors, and use: if the product of two numbers is zero, at least one of them is zero.",
    },
    {
      term: "Completing the square",
      text: "Make the coefficient of \\(x^2\\) equal to 1, then add and subtract \\(\\left(\\frac{1}{2} \\times \\text{coefficient of } x\\right)^2\\). Used when the factors are not easy to find.",
    },
    {
      term: "Formula method",
      text: "For \\(ax^2 + bx + c = 0\\), the roots are \\(\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\). It works for every quadratic equation.",
    },
    {
      term: "Discriminant",
      text: "The nature of the roots is decided by \\(b^2 - 4ac\\). It is called the **discriminant** and is denoted by the Greek letter \\(\\Delta\\) (delta).",
    },
    {
      term: "Nature of roots",
      text: "\\(\\Delta > 0\\): real and unequal. \\(\\Delta = 0\\): real and equal. \\(\\Delta < 0\\): not real.",
    },
    {
      term: "Sum and product of roots",
      text: "If \\(\\alpha\\) and \\(\\beta\\) are the roots of \\(ax^2 + bx + c = 0\\), then \\(\\alpha + \\beta = -\\frac{b}{a}\\) and \\(\\alpha\\beta = \\frac{c}{a}\\).",
    },
    {
      term: "Equation from its roots",
      text: "\\(x^2 - (\\text{sum of roots})x + \\text{product of roots} = 0\\). Multiplying the equation by any non-zero number does not change its roots.",
    },
    {
      term: "A given root",
      text: "If a number is a root, it satisfies the equation. Put it in place of \\(x\\) to find an unknown \\(k\\), or to check whether it is a root.",
    },
    {
      term: "Applications",
      text: "Quadratic equations solve practical problems: ages, areas, speed, work done by taps, numbers, cost and profit. Reject a root that makes no sense (a negative length, age or number of students).",
    },
  ],
  formulas: [
    { label: "General form", latex: "ax^2 + bx + c = 0 \\qquad (a \\neq 0)" },
    { label: "Quadratic formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
    { label: "Discriminant", latex: "\\Delta = b^2 - 4ac" },
    { label: "Sum and product of roots", latex: "\\alpha + \\beta = -\\frac{b}{a} \\qquad \\alpha\\beta = \\frac{c}{a}" },
    { label: "Equation with roots alpha and beta", latex: "x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0" },
    { label: "Sum of squares of roots", latex: "\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta" },
    { label: "Sum of cubes of roots", latex: "\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta)" },
    { label: "Completing the square", latex: "x^2 + px = \\left(x + \\frac{p}{2}\\right)^2 - \\left(\\frac{p}{2}\\right)^2" },
  ],
  derivations: [
    {
      title: "Derive the formula for the roots of ax² + bx + c = 0",
      steps: [
        "Divide by \\(a\\) (\\(a \\neq 0\\)): \\(x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0\\).",
        "Add and subtract \\(\\frac{b^2}{4a^2}\\): \\(\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}\\).",
        "Take square roots: \\(x + \\frac{b}{2a} = \\pm\\frac{\\sqrt{b^2 - 4ac}}{2a}\\).",
        "So \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).",
      ],
    },
    {
      title: "Solve by completing the square (method)",
      steps: [
        "Divide by the coefficient of \\(x^2\\) and move the constant to the right.",
        "Add \\(\\left(\\frac{1}{2} \\times \\text{coefficient of } x\\right)^2\\) to both sides, so the left side is a complete square.",
        "Take square roots of both sides (\\(\\pm\\)) and solve the two linear equations.",
      ],
    },
    {
      title: "Form the equation when the sum of roots and the sum of their cubes are given",
      steps: [
        "Use \\(\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta)\\) to find \\(\\alpha\\beta\\).",
        "Example: \\(\\alpha + \\beta = 7\\), \\(\\alpha^3 + \\beta^3 = 91\\) gives \\(91 = 343 - 21\\alpha\\beta\\), so \\(\\alpha\\beta = 12\\).",
        "Write \\(x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0\\): here \\(x^2 - 7x + 12 = 0\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Which is a quadratic equation, standard form, or the values of a, b, c", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Solve by factorisation", marks: 2, years: [2026, 2025, 2024, 2022, 2020, 2019, 2017, 2016] },
    { topic: "Word problems: ages, areas, taps, numbers, cost and profit", marks: 4, years: [2025, 2024, 2023, 2022, 2020, 2019, 2017, 2016] },
    { topic: "Solve by formula, or by completing the square", marks: 3, years: [2026, 2025, 2024, 2023, 2022, 2018, 2016] },
    { topic: "Form the equation from its roots, or from their sum and sum of cubes", marks: 2, years: [2026, 2025, 2024, 2019, 2018, 2016] },
    { topic: "One root is given: find k, or check whether a number is a root", years: [2026, 2024, 2022, 2018] },
    { topic: "Discriminant and nature of roots, or find k for real and equal roots", marks: 2, years: [2025, 2024, 2023, 2017] },
  ],
  mistakes: [
    {
      title: "Reading a, b, c before writing the standard form",
      body: "For \\(2y = 10 - y^2\\), first write \\(y^2 + 2y - 10 = 0\\). Then \\(a = 1\\), \\(b = 2\\), \\(c = -10\\). Keep the signs.",
    },
    {
      title: "Wrong sign in the sum of roots",
      body: "\\(\\alpha + \\beta = -\\frac{b}{a}\\), not \\(\\frac{b}{a}\\). In the equation from roots, the middle term is **minus** the sum.",
    },
    {
      title: "Writing 2a under only the square root",
      body: "The whole numerator \\(-b \\pm \\sqrt{b^2 - 4ac}\\) is divided by \\(2a\\). Write both roots at the end.",
    },
    {
      title: "Dividing by x and losing a root",
      body: "In \\(3y^2 = 15y\\), do not divide by \\(y\\). Factorise: \\(3y(y - 5) = 0\\), so \\(y = 0\\) or \\(y = 5\\).",
    },
    {
      title: "Keeping an impossible root in a word problem",
      body: "An age, length, speed or number of people cannot be negative. Reject that root and say why.",
    },
  ],
};

export default sheet;
