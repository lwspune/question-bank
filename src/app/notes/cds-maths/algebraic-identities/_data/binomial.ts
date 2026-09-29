import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_BINOMIAL_NOTE: SubtopicNote = {
  subtopicName: "Squares and Cubes of a Binomial",
  title: "Squares and Cubes of a Binomial",
  oneLineDefinition:
    "Knowing a + b and ab fixes every symmetric expression in a and b, and the standard factor forms turn long arithmetic into a single subtraction.",
  whyItMatters:
    "Twelve PYQs. The core move is to write a² + b² or a³ + b³ through a + b and ab instead of finding a and b. The other two moves are spotting an expanded cube and using the factor forms of a² − b² and a³ ± b³ on awkward numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-sum-product",
      name: "Everything from a + b and ab",
      intuition:
        "Any expression that does not change when \\(a\\) and \\(b\\) swap can be rebuilt from their sum and product. So when a question gives \\(a + b\\) and \\(ab\\), never solve for \\(a\\) and \\(b\\): expand a power of the sum and remove what you do not want.",
      definition:
        "- \\(a^2 + b^2 = (a + b)^2 - 2ab\\)\n" +
        "- \\(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\\)\n" +
        "- \\(a^3 - b^3 = (a - b)^3 + 3ab(a - b)\\)\n" +
        "- \\((a - b)^2 = (a + b)^2 - 4ab\\), and \\(\\dfrac1a + \\dfrac1b = \\dfrac{a + b}{ab}\\).\n" +
        "When square roots appear, as in \\(a\\sqrt a + b\\sqrt b\\), put \\(p = \\sqrt a\\) and \\(q = \\sqrt b\\) so the expression becomes \\(p^3 + q^3\\).",
      formula: {
        label: "Cube of a sum",
        latex: "a^3 + b^3 = (a + b)^3 - 3ab(a + b)",
      },
      authoredExample: {
        prompt: "If \\(a + b = 7\\) and \\(ab = 10\\), find \\(a^2 + b^2\\) and \\(a^3 + b^3\\).",
        steps: [
          "\\(a^2 + b^2 = 49 - 20 = 29\\).",
          "\\(a^3 + b^3 = 343 - 3\\times 10\\times 7 = 343 - 210 = 133\\).",
          "Check: \\(a, b = 2, 5\\) gives \\(8 + 125 = 133\\).",
        ],
        answer: "\\(29\\) and \\(133\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a - b = 3\\) and \\(ab = 4\\), find \\(a^3 - b^3\\).",
        steps: ["\\(a^3 - b^3 = 27 + 3\\times 4\\times 3 = 63\\)."],
        answer: "\\(63\\).",
      },
      practiceSet: [
        { prompt: "\\(a + b = 4\\), \\(ab = 3\\). Find \\(a^2 + b^2\\).", answer: "\\(10\\)" },
        { prompt: "\\(a + b = 3\\), \\(ab = 2\\). Find \\(a^3 + b^3\\).", answer: "\\(9\\)" },
        { prompt: "\\(a + b = 6\\), \\(ab = 8\\). Find \\(\\dfrac1a + \\dfrac1b\\).", answer: "\\(\\dfrac34\\)" },
        { prompt: "\\((a + b)^2 - (a - b)^2\\)?", answer: "\\(4ab\\)" },
      ],
      pyqExampleId: "17e6da14-953f-4b9c-94b9-65d5230b0947", // 2017 (I) — a + b and ab given, find a³ + b³
      traps: [
        {
          title: "The correction term is 3ab(a + b)",
          body:
            "\\((a + b)^3\\) is \\(a^3 + b^3 + 3ab(a + b)\\), not \\(a^3 + b^3 + 3ab\\). Forgetting the factor \\((a + b)\\) gives a wrong answer that is often printed as an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-recognise-cube",
      name: "Spotting an expanded cube",
      intuition:
        "Four terms with coefficients in the pattern \\(1, 3, 3, 1\\) (after taking out the cubes) are a cube that has been expanded. Collapse it back and the given value does the rest.",
      definition:
        "- \\((a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3\\) and \\((a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3\\).\n" +
        "- Test: are the first and last terms perfect cubes \\(a^3\\) and \\(b^3\\)? Is the second term \\(3a^2b\\)? If so, the four terms are \\((a \\pm b)^3\\).\n" +
        "- The same test works with fractions: \\(\\dfrac{1}{t^3} - \\dfrac{6}{t^2} + \\dfrac{12}{t} - 8 = \\left(\\dfrac1t - 2\\right)^3\\).",
      formula: {
        label: "Cube of a difference",
        latex: "(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3",
      },
      authoredExample: {
        prompt: "If \\(x - 2y = 3\\), find \\(x^3 - 6x^2y + 12xy^2 - 8y^3 + 5\\).",
        steps: [
          "With \\(a = x\\), \\(b = 2y\\): \\(3a^2b = 6x^2y\\) and \\(3ab^2 = 12xy^2\\), so the four terms are \\((x - 2y)^3\\).",
          "The value is \\(3^3 + 5\\).",
        ],
        answer: "\\(32\\).",
      },
      selfCheckExample: {
        prompt: "If \\(3a + b = 2\\), find \\(27a^3 + 27a^2b + 9ab^2 + b^3\\).",
        steps: ["It is \\((3a + b)^3\\), since \\(3(3a)^2b = 27a^2b\\) and \\(3(3a)b^2 = 9ab^2\\)."],
        answer: "\\(8\\).",
      },
      practiceSet: [
        { prompt: "\\(x^3 + 3x^2 + 3x + 1\\) at \\(x = 9\\)?", answer: "\\(1000\\)" },
        { prompt: "Write \\(8 - 12t + 6t^2 - t^3\\) as a cube.", answer: "\\((2 - t)^3\\)" },
        { prompt: "\\(125 - 75 + 15 - 1\\)?", answer: "\\(64\\) (it is \\((5 - 1)^3\\))" },
        { prompt: "\\(a^3 - 3a^2b + 3ab^2 - b^3\\)?", answer: "\\((a - b)^3\\)" },
      ],
      pyqExampleId: "befd780e-6ada-4f87-94b3-8ce0274b1953", // 2021 (II) — a cube in 2x and 3y
      traps: [
        {
          title: "Check the middle coefficients",
          body:
            "\\(27x^3 + 54x^2y + 36xy^2 + 8y^3\\) is \\((3x + 2y)^3\\) because \\(3(3x)^2(2y) = 54x^2y\\). If a middle term does not match, the four terms are not a cube and the shortcut fails.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-factor-forms",
      name: "Difference of squares, sum and difference of cubes",
      intuition:
        "The factor forms turn a hard-looking numerical fraction into one subtraction. When the denominator is \\(a^2 \\pm ab + b^2\\), look for \\(a^3 \\pm b^3\\) on top.",
      definition:
        "- \\(a^2 - b^2 = (a - b)(a + b)\\)\n" +
        "- \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\) and \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\)\n" +
        "- \\((p + q)^2 + (p - q)^2 = 2(p^2 + q^2)\\) and \\((p + q)^2 - (p - q)^2 = 4pq\\)\n" +
        "- \\(x^4 - 1 = (x - 1)(x + 1)(x^2 + 1)\\).",
      formula: {
        label: "Sum and difference of cubes",
        latex: "a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\dfrac{7.3^3 + 2.7^3}{7.3^2 - 7.3\\times 2.7 + 2.7^2}\\).",
        steps: [
          "With \\(a = 7.3\\) and \\(b = 2.7\\), the fraction is \\(\\dfrac{a^3 + b^3}{a^2 - ab + b^2}\\).",
          "That is \\(a + b\\).",
        ],
        answer: "\\(10\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(1001^2 - 999^2\\).",
        steps: ["\\((1001 - 999)(1001 + 999) = 2\\times 2000\\)."],
        answer: "\\(4000\\).",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^4 - 1\\).", answer: "\\((x - 1)(x + 1)(x^2 + 1)\\)" },
        { prompt: "\\(\\dfrac{23^2 - 17^2}{6}\\)?", answer: "\\(40\\)" },
        { prompt: "\\(\\dfrac{0.87^3 - 0.13^3}{0.87^2 + 0.87\\times 0.13 + 0.13^2}\\)?", answer: "\\(0.74\\)" },
        { prompt: "\\(101^2 + 99^2\\)?", answer: "\\(20002\\)" },
      ],
      pyqExampleId: "e677432c-cc82-4def-a236-c54491ebcab8", // 2022 (I) — (5.4³ − 0.064) over a² + ab + b²
      traps: [
        {
          title: "The signs pair up opposite",
          body:
            "\\(a^3 + b^3\\) goes with \\(a^2 - ab + b^2\\), and \\(a^3 - b^3\\) with \\(a^2 + ab + b^2\\). Read the sign of the middle term in the denominator first; it tells you which cube to look for on top.",
        },
      ],
    },
  ],
};
