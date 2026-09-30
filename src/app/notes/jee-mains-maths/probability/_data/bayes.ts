import type { SubtopicNote } from "@/app/notes/_types";

export const BAYES_PROB_NOTE: SubtopicNote = {
  subtopicName: "Total Probability and Bayes' Theorem",
  title: "Total Probability and Bayes' Theorem",
  oneLineDefinition:
    "Splitting an event over the ways it can happen (total probability), and reversing a conditional to find which way it most likely happened (Bayes' theorem), including cases where the contents of a bag are unknown.",
  whyItMatters:
    "Twenty-six PYQs, the largest page in the chapter, and all but three multiple choice. Five only need the total probability of an outcome; sixteen then reverse it with Bayes' theorem; five infer an unknown bag or a lost card from what was drawn. Three ideas cover the page.",
  concepts: [
    // C1 — total probability
    {
      kind: "formula" as const,
      slug: "jprob-total",
      name: "Total probability",
      intuition:
        "When an outcome can happen through several mutually exclusive routes — which bag, which machine, which ball was transferred — add the route probabilities: \\(P(E)=\\sum P(H_i)\\,P(E\\mid H_i)\\). A transfer between bags is a two-stage experiment: the transferred ball is the route.",
      definition:
        "- \\(P(E)=\\sum_iP(H_i)\\,P(E\\mid H_i)\\), with \\(H_i\\) mutually exclusive and covering all cases.\n" +
        "- A tree: multiply along a branch, add across branches.\n" +
        "- Transfer from bag 1 to bag 2, then draw: the routes are the colours transferred.",
      formula: {
        label: "Total probability",
        latex: "P(E)=\\sum_{i}P(H_i)\\,P(E\\mid H_i)",
      },
      authoredExample: {
        prompt: "Bag I has 2 red and 3 blue balls, bag II has 4 red and 1 blue. A bag is chosen at random and a ball drawn. Find \\(P(\\text{red})\\).",
        steps: [
          "\\(\\frac12\\cdot\\frac25+\\frac12\\cdot\\frac45\\).",
        ],
        answer: "\\(\\frac35\\).",
      },
      selfCheckExample: {
        prompt: "A bag has 3 fair coins and 1 two-headed coin. A coin is chosen and tossed. Find \\(P(\\text{head})\\).",
        steps: [
          "\\(\\frac34\\cdot\\frac12+\\frac14\\cdot1\\).",
        ],
        answer: "\\(\\frac58\\).",
      },
      practiceSet: [
        { prompt: "\\(P(E)\\) with \\(P(H_1)=0.3\\), \\(P(E\\mid H_1)=0.5\\), \\(P(H_2)=0.7\\), \\(P(E\\mid H_2)=0.2\\)?", answer: "\\(0.29\\)" },
        { prompt: "Routes in a transfer of one ball from a bag of 3 colours?", answer: "3" },
        { prompt: "Do the \\(P(H_i)\\) add to 1?", answer: "Yes" },
        { prompt: "\\(P(\\text{win})\\) with captains chosen 0.5/0.5 and win chances 0.6/0.8?", answer: "\\(0.7\\)" },
      ],
      pyqExampleId: "4659f3de-cc44-4f35-b498-de4d0becb58c", // 2026 — ball moved from bag B to bag A, then drawn from A
      traps: [
        {
          title: "The receiving bag has one more ball",
          body: "After a transfer, the second bag holds one extra ball. Using its original total in the denominator is the usual mistake.",
        },
      ],
    },

    // C2 — Bayes
    {
      kind: "formula" as const,
      slug: "jprob-bayes",
      name: "Bayes' theorem",
      intuition:
        "Given that the outcome happened, the chance it came through route \\(H_k\\) is that route's share of the total: \\(P(H_k\\mid E)=\\frac{P(H_k)P(E\\mid H_k)}{\\sum_iP(H_i)P(E\\mid H_i)}\\). Compute every route product once; the answer is one product divided by their sum. With equal priors, the priors cancel.",
      definition:
        "- \\(P(H_k\\mid E)=\\frac{P(H_k)\\,P(E\\mid H_k)}{\\sum_iP(H_i)\\,P(E\\mid H_i)}\\).\n" +
        "- Equal priors: \\(P(H_k\\mid E)=\\frac{P(E\\mid H_k)}{\\sum P(E\\mid H_i)}\\).\n" +
        "- Percentages: work with the products directly, e.g. \\(0.5\\times0.02\\).",
      formula: {
        label: "Bayes' theorem",
        latex: "P(H_k\\mid E)=\\frac{P(H_k)\\,P(E\\mid H_k)}{\\sum_iP(H_i)\\,P(E\\mid H_i)}",
      },
      authoredExample: {
        prompt: "Machines A and B make 70% and 30% of the items; 2% of A's and 5% of B's are faulty. A faulty item is found. Find the probability it came from B.",
        steps: [
          "\\(\\frac{0.3\\cdot0.05}{0.7\\cdot0.02+0.3\\cdot0.05}=\\frac{0.015}{0.029}\\).",
        ],
        answer: "\\(\\frac{15}{29}\\).",
      },
      selfCheckExample: {
        prompt: "With the bags of the total-probability example (2R 3B and 4R 1B, chosen at random), a red ball is drawn. Find the probability it came from bag II.",
        steps: [
          "\\(\\frac{\\frac12\\cdot\\frac45}{\\frac35}\\).",
        ],
        answer: "\\(\\frac23\\).",
      },
      practiceSet: [
        { prompt: "Equal priors, likelihoods \\(\\frac14,\\frac12\\): posterior of the second?", answer: "\\(\\frac23\\)" },
        { prompt: "A two-headed coin among 9 fair coins; a head appears. \\(P\\)(two-headed)?", answer: "\\(\\frac{2}{11}\\)" },
        { prompt: "Posteriors over all routes add to?", answer: "1" },
        { prompt: "Numerator of Bayes' theorem?", answer: "\\(P(H_k)P(E\\mid H_k)\\)" },
      ],
      pyqExampleId: "f8808f43-5135-446f-a1b5-0c939a889548", // 2023 — bolt factory, machines A, B, C
      traps: [
        {
          title: "Priors are not always equal",
          body: "When bags or machines are chosen with different chances, keep \\(P(H_i)\\) in every product. Dropping them is only allowed when they are equal.",
        },
      ],
    },

    // C3 — unknown composition
    {
      kind: "formula" as const,
      slug: "jprob-hidden",
      name: "Inferring an unknown bag or a lost card",
      intuition:
        "When the number of black balls in a bag is unknown, each possible number is a route, usually taken as equally likely. The draw's probability under each route is a ratio of combinations, and Bayes' theorem weights the routes by those ratios. A lost card works the same way: the routes are 'the lost card was a spade' and 'was not'.",
      definition:
        "- Routes: every possible composition, equally likely unless stated.\n" +
        "- Likelihood of drawing \\(r\\) of a kind from \\(k\\) of that kind among \\(n\\): \\(\\frac{\\binom kr}{\\binom nr}\\).\n" +
        "- Common denominators cancel, so work with \\(\\binom kr\\) as weights.\n" +
        "- Lost card: priors \\(\\frac14\\) (spade) and \\(\\frac34\\) (not).",
      formula: {
        label: "Weights for an unknown bag",
        latex: "P(k\\mid\\text{draw})=\\frac{\\binom kr}{\\sum_j\\binom jr}\\quad(\\text{equal priors})",
      },
      authoredExample: {
        prompt: "A bag has 4 balls, each black or white, all compositions equally likely. One ball is drawn and it is black. Find the probability that all 4 are black.",
        steps: [
          "Weights \\(\\frac k4\\) for \\(k=0,\\dots,4\\): \\(0,1,2,3,4\\), sum 10.",
        ],
        answer: "\\(\\frac{4}{10}=\\frac25\\).",
      },
      selfCheckExample: {
        prompt: "A card is lost from a pack. One card is then drawn and it is a heart. Find the probability that the lost card was a heart.",
        steps: [
          "\\(\\frac{\\frac14\\cdot\\frac{12}{51}}{\\frac14\\cdot\\frac{12}{51}+\\frac34\\cdot\\frac{13}{51}}=\\frac{12}{51}\\).",
        ],
        answer: "\\(\\frac{12}{51}=\\frac{4}{17}\\).",
      },
      practiceSet: [
        { prompt: "Weights for 2 black drawn from bags with \\(k\\) black of 6?", answer: "\\(\\binom k2\\)" },
        { prompt: "\\(\\sum_{k=0}^{6}\\binom k2\\)?", answer: "\\(\\binom73=35\\)" },
        { prompt: "Prior that a lost card is a spade?", answer: "\\(\\frac14\\)" },
        { prompt: "Likelihood of 2 spades drawn if the lost card was a spade?", answer: "\\(\\frac{\\binom{12}2}{\\binom{51}2}\\)" },
      ],
      pyqExampleId: "ddc775b5-2931-4d80-bfbe-b8bdd04c35b9", // 2023 — bag of 6, two black drawn, at least 5 black
      traps: [
        {
          title: "Include the impossible compositions",
          body: "Compositions that could not produce the draw have weight 0 but still count when setting equal priors. The denominator sums over all of them; the zeros simply add nothing.",
        },
      ],
    },
  ],
};
