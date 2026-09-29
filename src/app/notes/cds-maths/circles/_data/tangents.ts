import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents from an External Point",
  title: "Tangents from an External Point",
  oneLineDefinition:
    "A tangent is perpendicular to the radius at its point of contact, and the two tangents from one outside point are equal.",
  whyItMatters:
    "Eleven PYQs, none HARD. Three facts carry the page: tangent ⊥ radius (a right triangle with the line to the centre), equal tangents from one point, and the alternate segment theorem for the angle a tangent makes with a chord.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-tangent-length",
      name: "Length of a tangent",
      intuition:
        "The radius to the point of contact, the tangent, and the line from the outside point to the centre form a right triangle, with the right angle at the point of contact.",
      definition:
        "- Tangent \\(\\perp\\) radius at the point of contact: \\(PT = \\sqrt{OP^2 - r^2}\\).\n" +
        "- The two tangents from \\(P\\) are equal, and \\(OP\\) bisects the angle between them.\n" +
        "- The angle between the tangents and the angle between the radii to the contact points add to \\(180^\\circ\\).\n" +
        "- \\(OP\\) is the perpendicular bisector of the chord of contact \\(MN\\), meeting it at \\(Q\\) with \\(OM^2 = OQ \\cdot OP\\).",
      formula: {
        label: "Tangent length",
        latex: "PT = \\sqrt{OP^2 - r^2}",
      },
      authoredExample: {
        prompt: "A point is \\(13\\) cm from the centre of a circle of radius \\(5\\) cm. Find the length of the tangent from it.",
        steps: ["\\(\\sqrt{13^2 - 5^2} = \\sqrt{144}\\)."],
        answer: "\\(12\\) cm.",
      },
      selfCheckExample: {
        prompt: "Two tangents to a circle of radius \\(7\\) cm are at right angles. How long is each?",
        steps: ["The radii and the tangents form a square."],
        answer: "\\(7\\) cm.",
      },
      practiceSet: [
        { prompt: "\\(OP = 25\\), \\(r = 7\\). Tangent length?", answer: "\\(24\\)" },
        { prompt: "Angle between the tangents \\(70^\\circ\\). Angle between the radii?", answer: "\\(110^\\circ\\)" },
        { prompt: "Incircle touches \\(AB, AC\\) at \\(M, N\\); \\(\\angle A = 50^\\circ\\). \\(\\angle MON\\)?", answer: "\\(130^\\circ\\)" },
        { prompt: "Tangents at \\(120^\\circ\\), radius \\(\\sqrt3\\). Tangent length?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "22044f2d-ae39-4203-abc5-dd55f75bd373", // 2016 (II) — tangents at 60°, radius 3 cm
      traps: [
        {
          title: "Supplement, not double",
          body:
            "The angle between the radii to the contact points is \\(180^\\circ\\) minus the angle between the tangents, because the quadrilateral has two right angles. It is not twice that angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-alternate-segment",
      name: "The alternate segment theorem",
      intuition:
        "Turn a chord \\(PQ\\) until \\(Q\\) slides onto \\(P\\): the chord becomes the tangent. The angle between a tangent and a chord is the limit of an inscribed angle, so it equals the inscribed angle on the other side.",
      definition:
        "- The angle between a tangent and a chord through the point of contact equals the inscribed angle in the ALTERNATE segment.\n" +
        "- So the central angle on that chord is twice the tangent–chord angle.\n" +
        "- Two tangents \\(XA, XB\\) with \\(\\angle AXB = \\phi\\): \\(\\angle XAB = \\angle XBA = 90^\\circ - \\dfrac\\phi2\\), which is also the angle \\(AB\\) subtends on the far arc.",
      formula: {
        label: "Tangent–chord angle",
        latex: "\\angle QPT = \\angle PRQ = \\tfrac12\\angle POQ",
      },
      authoredExample: {
        prompt: "The tangent at \\(P\\) makes \\(40^\\circ\\) with the chord \\(PQ\\). Find the angle \\(PQ\\) subtends at the centre.",
        steps: ["The inscribed angle in the alternate segment is \\(40^\\circ\\).", "The centre angle is twice it."],
        answer: "\\(80^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "Tangents \\(XA\\) and \\(XB\\) meet at \\(\\angle AXB = 70^\\circ\\). \\(C\\) is on the major arc. Find \\(\\angle ACB\\).",
        steps: ["\\(\\angle XAB = \\dfrac{180^\\circ - 70^\\circ}{2} = 55^\\circ\\).", "Alternate segment: \\(\\angle ACB = \\angle XAB\\)."],
        answer: "\\(55^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Tangent–chord angle \\(25^\\circ\\). Angle at the centre?", answer: "\\(50^\\circ\\)" },
        { prompt: "Tangent–chord angle \\(\\alpha\\). Angle in the alternate segment?", answer: "\\(\\alpha\\)" },
        { prompt: "Tangents at \\(40^\\circ\\). Angle each makes with the chord of contact?", answer: "\\(70^\\circ\\)" },
        { prompt: "Tangent at the end of a diameter meets it at?", answer: "\\(90^\\circ\\)" },
      ],
      pyqExampleId: "d1e83edb-a49a-41c9-a157-d4f125e13e7a", // 2026 (I) — tangent PT with angle QPT = 36°, find angle POQ
      traps: [
        {
          title: "The ALTERNATE segment",
          body:
            "The equal inscribed angle is on the far side of the chord from the tangent–chord angle. An angle in the near segment is its supplement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-tangential-quad",
      name: "A circle inside a quadrilateral",
      intuition:
        "Each vertex sends two equal tangents to the circle. Each pair of opposite sides uses one tangent from every vertex, so the two pairs have the same total.",
      definition:
        "- If a circle touches all four sides of \\(ABCD\\): \\(AB + CD = BC + DA\\).\n" +
        "- The perimeter is then \\(2(AB + CD)\\), so either opposite-pair sum fixes it.\n" +
        "- The same equal-tangent idea splits a triangle's sides at the incircle: the tangent from \\(A\\) is \\(s - a\\).",
      formula: {
        label: "Tangential quadrilateral",
        latex: "AB + CD = BC + DA",
      },
      authoredExample: {
        prompt: "A circle touches all four sides of \\(ABCD\\), with \\(AB = 6\\), \\(BC = 7\\) and \\(CD = 9\\) cm. Find \\(DA\\).",
        steps: ["\\(6 + 9 = 7 + DA\\)."],
        answer: "\\(8\\) cm.",
      },
      selfCheckExample: {
        prompt: "A circle touches all four sides of a quadrilateral, and one pair of opposite sides adds to \\(15\\) cm. Find the perimeter.",
        steps: ["The other pair also adds to \\(15\\)."],
        answer: "\\(30\\) cm.",
      },
      practiceSet: [
        { prompt: "\\(AB = 5\\), \\(BC = 6\\), \\(CD = 8\\). \\(DA\\)?", answer: "\\(7\\)" },
        { prompt: "A rhombus: can a circle touch all four sides?", answer: "Yes" },
        { prompt: "A \\(4 \\times 6\\) rectangle: can it?", answer: "No" },
        { prompt: "\\(AB + CD = 12\\). Perimeter?", answer: "\\(24\\)" },
      ],
      pyqExampleId: "ca02842f-937b-4641-af4c-19dd43604459", // 2021 (I) — AB = 9, BC = 8, CD = 12, find DA
      traps: [
        {
          title: "Opposite sides, not adjacent ones",
          body:
            "The rule pairs \\(AB\\) with \\(CD\\) and \\(BC\\) with \\(DA\\). Adding adjacent sides gives nothing.",
        },
      ],
    },
  ],
};
