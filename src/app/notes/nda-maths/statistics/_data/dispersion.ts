import type { SubtopicNote } from "@/app/notes/_types";

export const DISPERSION_NOTE: SubtopicNote = {
  subtopicName: "Dispersion — Standard Deviation, Variance, Mean Deviation",
  title: "Dispersion — Standard Deviation, Variance, Mean Deviation",
  oneLineDefinition:
    "How spread out the data is around its centre — mean deviation, variance and standard deviation each measure spread on a different scale.",
  whyItMatters:
    "44 PYQs across 2017–2026. 22 EASY + 18 MODERATE + 4 HARD — almost every paper has one. The favourite shapes are linear-transformation effects on SD, " +
    "the computational identity that links mean-of-squares to mean-squared and variance, and coefficient-of-variation comparisons. " +
    "Master the six concepts below and dispersion becomes formulaic, not intimidating.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "mean-deviation",
      name: "Mean Deviation",
      visualizationSlug: "mean-deviation-spread",
      intuition:
        "Average distance between each observation and a chosen centre — almost always the mean or the median. It is the simplest measure of spread, " +
        "but its absolute-value formula makes algebra clunky, which is why SD is preferred in higher statistics.",
      definition:
        "For \\(n\\) observations \\(x_1,\\ldots,x_n\\) and a reference value \\(A\\), the mean deviation about \\(A\\) is the average of the absolute deviations from \\(A\\). " +
        "When \\(A\\) is the median, the mean deviation is minimum among all possible \\(A\\).",
      formula: {
        label: "Mean Deviation about A",
        latex: "\\text{MD}(A) = \\dfrac{1}{n}\\sum_{i=1}^{n}|x_i - A|",
        symbols: [
          { symbol: "\\(A\\)", meaning: "reference point (typically mean or median)" },
          { symbol: "\\(|x_i - A|\\)", meaning: "absolute deviation of \\(x_i\\) from \\(A\\)" },
        ],
      },
      authoredExample: {
        prompt: "Find the mean deviation of \\(2, 4, 6, 8, 10\\) about the mean.",
        steps: [
          "Compute the mean: \\(\\bar{x} = \\dfrac{2+4+6+8+10}{5} = 6\\).",
          "Compute absolute deviations from 6: \\(|2-6|, |4-6|, |6-6|, |8-6|, |10-6| = 4, 2, 0, 2, 4\\).",
          "Sum the absolute deviations: \\(4+2+0+2+4 = 12\\).",
          "Divide by \\(n\\): \\(\\text{MD} = \\dfrac{12}{5} = 2.4\\).",
        ],
        answer: "\\(\\text{MD} = 2.4\\)",
      },
      selfCheckExample: {
        prompt: "Find the mean deviation of \\(3, 6, 9, 12\\) about the mean.",
        steps: [
          "Mean: \\(\\bar{x} = (3+6+9+12)/4 = 30/4 = 7.5\\).",
          "Absolute deviations: \\(4.5,\\ 1.5,\\ 1.5,\\ 4.5\\). Sum = 12.",
          "\\(\\text{MD} = 12/4 = 3\\).",
        ],
        answer: "\\(\\text{MD} = 3\\)",
      },
      practiceSet: [
        { prompt: "Mean deviation of \\(2, 4, 6\\) about the mean \\((\\bar{x}=4)\\)?", answer: "\\(\\tfrac{4}{3}\\)", method: "\\((2+0+2)/3\\)" },
        { prompt: "Mean deviation of \\(1, 2, 3\\) about the mean?", answer: "\\(\\tfrac{2}{3}\\)", method: "\\(\\bar{x}=2\\); \\((1+0+1)/3\\)" },
        { prompt: "Mean deviation of \\(10, 20\\) about the mean?", answer: "\\(5\\)", method: "\\(\\bar{x}=15\\); \\((5+5)/2\\)" },
        { prompt: "Mean deviation of \\(5, 5, 5\\)?", answer: "\\(0\\)", method: "no spread" },
      ],
      pyqExampleId: "20f73222-eb92-4483-ae18-494bfde621ec",
      traps: [
        {
          title: "Mean deviation about median is always \\(\\leq\\) about the mean",
          body:
            "Among all reference points \\(A\\), the median minimises \\(\\sum|x_i - A|\\). " +
            "If a PYQ asks for the minimum mean deviation, the answer uses the median, not the mean.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "variance",
      name: "Variance",
      intuition:
        "Average of the squared distances from the mean. Squaring kills the absolute-value bracket and gives variance much better algebraic properties — " +
        "but the unit becomes the data's unit squared (cm becomes cm², rupees becomes rupees²), which is why we usually report its square root, the standard deviation.",
      definition:
        "For \\(n\\) observations with mean \\(\\bar{x}\\), the variance is the average of the squared deviations from \\(\\bar{x}\\). " +
        "It can also be computed using the identity \\(\\sigma^2 = \\overline{x^2} - \\bar{x}^2\\), where \\(\\overline{x^2}\\) is the mean of the squares.",
      formula: {
        label: "Variance — two equivalent forms",
        latex:
          "\\sigma^2 = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2 = \\dfrac{\\sum x_i^2}{n} - \\bar{x}^2",
        symbols: [
          { symbol: "\\(\\sigma^2\\)", meaning: "variance" },
          { symbol: "\\(\\bar{x}\\)", meaning: "arithmetic mean" },
          { symbol: "\\(\\sum x_i^2\\)", meaning: "sum of squares of observations" },
        ],
      },
      visualizationSlug: "variance-squared-deviations",
      authoredExample: {
        prompt: "Find the variance of \\(2, 4, 6, 8, 10\\).",
        steps: [
          "Compute the mean: \\(\\bar{x} = 6\\).",
          "Compute squared deviations: \\((2-6)^2, (4-6)^2, (6-6)^2, (8-6)^2, (10-6)^2 = 16, 4, 0, 4, 16\\).",
          "Sum the squared deviations: \\(16 + 4 + 0 + 4 + 16 = 40\\).",
          "Divide by \\(n\\): \\(\\sigma^2 = \\dfrac{40}{5} = 8\\).",
        ],
        answer: "\\(\\sigma^2 = 8\\)",
      },
      selfCheckExample: {
        prompt:
          "For 5 observations, \\(\\sum x_i = 30\\) and \\(\\sum x_i^2 = 220\\). " +
          "Find the variance.",
        steps: [
          "Mean: \\(\\bar{x} = 30/5 = 6\\).",
          "Use the computational identity: \\(\\sigma^2 = \\dfrac{\\sum x_i^2}{n} - \\bar{x}^2 = 220/5 - 36 = 44 - 36 = 8\\).",
        ],
        answer: "\\(\\sigma^2 = 8\\)",
      },
      practiceSet: [
        { prompt: "Variance of \\(1, 2, 3\\) \\((\\bar{x}=2)\\)?", answer: "\\(\\tfrac{2}{3}\\)", method: "\\((1+0+1)/3\\)" },
        { prompt: "Variance of \\(2, 4, 6\\) \\((\\bar{x}=4)\\)?", answer: "\\(\\tfrac{8}{3}\\)", method: "\\((4+0+4)/3\\)" },
        { prompt: "Variance of \\(5, 5, 5\\)?", answer: "\\(0\\)" },
        { prompt: "Variance of \\(0, 10\\) \\((\\bar{x}=5)\\)?", answer: "\\(25\\)", method: "\\((25+25)/2\\)" },
      ],
      pyqExampleId: "dce15c09-9f56-43af-b675-a154d1cba3e9",
      traps: [
        {
          title: "Computational form saves time on \\(\\Sigma x_i^2\\)-style PYQs",
          body:
            "When you are given \\(\\sum x_i\\) and \\(\\sum x_i^2\\) directly, use \\(\\sigma^2 = \\overline{x^2} - \\bar{x}^2\\) — " +
            "not the original definition. NDA papers favour this shape because it tests whether you remember the identity.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "standard-deviation",
      name: "Standard Deviation",
      intuition:
        "Square root of the variance — brings the unit back to the data's original unit. SD is what statisticians actually report when they talk about \"spread\". " +
        "If the data is in centimetres, SD is in centimetres; if in rupees, SD is in rupees. Variance lives in squared units.",
      definition:
        "The standard deviation is the non-negative square root of the variance. It has the same unit as the original observations.",
      formula: {
        label: "Standard Deviation",
        latex: "\\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2}",
        symbols: [
          { symbol: "\\(\\sigma\\)", meaning: "standard deviation (always \\(\\geq 0\\))" },
        ],
      },
      authoredExample: {
        prompt: "Find the standard deviation of \\(2, 4, 6, 8, 10\\).",
        steps: [
          "From the variance example above, \\(\\sigma^2 = 8\\).",
          "Take the square root: \\(\\sigma = \\sqrt{8} = 2\\sqrt{2}\\).",
          "Numerically, \\(\\sigma \\approx 2.83\\).",
        ],
        answer: "\\(\\sigma = 2\\sqrt{2} \\approx 2.83\\)",
      },
      selfCheckExample: {
        prompt: "Find the standard deviation of \\(1, 2, 3, 4, 5\\).",
        steps: [
          "Mean: \\(\\bar{x} = 3\\). Squared deviations: \\(4, 1, 0, 1, 4\\). Sum = 10.",
          "Variance: \\(\\sigma^2 = 10/5 = 2\\).",
          "Standard deviation: \\(\\sigma = \\sqrt{2} \\approx 1.41\\).",
        ],
        answer: "\\(\\sigma = \\sqrt{2} \\approx 1.41\\)",
      },
      practiceSet: [
        { prompt: "Variance \\(16\\). Standard deviation?", answer: "\\(4\\)", method: "\\(\\sqrt{16}\\)" },
        { prompt: "Variance \\(49\\). Standard deviation?", answer: "\\(7\\)" },
        { prompt: "Variance \\(2\\). Standard deviation?", answer: "\\(\\sqrt{2}\\)" },
        { prompt: "SD of \\(3, 3, 3\\)?", answer: "\\(0\\)", method: "no spread" },
      ],
      pyqExampleId: "180027af-b87e-478d-93a1-0b1d4e271cd3",
      traps: [
        {
          title: "SD and mean deviation share units; variance does not",
          body:
            "If the data is measured in cm, SD and MD are also in cm but variance is in cm². " +
            "A PYQ asks \"which has the same unit as the mean?\" — answer is SD or MD, not variance.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "linear-transformation",
      name: "Linear Transformation of SD and Variance",
      intuition:
        "Adding a constant shifts every value but the spread between them is unchanged — so shift has zero effect on SD or variance. " +
        "Multiplying by \\(a\\) stretches all distances by \\(|a|\\), so SD scales by \\(|a|\\) and variance by \\(a^2\\).",
      definition:
        "If \\(Y = aX + b\\) is a linear transformation of \\(X\\), then the variance of \\(Y\\) is \\(a^2\\) times the variance of \\(X\\), " +
        "and the standard deviation of \\(Y\\) is \\(|a|\\) times the SD of \\(X\\). The shift \\(b\\) has no effect on either.",
      formula: {
        label: "Variance and SD under Y = aX + b",
        latex:
          "\\text{Var}(Y) = a^2\\,\\text{Var}(X) \\qquad \\sigma_Y = |a|\\,\\sigma_X",
        symbols: [
          { symbol: "\\(a\\)", meaning: "scale factor" },
          { symbol: "\\(b\\)", meaning: "shift — irrelevant for dispersion" },
        ],
      },
      authoredExample: {
        prompt: "The SD of a dataset \\(X\\) is 4. Find the SD of \\(Y = 3X + 7\\).",
        steps: [
          "Identify the transformation: \\(a = 3,\\ b = 7\\).",
          "The shift \\(b = 7\\) has no effect on SD.",
          "The multiplier \\(a = 3\\) scales SD by \\(|3| = 3\\).",
          "Therefore \\(\\sigma_Y = 3 \\times 4 = 12\\).",
        ],
        answer: "\\(\\sigma_Y = 12\\)",
      },
      selfCheckExample: {
        prompt: "If the SD of \\(X\\) is \\(6\\), find the SD of \\(Y = -2X + 10\\).",
        steps: [
          "Identify \\(a = -2,\\ b = 10\\). Shift ignored.",
          "Apply: \\(\\sigma_Y = |a| \\cdot \\sigma_X = 2 \\cdot 6 = 12\\).",
        ],
        answer: "\\(\\sigma_Y = 12\\)",
      },
      practiceSet: [
        { prompt: "SD is \\(5\\). SD of \\(2X\\)?", answer: "\\(10\\)", method: "\\(|2|\\cdot 5\\)" },
        { prompt: "SD is \\(4\\). SD of \\(X + 100\\)?", answer: "\\(4\\)", method: "shift leaves SD unchanged" },
        { prompt: "Variance is \\(9\\). Variance of \\(3X\\)?", answer: "\\(81\\)", method: "\\(3^2\\cdot 9\\)" },
        { prompt: "SD is \\(6\\). SD of \\(-X\\)?", answer: "\\(6\\)", method: "\\(|-1|\\cdot 6\\)" },
      ],
      pyqExampleId: "33af29b2-fa37-43b9-a861-deb85008bbf4",
      traps: [
        {
          title: "Squaring \\(a\\) for variance, taking absolute value for SD",
          body:
            "Students often write \\(\\sigma_Y^2 = a\\,\\sigma_X^2\\) (forgetting the square) or \\(\\sigma_Y = a\\,\\sigma_X\\) (forgetting the modulus). " +
            "If \\(a\\) is negative, \\(|a|\\) is the correct scale for SD — SD is non-negative by definition.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "coefficient-of-variation",
      name: "Coefficient of Variation (CV)",
      intuition:
        "SD measures absolute spread, but a SD of 10 means different things on a salary scale (small) versus a marks scale (large). " +
        "CV normalises SD by the mean and reports a unitless percentage, so you can compare variability across totally different datasets.",
      definition:
        "The coefficient of variation is the ratio of the standard deviation to the arithmetic mean, expressed as a percentage. " +
        "The dataset with the higher CV is considered more variable.",
      formula: {
        label: "Coefficient of Variation",
        latex: "\\text{CV} = \\dfrac{\\sigma}{\\bar{x}} \\times 100 \\%",
        symbols: [
          { symbol: "\\(\\sigma\\)", meaning: "standard deviation" },
          { symbol: "\\(\\bar{x}\\)", meaning: "arithmetic mean" },
        ],
      },
      authoredExample: {
        prompt: "A dataset has mean \\(50\\) and standard deviation \\(10\\). Find its coefficient of variation.",
        steps: [
          "Apply the formula: \\(\\text{CV} = \\dfrac{\\sigma}{\\bar{x}} \\times 100\\).",
          "Substitute: \\(\\text{CV} = \\dfrac{10}{50} \\times 100\\).",
          "Compute: \\(\\text{CV} = 0.2 \\times 100 = 20\\%\\).",
        ],
        answer: "\\(\\text{CV} = 20\\%\\)",
      },
      selfCheckExample: {
        prompt:
          "Dataset A has mean \\(100\\), SD \\(15\\). Dataset B has mean \\(40\\), SD \\(8\\). Which is more variable?",
        steps: [
          "\\(\\text{CV}_A = (15 / 100) \\times 100 = 15\\%\\).",
          "\\(\\text{CV}_B = (8 / 40) \\times 100 = 20\\%\\).",
          "Higher CV means more variability, so B is more variable.",
        ],
        answer: "\\(B\\) is more variable (\\(\\text{CV}_A = 15\\%,\\ \\text{CV}_B = 20\\%\\)).",
      },
      practiceSet: [
        { prompt: "Mean \\(50\\), SD \\(5\\). CV?", answer: "\\(10\\%\\)", method: "\\((5/50)\\times 100\\)" },
        { prompt: "Mean \\(20\\), SD \\(4\\). CV?", answer: "\\(20\\%\\)" },
        { prompt: "Mean \\(100\\), SD \\(25\\). CV?", answer: "\\(25\\%\\)" },
        { prompt: "Mean \\(40\\), SD \\(0\\). CV?", answer: "\\(0\\%\\)", method: "no spread" },
      ],
      pyqExampleId: "e216a45f-d881-4f2c-948c-be9f7ec69f60",
      traps: [
        {
          title: "CV is unitless — that's the entire point",
          body:
            "Some answers give CV with a unit attached. Wrong. CV is a percentage. " +
            "If the question compares two datasets with different units (e.g. height in cm vs weight in kg), only CV makes a fair comparison — not SD.",
        },
      ],
    },

    // 6 ───────────────────────────────────────────────────────────────────────
    {
      slug: "computational-identity",
      name: "Computational Identity & Minimum-SSE Property",
      intuition:
        "Two identities that NDA papers exploit relentlessly. First: the mean of the squares equals the variance plus the square of the mean. " +
        "Second: among all reference points, the sum of squared deviations is minimised when the reference is the mean (the median minimises absolute deviations; the mean minimises squared deviations).",
      definition:
        "From \\(\\sigma^2 = \\overline{x^2} - \\bar{x}^2\\) follows the identity \\(\\sum x_i^2 = n(\\sigma^2 + \\bar{x}^2)\\). " +
        "Also, the function \\(f(a) = \\sum (x_i - a)^2\\) is minimised when \\(a = \\bar{x}\\).",
      formula: {
        label: "Two load-bearing identities",
        latex:
          "\\dfrac{\\sum x_i^2}{n} = \\bar{x}^2 + \\sigma^2 \\qquad \\text{and} \\qquad \\arg\\min_{a}\\sum_{i}(x_i - a)^2 = \\bar{x}",
      },
      authoredExample: {
        prompt:
          "Given \\(\\sum x_i = 50\\) and \\(\\sum x_i^2 = 530\\) for \\(n = 10\\) observations, find the variance.",
        steps: [
          "Compute the mean: \\(\\bar{x} = \\dfrac{50}{10} = 5\\).",
          "Use the identity \\(\\sigma^2 = \\dfrac{\\sum x_i^2}{n} - \\bar{x}^2\\).",
          "Substitute: \\(\\sigma^2 = \\dfrac{530}{10} - 5^2 = 53 - 25\\).",
          "Compute: \\(\\sigma^2 = 28\\).",
        ],
        answer: "\\(\\sigma^2 = 28\\)",
      },
      selfCheckExample: {
        prompt:
          "If the mean of 4 observations is 5 and the variance is 4, find \\(\\sum x_i^2\\).",
        steps: [
          "Rearrange: \\(\\sum x_i^2 = n(\\bar{x}^2 + \\sigma^2)\\).",
          "Substitute: \\(\\sum x_i^2 = 4 \\cdot (25 + 4) = 4 \\cdot 29 = 116\\).",
        ],
        answer: "\\(\\sum x_i^2 = 116\\)",
      },
      practiceSet: [
        { prompt: "Mean of squares \\(30\\), mean \\(5\\). Variance?", answer: "\\(5\\)", method: "\\(30 - 25\\)" },
        { prompt: "\\(n=5\\), \\(\\sum x^2 = 100\\), \\(\\bar{x}=4\\). Variance?", answer: "\\(4\\)", method: "\\(100/5 - 16\\)" },
        { prompt: "Variance \\(9\\), mean \\(4\\). Mean of squares?", answer: "\\(25\\)", method: "\\(\\sigma^2 + \\bar{x}^2 = 9 + 16\\)" },
        { prompt: "Mean of squares \\(50\\), mean \\(7\\). Variance?", answer: "\\(1\\)", method: "\\(50 - 49\\)" },
      ],
      pyqExampleId: "65867660-2a97-4b50-8e85-577c7b1e95df",
      traps: [
        {
          title: "\\(\\overline{x^2} \\neq (\\bar{x})^2\\) — they differ by exactly \\(\\sigma^2\\)",
          body:
            "Mean of the squares is NOT the square of the mean. Their difference is the variance: \\(\\overline{x^2} - \\bar{x}^2 = \\sigma^2 \\geq 0\\). " +
            "PYQs plant this trap by asking for \"mean of squares\" or \"\\(M^2 + \\sigma^2\\)\" and expecting you to recognise it as \\(\\sum x_i^2/n\\).",
        },
        {
          title: "Scaling inside the deviation moves the minimiser too",
          body:
            "For \\(S(a) = \\sum (c\\,x_i - a)^2\\), expand and minimise: the minimum is at " +
            "\\(a = c\\,\\bar{x}\\), NOT \\(a = \\bar{x}\\). PYQs commonly use \\(c = 2\\) " +
            "(e.g. \\(S = \\sum (2x_i - a)^2\\)) and expect you to identify the minimiser as " +
            "\\(2\\bar{x}\\) — twice the mean, not the mean.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Measures of Central Tendency — linear transformation of mean",
      href: "/notes/nda-maths/statistics/central-tendency",
    },
    {
      label: "Regression and Correlation — uses SD and variance heavily",
      href: "/notes/nda-maths/statistics/regression-correlation",
    },
  ],
};
