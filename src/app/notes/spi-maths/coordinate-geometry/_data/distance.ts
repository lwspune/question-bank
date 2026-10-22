import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CG_DISTANCE_NOTE: SubtopicNote = {
  subtopicName: "Coordinates and the Distance Formula",
  title: "Coordinates and the Distance Formula",
  oneLineDefinition:
    "A point is fixed by its x and y coordinates, and the distance between two points is the square root of the sum of the squares of their x and y differences.",
  whyItMatters:
    "Eleven questions in the bank: eight EASY, two MODERATE and the chapter's only HARD one. Four test the words (origin, abscissa, the equation of an axis); the rest put two points into the distance formula, forwards or backwards. The marks go on a minus sign or a lost second answer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spicgdi-plane",
      name: "Axes, quadrants, abscissa and ordinate",
      intuition:
        "Two number lines cross at right angles at zero. Any point is reached by walking along the x-axis and then up or down: those two moves, written (x, y), are its coordinates.",
      definition:
        "- The **origin** O is where the axes meet: (0, 0).\n" +
        "- The **abscissa** is the x-coordinate; the **ordinate** is the y-coordinate.\n" +
        "- Every point on the x-axis has y = 0, so the x-axis is the line **y = 0**; the y-axis is **x = 0**.\n" +
        "- **y = k** is a horizontal line, parallel to the x-axis; **x = k** is a vertical line, parallel to the y-axis.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Origin", "Where the axes meet", "(0, 0)"] },
          { cells: ["Abscissa", "The x-coordinate", "Abscissa of (−3, 5) is −3"] },
          { cells: ["Ordinate", "The y-coordinate", "Ordinate of (−3, 5) is 5"] },
          { cells: ["Quadrant I, II, III, IV", "Signs (+, +), (−, +), (−, −), (+, −)", "(−3, 5) is in quadrant II"] },
          { cells: ["Point on the x-axis", "y-coordinate is 0", "(4, 0)"] },
          { cells: ["Point on the y-axis", "x-coordinate is 0", "(0, −2)"] },
          { cells: ["Equation of the x-axis", "y = 0", "Every point (x, 0)"] },
          { cells: ["Equation of the y-axis", "x = 0", "Every point (0, y)"] },
          { cells: ["Line y = k", "Parallel to the x-axis, k units from it", "y = 3 passes through (1, 3) and (7, 3)"] },
          { cells: ["Line x = k", "Parallel to the y-axis, k units from it", "x = −2 passes through (−2, 0) and (−2, 6)"] },
          {
            cells: ["Distance from the x-axis", "The size of y", "(6, −4) is 4 units from the x-axis"],
            noteAmber: "Distance from the x-axis is the size of y, and from the y-axis the size of x: the other coordinate.",
          },
        ],
        caption: "Quadrants are counted anticlockwise from the top right.",
      },
      selfCheckExample: {
        prompt: "In which quadrant does the point (−3, 4) lie?",
        steps: ["x is negative and y is positive.", "Signs (−, +) mean quadrant II."],
        answer: "Quadrant II",
      },
      practiceSet: [
        { prompt: "What is the ordinate of the point (7, −2)?", answer: "\\(-2\\)" },
        { prompt: "What is the equation of the y-axis?", answer: "\\(x = 0\\)" },
        { prompt: "The line \\(x = -4\\) is parallel to which axis?", answer: "The y-axis" },
        { prompt: "How far is the point (5, −3) from the x-axis?", answer: "3 units" },
      ],
      pyqExampleId: "832104a4-8e52-43ed-9a2b-ed44d333a2c8",
      traps: [
        {
          title: "y = k is parallel to the x-axis, not the y-axis",
          body:
            "The line y = 3 keeps y fixed while x runs, so it is horizontal: parallel to the x-axis. It is tempting to pair 'y' with the y-axis, which is the wrong way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgdi-distance",
      name: "The distance formula",
      intuition:
        "Join the two points and draw a right triangle under the join: one leg along x, one along y. The join is the hypotenuse, so Pythagoras gives its length.",
      definition:
        "- Distance between \\((x_1, y_1)\\) and \\((x_2, y_2)\\): \\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).\n" +
        "- Distance of \\((x, y)\\) from the origin: \\(\\sqrt{x^2 + y^2}\\).\n" +
        "- If the two points have the same y, the distance is just the gap between the x values (and the same for the same x).\n" +
        "- With sines and cosines, finish with \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).",
      formula: {
        label: "Distance formula",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\qquad OP = \\sqrt{x^2 + y^2}",
      },
      authoredExample: {
        prompt: "Find the distance between the points (−2, 3) and (4, −5).",
        steps: [
          "x difference: \\(4 - (-2) = 6\\). y difference: \\(-5 - 3 = -8\\).",
          "\\(d = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\).",
        ],
        answer: "10 units",
      },
      selfCheckExample: {
        prompt: "Find the distance of the point \\((5\\cos\\theta, 5\\sin\\theta)\\) from the origin.",
        steps: [
          "\\(\\sqrt{25\\cos^2\\theta + 25\\sin^2\\theta} = \\sqrt{25(\\cos^2\\theta + \\sin^2\\theta)}\\).",
          "\\(= \\sqrt{25 \\times 1} = 5\\).",
        ],
        answer: "5 units",
      },
      practiceSet: [
        { prompt: "Find the distance between (2, 3) and (8, 11).", answer: "10 units" },
        { prompt: "Find the distance of the point (−5, 12) from the origin.", answer: "13 units" },
        { prompt: "Find the distance between (−3, 7) and (5, 7).", answer: "8 units" },
      ],
      pyqExampleId: "5dad8b80-b271-49c5-9960-fac553789508",
      traps: [
        {
          title: "Losing a minus sign",
          body:
            "Subtracting a negative coordinate adds: \\(4 - (-2) = 6\\), not 2. A wrong difference still gives a neat-looking square root, so check each difference before squaring.",
        },
        {
          title: "Stopping before the square root",
          body:
            "\\(36 + 64 = 100\\) is the square of the distance. The distance is \\(\\sqrt{100} = 10\\); the 100 is often printed as a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgdi-unknown",
      name: "Finding an unknown coordinate from a distance",
      intuition:
        "When the distance is given and one coordinate is missing, put the missing one in as a letter, square both sides and solve. A point can sit on either side, so expect two answers.",
      definition:
        "- Write the distance formula with the unknown, then **square both sides** to remove the root.\n" +
        "- \\((y - a)^2 = b^2\\) gives \\(y - a = b\\) **or** \\(y - a = -b\\): two answers.\n" +
        "- A point **equidistant** from A and B: set its distance to A equal to its distance to B, square both sides, and the squared unknown cancels.\n" +
        "- A point on the x-axis is \\((x, 0)\\); on the y-axis, \\((0, y)\\).",
      formula: {
        label: "Equal distances",
        latex: "PA = PB \\Rightarrow PA^2 = PB^2",
      },
      authoredExample: {
        prompt: "The distance between the points (1, 2) and (4, y) is 5 units. Find y.",
        steps: [
          "\\((4 - 1)^2 + (y - 2)^2 = 5^2\\), so \\(9 + (y - 2)^2 = 25\\).",
          "\\((y - 2)^2 = 16\\), so \\(y - 2 = 4\\) or \\(y - 2 = -4\\).",
          "\\(y = 6\\) or \\(y = -2\\).",
        ],
        answer: "\\(y = 6\\) or \\(y = -2\\)",
      },
      selfCheckExample: {
        prompt: "Find the point on the x-axis that is equidistant from (2, 3) and (6, 1).",
        steps: [
          "Let it be (x, 0). \\((x - 2)^2 + 9 = (x - 6)^2 + 1\\).",
          "\\(x^2 - 4x + 13 = x^2 - 12x + 37\\), so \\(8x = 24\\) and \\(x = 3\\).",
          "Check: both distances are \\(\\sqrt{10}\\).",
        ],
        answer: "(3, 0)",
      },
      practiceSet: [
        { prompt: "The distance between (x, 4) and (1, 4) is 6 units. Find x.", answer: "\\(x = 7\\) or \\(x = -5\\)" },
        { prompt: "A point (0, y) on the y-axis is 5 units from (3, 0). Find y.", answer: "\\(y = 4\\) or \\(y = -4\\)" },
        { prompt: "The point (k, 0) is equidistant from (0, 2) and (4, 0). Find k.", answer: "\\(k = 1.5\\)", method: "\\(k^2 + 4 = (k - 4)^2\\) gives \\(8k = 12\\)." },
      ],
      pyqExampleId: "709e7960-e0a1-4eae-8fd0-0fabf3f1fb84",
      traps: [
        {
          title: "Keeping only one root",
          body:
            "\\((y - 2)^2 = 16\\) gives \\(y - 2 = \\pm 4\\), so y is 6 or −2. Options often print both values together; a single value is incomplete.",
        },
        {
          title: "Leaving the squared unknown in an equidistance question",
          body:
            "When you set \\(PA^2 = PB^2\\), the \\(x^2\\) (or \\(y^2\\)) appears on both sides and cancels, leaving a simple equation. If it does not cancel, a square has been expanded wrongly.",
        },
      ],
    },
  ],
};
