import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PD_PMF_NOTE: SubtopicNote = {
  subtopicName: "Probability Mass Function of a Discrete Random Variable",
  title: "Probability Distribution and Probability Mass Function",
  oneLineDefinition:
    "For a discrete random variable, the table or formula giving P(X = x) for each value x is its probability distribution; every probability must be non-negative and together they must add up to 1.",
  whyItMatters:
    "36 questions, four of them from board papers: P(X ≤ 4) for a table with k, 2k, 3k, 4k, 5k (2016), the value of k and P(X < 2) for the table 0.1, k, 2k, 2k, k (2024, asked again in 2025 with P(1 ≤ X < 4)), and the distribution of the number of heads when two coins are tossed (2024). The textbook rows are Exercise 7.1 Q.3 to Q.8, the worked examples of 7.3, and the p.m.f. questions of Miscellaneous Exercise 7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmpd-conditions",
      name: "Conditions for a probability mass function",
      intuition:
        "Each probability is a share of certainty. A share cannot be negative, and the shares of all the values together must make up the whole, which is 1. A probability may be 0. The values of X themselves may be negative or fractions; the two conditions are about the probabilities only.",
      definition:
        "- Let the possible values of \\(X\\) be \\(x_1, x_2, x_3, \\ldots\\) and let \\(p_i = P[X = x_i]\\).\n" +
        "- The function \\(p\\) is the **probability mass function (p.m.f.)** of \\(X\\) if (i) \\(p_i \\geq 0\\) for every \\(i\\), and (ii) \\(\\sum p_i = 1\\).\n" +
        "- The table of values \\(x_i\\) with their probabilities \\(p_i\\) is the **probability distribution** of \\(X\\).\n" +
        "- To show a table is not a p.m.f., one failed condition is enough, but name the condition and show the working.",
      formula: {
        label: "Conditions for a p.m.f.",
        latex: "p_i \\geq 0 \\text{ for every } i, \\qquad \\sum_{i} p_i = 1",
      },
      authoredExample: {
        prompt:
          "State, with reasons, whether the following is the p.m.f. of a random variable: \\(X\\): \\(-1, 0, 1, 2\\) with \\(P(X)\\): \\(\\dfrac{1}{6}, \\dfrac{1}{3}, \\dfrac{1}{4}, \\dfrac{1}{4}\\).",
        steps: [
          "Condition (i): \\(\\dfrac{1}{6}, \\dfrac{1}{3}, \\dfrac{1}{4}, \\dfrac{1}{4}\\) are all non-negative.",
          "Condition (ii): \\(\\dfrac{1}{6} + \\dfrac{1}{3} + \\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{2 + 4 + 3 + 3}{12} = \\dfrac{12}{12} = 1\\).",
          "Both conditions hold. The negative value \\(x = -1\\) does not matter, because the conditions are on the probabilities.",
        ],
        answer: "Yes, it is a p.m.f.",
      },
      selfCheckExample: {
        prompt: "Is the table \\(X\\): 0, 1, 2 with \\(P(X)\\): 0.5, 0.3, 0.3 a p.m.f.?",
        steps: ["All three are non-negative, but \\(0.5 + 0.3 + 0.3 = 1.1 \\neq 1\\)."],
        answer: "No, the probabilities add up to 1.1, not 1",
      },
      practiceSet: [
        { prompt: "Can one probability in a p.m.f. be 0?", answer: "Yes, \\(p_i \\geq 0\\) allows 0; only a negative probability is ruled out" },
        { prompt: "A table has probabilities \\(0.2, 0.5, 0.3\\), and one value of \\(X\\) is \\(-4\\). Is it a p.m.f.?", answer: "Yes, the probabilities are non-negative and add up to 1" },
      ],
      pyqExampleId: "673db4ff-eab2-43ce-a689-293975bad898",
      traps: [
        {
          title: "Rejecting a table because a value of X is negative",
          body: "The values of \\(X\\) may be negative, such as a loss of money. Only a negative probability breaks the conditions.",
        },
        {
          title: "Checking only the sum",
          body: "The probabilities \\(0.6, -0.1, 0.5\\) add up to 1, but the table is not a p.m.f. because one probability is negative. Check both conditions every time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-constant",
      name: "Finding k and the probability of an event",
      intuition:
        "When the table has an unknown k, the condition that all probabilities add up to 1 gives an equation for k. Once k is known, the probability of an event is the sum of the probabilities of the values of X that lie in it. Most lost marks come from the inequality signs, so list the values first.",
      definition:
        "- **Step 1:** add all the probabilities, put the sum equal to 1 and solve for \\(k\\).\n" +
        "- **Step 2:** if the equation is quadratic, reject the root that makes any probability negative.\n" +
        "- **Step 3:** for an event, list the values of \\(X\\) in it, then add their probabilities.\n" +
        "- \\(X < a\\) leaves out \\(a\\); \\(X \\leq a\\) keeps it. \\(P[X > a] = 1 - P[X \\leq a]\\).\n" +
        "- For an event in words, such as 'X is positive' or 'X is odd', write the values first.",
      formula: {
        label: "Finding the constant",
        latex: "\\sum_{i} P[X = x_i] = 1, \\qquad P[a \\leq X \\leq b] = \\sum_{a \\leq x_i \\leq b} P[X = x_i]",
      },
      authoredExample: {
        prompt:
          "\\(X\\) takes the values 0, 1, 2, 3 with probabilities \\(k\\), \\(2k\\), \\(2k^{2}\\), \\(3k^{2} + k\\). Find \\(k\\), \\(P[X \\geq 2]\\) and \\(P[0 < X \\leq 2]\\).",
        steps: [
          "The probabilities add up to 1: \\(k + 2k + 2k^{2} + 3k^{2} + k = 1\\).",
          "\\(5k^{2} + 4k - 1 = 0\\), so \\((5k - 1)(k + 1) = 0\\).",
          "\\(k = \\dfrac{1}{5}\\) or \\(k = -1\\). Reject \\(k = -1\\), since \\(P[X = 0] = k\\) cannot be negative. So \\(k = \\dfrac{1}{5}\\).",
          "The probabilities are \\(0.2, 0.4, 0.08, 0.32\\). Check: \\(0.2 + 0.4 + 0.08 + 0.32 = 1\\).",
          "\\(P[X \\geq 2] = P[X = 2] + P[X = 3] = 0.08 + 0.32 = 0.4\\).",
          "\\(P[0 < X \\leq 2] = P[X = 1] + P[X = 2] = 0.4 + 0.08 = 0.48\\).",
        ],
        answer: "\\(k = \\dfrac{1}{5}\\), \\(P[X \\geq 2] = 0.4\\), \\(P[0 < X \\leq 2] = 0.48\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(X\\) takes the values \\(-2, -1, 0, 1, 2\\) with probabilities 0.1, 0.2, 0.3, 0.25, 0.15. Find the probability that \\(X\\) is negative.",
        steps: ["\\(X\\) is negative for \\(X = -2\\) and \\(X = -1\\): \\(0.1 + 0.2 = 0.3\\)."],
        answer: "0.3",
      },
      practiceSet: [
        { prompt: "\\(P[X = x] = kx\\) for \\(x = 1, 2, 3, 4\\). Find \\(k\\).", answer: "\\(10k = 1\\), so \\(k = \\dfrac{1}{10}\\)" },
        { prompt: "\\(X\\) takes the values 1, 2, 3, 4 with probabilities 0.1, 0.3, 0.4, 0.2. Find \\(P[X > 2]\\).", answer: "\\(0.4 + 0.2 = 0.6\\)" },
        { prompt: "For a discrete \\(X\\), \\(P[X \\leq 3] = 0.7\\). Find \\(P[X > 3]\\).", answer: "\\(1 - 0.7 = 0.3\\)" },
      ],
      pyqExampleId: "38c6057d-e1d8-4448-be03-8759bed385bd",
      traps: [
        {
          title: "Keeping the negative root of k",
          body: "A quadratic in \\(k\\) gives two roots. Write which one you reject and why: a probability such as \\(k\\) or \\(2k\\) cannot be negative.",
        },
        {
          title: "Including the end value of a strict inequality",
          body: "\\(P[X < a]\\) stops before \\(a\\); \\(P[X \\leq a]\\) includes it. Write the list of values in the event before adding.",
        },
        {
          title: "Giving k without checking",
          body: "Put the value of \\(k\\) back into the table and show that the probabilities add up to 1. It takes one line and catches a slip in the equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmpd-construct",
      name: "Writing the probability distribution of an experiment",
      intuition:
        "To build the table yourself: write the outcomes, read the value of X for each, group the outcomes that share a value, and find each group's probability. When draws are made with replacement, the draws are independent, so the probabilities multiply, and every order of successes and failures must be counted.",
      definition:
        "- **Step 1:** write the sample space, or the probability \\(p\\) of a success in one trial and \\(q = 1 - p\\).\n" +
        "- **Step 2:** write the possible values of \\(X\\).\n" +
        "- **Step 3:** for each value, find \\(P[X = x]\\): count the favourable outcomes, or multiply the probabilities of independent trials, adding over every order.\n" +
        "- **Step 4:** write the distribution as a table and check that the probabilities add up to 1.\n" +
        "- When the probabilities follow a rule, the p.m.f. can be written as a formula, for example \\(P[X = x] = {}^{4}C_{x}\\left(\\dfrac{1}{2}\\right)^{4}\\), \\(x = 0, 1, 2, 3, 4\\), for the number of heads in 4 tosses of a coin.",
      formula: {
        label: "Building the table",
        latex: "P[X = x] = \\frac{\\text{number of outcomes with } X = x}{n(S)}",
      },
      authoredExample: {
        prompt:
          "A bag contains 2 red and 3 white balls. Two balls are drawn one by one with replacement. Find the probability distribution of the number of red balls drawn.",
        steps: [
          "Let \\(X\\) be the number of red balls drawn. The ball is put back, so the draws are independent and on each draw \\(p = P(\\text{red}) = \\dfrac{2}{5}\\), \\(q = \\dfrac{3}{5}\\).",
          "Possible values of \\(X\\): 0, 1, 2.",
          "\\(P[X = 0] = q \\times q = \\dfrac{3}{5} \\times \\dfrac{3}{5} = \\dfrac{9}{25}\\).",
          "\\(P[X = 1] = pq + qp = 2 \\times \\dfrac{2}{5} \\times \\dfrac{3}{5} = \\dfrac{12}{25}\\) (red then white, or white then red).",
          "\\(P[X = 2] = p \\times p = \\dfrac{2}{5} \\times \\dfrac{2}{5} = \\dfrac{4}{25}\\).",
          "Check: \\(\\dfrac{9 + 12 + 4}{25} = 1\\).",
        ],
        answer: "\\(X\\): 0, 1, 2 with \\(P[X = x]\\): \\(\\dfrac{9}{25}, \\dfrac{12}{25}, \\dfrac{4}{25}\\)",
      },
      selfCheckExample: {
        prompt: "A die is thrown once. \\(X = 1\\) if the number is a multiple of 3, and \\(X = 0\\) otherwise. Write the probability distribution of \\(X\\).",
        steps: ["The multiples of 3 are 3 and 6, so \\(P[X = 1] = \\dfrac{2}{6} = \\dfrac{1}{3}\\) and \\(P[X = 0] = \\dfrac{2}{3}\\)."],
        answer: "\\(P[X = 0] = \\dfrac{2}{3}\\), \\(P[X = 1] = \\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "A fair coin is tossed until a head appears. \\(X\\) is the number of tosses. Find \\(P[X = 3]\\).", answer: "Tail, tail, head: \\(\\dfrac{1}{2} \\times \\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{8}\\)" },
        { prompt: "Two dice are thrown and \\(X\\) is the sum of the numbers. Find \\(P[X = 4]\\).", answer: "\\((1, 3), (2, 2), (3, 1)\\): \\(\\dfrac{3}{36} = \\dfrac{1}{12}\\)" },
        { prompt: "A card is drawn from a pack of 52, replaced, and a second card is drawn. \\(X\\) is the number of hearts. Find \\(P[X = 2]\\).", answer: "\\(\\dfrac{1}{4} \\times \\dfrac{1}{4} = \\dfrac{1}{16}\\)" },
      ],
      pyqExampleId: "b6b98644-9923-41ca-941c-b360b877c26b",
      traps: [
        {
          title: "Treating different orders as one outcome",
          body: "With dice, \\((1, 2)\\) and \\((2, 1)\\) are two different outcomes. Counting them once makes the values look equally likely when they are not.",
        },
        {
          title: "Forgetting the orders in independent draws",
          body: "One success in two draws can happen as success then failure or failure then success, so its probability is \\(2pq\\), not \\(pq\\).",
        },
        {
          title: "No check line",
          body: "End every distribution with the sum of its probabilities equal to 1. A sum that is not 1 shows a missing outcome before the examiner sees it.",
        },
      ],
    },
  ],
};
