import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_DI_CASELET_NOTE: SubtopicNote = {
  subtopicName: "Caselet Data Interpretation",
  title: "Caselets: Data Given in Words",
  oneLineDefinition:
    "A caselet gives its data as a paragraph; turn it into a table first, filling every cell, and each question becomes a lookup.",
  whyItMatters:
    "Five PYQs, all from one 2017 paragraph about students by subject and gender. The paragraph gives some cells as counts, some as fractions and some only as 'the rest', so the only safe method is to build the full table once and answer every item from it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsdi-caselet",
      name: "Build the table first",
      intuition:
        "Every fact in the paragraph fills one cell. Row and column totals then fill the cells the paragraph left out. Once the table is full, the questions only ask you to read it.",
      definition:
        "- Draw rows for the categories and columns for the split (boys and girls), with totals.\n" +
        "- Convert fractions and percentages to counts using the right total: '\\(60\\%\\) of Physics students' is \\(60\\%\\) of the Physics row.\n" +
        "- Fill 'remaining' cells last, from the totals.\n" +
        "- Check that the grand total adds up before answering.",
      formula: {
        label: "Missing cell",
        latex: "\\text{cell} = \\text{row total} - \\text{known cells}",
      },
      authoredExample: {
        prompt: "A college has \\(600\\) students: \\(25\\%\\) in Arts, \\(240\\) in Science and the rest in Commerce. \\(40\\%\\) of Science students are girls. How many boys study Science, and how many students study Commerce?",
        steps: ["Arts \\(150\\); Commerce \\(600 - 150 - 240 = 210\\).", "Science boys \\(= 60\\%\\) of \\(240\\)."],
        answer: "\\(144\\) boys in Science; \\(210\\) students in Commerce.",
      },
      selfCheckExample: {
        prompt: "Of \\(210\\) Commerce students, two-thirds are girls. What is the ratio of boys to girls in Commerce?",
        steps: ["Girls \\(140\\), boys \\(70\\)."],
        answer: "\\(1 : 2\\).",
      },
      practiceSet: [
        { prompt: "\\(1000\\) students, \\(30\\%\\) in one subject. How many?", answer: "\\(300\\)" },
        { prompt: "Row of \\(300\\) with \\(120\\) girls. Boys?", answer: "\\(180\\)" },
        { prompt: "\\(90\\) is what per cent of \\(360\\)?", answer: "\\(25\\%\\)" },
        { prompt: "Boys \\(536\\), girls \\(664\\). Ratio?", answer: "\\(67 : 83\\)" },
      ],
      pyqExampleId: "8c0680c4-aad8-4024-a44c-b85929d9f47d", // 2017 (II) — boys studying Statistics and Physics
      traps: [
        {
          title: "A percentage of which total?",
          body:
            "'\\(60\\%\\) of students studying Physics are boys' is \\(60\\%\\) of the Physics row, not of the whole university. Using the grand total is the usual slip.",
        },
      ],
    },
  ],
};
