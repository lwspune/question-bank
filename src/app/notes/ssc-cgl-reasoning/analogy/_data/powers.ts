import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAN_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Square and Cube Rules",
  title: "Square and Cube Rules",
  oneLineDefinition:
    "When a number pair or a set jumps too fast for multiplying or adding, the rule is usually a square, a cube or a root, often with a small number added or taken away.",
  whyItMatters:
    "Ninety questions in the bank, forty-one EASY, forty-five MODERATE and four HARD, eleven of them from the 2025 shifts. Every one is quick once the squares to 30 and the cubes to 15 are known by heart, and slow without them; the near-square habit (50 is 49 plus 1) does most of the work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscransq-squares",
      name: "Squares, square roots and a number times its neighbour",
      intuition:
        "If the second number is roughly the first number multiplied by itself, look for a square. Write the nearest square next to the number and read off what was added or taken away.",
      definition:
        "- Know the squares up to \\(30^2 = 900\\). Write any number near a square as square plus or minus a little: \\(50 = 7^2 + 1\\).\n" +
        "- Common pair rules: \\(n^2\\), \\(n^2 \\pm k\\), \\(k \\times n^2\\), \\((n + 1)^2\\), \\(\\sqrt{n} \\pm k\\), and the next square (\\(n^2 + 1\\) to \\((n + 1)^2 + 1\\)).\n" +
        "- **A number times its neighbour:** \\(n(n + 1) = n^2 + n\\), so 132 is \\(11 \\times 12\\) and 42 is \\(6 \\times 7\\).\n" +
        "- **Fast route:** a perfect square ends only in 0, 1, 4, 5, 6 or 9. A number ending in 2, 3, 7 or 8 is never a square, so an option ending that way fails a square rule at once.\n" +
        "- Without the printed note (several 2025 questions give one pair and no note), a rule may use the digits, such as squaring the reversed number. With the note, it may not.",
      formula: {
        label: "Neighbour product and next square",
        latex: "n(n + 1) = n^2 + n \\qquad (n + 1)^2 = n^2 + 2n + 1",
      },
      authoredExample: {
        prompt: "9 : 84 :: 12 : 147 :: 15 : ?",
        steps: [
          "\\(84 = 81 + 3 = 9^2 + 3\\) and \\(147 = 144 + 3 = 12^2 + 3\\). The rule is the square plus 3.",
          "\\(15^2 + 3 = 225 + 3 = 228\\).",
        ],
        answer: "228",
      },
      selfCheckExample: {
        prompt: "56 : 7 :: 110 : 10 :: 210 : ?",
        steps: [
          "\\(56 = 7 \\times 8\\) and \\(110 = 10 \\times 11\\): the first number is the second times the next number.",
          "\\(210 = 14 \\times 15\\), so the answer is 14.",
        ],
        answer: "14",
      },
      practiceSet: [
        { prompt: "8 : 63 :: 11 : 120 :: 13 : ?", answer: "168", method: "The square less 1." },
        { prompt: "324 : 18 :: 625 : ?", answer: "25", method: "The square root." },
        { prompt: "4 : 50 :: 6 : 98 :: 9 : ?", answer: "200", method: "Twice the square of the next number: \\(2 \\times 10^2\\)." },
        { prompt: "Which of these cannot be a perfect square: 841, 1296, 2197, 3025?", answer: "2197", method: "A square never ends in 7." },
      ],
      pyqExampleId: "0b75eed2-fea3-4f4c-9737-3d2c06b307b6",
      traps: [
        {
          title: "Reading a neighbour product as a square",
          body:
            "\\(11 \\times 12 = 132\\), not \\(11^2 = 121\\). When a number sits just above a square by the square root itself, it is \\(n(n + 1)\\), and the next term in the pattern is \\((n + 1)(n + 2)\\).",
        },
        {
          title: "Squaring the next number instead of moving to the next square",
          body:
            "'24 goes to 35' is \\(5^2 - 1\\) going to \\(6^2 - 1\\). Working out \\(24^2\\) or \\(25^2\\) wastes the time; first ask whether each number is a square plus or minus a small amount.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscransq-cubes",
      name: "Cubes and cube roots",
      intuition:
        "A pair like 7 and 343 is a cube; 9 and 1458 is twice a cube. Know the cubes well enough that a three- or four-digit number makes you think of one, then look for the small multiplier or constant around it.",
      definition:
        "- Learn the cubes: \\(6^3 = 216\\), \\(7^3 = 343\\), \\(8^3 = 512\\), \\(9^3 = 729\\), \\(11^3 = 1331\\), \\(12^3 = 1728\\), \\(13^3 = 2197\\), \\(14^3 = 2744\\), \\(15^3 = 3375\\).\n" +
        "- Pair rules: \\(n^3 \\pm k\\), \\(k \\times n^3\\), \\(n^3 \\div k\\), \\(n^2(n + 1) = n^3 + n^2\\), \\(n^3 - n\\), the cube root, and \\(n^2\\) going to \\(n^3\\).\n" +
        "- **Fast route 1:** when a big number is a multiple of a small one, divide first and look for a cube: \\(686 \\div 2 = 343 = 7^3\\).\n" +
        "- **Fast route 2:** the last digit of a perfect cube fixes the last digit of its root. Cubes of 1, 4, 5, 6, 9 and 0 end in the same digit; 2 and 8 swap, and so do 3 and 7. This works only for perfect cubes.",
      formula: {
        label: "Two forms SSC uses",
        latex: "n^2(n + 1) = n^3 + n^2 \\qquad n^3 - n = (n - 1)\\,n\\,(n + 1)",
      },
      authoredExample: {
        prompt: "4 : 66 :: 6 : 218 :: 7 : ?",
        steps: [
          "\\(66 = 64 + 2 = 4^3 + 2\\) and \\(218 = 216 + 2 = 6^3 + 2\\). The rule is the cube plus 2.",
          "\\(7^3 + 2 = 343 + 2 = 345\\).",
        ],
        answer: "345",
      },
      selfCheckExample: {
        prompt: "250 : 5 :: 1458 : 9 :: 686 : ?",
        steps: [
          "\\(250 = 2 \\times 125 = 2 \\times 5^3\\) and \\(1458 = 2 \\times 729 = 2 \\times 9^3\\). The first number is twice the cube of the second.",
          "\\(686 \\div 2 = 343 = 7^3\\), so the answer is 7.",
        ],
        answer: "7",
      },
      practiceSet: [
        { prompt: "What is the cube root of 2744?", answer: "14" },
        { prompt: "3 : 36 :: 5 : 150 :: 6 : ?", answer: "252", method: "\\(n^2(n + 1)\\): \\(36 \\times 7\\)." },
        { prompt: "10 : 990 :: 4 : 60 :: 7 : ?", answer: "336", method: "\\(n^3 - n\\): \\(343 - 7\\)." },
        { prompt: "A perfect cube ends in 3. What is the last digit of its cube root?", answer: "7", method: "\\(7^3 = 343\\)." },
      ],
      pyqExampleId: "af79be9b-ba53-4af4-845f-9b19704e21b0",
      traps: [
        {
          title: "Using the last-digit rule on a number that is not a cube",
          body:
            "The last digit tells you the root only if the number is a perfect cube. 3,400 ends in 0 but is not \\(10^3\\) or \\(20^3\\); check the size first (between \\(15^3\\) and \\(16^3\\)).",
        },
        {
          title: "Taking k times a cube for a plain cube",
          body:
            "1,458 is not a cube, but it is \\(2 \\times 9^3\\). If a big number is not on your list of cubes, divide it by 2, 3, 5 or 6 before you give up on a cube rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscransq-sets",
      name: "Squares inside a number set",
      intuition:
        "In a set of three, squares appear in two ways: the result is built from the squares of the other two, or every number in the set is itself a square plus or minus a little.",
      definition:
        "- Result from squares: \\(c = a^2 + b^2\\), \\(c = (a + b)^2\\), \\(c = a^2 - b^2\\), middle \\(= a^2 + c\\), and the same with a constant added.\n" +
        "- Whole set of squares: consecutive squares plus or minus k, or the set \\((n, n^2, n^3)\\).\n" +
        "- **Fast route:** \\(a^2 - b^2 = (a - b)(a + b)\\), so \\(15^2 - 13^2\\) is \\(2 \\times 28\\) with no squaring at all.\n" +
        "- Two options can fit a square rule; check every option before you mark one.",
      formula: {
        label: "Square identities",
        latex: "a^2 - b^2 = (a - b)(a + b) \\qquad (a + b)^2 = a^2 + 2ab + b^2",
      },
      authoredExample: {
        prompt: "(3, 7, 58) and (6, 2, 40). Which set is like them? (a) (5, 4, 41) (b) (8, 1, 63) (c) (2, 9, 87)",
        steps: [
          "\\(3^2 + 7^2 = 9 + 49 = 58\\) and \\(6^2 + 2^2 = 36 + 4 = 40\\). The third is the sum of the squares.",
          "(a): \\(25 + 16 = 41\\). It fits.",
          "(b): \\(64 + 1 = 65\\), not 63. (c): \\(4 + 81 = 85\\), not 87.",
        ],
        answer: "(a) (5, 4, 41)",
      },
      selfCheckExample: {
        prompt: "(9, 5, 56) and (11, 7, 72) follow one rule. Find the missing number in (15, 13, ?).",
        steps: [
          "\\(81 - 25 = 56\\) and \\(121 - 49 = 72\\): the difference of the squares.",
          "\\(15^2 - 13^2 = (15 - 13)(15 + 13) = 2 \\times 28 = 56\\).",
        ],
        answer: "56",
      },
      practiceSet: [
        { prompt: "(2, 3, 25) and (4, 2, 36) follow one rule. Find the missing number in (5, 3, ?).", answer: "64", method: "The square of the sum." },
        { prompt: "(5, 25, 125) and (2, 4, 8) follow one rule. Find the missing number in (6, 36, ?).", answer: "216", method: "The set is \\((n, n^2, n^3)\\)." },
        { prompt: "(10, 17, 26) and (37, 50, 65) are consecutive squares plus 1. Find the missing number in (82, 101, ?).", answer: "122", method: "\\(11^2 + 1\\)." },
        { prompt: "What is \\(21^2 - 19^2\\)?", answer: "80", method: "\\((21 - 19)(21 + 19) = 2 \\times 40\\)." },
      ],
      pyqExampleId: "fc3aac7f-83e5-45e9-ba02-a5951611bdcb",
      traps: [
        {
          title: "Treating the square of a sum as a sum of squares",
          body:
            "\\((3 + 4)^2 = 49\\), but \\(3^2 + 4^2 = 25\\). The two rules give different results for every set, so test the given sets with the exact one.",
        },
        {
          title: "Stopping at the first option that fits",
          body:
            "Square rules are loose enough that two options sometimes fit. Check all four; if two still fit, look again for a stricter rule that the given sets also obey.",
        },
      ],
    },
  ],
};
