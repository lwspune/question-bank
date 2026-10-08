import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Number Sequences",
  title: "Number Sequences: Finding the Rule",
  oneLineDefinition:
    "A number sequence follows a rule; you find it by testing, in order, a constant difference, a constant ratio, a pattern in the differences, and a rule built from earlier terms.",
  whyItMatters:
    "The 2026 ministry paper asked for a missing term in a sequence where each term is built from the two terms before it. It is one of the few items in this chapter that needs no figure at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-spa-arith-geo",
      name: "Arithmetic and geometric sequences",
      intuition:
        "The two simplest rules are \"add the same number each time\" and \"multiply by the same number each time\". Check the gaps between terms: equal gaps mean adding, equal ratios mean multiplying. Once you know the rule, a formula jumps straight to any term without listing them all.",
      definition:
        "- An **arithmetic** sequence adds a fixed **common difference** \\(d\\): for example 7, 11, 15, 19 has \\(d = 4\\).\n" +
        "- A **geometric** sequence multiplies by a fixed **common ratio** \\(r\\): for example 3, 6, 12, 24 has \\(r = 2\\).\n" +
        "- To reach the \\(n\\)th term you take \\(n - 1\\) steps from the first term.\n" +
        "- A ratio can be a fraction (81, 27, 9 has \\(r = \\tfrac{1}{3}\\)) or negative (2, \\(-6\\), 18 has \\(r = -3\\)).",
      formula: {
        label: "The nth term",
        latex: "a_n = a_1 + (n - 1)\\,d \\qquad a_n = a_1\\, r^{\\,n - 1}",
        symbols: [
          { symbol: "\\(a_1\\)", meaning: "first term" },
          { symbol: "\\(d\\)", meaning: "common difference (arithmetic)" },
          { symbol: "\\(r\\)", meaning: "common ratio (geometric)" },
          { symbol: "\\(n\\)", meaning: "position of the term you want" },
        ],
      },
      authoredExample: {
        prompt: "Find the 20th term of 7, 11, 15, 19, … and the 8th term of 3, 6, 12, 24, …",
        steps: [
          "First sequence: the gaps are all 4, so it is arithmetic with \\(d = 4\\). \\(a_{20} = 7 + 19 \\times 4 = 83\\).",
          "Second sequence: each term is twice the one before, so it is geometric with \\(r = 2\\). \\(a_8 = 3 \\times 2^7 = 3 \\times 128 = 384\\).",
        ],
        answer: "83 and 384",
      },
      selfCheckExample: {
        prompt: "What is the 7th term of the sequence 5, 15, 45, 135, …?",
        options: ["1215", "10935", "3645", "2187", "945"],
        steps: [
          "Each term is 3 times the one before: geometric with \\(a_1 = 5\\), \\(r = 3\\).",
          "\\(a_7 = 5 \\times 3^6 = 5 \\times 729 = 3645\\).",
          "A is the 6th term. B uses \\(3^7\\), one step too many. D forgets the first term (\\(3^7\\)). E multiplies 135 by 7.",
        ],
        answer: "(C) 3645",
      },
      practiceSet: [
        { prompt: "Next term: 81, 27, 9, …", answer: "3", method: "Ratio \\(\\tfrac{1}{3}\\)" },
        { prompt: "Find the 100th term of 4, 9, 14, …", answer: "499", method: "\\(4 + 99 \\times 5\\)" },
        { prompt: "Is 2, 6, 18, 54 arithmetic or geometric? Give the next term.", answer: "Geometric; 162", method: "Ratio 3" },
      ],
      traps: [
        {
          title: "The nth term is n minus 1 steps away",
          body: "The first term is already in place, so the 7th term is only 6 steps on. Using \\(r^n\\) or \\(n \\times d\\) gives the next term after the one asked for, and that value is usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-differences",
      name: "Differences of differences, and interleaved sequences",
      intuition:
        "When the gaps are not equal, write the gaps down as a new sequence. Very often that new row is simple: equal, growing by a fixed amount, or doubling. Another common trick is two sequences shuffled together, one in the odd positions and one in the even positions.",
      definition:
        "- The **first differences** are the gaps between neighbouring terms. If they are constant, the sequence is arithmetic.\n" +
        "- If the first differences themselves change by a constant, the **second differences** are constant (squares 1, 4, 9, 16 behave like this).\n" +
        "- The differences may also form a geometric sequence (gaps 1, 2, 4, 8).\n" +
        "- An **interleaved** (alternating) sequence hides two rules: read terms 1, 3, 5, … and terms 2, 4, 6, … separately.",
      authoredExample: {
        prompt: "Find the next term of 3, 4, 7, 12, 19, … and the next two terms of 2, 20, 4, 17, 8, 14, …",
        steps: [
          "First sequence: the gaps are 1, 3, 5, 7. They grow by 2, so the next gap is 9 and the next term is \\(19 + 9 = 28\\).",
          "Second sequence: the gaps jump around, so split it. Odd positions: 2, 4, 8 (doubling), next 16. Even positions: 20, 17, 14 (minus 3), next 11.",
          "The sequence continues 16, 11.",
        ],
        answer: "28; then 16, 11",
      },
      selfCheckExample: {
        prompt: "What is the next term of 4, 7, 13, 22, 34, …?",
        options: ["49", "46", "51", "43", "68"],
        steps: [
          "First differences: 3, 6, 9, 12. They go up by 3 each time.",
          "Next difference: 15, so the next term is \\(34 + 15 = 49\\).",
          "B repeats the last difference. E doubles the last term. C and D use a wrong next difference.",
        ],
        answer: "(A) 49",
      },
      practiceSet: [
        { prompt: "Next term: 1, 4, 9, 16, …", answer: "25", method: "Square numbers; differences 3, 5, 7, 9" },
        { prompt: "Next term: 10, 1, 9, 2, 8, 3, …", answer: "7", method: "Odd positions 10, 9, 8, …" },
        { prompt: "Next term: 2, 3, 5, 9, 17, …", answer: "33", method: "Differences 1, 2, 4, 8, then 16" },
      ],
      traps: [
        {
          title: "Check the rule on every given term",
          body: "A rule that fits the first three terms can fail at the fourth. Before choosing an option, run your rule through all the terms shown; the wrong options are built from rules that fit only the beginning.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-recurrence",
      name: "Recurrence rules: each term built from the terms before it",
      intuition:
        "Some sequences grow in a way no single difference or ratio explains. Then each term is usually made from the one or two terms before it: the sum of the last two (Fibonacci), or twice the last plus the one before. Test a guess on three or four terms in a row.",
      definition:
        "A **recurrence** gives each term from earlier terms.\n" +
        "- **Fibonacci-like**: \\(a_n = a_{n-1} + a_{n-2}\\), for example 1, 3, 4, 7, 11, 18.\n" +
        "- Weighted versions such as \\(a_n = 2a_{n-1} + a_{n-2}\\) or \\(a_n = a_{n-1} + 2a_{n-2}\\).\n" +
        "- One-term rules such as \\(a_n = 2a_{n-1} + 1\\) (1, 3, 7, 15, 31) or \"multiply by 2, then 3, then 4\" (1, 2, 6, 24).\n" +
        "- Signs: the differences do not settle, and the ratio of neighbouring terms creeps towards a fixed value.\n" +
        "- With a gap in the middle, use the terms on BOTH sides of it to check your value.",
      formula: {
        label: "Two-term recurrence",
        latex: "a_n = p\\,a_{n-1} + q\\,a_{n-2}",
        symbols: [
          { symbol: "\\(p, q\\)", meaning: "fixed whole numbers, often 1 or 2" },
          { symbol: "\\(a_{n-1}, a_{n-2}\\)", meaning: "the previous term and the one before it" },
        ],
      },
      authoredExample: {
        prompt: "Find the next term of 1, 1, 3, 7, 17, …",
        steps: [
          "Differences 0, 2, 4, 10 have no pattern, and the ratios 1, 3, 2.3, 2.4 are not constant. Try a recurrence.",
          "Each term seems to be about twice the previous: \\(7 = 2 \\times 3 + 1\\), \\(17 = 2 \\times 7 + 3\\). So \\(a_n = 2a_{n-1} + a_{n-2}\\).",
          "Check the start: \\(3 = 2 \\times 1 + 1\\). It fits. Next: \\(2 \\times 17 + 7 = 41\\).",
        ],
        answer: "41",
      },
      selfCheckExample: {
        prompt: "In the sequence 3, 1, 7, 9, 23, x, 87, …, what is the value of x?",
        options: ["32", "46", "55", "41", "37"],
        steps: [
          "Test \\(a_n = a_{n-1} + 2a_{n-2}\\): \\(7 = 1 + 2 \\times 3\\), \\(9 = 7 + 2 \\times 1\\), \\(23 = 9 + 2 \\times 7\\). It fits.",
          "So \\(x = 23 + 2 \\times 9 = 41\\).",
          "Check with the term after the gap: \\(41 + 2 \\times 23 = 87\\). Correct.",
          "A adds the last two terms (Fibonacci), but then the next term would be 55, not 87. B doubles 23, which also misses 87.",
        ],
        answer: "(D) 41",
      },
      practiceSet: [
        { prompt: "Next term: 2, 2, 4, 6, 10, …", answer: "16", method: "Sum of the previous two" },
        { prompt: "Next term: 1, 3, 7, 15, …", answer: "31", method: "Double and add 1" },
        { prompt: "Next term: 1, 2, 6, 24, …", answer: "120", method: "Multiply by 2, 3, 4, then 5" },
      ],
      traps: [
        {
          title: "Use the term after the gap",
          body: "When a missing term sits in the middle, the terms after it are a free check. A value that fits the rule on one side but not the other is the wrong rule, and IMAT distractors are often exactly those values.",
        },
      ],
    },
  ],
};
