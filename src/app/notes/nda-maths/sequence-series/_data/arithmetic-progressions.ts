import type { SubtopicNote } from "@/app/notes/_types";

export const ARITHMETIC_PROGRESSIONS_NOTE: SubtopicNote = {
  subtopicName: "Arithmetic Progressions",
  title: "Arithmetic Progressions — the constant-difference engine",
  oneLineDefinition:
    "A list of numbers where each term is the one before it plus a fixed step — so the nth term and the running total both have clean formulas.",
  whyItMatters:
    "The single biggest section of the chapter — 42 PYQs across 2017–2026, almost all EASY or " +
    "MODERATE. NDA tests four things over and over: the nth term and sum, recovering the AP from a " +
    "given sum-formula, the symmetric-term and mean tricks, and a handful of elegant identities " +
    "(sum of m terms = n, sum of n terms = m, and the like). Learn the eight concepts below and you " +
    "bank four to six marks on sight, every paper.",
  concepts: [
    // C1 — foundations: sequence vs series, term, sigma (FOUNDATION, no PYQ)
    {
      kind: "formula" as const,
      slug: "foundations-sequence-series",
      name: "Sequence, series, and the nth term",
      intuition:
        "A sequence is just an ordered list of numbers; a series is what you get when you add a " +
        "sequence up. The whole chapter is about two questions: what is the term sitting in position " +
        "\\(n\\) (the nth term \\(a_n\\)), and what is the running total of the first \\(n\\) terms " +
        "(the sum \\(S_n\\))? Everything else is a special pattern of those two.",
      definition:
        "A **sequence** \\(a_1, a_2, a_3, \\ldots\\) lists terms by position; \\(a_n\\) (also written " +
        "\\(T_n\\)) is the **nth term** or general term. A **series** is the sum " +
        "\\(a_1 + a_2 + \\cdots + a_n\\), written compactly as \\(S_n = \\sum_{k=1}^{n} a_k\\). Two " +
        "bridges connect them:\n" +
        "- \\(S_n = a_1 + a_2 + \\cdots + a_n\\) (add up the first \\(n\\) terms).\n" +
        "- \\(a_n = S_n - S_{n-1}\\) for \\(n \\ge 2\\), and \\(a_1 = S_1\\) (each term is the jump in the running total).",
      formula: {
        label: "The two bridges between term and sum",
        latex: "a_n = S_n - S_{n-1}\\quad (n \\ge 2), \\qquad a_1 = S_1",
      },
      authoredExample: {
        prompt:
          "A sequence has \\(a_n = 4n - 1\\). Write its first four terms and find \\(S_4\\).",
        steps: [
          "Substitute \\(n = 1,2,3,4\\): \\(a_1 = 3,\\ a_2 = 7,\\ a_3 = 11,\\ a_4 = 15\\).",
          "The series is \\(3 + 7 + 11 + 15\\).",
          "Add: \\(S_4 = 36\\).",
        ],
        answer: "Terms \\(3, 7, 11, 15\\); \\(S_4 = 36\\).",
      },
      practiceSet: [
        { prompt: "If \\(a_n = 2n + 1\\), what is \\(a_5\\)?", answer: "\\(11\\)" },
        { prompt: "First three terms of \\(a_n = n^2\\)?", answer: "\\(1, 4, 9\\)" },
        { prompt: "If \\(S_3 = 12\\) and \\(S_2 = 7\\), what is \\(a_3\\)?", answer: "\\(5\\)", method: "\\(a_3 = S_3 - S_2\\)" },
        { prompt: "Write \\(2 + 4 + 6 + \\cdots\\) (to n terms) in sigma form.", answer: "\\(\\sum_{k=1}^{n} 2k\\)" },
      ],
    },

    // C2 — nth term and sum of an AP
    {
      kind: "formula" as const,
      slug: "ap-nth-term-and-sum",
      name: "nth term and sum of an AP",
      intuition:
        "In an AP every step is the same size — the common difference \\(d\\). So the nth term is the " +
        "first term plus \\((n-1)\\) steps, and the sum is just the number of terms times the average " +
        "of the first and last term (the average is the midpoint because the terms are evenly spaced).",
      definition:
        "An **arithmetic progression** has first term \\(a\\) and **common difference** " +
        "\\(d = a_{k+1} - a_k\\) (constant). Then:\n" +
        "- **nth term:** \\(a_n = a + (n-1)d\\).\n" +
        "- **Sum of \\(n\\) terms:** \\(S_n = \\dfrac{n}{2}\\,[\\,2a + (n-1)d\\,] = \\dfrac{n}{2}(a + l)\\), where \\(l = a_n\\) is the last term.\n" +
        "The \\(\\tfrac{n}{2}(a+l)\\) form is fastest whenever you can see the first and last terms.",
      formula: {
        label: "nth term and sum",
        latex: "a_n = a + (n-1)d, \\qquad S_n = \\frac{n}{2}\\,[\\,2a + (n-1)d\\,] = \\frac{n}{2}(a + l)",
        symbols: [
          { symbol: "\\(a\\)", meaning: "first term" },
          { symbol: "\\(d\\)", meaning: "common difference" },
          { symbol: "\\(l\\)", meaning: "last term \\(a_n\\)" },
        ],
      },
      authoredExample: {
        prompt: "Find the sum of all two-digit multiples of 7.",
        steps: [
          "The terms are \\(14, 21, 28, \\ldots, 98\\): an AP with \\(a = 14,\\ d = 7,\\ l = 98\\).",
          "Number of terms: \\(n = \\dfrac{98 - 14}{7} + 1 = 12 + 1 = 13\\).",
          "Sum \\(= \\dfrac{n}{2}(a + l) = \\dfrac{13}{2}(14 + 98) = \\dfrac{13}{2}\\times 112 = 13 \\times 56\\).",
        ],
        answer: "\\(728\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of the first 20 terms of the AP \\(3, 7, 11, 15, \\ldots\\)",
        steps: [
          "\\(a = 3,\\ d = 4,\\ n = 20\\).",
          "\\(S_{20} = \\dfrac{20}{2}\\,[\\,2(3) + 19(4)\\,] = 10\\,[6 + 76] = 10 \\times 82\\).",
        ],
        answer: "\\(820\\).",
      },
      practiceSet: [
        { prompt: "10th term of \\(2, 5, 8, \\ldots\\)?", answer: "\\(29\\)", method: "\\(2 + 9\\times 3\\)" },
        { prompt: "Sum of first 10 natural numbers?", answer: "\\(55\\)", method: "\\(\\tfrac{10}{2}(1+10)\\)" },
        { prompt: "Sum of \\(5 + 10 + 15 + \\cdots\\) to 20 terms?", answer: "\\(1050\\)", method: "\\(\\tfrac{20}{2}(10 + 19\\times 5)\\)" },
        { prompt: "How many terms in \\(7, 11, \\ldots, 79\\)?", answer: "\\(19\\)", method: "\\(\\tfrac{79-7}{4}+1\\)" },
      ],
      pyqExampleId: "1453dac4-28e7-4f04-ba85-76287fa753cd", // 2017 — sum of two-digit odd numbers
      traps: [
        {
          title: "The nth term uses \\((n-1)d\\), not \\(nd\\)",
          body:
            "The first term already sits at position 1 with zero steps taken, so reaching position " +
            "\\(n\\) needs \\((n-1)\\) steps: \\(a_n = a + (n-1)d\\). Writing \\(a + nd\\) overshoots by " +
            "one full step. For \\(2, 5, 8, \\ldots\\) the 10th term is \\(2 + 9(3) = 29\\), not " +
            "\\(2 + 10(3) = 32\\).",
        },
        {
          title: "The sum has \\((n-1)d\\) inside the bracket",
          body:
            "The sum is \\(S_n = \\tfrac{n}{2}[\\,2a + (n-1)d\\,]\\) — the same \\((n-1)\\) off-by-one " +
            "lives inside. A frequent slip is \\(\\tfrac{n}{2}[\\,2a + nd\\,]\\). For \\(3, 7, 11, \\ldots\\) " +
            "the sum of 20 terms is \\(\\tfrac{20}{2}[6 + 19(4)] = 820\\), not \\(\\tfrac{20}{2}[6 + 20(4)] = 860\\).",
        },
    ],
    },

    // C3 — recover nth term from a sum-formula
    {
      kind: "formula" as const,
      slug: "ap-nth-term-from-sum",
      name: "Recovering the term from a sum-formula",
      intuition:
        "When the question hands you \\(S_n\\) as a formula in \\(n\\) (often a quadratic), you do not " +
        "need to find \\(a\\) and \\(d\\) first. The term in position \\(n\\) is simply the jump in the " +
        "running total: \\(a_n = S_n - S_{n-1}\\). If \\(S_n\\) is a quadratic in \\(n\\), the sequence " +
        "is automatically an AP and \\(a_n\\) comes out linear in \\(n\\).",
      definition:
        "Given \\(S_n\\) as a function of \\(n\\), the nth term is \\(a_n = S_n - S_{n-1}\\). " +
        "A quadratic \\(S_n = An^2 + Bn\\) (no constant term) always describes an AP with common " +
        "difference \\(2A\\) and first term \\(A + B\\). A non-zero constant term means the very first " +
        "term breaks the pattern (use \\(a_1 = S_1\\) separately).",
      formula: {
        label: "Term from sum",
        latex: "a_n = S_n - S_{n-1}\\quad (n \\ge 2)",
      },
      authoredExample: {
        prompt:
          "The sum of the first \\(n\\) terms of an AP is \\(S_n = 2n^2 + 3n\\). Find its nth term.",
        steps: [
          "\\(a_n = S_n - S_{n-1} = (2n^2 + 3n) - \\big[\\,2(n-1)^2 + 3(n-1)\\,\\big]\\).",
          "Expand \\(2(n-1)^2 + 3(n-1) = 2n^2 - 4n + 2 + 3n - 3 = 2n^2 - n - 1\\).",
          "Subtract: \\(a_n = (2n^2 + 3n) - (2n^2 - n - 1) = 4n + 1\\).",
        ],
        answer: "\\(a_n = 4n + 1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(S_n = n(n+1)\\) for an AP, find its fourth term.",
        steps: [
          "\\(a_n = S_n - S_{n-1} = n(n+1) - (n-1)n = n\\,[(n+1) - (n-1)] = 2n\\).",
          "So \\(a_4 = 2(4) = 8\\).",
        ],
        answer: "\\(a_4 = 8\\).",
      },
      practiceSet: [
        { prompt: "If \\(S_n = n^2\\), find \\(a_n\\).", answer: "\\(2n - 1\\)", method: "\\(n^2 - (n-1)^2\\)" },
        { prompt: "If \\(S_n = 3n^2\\), the common difference is?", answer: "\\(6\\)", method: "\\(d = 2A\\) with \\(A = 3\\)" },
        { prompt: "If \\(S_n = n(2n+1)\\), find \\(a_n\\).", answer: "\\(4n - 1\\)" },
        { prompt: "If \\(S_n = 5n - 2n^2\\), find \\(a_3\\).", answer: "\\(-5\\)", method: "\\(S_3 - S_2 = (-3) - 2\\)" },
      ],
      pyqExampleId: "d9190cd6-55b3-4d21-9871-6dd7fa3d3048", // 2026 — Sn=3n^2+5n, mth term 68 -> m
    },

    // C4 — means and symmetric terms
    {
      kind: "formula" as const,
      slug: "ap-means-symmetric-terms",
      name: "The arithmetic mean and symmetric terms",
      intuition:
        "Three numbers in AP have their middle term equal to the average of the outer two — that is " +
        "the arithmetic mean. When a problem gives you the sum of an even spread of terms, choosing " +
        "them symmetrically about a centre (\\(a - d, a, a + d\\) for three; \\(a - 3d, a - d, a + d, " +
        "a + 3d\\) for four) makes the unknowns cancel and the sum collapse to a single variable.",
      definition:
        "The **arithmetic mean** of \\(a\\) and \\(b\\) is \\(\\dfrac{a + b}{2}\\); inserting it between " +
        "them makes three terms in AP. Two symmetry facts solve most AP word-problems:\n" +
        "- **Equidistant terms sum to a constant:** \\(a_k + a_{n+1-k} = a_1 + a_n\\) for every \\(k\\).\n" +
        "- **Symmetric choice:** pick 3 unknown terms as \\(a-d,\\ a,\\ a+d\\) and 4 as \\(a-3d,\\ a-d,\\ a+d,\\ a+3d\\) — then the sum gives \\(a\\) immediately.",
      formula: {
        label: "Arithmetic mean of a and b",
        latex: "\\text{AM} = \\frac{a + b}{2}",
      },
      authoredExample: {
        prompt:
          "Three numbers are in AP with sum 15 and product 80. Find the numbers.",
        steps: [
          "Take the three terms as \\(a - d,\\ a,\\ a + d\\).",
          "Sum: \\((a-d) + a + (a+d) = 3a = 15 \\Rightarrow a = 5\\).",
          "Product: \\((5-d)(5)(5+d) = 5(25 - d^2) = 80 \\Rightarrow 25 - d^2 = 16 \\Rightarrow d^2 = 9 \\Rightarrow d = 3\\).",
        ],
        answer: "The numbers are \\(2, 5, 8\\).",
      },
      selfCheckExample: {
        prompt: "Three numbers are in AP with sum 21 and sum of squares 155. Find them.",
        steps: [
          "Take \\(a - d,\\ a,\\ a + d\\): sum \\(= 3a = 21 \\Rightarrow a = 7\\).",
          "Sum of squares: \\((7-d)^2 + 49 + (7+d)^2 = 155 \\Rightarrow 147 + 2d^2 = 155\\).",
          "\\(2d^2 = 8 \\Rightarrow d^2 = 4 \\Rightarrow d = 2\\).",
        ],
        answer: "The numbers are \\(5, 7, 9\\).",
      },
      practiceSet: [
        { prompt: "Arithmetic mean of \\(8\\) and \\(20\\)?", answer: "\\(14\\)" },
        { prompt: "In an AP of 9 terms, \\(a_1 + a_9 = 30\\). What is \\(a_4 + a_6\\)?", answer: "\\(30\\)", method: "equidistant pairs are equal" },
        { prompt: "Three numbers in AP sum to 18; what is the middle one?", answer: "\\(6\\)", method: "middle \\(= \\text{sum}/3\\)" },
        { prompt: "Insert one AM between \\(7\\) and \\(17\\).", answer: "\\(12\\)" },
      ],
      pyqExampleId: "ae62e269-8a7d-4c2c-830f-9f0219aaa2df", // 2023 — p,q,r,s in AP, p+s=8, qr=15
      traps: [
        {
          title: "Inserting \\(k\\) means makes \\(k+1\\) gaps, not \\(k\\)",
          body:
            "Putting \\(k\\) arithmetic means between \\(a\\) and \\(b\\) builds a \\((k+2)\\)-term AP, " +
            "which has \\(k+1\\) equal steps between the endpoints — so the common difference is " +
            "\\(d = \\dfrac{b-a}{k+1}\\), NOT \\(\\dfrac{b-a}{k}\\). Inserting 3 means between 2 and 14 " +
            "gives \\(d = \\tfrac{12}{4} = 3\\) (means \\(5, 8, 11\\)), not \\(\\tfrac{12}{3} = 4\\).",
        },
    ],
    },

    // C5 — three-in-AP condition + linear transforms
    {
      kind: "formula" as const,
      slug: "ap-properties-condition",
      name: "The three-term condition and what preserves an AP",
      intuition:
        "Three numbers are in AP exactly when the middle is the average of the other two — " +
        "equivalently, twice the middle equals the sum of the ends. And an AP stays an AP if you add " +
        "a constant to every term, or multiply every term by a (non-zero) constant: those operations " +
        "just shift or rescale the common difference. Squaring or taking reciprocals does NOT preserve it.",
      definition:
        "Numbers \\(a, b, c\\) are in AP \\(\\iff 2b = a + c\\). Operations that keep an AP an AP " +
        "(they map a constant difference to a constant difference):\n" +
        "- adding/subtracting a constant \\(k\\): \\(a+k,\\ b+k,\\ c+k\\) (or \\(k-a,\\ k-b,\\ k-c\\));\n" +
        "- multiplying/dividing by a non-zero constant \\(k\\): \\(ka,\\ kb,\\ kc\\) and \\(\\tfrac{a}{k},\\ \\tfrac{b}{k},\\ \\tfrac{c}{k}\\).\n" +
        "Squaring the terms or taking reciprocals generally breaks the AP.",
      formula: {
        label: "Three terms in AP",
        latex: "a,\\ b,\\ c \\text{ in AP} \\iff 2b = a + c",
      },
      authoredExample: {
        prompt:
          "For what value of \\(k\\) are \\(k - 1,\\ 2k,\\ 7\\) in arithmetic progression?",
        steps: [
          "Apply \\(2b = a + c\\) with \\(b = 2k,\\ a = k-1,\\ c = 7\\).",
          "\\(2(2k) = (k - 1) + 7 \\Rightarrow 4k = k + 6\\).",
          "\\(3k = 6 \\Rightarrow k = 2\\). (Check: terms become \\(1, 4, 7\\) — an AP with \\(d = 3\\).)",
        ],
        answer: "\\(k = 2\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a, b, c\\) are in AP, show that \\(a + 4,\\ b + 4,\\ c + 4\\) are also in AP.",
        steps: [
          "Given \\(2b = a + c\\).",
          "Check the new middle: \\(2(b + 4) = 2b + 8 = (a + c) + 8 = (a + 4) + (c + 4)\\).",
          "So the three-term condition holds for the shifted terms.",
        ],
        answer: "Yes — adding a constant preserves the AP.",
      },
      practiceSet: [
        { prompt: "Are \\(5, 9, 13\\) in AP?", answer: "Yes", method: "\\(2(9) = 5 + 13\\)" },
        { prompt: "If \\(x, 8, 14\\) are in AP, find \\(x\\).", answer: "\\(2\\)", method: "\\(2(8) = x + 14\\)" },
        { prompt: "If \\(a, b, c\\) are in AP, are \\(3a, 3b, 3c\\) in AP?", answer: "Yes" },
        { prompt: "If \\(2, x, 18\\) are in AP, find \\(x\\).", answer: "\\(10\\)" },
      ],
      pyqExampleId: "467b7926-2c25-428a-8ddf-fa4b13877e74", // 2021 — x^2, x, -8 in AP
      traps: [
        {
          title: "Squaring breaks the AP",
          body:
            "If \\(a, b, c\\) are in AP it does NOT follow that \\(a^2, b^2, c^2\\) are in AP, nor that " +
            "\\(\\tfrac1a, \\tfrac1b, \\tfrac1c\\) are. Only adding a constant or scaling by a constant is safe. " +
            "Test with \\(1, 2, 3\\): the squares \\(1, 4, 9\\) are not in AP (\\(2\\cdot4 \\ne 1 + 9\\)).",
        },
      ],
    },

    // C6 — sum-ratio problems
    {
      kind: "formula" as const,
      slug: "ap-sum-ratios",
      name: "Ratio of sums and ratio of terms",
      intuition:
        "Two AP facts get tangled here. First, if the ratio of the sum of \\(p\\) terms to the sum of " +
        "\\(q\\) terms is given, cross-multiplying turns it into a relation between \\(a\\) and \\(d\\). " +
        "Second — the time-saver — when a problem gives the ratio of the sums of two different APs as a " +
        "formula, the ratio of their nth terms is found by replacing the term-count with \\(2n - 1\\).",
      definition:
        "For one AP, \\(\\dfrac{S_p}{S_q} = \\dfrac{p[\\,2a + (p-1)d\\,]}{q[\\,2a + (q-1)d\\,]}\\); a given " +
        "value forces a relation between \\(a\\) and \\(d\\). For **two** APs with " +
        "\\(\\dfrac{S_n}{S_n'} = \\dfrac{f(n)}{g(n)}\\), the ratio of nth terms is\n" +
        "\\[ \\frac{a_n}{a_n'} = \\frac{f(2n-1)}{g(2n-1)}, \\]\n" +
        "because the nth term equals the average of the first \\(2n-1\\) terms (the middle one), so " +
        "\\(a_n = \\tfrac{S_{2n-1}}{2n-1}\\) and the \\((2n-1)\\) cancels in the ratio.",
      formula: {
        label: "Ratio of nth terms from ratio of sums",
        latex: "\\frac{a_n}{a_n'} = \\frac{f(2n-1)}{g(2n-1)}\\quad\\text{when}\\quad \\frac{S_n}{S_n'} = \\frac{f(n)}{g(n)}",
      },
      authoredExample: {
        prompt:
          "The ratio of the sums of the first \\(n\\) terms of two APs is \\((3n + 1) : (2n + 7)\\). Find the ratio of their 9th terms.",
        steps: [
          "Replace \\(n\\) by \\(2n - 1\\); for the 9th term, \\(2(9) - 1 = 17\\).",
          "Numerator: \\(3(17) + 1 = 52\\). Denominator: \\(2(17) + 7 = 41\\).",
          "So the ratio of 9th terms is \\(52 : 41\\).",
        ],
        answer: "\\(52 : 41\\).",
      },
      selfCheckExample: {
        prompt:
          "Two APs have sum-ratio \\((7n + 1) : (4n + 27)\\). Find the ratio of their 11th terms.",
        steps: [
          "For the 11th term use \\(2(11) - 1 = 21\\).",
          "Numerator: \\(7(21) + 1 = 148\\). Denominator: \\(4(21) + 27 = 111\\).",
          "Ratio \\(= 148 : 111 = 4 : 3\\).",
        ],
        answer: "\\(4 : 3\\).",
      },
      practiceSet: [
        { prompt: "Sum-ratio \\((2n):(3n)\\) — ratio of any pair of corresponding terms?", answer: "\\(2 : 3\\)", method: "constant ratio" },
        { prompt: "To get the 5th-term ratio, replace \\(n\\) with?", answer: "\\(9\\)", method: "\\(2n-1\\)" },
        { prompt: "Sum-ratio \\((n+1):(2n+3)\\); 1st-term ratio?", answer: "\\(2 : 5\\)", method: "\\(n=1 \\Rightarrow 2n-1=1\\)" },
        { prompt: "If \\(S_p:S_q = p^2:q^2\\), then \\(d\\) equals?", answer: "\\(2a\\)" },
      ],
      pyqExampleId: "bfc075e8-676a-49fd-b1a1-06266ceb05e8", // 2024 — Sp:Sq = p^2:q^2
    },

    // C7 — clever identities
    {
      kind: "formula" as const,
      slug: "ap-clever-identities",
      name: "The clever AP identities",
      intuition:
        "A cluster of NDA favourites look hard but fall to one move: write the condition with " +
        "\\(S_n = \\tfrac{n}{2}[2a + (n-1)d]\\) or \\(a_n = a + (n-1)d\\), then let the symmetry do the " +
        "work. Three recur: sum of \\(m\\) terms \\(= n\\) and sum of \\(n\\) terms \\(= m\\) gives " +
        "\\(S_{m+n} = -(m+n)\\); \\(p\\,a_p = q\\,a_q\\) gives \\(a_{p+q} = 0\\); and equal sums " +
        "\\(S_p = S_q\\) give \\(S_{p+q} = 0\\).",
      definition:
        "Memorable consequences (each provable in two lines):\n" +
        "- If \\(S_m = n\\) and \\(S_n = m\\) (with \\(m \\ne n\\)), then \\(S_{m+n} = -(m+n)\\).\n" +
        "- If \\(p\\,a_p = q\\,a_q\\) (with \\(p \\ne q\\)), then \\(a_{p+q} = 0\\).\n" +
        "- If \\(S_p = S_q\\) (with \\(p \\ne q\\)), then \\(S_{p+q} = 0\\).\n" +
        "All three come from the same idea: a linear/quadratic in the index, pinned by two conditions.",
      authoredExample: {
        prompt:
          "In an AP, \\(p\\) times the \\(p\\)th term equals \\(q\\) times the \\(q\\)th term, with \\(p \\ne q\\). Show that the \\((p+q)\\)th term is 0.",
        steps: [
          "Write \\(a_p = a + (p-1)d\\) and \\(a_q = a + (q-1)d\\).",
          "Condition: \\(p\\,[a + (p-1)d] = q\\,[a + (q-1)d]\\).",
          "Expand: \\(pa + p(p-1)d = qa + q(q-1)d \\Rightarrow (p - q)a + [p(p-1) - q(q-1)]d = 0\\).",
          "Now \\(p(p-1) - q(q-1) = (p-q)(p+q-1)\\), so dividing by \\((p - q)\\): \\(a + (p+q-1)d = 0\\).",
          "That left side is exactly \\(a_{p+q}\\).",
        ],
        answer: "\\(a_{p+q} = 0\\).",
      },
      selfCheckExample: {
        prompt: "The sum of the first 9 terms of an AP equals the sum of its first 11 terms. Find \\(S_{20}\\).",
        steps: [
          "\\(S_{11} = S_9\\) means the 10th and 11th terms cancel: \\(a_{10} + a_{11} = 0\\).",
          "So \\(2a + 19d = 0\\).",
          "\\(S_{20} = \\dfrac{20}{2}\\,[2a + 19d] = 10 \\times 0\\).",
        ],
        answer: "\\(S_{20} = 0\\).",
      },
      practiceSet: [
        { prompt: "If \\(S_m = n\\) and \\(S_n = m\\), then \\(S_{m+n} = ?\\)", answer: "\\(-(m+n)\\)" },
        { prompt: "If \\(a_7 = 0\\) and \\(p\\,a_p = q\\,a_q\\) pattern, what is \\(a_{p+q}\\) generally?", answer: "\\(0\\)" },
        { prompt: "If \\(S_4 = S_9\\), then \\(S_{13} = ?\\)", answer: "\\(0\\)" },
        { prompt: "If \\(a_5 = a_{11}\\) in an AP, the common difference is?", answer: "\\(0\\)", method: "the AP is constant" },
      ],
      pyqExampleId: "6bbce6d9-6951-40c6-97cb-4424a24474a8", // 2017 — Sm=n, Sn=m -> S(m+n)
    },

    // C8 — special counting sums + sign handling
    {
      kind: "formula" as const,
      slug: "ap-special-sums-sign",
      name: "Counting sums, alternating signs, and the first negative term",
      intuition:
        "Two AP-flavoured shapes show up that aren't plain \\(S_n\\). First, sums of numbers fitting a " +
        "rule (\"two-digit numbers leaving remainder 2 on division by 3\") — list them, see the AP, " +
        "sum it. Second, alternating sums like \\(1 - 2 + 3 - 4 + \\cdots\\) — pair the terms so each " +
        "pair is a constant. And to find where an AP turns negative, solve \\(a_n < 0\\) for \\(n\\).",
      definition:
        "**Rule-based counting sum:** identify the qualifying numbers as an AP (first term, common " +
        "difference, last term), count them, then apply \\(S_n = \\tfrac{n}{2}(a+l)\\). " +
        "**Alternating sum:** group consecutive terms into pairs of equal value, then add the leftover. " +
        "**First negative term:** solve \\(a + (n-1)d < 0\\) for the smallest integer \\(n\\).",
      authoredExample: {
        prompt: "Find the value of \\(1 - 2 + 3 - 4 + \\cdots + 99 - 100\\).",
        steps: [
          "Pair the terms: \\((1 - 2) + (3 - 4) + \\cdots + (99 - 100)\\).",
          "Each of the pairs equals \\(-1\\), and there are \\(100/2 = 50\\) pairs.",
          "Total \\(= 50 \\times (-1) = -50\\).",
        ],
        answer: "\\(-50\\).",
      },
      selfCheckExample: {
        prompt: "In the AP \\(27, 24, 21, \\ldots\\), which term is the first negative one?",
        steps: [
          "\\(a = 27,\\ d = -3\\), so \\(a_n = 27 - 3(n-1) = 30 - 3n\\).",
          "First negative: \\(30 - 3n < 0 \\Rightarrow n > 10\\), so the smallest such \\(n\\) is 11.",
          "Check: \\(a_{11} = 30 - 33 = -3 < 0\\), while \\(a_{10} = 0\\).",
        ],
        answer: "The 11th term.",
      },
      practiceSet: [
        { prompt: "Value of \\(1 - 2 + 3 - 4 + \\cdots + 9 - 10\\)?", answer: "\\(-5\\)" },
        { prompt: "How many two-digit multiples of 3 are there?", answer: "\\(30\\)", method: "\\(12, 15, \\ldots, 99\\)" },
        { prompt: "First negative term of \\(20, 17, 14, \\ldots\\)?", answer: "8th", method: "\\(23 - 3n < 0\\)" },
        { prompt: "Value of \\(2 - 4 + 6 - 8 + \\cdots + 18 - 20\\)?", answer: "\\(-10\\)" },
      ],
      pyqExampleId: "db82ffea-485d-49be-8f25-537e7227a406", // 2018 — sum of two-digit numbers, remainder 2 mod 3
    },

    {
      kind: "formula" as const,
      slug: "common-terms-of-two-aps",
      name: "Common terms of two APs",
      intuition:
        "The numbers that appear in BOTH of two APs themselves form an AP. Its first term is the first " +
        "value common to both; its common difference is the **LCM** of the two original common " +
        "differences (the spacing at which the two sequences re-align).",
      definition:
        "If AP\\(_1\\) has common difference \\(d_1\\) and AP\\(_2\\) has \\(d_2\\), their common terms form " +
        "an AP with common difference \\(\\operatorname{lcm}(d_1, d_2)\\), starting at the first shared " +
        "value. To **count** them, take the new AP up to the smaller of the two last terms and apply " +
        "\\(n = \\big\\lfloor \\tfrac{L - a}{\\operatorname{lcm}(d_1,d_2)} \\big\\rfloor + 1\\), where \\(a\\) is " +
        "the first common term and \\(L\\) is the largest value not exceeding either list's last term.",
      formula: {
        label: "Common-terms AP",
        latex: "d_{\\text{common}} = \\operatorname{lcm}(d_1, d_2)",
      },
      authoredExample: {
        prompt: "How many terms are common to \\(3, 7, 11, \\ldots, 99\\) and \\(2, 8, 14, \\ldots, 98\\)?",
        steps: [
          "First common value: \\(11\\) (the first number in both lists).",
          "New common difference \\(= \\operatorname{lcm}(4, 6) = 12\\), so common terms are \\(11, 23, 35, \\ldots\\).",
          "Largest \\(\\le \\min(99, 98) = 98\\) of this form is \\(95\\); count \\(= \\big\\lfloor\\tfrac{95-11}{12}\\big\\rfloor + 1 = 7 + 1 = 8\\).",
        ],
        answer: "\\(8\\) common terms.",
      },
      selfCheckExample: {
        prompt: "The APs \\(5, 8, 11, \\ldots\\) and \\(5, 9, 13, \\ldots\\) share which AP of common terms?",
        steps: [
          "First common value \\(= 5\\); common differences are \\(3\\) and \\(4\\).",
          "New common difference \\(= \\operatorname{lcm}(3,4) = 12\\).",
        ],
        answer: "\\(5, 17, 29, \\ldots\\) (first term 5, common difference 12).",
      },
      practiceSet: [
        { prompt: "Common difference of the common terms of APs with \\(d_1=2, d_2=3\\)?", answer: "\\(6\\)", method: "\\(\\operatorname{lcm}(2,3)\\)" },
        { prompt: "Do the common terms of two APs form an AP?", answer: "Yes" },
        { prompt: "\\(d_1=4, d_2=6\\): spacing of common terms?", answer: "\\(12\\)" },
        { prompt: "First term of the common-terms AP?", answer: "The first value present in both APs" },
      ],
      pyqExampleId: "5ee7c025-de37-4e2c-a373-bf07a0fae15e", // 2-AP common terms, d = lcm
    },
  ],
  related: [
    { label: "Geometric Progressions", href: "/notes/nda-maths/sequence-series/seq-geometric-progressions" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
