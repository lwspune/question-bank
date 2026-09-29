import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TW_MIXED_NOTE: SubtopicNote = {
  subtopicName: "Men, Women and Equivalent Workers",
  title: "Men, Women and Equivalent Workers",
  oneLineDefinition:
    "When a gang mixes kinds of worker, first find each kind's daily rate (or how many of one equal one of the other), then add the gang's rates.",
  whyItMatters:
    "Nine PYQs, none HARD. Two patterns: '12 men OR 18 women in 14 days' gives each rate directly; '6 men AND 8 women in 10 days, 13 men and 24 women in 4 days' gives an equation that fixes how many women equal one man.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstw-mixed",
      name: "Rates of different workers",
      intuition:
        "'Or' gives each kind a rate on its own. 'And' twice over gives two gangs that do the same job, so their rate-times-days are equal — one equation that relates a man's rate to a woman's.",
      definition:
        "- '\\(m\\) men OR \\(w\\) women in \\(d\\) days': a man does \\(\\dfrac1{md}\\), a woman \\(\\dfrac1{wd}\\) a day.\n" +
        "- Two mixed gangs, days \\(d_1\\) and \\(d_2\\): \\(d_1(a_1M + b_1W) = d_2(a_2M + b_2W)\\) gives \\(M : W\\).\n" +
        "- Once \\(M : W\\) is known, turn every gang into one kind and use man-days.\n" +
        "- A gang that is each group together finishes in half the time.",
      formula: {
        label: "Two gangs, same job",
        latex: "d_1(a_1M + b_1W) = d_2(a_2M + b_2W)",
      },
      authoredExample: {
        prompt: "\\(9\\) men or \\(15\\) women can do a job in \\(20\\) days. How long do \\(6\\) men and \\(5\\) women take?",
        steps: ["A man does \\(\\tfrac1{180}\\), a woman \\(\\tfrac1{300}\\) a day.", "\\(\\tfrac6{180} + \\tfrac5{300} = \\tfrac1{30} + \\tfrac1{60} = \\tfrac1{20}\\)."],
        answer: "\\(20\\) days.",
      },
      selfCheckExample: {
        prompt: "\\(4\\) men and \\(6\\) women finish a job in \\(8\\) days; \\(3\\) men and \\(7\\) women in \\(10\\) days. How many women equal one man?",
        steps: ["\\(8(4M + 6W) = 10(3M + 7W)\\).", "\\(32M + 48W = 30M + 70W\\), so \\(2M = 22W\\)."],
        answer: "\\(11\\).",
      },
      practiceSet: [
        { prompt: "\\(8\\) men or \\(12\\) women, \\(24\\) days. Both groups together?", answer: "\\(12\\) days" },
        { prompt: "\\(M = 2W\\). \\(4\\) men equal how many women?", answer: "\\(8\\)" },
        { prompt: "\\(5\\) men in \\(10\\) days. One man's daily share?", answer: "\\(\\tfrac1{50}\\)" },
        { prompt: "\\(10(6M + 8W) = 4(13M + 24W)\\). \\(M : W\\)?", answer: "\\(2 : 1\\)" },
      ],
      pyqExampleId: "008f57ab-834f-4aea-9139-632c034348a8", // 2017 (I) — 5 men in 10 days, 12 women in 15 days
      traps: [
        {
          title: "OR is not AND",
          body:
            "'\\(8\\) men or \\(12\\) women in \\(24\\) days' means each group ALONE takes \\(24\\) days. Together they take \\(12\\), not \\(24\\).",
        },
      ],
    },
  ],
};
