import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CI_RADIUS_NOTE: SubtopicNote = {
  subtopicName: "Tangent and Radius",
  title: "Tangent and Radius",
  oneLineDefinition:
    "A tangent touches a circle at one point, and the radius drawn to that point meets the tangent at a right angle.",
  whyItMatters:
    "Fourteen questions in the bank, thirteen of them EASY: what a tangent is, the gap between parallel tangents, and the length of a tangent from a right triangle. Almost every one is a single use of Pythagoras, so the mark is lost only by putting the right angle at the wrong corner.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spicira-tangent",
      name: "What a tangent is and how many there are",
      intuition:
        "A line can miss a circle, cut it at two points, or just touch it at one point. The line that just touches is the **tangent**, and the point where it touches is the **point of contact**.",
      definition:
        "Three facts answer most one-mark questions:\n" +
        "- A tangent meets the circle at **exactly one point**. A line meeting it at two points is a **secant**.\n" +
        "- The number of tangents depends on where the point is: none from inside, one from a point on the circle, two from outside.\n" +
        "- The tangents at the two ends of a diameter are **parallel**, and the gap between them is the **diameter**, \\(2r\\).",
      table: {
        columns: ["Situation", "Fact"],
        rows: [
          { cells: ["A line touching the circle at one point", "A tangent"] },
          { cells: ["A line cutting the circle at two points", "A secant"] },
          { cells: ["Tangents from a point inside the circle", "None"] },
          { cells: ["Tangents from a point on the circle", "Exactly one"] },
          { cells: ["Tangents from a point outside the circle", "Exactly two"] },
          { cells: ["Tangents at the two ends of a diameter", "Parallel to each other"] },
          {
            cells: ["Distance between two parallel tangents", "The diameter, 2r"],
            noteAmber: "It is the diameter, not the radius: a circle of radius 4 cm has parallel tangents 8 cm apart.",
          },
        ],
        caption: "The tangent at a point is the one line through it that is perpendicular to the radius there.",
      },
      selfCheckExample: {
        prompt: "Two parallel tangents to a circle are 14 cm apart. Find the radius of the circle.",
        steps: ["The gap between parallel tangents is the diameter, so the diameter is 14 cm.", "Radius \\(= \\frac{14}{2} = 7\\) cm."],
        answer: "7 cm",
      },
      practiceSet: [
        { prompt: "How many tangents can be drawn to a circle from a point inside it?", answer: "None" },
        { prompt: "How many points does a secant share with a circle?", answer: "Two" },
        { prompt: "A circle has radius 5.5 cm. How far apart are two of its parallel tangents?", answer: "11 cm" },
        { prompt: "How many tangents can be drawn to a circle from a point outside it?", answer: "Two" },
      ],
      pyqExampleId: "cb6f62b0-9e9d-4b2b-bf98-c068e1c7871c",
      traps: [
        {
          title: "Giving the radius as the gap between parallel tangents",
          body: "Parallel tangents touch the circle at opposite ends of a diameter, so the gap is \\(2r\\). For a radius of 3 cm the answer is 6 cm, not 3 cm.",
        },
        {
          title: "Two tangents from a point on the circle",
          body: "Only a point outside the circle has two tangents. A point on the circle has exactly one, and a point inside has none.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicira-length",
      name: "Length of a tangent from a right triangle",
      intuition:
        "Join the centre to the point of contact and to the outside point. The radius meets the tangent at 90 degrees, so the three lines make a right triangle, and Pythagoras gives whichever side is missing.",
      definition:
        "- The radius to the point of contact is **perpendicular** to the tangent.\n" +
        "- The right triangle has the radius \\(r\\), the tangent length \\(t\\), and the distance \\(d\\) from the centre to the outside point.\n" +
        "- \\(d\\) is the **hypotenuse**, the longest side, because it is opposite the right angle.\n" +
        "- So \\(t^2 = d^2 - r^2\\), and \\(d^2 = r^2 + t^2\\).",
      formula: {
        label: "Tangent length",
        latex: "t = \\sqrt{d^2 - r^2} \\qquad d = \\sqrt{r^2 + t^2}",
        symbols: [
          { symbol: "t", meaning: "length of the tangent from the outside point" },
          { symbol: "d", meaning: "distance from the outside point to the centre" },
          { symbol: "r", meaning: "radius of the circle" },
        ],
      },
      authoredExample: {
        prompt: "A point P is 13 cm from the centre of a circle of radius 5 cm. Find the length of the tangent from P.",
        steps: [
          "The radius, the tangent and the line to the centre make a right triangle with hypotenuse 13 cm.",
          "\\(t = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144}\\).",
          "\\(t = 12\\) cm.",
        ],
        answer: "12 cm",
      },
      selfCheckExample: {
        prompt: "The tangent from a point A to a circle of radius 6 cm is 8 cm long. How far is A from the centre?",
        steps: ["\\(d = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100}\\).", "\\(d = 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "A point is 26 cm from the centre of a circle of radius 10 cm. How long is the tangent from it?", answer: "\\(\\sqrt{676 - 100} = \\sqrt{576} = 24\\) cm" },
        { prompt: "A circle has radius 9 cm and the tangent from a point P is 40 cm long. How far is P from the centre?", answer: "\\(\\sqrt{81 + 1600} = \\sqrt{1681} = 41\\) cm" },
        { prompt: "A point is 2 cm from the centre of a circle of radius 1 cm. How long is the tangent from it?", answer: "\\(\\sqrt{4 - 1} = \\sqrt{3}\\) cm" },
        {
          prompt: "PQ is a tangent at Q to a circle with centre O. If OQ = 5 cm and PQ = 12 cm, find the perimeter of triangle OQP.",
          answer: "\\(OP = 13\\) cm, so the perimeter is \\(5 + 12 + 13 = 30\\) cm",
        },
      ],
      pyqExampleId: "da30de94-a297-4e36-bfbd-ae1ad9885d01",
      traps: [
        {
          title: "Adding the squares when one is the hypotenuse",
          body: "The distance to the centre is the longest side. With distance 13 cm and radius 5 cm the tangent is \\(\\sqrt{169 - 25} = 12\\) cm; adding gives \\(\\sqrt{194}\\), which is wrong.",
        },
        {
          title: "Subtracting the lengths instead of their squares",
          body: "With distance 13 cm and radius 5 cm, \\(13 - 5 = 8\\) cm is not the tangent. Square, subtract, then take the square root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicira-angles",
      name: "Angles in the radius and tangent triangle",
      intuition:
        "The right angle sits at the point of contact, so the other two angles of the triangle share the remaining 90 degrees. When one angle is 30 or 60 degrees, a simple ratio gives every side.",
      definition:
        "- The angle between the radius and the tangent is \\(90^\\circ\\), so the angle at the centre and the angle at the outside point add to \\(90^\\circ\\).\n" +
        "- In a right triangle: \\(\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}\\).\n" +
        "- \\(\\sin 30^\\circ = \\cos 60^\\circ = \\frac{1}{2}\\) and \\(\\tan 45^\\circ = 1\\). So in a 30, 60, 90 triangle the side opposite \\(30^\\circ\\) is half the hypotenuse.\n" +
        "- Angles on a straight line add to \\(180^\\circ\\): if QOR is a diameter, \\(\\angle POQ = 180^\\circ - \\angle POR\\).",
      formula: {
        label: "Angles at the point of contact",
        latex: "\\angle OQP = 90^\\circ \\qquad \\angle QOP + \\angle OPQ = 90^\\circ \\qquad \\sin 30^\\circ = \\cos 60^\\circ = \\tfrac{1}{2}",
      },
      authoredExample: {
        prompt: "PA is a tangent at A to a circle with centre O and radius 4 cm. If \\(\\angle AOP = 60^\\circ\\), find \\(\\angle APO\\) and OP.",
        steps: [
          "\\(\\angle OAP = 90^\\circ\\), so \\(\\angle APO = 90^\\circ - 60^\\circ = 30^\\circ\\).",
          "OA is next to the \\(60^\\circ\\) angle and OP is the hypotenuse: \\(\\cos 60^\\circ = \\frac{OA}{OP}\\).",
          "\\(\\frac{1}{2} = \\frac{4}{OP}\\), so \\(OP = 8\\) cm.",
        ],
        answer: "\\(\\angle APO = 30^\\circ\\), OP = 8 cm",
      },
      selfCheckExample: {
        prompt: "PQ is a tangent at Q to a circle with centre O, and \\(\\angle OPQ = 25^\\circ\\). Find \\(\\angle POQ\\).",
        steps: ["\\(\\angle OQP = 90^\\circ\\).", "\\(\\angle POQ = 180^\\circ - 90^\\circ - 25^\\circ = 65^\\circ\\)."],
        answer: "\\(65^\\circ\\)",
      },
      practiceSet: [
        { prompt: "PA is a tangent at A to a circle with centre O and radius 3 cm. If \\(\\angle APO = 30^\\circ\\), find OP.", answer: "6 cm" },
        { prompt: "PT is a tangent at T to a circle with centre O and radius 5 cm. If \\(\\angle TOP = 45^\\circ\\), find PT.", answer: "5 cm, since \\(\\tan 45^\\circ = 1\\)" },
        {
          prompt: "QOR is a diameter of a circle with centre O and PQ is the tangent at Q. If \\(\\angle POR = 130^\\circ\\), find \\(\\angle OPQ\\).",
          answer: "\\(\\angle POQ = 50^\\circ\\), so \\(\\angle OPQ = 40^\\circ\\)",
        },
        { prompt: "PA is a tangent at A to a circle with centre O. If OP = 10 cm and \\(\\angle APO = 30^\\circ\\), find the radius.", answer: "5 cm" },
      ],
      pyqExampleId: "cfeb094e-86da-42b1-8b6e-166c8e9d6390",
      traps: [
        {
          title: "Putting the right angle at the wrong corner",
          body: "The \\(90^\\circ\\) angle is at the point of contact, between the radius and the tangent. It is never at the centre or at the outside point.",
        },
        {
          title: "Using sin where cos is needed",
          body: "If the angle at the centre is \\(60^\\circ\\), the radius is the side next to it, so use \\(\\cos 60^\\circ = \\frac{\\text{radius}}{\\text{hypotenuse}}\\). The radius is opposite the angle at the outside point.",
        },
      ],
    },
  ],
};
