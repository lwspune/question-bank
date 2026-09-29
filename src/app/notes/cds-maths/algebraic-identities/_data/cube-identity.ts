import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_CUBE_IDENTITY_NOTE: SubtopicNote = {
  subtopicName: "The Cube Identity and a + b + c = 0",
  title: "The Cube Identity and a + b + c = 0",
  oneLineDefinition:
    "a³ + b³ + c³ − 3abc factors as (a + b + c)(a² + b² + c² − ab − bc − ca), so when a + b + c = 0 the sum of the cubes is exactly 3abc.",
  whyItMatters:
    "Eleven PYQs, and the same fraction — (x − y)³ + (y − z)³ + (z − x)³ against (x − y)(y − z)(z − x) — has been set three times with different constants. Check that the three pieces add to zero; the sum of their cubes is then three times their product.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-cube-zero-sum",
      name: "When three numbers add to zero",
      intuition:
        "If \\(a + b + c = 0\\), the factor \\((a + b + c)\\) in the cube identity is zero, so \\(a^3 + b^3 + c^3 - 3abc = 0\\). The three differences \\(x - y\\), \\(y - z\\), \\(z - x\\) always add to zero, which is why they keep appearing.",
      definition:
        "If \\(a + b + c = 0\\):\n" +
        "- \\(a^3 + b^3 + c^3 = 3abc\\);\n" +
        "- \\(a^2 + b^2 + c^2 = -2(ab + bc + ca)\\);\n" +
        "- \\(b + c = -a\\), \\(c + a = -b\\), \\(a + b = -c\\), so brackets like \\((b + c - a)\\) become \\(-2a\\).\n" +
        "Always true: \\((x - y) + (y - z) + (z - x) = 0\\).",
      formula: {
        label: "Zero sum",
        latex: "a + b + c = 0 \\;\\Rightarrow\\; a^3 + b^3 + c^3 = 3abc",
      },
      authoredExample: {
        prompt: "Evaluate \\(17^3 - 12^3 - 5^3\\) without cubing.",
        steps: [
          "Take \\(a = 17\\), \\(b = -12\\), \\(c = -5\\); they add to \\(0\\).",
          "So the value is \\(3abc = 3\\times 17\\times(-12)\\times(-5)\\).",
        ],
        answer: "\\(3060\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{(a - b)^3 + (b - c)^3 + (c - a)^3}{(a - b)(b - c)(c - a)}\\).",
        steps: ["The three brackets add to \\(0\\), so the numerator is \\(3(a - b)(b - c)(c - a)\\)."],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(x + y + z = 0\\). Find \\(\\dfrac{x^3 + y^3 + z^3}{xyz}\\).", answer: "\\(3\\)" },
        { prompt: "\\(10^3 - 7^3 - 3^3\\)?", answer: "\\(630\\)" },
        { prompt: "\\(a + b + c = 0\\). Find \\((a + b)(b + c)(c + a)\\).", answer: "\\(-abc\\)" },
        { prompt: "\\(a + b + c = 0\\). Write \\(a^2 + b^2 + c^2\\) through \\(\\sum ab\\).", answer: "\\(-2\\sum ab\\)" },
      ],
      pyqExampleId: "c2ca44d3-923d-4c64-b848-c0d1ab3532cf", // 2019 (I) — the differences fraction over 9(...)
      traps: [
        {
          title: "Check that the three really add to zero",
          body:
            "\\((x - y)\\), \\((y - z)\\), \\((z - x)\\) add to \\(0\\); \\((x - y)\\), \\((y - z)\\), \\((x - z)\\) do not. Read the third bracket's order before using the shortcut.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-cube-factorisation",
      name: "The full factorisation",
      intuition:
        "The second factor of the cube identity is half the sum of the squares of the differences, so it is zero only when all three numbers are equal. That makes the whole expression zero in exactly two situations.",
      definition:
        "- \\(a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)\\).\n" +
        "- The second factor is \\((a + b + c)^2 - 3(ab + bc + ca)\\), and also \\(\\dfrac12\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]\\).\n" +
        "- So \\(a^3 + b^3 + c^3 = 3abc\\) exactly when \\(a + b + c = 0\\) or \\(a = b = c\\).\n" +
        "- With \\(a^2 - bc = \\alpha\\) and so on, \\(a\\alpha + b\\beta + c\\gamma = a^3 + b^3 + c^3 - 3abc\\) and \\(\\alpha + \\beta + \\gamma\\) is the second factor.",
      formula: {
        label: "Cube identity",
        latex: "a^3 + b^3 + c^3 - 3abc = (a + b + c)\\left[(a + b + c)^2 - 3(ab + bc + ca)\\right]",
      },
      authoredExample: {
        prompt: "If \\(a + b + c = 6\\) and \\(ab + bc + ca = 11\\), find \\(a^3 + b^3 + c^3 - 3abc\\).",
        steps: ["\\(6\\,(36 - 33) = 18\\).", "Check with \\(1, 2, 3\\): \\(1 + 8 + 27 - 18 = 18\\)."],
        answer: "\\(18\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a + b + c = 9\\) and \\(a^2 + b^2 + c^2 = 29\\), find \\(a^3 + b^3 + c^3 - 3abc\\).",
        steps: ["\\(\\sum ab = \\dfrac{81 - 29}{2} = 26\\).", "Value \\(= 9(29 - 26)\\)."],
        answer: "\\(27\\).",
      },
      practiceSet: [
        { prompt: "\\(a = b = c\\). Value of \\(a^3 + b^3 + c^3 - 3abc\\)?", answer: "\\(0\\)" },
        { prompt: "\\(a + b + c = 5\\), \\(\\sum ab = 8\\). Value?", answer: "\\(5\\)" },
        { prompt: "\\(a^3 + b^3 + c^3 = 3abc\\) with \\(a, b, c\\) unequal. Then?", answer: "\\(a + b + c = 0\\)" },
        { prompt: "Second factor of \\(x^6 + y^6 + z^6 - 3x^2y^2z^2\\)?", answer: "\\(x^4 + y^4 + z^4 - x^2y^2 - y^2z^2 - z^2x^2\\)" },
      ],
      pyqExampleId: "96ae7d0e-d07d-4fbe-a87a-6b9947cb61a4", // 2025 (I) — sum and pairwise sum given
      traps: [
        {
          title: "Zero does not mean a + b + c = 0",
          body:
            "\\(a^3 + b^3 + c^3 - 3abc = 0\\) also holds when \\(a = b = c\\). A statement claiming it forces the numbers to be equal is not enough; \\((1, -1, 0)\\) satisfies it with unequal numbers.",
        },
      ],
    },
  ],
};
