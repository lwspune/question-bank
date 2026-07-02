import type { SubtopicNote } from "@/app/notes/_types";

export const DISCRETE_RV_NOTE: SubtopicNote = {
  subtopicName: "Discrete Random Variables, PMF and CDF",
  title: "Discrete Random Variables, PMF and CDF",
  oneLineDefinition:
    "A random variable assigns a number to each outcome; its probability mass function lists P(X=x) for every value, obeys 0 ≤ P ≤ 1 and ΣP = 1, and its cumulative distribution function F(x) = P(X ≤ x) accumulates those probabilities.",
  whyItMatters:
    "This is the technique-richest subtopic of the chapter: 29 PYQs (3 EASY, 22 MODERATE, 4 HARD). The bank tests four separate skills that all begin from ΣP = 1 — solving a linear-k table, a quadratic-in-k table (the 6k²+5k−1 and 10k²+9k−1 factorings recur almost every year), an exponential pmf, and an infinite arithmetico-geometric pmf — plus building a distribution from a coin/card/draw experiment, reading a CDF, and normalising a continuous pdf. " +
    "Expectation and variance are taught separately; here the whole game is finding the constant, reading a range probability, and constructing the table correctly.",
  concepts: [
    // 0 — foundation: discrete RV and its PMF (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetpd-rv-pmf-foundation",
      name: "Discrete Random Variable and Its Probability Mass Function",
      intuition:
        "A random variable X is a rule that turns each outcome of an experiment into a number (heads count, number drawn, tosses needed). It is DISCRETE when it takes isolated values — 0, 1, 2, … The probability mass function (pmf) is simply the table that lists P(X = x) against each value x.",
      definition:
        "A **probability mass function** \\(P(X=x)\\) of a discrete random variable must satisfy TWO axioms:\n" +
        "- **Each probability is valid:** \\(0 \\le P(X=x_i) \\le 1\\) for every value \\(x_i\\).\n" +
        "- **The total mass is one:** \\(\\displaystyle\\sum_i P(X=x_i) = 1\\) — summed over ALL values the variable can take.\n" +
        "These two rules are the engine of the whole subtopic: every 'find the constant' question is just ΣP = 1 solved for the unknown, and every 'is this a valid distribution?' check is these two axioms.",
      formula: {
        label: "The two pmf axioms",
        latex:
          "0 \\le P(X=x_i) \\le 1, \\qquad \\sum_{i} P(X=x_i) = 1",
        symbols: [
          { symbol: "X", meaning: "the discrete random variable" },
          { symbol: "x_i", meaning: "each value X can take" },
          { symbol: "P(X=x_i)", meaning: "the probability mass at that value" },
        ],
      },
      authoredExample: {
        prompt:
          "Is \\(P(X=x) = \\dfrac{x}{6}\\) for \\(x = 1,2,3\\) a valid pmf?",
        steps: [
          "Each value: \\(P(1)=\\tfrac16,\\ P(2)=\\tfrac26,\\ P(3)=\\tfrac36\\) — all lie in \\([0,1]\\). ✓",
          "Sum: \\(\\tfrac16+\\tfrac26+\\tfrac36 = \\tfrac66 = 1\\). ✓",
          "Both axioms hold, so it is a valid pmf.",
        ],
        answer: "Yes — all probabilities are in \\([0,1]\\) and they sum to 1.",
      },
      traps: [
        {
          title: "A pmf must sum to exactly 1, over ALL values",
          body:
            "The single most common error is summing over only some of the listed values (forgetting the last row, or a \\(P=0\\) row). Every value the variable can take contributes to \\(\\sum P(X=x)=1\\). If a row shows \\(P=0\\) it still belongs in the table — it just contributes nothing to the sum.",
        },
        {
          title: "Probabilities can never exceed 1 or go negative",
          body:
            "When you solve \\(\\sum P = 1\\) for a constant and get two roots (say from a quadratic), reject any root that makes some \\(P(X=x)\\) negative or bigger than 1. Only the root keeping every entry in \\([0,1]\\) is admissible.",
        },
      ],
    },

    // 1 — constant k from a linear/finite table (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-constant-linear",
      name: "Finding the Constant k from a Linear Probability Table",
      intuition:
        "The most direct 'find k' shape: every entry is a whole-number multiple of k (or a simple piecewise rule in k). Add them, set the total to 1, and one division gives k. Once k is known, any range probability is just adding the right cells.",
      definition:
        "When the pmf entries are linear in \\(k\\) (e.g. \\(2k, k, 2k, 4k, k\\), or a piecewise rule \\(P=kx\\)/\\(P=k(5-x)\\)):\n" +
        "- **Sum all entries** and set the total equal to 1: \\(\\sum P(X=x)=1\\).\n" +
        "- **Solve the resulting LINEAR equation** for \\(k\\) — a single step.\n" +
        "- **Substitute back** to read off any required probability or range.\n" +
        "If a fixed number appears (e.g. \\(P(0)=0.1\\) with the rest in \\(k\\)), include it in the sum: \\(0.1 + (\\text{terms in }k) = 1\\).",
      formula: {
        label: "Linear normalisation",
        latex:
          "\\sum_x P(X=x) = 1 \\;\\Longrightarrow\\; (\\text{multiple of } k) = 1 \\;\\Longrightarrow\\; k = \\frac{1}{\\text{that multiple}}",
      },
      authoredExample: {
        prompt:
          "For the distribution \\(P(X=x)\\): \\(x=1,2,3,4\\) with \\(P = k, 3k, 3k, k\\), find \\(k\\) and \\(P(X \\le 2)\\).",
        steps: [
          "Sum: \\(k + 3k + 3k + k = 8k\\).",
          "Set \\(8k = 1 \\Rightarrow k = \\tfrac18\\).",
          "\\(P(X\\le 2) = P(1)+P(2) = k + 3k = 4k = \\tfrac48 = \\tfrac12\\).",
        ],
        answer: "\\(k = \\tfrac18,\\quad P(X\\le 2) = \\tfrac12\\)",
      },
      selfCheckExample: {
        prompt:
          "A pmf has \\(P(0)=0.1\\), \\(P(1)=k\\), \\(P(2)=2k\\), \\(P(3)=2k\\), \\(P(4)=k\\). Find the probability of at least 2.",
        steps: [
          "Sum: \\(0.1 + k + 2k + 2k + k = 0.1 + 6k = 1 \\Rightarrow k = 0.15\\).",
          "\\(P(X\\ge 2) = 1 - P(0) - P(1) = 1 - (0.1 + 0.15) = 1 - 0.25\\).",
        ],
        answer: "\\(P(X\\ge 2) = 0.75\\)",
      },
      practiceSet: [
        { prompt: "Entries \\(2k, k, 2k, 4k, k\\) sum to 1. Find \\(k\\).", answer: "\\(k = \\tfrac1{10}\\)", method: "\\(10k=1\\)" },
        { prompt: "Entries \\(k, 2k, 3k, 4k, 4k, 3k, 2k, k, k\\) sum to 1. Find \\(k\\).", answer: "\\(k = \\tfrac1{21}\\)", method: "\\(21k=1\\)" },
        { prompt: "For \\(P = k, 3k, 3k, k\\) on \\(x=1,2,3,4\\), find \\(P(X\\ge 3)\\).", answer: "\\(\\tfrac12\\)", method: "\\(3k+k=4k=\\tfrac48\\)" },
        { prompt: "If \\(P(0)=0.1\\) and remaining terms total \\(6k\\), find \\(k\\).", answer: "\\(k = 0.15\\)", method: "\\(0.1+6k=1\\)" },
      ],
      pyqExampleId: "bc19e55b-e61e-426d-9aad-b8511eb1a990", // table k..k, 21k=1 → k=1/21, P(3<x≤6)=3/7
      traps: [
        {
          title: "Include every row — even a fixed number — in ΣP = 1",
          body:
            "In \\(P(0)=0.1,\\ P(1)=k,\\dots\\) the fixed \\(0.1\\) is part of the total: \\(0.1 + 6k = 1\\), not \\(6k = 1\\). Omitting the constant term gives \\(k = \\tfrac16\\) instead of the correct \\(0.15\\).",
        },
        {
          title: "Match the range operator exactly: strict vs inclusive",
          body:
            "\\(P(3 < X \\le 6)\\) means \\(P(4)+P(5)+P(6)\\) — it EXCLUDES \\(x=3\\) and INCLUDES \\(x=6\\). Reading it as \\(P(3)+P(4)+P(5)+P(6)\\) or dropping \\(x=6\\) is the classic off-by-one range slip.",
        },
      ],
    },

    // 2 — range probability from the table (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-range-probability",
      name: "Reading a Range Probability from the pmf Table",
      intuition:
        "Once the pmf is known, a range probability is a sum of cells. The only skill is decoding the inequality correctly — which endpoints are included — and using the complement \\(P(X\\ge a)=1-P(X<a)\\) when it is shorter.",
      definition:
        "Translate the inequality into exactly which values to add:\n" +
        "- \\(P(X < a)\\): all values strictly below \\(a\\).\n" +
        "- \\(P(a \\le X < b)\\): from \\(a\\) up to but NOT including \\(b\\).\n" +
        "- \\(P(X \\ge a) = 1 - P(X < a)\\) — use the complement to avoid adding a long tail.\n" +
        "- \\(P(X > a) = 1 - P(X \\le a)\\).\n" +
        "The complement rule is the workhorse whenever the 'up to' side has fewer cells than the 'from' side.",
      formula: {
        label: "Complement for a tail probability",
        latex:
          "P(X \\ge a) = 1 - P(X < a) = 1 - \\sum_{x < a} P(X=x)",
      },
      authoredExample: {
        prompt:
          "A pmf on \\(x=0,1,2,3,4,5\\) is \\(P = 0.05, 0.15, 0.30, 0.25, 0.15, 0.10\\). Find \\(P(2 \\le X < 5)\\).",
        steps: [
          "\\(2 \\le X < 5\\) means the values \\(2, 3, 4\\) — include \\(2\\), exclude \\(5\\).",
          "\\(P(2\\le X<5) = P(2)+P(3)+P(4) = 0.30 + 0.25 + 0.15 = 0.70\\).",
          "Complement check: \\(1 - P(0) - P(1) - P(5) = 1 - 0.05 - 0.15 - 0.10 = 0.70\\). ✓",
        ],
        answer: "\\(P(2 \\le X < 5) = 0.70\\)",
      },
      selfCheckExample: {
        prompt:
          "For a pmf with entries \\(K, 2K, K^2, 2K, 5K^2\\) on \\(x=1,2,3,4,5\\), find \\(P(X > 2)\\).",
        steps: [
          "Sum \\(= 6K^2 + 5K = 1 \\Rightarrow 6K^2+5K-1=0 \\Rightarrow (6K-1)(K+1)=0\\), so \\(K=\\tfrac16\\).",
          "\\(P(X>2) = 1 - P(X\\le 2) = 1 - (K + 2K) = 1 - 3K\\).",
          "\\(= 1 - 3\\cdot\\tfrac16 = 1 - \\tfrac12 = \\tfrac12\\).",
        ],
        answer: "\\(P(X > 2) = \\tfrac12\\)",
      },
      practiceSet: [
        { prompt: "Given \\(k=\\tfrac1{10}\\) and entries \\(2k,k,2k,4k,k\\), find \\(P(X<3)\\).", answer: "\\(\\tfrac12\\)", method: "\\(2k+k+2k=5k\\)" },
        { prompt: "Write \\(P(X\\ge 6)\\) as a complement.", answer: "\\(1 - P(X\\le 5)\\)", method: "complement rule" },
        { prompt: "Does \\(P(2\\le X<4)\\) include \\(x=4\\)?", answer: "No — the upper end is strict (\\(< 4\\))", method: "decode the inequality" },
        { prompt: "\\(k=\\tfrac1{21}\\), entries as \\(4k,3k,2k\\) on \\(x=4,5,6\\). Find \\(P(3<X\\le 6)\\).", answer: "\\(\\tfrac37\\)", method: "\\(\\tfrac{4+3+2}{21}=\\tfrac{9}{21}\\)" },
      ],
      pyqExampleId: "15e29eab-3298-4d28-9b66-ad59daf9c259", // 2k,k,2k,4k,k → a=P(X<3)=1/2, b=P(2≤X<4)=3/5 → a<b
      traps: [
        {
          title: "\\(P(X > a)\\) and \\(P(X \\ge a)\\) are not the same",
          body:
            "\\(P(X>2)\\) excludes \\(x=2\\); \\(P(X\\ge 2)\\) includes it. For entries \\(k^2,2k,k,2k,5k^2\\), \\(P(X>2)=k+2k+5k^2\\) but \\(P(X\\ge 2)=1-k^2\\). Mixing the two is the top range error in this subtopic.",
        },
        {
          title: "Use the complement only when it has fewer terms",
          body:
            "\\(P(X\\ge a)=1-P(X<a)\\) is a shortcut, not a rule to apply blindly. On a table running \\(0\\ldots 7\\), the tail \\(P(X\\ge 6)=\\{6,7\\}\\) is SHORT — add it directly. Switch to the complement only when the 'below' side has fewer cells than the tail; count both sides before choosing.",
        },
      ],
    },

    // 3 — constant k from a quadratic-in-k table (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-constant-quadratic",
      name: "Finding k from a Quadratic Probability Table",
      intuition:
        "When some pmf entries carry \\(k^2\\) (like \\(k^2, 2k^2, 7k^2+k\\)), summing to 1 gives a QUADRATIC in k. Two recurring MHT-CET quadratics factor cleanly: \\(6k^2+5k-1=(6k-1)(k+1)\\) and \\(10k^2+9k-1=(10k-1)(k+1)\\). Take the positive root (the negative one makes probabilities invalid).",
      definition:
        "The two standard quadratics and their admissible roots:\n" +
        "- \\(6k^2 + 5k - 1 = 0 \\Rightarrow (6k-1)(k+1)=0 \\Rightarrow k = \\tfrac16\\) (reject \\(k=-1\\)).\n" +
        "- \\(10k^2 + 9k - 1 = 0 \\Rightarrow (10k-1)(k+1)=0 \\Rightarrow k = \\tfrac1{10}\\) (reject \\(k=-1\\)).\n" +
        "Always **reject the negative root** — a negative \\(k\\) would make some \\(P(X=x)\\) negative. After finding k, evaluate the required range, remembering the \\(k^2\\) terms: e.g. \\(P(X\\ge 6)=2k^2+(7k^2+k)=9k^2+k\\).",
      formula: {
        label: "The two recurring MHT-CET quadratics",
        latex:
          "6k^2+5k-1=(6k-1)(k+1),\\qquad 10k^2+9k-1=(10k-1)(k+1)",
      },
      authoredExample: {
        prompt:
          "A pmf on \\(x=1,2,3\\) has \\(P = k, 3k, 6k^2\\). Find \\(k\\).",
        steps: [
          "Sum: \\(k + 3k + 6k^2 = 6k^2 + 4k = 1\\).",
          "So \\(6k^2 + 4k - 1 = 0\\); by the quadratic formula \\(k = \\dfrac{-4 \\pm \\sqrt{16+24}}{12} = \\dfrac{-4 \\pm \\sqrt{40}}{12}\\).",
          "\\(\\sqrt{40}=2\\sqrt{10}\\approx 6.32\\), so \\(k = \\dfrac{-4+6.32}{12}\\approx 0.194\\) (reject the negative root).",
        ],
        answer: "\\(k = \\dfrac{-2+\\sqrt{10}}{6} \\approx 0.19\\)",
      },
      selfCheckExample: {
        prompt:
          "A pmf on \\(x=0,\\ldots,7\\) is \\(0, k, 2k, 2k, 3k, k^2, 2k^2, 7k^2+k\\). Find \\(k\\) and \\(P(X\\ge 6)\\).",
        steps: [
          "Sum \\(= 10k^2 + 9k - 1 = 0 \\Rightarrow (10k-1)(k+1)=0 \\Rightarrow k=\\tfrac1{10}\\).",
          "\\(P(X\\ge 6) = P(6)+P(7) = 2k^2 + (7k^2+k) = 9k^2 + k\\).",
          "\\(= 9\\cdot\\tfrac1{100} + \\tfrac1{10} = \\tfrac{9}{100} + \\tfrac{10}{100} = \\tfrac{19}{100}\\).",
        ],
        answer: "\\(k = \\tfrac1{10},\\quad P(X\\ge 6) = \\tfrac{19}{100}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(6k^2 + 5k - 1 = 0\\) for the admissible probability constant.", answer: "\\(k = \\tfrac16\\)", method: "\\((6k-1)(k+1)=0\\), reject \\(-1\\)" },
        { prompt: "Solve \\(10k^2 + 9k - 1 = 0\\) for the admissible constant.", answer: "\\(k = \\tfrac1{10}\\)", method: "\\((10k-1)(k+1)=0\\)" },
        { prompt: "With \\(k=\\tfrac16\\) and entries \\(k^2,2k,k,2k,5k^2\\), find \\(P(X\\ge 2)\\).", answer: "\\(\\tfrac{35}{36}\\)", method: "\\(1 - k^2 = 1-\\tfrac1{36}\\)" },
        { prompt: "Why is \\(k=-1\\) rejected in \\(6k^2+5k-1=0\\)?", answer: "It makes probabilities negative", method: "pmf axiom \\(P\\ge 0\\)" },
      ],
      pyqExampleId: "9d0a789c-9d34-487a-8b1e-6b94ccfe99f0", // 10k²+9k-1=0 → k=1/10, P(X≥6)=19/100
      traps: [
        {
          title: "Reject the negative root of the k-quadratic",
          body:
            "Both \\(6k^2+5k-1=0\\) and \\(10k^2+9k-1=0\\) have \\(k=-1\\) as a root. A negative \\(k\\) forces negative probabilities, so it is inadmissible — always keep the positive root (\\(\\tfrac16\\) or \\(\\tfrac1{10}\\)).",
        },
        {
          title: "Don't drop the \\(k^2\\) terms when evaluating a range",
          body:
            "For \\(P(X\\ge 6)=2k^2+(7k^2+k)=9k^2+k\\) with \\(k=\\tfrac1{10}\\), you must square: \\(9k^2=\\tfrac{9}{100}\\), giving \\(\\tfrac{19}{100}\\). Treating \\(k^2\\) as \\(k\\) gives the wrong tail probability.",
        },
        {
          title: "\\(P(X\\ge 2)=1-P(X=1)\\), not \\(1-P(X\\le 2)\\)",
          body:
            "For entries \\(k^2,2k,k,2k,5k^2\\) with \\(k=\\tfrac16\\), \\(P(X\\ge 2)=1-P(1)=1-k^2=\\tfrac{35}{36}\\). Subtracting \\(P(X\\le 2)\\) instead would wrongly remove \\(x=2\\), which the '\\(\\ge 2\\)' event includes.",
        },
      ],
    },

    // 4 — exponential pmf k·2^x on a finite range (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-constant-exponential",
      name: "Finding k for an Exponential pmf on a Finite Range",
      intuition:
        "When \\(P(X=x) = k\\cdot 2^x\\) over a FINITE set \\(x=0,1,\\ldots,n\\), summing to 1 needs a finite geometric series, not an infinite one. The trap is stopping the sum early or using an infinite-sum formula.",
      definition:
        "For \\(P(X=x)=k\\,r^x\\) on \\(x=0,1,\\ldots,n\\):\n" +
        "- **Finite geometric sum:** \\(\\displaystyle\\sum_{x=0}^{n} r^x = \\dfrac{r^{n+1}-1}{r-1}\\) (for \\(r\\ne 1\\)).\n" +
        "- Set \\(k \\cdot (\\text{that sum}) = 1\\) and solve for \\(k\\).\n" +
        "For \\(r=2,\\ n=4\\): \\(2^0+2^1+2^2+2^3+2^4 = 1+2+4+8+16 = 31\\), so \\(31k=1\\) and \\(k=\\tfrac1{31}\\).",
      formula: {
        label: "Finite geometric normalisation",
        latex:
          "\\sum_{x=0}^{n} k\\,r^{x} = k\\cdot\\frac{r^{\\,n+1}-1}{r-1} = 1",
      },
      authoredExample: {
        prompt:
          "If \\(P(X=x) = k\\cdot 3^x\\) for \\(x=0,1,2\\), find \\(k\\).",
        steps: [
          "Sum: \\(k(3^0 + 3^1 + 3^2) = k(1 + 3 + 9) = 13k\\).",
          "Set \\(13k = 1\\).",
          "So \\(k = \\tfrac1{13}\\).",
        ],
        answer: "\\(k = \\tfrac1{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(P(X=x) = k\\cdot 3^x\\) is a distribution on \\(x=0,1,2,3\\). Find \\(k\\) and \\(P(X=0)\\).",
        steps: [
          "Sum: \\(k(3^0+3^1+3^2+3^3) = k(1+3+9+27) = 40k\\).",
          "Set \\(40k = 1 \\Rightarrow k = \\tfrac1{40}\\).",
          "\\(P(X=0) = k\\cdot 3^0 = k = \\tfrac1{40}\\).",
        ],
        answer: "\\(k = \\tfrac1{40},\\quad P(X=0) = \\tfrac1{40}\\)",
      },
      practiceSet: [
        { prompt: "\\(P=k\\cdot 2^x,\\ x=0..4\\). Value of \\(k\\)?", answer: "\\(\\tfrac1{31}\\)", method: "\\(1+2+4+8+16=31\\)" },
        { prompt: "Sum \\(2^0+2^1+2^2+2^3+2^4\\).", answer: "\\(31\\)", method: "\\(2^5-1\\)" },
        { prompt: "\\(P=k\\cdot 3^x,\\ x=0,1,2\\). Value of \\(k\\)?", answer: "\\(\\tfrac1{13}\\)", method: "\\(1+3+9=13\\)" },
        { prompt: "Is the finite sum \\(\\sum_{x=0}^{4}2^x\\) equal to \\(2^5-1\\)?", answer: "Yes, \\(=31\\)", method: "geometric sum" },
      ],
      pyqExampleId: "ea437d50-b75d-48a5-89f5-73fb8c03370f", // k·2^x, x=0..4 → k=1/31 → "None of these"
      traps: [
        {
          title: "Sum a FINITE range fully — don't stop early",
          body:
            "For \\(P=k\\cdot 2^x\\) on \\(x=0,1,2,3,4\\), the sum is \\(1+2+4+8+16=31\\), so \\(k=\\tfrac1{31}\\). Stopping at \\(x=3\\) (\\(=15\\)) gives \\(k=\\tfrac1{15}\\) — a designed distractor. Count every listed value.",
        },
        {
          title: "A finite exponential pmf is NOT the infinite geometric sum",
          body:
            "\\(\\sum_{x=0}^{4}2^x = 31\\), not \\(\\dfrac{1}{1-2}\\) (which diverges anyway for \\(r>1\\)). Use the finite formula \\(\\dfrac{r^{n+1}-1}{r-1}\\); the infinite \\(\\dfrac{1}{1-r}\\) only applies when \\(|r|<1\\) over an infinite range.",
        },
      ],
    },

    // 5 — infinite AGP pmf k(x+1)r^x (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-constant-agp-series",
      name: "Finding k for an Infinite pmf k(x+1)rˣ",
      intuition:
        "When \\(P(X=x) = k(x+1)r^x\\) over ALL \\(x=0,1,2,\\ldots\\), the normalisation sum is an arithmetico-geometric progression (AGP). Its closed form \\(\\sum_{x\\ge 0}(x+1)r^x = \\dfrac{1}{(1-r)^2}\\) turns the whole problem into one substitution.",
      definition:
        "For the infinite pmf \\(P(X=x)=k(x+1)r^x,\\ x=0,1,2,\\ldots\\):\n" +
        "- **Key AGP sum (memorise):** \\(\\displaystyle\\sum_{x=0}^{\\infty}(x+1)r^{x} = \\frac{1}{(1-r)^{2}}\\) for \\(|r|<1\\).\n" +
        "- Set \\(k\\cdot\\dfrac{1}{(1-r)^2} = 1\\), so \\(k = (1-r)^2\\).\n" +
        "- For \\(r=\\tfrac12\\): \\(k=(1-\\tfrac12)^2=\\tfrac14\\). For \\(r=\\tfrac15\\): \\(k=(1-\\tfrac15)^2=(\\tfrac45)^2=\\tfrac{16}{25}\\).\n" +
        "Then any \\(P(X=x)\\) follows by direct substitution — e.g. \\(P(X=0)=k(1)(r^0)=k\\).",
      formula: {
        label: "AGP normalisation for k(x+1)rˣ",
        latex:
          "\\sum_{x=0}^{\\infty}(x+1)r^{x} = \\frac{1}{(1-r)^{2}} \\;\\Longrightarrow\\; k = (1-r)^{2}",
        symbols: [
          { symbol: "r", meaning: "the common ratio, \\(|r|<1\\)" },
          { symbol: "(x+1)", meaning: "the arithmetic factor" },
          { symbol: "k", meaning: "the normalising constant \\((1-r)^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(P(X=x) = k(x+1)\\left(\\tfrac13\\right)^x\\) for \\(x=0,1,2,\\ldots\\). Find \\(k\\).",
        steps: [
          "Normalise: \\(k\\displaystyle\\sum_{x\\ge 0}(x+1)\\left(\\tfrac13\\right)^x = 1\\).",
          "Use the AGP sum with \\(r=\\tfrac13\\): \\(\\sum = \\dfrac{1}{(1-\\tfrac13)^2} = \\dfrac{1}{(2/3)^2} = \\dfrac94\\).",
          "So \\(k\\cdot\\tfrac94 = 1 \\Rightarrow k = \\tfrac49\\).",
        ],
        answer: "\\(k = \\tfrac49\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(P(X=x) = k(x+1)\\left(\\tfrac12\\right)^x\\) for \\(x=0,1,2,\\ldots\\). Find \\(P(X=1)\\).",
        steps: [
          "AGP sum with \\(r=\\tfrac12\\): \\(\\dfrac{1}{(1-\\tfrac12)^2} = \\dfrac{1}{(1/2)^2} = 4\\), so \\(4k=1\\Rightarrow k=\\tfrac14\\).",
          "\\(P(X=1) = k(1+1)(\\tfrac12)^1 = k\\cdot 2\\cdot\\tfrac12 = k\\).",
          "So \\(P(X=1) = \\tfrac14\\).",
        ],
        answer: "\\(P(X=1) = \\tfrac14\\)",
      },
      practiceSet: [
        { prompt: "State \\(\\sum_{x=0}^{\\infty}(x+1)r^x\\).", answer: "\\(\\dfrac{1}{(1-r)^2}\\)", method: "AGP closed form" },
        { prompt: "\\(P=k(x+1)(\\tfrac15)^x,\\ x\\ge 0\\). Value of \\(k\\)?", answer: "\\(\\tfrac{16}{25}\\)", method: "\\(k=(1-\\tfrac15)^2\\)" },
        { prompt: "\\(P=k(x+1)(\\tfrac12)^x,\\ x\\ge 0\\). Value of \\(k\\)?", answer: "\\(\\tfrac14\\)", method: "\\(k=(1-\\tfrac12)^2\\)" },
        { prompt: "For \\(k(x+1)r^x\\), what is \\(P(X=0)\\)?", answer: "\\(k\\)", method: "\\((0+1)r^0=1\\)" },
      ],
      pyqExampleId: "8447d620-f337-45e5-af76-0360cda260d6", // k(x+1)(1/5)^x → k=16/25, P(X=0)=16/25
      traps: [
        {
          title: "\\(\\sum(x+1)r^x = \\dfrac{1}{(1-r)^2}\\), NOT \\(\\dfrac{1}{1-r}\\)",
          body:
            "The arithmetic factor \\((x+1)\\) squares the denominator. For \\(r=\\tfrac15\\), \\(\\sum(x+1)r^x = \\dfrac{1}{(4/5)^2}=\\dfrac{25}{16}\\), giving \\(k=\\tfrac{16}{25}\\). Using the plain geometric \\(\\dfrac{1}{1-r}=\\tfrac54\\) gives the wrong \\(k=\\tfrac45\\).",
        },
        {
          title: "The range is INFINITE here — use \\(|r|<1\\)",
          body:
            "\\(P(X=x)=k(x+1)r^x\\) runs over all \\(x=0,1,2,\\ldots\\), so the infinite AGP sum applies (it converges because \\(r=\\tfrac12\\) or \\(\\tfrac15\\) satisfies \\(|r|<1\\)). Don't confuse it with the finite \\(k\\cdot 2^x\\) case, whose ratio exceeds 1.",
        },
      ],
    },

    // 6 — constructing a pmf from an experiment (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-construct-distribution",
      name: "Constructing a Probability Distribution from an Experiment",
      intuition:
        "Instead of a table with an unknown k, you are handed an experiment (toss coins, draw cards, throw a die) and must BUILD the pmf. List the possible values of X, compute each probability from the experiment, and check the total is 1.",
      definition:
        "Identify the values \\(X\\) takes, then find each \\(P(X=x)\\) by the right counting rule:\n" +
        "- **With-replacement draws (independent trials):** binomial — \\(P(X=r)=\\binom{n}{r}p^r(1-p)^{n-r}\\). Two cards with replacement, jack has \\(p=\\tfrac4{52}=\\tfrac1{13}\\): \\(P(0)=(\\tfrac{12}{13})^2=\\tfrac{144}{169},\\ P(1)=2\\cdot\\tfrac1{13}\\cdot\\tfrac{12}{13}=\\tfrac{24}{169},\\ P(2)=\\tfrac1{169}\\).\n" +
        "- **Without-replacement draws:** hypergeometric — \\(P(X=r)=\\dfrac{\\binom{D}{r}\\binom{N-D}{n-r}}{\\binom{N}{n}}\\). 4 defective + 16 good, draw 3: \\(P(0)=\\tfrac{\\binom{16}{3}}{\\binom{20}{3}}=\\tfrac{28}{57}\\), and so on.\n" +
        "- **Counting outcomes (equally likely):** three fair coins, \\(X=\\) heads: \\(P(X=k)=\\binom{3}{k}(\\tfrac12)^3\\), giving \\(\\tfrac18,\\tfrac38,\\tfrac38,\\tfrac18\\).\n" +
        "- **Sequential 'until' experiments:** multiply along each branch — a coin tossed until a head or 4 tails gives \\(\\tfrac12,\\tfrac14,\\tfrac18,\\tfrac18\\) for \\(X=1,2,3,4\\) (the last cell pools TTTH and TTTT).",
      formula: {
        label: "Binomial and hypergeometric building blocks",
        latex:
          "P(X=r)=\\binom{n}{r}p^{r}(1-p)^{n-r}, \\qquad P(X=r)=\\frac{\\binom{D}{r}\\binom{N-D}{n-r}}{\\binom{N}{n}}",
      },
      authoredExample: {
        prompt:
          "Two fair coins are tossed. Let \\(X\\) be the number of heads. Build the probability distribution.",
        steps: [
          "Sample space: HH, HT, TH, TT — four equally likely outcomes.",
          "\\(X=0\\) (TT): \\(P=\\tfrac14\\). \\(X=1\\) (HT, TH): \\(P=\\tfrac24=\\tfrac12\\). \\(X=2\\) (HH): \\(P=\\tfrac14\\).",
          "Check: \\(\\tfrac14+\\tfrac12+\\tfrac14 = 1\\). ✓",
        ],
        answer: "\\(P(0)=\\tfrac14,\\ P(1)=\\tfrac12,\\ P(2)=\\tfrac14\\)",
      },
      selfCheckExample: {
        prompt:
          "A fair die is thrown. Let \\(X\\) be the number of factors of the number on the top face. Build the distribution of \\(X\\).",
        steps: [
          "Count factors: \\(1\\to 1\\); \\(2\\to\\{1,2\\}=2\\); \\(3\\to\\{1,3\\}=2\\); \\(4\\to\\{1,2,4\\}=3\\); \\(5\\to\\{1,5\\}=2\\); \\(6\\to\\{1,2,3,6\\}=4\\).",
          "So \\(X=1\\) for one face, \\(X=2\\) for three faces (2,3,5), \\(X=3\\) for one face, \\(X=4\\) for one face.",
          "\\(P(1)=\\tfrac16,\\ P(2)=\\tfrac36=\\tfrac12,\\ P(3)=\\tfrac16,\\ P(4)=\\tfrac16\\).",
        ],
        answer: "\\(P(1)=\\tfrac16,\\ P(2)=\\tfrac12,\\ P(3)=\\tfrac16,\\ P(4)=\\tfrac16\\)",
      },
      practiceSet: [
        { prompt: "Two cards drawn WITH replacement; \\(X=\\) number of jacks. Find \\(P(X=0)\\).", answer: "\\(\\tfrac{144}{169}\\)", method: "\\((\\tfrac{48}{52})^2\\)" },
        { prompt: "Three fair coins; \\(X=\\) heads. Find \\(P(X=2)\\).", answer: "\\(\\tfrac38\\)", method: "\\(\\binom32(\\tfrac12)^3\\)" },
        { prompt: "4 defective + 16 good oranges, draw 3 (no replacement). Find \\(P(X=0)\\).", answer: "\\(\\tfrac{28}{57}\\)", method: "\\(\\binom{16}{3}/\\binom{20}{3}\\)" },
        { prompt: "Coin tossed until a head or 4 tails; find \\(P(X=1)\\).", answer: "\\(\\tfrac12\\)", method: "\\(P(H)\\) on first toss" },
      ],
      pyqExampleId: "3707ff9f-d246-4031-a9d2-5b9564e8922f", // 4 defective + 16 good, draw 3, hypergeometric distribution
      traps: [
        {
          title: "With replacement is binomial; without replacement is hypergeometric",
          body:
            "'Successively WITH replacement' means each draw is independent with fixed \\(p\\) — use \\(\\binom{n}{r}p^r(1-p)^{n-r}\\). 'Drawn from the lot' WITHOUT replacement changes the pool each draw — use the \\(\\dfrac{\\binom{D}{r}\\binom{N-D}{n-r}}{\\binom{N}{n}}\\) ratio. Choosing the wrong model is the top construction error.",
        },
        {
          title: "\\(P(X=1)\\) counts BOTH orders — include the factor of 2",
          body:
            "For two independent draws, \\(P(\\text{exactly one success}) = 2\\,p(1-p)\\) (success-then-fail OR fail-then-success), e.g. \\(2\\cdot\\tfrac4{52}\\cdot\\tfrac{48}{52}=\\tfrac{24}{169}\\). Forgetting the 2 halves the middle probability.",
        },
        {
          title: "In a bounded 'until' experiment, the last cell POOLS two branches",
          body:
            "A coin tossed until a head OR 4 tails: \\(P(X=4)=P(\\text{TTTH})+P(\\text{TTTT})=\\tfrac1{16}+\\tfrac1{16}=\\tfrac18\\). The forced stop at 4 means the experiment ends whether the 4th toss is H or T, so both outcomes count toward \\(X=4\\).",
        },
      ],
    },

    // 7 — cumulative distribution function (discrete) (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-cdf-discrete",
      name: "Cumulative Distribution Function and pmf ↔ CDF Differencing",
      intuition:
        "The CDF \\(F(x)=P(X\\le x)\\) accumulates the pmf from the left. Because it is a running total, you recover any single mass by DIFFERENCING consecutive CDF values: \\(P(X=x_i)=F(x_i)-F(x_{i-1})\\). This is how you answer 'find P(X=a)' or a probability ratio when only the CDF is given.",
      definition:
        "For a discrete random variable with values \\(x_1<x_2<\\cdots\\):\n" +
        "- **Definition:** \\(F(x)=P(X\\le x)=\\displaystyle\\sum_{x_i \\le x}P(X=x_i)\\); it is non-decreasing and reaches 1 at the top value.\n" +
        "- **Recover the pmf (differencing):** \\(P(X=x_i)=F(x_i)-F(x_{i-1})\\), with \\(P(X=x_1)=F(x_1)\\).\n" +
        "- **Tail from the CDF:** \\(P(X>a)=1-F(a)\\); \\(P(X\\le a)=F(a)\\).",
      formula: {
        label: "CDF definition and differencing",
        latex:
          "F(x)=P(X\\le x)=\\sum_{x_i\\le x}P(X=x_i), \\qquad P(X=x_i)=F(x_i)-F(x_{i-1})",
      },
      authoredExample: {
        prompt:
          "A discrete CDF has \\(F(1)=0.2,\\ F(2)=0.5,\\ F(3)=1\\) at values \\(x=1,2,3\\). Find \\(P(X=2)\\).",
        steps: [
          "\\(P(X=2)=F(2)-F(1)\\).",
          "\\(=0.5-0.2\\).",
          "\\(=0.3\\).",
        ],
        answer: "\\(P(X=2)=0.3\\)",
      },
      selfCheckExample: {
        prompt:
          "For a discrete CDF with \\(F(-3)=0.1,\\ F(-1)=0.3,\\ F(0)=0.5\\) at values \\(-3,-1,0,\\ldots\\), find \\(\\dfrac{P(X=-3)}{P(X<0)}\\).",
        steps: [
          "\\(P(X=-3)=F(-3)=0.1\\).",
          "\\(P(X=-1)=F(-1)-F(-3)=0.3-0.1=0.2\\).",
          "\\(P(X<0)=P(-3)+P(-1)=0.1+0.2=0.3\\).",
          "Ratio \\(=\\dfrac{0.1}{0.3}=\\dfrac13\\).",
        ],
        answer: "\\(\\dfrac{P(X=-3)}{P(X<0)}=\\dfrac13\\)",
      },
      practiceSet: [
        { prompt: "State the CDF differencing rule for a discrete pmf.", answer: "\\(P(X=x_i)=F(x_i)-F(x_{i-1})\\)", method: "consecutive CDF gap" },
        { prompt: "\\(F(0)=0.5\\) in a CDF. Find \\(P(X>0)\\).", answer: "\\(0.5\\)", method: "\\(1-F(0)\\)" },
        { prompt: "\\(F(-3)=0.1,\\ F(-1)=0.3\\). Find \\(P(X=-1)\\).", answer: "\\(0.2\\)", method: "\\(0.3-0.1\\)" },
        { prompt: "If \\(P(X\\le 0)=0.5\\) and \\(P(X>0)=0.5\\), find their ratio.", answer: "\\(1\\)", method: "\\(0.5/0.5\\)" },
      ],
      pyqExampleId: "095784f2-42c7-40f5-a15a-e872d97b647e", // discrete CDF table → P(X=-3)/P(X<0) = 1/3
      traps: [
        {
          title: "Read \\(P(X=x_i)\\) as a CDF DIFFERENCE, not the CDF value",
          body:
            "Except for the smallest value, \\(P(X=x_i)=F(x_i)-F(x_{i-1})\\), not \\(F(x_i)\\). Only \\(P(X=x_1)=F(x_1)\\) (nothing accumulated before it). Reading \\(P(X=0)=F(0)=0.5\\) directly (when earlier values exist) double-counts.",
        },
        {
          title: "\\(P(X\\le 0)=F(0)\\); \\(P(X>0)=1-F(0)\\)",
          body:
            "From a CDF, \\(P(X\\le 0)\\) is exactly \\(F(0)\\), and \\(P(X>0)=1-F(0)\\). If \\(F(0)=0.5\\) the ratio \\(\\dfrac{P(X\\le0)}{P(X>0)}=\\dfrac{0.5}{0.5}=1\\). Watch \\(\\le\\) vs \\(<\\): \\(P(X<0)\\) excludes the mass exactly at 0.",
        },
      ],
    },

    // 8 — continuous RV: pdf, normalization, cdf, P(a<X<b) (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-continuous-pdf-cdf",
      name: "Continuous Random Variables — pdf, Normalisation, CDF and P(a < X < b)",
      intuition:
        "For a continuous variable, probability lives in a density \\(f(x)\\), not at single points. Every discrete 'sum' becomes an INTEGRAL: normalise with \\(\\int f\\,dx=1\\) to find a constant, get the CDF by \\(F(x)=\\int_{-\\infty}^{x} f\\,dt\\), and read an interval probability as \\(\\int_a^b f\\,dx\\).",
      definition:
        "The continuous analogues of the pmf rules:\n" +
        "- **Normalisation (find the constant):** \\(\\displaystyle\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1\\), integrated over the support only.\n" +
        "- **CDF:** \\(F(x)=\\displaystyle\\int_{-\\infty}^{x} f(t)\\,dt\\); \\(F\\) rises from 0 to 1, and \\(F'(x)=f(x)\\).\n" +
        "- **Interval probability:** \\(P(a<X<b)=\\displaystyle\\int_a^b f(x)\\,dx = F(b)-F(a)\\). For continuous \\(X\\), \\(<\\) and \\(\\le\\) give the same value.\n" +
        "- **Two-condition pdf:** if the pdf has TWO unknowns, use \\(\\int f=1\\) AND a given point value (like \\(f(2)=2\\)) to solve the pair.",
      formula: {
        label: "Continuous normalisation, CDF, interval",
        latex:
          "\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1,\\quad F(x)=\\int_{-\\infty}^{x} f(t)\\,dt,\\quad P(a<X<b)=\\int_a^b f(x)\\,dx",
        symbols: [
          { symbol: "f(x)", meaning: "probability density function" },
          { symbol: "F(x)", meaning: "cumulative distribution function, \\(F'=f\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A pdf is \\(f(x)=kx\\) for \\(0<x<2\\) (and 0 otherwise). Find \\(k\\) and \\(P(X<1)\\).",
        steps: [
          "Normalise: \\(\\displaystyle\\int_0^2 kx\\,dx = k\\left[\\tfrac{x^2}{2}\\right]_0^2 = 2k = 1 \\Rightarrow k=\\tfrac12\\).",
          "So \\(f(x)=\\tfrac{x}{2}\\).",
          "\\(P(X<1)=\\displaystyle\\int_0^1 \\tfrac{x}{2}\\,dx = \\tfrac12\\left[\\tfrac{x^2}{2}\\right]_0^1 = \\tfrac12\\cdot\\tfrac12 = \\tfrac14\\).",
        ],
        answer: "\\(k=\\tfrac12,\\quad P(X<1)=\\tfrac14\\)",
      },
      selfCheckExample: {
        prompt:
          "The pdf is \\(f(x)=\\tfrac{3x^2}{8}\\) for \\(0<x<2\\) (0 otherwise). Find \\(F(1)\\) and \\(P(X>1)\\).",
        steps: [
          "\\(F(x)=\\displaystyle\\int_0^x \\tfrac{3t^2}{8}\\,dt = \\tfrac{x^3}{8}\\) for \\(0<x<2\\).",
          "\\(F(1)=\\tfrac{1}{8}\\).",
          "\\(P(X>1)=1-F(1)=1-\\tfrac18=\\tfrac78\\).",
        ],
        answer: "\\(F(1)=\\tfrac18,\\quad P(X>1)=\\tfrac78\\)",
      },
      practiceSet: [
        { prompt: "State the normalisation condition for a continuous pdf.", answer: "\\(\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1\\)", method: "total area = 1" },
        { prompt: "For \\(f(x)=kx^2\\) on \\(0\\le x\\le 6\\), find \\(k\\).", answer: "\\(k=\\tfrac1{72}\\)", method: "\\(\\int_0^6 kx^2=72k=1\\)" },
        { prompt: "For a continuous \\(X\\), is \\(P(a<X<b)=P(a\\le X\\le b)\\)?", answer: "Yes — endpoints carry zero probability", method: "\\(\\int_a^a f=0\\)" },
        { prompt: "If \\(f(x)=\\tfrac{x}{8}\\) on \\((0,4)\\), give \\(F(x)\\) on the support.", answer: "\\(\\tfrac{x^2}{16}\\)", method: "\\(\\int_0^x \\tfrac t8\\,dt\\)" },
      ],
      pyqExampleId: "47821eeb-62a6-419e-8b55-09ea3256dd16", // pdf x/8 on (0,4) → F(0.5),F(1.7),F(5) = 0.0156,0.18,1
      traps: [
        {
          title: "Integrate over the SUPPORT only",
          body:
            "For a continuous pdf \\(f(x)=kx^2\\) on \\(0\\le x\\le 6\\), normalise \\(\\int_0^6 kx^2\\,dx = \\left[\\tfrac{kx^3}{3}\\right]_0^6 = 72k = 1\\), giving \\(k=\\tfrac1{72}\\) — integrate only where \\(f\\ne 0\\) (\\(f=0\\) outside \\([0,6]\\)). Applying \\(\\int_{-\\infty}^{\\infty}\\) blindly, or a discrete SUM \\(\\sum_{x=0}^{6} kx^2\\) (which would give \\(91k=1\\)), is the standard continuous-vs-discrete mix-up.",
        },
        {
          title: "A two-unknown pdf needs TWO equations",
          body:
            "If \\(f(x)=\\tfrac{ax^2}{2}+bx\\) on \\([1,3]\\) has unknowns \\(a,b\\), one equation is \\(\\int_1^3 f\\,dx=1\\); the second is a given value like \\(f(2)=2\\Rightarrow 2a+2b=2\\). Solve the pair — normalisation alone is not enough.",
        },
        {
          title: "The CDF is the running integral, and \\(F'(x)=f(x)\\)",
          body:
            "\\(F(x)=\\int_{-\\infty}^{x} f\\). For \\(f(x)=12x^2(1-x)\\) on \\((0,1)\\), \\(F(x)=\\int_0^x 12t^2(1-t)\\,dt = 4x^3-3x^4\\). Differentiating back must return \\(f\\) — a quick check that catches sign or coefficient errors.",
        },
        {
          title: "\\(P(|X|<2)\\) is a symmetric integral \\(\\int_{-2}^{2}\\)",
          body:
            "For \\(f(x)=\\tfrac{x^2}{18}\\) on \\((-3,3)\\), \\(P(|X|<2)=\\int_{-2}^{2}\\tfrac{x^2}{18}\\,dx=\\tfrac1{18}\\cdot\\tfrac{16}{3}=\\tfrac{8}{27}\\). Integrate from \\(-2\\) to \\(2\\), not \\(0\\) to \\(2\\) — \\(|X|<2\\) means \\(-2<X<2\\).",
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
