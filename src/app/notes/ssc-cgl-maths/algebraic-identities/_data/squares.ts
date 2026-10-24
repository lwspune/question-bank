import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_SQUARES_NOTE: SubtopicNote = {
  subtopicName: "Squares of a Binomial",
  title: "Squares of a Binomial",
  oneLineDefinition:
    "The square of a sum or a difference, the difference of two squares, and how the sum and product of two numbers give every other square.",
  whyItMatters:
    "20 questions in the bank, 16 of them EASY. Each one is a single square identity used once: expand a bracket, or turn a sum and a product into a sum of squares, a difference or a difference of squares. Because an identity holds for every value, putting a small number into the question and the options settles most of them in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscaisq-check",
      name: "Checking an algebra answer by putting in numbers",
      intuition:
        "An identity is true for every value of its letters. So two expressions that are really equal must give the same number for any value you put in. That turns an algebra question into a small sum.",
      definition:
        "- Pick small values that keep every term defined: \\(x = 1\\), \\(x = 2\\), or \\(a = 2, b = 1\\). Avoid 0 when something is divided by \\(x\\).\n" +
        "- Work out the question and each option at those values. Throw out every option that gives a different number.\n" +
        "- If two options survive, try a second value.\n" +
        "- **Limit:** a mismatch proves two expressions differ, but a match at one value proves nothing. Use numbers to reject options and the identity to be sure.\n" +
        "- **Limit:** this works when the options are expressions in the letters. If the question fixes a condition (say \\(x + y = 7\\)), any test values must satisfy that condition too.",
      authoredExample: {
        prompt:
          "Which of \\(4x\\), \\(8x\\), \\(8x^2\\) and 2 is equal to \\((2x + 1)^2 - (2x - 1)^2\\)?",
        steps: [
          "Put \\(x = 1\\): \\(3^2 - 1^2 = 8\\). The options give 4, 8, 8 and 2, so \\(8x\\) and \\(8x^2\\) survive.",
          "Put \\(x = 2\\): \\(5^2 - 3^2 = 16\\). Now \\(8x = 16\\) but \\(8x^2 = 32\\).",
          "Only \\(8x\\) matches both values.",
        ],
        answer: "\\(8x\\)",
      },
      selfCheckExample: {
        prompt:
          "Test at \\(x = 1\\) and \\(x = 2\\) to decide which of \\(x^2 + x - 6\\), \\(x^2 - x - 6\\) and \\(x^2 + 5x - 6\\) equals \\((x + 3)(x - 2)\\).",
        steps: [
          "At \\(x = 1\\): \\((4)(-1) = -4\\). The options give \\(-4\\), \\(-6\\) and 0, so only the first survives.",
          "At \\(x = 2\\): \\((5)(0) = 0\\), and \\(4 + 2 - 6 = 0\\). It still matches.",
        ],
        answer: "\\(x^2 + x - 6\\)",
      },
      practiceSet: [
        { prompt: "At \\(x = 1\\), what is the value of \\((x + 2)^2 + (x - 2)^2\\)?", answer: "\\(9 + 1 = 10\\)" },
        {
          prompt: "Is \\((a + b)^2 = a^2 + b^2\\) true for all a and b? Test it at \\(a = 1, b = 1\\).",
          answer: "No: the left side is 4 and the right side is 2",
        },
        {
          prompt: "Why is \\(x = 0\\) a poor test value for an expression containing \\(\\frac{1}{x}\\)?",
          answer: "\\(\\frac{1}{x}\\) is not defined at \\(x = 0\\)",
        },
        {
          prompt: "At \\(a = 2\\) and \\(b = 1\\), find both \\(a^2 - b^2\\) and \\((a - b)(a + b)\\).",
          answer: "3 and 3",
        },
      ],
      traps: [
        {
          title: "A test value that hides the difference",
          body:
            "At \\(x = 1\\), \\(x\\), \\(x^2\\) and \\(x^3\\) are all 1, so \\(4x\\) and \\(4x^2\\) give the same number. When options differ only in a power, test at \\(x = 2\\) as well.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaisq-expand",
      name: "Square of a sum, square of a difference, difference of squares",
      intuition:
        "\\((a + b)^2\\) is the area of a square of side \\(a + b\\): a square of side a, a square of side b, and two rectangles a by b. Those two rectangles are the \\(2ab\\), and leaving them out is the most common slip.",
      definition:
        "- \\((a + b)^2 = a^2 + 2ab + b^2\\) and \\((a - b)^2 = a^2 - 2ab + b^2\\).\n" +
        "- **Add** the two and the \\(2ab\\) cancels: \\((a + b)^2 + (a - b)^2 = 2(a^2 + b^2)\\).\n" +
        "- **Subtract** them and the squares cancel: \\((a + b)^2 - (a - b)^2 = 4ab\\).\n" +
        "- **Difference of squares:** \\(a^2 - b^2 = (a - b)(a + b)\\). Read it both ways: to factorise, and to multiply two numbers the same distance from a round number, such as \\(98 \\times 102 = 100^2 - 2^2 = 9996\\).\n" +
        "- A long bracket is still a binomial. In \\((3x - 2y + 5)(3x - 2y - 5)\\), let \\(a = 3x - 2y\\) and \\(b = 5\\).\n" +
        "- For a product that is not a square: \\((x + p)(x + q) = x^2 + (p + q)x + pq\\). Expand each product, then collect like terms.",
      formula: {
        label: "Square identities",
        latex:
          "(a + b)^2 = a^2 + 2ab + b^2 \\qquad (a - b)^2 = a^2 - 2ab + b^2 \\qquad (a + b)^2 + (a - b)^2 = 2(a^2 + b^2) \\qquad (a + b)^2 - (a - b)^2 = 4ab \\qquad a^2 - b^2 = (a - b)(a + b)",
      },
      authoredExample: {
        prompt: "Simplify \\((2x + 5)^2 + (2x - 5)^2\\).",
        steps: [
          "This is \\((a + b)^2 + (a - b)^2\\) with \\(a = 2x\\) and \\(b = 5\\).",
          "So it equals \\(2(a^2 + b^2) = 2(4x^2 + 25) = 8x^2 + 50\\).",
          "Check at \\(x = 1\\): \\(7^2 + (-3)^2 = 49 + 9 = 58\\), and \\(8 + 50 = 58\\).",
        ],
        answer: "\\(8x^2 + 50\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(103 \\times 97\\) without long multiplication.",
        steps: [
          "\\(103 \\times 97 = (100 + 3)(100 - 3)\\).",
          "\\(= 100^2 - 3^2 = 10000 - 9 = 9991\\).",
        ],
        answer: "9991",
      },
      practiceSet: [
        { prompt: "Expand \\((3x - 4)^2\\).", answer: "\\(9x^2 - 24x + 16\\)" },
        { prompt: "Simplify \\((x + 6)^2 - (x - 6)^2\\).", answer: "\\(4 \\times x \\times 6 = 24x\\)" },
        {
          prompt: "Find the value of \\(\\frac{(85 + 15)^2 - (85 - 15)^2}{85 \\times 15}\\).",
          answer: "4, since the top is \\(4 \\times 85 \\times 15\\)",
        },
        {
          prompt: "Write \\((2a - b + 7)(2a - b - 7)\\) as a difference of squares and expand it.",
          answer: "\\((2a - b)^2 - 49 = 4a^2 - 4ab + b^2 - 49\\)",
        },
      ],
      pyqExampleId: "70d96c44-65d3-45e8-9a2b-474364e3a69e",
      traps: [
        {
          title: "Squaring term by term",
          body:
            "\\((a + b)^2\\) is not \\(a^2 + b^2\\): the \\(2ab\\) is missing. At \\(a = b = 1\\) the first is 4 and the second is 2.",
        },
        {
          title: "The last term of a squared difference",
          body:
            "\\((x - 5)^2 = x^2 - 10x + 25\\). The last term is \\(+25\\), never \\(-25\\), because it is \\((-5)^2\\). Only the middle term carries the minus sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaisq-sumprod",
      name: "Squares from the sum and product of two numbers",
      intuition:
        "If you know \\(a + b\\) and \\(ab\\), you know every symmetric expression in the two numbers without finding them. The bridge is that \\((a + b)^2\\) and \\((a - b)^2\\) differ by exactly \\(4ab\\).",
      definition:
        "- \\(a^2 + b^2 = (a + b)^2 - 2ab = (a - b)^2 + 2ab\\).\n" +
        "- \\((a - b)^2 = (a + b)^2 - 4ab\\) and \\((a + b)^2 = (a - b)^2 + 4ab\\).\n" +
        "- \\(a^2 - b^2 = (a + b)(a - b)\\): find whichever of the two is missing first.\n" +
        "- \\(a^2 - ab + b^2 = (a + b)^2 - 3ab\\), and \\(\\frac{a}{b} + \\frac{b}{a} = \\frac{a^2 + b^2}{ab}\\).\n" +
        "- **A square root has two signs.** Use what the question says (natural numbers, positive, \\(a > b\\), a sign given) to pick one.\n" +
        "- **A coefficient rides along.** For \\(2x + 5y\\) and \\(xy\\), take \\(a = 2x\\), \\(b = 5y\\), so \\(ab = 10xy\\).\n" +
        "- **Fast route:** with whole numbers, guess the pair. A sum of 9 and a product of 20 are 5 and 4. If the guess fits both facts, the rest is arithmetic. If no whole pair fits, use the identities.",
      formula: {
        label: "From a sum and a product",
        latex:
          "a^2 + b^2 = (a + b)^2 - 2ab \\qquad (a - b)^2 = (a + b)^2 - 4ab \\qquad a^2 - ab + b^2 = (a + b)^2 - 3ab \\qquad \\frac{a}{b} + \\frac{b}{a} = \\frac{a^2 + b^2}{ab}",
      },
      authoredExample: {
        prompt:
          "The sum of two natural numbers is 17 and their product is 72. Find the positive difference of their squares.",
        steps: [
          "\\((a - b)^2 = (a + b)^2 - 4ab = 289 - 288 = 1\\), so \\(a - b = 1\\).",
          "\\(a^2 - b^2 = (a + b)(a - b) = 17 \\times 1 = 17\\).",
          "Check: the numbers are 9 and 8, and \\(81 - 64 = 17\\).",
        ],
        answer: "17",
      },
      selfCheckExample: {
        prompt: "If \\(x + y = 11\\) and \\(xy = 24\\), find \\(\\frac{x}{y} + \\frac{y}{x}\\).",
        steps: [
          "\\(x^2 + y^2 = 121 - 48 = 73\\).",
          "\\(\\frac{x}{y} + \\frac{y}{x} = \\frac{x^2 + y^2}{xy} = \\frac{73}{24}\\).",
          "Check with 8 and 3: \\(\\frac{8}{3} + \\frac{3}{8} = \\frac{64 + 9}{24}\\).",
        ],
        answer: "\\(\\frac{73}{24}\\)",
      },
      practiceSet: [
        { prompt: "If \\(a + b = 10\\) and \\(ab = 21\\), find \\(a^2 + b^2\\).", answer: "\\(100 - 42 = 58\\)" },
        {
          prompt: "If \\(a - b = 3\\) and \\(ab = 40\\), and both numbers are positive, find \\(a + b\\).",
          answer: "\\(\\sqrt{9 + 160} = 13\\)",
        },
        { prompt: "If \\(p + q = 8\\) and \\(pq = 15\\), find \\(p^2 - pq + q^2\\).", answer: "\\(64 - 45 = 19\\)" },
        {
          prompt: "If \\(2m + 3n = 13\\) and \\(mn = 7\\), find \\(4m^2 + 9n^2\\).",
          answer: "\\(169 - 2 \\times 42 = 85\\), since \\((2m)(3n) = 42\\)",
        },
      ],
      pyqExampleId: "31e37f07-7a21-42a8-b701-42c95a4b5b12",
      traps: [
        {
          title: "Leaving out the coefficient in the product",
          body:
            "With \\(a = 3x\\) and \\(b = 4y\\), \\(ab = 12xy\\), not \\(xy\\). Using \\(xy\\) in \\((a - b)^2 = (a + b)^2 - 4ab\\) gives a wrong difference.",
        },
        {
          title: "Two square roots, one answer",
          body:
            "\\((a - b)^2 = 49\\) gives \\(a - b = 7\\) or \\(-7\\). The question's condition (\\(a > b\\), natural numbers, a positive result) picks one. Without a condition, see which sign the options allow.",
        },
      ],
    },
  ],
};
