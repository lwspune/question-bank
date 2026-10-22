import type { SubtopicNote } from "@/app/notes/_types";

export const AF_ST_MEDIAN_NOTE: SubtopicNote = {
  subtopicName: "Median, Mode and Comparing Averages",
  title: "Median, Mode and Comparing the Averages",
  oneLineDefinition:
    "Find the median and mode of a list and of grouped data, use the geometric mean, link the averages by the empirical relation, and choose the right average for the data.",
  whyItMatters:
    "This is the chapter's biggest page, more than half of it MODERATE, and it holds the chapter's only HARD question. The marks are in the grouped formulas: the median needs the cumulative frequency before the median class, the mode needs the classes on both sides of the modal class, and most slips come from using the formula on the wrong class.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afst-median-mode-list",
      name: "Median and mode of a list",
      intuition:
        "The median is the middle value once the data are in order; the mode is the value that occurs most often. Neither needs the size of every value: the median needs positions and the mode needs counts.",
      definition:
        "- Put the data in order first.\n" +
        "- For \\(n\\) values with \\(n\\) odd, the median is the \\(\\tfrac{n + 1}{2}\\)th value. With \\(n\\) even, it is the mean of the \\(\\tfrac n2\\)th and \\(\\left(\\tfrac n2 + 1\\right)\\)th values.\n" +
        "- In a frequency table, keep a running total of the frequencies (the **cumulative frequency**) to see which value holds the middle position.\n" +
        "- The **mode** is the value with the highest frequency. If two values tie for the highest, there are two modes; if every value occurs equally often, there is no mode.\n" +
        "- The median is not moved by extreme values, and it can be found even when the end values are unknown, as long as their number is known.",
      formula: {
        label: "Position of the median",
        latex: "\\text{median} = \\left(\\dfrac{n + 1}{2}\\right)^{\\text{th}} \\text{ value} \\quad (n \\text{ odd})",
      },
      authoredExample: {
        prompt: "Find the median and the mode of 12, 5, 14, 5, 11, 10, 5 and 13.",
        steps: [
          "In order: 5, 5, 5, 10, 11, 12, 13, 14. There are 8 values.",
          "The median is the mean of the 4th and 5th values: \\(\\dfrac{10 + 11}{2} = 10.5\\).",
          "5 occurs three times, more than any other value.",
        ],
        answer: "Median 10.5; mode 5.",
      },
      selfCheckExample: {
        prompt:
          "In a table the values 1, 2, 3 and 4 have frequencies 4, 7, \\(k\\) and 3, and the median is 2. Find the largest possible \\(k\\).",
        steps: [
          "The cumulative frequency reaches 11 at the value 2, and the total is \\(14 + k\\).",
          "The median stays 2 while every middle position is at most 11.",
          "\\(k = 7\\): 21 values, and the middle one is the 11th, which is 2.",
          "\\(k = 8\\): 22 values, and the 11th and 12th are 2 and 3, giving 2.5.",
        ],
        answer: "\\(k = 7\\).",
      },
      practiceSet: [
        { prompt: "Find the median of 13, 7, 21, 9, 15 and 11.", answer: "\\(12\\)" },
        { prompt: "Find the mode of 4, 6, 6, 7, 8, 8, 8 and 9.", answer: "\\(8\\)" },
        { prompt: "The data 2, 4, 6, \\(x\\), 10, 12 are in ascending order and their median is 7. Find \\(x\\).", answer: "\\(8\\)" },
        {
          prompt: "In a table the values 10, 20 and 30 have frequencies 5, 3 and \\(m\\), and the mode is 10. Find the largest possible \\(m\\).",
          answer: "\\(4\\)",
          method: "\\(m = 5\\) would make 30 a second mode.",
        },
      ],
      pyqExampleId: "37cd9644-49fd-402e-ab16-af989cf25332",
      traps: [
        {
          title: "Order the data first",
          body: "The middle of 8, 2, 5 as written is 2. In order the list is 2, 5, 8 and the median is 5.",
        },
        {
          title: "Equal counts mean no mode",
          body: "In 3, 3, 5, 5, 8, 8 every value occurs twice, so no value is more frequent than the others and the data have no mode.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-grouped-median",
      name: "Median of grouped data",
      intuition:
        "With grouped data the single values are not listed, so find the class that holds the middle position. Then assume the values in that class are spread evenly across it and go the right fraction of the way in.",
      definition:
        "- \\(N = \\sum f\\). The **median class** is the first class whose cumulative frequency reaches \\(\\tfrac N2\\).\n" +
        "- Median \\(= l + \\dfrac{\\tfrac N2 - F}{f} \\times h\\), where \\(l\\) is the lower boundary of the median class, \\(F\\) the cumulative frequency of the classes before it, \\(f\\) its own frequency and \\(h\\) its width.\n" +
        "- A missing frequency with the median given: put the median into the formula and solve for the frequency. The total frequency then gives any second missing one.",
      formula: {
        label: "Median of grouped data",
        latex: "M = l + \\dfrac{\\tfrac N2 - F}{f} \\times h",
      },
      authoredExample: {
        prompt: "The classes 0-10, 10-20, 20-30, 30-40 and 40-50 have frequencies 5, 8, 12, 10 and 5. Find the median.",
        steps: [
          "\\(N = 40\\), so \\(\\tfrac N2 = 20\\). The cumulative frequencies are 5, 13, 25, ...",
          "The median class is 20-30, with \\(F = 13\\), \\(f = 12\\) and \\(h = 10\\).",
          "\\(M = 20 + \\dfrac{20 - 13}{12} \\times 10 = 20 + 5.83 = 25.83\\).",
        ],
        answer: "About 25.83.",
      },
      selfCheckExample: {
        prompt: "The classes 10-20, 20-30, 30-40 and 40-50 have frequencies 6, \\(p\\), 15 and 9, and the median is 32. Find \\(p\\).",
        steps: [
          "\\(N = 30 + p\\). The median 32 lies in 30-40, with \\(F = 6 + p\\), \\(f = 15\\) and \\(h = 10\\).",
          "\\(30 + \\dfrac{\\tfrac{30 + p}{2} - (6 + p)}{15} \\times 10 = 32\\), so \\(\\dfrac{18 - p}{2} \\times \\dfrac{10}{15} = 2\\).",
          "\\(18 - p = 6\\), so \\(p = 12\\). Check: \\(N = 42\\), \\(F = 18\\), and \\(30 + \\tfrac{3}{15} \\times 10 = 32\\).",
        ],
        answer: "\\(p = 12\\).",
      },
      practiceSet: [
        {
          prompt: "The classes 0-5, 5-10, 10-15 and 15-20 have frequencies 4, 5, 8 and 3. Find the median.",
          answer: "\\(10.625\\)",
          method: "\\(10 + \\tfrac{10 - 9}{8} \\times 5\\).",
        },
        { prompt: "The classes 20-30, 30-40 and 40-50 have frequencies 3, 10 and 7. Find the median.", answer: "\\(37\\)" },
        {
          prompt: "In grouped data \\(N = 60\\), the median class is 40-50 with frequency 12, and 22 items lie below 40. Find the median.",
          answer: "\\(46\\tfrac 23\\)",
        },
      ],
      pyqExampleId: "4a45b9c7-62d8-49a3-9a6d-61b4c256743d",
      traps: [
        {
          title: "F is the count before the class",
          body: "\\(F\\) is the cumulative frequency of the classes below the median class. Including the median class's own frequency puts the median below its class.",
        },
        {
          title: "Grouped data use N over 2",
          body: "The grouped formula uses \\(\\tfrac N2\\), not \\(\\tfrac{N + 1}{2}\\). The \\(\\tfrac{n + 1}{2}\\) rule is for a list of single values.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-grouped-mode",
      name: "Mode of grouped data",
      intuition:
        "The **modal class** is the class with the highest frequency. Inside it, the mode leans towards whichever neighbouring class is bigger, and the formula measures how far it leans.",
      definition:
        "- Mode \\(= l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h\\), where \\(f_1\\) is the frequency of the modal class, \\(f_0\\) the class before it, \\(f_2\\) the class after it, \\(l\\) its lower boundary and \\(h\\) its width.\n" +
        "- The mode always lies inside the modal class, so a question asking which interval holds the mode needs only the highest frequency.\n" +
        "- To compare the modes of two distributions, find each modal class first. Often that alone decides.",
      formula: {
        label: "Mode of grouped data",
        latex: "Z = l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h",
      },
      authoredExample: {
        prompt: "The classes 0-10, 10-20, 20-30 and 30-40 have frequencies 6, 14, 22 and 10. Find the mode.",
        steps: [
          "The modal class is 20-30, with \\(f_1 = 22\\), \\(f_0 = 14\\), \\(f_2 = 10\\) and \\(h = 10\\).",
          "\\(Z = 20 + \\dfrac{22 - 14}{44 - 14 - 10} \\times 10 = 20 + \\dfrac{8}{20} \\times 10 = 24\\).",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "The classes 50-60, 60-70, 70-80 and 80-90 have frequencies 8, 20, 12 and 5. Find the mode.",
        steps: [
          "The modal class is 60-70, with \\(f_1 = 20\\), \\(f_0 = 8\\) and \\(f_2 = 12\\).",
          "\\(Z = 60 + \\dfrac{12}{40 - 8 - 12} \\times 10 = 60 + 6 = 66\\).",
        ],
        answer: "\\(66\\).",
      },
      practiceSet: [
        { prompt: "The classes 0-4, 4-8, 8-12 and 12-16 have frequencies 3, 9, 15 and 6. In which class does the mode lie?", answer: "8-12" },
        { prompt: "The classes 25-30, 30-35 and 35-40 have frequencies 7, 13 and 9. Find the mode.", answer: "\\(33\\)" },
        {
          prompt: "The modal class 30-40 has frequency 18, and the classes on either side of it have frequency 12 each. Find the mode.",
          answer: "\\(35\\)",
          method: "Equal neighbours put the mode at the middle of the class.",
        },
      ],
      pyqExampleId: "9ff278f5-08d4-4e61-bea2-e22202367f90",
      traps: [
        {
          title: "Both neighbours go in the denominator",
          body: "The denominator is \\(2f_1 - f_0 - f_2\\). With a modal frequency of 22 and neighbours 14 and 10 it is 20; using \\(f_1 - f_2 = 12\\) instead gives the wrong mode.",
        },
        {
          title: "The tallest class, not the middle one",
          body: "The modal class is the one with the highest frequency, wherever it sits in the table. The median class is a different class in most tables.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-gm-find-numbers",
      name: "Geometric mean, and numbers from their averages",
      intuition:
        "The geometric mean multiplies where the ordinary mean adds: the geometric mean of \\(n\\) positive numbers is the \\(n\\)th root of their product. When several averages of the same unknown numbers are given, each one is an equation, and together they fix the numbers.",
      definition:
        "- The geometric mean of \\(a\\) and \\(b\\) is \\(\\sqrt{ab}\\); of \\(a\\), \\(b\\) and \\(c\\) it is \\(\\sqrt[3]{abc}\\). So a geometric mean of 6 for three numbers means their product is 216.\n" +
        "- A list with each value repeated, such as \\(p, p, q, q\\), has the same geometric mean as \\(p, q\\): \\(\\sqrt[4]{p^2 q^2} = \\sqrt{pq}\\).\n" +
        "- The mean gives the sum, the geometric mean gives the product, and the median gives the middle value. Two numbers with a known sum and product are the roots of \\(t^2 - (\\text{sum})\\,t + \\text{product} = 0\\).\n" +
        "- For positive numbers the geometric mean is never more than the ordinary mean.",
      formula: {
        label: "Geometric mean",
        latex: "G = \\sqrt[n]{x_1 x_2 \\cdots x_n}",
      },
      authoredExample: {
        prompt: "The geometric mean of 5, 25 and \\(x\\) is 10. Find \\(x\\).",
        steps: [
          "The product must be \\(10^3 = 1000\\).",
          "\\(5 \\times 25 \\times x = 125x = 1000\\), so \\(x = 8\\).",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Four positive numbers \\(p, p, q, q\\) with \\(p < q\\) have mean 7.5 and geometric mean 6. Find \\(p\\) and \\(q\\).",
        steps: [
          "The mean: \\(\\dfrac{2p + 2q}{4} = 7.5\\), so \\(p + q = 15\\).",
          "The geometric mean: \\(\\sqrt{pq} = 6\\), so \\(pq = 36\\).",
          "\\(t^2 - 15t + 36 = 0\\) has roots 3 and 12.",
        ],
        answer: "\\(p = 3\\), \\(q = 12\\).",
      },
      practiceSet: [
        { prompt: "Find the geometric mean of 2, 8 and 32.", answer: "\\(8\\)", method: "The product is 512." },
        { prompt: "Find the geometric mean of 3 and 27.", answer: "\\(9\\)" },
        { prompt: "Two positive numbers have mean 13 and geometric mean 12. Find them.", answer: "8 and 18" },
        {
          prompt: "Five numbers in ascending order are 2, 4, \\(x\\), 9 and 11, and their mean equals their median. Find \\(x\\).",
          answer: "\\(6.5\\)",
          method: "\\(\\tfrac{26 + x}{5} = x\\).",
        },
      ],
      pyqExampleId: "eca65298-53b6-4112-822c-2b215d23356c",
      traps: [
        {
          title: "Multiply, do not add",
          body: "The geometric mean of 2 and 18 is \\(\\sqrt{36} = 6\\), not their ordinary mean 10.",
        },
        {
          title: "Adding to every value does not add to the geometric mean",
          body: "1 and 9 have geometric mean 3. Add 1 to each and 2 and 10 have geometric mean \\(\\sqrt{20} \\approx 4.47\\), not 4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-comparing-averages",
      name: "Mean, median and mode compared",
      intuition:
        "In a moderately lopsided distribution the three averages sit in a fixed pattern: the median lies between the mean and the mode, about a third of the way from the mean. That gives one relation linking all three, and it also tells you which average suits which kind of data.",
      definition:
        "- **Empirical relation**: Mode \\(= 3\\) Median \\(- 2\\) Mean. Given any two, it estimates the third.\n" +
        "- For symmetric data, mean, median and mode are equal.\n" +
        "- Which average suits which data: the **mode** for the most common size or choice (shoe or collar sizes); the **median** for lopsided data such as incomes, or for qualities that can be ranked but not measured; the **mean** when every value should count, such as marks.\n" +
        "- Adding \\(k\\) to every value adds \\(k\\) to the mean, the median, the mode and the **mid-range** (the mean of the largest and smallest values), but not to the geometric mean.\n" +
        "- The mean is pulled by extreme values and the median is not. The mean is not always above the median: it is above it only when the values run further on the high side.",
      formula: {
        label: "Empirical relation",
        latex: "\\text{Mode} = 3\\,\\text{Median} - 2\\,\\text{Mean}",
      },
      authoredExample: {
        prompt: "A distribution has mean 42 and median 40. Estimate its mode.",
        steps: ["Mode \\(= 3 \\times 40 - 2 \\times 42 = 120 - 84 = 36\\)."],
        answer: "\\(36\\).",
      },
      selfCheckExample: {
        prompt: "A distribution has mode 25 and median 28. Estimate its mean.",
        steps: ["\\(25 = 3 \\times 28 - 2 \\times \\text{Mean} = 84 - 2 \\times \\text{Mean}\\).", "So \\(2 \\times \\text{Mean} = 59\\)."],
        answer: "\\(29.5\\).",
      },
      practiceSet: [
        { prompt: "A distribution has mean 30 and mode 24. Estimate its median.", answer: "\\(28\\)", method: "\\(3M = 24 + 60\\)." },
        { prompt: "A distribution has mean 18.5 and median 18. Estimate its mode.", answer: "\\(17\\)" },
        { prompt: "Which average best describes the shoe size a shop sells most?", answer: "The mode." },
        { prompt: "Which average best describes the monthly incomes of a factory's workers, when a few earn far more than the rest?", answer: "The median." },
      ],
      pyqExampleId: "91fb1d9c-df41-4434-af23-101a5662a3db",
      traps: [
        {
          title: "3 times the median, 2 times the mean",
          body: "Mode \\(= 3\\) Median \\(- 2\\) Mean. Swapping the 3 and the 2 turns a mean of 42 and a median of 40 into a mode of 46 instead of 36.",
        },
        {
          title: "The mean is not always above the median",
          body: "In 2, 10, 12 the mean is 8 and the median 10. The mean is above the median only when the large values stretch further from the middle.",
        },
      ],
    },
  ],
};
