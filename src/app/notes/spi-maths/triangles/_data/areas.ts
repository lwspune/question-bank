import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TR_AREAS_NOTE: SubtopicNote = {
  subtopicName: "Areas of Triangles and Similar Triangles",
  title: "Areas of Triangles and Similar Triangles",
  oneLineDefinition:
    "Triangles with the same height have areas in the ratio of their bases, and similar triangles have areas in the ratio of the squares of their corresponding sides.",
  whyItMatters:
    "Four questions in the bank, three EASY and one MODERATE. Two ask for an area ratio from a side or perimeter ratio, one goes back from areas to heights, and one compares two triangles that share a vertex. The usual slip is forgetting to square, or to take the square root on the way back.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitrar-height",
      name: "Triangles with the same height",
      intuition:
        "The area of a triangle is half its base times its height. When two triangles share a corner and their bases lie on one line, they have the same height, so their areas compare exactly as their bases do.",
      definition:
        "- Area of a triangle \\(= \\frac{1}{2} \\times \\text{base} \\times \\text{height}\\).\n" +
        "- Two triangles with the same height have areas in the ratio of their bases.\n" +
        "- A **median** (a line from a corner to the midpoint of the opposite side) cuts a triangle into two triangles of equal area: equal bases, same height.",
      formula: {
        label: "Area of a triangle",
        latex: "\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} \\qquad \\frac{\\text{ar}_1}{\\text{ar}_2} = \\frac{\\text{base}_1}{\\text{base}_2} \\text{ (same height)}",
      },
      authoredExample: {
        prompt: "D is a point on side BC of \\(\\triangle ABC\\) with BD = 6 cm and DC = 9 cm. Find the ratio of the areas of \\(\\triangle ABD\\) and \\(\\triangle ADC\\).",
        steps: [
          "Both triangles have their corner at A and their bases on BC, so they have the same height from A.",
          "Areas are in the ratio of the bases: \\(6 : 9 = 2 : 3\\).",
        ],
        answer: "2 : 3",
      },
      selfCheckExample: {
        prompt: "The area of \\(\\triangle ABC\\) is 50 \\(\\text{cm}^2\\) and AD is a median. Find the area of \\(\\triangle ABD\\).",
        steps: ["A median makes two triangles of equal area.", "Area of \\(\\triangle ABD = \\frac{50}{2} = 25 \\text{ cm}^2\\)."],
        answer: "25 \\(\\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A triangle has base 8 cm and height 5 cm. Find its area.", answer: "20 \\(\\text{cm}^2\\)" },
        { prompt: "Two triangles have the same height and bases 7 cm and 21 cm. Find the ratio of their areas.", answer: "1 : 3" },
        { prompt: "AD is a median of \\(\\triangle ABC\\), whose area is 36 \\(\\text{cm}^2\\). Find the area of \\(\\triangle ADC\\).", answer: "18 \\(\\text{cm}^2\\)" },
      ],
      pyqExampleId: "918e5dc9-af17-40cb-92f6-ac19383c8c33",
      traps: [
        {
          title: "Squaring a ratio that should not be squared",
          body:
            "Triangles that only share a height are not similar, so their areas go as the bases, not as the squares of the bases. Bases 6 and 9 give areas 2 : 3, not 4 : 9.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitrar-similar",
      name: "Areas of similar triangles",
      intuition:
        "Double every side of a triangle and both its base and its height double, so its area grows four times. Areas of similar triangles grow as the SQUARE of the scale factor.",
      definition:
        "- If two triangles are similar with sides in the ratio \\(a : b\\), their areas are in the ratio \\(a^2 : b^2\\).\n" +
        "- The same holds with corresponding heights, medians or perimeters in place of sides, since they all grow by the same factor.\n" +
        "- Going back from areas to sides (or heights), take the **square root** of the area ratio.",
      formula: {
        label: "Area ratio of similar triangles",
        latex: "\\frac{\\text{ar}(\\triangle ABC)}{\\text{ar}(\\triangle DEF)} = \\left(\\frac{AB}{DE}\\right)^2 = \\left(\\frac{\\text{height}_1}{\\text{height}_2}\\right)^2",
      },
      authoredExample: {
        prompt: "Two similar triangles have corresponding sides 3 cm and 5 cm. The smaller has area 18 \\(\\text{cm}^2\\). Find the area of the larger.",
        steps: [
          "Area ratio \\(= 3^2 : 5^2 = 9 : 25\\).",
          "Larger area \\(= 18 \\times \\frac{25}{9} = 50 \\text{ cm}^2\\).",
        ],
        answer: "50 \\(\\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "Two similar triangles have areas 64 \\(\\text{cm}^2\\) and 121 \\(\\text{cm}^2\\). Find the ratio of their corresponding sides.",
        steps: ["Take the square root of the area ratio.", "\\(\\sqrt{64} : \\sqrt{121} = 8 : 11\\)."],
        answer: "8 : 11",
      },
      practiceSet: [
        { prompt: "Two similar triangles have corresponding sides in the ratio 2 : 3. Find the ratio of their areas.", answer: "4 : 9" },
        { prompt: "Two similar triangles have areas in the ratio 25 : 36. Find the ratio of their corresponding medians.", answer: "5 : 6" },
        { prompt: "Every side of a triangle is doubled. How many times larger is the new area?", answer: "4 times" },
        { prompt: "Two similar triangles have perimeters in the ratio 3 : 7. Find the ratio of their areas.", answer: "9 : 49" },
      ],
      pyqExampleId: "65d67eba-1817-4ce2-9035-1735d31abf96",
      traps: [
        {
          title: "Giving the side ratio as the area ratio",
          body:
            "Sides in the ratio 2 : 3 give areas 4 : 9. Leaving the ratio as 2 : 3 is the most common wrong option.",
        },
        {
          title: "Forgetting the square root on the way back",
          body:
            "Areas 64 and 121 give sides (and heights) 8 : 11. Writing 64 : 121 as the side ratio skips the square root.",
        },
        {
          title: "Stopping at the whole triangle",
          body:
            "When a median splits the similar triangle, find the whole triangle's area first, then halve it. The whole area is usually printed as a wrong option.",
        },
      ],
    },
  ],
};
