import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_ST_TABLES_NOTE: SubtopicNote = {
  subtopicName: "Frequency Tables and Cumulative Frequency",
  title: "Frequency Tables and Cumulative Frequency",
  oneLineDefinition:
    "A cumulative table gives class frequencies by subtraction; a discrete x–f table gives the mean by Σfx ÷ Σf, the median from the cumulative column, and the mode as the most frequent x.",
  whyItMatters:
    "Fifteen PYQs, most of them EASY or MODERATE and many in sets of three to five items on one table. Solve for any missing frequency first; then mean, median and mode each take one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsst-cumulative",
      name: "Cumulative frequency tables",
      intuition:
        "A 'less than' table is a running total. The number in a class is the difference of two running totals, and 'more than' tables work the same way from the other end.",
      definition:
        "- From a 'less than' table: frequency of \\(a\\)–\\(b\\) = (less than \\(b\\)) − (less than \\(a\\)).\n" +
        "- 'More than \\(a\\)' = total − (less than \\(a\\)).\n" +
        "- From a table with a cumulative column, each frequency is the rise in the cumulative column.\n" +
        "- Read cut-offs carefully: 'at least 60 but less than 80' includes \\(60\\) and excludes \\(80\\); '50% marks' of \\(80\\) is \\(40\\).",
      formula: {
        label: "Frequency from a cumulative table",
        latex: "f(a\\text{–}b) = F(b) - F(a)",
      },
      authoredExample: {
        prompt: "Less than 20: 12; less than 40: 30; less than 60: 55; less than 80: 70. How many scored from 40 to 60, and how many scored 40 or more?",
        steps: ["\\(55 - 30 = 25\\).", "\\(70 - 30 = 40\\)."],
        answer: "\\(25\\) and \\(40\\).",
      },
      selfCheckExample: {
        prompt: "Cumulative frequencies \\(6, 15, 27, 40\\) for \\(x = 1, 2, 3, 4\\). Find the frequency of \\(x = 3\\).",
        steps: ["\\(27 - 15\\)."],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "Less than 30: 40; less than 50: 95. Number in 30–50?", answer: "\\(55\\)" },
        { prompt: "Total 200, less than 40: 70. Number 40 or more?", answer: "\\(130\\)" },
        { prompt: "More than 10: 100, more than 20: 80. Number in 10–20?", answer: "\\(20\\)" },
        { prompt: "\\(50\\%\\) of \\(60\\) marks is?", answer: "\\(30\\) marks" },
      ],
      pyqExampleId: "9cc9d622-28be-45aa-96b1-e863e579c5ca", // 2025 (I) — students between 60 and 70 from a 'below' table
      traps: [
        {
          title: "Percent of the maximum, not marks",
          body:
            "'Less than or equal to \\(50\\%\\) marks' in a test of \\(80\\) means \\(40\\) marks, not \\(50\\). The two readings usually both land on class boundaries, so both are printed as options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-discrete-tables",
      name: "Mean, median and mode of an x–f table",
      intuition:
        "Each value \\(x\\) appears \\(f\\) times. The mean weights each value by its frequency; the median is found by counting down the cumulative column to the middle position; the mode is the value with the largest \\(f\\).",
      definition:
        "- **Missing frequencies:** the total gives one equation, a stated mean gives another.\n" +
        "- **Mean:** \\(\\bar x = \\dfrac{\\sum fx}{\\sum f}\\) (the order of the rows does not matter).\n" +
        "- **Median:** sort the \\(x\\) values, build cumulative frequencies, and find the value covering position \\(\\dfrac{N + 1}{2}\\) (or the two middle positions when \\(N\\) is even).\n" +
        "- **Mode:** the \\(x\\) with the largest frequency.",
      formula: {
        label: "Mean of a frequency table",
        latex: "\\bar x = \\dfrac{\\sum f x}{\\sum f}",
      },
      authoredExample: {
        prompt: "\\(x\\): \\(1, 2, 3, 4\\) with \\(f\\): \\(5, 9, 4, 2\\). Find the mean, median and mode.",
        steps: [
          "\\(N = 20\\); \\(\\sum fx = 5 + 18 + 12 + 8 = 43\\), so the mean is \\(2.15\\).",
          "Cumulative: \\(5, 14, 18, 20\\). The \\(10\\)th and \\(11\\)th values are both \\(2\\), so the median is \\(2\\).",
          "The largest frequency is \\(9\\), at \\(x = 2\\).",
        ],
        answer: "Mean \\(2.15\\), median \\(2\\), mode \\(2\\).",
      },
      selfCheckExample: {
        prompt: "\\(x\\): \\(0, 1, 2\\) with \\(f\\): \\(10, p, 5\\). The total is \\(30\\). Find \\(p\\) and the mean.",
        steps: ["\\(p = 15\\).", "\\(\\sum fx = 0 + 15 + 10 = 25\\); mean \\(\\dfrac{25}{30}\\)."],
        answer: "\\(p = 15\\), mean \\(\\dfrac56\\).",
      },
      practiceSet: [
        { prompt: "\\(x\\): \\(2, 4\\), \\(f\\): \\(3, 1\\). Mean?", answer: "\\(2.5\\)" },
        { prompt: "\\(x\\): \\(5, 6, 7\\), \\(f\\): \\(2, 8, 3\\). Mode?", answer: "\\(6\\)" },
        { prompt: "\\(f\\): \\(f, f + 1, f - 1\\) total \\(30\\). \\(f\\)?", answer: "\\(10\\)" },
        { prompt: "\\(N = 21\\). Median position?", answer: "\\(11\\)th" },
      ],
      pyqExampleId: "bf2df2da-e973-4b7c-abeb-7428cab644ca", // 2019 (II) — median of an unsorted x–f table
      traps: [
        {
          title: "Sort the x values first",
          body:
            "Tables often list \\(x\\) out of order. The mean does not care, but the median does: build the cumulative column only after putting \\(x\\) in increasing order.",
        },
      ],
    },
  ],
};
