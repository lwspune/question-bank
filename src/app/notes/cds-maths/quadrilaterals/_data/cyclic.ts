import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QU_CYCLIC_NOTE: SubtopicNote = {
  subtopicName: "Cyclic Quadrilaterals",
  title: "Cyclic Quadrilaterals",
  oneLineDefinition:
    "A quadrilateral whose vertices lie on one circle; its opposite angles add to 180°, and that rule decides which familiar shapes can be cyclic.",
  whyItMatters:
    "Thirteen PYQs, three of them HARD. Most are statement items built on one rule — opposite angles supplementary — applied to parallelograms, trapeziums and angle bisectors. Three use the similar triangles a cyclic quadrilateral makes, across its diagonals or its produced sides.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqu-cyclic-angles",
      name: "Opposite angles and which shapes are cyclic",
      intuition:
        "Opposite vertices look at the same diagonal from the two arcs of the circle, and those two viewing angles always add to \\(180^\\circ\\). Any shape whose opposite angles cannot add to \\(180^\\circ\\) cannot be cyclic.",
      definition:
        "- Cyclic \\(\\iff\\) a pair of opposite angles is supplementary. An exterior angle equals the interior opposite angle.\n" +
        "- A cyclic parallelogram is a rectangle; a cyclic trapezium is isosceles; an isosceles trapezium is always cyclic.\n" +
        "- Midpoints of a rhombus's sides form a rectangle, so they are always concyclic.\n" +
        "- If diagonal \\(AC\\) bisects \\(\\angle C\\), the arcs \\(AB\\) and \\(AD\\) are equal, so \\(AB = AD\\).\n" +
        "- Four sides given in order fix a cyclic quadrilateral, and a right angle makes the opposite diagonal a diameter.",
      formula: {
        label: "Opposite angles",
        latex: "\\angle A + \\angle C = \\angle B + \\angle D = 180^\\circ",
      },
      authoredExample: {
        prompt: "In cyclic \\(ABCD\\), \\(\\angle A = (3x + 10)^\\circ\\) and \\(\\angle C = (2x + 20)^\\circ\\). Find \\(\\angle A\\).",
        steps: ["\\(5x + 30 = 180\\), so \\(x = 30\\)."],
        answer: "\\(100^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "Can a parallelogram with an angle of \\(80^\\circ\\) be cyclic?",
        steps: ["Its opposite angles are both \\(80^\\circ\\), which add to \\(160^\\circ\\)."],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "Cyclic, \\(\\angle B = 65^\\circ\\). \\(\\angle D\\)?", answer: "\\(115^\\circ\\)" },
        { prompt: "\\(\\sin\\dfrac{A + C}{2}\\) for a cyclic quadrilateral?", answer: "\\(1\\)" },
        { prompt: "A cyclic parallelogram is a …?", answer: "Rectangle" },
        { prompt: "Cyclic with \\(\\angle B = 90^\\circ\\). \\(AC\\) is a …?", answer: "Diameter" },
      ],
      pyqExampleId: "3ff6bd07-fb9f-441a-a998-238bf1a8b2f3", // 2026 (II) — angles in x and y, find angle A + angle B
      traps: [
        {
          title: "OPPOSITE angles, not adjacent ones",
          body:
            "\\(\\angle A + \\angle C\\) and \\(\\angle B + \\angle D\\) are \\(180^\\circ\\). \\(\\angle A + \\angle B\\) is not, unless the figure also has parallel sides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqu-cyclic-similar",
      name: "Similar triangles in a cyclic quadrilateral",
      intuition:
        "Angles in the same segment are equal, so the diagonals cut the figure into two pairs of similar triangles. Produce two sides to meet and the exterior-angle rule makes two more similar triangles.",
      definition:
        "- Diagonals meeting at \\(P\\): \\(\\triangle APB \\sim \\triangle DPC\\), so \\(\\dfrac{[APB]}{[DPC]} = \\dfrac{AB^2}{DC^2}\\) and \\(PA \\cdot PC = PB \\cdot PD\\).\n" +
        "- \\(AB\\) and \\(DC\\) produced to meet at \\(E\\): \\(\\triangle EBC \\sim \\triangle EDA\\), with \\(B\\) matching \\(D\\) and \\(C\\) matching \\(A\\).\n" +
        "- Match vertices by EQUAL ANGLES, not by the order the letters happen to be written.",
      formula: {
        label: "Across the diagonals",
        latex: "\\dfrac{[APB]}{[DPC]} = \\left(\\dfrac{AB}{DC}\\right)^2",
      },
      authoredExample: {
        prompt: "The diagonals of cyclic \\(ABCD\\) meet at \\(P\\). \\(AB = 9\\), \\(DC = 6\\) and \\([APB] = 27\\) cm\\(^2\\). Find \\([DPC]\\).",
        steps: ["\\(\\triangle APB \\sim \\triangle DPC\\) in the ratio \\(9 : 6 = 3 : 2\\).", "\\(27 \\times \\dfrac49\\)."],
        answer: "\\(12\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Sides \\(AB\\) and \\(DC\\) of cyclic \\(ABCD\\) meet, produced, at \\(E\\). \\(EB = 4\\), \\(EA = 10\\), \\(EC = 5\\). Find \\(ED\\).",
        steps: ["\\(\\triangle EBC \\sim \\triangle EDA\\): \\(\\dfrac{EB}{ED} = \\dfrac{EC}{EA}\\).", "\\(EB \\cdot EA = EC \\cdot ED\\)."],
        answer: "\\(8\\).",
      },
      practiceSet: [
        { prompt: "\\(AB : DC = 2 : 1\\). \\([APB] : [DPC]\\)?", answer: "\\(4 : 1\\)" },
        { prompt: "\\(PA = 3\\), \\(PC = 8\\), \\(PB = 4\\). \\(PD\\)?", answer: "\\(6\\)" },
        { prompt: "In \\(\\triangle EBC \\sim \\triangle EDA\\), \\(B\\) matches …?", answer: "\\(D\\)" },
        { prompt: "\\(EB \\cdot EA = 24\\), \\(EC = 3\\). \\(ED\\)?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "99d6e4a6-53cd-4d40-aa89-35a17d126a52", // 2017 (II) — area APB 24 cm², AB = 8, CD = 5
      traps: [
        {
          title: "The vertex order in a similarity statement",
          body:
            "\\(\\triangle EBC\\) is similar to \\(\\triangle EDA\\), not to \\(\\triangle EAD\\), because \\(B\\) matches \\(D\\). Papers have written the pair in a different order; decide whether a statement means 'these triangles are similar' or 'in this correspondence' before marking it.",
        },
      ],
    },
  ],
};
