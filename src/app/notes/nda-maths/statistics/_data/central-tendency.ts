import type { SubtopicNote } from "@/app/notes/_types";

export const CENTRAL_TENDENCY_NOTE: SubtopicNote = {
  subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
  title: "Foundations + Measures of Central Tendency",
  oneLineDefinition:
    "A single value that summarises where a dataset is centred — mean, median, or mode.",
  whyItMatters:
    "75 PYQs across 2017–2026 — the biggest subtopic in NDA Statistics. " +
    "Most questions test linear-transformation effects on the mean, grouped-data " +
    "calculations, replacement / wrong-value corrections, special-case mean " +
    "shortcuts, the combined-mean of two groups, or the sum-of-deviations identity. " +
    "Master the eleven concepts below and you cover the entire EASY + MODERATE " +
    "bandwidth reliably.",
  concepts: [
    // F1 — what-is-data ──────────────────────────────────────────────────────
    {
      slug: "what-is-data",
      name: "What is data, and why summarise it?",
      intuition:
        "A list of marks like 47, 52, 68, 71, 49, 55 is hard to compare against " +
        "another class's list. A single representative number — the average, the " +
        "middle value, the most common — compresses the list into something we " +
        "can actually reason about.",
      definition:
        "Data is the set of observed values of a variable measured on a " +
        "collection of items. The full collection is the POPULATION; a subset " +
        "actually observed is a SAMPLE. Statistics builds summary measures from " +
        "samples to draw conclusions about the population.",
      authoredExample: {
        prompt:
          "Class A scored 60, 60, 60 on three tests. Class B scored 40, 60, 80. " +
          "Both have mean 60. What does the mean MISS about Class B?",
        steps: [
          "Both datasets sum to 180, so the arithmetic mean is identical: 60.",
          "But Class A is constant; Class B varies between 40 and 80.",
          "The mean alone hides the SPREAD. We need a second summary (a dispersion measure) to capture it — that's why this chapter has two parts: tendency and dispersion.",
        ],
        answer: "Mean compresses but loses spread information.",
      },
    },

    // F2 — types-of-data ─────────────────────────────────────────────────────
    {
      slug: "types-of-data",
      name: "Types of data — qualitative vs quantitative, discrete vs continuous",
      intuition:
        "Some data labels things (blood group, district, brand) — that's " +
        "QUALITATIVE. Other data measures things (height, marks, count of " +
        "children) — that's QUANTITATIVE. Quantitative further splits into " +
        "DISCRETE (whole-number counts) and CONTINUOUS (any value in a range, " +
        "like 167.4 cm).",
      definition:
        "Qualitative (categorical) data takes labels, not numbers — operations " +
        "like mean don't apply. Quantitative data takes numerical values; " +
        "DISCRETE means the value jumps in integer-sized steps (kids per " +
        "family, integer marks), CONTINUOUS means values fill an interval " +
        "smoothly (height, weight, time).",
      authoredExample: {
        prompt:
          "Classify each variable: (i) eye colour, (ii) number of siblings, " +
          "(iii) running time for 100 m, (iv) shirt size {S, M, L, XL}.",
        steps: [
          "(i) Eye colour — labels (blue, brown, green) — QUALITATIVE.",
          "(ii) Number of siblings — whole-number counts — QUANTITATIVE, DISCRETE.",
          "(iii) Running time — any real number such as 12.47 s — QUANTITATIVE, CONTINUOUS.",
          "(iv) Shirt size — ordered labels (S < M < L < XL) — still QUALITATIVE (ordinal).",
        ],
        answer:
          "(i) qualitative, (ii) discrete, (iii) continuous, (iv) qualitative (ordinal).",
      },
    },

    // F3 — frequency-and-tabulation ──────────────────────────────────────────
    {
      slug: "frequency-and-tabulation",
      name: "Frequency and tabulation",
      intuition:
        "When values repeat, instead of writing the raw list, we tabulate each " +
        "unique value with how many times it occurred. That count is the " +
        "FREQUENCY, written \\(f\\). The total number of observations is " +
        "\\(N = \\sum f\\).",
      definition:
        "A frequency distribution lists each distinct value (or class interval) " +
        "alongside its frequency. The TOTAL FREQUENCY equals the number of " +
        "observations: \\(N = \\sum f_i\\). Every chapter formula that involves " +
        "grouped or repeated data uses this \\(N\\), not the count of distinct " +
        "values.",
      formula: {
        label: "Total frequency",
        latex: "N = \\sum_{i=1}^{k} f_i",
        symbols: [
          { symbol: "\\(k\\)", meaning: "number of distinct values or class intervals" },
          { symbol: "\\(f_i\\)", meaning: "frequency of the \\(i\\)-th value/class" },
          { symbol: "\\(N\\)", meaning: "total number of observations" },
        ],
      },
      authoredExample: {
        prompt:
          "Marks of 12 students: 4, 5, 4, 6, 5, 7, 5, 4, 7, 6, 5, 4. " +
          "Build a frequency table and verify \\(N\\).",
        steps: [
          "Distinct values in ascending order: 4, 5, 6, 7.",
          "Tally: \\(f(4)=4,\\ f(5)=4,\\ f(6)=2,\\ f(7)=2\\).",
          "Check \\(N = \\sum f = 4 + 4 + 2 + 2 = 12\\) — matches the original count.",
        ],
        answer: "\\(f(4)=4,\\ f(5)=4,\\ f(6)=2,\\ f(7)=2;\\ N = 12\\).",
      },
      practiceSet: [
        { prompt: "In \\(5, 5, 7, 8, 8, 8\\), what is the frequency of \\(8\\)?", answer: "\\(3\\)", method: "count the 8s" },
        { prompt: "A frequency table has \\(f = 2, 3, 5, 4\\). Find \\(N\\).", answer: "\\(14\\)", method: "\\(N = \\sum f = 2+3+5+4\\)" },
        { prompt: "In \\(6, 6, 9, 6, 9\\), what is \\(f(6)\\)?", answer: "\\(3\\)" },
        { prompt: "Frequencies \\(10, 12, 8\\) — total observations \\(N\\)?", answer: "\\(30\\)", method: "sum the frequencies" },
      ],
    },

    // F4 — class-marks-and-class-width ───────────────────────────────────────
    {
      slug: "class-marks-and-class-width",
      name: "Class marks and class width (grouped data)",
      intuition:
        "Continuous data — like heights in cm — gets grouped into INTERVALS " +
        "such as 150–160, 160–170. We no longer know each exact value, so we " +
        "treat every observation in an interval as if it sat at the MID-POINT. " +
        "That mid-point is the CLASS MARK. The interval's width is the CLASS WIDTH.",
      definition:
        "For a class interval with lower bound \\(L\\) and upper bound \\(U\\): " +
        "the CLASS MARK is \\(x = (L + U)/2\\) and the CLASS WIDTH is " +
        "\\(h = U - L\\). All grouped-data formulas (mean, median, mode, " +
        "variance) use the class mark as the representative value of the interval.",
      formula: {
        label: "Class mark and class width",
        latex:
          "x_{\\text{mark}} = \\dfrac{L + U}{2} \\qquad h = U - L",
      },
      authoredExample: {
        prompt:
          "For the class interval \\(30\\)–\\(40\\), find the class mark and class width.",
        steps: [
          "Lower bound \\(L = 30\\), upper bound \\(U = 40\\).",
          "Class mark: \\((30 + 40)/2 = 35\\).",
          "Class width: \\(40 - 30 = 10\\).",
        ],
        answer: "Class mark \\(= 35\\), class width \\(h = 10\\).",
      },
      practiceSet: [
        { prompt: "Class mark of the interval \\(20\\)–\\(30\\)?", answer: "\\(25\\)", method: "\\((20+30)/2\\)" },
        { prompt: "Class width of \\(40\\)–\\(55\\)?", answer: "\\(15\\)", method: "\\(55 - 40\\)" },
        { prompt: "Class mark of \\(0\\)–\\(10\\)?", answer: "\\(5\\)" },
        { prompt: "Class width of \\(100\\)–\\(120\\)?", answer: "\\(20\\)" },
      ],
    },

    // F5 — summation-notation ────────────────────────────────────────────────
    {
      slug: "summation-notation",
      name: "Summation notation \\(\\Sigma\\)",
      intuition:
        "\\(\\Sigma\\) (capital sigma) is a compact way to write \"add up many " +
        "things\". The expression \\(\\sum_{i=1}^{n} x_i\\) means: start with " +
        "\\(i = 1\\), plug into \\(x_i\\), keep going until \\(i = n\\), and " +
        "add everything together.",
      definition:
        "For a sequence \\(x_1, x_2, \\ldots, x_n\\), " +
        "\\(\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n\\). Two identities " +
        "are load-bearing throughout this chapter: \\(\\sum_{i=1}^{n} c = nc\\) " +
        "(a constant summed \\(n\\) times) and " +
        "\\(\\sum (a x_i + b) = a \\sum x_i + nb\\) (linearity).",
      formula: {
        label: "Definition + two identities",
        latex:
          "\\sum_{i=1}^{n} x_i = x_1 + \\cdots + x_n,\\quad \\sum_{i=1}^{n} c = nc,\\quad \\sum (a x_i + b) = a\\sum x_i + nb",
      },
      authoredExample: {
        prompt:
          "If \\(\\sum_{i=1}^{10} x_i = 50\\), compute \\(\\sum_{i=1}^{10} (2 x_i + 3)\\).",
        steps: [
          "Apply linearity: \\(\\sum (2x_i + 3) = 2 \\sum x_i + \\sum 3\\).",
          "Substitute: \\(2 \\cdot 50 + 10 \\cdot 3 = 100 + 30 = 130\\).",
        ],
        answer: "\\(\\sum (2 x_i + 3) = 130\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{i=1}^{4} 3 = ?\\)", answer: "\\(12\\)", method: "constant: \\(4 \\times 3\\)" },
        { prompt: "If \\(\\sum x_i = 20\\), find \\(\\sum 2x_i\\).", answer: "\\(40\\)", method: "\\(2\\sum x_i\\)" },
        { prompt: "If \\(\\sum_{i=1}^{5} x_i = 15\\), find \\(\\sum (x_i + 2)\\).", answer: "\\(25\\)", method: "\\(\\sum x_i + 5\\cdot 2\\)" },
        { prompt: "\\(\\sum_{i=1}^{3} i = ?\\)", answer: "\\(6\\)", method: "\\(1+2+3\\)" },
      ],
    },

    // F6 — weighted-vs-unweighted-counting ───────────────────────────────────
    {
      slug: "weighted-vs-unweighted-counting",
      name: "Weighted vs unweighted counting",
      intuition:
        "If the value \\(7\\) occurs 4 times in the data, its CONTRIBUTION to " +
        "the total is \\(7+7+7+7 = 28\\), not just \\(7\\). That's the " +
        "difference between unweighted (\\(\\sum x_i\\)) and weighted " +
        "(\\(\\sum f_i x_i\\)) summation. Foreshadows every grouped-data " +
        "formula in this chapter.",
      definition:
        "For raw data, the total is \\(\\sum x_i\\) and the count is \\(n\\). " +
        "For frequency-tabulated data with distinct values \\(x_i\\) of " +
        "frequency \\(f_i\\), the total is \\(\\sum f_i x_i\\) and the count " +
        "is \\(N = \\sum f_i\\). Every measure has a \"raw\" form (unweighted) " +
        "and a \"grouped\" form (weighted) — they're the same idea with " +
        "frequencies multiplied in.",
      authoredExample: {
        prompt:
          "Values \\(2, 4, 6\\) occur with frequencies \\(3, 2, 5\\) " +
          "respectively. Find the weighted total \\(\\sum f_i x_i\\) and " +
          "the count \\(N\\).",
        steps: [
          "Weighted contributions: \\(2 \\cdot 3 = 6,\\ 4 \\cdot 2 = 8,\\ 6 \\cdot 5 = 30\\).",
          "Weighted total: \\(\\sum f_i x_i = 6 + 8 + 30 = 44\\).",
          "Total count: \\(N = \\sum f_i = 3 + 2 + 5 = 10\\).",
        ],
        answer: "\\(\\sum f_i x_i = 44,\\ N = 10\\).",
      },
      practiceSet: [
        { prompt: "Value \\(4\\) with frequency \\(3\\) — its contribution to \\(\\sum f_i x_i\\)?", answer: "\\(12\\)", method: "\\(4 \\times 3\\)" },
        { prompt: "\\(x = 2, 5\\) with \\(f = 3, 2\\): \\(\\sum f_i x_i\\)?", answer: "\\(16\\)", method: "\\(6 + 10\\)" },
        { prompt: "Value \\(10\\) with frequency \\(5\\) — contribution?", answer: "\\(50\\)" },
        { prompt: "\\(x = 1, 2, 3\\) with \\(f = 4, 1, 2\\): \\(\\sum f_i x_i\\)?", answer: "\\(12\\)", method: "\\(4 + 2 + 6\\)" },
      ],
    },

    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "arithmetic-mean-raw",
      name: "Arithmetic Mean (raw data)",
      intuition:
        "The average. Add up every value, then split the total equally among " +
        "all the observations. It is the single most-used measure when the " +
        "data is fairly symmetric and free of extreme outliers.",
      definition:
        "For \\(n\\) observations \\(x_1, x_2, \\ldots, x_n\\), the arithmetic mean " +
        "is the total sum divided by the number of observations.",
      formula: {
        label: "Arithmetic Mean",
        latex: "\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^{n} x_i = \\dfrac{x_1 + x_2 + \\cdots + x_n}{n}",
        symbols: [
          { symbol: "\\(\\bar{x}\\)", meaning: "the arithmetic mean" },
          { symbol: "\\(x_i\\)", meaning: "the \\(i\\)-th observation" },
          { symbol: "\\(n\\)", meaning: "the total number of observations" },
        ],
      },
      authoredExample: {
        prompt: "Find the arithmetic mean of \\(4, 6, 8, 10, 12\\).",
        steps: [
          "Add up all the values: \\(4 + 6 + 8 + 10 + 12 = 40\\).",
          "Count the observations: \\(n = 5\\).",
          "Apply the formula: \\(\\bar{x} = \\dfrac{40}{5} = 8\\).",
        ],
        answer: "\\(\\bar{x} = 8\\)",
      },
      fadedExample: {
        prompt: "Find the arithmetic mean of \\(5, 8, 11, 14, 17\\).",
        steps: [
          "Add up all the values: \\(5 + 8 + 11 + 14 + 17 = 55\\).",
          "Count the observations: \\(n = 5\\).",
          "Apply the formula: \\(\\bar{x} = \\dfrac{55}{5} = 11\\).",
        ],
        answer: "\\(\\bar{x} = 11\\)",
        hiddenStepIndexes: [0],
      },
      selfCheckExample: {
        prompt: "Find the arithmetic mean of \\(3, 6, 9, 12, 15, 18\\).",
        steps: [
          "Sum: \\(3+6+9+12+15+18 = 63\\).",
          "Count: \\(n = 6\\).",
          "Mean: \\(\\bar{x} = 63/6 = 10.5\\).",
        ],
        answer: "\\(\\bar{x} = 10.5\\)",
      },
      practiceSet: [
        {
          prompt: "Mean of \\(3, 5, 7\\)?",
          answer: "\\(5\\)",
          method: "sum \\(15 \\div 3\\)",
        },
        {
          prompt: "Mean of \\(10, 20, 30, 40\\)?",
          answer: "\\(25\\)",
          method: "sum \\(100 \\div 4\\)",
        },
        {
          prompt: "Mean of \\(2, 4, 4, 6, 9\\)?",
          answer: "\\(5\\)",
          method: "sum \\(25 \\div 5\\)",
        },
        {
          prompt: "Mean of \\(7, 7, 7, 7\\)?",
          answer: "\\(7\\)",
          method: "all values equal, so the mean equals the value",
        },
      ],
      pyqExampleId: "78e0ac87-d443-49ae-860b-09a2a4185027",
      traps: [
        {
          title: "Outliers move the mean — sometimes a lot",
          body:
            "A single very large or very small value shifts the mean noticeably. " +
            "If you suspect skew, ask the question whether mean or median is the right choice.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "arithmetic-mean-grouped",
      name: "Arithmetic Mean (frequency / grouped data)",
      intuition:
        "When values are repeated or grouped into classes, each value has a " +
        "weight equal to its frequency. The denominator is the total frequency, " +
        "not the number of distinct classes.",
      definition:
        "If the value \\(x_i\\) occurs with frequency \\(f_i\\), the mean is the " +
        "frequency-weighted sum divided by the total frequency.",
      formula: {
        label: "Frequency-weighted Mean",
        latex: "\\bar{x} = \\dfrac{\\sum f_i x_i}{\\sum f_i}",
        symbols: [
          { symbol: "\\(x_i\\)", meaning: "value (or class mark for grouped data)" },
          { symbol: "\\(f_i\\)", meaning: "frequency of \\(x_i\\)" },
          { symbol: "\\(\\sum f_i\\)", meaning: "total frequency = total observations" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the mean of the frequency distribution: \\(x = 2, 4, 6, 8\\) " +
          "with frequencies \\(f = 3, 5, 7, 5\\).",
        steps: [
          "Compute \\(\\sum f_i = 3 + 5 + 7 + 5 = 20\\).",
          "Compute \\(\\sum f_i x_i = 2{\\cdot}3 + 4{\\cdot}5 + 6{\\cdot}7 + 8{\\cdot}5 = 6 + 20 + 42 + 40 = 108\\).",
          "Apply the formula: \\(\\bar{x} = \\dfrac{108}{20} = 5.4\\).",
        ],
        answer: "\\(\\bar{x} = 5.4\\)",
      },
      fadedExample: {
        prompt:
          "Find the mean for \\(x = 1, 2, 3, 4\\) with frequencies " +
          "\\(f = 3, 5, 7, 5\\).",
        steps: [
          "Compute \\(\\sum f_i = 3 + 5 + 7 + 5 = 20\\).",
          "Compute \\(\\sum f_i x_i = 1{\\cdot}3 + 2{\\cdot}5 + 3{\\cdot}7 + 4{\\cdot}5 = 3 + 10 + 21 + 20 = 54\\).",
          "Apply: \\(\\bar{x} = 54 / 20 = 2.7\\).",
        ],
        answer: "\\(\\bar{x} = 2.7\\)",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt:
          "Find the mean for \\(x = 10, 20, 30, 40\\) with frequencies " +
          "\\(f = 1, 2, 3, 4\\).",
        steps: [
          "\\(\\sum f = 1+2+3+4 = 10\\).",
          "\\(\\sum f x = 10 + 40 + 90 + 160 = 300\\).",
          "\\(\\bar{x} = 300/10 = 30\\).",
        ],
        answer: "\\(\\bar{x} = 30\\)",
      },
      practiceSet: [
        { prompt: "\\(x = 2, 4\\) with \\(f = 1, 3\\): mean?", answer: "\\(3.5\\)", method: "\\((2+12)/4\\)" },
        { prompt: "\\(x = 1, 2, 3\\) with \\(f = 2, 2, 2\\): mean?", answer: "\\(2\\)", method: "\\((2+4+6)/6\\)" },
        { prompt: "\\(x = 5, 10\\) with \\(f = 3, 1\\): mean?", answer: "\\(6.25\\)", method: "\\((15+10)/4\\)" },
        { prompt: "\\(x = 0, 10\\) with \\(f = 1, 1\\): mean?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "e7f15493-52aa-4380-b0c2-8f93f48bc409",
      traps: [
        {
          title: "Divide by \\(\\sum f_i\\), not by the number of classes",
          body:
            "If marks are 20, 30, 30, 20 students across four classes, the divisor " +
            "is 100 — not 4. This is the single most common arithmetic error on " +
            "grouped-mean PYQs.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "mean-linear-transformation",
      name: "Linear Transformation of the Mean",
      intuition:
        "If you scale every value by \\(a\\) and shift by \\(b\\), the mean scales " +
        "and shifts in exactly the same way. The mean is a linear operator — " +
        "constants pass straight through.",
      definition:
        "If a new variable \\(y_i = a\\,x_i + b\\) is formed from each observation, " +
        "the new mean is \\(\\bar{y} = a\\,\\bar{x} + b\\).",
      formula: {
        label: "Linear transformation rule",
        latex: "y_i = a\\,x_i + b \\quad\\Longrightarrow\\quad \\bar{y} = a\\,\\bar{x} + b",
        symbols: [
          { symbol: "\\(a\\)", meaning: "scale factor (multiplied)" },
          { symbol: "\\(b\\)", meaning: "shift (added)" },
        ],
      },
      authoredExample: {
        prompt:
          "The mean of 20 observations is 12. If each observation is multiplied " +
          "by 3 and then 5 is added, find the new mean.",
        steps: [
          "Identify the transformation: \\(y_i = 3x_i + 5\\), so \\(a = 3,\\ b = 5\\).",
          "Apply the rule: \\(\\bar{y} = a\\,\\bar{x} + b = 3{\\cdot}12 + 5\\).",
          "Compute: \\(\\bar{y} = 36 + 5 = 41\\).",
        ],
        answer: "\\(\\bar{y} = 41\\)",
      },
      fadedExample: {
        prompt:
          "The mean of 25 observations is 8. If each observation is multiplied by " +
          "4 and then 3 is added, find the new mean.",
        steps: [
          "Identify \\(a = 4,\\ b = 3\\).",
          "Apply: \\(\\bar{y} = a\\bar{x} + b = 4 \\cdot 8 + 3\\).",
          "Compute: \\(\\bar{y} = 32 + 3 = 35\\).",
        ],
        answer: "\\(\\bar{y} = 35\\)",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt:
          "If \\(\\bar{x} = 10\\) and \\(y_i = 2 x_i - 5\\) for every \\(i\\), find \\(\\bar{y}\\).",
        steps: [
          "Identify \\(a = 2,\\ b = -5\\).",
          "Apply: \\(\\bar{y} = 2 \\cdot 10 - 5 = 15\\).",
        ],
        answer: "\\(\\bar{y} = 15\\)",
      },
      practiceSet: [
        { prompt: "Mean is \\(10\\). New mean if each value is multiplied by \\(2\\)?", answer: "\\(20\\)", method: "\\(\\bar{y} = 2\\bar{x}\\)" },
        { prompt: "Mean is \\(8\\). New mean if \\(5\\) is added to each?", answer: "\\(13\\)" },
        { prompt: "Mean is \\(6\\). New mean for \\(y = 3x - 1\\)?", answer: "\\(17\\)", method: "\\(3\\cdot 6 - 1\\)" },
        { prompt: "Mean is \\(12\\). New mean for \\(y = x/2\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "fb039a72-6921-4a0e-a538-ca2081c72135",
      traps: [
        {
          title: "Shift moves the mean, but not the SD",
          body:
            "Adding a constant \\(b\\) shifts \\(\\bar{x}\\) by \\(b\\) but leaves the " +
            "standard deviation unchanged. Multiplying by \\(a\\) scales both. " +
            "Don't apply the mean rule to dispersion questions.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "mean-replacement-correction",
      name: "Replacement and Wrong-Value Correction of the Mean",
      intuition:
        "When one observation is swapped — either deliberately or because a wrong " +
        "value was later corrected — the mean shifts by exactly the change in that " +
        "value divided by \\(n\\). No need to recompute from scratch. The same identity " +
        "handles \"k observations are discarded\": work with the totals \\(nM\\) before " +
        "and after, the difference is what changed.",
      definition:
        "If the mean of \\(n\\) observations is \\(M\\) and a single value \\(x\\) is " +
        "replaced by \\(y\\), the new mean is \\(M_{\\text{new}} = M + \\dfrac{y - x}{n}\\). " +
        "For a wrong-value correction, \\(x\\) is what was recorded and \\(y\\) is the " +
        "correct value. For discards or additions, \\(n\\) itself changes — reason about " +
        "the new total \\((n \\pm k)\\,M_{\\text{new}}\\) directly.",
      formula: {
        label: "Replacement rule (single observation, n unchanged)",
        latex: "M_{\\text{new}} = M + \\dfrac{y - x}{n}",
        symbols: [
          { symbol: "\\(M\\)", meaning: "original mean" },
          { symbol: "\\(n\\)", meaning: "number of observations (unchanged in pure replacement)" },
          { symbol: "\\(x\\)", meaning: "the value being removed (or wrongly recorded)" },
          { symbol: "\\(y\\)", meaning: "the value taking its place (or the correct one)" },
        ],
      },
      authoredExample: {
        prompt:
          "The mean of 20 observations is 15. One observation was recorded as 8 " +
          "but the correct value is 28. Find the corrected mean.",
        steps: [
          "Identify the swap: wrong value \\(x = 8\\), correct value \\(y = 28\\), \\(n = 20\\).",
          "Apply the rule: \\(M_{\\text{new}} = 15 + \\dfrac{28 - 8}{20}\\).",
          "Compute the correction: \\(\\dfrac{20}{20} = 1\\).",
          "Therefore \\(M_{\\text{new}} = 15 + 1 = 16\\).",
        ],
        answer: "\\(M_{\\text{new}} = 16\\)",
      },
      fadedExample: {
        prompt:
          "The mean of 15 observations is 20. A value recorded as 12 should have " +
          "been 27. Find the corrected mean.",
        steps: [
          "Swap: wrong \\(x = 12\\), correct \\(y = 27\\), \\(n = 15\\).",
          "Apply: \\(M_{\\text{new}} = 20 + \\dfrac{27 - 12}{15} = 20 + \\dfrac{15}{15}\\).",
          "Compute: \\(M_{\\text{new}} = 20 + 1 = 21\\).",
        ],
        answer: "\\(M_{\\text{new}} = 21\\)",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt:
          "The mean of 25 observations is 30. A value recorded as 18 was actually " +
          "43. Find the corrected mean.",
        steps: [
          "Swap: \\(x = 18,\\ y = 43,\\ n = 25\\).",
          "\\(M_{\\text{new}} = 30 + \\dfrac{43 - 18}{25} = 30 + \\dfrac{25}{25} = 30 + 1\\).",
          "\\(M_{\\text{new}} = 31\\).",
        ],
        answer: "\\(M_{\\text{new}} = 31\\)",
      },
      practiceSet: [
        { prompt: "Mean of \\(10\\) obs is \\(5\\). A value \\(3\\) is corrected to \\(13\\). New mean?", answer: "\\(6\\)", method: "\\(5 + (13-3)/10\\)" },
        { prompt: "Mean of \\(5\\) obs is \\(20\\). A value \\(10\\) is corrected to \\(15\\). New mean?", answer: "\\(21\\)", method: "\\(20 + 5/5\\)" },
        { prompt: "Mean of \\(20\\) obs is \\(8\\). A value \\(30\\) is corrected to \\(10\\). New mean?", answer: "\\(7\\)", method: "\\(8 + (10-30)/20\\)" },
        { prompt: "Mean of \\(4\\) obs is \\(9\\). A value \\(5\\) is corrected to \\(9\\). New mean?", answer: "\\(10\\)", method: "\\(9 + 4/4\\)" },
      ],
      pyqExampleId: "b97d7058-a71c-4b2f-9bba-e154e4701f8c",
      traps: [
        {
          title: "Divide by \\(n\\), not by 1",
          body:
            "Students often subtract \\(x - y\\) directly from \\(M\\). The mistake: only " +
            "ONE of the \\(n\\) terms changed, so the shift in the average is the change " +
            "in that one term divided by \\(n\\) — not the full change.",
        },
        {
          title: "Discards: work with totals \\(nM\\), not the rule directly",
          body:
            "When \\(k\\) observations are discarded, \\(n\\) itself changes. Don't try " +
            "to force the single-replacement formula. Instead: original total \\(= nM\\), " +
            "new total \\(= (n-k)M_{\\text{new}}\\), the difference is the sum of the discarded values.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "special-case-means",
      name: "Special-Case Means — Consecutive Integers, Squares, AP, Binomial",
      intuition:
        "NDA loves to ask the mean of a structured sequence — natural numbers in an " +
        "interval, perfect squares, an AP, values weighted by binomial coefficients. " +
        "Rather than summing by hand, recognise the structure and use a closed-form " +
        "shortcut. Saves 60–90 seconds per question.",
      definition:
        "Three shortcuts are load-bearing: (a) Mean of consecutive integers from \\(a\\) " +
        "to \\(b\\) is \\((a+b)/2\\). (b) Mean of squares \\(1^2, 2^2, \\ldots, n^2\\) is " +
        "\\(\\dfrac{(n+1)(2n+1)}{6}\\). (c) For an AP, the mean equals the average of " +
        "the first and last terms (or equivalently the middle term). For binomial-weighted " +
        "means, the denominator is \\(\\sum \\binom{n}{k} = 2^n\\), not the number of terms.",
      formula: {
        label: "Closed-form means for common sequences",
        latex:
          "\\bar{x}_{a..b} = \\dfrac{a+b}{2} \\qquad \\overline{k^2}\\big|_{1}^{n} = \\dfrac{(n+1)(2n+1)}{6} \\qquad \\bar{x}_{\\text{AP}} = \\dfrac{a_1 + a_n}{2}",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "first and last integer of an arithmetic run" },
          { symbol: "\\(n\\)", meaning: "number of terms (for the squares formula, the upper index)" },
          { symbol: "\\(a_1, a_n\\)", meaning: "first and last term of an AP" },
        ],
      },
      authoredExample: {
        prompt: "Find the arithmetic mean of \\(8^2, 9^2, 10^2, \\ldots, 15^2\\).",
        steps: [
          "Number of terms: \\(15 - 8 + 1 = 8\\).",
          "Write the sum as a difference: \\(\\sum_{k=1}^{15} k^2 - \\sum_{k=1}^{7} k^2 = \\dfrac{15 \\cdot 16 \\cdot 31}{6} - \\dfrac{7 \\cdot 8 \\cdot 15}{6}\\).",
          "Compute each: \\(\\dfrac{7440}{6} - \\dfrac{840}{6} = 1240 - 140 = 1100\\).",
          "Mean: \\(\\dfrac{1100}{8} = 137.5\\).",
        ],
        answer: "Mean \\(= 137.5\\)",
      },
      fadedExample: {
        prompt:
          "Find the mean of \\(5^2, 6^2, 7^2, \\ldots, 10^2\\).",
        steps: [
          "Number of terms: \\(10 - 5 + 1 = 6\\).",
          "Sum as a difference: \\(\\sum_{k=1}^{10} k^2 - \\sum_{k=1}^{4} k^2 = \\dfrac{10 \\cdot 11 \\cdot 21}{6} - \\dfrac{4 \\cdot 5 \\cdot 9}{6} = 385 - 30 = 355\\).",
          "Mean: \\(355/6\\).",
        ],
        answer: "Mean \\(= 355/6 \\approx 59.17\\)",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt: "Find the arithmetic mean of the first \\(10\\) natural numbers.",
        steps: [
          "This is the AP \\(1, 2, \\ldots, 10\\).",
          "Mean \\( = (a_1 + a_n)/2 = (1 + 10)/2 = 5.5\\).",
        ],
        answer: "Mean \\(= 5.5\\)",
      },
      practiceSet: [
        { prompt: "Mean of \\(1, 2, 3, \\ldots, 9\\)?", answer: "\\(5\\)", method: "\\((1+9)/2\\)" },
        { prompt: "Mean of the first five even numbers \\(2, 4, 6, 8, 10\\)?", answer: "\\(6\\)", method: "\\((2+10)/2\\)" },
        { prompt: "Mean of \\(10, 11, \\ldots, 20\\)?", answer: "\\(15\\)", method: "\\((10+20)/2\\)" },
        { prompt: "Mean of an AP with first term \\(4\\) and last term \\(16\\)?", answer: "\\(10\\)", method: "\\((4+16)/2\\)" },
      ],
      pyqExampleId: "4bd4c8d9-c625-4b44-b09e-da16e52b7b49",
      traps: [
        {
          title: "AP shortcut fails for GPs and other non-uniform spacings",
          body:
            "The mean \\((a_1 + a_n)/2\\) works only because in an AP every term sits at " +
            "equal distance around the centre. For \\(1, 2, 4, 8, \\ldots\\) (GP) the " +
            "shortcut gives the wrong answer — you must sum properly or use the GP sum formula.",
        },
        {
          title: "Binomial-weighted means use \\(\\sum \\binom{n}{k} = 2^n\\)",
          body:
            "When asked the mean of \\(1, 2, \\ldots, n+1\\) with frequencies " +
            "\\(\\binom{n}{0}, \\binom{n}{1}, \\ldots, \\binom{n}{n}\\), the denominator " +
            "is \\(2^n\\) (sum of one row of Pascal's triangle) — not the number of " +
            "distinct values. Use \\(\\sum k \\binom{n}{k} = n \\cdot 2^{n-1}\\) for the numerator.",
        },
      ],
    },

    // 6 ───────────────────────────────────────────────────────────────────────
    {
      slug: "combined-mean-weighted",
      name: "Combined Mean of Two Groups",
      intuition:
        "When two datasets with KNOWN sizes and means are pooled, the combined mean is " +
        "the frequency-weighted average — the sum of the two totals divided by the sum " +
        "of the two sizes. Plain averaging of the two means works ONLY when both groups " +
        "have the same size. PYQs love the reverse direction: give you the combined mean " +
        "and both group means, ask for the size split.",
      definition:
        "For group 1 of size \\(n_1\\) with mean \\(M_1\\) and group 2 of size \\(n_2\\) " +
        "with mean \\(M_2\\), the combined mean of the pooled dataset is the " +
        "frequency-weighted average. Generalises to \\(k\\) groups as a weighted average " +
        "of the group means, with each weight equal to the group's size.",
      formula: {
        label: "Combined mean of two groups",
        latex: "M_{12} = \\dfrac{n_1 M_1 + n_2 M_2}{n_1 + n_2}",
        symbols: [
          { symbol: "\\(n_1, n_2\\)", meaning: "sizes of the two groups" },
          { symbol: "\\(M_1, M_2\\)", meaning: "means of the two groups" },
          { symbol: "\\(M_{12}\\)", meaning: "combined mean of the pooled dataset" },
        ],
      },
      authoredExample: {
        prompt:
          "The mean age of 30 men is 40 years and the mean age of 20 women is 35 years. " +
          "Find the mean age of the combined group.",
        steps: [
          "Identify the groups: \\(n_1 = 30,\\ M_1 = 40,\\ n_2 = 20,\\ M_2 = 35\\).",
          "Compute group totals: \\(n_1 M_1 = 30 \\times 40 = 1200\\); \\(n_2 M_2 = 20 \\times 35 = 700\\).",
          "Apply the formula: \\(M_{12} = \\dfrac{1200 + 700}{30 + 20} = \\dfrac{1900}{50}\\).",
          "Compute: \\(M_{12} = 38\\) years.",
        ],
        answer: "\\(M_{12} = 38\\) years",
      },
      fadedExample: {
        prompt:
          "Mean weight of 40 boys is 50 kg; mean weight of 60 girls is 45 kg. " +
          "Find the combined mean weight.",
        steps: [
          "Group totals: \\(40 \\cdot 50 = 2000\\), \\(60 \\cdot 45 = 2700\\).",
          "Apply: \\(M_{12} = \\dfrac{2000 + 2700}{40 + 60} = \\dfrac{4700}{100}\\).",
          "Result: \\(M_{12} = 47\\) kg.",
        ],
        answer: "\\(M_{12} = 47\\) kg",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt:
          "Section A (25 students) has mean marks 72; Section B (35 students) has mean " +
          "66. Find the combined mean.",
        steps: [
          "Totals: \\(25 \\cdot 72 = 1800\\); \\(35 \\cdot 66 = 2310\\).",
          "\\(M_{12} = (1800 + 2310)/60 = 4110/60 = 68.5\\).",
        ],
        answer: "\\(M_{12} = 68.5\\)",
      },
      practiceSet: [
        { prompt: "\\(20\\) boys mean \\(60\\), \\(30\\) girls mean \\(50\\). Combined mean?", answer: "\\(54\\)", method: "\\((1200+1500)/50\\)" },
        { prompt: "Two equal-size groups, means \\(40\\) and \\(60\\). Combined mean?", answer: "\\(50\\)", method: "equal sizes \\(\\Rightarrow\\) plain average" },
        { prompt: "\\(10\\) obs mean \\(5\\), \\(40\\) obs mean \\(10\\). Combined?", answer: "\\(9\\)", method: "\\((50+400)/50\\)" },
        { prompt: "Group of \\(3\\) mean \\(8\\), group of \\(1\\) mean \\(4\\). Combined?", answer: "\\(7\\)", method: "\\((24+4)/4\\)" },
      ],
      pyqExampleId: "3c2e5644-ae19-407e-85ac-cdcb3b23fa5e",
      traps: [
        {
          title: "Plain average of the two means is wrong unless \\(n_1 = n_2\\)",
          body:
            "Students average \\(M_1\\) and \\(M_2\\) directly. That gives the correct " +
            "combined mean ONLY when both groups are the same size. For unequal sizes the " +
            "larger group pulls the combined mean toward its own mean — which is exactly " +
            "what the weighted formula encodes.",
        },
        {
          title: "Reverse-solve: combined + group means give the size ratio",
          body:
            "If \\(M_{12},\\ M_1,\\ M_2\\) are given and you need \\(n_1 : n_2\\), " +
            "rearrange the formula to " +
            "\\(\\dfrac{n_1}{n_2} = \\dfrac{M_2 - M_{12}}{M_{12} - M_1}\\). PYQs use this " +
            "shape with concrete totals (150 students, combined 60 kg, boys 70, girls 55) " +
            "to test whether you recognise it as one equation in one unknown.",
        },
      ],
    },

    // 7 ───────────────────────────────────────────────────────────────────────
    {
      slug: "median",
      name: "Median — Middle Value",
      intuition:
        "Sort the data and pick the middle. Half the values lie below the median, " +
        "half lie above. Because it only cares about position, the median ignores " +
        "extreme values — preferred for skewed data like income or marks.",
      definition:
        "For raw data with \\(n\\) sorted observations, the median is the middle " +
        "value if \\(n\\) is odd, and the average of the two middle values if " +
        "\\(n\\) is even. For grouped data, use the class-interval formula below.",
      formula: {
        label: "Median (raw and grouped)",
        latex:
          "\\text{Raw: } M = \\begin{cases} x_{(n+1)/2} & n \\text{ odd} \\\\[4pt] \\dfrac{x_{n/2} + x_{n/2+1}}{2} & n \\text{ even} \\end{cases} \\qquad \\text{Grouped: } M = L + \\dfrac{\\tfrac{n}{2} - F}{f}\\,h",
        symbols: [
          { symbol: "\\(L\\)", meaning: "lower bound of the median class" },
          { symbol: "\\(F\\)", meaning: "cumulative frequency before the median class" },
          { symbol: "\\(f\\)", meaning: "frequency of the median class" },
          { symbol: "\\(h\\)", meaning: "class width" },
        ],
      },
      authoredExample: {
        prompt: "Find the median of \\(7, 3, 9, 5, 11, 4, 8\\).",
        steps: [
          "Sort ascending: \\(3, 4, 5, 7, 8, 9, 11\\).",
          "Count the observations: \\(n = 7\\) (odd).",
          "Median is the \\(\\tfrac{n+1}{2} = 4\\)-th value, which is \\(7\\).",
        ],
        answer: "\\(M = 7\\)",
      },
      fadedExample: {
        prompt: "Find the median of \\(12, 5, 9, 17, 8, 14, 11, 6\\).",
        steps: [
          "Sort ascending: \\(5, 6, 8, 9, 11, 12, 14, 17\\).",
          "\\(n = 8\\) (even), so median is the average of the 4th and 5th: \\((9 + 11)/2\\).",
          "Median \\(= 10\\).",
        ],
        answer: "\\(M = 10\\)",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt: "Find the median of \\(2, 9, 4, 11, 6, 15, 7\\).",
        steps: [
          "Sort: \\(2, 4, 6, 7, 9, 11, 15\\). \\(n = 7\\) (odd).",
          "Median \\( = \\tfrac{n+1}{2} = 4\\text{th value} = 7\\).",
        ],
        answer: "\\(M = 7\\)",
      },
      practiceSet: [
        { prompt: "Median of \\(3, 1, 2\\)?", answer: "\\(2\\)", method: "sort \\(1,2,3\\) \\(\\to\\) middle" },
        { prompt: "Median of \\(4, 8, 6, 2\\)?", answer: "\\(5\\)", method: "sort \\(\\to (4+6)/2\\)" },
        { prompt: "Median of \\(7, 3, 9, 5, 11\\)?", answer: "\\(7\\)", method: "sort \\(\\to 3,5,7,9,11\\)" },
        { prompt: "Median of \\(10, 20, 30, 40\\)?", answer: "\\(25\\)", method: "\\((20+30)/2\\)" },
      ],
      pyqExampleId: "5d585188-bab2-476a-9078-e54725e8cdd5",
      traps: [
        {
          title: "Always sort before reading off the middle",
          body:
            "The median of an unsorted list is not the middle of the original order. " +
            "PYQs sometimes hand you data in random order to catch this.",
        },
      ],
    },

    // 8 ───────────────────────────────────────────────────────────────────────
    {
      slug: "mode",
      name: "Mode — Most Frequent Value",
      intuition:
        "The value that occurs most often. The mode is the only measure of " +
        "central tendency that makes sense for purely categorical data (colours, " +
        "blood groups) and the natural answer when the question is \"which is the most common?\".",
      definition:
        "For raw data, the mode is the value with the highest frequency. " +
        "If multiple values tie for highest, the dataset is multimodal. " +
        "For grouped data, use the class-interval formula below.",
      formula: {
        label: "Mode (grouped data)",
        latex: "M_0 = L + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2}\\,h",
        symbols: [
          { symbol: "\\(L\\)", meaning: "lower bound of the modal class" },
          { symbol: "\\(f_1\\)", meaning: "frequency of the modal class" },
          { symbol: "\\(f_0\\)", meaning: "frequency of the class before" },
          { symbol: "\\(f_2\\)", meaning: "frequency of the class after" },
          { symbol: "\\(h\\)", meaning: "class width" },
        ],
      },
      authoredExample: {
        prompt: "Find the mode of \\(2, 5, 3, 7, 5, 8, 5, 9\\).",
        steps: [
          "Tally each value's frequency: \\(5\\) appears 3 times, every other value appears once.",
          "The highest frequency is 3, achieved only by the value \\(5\\).",
          "Therefore the mode is \\(5\\).",
        ],
        answer: "\\(M_0 = 5\\)",
      },
      fadedExample: {
        prompt: "Find the mode of \\(6, 9, 6, 8, 6, 11, 9, 6, 12, 8\\).",
        steps: [
          "Tally: \\(6\\) appears 4 times; \\(8\\) appears 2 times; \\(9\\) appears 2 times; others once.",
          "Highest frequency is 4, only for the value \\(6\\).",
          "Mode \\(= 6\\).",
        ],
        answer: "\\(M_0 = 6\\)",
        hiddenStepIndexes: [0],
      },
      selfCheckExample: {
        prompt: "Find the mode of \\(3, 5, 7, 5, 9, 3, 5, 11, 3, 3\\).",
        steps: [
          "Tally: \\(3\\) appears 4 times; \\(5\\) appears 3 times; others once.",
          "Highest frequency is 4, only for \\(3\\).",
        ],
        answer: "\\(M_0 = 3\\)",
      },
      practiceSet: [
        { prompt: "Mode of \\(2, 3, 3, 5\\)?", answer: "\\(3\\)" },
        { prompt: "Mode of \\(7, 7, 8, 9, 7\\)?", answer: "\\(7\\)" },
        { prompt: "Mode of \\(1, 2, 2, 3, 3, 3\\)?", answer: "\\(3\\)" },
        { prompt: "Mode of \\(5, 5, 6, 6, 9\\)?", answer: "\\(5\\) and \\(6\\) (bimodal)", method: "two values tie for highest" },
      ],
      pyqExampleId: "8de1abbb-6597-407a-855d-bc6c986ee3b1",
      traps: [
        {
          title: "Mode can be undefined or multimodal — don't force one answer",
          body:
            "If every value occurs exactly once, there is no mode. If two values " +
            "tie for highest frequency, the data is bimodal and the answer is " +
            "both values. PYQs use this to test understanding.",
        },
      ],
    },

    // 9 ───────────────────────────────────────────────────────────────────────
    {
      slug: "geometric-mean",
      name: "Geometric Mean (GM)",
      intuition:
        "Geometric mean is for things that multiply, not add — growth rates, " +
        "ratios, compound interest. You multiply all the values and take the " +
        "\\(n\\)-th root. Equivalent to the average on a log scale.",
      definition:
        "For \\(n\\) positive observations \\(x_1, x_2, \\ldots, x_n\\), the geometric " +
        "mean is the \\(n\\)-th root of their product.",
      formula: {
        label: "Geometric Mean",
        latex: "\\text{GM} = \\sqrt[n]{x_1 \\, x_2 \\, \\cdots \\, x_n} = \\left(\\prod_{i=1}^{n} x_i\\right)^{1/n}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of observations (all positive)" },
        ],
      },
      authoredExample: {
        prompt: "Find the geometric mean of \\(4\\) and \\(9\\).",
        steps: [
          "Multiply the values: \\(4 \\times 9 = 36\\).",
          "Take the \\(n\\)-th root with \\(n = 2\\): \\(\\sqrt{36}\\).",
          "Compute: \\(\\sqrt{36} = 6\\).",
        ],
        answer: "\\(\\text{GM} = 6\\)",
      },
      fadedExample: {
        prompt: "Find the geometric mean of \\(2\\) and \\(32\\).",
        steps: [
          "Multiply: \\(2 \\times 32 = 64\\).",
          "\\(n\\)-th root with \\(n = 2\\): \\(\\sqrt{64}\\).",
          "\\(\\text{GM} = 8\\).",
        ],
        answer: "\\(\\text{GM} = 8\\)",
        hiddenStepIndexes: [0],
      },
      selfCheckExample: {
        prompt: "Find the geometric mean of \\(4, 6, 9\\).",
        steps: [
          "Product: \\(4 \\cdot 6 \\cdot 9 = 216\\).",
          "Take the cube root: \\(\\sqrt[3]{216} = 6\\).",
        ],
        answer: "\\(\\text{GM} = 6\\)",
      },
      practiceSet: [
        { prompt: "GM of \\(2\\) and \\(8\\)?", answer: "\\(4\\)", method: "\\(\\sqrt{16}\\)" },
        { prompt: "GM of \\(3\\) and \\(12\\)?", answer: "\\(6\\)", method: "\\(\\sqrt{36}\\)" },
        { prompt: "GM of \\(1, 3, 9\\)?", answer: "\\(3\\)", method: "\\(\\sqrt[3]{27}\\)" },
        { prompt: "GM of \\(5\\) and \\(5\\)?", answer: "\\(5\\)", method: "equal values \\(\\Rightarrow\\) GM \\(=\\) value" },
      ],
      pyqExampleId: "319f7726-9981-4f36-93a2-1055cd03faad",
      traps: [
        {
          title: "GM is only defined for positive numbers",
          body:
            "Zero or negative observations break the geometric mean — the product " +
            "vanishes or the root becomes imaginary. If a PYQ throws a zero or " +
            "negative into the set, GM is not the right measure.",
        },
      ],
    },

    // 10 ──────────────────────────────────────────────────────────────────────
    {
      slug: "harmonic-mean",
      name: "Harmonic Mean (HM)",
      intuition:
        "Harmonic mean is the right average when the quantity you care about " +
        "is a rate — like speed when distances are equal, or unit price when " +
        "money spent each year is the same. It's the reciprocal of the average reciprocal.",
      definition:
        "For \\(n\\) positive observations \\(x_1, x_2, \\ldots, x_n\\), the harmonic " +
        "mean is \\(n\\) divided by the sum of the reciprocals.",
      formula: {
        label: "Harmonic Mean",
        latex: "\\text{HM} = \\dfrac{n}{\\displaystyle\\sum_{i=1}^{n} \\dfrac{1}{x_i}} = \\dfrac{n}{\\dfrac{1}{x_1} + \\dfrac{1}{x_2} + \\cdots + \\dfrac{1}{x_n}}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of observations (all positive)" },
        ],
      },
      authoredExample: {
        prompt: "Find the harmonic mean of \\(4\\) and \\(6\\).",
        steps: [
          "Sum of reciprocals: \\(\\dfrac{1}{4} + \\dfrac{1}{6} = \\dfrac{3}{12} + \\dfrac{2}{12} = \\dfrac{5}{12}\\).",
          "Number of observations: \\(n = 2\\).",
          "Apply the formula: \\(\\text{HM} = \\dfrac{2}{5/12} = 2 \\times \\dfrac{12}{5} = \\dfrac{24}{5} = 4.8\\).",
        ],
        answer: "\\(\\text{HM} = 4.8\\)",
      },
      fadedExample: {
        prompt: "Find the harmonic mean of \\(3\\) and \\(6\\).",
        steps: [
          "Sum of reciprocals: \\(\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}\\).",
          "\\(n = 2\\).",
          "\\(\\text{HM} = 2 / (1/2) = 4\\).",
        ],
        answer: "\\(\\text{HM} = 4\\)",
        hiddenStepIndexes: [0],
      },
      selfCheckExample: {
        prompt: "Find the harmonic mean of \\(2\\) and \\(8\\).",
        steps: [
          "Sum of reciprocals: \\(\\dfrac{1}{2} + \\dfrac{1}{8} = \\dfrac{4}{8} + \\dfrac{1}{8} = \\dfrac{5}{8}\\).",
          "\\(\\text{HM} = 2 / (5/8) = 16/5 = 3.2\\).",
        ],
        answer: "\\(\\text{HM} = 3.2\\)",
      },
      practiceSet: [
        { prompt: "HM of \\(2\\) and \\(6\\)?", answer: "\\(3\\)", method: "\\(2 / (\\tfrac{1}{2}+\\tfrac{1}{6})\\)" },
        { prompt: "HM of \\(3\\) and \\(6\\)?", answer: "\\(4\\)", method: "\\(2 / \\tfrac{1}{2}\\)" },
        { prompt: "HM of \\(4\\) and \\(4\\)?", answer: "\\(4\\)", method: "equal values \\(\\Rightarrow\\) HM \\(=\\) value" },
        { prompt: "Which is largest for distinct positives: AM, GM, or HM?", answer: "AM", method: "\\(\\text{AM} \\geq \\text{GM} \\geq \\text{HM}\\)" },
      ],
      pyqExampleId: "3c181502-5d9d-48e8-b19d-c3d58738909f",
      traps: [
        {
          title: "Order is always \\(\\text{AM} \\geq \\text{GM} \\geq \\text{HM}\\)",
          body:
            "For any set of positive numbers, this inequality is strict unless every " +
            "observation is equal. If your computed HM exceeds GM or AM, you made " +
            "an arithmetic error.",
        },
        {
          title: "\\(\\text{GM}^2 = \\text{AM} \\times \\text{HM}\\) for two numbers",
          body:
            "For exactly two positive numbers, the geometric mean is the geometric mean " +
            "of the arithmetic and harmonic means: \\(\\text{GM}^2 = \\text{AM} \\cdot \\text{HM}\\). " +
            "When a PYQ gives you two of \\(\\{\\text{AM}, \\text{GM}, \\text{HM}\\}\\) for " +
            "a pair (e.g. \\(5\\,\\text{HM} = 4\\,\\text{GM}\\)), use this identity to " +
            "recover the third without solving for the original numbers — much faster " +
            "than setting up two equations in \\(m, n\\).",
        },
      ],
    },

    // 11 ──────────────────────────────────────────────────────────────────────
    {
      slug: "sum-of-deviations-empirical",
      name: "Sum of Deviations & the Empirical Relation",
      intuition:
        "Two identities every NDA aspirant should reflexively know. First: the " +
        "deviations of all observations from their mean always sum to zero. " +
        "Second: for moderately skewed unimodal data, mode, median and mean lie " +
        "in a fixed empirical ratio.",
      definition:
        "\\(\\sum (x_i - \\bar{x}) = 0\\) for any dataset — this is a defining " +
        "property of the mean. The empirical relation \\(\\text{Mode} \\approx " +
        "3\\,\\text{Median} - 2\\,\\text{Mean}\\) holds approximately for " +
        "moderately skewed unimodal distributions and is used to recover the " +
        "third measure when two are known.",
      formula: {
        label: "Two identities to memorise",
        latex:
          "\\sum_{i=1}^{n}(x_i - \\bar{x}) = 0 \\qquad \\text{and} \\qquad \\text{Mode} \\approx 3\\,\\text{Median} - 2\\,\\text{Mean}",
      },
      authoredExample: {
        prompt:
          "If the mean of 5 numbers is 10, what is the sum of deviations of the " +
          "numbers from their mean?",
        steps: [
          "Use the identity \\(\\sum(x_i - \\bar{x}) = 0\\), which holds for any dataset.",
          "Verify by expansion: \\(\\sum(x_i - \\bar{x}) = \\sum x_i - n\\bar{x} = n\\bar{x} - n\\bar{x} = 0\\).",
          "Plugging in \\(n = 5,\\ \\bar{x} = 10\\) gives \\(50 - 50 = 0\\).",
        ],
        answer: "Sum of deviations \\(= 0\\)",
      },
      fadedExample: {
        prompt:
          "If the mean of 8 numbers is 25, find the sum of deviations of the " +
          "numbers from their mean.",
        steps: [
          "Use the identity: \\(\\sum (x_i - \\bar{x}) = 0\\) for any dataset.",
          "Why? \\(\\sum(x_i - \\bar{x}) = \\sum x_i - n\\bar{x} = n\\bar{x} - n\\bar{x} = 0\\).",
          "So the answer is \\(0\\) regardless of the specific value of \\(n\\) or \\(\\bar{x}\\).",
        ],
        answer: "Sum of deviations \\(= 0\\)",
        hiddenStepIndexes: [1],
      },
      selfCheckExample: {
        prompt:
          "For a moderately skewed unimodal distribution, the mean is \\(30\\) " +
          "and the median is \\(28\\). Use the empirical relation to find the mode.",
        steps: [
          "Apply \\(\\text{Mode} \\approx 3 \\,\\text{Median} - 2 \\,\\text{Mean}\\).",
          "Substitute: \\(3 \\cdot 28 - 2 \\cdot 30 = 84 - 60 = 24\\).",
        ],
        answer: "\\(\\text{Mode} \\approx 24\\)",
      },
      practiceSet: [
        { prompt: "Sum of deviations of any dataset about its own mean?", answer: "\\(0\\)", method: "always zero" },
        { prompt: "Mean \\(30\\), median \\(27\\). Mode by the empirical relation?", answer: "\\(21\\)", method: "\\(3\\cdot 27 - 2\\cdot 30\\)" },
        { prompt: "Mean of \\(7\\) numbers is \\(4\\). Find \\(\\sum (x_i - 4)\\).", answer: "\\(0\\)" },
        { prompt: "Mode \\(12\\), mean \\(18\\). Median by the empirical relation?", answer: "\\(16\\)", method: "\\(12 = 3M - 36 \\Rightarrow M = 16\\)" },
      ],
      pyqExampleId: "9650e9ca-cc9b-4696-8607-0262116a0753",
      traps: [
        {
          title: "Sum of deviations is zero only about the mean",
          body:
            "About any other reference point \\(c\\), the sum equals " +
            "\\(\\sum x_i - nc = n(\\bar{x} - c)\\) — non-zero unless \\(c = \\bar{x}\\). " +
            "PYQs often plant a non-mean reference point to test exactly this.",
        },
        {
          title: "Empirical relation is approximate, not exact",
          body:
            "It works for moderately skewed unimodal data. For symmetric data " +
            "(mean = median = mode) it is trivially true. For multimodal or " +
            "heavily skewed data it can be misleading.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Dispersion — Standard Deviation, Variance, Mean Deviation",
      href: "/notes/nda-maths/statistics/dispersion",
    },
    {
      label: "Frequency Distributions and Graphical Representation",
      href: "/notes/nda-maths/statistics/frequency-distributions",
    },
  ],
};
