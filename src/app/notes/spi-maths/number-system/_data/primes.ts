import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_NS_PRIMES_NOTE: SubtopicNote = {
  subtopicName: "Divisibility, Primes and Factorisation",
  title: "Divisibility, Primes and Factorisation",
  oneLineDefinition:
    "Divisibility rules tell you quickly what divides a number, a prime has no factors but 1 and itself, and every whole number above 1 is one fixed product of primes.",
  whyItMatters:
    "Eleven questions in the bank, ten EASY and one MODERATE, and one is from the 2022 paper. Most ask you to split a number into primes and read off the powers; the rest test a divisibility rule or whether a number is prime.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spinspr-divisibility",
      name: "Divisibility rules",
      intuition:
        "You do not need to divide to know whether a number divides exactly. Each small divisor leaves a sign in the digits: the last digit, the last few digits, or the sum of the digits.",
      definition:
        "- To count the multiples of \\(k\\) in a range, list the first and the last multiple and count in steps of \\(k\\).\n" +
        "- 'Between 11 and 50' leaves out 11 and 50 themselves.\n" +
        "- To count numbers divisible by \\(a\\) but not by \\(b\\), count the multiples of \\(a\\) and take away the multiples of the LCM of \\(a\\) and \\(b\\).",
      table: {
        columns: ["Divisor", "Rule", "Example"],
        rows: [
          { cells: ["2", "Last digit is 0, 2, 4, 6 or 8", "3576"] },
          { cells: ["3", "Sum of the digits is divisible by 3", "741: \\(7 + 4 + 1 = 12\\)"] },
          { cells: ["4", "Last two digits form a number divisible by 4", "5316: 16"] },
          { cells: ["5", "Last digit is 0 or 5", "8935"] },
          { cells: ["6", "Divisible by both 2 and 3", "912: even, \\(9 + 1 + 2 = 12\\)"] },
          { cells: ["8", "Last three digits form a number divisible by 8", "71240: 240"] },
          { cells: ["9", "Sum of the digits is divisible by 9", "6534: \\(6 + 5 + 3 + 4 = 18\\)"] },
          {
            cells: ["11", "Alternating sum of the digits is 0 or a multiple of 11", "3729: \\(3 - 7 + 2 - 9 = -11\\)"],
            noteAmber: "Add and subtract the digits in turn. The plain digit sum says nothing about 11.",
          },
        ],
        caption: "Each example in the last column passes its rule.",
      },
      selfCheckExample: {
        prompt: "Is 2728 divisible by 11?",
        steps: ["Alternating sum: \\(2 - 7 + 2 - 8 = -11\\).", "\\(-11\\) is a multiple of 11, so yes: \\(2728 = 11 \\times 248\\)."],
        answer: "Yes",
      },
      practiceSet: [
        { prompt: "Is 7314 divisible by 3?", answer: "Yes: \\(7 + 3 + 1 + 4 = 15\\)" },
        { prompt: "Is 5126 divisible by 4?", answer: "No: 26 is not divisible by 4" },
        { prompt: "Is 9327 divisible by 9?", answer: "No: \\(9 + 3 + 2 + 7 = 21\\)" },
        { prompt: "How many multiples of 6 lie between 20 and 70?", answer: "8 (24, 30, ..., 66)" },
      ],
      pyqExampleId: "7544ce81-02c6-4660-beaf-d33e550ca73e",
      traps: [
        {
          title: "Taking away multiples of the product, not the LCM",
          body:
            "Up to 50 there are 12 multiples of 4. Those that are also multiples of 6 are the multiples of 12 (12, 24, 36, 48), so 8 are divisible by 4 but not by 6. Taking away only the multiples of 24 gives 10, which is wrong.",
        },
        {
          title: "Testing 6 with one rule",
          body: "A number divisible by 3 is not always divisible by 6. It must also be even: 75 passes the rule for 3 but is odd.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinspr-primes",
      name: "Prime and composite numbers",
      intuition:
        "A prime has exactly two factors, 1 and itself. To test a number, you only need to try the primes up to its square root: if a bigger factor existed, a smaller partner would already have shown up.",
      definition:
        "- A **prime** has exactly two factors. A **composite** number has more than two.\n" +
        "- **1 is neither prime nor composite.**\n" +
        "- **2 is the only even prime**, so every other prime is odd.\n" +
        "- The smallest composite number is 4 and the smallest odd composite number is 9.\n" +
        "- To test \\(n\\), divide by the primes 2, 3, 5, 7, 11, 13, ... up to \\(\\sqrt{n}\\). If none divides, \\(n\\) is prime.",
      authoredExample: {
        prompt: "Is 211 a prime number?",
        steps: [
          "\\(14^2 = 196\\) and \\(15^2 = 225\\), so test the primes up to 14: 2, 3, 5, 7, 11, 13.",
          "211 is odd; \\(2 + 1 + 1 = 4\\), so not 3; it does not end in 0 or 5.",
          "\\(7 \\times 30 = 210\\) leaves 1; \\(2 - 1 + 1 = 2\\), so not 11; \\(13 \\times 16 = 208\\) leaves 3.",
          "No prime up to 14 divides 211.",
        ],
        answer: "Yes, 211 is prime.",
      },
      selfCheckExample: {
        prompt: "Is 221 a prime number?",
        steps: [
          "\\(14^2 = 196\\) and \\(15^2 = 225\\), so test the primes up to 14.",
          "2, 3, 5, 7 and 11 do not divide it, but \\(13 \\times 17 = 221\\).",
        ],
        answer: "No, \\(221 = 13 \\times 17\\).",
      },
      practiceSet: [
        { prompt: "What is the only even prime number?", answer: "2" },
        { prompt: "Is 91 a prime number?", answer: "No, \\(91 = 7 \\times 13\\)" },
        { prompt: "How many prime numbers are there between 1 and 20?", answer: "8 (2, 3, 5, 7, 11, 13, 17, 19)" },
        { prompt: "If p and q are both odd primes, is \\(p + q\\) even or odd?", answer: "Even (odd plus odd)" },
      ],
      pyqExampleId: "035bc72f-821a-467f-86f8-4817691842e9",
      traps: [
        {
          title: "Calling 1 a prime",
          body: "1 has only one factor, so it is neither prime nor composite. The smallest prime is 2.",
        },
        {
          title: "Numbers that look prime",
          body: "91 (\\(7 \\times 13\\)), 119 (\\(7 \\times 17\\)) and 143 (\\(11 \\times 13\\)) are odd and pass the rules for 3 and 5, yet they are composite. Test the primes up to the square root before deciding.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinspr-factorise",
      name: "Prime factorisation",
      intuition:
        "Keep splitting a number until every piece is a prime. However you start, you always end with the same primes: this is the Fundamental Theorem of Arithmetic. The powers of those primes answer most questions.",
      definition:
        "- Divide by 2 as long as you can, then by 3, then 5, 7, 11, and so on.\n" +
        "- **Fundamental Theorem of Arithmetic:** every whole number above 1 is a product of primes in exactly one way, apart from order.\n" +
        "- If a prime \\(p\\) divides \\(b^2\\), then \\(p\\) divides \\(b\\).\n" +
        "- Each zero at the end of a number needs one 2 and one 5 (\\(2 \\times 5 = 10\\)), so the number of end zeros is the smaller of the powers of 2 and 5.",
      formula: {
        label: "Prime factorisation and end zeros",
        latex:
          "n = p_1^{a_1} \\times p_2^{a_2} \\times \\cdots \\times p_k^{a_k} \\qquad \\text{zeros at the end of } 2^a \\times 5^b \\times \\ldots = \\text{the smaller of } a, b",
        symbols: [
          { symbol: "p₁, p₂, ..., pₖ", meaning: "the different primes that divide n" },
          { symbol: "a₁, a₂, ..., aₖ", meaning: "how many times each prime appears" },
        ],
      },
      authoredExample: {
        prompt: "Write 1540 as a product of primes.",
        steps: [
          "\\(1540 = 2 \\times 770 = 2 \\times 2 \\times 385\\).",
          "385 ends in 5: \\(385 = 5 \\times 77 = 5 \\times 7 \\times 11\\).",
          "So \\(1540 = 2^2 \\times 5 \\times 7 \\times 11\\). Check: \\(4 \\times 385 = 1540\\).",
        ],
        answer: "\\(2^2 \\times 5 \\times 7 \\times 11\\)",
      },
      selfCheckExample: {
        prompt: "How many zeros are there at the end of \\(2^5 \\times 3^2 \\times 5^3\\)?",
        steps: [
          "Three 5s can each pair with a 2, and two 2s are left over.",
          "So there are 3 zeros. Check: \\(32 \\times 9 \\times 125 = 36000\\).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Write 360 as a product of primes.", answer: "\\(2^3 \\times 3^2 \\times 5\\)" },
        { prompt: "Write 1078 as a product of primes.", answer: "\\(2 \\times 7^2 \\times 11\\)" },
        { prompt: "What is the sum of the powers in the prime factorisation of 72?", answer: "5, since \\(72 = 2^3 \\times 3^2\\)" },
        { prompt: "A prime p divides \\(n^2\\). Which other number must p divide?", answer: "n" },
      ],
      pyqExampleId: "99252700-e97f-4fc1-882e-682fad4a7d19",
      traps: [
        {
          title: "Stopping at a composite piece",
          body: "\\(2^2 \\times 9 \\times 5\\) is not finished, because 9 is \\(3^2\\). Every factor in the final answer must be a prime.",
        },
        {
          title: "Adding the powers of 2 and 5 for end zeros",
          body: "\\(2^3 \\times 5^4\\) ends in 3 zeros, not 7. Each zero uses one 2 and one 5 together, so the smaller power decides.",
        },
        {
          title: "Squaring the divisor",
          body: "If a prime p divides \\(b^2\\), then p divides b, but \\(p^2\\) need not divide b: 3 divides \\(3^2\\), yet 9 does not divide 3.",
        },
      ],
    },
  ],
};
