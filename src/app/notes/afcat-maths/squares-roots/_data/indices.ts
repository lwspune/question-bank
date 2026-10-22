import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SQ_INDICES_NOTE: SubtopicNote = {
  subtopicName: "Fractional Powers and Indices",
  title: "Roots as Fractional Powers, and the Laws of Indices",
  oneLineDefinition:
    "Write a root as a fractional power and back, combine powers of one base with the laws of indices, compare roots of different kinds, and solve equations where powers are equal.",
  whyItMatters:
    "Most of this page turns a root into a power, or a power into a root, and then uses the laws of indices. The harder questions set several powers equal to one number. Marks go on reading the top of a fractional power as the root, and on multiplying indices that should be added.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsq-fractional-power",
      name: "A root as a fractional power",
      intuition:
        "A fractional power is a root and a power in one: the bottom of the fraction says which root, the top says which power. A square root is the power one half, a cube root the power one third.",
      definition:
        "- \\(a^{1/n} = \\sqrt[n]{a}\\) and \\(a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m\\).\n" +
        "- Take the root first when the number is a perfect power, so the numbers stay small: \\(27^{2/3} = 3^2 = 9\\).\n" +
        "- For whole numbers, \\(\\sqrt[n]{m}\\) is a whole number when \\(m\\) is a perfect \\(n\\)th power, and irrational otherwise: \\(\\sqrt[3]{16}\\) is irrational.",
      formula: {
        label: "Fractional power",
        latex: "a^{m/n} = \\sqrt[n]{a^m} = \\left(\\sqrt[n]{a}\\right)^m",
      },
      authoredExample: {
        prompt: "Find \\(81^{3/4}\\) and \\(25^{3/2}\\).",
        steps: [
          "\\(81^{1/4} = 3\\), so \\(81^{3/4} = 3^3 = 27\\).",
          "\\(25^{1/2} = 5\\), so \\(25^{3/2} = 5^3 = 125\\).",
        ],
        answer: "\\(27\\) and \\(125\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(\\sqrt[5]{x^2}\\) as a power of \\(x\\), and \\(7^{3/4}\\) as a root.",
        steps: [
          "The root is the bottom of the fraction and the power is the top.",
        ],
        answer: "\\(x^{2/5}\\); \\(\\sqrt[4]{7^3}\\).",
      },
      practiceSet: [
        { prompt: "Find \\(36^{1/2} + 64^{1/3}\\).", answer: "\\(10\\)" },
        { prompt: "Find \\(125^{2/3}\\).", answer: "\\(25\\)" },
        { prompt: "Find \\(9^{5/2}\\).", answer: "\\(243\\)", method: "\\(3^5\\)." },
        { prompt: "Write \\(\\sqrt{y^3}\\) as a power of \\(y\\).", answer: "\\(y^{3/2}\\)" },
      ],
      pyqExampleId: "2d2ec48b-74a6-4aa9-b896-2e2ecd48f0d6",
      traps: [
        {
          title: "The bottom is the root",
          body: "\\(x^{2/3}\\) is the cube root of \\(x^2\\), not the square root of \\(x^3\\), which is \\(x^{3/2}\\).",
        },
        {
          title: "A half power is not half",
          body: "\\(36^{1/2} = 6\\), not 18. The power one half takes a square root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-index-laws",
      name: "The laws of indices",
      intuition:
        "Powers of the same base combine by their indices: multiplying adds them, dividing subtracts them, and a power of a power multiplies them. With roots written as fractional powers, the same laws handle roots.",
      definition:
        "- \\(a^m \\times a^n = a^{m + n}\\), \\(a^m \\div a^n = a^{m - n}\\) and \\((a^m)^n = a^{mn}\\).\n" +
        "- \\(a^0 = 1\\) and \\(a^{-n} = \\dfrac{1}{a^n}\\).\n" +
        "- A root inside a root multiplies the indices: \\(\\sqrt{\\sqrt[3]{a}} = a^{1/6}\\).\n" +
        "- To compare roots of different kinds, raise them all to the LCM of the roots. For \\(\\sqrt 2\\) and \\(\\sqrt[3]{3}\\), the 6th powers are 8 and 9, so \\(\\sqrt[3]{3}\\) is the larger.\n" +
        "- Halving again and again is a power of 2: halving 6 times multiplies by \\(2^{-6}\\).",
      formula: {
        label: "Laws of indices",
        latex: "a^m a^n = a^{m + n}, \\quad \\dfrac{a^m}{a^n} = a^{m - n}, \\quad (a^m)^n = a^{mn}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{5\\sqrt{5\\sqrt 5}}\\) to a single power of 5.",
        steps: [
          "Inside first: \\(\\sqrt 5 = 5^{1/2}\\).",
          "\\(5\\sqrt 5 = 5^{3/2}\\), and its square root is \\(5^{3/4}\\).",
          "\\(5 \\times 5^{3/4} = 5^{7/4}\\), and its square root is \\(5^{7/8}\\).",
        ],
        answer: "\\(5^{7/8}\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(x^{2/3} \\times x^{1/4}\\).",
        steps: ["Add the indices: \\(\\tfrac 23 + \\tfrac 14 = \\tfrac{8}{12} + \\tfrac{3}{12} = \\tfrac{11}{12}\\)."],
        answer: "\\(x^{11/12}\\).",
      },
      practiceSet: [
        {
          prompt: "Simplify \\((\\sqrt 3)^{-3} \\times (\\sqrt 3)^{-1}\\).",
          answer: "\\(\\tfrac 19\\)",
          method: "\\((\\sqrt 3)^{-4} = 3^{-2}\\).",
        },
        { prompt: "Which is larger, \\(\\sqrt 3\\) or \\(\\sqrt[3]{5}\\)?", answer: "\\(\\sqrt 3\\)", method: "6th powers: 27 and 25." },
        {
          prompt: "A ball dropped from 32 m rises to half its previous height after each bounce. How high does it rise after the 8th bounce?",
          answer: "\\(2^{-3}\\) m, that is \\(\\tfrac 18\\) m",
          method: "\\(\\dfrac{2^5}{2^8}\\).",
        },
        { prompt: "Simplify \\(\\dfrac{a^{5/2}}{a^{1/2}}\\).", answer: "\\(a^2\\)" },
      ],
      pyqExampleId: "08c24d90-d174-4a81-9266-6842e365dea6",
      traps: [
        {
          title: "Add, do not multiply",
          body: "\\(x^{1/2} \\times x^{1/4} = x^{3/4}\\), not \\(x^{1/8}\\). Multiplying powers of one base adds the indices.",
        },
        {
          title: "A negative index is not a negative number",
          body: "\\(5^{-2} = \\tfrac{1}{25}\\), a positive number, not \\(-25\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-index-equations",
      name: "Equations with equal powers",
      intuition:
        "When two powers of the same base are equal, their indices are equal. When several powers all equal one number \\(k\\), write each base as a power of \\(k\\), and a product of bases becomes a sum of indices.",
      definition:
        "- \\(a^x = a^y\\) means \\(x = y\\) (for \\(a > 0\\), \\(a \\neq 1\\)). Write both sides in one base first: \\(2^{0.5x} = 32 = 2^5\\) gives \\(x = 10\\).\n" +
        "- If \\(a^x = b^y = k\\), then \\(a = k^{1/x}\\) and \\(b = k^{1/y}\\), so \\(ab = k^{1/x + 1/y}\\) and \\(\\dfrac ab = k^{1/x - 1/y}\\).\n" +
        "- Build a new number out of the known ones: if \\(5^p = 2\\) and \\(5^q = 3\\), then \\(6 = 2 \\times 3\\) gives \\(5^{p + q} = 6\\).",
      formula: {
        label: "Equal powers",
        latex: "a^x = b^y = k \\;\\Rightarrow\\; a = k^{1/x},\\ b = k^{1/y}",
      },
      authoredExample: {
        prompt: "If \\(2^x = 3^y = 6^z\\), find \\(z\\) in terms of \\(x\\) and \\(y\\).",
        steps: [
          "Let each power be \\(k\\). Then \\(2 = k^{1/x}\\), \\(3 = k^{1/y}\\) and \\(6 = k^{1/z}\\).",
          "\\(2 \\times 3 = 6\\) gives \\(k^{1/x + 1/y} = k^{1/z}\\), so \\(\\dfrac 1z = \\dfrac 1x + \\dfrac 1y\\).",
          "So \\(z = \\dfrac{xy}{x + y}\\).",
        ],
        answer: "\\(z = \\dfrac{xy}{x + y}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(3^{x + 1} = 81\\), find \\(x\\).",
        steps: ["\\(81 = 3^4\\), so \\(x + 1 = 4\\)."],
        answer: "\\(x = 3\\).",
      },
      practiceSet: [
        { prompt: "If \\(4^x = 8\\), find \\(x\\).", answer: "\\(\\tfrac 32\\)", method: "\\(2^{2x} = 2^3\\)." },
        { prompt: "If \\(M = 3^{0.2}\\) and \\(M^b = 27\\), find \\(b\\).", answer: "\\(15\\)", method: "\\(0.2b = 3\\)." },
        {
          prompt: "If \\(10^a = 2\\) and \\(10^b = 3\\), and \\(10^c = 12\\), write \\(c\\) in terms of \\(a\\) and \\(b\\).",
          answer: "\\(c = 2a + b\\)",
          method: "\\(12 = 2^2 \\times 3\\).",
        },
      ],
      pyqExampleId: "f4edf191-b901-4150-bce9-0209b69adc94",
      traps: [
        {
          title: "Same base first",
          body: "\\(4^x = 2^6\\) does not give \\(x = 6\\). Write 4 as \\(2^2\\): \\(2^{2x} = 2^6\\), so \\(x = 3\\).",
        },
        {
          title: "A product becomes a sum",
          body: "If \\(a = k^{1/x}\\) and \\(b = k^{1/y}\\), then \\(ab = k^{1/x + 1/y}\\), not \\(k^{1/(xy)}\\).",
        },
      ],
    },
  ],
};
