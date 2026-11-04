import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 10 Circles. Statements checked against the NCERT
 * Class 10 text (rationalised); formulas rebuilt; most-asked years and marks
 * from the CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Circles",
  chapterSlug: "circles",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 10",
  keyPoints: [
    {
      term: "Tangent",
      text: "A tangent is a line that meets the circle at only one point. It is a special case of the secant, when the two end points of its chord coincide. A secant meets the circle at two points.",
    },
    {
      term: "Point of contact",
      text: "The common point of the tangent and the circle is called the point of contact; the tangent is said to touch the circle there.",
    },
    {
      term: "Number of tangents",
      text: "No tangent passes through a point inside the circle; exactly one through a point on the circle; exactly two through a point outside the circle. A circle can have infinitely many tangents.",
    },
    {
      term: "Theorem 10.1",
      text: "The tangent at any point of a circle is perpendicular to the radius through the point of contact.",
    },
    {
      term: "Normal",
      text: "The line containing the radius through the point of contact is called the normal. A line perpendicular to the tangent at the point of contact passes through the centre.",
    },
    {
      term: "Length of a tangent",
      text: "The length of the segment of the tangent from the external point P to the point of contact is the length of the tangent from P.",
    },
    {
      term: "Theorem 10.2",
      text: "The lengths of tangents drawn from an external point to a circle are equal.",
    },
    {
      term: "Isosceles triangle of tangents",
      text: "If TP and TQ are tangents from T, then \\(TP = TQ\\), so \\(\\Delta TPQ\\) is isosceles. OT bisects \\(\\angle PTQ\\), and \\(\\angle PTQ + \\angle POQ = 180^\\circ\\).",
    },
    {
      term: "Concentric circles",
      text: "In two concentric circles, the chord of the larger circle which touches the smaller circle is bisected at the point of contact.",
    },
    {
      term: "Tangents at the ends of a diameter",
      text: "The tangents drawn at the ends of a diameter are parallel (both are perpendicular to the same diameter).",
    },
  ],
  formulas: [
    { label: "Tangent length (right angle at contact)", latex: "PT^2 = OP^2 - r^2" },
    { label: "Angle between two tangents", latex: "\\angle APB + \\angle AOB = 180^\\circ" },
    { label: "Two tangents PA, PB and the chord AB", latex: "\\angle APB = 2\\angle OAB" },
    { label: "Chord of the larger concentric circle", latex: "AB = 2\\sqrt{R^2 - r^2}" },
    { label: "Quadrilateral circumscribing a circle", latex: "AB + CD = AD + BC" },
    { label: "Triangle circumscribing a circle", latex: "\\text{area} = \\frac{1}{2} r (a + b + c)" },
  ],
  derivations: [
    {
      title: "Theorem 10.1: the tangent at any point of a circle is perpendicular to the radius through the point of contact",
      steps: [
        "Given: circle with centre O, tangent XY at P. To prove: \\(OP \\perp XY\\).",
        "Take any point Q on XY other than P and join OQ.",
        "Q lies outside the circle (if it were inside, XY would be a secant). So \\(OQ > OP\\).",
        "This holds for every point of XY except P, so OP is the shortest distance from O to XY.",
        "The shortest distance from a point to a line is the perpendicular. Hence \\(OP \\perp XY\\).",
      ],
    },
    {
      title: "Theorem 10.2: the lengths of tangents drawn from an external point to a circle are equal",
      steps: [
        "Given: tangents PQ and PR from P to a circle with centre O. To prove: \\(PQ = PR\\).",
        "Join OP, OQ, OR. \\(\\angle OQP = \\angle ORP = 90^\\circ\\) (Theorem 10.1).",
        "In right triangles OQP and ORP: \\(OQ = OR\\) (radii), \\(OP = OP\\) (common).",
        "So \\(\\Delta OQP \\cong \\Delta ORP\\) (RHS), and \\(PQ = PR\\) (CPCT).",
      ],
    },
    {
      title: "Two tangents TP and TQ are drawn from T. Prove \\(\\angle PTQ = 2\\angle OPQ\\)",
      steps: [
        "Let \\(\\angle PTQ = \\theta\\). By Theorem 10.2, \\(TP = TQ\\), so \\(\\Delta TPQ\\) is isosceles.",
        "\\(\\angle TPQ = \\angle TQP = \\frac{1}{2}(180^\\circ - \\theta) = 90^\\circ - \\frac{\\theta}{2}\\).",
        "\\(\\angle OPT = 90^\\circ\\) (Theorem 10.1), so \\(\\angle OPQ = 90^\\circ - \\left(90^\\circ - \\frac{\\theta}{2}\\right) = \\frac{\\theta}{2}\\).",
        "Hence \\(\\angle PTQ = 2\\angle OPQ\\).",
      ],
    },
    {
      title: "Prove that a parallelogram circumscribing a circle is a rhombus",
      steps: [
        "Let the circle touch AB, BC, CD, DA at P, Q, R, S.",
        "Tangents from a point are equal: \\(AP = AS\\), \\(BP = BQ\\), \\(CR = CQ\\), \\(DR = DS\\).",
        "Add: \\(AB + CD = AD + BC\\).",
        "In a parallelogram \\(AB = CD\\) and \\(AD = BC\\), so \\(2AB = 2BC\\), \\(AB = BC\\). All sides are equal: ABCD is a rhombus.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Two tangents from an external point (Theorem 10.2)",
      labels: ["Circle with centre O", "External point P", "Tangents PQ and PR", "Radii OQ and OR", "Right angles at Q and R", "OP joined"],
    },
  ],
  mostAsked: [
    { topic: "Angles with tangents: angle between two tangents, angle at the centre, angle between a tangent and a chord", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Lengths: tangent length, radius or distance from the centre by Pythagoras", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Circle inscribed in a triangle or quadrilateral: equal tangent lengths, AB + CD = AD + BC, a parallelogram is a rhombus", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Prove a tangent result: Theorem 10.1 or 10.2, \\(\\angle APB = 2\\angle OAB\\), \\(\\angle POQ = 90^\\circ\\), cyclic quadrilateral", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Basic facts: tangents at the ends of a diameter are parallel, number of tangents, true or false", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Two concentric circles: chord of the larger circle that touches the smaller one", marks: 1, years: [2026, 2025, 2022] },
  ],
  mistakes: [
    {
      title: "Missing the right angle",
      body: "Whenever a radius meets a tangent at the point of contact, mark \\(90^\\circ\\) and say why (Theorem 10.1). Most length questions then use Pythagoras.",
    },
    {
      title: "Angle at the centre and angle between tangents",
      body: "They add to \\(180^\\circ\\) (OAPB has two right angles). If \\(\\angle APB = 50^\\circ\\), then \\(\\angle AOB = 130^\\circ\\), not \\(50^\\circ\\).",
    },
    {
      title: "Skipping reasons in a proof",
      body: "Write the reason with every step: (radii), (common), (tangents from an external point), (Theorem 10.1), (RHS), (CPCT).",
    },
    {
      title: "Confusing tangents from a point with other segments",
      body: "Only the two tangents from the **same** external point are equal. For a circle inside triangle ABC, \\(AP = AR\\), \\(BP = BQ\\), \\(CQ = CR\\).",
    },
    {
      title: "Using the diameter for the radius",
      body: "In \\(PT^2 = OP^2 - r^2\\), \\(r\\) is the radius. Read whether the figure gives the radius or the diameter.",
    },
  ],
};

export default sheet;
