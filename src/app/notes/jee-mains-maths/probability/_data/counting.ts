import type { SubtopicNote } from "@/app/notes/_types";

export const COUNTING_PROB_NOTE: SubtopicNote = {
  subtopicName: "Counting Favourable Outcomes",
  title: "Counting Favourable Outcomes",
  oneLineDefinition:
    "Classical probability as a ratio of counts — favourable outcomes over equally likely outcomes — where the counting uses combinations for selections and arrangements for ordered results.",
  whyItMatters:
    "Twenty-eight PYQs, and 2026 alone has seven. Every one is two counts and a division; the probability is only as right as the sample space is. Nineteen count selections — balls, subsets, pairs, matrices — and nine count ordered results such as words or chosen numbers in order. Two ideas cover the page.",
  concepts: [
    // C1 — selections
    {
      kind: "formula" as const,
      slug: "jprob-choose",
      name: "Selections: counting with combinations",
      intuition:
        "When the order of the chosen items does not matter, count the sample space and the favourable cases both with combinations. For 'at least one', use the complement: \\(1-P(\\text{none})\\). Choosing a pair of subsets, or a matrix, counts every entry's choice; keep the sample space and the favourable count in the same terms.",
      definition:
        "- \\(P(E)=\\frac{n(E)}{n(S)}\\) for equally likely outcomes.\n" +
        "- Selections: \\(\\binom nr\\) in both counts.\n" +
        "- At least one: \\(1-P(\\text{none})\\).\n" +
        "- Pairs of subsets \\((A,B)\\) of an \\(n\\)-set: \\(4^n\\); with \\(A\\cap B=\\varnothing\\): \\(3^n\\).",
      formula: {
        label: "Classical probability",
        latex: "P(E)=\\frac{n(E)}{n(S)}",
      },
      authoredExample: {
        prompt: "Two balls are drawn from 5 red and 3 green. Find the probability that both are red.",
        steps: [
          "\\(\\frac{\\binom52}{\\binom82}=\\frac{10}{28}\\).",
        ],
        answer: "\\(\\frac{5}{14}\\).",
      },
      selfCheckExample: {
        prompt: "Two distinct numbers are chosen from 1 to 10. Find the probability that their product is even.",
        steps: [
          "Odd product needs both odd: \\(\\frac{\\binom52}{\\binom{10}2}=\\frac{10}{45}\\).",
        ],
        answer: "\\(1-\\frac29=\\frac79\\).",
      },
      practiceSet: [
        { prompt: "Pairs \\((A,B)\\) of subsets of a 3-set with \\(A\\cap B=\\varnothing\\)?", answer: "\\(27\\)" },
        { prompt: "\\(2\\times2\\) matrices with entries 0 or 1?", answer: "\\(16\\)" },
        { prompt: "\\(P\\)(no ace in 2 cards)?", answer: "\\(\\frac{\\binom{48}2}{\\binom{52}2}\\)" },
        { prompt: "Ways to split 4 balls into 2 unordered pairs?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "f4781a75-b4f2-46bd-98e3-10e7c1b85a26", // 2026 — product of two numbers from 1..50 divisible by 3
      traps: [
        {
          title: "Same sample space in both counts",
          body: "If the favourable outcomes are counted as ordered pairs, the sample space must be ordered pairs too. Mixing \\(\\binom n2\\) with \\(n(n-1)\\) doubles or halves the answer.",
        },
      ],
    },

    // C2 — ordered outcomes
    {
      kind: "formula" as const,
      slug: "jprob-arrange",
      name: "Ordered outcomes: words, sequences and orders",
      intuition:
        "When order matters, count arrangements. Symmetry is often quickest: in a random arrangement every letter is equally likely to be in any given position, and every relative order of \\(k\\) chosen items is equally likely, so 'these two vowels in alphabetical order' has probability \\(\\frac12\\). Three numbers chosen at random form an increasing A.P. or G.P. in a countable number of ways — list them by the common difference or ratio.",
      definition:
        "- Arrangements: \\(n!\\), or \\(\\frac{n!}{p!\\,q!}\\) with repeats.\n" +
        "- A particular item in a given place: \\(\\frac1n\\) by symmetry.\n" +
        "- \\(k\\) particular items in one specified order: \\(\\frac{1}{k!}\\).\n" +
        "- Increasing A.P. of 3 from \\(1..n\\): count by the common difference \\(d\\): \\(n-2d\\) each.",
      formula: {
        label: "Order by symmetry",
        latex: "P(\\text{given relative order of }k\\text{ items})=\\frac{1}{k!}",
      },
      authoredExample: {
        prompt: "The letters of PLANE are arranged at random. Find the probability that the vowels come in the order A before E.",
        steps: [
          "The two vowels are equally likely in either order.",
        ],
        answer: "\\(\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "Three distinct numbers are chosen from 1 to 7. Find the probability that, taken in increasing order, they form an A.P.",
        steps: [
          "Common difference 1: 5 triples; 2: 3; 3: 1. Total 9 out of \\(\\binom73=35\\).",
        ],
        answer: "\\(\\frac{9}{35}\\).",
      },
      practiceSet: [
        { prompt: "\\(P\\)(M in the 4th place) for the letters of a word with one M, 11 letters?", answer: "\\(\\frac{1}{11}\\)" },
        { prompt: "Two dice show different numbers?", answer: "\\(\\frac{30}{36}=\\frac56\\)" },
        { prompt: "Arrangements of 3, 3, 4, 4, 4, 5, 5?", answer: "\\(210\\)" },
        { prompt: "Increasing G.P.s \\((a,2a,4a)\\) in \\(1..40\\)?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "524f36be-a07a-4cc0-a312-2360408cc1ff", // 2022 — five numbers from 1..18 with x2 = 7 and x4 = 11
      traps: [
        {
          title: "Include non-integer ratios",
          body: "A G.P. of whole numbers can have ratio \\(\\frac32\\) or \\(\\frac43\\): \\((4,6,9)\\), \\((9,12,16)\\). Counting only whole-number ratios undercounts.",
        },
      ],
    },
  ],
};
