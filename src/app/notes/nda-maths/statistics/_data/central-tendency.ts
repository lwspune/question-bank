import type { SubtopicNote } from "@/app/notes/_types";

export const CENTRAL_TENDENCY_NOTE: SubtopicNote = {
  subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
  title: "Measures of Central Tendency",
  oneLineDefinition:
    "A single value that summarises where a dataset is centred — mean, median, or mode.",
  whyItMatters:
    "48 PYQs across 2021–2026 — the biggest subtopic in NDA Statistics. " +
    "Most questions test linear-transformation effects on the mean, grouped-data " +
    "calculations, or the sum-of-deviations identity. Master the eight concepts " +
    "below and you cover 22 EASY + 18 MODERATE marks reliably.",
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
      drillQuestionIds: [
        "2edc3844-7df9-457b-80f0-8f8ca92b9f08", // replace x_n with k
        "b97d7058-a71c-4b2f-9bba-e154e4701f8c", // average correction
        "bd283867-958b-4224-b741-1366d0a7d55a", // mean of naturals in [15,64]
        "4bd4c8d9-c625-4b44-b09e-da16e52b7b49", // mean of 8² to 15²
        "599b1022-193e-44f0-9c08-3d0774b8b0c1", // mean of 1,4,9,...,n²=130
        "28c1b7f9-8cf0-4e54-96ae-acea8a9c956f", // 12 dice means of low/high subsets
        "1cd7d383-10a6-4823-998a-e1c6c2ab6ef0", // x/y = 55/42
      ],
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
      drillQuestionIds: [
        "0b0def6f-27ff-4d01-8697-9c63713d5365", // frequency of each class doubled
        "35bc2890-c38f-4951-b4f6-5aba809b9656", // mean with binomial-coeff frequencies
        "ba093f3c-8eb5-4c57-948d-98723a554f25", // Σ x_i f_i
        "acbb5db5-5af7-4e75-b7f3-13e49985e3f6", // mean of the distribution
      ],
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
      drillQuestionIds: [
        "5b072042-32c9-4871-b963-ff019714dc2d", // mean of (x_i - k) → mean of x_i
        "c019375a-659d-465f-8f11-3c4ebadb09ec", // multiply by 4, subtract from 44
        "618e67e3-6b15-4a67-875b-d9bd302d000b", // Σ 100(2x_i + 4)
        "7b22e8d7-d22f-431c-b168-aa0970b528d5", // Σ (3x_i - 45)
      ],
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
      drillQuestionIds: [
        "76ed2266-a695-4563-bb6d-c665c476d0b5", // median of marks
        "acc99b4d-2156-42c9-8022-f74dda5d530a", // medians of first-5 vs last-5
        "b76c9357-8996-452e-8c32-7ed039ec57f5", // median of x with frequencies
        "ce598d2e-8eab-4c72-9537-2c0861c29f21", // median of the distribution
        "714925f8-59a7-404e-884e-b9a6ab3846a7", // median (set context)
      ],
      traps: [
        {
          title: "Always sort before reading off the middle",
          body:
            "The median of an unsorted list is not the middle of the original order. " +
            "PYQs sometimes hand you data in random order to catch this.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
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
      drillQuestionIds: [
        "32f6cd31-d333-467e-a725-a2eb0cba5e32", // mode of die throws
        "5cef410e-bfb9-4345-86b4-383b149d59a8", // mode of the distribution
      ],
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

    // 6 ───────────────────────────────────────────────────────────────────────
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
      drillQuestionIds: [
        "6a7469fb-d26c-426f-8e7b-d8a010f05717", // GM of 2,4,8,…,1024
        "fe08e47f-49ca-4962-a235-14b333be5197", // AM vs GM: uses all data
        "44f9500d-fc01-40a7-acbd-b138f4ba007c", // HM=x, GM=y, 5x=4y relation
      ],
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

    // 7 ───────────────────────────────────────────────────────────────────────
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
      drillQuestionIds: [
        "54703ec3-c779-48f3-9799-a03c8cf2dd59", // edible oil at 150/200/250/300 (equal money)
        "87b78a01-b7cd-4eda-a8a8-1248bd381cf8", // HM of C(10,3)…C(10,7)
        "8e808b55-035c-4c4c-8946-783f5326f3ad", // HM of 1,2,4,…,2^(n-1)
        "44f9500d-fc01-40a7-acbd-b138f4ba007c", // HM=x, GM=y, 5x=4y relation
      ],
      traps: [
        {
          title: "Order is always \\(\\text{AM} \\geq \\text{GM} \\geq \\text{HM}\\)",
          body:
            "For any set of positive numbers, this inequality is strict unless every " +
            "observation is equal. If your computed HM exceeds GM or AM, you made " +
            "an arithmetic error.",
        },
      ],
    },

    // 8 ───────────────────────────────────────────────────────────────────────
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
      drillQuestionIds: [
        "6ac77c44-d86d-4fe0-9482-006be4008514", // deviations from 99
        "d92e02af-1b48-4084-9ad5-5c9910938e5a", // deviations from median
        "e978d39f-2cb0-4b5b-a721-dadc1b544ba6", // deviations from y sum to 180, find y
        "1d21177e-685f-4298-8ea1-c6f4206f7ceb", // deviations from 10 and 20, (p-q)²=10000
        "50157ec3-2f8e-4dad-95ee-a1c9672a687a", // when mean = median = mode
        "b41e2929-003e-4466-ba59-a15ade9b7704", // frequency curve skewed left
        "ebb35f72-bde8-4f18-adaa-959951947340", // mean > mode, median > mean (set)
        "2ed4b11a-5141-42fd-b721-9f8e4c1460c0", // 5P=4Q=R/2 empirical relation
      ],
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
