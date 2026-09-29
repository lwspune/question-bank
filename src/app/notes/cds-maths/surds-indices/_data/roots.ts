import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Square Roots of Surds",
  title: "Square Roots of Surds",
  oneLineDefinition:
    "A surd a + 2√b is a perfect square (√m + √n)² when m + n = a and mn = b, which makes its square root and its reciprocal easy.",
  whyItMatters:
    "Eleven PYQs. The same few numbers return again and again — 7 + 4√3 = (2 + √3)² appears in four papers — and each time the question is the square root, or the square root plus its reciprocal, which is then a whole number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-root-of-surd",
      name: "The square root of a + 2√b",
      intuition:
        "\\((\\sqrt m + \\sqrt n)^2 = m + n + 2\\sqrt{mn}\\). So to take the square root of \\(a + 2\\sqrt b\\), find two numbers with sum \\(a\\) and product \\(b\\). A coefficient other than \\(2\\) in front of the root must be rewritten first.",
      definition:
        "- \\(\\sqrt{a \\pm 2\\sqrt b} = \\sqrt m \\pm \\sqrt n\\) where \\(m + n = a\\), \\(mn = b\\), \\(m > n\\).\n" +
        "- Rewrite: \\(4\\sqrt{14} = 2\\sqrt{56}\\), \\(6\\sqrt7 = 2\\sqrt{63}\\), so \\(16 + 6\\sqrt7\\) needs \\(m + n = 16\\), \\(mn = 63\\).\n" +
        "- The square root is the positive one: for \\(a - 2\\sqrt b\\) write the larger root first.\n" +
        "- A cube root keeps the sign: \\(\\sqrt[3]{-0.008} = -0.2\\).",
      formula: {
        label: "Square root of a surd",
        latex: "\\sqrt{a + 2\\sqrt b} = \\sqrt m + \\sqrt n, \\quad m + n = a,\\ mn = b",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{11 + 2\\sqrt{30}}\\) and \\(\\sqrt{9 - 4\\sqrt5}\\).",
        steps: [
          "\\(m + n = 11\\), \\(mn = 30\\): \\(6\\) and \\(5\\). So \\(\\sqrt6 + \\sqrt5\\).",
          "\\(9 - 4\\sqrt5 = 9 - 2\\sqrt{20}\\): \\(m + n = 9\\), \\(mn = 20\\) gives \\(5\\) and \\(4\\). So \\(\\sqrt5 - 2\\).",
        ],
        answer: "\\(\\sqrt6 + \\sqrt5\\) and \\(\\sqrt5 - 2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{12 - 2\\sqrt{35}}\\).",
        steps: ["\\(m + n = 12\\), \\(mn = 35\\): \\(7\\) and \\(5\\)."],
        answer: "\\(\\sqrt7 - \\sqrt5\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sqrt{4 + 2\\sqrt3}\\)?", answer: "\\(\\sqrt3 + 1\\)" },
        { prompt: "\\(\\sqrt{5 - 2\\sqrt6}\\)?", answer: "\\(\\sqrt3 - \\sqrt2\\)" },
        { prompt: "\\(\\sqrt{8 + 2\\sqrt{15}}\\)?", answer: "\\(\\sqrt5 + \\sqrt3\\)" },
        { prompt: "\\(\\sqrt[3]{-27}\\)?", answer: "\\(-3\\)" },
      ],
      pyqExampleId: "674c929c-69b6-470d-929b-632279380e31", // 2019 (I) — √(16 + 6√7)
      traps: [
        {
          title: "The principal root is positive",
          body:
            "\\(\\sqrt{9 - 4\\sqrt5}\\) is \\(\\sqrt5 - 2\\), not \\(2 - \\sqrt5\\): both square to the same number, but only the first is positive. One CDS paper printed only the negative form among its options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-root-plus-reciprocal",
      name: "A surd plus its reciprocal",
      intuition:
        "\\(2 + \\sqrt3\\) and \\(2 - \\sqrt3\\) multiply to \\(1\\), so each is the other's reciprocal. Adding them cancels the surd and leaves a whole number.",
      definition:
        "- \\((p + \\sqrt q)(p - \\sqrt q) = p^2 - q\\). When this is \\(1\\), \\(\\dfrac{1}{p + \\sqrt q} = p - \\sqrt q\\).\n" +
        "- So if \\(\\sqrt x = p + \\sqrt q\\) with \\(p^2 - q = 1\\): \\(\\sqrt x + \\dfrac{1}{\\sqrt x} = 2p\\).\n" +
        "- Useful squares: \\(7 + 4\\sqrt3 = (2 + \\sqrt3)^2\\), \\(97 + 56\\sqrt3 = (2 + \\sqrt3)^4\\), \\(3 + 2\\sqrt2 = (1 + \\sqrt2)^2\\), \\(11 + 2\\sqrt{30} = (\\sqrt6 + \\sqrt5)^2\\).",
      formula: {
        label: "Conjugates with product 1",
        latex: "(2 + \\sqrt3)(2 - \\sqrt3) = 1",
      },
      authoredExample: {
        prompt: "If \\(x = 3 + 2\\sqrt2\\), find \\(\\sqrt x + \\dfrac{1}{\\sqrt x}\\).",
        steps: [
          "\\(3 + 2\\sqrt2 = (1 + \\sqrt2)^2\\), so \\(\\sqrt x = 1 + \\sqrt2\\).",
          "\\(\\dfrac{1}{1 + \\sqrt2} = \\sqrt2 - 1\\).",
          "Sum: \\(2\\sqrt2\\).",
        ],
        answer: "\\(2\\sqrt2\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x = 5 + 2\\sqrt6\\), find \\(\\sqrt x - \\dfrac{1}{\\sqrt x}\\).",
        steps: ["\\(\\sqrt x = \\sqrt3 + \\sqrt2\\) and \\(\\dfrac{1}{\\sqrt x} = \\sqrt3 - \\sqrt2\\)."],
        answer: "\\(2\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1}{2 + \\sqrt3}\\)?", answer: "\\(2 - \\sqrt3\\)" },
        { prompt: "\\(\\dfrac{1}{\\sqrt5 + 2}\\)?", answer: "\\(\\sqrt5 - 2\\)" },
        { prompt: "\\((3 + 2\\sqrt2) + (3 - 2\\sqrt2)\\)?", answer: "\\(6\\)" },
        { prompt: "\\(x = 3 + 2\\sqrt2\\). \\(x + \\dfrac1x\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "910fd330-4851-48b1-a207-4373721698b3", // 2019 (I) — a = √(7 + 4√3), a + 1/a
      traps: [
        {
          title: "Square root first, then the reciprocal",
          body:
            "For \\(x = 7 + 4\\sqrt3\\), \\(x + \\dfrac1x = 14\\) but \\(\\sqrt x + \\dfrac{1}{\\sqrt x} = 4\\). Check whether the question has \\(x\\) or \\(\\sqrt x\\) before adding.",
        },
      ],
    },
  ],
};
