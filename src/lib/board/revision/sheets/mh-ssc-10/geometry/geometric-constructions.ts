import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 4 Geometric Constructions. Construction steps follow
 * the Balbharati book's own; the "derivations" here are the constructions the
 * board asks, step by step. Most-asked from the SSC board past papers in the
 * bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Geometric Constructions",
  chapterSlug: "geometric-constructions",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Idea behind a similar triangle",
      text: "The corresponding sides of similar triangles are in the same proportion and the corresponding angles are equal. Use the given ratio to find the new sides, or a parallel line (BPT) when a vertex is common.",
    },
    {
      term: "Which triangle is bigger",
      text: "In \\(\\frac{AB}{PQ} = \\frac{3}{2}\\), the first triangle is bigger. In \\(\\frac{AB}{A'B} = \\frac{5}{7}\\), the new triangle is bigger: mark 7 parts on ray BC, extended past C.",
    },
    {
      term: "Rough figure and analysis",
      text: "Draw a rough figure first, mark the given measures and the ratio, and work out the new sides before you construct.",
    },
    {
      term: "Dividing a segment into equal parts",
      text: "Draw a ray from B on the side away from A, mark equal parts \\(T_1, T_2, \\ldots\\), join the last point to C, and draw lines parallel to it through the other points.",
    },
    {
      term: "Tangent at a point, using the centre",
      text: "A line perpendicular to the radius at its outer end is a tangent to the circle. Draw ray CP and a perpendicular to it at P.",
    },
    {
      term: "Tangent at a point, without the centre",
      text: "Uses the tangent secant angle theorem: draw chord CB and an inscribed angle CAB, then copy angle CAB at C on chord CB. The new arm is the tangent.",
    },
    {
      term: "Tangents from an external point",
      text: "Join OP and bisect it at M. The circle on OP as diameter cuts the given circle at A and B, because an angle inscribed in a semicircle is a right angle. PA and PB are the tangents.",
    },
    {
      term: "Number of tangents",
      text: "Only one tangent can be drawn at a point on a circle. At most two tangents can be drawn from a point outside it, and the two tangent segments are equal.",
    },
    {
      term: "Tangents at the ends of a diameter",
      text: "If the chord is a diameter (chord 6.6 cm, radius 3.3 cm), the tangents at its ends are **parallel** to each other. Write this as your observation.",
    },
  ],
  formulas: [
    { label: "New sides from the ratio of similarity", latex: "\\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{AC}{PR} = \\frac{3}{2} \\Rightarrow PQ = \\frac{2}{3}AB" },
    { label: "Angle between two tangents and the radii", latex: "\\angle AOB = 180^\\circ - \\angle APB" },
    { label: "Length of a tangent from P", latex: "PA = \\sqrt{OP^2 - r^2}" },
  ],
  derivations: [
    {
      title: "Construct a triangle similar to a given triangle (no common vertex), e.g. AB : PQ = 3 : 2",
      steps: [
        "Rough figure with all given measures and the ratio.",
        "From the ratio, find each side of the new triangle: \\(PQ = \\frac{2}{3}AB\\), and so on.",
        "Construct the given triangle, then the new one from its three sides (or two sides and the included angle).",
        "Write all lengths on the figure and name both triangles.",
      ],
    },
    {
      title: "Construct a triangle similar to ABC with a common vertex B, e.g. AB : A′B = 5 : 3",
      steps: [
        "Rough figure: B, A, A′ collinear and B, C, C′ collinear; \\(\\angle B\\) is common.",
        "Construct \\(\\triangle ABC\\). Divide seg BC into 5 equal parts (a ray from B with \\(T_1\\) to \\(T_5\\), join \\(T_5C\\), draw parallels).",
        "Mark C′ at the end of the 3rd part from B (for 5 : 7, mark the 7th part on ray BC, beyond C).",
        "Through C′ draw a line parallel to AC, meeting ray BA at A′. \\(\\triangle A'BC'\\) is the required triangle.",
      ],
    },
    {
      title: "Construct a tangent at a point P on a circle using the centre",
      steps: [
        "Draw the circle with centre C and take point P on it.",
        "Draw ray CP.",
        "Draw line \\(l\\) perpendicular to ray CP through P. Line \\(l\\) is the tangent.",
      ],
    },
    {
      title: "Construct a tangent at a point C on a circle without using the centre",
      steps: [
        "Take point C on the circle. Draw chord CB and an inscribed angle CAB.",
        "With centre A and a convenient radius, draw an arc cutting the arms of \\(\\angle BAC\\) at M and N.",
        "With the same radius and centre C, draw an arc cutting chord CB at R.",
        "With radius MN and centre R, cut the last arc at D. Line CD is the tangent.",
      ],
    },
    {
      title: "Construct tangents to a circle from a point P outside it",
      steps: [
        "Draw the circle with centre O and the given radius; mark P at the given distance from O.",
        "Draw seg OP and its perpendicular bisector to get the midpoint M.",
        "With centre M and radius OM, draw a circle; name the points where it cuts the given circle A and B.",
        "Draw lines PA and PB: these are the required tangents.",
      ],
    },
    {
      title: "Draw tangent segments PA and PB so that ∠APB has a given measure (e.g. 70°)",
      steps: [
        "In \\(\\square OAPB\\), \\(\\angle OAP = \\angle OBP = 90^\\circ\\), so \\(\\angle AOB = 180^\\circ - 70^\\circ = 110^\\circ\\).",
        "Draw the circle; draw radii OA and OB with \\(\\angle AOB = 110^\\circ\\).",
        "Draw perpendiculars to OA at A and to OB at B; they meet at P. PA and PB are the tangent segments.",
      ],
    },
  ],
  diagrams: [
    { title: "Similar triangle with a common vertex", labels: ["triangle ABC", "points T1 to T5 on a ray from B", "C′ on BC", "line through C′ parallel to AC", "A′ on ray BA"] },
    { title: "Tangents from an external point", labels: ["centre O and point P", "midpoint M of OP", "circle with centre M, radius OM", "points of contact A and B", "tangents PA and PB"] },
    { title: "Tangent without using the centre", labels: ["point C on the circle", "chord CB", "inscribed angle CAB", "arcs at M, N and R, D", "tangent CD"] },
  ],
  mostAsked: [
    { topic: "Construct a triangle similar to a given triangle, with the ratio of corresponding sides", marks: 4, years: [2026, 2025, 2024, 2023, 2022, 2018, 2016] },
    { topic: "Construct tangents to a circle from a point outside it", marks: 3, years: [2026, 2025, 2024, 2022, 2020, 2019, 2018, 2017] },
    { topic: "Draw a chord and construct tangents at its ends (with or without the centre)", marks: 3, years: [2026, 2025, 2023, 2020] },
    { topic: "Construct a tangent at a point on a circle (with or without the centre)", marks: 2, years: [2022, 2019, 2016] },
  ],
  mistakes: [
    {
      title: "Reading the ratio the wrong way",
      body: "\\(\\frac{AB}{PQ} = \\frac{3}{2}\\) means PQ is the smaller side: \\(PQ = \\frac{2}{3}AB\\). Check which triangle should come out bigger before you draw.",
    },
    {
      title: "No rough figure",
      body: "Examiners give marks for the rough figure with its measures. Draw it first, beside the construction.",
    },
    {
      title: "Rubbing out construction arcs",
      body: "Keep every arc and the perpendicular bisector of OP. They are the proof that you constructed it, not just drew it.",
    },
    {
      title: "Missing the observation",
      body: "When the chord equals the diameter, write: the tangents at P and Q are parallel. When you are asked to measure a tangent, write its length.",
    },
  ],
};

export default sheet;
