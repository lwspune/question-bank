import type { SubtopicNote } from "@/app/notes/_types";

export const DEVIATION_STAT_NOTE: SubtopicNote = {
  subtopicName: "Mean Deviation and Median",
  title: "Mean Deviation and Median",
  oneLineDefinition:
    "The mean deviation of a data set about its mean, its median or its mode, often after finding unknown values from the mean and variance.",
  whyItMatters:
    "Twelve PYQs, ten of them multiple choice, and three from 2026. Six ask for the mean deviation about the mean — four after finding unknown values from the mean and variance, two for runs of consecutive integers; six measure it about the median, or in one case the mode. Two ideas cover the page.",
  concepts: [
    // C1 — mean deviation about the mean
    {
      kind: "formula" as const,
      slug: "jstat-md-mean",
      name: "Mean deviation about the mean",
      intuition:
        "The mean deviation averages the distances \\(|x_i-\\bar x|\\). Unlike the variance, it has no shortcut through \\(\\sum x\\) and \\(\\sum x^2\\): you need the actual values. So when values are unknown, find them first from the mean and variance, then list the distances. For consecutive integers the distances are the same wherever the run starts.",
      definition:
        "- \\(\\text{MD}(\\bar x)=\\frac{1}{n}\\sum|x_i-\\bar x|\\).\n" +
        "- Unknown values: the mean gives their sum, the variance their sum of squares.\n" +
        "- \\(n\\) consecutive integers: \\(\\text{MD}=\\frac{n^2-1}{4n}\\) for odd \\(n\\), \\(\\frac{n}{4}\\) for even \\(n\\).\n" +
        "- Shifting the data leaves the MD unchanged; scaling by \\(k\\) multiplies it by \\(|k|\\).",
      formula: {
        label: "Mean deviation about the mean",
        latex: "\\text{MD}(\\bar x)=\\frac{1}{n}\\sum_{i=1}^{n}\\left|x_i-\\bar x\\right|",
      },
      authoredExample: {
        prompt: "The mean and variance of \\(2,4,6,a,b\\) are 5 and 4, with \\(a<b\\). Find the mean deviation about the mean.",
        steps: [
          "\\(a+b=25-12=13\\) and \\(a^2+b^2=5(4+25)-56=89\\).",
          "\\((b-a)^2=2(89)-169=9\\), so \\(a=5\\), \\(b=8\\).",
          "Distances from 5: \\(3,1,1,0,3\\), total \\(8\\).",
        ],
        answer: "\\(\\frac{8}{5}\\).",
      },
      selfCheckExample: {
        prompt: "Find the mean deviation about the mean of \\(1,2,\\ldots,9\\).",
        steps: [
          "The mean is 5; the distances are \\(4,3,2,1,0,1,2,3,4\\), total \\(20\\).",
          "Check: \\(\\frac{n^2-1}{4n}=\\frac{80}{36}\\).",
        ],
        answer: "\\(\\frac{20}{9}\\).",
      },
      practiceSet: [
        { prompt: "MD about the mean of \\(2,4,6\\)?", answer: "\\(\\frac{4}{3}\\)" },
        { prompt: "MD about the mean of \\(1,2,\\ldots,10\\)?", answer: "\\(2.5\\)" },
        { prompt: "Add 7 to every value: the MD?", answer: "Unchanged" },
        { prompt: "The MD of \\(x\\) is 2. The MD of \\(3x\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "25096134-52b7-42fa-8a8c-2bd7b4287993", // 2024 — a, b from mean 2 and variance 23, then MD about the mean
      traps: [
        {
          title: "The mean deviation is not the SD",
          body: "\\(\\frac{1}{n}\\sum|x_i-\\bar x|\\) and \\(\\sqrt{\\frac{1}{n}\\sum(x_i-\\bar x)^2}\\) are different numbers, and the MD is never larger than the SD. Do not square the distances or take a root.",
        },
      ],
    },

    // C2 — mean deviation about the median or mode
    {
      kind: "formula" as const,
      slug: "jstat-md-median",
      name: "Mean deviation about the median or the mode",
      intuition:
        "Sort the data first. The median is the middle value, or the average of the two middle values when \\(n\\) is even. Then add the distances from it. The total distance \\(\\sum|x_i-A|\\) is smallest when \\(A\\) is the median, so the MD about the median is never more than the MD about the mean. The mode, the most frequent value, is used the same way.",
      definition:
        "- Median: the middle of the sorted list; for even \\(n\\), the mean of the two middle values.\n" +
        "- \\(\\text{MD}(M)=\\frac{1}{n}\\sum|x_i-M|\\).\n" +
        "- \\(\\sum|x_i-A|\\) is least at \\(A=M\\).\n" +
        "- Mode: the most frequent value; the same formula with the mode as centre.",
      formula: {
        label: "Mean deviation about the median",
        latex: "\\text{MD}(M)=\\frac{1}{n}\\sum_{i=1}^{n}\\left|x_i-M\\right|",
      },
      authoredExample: {
        prompt: "Find the mean deviation about the median of \\(12,3,18,7,10,5\\).",
        steps: [
          "Sorted: \\(3,5,7,10,12,18\\); the median is \\(\\frac{7+10}{2}=8.5\\).",
          "Distances: \\(5.5,3.5,1.5,1.5,3.5,9.5\\), total \\(25\\).",
        ],
        answer: "\\(\\frac{25}{6}\\).",
      },
      selfCheckExample: {
        prompt: "Find the mean deviation about the mode of \\(1,3,3,6,7\\).",
        steps: [
          "The mode is 3; the distances are \\(2,0,0,3,4\\), total \\(9\\).",
        ],
        answer: "\\(\\frac{9}{5}\\).",
      },
      practiceSet: [
        { prompt: "Median of \\(4,1,9,6\\)?", answer: "\\(5\\)" },
        { prompt: "MD about the median of \\(1,2,3,4,5\\)?", answer: "\\(\\frac{6}{5}\\)" },
        { prompt: "MD about the median of \\(k,2k,3k\\) with \\(k>0\\)?", answer: "\\(\\frac{2k}{3}\\)" },
        { prompt: "Can the MD about the median exceed the MD about the mean?", answer: "No" },
      ],
      pyqExampleId: "9ff3174d-c5c6-4d41-87d7-c1d9aed87b16", // 2026 — two missing values from mean and variance, then MD about the median
      traps: [
        {
          title: "Sort before you pick the median",
          body: "The median is the middle of the sorted list, not of the list as printed. With unknown values, first decide where they fall in the order; each case can give a different answer.",
        },
      ],
    },
  ],
};
