import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_CHORDS_NOTE: SubtopicNote = {
  subtopicName: "Chords and Perpendiculars",
  title: "Chords and the Perpendicular from the Centre",
  oneLineDefinition:
    "The perpendicular from the centre bisects a chord, so the radius, the half-chord and the distance from the centre make a right triangle.",
  whyItMatters:
    "Fifteen PYQs, five of them HARD. Almost every one is the same right triangle: radius as hypotenuse, half the chord and the distance from the centre as the legs. Parallel-chord questions add one choice — same side or opposite sides of the centre.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-chord-distance",
      name: "Half-chord, distance and radius",
      intuition:
        "Drop a perpendicular from the centre to a chord. It lands on the chord's midpoint, and the radius to either end closes a right triangle. Any two of the three lengths give the third.",
      definition:
        "- The perpendicular from the centre bisects the chord, and the line from the centre to a chord's midpoint is perpendicular to it.\n" +
        "- A chord of length \\(c\\) at distance \\(d\\) from the centre: \\(r^2 = d^2 + \\left(\\dfrac c2\\right)^2\\).\n" +
        "- Equal chords are equally far from the centre; a longer chord is nearer.\n" +
        "- Two parallel chords at distances \\(d_1, d_2\\): \\(|d_1 - d_2|\\) apart on the same side of the centre, \\(d_1 + d_2\\) on opposite sides.\n" +
        "- A chord subtends \\(\\theta\\) at the centre when \\(\\sin\\dfrac\\theta2 = \\dfrac{c/2}{r}\\).",
      formula: {
        label: "Chord and distance",
        latex: "r^2 = d^2 + \\left(\\dfrac{c}{2}\\right)^2",
      },
      authoredExample: {
        prompt: "In a circle of radius \\(17\\) cm, parallel chords are \\(16\\) cm and \\(30\\) cm long. How far apart are they?",
        steps: [
          "The \\(16\\) cm chord: \\(d = \\sqrt{17^2 - 8^2} = 15\\) cm.",
          "The \\(30\\) cm chord: \\(d = \\sqrt{17^2 - 15^2} = 8\\) cm.",
          "Same side: \\(15 - 8\\). Opposite sides: \\(15 + 8\\).",
        ],
        answer: "\\(7\\) cm or \\(23\\) cm.",
      },
      selfCheckExample: {
        prompt: "A chord \\(24\\) cm long lies in a circle of radius \\(15\\) cm. How far is it from the centre?",
        steps: ["\\(\\sqrt{15^2 - 12^2} = \\sqrt{81}\\)."],
        answer: "\\(9\\) cm.",
      },
      practiceSet: [
        { prompt: "Radius \\(13\\), chord \\(24\\). Distance from the centre?", answer: "\\(5\\)" },
        { prompt: "Distance \\(8\\) from the centre, radius \\(10\\). Chord length?", answer: "\\(12\\)" },
        { prompt: "Chord \\(r\\sqrt2\\). Angle at the centre?", answer: "\\(90^\\circ\\)" },
        { prompt: "Which is nearer the centre, a \\(10\\) cm or a \\(14\\) cm chord?", answer: "The \\(14\\) cm chord" },
      ],
      pyqExampleId: "5b2673c0-5f66-44e9-9d1a-5bdb953bc095", // 2019 (II) — radius 10, chords 12 and 16, distance 2 or 14
      traps: [
        {
          title: "Parallel chords have two answers",
          body:
            "Unless the question says which side of the centre each chord lies on, both the difference and the sum of the distances are possible. The options often pair them, as in '2 cm or 14 cm'.",
        },
        {
          title: "Half the chord, not the chord",
          body:
            "The leg of the right triangle is HALF the chord. A \\(24\\) cm chord in a circle of radius \\(13\\) is \\(5\\) cm from the centre, not \\(\\sqrt{24^2 - 13^2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-chord-height",
      name: "Arches, segment heights and equal chords",
      intuition:
        "The height of a segment is measured from the chord's midpoint up to the arc. The centre is \\(r - h\\) beyond the chord, so the same right triangle gives an equation in \\(r\\) alone.",
      definition:
        "- A chord of length \\(c\\) with segment height \\(h\\): \\(r^2 = \\left(\\dfrac c2\\right)^2 + (r - h)^2\\), so \\(r = \\dfrac{(c/2)^2 + h^2}{2h}\\).\n" +
        "- An arch of span \\(c\\) and height \\(h\\) is the same problem.\n" +
        "- The midpoint of an arc, the midpoint of its chord and the centre lie on one line.\n" +
        "- Two equal chords \\(AB = AC = a\\) from one point: \\(BC = \\dfrac{a}{r}\\sqrt{4r^2 - a^2}\\).",
      formula: {
        label: "Radius from a segment",
        latex: "r = \\dfrac{(c/2)^2 + h^2}{2h}",
      },
      authoredExample: {
        prompt: "A chord \\(24\\) cm long cuts off a segment of height \\(6\\) cm. Find the radius.",
        steps: [
          "\\(r^2 = 12^2 + (r - 6)^2\\).",
          "\\(0 = 144 + 36 - 12r\\), so \\(12r = 180\\).",
        ],
        answer: "\\(15\\) cm.",
      },
      selfCheckExample: {
        prompt: "In a circle of radius \\(10\\) cm, \\(AB = AC = 12\\) cm. Find \\(BC\\).",
        steps: ["\\(BC = \\dfrac{12}{10}\\sqrt{400 - 144} = 1.2 \\times 16\\)."],
        answer: "\\(19.2\\) cm.",
      },
      practiceSet: [
        { prompt: "Chord \\(16\\), segment height \\(4\\). Radius?", answer: "\\(10\\)" },
        { prompt: "Chord \\(30\\), segment height \\(5\\). Diameter?", answer: "\\(50\\)" },
        { prompt: "Radius \\(r\\), \\(AB = AC = r\\). \\(BC\\)?", answer: "\\(r\\sqrt3\\)" },
        { prompt: "Segment height equals the radius. The chord is a …?", answer: "Diameter" },
      ],
      pyqExampleId: "3c7c7bec-2e31-40e0-9aec-8d2fb9253d63", // 2023 (II) — arch of span 40 m, height 8 m
      traps: [
        {
          title: "The centre is r − h from the chord",
          body:
            "The height is measured from the chord to the arc, so the centre sits \\(r - h\\) from the chord, not \\(h\\). Using \\(h\\) makes the leg the wrong side of the triangle.",
        },
        {
          title: "Radius or diameter?",
          body:
            "Segment questions often ask for the DIAMETER. The equation gives \\(r\\); double it before matching options.",
        },
      ],
    },
  ],
};
