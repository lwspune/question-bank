import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Number Pairs",
  title: "Number Pairs",
  oneLineDefinition:
    "In three of four number pairs the second number is made from the first by one rule. Find the rule from the pairs that agree and test the last one exactly.",
  whyItMatters:
    "Forty-seven questions in the bank, the biggest page of the chapter: 27 from the 2023 shifts and 20 from the 2024 shifts, 29 EASY and 18 MODERATE. The odd pair is usually off by only one or two, so the rule has to be checked exactly, not by feel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrclpa-linear",
      name: "Pair rules made of multiplying, adding and fixed ratios",
      intuition:
        "When the second number is a few times the first, the rule is almost always 'multiply by k, then add or take away c'. Two pairs are enough to find k and c; the other two only need checking.",
      definition:
        "- **Order of tests**: the difference (second minus first), then the ratio (second divided by first), then multiply-and-adjust, then squares and cubes (next concept).\n" +
        "- **Fixed difference**: big numbers that differ by about the same amount, like 1984 and 1505, usually share one difference.\n" +
        "- **Fixed ratio**: cancel each pair to lowest terms. \\(36 : 84\\) and \\(66 : 154\\) both become \\(3 : 7\\).\n" +
        "- **Multiply and adjust**: guess k from the size of second ÷ first, then c = second − k × first. If c is the same in three pairs, that is the rule.\n" +
        "- The rule can run backwards, from the second number to the first (first = 8 × second − 1). If nothing works forwards, try it the other way.\n" +
        "- **Fast route**: with k and c found from two pairs, test the other two in your head. A pair that misses by 1 or 2 is the answer; there is no need to finish the arithmetic for the rest.",
      formula: {
        label: "Common pair rules",
        latex: "y = kx + c \\qquad y - x = d \\qquad x : y = p : q",
        symbols: [
          { symbol: "x", meaning: "the first number of a pair" },
          { symbol: "y", meaning: "the second number of a pair" },
          { symbol: "k, c, d", meaning: "fixed numbers shared by the three pairs that agree" },
        ],
      },
      authoredExample: {
        prompt: "Find the odd pair: (a) 9 : 41 (b) 12 : 53 (c) 7 : 33 (d) 15 : 66",
        steps: [
          "Differences: 32, 41, 26, 51. Not equal, so not a fixed difference.",
          "Second ÷ first is about 4 or 5 each time. Try 4 × first: 36, 48, 28, 60.",
          "What is left over: \\(41 - 36 = 5\\), \\(53 - 48 = 5\\), \\(33 - 28 = 5\\), \\(66 - 60 = 6\\). The rule is 4 × first + 5, and (d) should be 65.",
        ],
        answer: "(d) 15 : 66",
      },
      selfCheckExample: {
        prompt: "Find the odd pair: (a) 45 : 27 (b) 60 : 36 (c) 35 : 21 (d) 50 : 35",
        steps: [
          "The second number is smaller, so look for a ratio. Cancel each pair.",
          "\\(45 : 27 = 5 : 3\\) (divide by 9), \\(60 : 36 = 5 : 3\\) (divide by 12), \\(35 : 21 = 5 : 3\\) (divide by 7).",
          "\\(50 : 35 = 10 : 7\\). For a \\(5 : 3\\) ratio the partner of 50 would be 30.",
        ],
        answer: "(d) 50 : 35",
      },
      practiceSet: [
        { prompt: "Find the odd pair: 512 : 337, 431 : 256, 690 : 525, 308 : 133", answer: "690 : 525", method: "The others differ by 175; this one differs by 165." },
        { prompt: "Find the odd pair: 6 : 23, 9 : 35, 4 : 15, 11 : 45", answer: "11 : 45", method: "The rule is 4 × first − 1, which gives 43 for 11." },
        { prompt: "Two pairs follow second = k × first + c: 8 : 30 and 13 : 50. Find k and c.", answer: "k = 4, c = −2", method: "The second numbers differ by 20 when the first differ by 5, so k = 4; then \\(30 - 32 = -2\\)." },
        { prompt: "Find the odd pair: 42 : 56, 27 : 36, 33 : 44, 24 : 30", answer: "24 : 30", method: "The others are in the ratio \\(3 : 4\\); \\(24 : 30 = 4 : 5\\)." },
      ],
      pyqExampleId: "d989a557-3d41-4941-9bda-9b860596be87",
      traps: [
        {
          title: "Reading k from the smallest pair",
          body:
            "In a small pair the added number hides the multiplier: under the rule 4 × first + 5, the pair 1 : 9 looks like ×9. Guess k from the largest pair, where c matters least.",
        },
        {
          title: "Only testing the rule from first to second",
          body:
            "The setter may build the first number from the second, as in first = 8 × second − 1. When every forward rule fails, run the same tests from the second number back to the first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclpa-powers",
      name: "Pair rules with squares, cubes and roots",
      intuition:
        "When the second number is far bigger than the first, the rule nearly always squares or cubes it. When the first number is a perfect square or cube, the rule often takes its root.",
      definition:
        "- Compare the second number with the square of the first. If it is a little above or below, the rule is square plus or minus a fixed number.\n" +
        "- If it is close to the cube, test cube plus or minus the number itself (\\(n^3 + n\\), \\(n^3 - n\\)).\n" +
        "- If the second number is a square, find its root and compare it with the first: \\((x + 2)^2\\), \\((x/2 + 1)^2\\).\n" +
        "- If the first numbers are all squares or cubes, take the root and see what it becomes (half the root, root × 2 + 1).\n" +
        "- A multiple of a square also appears: \\(3x^2\\), \\(2x^2\\), \\(8x^2\\). Divide the second number by the square of the first.\n" +
        "- **Fast route**: the odd pair is usually the one whose second number is not near any square or cube. Check that one first.",
      formula: {
        label: "Power rules for pairs",
        latex: "y = x^2 \\pm c \\qquad y = (x \\pm c)^2 \\qquad y = x^3 \\pm x \\qquad y = k x^2 \\qquad y = \\sqrt{x} \\pm c",
      },
      authoredExample: {
        prompt: "Find the odd pair: (a) 5 : 29 (b) 8 : 68 (c) 11 : 125 (d) 7 : 51",
        steps: [
          "The second number is several times the first and grows fast, so compare it with the square of the first.",
          "\\(5^2 = 25\\), and 29 is 4 more. \\(8^2 = 64\\), and 68 is 4 more. \\(11^2 = 121\\), and 125 is 4 more.",
          "\\(7^2 = 49\\), and 51 is only 2 more. The rule square + 4 gives 53.",
        ],
        answer: "(d) 7 : 51",
      },
      selfCheckExample: {
        prompt: "Find the odd pair: (a) 64 : 10 (b) 25 : 7 (c) 81 : 11 (d) 49 : 10",
        steps: [
          "Every first number is a square, so take its root: 8, 5, 9, 7.",
          "Compare with the second number: \\(8 + 2 = 10\\), \\(5 + 2 = 7\\), \\(9 + 2 = 11\\).",
          "For 49 the rule gives \\(7 + 2 = 9\\), not 10.",
        ],
        answer: "(d) 49 : 10",
      },
      practiceSet: [
        { prompt: "Find the odd pair: 2 : 10, 3 : 30, 4 : 68, 5 : 125", answer: "5 : 125", method: "The rule is \\(n^3 + n\\), which gives 130 for 5." },
        { prompt: "Find the odd pair: 3 : 27, 5 : 75, 6 : 108, 7 : 140", answer: "7 : 140", method: "The rule is \\(3n^2\\), which gives 147 for 7." },
        { prompt: "What is the square root of 1764?", answer: "42" },
        { prompt: "Find the odd pair: 9 : 121, 4 : 36, 7 : 64, 10 : 144", answer: "7 : 64", method: "The rule is \\((n + 2)^2\\), which gives 81 for 7." },
      ],
      pyqExampleId: "c149aa62-9e4e-4b85-87f9-1d8ee7016cfa",
      traps: [
        {
          title: "Taking a square on the right as proof",
          body:
            "In 4 : 36 and 7 : 64 both second numbers are squares, but only one fits \\((n + 2)^2\\). Work out what the rule gives for each first number, not just whether the result is a square.",
        },
        {
          title: "Looking for a multiplier when the numbers grow too fast",
          body:
            "If the second number is 10 or more times the first and the ratio keeps changing, no single k exists. Move straight to squares and cubes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclpa-neighbours",
      name: "Products and powers of neighbouring numbers",
      intuition:
        "A number times its neighbour, or two squares next to each other, is a favourite SSC rule. The odd pair often uses the wrong neighbour, or the number times itself.",
      definition:
        "- \\(n(n + 1)\\) is a little more than \\(n^2\\): it adds n. \\(n(n - 1)\\) is a little less: it takes n away.\n" +
        "- If the second number is just above the square of the first, test \\(n(n + 1)\\); just below, test \\(n(n - 1)\\).\n" +
        "- For a pair of two squares, find both roots. Neighbouring roots (19 and 20) form the rule; a gap of 2 or 3 is the odd pair.\n" +
        "- The gap between neighbouring squares is \\(2n + 1\\), and between neighbouring cubes \\(3n^2 + 3n + 1\\).\n" +
        "- 'The next perfect square after the first number' is another rule from this family.",
      formula: {
        label: "Neighbouring numbers",
        latex: "n(n+1) = n^2 + n \\qquad (n+1)^2 - n^2 = 2n + 1 \\qquad (n+1)^3 - n^3 = 3n^2 + 3n + 1",
      },
      authoredExample: {
        prompt: "Find the odd pair: (a) 9 : 90 (b) 14 : 210 (c) 20 : 420 (d) 16 : 256",
        steps: [
          "Each second number is close to the square of the first: 81, 196, 400, 256.",
          "90 is 9 more than 81, 210 is 14 more than 196, 420 is 20 more than 400. So the rule is \\(n^2 + n = n(n + 1)\\).",
          "256 is exactly \\(16^2\\), with nothing added. The rule gives \\(16 \\times 17 = 272\\).",
        ],
        answer: "(d) 16 : 256",
      },
      selfCheckExample: {
        prompt: "Find the odd pair: (a) 289 : 324 (b) 625 : 676 (c) 900 : 961 (d) 441 : 529",
        steps: [
          "Every number is a square. Write the roots: 17 and 18, 25 and 26, 30 and 31, 21 and 23.",
          "Three pairs are squares of neighbouring numbers. 21 and 23 skip 22.",
        ],
        answer: "(d) 441 : 529",
      },
      practiceSet: [
        { prompt: "What is \\(27 \\times 28\\)?", answer: "756", method: "\\(27^2 + 27 = 729 + 27\\)." },
        { prompt: "What is \\(19^2 - 18^2\\)?", answer: "37", method: "\\(2 \\times 18 + 1\\)." },
        { prompt: "What is the next perfect square after 70?", answer: "81" },
        { prompt: "Find the odd pair: 12 : 132, 15 : 225, 9 : 72, 11 : 110", answer: "15 : 225", method: "The rule is \\(n(n - 1)\\), which gives 210 for 15." },
      ],
      pyqExampleId: "67f3e51d-9e62-4120-b44a-ba029b7ccbdb",
      traps: [
        {
          title: "Mixing up n(n + 1) and n(n − 1)",
          body:
            "\\(32 \\times 33 = 1056\\) and \\(32 \\times 31 = 992\\). Decide from the pairs that agree whether the rule adds n or takes it away, then test the fourth pair with that direction.",
        },
        {
          title: "Treating n × n as n times its neighbour",
          body: "\\(14 \\times 14 = 196\\) but \\(14 \\times 15 = 210\\). A square in a list of neighbour products is the odd one, even though it looks the right size.",
        },
      ],
    },
  ],
};
