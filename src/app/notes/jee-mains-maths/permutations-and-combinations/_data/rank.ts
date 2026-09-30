import type { SubtopicNote } from "@/app/notes/_types";

export const RANK_PNC_NOTE: SubtopicNote = {
  subtopicName: "Dictionary Order and Ranks",
  title: "Dictionary Order and Ranks",
  oneLineDefinition:
    "Finding the position of a word in the dictionary list of all arrangements of its letters, or the word at a given position; and the same for numbers listed in increasing or decreasing order.",
  whyItMatters:
    "Fourteen PYQs, and 2023 alone has seven. Each is one procedure: go letter by letter, and at every position count the words that start with a smaller letter. Eleven rank words; three rank numbers. Two ideas cover the page.",
  concepts: [
    // C1 — rank of a word
    {
      kind: "formula" as const,
      slug: "jpnc-rank-word",
      name: "The rank of a word",
      intuition:
        "Sort the letters alphabetically. For the first position, every smaller letter that could stand there starts a block of \\((n-1)!\\) words (divided by the factorials of any letters still repeated). Add those blocks, fix the actual first letter, and repeat with what is left. The rank is the total plus one. To find the word at a given position, do the same in reverse: subtract whole blocks until the position falls inside one.",
      definition:
        "- Rank \\(=1+\\sum\\) (words beginning with a smaller choice at each step).\n" +
        "- A block after fixing \\(k\\) letters has \\((n-k)!\\) words, divided by factorials of letters repeated in the remainder.\n" +
        "- Word at position \\(N\\): subtract full blocks in order until \\(N\\) lies within one.",
      formula: {
        label: "Rank",
        latex: "\\text{rank}=1+\\sum_{i=1}^{n}c_i\\,(n-i)!\\quad(c_i=\\text{smaller unused letters at step }i)",
      },
      authoredExample: {
        prompt: "Find the rank of CAT among the arrangements of A, C, T.",
        steps: [
          "First letter smaller than C: A, giving \\(2!=2\\) words.",
          "After C, second letter smaller than A: none. After CA, T is the only one left.",
        ],
        answer: "\\(2+0+1=3\\).",
      },
      selfCheckExample: {
        prompt: "Find the rank of DCBA among the arrangements of A, B, C, D.",
        steps: [
          "It is the last word in dictionary order.",
        ],
        answer: "\\(4!=24\\).",
      },
      practiceSet: [
        { prompt: "Words from the letters of CAT?", answer: "\\(6\\)" },
        { prompt: "Rank of ABCD among its arrangements?", answer: "\\(1\\)" },
        { prompt: "Words of BOOK?", answer: "\\(12\\)" },
        { prompt: "Words beginning with A from ABCDE?", answer: "\\(24\\)" },
      ],
      pyqExampleId: "f25052ee-b880-40bd-8832-7ec29cab22ee", // 2023 — rank of PUBLIC
      traps: [
        {
          title: "Repeated letters change the block size",
          body: "With a letter still repeated among the unused ones, a block has \\(\\frac{(n-k)!}{p!}\\) words, not \\((n-k)!\\). Recompute the divisor at each step, since using up one copy of a repeated letter changes it.",
        },
      ],
    },

    // C2 — numbers in order
    {
      kind: "formula" as const,
      slug: "jpnc-rank-number",
      name: "Numbers listed in order",
      intuition:
        "Numbers with a fixed number of digits are listed exactly like words, with the allowed digits as the alphabet. With repetition allowed, each block after fixing \\(k\\) digits has \\(d^{\\,n-k}\\) numbers, where \\(d\\) is the number of allowed digits. For numbers with strictly increasing digits, each is a choice of digits, so blocks are counted with combinations.",
      definition:
        "- Repetition allowed, \\(d\\) digits: a block has \\(d^{\\,n-k}\\) numbers.\n" +
        "- Leading digit cannot be 0.\n" +
        "- Descending order: count the numbers larger than the given one.\n" +
        "- Strictly increasing digits from \\(\\{1,\\dots,9\\}\\): numbers starting with \\(a\\) number \\(\\binom{9-a}{n-1}\\).",
      formula: {
        label: "Block size with repetition",
        latex: "\\text{numbers after fixing }k\\text{ of }n\\text{ digits}=d^{\\,n-k}",
      },
      authoredExample: {
        prompt: "3-digit numbers are formed from the digits 1, 2, 3 with repetition and listed in increasing order. Find the position of 231.",
        steps: [
          "Starting with 1: \\(3^2=9\\). Starting 21, 22: \\(3+3=6\\).",
          "Starting 23: 231 is the first.",
        ],
        answer: "\\(9+6+1=16\\).",
      },
      selfCheckExample: {
        prompt: "How many 4-digit numbers have strictly increasing digits from \\(\\{1,\\dots,9\\}\\) and begin with 5?",
        steps: [
          "The other three digits are chosen from 6, 7, 8, 9.",
        ],
        answer: "\\(\\binom43=4\\).",
      },
      practiceSet: [
        { prompt: "5-digit numbers from 5 digits with repetition?", answer: "\\(5^5\\)" },
        { prompt: "Numbers with strictly increasing digits, 6 digits from 1–9?", answer: "\\(\\binom96=84\\)" },
        { prompt: "First 5-digit number from 0, 2, 3 with repetition?", answer: "\\(20000\\)" },
        { prompt: "4-digit numbers from 7 digits with repetition, first digit fixed?", answer: "\\(7^3\\)" },
      ],
      pyqExampleId: "8d3d42a7-aa8b-4d71-a8fc-cf77384af2e8", // 2023 — serial number of 42923 from digits 0, 2, 3, 4, 7, 9
      traps: [
        {
          title: "Zero is allowed after the first digit",
          body: "When 0 is among the digits, it cannot lead but can appear anywhere else. Blocks for the first digit use \\(d-1\\) choices; later blocks use all \\(d\\).",
        },
      ],
    },
  ],
};
