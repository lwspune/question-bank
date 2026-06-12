import type { SubtopicNote } from "@/app/notes/_types";

export const COMPUTING_PROBABILITIES_NOTE: SubtopicNote = {
  subtopicName:
    "Computing Binomial Probabilities — Exact, At-Least, and Complementary Events",
  title: "The Binomial Setting and Computing Probabilities",
  oneLineDefinition:
    "A binomial experiment is n independent repeats of the same two-outcome trial, and P(X = k) counts how many of the n trials end in success.",
  whyItMatters:
    "This is the workhorse half of the chapter — 15 PYQs, mostly EASY and MODERATE, and they recur almost verbatim (coins, dice, ships, disease in workers). " +
    "Three question shapes cover nearly all of them: an exact count P(X = k), an at-least / at-most count handled by the complement, and a short tail you sum directly. " +
    "Lock the formula and the complement reflex and these become near-free marks.",
  concepts: [
    // 1 — Bernoulli trial (foundation, no PYQ)
    {
      kind: "formula" as const,
      slug: "bernoulli-trial",
      name: "Bernoulli Trials: One Success, One Failure",
      intuition:
        "Before counting over many trials, fix the single trial. A Bernoulli trial has exactly two outcomes — call one 'success' (probability \\(p\\)) and the other 'failure'. Since something must happen, the failure probability is whatever is left over.",
      definition:
        "A **Bernoulli trial** is a single experiment with two outcomes, success and failure.\n" +
        "- Success probability: \\(p\\).\n" +
        "- Failure probability: \\(q = 1 - p\\).\n" +
        "- Always \\(p + q = 1\\), so \\(0 \\le p \\le 1\\).\n" +
        "Which outcome you label 'success' is your choice — but once chosen, \\(p\\) must be the probability of THAT event for the rest of the problem.",
      formula: {
        label: "Failure complements success",
        latex: "q = 1 - p, \\qquad p + q = 1",
      },
      authoredExample: {
        prompt:
          "A spinner lands on red with probability \\(0.3\\). Taking 'lands on red' as success, what are \\(p\\) and \\(q\\)?",
        steps: [
          "Success is 'red', so \\(p = 0.3\\).",
          "Failure (not red) is the complement: \\(q = 1 - 0.3 = 0.7\\).",
        ],
        answer: "\\(p = 0.3,\\ q = 0.7\\)",
      },
      practiceSet: [
        { prompt: "If \\(p = \\tfrac{1}{4}\\), what is \\(q\\)?", answer: "\\(q = \\tfrac{3}{4}\\)" },
        {
          prompt: "A die is rolled; success = 'getting a 6'. Find \\(p\\) and \\(q\\).",
          answer: "\\(p = \\tfrac{1}{6},\\ q = \\tfrac{5}{6}\\)",
          method: "One favourable face out of six.",
        },
      ],
    },

    // 2 — the four conditions (PYQ bf2122bf) + tree viz
    {
      kind: "formula" as const,
      slug: "binomial-setting",
      name: "When Is It Binomial? The Four Conditions",
      pyqExampleId: "bf2122bf-1491-4e58-ac6c-8d8e3c966d47",
      visualizationSlug: "binomial-coefficient-tree",
      intuition:
        "A process is binomial only when you repeat the SAME Bernoulli trial a fixed number of times, the trials do not affect each other, and \\(p\\) never changes. If any of those breaks, the simple formula does not apply.",
      definition:
        "A random variable \\(X\\) is binomial, written \\(X \\sim B(n, p)\\), when all four hold:\n" +
        "- **Fixed n:** the number of trials is decided in advance (not 'keep going until...').\n" +
        "- **Two outcomes:** each trial is success or failure.\n" +
        "- **Independence:** the result of one trial does not change the others.\n" +
        "- **Constant p:** the success probability is the same on every trial.\n" +
        "Here \\(X\\) = the number of successes in the \\(n\\) trials, taking values \\(0, 1, 2, \\dots, n\\). Drawing cards WITHOUT replacement fails 'constant \\(p\\)' and 'independence', so it is not binomial.",
      authoredExample: {
        prompt:
          "Is 'draw 3 cards from a deck without replacement and count the kings' a binomial experiment?",
        steps: [
          "Fixed number of draws (3)? Yes.",
          "Two outcomes per draw (king / not king)? Yes.",
          "Independent with constant \\(p\\)? NO — once a card is removed, the next draw's probability changes.",
          "Because \\(p\\) is not constant and the draws are dependent, the binomial model does not apply (this is hypergeometric).",
        ],
        answer: "Not binomial — sampling without replacement breaks constant \\(p\\) and independence.",
      },
      traps: [
        {
          title: "'Until the first success' is not binomial",
          body:
            "If the number of trials is not fixed in advance — e.g. 'toss until a head appears' — then \\(n\\) is random and the binomial formula does not apply. Binomial needs a pre-set \\(n\\).",
        },
      ],
    },

    // 3 — reading p from the story (PYQ 47644535)
    {
      kind: "formula" as const,
      slug: "reading-p-from-problem",
      name: "Reading p and the Success Event from the Story",
      pyqExampleId: "47644535-62c7-4dd6-93bf-e300bf12a013",
      intuition:
        "Half the battle is turning words into \\(p\\). 'Thrice as likely', 'one in five on average', and 'arrives safely' each hide a probability — pin down the success event first, then its \\(p\\).",
      definition:
        "Common translations:\n" +
        "- **Odds phrasing** ('heads is thrice as likely as tails'): the parts are \\(3 : 1\\), so \\(p = \\tfrac{3}{4}\\), \\(q = \\tfrac{1}{4}\\).\n" +
        "- **Rate phrasing** ('one in five ships is sunk on average'): \\(p(\\text{sunk}) = \\tfrac{1}{5}\\), so \\(p(\\text{safe}) = \\tfrac{4}{5}\\).\n" +
        "- **'k% chance'**: convert straight to a fraction, e.g. \\(20\\% \\to \\tfrac{1}{5}\\).\n" +
        "Decide which event the question counts (hits? safe arrivals? defectives?) and make THAT the success, then read \\(p\\) off the story.",
      formula: {
        label: "Odds to probability",
        latex: "\\text{odds } a : b \\ \\Longrightarrow\\ p = \\dfrac{a}{a + b}",
      },
      authoredExample: {
        prompt:
          "A player is twice as likely to win a point as to lose it. In 3 points, what is \\(p\\) for 'wins a point', and the probability of winning exactly 2?",
        steps: [
          "Odds \\(2 : 1\\) give \\(p = \\tfrac{2}{3}\\), \\(q = \\tfrac{1}{3}\\).",
          "Exactly 2 wins of 3: \\(\\binom{3}{2}\\left(\\tfrac{2}{3}\\right)^2\\left(\\tfrac{1}{3}\\right) = 3 \\cdot \\tfrac{4}{9} \\cdot \\tfrac{1}{3} = \\tfrac{12}{27} = \\tfrac{4}{9}\\).",
        ],
        answer: "\\(p = \\tfrac{2}{3}\\); probability of exactly 2 wins \\(= \\tfrac{4}{9}\\)",
      },
      traps: [
        {
          title: "'Thrice as likely' is 3 : 1, not p = 3",
          body:
            "Odds split the whole into parts. 'Heads thrice as likely as tails' means \\(3 : 1\\) out of 4 parts, so \\(p = \\tfrac{3}{4}\\) — never read it as \\(p = 3\\) or \\(p = \\tfrac{1}{3}\\).",
        },
      ],
    },

    // 4 — the binomial formula (PYQ ab614fc2) + interactive PMF
    {
      kind: "formula" as const,
      slug: "binomial-probability-formula",
      name: "The Binomial Probability Formula",
      pyqExampleId: "ab614fc2-4262-4725-9391-b080c86a2f0d",
      visualizationSlug: "binomial-pmf-interactive",
      intuition:
        "Any single sequence with \\(k\\) successes and \\(n - k\\) failures has probability \\(p^k q^{\\,n-k}\\). There are \\(\\binom{n}{k}\\) such sequences (the orderings), so multiply.",
      definition:
        "For \\(X \\sim B(n, p)\\), the probability of exactly \\(k\\) successes is\n" +
        "\\[P(X = k) = \\binom{n}{k} p^{k} q^{\\,n-k}, \\qquad q = 1 - p.\\]\n" +
        "The three pieces: \\(\\binom{n}{k}\\) counts the orderings, \\(p^k\\) is the \\(k\\) successes, \\(q^{\\,n-k}\\) is the \\(n-k\\) failures. Special cases drop straight out: **all failures** \\(P(X=0) = q^{n}\\) and **all successes** \\(P(X=n) = p^{n}\\).",
      formula: {
        label: "Probability of exactly k successes",
        latex: "P(X = k) = \\binom{n}{k} p^{k} q^{\\,n-k}",
        symbols: [
          { symbol: "n", meaning: "number of trials" },
          { symbol: "k", meaning: "number of successes counted" },
          { symbol: "p", meaning: "success probability per trial" },
          { symbol: "q", meaning: "failure probability, 1 − p" },
        ],
      },
      authoredExample: {
        prompt: "A fair coin is tossed 5 times. What is the probability of exactly 2 heads?",
        steps: [
          "Here \\(n = 5\\), \\(p = \\tfrac{1}{2}\\), \\(k = 2\\).",
          "\\(P(X = 2) = \\binom{5}{2}\\left(\\tfrac{1}{2}\\right)^2\\left(\\tfrac{1}{2}\\right)^3 = 10 \\cdot \\left(\\tfrac{1}{2}\\right)^5\\).",
          "\\(= \\dfrac{10}{32} = \\dfrac{5}{16}\\).",
        ],
        answer: "\\(\\dfrac{5}{16}\\)",
      },
      selfCheckExample: {
        prompt:
          "The probability a seed germinates is \\(0.8\\). Out of 5 seeds, find the probability that exactly 2 germinate.",
        steps: [
          "\\(n = 5\\), \\(p = 0.8\\), \\(q = 0.2\\), \\(k = 2\\).",
          "\\(P(X = 2) = \\binom{5}{2}(0.8)^2(0.2)^3 = 10 \\cdot 0.64 \\cdot 0.008\\).",
          "\\(= 10 \\cdot 0.00512 = 0.0512\\).",
        ],
        answer: "\\(0.0512\\)",
      },
      practiceSet: [
        {
          prompt: "Probability of exactly 3 heads in 4 tosses of a fair coin.",
          answer: "\\(\\tfrac{4}{16} = \\tfrac{1}{4}\\)",
          method: "\\(\\binom{4}{3}(\\tfrac12)^4 = 4/16\\).",
        },
        {
          prompt: "A die is rolled 3 times. Probability of getting a 6 on all three.",
          answer: "\\(\\tfrac{1}{216}\\)",
          method: "\\(P(X=3) = (\\tfrac16)^3\\).",
        },
      ],
      traps: [
        {
          title: "Match the exponents to the success/failure counts",
          body:
            "The power on \\(p\\) is the number of successes \\(k\\); the power on \\(q\\) is \\(n - k\\). Swapping them — e.g. \\(p^{\\,n-k} q^{k}\\) — is the single most common slip, especially when \\(p \\ne q\\).",
        },
      ],
    },

    // 5 — complement / at-least-one (PYQ ecfda3af)
    {
      kind: "formula" as const,
      slug: "complement-at-least-one",
      name: "At Least One via the Complement",
      pyqExampleId: "ecfda3af-0633-41ea-ae63-27396982a478",
      intuition:
        "'At least one success' is the opposite of 'no successes'. Computing the single term \\(P(X = 0)\\) and subtracting from 1 is far quicker than adding \\(P(1) + P(2) + \\dots\\).",
      definition:
        "The complement shortcut:\n" +
        "\\[P(X \\ge 1) = 1 - P(X = 0) = 1 - q^{n}.\\]\n" +
        "More generally, 'at most' and 'at least' counts are linked by \\(P(X \\le k) = 1 - P(X \\ge k+1)\\). Always compute whichever side has FEWER terms — for 'at least one' that is the single term \\(P(X=0)\\).",
      formula: {
        label: "At least one success",
        latex: "P(X \\ge 1) = 1 - q^{n}",
      },
      authoredExample: {
        prompt:
          "A die is rolled 3 times. What is the probability of getting at least one six?",
        steps: [
          "Success = 'six', \\(p = \\tfrac{1}{6}\\), \\(q = \\tfrac{5}{6}\\), \\(n = 3\\).",
          "\\(P(X \\ge 1) = 1 - P(X = 0) = 1 - \\left(\\tfrac{5}{6}\\right)^3\\).",
          "\\(= 1 - \\dfrac{125}{216} = \\dfrac{91}{216}\\).",
        ],
        answer: "\\(\\dfrac{91}{216}\\)",
      },
      practiceSet: [
        {
          prompt: "A fair coin is tossed 5 times. Find the probability of getting at least one head.",
          answer: "\\(\\dfrac{31}{32}\\)",
          method: "\\(1 - (\\tfrac12)^5\\)",
        },
        {
          prompt: "5% of the bulbs in a batch are defective. In a random sample of 3, find the probability of at least one defective bulb.",
          answer: "\\(\\dfrac{1141}{8000}\\)",
          method: "\\(1 - q^3\\) with \\(q = \\tfrac{19}{20}\\)",
        },
      ],
      traps: [
        {
          title: "'At most' can also flip to a complement",
          body:
            "'At most 4 tails in 5 tosses' has five terms the long way, but its complement 'exactly 5 tails' is one term: \\(1 - (\\tfrac12)^5 = \\tfrac{31}{32}\\). Read the count and complement whichever side is shorter.",
        },
      ],
    },

    // 6 — tail summation (PYQ 7150efc9) + tail-shading viz
    {
      kind: "formula" as const,
      slug: "tail-probabilities",
      name: "Cumulative Probabilities: Summing the Tail",
      pyqExampleId: "7150efc9-ecdc-4b4b-ae0e-81040547bf98",
      visualizationSlug: "binomial-tail-shading",
      intuition:
        "When 'at least \\(k\\)' or 'at most \\(k\\)' lands in the middle, no single complement collapses it — you add the handful of bars on the shorter side.",
      definition:
        "A cumulative probability is a sum of exact terms:\n" +
        "\\[P(X \\ge k) = \\sum_{j=k}^{n} \\binom{n}{j} p^{j} q^{\\,n-j}.\\]\n" +
        "Two routes, pick the one with fewer terms:\n" +
        "- **Sum directly** when the tail is short (e.g. \\(X \\ge 6\\) out of 8 is just \\(j = 6, 7, 8\\)).\n" +
        "- **Use the complement** when the other side is shorter, e.g. \\(P(X \\ge 2) = 1 - P(0) - P(1)\\).",
      formula: {
        label: "At least two successes",
        latex: "P(X \\ge 2) = 1 - P(X = 0) - P(X = 1)",
      },
      authoredExample: {
        prompt:
          "A fair coin is tossed 4 times. What is the probability of getting at least 3 heads?",
        steps: [
          "\\(n = 4\\), \\(p = \\tfrac12\\). The short side is the tail \\(j = 3, 4\\).",
          "\\(P(X \\ge 3) = \\binom{4}{3}(\\tfrac12)^4 + \\binom{4}{4}(\\tfrac12)^4 = \\dfrac{4 + 1}{16}\\).",
          "\\(= \\dfrac{5}{16}\\).",
        ],
        answer: "\\(\\dfrac{5}{16}\\)",
      },
      selfCheckExample: {
        prompt:
          "A man hits a target with probability \\(\\tfrac15\\) and fires 7 times. Find the probability of at least 2 hits.",
        steps: [
          "Complement the short side: \\(P(X \\ge 2) = 1 - P(0) - P(1)\\).",
          "\\(P(0) = \\left(\\tfrac45\\right)^7 = \\dfrac{4^7}{5^7}\\); \\(P(1) = \\binom{7}{1}\\tfrac15\\left(\\tfrac45\\right)^6 = \\dfrac{7\\cdot 4^6}{5^7}\\).",
          "\\(P(0)+P(1) = \\dfrac{4^6(4 + 7)}{5^7} = \\dfrac{11\\cdot 4^6}{5^7}\\).",
        ],
        answer: "\\(1 - \\dfrac{11\\cdot 4^6}{5^7}\\)",
      },
      traps: [
        {
          title: "Count the terms before you sum",
          body:
            "For 'at least \\(k\\)', the direct sum runs \\(j = k\\) to \\(n\\) and the complement runs \\(j = 0\\) to \\(k-1\\). Pick the shorter list — and never forget a boundary term (the \\(j = n\\) all-success term is easy to drop).",
        },
      ],
    },

    // 7 — complementary count variable (PYQ e737772c)
    {
      kind: "formula" as const,
      slug: "complementary-count-variable",
      name: "The Complementary Count Y = n − X",
      pyqExampleId: "e737772c-8e42-42ff-ae65-83545812891f",
      intuition:
        "If \\(X\\) counts successes, then \\(Y = n - X\\) counts failures. Counting failures is just a binomial with success and failure swapped — so \\(p\\) and \\(q\\) trade places.",
      definition:
        "If \\(X \\sim B(n, p)\\) then the complementary count\n" +
        "\\[Y = n - X \\sim B(n,\\ 1 - p) = B(n, q).\\]\n" +
        "The number of trials \\(n\\) is unchanged; only the success probability flips to \\(q\\). This is why 'the number that fail' and 'the number that pass' are both binomial on the same \\(n\\).",
      formula: {
        label: "Swapping successes for failures",
        latex: "X \\sim B(n, p) \\ \\Longrightarrow\\ n - X \\sim B(n,\\, 1 - p)",
      },
      authoredExample: {
        prompt:
          "\\(X \\sim B(12, \\tfrac14)\\) counts defective items. What distribution does the number of NON-defective items follow?",
        steps: [
          "Non-defectives \\(= 12 - X\\).",
          "Swap \\(p \\to 1 - p\\): \\(12 - X \\sim B(12,\\ 1 - \\tfrac14)\\).",
          "\\(= B(12,\\ \\tfrac34)\\).",
        ],
        answer: "\\(B\\!\\left(12, \\tfrac34\\right)\\)",
      },
      traps: [
        {
          title: "n stays the same — only p flips",
          body:
            "A frequent distractor halves \\(n\\) or keeps \\(p\\) unchanged. The complementary count \\(n - X\\) keeps the SAME \\(n\\) and only swaps \\(p \\leftrightarrow q\\).",
        },
      ],
    },
  ],
};
