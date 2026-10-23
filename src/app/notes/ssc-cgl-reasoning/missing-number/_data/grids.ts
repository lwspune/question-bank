import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMN_GRIDS_NOTE: SubtopicNote = {
  subtopicName: "Missing Number in Grids",
  title: "Missing Number in Grids",
  oneLineDefinition:
    "Each row of numbers follows one hidden rule; find the rule in one row, prove it in another, and only then use it to fill the gap.",
  whyItMatters:
    "Twelve questions in the bank, eleven from the 2023 shifts and one from the 2025 shifts: nine MODERATE and three EASY. Every one gives rows of numbers, or a 3 by 3 square, with one number missing. Seven rules only add, subtract or halve, three multiply or divide, and two use squares and cubes or a chain of two steps.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmngr-add",
      name: "Rules that add, subtract or halve",
      intuition:
        "Before trying any rule, compare the size of the third number with the first two. If it is close to their sum or a little below the first, the rule uses only adding and subtracting, perhaps with a half or a double.",
      definition:
        "The order a strong student tries, on the first full row:\n" +
        "- **Size check.** Third number near first \\(+\\) second: try the sum plus or minus a small number. Third number below the first: try a difference or a half. Third number far above both: go to products or powers.\n" +
        "- **Common forms:** \\(a + b \\pm k\\), \\(2a + b\\), \\(a - 2b\\), \\(a - \\frac{b}{2}\\), \\(b + \\frac{a}{2}\\).\n" +
        "- **Prove it on the second row.** A rule that fits one row only is a guess.\n" +
        "- **Apply it to the last row**, then find the answer among the options.\n" +
        "- **Whole numbers only:** SSC's note means 13 stays thirteen. Never split it into 1 and 3.\n" +
        "- **A 3 by 3 square with no rule given:** add each row, column and diagonal. In a magic square every line has the same sum.",
      authoredExample: {
        prompt: "Find the missing number. Rows: (7, 4, 15), (5, 9, 16), (8, 6, ?).",
        steps: [
          "Size check: 15 is near \\(7 + 4 = 11\\), and 16 near \\(5 + 9 = 14\\). But the gaps are 4 and 2, not the same, so \\(a + b + k\\) fails.",
          "Try \\(2a + b\\): row 1 gives 18 and row 2 gives 19. Both are 3 too big, so the rule is \\(2a + b - 3\\).",
          "Row 3: \\(2 \\times 8 + 6 - 3 = 19\\).",
        ],
        answer: "19",
      },
      selfCheckExample: {
        prompt: "Find the missing number. Rows: (25, 6, 13), (19, 4, 11), (30, 9, ?).",
        steps: [
          "The third number is well below the first, so try a difference: \\(25 - 2 \\times 6 = 13\\) and \\(19 - 2 \\times 4 = 11\\). The rule is \\(a - 2b\\).",
          "Row 3: \\(30 - 18 = 12\\).",
        ],
        answer: "12",
      },
      practiceSet: [
        { prompt: "Find the missing number. Rows: (3, 8, 14), (6, 5, 14), (7, 9, ?).", answer: "19", method: "\\(a + b + 3\\)." },
        { prompt: "Find the missing number. Rows: (10, 4, 12), (8, 6, 11), (12, 2, ?).", answer: "13", method: "\\(a + \\frac{b}{2}\\)." },
        {
          prompt:
            "In a 3 by 3 square every row, column and diagonal adds up to 18. The top row is 3, 8, 7 and the middle row is 10, 6, 2. What is the first number of the bottom row?",
          answer: "5",
          method: "First column: \\(18 - 3 - 10 = 5\\).",
        },
        { prompt: "Find the missing number. Rows: (15, 4, 8), (22, 5, 13), (18, 2, ?).", answer: "15", method: "\\(a - 2b + 1\\)." },
      ],
      pyqExampleId: "7f21fe41-f92e-44e8-b124-ba98ee6e5753",
      traps: [
        {
          title: "Trusting a rule that fits one row",
          body:
            "The row (6, 3, 9) fits both \\(a + b\\) and \\(3b\\). Only the second row tells you which rule SSC meant, so always test it before answering.",
        },
        {
          title: "Splitting a number into its digits",
          body:
            "SSC's note forbids treating 24 as 2 and 4. A rule that only works on digits is not the intended one, however neatly it fits.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmngr-multiply",
      name: "Rules that multiply or divide",
      intuition:
        "When the third number is far bigger than the sum, a product is likely. When the first number is an exact multiple of the second in every row, a quotient is likely.",
      definition:
        "- **Common forms:** \\(ab \\pm k\\), \\(k \\times a \\times b\\), \\(\\frac{a}{b} \\times k\\), \\(\\frac{ka}{b}\\).\n" +
        "- **Divisibility hint:** if \\(a\\) divides exactly by \\(b\\) in every row, start with \\(\\frac{a}{b}\\) and see what multiplier turns it into the third number.\n" +
        "- **Product near the answer:** work out \\(ab\\) for two rows. If both miss the third number by the same amount, that amount is the \\(\\pm k\\).\n" +
        "- **Check without dividing:** if the rule is third \\(= \\frac{ka}{b}\\), then \\(b \\times\\) third \\(= k \\times a\\) in every row. Test each option this way.",
      authoredExample: {
        prompt: "Find the missing number. Rows: (4, 5, 22), (3, 7, 23), (6, 2, ?).",
        steps: [
          "Size check: 22 is far above \\(4 + 5 = 9\\), so try a product: \\(4 \\times 5 = 20\\), 2 short.",
          "Row 2: \\(3 \\times 7 = 21\\), also 2 short. The rule is \\(ab + 2\\).",
          "Row 3: \\(6 \\times 2 + 2 = 14\\).",
        ],
        answer: "14",
      },
      selfCheckExample: {
        prompt: "Find the missing number. Rows: (36, 4, 45), (20, 5, 20), (42, 7, ?).",
        steps: [
          "The first number divides exactly by the second: \\(36 \\div 4 = 9\\) and \\(20 \\div 5 = 4\\). Times 5 gives 45 and 20, so the rule is \\(\\frac{a}{b} \\times 5\\).",
          "Row 3: \\(42 \\div 7 = 6\\), and \\(6 \\times 5 = 30\\).",
        ],
        answer: "30",
      },
      practiceSet: [
        { prompt: "Find the missing number. Rows: (2, 3, 12), (4, 5, 40), (3, 6, ?).", answer: "36", method: "\\(2ab\\)." },
        { prompt: "Find the missing number. Rows: (48, 6, 16), (35, 7, 10), (54, 9, ?).", answer: "12", method: "\\(\\frac{a}{b} \\times 2\\)." },
        { prompt: "Find the missing number. Rows: (5, 4, 19), (6, 3, 17), (7, 5, ?).", answer: "34", method: "\\(ab - 1\\)." },
        { prompt: "Find the missing number. Rows: (8, 2, 20), (12, 4, 15), (18, 3, ?).", answer: "30", method: "\\(\\frac{5a}{b}\\)." },
      ],
      pyqExampleId: "1e4a209b-1fa4-4159-ade9-8711afd8201f",
      traps: [
        {
          title: "Stopping at a product that is close",
          body:
            "If \\(ab\\) misses the third number, check that it misses by the same amount in the second row. Two different gaps mean the rule is something else.",
        },
        {
          title: "Dividing the wrong way round",
          body:
            "When a rule divides, test \\(\\frac{a}{b}\\) and \\(\\frac{b}{a}\\) on row 1. Only one gives a whole number that leads to the third number in both rows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmngr-powers",
      name: "Squares, cubes and two-step chains",
      intuition:
        "A third number far bigger than any product points to squares or cubes. Numbers that grow steadily along the row may each come from the one just before it, in a chain.",
      definition:
        "- **Know by heart:** squares up to \\(20^2 = 400\\) and cubes up to \\(10^3 = 1000\\).\n" +
        "- **Common forms:** \\(a^2 + b^2\\), \\(a^2 + b^3\\), \\(a^3 - b\\), \\(a^2 - b\\), \\((a + b)^2\\).\n" +
        "- **Find the square inside:** take the nearest square below the third number away from it and see whether what is left is linked to the other number.\n" +
        "- **Chain:** the second number comes from the first (for example \\(\\times 3 + 1\\)) and the third from the second (for example \\(\\times 2 + 1\\)). Prove each step on every full row.",
      authoredExample: {
        prompt: "Find the missing number. Rows: (3, 4, 25), (5, 2, 29), (6, 3, ?).",
        steps: [
          "25 is far above \\(3 \\times 4 = 12\\), so try squares: \\(3^2 + 4^2 = 9 + 16 = 25\\).",
          "Row 2: \\(5^2 + 2^2 = 25 + 4 = 29\\). The rule is \\(a^2 + b^2\\).",
          "Row 3: \\(36 + 9 = 45\\).",
        ],
        answer: "45",
      },
      selfCheckExample: {
        prompt: "Find the missing number. Rows: 4, 9, 19; 6, 13, 27; 10, 21, ?",
        steps: [
          "First to second: \\(2 \\times 4 + 1 = 9\\), \\(2 \\times 6 + 1 = 13\\), \\(2 \\times 10 + 1 = 21\\).",
          "Second to third: \\(2 \\times 9 + 1 = 19\\), \\(2 \\times 13 + 1 = 27\\). So the gap is \\(2 \\times 21 + 1 = 43\\).",
        ],
        answer: "43",
      },
      practiceSet: [
        { prompt: "Find the missing number. Rows: (2, 3, 5), (3, 7, 20), (4, 14, ?).", answer: "50", method: "\\(a^3 - b\\)." },
        { prompt: "Find the missing number. Rows: (1, 2, 9), (2, 3, 25), (3, 1, ?).", answer: "16", method: "\\((a + b)^2\\)." },
        {
          prompt: "Each row is a chain: second \\(= 3 \\times\\) first \\(+ 1\\), third \\(= 2 \\times\\) second \\(+ 1\\). Rows: 2, 7, 15; 3, 10, 21; 5, 16, ?",
          answer: "33",
        },
        { prompt: "Find the missing number. Rows: (5, 3, 22), (7, 4, 45), (6, 2, ?).", answer: "34", method: "\\(a^2 - b\\)." },
      ],
      pyqExampleId: "4402c7c5-25e9-4161-8802-65a6ca22c999",
      traps: [
        {
          title: "Reading a chain as a rule on the first two numbers",
          body:
            "In a chain the third number comes from the second alone. Looking for a rule that uses the first and second together finds nothing.",
        },
        {
          title: "Mixing up a square and a cube",
          body:
            "\\(2^3 = 8\\) but \\(2^2 = 4\\); \\(3^3 = 27\\) but \\(3^2 = 9\\). For small numbers the two are close enough to fit row 1 by accident, so check row 2.",
        },
      ],
    },
  ],
};
