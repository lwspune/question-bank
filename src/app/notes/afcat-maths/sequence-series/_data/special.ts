import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SS_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Special Series and Standard Sums",
  title: "Special Series and the Standard Sums",
  oneLineDefinition:
    "The sums of the first n natural, odd and even numbers, of squares and of cubes, and series that turn into these sums once their terms are split, paired or rewritten.",
  whyItMatters:
    "The easy questions are the standard sums: learn five results and each is one line, provided the terms are counted correctly. The HARD ones hide a known series inside another, such as a term that is a whole number minus a GP term, or squares with alternating signs, and the work is seeing how to split or pair the terms.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afss-standard-sums",
      name: "The standard sums",
      intuition:
        "Five sums come up again and again. Each is an AP or a known pattern worked out once, so learn the result and skip the working.",
      definition:
        "Count the terms first: the odd numbers up to \\(2n - 1\\) are \\(n\\) terms, and the even numbers up to \\(2n\\) are \\(n\\) terms. Then read the sum from the table.",
      table: {
        columns: ["Sum", "Result", "Example"],
        rows: [
          { cells: ["\\(1 + 2 + 3 + \\dots + n\\)", "\\(\\dfrac{n(n + 1)}{2}\\)", "\\(1 + 2 + \\dots + 40 = 820\\)"] },
          { cells: ["\\(1 + 3 + 5 + \\dots + (2n - 1)\\)", "\\(n^2\\)", "The first 15 odd numbers add up to \\(225\\)"] },
          { cells: ["\\(2 + 4 + 6 + \\dots + 2n\\)", "\\(n(n + 1)\\)", "\\(2 + 4 + \\dots + 40 = 420\\)"] },
          { cells: ["\\(1^2 + 2^2 + \\dots + n^2\\)", "\\(\\dfrac{n(n + 1)(2n + 1)}{6}\\)", "\\(1^2 + 2^2 + \\dots + 10^2 = 385\\)"] },
          {
            cells: ["\\(1^3 + 2^3 + \\dots + n^3\\)", "\\(\\left[\\dfrac{n(n + 1)}{2}\\right]^2\\)", "\\(1^3 + 2^3 + \\dots + 10^3 = 3025\\)"],
            noteAmber: "The sum of the cubes is the square of the sum of the numbers.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Find \\(1 + 3 + 5 + \\dots + 59\\).",
        steps: ["\\(59 = 2n - 1\\) gives \\(n = 30\\) odd numbers.", "Their sum is \\(30^2\\)."],
        answer: "\\(900\\).",
      },
      practiceSet: [
        { prompt: "Find the sum of the first 60 natural numbers.", answer: "\\(1830\\)" },
        { prompt: "Find \\(2 + 4 + 6 + \\dots + 80\\).", answer: "\\(1640\\)", method: "40 even numbers: \\(40 \\times 41\\)." },
        { prompt: "Find \\(1^2 + 2^2 + \\dots + 12^2\\).", answer: "\\(650\\)" },
        { prompt: "Find \\(1^3 + 2^3 + \\dots + 6^3\\).", answer: "\\(441\\)", method: "\\(21^2\\)." },
      ],
      pyqExampleId: "7668b149-3231-473a-b505-b2c4f1495c6d",
      traps: [
        {
          title: "Count the odd numbers",
          body: "The odd numbers from 1 to 79 are 40 numbers, not 79 and not 39, so their sum is \\(40^2 = 1600\\).",
        },
        {
          title: "Even numbers are not n squared",
          body: "\\(2 + 4 + \\dots + 2n = n(n + 1)\\), one \\(n\\) more than the odd-number sum \\(n^2\\). The first 10 even numbers add up to 110, not 100.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-split-series",
      name: "Series built from known pieces",
      intuition:
        "A series that is neither an AP nor a GP is often two of them added together, or a standard sum in disguise. Write the kth term, split it, and sum each part with a formula you already know.",
      definition:
        "- **Split the term**: if the kth term is a constant minus a GP term, add up the constants and the GP separately.\n" +
        "- **Pair the terms**: with alternating signs, group neighbours. \\(3^2 - 4^2 = -(3 + 4)\\), because \\(a^2 - b^2 = (a - b)(a + b)\\).\n" +
        "- **Find the kth term first**: when the terms come from a sum formula, get \\(a_k = S_k - S_{k-1}\\) (Arithmetic Progression page), then sum its square with the standard sums.\n" +
        "- Sums split over addition: \\(\\sum (pk + q) = p\\sum k + qn\\).",
      formula: {
        label: "Split and sum",
        latex: "\\sum_{k=1}^{n} (u_k + v_k) = \\sum_{k=1}^{n} u_k + \\sum_{k=1}^{n} v_k",
      },
      authoredExample: {
        prompt: "Find the sum of the first \\(n\\) terms of \\(0.9 + 0.99 + 0.999 + \\dots\\)",
        steps: [
          "The kth term is \\(1 - 10^{-k}\\).",
          "The sum is \\(n - (0.1 + 0.01 + \\dots + 10^{-n})\\).",
          "The bracket is a GP of \\(n\\) terms with \\(a = 0.1\\), \\(r = 0.1\\): \\(\\dfrac{0.1(1 - 10^{-n})}{0.9} = \\tfrac 19 (1 - 10^{-n})\\).",
        ],
        answer: "\\(n - \\tfrac 19 (1 - 10^{-n})\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(1^2 - 2^2 + 3^2 - 4^2 + \\dots + 9^2 - 10^2\\).",
        steps: [
          "Each pair is \\(k^2 - (k + 1)^2 = -(k + k + 1)\\).",
          "So the total is \\(-(1 + 2 + 3 + \\dots + 10) = -55\\).",
        ],
        answer: "\\(-55\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sum_{k=1}^{10} (2k + 3)\\).", answer: "\\(140\\)", method: "\\(2 \\times 55 + 3 \\times 10\\)." },
        { prompt: "Find \\(1 \\cdot 2 + 2 \\cdot 3 + 3 \\cdot 4 + \\dots\\) to 5 terms.", answer: "\\(70\\)", method: "\\(\\sum (k^2 + k) = 55 + 15\\)." },
        { prompt: "Find \\(10^2 - 9^2 + 8^2 - 7^2 + \\dots + 2^2 - 1^2\\).", answer: "\\(55\\)" },
        {
          prompt: "The kth term of a series is \\((2k - 1) + 2^k\\). Find the sum of its first \\(n\\) terms.",
          answer: "\\(n^2 + 2^{n+1} - 2\\)",
          method: "Odd numbers give \\(n^2\\); the GP gives \\(2(2^n - 1)\\).",
        },
      ],
      pyqExampleId: "d1d24095-ab53-405e-a9e3-09405c72c2f2",
      traps: [
        {
          title: "Pairs need an even count",
          body: "Pairing \\(1^2 - 2^2 + 3^2 - \\dots\\) works cleanly only for an even number of terms. With an odd number the last square is left over and has to be added back.",
        },
        {
          title: "A GP of n terms, not an infinite one",
          body: "In \\(n - (0.1 + 0.01 + \\dots)\\) the bracket stops after \\(n\\) terms, so it is \\(\\tfrac 19 (1 - 10^{-n})\\). Using the sum to infinity, \\(\\tfrac 19\\), is only right when \\(n\\) is huge.",
        },
      ],
    },
  ],
};
