import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles in a Circle",
  title: "Angles in a Circle",
  oneLineDefinition:
    "The angle an arc subtends at the centre is twice the angle it subtends at any point on the rest of the circle.",
  whyItMatters:
    "Thirteen PYQs, three of them HARD. Nearly all come down to one rule, centre angle = twice the circumference angle, plus its two consequences: angles in the same segment are equal, and the angle in a semicircle is 90°. The cyclic-quadrilateral rule handles the rest.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-inscribed",
      name: "Angle at the centre and angles in the same segment",
      intuition:
        "Fix a chord. Every point on the major arc sees it at the same angle, and the centre sees it at twice that angle. Slide the viewing point along the arc and the angle does not change.",
      definition:
        "- Central angle \\(= 2 \\times\\) inscribed angle on the same arc.\n" +
        "- Angles in the same segment (same side of a chord) are equal.\n" +
        "- The angle in a semicircle is \\(90^\\circ\\); so \\(P\\) is on the circle with diameter \\(AB\\) exactly when \\(AP^2 + BP^2 = AB^2\\).\n" +
        "- An OBTUSE inscribed angle \\(\\angle ABC\\) stands on the MAJOR arc \\(AC\\): the reflex angle at the centre is \\(2\\angle ABC\\), and \\(\\angle AOC = 360^\\circ - 2\\angle ABC\\).\n" +
        "- Two radii make an isosceles triangle with any chord.",
      formula: {
        label: "Inscribed angle",
        latex: "\\angle AOB = 2\\,\\angle ACB",
      },
      authoredExample: {
        prompt: "\\(A\\), \\(B\\), \\(C\\) lie on a circle with centre \\(O\\), and \\(\\angle ACB = 35^\\circ\\) with \\(C\\) on the major arc. Find \\(\\angle AOB\\).",
        steps: ["The centre angle on the same arc is twice the circumference angle."],
        answer: "\\(70^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "\\(A\\), \\(B\\), \\(C\\) lie on a circle with centre \\(O\\) and \\(\\angle ABC = 130^\\circ\\). Find \\(\\angle AOC\\).",
        steps: [
          "\\(\\angle ABC\\) is obtuse, so it stands on the major arc: reflex \\(\\angle AOC = 260^\\circ\\).",
          "\\(360^\\circ - 260^\\circ\\).",
        ],
        answer: "\\(100^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Angle in a semicircle?", answer: "\\(90^\\circ\\)" },
        { prompt: "Central angle \\(110^\\circ\\). Angle on the major arc?", answer: "\\(55^\\circ\\)" },
        { prompt: "\\(ABC\\) equilateral, \\(D\\) on arc \\(BAC\\). \\(\\angle BDC\\)?", answer: "\\(60^\\circ\\)" },
        { prompt: "Diameter \\(10\\); \\(AP = 6\\), \\(BP = 8\\). Is \\(P\\) on the circle?", answer: "Yes" },
      ],
      pyqExampleId: "4fb2efce-25fa-4e6e-a030-8189afacb578", // 2026 (I) — angle ABC = 153°, find angle AOC
      visualizationSlug: "circ-inscribed-angle",
      traps: [
        {
          title: "An obtuse inscribed angle needs the reflex angle",
          body:
            "Doubling an obtuse \\(\\angle ABC\\) gives the REFLEX angle at the centre. Doubling \\(130^\\circ\\) to \\(260^\\circ\\) and stopping there answers the wrong angle; \\(\\angle AOC\\) is \\(100^\\circ\\).",
        },
        {
          title: "Two diameters meet at the centre",
          body:
            "If two diameters meet at \\(P\\), then \\(P\\) is the centre, and every segment from \\(P\\) to the circle is a radius. That makes the triangles isosceles.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-cyclic",
      name: "Cyclic quadrilaterals and the two segments",
      intuition:
        "The two arcs of a chord add to the whole circle, so the angles seen from them add to half of \\(360^\\circ\\). That is why opposite angles of a cyclic quadrilateral sum to \\(180^\\circ\\).",
      definition:
        "- Opposite angles of a cyclic quadrilateral sum to \\(180^\\circ\\).\n" +
        "- An exterior angle of a cyclic quadrilateral equals the interior opposite angle.\n" +
        "- On one chord, the angle in the minor segment and the angle in the major segment are supplementary.\n" +
        "- The angle in a segment GREATER than a semicircle is acute; in a segment LESS than a semicircle it is obtuse.\n" +
        "- Equal chords subtend equal angles, so a cyclic quadrilateral with one pair of equal opposite sides has equal diagonals.",
      formula: {
        label: "Cyclic quadrilateral",
        latex: "\\angle A + \\angle C = \\angle B + \\angle D = 180^\\circ",
      },
      authoredExample: {
        prompt: "A chord is \\(\\sqrt2\\) times the radius. Find the angles it subtends at the major arc and at the minor arc.",
        steps: [
          "\\(\\sin\\dfrac\\theta2 = \\dfrac{\\sqrt2}{2}\\), so the centre angle is \\(90^\\circ\\).",
          "Major arc: half of it. Minor arc: the supplement.",
        ],
        answer: "\\(45^\\circ\\) and \\(135^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "In a cyclic quadrilateral \\(ABCD\\), \\(\\angle A = 75^\\circ\\). Find \\(\\angle C\\).",
        steps: ["Opposite angles are supplementary."],
        answer: "\\(105^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Cyclic \\(ABCD\\), \\(\\angle B = 110^\\circ\\). \\(\\angle D\\)?", answer: "\\(70^\\circ\\)" },
        { prompt: "Cyclic, interior \\(\\angle A = 80^\\circ\\). Exterior angle at \\(C\\)?", answer: "\\(80^\\circ\\)" },
        { prompt: "Angle in the major segment \\(40^\\circ\\). In the minor segment?", answer: "\\(140^\\circ\\)" },
        { prompt: "Is the angle in a minor segment acute or obtuse?", answer: "Obtuse" },
      ],
      pyqExampleId: "7d9db3ca-97d4-48ca-9f26-2d20ab8b0c0e", // 2018 (II) — chord √3 r, minor-arc angle is k times the major-arc angle
      traps: [
        {
          title: "Segment, not sector",
          body:
            "The textbook rule is about the angle in a SEGMENT. One paper printed 'sector'; a sector bigger than a semicircle has a reflex angle at the centre. Read the word before judging the statement.",
        },
      ],
    },
  ],
};
