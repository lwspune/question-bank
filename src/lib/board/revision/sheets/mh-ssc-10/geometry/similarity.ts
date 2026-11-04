import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 1 Similarity. Theorem wordings are the Balbharati
 * book's own; formulas rebuilt (the book text loses its notation). Most-asked
 * from the SSC board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Similarity",
  chapterSlug: "similarity",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Ratio of areas of two triangles",
      text: "The ratio of the areas of two triangles is equal to the ratio of the products of their bases and corresponding heights.",
    },
    {
      term: "Equal heights",
      text: "The ratio of the areas of two triangles with equal heights is equal to the ratio of their corresponding bases.",
    },
    {
      term: "Equal bases",
      text: "The ratio of the areas of two triangles with equal bases is equal to the ratio of their corresponding heights.",
    },
    {
      term: "Basic proportionality theorem",
      text: "If a line parallel to a side of a triangle intersects the remaining sides in two distinct points, then the line divides the sides in the same proportion.",
    },
    {
      term: "Converse of basic proportionality theorem",
      text: "If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side.",
    },
    {
      term: "Angle bisector theorem",
      text: "The bisector of an angle of a triangle divides the side opposite to the angle in the ratio of the remaining sides.",
    },
    {
      term: "Three parallel lines and transversals",
      text: "The ratio of the intercepts made on a transversal by three parallel lines is equal to the ratio of the corresponding intercepts made on any other transversal by the same parallel lines.",
    },
    {
      term: "Similar triangles",
      text: "Corresponding angles are congruent and corresponding sides are in the same proportion. Write it as \\(\\triangle ABC \\sim \\triangle DEF\\), in the order of the correspondence.",
    },
    {
      term: "AA test",
      text: "When two angles of one triangle are congruent to two corresponding angles of another triangle, the two triangles are similar.",
    },
    {
      term: "SAS test",
      text: "If two pairs of corresponding sides are in the same proportion and the angles between them are congruent, then the two triangles are similar.",
    },
    {
      term: "SSS test",
      text: "When three sides of a triangle are in proportion to the corresponding three sides of another triangle, the two triangles are similar.",
    },
    {
      term: "Theorem of areas of similar triangles",
      text: "When two triangles are similar, the ratio of their areas is equal to the ratio of the squares of their corresponding sides.",
    },
  ],
  formulas: [
    { label: "Ratio of areas of two triangles", latex: "\\frac{A(\\triangle ABC)}{A(\\triangle PQR)} = \\frac{BC \\times AD}{QR \\times PS}" },
    { label: "Equal heights, or equal bases", latex: "\\frac{A_1}{A_2} = \\frac{b_1}{b_2} \\qquad \\frac{A_1}{A_2} = \\frac{h_1}{h_2}" },
    {
      label: "Basic proportionality theorem",
      latex: "PQ \\parallel BC \\Rightarrow \\frac{AP}{PB} = \\frac{AQ}{QC} \\qquad \\frac{AP}{AB} = \\frac{AQ}{AC}",
    },
    { label: "Angle bisector theorem (BD bisects angle B)", latex: "\\frac{AB}{BC} = \\frac{AD}{DC}" },
    { label: "Three parallel lines, two transversals", latex: "\\frac{AB}{BC} = \\frac{PQ}{QR}" },
    {
      label: "Similar triangles",
      latex: "\\triangle ABC \\sim \\triangle PQR \\Rightarrow \\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{AC}{PR}",
    },
    {
      label: "Areas of similar triangles",
      latex: "\\frac{A(\\triangle ABC)}{A(\\triangle PQR)} = \\frac{AB^2}{PQ^2} = \\frac{BC^2}{QR^2} = \\frac{AC^2}{PR^2}",
    },
  ],
  derivations: [
    {
      title: "Prove the basic proportionality theorem",
      steps: [
        "Given: in \\(\\triangle ABC\\), line \\(l \\parallel BC\\) cuts AB at P and AC at Q. To prove: \\(\\frac{AP}{PB} = \\frac{AQ}{QC}\\).",
        "Construction: draw seg PC and seg BQ.",
        "\\(\\triangle APQ\\) and \\(\\triangle PQB\\) have equal heights, so \\(\\frac{A(\\triangle APQ)}{A(\\triangle PQB)} = \\frac{AP}{PB}\\) (I). Similarly \\(\\frac{A(\\triangle APQ)}{A(\\triangle PQC)} = \\frac{AQ}{QC}\\) (II).",
        "\\(\\triangle PQB\\) and \\(\\triangle PQC\\) have the common base PQ and \\(PQ \\parallel BC\\), so equal heights: \\(A(\\triangle PQB) = A(\\triangle PQC)\\) (III).",
        "From (I), (II) and (III): \\(\\frac{AP}{PB} = \\frac{AQ}{QC}\\).",
      ],
    },
    {
      title: "Prove the angle bisector theorem",
      steps: [
        "Given: in \\(\\triangle ABC\\), the bisector of \\(\\angle C\\) meets AB at E. To prove: \\(\\frac{AE}{EB} = \\frac{CA}{CB}\\).",
        "Construction: through B draw a line parallel to ray CE; extend AC to meet it at D.",
        "\\(\\angle ACE = \\angle CDB\\) (corresponding angles) and \\(\\angle ECB = \\angle CBD\\) (alternate angles). As \\(\\angle ACE = \\angle ECB\\), \\(\\angle CBD = \\angle CDB\\).",
        "So in \\(\\triangle CBD\\), \\(CB = CD\\) (sides opposite congruent angles).",
        "In \\(\\triangle ABD\\), \\(EC \\parallel BD\\), so \\(\\frac{AE}{EB} = \\frac{AC}{CD}\\) (BPT). Put \\(CD = CB\\): \\(\\frac{AE}{EB} = \\frac{AC}{CB}\\).",
      ],
    },
    {
      title: "Prove the property of three parallel lines and their transversals",
      steps: [
        "Given: \\(l \\parallel m \\parallel n\\); transversal \\(t_1\\) cuts them at A, B, C and \\(t_2\\) at P, Q, R. To prove: \\(\\frac{AB}{BC} = \\frac{PQ}{QR}\\).",
        "Draw seg PC; it meets line m at D.",
        "In \\(\\triangle ACP\\), \\(BD \\parallel AP\\), so \\(\\frac{AB}{BC} = \\frac{PD}{DC}\\) (BPT).",
        "In \\(\\triangle CPR\\), \\(DQ \\parallel CR\\), so \\(\\frac{PD}{DC} = \\frac{PQ}{QR}\\) (BPT). Hence \\(\\frac{AB}{BC} = \\frac{PQ}{QR}\\).",
      ],
    },
    {
      title: "Prove the theorem of areas of similar triangles",
      steps: [
        "Given: \\(\\triangle ABC \\sim \\triangle PQR\\), \\(AD \\perp BC\\), \\(PS \\perp QR\\). To prove: \\(\\frac{A(\\triangle ABC)}{A(\\triangle PQR)} = \\frac{AB^2}{PQ^2}\\).",
        "\\(\\frac{A(\\triangle ABC)}{A(\\triangle PQR)} = \\frac{BC \\times AD}{QR \\times PS}\\) (I).",
        "In \\(\\triangle ABD\\) and \\(\\triangle PQS\\): \\(\\angle B = \\angle Q\\), \\(\\angle ADB = \\angle PSQ = 90^\\circ\\), so they are similar (AA). Hence \\(\\frac{AD}{PS} = \\frac{AB}{PQ}\\) (II).",
        "As \\(\\triangle ABC \\sim \\triangle PQR\\), \\(\\frac{AB}{PQ} = \\frac{BC}{QR}\\) (III).",
        "From (I), (II), (III): the ratio of areas \\(= \\frac{AB}{PQ} \\times \\frac{AB}{PQ} = \\frac{AB^2}{PQ^2}\\), and likewise for the other sides.",
      ],
    },
    {
      title: "Line l cuts AB at P and AC at Q: show that A(APQ) : A(ABC) = AP × AQ : AB × AC",
      steps: [
        "Join PC.",
        "\\(\\triangle APQ\\) and \\(\\triangle APC\\) have the same height from P, so \\(\\frac{A(\\triangle APQ)}{A(\\triangle APC)} = \\frac{AQ}{AC}\\).",
        "\\(\\triangle APC\\) and \\(\\triangle ABC\\) have the same height from C, so \\(\\frac{A(\\triangle APC)}{A(\\triangle ABC)} = \\frac{AP}{AB}\\).",
        "Multiply: \\(\\frac{A(\\triangle APQ)}{A(\\triangle ABC)} = \\frac{AP \\times AQ}{AB \\times AC}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Basic proportionality theorem", labels: ["triangle ABC", "line l parallel to BC", "P on AB, Q on AC", "seg PC and seg BQ"] },
    { title: "Angle bisector theorem", labels: ["bisector CE of angle C", "E on side AB", "line through B parallel to CE", "AC extended to meet it at D"] },
    { title: "Three parallel lines and transversals", labels: ["parallel lines l, m, n", "transversals t1 and t2", "A, B, C and P, Q, R", "seg PC meeting m at D"] },
    { title: "Areas of similar triangles", labels: ["triangles ABC and PQR", "heights AD and PS", "right angles at D and S"] },
  ],
  mostAsked: [
    { topic: "Areas of similar triangles: ratio of areas is the ratio of squares of corresponding sides", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2019, 2018, 2016] },
    { topic: "Angle bisector theorem: find a side, or complete the proof activity", marks: 2, years: [2026, 2025, 2024, 2023, 2019, 2017, 2016] },
    { topic: "Basic proportionality theorem: prove it, or find a side when a line is parallel to a side", marks: 3, years: [2026, 2025, 2024, 2022, 2020] },
    { topic: "Ratio of areas of two triangles with equal heights or equal bases", marks: 1, years: [2026, 2025, 2018, 2017] },
    { topic: "Prove two triangles similar (AA, SAS, SSS test) and use the similarity", marks: 4, years: [2025, 2024, 2022] },
    { topic: "Corresponding angle of similar triangles", marks: 1, years: [2025, 2024, 2022, 2019] },
    { topic: "A line parallel to a side divides the triangle into two parts: equal or given areas", marks: 4, years: [2026, 2023, 2020] },
    { topic: "Three parallel lines and their transversals: find an intercept", years: [2024, 2023] },
  ],
  mistakes: [
    {
      title: "Using the side ratio as the area ratio",
      body: "For similar triangles, the areas are in the ratio of the **squares** of the sides. Sides 3 : 5 give areas 9 : 25. Going back, take the square root.",
    },
    {
      title: "Mixing part and whole in BPT",
      body: "\\(\\frac{AP}{PB} = \\frac{AQ}{QC}\\) uses parts; \\(\\frac{AP}{AB} = \\frac{AQ}{AC}\\) uses part over whole. Do not mix a part with a whole in one equation.",
    },
    {
      title: "Wrong sides in the angle bisector theorem",
      body: "The two parts of the opposite side are in the ratio of the two sides that form the bisected angle: if BD bisects \\(\\angle B\\), \\(\\frac{AD}{DC} = \\frac{AB}{BC}\\).",
    },
    {
      title: "Writing the vertices in the wrong order",
      body: "\\(\\triangle ABC \\sim \\triangle PQR\\) means A matches P, B matches Q, C matches R. Read corresponding sides and angles from this order only.",
    },
    {
      title: "Skipping reasons in a proof",
      body: "Write the reason in brackets on every line: (BPT), (AA test), (alternate angles), (given). Activity questions give marks for each filled reason.",
    },
  ],
};

export default sheet;
