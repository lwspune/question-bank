import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_NS_REMAINDERS_NOTE: SubtopicNote = {
  subtopicName: "Remainders by Congruence and Cyclicity",
  title: "Remainders by Congruence and Cyclicity",
  oneLineDefinition:
    "In a sum, a product or a power you may replace every number by its remainder, so even a huge power shrinks to a small number before you divide.",
  whyItMatters:
    "Ten questions in the bank, seven EASY and three MODERATE, six of them from the 2024 shifts. None of them needs a long division: swap each number for its remainder, and a power with an exponent in the thousands collapses to 1 or to one less than the divisor in a single line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscnsre-replace",
      name: "Replacing a number by its remainder",
      intuition:
        "If \\(N = 9k + 4\\), the \\(9k\\) part is a pile of complete nines, and complete nines never change a remainder on division by 9. Only the 4 matters, so you can carry the 4 through any adding or multiplying.",
      definition:
        "- **Notation:** \\(N \\equiv r \\pmod d\\) reads 'N leaves the same remainder as r on division by d'.\n" +
        "- In a **sum, difference or product**, replace each number by its remainder, work out the small result, then reduce it again. An expression like \\(5n^2 + 3n + 1\\) is just products and sums, so the same swap works.\n" +
        "- **A divisor of the divisor:** if \\(N\\) leaves \\(r\\) on division by \\(d\\), and \\(m\\) divides \\(d\\), then \\(N\\) leaves the remainder of \\(r\\) on division by \\(m\\).\n" +
        "- If \\(m\\) does **not** divide \\(d\\), the remainder by \\(m\\) cannot be found from this information alone.\n" +
        "- Check with a small number: if \\(N\\) leaves 4 on division by 9, try \\(N = 4\\) or \\(N = 13\\).",
      formula: {
        label: "Swapping numbers for remainders",
        latex:
          "N = dk + r \\Rightarrow N \\equiv r \\pmod d \\qquad a \\equiv r, \\ b \\equiv s \\pmod d \\Rightarrow a + b \\equiv r + s, \\ ab \\equiv rs \\pmod d",
        symbols: [
          { symbol: "d", meaning: "the divisor" },
          { symbol: "r, s", meaning: "the remainders of a and b on division by d" },
        ],
      },
      authoredExample: {
        prompt: "A number x leaves remainder 4 when divided by 9. Find the remainder when \\(x^2 + 2x\\) is divided by 9.",
        steps: [
          "Replace x by 4: \\(4^2 + 2 \\times 4 = 16 + 8 = 24\\).",
          "\\(24 = 2 \\times 9 + 6\\), so the remainder is 6.",
          "Check with \\(x = 13\\): \\(169 + 26 = 195 = 21 \\times 9 + 6\\).",
        ],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "A number leaves remainder 29 when divided by 36. What remainder does it leave when divided by 12?",
        steps: [
          "12 divides 36, so only the 29 matters.",
          "\\(29 = 2 \\times 12 + 5\\). Check with 65: \\(65 = 5 \\times 12 + 5\\).",
        ],
        answer: "5",
      },
      practiceSet: [
        { prompt: "A number n leaves remainder 3 when divided by 5. What remainder does 4n leave when divided by 5?", answer: "2", method: "\\(4 \\times 3 = 12 = 2 \\times 5 + 2\\)." },
        { prompt: "A number leaves remainder 17 when divided by 24. What remainder does it leave when divided by 6?", answer: "5", method: "6 divides 24, and \\(17 = 2 \\times 6 + 5\\)." },
        { prompt: "a leaves remainder 2 and b leaves remainder 5 when divided by 7. What remainder does ab leave when divided by 7?", answer: "3", method: "\\(2 \\times 5 = 10 = 7 + 3\\)." },
        {
          prompt: "A number leaves remainder 10 when divided by 30. Can its remainder on division by 4 be found from this alone?",
          answer: "No",
          method: "4 does not divide 30: 10 leaves 2 but 40 leaves 0.",
        },
      ],
      pyqExampleId: "64427950-b62b-41f9-96e2-7b9bd38d80ed",
      traps: [
        {
          title: "Moving to a divisor that does not divide the first one",
          body: "A remainder on division by 45 gives the remainder on division by 15, 9, 5 or 3, because they divide 45. It says nothing exact about division by 12.",
        },
        {
          title: "Leaving the answer bigger than the divisor",
          body: "After swapping, reduce again. Remainder 5 on division by 7, tripled, is 15, and the remainder is \\(15 - 14 = 1\\), not 15.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsre-powers",
      name: "Remainders of large powers",
      intuition:
        "Swap the base for its remainder first. If that remainder is 1, every power of it is 1. If it is one less than the divisor, it behaves like \\(-1\\), and \\(-1\\) to any power is just \\(1\\) or \\(-1\\). Anything else repeats in a short cycle.",
      definition:
        "- Find the base's remainder on division by \\(d\\).\n" +
        "- **Remainder 1:** \\(a^n\\) leaves 1, for every \\(n\\).\n" +
        "- **Remainder \\(d - 1\\)** (that is, \\(a \\equiv -1\\)): \\(a^n\\) leaves 1 when \\(n\\) is even and \\(d - 1\\) when \\(n\\) is odd.\n" +
        "- **Any other remainder:** list the remainders of \\(a, a^2, a^3, \\ldots\\) until they repeat. If the cycle has length \\(c\\), \\(a^n\\) leaves the same remainder as \\(a^{\\text{remainder of } n \\div c}\\) (use \\(a^c\\) when that remainder is 0).\n" +
        "- Then add or subtract any extra terms and reduce. A negative result is not a remainder: add \\(d\\).",
      formula: {
        label: "Powers when the base leaves 1 or one less than the divisor",
        latex:
          "a \\equiv 1 \\pmod d \\Rightarrow a^n \\equiv 1 \\qquad a \\equiv -1 \\pmod d \\Rightarrow a^n \\equiv 1 \\ (n \\text{ even}), \\ a^n \\equiv d - 1 \\ (n \\text{ odd})",
        symbols: [
          { symbol: "a", meaning: "the base" },
          { symbol: "d", meaning: "the divisor" },
          { symbol: "n", meaning: "the exponent" },
        ],
      },
      authoredExample: {
        prompt: "Find the remainder when \\(11^{15}\\) is divided by 12, and the remainder when \\(2^{25}\\) is divided by 7.",
        steps: [
          "\\(11 = 12 - 1\\), so \\(11 \\equiv -1 \\pmod{12}\\). The exponent 15 is odd, so \\(11^{15} \\equiv -1 \\equiv 11\\).",
          "For \\(2^{25}\\): the remainders of \\(2, 4, 8\\) on division by 7 are 2, 4, 1, so the cycle has length 3.",
          "\\(25 = 3 \\times 8 + 1\\), so \\(2^{25}\\) leaves the same remainder as \\(2^1\\), which is 2.",
        ],
        answer: "11 and 2",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(15^{40} + 3\\) is divided by 16.",
        steps: [
          "\\(15 \\equiv -1 \\pmod{16}\\) and 40 is even, so \\(15^{40} \\equiv 1\\).",
          "\\(1 + 3 = 4\\).",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "Find the remainder when \\(10^{99}\\) is divided by 9.", answer: "1", method: "\\(10 \\equiv 1 \\pmod 9\\)." },
        { prompt: "Find the remainder when \\(29^{17}\\) is divided by 30.", answer: "29", method: "\\(29 \\equiv -1\\) and 17 is odd." },
        { prompt: "Find the remainder when \\(3^{10}\\) is divided by 8.", answer: "1", method: "\\(3^2 = 9 \\equiv 1 \\pmod 8\\), so \\(3^{10} = (3^2)^5 \\equiv 1\\)." },
        { prompt: "Find the remainder when \\(5^{12} - 4\\) is divided by 6.", answer: "3", method: "\\(5 \\equiv -1\\), so \\(5^{12} \\equiv 1\\); \\(1 - 4 = -3\\), and \\(-3 + 6 = 3\\)." },
      ],
      pyqExampleId: "2e4c1b49-bfe8-4102-9eee-1a584c226986",
      traps: [
        {
          title: "Writing minus one as the remainder",
          body: "A remainder is never negative. When the working gives \\(-1\\) on division by 13, the remainder is \\(13 - 1 = 12\\).",
        },
        {
          title: "Ignoring whether the exponent is odd or even",
          body: "A base one less than the divisor leaves 1 for an even exponent but leaves one less than the divisor for an odd one. Check the exponent's parity before you write the answer.",
        },
      ],
    },
  ],
};
