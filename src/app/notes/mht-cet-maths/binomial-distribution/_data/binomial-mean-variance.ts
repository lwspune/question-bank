import type { SubtopicNote } from "@/app/notes/_types";

export const BINOMIAL_MEAN_VARIANCE_NOTE: SubtopicNote = {
  subtopicName: "Mean, Variance and Standard Deviation of a Binomial Variable",
  title: "Mean, Variance and Standard Deviation of a Binomial Variable",
  oneLineDefinition:
    "For X ~ B(n, p) you never build the distribution table — the mean is np, the variance is npq, and the standard deviation is √(npq); these three shortcuts answer almost every MHT-CET question on the topic.",
  whyItMatters:
    "This subtopic is pure formula-recall turned into arithmetic: 15 PYQs sit here (8 EASY, 5 MODERATE, 2 HARD). The EASY band is direct np or npq once you read n and p off a with-replacement or coin-toss setup; the MODERATE and HARD bands reverse the process — given the mean and the variance you recover n and p, then compute a tail probability like P(X ≥ 1). " +
    "The single most reliable check across every question is that the variance npq is always LESS than the mean np (because q < 1) — an answer with variance ≥ mean is wrong on sight.",
  concepts: [
    // 0 — foundation: mean = np (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetbd-mean-np",
      name: "The Mean of a Binomial Variable is np",
      intuition:
        "If a single trial succeeds with probability p, then over n independent trials you expect a fraction p of them to succeed — so the average number of successes is simply n times p. No distribution table is needed: the mean of X ~ B(n, p) is np, full stop.",
      definition:
        "For a binomial variable \\(X \\sim B(n, p)\\) with \\(q = 1 - p\\):\n" +
        "- **Mean (expected value):** \\(\\mu = E(X) = np\\).\n" +
        "- This is the number of trials times the single-trial success probability — it needs no summation, no \\(P(X=r)\\) table.\n" +
        "- The mean is the balance point of the distribution: for \\(B(n, \\tfrac12)\\) it sits at the centre \\(\\tfrac{n}{2}\\).",
      formula: {
        label: "Mean of a binomial variable",
        latex: "\\mu = E(X) = np",
        symbols: [
          { symbol: "n", meaning: "number of independent trials" },
          { symbol: "p", meaning: "probability of success on a single trial" },
          { symbol: "q", meaning: "probability of failure, q = 1 − p" },
        ],
      },
      authoredExample: {
        prompt:
          "A biased coin with \\(P(\\text{head}) = \\tfrac{1}{3}\\) is tossed 9 times. Find the expected number of heads.",
        steps: [
          "This is \\(X \\sim B(n, p)\\) with \\(n = 9\\), \\(p = \\tfrac13\\).",
          "Mean \\(= np = 9 \\times \\tfrac13\\).",
          "So \\(\\mu = 3\\).",
        ],
        answer: "\\(\\mu = 3\\) heads",
      },
      practiceSet: [
        { prompt: "Give the mean of \\(X \\sim B(20, 0.1)\\).", answer: "\\(\\mu = np = 2\\)" },
        { prompt: "A die is rolled 12 times; X = number of sixes. Find the mean.", answer: "\\(\\mu = 12 \\times \\tfrac16 = 2\\)", method: "\\(p = \\tfrac16\\)" },
        { prompt: "For \\(B(n, \\tfrac12)\\), where does the mean sit?", answer: "At the centre, \\(\\tfrac{n}{2}\\)" },
        { prompt: "State the mean of a binomial variable in words.", answer: "Number of trials times single-trial success probability, \\(np\\)" },
      ],
      traps: [
        {
          title: "The mean is np, never p or p^n",
          body:
            "For \\(X \\sim B(n, p)\\) the mean is \\(np\\) — the trial count multiplied by the success probability. Writing the mean as \\(p\\) alone, or as \\(p^n\\), or as \\(\\tfrac{p}{n}\\), are the standard distractors. With \\(n = 2\\), \\(p = \\tfrac1{13}\\) the mean is \\(\\tfrac{2}{13}\\), NOT \\(\\tfrac{1}{169} = p^2\\).",
        },
        {
          title: "'With replacement' is what makes the trials binomial",
          body:
            "Drawing cards WITH replacement keeps \\(p\\) constant across draws, so \\(X\\) is binomial and the mean is \\(np\\). WITHOUT replacement the trials are dependent (hypergeometric) and \\(np\\) no longer applies. Read the words 'with replacement' before using the shortcut.",
        },
      ],
    },

    // 1 — variance = npq, SD = √(npq) (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-variance-npq",
      name: "Variance is npq and Standard Deviation is the Square Root of npq",
      intuition:
        "Spread accumulates across trials the same way the mean does: each of the n trials contributes pq to the variance, so the total variance is npq. The standard deviation is just its square root, √(npq). Because q is a probability less than 1, the variance npq is always smaller than the mean np.",
      definition:
        "For \\(X \\sim B(n, p)\\) with \\(q = 1 - p\\):\n" +
        "- **Variance:** \\(\\sigma^2 = \\operatorname{Var}(X) = npq\\).\n" +
        "- **Standard deviation:** \\(\\sigma = \\sqrt{npq}\\).\n" +
        "- **Key inequality:** since \\(0 < q < 1\\), we always have \\(npq < np\\), i.e. **variance is always less than the mean** for a binomial variable.\n" +
        "You can also get the variance the long way via \\(\\operatorname{Var}(X) = E(X^2) - [E(X)]^2\\), but for a genuine binomial \\(npq\\) is far faster.",
      formula: {
        label: "Variance and standard deviation of a binomial variable",
        latex:
          "\\sigma^2 = npq,\\qquad \\sigma = \\sqrt{npq},\\qquad npq < np",
        symbols: [
          { symbol: "n", meaning: "number of independent trials" },
          { symbol: "p", meaning: "success probability, q = 1 − p" },
          { symbol: "npq", meaning: "the variance — always less than the mean np" },
        ],
      },
      authoredExample: {
        prompt:
          "A fair die is rolled 18 times. If X is the number of times a multiple of 3 appears, find the variance and standard deviation of X.",
        steps: [
          "A multiple of 3 on a die is \\(\\{3, 6\\}\\), so \\(p = \\tfrac26 = \\tfrac13\\), \\(q = \\tfrac23\\), \\(n = 18\\).",
          "Variance \\(= npq = 18 \\times \\tfrac13 \\times \\tfrac23 = 4\\).",
          "Standard deviation \\(= \\sqrt{npq} = \\sqrt{4} = 2\\).",
          "Check: mean \\(= np = 6\\), and variance \\(4 < 6\\), as required.",
        ],
        answer: "\\(\\sigma^2 = 4,\\ \\sigma = 2\\)",
      },
      selfCheckExample: {
        prompt:
          "A bag holds 8 red and 12 white balls. A ball is drawn, its colour noted, and replaced; this is done 25 times. Find the variance of the number of red balls drawn.",
        steps: [
          "With replacement so \\(p = \\tfrac{8}{20} = \\tfrac25\\), \\(q = \\tfrac35\\), \\(n = 25\\).",
          "Variance \\(= npq = 25 \\times \\tfrac25 \\times \\tfrac35\\).",
          "\\(= 25 \\times \\tfrac{6}{25} = 6\\).",
        ],
        answer: "\\(\\sigma^2 = 6\\)",
      },
      practiceSet: [
        { prompt: "Find the variance of \\(X \\sim B(3, \\tfrac12)\\).", answer: "\\(npq = 3 \\times \\tfrac12 \\times \\tfrac12 = 0.75\\)" },
        { prompt: "Find the SD of \\(X \\sim B(100, 0.5)\\).", answer: "\\(\\sqrt{100 \\times 0.5 \\times 0.5} = 5\\)", method: "\\(\\sigma = \\sqrt{npq}\\)" },
        { prompt: "For \\(B(4, \\tfrac12)\\), state the mean and variance.", answer: "Mean \\(= 2\\), variance \\(= 1\\)", method: "\\(np\\) and \\(npq\\)" },
        { prompt: "Can a binomial variable have mean 3 and variance 4?", answer: "No — variance npq is always less than the mean np" },
      ],
      pyqExampleId: "881459e6-c140-42a5-bf15-61c85519abae", // 15 green/10 yellow, 10 draws with replacement → Var green = npq = 12/5
      visualizationSlug: "binomial-mean-spread",
      traps: [
        {
          title: "Variance is npq, not np or npq^2",
          body:
            "The variance of \\(X \\sim B(n, p)\\) is \\(npq\\) — the mean \\(np\\) multiplied by \\(q\\). Forgetting the extra factor of \\(q\\) (using \\(np\\)) or over-counting it (using \\(npq^2\\) or \\(np^2q\\)) are the classic slips. For \\(B(10, \\tfrac35)\\): variance \\(= 10 \\cdot \\tfrac35 \\cdot \\tfrac25 = \\tfrac{12}{5}\\), not \\(6 = np\\).",
        },
        {
          title: "Variance is always smaller than the mean for a binomial variable",
          body:
            "Since \\(q = 1 - p < 1\\), \\(npq < np\\) — the variance can never equal or exceed the mean. Any option pairing (mean 2, variance 4) or (mean 2, variance 5) is impossible for a binomial variable and can be eliminated instantly; the only consistent partner of mean 2 with \\(p = \\tfrac12\\) is variance 1.",
        },
        {
          title: "SD is the square root of the variance, not of npq-then-forgotten",
          body:
            "Standard deviation is \\(\\sigma = \\sqrt{npq}\\). After computing the variance \\(npq\\), take its square root: for variance 4 the SD is 2, for variance 25 the SD is 5. Reporting the variance where the SD is asked (or vice versa) loses an otherwise-correct problem.",
        },
      ],
    },

    // 2 — recover n and p from mean and variance (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-recover-n-p",
      name: "Recovering n and p from the Mean and Variance",
      intuition:
        "The mean np and the variance npq share the common factor np, so dividing the variance by the mean isolates q in a single step. Once you have q you have p = 1 − q, and then n = mean ÷ p. This unlocks any follow-up, because knowing n and p reconstructs the whole distribution.",
      definition:
        "Given a binomial's mean and variance, recover the parameters:\n" +
        "- **Divide variance by mean:** \\(\\dfrac{npq}{np} = q\\), so \\(q = \\dfrac{\\text{variance}}{\\text{mean}}\\).\n" +
        "- **Then** \\(p = 1 - q\\) and \\(n = \\dfrac{\\text{mean}}{p}\\).\n" +
        "- With \\(n\\) and \\(p\\) known you can compute any probability, e.g. \\(P(X = 0) = q^n\\), \\(P(X \\ge 1) = 1 - q^n\\), or a lower tail \\(P(X \\le r) = \\sum_{k=0}^{r} {}^{n}C_{k}\\,p^{k}q^{n-k}\\).",
      formula: {
        label: "Recover q, then p and n",
        latex:
          "q = \\dfrac{\\sigma^2}{\\mu} = \\dfrac{npq}{np},\\qquad p = 1 - q,\\qquad n = \\dfrac{\\mu}{p}",
      },
      authoredExample: {
        prompt:
          "A binomial variable X has mean 6 and variance 2. Find n and p, and hence \\(P(X = 0)\\).",
        steps: [
          "Divide: \\(q = \\dfrac{\\sigma^2}{\\mu} = \\dfrac{2}{6} = \\tfrac13\\).",
          "So \\(p = 1 - q = \\tfrac23\\).",
          "And \\(n = \\dfrac{\\mu}{p} = \\dfrac{6}{2/3} = 9\\).",
          "Then \\(P(X = 0) = q^{n} = \\left(\\tfrac13\\right)^{9} = \\dfrac{1}{19683}\\).",
        ],
        answer: "\\(n = 9,\\ p = \\tfrac23,\\ P(X=0) = \\dfrac{1}{3^{9}}\\)",
      },
      selfCheckExample: {
        prompt:
          "The mean and variance of a binomial variable X are 4 and 3 respectively. Find n, p, and \\(P(X \\ge 1)\\).",
        steps: [
          "\\(q = \\dfrac{\\sigma^2}{\\mu} = \\dfrac{3}{4}\\), so \\(p = \\tfrac14\\).",
          "\\(n = \\dfrac{\\mu}{p} = \\dfrac{4}{1/4} = 16\\).",
          "\\(P(X \\ge 1) = 1 - P(X = 0) = 1 - q^{n} = 1 - \\left(\\tfrac34\\right)^{16}\\).",
        ],
        answer: "\\(n = 16,\\ p = \\tfrac14,\\ P(X \\ge 1) = 1 - \\left(\\tfrac34\\right)^{16}\\)",
      },
      practiceSet: [
        { prompt: "Mean 8, variance 4: find q.", answer: "\\(q = \\tfrac{4}{8} = \\tfrac12\\)", method: "variance ÷ mean" },
        { prompt: "Mean 8, variance 4: find n.", answer: "\\(p = \\tfrac12,\\ n = \\tfrac{8}{1/2} = 16\\)" },
        { prompt: "Mean 2, variance 1: find n and p.", answer: "\\(q = \\tfrac12,\\ p = \\tfrac12,\\ n = 4\\)" },
        { prompt: "For \\(B(4, \\tfrac12)\\), evaluate \\(P(X \\ge 1)\\).", answer: "\\(1 - \\left(\\tfrac12\\right)^4 = \\tfrac{15}{16}\\)", method: "\\(1 - q^n\\)" },
      ],
      pyqExampleId: "b3566cd5-b3c3-4746-ac59-76fb6ef25b95", // mean 2 var 1 → n=4, P(X≥1)=15/16
      visualizationSlug: "binomial-tail-shading",
      traps: [
        {
          title: "Divide variance by mean to get q — not p",
          body:
            "\\(\\dfrac{\\text{variance}}{\\text{mean}} = \\dfrac{npq}{np} = q\\), the FAILURE probability. Then \\(p = 1 - q\\). Reading the quotient as \\(p\\) directly swaps the roles and (unless \\(p = q = \\tfrac12\\)) gives the wrong \\(n\\). For mean 8, variance 4: \\(q = \\tfrac12\\), \\(p = \\tfrac12\\), \\(n = 16\\).",
        },
        {
          title: "P(X = 0) is q^n, and P(X ≥ 1) = 1 − q^n",
          body:
            "The zero-success probability uses the FAILURE probability raised to the trial count: \\(P(X=0) = q^{n}\\), so \\(P(X \\ge 1) = 1 - q^{n}\\). For \\(B(4, \\tfrac12)\\), \\(P(X \\ge 1) = 1 - \\left(\\tfrac12\\right)^4 = \\tfrac{15}{16}\\). Using \\(p^{n}\\) by mistake computes the all-success probability instead.",
        },
        {
          title: "For a lower tail sum the terms up to r, then divide by 2^n only if p = 1/2",
          body:
            "\\(P(X \\le 2) = {}^{n}C_0 + {}^{n}C_1 + {}^{n}C_2\\) each times \\(p^{k}q^{n-k}\\). When \\(p = q = \\tfrac12\\) every term shares \\(\\left(\\tfrac12\\right)^{n}\\), so \\(P(X \\le 2) = \\dfrac{{}^{n}C_0 + {}^{n}C_1 + {}^{n}C_2}{2^{n}}\\). For \\(n = 16\\): \\(\\dfrac{1 + 16 + 120}{2^{16}} = \\dfrac{137}{2^{16}}\\).",
        },
      ],
    },

    // 3 — sum/combination conditions on mean and variance (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-sum-mean-variance",
      name: "Solving When the Mean and Variance are Combined into One Equation",
      intuition:
        "Some questions do not hand you the mean and variance separately — instead they give a combination such as 'mean + variance = value' for a stated number of trials. Substitute np and npq into that equation and it becomes a single equation in p (with q = 1 − p), often a neat quadratic you solve and then reject the impossible root.",
      definition:
        "When the data is a combination of mean and variance for a known n:\n" +
        "- Write **mean \\(= np\\)** and **variance \\(= npq = np(1-p)\\)**, with the given \\(n\\) substituted in.\n" +
        "- **Sum condition:** \\(np + npq = np(1 + q)\\); replace \\(q = 1 - p\\) and solve.\n" +
        "- The result is an equation in \\(p\\) alone (frequently a quadratic). **Reject any root with \\(p > 1\\) or \\(p < 0\\)** — a probability must lie in \\([0, 1]\\).\n" +
        "- Once \\(p\\) is fixed, back-substitute to report whichever quantity is asked (the variance, \\(p\\), etc.).",
      formula: {
        label: "Sum of mean and variance",
        latex:
          "np + npq = np(1 + q) = np(2 - p)",
      },
      authoredExample: {
        prompt:
          "For a binomial distribution with 6 trials, the sum of the mean and the variance is \\(\\dfrac{9}{2}\\). Find p and the variance.",
        steps: [
          "Mean \\(= 6p\\), variance \\(= 6p(1-p)\\), so sum \\(= 6p(2 - p) = \\tfrac92\\).",
          "Divide by 6: \\(p(2 - p) = \\tfrac{3}{4}\\), i.e. \\(2p - p^2 = \\tfrac34\\).",
          "Rearrange: \\(4p^2 - 8p + 3 = 0 \\Rightarrow (2p - 1)(2p - 3) = 0\\), so \\(p = \\tfrac12\\) (reject \\(p = \\tfrac32 > 1\\)).",
          "Variance \\(= 6 \\times \\tfrac12 \\times \\tfrac12 = \\tfrac32\\).",
        ],
        answer: "\\(p = \\tfrac12,\\ \\text{variance} = \\tfrac32\\)",
      },
      selfCheckExample: {
        prompt:
          "The sum of the mean and the variance of a binomial distribution for 4 trials is \\(\\dfrac{7}{4}\\). Find p.",
        steps: [
          "Sum \\(= 4p(2 - p) = \\tfrac74\\), so \\(p(2 - p) = \\tfrac{7}{16}\\).",
          "\\(16p^2 - 32p + 7 = 0 \\Rightarrow (4p - 1)(4p - 7) = 0\\).",
          "So \\(p = \\tfrac14\\) (reject \\(p = \\tfrac74 > 1\\)).",
        ],
        answer: "\\(p = \\tfrac14\\)",
      },
      practiceSet: [
        { prompt: "For 10 trials, mean + variance \\(= \\tfrac{15}{2}\\). Find q.", answer: "\\(q = \\tfrac12\\)", method: "\\(1 - q^2 = \\tfrac34\\)" },
        { prompt: "For 10 trials with \\(p = \\tfrac12\\), find the variance.", answer: "\\(npq = 10 \\times \\tfrac12 \\times \\tfrac12 = 2.5\\)" },
        { prompt: "Solve \\(25p^2 - 50p + 9 = 0\\) for a probability.", answer: "\\(p = \\tfrac15 = 0.2\\)", method: "reject \\(p = \\tfrac95 > 1\\)" },
        { prompt: "Why reject a root p > 1 in these problems?", answer: "p is a probability, so it must lie in [0, 1]" },
      ],
      pyqExampleId: "171e63e8-7078-4082-8adc-d4defc5cbf87", // sum of mean+variance = 15/2 for 10 trials → variance 2.5
      traps: [
        {
          title: "Substitute q = 1 − p to reduce the sum to a single-variable equation",
          body:
            "\\(np + npq = np(1 + q)\\). Do NOT treat \\(p\\) and \\(q\\) as independent — replace \\(q\\) with \\(1 - p\\) so you get one equation in \\(p\\). For 10 trials, \\(10p(1+q) = \\tfrac{15}{2}\\) becomes \\((1-q)(1+q) = \\tfrac34\\), i.e. \\(1 - q^2 = \\tfrac34\\), giving \\(q = \\tfrac12\\).",
        },
        {
          title: "Reject the root outside [0, 1]",
          body:
            "The quadratic in \\(p\\) usually has two roots and one is impossible. From \\(25p^2 - 50p + 9 = 0\\) the roots are \\(p = \\tfrac15\\) and \\(p = \\tfrac95\\); only \\(p = 0.2\\) is a valid probability. Choosing the root greater than 1 (or a negative root) is the built-in distractor.",
        },
        {
          title: "Read whether p, q, or the variance is being asked",
          body:
            "These questions sometimes ask for \\(p\\), sometimes for the variance, sometimes for \\(q\\). After solving for \\(p\\), back-substitute: for 10 trials with \\(p = \\tfrac12\\) the variance is \\(npq = 2.5\\), while the answer to 'find p' would be \\(0.5\\). Reporting the wrong quantity is the last-step slip.",
        },
      ],
    },
  ],
};
