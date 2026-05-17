import type { SubtopicNote } from "@/app/notes/_types";

export const CENTRAL_TENDENCY_NOTE: SubtopicNote = {
  subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
  title: "Measures of Central Tendency",
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
