import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LA_PARALLEL_NOTE: SubtopicNote = {
  subtopicName: "Intersecting Lines, Parallel Lines and Polygons",
  title: "Intersecting Lines, Parallel Lines and Polygons",
  oneLineDefinition:
    "Where two lines cross, opposite angles are equal and neighbours add to 180 degrees; a transversal across parallel lines makes equal alternate and corresponding angles; the exterior angles of any polygon add to 360 degrees.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE: angles round a crossing point, a bent path between parallel lines, and the sides of a regular polygon from one exterior angle. Each needs one rule applied twice, so name the rule at every step.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spilapa-intersect",
      name: "Angles where two lines cross",
      intuition:
        "Two crossing lines make four angles round one point. Neighbouring angles sit on a straight line, so they add to 180 degrees, and the angles facing each other across the point come out equal.",
      definition:
        "- Neighbouring angles on a straight line form a **linear pair** and add to \\(180^\\circ\\).\n" +
        "- **Vertically opposite** angles, facing each other across the crossing point, are **equal**.\n" +
        "- All the angles round a point add to \\(360^\\circ\\).\n" +
        "- So one angle gives all four: the opposite one is equal and the two others are \\(180^\\circ\\) minus it.",
      formula: {
        label: "Angles at a crossing",
        latex: "\\text{linear pair: } a + b = 180^\\circ \\qquad \\text{vertically opposite angles are equal} \\qquad \\text{round a point: } 360^\\circ",
      },
      authoredExample: {
        prompt: "Lines PQ and RS cross at O, with \\(\\angle POR = 3x\\) and \\(\\angle ROQ = 2x\\). Find all four angles at O.",
        steps: [
          "\\(\\angle POR\\) and \\(\\angle ROQ\\) are a linear pair on PQ: \\(3x + 2x = 180\\), so \\(x = 36\\).",
          "\\(\\angle POR = 108^\\circ\\) and \\(\\angle ROQ = 72^\\circ\\).",
          "Vertically opposite angles: \\(\\angle QOS = 108^\\circ\\) and \\(\\angle SOP = 72^\\circ\\).",
        ],
        answer: "\\(108^\\circ, 72^\\circ, 108^\\circ, 72^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "Two lines cross, and one of the four angles is \\(47^\\circ\\). Find the other three.",
        steps: ["The opposite angle is \\(47^\\circ\\).", "Each neighbour is \\(180^\\circ - 47^\\circ = 133^\\circ\\)."],
        answer: "\\(133^\\circ, 47^\\circ, 133^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Lines AB and CD cross at O. If \\(\\angle AOC = 58^\\circ\\), find \\(\\angle BOD\\).", answer: "\\(58^\\circ\\), vertically opposite" },
        { prompt: "Four angles fit round a point. Three of them are \\(120^\\circ\\), \\(95^\\circ\\) and \\(80^\\circ\\). Find the fourth.", answer: "\\(65^\\circ\\)" },
        { prompt: "Lines XY and MN cross at O. If \\(\\angle XOM = 64^\\circ\\), find \\(\\angle XON\\).", answer: "\\(116^\\circ\\), a linear pair" },
        { prompt: "Two lines cross, and three of the four angles add to \\(250^\\circ\\). Find the fourth angle.", answer: "\\(110^\\circ\\)" },
      ],
      pyqExampleId: "751017c2-fcdf-4407-9966-306d0b7bc643",
      traps: [
        {
          title: "Making vertically opposite angles add to 180",
          body: "Vertically opposite angles are equal. It is the neighbouring angles, the linear pair, that add to \\(180^\\circ\\).",
        },
        {
          title: "Using 180 for the angles round a point",
          body: "All the angles round a point add to \\(360^\\circ\\). Only the angles on one side of a straight line add to \\(180^\\circ\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilapa-parallel",
      name: "Parallel lines cut by a transversal",
      intuition:
        "A line crossing two parallel lines meets both at the same tilt, so the angles it makes at one line repeat at the other. That gives equal pairs and pairs adding to 180 degrees.",
      definition:
        "- A **transversal** is a line that cuts two or more lines.\n" +
        "- If the lines are parallel: **alternate** angles (a Z shape) are equal, **corresponding** angles (an F shape) are equal, and **co-interior** angles (a C shape, same side, between the lines) add to \\(180^\\circ\\).\n" +
        "- It works the other way too: if alternate angles are equal, the lines are parallel.\n" +
        "- For a bent path between two parallel lines, draw a third line through the bend, parallel to both. The angle at the bend is then the sum of the two alternate angles.",
      formula: {
        label: "Parallel lines",
        latex: "\\text{alternate} = \\text{alternate} \\qquad \\text{corresponding} = \\text{corresponding} \\qquad \\text{co-interior angles add to } 180^\\circ",
      },
      authoredExample: {
        prompt: "A transversal cuts two parallel lines, and one of the angles it makes with the first line is \\(65^\\circ\\). Find the alternate angle and the co-interior angle at the second line.",
        steps: [
          "Alternate angles are equal: \\(65^\\circ\\).",
          "Co-interior angles add to \\(180^\\circ\\): \\(180^\\circ - 65^\\circ = 115^\\circ\\).",
        ],
        answer: "\\(65^\\circ\\) and \\(115^\\circ\\)",
      },
      selfCheckExample: {
        prompt:
          "AB is parallel to CD and P is a point between them. K is on AB and L is on CD, with B and D on the same side. If \\(\\angle BKP = 55^\\circ\\) and \\(\\angle DLP = 35^\\circ\\), find \\(\\angle KPL\\).",
        steps: [
          "Draw a line through P parallel to AB and CD.",
          "The alternate angles at P are \\(55^\\circ\\) and \\(35^\\circ\\).",
          "\\(\\angle KPL = 55^\\circ + 35^\\circ = 90^\\circ\\).",
        ],
        answer: "\\(90^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Two parallel lines are cut by a transversal. One co-interior angle is \\(72^\\circ\\). Find the other.", answer: "\\(108^\\circ\\)" },
        { prompt: "A transversal cuts two lines and makes alternate angles of \\(64^\\circ\\) and \\(64^\\circ\\). Are the lines parallel?", answer: "Yes, because the alternate angles are equal" },
        { prompt: "Two parallel lines are cut by a transversal, and two corresponding angles are \\((3x + 10)^\\circ\\) and \\(70^\\circ\\). Find x.", answer: "\\(x = 20\\)" },
        { prompt: "A transversal cuts two lines, and the co-interior angles are \\(95^\\circ\\) and \\(85^\\circ\\). Are the lines parallel?", answer: "Yes, because they add to \\(180^\\circ\\)" },
      ],
      pyqExampleId: "d9037725-c4d6-47c4-b650-52206a59dc5f",
      traps: [
        {
          title: "Making co-interior angles equal",
          body: "Co-interior angles, on the same side and between the parallel lines, add to \\(180^\\circ\\). Alternate and corresponding angles are the equal ones.",
        },
        {
          title: "Using the rules on lines that are not parallel",
          body: "Alternate angles are equal only when the lines are parallel. If a question asks when two lines are parallel, set the alternate angles equal and solve.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilapa-polygon",
      name: "Angles of a triangle and a polygon",
      intuition:
        "Walk round any polygon and you turn once all the way round, so the exterior angles always add to 360 degrees. In a regular polygon all of them are equal, so one exterior angle tells you the number of sides.",
      definition:
        "- The angles of a **triangle** add to \\(180^\\circ\\).\n" +
        "- The **interior** angles of a polygon with \\(n\\) sides add to \\((n - 2) \\times 180^\\circ\\).\n" +
        "- The **exterior** angles of any polygon add to \\(360^\\circ\\).\n" +
        "- In a **regular** polygon: each exterior angle is \\(\\frac{360^\\circ}{n}\\), and each interior angle is \\(180^\\circ\\) minus it.",
      formula: {
        label: "Polygon angles",
        latex: "\\text{interior sum} = (n - 2) \\times 180^\\circ \\qquad \\text{exterior angle of a regular polygon} = \\frac{360^\\circ}{n}",
        symbols: [{ symbol: "n", meaning: "number of sides" }],
      },
      authoredExample: {
        prompt: "Each exterior angle of a regular polygon is \\(40^\\circ\\). How many sides does it have, and what is each interior angle?",
        steps: [
          "\\(n = \\frac{360^\\circ}{40^\\circ} = 9\\) sides.",
          "Each interior angle \\(= 180^\\circ - 40^\\circ = 140^\\circ\\).",
        ],
        answer: "9 sides, \\(140^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "Find the sum of the interior angles of a hexagon.",
        steps: ["A hexagon has 6 sides.", "\\((6 - 2) \\times 180^\\circ = 720^\\circ\\)."],
        answer: "\\(720^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Each exterior angle of a regular polygon is \\(30^\\circ\\). How many sides does it have?", answer: "12" },
        { prompt: "Each interior angle of a regular polygon is \\(162^\\circ\\). How many sides does it have?", answer: "Exterior angle \\(18^\\circ\\), so 20 sides" },
        { prompt: "Find each exterior angle of a regular pentagon.", answer: "\\(72^\\circ\\)" },
        { prompt: "Two angles of a triangle are \\(48^\\circ\\) and \\(77^\\circ\\). Find the third.", answer: "\\(55^\\circ\\)" },
      ],
      pyqExampleId: "56fce3e0-75d7-4d83-960a-8894f173bd46",
      traps: [
        {
          title: "Dividing 360 by the interior angle",
          body: "The number of sides is 360 divided by the EXTERIOR angle. If the interior angle is given, subtract it from \\(180^\\circ\\) first.",
        },
        {
          title: "Using 180 for the exterior angles",
          body: "The exterior angles of every polygon add to \\(360^\\circ\\), whatever the number of sides. It is the triangle's interior angles that add to \\(180^\\circ\\).",
        },
      ],
    },
  ],
};
