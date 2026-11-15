import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_NS_DIVISIBILITY_NOTE: SubtopicNote = {
  subtopicName: "Divisibility Tests",
  title: "Divisibility Tests",
  oneLineDefinition:
    "Each small divisor has a quick test on the last digits or a sum of digits; tests for co-prime factors combine for bigger divisors like 24 and 72, and the same tests fill in a missing digit.",
  whyItMatters:
    "11 questions in the Tier II bank, 8 EASY and 3 MODERATE: the largest page of the chapter. The MODERATE ones have two blank digits, which two tests in a row pin down.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2nsdv-rules",
      name: "Divisibility rules",
      intuition:
        "Each small divisor has a quick test that looks at only part of the number: the last digit, the last two or three digits, or a sum of digits. A test for a bigger divisor combines the tests for its co-prime factors.",
      definition:
        "- 2, 5 and 10: the last digit. 4: the last two digits. 8: the last three digits.\n" +
        "- 3 and 9: the sum of all the digits.\n" +
        "- 11: the sums of alternate digits differ by 0 or a multiple of 11.\n" +
        "- 7: no handy rule; divide, or find the nearest multiple of 7.\n" +
        "- Combine factors that share no common factor: \\(24 = 8 \\times 3\\), \\(72 = 8 \\times 9\\), \\(36 = 4 \\times 9\\), \\(231 = 3 \\times 7 \\times 11\\). \\(24 = 4 \\times 6\\) does NOT work, because 4 and 6 share a 2.",
      formula: {
        label: "Combining two tests",
        latex: "a \\mid N,\\; b \\mid N,\\; \\gcd(a, b) = 1 \\;\\Rightarrow\\; ab \\mid N",
      },
      authoredExample: {
        prompt: "Is 735264 divisible by 24?",
        steps: ["For 8: the last three digits 264 \\(= 8 \\times 33\\), so yes.", "For 3: the digit sum \\(7 + 3 + 5 + 2 + 6 + 4 = 27\\), so yes.", "8 and 3 share no factor, so the number is divisible by 24."],
        answer: "Yes",
      },
      selfCheckExample: {
        prompt: "Which of 4867, 5269 and 6084 is divisible by 11?",
        steps: ["4867: \\((7 + 8) - (6 + 4) = 5\\); 6084: \\((4 + 0) - (8 + 6) = -10\\).", "5269: \\((9 + 2) - (6 + 5) = 0\\), so 5269 is divisible by 11."],
        answer: "5269",
      },
      practiceSet: [
        { prompt: "Is 39468 divisible by 4?", answer: "Yes", method: "68 is divisible by 4." },
        { prompt: "Is 748296 divisible by 8?", answer: "Yes", method: "\\(296 = 8 \\times 37\\)" },
        { prompt: "Is 918273 divisible by 9?", answer: "No", method: "Its digit sum is 30." },
      ],
      pyqExampleId: "45932966-47fb-4d7b-9230-dd5016068f4e",
      traps: [
        {
          title: "Combining factors that share a factor",
          body: "A number divisible by both 4 and 6 need not be divisible by 24: 12 is divisible by both. Use 8 and 3, which share nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2nsdv-missing",
      name: "Finding a missing digit",
      intuition:
        "When a number with one or two blank digits must be divisible by something, apply its tests one at a time. The last-digits test usually fixes one blank, and the digit-sum test then fixes the other.",
      definition:
        "- Start with the test that uses the fewest digits (for 8, the last three) to pin down the last blank.\n" +
        "- Then use the digit-sum test (3 or 9) or the alternate-sum test (11) for the remaining blank.\n" +
        "- Each blank is a single digit from 0 to 9: list every choice the tests allow before picking the one the question asks for (the greatest, a product, and so on).\n" +
        "- For a product such as \\(3 \\times 7 \\times 11 = 231\\), look for a multiple of 231 in the right range.",
      formula: {
        label: "The two tests that fix most blanks",
        latex: "8 \\mid \\text{last three digits}, \\quad 9 \\mid \\text{sum of the digits}",
      },
      authoredExample: {
        prompt: "The number 5k2716 is divisible by 9. Find the digit k.",
        steps: ["Digit sum \\(= 5 + k + 2 + 7 + 1 + 6 = 21 + k\\).", "The next multiple of 9 is 27, so \\(k = 6\\)."],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "The number 3a64b is divisible by 72. Find every possible pair of digits a and b.",
        steps: [
          "For 8: 64b is a multiple of 8 only for 640 and 648, so b is 0 or 8.",
          "For 9: the digit sum is \\(13 + a + b\\). With \\(b = 0\\), \\(a = 5\\); with \\(b = 8\\), \\(a = 6\\).",
        ],
        answer: "\\(a = 5, b = 0\\) or \\(a = 6, b = 8\\)",
      },
      practiceSet: [
        { prompt: "82x4 is divisible by both 4 and 3. Find the digit x.", answer: "4" },
        { prompt: "6y35 is divisible by 11. Find the digit y.", answer: "4" },
        { prompt: "What is the smallest digit that can fill the blank in 41_52 to make it divisible by 3?", answer: "0" },
      ],
      pyqExampleId: "8cc8cf59-8398-43cd-aeb1-1ddbe7962bea",
      traps: [
        {
          title: "Stopping at the first digit that works",
          body: "Two tests can each allow several digits. When the question asks for the greatest value or a product, list every pair the tests allow, then choose.",
        },
      ],
    },
  ],
};
