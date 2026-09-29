import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_DI_TABLES_NOTE: SubtopicNote = {
  subtopicName: "Tables",
  title: "Reading Tables",
  oneLineDefinition:
    "A table question asks for a percentage, a change or an average built from a few cells; the work is picking the right cells and the right base.",
  whyItMatters:
    "Twenty-four PYQs, none HARD, almost all in sets of two to four on one table. Two skills cover them: percentages and percentage change (always divide by the base the question names), and totals and averages (add a row or a column, then compare).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsdi-table-percent",
      name: "Percentages and percentage change",
      intuition:
        "Every percentage has a base, the thing you divide by. 'X is what per cent of Y' divides by \\(Y\\); 'change over last year' divides by last year. Most wrong options use the right difference over the wrong base.",
      definition:
        "- \\(X\\) as a percentage of \\(Y\\): \\(\\dfrac XY \\times 100\\).\n" +
        "- \\(X\\) is what per cent MORE than \\(Y\\): \\(\\dfrac{X - Y}{Y} \\times 100\\).\n" +
        "- Change from one year to the next: \\(\\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\). The same rise is a bigger percentage on a smaller base.\n" +
        "- Two percentage changes from the SAME base compare as the raw changes.\n" +
        "- A table given in percentages of a total: multiply by the total to get counts before subtracting across rows.",
      formula: {
        label: "Percentage change",
        latex: "\\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100",
      },
      authoredExample: {
        prompt: "Sales were \\(40\\), \\(50\\) and \\(60\\) units in three years. In which year was the percentage rise larger?",
        steps: ["Year 2: \\(\\dfrac{10}{40} = 25\\%\\).", "Year 3: \\(\\dfrac{10}{50} = 20\\%\\)."],
        answer: "Year 2 — the same rise on a smaller base.",
      },
      selfCheckExample: {
        prompt: "Showroom P sold \\(30\\%\\) of \\(4000\\) scooters; showroom Q sold \\(25\\%\\) of \\(3600\\). P's sales are what per cent more than Q's?",
        steps: ["P \\(= 1200\\), Q \\(= 900\\).", "\\(\\dfrac{300}{900} \\times 100\\)."],
        answer: "\\(33\\tfrac13\\%\\).",
      },
      practiceSet: [
        { prompt: "\\(45\\) is what per cent of \\(180\\)?", answer: "\\(25\\%\\)" },
        { prompt: "From \\(80\\) to \\(92\\). Percentage rise?", answer: "\\(15\\%\\)" },
        { prompt: "From \\(125\\) to \\(100\\). Percentage fall?", answer: "\\(20\\%\\)" },
        { prompt: "Rise 'of at least \\(5\\%\\)': does exactly \\(5\\%\\) count?", answer: "Yes" },
      ],
      pyqExampleId: "24d3602b-3dec-41a5-9617-859eaea6c2df", // 2021 (I) — car production, rise of 5% or more
      traps: [
        {
          title: "Divide by the OLD figure",
          body:
            "A change is measured against where it started. From \\(125\\) to \\(100\\) is a \\(20\\%\\) fall; dividing by the new figure gives \\(25\\%\\).",
        },
        {
          title: "'More than' versus 'more than or equal to'",
          body:
            "When a value lands exactly on the threshold, the wording decides. 'Greater than \\(20\\%\\)' excludes \\(20\\%\\); 'at least \\(5\\%\\)' includes \\(5\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsdi-table-average",
      name: "Totals, averages and closest-to-average",
      intuition:
        "An average question wants a row or column total divided by how many entries it has. 'Closest to the average' then means the smallest distance from that average, found by subtracting.",
      definition:
        "- Average of a row or column \\(=\\) its total \\(\\div\\) the number of entries.\n" +
        "- A yearly figure per day: divide by \\(365\\).\n" +
        "- 'Closest to the average': compute the average, then the distance \\(|x - \\bar x|\\) for each option.\n" +
        "- Least or most over several years: compare column totals, not single years.\n" +
        "- Count the cases only among the options or years the question names.",
      formula: {
        label: "Average",
        latex: "\\bar x = \\dfrac{\\text{total}}{n}",
      },
      authoredExample: {
        prompt: "A newspaper's circulation over four years was \\(9\\), \\(13\\), \\(10\\) and \\(16\\) thousand. In which year was it closest to its average?",
        steps: ["Average \\(\\dfrac{48}{4} = 12\\).", "Distances \\(3, 1, 2, 4\\)."],
        answer: "The second year.",
      },
      selfCheckExample: {
        prompt: "\\(29{,}200\\) accidents were recorded in a year. About how many is that a day?",
        steps: ["\\(\\dfrac{29{,}200}{365}\\)."],
        answer: "\\(80\\).",
      },
      practiceSet: [
        { prompt: "Column \\(12, 18, 15, 11\\). Average?", answer: "\\(14\\)" },
        { prompt: "Totals \\(40, 55, 48\\). Which is least?", answer: "The first" },
        { prompt: "Average \\(20\\); values \\(17, 22, 25\\). Closest?", answer: "\\(22\\)" },
        { prompt: "\\(7300\\) a year. Per day?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "e58c13d9-cb1c-457c-907b-df9f22388f30", // 2025 (I) — newspaper D closest to its own average
      traps: [
        {
          title: "Which average?",
          body:
            "'Close to its own average over the years' and 'close to the average of all newspapers that year' are different numbers. Read which one the question asks for.",
        },
      ],
    },
  ],
};
