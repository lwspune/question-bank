import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Algebra, Ch. 6 Statistics. Statements checked against the
 * Balbharati Mathematics Part I text; formulas rebuilt (the book's text loses
 * its notation); most-asked years and marks from the board past-paper
 * questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Algebra",
  subjectRoute: "algebra",
  chapterName: "Statistics",
  chapterSlug: "statistics",
  source: "Balbharati Mathematics Part I Std X (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Measure of central tendency",
      text: "Scores tend to cluster around a particular score, a representative number of the group. That number is a measure of central tendency: the mean, median or mode.",
    },
    {
      term: "Class mark",
      text: "The middle value of a class: \\(\\frac{\\text{lower limit} + \\text{upper limit}}{2}\\). Making the classes continuous does not change the class marks (6-10 and 5.5-10.5 both have class mark 8).",
    },
    {
      term: "Continuous classes",
      text: "If the given classes are not continuous (like 1-5, 6-10), make them continuous first (0.5-5.5, 5.5-10.5) to find the median or mode, or to draw a histogram.",
    },
    {
      term: "Assumed mean method",
      text: "When \\(x_i f_i\\) are large, take an assumed mean A (generally the class mark of the class with the **maximum frequency**), find deviations \\(d_i = x_i - A\\), and add their mean to A. It reduces the calculations.",
    },
    {
      term: "Step deviation method",
      text: "Reduces the calculations still further: divide every \\(d_i\\) by \\(g\\), the G.C.D. of all \\(d_i\\) (usually the class width), to get \\(u_i = \\frac{d_i}{g}\\).",
    },
    {
      term: "Median class",
      text: "Make a 'less than' cumulative frequency column. The class which contains the \\(\\frac{N}{2}\\)th score is the **median class**. The formula gives only an approximate median for grouped data.",
    },
    {
      term: "Mode and modal class",
      text: "The mode is the score repeating the maximum number of times. For grouped data, the class with the **maximum frequency** is the modal class, and the mode is estimated by a formula.",
    },
    {
      term: "Choosing a measure",
      text: "Choose by purpose: to know the colour of chalk in maximum demand, a group needs the **mode**.",
    },
    {
      term: "Histogram",
      text: "Classes on the X-axis and frequencies on the Y-axis, each with a proper scale. On each class as base, draw a rectangle with height proportional to its frequency. A kink mark shows that no observations lie before the first class.",
    },
    {
      term: "Frequency polygon",
      text: "Joins the mid-points of the tops of the histogram's rectangles, with one zero-height class added before the first and after the last. It can also be drawn without a histogram, by plotting (class mark, frequency).",
    },
    {
      term: "Pie diagram",
      text: "Every component of the data is shown by a sector of a circle. The central angle of each sector is in proportion to the number of scores in that component; all angles add up to 360°.",
    },
  ],
  formulas: [
    { label: "Class mark", latex: "x_i = \\frac{\\text{lower limit} + \\text{upper limit}}{2}" },
    { label: "Mean: direct method", latex: "\\bar{X} = \\frac{\\sum f_i x_i}{\\sum f_i}" },
    { label: "Mean: assumed mean method", latex: "d_i = x_i - A \\qquad \\bar{d} = \\frac{\\sum f_i d_i}{\\sum f_i} \\qquad \\bar{X} = A + \\bar{d}" },
    { label: "Mean: step deviation method", latex: "u_i = \\frac{x_i - A}{g} \\qquad \\bar{u} = \\frac{\\sum f_i u_i}{\\sum f_i} \\qquad \\bar{X} = A + \\bar{u}\\,g" },
    {
      label: "Median of grouped data",
      latex: "\\text{Median} = L + \\left[\\frac{\\frac{N}{2} - cf}{f}\\right] \\times h",
      symbols: [
        { symbol: "L", meaning: "lower class limit of the median class" },
        { symbol: "N", meaning: "sum of frequencies" },
        { symbol: "cf", meaning: "cumulative frequency of the class before the median class" },
        { symbol: "f, h", meaning: "frequency and class interval of the median class" },
      ],
    },
    {
      label: "Mode of grouped data",
      latex: "\\text{Mode} = L + \\left[\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right] \\times h",
      symbols: [
        { symbol: "L, h", meaning: "lower class limit and class interval of the modal class" },
        { symbol: "f1", meaning: "frequency of the modal class" },
        { symbol: "f0, f2", meaning: "frequencies of the classes before and after the modal class" },
      ],
    },
    { label: "Central angle of a sector", latex: "\\theta = \\frac{\\text{number of scores in the component}}{\\text{total number of scores}} \\times 360^\\circ" },
    { label: "Central angle from a percentage", latex: "\\theta = \\frac{\\text{percentage}}{100} \\times 360^\\circ" },
  ],
  derivations: [
    {
      title: "Find the median of grouped data (method)",
      steps: [
        "Make the classes continuous if needed, and write the 'less than' cumulative frequencies.",
        "Find \\(\\frac{N}{2}\\); the first class whose cumulative frequency reaches it is the median class.",
        "Read \\(L\\), \\(cf\\) (of the class before), \\(f\\) and \\(h\\), and put them in the formula.",
      ],
    },
    {
      title: "Find the mode of grouped data (method)",
      steps: [
        "Make the classes continuous if needed. The class with the maximum frequency is the modal class.",
        "Read \\(L\\), \\(h\\), \\(f_1\\), and \\(f_0\\), \\(f_2\\) of the classes before and after it.",
        "Example: \\(L = 10\\), \\(f_1 = 70\\), \\(f_0 = 58\\), \\(f_2 = 42\\), \\(h = 2\\): Mode \\(= 10 + \\frac{12}{40} \\times 2 = 10.6\\).",
      ],
    },
    {
      title: "Draw a histogram (method)",
      steps: [
        "If the classes are not continuous, make them continuous (extended class intervals).",
        "Show the classes on the X-axis and the frequencies on the Y-axis, each with a proper scale.",
        "On each class as base, draw a rectangle with height equal to its frequency; use a kink mark if the first class is far from 0.",
      ],
    },
    {
      title: "Draw a frequency polygon (method)",
      steps: [
        "With a histogram: mark the mid-point of the top of each rectangle.",
        "Add a class of zero frequency before the first class and after the last, and mark their mid-points on the X-axis.",
        "Join all the mid-points in order with line segments. Without a histogram, plot (class mark, frequency) and join the same way.",
      ],
    },
    {
      title: "Draw a pie diagram (method)",
      steps: [
        "Find the central angle of each component: (its scores ÷ total) × 360°. Check that the angles add up to 360°.",
        "Draw a circle of suitable radius and a radius as the starting line.",
        "Draw each angle at the centre with a protractor, one after another, and name each sector.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Histogram",
      labels: ["classes on the X-axis", "frequencies on the Y-axis", "scale for each axis", "kink mark near the origin", "touching rectangles"],
    },
    {
      title: "Frequency polygon",
      labels: ["class marks on the X-axis", "frequencies on the Y-axis", "mid-points of the rectangle tops", "zero-frequency classes at both ends", "closed figure"],
    },
    {
      title: "Pie diagram",
      labels: ["circle with centre O", "sector for each component", "central angle in each sector", "name of each component"],
    },
  ],
  mostAsked: [
    { topic: "Pie diagram: find the central angles and draw it, or read values from one", marks: 3, years: [2026, 2025, 2024, 2023, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Mean by the direct, assumed mean or step deviation method", marks: 2, years: [2026, 2025, 2024, 2023, 2020, 2018, 2017, 2016] },
    { topic: "Median of grouped data (median class, less than cumulative frequency)", years: [2026, 2025, 2024, 2023, 2019, 2017] },
    { topic: "Draw a histogram (make the classes continuous first)", marks: 3, years: [2026, 2025, 2024, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Mode of grouped data, or the modal class", marks: 3, years: [2026, 2024, 2020, 2019] },
    { topic: "Draw a frequency polygon", marks: 4, years: [2026, 2024, 2023, 2016] },
    { topic: "Class mark of a class", marks: 1, years: [2025, 2017, 2016] },
  ],
  mistakes: [
    {
      title: "Not making the classes continuous",
      body: "For classes like 1-5, 6-10, the median, mode and histogram need 0.5-5.5, 5.5-10.5. Then L is 5.5, not 6.",
    },
    {
      title: "Wrong cf in the median formula",
      body: "cf is the cumulative frequency of the class **before** the median class, and f is the median class's own frequency, not its cumulative frequency.",
    },
    {
      title: "Mixing up f0 and f2 in the mode formula",
      body: "f0 is the class before the modal class and f2 the class after it. The denominator is \\(2f_1 - f_0 - f_2\\).",
    },
    {
      title: "Forgetting to add A back",
      body: "In the assumed mean and step deviation methods, \\(\\bar{d}\\) or \\(\\bar{u}g\\) is not the mean. The mean is \\(A + \\bar{d}\\).",
    },
    {
      title: "An open frequency polygon",
      body: "Add a zero-frequency class at each end so the polygon closes on the X-axis.",
    },
    {
      title: "Central angles that do not add up to 360°",
      body: "Add your angles before drawing. A 40% share is \\(\\frac{40}{100} \\times 360^\\circ = 144^\\circ\\).",
    },
  ],
};

export default sheet;
