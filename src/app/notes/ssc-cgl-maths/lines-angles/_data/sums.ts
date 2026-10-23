import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_LA_SUMS_NOTE: SubtopicNote = {
  subtopicName: "Angles, Parallels and Polygon Sums",
  title: "Angles, Parallels and Polygon Sums",
  oneLineDefinition:
    "Angles on a straight line add to 180°, angles round a point to 360°, a polygon with n sides has interior angles adding to (n − 2) × 180°, its exterior angles always add to 360°, and it has n(n − 3)/2 diagonals.",
  whyItMatters:
    "Eight questions in the bank, seven EASY and one MODERATE, all from the 2025 shifts. Each is one fact used once: a vertically opposite or alternate angle, an angle sum, a missing angle, a count of diagonals. Learn the three formulas until you can write them without thinking and each of these takes well under the 36 seconds you have.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssclasu-lines",
      name: "Angles at crossing lines and at parallel lines",
      intuition:
        "A straight line is half a turn, so the angles along it share 180°. A full turn round a point is 360°. When a third line crosses two parallel lines, it meets both at the same slant, so the angles it makes at one line repeat at the other.",
      definition:
        "- **Linear pair:** two angles side by side on a straight line add to \\(180^\\circ\\).\n" +
        "- **Angles round a point** add to \\(360^\\circ\\).\n" +
        "- **Vertically opposite angles** (across the crossing point of two lines) are equal.\n" +
        "- A **transversal** is a line that cuts two other lines. When those two lines are **parallel**: corresponding angles are equal, alternate interior angles are equal, and co-interior angles (between the parallels, on the same side of the transversal) add to \\(180^\\circ\\).\n" +
        "- The equal-angle rules work only for parallel lines. Read the reverse too: if alternate angles are equal, the lines are parallel.",
      formula: {
        label: "Angles at lines",
        latex:
          "\\text{linear pair} = 180^\\circ \\qquad \\text{round a point} = 360^\\circ \\qquad \\text{co-interior pair} = 180^\\circ",
      },
      authoredExample: {
        prompt: "Two straight lines cross each other. One of the four angles formed is \\(40^\\circ\\) more than the angle next to it. Find all four angles.",
        steps: [
          "The two neighbouring angles form a linear pair: \\(x + (x + 40) = 180\\).",
          "So \\(2x = 140\\) and \\(x = 70\\). The neighbour is \\(110^\\circ\\).",
          "Vertically opposite angles are equal, so the four angles are \\(70^\\circ\\), \\(110^\\circ\\), \\(70^\\circ\\), \\(110^\\circ\\).",
          "Check: \\(70 + 110 + 70 + 110 = 360\\), a full turn.",
        ],
        answer: "\\(70^\\circ, 110^\\circ, 70^\\circ, 110^\\circ\\)",
      },
      selfCheckExample: {
        prompt:
          "A transversal cuts two parallel lines. Two co-interior angles are \\((2x + 10)^\\circ\\) and \\((3x + 20)^\\circ\\). Find both angles.",
        steps: [
          "Co-interior angles add to \\(180^\\circ\\): \\(5x + 30 = 180\\), so \\(x = 30\\).",
          "The angles are \\(2(30) + 10 = 70^\\circ\\) and \\(3(30) + 20 = 110^\\circ\\).",
        ],
        answer: "\\(70^\\circ\\) and \\(110^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Two lines cross and one angle is \\(128^\\circ\\). What is the angle vertically opposite to it?", answer: "\\(128^\\circ\\)" },
        { prompt: "Two lines cross and one angle is \\(128^\\circ\\). What is each angle next to it?", answer: "\\(52^\\circ\\)" },
        {
          prompt: "A transversal cuts two parallel lines. One angle is \\(64^\\circ\\). What is the corresponding angle at the other parallel line?",
          answer: "\\(64^\\circ\\)",
        },
        {
          prompt: "Five angles meet at a point. Four of them are \\(50^\\circ\\), \\(80^\\circ\\), \\(90^\\circ\\) and \\(70^\\circ\\). What is the fifth?",
          answer: "\\(70^\\circ\\)",
          method: "\\(360 - 290 = 70\\).",
        },
      ],
      pyqExampleId: "56d27469-aa0b-4831-8191-84828b88732f",
      traps: [
        {
          title: "Calling alternate angles supplementary",
          body:
            "With parallel lines, alternate interior angles are equal. The pair that adds to \\(180^\\circ\\) is the co-interior pair, on the same side of the transversal. If one alternate angle is \\(115^\\circ\\), the other is \\(115^\\circ\\), and \\(65^\\circ\\) is a wrong option.",
        },
        {
          title: "Using the parallel-line rules on lines that are not parallel",
          body:
            "Corresponding and alternate angles are equal only when the two lines cut by the transversal are parallel. If the question does not say so, or give equal angles that prove it, do not assume it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclasu-sums",
      name: "Interior and exterior angle sums of a polygon",
      intuition:
        "Pick one corner of a polygon and join it to every other corner. An n-sided polygon splits into n − 2 triangles, and each triangle holds 180°. For the outside angles, walk once round the edge: at each corner you turn through the exterior angle, and one lap is one full turn, 360°, however many corners there are.",
      definition:
        "- **Interior angle sum** of an n-sided polygon \\(= (n - 2) \\times 180^\\circ\\).\n" +
        "- **Exterior angle sum**, one at each corner, \\(= 360^\\circ\\) for every convex polygon. It does not depend on n.\n" +
        "- At each corner, interior angle \\(+\\) exterior angle \\(= 180^\\circ\\) (a linear pair).\n" +
        "- Sums worth knowing by heart: triangle \\(180^\\circ\\), quadrilateral \\(360^\\circ\\), pentagon \\(540^\\circ\\), hexagon \\(720^\\circ\\), heptagon \\(900^\\circ\\), octagon \\(1080^\\circ\\). Each extra side adds \\(180^\\circ\\).\n" +
        "- None of this needs the polygon to be regular.",
      formula: {
        label: "Polygon angle sums",
        latex:
          "\\text{interior sum} = (n - 2) \\times 180^\\circ \\qquad \\text{exterior sum} = 360^\\circ \\qquad \\text{interior} + \\text{exterior} = 180^\\circ",
        symbols: [{ symbol: "n", meaning: "the number of sides, which is also the number of corners" }],
      },
      authoredExample: {
        prompt:
          "The five interior angles of a pentagon are \\(x\\), \\(x + 10\\), \\(x + 20\\), \\(x + 30\\) and \\(x + 40\\) degrees. Find the largest angle.",
        steps: [
          "A pentagon has \\(n = 5\\), so its interior angles add to \\((5 - 2) \\times 180 = 540^\\circ\\).",
          "\\(5x + (10 + 20 + 30 + 40) = 5x + 100 = 540\\), so \\(5x = 440\\) and \\(x = 88\\).",
          "The largest angle is \\(x + 40 = 128^\\circ\\).",
          "Check: \\(88 + 98 + 108 + 118 + 128 = 540\\).",
        ],
        answer: "\\(128^\\circ\\)",
      },
      selfCheckExample: {
        prompt:
          "Six of the interior angles of a heptagon (7 sides) add up to \\(790^\\circ\\). Find the seventh interior angle and the exterior angle at that corner.",
        steps: [
          "Interior sum of a heptagon \\(= (7 - 2) \\times 180 = 900^\\circ\\).",
          "Seventh interior angle \\(= 900 - 790 = 110^\\circ\\).",
          "Its exterior angle \\(= 180 - 110 = 70^\\circ\\).",
        ],
        answer: "\\(110^\\circ\\) inside, \\(70^\\circ\\) outside",
      },
      practiceSet: [
        { prompt: "What is the sum of the interior angles of a hexagon?", answer: "\\(720^\\circ\\)" },
        { prompt: "What is the sum of the exterior angles of a convex 15-sided polygon, one at each corner?", answer: "\\(360^\\circ\\)" },
        {
          prompt: "The interior angles of a polygon add up to \\(1260^\\circ\\). How many sides does it have?",
          answer: "9",
          method: "\\(n - 2 = \\frac{1260}{180} = 7\\).",
        },
        { prompt: "An interior angle of a polygon is \\(132^\\circ\\). What is the exterior angle at the same corner?", answer: "\\(48^\\circ\\)" },
      ],
      pyqExampleId: "6b7eb034-c005-40e8-adaf-f032bd2ef932",
      traps: [
        {
          title: "Using n × 180° for the interior sum",
          body:
            "The interior sum is \\((n - 2) \\times 180^\\circ\\), because the polygon splits into \\(n - 2\\) triangles, not n. A decagon's angles add to \\(1440^\\circ\\), not \\(1800^\\circ\\).",
        },
        {
          title: "Thinking the exterior sum grows with the sides",
          body:
            "One exterior angle at each corner of any convex polygon adds to \\(360^\\circ\\), for a triangle and for a 20-sided figure alike. 'Depends on the number of sides' is a printed wrong option.",
        },
        {
          title: "Giving the interior angle when the exterior one is asked",
          body:
            "When a question finds a missing interior angle and then asks for the exterior angle at that corner, take one more step: exterior \\(= 180^\\circ -\\) interior. The interior value is usually printed as a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclasu-diagonals",
      name: "Number of diagonals of a polygon",
      intuition:
        "A diagonal joins two corners that are not next to each other. From one corner you can reach every other corner except itself and its two neighbours, so n − 3 diagonals start there. Doing that at all n corners counts every diagonal twice, once from each end.",
      definition:
        "- Diagonals from one corner \\(= n - 3\\).\n" +
        "- Total diagonals \\(= \\frac{n(n - 3)}{2}\\).\n" +
        "- Another way: every pair of corners is joined by a side or a diagonal. There are \\(\\frac{n(n - 1)}{2}\\) pairs, and n of them are sides, so the diagonals are \\(\\frac{n(n - 1)}{2} - n\\).\n" +
        "- Fast route when the diagonals are given and n is asked: try the options in \\(n(n - 3) = 2 \\times\\) diagonals.",
      formula: {
        label: "Diagonals of an n-sided polygon",
        latex: "\\text{diagonals} = \\frac{n(n - 3)}{2}",
      },
      authoredExample: {
        prompt: "How many diagonals does a polygon with 10 sides have?",
        steps: [
          "From each corner, \\(10 - 3 = 7\\) diagonals start.",
          "Ten corners give \\(10 \\times 7 = 70\\), but each diagonal was counted from both its ends.",
          "Diagonals \\(= \\frac{70}{2} = 35\\).",
        ],
        answer: "35",
      },
      selfCheckExample: {
        prompt: "The interior angles of a polygon add up to 3 times the sum of its exterior angles. How many diagonals does it have?",
        steps: [
          "\\((n - 2) \\times 180 = 3 \\times 360 = 1080\\), so \\(n - 2 = 6\\) and \\(n = 8\\).",
          "Diagonals \\(= \\frac{8 \\times 5}{2} = 20\\).",
        ],
        answer: "20",
      },
      practiceSet: [
        { prompt: "How many diagonals does a pentagon have?", answer: "5" },
        { prompt: "How many diagonals does a 12-sided polygon have?", answer: "54" },
        {
          prompt: "A polygon has 27 diagonals. How many sides does it have?",
          answer: "9",
          method: "\\(n(n - 3) = 54 = 9 \\times 6\\).",
        },
        { prompt: "How many diagonals start from one corner of a 12-sided polygon?", answer: "9" },
      ],
      pyqExampleId: "ab64cf71-c815-4633-b1f3-61b69e2a39ba",
      traps: [
        {
          title: "Counting every pair of corners as a diagonal",
          body:
            "\\(\\frac{n(n - 1)}{2}\\) counts every pair of corners, sides included. Take away the n sides: a hexagon has \\(15 - 6 = 9\\) diagonals, not 15.",
        },
        {
          title: "Forgetting to halve",
          body:
            "\\(n(n - 3)\\) counts each diagonal from both ends. Divide by 2: a hexagon has \\(\\frac{6 \\times 3}{2} = 9\\) diagonals, not 18.",
        },
      ],
    },
  ],
};
