import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Cubes and Higher Powers of x ± 1/x",
  title: "Cubes and Higher Powers of x ± 1/x",
  oneLineDefinition:
    "Cubes of x ± 1/x, sixth and eighth powers built from squares and cubes, and the product rule that gives fifth and seventh powers.",
  whyItMatters:
    "30 questions in the bank, and all six HARD questions of the chapter sit on this page. They are long only in arithmetic: each higher power comes from two smaller ones by one product rule. Write the small values (x + 1/x, x² + 1/x², x³ + 1/x³) in a row first, and every higher power is a product of two of them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscaipw-cube",
      name: "Cubing x + 1/x and x − 1/x",
      intuition:
        "Cubing \\(x + \\frac{1}{x}\\) gives \\(x^3 + \\frac{1}{x^3}\\) plus 3 times \\(x + \\frac{1}{x}\\), because \\(x \\times \\frac{1}{x} = 1\\) again. Take the extra away and the cube is done.",
      definition:
        "- \\(x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right)\\). This is \\(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\\) with \\(ab = 1\\).\n" +
        "- \\(x^3 - \\frac{1}{x^3} = \\left(x - \\frac{1}{x}\\right)^3 + 3\\left(x - \\frac{1}{x}\\right)\\).\n" +
        "- Another route, handy when \\(x^2 + \\frac{1}{x^2}\\) is known: \\(x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)\\left(x^2 + \\frac{1}{x^2} - 1\\right)\\) and \\(x^3 - \\frac{1}{x^3} = \\left(x - \\frac{1}{x}\\right)\\left(x^2 + \\frac{1}{x^2} + 1\\right)\\).\n" +
        "- **Terms that multiply to k:** for \\(x + \\frac{k}{x}\\), \\(x^3 + \\frac{k^3}{x^3} = \\left(x + \\frac{k}{x}\\right)^3 - 3k\\left(x + \\frac{k}{x}\\right)\\).\n" +
        "- **Backwards:** given \\(x^3 + \\frac{1}{x^3}\\), put each option t into \\(t^3 - 3t\\) and keep the one that matches. For positive x, t is at least 2.\n" +
        "- If you are given \\(x^2 + \\frac{1}{x^2}\\) or \\(x^2 - \\frac{1}{x^2}\\), first climb down to \\(x \\pm \\frac{1}{x}\\) with the ladder and the sign rule from the previous page.",
      formula: {
        label: "Cubes of x ± 1/x",
        latex:
          "x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right) \\qquad x^3 - \\frac{1}{x^3} = \\left(x - \\frac{1}{x}\\right)^3 + 3\\left(x - \\frac{1}{x}\\right) \\qquad x^3 + \\frac{k^3}{x^3} = \\left(x + \\frac{k}{x}\\right)^3 - 3k\\left(x + \\frac{k}{x}\\right)",
      },
      authoredExample: {
        prompt: "If \\(x + \\frac{1}{x} = 3\\), find \\(x^3 + \\frac{1}{x^3}\\).",
        steps: [
          "\\(x^3 + \\frac{1}{x^3} = 3^3 - 3 \\times 3 = 27 - 9 = 18\\).",
          "Check the other route: \\(x^2 + \\frac{1}{x^2} = 7\\), and \\(3 \\times (7 - 1) = 18\\).",
        ],
        answer: "18",
      },
      selfCheckExample: {
        prompt: "If \\(y - \\frac{1}{y} = 5\\), find \\(y^3 - \\frac{1}{y^3}\\).",
        steps: [
          "\\(y^3 - \\frac{1}{y^3} = 5^3 + 3 \\times 5 = 125 + 15 = 140\\).",
          "Check: \\(y^2 + \\frac{1}{y^2} = 27\\), and \\(5 \\times (27 + 1) = 140\\).",
        ],
        answer: "140",
      },
      practiceSet: [
        { prompt: "If \\(a + \\frac{1}{a} = 6\\), find \\(a^3 + \\frac{1}{a^3}\\).", answer: "\\(216 - 18 = 198\\)" },
        { prompt: "If \\(m - \\frac{1}{m} = 2\\), find \\(m^3 - \\frac{1}{m^3}\\).", answer: "\\(8 + 6 = 14\\)" },
        {
          prompt: "If \\(x + \\frac{3}{x} = 4\\), find \\(x^3 + \\frac{27}{x^3}\\).",
          answer: "\\(64 - 3 \\times 3 \\times 4 = 28\\)",
        },
        {
          prompt: "If \\(x^2 + \\frac{1}{x^2} = 14\\) and \\(x > 0\\), find \\(x^3 + \\frac{1}{x^3}\\).",
          answer: "\\(x + \\frac{1}{x} = 4\\), so \\(4 \\times 13 = 52\\)",
        },
      ],
      pyqExampleId: "500703e9-573a-4bce-91dc-164557a35ad5",
      traps: [
        {
          title: "Minus 3 times what",
          body:
            "\\(x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right)\\), never \\(\\left(x + \\frac{1}{x}\\right)^3 - 3\\). With \\(x + \\frac{1}{x} = 4\\) the answer is 52, not 61.",
        },
        {
          title: "The sign in the difference cube",
          body:
            "\\(x^3 - \\frac{1}{x^3} = \\left(x - \\frac{1}{x}\\right)^3 + 3\\left(x - \\frac{1}{x}\\right)\\): plus 3 times, not minus. The sum form and the difference form have opposite corrections.",
        },
        {
          title: "Terms that do not multiply to 1",
          body:
            "For \\(x + \\frac{5}{x}\\) the two terms multiply to 5, so the correction is \\(3 \\times 5 \\times \\left(x + \\frac{5}{x}\\right)\\). Using 3 instead of 15 gives a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaipw-even",
      name: "Sixth and eighth powers of x ± 1/x",
      intuition:
        "An even power is a square of a smaller one or a cube of a smaller one, so \\(x^6 + \\frac{1}{x^6}\\) can be reached two ways. A difference such as \\(x^8 - \\frac{1}{x^8}\\) keeps splitting as a difference of squares until only known pieces are left.",
      definition:
        "- \\(x^6 + \\frac{1}{x^6} = \\left(x^3 + \\frac{1}{x^3}\\right)^2 - 2\\), or \\(\\left(x^2 + \\frac{1}{x^2}\\right)^3 - 3\\left(x^2 + \\frac{1}{x^2}\\right)\\). The second is quicker when you start from \\(x - \\frac{1}{x}\\), since \\(x^2 + \\frac{1}{x^2}\\) comes first.\n" +
        "- \\(x^6 - \\frac{1}{x^6} = \\left(x^3 + \\frac{1}{x^3}\\right)\\left(x^3 - \\frac{1}{x^3}\\right)\\), or \\(\\left(x^2 - \\frac{1}{x^2}\\right)\\left(x^4 + 1 + \\frac{1}{x^4}\\right)\\).\n" +
        "- \\(x^8 - \\frac{1}{x^8} = \\left(x^4 + \\frac{1}{x^4}\\right)\\left(x^4 - \\frac{1}{x^4}\\right) = \\left(x^4 + \\frac{1}{x^4}\\right)\\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^2 - \\frac{1}{x^2}\\right)\\).\n" +
        "- **A mixed expression** such as \\(x^6 + \\frac{1}{x^6} - 2\\left(x^2 + \\frac{1}{x^2}\\right)\\) is each rung worked out, then added. Write the rungs in a row first.\n" +
        "- **The sign:** a difference of powers has the sign of \\(x - \\frac{1}{x}\\). With \\(x > 1\\) it is positive.",
      formula: {
        label: "Sixth and eighth powers",
        latex:
          "x^6 + \\frac{1}{x^6} = \\left(x^3 + \\frac{1}{x^3}\\right)^2 - 2 \\qquad x^6 + \\frac{1}{x^6} = \\left(x^2 + \\frac{1}{x^2}\\right)^3 - 3\\left(x^2 + \\frac{1}{x^2}\\right) \\qquad x^8 - \\frac{1}{x^8} = \\left(x^4 + \\frac{1}{x^4}\\right)\\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^2 - \\frac{1}{x^2}\\right)",
      },
      authoredExample: {
        prompt: "If \\(x + \\frac{1}{x} = 3\\), find \\(x^6 + \\frac{1}{x^6}\\) by both routes.",
        steps: [
          "The rungs: \\(x^2 + \\frac{1}{x^2} = 9 - 2 = 7\\) and \\(x^3 + \\frac{1}{x^3} = 27 - 9 = 18\\).",
          "Square of the cube: \\(18^2 - 2 = 324 - 2 = 322\\).",
          "Cube of the square: \\(7^3 - 3 \\times 7 = 343 - 21 = 322\\). The two routes agree.",
        ],
        answer: "322",
      },
      selfCheckExample: {
        prompt: "If \\(x - \\frac{1}{x} = 1\\) and \\(x > 1\\), find \\(x^8 - \\frac{1}{x^8}\\).",
        steps: [
          "\\(x^2 + \\frac{1}{x^2} = 1 + 2 = 3\\), and \\(\\left(x + \\frac{1}{x}\\right)^2 = 1 + 4 = 5\\), so \\(x + \\frac{1}{x} = \\sqrt{5}\\).",
          "\\(x^2 - \\frac{1}{x^2} = \\sqrt{5} \\times 1 = \\sqrt{5}\\), and \\(x^4 + \\frac{1}{x^4} = 9 - 2 = 7\\).",
          "\\(x^8 - \\frac{1}{x^8} = 7 \\times 3 \\times \\sqrt{5} = 21\\sqrt{5}\\).",
        ],
        answer: "\\(21\\sqrt{5}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(a + \\frac{1}{a} = \\sqrt{6}\\), find \\(a^6 + \\frac{1}{a^6}\\).",
          answer: "\\(a^2 + \\frac{1}{a^2} = 4\\), so \\(64 - 12 = 52\\)",
        },
        { prompt: "If \\(p^3 + \\frac{1}{p^3} = 10\\), find \\(p^6 + \\frac{1}{p^6}\\).", answer: "\\(100 - 2 = 98\\)" },
        {
          prompt: "If \\(x^3 + \\frac{1}{x^3} = 5\\) and \\(x^3 - \\frac{1}{x^3} = \\sqrt{21}\\), find \\(x^6 - \\frac{1}{x^6}\\).",
          answer: "\\(5\\sqrt{21}\\)",
        },
        {
          prompt: "If \\(m + \\frac{1}{m} = 3\\), find \\(m^4 + \\frac{1}{m^4} - \\left(m^2 + \\frac{1}{m^2}\\right)\\).",
          answer: "\\(47 - 7 = 40\\)",
        },
      ],
      pyqExampleId: "f1876b28-de18-4386-8193-29924bf4758e",
      traps: [
        {
          title: "The wrong correction when cubing a square",
          body:
            "\\(x^6 + \\frac{1}{x^6} = \\left(x^2 + \\frac{1}{x^2}\\right)^3 - 3\\left(x^2 + \\frac{1}{x^2}\\right)\\). The correction uses \\(x^2 + \\frac{1}{x^2}\\), the thing being cubed, not \\(x + \\frac{1}{x}\\).",
        },
        {
          title: "A missing factor in an eighth-power difference",
          body:
            "\\(x^8 - \\frac{1}{x^8}\\) splits into three known pieces: \\(x^4 + \\frac{1}{x^4}\\), \\(x^2 + \\frac{1}{x^2}\\) and \\(x^2 - \\frac{1}{x^2}\\). Stopping after the first two leaves out the difference, which carries the surd.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaipw-odd",
      name: "Fifth and seventh powers by multiplying two smaller ones",
      intuition:
        "Multiply \\(x^2 + \\frac{1}{x^2}\\) by \\(x^3 + \\frac{1}{x^3}\\) and you get \\(x^5 + \\frac{1}{x^5}\\) plus two cross terms, \\(x + \\frac{1}{x}\\). The powers add on the outside and subtract on the inside, so take the inside pair away.",
      definition:
        "- \\(\\left(x^m + \\frac{1}{x^m}\\right)\\left(x^n + \\frac{1}{x^n}\\right) = \\left(x^{m+n} + \\frac{1}{x^{m+n}}\\right) + \\left(x^{m-n} + \\frac{1}{x^{m-n}}\\right)\\).\n" +
        "- So \\(x^5 + \\frac{1}{x^5} = \\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^3 + \\frac{1}{x^3}\\right) - \\left(x + \\frac{1}{x}\\right)\\), and \\(x^7 + \\frac{1}{x^7} = \\left(x^3 + \\frac{1}{x^3}\\right)\\left(x^4 + \\frac{1}{x^4}\\right) - \\left(x + \\frac{1}{x}\\right)\\).\n" +
        "- For a difference: \\(x^5 - \\frac{1}{x^5} = \\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^3 - \\frac{1}{x^3}\\right) - \\left(x - \\frac{1}{x}\\right)\\).\n" +
        "- **Check two ways:** \\(x^5 + \\frac{1}{x^5}\\) is also \\(\\left(x + \\frac{1}{x}\\right)\\left(x^4 + \\frac{1}{x^4}\\right) - \\left(x^3 + \\frac{1}{x^3}\\right)\\). If both agree, the arithmetic is right.\n" +
        "- The options often differ only in the last digits, so do the final subtraction carefully: the unit digit alone usually settles it.",
      formula: {
        label: "Product rule for powers of x ± 1/x",
        latex:
          "\\left(x^m + \\frac{1}{x^m}\\right)\\left(x^n + \\frac{1}{x^n}\\right) = x^{m+n} + \\frac{1}{x^{m+n}} + x^{m-n} + \\frac{1}{x^{m-n}} \\qquad x^5 + \\frac{1}{x^5} = \\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^3 + \\frac{1}{x^3}\\right) - \\left(x + \\frac{1}{x}\\right)",
      },
      authoredExample: {
        prompt: "If \\(x + \\frac{1}{x} = 3\\), find \\(x^5 + \\frac{1}{x^5}\\).",
        steps: [
          "The rungs: \\(x^2 + \\frac{1}{x^2} = 7\\), \\(x^3 + \\frac{1}{x^3} = 18\\).",
          "\\(x^5 + \\frac{1}{x^5} = 7 \\times 18 - 3 = 126 - 3 = 123\\).",
          "Check: \\(x^4 + \\frac{1}{x^4} = 47\\), and \\(3 \\times 47 - 18 = 141 - 18 = 123\\).",
        ],
        answer: "123",
      },
      selfCheckExample: {
        prompt: "If \\(y + \\frac{1}{y} = 4\\), find \\(y^5 + \\frac{1}{y^5}\\).",
        steps: [
          "\\(y^2 + \\frac{1}{y^2} = 14\\) and \\(y^3 + \\frac{1}{y^3} = 64 - 12 = 52\\).",
          "\\(y^5 + \\frac{1}{y^5} = 14 \\times 52 - 4 = 728 - 4 = 724\\).",
          "Check: \\(y^4 + \\frac{1}{y^4} = 194\\), and \\(4 \\times 194 - 52 = 724\\).",
        ],
        answer: "724",
      },
      practiceSet: [
        {
          prompt: "Expand \\(\\left(x^4 + \\frac{1}{x^4}\\right)\\left(x + \\frac{1}{x}\\right)\\).",
          answer: "\\(x^5 + \\frac{1}{x^5} + x^3 + \\frac{1}{x^3}\\)",
        },
        {
          prompt: "If \\(x + \\frac{1}{x} = \\sqrt{7}\\), \\(x^2 + \\frac{1}{x^2} = 5\\) and \\(x^3 + \\frac{1}{x^3} = 4\\sqrt{7}\\), find \\(x^5 + \\frac{1}{x^5}\\).",
          answer: "\\(5 \\times 4\\sqrt{7} - \\sqrt{7} = 19\\sqrt{7}\\)",
        },
        {
          prompt: "If \\(p - \\frac{1}{p} = 1\\), find \\(p^5 - \\frac{1}{p^5}\\).",
          answer: "\\(p^2 + \\frac{1}{p^2} = 3\\), \\(p^3 - \\frac{1}{p^3} = 4\\), so \\(3 \\times 4 - 1 = 11\\)",
        },
        {
          prompt: "If \\(x + \\frac{1}{x} = 3\\), find \\(x^7 + \\frac{1}{x^7}\\).",
          answer: "\\(18 \\times 47 - 3 = 843\\)",
        },
      ],
      pyqExampleId: "6adcd950-427c-49ae-a762-2b958c16d8c9",
      traps: [
        {
          title: "Taking away the wrong rung",
          body:
            "In \\(\\left(x^2 + \\frac{1}{x^2}\\right)\\left(x^3 + \\frac{1}{x^3}\\right)\\), the extra pair is \\(x^1 + \\frac{1}{x^1}\\), because \\(3 - 2 = 1\\). Take away the power equal to the difference of the two you multiplied, not one of them.",
        },
      ],
    },
  ],
};
