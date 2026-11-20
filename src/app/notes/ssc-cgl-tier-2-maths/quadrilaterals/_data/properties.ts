import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_QU_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Quadrilaterals",
  title: "Properties of Quadrilaterals",
  oneLineDefinition:
    "Opposite angles of a cyclic quadrilateral add to 180 degrees; a diagonal splits any quadrilateral into two triangles for its area; and a trapezium's slanting side hides a right triangle.",
  whyItMatters:
    "10 questions in the Tier II bank, 8 EASY and 2 MODERATE. Each turns on one property, so knowing which property a shape carries is most of the work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2qupr-cyclic",
      name: "Cyclic quadrilaterals",
      intuition:
        "A quadrilateral whose four corners lie on a circle has opposite angles adding to 180°. Its diagonals also make equal angles on the same arc, which is how many angle chases close.",
      definition:
        "- Opposite angles add to \\(180^\\circ\\): \\(\\angle A + \\angle C = \\angle B + \\angle D = 180^\\circ\\).\n" +
        "- Angles standing on the same side, such as \\(\\angle BAC\\) and \\(\\angle BDC\\), are equal.\n" +
        "- If a side is a diameter, the angle facing it is \\(90^\\circ\\).\n" +
        "- Sides produced to meet outside make triangles whose angles follow from the cyclic rule.",
      formula: {
        label: "Opposite angles",
        latex: "\\angle A + \\angle C = 180^\\circ",
      },
      authoredExample: {
        prompt: "In cyclic quadrilateral PQRS, angle P is twice angle R, and angle Q is 40° more than angle S. Find angles P and Q.",
        steps: ["\\(2R + R = 180^\\circ\\), so \\(R = 60^\\circ\\) and \\(P = 120^\\circ\\).", "\\(S + 40^\\circ + S = 180^\\circ\\), so \\(S = 70^\\circ\\) and \\(Q = 110^\\circ\\)."],
        answer: "\\(120^\\circ\\) and \\(110^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "ABCD is cyclic with BC a diameter, and angle ACB = 25°. Find angle ADC.",
        steps: ["\\(\\angle BAC = 90^\\circ\\), so \\(\\angle ABC = 65^\\circ\\).", "\\(\\angle ADC = 180^\\circ - 65^\\circ = 115^\\circ\\)."],
        answer: "\\(115^\\circ\\)",
      },
      practiceSet: [
        { prompt: "In a cyclic quadrilateral, one angle is 70°. What is the angle opposite to it?", answer: "\\(110^\\circ\\)" },
        { prompt: "Can a rectangle always be drawn inside a circle with all four corners on it?", answer: "Yes: its opposite angles add to 180°" },
        { prompt: "In cyclic ABCD, angle BAC = 40°. Find angle BDC.", answer: "\\(40^\\circ\\)" },
      ],
      pyqExampleId: "e9bade87-a6b4-4f1f-b0b8-e36be5fa8711",
      traps: [
        {
          title: "Pairing neighbouring angles instead of opposite ones",
          body: "Only OPPOSITE angles of a cyclic quadrilateral add to \\(180^\\circ\\). Angles A and B, side by side, have no fixed sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2qupr-diagonals",
      name: "Diagonals, area and the parallelogram",
      intuition:
        "A diagonal cuts any quadrilateral into two triangles sharing that diagonal as a base. So the area is half the diagonal times the sum of the two heights dropped onto it.",
      definition:
        "- Area of a quadrilateral \\(= \\frac{1}{2} \\times\\) diagonal \\(\\times (h_1 + h_2)\\), the heights from the other two corners.\n" +
        "- In a parallelogram, the squares of the diagonals add to the squares of all four sides: \\(d_1^2 + d_2^2 = 2(a^2 + b^2)\\).\n" +
        "- A square's diagonals are equal, meet at right angles and bisect the corner angles.",
      formula: {
        label: "Area from a diagonal",
        latex: "\\text{area} = \\tfrac{1}{2} \\times d \\times (h_1 + h_2), \\quad d_1^2 + d_2^2 = 2(a^2 + b^2)",
      },
      authoredExample: {
        prompt: "A quadrilateral has a diagonal of 30 cm, and the other two corners are 9 cm and 13 cm from it. Find the area.",
        steps: ["Area \\(= \\frac{1}{2} \\times 30 \\times (9 + 13)\\).", "\\(= 330\\ \\text{cm}^2\\)."],
        answer: "\\(330\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A parallelogram has sides 5 cm and 7 cm, and one diagonal is 8 cm. Find the other diagonal.",
        steps: ["\\(d_2^2 = 2(25 + 49) - 64 = 84\\).", "\\(d_2 = 2\\sqrt{21} \\approx 9.17\\) cm."],
        answer: "\\(2\\sqrt{21}\\) cm",
      },
      practiceSet: [
        { prompt: "A parallelogram has sides 6 cm and 8 cm. Find the sum of the squares of its diagonals.", answer: "\\(200\\ \\text{cm}^2\\)" },
        { prompt: "A quadrilateral has a 20 cm diagonal and perpendiculars of 7 cm and 5 cm on it. Find its area.", answer: "\\(120\\ \\text{cm}^2\\)" },
        { prompt: "A square has side 8 cm. Find its diagonal.", answer: "\\(8\\sqrt{2}\\) cm" },
      ],
      pyqExampleId: "1d72ebfe-7a60-4475-aea4-bd3e719dccda",
      traps: [
        {
          title: "Using the full product for the area",
          body: "Each triangle is HALF its base times height. A 30 cm diagonal with heights 9 and 13 gives 330, not 660.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2qupr-trapezium",
      name: "Trapeziums",
      visualizationSlug: "ssc-t2-trapezium",
      intuition:
        "A trapezium has one pair of parallel sides. Dropping perpendiculars from the shorter side to the longer one leaves a rectangle in the middle and two right triangles at the ends.",
      definition:
        "- Area \\(= \\frac{1}{2}(a + b)h\\), with a and b the parallel sides and h the distance between them.\n" +
        "- Isosceles trapezium: each end triangle has base \\(\\frac{b - a}{2}\\), and its slanting side is \\(\\sqrt{h^2 + \\left(\\frac{b - a}{2}\\right)^2}\\).\n" +
        "- The segment joining the midpoints of the diagonals is \\(\\frac{b - a}{2}\\); the midline joining the midpoints of the slanting sides is \\(\\frac{a + b}{2}\\).",
      formula: {
        label: "Trapezium",
        latex: "\\text{area} = \\tfrac{1}{2}(a + b)h",
      },
      authoredExample: {
        prompt: "An isosceles trapezium has parallel sides 10 m and 22 m, and its slanting sides are 10 m each. Find its height and area.",
        steps: [
          "Each end triangle has base \\(\\frac{22 - 10}{2} = 6\\) m, so the height is \\(\\sqrt{100 - 36} = 8\\) m.",
          "Area \\(= \\frac{1}{2}(10 + 22) \\times 8 = 128\\ \\text{m}^2\\).",
        ],
        answer: "8 m and \\(128\\ \\text{m}^2\\)",
      },
      selfCheckExample: {
        prompt: "A trapezium has parallel sides 14 cm and 30 cm. Find the distance between the midpoints of its diagonals.",
        steps: ["It is half the difference of the parallel sides.", "\\(\\frac{30 - 14}{2} = 8\\) cm."],
        answer: "8 cm",
      },
      practiceSet: [
        { prompt: "A trapezium has parallel sides 9 cm and 15 cm, 6 cm apart. Find its area.", answer: "\\(72\\ \\text{cm}^2\\)" },
        { prompt: "Find the midline of a trapezium whose parallel sides are 12 cm and 20 cm.", answer: "16 cm" },
        { prompt: "An isosceles trapezium has parallel sides 8 and 20 and height 8. Find its slanting side.", answer: "10" },
      ],
      pyqExampleId: "45a2aa79-df49-48c6-a46b-7af813460277",
      traps: [
        {
          title: "Taking the whole difference as one triangle's base",
          body: "In an isosceles trapezium the extra length \\(b - a\\) is split between TWO end triangles, so each base is \\(\\frac{b - a}{2}\\).",
        },
      ],
    },
  ],
};
