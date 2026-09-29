import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_SIMPLIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Simplification of Expressions",
  title: "Simplifying Surd Expressions",
  oneLineDefinition:
    "When x is built from cube roots, name the cube root and use its cube; when an expression holds square roots of squares, remember √(a²) = |a|.",
  whyItMatters:
    "Six PYQs, three of them HARD. The hard ones all use one idea: if u = ∛2, then u³ = 2, so any polynomial in x = 2 + u + u² reduces to a number. The rest are careful expansions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-cube-root-expressions",
      name: "Expressions built from cube roots",
      intuition:
        "An \\(x\\) made of \\(\\sqrt[3]{2}\\) and its square looks hopeless to cube directly. Move the plain number to the other side, cube both sides, and replace every \\(u^3\\) by \\(2\\): the surds either cancel or rebuild \\(x\\) itself.",
      definition:
        "- Let \\(u = \\sqrt[3]{a}\\), so \\(u^3 = a\\).\n" +
        "- If \\(x - c = u + u^2\\), then \\((x - c)^3 = u^3(1 + u)^3 = a(1 + 3u + 3u^2 + u^3)\\), which is \\(a(1 + a) + 3a(x - c)\\).\n" +
        "- Expand the cubic asked for and compare.\n" +
        "- For square roots, \\(x = 2 + 3\\sqrt2\\) satisfies \\((x - 2)^2 = 18\\), a quadratic.",
      formula: {
        label: "Cube with u³ = a",
        latex: "(u + u^2)^3 = u^3(1 + u)^3 = a\\,(1 + u)^3",
      },
      authoredExample: {
        prompt: "If \\(x = 1 + \\sqrt[3]{3} + \\sqrt[3]{9}\\), find \\(x^3 - 3x^2 - 6x\\).",
        steps: [
          "Let \\(u = \\sqrt[3]3\\): \\(x - 1 = u + u^2\\).",
          "\\((x - 1)^3 = 3(1 + u)^3 = 3(1 + 3u + 3u^2 + 3) = 12 + 9(x - 1)\\).",
          "Expanding: \\(x^3 - 3x^2 + 3x - 1 = 9x + 3\\), so \\(x^3 - 3x^2 - 6x = 4\\).",
        ],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x = 3 + 2\\sqrt2\\), find \\(x^2 - 6x\\).",
        steps: ["\\((x - 3)^2 = 8\\), so \\(x^2 - 6x + 9 = 8\\)."],
        answer: "\\(-1\\).",
      },
      practiceSet: [
        { prompt: "\\(u = \\sqrt[3]5\\). \\(u^6\\)?", answer: "\\(25\\)" },
        { prompt: "\\(x = 1 + \\sqrt2\\). \\(x^2 - 2x\\)?", answer: "\\(1\\)" },
        { prompt: "\\(x = 2 - \\sqrt3\\). \\(x^2 - 4x\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(u = \\sqrt[3]2\\). \\((1 + u)(1 - u + u^2)\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "5f676286-c9d7-4432-83b6-1123fb61cef7", // 2018 (II) — x = 2 + 2^(2/3) + 2^(1/3)
      traps: [
        {
          title: "Move the whole number before cubing",
          body:
            "Cubing \\(x = 2 + u + u^2\\) directly produces dozens of terms. Cubing \\(x - 2 = u + u^2\\) produces four, because \\(u^3\\) factors out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-absolute-and-products",
      name: "Square roots of squares and products of sums",
      intuition:
        "\\(\\sqrt{a^2}\\) is the size of \\(a\\), never negative. And a product of four brackets like \\((a + b + c)(a + b - c)\\ldots\\) pairs up into differences of squares.",
      definition:
        "- \\(\\sqrt{a^2} = |a|\\), so \\(\\sqrt{(a - b)^2} + \\sqrt{(b - a)^2} = 2|a - b|\\).\n" +
        "- \\((a + b + c)(a + b - c) = (a + b)^2 - c^2\\).\n" +
        "- \\((a + b + c)(-a + b + c)(a - b + c)(a + b - c) = 2a^2b^2 + 2b^2c^2 + 2c^2a^2 - a^4 - b^4 - c^4\\).\n" +
        "- Mixed numbers under a root: convert first, \\(3\\tfrac{3}{8} = \\dfrac{27}{8}\\).",
      formula: {
        label: "Root of a square",
        latex: "\\sqrt{a^2} = |a|",
      },
      authoredExample: {
        prompt: "Evaluate \\((\\sqrt2 + \\sqrt3 + 1)(\\sqrt2 + \\sqrt3 - 1)\\).",
        steps: ["\\((\\sqrt2 + \\sqrt3)^2 - 1 = 5 + 2\\sqrt6 - 1\\)."],
        answer: "\\(4 + 2\\sqrt6\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt[3]{3\\tfrac{3}{8}}\\).",
        steps: ["\\(3\\tfrac38 = \\dfrac{27}{8}\\), whose cube root is \\(\\dfrac32\\)."],
        answer: "\\(1\\tfrac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sqrt{(-5)^2}\\)?", answer: "\\(5\\)" },
        { prompt: "\\(\\sqrt{(2 - 7)^2} + \\sqrt{(7 - 2)^2}\\)?", answer: "\\(10\\)" },
        { prompt: "\\((\\sqrt5 + \\sqrt3)(\\sqrt5 - \\sqrt3)\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\sqrt[3]{\\dfrac{64}{125}}\\)?", answer: "\\(\\dfrac45\\)" },
      ],
      pyqExampleId: "43a99004-5a89-4ebe-a03a-074d608349e4", // 2026 (II) — product of four √2 ± √3 ± √5 brackets
      traps: [
        {
          title: "√(a²) is not a",
          body:
            "\\(\\sqrt{(a - b)^2} = |a - b|\\), which is \\(b - a\\) when \\(b > a\\). Writing \\(a - b\\) makes a positive quantity look negative.",
        },
      ],
    },
  ],
};
