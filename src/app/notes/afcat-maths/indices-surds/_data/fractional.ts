import type { SubtopicNote } from "@/app/notes/_types";

export const AF_IS_FRACTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Fractional Powers and Roots",
  title: "Fractional Powers, Roots as Powers, and Equations in Powers",
  oneLineDefinition:
    "Read a fractional or decimal index as a root and a power, write every root as an index, and solve an equation by putting both sides on one base.",
  whyItMatters:
    "This is the HARD end of the chapter's index questions: about two in five here are HARD, against a handful on the laws page. They are decimal powers such as a power of 0.25 or 1.5, products of two numbers raised to different decimals, and nested roots. Each one falls to the same two moves: write the base as a power of a prime, and write the index as a fraction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afis-roots-as-powers",
      name: "A root is a fractional power",
      intuition:
        "\\(a^{1/2}\\) multiplied by itself is \\(a^{1/2 + 1/2} = a\\), so \\(a^{1/2}\\) must be the square root. In the same way \\(a^{1/3}\\) is the cube root and \\(a^{1/n}\\) is the \\(n\\)th root. Once a root is a power, the laws of exponents handle it.",
      definition:
        "- \\(\\sqrt[n]{a} = a^{1/n}\\), and \\(\\sqrt{a} = a^{1/2}\\).\n" +
        "- To find \\(a^{1/n}\\), write \\(a\\) as a perfect \\(n\\)th power: \\(32 = 2^5\\), so \\(32^{1/5} = 2\\).\n" +
        "- A root raised to a power: \\(\\left(\\sqrt[n]{a}\\right)^k = a^{k/n}\\).\n" +
        "- A root of a root multiplies the indices: \\(\\sqrt[3]{\\sqrt{a}} = a^{1/6}\\).",
      formula: {
        label: "Root as an index",
        latex: "\\sqrt[n]{a} = a^{1/n}, \\qquad \\sqrt[m]{\\sqrt[n]{a}} = a^{1/(mn)}",
      },
      authoredExample: {
        prompt: "Find \\(125^{1/3}\\) and \\(\\sqrt[3]{\\sqrt{4096}}\\).",
        steps: [
          "\\(125 = 5^3\\), so \\(125^{1/3} = 5\\).",
          "\\(\\sqrt[3]{\\sqrt{4096}} = 4096^{1/6}\\), and \\(4096 = 2^{12}\\).",
          "\\(2^{12 \\times 1/6} = 2^2 = 4\\). (Inside out works too: \\(\\sqrt{4096} = 64\\) and \\(\\sqrt[3]{64} = 4\\).)",
        ],
        answer: "\\(5\\) and \\(4\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\left(\\sqrt[3]{5}\\right)^6\\).",
        steps: ["\\(\\left(5^{1/3}\\right)^6 = 5^{6/3} = 5^2\\)."],
        answer: "\\(25\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt[5]{32}\\).", answer: "\\(2\\)" },
        { prompt: "Find \\(49^{1/2}\\).", answer: "\\(7\\)" },
        { prompt: "Find \\(\\left(10^{1/4}\\right)^4\\).", answer: "\\(10\\)" },
        { prompt: "Find \\(\\sqrt{\\sqrt{625}}\\).", answer: "\\(5\\)", method: "\\(625^{1/4}\\), and \\(625 = 5^4\\)." },
      ],
      pyqExampleId: "c1ccf399-faf9-416f-a6cc-08b298123d7f",
      traps: [
        {
          title: "A half power is a square root, not half",
          body: "\\(36^{1/2} = 6\\), not \\(18\\). The index \\(\\tfrac 12\\) asks for the number that squares to 36.",
        },
        {
          title: "Nested roots multiply their indices",
          body: "\\(\\sqrt[3]{\\sqrt{x}} = x^{1/6}\\), not \\(x^{1/5}\\). A root of a root is a power of a power, so the indices multiply.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-m-over-n",
      name: "Powers like m/n and decimal powers",
      intuition:
        "\\(a^{m/n}\\) is two steps: the \\(n\\)th root, then the \\(m\\)th power. Take the root first and the numbers stay small. A decimal index is only a fraction in disguise, so turn it into one before you start.",
      definition:
        "- \\(a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m\\).\n" +
        "- Decimals to fractions: \\(0.25 = \\tfrac 14\\), \\(0.5 = \\tfrac 12\\), \\(0.75 = \\tfrac 34\\), \\(1.5 = \\tfrac 32\\), \\(2.5 = \\tfrac 52\\), \\(0.6 = \\tfrac 35\\).\n" +
        "- A whole-plus-half index leaves a square root: \\(a^{5/2} = a^2 \\sqrt a\\).\n" +
        "- Two different bases with awkward decimals: rewrite both on **one prime base**, then add the indices. \\(9^{0.3} \\times 27^{0.8}\\) is \\(3^{0.6} \\times 3^{2.4}\\).\n" +
        "- A sum such as \\(a^{m/n} + b^{p/q}\\): find each power on its own, then add.",
      formula: {
        label: "Fractional index",
        latex: "a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}",
      },
      authoredExample: {
        prompt: "Find \\(32^{0.6}\\).",
        steps: [
          "\\(0.6 = \\tfrac 35\\), so \\(32^{0.6} = \\left(\\sqrt[5]{32}\\right)^3\\).",
          "\\(\\sqrt[5]{32} = 2\\), and \\(2^3 = 8\\).",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(9^{0.3} \\times 27^{0.8}\\).",
        steps: [
          "\\(9 = 3^2\\) and \\(27 = 3^3\\), so the product is \\(3^{0.6} \\times 3^{2.4}\\).",
          "\\(0.6 + 2.4 = 3\\), so it is \\(3^3\\).",
        ],
        answer: "\\(27\\).",
      },
      practiceSet: [
        { prompt: "Find \\(125^{2/3}\\).", answer: "\\(25\\)" },
        { prompt: "Find \\(25^{1.5}\\).", answer: "\\(125\\)", method: "\\(\\left(\\sqrt{25}\\right)^3\\)." },
        { prompt: "Find \\(5^{2.5}\\).", answer: "\\(25\\sqrt 5\\)" },
        { prompt: "Find \\(9^{0.7} \\times 3^{0.6}\\).", answer: "\\(9\\)", method: "\\(3^{1.4} \\times 3^{0.6} = 3^2\\)." },
      ],
      pyqExampleId: "1951e28d-4081-44f1-a532-677f1d66b260",
      traps: [
        {
          title: "A decimal index is a fraction, not a divisor",
          body: "\\(x^{0.25}\\) is \\(x^{1/4}\\), the fourth root of \\(x\\). It is not \\(x\\) divided by 4, and \\(625^{0.25} = 5\\), not \\(156.25\\).",
        },
        {
          title: "Same index: multiply bases. Different indices: one base",
          body: "\\(8^{0.2} \\times 4^{0.2} = 32^{0.2} = 2\\), because the indices match. With \\(8^{0.2} \\times 4^{0.3}\\) they do not, so rewrite as \\(2^{0.6} \\times 2^{0.6} = 2^{1.2}\\).",
        },
        {
          title: "Root first keeps the numbers small",
          body: "\\(1000^{2/3}\\): the cube root is 10 and its square is 100. Squaring first means a cube root of a million, which is the same answer the long way.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-fractional-letters",
      name: "Fractional indices on letters",
      intuition:
        "The laws do not care whether the index is a whole number. \\(\\dfrac{x^{5/6}}{x^{1/3}}\\) is still top index minus bottom index; the only extra work is subtracting fractions over a common denominator.",
      definition:
        "- Write every root as an index first: \\(\\sqrt{a^3} = a^{3/2}\\) and \\((\\sqrt a)^3 = a^{3/2}\\) as well.\n" +
        "- Then use the laws: add for a product, subtract for a quotient, multiply for a power of a power.\n" +
        "- Bring fractions to one denominator before adding or subtracting them: \\(\\tfrac 56 - \\tfrac 13 = \\tfrac 56 - \\tfrac 26 = \\tfrac 12\\).\n" +
        "- A letter whose indices cancel to 0 becomes 1.",
      formula: {
        label: "Quotient with fractional indices",
        latex: "\\dfrac{x^{a/b}}{x^{c/d}} = x^{\\frac ab - \\frac cd}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{p^{5/6}\\, q^{4/5}}{p^{1/3}\\, q^{2/5}}\\).",
        steps: [
          "For \\(p\\): \\(\\tfrac 56 - \\tfrac 26 = \\tfrac 36 = \\tfrac 12\\).",
          "For \\(q\\): \\(\\tfrac 45 - \\tfrac 25 = \\tfrac 25\\).",
        ],
        answer: "\\(p^{1/2}\\, q^{2/5}\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\dfrac{\\sqrt[3]{m^5}}{\\sqrt[3]{m^2}}\\).",
        steps: ["\\(\\dfrac{m^{5/3}}{m^{2/3}} = m^{3/3} = m\\)."],
        answer: "\\(m\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\left(\\sqrt[4]{x}\\right)^8\\).", answer: "\\(x^2\\)" },
        { prompt: "Simplify \\(x^{2/5} \\times x^{3/5}\\).", answer: "\\(x\\)" },
        { prompt: "Simplify \\(\\dfrac{(\\sqrt y)^5}{y^2}\\).", answer: "\\(\\sqrt y\\)", method: "\\(y^{5/2 - 2} = y^{1/2}\\)." },
        { prompt: "Simplify \\(\\left(a^{3/4}\\right)^{4/3}\\).", answer: "\\(a\\)" },
      ],
      pyqExampleId: "f944ae0f-1ca1-4fee-9da8-09245f5b31a1",
      traps: [
        {
          title: "The root of a cube is a three-halves power",
          body: "\\(\\sqrt{a^3} = a^{3/2}\\), not \\(a^{3}/2\\) and not \\(a^{6}\\). The root divides the index by 2.",
        },
        {
          title: "Subtract fractions over one denominator",
          body: "\\(\\tfrac 45 - \\tfrac 13\\) is \\(\\tfrac{12 - 5}{15} = \\tfrac{7}{15}\\). Subtracting tops and bottoms separately gives \\(\\tfrac 32\\), which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-power-equations",
      name: "Equations in powers and in square roots",
      intuition:
        "If \\(2^x = 2^5\\), then \\(x = 5\\): equal powers of the same base have equal indices. So rewrite both sides on one base and compare indices. An equation with a square root is the other way round: get the root alone, then square it away.",
      definition:
        "- **Unknown in the index:** write both sides as powers of one prime, then equate indices. A square root on the right is a half power: \\(9\\sqrt 3 = 3^{2.5}\\).\n" +
        "- **Unknown under a root:** move everything else to the other side first, then square both sides.\n" +
        "- Put the answer back into the original equation. Squaring can create a value that does not fit.",
      formula: {
        label: "Equal powers of one base",
        latex: "a^{x} = a^{k} \\;\\Rightarrow\\; x = k \\quad (a > 0,\\ a \\ne 1)",
      },
      authoredExample: {
        prompt: "Solve \\(4^{x+1} = 32\\).",
        steps: [
          "Both are powers of 2: \\(2^{2(x+1)} = 2^5\\).",
          "\\(2x + 2 = 5\\), so \\(x = \\tfrac 32\\).",
        ],
        answer: "\\(x = 1.5\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sqrt{2x + 3} = 5\\).",
        steps: [
          "Square both sides: \\(2x + 3 = 25\\), so \\(x = 11\\).",
          "Check: \\(\\sqrt{25} = 5\\).",
        ],
        answer: "\\(x = 11\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(2^{3x} = 64\\).", answer: "\\(x = 2\\)" },
        { prompt: "Solve \\(5^{x} = 25\\sqrt 5\\).", answer: "\\(x = 2.5\\)" },
        { prompt: "Solve \\(\\sqrt{x - 4} + 2 = 6\\).", answer: "\\(x = 20\\)" },
        { prompt: "Solve \\(\\sqrt{3x + 1} = 4\\).", answer: "\\(x = 5\\)" },
      ],
      pyqExampleId: "8dc4b9d9-3b11-47d1-8630-9da5af28bb43",
      traps: [
        {
          title: "Isolate the root before squaring",
          body: "In \\(\\sqrt{x + 1} + 2 = 5\\), first get \\(\\sqrt{x + 1} = 3\\), so \\(x = 8\\). Squaring the left side as it stands does not remove the root.",
        },
        {
          title: "Match the bases before matching indices",
          body: "\\(4^x = 8\\) does not give \\(x = 2\\). Write it as \\(2^{2x} = 2^3\\), so \\(x = 1.5\\).",
        },
      ],
    },
  ],
};
