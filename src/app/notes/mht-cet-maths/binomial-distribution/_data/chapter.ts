import type { ChapterNote } from "@/app/notes/_types";

export const BINOMIAL_DISTRIBUTION_CHAPTER: ChapterNote = {
  chapterName: "Binomial Distribution",
  title: "Binomial Distribution — MHT-CET Maths",
  intro:
    "Binomial Distribution is a compact, high-yield MHT-CET Maths chapter (60 PYQs across 2021–2025) built on one model: n independent trials, each a success (probability p) or failure (q = 1 − p). " +
    "Almost every question reduces to spotting n, p and q, then reaching for the right tool. It teaches in four movements: " +
    "(1) The Binomial Setting & PMF — recognise the Bernoulli-trial setup, fix p and q, and read off a single probability with P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ; " +
    "(2) Computing Binomial Probabilities — 'at least', 'at most', ranges, and the workhorse 'at least one' = 1 − qⁿ, plus the even-count and expected-frequency variants; " +
    "(3) Mean, Variance & Standard Deviation — mean = np, variance = npq, SD = √(npq), and inverting them to recover n and p; " +
    "(4) Parameter Estimation & the Probability Ratio — pinning down n or p from a probability condition (P(X=a) = c·P(X=b)), the identity ⁿCₐ = ⁿC_b, and the successive-term ratio P(X=k)/P(X=k−1). " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "binomial-setting-pmf",
    "computing-binomial-probabilities",
    "binomial-mean-variance",
    "binomial-parameter-estimation",
  ],
};
