import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CI_CHORDS_NOTE: SubtopicNote = {
  subtopicName: "Chords, Angles and Cyclic Quadrilaterals",
  title: "Chords, Angles and Cyclic Quadrilaterals",
  oneLineDefinition:
    "The perpendicular from the centre cuts a chord in half, the angle at the centre is twice the angle at the circle, and opposite angles of a cyclic quadrilateral add to 180 degrees.",
  whyItMatters:
    "Ten questions in the bank, including both circle questions from the 2022 paper and the chapter's only two HARD ones. Chord lengths are one right triangle again; the angle questions need the right theorem picked from a figure, which is why they run harder.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicich-chord",
      name: "The perpendicular from the centre bisects a chord",
      intuition:
        "Drop a perpendicular from the centre to a chord. It lands on the middle of the chord, and the radius to one end of the chord makes a right triangle with half the chord and the distance from the centre.",
      definition:
        "- The perpendicular from the centre to a chord **cuts it in half**.\n" +
        "- With radius \\(r\\), distance \\(d\\) from the centre and half chord \\(h\\): \\(r^2 = d^2 + h^2\\).\n" +
        "- The longest chord is the **diameter** (\\(d = 0\\)). A longer chord is nearer the centre, and equal chords are equally far from it.\n" +
        "- Two circles with the same centre are **concentric**. A chord of the larger circle that touches the smaller one is a tangent to the smaller circle, so the small radius is the distance \\(d\\) and the point of contact is the middle of the chord.",
      formula: {
        label: "Chord length",
        latex: "\\text{chord} = 2\\sqrt{r^2 - d^2} \\qquad r^2 = d^2 + \\left(\\tfrac{\\text{chord}}{2}\\right)^2",
        symbols: [
          { symbol: "r", meaning: "radius of the circle" },
          { symbol: "d", meaning: "distance of the chord from the centre" },
        ],
      },
      authoredExample: {
        prompt: "A circle has radius 10 cm. Find the length of a chord that is 6 cm from the centre.",
        steps: [
          "Half chord \\(= \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8\\) cm.",
          "Chord \\(= 2 \\times 8 = 16\\) cm.",
        ],
        answer: "16 cm",
      },
      selfCheckExample: {
        prompt: "A chord of length 24 cm is 5 cm from the centre of a circle. Find the radius.",
        steps: ["Half chord \\(= 12\\) cm.", "\\(r = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13\\) cm."],
        answer: "13 cm",
      },
      practiceSet: [
        {
          prompt: "Two concentric circles have radii 5 cm and 3 cm. Find the length of the chord of the larger circle that touches the smaller one.",
          answer: "\\(2\\sqrt{25 - 9} = 2 \\times 4 = 8\\) cm",
        },
        { prompt: "A chord 48 cm long is drawn in a circle of radius 25 cm. How far is it from the centre?", answer: "\\(\\sqrt{625 - 576} = 7\\) cm" },
        {
          prompt: "A chord of length 16 cm is 6 cm from the centre of a circle. How long is a chord 8 cm from the centre of the same circle?",
          answer: "\\(r^2 = 64 + 36 = 100\\), half chord \\(= \\sqrt{100 - 64} = 6\\), so 12 cm",
        },
        { prompt: "What is the length of the longest chord of a circle of radius 9 cm?", answer: "18 cm, the diameter" },
      ],
      pyqExampleId: "77f98c1e-ef0b-4bf8-9093-31b150abe279",
      traps: [
        {
          title: "Stopping at the half chord",
          body: "Pythagoras gives half the chord. With radius 10 cm and distance 6 cm the half chord is 8 cm, and the chord is 16 cm.",
        },
        {
          title: "Putting the whole chord in the right triangle",
          body: "The right triangle has the radius, the distance from the centre and HALF the chord. Halve the chord before you square it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicich-angles",
      name: "Angles made by an arc",
      intuition:
        "An arc can be seen from the centre or from a point on the circle. From the centre it looks twice as wide, and from every point on the same side of the circle it looks equally wide.",
      definition:
        "- The angle an arc makes **at the centre is twice** the angle it makes at any point on the rest of the circle.\n" +
        "- Angles in the **same segment** are equal: points on the same side of a chord see it at the same angle.\n" +
        "- The angle in a **semicircle** is \\(90^\\circ\\): a diameter's ends and any other point on the circle make a right angle.\n" +
        "- So a circle through all four corners of a rectangle has its diagonal as a diameter, and the circle through the corners of a right triangle has radius half the hypotenuse.",
      formula: {
        label: "Angles in a circle",
        latex: "\\angle AOB = 2\\,\\angle ACB \\qquad \\text{angle in a semicircle} = 90^\\circ",
      },
      authoredExample: {
        prompt: "A, B and C lie on a circle with centre O, with C on the major arc. If \\(\\angle AOB = 110^\\circ\\), find \\(\\angle ACB\\).",
        steps: ["The angle at the circle is half the angle at the centre on the same arc.", "\\(\\angle ACB = \\frac{110^\\circ}{2} = 55^\\circ\\)."],
        answer: "\\(55^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "A rectangle with sides 5 cm and 12 cm has all four corners on a circle. Find the radius of the circle.",
        steps: ["The diagonal is a diameter: \\(\\sqrt{25 + 144} = 13\\) cm.", "Radius \\(= 6.5\\) cm."],
        answer: "6.5 cm",
      },
      practiceSet: [
        { prompt: "AB is a diameter of a circle and C is another point on it. If \\(\\angle CAB = 35^\\circ\\), find \\(\\angle CBA\\).", answer: "\\(\\angle ACB = 90^\\circ\\), so \\(\\angle CBA = 55^\\circ\\)" },
        {
          prompt: "A, B, C and D lie on a circle, with C and D on the same side of chord AB. If \\(\\angle ACB = 42^\\circ\\), find \\(\\angle ADB\\).",
          answer: "\\(42^\\circ\\)",
        },
        { prompt: "A, B and C lie on a circle with centre O, with C on the major arc. If \\(\\angle ACB = 64^\\circ\\), find \\(\\angle AOB\\).", answer: "\\(128^\\circ\\)" },
        { prompt: "A right triangle has hypotenuse 18 cm. Find the radius of the circle through its three corners.", answer: "9 cm" },
      ],
      pyqExampleId: "606ea579-d373-4211-973d-7ff9bfd59a7d",
      traps: [
        {
          title: "Halving when you should double",
          body: "The angle at the centre is the larger one. If the angle at the circle is \\(64^\\circ\\), the angle at the centre is \\(128^\\circ\\), not \\(32^\\circ\\).",
        },
        {
          title: "Using an angle from the other side of the chord",
          body: "Only points on the same side of a chord see it at equal angles. Two points on opposite sides make angles that add to \\(180^\\circ\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicich-cyclic",
      name: "Opposite angles of a cyclic quadrilateral",
      intuition:
        "When all four corners of a quadrilateral lie on a circle, each pair of opposite angles stands on arcs that together make the whole circle, so the pair adds to 180 degrees.",
      definition:
        "- A quadrilateral with all four corners on a circle is **cyclic**.\n" +
        "- **Opposite** angles add to \\(180^\\circ\\): \\(\\angle A + \\angle C = 180^\\circ\\) and \\(\\angle B + \\angle D = 180^\\circ\\).\n" +
        "- If one side is extended, the **exterior angle equals the interior opposite angle**.\n" +
        "- A parallelogram can be cyclic only if it is a rectangle, because its opposite angles are equal and must add to \\(180^\\circ\\).",
      formula: {
        label: "Cyclic quadrilateral",
        latex: "\\angle A + \\angle C = 180^\\circ \\qquad \\angle B + \\angle D = 180^\\circ",
      },
      authoredExample: {
        prompt: "ABCD is a cyclic quadrilateral with \\(\\angle A = (3x + 4)^\\circ\\) and \\(\\angle C = (2x + 6)^\\circ\\). Find \\(\\angle A\\).",
        steps: [
          "Opposite angles: \\(3x + 4 + 2x + 6 = 180\\).",
          "\\(5x + 10 = 180\\), so \\(x = 34\\).",
          "\\(\\angle A = 3(34) + 4 = 106^\\circ\\). Check: \\(\\angle C = 74^\\circ\\) and \\(106 + 74 = 180\\).",
        ],
        answer: "\\(106^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In a cyclic quadrilateral PQRS, \\(\\angle P = 75^\\circ\\) and \\(\\angle Q = 98^\\circ\\). Find \\(\\angle R\\) and \\(\\angle S\\).",
        steps: ["\\(\\angle R = 180^\\circ - 75^\\circ = 105^\\circ\\).", "\\(\\angle S = 180^\\circ - 98^\\circ = 82^\\circ\\)."],
        answer: "\\(\\angle R = 105^\\circ\\), \\(\\angle S = 82^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Side BC of a cyclic quadrilateral ABCD is extended to E. If \\(\\angle DAB = 85^\\circ\\), find \\(\\angle DCE\\).", answer: "\\(85^\\circ\\), the interior opposite angle" },
        {
          prompt: "A quadrilateral has angles \\(70^\\circ\\), \\(95^\\circ\\), \\(110^\\circ\\) and \\(85^\\circ\\), taken in order. Can it be cyclic?",
          answer: "Yes: \\(70 + 110 = 180\\) and \\(95 + 85 = 180\\)",
        },
        { prompt: "ABCD is a cyclic quadrilateral with \\(\\angle B = 3\\angle D\\). Find \\(\\angle B\\).", answer: "\\(4\\angle D = 180^\\circ\\), so \\(\\angle D = 45^\\circ\\) and \\(\\angle B = 135^\\circ\\)" },
        { prompt: "A parallelogram has all four corners on a circle. What is each of its angles?", answer: "\\(90^\\circ\\)" },
      ],
      pyqExampleId: "f2b6680b-d4bd-45d6-a5e7-a6a1943241aa",
      traps: [
        {
          title: "Adding neighbouring angles to 180",
          body: "Only opposite angles of a cyclic quadrilateral add to \\(180^\\circ\\). Angles A and B are neighbours, and their sum can be anything.",
        },
        {
          title: "Matching the exterior angle with the angle next to it",
          body: "The exterior angle at C equals the interior angle at A, the opposite corner. The interior angle at C, right next to it, is the one it adds to \\(180^\\circ\\) with.",
        },
      ],
    },
  ],
};
