import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_INDICES_NOTE: SubtopicNote = {
  subtopicName: "Laws of Indices",
  title: "Laws of Indices",
  oneLineDefinition:
    "Powers of the same base multiply by adding exponents and nest by multiplying them; when several powers are equal, call the common value k.",
  whyItMatters:
    "Sixteen PYQs, the largest page in the chapter. They fall into three kinds: chains like x = y^a, y = z^b that close up into one exponent equation; the a^x = b^y = c^z family, solved by naming the common value; and comparisons of large powers, solved by raising to a common power.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-index-laws",
      name: "The index laws",
      intuition:
        "Everything follows from counting factors: \\(a^m a^n\\) is \\(m + n\\) factors, \\((a^m)^n\\) is \\(mn\\) factors. Rewrite every term with one base, add or multiply the exponents, and compare.",
      definition:
        "- \\(a^m a^n = a^{m + n}\\), \\(\\dfrac{a^m}{a^n} = a^{m - n}\\), \\((a^m)^n = a^{mn}\\), \\(a^0 = 1\\), \\(a^{-n} = \\dfrac{1}{a^n}\\), \\(\\sqrt[n]{a} = a^{1/n}\\).\n" +
        "- If \\(a^m = a^n\\) with \\(a > 0\\), \\(a \\ne 1\\), then \\(m = n\\).\n" +
        "- Chains: \\(x = y^a\\), \\(y = z^b\\), \\(z = x^c\\) give \\(x = x^{abc}\\), so \\(abc = 1\\).\n" +
        "- Nested radicals: work from the inside, \\(\\sqrt{x\\sqrt x} = x^{3/4}\\).",
      formula: {
        label: "Index laws",
        latex: "a^m a^n = a^{m + n}, \\quad (a^m)^n = a^{mn}, \\quad a^{-n} = \\dfrac{1}{a^n}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\left(\\dfrac{x^a}{x^b}\\right)^{a + b}\\left(\\dfrac{x^b}{x^c}\\right)^{b + c}\\left(\\dfrac{x^c}{x^a}\\right)^{c + a}\\).",
        steps: [
          "The exponent is \\((a - b)(a + b) + (b - c)(b + c) + (c - a)(c + a)\\).",
          "That is \\(a^2 - b^2 + b^2 - c^2 + c^2 - a^2 = 0\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x^m = \\sqrt[3]{x\\sqrt{x}}\\), find \\(m\\).",
        steps: ["\\(x\\sqrt x = x^{3/2}\\), and its cube root is \\(x^{1/2}\\)."],
        answer: "\\(\\dfrac12\\).",
      },
      practiceSet: [
        { prompt: "\\(2^5\\times 2^{-3}\\)?", answer: "\\(4\\)" },
        { prompt: "\\((27)^{2/3}\\)?", answer: "\\(9\\)" },
        { prompt: "\\(x = y^2\\), \\(y = z^3\\), \\(z = x^c\\). \\(c\\)?", answer: "\\(\\dfrac16\\)" },
        { prompt: "\\(\\sqrt{x\\sqrt{x}}\\) as a power of \\(x\\)?", answer: "\\(x^{3/4}\\)" },
      ],
      pyqExampleId: "4fa06fd1-e69d-4b95-81ca-5a1b6701c083", // 2018 (I) — 2b = a + c, y² = xz
      traps: [
        {
          title: "The base must not be 1",
          body:
            "\\(x^{p} = x^{q}\\) gives \\(p = q\\) only if \\(x \\ne 1\\) (and \\(x > 0\\)). That is why the stems add '\\(x \\ne 1\\)', and why \\(x = 1\\) is often an extra solution of an index equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-common-value-k",
      name: "When several powers are equal",
      intuition:
        "If \\(a^x = b^y = c^z\\), call the common value \\(k\\). Then \\(a = k^{1/x}\\), \\(b = k^{1/y}\\), \\(c = k^{1/z}\\), and any relation between \\(a\\), \\(b\\), \\(c\\) becomes a relation between the reciprocals of the exponents.",
      definition:
        "Let \\(a^x = b^y = c^z = k\\) (with \\(k \\ne 1\\)):\n" +
        "- \\(abc = 1\\) gives \\(\\dfrac1x + \\dfrac1y + \\dfrac1z = 0\\);\n" +
        "- \\(b^2 = ac\\) gives \\(\\dfrac2y = \\dfrac1x + \\dfrac1z\\);\n" +
        "- \\(c = ab\\) gives \\(\\dfrac1z = \\dfrac1x + \\dfrac1y\\), so \\(z = \\dfrac{xy}{x + y}\\).\n" +
        "- A product of prime powers equal to another fixes the exponents: \\(43^x 47^y = 43^2 47^2\\) gives \\(x = y = 2\\).",
      formula: {
        label: "Common value k",
        latex: "a^x = b^y = c^z = k \\;\\Rightarrow\\; a = k^{1/x},\\ b = k^{1/y},\\ c = k^{1/z}",
      },
      authoredExample: {
        prompt: "If \\(2^x = 5^y = 10^z\\), find \\(z\\) in terms of \\(x\\) and \\(y\\).",
        steps: [
          "With common value \\(k\\): \\(2 = k^{1/x}\\), \\(5 = k^{1/y}\\), \\(10 = k^{1/z}\\).",
          "\\(10 = 2\\times 5\\) gives \\(\\dfrac1z = \\dfrac1x + \\dfrac1y\\).",
        ],
        answer: "\\(z = \\dfrac{xy}{x + y}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a^x = b^y = c^z\\) and \\(abc = 1\\), find \\(xy + yz + zx\\) in terms of \\(xyz\\).",
        steps: ["\\(\\dfrac1x + \\dfrac1y + \\dfrac1z = 0\\); multiply by \\(xyz\\)."],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(3^x = 9^y\\). \\(x : y\\)?", answer: "\\(2 : 1\\)" },
        { prompt: "\\(a^x = b^y = c^z\\), \\(b^2 = ac\\). \\(\\dfrac1x + \\dfrac1z\\)?", answer: "\\(\\dfrac2y\\)" },
        { prompt: "\\(2^x 3^y = 72\\), \\(x, y\\) integers. \\(x + y\\)?", answer: "\\(5\\)" },
        { prompt: "\\(4^x = 8^y\\). \\(\\dfrac xy\\)?", answer: "\\(\\dfrac32\\)" },
      ],
      pyqExampleId: "ac74465f-b01f-4fe9-9a8c-a6c3456ddd55", // 2019 (II) — 3^x = 4^y = 12^z
      traps: [
        {
          title: "Reciprocals of the exponents, not the exponents",
          body:
            "\\(10 = 2\\times 5\\) gives \\(\\dfrac1z = \\dfrac1x + \\dfrac1y\\), not \\(z = x + y\\). Products of the bases become SUMS of the reciprocal exponents.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-compare-powers",
      name: "Comparing powers and roots",
      intuition:
        "To compare \\(\\sqrt2\\), \\(\\sqrt[3]{3}\\), \\(\\sqrt[6]{6}\\), raise all of them to the same power so the roots disappear. To compare huge powers, bring them to the same exponent or compare their logarithms.",
      definition:
        "- For positive numbers, raising to the same positive power keeps the order.\n" +
        "- Roots: raise to the LCM of the root indices.\n" +
        "- Powers: bring to a common exponent, e.g. \\(2^{30} = 8^{10}\\) and \\(3^{20} = 9^{10}\\), so \\(3^{20} > 2^{30}\\).\n" +
        "- A larger exponent usually beats a larger base: compare \\(n\\log a\\).",
      formula: {
        label: "Common exponent",
        latex: "a^{mn} = (a^m)^n",
      },
      authoredExample: {
        prompt: "Order \\(\\sqrt[3]{4}\\), \\(\\sqrt{3}\\) and \\(\\sqrt[6]{10}\\).",
        steps: ["Raise to the sixth power: \\(4^2 = 16\\), \\(3^3 = 27\\), \\(10\\)."],
        answer: "\\(\\sqrt[6]{10} < \\sqrt[3]{4} < \\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "Which is larger, \\(2^{40}\\) or \\(3^{25}\\)?",
        steps: ["\\(2^{40} = 256^5\\) and \\(3^{25} = 243^5\\)."],
        answer: "\\(2^{40}\\).",
      },
      practiceSet: [
        { prompt: "Larger: \\(\\sqrt[3]{2}\\) or \\(\\sqrt{\\,\\sqrt2\\,}\\)?", answer: "\\(\\sqrt[3]2\\)" },
        { prompt: "Larger: \\(5^{20}\\) or \\(4^{25}\\)?", answer: "\\(4^{25}\\) (\\(1024^5 > 625^5\\))" },
        { prompt: "Power to raise \\(\\sqrt2\\) and \\(\\sqrt[3]3\\) to?", answer: "\\(6\\)" },
        { prompt: "Larger: \\(2^{100}\\) or \\(100^2\\)?", answer: "\\(2^{100}\\)" },
      ],
      pyqExampleId: "0c6ebc83-fc8f-4144-b148-a63513f9a714", // 2020 (I) — √2, ∛3, ⁶√6
      traps: [
        {
          title: "Raise every number to the same power",
          body:
            "Comparing \\(\\sqrt2\\) and \\(\\sqrt[3]3\\) by squaring one and cubing the other proves nothing. Use one exponent, the LCM of the root indices, for all of them.",
        },
      ],
    },
  ],
};
