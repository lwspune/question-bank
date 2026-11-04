import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 2 Pythagoras Theorem. Theorem wordings are the
 * Balbharati book's own; formulas rebuilt (the book text loses its powers and
 * roots). Most-asked from the SSC board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Pythagoras Theorem",
  chapterSlug: "pythagoras-theorem",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Pythagoras theorem",
      text: "In a right angled triangle, the square of the hypotenuse is equal to the sum of the squares of the remaining two sides.",
    },
    {
      term: "Converse of Pythagoras theorem",
      text: "In a triangle, if the square of one side is equal to the sum of the squares of the remaining two sides, then the triangle is a right angled triangle.",
    },
    {
      term: "Pythagorean triplet",
      text: "Three natural numbers where the square of the largest equals the sum of the squares of the other two, e.g. (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). The numbers can be written in any order.",
    },
    {
      term: "30°-60°-90° triangle",
      text: "The side opposite the 30° angle is half of the hypotenuse; the side opposite the 60° angle is \\(\\frac{\\sqrt{3}}{2}\\) times the hypotenuse.",
    },
    {
      term: "Converse of the 30°-60°-90° property",
      text: "In a right angled triangle, if one side is half of the hypotenuse, then the angle opposite to that side is 30°.",
    },
    {
      term: "45°-45°-90° triangle",
      text: "Each of the perpendicular sides is \\(\\frac{1}{\\sqrt{2}}\\) times the hypotenuse. So the hypotenuse is \\(\\sqrt{2}\\) times a side.",
    },
    {
      term: "Similarity and right angled triangle",
      text: "In a right angled triangle, if the altitude is drawn to the hypotenuse, then the two triangles formed are similar to the original triangle and to each other.",
    },
    {
      term: "Theorem of geometric mean",
      text: "In a right angled triangle, the perpendicular segment to the hypotenuse from the opposite vertex is the geometric mean of the segments into which the hypotenuse is divided.",
    },
    {
      term: "Side opposite an acute or obtuse angle",
      text: "With \\(AD \\perp BC\\): if \\(\\angle C\\) is acute, \\(AB^2 = BC^2 + AC^2 - 2BC \\cdot DC\\); if \\(\\angle C\\) is obtuse, \\(AB^2 = BC^2 + AC^2 + 2BC \\cdot CD\\).",
    },
    {
      term: "Apollonius theorem",
      text: "In \\(\\triangle ABC\\), if M is the midpoint of side BC, then \\(AB^2 + AC^2 = 2AM^2 + 2BM^2\\). It links the sides with a median.",
    },
  ],
  formulas: [
    { label: "Pythagoras theorem", latex: "AC^2 = AB^2 + BC^2 \\quad (\\angle B = 90^\\circ)" },
    { label: "Formula for Pythagorean triplets (a > b)", latex: "(a^2 + b^2,\\; a^2 - b^2,\\; 2ab)" },
    {
      label: "30-60-90 triangle, hypotenuse h",
      latex: "\\text{opp. } 30^\\circ = \\frac{h}{2} \\qquad \\text{opp. } 60^\\circ = \\frac{\\sqrt{3}}{2}h",
    },
    { label: "45-45-90 triangle, hypotenuse h", latex: "\\text{each side} = \\frac{h}{\\sqrt{2}}" },
    { label: "Diagonal of a square and of a rectangle", latex: "d = \\sqrt{2}\\,a \\qquad d = \\sqrt{l^2 + b^2}" },
    { label: "Height of an equilateral triangle", latex: "h = \\frac{\\sqrt{3}}{2}a" },
    { label: "Geometric mean (QS on hypotenuse PR)", latex: "QS^2 = PS \\times SR" },
    { label: "Apollonius theorem (M midpoint of BC)", latex: "AB^2 + AC^2 = 2AM^2 + 2BM^2" },
    { label: "Diagonals of a rhombus or parallelogram", latex: "AB^2 + BC^2 + CD^2 + DA^2 = AC^2 + BD^2" },
  ],
  derivations: [
    {
      title: "Prove Pythagoras theorem (using similar triangles)",
      steps: [
        "Given: \\(\\angle ABC = 90^\\circ\\). To prove: \\(AC^2 = AB^2 + BC^2\\). Construction: draw \\(BD \\perp AC\\), A-D-C.",
        "\\(\\triangle ABC \\sim \\triangle ADB \\sim \\triangle BDC\\) (similarity of right angled triangles).",
        "From \\(\\triangle ABC \\sim \\triangle ADB\\): \\(\\frac{AB}{AD} = \\frac{AC}{AB}\\), so \\(AB^2 = AD \\times AC\\) (I).",
        "From \\(\\triangle ABC \\sim \\triangle BDC\\): \\(\\frac{BC}{DC} = \\frac{AC}{BC}\\), so \\(BC^2 = DC \\times AC\\) (II).",
        "Add: \\(AB^2 + BC^2 = AC(AD + DC) = AC \\times AC = AC^2\\) (A-D-C).",
      ],
    },
    {
      title: "Prove the converse of Pythagoras theorem",
      steps: [
        "Given: \\(AC^2 = AB^2 + BC^2\\). To prove: \\(\\angle ABC = 90^\\circ\\).",
        "Construction: draw \\(\\triangle PQR\\) with \\(PQ = AB\\), \\(QR = BC\\), \\(\\angle PQR = 90^\\circ\\).",
        "\\(PR^2 = PQ^2 + QR^2 = AB^2 + BC^2 = AC^2\\), so \\(PR = AC\\).",
        "\\(\\triangle ABC \\cong \\triangle PQR\\) (SSS test), so \\(\\angle ABC = \\angle PQR = 90^\\circ\\).",
      ],
    },
    {
      title: "Prove the theorem of geometric mean",
      steps: [
        "In right angled \\(\\triangle PQR\\), \\(QS \\perp\\) hypotenuse PR.",
        "\\(\\triangle QSR \\sim \\triangle PSQ\\) (similarity of right angled triangles).",
        "So \\(\\frac{QS}{PS} = \\frac{SR}{QS}\\), which gives \\(QS^2 = PS \\times SR\\).",
      ],
    },
    {
      title: "Prove Apollonius theorem",
      steps: [
        "Given: M is the midpoint of BC. To prove: \\(AB^2 + AC^2 = 2AM^2 + 2BM^2\\). Construction: \\(AD \\perp BC\\).",
        "Take \\(\\angle AMB\\) obtuse, \\(\\angle AMC\\) acute. Obtuse case: \\(AB^2 = AM^2 + MB^2 + 2BM \\cdot MD\\) (I).",
        "Acute case: \\(AC^2 = AM^2 + MC^2 - 2MC \\cdot MD = AM^2 + MB^2 - 2BM \\cdot MD\\), as \\(BM = MC\\) (II).",
        "Add (I) and (II): \\(AB^2 + AC^2 = 2AM^2 + 2BM^2\\).",
      ],
    },
    {
      title: "Sum of the squares of the diagonals of a rhombus equals the sum of the squares of its sides",
      steps: [
        "Rhombus PQRS; diagonals PR and SQ meet at T. Diagonals of a rhombus bisect each other.",
        "Apollonius in \\(\\triangle PQS\\) and \\(\\triangle RQS\\): \\(PQ^2 + PS^2 = 2PT^2 + 2QT^2\\), \\(QR^2 + SR^2 = 2RT^2 + 2QT^2\\).",
        "Add, with \\(RT = PT\\): the sum \\(= 4PT^2 + 4QT^2 = (2PT)^2 + (2QT)^2 = PR^2 + QS^2\\).",
      ],
    },
    {
      title: "Prove: in a 45°-45°-90° triangle, each perpendicular side is 1/√2 times the hypotenuse",
      steps: [
        "Angles opposite the two perpendicular sides are equal (45° each), so the sides are equal: let each be \\(x\\), hypotenuse \\(h\\).",
        "Pythagoras: \\(h^2 = x^2 + x^2 = 2x^2\\).",
        "So \\(x = \\frac{h}{\\sqrt{2}}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Proof of Pythagoras theorem", labels: ["right angle at B", "BD perpendicular to AC", "A-D-C on the hypotenuse"] },
    { title: "Theorem of geometric mean", labels: ["right angle at Q", "QS perpendicular to PR", "segments PS and SR"] },
    { title: "Apollonius theorem", labels: ["M the midpoint of BC", "median AM", "AD perpendicular to BC", "obtuse angle AMB, acute angle AMC"] },
    { title: "30°-60°-90° triangle", labels: ["right angle", "30° and 60° marked", "hypotenuse", "side opposite 30° = half hypotenuse"] },
  ],
  mostAsked: [
    { topic: "Pythagoras theorem: find the hypotenuse, a side, or the diagonal of a square or rectangle", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2020, 2019] },
    { topic: "30°-60°-90° and 45°-45°-90° triangles: find a side, or the height of an equilateral triangle", marks: 1, years: [2026, 2024, 2023, 2022, 2018, 2017, 2016] },
    { topic: "Pythagorean triplet, or the converse: is the triangle right angled?", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2019] },
    { topic: "Apollonius theorem: find a median or a side; diagonals of a rhombus or parallelogram", marks: 3, years: [2026, 2025, 2024, 2023, 2020, 2019, 2016] },
    { topic: "Theorem of geometric mean: find the altitude on the hypotenuse", marks: 2, years: [2025, 2024, 2020, 2019] },
    { topic: "Pythagoras in a figure or word problem (rectangle and semicircle, garden pole, point on a side)", marks: 3, years: [2025, 2024] },
    { topic: "Prove Pythagoras theorem", years: [2025, 2018] },
  ],
  mistakes: [
    {
      title: "Squaring the wrong side",
      body: "The hypotenuse is opposite the right angle and is the longest side. Write it alone on one side: \\(\\text{hyp}^2 = \\text{side}^2 + \\text{side}^2\\).",
    },
    {
      title: "Mixing up the 30° and 60° sides",
      body: "Half the hypotenuse is opposite **30°** (the smaller angle, the smaller side). The side opposite 60° gets the \\(\\frac{\\sqrt{3}}{2}\\).",
    },
    {
      title: "Using BM = BC in Apollonius",
      body: "BM is **half** of BC. With \\(BC = 18\\), \\(BM = 9\\). Square it before doubling: \\(2BM^2 = 2 \\times 81\\).",
    },
    {
      title: "Checking a triplet against any side",
      body: "Square the **largest** number and compare with the sum of the squares of the other two. (5, 5, 2) is not a triplet.",
    },
    {
      title: "Leaving out the reason",
      body: "Write (Pythagoras theorem), (theorem of geometric mean) or (Apollonius theorem) on the line you use it. Activity answers lose a mark without it.",
    },
  ],
};

export default sheet;
