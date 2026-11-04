import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 3 Pair of Linear Equations in Two Variables.
 * Statements checked against the NCERT Class 10 text (rationalised); formulas
 * rebuilt; most-asked years and marks from the CBSE board past-paper questions
 * in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Pair of Linear Equations in Two Variables",
  chapterSlug: "pair-of-linear-equations-in-two-variables",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 3",
  keyPoints: [
    {
      term: "Consistent and inconsistent",
      text: "A pair of linear equations which has **no solution** is called an inconsistent pair. A pair which **has a solution** is called a consistent pair.",
    },
    {
      term: "Intersecting lines",
      text: "If the lines intersect at a point, that point gives the **unique solution**. The pair is consistent.",
    },
    {
      term: "Coincident lines",
      text: "If the lines coincide, there are **infinitely many solutions** (each point on the line is a solution). The pair is dependent (consistent).",
    },
    {
      term: "Parallel lines",
      text: "If the lines are parallel, the pair has **no solution**. The pair is inconsistent.",
    },
    {
      term: "Test by ratios",
      text: "For \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\), compare \\(\\frac{a_1}{a_2}\\), \\(\\frac{b_1}{b_2}\\), \\(\\frac{c_1}{c_2}\\) (see the formulas). Write both equations in this form first.",
    },
    {
      term: "Graphical method",
      text: "Each equation is a line. Find two or three points on each (a table of \\(x\\), \\(y\\)), plot them, draw both lines and read the point where they meet.",
    },
    {
      term: "Substitution method",
      text: "Express one variable in terms of the other from one equation, substitute it in the other equation, solve, then substitute back.",
    },
    {
      term: "Elimination method",
      text: "Multiply the equations so that one variable has equal coefficients, then add or subtract to eliminate it and solve the equation in one variable.",
    },
    {
      term: "A false statement",
      text: "If eliminating gives a false statement with no variable (like \\(0 = 5\\)), there is no solution. A true statement (like \\(0 = 0\\)) means infinitely many solutions.",
    },
  ],
  formulas: [
    { label: "Unique solution (intersecting)", latex: "\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}" },
    { label: "No solution (parallel)", latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}" },
    { label: "Infinitely many solutions (coincident)", latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}" },
    { label: "Where a line cuts the axes", latex: "\\text{x-axis: put } y = 0, \\qquad \\text{y-axis: put } x = 0" },
    { label: "Two-digit number", latex: "\\text{number} = 10x + y, \\qquad \\text{reversed} = 10y + x" },
    { label: "Area of the triangle", latex: "\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}" },
  ],
  derivations: [
    {
      title: "Solve graphically and find the area of the triangle formed by the lines and the x-axis",
      steps: [
        "Make a table of at least two points for each line (put \\(x = 0\\), then \\(y = 0\\)).",
        "Plot both lines on one graph with a scale; label each line with its equation.",
        "Read the point of intersection: this is the solution. Write it as \\(x = \\ldots\\), \\(y = \\ldots\\).",
        "Read where each line cuts the x-axis: these two points and the intersection are the vertices.",
        "Base = distance between the x-axis points; height = y-coordinate of the intersection. Area \\(= \\frac{1}{2} \\times \\text{base} \\times \\text{height}\\).",
      ],
    },
    {
      title: "Solve \\(37x + 63y = 137\\), \\(63x + 37y = 163\\) (swapped coefficients)",
      steps: [
        "Add the equations: \\(100x + 100y = 300\\), so \\(x + y = 3\\).",
        "Subtract the first from the second: \\(26x - 26y = 26\\), so \\(x - y = 1\\).",
        "Solve the two simple equations: \\(x = 2\\), \\(y = 1\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Graph of a pair of linear equations",
      labels: ["x-axis and y-axis with a scale", "Each line labelled with its equation", "Plotted points from the tables", "Point of intersection with its coordinates"],
    },
  ],
  mostAsked: [
    { topic: "Word problems: ages, digits, fractions, money, marks, speed, rectangles", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Solve graphically; check consistency, or find the vertices and area of the triangle the lines make with an axis", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Unique, no or infinitely many solutions: intersecting, parallel or coincident lines from the ratios", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Case study: write the pair of equations from the story, then solve", years: [2025, 2024, 2023] },
    { topic: "Solve algebraically by substitution or elimination (including \\(37x + 63y = 137\\), \\(63x + 37y = 163\\) type)", marks: 2, years: [2025, 2024, 2023] },
    { topic: "Find k for infinitely many solutions, no solution or coincident lines", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Lines parallel to an axis, and where a line cuts the x-axis or y-axis", marks: 1, years: [2025, 2023] },
  ],
  mistakes: [
    {
      title: "Mixing up lines parallel to the axes",
      body: "\\(x = a\\) is a line parallel to the y-axis; \\(y = b\\) is parallel to the x-axis. \\(x = a\\) and \\(y = b\\) always meet at \\((a, b)\\). The x-axis is \\(y = 0\\).",
    },
    {
      title: "Comparing ratios before writing the general form",
      body: "\\(-3x = 6y - 1\\) must become \\(3x + 6y - 1 = 0\\) first. Signs of \\(c_1\\), \\(c_2\\) change the third ratio.",
    },
    {
      title: "Plotting only one point per line",
      body: "Find at least two (better three) points for each line, use a clear scale and label both lines. A rough sketch loses marks.",
    },
    {
      title: "Forgetting the last step in a word problem",
      body: "Say what \\(x\\) and \\(y\\) stand for at the start, and end with a sentence that answers the question asked (the age, the number, the cost).",
    },
    {
      title: "Wrong reversed number",
      body: "If the tens digit is \\(x\\) and units digit is \\(y\\), the number is \\(10x + y\\), not \\(xy\\). The reversed number is \\(10y + x\\).",
    },
    {
      title: "Calling coincident lines inconsistent",
      body: "Coincident lines have infinitely many solutions, so the pair is **consistent** (dependent). Only parallel lines are inconsistent.",
    },
  ],
};

export default sheet;
