import type { SubtopicNote } from "@/app/notes/_types";

export const BINOMIAL_PROB_NOTE: SubtopicNote = {
  subtopicName: "Binomial Distribution",
  title: "Binomial Distribution",
  oneLineDefinition:
    "The number of successes in n independent trials with the same success probability: P(X = r) = C(n, r) p^r q^(n − r), with mean np and variance npq.",
  whyItMatters:
    "Twenty PYQs, and 2022 alone has nine. Thirteen compute a probability — exactly r, at least r, or a ratio of two terms — and seven recover n and p from the mean and variance first. Two ideas cover the page.",
  concepts: [
    // C1 — binomial probabilities
    {
      kind: "formula" as const,
      slug: "jprob-binomial",
      name: "Binomial probabilities",
      intuition:
        "For \\(n\\) independent trials with success probability \\(p\\), exactly \\(r\\) successes happen with probability \\(\\binom nrp^rq^{n-r}\\). 'At least \\(r\\)' adds the top terms or subtracts the bottom ones, whichever is shorter. A ratio of two terms cancels the binomial coefficients when they are symmetric, leaving a power of \\(\\frac qp\\); an equation like \\(P(X=3)=5P(X=4)\\) gives \\(\\frac qp\\) directly.",
      definition:
        "- \\(P(X=r)=\\binom nrp^rq^{n-r}\\), \\(q=1-p\\).\n" +
        "- \\(\\frac{P(X=r+1)}{P(X=r)}=\\frac{n-r}{r+1}\\cdot\\frac pq\\).\n" +
        "- \\(P(X=r)=P(X=s)\\) with \\(p=\\frac12\\) means \\(\\binom nr=\\binom ns\\), so \\(n=r+s\\).\n" +
        "- At least one: \\(1-q^n\\).",
      formula: {
        label: "Binomial probability",
        latex: "P(X=r)=\\binom nr\\,p^{r}q^{\\,n-r}",
      },
      authoredExample: {
        prompt: "A fair coin is tossed 6 times. Find the probability of at least 5 heads.",
        steps: [
          "\\(\\frac{\\binom65+\\binom66}{2^6}=\\frac{7}{64}\\).",
        ],
        answer: "\\(\\frac{7}{64}\\).",
      },
      selfCheckExample: {
        prompt: "In \\(B(4,p)\\), \\(P(X=1)=P(X=2)\\). Find \\(p\\).",
        steps: [
          "\\(4pq^3=6p^2q^2\\Rightarrow2q=3p\\).",
        ],
        answer: "\\(p=\\frac25\\).",
      },
      practiceSet: [
        { prompt: "\\(P(X=0)\\) in \\(B(5,\\frac13)\\)?", answer: "\\(\\frac{32}{243}\\)" },
        { prompt: "\\(P(X=7)=P(X=9)\\) for a fair coin: \\(n\\)?", answer: "\\(16\\)" },
        { prompt: "At least one six in 3 throws?", answer: "\\(1-\\left(\\frac56\\right)^3\\)" },
        { prompt: "\\(\\frac{P(X=2)}{P(X=1)}\\) in \\(B(5,p)\\)?", answer: "\\(2\\cdot\\frac pq\\)" },
      ],
      pyqExampleId: "66ed886c-d8d2-4eba-90b3-ed6b1dfb675a", // 2023 — pair of dice thrown 5 times, sum 5 a success
      traps: [
        {
          title: "Identify the trial and its p",
          body: "When a pair of dice is thrown, one throw of the pair is one trial; its success probability comes from counting outcomes of the pair (sum 5 has probability \\(\\frac19\\)), not from one die.",
        },
      ],
    },

    // C2 — mean and variance
    {
      kind: "formula" as const,
      slug: "jprob-binomial-moments",
      name: "Recovering n and p from the mean and variance",
      intuition:
        "Mean \\(np\\) and variance \\(npq\\) give \\(q\\) as their ratio: \\(q=\\frac{\\text{variance}}{\\text{mean}}\\). If their sum and product are given instead, they are the roots of a quadratic; the larger root is the mean, since \\(q<1\\). Then \\(p=1-q\\) and \\(n=\\frac{\\text{mean}}p\\).",
      definition:
        "- Mean \\(np\\), variance \\(npq\\), so \\(q=\\frac{npq}{np}\\).\n" +
        "- Mean \\(-\\) variance \\(=np^2\\).\n" +
        "- Sum \\(S\\) and product \\(P\\) given: mean and variance are the roots of \\(t^2-St+P=0\\), mean the larger.\n" +
        "- Then compute the requested probability with the recovered \\(n,p\\).",
      formula: {
        label: "Moments",
        latex: "E(X)=np,\\qquad\\operatorname{Var}(X)=npq",
      },
      authoredExample: {
        prompt: "A binomial variable has mean 6 and variance 4. Find \\(n\\) and \\(p\\).",
        steps: [
          "\\(q=\\frac46=\\frac23\\), \\(p=\\frac13\\), \\(n=\\frac{6}{1/3}\\).",
        ],
        answer: "\\(n=18,\\ p=\\frac13\\).",
      },
      selfCheckExample: {
        prompt: "The mean and variance of a binomial variable add to 15 and multiply to 50. Find \\(n\\).",
        steps: [
          "Roots of \\(t^2-15t+50=0\\): 10 and 5. Mean 10, variance 5, so \\(q=\\frac12\\).",
        ],
        answer: "\\(n=20\\).",
      },
      practiceSet: [
        { prompt: "Mean 4, variance 3: \\(q\\)?", answer: "\\(\\frac34\\)" },
        { prompt: "Can the variance exceed the mean?", answer: "No" },
        { prompt: "\\(B(10,\\frac12)\\): variance?", answer: "\\(\\frac52\\)" },
        { prompt: "Mean minus variance for \\(B(n,p)\\)?", answer: "\\(np^2\\)" },
      ],
      pyqExampleId: "886953a0-669b-401c-a0b2-8c8143b95de6", // 2022 — mean 4, variance 4/3, find 54 P(X <= 2)
      traps: [
        {
          title: "The mean is the larger root",
          body: "Since \\(q<1\\), the variance is less than the mean. When the two come from a quadratic, assigning the smaller root to the mean gives \\(q>1\\), which is impossible.",
        },
      ],
    },
  ],
};
