import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 6 Triangles. Statements checked against the NCERT
 * Class 10 text (rationalised); formulas rebuilt; most-asked years and marks
 * from the CBSE board past-paper questions in the bank, 2023-2026. The ratio
 * of areas of similar triangles is no longer in the rationalised book but was
 * set in 2025 and 2026, so it stays as a standard result.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Triangles",
  chapterSlug: "triangles",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 6",
  keyPoints: [
    {
      term: "Similar figures",
      text: "Two figures having the same shape but not necessarily the same size are called similar figures. All circles, all squares and all equilateral triangles are similar.",
    },
    {
      term: "Congruent and similar",
      text: "All congruent figures are similar, but the converse is not true. Two right triangles, or a square and a rhombus, need not be similar.",
    },
    {
      term: "Similar polygons",
      text: "Two polygons with the same number of sides are similar if (i) their corresponding angles are equal and (ii) their corresponding sides are in the same ratio. Both are needed.",
    },
    {
      term: "Basic Proportionality Theorem",
      text: "If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, then the other two sides are divided in the same ratio.",
    },
    {
      term: "Converse of BPT",
      text: "If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side.",
    },
    {
      term: "AAA and AA criteria",
      text: "If corresponding angles of two triangles are equal, the triangles are similar (AAA). Two pairs of equal angles are enough, since the third pair is then equal too (AA).",
    },
    {
      term: "SSS criterion",
      text: "If in two triangles corresponding sides are in the same ratio, then their corresponding angles are equal and the triangles are similar.",
    },
    {
      term: "SAS criterion",
      text: "If one angle of a triangle equals one angle of another and the sides **including these angles** are in the same ratio, the triangles are similar.",
    },
    {
      term: "Scale factor",
      text: "The common ratio of corresponding sides is the scale factor. In similar triangles, corresponding medians, altitudes, angle bisectors and perimeters are all in this same ratio.",
    },
    {
      term: "Order of vertices",
      text: "\\(\\Delta ABC \\sim \\Delta PQR\\) means \\(A \\leftrightarrow P\\), \\(B \\leftrightarrow Q\\), \\(C \\leftrightarrow R\\). So \\(\\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{CA}{RP}\\). Write the vertices in matching order.",
    },
  ],
  formulas: [
    { label: "BPT", latex: "DE \\parallel BC \\;\\Rightarrow\\; \\frac{AD}{DB} = \\frac{AE}{EC}" },
    { label: "BPT, other forms", latex: "\\frac{AD}{AB} = \\frac{AE}{AC}, \\qquad \\frac{AD}{AB} = \\frac{DE}{BC}" },
    { label: "Similar triangles", latex: "\\Delta ABC \\sim \\Delta PQR \\Rightarrow \\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{CA}{RP}" },
    { label: "Ratio of perimeters", latex: "\\frac{\\text{perimeter of } \\Delta ABC}{\\text{perimeter of } \\Delta PQR} = \\frac{AB}{PQ}" },
    { label: "Ratio of areas (standard result)", latex: "\\frac{\\text{ar}(\\Delta ABC)}{\\text{ar}(\\Delta PQR)} = \\left(\\frac{AB}{PQ}\\right)^2 = \\left(\\frac{AD}{PS}\\right)^2" },
    { label: "Perpendicular from the right angle", latex: "\\angle BAC = 90^\\circ,\\ AD \\perp BC \\Rightarrow AD^2 = BD \\times DC" },
    { label: "Shadow problems", latex: "\\frac{\\text{height of object}}{\\text{its shadow}} = \\frac{\\text{height of pole}}{\\text{its shadow}}" },
  ],
  derivations: [
    {
      title: "Basic Proportionality Theorem: if \\(DE \\parallel BC\\) in \\(\\Delta ABC\\), prove \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\)",
      steps: [
        "Given: \\(\\Delta ABC\\), \\(DE \\parallel BC\\) meeting AB at D and AC at E. Construction: join BE and CD; draw \\(DM \\perp AC\\) and \\(EN \\perp AB\\).",
        "\\(\\text{ar}(ADE) = \\frac{1}{2} AD \\times EN\\) and \\(\\text{ar}(BDE) = \\frac{1}{2} DB \\times EN\\), so \\(\\frac{\\text{ar}(ADE)}{\\text{ar}(BDE)} = \\frac{AD}{DB}\\).",
        "Similarly \\(\\text{ar}(ADE) = \\frac{1}{2} AE \\times DM\\), \\(\\text{ar}(DEC) = \\frac{1}{2} EC \\times DM\\), so \\(\\frac{\\text{ar}(ADE)}{\\text{ar}(DEC)} = \\frac{AE}{EC}\\).",
        "\\(\\Delta BDE\\) and \\(\\Delta DEC\\) are on the same base DE and between the same parallels BC and DE, so \\(\\text{ar}(BDE) = \\text{ar}(DEC)\\).",
        "Hence \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\).",
      ],
    },
    {
      title: "Sides AB, BC and median AD of \\(\\Delta ABC\\) are proportional to PQ, QR and median PM of \\(\\Delta PQR\\). Prove \\(\\Delta ABC \\sim \\Delta PQR\\)",
      steps: [
        "Given \\(\\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{AD}{PM}\\). As D, M are mid-points, \\(BD = \\frac{1}{2}BC\\), \\(QM = \\frac{1}{2}QR\\).",
        "So \\(\\frac{AB}{PQ} = \\frac{BD}{QM} = \\frac{AD}{PM}\\), and \\(\\Delta ABD \\sim \\Delta PQM\\) (SSS).",
        "Hence \\(\\angle B = \\angle Q\\).",
        "In \\(\\Delta ABC\\) and \\(\\Delta PQR\\): \\(\\frac{AB}{PQ} = \\frac{BC}{QR}\\) and \\(\\angle B = \\angle Q\\), so \\(\\Delta ABC \\sim \\Delta PQR\\) (SAS).",
      ],
    },
    {
      title: "In \\(\\Delta ABC\\), \\(AD \\perp BC\\) and \\(AD^2 = BD \\times DC\\). Prove \\(\\angle BAC = 90^\\circ\\)",
      steps: [
        "\\(AD^2 = BD \\times DC\\) gives \\(\\frac{AD}{BD} = \\frac{DC}{AD}\\), and \\(\\angle ADB = \\angle CDA = 90^\\circ\\).",
        "So \\(\\Delta ADB \\sim \\Delta CDA\\) (SAS). Hence \\(\\angle BAD = \\angle ACD\\) and \\(\\angle ABD = \\angle CAD\\).",
        "\\(\\angle BAC = \\angle BAD + \\angle CAD = \\angle C + \\angle B\\).",
        "Angle sum in \\(\\Delta ABC\\): \\(\\angle A + \\angle B + \\angle C = 180^\\circ\\), so \\(2\\angle BAC = 180^\\circ\\), \\(\\angle BAC = 90^\\circ\\).",
      ],
    },
    {
      title: "PA, QB, RC are perpendicular to AC, with PA = x, QB = y, RC = z. Prove \\(\\frac{1}{x} + \\frac{1}{z} = \\frac{1}{y}\\)",
      steps: [
        "\\(\\Delta CBQ \\sim \\Delta CAP\\) (AA, \\(QB \\parallel PA\\)): \\(\\frac{y}{x} = \\frac{BC}{AC}\\).",
        "\\(\\Delta ABQ \\sim \\Delta ACR\\) (AA, \\(QB \\parallel RC\\)): \\(\\frac{y}{z} = \\frac{AB}{AC}\\).",
        "Add: \\(\\frac{y}{x} + \\frac{y}{z} = \\frac{AB + BC}{AC} = 1\\).",
        "Divide by \\(y\\): \\(\\frac{1}{x} + \\frac{1}{z} = \\frac{1}{y}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Figure for the proof of BPT",
      labels: ["Triangle ABC", "D on AB, E on AC, DE parallel to BC", "BE and CD joined", "DM perpendicular to AC", "EN perpendicular to AB"],
    },
  ],
  mostAsked: [
    { topic: "Prove two triangles similar (AA, SAS, SSS) and deduce a product of sides, such as \\(CA^2 = CB \\times CD\\)", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Use BPT or its converse: \\(DE \\parallel BC\\), find a length or x; trapezium diagonals", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Similar triangles: corresponding sides and angles, ratio of perimeters or areas, which figures are always similar", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Medians, altitudes or angle bisectors of similar triangles; sides and median proportional, prove similar", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "State and prove the Basic Proportionality Theorem, then use it", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "Parallelogram or trapezium: a line through a mid-point or a produced side, prove triangles similar and find a ratio", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "Lamp post and shadow: height or speed by similar triangles", years: [2026, 2025, 2024] },
  ],
  mistakes: [
    {
      title: "Matching the wrong sides",
      body: "Write the similarity with vertices in matching order (equal angles at matching positions) before writing ratios. \\(\\Delta ABC \\sim \\Delta QRP\\) gives \\(\\frac{AB}{QR} = \\frac{BC}{RP}\\).",
    },
    {
      title: "Using DB instead of AB",
      body: "\\(\\frac{AD}{DB} = \\frac{AE}{EC}\\), but for DE and BC use the whole sides: \\(\\frac{DE}{BC} = \\frac{AD}{AB}\\), not \\(\\frac{AD}{DB}\\).",
    },
    {
      title: "Not stating the criterion",
      body: "End each similarity step with the reason in brackets: (AA), (SAS) or (SSS). For SAS, the equal angle must lie **between** the two proportional sides.",
    },
    {
      title: "Ratio of areas taken as ratio of sides",
      body: "Areas of similar triangles are in the ratio of the **squares** of corresponding sides. Sides 3 : 5 give areas 9 : 25. Perimeters stay 3 : 5.",
    },
    {
      title: "Skipping the construction in the BPT proof",
      body: "Write Given, To prove, Construction (join BE, CD; draw \\(DM \\perp AC\\), \\(EN \\perp AB\\)) and a labelled figure. Each carries marks.",
    },
  ],
};

export default sheet;
