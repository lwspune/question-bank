import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SQ_MAKING_NOTE: SubtopicNote = {
  subtopicName: "Making a Perfect Square or Cube",
  title: "The Least Number That Makes a Perfect Square or Cube",
  oneLineDefinition:
    "Find the least number to multiply or divide by for a perfect square or cube, the greatest square or cube that divides a number, and the least number to add or subtract for a perfect square.",
  whyItMatters:
    "Seven of the page's ten questions are HARD, the highest share of any page in the chapter. Almost all are one move, writing the number in prime factors, and marks go on reading divide as multiply, or on topping a cube's exponents up to the next even number instead of the next multiple of 3.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsq-least-factor",
      name: "Least multiplier or divisor, by prime factors",
      intuition:
        "Write the number in prime factors. A square needs every exponent even; a cube needs every exponent a multiple of 3. The least multiplier supplies the primes that are missing; the least divisor removes the primes left over.",
      definition:
        "- **Square:** the primes with odd exponents are the leftovers. \\(50 = 2 \\times 5^2\\): multiply by 2 to get \\(100 = 10^2\\), or divide by 2 to get \\(25 = 5^2\\).\n" +
        "- **Cube:** top each exponent up to the next multiple of 3, or cut it down to the one below. \\(1350 = 2 \\times 3^3 \\times 5^2\\): multiply by \\(2^2 \\times 5 = 20\\) to get \\(27000 = 30^3\\), or divide by \\(2 \\times 5^2 = 50\\) to get \\(27 = 3^3\\).\n" +
        "- **Greatest square or cube that divides n:** keep the largest even part (square) or the largest multiple of 3 (cube) of each exponent. For \\(864 = 2^5 \\times 3^3\\) the greatest square factor is \\(2^4 \\times 3^2 = 144\\), and the greatest cube factor is \\(2^3 \\times 3^3 = 216\\).\n" +
        "- The new root is read off the new exponents, by halving them or dividing them by 3.",
      formula: {
        label: "What a perfect power needs",
        latex: "\\text{square: every exponent even}, \\quad \\text{cube: every exponent a multiple of } 3",
      },
      authoredExample: {
        prompt:
          "Find the least number by which 2,000 must be multiplied, and the least by which it must be divided, to make a perfect cube.",
        steps: [
          "\\(2000 = 2^4 \\times 5^3\\). The 5s are already a cube; the 2s are not.",
          "Multiply: \\(2^4\\) needs two more 2s to reach \\(2^6\\), so multiply by 4. \\(8000 = 20^3\\).",
          "Divide: \\(2^4\\) drops to \\(2^3\\) if one 2 goes, so divide by 2. \\(1000 = 10^3\\).",
        ],
        answer: "Multiply by 4, or divide by 2.",
      },
      selfCheckExample: {
        prompt: "Find the least number by which 1,176 must be divided to leave a perfect square.",
        steps: [
          "\\(1176 = 2^3 \\times 3 \\times 7^2\\).",
          "The odd exponents belong to 2 and 3, so divide by \\(2 \\times 3 = 6\\).",
          "\\(1176 \\div 6 = 196 = 14^2\\).",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        {
          prompt: "Find the least number by which 128 must be multiplied to make a perfect square.",
          answer: "\\(2\\)",
          method: "\\(128 = 2^7\\); \\(256 = 16^2\\).",
        },
        {
          prompt: "Find the least number by which 3,888 must be divided to make a perfect cube.",
          answer: "\\(18\\)",
          method: "\\(3888 = 2^4 \\times 3^5\\); \\(216 = 6^3\\).",
        },
        { prompt: "Find the greatest perfect square that divides 600.", answer: "\\(100\\)", method: "\\(600 = 2^3 \\times 3 \\times 5^2\\)." },
        {
          prompt: "Find the least number by which 675 must be multiplied to make a perfect cube.",
          answer: "\\(5\\)",
          method: "\\(675 = 3^3 \\times 5^2\\); \\(3375 = 15^3\\).",
        },
      ],
      pyqExampleId: "26736a1d-e4b8-4e29-99c2-f8e081781f82",
      traps: [
        {
          title: "Least means only the missing primes",
          body: "\\(72 = 2^3 \\times 3^2\\). Multiplying by 8 also gives a square (576), but the least multiplier is 2, giving 144.",
        },
        {
          title: "A cube needs threes",
          body: "\\(40 = 2^3 \\times 5\\). A cube needs two more 5s, so multiply by 25 to reach 1,000. Multiplying by 5 gives \\(2^3 \\times 5^2\\), still not a cube.",
        },
        {
          title: "Read the verb",
          body: "Dividing removes the leftover primes; multiplying adds the missing ones. For a cube the two answers usually differ, so answer the one asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-nearest-square",
      name: "Least number to add or subtract for a perfect square",
      intuition:
        "Find the two consecutive squares on either side of the number. To add, go up to the square above; to subtract, go down to the square below.",
      definition:
        "- Bracket \\(n\\) between \\(k^2\\) and \\((k + 1)^2\\). The least number to **add** is \\((k + 1)^2 - n\\); the least to **subtract** is \\(n - k^2\\).\n" +
        "- Find \\(k\\) from a round square nearby and step: \\((k + 1)^2 = k^2 + 2k + 1\\), so after \\(50^2 = 2500\\) come 2,601 and 2,704.\n" +
        "- If \\(n = k^2\\) is already a square, the least number to subtract for a smaller square is \\(n - (k - 1)^2 = 2k - 1\\).",
      formula: {
        label: "Nearest squares",
        latex: "k^2 \\le n < (k + 1)^2: \\quad \\text{add } (k + 1)^2 - n, \\quad \\text{subtract } n - k^2",
      },
      authoredExample: {
        prompt:
          "Find the least number to be added to 2,620, and the least number to be subtracted from it, to get a perfect square.",
        steps: [
          "\\(51^2 = 2601\\) and \\(52^2 = 2704\\), so 2,620 lies between them.",
          "Add: \\(2704 - 2620 = 84\\).",
          "Subtract: \\(2620 - 2601 = 19\\).",
        ],
        answer: "Add 84, or subtract 19.",
      },
      selfCheckExample: {
        prompt: "What is the least number that must be subtracted from 5,000 to leave a perfect square?",
        steps: ["\\(70^2 = 4900\\) and \\(71^2 = 5041\\).", "\\(5000 - 4900 = 100\\)."],
        answer: "\\(100\\).",
      },
      practiceSet: [
        { prompt: "Find the least number to be added to 290 to make a perfect square.", answer: "\\(34\\)", method: "\\(18^2 = 324\\)." },
        { prompt: "Find the least number to be subtracted from 850 to make a perfect square.", answer: "\\(9\\)", method: "\\(29^2 = 841\\)." },
        {
          prompt: "144 is a perfect square. What is the least number to subtract from it to get a smaller perfect square?",
          answer: "\\(23\\)",
          method: "\\(144 - 121\\).",
        },
      ],
      pyqExampleId: "17b3cd5a-7d96-421a-aa3b-bc2488798ae7",
      traps: [
        {
          title: "Which neighbour",
          body: "Adding uses the square above; subtracting uses the square below. For 850 the answers are 50 (up to 900) and 9 (down to 841); swapping the neighbours mixes them up.",
        },
        {
          title: "Step from a round square",
          body: "Guessing the root by eye often lands one off. Start from a square you know, such as \\(30^2 = 900\\), and step up or down by \\(2k + 1\\).",
        },
      ],
    },
  ],
};
