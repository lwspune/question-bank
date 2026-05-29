import type { SubtopicNote } from "@/app/notes/_types";

export const FREQUENCY_DISTRIBUTIONS_NOTE: SubtopicNote = {
  subtopicName: "Frequency Distributions and Graphical Representation",
  title: "Frequency Distributions and Graphical Representation",
  oneLineDefinition:
    "How to organise raw data into class intervals + frequencies, and which graph (histogram, polygon, ogive, pie chart) tells the story best.",
  whyItMatters:
    "14 PYQs across 2017–2025 — small subtopic but reliable scoring territory. " +
    "Three shapes dominate: picking the right graph for given data, computing a histogram class's relative height when widths are unequal, " +
    "and reading values straight off a frequency table (mode, cumulative count, median).",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "histograms-polygons-ogives",
      name: "Histograms, Frequency Polygons & Ogives",
      intuition:
        "A histogram is bars whose AREA represents frequency — so when class widths are unequal, the bar height must be frequency divided by class width (frequency density), not raw frequency. " +
        "Connecting the midpoints of histogram tops gives a frequency polygon. Plotting cumulative frequency against class boundaries gives an ogive — used to read the median directly.",
      definition:
        "Histogram bars have width = class width and height = \\(\\text{frequency density}\\). For equal class widths, density is proportional to raw frequency. " +
        "An ogive is a cumulative-frequency curve; the value of \\(x\\) at which the ogive equals \\(n/2\\) is the median.",
      formula: {
        label: "Frequency Density (for unequal class widths)",
        latex: "\\text{Density} = \\dfrac{\\text{Frequency}}{\\text{Class width}}",
        symbols: [
          { symbol: "Class width", meaning: "upper bound − lower bound of the class" },
        ],
      },
      visualizationSlug: "histogram-bin-slider",
      authoredExample: {
        prompt:
          "Three classes have widths 5, 10, 5 with frequencies 30, 50, 25. Find the height of each histogram bar (relative).",
        steps: [
          "Density = frequency / class width.",
          "Class 1: \\(30 / 5 = 6\\).",
          "Class 2: \\(50 / 10 = 5\\).",
          "Class 3: \\(25 / 5 = 5\\).",
          "Heights are in ratio 6 : 5 : 5 — note class 2 has the highest frequency but NOT the tallest bar.",
        ],
        answer: "Heights = 6, 5, 5 (in density units)",
      },
      selfCheckExample: {
        prompt:
          "Two classes have widths 5 and 10 with frequencies 25 and 40. Compare " +
          "the heights of their histogram bars.",
        steps: [
          "Density: \\(25/5 = 5\\) and \\(40/10 = 4\\).",
          "Despite having the lower frequency, the first class has the TALLER bar (height 5 > 4) — because its width is smaller.",
        ],
        answer: "Heights 5 and 4 — first class is taller despite lower frequency.",
      },
      practiceSet: [
        { prompt: "Frequency \\(20\\), class width \\(5\\). Density?", answer: "\\(4\\)", method: "\\(20/5\\)" },
        { prompt: "Frequency \\(30\\), class width \\(10\\). Density?", answer: "\\(3\\)" },
        { prompt: "Two classes have equal frequency, widths \\(5\\) and \\(10\\). Which bar is taller?", answer: "the width-\\(5\\) bar", method: "smaller width \\(\\Rightarrow\\) taller" },
        { prompt: "Frequency \\(7\\), class width \\(1\\). Density?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "d8cb68fd-9555-48d0-b0ff-7a05b3e947d0",
      traps: [
        {
          title: "Bar height \\(\\neq\\) frequency when class widths differ",
          body:
            "If two classes have the same frequency but different widths, the wider class has the SHORTER bar — because density (height) divides frequency by width. " +
            "Students draw bars of equal height for equal frequencies; correct histograms make AREAS equal, not heights.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "pie-charts",
      name: "Pie Charts",
      intuition:
        "A pie chart shows how a whole is split into parts. Each part's sector angle is proportional to its share of the total — and all the sector angles together must add to \\(360^\\circ\\).",
      definition:
        "For a category with frequency \\(f_i\\) and total frequency \\(\\sum f_i = N\\), the sector angle is \\(\\theta_i = \\dfrac{f_i}{N} \\times 360^\\circ\\). " +
        "Equivalently, the angle is proportional to the frequency, with proportionality constant \\(360/N\\).",
      formula: {
        label: "Sector Angle in a Pie Chart",
        latex: "\\theta_i = \\dfrac{f_i}{N} \\times 360^\\circ \\qquad \\sum_i \\theta_i = 360^\\circ",
        symbols: [
          { symbol: "\\(f_i\\)", meaning: "frequency / count of category \\(i\\)" },
          { symbol: "\\(N\\)", meaning: "total frequency \\(\\sum f_i\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A company has 30 Science, 70 Arts and 50 Commerce graduates. Find the pie-chart angle for Science.",
        steps: [
          "Total \\(N = 30 + 70 + 50 = 150\\).",
          "Apply the formula: \\(\\theta_{\\text{Science}} = \\dfrac{30}{150} \\times 360^\\circ\\).",
          "Simplify: \\(\\theta_{\\text{Science}} = \\dfrac{1}{5} \\times 360^\\circ = 72^\\circ\\).",
        ],
        answer: "\\(\\theta_{\\text{Science}} = 72^\\circ\\)",
      },
      selfCheckExample: {
        prompt:
          "In a pie chart, four sectors have central angles in the ratio \\(1 : 2 : 3 : 4\\). " +
          "Find each angle.",
        steps: [
          "Sum of ratio parts: \\(1 + 2 + 3 + 4 = 10\\).",
          "Each ratio unit \\(= 360^\\circ / 10 = 36^\\circ\\).",
          "Angles: \\(36^\\circ, 72^\\circ, 108^\\circ, 144^\\circ\\) (check: they sum to \\(360^\\circ\\)).",
        ],
        answer: "\\(36^\\circ,\\ 72^\\circ,\\ 108^\\circ,\\ 144^\\circ\\)",
      },
      practiceSet: [
        { prompt: "A category is \\(\\tfrac{1}{4}\\) of the total. Sector angle?", answer: "\\(90^\\circ\\)", method: "\\(\\tfrac{1}{4}\\times 360^\\circ\\)" },
        { prompt: "A category is \\(50\\) of a total \\(200\\). Angle?", answer: "\\(90^\\circ\\)", method: "\\((50/200)\\times 360^\\circ\\)" },
        { prompt: "All sector angles of a pie chart must sum to?", answer: "\\(360^\\circ\\)" },
        { prompt: "A category is \\(\\tfrac{1}{3}\\) of the total. Angle?", answer: "\\(120^\\circ\\)" },
      ],
      pyqExampleId: "0e56a091-ec3e-4ddd-8b3c-68b58018ae62",
      traps: [
        {
          title: "All angles MUST sum to \\(360^\\circ\\)",
          body:
            "If your computed angles don't add to 360, you have an arithmetic error. " +
            "PYQs that give angle relations (\"\\(9p = 3q = 2r = 6s\\)\") use \\(p + q + r + s = 360\\) as the closing equation — without that, the system is underdetermined.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "reading-frequency-tables",
      name: "Reading Frequency Tables — Mode, Cumulative, Median",
      intuition:
        "A frequency table compresses a lot of data into one grid. Three things you read directly off it: the MODAL class (highest frequency), the CUMULATIVE frequency up to any class (running total), and the MEDIAN (the value where cumulative frequency crosses \\(n/2\\)).",
      definition:
        "Modal class: the class with the highest frequency. Cumulative frequency at class \\(k\\): \\(\\sum_{i \\leq k} f_i\\). " +
        "Median for grouped data: \\(M = L + \\dfrac{n/2 - F}{f}\\,h\\), where \\(L\\) = lower bound of the median class, \\(F\\) = cumulative frequency before it, \\(f\\) = frequency of median class, \\(h\\) = class width.",
      formula: {
        label: "Median from a Grouped Frequency Distribution",
        latex: "M = L + \\dfrac{\\tfrac{n}{2} - F}{f}\\,h",
        symbols: [
          { symbol: "\\(L\\)", meaning: "lower bound of the median class" },
          { symbol: "\\(F\\)", meaning: "cumulative frequency BEFORE the median class" },
          { symbol: "\\(f\\)", meaning: "frequency of the median class" },
          { symbol: "\\(h\\)", meaning: "class width" },
        ],
      },
      authoredExample: {
        prompt:
          "Heights (cm) of 20 students: \\(150{-}155 \\to 4,\\ 155{-}160 \\to 6,\\ 160{-}165 \\to 7,\\ 165{-}170 \\to 3\\). Find the median height.",
        steps: [
          "Total \\(n = 4 + 6 + 7 + 3 = 20\\), so \\(n/2 = 10\\).",
          "Cumulative frequencies: 4, 10, 17, 20. The 10th observation falls at the END of the \\(155{-}160\\) class — but \\(n/2 = 10\\) is reached at the boundary, so by convention the median class is \\(160{-}165\\).",
          "Identify: \\(L = 160,\\ F = 10,\\ f = 7,\\ h = 5\\).",
          "Apply: \\(M = 160 + \\dfrac{10 - 10}{7} \\times 5 = 160 + 0 = 160\\).",
        ],
        answer: "\\(M = 160\\) cm",
      },
      selfCheckExample: {
        prompt:
          "Weekly wages (₹) of 30 workers: \\(0{-}500 \\to 3,\\ 500{-}1000 \\to 8,\\ " +
          "1000{-}1500 \\to 12,\\ 1500{-}2000 \\to 7\\). Find the median wage.",
        steps: [
          "Total \\(n = 30\\), so \\(n/2 = 15\\).",
          "Cumulative: \\(3, 11, 23, 30\\). Median class is \\(1000{-}1500\\) (cum first reaches 15 here).",
          "Identify: \\(L = 1000,\\ F = 11,\\ f = 12,\\ h = 500\\).",
          "Apply: \\(M = 1000 + \\dfrac{15 - 11}{12} \\times 500 = 1000 + \\dfrac{2000}{12} \\approx 1166.67\\).",
        ],
        answer: "\\(M \\approx \\text{₹} 1166.67\\) (or \\(\\dfrac{3500}{3}\\))",
      },
      practiceSet: [
        { prompt: "Frequencies \\(3, 5, 4\\). Cumulative frequency after the 2nd class?", answer: "\\(8\\)", method: "\\(3+5\\)" },
        { prompt: "The modal class is the one with?", answer: "the highest frequency" },
        { prompt: "\\(n = 20\\). The median lies at which cumulative position?", answer: "\\(n/2 = 10\\)" },
        { prompt: "Frequencies \\(2, 4, 6\\). Last cumulative total?", answer: "\\(12\\)" },
      ],
      pyqExampleId: "720b1f0e-74e4-4d0b-ae88-3901d51119b3",
      traps: [
        {
          title: "Cumulative frequency is RUNNING total, not class total",
          body:
            "The cumulative frequency at class \\(k\\) is the sum of frequencies from class 1 through class \\(k\\) — not the frequency of class \\(k\\) alone. " +
            "Tripping on this turns every median-from-grouped-data question into nonsense.",
        },
        {
          title: "Identify the median class FIRST, then plug into the formula",
          body:
            "The median class is the class where the cumulative frequency first reaches or exceeds \\(n/2\\). " +
            "Don't pick the class with the highest frequency (that's the modal class) or the middle row of the table.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Measures of Central Tendency — grouped-data median and mode use these tables",
      href: "/notes/nda-maths/statistics/central-tendency",
    },
  ],
};
