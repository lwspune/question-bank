import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 3 Circle. Theorem wordings are the Balbharati
 * book's own; formulas rebuilt (the book text loses its notation). Most-asked
 * from the SSC board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Circle",
  chapterSlug: "circle",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Tangent theorem",
      text: "The tangent at any point of a circle is perpendicular to the radius through the point of contact.",
    },
    {
      term: "Converse of tangent theorem",
      text: "A line perpendicular to a radius at its point on the circle is a tangent to the circle.",
    },
    {
      term: "Tangent segments",
      text: "Tangent segments drawn from an external point to a circle are congruent.",
    },
    {
      term: "Touching circles",
      text: "The point of contact lies on the line joining their centres. Touching externally: distance between centres = sum of radii. Touching internally: distance = difference of radii.",
    },
    {
      term: "Measure of an arc",
      text: "A minor arc measures the same as its central angle. Major arc = 360° minus its minor arc. A semicircle measures 180°.",
    },
    {
      term: "Congruent arcs and chords",
      text: "Two arcs are congruent if their measures and radii are equal. In the same or congruent circles, congruent arcs have congruent chords, and congruent chords have congruent arcs.",
    },
    {
      term: "Inscribed angle theorem",
      text: "The measure of an inscribed angle is half of the measure of the arc intercepted by it.",
    },
    {
      term: "Corollaries of inscribed angle theorem",
      text: "Angles inscribed in the same arc are congruent. An angle inscribed in a semicircle is a right angle.",
    },
    {
      term: "Cyclic quadrilateral",
      text: "All four vertices lie on one circle. Its opposite angles are supplementary, and an exterior angle equals the angle opposite to its adjacent interior angle.",
    },
    {
      term: "Converse of cyclic quadrilateral theorem",
      text: "If a pair of opposite angles of a quadrilateral is supplementary, the quadrilateral is cyclic.",
    },
    {
      term: "Angle between tangent and secant",
      text: "If an angle has its vertex on the circle, one side touching the circle and the other cutting it again, its measure is half the measure of its intercepted arc.",
    },
    {
      term: "Angles of intersecting chords",
      text: "Chords meeting inside: the angle is half the **sum** of the two intercepted arcs. Meeting outside: half the **difference** of the arcs.",
    },
    {
      term: "Chords intersecting inside or outside",
      text: "If chords AB and CD (or the secants containing them) meet at E, then \\(AE \\times EB = CE \\times ED\\).",
    },
    {
      term: "Tangent secant segments theorem",
      text: "A secant through an external point E meets the circle at A and B, and a tangent from E touches it at T. Then \\(EA \\times EB = ET^2\\).",
    },
  ],
  formulas: [
    { label: "Touching circles: distance between centres", latex: "d = r_1 + r_2 \\ (\\text{externally}) \\qquad d = r_1 - r_2 \\ (\\text{internally})" },
    { label: "Measure of arcs", latex: "m(\\text{major arc}) = 360^\\circ - m(\\text{minor arc}) \\qquad m(\\text{semicircle}) = 180^\\circ" },
    { label: "Inscribed angle and central angle", latex: "\\angle ACB = \\frac{1}{2}\\,m(\\text{arc } AB) = \\frac{1}{2}\\angle AOB" },
    { label: "Cyclic quadrilateral ABCD", latex: "\\angle A + \\angle C = 180^\\circ \\qquad \\angle B + \\angle D = 180^\\circ" },
    { label: "Chords meeting inside at E", latex: "\\angle AEC = \\frac{1}{2}[m(\\text{arc } AC) + m(\\text{arc } DB)]" },
    { label: "Secants meeting outside at E", latex: "\\angle BED = \\frac{1}{2}[m(\\text{arc } BD) - m(\\text{arc } AC)]" },
    { label: "Chords or secants meeting at E", latex: "AE \\times EB = CE \\times ED" },
    { label: "Tangent and secant from E", latex: "EA \\times EB = ET^2" },
  ],
  derivations: [
    {
      title: "Prove that tangent segments drawn from an external point to a circle are congruent",
      steps: [
        "Given: circle with centre A; DP and DQ are tangent segments from D. To prove: \\(DP = DQ\\). Draw radii AP and AQ.",
        "In \\(\\triangle PAD\\) and \\(\\triangle QAD\\): \\(AP = AQ\\) (radii), AD is common, \\(\\angle APD = \\angle AQD = 90^\\circ\\) (tangent theorem).",
        "So \\(\\triangle PAD \\cong \\triangle QAD\\) (hypotenuse side test), hence \\(DP = DQ\\).",
      ],
    },
    {
      title: "Prove the inscribed angle theorem (centre inside the angle)",
      steps: [
        "Given: \\(\\angle BAC\\) inscribed, intercepting arc BDC. To prove: \\(\\angle BAC = \\frac{1}{2}m(\\text{arc } BDC)\\). Draw ray AO meeting the circle at E, and radius OC.",
        "\\(OA = OC\\), so \\(\\angle OAC = \\angle OCA = x\\). Exterior angle: \\(\\angle EOC = 2x\\), so \\(m(\\text{arc } EC) = 2x\\) and \\(\\angle EAC = \\frac{1}{2}m(\\text{arc } EC)\\).",
        "In the same way \\(\\angle BAE = \\frac{1}{2}m(\\text{arc } BE)\\). Add: \\(\\angle BAC = \\frac{1}{2}m(\\text{arc } BDC)\\).",
      ],
    },
    {
      title: "Prove that angles inscribed in the same arc are congruent",
      steps: [
        "Given: \\(\\angle PQR\\) and \\(\\angle PSR\\) are inscribed in the same arc; both intercept arc PXR.",
        "\\(\\angle PQR = \\frac{1}{2}m(\\text{arc } PXR)\\) and \\(\\angle PSR = \\frac{1}{2}m(\\text{arc } PXR)\\) (inscribed angle theorem).",
        "Hence \\(\\angle PQR = \\angle PSR\\).",
      ],
    },
    {
      title: "Prove that opposite angles of a cyclic quadrilateral are supplementary",
      steps: [
        "Given: \\(\\square ABCD\\) is cyclic. To prove: \\(\\angle B + \\angle D = 180^\\circ\\).",
        "\\(\\angle ADC = \\frac{1}{2}m(\\text{arc } ABC)\\) and \\(\\angle ABC = \\frac{1}{2}m(\\text{arc } ADC)\\) (inscribed angle theorem).",
        "Add: \\(\\angle B + \\angle D = \\frac{1}{2}[m(\\text{arc } ABC) + m(\\text{arc } ADC)] = \\frac{1}{2} \\times 360^\\circ = 180^\\circ\\). Similarly \\(\\angle A + \\angle C = 180^\\circ\\).",
      ],
    },
    {
      title: "Theorem of internal division of chords: prove AE × EB = CE × ED",
      steps: [
        "Given: chords AB and CD meet at E inside the circle. Construction: draw seg AC and seg DB.",
        "In \\(\\triangle CAE\\) and \\(\\triangle BDE\\): \\(\\angle AEC = \\angle DEB\\) (opposite angles), \\(\\angle CAE = \\angle BDE\\) (angles inscribed in the same arc).",
        "So \\(\\triangle CAE \\sim \\triangle BDE\\) (AA test): \\(\\frac{AE}{DE} = \\frac{CE}{BE}\\), hence \\(AE \\times EB = CE \\times ED\\).",
      ],
    },
    {
      title: "Tangent secant segments theorem: prove EA × EB = ET²",
      steps: [
        "Construction: draw seg TA and seg TB.",
        "In \\(\\triangle EAT\\) and \\(\\triangle ETB\\): \\(\\angle AET = \\angle TEB\\) (common), \\(\\angle ETA = \\angle EBT\\) (tangent secant angle theorem).",
        "So \\(\\triangle EAT \\sim \\triangle ETB\\) (AA): \\(\\frac{ET}{EB} = \\frac{EA}{ET}\\), hence \\(EA \\times EB = ET^2\\).",
      ],
    },
    {
      title: "Chords PQ and RS meet at T inside: prove ∠STQ = ½[m(arc SQ) + m(arc PR)]",
      steps: [
        "Join PS. \\(\\angle STQ\\) is an exterior angle of \\(\\triangle PTS\\), so \\(\\angle STQ = \\angle SPQ + \\angle PSR\\).",
        "\\(\\angle SPQ = \\frac{1}{2}m(\\text{arc } SQ)\\) and \\(\\angle PSR = \\frac{1}{2}m(\\text{arc } PR)\\) (inscribed angle theorem).",
        "Add: \\(\\angle STQ = \\frac{1}{2}[m(\\text{arc } SQ) + m(\\text{arc } PR)]\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Tangent segments from an external point", labels: ["centre A", "external point D", "tangent segments DP and DQ", "radii AP and AQ", "right angles at P and Q"] },
    { title: "Inscribed angle theorem", labels: ["centre O", "inscribed angle BAC", "intercepted arc BDC", "ray AO meeting the circle at E", "radius OC"] },
    { title: "Cyclic quadrilateral", labels: ["all four vertices A, B, C, D on the circle", "arc ABC and arc ADC", "opposite angles B and D"] },
    { title: "Chords intersecting inside the circle", labels: ["chords AB and CD", "intersection point E", "seg AC and seg DB joined"] },
    { title: "Tangent secant segments", labels: ["external point E", "secant through A and B", "tangent ET, point of contact T", "seg TA and seg TB"] },
  ],
  mostAsked: [
    { topic: "Tangent theorem and tangents: find a radius or an angle (tangent with a chord, circle touching the sides of a triangle)", marks: 3, years: [2026, 2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Chords intersecting inside or outside, and tangent secant segments: find a length", marks: 2, years: [2026, 2025, 2024, 2023, 2020, 2018, 2017, 2016] },
    { topic: "Inscribed angle theorem and its corollaries: find an angle or an arc, or prove angles in the same arc are congruent", marks: 2, years: [2026, 2025, 2024, 2023, 2020, 2019] },
    { topic: "Touching circles: distance between the centres", marks: 1, years: [2026, 2025, 2024, 2020, 2018, 2017] },
    { topic: "Angle made by chords or secants meeting inside or outside the circle", marks: 2, years: [2026, 2025, 2024, 2022, 2016] },
    { topic: "Measure of arcs: minor, major, semicircle; arcs of congruent chords", marks: 1, years: [2026, 2023, 2022] },
    { topic: "Prove that opposite angles of a cyclic quadrilateral are supplementary, or use it", marks: 3, years: [2026, 2025, 2024, 2022, 2020, 2017] },
    { topic: "Prove that tangent segments from an external point are congruent", marks: 3, years: [2026, 2025, 2020, 2018, 2016] },
  ],
  mistakes: [
    {
      title: "Adding radii for circles touching internally",
      body: "Externally: add the radii. Internally: subtract them. Radii 8 cm and 3 cm give 11 cm outside, 5 cm inside.",
    },
    {
      title: "Using the whole chord in AE × EB = CE × ED",
      body: "Inside the circle, use the two parts of each chord from E. Outside, use EA and EB measured from E: the whole secant times its outer part.",
    },
    {
      title: "Doubling instead of halving",
      body: "An inscribed angle is **half** its arc; the central angle **equals** its arc. An inscribed angle of 65° intercepts an arc of 130°.",
    },
    {
      title: "Sum and difference of arcs",
      body: "Chords meeting **inside**: half the sum of the arcs. Secants meeting **outside**: half the difference.",
    },
    {
      title: "Forgetting the right angle at the point of contact",
      body: "A radius drawn to the point of contact makes 90° with the tangent. Mark it and use Pythagoras or the angle sum of the quadrilateral.",
    },
    {
      title: "Forgetting that the diameter is the longest chord",
      body: "A Class 9 fact the board still asks (2019, 2023, 2024): the longest chord is the diameter, \\(2r\\). Radius 5 cm gives a longest chord of 10 cm.",
    },
  ],
};

export default sheet;
