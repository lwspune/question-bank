import type { SubtopicNote } from "@/app/notes/_types";

export const BINOMIAL_PARAMETER_NOTE: SubtopicNote = {
  subtopicName: "Parameter Estimation and the Probability Ratio",
  title: "Parameter Estimation and the Probability Ratio",
  oneLineDefinition:
    "Use the ratio of two adjacent binomial probabilities to turn a condition like P(X=a) = c·P(X=b) into a simple linear equation in p and q, and read off the unknown parameter p (or n) — the engine behind almost every 'find p' MHT-CET question.",
  whyItMatters:
    "This subtopic is a reliable single-mark scorer: 15 PYQs sit here (4 HARD, 10 MODERATE, 1 EASY). The whole subtopic runs on one idea — the successive-term ratio P(X=k)/P(X=k−1) = ((n−k+1)/k)·(p/q) — which lets the huge factorials cancel so a condition collapses to a linear relation in p and q. " +
    "The recurring shapes are always the same: a·P(X=i) = b·P(X=j) to find p, the identity ⁿCₐ = ⁿC_b ⇒ a+b = n to find n, and the most-probable value (mode). Master the cancellation once and every variant falls out.",
  concepts: [
    // 0 — FOUNDATION: PMF + the mean/variance recall (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetbd-binomial-recall",
      name: "The Binomial PMF, Mean and Variance (Recall)",
      intuition:
        "Everything on this page rests on one distribution: n independent Bernoulli trials, each a success with probability p and failure with probability q = 1 − p. The probability of exactly r successes is a single-term binomial expansion. Keep the mean np and variance npq at your fingertips — several questions finish by asking for the variance once p is known.",
      definition:
        "For \\(X \\sim B(n, p)\\) with \\(q = 1 - p\\):\n" +
        "- **Probability mass function:** \\(P(X = r) = {}^{n}C_{r}\\,p^{r}q^{n-r}\\) for \\(r = 0, 1, \\dots, n\\).\n" +
        "- **Mean:** \\(np\\); **Variance:** \\(npq\\); **Standard deviation:** \\(\\sqrt{npq}\\).\n" +
        "- Because \\(q < 1\\), the variance \\(npq\\) is always LESS than the mean \\(np\\) — a quick sanity check.",
      formula: {
        label: "PMF, mean and variance of B(n, p)",
        latex:
          "P(X=r) = {}^{n}C_{r}\\,p^{r}q^{\\,n-r},\\qquad \\text{mean} = np,\\qquad \\text{var} = npq,\\qquad \\text{SD} = \\sqrt{npq}",
        symbols: [
          { symbol: "n", meaning: "number of independent trials" },
          { symbol: "p", meaning: "probability of success on one trial" },
          { symbol: "q", meaning: "probability of failure, q = 1 − p" },
          { symbol: "r", meaning: "number of successes counted" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(X \\sim B(6, \\tfrac13)\\), write \\(P(X=2)\\) and compute the mean and variance.",
        steps: [
          "PMF: \\(P(X=2) = {}^{6}C_{2}\\left(\\tfrac13\\right)^{2}\\left(\\tfrac23\\right)^{4} = 15\\cdot\\tfrac{1}{9}\\cdot\\tfrac{16}{81} = \\dfrac{240}{729} = \\dfrac{80}{243}\\).",
          "Mean \\(= np = 6\\cdot\\tfrac13 = 2\\).",
          "Variance \\(= npq = 6\\cdot\\tfrac13\\cdot\\tfrac23 = \\tfrac43\\); note \\(\\tfrac43 < 2\\), as expected.",
        ],
        answer: "\\(P(X=2) = \\dfrac{80}{243}\\), mean \\(= 2\\), variance \\(= \\dfrac{4}{3}\\).",
      },
      practiceSet: [
        { prompt: "State \\(P(X=r)\\) for \\(X \\sim B(n,p)\\).", answer: "\\({}^{n}C_{r}\\,p^{r}q^{\\,n-r}\\)" },
        { prompt: "Mean and variance of \\(B(n,p)\\)?", answer: "Mean \\(np\\), variance \\(npq\\)" },
        { prompt: "For \\(B(10, \\tfrac13)\\), find the variance.", answer: "\\(\\dfrac{20}{9}\\)", method: "\\(npq = 10\\cdot\\tfrac13\\cdot\\tfrac23\\)" },
        { prompt: "Is the variance of a binomial ever larger than its mean?", answer: "No — variance \\(npq\\) is always less than mean \\(np\\) since \\(q<1\\)" },
      ],
      traps: [
        {
          title: "Variance is npq, not np or np·q with q = p",
          body:
            "The mean of \\(B(n,p)\\) is \\(np\\) and the variance is \\(npq\\) with \\(q = 1-p\\). Using \\(np\\) for the variance, or writing \\(q = p\\), is the classic slip. Since \\(q<1\\), variance \\(npq\\) is always strictly smaller than the mean \\(np\\).",
        },
        {
          title: "The exponent of q is n − r, not r",
          body:
            "In \\(P(X=r) = {}^{n}C_{r}\\,p^{r}q^{\\,n-r}\\), success power \\(p^{r}\\) counts the \\(r\\) successes and failure power \\(q^{\\,n-r}\\) counts the remaining \\(n-r\\) trials. Swapping the exponents (\\(p^{n-r}q^{r}\\)) flips success and failure and is a frequent distractor.",
        },
      ],
    },

    // 1 — the successive-term ratio (foundation idea → anchored, the engine)
    {
      kind: "formula" as const,
      slug: "cetbd-successive-term-ratio",
      name: "The Successive-Term Ratio of a Binomial Distribution",
      intuition:
        "Dividing P(X=k) by P(X=k−1) makes the powers of p and q drop by one each and the binomial coefficients divide down to a single fraction. The result is a compact ratio that is the engine for finding p, comparing probabilities, and locating the mode — it turns messy factorials into one clean expression.",
      definition:
        "For \\(X \\sim B(n, p)\\), take the ratio of two consecutive probabilities:\n" +
        "\\[\\frac{P(X=k)}{P(X=k-1)} = \\frac{{}^{n}C_{k}\\,p^{k}q^{\\,n-k}}{{}^{n}C_{k-1}\\,p^{k-1}q^{\\,n-k+1}} = \\frac{{}^{n}C_{k}}{{}^{n}C_{k-1}}\\cdot\\frac{p}{q}.\\]\n" +
        "The coefficient ratio simplifies to \\(\\dfrac{{}^{n}C_{k}}{{}^{n}C_{k-1}} = \\dfrac{n-k+1}{k}\\), so:\n" +
        "- The full ratio is \\(\\dfrac{P(X=k)}{P(X=k-1)} = \\dfrac{n-k+1}{k}\\cdot\\dfrac{p}{q}\\).\n" +
        "- The powers of \\(p\\) and \\(q\\) always contribute a single factor \\(\\dfrac{p}{q}\\), never a squared one — one step up in \\(k\\) means one more \\(p\\) and one fewer \\(q\\).",
      formula: {
        label: "Ratio of consecutive binomial probabilities",
        latex:
          "\\frac{P(X=k)}{P(X=k-1)} = \\frac{n-k+1}{k}\\cdot\\frac{p}{q}",
        symbols: [
          { symbol: "k", meaning: "the higher of the two success counts" },
          { symbol: "n−k+1", meaning: "the coefficient ratio numerator ⁿC_k / ⁿC_(k−1)" },
          { symbol: "p/q", meaning: "one extra success over one fewer failure" },
        ],
      },
      visualizationSlug: "binomial-coefficient-tree",
      authoredExample: {
        prompt:
          "For \\(X \\sim B(n, p)\\), simplify \\(\\dfrac{P(X=2)}{P(X=1)}\\) in terms of \\(n, p, q\\).",
        steps: [
          "Write both probabilities: \\(P(X=2) = {}^{n}C_{2}\\,p^{2}q^{\\,n-2}\\), \\(P(X=1) = {}^{n}C_{1}\\,p\\,q^{\\,n-1}\\).",
          "Divide: \\(\\dfrac{{}^{n}C_{2}}{{}^{n}C_{1}}\\cdot\\dfrac{p^{2}}{p}\\cdot\\dfrac{q^{\\,n-2}}{q^{\\,n-1}} = \\dfrac{{}^{n}C_{2}}{{}^{n}C_{1}}\\cdot\\dfrac{p}{q}\\).",
          "Coefficient ratio: \\(\\dfrac{{}^{n}C_{2}}{{}^{n}C_{1}} = \\dfrac{n(n-1)/2}{n} = \\dfrac{n-1}{2}\\).",
          "So \\(\\dfrac{P(X=2)}{P(X=1)} = \\dfrac{n-1}{2}\\cdot\\dfrac{p}{q}\\) — matching \\(\\dfrac{n-k+1}{k}\\cdot\\dfrac{p}{q}\\) at \\(k=2\\).",
        ],
        answer: "\\(\\dfrac{P(X=2)}{P(X=1)} = \\dfrac{n-1}{2}\\cdot\\dfrac{p}{q}\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(X \\sim B(n, p)\\), find \\(\\dfrac{P(X=k)}{P(X=k-1)}\\) as a single simplified expression.",
        steps: [
          "Divide the PMFs: \\(\\dfrac{{}^{n}C_{k}\\,p^{k}q^{\\,n-k}}{{}^{n}C_{k-1}\\,p^{k-1}q^{\\,n-k+1}} = \\dfrac{{}^{n}C_{k}}{{}^{n}C_{k-1}}\\cdot\\dfrac{p}{q}\\).",
          "Simplify the coefficient ratio: \\(\\dfrac{{}^{n}C_{k}}{{}^{n}C_{k-1}} = \\dfrac{n-k+1}{k}\\).",
          "Combine: \\(\\dfrac{n-k+1}{k}\\cdot\\dfrac{p}{q}\\).",
        ],
        answer: "\\(\\dfrac{P(X=k)}{P(X=k-1)} = \\dfrac{n-k+1}{k}\\cdot\\dfrac{p}{q}\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\dfrac{{}^{n}C_{k}}{{}^{n}C_{k-1}}\\).", answer: "\\(\\dfrac{n-k+1}{k}\\)", method: "expand the factorials" },
        { prompt: "State \\(\\dfrac{P(X=k)}{P(X=k-1)}\\) for \\(B(n,p)\\).", answer: "\\(\\dfrac{n-k+1}{k}\\cdot\\dfrac{p}{q}\\)" },
        { prompt: "What power of \\(p/q\\) appears in the ratio of two ADJACENT binomial probabilities?", answer: "The first power — a single factor \\(p/q\\)", method: "k rises by 1: one more p, one fewer q" },
        { prompt: "For \\(B(n,p)\\), evaluate \\(\\dfrac{P(X=1)}{P(X=0)}\\).", answer: "\\(n\\cdot\\dfrac{p}{q}\\)", method: "\\(\\tfrac{n-1+1}{1}\\cdot\\tfrac{p}{q}\\)" },
      ],
      pyqExampleId: "8322a9b7-1f78-4eda-8c03-4fe29ef41d6e", // ratio P(X=k)/P(X=k-1) = (n-k+1)/k · p/q
      traps: [
        {
          title: "The coefficient ratio is (n−k+1)/k, not (n−k)/k or (n−k+1)/(k+1)",
          body:
            "\\(\\dfrac{{}^{n}C_{k}}{{}^{n}C_{k-1}} = \\dfrac{n-k+1}{k}\\). The +1 comes from \\((n-(k-1)) = n-k+1\\), and the denominator is exactly \\(k\\). Distractors like \\(\\dfrac{n-k}{k-1}\\) or \\(\\dfrac{n-k+1}{k+1}\\) are the standard wrong options — verify by testing \\(k=1\\) (the ratio must be \\(n\\cdot\\tfrac{p}{q}\\)).",
        },
        {
          title: "Do not invert the ratio: it is p/q, not q/p",
          body:
            "Moving from \\(k-1\\) up to \\(k\\) adds one success, so the ratio carries \\(\\dfrac{p}{q}\\) (one more \\(p\\), one fewer \\(q\\)). Writing \\(\\dfrac{q}{p}\\) inverts the direction and is a frequent trap — the option \\(\\dfrac{n+1}{k}\\cdot\\dfrac{q}{p}\\) is designed to catch exactly this.",
        },
      ],
    },

    // 2 — finding p from a probability CONDITION (the core, most tags)
    {
      kind: "formula" as const,
      slug: "cetbd-find-p-from-condition",
      name: "Finding p from a Condition a·P(X=i) = b·P(X=j)",
      intuition:
        "The most common shape: you are told two binomial probabilities are related, e.g. 5P(X=0) = P(X=1). Write both with the PMF, cancel the common binomial coefficient and powers, and you are left with a linear relation between p and q. Combine with p + q = 1 to solve for p — then finish with whatever is asked (often the variance npq).",
      definition:
        "Procedure to find \\(p\\) from a condition like \\(a\\,P(X=i) = b\\,P(X=j)\\):\n" +
        "- Substitute the PMF on both sides: \\(a\\,{}^{n}C_{i}\\,p^{i}q^{\\,n-i} = b\\,{}^{n}C_{j}\\,p^{j}q^{\\,n-j}\\).\n" +
        "- Cancel the common powers of \\(p\\) and \\(q\\) and the numerical coefficients; you get a linear equation in \\(p\\) and \\(q\\) (e.g. \\(4q = 3p\\)).\n" +
        "- Substitute \\(q = 1 - p\\) and solve the linear equation for \\(p\\).\n" +
        "- If the answer wants the variance, compute \\(npq\\) with the \\(p\\) just found.",
      formula: {
        label: "Cancelling a condition to a linear relation",
        latex:
          "a\\,{}^{n}C_{i}\\,p^{i}q^{\\,n-i} = b\\,{}^{n}C_{j}\\,p^{j}q^{\\,n-j}\\;\\Longrightarrow\\;\\text{linear in }p,q,\\quad q = 1-p",
      },
      authoredExample: {
        prompt:
          "For \\(X \\sim B(6, p)\\), \\(4P(X=1) = P(X=2)\\). Find \\(p\\) and hence the variance.",
        steps: [
          "Write the PMFs: \\(4\\,{}^{6}C_{1}\\,p\\,q^{5} = {}^{6}C_{2}\\,p^{2}q^{4}\\).",
          "Insert coefficients: \\(4\\cdot 6\\,p\\,q^{5} = 15\\,p^{2}q^{4}\\), i.e. \\(24 p q^{5} = 15 p^{2}q^{4}\\).",
          "Cancel \\(p\\,q^{4}\\): \\(24 q = 15 p\\), so \\(8q = 5p\\).",
          "Use \\(q = 1-p\\): \\(8(1-p) = 5p \\Rightarrow 8 = 13p \\Rightarrow p = \\tfrac{8}{13}\\), \\(q = \\tfrac{5}{13}\\).",
          "Variance \\(= npq = 6\\cdot\\tfrac{8}{13}\\cdot\\tfrac{5}{13} = \\dfrac{240}{169}\\).",
        ],
        answer: "\\(p = \\dfrac{8}{13}\\), variance \\(= \\dfrac{240}{169}\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(X \\sim B(5, p)\\), \\(P(X=2) = P(X=3)\\). Find \\(p\\).",
        steps: [
          "Write the PMFs: \\({}^{5}C_{2}\\,p^{2}q^{3} = {}^{5}C_{3}\\,p^{3}q^{2}\\).",
          "Since \\({}^{5}C_{2} = {}^{5}C_{3} = 10\\), cancel them and \\(p^{2}q^{2}\\): \\(q = p\\).",
          "With \\(q = 1-p\\): \\(1-p = p \\Rightarrow p = \\tfrac12\\).",
        ],
        answer: "\\(p = \\dfrac12\\)",
      },
      practiceSet: [
        { prompt: "For \\(B(n,p)\\), \\(P(X=1) = P(X=0)\\cdot n\\). What relation between \\(p,q\\) is this?", answer: "\\(p = q\\)", method: "cancel; ratio \\(= n\\tfrac{p}{q}=n\\)" },
        { prompt: "For \\(B(4,p)\\), \\(P(X=1) = P(X=3)\\). Find \\(p\\).", answer: "\\(p = \\tfrac12\\)", method: "\\({}^{4}C_1 = {}^{4}C_3\\Rightarrow q^2 = p^2\\)" },
        { prompt: "After cancelling, a condition gives \\(3p = 2q\\). Find \\(p\\).", answer: "\\(p = \\tfrac25\\)", method: "\\(3p = 2(1-p)\\Rightarrow 5p=2\\)" },
        { prompt: "Once \\(p = \\tfrac14\\) for \\(B(8,p)\\), what is the variance?", answer: "\\(\\dfrac{3}{2}\\)", method: "\\(npq = 8\\cdot\\tfrac14\\cdot\\tfrac34\\)" },
      ],
      pyqExampleId: "69d7a877-fcb5-4165-a77c-bdf8eda547d0", // P(X=3)=3P(X=4), n=4 → p=4/7
      traps: [
        {
          title: "Cancel powers of BOTH p and q before solving",
          body:
            "From \\(a\\,{}^{n}C_{i}\\,p^{i}q^{\\,n-i} = b\\,{}^{n}C_{j}\\,p^{j}q^{\\,n-j}\\), cancel the smaller power of \\(p\\) and the smaller power of \\(q\\) from each side so a clean linear relation like \\(4q = 3p\\) survives. Forgetting to cancel the \\(q\\)-powers, or keeping a stray \\(p^{2}\\), leaves a quadratic that cannot match the intended linear answer.",
        },
        {
          title: "Always substitute q = 1 − p at the end, not p = 1 − q inconsistently",
          body:
            "After cancelling you have a relation between \\(p\\) and \\(q\\) (say \\(3p = q\\)). Replace \\(q\\) with \\(1-p\\) to get a single-variable equation: \\(3p = 1-p \\Rightarrow p = \\tfrac14\\). Solving without eliminating \\(q\\) leaves two unknowns; mixing up which is \\(1 -\\) the other flips the answer to \\(q\\) instead of \\(p\\).",
        },
        {
          title: "Read what the question finally asks — p, or the variance/probability that follows",
          body:
            "Many of these questions do NOT stop at \\(p\\): after finding \\(p\\) they ask for \\(npq\\), or another probability like \\(P(X=4)\\). Compute \\(p\\) first, then plug into whatever is requested. Reporting \\(p\\) when the option list is variances is a careless-miss trap.",
        },
      ],
    },

    // 3 — finding p from GIVEN numeric probabilities / a probability value
    {
      kind: "formula" as const,
      slug: "cetbd-p-from-given-probabilities",
      name: "Finding p from Given Numerical Probabilities",
      intuition:
        "Sometimes the data are actual numbers — P(exactly 1 success) = 0.4096 and P(exactly 2) = 0.2048, or a single P(X=4) = a fraction. Dividing two given probabilities makes the coefficients and powers collapse to a p/q ratio (fast), or matching one given value pins p directly. Then you compute the requested probability with the recovered p.",
      definition:
        "Two flavours of 'numbers are given':\n" +
        "- **Two probabilities given:** divide them. \\(\\dfrac{P(X=1)}{P(X=2)} = \\dfrac{{}^{n}C_{1}}{{}^{n}C_{2}}\\cdot\\dfrac{q}{p}\\); plugging the numeric ratio gives a linear \\(p,q\\) relation, so \\(q = 4p\\) etc., then \\(p = \\tfrac15\\).\n" +
        "- **One probability given:** set \\({}^{n}C_{r}\\,p^{r}q^{\\,n-r}\\) equal to the given fraction and recognise \\(p, q\\) (often \\(p = \\tfrac14, q = \\tfrac34\\)) from the powers of the fraction.\n" +
        "- Finish by evaluating the requested \\(P(X = r)\\) or the variance \\(npq\\) with the recovered \\(p\\).",
      formula: {
        label: "Divide two given probabilities to expose p/q",
        latex:
          "\\frac{P(X=i)}{P(X=j)} = \\frac{{}^{n}C_{i}}{{}^{n}C_{j}}\\left(\\frac{p}{q}\\right)^{\\,i-j}",
      },
      authoredExample: {
        prompt:
          "In 4 independent trials, \\(P(\\text{exactly }1) = \\tfrac{8}{27}\\) times \\(P(\\text{exactly }0)\\). Find \\(p\\) and \\(P(X=2)\\).",
        steps: [
          "Divide: \\(\\dfrac{P(X=1)}{P(X=0)} = \\dfrac{{}^{4}C_{1}}{{}^{4}C_{0}}\\cdot\\dfrac{p}{q} = 4\\cdot\\dfrac{p}{q}\\).",
          "This equals \\(\\tfrac{8}{27}\\)? Set \\(4\\cdot\\dfrac{p}{q} = \\dfrac{8}{27}\\Rightarrow \\dfrac{p}{q} = \\dfrac{2}{27}\\).",
          "So \\(27p = 2q = 2(1-p)\\Rightarrow 29p = 2 \\Rightarrow p = \\tfrac{2}{29}\\), \\(q = \\tfrac{27}{29}\\).",
          "\\(P(X=2) = {}^{4}C_{2}\\,p^{2}q^{2} = 6\\left(\\tfrac{2}{29}\\right)^{2}\\left(\\tfrac{27}{29}\\right)^{2} = \\dfrac{6\\cdot 4\\cdot 729}{29^{4}} = \\dfrac{17496}{707281}\\).",
        ],
        answer: "\\(p = \\dfrac{2}{29}\\), \\(P(X=2) = \\dfrac{17496}{707281}\\).",
      },
      selfCheckExample: {
        prompt:
          "In \\(B(5, p)\\), \\(P(X=5) = \\dfrac{1}{32}\\). Find \\(p\\).",
        steps: [
          "A single all-successes value pins \\(p\\) directly: \\(P(X=5) = {}^{5}C_{5}\\,p^{5} = p^{5}\\).",
          "So \\(p^{5} = \\dfrac{1}{32} = \\left(\\dfrac12\\right)^{5}\\).",
          "Taking fifth roots, \\(p = \\dfrac12\\).",
        ],
        answer: "\\(p = \\dfrac12\\)",
      },
      practiceSet: [
        { prompt: "Two adjacent probabilities in \\(B(5,p)\\) are in ratio \\(P(X=1):P(X=2) = 2:1\\). Find \\(q/p\\).", answer: "\\(\\dfrac{q}{p} = 4\\)", method: "\\(\\tfrac{5}{10}\\tfrac{q}{p} = 2\\)" },
        { prompt: "If \\(q = 4p\\) and \\(p+q=1\\), find \\(p\\).", answer: "\\(p = \\tfrac15\\)", method: "\\(5p = 1\\)" },
        { prompt: "In \\(B(5,\\tfrac15)\\), find \\(P(X=4)\\).", answer: "\\(\\dfrac{4}{625}\\)", method: "\\({}^{5}C_4(\\tfrac15)^4(\\tfrac45) = \\tfrac{5\\cdot4}{5^5}\\)" },
        { prompt: "If \\({}^{6}C_{4}\\,p^{4}q^{2} = \\tfrac{135}{4096}\\) with \\(15 p^4 q^2 = \\tfrac{135}{4096}\\), find \\(p\\).", answer: "\\(p = \\tfrac14\\)", method: "\\(p^4q^2 = \\tfrac{9}{4096}=(\\tfrac14)^4(\\tfrac34)^2\\)" },
      ],
      pyqExampleId: "8a9e9f6c-0121-437b-ac9f-26dae6aa28ed", // 5 trials P(1)=0.4096,P(2)=0.2048 → P(4)=4/625
      traps: [
        {
          title: "Dividing the two given probabilities is faster than substituting numbers",
          body:
            "Given \\(P(X=1) = 0.4096\\) and \\(P(X=2) = 0.2048\\), do NOT solve for \\(p\\) from each equation separately. Divide them: the powers of \\(p, q\\) drop to a single \\(p/q\\) and the coefficients to \\({}^{5}C_1/{}^{5}C_2\\), giving \\(q = 4p\\) in one line. Then \\(p = \\tfrac15\\).",
        },
        {
          title: "Recover p, then evaluate the REQUESTED probability — not the ones given",
          body:
            "After finding \\(p = \\tfrac15, q = \\tfrac45\\) in a 5-trial problem, the question asks for \\(P(X=3)\\) or \\(P(X=4)\\), e.g. \\(P(X=4) = {}^{5}C_{4}\\left(\\tfrac15\\right)^{4}\\tfrac45 = \\tfrac{4}{625}\\). Re-quoting a given value like 0.2048 is a misread.",
        },
        {
          title: "Read a single given P(X=r) as a product of powers to spot p and q",
          body:
            "\\(15\\,p^{4}q^{2} = \\tfrac{135}{4096}\\) means \\(p^{4}q^{2} = \\tfrac{9}{4096}\\); recognise \\(\\tfrac{9}{4096} = \\left(\\tfrac14\\right)^{4}\\left(\\tfrac34\\right)^{2}\\), so \\(p = \\tfrac14\\). Trying to solve the sixth-degree equation blindly wastes time — read off the powers of the fraction.",
        },
      ],
    },

    // 4 — the combination identities: ⁿCa = ⁿCb ⇒ a+b=n, and pmf normalisation
    {
      kind: "formula" as const,
      slug: "cetbd-combination-identity",
      name: "Combination Identities: ⁿCₐ = ⁿC_b and PMF Normalisation",
      intuition:
        "Two coefficient facts finish a class of questions instantly. First, ⁿCₐ = ⁿC_b forces either a = b or a + b = n — so 'P(5 tails) = P(7 tails)' with a fair coin gives n = 12 directly. Second, all probabilities must sum to 1, so ΣⁿCᵣ(½)ⁿ = 1 means 2ⁿ = the given total, pinning n.",
      definition:
        "Two identities that pin down \\(n\\):\n" +
        "- **Equal coefficients:** \\({}^{n}C_{a} = {}^{n}C_{b}\\) (with \\(a \\ne b\\)) implies \\(a + b = n\\). For a FAIR coin, \\(P(a) = P(b)\\) reduces to exactly this because \\(\\left(\\tfrac12\\right)^{n}\\) cancels — so \\(P(5\\text{ tails}) = P(7\\text{ tails}) \\Rightarrow n = 12\\).\n" +
        "- **Normalisation:** \\(\\displaystyle\\sum_{r=0}^{n}{}^{n}C_{r}\\left(\\tfrac12\\right)^{n} = \\left(\\tfrac12\\right)^{n}\\sum_{r=0}^{n}{}^{n}C_{r} = \\left(\\tfrac12\\right)^{n}2^{n} = 1\\). If a PMF is \\({}^{n}C_{r}k\\) for constant \\(k\\), then \\(k\\cdot 2^{n} = 1\\), so \\(2^{n}\\) equals the reciprocal of \\(k\\) — solve for \\(n\\).\n" +
        "- After finding \\(n\\), evaluate any requested \\(P(X=r)\\) with \\({}^{n}C_{r}\\left(\\tfrac12\\right)^{n}\\).",
      formula: {
        label: "The two n-pinning identities",
        latex:
          "{}^{n}C_{a} = {}^{n}C_{b}\\;(a\\ne b)\\;\\Rightarrow\\; a+b = n,\\qquad \\sum_{r=0}^{n}{}^{n}C_{r} = 2^{n}",
      },
      authoredExample: {
        prompt:
          "A fair coin is tossed \\(n\\) times and \\(P(4\\text{ heads}) = P(6\\text{ heads})\\). Find \\(n\\) and then \\(P(2\\text{ heads})\\).",
        steps: [
          "Fair coin: \\({}^{n}C_{4}\\left(\\tfrac12\\right)^{n} = {}^{n}C_{6}\\left(\\tfrac12\\right)^{n}\\), so \\({}^{n}C_{4} = {}^{n}C_{6}\\).",
          "Equal coefficients with \\(4 \\ne 6\\) give \\(4 + 6 = n\\), i.e. \\(n = 10\\).",
          "\\(P(2\\text{ heads}) = {}^{10}C_{2}\\left(\\tfrac12\\right)^{10} = \\dfrac{45}{1024}\\).",
        ],
        answer: "\\(n = 10\\), \\(P(2\\text{ heads}) = \\dfrac{45}{1024}\\).",
      },
      selfCheckExample: {
        prompt:
          "A PMF is \\(P(X=r) = {}^{n}C_{r}\\left(\\tfrac12\\right)^{n}\\) for \\(r = 0,\\dots,n\\). Given the coefficients sum makes the total probability 1 and \\(2^{n} = 64\\), find \\(n\\) and \\(P(X \\le 1)\\).",
        steps: [
          "Normalisation: \\(\\left(\\tfrac12\\right)^{n}\\sum{}^{n}C_{r} = \\left(\\tfrac12\\right)^{n}2^{n} = 1\\), consistent for any \\(n\\); here \\(2^{n} = 64 \\Rightarrow n = 6\\).",
          "\\(P(X \\le 1) = P(0) + P(1) = \\dfrac{{}^{6}C_{0} + {}^{6}C_{1}}{2^{6}} = \\dfrac{1 + 6}{64} = \\dfrac{7}{64}\\).",
        ],
        answer: "\\(n = 6\\), \\(P(X \\le 1) = \\dfrac{7}{64}\\)",
      },
      practiceSet: [
        { prompt: "\\({}^{n}C_{3} = {}^{n}C_{8}\\), \\(3 \\ne 8\\). Find \\(n\\).", answer: "\\(n = 11\\)", method: "\\(a+b = n\\)" },
        { prompt: "For a fair coin, \\(P(2\\text{ heads}) = P(8\\text{ heads})\\). Find the number of tosses.", answer: "\\(n = 10\\)", method: "\\({}^{n}C_2 = {}^{n}C_8\\Rightarrow n = 10\\)" },
        { prompt: "\\(\\displaystyle\\sum_{r=0}^{n}{}^{n}C_{r} = ?\\)", answer: "\\(2^{n}\\)", method: "put \\(x=1\\) in \\((1+x)^n\\)" },
        { prompt: "If \\(2^{n} = 32\\), find \\(n\\).", answer: "\\(n = 5\\)" },
      ],
      pyqExampleId: "826bff24-c4f7-42cb-b183-a197d9d3ebcd", // fair coin P(5 tails)=P(7 tails) ⇒ n=12; P(3 tails)=55/2^10
      traps: [
        {
          title: "ⁿCₐ = ⁿC_b gives a + b = n (or a = b), not a − b = n",
          body:
            "The symmetry \\({}^{n}C_{a} = {}^{n}C_{n-a}\\) means equal coefficients with \\(a \\ne b\\) force \\(b = n - a\\), i.e. \\(a + b = n\\). So \\(P(5) = P(7)\\) for a fair coin gives \\(n = 12\\), NOT \\(n = 2\\). Subtracting the indices is the classic error.",
        },
        {
          title: "The coefficients cancel only for a FAIR coin",
          body:
            "\\(P(a) = P(b)\\Rightarrow {}^{n}C_{a} = {}^{n}C_{b}\\) works because \\(p = q = \\tfrac12\\) makes \\(p^{a}q^{n-a} = p^{b}q^{n-b}\\). If \\(p \\ne \\tfrac12\\) (e.g. the 100-coin question with unknown \\(p\\)), the powers do NOT cancel — you must keep \\(\\left(\\tfrac{p}{q}\\right)\\) and solve for \\(p\\), which is the 'find p from a condition' route instead.",
        },
        {
          title: "Simplify the final probability into the option's power of 2",
          body:
            "\\(P(3\\text{ tails}) = {}^{12}C_{3}\\left(\\tfrac12\\right)^{12} = \\dfrac{220}{2^{12}} = \\dfrac{55}{2^{10}}\\) — reduce \\(\\tfrac{220}{4096}\\) so it matches the answer written over \\(2^{10}\\). Leaving it over \\(2^{12}\\) or not reducing \\(220 = 4\\cdot 55\\) is why students miss the correct option.",
        },
      ],
    },

    // 5 — the most probable value (mode)
    {
      kind: "formula" as const,
      slug: "cetbd-most-probable-value",
      name: "The Most Probable Value (Mode) of a Binomial Distribution",
      intuition:
        "The mode is the value r where P(X=r) is largest — where the successive-term ratio crosses 1 (probabilities rise while the ratio exceeds 1, then fall). For a fair coin the coefficients ⁿCᵣ peak in the middle, so the most probable count sits at the centre of the range.",
      definition:
        "The mode of \\(X \\sim B(n, p)\\) is the \\(r\\) maximising \\({}^{n}C_{r}\\,p^{r}q^{\\,n-r}\\); it is the value where the ratio \\(\\dfrac{P(X=r)}{P(X=r-1)}\\) drops below 1. For the fair coin \\(p = \\tfrac12\\) the probability is just \\({}^{n}C_{r}\\left(\\tfrac12\\right)^{n}\\), so the mode is wherever \\({}^{n}C_{r}\\) is largest:\n" +
        "- **Even \\(n\\):** the coefficient peaks at the single middle value \\(r = \\dfrac{n}{2}\\).\n" +
        "- **Odd \\(n\\):** it peaks at the TWO central values \\(r = \\dfrac{n-1}{2}\\) and \\(r = \\dfrac{n+1}{2}\\), which are equal.\n" +
        "So for \\(B(99, \\tfrac12)\\) the maximum is at \\(r = 49\\) and \\(r = 50\\).",
      formula: {
        label: "Most probable value for a fair coin B(n, ½)",
        latex:
          "n\\text{ even: } r = \\tfrac{n}{2};\\qquad n\\text{ odd: } r = \\tfrac{n-1}{2}\\ \\text{and}\\ \\tfrac{n+1}{2}",
      },
      visualizationSlug: "binomial-pmf-interactive",
      authoredExample: {
        prompt:
          "A fair coin is tossed 8 times. For how many heads is the probability maximum, and what is that probability?",
        steps: [
          "\\(X \\sim B(8, \\tfrac12)\\), so \\(P(X=r) = {}^{8}C_{r}\\left(\\tfrac12\\right)^{8}\\), maximised where \\({}^{8}C_{r}\\) is largest.",
          "\\(n = 8\\) is even, so the single peak is at \\(r = \\dfrac{8}{2} = 4\\).",
          "\\(P(X=4) = {}^{8}C_{4}\\left(\\tfrac12\\right)^{8} = \\dfrac{70}{256} = \\dfrac{35}{128}\\).",
        ],
        answer: "Maximum at \\(r = 4\\), with probability \\(\\dfrac{35}{128}\\).",
      },
      selfCheckExample: {
        prompt:
          "A fair coin is tossed 11 times. At which value(s) of \\(r\\) is \\(P(X=r)\\) maximum?",
        steps: [
          "\\({}^{11}C_{r}\\) is largest at the central values.",
          "\\(n = 11\\) is odd, so the two peaks are \\(r = \\dfrac{11-1}{2} = 5\\) and \\(r = \\dfrac{11+1}{2} = 6\\).",
        ],
        answer: "Maximum at \\(r = 5\\) and \\(r = 6\\).",
      },
      practiceSet: [
        { prompt: "Where is \\({}^{10}C_{r}\\) largest?", answer: "\\(r = 5\\)", method: "even n: middle value n/2" },
        { prompt: "For a fair coin tossed 7 times, the most probable number of heads is?", answer: "\\(r = 3\\) and \\(r = 4\\)", method: "odd n: (n±1)/2" },
        { prompt: "The mode occurs where the ratio \\(P(X=r)/P(X=r-1)\\) does what?", answer: "Falls through 1 (from above 1 to below 1)" },
        { prompt: "For \\(B(99,\\tfrac12)\\), the two most probable values of \\(r\\) are?", answer: "\\(r = 49\\) and \\(r = 50\\)", method: "(99±1)/2" },
      ],
      pyqExampleId: "87fb5973-dd2a-45fe-8225-2b7010e0b433", // fair coin 99 tosses, P(X=r) max at r = 49
      traps: [
        {
          title: "For odd n there are TWO modes, both central",
          body:
            "When \\(n\\) is odd (e.g. \\(B(99, \\tfrac12)\\)), the maximum probability occurs at BOTH \\(r = \\tfrac{n-1}{2}\\) and \\(r = \\tfrac{n+1}{2}\\) (here 49 and 50) — they are exactly equal. If only one appears among the options, pick it; do not assume a unique mode for odd \\(n\\).",
        },
        {
          title: "The mode is the middle of the range, not the mean np unless p = ½",
          body:
            "For a fair coin the mode coincides with the centre \\(\\tfrac{n}{2}\\) because \\({}^{n}C_{r}\\) is symmetric. For general \\(p\\) the mode is near \\((n+1)p\\), not the range midpoint — but MHT-CET most-probable-value questions are almost always fair-coin, so anchor on the central \\({}^{n}C_{r}\\) peak.",
        },
      ],
    },
  ],
  related: [
    {
      label: "NDA Maths — Binomial Distribution notes",
      href: "/notes/nda-maths/binomial-distribution",
    },
  ],
};
