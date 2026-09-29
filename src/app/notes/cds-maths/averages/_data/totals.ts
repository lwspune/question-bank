import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AV_TOTALS_NOTE: SubtopicNote = {
  subtopicName: "Sum and Mean",
  title: "Working Through the Total",
  oneLineDefinition:
    "An average hides a total: sum = number of items × mean, and almost every average question is solved on the totals, not the means.",
  whyItMatters:
    "Twenty PYQs, two of them HARD. Adding a member, dropping one, a sixth item shared by two groups, the largest reading a week can hold, a misread mark: turn every mean into a total, do the arithmetic on totals, and divide once at the end.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsav-sum",
      name: "Sum = count × mean",
      intuition:
        "Averages cannot be added or subtracted, but totals can. Multiply each mean by its count, combine the totals the way the story does, then divide by the new count.",
      definition:
        "- Total \\(= n \\times \\bar x\\).\n" +
        "- An item added: new item \\(=\\) new total \\(-\\) old total.\n" +
        "- Two groups that share an item: that item \\(=\\) (sum of the group totals) \\(-\\) (grand total).\n" +
        "- The largest possible single value: set all the others to their smallest allowed value.\n" +
        "- Every item raised by \\(c\\): the mean rises by \\(c\\).",
      formula: {
        label: "Total",
        latex: "\\text{sum} = n \\times \\bar{x}",
      },
      authoredExample: {
        prompt: "The mean of \\(8\\) numbers is \\(12\\). One more number is added and the mean becomes \\(13\\). Find it.",
        steps: ["Totals \\(96\\) and \\(117\\)."],
        answer: "\\(21\\).",
      },
      selfCheckExample: {
        prompt: "The mean of \\(9\\) observations is \\(20\\); the first \\(5\\) average \\(18\\) and the last \\(5\\) average \\(23\\). Find the fifth observation.",
        steps: ["\\(90 + 115 - 180\\)."],
        answer: "\\(25\\).",
      },
      practiceSet: [
        { prompt: "Mean of \\(6\\) is \\(10\\); one is removed and the mean becomes \\(9\\). Removed?", answer: "\\(15\\)" },
        { prompt: "Ages average \\(30\\) for \\(2\\) people. Total?", answer: "\\(60\\)" },
        { prompt: "\\(5\\) days average \\(20\\), minimum \\(18\\). Largest possible day?", answer: "\\(28\\)" },
        { prompt: "Each of \\(10\\) marks up by \\(3\\). Change in mean?", answer: "\\(+3\\)" },
      ],
      pyqExampleId: "c1d9d21d-634d-44e2-9022-01de0d0e74db", // 2017 (I) — mean of 5 is 15, of 6 is 17
      traps: [
        {
          title: "A shared item is counted twice",
          body:
            "When 'the first six' and 'the last six' of eleven items overlap, their totals together count the sixth item twice. Subtract the grand total to isolate it.",
        },
        {
          title: "The new average, or the old one?",
          body:
            "'Increasing his average by \\(6\\)' gives an equation in the OLD average; the question often asks for the NEW one. Add the \\(6\\) back before answering.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsav-correction",
      name: "Correcting a wrong entry",
      intuition:
        "A misread value changed the total by (wrong \\(-\\) right). Fix the total, divide by the same count, and the mean moves by that difference over \\(n\\).",
      definition:
        "- Correct total \\(=\\) recorded total \\(-\\) wrong values \\(+\\) right values.\n" +
        "- The mean changes by \\(\\dfrac{\\text{net correction}}{n}\\).\n" +
        "- Several corrections: add their effects, keeping signs.",
      formula: {
        label: "Corrected mean",
        latex: "\\bar{x}_{\\text{new}} = \\bar{x} + \\dfrac{\\text{right} - \\text{wrong}}{n}",
      },
      authoredExample: {
        prompt: "The mean of \\(25\\) marks is \\(40\\). A \\(73\\) was entered as \\(37\\). Find the correct mean.",
        steps: ["The total rises by \\(36\\).", "\\(40 + \\dfrac{36}{25}\\)."],
        answer: "\\(41.44\\).",
      },
      selfCheckExample: {
        prompt: "The mean of \\(40\\) values is \\(30\\). Two were copied as \\(12\\) and \\(15\\) instead of \\(21\\) and \\(10\\). Find the correct mean.",
        steps: ["Net change \\((21 + 10) - (12 + 15) = 4\\)."],
        answer: "\\(30.1\\).",
      },
      practiceSet: [
        { prompt: "\\(10\\) values, mean \\(50\\); a \\(45\\) read as \\(54\\). Correct mean?", answer: "\\(49.1\\)" },
        { prompt: "Net correction \\(+20\\) over \\(40\\) values. Change in mean?", answer: "\\(+0.5\\)" },
        { prompt: "\\(5\\) values each up by \\(4\\). New mean from \\(12\\)?", answer: "\\(16\\)" },
        { prompt: "\\(95\\) read as \\(59\\). Change in total?", answer: "\\(+36\\)" },
      ],
      pyqExampleId: "ade2c2b1-cbdb-4fd6-b480-882592a2028b", // 2016 (II) — mean of 20 is 17, 3 and 6 should be 8 and 9
      traps: [
        {
          title: "Keep the signs",
          body:
            "One misreading can raise the total while another lowers it: \\(95\\) read as \\(59\\) adds \\(36\\), \\(25\\) read as \\(52\\) takes away \\(27\\). The net is \\(+9\\), not \\(63\\).",
        },
      ],
    },
  ],
};
