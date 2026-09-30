import type { SubtopicNote } from "@/app/notes/_types";

export const CHANGES_STAT_NOTE: SubtopicNote = {
  subtopicName: "Correcting Data and Combining Groups",
  title: "Correcting Data and Combining Groups",
  oneLineDefinition:
    "Fixing the mean and variance after a wrongly recorded value is corrected or dropped, and finding the mean and variance of two groups put together.",
  whyItMatters:
    "Twenty-three PYQs, thirteen of them multiple choice, and two from 2026. Fifteen correct one or two wrongly read values, or omit them, and ask for the new mean, variance or standard deviation; eight combine two groups with known sizes, means and variances, sometimes after shifting each group. Two ideas cover the page.",
  concepts: [
    // C1 — correcting a wrong value
    {
      kind: "formula" as const,
      slug: "jstat-correct",
      name: "Correcting a wrong value",
      intuition:
        "A wrong value sits inside both totals. Rebuild \\(\\sum x\\) and \\(\\sum x^2\\) from the wrong mean and variance, take the wrong value out of each, put the right one in, and recompute. The variance changes too, so it must be rebuilt, not carried over.",
      definition:
        "- Recorded totals: \\(\\sum x=n\\bar x\\), \\(\\sum x^2=n(\\sigma^2+\\bar x^2)\\).\n" +
        "- Wrong \\(w\\), correct \\(c\\): \\(\\sum x\\to\\sum x-w+c\\), \\(\\sum x^2\\to\\sum x^2-w^2+c^2\\).\n" +
        "- Omitting a value: subtract it and reduce \\(n\\) by one.\n" +
        "- Then \\(\\sigma^2=\\frac{1}{n}\\sum x^2-\\bar x^2\\) with the corrected totals.",
      formula: {
        label: "Replace in both totals",
        latex: "\\sum x\\to\\sum x-w+c,\\qquad \\sum x^2\\to\\sum x^2-w^2+c^2",
      },
      authoredExample: {
        prompt: "Ten observations have mean 8 and variance 6. A value 13 was recorded as 3. Find the correct mean and variance.",
        steps: [
          "Recorded: \\(\\sum x=80\\), \\(\\sum x^2=10(6+64)=700\\).",
          "Corrected: \\(\\sum x=80-3+13=90\\), \\(\\sum x^2=700-9+169=860\\).",
          "\\(\\bar x=9\\), \\(\\sigma^2=\\frac{860}{10}-81=5\\).",
        ],
        answer: "Mean \\(9\\), variance \\(5\\).",
      },
      selfCheckExample: {
        prompt: "Five observations have mean 4 and variance 2. A value 7 was recorded as 2. Find the correct mean and variance.",
        steps: [
          "Recorded: \\(\\sum x=20\\), \\(\\sum x^2=5(2+16)=90\\).",
          "Corrected: \\(\\sum x=25\\), \\(\\sum x^2=90-4+49=135\\).",
          "\\(\\bar x=5\\), \\(\\sigma^2=\\frac{135}{5}-25\\).",
        ],
        answer: "Mean \\(5\\), variance \\(2\\).",
      },
      practiceSet: [
        { prompt: "Ten values have mean 20; a 30 was read as 20. Correct mean?", answer: "\\(21\\)" },
        { prompt: "\\(\\sum x^2=500\\); a 4 was read as 6. Correct \\(\\sum x^2\\)?", answer: "\\(480\\)" },
        { prompt: "Four values have mean 15; the value 15 is dropped. New mean?", answer: "\\(15\\)" },
        { prompt: "A correction changes the mean. Can the old variance be kept?", answer: "No; rebuild \\(\\sum x^2\\) and recompute" },
      ],
      pyqExampleId: "76be30ee-3b29-48c4-80bc-732e34bc9f0e", // 2026 — one value alpha replaced by beta, new mean and variance given
      traps: [
        {
          title: "Rebuild the totals from the wrong data",
          body: "The given mean and variance belong to the wrong data, so \\(\\sum x^2=n(\\sigma^2+\\bar x^2)\\) must use the recorded mean. Correct the totals after that, never the mean first.",
        },
      ],
    },

    // C2 — combining two groups
    {
      kind: "formula" as const,
      slug: "jstat-combine",
      name: "Combining two groups",
      intuition:
        "Two groups put together simply add their totals: \\(\\sum x\\) and \\(\\sum x^2\\) add. In formula form, the combined variance is the weighted average of the group variances plus the spread of the group means about the combined mean. If a group is shifted first, only its mean moves; its variance stays.",
      definition:
        "- \\(\\bar x=\\frac{n_1\\bar x_1+n_2\\bar x_2}{n_1+n_2}\\).\n" +
        "- \\(\\sigma^2=\\frac{n_1(\\sigma_1^2+d_1^2)+n_2(\\sigma_2^2+d_2^2)}{n_1+n_2}\\), where \\(d_i=\\bar x_i-\\bar x\\).\n" +
        "- The same as the formula below, which needs no combined mean.\n" +
        "- A shifted group: shift its mean, keep its variance.",
      formula: {
        label: "Combined variance",
        latex: "\\sigma^2=\\frac{n_1\\sigma_1^2+n_2\\sigma_2^2}{n_1+n_2}+\\frac{n_1n_2\\left(\\bar x_1-\\bar x_2\\right)^2}{\\left(n_1+n_2\\right)^2}",
      },
      authoredExample: {
        prompt: "Group A has 5 values with mean 10 and variance 4. Group B has 15 values with mean 14 and variance 8. Find the mean and variance of all 20.",
        steps: [
          "\\(\\bar x=\\frac{50+210}{20}=13\\).",
          "\\(\\sigma^2=\\frac{5(4)+15(8)}{20}+\\frac{5\\cdot15\\cdot16}{400}=7+3\\).",
        ],
        answer: "Mean \\(13\\), variance \\(10\\).",
      },
      selfCheckExample: {
        prompt: "Two groups of 10 have means 4 and 8, and each has variance 5. Find the variance of all 20.",
        steps: [
          "The combined mean is 6, so \\(d_1=-2\\), \\(d_2=2\\).",
          "\\(\\sigma^2=\\frac{10(5+4)+10(5+4)}{20}\\).",
        ],
        answer: "\\(9\\).",
      },
      practiceSet: [
        { prompt: "Groups of 3 and 7 with means 10 and 20: combined mean?", answer: "\\(17\\)" },
        { prompt: "Equal groups, both with mean 5, variances 2 and 6: combined variance?", answer: "\\(4\\)" },
        { prompt: "Add 3 to every value of one group: its variance?", answer: "Unchanged" },
        { prompt: "Two groups of 4, means 1 and 5, both variance 0: combined variance?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "7b8d8d97-0eb6-40fb-85fa-30fd0dc5b17e", // 2026 — variance of two sets put together
      traps: [
        {
          title: "Group variances do not simply average",
          body: "Averaging \\(\\sigma_1^2\\) and \\(\\sigma_2^2\\) misses the gap between the group means. The extra term \\(\\frac{n_1n_2}{N^2}(\\bar x_1-\\bar x_2)^2\\) is zero only when the means are equal.",
        },
      ],
    },
  ],
};
