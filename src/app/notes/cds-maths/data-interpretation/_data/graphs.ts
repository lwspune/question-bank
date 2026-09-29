import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_DI_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Bar and Line Graphs",
  title: "Bar and Line Graphs",
  oneLineDefinition:
    "Read each bar's value, total across companies where asked, then compare year with year as a percentage of the earlier year.",
  whyItMatters:
    "Five PYQs, one of them HARD. Four come from one bar chart of car production and ask for year-on-year percentage rises; the fifth asks how long each segment of a percentage bar diagram should be.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsdi-bar",
      name: "Year-on-year change and percentage bars",
      intuition:
        "A bar chart is a table drawn as heights. Read the heights into a small table first; then every question is a table question, usually 'which year rose least, as a percentage of the year before'.",
      definition:
        "- Read the bars into a table: one row per year, one column per company, plus a total column.\n" +
        "- Year-on-year rise \\(= \\dfrac{\\text{this year} - \\text{last year}}{\\text{last year}} \\times 100\\).\n" +
        "- Equal rises in a growing series are SMALLER percentages each year.\n" +
        "- Percentage bar diagram of height \\(H\\): a part worth \\(x\\) of total \\(T\\) gets length \\(\\dfrac xT \\times H\\).\n" +
        "- 'Greater than \\(20\\%\\)' excludes a rise of exactly \\(20\\%\\).",
      formula: {
        label: "Segment of a percentage bar",
        latex: "\\text{length} = \\dfrac{x}{T} \\times H",
      },
      authoredExample: {
        prompt: "Total production was \\(800\\), \\(1000\\), \\(1200\\) and \\(1300\\). In which year was the percentage rise smallest?",
        steps: ["Rises: \\(25\\%\\), \\(20\\%\\), \\(8\\tfrac13\\%\\)."],
        answer: "The last year.",
      },
      selfCheckExample: {
        prompt: "A budget of Rs. \\(5000\\) is drawn as a percentage bar \\(20\\) cm tall. How long is the segment for Rs. \\(750\\)?",
        steps: ["\\(\\dfrac{750}{5000} \\times 20\\)."],
        answer: "\\(3\\) cm.",
      },
      practiceSet: [
        { prompt: "From \\(600\\) to \\(750\\). Percentage rise?", answer: "\\(25\\%\\)" },
        { prompt: "Rises of \\(100\\) each from \\(400\\): which year's percentage is largest?", answer: "The first" },
        { prompt: "Is a \\(20\\%\\) rise 'greater than \\(20\\%\\)'?", answer: "No" },
        { prompt: "\\(1000\\) to \\(2000\\). Percentage increase?", answer: "\\(100\\%\\)" },
      ],
      pyqExampleId: "7640e623-52cb-4fd6-91c2-68ce2d3b1cb2", // 2021 (II) — year of minimum percentage rise in car production
      traps: [
        {
          title: "A doubling is 100%, not 200%",
          body:
            "Going from \\(1000\\) to \\(2000\\) is an INCREASE of \\(100\\%\\). The new value is \\(200\\%\\) of the old one; the options often include both.",
        },
      ],
    },
  ],
};
