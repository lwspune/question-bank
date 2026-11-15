import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CI_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles in a Circle",
  title: "Angles in a Circle",
  oneLineDefinition:
    "An arc makes twice the angle at the centre that it makes on the circle, angles on the same arc are equal, opposite angles of a cyclic quadrilateral add to 180 degrees, and a tangent-chord angle equals the angle in the other segment.",
  whyItMatters:
    "6 questions in the Tier II bank, 1 EASY and 5 MODERATE: the hardest page of the chapter. Each is a short chase through two or three of the facts below.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2cian-centre",
      name: "The angle at the centre and on the circle",
      intuition:
        "An arc seen from the centre makes twice the angle it makes from any point on the rest of the circle. All points on the same side see the arc at the same angle, and a diameter is seen at a right angle.",
      definition:
        "- Angle at the centre \\(= 2 \\times\\) angle on the circle, for the same arc.\n" +
        "- Angles on the circle standing on the same arc are equal.\n" +
        "- The angle in a semicircle is \\(90^\\circ\\).\n" +
        "- A chord of length c in a circle of radius r: \\(c = 2r\\sin\\theta\\), where \\(\\theta\\) is the angle it makes on the circle.\n" +
        "- Two radii and a chord make an isosceles triangle: its base angles are equal.",
      formula: {
        label: "Centre and circumference",
        latex: "\\angle AOB = 2\\,\\angle ACB, \\quad c = 2r\\sin\\theta",
      },
      authoredExample: {
        prompt: "A chord AB makes an angle of 40° at a point C on the major arc. Find angle AOB at the centre and angle OAB.",
        steps: ["\\(\\angle AOB = 2 \\times 40^\\circ = 80^\\circ\\).", "OA = OB, so \\(\\angle OAB = \\frac{180^\\circ - 80^\\circ}{2} = 50^\\circ\\)."],
        answer: "\\(80^\\circ\\) and \\(50^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "AB is a diameter and C is a point on the circle with angle CAB = 35°. Find angle CBA.",
        steps: ["The angle in a semicircle is \\(90^\\circ\\), so \\(\\angle ACB = 90^\\circ\\).", "\\(\\angle CBA = 90^\\circ - 35^\\circ = 55^\\circ\\)."],
        answer: "\\(55^\\circ\\)",
      },
      practiceSet: [
        { prompt: "A chord subtends 100° at the centre. What angle does it subtend at a point on the major arc?", answer: "\\(50^\\circ\\)" },
        { prompt: "A chord subtends 90° at the circumference of a circle of radius 6 cm. How long is it?", answer: "12 cm", method: "It is a diameter." },
        { prompt: "A chord of a circle of radius 10 cm subtends 30° at the circumference. Find its length.", answer: "10 cm" },
      ],
      pyqExampleId: "58be87e3-4dd3-4f4f-be89-d5a9c521ecbe",
      traps: [
        {
          title: "Halving instead of doubling",
          body: "The CENTRE angle is the larger: 40° on the circle means 80° at the centre, not 20°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2cian-cyclic",
      name: "Cyclic quadrilaterals and the alternate segment",
      intuition:
        "Four points on a circle make a cyclic quadrilateral, whose opposite angles always add to 180°. Where a tangent meets a chord, the angle between them equals the angle the chord makes in the other part of the circle.",
      definition:
        "- Opposite angles of a cyclic quadrilateral add to \\(180^\\circ\\).\n" +
        "- An exterior angle of a cyclic quadrilateral equals the interior angle opposite to it.\n" +
        "- Alternate segment: the angle between a tangent and a chord equals the angle the chord makes in the other segment.\n" +
        "- A reflex arc of \\(360^\\circ - x\\) at the centre gives an angle of \\(\\frac{360^\\circ - x}{2}\\) on the circle.",
      formula: {
        label: "Cyclic quadrilateral",
        latex: "\\angle A + \\angle C = 180^\\circ, \\quad \\angle B + \\angle D = 180^\\circ",
      },
      authoredExample: {
        prompt: "ABCD is a cyclic quadrilateral with angle A = 75° and angle B = 110°. Find angles C and D.",
        steps: ["\\(\\angle C = 180^\\circ - 75^\\circ = 105^\\circ\\).", "\\(\\angle D = 180^\\circ - 110^\\circ = 70^\\circ\\)."],
        answer: "\\(105^\\circ\\) and \\(70^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "A tangent at A meets chord AB at an angle of 64°. Find the angle AB makes at a point C on the other segment.",
        steps: ["By the alternate segment rule, it equals the tangent-chord angle.", "\\(\\angle ACB = 64^\\circ\\)."],
        answer: "\\(64^\\circ\\)",
      },
      practiceSet: [
        { prompt: "In a cyclic quadrilateral, one angle is 3 times its opposite angle. Find the smaller of the two.", answer: "\\(45^\\circ\\)" },
        { prompt: "Side AB of cyclic quadrilateral ABCD is produced to E, and angle CBE = 82°. Find angle ADC.", answer: "\\(82^\\circ\\)" },
        { prompt: "An arc through point B subtends 140° at the centre. Find angle ABC, where A and C are the arc's ends.", answer: "\\(110^\\circ\\)" },
      ],
      pyqExampleId: "f79a5aef-c357-41cb-ac11-4619ac7832b7",
      traps: [
        {
          title: "Using the arc on the wrong side",
          body: "An angle on the circle is half the arc it STANDS on, which is the arc away from it. If the arc through B is 140°, angle ABC stands on the other arc, 220°, and is 110°.",
        },
      ],
    },
  ],
};
