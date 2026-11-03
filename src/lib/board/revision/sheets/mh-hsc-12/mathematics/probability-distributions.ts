import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 7 Probability Distributions.
 * Definitions are the Balbharati text's own, trimmed; every formula re-checked
 * on the book's worked examples (the 0.1, k, 2k, 2k, k table; 3x^2 on (0, 1);
 * the number from 1 to 15); most-asked years from the board past-paper
 * questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Probability Distributions",
  chapterSlug: "probability-distributions",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Random variable",
      text: "A random variable is a real-valued function defined on the sample space of a random experiment: \\(X : S \\to \\mathbb{R}\\). Its domain is the sample space; its co-domain is the set of real numbers. Written r.v.",
    },
    {
      term: "Discrete random variable",
      text: "A random variable is discrete if the number of its possible values is finite or countably infinite (number of heads, number of defects).",
    },
    {
      term: "Continuous random variable",
      text: "A random variable is continuous if its possible values form an interval of real numbers (height, weight, waiting time). Its value is obtained by measurement.",
    },
    {
      term: "Probability mass function (p.m.f.)",
      text: "For a discrete r.v. with values \\(x_1, x_2, \\ldots\\) and \\(p_i = P[X = x_i]\\), the function \\(p\\) is the p.m.f. if (i) \\(p_i \\geq 0\\) for every \\(i\\) and (ii) \\(\\sum p_i = 1\\).",
    },
    {
      term: "c.d.f. of a discrete r.v.",
      text: "The cumulative distribution function is \\(F(x) = P[X \\leq x]\\), the sum of \\(p_i\\) over all \\(x_i \\leq x\\). For a discrete r.v. it is a non-decreasing **step function**.",
    },
    {
      term: "Expected value (mean)",
      text: "The mean or expectation of a random variable \\(X\\) is the sum of the products of all possible values of \\(X\\) by their respective probabilities: \\(E(X) = \\mu = \\sum x_i p_i\\).",
    },
    {
      term: "Variance and standard deviation",
      text: "\\(\\operatorname{Var}(X) = \\sum (x_i - \\mu)^2 p_i\\), a non-negative number. Its positive square root \\(\\sqrt{\\operatorname{Var}(X)}\\) is called the standard deviation of \\(X\\).",
    },
    {
      term: "Probability density function (p.d.f.)",
      text: "For a continuous r.v. on \\(S = (a, b)\\), a non-negative integrable \\(f(x)\\) is the p.d.f. if (1) \\(f(x) \\geq 0\\) on \\(S\\), (2) the area under \\(y = f(x)\\) over \\(S\\) is 1, (3) \\(P[X \\in A] = \\int_A f(x)\\,dx\\).",
    },
    {
      term: "f(x) is not a probability",
      text: "In the continuous case \\(f(x)\\) is the height of the curve at \\(X = x\\); it is areas under the curve that give probabilities. So \\(f(x)\\) can exceed 1 (for \\(f(x) = 3x^2\\), \\(f(0.9) = 2.43\\)).",
    },
    {
      term: "Probabilities of intervals",
      text: "A continuous r.v. is described by probabilities of the form \\(P[c < X < d]\\), not by \\(P[X = x]\\). A single point has probability 0, so \\(<\\) and \\(\\leq\\) give the same answer.",
    },
    {
      term: "c.d.f. of a continuous r.v.",
      text: "Replace the summation with an integral: \\(F(x) = \\int_a^x f(t)\\,dt\\) for \\(a < x < b\\). It is a non-decreasing **continuous** function, 0 to the left of the support and 1 to the right.",
    },
  ],
  formulas: [
    { label: "Conditions for a p.m.f.", latex: "p_i = P[X = x_i] \\geq 0, \\qquad \\sum_{i} p_i = 1" },
    { label: "c.d.f. of a discrete r.v.", latex: "F(x) = P[X \\leq x] = \\sum_{x_i \\leq x} p_i" },
    { label: "Expected value", latex: "E(X) = \\mu = \\sum_{i=1}^{n} x_i p_i = x_1p_1 + x_2p_2 + \\cdots + x_np_n" },
    {
      label: "Variance",
      latex: "\\operatorname{Var}(X) = \\sigma^2 = \\sum_{i=1}^{n} (x_i - \\mu)^2 p_i = \\sum_{i=1}^{n} x_i^2 p_i - \\mu^2",
    },
    {
      label: "Variance, short form",
      latex: "\\operatorname{Var}(X) = E(X^2) - [E(X)]^2, \\qquad E(X^2) = \\sum_{i=1}^{n} x_i^2 p_i",
    },
    { label: "Standard deviation", latex: "\\sigma = \\sqrt{\\operatorname{Var}(X)}" },
    { label: "Conditions for a p.d.f.", latex: "f(x) \\geq 0 \\text{ on } (a, b), \\qquad \\int_a^b f(x)\\,dx = 1" },
    { label: "Probability of an interval", latex: "P[c < X < d] = \\int_c^d f(x)\\,dx, \\qquad P[X = c] = 0" },
    {
      label: "c.d.f. of a continuous r.v.",
      latex:
        "F(x) = \\begin{cases} 0, & x \\leq a \\\\ \\int_a^x f(t)\\,dt, & a < x < b \\\\ 1, & x \\geq b \\end{cases}",
    },
    { label: "Probability from the c.d.f.", latex: "P[c < X < d] = F(d) - F(c), \\qquad P[X > c] = 1 - F(c)" },
    {
      label: "Number chosen at random from 1 to n",
      latex: "E(X) = \\frac{n + 1}{2}, \\qquad \\operatorname{Var}(X) = \\frac{n^2 - 1}{12}",
    },
  ],
  derivations: [
    {
      title: "Write the probability distribution of a random variable (number of heads, doublets, kings)",
      steps: [
        "Write the sample space and the possible values of \\(X\\).",
        "For each value \\(x\\), list the outcomes in the event \\([X = x]\\) and find \\(P[X = x]\\).",
        "Tabulate \\(x\\) against \\(P[X = x]\\) and check the probabilities add to 1. Two coins: \\(X = 0, 1, 2\\) with \\(\\frac14, \\frac12, \\frac14\\).",
      ],
    },
    {
      title: "Find \\(k\\) from a p.m.f. table, then \\(P(X < 2)\\), \\(P(1 \\leq X < 4)\\) and \\(F(2)\\)",
      steps: [
        "Since the table is a probability distribution, \\(\\sum p_i = 1\\). For \\(0.1, k, 2k, 2k, k\\): \\(0.1 + 6k = 1\\), so \\(k = 0.15\\).",
        "Read the values each event includes: \\(P(X < 2) = P(0) + P(1) = 0.25\\); \\(P(1 \\leq X < 4) = P(1) + P(2) + P(3) = 5k = 0.75\\).",
        "\\(F(2) = P(X \\leq 2) = 0.1 + k + 2k = 0.55\\). Reject any \\(k\\) that makes a \\(p_i\\) negative.",
      ],
    },
    {
      title: "Find \\(E(X)\\), \\(\\operatorname{Var}(X)\\) and the standard deviation from a p.m.f.",
      steps: [
        "Make columns \\(x_i\\), \\(p_i\\), \\(x_ip_i\\), \\(x_i^2p_i\\).",
        "\\(E(X) = \\sum x_ip_i\\) and \\(E(X^2) = \\sum x_i^2p_i\\).",
        "\\(\\operatorname{Var}(X) = E(X^2) - [E(X)]^2\\); standard deviation \\(= \\sqrt{\\operatorname{Var}(X)}\\).",
        "Fair die: \\(E(X) = \\frac{21}{6} = \\frac72\\), \\(E(X^2) = \\frac{91}{6}\\), \\(\\operatorname{Var}(X) = \\frac{91}{6} - \\frac{49}{4} = \\frac{35}{12}\\).",
      ],
    },
    {
      title: "Find the mean and variance of the number randomly selected from 1 to 15",
      steps: [
        "Each of \\(1, 2, \\ldots, 15\\) has probability \\(\\frac{1}{15}\\).",
        "\\(E(X) = \\frac{1}{15}(1 + 2 + \\cdots + 15) = \\frac{120}{15} = 8\\).",
        "\\(E(X^2) = \\frac{1}{15} \\cdot \\frac{15 \\cdot 16 \\cdot 31}{6} = \\frac{248}{3}\\), so \\(\\operatorname{Var}(X) = \\frac{248}{3} - 64 = \\frac{56}{3}\\).",
      ],
    },
    {
      title: "Find \\(k\\) if the given function is the p.d.f. of \\(X\\)",
      steps: [
        "Use \\(\\int_a^b f(x)\\,dx = 1\\) over the support only.",
        "\\(f(x) = kx\\) on \\((0, 2)\\): \\(k \\cdot \\frac{x^2}{2}\\Big|_0^2 = 2k = 1\\), so \\(k = \\frac12\\).",
        "\\(f(x) = kx^2(1 - x)\\) on \\((0, 1)\\): \\(k\\left(\\frac13 - \\frac14\\right) = \\frac{k}{12} = 1\\), so \\(k = 12\\).",
      ],
    },
    {
      title: "Find \\(P(X < 1)\\) and \\(P(|X| < 1)\\) from a p.d.f.",
      steps: [
        "Write the event as an interval: \\(|X| < 1\\) means \\(-1 < X < 1\\).",
        "Integrate \\(f(x)\\) over the part of that interval inside the support; outside it \\(f = 0\\).",
        "\\(f(x) = \\frac{x + 2}{18}\\) on \\((-2, 4)\\): \\(P(X < 1) = \\int_{-2}^{1} f = \\frac{1}{4}\\), \\(P(|X| < 1) = \\int_{-1}^{1} f = \\frac{2}{9}\\).",
      ],
    },
    {
      title: "Determine the c.d.f. of \\(X\\) and hence find probabilities",
      steps: [
        "For \\(a < x < b\\): \\(F(x) = \\int_a^x f(t)\\,dt\\). State \\(F(x) = 0\\) for \\(x \\leq a\\) and \\(F(x) = 1\\) for \\(x \\geq b\\).",
        "\\(f(x) = \\frac{x^2}{3}\\) on \\((-1, 2)\\): \\(F(x) = \\frac{x^3 + 1}{9}\\).",
        "Hence \\(P(X < 1) = F(1) = \\frac29\\), \\(P(X > 0) = 1 - F(0) = \\frac89\\), \\(P(1 < X < 2) = F(2) - F(1) = \\frac79\\), \\(P(X < -2) = 0\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Find the expected value, variance or standard deviation of a discrete r.v. from its p.m.f.",
      years: [2026, 2024, 2023, 2022, 2020, 2019, 2018, 2015],
    },
    {
      topic: "Find probabilities such as \\(P(X < 1)\\), \\(P(|X| < 1)\\) or a waiting time from a p.d.f.",
      years: [2026, 2025, 2023, 2019],
    },
    {
      topic: "Find \\(k\\) in a p.m.f. table, then probabilities such as \\(P(X < 2)\\) or \\(F(2)\\)",
      years: [2026, 2025, 2024, 2016],
    },
    {
      topic: "Find the c.d.f. of a continuous r.v. and hence probabilities or \\(F(x)\\) at given points",
      years: [2026, 2017, 2016, 2015],
    },
    { topic: "Find \\(k\\) if the given function is a p.d.f., then a probability", years: [2024, 2020] },
    { topic: "Write the probability distribution of the number of heads", years: [2024] },
  ],
  mistakes: [
    {
      title: "Treating \\(<\\) and \\(\\leq\\) alike for a discrete r.v.",
      body: "For a discrete r.v., \\(P(X < 2)\\) leaves out \\(X = 2\\) but \\(F(2) = P(X \\leq 2)\\) keeps it. Only for a continuous r.v. do they agree, since \\(P[X = c] = 0\\).",
    },
    {
      title: "Giving \\(F(x)\\) only inside the support",
      body: "Write all three pieces: \\(F(x) = 0\\) before the support, the integral inside, \\(F(x) = 1\\) after it. For \\(f(x) = \\frac{x}{8}\\) on \\((0, 4)\\), \\(F(5) = 1\\), not \\(\\frac{25}{16}\\).",
    },
    {
      title: "Integrating outside the support",
      body: "\\(f(x) = 0\\) outside \\((a, b)\\). For \\(P(X < 1)\\) with support \\((-2, 4)\\), integrate the formula from \\(-2\\) to 1, not from 0: below \\(-2\\) the density is 0.",
    },
    {
      title: "Writing \\(E(X^2) - E(X)\\) for the variance",
      body: "\\(\\operatorname{Var}(X) = E(X^2) - [E(X)]^2\\): square the mean. A negative variance means an arithmetic slip; the standard deviation is its square root.",
    },
    {
      title: "Reading \\(f(x)\\) as a probability",
      body: "For a continuous r.v., \\(f(x)\\) is a height, not \\(P[X = x]\\). Probabilities come only from areas, \\(\\int f(x)\\,dx\\).",
    },
  ],
};

export default sheet;
