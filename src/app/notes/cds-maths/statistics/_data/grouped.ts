import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_ST_GROUPED_NOTE: SubtopicNote = {
  subtopicName: "Mean, Median and Mode of Grouped Data",
  title: "Mean, Median and Mode of Grouped Data",
  oneLineDefinition:
    "For class-interval data the mean uses class mid-points, the median interpolates inside the class holding the N/2th value, and the mode interpolates inside the class with the largest frequency.",
  whyItMatters:
    "Nineteen PYQs, the most of any page, usually two or three items on one table. Three formulas and one habit do it: find any missing frequency first, convert inclusive classes to boundaries, then apply the formula for the measure asked.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsst-grouped-mean",
      name: "Mean of grouped data and missing frequencies",
      intuition:
        "Inside a class we do not know the individual values, so each one is represented by the class mid-point. The mean is then a frequency-weighted mean of the mid-points.",
      definition:
        "- Mid-point of a class = \\(\\dfrac{\\text{lower} + \\text{upper}}{2}\\).\n" +
        "- \\(\\bar x = \\dfrac{\\sum f m}{\\sum f}\\).\n" +
        "- A missing frequency: set the formula equal to the stated mean and solve (with the stated total if there are two unknowns).\n" +
        "- 'Less than' or 'more than' tables: first turn them into class frequencies.",
      formula: {
        label: "Grouped mean",
        latex: "\\bar x = \\dfrac{\\sum f m}{\\sum f}, \\quad m = \\text{class mid-point}",
      },
      authoredExample: {
        prompt: "Classes \\(0\\)–\\(10\\), \\(10\\)–\\(20\\), \\(20\\)–\\(30\\), \\(30\\)–\\(40\\) have frequencies \\(3, 5, f, 2\\), and the mean is \\(19\\). Find \\(f\\).",
        steps: [
          "\\(\\sum fm = 15 + 75 + 25f + 70 = 160 + 25f\\), \\(\\sum f = 10 + f\\).",
          "\\(160 + 25f = 19(10 + f)\\), so \\(6f = 30\\).",
        ],
        answer: "\\(f = 5\\).",
      },
      selfCheckExample: {
        prompt: "Find the mean: \\(0\\)–\\(20\\): \\(6\\); \\(20\\)–\\(40\\): \\(10\\); \\(40\\)–\\(60\\): \\(4\\).",
        steps: ["\\(\\dfrac{6\\times 10 + 10\\times 30 + 4\\times 50}{20} = \\dfrac{560}{20}\\)."],
        answer: "\\(28\\).",
      },
      practiceSet: [
        { prompt: "Mid-point of \\(35\\)–\\(45\\)?", answer: "\\(40\\)" },
        { prompt: "Frequencies \\(2, 3\\) at mid-points \\(10, 20\\). Mean?", answer: "\\(16\\)" },
        { prompt: "More than 0: 50; more than 10: 30. Frequency of \\(0\\)–\\(10\\)?", answer: "\\(20\\)" },
        { prompt: "\\(x + y = 20\\), \\(10x + 30y = 400\\). \\(y\\)?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "8f3e6078-c821-4d3b-8091-90ad43296fdc", // 2017 (I) — mean 50, missing f
      traps: [
        {
          title: "An open last class",
          body:
            "When the last class has no upper limit, the mean is only possible by assuming a width. Take the width of the other classes; that is the reading the options are built on.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-grouped-median",
      name: "Median of grouped data",
      intuition:
        "Find the class that holds the \\(\\dfrac N2\\)th value, then assume its values are spread evenly across the class. The median is the lower boundary plus the fraction of the class you need to walk through.",
      definition:
        "- Median \\(= l + \\dfrac{\\frac N2 - cf}{f}\\times h\\), where \\(l\\) is the lower boundary of the median class, \\(cf\\) the cumulative frequency BEFORE it, \\(f\\) its frequency and \\(h\\) its width.\n" +
        "- Inclusive classes (\\(18\\)–\\(26\\), \\(27\\)–\\(35\\)) must first become boundaries (\\(17.5\\)–\\(26.5\\), \\(26.5\\)–\\(35.5\\)).\n" +
        "- A given median gives one equation for a missing frequency.",
      formula: {
        label: "Grouped median",
        latex: "\\text{Median} = l + \\dfrac{\\tfrac N2 - cf}{f}\\,h",
      },
      authoredExample: {
        prompt: "Classes \\(0\\)–\\(10\\), \\(10\\)–\\(20\\), \\(20\\)–\\(30\\), \\(30\\)–\\(40\\) with frequencies \\(5, 8, 12, 5\\). Find the median.",
        steps: [
          "\\(N = 30\\), \\(\\dfrac N2 = 15\\). Cumulative: \\(5, 13, 25, 30\\), so the median class is \\(20\\)–\\(30\\).",
          "\\(20 + \\dfrac{15 - 13}{12}\\times 10 = 20 + \\dfrac{5}{3}\\).",
        ],
        answer: "\\(21\\tfrac23 \\approx 21.67\\).",
      },
      selfCheckExample: {
        prompt: "Classes \\(10\\)–\\(19\\), \\(20\\)–\\(29\\), \\(30\\)–\\(39\\) with frequencies \\(4, 10, 6\\). Find the median.",
        steps: [
          "Boundaries: \\(19.5\\)–\\(29.5\\) is the median class (\\(\\dfrac N2 = 10\\), \\(cf = 4\\), \\(f = 10\\), \\(h = 10\\)).",
          "\\(19.5 + \\dfrac{10 - 4}{10}\\times 10\\).",
        ],
        answer: "\\(25.5\\).",
      },
      practiceSet: [
        { prompt: "\\(N = 40\\), cumulative \\(8, 18, 30, 40\\). Median class (4 classes)?", answer: "The third" },
        { prompt: "\\(l = 30\\), \\(\\dfrac N2 = 25\\), \\(cf = 20\\), \\(f = 10\\), \\(h = 10\\). Median?", answer: "\\(35\\)" },
        { prompt: "Lower boundary of the inclusive class \\(45\\)–\\(53\\)?", answer: "\\(44.5\\)" },
        { prompt: "Which \\(cf\\) enters the formula?", answer: "The one BEFORE the median class" },
      ],
      pyqExampleId: "5498765c-f947-4d15-8300-4ab6904e2977", // 2024 (II) — median from inclusive classes 18–26, 27–35, ...
      traps: [
        {
          title: "Use boundaries, not printed limits",
          body:
            "With inclusive classes the median class \\(45\\)–\\(53\\) starts at \\(44.5\\). Using \\(45\\) shifts the answer by \\(0.5\\), and that shifted value is usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-grouped-mode",
      name: "Mode of grouped data",
      intuition:
        "The mode lies in the class with the largest frequency, pulled toward whichever neighbour is larger. The formula measures that pull.",
      definition:
        "- Mode \\(= l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2}\\times h\\), where \\(f_1\\) is the modal class frequency, \\(f_0\\) the one before, \\(f_2\\) the one after.\n" +
        "- If the neighbours are equal, the mode is the mid-point of the modal class.\n" +
        "- Solve for any missing frequency first; it may change which class is modal.",
      formula: {
        label: "Grouped mode",
        latex: "\\text{Mode} = l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2}\\,h",
      },
      visualizationSlug: "mode-bar-plot",
      authoredExample: {
        prompt: "Classes \\(0\\)–\\(10\\), \\(10\\)–\\(20\\), \\(20\\)–\\(30\\), \\(30\\)–\\(40\\) with frequencies \\(3, 9, 15, 6\\). Find the mode.",
        steps: [
          "Modal class \\(20\\)–\\(30\\): \\(f_1 = 15\\), \\(f_0 = 9\\), \\(f_2 = 6\\).",
          "\\(20 + \\dfrac{6}{30 - 15}\\times 10 = 20 + 4\\).",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "Modal class \\(40\\)–\\(50\\) with \\(f_1 = 12\\), \\(f_0 = 8\\), \\(f_2 = 8\\). Find the mode.",
        steps: ["Equal neighbours: \\(40 + \\dfrac{4}{8}\\times 10\\)."],
        answer: "\\(45\\).",
      },
      practiceSet: [
        { prompt: "\\(l = 10\\), \\(f_1 = 20\\), \\(f_0 = 10\\), \\(f_2 = 10\\), \\(h = 5\\). Mode?", answer: "\\(12.5\\)" },
        { prompt: "Which class is modal: frequencies \\(4, 7, 7, 3\\)?", answer: "Two classes tie; the data is bimodal" },
        { prompt: "\\(l = 0\\), \\(f_1 = 6\\), \\(f_0 = 0\\), \\(f_2 = 3\\), \\(h = 10\\). Mode?", answer: "\\(\\dfrac{20}{3}\\)" },
        { prompt: "Denominator of the mode formula?", answer: "\\(2f_1 - f_0 - f_2\\)" },
      ],
      pyqExampleId: "240c80d2-12d6-4fd3-a4c8-82d09a8bcf81", // 2026 (II) — mode of grouped data, answer 25.83
      traps: [
        {
          title: "Two times f₁ in the denominator",
          body:
            "The denominator is \\((f_1 - f_0) + (f_1 - f_2) = 2f_1 - f_0 - f_2\\). Writing \\(f_1 - f_0 - f_2\\) gives a negative or tiny denominator and a mode outside the class.",
        },
      ],
    },
  ],
};
