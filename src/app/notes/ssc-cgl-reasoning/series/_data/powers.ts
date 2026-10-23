import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Squares, Cubes and Primes",
  title: "Squares, Cubes and Primes",
  oneLineDefinition:
    "Some series are a list you already know: squares, cubes, one more or one less than them, the primes or the factorials. Recognising the list is faster than working out any difference.",
  whyItMatters:
    "Twenty-seven questions in the bank, 22 of them from the 2025 shifts: 23 EASY and four MODERATE. Ten are plain squares, cubes or powers, twelve are one step away from a square or cube (such as one more than a square, or n times n + 1), and five are primes, factorials or the sum of odd numbers. Knowing the squares to 30 and the cubes to 15 turns each into a few seconds of work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsepw-pure",
      name: "Squares, cubes and powers",
      intuition:
        "If every term is a number you recognise as a square or a cube, the series is that list. The only work is to see which numbers are being squared or cubed: all of them, only the even ones, the odd ones, the primes, or multiples of 11.",
      definition:
        "- **Squares 11 to 30:** 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900.\n" +
        "- **Cubes 1 to 15:** 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375.\n" +
        "- **Which numbers are powered:** 16, 36, 64 are the squares of 4, 6, 8 (even); 1, 27, 125 are the cubes of 1, 3, 5 (odd); 4, 9, 25, 49 are squares of the primes.\n" +
        "- **Powers of their own place:** 1, 4, 27, 256 are \\(1^1, 2^2, 3^3, 4^4\\), so next is \\(5^5 = 3125\\).\n" +
        "- **Squares and cubes woven together:** check the odd places and the even places on their own.",
      authoredExample: {
        prompt: "Find the next term: 121, 169, 289, 361, ?",
        steps: [
          "All are squares: \\(11^2, 13^2, 17^2, 19^2\\).",
          "11, 13, 17, 19 are primes in order, so the next is 23.",
          "\\(23^2 = 529\\).",
        ],
        answer: "529",
      },
      selfCheckExample: {
        prompt: "Find the next term: 8, 64, 216, 512, ?",
        steps: [
          "These are \\(2^3, 4^3, 6^3, 8^3\\), the cubes of even numbers.",
          "Next is \\(10^3 = 1000\\).",
        ],
        answer: "1000",
      },
      practiceSet: [
        { prompt: "Find the next term: 144, 169, 196, 225, ?", answer: "256", method: "\\(12^2\\) to \\(15^2\\), then \\(16^2\\)." },
        { prompt: "Find the missing term: 27, 64, ?, 216, 343", answer: "125", method: "Cubes of 3 to 7." },
        { prompt: "Find the next term: 4, 16, 36, 64, ?", answer: "100", method: "Squares of 2, 4, 6, 8, then 10." },
        { prompt: "Find the next term: 1, 8, 9, 64, 25, ?", answer: "216", method: "Odd places are \\(1^2, 3^2, 5^2\\); even places \\(2^3, 4^3\\), so next is \\(6^3\\)." },
      ],
      pyqExampleId: "b3e7331c-ff8d-4bec-b7cc-d05ebe06b663",
      traps: [
        {
          title: "Calling the list too early",
          body:
            "64 is both \\(8^2\\) and \\(4^3\\), and 729 is both \\(27^2\\) and \\(9^3\\). Read the neighbouring terms to decide whether the series is squares or cubes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsepw-near",
      name: "One step away from a square or a cube",
      intuition:
        "Terms like 3, 8, 15, 24 are just short of squares, and 2, 6, 12, 20 sit between them. Add or take away 1 from a few terms, or try n times n + 1, and the hidden square or product appears.",
      definition:
        "- **Square plus 1:** 2, 5, 10, 17, 26, 37, 50, 65. **Square minus 1:** 0, 3, 8, 15, 24, 35, 48.\n" +
        "- **Cube plus 1:** 2, 9, 28, 65, 126. **Cube minus 1:** 0, 7, 26, 63, 124.\n" +
        "- **n times n + 1:** 2, 6, 12, 20, 30, 42, 56. Using only odd n gives 2, 12, 30, 56, 90.\n" +
        "- **Other mixes in the bank:** \\(n^3 + n^2\\) (2, 12, 36, 80), \\(n^3 - n\\) (0, 6, 24, 60), and \\(n^2 + 1\\) and \\(n^2 - 1\\) taking turns (2, 3, 10, 15).\n" +
        "- **Check with differences:** a square plus a fixed number has differences 3, 5, 7, 9, the odd numbers, so the difference route agrees.",
      formula: {
        label: "Common near-square and near-cube terms",
        latex: "n^2 \\pm 1 \\qquad n^3 \\pm 1 \\qquad n(n+1) \\qquad n^3 - n = (n-1)\\,n\\,(n+1)",
        symbols: [{ symbol: "\\(n\\)", meaning: "the counting number behind each term" }],
      },
      authoredExample: {
        prompt: "Find the next term: 9, 28, 65, 126, ?",
        steps: [
          "Take 1 from each: 8, 27, 64, 125. These are \\(2^3, 3^3, 4^3, 5^3\\).",
          "So the terms are cube plus 1, and the next is \\(6^3 + 1 = 217\\).",
        ],
        answer: "217",
      },
      selfCheckExample: {
        prompt: "Find the next term: 0, 6, 24, 60, ?",
        steps: [
          "\\(1^3 - 1 = 0\\), \\(2^3 - 2 = 6\\), \\(3^3 - 3 = 24\\), \\(4^3 - 4 = 60\\).",
          "Next: \\(5^3 - 5 = 120\\), which is also \\(4 \\times 5 \\times 6\\).",
        ],
        answer: "120",
      },
      practiceSet: [
        { prompt: "Find the next term: 63, 80, 99, 120, ?", answer: "143", method: "\\(8^2 - 1\\) to \\(11^2 - 1\\), then \\(12^2 - 1\\)." },
        { prompt: "Find the next term: 56, 72, 90, 110, ?", answer: "132", method: "\\(7 \\times 8\\) to \\(10 \\times 11\\), then \\(11 \\times 12\\)." },
        { prompt: "Find the next term: 26, 37, 50, 65, ?", answer: "82", method: "\\(5^2 + 1\\) to \\(8^2 + 1\\), then \\(9^2 + 1\\)." },
        { prompt: "Find the next term: 7, 26, 63, 124, ?", answer: "215", method: "Cube minus 1: \\(6^3 - 1\\)." },
      ],
      pyqExampleId: "f6bb646b-7acf-4411-8fa3-ea1e3161f8ea",
      traps: [
        {
          title: "Plus one or minus one",
          body:
            "24 is \\(5^2 - 1\\), while 26 is \\(5^2 + 1\\). Test the first two terms, not just one, before you decide which way the series goes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsepw-primes",
      name: "Primes, factorials and sums",
      intuition:
        "A few series are lists to know by heart: the primes, the factorials, and the sums of the first odd numbers, which are the squares.",
      definition:
        "- **Primes to 100:** 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.\n" +
        "- **Factorials:** 1, 2, 6, 24, 120, 720, 5040, 40320, 362880. Each is the one before times the next counting number.\n" +
        "- **Sum of the first n odd numbers** is \\(n^2\\): \\(1 + 3 + 5 + 7 = 16\\).\n" +
        "- **Sum of the first n counting numbers** is \\(\\frac{n(n+1)}{2}\\).\n" +
        "- **Testing a prime quickly:** a number from 11 to 120 is prime if none of 2, 3, 5 and 7 divides it.",
      formula: {
        label: "Sums and factorials",
        latex: "1 + 3 + \\dots + (2n - 1) = n^2 \\qquad 1 + 2 + \\dots + n = \\frac{n(n+1)}{2} \\qquad n! = n \\times (n-1)!",
        symbols: [{ symbol: "\\(n\\)", meaning: "how many numbers are added, or the number whose factorial is taken" }],
      },
      authoredExample: {
        prompt: "Find the next term: 31, 37, 41, 43, ?",
        steps: [
          "These are the primes in order after 29.",
          "After 43: 44, 45 and 46 are not prime (they are even, or divisible by 3 or 5). 47 is prime.",
        ],
        answer: "47",
      },
      selfCheckExample: {
        prompt: "What is the sum of the first 15 odd numbers?",
        steps: [
          "The sum of the first n odd numbers is \\(n^2\\).",
          "\\(15^2 = 225\\).",
        ],
        answer: "225",
      },
      practiceSet: [
        { prompt: "Find the missing term: 53, 59, ?, 67, 71", answer: "61", method: "The primes in order." },
        { prompt: "What is \\(7!\\) divided by \\(5!\\)?", answer: "42", method: "\\(7 \\times 6 = 42\\)." },
        { prompt: "What is \\(1 + 2 + 3 + \\dots + 20\\)?", answer: "210", method: "\\(\\frac{20 \\times 21}{2} = 210\\)." },
        { prompt: "Which of 51, 53, 57 and 87 is a prime?", answer: "53", method: "51, 57 and 87 are each divisible by 3." },
      ],
      pyqExampleId: "2b79c2f2-618a-4e91-a265-6186cd19b9e8",
      traps: [
        {
          title: "Numbers that look prime",
          body:
            "51 is \\(3 \\times 17\\), 57 is \\(3 \\times 19\\), 87 is \\(3 \\times 29\\) and 91 is \\(7 \\times 13\\). Add the digits to test for 3 (a digit sum divisible by 3 means the number is too) and try 7 before calling a number prime.",
        },
      ],
    },
  ],
};
