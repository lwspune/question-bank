import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 13 Statistics. Statements checked against the NCERT
 * Class 10 text (rationalised); formulas rebuilt; most-asked years and marks
 * from the CBSE board past-paper questions in the bank, 2022-2026. The
 * empirical relation between mean, median and mode is not in the rationalised
 * text but was set from 2023 to 2026, so it stays as a standard result.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Statistics",
  chapterSlug: "statistics",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 13",
  keyPoints: [
    {
      term: "Class mark",
      text: "The mid-point (class mark) of each class represents the observations in it: class mark \\(= \\frac{\\text{upper limit} + \\text{lower limit}}{2}\\). These are the \\(x_i\\).",
    },
    {
      term: "Three methods for the mean",
      text: "Direct, assumed mean and step-deviation methods all give the **same** mean. The assumed mean and step-deviation methods are just simplified forms of the direct method.",
    },
    {
      term: "When to use step deviation",
      text: "Use step deviation when the \\(d_i = x_i - a\\) are large and have a common factor \\(h\\): \\(u_i = \\frac{x_i - a}{h}\\).",
    },
    {
      term: "Modal class",
      text: "In grouped data, locate the class with the **maximum frequency**: the modal class. The mode is a value inside it, given by the formula.",
    },
    {
      term: "Median",
      text: "The median is the value of the middle-most observation. For ungrouped data in order: the \\(\\left(\\frac{n + 1}{2}\\right)\\)th value if \\(n\\) is odd; the mean of the \\(\\frac{n}{2}\\)th and \\(\\left(\\frac{n}{2} + 1\\right)\\)th if \\(n\\) is even.",
    },
    {
      term: "Cumulative frequency",
      text: "Add the frequencies of all classes up to and including a class. 'Less than' type uses upper limits; 'more than' type uses lower limits.",
    },
    {
      term: "Median class",
      text: "Find \\(\\frac{n}{2}\\). The median class is the class whose cumulative frequency is greater than (and nearest to) \\(\\frac{n}{2}\\).",
    },
    {
      term: "Meaning of the median",
      text: "A median of 28.5 marks means about 50% of students scored less than 28.5 and the other 50% more than 28.5.",
    },
  ],
  formulas: [
    { label: "Mean: direct method", latex: "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}" },
    { label: "Mean: assumed mean method", latex: "\\bar{x} = a + \\frac{\\sum f_i d_i}{\\sum f_i}, \\qquad d_i = x_i - a" },
    { label: "Mean: step-deviation method", latex: "\\bar{x} = a + h \\times \\frac{\\sum f_i u_i}{\\sum f_i}, \\qquad u_i = \\frac{x_i - a}{h}" },
    {
      label: "Mode",
      latex: "\\text{Mode} = l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right) \\times h",
      symbols: [
        { symbol: "l", meaning: "lower limit of the modal class" },
        { symbol: "f1, f0, f2", meaning: "frequency of the modal class, the class before it, the class after it" },
        { symbol: "h", meaning: "class size" },
      ],
    },
    {
      label: "Median",
      latex: "\\text{Median} = l + \\left(\\frac{\\frac{n}{2} - cf}{f}\\right) \\times h",
      symbols: [
        { symbol: "l", meaning: "lower limit of the median class" },
        { symbol: "cf", meaning: "cumulative frequency of the class before the median class" },
        { symbol: "f", meaning: "frequency of the median class" },
        { symbol: "n", meaning: "total of the frequencies" },
      ],
    },
    { label: "Empirical relation (standard result)", latex: "3\\,\\text{Median} = \\text{Mode} + 2\\,\\text{Mean}" },
    { label: "Deviations from the mean", latex: "\\sum f_i (x_i - \\bar{x}) = 0" },
  ],
  derivations: [
    {
      title: "Median of grouped data (method)",
      steps: [
        "Make the classes continuous if needed (for 1-5, 6-10 use 0.5-5.5, 5.5-10.5).",
        "Write the cumulative frequency column. Find \\(n = \\sum f_i\\) and \\(\\frac{n}{2}\\).",
        "The median class has the first cf greater than \\(\\frac{n}{2}\\). Note \\(l\\), \\(f\\), \\(h\\) and the cf of the class before it.",
        "Median \\(= l + \\left(\\frac{\\frac{n}{2} - cf}{f}\\right) \\times h\\). Give the unit.",
      ],
    },
    {
      title: "Mode of grouped data (method)",
      steps: [
        "Find the modal class: the class with the highest frequency \\(f_1\\).",
        "Note \\(l\\), \\(h\\), \\(f_0\\) (class before) and \\(f_2\\) (class after).",
        "Mode \\(= l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right) \\times h\\).",
      ],
    },
    {
      title: "Find the missing frequencies x and y when the median and the total frequency are given",
      steps: [
        "Write the cf column in terms of \\(x\\) and \\(y\\). The total gives one equation, for example \\(x + y = 15\\).",
        "From the given median, name the median class; write its \\(l\\), \\(f\\), \\(cf\\) (cf contains \\(x\\)).",
        "Put them in the median formula and solve for \\(x\\); then find \\(y\\) from the first equation.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Find two of mean, median and mode of a grouped frequency distribution (real data: ages, incomes, heights)", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Case study: mean, modal class, median class or a count read from a table", marks: 2, years: [2025, 2024, 2023, 2022] },
    { topic: "Basic facts (MCQ): mean of ungrouped data, adding a constant to every value, cumulative frequency, modal or median class", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Empirical relation: find the mode, median or mean from the other two", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Missing frequency when the mean or the mode is given", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Missing frequencies x and y when the median and the total are given", marks: 5, years: [2026, 2025, 2022] },
  ],
  mistakes: [
    {
      title: "Wrong cf in the median formula",
      body: "cf is the cumulative frequency of the class **before** the median class, not of the median class itself.",
    },
    {
      title: "Wrong f0 and f2 in the mode formula",
      body: "\\(f_0\\) is the class just before the modal class and \\(f_2\\) just after. The lower limit \\(l\\) is of the **modal** class.",
    },
    {
      title: "Classes not continuous",
      body: "For classes like 10-19, 20-29, subtract 0.5 from each lower limit and add 0.5 to each upper limit before using the median or mode formula.",
    },
    {
      title: "Empirical relation upside down",
      body: "\\(\\text{Mode} = 3\\,\\text{Median} - 2\\,\\text{Mean}\\). Mean 43, median 40 gives mode \\(120 - 86 = 34\\).",
    },
    {
      title: "Adding a constant to every value",
      body: "If every value is increased by 3, the mean, median and mode all increase by 3. Multiplying every value by \\(k\\) multiplies each of them by \\(k\\).",
    },
  ],
};

export default sheet;
