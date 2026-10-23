import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_NS_DIGITS_NOTE: SubtopicNote = {
  subtopicName: "Missing Digits",
  title: "Missing Digits",
  oneLineDefinition:
    "A hidden digit is found by writing the divisibility test as a condition on the unknown and keeping only the digits 0 to 9 that meet it.",
  whyItMatters:
    "Nineteen questions in the bank, fifteen EASY and four MODERATE, fifteen of them from the 2024 shifts. The unknown is a single digit, so the test leaves at most a handful of values, and the word 'least' or 'greatest' in the stem picks one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscnsdg-sum",
      name: "A missing digit from a digit-sum test",
      intuition:
        "For 3 and 9 only the digit sum matters. Add the digits you can see, and the hidden digit must top that sum up to the next multiple of 3 or 9.",
      definition:
        "- Add the known digits; call it \\(S\\). The digit \\(x\\) must make \\(S + x\\) a multiple of 9 (or of 3), with \\(0 \\le x \\le 9\\).\n" +
        "- **For 9** there is one answer, except when \\(S\\) is already a multiple of 9: then \\(x\\) is 0 or 9.\n" +
        "- **For 3** there are three or four answers, 3 apart (for example 1, 4, 7). The stem's 'least' or 'greatest' decides.\n" +
        "- **For 6, 18 or 36** combine two tests: 6 is even and 3, 18 is even and 9, 36 is 4 and 9. Run the last-digit test first; it often fixes the digit or its parity.\n" +
        "- **Two unknowns** \\(x\\) and \\(y\\): the digit sum gives \\(x + y\\) as one of two values 9 apart. A second condition picks one: \\(x + y\\) and \\(x - y\\) are always both even or both odd.\n" +
        "- The same letter in two places is the same digit. A digit can never be 10 or more, and the first digit of a number is never 0.",
      formula: {
        label: "Hidden digit from a digit sum",
        latex: "S + x = 9k \\ (\\text{or } 3k), \\quad 0 \\le x \\le 9",
        symbols: [
          { symbol: "S", meaning: "the sum of the digits you can see" },
          { symbol: "x", meaning: "the hidden digit" },
        ],
      },
      authoredExample: {
        prompt: "Find the digit k so that 5k4632 is divisible by 9. What is the least k that makes it divisible by 3?",
        steps: [
          "Known digits: \\(S = 5 + 4 + 6 + 3 + 2 = 20\\).",
          "For 9: the next multiple of 9 is 27, so \\(k = 7\\). (\\(k = 16\\) is not a digit.)",
          "For 3: \\(20 + k\\) must be 21, 24, 27 or 30, so \\(k\\) is 1, 4, 7 or 10. Digits only: 1, 4 or 7. The least is 1.",
        ],
        answer: "k = 7 for 9; k = 1 for 3",
      },
      selfCheckExample: {
        prompt: "What is the greatest digit p for which 82p416 is divisible by 6?",
        steps: [
          "It ends in 6, so it is even whatever p is.",
          "For 3: \\(8 + 2 + 4 + 1 + 6 = 21\\), so \\(21 + p\\) is a multiple of 3 when p is 0, 3, 6 or 9.",
          "The greatest is 9.",
        ],
        answer: "9",
      },
      practiceSet: [
        { prompt: "Find the digit a so that 47a5 is divisible by 9.", answer: "2", method: "\\(4 + 7 + 5 = 16\\), and the next multiple of 9 is 18." },
        { prompt: "What is the least digit d for which 6d152 is divisible by 3?", answer: "1", method: "\\(6 + 1 + 5 + 2 = 14\\), and \\(14 + 1 = 15\\)." },
        {
          prompt: "The 5-digit number 4x73y is divisible by 9, and x + y is more than 9. Find x + y.",
          answer: "13",
          method: "\\(4 + 7 + 3 = 14\\), so \\(x + y\\) is 4 or 13.",
        },
        { prompt: "Which digit z makes 235z4 divisible by 18?", answer: "4", method: "It ends in 4, so it is even. For 9: \\(2 + 3 + 5 + 4 = 14\\), so \\(z = 4\\)." },
      ],
      pyqExampleId: "6df34605-eb50-4f39-bb66-3c402ce980fb",
      traps: [
        {
          title: "Accepting a value that is not a digit",
          body: "Options sometimes include 10 or 12. A missing digit lies between 0 and 9, so throw those out before testing anything.",
        },
        {
          title: "Missing the second answer for 9",
          body: "If the visible digits already add to a multiple of 9, the hidden digit can be 0 or 9. Read whether the stem wants the least or the greatest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsdg-tail",
      name: "A missing digit from a last-digits test",
      intuition:
        "For 4, 5 and 8 only the tail of the number matters, so the hidden digit is found by trying the ten possible tails. A small fact about the hundreds digit cuts the trying down for 8.",
      definition:
        "- **5 and 8 together** force a last digit of 0: 5 needs 0 or 5, and a multiple of 8 is even.\n" +
        "- **8:** the last three digits \\(\\overline{abc}\\) must be a multiple of 8. Since 200 is a multiple of 8 and 100 leaves 4, look at the hundreds digit \\(a\\): if \\(a\\) is even, \\(\\overline{bc}\\) must be a multiple of 8; if \\(a\\) is odd, \\(\\overline{bc} + 4\\) must be.\n" +
        "- **4:** the last two digits \\(\\overline{bc}\\) must be a multiple of 4, which happens exactly when \\(2b + c\\) is a multiple of 4.\n" +
        "- **40** is \\(8 \\times 5\\): the number ends in 0, and then the 8 test runs on the last three digits.\n" +
        "- To **count** numbers of a pattern, fix one digit at a time and list the others that pass.",
      formula: {
        label: "Last-digit tests for 8 and 4",
        latex:
          "\\overline{abc} \\text{ is a multiple of } 8: \\ a \\text{ even} \\Rightarrow 8 \\text{ divides } \\overline{bc}; \\ a \\text{ odd} \\Rightarrow 8 \\text{ divides } \\overline{bc} + 4 \\qquad 4 \\text{ divides } \\overline{bc} \\text{ exactly when } 4 \\text{ divides } 2b + c",
        symbols: [
          { symbol: "\\(\\overline{abc}\\)", meaning: "the last three digits, with a in the hundreds place" },
          { symbol: "\\(\\overline{bc}\\)", meaning: "the last two digits read as a two-digit number" },
        ],
      },
      authoredExample: {
        prompt: "Find the smallest digit q for which 591q6 is divisible by 8.",
        steps: [
          "The last three digits are 1, q, 6. The hundreds digit 1 is odd, so \\(\\overline{q6} + 4\\) must be a multiple of 8.",
          "\\(\\overline{q6} + 4\\) runs through 10, 20, 30, 40, ..., 100. The multiples of 8 among them are 40 and 80, so \\(\\overline{q6}\\) is 36 or 76 and q is 3 or 7.",
          "The smallest is 3. Check: \\(136 = 8 \\times 17\\).",
        ],
        answer: "3",
      },
      selfCheckExample: {
        prompt: "The number 527a0 is divisible by both 5 and 8. Which digits can a be?",
        steps: [
          "It ends in 0, so 5 is satisfied. For 8, the tail is 7, a, 0.",
          "The hundreds digit 7 is odd, so \\(\\overline{a0} + 4\\) must be a multiple of 8: \\(20 + 4 = 24\\) and \\(60 + 4 = 64\\) work.",
          "Check: \\(720 = 8 \\times 90\\) and \\(760 = 8 \\times 95\\).",
        ],
        answer: "2 or 6",
      },
      practiceSet: [
        { prompt: "Which digit c makes 413c divisible by 8?", answer: "6", method: "Hundreds digit 1 is odd, so \\(\\overline{3c} + 4\\) must be a multiple of 8: \\(36 + 4 = 40\\)." },
        { prompt: "Is 2516 divisible by 8?", answer: "No", method: "Hundreds digit 5 is odd, and \\(16 + 4 = 20\\) is not a multiple of 8." },
        { prompt: "Which digits m make 358m divisible by 4?", answer: "0, 4 or 8", method: "\\(2 \\times 8 + m = 16 + m\\) must be a multiple of 4." },
        { prompt: "How many two-digit numbers whose tens digit is 3 are divisible by 4?", answer: "2", method: "\\(2 \\times 3 + c = 6 + c\\) is a multiple of 4 for \\(c = 2\\) and \\(c = 6\\): 32 and 36." },
      ],
      pyqExampleId: "a1c619e0-262e-4809-828e-ac0e7825c4f5",
      traps: [
        {
          title: "Letting a multiple of 8 and 5 end in 5",
          body: "A number ending in 5 is odd, and no odd number is a multiple of 8. Divisible by both 5 and 8 means the last digit is 0.",
        },
        {
          title: "Running the 8 test on two digits",
          body: "The tail for 8 is three digits long. 136 and 236 share the last two digits 36, but only 136 is a multiple of 8; the hundreds digit decides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsdg-eleven",
      name: "A missing digit from the test for 11",
      intuition:
        "Write the alternating difference with the unknown digit in it. Since the digit is only 0 to 9, the difference can reach just one or two multiples of 11, and each gives one value.",
      definition:
        "- Count places from the right. Put the hidden digit in the odd-place sum or the even-place sum, wherever it sits.\n" +
        "- Write \\(D\\) = (odd-place sum) \\(-\\) (even-place sum) in terms of the digit, then set \\(D\\) equal to 0, 11 or \\(-11\\).\n" +
        "- Keep only the value from 0 to 9. When the known part of \\(D\\) is large, the answer comes from \\(D = 11\\) or \\(D = -11\\), not from 0.",
      authoredExample: {
        prompt: "Find the digit t so that 52t817 is divisible by 11.",
        steps: [
          "From the right the digits are 7, 1, 8, t, 2, 5.",
          "Odd places: \\(7 + 8 + 2 = 17\\). Even places: \\(1 + t + 5 = 6 + t\\).",
          "\\(D = 17 - (6 + t) = 11 - t\\). This is 0 for \\(t = 11\\) (not a digit) and 11 for \\(t = 0\\).",
          "Check: \\(520817 = 11 \\times 47347\\).",
        ],
        answer: "0",
      },
      selfCheckExample: {
        prompt: "If 38k46 is divisible by 11, find the digit k.",
        steps: [
          "From the right: 6, 4, k, 8, 3. Odd places \\(6 + k + 3 = 9 + k\\); even places \\(4 + 8 = 12\\).",
          "\\(D = k - 3 = 0\\), so \\(k = 3\\).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Find the digit x if 72x5 is divisible by 11.", answer: "0", method: "\\((5 + 2) - (x + 7) = -x\\), so \\(x = 0\\)." },
        { prompt: "Find the digit y if 4y61 is divisible by 11.", answer: "9", method: "\\((1 + y) - (6 + 4) = y - 9\\), so \\(y = 9\\)." },
        { prompt: "Find the digit w if 1w342 is divisible by 11.", answer: "2", method: "\\((2 + 3 + 1) - (4 + w) = 2 - w\\), so \\(w = 2\\)." },
        { prompt: "Find the digit q if 81q9 is divisible by 11.", answer: "2", method: "\\((9 + 1) - (q + 8) = 2 - q\\), so \\(q = 2\\)." },
      ],
      pyqExampleId: "7470757c-64ba-4f78-9a29-b35437dbfa8a",
      traps: [
        {
          title: "Setting the difference to 0 and stopping",
          body: "If \\(D = 0\\) needs a digit of 10 or more, try \\(D = 11\\) and \\(D = -11\\). A digit that makes the difference 11 is just as valid.",
        },
      ],
    },
  ],
};
