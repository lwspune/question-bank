import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 13 Probability. Definitions,
 * properties, the theorem of total probability and Bayes' theorem in NCERT's
 * own wording, trimmed; every worked answer re-computed by hand. Random
 * variables, distributions and the mean are asked every year (2022-2025) but
 * the 2025-26 reprint keeps only the definition of a random variable: the
 * table rules and mean below are the standard results. Most-asked
 * years and marks from the 179 CBSE board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Probability",
  chapterSlug: "probability",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 13",
  keyPoints: [
    {
      term: "Conditional probability",
      text: "If E and F are two events associated with the same sample space, the conditional probability of E given that F has occurred is \\(P(E|F) = \\frac{P(E \\cap F)}{P(F)}\\), \\(P(F) \\neq 0\\). Given F, the sample space shrinks to F.",
    },
    {
      term: "Properties of conditional probability",
      text: "\\(P(S|F) = P(F|F) = 1\\); \\(P((A \\cup B)|F) = P(A|F) + P(B|F) - P((A \\cap B)|F)\\); \\(P(E'|F) = 1 - P(E|F)\\); and \\(0 \\le P(E|F) \\le 1\\).",
    },
    {
      term: "Multiplication theorem",
      text: "\\(P(E \\cap F) = P(E)\\,P(F|E) = P(F)\\,P(E|F)\\). For three events, \\(P(E \\cap F \\cap G) = P(E)\\,P(F|E)\\,P(G|E \\cap F)\\): use it for draws without replacement.",
    },
    {
      term: "Independent events",
      text: "Two events E and F are said to be independent if \\(P(E \\cap F) = P(E)\\,P(F)\\); equivalently \\(P(F|E) = P(F)\\) and \\(P(E|F) = P(E)\\). Two events are dependent if they are not independent.",
    },
    {
      term: "Independent is not mutually exclusive",
      text: "Independent is defined in terms of probability of events, mutually exclusive in terms of events. Two independent events having nonzero probabilities can not be mutually exclusive, and conversely.",
    },
    {
      term: "Complements of independent events",
      text: "If E and F are independent, then so are E and F', E' and F, and E' and F'. So the probability of at least one of independent A and B is \\(1 - P(A')\\,P(B')\\).",
    },
    {
      term: "Three independent events",
      text: "A, B and C are mutually independent if \\(P(A \\cap B) = P(A)P(B)\\), \\(P(A \\cap C) = P(A)P(C)\\), \\(P(B \\cap C) = P(B)P(C)\\) and \\(P(A \\cap B \\cap C) = P(A)P(B)P(C)\\).",
    },
    {
      term: "Partition of a sample space",
      text: "Events \\(E_1, E_2, \\ldots, E_n\\) represent a partition of S if they are pairwise disjoint, exhaustive (\\(E_1 \\cup E_2 \\cup \\ldots \\cup E_n = S\\)) and have nonzero probabilities. Any nonempty E and its complement E' form a partition.",
    },
    {
      term: "Theorem of total probability",
      text: "Let \\(\\{E_1, \\ldots, E_n\\}\\) be a partition of S, each with nonzero probability, and A any event. Then \\(P(A) = P(E_1)P(A|E_1) + P(E_2)P(A|E_2) + \\ldots + P(E_n)P(A|E_n)\\).",
    },
    {
      term: "Bayes' theorem",
      text: "Finds \\(P(E_i|A)\\), the probability of a cause given the result. The events \\(E_i\\) are called hypotheses; \\(P(E_i)\\) is the priori probability and \\(P(E_i|A)\\) the posteriori probability. It is also called the formula for the probability of causes.",
    },
    {
      term: "Random variable",
      text: "A random variable is a real valued function whose domain is the sample space of a random experiment. Example: number of heads minus number of tails in two tosses takes the values 2, 0, \\(-2\\).",
    },
    {
      term: "Probability distribution",
      text: "A table of the values \\(x_i\\) of X with their probabilities \\(p_i\\), where every \\(p_i \\ge 0\\) and \\(\\sum p_i = 1\\). Use these two facts to find an unknown k.",
    },
    {
      term: "Mean (expectation)",
      text: "The mean of a random variable is \\(E(X) = \\sum x_i p_i\\), the weighted average of its values. It need not be one of the values X takes.",
    },
  ],
  formulas: [
    { label: "Conditional probability", latex: "P(E|F) = \\frac{P(E \\cap F)}{P(F)}, \\quad P(F) \\neq 0 \\qquad P(E'|F) = 1 - P(E|F)" },
    { label: "Multiplication rule", latex: "P(E \\cap F) = P(E)\\,P(F|E) = P(F)\\,P(E|F) \\qquad P(E \\cap F \\cap G) = P(E)\\,P(F|E)\\,P(G|E \\cap F)" },
    { label: "Addition rule", latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)" },
    { label: "Complements (De Morgan)", latex: "P(A' \\cap B') = 1 - P(A \\cup B) \\qquad P(A' \\cup B') = 1 - P(A \\cap B) \\qquad P(A'|B') = \\frac{1 - P(A \\cup B)}{1 - P(B)}" },
    { label: "Exactly one of A, B", latex: "P(A) + P(B) - 2P(A \\cap B) \\qquad P(A \\cap B') = P(A) - P(A \\cap B)" },
    { label: "Independent events", latex: "P(A \\cap B) = P(A)\\,P(B) \\qquad P(A|B) = P(A) \\qquad P(\\text{at least one}) = 1 - P(A')\\,P(B')\\,P(C')" },
    { label: "Theorem of total probability", latex: "P(A) = \\sum_{j=1}^{n} P(E_j)\\,P(A|E_j)" },
    { label: "Bayes' theorem", latex: "P(E_i|A) = \\frac{P(E_i)\\,P(A|E_i)}{\\sum_{j=1}^{n} P(E_j)\\,P(A|E_j)}" },
    { label: "Probability distribution", latex: "p_i \\ge 0, \\qquad \\sum_{i} p_i = 1" },
    { label: "Mean of a random variable", latex: "E(X) = \\mu = \\sum_{i} x_i\\,p_i" },
  ],
  derivations: [
    {
      title: "Prove that if E and F are independent, then so are E and F'",
      steps: [
        "E is the union of the disjoint events \\(E \\cap F\\) and \\(E \\cap F'\\), so \\(P(E \\cap F') = P(E) - P(E \\cap F)\\).",
        "\\(= P(E) - P(E)P(F) = P(E)[1 - P(F)]\\).",
        "\\(= P(E)\\,P(F')\\), so E and F' are independent.",
      ],
    },
    {
      title: "A man speaks the truth 7 out of 10 times. He throws a pair of dice and reports a doublet. Find the probability that it was actually a doublet",
      steps: [
        "\\(E_1\\): doublet, \\(P(E_1) = \\frac{6}{36} = \\frac{1}{6}\\); \\(E_2\\): not a doublet, \\(P(E_2) = \\frac{5}{6}\\). A: he reports a doublet.",
        "\\(P(A|E_1) = \\frac{7}{10}\\) (truth), \\(P(A|E_2) = \\frac{3}{10}\\) (lie).",
        "\\(P(E_1|A) = \\frac{\\frac{1}{6}\\cdot\\frac{7}{10}}{\\frac{1}{6}\\cdot\\frac{7}{10} + \\frac{5}{6}\\cdot\\frac{3}{10}} = \\frac{7}{7 + 15} = \\frac{7}{22}\\).",
      ],
    },
    {
      title: "A student knows the answer with probability \\(\\frac{3}{5}\\), else guesses (right with \\(\\frac{1}{3}\\)). Find P(knew it | answered correctly)",
      steps: [
        "\\(E_1\\): knows, \\(E_2\\): guesses; A: answers correctly. \\(P(A|E_1) = 1\\), \\(P(A|E_2) = \\frac{1}{3}\\).",
        "\\(P(A) = \\frac{3}{5}\\cdot 1 + \\frac{2}{5}\\cdot\\frac{1}{3} = \\frac{9}{15} + \\frac{2}{15} = \\frac{11}{15}\\).",
        "\\(P(E_1|A) = \\frac{9/15}{11/15} = \\frac{9}{11}\\).",
      ],
    },
    {
      title: "Bag I: 3 red, 4 white; Bag II: 8 red, 6 white. If a die shows less than 3, draw from Bag I, otherwise from Bag II. Find P(red)",
      steps: [
        "\\(P(E_1) = P(\\text{1 or 2}) = \\frac{1}{3}\\) (Bag I), \\(P(E_2) = \\frac{2}{3}\\) (Bag II).",
        "\\(P(R|E_1) = \\frac{3}{7}\\), \\(P(R|E_2) = \\frac{8}{14} = \\frac{4}{7}\\).",
        "By total probability, \\(P(R) = \\frac{1}{3}\\cdot\\frac{3}{7} + \\frac{2}{3}\\cdot\\frac{4}{7} = \\frac{3 + 8}{21} = \\frac{11}{21}\\).",
      ],
    },
    {
      title: "Bag I: 4 white, 5 black; Bag II: 6 white, 7 black. One ball moves from Bag I to Bag II, then one is drawn from Bag II. Find P(white)",
      steps: [
        "\\(E_1\\): white moved, \\(P = \\frac{4}{9}\\); Bag II then has 7 white of 14. \\(E_2\\): black moved, \\(P = \\frac{5}{9}\\); Bag II has 6 white of 14.",
        "\\(P(W) = \\frac{4}{9}\\cdot\\frac{7}{14} + \\frac{5}{9}\\cdot\\frac{6}{14} = \\frac{28 + 30}{126}\\).",
        "\\(P(W) = \\frac{58}{126} = \\frac{29}{63}\\).",
      ],
    },
    {
      title: "If P(at least one of X, Y) = a and P(exactly one) = b, prove that \\(P(X') + P(Y') = 2 - 2a + b\\)",
      steps: [
        "At least one = exactly one or both, so \\(P(X \\cap Y) = a - b\\).",
        "\\(P(X) + P(Y) = P(X \\cup Y) + P(X \\cap Y) = a + (a - b) = 2a - b\\).",
        "\\(P(X') + P(Y') = 2 - [P(X) + P(Y)] = 2 - 2a + b\\).",
      ],
    },
    {
      title: "A and B throw a die alternately till one gets a 6; A starts. Find their chances of winning",
      steps: [
        "A wins on throw 1, 3, 5, ...: \\(P(A) = \\frac{1}{6} + \\left(\\frac{5}{6}\\right)^2\\frac{1}{6} + \\left(\\frac{5}{6}\\right)^4\\frac{1}{6} + \\ldots\\)",
        "This is a G.P. with ratio \\(\\frac{25}{36}\\): \\(P(A) = \\frac{1/6}{1 - 25/36} = \\frac{6}{11}\\).",
        "\\(P(B) = 1 - \\frac{6}{11} = \\frac{5}{11}\\).",
      ],
    },
    {
      title: "A coin is tossed twice; X = number of heads minus number of tails. Find the distribution of X and its mean",
      steps: [
        "HH gives 2, HT and TH give 0, TT gives \\(-2\\).",
        "\\(P(X = 2) = \\frac{1}{4}\\), \\(P(X = 0) = \\frac{1}{2}\\), \\(P(X = -2) = \\frac{1}{4}\\); the sum is 1.",
        "\\(E(X) = 2\\cdot\\frac{1}{4} + 0\\cdot\\frac{1}{2} + (-2)\\cdot\\frac{1}{4} = 0\\).",
      ],
    },
    {
      title: "Two fair dice are thrown; X = number of sixes. Find the distribution and the mean of X",
      steps: [
        "\\(P(X = 0) = \\frac{5}{6}\\cdot\\frac{5}{6} = \\frac{25}{36}\\), \\(P(X = 1) = 2\\cdot\\frac{1}{6}\\cdot\\frac{5}{6} = \\frac{10}{36}\\), \\(P(X = 2) = \\frac{1}{36}\\).",
        "Check: \\(\\frac{25 + 10 + 1}{36} = 1\\).",
        "\\(E(X) = 0 + \\frac{10}{36} + \\frac{2}{36} = \\frac{12}{36} = \\frac{1}{3}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Conditional probability: \\(P(E|F)\\) from given probabilities or from dice, coins and line-ups; \\(P(A'|B')\\)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Independent events: test for independence, at least one or exactly one of independent events, \\(P(E|F) - P(F|E)\\)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Bayes' theorem: probability of the cause given the result (case studies, bags, machines, truth tellers)", marks: 2, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Theorem of total probability, and the given probabilities in a two-stage case study", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Probability distribution of a random variable: make the table, find k from \\(\\sum p_i = 1\\), read probabilities", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Mean (expectation) of a random variable", marks: 3, years: [2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Writing \\(P(A'|B') = 1 - P(A|B)\\)",
      body: "That is false. \\(P(A'|B') = \\frac{P(A' \\cap B')}{P(B')} = \\frac{1 - P(A \\cup B)}{1 - P(B)}\\). The true rule is \\(P(A'|B) = 1 - P(A|B)\\): the complement is taken on the left of the bar only.",
    },
    {
      title: "Mixing up independent and mutually exclusive",
      body: "\\(P(A \\cap B) = 0\\) means mutually exclusive, not independent. Independent needs \\(P(A \\cap B) = P(A)P(B)\\). Two events with nonzero probabilities can not be both.",
    },
    {
      title: "Not shrinking the sample space",
      body: "Given the sum on two dice is 9, the outcomes are (3, 6), (4, 5), (5, 4), (6, 3); a 4 shows on one die in 2 of them, so the probability is \\(\\frac{1}{2}\\), not \\(\\frac{2}{36}\\).",
    },
    {
      title: "Treating draws without replacement as independent",
      body: "Without replacement the second draw depends on the first: use \\(P(E)P(F|E)\\). With replacement the draws are independent, and the same probability repeats.",
    },
    {
      title: "Bayes with a wrong denominator",
      body: "The denominator is P(A) by total probability over ALL the hypotheses, and the priors \\(P(E_i)\\) must add to 1. Name every event (\\(E_1, E_2, A\\)) before writing numbers.",
    },
    {
      title: "Accepting any root for k",
      body: "After \\(\\sum p_i = 1\\), reject a value of k that makes any probability negative or more than 1. State the final table before finding the mean.",
    },
  ],
};

export default sheet;
