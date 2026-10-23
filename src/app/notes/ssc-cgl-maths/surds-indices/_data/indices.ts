import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_INDICES_NOTE: SubtopicNote = {
  subtopicName: "Indices and Square Roots",
  title: "Indices and Square Roots",
  oneLineDefinition:
    "The laws of indices count repeated factors; the square root of a perfect square is found from its last digit and the nearest square of a round number; a root inside a root is opened from the inside.",
  whyItMatters:
    "Twelve questions in the bank, all EASY, and ten of them come from the 2025 shifts. Six are square roots, three of them of four-digit perfect squares that must be found in seconds, so the last-digit method on this page is worth practising until it is automatic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsiin-laws",
      name: "The laws of indices",
      intuition:
        "A power is repeated multiplication: \\(a^3 = a \\times a \\times a\\). Every law of indices is just a way of counting how many factors of \\(a\\) there are.",
      definition:
        "- Same base, multiply: **add** the indices. Same base, divide: **subtract** them. A power of a power: **multiply** them.\n" +
        "- \\(a^0 = 1\\) for any \\(a \\ne 0\\), and \\(a^{-n} = \\frac{1}{a^n}\\).\n" +
        "- \\((ab)^n = a^n b^n\\), and \\(a^{1/2} = \\sqrt{a}\\).\n" +
        "- **Take out the common power:** \\(3^{x + 2} - 3^x = 3^x(3^2 - 1) = 8 \\times 3^x\\). When every term above and below carries the same \\(a^x\\), it cancels.\n" +
        "- **Fast route:** if the answer cannot depend on the letter (the options are plain numbers), put the letter equal to 0 and work with ordinary numbers.\n" +
        "- **Powers of ten:** \\(0.00052 = 5.2 \\times 10^{-4}\\). Move the point and count the places.",
      formula: {
        label: "Laws of indices",
        latex: "a^m a^n = a^{m+n} \\qquad \\frac{a^m}{a^n} = a^{m-n} \\qquad (a^m)^n = a^{mn} \\qquad a^0 = 1 \\qquad a^{-n} = \\frac{1}{a^n}",
        symbols: [
          { symbol: "a", meaning: "the base, not zero" },
          { symbol: "m, n", meaning: "the indices (powers)" },
        ],
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{2^{n + 5} - 3 \\times 2^{n + 2}}{5 \\times 2^{n} - 2^{n}}\\).",
        steps: [
          "Take \\(2^n\\) out of the top: \\(2^n(2^5 - 3 \\times 2^2) = 2^n(32 - 12) = 20 \\times 2^n\\).",
          "Take \\(2^n\\) out of the bottom: \\(2^n(5 - 1) = 4 \\times 2^n\\).",
          "The \\(2^n\\) cancels: \\(\\frac{20}{4} = 5\\).",
          "Fast route check with \\(n = 0\\): \\(\\frac{32 - 12}{5 - 1} = 5\\).",
        ],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\frac{9^{3} \\times 27^{2}}{3^{10}}\\).",
        steps: [
          "Write every base as a power of 3: \\(9^3 = 3^6\\) and \\(27^2 = 3^6\\).",
          "\\(\\frac{3^{12}}{3^{10}} = 3^2 = 9\\).",
        ],
        answer: "9",
      },
      practiceSet: [
        { prompt: "What is \\(5^{-2}\\)?", answer: "\\(\\frac{1}{25}\\)" },
        { prompt: "What is \\((2^3)^2 \\div 2^4\\)?", answer: "4", method: "\\(2^6 \\div 2^4 = 2^2\\)." },
        { prompt: "What is \\(16^{1/2} \\times 8^{0}\\)?", answer: "4" },
        { prompt: "Write 0.00036 in the form \\(a \\times 10^{n}\\) with \\(1 \\le a < 10\\).", answer: "\\(3.6 \\times 10^{-4}\\)" },
      ],
      pyqExampleId: "60b85f1d-2f64-4946-ad53-5e85b7313993",
      traps: [
        {
          title: "Adding indices for different bases",
          body:
            "\\(2^3 \\times 3^2\\) is \\(8 \\times 9 = 72\\), not \\(6^5\\). The add-the-indices law works only when the bases are the same.",
        },
        {
          title: "Multiplying indices in a product",
          body:
            "\\(a^3 \\times a^4 = a^7\\), not \\(a^{12}\\). Indices multiply only for a power of a power: \\((a^3)^4 = a^{12}\\).",
        },
        {
          title: "Reading a zero index as zero",
          body: "\\(7^0 = 1\\), not 0. Any non-zero number to the power 0 is 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsiin-roots",
      name: "Square roots of perfect squares",
      intuition:
        "SSC prints four-digit perfect squares and expects the root at once. The last digit narrows the root to two choices, and the square of the number ending in 5 between them picks the right one.",
      definition:
        "- **Last digit of the square gives the last digit of the root:** 1 gives 1 or 9; 4 gives 2 or 8; 9 gives 3 or 7; 6 gives 4 or 6; 5 gives 5; 0 gives 0.\n" +
        "- **Tens digit of the root:** cover the last two digits of the square and find the largest square at or below what is left. For 3969, 39 lies between \\(6^2 = 36\\) and \\(7^2 = 49\\), so the root is in the sixties.\n" +
        "- **Choose between the two:** compare with the square of the number ending in 5. 3969 ends in 9, so the root is 63 or 67; \\(65^2 = 4225\\), and 3969 is less, so the root is the smaller choice, 63.\n" +
        "- **A number ending in 5:** if \\(n\\) is its tens part, its square is \\(n(n + 1)\\) followed by 25. So \\(65^2 = 4225\\), since \\(6 \\times 7 = 42\\).\n" +
        "- Inside a root, finish the BODMAS first: \\(\\sqrt{3 \\times 12} = \\sqrt{36} = 6\\).",
      formula: {
        label: "Square of a number ending in 5",
        latex: "(10n + 5)^2 = 100\\,n(n + 1) + 25",
        symbols: [{ symbol: "n", meaning: "the tens part of the number" }],
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{3364}\\).",
        steps: [
          "The square ends in 4, so the root ends in 2 or 8.",
          "Cover the last two digits: 33 lies between \\(5^2 = 25\\) and \\(6^2 = 36\\), so the root is 52 or 58.",
          "\\(55^2 = 3025\\), and 3364 is more, so the root is 58.",
          "Check: \\(58^2 = 3600 - 240 + 4 = 3364\\).",
        ],
        answer: "58",
      },
      selfCheckExample: {
        prompt: "Find \\(\\left(\\sqrt{9409} - \\sqrt{2209}\\right) \\div 10\\).",
        steps: [
          "9409 ends in 9, so the root ends in 3 or 7; 94 lies between 81 and 100, and \\(95^2 = 9025 < 9409\\), so \\(\\sqrt{9409} = 97\\).",
          "2209 ends in 9; 22 lies between 16 and 25, and \\(45^2 = 2025 < 2209\\), so \\(\\sqrt{2209} = 47\\).",
          "\\((97 - 47) \\div 10 = 5\\).",
        ],
        answer: "5",
      },
      practiceSet: [
        { prompt: "What is \\(45^2\\)?", answer: "2025", method: "\\(4 \\times 5 = 20\\), then 25." },
        { prompt: "What is \\(\\sqrt{1764}\\)?", answer: "42" },
        { prompt: "What is \\(\\sqrt{5329}\\)?", answer: "73" },
        { prompt: "What is \\(\\sqrt{8 \\times 18}\\)?", answer: "12", method: "\\(\\sqrt{144} = 12\\)." },
      ],
      pyqExampleId: "551ead94-7eab-4af5-9067-19b9122b8a73",
      traps: [
        {
          title: "Trusting the last digit alone",
          body:
            "A square ending in 6 can have a root ending in 4 or 6: \\(\\sqrt{1296} = 36\\) but \\(\\sqrt{1156} = 34\\). Compare with \\(35^2 = 1225\\) to choose.",
        },
        {
          title: "Taking the root of each term",
          body:
            "\\(\\sqrt{64 + 36}\\) is \\(\\sqrt{100} = 10\\), not \\(8 + 6 = 14\\). The root of a sum is not the sum of the roots.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsiin-nested",
      name: "Nested square roots",
      intuition:
        "A root inside a root is opened from the inside, like brackets. When the roots go on for ever, the whole expression equals one of its own parts, and that gives a simple equation.",
      definition:
        "- **Finite:** start at the innermost root. In SSC questions each result makes the next number a perfect square.\n" +
        "- **Infinite:** if \\(x = \\sqrt{a + \\sqrt{a + \\cdots}}\\), the part under the first root is \\(a + x\\), so \\(x = \\sqrt{a + x}\\) and \\(x^2 - x - a = 0\\). Keep the positive root.\n" +
        "- **Fast route:** write \\(a\\) as a product of two consecutive numbers, \\(n(n - 1)\\). Then \\(\\sqrt{a + \\sqrt{a + \\cdots}} = n\\), and with minus signs \\(\\sqrt{a - \\sqrt{a - \\cdots}} = n - 1\\). For 20 = 5 × 4 the values are 5 and 4.\n" +
        "- The fast route is safe only when \\(a\\) really is such a product. Otherwise solve the quadratic.",
      formula: {
        label: "Infinite nested roots",
        latex: "\\sqrt{n(n - 1) + \\sqrt{n(n - 1) + \\cdots}} = n \\qquad \\sqrt{n(n - 1) - \\sqrt{n(n - 1) - \\cdots}} = n - 1",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{30 + \\sqrt{30 + \\sqrt{30 + \\cdots}}}\\).",
        steps: [
          "Let the value be \\(x\\). Then \\(x = \\sqrt{30 + x}\\), so \\(x^2 - x - 30 = 0\\).",
          "\\((x - 6)(x + 5) = 0\\). A square root is not negative, so \\(x = 6\\).",
          "Fast route: \\(30 = 6 \\times 5\\), two consecutive numbers, so the value is the larger, 6.",
        ],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{185 + \\sqrt{112 + \\sqrt{81}}}\\).",
        steps: [
          "Innermost: \\(\\sqrt{81} = 9\\).",
          "\\(112 + 9 = 121\\), and \\(\\sqrt{121} = 11\\).",
          "\\(185 + 11 = 196\\), and \\(\\sqrt{196} = 14\\).",
        ],
        answer: "14",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{56 + \\sqrt{56 + \\sqrt{56 + \\cdots}}}\\).", answer: "8", method: "\\(56 = 8 \\times 7\\)." },
        { prompt: "Find \\(\\sqrt{42 - \\sqrt{42 - \\sqrt{42 - \\cdots}}}\\).", answer: "6", method: "\\(42 = 7 \\times 6\\); with minus signs the value is the smaller number." },
        { prompt: "Find \\(\\sqrt{20 + \\sqrt{25}}\\).", answer: "5" },
        { prompt: "Find \\(\\sqrt{2 + \\sqrt{2 + \\sqrt{2 + \\cdots}}}\\).", answer: "2", method: "\\(2 = 2 \\times 1\\)." },
      ],
      pyqExampleId: "053ba4cd-2b5a-4ca9-b383-c15304936974",
      traps: [
        {
          title: "Keeping the negative root",
          body:
            "\\(x^2 - x - 20 = 0\\) gives \\(x = 5\\) or \\(x = -4\\). A square root is never negative, so \\(\\sqrt{20 + \\sqrt{20 + \\cdots}} = 5\\).",
        },
        {
          title: "Using the shortcut on the wrong number",
          body:
            "\\(\\sqrt{10 + \\sqrt{10 + \\cdots}}\\) is not a whole number, because 10 is not a product of two consecutive numbers. Solving \\(x^2 - x - 10 = 0\\) gives \\(x = \\frac{1 + \\sqrt{41}}{2}\\), about 3.7.",
        },
      ],
    },
  ],
};
