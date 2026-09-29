import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SE_VENN_NOTE: SubtopicNote = {
  subtopicName: "Venn Diagrams and Inclusion-Exclusion",
  title: "Venn Diagrams and Counting",
  oneLineDefinition:
    "To count people in one group or another, add the groups and subtract the overlap once: |A ∪ B| = |A| + |B| − |A ∩ B|.",
  whyItMatters:
    "Twenty PYQs, three of them HARD, mostly in sets of three or four on one paragraph. Draw the Venn diagram and fill it from the INSIDE out: all three first, then each 'exactly two', then each 'only one'. Every question is then a sum of regions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsse-two",
      name: "Two groups",
      intuition:
        "Adding the two groups counts the people in both twice. Subtract the overlap once and you have everyone in at least one group; the rest of the total is in neither.",
      definition:
        "- \\(|A \\cup B| = |A| + |B| - |A \\cap B|\\).\n" +
        "- Neither \\(=\\) total \\(-\\ |A \\cup B|\\). Only \\(A\\) \\(= |A| - |A \\cap B|\\).\n" +
        "- 'Failed in' figures: passed in both \\(= 100\\% -\\) failed in at least one.\n" +
        "- If everyone is in at least one group, the overlap is \\(|A| + |B| -\\) total.",
      formula: {
        label: "Two sets",
        latex: "|A \\cup B| = |A| + |B| - |A \\cap B|",
      },
      authoredExample: {
        prompt: "\\(40\\%\\) failed in Maths, \\(30\\%\\) in Science and \\(12\\%\\) in both. What percentage passed in both?",
        steps: ["Failed in at least one: \\(40 + 30 - 12 = 58\\%\\)."],
        answer: "\\(42\\%\\).",
      },
      selfCheckExample: {
        prompt: "In a class of \\(50\\), \\(32\\) play football and \\(28\\) play hockey, and everyone plays at least one. How many play only hockey?",
        steps: ["Both: \\(32 + 28 - 50 = 10\\)."],
        answer: "\\(18\\).",
      },
      practiceSet: [
        { prompt: "\\(|A| = 20\\), \\(|B| = 15\\), \\(|A \\cap B| = 5\\). \\(|A \\cup B|\\)?", answer: "\\(30\\)" },
        { prompt: "Total \\(100\\), \\(|A \\cup B| = 70\\). Neither?", answer: "\\(30\\)" },
        { prompt: "Tea \\(3n\\), coffee \\(2n\\), both \\(n\\), neither \\(4n\\), total \\(80\\). \\(n\\)?", answer: "\\(10\\)" },
        { prompt: "\\(|A| = 12\\), both \\(4\\). Only \\(A\\)?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "034f3103-651a-4d79-a68a-181ec734a237", // 2017 (II) — failed in Hindi 35%, English 45%, both 20%
      traps: [
        {
          title: "Passed in both is not 100 minus failed in both",
          body:
            "Those who passed both are everyone OUTSIDE the union of the 'failed' sets: \\(100 - (35 + 45 - 20) = 40\\%\\), not \\(100 - 20 = 80\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsse-three",
      name: "Three groups",
      intuition:
        "With three groups, fill the diagram from the centre. The pairwise figures usually include the centre, so subtract it to get each 'exactly two' region; then subtract those from each group to get 'only one'.",
      definition:
        "- \\(|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |B \\cap C| - |C \\cap A| + |A \\cap B \\cap C|\\).\n" +
        "- Exactly two \\(= \\sum|A \\cap B| - 3|A \\cap B \\cap C|\\).\n" +
        "- Only \\(A\\) \\(= |A| - |A \\cap B| - |A \\cap C| + |A \\cap B \\cap C|\\).\n" +
        "- At least two \\(=\\) exactly two \\(+\\) all three. With three subjects, passing two or more \\(=\\) failing at most one.",
      formula: {
        label: "Three sets",
        latex: "|A \\cup B \\cup C| = \\textstyle\\sum|A| - \\sum|A \\cap B| + |A \\cap B \\cap C|",
      },
      authoredExample: {
        prompt: "Readers: paper I \\(20\\%\\), II \\(25\\%\\), III \\(15\\%\\); I and II \\(6\\%\\), II and III \\(5\\%\\), I and III \\(4\\%\\); all three \\(2\\%\\). What percentage read none?",
        steps: ["At least one: \\(60 - 15 + 2 = 47\\%\\)."],
        answer: "\\(53\\%\\).",
      },
      selfCheckExample: {
        prompt: "With those figures, what percentage read at least two papers?",
        steps: ["Exactly two: \\((6 - 2) + (5 - 2) + (4 - 2) = 9\\%\\).", "Plus all three."],
        answer: "\\(11\\%\\).",
      },
      practiceSet: [
        { prompt: "All three \\(3\\), pairwise \\(8, 7, 5\\). Exactly two?", answer: "\\(11\\)" },
        { prompt: "\\(|A| = 30\\), \\(A \\cap B = 10\\), \\(A \\cap C = 8\\), all three \\(3\\). Only \\(A\\)?", answer: "\\(15\\)" },
        { prompt: "\\(98\\%\\) in at least one; the sums give \\(94\\% + x\\). All three \\(x\\)?", answer: "\\(4\\%\\)" },
        { prompt: "Nobody takes exactly two. \\(a + t = 50\\), \\(b + t = 40\\), \\(c + t = 30\\), total \\(80\\). \\(t\\)?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "f127a690-2415-4bae-8af1-cfa6bdf61d93", // 2018 (II) — passed in all three subjects, 2% failed all
      traps: [
        {
          title: "Pairwise figures include the centre",
          body:
            "'\\(25\\%\\) passed in Physics and Biology' counts the \\(4\\%\\) who passed all three as well. Exactly Physics and Biology is \\(21\\%\\).",
        },
      ],
    },
  ],
};
