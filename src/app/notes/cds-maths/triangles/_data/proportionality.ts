import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_PROPORTIONALITY_NOTE: SubtopicNote = {
  subtopicName: "Parallels, Midpoints and the Bisector Theorem",
  title: "Parallels, Midpoints and the Bisector Theorem",
  oneLineDefinition:
    "A line parallel to one side cuts the other two in the same ratio, the line joining two midpoints is half the third side, and an angle bisector cuts the opposite side in the ratio of the two sides beside the angle.",
  whyItMatters:
    "Seventeen PYQs, and all but one are MODERATE or EASY. Nine of them are the angle-bisector theorem, often asked twice in the same form a few years apart. The rest divide a side in a ratio with a parallel line or use midpoints, so this is one of the cheapest pages in the chapter.",
  concepts: [
    // C1 — basic proportionality
    {
      kind: "formula" as const,
      slug: "cdstg-bpt",
      name: "A line parallel to one side",
      intuition:
        "A line parallel to \\(BC\\) cuts off a smaller copy of the triangle at \\(A\\). Everything in the copy is scaled by the same factor, so the two sides are divided in the same ratio.",
      definition:
        "If \\(D\\) is on \\(AB\\), \\(E\\) on \\(AC\\) and \\(DE \\parallel BC\\):\n" +
        "- \\(\\dfrac{AD}{DB} = \\dfrac{AE}{EC}\\) (the basic proportionality theorem);\n" +
        "- \\(\\dfrac{AD}{AB} = \\dfrac{AE}{AC} = \\dfrac{DE}{BC}\\) (the small triangle \\(ADE\\) is similar to \\(ABC\\)).\n" +
        "**Converse:** if a line divides two sides in the same ratio, it is parallel to the third side.",
      formula: {
        label: "Basic proportionality",
        latex: "DE \\parallel BC \\;\\Rightarrow\\; \\dfrac{AD}{DB} = \\dfrac{AE}{EC}, \\quad \\dfrac{DE}{BC} = \\dfrac{AD}{AB}",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(DE \\parallel BC\\) with \\(D\\) on \\(AB\\). If \\(AB = 12\\), \\(AD = 4\\) and \\(BC = 9\\), find \\(DE\\) and \\(AE : EC\\).",
        steps: [
          "\\(\\dfrac{DE}{BC} = \\dfrac{AD}{AB} = \\dfrac{4}{12} = \\dfrac13\\), so \\(DE = 3\\).",
          "\\(DB = 8\\), so \\(AE : EC = AD : DB = 4 : 8\\).",
        ],
        answer: "\\(DE = 3\\); \\(AE : EC = 1 : 2\\).",
      },
      selfCheckExample: {
        prompt: "\\(DE \\parallel BC\\), \\(AD = 3\\), \\(DB = 5\\) and \\(AE = 4.5\\). Find \\(EC\\).",
        steps: ["\\(\\dfrac{AE}{EC} = \\dfrac{AD}{DB} = \\dfrac35\\), so \\(EC = 4.5\\times\\dfrac53\\)."],
        answer: "\\(7.5\\).",
      },
      practiceSet: [
        { prompt: "\\(AD : DB = 2 : 3\\) and \\(AC = 20\\). Find \\(AE\\).", answer: "\\(8\\)" },
        { prompt: "\\(DE = \\dfrac14 BC\\) and \\(AB = 12\\). Find \\(AD\\).", answer: "\\(3\\)" },
        { prompt: "\\(RX : RP = RY : RQ = 2 : 5\\). Is \\(XY \\parallel PQ\\)?", answer: "Yes (converse)" },
        { prompt: "\\(AD : AB = 1 : 3\\) and \\(BC = 15\\). Find \\(DE\\).", answer: "\\(5\\)" },
      ],
      pyqExampleId: "999ca294-e02d-4655-b06a-23b61caf47e5", // 2026 (II) — BC = 5DE, find AD × BD
      traps: [
        {
          title: "DE over BC is part over WHOLE",
          body:
            "\\(\\dfrac{DE}{BC}\\) equals \\(\\dfrac{AD}{AB}\\), not \\(\\dfrac{AD}{DB}\\). With \\(AD : DB = 1 : 4\\), \\(DE\\) is one-fifth of \\(BC\\), not one-quarter.",
        },
      ],
    },

    // C2 — the midpoint theorem
    {
      kind: "formula" as const,
      slug: "cdstg-midpoint-theorem",
      name: "The midpoint theorem",
      intuition:
        "Joining two midpoints is the parallel-line case with ratio \\(1 : 1\\): the segment is parallel to the third side and exactly half of it. Join all three midpoints and the triangle falls into four identical quarters.",
      definition:
        "- The segment joining the midpoints of two sides is parallel to the third side and half as long.\n" +
        "- **Converse:** a line through the midpoint of one side, parallel to another side, bisects the third side.\n" +
        "- Joining the three midpoints makes four congruent triangles, each with half the perimeter of the original.\n" +
        "- Lines through each vertex parallel to the opposite side make a triangle with the original vertices as its midpoints, so its sides are double.\n" +
        "- If a triangle is cut into three corner triangles and one middle triangle, the corner perimeters add up to the outer perimeter plus the middle perimeter.",
      formula: {
        label: "Midpoint theorem",
        latex: "DE \\parallel BC, \\quad DE = \\tfrac12 BC",
      },
      authoredExample: {
        prompt: "A triangle has sides \\(8\\), \\(10\\) and \\(12\\). Find the perimeter of the triangle formed by joining the midpoints of its sides.",
        steps: [
          "Each side of the new triangle is half a side of the old one: \\(4\\), \\(5\\), \\(6\\).",
          "Its perimeter is \\(15\\), half of \\(30\\).",
        ],
        answer: "\\(15\\).",
      },
      selfCheckExample: {
        prompt: "Through each vertex of a triangle of perimeter \\(18\\), a line is drawn parallel to the opposite side. Find the perimeter of the triangle these lines form.",
        steps: [
          "The original vertices are the midpoints of the new triangle's sides.",
          "So each new side is twice an old side.",
        ],
        answer: "\\(36\\).",
      },
      practiceSet: [
        { prompt: "Third side \\(14\\). Segment joining the other two midpoints?", answer: "\\(7\\)" },
        { prompt: "Joining midpoints makes how many congruent triangles?", answer: "Four" },
        { prompt: "Perimeter \\(30\\). Perimeter of the midpoint triangle?", answer: "\\(15\\)" },
        { prompt: "\\(E\\) is the midpoint of \\(AC = 10\\); a line through the midpoint of \\(BC\\) parallel to \\(BE\\) meets \\(AC\\) at \\(F\\). Find \\(CF\\).", answer: "\\(2.5\\)" },
      ],
      pyqExampleId: "1c0be054-8fdc-459d-89ca-e64fca9b47ad", // 2019 (I) — lines through vertices, perimeter 22
      traps: [
        {
          title: "Count every side once",
          body:
            "When a triangle is cut into a middle triangle and three corner triangles, each side of the middle triangle belongs to exactly one corner triangle. So adding the corner perimeters counts the outer perimeter once and the middle perimeter once.",
        },
      ],
    },

    // C3 — the angle-bisector theorem
    {
      kind: "formula" as const,
      slug: "cdstg-angle-bisector-theorem",
      name: "The angle-bisector theorem",
      intuition:
        "The bisector of \\(\\angle A\\) is equally far from \\(AB\\) and \\(AC\\), so triangles \\(ABD\\) and \\(ACD\\) have areas in the ratio \\(AB : AC\\). They also share the height from \\(A\\), so their areas are in the ratio \\(BD : DC\\). The two ratios are the same.",
      definition:
        "If \\(AD\\) bisects \\(\\angle A\\) and meets \\(BC\\) at \\(D\\):\n" +
        "- \\(\\dfrac{BD}{DC} = \\dfrac{AB}{AC}\\), so \\(BD = \\dfrac{a\\,c}{b + c}\\) and \\(DC = \\dfrac{a\\,b}{b + c}\\) (with \\(a = BC\\), \\(b = CA\\), \\(c = AB\\));\n" +
        "- the areas of \\(ABD\\) and \\(ACD\\) are in the ratio \\(AB : AC\\).\n" +
        "**Converse:** if \\(AB\\cdot DC = AC\\cdot BD\\), then \\(AD\\) bisects \\(\\angle A\\).",
      formula: {
        label: "Angle-bisector theorem",
        latex: "\\dfrac{BD}{DC} = \\dfrac{AB}{AC}",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(AB = 10\\), \\(AC = 15\\) and \\(BC = 20\\). The bisector of \\(\\angle A\\) meets \\(BC\\) at \\(D\\). Find \\(BD\\) and \\(DC\\).",
        steps: [
          "\\(BD : DC = AB : AC = 10 : 15 = 2 : 3\\).",
          "Split \\(20\\) in the ratio \\(2 : 3\\): \\(BD = 8\\), \\(DC = 12\\).",
        ],
        answer: "\\(BD = 8\\), \\(DC = 12\\).",
      },
      selfCheckExample: {
        prompt: "\\(AB = 9\\), \\(AC = 6\\), and the bisector of \\(\\angle A\\) cuts \\(BC\\) with \\(BD = 6\\). Find \\(BC\\).",
        steps: [
          "\\(\\dfrac{BD}{DC} = \\dfrac{9}{6}\\), so \\(DC = 6\\times\\dfrac69 = 4\\).",
          "\\(BC = 6 + 4\\).",
        ],
        answer: "\\(10\\).",
      },
      practiceSet: [
        { prompt: "\\(AB : AC = 5 : 3\\), \\(BC = 16\\). Find \\(BD\\).", answer: "\\(10\\)" },
        { prompt: "\\(BD : DC = 2 : 1\\), \\(AB + AC = 12\\). Find \\(AC\\).", answer: "\\(4\\)" },
        { prompt: "\\(AB = 6\\), \\(AC = 4\\), \\(BC = 5\\). Find \\(BD\\).", answer: "\\(3\\)" },
        { prompt: "\\(AB = 8\\), \\(AC = 12\\). Ratio of areas \\(ABD : ACD\\)?", answer: "\\(2 : 3\\)" },
      ],
      pyqExampleId: "6d552e35-9688-4c27-9230-79c53c1fac06", // 2026 (I) — AB 18, AC 15, BC 22: BD × DC
      traps: [
        {
          title: "Pair each segment with the side that touches it",
          body:
            "\\(BD\\) goes with \\(AB\\) — both end at \\(B\\) — and \\(DC\\) with \\(AC\\). Writing \\(\\dfrac{BD}{DC} = \\dfrac{AC}{AB}\\) swaps the answer, and the swapped value is always one of the options.",
        },
      ],
    },
  ],
};
