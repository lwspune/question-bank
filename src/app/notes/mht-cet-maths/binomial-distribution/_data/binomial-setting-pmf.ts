import type { SubtopicNote } from "@/app/notes/_types";

export const BINOMIAL_SETTING_NOTE: SubtopicNote = {
  subtopicName: "The Binomial Setting and Probability Mass Function",
  title: "The Binomial Setting and Probability Mass Function",
  oneLineDefinition:
    "Fix n independent trials, each a success (p) or failure (q = 1 − p); then X = number of successes follows B(n, p), and P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ — the single formula every question in this subtopic runs on.",
  whyItMatters:
    "This is the foundation of the whole chapter: 10 PYQs sit here (5 EASY, 4 MODERATE, 1 HARD). Every later idea (mean np, variance npq, at-least/at-most tails) is built on top of this one PMF. " +
    "The recurring skills are three: reading n, p and q correctly from the wording (with-replacement draws, 'success = …'), evaluating a single P(X = r), and writing out the full P(X = 0…n) distribution table for a small experiment.",
  concepts: [
    // 0 — foundation: the Bernoulli-trial setting (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetbd-binomial-setting",
      name: "The Binomial Setting — n Fixed Independent Success or Failure Trials",
      intuition:
        "Picture the same simple experiment repeated a fixed number of times, each time with only two possible outcomes labelled success and failure, and each repeat unaffected by the others. Count how many successes you get — that count is a binomial random variable. Tossing a coin 10 times and counting heads, or drawing a ball with replacement 3 times and counting reds, are the everyday pictures.",
      definition:
        "Four conditions define a **binomial setting** (Bernoulli trials):\n" +
        "- **Fixed number of trials** \\(n\\), decided in advance.\n" +
        "- **Two outcomes per trial** — a **success** (probability \\(p\\)) and a **failure** (probability \\(q = 1 - p\\)).\n" +
        "- **Constant \\(p\\)** — the success probability is the same on every trial (drawing WITH replacement keeps this true; without replacement breaks it).\n" +
        "- **Independent trials** — one trial's result does not change another's.\n" +
        "Then \\(X\\), the number of successes in the \\(n\\) trials, is a **binomial variable**, written \\(X \\sim B(n, p)\\). It takes values \\(0, 1, 2, \\dots, n\\).",
      formula: {
        label: "Binomial variable and its parameters",
        latex:
          "X \\sim B(n, p),\\qquad q = 1 - p,\\qquad X \\in \\{0, 1, 2, \\dots, n\\}",
        symbols: [
          { symbol: "n", meaning: "number of trials (fixed in advance)" },
          { symbol: "p", meaning: "probability of success on a single trial" },
          { symbol: "q", meaning: "probability of failure, q = 1 − p" },
          { symbol: "X", meaning: "number of successes across the n trials" },
        ],
      },
      authoredExample: {
        prompt:
          "A fair coin is tossed 8 times and \\(X\\) counts the number of tails. Identify \\(n\\), \\(p\\) and \\(q\\), and state which values \\(X\\) can take.",
        steps: [
          "Each toss is one trial with two outcomes; tossing 8 times fixes \\(n = 8\\).",
          "Success = a tail, so \\(p = \\tfrac12\\) and \\(q = 1 - \\tfrac12 = \\tfrac12\\).",
          "The tosses are independent and \\(p\\) is constant, so \\(X \\sim B\\!\\left(8, \\tfrac12\\right)\\).",
          "A count of tails ranges from none to all: \\(X \\in \\{0, 1, 2, \\dots, 8\\}\\).",
        ],
        answer: "\\(n = 8,\\ p = q = \\tfrac12,\\ X \\sim B\\!\\left(8, \\tfrac12\\right),\\ X \\in \\{0,\\dots,8\\}\\)",
      },
      selfCheckExample: {
        prompt:
          "A card is drawn from a well-shuffled deck, its suit noted, and it is REPLACED; this is done 4 times. If success is drawing a spade, find \\(n\\), \\(p\\) and \\(q\\).",
        steps: [
          "Four draws, decided in advance, so \\(n = 4\\).",
          "A spade is 13 of 52 cards, so \\(p = \\tfrac{13}{52} = \\tfrac14\\).",
          "Because the card is REPLACED each time, \\(p\\) stays constant and the draws are independent — a valid binomial setting.",
          "Failure probability \\(q = 1 - \\tfrac14 = \\tfrac34\\).",
        ],
        answer: "\\(n = 4,\\ p = \\tfrac14,\\ q = \\tfrac34\\), and \\(X \\sim B\\!\\left(4, \\tfrac14\\right)\\)",
      },
      practiceSet: [
        { prompt: "How many parameters does a binomial distribution have, and what are they?", answer: "Two: \\(n\\) (number of trials) and \\(p\\) (success probability)", method: "\\(q = 1-p\\) is derived, not a third parameter" },
        { prompt: "If \\(p = 0.3\\) is the success probability, what is the failure probability \\(q\\)?", answer: "\\(q = 0.7\\)", method: "\\(q = 1 - p\\)" },
        { prompt: "Does drawing balls WITHOUT replacement give a binomial setting?", answer: "No — \\(p\\) changes from draw to draw, so the trials are not identical", method: "with replacement keeps \\(p\\) constant" },
        { prompt: "For \\(X \\sim B(5, p)\\), what values can \\(X\\) take?", answer: "\\(0, 1, 2, 3, 4, 5\\)", method: "0 up to n" },
      ],
      traps: [
        {
          title: "Binomial needs WITH-replacement (or constant p), not without-replacement",
          body:
            "The binomial formula assumes every trial has the SAME success probability. Drawing objects one-by-one WITHOUT replacement changes \\(p\\) each draw — that is the hypergeometric setting, not binomial. Exam wording like 'a ball is drawn, its colour noted and REPLACED, and the process repeated' is the signal to use the binomial formula.",
        },
        {
          title: "q = 1 − p is derived, so a binomial has only TWO parameters",
          body:
            "A binomial distribution is fixed by exactly two numbers, \\(n\\) and \\(p\\); the failure probability is \\(q = 1 - p\\), never an independent third parameter. If a problem gives you \\(q\\) directly, get \\(p = 1 - q\\) before doing anything else.",
        },
      ],
    },

    // 1 — single PMF term (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-single-pmf-term",
      name: "The Binomial PMF — Probability of Exactly r Successes",
      intuition:
        "To get exactly \\(r\\) successes in \\(n\\) trials you need \\(r\\) successes (each contributing \\(p\\)) and \\(n - r\\) failures (each contributing \\(q\\)); that is \\(p^r q^{n-r}\\) for one particular ordering. Since the \\(r\\) successes can sit in any of \\({}^{n}C_r\\) positions, multiply by that count. Reading \\(n\\), \\(p\\), \\(q\\) off the wording is half the battle.",
      definition:
        "For \\(X \\sim B(n, p)\\), the **probability mass function** (the probability of exactly \\(r\\) successes) is\n" +
        "\\[P(X = r) = {}^{n}C_r\\, p^{r} q^{\\,n-r},\\qquad r = 0, 1, 2, \\dots, n.\\]\n" +
        "- The \\({}^{n}C_r\\) counts the ways to choose WHICH trials succeed; \\(p^{r} q^{n-r}\\) is the probability of any one such pattern.\n" +
        "- **All-successes:** \\(P(X = n) = p^{n}\\). **No-successes:** \\(P(X = 0) = q^{n}\\) (both binomial coefficients are 1).\n" +
        "- Set up \\(p\\), \\(q\\), \\(n\\) first, then plug in \\(r\\). 'None defective' means \\(r = 0\\) with success = defective, i.e. \\(q^{n}\\) where \\(q\\) = P(good).",
      formula: {
        label: "Binomial probability mass function",
        latex:
          "P(X = r) = {}^{n}C_r\\, p^{r}\\, q^{\\,n-r}",
        symbols: [
          { symbol: "ⁿCᵣ", meaning: "number of ways to place the r successes among the n trials" },
          { symbol: "pʳ", meaning: "probability of r successes" },
          { symbol: "qⁿ⁻ʳ", meaning: "probability of the remaining n − r failures" },
        ],
      },
      authoredExample: {
        prompt:
          "A fair die is rolled 5 times. Find the probability of getting a six exactly twice.",
        steps: [
          "Success = a six, so \\(p = \\tfrac16\\), \\(q = \\tfrac56\\), \\(n = 5\\).",
          "Here \\(r = 2\\), so \\(P(X = 2) = {}^{5}C_2\\left(\\tfrac16\\right)^{2}\\left(\\tfrac56\\right)^{3}\\).",
          "\\({}^{5}C_2 = 10\\) and \\(\\left(\\tfrac56\\right)^3 = \\tfrac{125}{216}\\), so \\(P = 10\\cdot\\tfrac{1}{36}\\cdot\\tfrac{125}{216} = \\tfrac{1250}{7776}\\).",
          "Simplify: \\(\\tfrac{1250}{7776} = \\tfrac{625}{3888}\\).",
        ],
        answer: "\\(P(X = 2) = \\dfrac{625}{3888}\\)",
      },
      selfCheckExample: {
        prompt:
          "The probability that a seed germinates is \\(0.8\\). If 4 seeds are sown, find the probability that all 4 germinate.",
        steps: [
          "Success = germinates, so \\(p = 0.8\\), \\(q = 0.2\\), \\(n = 4\\), and we want \\(r = 4\\).",
          "All-successes: \\(P(X = 4) = {}^{4}C_4\\,(0.8)^4 = (0.8)^4\\).",
          "\\((0.8)^4 = 0.4096\\).",
        ],
        answer: "\\(P(X = 4) = (0.8)^4 = 0.4096\\)",
      },
      practiceSet: [
        { prompt: "For \\(X \\sim B(n, p)\\), write \\(P(X = 0)\\) in terms of \\(q\\).", answer: "\\(P(X = 0) = q^{n}\\)", method: "\\({}^{n}C_0 = 1\\)" },
        { prompt: "For \\(X \\sim B(n, p)\\), write \\(P(X = n)\\).", answer: "\\(P(X = n) = p^{n}\\)", method: "\\({}^{n}C_n = 1\\)" },
        { prompt: "A coin is tossed 6 times. Probability of exactly 6 heads?", answer: "\\(\\left(\\tfrac12\\right)^6 = \\tfrac{1}{64}\\)", method: "\\(P(X=6)=p^6\\)" },
        { prompt: "\\(X \\sim B(3, \\tfrac13)\\). Compute \\(P(X = 1)\\).", answer: "\\({}^{3}C_1\\left(\\tfrac13\\right)\\left(\\tfrac23\\right)^2 = 3\\cdot\\tfrac13\\cdot\\tfrac49 = \\tfrac{4}{9}\\)", method: "plug into the PMF" },
      ],
      pyqExampleId: "3eb9f491-00dc-4809-8bd3-acbfab476c93", // P(4 of 5 are swimmers), p=4/5 → (4/5)^4
      traps: [
        {
          title: "'Not a swimmer is 1/5' means success p = 4/5, not p = 1/5",
          body:
            "When the wording gives the probability of the FAILURE ('not a swimmer', 'defective', 'does not recover'), that number is \\(q\\), not \\(p\\). Get \\(p = 1 - q\\) first. If P(not a swimmer) \\(= \\tfrac15\\) then \\(p = \\tfrac45\\), and P(4 of 5 swim) \\(= {}^5C_4\\left(\\tfrac45\\right)^4\\left(\\tfrac15\\right) = \\left(\\tfrac45\\right)^4\\).",
        },
        {
          title: "'None defective' is P(X = 0) = qⁿ, and it needs WITH-replacement",
          body:
            "For a box of 100 bulbs with 10 defective, P(a bulb is good) \\(= \\tfrac{9}{10}\\). Drawing 5 (with replacement) gives P(none defective) \\(= \\left(\\tfrac{9}{10}\\right)^5\\), i.e. \\(q^{5}\\) with \\(q = \\) P(good). Do NOT switch to a without-replacement (hypergeometric) count — the binomial answer is the intended one.",
        },
        {
          title: "Don't forget the ⁿCᵣ multiplier",
          body:
            "\\(p^r q^{n-r}\\) is the probability of ONE specific arrangement of \\(r\\) successes. There are \\({}^{n}C_r\\) arrangements, so the full probability is \\({}^{n}C_r\\,p^r q^{n-r}\\). Writing just \\(p^r q^{n-r}\\) (omitting the coefficient) is the most common single-term slip — except at the extremes \\(r = 0\\) or \\(r = n\\), where \\({}^{n}C_r = 1\\).",
        },
        {
          title: "Match the exponents to r and n − r, in that order",
          body:
            "In \\({}^{n}C_r\\,p^r q^{n-r}\\), the success probability \\(p\\) carries the exponent \\(r\\) (the number of successes) and the failure probability \\(q\\) carries \\(n - r\\). Swapping them — e.g. writing \\({}^{6}C_5\\,q^5 p^1\\) when 5 successes are wanted — is a standard distractor built into MHT-CET option sets.",
        },
      ],
    },

    // 2 — distribution table (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-distribution-table",
      name: "Building the Full Probability Distribution Table",
      intuition:
        "For a small experiment you often want the whole picture: the probability of 0 successes, 1 success, up to \\(n\\) successes, laid out in a table. You just evaluate the PMF at every \\(r = 0, 1, \\dots, n\\). A neat check: all the probabilities must add to 1, exactly matching the binomial expansion of \\((q + p)^n\\).",
      definition:
        "A **probability distribution** of \\(X \\sim B(n, p)\\) lists each value with its probability:\n" +
        "- Evaluate \\(P(X = r) = {}^{n}C_r\\,p^r q^{n-r}\\) for \\(r = 0, 1, \\dots, n\\).\n" +
        "- The successive probabilities are exactly the terms of \\((q + p)^n\\), so they must sum to \\((q + p)^n = 1\\) — the built-in validity check.\n" +
        "- For \\(n = 2\\) (e.g. a die tossed twice): \\(P(0) = q^2\\), \\(P(1) = 2pq\\), \\(P(2) = p^2\\). For \\(n = 3\\): \\(q^3,\\ 3pq^2,\\ 3p^2q,\\ p^3\\).",
      formula: {
        label: "Distribution terms sum to one via the binomial expansion",
        latex:
          "\\sum_{r=0}^{n} P(X = r) = \\sum_{r=0}^{n} {}^{n}C_r\\, p^r q^{n-r} = (q + p)^{n} = 1",
      },
      visualizationSlug: "binomial-pmf-interactive",
      authoredExample: {
        prompt:
          "A fair coin is tossed twice and \\(X\\) is the number of heads. Write the probability distribution of \\(X\\).",
        steps: [
          "Success = head, so \\(p = \\tfrac12\\), \\(q = \\tfrac12\\), \\(n = 2\\).",
          "\\(P(X = 0) = q^2 = \\tfrac14\\).",
          "\\(P(X = 1) = 2pq = 2\\cdot\\tfrac12\\cdot\\tfrac12 = \\tfrac12\\).",
          "\\(P(X = 2) = p^2 = \\tfrac14\\).",
          "Check: \\(\\tfrac14 + \\tfrac12 + \\tfrac14 = 1\\). ✓",
        ],
        answer: "\\(X\\): 0, 1, 2 with probabilities \\(\\tfrac14,\\ \\tfrac12,\\ \\tfrac14\\)",
      },
      selfCheckExample: {
        prompt:
          "A bag has 2 white and 3 black balls. A ball is drawn, its colour noted and REPLACED; this is done twice. Let \\(X\\) be the number of white balls drawn. Write the distribution of \\(X\\).",
        steps: [
          "Success = white, so \\(p = \\tfrac25\\), \\(q = \\tfrac35\\), \\(n = 2\\).",
          "\\(P(X = 0) = q^2 = \\tfrac{9}{25}\\).",
          "\\(P(X = 1) = 2pq = 2\\cdot\\tfrac25\\cdot\\tfrac35 = \\tfrac{12}{25}\\).",
          "\\(P(X = 2) = p^2 = \\tfrac{4}{25}\\).",
          "Check: \\(\\tfrac{9}{25} + \\tfrac{12}{25} + \\tfrac{4}{25} = 1\\). ✓",
        ],
        answer: "\\(X\\): 0, 1, 2 with probabilities \\(\\tfrac{9}{25},\\ \\tfrac{12}{25},\\ \\tfrac{4}{25}\\)",
      },
      practiceSet: [
        { prompt: "For \\(X \\sim B(2, p)\\), write \\(P(X = 1)\\).", answer: "\\(2pq\\)", method: "\\({}^{2}C_1 = 2\\)" },
        { prompt: "For \\(X \\sim B(3, p)\\), write the four probabilities in order \\(r=0,1,2,3\\).", answer: "\\(q^3,\\ 3pq^2,\\ 3p^2q,\\ p^3\\)", method: "terms of \\((q+p)^3\\)" },
        { prompt: "A die is tossed twice, \\(X\\) = number of fours. Find \\(P(X = 0)\\).", answer: "\\(\\left(\\tfrac56\\right)^2 = \\tfrac{25}{36}\\)", method: "\\(q^2\\), \\(q = \\tfrac56\\)" },
        { prompt: "What must the probabilities in any distribution table add up to?", answer: "1", method: "\\((q+p)^n = 1\\)" },
      ],
      pyqExampleId: "1d0eb009-0669-4929-9648-25099dd915ba", // bag 4R 3B, replaced, X=black in 3 draws → full B(3, 3/7) table
      traps: [
        {
          title: "Order the table by ascending r — P(X = 0) uses qⁿ, P(X = n) uses pⁿ",
          body:
            "In a distribution table the first entry is \\(P(X = 0) = q^{n}\\) (all failures) and the last is \\(P(X = n) = p^{n}\\) (all successes). MHT-CET distractors reverse this order or swap the middle terms — for a die tossed twice, the correct row is \\(P(0) = \\tfrac{25}{36},\\ P(1) = \\tfrac{5}{18},\\ P(2) = \\tfrac{1}{36}\\), decreasing because \\(q > p\\).",
        },
        {
          title: "Fix which colour is 'success' before building the table",
          body:
            "For a bag with 4 red and 3 black balls drawn with replacement, if \\(X\\) counts BLACK then \\(p = \\tfrac37\\) (black) and \\(q = \\tfrac47\\) (red) — so \\(P(X=0) = \\left(\\tfrac47\\right)^3\\) uses the RED probability. Assigning \\(p\\) to the wrong colour flips the whole table and lands on the mirror-image distractor.",
        },
        {
          title: "The probabilities must sum to 1 — use it as a check",
          body:
            "Because the entries are the terms of \\((q + p)^n\\), they always total 1. After writing a distribution table, add the entries: if they do not sum to 1 you have miscomputed a coefficient or an exponent. This single check catches most table errors before you pick an option.",
        },
        {
          title: "Middle term of B(2, p) carries a factor 2 (not 1)",
          body:
            "For two trials, \\(P(X = 1) = {}^{2}C_1\\,pq = 2pq\\), because there are two orderings (success-then-failure and failure-then-success). Writing \\(P(X = 1) = pq\\) drops the count and is a classic two-trial slip; likewise \\(P(X = 1)\\) for three trials is \\(3pq^2\\), not \\(pq^2\\).",
        },
      ],
    },
  ],
};
