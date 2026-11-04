import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Algebra, Ch. 1 Linear Equations in Two Variables. Statements
 * checked against the Balbharati Mathematics Part I text; formulas rebuilt
 * (the book's text loses its notation); most-asked years and marks from the
 * board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Algebra",
  subjectRoute: "algebra",
  chapterName: "Linear Equations in Two Variables",
  chapterSlug: "linear-equations-in-two-variables",
  source: "Balbharati Mathematics Part I Std X (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Linear equation in two variables",
      text: "An equation which contains two variables, and the degree of each term containing a variable is one. General form: \\(ax + by + c = 0\\), where \\(a, b, c\\) are real numbers and \\(a, b\\) are not both zero.",
    },
    {
      term: "Solution of simultaneous equations",
      text: "The values of the variables that satisfy both equations give their solution. Check your answer by putting it back in **both** equations.",
    },
    {
      term: "Graphical method",
      text: "Draw the graph of each equation. Each point on a line satisfies its equation, so the point where the two lines **intersect** is the solution.",
    },
    {
      term: "Points for a graph",
      text: "Two points are enough for a line, but if one is wrong the line is wrong. Plot 3 or 4 points; they must be collinear. Taking \\(x = 0\\) and then \\(y = 0\\) gives easy points.",
    },
    {
      term: "Lines parallel to the axes",
      text: "\\(y = 2\\) (that is, \\(0x + y = 2\\)) is a line parallel to the X-axis. \\(x = 2\\) is parallel to the Y-axis. The X-axis itself is \\(y = 0\\) and the Y-axis is \\(x = 0\\).",
    },
    {
      term: "Determinant",
      text: "\\(\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}\\) represents the number \\(ad - bc\\). Its **degree is 2**, because each row and each column has 2 elements. Determinants are named with capital letters: D, A, B.",
    },
    {
      term: "Cramer's rule",
      text: "The determinant method, first given by the Swiss mathematician Gabriel Cramer. Write the equations as \\(a_1x + b_1y = c_1\\) and \\(a_2x + b_2y = c_2\\), find D, Dx and Dy, then \\(x = \\frac{D_x}{D}\\), \\(y = \\frac{D_y}{D}\\).",
    },
    {
      term: "Dx and Dy",
      text: "In Dx, the column of the coefficients of \\(x\\) is replaced by the constants \\(c_1, c_2\\). In Dy, the column of the coefficients of \\(y\\) is replaced by them.",
    },
    {
      term: "Coefficients interchanged",
      text: "When the coefficients of \\(x\\) and \\(y\\) are interchanged (like \\(15x + 17y = 21\\), \\(17x + 15y = 11\\)), **add** and **subtract** the equations to get two simple equations in \\(x + y\\) and \\(x - y\\).",
    },
    {
      term: "Equations reducible to linear form",
      text: "Make new variables, for example \\(p = \\frac{1}{x}\\), \\(q = \\frac{1}{y}\\), to turn the equations into linear ones. Solve for \\(p, q\\), then go back to \\(x, y\\). A denominator can never be zero.",
    },
    {
      term: "Boat and stream",
      text: "If the boat's speed in still water is \\(x\\) km/hr and the current's is \\(y\\) km/hr, the speed downstream is \\((x + y)\\) and upstream is \\((x - y)\\). Time = distance / speed.",
    },
    {
      term: "Digit problems",
      text: "A two digit number with tens digit \\(x\\) and units digit \\(y\\) is \\(10x + y\\); with the digits interchanged it is \\(10y + x\\).",
    },
  ],
  formulas: [
    { label: "General form", latex: "ax + by + c = 0 \\qquad (a, b \\text{ not both } 0)" },
    { label: "Value of a determinant", latex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc" },
    {
      label: "Cramer's rule: the three determinants",
      latex:
        "D = \\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix} \\quad D_x = \\begin{vmatrix} c_1 & b_1 \\\\ c_2 & b_2 \\end{vmatrix} \\quad D_y = \\begin{vmatrix} a_1 & c_1 \\\\ a_2 & c_2 \\end{vmatrix}",
    },
    { label: "Cramer's rule: the solution", latex: "x = \\frac{D_x}{D} \\qquad y = \\frac{D_y}{D} \\qquad (D \\neq 0)" },
    {
      label: "Coefficients interchanged",
      latex: "ax + by = c,\\; bx + ay = d \\;\\Rightarrow\\; x + y = \\frac{c + d}{a + b},\\quad x - y = \\frac{c - d}{a - b}",
    },
    { label: "Boat and stream", latex: "\\text{downstream} = x + y \\qquad \\text{upstream} = x - y \\qquad t = \\frac{d}{s}" },
    { label: "Two digit number", latex: "N = 10x + y \\qquad \\text{reversed} = 10y + x" },
    {
      label: "Triangle a line makes with the axes",
      latex: "\\text{Area} = \\frac{1}{2} \\times (x\\text{-intercept}) \\times (y\\text{-intercept})",
    },
  ],
  derivations: [
    {
      title: "Solve simultaneous equations by Cramer's rule (method)",
      steps: [
        "Write both equations in the form \\(ax + by = c\\), carrying the sign of each constant.",
        "Find \\(D\\), \\(D_x\\) and \\(D_y\\), each as \\(ad - bc\\).",
        "Write \\(x = \\frac{D_x}{D}\\), \\(y = \\frac{D_y}{D}\\), then the solution \\((x, y)\\).",
      ],
    },
    {
      title: "Solve simultaneous equations graphically (method)",
      steps: [
        "For each equation, make a table of at least 3 points \\((x, y)\\).",
        "Draw the X-axis and Y-axis, choose a scale, plot the points and join each set with a line.",
        "Read the point of intersection; its co-ordinates are the solution. Name each line with its equation.",
      ],
    },
    {
      title: "Solve equations reducible to linear form (method)",
      steps: [
        "Put \\(\\frac{1}{x} = p\\) and \\(\\frac{1}{y} = q\\) (or \\(\\frac{1}{2x + 1} = p\\), and so on) to get linear equations.",
        "Solve them for \\(p\\) and \\(q\\) by elimination or Cramer's rule.",
        "Go back: from \\(p = \\frac{1}{x}\\) find \\(x\\), and from \\(q\\) find \\(y\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Graph of two simultaneous equations",
      labels: ["X-axis and Y-axis, origin O", "scale, e.g. 1 cm = 1 unit", "both lines named with their equations", "plotted points", "point of intersection with co-ordinates"],
    },
  ],
  mostAsked: [
    { topic: "Complete a table, or find a point, to draw the graph of an equation", marks: 2, years: [2026, 2025, 2024, 2023, 2022, 2020, 2018, 2017] },
    { topic: "Word problems: numbers, ages, fractions, money, rectangles, boats", marks: 3, years: [2026, 2025, 2024, 2022, 2020, 2019, 2018, 2016] },
    { topic: "Solve by Cramer's rule, or find D, Dx and Dy", marks: 3, years: [2026, 2025, 2024, 2023, 2022, 2018, 2017] },
    { topic: "Value of a determinant, or find a missing entry", marks: 1, years: [2025, 2024, 2023, 2022, 2020, 2019, 2016] },
    { topic: "Coefficients interchanged: find x + y and x - y", marks: 1, years: [2025, 2024, 2022, 2020, 2019, 2018] },
    { topic: "Find x or y from given values of D, Dx and Dy", marks: 1, years: [2026, 2025, 2024, 2022, 2020, 2018] },
    { topic: "Solve by elimination, or find constants from a given solution", marks: 2, years: [2026, 2025, 2024, 2023, 2019] },
    { topic: "Solve graphically, or find the area of the triangle a line makes with the axes", marks: 3, years: [2025, 2024, 2023, 2022, 2019] },
  ],
  mistakes: [
    {
      title: "Not writing the equations as ax + by = c first",
      body: "Move the constant to the right before writing D, Dx and Dy. For \\(3x - 2y - 4 = 0\\), the constant is \\(+4\\), not \\(-4\\).",
    },
    {
      title: "Writing a determinant as ad + bc or bc - ad",
      body: "It is always (top left × bottom right) minus (top right × bottom left): \\(ad - bc\\). Watch the signs of negative entries.",
    },
    {
      title: "Putting the constants in the wrong column",
      body: "In Dx the constants replace the **x** column; in Dy they replace the **y** column. The other column stays as it is.",
    },
    {
      title: "Stopping at p and q",
      body: "In reducible equations, \\(p\\) and \\(q\\) are not the answer. Find \\(x\\) and \\(y\\) from them.",
    },
    {
      title: "An unlabelled graph",
      body: "Write each equation on its line, mark the scale and the point of intersection with its co-ordinates, and write the solution in words.",
    },
  ],
};

export default sheet;
