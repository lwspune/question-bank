import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_NS_PRIMES_NOTE: SubtopicNote = {
  subtopicName: "Primes, Remainders and Digits",
  title: "Primes, Remainders and Digits",
  oneLineDefinition:
    "Primes are counted and combined by parity, remainders follow the arithmetic of the numbers, unit digits of powers repeat in short cycles, and a two-digit number and its reverse differ by nine times the gap between the digits.",
  whyItMatters:
    "9 questions in the Tier II bank, 5 EASY and 4 MODERATE. Each uses one short fact, such as 2 being the only even prime or the four-step cycle of unit digits.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2nspr-primes",
      name: "Primes, squares and cubes",
      intuition:
        "A prime has exactly two divisors. Every prime after 2 is odd, so if a sum of primes has the wrong parity for odd numbers alone, one of them must be 2.",
      definition:
        "- The primes between 50 and 100: 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.\n" +
        "- 2 is the only even prime, so three odd primes always add to an odd number.\n" +
        "- To count composites in a range, count all the numbers and subtract the primes (1 is neither prime nor composite).\n" +
        "- Whole numbers N with \\(a < \\sqrt[3]{N} < b\\) run from \\(a^3 + 1\\) to \\(b^3 - 1\\).\n" +
        "- \\(a^2 - b^2 = (a - b)(a + b)\\) shortens fractions built from squares.",
      formula: {
        label: "Difference of squares",
        latex: "a^2 - b^2 = (a - b)(a + b)",
      },
      authoredExample: {
        prompt: "Three different primes add up to 50. The largest is 31. Find the other two.",
        steps: ["Three odd primes would add to an odd number, so one of them is 2.", "\\(2 + x + 31 = 50\\) gives \\(x = 17\\), which is prime."],
        answer: "2 and 17",
      },
      selfCheckExample: {
        prompt: "How many composite numbers are there from 41 to 60?",
        steps: ["There are 20 numbers; the primes among them are 41, 43, 47, 53 and 59.", "Composites \\(= 20 - 5 = 15\\)."],
        answer: "15",
      },
      practiceSet: [
        { prompt: "How many whole numbers N satisfy \\(4 < \\sqrt{N} < 5\\)?", answer: "8", method: "17 to 24." },
        { prompt: "Is 91 a prime?", answer: "No: \\(7 \\times 13\\)" },
        { prompt: "Find \\((47^2 - 13^2) \\div 34\\).", answer: "60" },
      ],
      pyqExampleId: "4752180d-3ae5-4ef1-955d-58a261d588dc",
      traps: [
        {
          title: "Counting 1 as prime or composite",
          body: "1 has only one divisor, so it is neither prime nor composite. Leave it out of both counts.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2nspr-remainders",
      name: "Remainders and unit digits",
      visualizationSlug: "cds-unit-digit-cycle-wheel",
      intuition:
        "Remainders follow the arithmetic: add, subtract and multiply the remainders instead of the numbers. Unit digits of powers repeat in short cycles, at most four long.",
      definition:
        "- If x and y leave remainders a and b on division by n, then \\(px + qy\\) leaves the same remainder as \\(pa + qb\\).\n" +
        "- Dividend \\(=\\) divisor \\(\\times\\) quotient \\(+\\) remainder, with the remainder smaller than the divisor.\n" +
        "- Unit-digit cycles: 2: 2, 4, 8, 6. 3: 3, 9, 7, 1. 7: 7, 9, 3, 1. 8: 8, 4, 2, 6. 4: 4, 6. 9: 9, 1. The digits 0, 1, 5 and 6 never change.\n" +
        "- For a power, divide the index by 4 and use the remainder; a remainder of 0 means the fourth term of the cycle.",
      formula: {
        label: "Division",
        latex: "\\text{dividend} = \\text{divisor} \\times \\text{quotient} + \\text{remainder}",
      },
      authoredExample: {
        prompt: "Find the unit digit of \\(27^{103} \\times 58^{62}\\).",
        steps: ["\\(103 = 4 \\times 25 + 3\\), so \\(7^{103}\\) ends like \\(7^3\\): 3.", "\\(62 = 4 \\times 15 + 2\\), so \\(8^{62}\\) ends like \\(8^2\\): 4.", "\\(3 \\times 4 = 12\\): the unit digit is 2."],
        answer: "2",
      },
      selfCheckExample: {
        prompt: "x leaves remainder 5 and y leaves remainder 9 when divided by 13. Find the remainder when \\(3x + 2y\\) is divided by 13.",
        steps: ["\\(3 \\times 5 + 2 \\times 9 = 33\\).", "\\(33 = 2 \\times 13 + 7\\): the remainder is 7."],
        answer: "7",
      },
      practiceSet: [
        { prompt: "Find the unit digit of \\(3^{65}\\).", answer: "3" },
        { prompt: "A number divided by 15 gives quotient 8 and remainder 7. Find the number.", answer: "127" },
        { prompt: "Find the unit digit of \\(4^{21} + 9^{20}\\).", answer: "5" },
      ],
      pyqExampleId: "ed4c1f07-d7e5-47bc-acc3-6c94a415ade4",
      traps: [
        {
          title: "Reading a remainder of 0 as the start of the cycle",
          body: "When the index divides exactly by 4, use the FOURTH digit of the cycle: \\(2^8\\) ends in 6, not 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2nspr-digits",
      name: "Place value and digit counting",
      intuition:
        "A two-digit number with digits a and b is 10a + b, and its reverse is 10b + a. Their difference is always nine times the gap between the digits, and their sum eleven times the digit sum.",
      definition:
        "- Two-digit number: \\(10a + b\\); with its digits reversed: \\(10b + a\\).\n" +
        "- Difference \\(= 9(a - b)\\); sum \\(= 11(a + b)\\).\n" +
        "- To count numbers in a range that meet a digit condition, split the range by its leading digit and count each block, taking care not to count any number twice.",
      formula: {
        label: "A number and its reverse",
        latex: "(10a + b) - (10b + a) = 9(a - b)",
      },
      authoredExample: {
        prompt: "A two-digit number is 27 more than the number with its digits reversed, and its digits add up to 11. Find the number.",
        steps: ["\\(9(a - b) = 27\\), so \\(a - b = 3\\); and \\(a + b = 11\\).", "\\(a = 7\\), \\(b = 4\\): the number is 74."],
        answer: "74",
      },
      selfCheckExample: {
        prompt: "How many numbers from 100 to 199 contain the digit 7 at least once?",
        steps: ["170 to 179 give 10 numbers.", "Elsewhere a 7 in the units place gives 107, 117, ..., 197 without 177: 9 more. Total 19."],
        answer: "19",
      },
      practiceSet: [
        { prompt: "A two-digit number and its reverse add up to 99. What is the sum of its digits?", answer: "9" },
        { prompt: "A two-digit number falls by 45 when its digits are reversed. Find the difference of its digits.", answer: "5" },
        { prompt: "How many two-digit numbers have digits that add up to 5?", answer: "5", method: "14, 23, 32, 41, 50." },
      ],
      pyqExampleId: "cc50690c-0a37-46a0-a1fa-15c08f9763ca",
      traps: [
        {
          title: "Counting a number twice",
          body: "When counting numbers with a 7, 177 has a 7 in two places. Count it once, or the total comes out one too many.",
        },
      ],
    },
  ],
};
