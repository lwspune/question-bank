import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CF_ODD_NOTE: SubtopicNote = {
  subtopicName: "Odd One Out",
  title: "Odd One Out",
  oneLineDefinition:
    "Three of the four options share a rule and one breaks it. Find the rule from the options, test it on each, and the one that fails is the answer.",
  whyItMatters:
    "Six questions in the bank, all from the 2022 paper: three EASY, one MODERATE and two HARD. Three ask for the odd number and three for the odd pair or set, and every one is settled by a number fact or a rule tested on each option in turn.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicfoo-method",
      name: "Find the rule three options share",
      intuition:
        "You are not looking for the strange option first. You are looking for what three of them have in common. Once you see the shared rule, the odd one shows itself.",
      definition:
        "The method:\n" +
        "- Try the quick rules first: even or odd, multiples of one number, primes, squares, cubes, sum of digits.\n" +
        "- A rule counts only if exactly three options keep it and one breaks it.\n" +
        "- If two different rules each pick a different option, prefer the rule that explains the options as written, such as why one number has more digits.\n" +
        "- Test the rule on every option, not just the first two.",
      authoredExample: {
        prompt: "Find the odd number: (a) 14 (b) 21 (c) 35 (d) 40",
        steps: [
          "Try multiples of 7: \\(14 = 7 \\times 2\\), \\(21 = 7 \\times 3\\), \\(35 = 7 \\times 5\\).",
          "40 is not a multiple of 7.",
          "Exactly three keep the rule, so 40 is the odd one.",
        ],
        answer: "(d) 40",
      },
      selfCheckExample: {
        prompt: "Find the odd number: (a) 6 (b) 12 (c) 20 (d) 31",
        steps: [
          "\\(6 = 2 \\times 3\\), \\(12 = 3 \\times 4\\), \\(20 = 4 \\times 5\\): each is a product of two numbers next to each other.",
          "31 is not (\\(5 \\times 6 = 30\\)). It is also the only odd number.",
        ],
        answer: "(d) 31",
      },
      practiceSet: [
        { prompt: "Find the odd number: 11, 22, 33, 45", answer: "45", method: "The others are multiples of 11." },
        { prompt: "Find the odd number: 8, 10, 12, 15", answer: "15", method: "The only odd number." },
        { prompt: "Find the odd number: 25, 35, 45, 52", answer: "52", method: "The others are multiples of 5." },
        {
          prompt: "How many options must keep a rule for that rule to point to the odd one out?",
          answer: "Exactly three of the four.",
        },
      ],
      traps: [
        {
          title: "Stopping at the first rule you see",
          body:
            "A rule that two options keep and two break picks out nothing. Keep trying until three options keep it and one breaks it.",
        },
        {
          title: "Testing only some options",
          body:
            "An option that looks like the others can still break the rule. Check every option before you mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicfoo-facts",
      name: "Number facts to test first",
      intuition:
        "Most odd-number questions hide a plain fact: three primes and one composite, three squares and one near miss. Know these lists well and you can check an option in seconds.",
      definition:
        "Keep these in mind:\n" +
        "- **2 is the only even prime.** Any other even number is not prime.\n" +
        "- To test a number for prime, divide by the primes up to its square root.\n" +
        "- A perfect square lies exactly on a square; find the two squares a number sits between.\n" +
        "- A number is divisible by 3 (or 9) when its digit sum is.",
      table: {
        columns: ["Property", "Numbers to know", "Quick test"],
        rows: [
          {
            cells: [
              "Primes up to 100",
              "2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97",
              "Divide by 2, 3, 5, 7 for numbers under 100",
            ],
            noteAmber: "51 = 3 × 17, 57 = 3 × 19 and 91 = 7 × 13 look prime but are not.",
          },
          {
            cells: [
              "Perfect squares",
              "121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 625, 900, 1024",
              "Find the squares on either side",
            ],
          },
          {
            cells: ["Perfect cubes", "1, 8, 27, 64, 125, 216, 343, 512, 729, 1000", "Learn them to 10 cubed"],
          },
          { cells: ["Even numbers", "Last digit 0, 2, 4, 6 or 8", "Look at the last digit"] },
          { cells: ["Digit sum", "Add the digits: 5742 gives 18", "Same digit sum is a common shared rule"] },
        ],
        caption: "Try the quick tests in this order: even or odd, prime, square or cube, digit sum.",
      },
      selfCheckExample: {
        prompt: "Find the odd number: (a) 31 (b) 41 (c) 51 (d) 61",
        steps: ["31, 41 and 61 are prime.", "\\(51 = 3 \\times 17\\), so 51 is not prime."],
        answer: "(c) 51",
      },
      practiceSet: [
        { prompt: "Is 91 a prime number?", answer: "No: \\(91 = 7 \\times 13\\)" },
        { prompt: "Which of 216, 343, 400, 512 is not a perfect cube?", answer: "400" },
        { prompt: "Which is a perfect square: 1440 or 1444?", answer: "1444, which is \\(38^2\\)" },
        { prompt: "What is the digit sum of 3804?", answer: "15" },
      ],
      pyqExampleId: "63a3bdd7-42fb-46bc-bf96-df9f3f28b239",
      traps: [
        {
          title: "Calling an odd number prime on sight",
          body:
            "Odd is not the same as prime. Test small divisors: 87 is \\(3 \\times 29\\) and 91 is \\(7 \\times 13\\).",
        },
        {
          title: "Missing a second rule",
          body:
            "When one number is the only even one and another has a different digit sum, two rules point two ways. Check which rule explains all four options before you choose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicfoo-sets",
      name: "The rule inside a pair or set",
      intuition:
        "When each option is a pair or a set, the rule links the numbers inside it. Find how the first number turns into the others in one option, then test the same rule on the rest.",
      definition:
        "Rules to try, in this order:\n" +
        "- Second is the square or cube of the first, or one more or less than it.\n" +
        "- Last is the sum, difference or product of the others.\n" +
        "- Last is the first divided by the second.\n" +
        "- Two of the numbers are consecutive.\n" +
        "- The product's digits are rearranged to make the last number.\n" +
        "Work the rule out on the simplest option, then check it on all four.",
      formula: {
        label: "Common links in a set",
        latex: "b = a^2,\\; b = a^3,\\; b = a^2 \\pm 1,\\; c = a \\times b,\\; c = a \\div b",
      },
      authoredExample: {
        prompt: "Find the odd pair: (a) 4, 17 (b) 6, 37 (c) 3, 10 (d) 5, 24",
        steps: [
          "Try the square plus one: \\(4^2 + 1 = 17\\), \\(6^2 + 1 = 37\\), \\(3^2 + 1 = 10\\).",
          "\\(5^2 + 1 = 26\\), but the pair has 24, which is \\(5^2 - 1\\).",
        ],
        answer: "(d) 5, 24",
      },
      selfCheckExample: {
        prompt: "Find the odd set: (a) 2, 3, 6 (b) 4, 5, 20 (c) 3, 7, 21 (d) 6, 2, 13",
        steps: [
          "The last number is the product of the first two: \\(2 \\times 3 = 6\\), \\(4 \\times 5 = 20\\), \\(3 \\times 7 = 21\\).",
          "\\(6 \\times 2 = 12\\), not 13.",
        ],
        answer: "(d) 6, 2, 13",
      },
      practiceSet: [
        { prompt: "Find the odd pair: (9, 3), (16, 4), (25, 5), (36, 7)", answer: "(36, 7)", method: "The second is the square root of the first; \\(\\sqrt{36} = 6\\)." },
        { prompt: "Find the odd pair: (2, 6), (5, 15), (7, 21), (8, 25)", answer: "(8, 25)", method: "The second is three times the first; \\(3 \\times 8 = 24\\)." },
        { prompt: "Find the odd set: (3, 4, 7), (5, 6, 11), (2, 9, 11), (4, 4, 9)", answer: "(4, 4, 9)", method: "The last is the sum of the first two; \\(4 + 4 = 8\\)." },
        { prompt: "Find the odd set: (12, 4, 3), (20, 5, 4), (18, 6, 3), (24, 6, 5)", answer: "(24, 6, 5)", method: "The first divided by the second gives the last; \\(24 \\div 6 = 4\\)." },
      ],
      pyqExampleId: "a5db0aa9-6bc2-46c3-83ff-8a5cc126b331",
      traps: [
        {
          title: "Finding a rule that fits two options only",
          body:
            "A rule found on one option must be checked on all four. If it fails on two, it is the wrong rule, so try the next one on the list.",
        },
        {
          title: "Missing a near miss",
          body:
            "An odd set often differs by very little, such as a cube that is 10 too big. Work each value out in full rather than judging by size.",
        },
      ],
    },
  ],
};
