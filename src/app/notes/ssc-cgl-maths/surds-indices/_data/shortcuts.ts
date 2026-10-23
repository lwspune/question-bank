import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_SHORTCUTS_NOTE: SubtopicNote = {
  subtopicName: "Simplification Shortcuts",
  title: "Simplification Shortcuts",
  oneLineDefinition:
    "Many long-looking expressions are an identity or a fixed ratio in disguise; seeing the pattern replaces the arithmetic, and a digit-sum or last-digit check confirms the option in seconds.",
  whyItMatters:
    "Eighteen questions in the bank, 11 EASY and 7 MODERATE, and 13 of them come from the 2025 shifts. Ten are one pattern: a sum of cubes divided by a sum of cubes whose terms are a fixed multiple of the first. Spot the multiple and the answer is one cube, with no cubing of decimals at all.",
  related: [
    { label: "Algebraic Identities: squares", href: "/notes/ssc-cgl-maths/algebraic-identities/ssc-ai-squares" },
    { label: "Algebraic Identities: cubes", href: "/notes/ssc-cgl-maths/algebraic-identities/ssc-ai-cubes" },
  ],
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsish-squares",
      name: "Difference of squares and cubes as a shortcut",
      intuition:
        "An expression like \\(7.2 \\times 7.2 - 2.8 \\times 2.8\\) is the identity \\(a^2 - b^2\\) with numbers in place of letters. Recognise the shape and the factors do the work: one easy product instead of two hard squares.",
      definition:
        "- \\(a^2 - b^2 = (a + b)(a - b)\\), so \\(\\frac{a^2 - b^2}{a + b} = a - b\\).\n" +
        "- \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\) and \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\).\n" +
        "- A product written out as \\(a \\times a \\times a\\) is a cube in disguise; write it as \\(a^3\\) to see the pattern.\n" +
        "- **Square a decimal by splitting it:** \\((a + b)^2 = a^2 + 2ab + b^2\\), so \\(20.3^2 = 400 + 12 + 0.09 = 412.09\\).\n" +
        "- These identities are taught in full in the Algebraic Identities chapter; here they are used only to cut arithmetic.",
      formula: {
        label: "Square and cube identities",
        latex:
          "a^2 - b^2 = (a + b)(a - b) \\qquad a^3 - b^3 = (a - b)(a^2 + ab + b^2) \\qquad a^3 + b^3 = (a + b)(a^2 - ab + b^2) \\qquad (a + b)^2 = a^2 + 2ab + b^2",
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{8.6 \\times 8.6 - 3.4 \\times 3.4}{0.52}\\).",
        steps: [
          "The top is \\(a^2 - b^2\\) with \\(a = 8.6\\), \\(b = 3.4\\).",
          "\\((8.6 + 3.4)(8.6 - 3.4) = 12 \\times 5.2 = 62.4\\).",
          "\\(62.4 \\div 0.52 = 6240 \\div 52 = 120\\).",
        ],
        answer: "120",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\frac{1.3^3 - 0.7^3}{1.3^2 + 1.3 \\times 0.7 + 0.7^2}\\).",
        steps: [
          "The top is \\(a^3 - b^3\\) and the bottom is \\(a^2 + ab + b^2\\), with \\(a = 1.3\\), \\(b = 0.7\\).",
          "So the value is \\(a - b = 0.6\\).",
        ],
        answer: "0.6",
      },
      practiceSet: [
        { prompt: "What is \\(\\frac{6.5^2 - 3.5^2}{6.5 + 3.5}\\)?", answer: "3" },
        { prompt: "What is \\(102^2 - 98^2\\)?", answer: "800", method: "\\(200 \\times 4 = 800\\)." },
        { prompt: "What is \\(\\frac{9^3 + 4^3}{9^2 - 9 \\times 4 + 4^2}\\)?", answer: "13", method: "It is \\(\\frac{a^3 + b^3}{a^2 - ab + b^2} = a + b\\)." },
        { prompt: "What is \\(40.2^2\\)?", answer: "1616.04", method: "\\(1600 + 2 \\times 40 \\times 0.2 + 0.04\\)." },
      ],
      pyqExampleId: "42e5f6ed-147d-45ba-a7b9-c565ae0a3bbc",
      traps: [
        {
          title: "Pairing a cube with the wrong middle sign",
          body:
            "\\(\\frac{a^3 - b^3}{a^2 + ab + b^2} = a - b\\), but \\(\\frac{a^3 - b^3}{a^2 - ab + b^2}\\) does not simplify. The middle term is plus for \\(a^3 - b^3\\) and minus for \\(a^3 + b^3\\); check it before using the shortcut.",
        },
        {
          title: "Dropping the middle term of a square",
          body:
            "\\((30 + 0.5)^2\\) is \\(900 + 30 + 0.25 = 930.25\\), not \\(900.25\\). The term \\(2ab\\) is the one people forget.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsish-cubes",
      name: "Sums of cubes in a fixed ratio",
      intuition:
        "If every term below is the same multiple \\(k\\) of the matching term above, then every cube below is \\(k^3\\) times the cube above. So the whole bottom is \\(k^3\\) times the whole top, and nothing needs cubing.",
      definition:
        "- If \\(c = ka\\) and \\(d = kb\\), then \\(\\frac{a^3 + b^3}{c^3 + d^3} = \\frac{a^3 + b^3}{k^3(a^3 + b^3)} = \\frac{1}{k^3}\\).\n" +
        "- It works for any number of terms, and for squares too (the value is then \\(\\frac{1}{k^2}\\)), as long as **one k links every pair**.\n" +
        "- **Find k** by dividing one pair, then check that the other pair gives the same k.\n" +
        "- If the top terms are the bigger ones, the value is \\(k^3\\) rather than \\(\\frac{1}{k^3}\\).\n" +
        "- If one pair gives a different k, the shortcut does not apply: work the cubes out.\n" +
        "- Cubes to know: \\(2^3 = 8\\), \\(3^3 = 27\\), \\(4^3 = 64\\), \\(5^3 = 125\\), and \\(0.5^3 = 0.125\\), \\(0.2^3 = 0.008\\), \\(0.1^3 = 0.001\\).",
      formula: {
        label: "Sums of cubes in a fixed ratio",
        latex: "\\frac{a^3 + b^3}{(ka)^3 + (kb)^3} = \\frac{1}{k^3}",
        symbols: [{ symbol: "k", meaning: "the multiple linking each term below to its partner above" }],
      },
      authoredExample: {
        prompt: "Find \\(\\frac{0.3^3 + 0.08^3}{1.2^3 + 0.32^3}\\).",
        steps: [
          "Pairs: \\(1.2 \\div 0.3 = 4\\) and \\(0.32 \\div 0.08 = 4\\). One k, \\(k = 4\\).",
          "So the bottom is \\(4^3 = 64\\) times the top, and the value is \\(\\frac{1}{64} = 0.015625\\).",
          "Full method check: top \\(= 0.027 + 0.000512 = 0.027512\\), bottom \\(= 1.728 + 0.032768 = 1.760768\\), and \\(0.027512 \\times 64 = 1.760768\\).",
        ],
        answer: "\\(\\frac{1}{64}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{1.5^3 + 0.45^3 + 0.3^3}{0.5^3 + 0.15^3 + 0.1^3}\\).",
        steps: [
          "\\(1.5 = 3 \\times 0.5\\), \\(0.45 = 3 \\times 0.15\\), \\(0.3 = 3 \\times 0.1\\): one k, and here the top is the bigger.",
          "The top is \\(3^3 = 27\\) times the bottom.",
        ],
        answer: "27",
      },
      practiceSet: [
        { prompt: "What is \\(\\frac{0.2^3 + 0.6^3}{0.4^3 + 1.2^3}\\)?", answer: "0.125", method: "\\(k = 2\\), so \\(\\frac{1}{8}\\)." },
        { prompt: "What is \\(\\frac{0.9^2 + 0.3^2}{0.3^2 + 0.1^2}\\)?", answer: "9", method: "Squares with \\(k = 3\\): \\(3^2 = 9\\)." },
        { prompt: "What is \\(0.4^3\\)?", answer: "0.064" },
        {
          prompt: "Can the fixed-ratio shortcut be used on \\(\\frac{0.1^3 + 0.2^3}{0.3^3 + 0.5^3}\\)?",
          answer: "No",
          method: "\\(0.3 \\div 0.1 = 3\\) but \\(0.5 \\div 0.2 = 2.5\\): the multiples differ.",
        },
      ],
      pyqExampleId: "b94253ef-698b-405d-9fcb-bcc26d7493bc",
      traps: [
        {
          title: "Using k instead of k cubed",
          body:
            "If each term below is 5 times its partner above, the bottom is \\(5^3 = 125\\) times the top, so the value is \\(\\frac{1}{125} = 0.008\\), not \\(\\frac{1}{5} = 0.2\\).",
        },
        {
          title: "Pairing terms by position",
          body:
            "Match each term with the one it is a multiple of, not the one in the same place. In \\(\\frac{0.6^3 + 0.2^3}{0.1^3 + 0.3^3}\\) the 0.6 pairs with 0.3 and the 0.2 with 0.1: \\(k = 2\\) both times, so the value is 8.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsish-checks",
      name: "Common factors and quick answer checks",
      intuition:
        "Before multiplying big numbers, look for a factor they share. Before trusting a long calculation, test the options with a check that takes seconds: the last digit, the remainder on division by 9, the sign.",
      definition:
        "- **Take out a common factor:** \\(ab + ac = a(b + c)\\), so \\(17 \\times 46 + 17 \\times 54 = 17 \\times 100 = 1700\\).\n" +
        "- **Cancel before you multiply:** break each number into prime factors and strike out the factors shared by top and bottom.\n" +
        "- **Repeated-digit sums:** \\(3 + 33 + 333 = 3 \\times (1 + 11 + 111) = 3 \\times 123 = 369\\).\n" +
        "- **Digit-sum check:** a number leaves the same remainder on division by 9 as the sum of its digits. Find the remainder of each part, combine with the same signs, and keep the option whose digit sum matches.\n" +
        "- **Last-digit check:** the last digit of a sum or product depends only on the last digits.\n" +
        "- These checks **rule options out**; they do not prove the one left. If two options pass, work the sum.",
      formula: {
        label: "Common factor",
        latex: "ab + ac = a(b + c) \\qquad ab - ac = a(b - c)",
      },
      authoredExample: {
        prompt: "Which of 7860, 8280, 8000 and 8380 is the value of \\(23^3 - 15^3 - 8^3\\)?",
        steps: [
          "Last digits: \\(23^3\\) ends in 7, \\(15^3\\) in 5, \\(8^3\\) in 2, and \\(7 - 5 - 2\\) ends in 0. Every option ends in 0, so go on.",
          "Remainders on division by 9: \\(23\\) leaves 5 and \\(5^3 = 125\\) leaves 8; \\(15\\) leaves 6 and \\(6^3 = 216\\) leaves 0; \\(8^3 = 512\\) leaves 8. So the value leaves \\(8 - 0 - 8 = 0\\).",
          "Digit sums of the options: 7860 gives 21 (remainder 3), 8280 gives 18 (remainder 0), 8000 gives 8, 8380 gives 19 (remainder 1). Only 8280 fits.",
          "Full method: \\(12167 - 3375 - 512 = 8280\\).",
        ],
        answer: "8280",
      },
      selfCheckExample: {
        prompt: "Simplify \\(341 \\times 1365 \\div 2387\\).",
        steps: [
          "Factorise: \\(2387 = 7 \\times 11 \\times 31\\), \\(341 = 11 \\times 31\\) and \\(1365 = 7 \\times 195\\).",
          "\\(\\frac{11 \\times 31 \\times 7 \\times 195}{7 \\times 11 \\times 31} = 195\\).",
        ],
        answer: "195",
      },
      practiceSet: [
        { prompt: "What is \\(37 \\times 64 + 37 \\times 36\\)?", answer: "3700" },
        { prompt: "What is \\(5 + 55 + 555 + 5555\\)?", answer: "6170", method: "\\(5 \\times 1234 = 6170\\)." },
        { prompt: "What remainder does 8642 leave on division by 9?", answer: "2", method: "\\(8 + 6 + 4 + 2 = 20\\), and 20 leaves 2." },
        { prompt: "What is the last digit of \\(37 \\times 48 + 19\\)?", answer: "5", method: "\\(7 \\times 8 = 56\\) ends in 6, and \\(6 + 9 = 15\\) ends in 5." },
      ],
      pyqExampleId: "05e44105-0449-4d6a-b691-0d398fbe3166",
      traps: [
        {
          title: "Treating a passed check as proof",
          body:
            "Two options can share a last digit or a digit sum. A check removes the options that fail it; it confirms the one left only when it is the only one.",
        },
        {
          title: "Losing the sign in a remainder check",
          body:
            "A subtraction stays a subtraction: if the parts leave 1 and 4, their difference leaves \\(1 - 4 = -3\\), which is the same as a remainder of 6 on division by 9.",
        },
      ],
    },
  ],
};
