import type { SubtopicNote } from "@/app/notes/_types";

export const RV_PROB_NOTE: SubtopicNote = {
  subtopicName: "Random Variables: Mean and Variance",
  title: "Random Variables: Mean and Variance",
  oneLineDefinition:
    "Working with a probability distribution given as a table or a formula: finding an unknown constant, probabilities of ranges, the mean E(X) and the variance E(X²) − (E X)², including the number of special items in a sample drawn without replacement.",
  whyItMatters:
    "Twenty-three PYQs, sixteen of them multiple choice. Sixteen give or build a distribution and ask for a constant, a probability, the mean or the variance; seven count defective or coloured items in a sample drawn without replacement, where a ready formula saves the table. Two ideas cover the page.",
  concepts: [
    // C1 — distributions, mean, variance
    {
      kind: "formula" as const,
      slug: "jprob-distribution",
      name: "Distributions, mean and variance",
      intuition:
        "The probabilities add to 1, which fixes any unknown constant. The mean is \\(\\sum x\\,P(x)\\) and the variance is \\(E(X^2)-(E X)^2\\). For an infinite distribution like \\(k(x+1)3^{-x}\\), the total is an arithmetico-geometric series. For a variable built from other outcomes (a difference of dice, a count of patterns), list its values and their probabilities first.",
      definition:
        "- \\(\\sum P(x)=1\\) fixes the constant.\n" +
        "- \\(E(X)=\\sum x\\,P(x)\\); \\(E(X^2)=\\sum x^2P(x)\\).\n" +
        "- \\(\\operatorname{Var}(X)=E(X^2)-(E X)^2\\), so \\(\\sigma^2+\\mu^2=E(X^2)\\).\n" +
        "- Independent \\(X,Y\\): \\(\\operatorname{Var}(X\\pm Y)=\\operatorname{Var}X+\\operatorname{Var}Y\\).\n" +
        "- A fair die: mean \\(\\frac72\\), variance \\(\\frac{35}{12}\\).",
      formula: {
        label: "Variance",
        latex: "\\operatorname{Var}(X)=E(X^2)-\\big(E(X)\\big)^2",
      },
      authoredExample: {
        prompt: "\\(X\\) takes 0, 1, 2 with probabilities \\(k,2k,3k\\). Find \\(E(X)\\) and \\(\\operatorname{Var}(X)\\).",
        steps: [
          "\\(6k=1\\Rightarrow k=\\frac16\\). \\(E(X)=\\frac{2+6}{6}=\\frac43\\).",
          "\\(E(X^2)=\\frac{2+12}{6}=\\frac73\\); \\(\\operatorname{Var}=\\frac73-\\frac{16}{9}\\).",
        ],
        answer: "\\(E(X)=\\frac43\\), \\(\\operatorname{Var}(X)=\\frac59\\).",
      },
      selfCheckExample: {
        prompt: "\\(P(X=x)=k\\,2^{-x}\\) for \\(x=0,1,2,\\dots\\). Find \\(k\\) and \\(P(X\\ge2)\\).",
        steps: [
          "\\(k(1+\\frac12+\\frac14+\\cdots)=2k=1\\).",
        ],
        answer: "\\(k=\\frac12\\); \\(P(X\\ge2)=1-\\frac12-\\frac14=\\frac14\\).",
      },
      practiceSet: [
        { prompt: "\\(E(X^2)\\) if \\(\\mu=2\\), \\(\\sigma^2=1\\)?", answer: "\\(5\\)" },
        { prompt: "Variance of one fair die?", answer: "\\(\\frac{35}{12}\\)" },
        { prompt: "\\(\\operatorname{Var}(2X)\\) for one fair die?", answer: "\\(\\frac{35}{3}\\)" },
        { prompt: "\\(\\sum_{x\\ge0}(x+1)t^x\\)?", answer: "\\(\\frac{1}{(1-t)^2}\\)" },
      ],
      pyqExampleId: "a27c6184-716e-4714-9981-72e8a1d57f8c", // 2024 — distribution a, 2a, a + b, 2b, 3b with mean 46/9
      traps: [
        {
          title: "Square the values, not the probabilities",
          body: "\\(E(X^2)=\\sum x^2P(x)\\). Squaring \\(P(x)\\), or using \\((\\sum xP)^2\\) in place of \\(E(X^2)\\), gives a wrong variance.",
        },
      ],
    },

    // C2 — sampling without replacement
    {
      kind: "formula" as const,
      slug: "jprob-hypergeometric",
      name: "Special items in a sample without replacement",
      intuition:
        "Draw \\(n\\) items from \\(N\\), of which \\(K\\) are special, without replacement; \\(X\\) counts the special ones drawn. Then \\(P(X=k)=\\frac{\\binom Kk\\binom{N-K}{n-k}}{\\binom Nn}\\), the mean is \\(n\\frac KN\\), and the variance is \\(n\\frac KN\\cdot\\frac{N-K}{N}\\cdot\\frac{N-n}{N-1}\\) — the binomial variance times a correction for not replacing.",
      definition:
        "- \\(P(X=k)=\\frac{\\binom Kk\\binom{N-K}{n-k}}{\\binom Nn}\\).\n" +
        "- \\(E(X)=n\\frac KN\\).\n" +
        "- \\(\\operatorname{Var}(X)=n\\frac KN\\left(1-\\frac KN\\right)\\frac{N-n}{N-1}\\).\n" +
        "- With replacement the draws are binomial: drop the last factor.",
      formula: {
        label: "Sampling without replacement",
        latex: "E(X)=\\frac{nK}{N},\\qquad\\operatorname{Var}(X)=\\frac{nK}{N}\\cdot\\frac{N-K}{N}\\cdot\\frac{N-n}{N-1}",
      },
      authoredExample: {
        prompt: "2 items are drawn without replacement from 8, of which 2 are faulty. Find the mean and variance of the number of faulty items drawn.",
        steps: [
          "Mean \\(2\\cdot\\frac28=\\frac12\\).",
          "Variance \\(2\\cdot\\frac14\\cdot\\frac34\\cdot\\frac67=\\frac{9}{28}\\).",
        ],
        answer: "\\(\\frac12\\) and \\(\\frac{9}{28}\\).",
      },
      selfCheckExample: {
        prompt: "3 balls are drawn without replacement from 5 red and 5 blue. Find the expected number of red balls.",
        steps: [
          "\\(3\\cdot\\frac{5}{10}\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      practiceSet: [
        { prompt: "\\(P(X=0)\\), 2 drawn from 8 with 2 faulty?", answer: "\\(\\frac{15}{28}\\)" },
        { prompt: "Correction factor for \\(n=4\\) from \\(N=10\\)?", answer: "\\(\\frac69\\)" },
        { prompt: "\\(E(\\text{red})+E(\\text{blue})\\) for 3 drawn?", answer: "\\(3\\)" },
        { prompt: "Mean with replacement, 3 draws, \\(\\frac KN=\\frac25\\)?", answer: "\\(\\frac65\\)" },
      ],
      pyqExampleId: "43ad228c-f49b-4bed-a498-3ff2142c7da7", // 2022 — 3 drawn from 4 white and 6 black, 100 sigma^2
      traps: [
        {
          title: "Without replacement changes the variance",
          body: "The mean is the same with or without replacement, but the variance is smaller without: it carries the factor \\(\\frac{N-n}{N-1}\\).",
        },
      ],
    },
  ],
};
