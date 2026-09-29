import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_ST_MEDIAN_NOTE: SubtopicNote = {
  subtopicName: "Median of Ungrouped Data",
  title: "The Median of a List",
  oneLineDefinition:
    "Put the values in order; the median is the middle one, or the mean of the middle two when there is an even number of values.",
  whyItMatters:
    "Fifteen PYQs, the largest page in the chapter. Half are straight computations; the rest ask what happens to the median when values change or are added, or use a given median to find an unknown value. In every case the key is the POSITION of the middle, not the size of the values.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsst-median-raw",
      name: "Finding the median",
      intuition:
        "The median splits the ordered data in half. Only the middle position matters, so sorting and counting is all the work.",
      definition:
        "- Sort the values. With \\(n\\) odd, the median is the \\(\\dfrac{n + 1}{2}\\)th value.\n" +
        "- With \\(n\\) even, it is the mean of the \\(\\dfrac n2\\)th and \\(\\left(\\dfrac n2 + 1\\right)\\)th values.\n" +
        "- For an arithmetic sequence the median is the middle term (or the mean of the middle two), which equals the mean.\n" +
        "- If every value is \\(x\\) plus a constant, sort the constants.",
      formula: {
        label: "Median position",
        latex: "n \\text{ odd: } \\left(\\tfrac{n + 1}{2}\\right)\\text{th}; \\quad n \\text{ even: mean of the } \\tfrac n2\\text{th and } \\left(\\tfrac n2 + 1\\right)\\text{th}",
      },
      visualizationSlug: "median-middle-value",
      authoredExample: {
        prompt: "Find the median of \\(14, 3, 22, 9, 17, 6\\), and then of the same list with \\(30\\) added.",
        steps: [
          "In order: \\(3, 6, 9, 14, 17, 22\\). Six values: \\(\\dfrac{9 + 14}{2} = 11.5\\).",
          "With \\(30\\): seven values, the \\(4\\)th is \\(14\\).",
        ],
        answer: "\\(11.5\\), then \\(14\\).",
      },
      selfCheckExample: {
        prompt: "Find the median of \\(3, 6, 9, \\ldots, 60\\).",
        steps: ["There are \\(20\\) terms; the median is the mean of the \\(10\\)th and \\(11\\)th, \\(30\\) and \\(33\\)."],
        answer: "\\(31.5\\).",
      },
      practiceSet: [
        { prompt: "Median of \\(7, 2, 9, 4, 5\\)?", answer: "\\(5\\)" },
        { prompt: "Median of \\(1, 3, 5, 7\\)?", answer: "\\(4\\)" },
        { prompt: "Median of the factors of \\(36\\)?", answer: "\\(6\\)" },
        { prompt: "Median of \\(x - 2, x + 1, x - 5, x + 3\\)?", answer: "\\(x - 0.5\\)" },
      ],
      pyqExampleId: "2ab7bb4c-8fe3-4133-b757-041b05ef623f", // 2023 (II) — median M of ten values, find 2M + 5
      traps: [
        {
          title: "Sort before you pick the middle",
          body:
            "The middle of the list as printed is not the median. With \\(n\\) even, average the two middle values of the SORTED list.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-median-changes",
      name: "How the median responds to changes",
      intuition:
        "The median only looks at the middle position. Changing values far from the middle, or adding one value on each side, leaves it where it was. That same idea lets you place an unknown value using a given median.",
      definition:
        "- Increasing the largest few values (or decreasing the smallest few) does not change the median, as long as their order relative to the middle is kept.\n" +
        "- Adding one value below and one above the median leaves it unchanged.\n" +
        "- Missing values that are known to lie below every listed value fill the lowest positions.\n" +
        "- Given the median, decide which positions the unknowns must occupy, then solve; reject any solution that breaks the stated order.",
      formula: {
        label: "Middle of ten values",
        latex: "\\text{median} = \\tfrac12\\left(x_{(5)} + x_{(6)}\\right)",
      },
      authoredExample: {
        prompt: "The sorted data \\(4, 9, 11, x, x + 2, 20, 25, 31\\) has median \\(15\\). Find \\(x\\).",
        steps: ["The 4th and 5th values are \\(x\\) and \\(x + 2\\): \\(\\dfrac{2x + 2}{2} = 15\\).", "\\(x = 14\\), and \\(11 < 14 < 16 < 20\\) keeps the order."],
        answer: "\\(x = 14\\).",
      },
      selfCheckExample: {
        prompt: "The median of \\(11\\) values is \\(40\\). The three largest are each increased by \\(10\\). What is the new median?",
        steps: ["The 6th value is untouched and still in 6th place."],
        answer: "\\(40\\).",
      },
      practiceSet: [
        { prompt: "Median of \\(15\\) values is \\(22\\). Add \\(5\\) and \\(60\\). New median?", answer: "\\(22\\)" },
        { prompt: "Replace the largest of \\(1, 2, 3, 4, 5\\) by \\(100\\). Median?", answer: "\\(3\\)" },
        { prompt: "Median of \\(2, 5, x, 9\\) (sorted) is \\(6\\). \\(x\\)?", answer: "\\(7\\)" },
        { prompt: "Change \\(93\\) to \\(94\\) in a list where \\(93\\) is one of the two middle values. Median changes by?", answer: "\\(0.5\\)" },
      ],
      pyqExampleId: "13a00e4c-9c6a-4bfb-9e99-e675dd99b1ea", // 2018 (II) — median 30 of 19; add 8 and 32
      traps: [
        {
          title: "Half the change when two values are averaged",
          body:
            "If one of the two middle values rises by \\(1\\), the median rises by \\(\\dfrac12\\), not \\(1\\). The mean of the whole list rises by only \\(\\dfrac1n\\).",
        },
      ],
    },
  ],
};
