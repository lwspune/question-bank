import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_QU_SHAPES_NOTE: SubtopicNote = {
  subtopicName: "Parallelograms and Other Quadrilaterals",
  title: "Parallelograms and Other Quadrilaterals",
  oneLineDefinition:
    "The angles of any quadrilateral add to 360 degrees; in a parallelogram opposite sides and angles are equal and neighbouring angles add to 180 degrees.",
  whyItMatters:
    "Six questions in the bank: two EASY, three MODERATE and one HARD. Each tests one property, such as the angles of a parallelogram, the shape made by joining mid-points, or a trapezium cut by a parallel line, so knowing which shape has which property is most of the work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiqush-angles",
      name: "The angle sum of a quadrilateral",
      intuition:
        "A diagonal cuts any quadrilateral into two triangles. Each triangle's angles add to 180 degrees, so the four angles of the quadrilateral add to 360 degrees.",
      definition:
        "- \\(\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ\\) in every quadrilateral.\n" +
        "- If the bisectors of \\(\\angle A\\) and \\(\\angle B\\) meet at P, triangle APB gives \\(\\angle APB = 180^\\circ - \\frac{\\angle A + \\angle B}{2}\\).\n" +
        "- Since \\(\\angle A + \\angle B = 360^\\circ - \\angle C - \\angle D\\), this is the same as \\(\\angle APB = \\frac{\\angle C + \\angle D}{2}\\).\n" +
        "- The four bisectors of a quadrilateral make a new quadrilateral whose **opposite angles add to** \\(180^\\circ\\), because the two halves together use all four angles once.",
      formula: {
        label: "Angles of a quadrilateral",
        latex: "\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ \\qquad \\angle APB = \\frac{\\angle C + \\angle D}{2}",
      },
      authoredExample: {
        prompt: "The angles of a quadrilateral are in the ratio 1 : 2 : 3 : 4. Find them.",
        steps: [
          "Let the angles be \\(x, 2x, 3x, 4x\\). Then \\(10x = 360\\), so \\(x = 36\\).",
          "The angles are \\(36^\\circ, 72^\\circ, 108^\\circ, 144^\\circ\\). Check: they add to 360.",
        ],
        answer: "\\(36^\\circ, 72^\\circ, 108^\\circ, 144^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "The bisectors of \\(\\angle A\\) and \\(\\angle B\\) of a quadrilateral ABCD meet at P. If \\(\\angle C = 100^\\circ\\) and \\(\\angle D = 60^\\circ\\), find \\(\\angle APB\\).",
        steps: ["\\(\\angle A + \\angle B = 360^\\circ - 160^\\circ = 200^\\circ\\).", "\\(\\angle APB = 180^\\circ - 100^\\circ = 80^\\circ\\), which is \\(\\frac{100 + 60}{2}\\)."],
        answer: "\\(80^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Three angles of a quadrilateral are \\(75^\\circ\\), \\(110^\\circ\\) and \\(95^\\circ\\). Find the fourth.", answer: "\\(80^\\circ\\)" },
        { prompt: "Can a quadrilateral have angles of \\(100^\\circ\\), \\(100^\\circ\\), \\(100^\\circ\\) and \\(70^\\circ\\)?", answer: "No: they add to \\(370^\\circ\\), not \\(360^\\circ\\)" },
        { prompt: "The bisectors of \\(\\angle A\\) and \\(\\angle B\\) of a quadrilateral ABCD meet at P. If \\(\\angle A = 70^\\circ\\) and \\(\\angle B = 110^\\circ\\), find \\(\\angle APB\\).", answer: "\\(180^\\circ - 90^\\circ = 90^\\circ\\)" },
        { prompt: "In a quadrilateral, two angles are \\(2x\\) each and the other two are \\(3x\\) each. Find x.", answer: "\\(10x = 360\\), so \\(x = 36\\)" },
      ],
      pyqExampleId: "fa8c9cc1-c986-410f-8c2c-343cf581dca8",
      traps: [
        {
          title: "Using 180 for a quadrilateral",
          body: "180 degrees is the angle sum of a triangle. A quadrilateral is two triangles, so its angles add to \\(360^\\circ\\).",
        },
        {
          title: "Taking the bisector figure for a rectangle",
          body: "The bisectors of a general quadrilateral make a figure with opposite angles adding to \\(180^\\circ\\). It is a rectangle when the first figure is a parallelogram, but not in general.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqush-parallelogram",
      name: "Sides, angles and height of a parallelogram",
      intuition:
        "In a parallelogram each pair of opposite sides is parallel, so each side acts as a transversal of the other pair. That is why neighbouring angles add to 180 degrees and opposite angles come out equal.",
      definition:
        "- Opposite sides are **equal** and parallel.\n" +
        "- Opposite angles are **equal**; neighbouring angles **add to** \\(180^\\circ\\).\n" +
        "- The diagonals **bisect each other**.\n" +
        "- The height to a side is the perpendicular from the opposite side. In the right triangle it makes, height \\(=\\) slant side \\(\\times \\sin\\theta\\), with \\(\\sin 30^\\circ = \\frac{1}{2}\\), \\(\\sin 45^\\circ = \\frac{1}{\\sqrt{2}}\\), \\(\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}\\).\n" +
        "- Area \\(=\\) base \\(\\times\\) height.",
      formula: {
        label: "Parallelogram",
        latex: "\\angle A = \\angle C, \\ \\angle B = \\angle D, \\ \\angle A + \\angle B = 180^\\circ \\qquad h = (\\text{slant side}) \\times \\sin\\theta \\qquad \\text{Area} = \\text{base} \\times h",
      },
      authoredExample: {
        prompt: "In a parallelogram PQRS, \\(\\angle P = (2x + 30)^\\circ\\) and \\(\\angle Q = (3x - 10)^\\circ\\). Find all four angles.",
        steps: [
          "P and Q are neighbours: \\(2x + 30 + 3x - 10 = 180\\), so \\(5x = 160\\) and \\(x = 32\\).",
          "\\(\\angle P = 94^\\circ\\) and \\(\\angle Q = 86^\\circ\\).",
          "Opposite angles are equal: \\(\\angle R = 94^\\circ\\) and \\(\\angle S = 86^\\circ\\).",
        ],
        answer: "\\(94^\\circ, 86^\\circ, 94^\\circ, 86^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "A parallelogram has sides 12 cm and 8 cm with an angle of \\(30^\\circ\\) between them. Find the height on the 12 cm side and the area.",
        steps: ["Height \\(= 8 \\times \\sin 30^\\circ = 8 \\times \\frac{1}{2} = 4\\) cm.", "Area \\(= 12 \\times 4 = 48\\ \\text{cm}^2\\)."],
        answer: "4 cm and \\(48\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "Two neighbouring angles of a parallelogram are in the ratio 2 : 3. Find them.", answer: "\\(72^\\circ\\) and \\(108^\\circ\\)" },
        { prompt: "One angle of a parallelogram is \\(65^\\circ\\). Find the other three.", answer: "\\(115^\\circ, 65^\\circ, 115^\\circ\\)" },
        {
          prompt: "A parallelogram has sides 9 cm and \\(6\\sqrt{2}\\) cm with an angle of \\(45^\\circ\\) between them. Find the height on the 9 cm side.",
          answer: "\\(6\\sqrt{2} \\times \\frac{1}{\\sqrt{2}} = 6\\) cm",
        },
        { prompt: "The diagonals of a parallelogram meet at O, and one diagonal is 14 cm long. How far is O from each end of that diagonal?", answer: "7 cm" },
      ],
      pyqExampleId: "351e513f-aa6d-440b-9f16-16f531d7688e",
      traps: [
        {
          title: "Making neighbouring angles equal",
          body: "In a parallelogram it is the OPPOSITE angles that are equal. Neighbouring angles add to \\(180^\\circ\\), so a ratio 1 : 3 for neighbours gives \\(45^\\circ\\) and \\(135^\\circ\\).",
        },
        {
          title: "Using cos for the height",
          body: "The height is the side opposite the angle in the right triangle, so it is the slant side times \\(\\sin\\theta\\). The cos gives the piece of the base cut off, not the height.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiqush-special",
      name: "Special quadrilaterals and the mid-point figure",
      intuition:
        "Each special quadrilateral is a parallelogram with one extra rule, and the diagonals tell them apart. Join the mid-points of the sides of any quadrilateral and you always get a parallelogram; its shape depends on the diagonals of the first figure.",
      definition:
        "- **Mid-point theorem**: the line joining the mid-points of two sides of a triangle is parallel to the third side and half of it.\n" +
        "- So the mid-point figure of any quadrilateral is a **parallelogram** with sides parallel to the diagonals.\n" +
        "- Perpendicular diagonals give a **rectangle**; equal diagonals give a **rhombus**; both give a **square**.\n" +
        "- A square is a special rectangle and a special rhombus, and both of those are special parallelograms.",
      table: {
        columns: ["Shape", "What makes it", "Diagonals", "Joining its mid-points gives"],
        rows: [
          { cells: ["Parallelogram", "Both pairs of opposite sides parallel", "Bisect each other", "A parallelogram"] },
          { cells: ["Rectangle", "A parallelogram with a right angle", "Equal, and bisect each other", "A rhombus"] },
          { cells: ["Rhombus", "A parallelogram with all sides equal", "Bisect each other at right angles", "A rectangle"] },
          { cells: ["Square", "A rectangle with all sides equal", "Equal, and bisect each other at right angles", "A square"] },
          { cells: ["Kite", "Two pairs of equal neighbouring sides", "Cross at right angles", "A rectangle"] },
          {
            cells: ["Trapezium", "Exactly one pair of parallel sides", "Cut each other in the ratio of the parallel sides", "A parallelogram"],
            noteAmber: "A trapezium with equal slant sides has equal diagonals, so its mid-point figure is a rhombus.",
          },
        ],
        caption: "The mid-point figure depends only on the diagonals: perpendicular gives right angles, equal gives equal sides.",
      },
      selfCheckExample: {
        prompt: "The mid-points of the sides of a rectangle are joined in order. What figure is formed?",
        steps: ["A rectangle's diagonals are equal, so the new sides are equal.", "They are not perpendicular in general, so the figure is a rhombus."],
        answer: "A rhombus",
      },
      practiceSet: [
        { prompt: "Which quadrilateral has diagonals that are equal and bisect each other at right angles?", answer: "A square" },
        { prompt: "The mid-points of the sides of a square are joined in order. What figure is formed?", answer: "A square" },
        { prompt: "Is every rhombus a parallelogram?", answer: "Yes" },
        { prompt: "In triangle ABC, D and E are the mid-points of AB and AC, and BC = 12 cm. Find DE.", answer: "6 cm" },
      ],
      pyqExampleId: "4b5459a8-d9ae-4c8e-8229-0a21b3d4ce8e",
      traps: [
        {
          title: "Thinking the mid-point figure copies the shape",
          body: "The mid-point figure of a rectangle is a rhombus, not a rectangle. Go by the diagonals: equal diagonals give equal sides, perpendicular diagonals give right angles.",
        },
        {
          title: "Thinking a square is not a rectangle",
          body: "A square has four right angles, so it is a rectangle, and four equal sides, so it is a rhombus. When an option says 'rectangle', a square still fits.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqush-trapezium",
      name: "A line parallel to the sides of a trapezium",
      intuition:
        "Slide a line from the short parallel side to the long one, keeping it parallel. It cuts both slant sides at the same fraction of their length, and its own length grows steadily from the short side to the long side.",
      definition:
        "- A **trapezium** has one pair of parallel sides; call them \\(a\\) (shorter) and \\(b\\) (longer).\n" +
        "- A line parallel to them that is the fraction \\(t\\) of the way from side \\(a\\) cuts **each** slant side in the ratio \\(t : (1 - t)\\), measured from side \\(a\\).\n" +
        "- Its length is \\(a + (b - a)t\\). Half way, the **mid-line** is \\(\\frac{a + b}{2}\\).\n" +
        "- For a question about two equal perimeters, write each part's perimeter in terms of \\(t\\) and set them equal.",
      formula: {
        label: "Line parallel to the bases",
        latex: "\\text{length} = a + (b - a)\\,t \\qquad \\text{mid-line} = \\frac{a + b}{2}",
        symbols: [
          { symbol: "a, b", meaning: "the shorter and longer parallel sides" },
          { symbol: "t", meaning: "the fraction of each slant side from side a to the line" },
        ],
      },
      authoredExample: {
        prompt: "A trapezium has parallel sides 4 cm and 10 cm. A line parallel to them cuts each slant side in the ratio 1 : 2, measured from the 4 cm side. Find its length.",
        steps: [
          "The ratio 1 : 2 means \\(t = \\frac{1}{3}\\).",
          "Length \\(= 4 + (10 - 4) \\times \\frac{1}{3} = 4 + 2 = 6\\) cm.",
        ],
        answer: "6 cm",
      },
      selfCheckExample: {
        prompt: "A trapezium has parallel sides 7 cm and 13 cm. Find the length of the line joining the mid-points of its slant sides.",
        steps: ["The mid-line is \\(\\frac{7 + 13}{2}\\).", "\\(= 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        {
          prompt: "A trapezium has parallel sides 5 cm and 15 cm. A line parallel to them cuts each slant side in the ratio 3 : 2, measured from the 5 cm side. Find its length.",
          answer: "\\(t = \\frac{3}{5}\\), so \\(5 + 10 \\times \\frac{3}{5} = 11\\) cm",
        },
        { prompt: "The mid-line of a trapezium is 9 cm and one parallel side is 6 cm. Find the other parallel side.", answer: "12 cm" },
        {
          prompt: "A trapezium has parallel sides 2 cm and 8 cm and slant sides 3 cm and 5 cm. Its mid-line cuts it into two trapeziums. Find the perimeter of the one with the 2 cm side.",
          answer: "Mid-line 5 cm, slant pieces 1.5 cm and 2.5 cm, so \\(2 + 1.5 + 2.5 + 5 = 11\\) cm",
        },
      ],
      pyqExampleId: "ee8f5047-a049-4749-9918-a7dd0d878acd",
      traps: [
        {
          title: "Reading the ratio from the wrong end",
          body: "A ratio is read from the side you start at. A cut 4 : 1 from the short side is 1 : 4 from the long side, so check which end the question measures from.",
        },
        {
          title: "Taking the mid-line as half the longer side",
          body: "The mid-line is the average of the two parallel sides, \\(\\frac{a + b}{2}\\). For sides 7 cm and 13 cm it is 10 cm, not 6.5 cm.",
        },
      ],
    },
  ],
};
