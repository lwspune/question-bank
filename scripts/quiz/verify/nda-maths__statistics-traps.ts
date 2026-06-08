/**
 * NDA Maths · Statistics · the "Common Traps" theme.
 *
 * Trap atoms are SEEDS — placeholder stem + empty key — so each entry here
 * authors the FULL question via the `stem` + `correct` overrides. Every question
 * is engineered so the misconception is the most TEMPTING wrong option. Theme
 * stays 'trap' (no override). Run:
 *   npm run quiz:verify nda-maths__statistics-traps
 *
 * 17 distinct traps → one 17-question "Common Traps" quiz (balanced sizing).
 * Deliberately SKIPS the ~half of seeds whose misconception the Properties quiz
 * already drills (AM≥GM≥HM, sum-of-deviations=0, |r|≤1, both lines through the
 * mean, pie-chart angles sum 360°, bimodal mode) + the duplicate `:trap:1` seeds.
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Central tendency ──────────────────────────────────────────────
  {
    atomKey: "arithmetic-mean-grouped:trap:0",
    stem: "A grouped table has class means \\(10, 20, 30, 40\\) with frequencies \\(1, 2, 3, 4\\). What is the overall mean?",
    correct: f("30"), // Σfx/Σf = 300/10
    distractors: [f("75"), f("25"), f("35")], // 75 = 300÷4 classes; 25 = plain avg of the means
  },
  {
    atomKey: "combined-mean-weighted:trap:0",
    stem: "Group A has \\(20\\) students with mean \\(60\\); group B has \\(30\\) students with mean \\(70\\). What is the combined mean?",
    correct: f("66"), // (20·60+30·70)/50
    distractors: [f("65"), f("130"), f("64")], // 65 = plain average of the two means
  },
  {
    atomKey: "mean-linear-transformation:trap:0",
    stem: "A data set has mean \\(50\\) and standard deviation \\(8\\). If \\(5\\) is added to every value, the new standard deviation is:",
    correct: f("8"), // shift leaves SD unchanged
    distractors: [f("13"), f("55"), f("40")], // 13 = adding 5 to the SD
  },
  {
    atomKey: "mean-replacement-correction:trap:0",
    stem: "The mean of \\(10\\) observations is \\(25\\). One value was wrongly recorded as \\(40\\) instead of the correct \\(60\\). The corrected mean is:",
    correct: f("27"), // 25 + (60−40)/10
    distractors: [f("45"), f("23"), f("47")], // 45 = adding the full 20; 23 = wrong direction
  },
  {
    atomKey: "median:trap:0",
    stem: "Find the median of \\(5,\\ 9,\\ 2,\\ 7,\\ 1\\).",
    correct: f("5"), // sorted 1,2,5,7,9 → middle
    distractors: [f("2"), f("4.8"), f("9")], // 2 = middle of the UNSORTED list; 4.8 = the mean
  },
  {
    atomKey: "special-case-means:trap:0",
    stem: "What is the arithmetic mean of \\(2,\\ 4,\\ 8,\\ 16,\\ 32\\)?",
    correct: f("12.4"), // 62/5
    distractors: [f("17"), f("8"), f("16")], // 17 = (first+last)/2 AP shortcut; 8 = the middle term
  },
  {
    atomKey: "geometric-mean:trap:0",
    stem: "Which statement about the geometric mean (GM) is correct?",
    correct: "It is defined only for positive observations",
    distractors: [
      "It can be computed for any set that contains a zero",
      "It is never smaller than the arithmetic mean",
      "It is unaffected by very large values",
    ],
  },

  // ── Dispersion ────────────────────────────────────────────────────
  {
    atomKey: "coefficient-of-variation:trap:0",
    stem: "A data set has mean \\(40\\) cm and standard deviation \\(8\\) cm. Its coefficient of variation is:",
    correct: f("20\\%"), // (SD/mean)×100, unitless
    distractors: [f("8\\text{ cm}"), f("0.2"), f("20\\text{ cm}")], // 0.2 = forgot ×100; 20 cm = unit attached
  },
  {
    atomKey: "computational-identity:trap:0",
    stem: "A data set has mean \\(5\\) and variance \\(4\\). What is the mean of the squares, \\(\\overline{x^2}\\)?",
    correct: f("29"), // σ² + x̄² = 4 + 25
    distractors: [f("25"), f("21"), f("4")], // 25 = the square of the mean (the trap)
  },
  {
    atomKey: "linear-transformation:trap:0",
    stem: "Each value of a data set with standard deviation \\(6\\) is multiplied by \\(-3\\). The standard deviation of the new data is:",
    correct: f("18"), // |−3|·6
    distractors: [f("-18"), f("54"), f("6")], // −18 = kept the sign; 54 = squared the −3
  },
  {
    atomKey: "mean-deviation:trap:0",
    stem: "The mean deviation of a data set is LEAST when measured about the:",
    correct: "Median",
    distractors: ["Mean", "Mode", "Range"],
  },
  {
    atomKey: "special-case-variance:trap:0",
    stem: "The variance of the first \\(n\\) natural numbers is:",
    correct: f("\\dfrac{n^2-1}{12}"),
    distractors: [f("\\dfrac{n^2}{12}"), f("\\dfrac{n^2+1}{12}"), f("\\dfrac{n-1}{12}")], // dropping the −1
  },
  {
    atomKey: "standard-deviation:trap:0",
    stem: "A data set is measured in kilograms. Which measure has the SAME unit as the data?",
    correct: "Standard deviation",
    distractors: ["Variance", "Coefficient of variation", "Variance × mean"], // variance is kg²
  },

  // ── Frequency distributions ───────────────────────────────────────
  {
    atomKey: "histograms-polygons-ogives:trap:0",
    stem: "In a histogram with UNEQUAL class widths, the height of each bar represents the:",
    correct: "Frequency density (frequency ÷ class width)",
    distractors: ["Frequency", "Cumulative frequency", "Class width"], // equal-height-for-equal-frequency trap
  },
  {
    atomKey: "reading-frequency-tables:trap:0",
    stem: "In a cumulative frequency table, the cumulative frequency of the third class equals:",
    correct: "The sum of the frequencies of the first three classes",
    distractors: [
      "The frequency of the third class only",
      "The frequencies of the third class onward",
      "The total frequency divided by three",
    ],
  },

  // ── Regression & correlation ──────────────────────────────────────
  {
    atomKey: "angle-between-regression-lines:trap:0",
    stem: "The regression line of \\(x\\) on \\(y\\) is written \\(x = a + b_{xy}\\,y\\). Its slope in the \\((x, y)\\)-plane (\\(dy/dx\\)) is:",
    correct: f("\\dfrac{1}{b_{xy}}"), // reciprocal — NOT b_xy
    distractors: [f("b_{xy}"), f("-b_{xy}"), f("b_{xy}^2")], // b_xy = reading the coefficient as the slope
  },
  {
    atomKey: "identifying-regression-line:trap:0",
    stem: "Given two lines and asked which is the \\(y\\)-on-\\(x\\) regression line, the reliable test is to pick the assignment for which:",
    correct: f("b_{yx}\\cdot b_{xy} \\leq 1"),
    distractors: [f("b_{yx}\\cdot b_{xy} \\geq 1"), f("b_{yx} > b_{xy}"), "The line has the steeper slope"],
  },
];
