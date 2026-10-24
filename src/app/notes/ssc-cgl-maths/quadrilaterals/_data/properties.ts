import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_QU_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Quadrilaterals",
  title: "Properties of Quadrilaterals",
  oneLineDefinition:
    "The four angles of any quadrilateral add to 360°; each special quadrilateral (trapezium, parallelogram, rhombus, kite) is known by its sides, and its diagonals settle most questions.",
  whyItMatters:
    "Eleven questions in the bank, six EASY and five MODERATE: six from the 2024 shifts and five from the 2025 shifts. The EASY ones test a definition or the 360° sum. The MODERATE ones hide a pair of congruent or similar triangles inside the figure; once you see which sides are equal, the answer is one line.",
  related: [
    { label: "Circles: angles in a circle", href: "/notes/ssc-cgl-maths/circles/ssc-ci-angles" },
    { label: "Mensuration 2D: areas of quadrilaterals", href: "/notes/ssc-cgl-maths/mensuration-2d/ssc-m2-quads" },
  ],
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscqupr-angles",
      name: "Angle sum and the diagonals of any quadrilateral",
      intuition:
        "One diagonal cuts any quadrilateral into two triangles. Their angles together make up the four corners, so the corners add to 2 × 180° = 360°. The diagonals also cut the figure into triangles, and equal parts in those triangles tell you where the diagonals meet.",
      definition:
        "- The four interior angles of a quadrilateral add to \\(360^\\circ\\).\n" +
        "- Angles given in a ratio: if the ratio covers all four angles, one part \\(= \\frac{360^\\circ}{\\text{total parts}}\\). If one angle is given in degrees, take it away from \\(360^\\circ\\) first and share the rest among the parts.\n" +
        "- A **cyclic quadrilateral** has all four corners on a circle. Its opposite angles add to \\(180^\\circ\\). This is true only of a cyclic one.\n" +
        "- Two triangles are **congruent** (equal in every part) by SSS, SAS, ASA or AAS. If the diagonals of ABCD meet at O and the perpendiculars from B and D to AC are equal, the two right triangles at O are congruent (AAS: right angle, vertically opposite angles, equal perpendiculars), so \\(OB = OD\\).",
      formula: {
        label: "Quadrilateral angles",
        latex: "\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ \\qquad \\text{cyclic: } \\angle A + \\angle C = \\angle B + \\angle D = 180^\\circ",
      },
      authoredExample: {
        prompt: "The angles of a quadrilateral are \\(x\\), \\(x + 20\\), \\(2x\\) and \\(2x + 40\\) degrees. Find the largest angle.",
        steps: [
          "The four angles add to \\(360^\\circ\\): \\(6x + 60 = 360\\).",
          "\\(6x = 300\\), so \\(x = 50\\).",
          "The angles are \\(50^\\circ\\), \\(70^\\circ\\), \\(100^\\circ\\), \\(140^\\circ\\). The largest is \\(140^\\circ\\).",
        ],
        answer: "\\(140^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In a cyclic quadrilateral PQRS, angle P is \\(30^\\circ\\) more than twice angle R. Find angle P.",
        steps: [
          "P and R are opposite, so \\(P + R = 180^\\circ\\).",
          "\\((2R + 30) + R = 180\\), so \\(3R = 150\\) and \\(R = 50^\\circ\\).",
          "\\(P = 2(50) + 30 = 130^\\circ\\).",
        ],
        answer: "\\(130^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Three angles of a quadrilateral are \\(75^\\circ\\), \\(95^\\circ\\) and \\(110^\\circ\\). What is the fourth?", answer: "\\(80^\\circ\\)" },
        {
          prompt: "The angles of a quadrilateral are in the ratio \\(2 : 3 : 4 : 6\\). What is the largest angle?",
          answer: "\\(144^\\circ\\)",
          method: "One part \\(= \\frac{360}{15} = 24^\\circ\\).",
        },
        { prompt: "One angle of a cyclic quadrilateral is \\(64^\\circ\\). What is the angle opposite to it?", answer: "\\(116^\\circ\\)" },
        {
          prompt:
            "The diagonals AC and BD of quadrilateral ABCD meet at O. The perpendiculars from B and from D to AC are equal. If \\(OB = 9\\) cm, what is BD?",
          answer: "18 cm",
          method: "The right triangles at O are congruent (AAS), so \\(OD = OB\\).",
        },
      ],
      pyqExampleId: "6b7256a9-aed8-423c-bfec-5a250cb8872e",
      traps: [
        {
          title: "Sharing 360° when one angle is already known",
          body:
            "If three angles are in a ratio and the fourth is given in degrees, take the fourth away from \\(360^\\circ\\) before sharing. Dividing \\(360^\\circ\\) by the three parts gives a wrong answer that is often printed.",
        },
        {
          title: "Using the cyclic rule on any quadrilateral",
          body:
            "Opposite angles add to \\(180^\\circ\\) only when all four corners lie on one circle. A general quadrilateral, or a parallelogram that is not a rectangle, does not have this property.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscqupr-trapezium",
      name: "Trapezium: area and the triangles made by its diagonals",
      intuition:
        "A trapezium has one pair of parallel sides. Its area is the average of the two parallel sides times the gap between them. Its diagonals cut out two triangles, one on each parallel side, and because the sides are parallel those two triangles have the same angles: one is a scaled copy of the other.",
      definition:
        "- **Area** \\(= \\frac{1}{2} \\times (a + b) \\times h\\), where a and b are the parallel sides and h is the perpendicular distance between them.\n" +
        "- In a **right trapezium**, one non-parallel side is perpendicular to the parallel sides, so that side is the height.\n" +
        "- If \\(AB \\parallel CD\\) and the diagonals meet at E, triangles ABE and CDE are **similar** with scale \\(AB : CD\\).\n" +
        "- So the diagonals cut each other in the same ratio: \\(AE : EC = BE : ED = AB : CD\\).\n" +
        "- Areas of similar triangles go as the **square** of the scale: \\(\\text{area } ABE : \\text{area } CDE = AB^2 : CD^2\\).",
      formula: {
        label: "Trapezium",
        latex:
          "\\text{area} = \\frac{1}{2}(a + b)h \\qquad AE : EC = AB : CD \\qquad \\frac{\\text{area } ABE}{\\text{area } CDE} = \\frac{AB^2}{CD^2}",
        symbols: [
          { symbol: "a, b", meaning: "the two parallel sides" },
          { symbol: "h", meaning: "the perpendicular distance between them" },
        ],
      },
      authoredExample: {
        prompt: "A trapezium has parallel sides 12 cm and 18 cm, and they are 8 cm apart. Find its area.",
        steps: [
          "Average of the parallel sides \\(= \\frac{12 + 18}{2} = 15\\) cm.",
          "Area \\(= 15 \\times 8 = 120\\) cm².",
        ],
        answer: "120 cm²",
      },
      selfCheckExample: {
        prompt:
          "In trapezium PQRS, PQ is parallel to SR, \\(PQ = 6\\) cm and \\(SR = 9\\) cm. The diagonals meet at O. Find PO : OR and the ratio of the area of triangle POQ to the area of triangle ROS.",
        steps: [
          "Triangles POQ and ROS are similar with scale \\(PQ : SR = 6 : 9 = 2 : 3\\).",
          "So \\(PO : OR = 2 : 3\\).",
          "Areas go as the square: \\(2^2 : 3^2 = 4 : 9\\).",
        ],
        answer: "\\(PO : OR = 2 : 3\\); areas \\(4 : 9\\)",
      },
      practiceSet: [
        { prompt: "A trapezium has parallel sides 7 m and 13 m and height 6 m. What is its area?", answer: "60 m²" },
        {
          prompt: "A trapezium has area 90 cm² and parallel sides 8 cm and 12 cm. What is its height?",
          answer: "9 cm",
          method: "\\(90 = 10 \\times h\\).",
        },
        { prompt: "In trapezium ABCD, AB is parallel to DC and \\(AB = 2 \\times DC\\). The diagonals meet at O. What is AO : OC?", answer: "\\(2 : 1\\)" },
        {
          prompt:
            "The parallel sides of a trapezium are in the ratio \\(3 : 5\\). What is the ratio of the areas of the two triangles that the diagonals cut off on those sides?",
          answer: "\\(9 : 25\\)",
        },
      ],
      pyqExampleId: "482c9647-00c2-47f4-9e05-3df6b7383cd4",
      traps: [
        {
          title: "Giving the side ratio for an area ratio",
          body:
            "The triangles on the parallel sides have their sides in the ratio \\(AB : CD\\), but their areas are in the ratio \\(AB^2 : CD^2\\). The plain side ratio is printed as a wrong option.",
        },
        {
          title: "Using a slanted side as the height",
          body:
            "The height of a trapezium is the perpendicular distance between the parallel sides. A slanted side is longer than that. Only in a right trapezium is a side the height.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscqupr-parallelogram",
      name: "Parallelogram: opposite sides, angles and diagonals",
      intuition:
        "A parallelogram is a quadrilateral with both pairs of opposite sides parallel. Slide one side along the other and it lands on its opposite side, so opposite sides are equal and opposite angles are equal. Each diagonal splits it into two congruent triangles.",
      definition:
        "- Both pairs of opposite sides are **parallel and equal**.\n" +
        "- Opposite angles are equal; neighbouring angles add to \\(180^\\circ\\) (they are co-interior angles between parallel sides).\n" +
        "- The diagonals **bisect each other**: they cut each other in half. They need not be equal, and they need not be perpendicular.\n" +
        "- Special parallelograms: a **rectangle** has all angles \\(90^\\circ\\) and equal diagonals; a **rhombus** has all sides equal and perpendicular diagonals; a **square** has both.\n" +
        "- **Midpoint theorem:** in a triangle, a line through the midpoint of one side parallel to a second side meets the third side at its midpoint, and the piece between is half the second side. It settles questions where a side of a parallelogram is extended by its own length.",
      formula: {
        label: "Parallelogram ABCD",
        latex: "AB = CD,\\ BC = DA \\qquad \\angle A = \\angle C,\\ \\angle A + \\angle B = 180^\\circ \\qquad AO = OC,\\ BO = OD",
        symbols: [{ symbol: "O", meaning: "the point where the diagonals meet" }],
      },
      authoredExample: {
        prompt: "In parallelogram ABCD, angle A is 3 times angle B. Find all four angles.",
        steps: [
          "Neighbouring angles add to \\(180^\\circ\\): \\(3B + B = 180\\), so \\(B = 45^\\circ\\).",
          "\\(A = 135^\\circ\\).",
          "Opposite angles are equal: \\(C = 135^\\circ\\) and \\(D = 45^\\circ\\).",
        ],
        answer: "\\(A = C = 135^\\circ\\), \\(B = D = 45^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "The diagonals of parallelogram PQRS meet at O. If \\(PO = 3x - 2\\) cm and \\(OR = x + 6\\) cm, find the length of diagonal PR.",
        steps: [
          "The diagonals bisect each other, so \\(PO = OR\\): \\(3x - 2 = x + 6\\), giving \\(x = 4\\).",
          "\\(PO = 10\\) cm, so \\(PR = 2 \\times 10 = 20\\) cm.",
        ],
        answer: "20 cm",
      },
      practiceSet: [
        { prompt: "One angle of a parallelogram is \\(70^\\circ\\). What are the other three angles?", answer: "\\(110^\\circ\\), \\(70^\\circ\\), \\(110^\\circ\\)" },
        { prompt: "A parallelogram has perimeter 48 cm and one side 15 cm. What is the length of a side next to it?", answer: "9 cm" },
        { prompt: "Which parallelogram has all four angles equal to \\(90^\\circ\\) but sides that need not all be equal?", answer: "A rectangle" },
        {
          prompt:
            "In triangle PQR, M is the midpoint of PQ, and the line through M parallel to QR meets PR at N. If \\(QR = 14\\) cm, what is MN?",
          answer: "7 cm",
        },
      ],
      pyqExampleId: "9f59b614-6929-459f-8c37-71a2a83f67ea",
      traps: [
        {
          title: "Calling a trapezium a parallelogram",
          body:
            "A quadrilateral with only one pair of parallel sides is a trapezium. A parallelogram needs both pairs of opposite sides parallel, and then they are equal too.",
        },
        {
          title: "Giving a parallelogram perpendicular or equal diagonals",
          body:
            "The diagonals of a parallelogram only bisect each other. They are perpendicular only in a rhombus or a square, and equal only in a rectangle or a square.",
        },
        {
          title: "Taking a diagonal as an angle bisector",
          body:
            "A diagonal of a general parallelogram does not halve the corner angles. It does so only when all four sides are equal, in a rhombus or a square.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscqupr-rhombus",
      name: "Rhombus and kite: equal sides give congruent halves",
      intuition:
        "Equal sides make mirror images. In a kite, two pairs of neighbouring sides are equal, so the diagonal between the two places where the equal sides meet is a line of symmetry: the triangles on either side of it are congruent. A rhombus has all four sides equal, so both diagonals are lines of symmetry.",
      definition:
        "- **Rhombus:** all four sides equal. Its diagonals bisect each other at right angles, so each diagonal is the perpendicular bisector of the other.\n" +
        "- So a point inside a rhombus that is equally far from two opposite corners lies on the other diagonal (a point equally far from P and R lies on the perpendicular bisector of PR).\n" +
        "- Side of a rhombus from its diagonals \\(d_1, d_2\\): the half-diagonals and a side form a right triangle, so \\(\\text{side}^2 = \\left(\\frac{d_1}{2}\\right)^2 + \\left(\\frac{d_2}{2}\\right)^2\\).\n" +
        "- **Kite:** two pairs of equal neighbouring sides, say \\(AB = AD\\) and \\(CB = CD\\). The diagonal AC is a line of symmetry: triangles ABC and ADC are congruent (SSS), AC bisects the angles at A and C, the angles at B and D are equal, and AC is the perpendicular bisector of BD.\n" +
        "- First decide which sides are equal. In a triangle, the equal sides face equal angles, so unequal base angles tell you those two sides are not the equal pair.",
      formula: {
        label: "Rhombus side from its diagonals",
        latex: "\\text{side}^2 = \\left(\\frac{d_1}{2}\\right)^2 + \\left(\\frac{d_2}{2}\\right)^2",
        symbols: [{ symbol: "\\(d_1, d_2\\)", meaning: "the two diagonals of the rhombus" }],
      },
      authoredExample: {
        prompt: "A rhombus has diagonals 16 cm and 12 cm. Find the length of its side.",
        steps: [
          "The diagonals bisect each other at right angles, so the half-diagonals are 8 cm and 6 cm.",
          "\\(\\text{side}^2 = 8^2 + 6^2 = 100\\), so the side is 10 cm.",
        ],
        answer: "10 cm",
      },
      selfCheckExample: {
        prompt:
          "In quadrilateral ABCD, \\(AB = AD\\) and \\(CB = CD\\). If angle BAC is \\(40^\\circ\\) and angle BCA is \\(30^\\circ\\), find angle ADC.",
        steps: [
          "This is a kite with line of symmetry AC, so triangles ABC and ADC are congruent.",
          "In triangle ABC, angle ABC \\(= 180 - 40 - 30 = 110^\\circ\\).",
          "Angle ADC matches angle ABC: \\(110^\\circ\\).",
        ],
        answer: "\\(110^\\circ\\)",
      },
      practiceSet: [
        { prompt: "The diagonals of a rhombus are 10 cm and 24 cm. What is the length of its side?", answer: "13 cm" },
        {
          prompt: "A rhombus has side 5 cm and one diagonal 8 cm. What is the other diagonal?",
          answer: "6 cm",
          method: "Half of it is \\(\\sqrt{25 - 16} = 3\\).",
        },
        {
          prompt: "In rhombus ABCD, a point O inside it is equally far from B and D. On which line must O lie?",
          answer: "On the diagonal AC",
        },
        {
          prompt: "In kite PQRS, \\(PQ = PS\\) and \\(RQ = RS\\). If angle QPR is \\(35^\\circ\\), what is angle QPS?",
          answer: "\\(70^\\circ\\)",
          method: "The diagonal PR bisects angle P.",
        },
      ],
      pyqExampleId: "be9e9767-f11a-4d5e-9a88-66070f4ad31f",
      traps: [
        {
          title: "Taking the kite's symmetry line from the wrong diagonal",
          body:
            "Only the diagonal joining the two corners where equal sides meet is a line of symmetry. Find the equal sides first: if a triangle on one diagonal has unequal base angles, its two sides at that diagonal are not equal.",
        },
        {
          title: "Giving a rhombus equal diagonals",
          body:
            "The diagonals of a rhombus are perpendicular and bisect each other, but they are equal only when the rhombus is a square.",
        },
        {
          title: "Putting whole diagonals into Pythagoras",
          body:
            "The right triangle inside a rhombus has legs equal to half of each diagonal. With diagonals 6 cm and 8 cm the side is \\(\\sqrt{9 + 16} = 5\\) cm, not \\(\\sqrt{36 + 64} = 10\\) cm.",
        },
      ],
    },
  ],
};
