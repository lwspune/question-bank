import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 12 Linear Programming.
 * Terms, Theorems 1 and 2 and the corner point method in NCERT's own
 * wording, trimmed; every worked problem re-solved by hand (corner points
 * and the open half plane test); most-asked years and marks from the 87
 * CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Linear Programming",
  chapterSlug: "linear-programming",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 12",
  keyPoints: [
    {
      term: "Linear programming problem",
      text: "A Linear Programming Problem is one that is concerned with finding the optimal value (maximum or minimum value) of a linear function (called objective function) of several variables, subject to the conditions that the variables are non-negative and satisfy a set of linear inequalities (called linear constraints).",
    },
    {
      term: "Objective function",
      text: "Linear function \\(Z = ax + by\\), where a, b are constants, which has to be maximised or minimised is called a linear objective function. Variables x and y are called decision variables. Its degree is 1.",
    },
    {
      term: "Constraints",
      text: "The linear inequalities or equations or restrictions on the variables of a linear programming problem are called constraints. The conditions \\(x \\ge 0, y \\ge 0\\) are called non-negative restrictions.",
    },
    {
      term: "Feasible region",
      text: "The common region determined by all the constraints including non-negative constraints \\(x, y \\ge 0\\) of a linear programming problem is called the feasible region (or solution region) for the problem.",
    },
    {
      term: "Feasible and infeasible solutions",
      text: "Points within and on the boundary of the feasible region represent feasible solutions of the constraints (there are infinitely many). Any point outside the feasible region is called an infeasible solution.",
    },
    {
      term: "Optimal solution",
      text: "Any point in the feasible region that gives the optimal value (maximum or minimum) of the objective function is called an optimal solution.",
    },
    {
      term: "Corner point",
      text: "A corner point of a feasible region is a point in the region which is the intersection of two boundary lines. Find it by solving the two equations of the lines intersecting at that point.",
    },
    {
      term: "Bounded and unbounded",
      text: "A feasible region of a system of linear inequalities is said to be bounded if it can be enclosed within a circle. Otherwise, it is called unbounded: it extends indefinitely in some direction.",
    },
    {
      term: "Theorem 1",
      text: "When Z has an optimal value (maximum or minimum), where x and y are subject to constraints described by linear inequalities, this optimal value must occur at a corner point (vertex) of the feasible region.",
    },
    {
      term: "Theorem 2",
      text: "If the feasible region R is bounded, then the objective function Z has both a maximum and a minimum value on R and each of these occurs at a corner point (vertex) of R.",
    },
    {
      term: "Unbounded region",
      text: "If R is unbounded, then a maximum or a minimum value of the objective function may not exist. However, if it exists, it must occur at a corner point of R.",
    },
    {
      term: "Open half plane test",
      text: "On an unbounded region, M is the maximum value of Z if the open half plane \\(ax + by > M\\) has no point in common with the feasible region; otherwise Z has no maximum. Similarly m is the minimum if \\(ax + by < m\\) has no common point.",
    },
    {
      term: "Multiple optimal solutions",
      text: "If two corner points produce the same maximum (or minimum) value of the objective function, then every point on the line segment joining these points will also give the same maximum (or minimum) value.",
    },
    {
      term: "No feasible region",
      text: "If no point satisfies all the constraints simultaneously, the problem has no feasible region and hence no feasible solution. The feasible region, when it exists, is always a convex region.",
    },
  ],
  formulas: [
    { label: "The problem", latex: "\\text{Maximise or minimise } Z = ax + by \\quad \\text{subject to linear constraints and } x \\ge 0,\\; y \\ge 0" },
    { label: "Open half plane test on an unbounded region", latex: "\\max Z = M \\iff \\{ax + by > M\\} \\cap R = \\varnothing \\qquad \\min Z = m \\iff \\{ax + by < m\\} \\cap R = \\varnothing" },
    { label: "Two corners give the same optimum", latex: "Z(x_1, y_1) = Z(x_2, y_2) \\;\\Rightarrow\\; \\text{every point of the segment joining them is optimal}" },
  ],
  derivations: [
    {
      title: "Corner point method: solve an LPP graphically",
      steps: [
        "Draw each constraint as a line (use its intercepts), shade the side that satisfies it (test (0, 0)), and mark the feasible region.",
        "Find every corner point, by inspection or by solving the two equations of the lines meeting there.",
        "Evaluate Z at each corner point; let M and m be the largest and smallest values.",
        "Bounded region: M and m are the maximum and minimum. Unbounded region: apply the open half plane test before calling M or m the answer.",
      ],
    },
    {
      title: "Maximise \\(Z = 4x + 3y\\) subject to \\(x + y \\le 800\\), \\(2x + y \\le 1000\\), \\(x \\le 400\\), \\(x, y \\ge 0\\)",
      steps: [
        "The feasible region is bounded, with corners (0, 0), (400, 0), (400, 200), (200, 600) and (0, 800).",
        "(200, 600) comes from solving \\(x + y = 800\\) and \\(2x + y = 1000\\); (400, 200) from \\(x = 400\\) and \\(2x + y = 1000\\).",
        "Z = 0, 1600, 2200, 2600, 2400. Maximum Z = 2600 at (200, 600).",
      ],
    },
    {
      title: "Minimise \\(Z = 60x + 80y\\) subject to \\(3x + 4y \\ge 8\\), \\(5x + 2y \\ge 11\\), \\(x, y \\ge 0\\)",
      steps: [
        "The feasible region is unbounded. Corners: \\(\\left(0, \\frac{11}{2}\\right)\\), \\(\\left(2, \\frac{1}{2}\\right)\\) (solving the two lines) and \\(\\left(\\frac{8}{3}, 0\\right)\\).",
        "Z = 440, 160, 160. The smallest value is 160.",
        "The open half plane \\(60x + 80y < 160\\), that is \\(3x + 4y < 8\\), meets no region point. Minimum 160 at every point of the segment joining \\(\\left(2, \\frac{1}{2}\\right)\\) and \\(\\left(\\frac{8}{3}, 0\\right)\\).",
      ],
    },
    {
      title: "Minimise \\(Z = x + 2y\\) subject to \\(2x + y \\ge 3\\), \\(x + 2y \\ge 6\\), \\(x, y \\ge 0\\): show that the minimum occurs at more than two points",
      steps: [
        "The region is unbounded with corners (0, 3) and (6, 0); Z = 6 at both.",
        "\\(x + 2y < 6\\) has no point in common with the region (it is ruled out by \\(x + 2y \\ge 6\\)), so the minimum is 6.",
        "Since two corners give 6, every point on the segment joining (0, 3) and (6, 0) gives the minimum: infinitely many points.",
      ],
    },
    {
      title: "Maximise \\(Z = x + 2y\\) subject to \\(x - y \\ge 0\\), \\(x - 2y \\ge -2\\), \\(x, y \\ge 0\\)",
      steps: [
        "The region is unbounded with corners (0, 0) and (2, 2) (from \\(x = y\\) and \\(x - 2y = -2\\)).",
        "Z = 0 and 6, so the candidate is M = 6.",
        "The open half plane \\(x + 2y > 6\\) contains region points such as (10, 0), so Z has no maximum value.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Graph of the feasible region (every graphical LPP answer)",
      labels: ["x and y axes with a scale", "each constraint line with its equation", "intercepts on both axes", "shaded feasible region", "corner points with coordinates", "the bounded or unbounded side shown"],
    },
    {
      title: "Unbounded region with the open half plane",
      labels: ["unbounded feasible region", "dotted line ax + by = M (or m)", "side of ax + by > M (or < m) marked", "common points or none, stated"],
    },
  ],
  mostAsked: [
    { topic: "Solve an LPP graphically (bounded feasible region): draw, find corner points, evaluate Z", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Unbounded feasible region: minimum with \\(\\ge\\) constraints, the open half plane check, corner points of an unbounded region", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Corner points given: maximum and minimum of Z, or the condition for the optimum at two corners", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Terms: objective function, constraints, feasible region, feasible solutions, bounded region has both max and min", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Write the constraints of a shaded region, or draw and shade the feasible region", marks: 1, years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Calling the corner value the answer on an unbounded region",
      body: "For \\(Z = x + 2y\\) with \\(x - y \\ge 0\\), \\(x - 2y \\ge -2\\), the corners give 6 at (2, 2), but \\(x + 2y > 6\\) meets the region: there is no maximum. Always draw the open half plane and say whether it meets the region.",
    },
    {
      title: "Shading the wrong side of a line",
      body: "Test a point not on the line, usually (0, 0): if it satisfies the inequality, shade its side. For a line through the origin, test a point like (1, 0).",
    },
    {
      title: "Missing or guessing a corner point",
      body: "Solve the two boundary equations for each corner; never read it off a rough sketch. Check that each corner satisfies every constraint.",
    },
    {
      title: "Giving only two points for multiple optima",
      body: "When two corners give the same optimum, the answer is every point on the segment joining them (infinitely many optimal solutions), not just the two corners.",
    },
    {
      title: "Dropping the non-negative constraints",
      body: "When writing the constraints of a given region, include \\(x \\ge 0\\), \\(y \\ge 0\\) if the region lies in the first quadrant. An empty feasible region means no feasible solution.",
    },
  ],
};

export default sheet;
