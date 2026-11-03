import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 7 Linear Programming. Definitions in the
 * Balbharati wording; the corner point method as the book sets it out.
 * Most-asked years from the 15 board past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Linear Programming",
  chapterSlug: "linear-programming",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Linear inequation in two variables",
      text: "An expression of the form \\(ax + by < c\\) or \\(ax + by > c\\) (or with \\(\\le, \\ge\\)), where \\(a, b\\) are not both zero. Its graph is a half plane on one side of the line \\(ax + by = c\\).",
    },
    {
      term: "Origin side and the test point",
      text: "The half plane containing the origin is the origin side of the line. Use \\(O(0, 0)\\) as a test point: if it satisfies the inequation, shade the origin side, otherwise the other side. If the line passes through O, test another point.",
    },
    {
      term: "Convex set",
      text: "A set of points in a plane is said to be a convex set if the line segment joining any two points of the set entirely lies within the set. Convex sets may be bounded or unbounded.",
    },
    {
      term: "Decision variables and objective function",
      text: "The variables involved in an L.P.P. are called decision variables. A linear function of the variables which is to be optimized (maximized or minimized) is called the objective function, e.g. \\(z = ax + by\\).",
    },
    {
      term: "Constraints",
      text: "Conditions under which the objective function is to be optimized are called constraints. The restrictions \\(x \\ge 0, y \\ge 0\\) are called non-negativity constraints.",
    },
    {
      term: "Feasible solution and feasible region",
      text: "A solution which satisfies all the constraints is called a feasible solution. The common region determined by all the constraints of the L.P.P. is called the feasible region.",
    },
    {
      term: "Optimal feasible solution",
      text: "A feasible solution which maximizes or minimizes the objective function as per the requirements is called an optimal feasible solution.",
    },
    {
      term: "Theorems (without proof)",
      text: "The set of all feasible solutions of an L.P.P. is a convex set. The objective function attains its optimum value at least at one of the vertices of the convex polygon (the convex polygon theorem).",
    },
    {
      term: "Unbounded feasible region",
      text: "If the feasible region is unbounded (not a polygon), a maximum may not exist: there is no finite maximum value of \\(z\\) within the feasible region when the iso-profit line can move away from the origin indefinitely.",
    },
    {
      term: "Infinitely many optimal solutions",
      text: "If the optimum value occurs at two corner points, it occurs at every point of the segment joining them, so the L.P.P. has an infinite number of optimal solutions.",
    },
  ],
  formulas: [
    {
      label: "Form of an L.P.P.",
      latex: "\\text{Maximize or minimize } z = ax + by \\quad \\text{subject to } a_1x + b_1y \\le c_1,\\ a_2x + b_2y \\ge c_2,\\ x \\ge 0,\\ y \\ge 0",
    },
    {
      label: "Points to draw the line ax + by = c",
      latex: "\\left(\\frac{c}{a},\\ 0\\right) \\text{ and } \\left(0,\\ \\frac{c}{b}\\right) \\qquad \\frac{x}{c/a} + \\frac{y}{c/b} = 1",
    },
  ],
  derivations: [
    {
      title: "Solve the L.P.P. graphically (corner point method)",
      steps: [
        "Convert every constraint into an equation and draw each line, using its two intercepts.",
        "Shade the correct side of each line (test point \\(O(0, 0)\\)); with \\(x \\ge 0, y \\ge 0\\) stay in the first quadrant. The common region is the feasible region.",
        "Find each vertex of the feasible region, by inspection or by solving the two equations of the lines that meet there.",
        "Find \\(z\\) at every vertex, in a table.",
        "Pick the largest (maximize) or smallest (minimize) value, and write the optimal solution: \\(z\\) and the values of \\(x, y\\).",
      ],
    },
    {
      title: "Formulate an L.P.P. from a word problem (working rule)",
      steps: [
        "Identify the decision variables and assign symbols \\(x, y\\) to them; introduce the non-negativity constraints \\(x \\ge 0, y \\ge 0\\).",
        "Make a table of the data, then write each condition (machine time, vitamin units, resources) as a linear inequation in \\(x, y\\).",
        "Use \\(\\le\\) for availability or capacity (at most) and \\(\\ge\\) for requirement (at least).",
        "Write the objective function (profit to maximize, cost to minimize) as a linear function of \\(x, y\\), then solve by the corner point method.",
      ],
    },
    {
      title: "Solve the system of inequations graphically and write the corner points of the feasible region",
      steps: [
        "Draw the line of each inequation and shade its solution half plane using a test point.",
        "The common shaded region is the solution set (feasible region).",
        "Name its vertices and find their coordinates by solving the pairs of lines that meet there.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Feasible region of an L.P.P.",
      labels: [
        "X and Y axes with a scale",
        "each line named by its equation",
        "intercepts of each line",
        "shading for each constraint",
        "feasible region marked",
        "corner points with coordinates",
      ],
    },
  ],
  mostAsked: [
    { topic: "Solve the L.P.P. graphically: maximize \\(z\\) (and find the maximum value)", years: [2025, 2024, 2020, 2019, 2017] },
    { topic: "Solve the L.P.P. graphically: minimize \\(z\\)", years: [2026, 2022, 2018, 2016] },
    { topic: "Formulate a word problem as an L.P.P. (machines and profit, or a diet) and solve it", years: [2024, 2015] },
    { topic: "Solve inequations graphically and write the corner points; optimum among given corner points", years: [2023] },
  ],
  mistakes: [
    {
      title: "Shading the wrong side of a line",
      body: "Test each inequation with \\(O(0, 0)\\). For \\(2x + y \\ge 7\\), \\(0 \\ge 7\\) is false, so shade the side away from the origin.",
    },
    {
      title: "Listing a corner point that breaks a constraint",
      body: "Every vertex must satisfy all the constraints. When \\(\\le\\) and \\(\\ge\\) constraints are mixed, or one reads \\(y \\ge 2\\), check each point before finding \\(z\\).",
    },
    {
      title: "Reading intersection points off the graph",
      body: "Find a vertex by solving the two equations that meet there. For \\(x + 4y = 24\\) and \\(x + y = 9\\): \\(3y = 15\\), so \\((4, 5)\\), and \\(z = 3x + 5y = 37\\).",
    },
    {
      title: "Stopping at the values of \\(x\\) and \\(y\\)",
      body: "The answer is the optimum value of \\(z\\) and the point where it occurs. If two vertices give the same optimum, say there are infinitely many optimal solutions.",
    },
    {
      title: "Dropping the non-negativity constraints",
      body: "In a word problem the quantities cannot be negative: write \\(x \\ge 0, y \\ge 0\\), and keep the feasible region in the first quadrant.",
    },
  ],
};

export default sheet;
