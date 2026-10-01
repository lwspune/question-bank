import type { SubtopicNote } from "@/app/notes/_types";

export const GRAPHS_SL_NOTE: SubtopicNote = {
  subtopicName: "Motion Graphs: Slopes and Areas",
  title: "Motion Graphs: Slopes and Areas",
  oneLineDefinition:
    "The slope of a position–time graph is the velocity and the slope of a velocity–time graph is the acceleration; the area under a velocity–time graph is the displacement, and the area under an acceleration–time graph is the change in velocity.",
  whyItMatters:
    "Twenty PYQs, nineteen of them multiple choice, three from 2026, and nineteen carry a graph. Six take areas under a velocity–time graph, ten match a graph's shape to the motion, and four read a graph of velocity against position. Two questions decide every one of them: is the answer a slope or an area, and where does the velocity change sign?",
  concepts: [
    // C1 — areas under v–t and a–t
    {
      kind: "formula" as const,
      slug: "jpsl-vt-area",
      name: "Areas under velocity–time and acceleration–time graphs",
      intuition:
        "Area under a velocity–time graph is velocity × time, which is a displacement. Area below the time axis is negative: the body is moving backwards. So the displacement is the signed sum of the areas, while the distance adds them all as positive. Split the graph wherever the line crosses the axis, find each piece, and decide which total the question wants.",
      definition:
        "- Displacement \\(= \\) signed area under v–t. Distance \\(= \\) sum of the sizes of the areas.\n" +
        "- Average velocity \\(= \\dfrac{\\text{displacement}}{\\text{total time}}\\); average speed \\(= \\dfrac{\\text{distance}}{\\text{total time}}\\).\n" +
        "- Slope of v–t \\(= \\) acceleration.\n" +
        "- Area under a–t \\(= \\) change in velocity, \\(v_2 - v_1\\).\n" +
        "- Pieces are triangles \\(\\tfrac{1}{2}bh\\), rectangles bh and trapezia \\(\\tfrac{1}{2}(a + b)h\\).\n" +
        "- A line crossing zero: find where with the slope before splitting the area.",
      formula: {
        label: "Areas",
        latex: "\\Delta x = \\int v\\,dt \\qquad \\Delta v = \\int a\\,dt",
      },
      authoredExample: {
        prompt:
          "A body's velocity rises uniformly from 0 to \\(12\\ \\text{m/s}\\) in 4 s, stays at \\(12\\ \\text{m/s}\\) until \\(t = 10\\ \\text{s}\\), then falls uniformly to \\(-6\\ \\text{m/s}\\) at \\(t = 16\\ \\text{s}\\). Find the displacement, the distance and the average velocity over the 16 s.",
        steps: [
          "Last part: slope \\(= \\dfrac{-6 - 12}{6} = -3\\ \\text{m/s}^{2}\\), so v reaches zero 4 s after \\(t = 10\\), at \\(t = 14\\ \\text{s}\\).",
          "Areas: \\(\\tfrac{1}{2}(4)(12) = 24\\); \\(12 \\times 6 = 72\\); \\(\\tfrac{1}{2}(4)(12) = 24\\); below the axis \\(\\tfrac{1}{2}(2)(6) = 6\\).",
          "Displacement \\(= 24 + 72 + 24 - 6 = 114\\ \\text{m}\\); distance \\(= 24 + 72 + 24 + 6 = 126\\ \\text{m}\\).",
          "Average velocity \\(= 114/16 = 7.125\\ \\text{m/s}\\).",
        ],
        answer: "114 m, 126 m, \\(7.125\\ \\text{m/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A particle moving at \\(1\\ \\text{m/s}\\) has an acceleration of \\(2\\ \\text{m/s}^{2}\\) for 3 s, then \\(-1\\ \\text{m/s}^{2}\\) for the next 4 s. Find its final velocity.",
        steps: [
          "Area under a–t: \\(2 \\times 3 - 1 \\times 4 = 6 - 4 = 2\\ \\text{m/s}\\).",
          "\\(v = 1 + 2 = 3\\ \\text{m/s}\\).",
        ],
        answer: "\\(3\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "v falls in a straight line from \\(20\\ \\text{m/s}\\) to 0 in 5 s. Distance?", answer: "50 m" },
        { prompt: "\\(v = +4\\ \\text{m/s}\\) for 3 s, then \\(-4\\ \\text{m/s}\\) for 2 s. Displacement and distance?", answer: "4 m and 20 m" },
        { prompt: "Starting from rest, the area under an a–t graph is \\(6\\ \\text{m/s}\\). Final speed?", answer: "\\(6\\ \\text{m/s}\\)" },
        { prompt: "True or false: the area under a v–t graph is the distance travelled.", answer: "False in general: it is the displacement" },
      ],
      pyqExampleId: "982717cf-75ff-43f2-a2d2-0acea116955a", // 5 Apr 2026 Shift 2: v–t graph over 40 s, distance and average velocity
      traps: [
        {
          title: "Area gives displacement, not distance",
          body: "The statement \"area under a v–t graph is the distance\" is false as soon as the graph dips below the axis. Distance needs every area counted as positive.",
        },
        {
          title: "Average velocity comes from areas on a v–t graph",
          body: "Average velocity is total displacement over total time, so on a v–t graph it comes from the areas, not from a slope. When the areas above and below the axis are equal, the average velocity is zero even though the body has moved.",
        },
      ],
    },

    // C2 — graph shapes (reference)
    {
      kind: "reference" as const,
      slug: "jpsl-graph-shapes",
      name: "Matching graph shapes to the motion",
      intuition:
        "Each graph is the slope of the one before it: v–t is the slope of x–t, and a–t is the slope of v–t. So a straight x–t line means constant velocity, a curving one means acceleration, and its steepness at any instant is the velocity then. Read the shapes in the table across a row, and use the list to rule out graphs that no real motion can produce.",
      definition:
        "- Slope of x–t at an instant \\(= \\) instantaneous velocity; chord between two times \\(= \\) average velocity.\n" +
        "- x–t: concave up (opening upward) means \\(a > 0\\); concave down means \\(a < 0\\).\n" +
        "- Slope of a momentum–time graph \\(= \\) force: steepest part, largest force.\n" +
        "- Falling with drag \\(F = -kv\\): \\(v = \\dfrac{mg}{k}\\left(1 - e^{-kt/m}\\right)\\), rising from 0 and levelling at \\(mg/k\\).\n" +
        "- Impossible graphs: two values at one time, time running backwards, total distance decreasing, or speed below zero.",
      table: {
        columns: ["Motion", "Position–time", "Velocity–time", "Acceleration–time"],
        rows: [
          { cells: ["At rest", "Horizontal line", "On the time axis (v = 0)", "On the time axis (a = 0)"] },
          { cells: ["Constant velocity", "Straight sloping line", "Horizontal line", "On the time axis (a = 0)"] },
          { cells: ["Speeding up from rest, constant a", "Parabola opening upward, \\(x \\propto t^{2}\\)", "Straight line through the origin", "Horizontal line above the axis"] },
          { cells: ["Slowing to rest, constant a", "Curve bending over, flat where it stops", "Straight line falling to zero", "Horizontal line below the axis"] },
          { cells: ["Thrown up and caught (up positive)", "Downward-opening parabola", "Straight line from +u to −u, zero at the top", "Horizontal line at −g"], noteAmber: "The velocity line crosses zero at the top, but the acceleration line never moves." },
          { cells: ["Falling from rest with drag kv (down positive)", "Curve that straightens into a line of slope mg/k", "Rises from 0 and levels off at mg/k", "Starts at g and falls towards zero"] },
          { cells: ["Constant velocity, then reversed at equal speed", "Rising line, then falling line", "Positive constant, then negative constant", "Zero, with a spike at the reversal"] },
        ],
        caption: "Each column is the slope of the column to its left.",
      },
      selfCheckExample: {
        prompt:
          "A position–time graph rises in a straight line from x = 0 at t = 0 to x = 6 m at t = 2 s, stays at 6 m until t = 5 s, then falls in a straight line to x = 0 at t = 8 s. Find the velocity at t = 1 s, t = 4 s and t = 6 s, and the average velocity over 8 s.",
        steps: [
          "\\(t = 1\\): slope \\(= 6/2 = 3\\ \\text{m/s}\\).",
          "\\(t = 4\\): the line is flat, so \\(v = 0\\).",
          "\\(t = 6\\): slope \\(= -6/3 = -2\\ \\text{m/s}\\).",
          "It ends where it began: average velocity zero.",
        ],
        answer: "\\(3\\ \\text{m/s}\\), 0, \\(-2\\ \\text{m/s}\\); average zero",
      },
      practiceSet: [
        { prompt: "A position–time graph is a parabola opening upward. What is the acceleration like?", answer: "Positive and constant" },
        { prompt: "A v–t line slopes down and crosses the time axis. What happens at the crossing?", answer: "The body stops and reverses" },
        { prompt: "What does the slope of a momentum–time graph give?", answer: "The force" },
        { prompt: "Can a distance–time graph ever slope downward?", answer: "No: distance never decreases" },
      ],
      pyqExampleId: "18562630-d380-4001-b92f-05e193c087cf", // 4 Apr 2025: statements about an x–t graph
      traps: [
        {
          title: "Average velocity is a chord, not a tangent",
          body: "Between two times, join the two points on the x–t graph and take that slope. The tangent at one instant gives the instantaneous velocity instead.",
        },
        {
          title: "Velocity zero does not make the acceleration zero",
          body: "Where the v–t line crosses the axis the body is at rest for an instant, but the slope there, the acceleration, is unchanged.",
        },
      ],
    },

    // C3 — velocity against position
    {
      kind: "formula" as const,
      slug: "jpsl-vx-graphs",
      name: "Velocity–position graphs: a = v dv/dx",
      intuition:
        "When velocity is plotted against position, its slope dv/dx is not the acceleration. Multiply by the velocity: a = v dv/dx. A straight falling v–x line therefore gives an acceleration that changes with x. If v² is plotted against x instead, a straight line means constant acceleration, and its slope is 2a.",
      definition:
        "- \\(a = v\\dfrac{dv}{dx} = \\dfrac{1}{2}\\dfrac{d(v^{2})}{dx}\\).\n" +
        "- \\(v = v_0 - kx\\) (straight, falling): \\(a = k^{2}x - kv_0\\), a rising a–x line with a negative intercept, zero where v = 0.\n" +
        "- \\(v = v_0 + kx\\) (straight, rising): \\(a = kv_0 + k^{2}x\\), a rising line with a positive intercept.\n" +
        "- \\(v^{2} = u^{2} + 2ax\\) is a straight \\(v^{2}\\)–x line: slope \\(2a\\), intercept \\(u^{2}\\).\n" +
        "- v constant over a stretch: a = 0 there.",
      formula: {
        label: "Acceleration from velocity and position",
        latex: "a = v\\frac{dv}{dx} = \\frac{1}{2}\\frac{d(v^{2})}{dx}",
      },
      authoredExample: {
        prompt:
          "A particle's velocity falls in a straight line from \\(12\\ \\text{m/s}\\) at x = 0 to zero at x = 6 m. Find its acceleration at x = 0, x = 3 m and x = 6 m, and describe the a–x graph.",
        steps: [
          "\\(v = 12 - 2x\\), so \\(\\dfrac{dv}{dx} = -2\\).",
          "\\(a = v\\dfrac{dv}{dx} = -2(12 - 2x) = 4x - 24\\).",
          "x = 0: \\(-24\\ \\text{m/s}^{2}\\); x = 3: \\(-12\\ \\text{m/s}^{2}\\); x = 6: 0.",
        ],
        answer: "A rising straight line, from \\(-24\\ \\text{m/s}^{2}\\) at x = 0 to zero at x = 6 m",
      },
      selfCheckExample: {
        prompt:
          "A graph of \\(v^{2}\\) against x is a straight line from \\(v^{2} = 16\\ \\text{m}^{2}/\\text{s}^{2}\\) at x = 0 to \\(v^{2} = 64\\ \\text{m}^{2}/\\text{s}^{2}\\) at x = 12 m. Find the acceleration and the starting speed.",
        steps: [
          "Slope \\(= \\dfrac{64 - 16}{12} = 4 = 2a\\), so \\(a = 2\\ \\text{m/s}^{2}\\).",
          "Intercept \\(u^{2} = 16\\), so \\(u = 4\\ \\text{m/s}\\).",
        ],
        answer: "\\(2\\ \\text{m/s}^{2}\\); \\(4\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "\\(v = 3x\\). Acceleration as a function of x?", answer: "\\(a = 9x\\)" },
        { prompt: "\\(v^{2} = 25 - 4x\\). Acceleration?", answer: "\\(-2\\ \\text{m/s}^{2}\\), constant" },
        { prompt: "\\(v = 2 + x\\). Acceleration at x = 1 m?", answer: "\\(3\\ \\text{m/s}^{2}\\)" },
        { prompt: "On a v–x graph the line is flat between two points. Acceleration there?", answer: "Zero" },
      ],
      pyqExampleId: "3872ca40-c7b4-41d8-9d7d-ab0e4a13e0d4", // 2021 Paper 23: v² against x, acceleration
      traps: [
        {
          title: "The slope of v–x is not the acceleration",
          body: "dv/dx has units of 1/s, not m/s². Multiply by v first. A straight v–x line does not mean constant acceleration.",
        },
        {
          title: "Halving the slope of v² against x",
          body: "v² = u² + 2ax, so the slope is 2a. Reading the slope as a doubles the answer.",
        },
      ],
    },
  ],
};
