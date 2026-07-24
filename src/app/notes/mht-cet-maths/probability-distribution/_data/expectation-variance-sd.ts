import type { SubtopicNote } from "@/app/notes/_types";

export const EXPECTATION_VARIANCE_SD_NOTE: SubtopicNote = {
  subtopicName: "Expectation, Variance and Standard Deviation",
  title: "Expectation, Variance and Standard Deviation",
  oneLineDefinition:
    "Once you can read a probability distribution, three number-summaries follow: the mean E(X) = Σx·P(x) (the long-run average), the variance Var(X) = E(X²) − [E(X)]² (the spread), and the standard deviation SD = √Var — the single most-tested cluster of formulas in this chapter.",
  whyItMatters:
    "This subtopic carries 37 PYQs (7 HARD, 24 MODERATE, 6 EASY) and every year returns three near-identical shapes: compute mean/variance/SD from a pmf, find the expected winnings of a coin or die game, and use the uniform-distribution shortcuts E(X) = (n+1)/2 and Var(X) = (n²−1)/12. " +
    "The traps are mechanical and repeat: squaring the mean instead of averaging the squares, forgetting to convert a CDF to a pmf first, taking SD as the variance (or vice versa), and mishandling the sign of a loss in a game. Nail the four core formulas and this section is free marks.",
  concepts: [
    // 0 — foundation: expectation as the long-run average (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetpd-expectation-idea",
      name: "Expectation as the Long-Run Average",
      intuition:
        "The expected value (mean) of a discrete random variable is a probability-weighted average of the values it can take — each value pulled toward the mean in proportion to how likely it is. If you played the same random experiment a huge number of times and averaged the outcomes, that average would settle at E(X). It need not be an attainable value of X (a die's mean is 3.5).",
      definition:
        "For a discrete random variable X with probability mass function \\(P(X=x_i)=p_i\\):\n" +
        "- **Expected value / mean:** \\(E(X) = \\mu = \\sum_i x_i\\,p_i\\) — multiply each value by its probability and add.\n" +
        "- The probabilities must satisfy \\(\\sum_i p_i = 1\\) and \\(p_i \\ge 0\\); this is always the first thing to check (and how you find an unknown \\(k\\)).\n" +
        "- Expectation is **linear:** \\(E(aX+b) = aE(X)+b\\), and for independent parts \\(E(X+Y)=E(X)+E(Y)\\) (so the mean of the sum on two dice is \\(3.5+3.5=7\\)).",
      formula: {
        label: "Expected value of a discrete random variable",
        latex: "E(X) = \\mu = \\sum_{i} x_i\\,P(X=x_i)",
        symbols: [
          { symbol: "x_i", meaning: "the values X can take" },
          { symbol: "P(X=x_i)", meaning: "the probability of each value (the pmf)" },
          { symbol: "\\(\\mu\\)", meaning: "the mean / expected value — a weighted average, not always an attainable value" },
        ],
      },
      authoredExample: {
        prompt:
          "A random variable X takes values 0, 1, 2 with probabilities 0.5, 0.3, 0.2. Find E(X).",
        steps: [
          "Check the probabilities sum to 1: \\(0.5+0.3+0.2 = 1\\). Good.",
          "Weight each value by its probability: \\(E(X) = 0(0.5) + 1(0.3) + 2(0.2)\\).",
          "Add: \\(E(X) = 0 + 0.3 + 0.4 = 0.7\\).",
        ],
        answer: "\\(E(X) = 0.7\\)",
      },
      selfCheckExample: {
        prompt:
          "A random variable X takes values 1, 2, 3 with probabilities \\(\\tfrac12, \\tfrac13, \\tfrac16\\). Find E(X).",
        steps: [
          "Sum of probabilities: \\(\\tfrac12+\\tfrac13+\\tfrac16 = 1\\). Good.",
          "\\(E(X) = 1\\cdot\\tfrac12 + 2\\cdot\\tfrac13 + 3\\cdot\\tfrac16 = \\tfrac12 + \\tfrac23 + \\tfrac12\\).",
          "Add: \\(E(X) = \\tfrac{3+4+3}{6} = \\tfrac{10}{6} = \\tfrac53\\).",
        ],
        answer: "\\(E(X) = \\tfrac53\\)",
      },
      practiceSet: [
        { prompt: "Write the definition of the mean of a discrete random variable X.", answer: "\\(E(X) = \\sum x_i\\,P(X=x_i)\\)", method: "probability-weighted sum of values" },
        { prompt: "What must the probabilities of any pmf add up to?", answer: "\\(1\\)", method: "\\(\\sum p_i = 1\\), \\(p_i \\ge 0\\)" },
        { prompt: "Compute E(X) for X = 2, 4 with probabilities \\(\\tfrac14, \\tfrac34\\).", answer: "\\(2(\\tfrac14)+4(\\tfrac34) = \\tfrac12+3 = \\tfrac72\\)" },
        { prompt: "Is E(X) always one of the values X can take?", answer: "No — e.g. a fair die has mean 3.5", method: "it is a weighted average" },
      ],
      traps: [
        {
          title: "The mean is a weighted average, not a plain average of the values",
          body:
            "\\(E(X) = \\sum x_i p_i\\) — each value is weighted by its OWN probability. Averaging the values while ignoring the probabilities (e.g. reporting \\(\\tfrac{1+2+3+4}{4}\\) for a non-uniform pmf) is the most common beginner slip.",
        },
        {
          title: "Always verify \\(\\sum p_i = 1\\) before computing anything",
          body:
            "If a table contains an unknown like \\(k\\) or \\(2k\\), the normalization \\(\\sum p_i = 1\\) is the equation that determines it. Compute the mean only after fixing every probability, or the whole answer is off.",
        },
      ],
    },

    // 1 — mean from a pmf (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-mean-from-pmf",
      name: "Computing the Mean E(X) from a Probability Distribution",
      intuition:
        "The workhorse EASY/MODERATE task: a table of values and probabilities is given (sometimes with an unknown k fixed by Σp = 1 first), and you read off E(X) = Σx·P(x) directly. For a sum on two dice, linearity E(X+Y) = E(X)+E(Y) is faster than building the full 2..12 distribution.",
      definition:
        "To find the mean from a pmf:\n" +
        "- If a probability is unknown, first use \\(\\sum P(x) = 1\\) to solve for it.\n" +
        "- Then apply \\(E(X) = \\sum x\\,P(x)\\) row by row.\n" +
        "- **Linearity shortcut:** for the sum of two independent variables, \\(E(X+Y) = E(X)+E(Y)\\). Each fair die has mean \\(\\tfrac{1+2+\\cdots+6}{6} = 3.5\\), so the expected sum of two dice is \\(3.5+3.5 = 7\\) — no need to list all 36 outcomes.",
      formula: {
        label: "Mean of a listed distribution",
        latex: "E(X) = \\sum_{i} x_i\\,P(X=x_i),\\qquad E(X+Y) = E(X)+E(Y)",
      },
      authoredExample: {
        prompt:
          "A random variable X has distribution X = 1, 2, 3 with P(x) = 0.2, 0.5, 0.3. Find the mean E(X).",
        steps: [
          "Check: \\(0.2+0.5+0.3 = 1\\). Good.",
          "\\(E(X) = 1(0.2) + 2(0.5) + 3(0.3)\\).",
          "\\(= 0.2 + 1.0 + 0.9 = 2.1\\).",
        ],
        answer: "\\(E(X) = 2.1\\)",
      },
      selfCheckExample: {
        prompt:
          "For the distribution X = 0, 1, 2, 3, 4, 5 with P(x) = k, 0.3, 0.15, 0.15, 0.1, 2k, find E(X).",
        steps: [
          "Normalize: \\(k + 0.3 + 0.15 + 0.15 + 0.1 + 2k = 1 \\Rightarrow 3k + 0.7 = 1 \\Rightarrow k = 0.1\\).",
          "So the probabilities are 0.1, 0.3, 0.15, 0.15, 0.1, 0.2.",
          "\\(E(X) = 0(0.1)+1(0.3)+2(0.15)+3(0.15)+4(0.1)+5(0.2)\\).",
          "\\(= 0 + 0.3 + 0.3 + 0.45 + 0.4 + 1.0 = 2.45\\).",
        ],
        answer: "\\(E(X) = 2.45\\)",
      },
      practiceSet: [
        { prompt: "Find the expected sum of the numbers on two fair dice.", answer: "\\(7\\)", method: "\\(E = 3.5 + 3.5\\) by linearity" },
        { prompt: "X = 1, 2, 3 with P = 0.1, 0.6, 0.3. Find E(X).", answer: "\\(2.2\\)", method: "\\(0.1+1.2+0.9\\)" },
        { prompt: "The mean of one fair die is?", answer: "\\(3.5\\)", method: "\\(\\tfrac{1+2+\\cdots+6}{6} = \\tfrac{21}{6}\\)" },
        { prompt: "If P = k, 2k, 3k for X = 1, 2, 3, find k.", answer: "\\(k = \\tfrac16\\)", method: "\\(6k = 1\\)" },
      ],
      pyqExampleId: "e74db464-fde4-436e-bc24-5f00bd6399f1", // expected value of sum on two fair dice = 7 (linearity)
      traps: [
        {
          title: "Use linearity for the sum on dice, don't build all 36 outcomes",
          body:
            "The expected sum on two dice is \\(E(X_1)+E(X_2) = 3.5+3.5 = 7\\). You never need the full 2..12 distribution — but if you build it, \\(\\sum x P(x) = \\tfrac{252}{36} = 7\\) confirms the same answer.",
        },
        {
          title: "Solve for the unknown probability before taking the mean",
          body:
            "A row like \\(P(X=5) = 2k\\) is meaningless until \\(\\sum P = 1\\) fixes \\(k\\). Find \\(k\\) first, substitute back, THEN compute \\(E(X) = \\sum xP(x)\\).",
        },
      ],
    },

    // 2 — E(X²), variance, SD (anchored — the core recall formulas)
    {
      kind: "formula" as const,
      slug: "cetpd-variance-sd",
      name: "Variance and Standard Deviation: Var(X) = E(X²) − [E(X)]²",
      intuition:
        "Variance measures spread — the average squared distance of X from its mean. The exam-friendly form never uses the deviations directly: compute E(X²) = Σx²·P(x) with the SAME probabilities, subtract the square of the mean, and you have the variance. Standard deviation is just its square root (and carries the original units). Some questions hand you a CDF F(x) instead of the pmf — difference it into P(x) first.",
      definition:
        "The three core formulas of this subtopic:\n" +
        "- **E(X²):** \\(E(X^2) = \\sum x^2\\,P(x)\\) — square each value, weight by its probability.\n" +
        "- **Variance:** \\(\\mathrm{Var}(X) = E(X^2) - [E(X)]^2\\) (equivalently \\(\\sum(x-\\mu)^2 P(x)\\), but the E(X²) form is faster).\n" +
        "- **Standard deviation:** \\(\\sigma = \\sqrt{\\mathrm{Var}(X)}\\).\n" +
        "- **From a CDF:** if F(x) is given, recover the pmf by \\(P(x_i) = F(x_i) - F(x_{i-1})\\) (with \\(P(x_1)=F(x_1)\\)) before computing E(X) or E(X²).",
      formula: {
        label: "Variance and standard deviation",
        latex:
          "\\mathrm{Var}(X) = E(X^2) - [E(X)]^2,\\qquad E(X^2) = \\sum x^2 P(x),\\qquad \\sigma = \\sqrt{\\mathrm{Var}(X)}",
        symbols: [
          { symbol: "E(X^2)", meaning: "average of the SQUARES: \\(\\sum x^2 P(x)\\)" },
          { symbol: "[E(X)]^2", meaning: "the SQUARE of the mean — a different, smaller number in general" },
          { symbol: "\\(\\sigma\\)", meaning: "standard deviation = \\(\\sqrt{\\text{Var}}\\), in the same units as X" },
        ],
      },
      authoredExample: {
        prompt:
          "A random variable X takes values 1, 2, 3 with probabilities 0.2, 0.3, 0.5. Find its variance and standard deviation.",
        steps: [
          "Mean: \\(E(X) = 1(0.2)+2(0.3)+3(0.5) = 0.2+0.6+1.5 = 2.3\\).",
          "\\(E(X^2) = 1(0.2)+4(0.3)+9(0.5) = 0.2+1.2+4.5 = 5.9\\).",
          "Variance: \\(\\mathrm{Var}(X) = 5.9 - (2.3)^2 = 5.9 - 5.29 = 0.61\\).",
          "Standard deviation: \\(\\sigma = \\sqrt{0.61} \\approx 0.781\\).",
        ],
        answer: "\\(\\mathrm{Var}(X) = 0.61,\\quad \\sigma = \\sqrt{0.61}\\approx 0.78\\)",
      },
      selfCheckExample: {
        prompt:
          "The cumulative distribution function of X is F(-1) = 0.3, F(0) = 0.7, F(1) = 0.8, F(2) = 1. Find E(X²).",
        steps: [
          "Difference the CDF to get the pmf: \\(P(-1)=0.3,\\ P(0)=0.7-0.3=0.4,\\ P(1)=0.8-0.7=0.1,\\ P(2)=1-0.8=0.2\\).",
          "\\(E(X^2) = (-1)^2(0.3) + 0^2(0.4) + 1^2(0.1) + 2^2(0.2)\\).",
          "\\(= 0.3 + 0 + 0.1 + 0.8 = 1.2\\).",
        ],
        answer: "\\(E(X^2) = 1.2\\)",
      },
      practiceSet: [
        { prompt: "State the variance formula in terms of E(X²) and E(X).", answer: "\\(\\mathrm{Var}(X) = E(X^2) - [E(X)]^2\\)" },
        { prompt: "If E(X) = 3 and E(X²) = 9.6, find the variance.", answer: "\\(0.6\\)", method: "\\(9.6 - 9\\)" },
        { prompt: "How do you get the pmf from a CDF F(x)?", answer: "\\(P(x_i) = F(x_i) - F(x_{i-1})\\)", method: "difference consecutive CDF values" },
        { prompt: "If Var(X) = 4, what is the standard deviation?", answer: "\\(2\\)", method: "\\(\\sigma = \\sqrt{\\mathrm{Var}}\\)" },
      ],
      pyqExampleId: "7731497c-01dc-41dd-a874-c95c5a092492", // pmf 0.1..0.4 on 1..4 → mean 3, SD 1
      traps: [
        {
          title: "E(X²) is NOT [E(X)]²",
          body:
            "\\(E(X^2) = \\sum x^2 P(x)\\) averages the squares; \\([E(X)]^2\\) squares the average. They are equal only when the variance is zero. The whole variance formula is the gap between them: \\(\\mathrm{Var}(X) = E(X^2) - [E(X)]^2\\).",
        },
        {
          title: "Convert a CDF to a pmf before computing an expectation",
          body:
            "If the question gives \\(F(x)\\) (cumulative), you must first difference it: \\(P(x_i) = F(x_i) - F(x_{i-1})\\). Plugging the CDF values straight into \\(\\sum x^2 F(x)\\) is a classic wrong answer.",
        },
        {
          title: "Standard deviation vs variance — don't hand back the wrong one",
          body:
            "SD \\(= \\sqrt{\\mathrm{Var}}\\). If the variance works out to 1, the SD is also 1; if the variance is 2, the SD is \\(\\sqrt2\\), not 2. Options are deliberately built to punish reporting the variance when the SD is asked (and vice versa).",
        },
        {
          title: "Variance is never negative",
          body:
            "\\(\\mathrm{Var}(X) = E(X^2) - [E(X)]^2 \\ge 0\\) always. If you get a negative variance, you have squared the mean wrong or mixed up E(X²) and [E(X)]² — recheck before choosing an option.",
        },
      ],
    },

    // 3 — expected value of a payoff / game (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-expected-payoff",
      name: "Expected Winnings of a Game: E(g(X)) = Σ g(x)·P(x)",
      intuition:
        "The recurring 'game' genre: a payoff (win some money on one outcome, lose money on another) is a function g(X) of the random outcome, and its expected value is the probability-weighted sum of the payoffs. A LOSS enters as a negative amount. If the expected value is 0 the game is fair; positive means a long-run gain, negative a long-run loss.",
      definition:
        "For a payoff g(X):\n" +
        "- **Expected payoff:** \\(E(g(X)) = \\sum g(x)\\,P(x)\\) — weight each cash outcome (a gain positive, a loss negative) by its probability.\n" +
        "- Typical 3-coin game: \\(P(\\text{all heads or all tails}) = \\tfrac{2}{8} = \\tfrac14\\) and \\(P(\\text{one or two heads}) = \\tfrac{6}{8} = \\tfrac34\\).\n" +
        "- **Variance of a winning amount** uses the same E(X²) − [E(X)]² machinery on the payoff values: list the winnings with their probabilities, then apply the variance formula.\n" +
        "- \\(E = 0\\) ⟹ fair game; \\(E > 0\\) ⟹ expected gain; \\(E < 0\\) ⟹ expected loss.",
      formula: {
        label: "Expected value of a payoff (function of X)",
        latex: "E\\big(g(X)\\big) = \\sum g(x)\\,P(x)",
        symbols: [
          { symbol: "g(x)", meaning: "the cash payoff for outcome x — positive for a gain, NEGATIVE for a loss" },
          { symbol: "P(x)", meaning: "the probability of that outcome" },
        ],
      },
      authoredExample: {
        prompt:
          "Two coins are tossed. A player wins ₹6 if two heads appear, and loses ₹3 otherwise. Find the expected gain per game.",
        steps: [
          "Outcomes: two heads with \\(P = \\tfrac14\\) (win +6); otherwise with \\(P = \\tfrac34\\) (loss −3).",
          "\\(E = (+6)\\cdot\\tfrac14 + (-3)\\cdot\\tfrac34\\).",
          "\\(= \\tfrac{6}{4} - \\tfrac{9}{4} = -\\tfrac{3}{4} = -0.75\\).",
        ],
        answer: "Expected loss of ₹0.75 per game (\\(E = -0.75\\)).",
      },
      selfCheckExample: {
        prompt:
          "A player tosses two coins and wins ₹10 for 2 heads, ₹5 for one head, ₹2 for no head. Find the variance of the winning amount.",
        steps: [
          "Winnings X = 10, 5, 2 with probabilities \\(\\tfrac14, \\tfrac12, \\tfrac14\\).",
          "\\(E(X) = 10\\cdot\\tfrac14 + 5\\cdot\\tfrac12 + 2\\cdot\\tfrac14 = \\tfrac{10}{4}+\\tfrac{10}{4}+\\tfrac{2}{4} = \\tfrac{22}{4} = \\tfrac{11}{2}\\).",
          "\\(E(X^2) = 100\\cdot\\tfrac14 + 25\\cdot\\tfrac12 + 4\\cdot\\tfrac14 = 25 + 12.5 + 1 = \\tfrac{77}{2}\\).",
          "\\(\\mathrm{Var}(X) = \\tfrac{77}{2} - \\left(\\tfrac{11}{2}\\right)^2 = 38.5 - 30.25 = 8.25\\).",
        ],
        answer: "\\(\\mathrm{Var}(X) = 8.25\\)",
      },
      practiceSet: [
        { prompt: "In a 3-coin toss, what is P(all heads or all tails)?", answer: "\\(\\tfrac14\\)", method: "\\(\\tfrac{2}{8}\\)" },
        { prompt: "A game pays +40 with probability \\(\\tfrac14\\) and −40 with probability \\(\\tfrac34\\). Expected gain?", answer: "\\(-20\\)", method: "\\(40(\\tfrac14) - 40(\\tfrac34)\\)" },
        { prompt: "What does E = 0 mean for a game?", answer: "It is a fair game — no expected gain or loss", method: "expected payoff is zero" },
        { prompt: "How does a LOSS enter the expected-value sum?", answer: "As a NEGATIVE payoff", method: "\\(g(x) < 0\\)" },
      ],
      pyqExampleId: "a3a54119-cd1b-4984-bd02-54597edd5f4d", // 3 coins: win ₹150 (all H/all T), lose ₹50 else → E = 0 (fair)
      traps: [
        {
          title: "A loss is a negative payoff — carry the minus sign",
          body:
            "In a game that pays ₹150 on all-heads/all-tails and requires paying ₹50 otherwise, the second term is \\(-50\\), not \\(+50\\): \\(E = \\tfrac14(150) + \\tfrac34(-50) = 37.5 - 37.5 = 0\\). Dropping the minus turns a fair game into a phantom win.",
        },
        {
          title: "Get the all-heads/all-tails probability right",
          body:
            "With 3 coins there are 8 equally-likely outcomes. All heads OR all tails is 2 of them, so \\(P = \\tfrac{2}{8} = \\tfrac14\\); exactly one or two heads is the remaining 6, so \\(P = \\tfrac{6}{8} = \\tfrac34\\). Using \\(\\tfrac18\\) (only all heads) mis-weights the whole expectation.",
        },
        {
          title: "Variance of a winning amount is still E(X²) − [E(X)]²",
          body:
            "Treat the cash winnings as the values of X, list them with their probabilities, and apply the ordinary variance formula. Don't confuse the variance of the payoff with the expected payoff itself.",
        },
      ],
    },

    // 4 — uniform distribution on 1..n (anchored — key named formulas)
    {
      kind: "formula" as const,
      slug: "cetpd-uniform-mean-variance",
      name: "Uniform Distribution on 1 to n: E(X) = (n+1)/2, Var(X) = (n²−1)/12",
      intuition:
        "When X takes the equally-likely values 1, 2, …, n each with probability 1/n, two clean formulas drop out and are worth memorising: the mean is the midpoint (n+1)/2 and the variance is (n²−1)/12. These turn 'Var:E = 4:1, find n' and 'Var = E, find n' into one-line algebra. The same pmf sometimes arrives as P(x) = 2x / [n(n+1)], which is NOT uniform — derive its mean from Σx²·(weight).",
      definition:
        "For the discrete uniform distribution on \\(\\{1,2,\\ldots,n\\}\\), \\(P(x)=\\tfrac1n\\):\n" +
        "- **Mean:** \\(E(X) = \\dfrac{n+1}{2}\\) (the middle value).\n" +
        "- **Variance:** \\(\\mathrm{Var}(X) = \\dfrac{n^2-1}{12}\\).\n" +
        "- **Handy ratio:** \\(\\dfrac{\\mathrm{Var}(X)}{E(X)} = \\dfrac{(n^2-1)/12}{(n+1)/2} = \\dfrac{n-1}{6}\\) — the fastest route to 'find n' questions.\n" +
        "- A weighted pmf \\(P(x) = \\dfrac{2x}{n(n+1)}\\) on \\(1,\\ldots,n\\) is a different distribution: \\(E(X) = \\sum x\\cdot\\dfrac{2x}{n(n+1)} = \\dfrac{2}{n(n+1)}\\cdot\\dfrac{n(n+1)(2n+1)}{6} = \\dfrac{2n+1}{3}\\).",
      formula: {
        label: "Discrete uniform on 1..n",
        latex:
          "E(X) = \\dfrac{n+1}{2},\\qquad \\mathrm{Var}(X) = \\dfrac{n^2-1}{12},\\qquad \\dfrac{\\mathrm{Var}(X)}{E(X)} = \\dfrac{n-1}{6}",
        symbols: [
          { symbol: "n", meaning: "the number of equally-likely integer values 1, 2, …, n" },
        ],
      },
      authoredExample: {
        prompt:
          "A random variable X takes the values 1, 2, …, n each with probability 1/n. If Var(X) = E(X), find n.",
        steps: [
          "Uniform formulas: \\(E(X) = \\dfrac{n+1}{2}\\), \\(\\mathrm{Var}(X) = \\dfrac{n^2-1}{12}\\).",
          "Set them equal: \\(\\dfrac{n^2-1}{12} = \\dfrac{n+1}{2}\\).",
          "Factor \\(n^2-1 = (n-1)(n+1)\\) and cancel the common \\((n+1)\\): \\(\\dfrac{n-1}{12} = \\dfrac{1}{2}\\).",
          "So \\(n - 1 = 6\\), giving \\(n = 7\\).",
        ],
        answer: "\\(n = 7\\)",
      },
      selfCheckExample: {
        prompt:
          "A random variable X takes the values 1, 2, …, n with equal probability. If Var(X) : E(X) = 4 : 1, find n.",
        steps: [
          "Use the ratio shortcut: \\(\\dfrac{\\mathrm{Var}(X)}{E(X)} = \\dfrac{n-1}{6}\\).",
          "Set \\(\\dfrac{n-1}{6} = 4\\).",
          "So \\(n - 1 = 24\\), giving \\(n = 25\\).",
        ],
        answer: "\\(n = 25\\)",
      },
      practiceSet: [
        { prompt: "Mean of the uniform distribution on 1, 2, …, n?", answer: "\\(\\dfrac{n+1}{2}\\)" },
        { prompt: "Variance of the uniform distribution on 1, 2, …, n?", answer: "\\(\\dfrac{n^2-1}{12}\\)" },
        { prompt: "For the uniform on 1..n, evaluate Var(X)/E(X).", answer: "\\(\\dfrac{n-1}{6}\\)", method: "\\(n^2-1 = (n-1)(n+1)\\)" },
        { prompt: "E(X) if \\(P(x) = \\dfrac{2x}{n(n+1)}\\) on \\(1,\\ldots,n\\)?", answer: "\\(\\dfrac{2n+1}{3}\\)", method: "\\(\\sum x^2 = \\tfrac{n(n+1)(2n+1)}{6}\\)" },
      ],
      pyqExampleId: "5825e8c1-31d6-4463-ac29-99a33c4aebaa", // uniform 1..k → Var = (k²−1)/12
      traps: [
        {
          title: "Memorise both uniform formulas — mean (n+1)/2 AND variance (n²−1)/12",
          body:
            "The variance is \\(\\dfrac{n^2-1}{12}\\), not \\(\\dfrac{n^2-1}{6}\\) or \\(\\dfrac{n^2+1}{12}\\) — those are the standard distractors. And E(X) is \\(\\dfrac{n+1}{2}\\), the midpoint, not \\(\\dfrac{n}{2}\\).",
        },
        {
          title: "Cancel the (n+1) factor for 'find n' questions",
          body:
            "Equations like \\(\\dfrac{n^2-1}{12} = \\dfrac{n+1}{2}\\) collapse instantly once you write \\(n^2-1 = (n-1)(n+1)\\) and cancel the shared \\((n+1)\\). This avoids solving a full quadratic.",
        },
        {
          title: "P(x) = 2x/[n(n+1)] is NOT the uniform distribution",
          body:
            "When probability grows with x, you cannot use \\(E = (n+1)/2\\). Compute \\(E(X) = \\sum x\\cdot\\dfrac{2x}{n(n+1)}\\) using \\(\\sum x^2 = \\tfrac{n(n+1)(2n+1)}{6}\\), which gives \\(\\dfrac{2n+1}{3}\\).",
        },
      ],
    },

    // 5 — solving for unknown probabilities using the mean (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-unknown-prob-from-mean",
      name: "Finding Unknown Probabilities from the Mean and ΣP = 1",
      intuition:
        "Two unknowns in a pmf need two equations, and the exam always provides them: the normalization ΣP = 1 and a given value of E(X) (or an extra relation like P(X=3) = 2P(X=1)). Set up the two linear equations and solve — the classic 'find A and B' or 'find P(X=0)' shape. When p varies over a range, non-negativity of every probability bounds p, and the mean's extreme values sit at those bounds.",
      definition:
        "The two-equation setup:\n" +
        "- **Equation 1 (normalization):** \\(\\sum P(x) = 1\\).\n" +
        "- **Equation 2 (mean or an extra relation):** \\(E(X) = \\sum x\\,P(x) = \\text{given}\\), or a stated link such as \\(P(X=3)=2P(X=1)\\).\n" +
        "- Solve the linear system for the unknown probabilities.\n" +
        "- **Range problems:** when the probabilities depend on a parameter p, impose \\(0 \\le P(x) \\le 1\\) on EVERY row to get an interval for p; the mean (a linear function of p) attains its extreme values at the endpoints of that interval.",
      formula: {
        label: "The determining system",
        latex:
          "\\sum P(x) = 1 \\quad\\text{and}\\quad E(X) = \\sum x\\,P(x) = \\mu_{\\text{given}}",
      },
      authoredExample: {
        prompt:
          "A random variable X takes values 0, 10, 20 with probabilities 0.2, A, B. If E(X) = 11, find A and B.",
        steps: [
          "Normalization: \\(0.2 + A + B = 1 \\Rightarrow A + B = 0.8\\).",
          "Mean: \\(0(0.2) + 10A + 20B = 11 \\Rightarrow 10A + 20B = 11\\).",
          "From the first equation \\(A = 0.8 - B\\); substitute: \\(10(0.8 - B) + 20B = 11 \\Rightarrow 8 + 10B = 11 \\Rightarrow B = 0.3\\).",
          "Then \\(A = 0.8 - 0.3 = 0.5\\).",
        ],
        answer: "\\(A = 0.5,\\ B = 0.3\\)",
      },
      selfCheckExample: {
        prompt:
          "A random variable X takes the values 0, 1, 2, 3 and has mean 1.3. Given P(X=3) = 2P(X=1) and P(X=2) = 0.3, find P(X=0).",
        steps: [
          "Let \\(P(X=1) = a\\), so \\(P(X=3) = 2a\\).",
          "Mean: \\(0\\cdot P(0) + 1\\cdot a + 2(0.3) + 3(2a) = 1.3 \\Rightarrow a + 0.6 + 6a = 1.3 \\Rightarrow 7a = 0.7 \\Rightarrow a = 0.1\\).",
          "So \\(P(X=1) = 0.1\\), \\(P(X=3) = 0.2\\).",
          "Normalization: \\(P(X=0) = 1 - 0.1 - 0.3 - 0.2 = 0.4\\).",
        ],
        answer: "\\(P(X=0) = 0.4\\)",
      },
      practiceSet: [
        { prompt: "How many equations are needed to fix two unknown probabilities?", answer: "Two — \\(\\sum P = 1\\) and a given E(X) (or extra relation)" },
        { prompt: "If \\(\\tfrac15 + A + B = 1\\), what is A + B?", answer: "\\(\\tfrac45\\)" },
        { prompt: "What bounds a parameter p appearing inside probabilities?", answer: "\\(0 \\le P(x) \\le 1\\) for every row", method: "non-negativity of each probability" },
        { prompt: "A mean that is linear in p attains its extremes where?", answer: "At the endpoints of p's allowed interval" },
      ],
      pyqExampleId: "f98d8c31-4475-488c-80b3-c0ebf032558d", // X = 30,10,−10 with P = 1/5, A, B; E(X)=4 → AB = 3/20
      traps: [
        {
          title: "Watch the sign in the E(X) equation",
          body:
            "For X = 30, 10, −10 with P = 1/5, A, B and E(X) = 4: \\(6 + 10A - 10B = 4\\), so \\(A - B = -\\tfrac15\\) (a MINUS). A sign slip here flips A and B and gives the wrong product AB.",
        },
        {
          title: "Use the extra stated relation as your second equation",
          body:
            "A clue like \\(P(X=3) = 2P(X=1)\\) is not decoration — it is one of the two equations you need. Combined with the mean and \\(\\sum P = 1\\), it pins every probability down.",
        },
        {
          title: "For range problems, apply non-negativity to EVERY row",
          body:
            "When probabilities like \\(\\tfrac{1+p}{5}, \\tfrac{2-2p}{5}, \\tfrac{2-p}{5}, \\tfrac{2p}{5}\\) contain p, each must lie in \\([0,1]\\). The tightest of those inequalities gives p's actual range; the mean's min/max occur at the ends of that range, not by guessing.",
        },
      ],
    },

    // 6 — means of standard distributions (geometric, hypergeometric, larger-of-two) (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-standard-distribution-means",
      name: "Expectation of Standard Distributions: Geometric and Hypergeometric",
      intuition:
        "Some questions dress a named distribution in a story. 'Roll until success' is GEOMETRIC — its mean number of trials is 1/p. 'Draw without replacement and count the successes' is HYPERGEOMETRIC — its mean is nK/N. And a 'card-drawing, then 2E(X)+3E(X²)' problem just needs the small pmf built from combinations, then the two moments. Recognise the shape and the mean often takes one line.",
      definition:
        "Standard-distribution means that appear here:\n" +
        "- **Geometric (trials until first success), success probability p:** mean \\(= \\dfrac{1}{p}\\). Rolling an n-faced die until a number \\(< n\\) shows has \\(p = \\dfrac{n-1}{n}\\), so mean \\(= \\dfrac{n}{n-1}\\).\n" +
        "- **Hypergeometric (n drawn without replacement from N containing K successes):** \\(E(X) = \\dfrac{nK}{N}\\).\n" +
        "- **Small-pmf via combinations:** for 'X = number of queens in 2 cards' build \\(P(X=k) = \\dfrac{\\binom{4}{k}\\binom{48}{2-k}}{\\binom{52}{2}}\\), then \\(E(X)=\\sum kP\\), \\(E(X^2)=\\sum k^2 P\\).\n" +
        "- **Larger-of-two:** X = larger of two numbers drawn from \\(\\{1,\\ldots,m\\}\\) has \\(P(X=k) = \\dfrac{k-1}{\\binom{m}{2}}\\); then \\(E(X)=\\sum k P(X=k)\\).",
      formula: {
        label: "Means of named distributions",
        latex:
          "\\text{Geometric: } E(X) = \\dfrac{1}{p},\\qquad \\text{Hypergeometric: } E(X) = \\dfrac{nK}{N}",
        symbols: [
          { symbol: "p", meaning: "success probability of one trial (geometric)" },
          { symbol: "N", meaning: "total items in the lot (hypergeometric)" },
          { symbol: "K", meaning: "number of successes in the lot" },
          { symbol: "n", meaning: "number of items drawn without replacement" },
        ],
      },
      authoredExample: {
        prompt:
          "From a lot of 20 items containing 5 defectives, 2 items are drawn at random without replacement. Find the expected number of defectives.",
        steps: [
          "This is hypergeometric with \\(N = 20\\), \\(K = 5\\), \\(n = 2\\).",
          "Mean: \\(E(X) = \\dfrac{nK}{N} = \\dfrac{2 \\times 5}{20}\\).",
          "\\(= \\dfrac{10}{20} = 0.5\\).",
        ],
        answer: "\\(E(X) = 0.5\\) defectives",
      },
      selfCheckExample: {
        prompt:
          "A fair n-faced die is rolled repeatedly until a number less than n appears. If the mean number of tosses required is n/9, find n.",
        steps: [
          "'Until success' is geometric; success = a face \\(< n\\), so \\(p = \\dfrac{n-1}{n}\\).",
          "Mean of tosses \\(= \\dfrac{1}{p} = \\dfrac{n}{n-1}\\).",
          "Set equal to the given mean: \\(\\dfrac{n}{n-1} = \\dfrac{n}{9}\\).",
          "So \\(n - 1 = 9\\), giving \\(n = 10\\).",
        ],
        answer: "\\(n = 10\\)",
      },
      practiceSet: [
        { prompt: "Mean number of trials until first success (probability p)?", answer: "\\(\\dfrac{1}{p}\\)", method: "geometric distribution" },
        { prompt: "Expected successes when drawing n from N with K successes (no replacement)?", answer: "\\(\\dfrac{nK}{N}\\)", method: "hypergeometric mean" },
        { prompt: "Roll an n-faced die until a face < n appears: mean tosses?", answer: "\\(\\dfrac{n}{n-1}\\)", method: "\\(p = \\tfrac{n-1}{n}\\), mean \\(= 1/p\\)" },
        { prompt: "From 20 baskets with 6 defective, draw 2 without replacement: E(defectives)?", answer: "\\(0.6\\)", method: "\\(\\tfrac{2\\times 6}{20}\\)" },
      ],
      pyqExampleId: "4fff47c2-da49-4abd-adae-4a6e7da3403e", // 20 baskets, 6 defective, draw 2 → hypergeometric E = nK/N = 0.6
      traps: [
        {
          title: "'Until success' means geometric, mean = 1/p",
          body:
            "The expected number of trials to the first success is \\(\\dfrac1p\\). Rolling an n-faced die until a number \\(< n\\) appears has \\(p = \\dfrac{n-1}{n}\\), so the mean is \\(\\dfrac{n}{n-1}\\) — don't confuse this with the value of a single roll.",
        },
        {
          title: "Hypergeometric mean is nK/N — no replacement needed for the mean",
          body:
            "Even though sampling is without replacement, the expected count of successes is simply \\(\\dfrac{nK}{N}\\) (the same as the with-replacement binomial mean). You do NOT need to build the full pmf just to get the mean.",
        },
        {
          title: "For E(X²) build the small combination pmf first",
          body:
            "A question asking for \\(2E(X)+3E(X^2)\\) (e.g. queens in 2 cards) needs both moments: build \\(P(X=0),P(X=1),P(X=2)\\) from \\(\\binom{}{}\\)-ratios, then compute \\(E(X)=\\sum kP\\) and \\(E(X^2)=\\sum k^2 P\\) with the SAME probabilities.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Probability Distribution — reading a pmf and finding k",
      href: "/notes/mht-cet-maths/probability-distribution",
    },
    {
      label: "Binomial Distribution (NDA Maths) — mean np, variance npq",
      href: "/notes/nda-maths/binomial-distribution",
    },
  ],
};
