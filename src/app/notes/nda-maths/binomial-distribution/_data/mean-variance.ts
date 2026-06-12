import type { SubtopicNote } from "@/app/notes/_types";

export const MEAN_VARIANCE_NOTE: SubtopicNote = {
  subtopicName: "Mean, Variance, and Parameter Estimation in B(n, p)",
  title: "Mean, Variance, and Recovering the Parameters",
  oneLineDefinition:
    "B(n, p) has mean np and variance npq, and most PYQs run this backwards — given the mean and variance, recover n and p.",
  whyItMatters:
    "The other 15 PYQs live here, and they are remarkably formulaic: two facts, mean = np and variance = npq, generate almost every question. " +
    "The signature move is the back-solve — divide variance by mean to get q, then read off p and n. " +
    "A second family gives you a relation between two probabilities (like 9·P(X=4) = P(X=2)) and asks for p. Both reduce to one or two lines once you know the pattern.",
  concepts: [
    // 1 — why np and npq (foundation, no PYQ)
    {
      kind: "formula" as const,
      slug: "why-np-npq",
      name: "Why the Mean Is np and the Variance npq",
      intuition:
        "Think of \\(X\\) as a sum of \\(n\\) one-or-zero scores, one per trial. Each trial contributes an average of \\(p\\) and the contributions add up; because the trials are independent, their variances add too.",
      definition:
        "Write \\(X = I_1 + I_2 + \\dots + I_n\\), where \\(I_j = 1\\) on success and \\(0\\) on failure.\n" +
        "- One trial: mean \\(= p\\), variance \\(= pq\\).\n" +
        "- Means always add: \\(E(X) = np\\).\n" +
        "- Variances add for INDEPENDENT trials: \\(\\operatorname{Var}(X) = npq\\).\n" +
        "That independence is exactly why the binomial conditions matter — drop it and the variance formula breaks.",
      formula: {
        label: "Mean and variance of one trial",
        latex: "E(I) = p, \\qquad \\operatorname{Var}(I) = pq",
      },
      authoredExample: {
        prompt:
          "Use the single-trial values to write the mean and variance of \\(B(n, p)\\).",
        steps: [
          "Each of the \\(n\\) trials contributes mean \\(p\\); means add, so \\(E(X) = np\\).",
          "Each contributes variance \\(pq\\); for independent trials variances add, so \\(\\operatorname{Var}(X) = npq\\).",
        ],
        answer: "\\(E(X) = np,\\ \\operatorname{Var}(X) = npq\\)",
      },
    },

    // 2 — mean / variance / sd (PYQ 07aae3d6) + mean-spread viz
    {
      kind: "formula" as const,
      slug: "mean-variance-sd",
      name: "Mean, Variance, and Standard Deviation",
      pyqExampleId: "07aae3d6-64a4-44ae-93ea-a467413668fa",
      visualizationSlug: "binomial-mean-spread",
      intuition:
        "Given \\(n\\) and \\(p\\), the three summary numbers drop straight out. Standard deviation is just the square root of the variance — and the variance is always smaller than the mean.",
      definition:
        "For \\(X \\sim B(n, p)\\) with \\(q = 1 - p\\):\n" +
        "- **Mean:** \\(\\mu = np\\).\n" +
        "- **Variance:** \\(\\sigma^2 = npq\\).\n" +
        "- **Standard deviation:** \\(\\sigma = \\sqrt{npq}\\).\n" +
        "A built-in check: since \\(q < 1\\), the variance \\(npq\\) is always **less than** the mean \\(np\\). If a computed variance exceeds the mean, something is wrong.",
      formula: {
        label: "The three summary measures",
        latex: "\\mu = np, \\qquad \\sigma^2 = npq, \\qquad \\sigma = \\sqrt{npq}",
      },
      authoredExample: {
        prompt:
          "A fair coin is tossed 12 times. Find the mean, variance, and standard deviation of the number of heads.",
        steps: [
          "\\(n = 12\\), \\(p = \\tfrac12\\), \\(q = \\tfrac12\\).",
          "\\(\\mu = np = 12 \\cdot \\tfrac12 = 6\\).",
          "\\(\\sigma^2 = npq = 12 \\cdot \\tfrac12 \\cdot \\tfrac12 = 3\\), so \\(\\sigma = \\sqrt{3}\\).",
        ],
        answer: "\\(\\mu = 6,\\ \\sigma^2 = 3,\\ \\sigma = \\sqrt{3}\\)",
      },
      traps: [
        {
          title: "Standard deviation is √(npq), not npq",
          body:
            "Questions love to give the standard deviation and call it the variance, or vice versa. Square the SD to get the variance before using \\(\\sigma^2 = npq\\) — e.g. SD \\(= \\sqrt2\\) means variance \\(= 2\\).",
        },
      ],
    },

    // 3 — recovering n and p (PYQ ba5454bf)
    {
      kind: "formula" as const,
      slug: "recovering-n-and-p",
      name: "Recovering n and p from the Moments",
      pyqExampleId: "ba5454bf-a538-4822-902f-98eeacc23825",
      intuition:
        "Given the mean and the variance, dividing one by the other cancels \\(np\\) and hands you \\(q\\) directly. From \\(q\\) you get \\(p\\), and from the mean you get \\(n\\).",
      definition:
        "The standard back-solve:\n" +
        "\\[\\frac{\\operatorname{Var}(X)}{E(X)} = \\frac{npq}{np} = q.\\]\n" +
        "- Step 1: \\(q = \\dfrac{\\text{variance}}{\\text{mean}}\\), then \\(p = 1 - q\\).\n" +
        "- Step 2: \\(n = \\dfrac{\\text{mean}}{p}\\).\n" +
        "If you are handed the standard deviation, square it to the variance first.",
      formula: {
        label: "Divide variance by mean to get q",
        latex: "q = \\dfrac{\\sigma^2}{\\mu} = \\dfrac{npq}{np}",
      },
      authoredExample: {
        prompt:
          "A binomial distribution has mean 8 and standard deviation 2. Find n and p.",
        steps: [
          "Variance \\(= \\sigma^2 = 2^2 = 4\\); mean \\(= 8\\).",
          "\\(q = \\dfrac{4}{8} = \\tfrac12\\), so \\(p = \\tfrac12\\).",
          "\\(n = \\dfrac{\\text{mean}}{p} = \\dfrac{8}{1/2} = 16\\).",
        ],
        answer: "\\(n = 16,\\ p = \\tfrac12\\)",
      },
      selfCheckExample: {
        prompt:
          "In \\(B(n, p)\\) the mean is \\(\\tfrac23\\) and the variance is \\(\\tfrac59\\). Find \\(P(X = 2)\\).",
        steps: [
          "\\(q = \\dfrac{5/9}{2/3} = \\dfrac{5}{6}\\), so \\(p = \\tfrac16\\).",
          "\\(n = \\dfrac{2/3}{1/6} = 4\\).",
          "\\(P(X = 2) = \\binom{4}{2}\\left(\\tfrac16\\right)^2\\left(\\tfrac56\\right)^2 = 6 \\cdot \\dfrac{1}{36}\\cdot\\dfrac{25}{36} = \\dfrac{25}{216}\\).",
        ],
        answer: "\\(\\dfrac{25}{216}\\)",
      },
      practiceSet: [
        {
          prompt: "Mean 200, variance 160. Find n.",
          answer: "\\(n = 1000\\)",
          method: "\\(q = 160/200 = \\tfrac45,\\ p = \\tfrac15,\\ n = 200/p\\).",
        },
        {
          prompt: "Mean 6, SD \\(\\sqrt2\\). Find n and p.",
          answer: "\\(n = 9,\\ p = \\tfrac23\\)",
          method: "Variance 2, \\(q = 2/6 = \\tfrac13\\).",
        },
      ],
      traps: [
        {
          title: "Variance over mean gives q, not p",
          body:
            "The ratio \\(\\sigma^2/\\mu = q\\) (the FAILURE probability). Forgetting the final \\(p = 1 - q\\) step lands you on the complement and the wrong \\(n\\).",
        },
      ],
    },

    // 4 — relation between mean and variance (PYQ e0d3e485)
    {
      kind: "formula" as const,
      slug: "mean-variance-relation",
      name: "When You Are Given a Relation, Not the Values",
      pyqExampleId: "e0d3e485-41ad-4282-8164-9c1f6b7c9e60",
      intuition:
        "Sometimes the question gives a relationship like 'the mean is three times the variance' instead of numbers. Substituting \\(np\\) and \\(npq\\) into the relation still collapses to a single equation in \\(q\\).",
      definition:
        "Replace the words with \\(\\mu = np\\) and \\(\\sigma^2 = npq\\), then cancel the common \\(np\\):\n" +
        "\\[\\mu = c\\,\\sigma^2 \\ \\Longrightarrow\\ np = c\\,(npq) \\ \\Longrightarrow\\ 1 = cq \\ \\Longrightarrow\\ q = \\tfrac1c.\\]\n" +
        "So 'mean \\(= c \\times\\) variance' gives \\(q = \\tfrac1c\\) immediately. With \\(p\\) known you can then find any probability, given \\(n\\).",
      formula: {
        label: "Mean equals c times variance",
        latex: "np = c\\,(npq) \\ \\Longrightarrow\\ q = \\dfrac{1}{c}",
      },
      authoredExample: {
        prompt:
          "In a binomial distribution the mean is 4 times the variance. Find p.",
        steps: [
          "\\(np = 4(npq)\\); cancel \\(np\\): \\(1 = 4q\\).",
          "\\(q = \\tfrac14\\), so \\(p = 1 - \\tfrac14 = \\tfrac34\\).",
        ],
        answer: "\\(p = \\tfrac34\\)",
      },
      practiceSet: [
        {
          prompt: "In a binomial distribution the mean is twice the variance. Find p.",
          answer: "\\(p = \\tfrac12\\)",
          method: "\\(np = 2(npq) \\Rightarrow q = \\tfrac12 \\Rightarrow p = \\tfrac12\\)",
        },
        {
          prompt: "For a binomial variable the mean is 3 times the variance. Find q.",
          answer: "\\(q = \\tfrac13\\)",
          method: "\\(1 = 3q \\Rightarrow q = \\tfrac13\\)",
        },
      ],
      traps: [
        {
          title: "Cancel np, do not cancel the wrong factor",
          body:
            "From \\(np = c\\,npq\\), the surviving factor is \\(q\\) (giving \\(q = 1/c\\)). Cancelling to leave \\(p\\) instead — a common slip — inverts the answer.",
        },
      ],
    },

    // 5 — parameter from a probability equation (PYQ 9f2565d7) — hosts set S24
    {
      kind: "formula" as const,
      slug: "parameter-from-probability-equation",
      name: "Finding p from a Probability Equation",
      pyqExampleId: "9f2565d7-c4f0-4c3f-b3fb-3ca3ff1e8f08",
      intuition:
        "When two binomial probabilities are set equal (or in a fixed ratio), the messy parts cancel. Write both with the formula, divide, and a clean equation in \\(p\\) survives.",
      definition:
        "Given a relation between \\(P(X = a)\\) and \\(P(X = b)\\), write each as \\(\\binom{n}{k}p^k q^{\\,n-k}\\) and take the ratio so common powers cancel. Two handles make this fast:\n" +
        "- Binomial coefficients are symmetric: \\(\\binom{n}{a} = \\binom{n}{n-a}\\) (e.g. \\(\\binom{6}{4} = \\binom{6}{2}\\)), so they often cancel outright.\n" +
        "- A ratio \\(\\dfrac{P(X=b)}{P(X=a)}\\) reduces to powers of \\(p\\) and \\(q\\) only.\n" +
        "Solve the resulting equation (take the positive root, since \\(0 < p < 1\\)).",
      formula: {
        label: "Ratio of two probabilities",
        latex:
          "\\dfrac{P(X=b)}{P(X=a)} = \\dfrac{\\binom{n}{b}}{\\binom{n}{a}}\\, p^{\\,b-a}\\, q^{\\,a-b}",
      },
      authoredExample: {
        prompt: "For \\(X \\sim B(5, p)\\), \\(P(X = 2) = P(X = 3)\\). Find p.",
        steps: [
          "\\(\\binom{5}{2}p^2 q^3 = \\binom{5}{3}p^3 q^2\\); since \\(\\binom{5}{2} = \\binom{5}{3} = 10\\), they cancel.",
          "\\(q^3 \\,/\\, q^2 = p^3 \\,/\\, p^2\\) gives \\(q = p\\).",
          "With \\(p + q = 1\\) and \\(p = q\\): \\(p = \\tfrac12\\).",
        ],
        answer: "\\(p = \\tfrac12\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(X \\sim B(4, p)\\), \\(P(X = 1) = P(X = 2)\\). Find p.",
        steps: [
          "\\(\\binom{4}{1}p\\,q^3 = \\binom{4}{2}p^2 q^2\\), i.e. \\(4pq^3 = 6p^2 q^2\\).",
          "Divide by \\(pq^2\\): \\(4q = 6p\\), so \\(2q = 3p\\), i.e. \\(2(1-p) = 3p\\).",
          "\\(2 = 5p\\), giving \\(p = \\tfrac25\\).",
        ],
        answer: "\\(p = \\tfrac25\\)",
      },
      traps: [
        {
          title: "Use coefficient symmetry before brute force",
          body:
            "Spotting \\(\\binom{6}{4} = \\binom{6}{2}\\) cancels the coefficients in one step. Expanding them numerically still works but invites arithmetic slips — and forgetting to take the positive root of \\(9p^2 = (1-p)^2\\) loses the intended answer.",
        },
      ],
    },

    // 6 — variance invariance under complement (PYQ 925d57f9)
    {
      kind: "formula" as const,
      slug: "variance-invariance-complement",
      name: "Variance Is Unchanged by Y = n − X",
      pyqExampleId: "925d57f9-99d0-4b72-9445-7519f5cf00c6",
      intuition:
        "Counting failures instead of successes (\\(Y = n - X\\)) is the same distribution with \\(p\\) and \\(q\\) swapped — and since variance is \\(npq\\), swapping \\(p\\) and \\(q\\) leaves it untouched.",
      definition:
        "If \\(X \\sim B(n, p)\\) and \\(Y = n - X\\) (so \\(Y \\sim B(n, q)\\)):\n" +
        "- Variance is symmetric in \\(p, q\\): \\(\\operatorname{Var}(Y) = n q p = npq = \\operatorname{Var}(X)\\).\n" +
        "- The means are complementary: \\(E(Y) = nq = n - np\\).\n" +
        "So whenever \\(X + Y = n\\) with \\(X\\) binomial, \\(\\operatorname{Var}(Y) = \\operatorname{Var}(X)\\) — no recomputation needed.",
      formula: {
        label: "Variance survives the swap",
        latex: "\\operatorname{Var}(n - X) = npq = \\operatorname{Var}(X)",
      },
      authoredExample: {
        prompt:
          "\\(X \\sim B(50, \\tfrac35)\\) and \\(Y = 50 - X\\). Find \\(\\operatorname{Var}(Y)\\).",
        steps: [
          "\\(\\operatorname{Var}(Y) = \\operatorname{Var}(X) = npq = 50 \\cdot \\tfrac35 \\cdot \\tfrac25\\).",
          "\\(= 50 \\cdot \\dfrac{6}{25} = 12\\).",
        ],
        answer: "\\(\\operatorname{Var}(Y) = 12\\)",
      },
      traps: [
        {
          title: "Variance does not flip; the mean does",
          body:
            "\\(Y = n - X\\) leaves the variance equal to \\(\\operatorname{Var}(X)\\), but its mean becomes \\(n - np\\). Do not 'adjust' the variance for the swap — only the mean changes.",
        },
      ],
    },

    // 7 — symmetric case, mean = n/2 (PYQ af89b155)
    {
      kind: "formula" as const,
      slug: "mean-of-symmetric-binomial",
      name: "The Symmetric Case: Mean = n/2 when p = ½",
      pyqExampleId: "af89b155-fa4b-4cc1-8fff-b2be3b7aa075",
      intuition:
        "When success and failure are equally likely, the distribution is symmetric and balances exactly in the middle, at \\(n/2\\). A distribution whose frequencies are the binomial coefficients is precisely this case.",
      definition:
        "For \\(p = \\tfrac12\\): \\(\\mu = np = \\tfrac{n}{2}\\) and \\(\\sigma^2 = npq = \\tfrac{n}{4}\\).\n" +
        "A variable taking values \\(0, 1, \\dots, n\\) with frequencies \\(\\binom{n}{0}, \\binom{n}{1}, \\dots, \\binom{n}{n}\\) has total frequency \\(2^n\\) and mean\n" +
        "\\[\\frac{\\sum_{k} k\\binom{n}{k}}{\\sum_{k}\\binom{n}{k}} = \\frac{n\\,2^{\\,n-1}}{2^{n}} = \\frac{n}{2},\\]\n" +
        "the same \\(n/2\\) — because those frequencies are exactly \\(B(n, \\tfrac12)\\) up to the factor \\(2^n\\).",
      formula: {
        label: "Symmetric binomial mean",
        latex: "p = \\tfrac12 \\ \\Longrightarrow\\ \\mu = \\dfrac{n}{2}",
      },
      authoredExample: {
        prompt:
          "A fair coin is tossed 8 times. Without summing, state the mean number of heads.",
        steps: [
          "\\(p = \\tfrac12\\), so the distribution is symmetric about its centre.",
          "\\(\\mu = \\dfrac{n}{2} = \\dfrac{8}{2} = 4\\).",
        ],
        answer: "\\(\\mu = 4\\)",
      },
      traps: [
        {
          title: "Symmetry needs p = ½, not just 'two outcomes'",
          body:
            "The mean is \\(n/2\\) ONLY when \\(p = q = \\tfrac12\\). With a biased trial the peak shifts to \\(np\\) — do not default to \\(n/2\\) unless success and failure are equally likely.",
        },
      ],
    },
  ],
};
