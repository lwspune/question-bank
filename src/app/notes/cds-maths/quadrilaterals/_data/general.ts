import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QU_GENERAL_NOTE: SubtopicNote = {
  subtopicName: "General Quadrilaterals and their Diagonals",
  title: "Any Quadrilateral: Diagonals, Triangles and Areas",
  oneLineDefinition:
    "A diagonal splits any quadrilateral into two triangles, so triangle rules — the triangle inequality, Pythagoras, area on a common base — answer most questions.",
  whyItMatters:
    "Eleven PYQs, four of them HARD. None needs a special shape: draw a diagonal and work with the two triangles. Bounding a diagonal is the triangle inequality twice; area questions compare triangles that share the diagonal as a base.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqu-diagonal-bounds",
      name: "Lengths through a diagonal",
      intuition:
        "A diagonal is a side of two triangles at once. Each triangle limits it, so its possible lengths are the overlap of two ranges. A right angle on each side makes a chain of Pythagorean triples.",
      definition:
        "- Sides \\(a, b\\) around a diagonal \\(x\\): \\(|a - b| < x < a + b\\). Apply it in BOTH triangles and intersect the ranges.\n" +
        "- The perimeter always exceeds the sum of the diagonals.\n" +
        "- Right angles at \\(B\\) and at \\(C\\) (in \\(\\angle ACD\\)): \\(AB^2 + BC^2 = AC^2\\) and \\(AC^2 + CD^2 = AD^2\\), two triples sharing \\(AC\\).\n" +
        "- A rectangle's diagonals are equal and bisect each other.",
      formula: {
        label: "Range of a diagonal",
        latex: "|a - b| < x < a + b",
      },
      authoredExample: {
        prompt: "In \\(ABCD\\), \\(AB = 5\\), \\(BC = 14\\), \\(CD = 8\\) and \\(DA = 7\\). Find the range of \\(BD\\).",
        steps: [
          "Triangle \\(ABD\\) (\\(5\\), \\(7\\)): \\(2 < BD < 12\\).",
          "Triangle \\(BCD\\) (\\(14\\), \\(8\\)): \\(6 < BD < 22\\).",
        ],
        answer: "\\(6 < BD < 12\\).",
      },
      selfCheckExample: {
        prompt: "In \\(ABCD\\), \\(\\angle B = \\angle ACD = 90^\\circ\\), \\(AB = 6\\), \\(BC = 8\\) and \\(CD = 24\\). Find \\(AD\\).",
        steps: ["\\(AC = 10\\).", "\\(AD = \\sqrt{10^2 + 24^2}\\)."],
        answer: "\\(26\\).",
      },
      practiceSet: [
        { prompt: "Sides \\(4\\) and \\(9\\) around a diagonal. Its range from that triangle?", answer: "\\(5 < x < 13\\)" },
        { prompt: "Rectangle \\(9 \\times 12\\). Half a diagonal?", answer: "\\(7.5\\)" },
        { prompt: "Perimeter \\(20\\). Can the diagonals add to \\(22\\)?", answer: "No" },
        { prompt: "Right angles at \\(B\\) and \\(C\\); \\(AB = 5\\), \\(BC = 12\\), \\(CD = 84\\). \\(AD\\)?", answer: "\\(85\\)" },
      ],
      pyqExampleId: "7a84ce5e-8581-4de6-b50f-21d701707172", // 2024 (I) — sides 6, 18, 6, 10, range of diagonal BD
      traps: [
        {
          title: "One triangle is not enough",
          body:
            "Each triangle gives its own range for the diagonal. The answer is where the two ranges OVERLAP; either range alone is too wide and matches a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqu-diagonal-areas",
      name: "Rules that hold in every quadrilateral",
      intuition:
        "Triangles on the same base have areas in the ratio of their heights. The two triangles on a diagonal have heights in the ratio in which the other diagonal cuts it.",
      definition:
        "- Diagonals meet at \\(O\\) with \\(AO : OC = m : n\\): \\([ABD] : [CBD] = m : n\\).\n" +
        "- The four triangles at \\(O\\) satisfy \\([AOB]\\cdot[COD] = [AOD]\\cdot[BOC]\\).\n" +
        "- A point \\(O\\) inside a rectangle \\(ABCD\\): \\(OA^2 + OC^2 = OB^2 + OD^2\\).\n" +
        "- If a diagonal bisects the angles at both its ends, the figure is a kite: the two triangles are congruent.\n" +
        "- A quadrilateral with an inscribed circle: \\(AB + CD = BC + DA\\).",
      formula: {
        label: "Area on a shared diagonal",
        latex: "\\dfrac{[CBD]}{[ABD]} = \\dfrac{OC}{AO}",
      },
      authoredExample: {
        prompt: "The diagonals of \\(ABCD\\) meet at \\(O\\) with \\(AO : OC = 3 : 5\\), and \\([ABD] = 24\\). Find \\([CBD]\\).",
        steps: ["Same base \\(BD\\); heights in the ratio \\(3 : 5\\)."],
        answer: "\\(40\\).",
      },
      selfCheckExample: {
        prompt: "A point inside a rectangle \\(ABCD\\) is \\(3\\), \\(4\\) and \\(5\\) units from \\(A\\), \\(B\\) and \\(C\\). How far is it from \\(D\\)?",
        steps: ["\\(OA^2 + OC^2 = OB^2 + OD^2\\): \\(9 + 25 = 16 + OD^2\\)."],
        answer: "\\(3\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "\\([AOB] = 4\\), \\([BOC] = 6\\), \\([COD] = 9\\). \\([AOD]\\)?", answer: "\\(6\\)" },
        { prompt: "\\(AO = OC\\). \\([ABD] : [CBD]\\)?", answer: "\\(1 : 1\\)" },
        { prompt: "Incircle; \\(AB = 7\\), \\(CD = 5\\), \\(BC = 4\\). \\(DA\\)?", answer: "\\(8\\)" },
        { prompt: "\\(AC\\) bisects \\(\\angle A\\) and \\(\\angle C\\). Is \\(AB = AD\\)?", answer: "Yes" },
      ],
      pyqExampleId: "5c941b9a-a883-4081-bd5d-f0c644da2bb1", // 2026 (I) — AO : OC = m : n, area of ABD is p
      traps: [
        {
          title: "Heights, not squares",
          body:
            "Triangles on a common base compare by HEIGHT, a straight ratio. Squaring the ratio belongs to similar triangles, which these are not.",
        },
      ],
    },
  ],
};
