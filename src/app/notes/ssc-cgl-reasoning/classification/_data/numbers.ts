import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Number Classification",
  title: "Number Classification",
  oneLineDefinition:
    "Four numbers or groups are given and three share a property: prime, square, cube, a divisibility rule or a digit pattern. Name the property and find the one that breaks it.",
  whyItMatters:
    "Sixteen questions in the bank, thirteen of them from the 2025 shifts, 12 EASY and 4 MODERATE. Each one is a single fact about a number, so the time goes on recall: a student who knows the primes under 100, the squares to 30 and the cubes to 20 answers in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrclnu-method",
      name: "Finding the odd one out: the order of tests",
      intuition:
        "Every classification question hides one rule. Three options obey it and one does not. You do not need the setter's exact words for the rule; you need a rule that splits the options three against one.",
      definition:
        "- Read the last line of the stem first. Most ask for the one that does NOT belong, but some 2025 questions ask for the number SIMILAR to a given list, or the group whose members all share a category. Then the answer is the one that keeps the rule.\n" +
        "- **Test 1, each number alone**: even or odd, prime or not, square, cube, a multiple of something, a digit pattern.\n" +
        "- **Test 2, the link inside each option** (a pair, a triad, a cluster): the later pages teach these.\n" +
        "- A rule that fits all four options, or only two, is the wrong rule. Drop it and try the next test.\n" +
        "- **Fast route**: start with the option that looks different (the only even number, the only big one) and ask why it is different. If that reason holds for the other three, you are done.",
      authoredExample: {
        prompt: "Find the odd one out: (a) 35 (b) 63 (c) 77 (d) 92",
        steps: [
          "Prime? None of the four is prime, so this test splits nothing. Move on.",
          "Even or odd? 35, 63 and 77 are odd; 92 is even. That splits three against one.",
          "Check it from another side: 35, 63 and 77 are all multiples of 7 (\\(7 \\times 5\\), \\(7 \\times 9\\), \\(7 \\times 11\\)), and 92 is not (\\(7 \\times 13 = 91\\)). Both rules point to 92.",
        ],
        answer: "(d) 92",
      },
      selfCheckExample: {
        prompt: "Which number does not belong with the others: (a) 48 (b) 72 (c) 96 (d) 112?",
        steps: [
          "All four are even, and all four are multiples of 8, so neither test splits them.",
          "Digit sums: 12, 9, 15 and 4. The first three are multiples of 3, so 48, 72 and 96 are divisible by 3 (they are \\(24 \\times 2\\), \\(24 \\times 3\\), \\(24 \\times 4\\)).",
          "112 has digit sum 4, so it is not divisible by 3.",
        ],
        answer: "(d) 112",
      },
      practiceSet: [
        { prompt: "In an odd-one-out question, a rule you have found fits all four options. What should you do?", answer: "Drop it and look for a rule that fits exactly three." },
        { prompt: "Find the odd one out: 27, 45, 63, 80", answer: "80", method: "27, 45 and 63 are multiples of 9 (digit sum 9); 80 is not." },
        { prompt: "Find the odd one out: 14, 26, 38, 51", answer: "51", method: "It is the only odd number." },
        { prompt: "A question asks for the group in which all numbers belong to the same category. Is the answer the group that keeps the rule or the one that breaks it?", answer: "The group that keeps the rule." },
      ],
      traps: [
        {
          title: "Stopping at a rule that fits all four",
          body:
            "If every option is even, being even is not the rule. The rule you want splits the options three against one; keep testing until one does.",
        },
        {
          title: "Answering a different question from the one printed",
          body:
            "Some stems ask for the number similar to a given list, or for the group whose members all belong together. There the answer is the option that follows the rule, not the one that breaks it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclnu-primes",
      name: "Prime and composite numbers",
      intuition:
        "A prime has exactly two factors, 1 and itself. Most odd one out questions on primes hide one composite number that looks prime, or one prime among composites.",
      definition:
        "- **Primes under 100** (25 of them): 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.\n" +
        "- 1 is not prime. 2 is the only even prime.\n" +
        "- To test a number, divide it by the primes up to its square root. If none divides it, it is prime.\n" +
        "- **Fast route**: a number above 5 that ends in 0, 2, 4, 5, 6 or 8 is composite. A digit sum that is a multiple of 3 means the number is divisible by 3. After that, only 7, 11 and 13 need a real division for numbers up to about 200.\n" +
        "- Composites that look prime and catch students: 51, 57, 87, 91, 119, 133, 143, 161, 187, 221.",
      formula: {
        label: "Prime test",
        latex: "n \\text{ is prime if no prime } p \\le \\sqrt{n} \\text{ divides } n",
      },
      authoredExample: {
        prompt: "Find the odd one out: (a) 59 (b) 71 (c) 87 (d) 97",
        steps: [
          "Digit sums: 14, 8, 15 and 16. Only 87 has a digit sum that is a multiple of 3, so \\(87 = 3 \\times 29\\) is composite.",
          "Check the rest. 59: not divisible by 2, 3, 5 or 7 (\\(7 \\times 8 = 56\\)), so prime. 71: \\(7 \\times 10 = 70\\), so prime. 97: \\(7 \\times 13 = 91\\), so prime.",
          "Three primes and one composite.",
        ],
        answer: "(c) 87",
      },
      selfCheckExample: {
        prompt: "Which of these numbers is prime: (a) 161 (b) 119 (c) 133 (d) 113?",
        steps: [
          "None ends in an even digit or 5, and no digit sum (8, 11, 7, 5) is a multiple of 3, so try 7.",
          "\\(161 = 7 \\times 23\\), \\(119 = 7 \\times 17\\), \\(133 = 7 \\times 19\\).",
          "113: \\(\\sqrt{113}\\) is below 11, and 113 is not divisible by 2, 3, 5 or 7 (\\(7 \\times 16 = 112\\)). It is prime.",
        ],
        answer: "(d) 113",
      },
      practiceSet: [
        { prompt: "Is 221 a prime number?", answer: "No: \\(221 = 13 \\times 17\\)" },
        { prompt: "How many prime numbers lie between 50 and 60?", answer: "2 (53 and 59)" },
        { prompt: "Which is the only even prime number?", answer: "2" },
        { prompt: "Find the odd one out: 41, 43, 47, 49", answer: "49", method: "\\(49 = 7 \\times 7\\); the others are prime." },
      ],
      pyqExampleId: "ff50e9be-571d-4bb8-bed3-fe41a9a3fe4c",
      traps: [
        {
          title: "Counting 1 as a prime",
          body: "A prime has exactly two different factors. The number 1 has only one, so it is neither prime nor composite.",
        },
        {
          title: "Trusting an odd last digit",
          body:
            "An odd number can still be composite: \\(91 = 7 \\times 13\\) and \\(57 = 3 \\times 19\\). Run the digit-sum test for 3 and divide by 7 before you call a number prime.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclnu-powers",
      name: "Squares, cubes and divisibility tests",
      intuition:
        "If you know the squares and cubes by heart, a number that is not one of them stands out at once. Divisibility tests do the same job for multiples, without a long division.",
      definition:
        "- Learn the squares from \\(1^2\\) to \\(30^2\\) and the cubes from \\(1^3\\) to \\(20^3\\).\n" +
        "- A square ends in 0, 1, 4, 5, 6 or 9. A number ending in 2, 3, 7 or 8 is never a square.\n" +
        "- The last digit of a cube follows the last digit of the number: 2 gives 8, 8 gives 2, 3 gives 7, 7 gives 3, and every other digit gives itself. So the cube root of a four-digit cube ending in 3 ends in 7.\n" +
        "- **By 3 or 9**: the digit sum is a multiple of 3 or 9. **By 4**: the last two digits form a multiple of 4. **By 11**: the alternating sum of the digits is 0 or a multiple of 11.\n" +
        "- Some numbers are both: 64 is \\(8^2\\) and \\(4^3\\); 729 is \\(27^2\\) and \\(9^3\\). Find what the other three share before you decide.",
      formula: {
        label: "Last digits and divisibility",
        latex:
          "n^2 \\text{ ends in } 0, 1, 4, 5, 6, 9 \\qquad 3 \\mid n \\text{ when } 3 \\mid \\text{digit sum} \\qquad 11 \\mid n \\text{ when } 11 \\mid \\text{alternating digit sum}",
      },
      authoredExample: {
        prompt: "Find the odd one out: (a) 343 (b) 729 (c) 1000 (d) 1600",
        steps: [
          "\\(343 = 7^3\\), \\(729 = 9^3\\), \\(1000 = 10^3\\): three cubes.",
          "Quick check on 1600: a cube that ends in 0 must end in 000, because the number cubed ends in 0. 1600 ends in only two zeros, so it is not a cube. It is \\(40^2\\).",
        ],
        answer: "(d) 1600",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) 144 (b) 196 (c) 256 (d) 288",
        steps: [
          "\\(144 = 12^2\\), \\(196 = 14^2\\), \\(256 = 16^2\\).",
          "288 lies between \\(16^2 = 256\\) and \\(17^2 = 289\\), so it is not a square.",
        ],
        answer: "(d) 288",
      },
      practiceSet: [
        { prompt: "What is \\(14^3\\)?", answer: "2744" },
        { prompt: "Is 2601 a perfect square?", answer: "Yes: \\(51^2 = 2601\\)" },
        { prompt: "Is 7392 divisible by 11?", answer: "Yes", method: "\\(7 - 3 + 9 - 2 = 11\\), a multiple of 11." },
        { prompt: "Is 75 divisible by the sum of its digits?", answer: "No", method: "The digit sum is 12, and \\(75 \\div 12\\) is not a whole number." },
      ],
      pyqExampleId: "e90b4ff5-9af5-4dd5-82fd-817061fe12cc",
      traps: [
        {
          title: "Calling a number a square because of its last digit",
          body:
            "A square must end in 0, 1, 4, 5, 6 or 9, but the reverse is not true: 26 ends in 6 and is not a square. The last digit can only rule a number out.",
        },
        {
          title: "Missing that a number can be both a square and a cube",
          body:
            "64 and 729 are squares and cubes at once. If the other options are cubes, such a number belongs with them; check what the other three share before you mark it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclnu-digits",
      name: "Digit patterns and true statements",
      intuition:
        "Some numbers are grouped by how their digits are written rather than by their value: the same forwards and backwards, digits in a run, odd and even digits in turn. Look at the digits before you calculate anything.",
      definition:
        "- **Palindrome**: reads the same both ways (373, 2552).\n" +
        "- **Digits in a run**: each digit one more or one less than the last (3456, 8765), or a fixed step (1357, 8642). The odd one may run the other way.\n" +
        "- **Odd and even in turn**: in a set like 81, 118, 91 the numbers go odd, even, odd. Mark each number O or E and compare the patterns.\n" +
        "- **True or false statements**: when each option is a little sum or division, work each one out. Three are true and one is false.\n" +
        "- If a stem says what a strange sign means, use that meaning exactly. If it says nothing, read the sign in its usual sense.",
      authoredExample: {
        prompt: "Find the odd one out: (a) 2468 (b) 1357 (c) 3579 (d) 4682",
        steps: [
          "Read the digits as a run. 2, 4, 6, 8 steps up by 2. 1, 3, 5, 7 steps up by 2. 3, 5, 7, 9 steps up by 2.",
          "4, 6, 8, 2 steps +2, +2 and then down by 6. It breaks the run.",
        ],
        answer: "(d) 4682",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) 2552 (b) 7117 (c) 3434 (d) 6226",
        steps: [
          "Read each number backwards: 2552, 7117 and 6226 do not change.",
          "3434 backwards is 4343, a different number, so it is not a palindrome.",
        ],
        answer: "(c) 3434",
      },
      practiceSet: [
        { prompt: "Find the odd one out: 9 + 6 = 15, 8 + 7 = 15, 4 + 9 = 14, 5 + 8 = 13", answer: "4 + 9 = 14", method: "\\(4 + 9 = 13\\); the other three are true." },
        { prompt: "Find the odd one out: 8642, 9753, 7531, 3210", answer: "3210", method: "The others step down by 2; 3210 steps down by 1." },
        { prompt: "Mark the numbers 37, 52 and 19 as odd (O) or even (E). What is the pattern?", answer: "O, E, O" },
        { prompt: "Is 6006 a palindrome?", answer: "Yes" },
      ],
      pyqExampleId: "4742295f-8d2c-4e87-9134-51756954b85a",
      traps: [
        {
          title: "Missing a run that goes the other way",
          body:
            "5678 and 8765 both have digits in a run, one going up and one going down. When three options run one way, the fourth can be odd only because of its direction.",
        },
      ],
    },
  ],
};
