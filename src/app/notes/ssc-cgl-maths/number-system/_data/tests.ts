import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_NS_TESTS_NOTE: SubtopicNote = {
  subtopicName: "Divisibility Tests",
  title: "Divisibility Tests",
  oneLineDefinition:
    "A divisibility test reads a few digits, or a sum of digits, and tells you whether a number divides exactly without doing the division.",
  whyItMatters:
    "Twenty-nine questions in the bank, twenty-six EASY and three MODERATE, all from the 2023 and 2024 shifts. Most hand you four numbers and ask which one passes, so a test you can run in your head in a few seconds is worth more than any long division.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscnste-table",
      name: "Divisibility tests for 2, 3, 4, 5, 7, 8, 9, 10, 11 and 25",
      intuition:
        "10, 100 and 1000 are already multiples of 2, 4, 5, 8 and 25, so only the last few digits can spoil divisibility by those. And 10 leaves remainder 1 on division by 3 and by 9, so a number behaves like the sum of its digits there.",
      definition:
        "- Tests on the **last digits**: 2, 5 and 10 look at the last digit, 4 and 25 at the last two, 8 at the last three.\n" +
        "- Tests on the **digit sum**: 3 and 9. Every multiple of 9 is a multiple of 3, but not the other way round: a digit sum of 21 means divisible by 3 and not by 9.\n" +
        "- **11** uses the difference between the sums of alternate digits.\n" +
        "- **7** has no quick test that beats dividing. One shortcut: take twice the last digit away from the number formed by the other digits, and repeat; the number is divisible by 7 exactly when the result is.\n" +
        "- For a 'NOT divisible' question, run the test on every option and pick the one that fails. Run the cheapest test first: a last digit before a digit sum.\n" +
        "- When the digits are given only by a rule, write the digit sum in letters. Six consecutive digits starting at \\(a\\) add to \\(6a + 15 = 3(2a + 5)\\), so such a number is always divisible by 3, in any order.",
      table: {
        columns: ["Divisor", "Test", "Example"],
        rows: [
          { cells: ["2", "last digit is 0, 2, 4, 6 or 8", "3574"] },
          { cells: ["3", "digit sum is divisible by 3", "5124: digit sum 12"] },
          { cells: ["4", "last two digits form a multiple of 4", "7316: 16"] },
          { cells: ["5", "last digit is 0 or 5", "6845"] },
          { cells: ["7", "twice the last digit taken from the rest gives a multiple of 7", "2149: \\(214 - 18 = 196 = 7 \\times 28\\)"] },
          { cells: ["8", "last three digits form a multiple of 8", "41136: \\(136 = 8 \\times 17\\)"], noteAmber: "Three digits, not two: 8 is where most slips happen." },
          { cells: ["9", "digit sum is divisible by 9", "7236: digit sum 18"] },
          { cells: ["10", "last digit is 0", "4590"] },
          { cells: ["11", "the two sums of alternate digits differ by 0 or a multiple of 11", "2816: \\((6 + 8) - (1 + 2) = 11\\)"] },
          { cells: ["25", "last two digits are 00, 25, 50 or 75", "3475"] },
        ],
        caption: "Each test says whether the number divides exactly. The same digits also give the remainder, which a later concept on this page uses.",
      },
      selfCheckExample: {
        prompt: "Which of the numbers 51348, 51354, 51362 and 51370 is divisible by 9?",
        steps: [
          "Digit sums: 51348 gives 21, 51354 gives 18, 51362 gives 17, 51370 gives 16.",
          "Only 18 is a multiple of 9.",
        ],
        answer: "51354",
      },
      practiceSet: [
        { prompt: "Is 7128 divisible by 8?", answer: "Yes", method: "Last three digits: \\(128 = 8 \\times 16\\)." },
        { prompt: "Is 3726 divisible by 4?", answer: "No", method: "Last two digits 26 are not a multiple of 4." },
        { prompt: "How many of the numbers 1236, 4571 and 8904 are divisible by 3?", answer: "2", method: "Digit sums 12, 17 and 21: 1236 and 8904 pass." },
        { prompt: "Is 1771 divisible by 7?", answer: "Yes", method: "\\(177 - 2 = 175 = 7 \\times 25\\), and indeed \\(1771 = 7 \\times 253\\)." },
      ],
      pyqExampleId: "413f1090-06c0-4279-be1e-78782632e68b",
      traps: [
        {
          title: "Testing 8 on the last two digits",
          body: "4 needs the last two digits; 8 needs the last three. 316 ends in 16, a multiple of 8, yet \\(316 = 8 \\times 39 + 4\\).",
        },
        {
          title: "Treating divisible by 3 as divisible by 9",
          body: "A digit sum of 12, 21 or 24 gives divisibility by 3 only. For 9 the digit sum itself must be 9, 18, 27 and so on.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnste-eleven",
      name: "The alternating-sum test for 11",
      intuition:
        "10 is one less than 11, so each place value swings between one more and one less than a multiple of 11. That is why the digits count with alternating signs: plus, minus, plus, minus.",
      definition:
        "- You met the rule in the table above; here is how to run it without slips.\n" +
        "- Number the places from the **right**: units is place 1, tens place 2, and so on. Add the digits in the odd places and the digits in the even places separately.\n" +
        "- Let \\(D\\) = (odd-place sum) \\(-\\) (even-place sum). The number is divisible by 11 exactly when \\(D\\) is 0, 11, \\(-11\\), 22 and so on.\n" +
        "- Fast route: write the signs straight onto the digits from the right, \\(+\\,-\\,+\\,-\\), and add as you go.\n" +
        "- A zero is a digit: it holds its place, so never skip it.\n" +
        "- A six-digit number made of a three-digit block written twice, like 458458, equals the block \\(\\times 1001 = \\) the block \\(\\times 7 \\times 11 \\times 13\\), so it is divisible by 7, 11 and 13 at once.",
      formula: {
        label: "Test for 11",
        latex:
          "D = (\\text{sum of digits in odd places}) - (\\text{sum of digits in even places}), \\quad 11 \\text{ divides } N \\text{ exactly when } D = 0, \\pm 11, \\pm 22, \\ldots \\qquad \\overline{abcabc} = \\overline{abc} \\times 7 \\times 11 \\times 13",
        symbols: [
          { symbol: "D", meaning: "the alternating difference, places counted from the right" },
          { symbol: "\\(\\overline{abc}\\)", meaning: "the three-digit number with digits a, b, c" },
        ],
      },
      authoredExample: {
        prompt: "Is 849376 divisible by 11?",
        steps: [
          "From the right the digits are 6, 7, 3, 9, 4, 8.",
          "Odd places: \\(6 + 3 + 4 = 13\\). Even places: \\(7 + 9 + 8 = 24\\).",
          "\\(D = 13 - 24 = -11\\), a multiple of 11, so yes.",
          "Check: \\(11 \\times 77216 = 849376\\).",
        ],
        answer: "Yes",
      },
      selfCheckExample: {
        prompt: "Which of the numbers 52371 and 52713 is divisible by 11?",
        steps: [
          "52371: odd places \\(1 + 3 + 5 = 9\\), even places \\(7 + 2 = 9\\), so \\(D = 0\\). Divisible.",
          "52713: odd places \\(3 + 7 + 5 = 15\\), even places \\(1 + 2 = 3\\), so \\(D = 12\\). Not divisible.",
        ],
        answer: "52371",
      },
      practiceSet: [
        { prompt: "Is 9163 divisible by 11?", answer: "Yes", method: "\\((3 + 1) - (6 + 9) = -11\\)." },
        { prompt: "Is 30712 divisible by 11?", answer: "Yes", method: "\\((2 + 7 + 3) - (1 + 0) = 11\\)." },
        { prompt: "Is 61425 divisible by 11?", answer: "No", method: "\\((5 + 4 + 6) - (2 + 1) = 12\\)." },
        { prompt: "Is 458458 divisible by 13?", answer: "Yes", method: "It is \\(458 \\times 1001 = 458 \\times 7 \\times 11 \\times 13\\)." },
      ],
      pyqExampleId: "95d6510c-b03b-4fbb-a4d8-2152fac73c13",
      traps: [
        {
          title: "Rejecting a difference of 11",
          body: "The difference does not have to be 0. A difference of 11, \\(-11\\) or 22 also means the number is divisible by 11.",
        },
        {
          title: "Skipping a zero digit",
          body: "In 30712 the 0 sits in place 4. Leave it out and every digit after it changes side, and the test gives the wrong verdict.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnste-composite",
      name: "Testing a composite divisor by its co-prime parts",
      intuition:
        "There is no separate test for 36 or 44. Split the divisor into parts that share no factor, run the test for each part, and the number passes only if it passes every part.",
      definition:
        "- Two numbers are **co-prime** when no number other than 1 divides both: 4 and 9, 3 and 8, 9 and 11.\n" +
        "- If \\(m\\) and \\(n\\) are co-prime, a number is divisible by \\(m \\times n\\) exactly when it is divisible by \\(m\\) and by \\(n\\).\n" +
        "- The parts **must** be co-prime. 24 is \\(3 \\times 8\\), never \\(4 \\times 6\\): 12 passes both 4 and 6, yet 24 does not divide 12.\n" +
        "- A divisor with three parts works the same way: \\(132 = 3 \\times 4 \\times 11\\).\n" +
        "- When one divisor in a list is a multiple of the others, the others add nothing: 'divisible by 2, 4 and 8' is just divisible by 8.\n" +
        "- If a number divides two numbers, it divides their sum and their difference. A multiple of 21 is a multiple of 3, and so is 45, so their sum is a multiple of 3 (but not always of 7).",
      formula: {
        label: "Common co-prime splits",
        latex:
          "6 = 2 \\times 3 \\quad 12 = 3 \\times 4 \\quad 18 = 2 \\times 9 \\quad 24 = 3 \\times 8 \\quad 33 = 3 \\times 11 \\quad 36 = 4 \\times 9 \\quad 44 = 4 \\times 11 \\quad 45 = 5 \\times 9 \\quad 72 = 8 \\times 9 \\quad 99 = 9 \\times 11",
      },
      authoredExample: {
        prompt: "Is 61272 divisible by 72?",
        steps: [
          "\\(72 = 8 \\times 9\\), and 8 and 9 are co-prime.",
          "For 8: last three digits \\(272 = 8 \\times 34\\). Passes.",
          "For 9: digit sum \\(6 + 1 + 2 + 7 + 2 = 18\\). Passes.",
          "So 72 divides it. Check: \\(72 \\times 851 = 61272\\).",
        ],
        answer: "Yes",
      },
      selfCheckExample: {
        prompt: "Which of the numbers 3960 and 4620 is divisible by 45?",
        steps: [
          "\\(45 = 5 \\times 9\\). Both numbers end in 0, so both pass the test for 5.",
          "Digit sums: 3960 gives 18, 4620 gives 12. Only 3960 passes the test for 9.",
        ],
        answer: "3960",
      },
      practiceSet: [
        { prompt: "Is 7236 divisible by 12?", answer: "Yes", method: "\\(12 = 3 \\times 4\\): 36 is a multiple of 4 and the digit sum 18 is a multiple of 3." },
        { prompt: "Is 5784 divisible by 24?", answer: "Yes", method: "\\(24 = 3 \\times 8\\): \\(784 = 8 \\times 98\\) and the digit sum 24 is a multiple of 3." },
        { prompt: "Is 2178 divisible by 99?", answer: "Yes", method: "\\(99 = 9 \\times 11\\): digit sum 18, and \\((8 + 1) - (7 + 2) = 0\\)." },
        { prompt: "A number is divisible by 15. Must it be divisible by 5?", answer: "Yes", method: "5 is a factor of 15, so every multiple of 15 is a multiple of 5." },
      ],
      pyqExampleId: "2723bc17-ae73-4e0a-a64a-af98712e2a62",
      traps: [
        {
          title: "Splitting a divisor into parts that share a factor",
          body: "Testing 4 and 6 does not test 24, because 4 and 6 share the factor 2. Use co-prime parts: \\(24 = 3 \\times 8\\).",
        },
        {
          title: "Running only one of the two tests",
          body: "For 36 a number must pass both 4 and 9. 1242 has digit sum 9 but ends in 42, which is not a multiple of 4, so 36 does not divide it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnste-remainder",
      name: "Remainders from the digit tests",
      intuition:
        "A test does more than say yes or no. The digits it reads leave the same remainder as the whole number, so the test also tells you how far the number is from a multiple.",
      definition:
        "- **9 and 3:** a number leaves the same remainder as its digit sum.\n" +
        "- **8, 4, 2, 5 and 10:** a number leaves the same remainder as its last three, last two or last digit.\n" +
        "- **11:** the remainder is \\(D\\) = (odd-place sum) \\(-\\) (even-place sum), with places counted **from the right**. If \\(D\\) is negative, add 11; if it is 11 or more, take 11 away.\n" +
        "- Then, as on the division page: the least number to **subtract** is the remainder, and the least number to **add** is the divisor minus the remainder.",
      formula: {
        label: "Remainders from digits",
        latex:
          "N \\div 9 \\text{ leaves the remainder of (digit sum)} \\div 9 \\qquad N \\div 11 \\text{ leaves the remainder of } D \\div 11",
      },
      authoredExample: {
        prompt: "What is the least number that must be added to 352817 to make it divisible by 11?",
        steps: [
          "From the right the digits are 7, 1, 8, 2, 5, 3.",
          "Odd places: \\(7 + 8 + 5 = 20\\). Even places: \\(1 + 2 + 3 = 6\\). \\(D = 14\\).",
          "\\(14 = 11 + 3\\), so the remainder is 3. Add \\(11 - 3 = 8\\).",
          "Check: 352825 gives \\((5 + 8 + 5) - (2 + 2 + 3) = 11\\).",
        ],
        answer: "8",
      },
      selfCheckExample: {
        prompt: "Find the remainder when 746135 is divided by 9.",
        steps: ["Digit sum \\(= 7 + 4 + 6 + 1 + 3 + 5 = 26\\).", "\\(26 = 2 \\times 9 + 8\\)."],
        answer: "8",
      },
      practiceSet: [
        { prompt: "What is the least number that must be subtracted from 51237 to make it divisible by 8?", answer: "5", method: "\\(237 = 8 \\times 29 + 5\\)." },
        { prompt: "What is the remainder when 8315 is divided by 4?", answer: "3", method: "Last two digits: \\(15 = 4 \\times 3 + 3\\)." },
        { prompt: "What is the least number that must be added to 26104 to make it divisible by 9?", answer: "5", method: "Digit sum 13 leaves remainder 4, so add \\(9 - 4 = 5\\)." },
        { prompt: "What is the remainder when 4072 is divided by 11?", answer: "2", method: "\\((2 + 0) - (7 + 4) = -9\\), and \\(-9 + 11 = 2\\)." },
      ],
      pyqExampleId: "cdc2b247-354f-47e4-974b-c5e5dbdc40e7",
      traps: [
        {
          title: "Reading the 11 difference from the left",
          body: "For the remainder, count places from the right. From the left, a number with an even count of digits gives the difference with the wrong sign: 4072 read from the left gives 9, but its remainder is 2.",
        },
        {
          title: "Giving a negative difference as the remainder",
          body: "A remainder is never negative. A difference of \\(-9\\) on division by 11 means a remainder of \\(-9 + 11 = 2\\).",
        },
      ],
    },
  ],
};
