import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_THREE_NOTE: SubtopicNote = {
  subtopicName: "Sums and Products of Three Variables",
  title: "Sums and Products of Three Variables",
  oneLineDefinition:
    "The square of a + b + c, the sum of the squared differences, and what follows when a sum of squares is zero.",
  whyItMatters:
    "11 questions in the bank, nine of them EASY. One identity links a + b + c, a² + b² + c² and ab + bc + ca, so any two of them give the third. The rest lean on one fact: a square is never negative, so squares that add up to zero must each be zero.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscaith-square",
      name: "The square of a + b + c",
      intuition:
        "Squaring \\(a + b + c\\) gives each square once and each pair product twice. Knowing any two of the sum, the sum of squares and the sum of pair products gives the third.",
      definition:
        "- \\((a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)\\).\n" +
        "- So \\(ab + bc + ca = \\frac{(a + b + c)^2 - (a^2 + b^2 + c^2)}{2}\\) and \\(a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)\\).\n" +
        "- **Recognise it in numbers:** three squares plus twice each pair product is the square of the sum. Divided by the sum, it leaves the sum.\n" +
        "- **Fast check:** with whole numbers, look for a triple. A sum of 6 with squares adding to 14 is 1, 2 and 3.",
      formula: {
        label: "Square of a trinomial",
        latex: "(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)",
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 9\\) and \\(a^2 + b^2 + c^2 = 29\\), find \\(ab + bc + ca\\).",
        steps: [
          "\\(ab + bc + ca = \\frac{81 - 29}{2} = \\frac{52}{2} = 26\\).",
          "Check with 2, 3 and 4: the sum is 9, the squares add to 29, and \\(6 + 12 + 8 = 26\\).",
        ],
        answer: "26",
      },
      selfCheckExample: {
        prompt: "If \\(x + y + z = 10\\) and \\(xy + yz + zx = 31\\), find \\(x^2 + y^2 + z^2\\).",
        steps: [
          "\\(x^2 + y^2 + z^2 = 100 - 2 \\times 31 = 38\\).",
          "Check with 2, 3 and 5: \\(4 + 9 + 25 = 38\\) and \\(6 + 15 + 10 = 31\\).",
        ],
        answer: "38",
      },
      practiceSet: [
        { prompt: "Expand \\((p + q + r)^2\\).", answer: "\\(p^2 + q^2 + r^2 + 2pq + 2qr + 2rp\\)" },
        {
          prompt: "If \\(a + b + c = 7\\) and \\(ab + bc + ca = 14\\), find \\(a^2 + b^2 + c^2\\).",
          answer: "\\(49 - 28 = 21\\)",
        },
        {
          prompt: "Find \\(\\frac{2^2 + 3^2 + 5^2 + 2(2 \\times 3 + 3 \\times 5 + 5 \\times 2)}{2 + 3 + 5}\\).",
          answer: "\\(\\frac{10^2}{10} = 10\\)",
        },
        {
          prompt: "If \\(x + y + z = 0\\), write \\(x^2 + y^2 + z^2\\) in terms of \\(xy + yz + zx\\).",
          answer: "\\(-2(xy + yz + zx)\\)",
        },
      ],
      pyqExampleId: "1aac92bf-ddc1-43c1-8624-75b1cca66617",
      traps: [
        {
          title: "Forgetting to halve",
          body:
            "\\(ab + bc + ca\\) is half of \\((a + b + c)^2 - (a^2 + b^2 + c^2)\\). Skipping the half gives double the answer, and that double is often one of the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaith-diff",
      name: "The sum of squared differences",
      intuition:
        "\\((a - b)^2 + (b - c)^2 + (c - a)^2\\) counts every square twice and takes away every pair product twice. So it is twice the gap between \\(a^2 + b^2 + c^2\\) and \\(ab + bc + ca\\).",
      definition:
        "- \\((a - b)^2 + (b - c)^2 + (c - a)^2 = 2(a^2 + b^2 + c^2) - 2(ab + bc + ca)\\).\n" +
        "- So \\(a^2 + b^2 + c^2 - ab - bc - ca = \\frac{1}{2}\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]\\).\n" +
        "- **Numbers close together:** for 71, 73 and 74 the differences are 2, 1 and 3, so \\(a^2 + b^2 + c^2 - ab - bc - ca = \\frac{1}{2}(4 + 1 + 9) = 7\\). No big squares needed.\n" +
        "- Given the sum and the sum of squares, find \\(ab + bc + ca\\) first with the previous concept, then use this one.",
      formula: {
        label: "Sum of squared differences",
        latex:
          "(a - b)^2 + (b - c)^2 + (c - a)^2 = 2(a^2 + b^2 + c^2 - ab - bc - ca)",
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 12\\) and \\(a^2 + b^2 + c^2 = 56\\), find \\((a - b)^2 + (b - c)^2 + (c - a)^2\\).",
        steps: [
          "\\(ab + bc + ca = \\frac{144 - 56}{2} = 44\\).",
          "The sum of squared differences is \\(2(56 - 44) = 24\\).",
          "Check with 2, 4 and 6: \\(4 + 4 + 16 = 24\\).",
        ],
        answer: "24",
      },
      selfCheckExample: {
        prompt: "Find \\(a^2 + b^2 + c^2 - ab - bc - ca\\) when \\(a = 47\\), \\(b = 48\\) and \\(c = 52\\).",
        steps: [
          "The differences are 1, 4 and 5.",
          "\\(\\frac{1}{2}(1 + 16 + 25) = 21\\).",
        ],
        answer: "21",
      },
      practiceSet: [
        {
          prompt: "Write \\((x - y)^2 + (y - z)^2 + (z - x)^2\\) in terms of \\(x^2 + y^2 + z^2\\) and \\(xy + yz + zx\\).",
          answer: "\\(2(x^2 + y^2 + z^2) - 2(xy + yz + zx)\\)",
        },
        {
          prompt: "If \\(p^2 + q^2 + r^2 = 30\\) and \\(pq + qr + rp = 25\\), find \\((p - q)^2 + (q - r)^2 + (r - p)^2\\).",
          answer: "\\(2(30 - 25) = 10\\)",
        },
        {
          prompt: "Find \\(a^2 + b^2 + c^2 - ab - bc - ca\\) when \\(a = 200\\), \\(b = 202\\) and \\(c = 205\\).",
          answer: "\\(\\frac{1}{2}(4 + 9 + 25) = 19\\)",
        },
      ],
      pyqExampleId: "73a76b0c-d9b1-4070-9850-6dc754762d36",
      traps: [
        {
          title: "A sum of squared differences below zero",
          body:
            "\\((a - b)^2 + (b - c)^2 + (c - a)^2\\) is never negative for real numbers. If your working makes it negative, there is a slip in the arithmetic, or no real numbers fit the data.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaith-zero",
      name: "Squares that add to zero, and least values",
      intuition:
        "The square of a real number is zero or positive. If several squares add up to zero, there is no room for any of them to be positive, so every one is zero.",
      definition:
        "- If \\((a - p)^2 + (b - q)^2 + (c - r)^2 = 0\\), then \\(a = p\\), \\(b = q\\) and \\(c = r\\).\n" +
        "- **Complete the squares first:** move every term to one side and group. \\(a^2 - 4a + b^2 + 6b + 13 = 0\\) is \\((a - 2)^2 + (b + 3)^2 = 0\\), so \\(a = 2\\) and \\(b = -3\\).\n" +
        "- **\\(a^2 + b^2 + c^2 = ab + bc + ca\\) means \\(a = b = c\\).** The gap between the two sides is half the sum of squared differences, which is zero only when every difference is.\n" +
        "- Once the numbers are equal, put \\(a = b = c\\) into the expression; the letters cancel and a number is left.\n" +
        "- **Least values:** for positive t, \\(t + \\frac{1}{t} \\ge 2\\), because \\(t + \\frac{1}{t} - 2 = \\left(\\sqrt{t} - \\frac{1}{\\sqrt{t}}\\right)^2\\). For positive x, y and z, \\((x + y + z)\\left(\\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z}\\right) \\ge 9\\), with equality when \\(x = y = z\\).",
      formula: {
        label: "Zero sums of squares and least values",
        latex:
          "a^2 + b^2 + c^2 - ab - bc - ca = 0 \\Rightarrow a = b = c \\qquad t + \\frac{1}{t} \\ge 2 \\ (t > 0) \\qquad (x + y + z)\\left(\\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z}\\right) \\ge 9",
      },
      authoredExample: {
        prompt: "If \\(x^2 + y^2 - 6x + 2y + 10 = 0\\), find \\(x^2 + y^2\\).",
        steps: [
          "Group: \\((x^2 - 6x + 9) + (y^2 + 2y + 1) = 0\\), that is \\((x - 3)^2 + (y + 1)^2 = 0\\).",
          "Both squares are zero: \\(x = 3\\) and \\(y = -1\\).",
          "\\(x^2 + y^2 = 9 + 1 = 10\\).",
        ],
        answer: "10",
      },
      selfCheckExample: {
        prompt: "If \\(p^2 + q^2 + r^2 = pq + qr + rp\\) and p is not zero, find \\(\\frac{(p + q + r)^2}{p^2 + q^2 + r^2}\\).",
        steps: [
          "The condition forces \\(p = q = r\\).",
          "\\(\\frac{(3p)^2}{3p^2} = \\frac{9p^2}{3p^2} = 3\\).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "If \\((a - 4)^2 + (b - 1)^2 = 0\\), find \\(a + b\\).", answer: "5" },
        { prompt: "Write \\(m^2 - 8m + 16\\) as a square.", answer: "\\((m - 4)^2\\)" },
        { prompt: "What is the least value of \\(t + \\frac{1}{t}\\) for positive t?", answer: "2, at \\(t = 1\\)" },
        {
          prompt: "If a, b and c are positive and \\(a + b + c = 3\\), what is the least value of \\(\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c}\\)?",
          answer: "\\(\\frac{9}{3} = 3\\), at \\(a = b = c = 1\\)",
        },
      ],
      pyqExampleId: "63764359-c0a6-4294-ac95-c744b67a6f5c",
      traps: [
        {
          title: "A least value needs the sign",
          body:
            "\\(t + \\frac{1}{t} \\ge 2\\) holds only for positive t. For negative t the sum is \\(-2\\) or less, so a least-value question must say the numbers are positive.",
        },
        {
          title: "Equal values need the condition",
          body:
            "\\(a = b = c\\) follows from \\(a^2 + b^2 + c^2 = ab + bc + ca\\), not from \\(a + b + c = 0\\). Put equal values in only when the given condition forces them.",
        },
      ],
    },
  ],
};
