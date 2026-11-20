import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CI_CHORDS_NOTE: SubtopicNote = {
  subtopicName: "Chords, Tangents and Radii",
  title: "Chords, Tangents and Radii",
  oneLineDefinition:
    "The perpendicular from the centre halves a chord and makes a right triangle with a radius; a tangent meets the radius at a right angle, and the two tangents from one point are equal.",
  whyItMatters:
    "10 questions in the Tier II bank, 8 EASY and 2 MODERATE. Nearly every one is a right triangle made from a radius, half a chord or a tangent, solved by Pythagoras.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2cich-chords",
      name: "Chords and the perpendicular from the centre",
      visualizationSlug: "ssc-t2-chord-distance",
      intuition:
        "The line from the centre at right angles to a chord cuts the chord in half. That gives a right triangle: the radius as the long side, half the chord and the distance from the centre as the other two.",
      definition:
        "- \\(r^2 = \\left(\\frac{c}{2}\\right)^2 + d^2\\), where c is the chord and d its distance from the centre.\n" +
        "- The longest chord is a diameter, so any chord is at most \\(2r\\).\n" +
        "- Two circles meeting: the line of centres cuts the common chord in half at right angles; the centres lie on opposite sides of it.\n" +
        "- Three points on one straight line have no circle through them; a right triangle's circumcircle has its hypotenuse as a diameter.",
      formula: {
        label: "Radius, half-chord and distance",
        latex: "r^2 = \\left(\\frac{c}{2}\\right)^2 + d^2",
      },
      authoredExample: {
        prompt: "A chord 16 cm long lies 6 cm from the centre of a circle. Find the radius.",
        steps: ["Half the chord is 8 cm.", "\\(r = \\sqrt{8^2 + 6^2} = 10\\) cm."],
        answer: "10 cm",
      },
      selfCheckExample: {
        prompt: "Two circles of radius 10 cm and 17 cm meet, and their common chord is 16 cm long. Find the distance between their centres.",
        steps: ["Half the chord is 8: distances \\(\\sqrt{100 - 64} = 6\\) and \\(\\sqrt{289 - 64} = 15\\).", "The centres are on opposite sides: \\(6 + 15 = 21\\) cm."],
        answer: "21 cm",
      },
      practiceSet: [
        { prompt: "A circle has radius 13 cm. How far from the centre is a chord 24 cm long?", answer: "5 cm" },
        { prompt: "A triangle has sides 9, 12 and 15 cm. Find the radius of its circumcircle.", answer: "7.5 cm" },
        { prompt: "Can a chord of 30 cm fit in a circle of radius 14 cm?", answer: "No: the longest chord is 28 cm" },
      ],
      pyqExampleId: "ecfeb4b6-aa11-48f4-97c0-da734e2e5ee1",
      traps: [
        {
          title: "Using the whole chord in Pythagoras",
          body: "The right triangle uses HALF the chord. A 16 cm chord 6 cm from the centre gives \\(r^2 = 8^2 + 6^2\\), not \\(16^2 + 6^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2cich-tangents",
      name: "Tangents",
      intuition:
        "A tangent touches the circle at one point, and there it meets the radius at a right angle. From a point outside, the two tangents to a circle are equal in length.",
      definition:
        "- Radius \\(\\perp\\) tangent at the point of contact: \\(OP^2 = r^2 + t^2\\) for a tangent of length t from P.\n" +
        "- The two tangents from an outside point are equal.\n" +
        "- So a quadrilateral with a circle inside touching all four sides has \\(AB + CD = BC + AD\\).\n" +
        "- Tangents from P meeting the circle at A and B: \\(\\angle APB = 180^\\circ - \\angle AOB\\).",
      formula: {
        label: "Tangent length",
        latex: "OP^2 = r^2 + t^2",
      },
      authoredExample: {
        prompt: "A point P is 25 cm from the centre of a circle of radius 7 cm. Find the length of the tangent from P.",
        steps: ["\\(t^2 = 25^2 - 7^2 = 625 - 49 = 576\\).", "\\(t = 24\\) cm."],
        answer: "24 cm",
      },
      selfCheckExample: {
        prompt: "A circle touches all four sides of quadrilateral PQRS. PQ = 9 cm, QR = 11 cm and RS = 12 cm. Find SP.",
        steps: ["\\(PQ + RS = QR + SP\\).", "\\(21 = 11 + SP\\), so SP \\(= 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "Tangents from P touch a circle at A and B, and angle AOB = 130°. Find angle APB.", answer: "\\(50^\\circ\\)" },
        { prompt: "A tangent of 12 cm is drawn from a point 13 cm from the centre. Find the radius.", answer: "5 cm" },
        { prompt: "Two tangents from P are drawn to a circle; one is 8 cm long. How long is the other?", answer: "8 cm" },
      ],
      pyqExampleId: "212963ce-6cf9-45da-9822-56d25f493d74",
      traps: [
        {
          title: "Forgetting the right angle at the point of contact",
          body: "The radius to the point of contact meets the tangent at \\(90^\\circ\\). Missing it loses the right triangle that solves the question.",
        },
      ],
    },
  ],
};
