import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_SI_INDICES_NOTE: SubtopicNote = {
  subtopicName: "Indices and Square Roots",
  title: "Indices and Square Roots",
  oneLineDefinition:
    "Powers of the same base add when multiplied and subtract when divided; roots of decimals and large numbers come quickly once the perfect power inside is spotted, and roots of different orders compare at a common power.",
  whyItMatters:
    "12 questions in the Tier II bank, 8 EASY and 4 MODERATE. The MODERATE ones need a number broken into primes or two roots raised to the same power before they can be compared.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2siin-laws",
      name: "Laws of indices",
      intuition:
        "A power counts repeated multiplication, so multiplying powers of the same base adds the counts and dividing subtracts them. Every other rule follows from that one idea.",
      definition:
        "- \\(a^m \\times a^n = a^{m+n}\\); \\(a^m \\div a^n = a^{m-n}\\); \\((a^m)^n = a^{mn}\\).\n" +
        "- \\(a^0 = 1\\); \\(a^{-n} = \\frac{1}{a^n}\\); \\(a^{1/n}\\) is the n-th root of a.\n" +
        "- To match a product with \\(2^a 3^b 5^c\\cdots\\), break every number into primes and count each prime's power.\n" +
        "- With two unknown powers such as \\(2^x\\) and \\(3^y\\), call them u and v and solve the two linear equations.",
      formula: {
        label: "Laws of indices",
        latex: "a^m a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}, \\quad a^{-n} = \\frac{1}{a^n}",
      },
      authoredExample: {
        prompt: "If \\(72 \\times 108 = 2^a \\times 3^b\\), find \\(a + b\\).",
        steps: ["\\(72 = 2^3 \\times 3^2\\) and \\(108 = 2^2 \\times 3^3\\).", "So \\(a = 5\\), \\(b = 5\\), and \\(a + b = 10\\)."],
        answer: "10",
      },
      selfCheckExample: {
        prompt: "If \\(3^x + 2^y = 31\\) and \\(3^{x - 1} - 2^y = 5\\), find x and y.",
        steps: [
          "Let \\(u = 3^x\\), \\(v = 2^y\\): \\(u + v = 31\\) and \\(\\frac{u}{3} - v = 5\\).",
          "Adding: \\(\\frac{4u}{3} = 36\\), so \\(u = 27\\) and \\(v = 4\\): \\(x = 3\\), \\(y = 2\\).",
        ],
        answer: "\\(x = 3, y = 2\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\frac{x^5 y^2 z^3}{x^2 y^4 z^3}\\).", answer: "\\(x^3 y^{-2}\\)" },
        { prompt: "Find \\((0.5)^{-2}\\).", answer: "4" },
        { prompt: "Find \\(8^{2/3}\\).", answer: "4" },
      ],
      pyqExampleId: "12d35aed-16be-48a6-a23b-9608474bd102",
      traps: [
        {
          title: "Multiplying the bases",
          body: "\\(2^3 \\times 2^4 = 2^7\\), not \\(4^7\\). The base stays the same; only the powers add.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2siin-roots",
      name: "Square roots, cube roots and comparing roots",
      intuition:
        "Roots of decimals and big numbers are quick once you see the perfect power inside: 29.16 is \\(5.4^2\\), 6859 is \\(19^3\\). To compare roots of different orders, raise them all to the same power.",
      definition:
        "- \\(\\sqrt{ab} = \\sqrt{a}\\sqrt{b}\\) and \\(\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}\\): pair numbers so that their product is a perfect square.\n" +
        "- A decimal's square root has half as many decimal places: \\(\\sqrt{0.0036} = 0.06\\).\n" +
        "- Know the squares to 30 and the cubes to 20 (\\(12^3 = 1728\\), \\(19^3 = 6859\\)).\n" +
        "- To compare \\(\\sqrt[3]{12}\\) with \\(\\sqrt[5]{60}\\), raise both to the 15th power: \\(12^5\\) against \\(60^3\\).",
      formula: {
        label: "Roots of products and quotients",
        latex: "\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}, \\quad \\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{1.44} + \\sqrt[3]{0.343} - \\sqrt{0.0049}\\).",
        steps: ["\\(\\sqrt{1.44} = 1.2\\), \\(\\sqrt[3]{0.343} = 0.7\\), \\(\\sqrt{0.0049} = 0.07\\).", "\\(1.2 + 0.7 - 0.07 = 1.83\\)."],
        answer: "1.83",
      },
      selfCheckExample: {
        prompt: "Which is larger, \\(\\sqrt{3}\\) or \\(\\sqrt[3]{5}\\)?",
        steps: ["Raise both to the 6th power: \\((\\sqrt{3})^6 = 27\\) and \\((\\sqrt[3]{5})^6 = 25\\).", "27 is larger, so \\(\\sqrt{3}\\) is larger."],
        answer: "\\(\\sqrt{3}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{2.25} \\times \\sqrt{0.04}\\).", answer: "0.3" },
        { prompt: "Find \\(\\sqrt[3]{4913}\\).", answer: "17" },
        { prompt: "Find \\(\\sqrt{32} \\times \\sqrt{8}\\).", answer: "16" },
      ],
      pyqExampleId: "7b7bcd10-27f3-4825-baeb-864173d61719",
      traps: [
        {
          title: "Halving the decimal places wrongly",
          body: "\\(\\sqrt{0.09} = 0.3\\), not 0.03: check by squaring, \\(0.3 \\times 0.3 = 0.09\\).",
        },
      ],
    },
  ],
};
