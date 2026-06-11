/**
 * NDA Maths · Statistics · per-FORMULA recall MCQs (the bundle-split pass).
 *
 * Bundle-formula concepts are harvested as one needs_review SLOT per piece
 * (concept:formula:0,1,…). Here each genuine formula gets a specific stem + 3
 * TEMPTING PERMUTATION distractors (wrong versions of the same formula — far
 * better than random sibling formulas). Run:
 *   npm run quiz:verify nda-maths__statistics-formulas
 *
 * Skipped (judgment — not formulas): computational-identity:formula:1 (\text{and}),
 * mean-linear-transformation:formula:0/1 (trivial setup + \Longrightarrow).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Grouped-data basics ──────────────────────────────────────────
  {
    atomKey: "class-marks-and-class-width:formula:0",
    stem: "Which is the formula for the class mark (mid-value) of a class with lower boundary \\(L\\) and upper boundary \\(U\\)?",
    distractors: [f("x_{\\text{mark}} = \\dfrac{U-L}{2}"), f("x_{\\text{mark}} = U - L"), f("x_{\\text{mark}} = L + U")],
    theme: "formula",
  },
  {
    atomKey: "class-marks-and-class-width:formula:1",
    stem: "Which is the formula for the class width \\(h\\) of a class with limits \\(L\\) and \\(U\\)?",
    distractors: [f("h = \\dfrac{U+L}{2}"), f("h = U + L"), f("h = \\dfrac{U-L}{2}")],
    theme: "formula",
  },

  // ── Dispersion identities ────────────────────────────────────────
  {
    atomKey: "computational-identity:formula:0",
    stem: "Which identity relates the mean of the squares to the mean and the variance?",
    distractors: [
      f("\\dfrac{\\sum x_i^2}{n} = \\bar{x}^2 - \\sigma^2"),
      f("\\dfrac{\\sum x_i^2}{n} = \\sigma^2 - \\bar{x}^2"),
      f("\\dfrac{\\sum x_i^2}{n} = (\\bar{x} + \\sigma)^2"),
    ],
    theme: "formula",
  },
  {
    atomKey: "computational-identity:formula:2",
    stem: "The sum of squared deviations \\(\\sum_i (x_i - a)^2\\) is minimised when \\(a\\) equals:",
    correct: f("\\bar{x}\\ (\\text{the mean})"),
    distractors: [f("M\\ (\\text{the median})"), "The mode", f("0")],
    theme: "property",
  },
  {
    atomKey: "linear-transformation:formula:0",
    stem: "If \\(Y = aX + b\\), the variance of \\(Y\\) is:",
    correct: f("\\text{Var}(Y) = a^2\\,\\text{Var}(X)"),
    distractors: [f("\\text{Var}(Y) = a\\,\\text{Var}(X)"), f("\\text{Var}(Y) = a^2\\,\\text{Var}(X) + b"), f("\\text{Var}(Y) = |a|\\,\\text{Var}(X)")],
    theme: "formula",
  },
  {
    atomKey: "linear-transformation:formula:1",
    stem: "If \\(Y = aX + b\\), the standard deviation of \\(Y\\) is:",
    correct: f("\\sigma_Y = |a|\\,\\sigma_X"),
    distractors: [f("\\sigma_Y = a\\,\\sigma_X"), f("\\sigma_Y = a^2\\,\\sigma_X"), f("\\sigma_Y = |a|\\,\\sigma_X + b")],
    theme: "formula",
  },
  {
    atomKey: "special-case-variance:formula:0",
    stem: "Which is the variance of the first \\(n\\) natural numbers \\(1, 2, \\ldots, n\\)?",
    correct: f("\\dfrac{n^2 - 1}{12}"),
    distractors: [f("\\dfrac{n^2}{12}"), f("\\dfrac{n^2 + 1}{12}"), f("\\dfrac{n^2 - 1}{6}")],
    theme: "formula",
  },
  {
    atomKey: "special-case-variance:formula:1",
    stem: "An AP has common difference \\(d\\) and \\(n\\) terms. Its variance is:",
    correct: f("d^2\\,\\dfrac{n^2 - 1}{12}"),
    distractors: [f("\\dfrac{n^2 - 1}{12}"), f("d\\,\\dfrac{n^2 - 1}{12}"), f("d^2\\,\\dfrac{n^2 + 1}{12}")],
    theme: "formula",
  },

  // ── Means: special cases + transformation ────────────────────────
  {
    atomKey: "mean-linear-transformation:formula:2",
    stem: "If \\(y_i = a\\,x_i + b\\) for every observation, the new mean \\(\\bar{y}\\) is:",
    correct: f("\\bar{y} = a\\,\\bar{x} + b"),
    distractors: [f("\\bar{y} = a\\,\\bar{x}"), f("\\bar{y} = a\\,\\bar{x} + nb"), f("\\bar{y} = \\bar{x} + b")],
    theme: "formula",
  },
  {
    atomKey: "special-case-means:formula:0",
    stem: "Which is the mean of the consecutive integers \\(a, a+1, \\ldots, b\\)?",
    correct: f("\\dfrac{a+b}{2}"),
    distractors: [f("\\dfrac{a+b}{2} + 1"), f("\\dfrac{b-a}{2}"), f("\\dfrac{a+b+1}{2}")],
    theme: "formula",
  },
  {
    atomKey: "special-case-means:formula:1",
    stem: "Which is the mean of the squares \\(1^2, 2^2, \\ldots, n^2\\)?",
    correct: f("\\dfrac{(n+1)(2n+1)}{6}"),
    distractors: [f("\\dfrac{n(n+1)}{2}"), f("\\dfrac{(n+1)(2n+1)}{2}"), f("\\dfrac{n(2n+1)}{6}")],
    theme: "formula",
  },
  {
    atomKey: "special-case-means:formula:2",
    stem: "Which is the mean of an arithmetic progression with first term \\(a_1\\) and last term \\(a_n\\)?",
    correct: f("\\dfrac{a_1 + a_n}{2}"),
    distractors: [f("\\dfrac{a_1 \\cdot a_n}{2}"), f("\\dfrac{a_n - a_1}{2}"), f("a_1 + a_n")],
    theme: "formula",
  },
  {
    atomKey: "summation-notation:formula:1",
    stem: "For a constant \\(c\\), the sum \\(\\sum_{i=1}^{n} c\\) equals:",
    correct: f("nc"),
    distractors: [f("c"), f("\\dfrac{c}{n}"), f("c^n")],
    theme: "formula",
  },
  {
    atomKey: "summation-notation:formula:2",
    stem: "Which is the correct expansion of \\(\\sum_{i=1}^{n}(a x_i + b)\\)?",
    correct: f("a\\sum x_i + nb"),
    distractors: [f("a\\sum x_i + b"), f("a\\sum x_i + n b x_i"), f("\\sum x_i + nb")],
    theme: "formula",
  },

  // ── Central tendency: median + empirical relations ───────────────
  {
    atomKey: "median:formula:1",
    stem: "Which is the formula for the median of grouped data (median class: lower boundary \\(L\\), c.f. before \\(F\\), frequency \\(f\\), width \\(h\\))?",
    correct: f("M = L + \\dfrac{\\tfrac{n}{2} - F}{f}\\,h"),
    distractors: [f("M = L + \\dfrac{\\tfrac{n}{2} - f}{F}\\,h"), f("M = L + \\dfrac{F - \\tfrac{n}{2}}{f}\\,h"), f("M = L + \\dfrac{\\tfrac{n}{2} - F}{f}")],
    theme: "formula",
  },
  {
    atomKey: "sum-of-deviations-empirical:formula:0",
    stem: "The algebraic sum of deviations of a dataset taken about its own mean is:",
    correct: f("\\sum_{i=1}^{n}(x_i - \\bar{x}) = 0"),
    distractors: [f("\\sum_{i=1}^{n}(x_i - \\bar{x}) = n\\bar{x}"), f("\\sum_{i=1}^{n}(x_i - \\bar{x}) = 1"), f("\\sum_{i=1}^{n}(x_i - \\bar{x}) = \\bar{x}")],
    theme: "property",
  },
  {
    atomKey: "sum-of-deviations-empirical:formula:1",
    stem: "Which is the empirical relation between the mean, median and mode of a moderately skewed distribution?",
    correct: f("\\text{Mode} \\approx 3\\,\\text{Median} - 2\\,\\text{Mean}"),
    distractors: [
      f("\\text{Mode} \\approx 3\\,\\text{Mean} - 2\\,\\text{Median}"),
      f("\\text{Mode} \\approx 2\\,\\text{Median} - 3\\,\\text{Mean}"),
      f("\\text{Mean} \\approx 3\\,\\text{Median} - 2\\,\\text{Mode}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "sum-of-deviations-empirical:formula:2",
    stem: "For a moderately skewed distribution, the approximate relation between mean deviation (MD) and standard deviation (SD) is:",
    correct: f("\\text{MD} \\approx \\tfrac{4}{5}\\,\\text{SD}"),
    distractors: [f("\\text{MD} \\approx \\tfrac{5}{4}\\,\\text{SD}"), f("\\text{MD} \\approx \\tfrac{2}{3}\\,\\text{SD}"), f("\\text{SD} \\approx \\tfrac{4}{5}\\,\\text{MD}")],
    theme: "formula",
  },

  // ── Frequency distributions: pie charts ──────────────────────────
  {
    atomKey: "pie-charts:formula:0",
    stem: "Which is the formula for the sector angle \\(\\theta_i\\) of category \\(i\\) (frequency \\(f_i\\), total \\(N\\)) in a pie chart?",
    distractors: [f("\\theta_i = \\dfrac{f_i}{N} \\times 180^\\circ"), f("\\theta_i = \\dfrac{N}{f_i} \\times 360^\\circ"), f("\\theta_i = \\dfrac{f_i}{N} \\times 100")],
    theme: "formula",
  },

  // ── Regression & correlation ─────────────────────────────────────
  {
    atomKey: "correlation-coefficient-properties:formula:0",
    stem: "Which is the formula for the Pearson correlation coefficient \\(r\\)?",
    distractors: [
      f("r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X + \\sigma_Y}"),
      f("r = \\dfrac{\\sigma_X\\,\\sigma_Y}{\\text{Cov}(X,Y)}"),
      f("r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X^2\\,\\sigma_Y^2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "correlation-coefficient-properties:formula:1",
    stem: "Under the change of scale \\(X \\to aX+b,\\ Y \\to cY+d\\), the correlation coefficient becomes:",
    correct: f("\\text{sign}(ac)\\,r_{XY}"),
    distractors: [f("ac\\,r_{XY}"), f("|ac|\\,r_{XY}"), f("r_{XY} + ac")],
    theme: "property",
  },
  {
    atomKey: "lines-of-regression:formula:0",
    stem: "Which is the equation of the regression line of \\(y\\) on \\(x\\)?",
    distractors: [f("y - \\bar{y} = b_{xy}(x - \\bar{x})"), f("x - \\bar{x} = b_{yx}(y - \\bar{y})"), f("y + \\bar{y} = b_{yx}(x + \\bar{x})")],
    theme: "formula",
  },
  {
    atomKey: "lines-of-regression:formula:1",
    stem: "Which is the equation of the regression line of \\(x\\) on \\(y\\)?",
    distractors: [f("x - \\bar{x} = b_{yx}(y - \\bar{y})"), f("y - \\bar{y} = b_{xy}(x - \\bar{x})"), f("x + \\bar{x} = b_{xy}(y + \\bar{y})")],
    theme: "formula",
  },
  {
    atomKey: "regression-coefficients-and-r:formula:0",
    stem: "Which identity links the two regression coefficients to the correlation coefficient?",
    distractors: [f("b_{yx} \\cdot b_{xy} = r"), f("b_{yx} + b_{xy} = r^2"), f("b_{yx} \\cdot b_{xy} = 2r")],
    theme: "formula",
  },
  {
    atomKey: "regression-coefficients-and-r:formula:1",
    stem: "Given the two regression coefficients, the correlation coefficient \\(r\\) is:",
    distractors: [f("r = \\pm\\sqrt{b_{yx} + b_{xy}}"), f("r = b_{yx}\\,b_{xy}"), f("r = \\pm\\dfrac{b_{yx}}{b_{xy}}")],
    theme: "formula",
  },

  // ── auto-atom fixes (2026-06-11) ─────────────────────────────────
  // Means
  {
    atomKey: "arithmetic-mean-raw:formula:0",
    stem: "For \\(n\\) observations \\(x_1, x_2, \\ldots, x_n\\), the arithmetic mean \\(\\bar{x}\\) is:",
    correct: f("\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^{n} x_i"),
    distractors: [
      f("\\bar{x} = \\sum_{i=1}^{n} x_i"),
      f("\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^{n} x_i^2"),
      f("\\bar{x} = n\\sum_{i=1}^{n} x_i"),
    ],
    theme: "formula",
  },
  {
    atomKey: "arithmetic-mean-grouped:formula:0",
    stem: "For a frequency distribution where value \\(x_i\\) occurs with frequency \\(f_i\\), the mean \\(\\bar{x}\\) is:",
    distractors: [
      f("\\bar{x} = \\dfrac{\\sum f_i x_i}{n}"),
      f("\\bar{x} = \\dfrac{\\sum f_i}{\\sum f_i x_i}"),
      f("\\bar{x} = \\dfrac{\\sum x_i}{\\sum f_i}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "combined-mean-weighted:formula:0",
    stem: "For two groups of sizes \\(n_1, n_2\\) with means \\(M_1, M_2\\), the combined mean is:",
    distractors: [
      f("M_{12} = \\dfrac{M_1 + M_2}{n_1 + n_2}"),
      f("M_{12} = \\dfrac{n_1 M_1 + n_2 M_2}{M_1 + M_2}"),
      f("M_{12} = \\dfrac{M_1 + M_2}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "geometric-mean:formula:0",
    stem: "For \\(n\\) positive observations \\(x_1, x_2, \\ldots, x_n\\), the geometric mean is:",
    correct: f("\\text{GM} = \\left(\\prod_{i=1}^{n} x_i\\right)^{1/n}"),
    distractors: [
      f("\\text{GM} = \\left(\\prod_{i=1}^{n} x_i\\right)^{n}"),
      f("\\text{GM} = \\dfrac{1}{n}\\prod_{i=1}^{n} x_i"),
      f("\\text{GM} = \\left(\\sum_{i=1}^{n} x_i\\right)^{1/n}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "harmonic-mean:formula:0",
    stem: "For \\(n\\) positive observations \\(x_1, x_2, \\ldots, x_n\\), the harmonic mean is:",
    correct: f("\\text{HM} = \\dfrac{n}{\\displaystyle\\sum_{i=1}^{n} \\dfrac{1}{x_i}}"),
    distractors: [
      f("\\text{HM} = \\dfrac{\\displaystyle\\sum_{i=1}^{n} \\dfrac{1}{x_i}}{n}"),
      f("\\text{HM} = \\dfrac{1}{n}\\sum_{i=1}^{n} x_i"),
      f("\\text{HM} = \\dfrac{n}{\\displaystyle\\sum_{i=1}^{n} x_i}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "mean-replacement-correction:formula:0",
    stem: "The mean of \\(n\\) observations is \\(M\\). A value \\(x\\) is replaced by \\(y\\). The new mean is:",
    distractors: [
      f("M_{\\text{new}} = M + \\dfrac{x - y}{n}"),
      f("M_{\\text{new}} = M + (y - x)"),
      f("M_{\\text{new}} = M + \\dfrac{y - x}{n - 1}"),
    ],
    theme: "formula",
  },

  // Median & Mode (grouped interpolation)
  {
    atomKey: "reading-frequency-tables:formula:0",
    stem: "For grouped data (median class: lower boundary \\(L\\), c.f. before \\(F\\), frequency \\(f\\), width \\(h\\), total \\(n\\)), the median is:",
    distractors: [
      f("M = L + \\dfrac{\\tfrac{n}{2} - F}{f}"),
      f("M = L + \\dfrac{F - \\tfrac{n}{2}}{f}\\,h"),
      f("M = L + \\dfrac{\\tfrac{n}{2} - f}{F}\\,h"),
    ],
    theme: "formula",
  },
  {
    atomKey: "mode:formula:0",
    stem: "For grouped data (modal class: lower boundary \\(L\\), modal frequency \\(f_1\\), pre/post frequencies \\(f_0, f_2\\), width \\(h\\)), the mode is:",
    distractors: [
      f("M_0 = L + \\dfrac{f_1 - f_0}{2f_1 + f_0 + f_2}\\,h"),
      f("M_0 = L + \\dfrac{f_1 - f_0}{f_1 - f_0 - f_2}\\,h"),
      f("M_0 = L + \\dfrac{f_0 - f_1}{2f_1 - f_0 - f_2}\\,h"),
    ],
    theme: "formula",
  },

  // Dispersion
  {
    atomKey: "variance:formula:0",
    stem: "The variance \\(\\sigma^2\\) of \\(n\\) observations with mean \\(\\bar{x}\\) is:",
    correct: f("\\sigma^2 = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2"),
    distractors: [
      f("\\sigma^2 = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})"),
      f("\\sigma^2 = \\dfrac{1}{n}\\sum_{i=1}^{n}|x_i - \\bar{x}|"),
      f("\\sigma^2 = \\sqrt{\\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "standard-deviation:formula:0",
    stem: "The standard deviation \\(\\sigma\\) of \\(n\\) observations with mean \\(\\bar{x}\\) is:",
    correct: f("\\sigma = \\sqrt{\\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2}"),
    distractors: [
      f("\\sigma = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2"),
      f("\\sigma = \\sqrt{\\dfrac{1}{n}\\sum_{i=1}^{n}|x_i - \\bar{x}|}"),
      f("\\sigma = \\dfrac{1}{n}\\sqrt{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "mean-deviation:formula:0",
    stem: "The mean deviation of \\(n\\) observations about a reference value \\(A\\) is:",
    correct: f("\\text{MD}(A) = \\dfrac{1}{n}\\sum_{i=1}^{n}|x_i - A|"),
    distractors: [
      f("\\text{MD}(A) = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - A)"),
      f("\\text{MD}(A) = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - A)^2"),
      f("\\text{MD}(A) = \\sum_{i=1}^{n}|x_i - A|"),
    ],
    theme: "formula",
  },
  {
    atomKey: "coefficient-of-variation:formula:0",
    stem: "The coefficient of variation (CV) of a dataset with mean \\(\\bar{x}\\) and standard deviation \\(\\sigma\\) is:",
    distractors: [
      f("\\text{CV} = \\dfrac{\\sigma}{\\bar{x}}"),
      f("\\text{CV} = \\dfrac{\\bar{x}}{\\sigma} \\times 100 \\%"),
      f("\\text{CV} = \\sigma \\times \\bar{x} \\times 100 \\%"),
    ],
    theme: "formula",
  },

  // Frequency-distribution basics
  {
    atomKey: "frequency-and-tabulation:formula:0",
    stem: "In a frequency distribution with frequencies \\(f_1, f_2, \\ldots, f_k\\), the total number of observations \\(N\\) is:",
    distractors: [
      f("N = \\sum_{i=1}^{k} f_i x_i"),
      f("N = \\sum_{i=1}^{k} x_i"),
      f("N = \\max_{i} f_i"),
    ],
    theme: "formula",
  },
  {
    atomKey: "histograms-polygons-ogives:formula:0",
    stem: "In a histogram with unequal class widths, the height of a bar (frequency density) is:",
    distractors: [
      f("\\text{Density} = \\dfrac{\\text{Class width}}{\\text{Frequency}}"),
      f("\\text{Density} = \\text{Frequency} \\times \\text{Class width}"),
      f("\\text{Density} = \\dfrac{\\text{Frequency}}{\\text{Class mark}}"),
    ],
    theme: "formula",
  },

  // Regression
  {
    atomKey: "angle-between-regression-lines:formula:0",
    stem: "The acute angle \\(\\theta\\) between two regression lines with slopes \\(m_1, m_2\\) satisfies:",
    distractors: [
      f("\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 - m_1\\,m_2}\\right|"),
      f("\\tan\\theta = \\left|\\dfrac{m_1 + m_2}{1 + m_1\\,m_2}\\right|"),
      f("\\tan\\theta = \\left|\\dfrac{1 + m_1\\,m_2}{m_1 - m_2}\\right|"),
    ],
    theme: "formula",
  },
  {
    atomKey: "identifying-regression-line:formula:0",
    stem: "Two regression slopes \\(b_{yx}, b_{xy}\\) form a valid (correctly-paired) set of regression lines only if:",
    correct: f("b_{yx}\\,b_{xy} \\le 1"),
    distractors: [
      f("b_{yx}\\,b_{xy} \\ge 1"),
      f("b_{yx}\\,b_{xy} = 1"),
      f("b_{yx}\\,b_{xy} \\le 0"),
    ],
    theme: "formula",
  },
];
