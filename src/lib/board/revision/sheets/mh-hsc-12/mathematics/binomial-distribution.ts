import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 8 Binomial Distribution. Definitions
 * are the Balbharati text's own, trimmed; every formula re-checked on the
 * book's worked examples (coin tossed 10 times; B(4, 5/9); E(X) = 6 and
 * Var(X) = 4.2 giving n = 20, p = 0.3); most-asked years from the board
 * past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Binomial Distribution",
  chapterSlug: "binomial-distribution",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Trial",
      text: "Each time we toss a coin or roll a die or perform any other experiment, we call it a trial. Each outcome is called a success or a failure.",
    },
    {
      term: "Bernoulli trials",
      text: "Trials of a random experiment are Bernoulli trials if (i) each trial has exactly two outcomes, success or failure, and (ii) the probability of success remains the same in each trial.",
    },
    {
      term: "Two more conditions",
      text: "The number of trials should be fixed, and the trials should be independent: the outcome of one trial does not affect any other.",
    },
    {
      term: "With or without replacement",
      text: "Drawing with replacement keeps \\(p\\) the same in every draw: Bernoulli trials. Without replacement the probability of success is not same for all trials, hence the trials are not Bernoulli trials.",
    },
    {
      term: "Success is what the question counts",
      text: "Call the event being counted a success: an even number on a die gives \\(p = \\frac12\\), a multiple of 3 gives \\(p = \\frac13\\), a doublet with two dice \\(p = \\frac16\\). Then \\(q = 1 - p\\).",
    },
    {
      term: "Probability of x successes",
      text: "In \\(n\\) Bernoulli trials, \\(x\\) successes and \\(n - x\\) failures can occur in \\({}^nC_x\\) ways, each with probability \\(p^x q^{n-x}\\). So \\(P(x \\text{ successes}) = {}^nC_x\\, p^x q^{n-x}\\).",
    },
    {
      term: "Link with the binomial expansion",
      text: "\\(P(x)\\) is the \\((x + 1)\\)th term in the binomial expansion of \\((q + p)^n\\). Since \\(q + p = 1\\), all the probabilities add to 1.",
    },
    {
      term: "Binomial distribution",
      text: "The distribution of the number of successes \\(X\\) is the binomial distribution with parameters \\(n\\) and \\(p\\), written \\(X \\sim B(n, p)\\). \\(P(x)\\) is called the probability function of the binomial distribution.",
    },
    {
      term: "Mean and variance",
      text: "For \\(X \\sim B(n, p)\\): \\(E(X) = \\mu = np\\) and \\(\\operatorname{Var}(X) = npq\\) (formulae without proof). The standard deviation is \\(\\sqrt{npq}\\).",
    },
  ],
  formulas: [
    {
      label: "Binomial p.m.f.",
      latex: "P(X = x) = {}^nC_x\\, p^x q^{n-x}, \\quad x = 0, 1, 2, \\ldots, n, \\quad q = 1 - p",
      symbols: [
        { symbol: "\\(n\\)", meaning: "number of trials" },
        { symbol: "\\(p\\), \\(q\\)", meaning: "probability of success, of failure in one trial" },
      ],
    },
    { label: "Sum of all probabilities", latex: "\\sum_{x=0}^{n} {}^nC_x\\, p^x q^{n-x} = (q + p)^n = 1" },
    { label: "None and all", latex: "P(X = 0) = q^n, \\qquad P(X = n) = p^n" },
    { label: "At least one success", latex: "P(X \\geq 1) = 1 - P(X = 0) = 1 - q^n" },
    {
      label: "At least and at most",
      latex: "P(X \\geq r) = \\sum_{x=r}^{n} P(x), \\qquad P(X \\leq r) = 1 - P(X \\geq r + 1)",
    },
    { label: "Mean", latex: "E(X) = \\mu = np" },
    { label: "Variance", latex: "\\operatorname{Var}(X) = npq" },
    { label: "Standard deviation", latex: "\\operatorname{SD}(X) = \\sigma = \\sqrt{npq}" },
    {
      label: "n and p from the mean and variance",
      latex: "q = \\frac{\\operatorname{Var}(X)}{E(X)} = \\frac{npq}{np}, \\qquad p = 1 - q, \\qquad n = \\frac{E(X)}{p}",
    },
  ],
  derivations: [
    {
      title: "Find the probability of exactly \\(r\\) successes (coins, dice, cards with replacement, guessing)",
      steps: [
        "Say what a success is and why the trials are Bernoulli trials; write \\(n\\), \\(p\\), \\(q\\) and \\(X \\sim B(n, p)\\).",
        "Write \\(P(X = x) = {}^nC_x\\, p^x q^{n-x}\\) and put \\(x = r\\).",
        "Coin tossed 10 times, exactly six heads: \\({}^{10}C_6 \\left(\\frac12\\right)^{10} = \\frac{210}{1024} = \\frac{105}{512}\\).",
        "Guessing, 5 questions with 3 choices, four correct: \\({}^5C_4 \\left(\\frac13\\right)^4 \\frac23 = \\frac{10}{243}\\).",
      ],
    },
    {
      title: "Find the probability of at least six heads and at most six heads when a coin is tossed 10 times",
      steps: [
        "\\(X \\sim B\\left(10, \\frac12\\right)\\), so \\(P(x) = \\frac{{}^{10}C_x}{1024}\\).",
        "At least six: \\(P(X \\geq 6) = \\frac{210 + 120 + 45 + 10 + 1}{1024} = \\frac{193}{512}\\).",
        "At most six by the complement: \\(P(X \\leq 6) = 1 - \\frac{120 + 45 + 10 + 1}{1024} = \\frac{53}{64}\\).",
      ],
    },
    {
      title: "Find the probability of at least one success",
      steps: [
        "At least one is the complement of none: \\(P(X \\geq 1) = 1 - P(X = 0) = 1 - q^n\\).",
        "Ten eggs with replacement from a lot with 10% defective: \\(p = 0.1\\), \\(q = 0.9\\).",
        "\\(P(\\text{at least one defective}) = 1 - (0.9)^{10}\\).",
      ],
    },
    {
      title: "Find \\(E(X)\\) and \\(\\operatorname{Var}(X)\\) from a binomial p.m.f. or from \\(n\\) and \\(p\\)",
      steps: [
        "Match the p.m.f. with \\({}^nC_x\\, p^x q^{n-x}\\) to read \\(n\\) and \\(p\\).",
        "\\(P(X = x) = {}^4C_x \\left(\\frac59\\right)^x \\left(\\frac49\\right)^{4-x}\\): \\(n = 4\\), \\(p = \\frac59\\), \\(q = \\frac49\\).",
        "\\(E(X) = np = \\frac{20}{9}\\) and \\(\\operatorname{Var}(X) = npq = \\frac{80}{81}\\). For \\(B(10, 0.4)\\): 4 and 2.4.",
      ],
    },
    {
      title: "If \\(E(X) = 6\\) and \\(\\operatorname{Var}(X) = 4.2\\), find \\(n\\) and \\(p\\)",
      steps: [
        "\\(np = 6\\) and \\(npq = 4.2\\).",
        "Divide: \\(q = \\frac{4.2}{6} = 0.7\\), so \\(p = 0.3\\).",
        "\\(n = \\frac{6}{0.3} = 20\\). Mean 18 and variance 12 give \\(q = \\frac23\\), \\(p = \\frac13\\), \\(n = 54\\) the same way.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Find the probability of exactly \\(r\\) successes (dice, coins, cards with replacement, guessing, bombs, patients)",
      years: [2026, 2025, 2024, 2017, 2016, 2015],
    },
    {
      topic: "Given the mean and variance (or the mean and \\(n\\)), find \\(n\\), \\(p\\) or \\(\\operatorname{Var}(X)\\)",
      years: [2026, 2025, 2024, 2020, 2019],
    },
    {
      topic: "Find the probability of at least or at most \\(r\\) successes, or of at least one",
      years: [2024, 2023, 2022, 2020, 2017],
    },
    {
      topic: "Find \\(E(X)\\) and \\(\\operatorname{Var}(X)\\) from a binomial p.m.f. or from \\(n\\) and \\(p\\)",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Swapping the powers of \\(p\\) and \\(q\\)",
      body: "In \\({}^nC_x\\, p^x q^{n-x}\\) the power of \\(p\\) is the number of **successes**. If the question counts misses (bombs that miss), make a miss the success or use \\(n - x\\).",
    },
    {
      title: "Taking the wrong \\(p\\)",
      body: "Find \\(p\\) for one trial first: a doublet with a pair of dice \\(\\frac16\\), an odd number on a die \\(\\frac12\\), a spade \\(\\frac14\\), a guess among three answers \\(\\frac13\\).",
    },
    {
      title: "Adding many terms for at least one or at most",
      body: "Use the complement: \\(P(X \\geq 1) = 1 - q^n\\) and \\(P(X \\leq 6) = 1 - P(X \\geq 7)\\). Write \"at least\" as \\(\\geq\\) and \"at most\" as \\(\\leq\\); both include \\(r\\) itself.",
    },
    {
      title: "Writing \\(\\operatorname{Var}(X) = np\\) or \\(np^2\\)",
      body: "\\(\\operatorname{Var}(X) = npq\\). Since \\(q < 1\\), the variance is always less than the mean: a given variance bigger than the mean signals a misread.",
    },
    {
      title: "Using the binomial without replacement",
      body: "Drawing without replacement changes \\(p\\) from draw to draw, so the trials are not Bernoulli trials. Say \"with replacement, so the trials are independent\" before writing \\(B(n, p)\\).",
    },
  ],
};

export default sheet;
