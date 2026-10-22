import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CG_SECTION_NOTE: SubtopicNote = {
  subtopicName: "Section Formula, Midpoint and Centroid",
  title: "Section Formula, Midpoint and Centroid",
  oneLineDefinition:
    "The point that divides a join in the ratio m : n is a weighted average of the two ends; the midpoint is the 1 : 1 case and the centroid is the average of a triangle's three corners.",
  whyItMatters:
    "Twelve questions in the bank, eight EASY and four MODERATE, including the chapter's one question from the 2022 paper, a centroid. The MODERATE ones run the formulas backwards: find an end from the dividing point, find the ratio an axis makes, or find a parallelogram's fourth corner.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicgse-section",
      name: "The section formula",
      intuition:
        "A point that splits a join in the ratio m : n lies closer to the end with the smaller share. Its coordinates are a weighted average: each end is weighted by the OTHER end's share of the ratio.",
      definition:
        "- P divides the join of \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\) internally in the ratio \\(m : n\\) (AP : PB).\n" +
        "- \\(P = \\left(\\dfrac{mx_2 + nx_1}{m + n}, \\dfrac{my_2 + ny_1}{m + n}\\right)\\): m multiplies B's coordinates, n multiplies A's.\n" +
        "- **Ratio made by an axis:** call the ratio \\(k : 1\\). On the x-axis the y-coordinate is 0; on the y-axis the x-coordinate is 0. Solve for k.\n" +
        "- If P is known and an end is not, put the end in as \\((x, y)\\) and solve each coordinate.",
      formula: {
        label: "Section formula",
        latex: "P = \\left(\\frac{mx_2 + nx_1}{m + n},\\ \\frac{my_2 + ny_1}{m + n}\\right)",
        symbols: [
          { symbol: "m : n", meaning: "the ratio AP : PB" },
          { symbol: "(x_1, y_1)", meaning: "the first end, A" },
          { symbol: "(x_2, y_2)", meaning: "the second end, B" },
        ],
      },
      authoredExample: {
        prompt: "Find the point that divides the join of A(2, −3) and B(7, 7) in the ratio 2 : 3.",
        steps: [
          "\\(m = 2\\) goes with B, \\(n = 3\\) goes with A.",
          "\\(x = \\frac{2 \\times 7 + 3 \\times 2}{5} = \\frac{20}{5} = 4\\).",
          "\\(y = \\frac{2 \\times 7 + 3 \\times (-3)}{5} = \\frac{5}{5} = 1\\).",
        ],
        answer: "(4, 1)",
      },
      selfCheckExample: {
        prompt: "In what ratio does the y-axis divide the join of (−6, 1) and (2, 5)?",
        steps: [
          "Let the ratio be \\(k : 1\\). On the y-axis, \\(x = 0\\).",
          "\\(\\frac{2k + (-6)}{k + 1} = 0\\), so \\(2k = 6\\) and \\(k = 3\\).",
        ],
        answer: "3 : 1",
      },
      practiceSet: [
        { prompt: "Find the point that divides the join of (0, 0) and (6, 9) in the ratio 1 : 2.", answer: "(2, 3)" },
        { prompt: "Find the point that divides the join of (−1, 5) and (9, 0) in the ratio 2 : 3.", answer: "(3, 3)" },
        { prompt: "In what ratio does the x-axis divide the join of (2, −6) and (5, 2)?", answer: "3 : 1" },
      ],
      pyqExampleId: "536d93c2-4fb5-48d1-84fe-8331c6119109",
      traps: [
        {
          title: "Putting m with the wrong end",
          body:
            "In \\(\\frac{mx_2 + nx_1}{m + n}\\), m multiplies the SECOND point. Swapping them gives the point that divides the join in the ratio n : m, and that point is usually one of the wrong options.",
        },
        {
          title: "Setting the wrong coordinate to zero",
          body:
            "A point on the x-axis has y = 0, so for 'the x-axis divides the join' solve the y-equation. Using the x-equation answers a different question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgse-midpoint",
      name: "The midpoint and its uses",
      intuition:
        "The midpoint is the section formula with a 1 : 1 ratio: just average the two x values and the two y values. It finds a circle's centre from a diameter and a missing corner of a parallelogram.",
      definition:
        "- Midpoint of \\((x_1, y_1)\\) and \\((x_2, y_2)\\): \\(\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)\\).\n" +
        "- The **centre of a circle** is the midpoint of any diameter.\n" +
        "- The diagonals of a **parallelogram** ABCD bisect each other, so \\(A + C = B + D\\) (add the x values, then the y values).\n" +
        "- In a **right triangle**, the midpoint of the hypotenuse is the same distance from all three corners.",
      formula: {
        label: "Midpoint formula",
        latex: "M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right) \\qquad D = A + C - B",
      },
      authoredExample: {
        prompt: "Find the midpoint of the join of (−3, 8) and (5, −2).",
        steps: ["\\(x = \\frac{-3 + 5}{2} = 1\\).", "\\(y = \\frac{8 + (-2)}{2} = 3\\)."],
        answer: "(1, 3)",
      },
      selfCheckExample: {
        prompt: "A(1, 1), B(4, 2) and C(6, 5) are three vertices of a parallelogram ABCD. Find D.",
        steps: [
          "The diagonals AC and BD bisect each other, so \\(D = A + C - B\\).",
          "\\(D = (1 + 6 - 4,\\ 1 + 5 - 2) = (3, 4)\\).",
          "Check: midpoint of AC is (3.5, 3), and midpoint of BD is \\(\\left(\\frac{4 + 3}{2}, \\frac{2 + 4}{2}\\right) = (3.5, 3)\\).",
        ],
        answer: "(3, 4)",
      },
      practiceSet: [
        { prompt: "A diameter of a circle has ends (2, −1) and (6, 5). Find the centre.", answer: "(4, 2)" },
        { prompt: "M(3, 4) is the midpoint of AB and A is (1, 2). Find B.", answer: "(5, 6)" },
        {
          prompt: "A triangle has vertices O(0, 0), A(8, 0) and B(0, 6). Which point is the same distance from all three vertices?",
          answer: "(4, 3), the midpoint of the hypotenuse AB",
        },
      ],
      pyqExampleId: "cfe76afd-1fbd-4484-9c26-98357374a5b0",
      traps: [
        {
          title: "Adding the wrong pair of corners",
          body:
            "In parallelogram ABCD the diagonals are AC and BD, so D = A + C − B. Writing D = A + B − C pairs corners that are next to each other, and gives a point that makes a different shape.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgse-centroid",
      name: "The centroid of a triangle",
      intuition:
        "The three medians of a triangle meet at one point, the centroid, its balancing point. Its coordinates are simply the averages of the three corners.",
      definition:
        "- Centroid of \\((x_1, y_1), (x_2, y_2), (x_3, y_3)\\): \\(\\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)\\).\n" +
        "- The **medians** meet at the centroid, and it divides each median in the ratio 2 : 1 from the vertex.\n" +
        "- To find a missing vertex or letter, write the average equal to the given centroid and solve, one coordinate at a time.",
      formula: {
        label: "Centroid",
        latex: "G = \\left(\\frac{x_1 + x_2 + x_3}{3},\\ \\frac{y_1 + y_2 + y_3}{3}\\right)",
      },
      authoredExample: {
        prompt: "Find the centroid of the triangle with vertices (1, 2), (4, 6) and (7, −2).",
        steps: ["\\(x = \\frac{1 + 4 + 7}{3} = 4\\).", "\\(y = \\frac{2 + 6 + (-2)}{3} = 2\\)."],
        answer: "(4, 2)",
      },
      selfCheckExample: {
        prompt: "The centroid of the triangle with vertices (a, 1), (3, b) and (5, 4) is (3, 2). Find a and b.",
        steps: ["\\(\\frac{a + 3 + 5}{3} = 3\\), so \\(a + 8 = 9\\) and \\(a = 1\\).", "\\(\\frac{1 + b + 4}{3} = 2\\), so \\(b + 5 = 6\\) and \\(b = 1\\)."],
        answer: "\\(a = 1,\\ b = 1\\)",
      },
      practiceSet: [
        { prompt: "Find the centroid of the triangle with vertices (0, 0), (6, 0) and (0, 9).", answer: "(2, 3)" },
        { prompt: "What is the point where the three medians of a triangle meet called?", answer: "The centroid" },
        { prompt: "In what ratio does the centroid divide each median, counting from the vertex?", answer: "2 : 1" },
        { prompt: "Two vertices of a triangle are (1, 4) and (5, 2), and its centroid is (2, 2). Find the third vertex.", answer: "(0, 0)" },
      ],
      pyqExampleId: "c31d2b8f-6ebf-43be-9c2d-9b8dde667c6d",
      traps: [
        {
          title: "Dividing by 2 instead of 3",
          body:
            "The centroid averages THREE corners, so divide the sum by 3. Dividing by 2 is the midpoint habit, and the point it gives is not the centroid.",
        },
        {
          title: "Forgetting to multiply back",
          body:
            "To find a missing vertex, multiply the centroid by 3 first: the three x values must add to 3 times the centroid's x. Subtracting the known vertices straight from the centroid gives the wrong point.",
        },
      ],
    },
  ],
};
