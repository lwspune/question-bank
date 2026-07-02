import type { SubtopicNote } from "@/app/notes/_types";

export const COMPUTING_BINOMIAL_NOTE: SubtopicNote = {
  subtopicName: "Computing Binomial Probabilities",
  title: "Computing Binomial Probabilities — Cumulative, Ranges and Shortcuts",
  oneLineDefinition:
    "Combine the single-term formula P(X=r)=ⁿCᵣpʳqⁿ⁻ʳ into whole answers: add terms for 'at least' / 'at most', use 1−qⁿ for 'at least one', complement for ranges, and N×P(event) for an expected frequency.",
  whyItMatters:
    "This is the biggest subtopic in the chapter (20 PYQs — 3 EASY, 12 MODERATE, 5 HARD). The single-term PMF is page one; here the marks come from correctly COMBINING those terms. " +
    "Almost every question is a phrasing puzzle first: 'at least 3', 'at most one', 'unable to solve less than two', 'even number of heads', 'second win at the third match' each map to a specific sum of PMF terms. Read the phrase, translate it to the exact set of r-values, then add.",
  concepts: [
    // 0 — foundation: the whole-answer idea (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetbd-summing-terms",
      name: "Adding PMF Terms to Get a Whole Answer",
      intuition:
        "A binomial random variable takes the values 0, 1, 2, …, n, and its individual probabilities P(X=r) add up to exactly 1. Any real question asks about a SET of these values ('3 or more', 'at most 2', 'exactly 1 or 2'), so the answer is the sum of P(X=r) over that set. The whole skill on this page is turning a phrase into the right list of r-values.",
      definition:
        "For \\(X \\sim B(n,p)\\) with \\(q = 1-p\\), the total probability splits across \\(r = 0,1,\\dots,n\\):\n" +
        "- **Whole probability sums to 1:** \\(\\displaystyle\\sum_{r=0}^{n} \\binom{n}{r} p^r q^{\\,n-r} = (p+q)^n = 1\\).\n" +
        "- **A compound event is a SUM of terms:** e.g. \\(P(X \\le 2) = P(0)+P(1)+P(2)\\).\n" +
        "- **Complement when it's shorter:** \\(P(X \\ge k) = 1 - P(X \\le k-1)\\). Pick whichever side has fewer terms.\n" +
        "The phrase-to-set dictionary: 'at least \\(k\\)' \\(= \\{k, k+1, \\dots, n\\}\\); 'at most \\(k\\)' \\(= \\{0, 1, \\dots, k\\}\\); 'more than \\(k\\)' \\(= \\{k+1,\\dots\\}\\); 'fewer/less than \\(k\\)' \\(= \\{0,\\dots,k-1\\}\\).",
      formula: {
        label: "PMF term and the total-probability identity",
        latex:
          "P(X=r) = \\binom{n}{r} p^r q^{\\,n-r},\\qquad \\sum_{r=0}^{n} P(X=r) = (p+q)^n = 1",
        symbols: [
          { symbol: "n", meaning: "number of independent trials" },
          { symbol: "p", meaning: "probability of success on one trial" },
          { symbol: "q", meaning: "probability of failure, \\(q = 1-p\\)" },
          { symbol: "r", meaning: "number of successes, an integer from 0 to n" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(X \\sim B\\!\\left(3, \\tfrac13\\right)\\), find \\(P(X \\le 1)\\).",
        steps: [
          "'At most 1' means \\(r \\in \\{0, 1\\}\\): \\(P(X \\le 1) = P(0) + P(1)\\).",
          "\\(P(0) = \\binom{3}{0}\\left(\\tfrac13\\right)^0\\left(\\tfrac23\\right)^3 = \\tfrac{8}{27}\\).",
          "\\(P(1) = \\binom{3}{1}\\left(\\tfrac13\\right)^1\\left(\\tfrac23\\right)^2 = 3\\cdot\\tfrac13\\cdot\\tfrac49 = \\tfrac{12}{27}\\).",
          "Add: \\(P(X \\le 1) = \\tfrac{8}{27} + \\tfrac{12}{27} = \\tfrac{20}{27}\\).",
        ],
        answer: "\\(P(X \\le 1) = \\dfrac{20}{27}\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(X \\sim B\\!\\left(3, \\tfrac13\\right)\\), find \\(P(X \\ge 2)\\), and check it against the previous whole.",
        steps: [
          "\\(P(X \\ge 2) = P(2) + P(3)\\).",
          "\\(P(2) = \\binom{3}{2}\\left(\\tfrac13\\right)^2\\left(\\tfrac23\\right) = 3\\cdot\\tfrac19\\cdot\\tfrac23 = \\tfrac{6}{27}\\); \\(P(3) = \\left(\\tfrac13\\right)^3 = \\tfrac{1}{27}\\).",
          "Sum: \\(\\tfrac{6}{27} + \\tfrac{1}{27} = \\tfrac{7}{27}\\).",
          "Check: \\(P(X \\le 1) + P(X \\ge 2) = \\tfrac{20}{27} + \\tfrac{7}{27} = 1\\). Consistent.",
        ],
        answer: "\\(P(X \\ge 2) = \\dfrac{7}{27}\\)",
      },
      practiceSet: [
        { prompt: "Translate 'at least 4 out of 6' into a set of r-values.", answer: "\\(\\{4, 5, 6\\}\\)", method: "at least k = k up to n" },
        { prompt: "Translate 'at most 2 out of 5' into a set of r-values.", answer: "\\(\\{0, 1, 2\\}\\)" },
        { prompt: "Translate 'fewer than 2 out of 10' into a set of r-values.", answer: "\\(\\{0, 1\\}\\)", method: "less than k = 0 up to k−1" },
        { prompt: "Write \\(P(X \\ge 3)\\) for \\(B(5,p)\\) as a complement.", answer: "\\(1 - P(X \\le 2)\\)", method: "1 − the other tail" },
      ],
      traps: [
        {
          title: "'At least k' includes k itself, not just above it",
          body:
            "\\(P(X \\ge 3)\\) means \\(r = 3, 4, \\dots, n\\) — the value 3 IS counted. Reading 'at least 3' as 'more than 3' (starting at 4) drops the largest term \\(P(3)\\) and gives the wrong answer. 'More than 3' is what excludes 3.",
        },
        {
          title: "A compound event is a SUM of terms, not a single term",
          body:
            "\\(P(X \\ge 3)\\) with \\(n=5\\) is \\(P(3)+P(4)+P(5)\\), NOT just \\(P(3)\\). Computing only the first term (e.g. only \\(\\binom{5}{3}p^3q^2\\)) is the single most common slip in 'at least' questions — always list every r in the set.",
        },
      ],
    },

    // 1 — at least / at most as sums of terms (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-at-least-at-most",
      name: "At Least and At Most — Cumulative Probabilities",
      intuition:
        "The workhorse case: a phrase like 'at least 4 successes' or 'at most 1 defective' names a run of consecutive r-values, and you add P(X=r) over that run. When the run is short at one end (r=0,1 for 'at most one'; r=n,n−1 for 'unable to solve less than two') the sum is only two or three terms.",
      definition:
        "Turn the phrase into a sum, then compute each term with the PMF:\n" +
        "- **At most one:** \\(P(X \\le 1) = P(0) + P(1) = q^n + n\\,p\\,q^{\\,n-1}\\).\n" +
        "- **At least three (n=5):** \\(P(X \\ge 3) = P(3)+P(4)+P(5)\\).\n" +
        "- **'Unable to solve less than two'** (with p = solve): the candidate fails on 0 or 1 problem, i.e. SOLVES \\(n\\) or \\(n-1\\): \\(P = p^n + n\\,p^{\\,n-1}q\\). Decide which event 'success' labels before you count.\n" +
        "Factor the common power to match the option form — e.g. \\(q^5 + 5pq^4 = q^4(q + 5p)\\).",
      formula: {
        label: "Two-term tails you meet most often",
        latex:
          "P(X \\le 1) = q^n + n\\,p\\,q^{\\,n-1},\\qquad P(X \\ge n-1) = n\\,p^{\\,n-1}q + p^n",
      },
      authoredExample: {
        prompt:
          "A machine part passes a test with probability \\(\\tfrac34\\). Of 4 parts tested independently, find the probability that at most one fails.",
        steps: [
          "Let success = 'fails', so \\(p = 1 - \\tfrac34 = \\tfrac14\\), \\(q = \\tfrac34\\), \\(n = 4\\).",
          "'At most one fails' \\(= P(X \\le 1) = P(0) + P(1)\\).",
          "\\(P(0) = \\left(\\tfrac34\\right)^4 = \\tfrac{81}{256}\\).",
          "\\(P(1) = \\binom{4}{1}\\left(\\tfrac14\\right)\\left(\\tfrac34\\right)^3 = 4\\cdot\\tfrac14\\cdot\\tfrac{27}{64} = \\tfrac{27}{64} = \\tfrac{108}{256}\\).",
          "Add: \\(\\tfrac{81}{256} + \\tfrac{108}{256} = \\tfrac{189}{256}\\).",
        ],
        answer: "\\(P(\\text{at most one fails}) = \\dfrac{189}{256}\\)",
      },
      selfCheckExample: {
        prompt:
          "A workman has a 10% chance of contracting a disease. Out of 5 independent workmen, find the probability that at least 3 contract it (leave the answer as a sum of terms).",
        steps: [
          "\\(p = 0.1\\), \\(q = 0.9\\), \\(n = 5\\); 'at least 3' \\(= P(3)+P(4)+P(5)\\).",
          "\\(P(3) = \\binom{5}{3}(0.1)^3(0.9)^2 = 10\\cdot 0.001\\cdot 0.81 = 0.0081\\).",
          "\\(P(4) = \\binom{5}{4}(0.1)^4(0.9) = 5\\cdot 0.0001\\cdot 0.9 = 0.00045\\); \\(P(5) = (0.1)^5 = 0.00001\\).",
          "Add: \\(0.0081 + 0.00045 + 0.00001 = 0.00856\\).",
        ],
        answer: "\\(P(X \\ge 3) \\approx 0.00856\\)",
      },
      practiceSet: [
        { prompt: "For \\(B(5, 0.1)\\), write \\(P(X \\le 1)\\) in factored form.", answer: "\\(q^4(q + 5p) = (0.9)^4(0.9 + 0.5)\\)", method: "\\(q^5 + 5pq^4\\), pull out \\(q^4\\)" },
        { prompt: "\\(X \\sim B(6, \\tfrac23)\\): which terms make up \\(P(X \\ge 4)\\)?", answer: "\\(P(4) + P(5) + P(6)\\)" },
        { prompt: "If 'success' = solving and you want 'unable to solve fewer than 2 of n', which r-values?", answer: "\\(r = n\\) and \\(r = n-1\\) (solves all or all-but-one)", method: "fails on 0 or 1 → solves n or n−1" },
        { prompt: "For \\(B(4, \\tfrac23)\\), \\(P(X \\le 2) = ?\\) as a sum.", answer: "\\(P(0)+P(1)+P(2) = \\tfrac{1+8+24}{81} = \\tfrac{33}{81}\\)", method: "three terms" },
      ],
      pyqExampleId: "10f69a9f-0b48-4d69-bfd8-e87fde24d576", // succeeds twice as often as fails, ≥4 of 6 → 496/729
      visualizationSlug: "binomial-tail-shading",
      traps: [
        {
          title: "'At most one defective' has two terms, not one",
          body:
            "\\(P(X \\le 1) = P(0) + P(1) = q^n + n\\,p\\,q^{\\,n-1}\\). Computing only \\(P(0)=q^n\\) — or only \\(P(1)\\) — is the standard error. Both the all-clean case and the exactly-one case count.",
        },
        {
          title: "Decide which outcome 'success' labels before counting",
          body:
            "In 'unable to solve less than two problems', if \\(p\\) is the probability of SOLVING, then failing on 0 or 1 problem means solving all \\(n\\) or all-but-one: \\(P = p^n + n\\,p^{\\,n-1}q\\). Mixing up which event is 'success' flips \\(p\\) and \\(q\\) and gives a completely different (wrong) option.",
        },
        {
          title: "Factor the shared power to match the printed option",
          body:
            "\\(q^5 + 5pq^4\\) equals \\(q^4(q+5p)\\); with \\(p=\\tfrac1{10}\\) that is \\(\\left(\\tfrac9{10}\\right)^4\\cdot\\tfrac{14}{10} = \\tfrac75\\left(\\tfrac9{10}\\right)^4\\). MHT-CET options are usually pre-factored, so leaving the sum unfactored can hide the matching choice.",
        },
      ],
    },

    // 2 — the "at least one" shortcut 1 − qⁿ (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-at-least-one",
      name: "At Least One — the 1 minus qⁿ Shortcut",
      intuition:
        "'At least one success' spans r = 1, 2, …, n — a long sum. Its complement is the single term 'no successes at all' = qⁿ. So P(at least one) = 1 − qⁿ in one line. The same idea, run backwards, finds the smallest n making 'at least one' beat a target like 99%.",
      definition:
        "The complement collapses a whole tail to one term:\n" +
        "- **At least one:** \\(P(X \\ge 1) = 1 - P(X = 0) = 1 - q^n\\).\n" +
        "- **Smallest n for a threshold:** to force \\(P(X \\ge 1) > t\\), solve \\(1 - q^n > t \\Rightarrow q^n < 1-t\\), then take the least integer n. For a fair coin (\\(q=\\tfrac12\\)) and \\(t = 0.99\\): \\(\\left(\\tfrac12\\right)^n < 0.01 \\Rightarrow 2^n > 100 \\Rightarrow n = 7\\) (since \\(2^6=64,\\ 2^7=128\\)).\n" +
        "This is exactly the trick behind 'probability of at least one defective bulb' \\(= 1 - (\\text{good fraction})^n\\).",
      formula: {
        label: "The at-least-one complement",
        latex:
          "P(X \\ge 1) = 1 - q^n,\\qquad \\text{smallest } n:\\; q^n < 1 - t",
      },
      authoredExample: {
        prompt:
          "A die is rolled 3 times. Find the probability of getting at least one six.",
        steps: [
          "Success = 'six', so \\(p = \\tfrac16\\), \\(q = \\tfrac56\\), \\(n = 3\\).",
          "Use the complement: \\(P(X \\ge 1) = 1 - P(X = 0) = 1 - q^3\\).",
          "\\(q^3 = \\left(\\tfrac56\\right)^3 = \\tfrac{125}{216}\\).",
          "So \\(P(X \\ge 1) = 1 - \\tfrac{125}{216} = \\tfrac{91}{216}\\).",
        ],
        answer: "\\(P(\\text{at least one six}) = \\dfrac{91}{216}\\)",
      },
      selfCheckExample: {
        prompt:
          "A biased coin shows heads with probability \\(\\tfrac13\\). What is the least number of tosses so that the probability of getting at least one head exceeds \\(\\tfrac{80}{81}\\)?",
        steps: [
          "\\(P(\\text{at least one head}) = 1 - \\left(\\tfrac23\\right)^n > \\tfrac{80}{81}\\).",
          "So \\(\\left(\\tfrac23\\right)^n < \\tfrac{1}{81}\\), i.e. \\(\\tfrac{2^n}{3^n} < \\tfrac{1}{81} = \\tfrac{1}{3^4}\\).",
          "Try \\(n=4\\): \\(\\tfrac{16}{81} \\not< \\tfrac{1}{81}\\). The inequality \\(2^n < 3^{\\,n-4}\\) first holds when the right side overtakes; testing \\(n=11\\) gives \\(2^{11}=2048 < 3^7=2187\\), while \\(n=10\\) gives \\(1024 \\not< 729\\).",
          "Least integer \\(n = 11\\).",
        ],
        answer: "Least \\(n = 11\\)",
      },
      practiceSet: [
        { prompt: "Write \\(P(\\text{at least one defective})\\) for 10 draws with 10% defective rate.", answer: "\\(1 - \\left(\\tfrac{9}{10}\\right)^{10}\\)", method: "1 − (good fraction)ⁿ" },
        { prompt: "Fair coin: smallest n with \\(P(\\text{at least one head}) > 0.99\\)?", answer: "\\(n = 7\\)", method: "\\(2^n > 100\\)" },
        { prompt: "Why use the complement for 'at least one'?", answer: "Its opposite is the single term \\(q^n\\), so \\(1-q^n\\) replaces a long sum" },
        { prompt: "For \\(B(4, \\tfrac14)\\), \\(P(X \\ge 1) = ?\\)", answer: "\\(1 - \\left(\\tfrac34\\right)^4 = \\tfrac{175}{256}\\)", method: "\\(1 - q^4\\)" },
      ],
      pyqExampleId: "d4e65e89-598a-4796-a285-29c384d50a60", // 10 bulbs, ≥1 defective → 1 − (9/10)^10
      traps: [
        {
          title: "At least one = 1 − qⁿ, not p or np",
          body:
            "\\(P(X \\ge 1) = 1 - q^n\\) where \\(q^n\\) is the probability of NO successes across all n trials. It is not \\(p\\) (one trial) and not \\(np\\) (the mean). For 10 bulbs at a 10% defective rate the answer is \\(1 - (9/10)^{10}\\), never \\(10\\times\\tfrac1{10}\\).",
        },
        {
          title: "For 'smallest n', solve the inequality — don't just plug the mean",
          body:
            "\\(P(\\text{at least one head}) > 0.99\\) becomes \\((1/2)^n < 0.01\\), i.e. \\(2^n > 100\\). Since \\(2^6 = 64 < 100\\) but \\(2^7 = 128 > 100\\), the minimum is \\(n = 7\\). Stopping at \\(n=6\\) (the last value that FAILS) is the classic off-by-one.",
        },
      ],
    },

    // 3 — ranges & symmetric events via complements (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-ranges-complements",
      name: "Ranges and Symmetric Events by Complement",
      intuition:
        "An absolute-value or interval condition like \\(|X-4|\\le 2\\) or \\(2 \\le X \\le 6\\) names a block of r-values. If the block covers most of 0…n, it is far quicker to subtract the few EXCLUDED terms from 1 than to add the many included ones.",
      definition:
        "Unpack the condition to an interval of integers, then choose the shorter side:\n" +
        "- \\(|X - a| \\le b\\) means \\(a - b \\le X \\le a + b\\). For \\(X \\sim B(6,\\tfrac12)\\), \\(|X-4|\\le 2\\) gives \\(2 \\le X \\le 6\\).\n" +
        "- Since X can only be \\(0..6\\), that block excludes just \\(X=0\\) and \\(X=1\\): \\(P(2 \\le X \\le 6) = 1 - P(0) - P(1)\\).\n" +
        "- With \\(p=q=\\tfrac12\\), \\(P(r) = \\binom{6}{r}/2^6\\), so \\(P(0)+P(1) = \\tfrac{1+6}{64} = \\tfrac{7}{64}\\) and the answer is \\(1 - \\tfrac{7}{64} = \\tfrac{57}{64}\\).",
      formula: {
        label: "Absolute-value condition and the complement of a range",
        latex:
          "|X - a| \\le b \\iff a-b \\le X \\le a+b,\\qquad P(a{-}b \\le X \\le a{+}b) = 1 - \\!\\!\\sum_{r \\,\\notin\\, [a-b,\\,a+b]} \\!\\!P(r)",
      },
      authoredExample: {
        prompt:
          "For \\(X \\sim B\\!\\left(5, \\tfrac12\\right)\\), find \\(P(|X - 2| \\le 3)\\).",
        steps: [
          "\\(|X-2| \\le 3\\) means \\(-1 \\le X \\le 5\\).",
          "Since X only takes values \\(0,1,\\dots,5\\), every value qualifies.",
          "So the interval is the whole sample space.",
          "\\(P(|X-2|\\le 3) = 1\\).",
        ],
        answer: "\\(P(|X-2| \\le 3) = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(X \\sim B\\!\\left(4, \\tfrac12\\right)\\), find \\(P(1 \\le X \\le 3)\\) using the complement.",
        steps: [
          "The excluded values are \\(X = 0\\) and \\(X = 4\\).",
          "\\(P(0) = \\left(\\tfrac12\\right)^4 = \\tfrac{1}{16}\\); \\(P(4) = \\left(\\tfrac12\\right)^4 = \\tfrac{1}{16}\\).",
          "\\(P(1 \\le X \\le 3) = 1 - \\tfrac{1}{16} - \\tfrac{1}{16} = \\tfrac{14}{16}\\).",
          "Simplify: \\(\\tfrac{14}{16} = \\tfrac{7}{8}\\).",
        ],
        answer: "\\(P(1 \\le X \\le 3) = \\dfrac{7}{8}\\)",
      },
      practiceSet: [
        { prompt: "Rewrite \\(|X - 4| \\le 2\\) as an interval of integers.", answer: "\\(2 \\le X \\le 6\\)", method: "\\(a-b \\le X \\le a+b\\)" },
        { prompt: "For \\(B(6,\\tfrac12)\\), which values does \\(2 \\le X \\le 6\\) exclude?", answer: "\\(X = 0\\) and \\(X = 1\\)" },
        { prompt: "\\(B(6,\\tfrac12)\\): compute \\(P(0)+P(1)\\).", answer: "\\(\\tfrac{1+6}{64} = \\tfrac{7}{64}\\)", method: "\\(\\binom60 + \\binom61 = 7\\) over \\(2^6\\)" },
        { prompt: "So for \\(B(6,\\tfrac12)\\), \\(P(|X-4|\\le 2) = ?\\)", answer: "\\(1 - \\tfrac{7}{64} = \\tfrac{57}{64}\\)", method: "complement of the two excluded terms" },
      ],
      pyqExampleId: "e613b6bb-a9e3-4801-ad2b-2c7b97c3f2b5", // B(6,½), P(|X−4|≤2) → 57/64
      traps: [
        {
          title: "Cap the interval at 0 and n before counting",
          body:
            "\\(|X-4| \\le 2\\) reads \\(2 \\le X \\le 6\\), but if \\(n=6\\) then \\(X\\) can never exceed 6 anyway — the upper end \\(X\\le 6\\) is free. So the condition really excludes only \\(X=0,1\\). Counting phantom values above n (or below 0) inflates the sum.",
        },
        {
          title: "Use the complement when the range is most of 0…n",
          body:
            "For \\(2 \\le X \\le 6\\) on \\(B(6,\\tfrac12)\\), adding five terms \\(P(2)+\\dots+P(6)\\) is slow; subtracting the two excluded terms \\(1 - P(0) - P(1) = 1 - \\tfrac{7}{64} = \\tfrac{57}{64}\\) is instant. Always compare the count of included vs excluded terms and take the shorter route.",
        },
      ],
    },

    // 4 — special counting variants (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-special-counting",
      name: "Special Counting — Even Successes, Expected Frequency, and Fixed-Trial Events",
      intuition:
        "A cluster of questions dress the binomial up in a counting twist: 'even number of heads' collapses via the \\((1\\pm1)^n\\) identity to exactly \\(\\tfrac12\\); repeating an experiment N times makes the EXPECTED count of an event = N × P(event); and 'the second success on the third trial' fixes the last trial's outcome, so it is a smaller binomial times one more factor of p.",
      definition:
        "Three recurring twists, each with its own hook:\n" +
        "- **Even (or odd) number of successes:** \\(\\sum_{r\\text{ even}}\\binom{n}{r} = \\dfrac{(1+1)^n + (1-1)^n}{2} = 2^{\\,n-1}\\). For a fair coin, \\(P(\\text{even heads}) = \\dfrac{2^{\\,n-1}}{2^n} = \\dfrac12\\) (for any \\(n\\ge 1\\)).\n" +
        "- **Expected frequency over N repeats:** if one experiment gives the event probability \\(P\\), then repeating it \\(N\\) times gives expected count \\(N \\cdot P\\) (this is the mean of a Binomial(\\(N,P\\))).\n" +
        "- **Event fixed at a specific trial** ('second success at the 3rd match'): FIX the last trial as a success, and require exactly the remaining successes among the earlier trials: \\(P = \\binom{2}{1}p\\,q \\cdot p\\) for a second win at match 3.\n" +
        "- **Small-n sums** like \\(P(X=1)+P(X=2)\\) are just two PMF terms added directly.",
      formula: {
        label: "Even-count identity and expected frequency",
        latex:
          "\\sum_{r\\text{ even}}\\binom{n}{r} = 2^{\\,n-1},\\qquad \\mathbb{E}[\\text{count over } N] = N \\cdot P(\\text{event})",
      },
      authoredExample: {
        prompt:
          "Three fair dice are thrown together, and this experiment is repeated 40 times. Find the expected number of times at least one die shows a six.",
        steps: [
          "For one throw of three dice, \\(P(\\text{at least one six}) = 1 - \\left(\\tfrac56\\right)^3 = 1 - \\tfrac{125}{216} = \\tfrac{91}{216}\\).",
          "The experiment repeats \\(N = 40\\) times, so the expected count is \\(N \\cdot P\\).",
          "Expected \\(= 40 \\times \\tfrac{91}{216} = \\tfrac{3640}{216} = \\tfrac{455}{27}\\).",
          "As a decimal that is about \\(16.85\\).",
        ],
        answer: "Expected number of times \\(= \\dfrac{455}{27} \\approx 16.85\\)",
      },
      selfCheckExample: {
        prompt:
          "The probability a team wins any match is \\(\\tfrac12\\), matches independent. Find the probability the team's second win occurs exactly at the third match.",
        steps: [
          "Fix a WIN at the third match (probability \\(\\tfrac12\\)).",
          "Among the first two matches there must be exactly one win: \\(\\binom{2}{1}\\left(\\tfrac12\\right)^1\\left(\\tfrac12\\right)^1 = 2\\cdot\\tfrac14 = \\tfrac12\\).",
          "Multiply: \\(\\tfrac12 \\times \\tfrac12 = \\tfrac14\\).",
          "So the second win at the third match has probability \\(\\tfrac14\\).",
        ],
        answer: "\\(P = \\dfrac14\\)",
      },
      practiceSet: [
        { prompt: "A fair coin is tossed 100 times. Probability of an even number of heads?", answer: "\\(\\tfrac12\\)", method: "\\((1{+}1)^n + (1{-}1)^n\\) over \\(2\\cdot2^n\\)" },
        { prompt: "One experiment has event probability \\(\\tfrac{11}{27}\\); repeated 27 times, expected count?", answer: "\\(27 \\times \\tfrac{11}{27} = 11\\)", method: "\\(N \\cdot P\\)" },
        { prompt: "Two cards drawn with replacement; \\(P(\\text{king})=\\tfrac1{13}\\). Find \\(P(X=1)+P(X=2)\\).", answer: "\\(\\tfrac{24}{169} + \\tfrac{1}{169} = \\tfrac{25}{169}\\)", method: "add the two PMF terms" },
        { prompt: "How do you handle 'the second success at the 3rd trial'?", answer: "Fix the 3rd trial as a success, put exactly one success in the first two: \\(\\binom21 pq \\cdot p\\)", method: "last trial is not free" },
      ],
      pyqExampleId: "c4df4a20-a3e0-4de9-8bfd-835fbc6b2cf4", // 4 dice thrown 27× → expected ≥2 show 3 or 5 = 11
      traps: [
        {
          title: "Even number of heads on a fair coin is exactly 1/2",
          body:
            "For a FAIR coin, \\(P(\\text{even number of heads}) = \\tfrac12\\) regardless of how many tosses — because \\(\\sum_{r\\text{ even}}\\binom{n}{r} = 2^{\\,n-1}\\), half of \\(2^n\\). Do not try to add 51 separate terms for 100 tosses; the identity gives \\(\\tfrac12\\) instantly. (This clean split needs \\(p=q=\\tfrac12\\).)",
        },
        {
          title: "Expected frequency is N × P, not N × p",
          body:
            "When a whole experiment is repeated N times, the expected number of times an EVENT happens is \\(N \\times P(\\text{event})\\), where \\(P(\\text{event})\\) is worked out for one experiment first. For '4 dice thrown 27 times, at least two show a 3 or 5', find \\(P(X\\ge 2)=\\tfrac{11}{27}\\) for one throw, then \\(27\\times\\tfrac{11}{27}=11\\).",
        },
        {
          title: "'Second success at the third trial' fixes the last trial",
          body:
            "This is NOT \\(\\binom{3}{2}p^2q\\) (that would let the second win fall anywhere in three trials). The third trial MUST be a win, and exactly one of the first two is a win: \\(\\binom21 p\\,q \\cdot p\\). With \\(p=\\tfrac12\\) this is \\(2\\cdot\\tfrac14\\cdot\\tfrac12 = \\tfrac14\\).",
        },
      ],
    },

    // 5 — finding p first from a hidden condition (anchored)
    {
      kind: "formula" as const,
      slug: "cetbd-finding-p",
      name: "Finding p First When the Stem Hides It",
      intuition:
        "Some stems don't hand you p — they describe an event ('the product of the two digits is 24', 'the die shows a 3 or a 5') and expect you to compute p by counting favourable outcomes over the total. Get p right, THEN run the usual binomial. A miscount of the favourable numbers is the whole difficulty.",
      definition:
        "Two steps: (1) count to get p, (2) apply the binomial to the required event.\n" +
        "- **Count the favourable outcomes.** For two-digit numbers 00–99 (100 in all) with digit product 24: \\(\\{38, 46, 64, 83\\}\\), so \\(p = \\tfrac{4}{100} = \\tfrac{1}{25}\\), \\(q = \\tfrac{24}{25}\\).\n" +
        "- **Mind the sample space.** '10–99' is 90 numbers, '00–99' is 100 — the denominator changes p, so read the range carefully.\n" +
        "- **Then the binomial.** With \\(n=4\\), \\(P(X \\ge 3) = \\binom{4}{3}p^3q + p^4 = p^3(4q + p)\\).",
      formula: {
        label: "p by counting, then the at-least-3 binomial",
        latex:
          "p = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}},\\qquad P(X \\ge 3) = \\binom{4}{3}p^3 q + p^4 = p^3(4q + p)",
      },
      authoredExample: {
        prompt:
          "A two-digit number is picked at random (with replacement) from 00, 01, …, 99. Event E is 'the product of the two digits equals 6'. If four numbers are picked, find P(E occurs at least 3 times), as a sum of terms.",
        steps: [
          "Count numbers with digit product 6: \\(1\\times6, 6\\times1, 2\\times3, 3\\times2 \\Rightarrow \\{16, 61, 23, 32\\}\\) — 4 numbers out of 100.",
          "So \\(p = \\tfrac{4}{100} = \\tfrac{1}{25}\\), \\(q = \\tfrac{24}{25}\\), \\(n = 4\\).",
          "'At least 3' \\(= \\binom{4}{3}p^3 q + p^4 = 4\\left(\\tfrac{1}{25}\\right)^3\\left(\\tfrac{24}{25}\\right) + \\left(\\tfrac{1}{25}\\right)^4\\).",
          "Factor \\(p^3\\): \\(\\left(\\tfrac{1}{25}\\right)^3\\left(4\\cdot\\tfrac{24}{25} + \\tfrac{1}{25}\\right) = \\left(\\tfrac{1}{25}\\right)^4(96 + 1) = \\tfrac{97}{25^4}\\).",
        ],
        answer: "\\(P(X \\ge 3) = \\dfrac{97}{25^4}\\)",
      },
      selfCheckExample: {
        prompt:
          "A number is chosen at random with replacement from the two-digit numbers 10, 11, …, 99. Event E is 'the digit product is 18'. Find p and q.",
        steps: [
          "Two-digit numbers 10–99 total \\(90\\).",
          "Digit product 18: \\(2\\times9, 9\\times2, 3\\times6, 6\\times3 \\Rightarrow \\{29, 92, 36, 63\\}\\) — 4 numbers.",
          "So \\(p = \\tfrac{4}{90} = \\tfrac{2}{45}\\).",
          "And \\(q = 1 - \\tfrac{4}{90} = \\tfrac{86}{90} = \\tfrac{43}{45}\\).",
        ],
        answer: "\\(p = \\dfrac{2}{45},\\ q = \\dfrac{43}{45}\\)",
      },
      practiceSet: [
        { prompt: "Among 00–99, how many numbers have digit product 24, and what is p?", answer: "\\(\\{38,46,64,83\\}\\), so \\(p = \\tfrac{4}{100} = \\tfrac{1}{25}\\)", method: "list factor pairs of 24 that are single digits" },
        { prompt: "Among 10–99 (90 numbers), how many have digit product 18?", answer: "\\(\\{29, 92, 36, 63\\}\\) — 4 numbers", method: "single-digit factor pairs of 18" },
        { prompt: "Write \\(P(X\\ge 3)\\) for \\(B(4,p)\\) in factored form.", answer: "\\(p^3(4q + p)\\)", method: "\\(\\binom43 p^3 q + p^4\\)" },
        { prompt: "Why does the range '00–99' vs '10–99' matter?", answer: "It changes the total (100 vs 90), hence p", method: "denominator of p = size of sample space" },
      ],
      pyqExampleId: "c3b1dd23-298c-42d2-b055-d856c4a1bd7f", // product = 24, ≥3 of 4 → 97/25⁴
      traps: [
        {
          title: "Count the favourable numbers carefully — this is where marks are lost",
          body:
            "For 'digit product = 24' among 00–99 the only numbers are \\(\\{38, 46, 64, 83\\}\\) (since \\(3\\times8\\) and \\(4\\times6\\) are the single-digit factorisations). Listing wrong pairs — or forgetting the reversed order like 46 AND 64 — changes p and wrecks the answer.",
        },
        {
          title: "Read the sample-space range: 00–99 is 100, 10–99 is 90",
          body:
            "\\(p = \\dfrac{\\text{favourable}}{\\text{total}}\\), so the denominator depends on the stated range. '00 to 99' gives 100 numbers (\\(p=\\tfrac4{100}\\)); '10 to 99' gives 90 (\\(p=\\tfrac4{90}\\)). Using the wrong total gives a plausible-but-wrong option — the MHT-CET distractors exploit exactly this.",
        },
        {
          title: "After finding p, still add all the terms for 'at least 3'",
          body:
            "'Occurs at least 3 times' in 4 trials is \\(\\binom43 p^3 q + p^4\\), not just \\(\\binom43 p^3 q\\). The \\(p^4\\) (all four) term is small but the options are built to differ by exactly it — e.g. \\(\\tfrac{97}{25^4}\\) vs \\(\\tfrac{96}{25^4}\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "The binomial setting and P(X=r) formula",
      href: "/notes/mht-cet-maths/binomial-distribution/binomial-setting-pmf",
    },
    {
      label: "Binomial mean, variance and standard deviation",
      href: "/notes/mht-cet-maths/binomial-distribution/binomial-mean-variance",
    },
  ],
};
