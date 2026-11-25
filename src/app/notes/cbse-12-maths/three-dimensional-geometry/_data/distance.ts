import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_TG_DISTANCE_NOTE: SubtopicNote = {
  subtopicName: "Shortest Distance Between Two Lines",
  title: "Shortest Distance Between Two Lines",
  oneLineDefinition:
    "Two lines in space either meet, run parallel or are skew; the shortest distance is zero for lines that meet, the perpendicular gap for parallel lines, and the length of the common perpendicular for skew lines.",
  whyItMatters:
    "31 questions, twenty-four of them from board papers, set in every year from 2022 to 2026. The board asked for the shortest distance between skew lines (2022, 2024, 2025 and 2026, once with the distance given and an unknown to find), the distance between parallel lines (every year, once as the side of a square and once as the height of a parallelogram), and whether two lines intersect, are skew or lie in one plane (2022, 2023, 2025 and 2026). The textbook adds Examples 9 and 10, Exercise 11.2 Q12 to Q15 and Miscellaneous Exercise Q4.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmtg-skew",
      name: "Shortest distance between skew lines",
      intuition:
        "Skew lines are neither parallel nor meeting, like a diagonal across a ceiling and a diagonal down a wall. The shortest segment joining them is perpendicular to both, so it runs along \\(\\vec{b_1} \\times \\vec{b_2}\\). Its length is the projection of any joining vector \\(\\vec{a_2} - \\vec{a_1}\\) on that direction.",
      definition:
        "- For \\(\\vec{r} = \\vec{a_1} + \\lambda\\vec{b_1}\\) and \\(\\vec{r} = \\vec{a_2} + \\mu\\vec{b_2}\\): \\(d = \\left|\\dfrac{(\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1})}{|\\vec{b_1} \\times \\vec{b_2}|}\\right|\\).\n" +
        "- **Check first that the lines are not parallel**: if \\(\\vec{b_1} \\times \\vec{b_2} = \\vec{0}\\), use the parallel-lines formula.\n" +
        "- A line given as \\(\\vec{r} = (1 - t)\\hat{i} + (t - 2)\\hat{j} + \\ldots\\) must first be split into \\(\\vec{a} + t\\vec{b}\\): the terms without \\(t\\) give \\(\\vec{a}\\), the coefficients of \\(t\\) give \\(\\vec{b}\\).\n" +
        "- In Cartesian form the numerator is the determinant with rows \\(x_2 - x_1, y_2 - y_1, z_2 - z_1\\); \\(a_1, b_1, c_1\\); \\(a_2, b_2, c_2\\).\n" +
        "- A non-zero answer shows the lines are skew.",
      formula: {
        label: "Shortest distance between skew lines",
        latex: "d = \\left|\\dfrac{(\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1})}{|\\vec{b_1} \\times \\vec{b_2}|}\\right|",
        symbols: [
          { symbol: "\\(\\vec{a_1}, \\vec{a_2}\\)", meaning: "position vectors of a point on each line" },
          { symbol: "\\(\\vec{b_1}, \\vec{b_2}\\)", meaning: "direction vectors of the two lines" },
        ],
      },
      authoredExample: {
        prompt: "Find the shortest distance between the lines \\(\\vec{r} = (\\hat{i} + 2\\hat{j}) + \\lambda(\\hat{i} - \\hat{j} + \\hat{k})\\) and \\(\\vec{r} = (2\\hat{i} + \\hat{k}) + \\mu(2\\hat{i} + \\hat{j} - \\hat{k})\\).",
        steps: [
          "\\(\\vec{a_1} = \\hat{i} + 2\\hat{j}\\), \\(\\vec{b_1} = \\hat{i} - \\hat{j} + \\hat{k}\\), \\(\\vec{a_2} = 2\\hat{i} + \\hat{k}\\), \\(\\vec{b_2} = 2\\hat{i} + \\hat{j} - \\hat{k}\\).",
          "\\(\\vec{a_2} - \\vec{a_1} = \\hat{i} - 2\\hat{j} + \\hat{k}\\).",
          "\\(\\vec{b_1} \\times \\vec{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -1 & 1 \\\\ 2 & 1 & -1 \\end{vmatrix} = \\hat{i}(1 - 1) - \\hat{j}(-1 - 2) + \\hat{k}(1 + 2) = 3\\hat{j} + 3\\hat{k}\\).",
          "\\(|\\vec{b_1} \\times \\vec{b_2}| = \\sqrt{9 + 9} = 3\\sqrt{2}\\).",
          "\\((\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1}) = 0 - 6 + 3 = -3\\).",
          "\\(d = \\dfrac{|-3|}{3\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{2}}\\) units",
      },
      selfCheckExample: {
        prompt: "Find the shortest distance between \\(\\dfrac{x - 1}{2} = \\dfrac{y - 2}{3} = \\dfrac{z - 3}{4}\\) and \\(\\dfrac{x - 2}{3} = \\dfrac{y - 4}{4} = \\dfrac{z - 5}{5}\\).",
        steps: [
          "\\(\\vec{a_2} - \\vec{a_1} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\).",
          "\\(\\vec{b_1} \\times \\vec{b_2} = \\hat{i}(15 - 16) - \\hat{j}(10 - 12) + \\hat{k}(8 - 9) = -\\hat{i} + 2\\hat{j} - \\hat{k}\\), of length \\(\\sqrt{6}\\).",
          "Dot product: \\(-1 + 4 - 2 = 1\\).",
          "\\(d = \\dfrac{1}{\\sqrt{6}}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{6}}\\) units",
      },
      practiceSet: [
        { prompt: "Find the shortest distance between the x-axis and the line through \\((0, 2, 1)\\) parallel to the y-axis.", answer: "1 unit", method: "\\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), and \\((2\\hat{j} + \\hat{k}) \\cdot \\hat{k} = 1\\)." },
        { prompt: "Show that the shortest distance between \\(\\vec{r} = \\lambda(\\hat{i} + \\hat{j})\\) and \\(\\vec{r} = \\hat{k} + \\mu(\\hat{i} - \\hat{j})\\) is 1 unit.", answer: "\\(\\vec{b_1} \\times \\vec{b_2} = -2\\hat{k}\\) and \\(\\hat{k} \\cdot (-2\\hat{k}) = -2\\), so \\(d = \\dfrac{2}{2} = 1\\)." },
        { prompt: "For two skew lines, \\(\\vec{b_1} \\times \\vec{b_2} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\) and \\(\\vec{a_2} - \\vec{a_1} = 3\\hat{i} + \\hat{j} - \\hat{k}\\). Find the shortest distance.", answer: "1 unit", method: "\\(\\dfrac{|6 - 1 - 2|}{3}\\)" },
      ],
      pyqExampleId: "c25b6a0e-5255-4dd4-8ee7-834792da926d",
      traps: [
        {
          title: "A negative distance",
          body: "The dot product can be negative. The distance is its modulus divided by \\(|\\vec{b_1} \\times \\vec{b_2}|\\); write the modulus in the formula line, where it earns a mark.",
        },
        {
          title: "The skew formula on parallel lines",
          body: "For parallel lines \\(\\vec{b_1} \\times \\vec{b_2} = \\vec{0}\\) and the formula becomes \\(\\dfrac{0}{0}\\). Compare the direction ratios before you choose a formula.",
        },
        {
          title: "Terms printed out of order",
          body: "When a vector equation prints its \\(\\hat{k}\\) term before its \\(\\hat{j}\\) term, sort the parts by \\(\\hat{i}\\), \\(\\hat{j}\\), \\(\\hat{k}\\) before you read \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-parallel-distance",
      name: "Distance between parallel lines",
      intuition:
        "Parallel lines lie in one plane and keep the same gap all along. Take a point on each line. The gap is the height of the parallelogram formed by \\(\\vec{b}\\) and the joining vector \\(\\vec{a_2} - \\vec{a_1}\\): area divided by base, that is \\(|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|\\) divided by \\(|\\vec{b}|\\).",
      definition:
        "- For \\(\\vec{r} = \\vec{a_1} + \\lambda\\vec{b}\\) and \\(\\vec{r} = \\vec{a_2} + \\mu\\vec{b}\\): \\(d = \\dfrac{|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|}{|\\vec{b}|}\\).\n" +
        "- If the second line is printed with a multiple of \\(\\vec{b}\\), such as \\(2\\vec{b}\\), the lines are still parallel. Use the same \\(\\vec{b}\\) above and below.\n" +
        "- For two lines through given points (sides of a parallelogram or a square), first show the direction ratios are proportional.\n" +
        "- The gap between opposite sides is the height: area of a parallelogram = side \\(\\times\\) this distance; a square whose opposite sides lie on the lines has side equal to it.",
      formula: {
        label: "Distance between parallel lines",
        latex: "d = \\dfrac{|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|}{|\\vec{b}|}",
      },
      authoredExample: {
        prompt: "Find the distance between the lines \\(\\vec{r} = \\hat{i} + 2\\hat{j} - \\hat{k} + \\lambda(2\\hat{i} - \\hat{j} + 2\\hat{k})\\) and \\(\\vec{r} = 3\\hat{i} + \\hat{j} + \\mu(4\\hat{i} - 2\\hat{j} + 4\\hat{k})\\).",
        steps: [
          "\\(4\\hat{i} - 2\\hat{j} + 4\\hat{k} = 2(2\\hat{i} - \\hat{j} + 2\\hat{k})\\), so the lines are parallel with \\(\\vec{b} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
          "\\(\\vec{a_2} - \\vec{a_1} = 2\\hat{i} - \\hat{j} + \\hat{k}\\).",
          "\\(\\vec{b} \\times (\\vec{a_2} - \\vec{a_1}) = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 2 \\\\ 2 & -1 & 1 \\end{vmatrix} = \\hat{i}(-1 + 2) - \\hat{j}(2 - 4) + \\hat{k}(-2 + 2) = \\hat{i} + 2\\hat{j}\\).",
          "Its length is \\(\\sqrt{5}\\), and \\(|\\vec{b}| = 3\\).",
          "\\(d = \\dfrac{\\sqrt{5}}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt{5}}{3}\\) units",
      },
      selfCheckExample: {
        prompt: "Find the distance between the parallel lines \\(\\dfrac{x - 1}{1} = \\dfrac{y}{2} = \\dfrac{z + 1}{2}\\) and \\(\\dfrac{x - 3}{1} = \\dfrac{y - 1}{2} = \\dfrac{z}{2}\\).",
        steps: [
          "\\(\\vec{b} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\) and \\(\\vec{a_2} - \\vec{a_1} = 2\\hat{i} + \\hat{j} + \\hat{k}\\).",
          "\\(\\vec{b} \\times (\\vec{a_2} - \\vec{a_1}) = \\hat{i}(2 - 2) - \\hat{j}(1 - 4) + \\hat{k}(1 - 4) = 3\\hat{j} - 3\\hat{k}\\), of length \\(3\\sqrt{2}\\).",
          "\\(d = \\dfrac{3\\sqrt{2}}{3} = \\sqrt{2}\\).",
        ],
        answer: "\\(\\sqrt{2}\\) units",
      },
      practiceSet: [
        { prompt: "One side of a parallelogram, of length 6 units, lies on a line, and the opposite side lies on a parallel line \\(2\\sqrt{2}\\) units away. Find the area of the parallelogram.", answer: "\\(12\\sqrt{2}\\) square units" },
        { prompt: "Show that \\(\\vec{r} = \\lambda(\\hat{i} - \\hat{j} + 2\\hat{k})\\) and \\(\\vec{r} = \\hat{i} + \\mu(-2\\hat{i} + 2\\hat{j} - 4\\hat{k})\\) are parallel, and find the distance between them.", answer: "\\(\\sqrt{\\dfrac{5}{6}}\\) units", method: "\\(\\vec{b} \\times \\hat{i} = 2\\hat{j} + \\hat{k}\\), of length \\(\\sqrt{5}\\); \\(|\\vec{b}| = \\sqrt{6}\\)." },
      ],
      pyqExampleId: "c1130d78-8b11-4d9d-9f9d-60594110ccd5",
      traps: [
        {
          title: "Two different b's",
          body: "If the second line carries \\(2\\vec{b}\\), use \\(\\vec{b}\\) in both the cross product and the denominator, or \\(2\\vec{b}\\) in both. Mixing them doubles or halves the answer.",
        },
        {
          title: "A dot product in place of the cross product",
          body: "For parallel lines the numerator is the length of a cross product, \\(|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|\\). A dot product there gives a different number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-meet-test",
      name: "Do the lines meet? Intersecting, parallel or skew",
      intuition:
        "If two lines that are not parallel have shortest distance zero, they must meet. So the numerator of the skew-lines formula is a test: zero means the lines lie in one plane and cross, non-zero means they are skew.",
      definition:
        "- **Step 1:** are the direction ratios proportional? If yes, the lines are parallel (or the same line).\n" +
        "- **Step 2:** if not parallel, find \\((\\vec{a_2} - \\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2})\\). Zero: the lines intersect. Not zero: they are skew.\n" +
        "- **Step 3:** to find the point, equate the general points of the two lines (the Equation of a Line page).\n" +
        "- The present NCERT book has no separate section on coplanar lines; the 2022 papers asked whether two lines are coplanar. The test is the same zero triple product, written as the determinant with rows \\(x_2 - x_1, y_2 - y_1, z_2 - z_1\\); \\(a_1, b_1, c_1\\); \\(a_2, b_2, c_2\\).",
      formula: {
        label: "Lines that are not parallel intersect exactly when",
        latex: "(\\vec{a_2} - \\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2}) = 0",
      },
      authoredExample: {
        prompt: "Determine whether the lines \\(\\vec{r} = (\\hat{i} + 2\\hat{j}) + \\lambda(\\hat{i} - \\hat{j} + \\hat{k})\\) and \\(\\vec{r} = (\\hat{i} - 2\\hat{j} + 4\\hat{k}) + \\mu(\\hat{i} + \\hat{j} - \\hat{k})\\) intersect. If they do, find the point.",
        steps: [
          "The directions \\(1, -1, 1\\) and \\(1, 1, -1\\) are not proportional, so the lines are not parallel.",
          "\\(\\vec{b_1} \\times \\vec{b_2} = \\hat{i}(1 - 1) - \\hat{j}(-1 - 1) + \\hat{k}(1 + 1) = 2\\hat{j} + 2\\hat{k}\\).",
          "\\(\\vec{a_2} - \\vec{a_1} = -4\\hat{j} + 4\\hat{k}\\), and \\((\\vec{a_2} - \\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2}) = -8 + 8 = 0\\).",
          "So the lines intersect. Equate x-coordinates: \\(1 + \\lambda = 1 + \\mu\\), so \\(\\lambda = \\mu\\).",
          "y-coordinates: \\(2 - \\lambda = -2 + \\mu\\), so \\(\\lambda = \\mu = 2\\). z: \\(\\lambda = 2\\) and \\(4 - \\mu = 2\\) agree.",
          "The point is \\((3, 0, 2)\\).",
        ],
        answer: "They intersect at \\((3, 0, 2)\\).",
      },
      selfCheckExample: {
        prompt: "Show that the lines \\(\\dfrac{x - 1}{1} = \\dfrac{y}{1} = \\dfrac{z}{1}\\) and \\(\\dfrac{x}{1} = \\dfrac{y}{-1} = \\dfrac{z - 1}{0}\\) are skew.",
        steps: [
          "The directions \\(1, 1, 1\\) and \\(1, -1, 0\\) are not proportional.",
          "\\(\\vec{b_1} \\times \\vec{b_2} = \\hat{i} + \\hat{j} - 2\\hat{k}\\) and \\(\\vec{a_2} - \\vec{a_1} = -\\hat{i} + \\hat{k}\\).",
          "Their dot product is \\(-1 + 0 - 2 = -3 \\ne 0\\), so the lines are skew.",
        ],
        answer: "Skew: the triple product is \\(-3\\), not zero (the shortest distance is \\(\\dfrac{3}{\\sqrt{6}}\\)).",
      },
      practiceSet: [
        { prompt: "Show that the lines \\(\\vec{r} = \\lambda(\\hat{i} + \\hat{j} + \\hat{k})\\) and \\(\\vec{r} = 2\\hat{i} + 2\\hat{j} + \\mu(\\hat{i} + \\hat{j} - \\hat{k})\\) intersect, and find the point.", answer: "\\((1, 1, 1)\\)", method: "\\(\\lambda = 2 + \\mu\\) and \\(\\lambda = -\\mu\\) give \\(\\lambda = 1\\), \\(\\mu = -1\\)." },
        { prompt: "For two lines, \\(\\vec{b_1} \\times \\vec{b_2} \\ne \\vec{0}\\) and \\((\\vec{a_2} - \\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2}) = 0\\). What can you say about the lines?", answer: "They are not parallel and their shortest distance is zero, so they intersect." },
      ],
      pyqExampleId: "869b1e82-7980-47ae-a355-5e47ee322171",
      traps: [
        {
          title: "A zero triple product alone",
          body: "Zero also happens for parallel lines, which lie in one plane but never meet. Say the directions are not proportional as well; only then does zero mean the lines intersect.",
        },
        {
          title: "Skew is not parallel",
          body: "Lines that do not meet may be parallel or skew. Skew lines have directions that are not proportional and a non-zero shortest distance.",
        },
      ],
    },
  ],
};
