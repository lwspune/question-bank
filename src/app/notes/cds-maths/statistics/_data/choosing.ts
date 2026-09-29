import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_ST_CHOOSING_NOTE: SubtopicNote = {
  subtopicName: "Choosing a Measure of Central Tendency",
  title: "Choosing a Measure of Central Tendency",
  oneLineDefinition:
    "Each average suits a different job: the mean uses every value, the median resists extreme values, the mode gives the most common value, and the harmonic mean averages rates.",
  whyItMatters:
    "Eight PYQs, most of them EASY. They test which average fits a situation and the properties behind the choice. One table and the empirical relation Mode = 3 Median − 2 Mean answer all of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsst-which-average",
      name: "Which average to use",
      intuition:
        "Ask what the average must do. If extreme values should not distort it, use the median. If you want the most common item — a shoe size to stock — use the mode. If you are averaging rates with a fixed numerator, use the harmonic mean.",
      definition:
        "- **Mean:** uses every value; pulled by extremes; needs every value (fails with open-ended classes).\n" +
        "- **Median:** a positional average; unaffected by extremes; can be found with open-ended classes and read off an ogive (where the 'less than' and 'more than' curves cross).\n" +
        "- **Mode:** the most frequent value; may not be unique, or may not exist; suits categories like sizes.\n" +
        "- **Harmonic mean:** averages rates like speed or price per unit when the numerator is fixed.\n" +
        "- **Geometric mean:** averages growth rates and ratios.",
      table: {
        columns: ["Measure", "Best for", "Weakness"],
        rows: [
          { cells: ["Mean", "Balanced data, further algebra", "Pulled by extreme values"] },
          { cells: ["Median", "Skewed data, open-ended classes", "Ignores the size of the other values"] },
          { cells: ["Mode", "Most common item (sizes, categories)", "May not be unique"] },
          { cells: ["Harmonic mean", "Averaging rates (km/h, Rs./unit)", "Only for positive values"] },
          { cells: ["Geometric mean", "Growth rates, ratios", "Needs positive values"] },
        ],
        caption: "The median is the positional average and the one least affected by extreme observations.",
      },
      visualizationSlug: "skew-mean-median-mode",
      selfCheckExample: {
        prompt: "A shop wants to know which dress size to order most of. Which average should it use?",
        steps: ["It needs the size bought most often."],
        answer: "The mode.",
      },
      practiceSet: [
        { prompt: "Least affected by extreme values?", answer: "Median" },
        { prompt: "Can be found graphically from ogives?", answer: "Median" },
        { prompt: "Averaging speeds over equal distances?", answer: "Harmonic mean" },
        { prompt: "Is the mode always unique?", answer: "No" },
      ],
      pyqExampleId: "4c80f6af-95b8-4039-b7dc-60d641940ed4", // 2025 (II) — least affected by extreme observations
      traps: [
        {
          title: "Positional does not mean 'the mode'",
          body:
            "The median is fixed by rank alone, which is why it is called the positional average. Some books also call the mode positional; if both are offered, the median is the standard answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-empirical-relation",
      name: "The empirical relation",
      intuition:
        "In a moderately skewed distribution the median sits between the mean and the mode, about a third of the way from the mean. That gives a rule to find any one of the three from the other two.",
      definition:
        "- For a moderately asymmetrical distribution: Mode \\(= 3\\,\\)Median \\(- 2\\,\\)Mean.\n" +
        "- Equivalently Mean \\(-\\) Mode \\(= 3(\\)Mean \\(-\\) Median\\()\\).\n" +
        "- In a symmetrical distribution all three are equal.\n" +
        "- If the mean exceeds the median, the distribution is skewed to the right and the mode is lower still.",
      formula: {
        label: "Empirical relation",
        latex: "\\text{Mode} = 3\\,\\text{Median} - 2\\,\\text{Mean}",
      },
      authoredExample: {
        prompt: "In a moderately skewed distribution the mode is \\(40\\) and the median is \\(46\\). Estimate the mean.",
        steps: ["\\(40 = 3\\times 46 - 2\\,\\text{Mean}\\), so \\(2\\,\\text{Mean} = 98\\)."],
        answer: "\\(49\\).",
      },
      selfCheckExample: {
        prompt: "Mean \\(60\\), median \\(55\\). Estimate the mode.",
        steps: ["\\(3\\times 55 - 2\\times 60\\)."],
        answer: "\\(45\\).",
      },
      practiceSet: [
        { prompt: "Mean \\(30\\), median \\(30\\). Mode?", answer: "\\(30\\)" },
        { prompt: "Mean \\(50\\), mode \\(38\\). Median?", answer: "\\(46\\)" },
        { prompt: "Mean \\(>\\) median: skewed which way?", answer: "To the right" },
        { prompt: "Mean \\(-\\) Mode in terms of Mean \\(-\\) Median?", answer: "\\(3(\\text{Mean} - \\text{Median})\\)" },
      ],
      pyqExampleId: "b5b867bb-4de5-4091-87f0-e03664465d87", // 2017 (I) — mean 270, median 220, mode?
      traps: [
        {
          title: "Three median, two mean",
          body:
            "It is \\(3\\,\\)Median \\(- 2\\,\\)Mean, not the other way round. Swapping the coefficients gives a 'mode' outside the range of the other two.",
        },
      ],
    },
  ],
};
