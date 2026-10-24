import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SQ_SQUARES_NOTE: SubtopicNote = {
  subtopicName: "Squares and Perfect Squares",
  title: "Squares, Their Last Digits, and Perfect Squares",
  oneLineDefinition:
    "Square a number quickly with (a + b)² and (a − b)², read the last digit of a square, and test whether a number is a perfect square by its prime factors.",
  whyItMatters:
    "Most questions here are one step: square a number, read a last digit, or say whether a number is a perfect square. Marks go on the middle term of (a + b)², on numbers whose last digit only looks right, and on a prime factor left without a partner.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsq-squaring",
      name: "Squaring a number, and the square identities",
      intuition:
        "Squaring multiplies a number by itself. For a number near a round one, split it as a round number plus or minus a small one and use the identities: \\(97 = 100 - 3\\) is quicker to square than \\(97 \\times 97\\).",
      definition:
        "- \\(n^2 = n \\times n\\). A negative number squared is positive: \\((-6)^2 = 36\\).\n" +
        "- \\((a + b)^2 = a^2 + 2ab + b^2\\), so \\(41^2 = 1600 + 80 + 1 = 1681\\).\n" +
        "- \\((a - b)^2 = a^2 - 2ab + b^2\\), so \\(29^2 = 900 - 60 + 1 = 841\\).\n" +
        "- \\(a^2 - b^2 = (a + b)(a - b)\\), so \\(53^2 - 47^2 = 100 \\times 6 = 600\\).\n" +
        "- A number ending in 5: write the tens part times the next number, then 25. \\(65^2\\) is \\(6 \\times 7 = 42\\) followed by 25, that is \\(4225\\).",
      formula: {
        label: "Square of a sum or a difference",
        latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2",
      },
      authoredExample: {
        prompt: "Find \\(97^2\\) and \\(103^2\\) without long multiplication.",
        steps: [
          "\\(97^2 = (100 - 3)^2 = 10000 - 600 + 9 = 9409\\).",
          "\\(103^2 = (100 + 3)^2 = 10000 + 600 + 9 = 10609\\).",
        ],
        answer: "\\(9409\\) and \\(10609\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(61^2 - 39^2\\).",
        steps: [
          "Use \\(a^2 - b^2 = (a + b)(a - b)\\).",
          "\\((61 + 39)(61 - 39) = 100 \\times 22\\).",
        ],
        answer: "\\(2200\\).",
      },
      practiceSet: [
        { prompt: "Find \\(35^2\\).", answer: "\\(1225\\)", method: "\\(3 \\times 4 = 12\\), then 25." },
        { prompt: "Find \\(51^2\\).", answer: "\\(2601\\)", method: "\\(2500 + 100 + 1\\)." },
        { prompt: "If \\(a = 6\\) and \\(b = 5\\), find \\((a + b)^2\\).", answer: "\\(121\\)" },
        { prompt: "Find \\(26^2 - 24^2\\).", answer: "\\(100\\)", method: "\\(50 \\times 2\\)." },
      ],
      pyqExampleId: "434b46ed-982f-4969-b17f-4d4e976bac9b",
      traps: [
        {
          title: "The middle term",
          body: "\\((4 + 5)^2 = 81\\), not \\(16 + 25 = 41\\). The square of a sum keeps the cross term \\(2ab\\).",
        },
        {
          title: "Brackets decide the sign",
          body: "\\((-7)^2 = 49\\), but \\(-7^2 = -49\\): without brackets only the 7 is squared.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afsq-square-endings",
      name: "The last digit of a square",
      intuition:
        "The last digit of a square depends only on the last digit of the number. So one glance at the last digit rules many numbers out as perfect squares.",
      definition:
        "Square the last digit and keep the last digit of that. Squares end only in 0, 1, 4, 5, 6 or 9, so a number ending in 2, 3, 7 or 8 is never a perfect square. Two more checks:\n" +
        "- A square ending in 5 always ends in 25.\n" +
        "- A square ending in 0 ends in an even number of zeros (400, 3600, 250000).",
      table: {
        columns: ["Last digit of n", "Last digit of n²", "Examples"],
        rows: [
          { cells: ["0", "0", "\\(20^2 = 400\\)"] },
          { cells: ["1 or 9", "1", "\\(11^2 = 121\\), \\(19^2 = 361\\)"] },
          { cells: ["2 or 8", "4", "\\(12^2 = 144\\), \\(18^2 = 324\\)"] },
          { cells: ["3 or 7", "9", "\\(23^2 = 529\\), \\(17^2 = 289\\)"] },
          { cells: ["4 or 6", "6", "\\(14^2 = 196\\), \\(16^2 = 256\\)"] },
          {
            cells: ["5", "5", "\\(25^2 = 625\\)"],
            noteAmber: "The last two digits are always 25.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which of 2,401, 3,458, 6,727 and 1,555 could be a perfect square?",
        steps: [
          "3,458 ends in 8 and 6,727 ends in 7: neither can be a square.",
          "1,555 ends in 5 but not in 25, so it is not a square.",
          "Only 2,401 is left, and it is \\(49^2\\).",
        ],
        answer: "2,401.",
      },
      practiceSet: [
        { prompt: "What is the last digit of \\(83^2\\)?", answer: "\\(9\\)" },
        { prompt: "What is the last digit of \\(196^2\\)?", answer: "\\(6\\)" },
        { prompt: "Can a perfect square end in 8?", answer: "No" },
        { prompt: "Can 4,000 be a perfect square?", answer: "No", method: "It ends in three zeros, an odd number." },
      ],
      pyqExampleId: "84840e5c-1995-46c1-aaaa-e8001d79ead1",
      traps: [
        {
          title: "A good ending is not proof",
          body: "2,231 ends in 1, a possible ending, but it lies between \\(47^2 = 2209\\) and \\(48^2 = 2304\\). The last digit can rule a number out, never in.",
        },
        {
          title: "Squares ending in 5",
          body: "2,675 ends in 5, but in 75, not 25, so it is not a perfect square.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-square-test",
      name: "Testing a perfect square by prime factors",
      intuition:
        "In a perfect square every prime factor comes in pairs, because the root's factors appear twice. Write the number in primes and look at the powers.",
      definition:
        "- Write \\(n\\) as a product of primes. It is a perfect square when **every exponent is even**.\n" +
        "- The square root takes half of each exponent: \\(784 = 2^4 \\times 7^2\\), so \\(\\sqrt{784} = 2^2 \\times 7 = 28\\).\n" +
        "- To find the square in a range, bracket it with known squares: between 300 and 350 the only one is \\(18^2 = 324\\), since \\(17^2 = 289\\) and \\(19^2 = 361\\).\n" +
        "- Knowing the squares up to \\(30^2 = 900\\) by heart makes most of these one step.",
      formula: {
        label: "Perfect square test",
        latex: "n = p^{a} q^{b} \\cdots \\text{ is a square when } a, b, \\ldots \\text{ are all even}",
      },
      authoredExample: {
        prompt: "Is 3,136 a perfect square? If so, find its square root.",
        steps: [
          "\\(3136 = 64 \\times 49 = 2^6 \\times 7^2\\).",
          "Both exponents, 6 and 2, are even, so it is a perfect square.",
          "Halve the exponents: \\(2^3 \\times 7 = 56\\).",
        ],
        answer: "Yes; \\(\\sqrt{3136} = 56\\).",
      },
      selfCheckExample: {
        prompt: "Is 252 a perfect square?",
        steps: [
          "\\(252 = 4 \\times 63 = 2^2 \\times 3^2 \\times 7\\).",
          "The 7 has exponent 1, which is odd.",
        ],
        answer: "No.",
      },
      practiceSet: [
        {
          prompt: "Write 576 in prime factors and find its square root.",
          answer: "\\(2^6 \\times 3^2\\); \\(24\\)",
        },
        { prompt: "Is 1,089 a perfect square?", answer: "Yes, \\(33^2\\)", method: "\\(1089 = 3^2 \\times 11^2\\)." },
        { prompt: "Which perfect square lies between 110 and 130?", answer: "\\(121\\)" },
        { prompt: "Is 2,000 a perfect square?", answer: "No", method: "\\(2000 = 2^4 \\times 5^3\\)." },
      ],
      pyqExampleId: "00cf1365-027f-4a30-83b4-220f13cb14d1",
      traps: [
        {
          title: "One odd power is enough to fail",
          body: "\\(300 = 2^2 \\times 3 \\times 5^2\\) has two pairs, but the single 3 means it is not a perfect square.",
        },
        {
          title: "Factor all the way down",
          body: "\\(72 = 8 \\times 9\\) looks like two squares' worth, but \\(8 = 2^3\\). So \\(72 = 2^3 \\times 3^2\\) has an odd power and is not a square.",
        },
      ],
    },
  ],
};
