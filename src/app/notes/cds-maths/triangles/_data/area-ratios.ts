import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_AREA_RATIOS_NOTE: SubtopicNote = {
  subtopicName: "Ratio of Areas of Triangles",
  title: "Ratio of Areas of Triangles",
  oneLineDefinition:
    "Similar triangles have areas in the ratio of the squares of their matching lengths, and triangles with the same height have areas in the ratio of their bases.",
  whyItMatters:
    "Fifteen PYQs, eleven of them MODERATE. Two ideas cover the page: square the length ratio for similar triangles, and compare bases when the height is shared. The repeated-midpoint questions are the same idea used several times over.",
  concepts: [
    // C1 — areas of similar triangles
    {
      kind: "formula" as const,
      slug: "cdstg-similar-area-ratio",
      name: "Areas of similar triangles",
      intuition:
        "Scale a triangle by \\(k\\) and both its base and its height grow by \\(k\\), so its area grows by \\(k^2\\). Any matching length will do for \\(k\\): a side, an altitude, a median or the perimeter.",
      definition:
        "If two triangles are similar with length ratio \\(k\\), their areas are in the ratio \\(k^2\\).\n" +
        "- Going back: an area ratio \\(r\\) means a length ratio \\(\\sqrt r\\).\n" +
        "- A line \\(DE \\parallel BC\\) cuts off triangle \\(ADE\\) similar to \\(ABC\\) with \\(k = \\dfrac{AD}{AB}\\). The remaining trapezium has area \\((1 - k^2)\\) of the whole.",
      formula: {
        label: "Area ratio of similar triangles",
        latex: "\\dfrac{\\text{Area}_1}{\\text{Area}_2} = \\left(\\dfrac{\\text{side}_1}{\\text{side}_2}\\right)^2",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(DE \\parallel BC\\) with \\(AD : DB = 2 : 3\\). Find the ratio of the area of triangle \\(ADE\\) to the area of the trapezium \\(DBCE\\).",
        steps: [
          "\\(\\dfrac{AD}{AB} = \\dfrac25\\), so area \\(ADE\\) : area \\(ABC = 4 : 25\\).",
          "The trapezium is what is left: \\(25 - 4 = 21\\) parts.",
        ],
        answer: "\\(4 : 21\\).",
      },
      selfCheckExample: {
        prompt: "Two similar triangles have areas \\(81\\) and \\(49\\). An altitude of the larger is \\(18\\). Find the matching altitude of the smaller.",
        steps: ["Length ratio \\(= \\sqrt{\\dfrac{49}{81}} = \\dfrac79\\), so the altitude is \\(18\\times\\dfrac79\\)."],
        answer: "\\(14\\).",
      },
      practiceSet: [
        { prompt: "Sides in the ratio \\(2 : 3\\). Ratio of areas?", answer: "\\(4 : 9\\)" },
        { prompt: "Areas in the ratio \\(16 : 25\\). Ratio of medians?", answer: "\\(4 : 5\\)" },
        { prompt: "\\(DE \\parallel BC\\) cuts off one-ninth of the area; \\(BC = 12\\). Find \\(DE\\).", answer: "\\(4\\)" },
        { prompt: "Perimeters in the ratio \\(3 : 4\\). Ratio of areas?", answer: "\\(9 : 16\\)" },
      ],
      pyqExampleId: "202c7b84-b9d2-43a9-9e6c-7d6a94f56493", // 2017 (II) — one-fifth cut off, BC = 10
      traps: [
        {
          title: "The length ratio is the square root",
          body:
            "Cutting off one-third of the area makes \\(DE = \\dfrac{BC}{\\sqrt3}\\), not \\(\\dfrac{BC}{3}\\). And cutting a triangle into two EQUAL parts leaves the small triangle as half the whole, so \\(k = \\dfrac{1}{\\sqrt2}\\).",
        },
      ],
    },

    // C2 — joining midpoints again and again
    {
      kind: "formula" as const,
      slug: "cdstg-medial-triangle",
      name: "Joining the midpoints, again and again",
      intuition:
        "Joining the midpoints halves every side, so the new triangle has a quarter of the area. Do it again and the area quarters again. Only the number of steps between two triangles matters.",
      definition:
        "- The triangle joining the midpoints (the medial triangle) has \\(\\dfrac14\\) the area and \\(\\dfrac12\\) the perimeter.\n" +
        "- After \\(n\\) such steps the area is \\(\\left(\\dfrac14\\right)^n\\) of the start.\n" +
        "- Two triangles \\(n\\) steps apart have areas in the ratio \\(4^n : 1\\).",
      formula: {
        label: "Repeated midpoint triangles",
        latex: "\\text{Area after } n \\text{ steps} = \\dfrac{\\text{Area}}{4^{\\,n}}",
      },
      authoredExample: {
        prompt: "A triangle has area \\(320\\). The midpoints of its sides are joined, and the same is done to each new triangle, three times in all. Find the area of the last triangle.",
        steps: ["Three steps: \\(\\dfrac{320}{4^3} = \\dfrac{320}{64}\\)."],
        answer: "\\(5\\).",
      },
      selfCheckExample: {
        prompt: "In a sequence of triangles, each made by joining the midpoints of the one before, find the ratio of the areas of the first and the fifth.",
        steps: ["They are four steps apart, so the ratio is \\(4^4 : 1\\)."],
        answer: "\\(256 : 1\\).",
      },
      practiceSet: [
        { prompt: "Area \\(40\\). Area of the midpoint triangle?", answer: "\\(10\\)" },
        { prompt: "Perimeter \\(30\\). Perimeter of the midpoint triangle?", answer: "\\(15\\)" },
        { prompt: "Ratio of areas of the 3rd and 6th triangles?", answer: "\\(64 : 1\\)" },
        { prompt: "The midpoint triangle has area \\(7\\). Area of the original?", answer: "\\(28\\)" },
      ],
      pyqExampleId: "718de072-c166-4c52-878b-f4c3fc7a5e51", // 2019 (I) — area 128, midpoints twice
      traps: [
        {
          title: "Count the steps, not the positions",
          body:
            "The 4th and the 7th triangles are \\(3\\) steps apart, so the ratio is \\(4^3 = 64\\), not \\(4^4\\) or \\(4^7\\). Whether the original counts as the first does not matter.",
        },
      ],
    },

    // C3 — same height, bases compared
    {
      kind: "formula" as const,
      slug: "cdstg-same-height",
      name: "Same height, so compare the bases",
      intuition:
        "Area is half base times height. When two triangles share a vertex and their bases lie on one line, they have the same height, so the ratio of their areas is just the ratio of their bases.",
      definition:
        "- Triangles with the same height have areas in the ratio of their bases.\n" +
        "- Triangles on the same base between the same parallel lines have equal areas.\n" +
        "- A median splits a triangle into two equal areas; so for any point \\(P\\) on the median \\(AD\\), \\([PAB] = [PAC]\\).\n" +
        "- The centroid \\(G\\) splits the triangle into three equal areas: \\([GBC] = [GCA] = [GAB]\\).",
      formula: {
        label: "Common height",
        latex: "\\dfrac{[ABD]}{[ADC]} = \\dfrac{BD}{DC}",
      },
      authoredExample: {
        prompt: "\\(D\\) is on \\(BC\\) with \\(BD : DC = 3 : 5\\). The area of triangle \\(ABC\\) is \\(64\\). Find the area of triangle \\(ABD\\).",
        steps: [
          "\\(ABD\\) and \\(ADC\\) share the height from \\(A\\), so their areas are \\(3 : 5\\).",
          "\\(ABD\\) has \\(\\dfrac38\\) of \\(64\\).",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "\\(D\\) is the midpoint of \\(BC\\) and \\(E\\) is the midpoint of \\(AD\\). What fraction of the area of \\(ABC\\) is triangle \\(BED\\)?",
        steps: [
          "The median \\(AD\\) gives \\([ABD] = \\dfrac12[ABC]\\).",
          "In triangle \\(ABD\\), \\(BE\\) is a median, so \\([BED] = \\dfrac12[ABD]\\).",
        ],
        answer: "\\(\\dfrac14\\).",
      },
      practiceSet: [
        { prompt: "\\(BD : DC = 1 : 2\\), area \\(45\\). Area of \\(ADC\\)?", answer: "\\(30\\)" },
        { prompt: "A median divides an area of \\(50\\) into?", answer: "\\(25\\) and \\(25\\)" },
        { prompt: "Two triangles on the same base between the same parallels?", answer: "Equal areas" },
        { prompt: "Area of \\(GBC\\) as a fraction of \\(ABC\\) (\\(G\\) the centroid)?", answer: "\\(\\dfrac13\\)" },
      ],
      pyqExampleId: "1fff82f4-45c1-499f-8efa-080c094a8de1", // 2020 (II) — P on median AD
      traps: [
        {
          title: "The bases must lie on one line",
          body:
            "The shared-height rule needs both bases on the same straight line (or on two parallel lines). Two triangles that share a vertex but have bases pointing different ways do not share a height.",
        },
      ],
    },
  ],
};
