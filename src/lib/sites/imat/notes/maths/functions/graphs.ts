import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_FUN_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Graphs of Standard Functions",
  title: "Graphs of Standard Functions",
  oneLineDefinition:
    "Lines, parabolas, powers, reciprocals, exponentials and logarithms each have a shape you should recognise, with known intercepts, symmetry and range.",
  whyItMatters:
    "Quadratic graphs came up in 2020 (the turning point) and 2026 (a parabola through a given point), and 2026 also asked for the values of x where an exponential function is positive.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-fun-linear-quadratic",
      name: "Linear and quadratic graphs: gradient, vertex and roots",
      intuition:
        "A linear function grows by the same amount for each step in x, so its graph is a straight line. A quadratic is symmetric about a vertical line, its axis, and turns round at the vertex. Find the axis and you have the vertex; substitute any point on the graph and you get an equation for an unknown coefficient.",
      definition:
        "**Linear**: \\(y = mx + c\\) is a straight line with **gradient** \\(m\\) and **y-intercept** \\(c\\).\n" +
        "**Quadratic**: \\(y = ax^2 + bx + c\\) with \\(a \\ne 0\\) is a **parabola**.\n" +
        "- If \\(a > 0\\) it opens upwards and the vertex is a minimum; if \\(a < 0\\) it opens downwards and the vertex is a maximum.\n" +
        "- The **axis of symmetry** is \\(x = -\\dfrac{b}{2a}\\); the **vertex** (turning point) is on it.\n" +
        "- The y-intercept is \\(c\\). The x-intercepts (roots) solve \\(ax^2 + bx + c = 0\\); there are 2, 1 or 0 of them as the discriminant \\(b^2 - 4ac\\) is positive, zero or negative.\n" +
        "- A point \\((p, q)\\) is on a graph exactly when \\(q = f(p)\\).",
      formula: {
        label: "Vertex of y = ax² + bx + c",
        latex: "x_v = -\\frac{b}{2a}, \\qquad y_v = a x_v^2 + b x_v + c",
        symbols: [
          { symbol: "\\(x_v\\)", meaning: "x-coordinate of the vertex (the axis of symmetry)" },
          { symbol: "\\(y_v\\)", meaning: "y-coordinate of the vertex: substitute \\(x_v\\)" },
        ],
      },
      authoredExample: {
        prompt: "Find the vertex of \\(y = 3x^2 - 12x + 7\\), say whether it is a maximum or a minimum, and give the y-intercept.",
        steps: [
          "\\(x_v = -\\dfrac{-12}{2 \\times 3} = 2\\).",
          "\\(y_v = 3(2)^2 - 12(2) + 7 = 12 - 24 + 7 = -5\\).",
          "\\(a = 3 > 0\\), so the parabola opens upwards and \\((2, -5)\\) is a minimum.",
          "The y-intercept is \\(c = 7\\), the point \\((0, 7)\\).",
        ],
        answer: "Vertex \\((2, -5)\\), a minimum; y-intercept 7",
      },
      selfCheckExample: {
        prompt:
          "The parabola \\(y = x^2 + bx + 5\\) has its axis of symmetry at \\(x = 3\\). What are the coordinates of its vertex?",
        options: ["\\((-3, -4)\\)", "\\((3, 32)\\)", "\\((3, 5)\\)", "\\((3, -4)\\)", "\\((-3, 32)\\)"],
        steps: [
          "Axis: \\(-\\dfrac{b}{2} = 3\\), so \\(b = -6\\).",
          "Vertex height: \\(3^2 - 6(3) + 5 = 9 - 18 + 5 = -4\\). The vertex is \\((3, -4)\\).",
          "Option B uses \\(b = +6\\) but keeps \\(x = 3\\); A is the vertex of \\(x^2 + 6x + 5\\); C gives the y-intercept height instead of the vertex height.",
        ],
        answer: "(D) \\((3, -4)\\)",
      },
      practiceSet: [
        { prompt: "Write the line with gradient \\(-3\\) through \\((0, 2)\\).", answer: "\\(y = -3x + 2\\)" },
        { prompt: "Find the vertex of \\(y = x^2 - 8x + 1\\).", answer: "\\((4, -15)\\)", method: "\\(x_v = 4\\), then \\(16 - 32 + 1\\)" },
        { prompt: "For which \\(k\\) does \\(y = kx^2 + 2x - 3\\) pass through \\((1, 4)\\)?", answer: "\\(k = 5\\)", method: "\\(4 = k + 2 - 3\\)" },
        { prompt: "How many times does \\(y = x^2 + 2x + 5\\) meet the x-axis?", answer: "Never", method: "Discriminant \\(4 - 20 = -16 < 0\\)" },
      ],
      traps: [
        {
          title: "The axis is at minus b over 2a",
          body: "The vertex is at \\(x = -b/(2a)\\). Dropping the minus sign puts the vertex on the wrong side of the y-axis, and forgetting the 2 doubles its distance from the axis. Both wrong points appear as options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-fun-standard-graphs",
      name: "Shapes of power, reciprocal, exponential and logarithmic graphs",
      intuition:
        "You do not need to plot these graphs: learn where each one is defined, which values it can take and one or two points it always passes through. Exponentials and logarithms are mirror images of each other, which is why their domains and ranges swap.",
      definition:
        "Key words for reading the table:\n" +
        "- An **asymptote** is a line the graph gets closer and closer to but never reaches.\n" +
        "- \\(e \\approx 2.718\\); \\(\\ln x\\) means \\(\\log_e x\\).\n" +
        "- For a base \\(a\\) between 0 and 1, \\(a^x\\) and \\(\\log_a x\\) are decreasing instead of increasing; the domains and ranges stay the same.",
      table: {
        columns: ["Function", "Domain", "Range", "Shape and key points"],
        rows: [
          { cells: ["\\(y = x^2\\) (even powers)", "All real x", "\\(y \\ge 0\\)", "U shape, symmetric about the y-axis, through \\((0, 0)\\) and \\((1, 1)\\)"] },
          { cells: ["\\(y = x^3\\) (odd powers)", "All real x", "All real y", "Rises from left to right, symmetric about the origin, through \\((0, 0)\\) and \\((1, 1)\\)"] },
          { cells: ["\\(y = \\sqrt{x}\\)", "\\(x \\ge 0\\)", "\\(y \\ge 0\\)", "Starts at \\((0, 0)\\) and rises ever more slowly"] },
          { cells: ["\\(y = \\dfrac{1}{x}\\)", "\\(x \\ne 0\\)", "\\(y \\ne 0\\)", "Two separate branches; both axes are asymptotes"] },
          {
            cells: ["\\(y = a^x\\) with \\(a > 1\\), e.g. \\(e^x\\)", "All real x", "\\(y > 0\\)", "Through \\((0, 1)\\); increasing; the x-axis is an asymptote on the left"],
            noteAmber: "An exponential is positive for every real x, including negative x.",
          },
          {
            cells: ["\\(y = \\log_a x\\) with \\(a > 1\\), e.g. \\(\\ln x\\)", "\\(x > 0\\)", "All real y", "Through \\((1, 0)\\); increasing; the y-axis is an asymptote"],
            noteAmber: "A logarithm is negative for \\(0 < x < 1\\) and positive for \\(x > 1\\).",
          },
        ],
        caption: "Exponential and logarithm with the same base are inverse functions, so their graphs are reflections of each other in the line \\(y = x\\).",
      },
      selfCheckExample: {
        prompt: "Which of these functions takes every real number as a value (its range is all real numbers)?",
        options: ["\\(y = \\ln x\\)", "\\(y = 2^x\\)", "\\(y = x^2 + 1\\)", "\\(y = \\dfrac{1}{x}\\)", "\\(y = \\sqrt{x}\\)"],
        steps: [
          "\\(\\ln x\\) goes down without limit as \\(x\\) approaches 0 and up without limit as \\(x\\) grows: its range is all real numbers.",
          "\\(2^x\\) is always positive; \\(x^2 + 1\\) is never below 1; \\(1/x\\) is never 0; \\(\\sqrt{x}\\) is never negative.",
        ],
        answer: "(A) \\(y = \\ln x\\)",
      },
      practiceSet: [
        { prompt: "Where does \\(y = \\ln x\\) cross the x-axis?", answer: "At \\((1, 0)\\)", method: "\\(\\ln 1 = 0\\)" },
        { prompt: "For which real \\(x\\) is \\(5^x > 0\\)?", answer: "All real \\(x\\)" },
        { prompt: "What is the domain of \\(y = \\log_{10} x\\)?", answer: "\\(x > 0\\)" },
        { prompt: "Is \\(\\ln 0.5\\) positive or negative?", answer: "Negative", method: "\\(0.5\\) lies between 0 and 1" },
      ],
      traps: [
        {
          title: "An exponential is never zero or negative",
          body: "\\(e^x > 0\\) for every real \\(x\\): at \\(x = -10\\) it is tiny but still positive. Options such as \"only for \\(x > 0\\)\" or \"only for \\(x \\ge 1\\)\" confuse \\(e^x > 0\\) with \\(e^x > 1\\), which holds only for \\(x > 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-fun-features",
      name: "Even and odd functions, increasing and decreasing, reading a graph",
      intuition:
        "Symmetry saves work. An even function looks the same in a mirror held along the y-axis; an odd function looks the same after a half turn about the origin. Most functions are neither. Reading a graph means turning its picture into statements: where it crosses the axes, where it turns, where it is above or below the x-axis.",
      definition:
        "- **Even**: \\(f(-x) = f(x)\\) for all \\(x\\); the graph is symmetric about the y-axis (e.g. \\(x^2\\), \\(x^4 - 3\\)).\n" +
        "- **Odd**: \\(f(-x) = -f(x)\\) for all \\(x\\); the graph is unchanged by a half turn about the origin (e.g. \\(x^3\\), \\(1/x\\)).\n" +
        "- \\(f\\) is **increasing** on an interval if a larger \\(x\\) always gives a larger \\(f(x)\\); **decreasing** if it gives a smaller one.\n" +
        "- On a graph: x-intercepts are the solutions of \\(f(x) = 0\\), the y-intercept is \\(f(0)\\), \\(f(x) > 0\\) where the curve is above the x-axis, and **turning points** are local maxima or minima.",
      formula: {
        label: "Even and odd",
        latex: "\\text{even: } f(-x) = f(x) \\qquad \\text{odd: } f(-x) = -f(x)",
      },
      authoredExample: {
        prompt: "Decide whether each function is even, odd or neither: \\(f(x) = x^4 - 3x^2\\), \\(g(x) = x^3 + 5x\\), \\(h(x) = x^2 + x\\).",
        steps: [
          "\\(f(-x) = (-x)^4 - 3(-x)^2 = x^4 - 3x^2 = f(x)\\): even.",
          "\\(g(-x) = -x^3 - 5x = -g(x)\\): odd.",
          "\\(h(-x) = x^2 - x\\), which is neither \\(h(x)\\) nor \\(-h(x)\\). Check with numbers: \\(h(1) = 2\\) but \\(h(-1) = 0\\). Neither.",
        ],
        answer: "\\(f\\) even, \\(g\\) odd, \\(h\\) neither",
      },
      selfCheckExample: {
        prompt: "Which one of these functions is odd?",
        options: ["\\(x^4 + 2\\)", "\\(x^3 + 1\\)", "\\(x^2 + x\\)", "\\(e^x\\)", "\\(x^5 - 4x\\)"],
        steps: [
          "\\((-x)^5 - 4(-x) = -x^5 + 4x = -(x^5 - 4x)\\), so E is odd.",
          "A is even. In B the constant spoils it: \\((-x)^3 + 1 = -x^3 + 1\\), which is not \\(-(x^3 + 1)\\). C mixes an even and an odd power. D: \\(e^{-x}\\) is neither \\(e^x\\) nor \\(-e^x\\).",
        ],
        answer: "(E) \\(x^5 - 4x\\)",
      },
      practiceSet: [
        { prompt: "Is \\(f(x) = 1/x\\) even, odd or neither?", answer: "Odd", method: "\\(1/(-x) = -1/x\\)" },
        { prompt: "A function is even and \\(f(3) = 8\\). What is \\(f(-3)\\)?", answer: "8" },
        { prompt: "Is \\(y = 2x + 3\\) increasing or decreasing?", answer: "Increasing", method: "Its gradient 2 is positive" },
        { prompt: "On which interval is \\(y = x^2\\) decreasing?", answer: "\\(x < 0\\)", method: "Left of the vertex at the origin" },
      ],
      traps: [
        {
          title: "A constant term keeps a function even but stops it being odd",
          body: "Adding a constant to an even function leaves it even (\\(x^2 + 7\\) is even). Adding a nonzero constant to an odd function makes it neither (\\(x^3 + 1\\)), because an odd function defined at 0 must pass through the origin.",
        },
      ],
    },
  ],
};
