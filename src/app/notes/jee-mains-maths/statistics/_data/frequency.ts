import type { SubtopicNote } from "@/app/notes/_types";

export const FREQUENCY_STAT_NOTE: SubtopicNote = {
  subtopicName: "Frequency Distributions",
  title: "Frequency Distributions",
  oneLineDefinition:
    "Mean, variance and median of data given as a frequency table, with single values or classes, including an unknown frequency and the mean deviation of a table.",
  whyItMatters:
    "Seventeen PYQs, eleven of them multiple choice, and four from 2026. Twelve find the mean or variance of a table, or an unknown frequency in it — two of these are probability distributions read the same way; five find the median of a table or its mean deviation. Two ideas cover the page.",
  concepts: [
    // C1 — mean and variance of a frequency table
    {
      kind: "formula" as const,
      slug: "jstat-freq",
      name: "Mean and variance of a frequency table",
      intuition:
        "A frequency table is a list with repeats. The total \\(N=\\sum f_i\\), and the sums \\(\\sum f_ix_i\\) and \\(\\sum f_ix_i^2\\) take the place of \\(\\sum x\\) and \\(\\sum x^2\\). For classes, each class is read as its midpoint. An unknown frequency sits in \\(N\\) as well as in the sums, so the equation for it is often a quadratic. A probability distribution is the same table with \\(N=1\\).",
      definition:
        "- \\(N=\\sum f_i\\), \\(\\bar x=\\frac{1}{N}\\sum f_ix_i\\).\n" +
        "- \\(\\sigma^2=\\frac{1}{N}\\sum f_ix_i^2-\\bar x^2\\).\n" +
        "- Classes: \\(x_i\\) is the class mark (midpoint).\n" +
        "- Probabilities: \\(\\mu=\\sum p_ix_i\\), \\(\\sigma^2=\\sum p_ix_i^2-\\mu^2\\).\n" +
        "- Shifting to \\(d_i=x_i-a\\) keeps the numbers small and the variance the same.",
      formula: {
        label: "Frequency table",
        latex: "\\bar x=\\frac{\\sum f_ix_i}{\\sum f_i},\\qquad \\sigma^2=\\frac{\\sum f_ix_i^2}{\\sum f_i}-\\bar x^2",
      },
      authoredExample: {
        prompt: "Find the variance of the values \\(1,2,3,4\\) with frequencies \\(2,3,4,1\\).",
        steps: [
          "\\(N=10\\), \\(\\sum fx=2+6+12+4=24\\), so \\(\\bar x=2.4\\).",
          "\\(\\sum fx^2=2+12+36+16=66\\).",
          "\\(\\sigma^2=6.6-2.4^2=6.6-5.76\\).",
        ],
        answer: "\\(0.84\\).",
      },
      selfCheckExample: {
        prompt: "\\(X\\) takes the values \\(0,1,2\\) with probabilities \\(\\frac14,\\frac12,\\frac14\\). Find its variance.",
        steps: [
          "\\(\\mu=0+\\frac12+\\frac12=1\\).",
          "\\(\\sum p x^2=0+\\frac12+1=\\frac32\\), so \\(\\sigma^2=\\frac32-1\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      practiceSet: [
        { prompt: "Values \\(2,4\\) with frequencies \\(3,1\\): mean?", answer: "\\(2.5\\)" },
        { prompt: "Class mark of the class \\(10-20\\)?", answer: "\\(15\\)" },
        { prompt: "Values \\(0,1\\) with frequencies \\(k,3\\) have mean \\(0.5\\): \\(k\\)?", answer: "\\(3\\)" },
        { prompt: "Values \\(0,2\\), each with frequency 1: variance?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "3b31d6ab-dbd0-4091-84f0-bb3fabaa04c2", // 2026 — unknown class frequency k from a mean of 21
      traps: [
        {
          title: "The unknown frequency is in N too",
          body: "When a frequency is \\(k\\), the total \\(N=\\sum f_i\\) also contains \\(k\\). Clear the fraction before solving; if the equation is a quadratic, keep only the root that is a whole, non-negative frequency.",
        },
      ],
    },

    // C2 — median and mean deviation of a table
    {
      kind: "formula" as const,
      slug: "jstat-freq-median",
      name: "Median and mean deviation of a table",
      intuition:
        "For the median, run the cumulative frequencies until they reach \\(\\frac N2\\). With single values, that value is the median. With classes, the median lies inside that class, and you place it by the fraction of the class still needed. For the mean deviation, weight each distance \\(|x_i-A|\\) by its frequency.",
      definition:
        "- Single values: the median is where the cumulative frequency first reaches \\(\\frac N2\\) (average the two middle values when \\(N\\) is even and they differ).\n" +
        "- Classes: \\(l\\) is the lower limit of the median class, \\(F\\) the cumulative frequency before it, \\(f\\) its frequency, \\(h\\) its width.\n" +
        "- Mean deviation about \\(A\\): \\(\\frac{1}{N}\\sum f_i|x_i-A|\\).",
      formula: {
        label: "Grouped median",
        latex: "M=l+\\frac{\\frac{N}{2}-F}{f}\\times h",
      },
      authoredExample: {
        prompt: "The classes \\(0-10\\), \\(10-20\\), \\(20-30\\), \\(30-40\\) have frequencies \\(5,8,4,3\\). Find the median.",
        steps: [
          "\\(N=20\\), \\(\\frac N2=10\\). Cumulative frequencies: \\(5,13,\\ldots\\), so the median class is \\(10-20\\).",
          "\\(M=10+\\frac{10-5}{8}\\times10=10+6.25\\).",
        ],
        answer: "\\(16.25\\).",
      },
      selfCheckExample: {
        prompt: "The values \\(1,2,3,4,5\\) have frequencies \\(1,2,4,2,1\\). Find the mean deviation about the median.",
        steps: [
          "\\(N=10\\); cumulative frequencies \\(1,3,7\\), so the 5th and 6th values are both 3: the median is 3.",
          "\\(\\sum f|x-3|=1(2)+2(1)+4(0)+2(1)+1(2)=8\\).",
        ],
        answer: "\\(0.8\\).",
      },
      practiceSet: [
        { prompt: "Values \\(1,2,3\\) with frequencies \\(2,5,3\\): median?", answer: "\\(2\\)" },
        { prompt: "Median class \\(20-30\\), \\(N=40\\), \\(F=12\\), \\(f=16\\): median?", answer: "\\(25\\)" },
        { prompt: "Values \\(0,4\\), each with frequency 1: MD about the mean?", answer: "\\(2\\)" },
        { prompt: "\\(N=50\\): the median class is the first whose cumulative frequency reaches?", answer: "\\(25\\)" },
      ],
      pyqExampleId: "08a865cc-5614-4dd1-bbec-013ef70b1fdb", // 2026 — mean deviation about the mean of a discrete table
      traps: [
        {
          title: "F stops before the median class",
          body: "In the grouped median, \\(F\\) is the cumulative frequency of the classes before the median class, not up to and including it. Using the larger figure puts the median too low.",
        },
      ],
    },
  ],
};
