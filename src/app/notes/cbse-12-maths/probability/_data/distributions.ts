import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_PR_DISTRIBUTIONS_NOTE: SubtopicNote = {
  subtopicName: "Random Variables and Probability Distributions",
  title: "Random Variables and Probability Distributions",
  oneLineDefinition:
    "A random variable gives a number to each outcome of an experiment; its probability distribution lists each value with its probability, and its mean is the sum of each value times its probability.",
  whyItMatters:
    "36 questions, all from board papers: five in 2022, eleven in 2023, nine in 2024 and eleven in 2025, and none in 2026. The present NCERT chapter defines a random variable only in a remark after Example 21 and does not teach probability distributions or the mean, so this page teaches them from the board questions. The board asked for k in a given table (2022 to 2025, including two one-mark MCQs), a distribution built by counting outcomes such as the larger of two numbers or the difference on two dice (2022 to 2025), a distribution for repeated draws or throws followed by its mean (2022 to 2025), and the mean or an unknown found from the mean (2023 to 2025, including a 2025 MCQ).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmpr-rvk",
      name: "A random variable and its distribution: finding k",
      intuition:
        "A random variable turns each outcome into a number, such as the number of heads. Its distribution is a table of those numbers and their chances, and because something must happen, the chances add to 1. That one fact finds any unknown k.",
      definition:
        "- **Random variable** (NCERT, remark after Example 21): a real valued function whose domain is the sample space of a random experiment. For two tosses, X = number of heads gives X(HH) = 2, X(HT) = X(TH) = 1, X(TT) = 0.\n" +
        "- More than one random variable can be defined on the same sample space.\n" +
        "- **Probability distribution:** a table of the values \\(x_1, x_2, \\ldots, x_n\\) with \\(p_i = P(X = x_i)\\), where every \\(p_i \\ge 0\\) and \\(\\sum p_i = 1\\).\n" +
        "- **Finding k:** add the row of probabilities, set the sum equal to 1, solve. If k comes from a quadratic, reject the root that gives a negative probability.\n" +
        "- \\(P(1 < X < 4)\\) leaves out 1 and 4; \\(P(1 \\le X \\le 4)\\) keeps them.\n" +
        "- **Syllabus note:** the board asked this every year from 2022 to 2025 and not in 2026. The present NCERT chapter says little about distributions, so learn the methods on this page from the board questions, and check the current CBSE syllabus for your year.",
      formula: {
        label: "Condition on a probability distribution",
        latex: "p_i \\ge 0, \\quad \\sum_{i=1}^{n} p_i = 1",
      },
      authoredExample: {
        prompt: "A random variable X takes the values 0, 1, 2, 3 with probabilities k, 2k, 2k and 3k. Find k and \\(P(X \\ge 2)\\).",
        steps: [
          "The probabilities of a distribution add to 1: \\(k + 2k + 2k + 3k = 1\\).",
          "\\(8k = 1\\), so \\(k = \\dfrac{1}{8}\\).",
          "\\(P(X \\ge 2) = P(X = 2) + P(X = 3) = 2k + 3k = 5k\\).",
          "\\(P(X \\ge 2) = \\dfrac{5}{8}\\).",
        ],
        answer: "\\(k = \\dfrac{1}{8}\\), \\(P(X \\ge 2) = \\dfrac{5}{8}\\)",
      },
      selfCheckExample: {
        prompt: "X takes the values 1, 2, 3, 4 with probabilities k, 2k, \\(k^2\\) and \\(3k^2\\). Find k and \\(P(X = 3)\\).",
        steps: [
          "\\(4k^2 + 3k - 1 = 0\\), that is \\((4k - 1)(k + 1) = 0\\).",
          "\\(k = -1\\) gives a negative probability, so it is rejected.",
        ],
        answer: "\\(k = \\dfrac{1}{4}\\), \\(P(X = 3) = \\dfrac{1}{16}\\)",
      },
      practiceSet: [
        { prompt: "X takes the values 1, 2, 3 with probabilities \\(\\dfrac{1}{4}\\), \\(\\dfrac{1}{2}\\) and k. Find k.", answer: "\\(\\dfrac{1}{4}\\)" },
        { prompt: "\\(P(X = x) = kx\\) for x = 1, 2, 3, 4, 5, and 0 otherwise. Find k.", answer: "\\(15k = 1\\), so \\(k = \\dfrac{1}{15}\\)" },
        {
          prompt: "X takes the values 1, 2, 3, 4 with probabilities 0.2, 0.3, 0.4, 0.1. Find \\(P(1 < X \\le 3)\\).",
          answer: "\\(0.3 + 0.4 = 0.7\\)",
        },
      ],
      pyqExampleId: "69fd723d-b972-4f74-b085-507435f175be",
      traps: [
        {
          title: "Keeping a negative root",
          body: "When the sum gives a quadratic in k (board 2023), one root is usually negative. A probability cannot be negative, so that root is rejected; say so in your answer.",
        },
        {
          title: "Strict and non-strict signs",
          body: "\\(P(1 < X < 6)\\) leaves out \\(X = 1\\) and \\(X = 6\\). Read each sign before adding the table entries.",
        },
        {
          title: "Answering k when a probability is asked",
          body: "Finding k is only the first step. If the question asks for \\(P(X = 3)\\), put the value of k back into that entry.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-rvbuild",
      name: "Building a distribution by listing outcomes",
      intuition:
        "To write a distribution from scratch, list every outcome of the experiment, work out the value of X for each, and group the outcomes by that value. Each group's probability is one entry in the table.",
      definition:
        "- **Step 1:** write the sample space and say how many outcomes it has.\n" +
        "- **Step 2:** state the values X can take.\n" +
        "- **Step 3:** for each value, count (or multiply out) its probability.\n" +
        "- **Step 4:** write the table and check that the probabilities add to 1.\n" +
        "- **Without replacement**, the second draw comes from one fewer ball, and 'one of each colour' can happen in two orders.\n" +
        "- For 'two numbers chosen from n', there are \\({}^{n}C_2\\) equally likely pairs.",
      formula: {
        label: "Each entry of the table",
        latex: "P(X = x_i) = \\dfrac{\\text{number of outcomes with } X = x_i}{\\text{total number of outcomes}}",
      },
      authoredExample: {
        prompt: "Two cards are drawn together from four cards numbered 1, 2, 3, 4. Let X be the sum of the two numbers. Find the probability distribution of X.",
        steps: [
          "There are \\({}^{4}C_2 = 6\\) equally likely pairs: {1, 2}, {1, 3}, {1, 4}, {2, 3}, {2, 4}, {3, 4}.",
          "Their sums are 3, 4, 5, 5, 6, 7, so X takes the values 3, 4, 5, 6, 7.",
          "\\(P(X = 3) = \\dfrac{1}{6}\\), \\(P(X = 4) = \\dfrac{1}{6}\\), \\(P(X = 5) = \\dfrac{2}{6} = \\dfrac{1}{3}\\), \\(P(X = 6) = \\dfrac{1}{6}\\), \\(P(X = 7) = \\dfrac{1}{6}\\).",
          "Check: \\(\\dfrac{1 + 1 + 2 + 1 + 1}{6} = 1\\).",
        ],
        answer: "X = 3, 4, 5, 6, 7 with probabilities \\(\\dfrac{1}{6}, \\dfrac{1}{6}, \\dfrac{1}{3}, \\dfrac{1}{6}, \\dfrac{1}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Three fair coins are tossed. Let X be the number of heads. Find the probability distribution of X.",
        steps: ["Of the 8 outcomes, 1 has no head, 3 have one, 3 have two and 1 has three."],
        answer: "\\(P(X = 0, 1, 2, 3) = \\dfrac{1}{8}, \\dfrac{3}{8}, \\dfrac{3}{8}, \\dfrac{1}{8}\\)",
      },
      practiceSet: [
        { prompt: "Two fair coins are tossed and X is the number of heads. Find \\(P(X = 1)\\).", answer: "\\(\\dfrac{1}{2}\\)" },
        {
          prompt: "Two different numbers are chosen at random from 1, 2, 3, 4, 5, and X is the smaller of the two. Find \\(P(X = 1)\\).",
          answer: "4 of the 10 pairs contain 1, so \\(\\dfrac{2}{5}\\)",
        },
        {
          prompt: "Two dice are thrown and X is the absolute difference of the numbers. Find \\(P(X = 0)\\).",
          answer: "\\(\\dfrac{6}{36} = \\dfrac{1}{6}\\)",
        },
      ],
      pyqExampleId: "f2794eda-e017-45ed-abcf-48f8f0bc1b98",
      traps: [
        {
          title: "Forgetting the second order",
          body: "'One red and one blue' in two draws is red then blue OR blue then red. Leaving out one order halves that entry, and the table no longer adds to 1.",
        },
        {
          title: "A value X cannot take",
          body: "When X is the larger of two different numbers, it can never be the smallest number. List only the values that really occur.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-rvrepeat",
      name: "Repeated independent draws and throws",
      intuition:
        "Drawing with replacement, or throwing a die again, repeats the same experiment with the same chances. The number of successes in a few such trials has a short table you can build by multiplying.",
      definition:
        "- Let p be the probability of success in one trial and \\(q = 1 - p\\). With replacement, p stays the same in every trial.\n" +
        "- **Two trials:** \\(P(X = 0) = q^2\\), \\(P(X = 1) = 2pq\\) (success in the first OR the second trial), \\(P(X = 2) = p^2\\).\n" +
        "- **Three trials:** \\(P(X = 0, 1, 2, 3) = q^3, 3pq^2, 3p^2q, p^3\\).\n" +
        "- **A biased coin or die:** find p first. 'Head is 3 times as likely as tail' gives \\(P(H) = \\dfrac{3}{4}\\); 'an even face is twice as likely as an odd one' gives each odd face \\(\\dfrac{1}{9}\\) and each even face \\(\\dfrac{2}{9}\\).\n" +
        "- After the table, find the mean from \\(\\sum x_i p_i\\). That working is what earns the marks.",
      formula: {
        label: "Number of successes in two trials",
        latex: "P(X = 0) = q^2, \\quad P(X = 1) = 2pq, \\quad P(X = 2) = p^2",
      },
      authoredExample: {
        prompt: "A die is thrown twice. Let X be the number of times a number greater than 4 appears. Find the probability distribution of X and its mean.",
        steps: [
          "On one throw, success is 5 or 6: \\(p = \\dfrac{2}{6} = \\dfrac{1}{3}\\), \\(q = \\dfrac{2}{3}\\). The throws are independent.",
          "\\(P(X = 0) = \\dfrac{2}{3} \\times \\dfrac{2}{3} = \\dfrac{4}{9}\\).",
          "\\(P(X = 1) = 2 \\times \\dfrac{1}{3} \\times \\dfrac{2}{3} = \\dfrac{4}{9}\\) (success on the first or on the second throw).",
          "\\(P(X = 2) = \\dfrac{1}{3} \\times \\dfrac{1}{3} = \\dfrac{1}{9}\\). Check: \\(\\dfrac{4 + 4 + 1}{9} = 1\\).",
          "Mean \\(= 0 \\times \\dfrac{4}{9} + 1 \\times \\dfrac{4}{9} + 2 \\times \\dfrac{1}{9} = \\dfrac{6}{9} = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(P(X = 0, 1, 2) = \\dfrac{4}{9}, \\dfrac{4}{9}, \\dfrac{1}{9}\\); mean \\(\\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "A coin is biased so that a head is twice as likely as a tail. Find P(H), and the probability of exactly one head in three tosses.",
        steps: [
          "\\(P(H) + P(T) = 1\\) with \\(P(H) = 2P(T)\\), so \\(P(H) = \\dfrac{2}{3}\\), \\(P(T) = \\dfrac{1}{3}\\).",
          "Exactly one head: \\(3pq^2 = 3 \\times \\dfrac{2}{3} \\times \\dfrac{1}{9}\\).",
        ],
        answer: "\\(P(H) = \\dfrac{2}{3}\\); \\(\\dfrac{2}{9}\\)",
      },
      practiceSet: [
        {
          prompt: "A card is drawn from a pack of 52, put back, and a second card is drawn. X is the number of aces. Find \\(P(X = 0)\\).",
          answer: "\\(\\left(\\dfrac{12}{13}\\right)^2 = \\dfrac{144}{169}\\)",
        },
        { prompt: "A die is thrown twice and X is the number of even numbers. Find \\(P(X = 1)\\).", answer: "\\(2 \\times \\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{2}\\)" },
        {
          prompt: "Two balls are drawn with replacement from a bag of 1 red and 3 green balls, and X is the number of red balls. Find \\(P(X = 2)\\).",
          answer: "\\(\\dfrac{1}{4} \\times \\dfrac{1}{4} = \\dfrac{1}{16}\\)",
        },
      ],
      pyqExampleId: "fe422516-e745-4b34-96ea-f21d6b0b1999",
      traps: [
        {
          title: "Leaving out the 2 in P(X = 1)",
          body: "One success in two trials can come first or second, so \\(P(X = 1) = 2pq\\). Writing pq alone makes the table add to less than 1.",
        },
        {
          title: "Treating a biased die as fair",
          body: "Set up the face probabilities from the condition first, check they add to 1, and only then find p for the event asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-rvmean",
      name: "The mean (expectation) of a random variable",
      intuition:
        "The mean is the long-run average value of X: each value is weighted by how often it happens. It need not be one of the values X can take.",
      definition:
        "- **Mean or expectation:** \\(E(X) = \\sum x_i\\,p_i = x_1p_1 + x_2p_2 + \\cdots + x_np_n\\).\n" +
        "- Multiply each value by its own probability, then add. Negative values keep their signs.\n" +
        "- **Unknowns from the mean:** two unknowns need two equations, \\(\\sum p_i = 1\\) and \\(\\sum x_i p_i = \\) the given mean.\n" +
        "- If a table has an unknown k, find k first, then the mean.\n" +
        "- Write the answer with its unit when X has one (rupees, hours, students).",
      formula: {
        label: "Mean of a random variable",
        latex: "E(X) = \\sum_{i=1}^{n} x_i\\,p_i",
      },
      authoredExample: {
        prompt: "X takes the values \\(-1\\), 0, 1, 2 with probabilities 0.15, 0.25, 0.35 and 0.25. Find E(X).",
        steps: [
          "Check the table: \\(0.15 + 0.25 + 0.35 + 0.25 = 1\\).",
          "\\(E(X) = (-1)(0.15) + 0(0.25) + 1(0.35) + 2(0.25)\\).",
          "\\(E(X) = -0.15 + 0 + 0.35 + 0.5 = 0.7\\).",
        ],
        answer: "\\(E(X) = 0.7\\)",
      },
      selfCheckExample: {
        prompt: "Two fair coins are tossed and X is the number of heads. Find the mean of X.",
        steps: [
          "\\(P(X = 0, 1, 2) = \\dfrac{1}{4}, \\dfrac{1}{2}, \\dfrac{1}{4}\\).",
          "\\(E(X) = 0 \\times \\dfrac{1}{4} + 1 \\times \\dfrac{1}{2} + 2 \\times \\dfrac{1}{4}\\).",
        ],
        answer: "\\(E(X) = 1\\)",
      },
      practiceSet: [
        { prompt: "X takes the values 1, 2, 3, 4, each with probability \\(\\dfrac{1}{4}\\). Find E(X).", answer: "\\(\\dfrac{5}{2}\\)" },
        {
          prompt: "A ticket wins ₹ 20 with probability 0.1 and ₹ 5 with probability 0.3, and nothing otherwise. Find the mean prize.",
          answer: "\\(20(0.1) + 5(0.3) = 3.5\\), so ₹ 3.50",
        },
        {
          prompt: "X takes the values 2, 4, 6 with probabilities \\(\\dfrac{1}{2}\\), \\(\\dfrac{1}{3}\\), \\(\\dfrac{1}{6}\\). Find E(X).",
          answer: "\\(1 + \\dfrac{4}{3} + 1 = \\dfrac{10}{3}\\)",
        },
      ],
      pyqExampleId: "daf2930c-bd49-4918-8ecd-6209efd311ac",
      traps: [
        {
          title: "Adding the probabilities only",
          body: "The mean is \\(\\sum x_i p_i\\), not \\(\\sum p_i\\) (which is always 1) or the average of the values.",
        },
        {
          title: "Dropping a minus sign",
          body: "With values like \\(-4, -3, \\ldots\\), each product keeps its sign. A table of negative values gives a negative mean.",
        },
        {
          title: "One equation for two unknowns",
          body: "When a and b are unknown, use both conditions: the probabilities add to 1, and the mean equals the given value.",
        },
      ],
    },
  ],
};
